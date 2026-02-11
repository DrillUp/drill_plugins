//=============================================================================
// Drill_MenuTiledGif.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        主菜单 - 多层菜单平铺GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "平铺GIF-%d"
 * @Drill_LE_parentKey "---平铺GIF%d至%d---"
 * @Drill_LE_var "DrillUp.g_MTG_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_MenuTiledGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在任意菜单界面中放置一个或者多个平铺GIF。
 * ★★必须放在 面板类、控件类 插件的前面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfBallistics       数学模型-弹道核心★★v2.2及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以放置在菜单前面层或者菜单后面层。
 * 2.该插件可以装饰其他菜单插件。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-菜单界面）.docx"。
 * 关键字：
 *   (1.插件通过关键字识别菜单，并对指定菜单进行装饰。
 *      具体去看看 "17.主菜单 > 菜单关键字.docx"。
 *   (2.平铺GIF对一些自带背景的菜单插件可能不起作用，因为有些插件自己设
 *      设置了底图，会把菜单的功能覆盖掉。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 细节：
 *   (1.由于菜单界面不能执行插件指令，
 *      所以这里的平铺GIF并不能实现转场动画效果。
 * 设计：
 *   (1.平铺GIF在菜单界面中用法比较局限，
 *      但简单方块循环变化还是可以作为部分商店的背景来用的。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__layer_gif （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__layer_gif文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 平铺GIF1 资源-平铺GIF
 * 平铺GIF2 资源-平铺GIF
 * 平铺GIF3 资源-平铺GIF
 * ……
 *
 * 所有素材都放在Menu__layer_gif文件夹下。
 * 你可以在同一个菜单里面加入非常多的不同种类的平铺GIF。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制菜单平铺GIF的显示情况：
 * 
 * 插件指令：>菜单平铺GIF : 平铺GIF[2] : 显示
 * 插件指令：>菜单平铺GIF : 平铺GIF[2] : 隐藏
 * 
 * 1.数字表示平铺GIF对应配置的编号。
 * 2.平铺GIF没有默认，都是一个个贴在指定菜单中的。
 * 
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
 * 测试方法：   打开主菜单界面，进行性能测试。
 * 测试结果：   菜单界面中，gif的消耗为：【10.14ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.平铺gif会持续播放、位移、旋转，由于数量并不多，所以消耗也不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了平铺GIF的浮动效果设置。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * [v1.3]
 * 整理改进了内部结构。
 *
 *
 *
 * @param ---平铺GIF组 1至20---
 * @default
 *
 * @param 平铺GIF-1
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-2
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-3
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-4
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-5
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-6
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-7
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-8
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-9
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-10
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-11
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-12
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-13
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-14
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-15
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-16
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-17
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-18
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-19
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-20
 * @parent ---平铺GIF组 1至20---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组21至40---
 * @default
 *
 * @param 平铺GIF-21
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-22
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-23
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-24
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-25
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-26
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-27
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-28
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-29
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-30
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-31
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-32
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-33
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-34
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-35
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-36
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-37
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-38
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-39
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-40
 * @parent ---平铺GIF组21至40---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组41至60---
 * @default
 *
 * @param 平铺GIF-41
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-42
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-43
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-44
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-45
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-46
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-47
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-48
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-49
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-50
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-51
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-52
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-53
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-54
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-55
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-56
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-57
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-58
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-59
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-60
 * @parent ---平铺GIF组41至60---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组61至80---
 * @default
 *
 * @param 平铺GIF-61
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-62
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-63
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-64
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-65
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-66
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-67
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-68
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-69
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-70
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-71
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-72
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-73
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-74
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-75
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-76
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-77
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-78
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-79
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-80
 * @parent ---平铺GIF组61至80---
 * @type struct<MenuTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 */
/*~struct~MenuTiledGIF:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的菜单平铺GIF==
 *
 *
 * @param ---绑定---
 * @default 
 *
 * @param 所属菜单
 * @parent ---绑定---
 * @type select
 * @option 主菜单(Scene_Menu)
 * @value 主菜单
 * @option 道具(Scene_Item)
 * @value 道具
 * @option 技能(Scene_Skill)
 * @value 技能
 * @option 装备(Scene_Equip)
 * @value 装备
 * @option 状态(Scene_Status)
 * @value 状态
 * @option 选项(Scene_Options)
 * @value 选项
 * @option 载入(Scene_Load)
 * @value 载入
 * @option 保存(Scene_Save)
 * @value 保存
 * @option 游戏结束(Scene_GameEnd)
 * @value 游戏结束
 * @option 商店(Scene_Shop)
 * @value 商店
 * @option 输入名称(Scene_Name)
 * @value 输入名称
 * @option 测试查值(Scene_Debug)
 * @value 测试查值
 * @option 自定义(Scene_……)
 * @value 自定义
 * @desc 如果你用了插件的特殊关键字，那么要选"自定义"并填写自定义关键字。具体去看"17.主菜单 > 菜单关键字.docx"。
 * @default 主菜单
 * 
 * @param 自定义关键字
 * @parent 所属菜单
 * @desc 设置所属菜单为自定义时，将根据此关键字找到对应的菜单。具体去看看 "17.主菜单 > 菜单关键字.docx"。
 * @default 
 * 
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 初始是否显示
 * @parent ---贴图---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 * 
 * @param 初始是否锁定帧
 * @parent ---贴图---
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc true - 锁定，false - 不锁定
 * @default false
 * 
 * @param 锁定帧数
 * @parent 初始是否锁定帧
 * @type number
 * @min 1
 * @desc 该GIF在游戏初始时锁定的帧数id，对应 资源 中的序号。
 * @default 1
 *
 * @param 资源-平铺GIF
 * @parent ---贴图---
 * @desc png图片资源组，多张构成gif。
 * @default ["(需配置)菜单平铺GIF"]
 * @require 1
 * @dir img/Menu__layer_gif/
 * @type file[]
 *
 * @param 预加载类型
 * @parent ---贴图---
 * @type select
 * @option 关闭预加载
 * @value 关闭预加载
 * @option 固定预加载数量
 * @value 固定预加载数量
 * @option 全部预加载
 * @value 全部预加载
 * @desc 预加载的类型，详细去看看文档说明："1.系统 > 关于预加载.docx"。
 * @default 关闭预加载
 *
 * @param 固定预加载的数量
 * @parent 预加载类型
 * @type number
 * @min 0
 * @desc 如果你配置的GIF资源数量非常多，可以设置固定预加载数量，减少内存消耗。剩下的在播放时边播放边加载。
 * @default 35
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
 * @param 图像-色调值
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 360
 * @desc 资源图像的色调值。
 * @default 0
 *
 * @param 图像-模糊边缘
 * @parent ---贴图---
 * @type boolean
 * @on 模糊
 * @off 关闭
 * @desc 此参数为缩放设置，设置模糊后，缩放时可以模糊资源图像的边缘，防止出现像素锯齿。
 * @default false
 * 
 * @param 资源-平铺GIF遮罩
 * @parent ---贴图---
 * @desc 平铺GIF遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/Menu__layer_gif/
 * @type file
 *
 *
 * @param 平移-平铺GIF X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-平铺GIF Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 背景X速度
 * @parent ---贴图---
 * @desc 平铺GIF按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0.0
 *
 * @param 背景Y速度
 * @parent ---贴图---
 * @desc 平铺GIF按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0.0
 *
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 * 
 * @param 平铺的旋转角度
 * @parent ---贴图---
 * @desc 平铺图形的旋转角度。
 * @default 0.0
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type select
 * @option 普通
 * @value 0
 * @option 发光
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @option 叠加
 * @value 4
 * @desc pixi的渲染混合模式。0-普通,1-发光。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param 菜单层级
 * @parent ---贴图---
 * @type select
 * @option 菜单后面层
 * @value 菜单后面层
 * @option 菜单前面层
 * @value 菜单前面层
 * @desc 背景所属的菜单层级。
 * @default 菜单前面层
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 4
 * 
 * 
 * @param ---自变化效果---
 * @default 
 *
 * @param 浮动效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右浮动
 * @value 左右浮动
 * @option 上下浮动
 * @value 上下浮动
 * @option 左上右下斜向浮动
 * @value 左上右下斜向浮动
 * @option 右上左下斜向浮动
 * @value 右上左下斜向浮动
 * @desc 当前贴图，会来回浮动。
 * @default 关闭
 * 
 * @param 浮动速度
 * @parent 浮动效果
 * @desc 浮动变化的速度。
 * @default 1.0
 *
 * @param 浮动偏移量
 * @parent 浮动效果
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 15
 *
 * @param 闪烁效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前贴图，会来回闪烁。
 * @default 关闭
 * 
 * @param 闪烁速度
 * @parent 闪烁效果
 * @desc 闪烁明亮变化的速度。
 * @default 6.0
 * 
 * @param 闪烁幅度范围
 * @parent 闪烁效果
 * @type number
 * @min 1
 * @max 255
 * @desc 闪烁变化的透明度幅度范围。
 * @default 35
 *
 * @param 缩放效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右缩放
 * @value 左右缩放
 * @option 上下缩放
 * @value 上下缩放
 * @option 整体缩放
 * @value 整体缩放
 * @desc 当前贴图，会来回缩放。
 * @default 关闭
 * 
 * @param 缩放速度
 * @parent 缩放效果
 * @desc 缩放大小变化的速度。
 * @default 1.0
 * 
 * @param 缩放幅度范围
 * @parent 缩放效果
 * @desc 缩放变化的比例幅度范围。
 * @default 0.2
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MTG（Menu_TiledGIF）
//		临时全局变量	DrillUp.g_MTG_xxx
//		临时局部变量	this._drill_MTG_xxx
//		存储数据变量	$gameSystem._drill_MTG_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)
//		★性能测试因素	主菜单界面
//		★性能测试消耗	5.12ms（drill_MTG_update）
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//				->『变换特性-平铺贴图』
//					->只有显示隐藏指令
//			->☆预加载
//			->☆存储数据
//			->☆菜单层级
//			
//			->☆贴图创建标记
//			->☆贴图控制
//				->不考虑销毁情况
//			
//			->菜单平铺GIF控制器【Drill_MTG_Controller】
//			->菜单平铺GIF贴图【Drill_MTG_Sprite】
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰）（脚本）.docx
//		
//		★插件私有类：
//			* 菜单平铺GIF控制器【Drill_MTG_Controller】
//			* 菜单平铺GIF贴图【Drill_MTG_Sprite】
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@    /@@@@@@   /@@   /@@ │
//			  │  /@@__  @@  /@@__  @@ | @@  | @@ │
//			  │ | @@  \ @@ |__/  \ @@ | @@  | @@ │
//			  │ | @@  | @@   /@@@@@@/ | @@@@@@@@ │
//			  │ | @@  | @@  /@@____/  |_____  @@ │
//			  │ | @@  | @@ | @@             | @@ │
//			  │ |  @@@@@@/ | @@@@@@@@       | @@ │
//			  │  \______/  |________/       |__/ │
//			  └──────────────────────────────────┘
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
	DrillUp.g_MTG_PluginTip_curName = "Drill_MenuTiledGif.js 主菜单-多层菜单平铺GIF";
	DrillUp.g_MTG_PluginTip_baseList = ["Drill_CoreOfBallistics.js 数学模型-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_MTG_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_MTG_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_MTG_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_MTG_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_MTG_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_MTG_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_MTG_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_MTG_getPluginTip_ParamIsNaN = function( param_name, check_tank ){
		var text = "【" + DrillUp.g_MTG_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
		if( check_tank ){
			var keys = Object.keys( check_tank );
			for( var i=0; i < keys.length; i++ ){
				text += "\n" + keys[i] + "的值：" + check_tank[ keys[i] ] ;
			}
		}
		return text;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_MTG_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_MTG_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_MTG_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_MTG_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 控制器的非数字参数
	//==============================
	DrillUp.drill_MTG_getPluginTip_controllerData_NotId = function( class_name ){
		return "【" + DrillUp.g_MTG_PluginTip_curName + "】\n错误，类对象 "+class_name+" 获取到了非数字参数，数据初始化失败。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_MenuTiledGif = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MenuTiledGif');
	
	//==============================
	// * 静态数据 - 平铺GIF
	//				（~struct~MenuTiledGIF）
	//==============================
	DrillUp.drill_MTG_tiledGifInit = function( dataFrom ){
		var data = {};
		
		// > 绑定
		data['menu'] = String( dataFrom["所属菜单"] || "");
		data['menu_key'] = String( dataFrom["自定义关键字"] || "");
		
		// > P预加载GIF管理
		data['preloadType'] = String( dataFrom["预加载类型"] || "关闭预加载");
		data['preloadNum'] = Number( dataFrom["固定预加载的数量"] || 35);
		
		
		// > A主体 - 基础特性
		if( dataFrom["资源-平铺GIF"] != "" &&
			dataFrom["资源-平铺GIF"] != undefined ){
			data['src_img_gif'] = JSON.parse( dataFrom["资源-平铺GIF"] );
		}else{
			data['src_img_gif'] = [];
		}
		data['src_img_file'] = "img/Menu__layer_gif/";
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = String( dataFrom["初始是否显示"] || "false") == "true";
		data['pause'] = false;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = String( dataFrom["菜单层级"] || "菜单前面层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体 - 其它特性
		data['src_img_mask'] = String( dataFrom["资源-平铺GIF遮罩"] || "");
		
		
		// > B变换特性
		data['x'] = Number( dataFrom["平移-平铺GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-平铺GIF Y"] || 0);
		data['speedX'] = Number( dataFrom["背景X速度"] || 0);
		data['speedY'] = Number( dataFrom["背景Y速度"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['parentRotate'] = Number( dataFrom["平铺的旋转角度"] || 0.0);
		
		// > B变换特性 - 平铺的缩放与斜切
		//	（无）
		
		
		// > G自变化效果
		//		（平铺GIF 不含 摇晃效果）
		data['effect_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['effect_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['effect_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		data['effect_flicker'] = String( dataFrom["闪烁效果"] || "关闭");
		data['effect_flickerSpeed'] = Number( dataFrom["闪烁速度"] || 6.0);
		data['effect_flickerRange'] = Number( dataFrom["闪烁幅度范围"] || 20);
		data['effect_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['effect_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['effect_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		
		// > O播放GIF
		data['gif_lock'] = String( dataFrom["初始是否锁定帧"] || "false") == "true";
		data['gif_initFrame'] = Number( dataFrom["锁定帧数"] || 0);
		
		// > 控制器 初始化数据『控制器与贴图的样式-静态数据-指针初始化』
		Drill_MTG_Controller.drill_controller_initData( data );
		
		return data;
	}
	//==============================
	// * 静态数据 - 最后继承1级
	//==============================
	var _drill_MTG_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_MTG_scene_initialize.call(this);
		
		/*-----------------平铺GIF------------------*/
		for( var i = 0; i < DrillUp.g_MTG_style.length; i++ ){
			var temp = DrillUp.g_MTG_style[i];
			if( temp != undefined ){
				DrillUp.g_MTG_style[i] = DrillUp.drill_MTG_tiledGifInit( temp );
			}
		}
	}
	/*-----------------平铺GIF------------------*/
	DrillUp.g_MTG_style_length = 80;
	DrillUp.g_MTG_style = [];
	for( var i = 0; i < DrillUp.g_MTG_style_length; i++ ){
		if( DrillUp.parameters["平铺GIF-" + String(i+1) ] != undefined &&
			DrillUp.parameters["平铺GIF-" + String(i+1) ] != "" ){
			DrillUp.g_MTG_style[i] = JSON.parse(DrillUp.parameters["平铺GIF-" + String(i+1) ]);
		}else{
			DrillUp.g_MTG_style[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_MTG_getPluginTip_NeedUpdate_Ballistics() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_MTG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_MTG_pluginCommand.call(this, command, args);
	this.drill_MTG_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_MTG_pluginCommand = function( command, args ){
	if( command === ">菜单平铺GIF" ){
		
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			temp1 = temp1.replace("平铺GIF[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			var type = String(args[3]);
			if( type === "显示" ){
				$gameSystem._drill_MTG_visible[temp1] = true;
			}
			if( type === "隐藏" ){
				$gameSystem._drill_MTG_visible[temp1] = false;
			}
		}
	}
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
var _drill_MTG_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_MTG_preload_initialize.call(this);
	this.drill_MTG_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_MTG_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_MTG_preloadInit = function() {
	this._drill_MTG_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_MTG_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_MTG_style.length; i++ ){
		var temp_data = DrillUp.g_MTG_style[i];
		if( temp_data == undefined ){ continue; }
		
		// > P预加载GIF管理
		if( temp_data['preloadType'] == "全部预加载" ){
			var src_img_num = temp_data['src_img_gif'].length;
			for( var k = 0; k < src_img_num; k++ ){
				this._drill_MTG_preloadTank.push( 
					ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img_gif'][k], temp_data['tint'], temp_data['smooth'], this._drill_MTG_cacheId ) 
				);
			}
		}
		if( temp_data['preloadType'] == "固定预加载数量" ){
			var src_img_num = temp_data['preloadNum'];
			if( src_img_num >= temp_data['src_img_gif'].length ){ src_img_num = temp_data['src_img_gif'].length; }
			for( var k = 0; k < src_img_num; k++ ){
				this._drill_MTG_preloadTank.push( 
					ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img_gif'][k], temp_data['tint'], temp_data['smooth'], this._drill_MTG_cacheId ) 
				);
			}
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
DrillUp.g_MTG_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MTG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MTG_sys_initialize.call(this);
	this.drill_MTG_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MTG_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MTG_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MTG_saveEnabled == true ){	
		$gameSystem.drill_MTG_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MTG_initSysData();
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
Game_System.prototype.drill_MTG_initSysData = function() {
	this.drill_MTG_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MTG_checkSysData = function() {
	this.drill_MTG_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MTG_initSysData_Private = function() {
	
	this._drill_MTG_visible = [];				//显示控制
	for(var i = 0; i< DrillUp.g_MTG_style.length ;i++){
		var temp_data = DrillUp.g_MTG_style[i];
		if( temp_data == undefined ){ continue; }
		this._drill_MTG_visible[i] = temp_data['visible'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MTG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MTG_visible == undefined ){
		this.drill_MTG_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_MTG_style.length; i++ ){
		var temp_data = DrillUp.g_MTG_style[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_MTG_visible[i] == undefined ){
				this._drill_MTG_visible[i] = temp_data['visible'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】菜单层级 ☆菜单层级
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
Scene_MenuBase.prototype.drill_MTG_layerAddSprite = function( sprite, layer_index ){
    this.drill_MTG_layerAddSprite_Private(sprite, layer_index);
};
//##############################
// * 菜单层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从菜单层级中移除。
//##############################
Scene_MenuBase.prototype.drill_MTG_layerRemoveSprite = function( sprite ){
	this.drill_MTG_layerRemoveSprite_Private( sprite );
};
//##############################
// * 菜单层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，菜单层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_MenuBase.prototype.drill_MTG_sortByZIndex = function () {
    this.drill_MTG_sortByZIndex_Private();
};
//=============================================================================
// ** 菜单层级（接口实现）
//=============================================================================
//==============================
// * 菜单层级 - 最顶层
//==============================
var _drill_MTG_menuLayer_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MTG_menuLayer_update.call(this);
	
	if(!this._backgroundSprite ){		//菜单后面层（防止覆写报错）
		this._backgroundSprite = new Sprite();
	}
	if(!this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);	
	}
};
//==============================
// * 菜单层级 - 参数定义
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
			if( this.__drill_zIndex == undefined ){ return 20250701; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 菜单层级 - 图片层级排序（私有）
//==============================
Scene_MenuBase.prototype.drill_MTG_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单层级 - 去除贴图（私有）
//==============================
Scene_MenuBase.prototype.drill_MTG_layerRemoveSprite_Private = function( sprite ){
	this._backgroundSprite.removeChild( sprite );
	this._foregroundSprite.removeChild( sprite );
};
//==============================
// * 菜单层级 - 添加贴图到层级（私有）
//==============================
Scene_MenuBase.prototype.drill_MTG_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "菜单后面层" || layer_index === "0" || layer_index === 0 || 
		layer_index == "下层" || layer_index == "中层" || layer_index == "上层"){
		this._backgroundSprite.addChild( sprite );
	}
	if( layer_index == "菜单前面层" || layer_index === "1" || layer_index === 1 || 
		layer_index == "图片层" || layer_index == "最顶层" ){
		this._foregroundSprite.addChild( sprite );
	}
};



//=============================================================================
// ** ☆贴图创建标记
//			
//			说明：	> 此模块管理 创建标记，确保只创建一次。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图创建标记 - 初始化
//==============================
var _drill_MTG_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	
	// > 平铺GIF初始化
	SceneManager._drill_MTG_created = false;	
   	this._drill_MTG_spriteTank = [];
   	this._drill_MTG_dataTank = [];
	
	// > 原函数
	_drill_MTG_createBackground.call(this);
};
//==============================
// * 贴图创建标记 - 退出界面
//==============================
var _drill_MTG_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_MTG_terminate.call(this);
	SceneManager._drill_MTG_created = false;	//（下次进入界面需重新创建）
};
//==============================
// * 贴图创建标记 - 帧刷新
//==============================
var _drill_MTG_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MTG_update.call(this);
	
	// > 要求载入完毕后 创建
	if( SceneManager.isCurrentSceneStarted() && 
		SceneManager._drill_MTG_created != true ){
		this.drill_MTG_create();
	}
	// > 帧刷新
	if( SceneManager._drill_MTG_created == true ){
		this.drill_MTG_update();
	}
};


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的创建。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 检查位置
//==============================
Scene_MenuBase.prototype.drill_MTG_checkKeyword = function( temp_data ){
	
	/*---------------标准----------------*/
	if( SceneManager._scene.constructor.name === "Scene_Menu" && temp_data['menu'] == "主菜单" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Item" && temp_data['menu'] == "道具" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Skill" && temp_data['menu'] == "技能" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Equip" && temp_data['menu'] == "装备" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Status" && temp_data['menu'] == "状态" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Options" && temp_data['menu'] == "选项" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Load" && temp_data['menu'] == "载入" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Save" && temp_data['menu'] == "保存" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_GameEnd" && temp_data['menu'] == "游戏结束" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Shop" && temp_data['menu'] == "商店" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Name" && temp_data['menu'] == "输入名称" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Debug" && temp_data['menu'] == "测试查值" ){
		return true;
	/*---------------旧选项----------------*/
	}else if( (SceneManager._scene.constructor.name === "Scene_Party" || SceneManager._scene.constructor.name === "Scene_Drill_SMa_Formation") && temp_data['menu'] == "队形"  ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_EnemyBook" && temp_data['menu'] == "敌人图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_ItemBook" && temp_data['menu'] == "物品图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Picture_Gallery" && temp_data['menu'] == "画廊" ){
		return true;
	}else{
		/*---------------自定义----------------*/
		if( SceneManager._scene.constructor.name === temp_data['menu_key'] ){
			return true;
		}
	}
	return false;
};
//==============================
// * 贴图控制 - 创建
//==============================
Scene_MenuBase.prototype.drill_MTG_create = function() {	
	SceneManager._drill_MTG_created = true;
	
	// > 防止报错
	if( this._drill_MTG_spriteTank == undefined ){
		this._drill_MTG_spriteTank = [];
	}
	if( this._drill_MTG_controllerTank == undefined ){
		this._drill_MTG_controllerTank = [];
	}
	
	// > 配置的数据
	for( var i = 0; i < DrillUp.g_MTG_style.length; i++ ){
		var temp_data = DrillUp.g_MTG_style[i];
		if( temp_data == undefined ){ continue; }
		
		// > 配置的数据 - 检查位置
		if( this.drill_MTG_checkKeyword( temp_data ) != true ){ continue; }
		
		// > 创建控制器
		var temp_controller = new Drill_MTG_Controller( i );
		this._drill_MTG_controllerTank.push( temp_controller );
		
		// > 创建贴图
		var temp_sprite = new Drill_MTG_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 遮罩
		if( temp_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite( ImageManager.loadBitmap( temp_data['src_img_file'], temp_data['src_img_mask'], temp_data['tint'], temp_data['smooth'] ) );
			temp_sprite._drill_layerSprite.addChild(temp_mask);		//（给平铺贴图对象加遮罩）
			temp_sprite._drill_layerSprite.mask = temp_mask;		//『遮罩赋值』
		}
		
		// > 添加贴图到层级
		this._drill_MTG_spriteTank.push( temp_sprite );
		this.drill_MTG_layerAddSprite( temp_sprite, temp_data['layerIndex'] );
	}
	
	// > 配置的默认数据
	//	（无）
	
	this.drill_MTG_sortByZIndex();
}
//==============================
// * 贴图控制 - 帧刷新
//==============================
Scene_MenuBase.prototype.drill_MTG_update = function() {
	this.drill_MTG_updateController();
	this.drill_MTG_updateAttr();
}
//==============================
// * 贴图控制 - 帧刷新 控制器
//==============================
Scene_MenuBase.prototype.drill_MTG_updateController = function(){
	for(var i = 0; i < this._drill_MTG_controllerTank.length; i++ ){
		var temp_controller = this._drill_MTG_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器帧刷新
		temp_controller.drill_controller_update();
	}
}
//==============================
// * 贴图控制 - 帧刷新 基础特性
//==============================
Scene_MenuBase.prototype.drill_MTG_updateAttr = function(){
	var has_layerChange = false;
	for(var i = 0; i < this._drill_MTG_spriteTank.length; i++){
		var temp_sprite = this._drill_MTG_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 基础特性 - 菜单层级
		if( temp_sprite.layerIndex != temp_controller._drill_layerIndex ){
			temp_sprite.layerIndex =  temp_controller._drill_layerIndex;
			this.drill_MTG_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
			has_layerChange = true;
		}
		// > 基础特性 - 图片层级
		if( temp_sprite.zIndex != temp_controller._drill_zIndex ){
			temp_sprite.zIndex =  temp_controller._drill_zIndex;
			has_layerChange = true;
		}
	};
	
	// > 层级排序
	if( has_layerChange == true ){
		this.drill_MTG_sortByZIndex();
	}
}
/*
//==============================
// * 贴图控制 - 创建
//==============================
Scene_MenuBase.prototype.drill_MTG_create = function() {	
	SceneManager._drill_MTG_created = true;
	
	// > 防止报错
	if( this._drill_MTG_spriteTank == undefined ){
		this._drill_MTG_spriteTank = [];
	}
	if( this._drill_MTG_dataTank == undefined ){
		this._drill_MTG_dataTank = [];
	}
	
	// > 配置的平铺GIF
	for( var i = 0; i < DrillUp.g_MTG_style.length; i++ ){
		var temp_data = DrillUp.g_MTG_style[i];
		if( temp_data == undefined ){ continue; }
		
		if( this.drill_MTG_checkKeyword( temp_data ) ){
			
			// > 平铺GIF贴图
			var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));			//深拷贝数据（杜绝引用造成的修改）
			for(var j = 0; j < temp_sprite_data['src_img_gif'].length ; j++){
				temp_sprite_data['src_bitmaps'].push( ImageManager.loadBitmap( temp_sprite_data['src_img_file'], temp_sprite_data['src_img_gif'][j], temp_sprite_data['tint'], temp_sprite_data['smooth'] ) );
			}
			var temp_sprite = new TilingSprite();
			temp_sprite.bitmap = temp_sprite_data['src_bitmaps'][0];
			temp_sprite.move(0, 0, Graphics.width, Graphics.height);
			temp_sprite.origin.x = temp_sprite_data['x'];
			temp_sprite.origin.y = temp_sprite_data['y'];
			temp_sprite.opacity = temp_sprite_data['opacity'];
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.visible = $gameSystem._drill_MTG_visible[i] || false;
			temp_sprite['_time'] = 0;
			
			this._drill_MTG_spriteTank.push(temp_sprite);
			this._drill_MTG_dataTank.push(temp_sprite_data);
			
			// > 平铺GIF父级
			var temp_layer = new Sprite();
			temp_layer.addChild(temp_sprite);
			temp_layer.zIndex = temp_sprite_data['zIndex'];
			
			// > 平铺GIF遮罩
			if( temp_sprite_data['src_img_mask'] != "" ){
				var temp_mask = new Sprite( ImageManager.loadBitmap( temp_sprite_data['src_img_file'], temp_sprite_data['src_img_mask'], temp_sprite_data['tint'], temp_sprite_data['smooth'] ) );
				temp_layer.addChild(temp_mask);
				temp_layer.mask = temp_mask;		//『遮罩赋值』
			}
			
			this.drill_MTG_layerAddSprite( temp_layer, temp_sprite_data['layerIndex'] );
		}
	}
	this.drill_MTG_sortByZIndex();
};
//==============================
// * 贴图控制 - 帧刷新
//==============================
Scene_MenuBase.prototype.drill_MTG_update = function() {
	for(var i = 0; i < this._drill_MTG_spriteTank.length; i++ ){
		var temp_sprite = this._drill_MTG_spriteTank[i];
		var temp_data = this._drill_MTG_dataTank[i];
		temp_sprite['_time'] += 1;
		var time = temp_sprite['_time'];
		
		// > 播放gif
		var inter = time;
		inter = inter / temp_data['interval'];
		inter = inter % temp_data['src_bitmaps'].length;
		if( temp_data['back_run'] ){
			inter = temp_data['src_bitmaps'].length - 1 - inter;
		}
		inter = Math.floor(inter);
		temp_sprite.bitmap = temp_data['src_bitmaps'][inter];
		
		// > 平移
		var xx = 0;
		var yy = 0;
		xx += temp_data['x'];
		yy += temp_data['y'];
		
		// > 背景速度
		xx += time * temp_data['speedX'];
		yy += time * temp_data['speedY'];
		
		// > 浮动效果
		if( temp_data['float_enabled'] == true ){
			if( temp_data['float_mode'] == "左右浮动" ){
				xx += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
			}
			if( temp_data['float_mode'] == "上下浮动" ){
				yy += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
			}
			if( temp_data['float_mode'] == "左上右下斜向浮动" ){
				xx += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
				yy += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
			}
			if( temp_data['float_mode'] == "右上左下斜向浮动" ){
				xx -= temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
				yy += temp_data['float_range'] * Math.sin( time /temp_data['float_period']*360 /180*Math.PI );
			}
		}
		
		temp_sprite.origin.x = xx;
		temp_sprite.origin.y = yy;
	};
};
*/



//=============================================================================
// ** 菜单平铺GIF控制器【Drill_MTG_Controller】
// **		
// **		作用域：	菜单界面
// **		主功能：	定义一个专门控制菜单平铺GIF的数据类。
// **		子功能：	
// **					->控制器『控制器与贴图』
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					
// **					->A主体『界面装饰最终变换值』『变换特性的规范』
// **						->基础特性
// **							>  资源名
// **							>  显示/隐藏
// **							>  暂停/继续
// **							>  混合模式
// **							>  层级
// **							>  堆叠级
// **						->其它特性
// **					->B变换特性『变换特性-平铺贴图』
// **						>  位置X
// **						>  位置Y
// **						>  移动速度X
// **						>  移动速度Y
// **						>  缩放X
// **						>  缩放Y
// **						>  透明度
// **						>  斜切X
// **						>  斜切Y
// **						>  旋转
// **					->C校验值
// **					->D指令叠加变化
// **						> 主体贴图>移动到
// **						> 主体贴图>透明度
// **						> 平铺贴图>移动速度X
// **						> 平铺贴图>移动速度Y
// **						> 主体贴图>旋转（锚点为正中心）
// **						> 平铺贴图>缩放X
// **						> 平铺贴图>缩放Y
// **						> 主体贴图>斜切X（锚点为正中心）
// **						> 主体贴图>斜切Y（锚点为正中心）
// **					->E延迟指令
// **					->F周期指令
// **					->G自变化效果
// **						> 平铺贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>缩放效果
// **					
// **					->O播放GIF
// **						->设置帧
// **						->锁定帧/解锁帧
// **						->单次播放
// **					->P预加载GIF管理
// **					
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_MTG_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 初始化
//==============================
Drill_MTG_Controller.prototype.initialize = function( data_id ){
	this._drill_data_id = data_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『随机因子-生成一个不重复的序列号』
	//this.drill_controller_initData();										//初始化数据
	this.drill_controller_initChild();										//初始化子功能
	this.drill_controller_resetData( data_id );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_MTG_Controller.prototype.drill_controller_update = function(){
	this.drill_controller_updateDelayingCommandImportant();		//帧刷新 - E延迟指令 - 时间流逝
	this.drill_controller_updatePeriodizeCommandImportant();	//帧刷新 - F周期指令 - 时间流逝
	if( this._drill_pause == true ){ return; }
	this.drill_controller_updateAttr();							//帧刷新 - A主体
	this.drill_controller_updateChange_Position();				//帧刷新 - B变换特性 - 平移
	this.drill_controller_updateChange_MoveRange();				//帧刷新 - B变换特性 - 平铺范围
	this.drill_controller_updateCommandChange();				//帧刷新 - D指令叠加变化
	this.drill_controller_updateDelayingCommand();				//帧刷新 - E延迟指令 - 执行延迟指令
	this.drill_controller_updatePeriodizeCommand();				//帧刷新 - F周期指令 - 执行延迟指令
	this.drill_controller_updateEffect();						//帧刷新 - G自变化效果
	
	this.drill_controller_updateGIF();							//帧刷新 - O播放GIF
																//帧刷新 - P预加载GIF管理（无）
	
	this.drill_controller_updateCheckNaN();						//帧刷新 - C校验值
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data_id 数字
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//##############################
Drill_MTG_Controller.prototype.drill_controller_resetData = function( data_id ){
	this.drill_controller_resetData_Private( data_id );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_MTG_Controller.prototype.drill_controller_setVisible = function( visible ){
	this._drill_visible = visible;
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> pause 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_MTG_Controller.prototype.drill_controller_setPause = function( pause ){
	this._drill_pause = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_MTG_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_MTG_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * 控制器 - 切换混合模式【标准函数】
//
//			参数：	> blendMode 数字
//			返回：	> 无
//##############################
Drill_MTG_Controller.prototype.drill_controller_setBlendMode = function( blendMode ){
	this._drill_blendMode = blendMode;
};
//##############################
// * 控制器 - 切换菜单层级【标准函数】
//
//			参数：	> layerIndex 字符串
//			返回：	> 无
//##############################
Drill_MTG_Controller.prototype.drill_controller_setLayerIndex = function( layerIndex ){
	this._drill_layerIndex = layerIndex;
};
//##############################
// * 控制器 - 切换图片层级【标准函数】
//
//			参数：	> zIndex 数字
//			返回：	> 无
//##############################
Drill_MTG_Controller.prototype.drill_controller_setZIndex = function( zIndex ){
	this._drill_zIndex = zIndex;
};

//##############################
// * O播放GIF - 设置帧【标准函数】
//
//			参数：	> cur_frame 数字（当前帧）
//			返回：	> 无
//			
//			说明：	> 从帧数0开始计数。
//##############################
Drill_MTG_Controller.prototype.drill_controller_GIF_setFrame = function( cur_frame ){
	var data = this.drill_data();
	
	// > 设置帧
	this._drill_GIF_time = cur_frame * data['interval'];
	if( this._drill_GIF_time < 0 ){ this._drill_GIF_time = 0; }
	
	// > 刷新索引
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = Math.floor(inter);
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
};
//##############################
// * O播放GIF - 锁定帧/解锁帧【标准函数】
//
//			参数：	> locked 布尔
//			返回：	> 无
//##############################
Drill_MTG_Controller.prototype.drill_controller_GIF_setLocked = function( locked ){
	this._drill_GIF_lockEnabled = locked;
	this._drill_GIF_oncePlay = false;
};
//##############################
// * O播放GIF - 单次播放【标准函数】
//
//			参数：	> once_type 字符串（forwardRun正向播放/backRun反向播放）
//			返回：	> 无
//##############################
Drill_MTG_Controller.prototype.drill_controller_GIF_setOncePlay = function( once_type ){
	var data = this.drill_data();
	this._drill_GIF_oncePlay = true;
	this._drill_GIF_onceType = once_type;
	this._drill_GIF_time = 0;
	this._drill_GIF_onceTarTime = data['src_img_gif'].length * data['interval'];
};

//##############################
// * 控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> data 对象
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_MTG_Controller.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 接收数据 的参数）
	
	// > A主体 - 基础特性
	if( data['src_img_gif'] == undefined ){ data['src_img_gif'] = [] };								//A主体 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Menu__layer_gif/" };		//A主体 - 文件夹
	if( data['interval'] == undefined ){ data['interval'] = 4 };									//A主体 - 帧间隔
	if( data['back_run'] == undefined ){ data['back_run'] = false };								//A主体 - 是否倒放
	
	if( data['tint'] == undefined ){ data['tint'] = 0 };											//A主体 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };									//A主体 - 图像-模糊边缘
	
	if( data['visible'] == undefined ){ data['visible'] = true };									//A主体 - 显示/隐藏
	if( data['pause'] == undefined ){ data['pause'] = false };										//A主体 - 暂停/继续
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };									//A主体 - 混合模式
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "菜单后面层" };						//A主体 - 菜单层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };										//A主体 - 图片层级
	
	// > A主体 - 其它特性
	if( data['src_img_mask'] == undefined ){ data['src_img_mask'] = "" };							//A主体 - 遮罩资源
	
	
	// > B变换特性
	if( data['x'] == undefined ){ data['x'] = 0 };													//B变换特性 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };													//B变换特性 - 平移Y
	if( data['speedX'] == undefined ){ data['speedX'] = 0 };										//B变换特性 - 平铺GIFX速度
	if( data['speedY'] == undefined ){ data['speedY'] = 0 };										//B变换特性 - 平铺GIFY速度
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };									//B变换特性 - 透明度
	if( data['parentRotate'] == undefined ){ data['parentRotate'] = 0 };							//B变换特性 - 平铺的旋转角度
	
	// > B变换特性 - 平铺的缩放与斜切
	if( data['scale_x'] == undefined ){ data['scale_x'] = 1.0 };									//B变换特性 - 平铺的缩放X
	if( data['scale_y'] == undefined ){ data['scale_y'] = 1.0 };									//B变换特性 - 平铺的缩放Y
	if( data['skew_x'] == undefined ){ data['skew_x'] = 0 };										//B变换特性 - 平铺的斜切X
	if( data['skew_y'] == undefined ){ data['skew_y'] = 0 };										//B变换特性 - 平铺的斜切Y
	
	
	// > C校验值（无）
	
	// > D指令叠加变化（无）
	
	// > E延迟指令（无）
	
	// > F周期指令（无）
	
	// > G自变化效果
	if( data['effect_float'] == undefined ){ data['effect_float'] = "关闭" };						//G自变化效果 - 浮动效果
	if( data['effect_floatSpeed'] == undefined ){ data['effect_floatSpeed'] = 1.0 };				//G自变化效果 - 浮动速度
	if( data['effect_floatRange'] == undefined ){ data['effect_floatRange'] = 15 };					//G自变化效果 - 浮动偏移量
	if( data['effect_flicker'] == undefined ){ data['effect_flicker'] = "关闭" };					//G自变化效果 - 闪烁效果
	if( data['effect_flickerSpeed'] == undefined ){ data['effect_flickerSpeed'] = 6.0 };			//G自变化效果 - 闪烁速度
	if( data['effect_flickerRange'] == undefined ){ data['effect_flickerRange'] = 20 };				//G自变化效果 - 闪烁幅度范围
	if( data['effect_zoom'] == undefined ){ data['effect_zoom'] = "关闭" };							//G自变化效果 - 缩放效果
	if( data['effect_zoomSpeed'] == undefined ){ data['effect_zoomSpeed'] = 1.0 };					//G自变化效果 - 缩放速度
	if( data['effect_zoomRange'] == undefined ){ data['effect_zoomRange'] = 0.2 };					//G自变化效果 - 缩放幅度范围
	
	// > O播放GIF
	if( data['gif_lock'] == undefined ){ data['gif_lock'] = false };								//O播放GIF - 初始是否锁定帧
	if( data['gif_initFrame'] == undefined ){ data['gif_initFrame'] = 0 };							//O播放GIF - 锁定帧数
	
	// > P预加载GIF管理
	if( data['preloadType'] == undefined ){ data['preloadType'] = "关闭预加载" };					//P预加载GIF管理 - 预加载类型
	if( data['preloadNum'] == undefined ){ data['preloadNum'] = 35 };								//P预加载GIF管理 - 固定预加载的数量
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_MTG_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();				//初始化子功能 - A主体
	this.drill_controller_initChange();				//初始化子功能 - B变换特性
	this.drill_controller_initCheck();				//初始化子功能 - C校验值
	this.drill_controller_initCommandChange();		//初始化子功能 - D指令叠加变化
	this.drill_controller_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_controller_initPeriodizeCommand();	//初始化子功能 - F周期指令
	this.drill_controller_initEffect();				//初始化子功能 - G自变化效果
	
	this.drill_controller_initGIF();				//初始化子功能 - O播放GIF
	this.drill_controller_initPreload();			//初始化子功能 - P预加载GIF管理
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_MTG_Controller.prototype.drill_controller_resetData_Private = function( data_id ){
	
	// > 参数检查
	if( typeof data_id != "number" ){
		alert( DrillUp.drill_MTG_getPluginTip_controllerData_NotId("Drill_MTG_Controller") );
		throw Error( DrillUp.drill_MTG_getPluginTip_controllerData_NotId("Drill_MTG_Controller") );
		return;
	}
	
	// > 执行重置
	this._drill_data_id = data_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『随机因子-生成一个不重复的序列号』
	//this.drill_controller_initData();										//初始化数据
	this.drill_controller_initChild();										//初始化子功能
}
//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』校验标记
//##############################
DrillUp.g_MTG_notFindStyleAlertOnce = true;
//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』空的静态数据
//			
//			说明：	> 空数据会在initData时会进行默认值初始化，在其他地方只读。
//##############################
Drill_MTG_Controller.emptyData = {};
//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』获取静态数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，不要存储到存档中，也不要直接挂载到Controller身上。
//					> 静态数据会在initData时会进行默认值初始化，在其他地方只读。
//					> 【此函数不含遍历，而是直接获取值，可以放在帧刷新中使用】
//##############################
Drill_MTG_Controller.prototype.drill_data = function(){
	var cur_styleId   = this._drill_data_id +1;
	var cur_styleData = DrillUp.g_MTG_style[ this._drill_data_id ];
	if( cur_styleData == undefined ){
		
		// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（只执行一次）
		if( DrillUp.g_MTG_notFindStyleAlertOnce == true ){
			DrillUp.g_MTG_notFindStyleAlertOnce = false;
			alert( DrillUp.drill_MTG_getPluginTip_StyleNotFind(cur_styleId) );
		}
		return Drill_MTG_Controller.emptyData;
	}
	return cur_styleData;
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_MTG_Controller.prototype.drill_controller_initAttr = function(){
	var data = this.drill_data();
	
	// > A主体 - 基础特性
	this._drill_visible = false;					//控制器 - 显示/隐藏
	this._drill_pause = data['pause'];				//控制器 - 暂停/继续
	this._drill_blendMode = data['blendMode'];		//控制器 - 混合模式
	this._drill_layerIndex = data['layerIndex'];	//控制器 - 层级
	this._drill_zIndex = data['zIndex'];			//控制器 - 堆叠级
	
	// > A主体 - 其它特性
	//	（见 data['src_img_mask']）
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_MTG_Controller.prototype.drill_controller_updateAttr = function(){
	
	// > 显示/隐藏 设置
	this._drill_visible = $gameSystem._drill_MTG_visible[ this._drill_data_id ];
	
	// > 时间流逝
	this._drill_curTime += 1;
}

//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_MTG_Controller.prototype.drill_controller_initChange = function(){
	var data = this.drill_data();
	
	// > 变换值 - 锚点
	//	（无）
	
	// > 变换值 - 位置
	this._drill_change_x = data['x'];
	this._drill_change_y = data['y'];
	this._drill_change_selfXAcc = 0;					//（自累积位移）
	this._drill_change_selfYAcc = 0;					//
	this._drill_change_selfXSpeed = data['speedX'];		//（自累积移动速度）
	this._drill_change_selfYSpeed = data['speedY'];		//
	
	// > 变换值 - 缩放
	this._drill_change_scaleX = data['scale_x'];
	this._drill_change_scaleY = data['scale_y'];
	
	// > 变换值 - 透明度
	this._drill_change_opacity = data['opacity'];
	
	// > 变换值 - 斜切
	this._drill_change_skewX = data['skew_x'];
	this._drill_change_skewY = data['skew_y'];
	
	// > 变换值 - 旋转
	this._drill_change_rotate = data['parentRotate'];	//（平铺的旋转角度）
	
	
	// > 变换值 - 『平铺范围』
	var ww = Graphics.boxWidth;
	var hh = Graphics.boxHeight;
	this._drill_move_x = -1 * ww*0.5;	//（一个平移到中心的矩形）
	this._drill_move_y = -1 * hh*0.5;
	this._drill_move_w = ww;
	this._drill_move_h = hh;
	this._drill_move_originOffsetX = 0;	//（矩形大小变换时，位移修正值）
	this._drill_move_originOffsetY = 0;
}
//==============================
// * B变换特性 - 帧刷新 位置
//==============================
Drill_MTG_Controller.prototype.drill_controller_updateChange_Position = function(){
	
	// > 自累积位移
	this._drill_change_selfXAcc += this.drill_controller_finalTransform_selfXSpeed();
	this._drill_change_selfYAcc += this.drill_controller_finalTransform_selfYSpeed();
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置X（可继承，开放函数）
//##############################
Drill_MTG_Controller.prototype.drill_controller_finalTransform_x = function(){
	return this._drill_change_x + this._drill_change_selfXAcc + this._drill_move_originOffsetX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置Y（可继承，开放函数）
//##############################
Drill_MTG_Controller.prototype.drill_controller_finalTransform_y = function(){
	return this._drill_change_y + this._drill_change_selfYAcc + this._drill_move_originOffsetY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 移动速度X（可继承，开放函数）
//##############################
Drill_MTG_Controller.prototype.drill_controller_finalTransform_selfXSpeed = function(){
	return this._drill_change_selfXSpeed;
}
//##############################
// * B变换特性 - 数据最终变换值 - 移动速度Y（可继承，开放函数）
//##############################
Drill_MTG_Controller.prototype.drill_controller_finalTransform_selfYSpeed = function(){
	return this._drill_change_selfYSpeed;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放X（可继承，开放函数）
//##############################
Drill_MTG_Controller.prototype.drill_controller_finalTransform_scaleX = function(){
	return this._drill_change_scaleX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放Y（可继承，开放函数）
//##############################
Drill_MTG_Controller.prototype.drill_controller_finalTransform_scaleY = function(){
	return this._drill_change_scaleY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 透明度（可继承，开放函数）
//##############################
Drill_MTG_Controller.prototype.drill_controller_finalTransform_opacity = function(){
	return this._drill_change_opacity;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切X（可继承，开放函数）
//##############################
Drill_MTG_Controller.prototype.drill_controller_finalTransform_skewX = function(){
	return this._drill_change_skewX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切Y（可继承，开放函数）
//##############################
Drill_MTG_Controller.prototype.drill_controller_finalTransform_skewY = function(){
	return this._drill_change_skewY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 旋转（可继承，开放函数）
//##############################
Drill_MTG_Controller.prototype.drill_controller_finalTransform_rotate = function(){
	return this._drill_change_rotate;
}
//==============================
// * B变换特性 - 帧刷新 平铺范围
//==============================
Drill_MTG_Controller.prototype.drill_controller_updateChange_MoveRange = function(){
	if( this._drill_change_rotate == 0 && 
		this._drill_change_skewX == 0 && 
		this._drill_change_skewY == 0 ){ return; }
	
	// > 矩形变换后的外接矩形
	//		（这个函数用于获取 旋转+斜切 变换后的矩形高宽）
	var ww = Graphics.boxWidth;
	var hh = Graphics.boxHeight;
	var rect = $gameTemp.drill_MTG_Math2D_getRectWithTransform(
		0, 0,
		ww, hh,
		0.5, 0.5,
		this._drill_change_rotate *Math.PI/180,
		1.0,	//（变换不含缩放，所以为1.0）
		1.0,
		this._drill_change_skewX,
		this._drill_change_skewY
	);
	
	// > 高宽 - 计算外接矩形高宽
	var rww = rect.w - rect.x;
	var rhh = rect.h - rect.y;
	if( rww < ww ){ rww = ww; }
	if( rhh < hh ){ rhh = hh; }
	
	// > 高宽 - 斜切的补正
	rww *= (1 + Math.abs(this._drill_change_skewY) );
	rhh *= (1 + Math.abs(this._drill_change_skewX) );
	
	// > 高宽 - 设置矩形
	this._drill_move_x = -1 * rww*0.5;
	this._drill_move_y = -1 * rhh*0.5;
	this._drill_move_w = rww;
	this._drill_move_h = rhh;
	
	// > 高宽 - 位移修正值
	this._drill_move_originOffsetX = (rww - ww)* (-0.5);	//（矩形大小变换时，要额外加位移修正，确保旋转时不会乱转）
	this._drill_move_originOffsetY = (rhh - hh)* (-0.5);
}
//==============================
// * B变换特性 - 数学工具 - 矩形变换后的外接矩形
//			
//			参数：	> rect_x,rect_y 数字     （矩形位置）
//					> rect_w,rect_h 数字     （矩形宽高）
//					> anchor_x,anchor_y 数字 （矩形锚点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字     （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }           （变换后的坐标）
//			
//			说明：	> 矩阵边角的四个点，根据矩阵的 旋转+缩放+斜切 一并变换，然后得到四个点的外接矩形。
//==============================
Game_Temp.prototype.drill_MTG_Math2D_getRectWithTransform = function( 
					rect_x,rect_y,						//矩形位置 
					rect_w,rect_h, 						//矩形宽高 
					anchor_x,anchor_y, 					//矩形锚点 
					rotation,							//变换的值（旋转）
					scale_x, scale_y,					//变换的值（缩放）
					skew_x, skew_y  ){					//变换的值（斜切）
					
	// > 四个点
	var c_x = rect_x + rect_w*anchor_x;
	var c_y = rect_y + rect_h*anchor_y;
	var p1_x = rect_x;
	var p1_y = rect_y;
	var p2_x = rect_x + rect_w;
	var p2_y = rect_y;
	var p3_x = rect_x;
	var p3_y = rect_y + rect_h;
	var p4_x = rect_x + rect_w;
	var p4_y = rect_y + rect_h;
	
	// > 变换后的四个点
	var pp1 = $gameTemp.drill_MTG_Math2D_getPointWithTransform( p1_x,p1_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp2 = $gameTemp.drill_MTG_Math2D_getPointWithTransform( p2_x,p2_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp3 = $gameTemp.drill_MTG_Math2D_getPointWithTransform( p3_x,p3_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp4 = $gameTemp.drill_MTG_Math2D_getPointWithTransform( p4_x,p4_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	
	// > 外接矩形
	var min_x = Math.min( pp1.x, Math.min( pp2.x, Math.min( pp3.x, pp4.x )));
	var min_y = Math.min( pp1.y, Math.min( pp2.y, Math.min( pp3.y, pp4.y )));
	var max_x = Math.max( pp1.x, Math.max( pp2.x, Math.max( pp3.x, pp4.x )));
	var max_y = Math.max( pp1.y, Math.max( pp2.y, Math.max( pp3.y, pp4.y )));
	var ww = max_x - min_x;
	var hh = max_y - min_y;
	return { "x":min_x, "y":min_y, "w":ww, "h":hh };
}
//==============================
// * B变换特性 - 数学工具 - 矩阵点的变换/点A绕点B旋转缩放斜切
//			
//			参数：	> cur_x,cur_y 数字       （需要变换的点）
//					> center_x,center_y 数字 （矩形中心点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字     （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }           （变换后的坐标）
//			
//			说明：	> 矩阵内或矩阵外一个点，能够根据矩阵的 旋转+缩放+斜切 一并变换。
//					  旋转+缩放+斜切 可为负数。
//==============================
Game_Temp.prototype.drill_MTG_Math2D_getPointWithTransform = function( 
					cur_x,cur_y,						//需要变换的点 
					center_x,center_y, 					//矩形中心点 
					rotation,							//变换的值（旋转）
					scale_x, scale_y,					//变换的值（缩放）
					skew_x, skew_y  ){					//变换的值（斜切）
	
	if( scale_x == undefined ){ scale_x = 1; }
	if( scale_y == undefined ){ scale_y = 1; }
	if( skew_x == undefined ){ skew_x = 0; }
	if( skew_y == undefined ){ skew_y = 0; }
	
	// > 参数准备 （来自 Pixi.Transform）
    var _cx = 1; // cos rotation + skewY;
    var _sx = 0; // sin rotation + skewY;
    var _cy = 0; // cos rotation + Math.PI/2 - skewX;
    var _sy = 1; // sin rotation + Math.PI/2 - skewX;
	
	// > 旋转+斜切 （来自 Pixi.Transform.prototype.updateSkew）
    _cx = Math.cos( rotation + skew_y );
    _sx = Math.sin( rotation + skew_y );
    _cy = -Math.sin( rotation - skew_x ); // cos, added PI/2
    _sy = Math.cos( rotation - skew_x ); // sin, added PI/2
	
	// > 缩放 （来自 Pixi.Transform.prototype.updateLocalTransform）
    var a = _cx * scale_x;
    var b = _sx * scale_x;
    var c = _cy * scale_y;
    var d = _sy * scale_y;
	
	// > 将参数应用到坐标
	var dx = (cur_x - center_x);
	var dy = (cur_y - center_y);
    var tar_x = center_x + (dx * a + dy * c);
    var tar_y = center_y + (dx * b + dy * d);
	
	return { "x":tar_x, "y":tar_y };
}

//==============================
// * C校验值 - 初始化子功能
//==============================
Drill_MTG_Controller.prototype.drill_controller_initCheck = function(){
	//（无）
}
//==============================
// * C校验值 - 校验标记
//==============================
DrillUp.g_MTG_checkNaN = true;
//==============================
// * C校验值 - 帧刷新
//==============================
Drill_MTG_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_MTG_checkNaN == true ){
		if( isNaN( this.drill_controller_finalTransform_x() ) ){
			DrillUp.g_MTG_checkNaN = false;
			var check_tank = {};
			check_tank["_drill_change_x"] = this._drill_change_x;
			check_tank["_drill_change_selfXAcc"] = this._drill_change_selfXAcc;
			check_tank["_drill_move_originOffsetX"] = this._drill_move_originOffsetX;
			alert( DrillUp.drill_MTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_x", check_tank ) );
		}
		if( isNaN( this.drill_controller_finalTransform_y() ) ){
			DrillUp.g_MTG_checkNaN = false;
			var check_tank = {};
			check_tank["_drill_change_y"] = this._drill_change_y;
			check_tank["_drill_change_selfYAcc"] = this._drill_change_selfYAcc;
			check_tank["_drill_move_originOffsetY"] = this._drill_move_originOffsetY;
			alert( DrillUp.drill_MTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_y", check_tank ) );
		}
		if( isNaN( this.drill_controller_finalTransform_opacity() ) ){
			DrillUp.g_MTG_checkNaN = false;
			alert( DrillUp.drill_MTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_opacity" ) );
		}
		if( isNaN( this.drill_controller_finalTransform_rotate() ) ){
			DrillUp.g_MTG_checkNaN = false;
			alert( DrillUp.drill_MTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_rotate" ) );
		}
	}
}


//==============================
// * D指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_MTG_Controller.prototype.drill_controller_initCommandChange = function(){
	
	// > 控制器参数 - 移动到
	this["_drill_command_move_data"] = undefined;
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 移动速度X
	this["_drill_command_speedX_data"] = undefined;
	// > 控制器参数 - 移动速度Y
	this["_drill_command_speedY_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	
	// > 控制器参数 - 缩放X
	this["_drill_command_scaleX_data"] = undefined;
	// > 控制器参数 - 缩放Y
	this["_drill_command_scaleY_data"] = undefined;
	
	// > 控制器参数 - 斜切X
	this["_drill_command_skewX_data"] = undefined;
	// > 控制器参数 - 斜切Y
	this["_drill_command_skewY_data"] = undefined;
}
//==============================
// * D指令叠加变化 - 帧刷新
//==============================
Drill_MTG_Controller.prototype.drill_controller_updateCommandChange = function(){
	
	// > 帧刷新 - 移动到（二维弹道）
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_update( this, "_drill_command_move_data" );
	
	// > 帧刷新 - 透明度
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_opacity_data" );
	
	// > 帧刷新 - 移动速度X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_speedX_data" );
	// > 帧刷新 - 移动速度Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_speedY_data" );
	
	// > 帧刷新 - 旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_rotate_data" );
	
	// > 帧刷新 - 缩放X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_scaleX_data" );
	// > 帧刷新 - 缩放Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_scaleY_data" );
	
	// > 帧刷新 - 斜切X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_skewX_data" );
	// > 帧刷新 - 斜切Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_skewY_data" );
}
//==============================
// * D指令叠加变化 - 立即还原所有单属性
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
	// > 控制器参数 - 移动到
	//	（这里不含）
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 移动速度X
	this["_drill_command_speedX_data"] = undefined;
	// > 控制器参数 - 移动速度Y
	this["_drill_command_speedY_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	
	// > 控制器参数 - 缩放X
	this["_drill_command_scaleX_data"] = undefined;
	// > 控制器参数 - 缩放Y
	this["_drill_command_scaleY_data"] = undefined;
	
	// > 控制器参数 - 斜切X
	this["_drill_command_skewX_data"] = undefined;
	// > 控制器参数 - 斜切Y
	this["_drill_command_skewY_data"] = undefined;
}
//==============================
// * D指令叠加变化 - 立即归位
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = undefined;
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动到
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", data['x'], data['y'],		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 透明度
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动速度X
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_setSpeedX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedX_data", data['speedX'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动速度Y
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_setSpeedY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedY_data", data['speedY'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 旋转
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", data['parentRotate'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放X
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_setScaleX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleX_data", data['scale_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放Y
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_setScaleY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", data['scale_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切X
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_setSkewX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewX_data", data['skew_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切Y
//==============================
Drill_MTG_Controller.prototype.drill_controller_commandChange_setSkewY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewY_data", data['skew_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}


//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_MTG_Controller.prototype.drill_controller_initDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}
//==============================
// * E延迟指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_MTG_Controller.prototype.drill_controller_updateDelayingCommandImportant = function(){
	if( this._drill_curDelayingCommandTank.length == 0 ){ return; }
	
	// > 帧刷新 时间流逝
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		
		// > 时间-1
		dc_data['left_time'] -= 1;
		
	}
	
	// > 执行延迟指令（暂停/继续）
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			var method = dc_data['method'];
			var paramList = dc_data['paramList'];
			if( method == "drill_controller_setPause" ){
				this.drill_controller_setPause( paramList[0] );
			}
		}
	}
}
//==============================
// * E延迟指令 - 帧刷新 - 执行延迟指令
//==============================
Drill_MTG_Controller.prototype.drill_controller_updateDelayingCommand = function(){
	if( this._drill_curDelayingCommandTank.length == 0 ){ return; }
	
	// > 执行延迟指令
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			var method = dc_data['method'];
			var paramList = dc_data['paramList'];
			
			if( method == "drill_controller_setVisible" ){
				this.drill_controller_setVisible( paramList[0] );
			
			}else if( method == "drill_controller_commandChange_setOpacity" ){
				this.drill_controller_commandChange_setOpacity( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSpeedX" ){
				this.drill_controller_commandChange_setSpeedX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSpeedY" ){
				this.drill_controller_commandChange_setSpeedY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setRotate" ){
				this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
				
			}else if( method == "drill_controller_commandChange_setScaleX" ){
				this.drill_controller_commandChange_setScaleX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setScaleY" ){
				this.drill_controller_commandChange_setScaleY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSkewX" ){
				this.drill_controller_commandChange_setSkewX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSkewY" ){
				this.drill_controller_commandChange_setSkewY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_restoreAttr" ){
				this.drill_controller_commandChange_restoreAttr();
			
			}else if( method == "drill_controller_commandChange_setMove" ){
				this.drill_controller_commandChange_setMove( paramList[0], paramList[1], paramList[2], paramList[3] );
			}else if( method == "drill_controller_commandChange_restoreMove" ){
				this.drill_controller_commandChange_restoreMove();
			
			}else if( method == "drill_controller_GIF_setLocked" ){
				this.drill_controller_GIF_setLocked( paramList[0] );
			}else if( method == "drill_controller_GIF_setOncePlay" ){
				this.drill_controller_GIF_setOncePlay( paramList[0] );
			}else if( method == "drill_controller_GIF_setFrame" ){
				this.drill_controller_GIF_setFrame( paramList[0] );
			}
		}
	}
	
	// > 销毁延迟指令
	for(var i = this._drill_curDelayingCommandTank.length-1; i >= 0; i-- ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			this._drill_curDelayingCommandTank.splice( i, 1 );
		}
	}
}
//==============================
// * E延迟指令 - 设置指令（开放函数）
//==============================
Drill_MTG_Controller.prototype.drill_controller_setDelayingCommand = function( method, paramList, delay_time ){
	if( method != "drill_controller_setVisible" &&
		method != "drill_controller_setPause" &&
		
		method != "drill_controller_commandChange_setOpacity" &&
		method != "drill_controller_commandChange_setSpeedX" &&
		method != "drill_controller_commandChange_setSpeedY" &&
		method != "drill_controller_commandChange_setRotate" &&
		
		method != "drill_controller_commandChange_setScaleX" &&
		method != "drill_controller_commandChange_setScaleY" &&
		method != "drill_controller_commandChange_setSkewX" &&
		method != "drill_controller_commandChange_setSkewY" &&
		method != "drill_controller_commandChange_restoreAttr" &&
		
		method != "drill_controller_commandChange_setMove" &&
		method != "drill_controller_commandChange_restoreMove" &&
		
		method != "drill_controller_GIF_setLocked" &&
		method != "drill_controller_GIF_setOncePlay" &&
		method != "drill_controller_GIF_setFrame"
	){ return; }
	
	var dc_data = {};
	dc_data['method'] = method;
	dc_data['paramList'] = paramList;
	dc_data['left_time'] = delay_time;
	this._drill_curDelayingCommandTank.push( dc_data );
}
//==============================
// * E延迟指令 - 清空全部（开放函数）
//==============================
Drill_MTG_Controller.prototype.drill_controller_clearDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}


//==============================
// * F周期指令 - 初始化子功能
//==============================
Drill_MTG_Controller.prototype.drill_controller_initPeriodizeCommand = function(){
	this._drill_curPeriodizeCommandTank = [];
}
//==============================
// * F周期指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_MTG_Controller.prototype.drill_controller_updatePeriodizeCommandImportant = function(){
	if( this._drill_curPeriodizeCommandTank.length == 0 ){ return; }
	
	// > 帧刷新 时间流逝
	for(var i = 0; i < this._drill_curPeriodizeCommandTank.length; i++ ){
		var pc_data = this._drill_curPeriodizeCommandTank[i];
		
		// > 时间-1
		pc_data['cur_time'] += 1;
	}
	
	// > 执行周期指令（暂停/继续）
	for(var i = 0; i < this._drill_curPeriodizeCommandTank.length; i++ ){
		var pc_data = this._drill_curPeriodizeCommandTank[i];
		var time =  pc_data['cur_time'] % pc_data['time_period'];
		if( time == pc_data['time_start'] ){
			var method = pc_data['method'];
			var paramList = pc_data['paramList'];
			if( method == "drill_controller_setPause" ){
				this.drill_controller_setPause( paramList[0] );
			}
		}
	}
}
//==============================
// * F周期指令 - 帧刷新 - 执行周期指令
//==============================
Drill_MTG_Controller.prototype.drill_controller_updatePeriodizeCommand = function(){
	if( this._drill_curPeriodizeCommandTank.length == 0 ){ return; }
	
	// > 执行周期指令
	for(var i = 0; i < this._drill_curPeriodizeCommandTank.length; i++ ){
		var pc_data = this._drill_curPeriodizeCommandTank[i];
		var time =  pc_data['cur_time'] % pc_data['time_period'];
		if( time == pc_data['time_start'] ){
			var method = pc_data['method'];
			var paramList = pc_data['paramList'];
			
			if( method == "drill_controller_setVisible" ){
				this.drill_controller_setVisible( paramList[0] );
			
			}else if( method == "drill_controller_commandChange_setOpacity" ){
				this.drill_controller_commandChange_setOpacity( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSpeedX" ){
				this.drill_controller_commandChange_setSpeedX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSpeedY" ){
				this.drill_controller_commandChange_setSpeedY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setRotate" ){
				this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
				
			}else if( method == "drill_controller_commandChange_setScaleX" ){
				this.drill_controller_commandChange_setScaleX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setScaleY" ){
				this.drill_controller_commandChange_setScaleY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSkewX" ){
				this.drill_controller_commandChange_setSkewX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSkewY" ){
				this.drill_controller_commandChange_setSkewY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_restoreAttr" ){
				this.drill_controller_commandChange_restoreAttr();
			
			}else if( method == "drill_controller_commandChange_setMove" ){
				this.drill_controller_commandChange_setMove( paramList[0], paramList[1], paramList[2], paramList[3] );
			}else if( method == "drill_controller_commandChange_restoreMove" ){
				this.drill_controller_commandChange_restoreMove();
			
			}else if( method == "drill_controller_GIF_setLocked" ){
				this.drill_controller_GIF_setLocked( paramList[0] );
			}else if( method == "drill_controller_GIF_setOncePlay" ){
				this.drill_controller_GIF_setOncePlay( paramList[0] );
			}else if( method == "drill_controller_GIF_setFrame" ){
				this.drill_controller_GIF_setFrame( paramList[0] );
			}
		}
	}
	
}
//==============================
// * F周期指令 - 设置指令（开放函数）
//==============================
Drill_MTG_Controller.prototype.drill_controller_setPeriodizeCommand = function( method, paramList, time_period, time_start ){
	if( method != "drill_controller_setVisible" &&
		method != "drill_controller_setPause" &&
		
		method != "drill_controller_commandChange_setOpacity" &&
		method != "drill_controller_commandChange_setSpeedX" &&
		method != "drill_controller_commandChange_setSpeedY" &&
		method != "drill_controller_commandChange_setRotate" &&
		
		method != "drill_controller_commandChange_setScaleX" &&
		method != "drill_controller_commandChange_setScaleY" &&
		method != "drill_controller_commandChange_setSkewX" &&
		method != "drill_controller_commandChange_setSkewY" &&
		method != "drill_controller_commandChange_restoreAttr" &&
		
		method != "drill_controller_commandChange_setMove" &&
		method != "drill_controller_commandChange_restoreMove" &&
		
		method != "drill_controller_GIF_setLocked" &&
		method != "drill_controller_GIF_setOncePlay" &&
		method != "drill_controller_GIF_setFrame"
	){ return; }
	
	var pc_data = {};
	pc_data['method'] = method;
	pc_data['paramList'] = paramList;
	pc_data['time_period'] = time_period;
	pc_data['time_start'] = time_start;
	pc_data['cur_time'] = -1;			//（时间先+1后判断，所以取-1）
	this._drill_curPeriodizeCommandTank.push( pc_data );
}
//==============================
// * F周期指令 - 清空全部（开放函数）
//==============================
Drill_MTG_Controller.prototype.drill_controller_clearPeriodizeCommand = function(){
	this._drill_curPeriodizeCommandTank = [];
}


//==============================
// * G自变化效果 - 初始化子功能
//==============================
Drill_MTG_Controller.prototype.drill_controller_initEffect = function(){
	this._drill_curEffectTime = 0;
}
//==============================
// * G自变化效果 - 帧刷新
//==============================
Drill_MTG_Controller.prototype.drill_controller_updateEffect = function(){
	this._drill_curEffectTime += 1;
}


//==============================
// * O播放GIF - 初始化子功能
//==============================
Drill_MTG_Controller.prototype.drill_controller_initGIF = function(){
	var data = this.drill_data();
	
	// > 播放GIF
	this.drill_controller_GIF_setFrame( data['gif_initFrame'] -1 );		//播放GIF - 当前时间
	this._drill_GIF_index = 0;											//播放GIF - 当前索引
	this._drill_GIF_lockEnabled = data['gif_lock'];						//播放GIF - 是否锁定帧
	
	// > 单次播放
	this._drill_GIF_oncePlay = false;
	this._drill_GIF_onceType = "forwardRun";	//（forwardRun正向播放/backRun反向播放）
	this._drill_GIF_onceTarTime = 0;
}
//==============================
// * O播放GIF - 帧刷新
//==============================
Drill_MTG_Controller.prototype.drill_controller_updateGIF = function(){
	var data = this.drill_data();
	
	// > 单次播放
	if( this._drill_GIF_oncePlay == true ){
		
		// > 播放GIF
		var inter = this._drill_GIF_time;
		inter = inter / data['interval'];
		inter = Math.floor(inter);
		inter = inter % data['src_img_gif'].length;
		if( this._drill_GIF_onceType == "backRun" ){
			inter = data['src_img_gif'].length - 1 - inter;
		}
		this._drill_GIF_index = Math.floor(inter);
		
		// > 时间+1（放后面）
		this._drill_GIF_time += 1;
		
		// > 播放完毕后，锁定帧
		if( this._drill_GIF_time >= this._drill_GIF_onceTarTime ){
			this._drill_GIF_oncePlay = false;
			this.drill_controller_GIF_setLocked( true );
		}
		return;
	}
	
	
	// > 锁定帧时（注意，锁定帧时 _drill_GIF_index 不刷新）
	if( this._drill_GIF_lockEnabled == true ){ return; }
	
	// > 播放GIF
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = Math.floor(inter);
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
	
	// > 时间+1（放后面）
	this._drill_GIF_time += 1;
}

//==============================
// * P预加载GIF管理 - 初始化子功能
//==============================
Drill_MTG_Controller.prototype.drill_controller_initPreload = function(){
	//	（无）
}



//=============================================================================
// ** 菜单平铺GIF贴图【Drill_MTG_Sprite】
// **
// **		作用域：	菜单界面
// **		主功能：	定义一个平铺GIF贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					
// **					->A贴图主体
// **					->B变换特性
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **					->D指令叠加变化-控制器用
// **					->E延迟指令
// **					->F周期指令
// **					->G自变化效果
// **					
// **					->O播放GIF
// **					->P预加载GIF管理
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 控制器与贴图 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 平铺GIF贴图 - 定义
//==============================
function Drill_MTG_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_MTG_Sprite.prototype = Object.create(Sprite.prototype);
Drill_MTG_Sprite.prototype.constructor = Drill_MTG_Sprite;
//==============================
// * 平铺GIF贴图 - 初始化
//==============================
Drill_MTG_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 平铺GIF贴图 - 帧刷新
//==============================
Drill_MTG_Sprite.prototype.update = function(){
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A贴图主体
	this.drill_sprite_updateChange();				//帧刷新 - B变换特性
													//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateCommandChange();		//帧刷新 - D指令叠加变化-控制器用
													//帧刷新 - E延迟指令（无）
													//帧刷新 - F周期指令（无）
	this.drill_sprite_updateEffect();				//帧刷新 - G自变化效果
	
	this.drill_sprite_updateGIF();					//帧刷新 - O播放GIF
	this.drill_sprite_updatePreload();				//帧刷新 - P预加载GIF管理
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_MTG_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
	this._drill_curSerial = controller._drill_controllerSerial;
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_MTG_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A贴图主体
	this.drill_sprite_initChange();				//初始化子功能 - B变换特性
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initCommandChange();		//初始化子功能 - D指令叠加变化-控制器用
	this.drill_sprite_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_sprite_initPeriodizeCommand();	//初始化子功能 - F周期指令
	this.drill_sprite_initEffect();				//初始化子功能 - G自变化效果
	
	this.drill_sprite_initGIF();				//初始化子功能 - O播放GIF
	this.drill_sprite_initPreload();			//初始化子功能 - P预加载GIF管理
};

//##############################
// * 平铺GIF贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_MTG_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 平铺GIF贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_MTG_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 平铺GIF贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_MTG_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 平铺GIF贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_MTG_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 平铺GIF贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 平铺GIF贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A贴图主体
	this.visible = false;
	this.removeChild( this._drill_layerSprite );
	this._drill_layerSprite = null;
	
	// > 销毁 - B变换特性
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
	// > 销毁 - O播放GIF
	//	（无）
	
	// > 销毁 - P预加载GIF管理
	//	（无）
	
};
//==============================
// * 平铺GIF贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A贴图主体 - 初始化子功能
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller.drill_data();
	/*
		贴图的层级如下：
			- 主体贴图（this）
			- - 平铺贴图（_drill_layerSprite）
	*/
	
	// > 主体贴图
	this.x = 0;
	this.y = 0;
	this.visible = this._drill_controller._drill_visible;		//贴图 - 显示/隐藏
																//贴图 - 暂停/继续（无）
	this.blendMode = this._drill_controller._drill_blendMode;	//贴图 - 混合模式
	this.layerIndex = this._drill_controller._drill_layerIndex;	//贴图 - 层级
	this.zIndex = this._drill_controller._drill_zIndex;			//贴图 - 堆叠级
	
	// > 平铺贴图
	var temp_layer = new TilingSprite();
	temp_layer.move(0, 0, Graphics.width, Graphics.height);			//（填满游戏窗口）
	temp_layer.bitmap = this.drill_sprite_getGIFBitmapByIndex( 0 );	//（第1帧GIF）
	temp_layer.origin.x = data['x'];
	temp_layer.origin.y = data['y'];
	temp_layer.blendMode = this._drill_controller._drill_blendMode;
	this._drill_layerSprite = temp_layer;
	
	// > 平铺范围（平铺的旋转角度用）
	this._drill_spriteMove_x = 0;
	this._drill_spriteMove_y = 0;
	this._drill_spriteMove_w = Graphics.boxWidth;
	this._drill_spriteMove_h = Graphics.boxHeight;
	
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A贴图主体 - 帧刷新
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_updateAttr = function(){
	
	// > 基础特性 - 显示/隐藏
	this.visible = this._drill_controller._drill_visible;
	
	// > 基础特性 - 暂停/继续
	//	（无）
	
	// > 基础特性 - 混合模式
	if( this.blendMode != this._drill_controller._drill_blendMode ){
		this.blendMode =  this._drill_controller._drill_blendMode;
		this._drill_layerSprite.blendMode = this._drill_controller._drill_blendMode;
	}
	
	//（其它 基础特性 的帧刷新赋值见：drill_MTG_updateAttr）
}


//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_initChange = function(){
	//（无）
}
//==============================
// * B变换特性 - 帧刷新
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_updateChange = function(){
	
	// > 贴图 - 锚点
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	// > 贴图 - 位置
	this.x = Graphics.boxWidth  *0.5;
	this.y = Graphics.boxHeight *0.5;
	
	// > 贴图 - 位置（平铺贴图）
	var xx = this._drill_controller.drill_controller_finalTransform_x();
	var yy = this._drill_controller.drill_controller_finalTransform_y();
	this._drill_layerSprite.origin.x = xx;
	this._drill_layerSprite.origin.y = yy;
	
	// > 贴图 - 缩放
	//	（无）
	
	// > 贴图 - 缩放（平铺贴图）
	this._drill_layerSprite.tileTransform.scale.x = this._drill_controller.drill_controller_finalTransform_scaleX();
	this._drill_layerSprite.tileTransform.scale.y = this._drill_controller.drill_controller_finalTransform_scaleY();
	
	// > 贴图 - 透明度
	this.opacity = this._drill_controller.drill_controller_finalTransform_opacity();
	
	// > 贴图 - 斜切
	this.skew.x  = this._drill_controller.drill_controller_finalTransform_skewX();
	this.skew.y  = this._drill_controller.drill_controller_finalTransform_skewY();
	
	// > 贴图 - 旋转
	this.rotation = this._drill_controller.drill_controller_finalTransform_rotate() *Math.PI/180;
	
	
	// > 贴图 - 平铺范围（平铺贴图）（旋转+斜切 的影响，影响矩形大小）
	if( this._drill_spriteMove_x != this._drill_controller._drill_move_x ||
		this._drill_spriteMove_y != this._drill_controller._drill_move_y ||
		this._drill_spriteMove_w != this._drill_controller._drill_move_w ||
		this._drill_spriteMove_h != this._drill_controller._drill_move_h ){
		this._drill_spriteMove_x = this._drill_controller._drill_move_x;
		this._drill_spriteMove_y = this._drill_controller._drill_move_y;
		this._drill_spriteMove_w = this._drill_controller._drill_move_w;
		this._drill_spriteMove_h = this._drill_controller._drill_move_h;
		
		this._drill_layerSprite.move(
			this._drill_spriteMove_x,
			this._drill_spriteMove_y,
			this._drill_spriteMove_w,
			this._drill_spriteMove_h
		);
	}
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * D指令叠加变化-控制器用 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 贴图部分。
//					> 之所以把代码放这里，是因为 控制器-贴图 一对一，且可以节约弹道计算的存储空间。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_initCommandChange = function(){
	
	// > 贴图参数 - 移动到
	this["_drill_command_move_spriteData"] = undefined;
	
	// > 贴图参数 - 透明度
	this["_drill_command_opacity_spriteData"] = undefined;
	
	// > 贴图参数 - 移动速度X
	this["_drill_command_speedX_spriteData"] = undefined;
	// > 贴图参数 - 移动速度Y
	this["_drill_command_speedY_spriteData"] = undefined;
	
	// > 贴图参数 - 旋转
	this["_drill_command_rotate_spriteData"] = undefined;
	
	// > 贴图参数 - 缩放X
	this["_drill_command_scaleX_spriteData"] = undefined;
	// > 贴图参数 - 缩放Y
	this["_drill_command_scaleY_spriteData"] = undefined;
	
	// > 贴图参数 - 斜切X
	this["_drill_command_skewX_spriteData"] = undefined;
	// > 贴图参数 - 斜切Y
	this["_drill_command_skewY_spriteData"] = undefined;
}
//==============================
// * D指令叠加变化-控制器用 - 帧刷新
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_updateCommandChange = function(){
	var data = this._drill_controller.drill_data();
	var controller = this._drill_controller;
	
	// > 移动到 - 帧刷新
	var CDataName = "_drill_command_move_data";
	var SDataName = "_drill_command_move_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动到 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_x = controller[CDataName]['cur_valueA'];
		controller._drill_change_y = controller[CDataName]['cur_valueB'];
	}else{
		controller._drill_change_x = data['x'];	//（没有数据时，赋值为 初始值）
		controller._drill_change_y = data['y'];
	}
	
	
	// > 透明度 - 帧刷新
	var CDataName = "_drill_command_opacity_data";
	var SDataName = "_drill_command_opacity_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 透明度 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_opacity = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_opacity = data['opacity'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 移动速度X - 帧刷新
	var CDataName = "_drill_command_speedX_data";
	var SDataName = "_drill_command_speedX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动速度X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_selfXSpeed = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_selfXSpeed = data['speedX'];	//（没有数据时，赋值为 初始值）
	}
	
	// > 移动速度Y - 帧刷新
	var CDataName = "_drill_command_speedY_data";
	var SDataName = "_drill_command_speedY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动速度Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_selfYSpeed = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_selfYSpeed = data['speedY'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 旋转 - 帧刷新
	var CDataName = "_drill_command_rotate_data";
	var SDataName = "_drill_command_rotate_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 旋转 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_rotate = controller[CDataName]['cur_value'];	//（平铺的旋转角度）
	}else{
		controller._drill_change_rotate = data['parentRotate'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 缩放X - 帧刷新
	var CDataName = "_drill_command_scaleX_data";
	var SDataName = "_drill_command_scaleX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_scaleX = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_scaleX = data['scale_x'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 缩放Y - 帧刷新
	var CDataName = "_drill_command_scaleY_data";
	var SDataName = "_drill_command_scaleY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_scaleY = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_scaleY = data['scale_y'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 斜切X - 帧刷新
	var CDataName = "_drill_command_skewX_data";
	var SDataName = "_drill_command_skewX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 斜切X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_skewX = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_skewX = data['skew_x'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 斜切Y - 帧刷新
	var CDataName = "_drill_command_skewY_data";
	var SDataName = "_drill_command_skewY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 斜切Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_skewY = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_skewY = data['skew_y'];	//（没有数据时，赋值为 初始值）
	}
}


//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_initDelayingCommand = function(){
	//（无）
}

//==============================
// * F周期指令 - 初始化子功能
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_initPeriodizeCommand = function(){
	//（无）
}


//==============================
// * G自变化效果 - 初始化子功能
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_initEffect = function(){
	//（无）
}
//==============================
// * G自变化效果 - 帧刷新
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_updateEffect = function(){
	var data = this._drill_controller.drill_data();
	var cur_time = this._drill_controller._drill_curEffectTime;
	
	// > 浮动效果
	if( data['effect_float'] == "左右浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.x += value;
	}
	if( data['effect_float'] == "上下浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.y += value;
	}
	if( data['effect_float'] == "左上右下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.x += value;
		this._drill_layerSprite.origin.y += value;
	}
	if( data['effect_float'] == "右上左下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.x -= value;
		this._drill_layerSprite.origin.y += value;
	}
	// > 闪烁效果
	if( data['effect_flicker'] == "开启" ){
		var speed = data['effect_flickerSpeed'];
		var range = data['effect_flickerRange'];
		this.opacity += range * Math.sin( cur_time * speed /180*Math.PI );
	}
	// > 缩放效果
	if( data['effect_zoom'] == "左右缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.scale.x += value;
	}
	if( data['effect_zoom'] == "上下缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.scale.y += value;
	}
	if( data['effect_zoom'] == "整体缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.scale.x += value;
		this.scale.y += value;
	}
}


//==============================
// * O播放GIF - 初始化子功能
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_initGIF = function(){
	//	（无）
}
//==============================
// * O播放GIF - 帧刷新
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_updateGIF = function(){
	if( this.visible != true ){ return; }	//（显示时才帧刷新）
	
	// > 平铺贴图 - 第N帧GIF
	this._drill_layerSprite.bitmap = this.drill_sprite_getGIFBitmapByIndex( this._drill_controller._drill_GIF_index );
}
//==============================
// * O播放GIF - 获取资源bitmap
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_getGIFBitmapByIndex = function( index ){
	
	// > 缓存容器 - 创建
	//		（不管有没有预加载，loadBitmap后，都要有一个容器接住，不然bitmap会被清理，导致闪）
	if( this._drill_GIF_bitmapTank == undefined ){
		this._drill_GIF_bitmapTank = [];
	}
	// > 缓存容器 - 返回缓存的资源
	if( this._drill_GIF_bitmapTank[ index ] != undefined ){
		return this._drill_GIF_bitmapTank[ index ];
	}
	
	// > 载入资源
	var data = this._drill_controller.drill_data();
	var bitmap_filename = data['src_img_gif'][ index ];
	if( bitmap_filename == undefined ){ bitmap_filename = ""; }
	var bitmap = ImageManager.loadBitmap( data['src_img_file'], bitmap_filename, data['tint'], data['smooth'] );
	
	// > 缓存容器 - 记录资源
	this._drill_GIF_bitmapTank[ index ] = bitmap;
	
	return bitmap;
}

//==============================
// * P预加载GIF管理 - 初始化子功能
//
//			说明：	> 该功能在贴图内，已经不是预加载，而是边播放边加载。
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_initPreload = function(){
	this._drill_load_curTime = 0;			//当前加载时间
}
//==============================
// * P预加载GIF管理 - 帧刷新
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_updatePreload = function(){
	if( this.visible != true ){ return; }	//（显示时才帧刷新）
	var data = this._drill_controller.drill_data();
	
	// > 时间+1
	this._drill_load_curTime += 1;
	
	// > 加载控制
	if( data['preloadType'] == "固定预加载数量" ){
		var index = this._drill_load_curTime + data['preloadNum'] -1 ;
		if( index < data['src_img_gif'].length ){
			this.drill_sprite_getGIFBitmapByIndex( index );	//（只要在适当的时机去激活 获取资源bitmap 即可）
			//alert( index );
		}
	}
	
	
	// > 测试 - 加载情况1
	//		（第1帧时间，加载开始时，预加载的已经有了，接下来每帧加载剩下的，这时true的数量为 固定预加载的数量 ）
	//if( this._drill_load_curTime == 1 ){
	//	var isReady_tank = this.drill_sprite_getReadyTank_ForDebug();
	//	var isReady_text = "第1帧：" + String( isReady_tank.length ) + "\n" + isReady_tank.join(",");
	//	alert( isReady_text );
	//}
	
	// > 测试 - 加载情况2
	//		（第6帧时间，已经开始加载6个，会比 情况1 多0~6个true）
	//		（注意，alert弹出时也在加载，两种情况要分别注释来测试）
	//if( this._drill_load_curTime == 6 ){
	//	var isReady_tank = this.drill_sprite_getReadyTank_ForDebug();
	//	var isReady_text = "第6帧：" + String( isReady_tank.length ) + "\n" + isReady_tank.join(",");
	//	alert( isReady_text );
	//}
}
//==============================
// * P预加载GIF管理 - 获取加载情况列表（私有）
//
//			说明：	> 该函数用于 测试 加载情况。
//					> 注意，该函数执行一次后，所有资源就开始加载了。
//==============================
Drill_MTG_Sprite.prototype.drill_sprite_getReadyTank_ForDebug = function(){
	var data = this._drill_controller.drill_data();
	var isReady_tank = [];
	for( var i = 0; i < data['src_img_gif'].length; i++ ){
		var bitmap = this.drill_sprite_getGIFBitmapByIndex(i);
		isReady_tank.push( bitmap.isReady() );
	}
	return isReady_tank;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MenuTiledGif = false;
		var pluginTip = DrillUp.drill_MTG_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


