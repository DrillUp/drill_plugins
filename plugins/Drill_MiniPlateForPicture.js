//=============================================================================
// Drill_MiniPlateForPicture.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        鼠标 - 图片说明窗口
 * @author Drill_up
 * 
 * @Drill_LE_param "图片内容-%d"
 * @Drill_LE_parentKey "---图片内容组%d至%d---"
 * @Drill_LE_var "DrillUp.g_MPFP_list_length"
 * 
 *
 * @help  
 * =============================================================================
 * +++ Drill_MiniPlateForPicture +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得鼠标靠近图片时，可以显示说明窗口。
 * ★★必须放在 可拖拽的图片 的插件后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用，基于插件才能运行。该插件也可以对其它插件扩展。
 * 基于：
 *   - Drill_CoreOfInput             系统 - 输入设备核心
 *   - Drill_CoreOfWindowAuxiliary   系统 - 窗口辅助核心
 * 可扩展：
 *   - Drill_CoreOfString            系统 - 字符串核心
 *     可以在说明窗口中，绑定并显示自定义的字符串。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片。
 *   单独对鼠标有效，支持触屏按住。
 * 2.具体内容可以去看看 "14.鼠标 > 关于鼠标悬浮窗口.docx"。
 * 细节：
 *   (1.注意，图片内容和图片并不是对应的。
 *      你需要使用插件指令手动绑定到相关图片。
 * 触发：
 *   (1.你需要先将内容绑定到图片上，绑定后，鼠标接近图片才会显示内容。
 *   (2.接触显示说明窗口的触发范围与图片资源大小相关。
 * 设计：
 *   (1.图片说明窗口的触发范围只认图片资源大小，你可以使用单纯的空白透明
 *      图片，来实现单纯的鼠标接近某范围，就能显示说明窗口的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要设置指定图片并绑定说明：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>图片说明窗口 : 图片[1] : 绑定图片内容[1]
 * 插件指令：>图片说明窗口 : 图片[1] : 绑定字符串[1]
 * 插件指令：>图片说明窗口 : 图片[1] : 解除绑定
 * 
 * 1.图片最多只能绑定一个内容或字符串，多次绑定时会覆盖上一个。
 * 2."绑定字符串"表示 字符串核心 中配置的字符串id，
 *   如果你未添加该插件，则没有效果。
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
 * 系统窗口与rmmv默认的window.png图片一样，可设置为不同的皮肤。
 * 图片布局不能根据窗口内容自适应，你需要合理控制的设置的说明文字。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口属性
 * 你可以修改设置说明窗口的部分属性：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>图片说明窗口 : 修改附加宽高 : 宽度[100]
 * 插件指令：>图片说明窗口 : 修改附加宽高 : 高度[100]
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
 * 时间复杂度： o(n^2) + o(图像处理) 每帧
 * 测试方法：   以正常流程进行游戏，记录鼠标靠近区域显示窗口的消耗。
 * 测试结果：   地图界面中，平均消耗为：【11.24ms】
 *              战斗界面中，平均消耗为：【13.17ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于该插件在界面中全程只有一个窗口在工作，所以消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了多张图片重叠在一起时，不同图片切换内容的结构。
 * 
 * 
 * 
 * @param ---窗口---
 * @default 
 *
 * @param 激活方式
 * @parent ---窗口---
 * @type select
 * @option 鼠标接近
 * @value 鼠标接近
 * @option 鼠标左键按下[持续]
 * @value 鼠标左键按下[持续]
 * @option 鼠标滚轮按下[持续]
 * @value 鼠标滚轮按下[持续]
 * @option 鼠标右键按下[持续]
 * @value 鼠标右键按下[持续]
 * @option 触屏按下[持续]
 * @value 触屏按下[持续]
 * @desc 鼠标接近指定的图片内容图标时，面板会被激活。你也可以设置按键持续按下才显示。
 * @default 鼠标接近
 *
 * @param 偏移-窗口 X
 * @parent ---窗口---
 * @desc 以鼠标/触屏的点位置为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 偏移-窗口 Y
 * @parent ---窗口---
 * @desc 以鼠标/触屏的点位置为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 * 
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
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-自定义背景图片 Y
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
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
 * @desc true - 锁定，false - 关闭，将面板锁定在一个固定的地方，而不是跟随鼠标位置走。
 * @default false
 *
 * @param 平移-锁定位置 X
 * @parent 是否锁定窗口位置
 * @desc 将面板锁定在一个固定的地方，而不是跟随鼠标位置走。x轴方向平移，单位像素，0为贴在最左边。
 * @default 0
 *
 * @param 平移-锁定位置 Y
 * @parent 是否锁定窗口位置
 * @desc 将面板锁定在一个固定的地方，而不是跟随鼠标位置走。y轴方向平移，单位像素，0为贴在最上面。
 * @default 0
 *
 * @param 窗口行间距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容之间的行间距。（rmmv默认标准：36）
 * @default 10
 *
 * @param 窗口内边距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容与窗口外框的内边距。（rmmv默认标准：18）
 * @default 10
 *
 * @param 窗口字体大小
 * @parent ---窗口---
 * @type number
 * @min 1
 * @desc 窗口的字体大小。注意图标无法根据字体大小变化。（rmmv默认标准：28）
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
 * @param 战斗层级
 * @parent ---窗口---
 * @type select
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
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口在同一个战斗层级时，先后排序的位置，0表示最后面。
 * @default 90
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
 * @desc 窗口所在的战斗层级位置，你需要以此来考虑分配ui遮挡关系。
 * @default 图片层
 *
 * @param 地图图片层级
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口在同一个地图层级时，先后排序的位置，0表示最后面。
 * @default 90
 *
 *
 *
 * @param ---图片内容组 1至20---
 * @default 
 *
 * @param 图片内容-1
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 * 
 * @param 图片内容-2
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 * 
 * @param 图片内容-3
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 * 
 * @param 图片内容-4
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-5
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-6
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-7
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-8
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-9
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-10
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-11
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-12
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-13
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-14
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-15
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-16
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-17
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-18
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-19
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-20
 * @parent ---图片内容组 1至20---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 *
 * @param ---图片内容组21至40---
 * @default 
 *
 * @param 图片内容-21
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-22
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-23
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-24
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-25
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-26
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-27
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-28
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-29
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-30
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-31
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-32
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-33
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-34
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-35
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-36
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-37
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-38
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-39
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-40
 * @parent ---图片内容组21至40---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param ---图片内容组41至60---
 * @default 
 *
 * @param 图片内容-41
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-42
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-43
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-44
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-45
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-46
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-47
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-48
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-49
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-50
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-51
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-52
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-53
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-54
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-55
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-56
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-57
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-58
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-59
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-60
 * @parent ---图片内容组41至60---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param ---图片内容组61至80---
 * @default 
 *
 * @param 图片内容-61
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-62
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-63
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-64
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-65
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-66
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-67
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-68
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-69
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-70
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-71
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-72
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-73
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-74
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-75
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-76
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-77
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-78
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-79
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 *
 * @param 图片内容-80
 * @parent ---图片内容组61至80---
 * @type struct<MiniPlateForPicture>
 * @desc 添加图片内容的内容，当前配置的编号，对应数据库中的图片内容id。
 * @default 
 * 
 */
/*~struct~MiniPlateForPicture:
 *  
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的图片内容--
 * 
 * @param 内容文本
 * @type note
 * @desc 鼠标接近图片时，显示的文本内容。
 * @default "一段说明文字"
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		MPFP (Mini_Plate_For_State)
//		临时全局变量	DrillUp.g_MPFP_xxx
//		临时局部变量	this._drill_MPFP_xxx
//		存储数据变量	$gameSystem._drill_MPFP_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2) + o(图像处理) 每帧
//		性能测试因素	对话管理层
//		性能测试消耗	11.24ms（drill_updatePosition函数）
//		最坏情况		暂无
//
//插件记录：
//		★大体框架与功能如下：
//			事件说明窗口：
//				->说明面板
//					->类定义
//					->内容
//						> 内容根据id列表自动组合
//						> 详细说明
//						> 模糊说明
//						> 强化buff
//						> 弱化buff
//						> 没有内容时
//					->判定项
//						> 鼠标移走则重刷
//				->鼠标事件
//		
//		
//		★必要注意事项：
//			1.鼠标悬浮窗口目前已经固定了一套框架，你可以找到其他的 MiniPlateXXX 插件，看看私有类的定义。
//			  通过 drill_pushChecks 判定项 帧刷新，来控制面板显示的内容。
//
//		★其它说明细节：
//			1.
//
//		★存在的问题：
//			暂无
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MiniPlateForPicture = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MiniPlateForPicture');
	
	
	/*----------------窗口---------------*/
	DrillUp.g_MPFP_mouse_type = String(DrillUp.parameters["激活方式"] || "鼠标接近");
	DrillUp.g_MPFP_x = Number(DrillUp.parameters["偏移-窗口 X"] || 0 );
	DrillUp.g_MPFP_y = Number(DrillUp.parameters["偏移-窗口 Y"] || 0 );
	DrillUp.g_MPFP_layout_type = String(DrillUp.parameters["布局模式"] || "黑底背景");
	DrillUp.g_MPFP_layout_opacity = Number(DrillUp.parameters["布局透明度"] || 255);
	DrillUp.g_MPFP_layout_sys_src = String(DrillUp.parameters["资源-自定义窗口皮肤"] || "");
	DrillUp.g_MPFP_layout_pic_src = String(DrillUp.parameters["资源-自定义背景图片"] || "");
	DrillUp.g_MPFP_layout_pic_x = Number(DrillUp.parameters["平移-自定义背景图片 X"] || 0 );
	DrillUp.g_MPFP_layout_pic_y = Number(DrillUp.parameters["平移-自定义背景图片 Y"] || 0 );
	DrillUp.g_MPFP_anchor = String(DrillUp.parameters["窗口中心锚点"] || "左上角" );
	DrillUp.g_MPFP_lock_enable = String(DrillUp.parameters["是否锁定窗口位置"] || "false") === "true";
	DrillUp.g_MPFP_lock_x = Number(DrillUp.parameters["平移-锁定位置 X"] || 0);
	DrillUp.g_MPFP_lock_y = Number(DrillUp.parameters["平移-锁定位置 Y"] || 0);
	DrillUp.g_MPFP_lineheight = Number(DrillUp.parameters["窗口行间距"] || 10);
	DrillUp.g_MPFP_padding = Number(DrillUp.parameters["窗口内边距"] || 18);
	DrillUp.g_MPFP_fontsize = Number(DrillUp.parameters["窗口字体大小"] || 22);
	DrillUp.g_MPFP_ex_width = Number(DrillUp.parameters["窗口附加宽度"] || 0);
	DrillUp.g_MPFP_ex_height = Number(DrillUp.parameters["窗口附加高度"] || 0);
	DrillUp.g_MPFP_battle_layer = String(DrillUp.parameters["战斗层级"] || "图片层");
	DrillUp.g_MPFP_battle_zIndex = Number(DrillUp.parameters["战斗图片层级"] || 0);
	DrillUp.g_MPFP_map_layer = String(DrillUp.parameters["地图层级"] || "图片层");
	DrillUp.g_MPFP_map_zIndex = Number(DrillUp.parameters["地图图片层级"] || 0);
	
	
	//==============================
	// * 变量获取 - 图片内容
	//				（~struct~MiniPlateForPicture）
	//==============================
	DrillUp.drill_MPFP_initState = function( dataFrom ) {
		var data = {};
		if( dataFrom["内容文本"] != undefined && 
			dataFrom["内容文本"] != "" ){
			data['context'] = JSON.parse( dataFrom["内容文本"] );
		}else{
			data['context'] = "";
		}
		
		return data;
	}
	
	/*----------------图片内容---------------*/
	DrillUp.g_MPFP_list_length = 80;
	DrillUp.g_MPFP_list = [];
	for( var i = 0; i < DrillUp.g_MPFP_list_length ; i++ ){
		if( DrillUp.parameters["图片内容-" + String(i+1) ] != undefined &&
			DrillUp.parameters["图片内容-" + String(i+1) ] != "" ){
			var temp = JSON.parse( DrillUp.parameters["图片内容-" + String(i+1)] );
			DrillUp.g_MPFP_list[i] = DrillUp.drill_MPFP_initState( temp );
		}else{
			DrillUp.g_MPFP_list[i] = DrillUp.drill_MPFP_initState( {} );
		}
	};
	


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfWindowAuxiliary ){


//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_MPFP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MPFP_pluginCommand.call(this, command, args);
	if( command === ">图片说明窗口" ){
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
					
			if( type.indexOf("图片[") != -1 ){
				var pic_id = type.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
					
				if( temp1.indexOf("绑定图片内容[") != -1 ){
					temp1 = temp1.replace("绑定图片内容[","");
					temp1 = temp1.replace("]","");
					if( $gameScreen.drill_MPFP_isPictureExist( pic_id ) == false ){ return; }
					$gameScreen.picture( pic_id )._drill_MPFP_contextId = Number(temp1) -1;
					$gameScreen.picture( pic_id )._drill_MPFP_strId = -1;
				}
				if( temp1.indexOf("绑定字符串[") != -1 ){
					temp1 = temp1.replace("绑定字符串[","");
					temp1 = temp1.replace("]","");
					if( $gameScreen.drill_MPFP_isPictureExist( pic_id ) == false ){ return; }
					$gameScreen.picture( pic_id )._drill_MPFP_contextId = -1;
					$gameScreen.picture( pic_id )._drill_MPFP_strId = Number(temp1) -1;
				}
				if( temp1 == "解除绑定" ){
					if( $gameScreen.drill_MPFP_isPictureExist( pic_id ) == false ){ return; }
					$gameScreen.picture( pic_id )._drill_MPFP_contextId = -1;
					$gameScreen.picture( pic_id )._drill_MPFP_strId = -1;
				}
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改附加宽高" ){ 
				
				if( temp1.indexOf("宽度[") != -1 ){
					temp1 = temp1.replace("宽度[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFP_ex_width = Number(temp1);
				}
				if( temp1.indexOf("高度[") != -1 ){
					temp1 = temp1.replace("高度[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFP_ex_height = Number(temp1);
				}
				
			}
		}
	}
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_MPFP_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_MiniPlateForPicture.js 鼠标 - 图片说明窗口】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};

//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_MPFP_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MPFP_sys_initialize.call(this);
	
	this._drill_MPFP_ex_width = DrillUp.g_MPFP_ex_width;		//（附加高宽）
	this._drill_MPFP_ex_height = DrillUp.g_MPFP_ex_height; 
};	


//=============================================================================
// ** 图片内容图标绑定
//=============================================================================
//==============================
// * 工具 - 父类溯源
//
//			说明：	输入对象、父类定义，返回父类对象。没有则返回空。
//==============================
DrillUp.drill_MPFP_getAncestor = function( sprite, ancestor_class ){
	for( var i=0; i < 8; i++){
		if( sprite.parent == undefined ){
			break;
		}
		var sprite = sprite.parent;
		if( sprite instanceof ancestor_class ){
			return sprite;
		}
	}
	return null;
}

//==============================
// * 图片 - 初始化
//==============================
var _drill_MPFP_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_drill_MPFP_initialize.call(this);
	this._drill_MPFP_contextId = -1;	//内容id
	this._drill_MPFP_strId = -1;		//字符串id
}
//==============================
// * 绑定 - 图片
//==============================
var _drill_MPFP_s_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_drill_MPFP_s_update.call(this);
	
	if( this.picture() == undefined ){ return; }
	if( this.bitmap == undefined ){ return; }
	if( this.bitmap.isReady() == false ){ return; }
	
	// > 父类溯源
	var p1 = DrillUp.drill_MPFP_getAncestor( this, Scene_Battle );
	var p2 = DrillUp.drill_MPFP_getAncestor( this, Scene_Map );
	
	// > 战斗界面
	if( p1 != null ){
		var _drill_plate = p1._drill_MPFP_window;
		var check = {
			'w': this.width,
			'h': this.height,
			'str_id': this.picture()._drill_MPFP_strId,
			'context_id': this.picture()._drill_MPFP_contextId,
		}
		var xx = this.x - this.anchor.x * this.width;
		var yy = this.y - this.anchor.y * this.height;
		if( Imported.Drill_BattleCamera ){		//战斗镜头修正
			xx += $gameTemp._drill_cam_pos[0];
			yy += $gameTemp._drill_cam_pos[1];
		}
		check['x'] = xx;
		check['y'] = yy;
		
		_drill_plate.pushChecks(check);
		return;
	}
	
	// > 地图界面
	if( p2 != null ){
		var _drill_plate = p2._drill_MPFP_window;
		var check = {
			'w': this.width,
			'h': this.height,
			'str_id': this.picture()._drill_MPFP_strId,
			'context_id': this.picture()._drill_MPFP_contextId,
		}
		if( Imported.Drill_LayerCamera ){		//地图镜头修正（缩放）
			check['w'] *= $gameSystem.drill_LCa_curScaleX();
			check['h'] *= $gameSystem.drill_LCa_curScaleY();
		}
		var xx = this.x - this.anchor.x * check['w'];
		var yy = this.y - this.anchor.y * check['h'];
		if( Imported.Drill_LayerCamera ){		//地图镜头修正（位置）
			xx = $gameSystem.drill_LCa_cameraToMapX( xx );
			yy = $gameSystem.drill_LCa_cameraToMapY( yy );
		}
		check['x'] = xx;
		check['y'] = yy;
		//if( check['str_id'] != -1 ){
		//	alert( JSON.stringify(check) );
		//}
		
		_drill_plate.pushChecks(check);
		return;
	}
	
};



//=============================================================================
// ** 战斗层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_MPFP_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_MPFP_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// ** 图片层
//==============================
var _drill_MPFP_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_MPFP_battle_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// ** 最顶层
//==============================
var _drill_MPFP_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MPFP_battle_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Battle.prototype.drill_MPFP_sortByZIndex = function() {
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 创建面板
//==============================
var _drill_MPFP_battleScene_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MPFP_battleScene_createAllWindows.call(this);
	
	if(!this._drill_MPFP_window ){		//（战斗界面 建立一个窗口）
		this._drill_MPFP_window = new Drill_MPFP_Window();
		
		this._drill_MPFP_window.zIndex = DrillUp.g_MPFP_battle_zIndex;
		if( DrillUp.g_MPFP_battle_layer == '上层' ){
			this._spriteset._drill_battleUpArea.addChild( this._drill_MPFP_window );
		}
		if( DrillUp.g_MPFP_battle_layer == '图片层' ){
			this._spriteset._drill_battlePicArea.addChild( this._drill_MPFP_window );
		}
		if( DrillUp.g_MPFP_battle_layer == '最顶层' ){
			this._drill_SenceTopArea.addChild( this._drill_MPFP_window );
		}
		this.drill_MPFP_sortByZIndex();
	}
};


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_MPFP_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_MPFP_layer_createDestination.call(this);	//rmmv鼠标目的地 < 上层 < rmmv天气
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 图片层
//==============================
var _drill_MPFP_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_MPFP_layer_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// ** 最顶层
//==============================
var _drill_MPFP_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MPFP_layer_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Map.prototype.drill_MPFP_sortByZIndex = function() {
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 创建面板
//==============================
var _drill_MPFP_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MPFP_map_createAllWindows.call(this);
	
	if(!this._drill_MPFP_window ){		//（地图界面 建立一个窗口）
		this._drill_MPFP_window = new Drill_MPFP_Window();
		
		this._drill_MPFP_window.zIndex = DrillUp.g_MPFP_map_zIndex;
		if( DrillUp.g_MPFP_map_layer == '上层' ){
			this._spriteset._drill_mapUpArea.addChild( this._drill_MPFP_window );
		}
		if( DrillUp.g_MPFP_map_layer == '图片层' ){
			this._spriteset._drill_mapPicArea.addChild( this._drill_MPFP_window );
		}
		if( DrillUp.g_MPFP_map_layer == '最顶层' ){
			this._drill_SenceTopArea.addChild( this._drill_MPFP_window );
		}
		this.drill_MPFP_sortByZIndex();
	}
};

	
//=============================================================================
// ** 说明面板【Drill_MPFP_Window】
//			
//			索引：	无
//			来源：	继承于Window_Base
//			实例：	Scene_Battle下的 _drill_MPFP_window 成员
//			应用：	暂无 
//			
//			作用域：	战斗界面
//			主功能：	定义一个面板，能随时改变内容和高宽，用于描述图片内容信息。
//			子功能：
//						->贴图内容
//							->文本层
//							->背景
//								> 默认窗口皮肤
//								> 自定义窗口皮肤
//								> 自定义背景图片
//								> 黑底背景
//						->位置
//							> 锁定位置
//							> 跟随鼠标位置
//						->显现时机
//							->激活
//							->显示条件
//							->刷新内容
//				
//			说明：	> 整个场景只有一个该窗口。
//					> 其它相似的可变窗口插件： Drill_MiniPlateForEvent、Drill_X_SceneShopDiscount。
//=============================================================================
//==============================
// * 说明面板 - 定义
//==============================
function Drill_MPFP_Window() {
    this.initialize.apply(this, arguments);
};
Drill_MPFP_Window.prototype = Object.create(Window_Base.prototype);
Drill_MPFP_Window.prototype.constructor = Drill_MPFP_Window;
//==============================
// * 说明面板 - 初始化
//==============================
Drill_MPFP_Window.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	this._drill_data = {};
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 说明面板 - 帧刷新
//==============================
Drill_MPFP_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	this.drill_updateChecks();			//帧刷新 - 判断激活
	this.drill_updatePosition();		//帧刷新 - 刷新位置
}
//==============================
// * 说明面板 - 私有覆写函数
//==============================
Drill_MPFP_Window.prototype.lineHeight = function(){ return DrillUp.g_MPFP_lineheight; };		//窗口行间距
Drill_MPFP_Window.prototype.standardPadding = function(){ return DrillUp.g_MPFP_padding; };		//窗口内边距
Drill_MPFP_Window.prototype.standardFontSize = function(){ return DrillUp.g_MPFP_fontsize; };	//窗口字体大小
//==============================
// * 初始化 - 数据
//==============================
Drill_MPFP_Window.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 皮肤设置
	data['window_type'] = DrillUp.g_MPFP_layout_type;
	data['window_opacity'] = DrillUp.g_MPFP_layout_opacity;
	data['window_sys_bitmap'] = ImageManager.loadSystem( DrillUp.g_MPFP_layout_sys_src );
	data['window_pic_bitmap'] = ImageManager.loadSystem( DrillUp.g_MPFP_layout_pic_src );
	data['window_pic_x'] = DrillUp.g_MPFP_layout_pic_x;
	data['window_pic_y'] = DrillUp.g_MPFP_layout_pic_y;
	
	// > 私有变量初始化
	this._drill_width = 0;
	this._drill_height = 0;
	this._drill_visible = false;
	this._drill_cur_context_id = -1;
	this._drill_cur_str_id = -1;
	
	this._drill_check_tank = [];
	
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( DrillUp.g_MPFP_anchor == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( DrillUp.g_MPFP_anchor == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	if( DrillUp.g_MPFP_anchor == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( DrillUp.g_MPFP_anchor == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
};
//==============================
// * 初始化 - 对象
//==============================
Drill_MPFP_Window.prototype.drill_initSprite = function() {
	this.drill_createBackground();		//创建背景
	this.drill_createText();			//创建文本层
	this.drill_sortBottomByZIndex();	//底层层级排序
};
//==============================
// * 创建 - 背景
//==============================
Drill_MPFP_Window.prototype.drill_createBackground = function() {
	var data = this._drill_data;
	this._drill_background = new Sprite();
	
	// > 图层顺序处理
	this._drill_background.zIndex = 1;
	this._windowBackSprite.zIndex = 2;
	this._windowFrameSprite.zIndex = 3;
	
	// > 信息框布局
	if( data['window_type'] == "默认窗口皮肤" || data['window_type'] == "默认窗口布局" ){
		
		// > 透明度
		this.opacity = data['window_opacity'];
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = data['window_opacity'];
		this._windowFrameSprite.opacity = data['window_opacity'];
		
		
	}else if( data['window_type'] == "自定义窗口皮肤" || data['window_type'] == "系统窗口布局" ){
		
		// > 皮肤设置
		this.windowskin = data['window_sys_bitmap'];
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = data['window_opacity'];
		this._windowFrameSprite.opacity = data['window_opacity'];
		
		
	}else if( data['window_type'] == "自定义背景图片" || data['window_type'] == "图片窗口布局" ){
		
		// > bimap建立
		this._drill_background.bitmap = data['window_pic_bitmap'];
		this._drill_background.x = data['window_pic_x'];
		this._drill_background.y = data['window_pic_y'];
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
		
		
	}else if( data['window_type'] == "黑底背景" || data['window_type'] == "黑底布局" ){
		
		// > bimap建立
		//（需延迟设置，见后面）
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
	}
	
	this._windowSpriteContainer.addChild(this._drill_background);	//（ _windowSpriteContainer 为窗口的最底层贴图）
}
//==============================
// * 创建 - 文本层
//==============================
Drill_MPFP_Window.prototype.drill_createText = function() {
	this.createContents();
    this.contents.clear();
	
	// 绘制内容
	this.drawTextEx( this._drill_text_default, 0, 0 );
}
//==============================
// ** 底层层级排序
//==============================
Drill_MPFP_Window.prototype.drill_sortBottomByZIndex = function() {
   this._windowSpriteContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};


//==============================
// * 帧刷新 - 刷新位置
//==============================
Drill_MPFP_Window.prototype.drill_updatePosition = function() {
	
	// > 锁定位置
	if( DrillUp.g_MPFP_lock_enable == true ){				
		this.x = DrillUp.g_MPFP_lock_x;
		this.y = DrillUp.g_MPFP_lock_y;
		return;
	}
	
	// > 跟随鼠标位置
	var cal_x = _drill_mouse_x + DrillUp.g_MPFP_x;
	var cal_y = _drill_mouse_y + DrillUp.g_MPFP_y;
	cal_x -= this._drill_width * this._drill_anchor_x;
	cal_y -= this._drill_height * this._drill_anchor_y;
	if( cal_x < 0 ){	//（横向贴边控制）
		cal_x = 0;
	}
	if( cal_x + this._drill_width > Graphics.boxWidth ){
		cal_x = Graphics.boxWidth - this._drill_width;
	}
	if( cal_y < 0 ){	//（纵向贴边控制）
		cal_y = 0;
	}
	if( cal_y + this._drill_height > Graphics.boxHeight ){
		cal_y = Graphics.boxHeight - this._drill_height;
	}
	this.x = cal_x;
	this.y = cal_y;
}
//==============================
// * 接口 - 添加图片内容图标 判断项
//
//			参数：	c['x']: 触发范围坐标X
//					c['y']: 触发范围坐标Y
//					c['w']: 触发范围宽
//					c['h']: 触发范围高
//					c['str_id']: 对应字符串的id值
//					c['context_id']: 对应内容的id值
//==============================
Drill_MPFP_Window.prototype.pushChecks = function( c ){
	if( this._drill_check_tank.length < 1000){	//防止卡顿造成的过度积压
		this._drill_check_tank.push(c);
	}
}
//==============================
// * 帧刷新 - 判断激活
//==============================
Drill_MPFP_Window.prototype.drill_updateChecks = function() {
	if( !this._drill_check_tank ){ this.visible = false; return; }
	
	// > 捕获 判断项
	var is_visible = false;
	var str_id = -1;
	var context_id = -1;
	for(var i=this._drill_check_tank.length-1; i>=0; i--){	//（图片是id越大判定越优先，所以取反）
		var check = this._drill_check_tank[i];
		check['mouseType'] = DrillUp.g_MPFP_mouse_type;
		
		if ( this.drill_checkCondition(check) ) { 
			is_visible = true; 
			str_id = Number( check['str_id'] ); 
			context_id = Number( check['context_id'] ); 
			break; 
		}
	}
	this._drill_check_tank = [];
	
	// > 关闭显示
	if( context_id == -1 && str_id == -1 ){
		this._drill_visible = false;
		this.visible = false;
		return;
	}
	
	// > 根据 判断项 显示/隐藏
	if( this._drill_visible == true ){
		if( is_visible == true ){
			// > 显示中，不操作
			
		}else{
			// > 显示中断时
			this._drill_visible = false;
			this._drill_width = 0;
			this._drill_height = 0;
		}
	}else{
		if( is_visible == true ){
			// > 激活显示时
			this.drill_refreshMessage( context_id, str_id );
			this._drill_visible = true;
		}else{
			// > 隐藏中，不操作
		}
	}
	
	//（宽高不要在update中轻易修改）
	this.visible = this._drill_visible;
	
	// > id变化时，自动刷新内容
	if( this._drill_cur_context_id != context_id ||
		this._drill_cur_str_id != str_id ){
		this._drill_cur_context_id = context_id;
		this._drill_cur_str_id = str_id;
		this.drill_refreshMessage( context_id, str_id );
	}
}
//==============================
// * 激活 - 显示条件
//==============================
Drill_MPFP_Window.prototype.drill_checkCondition = function( check ){
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( check['mouseType'] == "触屏按下[持续]" ){
		_x = TouchInput.x;
		_y = TouchInput.y;
	}
	if( _x > check['x'] + check['w'] ){ return false;}
	if( _x < check['x'] + 0 ){ return false;}
	if( _y > check['y'] + check['h'] ){ return false;}
	if( _y < check['y'] + 0 ){ return false;}
	if( check['mouseType'] == "鼠标左键按下[持续]" ){
		if( TouchInput.drill_isLeftPressed() ){ return true; }else{ return false; }
	}else if( check['mouseType'] == "鼠标滚轮按下[持续]" ){
		if( TouchInput.drill_isMiddlePressed() ){ return true; }else{ return false; }
	}else if( check['mouseType'] == "鼠标右键按下[持续]" ){
		if( TouchInput.drill_isRightPressed() ){ return true; }else{ return false; }
	}else if( check['mouseType'] == "触屏按下[持续]" ){
		if( TouchInput.isPressed() ){ return true; }else{ return false; }
	}
	return true;
}

//==============================
// * 激活 - 刷新内容
//==============================
Drill_MPFP_Window.prototype.drill_refreshMessage = function( context_id, str_id ){
	var data = this._drill_data;
	
	// > 内容获取
	var context_list = [];
	if( context_id != -1 ){
		context_list = DrillUp.g_MPFP_list[ context_id ]['context'].split("\n");
	}
	if( str_id != -1 && Imported.Drill_CoreOfString ){
		context_list = $gameStrings.value( str_id+1 ).split("\n");
	}
	if( context_list.length == 0){		//没有内容时
		return;
	}
	
	
	// > 窗口高宽 - 计算
	var options = {};
	options['convertEnabled'] = false;
	options['autoLineheight'] = true;
	options['lineheight'] = data['window_lineheight'];
	this.drill_COWA_DTLE_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
	// > 窗口高宽 - 赋值
	var ww = 0;
	var hh = 0;
	for( var i=0; i < this.drill_COWA_widthList.length; i++ ){ if( ww < this.drill_COWA_widthList[i] ){ ww = this.drill_COWA_widthList[i]; } }
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){ hh += this.drill_COWA_heightList[i]; }
	ww += this.standardPadding() * 2;
	hh += this.standardPadding() * 2;
	ww += $gameSystem._drill_MPFP_ex_width || 0;		//（附加高宽）
	hh += $gameSystem._drill_MPFP_ex_height || 0;
	this._drill_width = ww;
	this._drill_height = hh;
	this.width = this._drill_width;
	this.height = this._drill_height;
	
	
	// > 绘制内容
	this.drill_COWA_drawTextListEx( context_list, options );
	
	
	if( data['window_type'] == "黑底背景" ){
		this._drill_background_BlackBitmap = new Bitmap(this._drill_width, this._drill_height);
		this._drill_background_BlackBitmap.fillRect(0, 0 , this._drill_width, this._drill_height, "#000000");	//（背景黑框）
		this._drill_background.bitmap = this._drill_background_BlackBitmap;
	}
	
}
	
	
//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MiniPlateForPicture = false;
		alert(
			"【Drill_MiniPlateForPicture.js 鼠标 - 图片内容和buff说明窗口】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心"+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}

