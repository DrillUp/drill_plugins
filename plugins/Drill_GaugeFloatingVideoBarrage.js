//=============================================================================
// Drill_GaugeFloatingVideoBarrage.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        地图UI - 临时漂浮视频弹幕
 * @author Drill_up
 * 
 * @Drill_LE_param "视频弹幕样式-%d"
 * @Drill_LE_parentKey "---样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_GFVB_style_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeFloatingVideoBarrage +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在地图界面快速生成临时的类似b站的视频弹幕。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfBallistics       系统-弹道核心★★v2.1及以上★★
 *   - Drill_CoreOfWindowAuxiliary  系统-窗口辅助核心
 * 可扩展：
 *   - Drill_CoreOfString           系统-字符串核心
 *     可以在视频弹幕中，绑定并显示自定义的字符串。
 *   - Drill_DialogFontFace         窗口字符-字体管理器
 *     可以在视频弹幕中，设置自定义的字体类型。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于地图的各个层级。
 * 2.更多详细内容，去看看文档 "13.UI > 大家族-漂浮文字.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 细节：
 *   (1.视频弹幕本质上是一个窗口，可以显示窗口外框。
 *   (2.你可以将视频弹幕放置在地图层级的 下层、中层、上层、图片层、
 *      最顶层 中。
 *   (3.视频弹幕默认字体大小26，使用黑体"SimHei"。
 *      与b站的弹幕字体相似。
 *   (4.视频弹幕的移动弹道规则由程序写死，不能灵活改变。
 * 设计：
 *   (1.你可以通过并行事件给游戏发射一些有趣的视频弹幕，以假乱真。
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
 * 视频弹幕样式-1 资源-自定义窗口皮肤（system文件夹）
 * 视频弹幕样式-1 资源-自定义背景图片（Map__ui文件夹）
 * 视频弹幕样式-2 资源-自定义窗口皮肤（system文件夹）
 * 视频弹幕样式-2 资源-自定义背景图片（Map__ui文件夹）
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 简单指令
 * 你可以通过插件指令快速生成对象：
 * 
 * 插件指令：>地图临时漂浮视频弹幕 : 立刻清除全部弹幕
 * 
 * 插件指令：>地图临时漂浮视频弹幕 : 简单临时对象 : 常规弹幕 : 文本[一段文字]
 * 插件指令：>地图临时漂浮视频弹幕 : 简单临时对象 : 常规弹幕 : 文本[一段文字] : 样式[1]
 * 
 * 插件指令：>地图临时漂浮视频弹幕 : 简单临时对象 : 正上方弹幕 : 文本[一段文字]
 * 插件指令：>地图临时漂浮视频弹幕 : 简单临时对象 : 正上方弹幕 : 文本[一段文字] : 样式[1]
 * 插件指令：>地图临时漂浮视频弹幕 : 简单临时对象 : 正上方弹幕 : 文本[一段文字] : 样式[1] : 持续时间[60]
 * 
 * 插件指令：>地图临时漂浮视频弹幕 : 简单临时对象 : 正下方弹幕 : 文本[一段文字]
 * 插件指令：>地图临时漂浮视频弹幕 : 简单临时对象 : 正下方弹幕 : 文本[一段文字] : 样式[1]
 * 插件指令：>地图临时漂浮视频弹幕 : 简单临时对象 : 正下方弹幕 : 文本[一段文字] : 样式[1] : 持续时间[60]
 * 
 * 1.前半部分（常规弹幕）和 后半部分（文本[一段文字]）
 *   的参数可以随意组合。一共有2*3种组合方式。
 * 2.临时对象创建后，持续时间结束会自动清掉，你也可以手动用插件指令清。
 *   切换菜单或离开地图也会清掉当前视频弹幕。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 高级指令
 * 你可以通过插件指令控制临时对象的具体参数：
 * 
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 初始化 : 样式[1]
 * 
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-内容文本 : 文本[一段文字]
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-内容文本 : 字符串[21]
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-额外位置偏移 : 偏移[-10,20]
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-UI基准 : 相对于地图
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-UI基准 : 相对于镜头
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-地图层级 : 下层
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-地图层级 : 中层
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-地图层级 : 上层
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-地图层级 : 图片层
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-地图层级 : 最顶层
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-图片层级 : 图片层级[4]
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-布局透明度 : 透明度[255]
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-布局透明度 : 透明度变量[21]
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-锁定窗口色调 : 开启锁定
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-锁定窗口色调 : 关闭锁定
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-窗口色调 : 色调[0,0,0]
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-窗口附加宽度 : 值[+5]
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-窗口附加高度 : 值[+5]
 * 
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 创建 : 常规弹幕
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 创建 : 正上方弹幕
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 创建 : 正上方弹幕 : 持续时间[120]
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 创建 : 正下方弹幕
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 创建 : 正下方弹幕 : 持续时间[120]
 * 
 * 1.插件指令需要先后执行： 初始化、修改样式属性、创建 。
 *   如果 样式属性 不需要变化，直接先后执行： 初始化、创建 即可。
 *   临时对象创建之后，将不再受控制。
 * 2.临时对象创建后，持续时间结束会自动清掉。
 *   切换菜单或离开地图也会清掉漂浮文字。
 * 3."修改样式属性-内容文本"中的"字符串"对应字符串核心中指定编号的自定义文本。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 空格支持
 * 插件指令下面的写法也是有效的：
 * 
 * 插件指令：>地图临时漂浮视频弹幕 : 临时对象 : 修改样式属性-内容文本 : 文本[药水 + 1]
 * 
 * 1.你可以在该插件指令中的文本使用空格。注意只上述的 高级指令 有效，简单指令 不行。
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
 * 测试方法：   在UI管理层连续创建10个左右的弹幕。
 * 测试结果1：  200个事件的地图中，平均消耗为：【47.81ms】
 *              100个事件的地图中，平均消耗为：【22.40ms】
 *              50个事件的地图中，平均消耗为：【16.41ms】
 * 测试结果2：  在示例里创建大量弹幕，平均消耗为：【119.10ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.注意，由于弹幕是实时创建的，创建时会在短时间内产生较高的
 *   消耗。创建后消耗便趋于稳定。
 * 3.所以你需要尽量少在同一帧时间内创造大量弹幕，可能会卡。
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
 * @default 2
 * 
 * @param 常规弹幕持续时间
 * @type number
 * @min 1
 * @desc 常规弹幕的持续时间，默认为1200，即20秒，常规弹幕移动出镜头后也会被销毁。1秒60帧。
 * @default 1200
 * 
 * @param 正上方弹幕持续时间
 * @type number
 * @min 1
 * @desc 正上方弹幕的持续时间。1秒60帧。
 * @default 120
 * 
 * @param 正下方弹幕持续时间
 * @type number
 * @min 1
 * @desc 正下方弹幕的持续时间。1秒60帧。
 * @default 120
 * 
 *
 * @param ---视频弹幕设置---
 * @default 
 * 
 * @param 泳道高度
 * @parent ---视频弹幕设置---
 * @type number
 * @min 4
 * @desc 每条泳道的高度，泳道决定弹幕发射的位置。
 * @default 30
 * 
 * @param 上方泳道数量
 * @parent ---视频弹幕设置---
 * @type number
 * @min 1
 * @desc 弹幕发射的上方泳道数量，注意要避免弹幕完全遮挡整个游戏画面。
 * @default 8
 * 
 * @param 下方泳道数量
 * @parent ---视频弹幕设置---
 * @type number
 * @min 1
 * @desc 弹幕发射的下方泳道数量，注意要避免弹幕完全遮挡整个游戏画面。
 * @default 4
 * 
 * @param 常规弹幕最短间隔
 * @parent ---视频弹幕设置---
 * @type number
 * @min 0
 * @desc 同一个泳道内，前后弹幕的最短间隔宽度。
 * @default 10
 * 
 * @param 常规弹幕移动速度
 * @parent ---视频弹幕设置---
 * @desc 常规弹幕的移动速度。注意，弹幕的意义是确保所有文字能看清，因此所有常规弹幕统一匀速移动。
 * @default 2.5
 * 
 * 
 * @param ---样式组 1至20---
 * @default 
 * 
 * @param 视频弹幕样式-1
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==弹幕（相对于地图）==","---常规---":"","默认内容文本":"\"\"","---层级---":"","UI基准":"相对于地图","地图层级":"最顶层","地图图片层级":"80","---窗口皮肤---":"","布局模式":"黑底背景","布局透明度":"0","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","是否锁定窗口色调":"false","窗口色调-红":"0","窗口色调-绿":"0","窗口色调-蓝":"0","---窗口属性---":"","窗口内边距":"10","窗口字体大小":"26","窗口字体类型":"SimHei","窗口附加宽度":"0","窗口附加高度":"0"}
 * 
 * @param 视频弹幕样式-2
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==弹幕（相对于镜头）==","---常规---":"","默认内容文本":"\"\"","---层级---":"","UI基准":"相对于镜头","地图层级":"最顶层","地图图片层级":"80","---窗口皮肤---":"","布局模式":"默认窗口皮肤","布局透明度":"0","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","是否锁定窗口色调":"false","窗口色调-红":"0","窗口色调-绿":"0","窗口色调-蓝":"0","---窗口属性---":"","窗口内边距":"10","窗口字体大小":"26","窗口字体类型":"SimHei","窗口附加宽度":"0","窗口附加高度":"0"}
 * 
 * @param 视频弹幕样式-3
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==带框弹幕（相对于地图）==","---常规---":"","默认内容文本":"\"\"","---层级---":"","UI基准":"相对于地图","地图层级":"最顶层","地图图片层级":"80","---窗口皮肤---":"","布局模式":"默认窗口皮肤","布局透明度":"192","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","是否锁定窗口色调":"false","窗口色调-红":"0","窗口色调-绿":"0","窗口色调-蓝":"0","---窗口属性---":"","窗口内边距":"10","窗口字体大小":"26","窗口字体类型":"SimHei","窗口附加宽度":"0","窗口附加高度":"0"}
 * 
 * @param 视频弹幕样式-4
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==带框弹幕（相对于镜头）==","---常规---":"","默认内容文本":"\"\"","---层级---":"","UI基准":"相对于镜头","地图层级":"最顶层","地图图片层级":"80","---窗口皮肤---":"","布局模式":"默认窗口皮肤","布局透明度":"192","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","是否锁定窗口色调":"false","窗口色调-红":"0","窗口色调-绿":"0","窗口色调-蓝":"0","---窗口属性---":"","窗口内边距":"10","窗口字体大小":"26","窗口字体类型":"SimHei","窗口附加宽度":"0","窗口附加高度":"0"}
 * 
 * @param 视频弹幕样式-5
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-6
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-7
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-8
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-9
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-10
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-11
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-12
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-13
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-14
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-15
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-16
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-17
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-18
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-19
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 视频弹幕样式-20
 * @parent ---样式组 1至20---
 * @type struct<DrillGFVBStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillGFVBStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的视频弹幕样式==
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
 * @default 26
 *
 * @param 窗口字体类型
 * @parent ---窗口属性---
 * @desc 需要 字体管理器 插件支持。默认为"GameFont"。你也可以填系统自带的"SimHei"黑体，"SimSun"宋体。
 * @default SimHei
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
//		插件简称		GFVB (Gauge_Floating_Temporary_Text)
//		临时全局变量	DrillUp.g_GFVB_xxx
//		临时局部变量	this._drill_GFVB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)  每帧
//		★性能测试因素	UI管理层测试
//		★性能测试消耗	324.1ms（Drill_GFVB_Window.initialize）119.1ms（Drill_GFVB_Window.update）22.4ms（drill_GFVB_updateWindowPosition）
//		★最坏情况		大量弹幕同时播放
//		★备注			移动过程的消耗并不大，创建窗口的消耗反而非常大。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆变量获取
//			->☆插件指令
//				->简单指令
//				->高级指令
//			->☆地图层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			
//			->☆临时对象
//				->高级指令 初始化
//				->高级指令 创建
//				->修改样式属性
//			
//			->☆占位排队控制
//			->弹幕占位分配器【Drill_GFVB_SeatAllocator】
//				->A主体
//				->B注册
//			
//			->☆泳道排队控制
//			->弹幕泳道分配器【Drill_GFVB_LaneAllocator】
//				->A泳道主体
//				->B泳道注册
//				->C泳道分配
//			
//			->☆录制弹幕?
//			->☆贴图控制
//			->地图临时 漂浮文字窗口【Drill_GFVB_Window】
//				->A主体
//					->窗口字体类型
//				->B窗口弹道
//					->弹幕发射器
//				->C窗口皮肤
//				->D窗口内容
//			
//			
//		★家谱：
//			大家族-漂浮文字
//			
//		★插件私有类：
//			* 地图临时 漂浮文字窗口【Drill_GFVB_Window】
//			
//		★必要注意事项：
//			1.所有子插件功能介绍去看看："13.UI > 大家族-漂浮文字（脚本）.docx"。
//			2.插件含分配器，需要排队，超时则销毁。
//			3.注册成功后一次性分配位置。
//
//		★其它说明细节：
//			1.三个分配器都是一次性分配，不存储窗口对象。
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
	DrillUp.g_GFVB_PluginTip_curName = "Drill_GaugeFloatingVideoBarrage.js 地图UI-临时漂浮视频弹幕";
	DrillUp.g_GFVB_PluginTip_baseList = [
		"Drill_CoreOfBallistics.js 系统-弹道核心",
		"Drill_CoreOfWindowAuxiliary.js 系统-窗口辅助核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_GFVB_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_GFVB_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_GFVB_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_GFVB_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_GFVB_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 缺少支持的插件
	//==============================
	DrillUp.drill_GFVB_getPluginTip_NoSupportPlugin = function(){
		return "【" + DrillUp.g_GFVB_PluginTip_curName + "】\n缺少 字符串核心 插件，插件指令执行失败。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_GFVB_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_GFVB_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 临时对象 内容文本为空
	//==============================
	DrillUp.drill_GFVB_getPluginTip_DataIsEmpty = function(){
		return "【" + DrillUp.g_GFVB_PluginTip_curName + "】\n插件指令错误，你使用高级指令时，内容文本为空，将不显示任何文本。";
	};
	//==============================
	// * 提示信息 - 报错 - 临时对象 未初始化
	//==============================
	DrillUp.drill_GFVB_getPluginTip_BufferIsNull = function(){
		return "【" + DrillUp.g_GFVB_PluginTip_curName + "】\n插件指令错误，你使用高级指令时，未执行临时对象的初始化指令。";
	};
	
	
//=============================================================================
// ** ☆变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeFloatingVideoBarrage = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeFloatingVideoBarrage');
	
	
	//==============================
	// * 变量获取 - 视频弹幕样式
	//				（~struct~DrillGFVBStyle）
	//==============================
	DrillUp.drill_GFVB_initContext = function( dataFrom ) {
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
		data['window_padding'] = Number( dataFrom["窗口内边距"] || 18);
		data['window_fontsize'] = Number( dataFrom["窗口字体大小"] || 26);
		data['window_fontFace'] = String( dataFrom["窗口字体类型"] || "SimHei");
		data['window_ex_width'] = Number( dataFrom["窗口附加宽度"] || 0);
		data['window_ex_height'] = Number( dataFrom["窗口附加高度"] || 0);
		
		data['offsetEx_x'] = 0;	//（额外位置偏移，注意此配置在样式中）
		data['offsetEx_y'] = 0;
		return data;
	}
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_GFVB_simple_defaultStyleId = Number(DrillUp.parameters["简单指令的默认样式"] || 1); 
	DrillUp.g_GFVB_simple_lane_time = Number(DrillUp.parameters["常规弹幕持续时间"] || 1200); 
	DrillUp.g_GFVB_simple_seatUpper_time = Number(DrillUp.parameters["正上方弹幕持续时间"] || 120); 
	DrillUp.g_GFVB_simple_seatLower_time = Number(DrillUp.parameters["正下方弹幕持续时间"] || 120); 
	
	/*-----------------视频弹幕设置------------------*/
	DrillUp.g_GFVB_emitTrack_height = Number(DrillUp.parameters["泳道高度"] || 28); 
	DrillUp.g_GFVB_emitTrack_upper_count = Number(DrillUp.parameters["上方泳道数量"] || 8); 
	DrillUp.g_GFVB_emitTrack_lower_count = Number(DrillUp.parameters["下方泳道数量"] || 4); 
	DrillUp.g_GFVB_emitTrack_space = Number(DrillUp.parameters["常规弹幕最短间隔"] || 10); 
	DrillUp.g_GFVB_emitTrack_speed = Number(DrillUp.parameters["常规弹幕移动速度"] || 2.5); 
	
	/*-----------------视频弹幕样式集合------------------*/
	DrillUp.g_GFVB_style_length = 20;
	DrillUp.g_GFVB_style = [];
	for( var i = 0; i < DrillUp.g_GFVB_style_length; i++ ){
		if( DrillUp.parameters["视频弹幕样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["视频弹幕样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["视频弹幕样式-" + String(i+1) ]);
			DrillUp.g_GFVB_style[i] = DrillUp.drill_GFVB_initContext( temp );
		}else{
			DrillUp.g_GFVB_style[i] = DrillUp.drill_GFVB_initContext( {} );
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_GFVB_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GFVB_pluginCommand.call(this, command, args);
	if(command === ">地图临时漂浮视频弹幕"){
		
		
		/*-----------------立刻清除全部弹幕------------------*/
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "立刻清除全部弹幕" ){
				$gameTemp._drill_GFVB_clearAllCurrentWindow = true;
			}
		}
		
		
		/*-----------------简单指令------------------*/
		if( args.length >= 6 ){		//（考虑变化参数数量情况，但不考虑 文本含空格 情况）
			var unit = String(args[1]);
			var param_type = String(args[3]);
			var temp2 = String(args[5]);
			if( unit == "简单临时对象" ){
				if( temp2.indexOf("文本[") != -1 ){
					temp2 = temp2.replace("文本[","");
					temp2 = temp2.replace(/\]$/,"");	//（去掉末尾的]）
				}
				var style_id = args[7];
				var param_sustainTime = args[9];
				if( style_id != undefined ){
					style_id = style_id.replace("样式[","");
					style_id = style_id.replace("]","");
					style_id = Number(style_id)-1; 
				}
				if( param_sustainTime != undefined ){
					param_sustainTime = param_sustainTime.replace("持续时间[","");
					param_sustainTime = param_sustainTime.replace("]","");
					param_sustainTime = Number(param_sustainTime);
				}
				$gameTemp.drill_GFVB_createSimple( param_type, temp2, style_id, param_sustainTime );
			}
		}
		
		
		/*-----------------高级指令 - 初始化------------------*/
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时对象" && type == "初始化" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1)-1;
				$gameTemp.drill_GFVB_setBuffer( temp1 );
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
							$gameTemp.drill_GFVB_setStyle_context( temp1 );
						}else{
							alert( DrillUp.drill_GFVB_getPluginTip_NoSupportPlugin() );
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
						$gameTemp.drill_GFVB_setStyle_context( data_str );
						
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
						$gameTemp.drill_GFVB_setStyle_offset( Number(temp1[0]), Number(temp1[1]) );
					}
				}
				if( type == "修改样式属性-UI基准" ){
					$gameTemp.drill_GFVB_setStyle_benchmark( temp1 );
				}
				if( type == "修改样式属性-地图层级" ){
					$gameTemp.drill_GFVB_setStyle_layer( temp1 );
				}
				if( type == "修改样式属性-图片层级" ){
					temp1 = temp1.replace("图片层级[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_GFVB_setStyle_zIndex( Number(temp1) );
				}
				if( type == "修改样式属性-布局透明度" ){
					if( temp1.indexOf("透明度变量[") != -1 ){
						temp1 = temp1.replace("透明度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_GFVB_setStyle_opacity( temp1 );
					}
					else if( temp1.indexOf("透明度[") != -1 ){
						temp1 = temp1.replace("透明度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_GFVB_setStyle_opacity( temp1 );
					}
				}
				if( type == "修改样式属性-锁定窗口色调" ){
					if( temp1 == "开启锁定" ){
						$gameTemp.drill_GFVB_setStyle_toneLock( true );
					}
					if( temp1 == "关闭锁定" ){
						$gameTemp.drill_GFVB_setStyle_toneLock( false );
					}
				}
				if( type == "修改样式属性-窗口色调" ){
					temp1 = temp1.replace("色调[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( temp1.length >= 3 ){
						$gameTemp.drill_GFVB_setStyle_tone( Number(temp1[0]), Number(temp1[1]), Number(temp1[2]) );
					}
				}
				if( type == "修改样式属性-窗口附加宽度" ){
					temp1 = temp1.replace("值[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_GFVB_setStyle_exWidth( Number(temp1) );
				}
				if( type == "修改样式属性-窗口附加高度" ){
					temp1 = temp1.replace("值[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_GFVB_setStyle_exHeight( Number(temp1) );
				}
			}
		}
		
		/*-----------------高级指令 - 创建------------------*/
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var param_type = String(args[5]);
			if( unit == "临时对象" && type == "创建" ){
				$gameTemp.drill_GFVB_createByBuffer( param_type );
			}
		}
		if( args.length == 8 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var param_type = String(args[5]);
			var param_sustainTime = String(args[7]);
			if( unit == "临时对象" && type == "创建" ){
				param_sustainTime = param_sustainTime.replace("持续时间[","");
				param_sustainTime = param_sustainTime.replace("]","");
				param_sustainTime = Number(param_sustainTime);
				$gameTemp.drill_GFVB_createByBuffer( param_type, param_sustainTime );
			}
		}
		
		
	};
};



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
Scene_Map.prototype.drill_GFVB_layerAddSprite = function( sprite, layer_index ){
	this.drill_GFVB_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_GFVB_layerRemoveSprite = function( sprite ){
	this.drill_GFVB_layerRemoveSprite_Private( sprite );
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_GFVB_sortByZIndex = function () {
    this.drill_GFVB_sortByZIndex_Private();
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
Scene_Map.prototype.drill_GFVB_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_GFVB_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_GFVB_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_GFVB_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_GFVB_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_GFVB_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_GFVB_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_GFVB_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_GFVB_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GFVB_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_GFVB_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GFVB_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_GFVB_sortByZIndex_Private = function(){
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 去除贴图（私有）
//==============================
Scene_Map.prototype.drill_GFVB_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_mapDownArea.removeChild( sprite );
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
	this._spriteset._drill_mapPicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_GFVB_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Map.prototype.drill_GFVB_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
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



//=============================================================================
// ** ☆临时对象
//			
//			说明：	> 此模块专门管理 插件指令控制的临时对象 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 临时对象 - 容器初始化
//==============================
var _drill_GFVB_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_GFVB_temp_initialize.call(this);
	this._drill_GFVB_commandBuffer = null;		//临时对象
	this._drill_GFVB_commandSeq = [];			//漂浮文字容器
};
//==============================
// * 临时对象 - 容器销毁
//==============================
var _drill_GFVB_temp_terminate2 = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_GFVB_temp_terminate2.call(this);
	$gameTemp._drill_GFVB_commandBuffer = null;		//临时对象
	$gameTemp._drill_GFVB_commandSeq = [];			//漂浮文字容器
};
//==============================
// * 临时对象 - 简单指令
//==============================
Game_Temp.prototype.drill_GFVB_createSimple = function( param_type, text, style_id, param_sustainTime ){
	if( style_id == undefined ){ style_id = DrillUp.g_GFVB_simple_defaultStyleId -1; }
	if( param_sustainTime == undefined ){
		if( param_type == "常规弹幕" ){
			param_sustainTime = DrillUp.g_GFVB_simple_lane_time;
		}else if( param_type == "正上方弹幕" ){
			param_sustainTime = DrillUp.g_GFVB_simple_seatUpper_time;
		}else if( param_type == "正下方弹幕" ){
			param_sustainTime = DrillUp.g_GFVB_simple_seatLower_time;
		}else{
			param_sustainTime = 120;
		}
	}
	
	// > 基本参数初始化
	var data = {};
	data['s_data'] = JSON.parse(JSON.stringify( DrillUp.g_GFVB_style[ style_id ] ));
	data['b_data'] = {};	//（弹道由 弹幕发射器 负责）
	
	// > 临时对象设置
	data['param_type'] = param_type;
	data['param_sustainTime'] = param_sustainTime;
	
	// > 内容文本初始化
	data['s_data']['context'] = text;
	
	this._drill_GFVB_commandSeq.push( data );
};
//==============================
// * 临时对象 - 高级指令 初始化
//==============================
Game_Temp.prototype.drill_GFVB_setBuffer = function( style_id ){
	
	// > 基本参数初始化
	var data = {};
	data['s_data'] = JSON.parse(JSON.stringify( DrillUp.g_GFVB_style[ style_id ] ));
	data['b_data'] = {};	//（弹道由 弹幕发射器 负责）
	
	// > 临时对象设置
	data['param_type'] = "常规弹幕";
	data['param_sustainTime'] = DrillUp.g_GFVB_simple_lane_time;
	
	this._drill_GFVB_commandBuffer = data;
};
//==============================
// * 临时对象 - 高级指令 创建
//==============================
Game_Temp.prototype.drill_GFVB_createByBuffer = function( param_type, param_sustainTime ){
	var data = this._drill_GFVB_commandBuffer;
	if( data == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	data = JSON.parse(JSON.stringify( data ));
	if( param_sustainTime == undefined ){
		if( param_type == "常规弹幕" ){
			param_sustainTime = DrillUp.g_GFVB_simple_lane_time;
		}else if( param_type == "正上方弹幕" ){
			param_sustainTime = DrillUp.g_GFVB_simple_seatUpper_time;
		}else if( param_type == "正下方弹幕" ){
			param_sustainTime = DrillUp.g_GFVB_simple_seatLower_time;
		}else{
			param_sustainTime = 120;
		}
	}
	
	// > 临时对象设置
	data['param_type'] = param_type;
	data['param_sustainTime'] = param_sustainTime;
	
	// > 内容文本初始化
	var text = data['s_data']['context'];
	if( text == "" ){										// 空文本 提示错误
		alert( DrillUp.drill_GFVB_getPluginTip_DataIsEmpty() );
		return;
	}
	data['s_data']['context'] = text;
	
	this._drill_GFVB_commandSeq.push( data );
};
//==============================
// * 临时对象 - 修改样式属性-内容文本
//==============================
Game_Temp.prototype.drill_GFVB_setStyle_context = function( context ){
	if( this._drill_GFVB_commandBuffer == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFVB_commandBuffer['s_data']['context'] = context;
};
//==============================
// * 临时对象 - 修改样式属性-额外位置偏移
//==============================
Game_Temp.prototype.drill_GFVB_setStyle_offset = function( xx, yy ){
	if( this._drill_GFVB_commandBuffer == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFVB_commandBuffer['s_data']['offsetEx_x'] = xx;
	this._drill_GFVB_commandBuffer['s_data']['offsetEx_y'] = yy;
};
//==============================
// * 临时对象 - 修改样式属性-UI基准
//==============================
Game_Temp.prototype.drill_GFVB_setStyle_benchmark = function( benchmark ){
	if( this._drill_GFVB_commandBuffer == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFVB_commandBuffer['s_data']['window_benchmark'] = benchmark;
};
//==============================
// * 临时对象 - 修改样式属性-地图层级
//==============================
Game_Temp.prototype.drill_GFVB_setStyle_layer = function( layer ){
	if( this._drill_GFVB_commandBuffer == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFVB_commandBuffer['s_data']['window_map_layer'] = layer;
};
//==============================
// * 临时对象 - 修改样式属性-图片层级
//==============================
Game_Temp.prototype.drill_GFVB_setStyle_zIndex = function( zIndex ){
	if( this._drill_GFVB_commandBuffer == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFVB_commandBuffer['s_data']['window_map_zIndex'] = zIndex;
};
//==============================
// * 临时对象 - 修改样式属性-布局透明度
//==============================
Game_Temp.prototype.drill_GFVB_setStyle_opacity = function( opacity ){
	if( this._drill_GFVB_commandBuffer == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFVB_commandBuffer['s_data']['window_opacity'] = opacity;
};
//==============================
// * 临时对象 - 修改样式属性-锁定窗口色调
//==============================
Game_Temp.prototype.drill_GFVB_setStyle_toneLock = function( locked ){
	if( this._drill_GFVB_commandBuffer == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFVB_commandBuffer['s_data']['window_tone_lock'] = locked;
};
//==============================
// * 临时对象 - 修改样式属性-窗口色调
//==============================
Game_Temp.prototype.drill_GFVB_setStyle_tone = function( r, g, b ){
	if( this._drill_GFVB_commandBuffer == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFVB_commandBuffer['s_data']['window_tone_r'] = r;
	this._drill_GFVB_commandBuffer['s_data']['window_tone_g'] = g;
	this._drill_GFVB_commandBuffer['s_data']['window_tone_b'] = b;
};
//==============================
// * 临时对象 - 修改样式属性-窗口附加宽度
//==============================
Game_Temp.prototype.drill_GFVB_setStyle_exWidth = function( width ){
	if( this._drill_GFVB_commandBuffer == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFVB_commandBuffer['s_data']['window_ex_width'] = width;
};
//==============================
// * 临时对象 - 修改样式属性-窗口附加高度
//==============================
Game_Temp.prototype.drill_GFVB_setStyle_exHeight = function( height ){
	if( this._drill_GFVB_commandBuffer == undefined ){ alert( DrillUp.drill_GFVB_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFVB_commandBuffer['s_data']['window_ex_height'] = height;
};



//=============================================================================
// ** ☆占位排队控制
//			
//			说明：	> 此模块专门管理 漂浮文字窗口 的占位排队。
//					> 创建 漂浮文字窗口 后，添加到容器即表示开始排队注册，注册成功后 刷新弹道。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 占位排队控制 - 贴图容器 初始化
//==============================
var _drill_GFVB_map_initialize1 = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_GFVB_map_initialize1.call(this);
	
	// > 正上方弹幕
	var seat_height = DrillUp.g_GFVB_emitTrack_height;
	this._drill_GFVB_seatUpper_QueueUpTank = [];									//占位排队控制
	var data = {
		'seat_count': DrillUp.g_GFVB_emitTrack_upper_count,
		'seat_x': Graphics.boxWidth*0.5,
		'seat_y': 0,
		'seat_height': seat_height,
	};
	this._drill_GFVB_seatUpper_Allocator = new Drill_GFVB_SeatAllocator( data );	//泳道分配器
	
	// > 正下方弹幕
	this._drill_GFVB_seatLower_QueueUpTank = [];									//占位排队控制
	var data = {
		'seat_count': DrillUp.g_GFVB_emitTrack_lower_count,
		'seat_x': Graphics.boxWidth*0.5,
		'seat_y': Graphics.boxHeight,
		'seat_height': seat_height *(-1),
	};
	this._drill_GFVB_seatLower_Allocator = new Drill_GFVB_SeatAllocator( data );	//泳道分配器
};
//==============================
// * 占位排队控制 - 帧刷新
//==============================
var _drill_GFVB_map_update1 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GFVB_map_update1.call(this);
	if( this.isActive() ){
		this.drill_GFVB_seatUpper_updateRegist();						//帧刷新 - 等候注册_正上方弹幕
		this.drill_GFVB_seatUpper_updateTimeOut();						//帧刷新 - 排队超时_正上方弹幕（删除贴图）
		this._drill_GFVB_seatUpper_Allocator.drill_allocator_update();	//帧刷新 - 分配器_正上方弹幕
		this.drill_GFVB_seatLower_updateRegist();						//帧刷新 - 等候注册_正下方弹幕
		this.drill_GFVB_seatLower_updateTimeOut();						//帧刷新 - 排队超时_正下方弹幕（删除贴图）
		this._drill_GFVB_seatLower_Allocator.drill_allocator_update();	//帧刷新 - 分配器_正下方弹幕
	}
};
//==============================
// * 占位排队控制 - 帧刷新 等候注册_正上方弹幕
//==============================
Scene_Map.prototype.drill_GFVB_seatUpper_updateRegist = function() {
	for( var i = this._drill_GFVB_seatUpper_QueueUpTank.length-1; i >= 0; i-- ){	//（倒序遍历）
		var temp_window = this._drill_GFVB_seatUpper_QueueUpTank[i];
		var regist_data = this._drill_GFVB_seatUpper_Allocator.drill_allocator_doRegist( temp_window );
		
		// > 注册失败，等待
		if( regist_data == null ){ return; }
		
		
		// > 物品信息 控制
		var data = temp_window._drill_data;
		var b_data = temp_window._drill_data['b_data'];
		b_data['orgX'] = regist_data['x'];
		b_data['orgY'] = regist_data['y'];
		b_data['orgOpacity'] = 255;
		
		b_data['movementNum'] = 1;
		b_data['movementTime'] = data['param_sustainTime'];
		b_data['movementDelay'] = 0;
		b_data['movementEndDelay'] = 0;
		b_data['movementMode'] = "极坐标模式";
		
		b_data['polarSpeedType'] = "只初速度";	//（不移动）
		b_data['polarSpeedBase'] = 0;
		b_data['polarDirType'] = "固定方向";
		b_data['polarDirFixed'] = 180;
		
		// > 透明度设置
		b_data['opacity_type'] = "保持原透明度";
	
		// > 刷新弹道
		temp_window._drill_curTime = 0;
		temp_window.drill_refreshBallistics( b_data );
		
		
		// > 从容器中去除
		this._drill_GFVB_seatUpper_QueueUpTank.splice( i, 1 );
	}
}
//==============================
// * 占位排队控制 - 帧刷新 排队超时_正上方弹幕（删除贴图）
//==============================
Scene_Map.prototype.drill_GFVB_seatUpper_updateTimeOut = function() {
	for( var i = this._drill_GFVB_seatUpper_QueueUpTank.length-1; i >= 0; i-- ){
		var temp_window = this._drill_GFVB_seatUpper_QueueUpTank[i];
		if( temp_window._drill_curTime > 60 ){	//（最多排队等待60帧）
			
			// > 手动销毁
			temp_window._drill_destroyed = true;
			
			// > 从容器中去除
			this._drill_GFVB_seatUpper_QueueUpTank.splice( i, 1 );
		}
	}
}
//==============================
// * 占位排队控制 - 帧刷新 等候注册_正下方弹幕
//==============================
Scene_Map.prototype.drill_GFVB_seatLower_updateRegist = function() {
	for( var i = this._drill_GFVB_seatLower_QueueUpTank.length-1; i >= 0; i-- ){	//（倒序遍历）
		var temp_window = this._drill_GFVB_seatLower_QueueUpTank[i];
		var regist_data = this._drill_GFVB_seatLower_Allocator.drill_allocator_doRegist( temp_window );
		
		// > 注册失败，等待
		if( regist_data == null ){ return; }
		
		
		// > 物品信息 控制
		var data = temp_window._drill_data;
		var b_data = temp_window._drill_data['b_data'];
		b_data['orgX'] = regist_data['x'];
		b_data['orgY'] = regist_data['y'];
		b_data['orgOpacity'] = 255;
		
		b_data['movementNum'] = 1;
		b_data['movementTime'] = data['param_sustainTime'];
		b_data['movementDelay'] = 0;
		b_data['movementEndDelay'] = 0;
		b_data['movementMode'] = "极坐标模式";
		
		b_data['polarSpeedType'] = "只初速度";	//（不移动）
		b_data['polarSpeedBase'] = 0;
		b_data['polarDirType'] = "固定方向";
		b_data['polarDirFixed'] = 180;
		
		// > 透明度设置
		b_data['opacity_type'] = "保持原透明度";
	
		// > 刷新弹道
		temp_window._drill_curTime = 0;
		temp_window.drill_refreshBallistics( b_data );
		
		
		// > 从容器中去除
		this._drill_GFVB_seatLower_QueueUpTank.splice( i, 1 );
	}
}
//==============================
// * 占位排队控制 - 帧刷新 排队超时_正下方弹幕（删除贴图）
//==============================
Scene_Map.prototype.drill_GFVB_seatLower_updateTimeOut = function() {
	for( var i = this._drill_GFVB_seatLower_QueueUpTank.length-1; i >= 0; i-- ){
		var temp_window = this._drill_GFVB_seatLower_QueueUpTank[i];
		if( temp_window._drill_curTime > 60 ){	//（最多排队等待60帧）
			
			// > 手动销毁
			temp_window._drill_destroyed = true;
			
			// > 从容器中去除
			this._drill_GFVB_seatLower_QueueUpTank.splice( i, 1 );
		}
	}
}



//=============================================================================
// ** 弹幕占位分配器【Drill_GFVB_SeatAllocator】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个分配器。
// **		子功能：	->分配器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->暂停/继续
// **						->销毁
// **					->A占位主体
// **					->B占位注册
// **						->执行注册
// **					->C占位分配
// **		
// **		说明：	> 该类可存储在 $gameSystem 中。
// **				> 注意，该类不管 注册排队的队列，你需要自己建立容器让注册对象参与排队。
//=============================================================================
//==============================
// * 占位分配器 - 定义
//==============================
function Drill_GFVB_SeatAllocator(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 占位分配器 - 初始化
//==============================
Drill_GFVB_SeatAllocator.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_allocatorSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_allocator_initData();										//初始化数据
    this.drill_allocator_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_allocator_resetData( data );
}
//##############################
// * 占位分配器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_GFVB_SeatAllocator.prototype.drill_allocator_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_allocator_updateAttr();					//帧刷新 - A占位主体
	this.drill_allocator_updateRegist();				//帧刷新 - B占位注册
	this.drill_allocator_updateSeat();					//帧刷新 - C占位分配
}
//##############################
// * 占位分配器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_GFVB_SeatAllocator.prototype.drill_allocator_resetData = function( data ){
	this.drill_allocator_resetData_Private( data );
};
//##############################
// * 占位分配器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_GFVB_SeatAllocator.prototype.drill_allocator_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 占位分配器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_GFVB_SeatAllocator.prototype.drill_allocator_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 占位分配器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_GFVB_SeatAllocator.prototype.drill_allocator_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * B占位注册 - 执行注册【标准函数】
//
//			参数：	> obj 对象
//			返回：	> 结果参数对象 （注册成功的返回数据）
//			
//			说明：	> 注册成功则返回 结果参数对象， 注册失败返回 null。
//					> 可放在帧刷新函数中实时调用。
//					  由于此功能基于 时间差阻塞，注册失败的对象，需要再次调用注册，直到注册成功。
//##############################
Drill_GFVB_SeatAllocator.prototype.drill_allocator_doRegist = function( obj ){
	return this.drill_allocator_doRegist_Private( obj );
};

//##############################
// * 占位分配器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_GFVB_SeatAllocator.prototype.drill_allocator_initData = function(){
	var data = this._drill_data;
	
	// > 分配器
	if( data['pause'] == undefined ){ data['pause'] = false };					//分配器 - 暂停情况
	
	// > A占位主体
	//	（无）
	
	// > B占位注册
	//	（无）
	
	// > C占位分配
	if( data['seat_count'] == undefined ){ data['seat_count'] = 4 };			//C占位分配 - 占位数量
	if( data['seat_x'] == undefined ){ data['seat_x'] = Graphics.boxWidth };	//C占位分配 - 起始点X
	if( data['seat_y'] == undefined ){ data['seat_y'] = 0 };					//C占位分配 - 起始点Y
	if( data['seat_height'] == undefined ){ data['seat_height'] = 28 };			//C占位分配 - 占位高度
}
//==============================
// * 初始化 - 初始化子功能
//==============================
Drill_GFVB_SeatAllocator.prototype.drill_allocator_initChild = function(){
	this.drill_allocator_initAttr();			//初始化子功能 - A占位主体
	this.drill_allocator_initRegist();			//初始化子功能 - B占位注册
	this.drill_allocator_initSeat();			//初始化子功能 - C占位分配
}
//==============================
// * 占位分配器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_GFVB_SeatAllocator.prototype.drill_allocator_resetData_Private = function( data ){
	
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
// * A占位主体 - 初始化子功能
//==============================
Drill_GFVB_SeatAllocator.prototype.drill_allocator_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A占位主体 - 帧刷新
//==============================
Drill_GFVB_SeatAllocator.prototype.drill_allocator_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
}


//==============================
// * B占位注册 - 初始化子功能
//==============================
Drill_GFVB_SeatAllocator.prototype.drill_allocator_initRegist = function() {
	var data = this._drill_data;
	//（无）
}
//==============================
// * B占位注册 - 帧刷新
//==============================
Drill_GFVB_SeatAllocator.prototype.drill_allocator_updateRegist = function() {
	var data = this._drill_data;
	//（无）
}
//==============================
// * B占位注册 - 执行注册（私有）
//==============================
Drill_GFVB_SeatAllocator.prototype.drill_allocator_doRegist_Private = function( obj ){
	var data = this._drill_data;
	
	// > 暂停时，关闭注册
	if( data['pause'] == true ){ return null; }
	
	// > 被销毁，关闭注册
	if( this._drill_needDestroy == true ){ return null; }
	
	
	// > 占位分配
	for(var i = 0; i < this._drill_seat_timeSeq.length; i++ ){
		
		// > 被占用的占位，跳过
		if( this.drill_allocator_isSeatOccupyed(i) == true ){ continue; }
		
		// > 重置占用时间
		this._drill_seat_timeSeq[i] = obj._drill_data['param_sustainTime'];	//（注意此处持续时间）
		
		// > 位置
		var xx = data['seat_x'];
		var yy = data['seat_y'];
		
		// > 位置 - 居中 窗口中心锚点
		xx += 0;
		yy += 0.5 * data['seat_height'];
		
		// > 位置 - 第n条占位位置
		xx += 0;
		yy += i * data['seat_height'];
		
		var pos_data = {};
		pos_data['x'] = xx;
		pos_data['y'] = yy;
		pos_data['index'] = i;
		return pos_data;
	}
	return null;
}

//==============================
// * C占位分配 - 初始化子功能
//==============================
Drill_GFVB_SeatAllocator.prototype.drill_allocator_initSeat = function() {
	var data = this._drill_data;
	
	// > 占位序列
	this._drill_seat_timeSeq = [];
	for(var i = 0; i < data['seat_count']; i++ ){
		this._drill_seat_timeSeq[i] = 0;
	}
}
//==============================
// * C占位分配 - 帧刷新
//==============================
Drill_GFVB_SeatAllocator.prototype.drill_allocator_updateSeat = function() {
	for(var i = 0; i < this._drill_seat_timeSeq.length; i++ ){
		this._drill_seat_timeSeq[i] -= 1;		//（每帧时间-1）
	}
}
//==============================
// * C占位分配 - 是否被占用
//==============================
Drill_GFVB_SeatAllocator.prototype.drill_allocator_isSeatOccupyed = function( i ){
	return this._drill_seat_timeSeq[i] > 0;
}




//=============================================================================
// ** ☆泳道排队控制
//			
//			说明：	> 此模块专门管理 漂浮文字窗口 的泳道排队。
//					> 创建 漂浮文字窗口 后，添加到容器即表示开始排队注册，注册成功后 刷新弹道。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 泳道排队控制 - 贴图容器 初始化
//==============================
var _drill_GFVB_map_initialize2 = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_GFVB_map_initialize2.call(this);
	this._drill_GFVB_lane_QueueUpTank = [];									//泳道排队容器
	var data = {
		'lane_count': DrillUp.g_GFVB_emitTrack_upper_count,
		'lane_x': Graphics.boxWidth + 20,
		'lane_y': 0,
		'lane_height': DrillUp.g_GFVB_emitTrack_height,
		'lane_space': DrillUp.g_GFVB_emitTrack_space,
		'lane_speed': DrillUp.g_GFVB_emitTrack_speed,
	};
	this._drill_GFVB_lane_Allocator = new Drill_GFVB_LaneAllocator( data );	//泳道分配器
};
//==============================
// * 泳道排队控制 - 帧刷新
//==============================
var _drill_GFVB_map_update2 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GFVB_map_update2.call(this);
	if( this.isActive() ){
		this.drill_GFVB_lane_updateRegist();						//帧刷新 - 等候注册
		this.drill_GFVB_lane_updateTimeOut();						//帧刷新 - 排队超时（删除贴图）
		this._drill_GFVB_lane_Allocator.drill_allocator_update();	//帧刷新 - 分配器
	}
};
//==============================
// * 泳道排队控制 - 帧刷新 等候注册
//==============================
Scene_Map.prototype.drill_GFVB_lane_updateRegist = function() {
	for( var i = this._drill_GFVB_lane_QueueUpTank.length-1; i >= 0; i-- ){	//（倒序遍历）
		var temp_window = this._drill_GFVB_lane_QueueUpTank[i];
		var regist_data = this._drill_GFVB_lane_Allocator.drill_allocator_doRegist( temp_window );
		
		// > 注册失败，等待
		if( regist_data == null ){ return; }
		
		
		// > 物品信息 控制
		var data = temp_window._drill_data;
		var b_data = temp_window._drill_data['b_data'];
		b_data['orgX'] = regist_data['x'];
		b_data['orgY'] = regist_data['y'];
		b_data['orgOpacity'] = 255;
		
		b_data['movementNum'] = 1;
		b_data['movementTime'] = data['param_sustainTime'];
		b_data['movementDelay'] = 0;
		b_data['movementEndDelay'] = 0;
		b_data['movementMode'] = "极坐标模式";
		
		b_data['polarSpeedType'] = "只初速度";
		b_data['polarSpeedBase'] = regist_data['cur_speed'];
		b_data['polarDirType'] = "固定方向";
		b_data['polarDirFixed'] = 180;
		
		// > 透明度设置
		b_data['opacity_type'] = "先显现后消失(快速)";
	
		// > 刷新弹道
		temp_window._drill_curTime = 0;
		temp_window.drill_refreshBallistics( b_data );
		
		
		// > 从容器中去除
		this._drill_GFVB_lane_QueueUpTank.splice( i, 1 );
	}
}
//==============================
// * 泳道排队控制 - 帧刷新 贴图删除（排队超时的）
//==============================
Scene_Map.prototype.drill_GFVB_lane_updateTimeOut = function() {
	for( var i = this._drill_GFVB_lane_QueueUpTank.length-1; i >= 0; i-- ){
		var temp_window = this._drill_GFVB_lane_QueueUpTank[i];
		if( temp_window._drill_curTime > 60 ){	//（最多排队等待60帧）
			
			// > 手动销毁
			temp_window._drill_destroyed = true;
			
			// > 从容器中去除
			this._drill_GFVB_lane_QueueUpTank.splice( i, 1 );
		}
	}
}


//=============================================================================
// ** 弹幕泳道分配器【Drill_GFVB_LaneAllocator】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个分配器。
// **		子功能：	->分配器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->暂停/继续
// **						->销毁
// **					->A泳道主体
// **					->B泳道注册
// **						->执行注册
// **					->C泳道分配
// **		
// **		说明：	> 该类可存储在 $gameSystem 中。
// **				> 注意，该类不管 注册排队的队列，你需要自己建立容器让注册对象参与排队。
//=============================================================================
//==============================
// * 泳道分配器 - 定义
//==============================
function Drill_GFVB_LaneAllocator(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 泳道分配器 - 初始化
//==============================
Drill_GFVB_LaneAllocator.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_allocatorSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_allocator_initData();										//初始化数据
    this.drill_allocator_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_allocator_resetData( data );
}
//##############################
// * 泳道分配器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_GFVB_LaneAllocator.prototype.drill_allocator_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_allocator_updateAttr();					//帧刷新 - A泳道主体
	this.drill_allocator_updateRegist();				//帧刷新 - B泳道注册
	this.drill_allocator_updateLane();					//帧刷新 - C泳道分配
}
//##############################
// * 泳道分配器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_GFVB_LaneAllocator.prototype.drill_allocator_resetData = function( data ){
	this.drill_allocator_resetData_Private( data );
};
//##############################
// * 泳道分配器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_GFVB_LaneAllocator.prototype.drill_allocator_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 泳道分配器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_GFVB_LaneAllocator.prototype.drill_allocator_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 泳道分配器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_GFVB_LaneAllocator.prototype.drill_allocator_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * B泳道注册 - 执行注册【标准函数】
//
//			参数：	> obj 对象
//			返回：	> 结果参数对象 （注册成功的返回数据）
//			
//			说明：	> 注册成功则返回 结果参数对象， 注册失败返回 null。
//					> 可放在帧刷新函数中实时调用。
//					  由于此功能基于 时间差阻塞，注册失败的对象，需要再次调用注册，直到注册成功。
//##############################
Drill_GFVB_LaneAllocator.prototype.drill_allocator_doRegist = function( obj ){
	return this.drill_allocator_doRegist_Private( obj );
};

//##############################
// * 泳道分配器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_GFVB_LaneAllocator.prototype.drill_allocator_initData = function(){
	var data = this._drill_data;
	
	// > 分配器
	if( data['pause'] == undefined ){ data['pause'] = false };					//分配器 - 暂停情况
	
	// > A泳道主体
	//	（无）
	
	// > B泳道注册
	//	（无）
	
	// > C泳道分配
	if( data['lane_count'] == undefined ){ data['lane_count'] = 4 };			//C泳道分配 - 泳道数量
	if( data['lane_x'] == undefined ){ data['lane_x'] = Graphics.boxWidth };	//C泳道分配 - 起始点X
	if( data['lane_y'] == undefined ){ data['lane_y'] = 0 };					//C泳道分配 - 起始点Y
	if( data['lane_height'] == undefined ){ data['lane_height'] = 28 };			//C泳道分配 - 泳道高度
	if( data['lane_space'] == undefined ){ data['lane_space'] = 10 };			//C泳道分配 - 常规弹幕最短间隔
	if( data['lane_speed'] == undefined ){ data['lane_speed'] = 2.5 };			//C泳道分配 - 弹幕移动速度
}
//==============================
// * 初始化 - 初始化子功能
//==============================
Drill_GFVB_LaneAllocator.prototype.drill_allocator_initChild = function(){
	this.drill_allocator_initAttr();			//初始化子功能 - A泳道主体
	this.drill_allocator_initRegist();			//初始化子功能 - B泳道注册
	this.drill_allocator_initLane();			//初始化子功能 - C泳道分配
}
//==============================
// * 泳道分配器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_GFVB_LaneAllocator.prototype.drill_allocator_resetData_Private = function( data ){
	
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
// * A泳道主体 - 初始化子功能
//==============================
Drill_GFVB_LaneAllocator.prototype.drill_allocator_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A泳道主体 - 帧刷新
//==============================
Drill_GFVB_LaneAllocator.prototype.drill_allocator_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
}


//==============================
// * B泳道注册 - 初始化子功能
//==============================
Drill_GFVB_LaneAllocator.prototype.drill_allocator_initRegist = function() {
	var data = this._drill_data;
	//（无）
}
//==============================
// * B泳道注册 - 帧刷新
//==============================
Drill_GFVB_LaneAllocator.prototype.drill_allocator_updateRegist = function() {
	var data = this._drill_data;
	//（无）
}
//==============================
// * B泳道注册 - 执行注册（私有）
//==============================
Drill_GFVB_LaneAllocator.prototype.drill_allocator_doRegist_Private = function( obj ){
	var data = this._drill_data;
	
	// > 暂停时，关闭注册
	if( data['pause'] == true ){ return null; }
	
	// > 被销毁，关闭注册
	if( this._drill_needDestroy == true ){ return null; }
	
	
	// > 泳道分配
	for(var i = 0; i < this._drill_lane_distanceSeq.length; i++ ){
		
		// > 被占用的泳道，跳过
		if( this.drill_allocator_isLaneOccupyed(i) == true ){ continue; }
		
		
		// > 未被占用时
		var total_width = Graphics.boxWidth + obj.width + 20;			//弹幕总距离
		var total_time = total_width / data['lane_speed'];				//弹幕消耗总时间
		
		var idle_distance = this._drill_lane_distanceSeq[i] * -1;		//闲置距离
		if( idle_distance > total_width ){ idle_distance = total_width;}//
		var idle_speed = idle_distance / total_time;					//闲置富余速度值
		
		var cur_speed = data['lane_speed'];		//（基础速度+富余速度）
		if( idle_speed > 0 ){
			cur_speed += idle_speed * Math.random();
		}
		
		
		// > 重置占用长度
		this._drill_lane_distanceSeq[i] = obj.width + data['lane_space'];
		
		// > 位置
		var xx = data['lane_x'];
		var yy = data['lane_y'];
		
		// > 位置 - 右对齐 窗口中心锚点
		xx += 0.5 * obj.width;
		yy += 0.5 * data['lane_height'];
		
		// > 位置 - 第n条泳道位置
		xx += 0;
		yy += i * data['lane_height'];
		
		var pos_data = {};
		pos_data['x'] = xx;
		pos_data['y'] = yy;
		pos_data['index'] = i;
		pos_data['cur_speed'] = cur_speed;
		return pos_data;
	}
	return null;
}

//==============================
// * C泳道分配 - 初始化子功能
//==============================
Drill_GFVB_LaneAllocator.prototype.drill_allocator_initLane = function() {
	var data = this._drill_data;
	
	// > 泳道序列
	this._drill_lane_distanceSeq = [];
	for(var i = 0; i < data['lane_count']; i++ ){
		this._drill_lane_distanceSeq[i] = -1;
	}
}
//==============================
// * C泳道分配 - 帧刷新
//==============================
Drill_GFVB_LaneAllocator.prototype.drill_allocator_updateLane = function() {
	var data = this._drill_data;
	for(var i = 0; i < this._drill_lane_distanceSeq.length; i++ ){
		this._drill_lane_distanceSeq[i] -= data['lane_speed'];		//（每帧减去 速度值）
	}
}
//==============================
// * C泳道分配 - 是否被占用
//==============================
Drill_GFVB_LaneAllocator.prototype.drill_allocator_isLaneOccupyed = function( i ){
	return this._drill_lane_distanceSeq[i] > 0;
}




//=============================================================================
// ** ☆录制弹幕
//			
//			说明：	> 开坑，但暂时不填。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//（暂时不填）



//=============================================================================
// ** ☆贴图控制
//			
//			说明：	> 此模块专门管理 漂浮文字窗口 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 贴图容器 初始化
//==============================
var _drill_GFVB_map_initialize3 = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_GFVB_map_initialize3.call(this);
	this._drill_GFVB_windowTank = [];			//贴图容器
};
//==============================
// * 贴图控制 - 帧刷新
//==============================
var _drill_GFVB_map_update3 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_GFVB_map_update3.call(this);
	if( this.isActive() ){
		this.drill_GFVB_updateWindowAddChild();			//帧刷新 - 指令建立贴图
		this.drill_GFVB_updateWindowDeleteCommand();	//帧刷新 - 清除指令
		this.drill_GFVB_updateWindowDelete();			//帧刷新 - 贴图删除
		this.drill_GFVB_updateWindowPosition();			//帧刷新 - 位置
	}
};
//==============================
// * 贴图控制 - 帧刷新 指令建立贴图
//==============================
Scene_Map.prototype.drill_GFVB_updateWindowAddChild = function() {
	for( var i = $gameTemp._drill_GFVB_commandSeq.length-1; i >= 0; i-- ){
		var temp_data = $gameTemp._drill_GFVB_commandSeq[i];
		if( temp_data == undefined ){ continue; }
		
		// > 层级初始化
		var temp_window = new Drill_GFVB_Window( temp_data );
		temp_window.zIndex = temp_data['s_data']['window_map_zIndex'];
		this._drill_GFVB_windowTank.push( temp_window );
		
		// > 排队
		if( temp_data['param_type'] == "常规弹幕" ){
			this._drill_GFVB_lane_QueueUpTank.unshift( temp_window );	//（头部塞入 泳道排队容器）
		}
		else if( temp_data['param_type'] == "正上方弹幕" ){
			temp_window.zIndex += 1;	//（提高一点优先级）
			this._drill_GFVB_seatUpper_QueueUpTank.unshift( temp_window );	//（头部塞入 占位排队容器）
		}
		else if( temp_data['param_type'] == "正下方弹幕" ){
			temp_window.zIndex += 1;	//（提高一点优先级）
			this._drill_GFVB_seatLower_QueueUpTank.unshift( temp_window );	//（头部塞入 占位排队容器）
		}else{
			temp_window._drill_destroyed = true; //（无类型的弹幕直接销毁）
		}
		
		
		// > 层级初始化
		this.drill_GFVB_layerAddSprite( temp_window, temp_data['s_data']['window_map_layer'] );
		
		// > 层级排序
		this.drill_GFVB_sortByZIndex();
		
		// > 出栈
		$gameTemp._drill_GFVB_commandSeq.splice( i, 1 );
	}
}
//==============================
// * 贴图控制 - 帧刷新 清除指令
//==============================
Scene_Map.prototype.drill_GFVB_updateWindowDeleteCommand = function() {
	if( $gameTemp._drill_GFVB_clearAllCurrentWindow != true ){ return; }
	$gameTemp._drill_GFVB_clearAllCurrentWindow = false;
	
	for( var i = 0; i < this._drill_GFVB_windowTank.length; i++ ){
		var temp_window = this._drill_GFVB_windowTank[i];
		
		//// > 正在排队的弹幕
		//if( this._drill_GFVB_lane_QueueUpTank.contains( temp_window ) ||
		//	this._drill_GFVB_seatUpper_QueueUpTank.contains( temp_window ) || 
		//	this._drill_GFVB_seatLower_QueueUpTank.contains( temp_window ) ){
		//	continue;
		//}
		
		// > 销毁标记
		temp_window._drill_destroyed = true;
	}
}
//==============================
// * 贴图控制 - 帧刷新 贴图删除
//==============================
Scene_Map.prototype.drill_GFVB_updateWindowDelete = function() {
	for( var i = this._drill_GFVB_windowTank.length-1; i >= 0; i-- ){
		var temp_window = this._drill_GFVB_windowTank[i];
		if( temp_window.drill_isDead() ){
			
			// > 从层中去除
			this.drill_GFVB_layerRemoveSprite( temp_window );
			
			// > 从容器中去除
			this._drill_GFVB_windowTank.splice( i, 1 );
		}
	}
}
//==============================
// * 贴图控制 - 帧刷新 位置
//==============================
Scene_Map.prototype.drill_GFVB_updateWindowPosition = function() {
	for( var i = 0; i < this._drill_GFVB_windowTank.length; i++ ){
		var temp_window = this._drill_GFVB_windowTank[i];
		var s_data = temp_window._drill_data['s_data'];
		var b_data = temp_window._drill_data['b_data'];
		if( temp_window['_drill_COBa_x'] == undefined ){ continue; }
		if( temp_window['_drill_COBa_x'].length == 0 ){ continue; }
			
		// > 位移
		var xx = 0;
		var yy = 0;
		
		// > 额外位置偏移
		xx += s_data['offsetEx_x'];
		yy += s_data['offsetEx_y'];
		
		// > 窗口的锚点
		xx -= temp_window._drill_width * temp_window._drill_anchor_x;
		yy -= temp_window._drill_height * temp_window._drill_anchor_y;
		
		// > 弹道位移
		var time = temp_window._drill_curTime;
		if( time < 0 ){ time = 0; }
		if( time > temp_window['_drill_COBa_x'].length-1 ){
			time = temp_window['_drill_COBa_x'].length-1;
		}
		xx += temp_window['_drill_COBa_x'][ time ];		//播放弹道轨迹
		yy += temp_window['_drill_COBa_y'][ time ];
		
		
		// > 层级与镜头的位移
		var option = {
			"window_benchmark": s_data['window_benchmark'],
			"orgPos_x": temp_window._drill_orgPos_x,
			"orgPos_y": temp_window._drill_orgPos_y,
		};
		var pos = this.drill_GFVB_layerCameraMoving(xx, yy, s_data['window_map_layer'], option );
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
// ** 地图临时 漂浮文字窗口【Drill_GFVB_Window】
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
// **			
// **		说明：	> 该窗口在游戏中实时创建，创建后将被销毁。
// **				> 窗口的结构从 Drill_MPFP_Window 借鉴来，但是除了贴图内容，其他部分变化非常大。
//=============================================================================
//==============================
// * 漂浮文字窗口 - 定义
//==============================
function Drill_GFVB_Window() {
    this.initialize.apply(this, arguments);
};
Drill_GFVB_Window.prototype = Object.create(Window_Base.prototype);
Drill_GFVB_Window.prototype.constructor = Drill_GFVB_Window;
//==============================
// * 漂浮文字窗口 - 初始化
//==============================
Drill_GFVB_Window.prototype.initialize = function( data ){
	this._drill_data = data;			//（直接传指针）
	
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 漂浮文字窗口 - 帧刷新
//==============================
Drill_GFVB_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_updateAttr();			//帧刷新 - A主体
	this.drill_updateBallistics();		//帧刷新 - B窗口弹道
	this.drill_updateSkin();			//帧刷新 - C窗口皮肤
										//帧刷新 - D窗口内容（无）
}
//==============================
// * 漂浮文字窗口 - 窗口属性
//==============================
Drill_GFVB_Window.prototype.lineHeight = function(){ return this._drill_data['s_data']['window_lineheight']; };			//窗口行间距
Drill_GFVB_Window.prototype.standardPadding = function(){ return this._drill_data['s_data']['window_padding']; };		//窗口内边距
Drill_GFVB_Window.prototype.standardFontSize = function(){ return this._drill_data['s_data']['window_fontsize']; };		//窗口字体大小
Drill_GFVB_Window.prototype.standardFontFace = function(){ return this._drill_data['s_data']['window_fontFace']; };		//窗口字体类型
//==============================
// * 漂浮文字窗口 - 持续时间
//==============================
Drill_GFVB_Window.prototype.drill_isDead = function() {
	if( this._drill_ballisticsInited == false ){ return false; }
	if( this._drill_destroyed == true ){ return true; }
	if( this._drill_curTime > this._drill_lifeTime ){ return true; }
	if( this.x < -20 -this.width ){ return true; }	//（常规弹幕时，越界x轴后快速销毁）
	return false;
};
//==============================
// * 漂浮文字窗口 - 初始化数据
//==============================
Drill_GFVB_Window.prototype.drill_initData = function() {
	//（暂无 默认值）
}
//==============================
// * 漂浮文字窗口 - 初始化对象
//==============================
Drill_GFVB_Window.prototype.drill_initSprite = function() {
	this.drill_initAttr();					//初始化对象 - A主体
	this.drill_initBallistics();			//初始化对象 - B窗口弹道
	this.drill_initSkin();					//初始化对象 - C窗口皮肤
	this.drill_initMessage();				//初始化对象 - D窗口内容
}


//==============================
// * A主体 - 初始化对象
//==============================
Drill_GFVB_Window.prototype.drill_initAttr = function() {
	var s_data = this._drill_data['s_data'];
	var b_data = this._drill_data['b_data'];
	
	// > 私有属性初始化
	this.x = 100;
	this.y = Graphics.boxHeight*2;
	this.contentsOpacity = 0;			//文本域 透明度
	this.opacity = 0;					//背景容器层 透明度
	
	this._drill_width = 0;				//窗口宽度
	this._drill_height = 0;				//窗口高度
	this._drill_curTime = 0;			//当前生命周期
	this._drill_lifeTime = 120;
	this._drill_destroyed = false;		//销毁标记（手动销毁用）
	
	// > 中心锚点
	this._drill_anchor_x = 0.5;			//中心锚点x（固定为正中心）
	this._drill_anchor_y = 0.5;			//中心锚点y
	
	// > UI基准初始位置
	this._drill_orgPos_x = $gameMap.adjustX(0);
	this._drill_orgPos_y = $gameMap.adjustY(0);
}
//==============================
// * A主体 - 初始化对象
//==============================
Drill_GFVB_Window.prototype.drill_updateAttr = function() {
	
	// > 主体 时间流逝
	this._drill_curTime += 1;
}


//==============================
// * B窗口弹道 - 初始化对象
//==============================
Drill_GFVB_Window.prototype.drill_initBallistics = function() {
	this._drill_ballisticsInited = false;
	//（排队控制 进行初始化）
}
//==============================
// * B窗口弹道 - 刷新弹道（开放函数）
//
//			说明：	> 需要单独赋值参数：orgX、orgY、orgOpacity。
//					> 此函数只刷新弹道，如果要重置你还需设置 _drill_curTime 为0。
//==============================
Drill_GFVB_Window.prototype.drill_refreshBallistics = function( b_data ){
	this._drill_ballisticsInited = true;
	
	// > 重刷 当前生命周期
	this._drill_lifeTime = b_data['movementDelay'] + b_data['movementTime'] + b_data['movementEndDelay'];
	
	
	// > 移动弹道
	var org_x = b_data['orgX'];
	var org_y = b_data['orgY'];
	$gameTemp.drill_COBa_setBallisticsMove( b_data );					//移动弹道 - 初始化数据
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, org_x, org_y );	//移动弹道 - 预推演
	
	
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
	$gameTemp.drill_COBa_preBallisticsOpacity( this, 0, org_opacity );	//透明度弹道 - 预推演
}
//==============================
// * B窗口弹道 - 帧刷新 透明度
//==============================
Drill_GFVB_Window.prototype.drill_updateBallistics = function() {
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
// * C窗口皮肤 - 初始化对象
//==============================
Drill_GFVB_Window.prototype.drill_initSkin = function() {
	
	// > 皮肤资源
	this._drill_skin_defaultSkin = this.windowskin;
	
	// > 布局模式
	var s_data = this._drill_data['s_data'];
	this.drill_resetSkinData( s_data );
}
//==============================
// * C窗口皮肤 - 重设数据
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_GFVB_Window.prototype.drill_resetSkinData = function( data ){
	
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
Drill_GFVB_Window.prototype.drill_updateSkin = function() {
	
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
var _drill_GFVB_updateTone = Drill_GFVB_Window.prototype.updateTone;
Drill_GFVB_Window.prototype.updateTone = function() {
	if( this._drill_skin_tone_lock == true ){
		this.setTone( this._drill_skin_tone_r, this._drill_skin_tone_g, this._drill_skin_tone_b );
		return;
	}
	_drill_GFVB_updateTone.call( this );
}


//==============================
// * D窗口内容 - 初始化对象
//==============================
Drill_GFVB_Window.prototype.drill_initMessage = function(){
	var s_data = this._drill_data['s_data'];
	var context = s_data['context'];
	//（此处context不需要任何变化，\str和\v都有效）
	
	this.drill_refreshMessage( context.split("\n") );
}
//==============================
// * D窗口内容 - 刷新内容
//==============================
Drill_GFVB_Window.prototype.drill_refreshMessage = function( context_list ){
	var s_data = this._drill_data['s_data'];
	if( context_list.length == 0 ){ return; }
	
	
	// > 窗口高宽 - 计算（文本域自适应）
	var options = {};
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
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeFloatingVideoBarrage = false;
		var pluginTip = DrillUp.drill_GFVB_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

