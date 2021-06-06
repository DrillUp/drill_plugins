//=============================================================================
// Drill_LayerIllumination.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        地图 - 自定义照明效果
 * @author Drill_up,紫悠
 * 
 * @Drill_LE_param "光源-%d"
 * @Drill_LE_parentKey "---光源组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LIl_light_length"
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerIllumination +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以用自己画的照明资源图片，然后绑定到玩家、事件身上。
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，也可以扩展下列插件：
 * 作用于：
 *   - Drill_MouseIllumination     鼠标 - 自定义照明效果★★v1.1及以上★★
 *     使得鼠标也能够具备照明效果。
 *   - Drill_BombCore              炸弹人 - 游戏核心
 *     使得炸弹人的炸弹能够具备照明效果。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于玩家、事件。
 * 2.建议先了解基本定义"显示与透明度.docx"。
 *   详细内容可以去看看"关于自定义照明效果.docx"。
 * 黑暗层：
 *   (1.黑暗层可以放在地图层级的 上层、图片层、最顶层。
 *      一般为上层，因为再往上的层级可以挡住ui和图片。
 *   (2.黑暗层的底层原理是滤镜，所以不能修改混合模式。
 *      黑暗层默认是固定黑色"#000000"。
 * 黑暗层开关：
 *   (1.黑暗层通过插件指令进行开关。
 *      开启/关闭后将会执行一段过渡时间，类似于昼夜更替。
 *   (2.地图备注 会临时锁定该地图的黑暗层设置，
 *      离开该地图后恢复原黑暗层设置。
 *   (3.插件指令无法影响 锁定地图 的黑暗层。但是可以影响默认的黑暗层。
 *      比如，屋内地图添加 锁定注释，屋外地图 无注释。
 *      那么，在屋内执行插件指令，屋内不会变黑，去了屋外，会发现已经变黑。
 *   (4.地图备注主要用于 黑暗层 不受外界影响变化的地图，
 *      比如，屋内、车厢、山洞、鬼屋、过场剧情地图 等。
 * 自画资源：
 *   (1.所有照明的形状、大小都需要你自己画照明素材来提供。
 *      通常为白色和透明为主。
 *   (2.rmmv单个图块的像素是48x48。所需光照素材的大小通常较大，
 *      你也可以修改光源配置的 缩放比例 来放大光源。
 * 多种颜色：
 *   (1.资源图片的颜色默认都是纯白与透明。
 *      你可以设置其它颜色，可以产生不同效果，但要注意区分。
 *   (2.插件与纯色滤镜的功能相似。
 *      光的三原色是：红、绿、蓝。 
 *      黄=红+绿。紫=红+蓝。青=蓝+绿。白=红+绿+蓝。
 *   (3.黑暗层默认是纯黑色，如果你设置纯蓝，地图界面将会看见蓝色光线。
 *      不要用纯白色，因为什么光线都过滤不了。
 * 物体照明：
 *   (1.物体照明的注释 跨事件页，不关会长期存在。
 *      如果要关闭照明，需要添加"关闭照明"的注释。
 *      插件指令设置只在当前地图有效，离开地图失效。
 *      但是玩家的照明设置不会失效。
 *   (2.每个事件只能绑定一个照明效果。
 *      并且这个照明效果可以随着事件的朝向而转向。
 *   (3.当你切换进入菜单后，立刻离开，你会发现光源会闪一下。
 *      这属于正常现象，因为切换时，地图必须重新扫描加载全部光源。
 * 限时动态照明：
 *   (1.动态照明只能存在一段时间，时间结束后会被清除。
 *   (2.动态照明不能转向。
 * 设计：
 *   (1.你可以在地图注释中，设置颜色、透明度、开关等。
 *      可以实现不同的地图有不同的黑暗效果。
 *   (2.光源是以GIF的模式展现的，你可以制作gif动画的光源效果。
 *   (3.简单的方形、圆形光源，可以直接修改 缩放比例 来快速设置。
 * 旧版本：
 *   (1.注意，v1.3以前版本的黑暗层指令歧义很大，容易误解。
 *      新版本已经不支持旧指令，你需要重新设置指令。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__illumination （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__illumination文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 光源-1 资源-光源GIF
 * 光源-2 资源-光源GIF
 * 光源-3 资源-光源GIF
 * ……
 * 
 * 所有素材都放在Map__illumination文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 黑暗层
 * 你可以通过插件指令手动控制黑暗层：
 * 
 * 插件指令：>自定义照明 : 黑暗层 : 执行开启
 * 插件指令：>自定义照明 : 黑暗层 : 执行关闭
 * 插件指令：>自定义照明 : 黑暗层 : 修改黑暗层透明度 : 155
 * 插件指令：>自定义照明 : 黑暗层 : 修改黑暗层过渡时间 : 60
 * 插件指令：>自定义照明 : 黑暗层 : 修改黑暗层颜色 : #00ff00
 * 
 * 1."黑暗层透明度[0]"的值变为0时，照明效果将会自动关闭。
 *   只要透明度的值大于0，就表示启用了黑暗层，就会持续消耗并工作。
 *   注意，这里的黑暗层设置，不作用于 锁定 的地图。
 * 2."黑暗层过渡时间"单位为帧，1秒60帧。
 * 3.黑暗层与纯色滤镜的功能相似。颜色控制相应的过滤。
 *   不要用纯白色，因为什么光线都过滤不了。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 临时锁定 黑暗层
 * 你可以通过插件指令手动控制黑暗层：
 * 
 * 地图备注：=>自定义照明:临时锁定:开启
 * 地图备注：=>自定义照明:临时锁定:关闭
 * 地图备注：=>自定义照明:临时锁定:黑暗层透明度:155
 * 地图备注：=>自定义照明:临时锁定:黑暗层颜色:#00ff00
 * 
 * 1.注意，这里是地图备注，在地图的备注中添加。
 * 2.地图备注 会临时锁定该地图的黑暗层设置，离开该地图后恢复原黑暗层设置。
 *   插件指令无法影响 锁定地图 的黑暗层。但是可以影响默认的黑暗层。
 *   比如，屋内地图添加 锁定注释，屋外地图 无注释。
 *   那么，在屋内执行插件指令，屋内不会变黑，去了屋外，会发现已经变黑。
 * 3.地图备注主要用于 黑暗层 不受外界影响变化的地图，
 *   比如，屋内、车厢、山洞、鬼屋、过场剧情地图 等。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件照明
 * 你可以通过插件指令手动控制事件照明：
 * 
 * 事件注释：=>自定义照明 : 照明[1]
 * 事件注释：=>自定义照明 : 关闭照明
 * 
 * 插件指令：>自定义照明 : 物体照明 : 玩家 : 照明[1]
 * 插件指令：>自定义照明 : 物体照明 : 本事件 : 照明[1]
 * 插件指令：>自定义照明 : 物体照明 : 事件[10] : 照明[1]
 * 插件指令：>自定义照明 : 物体照明 : 事件变量[21] : 照明[1]
 * 插件指令：>自定义照明 : 物体照明 : 批量事件[10,11] : 照明[1]
 * 插件指令：>自定义照明 : 物体照明 : 批量事件变量[21,22] : 照明[1]
 * 
 * 插件指令：>自定义照明 : 物体照明 : 玩家 : 照明[1]
 * 插件指令：>自定义照明 : 物体照明 : 玩家 : 关闭照明
 * 
 * 1.前面部分（玩家）和后面设置（照明[1]）可以随意组合。
 *   一共有6*2种组合方式。
 * 2."照明[1]"对应配置的第1个光源，光源和照明是一样的意思。
 * 3.事件注释的物体照明会长期存在，且跨事件页。
 *   如果要关闭照明，需要添加"关闭照明"的注释。
 *   而插件指令设置只在当前地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 限时动态照明
 * 你可以通过插件指令临时添加动态照明：
 * 
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐淡去 : 持续时间[180] : 玩家 : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐淡去 : 持续时间[180] : 位置[10,12] : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐淡去 : 持续时间[180] : 位置变量[25,26] : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐淡去 : 持续时间[180] : 本事件 : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐淡去 : 持续时间[180] : 事件[10] : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐淡去 : 持续时间[180] : 事件变量[21] : 照明[17]
 * 
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐淡去 : 持续时间[180] : 位置[10,12] : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐显现 : 持续时间[180] : 位置[10,12] : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 保持亮度 : 持续时间[10] : 位置[10,12] : 照明[17]
 * 
 * 1.前面部分（逐渐淡去）和后面设置（位置[10,12]）可以随意组合。
 *   一共有6*3种组合方式。
 * 2.限时动态照明在持续时间结束后，会被清除。多用于临时效果。
 * 3.限时动态照明出现后不会跟随事件、玩家移动。
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
 * 时间复杂度： o(n^2)*o(贴图处理)*o(遮罩渲染)
 * 测试方法：   在光源管理层进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【175.44ms】
 *              100个事件的地图中，平均消耗为：【138.23ms】
 *               50个事件的地图中，平均消耗为：【92.16ms】
 *               20个事件的地图中，平均消耗为：【76.23ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.经过数次优化，光源插件的性能还是比较难压下去，因为主要消耗GPU
 *   的能力，黑暗层和光源是在整个地图画面的基础上，再绘制一层遮罩。
 *   客户端打开的游戏没有性能问题，而用浏览器进行游戏会比较吃力。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了没有插件指令设置后未及时变色的bug。
 * 修复了添加动态光源时，gif和旋转角度重置的bug。
 * [v1.2]
 * 修复了菜单中地图截图在没有黑暗的情况下变黑的bug。
 * [v1.3]
 * 重新整理了 黑暗层开关 与 地图注释锁定 的关系。
 * 注意，旧版本的指令不再有效。
 * [v1.4]
 * 修复了部分特殊情况下，黑暗层不显示的bug。
 * [v1.5]
 * 修复了插件指令透明度的过渡过程。
 * 
 * 
 * 
 * @param ---黑暗层---
 * @default
 *
 * @param 初始是否开启黑暗层
 * @parent ---黑暗层---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，后续只能通过插件指令开关黑暗层。
 * @default false
 * 
 * @param 黑暗层过渡时间
 * @parent ---黑暗层---
 * @type number
 * @min 1
 * @desc 黑暗层开启/关闭时，显示/消失的过渡时间。
 * @default 60
 * 
 * @param 黑暗层透明度
 * @parent ---黑暗层---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 * 
 * @param 黑暗层颜色
 * @parent ---黑暗层---
 * @desc 填入颜色代码，比如#000000黑、#0000FF纯蓝。黑暗层与纯色滤镜的功能相似。颜色控制相应的过滤。你也可以通过插件指令修改。
 * @default #000000
 *
 * @param 黑暗层层级
 * @parent ---黑暗层---
 * @type select
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 黑暗层的地图层级。
 * @default 上层
 * 
 * @param ---光源组 1至20---
 * @default
 *
 * @param 光源-1
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==圆形60x60==","--贴图--":"","资源-光源GIF":"[\"自定义照明-圆形60x60\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-2
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==圆形90x90==","--贴图--":"","资源-光源GIF":"[\"自定义照明-圆形90x90\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-3
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==圆形120x120==","--贴图--":"","资源-光源GIF":"[\"自定义照明-圆形120x120\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-4
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==圆形180x180==","--贴图--":"","资源-光源GIF":"[\"自定义照明-圆形180x180\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-5
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==方形60x60==","--贴图--":"","资源-光源GIF":"[\"自定义照明-方形60x60\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-6
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==方形90x90==","--贴图--":"","资源-光源GIF":"[\"自定义照明-方形90x90\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-7
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==方形120x120==","--贴图--":"","资源-光源GIF":"[\"自定义照明-方形120x120\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-8
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==方形180x180==","--贴图--":"","资源-光源GIF":"[\"自定义照明-方形180x180\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-9
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==渐变圆形60x60==","--贴图--":"","资源-光源GIF":"[\"自定义照明-渐变圆形60x60\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-10
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==渐变圆形90x90==","--贴图--":"","资源-光源GIF":"[\"自定义照明-渐变圆形90x90\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-11
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==渐变圆形120x120==","--贴图--":"","资源-光源GIF":"[\"自定义照明-渐变圆形120x120\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-12
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==渐变圆形180x180==","--贴图--":"","资源-光源GIF":"[\"自定义照明-渐变圆形180x180\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-13
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==渐变方形60x60==","--贴图--":"","资源-光源GIF":"[\"自定义照明-渐变方形60x60\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-14
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==渐变方形90x90==","--贴图--":"","资源-光源GIF":"[\"自定义照明-渐变方形90x90\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-15
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==渐变方形120x120==","--贴图--":"","资源-光源GIF":"[\"自定义照明-渐变方形120x120\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-16
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==渐变方形180x180==","--贴图--":"","资源-光源GIF":"[\"自定义照明-渐变方形180x180\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","是否根据事件朝向转向":"true","转向类型":"瞬间转向","转向速度":"5.0","--透明度变化--":"","透明度":"255"}
 *
 * @param 光源-17
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==大圆照明==","--贴图--":"","资源-光源GIF":"[\"自定义照明-大圆照明\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 * 
 * @param 光源-18
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==超大圆照明==","--贴图--":"","资源-光源GIF":"[\"自定义照明-大圆照明\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"2.0","缩放 Y":"2.0","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 *
 * @param 光源-19
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==炸弹人-炸弹火苗==","--贴图--":"","资源-光源GIF":"[\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁2\",\"自定义照明-灯光-闪烁2\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁2\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁2\",\"自定义照明-灯光-闪烁2\",\"自定义照明-灯光-闪烁2\"]","帧间隔":"5","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"0.4","缩放 Y":"0.4","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"155","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 *
 * @param 光源-20
 * @parent ---光源组 1至20---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==炸弹人-爆炸光亮==","--贴图--":"","资源-光源GIF":"[\"自定义照明-渐变圆形180x180\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"3.2","缩放 Y":"3.2","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 *
 * @param ---光源组21至40---
 * @default
 *
 * @param 光源-21
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==手电筒-瞬间转向==","--贴图--":"","资源-光源GIF":"[\"自定义照明-手电筒\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"根据事件朝向转向","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 * 
 * @param 光源-22
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==手电筒-匀速转向==","--贴图--":"","资源-光源GIF":"[\"自定义照明-手电筒\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"根据事件朝向转向","事件转向类型":"匀速转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 * 
 * @param 光源-23
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==手电筒-弹性转向==","--贴图--":"","资源-光源GIF":"[\"自定义照明-手电筒\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"根据事件朝向转向","事件转向类型":"弹性转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 *
 * @param 光源-24
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==路灯照明-微弱闪烁==","--贴图--":"","资源-光源GIF":"[\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁2\",\"自定义照明-灯光-闪烁2\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁2\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁2\",\"自定义照明-灯光-闪烁2\",\"自定义照明-灯光-闪烁2\"]","帧间隔":"6","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 *
 * @param 光源-25
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==路灯照明-短路闪烁==","--贴图--":"","资源-光源GIF":"[\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"\",\"\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\",\"\",\"自定义照明-灯光-闪烁1\",\"\",\"自定义照明-灯光-闪烁1\",\"自定义照明-灯光-闪烁1\"]","帧间隔":"6","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 *
 * @param 光源-26
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==路灯照明-靠墙==","--贴图--":"","资源-光源GIF":"[\"自定义照明-灯光-靠墙\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 *
 * @param 光源-27
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==路灯照明-红灯==","--贴图--":"","资源-光源GIF":"[\"自定义照明-灯光-红\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"100","透明度波动周期":"120"}
 *
 * @param 光源-28
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==路灯照明-波动变化==","--贴图--":"","资源-光源GIF":"[\"自定义照明-灯光-闪烁1\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"波动透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"50","透明度波动周期":"120"}
 *
 * @param 光源-29
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==路灯照明-探照灯==","--贴图--":"","资源-光源GIF":"[\"自定义照明-灯光-探照灯\"]","帧间隔":"4","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"无限自旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-3.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"50","透明度波动周期":"120"}
 * 
 * @param 光源-30
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default {"标签":"==形状gif变化==","--贴图--":"","资源-光源GIF":"[\"自定义照明-方形120x120\",\"自定义照明-圆形120x120\",\"自定义照明-六边形120x120\"]","帧间隔":"75","是否倒放":"false","平移-光源 X":"0","平移-光源 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-2.5","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动最大值":"255","透明度波动最小值":"50","透明度波动周期":"120"}
 *
 * @param 光源-31
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-32
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-33
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-34
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-35
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-36
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-37
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-38
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-39
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-40
 * @parent ---光源组21至40---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---光源组41至60---
 * @default
 *
 * @param 光源-41
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-42
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-43
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-44
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-45
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-46
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-47
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-48
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-49
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-50
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-51
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-52
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-53
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-54
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-55
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-56
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-57
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-58
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-59
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-60
 * @parent ---光源组41至60---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---光源组61至80---
 * @default
 *
 * @param 光源-61
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-62
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-63
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-64
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-65
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-66
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-67
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-68
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-69
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-70
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-71
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-72
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-73
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-74
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-75
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-76
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-77
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-78
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-79
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-80
 * @parent ---光源组61至80---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---光源组81至100---
 * @default
 *
 * @param 光源-81
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-82
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-83
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-84
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-85
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-86
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-87
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-88
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-89
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-90
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-91
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-92
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-93
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-94
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-95
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-96
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-97
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-98
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-99
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-100
 * @parent ---光源组81至100---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---光源组101至120---
 * @default
 *
 * @param 光源-101
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-102
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-103
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-104
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-105
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-106
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-107
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-108
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-109
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-110
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-111
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-112
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-113
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-114
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-115
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-116
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-117
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-118
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-119
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-120
 * @parent ---光源组101至120---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---光源组121至140---
 * @default
 *
 * @param 光源-121
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-122
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-123
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-124
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-125
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-126
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-127
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-128
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-129
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-130
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-131
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-132
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-133
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-134
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-135
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-136
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-137
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-138
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-139
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-140
 * @parent ---光源组121至140---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---光源组141至160---
 * @default
 *
 * @param 光源-141
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-142
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-143
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-144
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-145
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-146
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-147
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-148
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-149
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-150
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-151
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-152
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-153
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-154
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-155
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-156
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-157
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-158
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-159
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-160
 * @parent ---光源组141至160---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---光源组161至180---
 * @default
 *
 * @param 光源-161
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-162
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-163
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-164
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-165
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-166
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-167
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-168
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-169
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-170
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-171
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-172
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-173
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-174
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-175
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-176
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-177
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-178
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-179
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-180
 * @parent ---光源组161至180---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---光源组181至200---
 * @default
 *
 * @param 光源-181
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-182
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-183
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-184
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-185
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-186
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-187
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-188
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-189
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-190
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-191
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-192
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-193
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-194
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-195
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-196
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-197
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-198
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-199
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 光源-200
 * @parent ---光源组181至200---
 * @type struct<LIlMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 */
/*~struct~LIlMapCircle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的地图光源==
 * 
 * 
 * @param --贴图--
 * @desc 
 *
 * @param 资源-光源GIF
 * @parent --贴图--
 * @desc png图片资源组，多张构成gif。也可以只是单张图片。
 * @default []
 * @require 1
 * @dir img/Map__illumination/
 * @type file[]
 *
 * @param 帧间隔
 * @parent --贴图--
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent --贴图--
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 * 
 * @param 平移-光源 X
 * @parent --贴图--
 * @desc x轴方向平移，单位像素。0表示光源中心贴在事件中心。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-光源 Y
 * @parent --贴图--
 * @desc x轴方向平移，单位像素。0表示光源中心贴在事件中心。正数向下，负数向上。
 * @default 0
 * 
 * @param 缩放 X
 * @parent --贴图--
 * @desc 魔法圈的缩放X值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 缩放 Y
 * @parent --贴图--
 * @desc 魔法圈的缩放Y值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param --朝向--
 * @desc 
 *
 * @param 旋转模式
 * @parent --朝向--
 * @type select
 * @option 不旋转
 * @value 不旋转
 * @option 根据事件朝向转向
 * @value 根据事件朝向转向
 * @option 无限自旋转
 * @value 无限自旋转
 * @desc 光源旋转的模式。
 * @default 不旋转
 *
 * @param 事件转向类型
 * @parent --朝向--
 * @type select
 * @option 瞬间转向
 * @value 瞬间转向
 * @option 匀速转向
 * @value 匀速转向
 * @option 弹性转向
 * @value 弹性转向
 * @desc 旋转模式为"根据事件朝向转向"时，初始的移动方式。
 * @default 瞬间转向
 *
 * @param 转向速度
 * @parent 事件转向类型
 * @desc 如果为"匀速转向"，则单位为角度/帧。如果为"弹性转向"，则值为比例除数。
 * @default 5.0
 *
 * @param 自旋转速度
 * @parent --朝向--
 * @desc 旋转模式为"无限自旋转"时，则单位为角度/帧。正数逆时针旋转，负数顺时针旋转。
 * @default -5.0
 * 
 * @param --透明度--
 * @desc 
 *
 * @param 透明度模式
 * @parent --透明度--
 * @type select
 * @option 固定透明度
 * @value 固定透明度
 * @option 波动透明度
 * @value 波动透明度
 * @desc 透明度的变化模式。
 * @default 固定透明度
 * 
 * @param 固定透明度
 * @parent --透明度--
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 * 
 * @param 透明度波动最大值
 * @parent --透明度--
 * @type number
 * @min 0
 * @max 255
 * @desc 为"波动透明度"模式时，0为完全透明，255为完全不透明。
 * @default 255
 * 
 * @param 透明度波动最小值
 * @parent --透明度--
 * @type number
 * @min 0
 * @max 255
 * @desc 为"波动透明度"模式时，0为完全透明，255为完全不透明。
 * @default 100
 * 
 * @param 透明度波动周期
 * @parent --透明度--
 * @type number
 * @min 2
 * @desc 透明度由最大到最小，再回到最大，所需要的时间。单位帧，1秒60帧。
 * @default 120
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LIl（Layer_Illumination）
//		临时全局变量	DrillUp.g_LIl_xxx
//		临时局部变量	this._drill_LIl_xxx
//		存储数据变量	$gameSystem._drill_LIl_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理)*o(遮罩渲染)
//		性能测试因素	光源管理层，乱跑
//		性能测试消耗	138.23ms
//		最坏情况		无
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			自定义照明效果：
//				->物体照明
//					->gif光源
//					->根据事件自旋转
//					->波动光源
//					->旋转、gif时间不被重刷
//				->多颜色光源
//				->限时动态照明
//					->突然爆炸的闪亮光源
//		
//		★私有类如下：
//			* Drill_LIl_MaskSprite【黑暗层遮罩】
//			* Drill_LIl_Sprite【光源贴图】
//			* Drill_LIl_FakeEvent【伪事件】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【重刷容器】。
//
//		★其它说明细节：
//			1.  2020-4-28 随着对pixi的深入，我发现了许多坏消息。
//				>最初，我发现了mask只对当前的sprite有效果，所有child根本不起作用。
//				 可能是mask只识别bitmap的问题，后来使用额外的渲染器和画布，直接绘制了一张新bitmap。
//				>但是bitmap无论怎么变，mask都不会改变。mask只认最初的那一个贴图材质。
//				 这里极有可能是进行了颜色矩阵的缓存，因为 赋值不同的bitmap、强行赋值mask、赋值不同的sprite、设置null 都不管用。
//				 为了测试可行性，花了半个下午。
//				>后来发现renderable有效，但是renderable会破坏颜色矩阵，将父类层级完全变成白色，并且变不回来。
//				 setBlendColor、setColorTone、blendMode 都没有用。
//				>思考了很久。最后，改变策略，既然光源要求黑布，那么就用 blendMode = 2 滤镜板来实现吧。
//				 滤镜板套子类会造成白色无效，于是，建一个画布直接对滤镜板的bitmap进行绘制，终于生效了。
//			2.简单说说结论：
//				1). mask 的child无效
//				2). mask + 绘制bitmap 不刷新
//				3). mask + 绘制bitmap + renderable 会导致颜色矩阵失真，只能全白，还不能变色。
//				4). mask + renderable 没有遮罩效果
//				5). mask + renderable + blendMode 没有遮罩效果
//				6). blendMode 的child，白色不能叠加
//				7). blendMode + 绘制bitmap
//				8). blendMode + 绘制texture 最终成型方案（texture比bitmap快一点，不过也没快多少）
//			  pixi所给的类，有很大的局限性，比如 循环sprite、mask、container等，都没有单纯的sprite那么灵活，
//			  可能也是基于硬件的限制，功能受限。
//			3.限时动态照明 是建立了一个假事件，这个事件用于缓冲到gamemap中，
//			  在游戏保存，切菜单时，都不会因为贴图被清而消失。
//				
//		★存在的问题：
//			1.pixi底层的部分功能有限，且难以修改，只能基于该渲染器作额外扩充。
//


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerIllumination = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerIllumination');

	/*-----------------黑暗层------------------*/
	DrillUp.g_LIl_enable = String(DrillUp.parameters["初始是否开启黑暗层"] || "false") == "true" ;
	DrillUp.g_LIl_sustainTime = Number(DrillUp.parameters["黑暗层过渡时间"] || 60) ;
	DrillUp.g_LIl_opacity = Number(DrillUp.parameters["黑暗层透明度"] || 255) ;
	DrillUp.g_LIl_layerColor = String(DrillUp.parameters["黑暗层颜色"] || "#000000") ;
	DrillUp.g_LIl_layer = String(DrillUp.parameters["黑暗层层级"] || "上层") ;
	
	/*-----------------光源------------------*/
	DrillUp.g_LIl_light_length = 200;
	DrillUp.g_LIl_light = [];	
	for (var i = 0; i < DrillUp.g_LIl_light_length; i++) {
		if( DrillUp.parameters["光源-" + String(i+1) ] != "" ){
			DrillUp.g_LIl_light[i] = JSON.parse(DrillUp.parameters["光源-" + String(i+1) ]);
			DrillUp.g_LIl_light[i]['gif_src'] = JSON.parse( DrillUp.g_LIl_light[i]["资源-光源GIF"] || []);
			DrillUp.g_LIl_light[i]['gif_interval'] = Number(DrillUp.g_LIl_light[i]["帧间隔"] || 4);
			DrillUp.g_LIl_light[i]['gif_back_run'] = String(DrillUp.g_LIl_light[i]["是否倒放"] || "false") == "true" ;
			DrillUp.g_LIl_light[i]['x'] = Number(DrillUp.g_LIl_light[i]["平移-光源 X"] || 0);
			DrillUp.g_LIl_light[i]['y'] = Number(DrillUp.g_LIl_light[i]["平移-光源 Y"] || 0);
			DrillUp.g_LIl_light[i]['scale_x'] = Number(DrillUp.g_LIl_light[i]["缩放 X"] || 1.0);
			DrillUp.g_LIl_light[i]['scale_y'] = Number(DrillUp.g_LIl_light[i]["缩放 Y"] || 1.0);
			
			DrillUp.g_LIl_light[i]['dir_mode'] = String(DrillUp.g_LIl_light[i]["旋转模式"] || "根据事件朝向转向");
			DrillUp.g_LIl_light[i]['dir_type'] = String(DrillUp.g_LIl_light[i]["事件转向类型"] || "瞬间转向");
			DrillUp.g_LIl_light[i]['dir_speed'] = Math.abs( Number(DrillUp.g_LIl_light[i]["转向速度"] || 5.0) );
			DrillUp.g_LIl_light[i]['dir_selfSpeed'] = Number(DrillUp.g_LIl_light[i]["自旋转速度"] || 5.0);
			
			DrillUp.g_LIl_light[i]['opacity_mode'] = String(DrillUp.g_LIl_light[i]["透明度模式"] || "固定透明度");
			DrillUp.g_LIl_light[i]['opacity_fix'] = Number(DrillUp.g_LIl_light[i]["固定透明度"] || 255);
			DrillUp.g_LIl_light[i]['opacity_max'] = Number(DrillUp.g_LIl_light[i]["透明度波动最大值"] || 255);
			DrillUp.g_LIl_light[i]['opacity_min'] = Number(DrillUp.g_LIl_light[i]["透明度波动最小值"] || 155);
			DrillUp.g_LIl_light[i]['opacity_period'] = Number(DrillUp.g_LIl_light[i]["透明度波动周期"] || 120);
			
		}else{
			DrillUp.g_LIl_light[i] = null;
		}
	}

	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapIllumination = function(filename) {
    return this.loadBitmap('img/Map__illumination/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LIl_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LIl_pluginCommand.call(this, command, args);
	if( command === ">自定义照明" ){
		
		/*-----------------黑暗层------------------*/
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "黑暗层" ){
				if( temp1 == "执行开启" ){
					$gameSystem.drill_LIl_setNewTargetOpacity( DrillUp.g_LIl_opacity );
				}
				if( temp1 == "执行关闭" ){
					$gameSystem.drill_LIl_setNewTargetOpacity( 0 );
				}
			}
		}
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "黑暗层" ){
				if( temp1 == "修改黑暗层过渡时间" ){
					$gameSystem._drill_LIl['tar_time'] = Math.max( 1, Number(temp2) );
				}
				if( temp1 == "修改黑暗层透明度" ){
					$gameSystem.drill_LIl_setNewTargetOpacity( Number(temp2) );
				}
				if( temp1 == "修改黑暗层颜色" ){
					$gameSystem._drill_LIl['layerColor'] = temp2;
				}
			}
		}
		
		// > 如果黑暗层未开，则插件指令无效
		if( $gameTemp.drill_LIl_isDarkMaskEnabled() == false ){ return; }
		
		/*-----------------物体照明------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var unit = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "物体照明" ){
				var e_ids = null;
				if( e_ids == null && unit == "本事件" ){
					e_ids = [];
					e_ids.push( this._eventId );
				}
				if( e_ids == null && unit.indexOf("批量事件[") != -1 ){
					unit = unit.replace("批量事件[","");
					unit = unit.replace("]","");
					var temp_arr = unit.split(/[,，]/);
					e_ids = [];
					for( var k=0; k < temp_arr.length; k++ ){
						e_ids.push( Number(temp_arr[j]) );
					}
				}
				if( e_ids == null && unit.indexOf("批量事件变量[") != -1 ){
					unit = unit.replace("批量事件变量[","");
					unit = unit.replace("]","");
					var temp_arr = unit.split(/[,，]/);
					e_ids = [];
					for( var k=0; k < temp_arr.length; k++ ){
						e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
					}
				}
				if( e_ids == null && unit.indexOf("事件[") != -1 ){
					unit = unit.replace("事件[","");
					unit = unit.replace("]","");
					e_ids = [];
					e_ids.push( Number(unit) );
				}
				if( e_ids == null && unit.indexOf("事件变量[") != -1 ){
					unit = unit.replace("事件变量[","");
					unit = unit.replace("]","");
					e_ids = [];
					e_ids.push( $gameVariables.value(Number(unit)) );
				}
				
				// 玩家
				if( unit == "玩家" ){
					if( temp2.indexOf("照明[") != -1 ){
						temp2 = temp2.replace("照明[","");
						temp2 = temp2.replace("]","");
						temp2 = Number(temp2);
						$gamePlayer._drill_LIl._light_id = Number(temp2) - 1;
						$gameTemp._drill_LIl_needRefresh = true;
					}
					if( temp2 == "关闭照明" ){
						$gamePlayer._drill_LIl._light_id = -1;
					}
				}
				// 鼠标（在子插件中）
				
				// 事件
				if( e_ids && e_ids.length > 0 ){
					if( temp2.indexOf("照明[") != -1 ){
						temp2 = temp2.replace("照明[","");
						temp2 = temp2.replace("]","");
						temp2 = Number(temp2);
						for( var j=0; j < e_ids.length; j++ ){
							var e_id = e_ids[j];
							if( $gameMap.drill_LIl_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							e._drill_LIl._light_id = Number(temp2) - 1;
						}
						$gameTemp._drill_LIl_needRefresh = true;
					}
					if( temp2 == "关闭照明" ){
						for( var j=0; j < e_ids.length; j++ ){
							var e_id = e_ids[j];
							if( $gameMap.drill_LIl_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							e._drill_LIl._light_id = -1;
						}
					}
				}
			}
		}
		/*-----------------限时动态照明------------------*/
		if(args.length == 10){
			var type = String(args[1]);
			var oType = String(args[3]);
			var temp1 = String(args[5]);
			var pos = String(args[7]);
			var temp3 = String(args[9]);
			if( type == "限时动态照明" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				temp3 = temp3.replace("照明[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3);
				
				var e_pos = null;
				if( pos.indexOf("位置变量[") != -1 ){
					pos = pos.replace("位置变量[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ $gameVariables.value(Number(temp_arr[0])),
								  $gameVariables.value(Number(temp_arr[1])) ];
					}
				}
				if( pos.indexOf("位置[") != -1 ){
					pos = pos.replace("位置[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
					}
				}
				if( pos.indexOf("事件变量[") != -1 ){
					pos = pos.replace("事件变量[","");
					pos = pos.replace("]","");
					var e_id = $gameVariables.value(Number(pos));
					if( $gameMap.drill_LIl_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					e_pos = [ e._realX, e._realY ];
				}
				if( pos.indexOf("事件[") != -1 ){
					pos = pos.replace("事件[","");
					pos = pos.replace("]","");
					var e_id = Number(pos);
					if( $gameMap.drill_LIl_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					e_pos = [ e._realX, e._realY ];
				}
				if( pos == "本事件" ){
					var e = $gameMap.event( this._eventId );
					e_pos = [ e._realX, e._realY ];
				}
				if( pos == "玩家" ){
					e_pos = [ $gamePlayer._realX, $gamePlayer._realY ];
				}
				// 鼠标位置（在子插件中）
				
				if( e_pos ){
					var data = {
						"light_id":temp3 - 1,				
						"light_type":"限时动态照明",
						"light_oType":oType,
						"life":temp1,
						"realX":Number(e_pos[0]),
						"realY":Number(e_pos[1]),
					}
					$gameMap._drill_LIl_fakeEvents.push( new Drill_LIl_FakeEvent( data ) );
					$gameTemp._drill_LIl_needRefresh = true;		
					//alert($gameMap._drill_LIl_fakeEvents.length);
				}
				
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_LIl_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_LayerIllumination.js 地图 - 自定义照明效果】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

//=============================================================================
// ** 存储变量初始化
//=============================================================================
//==============================
// * 存储变量 - 初始化
//==============================
var _drill_LIl_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LIl_sys_initialize.call(this);
	this.drill_LIl_init();
}
Game_System.prototype.drill_LIl_init = function() {
	this._drill_LIl = {};
	this._drill_LIl['cur_time'] = 0;									//黑暗层 - 当前时间
	this._drill_LIl['tar_time'] = DrillUp.g_LIl_sustainTime;			//黑暗层 - 过渡时间
	this._drill_LIl['cur_opacity'] = 0;									//黑暗层 - 当前透明度（实时变化）
	this._drill_LIl['last_opacity'] = 0;								//黑暗层 - 变化前透明度
	this._drill_LIl['next_opacity'] = 0;								//黑暗层 - 下一个透明度
	this._drill_LIl['layerColor'] = DrillUp.g_LIl_layerColor;			//黑暗层 - 颜色
	
	if( DrillUp.g_LIl_enable == true ){		//（初始开启，则设为指定透明度）
		this._drill_LIl['last_opacity'] = DrillUp.g_LIl_opacity;	
		this._drill_LIl['next_opacity'] = DrillUp.g_LIl_opacity;
	}
};
//==============================
// * 存储变量 - 设置透明度
//==============================
Game_System.prototype.drill_LIl_setNewTargetOpacity = function( opacity ){
	var l_data = this._drill_LIl;
	l_data['last_opacity'] = l_data['last_opacity'] + (l_data['next_opacity'] - l_data['last_opacity']) * l_data['cur_time'] / l_data['tar_time'];
	l_data['cur_time'] = 0;		//（从透明度A迈向透明度B）
	l_data['next_opacity'] = Math.min( 255, Math.max( 0, Number(opacity) ));
	
	//alert(l_data['cur_time']);
	//alert(l_data['tar_time']);
	//alert(l_data['last_opacity']);
	//alert(l_data['next_opacity']);
}

//=============================================================================
// ** 地图备注
//=============================================================================
var _drill_LIl_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_LIl_map_setup.call(this, mapId);
	this.drill_LIl_setupIllumination();
};
Game_Map.prototype.drill_LIl_setupIllumination = function() {
	
	// > 地图锁定初始化
	this._drill_LIl_lock = {};
	this._drill_LIl_lock['enableLocked'] = false;
	this._drill_LIl_lock['enable'] = false;									//黑暗层锁定 - 开关
	this._drill_LIl_lock['sustainTime'] = DrillUp.g_LIl_sustainTime;		//黑暗层锁定 - 过渡时间
	this._drill_LIl_lock['targetOpacity'] = DrillUp.g_LIl_opacity;			//黑暗层锁定 - 透明度
	this._drill_LIl_lock['layerColor'] = DrillUp.g_LIl_layerColor;			//黑暗层锁定 - 颜色
	
	$dataMap.note.split(/[\r\n]+/).forEach(function(note) {
		var args = note.split(':');
		var command = args.shift();
		if( command == "=>自定义照明"){
			if(args.length == 2){
				var temp1 = String(args[0]);
				var temp2 = String(args[1]);
				if( temp1 == "临时锁定"){
					if( temp2 == "关闭"){
						this._drill_LIl_lock['enableLocked'] = true;
						this._drill_LIl_lock['enable'] = false;
					}
					if( temp2 == "开启"){
						this._drill_LIl_lock['enableLocked'] = true;
						this._drill_LIl_lock['enable'] = true;
					}
				}
			}
			if(args.length == 3){
				var temp1 = String(args[0]);
				var type = String(args[1]);
				var temp2 = String(args[2]);
				if( temp1 == "临时锁定"){
					if( type == "黑暗层过渡时间"){		//（这个参数没有意义，地图切换不需要过渡。不过先放着）
						this._drill_LIl_lock['sustainTime'] = Math.max( 1, Number(temp2) );
					}
					if( type == "黑暗层透明度"){
						temp2 = Number(temp2);
						if( temp2 == 0 && this._drill_LIl_lock['enable'] == true ){
							alert( "【Drill_LayerIllumination.js 地图 - 自定义照明效果】\n" +
									"提示：你将临时锁定设为开启，又将当前地图的透明度设为了0。\n由于黑暗层是0为全亮，255为全黑，所以这样设置将没有任何效果，建议直接关闭。");
						}
						this._drill_LIl_lock['targetOpacity'] = temp2;
					}
					if( type == "黑暗层颜色"){
						this._drill_LIl_lock['layerColor'] = temp2;
					}
				}
			}
		}
	},this);
};


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 初始化
//==============================
var _drill_LIl_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function() {
	_drill_LIl_initialize.call(this);
	this._drill_LIl = {};
	this._drill_LIl._light_id = -1;					//光源id
	this._drill_LIl._light_time = -1;				//光源持续时间
	this._drill_LIl._light_type = "物体照明";		//光源类型
	this._drill_LIl._light_oType = "";				//光源变化因素
}
//==============================
// * 事件 - 帧刷新
//==============================
var _drill_LIl_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_drill_LIl_c_update.call(this);
	this._drill_LIl._light_time += 1;
}
//==============================
// * 事件 - 注释初始化
//==============================
var _drill_LIl_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_LIl_setupPage.call(this);
    this.drill_LIl_setupLight();
};
Game_Event.prototype.drill_LIl_setupLight = function() {		

	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>自定义照明"){
				if(args.length == 2){	//=>自定义照明 : 照明[1]
					var temp1 = String(args[1]);
					if( temp1.indexOf("照明[") != -1 ){
						temp1 = temp1.replace("照明[","");
						temp1 = temp1.replace("]","");
						$gameTemp._drill_LIl_needRefresh = true;
						this._drill_LIl._light_id = Number(temp1) - 1;
					}
					if( temp1 == "关闭照明" ){
						$gameTemp._drill_LIl_needRefresh = true;
						this._drill_LIl._light_id = -1;
					}
				}
			};
		};
	}, this);};
};
//==============================
// * 事件 - 判断钥匙
//==============================
Game_CharacterBase.prototype.drill_LIl_hasLights = function() {
	if( this._erased == true ){ return false; }
	return this._drill_LIl._light_id != -1;
}


//=============================================================================
// ** 事件容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_LIl_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_LIl_temp_initialize.call(this);
	this._drill_LIl_events = [];				//缓冲池 - 事件
	this._drill_LIl_sprites = [];				//缓冲池 - 鼠标贴图
	this._drill_LIl_needRefresh = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_LIl_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_LIl_events = [];
	$gameTemp._drill_LIl_sprites = [];	
	$gameTemp._drill_LIl_needRefresh = true;
	this.drill_LIl_resetFakeEvents();
	_drill_LIl_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_LIl_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_LIl_events = [];
	$gameTemp._drill_LIl_sprites = [];	
	$gameTemp._drill_LIl_needRefresh = true;
	_drill_LIl_smap_createCharacters.call(this);
}

//=============================================================================
// ** 帧刷新
//=============================================================================
var _drill_LIl_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_LIl_map_update.call(this,sceneActive);
	
	//（这里直接搬到Scene_Map中刷新）
};

//=============================================================================
// ** 帧刷新 - 刷新统计
//=============================================================================
Scene_Map.prototype.drill_LIl_updateLightCheck = function() {
	if( $gameTemp.drill_LIl_isDarkMaskEnabled() == false ){ return; }
	if( $gameTemp._drill_LIl_needRefresh != true ){ return }
	$gameTemp._drill_LIl_needRefresh = false;
	
	// > 玩家光源
	$gameTemp._drill_LIl_events = [];
	if( $gamePlayer.drill_LIl_hasLights() ){
		$gameTemp._drill_LIl_events.push($gamePlayer);
	}
	// > 事件光源
	var events = $gameMap.events();
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		if( temp_event.drill_LIl_hasLights() ){
			$gameTemp._drill_LIl_events.push(temp_event);
		}
	}
	
	
	// > 移除旧光源贴图
	for(var i=0; i< $gameTemp._drill_LIl_sprites.length; i++){
		var temp_sprite = $gameTemp._drill_LIl_sprites[i];
		this._drill_LIl_darkSprite.drill_LIl_removeMaskChild( temp_sprite );
	}
	
	// > 新建事件光源贴图
	$gameTemp._drill_LIl_sprites = [];
	for(var i=0; i< $gameTemp._drill_LIl_events.length; i++){
		var temp_event = $gameTemp._drill_LIl_events[i];
		var temp_sprite = new Drill_LIl_Sprite( temp_event );
		this._drill_LIl_darkSprite.drill_LIl_addMaskChild( temp_sprite );
		$gameTemp._drill_LIl_sprites.push(temp_sprite);
	}
	
	// > 新建伪事件光源贴图
	for(var i=0; i< $gameMap._drill_LIl_fakeEvents.length; i++){
		var temp_fakeEvent = $gameMap._drill_LIl_fakeEvents[i];
		var temp_sprite = new Drill_LIl_Sprite( temp_fakeEvent );
		this._drill_LIl_darkSprite.drill_LIl_addMaskChild( temp_sprite );
		$gameTemp._drill_LIl_sprites.push(temp_sprite);
	}
}


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_LIl_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_LIl_layer_createDestination.call(this);	//rmmv鼠标目的地 < 上层 < rmmv天气
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 图片层
//==============================
var _drill_LIl_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_LIl_layer_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// ** 最顶层
//==============================
var _drill_LIl_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LIl_layer_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Map.prototype.drill_LIl_sortByZIndex = function() {
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//=============================================================================
// ** 地图绘制层 控制
//=============================================================================
//==============================
// * 创建
//==============================
var _drill_LIl_Scene_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LIl_Scene_createAllWindows.call(this);
	this.drill_LIl_createDarkLayer();	
};
//==============================
// * 创建 - 黑暗层
//==============================
Scene_Map.prototype.drill_LIl_createDarkLayer = function() {
	
	// > 黑暗层
	var temp_sprite = new Drill_LIl_MaskSprite(Graphics.boxWidth, Graphics.boxHeight);
	temp_sprite.visible = false;
	temp_sprite.zIndex = 100;
	
	if( DrillUp.g_LIl_layer == "上层" ){
		this._spriteset._drill_mapUpArea.addChild(temp_sprite);
	}
	if( DrillUp.g_LIl_layer == "图片层" ){
		this._spriteset._drill_mapPicArea.addChild(temp_sprite);
	}
	if( DrillUp.g_LIl_layer == "最顶层" ){
		this._drill_SenceTopArea.addChild(temp_sprite);
	}
	this._drill_LIl_darkSprite = temp_sprite;
	this.drill_LIl_sortByZIndex();		//排序
}
//==============================
// * 帧刷新
//==============================
var _drill_LIl_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_LIl_scene_update.call(this);
	
	if( this.isActive() ){
		this.drill_LIl_updateDarkLayer();		//黑暗层
		this.drill_LIl_updateLightCheck();		//光源层
	}
};
//==============================
// * 帧刷新 - 黑暗层
//==============================
Scene_Map.prototype.drill_LIl_updateDarkLayer = function() {
	
	// > 地图锁定时，黑暗层无法变化
	if( $gameMap._drill_LIl_lock['enableLocked'] == true ){ 		
		this._drill_LIl_darkSprite.opacity = $gameMap._drill_LIl_lock['targetOpacity'];
		return;
	}
	
	// > 旧版本兼容刷新
	if( $gameSystem._drill_LIl['cur_time'] == undefined ){ $gameSystem.drill_LIl_init(); }
	var l_data = $gameSystem._drill_LIl;
	
	// > 透明度控制	
	l_data['cur_time'] += 1;
	if( l_data['cur_time'] >= l_data['tar_time'] ){
		l_data['cur_time'] = l_data['tar_time'];
		
		// > 完成变换时
		l_data['last_opacity'] = l_data['next_opacity'];
		l_data['cur_opacity'] = l_data['next_opacity'];
		this._drill_LIl_darkSprite.opacity = l_data['cur_opacity'];
		return;
	}
	
	// > 变换过程
	l_data['cur_opacity'] = l_data['last_opacity'] + (l_data['next_opacity'] - l_data['last_opacity']) * l_data['cur_time'] / l_data['tar_time'];
	this._drill_LIl_darkSprite.opacity = l_data['cur_opacity'];
};


//=============================================================================
// ** 黑暗层遮罩 全局画布
//=============================================================================
//==============================
// * 画布 - 初始化
//==============================
var _drill_LIl_graphicsInit = Graphics.initialize;
Graphics.initialize = function(width, height, type) {
	_drill_LIl_graphicsInit.call(this, width, height, type);
	
	var temp_renderer = null;
	var temp_canvas = document.createElement('canvas');
	temp_canvas.id = 'drill_LIl_canvas';
	var options = {
		view: temp_canvas,
        width: width,
        height: height
	};
	try {
        switch (this._rendererType) {
            case 'canvas':
                temp_renderer = new PIXI.CanvasRenderer(options);
                break;
            case 'webgl':
                temp_renderer = new PIXI.Renderer(options);
                break;
            default:
                temp_renderer = PIXI.autoDetectRenderer(options);
                break;
        }

        if (temp_renderer && temp_renderer.textureGC)
		temp_renderer.textureGC.maxIdle = 1;

    } catch (e) {
        temp_renderer = null;
    }
	
	DrillUp.g_LIl_canvas = temp_canvas;
	DrillUp.g_LIl_renderer = temp_renderer;
	this.drill_LIl_updateCanvas();
}
//==============================
// * 画布 - 刷新（非帧）
//==============================
var _drill_LIl_updateAllElements = Graphics._updateAllElements;
Graphics._updateAllElements = function() {
	_drill_LIl_updateAllElements.call(this);
	this.drill_LIl_updateCanvas();
	this.drill_LIl_updateRenderer();
}
//==============================
// * 画布 - 刷新 - canvas
//==============================
Graphics.drill_LIl_updateCanvas = function() {
	DrillUp.g_LIl_canvas.width = this._width;
	DrillUp.g_LIl_canvas.height = this._height;
	DrillUp.g_LIl_canvas.style.zIndex = 0;
	//this._centerElement(DrillUp.g_LIl_canvas);
};
//==============================
// * 画布 - 刷新 - render
//==============================
Graphics.drill_LIl_updateRenderer = function() {
    if( DrillUp.g_LIl_renderer ){
        DrillUp.g_LIl_renderer.resize( this._width, this._height);
    }
};


//=============================================================================
// ** 黑暗层遮罩
//=============================================================================
//==============================
// * 黑暗层遮罩 - 定义
//==============================
function Drill_LIl_MaskSprite() {
	this.initialize.apply(this, arguments);
}
Drill_LIl_MaskSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_LIl_MaskSprite.prototype.constructor = Drill_LIl_MaskSprite;
//==============================
// * 黑暗层遮罩 - 初始化
//==============================
Drill_LIl_MaskSprite.prototype.initialize = function(width, height) {
	Sprite_Base.prototype.initialize.call(this);
	
	this._drill_time = 0;									//低帧优化
	this._drill_stage = null;								//场景容器
	this._drill_main_layer = null;							//主绘制层
	this.blendMode = 2;										//关键控制，乘积混合
	
	var source = DrillUp.g_LIl_canvas;
	this.__baseTexture = new PIXI.BaseTexture(source);
    this.__baseTexture.mipmap = false;
    this.__baseTexture.width = source.width;
    this.__baseTexture.height = source.height;
	
	this._texture = new PIXI.Texture(this.__baseTexture);
	this.texture = this._texture;
	
	this.drill_createStage(width, height);		//场景初始化
};
//==============================
// * 黑暗层遮罩 - 帧刷新
//==============================
Drill_LIl_MaskSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	
	// > 关闭时，不工作
	var temp_visible = true;
	temp_visible = $gameTemp.drill_LIl_isDarkMaskEnabled();
	if( SceneManager._scene.constructor.name != "Scene_Map" ){ temp_visible = false; }
	
	// > 可见
	this.visible = temp_visible;
	if( temp_visible == false ){ return; }
	
	// > fps控制
	this._drill_time += 1;
	var fps = 1000 / Graphics._fpsMeter.duration;
	if( fps < 10 ){
		if( this._drill_time * 3 != 0 ){ return; }	//低帧数减少刷新
	}
	
	// > 绘制子类
	if( this._drill_stage.isReady() ){
		
		this._drill_stage.update();							//手动刷新
		DrillUp.g_LIl_renderer.render(this._drill_stage);	//手动渲染
		this._drill_stage.worldTransform.identity();		//修正角度
		
		if (DrillUp.g_LIl_renderer.gl && DrillUp.g_LIl_renderer.gl.flush) {
			DrillUp.g_LIl_renderer.gl.flush();
		}
		
		// > 画到texture中
		this.__baseTexture.update();
		
		// > 画到bitmap中（速度慢）
		//this.bitmap._context.drawImage( DrillUp.g_LIl_canvas, 0, 0);
		//this.bitmap._setDirty();
		
		// > 强制渲染
		//this.renderable = true;
	}
	
	// > 变色控制
	if( $gameMap._drill_LIl_lock['enableLocked'] == true ){
		if( this._drill_curColor != $gameMap._drill_LIl_lock['layerColor'] ){
			this._drill_curColor = $gameMap._drill_LIl_lock['layerColor'];
			this._drill_main_layer.bitmap.fillAll( $gameMap._drill_LIl_lock['layerColor'] );		
		}
	}else{
		if( this._drill_curColor != $gameSystem._drill_LIl['layerColor'] ){	
			this._drill_curColor = $gameSystem._drill_LIl['layerColor'];
			this._drill_main_layer.bitmap.fillAll($gameSystem._drill_LIl['layerColor']);	
		}
	}
};
//==============================
// * 黑暗层遮罩 - 场景初始化
//==============================
Drill_LIl_MaskSprite.prototype.drill_createStage = function(width, height) {
	// > 场景容器
	this._drill_stage = new Scene_Base();
	this._drill_stage.start();
	this._drill_stage.create();
	
	// > 主绘制层
	this._drill_main_layer = new Sprite();
	this._drill_stage.addChild(this._drill_main_layer);	
	this._drill_main_layer.bitmap = new Bitmap(width, height);
	if( $gameMap._drill_LIl_lock['enableLocked'] == true ){
		this._drill_main_layer.bitmap.fillAll( $gameMap._drill_LIl_lock['layerColor'] );		
		this._drill_curColor = $gameMap._drill_LIl_lock['layerColor'];
	}else{
		this._drill_main_layer.bitmap.fillAll( $gameSystem._drill_LIl['layerColor'] );		
		this._drill_curColor = $gameSystem._drill_LIl['layerColor'];
	}
}
//==============================
// * 黑暗层遮罩 - 添加到父类
//==============================
Drill_LIl_MaskSprite.prototype.drill_LIl_addMaskChild = function( temp_sprite ) {
	this._drill_main_layer.addChild( temp_sprite );
}
//==============================
// * 黑暗层遮罩 - 从父类中移除
//==============================
Drill_LIl_MaskSprite.prototype.drill_LIl_removeMaskChild = function( temp_sprite ) {
	this._drill_main_layer.removeChild( temp_sprite );
}
//==============================
// * 黑暗层遮罩 - 判断是否开启
//==============================
Game_Temp.prototype.drill_LIl_isDarkMaskEnabled = function(){
	
	// > 临时锁定 为关闭状态，则表示长期未开
	if( $gameMap._drill_LIl_lock['enableLocked'] == true && $gameMap._drill_LIl_lock['enable'] == false ){ return false; }
	
	// > 未锁定，且透明度为0，也表示长期未开
	if( $gameMap._drill_LIl_lock['enableLocked'] == false && $gameSystem._drill_LIl['cur_opacity'] == 0 ){ return false; }
	
	return true;
}



//=============================================================================
// ** 光源贴图
//=============================================================================
//==============================
// * 光源 - 定义
//==============================
function Drill_LIl_Sprite() {
	this.initialize.apply(this, arguments);
}
Drill_LIl_Sprite.prototype = Object.create(Sprite_Base.prototype);
Drill_LIl_Sprite.prototype.constructor = Drill_LIl_Sprite;

//==============================
// * 光源 - 初始化
//==============================
Drill_LIl_Sprite.prototype.initialize = function( character ) {
	Sprite_Base.prototype.initialize.call(this);
	this._character = character;
	
	this._drill_light_id = -1;
	this._drill_data = null;
	this._drill_src_bitmaps = [];
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
};
//==============================
// * 光源 - 帧刷新
//==============================
Drill_LIl_Sprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	
	this.drill_LIl_updateSpriteRefresh();	//内容重刷
	this.drill_LIl_updatePosition();		//刷新位置
	this.drill_LIl_updateGif();				//刷新gif
	this.drill_LIl_updateRotation();		//刷新旋转
	this.drill_LIl_updateOpacity();			//刷新透明度
};

//==============================
// * 光源 - 内容重刷
//==============================
Drill_LIl_Sprite.prototype.drill_LIl_updateSpriteRefresh = function() {
	if( !this._character ){ return; }
	if( this._character._erased == true ){ this.drill_LIl_hide(); return; }
	
	if( this._drill_light_id == this._character._drill_LIl._light_id ){ return; }
	this._drill_light_id = this._character._drill_LIl._light_id;
	
	// > 不显示
	if( this._drill_light_id == -1 ){
		this.drill_LIl_hide();
		return;
	}
	
	// > 重置光源内容
	this._drill_data = DrillUp.g_LIl_light[ this._drill_light_id ];
	if( this._drill_data == null ){ return; }
	
	// > 重置光源贴图
	this._drill_src_bitmaps = [];
	for(var j = 0; j < this._drill_data['gif_src'].length ; j++){
		this._drill_src_bitmaps.push(ImageManager.load_MapIllumination(this._drill_data['gif_src'][j]));
	}
	// > 重置光源贴图
	this.visible = true;
	this.bitmap = this._drill_src_bitmaps[0] ;
	this.scale.x = this._drill_data['scale_x'];
	this.scale.y = this._drill_data['scale_y'];
	
	// > 朝向初始化
	if( this._character && this._drill_data['dir_mode'] == "根据事件朝向转向" ){
		this.rotation = this.drill_LIl_getCurRotation();
	}
}
//==============================
// * 光源 - 隐藏
//==============================
Drill_LIl_Sprite.prototype.drill_LIl_hide = function() {
	this.visible = false;
	this.opacity = 0;
	this._drill_data = null;
}
//==============================
// * 光源 - 刷新位置
//==============================
Drill_LIl_Sprite.prototype.drill_LIl_updatePosition = function() {
	if( !this._character ){ return; }
	if( !this._drill_data ){ return; }
	
	var xx = (this._character._realX - $gameMap._displayX ) * $gameMap.tileWidth() + 24;
	var yy = (this._character._realY - $gameMap._displayY ) * $gameMap.tileHeight() + 24;
	this.x = xx + this._drill_data['x'];
	this.y = yy + this._drill_data['y'];
}
//==============================
// * 光源 - 刷新gif
//==============================
Drill_LIl_Sprite.prototype.drill_LIl_updateGif = function() {
	if( !this._character ){ return; }
	if( !this._drill_data ){ return; }
	
	var inter = this._character._drill_LIl._light_time ;
	inter = inter / this._drill_data['gif_interval'];
	inter = inter % this._drill_data['gif_src'].length;
	if( this._drill_data['gif_back_run'] ){
		inter = this._drill_data['gif_src'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	this.bitmap = this._drill_src_bitmaps[inter];
}
//==============================
// * 光源 - 刷新旋转
//==============================
Drill_LIl_Sprite.prototype.drill_LIl_updateRotation = function() {
	if( !this._character ){ return; }
	if( !this._drill_data ){ return; }
	var time = this._character._drill_LIl._light_time ;
	
	if( this._drill_data['dir_mode'] == "无限自旋转" ){
		this.rotation = time * this._drill_data['dir_selfSpeed'] / 180 * Math.PI ;
	}
	
	if( this._drill_data['dir_mode'] == "根据事件朝向转向" ){
		
		// > 转向判定
		var target_rotation = this.drill_LIl_getCurRotation();
		
		if( this._drill_data['dir_type'] == "瞬间转向" ){
			this.rotation = target_rotation;
		}
		if( this._drill_data['dir_type'] == "匀速转向" ){
			// > 角度修正
			this.rotation %= (Math.PI*2);
			if( this.rotation < 0 ){ this.rotation += Math.PI*2; }
			
			// > 顺时针/逆时针判断
			var anticlockwise = $gameTemp.drill_LIl_isAnticlockwise(target_rotation, this.rotation);
			var distance = $gameTemp.drill_LIl_getMinDistance(target_rotation, this.rotation);
			var r_speed = this._drill_data['dir_speed'] / 180 * Math.PI;
			if( anticlockwise ){	//逆时针转
				this.rotation += r_speed;
			}else{					//顺时针转
				this.rotation -= r_speed;
			}
			
			// > 速度收敛
			if( distance < r_speed ){
				this.rotation = target_rotation;
			}
		}
		if( this._drill_data['dir_type'] == "弹性转向" ){
			// > 角度修正
			this.rotation %= (Math.PI*2);
			if( this.rotation < 0 ){ this.rotation += Math.PI*2; }
			
			// > 顺时针/逆时针判断
			var anticlockwise = $gameTemp.drill_LIl_isAnticlockwise(target_rotation, this.rotation);
			var distance = $gameTemp.drill_LIl_getMinDistance(target_rotation, this.rotation);
			var r_speed = distance/ this._drill_data['dir_speed'];
			if( anticlockwise ){	//逆时针转
				this.rotation += r_speed;
			}else{					//顺时针转
				this.rotation -= r_speed;
			}
			
			// > 速度收敛
			if( distance < 0.01 ){
				this.rotation = target_rotation;
			}
		}
	}
	
}
//==============================
// * 光源 - 转向判定
//==============================
Drill_LIl_Sprite.prototype.drill_LIl_getCurRotation = function() {
	if( !this._character ){ return 0; }
	
	if( this._character.direction() === 2 ){	//下
		return 0;
	}
	if( this._character.direction() === 4 ){	//左
		return Math.PI / 2;
	}
	if( this._character.direction() === 6 ){	//右
		return Math.PI + Math.PI / 2;
	}
	if( this._character.direction() === 8 ){	//上
		return Math.PI;
	}
	return 0;
}
//==============================
// * 数学 - 获得两个角度的最小距离
//==============================
Game_Temp.prototype.drill_LIl_getMinDistance = function( a,b ) {
	a %= Math.PI*2;
	b %= Math.PI*2;
	if( a < 0 ){ a += Math.PI*2; }		//js负数取余，会得到负数
	if( b < 0 ){ b += Math.PI*2; }
	var distance = Math.abs( a - b );
	if( distance < Math.PI ){
		return distance;
	}else{
		return Math.PI*2 - distance;
	}
}
//==============================
// * 数学 - 判断顺时针/逆时针
//==============================
Game_Temp.prototype.drill_LIl_isAnticlockwise = function( a,b ) {
	a %= Math.PI*2;
	b %= Math.PI*2;
	if( a < 0 ){ a += Math.PI*2; }
	if( b < 0 ){ b += Math.PI*2; }
	var angle = a - b;
	if( angle >= Math.PI ){				//顺时针
		return false;
	}else if( angle <= -1 * Math.PI ){	//逆时针
		return true;
	}else if( angle > 0 ){				//逆时针
		return true;
	}else{								//顺时针
		return false;
	}
}
//==============================
// * 光源 - 刷新旋转
//==============================
Drill_LIl_Sprite.prototype.drill_LIl_updateOpacity = function() {
	if( !this._character ){ return; }
	if( !this._drill_data ){ return; }
	if( this._drill_light_id == -1 ){ return; } 
	
	var time = this._character._drill_LIl._light_time ;
	if( this._character._drill_LIl._light_type == "物体照明" ){
		if( this._drill_data['opacity_mode'] == "固定透明度" ){
			this.opacity = this._drill_data['opacity_fix'];
		}
		if( this._drill_data['opacity_mode'] == "波动透明度" ){
			var amp = this._drill_data['opacity_max'] - this._drill_data['opacity_min'];
			var v = this._drill_data['opacity_min'] + amp/2;
			var period = this._drill_data['opacity_period'];
			this.opacity = v + amp/2 * Math.sin( time / period * Math.PI * 2 );
		}
	}
	
	if( this._character._drill_LIl._light_type == "限时动态照明" ){
		if( this._character._drill_LIl._light_oType == "逐渐淡去" ){
			this.opacity = 255 * this._character._drill_cur_life / this._character._drill_life;
		}
		if( this._character._drill_LIl._light_oType == "逐渐显现" ){
			this.opacity = 255 * (this._character._drill_life - this._character._drill_cur_life) / this._character._drill_life;
		}
		if( this._character._drill_LIl._light_oType == "保持亮度" ){
			//（不变）
		}
	}
}



//=============================================================================
// ** 伪事件
//=============================================================================
//==============================
// * 伪事件 - 定义
//==============================
function Drill_LIl_FakeEvent() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 伪事件 - 初始化
//==============================
Drill_LIl_FakeEvent.prototype.initialize = function( data ) {
	this._drill_LIl = {};
	this._drill_LIl._light_id = data['light_id'];			//光源id
	this._drill_LIl._light_time = 0;						//光源持续时间
	this._drill_LIl._light_type = data['light_type'];		//光源类型
	this._drill_LIl._light_oType = data['light_oType'];		//光源变化因素
	
	this._drill_life = data['life'];						//持续时间
	this._drill_cur_life = data['life'];					//当前寿命
	this._realX = data['realX'];							//x
	this._realY = data['realY'];							//y
}
//==============================
// * 伪事件 - 帧刷新
//==============================
Drill_LIl_FakeEvent.prototype.update = function() {
	this._drill_cur_life -= 1;
	this._drill_LIl._light_time += 1;
	if( this.isDead() ){ this._drill_LIl._light_id = -1; }
}
//==============================
// * 伪事件 - 寿命
//==============================
Drill_LIl_FakeEvent.prototype.isDead = function() {
	return this._drill_cur_life < 0 ;
}
//==============================
// * 伪事件 - 方向
//==============================
Drill_LIl_FakeEvent.prototype.direction = function() {
	return 2;
}

//=============================================================================
// ** 伪事件容器（与事件容器区分开）
//=============================================================================
//==============================
// * 容器 - 切换地图时
//==============================
Game_Map.prototype.drill_LIl_resetFakeEvents = function() {
	this._drill_LIl_fakeEvents = [];
};
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_LIl_fakeEvent_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_LIl_fakeEvent_update.call(this,sceneActive);
	
	if( sceneActive ){
		this.drill_LIl_updateFakeEvents();
	}
};
Game_Map.prototype.drill_LIl_updateFakeEvents = function() {
	
	for( var i=this._drill_LIl_fakeEvents.length-1; i >= 0; i-- ){
		var fe = this._drill_LIl_fakeEvents[i];
		
		// > 帧刷新
		fe.update();
		
		// > 过时间销毁（销毁不会主动去掉贴图，而是重刷时，贴图会被清理）
		if( fe.isDead() ){
			this._drill_LIl_fakeEvents.splice(i,1);
		}
	}
}

