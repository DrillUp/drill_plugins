//=============================================================================
// Drill_OperateHud.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        鼠标 - 鼠标辅助操作面板
 * @author Drill_up
 * 
 * @Drill_LE_param "自定义按钮-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_OH_self_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_OperateHud +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得地图的角色提供鼠标按键支持。包括触屏支持。
 * ★★必须放在 "可作用于" 的所有插件的后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。并可以辅助扩展下列插件。
 * 基于：
 *   - Drill_CoreOfInput          系统-输入设备核心
 *   - Drill_LayerCommandThread   地图-多线程
 * 可作用于：
 *   - Drill_Jump                 互动-跳跃能力★★v1.2及以上★★
 *   - Drill_RotateDirection      互动-原地转向能力
 *   - Drill_PickThrow            互动-举起花盆能力
 *   - Drill_BombCore             炸弹人-游戏核心★★v1.5及以上★★
 *     上述插件分别对应面板的按钮与功能，没有也不会报错。
 *   - Drill_LayerCamera          地图-活动地图镜头★★v1.6及以上★★
 *     目标插件控制镜头放大缩小时，该插件的面板仍然可以正常支持。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对玩家有效。
 * 2.详细内容可以去看看 "14.鼠标 > 关于鼠标辅助操作面板.docx"。
 * 输入：
 *   (1.你可以在输入核心中禁用鼠标右键菜单功能，用于腾出右键触发的功
 *      能。进菜单功能通过该辅助面板进入。
 *   (2.辅助操作面板提供跳跃、转向、投掷、放置炸弹等功能，如果你没有
 *      配置相应的插件，则指定功能按钮不会显示，相当于禁用按钮。
 * 点击触发：
 *   (1.在地图界面中，点击玩家贴图，即可展开面板。
 *      点击其他位置，则会执行移动到目的地，或者收起面板。
 *      如果你点击玩家展开了面板，然后用键盘操作，面板是不会收起的。
 *   (2.你配置的资源图片的矩形大小，决定你按钮的大小。
 *      如果你打算用在移动端，建议使用大图片，不然手指会按不到位置。
 *   (3.如果点击了两个按钮重叠的部分，则高亮的那个按钮起效果。
 * 激活/封印/禁用：
 *   (1.激活：按钮可以触发功能，并且接近能高亮。
 *   (2.封印：按钮不能触发功能，并且点击会发出错误提示音。
 *   (3.禁用：按钮不显示。
 *   (4.你可以设置按钮根据功能可用情况，自适应激活/封印。
 *      但是 菜单、自定义按钮 没有这项功能，只能手动设置插件指令。
 * 自定义按钮：
 *   (1.你可以在面板中添加自定义按钮，点击后执行公共事件。
 *      公共事件的执行通过 地图-多线程 插件来控制。
 *      可选择串行与并行，具体看看 "31.公共事件 > 关于公共事件与并行.docx"。
 *   (2.注意，对话框事件指令 是特殊的指令体，只要执行对话框，就会强
 *      制串行，阻塞其他所有事件的线程。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__ui_operatehud （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__ui_operatehud文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-操作面板
 * 资源-菜单按钮
 * 资源-菜单按钮-封印
 * 资源-跳跃上箭头
 * 资源-跳跃上箭头-封印
 * 资源-跳跃下箭头
 * 资源-跳跃下箭头-封印
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令设置鼠标操作面板启用情况。
 *
 * 插件指令：>鼠标操作面板 : 开启
 * 插件指令：>鼠标操作面板 : 关闭
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 按钮控制
 * 你可以通过插件指令设置操作面板的按钮设置：
 * 
 * 插件指令：>鼠标操作面板 : 菜单按钮 : 激活
 * 插件指令：>鼠标操作面板 : 跳跃按钮 : 激活
 * 插件指令：>鼠标操作面板 : 转向按钮 : 激活
 * 插件指令：>鼠标操作面板 : 投掷按钮 : 激活
 * 插件指令：>鼠标操作面板 : 炸弹按钮 : 激活
 * 插件指令：>鼠标操作面板 : 自定义按钮[1] : 激活
 *
 * 插件指令：>鼠标操作面板 : 跳跃按钮 : 开启自动封印
 * 插件指令：>鼠标操作面板 : 跳跃按钮 : 关闭自动封印
 * 插件指令：>鼠标操作面板 : 跳跃按钮 : 激活
 * 插件指令：>鼠标操作面板 : 跳跃按钮 : 封印
 * 插件指令：>鼠标操作面板 : 跳跃按钮 : 禁用
 * 
 * 1.前面部分（跳跃按钮）和后面设置（激活）可以随意组合。
 *   一共有6*5种组合方式。
 * 2.菜单、自定义按钮 没有自动封印的功能，因为没有特殊的限制条件。
 *   必要时需要手动封印。
 * 3.如果你手动执行了"封印"、"激活"时，按钮的"自动封印"也会被关闭。
 *   复原时，需要把自动封印加回去。
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   去物体管理层、地理管理层、镜像管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【8.21ms】
 *              100个事件的地图中，平均消耗为：【7.32ms】
 *               50个事件的地图中，平均消耗为：【5.15ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.辅助操作面板只有一个，测试的值可能看起来像是线性递增关系。
 *   实际上该插件与事件的数量没有任何关系。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了鼠标高亮在浏览器中玩的错位问题。
 * [v1.2]
 * 添加了菜单的设置，以及禁用地图中右键菜单的设置。
 * 修复了触屏没有效果的bug。
 * [v1.3]
 * 添加了炸弹人核心插件的支持。
 * [v1.4]
 * 修改了内部结构，并且修复了举起物体时，不能点击转向按钮的bug。
 * [v1.5]
 * 分离了核心，优化了插件性能。并且修改了插件关联的资源文件夹。
 * [v1.6]
 * 添加了镜头缩放时，面板触发的支持。
 * [v1.7]
 * 修改了内部结构，添加了按钮封印功能，以及自定义按钮功能。
 * [v1.8]
 * 添加了公共事件的并行与串行的功能。
 * [v1.9]
 * 优化了旧存档的识别与兼容。
 *
 *
 *
 * @param ----操作面板----
 * @default 
 *
 * @param 平移-操作面板 X
 * @parent ----操作面板----
 * @desc x轴方向平移，单位像素，0为中心贴在玩家行走图的中心。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-操作面板 Y
 * @parent ----操作面板----
 * @desc y轴方向平移，单位像素，0为中心贴在玩家行走图的中心。正数向下，负数向上。
 * @default 0
 *
 * @param 资源-操作面板
 * @parent ----操作面板----
 * @desc 操作面板的图片资源。
 * @default 操作面板-外环
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 面板显现时长
 * @parent ----操作面板----
 * @type number
 * @min 0
 * @desc 面板显现出来的时间，单位帧。（1秒60帧）
 * @default 12
 *
 * @param 是否显现时旋转布局
 * @parent ----操作面板----
 * @type boolean
 * @on 旋转
 * @off 不旋转
 * @desc 布局显现时会旋转180度。（圆形的资源图片，效果不会非常明显）
 * @default true
 *
 * @param 未高亮按钮透明度
 * @parent ----操作面板----
 * @type number
 * @min 0
 * @max 255
 * @desc 鼠标未接触面板按钮时按钮的透明度。
 * @default 160
 *
 * @param 高亮按钮透明度
 * @parent ----操作面板----
 * @type number
 * @min 0
 * @max 255
 * @desc 鼠标接触面板按钮时按钮的透明度。
 * @default 255
 *
 *
 * @param ----菜单----
 * @default 
 *
 * @param 菜单按钮状态
 * @parent ----菜单----
 * @type select
 * @option 激活
 * @value 激活
 * @option 封印
 * @value 封印
 * @option 禁用
 * @value 禁用
 * @desc 菜单按钮所处的状态。
 * @default 激活
 *
 * @param 资源-菜单按钮
 * @parent ----菜单----
 * @desc 菜单按钮的图片资源。
 * @default 操作面板-菜单按钮
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-菜单按钮-封印
 * @parent ----菜单----
 * @desc 菜单按钮被封印的图片资源。
 * @default 操作面板-菜单按钮-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 平移-菜单按钮 X
 * @parent ----菜单----
 * @desc x轴方向平移，单位像素，0为中心贴在玩家行走图的中心。正数向右，负数向左。
 * @default 72
 *
 * @param 平移-菜单按钮 Y
 * @parent ----菜单----
 * @desc y轴方向平移，单位像素，0为中心贴在玩家行走图的中心。正数向下，负数向上。
 * @default 48
 *
 *
 * @param ----跳跃----
 * @default 
 *
 * @param 跳跃按钮状态
 * @parent ----跳跃----
 * @type select
 * @option 激活
 * @value 激活
 * @option 封印
 * @value 封印
 * @option 禁用
 * @value 禁用
 * @desc 菜单按钮所处的状态。
 * @default 激活
 * 
 * @param 是否根据跳跃可用情况自动封印
 * @parent 跳跃按钮状态
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 跳跃不可用时，按钮自动进入封印状态。
 * @default true
 *
 * @param 资源-跳跃上箭头
 * @parent ----跳跃----
 * @desc 跳跃上箭头的图片资源。
 * @default 操作面板-跳跃上箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-跳跃下箭头
 * @parent ----跳跃----
 * @desc 跳跃下箭头的图片资源。
 * @default 操作面板-跳跃下箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-跳跃左箭头
 * @parent ----跳跃----
 * @desc 跳跃左箭头的图片资源。
 * @default 操作面板-跳跃左箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-跳跃右箭头
 * @parent ----跳跃----
 * @desc 跳跃右箭头的图片资源。
 * @default 操作面板-跳跃右箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-跳跃上箭头-封印
 * @parent ----跳跃----
 * @desc 跳跃上箭头封印时的图片资源。
 * @default 操作面板-跳跃上箭头-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-跳跃下箭头-封印
 * @parent ----跳跃----
 * @desc 跳跃下箭头封印时的图片资源。
 * @default 操作面板-跳跃下箭头-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-跳跃左箭头-封印
 * @parent ----跳跃----
 * @desc 跳跃左箭头封印时的图片资源。
 * @default 操作面板-跳跃左箭头-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-跳跃右箭头-封印
 * @parent ----跳跃----
 * @desc 跳跃右箭头封印时的图片资源。
 * @default 操作面板-跳跃右箭头-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 跳跃按钮中心距
 * @parent ----跳跃----
 * @type number
 * @min 0
 * @desc 按钮与面板中心的距离，单位像素。
 * @default 32
 *
 *
 * @param ----转向----
 * @default 
 *
 * @param 转向按钮状态
 * @parent ----转向----
 * @type select
 * @option 激活
 * @value 激活
 * @option 封印
 * @value 封印
 * @option 禁用
 * @value 禁用
 * @desc 转向按钮所处的状态。
 * @default 激活
 * 
 * @param 是否根据转向可用情况自动封印
 * @parent 转向按钮状态
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 转向不可用时，按钮自动进入封印状态。
 * @default true
 *
 * @param 资源-转向上箭头
 * @parent ----转向----
 * @desc 转向上箭头的图片资源。
 * @default 操作面板-转向上箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-转向下箭头
 * @parent ----转向----
 * @desc 转向下箭头的图片资源。
 * @default 操作面板-转向下箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-转向左箭头
 * @parent ----转向----
 * @desc 转向左箭头的图片资源。
 * @default 操作面板-转向左箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-转向右箭头
 * @parent ----转向----
 * @desc 转向右箭头的图片资源。
 * @default 操作面板-转向右箭头
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-转向上箭头-封印
 * @parent ----转向----
 * @desc 转向上箭头封印时的图片资源。
 * @default 操作面板-转向上箭头-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-转向下箭头-封印
 * @parent ----转向----
 * @desc 转向下箭头封印时的图片资源。
 * @default 操作面板-转向下箭头-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-转向左箭头-封印
 * @parent ----转向----
 * @desc 转向左箭头封印时的图片资源。
 * @default 操作面板-转向左箭头-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-转向右箭头-封印
 * @parent ----转向----
 * @desc 转向右箭头封印时的图片资源。
 * @default 操作面板-转向右箭头-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 转向按钮中心距
 * @parent ----转向----
 * @type number
 * @min 0
 * @desc 按钮与面板中心的距离，单位像素。
 * @default 24
 *
 *
 * @param ----投掷----
 * @default 
 *
 * @param 投掷按钮状态
 * @parent ----投掷----
 * @type select
 * @option 激活
 * @value 激活
 * @option 封印
 * @value 封印
 * @option 禁用
 * @value 禁用
 * @desc 投掷按钮所处的状态。
 * @default 激活
 * 
 * @param 是否根据投掷可用情况自动封印
 * @parent 投掷按钮状态
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 投掷不可用时，按钮自动进入封印状态。
 * @default true
 *
 * @param 资源-投掷按钮
 * @parent ----投掷----
 * @desc 投掷按钮的图片资源。
 * @default 操作面板-投掷按钮
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-投掷按钮-封印
 * @parent ----投掷----
 * @desc 投掷按钮封印时的图片资源。
 * @default 操作面板-投掷按钮-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 偏移-投掷按钮 X
 * @parent ----投掷----
 * @desc x轴方向平移，单位像素，0为中心贴在操作面板的中心。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-投掷按钮 Y
 * @parent ----投掷----
 * @desc y轴方向平移，单位像素，0为中心贴在操作面板的中心。正数向下，负数向上。
 * @default 0
 * 
 *
 * @param ----炸弹----
 * @default 
 *
 * @param 炸弹按钮状态
 * @parent ----炸弹----
 * @type select
 * @option 激活
 * @value 激活
 * @option 封印
 * @value 封印
 * @option 禁用
 * @value 禁用
 * @desc 炸弹按钮所处的状态。
 * @default 激活
 * 
 * @param 是否根据炸弹可用情况自动封印
 * @parent 炸弹按钮状态
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 炸弹不可用时，按钮自动进入封印状态。
 * @default true
 *
 * @param 资源-炸弹按钮
 * @parent ----炸弹----
 * @desc 炸弹按钮的图片资源。
 * @default 操作面板-炸弹按钮
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-炸弹按钮-封印
 * @parent ----炸弹----
 * @desc 炸弹按钮封印时的图片资源。
 * @default 操作面板-炸弹按钮-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 平移-炸弹按钮 X
 * @parent ----炸弹----
 * @desc x轴方向平移，单位像素，0为中心贴在操作面板的中心。正数向右，负数向左。
 * @default -72
 *
 * @param 平移-炸弹按钮 Y
 * @parent ----炸弹----
 * @desc y轴方向平移，单位像素，0为中心贴在操作面板的中心。正数向下，负数向上。
 * @default 48
 * 
 * 
 * @param ----自定义按钮组----
 * @default 
 * 
 * @param 自定义按钮-1
 * @parent ----自定义按钮组----
 * @type struct<DrillOHBtn>
 * @desc 自定义按钮的详细配置信息。
 * @default 
 * 
 * @param 自定义按钮-2
 * @parent ----自定义按钮组----
 * @type struct<DrillOHBtn>
 * @desc 自定义按钮的详细配置信息。
 * @default 
 * 
 * @param 自定义按钮-3
 * @parent ----自定义按钮组----
 * @type struct<DrillOHBtn>
 * @desc 自定义按钮的详细配置信息。
 * @default 
 * 
 * @param 自定义按钮-4
 * @parent ----自定义按钮组----
 * @type struct<DrillOHBtn>
 * @desc 自定义按钮的详细配置信息。
 * @default 
 * 
 * @param 自定义按钮-5
 * @parent ----自定义按钮组----
 * @type struct<DrillOHBtn>
 * @desc 自定义按钮的详细配置信息。
 * @default 
 * 
 * @param 自定义按钮-6
 * @parent ----自定义按钮组----
 * @type struct<DrillOHBtn>
 * @desc 自定义按钮的详细配置信息。
 * @default 
 * 
 * @param 自定义按钮-7
 * @parent ----自定义按钮组----
 * @type struct<DrillOHBtn>
 * @desc 自定义按钮的详细配置信息。
 * @default 
 * 
 * @param 自定义按钮-8
 * @parent ----自定义按钮组----
 * @type struct<DrillOHBtn>
 * @desc 自定义按钮的详细配置信息。
 * @default 
 * 
 * @param 自定义按钮-9
 * @parent ----自定义按钮组----
 * @type struct<DrillOHBtn>
 * @desc 自定义按钮的详细配置信息。
 * @default 
 * 
 * @param 自定义按钮-10
 * @parent ----自定义按钮组----
 * @type struct<DrillOHBtn>
 * @desc 自定义按钮的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillOHBtn:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的自定义按钮==
 *
 * @param 按钮初始状态
 * @type select
 * @option 激活
 * @value 激活
 * @option 封印
 * @value 封印
 * @option 禁用
 * @value 禁用
 * @desc 炸弹按钮所处的状态。
 * @default 激活
 * 
 * @param 执行的公共事件
 * @type common_event
 * @desc 按钮按下后执行的公共事件。
 * @default 0
 *
 * @param 公共事件执行方式
 * @type select
 * @option 串行
 * @value 串行
 * @option 并行
 * @value 并行
 * @desc 公共事件的执行方式。
 * @default 并行
 * 
 * @param 执行后是否收起面板
 * @type boolean
 * @on 收起
 * @off 不收起
 * @desc 按钮点击后，执行公共事件，并收起面板。
 * @default true
 * 
 * @param 资源-自定义按钮
 * @desc 自定义按钮的图片资源。
 * @default 操作面板-自定义按钮
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 资源-自定义按钮-封印
 * @desc 自定义按钮封印时的图片资源。
 * @default 操作面板-自定义按钮-封印
 * @require 1
 * @dir img/Map__ui_operatehud/
 * @type file
 *
 * @param 偏移-自定义按钮 X
 * @desc x轴方向平移，单位像素，0为中心贴在操作面板的中心。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-自定义按钮 Y
 * @desc y轴方向平移，单位像素，0为中心贴在操作面板的中心。正数向下，负数向上。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		OH (Operate_Hud)
//		临时全局变量	DrillUp.g_OH_xxx
//		临时局部变量	this._drill_OH_xxx
//		存储数据变量	$gameSystem._drill_OH_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	不停地操作点出面板
//		★性能测试消耗	5.15ms
//		★最坏情况		暂无，消耗太少，无论怎么点，消耗都上不去。
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			操作面板：（鼠标+触屏）
//				->面板
//					->收回时机
//					->地图点击拦截
//				->功能按钮
//					->菜单
//					->跳跃
//					->原地转向
//					->投掷
//					->炸弹
//					->自定义公共事件
//				->按钮状态
//					->高亮激活
//					->封印
//					->禁用
//
//		★必要注意事项：
//			1.互动之间如果有较复杂的接口，必须遵循下面的格式：
//				drill_canXxxx_Normal()			静态约束条件（无提示音）
//				drill_canXxxx_Conditional()		外力限制条件（有提示音）
//				drill_doXxxx()					执行操作
//				drill_isXxxxControl()			键盘按键条件
//			  面板通过上述四个接口 主动调用 能力插件中的函数。
//
//		★其它说明细节：
//			1.鼠标是个很复杂的持续性动作，在update中会持续触发。需要加锁。
//			  只有 高亮 + 点击 才能触发高亮的按钮动作。
//			2. 2019/6/20 看之前自己写的结构，感觉有很多地方比较混乱。
//			  因为同时使用 鼠标接近 函数，又夹杂了本体的touchinput。函数结构比较松散。
//			  （这里按照drill_createBtn_xxx的代码思路来，毕竟该插件依赖于其它插件，不适合封装成对象）
//			3. 2020/5/15 这里的内容相对比较累赘，与商店界面很像。
//			  结构并没有那么复杂，只是内容太多了。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_OperateHud = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_OperateHud');

	/*-----------------操作面板------------------*/
    DrillUp.g_OH_src_Layout = String(DrillUp.parameters['资源-操作面板'] || "");
	DrillUp.g_OH_x = Number(DrillUp.parameters['平移-操作面板 X'] || 0);
	DrillUp.g_OH_y = Number(DrillUp.parameters['平移-操作面板 Y'] || 0); 
	DrillUp.g_OH_time = Number(DrillUp.parameters['面板显现时长'] || 12);
	DrillUp.g_OH_showing_rotate = String(DrillUp.parameters['是否显现时旋转布局'] || "false") === "true";	
    DrillUp.g_OH_btn_opacity = Number(DrillUp.parameters['未高亮按钮透明度'] || 160);
    DrillUp.g_OH_btn_l_opacity = Number(DrillUp.parameters['高亮按钮透明度'] || 255);
	
	/*-----------------菜单------------------*/
	//DrillUp.g_OH_menu_block = String(DrillUp.parameters['是否禁用鼠标右键菜单'] || "false") === "true";
	DrillUp.g_OH_menu_status = String(DrillUp.parameters['菜单按钮状态'] || "激活");
    DrillUp.g_OH_menu_src = String(DrillUp.parameters['资源-菜单按钮'] || "");
    DrillUp.g_OH_menu_src_lock = String(DrillUp.parameters['资源-菜单按钮-封印'] || "");
	DrillUp.g_OH_menu_x = Number(DrillUp.parameters['平移-菜单按钮 X'] || 0);
	DrillUp.g_OH_menu_y = Number(DrillUp.parameters['平移-菜单按钮 Y'] || 0); 

	/*-----------------跳跃------------------*/
	DrillUp.g_OH_jump_status = String(DrillUp.parameters['跳跃按钮状态'] || "激活");
	DrillUp.g_OH_jump_status_auto = String(DrillUp.parameters['是否根据跳跃可用情况自动封印'] || "true") === "true";	
    DrillUp.g_OH_jump_src_up = String(DrillUp.parameters['资源-跳跃上箭头'] || "");
    DrillUp.g_OH_jump_src_down = String(DrillUp.parameters['资源-跳跃下箭头'] || "");
    DrillUp.g_OH_jump_src_left = String(DrillUp.parameters['资源-跳跃左箭头'] || "");
    DrillUp.g_OH_jump_src_right = String(DrillUp.parameters['资源-跳跃右箭头'] || "");
    DrillUp.g_OH_jump_src_up_lock = String(DrillUp.parameters['资源-跳跃上箭头-封印'] || "");
    DrillUp.g_OH_jump_src_down_lock = String(DrillUp.parameters['资源-跳跃下箭头-封印'] || "");
    DrillUp.g_OH_jump_src_left_lock = String(DrillUp.parameters['资源-跳跃左箭头-封印'] || "");
    DrillUp.g_OH_jump_src_right_lock = String(DrillUp.parameters['资源-跳跃右箭头-封印'] || "");
	DrillUp.g_OH_jump_distance = Number(DrillUp.parameters['跳跃按钮中心距'] || 32);

	/*-----------------转向------------------*/
	DrillUp.g_OH_rotate_status = String(DrillUp.parameters['转向按钮状态'] || "激活");
	DrillUp.g_OH_rotate_status_auto = String(DrillUp.parameters['是否根据转向可用情况自动封印'] || "true") === "true";	
    DrillUp.g_OH_rotate_src_up = String(DrillUp.parameters['资源-转向上箭头'] || "");
    DrillUp.g_OH_rotate_src_down = String(DrillUp.parameters['资源-转向下箭头'] || "");
    DrillUp.g_OH_rotate_src_left = String(DrillUp.parameters['资源-转向左箭头'] || "");
    DrillUp.g_OH_rotate_src_right = String(DrillUp.parameters['资源-转向右箭头'] || "");
    DrillUp.g_OH_rotate_src_up_lock = String(DrillUp.parameters['资源-转向上箭头-封印'] || "");
    DrillUp.g_OH_rotate_src_down_lock = String(DrillUp.parameters['资源-转向下箭头-封印'] || "");
    DrillUp.g_OH_rotate_src_left_lock = String(DrillUp.parameters['资源-转向左箭头-封印'] || "");
    DrillUp.g_OH_rotate_src_right_lock = String(DrillUp.parameters['资源-转向右箭头-封印'] || "");
	DrillUp.g_OH_rotate_distance = Number(DrillUp.parameters['转向按钮中心距'] || 24);

	/*-----------------投掷------------------*/
	DrillUp.g_OH_throw_status = String(DrillUp.parameters['投掷按钮状态'] || "激活");
	DrillUp.g_OH_throw_status_auto = String(DrillUp.parameters['是否根据投掷可用情况自动封印'] || "true") === "true";	
    DrillUp.g_OH_throw_src = String(DrillUp.parameters['资源-投掷按钮'] || "");
    DrillUp.g_OH_throw_src_lock = String(DrillUp.parameters['资源-投掷按钮-封印'] || "");
	DrillUp.g_OH_throw_x = Number(DrillUp.parameters['偏移-投掷按钮 X'] || 0);
	DrillUp.g_OH_throw_y = Number(DrillUp.parameters['偏移-投掷按钮 Y'] || 0);
	
	/*-----------------炸弹------------------*/
	DrillUp.g_OH_bomb_status = String(DrillUp.parameters['炸弹按钮状态'] || "激活");
	DrillUp.g_OH_bomb_status_auto = String(DrillUp.parameters['是否根据炸弹可用情况自动封印'] || "true") === "true";	
    DrillUp.g_OH_bomb_src = String(DrillUp.parameters['资源-炸弹按钮'] || "");
    DrillUp.g_OH_bomb_src_lock = String(DrillUp.parameters['资源-炸弹按钮-封印'] || "");
	DrillUp.g_OH_bomb_x = Number(DrillUp.parameters['平移-炸弹按钮 X'] || -72);
	DrillUp.g_OH_bomb_y = Number(DrillUp.parameters['平移-炸弹按钮 Y'] || 48); 
	
	/*-----------------自定义------------------*/
	DrillUp.g_OH_self_list_length = 10;
	DrillUp.g_OH_self_list = [];
	for (var i = 0; i < DrillUp.g_OH_self_list_length; i++) {
		if( DrillUp.parameters["自定义按钮-" + String(i+1) ] != undefined &&
			DrillUp.parameters["自定义按钮-" + String(i+1) ] != "" ){
			DrillUp.g_OH_self_list[i] = JSON.parse(DrillUp.parameters["自定义按钮-" + String(i+1) ]);
			DrillUp.g_OH_self_list[i]['status'] = String(DrillUp.g_OH_self_list[i]["按钮初始状态"] || "禁用");
			DrillUp.g_OH_self_list[i]['commonevents'] = Number(DrillUp.g_OH_self_list[i]["执行的公共事件"] || 0);
			DrillUp.g_OH_self_list[i]['pipeType'] = String(DrillUp.g_OH_self_list[i]["公共事件执行方式"] || "并行");
			DrillUp.g_OH_self_list[i]['closeHud'] = String(DrillUp.g_OH_self_list[i]["执行后是否收起面板"] || "true") === "true";
			DrillUp.g_OH_self_list[i]['btn_src'] = String(DrillUp.g_OH_self_list[i]["资源-自定义按钮"] || "");
			DrillUp.g_OH_self_list[i]['btn_src_lock'] = String(DrillUp.g_OH_self_list[i]["资源-自定义按钮-封印"] || "");
			DrillUp.g_OH_self_list[i]['x'] = Number(DrillUp.g_OH_self_list[i]["偏移-自定义按钮 X"] || 0);
			DrillUp.g_OH_self_list[i]['y'] = Number(DrillUp.g_OH_self_list[i]["偏移-自定义按钮 Y"] || 0);
		}else{
			DrillUp.g_OH_self_list[i] = null;
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_LayerCommandThread ){
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapOperateHud = function(filename) {
    return this.loadBitmap('img/Map__ui_operatehud/', filename, 0, true);
};

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_OH_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_OH_pluginCommand.call(this, command, args);
	if(command === ">鼠标操作面板开启"){ $gameSystem._drill_OH_enable = true;};
	if(command === ">鼠标操作面板关闭"){ $gameSystem._drill_OH_enable = false;};
	if(command === ">鼠标操作面板"){
		
		/*-----------------开关------------------*/
		if(args.length == 2){				//>鼠标操作面板 : 开启
			var type = String(args[1]);
			if( type == "开启" ){
				$gameSystem._drill_OH_enable = true;
			}
			if( type == "关闭" ){
				$gameSystem._drill_OH_enable = false;
			}
		}
		
		/*-----------------按钮控制------------------*/
		if(args.length == 4){				//>鼠标操作面板 : 跳跃按钮 : 激活
			var btn = String(args[1]);
			var type = String(args[3]);
			
			if( btn == "菜单按钮" ){
				if( type == "激活" || type == "封印" || type == "禁用" ){
					$gameSystem._drill_OH_menu_status = type;
				}
			}
			if( btn == "跳跃按钮" ){
				if( type == "开启自动封印" ){
					$gameSystem._drill_OH_jump_status_auto = true;
				}
				if( type == "关闭自动封印" ){
					$gameSystem._drill_OH_jump_status_auto = false;
				}
				if( type == "激活" || type == "封印" ){
					$gameSystem._drill_OH_jump_status_auto = false;
					$gameSystem._drill_OH_jump_status = type;
				}
				if( type == "禁用" ){
					$gameSystem._drill_OH_jump_status = type;
				}
			}
			if( btn == "转向按钮" ){
				if( type == "开启自动封印" ){
					$gameSystem._drill_OH_rotate_status_auto = true;
				}
				if( type == "关闭自动封印" ){
					$gameSystem._drill_OH_rotate_status_auto = false;
				}
				if( type == "激活" || type == "封印" ){
					$gameSystem._drill_OH_rotate_status_auto = false;
					$gameSystem._drill_OH_rotate_status = type;
				}
				if( type == "禁用" ){
					$gameSystem._drill_OH_rotate_status = type;
				}
			}
			if( btn == "投掷按钮" ){
				if( type == "开启自动封印" ){
					$gameSystem._drill_OH_throw_status_auto = true;
				}
				if( type == "关闭自动封印" ){
					$gameSystem._drill_OH_throw_status_auto = false;
				}
				if( type == "激活" || type == "封印" ){
					$gameSystem._drill_OH_throw_status_auto = false;
					$gameSystem._drill_OH_throw_status = type;
				}
				if( type == "禁用" ){
					$gameSystem._drill_OH_throw_status = type;
				}
			}
			if( btn == "炸弹按钮" ){
				if( type == "开启自动封印" ){
					$gameSystem._drill_OH_bomb_status_auto = true;
				}
				if( type == "关闭自动封印" ){
					$gameSystem._drill_OH_bomb_status_auto = false;
				}
				if( type == "激活" || type == "封印" ){
					$gameSystem._drill_OH_bomb_status_auto = false;
					$gameSystem._drill_OH_bomb_status = type;
				}
				if( type == "禁用" ){
					$gameSystem._drill_OH_bomb_status = type;
				}
			}
			if( btn.indexOf("自定义按钮[") != -1 ){
				btn = btn.replace("自定义按钮[","");
				btn = btn.replace("]","");
				btn = Number(btn) - 1;
				
				if( type == "激活" || type == "封印" || type == "禁用" ){
					$gameSystem._drill_OH_self_status[ btn ] = type;
				}
			}
		}
	};
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_OH_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_OH_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_OH_sys_initialize.call(this);
	this.drill_OH_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_OH_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_OH_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_OH_saveEnabled == true ){	
		$gameSystem.drill_OH_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_OH_initSysData();
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
Game_System.prototype.drill_OH_initSysData = function() {
	this.drill_OH_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_OH_checkSysData = function() {
	this.drill_OH_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_OH_initSysData_Private = function() {
	
	this._drill_OH_menu_status = DrillUp.g_OH_menu_status;				//菜单
	this._drill_OH_jump_status = DrillUp.g_OH_jump_status;				//跳跃
	this._drill_OH_jump_status_auto = DrillUp.g_OH_jump_status_auto;
	this._drill_OH_rotate_status = DrillUp.g_OH_rotate_status;			//转向
	this._drill_OH_rotate_status_auto = DrillUp.g_OH_rotate_status_auto;
	this._drill_OH_throw_status = DrillUp.g_OH_throw_status;			//投掷
	this._drill_OH_throw_status_auto = DrillUp.g_OH_throw_status_auto;
	this._drill_OH_bomb_status = DrillUp.g_OH_bomb_status;				//炸弹
	this._drill_OH_bomb_status_auto = DrillUp.g_OH_bomb_status_auto;
	this._drill_OH_self_status = [];									//自定义
	for( var i=0; i < DrillUp.g_OH_self_list.length; i++ ){
		var data = DrillUp.g_OH_self_list[i];
		if( data == undefined ){ continue; }
		this._drill_OH_self_status[i] = data['status'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_OH_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_OH_self_status == undefined ){
		this.drill_OH_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_OH_self_list.length; i++ ){
		var temp_data = DrillUp.g_OH_self_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_OH_self_status[i] == undefined ){
				this._drill_OH_self_status[i] = temp_data['status'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//=============================================================================
// ** 地图
//=============================================================================
//==============================
// * 地图 - 初始化
//==============================
var _drill_OH_map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {	
	_drill_OH_map_initialize.call(this);
	this._drill_OH_map_oneLock = false;
};
//==============================
// * 地图 - 层级
//==============================
var _drill_OH_map_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function() {
	_drill_OH_map_createSpriteset.call(this);
	
	// > 创建层
	if (!this._drill_OH_layer) {		
		this._drill_OH_layer = new Sprite();
		this.addChild(this._drill_OH_layer);
	};
	
	// > 创建面板
	this._drill_OH = new Drill_Operate_Hud();
	this._drill_OH_layer.addChild(this._drill_OH);
};
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_OH_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_OH_map_update.call(this);
	
	// > 面板位置刷新
	var p_sprite = this.drill_OH_getPlayerSprite();
	if( p_sprite != null ){
		var _x = p_sprite.x + DrillUp.g_OH_x;
		var _y = p_sprite.y - 24 + DrillUp.g_OH_y;
		
		// > 镜头缩放【地图 - 活动地图镜头】
		if( Imported.Drill_LayerCamera ){	//（事件处于 下层、中层、上层 之间）
			_x = $gameSystem.drill_LCa_mapToCameraX( _x );
			_y = $gameSystem.drill_LCa_mapToCameraY( _y );
		}
		
		this._drill_OH.x = _x;
		this._drill_OH.y = _y;
	}
};
//=============================================================================
// ** 玩家贴图
//=============================================================================
//==============================
// * 玩家贴图 - 初始化
//==============================
var _drill_OH_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	this._drill_OH_playerSprite = null;
    _drill_OH_createCharacters.call(this);
	for( var i = this._characterSprites.length-1; i >= 0; i-- ){	//从最后一个开始索引
		if(this._characterSprites[i]._character == $gamePlayer){
			this._drill_OH_playerSprite = this._characterSprites[i];
			break;
		}
	}
};
//==============================
// * 玩家贴图 - 获取
//==============================
Scene_Map.prototype.drill_OH_getPlayerSprite = function() {	
	if( this._spriteset != undefined ){
		return this._spriteset._drill_OH_playerSprite;
	}
	return null;
}

//=============================================================================
// ** 点击触发
//=============================================================================
//==============================
// * 点击触发 - 拦截
//==============================
var _drill_OH_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {	
	if( this.drill_OH_canPlayerTouch() ){ 		//面板
		this.drill_OH_checkPlayerTouch();
	}
	if( this.drill_OH_canMapTouch() ){ 			//默认地图目的地
		_drill_OH_processMapTouch.call(this);
	}
};
//==============================
// * 点击触发 - 面板条件
//==============================
Scene_Map.prototype.drill_OH_canPlayerTouch = function() {	
	if( $gameSystem._drill_OH_enable == false ){return false}
	return true;
}
//==============================
// * 点击触发 - 默认地图目的地条件
//==============================
Scene_Map.prototype.drill_OH_canMapTouch = function() {	
	if( $gameSystem._drill_OH_enable == false ){return true}
	if( this._drill_OH._drill_OH_board_blocking ){return false}
	return true;
}

//==============================
// * 点击触发 - 查找阻止地图触发事件的条件（这里是帧刷新区域，必须确保只触发一次变化）
//==============================
Scene_Map.prototype.drill_OH_checkPlayerTouch = function() {	
	var p_sprite = this.drill_OH_getPlayerSprite();
	if( p_sprite == null ){ return; } 
		
	if( p_sprite.drill_OH_isOnCharacterSprite() ){
		if( TouchInput.isTriggered() ){		//确保一次按下后，持续时间段，只触发一次
			if( !this._drill_OH_map_oneLock ){	
				this._drill_OH_map_oneLock = true;
				
				this._drill_OH._drill_OH_board_blocking = true;	//展开面板
			}
		}else{
			this._drill_OH_map_oneLock = false;
		}
	}
	//展开面板后，退出面板让面板自己来做
}
//==============================
// * 点击触发 - 检查触发范围
//==============================
Sprite_Character.prototype.drill_OH_isOnCharacterSprite = function() { 
	if( this.bitmap == null ){ return false };
	if( this.bitmap.isReady() == false ){ return false };
	if( this.visible == false ){ return false };
	if( this.opacity == 0 ){ return false };
	var pw = this.patternWidth() /2;
	var ph = this.patternHeight() /2;
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	
	// > 镜头缩放【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){	//（事件贴图处于 下层、中层、上层 之间）
		_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );
		_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );
	}
	
	if ( _x < this.x - pw) {return false};
	if ( _x > this.x + pw) {return false};
	if ( _y < this.y - ph - 24) {return false};	//这个24是角色行走图偏移的修正值
	if ( _y > this.y + ph - 24) {return false};
	return true;	
};


//=============================================================================
// * Drill_Operate_Hud 面板
//	
//			说明：	该面板是为了包裹 互动 中的各项能力而设置的。
//					如果相关能力操作方式变化了，那么该插件的 鼠标/触屏 的结构要考虑修改了。
//			
// 			代码：	> 范围 - 仅用于面板按钮结构。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
//					> 数量 - [ ●单个 /多个 ] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 面板 - 定义
//==============================
function Drill_Operate_Hud() {
    this.initialize.apply(this, arguments);
};
Drill_Operate_Hud.prototype = Object.create(Sprite.prototype);
Drill_Operate_Hud.prototype.constructor = Drill_Operate_Hud;
//==============================
// * 面板 - 初始化
//==============================
Drill_Operate_Hud.prototype.initialize = function() {
	Sprite.prototype.initialize.call(this);
	this.opacity = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._drill_OH_board_blocking = false;		//控制正在开启或者关闭的开关
	this._drill_OH_board_blocking_change = false;
	
	this._drill_OH_btns = [];
	this._drill_OH_hoveringOne = null;
	this._drill_OH_hud_oneLock = false;
	
	this.drill_createLayout();
	this.drill_createBtn_Menu();
	this.drill_createBtn_Jump();
	this.drill_createBtn_Rotate();
	this.drill_createBtn_Throw();
	this.drill_createBtn_Bomb();
	this.drill_createBtn_Self();
	
	for(var i = 0 ; i < this._drill_OH_btns.length ; i++){		//初始不高亮
		var temp_sprite = this._drill_OH_btns[i];
		temp_sprite.opacity = DrillUp.g_OH_btn_opacity;
	}
};
//==============================
// * 初始化 - 布局
//==============================
Drill_Operate_Hud.prototype.drill_createLayout = function() {
	this._drill_OH_layout = new Sprite();
	this._drill_OH_layout.anchor.x = 0.5;
	this._drill_OH_layout.anchor.y = 0.5;
	this._drill_OH_layout.bitmap = ImageManager.load_MapOperateHud(DrillUp.g_OH_src_Layout);
	this.addChild(this._drill_OH_layout);
}
//==============================
// * 初始化 - 菜单按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Menu = function() {
	this._drill_menu = new Sprite();
	this._drill_menu.x = DrillUp.g_OH_menu_x;
	this._drill_menu.y = DrillUp.g_OH_menu_y;
	this._drill_menu.anchor.x = 0.5;
	this._drill_menu.anchor.y = 0.5;
	this._drill_menu._locked = false;
	this._drill_menu._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_menu_src);
	this._drill_menu._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_menu_src_lock);
	this._drill_menu.bitmap = this._drill_menu._bitmap_normal;
	this._drill_OH_btns.push(this._drill_menu);
	this.addChild(this._drill_menu);
}
//==============================
// * 初始化 - 跳跃按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Jump = function() {
	if( !Imported.Drill_Jump ){ 
		DrillUp.g_OH_jump_src_up = "";
		DrillUp.g_OH_jump_src_down = "";
		DrillUp.g_OH_jump_src_right = "";
		DrillUp.g_OH_jump_src_left = "";
		DrillUp.g_OH_jump_src_up_lock = "";
		DrillUp.g_OH_jump_src_down_lock = "";
		DrillUp.g_OH_jump_src_right_lock = "";
		DrillUp.g_OH_jump_src_left_lock = "";
	}
	this._drill_OH_jump_up = new Sprite();
	this._drill_OH_jump_up._locked = false;
	this._drill_OH_jump_up._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_up);
	this._drill_OH_jump_up._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_up_lock);
	this._drill_OH_jump_up.bitmap = this._drill_OH_jump_up._bitmap_normal;
	this._drill_OH_jump_up.x = 0;
	this._drill_OH_jump_up.y = -1 * DrillUp.g_OH_jump_distance;
	this._drill_OH_jump_up.anchor.x = 0.5;
	this._drill_OH_jump_up.anchor.y = 1;
	this._drill_OH_jump_down = new Sprite();
	this._drill_OH_jump_down._locked = false;
	this._drill_OH_jump_down._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_down);
	this._drill_OH_jump_down._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_down_lock);
	this._drill_OH_jump_down.bitmap = this._drill_OH_jump_down._bitmap_normal;
	this._drill_OH_jump_down.x = 0;
	this._drill_OH_jump_down.y = 1 * DrillUp.g_OH_jump_distance;
	this._drill_OH_jump_down.anchor.x = 0.5;
	this._drill_OH_jump_down.anchor.y = 0;
	this._drill_OH_jump_right = new Sprite();
	this._drill_OH_jump_right._locked = false;
	this._drill_OH_jump_right._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_right);
	this._drill_OH_jump_right._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_right_lock);
	this._drill_OH_jump_right.bitmap = this._drill_OH_jump_right._bitmap_normal;
	this._drill_OH_jump_right.x = 1 * DrillUp.g_OH_jump_distance;
	this._drill_OH_jump_right.y = 0;
	this._drill_OH_jump_right.anchor.x = 0;
	this._drill_OH_jump_right.anchor.y = 0.5;
	this._drill_OH_jump_left = new Sprite();
	this._drill_OH_jump_left._locked = false;
	this._drill_OH_jump_left._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_left);
	this._drill_OH_jump_left._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_jump_src_left_lock);
	this._drill_OH_jump_left.bitmap = this._drill_OH_jump_left._bitmap_normal;
	this._drill_OH_jump_left.x = -1 * DrillUp.g_OH_jump_distance;
	this._drill_OH_jump_left.y = 0;
	this._drill_OH_jump_left.anchor.x = 1;
	this._drill_OH_jump_left.anchor.y = 0.5;
	this._drill_OH_btns.push(this._drill_OH_jump_up);
	this._drill_OH_btns.push(this._drill_OH_jump_down);
	this._drill_OH_btns.push(this._drill_OH_jump_right);
	this._drill_OH_btns.push(this._drill_OH_jump_left);
	this.addChild(this._drill_OH_jump_up);
	this.addChild(this._drill_OH_jump_down);
	this.addChild(this._drill_OH_jump_right);
	this.addChild(this._drill_OH_jump_left);
}
//==============================
// * 初始化 - 转向按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Rotate = function() {
	if( !Imported.Drill_RotateDirection ){
		DrillUp.g_OH_rotate_src_up = "";
		DrillUp.g_OH_rotate_src_down = "";
		DrillUp.g_OH_rotate_src_right = "";
		DrillUp.g_OH_rotate_src_left = "";
		DrillUp.g_OH_rotate_src_up_lock = "";
		DrillUp.g_OH_rotate_src_down_lock = "";
		DrillUp.g_OH_rotate_src_right_lock = "";
		DrillUp.g_OH_rotate_src_left_lock = "";
	}
	this._drill_OH_rotate_up = new Sprite();
	this._drill_OH_rotate_up._locked = false;
	this._drill_OH_rotate_up._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_up);
	this._drill_OH_rotate_up._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_up_lock);
	this._drill_OH_rotate_up.bitmap = this._drill_OH_rotate_up._bitmap_normal;
	this._drill_OH_rotate_up.x = 0;
	this._drill_OH_rotate_up.y = -1 * DrillUp.g_OH_rotate_distance;
	this._drill_OH_rotate_up.anchor.x = 0.5;
	this._drill_OH_rotate_up.anchor.y = 1;
	this._drill_OH_rotate_down = new Sprite();
	this._drill_OH_rotate_down._locked = false;
	this._drill_OH_rotate_down._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_down);
	this._drill_OH_rotate_down._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_down_lock);
	this._drill_OH_rotate_down.bitmap = this._drill_OH_rotate_down._bitmap_normal;
	this._drill_OH_rotate_down.x = 0;
	this._drill_OH_rotate_down.y = 1 * DrillUp.g_OH_rotate_distance;
	this._drill_OH_rotate_down.anchor.x = 0.5;
	this._drill_OH_rotate_down.anchor.y = 0;
	this._drill_OH_rotate_right = new Sprite();
	this._drill_OH_rotate_right._locked = false;
	this._drill_OH_rotate_right._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_right);
	this._drill_OH_rotate_right._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_right_lock);
	this._drill_OH_rotate_right.bitmap = this._drill_OH_rotate_right._bitmap_normal;
	this._drill_OH_rotate_right.x = 1 * DrillUp.g_OH_rotate_distance;
	this._drill_OH_rotate_right.y = 0;
	this._drill_OH_rotate_right.anchor.x = 0;
	this._drill_OH_rotate_right.anchor.y = 0.5;
	this._drill_OH_rotate_left = new Sprite();
	this._drill_OH_rotate_left._locked = false;
	this._drill_OH_rotate_left._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_left);
	this._drill_OH_rotate_left._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_rotate_src_left_lock);
	this._drill_OH_rotate_left.bitmap = this._drill_OH_rotate_left._bitmap_normal;
	this._drill_OH_rotate_left.x = -1 * DrillUp.g_OH_rotate_distance;
	this._drill_OH_rotate_left.y = 0;
	this._drill_OH_rotate_left.anchor.x = 1;
	this._drill_OH_rotate_left.anchor.y = 0.5;
	this._drill_OH_btns.push(this._drill_OH_rotate_up);
	this._drill_OH_btns.push(this._drill_OH_rotate_down);
	this._drill_OH_btns.push(this._drill_OH_rotate_right);
	this._drill_OH_btns.push(this._drill_OH_rotate_left);
	this.addChild(this._drill_OH_rotate_up);
	this.addChild(this._drill_OH_rotate_down);
	this.addChild(this._drill_OH_rotate_right);
	this.addChild(this._drill_OH_rotate_left);
}
//==============================
// * 初始化 - 花盆按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Throw = function() {
	if( !Imported.Drill_PickThrow ){
		DrillUp.g_OH_throw_src = "";
		DrillUp.g_OH_throw_src_lock = "";
	}
	this._drill_OH_throw = new Sprite();
	this._drill_OH_throw._locked = false;
	this._drill_OH_throw._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_throw_src);
	this._drill_OH_throw._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_throw_src_lock);
	this._drill_OH_throw.bitmap = this._drill_OH_throw._bitmap_normal;
	this._drill_OH_throw.x = DrillUp.g_OH_throw_x;
	this._drill_OH_throw.y = DrillUp.g_OH_throw_y;
	this._drill_OH_throw.anchor.x = 0.5;
	this._drill_OH_throw.anchor.y = 0.5;
	this._drill_OH_btns.push(this._drill_OH_throw);
	this.addChild(this._drill_OH_throw);
}
//==============================
// * 初始化 - 炸弹按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Bomb = function() {
	if( !Imported.Drill_BombCore ){
		DrillUp.g_OH_bomb_src = "";
		DrillUp.g_OH_bomb_src_lock = "";
	}
	this._drill_OH_bomb = new Sprite();
	this._drill_OH_bomb._locked = false;
	this._drill_OH_bomb._bitmap_normal = ImageManager.load_MapOperateHud(DrillUp.g_OH_bomb_src);
	this._drill_OH_bomb._bitmap_lock = ImageManager.load_MapOperateHud(DrillUp.g_OH_bomb_src_lock);
	this._drill_OH_bomb.bitmap = this._drill_OH_bomb._bitmap_normal;
	this._drill_OH_bomb.x = DrillUp.g_OH_bomb_x;
	this._drill_OH_bomb.y = DrillUp.g_OH_bomb_y;
	this._drill_OH_bomb.anchor.x = 0.5;
	this._drill_OH_bomb.anchor.y = 0.5;
	this._drill_OH_btns.push(this._drill_OH_bomb);
	this.addChild(this._drill_OH_bomb);
}
//==============================
// * 初始化 - 自定义按钮
//==============================
Drill_Operate_Hud.prototype.drill_createBtn_Self = function() {
	this._drill_OH_selfList = [];
	for( var i=0; i < DrillUp.g_OH_self_list.length; i++ ){
		var data = DrillUp.g_OH_self_list[i];
		if( data == null ){
			this._drill_OH_selfList[i] = null;
		}else{
			var temp_sprite = new Sprite();
			temp_sprite._locked = false;
			temp_sprite._bitmap_normal = ImageManager.load_MapOperateHud( data['btn_src'] );
			temp_sprite._bitmap_lock = ImageManager.load_MapOperateHud( data['btn_src_lock'] );
			temp_sprite.bitmap = temp_sprite._bitmap_normal;
			temp_sprite.x = data['x'];
			temp_sprite.y = data['y'];
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite['pipeType'] = data['pipeType'];				//参数转移
			temp_sprite['commonevents'] = data['commonevents'];	
			temp_sprite['closeHud'] = data['closeHud'];
			this._drill_OH_btns.push(temp_sprite);
			this.addChild(temp_sprite);
			this._drill_OH_selfList[i] = temp_sprite;
		}
	}
}
//==============================
// * 帧刷新
//==============================
Drill_Operate_Hud.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	// > 展开
	if(this._drill_OH_board_blocking_change != this._drill_OH_board_blocking){
		this._drill_OH_board_blocking_change = this._drill_OH_board_blocking;
		SoundManager.playCursor();
	}
	
	// > 显示
	if(this._drill_OH_board_blocking){
		this.drill_updateShowing();				//显示过程
		
		this.drill_updateCondition_Jump();		//跳跃按键变化
		this.drill_updateCondition_Throw();		//投掷按键变化
		this.drill_updateStatusCheck();			//自动封印
		this.drill_updateStatus();				//封印状态
		
		this.drill_updateHoverHighlight();		//高亮捕获
		this.drill_updatePlayerInput();			//操作监听
	}else{
		this.drill_updateHiding();				//隐藏过程
	}
}
//==============================
// * 帧刷新 - 显示过程
//==============================
Drill_Operate_Hud.prototype.drill_updateShowing = function() {
	this.opacity += 255/DrillUp.g_OH_time;
	for(var i=0; i < this._drill_OH_btns.length; i++){
		this._drill_OH_btns[i].scale.x += 1/DrillUp.g_OH_time;
		if( this._drill_OH_btns[i].scale.x >= 1 ){
			this._drill_OH_btns[i].scale.x = 1;
		}
		this._drill_OH_btns[i].scale.y = this._drill_OH_btns[i].scale.x;
	}
	
	this._drill_OH_layout.scale.x += 1/DrillUp.g_OH_time;
	if( this._drill_OH_layout.scale.x >= 1 ){
		this._drill_OH_layout.scale.x = 1;
	}
	this._drill_OH_layout.scale.y = this._drill_OH_layout.scale.x;
	if(DrillUp.g_OH_showing_rotate){
		this._drill_OH_layout.rotation += Math.PI /DrillUp.g_OH_time;
		if( this._drill_OH_layout.rotation >= Math.PI ){
			this._drill_OH_layout.rotation = Math.PI ;
		}
	}
}
//==============================
// * 帧刷新 - 隐藏过程
//==============================
Drill_Operate_Hud.prototype.drill_updateHiding = function() {
	this.opacity -= 255/DrillUp.g_OH_time;
	for(var i=0; i < this._drill_OH_btns.length; i++){
		this._drill_OH_btns[i].scale.x -= 1/DrillUp.g_OH_time;
		if( this._drill_OH_btns[i].scale.x <= 0 ){
			this._drill_OH_btns[i].scale.x = 0;
		}
		this._drill_OH_btns[i].scale.y = this._drill_OH_btns[i].scale.x;
	}
	
	this._drill_OH_layout.scale.x -= 1/DrillUp.g_OH_time;
	if( this._drill_OH_layout.scale.x <= 0 ){
		this._drill_OH_layout.scale.x = 0;
	}
	this._drill_OH_layout.scale.y = this._drill_OH_layout.scale.x;
	if(DrillUp.g_OH_showing_rotate){
		this._drill_OH_layout.rotation -= Math.PI /DrillUp.g_OH_time;
		if( this._drill_OH_layout.rotation <= 0 ){
			this._drill_OH_layout.rotation = 0;
		}
	}
}

