//=============================================================================
// Drill_BattleTiledGif.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        战斗 - 多层战斗平铺GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "平铺GIF-%d"
 * @Drill_LE_parentKey "---平铺GIF组%d至%d---"
 * @Drill_LE_var "null"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_BattleTiledGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在战斗中放置一个或者多个战斗平铺GIF。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   可以放置在战斗中的四个层级中。
 * 2.该插件可以装饰战斗的各种层级。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 * 战斗层级：
 *   (1.你可以将平铺GIF放置在战斗的五种层级中，分别为：
 *      下层、上层、图片层、最顶层
 *   (2.战斗层级之间的关系为：
 *      底图 《 平铺GIF 《 下层 《 敌人/角色层 《 上层
 *      《 图片对象层 《 图片层 《 对话框集合 《 最顶层
 *   (3.最顶层可以把地图界面最高层的对话框、窗口也给挡住。
 *   (4.处于同一 战斗层级 时，将根据 图片层级 再先后排序。
 * 位移比：
 *   (1.根据物理相对运动知识，近大远小，近快远慢的原则。要让GIF看起
 *      来真的"远"，那需要设置位移比接近1.00，越接近1.00越远。
 *   (2.去看看最新版本的 文档图解 介绍，
 *      这里是看起来简单但是实际做起来非常复杂的坑。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Battle__layer （Battle后面有两个下划线）
 * 先确保项目img文件夹下是否有Battle__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 平铺GIF1 资源-平铺GIF
 * 平铺GIF2 资源-平铺GIF
 * 平铺GIF3 资源-平铺GIF
 * ……
 *
 * 所有素材都放在Battle__layer下，不分多余文件夹。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令控制战斗平铺GIF的显示情况：
 * （7个基本参数，冒号两边有一个空格。）
 * 
 * 插件指令：>清空全部战斗装饰部件
 * 插件指令：>创建战斗平铺GIF : A : 平铺GIF[B] : C : D : E : F : G
 *
 * 参数A：平铺GIF编号
 *        给平铺GIF分配的编号，如果重复编号的平铺GIF被创建，那么会被覆盖。
 * 参数B：GIF资源编号
 *        对应gif配置中资源配置的编号。
 * 参数C：图片层级
 *        在相同战斗层级下，先后排序的位置，0表示最后面。
 * 参数D：战斗层级
 *        所属的战斗层级，填入：下层、上层、图片层、最顶层。
 * 参数E：X速度
 *        按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * 参数F：Y速度
 *        按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * 参数G：位移比
 *        与镜头插件相关，平铺GIF与镜头移动位移的比例。
 *        设置1.00，平铺GIF和镜头的位移一致。设置0.00则平铺GIF不随镜头移动。
 * 参数示例：
 *        >清空全部战斗装饰部件
 *        >创建战斗平铺GIF : 1 : 平铺GIF[4] : 1 : 上层 : -1.0 : 1.0 : 0.60
 *        >创建战斗平铺GIF : 2 : 平铺GIF[4] : 12 : 下层 : 0.93 : 0.0 : 0.00
 * 
 * 1.注意，创建指令必须在 战斗前 执行。
 *   战斗时创建的，会被留到下一场战斗中显现。
 * 2.创建前，最好先清空一下，避免干扰。
 *   清空默认会包括清空背景、魔法圈、gif、视频，只要有一个清空指令就可以了。
 * 3.考虑到该指令只用于创建，并且文本简单，
 *   所以此插件指令的格式 不变 ，且后期也不会翻新。
 *   你如果对平铺GIF有其它参数设置，可以先写 创建 指令，然后写 变化 指令实现。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 随着战斗的深入，战斗平铺GIF也可能会根据特殊情况变化：
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 变混合模式 : 延迟[150] : 混合模式[2]
 * 插件指令：>战斗平铺GIF : 平铺GIF变量[11] : 变混合模式 : 延迟[150] : 混合模式[2]
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 变混合模式 : 延迟[150] : 混合模式[2]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 变坐标 : 延迟[150] : 变化时间[60] : 位置[100,100]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 变坐标 : 延迟[150] : 变化时间[60] : 位置变量[25,26]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 变透明 : 延迟[150] : 变化时间[60] : 透明度[255]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 变透明 : 延迟[150] : 变化时间[60] : 透明度变量[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 变速度 : 延迟[150] : 变化时间[60] : 速度[1.0,-1.0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 变速度 : 延迟[150] : 变化时间[60] : 速度变量[25,26]
 * 
 * 1.前半部分（平铺GIF变量[21]）和 后半部分（变混合模式 : 延迟[150] : 混合模式[2]）
 *   的参数可以随意组合。一共有2*7种组合方式。
 * 2."延迟[150]"表示插件指令生效后，开始变化的延迟时间。单位帧。（1秒60帧）
 *    在战斗前设置90，表示 进入战斗 后，90帧(1.5秒)时开始变化。
 *    在战斗中设置30，表示 插件指令调用 后30帧(0.5秒)开始变化。
 * 3."变坐标"的变化效果可以与速度叠加。
 * 4."混合模式"为瞬间切换，可以去看看"0.基本定义 > 混合模式.docx"。
 * 5.插件指令的变化是永久性的。
 *   如果你想瞬间切换，设置变化时间为0即可。
 * 6.平铺GIF无法变缩放，无法变斜切。
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
 * 测试方法：   开启3个GIF，并进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【22.86ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.平铺GIF相当于在战斗背景的基础上额外加了GIF播放功能，播放本身
 *   消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了战斗层级结构。
 * [v1.2]
 * 优化了与战斗活动镜头的变换关系。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * 
 *
 *
 * @param ---平铺GIF组 1至20---
 * @default
 *
 * @param 平铺GIF-1
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-2
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-3
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-4
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-5
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-6
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-7
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-8
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-9
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-10
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-11
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-12
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-13
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-14
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-15
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-16
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-17
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-18
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-19
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-20
 * @parent ---平铺GIF组 1至20---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组21至40---
 * @default
 *
 * @param 平铺GIF-21
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-22
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-23
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-24
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-25
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-26
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-27
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-28
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-29
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-30
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-31
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-32
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-33
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-34
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-35
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-36
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-37
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-38
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-39
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-40
 * @parent ---平铺GIF组21至40---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组41至60---
 * @default
 *
 * @param 平铺GIF-41
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-42
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-43
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-44
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-45
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-46
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-47
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-48
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-49
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-50
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-51
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-52
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-53
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-54
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-55
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-56
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-57
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-58
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-59
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-60
 * @parent ---平铺GIF组41至60---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组61至80---
 * @default
 *
 * @param 平铺GIF-61
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-62
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-63
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-64
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-65
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-66
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-67
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-68
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-69
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-70
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-71
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-72
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-73
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-74
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-75
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-76
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-77
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-78
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-79
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-80
 * @parent ---平铺GIF组61至80---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组81至100---
 * @default
 *
 * @param 平铺GIF-81
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-82
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-83
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-84
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-85
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-86
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-87
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-88
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-89
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-90
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-91
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-92
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-93
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-94
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-95
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-96
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-97
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-98
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-99
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-100
 * @parent ---平铺GIF组81至100---
 * @type struct<BattleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 */
/*~struct~BattleTiledGIF:
 *
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的平铺GIF资源==
 *
 * @param 资源-平铺GIF
 * @desc png图片资源组，多张构成gif。
 * @default ["(需配置)战斗平铺GIF"]
 * @require 1
 * @dir img/Battle__layer_gif/
 * @type file[]
 *
 * @param 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BTG（Battle_Background）
//		临时全局变量	无
//		临时局部变量	this._drill_BTG_xxx
//		存储数据变量	$gameSystem._drill_BTG_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	战斗界面
//		★性能测试消耗	7.62ms（drill_BTG_updateBase）
//		★最坏情况		无
//		★备注			垃圾电脑在战斗界面整体都卡，播放时，GIF也卡。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			多层地图平铺GIF：
//				->基本属性
//					->战斗层级、图片层级
//					->简单持续平移
//					->镜头位移比
//				->可修改的属性
//					->时间延迟
//					->坐标、速度、透明、混合模式
//					x->色调、缩放、斜切
//
//			战斗界面全层级关系：
//				Spriteset： LowerLayer：	底图 < 平铺GIF < 下层 < 敌人层 < 角色层 < 上层
//							UpperLayer：	< 图片对象层 < (时间框层) < (闪烁幕布层) < 图片层
//											< MOG的ui层【_hudField】 < ui层【_drill_battle_ui_board】
//				AllWindows：WindowLayer：	< 对话框集合 < 滚动文本画布 < 最顶层【_drill_SenceTopArea】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.使用插件指令变化时，changing将会作为一个变化容器，根据时间对【sprite】进行改变。
//			
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//			

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleTiledGif = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_BattleTiledGif');
	
	//==============================
	// * 变量获取 - 平铺GIF
	//				（~struct~BattleTiledGIF）
	//==============================
	DrillUp.drill_BTG_tiledGifInit = function( dataFrom ) {
		var data = {};
		if( dataFrom["资源-平铺GIF"] != "" &&
			dataFrom["资源-平铺GIF"] != undefined ){
			data['src_img'] = JSON.parse( dataFrom["资源-平铺GIF"] );
		}else{
			data['src_img'] = [];
		}
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		return data;
	}
	
	/*-----------------平铺GIF------------------*/
	DrillUp.g_BTG_list_length = 100;
	DrillUp.g_BTG_list = [];
	for (var i = 0; i < DrillUp.g_BTG_list_length; i++) {
		if( DrillUp.parameters["平铺GIF-" + String(i+1) ] != undefined &&
			DrillUp.parameters["平铺GIF-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['平铺GIF-' + String(i+1) ]);
			DrillUp.g_BTG_list[i] = DrillUp.drill_BTG_tiledGifInit( temp );
			DrillUp.g_BTG_list[i]['id'] = Number(i)+1;
			DrillUp.g_BTG_list[i]['inited'] = true;
		}else{
			DrillUp.g_BTG_list[i] = DrillUp.drill_BTG_tiledGifInit( {} );
			DrillUp.g_BTG_list[i]['id'] = Number(i)+1;
			DrillUp.g_BTG_list[i]['inited'] = false;
		}
	}

	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_BattleLayerGIF = function(filename) {
    return this.loadBitmap('img/Battle__layer_gif/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_BTG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BTG_pluginCommand.call(this, command, args);
	
	/*-----------------创建指令（固定）------------------*/
	if( command === ">创建战斗平铺GIF" ){			// >创建战斗平铺GIF : 1 : B数字阵列 : 1 : 上层 : -1.0 : 1.0 : 0.60
		if(args.length == 14){
			var index = Number(args[1]);
			var src_id = String(args[3]);
			src_id = src_id.replace("平铺GIF[","");
			src_id = src_id.replace("]","");
			src_id = Number(src_id);
			$gameSystem._drill_BTG_seq[index] = {};								//平铺GIFid
			$gameSystem._drill_BTG_seq[index]['src_img'] =  DrillUp.g_BTG_list[ src_id-1 ]['src_img'];			//平铺GIF资源名
			$gameSystem._drill_BTG_seq[index]['interval'] = DrillUp.g_BTG_list[ src_id-1 ]['interval'];			//平铺GIF帧间隔
			$gameSystem._drill_BTG_seq[index]['back_run'] = DrillUp.g_BTG_list[ src_id-1 ]['back_run'];			//平铺GIF倒放
			$gameSystem._drill_BTG_seq[index]['zIndex'] = Number(args[5]);		//平铺GIF图片层级
			$gameSystem._drill_BTG_seq[index]['area_index'] = String(args[7]);	//平铺GIF战斗层级
			$gameSystem._drill_BTG_seq[index]['x_speed'] = Number(args[9]);		//平铺GIF X速度
			$gameSystem._drill_BTG_seq[index]['y_speed'] = Number(args[11]);	//平铺GIF Y速度
			$gameSystem._drill_BTG_seq[index]['rate'] = Number(args[13]);		//平铺GIF位移比
		}
	}
	if( command === ">清空全部战斗装饰部件" || command === ">清空战斗平铺GIF" ){
		$gameSystem._drill_BTG_seq = [];
		$gameSystem._drill_BTG_changing = [];
	}
	
	/*-----------------变化指令------------------*/
	if( command === ">战斗平铺GIF" ){ 		// >战斗平铺GIF : 平铺GIF[1] : 变混合模式 : 延迟[150] : 混合模式[2]
		if(args.length >= 2){
			var id = -1;
			var temp1 = String(args[1]);
			if( temp1.indexOf("平铺GIF[") != -1 ){
				temp1 = temp1.replace("平铺GIF[","");
				temp1 = temp1.replace("]","");
				id = Number(temp1);
			}
			if( temp1.indexOf("平铺GIF变量[") != -1 ){
				temp1 = temp1.replace("平铺GIF变量[","");
				temp1 = temp1.replace("]","");
				id = $gameVariables.value(Number(temp1));
			}
			
			if( id != -1 && args.length >= 6 ){
				var type = String(args[3]);
				var temp2 = String(args[5]);
				temp2 = temp2.replace("延迟[","");
				temp2 = temp2.replace("]","");
				
				var changing = {};
				changing['destroy'] = false;
				changing['id'] = id;
				changing['type'] = type;
				changing['start'] = Number(temp2);
				if( SceneManager._scene.constructor.name === "Scene_Battle" ){		//（战斗中的开始时间）
					changing['start'] = Number(args[5]) + ($gameSystem._drill_BTG_timer || 0);
				}
				
				if(args.length == 8){
					var temp3 = String(args[7]);
					if( type == "变混合模式" ){
						var num_list = this.drill_BTG_getArgNumList(temp3);
						changing['data1'] = num_list[0];
						$gameSystem._drill_BTG_changing.push(changing);
						return;
					}
				}
				if(args.length == 10){
					var temp3 = String(args[7]);
					var temp4 = String(args[9]);
					temp3 = temp3.replace("变化时间[","");
					temp3 = temp3.replace("]","");
					changing['data1'] = Number(temp3);
					
					if( type == "变坐标" ){
						var num_list = this.drill_BTG_getArgNumList(temp4);
						changing['data2'] = num_list[0];
						changing['data3'] = num_list[1];
						$gameSystem._drill_BTG_changing.push(changing);
						return;
					}
					if( type == "变透明" ){
						var num_list = this.drill_BTG_getArgNumList(temp4);
						changing['data2'] = num_list[0];
						$gameSystem._drill_BTG_changing.push(changing);
						return;
					}
					if( type == "变速度" ){
						var num_list = this.drill_BTG_getArgNumList(temp4);
						changing['data2'] = num_list[0];
						changing['data3'] = num_list[1];
						$gameSystem._drill_BTG_changing.push(changing);
						return;
					}
				}
			}
		}
	}
	
};
//==============================
// * 插件指令 - 获取方括号中的数字（返回数字数组）
//==============================
Game_Interpreter.prototype.drill_BTG_getArgNumList = function( arg_str ){
	var arr = arg_str.match( /([^\[]+)\[([^\]]+)\]/ );
	if( arr.length >= 3 ){
	// > 有方括号
		var data_name = arr[1];
		var data_list = arr[2].split(",");
		var result_list = [];
		
		if( data_name.contains("变量") ){
			for(var i=0; i < data_list.length; i++){ result_list.push( $gameVariables.value(Number(data_list[i])) ); }
			return result_list;
		}else{
			for(var i=0; i < data_list.length; i++){ result_list.push( Number(data_list[i]) ); }
			return result_list;
		}
	}else{
	// > 没有方括号
		var data_list = arg_str.split(",");
		var result_list = [];
		for(var i=0; i < data_list.length; i++){ result_list.push( Number(data_list[i]) ); }
		return result_list;
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
DrillUp.g_BTG_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BTG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BTG_sys_initialize.call(this);
	this.drill_BTG_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BTG_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BTG_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BTG_saveEnabled == true ){	
		$gameSystem.drill_BTG_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BTG_initSysData();
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
Game_System.prototype.drill_BTG_initSysData = function() {
	this.drill_BTG_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BTG_checkSysData = function() {
	this.drill_BTG_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BTG_initSysData_Private = function() {
    this._drill_BTG_timer = 0;      	//战斗计时器
	
    this._drill_BTG_seq = [];			//容器 - 创建的数据
    this._drill_BTG_changing = [];  	//容器 - 变化数据
	//（初始为空容器，不需要初始化）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BTG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BTG_seq == undefined ){
		this.drill_BTG_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，战斗前才赋值，且只在战斗时用到）
};


//#############################################################################
// ** 【标准模块】战斗层级
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
Scene_Battle.prototype.drill_BTG_layerAddSprite = function( sprite, layer_index ){
	this.drill_BTG_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_BTG_layerRemoveSprite = function( sprite ){
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
Scene_Battle.prototype.drill_BTG_sortByZIndex = function () {
    this.drill_BTG_sortByZIndex_Private();
}
//##############################
// * 战斗层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置，当前为 战斗参照）
//					> y 数字              （y位置，当前为 战斗参照）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Battle.prototype.drill_BTG_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_BTG_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_BTG_battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_BTG_battle_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_BTG_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_BTG_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_BTG_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_BTG_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_BTG_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_BTG_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_BTG_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_BTG_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_battleDownArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_battleUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}
//==============================
// * 战斗层级 - 层级与镜头的位移（私有）
//==============================
Scene_Battle.prototype.drill_BTG_layerCameraMoving_Private = function( xx, yy, layer, option ){
		
	// > 位移比
	var x_per = option['rate'];
	var y_per = option['rate'];
	if( Imported.Drill_BattleCamera ){
		var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
		xx += camera_pos.x * x_per;
		yy += camera_pos.y * y_per;
	}
	//		（*0 表示不跟镜头移动，紧贴地图；*1表示紧贴镜头。）
	
	
	// > 战斗参照 -> 战斗参照
	if( layer == "下层" || layer == "上层" ){
		//（不操作）
		return {'x':xx, 'y':yy };
	}
	
	// > 战斗参照 -> 镜头参照
	if( layer == "图片层" || layer == "最顶层" ){
		xx -= this._spriteset._baseSprite.x;	//（由于 Spriteset_Battle 的 _baseSprite 坐标始终是(0,0)，所以两个参照没有区别。）
		yy -= this._spriteset._baseSprite.y;
		
		// > 战斗镜头位移（在图层内）
		if( Imported.Drill_BattleCamera ){
			var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
			xx -= camera_pos.x;
			yy -= camera_pos.y;
		}else{
			xx -= this._spriteset._battleField.x;	//（处于 Spriteset_Battle 的 _battleField 情况。）
			yy -= this._spriteset._battleField.y;
		}
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}


//=============================================================================
// ** 战斗界面
//=============================================================================
//==============================
// * 战斗界面 - 创建
//==============================
var _drill_BTG_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    _drill_BTG_createDisplayObjects.call(this);
	this.drill_BTG_initDataTank();			//贴图数据初始化
	this.drill_BTG_createSprite();			//创建贴图
};
//==============================
// * 战斗界面 - 贴图数据初始化
//==============================
Scene_Battle.prototype.drill_BTG_initDataTank = function(){
	this._drill_BTG_s_dataTank = [];		//容器初始化
	
	for( var i = 0; i < $gameSystem._drill_BTG_seq.length; i++ ){
		var temp_data = $gameSystem._drill_BTG_seq[i];
		if( temp_data == undefined ){ continue; }
		if( this.drill_BTG_getSpriteDataById( i ) != undefined ){ continue; }	//（去重）
		var temp_s_data = JSON.parse(JSON.stringify( temp_data ));				//深拷贝数据（杜绝引用造成的修改）
		
		// > 默认值
		temp_s_data['id'] = i;																	//平铺GIFid
		if( temp_s_data['src_img'] == undefined ){ temp_s_data['src_img'] = "" };				//平铺GIF资源名
		if( temp_s_data['zIndex'] == undefined ){ temp_s_data['zIndex'] = 1 };	         		//平铺GIF图片层级
		if( temp_s_data['area_index'] == undefined ){ temp_s_data['area_index'] = "下层" };		//平铺GIF战斗层级
		if( temp_s_data['x_speed'] == undefined ){ temp_s_data['x_speed'] = 0.0 };	     		//平铺GIF X速度
		if( temp_s_data['y_speed'] == undefined ){ temp_s_data['y_speed'] = 0.0 };	     		//平铺GIF Y速度
		if( temp_s_data['rate'] == undefined ){ temp_s_data['rate'] = 0.0 };	             	//平铺GIF位移比
		
		// > 私有变量初始化
		temp_s_data['x'] = 0;					//基本属性
		temp_s_data['y'] = 0;					//
		temp_s_data['opacity'] = 255;			//
		temp_s_data['blendMode'] = 0;			//
		
		temp_s_data['cur_speedX'] = 0;			//当前x位置（速度累加的结果）
		temp_s_data['cur_speedY'] = 0;			//
		
		temp_s_data['gif_time'] = 0;					//gif - 计时器
		temp_s_data['gif_lock'] = false;				//gif - 锁定帧
		temp_s_data['gif_p_playing'] = false;			//gif - 播放一次
		temp_s_data['gif_p_playType'] = "forwardRun";	//gif - 播放是否反向
		temp_s_data['gif_p_curTime'] = 0;				//gif - 当前时间
		temp_s_data['gif_p_tarTime'] = 0;				//gif - 目标时间
		
		temp_s_data['src_bitmaps'] = [];		//资源对象列表（注意，这里的数据存放了bitmap对象，所以与sprite一样随时会被销毁）
		for(var j = 0; j < temp_s_data['src_img'].length ; j++){
			temp_s_data['src_bitmaps'].push( ImageManager.load_BattleLayerGIF(temp_s_data['src_img'][j]) );
		}
		
		this._drill_BTG_s_dataTank.push( temp_s_data );
	}
};
//==============================
// * 战斗界面 - 创建贴图
//==============================
Scene_Battle.prototype.drill_BTG_createSprite = function() {
	$gameSystem._drill_BTG_timer = 0;		//计时初始化
	this._drill_BTG_spriteTank = [];		//贴图容器初始化
	
	for( var i = 0; i < this._drill_BTG_s_dataTank.length; i++ ){
		var temp_s_data = this._drill_BTG_s_dataTank[i];
		
		var temp_sprite = new TilingSprite();		//TilingSprite平铺图层
		temp_sprite.bitmap = temp_s_data['src_bitmaps'][0];
		temp_sprite.move(0, 0, Graphics.width, Graphics.height);
		if( Imported.Drill_BattleCamera ){
			temp_sprite.move(
				(Graphics.width - $gameSystem._drill_cam_limit_width)/2, 
				(Graphics.height - $gameSystem._drill_cam_limit_height)/2, 
				$gameSystem._drill_cam_limit_width, 
				$gameSystem._drill_cam_limit_height
			);
		}
		temp_sprite.origin.x = temp_s_data['x'];
		temp_sprite.origin.y = temp_s_data['y'];
		temp_sprite.opacity = temp_s_data['opacity'];
		temp_sprite.blendMode = temp_s_data['blendMode'];
		temp_sprite.zIndex = temp_s_data['zIndex'];
		
		// > 战斗层级
		this._drill_BTG_spriteTank.push(temp_sprite);
		this.drill_BTG_layerAddSprite( temp_sprite, temp_s_data['area_index'] );
	}
	this.drill_BTG_sortByZIndex();
};
//==============================
// * 战斗界面 - 获取贴图数据(根据id)
//==============================
Scene_Battle.prototype.drill_BTG_getSpriteDataById = function( id ){
	for(var i=0; i < this._drill_BTG_s_dataTank.length; i++ ){
		var temp_data = this._drill_BTG_s_dataTank[i];
		if( temp_data['id'] == id ){
			return temp_data;
		}
	}
	return null;
};

//==============================
// * 帧刷新
//==============================
var _drill_BTG_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	_drill_BTG_update.call(this);
	
	if( this.parent != undefined && this.parent.constructor.name == "Scene_Battle" ){	
		this.parent.drill_BTG_updateBase();			//基本属性
		this.parent.drill_BTG_updateChange();		//变化属性
	}
};
//==============================
// * 帧刷新 - 基本属性
//==============================
Scene_Battle.prototype.drill_BTG_updateBase = function() {
	
	// > 计时+1
	$gameSystem._drill_BTG_timer += 1;
	
	// > 基本属性
	for( var i = 0; i < this._drill_BTG_spriteTank.length; i++ ){
		var temp_sprite = this._drill_BTG_spriteTank[i];
		var temp_s_data = this._drill_BTG_s_dataTank[i];
		var b_time = $gameSystem._drill_BTG_timer;
		
		// > 播放gif(正常循环)
		if( temp_s_data['gif_p_playing'] == false ){
			
			if( temp_s_data['gif_lock'] != true ){
				temp_s_data['gif_time'] += 1;
			}
			var inter = temp_s_data['gif_time'];
			inter = inter / temp_s_data['interval'];
			inter = inter % temp_s_data['src_bitmaps'].length;
			if( temp_s_data['back_run'] ){
				inter = temp_s_data['src_bitmaps'].length - 1 - inter;
			}
			inter = Math.floor(inter);
			temp_sprite.bitmap = temp_s_data['src_bitmaps'][inter];
		
		// > 播放gif(播放一次)
		}else{
			temp_s_data['gif_p_curTime'] += 1;
			
			var inter = temp_s_data['gif_p_curTime'];
			inter = inter / temp_s_data['interval'];
			inter = inter % temp_s_data['src_bitmaps'].length;
			if( temp_s_data['gif_p_playType'] == "backRun" ){
				inter = temp_s_data['src_bitmaps'].length - 1 - inter;
			}
			inter = Math.floor(inter);
			temp_sprite.bitmap = temp_s_data['src_bitmaps'][inter];
			
			if( temp_s_data['gif_p_curTime'] >= temp_s_data['gif_p_tarTime'] ){
				temp_s_data['gif_p_playing'] = false;
				temp_s_data['gif_time'] = inter * temp_s_data['interval'];
				temp_s_data['gif_lock'] = true;
			}
		}
		
		// > 位移（战斗参照）
		var xx = 0;
		var yy = 0;
		xx += temp_s_data['x'];
		yy += temp_s_data['y'];
		
		// > 速度变化
		temp_s_data['cur_speedX'] += temp_s_data['x_speed'];
		temp_s_data['cur_speedY'] += temp_s_data['y_speed'];
		xx += temp_s_data['cur_speedX'];
		yy += temp_s_data['cur_speedY'];
		
		
		// > 层级与镜头的位移（镜头参照）
		var option = {
			"rate": temp_s_data['rate'],
		};
		var pos = this.drill_BTG_layerCameraMoving(xx, yy, temp_s_data['area_index'], option );
		xx = pos['x'];
		yy = pos['y'];
		
		
		// > 位置
		temp_sprite.origin.x = Math.floor(xx);
		temp_sprite.origin.y = Math.floor(yy);
	}
}
//==============================
// * 帧刷新 - 变化属性
//==============================
Scene_Battle.prototype.drill_BTG_updateChange = function() {
	for( var i = 0; i < this._drill_BTG_spriteTank.length; i++ ){
		var temp_sprite = this._drill_BTG_spriteTank[i];
		var temp_s_data = this._drill_BTG_s_dataTank[i];
		var b_time = $gameSystem._drill_BTG_timer;
		var change_tank = $gameSystem._drill_BTG_changing;
		
		for (var j = 0; j < change_tank.length; j++) {
			var t = change_tank[j];
			if( t['id'] == temp_s_data['id'] ){
				
				if( t.type == "变坐标" ){
					if( b_time > t['start'] && !t['cur_x'] ){	//1.变化 初始化
						t['cur_x'] = temp_s_data['x'];
						t['cur_y'] = temp_s_data['y'];
						t['c_x'] = ( t['data2'] - t['cur_x'])/ t['data1'] ;
						t['c_y'] = ( t['data3'] - t['cur_y'])/ t['data1'] ;
					}
					if( b_time > t['start'] + t['data1'] ){	//3.结束变化
						temp_s_data['x'] = t['data2'];
						temp_s_data['y'] = t['data3'];
						t.destroy = true;
					}else if( b_time > t['start'] ){	//2.变化中
						var time = b_time - t['start'];
						temp_s_data['x'] = t['cur_x'] + t['c_x'] *time;
						temp_s_data['y'] = t['cur_y'] + t['c_y'] *time;
					}
				}
				
				if( t.type == "变速度" ){
					if( b_time > t['start'] && !t['cur_speed_x'] ){		//1.变化 初始化
						t['cur_speed_x'] = temp_s_data['x_speed'];
						t['cur_speed_y'] = temp_s_data['y_speed'];
						t['c_speed_x'] = ( t['data2'] - t['cur_speed_x'])/ t['data1'] ;
						t['c_speed_y'] = ( t['data3'] - t['cur_speed_y'])/ t['data1'] ;
					}
					if( b_time > t['start'] + t['data1'] ){	//3.结束变化
						temp_s_data['x_speed'] = t['data2'];
						temp_s_data['y_speed'] = t['data3'];
						t.destroy = true;
					}else if( b_time > t['start'] ){	//2.变化中
						var time = b_time - t['start'];
						temp_s_data['x_speed'] = t['cur_speed_x'] + t['c_speed_x'] *time;
						temp_s_data['y_speed'] = t['cur_speed_y'] + t['c_speed_y'] *time;
					}
				}
				
				if( t.type == "变透明" ){
					if( b_time > t['start'] && !t['cur_opacity'] ){		//1.变化 初始化
						t['cur_opacity'] = temp_sprite.opacity;
						t['c_opacity'] = ( t['data2'] - t['cur_opacity'])/ t['data1'] ;
					}
					if( b_time > t['start'] + t['data1'] ){	//3.结束变化
						temp_sprite.opacity = t['data2'];
						t.destroy = true;
					}else if( b_time > t['start'] ){	//2.变化中
						var time = b_time - t['start'];
						temp_sprite.opacity = Math.floor(t['cur_opacity'] + t['c_opacity'] *time);
					}
				}
				
				if( t.type == "变混合模式" ){
					if( b_time > t['start'] ){		//直接变化
						temp_sprite.blendMode = t['data1'];
						t.destroy = true;
					}
				}
				
				if( t.type == "设置帧" || t.type == "设置当前帧" ){
					if( b_time > t['start'] ){		//直接变化
						temp_s_data['gif_time'] = (t['data1']-1) * temp_s_data['interval'];
						t.destroy = true;
					}
				}
				
				if( t.type == "锁定帧" ){
					if( b_time > t['start'] ){		//直接变化
						temp_s_data['gif_lock'] = true;
						t.destroy = true;
					}
				}
				
				if( t.type == "解锁帧" ){
					if( b_time > t['start'] ){		//直接变化
						temp_s_data['gif_lock'] = false;
						t.destroy = true;
					}
				}
				
				if( t.type == "正向播放一次并停留在末尾帧" ){
					if( b_time > t['start'] ){		//直接变化
						temp_s_data['gif_p_playing'] = true;
						temp_s_data['gif_p_playType'] = "forwardRun";
						temp_s_data['gif_p_curTime'] = 0;
						temp_s_data['gif_p_tarTime'] = ( temp_s_data['src_img'].length - 1 ) * temp_s_data['interval'] ;
						temp_s_data['gif_lock'] = false;
						t.destroy = true;
					}
				}
				
				if( t.type == "反向播放一次并停留在起始帧" ){
					if( b_time > t['start'] ){		//直接变化
						temp_s_data['gif_p_playing'] = true;
						temp_s_data['gif_p_playType'] = "backRun";
						temp_s_data['gif_p_curTime'] = 0;
						temp_s_data['gif_p_tarTime'] = ( temp_s_data['src_img'].length - 1 ) * temp_s_data['interval'] ;
						temp_s_data['gif_lock'] = false;
						t.destroy = true;
					}
				}
			}
		}
		
		// > 清除变化集
		for(var k = change_tank.length-1 ; k >= 0; k--){
			if( change_tank[k].destroy == true ){
				change_tank.splice(k, 1);
			}
		}
	};
};


