//=============================================================================
// Drill_DialogBubble.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        对话框 - 气泡对话框
 * @author Drill_up
 * 
 * @Drill_LE_param "气泡样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DBu_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_DialogBubble +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以把对话框变成气泡效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter      窗口字符-窗口字符核心
 *   - Drill_DialogOperator             对话框-对话框变形器
 *   - Drill_DialogSkin                 对话框-对话框皮肤
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于对话框和其子窗口。
 * 2.详细内容和图解，去看看 "15.对话框 > 关于对话框气泡效果.docx"。
 * 细节：
 *   (1.气泡效果 = 变形器+皮肤+文本宽度变化+绑定位置+气泡尖角贴图
 *   (2.气泡框基于对话框皮肤，同样能支持子窗口皮肤的设置。
 *   (3.注意参数 气泡间距 与 尖角贴图偏移 的区别。
 *      详细可以去看看文档的图解。
 * 设计：
 *   (1.你可以设计自定义样式的气泡框，让地图界面、战斗界面的对象
 *      说话。气泡框的本质是对话框，因此也能像对话框一样先后说话。
 *   (2.很高的行走图、战斗敌人、战斗角色、图片也都支持气泡框位置绑定。
 *      但由于这些图像很高，你需要用"锁定气泡间距"来随时调整气泡高度。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui_message （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui_message文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 气泡样式1 资源-气泡尖角贴图
 * 气泡样式2 资源-气泡尖角贴图
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 样式
 * 你可以通过插件指令手动修改样式：
 * 
 * 插件指令：>气泡对话框 : 切换样式 : 气泡样式[1]
 * 插件指令：>气泡对话框 : 关闭样式
 * 
 * 1.修改气泡样式后，立即生效，且永久有效。
 *   你可以在角色对话时随时切换变形形状。
 * 2.注意，气泡框样式会覆盖 对话框变形器 和 对话框皮肤 的样式。
 *   "关闭样式"后，才能复原样式。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 气泡位置
 * 你可以通过插件指令手动控制气泡位置：
 * 
 * 插件指令：>气泡对话框 : 设置气泡位置-玩家 : 玩家领队
 * 插件指令：>气泡对话框 : 设置气泡位置-玩家 : 玩家队员[1]
 * 插件指令：>气泡对话框 : 设置气泡位置-玩家 : 玩家队员变量[21]
 * 插件指令：>气泡对话框 : 设置气泡位置-事件 : 本事件
 * 插件指令：>气泡对话框 : 设置气泡位置-事件 : 事件[10]
 * 插件指令：>气泡对话框 : 设置气泡位置-事件 : 事件变量[21]
 * 插件指令：>气泡对话框 : 设置气泡位置-战斗敌人 : 战斗敌人[1]
 * 插件指令：>气泡对话框 : 设置气泡位置-战斗敌人 : 战斗敌人变量[21]
 * 插件指令：>气泡对话框 : 设置气泡位置-战斗角色 : 战斗角色[1]
 * 插件指令：>气泡对话框 : 设置气泡位置-战斗角色 : 战斗角色变量[21]
 * 插件指令：>气泡对话框 : 设置气泡位置-图片 : 图片[1]
 * 插件指令：>气泡对话框 : 设置气泡位置-图片 : 图片变量[21]
 * 插件指令：>气泡对话框 : 设置气泡位置-鼠标
 * 插件指令：>气泡对话框 : 去除气泡位置绑定
 * 
 * 1."玩家队员[0]"的指令无效。
 *   "玩家队员[1]"中，-2表示领队，1表示第一个跟随者。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 气泡偏移值
 * 你需要通过下面插件指令来设置偏移坐标：
 * 
 * 插件指令：>气泡对话框 : 设置气泡偏移值 : 偏移[+100,-100]
 * 插件指令：>气泡对话框 : 设置气泡偏移值 : 偏移变量[25,26]
 * 
 * 1.默认气泡偏移值为0,0，气泡偏移值是指在绑定点的基础上，绑定点的偏移值。
 *   此参数与 气泡间距 有区别。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 锁定气泡间距
 * 你需要通过下面插件指令来设置偏移坐标：
 * 
 * 插件指令：>气泡对话框 : 锁定气泡间距 : 间距值[100]
 * 插件指令：>气泡对话框 : 解锁气泡间距
 * 
 * 1."锁定气泡间距"是指，无视气泡样式设置的气泡间距，单独改气泡间距值。
 *   此功能可用于 很高的行走图、战斗敌人、战斗角色、图片，
 *   因为气泡要定位悬浮在目标头上，目标可能会很高，需要调整气泡间距。
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
 * 测试方法：   在对话框管理层和战斗界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【16.80ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只需要监听切换皮肤演示和气泡尖角贴图，消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了上下翻转开关的功能。
 * 
 * 
 * 
 * @param ---气泡样式集---
 * @default
 *
 * @param 气泡样式-1
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-2
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-3
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-4
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-5
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-6
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-7
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-8
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-9
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-10
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-11
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-12
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-13
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-14
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-15
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-16
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-17
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-18
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-19
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-20
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-21
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-22
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-23
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-24
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-25
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-26
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-27
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-28
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-29
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-30
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-31
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-32
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-33
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-34
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-35
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-36
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-37
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-38
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-39
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default 
 * 
 * @param 气泡样式-40
 * @parent ---气泡样式集---
 * @type struct<DrillDBuStyle>
 * @desc 对话框相关窗口的气泡样式配置。
 * @default
 * 
 */
/*~struct~DrillDBuStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的气泡样式==
 * 
 * 
 * @param ---常规---
 * @default 
 * 
 * @param 气泡间距
 * @parent ---常规---
 * @type number
 * @min 0
 * @desc 绑定对象后，气泡距离对象的间距高度。
 * @default 5
 *
 * @param 是否开启自动上下翻转
 * @parent ---常规---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。在指定位置时会上下翻转。
 * @default true
 * 
 * 
 * @param ---窗口矩形---
 * @default 
 * 
 * @param 宽度模式
 * @parent ---窗口矩形---
 * @type select
 * @option 与最长文本宽度一致
 * @value 与最长文本宽度一致
 * @option 使用自定义值
 * @value 使用自定义值
 * @desc 窗口宽度的模式。具体介绍去看看"15.对话框 > 关于对话框变形器.docx"。
 * @default 与最长文本宽度一致
 * 
 * @param 宽度自定义值
 * @parent 宽度模式
 * @type number
 * @min 20
 * @desc 如果宽度模式为"使用自定义值"，对话框所用的宽度值。
 * @default 816
 * 
 * @param 高度模式
 * @parent ---窗口矩形---
 * @type select
 * @option 使用自定义行数的高度
 * @value 使用自定义行数的高度
 * @option 自适应1至4行数的高度
 * @value 自适应1至4行数的高度
 * @option 使用自定义值
 * @value 使用自定义值
 * @desc 窗口高度的模式。具体介绍去看看"15.对话框 > 关于对话框变形器.docx"。
 * @default 自适应1至4行数的高度
 * 
 * @param 默认自定义行数
 * @parent 高度模式
 * @type number
 * @min 1
 * @desc 如果宽度模式为"使用自定义行数的高度"，对话框所用的行数。
 * @default 2
 * 
 * @param 高度自定义值
 * @parent 高度模式
 * @type number
 * @min 20
 * @desc 如果宽度模式为"使用自定义值"，对话框所用的高度值。
 * @default 192
 * 
 * 
 * @param ---窗口皮肤---
 * @default 
 *
 * @param 是否切换皮肤-对话框
 * @parent ---窗口皮肤---
 * @type boolean
 * @on 切换
 * @off 不操作
 * @desc true - 切换，false - 不操作。启用气泡后将切换到指定窗口皮肤。
 * @default false
 *
 * @param 皮肤样式-对话框
 * @parent 是否切换皮肤-对话框
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 *
 * @param 是否切换皮肤-对话框金钱窗口
 * @parent ---窗口皮肤---
 * @type boolean
 * @on 切换
 * @off 不操作
 * @desc true - 切换，false - 不操作。启用气泡后将切换到指定窗口皮肤。
 * @default false
 *
 * @param 皮肤样式-对话框金钱窗口
 * @parent 是否切换皮肤-对话框金钱窗口
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 *
 * @param 是否切换皮肤-对话框选择项窗口
 * @parent ---窗口皮肤---
 * @type boolean
 * @on 切换
 * @off 不操作
 * @desc true - 切换，false - 不操作。启用气泡后将切换到指定窗口皮肤。
 * @default false
 *
 * @param 皮肤样式-对话框选择项窗口
 * @parent 是否切换皮肤-对话框选择项窗口
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 *
 * @param 是否切换皮肤-对话框数字输入窗口
 * @parent ---窗口皮肤---
 * @type boolean
 * @on 切换
 * @off 不操作
 * @desc true - 切换，false - 不操作。启用气泡后将切换到指定窗口皮肤。
 * @default false
 *
 * @param 皮肤样式-对话框数字输入窗口
 * @parent 是否切换皮肤-对话框数字输入窗口
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 *
 * @param 是否切换皮肤-对话框选择物品窗口
 * @parent ---窗口皮肤---
 * @type boolean
 * @on 切换
 * @off 不操作
 * @desc true - 切换，false - 不操作。启用气泡后将切换到指定窗口皮肤。
 * @default false
 *
 * @param 皮肤样式-对话框选择物品窗口
 * @parent 是否切换皮肤-对话框选择物品窗口
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 *
 * @param 是否切换皮肤-对话框姓名框窗口
 * @parent ---窗口皮肤---
 * @type boolean
 * @on 切换
 * @off 不操作
 * @desc true - 切换，false - 不操作。启用气泡后将切换到指定窗口皮肤。
 * @default false
 * 
 * @param 皮肤样式-对话框姓名框窗口
 * @parent 是否切换皮肤-对话框姓名框窗口
 * @type number
 * @min 1
 * @desc 窗口默认使用的皮肤样式。
 * @default 1
 * 
 * 
 * @param ---气泡尖角贴图---
 * @default 
 * 
 * @param 偏移-气泡尖角贴图 X
 * @parent ---气泡尖角贴图---
 * @desc 以绑定对象的位置为基准，x轴方向平移，正右负左，单位像素。
 * @default 0
 * 
 * @param 偏移-气泡尖角贴图 Y
 * @parent ---气泡尖角贴图---
 * @desc 以绑定对象的位置为基准，y轴方向平移，正下负上，单位像素。
 * @default 0
 * 
 * @param 资源-气泡尖角贴图
 * @parent ---气泡尖角贴图---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default []
 * @require 1
 * @dir img/Menu__ui_message/
 * @type file[]
 * 
 * @param 帧间隔
 * @parent ---气泡尖角贴图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---气泡尖角贴图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放，gif的播放顺序。
 * @default false
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DBu（Dialog_Operator）
//		临时全局变量	无
//		临时局部变量	this._drill_DBu_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	对话框管理层
//		★性能测试消耗	2025/7/27：
//							》16.8ms（Drill_DBu_DecorationSprite.update）2.2ms（drill_DBu_updateAllPos）
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
//			->☆存储数据
//			->☆战斗层级
//			->☆场景容器之单位贴图
//			
//			->☆绑定位置控制
//			->☆气泡框皮肤
//			->☆气泡框矩形
//			
//			->☆气泡尖角贴图控制
//			->气泡尖角贴图【Drill_DBu_DecorationSprite】
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.
//
//		★其它说明细节：
//			无
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
	DrillUp.g_DBu_PluginTip_curName = "Drill_DialogBubble.js 对话框-对话框变形器";
	DrillUp.g_DBu_PluginTip_baseList = [
		"Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心",
		"Drill_DialogOperator.js 对话框-对话框变形器",
		"Drill_DialogSkin.js 对话框-对话框皮肤"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DBu_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DBu_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DBu_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DBu_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DBu_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogBubble = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogBubble');

	//==============================
	// * 静态数据 - 样式
	//				（~struct~DrillDBuStyle）
	//==============================
	DrillUp.drill_DBu_initStyle = function( dataFrom ){
		var data = {};
		
		// > 常规
		data['bubble_space'] = Number( dataFrom["气泡间距"] || 0);
		data['bubble_convertEnabled'] = String( dataFrom["是否开启自动上下翻转"] || "true") == "true";
		
		
		// > 窗口矩形 - 位置
		data['x_mode'] = "使用自定义值";
		data['x_value'] = 0;
		data['y_mode'] = "使用自定义值";
		data['y_value'] = 0;
		
		// > 窗口矩形 - 高宽
		data['width_mode'] = String( dataFrom["宽度模式"] || "与最长文本宽度一致");
		data['width_value'] = Number( dataFrom["宽度自定义值"] || 816);
		data['height_mode'] = String( dataFrom["高度模式"] || "自适应1至4行数的高度");
		data['height_rowCount'] = Number( dataFrom["默认自定义行数"] || 2);
		data['height_value'] = Number( dataFrom["高度自定义值"] || 192);
		
		
		// > 窗口皮肤
		//		（注意，只能使用id的方式进行皮肤关联，因为皮肤的贴图通过id进行自变化）
		//		（批量传参无法同步皮肤的贴图）
		data['skin_messageStyleEnabled'] = String( dataFrom["是否切换皮肤-对话框"] || "false") == "true";
		data['skin_messageStyleId'] = Number( dataFrom["皮肤样式-对话框"] || 1);
		data['skin_goldStyleEnabled'] = String( dataFrom["是否切换皮肤-对话框金钱窗口"] || "false") == "true";
		data['skin_goldStyleId'] = Number( dataFrom["皮肤样式-对话框金钱窗口"] || 1);
		data['skin_choiceStyleEnabled'] = String( dataFrom["是否切换皮肤-对话框选择项窗口"] || "false") == "true";
		data['skin_choiceStyleId'] = Number( dataFrom["皮肤样式-对话框选择项窗口"] || 1);
		data['skin_numberStyleEnabled'] = String( dataFrom["是否切换皮肤-对话框数字输入窗口"] || "false") == "true";
		data['skin_numberStyleId'] = Number( dataFrom["皮肤样式-对话框数字输入窗口"] || 1);
		data['skin_itemStyleEnabled'] = String( dataFrom["是否切换皮肤-对话框选择物品窗口"] || "false") == "true";
		data['skin_itemStyleId'] = Number( dataFrom["皮肤样式-对话框选择物品窗口"] || 1);
		data['skin_nameStyleEnabled'] = String( dataFrom["是否切换皮肤-对话框姓名框窗口"] || "false") == "true";
		data['skin_nameStyleId'] = Number( dataFrom["皮肤样式-对话框姓名框窗口"] || 1);
		
		
		// > 气泡尖角贴图
		data['position_x'] = Number( dataFrom["偏移-气泡尖角贴图 X"] || 0);
		data['position_y'] = Number( dataFrom["偏移-气泡尖角贴图 Y"] || 0);
		if( dataFrom["资源-气泡尖角贴图"] != "" &&
			dataFrom["资源-气泡尖角贴图"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-气泡尖角贴图"] );
		}else{
			data['gif_src'] = [];
		}
		data['gif_src_file'] = "img/Menu__ui_message/";
		data['gif_interval'] = Number( dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		
		return data;
	}
	/*-----------------样式集------------------*/
	DrillUp.g_DBu_list_length = 40;
	DrillUp.g_DBu_list = [];
	for( var i = 0; i < DrillUp.g_DBu_list_length; i++ ){
		if( DrillUp.parameters["气泡样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["气泡样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["气泡样式-" + String(i+1) ]);
			DrillUp.g_DBu_list[i] = DrillUp.drill_DBu_initStyle( data );
		}else{
			DrillUp.g_DBu_list[i] = null;
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter &&
	Imported.Drill_DialogOperator &&
	Imported.Drill_DialogSkin ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DBu_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DBu_pluginCommand.call(this, command, args);
	this.drill_DBu_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DBu_pluginCommand = function( command, args ){
	if( command === ">气泡对话框" ){
		
		/*-----------------样式------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "切换样式" ){
				temp1 = temp1.replace("气泡样式[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_DBu_curBubbleStyleId = Number(temp1)-1;
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "关闭样式" ){
				$gameSystem._drill_DBu_curBubbleStyleId = -1;			//（关闭样式）
				$gameSystem._drill_DBu_curBubbleSpaceLocked = false;	//（解锁气泡间距）
			}
		}
		
		/*-----------------设置气泡位置------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var unit = String(args[3]);
			if( type == "设置气泡位置-玩家" ){
				if( temp1 == "玩家领队" ){
					$gameSystem.drill_DBu_bindFollower( -2 );  //『玩家id』
				}else{
					if( temp1.indexOf("玩家队员变量[") != -1 ){
						temp1 = temp1.replace("玩家队员变量[","");
						temp1 = temp1.replace("]","");
						$gameSystem.drill_DBu_bindFollower( $gameVariables.value(Number(temp1)) );  //『玩家队员id』
					}else{
						temp1 = temp1.replace("玩家队员[","");
						temp1 = temp1.replace("]","");
						$gameSystem.drill_DBu_bindFollower( Number(temp1) );  //『玩家队员id』
					}
				}
			}
			if( type == "设置气泡位置-事件" ){
				if( temp1 == "本事件" ){
					$gameSystem.drill_DBu_bindEvent( this._eventId );
				}
				if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					var e_id = $gameVariables.value(Number(temp1));
					if( $gameMap.drill_DBu_isEventExist( e_id ) == true ){
						$gameSystem.drill_DBu_bindEvent( e_id );
					}
				}
				if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					var e_id = Number(temp1);
					if( $gameMap.drill_DBu_isEventExist( e_id ) == true ){
						$gameSystem.drill_DBu_bindEvent( e_id );
					}
				}
			}
			if( type == "设置气泡位置-战斗敌人" ){
				if( temp1.indexOf("战斗敌人变量[") != -1 ){
					temp1 = temp1.replace("战斗敌人变量[","");
					temp1 = temp1.replace("]","");
					$gameSystem.drill_DBu_bindEnemy( $gameVariables.value(Number(temp1)) );
				}
				if( temp1.indexOf("战斗敌人[") != -1 ){
					temp1 = temp1.replace("战斗敌人[","");
					temp1 = temp1.replace("]","");
					$gameSystem.drill_DBu_bindEnemy( Number(temp1) );
				}
			}
			if( type == "设置气泡位置-战斗角色" ){
				if( temp1.indexOf("战斗角色变量[") != -1 ){
					temp1 = temp1.replace("战斗角色变量[","");
					temp1 = temp1.replace("]","");
					$gameSystem.drill_DBu_bindActor( $gameVariables.value(Number(temp1)) );
				}
				if( temp1.indexOf("战斗角色[") != -1 ){
					temp1 = temp1.replace("战斗角色[","");
					temp1 = temp1.replace("]","");
					$gameSystem.drill_DBu_bindActor( Number(temp1) );
				}
			}
			if( type == "设置气泡位置-图片" ){
				if( temp1.indexOf("图片变量[") != -1 ){
					temp1 = temp1.replace("图片变量[","");
					temp1 = temp1.replace("]","");
					$gameSystem.drill_DBu_bindPic( $gameVariables.value(Number(temp1)) );
				}
				if( temp1.indexOf("图片[") != -1 ){
					temp1 = temp1.replace("图片[","");
					temp1 = temp1.replace("]","");
					$gameSystem.drill_DBu_bindPic( Number(temp1) );
				}
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "设置气泡位置-鼠标" ){
				$gameSystem.drill_DBu_bindMouse();
			}
			if( type == "去除气泡位置绑定" ){
				$gameSystem.drill_DBu_removeBind();
			}
		}
		
		/*-----------------设置气泡偏移值------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "设置气泡偏移值" ){
				if( temp1.indexOf("偏移变量[") != -1 ){
					temp1 = temp1.replace("偏移变量[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						$gameSystem.drill_DBu_bindOffsetPos(
							$gameVariables.value(Number(temp_arr[0])),
							$gameVariables.value(Number(temp_arr[1]))
						);
					}
				}else if( temp1.indexOf("偏移[") != -1 ){
					temp1 = temp1.replace("偏移[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						$gameSystem.drill_DBu_bindOffsetPos(
							Number(temp_arr[0]),
							Number(temp_arr[1])
						);
					}
				}
			}
		}
		
		/*-----------------锁定气泡间距------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "锁定气泡间距" ){
				temp1 = temp1.replace("间距值[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_DBu_curBubbleSpaceValue = Number(temp1);
				$gameSystem._drill_DBu_curBubbleSpaceLocked = true;
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "解锁气泡间距" ){
				$gameSystem._drill_DBu_curBubbleSpaceLocked = false;
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_DBu_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_DBu_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DBu_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DBu_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DBu_sys_initialize.call(this);
	this.drill_DBu_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DBu_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DBu_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DBu_saveEnabled == true ){	
		$gameSystem.drill_DBu_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DBu_initSysData();
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
Game_System.prototype.drill_DBu_initSysData = function() {
	this.drill_DBu_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DBu_checkSysData = function() {
	this.drill_DBu_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DBu_initSysData_Private = function() {
	
	this._drill_DBu_curBubbleStyleId = undefined;	//当前的样式ID
	
	this._drill_DBu_curBubbleCursorX = 0;			//当前绑定的位置X
	this._drill_DBu_curBubbleCursorY = 0;			//当前绑定的位置Y
	
	this._drill_DBu_curBubbleSpaceValue = 0;		//气泡间距
	this._drill_DBu_curBubbleSpaceLocked = false;	//是否锁定气泡间距
	
	
	this._drill_DBu_data = {};
	
	this._drill_DBu_data['bindPos_type'] = "";			//『实时绑定对象位置』绑定类型（玩家队员/事件/战斗敌人/战斗角色/图片/鼠标）
	this._drill_DBu_data['bindPos_offsetX'] = 0;		//『实时绑定对象位置』偏移位置X
	this._drill_DBu_data['bindPos_offsetY'] = 0;		//『实时绑定对象位置』偏移位置Y
	
	this._drill_DBu_data['bindPos_followerId'] = 0;		//『实时绑定对象位置』绑定 - 玩家队员（-2玩家/0无效/1第一个队员）
	this._drill_DBu_data['bindPos_eventId'] = 0;		//『实时绑定对象位置』绑定 - 事件
	this._drill_DBu_data['bindPos_enemyIndex'] = 0;		//『实时绑定对象位置』绑定 - 战斗敌人
	this._drill_DBu_data['bindPos_actorIndex'] = 0;		//『实时绑定对象位置』绑定 - 战斗角色
	this._drill_DBu_data['bindPos_picId'] = 0;			//『实时绑定对象位置』绑定 - 图片
	//（无）											//『实时绑定对象位置』绑定 - 鼠标
	
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DBu_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DBu_data == undefined ){
		this.drill_DBu_initSysData();
	}
};

//==============================
// * 存储数据 - 获取样式数据（开放函数）
//==============================
Game_System.prototype.drill_DBu_getCurBubbleStyle = function(){
	var style_id = this._drill_DBu_curBubbleStyleId;
	if( style_id == undefined ){ return null; }
	if( style_id < 0 ){ return null; }
	return DrillUp.g_DBu_list[ style_id ];
};
//==============================
// * 存储数据 - 是否正在绑定（开放函数）
//==============================
Game_System.prototype.drill_DBu_isPlayingBubble = function(){
	if( this._drill_DBu_curBubbleStyleId == undefined ){ return false; }	//没有样式，跳出
	if( this._drill_DBu_curBubbleStyleId < 0 ){ return false; }				//
	if( this._drill_DBu_data['bindPos_type'] == "" ){ return false; }		//没有绑定，跳出
	return true;
}
//==============================
// * 存储数据 - 『实时绑定对象位置』 设置偏移位置
//==============================
Game_System.prototype.drill_DBu_bindOffsetPos = function( offsetX, offsetY ){
	this._drill_DBu_data['bindPos_offsetX'] = offsetX;
	this._drill_DBu_data['bindPos_offsetY'] = offsetY;
}
//==============================
// * 存储数据 - 『实时绑定对象位置』 绑定 - 玩家队员
//==============================
Game_System.prototype.drill_DBu_bindFollower = function( follower_id ){
	this._drill_DBu_data['bindPos_type'] = "玩家队员";
	this._drill_DBu_data['bindPos_followerId'] = follower_id;
}
//==============================
// * 存储数据 - 『实时绑定对象位置』 绑定 - 事件
//==============================
Game_System.prototype.drill_DBu_bindEvent = function( event_id ){
	this._drill_DBu_data['bindPos_type'] = "事件";
	this._drill_DBu_data['bindPos_eventId'] = event_id;
}
//==============================
// * 存储数据 - 『实时绑定对象位置』 绑定 - 战斗敌人
//==============================
Game_System.prototype.drill_DBu_bindEnemy = function( enemy_Index ){
	this._drill_DBu_data['bindPos_type'] = "战斗敌人";
	this._drill_DBu_data['bindPos_enemyIndex'] = enemy_Index;
}
//==============================
// * 存储数据 - 『实时绑定对象位置』 绑定 - 战斗角色
//==============================
Game_System.prototype.drill_DBu_bindActor = function( actor_Index ){
	this._drill_DBu_data['bindPos_type'] = "战斗角色";
	this._drill_DBu_data['bindPos_actorIndex'] = actor_Index;
}
//==============================
// * 存储数据 - 『实时绑定对象位置』 绑定 - 图片
//==============================
Game_System.prototype.drill_DBu_bindPic = function( pic_id ){
	this._drill_DBu_data['bindPos_type'] = "图片";
	this._drill_DBu_data['bindPos_picId'] = pic_id;
}
//==============================
// * 存储数据 - 『实时绑定对象位置』 绑定 - 鼠标
//==============================
Game_System.prototype.drill_DBu_bindMouse = function(){
	this._drill_DBu_data['bindPos_type'] = "鼠标";
}
//==============================
// * 存储数据 - 取消绑定
//==============================
Game_System.prototype.drill_DBu_removeBind = function(){
	this._drill_DBu_data['bindPos_type'] = "";
	this._drill_DBu_curBubbleCursorX = 0;
	this._drill_DBu_curBubbleCursorY = 0;
}


//#############################################################################
// ** 【标准模块】战斗层级 ☆战斗层级
//#############################################################################
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
Game_Picture.prototype.drill_DBu_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_DBu_layerCameraMoving_Private( x, y, layer, option );
}
//==============================
// * 战斗层级 - 层级与镜头的位移（私有）
//==============================
Game_Picture.prototype.drill_DBu_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 【战斗 - 活动战斗镜头】
	//	 （长期在图片层，不需要考虑在下层、上层情况）
	if( Imported.Drill_BattleCamera ){
		
		// > 镜头基点位置 
		var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
		xx += camera_pos.x;
		yy += camera_pos.y;
		
		// > 镜头变换位置
		var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_OuterSprite( xx, yy );
		xx = camera_pos.x;
		yy = camera_pos.y;
		
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}


//#############################################################################
// ** 【标准模块】单位贴图容器 ☆场景容器之单位贴图
//#############################################################################
//##############################
// * 单位贴图容器 - 获取 - 敌人容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组    （敌人贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_DBu_getEnemySpriteTank = function(){
	return this.drill_DBu_getEnemySpriteTank_Private();
}
//##############################
// * 单位贴图容器 - 获取 - 根据敌方索引【标准函数】
//				
//			参数：	> index 数字 （敌方第n个位置，从0开始计数）
//			返回：	> 贴图       （敌人贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_DBu_getEnemySpriteByIndex = function( index ){
	return this.drill_DBu_getEnemySpriteByIndex_Private( index );
}
//##############################
// * 单位贴图容器 - 获取 - 根据敌人ID【标准函数】
//				
//			参数：	> enemy_id 数字（敌人ID）
//			返回：	> 贴图数组     （敌人贴图数组）
//          
//			说明：	> 注意敌人可能有很多个，返回的是数组。
//##############################
Game_Temp.prototype.drill_DBu_getEnemySpriteByEnemyId = function( enemy_id ){
	return this.drill_DBu_getEnemySpriteByEnemyId_Private( enemy_id );
}
//##############################
// * 单位贴图容器 - 获取 - 角色容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组   （角色贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_DBu_getActorSpriteTank = function(){
	return this.drill_DBu_getActorSpriteTank_Private();
}
//##############################
// * 单位贴图容器 - 获取 - 根据我方索引【标准函数】
//				
//			参数：	> index 数字 （我方第n个位置，从0开始计数）
//			返回：	> 贴图       （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_DBu_getActorSpriteByIndex = function( index ){
	return this.drill_DBu_getActorSpriteByIndex_Private( index );
}
//##############################
// * 单位贴图容器 - 获取 - 根据角色ID【标准函数】
//				
//			参数：	> actor_id 数字（角色ID）
//			返回：	> sprite 贴图  （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_DBu_getActorSpriteByActorId = function( actor_id ){
	return this.drill_DBu_getActorSpriteByActorId_Private( actor_id );
}
//=============================================================================
// ** 场景容器之单位贴图（实现）
//=============================================================================
//==============================
// * 单位贴图容器 - 获取 - 敌人容器指针（私有）
//==============================
Game_Temp.prototype.drill_DBu_getEnemySpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._enemySprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌方索引（私有）
//==============================
Game_Temp.prototype.drill_DBu_getEnemySpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_DBu_getEnemySpriteTank_Private();
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
Game_Temp.prototype.drill_DBu_getEnemySpriteByEnemyId_Private = function( enemy_id ){
	var sprite_list = this.drill_DBu_getEnemySpriteTank_Private();
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
Game_Temp.prototype.drill_DBu_getActorSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._actorSprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据我方索引（私有）
//==============================
Game_Temp.prototype.drill_DBu_getActorSpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_DBu_getActorSpriteTank_Private();
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
Game_Temp.prototype.drill_DBu_getActorSpriteByActorId_Private = function( actor_id ){
	var sprite_list = this.drill_DBu_getActorSpriteTank_Private();
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



//=============================================================================
// ** ☆绑定位置控制
//
//			说明：	> 此模块控制 绑定位置 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 绑定位置控制 - 最后继承1级
//==============================
var _drill_DBu_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_DBu_scene_initialize.call(this);
	
	//==============================
	// * 实时刷新位置（兼容） - 帧刷新时
	//==============================
	var _drill_DBu_massage_update = Window_Message.prototype.update;
	Window_Message.prototype.update = function(){
		
		// > 帧刷新位置
		$gameSystem.drill_DBu_updateAllPos();
			
		// > 原函数
		_drill_DBu_massage_update.call(this);
	};
	//==============================
	// * 实时刷新位置（对话框优化核心） - 帧刷新时
	//==============================
	if( Imported.Drill_CoreOfDialog ){
		var _drill_DBu_CODi_message_update = Window_Message.prototype.drill_CODi_message_update;
		Window_Message.prototype.drill_CODi_message_update = function(){
			
			// > 帧刷新位置
			$gameSystem.drill_DBu_updateAllPos();
			
			// > 原函数
			_drill_DBu_CODi_message_update.call(this);
		};
	}
}
//==============================
// * 绑定位置控制 - 帧刷新位置
//==============================
Game_System.prototype.drill_DBu_updateAllPos = function() {
	if( this._drill_DBu_data == undefined ){ return; }
	this.drill_DBu_updateFollowerPos();			//帧刷新 - 位置 玩家队员
	this.drill_DBu_updateEventPos();			//帧刷新 - 位置 事件
	this.drill_DBu_updateEnemyPos();			//帧刷新 - 位置 战斗敌人
	this.drill_DBu_updateActorPos();			//帧刷新 - 位置 战斗角色
	this.drill_DBu_updatePicPos();				//帧刷新 - 位置 图片
	this.drill_DBu_updateMouse();				//帧刷新 - 位置 鼠标
}
//==============================
// * 绑定位置控制 - 『实时绑定对象位置』帧刷新位置 - 玩家队员
//==============================
Game_System.prototype.drill_DBu_updateFollowerPos = function() {
	var data = this._drill_DBu_data;
	if( data['bindPos_type'] != "玩家队员" ){ return; }
	
	// > 无效队员
	if( data['bindPos_followerId'] == 0 ){ return; }
	
	// > 玩家
	if( data['bindPos_followerId'] == -2 ){  //『玩家id』
		var ev = $gamePlayer;
		if( ev == undefined ){ return; }
		
		var xx = ev.screenX();
		var yy = ev.screenY() - $gameMap.tileHeight();
		xx += data['bindPos_offsetX'];	//（绑定的偏移位置）
		yy += data['bindPos_offsetY'];
		this._drill_DBu_curBubbleCursorX = xx;
		this._drill_DBu_curBubbleCursorY = yy;
		
		return;
	}
	
	// > 玩家队员
	var ev = $gamePlayer.followers().follower( data['bindPos_followerId']-1 );	 //『玩家队员id』
	if( ev == undefined ){ return; }
	
	var xx = ev.screenX();
	var yy = ev.screenY() - $gameMap.tileHeight();
	xx += data['bindPos_offsetX'];	//（绑定的偏移位置）
	yy += data['bindPos_offsetY'];
	this._drill_DBu_curBubbleCursorX = xx;
	this._drill_DBu_curBubbleCursorY = yy;
}
//==============================
// * 绑定位置控制 - 『实时绑定对象位置』帧刷新位置 - 事件
//==============================
Game_System.prototype.drill_DBu_updateEventPos = function() {
	var data = this._drill_DBu_data;
	if( data['bindPos_type'] != "事件" ){ return; }
	
	var ev = $gameMap.event( data['bindPos_eventId'] );
	if( ev == undefined ){ return; }
	
	var xx = ev.screenX();
	var yy = ev.screenY() - $gameMap.tileHeight();
	xx += data['bindPos_offsetX'];	//（绑定的偏移位置）
	yy += data['bindPos_offsetY'];
	
	this._drill_DBu_curBubbleCursorX = xx;
	this._drill_DBu_curBubbleCursorY = yy;
}
//==============================
// * 绑定位置控制 - 『实时绑定对象位置』帧刷新位置 - 战斗敌人
//==============================
Game_System.prototype.drill_DBu_updateEnemyPos = function() {
	var data = this._drill_DBu_data;
	if( data['bindPos_type'] != "战斗敌人" ){ return; }
	
	// > 获取战斗敌群信息
	var index = data['bindPos_enemyIndex']-1;
	var enemy_sprite = $gameTemp.drill_DBu_getEnemySpriteByIndex( index );
	if( enemy_sprite == undefined ){ return; }
	
	//var xx = enemy_sprite._homeX + enemy_sprite._offsetX;
	//var yy = enemy_sprite._homeY + enemy_sprite._offsetY;
	var xx = enemy_sprite.x;
	var yy = enemy_sprite.y;
	xx += data['bindPos_offsetX'];	//（绑定的偏移位置）
	yy += data['bindPos_offsetY'];
	
	// > 层级与镜头的位移
	//	（暂不考虑）
	
	this._drill_DBu_curBubbleCursorX = xx;
	this._drill_DBu_curBubbleCursorY = yy;
}
//==============================
// * 绑定位置控制 - 『实时绑定对象位置』帧刷新位置 - 战斗角色
//==============================
Game_System.prototype.drill_DBu_updateActorPos = function() {
	var data = this._drill_DBu_data;
	if( data['bindPos_type'] != "战斗角色" ){ return; }
	
	// > 战斗角色贴图
	var index = data['bindPos_actorIndex']-1;
	var actor_sprite = $gameTemp.drill_DBu_getActorSpriteByIndex( index );
	if( actor_sprite == undefined ){ return; }
	
	//var xx = actor_sprite._homeX + actor_sprite._offsetX;
	//var yy = actor_sprite._homeY + actor_sprite._offsetY;
	var xx = actor_sprite.x;
	var yy = actor_sprite.y;
	xx += data['bindPos_offsetX'];	//（绑定的偏移位置）
	yy += data['bindPos_offsetY'];
	
	// > 层级与镜头的位移
	//	（暂不考虑）
	
	this._drill_DBu_curBubbleCursorX = xx;
	this._drill_DBu_curBubbleCursorY = yy;
}
//==============================
// * 绑定位置控制 - 『实时绑定对象位置』帧刷新位置 - 图片
//==============================
Game_System.prototype.drill_DBu_updatePicPos = function() {
	var data = this._drill_DBu_data;
	if( data['bindPos_type'] != "图片" ){ return; }
	
	var pic = $gameScreen.picture( data['bindPos_picId'] );
	if( pic == undefined ){ return; }
	
	// > 【图片 - 图片优化核心】『图片数据最终变换值』
	var xx = pic.x();
	var yy = pic.y();
	if( Imported.Drill_CoreOfPicture == true ){
		xx = pic.drill_COPi_finalTransform_x();
		yy = pic.drill_COPi_finalTransform_y();
	}
	
	// > 绑定的偏移位置
	xx += data['bindPos_offsetX'];
	yy += data['bindPos_offsetY'];
	
	this._drill_DBu_curBubbleCursorX = xx;
	this._drill_DBu_curBubbleCursorY = yy;
}
//==============================
// * 绑定位置控制 - 『实时绑定对象位置』帧刷新位置 - 鼠标
//==============================
Game_System.prototype.drill_DBu_updateMouse = function() {
	var data = this._drill_DBu_data;
	if( data['bindPos_type'] != "鼠标" ){ return; }
	
	var xx = _drill_mouse_x;
	var yy = _drill_mouse_y;
	xx += data['bindPos_offsetX'];	//（绑定的偏移位置）
	yy += data['bindPos_offsetY'];
	this._drill_DBu_curBubbleCursorX = xx;
	this._drill_DBu_curBubbleCursorY = yy;
}
//==============================
// * 绑定位置控制 - 鼠标通用函数
//==============================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义（该函数在许多插件都用到了）

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function( event ){			//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}


//=============================================================================
// ** ☆气泡框皮肤
//
//			说明：	> 此模块专门控制 对话框皮肤。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 气泡框皮肤 - 获取皮肤样式ID（根据窗口类名）（继承）
//==============================
var _drill_DBu_DSk_getStyleId = Game_System.prototype.drill_DSk_getStyleId;
Game_System.prototype.drill_DSk_getStyleId = function( windowName ){
	
	// > 气泡框
	var style_data = this.drill_DBu_getCurBubbleStyle();
	if( style_data != undefined ){
		if( windowName == "Window_Message" &&
			style_data['skin_messageStyleEnabled'] == true ){
			return style_data['skin_messageStyleId'] -1;
		}
		if( windowName == "Window_Gold" &&
			style_data['skin_goldStyleEnabled'] == true ){
			return style_data['skin_goldStyleId'] -1;
		}
		if( windowName == "Window_ChoiceList" &&
			style_data['skin_choiceStyleEnabled'] == true ){
			return style_data['skin_choiceStyleId'] -1;
		}
		if( windowName == "Window_NumberInput" &&
			style_data['skin_numberStyleEnabled'] == true ){
			return style_data['skin_numberStyleId'] -1;
		}
		if( windowName == "Window_EventItem" &&
			style_data['skin_itemStyleEnabled'] == true ){
			return style_data['skin_itemStyleId'] -1;
		}
		if( (windowName == "Window_NameBox" || windowName == "Drill_DNB_NameBoxWindow") &&
			style_data['skin_nameStyleEnabled'] == true ){
			return style_data['skin_nameStyleId'] -1;
		}
	}
	
	// > 原函数
	return _drill_DBu_DSk_getStyleId.call( this, windowName );
};


//=============================================================================
// ** ☆气泡框矩形
//
//			说明：	> 此模块专门控制 对话框变形器 的矩形。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 气泡框矩形 - 是否启用 实时刷新位置（继承）
//
//			说明：	> 对话框变形器 需要开启 实时刷新位置，确保气泡框始终跟随。
//==============================
var _drill_DBu_DOp_isUpdatePositionEnabled = Window_Message.prototype.drill_DOp_isUpdatePositionEnabled;
Window_Message.prototype.drill_DOp_isUpdatePositionEnabled = function(){
	
	// > 气泡框
	if( $gameSystem.drill_DBu_isPlayingBubble() ){ return true; }
	
	// > 原函数
	return _drill_DBu_DOp_isUpdatePositionEnabled.call(this);
};
//==============================
// * 气泡框矩形 - 自动调整后（继承）
//
//			说明：	> 对话框变形器变形后，需要刷气泡框的位置。
//==============================
var _drill_DBu_DOp_afterRefresh = Window_Message.prototype.drill_DOp_afterRefresh;
Window_Message.prototype.drill_DOp_afterRefresh = function() {
	_drill_DBu_DOp_afterRefresh.call(this);
	$gameSystem.drill_DBu_updateAllPos();	//（强制 刷新一次位置）
	this._drill_DBu_bubbleSprite.update();	//（强制 让子贴图帧刷新一次）
};
//==============================
// * 气泡框矩形 - 刷新位置（继承）
//==============================
var _drill_DBu_DOp_refresh_position = Window_Message.prototype.drill_DOp_refresh_position;
Window_Message.prototype.drill_DOp_refresh_position = function() {
	
	// > 刷新气泡位置
	this.drill_DBu_refreshBubblePosition();
	
	// > 原函数
	_drill_DBu_DOp_refresh_position.call(this);
}
//==============================
// * 气泡框矩形 - 刷新位置 - 刷新气泡位置
//==============================
Window_Message.prototype.drill_DBu_refreshBubblePosition = function(){
	
	// > 气泡框位置计算
	var xx = $gameSystem._drill_DBu_curBubbleCursorX;
	var yy = $gameSystem._drill_DBu_curBubbleCursorY;
	var ww = this._drill_DOp_lastWidth;		//【对话框 - 对话框变形器】
	var hh = this._drill_DOp_lastHeight;	//
	var is_convert = false;
	
	var style_data = $gameSystem.drill_DBu_getCurBubbleStyle();
	if( style_data != undefined ){
		
		// > 气泡框位置计算 - X位置
		xx -= ww *0.5;		//（窗口的锚点在左上角，需要转换位置）
		
		// > 气泡框位置计算 - 是否上下翻转
		if( yy < hh ){
			is_convert = true;
		}else{
			is_convert = false;
		}
		if( style_data['bubble_convertEnabled'] != true ){	//（是否开启自动上下翻转）
			is_convert = false;
		}
		
		// > 气泡框位置计算 - Y位置（气泡间距）
		var bubble_space = style_data['bubble_space'];
		if( $gameSystem._drill_DBu_curBubbleSpaceLocked == true ){	//（锁定气泡间距）
			bubble_space = $gameSystem._drill_DBu_curBubbleSpaceValue;
		}
		
		// > 气泡框位置计算 - Y位置（上下翻转）
		if( is_convert == true ){
			yy += bubble_space;
		}else{
			yy -= hh;
			yy -= bubble_space;
		}
	}
	
	// > 气泡框位置计算 - 赋值
	$gameTemp._drill_DBu_curBubbleX = xx;
	$gameTemp._drill_DBu_curBubbleY = yy;
	$gameTemp._drill_DBu_isBubbleConvert = is_convert;
}
//==============================
// * 气泡框矩形 - 获取变形器样式（继承）
//==============================
var _drill_DBu_DOp_getCurStyle = Game_System.prototype.drill_DOp_getCurStyle;
Game_System.prototype.drill_DOp_getCurStyle = function(){
	
	// > 气泡框
	var style_data = this.drill_DBu_getCurBubbleStyle();
	if( style_data != undefined ){
		
		// > 气泡框 - 位置赋值
		if( $gameTemp._drill_DBu_curBubbleX != undefined ){
			style_data['x_value'] = $gameTemp._drill_DBu_curBubbleX;
			style_data['y_value'] = $gameTemp._drill_DBu_curBubbleY;
		}
		
		// > 气泡框 - 只要不为空就必然覆盖样式
		return style_data;
	}
	
	// > 原函数
	return _drill_DBu_DOp_getCurStyle.call(this);
}



//=============================================================================
// ** ☆气泡尖角贴图控制
//
//			说明：	> 此模块专门控制对话框的 矩形，即位置和高宽。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 3A主体 - 初始化
//==============================
var _drill_DBu_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
	_drill_DBu_initialize.call( this );
	this.drill_DBu_createSprite();			//创建贴图
};
//==============================
// * 3A主体 - 设置背景（非帧刷新，窗口/暗淡/透明）
//
//			说明：	> 窗口类型切换时，刷新装饰图的出现情况。
//==============================
var _drill_DBu_setBackgroundType = Window_Message.prototype.setBackgroundType;
Window_Message.prototype.setBackgroundType = function( type ){
	_drill_DBu_setBackgroundType.call( this,type );
	
    if( type === 0 ){	// 窗口 类型
		this.drill_DBu_refreshSprite();		//刷新贴图
	}
}

//==============================
// * 气泡尖角贴图控制 - 创建贴图（Window_Message）
//
//			说明：	> 尖角只在 对话框 中有，子窗口没有。
//==============================
Window_Message.prototype.drill_DBu_createSprite = function() {
	
	// > 图层
	this._drill_DBu_spriteLayer = new Sprite();
    var borderIndex = this.children.indexOf(this._drill_DSk_border); //【对话框 - 对话框皮肤】
    this.addChildAt( this._drill_DBu_spriteLayer, borderIndex + 1);	 //（层级添加在边框前面）
	
	// > 气泡尖角贴图
	this._drill_DBu_bubbleSprite = new Drill_DBu_DecorationSprite( this );
	this._drill_DBu_spriteLayer.addChild(this._drill_DBu_bubbleSprite);
};
//==============================
// * 气泡尖角贴图控制 - 刷新贴图（Window_Message）
//
//			说明：	> 尖角只在 对话框 中有，子窗口没有。
//==============================
Window_Message.prototype.drill_DBu_refreshSprite = function(){
	
	// > 样式检查
	var styleId = $gameSystem.drill_DSk_getStyleId( "Window_Message" ); //【对话框 - 对话框皮肤】
	if( styleId == -1 ){ return; }
	var style_data = $gameSystem.drill_DBu_getCurBubbleStyle();
	if( style_data == undefined ){ return; }
	
	// > 刷新样式
	this._drill_DBu_bubbleSprite.drill_initSprite();
};


//=============================================================================
// ** 气泡尖角贴图【Drill_DBu_DecorationSprite】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	定义一个贴图。
// **		子功能：	
// **					->贴图『独立贴图』
// **						x->显示贴图/隐藏贴图
// **						x->是否就绪
// **						x->优化策略
// **						x->销毁
// **						->初始化数据
// **						->初始化对象
// **					
// **					->A主体
// **					->B播放GIF
// **
// **		代码：	> 范围 - 该类额外显示单图的装饰。
// **				> 结构 - [ ●合并 /分离/混乱] 数据与贴图合并。
// **				> 数量 - [ ●单个 /多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 
// **				> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
// **				> 样式 - [不可修改/自变化/ ●外部变化 ] 
//=============================================================================
//==============================
// * 气泡尖角贴图 - 定义
//==============================
function Drill_DBu_DecorationSprite() {
	this.initialize.apply(this, arguments);
}
Drill_DBu_DecorationSprite.prototype = Object.create(Sprite.prototype);
Drill_DBu_DecorationSprite.prototype.constructor = Drill_DBu_DecorationSprite;
//==============================
// * 气泡尖角贴图 - 初始化
//==============================
Drill_DBu_DecorationSprite.prototype.initialize = function( parent ){
	Sprite.prototype.initialize.call(this);
	this._drill_parent = parent;
	
	this.drill_initData();						//初始化数据
	this.drill_initSprite();					//初始化对象
};
//==============================
// * 气泡尖角贴图 - 帧刷新
//==============================
Drill_DBu_DecorationSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_sprite_updateAttr();				//帧刷新 - A主体
	this.drill_sprite_updateAttr_Position();	//帧刷新 - A主体 - 位置
	this.drill_sprite_updateGIF();				//帧刷新 - B播放GIF
};
//==============================
// * 气泡尖角贴图 - 初始化数据『独立贴图』
//==============================
Drill_DBu_DecorationSprite.prototype.drill_initData = function() {
	//（暂无 默认值）
};
//==============================
// * 气泡尖角贴图 - 初始化对象『独立贴图』
//==============================
Drill_DBu_DecorationSprite.prototype.drill_initSprite = function() {
	this.drill_sprite_initAttr();				//子功能初始化 - A主体
	this.drill_sprite_initGIF();				//子功能初始化 - B播放GIF
};

//==============================
// * A主体 - 子功能初始化
//==============================
Drill_DBu_DecorationSprite.prototype.drill_sprite_initAttr = function() {
	
	// > 私有属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 1;
	this.rotation = 0;
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_DBu_DecorationSprite.prototype.drill_sprite_updateAttr = function() {
	
	// > 上下翻转
	if( $gameTemp._drill_DBu_isBubbleConvert == true ){
		this.rotation = Math.PI;
	}else{
		this.rotation = 0;
	}
	
	// > 可见
	if( $gameSystem.drill_DBu_isPlayingBubble() ){
		this.visible = true;
	}else{
		this.visible = false;
	}
	
	// > 气泡的展开动画（同步窗口的 0C展开动画）
	this.scale.y = this._drill_parent._windowSpriteContainer.scale.y;
}
//==============================
// * A主体 - 帧刷新 - 位置
//==============================
Drill_DBu_DecorationSprite.prototype.drill_sprite_updateAttr_Position = function() {
	var style_data = $gameSystem.drill_DBu_getCurBubbleStyle();
	if( style_data == undefined ){ return; }
	if( this._drill_bitmaps.length == 0 ){ return; }
	
	var pxx = this._drill_parent.x;
	var pyy = this._drill_parent.y;
	var pww = this._drill_parent.width;
	var phh = this._drill_parent.height;
	
	var xx = 0;
	var yy = 0;
	var bw = this._drill_bitmaps[0].width;
	var bh = this._drill_bitmaps[0].height;
	
	// > 当前位置
	xx = $gameSystem._drill_DBu_curBubbleCursorX - pxx;
	if( $gameTemp._drill_DBu_isBubbleConvert == true ){
		yy = 0;
		yy -= bh;
	}else{
		yy = phh;
		yy += bh;
	}
	
	// > 过界保护
	if( xx > pww-bw ){ xx = pww-bw; }
	if( xx < bw     ){ xx = bw;     }
	
	// > 偏移
	xx += style_data['position_x'];
	if( $gameTemp._drill_DBu_isBubbleConvert == true ){
		yy -= style_data['position_y'];
	}else{
		yy += style_data['position_y'];
	}
	
	this.x = xx;
	this.y = yy;
}

//==============================
// * B播放GIF - 子功能初始化
//==============================
Drill_DBu_DecorationSprite.prototype.drill_sprite_initGIF = function() {
	this._drill_bitmaps = [];
	this._drill_gifTime = 0;
	
	// > 资源读取
	var style_data = $gameSystem.drill_DBu_getCurBubbleStyle();
	if( style_data == undefined ){ return; }
	for(var j = 0; j < style_data['gif_src'].length ; j++){
		var src_str = style_data['gif_src'][j];
		var obj_bitmap = ImageManager.loadBitmap( style_data['gif_src_file'], src_str, 0, true);
		this._drill_bitmaps.push( obj_bitmap );
	};
};
//==============================
// * B播放GIF - 帧刷新
//==============================
Drill_DBu_DecorationSprite.prototype.drill_sprite_updateGIF = function() {
	var style_data = $gameSystem.drill_DBu_getCurBubbleStyle();
	if( style_data == undefined ){ return; }
	if( this._drill_bitmaps.length == 0 ){ return; }
	
	// > GIF时间+1
	this._drill_gifTime += 1;
	
	// > GIF播放
	var inter = this._drill_gifTime;
	inter = inter / style_data['gif_interval'];
	inter = inter % this._drill_bitmaps.length;
	if( style_data['gif_back_run'] ){
		inter = this._drill_bitmaps.length - 1 - inter;
	}
	inter = Math.floor(inter);
	this.bitmap = this._drill_bitmaps[inter];
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogBubble = false;
		var pluginTip = DrillUp.drill_DBu_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}