//==============================
// * 帧刷新 - 跳跃按键变化
//==============================
Drill_Operate_Hud.prototype.drill_updateCondition_Jump = function(){
	if( Imported.Drill_Jump ){
		if( $gamePlayer.direction() == 2 ){
			this._drill_OH_jump_up.visible = false;
			this._drill_OH_jump_down.visible = true;
			this._drill_OH_jump_left.visible = false;
			this._drill_OH_jump_right.visible = false;
		}
		if( $gamePlayer.direction() == 4 ){
			this._drill_OH_jump_up.visible = false;
			this._drill_OH_jump_down.visible = false;
			this._drill_OH_jump_left.visible = true;
			this._drill_OH_jump_right.visible = false;
		}
		if( $gamePlayer.direction() == 6 ){
			this._drill_OH_jump_up.visible = false;
			this._drill_OH_jump_down.visible = false;
			this._drill_OH_jump_left.visible = false;
			this._drill_OH_jump_right.visible = true;
		}
		if( $gamePlayer.direction() == 8 ){
			this._drill_OH_jump_up.visible = true;
			this._drill_OH_jump_down.visible = false;
			this._drill_OH_jump_left.visible = false;
			this._drill_OH_jump_right.visible = false;
		}
		if( this._drill_OH_hoveringOne != null
		 && this._drill_OH_hoveringOne.visible == false ){
			this._drill_OH_hoveringOne = null;
		}
	}
}
//==============================
// * 帧刷新 - 投掷按键变化
//==============================
Drill_Operate_Hud.prototype.drill_updateCondition_Throw = function(){
	if( Imported.Drill_PickThrow ){
		if( $gamePlayer._drill_PT_is_lifting ){
			this._drill_OH_throw.visible = true;
		}else{
			this._drill_OH_throw.visible = false;
		}
		if( this._drill_OH_hoveringOne != null
		 && this._drill_OH_hoveringOne.visible == false ){
			this._drill_OH_hoveringOne = null;
		}
	}
}
//==============================
// * 帧刷新 - 自动封印
//==============================
Drill_Operate_Hud.prototype.drill_updateStatusCheck = function(){
	// > 菜单（无）
	
	// > 跳跃
	if( $gameSystem._drill_OH_jump_status_auto == true ){
		if( $gamePlayer.drill_canJump_Normal() && $gamePlayer.drill_canJump_Conditional() ){
			$gameSystem._drill_OH_jump_status = "激活";
		}else{
			$gameSystem._drill_OH_jump_status = "封印";
		}
	}
	// > 转向
	if( $gameSystem._drill_OH_rotate_status_auto == true ){
		if( $gamePlayer.drill_canRotate_Normal() && $gamePlayer.drill_canRotate_Conditional() ){
			$gameSystem._drill_OH_rotate_status = "激活";
		}else{
			$gameSystem._drill_OH_rotate_status = "封印";
		}
	}
	// > 投掷
	if( $gameSystem._drill_OH_throw_status_auto == true ){
		if( $gamePlayer.drill_canThrow_Normal() && $gamePlayer.drill_canThrow_Conditional() ){
			$gameSystem._drill_OH_throw_status = "激活";
		}else{
			$gameSystem._drill_OH_throw_status = "封印";
		}
	}
	// > 炸弹
	if( $gameSystem._drill_OH_bomb_status_auto == true ){
		if( $gamePlayer.drill_canBomb_Normal() && $gamePlayer.drill_canBomb_Conditional() ){
			$gameSystem._drill_OH_bomb_status = "激活";
		}else{
			$gameSystem._drill_OH_bomb_status = "封印";
		}
	}
	
	// > 自定义（无）
}
//==============================
// * 帧刷新 - 封印状态
//==============================
Drill_Operate_Hud.prototype.drill_updateStatus = function(){
	
	// > 菜单
	if( $gameSystem._drill_OH_menu_status == "禁用" ){
		this._drill_menu.visible = false;		
	}else{
		this._drill_menu.visible = true;		
	}
	if( $gameSystem._drill_OH_menu_status == "封印" ){
		this._drill_menu._locked = true;		
		this._drill_menu.bitmap = this._drill_menu._bitmap_lock;		
	}else{
		this._drill_menu._locked = false;		
		this._drill_menu.bitmap = this._drill_menu._bitmap_normal;
	}
	// > 跳跃
	if( $gameSystem._drill_OH_jump_status == "禁用" ){
		this._drill_OH_jump_up.visible = false;		
		this._drill_OH_jump_down.visible = false;		
		this._drill_OH_jump_left.visible = false;		
		this._drill_OH_jump_right.visible = false;		
	}else{
		// ..跳跃按键变化
	}
	if( $gameSystem._drill_OH_jump_status == "封印" ){
		this._drill_OH_jump_up._locked = true;		
		this._drill_OH_jump_down._locked = true;		
		this._drill_OH_jump_left._locked = true;		
		this._drill_OH_jump_right._locked = true;		
		this._drill_OH_jump_up.bitmap = this._drill_OH_jump_up._bitmap_lock;		
		this._drill_OH_jump_down.bitmap = this._drill_OH_jump_down._bitmap_lock;		
		this._drill_OH_jump_left.bitmap = this._drill_OH_jump_left._bitmap_lock;		
		this._drill_OH_jump_right.bitmap = this._drill_OH_jump_right._bitmap_lock;		
	}else{
		this._drill_OH_jump_up._locked = false;		
		this._drill_OH_jump_down._locked = false;		
		this._drill_OH_jump_left._locked = false;		
		this._drill_OH_jump_right._locked = false;		
		this._drill_OH_jump_up.bitmap = this._drill_OH_jump_up._bitmap_normal;		
		this._drill_OH_jump_down.bitmap = this._drill_OH_jump_down._bitmap_normal;		
		this._drill_OH_jump_left.bitmap = this._drill_OH_jump_left._bitmap_normal;		
		this._drill_OH_jump_right.bitmap = this._drill_OH_jump_right._bitmap_normal;		
	}
	// > 转向
	if( $gameSystem._drill_OH_rotate_status == "禁用" ){
		this._drill_OH_rotate_up.visible = false;		
		this._drill_OH_rotate_down.visible = false;		
		this._drill_OH_rotate_left.visible = false;		
		this._drill_OH_rotate_right.visible = false;		
	}else{
		this._drill_OH_rotate_up.visible = true;		
		this._drill_OH_rotate_down.visible = true;		
		this._drill_OH_rotate_left.visible = true;		
		this._drill_OH_rotate_right.visible = true;		
	}
	if( $gameSystem._drill_OH_rotate_status == "封印" ){
		this._drill_OH_rotate_up._locked = true;		
		this._drill_OH_rotate_down._locked = true;		
		this._drill_OH_rotate_left._locked = true;		
		this._drill_OH_rotate_right._locked = true;		
		this._drill_OH_rotate_up.bitmap = this._drill_OH_rotate_up._bitmap_lock;		
		this._drill_OH_rotate_down.bitmap = this._drill_OH_rotate_down._bitmap_lock;		
		this._drill_OH_rotate_left.bitmap = this._drill_OH_rotate_left._bitmap_lock;		
		this._drill_OH_rotate_right.bitmap = this._drill_OH_rotate_right._bitmap_lock;		
	}else{
		this._drill_OH_rotate_up._locked = false;		
		this._drill_OH_rotate_down._locked = false;		
		this._drill_OH_rotate_left._locked = false;		
		this._drill_OH_rotate_right._locked = false;		
		this._drill_OH_rotate_up.bitmap = this._drill_OH_rotate_up._bitmap_normal;		
		this._drill_OH_rotate_down.bitmap = this._drill_OH_rotate_down._bitmap_normal;		
		this._drill_OH_rotate_left.bitmap = this._drill_OH_rotate_left._bitmap_normal;		
		this._drill_OH_rotate_right.bitmap = this._drill_OH_rotate_right._bitmap_normal;		
	}
	// > 投掷
	if( $gameSystem._drill_OH_throw_status == "禁用" ){
		this._drill_OH_throw.visible = false;		
	}else{
		// ..投掷按键变化
	}
	if( $gameSystem._drill_OH_throw_status == "封印" ){
		this._drill_OH_throw._locked = true;	
		this._drill_OH_throw.bitmap = this._drill_OH_throw._bitmap_lock;		
	}else{
		this._drill_OH_throw._locked = false;	
		this._drill_OH_throw.bitmap = this._drill_OH_throw._bitmap_normal;
	}
	// > 炸弹
	if( $gameSystem._drill_OH_bomb_status == "禁用" ){
		this._drill_OH_bomb.visible = false;		
	}else{
		this._drill_OH_bomb.visible = true;		
	}
	if( $gameSystem._drill_OH_bomb_status == "封印" ){
		this._drill_OH_bomb._locked = true;		
		this._drill_OH_bomb.bitmap = this._drill_OH_bomb._bitmap_lock;		
	}else{
		this._drill_OH_bomb._locked = false;	
		this._drill_OH_bomb.bitmap = this._drill_OH_bomb._bitmap_normal;
	}
	// > 自定义
	for( var i=0; i < this._drill_OH_selfList.length; i++ ){
		var sprite = this._drill_OH_selfList[i];
		var status = $gameSystem._drill_OH_self_status[i];
		if( status == null ){ continue; }
		if( sprite == null ){ continue; }
		
		if( status == "禁用" ){
			sprite.visible = false;		
		}else{
			sprite.visible = true;		
		}
		if( status == "封印" ){
			sprite._locked = true;		
			sprite.bitmap = sprite._bitmap_lock;		
		}else{
			sprite._locked = false;	
			sprite.bitmap = sprite._bitmap_normal;
		}
	}
}

