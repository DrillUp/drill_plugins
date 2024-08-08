//=============================================================================
// Drill_MiniPlateForPicture.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        鼠标 - 图片说明窗口
 * @author Drill_up
 * 
 * @Drill_LE_param "皮肤样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MPFP_style_list_length"
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
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。该插件也可以对其它插件扩展。
 * 基于：
 *   - Drill_CoreOfInput             系统-输入设备核心
 *   - Drill_CoreOfWindowAuxiliary   系统-窗口辅助核心
 * 可被扩展：
 *   - Drill_CoreOfString            系统-字符串核心
 *     可以在说明窗口中，绑定并显示自定义的字符串。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片。
 * 2.具体内容可以去看看 "14.鼠标 > 关于鼠标悬浮窗口.docx"。
 *   插件单独对鼠标有效，支持触屏按住。
 * 细节：
 *   (1.注意，说明内容和图片并不是一开始就对应的。
 *      你需要使用插件指令手动将 说明内容 绑定到图片。
 *   (2.你可以设置图片内容中固定使用某个窗口皮肤样式，
 *      也可以统一用默认的，然后用插件指令统一修改默认皮肤样式。
 * 鼠标触发：
 *   (1.你需要先将内容绑定到图片上，绑定后，鼠标接近图片才会显示内容。
 *   (2.接触显示说明窗口的触发范围与图片资源大小相关。
 * 设计：
 *   (1.图片说明窗口的触发范围只认图片资源大小，如果图片是空的，则无法
 *      显示内容。你可以使用单纯的空白透明的图片资源，来实现单纯的鼠标
 *      接近某范围，就能显示说明窗口的功能。
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
 * 你需要设置指定图片并绑定说明：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>图片说明窗口 : 图片[1] : 绑定图片内容[1]
 * 插件指令：>图片说明窗口 : 图片[1] : 解除绑定
 * 
 * 插件指令：>图片说明窗口 : 图片[1] : 修改绑定字符串[1]
 * 插件指令：>图片说明窗口 : 图片[1] : 锁定皮肤样式[1]
 * 插件指令：>图片说明窗口 : 图片[1] : 解除锁定皮肤样式
 * 
 * 1.图片最多只能绑定一个内容或字符串，多次绑定时会覆盖上一个。
 * 2."修改绑定字符串"表示 字符串核心 中配置的字符串id，
 *   如果你未添加该插件，则没有效果。
 * 3."锁定皮肤样式"表示 该图片的 图片说明窗口 使用固定的皮肤样式。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口属性
 * 你可以修改设置说明窗口的部分属性：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>图片说明窗口 : 修改默认皮肤样式 : 样式[1]
 * 插件指令：>图片说明窗口 : 修改默认皮肤样式 : 恢复默认
 * 插件指令：>图片说明窗口 : 修改附加宽高 : 宽度[100]
 * 插件指令：>图片说明窗口 : 修改附加宽高 : 高度[100]
 * 
 * 1.由于该窗口在场景中只有一个，因此相关属性修改后是永久有效的。
 * 2.你可以修改游戏全局中 默认的皮肤样式，
 *   能对所有使用了默认皮肤样式的图片说明窗口生效。
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
 * 测试方法：   以正常流程进行游戏，记录鼠标靠近区域显示窗口的消耗。
 * 测试结果：   地图界面中，平均消耗为：【11.24ms】
 *              战斗界面中，平均消耗为：【13.17ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件在界面中全程只有一个窗口在工作，每个鼠标激活节点也消耗不多，
 *   所以整体消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了多张图片重叠在一起时，不同图片切换内容的结构。
 * [v1.2]
 * 优化了与战斗活动镜头的变换关系。
 * [v1.3]
 * 优化了部分结构，减少了性能消耗。
 * 支持多个窗口皮肤样式的自定义。
 * [v1.4]
 * 优化了旧存档的识别与兼容。
 * [v1.5]
 * 优化了内部结构，改进了鼠标触发以及刷新范围。
 * [v1.6]
 * 修复了图片清除后，仍然存在绑定的bug。
 * [v1.7]
 * 修复了无法设置 左上角锚点 的bug。
 * [v1.8]
 * 添加了 图片的碰撞体 的支持。
 * [v1.9]
 * 修复了使用自定义窗口皮肤时文字变黑的bug。
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
 * @type struct<DrillMPFPStyle>
 * @desc 图片说明窗口的皮肤样式配置。
 * @default {"标签":"==默认皮肤==","---窗口---":"","激活方式":"鼠标接近","偏移-窗口 X":"0","偏移-窗口 Y":"0","布局模式":"默认窗口皮肤","布局透明度":"225","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","是否锁定窗口色调":"false","窗口色调-红":"0","窗口色调-绿":"0","窗口色调-蓝":"0","窗口中心锚点":"左上角","是否锁定窗口位置":"false","平移-锁定位置 X":"0","平移-锁定位置 Y":"0","战斗层级":"图片层","战斗图片层级":"90","地图层级":"图片层","地图图片层级":"90"}
 * 
 * @param 皮肤样式-2
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFPStyle>
 * @desc 图片说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-3
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFPStyle>
 * @desc 图片说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-4
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFPStyle>
 * @desc 图片说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-5
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFPStyle>
 * @desc 图片说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-6
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFPStyle>
 * @desc 图片说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-7
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFPStyle>
 * @desc 图片说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-8
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFPStyle>
 * @desc 图片说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-9
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFPStyle>
 * @desc 图片说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-10
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFPStyle>
 * @desc 图片说明窗口的皮肤样式配置。
 * @default 
 *
 *
 * @param ---图片内容组 1至20---
 * @default 
 *
 * @param 图片内容-1
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 * 
 * @param 图片内容-2
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 * 
 * @param 图片内容-3
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 * 
 * @param 图片内容-4
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-5
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-6
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-7
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-8
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-9
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-10
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-11
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-12
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-13
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-14
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-15
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-16
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-17
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-18
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-19
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-20
 * @parent ---图片内容组 1至20---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 *
 * @param ---图片内容组21至40---
 * @default 
 *
 * @param 图片内容-21
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-22
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-23
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-24
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-25
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-26
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-27
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-28
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-29
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-30
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-31
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-32
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-33
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-34
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-35
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-36
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-37
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-38
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-39
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-40
 * @parent ---图片内容组21至40---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param ---图片内容组41至60---
 * @default 
 *
 * @param 图片内容-41
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-42
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-43
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-44
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-45
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-46
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-47
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-48
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-49
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-50
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-51
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-52
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-53
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-54
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-55
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-56
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-57
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-58
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-59
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-60
 * @parent ---图片内容组41至60---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param ---图片内容组61至80---
 * @default 
 *
 * @param 图片内容-61
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-62
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-63
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-64
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-65
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-66
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-67
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-68
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-69
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-70
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-71
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-72
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-73
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-74
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-75
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-76
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-77
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-78
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-79
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 *
 * @param 图片内容-80
 * @parent ---图片内容组61至80---
 * @type struct<DrillMPFPBind>
 * @desc 添加的图片内容，游戏中需要通过插件指令手动绑定。
 * @default 
 * 
 */
/*~struct~DrillMPFPBind:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的图片内容==
 * 
 * @param 内容文本
 * @type note
 * @desc 鼠标接近图片时，显示的文本内容。
 * @default "一段说明文字"
 *
 * @param 绑定的模式
 * @type select
 * @option 默认皮肤样式
 * @value 默认皮肤样式
 * @option 锁定皮肤样式
 * @value 锁定皮肤样式
 * @desc 窗口追随鼠标时，中心锚点的位置。
 * @default 默认皮肤样式
 *
 * @param 锁定皮肤样式
 * @parent 绑定的模式
 * @type number
 * @min 1
 * @desc 绑定的模式为"锁定皮肤样式"时，对应的图片说明窗口皮肤样式。
 * @default 1
 * 
 */
/*~struct~DrillMPFPStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的皮肤样式==
 * 
 * @param ---常规---
 * @default 
 *
 * @param 激活方式
 * @parent ---常规---
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
 * @desc 鼠标接近指定的图片内容图标时，说明窗口会被激活。你也可以设置按键持续按下才显示。
 * @default 鼠标接近
 *
 * @param 偏移-窗口 X
 * @parent ---常规---
 * @desc 以鼠标/触屏的点位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-窗口 Y
 * @parent ---常规---
 * @desc 以鼠标/触屏的点位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
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
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		MPFP (Mini_Plate_For_Picture)
//		临时全局变量	DrillUp.g_MPFP_xxx
//		临时局部变量	this._drill_MPFP_xxx
//		存储数据变量	$gameSystem._drill_MPFP_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)+o(贴图处理) 每帧
//		★性能测试因素	悬浮窗口管理层
//		★性能测试消耗	11.24ms（drill_updatePosition函数）
//						15.3ms（drill_updateMessage）10.2ms（drill_updatePosition）
//		★最坏情况		暂无
//		★备注			无
//		
//		★优化记录
//			2022-10-22优化：
//				将原先的 check方法 ，改进为 Bean对象方法。
//				由于图片数量很少，测不出效果。可以去看 图片说明窗口 的优化效果。
//			2023-06-15优化：
//				这里将插件进行 小功能规范化，并且直接把 框架的帧刷新监听 去掉。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆预加载
//			->☆存储数据
//			->☆战斗层级
//				->添加贴图到层级【标准函数】
//				x->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				x->层级与镜头的位移【标准函数】
//			->☆地图层级
//				->添加贴图到层级【标准函数】
//				x->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				x->层级与镜头的位移【标准函数】
//			
//			->☆图片控制
//			->☆实体类容器
//				->地图界面的图片
//				->战斗界面的图片
//			->☆实体类赋值
//				->刷新位置
//				->刷新框架
//			->图片说明窗口 实体类【Drill_MPFP_Bean】
//				->被动赋值（Sprite_Picture）
//					> 可见
//					> 位置
//					> 贴图框架值
//					> 内容
//					> 设置皮肤样式
//			
//			->☆窗口控制
//				->创建说明窗口
//				->说明窗口层级变化
//			->图片说明窗口【Drill_MPFP_Window】
//				->A主体
//					->锁定皮肤样式
//				->B实体类交互
//				->C位置跟随
//				->D窗口皮肤
//				->E窗口内容
//				
//				
//		★家谱：
//			无
//		
//		★脚本文档：
//			14.鼠标 > 关于鼠标悬浮窗口（脚本）.docx
//		
//		★插件私有类：
//			* 图片说明窗口 实体类【Drill_MPFP_Bean】
//			* 图片说明窗口【Drill_MPFP_Window】
//		
//		★必要注意事项：
//			1.Bean实体类在 图片贴图 中被动赋值。
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
	DrillUp.g_MPFP_PluginTip_curName = "Drill_MiniPlateForPicture.js 鼠标-图片说明窗口";
	DrillUp.g_MPFP_PluginTip_baseList = [
		"Drill_CoreOfInput.js 系统-输入设备核心",
		"Drill_CoreOfWindowAuxiliary.js 系统-窗口辅助核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_MPFP_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_MPFP_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_MPFP_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_MPFP_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_MPFP_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_MPFP_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_MPFP_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_MPFP_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_MPFP_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MiniPlateForPicture = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MiniPlateForPicture');
	
	
	/*----------------杂项---------------*/
	DrillUp.g_MPFP_lineheight = Number(DrillUp.parameters["窗口行间距"] || 10);
	DrillUp.g_MPFP_padding = Number(DrillUp.parameters["窗口内边距"] || 18);
	DrillUp.g_MPFP_fontsize = Number(DrillUp.parameters["窗口字体大小"] || 22);
	DrillUp.g_MPFP_ex_width = Number(DrillUp.parameters["窗口附加宽度"] || 0);
	DrillUp.g_MPFP_ex_height = Number(DrillUp.parameters["窗口附加高度"] || 0);
	DrillUp.g_MPFP_defaultStyle = Number(DrillUp.parameters["默认皮肤样式"] || 1);
	
	
	//==============================
	// * 静态数据 - 皮肤样式
	//				（~struct~DrillMPFPStyle）
	//==============================
	DrillUp.drill_MPFP_initStyle = function( dataFrom ){
		var data = {};
		
		// > 常规
		data['mouseType'] = String( dataFrom["激活方式"] || "鼠标接近");
		data['x'] = Number( dataFrom["偏移-窗口 X"] || 0 );
		data['y'] = Number( dataFrom["偏移-窗口 Y"] || 0 );
		
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
		data['battle_layerIndex'] = String( dataFrom["战斗层级"] || "图片层");
		data['battle_zIndex'] = Number( dataFrom["战斗图片层级"] || 0);
		data['map_layerIndex'] = String( dataFrom["地图层级"] || "图片层");
		data['map_zIndex'] = Number( dataFrom["地图图片层级"] || 0);
		
		return data;
	}
	/*----------------皮肤样式---------------*/
	DrillUp.g_MPFP_style_list_length = 10;
	DrillUp.g_MPFP_style_list = [];
	for( var i = 0; i < DrillUp.g_MPFP_style_list_length; i++ ){
		if( DrillUp.parameters["皮肤样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["皮肤样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse( DrillUp.parameters["皮肤样式-" + String(i+1)] );
			DrillUp.g_MPFP_style_list[i] = DrillUp.drill_MPFP_initStyle( temp );
		}else{
			DrillUp.g_MPFP_style_list[i] = DrillUp.drill_MPFP_initStyle( {} );
		}
	};
	
	
	//==============================
	// * 静态数据 - 图片内容
	//				（~struct~DrillMPFPBind）
	//==============================
	DrillUp.drill_MPFP_initBind = function( dataFrom ){
		var data = {};
		if( dataFrom["内容文本"] != undefined && 
			dataFrom["内容文本"] != "" ){
			data['context'] = JSON.parse( dataFrom["内容文本"] ).split("\n");
		}else{
			data['context'] = "";
		}
		data['style_mode'] = String( dataFrom["绑定的模式"] || "默认皮肤样式");
		data['style_lockedId'] = Number( dataFrom["锁定皮肤样式"] || 1);
		return data;
	}
	/*----------------图片内容---------------*/
	DrillUp.g_MPFP_list_length = 80;
	DrillUp.g_MPFP_list = [];
	for( var i = 0; i < DrillUp.g_MPFP_list_length ; i++ ){
		if( DrillUp.parameters["图片内容-" + String(i+1) ] != undefined &&
			DrillUp.parameters["图片内容-" + String(i+1) ] != "" ){
			var temp = JSON.parse( DrillUp.parameters["图片内容-" + String(i+1)] );
			DrillUp.g_MPFP_list[i] = DrillUp.drill_MPFP_initBind( temp );
		}else{
			DrillUp.g_MPFP_list[i] = DrillUp.drill_MPFP_initBind( {} );
		}
	};
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfWindowAuxiliary ){


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_MPFP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MPFP_pluginCommand.call(this, command, args);
	if( command === ">图片说明窗口" ){
		
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			
			if( temp1.indexOf("图片[") != -1 ){
				var pic_id = temp1.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
				if( $gameScreen.drill_MPFP_isPictureExist( pic_id ) == false ){ return; }
				
				var picture = $gameScreen.picture( pic_id );
				if( picture == undefined ){ return; }
				
				// > 创建实体类
				if( picture._drill_MPFP_bean == undefined ){
					picture._drill_MPFP_bean = new Drill_MPFP_Bean();
					$gameTemp._drill_MPFP_needRestatistics = true;
					
					if( Imported.Drill_CoreOfPictureWithMouse ){
						// > 【图片 - 图片与鼠标控制核心】执行绑定
						picture.drill_COPWM_checkData();
					}
				}
				
				if( temp2.indexOf("绑定图片内容[") != -1 ){
					temp2 = temp2.replace("绑定图片内容[","");
					temp2 = temp2.replace("]","");
					
					var bind = DrillUp.g_MPFP_list[ Number(temp2)-1 ];
					var context_list = bind['context'];
					picture._drill_MPFP_bean.drill_bean_setVisible( true );
					picture._drill_MPFP_bean.drill_bean_setContextList( context_list );
					picture._drill_MPFP_bean.drill_bean_setSkinStyle( bind['style_mode'], bind['style_lockedId'] );
					return;
				}
				if( temp2.indexOf("修改绑定字符串[") != -1 ||
					temp2.indexOf("绑定字符串[") != -1 ){
					temp2 = temp2.replace("修改绑定字符串[","");
					temp2 = temp2.replace("绑定字符串[","");
					temp2 = temp2.replace("]","");
					
					if( Imported.Drill_CoreOfString ){
						var context_list = $gameStrings.value( Number(temp2) ).split("\n");
						picture._drill_MPFP_bean.drill_bean_setVisible( true );
						picture._drill_MPFP_bean.drill_bean_setContextList( context_list );
					}
					return;
				}
				if( temp2.indexOf("锁定皮肤样式[") != -1 ){
					temp2 = temp2.replace("锁定皮肤样式[","");
					temp2 = temp2.replace("]","");
					
					var bind = DrillUp.g_MPFP_list[ Number(temp2)-1 ];
					var context_list = bind['context'].split("\n");
					picture._drill_MPFP_bean.drill_bean_setVisible( true );
					picture._drill_MPFP_bean.drill_bean_setSkinStyle( "锁定皮肤样式", Number(temp2) );
					return;
				}
				if( temp2 == "解除绑定" ){
					picture._drill_MPFP_bean.drill_bean_setVisible( false );
					picture._drill_MPFP_bean.drill_bean_setSkinStyle( "默认皮肤样式", -1 );
					return;
				}
				if( temp2 == "解除锁定皮肤样式" ){
					picture._drill_MPFP_bean.drill_bean_setSkinStyle( "默认皮肤样式", -1 );
					return;
				}
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改默认皮肤样式" ){
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_MPFP_defaultStyle = DrillUp.g_MPFP_defaultStyle;
				}else{
					temp1 = temp1.replace("样式[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFP_defaultStyle = Number(temp1);
				}
			}
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
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_MPFP_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_MPFP_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
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
var _drill_MPFP_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_MPFP_preload_initialize.call(this);
	this.drill_MPFP_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_MPFP_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_MPFP_preloadInit = function() {
	this._drill_MPFP_cacheId = Utils.generateRuntimeId();	//资源缓存id
    this._drill_MPFP_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_MPFP_style_list.length; i++ ){
		var temp_data = DrillUp.g_MPFP_style_list[i];
		if( temp_data == undefined ){ continue; }
		
		// > 『窗口皮肤的预加载』
		if( temp_data['window_type'] == "自定义窗口皮肤" ){
			this._drill_MPFP_preloadTank.push( 
				ImageManager.reserveBitmap( "img/system/", temp_data['window_sys_src'], 0, true, this._drill_MPFP_cacheId ) 
			);
		}
		if( temp_data['window_type'] == "自定义背景图片" ){
			this._drill_MPFP_preloadTank.push( 
				ImageManager.reserveBitmap( "img/system/", temp_data['window_pic_src'], 0, true, this._drill_MPFP_cacheId ) 
			);
		}
	}
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_MPFP_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MPFP_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MPFP_sys_initialize.call(this);
	this.drill_MPFP_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MPFP_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MPFP_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MPFP_saveEnabled == true ){	
		$gameSystem.drill_MPFP_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MPFP_initSysData();
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
Game_System.prototype.drill_MPFP_initSysData = function() {
	this.drill_MPFP_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MPFP_checkSysData = function() {
	this.drill_MPFP_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MPFP_initSysData_Private = function() {
	
	this._drill_MPFP_defaultStyle = DrillUp.g_MPFP_defaultStyle;	//（默认皮肤样式）
	this._drill_MPFP_ex_width = DrillUp.g_MPFP_ex_width;			//（窗口附加宽度）
	this._drill_MPFP_ex_height = DrillUp.g_MPFP_ex_height; 			//（窗口附加高度）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MPFP_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MPFP_defaultStyle == undefined ){
		this.drill_MPFP_initSysData();
	}
	
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
Scene_Battle.prototype.drill_MPFP_layerAddSprite = function( sprite, layer_index ){
	this.drill_MPFP_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_MPFP_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_MPFP_sortByZIndex = function () {
    this.drill_MPFP_sortByZIndex_Private();
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 上层
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
// * 战斗层级 - 图片层
//==============================
var _drill_MPFP_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_MPFP_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_MPFP_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MPFP_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
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
Scene_Battle.prototype.drill_MPFP_sortByZIndex_Private = function() {
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_MPFP_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "上层" ){
		this._spriteset._drill_battleUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
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
Scene_Map.prototype.drill_MPFP_layerAddSprite = function( sprite, layer_index ){
	this.drill_MPFP_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_MPFP_layerRemoveSprite = function( sprite ){
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
Scene_Map.prototype.drill_MPFP_sortByZIndex = function () {
    this.drill_MPFP_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 上层
//==============================
var _drill_MPFP_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_MPFP_layer_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_MPFP_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_MPFP_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_MPFP_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MPFP_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
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
Scene_Map.prototype.drill_MPFP_sortByZIndex_Private = function() {
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_MPFP_layerAddSprite_Private = function( sprite, layer_index ){
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
// ** ☆图片控制
//
//			说明：	> 此模块考虑 手动控制 图片显示/隐藏 指令。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片控制 - 显示图片（对应函数showPicture）
//==============================
var _drill_MPFP_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function( name, origin, x, y, scaleX, scaleY, opacity, blendMode ){
	_drill_MPFP_p_show.call( this, name, origin, x, y, scaleX, scaleY, opacity, blendMode );
	//（无，通过插件指令 绑定图片内容）
}
//==============================
// * 图片控制 - 消除图片
//==============================
var _drill_MPFP_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_MPFP_p_erase.call( this );
	$gameTemp._drill_MPFP_needRestatistics = true;	//刷新统计
}
//==============================
// * 图片控制 - 消除图片（command235）
//==============================
var _drill_MPFP_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
	_drill_MPFP_p_erasePicture.call( this, pictureId );
	$gameTemp._drill_MPFP_needRestatistics = true;	//刷新统计
}


//=============================================================================
// ** ☆实体类容器
//			
//			说明：	> 此模块专门对实体类进行 捕获、销毁 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_MPFP_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_MPFP_temp_initialize.call(this);
	this._drill_MPFP_beanTank = [];				//实体类容器
	this._drill_MPFP_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_MPFP_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp._drill_MPFP_beanTank = [];		//实体类容器
	$gameTemp._drill_MPFP_needRestatistics = true;
	_drill_MPFP_gmap_setup.call(this,mapId);
};
//==============================
// * 容器 - 切换贴图时（菜单界面/战斗界面 刷新）
//==============================
var _drill_MPFP_sbase_createPictures = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function() {
	$gameTemp._drill_MPFP_beanTank = [];		//实体类容器
	$gameTemp._drill_MPFP_needRestatistics = true;
	_drill_MPFP_sbase_createPictures.call(this);
};
//==============================
// * 容器 - 销毁时
//==============================
var _drill_MPFP_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_MPFP_terminate.call(this);
	$gameTemp._drill_MPFP_beanTank = [];		//实体类容器
	$gameTemp._drill_MPFP_needRestatistics = true;
};
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_MPFP_screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function(){
	_drill_MPFP_screen_update.call( this );
	this.drill_MPFP_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Screen.prototype.drill_MPFP_updateRestatistics = function() {
	if( $gameTemp._drill_MPFP_needRestatistics != true ){ return }
	$gameTemp._drill_MPFP_needRestatistics = false;
	
	$gameTemp._drill_MPFP_beanTank = [];		//实体类容器
	
	// > 图片遍历『图片与多场景』
	var i_offset = 0;							//地图界面的图片
	var pic_length = this.maxPictures();
	if( $gameParty.inBattle() == true ){		//战斗界面的图片
		i_offset = pic_length;
	}
	for(var i = 0; i < pic_length; i++ ){
		var picture = this._pictures[ i + i_offset ];
		if( picture == undefined ){ continue; }
		if( picture._drill_MPFP_bean != undefined ){
			$gameTemp._drill_MPFP_beanTank.push( picture._drill_MPFP_bean );
		}
	}
};


//=============================================================================
// ** ☆实体类赋值
//			
//			说明：	> 此模块专门 对实体类进行 赋值。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 实体类赋值 - 帧刷新
//==============================
var _Drill_MPFP_s_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_MPFP_s_update.call(this);
	var picture = this.picture();
	if( picture == undefined ){ return; }
	if( picture._drill_MPFP_bean == undefined ){ return; }
	
	this.drill_MPFP_updatePosition();		//帧刷新 - 刷新位置
	this.drill_MPFP__refreshFrame();		//帧刷新 - 刷新框架
};
//==============================
// * 实体类赋值 - 帧刷新 - 刷新位置
//==============================
Sprite_Picture.prototype.drill_MPFP_updatePosition = function() {
	var picture = this.picture();
	var bean = picture._drill_MPFP_bean;
	
	// > 【图片 - 图片优化核心】『图片数据最终变换值』
	var xx = this.x;
	var yy = this.y;
	if( Imported.Drill_CoreOfPicture == true ){
		xx = picture.drill_COPi_finalTransform_x();
		yy = picture.drill_COPi_finalTransform_y();
	}
	
	var ww = bean._drill_frameW;
	var hh = bean._drill_frameH;
	xx = xx - ww*this.anchor.x;		//（注意图片 持续动作 时，xy乱晃）
	yy = yy - hh*this.anchor.y;
	
	bean.drill_bean_setPictureId( this._pictureId );
	bean.drill_bean_setPosition( xx, yy );
};
//==============================
// * 实体类赋值 - 最后继承
//
//			说明：	> 确保函数实现在 图片优化核心 CoreOfPicture 之后。
//==============================
var _drill_MPFP_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_MPFP_scene_initialize.call(this);
	
	//==============================
	// * 实体类赋值 - 刷新框架『贴图框架值』（_realFrame）
	//
	//			说明：	> 此处 非帧刷新，而是在 贴图底层 发生刷新改变时，才变化值。
	//==============================
	var _drill_MPFP_s__refresh = Sprite_Picture.prototype._refresh;
	Sprite_Picture.prototype._refresh = function(){
		_drill_MPFP_s__refresh.call( this );
		this.drill_MPFP__refreshFrame();
	}
	//==============================
	// * 实体类赋值 - 刷新框架
	//
	//			说明：	> 由于Bean会被随时销毁，所以该函数要在帧刷新中执行。
	//==============================
	Sprite_Picture.prototype.drill_MPFP__refreshFrame = function(){
		var picture = this.picture();
		if( picture == undefined ){ return; }
		if( picture._drill_MPFP_bean == undefined ){ return; }
		
		// > 条件 - 未读取时不赋值
		if( this.bitmap == undefined ){ return; }
		if( this.bitmap.isReady() == false ){ return; }
		
		// > 条件 - 不接受宽度为0的标记
		if( this._realFrame.width == 0 ){ return; }
		if( this._realFrame.height == 0 ){ return; }
		
		// > 刷新框架
		picture._drill_MPFP_bean.drill_bean_resetFrame(
			this._realFrame.x,
			this._realFrame.y,
			this._realFrame.width,
			this._realFrame.height 
		);
	};
}


//=============================================================================
// ** 图片说明窗口 实体类【Drill_MPFP_Bean】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个专门的实体类数据类。
// **		子功能：	->无帧刷新
// **					->重设数据
// **						->序列号
// **					->被动赋值（Sprite_Picture）
// **						> 可见
// **						> 位置
// **						> 贴图框架值
// **						> 内容
// **						> 设置皮肤样式
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
// **				> 该类没有帧刷新，只能通过函数被动赋值。
//=============================================================================
//==============================
// * 实体类 - 定义
//==============================
function Drill_MPFP_Bean(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 实体类 - 初始化
//==============================
Drill_MPFP_Bean.prototype.initialize = function(){
	this._drill_beanSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_bean_initData();											//私有数据初始化
};
//##############################
// * 实体类 - 显示/隐藏【开放函数】
//			
//			参数：	> visible 布尔
//			返回：	> 无
//##############################
Drill_MPFP_Bean.prototype.drill_bean_setVisible = function( visible ){
	this._drill_visible = visible;
};
//##############################
// * 实体类 - 设置绑定的图片id【开放函数】
//			
//			参数：	> picture_id 数字
//			返回：	> 无
//##############################
Drill_MPFP_Bean.prototype.drill_bean_setPictureId = function( picture_id ){
	this._drill_pictureId = picture_id;
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
Drill_MPFP_Bean.prototype.drill_bean_setPosition = function( x, y ){
	this._drill_x = x;
	this._drill_y = y;
};
//##############################
// * 实体类 - 设置框架【开放函数】
//			
//			参数：	> frameX,frameY,frameW,frameH 矩形对象
//			返回：	> 无
//			
//			说明：	> 被动赋值，见 刷新框架 的功能。
//##############################
Drill_MPFP_Bean.prototype.drill_bean_resetFrame = function( frameX, frameY, frameW, frameH ){
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
Drill_MPFP_Bean.prototype.drill_bean_setContextList = function( contextList ){
	this._drill_contextList = contextList;
	this.drill_bean_refreshContext();
};
//##############################
// * 实体类 - 刷新内容【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_MPFP_Bean.prototype.drill_bean_refreshContext = function(){
	this._drill_contextSerial = new Date().getTime() + Math.random();	//（文本变化标记）
};
//##############################
// * 实体类 - 设置皮肤样式【开放函数】
//			
//			参数：	> styleMode 字符串（默认皮肤样式/锁定皮肤样式）
//					> styleLockedId 数字
//			返回：	> 无
//##############################
Drill_MPFP_Bean.prototype.drill_bean_setSkinStyle = function( styleMode, styleLockedId ){
	this._drill_styleMode = styleMode;
	this._drill_styleLockedId = styleLockedId;
	
	// > 根据样式id 找到 鼠标触发类型
	var style_id = $gameSystem._drill_MPFP_defaultStyle;
	if( styleMode == "锁定皮肤样式" ){
		style_id = styleLockedId;
	}
	var temp_data = DrillUp.g_MPFP_style_list[ style_id -1 ];
	if( temp_data == undefined ){
		this._drill_mouseType = "鼠标接近";
	}else{
		this._drill_mouseType = temp_data['mouseType'];
	}
};
//==============================
// * 实体类 - 私有数据初始化
//==============================
Drill_MPFP_Bean.prototype.drill_bean_initData = function(){
	
	this._drill_visible = true;				//实体类 - 可见
	
	this._drill_pictureId = 0;				//实体类 - 事件id
	
	this._drill_x = 0;						//实体类 - 位置X
	this._drill_y = 0;						//实体类 - 位置Y
	
	this._drill_frameX = 0;					//实体类 - 框架X
	this._drill_frameY = 0;					//实体类 - 框架Y
	this._drill_frameW = 0;					//实体类 - 框架宽度
	this._drill_frameH = 0;					//实体类 - 框架高度
	
	this._drill_contextList = [];										//实体类 - 当前文本
	this._drill_contextSerial = new Date().getTime() + Math.random();	//实体类 - 刷新内容
	
	this._drill_styleMode = "默认皮肤样式";								//实体类 - 绑定的模式
	this._drill_styleLockedId = $gameSystem._drill_MPFP_defaultStyle;	//实体类 - 锁定皮肤样式
	this._drill_mouseType = "鼠标接近";									//实体类 - 鼠标触发类型
};



//=============================================================================
// ** ☆窗口控制
//			
//			说明：	> 此模块专门管理 说明窗口 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口控制（战斗界面） - 创建说明窗口
//==============================
var _drill_MPFP_battleScene_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MPFP_battleScene_createAllWindows.call(this);
	
	if( this._drill_MPFP_window == undefined ){		//（战斗界面 建立一个窗口）
		this._drill_MPFP_window = new Drill_MPFP_Window();
		
		// > 记录层级
		this._drill_MPFP_curLayer = this._drill_MPFP_window._drill_curLayer;
		this._drill_MPFP_curZIndex = this._drill_MPFP_window.zIndex;
		
		this.drill_MPFP_layerAddSprite( this._drill_MPFP_window, this._drill_MPFP_curLayer );
		this.drill_MPFP_sortByZIndex();
	}
};
//==============================
// * 窗口控制（战斗界面） - 说明窗口层级变化
//==============================
var _drill_MPFP_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	_drill_MPFP_sbattle_update.call(this);
	
	// > 地图层级
	if( this._drill_MPFP_curLayer != this._drill_MPFP_window._drill_curLayer ){
		this._drill_MPFP_curLayer = this._drill_MPFP_window._drill_curLayer;
		this.drill_MPFP_layerAddSprite( this._drill_MPFP_window, this._drill_MPFP_curLayer );
	}
	// > 图片层级
	if( this._drill_MPFP_curZIndex != this._drill_MPFP_window.zIndex ){
		this._drill_MPFP_curZIndex = this._drill_MPFP_window.zIndex;
		this.drill_MPFP_sortByZIndex();
	}
};
//==============================
// * 窗口控制（地图界面） - 创建说明窗口
//==============================
var _drill_MPFP_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MPFP_map_createAllWindows.call(this);
	
	if( this._drill_MPFP_window == undefined ){		//（地图界面 建立一个窗口）
		this._drill_MPFP_window = new Drill_MPFP_Window();
		
		// > 记录层级
		this._drill_MPFP_curLayer = this._drill_MPFP_window._drill_curLayer;
		this._drill_MPFP_curZIndex = this._drill_MPFP_window.zIndex;
		
		this.drill_MPFP_layerAddSprite( this._drill_MPFP_window, this._drill_MPFP_curLayer );
		this.drill_MPFP_sortByZIndex();
	}
};
//==============================
// * 窗口控制（地图界面） - 说明窗口层级变化
//==============================
var _drill_MPFP_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_drill_MPFP_smap_update.call(this);
	
	// > 地图层级
	if( this._drill_MPFP_curLayer != this._drill_MPFP_window._drill_curLayer ){
		this._drill_MPFP_curLayer = this._drill_MPFP_window._drill_curLayer;
		this.drill_MPFP_layerAddSprite( this._drill_MPFP_window, this._drill_MPFP_curLayer );
	}
	// > 图片层级
	if( this._drill_MPFP_curZIndex != this._drill_MPFP_window.zIndex ){
		this._drill_MPFP_curZIndex = this._drill_MPFP_window.zIndex;
		this.drill_MPFP_sortByZIndex();
	}
};

	
//=============================================================================
// ** 图片说明窗口【Drill_MPFP_Window】
// **		
// **		索引：	无
// **		来源：	继承于Window_Base
// **		实例：	Scene_Battle下的 _drill_MPFP_window 成员
// **		应用：	暂无 
// **		
// **		作用域：	战斗界面
// **		主功能：	定义一个窗口，能随时改变内容和高宽，用于描述图片内容信息。
// **		子功能：	->窗口
// **						x->是否就绪
// **						x->优化策略
// **						x->销毁
// **					->A主体
// **						->显示/隐藏控制
// **						->锁定皮肤样式
// **					->B实体类交互
// **					->C位置跟随
// **						->跟随鼠标位置
// **						->中心锚点
// **						->边缘修正
// **					->D窗口皮肤
// **						> 默认窗口皮肤
// **						> 自定义窗口皮肤
// **						> 自定义背景图片
// **						> 黑底背景
// **					->E窗口内容
// **					
// **		说明：	> 整个场景只有一个该窗口。
// **				> 其它相似的可变窗口插件，可以搜关键词："initSkin"。
//=============================================================================
//==============================
// * 图片说明窗口 - 定义
//==============================
function Drill_MPFP_Window() {
    this.initialize.apply(this, arguments);
};
Drill_MPFP_Window.prototype = Object.create(Window_Base.prototype);
Drill_MPFP_Window.prototype.constructor = Drill_MPFP_Window;
//==============================
// * 图片说明窗口 - 初始化
//==============================
Drill_MPFP_Window.prototype.initialize = function(){
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 图片说明窗口 - 帧刷新
//==============================
Drill_MPFP_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.drill_updateBean();			//帧刷新 - B实体类交互（最先执行）
	this.drill_updateAttr_Style();		//帧刷新 - A主体 - 样式
	this.drill_updatePosition();		//帧刷新 - C位置跟随
	this.drill_updateSkin();			//帧刷新 - D窗口皮肤
	this.drill_updateMessage();			//帧刷新 - E窗口内容
	this.drill_updateAttr_Visible();	//帧刷新 - A主体 - 可见
}
//==============================
// * 图片说明窗口 - 私有覆写函数
//==============================
Drill_MPFP_Window.prototype.lineHeight = function(){ return DrillUp.g_MPFP_lineheight; };		//窗口行间距
Drill_MPFP_Window.prototype.standardPadding = function(){ return DrillUp.g_MPFP_padding; };		//窗口内边距
Drill_MPFP_Window.prototype.standardFontSize = function(){ return DrillUp.g_MPFP_fontsize; };	//窗口字体大小
//==============================
// * 图片说明窗口 - 初始化数据
//==============================
Drill_MPFP_Window.prototype.drill_initData = function() {
	//（暂无 默认值）
}
//==============================
// * 图片说明窗口 - 初始化数据
//
//			说明：	> 此函数只在初始化时执行一次，重设数据 被分到各个子功能里面执行。
//==============================
Drill_MPFP_Window.prototype.drill_initSprite = function() {
	this.drill_initAttr();				//初始化对象 - A主体
	this.drill_initBean();				//初始化对象 - B实体类交互
	this.drill_initPosition();			//初始化对象 - C位置跟随
	this.drill_initSkin();				//初始化对象 - D窗口皮肤
	this.drill_initMessage();			//初始化对象 - E窗口内容
	
	// > 重设样式（默认样式）
	this.drill_refreshStyle( DrillUp.g_MPFP_defaultStyle );
};


//==============================
// * A主体 - 初始化
//==============================
Drill_MPFP_Window.prototype.drill_initAttr = function() {
	
	// > 私有属性初始化
	this._drill_width = 0;				//窗口宽度
	this._drill_height = 0;				//窗口高度
	this._drill_showDelay = 0;			//显示延迟
}
//==============================
// * A主体 - 帧刷新 样式
//==============================
Drill_MPFP_Window.prototype.drill_updateAttr_Style = function() {
	if( this._drill_curBean == null ){ return; }
	
	// > 实体类 变化时，重设样式
	var bean = this._drill_curBean;
	var style_id = $gameSystem._drill_MPFP_defaultStyle;
	if( bean._drill_styleMode == "锁定皮肤样式" ){
		style_id = bean._drill_styleLockedId;
	}
	if( this._drill_curStyleId != style_id ){
		this._drill_curStyleId = style_id;
		this.drill_refreshStyle( this._drill_curStyleId );
		this._drill_showDelay = 1;	//（延迟1帧再显示，防止看到样式、内容和高宽的变化）
	}
}
//==============================
// * A主体 - 帧刷新 可见
//==============================
Drill_MPFP_Window.prototype.drill_updateAttr_Visible = function() {
	
	// > 时间-1
	this._drill_showDelay -= 1;
	
	// > 没有 实体类 时，直接不显示
	if( this._drill_curBean == null ){
		this.visible = false;
		return;
	}
	
	// > 延迟显示时，不显示
	if( this._drill_showDelay >= 0 ){
		this.visible = false;
		return;
	}
	
	// > 显示
	this.visible = true;
}
//==============================
// * A主体 - 帧刷新样式
//==============================
Drill_MPFP_Window.prototype.drill_refreshStyle = function( style_id ){
	
	// > 样式设置
	this._drill_curStyleId = style_id;
	this._drill_curData = DrillUp.g_MPFP_style_list[ this._drill_curStyleId -1 ];
	
	// > 样式设置（防错优化）
	if( this._drill_curData['mouseType'] == undefined ){ this._drill_curData['mouseType'] = "鼠标接近"; }
	if( this._drill_curData['x'] == undefined ){ this._drill_curData['x'] = 0; }
	if( this._drill_curData['y'] == undefined ){ this._drill_curData['y'] = 0; }
	
	// > 层级设置（说明窗口层级变化）
	if( SceneManager._scene instanceof Scene_Battle ){
		this._drill_curLayer = this._drill_curData['battle_layerIndex'];
		this.zIndex = this._drill_curData['battle_zIndex'];
	}
	if( SceneManager._scene instanceof Scene_Map ){
		this._drill_curLayer = this._drill_curData['map_layerIndex'];
		this.zIndex = this._drill_curData['map_zIndex'];
	}
	
	// > 重设数据（C位置跟随）
	this.drill_resetData_Position( this._drill_curData );
	// > 重设数据（D窗口皮肤）
	this.drill_resetData_Skin( this._drill_curData );
	// > 重设数据（E窗口内容）
	this.drill_resetData_Message( this._drill_curData );
}


//==============================
// * B实体类交互 - 初始化
//==============================
Drill_MPFP_Window.prototype.drill_initBean = function() {
	this._drill_curBean = null;
}
//==============================
// * B实体类交互 - 帧刷新
//==============================
Drill_MPFP_Window.prototype.drill_updateBean = function() {
	this._drill_curBean = null;
	
	for( var i=0; i < $gameTemp._drill_MPFP_beanTank.length; i++ ){
		var bean = $gameTemp._drill_MPFP_beanTank[i];
		
		// > 条件 - 触发范围
		if( this.drill_isInFrame(bean) ){
			
			// > 条件 - 鼠标激活方式
			if( this.drill_isMouseControl(bean) ){
				
				this._drill_curBean = bean;
				return;
			}
		}
	}
}
//==============================
// * B实体类交互 - 条件 - 触发范围
//==============================
Drill_MPFP_Window.prototype.drill_isInFrame = function( bean ){
	if( bean['_drill_visible'] == false ){ return false; }
	
	//（如果有碰撞体，直接用碰撞体的判定）
	//		> 检查鼠标是否在该实体类的范围内。『鼠标落点与实体类范围』
	//			镜头与层级 - 无需支持
	//			中心锚点   - 已支持（图片-碰撞体 支持）
	//			特殊变换   - 已支持（图片-碰撞体 支持，缩放+斜切+旋转）
	//			触屏响应   - 暂不明确
	if( Imported.Drill_CoreOfPictureWithMouse ){
		
		// > 【图片 - 图片与鼠标控制核心】执行绑定
		var picture = $gameScreen.picture( bean['_drill_pictureId'] );
		if( picture == undefined ){ return false; }
		return picture.drill_COPWM_isOnHover();
	}
	
	
	//（如果没有，用该插件自带的判定）
	//		> 检查鼠标是否在该实体类的范围内。『鼠标落点与实体类范围』
	//			镜头与层级 - 无需支持
	//			中心锚点   - 已支持（见函数 drill_MPFP_updatePosition ）
	//			特殊变换   - 不能支持
	//			触屏响应   - 暂不明确
	
	// > 判定 - 鼠标位置
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( bean['_drill_mouseType'] == "触屏按下[持续]" ){
		_x = TouchInput.x;
		_y = TouchInput.y;
	}
	
	// > 判定 - 镜头与层级
	//	（这是图片的层级，图片处于 图片层、最顶层）
	
	// > 判定 - 触发范围
	if( _x > bean['_drill_x'] + bean['_drill_frameW'] ){ return false; }
	if( _x < bean['_drill_x'] + 0 ){ return false; }
	if( _y > bean['_drill_y'] + bean['_drill_frameH'] ){ return false; }
	if( _y < bean['_drill_y'] + 0 ){ return false; }
	return true;
}
//==============================
// * B实体类交互 - 条件 - 鼠标激活方式
//==============================
Drill_MPFP_Window.prototype.drill_isMouseControl = function( bean ){
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
// * C位置跟随 - 初始化
//==============================
Drill_MPFP_Window.prototype.drill_initPosition = function() {
	this._drill_anchor_x = 0;		//中心锚点x
	this._drill_anchor_y = 0;		//中心锚点y
}
//==============================
// * C位置跟随 - 重设数据
//==============================
Drill_MPFP_Window.prototype.drill_resetData_Position = function( data ) {
	if( data['anchor'] == "左上角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 0.0; }
	if( data['anchor'] == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( data['anchor'] == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( data['anchor'] == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
	if( data['anchor'] == "正上方" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.0; }
	if( data['anchor'] == "正下方" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 1.0; }
	if( data['anchor'] == "正左方" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 0.5; }
	if( data['anchor'] == "正右方" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.5; }
	if( data['anchor'] == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
}
//==============================
// * C位置跟随 - 帧刷新
//==============================
Drill_MPFP_Window.prototype.drill_updatePosition = function() {
	var xx = 0;
	var yy = 0;
	xx += this._drill_curData['x'];
	yy += this._drill_curData['y'];
	
	// > 锁定位置
	if( this._drill_curData['lock_enable'] == true ){
		xx += this._drill_curData['lock_x'];
		yy += this._drill_curData['lock_y'];
		
		
	// > 跟随鼠标位置
	}else{
		xx += _drill_mouse_x;
		yy += _drill_mouse_y;
		
		// > 【战斗 - 活动战斗镜头】战斗落点 转换
		//		（注意，这里只改变窗口的位置 ）
		if( Imported.Drill_BattleCamera ){
			if( SceneManager._scene instanceof Scene_Battle ){
				var layer = this._drill_curData['battle_layerIndex'];
				if( layer == "下层" || layer == "上层" ){
					var convert_pos = $gameSystem._drill_BCa_controller.drill_BCa_getPos_OuterToChildren( xx, yy );
					xx = convert_pos.x;
					yy = convert_pos.y;	
				}
				if( layer == "图片层" || layer == "最顶层" ){
					//（不操作）
				}
			}
		}
		
		// > 【地图 - 活动地图镜头】地图落点 转换
		//		（注意，这里只改变窗口的位置 ）
		if( Imported.Drill_LayerCamera ){
			if( SceneManager._scene instanceof Scene_Map ){
				var layer = this._drill_curData['map_layerIndex'];
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
// * D窗口皮肤 - 初始化
//
//			说明：	> 此函数只在初始化时执行一次，不要执行多了。
//==============================
Drill_MPFP_Window.prototype.drill_initSkin = function() {
	
	// > 皮肤资源
	this._drill_skin_defaultSkin = this.windowskin;
}
//==============================
// * D窗口皮肤 - 重设数据
//
//			说明：	> 样式切换时重设，data对象中的参数【可以缺项】。
//==============================
Drill_MPFP_Window.prototype.drill_resetData_Skin = function( data ){
	
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
		this._drill_skin_pic_bitmap = ImageManager.loadBitmap( "img/system/", data['window_pic_src'], 0, true );
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
// * D窗口皮肤 - 帧刷新
//==============================
Drill_MPFP_Window.prototype.drill_updateSkin = function() {
	
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
// * D窗口皮肤 - 帧刷新色调
//
//			说明：	setTone可以反复调用赋值，有变化监听的锁。
//==============================
var _drill_MPFP_updateTone = Drill_MPFP_Window.prototype.updateTone;
Drill_MPFP_Window.prototype.updateTone = function() {
	if( this._drill_skin_tone_lock == true ){
		this.setTone( this._drill_skin_tone_r, this._drill_skin_tone_g, this._drill_skin_tone_b );
		return;
	}
	_drill_MPFP_updateTone.call( this );
}


//==============================
// * E窗口内容 - 初始化
//==============================
Drill_MPFP_Window.prototype.drill_initMessage = function() {
	
	// > 内容刷新标记
	this._drill_curContextSerial = -1;
	
	// > 窗口内容刷新
	this.createContents();
    this.contents.clear();
}
//==============================
// * E窗口内容 - 重设数据
//==============================
Drill_MPFP_Window.prototype.drill_resetData_Message = function( data ){
	
	// > 内容刷新标记
	this._drill_curContextSerial = -1;
	
	// > 窗口内容刷新
	this.createContents();
    this.contents.clear();
	
	// > 帧刷新一次
	this.drill_updateMessage();
}
//==============================
// * E窗口内容 - 帧刷新
//==============================
Drill_MPFP_Window.prototype.drill_updateMessage = function() {
	if( this._drill_curBean == null ){ return; }
	
	// > 切换实体类时，刷新内容
	var bean = this._drill_curBean;
	if( this._drill_curContextSerial != bean['_drill_contextSerial'] ){
		this._drill_curContextSerial = bean['_drill_contextSerial'];
		this.drill_refreshMessage( bean['_drill_contextList'] );
		this._drill_showDelay = 1;	//（延迟1帧再显示，防止看到样式、内容和高宽的变化）
	}
}
//==============================
// * E窗口内容 - 刷新内容
//==============================
Drill_MPFP_Window.prototype.drill_refreshMessage = function( context_list ){
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
	ww += $gameSystem._drill_MPFP_ex_width || 0;		//（附加高宽）
	hh += $gameSystem._drill_MPFP_ex_height || 0;
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
		Imported.Drill_MiniPlateForPicture = false;
		var pluginTip = DrillUp.drill_MPFP_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

