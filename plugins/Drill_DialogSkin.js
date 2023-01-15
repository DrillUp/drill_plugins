//=============================================================================
// Drill_DialogSkin.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        对话框 - 对话框皮肤
 * @author Drill_up
 * 
 * @Drill_LE_param "皮肤样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DSk_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_DialogSkin +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以装饰对话框。
 * ★★必须放在 姓名框窗口 插件后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 可作用于：
 *   - Drill_DialogNameBox           对话框-姓名框窗口
 *     该插件能够支持 姓名框窗口 的皮肤设计。
 *   - Drill_DialogSkinBackground    对话框-对话框背景
 *   - Drill_DialogSkinDecoration    对话框-对话框装饰图
 *     背景和装饰图可以在对话框皮肤插件的基础上，添加更多装饰功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于对话框和其子窗口。
 * 2.详细内容和图解，去看看 "15.对话框 > 关于对话框皮肤.docx"。
 * 细节：
 *   (1.注意，对话框皮肤会根据窗口大小自适应美化，
 *      插件本身 并不影响 对话框实际大小。
 * 子窗口：
 *   (1.对话框有很多子窗口，这些窗口都属于对话框使用。
 *        对话框金钱窗口
 *        对话框选择项窗口
 *        对话框数字输入窗口
 *        对话框选择物品窗口
 *        对话框姓名框窗口
 *      具体去看看文档介绍。
 *   (2.对话框样式可以作用于 对话框本身，也可以单独作用于子窗口。
 *      你可以配置不同的样式分别对应各个窗口。
 *      还可以在游戏中通过 插件指令 随时修改样式。
 * 边框边角：
 *   (1.默认窗口皮肤包含边框设置，但是功能太局限。
 *      这里提供额外的边框和边角设置，加强对话框的设计。
 *   (2.边框可以根据资源划分的厚度，划分成9个部分。
 *      资源可以不是正方形，可以是任意大小的边框资源。
 *   (3.边角可以根据资源划分成4等分，
 *      分别放在窗口的 左上、右上、左下、右下 位置。
 *   (4.详细内容去看看文档的图解。
 * 设计：
 *   (1.你可以将对话框的 边框边角 做成动态的GIF。
 *      也可以配置多个对话框皮肤，在不同的剧情中切换。
 *      毕竟这是玩家在游戏中反复看到最多的窗口了。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui_message （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui_message文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 皮肤样式1 资源-自定义窗口皮肤
 * 皮肤样式1 资源-自定义背景图片
 * 皮肤样式1 资源-边框
 * 皮肤样式1 资源-边角
 * 皮肤样式2 资源-自定义窗口皮肤
 * 皮肤样式2 资源-自定义背景图片
 * 皮肤样式2 资源-边框
 * 皮肤样式2 资源-边角
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制边框的属性：
 * 
 * 插件指令：>对话框皮肤 : 对话框及全部子窗口 : 修改样式 : 样式[2]
 * 插件指令：>对话框皮肤 : 只对话框 : 修改样式 : 样式[2]
 * 插件指令：>对话框皮肤 : 只金钱窗口 : 修改样式 : 样式[2]
 * 插件指令：>对话框皮肤 : 只选择项窗口 : 修改样式 : 样式[2]
 * 插件指令：>对话框皮肤 : 只数字输入窗口 : 修改样式 : 样式[2]
 * 插件指令：>对话框皮肤 : 只选择物品窗口 : 修改样式 : 样式[2]
 * 插件指令：>对话框皮肤 : 只姓名框窗口 : 修改样式 : 样式[2]
 * 
 * 1.修改样式后，立即生效，且永久有效。
 *   你可以在角色对话时随时切换不同对话框样式。
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
 * 时间复杂度： o(n^3)*o(贴图处理) 每帧
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【29.21ms】
 *              地图界面中，平均消耗为：【31.29ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于对话框皮肤包括了它自身以及下面的5个子窗口，所以实际的性能
 *   消耗是x6倍的情况，但好在对话框在整个游戏中只有一个，不会出现
 *   多个，所以不需要担心消耗可能增加的情况。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了 边角的缩进距 设置无效的bug。
 * [v1.2]
 * 修复了使用 自定义单图背景 模式时，切换对话框样式造成错误叠加的bug。
 * 优化了 姓名框窗口 的兼容性。
 * [v1.3]
 * 优化了对话框皮肤的结构。
 * [v1.4]
 * 修复了预加载有时候失效的bug。
 * [v1.5]
 * 优化了旧存档的识别与兼容。
 * 
 *
 *
 * @param 默认样式-对话框
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 *
 * @param 默认样式-对话框金钱窗口
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 *
 * @param 默认样式-对话框选择项窗口
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 *
 * @param 默认样式-对话框数字输入窗口
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 *
 * @param 默认样式-对话框选择物品窗口
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 * 
 * @param 默认样式-对话框姓名框窗口
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 *
 * @param ---皮肤样式集---
 * @default
 *
 * @param 皮肤样式-1
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default {"标签":"--标准对话框--","---窗口---":"","布局模式":"默认窗口皮肤","布局透明度":"225","资源-自定义窗口皮肤":"","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","是否锁定窗口色调":"false","窗口色调-红":"0","窗口色调-绿":"0","窗口色调-蓝":"0","窗口平铺背景向内缩进距":"0","---边框---":"","边框是否显示":"false","偏移-边框 X":"0","偏移-边框 Y":"0","边框向内缩进距":"6","资源-边框":"[]","边框帧间隔":"4","边框是否倒放":"false","边框混合模式":"0","边框划分厚度":"5","边框拉伸方式":"循环平铺","---边角---":"","边角是否显示":"false","偏移-边角 X":"0","偏移-边角 Y":"0","边角向内缩进距":"6","资源-边角":"[]","边角帧间隔":"4","边角是否倒放":"false","边角混合模式":"0","浮动效果":"关闭","浮动速度":"7.0","浮动偏移量":"8"}
 * 
 * @param 皮肤样式-2
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-3
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-4
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-5
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-6
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-7
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-8
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-9
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-10
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-11
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-12
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-13
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-14
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-15
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-16
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-17
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-18
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-19
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-20
 * @parent ---皮肤样式集---
 * @type struct<DrillDSkStyle>
 * @desc 对话框相关窗口的皮肤样式配置。
 * @default 
 * 
 * 
 */
/*~struct~DrillDSkStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的皮肤样式--
 * 
 * @param ---窗口---
 * @default 
 * 
 * @param 布局模式
 * @parent ---窗口---
 * @type select
 * @option 默认窗口皮肤
 * @value 默认窗口皮肤
 * @option 自定义窗口皮肤
 * @value 自定义窗口皮肤
 * @option 自定义背景图片
 * @value 自定义背景图片
 * @desc 窗口背景布局的模式。
 * @default 默认窗口皮肤
 *
 * @param 布局透明度
 * @parent 布局模式
 * @type number
 * @min 0
 * @max 255
 * @desc 布局的透明度，0为完全透明，255为完全不透明。
 * @default 192
 *
 * @param 资源-自定义窗口皮肤
 * @parent 布局模式
 * @desc 配置该资源，可以使得该窗口有与默认不同的系统窗口。
 * @default (需配置)对话框皮肤-窗口皮肤
 * @require 1
 * @dir img/Menu__ui_message/
 * @type file
 *
 * @param 资源-自定义背景图片
 * @parent 布局模式
 * @desc 背景图片布局的资源。
 * @default (需配置)对话框皮肤-背景图片
 * @require 1
 * @dir img/Menu__ui_message/
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
 * @parent ---窗口---
 * @type boolean
 * @on 锁定
 * @off 默认色调
 * @desc true - 锁定，false - 默认色调，你可以单独锁定该样式窗口的色调。
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
 * @param 窗口平铺背景向内缩进距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口默认皮肤中，平铺背景如果比边框还大，可以增加缩进矩，减小平铺背景的高宽。
 * @default 0
 * 
 * 
 * @param ---边框---
 * @desc 
 *
 * @param 边框是否显示
 * @parent ---边框---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，对话框的边框显示。
 * @default false
 * 
 * @param 偏移-边框 X
 * @parent ---边框---
 * @desc 以对话框的位置为基准，x轴方向平移，正右负左，单位像素。
 * @default 0
 * 
 * @param 偏移-边框 Y
 * @parent ---边框---
 * @desc 以对话框的位置为基准，y轴方向平移，正下负上，单位像素。
 * @default 0
 * 
 * @param 边框向内缩进距
 * @parent ---边框---
 * @type number
 * @min 0
 * @desc 0缩进表示边框沿着对话框最外层的矩形绘制，向内缩进可以用来调整边框包裹的矩形范围。
 * @default 6
 * 
 * @param 资源-边框
 * @parent ---边框---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default []
 * @require 1
 * @dir img/Menu__ui_message/
 * @type file[]
 * 
 * @param 边框帧间隔
 * @parent ---边框---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 边框是否倒放
 * @parent ---边框---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放，gif的播放顺序。
 * @default false
 *
 * @param 边框混合模式
 * @parent ---边框---
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 * 
 * @param 边框划分厚度
 * @parent ---边框---
 * @type number
 * @min 1
 * @desc 插件将从资源图片的边界向内划分一定像素的厚度，并切割成九份，具体可见文档描述。
 * @default 5
 * 
 * @param 边框拉伸方式
 * @parent ---边框---
 * @type select
 * @option 循环平铺
 * @value 循环平铺
 * @option 缩放拉伸
 * @value 缩放拉伸
 * @option 保持切割原样
 * @value 保持切割原样
 * @desc 边框的拉伸方式。
 * @default 循环平铺
 * 
 * @param ---边角---
 * @desc 
 *
 * @param 边角是否显示
 * @parent ---边角---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，对话框的边角显示。
 * @default false
 * 
 * @param 偏移-边角 X
 * @parent ---边角---
 * @desc 以对话框的位置为基准，x轴方向平移，正右负左，单位像素。
 * @default 0
 * 
 * @param 偏移-边角 Y
 * @parent ---边角---
 * @desc 以对话框的位置为基准，y轴方向平移，正下负上，单位像素。
 * @default 0
 * 
 * @param 边角向内缩进距
 * @parent ---边角---
 * @type number
 * @min 0
 * @desc 0缩进表示边框沿着对话框最外层的矩形绘制，向内缩进可以用来调整边框包裹的矩形范围。
 * @default 6
 * 
 * @param 资源-边角
 * @parent ---边角---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default []
 * @require 1
 * @dir img/Menu__ui_message/
 * @type file[]
 * 
 * @param 边角帧间隔
 * @parent ---边角---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 边角是否倒放
 * @parent ---边角---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放，gif的播放顺序。
 * @default false
 *
 * @param 边角混合模式
 * @parent ---边角---
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param 浮动效果
 * @parent ---边角---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 四个边角，可以来回浮动。
 * @default 关闭
 * 
 * @param 浮动速度
 * @parent 浮动效果
 * @desc 浮动变化的速度。
 * @default 7.0
 *
 * @param 浮动偏移量
 * @parent 浮动效果
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 8
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DSk（Dialog_Skin）
//		临时全局变量	无
//		临时局部变量	this._drill_DSk_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	对话管理层
//		★性能测试消耗	31.29ms（Drill_DSk_BorderSprite.prototype.update） 17.52ms（drill_DSk_getStyle）
//		★最坏情况		暂无（由于对话框数量有限，不能增加更多性能消耗）
//		★备注			这里的消耗比我想象的要高。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			对话框皮肤：
//				->窗口
//					->子窗口
//						> 对话框金钱窗口
//						> 对话框选择项窗口
//						> 对话框数字输入窗口
//						> 对话框选择物品窗口
//						> 对话框姓名框窗口
//					->窗口皮肤初始化
//						> 默认窗口皮肤
//						> 自定义窗口皮肤
//						> 自定义背景图片
//						> 黑底背景
//						->窗口平铺背景向内缩进距
//					->边框皮肤初始化
//				->边框与边角
//					->边框
//						->向内缩进距
//						->GIF效果
//						->划分厚度
//						->拉伸方式
//					->边角
//						->向内缩进距
//						->GIF效果
//						->浮动效果
//
//		★私有类如下：
//			* Drill_DSk_BorderSprite【对话框边框贴图】
//
//		★必要注意事项：
//			1._windowSpriteContainer 是一个 PIXI.Container，不能addChild，巨坑。
//			  要使用提供的Window类方法： addChildToBack 。
//
//		★其它说明细节：
//			1.边框边角原理相对简单，平铺用TilingSprite，拉伸用scale.x。
//			  只是切割比较麻烦，要说明清楚。
//			
//		★存在的问题：
//			暂无
//		

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogSkin = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogSkin');

	//==============================
	// * 变量获取 - 样式
	//				（~struct~DrillDSkStyle）
	//==============================
	DrillUp.drill_DSk_initStyle = function( dataFrom ) {
		var data = {};
		
		// > 窗口
		data['window_type'] = String( dataFrom["布局模式"] || "默认窗口皮肤");
		data['window_opacity'] = Number( dataFrom["布局透明度"] || 192);
		data['window_sys_src'] = String( dataFrom["资源-自定义窗口皮肤"] || "");
		data['window_pic_src'] = String( dataFrom["资源-自定义背景图片"] || "");
		data['window_pic_x'] = Number( dataFrom["平移-自定义背景图片 X"] || 0);
		data['window_pic_y'] = Number( dataFrom["平移-自定义背景图片 Y"] || 0);
		// > 窗口（底层特殊）
		data['window_tone_lock'] = String( dataFrom["是否锁定窗口色调"] || "false") == "true";
		data['window_tone_r'] = Number( dataFrom["窗口色调-红"] || 0);
		data['window_tone_g'] = Number( dataFrom["窗口色调-绿"] || 0);
		data['window_tone_b'] = Number( dataFrom["窗口色调-蓝"] || 0);
		data['window_backInner'] = Number( dataFrom["窗口平铺背景向内缩进距"] || 0);
		
		// > 边框
		data['border_visible'] = String( dataFrom["边框是否显示"] || "false") == "true";
		data['border_x'] = Number( dataFrom["偏移-边框 X"] || 0);
		data['border_y'] = Number( dataFrom["偏移-边框 Y"] || 0);
		data['border_inner'] = Number( dataFrom["边框向内缩进距"] || 0);
		if( dataFrom["资源-边框"] != "" &&
			dataFrom["资源-边框"] != undefined ){
			data['border_gif_src'] = JSON.parse( dataFrom["资源-边框"] );
		}else{
			data['border_gif_src'] = [];
		}
		data['border_gif_src_file'] = "img/Menu__ui_message/";
		data['border_gif_interval'] = Number( dataFrom["边框帧间隔"] || 4);
		data['border_gif_back_run'] = String( dataFrom["边框是否倒放"] || "false") == "true";
		data['border_blendMode'] = Number( dataFrom["边框混合模式"] || 0);
		data['border_width'] = Number( dataFrom["边框划分厚度"] || 5);
		data['border_type'] = String( dataFrom["边框拉伸方式"] || "循环平铺");
		
		// > 边角
		data['corner_visible'] = String( dataFrom["边角是否显示"] || "false") == "true";
		data['corner_x'] = Number( dataFrom["偏移-边角 X"] || 0);
		data['corner_y'] = Number( dataFrom["偏移-边角 Y"] || 0);
		data['corner_inner'] = Number( dataFrom["边角向内缩进距"] || 0);
		if( dataFrom["资源-边角"] != "" &&
			dataFrom["资源-边角"] != undefined ){
			data['corner_gif_src'] = JSON.parse( dataFrom["资源-边角"] );
		}else{
			data['corner_gif_src'] = [];
		}
		data['corner_gif_src_file'] = "img/Menu__ui_message/";
		data['corner_gif_interval'] = Number( dataFrom["边角帧间隔"] || 4);
		data['corner_gif_back_run'] = String( dataFrom["边角是否倒放"] || "false") == "true";
		data['corner_blendMode'] = Number( dataFrom["边角混合模式"] || 0);
		data['corner_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['corner_floatSpeed'] = Number( dataFrom["浮动速度"] || 7.0);
		data['corner_floatRange'] = Number( dataFrom["浮动偏移量"] || 8);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_DSk_messageStyleId = Number(DrillUp.parameters["默认样式-对话框"] || 1); 
	DrillUp.g_DSk_goldStyleId = Number(DrillUp.parameters["默认样式-对话框金钱窗口"] || 1); 
	DrillUp.g_DSk_choiceStyleId = Number(DrillUp.parameters["默认样式-对话框选择项窗口"] || 1); 
	DrillUp.g_DSk_numberStyleId = Number(DrillUp.parameters["默认样式-对话框数字输入窗口"] || 1); 
	DrillUp.g_DSk_itemStyleId = Number(DrillUp.parameters["默认样式-对话框选择物品窗口"] || 1); 
	DrillUp.g_DSk_nameStyleId = Number(DrillUp.parameters["默认样式-对话框姓名框窗口"] || 1); 
	
	/*-----------------样式集------------------*/
	DrillUp.g_DSk_list_length = 20;
	DrillUp.g_DSk_list = [];
	for( var i = 0; i < DrillUp.g_DSk_list_length; i++ ){
		if( DrillUp.parameters["皮肤样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["皮肤样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["皮肤样式-" + String(i+1) ]);
			DrillUp.g_DSk_list[i] = DrillUp.drill_DSk_initStyle( data );
		}else{
			DrillUp.g_DSk_list[i] = DrillUp.drill_DSk_initStyle( {} );
		}
	}

	

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_DSk_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_DSk_pluginCommand.call(this, command, args);
	if( command === ">对话框皮肤" ){
		
		if(args.length == 6){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "修改样式" ){	
				temp2 = temp2.replace("样式[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( temp1 == "对话框及全部子窗口" ){
					$gameSystem._drill_DSk_messageStyleId = temp2;
					$gameSystem._drill_DSk_goldStyleId = temp2;
					$gameSystem._drill_DSk_choiceStyleId = temp2;
					$gameSystem._drill_DSk_numberStyleId = temp2;
					$gameSystem._drill_DSk_itemStyleId = temp2;
					$gameSystem._drill_DSk_nameStyleId = temp2;
				}
				if( temp1 == "只对话框" ){
					$gameSystem._drill_DSk_messageStyleId = temp2;
				}
				if( temp1 == "只金钱窗口" || temp1 == "只金钱框" ){
					$gameSystem._drill_DSk_goldStyleId = temp2;
				}
				if( temp1 == "只选择项窗口" || temp1 == "只选择项" ){
					$gameSystem._drill_DSk_choiceStyleId = temp2;
				}
				if( temp1 == "只数字输入窗口" || temp1 == "只数字输入框" ){
					$gameSystem._drill_DSk_numberStyleId = temp2;
				}
				if( temp1 == "只选择物品窗口" || temp1 == "只选择物品框" ){
					$gameSystem._drill_DSk_itemStyleId = temp2;
				}
				if( temp1 == "只姓名框窗口" || temp1 == "只姓名框" ){
					$gameSystem._drill_DSk_nameStyleId = temp2;
				}
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DSk_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSk_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DSk_sys_initialize.call(this);
	this.drill_DSk_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSk_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DSk_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DSk_saveEnabled == true ){	
		$gameSystem.drill_DSk_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DSk_initSysData();
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
Game_System.prototype.drill_DSk_initSysData = function() {
	this.drill_DSk_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DSk_checkSysData = function() {
	this.drill_DSk_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DSk_initSysData_Private = function() {
	
	this._drill_DSk_messageStyleId = DrillUp.g_DSk_messageStyleId;
	this._drill_DSk_goldStyleId = DrillUp.g_DSk_goldStyleId;
	this._drill_DSk_choiceStyleId = DrillUp.g_DSk_choiceStyleId;
	this._drill_DSk_numberStyleId = DrillUp.g_DSk_numberStyleId;
	this._drill_DSk_itemStyleId = DrillUp.g_DSk_itemStyleId;
	this._drill_DSk_nameStyleId = DrillUp.g_DSk_nameStyleId;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DSk_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DSk_messageStyleId == undefined ){
		this.drill_DSk_initSysData();
	}
	
};
//==============================
// * 存储数据 - 获取id
//==============================
Game_System.prototype.drill_DSk_getStyleId = function( tag ){
	if( tag == "Window_Message" ){
		return  this._drill_DSk_messageStyleId -1;
	}
	if( tag == "Window_Gold" ){
		return  this._drill_DSk_goldStyleId -1;
	}
	if( tag == "Window_ChoiceList" ){
		return  this._drill_DSk_choiceStyleId -1;
	}
	if( tag == "Window_NumberInput" ){
		return  this._drill_DSk_numberStyleId -1;
	}
	if( tag == "Window_EventItem" ){
		return  this._drill_DSk_itemStyleId -1;
	}
	if( tag == "Window_NameBox" || tag == "Drill_DNB_NameBoxWindow" ){
		return  this._drill_DSk_nameStyleId -1;
	}
	return -1;
}
//==============================
// * 存储数据 - 获取数据
//==============================
Game_System.prototype.drill_DSk_getStyle = function( tag ){
	var style_id = this.drill_DSk_getStyleId( tag );
	if( style_id == -1 ){ return {}; }
	return DrillUp.g_DSk_list[ style_id ];
}


//=============================================================================
// * 资源预加载
//=============================================================================
var _drill_DSk_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
    _drill_DSk_temp_initialize.call(this);
	
	// > 皮肤预加载
	this._drill_DSk_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_DSk_skin = [];
	for(var i=0; i < DrillUp.g_DSk_list.length; i++ ){
		var temp_data = DrillUp.g_DSk_list[i];
		if( temp_data['window_type'] == "自定义窗口皮肤" && temp_data['window_sys_src'] != "" ){
			var bitmap = ImageManager.reserveBitmap( "img/Menu__ui_message/", temp_data['window_sys_src'], 0, true, this._drill_DSk_cacheId );
			this._drill_DSk_skin.push( bitmap );
		}
		if( temp_data['window_type'] == "自定义背景图片" && temp_data['window_pic_src'] != "" ){
			var bitmap = ImageManager.reserveBitmap( "img/Menu__ui_message/", temp_data['window_pic_src'], 0, true, this._drill_DSk_cacheId );
			this._drill_DSk_skin.push( bitmap );
		}
	}
}


//=============================================================================
// ** 对话框
// **		
// **		子功能：	->窗口皮肤初始化
// **						> 默认窗口皮肤
// **						> 自定义窗口皮肤
// **						> 自定义背景图片
// **						> 黑底背景
// **						->窗口平铺背景向内缩进距
// **					->边框皮肤初始化
//=============================================================================
//==============================
// * 对话框 - 初始化
//==============================
var _drill_DSk_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
	_drill_DSk_initialize.call( this );

	this._drill_DSk_tag = "Window_Message";
	this.drill_DSk_initSkin();			//窗口皮肤初始化
	this.drill_DSk_initBorder();		//边框皮肤初始化
};
//==============================
// * 对话框 - 设置背景（非帧刷新，窗口/暗淡/透明）
//==============================
var _drill_DSk_setBackgroundType = Window_Message.prototype.setBackgroundType;
Window_Message.prototype.setBackgroundType = function( type ){
	_drill_DSk_setBackgroundType.call( this,type );
	
    if( type === 0 ){	// 窗口 类型
		var data = $gameSystem.drill_DSk_getStyle( this._drill_DSk_tag );
		this.drill_DSk_resetSkinData( data );	//刷新窗口皮肤
		this.drill_DSk_resetBorder();			//刷新边框皮肤
	}
}
//==============================
// * 对话框 - 帧刷新
//==============================
var _drill_DSk_mes_update = Window_Message.prototype.update;
Window_Message.prototype.update = function(){
	_drill_DSk_mes_update.call(this);
	this.drill_DSk_updateSkin();				//帧刷新 - 窗口皮肤
}
//==============================
// * 对话框底层 - 窗口平铺背景向内缩进距
//==============================
var _drill_DSk__refreshBack = Window.prototype._refreshBack;
Window.prototype._refreshBack = function(){
	
	if( this._drill_DSk_tag != undefined ){
		var data = $gameSystem.drill_DSk_getStyle( this._drill_DSk_tag );
		this._drill_DSk_marginTemp = this._margin;		//（控制 _margin 向内缩进距）
		this._margin = this._drill_DSk_marginTemp + data['window_backInner'];
	}
	
	_drill_DSk__refreshBack.call(this);
	
	if( this._drill_DSk_tag != undefined ){
		this._margin = this._drill_DSk_marginTemp;
	}
}

//==============================
// * 边框皮肤 - 初始化
//==============================
Window_Base.prototype.drill_DSk_initBorder = function() {

	// > 边框层
	this._drill_DSk_border_needRefresh = false;
	this._drill_DSk_border = new Drill_DSk_BorderSprite( this );
	this.addChildToBack( this._drill_DSk_border );
	//（注意， _windowSpriteContainer 是一个 PIXI.Container，不能addChild，巨坑 ）
}
//==============================
// * 边框皮肤 - 刷新边框皮肤
//==============================
Window_Base.prototype.drill_DSk_resetBorder = function(){
	
	// > 刷新标记
	this._drill_DSk_border_needRefresh = true;
	
	// > 边框样式
	this._drill_DSk_border.drill_DSk_refreshStyle();
}

//==============================
// * 窗口皮肤 - 初始化
//
//			说明：	此函数只在初始化时执行一次，不要执行多了。
//==============================
Window_Base.prototype.drill_DSk_initSkin = function() {
	
	// > 皮肤资源
	this._drill_skin_defaultSkin = this.windowskin;
	
	// > 重设数据
	if( this._drill_DSk_tag == undefined ){ return; }
	var data = $gameSystem.drill_DSk_getStyle( this._drill_DSk_tag );
	this.drill_DSk_resetSkinData( data );
}
//==============================
// * 窗口皮肤 - 重设数据
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Window_Base.prototype.drill_DSk_resetSkinData = function( data ){
	
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
		this._drill_skin_pic_bitmap = ImageManager.loadBitmap( "img/Menu__ui_message/", data['window_pic_src'], 0, true);
		this._drill_skin_pic_x = data['window_pic_x'];
		this._drill_skin_pic_y = data['window_pic_y'];
	}else{
		this._drill_skin_pic_bitmap = ImageManager.loadEmptyBitmap();
	}
	
	if( data['window_type'] == "自定义窗口皮肤" && data['window_sys_src'] != "" ){
		this._drill_skin_sys_bitmap = ImageManager.loadBitmap( "img/Menu__ui_message/", data['window_sys_src'], 0, true);
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
		this.opacity = this._drill_skin_opacity;
		this._windowBackSprite.opacity = this._drill_skin_opacity;
		this._windowFrameSprite.opacity = this._drill_skin_opacity;
		this._drill_skinBackground.opacity = 0;
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = null;
		
		
	}else if( this._drill_skin_type == "自定义窗口皮肤" || this._drill_skin_type == "系统窗口布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_sys_bitmap;
		
		// （透明度）
		this.opacity = this._drill_skin_opacity;
		this._windowBackSprite.opacity = this._drill_skin_opacity;
		this._windowFrameSprite.opacity = this._drill_skin_opacity;
		this._drill_skinBackground.opacity = 0;
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = null;
		
		
	}else if( this._drill_skin_type == "自定义背景图片" || this._drill_skin_type == "图片窗口布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_defaultSkin;
		
		// （透明度）
		this.opacity = 255;
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
		this._drill_skinBackground.opacity = this._drill_skin_opacity;
		
		// （背景图片布局）
		this._drill_skinBackground.bitmap = this._drill_skin_pic_bitmap;
		this._drill_skinBackground.x = this._drill_skin_pic_x;
		this._drill_skinBackground.y = this._drill_skin_pic_y;
		
		
	}else if( this._drill_skin_type == "黑底背景" || this._drill_skin_type == "黑底布局" ){
		
		// （皮肤资源）
		this.windowskin = this._drill_skin_defaultSkin;
		
		// （透明度）
		this.opacity = 255;
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
		this._drill_skinBackground.opacity = this._drill_skin_opacity;
		
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
// * 窗口皮肤 - 帧刷新
//==============================
Window_Base.prototype.drill_DSk_updateSkin = function() {
	
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
// * 窗口皮肤 - 帧刷新色调
//
//			说明：	setTone可以反复调用赋值，有变化监听的锁。
//==============================
var _drill_DSk_updateTone = Window_Base.prototype.updateTone;
Window_Base.prototype.updateTone = function() {
	if( this._drill_skin_tone_lock == true ){
		this.setTone( this._drill_skin_tone_r, this._drill_skin_tone_g, this._drill_skin_tone_b );
		return;
	}
	_drill_DSk_updateTone.call( this );
}



//=============================================================================
// * 对话框子窗口
//=============================================================================
//==============================
// * 金钱窗口 - 初始化
//==============================
var _drill_DSk_createSubWindows = Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function(){
	_drill_DSk_createSubWindows.call( this );
	
	// > 通用函数
	this._goldWindow.drill_DSk_initBorder = this.drill_DSk_initBorder;
	this._goldWindow.drill_DSk_resetBorder = this.drill_DSk_resetBorder;	
	
	this._goldWindow._drill_DSk_tag = "Window_Gold";
	this._goldWindow.drill_DSk_initSkin();				//窗口皮肤初始化
	this._goldWindow.drill_DSk_initBorder();			//边框皮肤初始化
}
//==============================
// * 金钱窗口 - 刷新
//==============================
var _drill_DSk_Gold_open = Window_Gold.prototype.open;
Window_Gold.prototype.open = function() {
	_drill_DSk_Gold_open.call(this);
	
	if( this._drill_DSk_tag != undefined ){
		var data = $gameSystem.drill_DSk_getStyle( this._drill_DSk_tag );
		this.drill_DSk_resetSkinData( data );	//刷新窗口皮肤
		this.drill_DSk_resetBorder();			//刷新边框皮肤
	}
}
//==============================
// * 金钱窗口 - 帧刷新
//==============================
var _drill_DSk_Gold_update = Window_Gold.prototype.update;
Window_Gold.prototype.update = function(){
	_drill_DSk_Gold_update.call(this);
	this.drill_DSk_updateSkin();				//帧刷新 - 窗口皮肤
}

//==============================
// * 选择项窗口 - 初始化
//==============================
var _drill_DSk_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
Window_ChoiceList.prototype.initialize = function( messageWindow ){
	_drill_DSk_ChoiceList_initialize.call( this,messageWindow );
	this._drill_DSk_tag = "Window_ChoiceList";
	this.drill_DSk_initSkin();				//窗口皮肤初始化
	this.drill_DSk_initBorder();			//边框皮肤初始化
}
//==============================
// * 选择项窗口 - 刷新
//==============================
var _drill_DSk_ChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function() {
	_drill_DSk_ChoiceList_start.call(this);
	var data = $gameSystem.drill_DSk_getStyle( this._drill_DSk_tag );
	this.drill_DSk_resetSkinData( data );	//刷新窗口皮肤
	this.drill_DSk_resetBorder();			//刷新边框皮肤
}
//==============================
// * 选择项窗口 - 帧刷新
//==============================
var _drill_DSk_ChoiceList_update = Window_ChoiceList.prototype.update;
Window_ChoiceList.prototype.update = function(){
	_drill_DSk_ChoiceList_update.call(this);
	this.drill_DSk_updateSkin();			//帧刷新 - 窗口皮肤
}

//==============================
// * 数字输入窗口 - 初始化
//==============================
var _drill_DSk_NumberInput_initialize = Window_NumberInput.prototype.initialize;
Window_NumberInput.prototype.initialize = function( messageWindow ){
	_drill_DSk_NumberInput_initialize.call( this,messageWindow );
	this._drill_DSk_tag = "Window_NumberInput";
	this.drill_DSk_initSkin();				//窗口皮肤初始化
	this.drill_DSk_initBorder();			//边框皮肤初始化
}
//==============================
// * 数字输入窗口 - 刷新
//==============================
var _drill_DSk_NumberInput_start = Window_NumberInput.prototype.start;
Window_NumberInput.prototype.start = function() {
	_drill_DSk_NumberInput_start.call(this);
	var data = $gameSystem.drill_DSk_getStyle( this._drill_DSk_tag );
	this.drill_DSk_resetSkinData( data );	//刷新窗口皮肤
	this.drill_DSk_resetBorder();			//刷新边框皮肤
}
//==============================
// * 数字输入窗口 - 帧刷新
//==============================
var _drill_DSk_NumberInput_update = Window_NumberInput.prototype.update;
Window_NumberInput.prototype.update = function(){
	_drill_DSk_NumberInput_update.call(this);
	this.drill_DSk_updateSkin();			//帧刷新 - 窗口皮肤
}

//==============================
// * 选择物品窗口 - 初始化
//==============================
var _drill_DSk_EventItem_initialize = Window_EventItem.prototype.initialize;
Window_EventItem.prototype.initialize = function( messageWindow ){
	_drill_DSk_EventItem_initialize.call( this,messageWindow );
	this._drill_DSk_tag = "Window_EventItem";
	this.drill_DSk_initSkin();				//窗口皮肤初始化
	this.drill_DSk_initBorder();			//边框皮肤初始化
}
//==============================
// * 选择物品窗口 - 刷新
//==============================
var _drill_DSk_EventItem_start = Window_EventItem.prototype.start;
Window_EventItem.prototype.start = function() {
	_drill_DSk_EventItem_start.call(this);
	var data = $gameSystem.drill_DSk_getStyle( this._drill_DSk_tag );
	this.drill_DSk_resetSkinData( data );	//刷新窗口皮肤
	this.drill_DSk_resetBorder();			//刷新边框皮肤
}
//==============================
// * 选择物品窗口 - 帧刷新
//==============================
var _drill_DSk_EventItem_update = Window_EventItem.prototype.update;
Window_EventItem.prototype.update = function(){
	_drill_DSk_EventItem_update.call(this);
	this.drill_DSk_updateSkin();			//帧刷新 - 窗口皮肤
}

//=============================================================================
// * 兼容 - Drill姓名框
//=============================================================================
if( Imported.Drill_DialogNameBox ){	
	//==============================
	// * Drill姓名框 - 初始化
	//==============================
	var _drill_DSk_DNB_initialize = Drill_DNB_NameBoxWindow.prototype.initialize;
	Drill_DNB_NameBoxWindow.prototype.initialize = function( parentWindow ){
		_drill_DSk_DNB_initialize.call( this,parentWindow );
		this._drill_DSk_tag = "Drill_DNB_NameBoxWindow";
		this.drill_DSk_initSkin();				//窗口皮肤初始化
		this.drill_DSk_initBorder();			//边框皮肤初始化
	}
	//==============================
	// * Drill姓名框 - 刷新
	//==============================
	var _drill_DSk_DNB_setData = Drill_DNB_NameBoxWindow.prototype.drill_setData;
	Drill_DNB_NameBoxWindow.prototype.drill_setData = function( text, position_type ){
		var data = $gameSystem.drill_DSk_getStyle( this._drill_DSk_tag );
		this.drill_DSk_resetSkinData( data );	//刷新窗口皮肤
		this.drill_DSk_resetBorder();			//刷新边框皮肤
		return _drill_DSk_DNB_setData.call( this, text, position_type );
	}
	//==============================
	// * Drill姓名框 - 帧刷新
	//==============================
	var _drill_DSk_DNB_update = Drill_DNB_NameBoxWindow.prototype.update;
	Drill_DNB_NameBoxWindow.prototype.update = function(){
		_drill_DSk_DNB_update.call(this);
		this.drill_DSk_updateSkin();			//帧刷新 - 窗口皮肤
	}
}
//=============================================================================
// * 兼容 - Yep姓名框
//=============================================================================
if( Imported.YEP_MessageCore ){	
	//==============================
	// * Yep姓名框 - 初始化
	//==============================
	var _drill_DSk_yep_NameBox_initialize = Window_NameBox.prototype.initialize;
	Window_NameBox.prototype.initialize = function( parentWindow ){
		_drill_DSk_yep_NameBox_initialize.call( this,parentWindow );
		this._drill_DSk_tag = "Window_NameBox";
		this.drill_DSk_initSkin();				//窗口皮肤初始化
		this.drill_DSk_initBorder();			//边框皮肤初始化
	}
	//==============================
	// * Yep姓名框 - 刷新
	//==============================
	var _drill_DSk_yep_NameBox_refresh = Window_NameBox.prototype.refresh;
	Window_NameBox.prototype.refresh = function( text, position ){
		var data = $gameSystem.drill_DSk_getStyle( this._drill_DSk_tag );
		this.drill_DSk_resetSkinData( data );	//刷新窗口皮肤
		this.drill_DSk_resetBorder();			//刷新边框皮肤
		return _drill_DSk_yep_NameBox_refresh.call( this,text,position );
	}
	//==============================
	// * Yep姓名框 - 帧刷新
	//==============================
	var _drill_DSk_yep_NameBox_update = Window_NameBox.prototype.update;
	Window_NameBox.prototype.update = function(){
		_drill_DSk_yep_NameBox_update.call(this);
		this.drill_DSk_updateSkin();			//帧刷新 - 窗口皮肤
	}
}
//=============================================================================
// * 兼容 - Yep修正窗口对象
//=============================================================================
if( Imported.YEP_MessageCore ){	
	var _drill_DSk_yep_adjustWindowSettings = Window_Message.prototype.adjustWindowSettings;
	Window_Message.prototype.adjustWindowSettings = function() {
		_drill_DSk_yep_adjustWindowSettings.call(this);			//（宽度变化后，立即刷新边角和边框，不要出现一帧闪边框）
		if( this._drill_DSk_border ){
			this._drill_DSk_border.drill_DSk_updateBorder();		//帧刷新 边框
			this._drill_DSk_border.drill_DSk_updateCorner();		//帧刷新 边角
		}
	}
}



//=============================================================================
// ** 对话框边贴图【Drill_DSk_BorderSprite】
//
//			主功能：	包含边框和边角两个结构。
//			
// 			代码：	> 范围 - 该类额外显示边框和边角装饰。
//					> 结构 - [ ●合并/分离/ 混乱 ] 数据与贴图合并。通过记录父类的_drill_DSk_tag，来访问$gameSystem进行自变化。
//					> 数量 - [单个/ ●多个 ] 每个子窗口都有一个对应。
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [不可修改/ ●自变化 /外部变化] 样式根据 _drill_curStyleId 自变化 _drill_curStyle 数据。
//=============================================================================
//==============================
// * 边贴图 - 定义
//==============================
function Drill_DSk_BorderSprite() {
	this.initialize.apply(this, arguments);
}
Drill_DSk_BorderSprite.prototype = Object.create(Sprite.prototype);
Drill_DSk_BorderSprite.prototype.constructor = Drill_DSk_BorderSprite;
//==============================
// * 边贴图 - 初始化
//==============================
Drill_DSk_BorderSprite.prototype.initialize = function( p ){
	Sprite.prototype.initialize.call(this);
	this._drill_parent = p;
	this._drill_curStyleId = $gameSystem.drill_DSk_getStyleId( this._drill_parent._drill_DSk_tag );
	this._drill_curStyle = JSON.parse(JSON.stringify( $gameSystem.drill_DSk_getStyle( this._drill_parent._drill_DSk_tag ) ));	//深拷贝数据
	
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 边贴图 - 帧刷新
//==============================
Drill_DSk_BorderSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updateSprite();				//帧刷新对象
};
//==============================
// * 边贴图 - 修改样式（接口）
//==============================
Drill_DSk_BorderSprite.prototype.drill_DSk_refreshStyle = function(){
	var styleId = $gameSystem.drill_DSk_getStyleId( this._drill_parent._drill_DSk_tag );
	if( styleId == -1 ){ return; }
	if( this._drill_curStyleId == styleId ){ return; }
	this._drill_curStyleId = styleId;
	this._drill_curStyle = JSON.parse(JSON.stringify( $gameSystem.drill_DSk_getStyle( this._drill_parent._drill_DSk_tag ) ));	//深拷贝数据
	this.drill_initSprite();			//强制重新初始化
};
//==============================
// * 创建 - 初始化对象
//==============================
Drill_DSk_BorderSprite.prototype.drill_initSprite = function() {
	var data = this._drill_curStyle;	
	
	// > 私有属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.opacity = 255;
	
	// > 私有变量初始化
	this._drill_time = 0;								//持续时间
	this._drill_gifTime = 0;							//当前gif播放时间
	this._drill_border_bitmaps = [];					//边框bitmap对象序列
	this._drill_corner_bitmaps = [];					//边角bitmap对象序列
	this._drill_border_updated = false;					//帧刷新锁（放置update调用次数过多）
	this._drill_corner_updated = false;					//帧刷新锁
	
	// > 资源读取
	for(var j = 0; j < data['border_gif_src'].length ; j++){
		var src_str = data['border_gif_src'][j];
		var obj_bitmap = ImageManager.loadBitmap( data['border_gif_src_file'], src_str, 0, true);
		this._drill_border_bitmaps.push( obj_bitmap );
	};
	for(var j = 0; j < data['corner_gif_src'].length ; j++){
		var src_str = data['corner_gif_src'][j];
		var obj_bitmap = ImageManager.loadBitmap( data['corner_gif_src_file'], src_str, 0, true);
		this._drill_corner_bitmaps.push( obj_bitmap );
	};
	
	this.drill_createBorder();
	this.drill_createCorner();
}
//==============================
// * 创建 - 边框
//==============================
Drill_DSk_BorderSprite.prototype.drill_createBorder = function() {
	var data = this._drill_curStyle;	
	var rect = this.drill_DSk_getRect();
	
	// > 清理贴图
	if( this._borderSprite_1 != undefined ){ this._borderSprite_layer.removeChild( this._borderSprite_1 ); }
	if( this._borderSprite_2 != undefined ){ this._borderSprite_layer.removeChild( this._borderSprite_2 ); }
	if( this._borderSprite_3 != undefined ){ this._borderSprite_layer.removeChild( this._borderSprite_3 ); }
	if( this._borderSprite_4 != undefined ){ this._borderSprite_layer.removeChild( this._borderSprite_4 ); }
	if( this._borderSprite_6 != undefined ){ this._borderSprite_layer.removeChild( this._borderSprite_6 ); }
	if( this._borderSprite_7 != undefined ){ this._borderSprite_layer.removeChild( this._borderSprite_7 ); }
	if( this._borderSprite_8 != undefined ){ this._borderSprite_layer.removeChild( this._borderSprite_8 ); }
	if( this._borderSprite_9 != undefined ){ this._borderSprite_layer.removeChild( this._borderSprite_9 ); }
	if( this._borderSprite_layer != undefined ){ this.removeChild( this._borderSprite_layer ); }
	
	// > 建立边框层
	this._borderSprite_layer = new Sprite();
	this._borderSprite_layer.anchor.x = 0.5;
	this._borderSprite_layer.anchor.y = 0.5;
	this.addChild( this._borderSprite_layer );
	
	// > 建立 2468 区域
	if( data['border_type'] == "循环平铺" ){
		this._borderSprite_2 = new TilingSprite();	//TilingSprite平铺图层
		this._borderSprite_2.move(0, 0, 0, 0);
		this._borderSprite_2.origin.x = 0;
		this._borderSprite_2.origin.y = 0;
		this._borderSprite_4 = new TilingSprite();
		this._borderSprite_4.move(0, 0, 0, 0);
		this._borderSprite_4.origin.x = 0;
		this._borderSprite_4.origin.y = 0;
		this._borderSprite_6 = new TilingSprite();
		this._borderSprite_6.move(0, 0, 0, 0);
		this._borderSprite_6.origin.x = 0;
		this._borderSprite_6.origin.y = 0;
		this._borderSprite_8 = new TilingSprite();
		this._borderSprite_8.move(0, 0, 0, 0);
		this._borderSprite_8.origin.x = 0;
		this._borderSprite_8.origin.y = 0;
	}else if( data['border_type'] == "缩放拉伸" ){
		this._borderSprite_2 = new Sprite();
		this._borderSprite_2.anchor.x = 0.5;
		this._borderSprite_2.anchor.y = 1.0;
		this._borderSprite_4 = new Sprite();
		this._borderSprite_4.anchor.x = 1.0;
		this._borderSprite_4.anchor.y = 0.5;
		this._borderSprite_6 = new Sprite();
		this._borderSprite_6.anchor.x = 0.0;
		this._borderSprite_6.anchor.y = 0.5;
		this._borderSprite_8 = new Sprite();
		this._borderSprite_8.anchor.x = 0.5;
		this._borderSprite_8.anchor.y = 0.0;
	}else if( data['border_type'] == "保持切割原样" ){
		this._borderSprite_2 = new Sprite();
		this._borderSprite_2.anchor.x = 0.5;
		this._borderSprite_2.anchor.y = 1.0;
		this._borderSprite_4 = new Sprite();
		this._borderSprite_4.anchor.x = 1.0;
		this._borderSprite_4.anchor.y = 0.5;
		this._borderSprite_6 = new Sprite();
		this._borderSprite_6.anchor.x = 0.0;
		this._borderSprite_6.anchor.y = 0.5;
		this._borderSprite_8 = new Sprite();
		this._borderSprite_8.anchor.x = 0.5;
		this._borderSprite_8.anchor.y = 0.0;
	}
	this._borderSprite_2.blendMode = data['border_blendMode'];
	this._borderSprite_4.blendMode = data['border_blendMode'];
	this._borderSprite_6.blendMode = data['border_blendMode'];
	this._borderSprite_8.blendMode = data['border_blendMode'];
	this._borderSprite_layer.addChild( this._borderSprite_2 );
	this._borderSprite_layer.addChild( this._borderSprite_4 );
	this._borderSprite_layer.addChild( this._borderSprite_6 );
	this._borderSprite_layer.addChild( this._borderSprite_8 );
	
	// > 建立 1379 区域
	this._borderSprite_1 = new Sprite();
	this._borderSprite_1.anchor.x = 1.0;
	this._borderSprite_1.anchor.y = 1.0;
	this._borderSprite_1.blendMode = data['border_blendMode'];
	this._borderSprite_layer.addChild( this._borderSprite_1 );
	this._borderSprite_3 = new Sprite();
	this._borderSprite_3.anchor.x = 0.0;
	this._borderSprite_3.anchor.y = 1.0;
	this._borderSprite_3.blendMode = data['border_blendMode'];
	this._borderSprite_layer.addChild( this._borderSprite_3 );
	this._borderSprite_7 = new Sprite();
	this._borderSprite_7.anchor.x = 1.0;
	this._borderSprite_7.anchor.y = 0.0;
	this._borderSprite_7.blendMode = data['border_blendMode'];
	this._borderSprite_layer.addChild( this._borderSprite_7 );
	this._borderSprite_9 = new Sprite();
	this._borderSprite_9.anchor.x = 0.0;
	this._borderSprite_9.anchor.y = 0.0;
	this._borderSprite_9.blendMode = data['border_blendMode'];
	this._borderSprite_layer.addChild( this._borderSprite_9 );

	if( this._drill_border_bitmaps.length > 0 ){
		this._borderSprite_1.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_2.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_3.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_4.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_6.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_7.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_8.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_9.bitmap = this._drill_border_bitmaps[0];
	}
}
//==============================
// * 创建 - 边角
//==============================
Drill_DSk_BorderSprite.prototype.drill_createCorner = function() {
	var data = this._drill_curStyle;	
	
	// > 清理贴图
	if( this._cornerSprite_1 != undefined ){ this._cornerSprite_layer.removeChild( this._cornerSprite_1 ); }
	if( this._cornerSprite_2 != undefined ){ this._cornerSprite_layer.removeChild( this._cornerSprite_2 ); }
	if( this._cornerSprite_3 != undefined ){ this._cornerSprite_layer.removeChild( this._cornerSprite_3 ); }
	if( this._cornerSprite_4 != undefined ){ this._cornerSprite_layer.removeChild( this._cornerSprite_4 ); }
	if( this._cornerSprite_layer != undefined ){ this.removeChild( this._cornerSprite_layer ); }
	
	// > 建立边角层
	this._cornerSprite_layer = new Sprite();
	this._cornerSprite_layer.anchor.x = 0.5;
	this._cornerSprite_layer.anchor.y = 0.5;
	this.addChild( this._cornerSprite_layer );
	
	// > 建立 左上、右上、左下、右下 区域
	this._cornerSprite_1 = new Sprite();
	this._cornerSprite_1.anchor.x = 0.5;
	this._cornerSprite_1.anchor.y = 0.5;
	this._cornerSprite_1.blendMode = data['corner_blendMode'];
	this._cornerSprite_layer.addChild( this._cornerSprite_1 );
	this._cornerSprite_2 = new Sprite();
	this._cornerSprite_2.anchor.x = 0.5;
	this._cornerSprite_2.anchor.y = 0.5;
	this._cornerSprite_2.blendMode = data['corner_blendMode'];
	this._cornerSprite_layer.addChild( this._cornerSprite_2 );
	this._cornerSprite_3 = new Sprite();
	this._cornerSprite_3.anchor.x = 0.5;
	this._cornerSprite_3.anchor.y = 0.5;
	this._cornerSprite_3.blendMode = data['corner_blendMode'];
	this._cornerSprite_layer.addChild( this._cornerSprite_3 );
	this._cornerSprite_4 = new Sprite();
	this._cornerSprite_4.anchor.x = 0.5;
	this._cornerSprite_4.anchor.y = 0.5;
	this._cornerSprite_4.blendMode = data['corner_blendMode'];
	this._cornerSprite_layer.addChild( this._cornerSprite_4 );

	if( this._drill_corner_bitmaps.length > 0 ){
		this._cornerSprite_1.bitmap = this._drill_corner_bitmaps[0];
		this._cornerSprite_2.bitmap = this._drill_corner_bitmaps[0];
		this._cornerSprite_3.bitmap = this._drill_corner_bitmaps[0];
		this._cornerSprite_4.bitmap = this._drill_corner_bitmaps[0];
	}
	
}
//==============================
// * 帧刷新对象
//==============================
Drill_DSk_BorderSprite.prototype.drill_updateSprite = function() {
	this._drill_time += 1;						//时间+1
	if( this._drill_parent.visible ){ this._drill_gifTime += 1; }	//gif播放+1
	this.drill_DSk_updateVisible();				//显示控制
	this.drill_DSk_updateOpacity();				//透明度控制
	this.drill_DSk_refreshPosition();			//位置刷新
	
	this.drill_DSk_updateBorder();				//帧刷新 边框
	this.drill_DSk_updateCorner();				//帧刷新 边角
	
	// > 关闭刷新状态位
	if( this._drill_parent._drill_DSk_border_needRefresh != false ){
		this._drill_parent._drill_DSk_border_needRefresh = false;		
	}
	
	this._drill_border_updated = false;			//帧刷新锁 边框
	this._drill_corner_updated = false;			//帧刷新锁 边角
}
//==============================
// * 帧刷新 - 显示控制
//==============================
Drill_DSk_BorderSprite.prototype.drill_DSk_updateVisible = function() {
	var data = this._drill_curStyle;	
	
	this._borderSprite_layer.visible = data['border_visible'];
	this._cornerSprite_layer.visible = data['corner_visible'];
	
	// > 矩形长宽太小
	if( this.drill_DSk_getRect().width <= 2 || this.drill_DSk_getRect().height <= 2 ){
		this.visible = false;
		return;
	}
	
	this.visible = true;
}
//==============================
// * 帧刷新 - 透明度控制
//==============================
Drill_DSk_BorderSprite.prototype.drill_DSk_updateOpacity = function() {
	var data = this._drill_curStyle;	
	
	this.opacity = this._drill_parent.opacity;
	this.scale.y = this._drill_parent._windowSpriteContainer.scale.y;
}
//==============================
// * 位置刷新
//==============================
Drill_DSk_BorderSprite.prototype.drill_DSk_refreshPosition = function() {
	if( this._drill_parent._drill_DSk_border_needRefresh == false ){ return; }
	var data = this._drill_curStyle;	
	var rect = this.drill_DSk_getRect();
	
	this.x = rect.x + rect.width*0.5;
	this.y = rect.y + rect.height*0.5;
}
//==============================
// * 帧刷新 - 边框
//==============================
Drill_DSk_BorderSprite.prototype.drill_DSk_updateBorder = function() {
	if( this._drill_border_updated == true ){ return; }	//（帧刷新锁）
	this._drill_border_updated = true;
	
	var data = this._drill_curStyle;	
	if( this._drill_border_bitmaps == undefined ){ return; }
	if( this._drill_border_bitmaps.length == 0 ){ return; }
	
	// > 播放gif
	var inter = this._drill_gifTime;
	inter = inter / data['border_gif_interval'];
	inter = inter % this._drill_border_bitmaps.length;
	if( data['border_gif_back_run'] ){
		inter = this._drill_border_bitmaps.length - 1 - inter;
	}
	inter = Math.floor(inter);
	var temp_bitmap = this._drill_border_bitmaps[inter];
	
	// > 分区划片
	if( temp_bitmap == undefined ){ return; }
	if( temp_bitmap.isReady() == false ){ return; }
	this._borderSprite_1.bitmap = temp_bitmap;
	this._borderSprite_2.bitmap = temp_bitmap;
	this._borderSprite_3.bitmap = temp_bitmap;
	this._borderSprite_4.bitmap = temp_bitmap;
	this._borderSprite_6.bitmap = temp_bitmap;
	this._borderSprite_7.bitmap = temp_bitmap;
	this._borderSprite_8.bitmap = temp_bitmap;
	this._borderSprite_9.bitmap = temp_bitmap;
	
	var ww = temp_bitmap.width;
	var hh = temp_bitmap.height;
	var bb = data['border_width'];
	this._borderSprite_1.setFrame( 0,       0,      bb,       bb );
	this._borderSprite_2.setFrame( bb,      0,      ww-bb*2,  bb );
	this._borderSprite_3.setFrame( ww-bb,   0,      bb,       bb );
	this._borderSprite_4.setFrame( 0,       bb,     bb,       hh-bb*2 );
	this._borderSprite_6.setFrame( ww-bb,   bb,     bb,       hh-bb*2 );
	this._borderSprite_7.setFrame( 0,       hh-bb,  bb,       bb );
	this._borderSprite_8.setFrame( bb,      hh-bb,  ww-bb*2,  bb );
	this._borderSprite_9.setFrame( ww-bb,   hh-bb,  bb,       bb );
	
	// > 位置
	var rect = this.drill_DSk_getRect();
	rect.width  -= data['border_inner'] * 2;
	rect.height -= data['border_inner'] * 2;
	var rww = rect.width*0.5;
	var rhh = rect.height*0.5;
	
	// > 位置 - 2468 区域刷新
	if( data['border_type'] == "循环平铺" ){
		this._borderSprite_2.x = -1 * rww;		//（TilingSprite没有anchor）
		this._borderSprite_2.y = -1 * rhh - bb;
		this._borderSprite_4.x = -1 * rww - bb;
		this._borderSprite_4.y = -1 * rhh;
		this._borderSprite_6.x =  1 * rww;
		this._borderSprite_6.y = -1 * rhh;
		this._borderSprite_8.x = -1 * rww;
		this._borderSprite_8.y =  1 * rhh;
		
		this._borderSprite_2._width  = rect.width ;
		this._borderSprite_2._height = bb ;
		this._borderSprite_4._width  = bb ;
		this._borderSprite_4._height = rect.height ;
		this._borderSprite_6._width  = bb ;
		this._borderSprite_6._height = rect.height ;
		this._borderSprite_8._width  = rect.width ;
		this._borderSprite_8._height = bb ;
		
	}else if( data['border_type'] == "缩放拉伸" ){
		this._borderSprite_2.x =  0 * rww;
		this._borderSprite_2.y = -1 * rhh;
		this._borderSprite_4.x = -1 * rww;
		this._borderSprite_4.y =  0 * rhh;
		this._borderSprite_6.x =  1 * rww;
		this._borderSprite_6.y =  0 * rhh;
		this._borderSprite_8.x =  0 * rww;
		this._borderSprite_8.y =  1 * rhh;
		
		this._borderSprite_2.scale.x = (rect.width +1) / (ww-bb*2) ;	//多1像素用来缝合边
		this._borderSprite_4.scale.y = (rect.height+1) / (hh-bb*2) ;
		this._borderSprite_6.scale.y = (rect.height+1) / (hh-bb*2) ;
		this._borderSprite_8.scale.x = (rect.width +1) / (ww-bb*2) ;
		
	}else if( data['border_type'] == "保持切割原样" ){
		this._borderSprite_2.x =  0 * rww;
		this._borderSprite_2.y = -1 * rhh;
		this._borderSprite_4.x = -1 * rww;
		this._borderSprite_4.y =  0 * rhh;
		this._borderSprite_6.x =  1 * rww;
		this._borderSprite_6.y =  0 * rhh;
		this._borderSprite_8.x =  0 * rww;
		this._borderSprite_8.y =  1 * rhh;
	}
	
	// > 位置 - 1379 区域刷新
	this._borderSprite_1.x = -1 * rww;
	this._borderSprite_1.y = -1 * rhh;
	this._borderSprite_3.x =  1 * rww;
	this._borderSprite_3.y = -1 * rhh;
	this._borderSprite_7.x = -1 * rww;
	this._borderSprite_7.y =  1 * rhh;
	this._borderSprite_9.x =  1 * rww;
	this._borderSprite_9.y =  1 * rhh;
}	
//==============================
// * 帧刷新 - 边角
//==============================
Drill_DSk_BorderSprite.prototype.drill_DSk_updateCorner = function() {
	if( this._drill_corner_updated == true ){ return; }	//（帧刷新锁）
	this._drill_corner_updated = true;
	
	var data = this._drill_curStyle;	
	if( this._drill_corner_bitmaps == undefined ){ return; }
	if( this._drill_corner_bitmaps.length == 0 ){ return; }
	
	// > 播放gif
	var inter = this._drill_gifTime;
	inter = inter / data['corner_gif_interval'];
	inter = inter % this._drill_corner_bitmaps.length;
	if( data['corner_gif_back_run'] ){
		inter = this._drill_corner_bitmaps.length - 1 - inter;
	}
	inter = Math.floor(inter);
	var temp_bitmap = this._drill_corner_bitmaps[inter];
	
	// > 分区划片
	if( temp_bitmap == undefined ){ return; }
	if( temp_bitmap.isReady() == false ){ return; }
	this._cornerSprite_1.bitmap = temp_bitmap;
	this._cornerSprite_2.bitmap = temp_bitmap;
	this._cornerSprite_3.bitmap = temp_bitmap;
	this._cornerSprite_4.bitmap = temp_bitmap;
	
	var ww = temp_bitmap.width;
	var hh = temp_bitmap.height;
	this._cornerSprite_1.setFrame( 0,       0,       ww*0.5,  hh*0.5 );
	this._cornerSprite_2.setFrame( ww*0.5,  0,       ww*0.5,  hh*0.5 );
	this._cornerSprite_3.setFrame( 0,       hh*0.5,  ww*0.5,  hh*0.5 );
	this._cornerSprite_4.setFrame( ww*0.5,  hh*0.5,  ww*0.5,  hh*0.5 );
	
	// > 位置
	var rect = this.drill_DSk_getRect();
	rect.width  -= data['corner_inner'] * 2;
	rect.height -= data['corner_inner'] * 2;
	var rww = rect.width*0.5;
	var rhh = rect.height*0.5;
	this._cornerSprite_1.x = -1 * rww;
	this._cornerSprite_1.y = -1 * rhh;
	this._cornerSprite_2.x =  1 * rww;
	this._cornerSprite_2.y = -1 * rhh;
	this._cornerSprite_3.x = -1 * rww;
	this._cornerSprite_3.y =  1 * rhh;
	this._cornerSprite_4.x =  1 * rww;
	this._cornerSprite_4.y =  1 * rhh;
	
	// > 浮动效果
	if( data['corner_float'] == "开启" ){
		var range = data['corner_floatRange'];
		var speed = data['corner_floatSpeed'];
		var f_move = range * Math.sin( (this._drill_gifTime * speed + 180) /180*Math.PI );
		this._cornerSprite_1.x += -1 * f_move;
		this._cornerSprite_1.y += -1 * f_move;
		this._cornerSprite_2.x +=  1 * f_move;
		this._cornerSprite_2.y += -1 * f_move;
		this._cornerSprite_3.x += -1 * f_move;
		this._cornerSprite_3.y +=  1 * f_move;
		this._cornerSprite_4.x +=  1 * f_move;
		this._cornerSprite_4.y +=  1 * f_move;
	}
}
//==============================
// * 边框贴图 - 获取矩形
//==============================
Drill_DSk_BorderSprite.prototype.drill_DSk_getRect = function(){
	var data = {};
	data['x'] = 0;		//（注意，这里是相对于父类的矩形，所以x y肯定为零）
	data['y'] = 0;
	data['width'] = this._drill_parent.width;
	data['height'] = this._drill_parent.height;
	return data;
};