//=============================================================================
// * 高亮控制
//=============================================================================
//==============================
// * 高亮 - 高亮捕获
//==============================
Drill_Operate_Hud.prototype.drill_updateHoverHighlight = function() {
	//按钮里面，只能同时高亮一个按钮，并且最前面的按钮优先权最高

	if(this._drill_OH_hoveringOne == null){	//如果没有，先找到一个按钮
		for(var i = 0 ; i < this._drill_OH_btns.length ; i++){	
			var temp_sprite = this._drill_OH_btns[i];
			if( this.drill_isHoverBtnSprite(temp_sprite) && temp_sprite._locked == false ){
				temp_sprite.opacity = DrillUp.g_OH_btn_l_opacity;
				this._drill_OH_hoveringOne = temp_sprite;
				SoundManager.playCursor();
				break;
			}
		}
	}else{	
		for(var i = 0 ; i < this._drill_OH_btns.length ; i++){	
			var temp_sprite = this._drill_OH_btns[i];
			if(this._drill_OH_hoveringOne == temp_sprite){break};	//搜索中没有更上级的按钮了
			
			if( this.drill_isHoverBtnSprite(temp_sprite) && temp_sprite._locked == false ){
				this._drill_OH_hoveringOne.opacity = DrillUp.g_OH_btn_opacity; //鼠标找到了更上级的新按钮
				temp_sprite.opacity = DrillUp.g_OH_btn_l_opacity;
				this._drill_OH_hoveringOne = temp_sprite;
				SoundManager.playCursor();
				break;
			}
		}
		if( !this.drill_isHoverBtnSprite(this._drill_OH_hoveringOne) ){
			this._drill_OH_hoveringOne.opacity = DrillUp.g_OH_btn_opacity;  //鼠标离开指定按钮
			this._drill_OH_hoveringOne = null;
		}
	}
	
};

