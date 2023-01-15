//=============================================================================
// Drill_MiniPlateForEvent.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        鼠标 - 事件说明窗口
 * @author Drill_up
 * 
 * @Drill_LE_param "皮肤样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MPFE_style_list_length"
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_MiniPlateForEvent +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得鼠标靠近事件时，可以显示说明窗口。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfInput             系统-输入设备核心
 *   - Drill_CoreOfWindowAuxiliary   系统-窗口辅助核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件的行走图。
 * 2.具体内容可以去看看 "14.鼠标 > 关于鼠标悬浮窗口.docx"。
 *   插件单独对鼠标有效，支持触屏按住。
 * 细节：
 *   (1.一个事件只能对应一个鼠标触发窗口方式，设置多个没有效果。
 *   (2.如果说明中没有任何字符，将不显示这个状态的说明内容。
 *   (3.写了一个"=>事件说明窗口"后，后面可以跟非常多的"=:"文本行。
 *   (4.你可以设置"附加宽度高度"来适应可能会被遮住的文字。
 * 鼠标触发：
 *   (1.鼠标触发 显示说明窗口 的触发范围与行走图资源大小相关。
 * 设计：
 *   (1.由于该窗口的大小是变化的，所以布局可以设定四种。
 *      如果是触屏情况，建议将说明窗口锁定在一个固定位置，方便查看信息。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/system
 * 先确保项目img文件夹下是否有system文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-自定义窗口皮肤
 * 资源-自定义背景图片
 *
 * 系统窗口与默认的window.png图片一样，可设置为不同的皮肤。
 * 自定义背景图片不能根据窗口大小自适应，你需要合理分配的说明内容。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令手动控制类型情况：
 * （第一个冒号两边都有一个空格，=:后面的文字表示一行的内容。）
 * 
 * 事件注释：=>事件说明窗口 : 显示下列文本
 *           =:第一行内容
 *           =:第二行内容
 * 事件注释：=>事件说明窗口 : 激活方式 : 鼠标接近
 * 事件注释：=>事件说明窗口 : 激活方式 : 鼠标左键按下[持续]
 * 事件注释：=>事件说明窗口 : 激活方式 : 鼠标滚轮按下[持续]
 * 事件注释：=>事件说明窗口 : 激活方式 : 鼠标右键按下[持续]
 * 事件注释：=>事件说明窗口 : 激活方式 : 触屏按下[持续]
 * 事件注释：=>事件说明窗口 : 设置皮肤样式 : 样式[1]
 * 事件注释：=>事件说明窗口 : 设置皮肤样式 : 默认样式
 *
 * 1.注意，一条注释最多能填入六行，如果你要设置更多内容，多加几个注释即可。
 * 
 * 事件注释(旧)：=>事件说明窗口 : 鼠标接近 : 显示下列说明
 * 事件注释(旧)：=>事件说明窗口 : 鼠标左键按下[持续] : 显示下列说明
 * 事件注释(旧)：=>事件说明窗口 : 鼠标滚轮按下[持续] : 显示下列说明
 * 事件注释(旧)：=>事件说明窗口 : 鼠标右键按下[持续] : 显示下列说明
 * 事件注释(旧)：=>事件说明窗口 : 触屏按下[持续] : 显示下列说明
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令，临时显示/隐藏窗口设置。
 * （注意，冒号后面有两个空格。）
 *
 * 插件指令：>事件说明窗口 : 本事件 : 隐藏说明
 * 插件指令：>事件说明窗口 : 事件[10] : 隐藏说明
 * 插件指令：>事件说明窗口 : 事件变量[21] : 隐藏说明
 * 插件指令：>事件说明窗口 : 批量事件[10,11] : 隐藏说明
 * 插件指令：>事件说明窗口 : 批量事件变量[21,22] : 隐藏说明
 * 
 * 插件指令：>事件说明窗口 : 本事件 : 隐藏说明
 * 插件指令：>事件说明窗口 : 本事件 : 显示说明
 * 插件指令：>事件说明窗口 : 本事件 : 强制刷新说明
 * 
 * 1.隐藏 只是暂时性的，只在当前地图有效。
 * 2.使用"强制刷新说明"，可以用于刷新窗口内容中的\v[21]窗口字符变量的值。
 *   如果说明窗口的事件页没有任何内容，则没有任何效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口属性
 * 你可以修改设置说明窗口的部分属性：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>事件说明窗口 : 修改附加宽高 : 宽度[100]
 * 插件指令：>事件说明窗口 : 修改附加宽高 : 高度[100]
 * 
 * 1.由于该窗口在场景中只有一个，因此相关属性修改后是永久有效的。
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
 * 时间复杂度： o(n^2)+o(贴图处理) 每帧
 * 测试方法：   指定地图中放置10个带有说明窗口的事件，测试触发情况。
 * 测试结果：   200个事件的地图中，平均消耗为：【32.18ms】
 *              100个事件的地图中，平均消耗为：【23.70ms】
 *               50个事件的地图中，平均消耗为：【20.54ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件结构为只有一个窗口+数个说明窗口的节点，产生的消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了附加宽度附加高度设置。
 * [v1.2]
 * 优化了窗口层级的位置。
 * [v1.3]
 * 分离了核心，优化了插件性能。添加了锁定功能。
 * [v1.4]
 * 修改了内部结构，添加了强制刷新插件指令。
 * [v1.5]
 * 优化了内部整体结构，添加了地图层级的设置。添加了窗口中心锚点的设置。
 * [v1.6]
 * 优化了 强制刷新说明 指令的执行方式。
 * [v1.7]
 * 优化了部分结构，减少了性能消耗。
 * 支持多个窗口皮肤样式的自定义。
 * [v1.8]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param ---窗口---
 * @default 
 *
 * @param 窗口行间距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容之间的行间距。（默认标准：36）
 * @default 10
 *
 * @param 窗口内边距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容与窗口外框的内边距。（默认标准：18）
 * @default 10
 *
 * @param 窗口字体大小
 * @parent ---窗口---
 * @type number
 * @min 1
 * @desc 窗口的字体大小。注意图标无法根据字体大小变化。（默认标准：28）
 * @default 22
 *
 * @param 窗口附加宽度
 * @parent ---窗口---
 * @desc 在当前自适应的基础上，再额外增加的宽度。可为负数。
 * @default 0
 *
 * @param 窗口附加高度
 * @parent ---窗口---
 * @desc 在当前自适应的基础上，再额外增加的高度。可为负数。
 * @default 0
 * 
 * @param 默认皮肤样式
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
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default {"标签":"--默认皮肤--","---窗口---":"","布局模式":"默认窗口皮肤","布局透明度":"225","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","是否锁定窗口色调":"false","窗口色调-红":"0","窗口色调-绿":"0","窗口色调-蓝":"0","窗口中心锚点":"正中心","是否锁定窗口位置":"false","平移-锁定位置 X":"0","平移-锁定位置 Y":"0","地图层级":"图片层","图片层级":"90"}
 * 
 * @param 皮肤样式-2
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-3
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-4
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-5
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-6
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-7
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-8
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-9
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-10
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-11
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-12
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-13
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-14
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-15
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-16
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-17
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-18
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-19
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-20
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFEStyle>
 * @desc 事件说明窗口的皮肤样式配置。
 * @default 
 * 
 * 
 */
/*~struct~DrillMPFEStyle:
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
 * @default 255
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
 * @param 是否锁定窗口色调
 * @parent ---窗口---
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
 * @param 窗口中心锚点
 * @parent ---窗口---
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
 * @param 是否锁定窗口位置
 * @parent ---窗口---
 * @type boolean
 * @on 锁定
 * @off 关闭
 * @desc true - 锁定，false - 关闭，将说明窗口锁定在一个固定的地方，而不是跟随鼠标位置走。
 * @default false
 *
 * @param 平移-锁定位置 X
 * @parent 是否锁定窗口位置
 * @desc 将说明窗口锁定在一个固定的地方，而不是跟随鼠标位置走。x轴方向平移，单位像素，0为贴在最左边。
 * @default 0
 *
 * @param 平移-锁定位置 Y
 * @parent 是否锁定窗口位置
 * @desc 将说明窗口锁定在一个固定的地方，而不是跟随鼠标位置走。y轴方向平移，单位像素，0为贴在最上面。
 * @default 0
 *
 * @param 地图层级
 * @parent ---窗口---
 * @type select
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 窗口所在的地图层级位置，你需要以此来考虑分配ui遮挡关系。
 * @default 图片层
 *
 * @param 图片层级
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口在同一个地图层，先后排序的位置，0表示最后面。
 * @default 90
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		MPFE (Mini_Plate_For_Event)
//		临时全局变量	DrillUp.g_MPFE_xxx
//		临时局部变量	this._drill_MPFE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)+o(贴图处理) 每帧
//		★性能测试因素	鼠标乱晃
//		★性能测试消耗	旧消耗：30.09ms  39.97ms（update函数，在镜像Drill_Sprite_LRR中）
//						新消耗：23.7ms（drill_updateContext）
//		★最坏情况		当前视角，存在大批说明窗口的事件，并且玩家的鼠标乱晃。
//						（该插件目前没有对最坏情况进行实测。）
//		★备注			无
//		
//		★优化记录
//			2022-10-21优化：
//				测试时，用鼠标不停地来回晃动，让说明窗口不停地工作。
//				优化前的情况（check方法）：108.0ms，优化后的情况（Bean对象方法）：53.1ms。
//				优化后平时不工作时的情况：23.7ms。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件说明窗口：
//				->全局配置
//					->附加高宽
//				->实体类容器
//					->事件注释
//						->创建实体类
//						->多行文本
//					->刷新统计
//				->贴图框架
//					->刷新框架（给实体类赋值）
//					->刷新位置（给实体类赋值）
//				->实体类
//					->被 Sprite_Character 赋值
//				->说明窗口
//					->位置
//						->跟随鼠标位置
//					->内容
//						->遍历实体类容器
//					->窗口皮肤
//				
//				
//		★私有类如下：
//			* Drill_MPFE_Bean		【事件说明窗口实体类】
//			* Drill_MPFE_Window		【事件说明窗口】
//		
//		★必要注意事项：
//			1.Bean实体类在 事件贴图 中被动赋值。
//			  Window事件说明窗口在帧刷新时，主动遍历实体类列表，确认激活范围及显示内容。
//
//		★其它说明细节：
//			1.	2020/9/13：
//				这个插件给我的印象一点都不好，糟透了。刷新文本非常困难。
//				由于之前加锁加的太死了，结构环环相扣，修改内容后，仍然不变，就很头疼。
//				从原理上，这里分成了三个管理体系：
//					窗口与鼠标（难点在鼠标悬停、鼠标离开）
//					事件页与文本内容（难点在文本变化时机、行走图变化时机）
//					事件贴图触发范围（难点在获取事件的位置、贴图触发区）
//				这三个结构纠缠在一起，难以分离。
//				并且，我还没有找到很好的方法将它们独立开来。
//				可能还需要花时间建立 特殊的核心 或 对象捕获体系。
//			2.	2021/7/13：
//				我没有大改代码，我只整理了大体结构。
//				现在这一套框架，已经可以相对轻松地复制到其他各个界面并形成新插件了。
//				现在的我已经没有插件初期开荒的记忆，并开始对曾经的自己感到疑惑，为什么当时的我会那么困难？那么纠结？
//				也许是这样的：从0到1难，从1到2易。
//			3.	2022/10/31：
//				这次我把大部分结构重新优化了一遍，虽然只优化了一半的性能，但是结构感觉完整清晰了。
//				另外没想到 Sprite_Character.prototype.update 的结构消耗那么大，都没有for循环，就单纯赋值都能占20ms。
//				不需要 镜头范围的 优化策略，因为本身Bean的范围检测就有了。
//				
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MiniPlateForEvent = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MiniPlateForEvent');
	
	
	//==============================
	// * 变量获取 - 皮肤样式
	//				（~struct~DrillMPFEStyle）
	//==============================
	DrillUp.drill_MPFE_initStyle = function( dataFrom ){
		var data = {};
		
		// > 窗口皮肤
		data['window_type'] = String( dataFrom["布局模式"] || "默认窗口皮肤");
		data['window_opacity'] = Number( dataFrom["布局透明度"] || 192);
		data['window_sys_src'] = String( dataFrom["资源-自定义窗口皮肤"] || "");
		data['window_pic_src'] = String( dataFrom["资源-自定义背景图片"] || "");
		data['window_pic_x'] = Number( dataFrom["平移-自定义背景图片 X"] || 0);
		data['window_pic_y'] = Number( dataFrom["平移-自定义背景图片 Y"] || 0);
		data['window_tone_lock'] = String( dataFrom["是否锁定窗口色调"] || "false") == "true";
		data['window_tone_r'] = Number( dataFrom["窗口色调-红"] || 0);
		data['window_tone_g'] = Number( dataFrom["窗口色调-绿"] || 0);
		data['window_tone_b'] = Number( dataFrom["窗口色调-蓝"] || 0);
		
		// > 窗口属性
		data['anchor'] = String( dataFrom["窗口中心锚点"] || "左上角");
		data['lock_enable'] = String( dataFrom["是否锁定窗口位置"] || "false") === "true";
		data['lock_x'] = Number( dataFrom["平移-锁定位置 X"] || 0);
		data['lock_y'] = Number( dataFrom["平移-锁定位置 Y"] || 0);
		data['layer_index'] = String( dataFrom["地图层级"] || "图片层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		return data;
	}
	
	/*----------------杂项---------------*/
	DrillUp.g_MPFE_defaultStyle = Number(DrillUp.parameters["默认皮肤样式"] || 1);
	DrillUp.g_MPFE_lineheight = Number(DrillUp.parameters["窗口行间距"] || 10);
	DrillUp.g_MPFE_padding = Number(DrillUp.parameters["窗口内边距"] || 18);
	DrillUp.g_MPFE_fontsize = Number(DrillUp.parameters["窗口字体大小"] || 22);
	DrillUp.g_MPFE_ex_width = Number(DrillUp.parameters["窗口附加宽度"] || 0);
	DrillUp.g_MPFE_ex_height = Number(DrillUp.parameters["窗口附加高度"] || 0);
	
	/*-----------------样式集------------------*/
	DrillUp.g_MPFE_style_list_length = 20;
	DrillUp.g_MPFE_style_list = [];
	for( var i = 0; i < DrillUp.g_MPFE_style_list_length; i++ ){
		if( DrillUp.parameters["皮肤样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["皮肤样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["皮肤样式-" + String(i+1) ]);
			DrillUp.g_MPFE_style_list[i] = DrillUp.drill_MPFE_initStyle( data );
		}else{
			DrillUp.g_MPFE_style_list[i] = DrillUp.drill_MPFE_initStyle( {} );
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfWindowAuxiliary ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_MPFE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MPFE_pluginCommand.call(this, command, args);
	if( command === ">事件说明窗口" ){
		
		/*-----------------对象组获取------------------*/
		var char_list = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( char_list == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_MPFE_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_MPFE_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_MPFE_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_MPFE_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit == "玩家" ){
				char_list = [ $gamePlayer ];
			}
		}
		
		/*-----------------对象操作------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "隐藏说明" ){ 
				for(var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch._drill_MPFE_bean.drill_MPFE_setVisible( false );
				}
			}
			if( type == "显示说明" ){
				for(var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch._drill_MPFE_bean.drill_MPFE_setVisible( true );
				}
			}
			if( type == "强制刷新说明" ){
				for(var i=0; i < char_list.length; i++ ){
					var ch = char_list[i];
					ch._drill_MPFE_bean.drill_MPFE_refreshContext();
				}
			}
		}
		
		/*-----------------特殊设置------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改附加宽高" ){
				
				if( temp1.indexOf("宽度[") != -1 ){
					temp1 = temp1.replace("宽度[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFE_ex_width = Number(temp1);
				}
				if( temp1.indexOf("高度[") != -1 ){
					temp1 = temp1.replace("高度[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFE_ex_height = Number(temp1);
				}
				
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_MPFE_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_MiniPlateForEvent.js 鼠标 - 事件说明窗口】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	if( e._drill_MPFE_bean == undefined ){
		alert( "【Drill_MiniPlateForEvent.js 鼠标 - 事件说明窗口】\n" +
				"事件注释错误，id为"+e_id+"的事件并没有添加说明文本。");
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_MPFE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MPFE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MPFE_sys_initialize.call(this);
	this.drill_MPFE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MPFE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MPFE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MPFE_saveEnabled == true ){	
		$gameSystem.drill_MPFE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MPFE_initSysData();
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
Game_System.prototype.drill_MPFE_initSysData = function() {
	this.drill_MPFE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MPFE_checkSysData = function() {
	this.drill_MPFE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MPFE_initSysData_Private = function() {
	
	this._drill_MPFE_ex_width = DrillUp.g_MPFE_ex_width;		//（窗口附加宽度）
	this._drill_MPFE_ex_height = DrillUp.g_MPFE_ex_height; 		//（窗口附加高度）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MPFE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MPFE_ex_width == undefined ){
		this.drill_MPFE_initSysData();
	}
	
};


//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_MPFE_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}

//=============================================================================
// ** 事件注释初始化
//=============================================================================
//==============================
// * 事件注释 - 初始化
//==============================
var _drill_MPFE_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_MPFE_setupPageSettings.call(this);
	this.drill_MPFE_setupPageSettings();
}
Game_Event.prototype.drill_MPFE_setupPageSettings = function() {
	
	//（每次不要清空注释）
	
	var page = this.page();
    if( page ){
		
		var temp_contextList = [];		//多行注释内容
		var start_count = false;		//多行注释标记
		
		var temp_list = this.list();
		for(var k = 0; k < temp_list.length; k++ ){
			var l = temp_list[k];
			if( l.code === 108 || l.code === 408 ){
				
				var row = l.parameters[0];
				var args = row.split(/[ ]+/);	
				var command = args.shift();
				if( command == "=>事件说明窗口" ){
					
					// > 创建实体类
					if( this._drill_MPFE_bean == undefined ){
						this._drill_MPFE_bean = new Drill_MPFE_Bean();
						$gameTemp._drill_MPFE_needRestatistics = true;
					}
					
					/*-----------------多行注释------------------*/
					if( args.length == 2 ){
						if(args[1]){ var temp1 = String(args[1]); }
						if( temp1 == "显示下列说明" || temp1 == "显示下列文本" ){
							start_count = true;
							continue;
						}
					}
					if( args.length == 4 ){
						if(args[1]){ var type = String(args[1]); }
						if(args[3]){ var temp2 = String(args[3]); }
						if( type == "激活方式" ){
							this._drill_MPFE_bean._drill_mouseType = temp2;
							continue;
						}
						if( type == "设置皮肤样式" ){
							if( temp2 == "默认样式" ){
								this._drill_MPFE_bean._drill_styleId = DrillUp.g_MPFE_defaultStyle;
							}else{
								temp2 = temp2.replace("样式[","");
								temp2 = temp2.replace("]","");
								this._drill_MPFE_bean._drill_styleId = Number(temp2);
							}
							continue;
						}
					}
					
					/*-----------------旧注释------------------*/
					if( args.length == 4 ){
						if(args[1]){ var temp1 = String(args[1]); }
						if(args[3]){ var temp2 = String(args[3]); }
						if( temp2 == "显示下列说明" || temp2 == "显示下列文本" ){
							start_count = true;
							this._drill_MPFE_bean._drill_mouseType = temp1;
							continue;
						}
					}
				};
				if( start_count == true ){
					if(row.contains("=:")){
						temp_contextList.push(row.replace("=:",""));
					}else{
						start_count = false;
					}
				};
				
			};
		};
		
		// > 内容刷新
		if( temp_contextList.length > 0 ){
			this._drill_MPFE_bean.drill_MPFE_setContextList( temp_contextList );
		}
    }
};


//=============================================================================
// ** 实体类容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_MPFE_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_MPFE_temp_initialize.call(this);
	this._drill_MPFE_beanTank = [];				//实体类容器
	this._drill_MPFE_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_MPFE_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_MPFE_beanTank = [];		//实体类容器
	$gameTemp._drill_MPFE_needRestatistics = true;
	_drill_MPFE_gmap_setup.call(this,mapId);
};
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_MPFE_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_MPFE_beanTank = [];		//实体类容器
	$gameTemp._drill_MPFE_needRestatistics = true;
	_drill_MPFE_smap_createCharacters.call(this);
};
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_MPFE_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_MPFE_map_update.call( this, sceneActive );
	this.drill_MPFE_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_MPFE_updateRestatistics = function() {
	if( !$gameTemp._drill_MPFE_needRestatistics ){ return }
	$gameTemp._drill_MPFE_needRestatistics = false;
	
	$gameTemp._drill_MPFE_beanTank = [];		//实体类容器
	
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event._drill_MPFE_bean != undefined ){
			$gameTemp._drill_MPFE_beanTank.push( temp_event._drill_MPFE_bean );
		}
	}
};

