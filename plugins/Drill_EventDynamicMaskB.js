//=============================================================================
// Drill_EventDynamicMaskB.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        行走图 - 行走图动态遮罩板B
 * @author Drill_up
 * 
 * @Drill_LE_param "透视镜样式-%d"
 * @Drill_LE_parentKey "---透视镜样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_EDMB_childData_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_EventDynamicMaskB +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 专用于行走图的动态遮罩，能遮挡事件、玩家的行走图。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfDynamicMask     系统-动态遮罩核心★★v1.2及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.建议先了解 "0.基本定义 > 显示与透明度.docx"。
 *   详细内容可以去看看 "1.系统 > 大家族-动态遮罩.docx"。
 * 动态遮罩板：
 *   (1.整个插件是一块 动态遮罩板，专用于事件行走图。
 *   (2.默认情况下，动态遮罩板不作用于任何贴图。
 *      你必须手动绑定 行走图的贴图，才能有遮挡效果。
 * 自画资源：
 *   (1.所有透视镜的形状、大小都需要你自己画素材来提供。
 *      通常为白色和透明为主。
 *   (2.单个图块的像素是48x48。所需素材的大小通常较大，
 *      你也可以修改透视镜配置的 缩放比例 来放大。
 * 简单透视镜：
 *   (1.简单透视镜的注释 跨事件页，不关会长期存在。
 *      如果要关闭简单透视镜，需要添加"清除"的注释。
 *      插件指令可以添加简单透视镜，但只在当前地图有效，离开地图失效。
 *   (2.玩家、鼠标、事件、图片 只能绑定一个 简单透视镜。
 *   (3.当你切换进入菜单后，再回到地图界面，你会发现透视镜会闪一下。
 *      这属于正常现象，因为切换时，地图必须重新扫描加载全部透视镜。
 * 高级透视镜：
 *   (1.简单透视镜必须绑定一个对象才能存在，
 *      而高级透视镜可以自己独立移动并且缩放变换控制，也可以绑定对象。
 *   (2.玩家、鼠标、事件、图片 可以绑定多个 高级透视镜。
 *   (3.高级透视镜能够跨 地图 存在，并且能跨越 地图界面和战斗界面。
 *      如果暂时不用，要记得关闭，避免透视镜长期滞留。
 * 设计：
 *   (1.你可以用事件注释快速添加简单透视镜，使得事件所在的地方能够显示
 *      部分背景图像。
 *   (2.透视镜可以随着事件的朝向而转向，你可以用来设计类似手电筒的效果。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__layer_dynamicMask （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__layer_dynamicMask文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 透视镜-1 资源-遮罩GIF
 * 透视镜-2 资源-遮罩GIF
 * 透视镜-3 资源-遮罩GIF
 * ……
 * 
 * 所有素材都放在Map__layer_dynamicMask文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 动态遮罩板
 * 你需要给指定图片开启动态遮罩板功能：
 * 
 * 事件注释：=>行走图动态遮罩板B : 启用该插件的动态遮罩板
 * 事件注释：=>行走图动态遮罩板B : 停用动态遮罩板
 * 
 * 插件指令：>行走图动态遮罩板B : 玩家 : 启用该插件的动态遮罩板
 * 插件指令：>行走图动态遮罩板B : 本事件 : 启用该插件的动态遮罩板
 * 插件指令：>行走图动态遮罩板B : 事件[10] : 启用该插件的动态遮罩板
 * 插件指令：>行走图动态遮罩板B : 事件变量[21] : 启用该插件的动态遮罩板
 * 插件指令：>行走图动态遮罩板B : 批量事件[10,11] : 启用该插件的动态遮罩板
 * 插件指令：>行走图动态遮罩板B : 批量事件变量[21,22] : 启用该插件的动态遮罩板
 * 
 * 插件指令：>行走图动态遮罩板B : 图片[1] : 启用该插件的动态遮罩板
 * 插件指令：>行走图动态遮罩板B : 图片[1] : 停用动态遮罩板
 * 
 * 1.前面部分（事件[1]）和后面设置（启用该插件的动态遮罩板）可以随意组合。
 *   一共有6*2种组合方式。
 * 2.注意，必须先绑定动态遮罩版，才能产生行走图的遮挡效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 简单透视镜
 * 你可以通过下列指令添加简单透视镜：
 * 
 * 事件注释：=>行走图动态遮罩板B : 简单透视镜 : 样式[1]
 * 事件注释：=>行走图动态遮罩板B : 简单透视镜 : 清除
 * 
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 玩家 : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 本事件 : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 事件[10] : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 事件变量[21] : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 批量事件[10,11] : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 批量事件变量[21,22] : 样式[1]
 * 
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 玩家 : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 玩家 : 清除
 * 
 * 1.前面部分（玩家）和后面设置（样式[1]）可以随意组合。
 *   一共有6*2种组合方式。
 * 2."简单透视镜"是直接绑定对象的，不能进行后期复杂的透视镜变换。
 *   "样式[1]"对应该插件配置的第1个透视镜样式。
 * 3.每个事件最多只能绑定一个 简单透视镜。
 * 4.事件注释的 简单透视镜 会长期存在，且跨事件页。
 *   如果要关闭透视镜，需要添加 "清除" 的注释。
 *   插件指令可以添加简单透视镜，但只在当前地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 简单透视镜更多绑定
 * 你可以通过下列指令将简单透视镜绑定到更多对象：
 * 
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 鼠标 : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 图片[10] : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 图片变量[21] : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 批量图片[10,11] : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 批量图片变量[21,22] : 样式[1]
 * 
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 鼠标 : 样式[1]
 * 插件指令：>行走图动态遮罩板B : 简单透视镜 : 鼠标 : 清除
 * 
 * 1.前面部分（鼠标）和后面设置（样式[1]）可以随意组合。
 *   一共有5*2种组合方式。
 * 3.鼠标、图片 最多只能绑定一个 简单透视镜。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 高级透视镜
 * 你可以通过插件指令创建设置高级透视镜：
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 创建 : 样式[3]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 清除
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 设置生命 : 持续时间[180]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 暂停生命流逝
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 继续生命流逝
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 绑定到 : 玩家
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 绑定到 : 本事件
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 绑定到 : 事件[10]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 绑定到 : 事件变量[10]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 绑定到 : 鼠标
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 绑定到 : 图片[10]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 绑定到 : 图片变量[10]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 位置归零
 * 
 * 1."设置生命"是指 高级透视镜 在持续时间结束后，会被自动清除。
 *   多用于临时安排设置的透视镜效果。
 * 2.高级透视镜能够跨 地图 存在，并且能跨越 地图界面和战斗界面 。
 *   如果暂时不用，要记得关闭，避免透视镜长期滞留。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 高级透视镜变量
 * 你可以通过插件指令创建设置临时高级透视镜：
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜变量[21] : 创建 : 样式[3]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜变量[21] : 清除
 * 插件指令：>行走图动态遮罩板B : 获取未创建的高级透视镜编号[100-200] : 变量[21]
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜变量[2] : 设置生命 : 持续时间[180]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜变量[2] : 暂停生命流逝
 * 插件指令：>行走图动态遮罩板B : 高级透视镜变量[2] : 继续生命流逝
 * 
 * 1."高级透视镜变量[21]"均能适配可选设定中
 *   "高级透视镜[2]"的 绑定、移动、变化 等的用法。
 * 2."编号[100-200]"指从id为100至200的范围中，找出一个未创建的编号。
 * 3.使用变量获取一个未使用的自动编号，然后创建 高级透视镜，
 *   创建后设置该 高级透视镜 的生命，实现时效结束后自动清除。
 *   通过上述流程，可以使得 永久有效的高级透视镜 变成临时的照明功能。
 * 4.由于生命结束后自动销毁，下一次获取自动编号时，
 *   可以获取到销毁空出来的那个编号。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 移动
 * 你可以通过插件指令控制高级透视镜移动：
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 瞬间移动 : 位置[100,200]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 匀速移动 : 位置[100,200] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 增减速移动 : 位置[100,200] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 弹性移动 : 位置[100,200] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 抛物线移动 : 位置[100,200] : 时间[20]
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 匀速移动 : 位置[100,200] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 匀速移动 : 位置变量[25,26] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 匀速移动 : 相对位置[-100,0] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 匀速移动 : 相对位置变量[25,26] : 时间[20]
 * 
 * 1.前面部分（瞬间移动）和后面设置（位置[10,12]）可以随意组合。
 *   一共有5*4种组合方式。
 * 2.注意，如果高级透视镜已经绑定了 事件或图片，那么该透视镜会与 移动的坐标量 叠加。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 缩放、透明度、旋转变化
 * 你可以通过插件指令控制高级透视镜缩放变化：
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 瞬间变化 : 缩放X[1.2]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 匀速变化 : 缩放X[1.2] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 增减速变化 : 缩放X[1.2] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 弹性变化 : 缩放X[1.2] : 时间[20]
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 瞬间变化 : 缩放Y[1.2]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 匀速变化 : 缩放Y[1.2] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 增减速变化 : 缩放Y[1.2] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 弹性变化 : 缩放Y[1.2] : 时间[20]
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 瞬间变化 : 透明度[255]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 匀速变化 : 透明度[255] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 增减速变化 : 透明度[255] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 弹性变化 : 透明度[255] : 时间[20]
 * 
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 瞬间变化 : 旋转角度[90]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 匀速变化 : 旋转角度[90] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 增减速变化 : 旋转角度[90] : 时间[20]
 * 插件指令：>行走图动态遮罩板B : 高级透视镜[2] : 弹性变化 : 旋转角度[90] : 时间[20]
 * 
 * 1.注意，上述指令 和 移动 用法相似，但是指令不一样，注意区分。
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
 * 时间复杂度： o(n^2)*o(贴图处理)*o(遮罩渲染) 每帧
 * 测试方法：   给相关10个事件绑定遮罩，玩家添加透视镜，并进行测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【78.52ms】
 *              100个事件的地图中，平均消耗为：【61.42ms】
 *               50个事件的地图中，平均消耗为：【40.29ms】
 *               20个事件的地图中，平均消耗为：【28.96ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.动态遮罩板是性能消耗大户，事件数量的增加，能明显造成更大的
 *   负担，因为 透视镜 自身带有贴图，并且与事件的随时保持同步。
 *   另外，使用 动态遮罩板 的背景，还要作相应变化。
 * 3.设计游戏时要尽可能注意减少透视镜的数量，部分地图要关闭动态遮罩。
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
 * 
 * @param ---透视镜样式组 1至20---
 * @default
 *
 * @param 透视镜样式-1
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default {"标签":"==透视镜-小渐变圆==","--贴图--":"","资源-遮罩GIF":"[\"透视镜-渐变圆形60x60\"]","帧间隔":"4","是否倒放":"false","平移-透视镜 X":"0","平移-透视镜 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","图片层级":"2","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动范围":"150","透明度波动周期":"120"}
 * 
 * @param 透视镜样式-2
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default {"标签":"==透视镜-中渐变圆==","--贴图--":"","资源-遮罩GIF":"[\"透视镜-渐变圆形120x120\"]","帧间隔":"4","是否倒放":"false","平移-透视镜 X":"0","平移-透视镜 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","图片层级":"2","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动范围":"150","透明度波动周期":"120"}
 * 
 * @param 透视镜样式-3
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default {"标签":"==透视镜-大渐变圆==","--贴图--":"","资源-遮罩GIF":"[\"透视镜-渐变圆形180x180\"]","帧间隔":"4","是否倒放":"false","平移-透视镜 X":"0","平移-透视镜 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","图片层级":"2","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动范围":"150","透明度波动周期":"120"}
 * 
 * @param 透视镜样式-4
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default {"标签":"==透视镜-小圆==","--贴图--":"","资源-遮罩GIF":"[\"透视镜-圆形60x60\"]","帧间隔":"4","是否倒放":"false","平移-透视镜 X":"0","平移-透视镜 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","图片层级":"2","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动范围":"150","透明度波动周期":"120"}
 * 
 * @param 透视镜样式-5
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default {"标签":"==透视镜-中圆==","--贴图--":"","资源-遮罩GIF":"[\"透视镜-圆形120x120\"]","帧间隔":"4","是否倒放":"false","平移-透视镜 X":"0","平移-透视镜 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","图片层级":"2","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动范围":"150","透明度波动周期":"120"}
 * 
 * @param 透视镜样式-6
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default {"标签":"==透视镜-大圆==","--贴图--":"","资源-遮罩GIF":"[\"透视镜-圆形180x180\"]","帧间隔":"4","是否倒放":"false","平移-透视镜 X":"0","平移-透视镜 Y":"0","缩放 X":"1.0","缩放 Y":"1.0","图片层级":"2","--朝向--":"","旋转模式":"不旋转","事件转向类型":"瞬间转向","转向速度":"5.0","自旋转速度":"-5.0","--透明度--":"","透明度模式":"固定透明度","固定透明度":"255","透明度波动范围":"150","透明度波动周期":"120"}
 * 
 * @param 透视镜样式-7
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-8
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-9
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-10
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-11
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-12
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-13
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-14
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-15
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-16
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-17
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-18
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-19
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-20
 * @parent ---透视镜样式组 1至20---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param ---透视镜样式组21至40---
 * @default
 *
 * @param 透视镜样式-21
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-22
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-23
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-24
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-25
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-26
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-27
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-28
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-29
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-30
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 * 
 * @param 透视镜样式-31
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-32
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-33
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-34
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-35
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-36
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-37
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-38
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-39
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-40
 * @parent ---透视镜样式组21至40---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param ---透视镜样式组41至60---
 * @default
 *
 * @param 透视镜样式-41
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-42
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-43
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-44
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-45
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-46
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-47
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-48
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-49
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-50
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-51
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-52
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-53
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-54
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-55
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-56
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-57
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-58
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-59
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-60
 * @parent ---透视镜样式组41至60---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param ---透视镜样式组61至80---
 * @default
 *
 * @param 透视镜样式-61
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-62
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-63
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-64
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-65
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-66
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-67
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-68
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-69
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-70
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-71
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-72
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-73
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-74
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-75
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-76
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-77
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-78
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-79
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-80
 * @parent ---透视镜样式组61至80---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param ---透视镜样式组81至100---
 * @default
 *
 * @param 透视镜样式-81
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-82
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-83
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-84
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-85
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-86
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-87
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-88
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-89
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-90
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-91
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-92
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-93
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-94
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-95
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-96
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-97
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-98
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-99
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-100
 * @parent ---透视镜样式组81至100---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param ---透视镜样式组101至120---
 * @default
 *
 * @param 透视镜样式-101
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-102
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-103
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-104
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-105
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-106
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-107
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-108
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-109
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-110
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-111
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-112
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-113
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-114
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-115
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-116
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-117
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-118
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-119
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-120
 * @parent ---透视镜样式组101至120---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param ---透视镜样式组121至140---
 * @default
 *
 * @param 透视镜样式-121
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-122
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-123
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-124
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-125
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-126
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-127
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-128
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-129
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-130
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-131
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-132
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-133
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-134
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-135
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-136
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-137
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-138
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-139
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-140
 * @parent ---透视镜样式组121至140---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param ---透视镜样式组141至160---
 * @default
 *
 * @param 透视镜样式-141
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-142
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-143
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-144
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-145
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-146
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-147
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-148
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-149
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-150
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-151
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-152
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-153
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-154
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-155
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-156
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-157
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-158
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-159
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-160
 * @parent ---透视镜样式组141至160---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param ---透视镜样式组161至180---
 * @default
 *
 * @param 透视镜样式-161
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-162
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-163
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-164
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-165
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-166
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-167
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-168
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-169
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-170
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-171
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-172
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-173
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-174
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-175
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-176
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-177
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-178
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-179
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-180
 * @parent ---透视镜样式组161至180---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param ---透视镜样式组181至200---
 * @default
 *
 * @param 透视镜样式-181
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-182
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-183
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-184
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-185
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-186
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-187
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-188
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-189
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-190
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-191
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-192
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-193
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-194
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-195
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-196
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-197
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-198
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-199
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 * @param 透视镜样式-200
 * @parent ---透视镜样式组181至200---
 * @type struct<EDMBChildSprite>
 * @desc 透视镜样式的详细配置信息。
 * @default 
 *
 */
/*~struct~EDMBChildSprite:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的透视镜样式==
 * 
 * 
 * @param ---贴图---
 * @desc 
 *
 * @param 资源-遮罩GIF
 * @parent ---贴图---
 * @desc png图片资源组，多张构成gif。也可以只是单张图片。
 * @default []
 * @require 1
 * @dir img/Map__layer_dynamicMask/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---贴图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 * 
 * @param 平移-透视镜 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0表示透视镜中心贴在事件中心。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-透视镜 Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。0表示透视镜中心贴在事件中心。正数向下，负数向上。
 * @default 0
 * 
 * @param 缩放 X
 * @parent ---贴图---
 * @desc 透视镜的缩放X值，默认比例1.0。缩放将会使得透视镜看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 缩放 Y
 * @parent ---贴图---
 * @desc 透视镜的缩放Y值，默认比例1.0。缩放将会使得透视镜看起来旋转具有一定透视。
 * @default 1.0
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc 多个透视镜之间的先后顺序层级。
 * @default 2
 * 
 * @param ---朝向---
 * @desc 
 *
 * @param 旋转模式
 * @parent ---朝向---
 * @type select
 * @option 不旋转
 * @value 不旋转
 * @option 无限自旋转
 * @value 无限自旋转
 * @option 根据事件朝向转向
 * @value 根据事件朝向转向
 * @option 始终朝向鼠标位置
 * @value 始终朝向鼠标位置
 * @desc 透视镜旋转的模式。
 * @default 不旋转
 *
 * @param 自旋转速度
 * @parent ---朝向---
 * @desc 旋转模式为"无限自旋转"时，则单位为角度/帧。正数逆时针旋转，负数顺时针旋转。
 * @default -5.0
 *
 * @param 根据事件转向类型
 * @parent ---朝向---
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
 * @param 根据事件转向速度
 * @parent 根据事件转向类型
 * @desc 如果为"匀速转向"，则单位为角度/帧。如果为"弹性转向"，则值为比例除数。
 * @default 5.0
 * 
 * @param ---透明度---
 * @desc 
 *
 * @param 透明度模式
 * @parent ---透明度---
 * @type select
 * @option 固定透明度
 * @value 固定透明度
 * @option 波动透明度
 * @value 波动透明度
 * @desc 透明度的变化模式。
 * @default 固定透明度
 * 
 * @param 固定透明度
 * @parent ---透明度---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 * 
 * @param 波动透明度最小值
 * @parent ---透明度---
 * @type number
 * @min 0
 * @max 255
 * @desc 为"波动透明度"模式时，透明度波动的最小值。
 * @default 150
 * 
 * @param 波动透明度最大值
 * @parent ---透明度---
 * @type number
 * @min 0
 * @max 255
 * @desc 为"波动透明度"模式时，透明度波动的最大值。
 * @default 255
 * 
 * @param 透明度波动周期
 * @parent ---透明度---
 * @type number
 * @min 2
 * @desc 为"波动透明度"模式时，透明度波动的周期时长。单位帧，1秒60帧。
 * @default 120
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EDMB（Core_Of_Dynamic_Mask）
//		临时全局变量	DrillUp.g_EDMB_xxx
//		临时局部变量	this._drill_EDMB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)*o(遮罩渲染) 每帧
//		★性能测试因素	遮罩管理层
//		★性能测试消耗	28.96ms（Scene_Map.prototype.update,与地图遮罩一样，两个加起来为CODM的消耗）40.29ms（drill_EDMB_updateCharacterSprite）
//		★最坏情况		大量事件使用了动态遮罩，每个事件试用动态遮罩都是一种负担增加。
//		★备注			可能消耗和 地图动态遮罩 对半分了，遮罩管理层卡到只有3帧（比特效管理层的5帧要糟。）
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			行走图动态遮罩板B：
//				->动态遮罩容器
//					->创建 动态遮罩板
//					->透视镜贴图 添加/删除
//					->透视镜贴图 帧刷新
//				->透视镜物体容器
//					->调用父类接口
//					->简单透视镜
//					->高级透视镜
//				->透视镜贴图容器
//					->贴图容器初始化（Game_Temp中，Game_Map中帧刷新）
//					->贴图 添加/删除
//					->贴图 帧刷新
//				->优化
//					x->资源预加载
//					->事件未显示时不开遮罩
//		
//		★私有类如下：
//			无
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.这里使用了父插件的类：
//				Drill_CODM_MaskStage【动态遮罩容器】
//				Drill_CODM_PerspectiveMarker【透视镜物体】
//				Drill_CODM_PerspectiveSprite【透视镜贴图】
//				Drill_CODM_PerspectiveMarkerContainer【透视镜物体容器】
//
//		★其它说明细节：
//			1.动态遮罩版插件之间一模一样，只是下列字符被替换：
//				Drill_EventDynamicMaskB
//				行走图动态遮罩板B
//				EDMB
//			2.相对于同类但不同作用对象的动态遮罩，需留意：
//				插件扩展、动态遮罩板说明、动态遮罩板激活条件、插件指令/事件注释、'gif_src_file'、
//				动态遮罩板接口createMaskLayer的类、动态遮罩板（地图界面、战斗界面）
//			简单透视镜和高级透视镜功能一模一样，只是插件指令不同。
//				
//		★存在的问题：
//			暂无
//


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventDynamicMaskB = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventDynamicMaskB');


	//==============================
	// * 变量获取 - 透视镜
	//				（~struct~EDMBChildSprite）
	//==============================
	DrillUp.drill_EDMB_childSpriteInit = function( dataFrom ){
		var data = {};
		
		// > 贴图
		if( dataFrom["资源-遮罩GIF"] != "" &&
			dataFrom["资源-遮罩GIF"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-遮罩GIF"] );
		}else{
			data['gif_src'] = [];
		}
		data['gif_src_file'] = "img/Map__layer_dynamicMask/"
		data['gif_interval'] = Number( dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['offsetX'] = Number( dataFrom["平移-透视镜 X"] || 0);
		data['offsetY'] = Number( dataFrom["平移-透视镜 Y"] || 0);
		data['scale_x'] = Number( dataFrom["缩放 X"] || 1.0);
		data['scale_y'] = Number( dataFrom["缩放 Y"] || 1.0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 2);
		
		// > 朝向
		data['dir_mode'] = String( dataFrom["旋转模式"] || "根据事件朝向转向");
		data['dir_selfSpeed'] = Number( dataFrom["自旋转速度"] || 5.0);
		data['dir_evType'] = String( dataFrom["根据事件转向类型"] || "瞬间转向");
		data['dir_evSpeed'] = Math.abs( Number( dataFrom["根据事件转向速度"] || 0) );
			
		// > 透明度
		data['opacity_mode'] = String( dataFrom["透明度模式"] || "固定透明度");
		data['opacity_fix'] = Number( dataFrom["固定透明度"] || 255);
		data['opacity_waveMin'] = Number( dataFrom["波动透明度最小值"] || 150);
		data['opacity_waveMax'] = Number( dataFrom["波动透明度最大值"] || 255);
		data['opacity_period'] = Number( dataFrom["透明度波动周期"] || 120);
			
		return data;
	}

	
	/*-----------------透视镜样式------------------*/
	DrillUp.g_EDMB_childData_length = 200;
	DrillUp.g_EDMB_childData = [];	
	for (var i = 0; i < DrillUp.g_EDMB_childData_length; i++) {
		if( DrillUp.parameters["透视镜样式-" + String(i+1) ] != "" &&
			DrillUp.parameters["透视镜样式-" + String(i+1) ] != undefined ){
			var data = JSON.parse(DrillUp.parameters["透视镜样式-" + String(i+1) ]);
			DrillUp.g_EDMB_childData[i] = DrillUp.drill_EDMB_childSpriteInit( data );
		}else{
			DrillUp.g_EDMB_childData[i] = null;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfDynamicMask ){


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EDMB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EDMB_pluginCommand.call(this, command, args);
	if( command === ">行走图动态遮罩板B" ){
		
		/*-----------------动态遮罩板绑定------------------*/
		if( args.length == 4 ){
			var obj_str = String(args[1]);
			var temp2 = String(args[3]);
			if( temp2 == "启用该插件的动态遮罩板" || temp2 == "停用动态遮罩板" ){
				
				// > 事件/玩家
				var char_list = null;
				if( char_list == null && obj_str == "本事件" ){
					char_list = [ this._eventId ];
				}
				if( char_list == null && obj_str.indexOf("批量事件[") != -1 ){
					obj_str = obj_str.replace("批量事件[","");
					obj_str = obj_str.replace("]","");
					var temp_arr = obj_str.split(/[,，]/);
					char_list = [];
					for( var k=0; k < temp_arr.length; k++ ){
						var e_id = Number(temp_arr[k]);
						if( $gameMap.drill_EDMB_isEventExist( e_id ) == false ){ continue; }
						char_list.push( e_id );
					}
				}
				if( char_list == null && obj_str.indexOf("批量事件变量[") != -1 ){
					obj_str = obj_str.replace("批量事件变量[","");
					obj_str = obj_str.replace("]","");
					var temp_arr = obj_str.split(/[,，]/);
					char_list = [];
					for( var k=0; k < temp_arr.length; k++ ){
						var e_id = $gameVariables.value( Number(temp_arr[k]) );
						if( $gameMap.drill_EDMB_isEventExist( e_id ) == false ){ continue; }
						char_list.push( e_id );
					}
				}
				if( char_list == null && obj_str.indexOf("事件[") != -1 ){
					obj_str = obj_str.replace("事件[","");
					obj_str = obj_str.replace("]","");
					var e_id = Number(obj_str);
					if( $gameMap.drill_EDMB_isEventExist( e_id ) == false ){ return; }
					char_list = [ e_id ];
				}
				if( char_list == null && obj_str.indexOf("事件变量[") != -1 ){
					obj_str = obj_str.replace("事件变量[","");
					obj_str = obj_str.replace("]","");
					var e_id = $gameVariables.value( Number(obj_str) );
					if( $gameMap.drill_EDMB_isEventExist( e_id ) == false ){ return; }
					char_list = [ e_id ];
				}
				if( char_list == null && obj_str == "玩家" ){
					char_list = [ -2 ];
				}
				
				// > 事件绑定
				if( char_list != null && char_list.length > 0 ){
					for( var j=0; j < char_list.length; j++ ){
						var char_id = char_list[j];
						if( temp2 == "启用该插件的动态遮罩板" ){
							if( char_id > 0 ){
								$gameMap.event( char_id )._drill_EDMB_maskBind = "行走图动态遮罩板B";
							}
							if( char_id == -2 ){
								$gamePlayer._drill_EDMB_maskBind = "行走图动态遮罩板B";
							}
						}
						if( temp2 == "停用动态遮罩板" ){
							if( char_id > 0 ){
								$gameMap.event( char_id )._drill_EDMB_maskBind = null;
							}
							if( char_id == -2 ){
								$gamePlayer._drill_EDMB_maskBind = null;
							}
						}
					}
				}
				return;
			}
		}
		
		/*-----------------简单透视镜 - 对象组获取------------------*/
		var chars = null;
		var mouse = null;
		var pics = null;
		if( args.length >= 4 ){
			var obj_str = String(args[3]);
			
			// > 事件/玩家
			if( chars == null && obj_str == "本事件" ){
				chars = [ this._eventId ];
			}
			if( chars == null && obj_str.indexOf("批量事件[") != -1 ){
				obj_str = obj_str.replace("批量事件[","");
				obj_str = obj_str.replace("]","");
				var temp_arr = obj_str.split(/[,，]/);
				chars = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EDMB_isEventExist( e_id ) == false ){ continue; }
					chars.push( e_id );
				}
			}
			if( chars == null && obj_str.indexOf("批量事件变量[") != -1 ){
				obj_str = obj_str.replace("批量事件变量[","");
				obj_str = obj_str.replace("]","");
				var temp_arr = obj_str.split(/[,，]/);
				chars = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value( Number(temp_arr[k]) );
					if( $gameMap.drill_EDMB_isEventExist( e_id ) == false ){ continue; }
					chars.push( e_id );
				}
			}
			if( chars == null && obj_str.indexOf("事件[") != -1 ){
				obj_str = obj_str.replace("事件[","");
				obj_str = obj_str.replace("]","");
				var e_id = Number(obj_str);
				if( $gameMap.drill_EDMB_isEventExist( e_id ) == false ){ return; }
				chars = [ e_id ];
			}
			if( chars == null && obj_str.indexOf("事件变量[") != -1 ){
				obj_str = obj_str.replace("事件变量[","");
				obj_str = obj_str.replace("]","");
				var e_id = $gameVariables.value( Number(obj_str) );
				if( $gameMap.drill_EDMB_isEventExist( e_id ) == false ){ return; }
				chars = [ e_id ];
			}
			if( chars == null && obj_str == "玩家" ){
				chars = [ -2 ];
			}
			
			// > 鼠标
			if( mouse == null && obj_str == "鼠标" ){
				mouse = true;
			}
			
			// > 图片
			if( pics == null && obj_str.indexOf("批量图片[") != -1 ){
				obj_str = obj_str.replace("批量图片[","");
				obj_str = obj_str.replace("]","");
				pics = [];
				var temp_arr = obj_str.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_EDMB_isPictureExist( pic_id ) == false ){ continue; }
					pics.push( pic_id );
				}
			}
			if( pics == null && obj_str.indexOf("批量图片变量[") != -1 ){
				obj_str = obj_str.replace("批量图片变量[","");
				obj_str = obj_str.replace("]","");
				pics = [];
				var temp_arr = obj_str.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_EDMB_isPictureExist( pic_id ) == false ){ continue; }
					pics.push( pic_id );
				}
			}
			if( pics == null && obj_str.indexOf("图片变量[") != -1 ){
				obj_str = obj_str.replace("图片变量[","");
				obj_str = obj_str.replace("]","");
				var pic_id = $gameVariables.value( Number(obj_str) );
				if( $gameScreen.drill_EDMB_isPictureExist( pic_id ) == false ){ return; }
				pics = [ pic_id ];
			}
			if( pics == null && obj_str.indexOf("图片[") != -1 ){
				obj_str = obj_str.replace("图片[","");
				obj_str = obj_str.replace("]","");
				var pic_id = Number(obj_str);
				if( $gameScreen.drill_EDMB_isPictureExist( pic_id ) == false ){ return; }
				pics = [ pic_id ];
			}
		}
		/*-----------------简单透视镜 - 执行指令------------------*/
		if( args.length == 6 ){
			var type = String(args[1]);
			var temp2 = String(args[5]);
			if( type == "简单透视镜" ){
				
				// > 事件/玩家
				if( chars != null && chars.length > 0 ){
					if( temp2.indexOf("样式[") != -1 ){
						temp2 = temp2.replace("样式[","");
						temp2 = temp2.replace("]","");
						temp2 = Number(temp2);
						for( var j=0; j < chars.length; j++ ){
							var ch_id = chars[j];
							$gameMap.drill_EDMB_addSimplePerspect_characterId( ch_id, Number(temp2)-1 );
						}
					}
					if( temp2 == "清除" || temp2 == "关闭" ){
						for( var j=0; j < chars.length; j++ ){
							var ch_id = chars[j];
							$gameMap.drill_EDMB_removeSimplePerspect_characterId( ch_id );
						}
					}
				}
				
				// > 鼠标
				if( mouse == true ){
					if( temp2.indexOf("样式[") != -1 ){
						temp2 = temp2.replace("样式[","");
						temp2 = temp2.replace("]","");
						temp2 = Number(temp2);
						$gameMap.drill_EDMB_addSimplePerspect_mouse( Number(temp2)-1 );
					}
					if( temp2 == "清除" || temp2 == "关闭" ){
						$gameMap.drill_EDMB_removeSimplePerspect_mouse();
					}
				}
				
				// > 图片
				if( pics != null && pics.length > 0 ){
					if( temp2.indexOf("样式[") != -1 ){
						temp2 = temp2.replace("样式[","");
						temp2 = temp2.replace("]","");
						temp2 = Number(temp2);
						for( var j=0; j < pics.length; j++ ){
							var pic_id = pics[j];
							$gameMap.drill_EDMB_addSimplePerspect_picId( pic_id, Number(temp2)-1 );
						}
					}
					if( temp2 == "清除" || temp2 == "关闭" ){
						for( var j=0; j < pics.length; j++ ){
							var pic_id = pics[j];
							$gameMap.drill_EDMB_removeSimplePerspect_picId( pic_id );
						}
					}
				}
			}
		}
		
		/*-----------------高级透视镜 - 创建------------------*/
		if( args.length == 6 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			if( temp1.indexOf("高级透视镜[") != -1 && temp2 == "创建" ){
				temp1 = temp1.replace("高级透视镜[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				temp3 = temp3.replace("样式[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3)-1;
				$gameMap.drill_EDMB_addSeniorPerspect( temp1, temp3 );
				return;
			
			}else if( temp1.indexOf("高级透视镜变量[") != -1 && temp2 == "创建" ){
				temp1 = temp1.replace("高级透视镜变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value( Number(temp1) );
				temp3 = temp3.replace("样式[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3)-1;
				$gameMap.drill_EDMB_addSeniorPerspect( temp1, temp3 );
				return;
			}
		}
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1.indexOf("高级透视镜[") != -1 && temp2 == "清除" ){
				temp1 = temp1.replace("高级透视镜[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				$gameMap.drill_EDMB_removeSeniorPerspect( temp1 );
				return;
			
			}else if( temp1.indexOf("高级透视镜变量[") != -1 && temp2 == "清除" ){
				temp1 = temp1.replace("高级透视镜变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value( Number(temp1) );
				$gameMap.drill_EDMB_removeSeniorPerspect( temp1 );
				return;
			
			}else if( temp1.indexOf("获取未创建的高级透视镜编号[") != -1 && temp2.indexOf("变量[") != -1 ){
				temp1 = temp1.replace("获取未创建的高级透视镜编号[","");
				temp1 = temp1.replace("]","");
				var temp_arr = temp1.split("-");
				if( temp_arr.length >= 2 ){
					var id = $gameSystem._drill_EDMB_container.drill_CODM_getEmptyId( Number(temp_arr[0]), Number(temp_arr[1]) );
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					$gameVariables.setValue( temp2, id );
				}
				return;
			}
		}
		/*-----------------高级透视镜 - 对象组获取------------------*/
		var marker = null;
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( temp1.indexOf("高级透视镜[") != -1 ){
				temp1 = temp1.replace("高级透视镜[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				marker = $gameSystem._drill_EDMB_container.drill_CODM_getSeniorMarkerById( temp1 );
				if( marker == undefined ){
					alert( "【Drill_LayerIllumination.js 地图 - 行走图动态遮罩板B】\n" +
							"插件指令错误，id为"+temp1+"的高级透视镜未创建，需要创建再使用。");
				}
			
			}else if( temp1.indexOf("高级透视镜变量[") != -1 ){
				temp1 = temp1.replace("高级透视镜变量[","");
				temp1 = temp1.replace("]","");
				temp1 = $gameVariables.value( Number(temp1) );
				marker = $gameSystem._drill_EDMB_container.drill_CODM_getSeniorMarkerById( temp1 );
				if( marker == undefined ){
					alert( "【Drill_LayerIllumination.js 地图 - 行走图动态遮罩板B】\n" +
							"插件指令错误，id为"+temp1+"的高级透视镜未创建，需要创建再使用。");
				}
			}
		}
		/*-----------------高级透视镜 - 生命周期------------------*/
		if( marker != null && args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "设置生命" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				marker.drill_setLifeTime( temp1 );
				return;
			}
		}
		if( marker != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "暂停生命流逝" ){
				marker.drill_setLifePause( temp1 );
				return;
			}
			if( type == "继续生命流逝" ){
				marker.drill_setLifePause( temp1 );
				return;
			}
		}
		/*-----------------高级透视镜 - 绑定到------------------*/
		if( marker != null && args.length == 6 ){
			var type = String(args[3]);
			var obj_str = String(args[5]);
			if( type == "绑定到" ){
				
				if( obj_str == "玩家" ){
					marker.drill_setBindingCharacterId( -2 );
					return;
				}
				if( obj_str == "本事件" ){
					marker.drill_setBindingCharacterId( this._eventId );
					return;
				}
				if( obj_str.indexOf("事件[") != -1 ){
					obj_str = obj_str.replace("事件[","");
					obj_str = obj_str.replace("]","");
					var e_id = Number(obj_str);
					if( $gameMap.drill_EDMB_isEventExist( e_id ) == false ){ return; }
					marker.drill_setBindingCharacterId( e_id );
					return;
				}
				if( obj_str.indexOf("事件变量[") != -1 ){
					obj_str = obj_str.replace("事件变量[","");
					obj_str = obj_str.replace("]","");
					var e_id = $gameVariables.value( Number(obj_str) );
					if( $gameMap.drill_EDMB_isEventExist( e_id ) == false ){ return; }
					marker.drill_setBindingCharacterId( e_id );
					return;
				}
				if( obj_str == "鼠标" ){
					marker.drill_setBindingMouse( true );
					return;
				}
				if( obj_str.indexOf("图片变量[") != -1 ){
					obj_str = obj_str.replace("图片变量[","");
					obj_str = obj_str.replace("]","");
					var pic_id = $gameVariables.value( Number(obj_str) );
					if( $gameScreen.drill_EDMB_isPictureExist( pic_id ) == false ){ return; }
					marker.drill_setBindingPictureId( pic_id );
					return;
				}
				if( obj_str.indexOf("图片[") != -1 ){
					obj_str = obj_str.replace("图片[","");
					obj_str = obj_str.replace("]","");
					var pic_id = Number(obj_str);
					if( $gameScreen.drill_EDMB_isPictureExist( pic_id ) == false ){ return; }
					marker.drill_setBindingPictureId( pic_id );
					return;
				}
			}
		}
		if( marker != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "位置归零" ){
				var m_data = {
					"x": 0,
					"y": 0,
					"time": 1,
					"type": "瞬间移动",
				}
				$gameSystem.drill_EDMB_moveTo( marker.drill_id(), m_data );
			}
		}
		/*-----------------高级透视镜 - 移动------------------*/
		if( marker != null && (args.length == 6 || args.length == 8) ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7] || "1");
			if( type == "瞬间移动" || type == "匀速移动" || type == "增减速移动" || type == "弹性移动" || type == "抛物线移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				
				var pos = [];
				if( temp1.indexOf("相对位置变量[") != -1 ){
					temp1 = temp1.replace("相对位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
					var m_data = {
						"x": data['x'] + Number(pos[0]),
						"y": data['y'] + Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_EDMB_moveTo( marker.drill_id(), m_data );
					
				}else if( temp1.indexOf("相对位置[") != -1 ){
					temp1 = temp1.replace("相对位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
					var m_data = {
						"x": data['x'] + Number(pos[0]),
						"y": data['y'] + Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_EDMB_moveTo( marker.drill_id(), m_data );
					
				}else if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
					var m_data = {
						"x":Number(pos[0]),
						"y":Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_EDMB_moveTo( marker.drill_id(), m_data );
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
					var m_data = {
						"x":Number(pos[0]),
						"y":Number(pos[1]),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_EDMB_moveTo( marker.drill_id(), m_data );
				}
			}
		}
		/*-----------------高级透视镜 - 缩放变化------------------*/
		if( marker != null && (args.length == 6 || args.length == 8) ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7] || "1");
			if( type == "瞬间变化" || type == "匀速变化" || type == "增减速变化" || type == "弹性变化" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				
				if( temp1.indexOf("缩放X[") != -1 ){
					temp1 = temp1.replace("缩放X[","");
					temp1 = temp1.replace("]","");
					var o_data = {
						"scaleX":Number(temp1),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_EDMB_scaleXTo( marker.drill_id(), o_data );
				}
				if( temp1.indexOf("缩放Y[") != -1 ){
					temp1 = temp1.replace("缩放Y[","");
					temp1 = temp1.replace("]","");
					var o_data = {
						"scaleY":Number(temp1),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_EDMB_scaleYTo( marker.drill_id(), o_data );
				}
			}
		}
		/*-----------------高级透视镜 - 透明度变化------------------*/
		if( marker != null && (args.length == 6 || args.length == 8) ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7] || "1");
			if( type == "瞬间变化" || type == "匀速变化" || type == "增减速变化" || type == "弹性变化" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				
				if( temp1.indexOf("透明度[") != -1 ){
					temp1 = temp1.replace("透明度[","");
					temp1 = temp1.replace("]","");
					var o_data = {
						"opacity":Number(temp1),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_EDMB_opacityTo( marker.drill_id(), o_data );
				}
			}
		}
		/*-----------------高级透视镜 - 旋转变化------------------*/
		if( marker != null && (args.length == 6 || args.length == 8) ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7] || "1");
			if( type == "瞬间变化" || type == "匀速变化" || type == "增减速变化" || type == "弹性变化" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				
				if( temp1.indexOf("旋转角度[") != -1 ){
					temp1 = temp1.replace("旋转角度[","");
					temp1 = temp1.replace("]","");
					var o_data = {
						"rotate":Number(temp1),
						"time":temp2,
						"type":type,
					}
					$gameSystem.drill_EDMB_rotateTo( marker.drill_id(), o_data );
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EDMB_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_LayerIllumination.js 地图 - 行走图动态遮罩板B】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_EDMB_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_LayerIllumination.js 地图 - 行走图动态遮罩板B】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};


//（这里不考虑 资源预加载，事件贴图本身开关就有延迟）


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 注释初始化
//==============================
var _drill_EDMB_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EDMB_setupPage.call(this);
    this.drill_EDMB_setup();
};
Game_Event.prototype.drill_EDMB_setup = function() {		

	if( !this._erased && this.page() ){ this.list().forEach(function( l ){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>行走图动态遮罩板B" ){
				if(args.length == 2){		//=>行走图动态遮罩板B : 启用该插件的动态遮罩板
					var type = String(args[1]);
					if( type == "启用该插件的动态遮罩板" ){
						this._drill_EDMB_maskBind = "行走图动态遮罩板B";
					}
					if( type == "停用动态遮罩板" ){
						this._drill_EDMB_maskBind = null;
					}
				}
				if(args.length == 4){		//=>行走图动态遮罩板B : 简单透视镜 : 样式[1]
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( type == "简单透视镜" ){
						if( temp1.indexOf("样式[") != -1 ){
							temp1 = temp1.replace("样式[","");
							temp1 = temp1.replace("]","");
							$gameMap.drill_EDMB_addSimplePerspect_characterId( this._eventId, Number(temp1)-1 );
						}
						if( temp1 == "清除" || temp1 == "关闭" ){
							$gameMap.drill_EDMB_removeSimplePerspect_characterId( this._eventId );
						}
					}
				}
			};
		};
	}, this);};
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_EDMB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EDMB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EDMB_sys_initialize.call(this);
	this.drill_EDMB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EDMB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EDMB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EDMB_saveEnabled == true ){	
		$gameSystem.drill_EDMB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EDMB_initSysData();
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
Game_System.prototype.drill_EDMB_initSysData = function() {
	this.drill_EDMB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EDMB_checkSysData = function() {
	this.drill_EDMB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EDMB_initSysData_Private = function() {
	
	this._drill_EDMB_container = new Drill_CODM_PerspectiveMarkerContainer();	//（创建容器）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EDMB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EDMB_container == undefined ){
		this.drill_EDMB_initSysData();
	}
	
};
//==============================
// * 位置 - 移动设置
//==============================
Game_System.prototype.drill_EDMB_moveTo = function( marker_id, m_data ){
	var marker = this._drill_EDMB_container.drill_CODM_getSeniorMarkerById( marker_id );
	//if( marker == undefined ){	//（如果还没来得及创建，则放入变化容器中）
	//	this._drill_EDMB_command_moveBuffer[ marker_id ] = m_data;
	//	return;
	//}
	
	var org_x = marker.drill_getBallisticsX();
	var org_y = marker.drill_getBallisticsY();
	marker.drill_resetBallisticsMovingTime();		//（重设时间）
	
	//   移动（movement）
	m_data['movementNum'] = 1;									//对象数量
	m_data['movementTime'] = m_data["time"];					//时长
	m_data['movementMode'] = "两点式";							//移动模式
	//   两点式（twoPoint）
	m_data['twoPointType'] = m_data["type"];					//两点式 - 类型（匀速移动/弹性移动/…）
	m_data['twoPointDifferenceX'] = m_data["x"] - org_x;		//两点式 - 距离差值x
	m_data['twoPointDifferenceY'] = m_data["y"] - org_y;		//两点式 - 距离差值y
	
	// > 弹道（坐标）
	$gameTemp.drill_COBa_setBallisticsMove( m_data );							//弹道核心 - 坐标初始化
	$gameTemp.drill_COBa_preBallisticsMove( marker, 0 , org_x, org_y );			//弹道核心 - 推演
	
};
//==============================
// * 位置 - 缩放X设置
//==============================
Game_System.prototype.drill_EDMB_scaleXTo = function( marker_id, o_data ){
	var marker = this._drill_EDMB_container.drill_CODM_getSeniorMarkerById( marker_id );
	
	var org_sx = marker.drill_getBallisticsScaleX();
	marker.drill_resetBallisticsScaleXTime();		//（重设时间）
	
	//   缩放X（scaleX）
	o_data['scaleXNum'] = 1;									//对象数量
	o_data['scaleXTime'] = o_data["time"];						//时长
	o_data['scaleXMode'] = "目标值模式";						//移动模式
	//   目标值模式（target）
	o_data['targetType'] = o_data["type"];						//目标值模式 - 类型（匀速变化/弹性变化/…）
	o_data['targetDifference'] = o_data["scaleX"] - org_sx;		//目标值模式 - 距离差值
	
	// > 弹道（缩放X）
	$gameTemp.drill_COBa_setBallisticsScaleX( o_data );					//弹道核心 - 缩放X初始化
	$gameTemp.drill_COBa_preBallisticsScaleX( marker, 0 , org_sx );		//弹道核心 - 推演
	
};
//==============================
// * 位置 - 缩放Y设置
//==============================
Game_System.prototype.drill_EDMB_scaleYTo = function( marker_id, o_data ){
	var marker = this._drill_EDMB_container.drill_CODM_getSeniorMarkerById( marker_id );
	
	var org_sy = marker.drill_getBallisticsScaleY();
	marker.drill_resetBallisticsScaleYTime();		//（重设时间）
	
	//   缩放Y（scaleY）
	o_data['scaleYNum'] = 1;									//对象数量
	o_data['scaleYTime'] = o_data["time"];						//时长
	o_data['scaleYMode'] = "目标值模式";						//移动模式
	//   目标值模式（target）
	o_data['targetType'] = o_data["type"];						//目标值模式 - 类型（匀速变化/弹性变化/…）
	o_data['targetDifference'] = o_data["scaleY"] - org_sy;		//目标值模式 - 距离差值
	
	// > 弹道（缩放Y）
	$gameTemp.drill_COBa_setBallisticsScaleY( o_data );					//弹道核心 - 缩放Y初始化
	$gameTemp.drill_COBa_preBallisticsScaleY( marker, 0 , org_sy );		//弹道核心 - 推演
	
};
//==============================
// * 位置 - 透明度设置
//==============================
Game_System.prototype.drill_EDMB_opacityTo = function( marker_id, o_data ){
	var marker = this._drill_EDMB_container.drill_CODM_getSeniorMarkerById( marker_id );
	
	var org_opacity = marker.drill_getBallisticsOpacity();
	marker.drill_resetBallisticsOpacityTime();		//（重设时间）
	
	//   透明度（opacity）
	o_data['opacityNum'] = 1;									//对象数量
	o_data['opacityTime'] = o_data["time"];						//时长
	o_data['opacityMode'] = "目标值模式";						//移动模式
	//   目标值模式（target）
	o_data['targetType'] = o_data["type"];								//目标值模式 - 类型（匀速变化/弹性变化/…）
	o_data['targetDifference'] = o_data["opacity"] - org_opacity;		//目标值模式 - 距离差值
	
	// > 弹道（透明度）
	$gameTemp.drill_COBa_setBallisticsOpacity( o_data );					//弹道核心 - 透明度初始化
	$gameTemp.drill_COBa_preBallisticsOpacity( marker, 0 , org_opacity );	//弹道核心 - 推演
	
};
//==============================
// * 位置 - 旋转设置
//==============================
Game_System.prototype.drill_EDMB_rotateTo = function( marker_id, o_data ){
	var marker = this._drill_EDMB_container.drill_CODM_getSeniorMarkerById( marker_id );
	
	var org_rotate = marker.drill_getBallisticsRotate();
	marker.drill_resetBallisticsRotateTime();		//（重设时间）
	
	//   旋转（rotate，单位角度）
	o_data['rotateNum'] = 1;									//对象数量
	o_data['rotateTime'] = o_data["time"];						//时长
	o_data['rotateMode'] = "目标值模式";						//移动模式
	//   目标值模式（target）
	o_data['targetType'] = o_data["type"];							//目标值模式 - 类型（匀速变化/弹性变化/…）
	o_data['targetDifference'] = o_data["rotate"] - org_rotate;		//目标值模式 - 距离差值
	
	// > 弹道（旋转）
	$gameTemp.drill_COBa_setBallisticsRotate( o_data );					//弹道核心 - 旋转初始化
	$gameTemp.drill_COBa_preBallisticsRotate( marker, 0 , org_rotate );	//弹道核心 - 推演
	
};


//=============================================================================
// ** 透视镜物体容器
//			
//			主功能：	> 专门控制该插件 动态遮罩板 的 透视镜 的容器。
//			子功能：	
//						->简单透视镜
//							> 绑定事件
//							> 绑定鼠标
//							> 绑定图片
//						->高级透视镜
//
//			说明：	直接使用父类的容器【Drill_CODM_PerspectiveMarkerContainer】，添加数据。
//=============================================================================
//==============================
// * 物体容器 - 地图初始化
//==============================
var _drill_EDMB_map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function(){
	$gameSystem._drill_EDMB_container.drill_CODM_clearSimple();	//（清理简单透视镜）
	_drill_EDMB_map_setupEvents.call( this );
}
//==============================
// * 物体容器 - 地图帧刷新
//==============================
var _drill_EDMB_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EDMB_map_update.call( this,sceneActive );
	if( sceneActive ){
		$gameSystem._drill_EDMB_container.update();		//（容器帧刷新）
	}
};
//==============================
// * 物体容器 - 添加简单透视镜（事件/玩家）
//==============================
Game_Map.prototype.drill_EDMB_addSimplePerspect_characterId = function( character_id, style_id ){	
	var data = DrillUp.g_EDMB_childData[ style_id ];				//（参数准备）
	if( data == undefined ){
		alert("【Drill_EventDynamicMaskB.js  行走图 - 行走图动态遮罩板B】\n插件指令错误，不存在id为" + (style_id+1) +"的透视镜样式配置。");
		return;
	}
	var marker = new Drill_CODM_PerspectiveMarker( data );			//（创建透视镜）
	marker.drill_setBindingCharacterId( character_id );				//（绑定对象）
	marker.drill_setSimple( true );									//（简单透视镜标记）
	$gameSystem._drill_EDMB_container.drill_CODM_addOne( marker );	//（添加到容器）
}
//==============================
// * 物体容器 - 去除简单透视镜（事件/玩家）
//==============================
Game_Map.prototype.drill_EDMB_removeSimplePerspect_characterId = function( character_id ){
	var marker = $gameSystem._drill_EDMB_container.drill_CODM_getSimpleMarkerByCharacterId( character_id );
	if( marker == undefined ){ return; }
	marker.drill_destroy();											//（清除透视镜）
}
//==============================
// * 物体容器 - 添加简单透视镜（鼠标）
//==============================
Game_Map.prototype.drill_EDMB_addSimplePerspect_mouse = function( style_id ){
	var data = DrillUp.g_EDMB_childData[ style_id ];				//（参数准备）
	if( data == undefined ){
		alert("【Drill_EventDynamicMaskB.js  行走图 - 行走图动态遮罩板B】\n插件指令错误，不存在id为" + (style_id+1) +"的透视镜样式配置。");
		return;
	}
	var marker = new Drill_CODM_PerspectiveMarker( data );			//（创建透视镜）
	marker.drill_setBindingMouse( true );							//（绑定对象）
	marker.drill_setSimple( true );									//（简单透视镜标记）
	$gameSystem._drill_EDMB_container.drill_CODM_addOne( marker );	//（添加到容器）
}
//==============================
// * 物体容器 - 去除简单透视镜（鼠标）
//==============================
Game_Map.prototype.drill_EDMB_removeSimplePerspect_mouse = function(){
	var marker = $gameSystem._drill_EDMB_container.drill_CODM_getSimpleMarkerByMouse();
	if( marker == undefined ){ return; }
	marker.drill_destroy();											//（清除透视镜）
}
//==============================
// * 物体容器 - 添加简单透视镜（图片）
//==============================
Game_Map.prototype.drill_EDMB_addSimplePerspect_picId = function( pic_id, style_id ){
	var data = DrillUp.g_EDMB_childData[ style_id ];				//（参数准备）
	if( data == undefined ){
		alert("【Drill_EventDynamicMaskB.js  行走图 - 行走图动态遮罩板B】\n插件指令错误，不存在id为" + (style_id+1) +"的透视镜样式配置。");
		return;
	}
	var marker = new Drill_CODM_PerspectiveMarker( data );			//（创建透视镜）
	marker.drill_setBindingPictureId( pic_id );						//（绑定对象）
	marker.drill_setSimple( true );									//（简单透视镜标记）
	$gameSystem._drill_EDMB_container.drill_CODM_addOne( marker );	//（添加到容器）
}
//==============================
// * 物体容器 - 去除简单透视镜（图片）
//==============================
Game_Map.prototype.drill_EDMB_removeSimplePerspect_picId = function( pic_id ){
	var marker = $gameSystem._drill_EDMB_container.drill_CODM_getSimpleMarkerByPictureId( pic_id );
	if( marker == undefined ){ return; }
	marker.drill_destroy();											//（清除透视镜）
}
//==============================
// * 物体容器 - 添加高级透视镜（默认）
//==============================
Game_Map.prototype.drill_EDMB_addSeniorPerspect = function( marker_id, style_id ){
	var data = DrillUp.g_EDMB_childData[ style_id ];				//（参数准备）
	if( data == undefined ){
		alert("【Drill_EventDynamicMaskB.js  行走图 - 行走图动态遮罩板B】\n插件指令错误，不存在id为" + (style_id+1) +"的透视镜样式配置。");
		return;
	}
	var marker = new Drill_CODM_PerspectiveMarker( data );			//（创建透视镜）
	marker.drill_setId( marker_id );								//（设置id）
	$gameSystem._drill_EDMB_container.drill_CODM_addOne( marker );	//（添加到容器）
	return marker;
}
//==============================
// * 物体容器 - 去除高级透视镜
//			
//			说明：	直接找到对象设置 drill_destroy 即可。
//==============================
Game_Map.prototype.drill_EDMB_removeSeniorPerspect = function( marker_id ){
	var marker = $gameSystem._drill_EDMB_container.drill_CODM_getSeniorMarkerById( marker_id );
	if( marker == undefined ){ return; }
	marker.drill_destroy();											//（清除透视镜）
}



//=============================================================================
// ** 贴图容器
//
//			说明：	根据 透视镜物体容器，添加/删除相应的贴图。
//=============================================================================
//==============================
// * 贴图容器 - 初始化
//==============================
var _drill_EDMB_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_EDMB_temp_initialize.call(this);
	this._drill_EDMB_sprites = [];				//缓冲池 - 鼠标贴图
	this._drill_EDMB_needSort = true;			//排序标记
	this._drill_EDMB_opened = false;			//容器开关
};
//==============================
// * 贴图容器 - 切换地图时
//==============================
var _drill_EDMB_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp._drill_EDMB_sprites = [];	
	$gameTemp._drill_EDMB_opened = false;		//容器开关
	_drill_EDMB_gmap_setup.call( this,mapId );
}
//==============================
// * 贴图容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EDMB_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_EDMB_sprites = [];	
	_drill_EDMB_smap_createCharacters.call(this);
}
//==============================
// * 贴图容器 - 获取透视镜贴图（根据透视镜物体）
//==============================
Game_Temp.prototype.drill_EDMB_getPerspectiveSpriteByMarker = function( marker ){
	for(var i=0; i < $gameTemp._drill_EDMB_sprites.length; i++ ){
		var temp_sprite = $gameTemp._drill_EDMB_sprites[i];
		if( temp_sprite._drill_marker == marker ){
			return temp_sprite;
		}
	}
	return null;
}
//==============================
// * 贴图容器 - 帧刷新 创建/删除 贴图
//==============================
Scene_Map.prototype.drill_EDMB_updateCheck = function() {
	
	// > 删除贴图
	for(var i = $gameTemp._drill_EDMB_sprites.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_EDMB_sprites[i];
		if( temp_sprite.drill_isDestroyed() ){
			this.drill_EDMB_removeMaskChild( temp_sprite );
			$gameTemp._drill_EDMB_sprites.splice( i, 1 );
		}
	}
	
	// > 创建贴图
	var tank = $gameSystem._drill_EDMB_container.drill_CODM_getTank();
	if( tank.length > $gameTemp._drill_EDMB_sprites.length ){
		
		for(var i=0; i < tank.length; i++ ){		//（从物体列表中，依次找贴图对应的物体）
			var temp_marker = tank[i];
			var temp_sprite = $gameTemp.drill_EDMB_getPerspectiveSpriteByMarker( temp_marker );
			if( temp_sprite != undefined ){ continue; }
			
			var new_sprite = new Drill_CODM_PerspectiveSprite( temp_marker );
			this.drill_EDMB_addMaskChild( new_sprite );
			$gameTemp._drill_EDMB_sprites.push( new_sprite );
			if( tank.length == $gameTemp._drill_EDMB_sprites.length ){
				break;
			}
		}
		$gameTemp._drill_EDMB_needSort = true;
	}
}


//=============================================================================
// ** 动态遮罩板 接口
//
//			说明：	这里设置 动态遮罩容器【Drill_CODM_MaskStage】 的实例化，并提供 动态遮罩板的获取接口。
//=============================================================================
//==============================
// * 动态遮罩板 - 遮罩容器
//==============================
Scene_Map.prototype.drill_EDMB_createMaskLayer = function() {
	
	// > 动态遮罩容器
	var temp_stage = new Drill_CODM_MaskStage( Graphics.boxWidth, Graphics.boxHeight );
	this._drill_EDMB_maskStage = temp_stage;
	
};
//==============================
// * 动态遮罩板 - 获取遮罩容器（接口）
//==============================
Scene_Map.prototype.drill_EDMB_getMaskStage = function(){
	return this._drill_EDMB_maskStage;
}
//==============================
// * 动态遮罩板 - 获取贴图（接口）
//
//			说明：	如果你要从 _drill_EDMB_maskStage 那里获取内容，最好通过该接口函数调用，而不是直接调用。
//==============================
Scene_Map.prototype.drill_EDMB_getMaskSprite = function(){
	$gameTemp._drill_EDMB_opened = true;
	return this._drill_EDMB_maskStage.drill_CODM_getNewSprite();
}
//==============================
// * 动态遮罩板 - 添加 透视镜贴图（接口）
//==============================
Scene_Map.prototype.drill_EDMB_addMaskChild = function( new_sprite ){
	this._drill_EDMB_maskStage.drill_CODM_addMaskChild( new_sprite );
}
//==============================
// * 动态遮罩板 - 删除 透视镜贴图（接口）
//==============================
Scene_Map.prototype.drill_EDMB_removeMaskChild = function( new_sprite ){
	this._drill_EDMB_maskStage.drill_CODM_removeMaskChild( new_sprite );
}
//==============================
// * 动态遮罩板 - 判断容器开关（接口）
//==============================
Scene_Map.prototype.drill_EDMB_isMaskOpened = function(){	
	if( $gameTemp._drill_EDMB_opened == true ){
		return true;
	}
	return false;
};
//==============================
// * 动态遮罩板 - 打开容器开关（接口）
//
//			说明：	获取贴图时会自动打开，你也可以主动打开开关。
//==============================
Scene_Map.prototype.drill_EDMB_setMaskOpened = function( b ){	
	$gameTemp._drill_EDMB_opened = b;
}


//=============================================================================
// ** 动态遮罩板（地图界面）
//
//=============================================================================
//==============================
// * 地图界面 - 创建
//==============================
var _drill_EDMB_Scene_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
	_drill_EDMB_Scene_initialize.call(this);
	this.drill_EDMB_createMaskLayer();		//（容器必须在所有 场景装饰插件 之前创建）
};
//==============================
// * 地图界面 - 帧刷新
//==============================
var _drill_EDMB_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_EDMB_scene_update.call(this);
	
	// > 开启后才使用
	if( this.drill_EDMB_isMaskOpened() == false ){ return; }
	
	// > 测试 - update激活监听
	//if( DrillUp.g_EDMB_debugUpdate == true ){
	//	DrillUp.g_EDMB_debugUpdate = false;
	//	alert("行走图动态遮罩板B 开始帧刷新。");
	//}
	
	// > 刷新统计
	this.drill_EDMB_updateCheck();
	
	// > 容器帧刷新
	this._drill_EDMB_maskStage.update();
	
	// > 透视镜 排序（延迟）
	if( $gameTemp._drill_EDMB_needSort == true ){
		$gameTemp._drill_EDMB_needSort = false;
		this._drill_EDMB_maskStage.drill_CODM_sortByZIndex();
	}
};
DrillUp.g_EDMB_debugUpdate = true;


//=============================================================================
// ** 事件绑定 动态遮罩板
//=============================================================================
//==============================
// * 事件 - 初始化
//==============================
var _drill_EDMB_ch_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function() {
	_drill_EDMB_ch_initialize.call( this );
	this._drill_EDMB_maskBind = null;
}
//==============================
// * 图片贴图 - 初始化
//==============================
var _drill_EDMB_sc_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function( character ){
	_drill_EDMB_sc_initialize.call( this, character );
	
	this._drill_EDMB_curMaskBind = null;
	this._drill_EDMB_maskSprite = null;
}
//==============================
// * 图片贴图 - 帧刷新
//
//			说明：	在 界面类 中，对 Spriteset_Base图层贴图 中的图片对象进行 动态遮罩板绑定刷新。
//==============================
Scene_Map.prototype.drill_EDMB_updateCharacterSprite = function(){	
	if( this._spriteset == undefined ){ return; }
	
	// > 遍历图片组
	var sprite_list = this._spriteset._characterSprites;
	for(var i=0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite instanceof Sprite_Character == false ){ continue; }
		var ch = temp_sprite._character;
		if( ch == undefined ){ continue; }
		
		// > 根据 图片贴图与图片数据 锁
		if( ch._drill_EDMB_maskBind == temp_sprite._drill_EDMB_curMaskBind ){ continue; }
		temp_sprite._drill_EDMB_curMaskBind = ch._drill_EDMB_maskBind;
		
		// > 数据变化时，只执行一次遮罩切换
		if( ch._drill_EDMB_maskBind == "行走图动态遮罩板B" ){
			temp_sprite._drill_EDMB_maskSprite = this.drill_EDMB_getMaskSprite();
			temp_sprite.mask = temp_sprite._drill_EDMB_maskSprite;
		}
		if( ch._drill_EDMB_maskBind == null ){
			temp_sprite.mask = null;
		}
	}
}
//==============================
// * 地图界面 - 帧刷新绑定
//==============================
var _drill_EDMB_mapScene_update2 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_EDMB_mapScene_update2.call(this);
	this.drill_EDMB_updateCharacterSprite();
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventDynamicMaskB = false;
		alert(
			"【Drill_EventDynamicMaskB.js  地图 - 行走图动态遮罩板B】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfDynamicMask  系统-动态遮罩核心"
		);
}