//==============================
// * 高亮 - 判断指定按钮高亮
//==============================
Drill_Operate_Hud.prototype.drill_isHoverBtnSprite = function(sprite) {
	if (sprite == null){ return false };
	if (sprite.bitmap == null){ return false };
	if (!sprite.bitmap.isReady() ){ return false };
	if (sprite.visible === false) {return false};
	if (sprite.opacity === 0) {return false};
	var cw = sprite.bitmap.width ;
	var ch = sprite.bitmap.height ;
	var cx = sprite.x ;
	var cy = sprite.y ;
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if ( _x < this.x + cx - cw*sprite.anchor.x + 0  ){return false};
	if ( _x > this.x + cx - cw*sprite.anchor.x + cw ){return false};
	if ( _y < this.y + cy - ch*sprite.anchor.y + 0  ){return false};
	if ( _y > this.y + cy - ch*sprite.anchor.y + ch ){return false};
	return true;	
};

//=============================================================================
// ** 按钮操作
//=============================================================================
//==============================
// ** 操作监听
//==============================
Drill_Operate_Hud.prototype.drill_updatePlayerInput = function() {
	
	if( TouchInput.isTriggered() ){		//确保一次按下后，持续时间段内，只触发一次
		if( !this._drill_OH_hud_oneLock ){	
			this._drill_OH_hud_oneLock = true;
			
			this.drill_triggerPlayerInput();
		}
	}else{
		this._drill_OH_hud_oneLock = false;
	}
}
//==============================
// ** 执行面板动作
//==============================
Drill_Operate_Hud.prototype.drill_triggerPlayerInput = function() {
	
	// > 点击其他地方，撤回面板
	if( !this.drill_isOnAnyBtnSprite() ){
		this._drill_OH_board_blocking = false;
		return;
	}
	
	// > 点击了封印的按钮
	if( this._drill_OH_hoveringOne == null ){
		SoundManager.playBuzzer();	
		return;
	}
	
	// > 菜单
	if( this._drill_OH_hoveringOne == this._drill_menu ){
		SoundManager.playOk();
		SceneManager.push(Scene_Menu);
	}
	// > 跳跃
	if( Imported.Drill_Jump && $gamePlayer.drill_canJump_Normal()){
		if( this._drill_OH_hoveringOne == this._drill_OH_jump_up ||
			this._drill_OH_hoveringOne == this._drill_OH_jump_down ||
			this._drill_OH_hoveringOne == this._drill_OH_jump_left ||
			this._drill_OH_hoveringOne == this._drill_OH_jump_right ){
			if( $gamePlayer.drill_canJump_Conditional() ){//跳跃
				$gamePlayer.drill_doJump();
				this._drill_OH_board_blocking = false;
			}else{
				SoundManager.playBuzzer();
			}	
		}
	}
	// > 转向
	if( Imported.Drill_RotateDirection && $gamePlayer.drill_canRotate_Normal()){
		if( this._drill_OH_hoveringOne == this._drill_OH_rotate_up ){
			
			if( $gamePlayer.drill_canRotate_Conditional() ){//上
				$gamePlayer.setDirection(8);
				this._drill_OH_board_blocking = false;
			}else{
				SoundManager.playBuzzer();
			}	
		}
		if( this._drill_OH_hoveringOne == this._drill_OH_rotate_down ){
			
			if( $gamePlayer.drill_canRotate_Conditional() ){//下
				$gamePlayer.setDirection(2);
				this._drill_OH_board_blocking = false;
			}else{
				SoundManager.playBuzzer();
			}	
		}
		if( this._drill_OH_hoveringOne == this._drill_OH_rotate_left ){
			
			if( $gamePlayer.drill_canRotate_Conditional() ){//左
				$gamePlayer.setDirection(4);
				this._drill_OH_board_blocking = false;
			}else{
				SoundManager.playBuzzer();
			}	
		}
		if( this._drill_OH_hoveringOne == this._drill_OH_rotate_right ){
			
			if( $gamePlayer.drill_canRotate_Conditional() ){//右
				$gamePlayer.setDirection(6);
				this._drill_OH_board_blocking = false;
			}else{
				SoundManager.playBuzzer();
			}	
		}
	}
	// > 投掷
	if( Imported.Drill_PickThrow && $gamePlayer.drill_canThrow_Normal()){
		if( this._drill_OH_hoveringOne == this._drill_OH_throw ){
			
			if( $gamePlayer.drill_canThrow_Conditional() ){
				$gamePlayer.drill_doThrow();
				this._drill_OH_board_blocking = false;
			}else{
				SoundManager.playBuzzer();
			}	
		}
	}		
	// > 炸弹
	if( Imported.Drill_BombCore && $gamePlayer.drill_canBomb_Normal()){
		if( this._drill_OH_hoveringOne == this._drill_OH_bomb ){
			
			if( $gamePlayer.drill_canBomb_Conditional() ){
				$gamePlayer.drill_doBomb();
				this._drill_OH_board_blocking = false;
			}else{
				SoundManager.playBuzzer();
			}	
		}
	}
	// > 自定义
	for( var i=0; i < this._drill_OH_selfList.length; i++ ){
		var sprite = this._drill_OH_selfList[i];
		var data = DrillUp.g_OH_self_list[i];
		var status = $gameSystem._drill_OH_self_status[i];
		if( status == null ){ continue; }
		if( sprite == null ){ continue; }
		
		if( this._drill_OH_hoveringOne == sprite ){
			// > 执行公共事件时，被封印，但是鼠标没离开按钮情况
			if( status == "禁用" || status == "封印" ){ 
				this._drill_OH_hoveringOne.opacity = DrillUp.g_OH_btn_opacity; 
				this._drill_OH_hoveringOne = null;
				continue;
			}
			
			// > 执行公共事件
			//$gameTemp.reserveCommonEvent( data['commonevents'] );
			SoundManager.playOk();
			var temp_data = {
				'type':"公共事件",
				'pipeType': data['pipeType'],
				'commonEventId': data['commonevents'],
			};
			$gameMap.drill_LCT_addPipeEvent( temp_data );
			
			if( sprite['closeHud'] ){
				this._drill_OH_board_blocking = false;
			}
		}
	}
}