//=============================================================================
// ** 贴图框架
//=============================================================================
//==============================
// * 贴图框架 - 绑定物体
//==============================
var _Drill_MPFE_s_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function( character ){
	_Drill_MPFE_s_setCharacter.call(this,character);
	
	// > 镜像情况时，直接跳过
	if( $gameTemp.drill_MPFE_isReflectionSprite(this) ){ return; }
	
	// > 贴图框架 初始化
	this.drill_MPFE_initBitmapFrame();
};
//==============================
// * 贴图框架 - 帧刷新
//==============================
var _Drill_MPFE_s_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	
	// > 没有实体类的事件，不操作
	//		（优化记录：能跳出的尽快跳出循环，防止出现冗余的帧刷新赋值行为）
	if( this._character == undefined ||
		this._character._drill_MPFE_bean == undefined ){
		_Drill_MPFE_s_update.call(this);
		return;
	}
	
	// > 镜像情况时，直接跳过
	if( $gameTemp.drill_MPFE_isReflectionSprite(this) ){
		_Drill_MPFE_s_update.call(this);
		return;
	}
	
	
	// > 帧刷新 - 贴图框架 bitmap识别（必须放前面）
	this.drill_MPFE_updateBitmapFrame();
	
	// > 帧刷新
	_Drill_MPFE_s_update.call(this);
	
	// > 帧刷新 - 实体类位置
	this.drill_MPFE_updatePosition();
};
//==============================
// * 贴图框架 - 初始化
//==============================
Sprite_Character.prototype.drill_MPFE_initBitmapFrame = function() {
	this._drill_MPFE_bitmap = null;			//框架 - obj对象
	this._drill_MPFE_frame_x = -1;			//框架 - x
	this._drill_MPFE_frame_y = -1;			//框架 - y
	this._drill_MPFE_frame_w = 0;			//框架 - w
	this._drill_MPFE_frame_h = 0;			//框架 - h
};
//==============================
// * 贴图框架 - bitmap识别（必须放前面）
//==============================
Sprite_Character.prototype.drill_MPFE_updateBitmapFrame = function() {
	if( this.bitmap == undefined ||
		this.bitmap._url == "" ){
		this._drill_MPFE_frame_x = -1;
		this._drill_MPFE_frame_y = -1;
		this._drill_MPFE_frame_w = 0;
		this._drill_MPFE_frame_h = 0;
		return;
	}
	if( this.bitmap.isReady() == false ){ return; }
	
	// > 不接受宽度为0的标记
	if( this._realFrame.width == 0 ){ return; }
	if( this._realFrame.height == 0 ){ return; }
	
	if( this._drill_MPFE_frame_x != this._realFrame.x ||
		this._drill_MPFE_frame_y != this._realFrame.y ||
		this._drill_MPFE_frame_w != this._realFrame.width ||
		this._drill_MPFE_frame_h != this._realFrame.height ){
		
		this._drill_MPFE_bitmap = this.bitmap;				//记录bitmap数据，确保变成空时，不会丢失bitmap
		this._drill_MPFE_frame_x = this._realFrame.x;
		this._drill_MPFE_frame_y = this._realFrame.y;
		this._drill_MPFE_frame_w = this._realFrame.width;
		this._drill_MPFE_frame_h = this._realFrame.height;
		
		// > 刷新实体类数据
		this._character._drill_MPFE_bean.drill_MPFE_resetFrame(
			this._drill_MPFE_frame_x,
			this._drill_MPFE_frame_y,
			this._drill_MPFE_frame_w,
			this._drill_MPFE_frame_h
		);
	}
};
//==============================
// * 帧刷新 - 实体类位置
//==============================
Sprite_Character.prototype.drill_MPFE_updatePosition = function() {
	var bean = this._character._drill_MPFE_bean;
	
	var ww = bean._drill_frameW;
	var hh = bean._drill_frameH;
	var xx = this.x - ww*this.anchor.x;
	var yy = this.y - hh*this.anchor.y;
	bean.drill_MPFE_setPosition( xx, yy );
};


