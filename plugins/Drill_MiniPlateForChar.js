//=============================================================================
// Drill_MiniPlateForChar.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        鼠标 - 字符块的说明窗口
 * @author Drill_up
 * 
 * @Drill_LE_param "皮肤样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MPFC_style_list_length"
 * 
 * @Drill_LE_param "说明内容-%d"
 * @Drill_LE_parentKey "---说明内容组%d至%d---"
 * @Drill_LE_var "DrillUp.g_MPFC_list_length"
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_MiniPlateForChar +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得鼠标靠近特定的字符块时，可以显示说明窗口。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfInput             系统-输入设备核心
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v1.5及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于字符块。
 * 2.具体内容可以去看看 "14.鼠标 > 关于鼠标悬浮窗口.docx"。
 *   插件单独对鼠标有效，支持触屏按住。
 * 细节：
 *   (1.一个字符块可以对应一项说明内容。
 *      这个字符块如果出现在 地图界面、战斗界面、菜单界面 任意的界面中。
 *      鼠标接近都会显示相关注释内容。
 *   (2.说明窗口只对 字符块 有效，如果是单个字符，则没有效果。
 *      如果说明内容中没有任何字符，将不显示这个状态的说明内容。
 * 鼠标触发：
 *   (1.鼠标触发 显示说明窗口 的触发范围与字符块矩形区域大小相关。
 * 设计：
 *   (1.字符块的说明窗口 可用于某些剧情设定介绍时的红色关键词。
 *      鼠标接近这些关键词，则显示出关键词的详细说明。
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
 * 你需要使用下面的窗口字符来实现绑定：
 * 
 * 窗口字符：\dMPFCstart[1]      之后的字符块全都绑定数字对应的内容。
 * 窗口字符：\dMPFCend           关闭绑定开关。
 * 
 * 1.被上述两个窗口字符包裹的 字符块，都能绑定说明窗口内容。
 * 2.注意，只对 字符块 有效，
 *   比如"\dMPFCstart[1]某文字\dMPFCend"，此设置无效。
 *   比如"\dMPFCstart[1]某\dCOWCf[文]字\dMPFCend"，此设置的"文"能绑定。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口属性
 * 你可以修改设置说明窗口的部分属性：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>字符块的说明窗口 : 修改附加宽高 : 宽度[100]
 * 插件指令：>字符块的说明窗口 : 修改附加宽高 : 高度[100]
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
 * 测试结果：   地图界面，平均消耗为：【21.13ms】
 *              战斗界面，平均消耗为：【17.90ms】
 *              菜单界面，平均消耗为：【14.30ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件在界面中全程只有一个窗口在工作，每个字符块激活节点都
 *   临时显示后会随时销毁，因此消耗不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
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
 * @type struct<DrillMPFCStyle>
 * @desc 字符块的说明窗口的皮肤样式配置。
 * @default {"标签":"--默认皮肤--","---窗口---":"","布局模式":"默认窗口皮肤","布局透明度":"225","资源-自定义窗口皮肤":"Window","资源-自定义背景图片":"","平移-自定义背景图片 X":"0","平移-自定义背景图片 Y":"0","是否锁定窗口色调":"false","窗口色调-红":"0","窗口色调-绿":"0","窗口色调-蓝":"0","窗口中心锚点":"左上角","是否锁定窗口位置":"false","平移-锁定位置 X":"0","平移-锁定位置 Y":"0","战斗图片层级":"90","地图图片层级":"90","菜单图片层级":"90"}
 * 
 * @param 皮肤样式-2
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFCStyle>
 * @desc 字符块的说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-3
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFCStyle>
 * @desc 字符块的说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-4
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFCStyle>
 * @desc 字符块的说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-5
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFCStyle>
 * @desc 字符块的说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-6
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFCStyle>
 * @desc 字符块的说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-7
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFCStyle>
 * @desc 字符块的说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-8
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFCStyle>
 * @desc 字符块的说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-9
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFCStyle>
 * @desc 字符块的说明窗口的皮肤样式配置。
 * @default 
 *
 * @param 皮肤样式-10
 * @parent ---皮肤样式集---
 * @type struct<DrillMPFCStyle>
 * @desc 字符块的说明窗口的皮肤样式配置。
 * @default 
 *
 *
 * @param ---说明内容组 1至20---
 * @default 
 *
 * @param 说明内容-1
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 * 
 * @param 说明内容-2
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 * 
 * @param 说明内容-3
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 * 
 * @param 说明内容-4
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-5
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-6
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-7
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-8
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-9
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-10
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-11
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-12
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-13
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-14
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-15
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-16
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-17
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-18
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-19
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-20
 * @parent ---说明内容组 1至20---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 *
 * @param ---说明内容组21至40---
 * @default 
 *
 * @param 说明内容-21
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-22
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-23
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-24
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-25
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-26
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-27
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-28
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-29
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-30
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-31
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-32
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-33
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-34
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-35
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-36
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-37
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-38
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-39
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-40
 * @parent ---说明内容组21至40---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param ---说明内容组41至60---
 * @default 
 *
 * @param 说明内容-41
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-42
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-43
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-44
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-45
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-46
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-47
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-48
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-49
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-50
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-51
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-52
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-53
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-54
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-55
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-56
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-57
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-58
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-59
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-60
 * @parent ---说明内容组41至60---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param ---说明内容组61至80---
 * @default 
 *
 * @param 说明内容-61
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-62
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-63
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-64
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-65
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-66
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-67
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-68
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-69
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-70
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-71
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-72
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-73
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-74
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-75
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-76
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-77
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-78
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-79
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 *
 * @param 说明内容-80
 * @parent ---说明内容组61至80---
 * @type struct<DrillMPFCBind>
 * @desc 添加的说明内容，游戏中需要通过 字符块 手动绑定对应。
 * @default 
 * 
 */
/*~struct~DrillMPFCBind:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的字符块内容--
 * 
 * @param 内容文本
 * @type note
 * @desc 鼠标接近字符块时，显示的文本内容。
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
/*~struct~DrillMPFCStyle:
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
 * @param 战斗图片层级
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口在最顶层的先后排序位置，0表示最后面。
 * @default 90
 *
 * @param 地图图片层级
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口在最顶层的先后排序位置，0表示最后面。
 * @default 90
 *
 * @param 菜单图片层级
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口在最顶层的先后排序位置，0表示最后面。
 * @default 90
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		MPFC (Mini_Plate_For_Character)
//		临时全局变量	DrillUp.g_MPFC_xxx
//		临时局部变量	this._drill_MPFC_xxx
//		存储数据变量	$gameSystem._drill_MPFC_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)+o(贴图处理) 每帧
//		★性能测试因素	鼠标乱晃
//		★性能测试消耗	14.3ms（drill_MPFC_getAbsoluteX）17.9ms（update）
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			字符块的说明窗口：
//				->全局配置
//					->附加高宽
//				->字符块贴图容器
//					->字符块贴图
//					->销毁标记 监听
//				->实体类
//					->与 字符块贴图 直接绑定
//				->说明窗口
//					->位置
//						->跟随鼠标位置
//					->内容
//						->遍历实体类容器
//					->窗口皮肤
//				
//				
//		★私有类如下：
//			* Drill_MPFC_Bean		【字符块的说明窗口实体类】
//			* Drill_MPFC_Window		【字符块的说明窗口】
//		
//		★必要注意事项：
//			1.Bean实体类在 字符块贴图 中被动赋值。
//			  Window字符块的说明窗口在帧刷新时，主动遍历实体类列表，确认激活范围及显示内容。
//
//		★其它说明细节：
//			1.此插件在 Drill_MiniPlateForEvent 多次迭代的基础上新写的。
//			  相关的说明细节可以去看看那个插件。
//				
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MiniPlateForChar = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MiniPlateForChar');
	
	
	/*----------------杂项---------------*/
	DrillUp.g_MPFC_lineheight = Number(DrillUp.parameters["窗口行间距"] || 10);
	DrillUp.g_MPFC_padding = Number(DrillUp.parameters["窗口内边距"] || 18);
	DrillUp.g_MPFC_fontsize = Number(DrillUp.parameters["窗口字体大小"] || 22);
	DrillUp.g_MPFC_ex_width = Number(DrillUp.parameters["窗口附加宽度"] || 0);
	DrillUp.g_MPFC_ex_height = Number(DrillUp.parameters["窗口附加高度"] || 0);
	DrillUp.g_MPFC_defaultStyle = Number(DrillUp.parameters["默认皮肤样式"] || 1);
	
	
	//==============================
	// * 变量获取 - 皮肤样式
	//				（~struct~DrillMPFCStyle）
	//==============================
	DrillUp.drill_MPFC_initStyle = function( dataFrom ){
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
		data['battle_zIndex'] = Number( dataFrom["战斗图片层级"] || 0);
		data['map_zIndex'] = Number( dataFrom["地图图片层级"] || 0);
		data['menu_zIndex'] = Number( dataFrom["菜单图片层级"] || 0);
	
		data['mouseType'] = String( dataFrom["激活方式"] || "鼠标接近");
		data['x'] = Number( dataFrom["偏移-窗口 X"] || 0 );
		data['y'] = Number( dataFrom["偏移-窗口 Y"] || 0 );
		
		return data;
	}
	/*-----------------皮肤样式------------------*/
	DrillUp.g_MPFC_style_list_length = 20;
	DrillUp.g_MPFC_style_list = [];
	for( var i = 0; i < DrillUp.g_MPFC_style_list_length; i++ ){
		if( DrillUp.parameters["皮肤样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["皮肤样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["皮肤样式-" + String(i+1) ]);
			DrillUp.g_MPFC_style_list[i] = DrillUp.drill_MPFC_initStyle( data );
		}else{
			DrillUp.g_MPFC_style_list[i] = DrillUp.drill_MPFC_initStyle( {} );
		}
	}
	
	
	//==============================
	// * 变量获取 - 说明内容
	//				（~struct~DrillMPFCBind）
	//==============================
	DrillUp.drill_MPFC_initBind = function( dataFrom ){
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
	/*----------------说明内容---------------*/
	DrillUp.g_MPFC_list_length = 80;
	DrillUp.g_MPFC_list = [];
	for( var i = 0; i < DrillUp.g_MPFC_list_length ; i++ ){
		if( DrillUp.parameters["说明内容-" + String(i+1) ] != undefined &&
			DrillUp.parameters["说明内容-" + String(i+1) ] != "" ){
			var temp = JSON.parse( DrillUp.parameters["说明内容-" + String(i+1)] );
			DrillUp.g_MPFC_list[i] = DrillUp.drill_MPFC_initBind( temp );
		}else{
			DrillUp.g_MPFC_list[i] = DrillUp.drill_MPFC_initBind( {} );
		}
	};
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfWindowCharacter ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_MPFC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MPFC_pluginCommand.call(this, command, args);
	if( command === ">字符块的说明窗口" ){
		
		/*-----------------特殊设置------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改附加宽高" ){
				
				if( temp1.indexOf("宽度[") != -1 ){
					temp1 = temp1.replace("宽度[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFC_ex_width = Number(temp1);
				}
				if( temp1.indexOf("高度[") != -1 ){
					temp1 = temp1.replace("高度[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFC_ex_height = Number(temp1);
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
DrillUp.g_MPFC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MPFC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MPFC_sys_initialize.call(this);
	this.drill_MPFC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MPFC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MPFC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MPFC_saveEnabled == true ){	
		$gameSystem.drill_MPFC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MPFC_initSysData();
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
Game_System.prototype.drill_MPFC_initSysData = function() {
	this.drill_MPFC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MPFC_checkSysData = function() {
	this.drill_MPFC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MPFC_initSysData_Private = function() {
	
	this._drill_MPFC_defaultStyle = DrillUp.g_MPFC_defaultStyle;	//（默认皮肤样式）
	this._drill_MPFC_ex_width = DrillUp.g_MPFC_ex_width;			//（窗口附加宽度）
	this._drill_MPFC_ex_height = DrillUp.g_MPFC_ex_height; 			//（窗口附加高度）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MPFC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MPFC_defaultStyle == undefined ){
		this.drill_MPFC_initSysData();
	}
	
};


//=============================================================================
// * 窗口字符转换
//=============================================================================
//==============================
// * 窗口字符转换 - 组合符
//==============================
var _drill_MPFC_COWC_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_MPFC_COWC_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	
	if( command == "dMPFCstart" ){		// \\dMPFCstart[1]
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			this.drill_COWC_charSubmit_Effect( 0, 0 );
			if( this.drill_COWA_isCalculating() == true ){ return; }
			
			// > 排除 说明窗口 内部的字符
			if( this instanceof Drill_MPFC_Window ){ return; }
			
			$gameTemp._drill_MPFC_startPush = true;
			$gameTemp._drill_MPFC_curContextId = temp1;
		}
	}
	//（注意，\dMPFCend 不能用 args.length == 0 设置）
}
//==============================
// * 窗口字符转换 - 简单符
//==============================
var _drill_MPFC_COWC_processNewEffectChar_Simple = Window_Base.prototype.drill_COWC_processNewEffectChar_Simple;
Window_Base.prototype.drill_COWC_processNewEffectChar_Simple = function( matched_index, command ){
	_drill_MPFC_COWC_processNewEffectChar_Simple.call( this, matched_index, command );
	
	if( command == "dMPFCend" ){
		this.drill_COWC_charSubmit_Effect( 0, 0 );
		if( this.drill_COWA_isCalculating() == true ){ return; }
		
		$gameTemp._drill_MPFC_startPush = false;
		$gameTemp._drill_MPFC_curContextId = -1;
	}
}

//=============================================================================
// ** 字符块贴图容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_MPFC_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_MPFC_temp_initialize.call(this);
	this._drill_MPFC_spriteTank = [];				//字符块贴图容器
	this._drill_MPFC_startPush = false;				//容器开始加入标记
	this._drill_MPFC_curContextId = -1;				//对应的内容
};
//==============================
// * 容器 - 添加字符块（继承）
//==============================
var _drill_MPFC_COWC_addSprite_Private = Window_Base.prototype.drill_COWC_addSprite_Private;
Window_Base.prototype.drill_COWC_addSprite_Private = function( tar_sprite ){
	_drill_MPFC_COWC_addSprite_Private.call( this, tar_sprite );
	
	// > 窗口字符包裹情况
	if( $gameTemp._drill_MPFC_startPush != true ){ return; }
	
	// > 排除添加失败情况
	if( this._drill_COWC_spriteTank == undefined ){ return; }
	if( this.drill_COWA_isCalculating() == true ){ return; }	//（计算宽度时，禁止添加字符块）
	if( tar_sprite._drill_COWC_destroyed == true ){ return; }
	
	// > 创建
	var bind = DrillUp.g_MPFC_list[ $gameTemp._drill_MPFC_curContextId -1 ];
	tar_sprite._drill_MPFC_bean = new Drill_MPFC_Bean();
	tar_sprite._drill_MPFC_bean.drill_MPFC_resetFrame( 0,0,tar_sprite.bitmap.width,tar_sprite.bitmap.height );
	tar_sprite._drill_MPFC_bean.drill_MPFC_setContextList( bind['context'] );
	tar_sprite._drill_MPFC_bean.drill_MPFC_setSkinStyle( bind['style_mode'], bind['style_lockedId'] );
	
	// > 添加到容器
	$gameTemp._drill_MPFC_spriteTank.push( tar_sprite );
};
//==============================
// * 容器 - 帧刷新
//==============================
Scene_Map.prototype.drill_MPFC_updateSprite = function(){
	
	// > 从容器中去除
	for(var i = $gameTemp._drill_MPFC_spriteTank.length-1; i >= 0; i-- ){
		var temp_sprite = $gameTemp._drill_MPFC_spriteTank[i];
		if( temp_sprite == undefined ){
			$gameTemp._drill_MPFC_spriteTank.splice( i, 1 );
		}
		if( temp_sprite._drill_COWC_destroyed == true ){
			$gameTemp._drill_MPFC_spriteTank.splice( i, 1 );
		}
		if( temp_sprite._drill_MPFC_bean == undefined ){
			$gameTemp._drill_MPFC_spriteTank.splice( i, 1 );
		}
	}
	
	// > 帧刷新实体类
	for( var i=0; i < $gameTemp._drill_MPFC_spriteTank.length; i++ ){
		var temp_sprite = $gameTemp._drill_MPFC_spriteTank[i];
		var bean = temp_sprite._drill_MPFC_bean;
		var ww = bean._drill_frameW;
		var hh = bean._drill_frameH;
		var xx = temp_sprite.drill_MPFC_getAbsoluteX() - ww*temp_sprite.anchor.x;
		var yy = temp_sprite.drill_MPFC_getAbsoluteY() - hh*temp_sprite.anchor.y;
		bean.drill_MPFC_setPosition( xx, yy );
	}
};
//==============================
// * 容器 - 帧刷新 - 地图界面
//==============================
var _drill_MPFC_mapTank_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_drill_MPFC_mapTank_update.call(this);
	this.drill_MPFC_updateSprite();
};
//==============================
// * 容器 - 帧刷新 - 战斗界面
//==============================
var _drill_MPFC_battleTank_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	_drill_MPFC_battleTank_update.call(this);
	this.drill_MPFC_updateSprite();
};
Scene_Battle.prototype.drill_MPFC_updateSprite = Scene_Map.prototype.drill_MPFC_updateSprite;
//==============================
// * 容器 - 帧刷新 - 菜单界面
//==============================
var _drill_MPFC_menuTank_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function(){
	_drill_MPFC_menuTank_update.call(this);
	this.drill_MPFC_updateSprite();
};
Scene_MenuBase.prototype.drill_MPFC_updateSprite = Scene_Map.prototype.drill_MPFC_updateSprite;
//==============================
// * 容器 - 销毁 - 地图界面
//==============================
var _drill_MPFC_mapTank_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function(){
	_drill_MPFC_mapTank_terminate.call(this);
	$gameTemp._drill_MPFC_spriteTank = [];
};
//==============================
// * 容器 - 销毁 - 战斗界面
//==============================
var _drill_MPFC_battleTank_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function(){
	_drill_MPFC_battleTank_terminate.call(this);
	$gameTemp._drill_MPFC_spriteTank = [];
};
//==============================
// * 容器 - 销毁 - 菜单界面
//==============================
var _drill_MPFC_menuTank_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function(){
	_drill_MPFC_menuTank_terminate.call(this);
	$gameTemp._drill_MPFC_spriteTank = [];
};
//==============================
// * 贴图 - 获取绝对坐标X（依次累加父类位置）
//==============================
Sprite.prototype.drill_MPFC_getAbsoluteX = function(){
    var x = 0;
    var object = this;
    while( object != undefined ){
        x += object.x;
        object = object.parent;
		if( isNaN(x) ){ break; }
    }
    return x;
};
//==============================
// * 贴图 - 获取绝对坐标Y（依次累加父类位置）
//==============================
Sprite.prototype.drill_MPFC_getAbsoluteY = function(){
    var y = 0;
    var object = this;
    while( object != undefined ){
        y += object.y;
        object = object.parent;
		if( isNaN(y) ){ break; }
    }
    return y;
};


//=============================================================================
// ** 字符块的说明窗口 实体类【Drill_MPFC_Bean】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个专门的实体类数据类。
// **		子功能：	->无帧刷新
// **					->重设数据
// **						->序列号
// **		
// **		说明：	> 该类没有帧刷新，只能被动赋值。
//=============================================================================
//==============================
// * 实体类 - 定义
//==============================
function Drill_MPFC_Bean(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 实体类 - 初始化
//==============================
Drill_MPFC_Bean.prototype.initialize = function(){
	this._drill_beanSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_initPrivateData();										//私有数据初始化
};
//##############################
// * 实体类 - 设置可见【开放函数】
//			
//			参数：	> visible 布尔
//			返回：	> 无
//##############################
Drill_MPFC_Bean.prototype.drill_MPFC_setVisible = function( visible ){
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
Drill_MPFC_Bean.prototype.drill_MPFC_setPosition = function( x, y ){
	this._drill_x = x;
	this._drill_y = y;
};
//##############################
// * 实体类 - 设置框架数据【开放函数】
//			
//			参数：	> frameX,frameY,frameW,frameH 矩形对象
//			返回：	> 无
//			
//			说明：	> 被动赋值，见 字符块 的创建函数。
//##############################
Drill_MPFC_Bean.prototype.drill_MPFC_resetFrame = function( frameX, frameY, frameW, frameH ){
	this._drill_frameX = frameX;
	this._drill_frameY = frameY;
	this._drill_frameW = frameW;
	this._drill_frameH = frameH;
};
//##############################
// * 实体类 - 设置皮肤样式【开放函数】
//			
//			参数：	> styleMode 字符串（默认皮肤样式/锁定皮肤样式）
//					> styleLockedId 数字
//			返回：	> 无
//##############################
Drill_MPFC_Bean.prototype.drill_MPFC_setSkinStyle = function( styleMode, styleLockedId ){
	this._drill_styleMode = styleMode;
	this._drill_styleLockedId = styleLockedId;
};
//##############################
// * 实体类 - 设置内容【开放函数】
//			
//			参数：	> contextList 字符串列表
//			返回：	> 无
//##############################
Drill_MPFC_Bean.prototype.drill_MPFC_setContextList = function( contextList ){
	this._drill_contextList = contextList;
	this.drill_MPFC_refreshContext();
};
//##############################
// * 实体类 - 刷新内容【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_MPFC_Bean.prototype.drill_MPFC_refreshContext = function(){
	this._drill_contextSerial = new Date().getTime() + Math.random();	//（文本变化标记）
};
//==============================
// * 初始化 - 私有数据初始化
//==============================
Drill_MPFC_Bean.prototype.drill_initPrivateData = function(){
	
	this._drill_visible = true;				//实体类 - 可见
	
	this._drill_x = 0;						//实体类 - 位置X
	this._drill_y = 0;						//实体类 - 位置Y
	
	this._drill_frameX = 0;					//实体类 - 框架X
	this._drill_frameY = 0;					//实体类 - 框架Y
	this._drill_frameW = 0;					//实体类 - 框架宽度
	this._drill_frameH = 0;					//实体类 - 框架高度
	
	this._drill_contextList = [];			//实体类 - 当前文本
	
	this._drill_styleMode = "默认皮肤样式";								//实体类 - 绑定的模式
	this._drill_styleLockedId = $gameSystem._drill_MPFC_defaultStyle;	//实体类 - 锁定皮肤样式
	
	this._drill_contextSerial = new Date().getTime() + Math.random();	//（文本变化标记）
};



//#############################################################################
// ** 【标准模块】地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_MPFC_layerAddSprite = function( sprite, layer_index ){
    this.drill_MPFC_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_MPFC_layerRemoveSprite = function( sprite ){
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
Scene_Map.prototype.drill_MPFC_sortByZIndex = function () {
    this.drill_MPFC_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_MPFC_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MPFC_layer_createAllWindows.call(this);		//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_MPFC_sortByZIndex_Private = function() {
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_MPFC_layerAddSprite_Private = function( sprite, layer_index ){
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
var _drill_MPFC_smap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_MPFC_smap_createAllWindows.call(this);
	
	if( this._drill_MPFC_window == undefined ){		//只建立一个窗口
		this._drill_MPFC_window = new Drill_MPFC_Window( "Scene_Map" );
		
		// > 记录层级
		this._drill_MPFC_curZIndex = this._drill_MPFC_window.zIndex;
		
		this.drill_MPFC_layerAddSprite( this._drill_MPFC_window, "最顶层" );
		this.drill_MPFC_sortByZIndex();
	}
};
//==============================
// * 地图界面 - 说明窗口层级变化
//==============================
var _drill_MPFC_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_drill_MPFC_smap_update.call(this);
	
	// > 图片层级
	if( this._drill_MPFC_curZIndex != this._drill_MPFC_window.zIndex ){
		this._drill_MPFC_curZIndex = this._drill_MPFC_window.zIndex;
		this.drill_MPFC_sortByZIndex();
	}
};


//#############################################################################
// ** 【标准模块】战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Battle.prototype.drill_MPFC_layerAddSprite = function( sprite, layer_index ){
    this.drill_MPFC_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Battle.prototype.drill_MPFC_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_MPFC_sortByZIndex = function () {
    this.drill_MPFC_sortByZIndex_Private();
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_MPFC_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MPFC_battle_createAllWindows.call(this);		//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_MPFC_sortByZIndex_Private = function() {
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_MPFC_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
};
//=============================================================================
// ** 战斗界面
//=============================================================================
//==============================
// * 战斗界面 - 创建说明窗口
//==============================
var _drill_MPFC_sbattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function(){
	_drill_MPFC_sbattle_createAllWindows.call(this);
	
	if( this._drill_MPFC_window == undefined ){		//只建立一个窗口
		this._drill_MPFC_window = new Drill_MPFC_Window( "Scene_Battle" );
		
		// > 记录层级
		this._drill_MPFC_curZIndex = this._drill_MPFC_window.zIndex;
		
		this.drill_MPFC_layerAddSprite( this._drill_MPFC_window, "最顶层" );
		this.drill_MPFC_sortByZIndex();
	}
};
//==============================
// * 战斗界面 - 说明窗口层级变化
//==============================
var _drill_MPFC_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	_drill_MPFC_sbattle_update.call(this);
	
	// > 图片层级
	if( this._drill_MPFC_curZIndex != this._drill_MPFC_window.zIndex ){
		this._drill_MPFC_curZIndex = this._drill_MPFC_window.zIndex;
		this.drill_MPFC_sortByZIndex();
	}
};


//#############################################################################
// ** 【标准模块】菜单层级
//#############################################################################
//##############################
// * 菜单层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，菜单后面层/菜单前面层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_MenuBase.prototype.drill_MPFC_layerAddSprite = function( sprite, layer_index ){
    this.drill_MPFC_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 菜单层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_MenuBase.prototype.drill_MPFC_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 菜单层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_MenuBase.prototype.drill_MPFC_sortByZIndex = function () {
    this.drill_MPFC_sortByZIndex_Private();
}
//=============================================================================
// ** 菜单层级（接口实现）
//=============================================================================
//==============================
// * 菜单层级 - 最顶层
//==============================
var _drill_MPFC_menuLayer_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MPFC_menuLayer_update.call(this);
	
	if(!this._backgroundSprite ){		//菜单后面层（防止覆写报错）
		this._backgroundSprite = new Sprite();
	}
	if(!this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);	
	}
}
//==============================
// * 菜单层级 - 图片层级排序（私有）
//==============================
Scene_MenuBase.prototype.drill_MPFC_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单层级 - 添加贴图到层级（私有）
//==============================
Scene_MenuBase.prototype.drill_MPFC_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "菜单后面层" || layer_index === 0 ){
		this._backgroundSprite.addChild( sprite );
	}
	if( layer_index == "菜单前面层" || layer_index === 1 ){
		this._foregroundSprite.addChild( sprite );
	}
};
//=============================================================================
// ** 菜单界面
//=============================================================================
//==============================
// * 菜单界面 - 创建说明窗口
//==============================
var _drill_MPFC_menu_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MPFC_menu_update.call(this);
	
	if( this._drill_MPFC_window == undefined ){		//只建立一个窗口
		this._drill_MPFC_window = new Drill_MPFC_Window( "Scene_MenuBase" );
		
		// > 记录层级
		this._drill_MPFC_curZIndex = this._drill_MPFC_window.zIndex;
		
		this.drill_MPFC_layerAddSprite( this._drill_MPFC_window, "菜单前面层" );
		this.drill_MPFC_sortByZIndex();
	}
	
	// > 图片层级
	if( this._drill_MPFC_curZIndex != this._drill_MPFC_window.zIndex ){
		this._drill_MPFC_curZIndex = this._drill_MPFC_window.zIndex;
		this.drill_MPFC_sortByZIndex();
	}
};


//=============================================================================
// ** 字符块的说明窗口【Drill_MPFC_Window】
//			
//			索引：	无
//			来源：	继承于Window_Base
//			实例：	Scene_Map、Scene_Battle、Scene_MenuBase下的 _drill_MPFC_window 成员
//			应用：	暂无 
//			
//			作用域：	地图界面、战斗界面、菜单界面
//			主功能：	定义一个窗口，能随时改变内容和高宽，用于描述字符块的信息。
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
// * 字符块的说明窗口 - 定义
//==============================
function Drill_MPFC_Window() {
    this.initialize.apply(this, arguments);
};
Drill_MPFC_Window.prototype = Object.create(Window_Base.prototype);
Drill_MPFC_Window.prototype.constructor = Drill_MPFC_Window;
//==============================
// * 字符块的说明窗口 - 初始化
//==============================
Drill_MPFC_Window.prototype.initialize = function( curScene_str ){
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	this._drill_curScene = curScene_str;
	
	this.drill_initPrivateData();		//初始化数据
	this.drill_initSkin();				//初始化窗口皮肤
};
//==============================
// * 字符块的说明窗口 - 帧刷新
//==============================
Drill_MPFC_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	this.drill_updateContext();			//帧刷新 - 内容
	this.drill_updatePosition();		//帧刷新 - 位置
	this.drill_updateSkin();			//帧刷新 - 窗口皮肤
}
//==============================
// * 字符块的说明窗口 - 窗口属性
//==============================
Drill_MPFC_Window.prototype.lineHeight = function(){ return DrillUp.g_MPFC_lineheight; };			//窗口行间距
Drill_MPFC_Window.prototype.standardPadding = function(){ return DrillUp.g_MPFC_padding; };			//窗口内边距
Drill_MPFC_Window.prototype.standardFontSize = function(){ return DrillUp.g_MPFC_fontsize; };		//窗口字体大小
//==============================
// * 字符块的说明窗口 - 初始化数据
//==============================
Drill_MPFC_Window.prototype.drill_initPrivateData = function() {
	
	// > 私有属性初始化
	this._drill_width = 0;
	this._drill_height = 0;
	this._drill_curBeanSerial = -1;
	this._drill_curStyleId = -1;
	
	// > 当前样式
	this._drill_curStyleId = DrillUp.g_MPFC_defaultStyle;
	this._drill_curData = DrillUp.g_MPFC_style_list[ this._drill_curStyleId -1 ];
	
	// > 中心锚点
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( this._drill_curData['anchor'] == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( this._drill_curData['anchor'] == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	if( this._drill_curData['anchor'] == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( this._drill_curData['anchor'] == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
	
	// > 图片层级
	if( this._drill_curScene == "Scene_Battle" ){
		this.zIndex = this._drill_curData['battle_zIndex'];
	}
	if( this._drill_curScene == "Scene_Map" ){
		this.zIndex = this._drill_curData['map_zIndex'];
	}
	if( this._drill_curScene == "Scene_MenuBase" ){
		this.zIndex = this._drill_curData['menu_zIndex'];
	}
	
	// > 窗口内容刷新
	this.createContents();
    this.contents.clear();
}
//==============================
// * 字符块的说明窗口 - 帧刷新样式
//==============================
Drill_MPFC_Window.prototype.drill_refreshStyle = function( style_id ){
	this._drill_curStyleId = style_id;
	this._drill_curData = DrillUp.g_MPFC_style_list[ this._drill_curStyleId -1 ];
	
	// > 中心锚点
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( this._drill_curData['anchor'] == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( this._drill_curData['anchor'] == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	if( this._drill_curData['anchor'] == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( this._drill_curData['anchor'] == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
	
	// > 图片层级
	if( this._drill_curScene == "Scene_Battle" ){
		this.zIndex = this._drill_curData['battle_zIndex'];
	}
	if( this._drill_curScene == "Scene_Map" ){
		this.zIndex = this._drill_curData['map_zIndex'];
	}
	if( this._drill_curScene == "Scene_MenuBase" ){
		this.zIndex = this._drill_curData['menu_zIndex'];
	}
	
	// > 重设数据
	this.drill_resetSkinData( this._drill_curData );
}
//==============================
// * 字符块的说明窗口 - 帧刷新位置
//==============================
Drill_MPFC_Window.prototype.drill_updatePosition = function() {
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
				//（最顶层不操作）
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
Drill_MPFC_Window.prototype.drill_updateContext = function() {
	
	// > 实体类容器遍历
	for( var i=0; i < $gameTemp._drill_MPFC_spriteTank.length; i++ ){
		var temp_sprite = $gameTemp._drill_MPFC_spriteTank[i];
		var bean = temp_sprite._drill_MPFC_bean;
		
		if( this.drill_canVisible(bean) ){
			this.visible = true;
			
			// > 切换实体类时，刷新内容
			if( this._drill_curBeanSerial != bean._drill_contextSerial ){
				this._drill_curBeanSerial = bean._drill_contextSerial;
				this.drill_refreshMessage( bean._drill_contextList );
			}
			
			// > 切换样式时，刷新窗口
			//		（分为 默认全局的样式，bean中 指定的样式）
			var style_id = $gameSystem._drill_MPFC_defaultStyle;
			if( bean._drill_styleMode == "锁定皮肤样式" ){
				style_id = bean._drill_styleLockedId;
			}
			if( this._drill_curStyleId != style_id ){
				this._drill_curStyleId = style_id;
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
// * 内容 - 显示条件
//==============================
Drill_MPFC_Window.prototype.drill_canVisible = function( bean ){
	if( bean['_drill_visible'] == false ){ return false; }
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( this._drill_curData['mouseType'] == "触屏按下[持续]" ){
		_x = TouchInput.x;
		_y = TouchInput.y;
	}
	
	// （不考虑鼠标镜头的落点位置）
	
	if( _x > bean['_drill_x'] + bean['_drill_frameW'] ){ return false; }
	if( _x < bean['_drill_x'] + 0 ){ return false; }
	if( _y > bean['_drill_y'] + bean['_drill_frameH'] ){ return false; }
	if( _y < bean['_drill_y'] + 0 ){ return false; }
	return true;
}
//==============================
// * 内容 - 鼠标激活方式
//==============================
Drill_MPFC_Window.prototype.drill_isMouseControl = function( bean ){
	if( this._drill_curData['mouseType'] == "鼠标左键按下[持续]" ){
		if( TouchInput.drill_isLeftPressed() ){ return true; }else{ return false; }
	}else if( this._drill_curData['mouseType'] == "鼠标滚轮按下[持续]" ){
		if( TouchInput.drill_isMiddlePressed() ){ return true; }else{ return false; }
	}else if( this._drill_curData['mouseType'] == "鼠标右键按下[持续]" ){
		if( TouchInput.drill_isRightPressed() ){ return true; }else{ return false; }
	}else if( this._drill_curData['mouseType'] == "触屏按下[持续]" ){
		if( TouchInput.isPressed() ){ return true; }else{ return false; }
	}
	return true;
}
//==============================
// * 内容 - 刷新内容
//==============================
Drill_MPFC_Window.prototype.drill_refreshMessage = function( context_list ){
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
	ww += $gameSystem._drill_MPFC_ex_width || 0;		//（附加高宽）
	hh += $gameSystem._drill_MPFC_ex_height || 0;
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
Drill_MPFC_Window.prototype.drill_initSkin = function() {
	
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
Drill_MPFC_Window.prototype.drill_resetSkinData = function( data ){
	
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
Drill_MPFC_Window.prototype.drill_updateSkin = function() {
	
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
var _drill_MPFC_updateTone = Drill_MPFC_Window.prototype.updateTone;
Drill_MPFC_Window.prototype.updateTone = function() {
	if( this._drill_skin_tone_lock == true ){
		this.setTone( this._drill_skin_tone_r, this._drill_skin_tone_g, this._drill_skin_tone_b );
		return;
	}
	_drill_MPFC_updateTone.call( this );
}
	
	
	
//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MiniPlateForChar = false;
		alert(
			"【Drill_MiniPlateForChar.js 鼠标 - 字符块的说明窗口】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心"+
			"\n- Drill_CoreOfWindowCharacter 窗口字符-窗口字符核心"
		);
}