//==============================
// ** 举起花盆的鼠标支持
//==============================
if( Imported.Drill_PickThrow ){
	Game_Player.prototype.drill_isPickControl = function() {
		//确定键 + 鼠标按键
		return Input.isPressed('ok') || TouchInput.isTriggered();
	}
}

//==============================
// * 判断面板任一按钮鼠标触发
//==============================
Drill_Operate_Hud.prototype.drill_isOnAnyBtnSprite = function() {
	for(var i=0; i < this._drill_OH_btns.length; i++){
		if( this.drill_isOnBtnSprite(this._drill_OH_btns[i]) ){
			return true;
		}
	}
	return false;	
}
//==============================
// * 判断指定按钮鼠标触发
//==============================
Drill_Operate_Hud.prototype.drill_isOnBtnSprite = function(sprite) {
	if (sprite == null){ return false };
	if (sprite.bitmap == null){ return false };
	if (!sprite.bitmap.isReady() ){ return false };
	if (sprite.visible === false) {return false};
	if (sprite.opacity === 0) {return false};
	var cw = sprite.bitmap.width ;
	var ch = sprite.bitmap.height ;
	var cx = sprite.x ;
	var cy = sprite.y ;
	
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if ( _x < this.x + cx - cw*sprite.anchor.x + 0  ){return false};
	if ( _x > this.x + cx - cw*sprite.anchor.x + cw ){return false};
	if ( _y < this.y + cy - ch*sprite.anchor.y + 0  ){return false};
	if ( _y > this.y + cy - ch*sprite.anchor.y + ch ){return false};
	return true;	
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_OperateHud = false;
		alert(
			"【Drill_OperateHud.js 鼠标 - 鼠标辅助操作面板】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心" + 
			"\n- Drill_LayerCommandThread 地图-多线程"
		);
}