//=============================================================================
// ** 事件说明窗口 实体类【Drill_MPFE_Bean】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个专门的实体类数据类。
// **		子功能：	->无帧刷新
// **					->重设数据
// **						->序列号
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
// **				> 该类没有帧刷新，只能被动赋值。（Sprite_Character 外部控制）
//=============================================================================
//==============================
// * 实体类 - 定义
//==============================
function Drill_MPFE_Bean(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 实体类 - 初始化
//==============================
Drill_MPFE_Bean.prototype.initialize = function(){
	this._drill_beanSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_initPrivateData();										//私有数据初始化
};
//##############################
// * 实体类 - 设置可见【开放函数】
//			
//			参数：	> visible 布尔
//			返回：	> 无
//##############################
Drill_MPFE_Bean.prototype.drill_MPFE_setVisible = function( visible ){
	this._drill_visible = visible;
};
//##############################
// * 实体类 - 设置位置【开放函数】
//			
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//			
//			说明：	> 实体类只记录一个坐标和一个框架范围。需要考虑锚点的影响。
//##############################
Drill_MPFE_Bean.prototype.drill_MPFE_setPosition = function( x, y ){
	this._drill_x = x;
	this._drill_y = y;
};
//##############################
// * 实体类 - 设置框架数据【开放函数】
//			
//			参数：	> frameX,frameY,frameW,frameH 矩形对象
//			返回：	> 无
//			
//			说明：	> 被动赋值，见 贴图框架 的功能。
//##############################
Drill_MPFE_Bean.prototype.drill_MPFE_resetFrame = function( frameX, frameY, frameW, frameH ){
	this._drill_frameX = frameX;
	this._drill_frameY = frameY;
	this._drill_frameW = frameW;
	this._drill_frameH = frameH;
};
//##############################
// * 实体类 - 设置内容【开放函数】
//			
//			参数：	> contextList 字符串列表
//			返回：	> 无
//##############################
Drill_MPFE_Bean.prototype.drill_MPFE_setContextList = function( contextList ){
	this._drill_contextList = contextList;
	this.drill_MPFE_refreshContext();
};
//##############################
// * 实体类 - 刷新内容【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_MPFE_Bean.prototype.drill_MPFE_refreshContext = function(){
	this._drill_contextSerial = new Date().getTime() + Math.random();	//（文本变化标记）
};
//==============================
// * 初始化 - 私有数据初始化
//==============================
Drill_MPFE_Bean.prototype.drill_initPrivateData = function(){
	
	this._drill_visible = true;				//实体类 - 可见
	
	this._drill_x = 0;						//实体类 - 位置X
	this._drill_y = 0;						//实体类 - 位置Y
	
	this._drill_frameX = 0;					//实体类 - 框架X
	this._drill_frameY = 0;					//实体类 - 框架Y
	this._drill_frameW = 0;					//实体类 - 框架宽度
	this._drill_frameH = 0;					//实体类 - 框架高度
	
	this._drill_mouseType = "鼠标接近";		//实体类 - 鼠标触发类型
	this._drill_contextList = [];			//实体类 - 当前文本
	
	this._drill_styleId = DrillUp.g_MPFE_defaultStyle;					//实体类 - 自定义窗口的样式
	
	this._drill_contextSerial = new Date().getTime() + Math.random();	//（文本变化标记）
};



//#############################################################################
// ** 【标准模块】地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_MPFE_layerAddSprite = function( sprite, layer_index ){
    this.drill_MPFE_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_MPFE_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_MPFE_sortByZIndex = function () {
    this.drill_MPFE_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 上层
//==============================
var _drill_MPFE_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_MPFE_layer_createDestination.call(this);		//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_MPFE_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_MPFE_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_MPFE_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MPFE_layer_createAllWindows.call(this);		//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_MPFE_sortByZIndex_Private = function() {
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_MPFE_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "上层" ){
		this._spriteset._drill_mapUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_mapPicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
};
//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图界面 - 创建说明窗口
//==============================
var _drill_MPFE_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_MPFE_map_createAllWindows.call(this);
	
	if( this._drill_MPFE_window == undefined ){		//只建立一个窗口
		this._drill_MPFE_window = new Drill_MPFE_Window( "Scene_Map" );
		
		// > 记录层级
		this._drill_MPFE_curLayer = this._drill_MPFE_window._drill_curLayer;
		this._drill_MPFE_curZIndex = this._drill_MPFE_window.zIndex;
		
		this.drill_MPFE_layerAddSprite( this._drill_MPFE_window, this._drill_MPFE_curLayer );
		this.drill_MPFE_sortByZIndex();
	}
};
//==============================
// * 地图界面 - 说明窗口层级变化
//==============================
var _drill_MPFE_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_drill_MPFE_smap_update.call(this);
	
	// > 地图层级
	if( this._drill_MPFE_curLayer != this._drill_MPFE_window._drill_curLayer ){
		this._drill_MPFE_curLayer = this._drill_MPFE_window._drill_curLayer;
		this.drill_MPFE_layerAddSprite( this._drill_MPFE_window, this._drill_MPFE_curLayer );
	}
	// > 图片层级
	if( this._drill_MPFE_curZIndex != this._drill_MPFE_window.zIndex ){
		this._drill_MPFE_curZIndex = this._drill_MPFE_window.zIndex;
		this.drill_MPFE_sortByZIndex();
	}
};
	
	
//=============================================================================
// ** 事件说明窗口【Drill_MPFE_Window】
//			
//			索引：	无
//			来源：	继承于Window_Base
//			实例：	Scene_Map下的 _drill_MPFE_window 成员
//			应用：	暂无 
//			
//			作用域：	地图界面
//			主功能：	定义一个窗口，能随时改变内容和高宽，用于描述事件内置信息。
//			子功能：	->位置
//							->跟随鼠标位置
//							->中心锚点
//							->边缘修正
//						->内容
//							->遍历实体类容器
//							->刷新内容
//						->窗口皮肤
//							> 默认窗口皮肤
//							> 自定义窗口皮肤
//							> 自定义背景图片
//							> 黑底背景
//						
//			说明：	> 整个场景只有一个该窗口。
//					> 其它相似的可变窗口插件，可以搜关键词："initSkin"。
//=============================================================================
//==============================
// * 事件说明窗口 - 定义
//==============================
function Drill_MPFE_Window() {
    this.initialize.apply(this, arguments);
};
Drill_MPFE_Window.prototype = Object.create(Window_Base.prototype);
Drill_MPFE_Window.prototype.constructor = Drill_MPFE_Window;
//==============================
// * 事件说明窗口 - 初始化
//==============================
Drill_MPFE_Window.prototype.initialize = function( curScene_str ){
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	this._drill_curScene = curScene_str;
	
	this.drill_initPrivateData();		//初始化数据
	this.drill_initSkin();				//初始化窗口皮肤
};
//==============================
// * 事件说明窗口 - 帧刷新
//==============================
Drill_MPFE_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	this.drill_updateContext();			//帧刷新 - 内容
	this.drill_updatePosition();		//帧刷新 - 位置
	this.drill_updateSkin();			//帧刷新 - 窗口皮肤
}
//==============================
// * 事件说明窗口 - 窗口属性
//==============================
Drill_MPFE_Window.prototype.lineHeight = function(){ return DrillUp.g_MPFE_lineheight; };			//窗口行间距
Drill_MPFE_Window.prototype.standardPadding = function(){ return DrillUp.g_MPFE_padding; };			//窗口内边距
Drill_MPFE_Window.prototype.standardFontSize = function(){ return DrillUp.g_MPFE_fontsize; };		//窗口字体大小
//==============================
// * 事件说明窗口 - 初始化数据
//==============================
Drill_MPFE_Window.prototype.drill_initPrivateData = function() {
	
	// > 私有属性初始化
	this._drill_width = 0;
	this._drill_height = 0;
	this._drill_curBeanSerial = -1;
	this._drill_curStyleId = -1;
	
	// > 当前样式
	this._drill_curStyleId = DrillUp.g_MPFE_defaultStyle;
	this._drill_curData = DrillUp.g_MPFE_style_list[ this._drill_curStyleId -1 ];
	
	// > 中心锚点
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( this._drill_curData['anchor'] == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( this._drill_curData['anchor'] == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	if( this._drill_curData['anchor'] == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( this._drill_curData['anchor'] == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
	
	// > 图片层级
	this._drill_curLayer = this._drill_curData['layer_index'];
	this.zIndex = this._drill_curData['zIndex'];
		
	// > 窗口内容刷新
	this.createContents();
    this.contents.clear();
}
//==============================
// * 事件说明窗口 - 帧刷新样式
//==============================
Drill_MPFE_Window.prototype.drill_refreshStyle = function( style_id ){
	this._drill_curStyleId = style_id;
	this._drill_curData = DrillUp.g_MPFE_style_list[ this._drill_curStyleId -1 ];
	
	// > 中心锚点
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( this._drill_curData['anchor'] == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( this._drill_curData['anchor'] == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	if( this._drill_curData['anchor'] == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( this._drill_curData['anchor'] == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
	
	// > 图片层级
	this._drill_curLayer = this._drill_curData['layer_index'];
	this.zIndex = this._drill_curData['zIndex'];
	
	// > 重设数据
	this.drill_resetSkinData( this._drill_curData );
}
//==============================
// * 事件说明窗口 - 帧刷新位置
//==============================
Drill_MPFE_Window.prototype.drill_updatePosition = function() {
	var xx = 0;
	var yy = 0;
	
	// > 锁定位置
	if( this._drill_curData['lock_enable'] == true ){
		xx += this._drill_curData['lock_x'];
		yy += this._drill_curData['lock_y'];
		
		
	// > 跟随鼠标位置
	}else{
		xx += _drill_mouse_x;
		yy += _drill_mouse_y;
		
		// > 【地图 - 活动地图镜头】落点位置
		//		（注意，这里只改变窗口的位置 ）
		if( Imported.Drill_LayerCamera ){
			if( this._drill_curScene == "Scene_Map" ){
				var layer = this._drill_curData['layer_index'];
				if( layer == "下层" || layer == "中层" || layer == "上层" ){
					var convert_pos = $gameSystem._drill_LCa_controller.drill_LCa_getPos_OuterToChildren( xx, yy );
					xx = convert_pos.x;
					yy = convert_pos.y;
				}
				if( layer == "图片层" || layer == "最顶层" ){
					//（不操作）
				}
			}
		}
	}
	
	
	// > 中心锚点
	xx -= this._drill_width  * this._drill_anchor_x;
	yy -= this._drill_height * this._drill_anchor_y;
	
	
	// > 边缘修正 - 横向贴边
	if( xx < 0 ){ xx = 0; }
	if( xx > Graphics.boxWidth - this._drill_width ){
		xx = Graphics.boxWidth - this._drill_width;
	}
	// > 边缘修正 - 纵向贴边
	if( yy < 0 ){ yy = 0; }
	if( yy > Graphics.boxHeight - this._drill_height ){
		yy = Graphics.boxHeight - this._drill_height;
	}
	
	this.x = xx;
	this.y = yy;
}

//==============================
// * 内容 - 帧刷新
//==============================
Drill_MPFE_Window.prototype.drill_updateContext = function() {
	
	// > 实体类容器遍历
	for( var i=0; i < $gameTemp._drill_MPFE_beanTank.length; i++ ){
		var bean = $gameTemp._drill_MPFE_beanTank[i];
		
		// > 触发范围
		if( this.drill_isInFrame(bean) ){
			
			// > 切换实体类时，刷新内容
			if( this._drill_curBeanSerial != bean._drill_contextSerial ){
				this._drill_curBeanSerial = bean._drill_contextSerial;
				this.drill_refreshMessage( bean._drill_contextList );
			}
			
			// > 切换样式时，刷新窗口
			if( this._drill_curStyleId != bean._drill_styleId ){
				this._drill_curStyleId = bean._drill_styleId;
				this.drill_refreshStyle( this._drill_curStyleId );
			}
			
			// > 鼠标激活方式 决定最终显示情况
			if( this.drill_isMouseControl(bean) ){
				this.visible = true;
			}else{
				this.visible = false;
			}
			return;
		}
	}
	
	this.visible = false;
}
//==============================
// * 内容 - 触发范围
//==============================
Drill_MPFE_Window.prototype.drill_isInFrame = function( bean ){
	if( bean['_drill_visible'] == false ){ return false; }
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( bean['_drill_mouseType'] == "触屏按下[持续]" ){
		_x = TouchInput.x;
		_y = TouchInput.y;
	}
	
	// > 【地图 - 活动地图镜头】落点位置
	//		（注意，这里是 鼠标落点 与 矩形范围的图层 偏移关系 ）
	if( Imported.Drill_LayerCamera ){
		if( this._drill_curScene == "Scene_Map" ){
			var convert_pos = $gameSystem._drill_LCa_controller.drill_LCa_getPos_OuterToChildren( _x, _y );
			_x = convert_pos.x;
			_y = convert_pos.y;					//（这是事件的层级，事件处于 下层、中层、上层）
		}
	}
	
	if( _x > bean['_drill_x'] + bean['_drill_frameW'] ){ return false; }
	if( _x < bean['_drill_x'] + 0 ){ return false; }
	if( _y > bean['_drill_y'] + bean['_drill_frameH'] ){ return false; }
	if( _y < bean['_drill_y'] + 0 ){ return false; }
	return true;
}
//==============================
// * 内容 - 鼠标激活方式
//==============================
Drill_MPFE_Window.prototype.drill_isMouseControl = function( bean ){
	if( bean['_drill_mouseType'] == "鼠标左键按下[持续]" ){
		if( TouchInput.drill_isLeftPressed() ){ return true; }else{ return false; }
	}else if( bean['_drill_mouseType'] == "鼠标滚轮按下[持续]" ){
		if( TouchInput.drill_isMiddlePressed() ){ return true; }else{ return false; }
	}else if( bean['_drill_mouseType'] == "鼠标右键按下[持续]" ){
		if( TouchInput.drill_isRightPressed() ){ return true; }else{ return false; }
	}else if( bean['_drill_mouseType'] == "触屏按下[持续]" ){
		if( TouchInput.isPressed() ){ return true; }else{ return false; }
	}
	return true;
}
//==============================
// * 内容 - 刷新内容
//==============================
Drill_MPFE_Window.prototype.drill_refreshMessage = function( context_list ){
	if( context_list.length == 0 ){ return; }
	
	
	// > 窗口高宽 - 计算
	var options = {};
	options['autoLineheight'] = true;
	this.drill_COWA_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
	// > 窗口高宽 - 赋值
	var ww = 0;
	var hh = 0;
	for( var i=0; i < this.drill_COWA_widthList.length; i++ ){ if( ww < this.drill_COWA_widthList[i] ){ ww = this.drill_COWA_widthList[i]; } }
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){ hh += this.drill_COWA_heightList[i]; }
	ww += this.standardPadding() * 2;
	hh += this.standardPadding() * 2;
	ww += $gameSystem._drill_MPFE_ex_width || 0;		//（附加高宽）
	hh += $gameSystem._drill_MPFE_ex_height || 0;
	this._drill_width = ww;
	this._drill_height = hh;
	this.width = this._drill_width;
	this.height = this._drill_height;
	
	
	// > 绘制内容
	this.drill_COWA_drawTextListEx( context_list, options );
}


//==============================
// * 窗口皮肤 - 初始化
//
//			说明：	此函数只在初始化时执行一次，不要执行多了。
//==============================
Drill_MPFE_Window.prototype.drill_initSkin = function() {
	
	// > 皮肤资源
	this._drill_skin_defaultSkin = this.windowskin;
	
	// > 重设数据
	this.drill_resetSkinData( this._drill_curData );
}
//==============================
// * 窗口皮肤 - 重设数据
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_MPFE_Window.prototype.drill_resetSkinData = function( data ){
	
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
		this._drill_skin_pic_bitmap = ImageManager.loadSystem( data['window_pic_src'] );
		this._drill_skin_pic_x = data['window_pic_x'];
		this._drill_skin_pic_y = data['window_pic_y'];
	}else{
		this._drill_skin_pic_bitmap = ImageManager.loadEmptyBitmap();
	}
	
	if( data['window_type'] == "自定义窗口皮肤" && data['window_sys_src'] != "" ){
		this._drill_skin_sys_bitmap = ImageManager.loadSystem( data['window_sys_src'] );
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
Drill_MPFE_Window.prototype.drill_updateSkin = function() {
	
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
var _drill_MPFE_updateTone = Drill_MPFE_Window.prototype.updateTone;
Drill_MPFE_Window.prototype.updateTone = function() {
	if( this._drill_skin_tone_lock == true ){
		this.setTone( this._drill_skin_tone_r, this._drill_skin_tone_g, this._drill_skin_tone_b );
		return;
	}
	_drill_MPFE_updateTone.call( this );
}
	
	
	
//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MiniPlateForEvent = false;
		alert(
			"【Drill_MiniPlateForEvent.js 鼠标 - 事件说明窗口】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心"+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}


