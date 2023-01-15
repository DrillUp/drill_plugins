//=============================================================================
// Drill_MenuParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        主菜单 - 多层菜单粒子
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子-%d"
 * @Drill_LE_parentKey "---粒子组%d至%d---"
 * @Drill_LE_var "DrillUp.g_MPa_list_length"
 *
 * @help
 * =============================================================================
 * +++ Drill_MenuParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在任意菜单界面中放置一种或者多种粒子。
 * ★★必须放在 面板类、控件类 插件的前面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以放置在菜单前面层或者菜单后面层。
 * 2.该插件可以装饰其他菜单插件。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 * 关键字：
 *   (1.插件通过关键字识别菜单，并对指定菜单进行装饰。
 *      具体去看看 "17.主菜单 > 菜单关键字.docx"。
 *   (2.粒子对一些自带背景的菜单插件可能不起作用，因为有些插件自己
 *      设置了底图，会把菜单的功能覆盖掉。
 * 默认粒子：
 *   (1.默认粒子作用于所有菜单界面。
 *      如果菜单界面没有配置任何粒子，那么将自动使用默认粒子。
 *   (2.默认粒子也可以控制隐藏。
 * 设计：
 *   (1.你可以在同一个菜单里面加入非常多的粒子。
 *      结合 粒子移动/GIF遮罩 制作出不同的动态效果。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__layer （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-默认粒子
 *
 * 背景1 资源-粒子
 * 背景2 资源-粒子
 * 背景3 资源-粒子
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制菜单粒子的显示情况：
 * 
 * 插件指令：>菜单粒子 : 粒子[3] : 显示
 * 插件指令：>菜单粒子 : 粒子[4] : 隐藏
 * 
 * 插件指令：>菜单粒子 : 默认粒子 : 显示
 * 插件指令：>菜单粒子 : 默认粒子 : 隐藏
 * 插件指令：>菜单粒子 : 默认粒子 : 复制样式 : 粒子[3]
 * 插件指令：>菜单粒子 : 默认粒子 : 还原样式
 * 
 * 1.默认粒子作用于所有菜单界面。
 *   你可以修改默认粒子的样式与复制的粒子一样。
 * 2.如果你想制作同一个菜单，有不同的风格，可以先配置两种不同风格的
 *   粒子，然后使用显示/隐藏粒子指令来进行风格切换。
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
 * 测试方法：   打开主菜单界面，进行性能测试。
 * 测试结果：   菜单界面中，粒子的消耗为：【12.74ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于一次性设定数十个粒子移动，每个粒子都是独立的贴图。消耗是有的，
 *   但实际并不会太多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得你可以通过插件指令控制菜单粒子的显示。
 * [v1.2]
 * 规范了插件指令设置。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 优化了内部结构，修改了插件指令格式。
 * 添加了粒子遮罩功能。
 * [v1.5]
 * 优化了内部结构。旋转速度单位改为 角度/帧。
 * 修复了部分粒子和默认粒子在面板中不显示的bug。
 * [v1.6]
 * 加强了粒子效果的配置，包括添加双层粒子效果。
 * [v1.7]
 * 优化了旧存档的识别与兼容。
 *
 *
 *
 * @param 默认粒子
 * @type struct<MenuParticleDefault>
 * @desc 默认粒子的配置信息。
 * @default {"---贴图---":"","初始是否显示":"true","资源-粒子":"粒子-默认粒子","资源-粒子遮罩":"","透明度":"255","混合模式":"0","图片层级":"8","---粒子效果---":"","粒子数量":"10","粒子生命周期":"240","粒子自旋转速度":"0.1","粒子出现模式":"随机出现","粒子固定点 X":"0","粒子固定点 Y":"0","粒子固定点范围":"120","粒子方向模式":"四周扩散(随机)","粒子固定方向":"90.0","粒子扇形朝向":"45.0","粒子扇形角度":"30.0","粒子速度模式":"只初速度","粒子初速度":"0.5","粒子速度随机波动量":"2.0","粒子透明度模式":"先显现后消失(慢速)","粒子缩放模式":"固定缩放值","粒子缩放值":"1.0","粒子缩放随机波动量":"0.2","---双层效果---":"","是否开启双层效果":"false","资源-第二层粒子":"粒子-默认粒子","第二层粒子菜单层级":"0","第二层粒子图片层级":"7"}
 *
 * @param ---粒子组 1至20---
 * @default
 *
 * @param 粒子-1
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-2
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-3
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-4
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-5
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-6
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-7
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-8
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-9
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-10
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-11
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-12
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-13
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-14
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-15
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-16
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-17
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-18
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-19
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-20
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组21至40---
 * @default
 *
 * @param 粒子-21
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-22
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-23
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-24
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-25
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-26
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-27
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-28
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-29
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-30
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-31
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-32
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-33
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-34
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-35
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-36
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-37
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-38
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-39
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-40
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组41至60---
 * @default
 *
 * @param 粒子-41
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-42
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-43
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-44
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-45
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-46
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-47
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-48
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-49
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-50
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-51
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-52
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-53
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-54
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-55
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-56
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-57
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-58
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-59
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-60
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组61至80---
 * @default
 *
 * @param 粒子-61
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-62
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-63
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-64
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-65
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-66
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-67
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-68
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-69
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-70
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-71
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-72
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-73
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-74
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-75
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-76
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-77
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-78
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-79
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-80
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 */
/*~struct~MenuParticle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的菜单粒子==
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
 * @param 资源-粒子
 * @parent ---贴图---
 * @desc 粒子的图片资源。
 * @default (需配置)菜单粒子
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 * 
 * @param 资源-粒子遮罩
 * @parent ---贴图---
 * @desc 粒子遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param 菜单层级
 * @parent ---贴图---
 * @type select
 * @option 菜单后面层
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 粒子所属的菜单层级。
 * @default 0
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 8
 *
 * @param ---粒子效果---
 * @desc 
 *
 * @param 粒子数量
 * @parent ---粒子效果---
 * @type number
 * @min 1
 * @desc 界面中的粒子数量。
 * @default 10
 *
 * @param 粒子生命周期
 * @parent ---粒子效果---
 * @type number
 * @min 5
 * @desc 一个粒子从显现到消失的周期时长，单位帧。(1秒60帧)
 * @default 180
 *
 * @param 粒子自旋转速度
 * @parent ---粒子效果---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 0.5
 *
 * @param 粒子出现模式
 * @parent ---粒子效果---
 * @type select
 * @option 随机出现
 * @value 随机出现
 * @option 左侧出现
 * @value 左侧出现
 * @option 右侧出现
 * @value 右侧出现
 * @option 顶部出现
 * @value 顶部出现
 * @option 底部出现
 * @value 底部出现
 * @option 固定点范围出现
 * @value 固定点范围出现
 * @desc 随机出现指整个游戏窗口，左右顶底对应游戏窗口长方形的四个边的区域。
 * @default 随机出现
 *
 * @param 粒子固定点 X
 * @parent 粒子出现模式
 * @desc 选择"固定点范围出现"时，粒子出现的点位置。x轴方向平移，单位像素。0为贴在窗口最左边。
 * @default 0
 *
 * @param 粒子固定点 Y
 * @parent 粒子出现模式
 * @desc 选择"固定点范围出现"时，粒子出现的点位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 粒子固定点范围
 * @parent 粒子出现模式
 * @type number
 * @min 0
 * @desc 选择"固定点范围出现"时，以该点为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。
 * @default 120
 *
 * @param 粒子方向模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @option 方向聚焦于粒子固定点
 * @value 方向聚焦于粒子固定点
 * @desc 粒子出现后，朝向的方向模式设置。
 * @default 四周扩散(随机)
 *
 * @param 粒子固定方向
 * @parent 粒子方向模式
 * @desc 方向模式为"固定方向"时，碎片固定方向的角度值。0朝右，90朝下，180朝左，270朝上。
 * @default 90.0
 * 
 * @param 粒子扇形朝向
 * @parent 粒子方向模式
 * @desc 方向模式为"扇形范围方向"时，扇形的朝向角度。0朝右，90朝下，180朝左，270朝上。
 * @default 45.0
 * 
 * @param 粒子扇形角度
 * @parent 粒子方向模式
 * @desc 方向模式为"扇形范围方向"时，扇形弧的角度数。
 * @default 30.0
 *
 * @param 粒子速度模式
 * @parent ---粒子效果---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @desc 粒子出现后，移动速度的模式设置。
 * @default 只初速度
 * 
 * @param 粒子初速度
 * @parent 粒子速度模式
 * @desc 粒子的基本速度，单位 像素/帧。
 * @default 0.5
 * 
 * @param 粒子速度随机波动量
 * @parent 粒子速度模式
 * @desc 粒子速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 *
 * @param 粒子透明度模式
 * @parent ---粒子效果---
 * @type select
 * @option 逐渐消失
 * @value 逐渐消失
 * @option 先显现后消失(慢速)
 * @value 先显现后消失(慢速)
 * @option 先显现后消失
 * @value 先显现后消失
 * @option 先显现后消失(快速)
 * @value 先显现后消失(快速)
 * @option 保持原透明度
 * @value 保持原透明度
 * @option 一闪一闪
 * @value 一闪一闪
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 先显现后消失
 *
 * @param 粒子缩放模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定缩放值
 * @value 固定缩放值
 * @option 缩放值+波动量
 * @value 缩放值+波动量
 * @desc 粒子出现后，缩放的模式设置。
 * @default 固定缩放值
 * 
 * @param 粒子缩放值
 * @parent 粒子缩放模式
 * @desc 粒子的缩放大小，1.0 表示 100%。
 * @default 1.0
 * 
 * @param 粒子缩放随机波动量
 * @parent 粒子缩放模式
 * @desc 粒子缩放上下随机浮动的量。比如值为 0.2，则随机浮动范围为 -0.1 ~ 0.1 之间。
 * @default 0.2
 * 
 * 
 * @param ---双层效果---
 * @default 
 *
 * @param 是否开启双层效果
 * @parent ---双层效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 *
 * @param 资源-第二层粒子
 * @parent ---双层效果---
 * @desc 第二层粒子的图片资源。
 * @default (需配置)菜单第二层粒子
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 第二层粒子菜单层级
 * @parent ---双层效果---
 * @type select
 * @option 菜单后面层
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 第二层粒子所属的菜单层级。
 * @default 0
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 7
 * 
 *
 */
/*~struct~MenuParticleDefault:
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
 * @param 资源-粒子
 * @parent ---贴图---
 * @desc 粒子的图片资源。
 * @default (需配置)菜单粒子
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 * 
 * @param 资源-粒子遮罩
 * @parent ---贴图---
 * @desc 粒子遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 8
 *
 * @param ---粒子效果---
 * @desc 
 *
 * @param 粒子数量
 * @parent ---粒子效果---
 * @type number
 * @min 1
 * @desc 界面中的粒子数量。
 * @default 10
 *
 * @param 粒子生命周期
 * @parent ---粒子效果---
 * @type number
 * @min 5
 * @desc 一个粒子从显现到消失的周期时长，单位帧。(1秒60帧)
 * @default 180
 *
 * @param 粒子自旋转速度
 * @parent ---粒子效果---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 0.5
 *
 * @param 粒子出现模式
 * @parent ---粒子效果---
 * @type select
 * @option 随机出现
 * @value 随机出现
 * @option 左侧出现
 * @value 左侧出现
 * @option 右侧出现
 * @value 右侧出现
 * @option 顶部出现
 * @value 顶部出现
 * @option 底部出现
 * @value 底部出现
 * @option 固定点范围出现
 * @value 固定点范围出现
 * @desc 随机出现指整个游戏窗口，左右顶底对应游戏窗口长方形的四个边的区域。
 * @default 随机出现
 *
 * @param 粒子固定点 X
 * @parent 粒子出现模式
 * @desc 选择"固定点范围出现"时，粒子出现的点位置。x轴方向平移，单位像素。0为贴在窗口最左边。
 * @default 0
 *
 * @param 粒子固定点 Y
 * @parent 粒子出现模式
 * @desc 选择"固定点范围出现"时，粒子出现的点位置。y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 粒子固定点范围
 * @parent 粒子出现模式
 * @type number
 * @min 0
 * @desc 选择"固定点范围出现"时，以该点为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。
 * @default 120
 *
 * @param 粒子方向模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @option 方向聚焦于粒子固定点
 * @value 方向聚焦于粒子固定点
 * @desc 粒子出现后，朝向的方向模式设置。
 * @default 四周扩散(随机)
 *
 * @param 粒子固定方向
 * @parent 粒子方向模式
 * @desc 方向模式为"固定方向"时，碎片固定方向的角度值。0朝右，90朝下，180朝左，270朝上。
 * @default 90.0
 * 
 * @param 粒子扇形朝向
 * @parent 粒子方向模式
 * @desc 方向模式为"扇形范围方向"时，扇形的朝向角度。0朝右，90朝下，180朝左，270朝上。
 * @default 45.0
 * 
 * @param 粒子扇形角度
 * @parent 粒子方向模式
 * @desc 方向模式为"扇形范围方向"时，扇形弧的角度数。
 * @default 30.0
 *
 * @param 粒子速度模式
 * @parent ---粒子效果---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @desc 粒子出现后，移动速度的模式设置。
 * @default 只初速度
 * 
 * @param 粒子初速度
 * @parent 粒子速度模式
 * @desc 粒子的基本速度，单位 像素/帧。
 * @default 0.5
 * 
 * @param 粒子速度随机波动量
 * @parent 粒子速度模式
 * @desc 粒子速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 *
 * @param 粒子透明度模式
 * @parent ---粒子效果---
 * @type select
 * @option 逐渐消失
 * @value 逐渐消失
 * @option 先显现后消失(慢速)
 * @value 先显现后消失(慢速)
 * @option 先显现后消失
 * @value 先显现后消失
 * @option 先显现后消失(快速)
 * @value 先显现后消失(快速)
 * @option 保持原透明度
 * @value 保持原透明度
 * @option 一闪一闪
 * @value 一闪一闪
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 先显现后消失
 *
 * @param 粒子缩放模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定缩放值
 * @value 固定缩放值
 * @option 缩放值+波动量
 * @value 缩放值+波动量
 * @desc 粒子出现后，缩放的模式设置。
 * @default 固定缩放值
 * 
 * @param 粒子缩放值
 * @parent 粒子缩放模式
 * @desc 粒子的缩放大小，1.0 表示 100%。
 * @default 1.0
 * 
 * @param 粒子缩放随机波动量
 * @parent 粒子缩放模式
 * @desc 粒子缩放上下随机浮动的量。比如值为 0.2，则随机浮动范围为 -0.1 ~ 0.1 之间。
 * @default 0.2
 * 
 * 
 * @param ---双层效果---
 * @default 
 *
 * @param 是否开启双层效果
 * @parent ---双层效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 *
 * @param 资源-第二层粒子
 * @parent ---双层效果---
 * @desc 第二层粒子的图片资源。
 * @default (需配置)菜单第二层粒子
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 第二层粒子菜单层级
 * @parent ---双层效果---
 * @type select
 * @option 菜单后面层
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 第二层粒子所属的菜单层级。
 * @default 0
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 7
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MPa（Menu_Particle）
//		临时全局变量	DrillUp.g_MPa_xxx
//		临时局部变量	this._drill_MPa_xxx
//		存储数据变量	$gameSystem._drill_MPa_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)
//		★性能测试因素	主菜单界面
//		★性能测试消耗	6.43ms 11.77ms 12.74ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			菜单粒子：
//				->基本属性
//					->显示/隐藏
//					->透明度
//					->菜单层级
//					->遮罩
//				->粒子效果
//					->数量
//					->生命周期
//					->自旋转
//					->出现模式
//						->固定点
//					->方向模式
//					->速度模式
//					->透明度模式
//						->时间锚点公式
//						->一闪一闪
//					->缩放模式
//				->双层效果
//
//		★必要注意事项：
//			1.该插件不依赖弹道核心，因为部分公式直接写在插件的代码里了。
//
//		★其它说明细节：
//			1.插件结构比背景复杂，多一个数组的量级，需要理清楚下面变量的关系：
//				DrillUp.g_MPa_list				获取的值（80个）
//				this._drill_MPa_dataTank			符合的值（小于80个，不要将数组二者混合使用）
//				this._drill_MPa_spriteTankOrg				符合的图片（小于80个）
//				DrillUp.g_MPa_list[i]['par_count']	粒子数量（直接遍历塞进符合图片中）
//				temp_sprite			临时图片
//				temp_sprite_data	临时的值
//			
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuParticle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MenuParticle');
	
	//==============================
	// * 变量获取 - 默认粒子
	//				（~struct~MenuParticleDefault）
	//==============================
	DrillUp.drill_MPa_particleDefaultInit = function( dataFrom ) {
		var data = {};
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_mask'] = String( dataFrom["资源-粒子遮罩"] || "");
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		//data['menu_index'] = Number( dataFrom["菜单层级"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 0);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_selfRotate'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		data['par_birthMode'] = String( dataFrom["粒子出现模式"] || "随机出现");
		data['par_birthX'] = Number( dataFrom["粒子固定点 X"] || 0);
		data['par_birthY'] = Number( dataFrom["粒子固定点 Y"] || 0);
		data['par_birthRange'] = Number( dataFrom["粒子固定点范围"] || 120);
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_menuIndex'] = Number( dataFrom["第二层粒子菜单层级"] || 0);
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 7);
		
		return data;
	}
	//==============================
	// * 变量获取 - 粒子
	//				（~struct~MenuParticle）
	//==============================
	DrillUp.drill_MPa_particleInit = function( dataFrom ) {
		var data = {};
		
		// > 绑定
		data['menu'] = String( dataFrom["所属菜单"] || "");
		data['menu_key'] = String( dataFrom["自定义关键字"] || "");
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_mask'] = String( dataFrom["资源-粒子遮罩"] || "");
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['menu_index'] = Number( dataFrom["菜单层级"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 0);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_selfRotate'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		data['par_birthMode'] = String( dataFrom["粒子出现模式"] || "随机出现");
		data['par_birthX'] = Number( dataFrom["粒子固定点 X"] || 0);
		data['par_birthY'] = Number( dataFrom["粒子固定点 Y"] || 0);
		data['par_birthRange'] = Number( dataFrom["粒子固定点范围"] || 120);
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_menuIndex'] = Number( dataFrom["第二层粒子菜单层级"] || 0);
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 7);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	if( DrillUp.parameters["默认粒子"] != undefined && 
		DrillUp.parameters["默认粒子"] != "" ){
		var temp = JSON.parse(DrillUp.parameters["默认粒子"]);
		DrillUp.g_MPa_default = DrillUp.drill_MPa_particleDefaultInit( temp );
		DrillUp.g_MPa_default['id'] = 0;
	}else{
		DrillUp.g_MPa_default = DrillUp.drill_MPa_particleDefaultInit( {} );
		DrillUp.g_MPa_default['id'] = 0;
	}
	
	/*-----------------粒子------------------*/
	DrillUp.g_MPa_list_length = 80;
	DrillUp.g_MPa_list = [];
	DrillUp.g_MPa_list[0] = DrillUp.g_MPa_default;
	for (var i = 1; i <= DrillUp.g_MPa_list_length; i++) {
		if( DrillUp.parameters["粒子-" + String(i) ] != undefined &&
			DrillUp.parameters["粒子-" + String(i) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["粒子-" + String(i) ]);
			DrillUp.g_MPa_list[i] = DrillUp.drill_MPa_particleInit( temp );
			DrillUp.g_MPa_list[i]['id'] = Number(i);
		}else{
			DrillUp.g_MPa_list[i] = null;		//（强制设为空值，节约存储资源）
		}
	}
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuLayer = function(filename) {
    return this.loadBitmap('img/Menu__layer/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MPa_pluginCommand.call(this, command, args);
	if( command === ">菜单粒子" ){
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var b_id = -1;
			if( temp1 == "默认粒子" ){
				b_id = 0;
			}else{
				temp1 = temp1.replace("粒子[","");
				temp1 = temp1.replace("]","");
				b_id = Number(temp1);
			}
			
			if( b_id >= 0 && type === "显示" ){
				$gameSystem._drill_MPa_visible[b_id] = true;
			}
			if( b_id >= 0 && type === "隐藏" ){
				$gameSystem._drill_MPa_visible[b_id] = false;
			}
			if( b_id == 0 && type === "还原样式" ){
				$gameSystem._drill_MPa_default = 0;
			}
		}
		if(args.length == 6){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1 === "默认粒子" && type === "复制样式" ){
				temp2 = temp2.replace("粒子[","");
				temp2 = temp2.replace("]","");
				var b_id = Number(temp2);
				$gameSystem._drill_MPa_default = b_id;
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
DrillUp.g_MPa_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MPa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MPa_sys_initialize.call(this);
	this.drill_MPa_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MPa_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MPa_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MPa_saveEnabled == true ){	
		$gameSystem.drill_MPa_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MPa_initSysData();
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
Game_System.prototype.drill_MPa_initSysData = function() {
	this.drill_MPa_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MPa_checkSysData = function() {
	this.drill_MPa_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MPa_initSysData_Private = function() {
	
	this._drill_MPa_default = 0;
	this._drill_MPa_visible = [];
	for(var i = 0; i< DrillUp.g_MPa_list.length ;i++){
		var temp_data = DrillUp.g_MPa_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_MPa_visible[i] = temp_data['visible'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MPa_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MPa_visible == undefined ){
		this.drill_MPa_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_MPa_list.length; i++ ){
		var temp_data = DrillUp.g_MPa_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_MPa_visible[i] == undefined ){
				this._drill_MPa_visible[i] = temp_data['visible'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
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
Scene_MenuBase.prototype.drill_MPa_layerAddSprite = function( sprite, layer_index ){
    this.drill_MPa_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 菜单层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_MenuBase.prototype.drill_MPa_layerRemoveSprite = function( sprite ){
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
Scene_MenuBase.prototype.drill_MPa_sortByZIndex = function () {
    this.drill_MPa_sortByZIndex_Private();
}
//=============================================================================
// ** 菜单层级（接口实现）
//=============================================================================
//==============================
// * 菜单层级 - 最顶层
//==============================
var _drill_MPa_menuLayer_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MPa_menuLayer_update.call(this);
	
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
Scene_MenuBase.prototype.drill_MPa_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单层级 - 添加贴图到层级（私有）
//==============================
Scene_MenuBase.prototype.drill_MPa_layerAddSprite_Private = function( sprite, layer_index ){
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
// ** 菜单 - 创建菜单后面层
//==============================
var _drill_MPa_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	
	// > 粒子初始化
	SceneManager._drill_MPa_created = false;	
   	this._drill_MPa_spriteTankOrg = [];
   	this._drill_MPa_spriteTankSec = [];
   	this._drill_MPa_dataTank = [];
	
	// > 菜单后面层
	_drill_MPa_createBackground.call(this);
};
//==============================
// ** 菜单 - 退出界面
//==============================
var _drill_MPa_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_MPa_terminate.call(this);			//（下次进入界面需重新创建）
	SceneManager._drill_MPa_created = false;
};
//==============================
// * 菜单 - 帧刷新
//==============================
var _drill_MPa_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MPa_update.call(this);
	
	// > 要求载入完毕后 创建
	if( SceneManager.isCurrentSceneStarted() && 
		SceneManager._drill_MPa_created != true ){
		this.drill_MPa_create();	
	}
	// > 帧刷新
	if( SceneManager._drill_MPa_created == true ){
		this.drill_MPa_update();
	};
};

//=============================================================================
// ** 粒子
//=============================================================================
//==============================
// * 粒子 - 创建
//==============================
Scene_MenuBase.prototype.drill_MPa_create = function() {	
	SceneManager._drill_MPa_created = true;
	
	if(!this._drill_MPa_spriteTankOrg){	//防止覆写报错 - 贴图初始化
		this._drill_MPa_spriteTankOrg = [];	//（数组元素不允许出现null值）
		this._drill_MPa_spriteTankSec = [];	//（数组元素不允许出现null值）
		this._drill_MPa_dataTank = [];		//（数组元素不允许出现null值）
	}
	
	// > 配置的粒子
	for (var i = 1; i < DrillUp.g_MPa_list.length; i++) {
		var temp_data = DrillUp.g_MPa_list[i];
		if( temp_data == undefined ){ continue; }
		
		if( this.drill_MPa_checkKeyword( temp_data ) ){
			
			// > 粒子层
			var temp_layer = new Sprite();
			temp_layer.opacity = temp_data['opacity'];
			temp_layer.zIndex = temp_data['zIndex'];
			temp_layer.visible = $gameSystem._drill_MPa_visible[i] || false;
			
			// > 粒子集合
			for( var j = 0; j < temp_data['par_count'] ; j++ ){	
				var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));		//深拷贝数据（杜绝引用造成的修改）
				var temp_sprite = new Sprite();
				temp_sprite.bitmap = ImageManager.load_MenuLayer(temp_sprite_data['src_img']);
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				temp_sprite.blendMode = temp_sprite_data['blendMode'];
				temp_sprite.opacity = 0;
				
				this._drill_MPa_spriteTankOrg.push(temp_sprite);
				this._drill_MPa_dataTank.push(temp_sprite_data);
				temp_layer.addChild(temp_sprite);
				
				// > 粒子初始化
				this.drill_MPa_resetParticles(this._drill_MPa_dataTank.length-1);	//（创建时刷新添加的粒子）
				temp_sprite['_time'] = Math.floor( temp_sprite_data['par_life'] * Math.random() );
			}
			
			// > 粒子层 - 菜单层级
			this.drill_MPa_layerAddSprite( temp_layer, temp_data['menu_index'] );
			
			// > 粒子层 - 粒子遮罩
			if( temp_data['src_img_mask'] != "" ){
				var temp_mask = new Sprite(ImageManager.load_MenuLayer( temp_data['src_img_mask'] ));
				temp_layer.addChild(temp_mask);
				temp_layer.mask = temp_mask;
			}
		
			// > 双层效果
			if( temp_data['second_enable'] == true ){
				
				// > 第二层
				var temp_layerSec = new Sprite();
				temp_layerSec.opacity = temp_layer.opacity;
				temp_layerSec.zIndex = temp_data['second_zIndex'];
				temp_layerSec.visible = temp_layer.visible;
				
				// > 粒子集合
				for( var j = 0; j < temp_layer.children.length; j++ ){	
					var org_sprite = temp_layer.children[j];
					
					var temp_sprite = new Sprite();
					temp_sprite.bitmap = ImageManager.load_MenuLayer(temp_data['second_src_img']);
					temp_sprite.anchor.x = 0.5;
					temp_sprite.anchor.y = 0.5;
					temp_sprite.blendMode = org_sprite.blendMode;
					temp_sprite.opacity = 0;
					temp_sprite.scale.x = org_sprite.scale.x;
					temp_sprite.scale.y = org_sprite.scale.y;
					temp_sprite._followingSprite = org_sprite;
					
					this._drill_MPa_spriteTankSec.push(temp_sprite);
					temp_layerSec.addChild(temp_sprite);
				}
			
				// > 第二层 - 菜单层级
				this.drill_MPa_layerAddSprite( temp_layer, temp_data['second_menuIndex'] );
				
				// > 第二层 - 粒子遮罩
				if( temp_data['src_img_mask'] != "" ){
					var temp_mask = new Sprite(ImageManager.load_MenuLayer(temp_data['src_img_mask']));
					temp_layerSec.addChild(temp_mask);
					temp_layerSec.mask = temp_mask;
				}
			}
			
		}
	}
	
	if(this._drill_MPa_spriteTankOrg.length == 0){	//默认粒子，0菜单层级，0图片层级
		var i = $gameSystem._drill_MPa_default;
		var temp_data = DrillUp.g_MPa_list[i];
		if( temp_data == undefined ){ return; }
		
		// > 粒子层
		var temp_layer = new Sprite();
		temp_layer.opacity = temp_data['opacity'];
		temp_layer.zIndex = temp_data['zIndex'];
		temp_layer.visible = $gameSystem._drill_MPa_visible[i] || false;
		
		// > 粒子集合
		for( var j = 0; j < temp_data['par_count'] ; j++ ){	
			var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据（杜绝引用造成的修改）
			var temp_sprite = new Sprite();
			temp_sprite.bitmap = ImageManager.load_MenuLayer(temp_sprite_data['src_img']);
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.opacity = 0;
			
			this._drill_MPa_spriteTankOrg.push(temp_sprite);
			this._drill_MPa_dataTank.push(temp_sprite_data);
			temp_layer.addChild(temp_sprite);
			
			// > 粒子初始化
			this.drill_MPa_resetParticles(this._drill_MPa_dataTank.length-1);	//（创建时刷新添加的粒子）
			temp_sprite['_time'] = Math.floor( temp_sprite_data['par_life'] * Math.random() );
		}
		
		// > 粒子层 - 菜单层级
		this.drill_MPa_layerAddSprite( temp_layer, "菜单后面层" );
		
		// > 粒子层 - 粒子遮罩
		if( temp_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite(ImageManager.load_MenuLayer( temp_data['src_img_mask'] ));
			temp_layer.addChild(temp_mask);
			temp_layer.mask = temp_mask;
		}
		
		// > 双层效果
		if( temp_data['second_enable'] == true ){
			
			// > 第二层
			var temp_layerSec = new Sprite();
			temp_layerSec.opacity = temp_layer.opacity;
			temp_layerSec.zIndex = temp_data['second_zIndex'];
			temp_layerSec.visible = temp_layer.visible;
			
			// > 粒子集合
			for( var j = 0; j < temp_layer.children.length; j++ ){	
				var org_sprite = temp_layer.children[j];
				
				var temp_sprite = new Sprite();
				temp_sprite.bitmap = ImageManager.load_MenuLayer(temp_data['second_src_img']);
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				temp_sprite.blendMode = org_sprite.blendMode;
				temp_sprite.opacity = 0;
				temp_sprite.scale.x = org_sprite.scale.x;
				temp_sprite.scale.y = org_sprite.scale.y;
				temp_sprite._followingSprite = org_sprite;
				
				this._drill_MPa_spriteTankSec.push(temp_sprite);
				temp_layerSec.addChild(temp_sprite);
			}
		
			// > 第二层 - 菜单层级
			this.drill_MPa_layerAddSprite( temp_layer, temp_data['second_menuIndex'] );
			
			// > 第二层 - 粒子遮罩
			if( temp_data['src_img_mask'] != "" ){
				var temp_mask = new Sprite(ImageManager.load_MenuLayer(temp_data['src_img_mask']));
				temp_layerSec.addChild(temp_mask);
				temp_layerSec.mask = temp_mask;
			}
		}
	}
	this.drill_MPa_sortByZIndex();
};

//==============================
// * 粒子 - 检查位置
//==============================
Scene_MenuBase.prototype.drill_MPa_checkKeyword = function( temp_sprite_data ){
	
	/*---------------标准----------------*/
	if( SceneManager._scene.constructor.name === "Scene_Menu" && temp_sprite_data['menu'] == "主菜单" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Item" && temp_sprite_data['menu'] == "道具" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Skill" && temp_sprite_data['menu'] == "技能" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Equip" && temp_sprite_data['menu'] == "装备" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Status" && temp_sprite_data['menu'] == "状态" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Options" && temp_sprite_data['menu'] == "选项" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Load" && temp_sprite_data['menu'] == "载入" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Save" && temp_sprite_data['menu'] == "保存" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_GameEnd" && temp_sprite_data['menu'] == "游戏结束" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Shop" && temp_sprite_data['menu'] == "商店" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Name" && temp_sprite_data['menu'] == "输入名称" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Debug" && temp_sprite_data['menu'] == "测试查值" ){
		return true;
	/*---------------旧选项----------------*/
	}else if( (SceneManager._scene.constructor.name === "Scene_Party" || SceneManager._scene.constructor.name === "Scene_Drill_SMa_Formation") && temp_sprite_data['menu'] == "队形"  ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_EnemyBook" && temp_sprite_data['menu'] == "敌人图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_ItemBook" && temp_sprite_data['menu'] == "物品图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Picture_Gallery" && temp_sprite_data['menu'] == "画廊" ){
		return true;
	}else{
		/*---------------自定义----------------*/
		if( SceneManager._scene.constructor.name === temp_sprite_data['menu_key'] ){
			return true;
		}
	}
	return false;
};

//==============================
// * 粒子 - 帧刷新
//==============================
Scene_MenuBase.prototype.drill_MPa_update = function() {
	
	// > 粒子贴图
	for(var i = 0; i < this._drill_MPa_spriteTankOrg.length; i++ ){
		var spr = this._drill_MPa_spriteTankOrg[i];
		var data = this._drill_MPa_dataTank[i];
		spr['_time'] += 1;
		
		// > 位置
		var xx = 0;
		var yy = 0;
		xx += data['start_x'];
		yy += data['start_y'];
		xx += spr['_time'] * data['cur_speed'] * Math.cos( data['start_dir'] );
		yy += spr['_time'] *data['cur_speed'] * Math.sin( data['start_dir'] );
		spr.x = xx;
		spr.y = yy;
		
		// > 透明度
		var index = spr['_time'];
		if( index >= data['_drill_COBa_opacity'].length ){
			index = data['_drill_COBa_opacity'].length -1;
		}
		spr.opacity = data['_drill_COBa_opacity'][index];
		
		// > 自旋转
		spr.rotation += data['par_selfRotate'] /180*Math.PI;
		
		// > 过界刷新
    	if( this.drill_MPa_isNeedResetParticles(i) ){
			this.drill_MPa_resetParticles(i);
		};
	};
	
	// > 第二层贴图
	for(var i = 0; i < this._drill_MPa_spriteTankSec.length; i++ ){
		var spr_sec = this._drill_MPa_spriteTankSec[i];
		if( spr_sec._followingSprite == undefined ){ return; }
		
		// > 位置
		spr_sec.x = spr_sec._followingSprite.x;
		spr_sec.y = spr_sec._followingSprite.y;
		
		// > 透明度
		spr_sec.opacity = spr_sec._followingSprite.opacity;
		
		// > 缩放大小
		spr_sec.scale.x = spr_sec._followingSprite.scale.x;
		spr_sec.scale.y = spr_sec._followingSprite.scale.y;
		
		// > 自旋转
		spr_sec.rotation = spr_sec._followingSprite.rotation;
		
	};
};

//==============================
// * 粒子 - 重设条件
//==============================	
Scene_MenuBase.prototype.drill_MPa_isNeedResetParticles = function(i) {
	var spr = this._drill_MPa_spriteTankOrg[i];
	var data = this._drill_MPa_dataTank[i];
	var ww = Math.max( spr.width, 100 );
	var hh = Math.max( spr.height, 100 );
	
	// > 过边界
	if( spr.x < 0 - ww ){ return true };
	if( spr.x > Graphics.boxWidth + ww ){ return true };
	if( spr.y < 0 - hh ){ return true };
	if( spr.y > Graphics.boxHeight + hh ){ return true };
	
	// > 生命周期结束
	if( spr['_time'] > data['par_life'] ){ return true; }
	
	return false;
};

//==============================
// * 粒子 - 重设
//==============================	
Scene_MenuBase.prototype.drill_MPa_resetParticles = function(i) {
	var spr = this._drill_MPa_spriteTankOrg[i];
	var data = this._drill_MPa_dataTank[i];
	var ww = Math.max( spr.width, 100 );
	var hh = Math.max( spr.height, 100 );
	
	spr['_time'] = 0;
	spr.rotation = 2*Math.PI*Math.random();
	
	// > 粒子出现模式
	if( data['par_birthMode'] == "随机出现" ){
		data['start_x'] = Math.randomInt(Graphics.boxWidth);
		data['start_y'] = Math.randomInt(Graphics.boxHeight);
	}
	if( data['par_birthMode'] == "左侧出现" ){
		data['start_x'] = 0 - ww*0.5;
		data['start_y'] = Math.randomInt(Graphics.boxHeight);
	}
	if( data['par_birthMode'] == "右侧出现" ){
		data['start_x'] = Graphics.boxWidth + ww*0.5;
		data['start_y'] = Math.randomInt(Graphics.boxHeight);
	}
	if( data['par_birthMode'] == "顶部出现" ){
		data['start_x'] = Math.randomInt(Graphics.boxWidth);
		data['start_y'] = 0 - hh*0.5;
	}
	if( data['par_birthMode'] == "底部出现" ){
		data['start_x'] = Math.randomInt(Graphics.boxWidth);
		data['start_y'] = Graphics.boxHeight + hh*0.5;
	}
	if( data['par_birthMode'] == "固定点范围出现" ){
		data['start_x'] = data['par_birthX'] + data['par_birthRange'] * Math.cos( 2*Math.PI*Math.random() );
		data['start_y'] = data['par_birthY'] + data['par_birthRange'] * Math.sin( 2*Math.PI*Math.random() );
	}
	
	// > 粒子方向模式
	if( data['par_dirMode'] == "固定方向" ){
		data['start_dir'] = data['par_dirFix'];
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	if( data['par_dirMode'] == "四周扩散(随机)" ){
		data['start_dir'] = 360 * Math.random();
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	if( data['par_dirMode'] == "扇形范围方向(随机)" ){
		data['start_dir'] = data['par_dirSectorFace'] + (Math.random() - 0.5) * data['par_dirSectorDegree'];
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	if( data['par_dirMode'] == "方向聚焦于粒子固定点" ){
		data['start_dir'] = this.drill_MPa_getPointToPointDegree( data['start_x'],data['start_y'], data['par_birthX'],data['par_birthY'] );
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	
	// > 粒子速度模式
	if( data['par_speedMode'] == "只初速度" ){
		data['cur_speed'] = data['par_speedBase'];
	}
	if( data['par_speedMode'] == "初速度+波动量" ){
		data['cur_speed'] = data['par_speedBase'] + (Math.random() - 0.5) * data['par_speedRandom'];
	}
	
	// > 粒子透明度模式
	if( data['par_opacityMode'] == "逐渐消失" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "先显现后消失(慢速)" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':45,'o':255} );
		data['anchorPointTank'].push( {'t':55,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "先显现后消失" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':25,'o':255} );
		data['anchorPointTank'].push( {'t':75,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "先显现后消失(快速)" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':10,'o':255} );
		data['anchorPointTank'].push( {'t':90,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "保持原透明度" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':255} );
	}
	if( data['par_opacityMode'] == "一闪一闪" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':30,'o':125} );
		data['anchorPointTank'].push( {'t':35,'o':255} );
		data['anchorPointTank'].push( {'t':40,'o':125} );
		data['anchorPointTank'].push( {'t':45,'o':255} );
		data['anchorPointTank'].push( {'t':50,'o':125} );
		data['anchorPointTank'].push( {'t':70,'o':125} );
		data['anchorPointTank'].push( {'t':75,'o':255} );
		data['anchorPointTank'].push( {'t':80,'o':125} );
		data['anchorPointTank'].push( {'t':85,'o':255} );
		data['anchorPointTank'].push( {'t':90,'o':125} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	
	// > 粒子透明度模式（复刻至"弹道核心 - 时间锚点公式"）
	data['_drill_COBa_opacity'] = [ 0 ];
	if( data['anchorPointTank'] != undefined ){
		data['_drill_COBa_opacity'] = [];
		
		// > 起点值
		data['_drill_COBa_opacity'].push( 0 );
		
		// > 时间锚点初始化
		if( data['anchorPointTank'].length < 2 ){	//（至少要两个点才能计算）
			data['anchorPointTank'] = [];
			data['anchorPointTank'].push( {'t':0,'o':0} );
			data['anchorPointTank'].push( {'t':100,'o':255} );
		}
		
		// > 开始找点（这里默认 data['anchorPointTank'] 已根据 t 排序 ）
		for(var time = 1; time <= data['par_life']; time++){
			var time_per = time * 100 / data['par_life'];	//（时间百分比） 
			
			// > 找到百分比的落脚点
			var start_index = 0;
			var end_index = 0;
			for( var i = 0; i < data['anchorPointTank'].length; i++ ){
				var p = data['anchorPointTank'][i];
				if( time_per < p['t'] ){
					start_index = i-1;
					end_index = i;
					break;
				}
			}
			
			// > 直接找到末尾点
			if( end_index == 0 ){
				data['_drill_COBa_opacity'].push( data['anchorPointTank'][ data['anchorPointTank'].length-1 ]['o'] );
				continue;
			}
			// > 开头点都没接触到
			if( start_index == -1 ){
				data['_drill_COBa_opacity'].push( data['anchorPointTank'][0]['o'] );
				continue;
			}
			
			// > 计算通用落点
			var p_start = data['anchorPointTank'][start_index];
			var p_end = data['anchorPointTank'][end_index];
			var d_time = p_end['t'] - p_start['t'];
			var cur_time = time_per - p_start['t'];
			var cc = cur_time / d_time * ( p_end['o'] - p_start['o'] ) + p_start['o'];
			data['_drill_COBa_opacity'].push( cc );
		}
	}
	
	// > 粒子缩放模式
	if( data['par_scaleMode'] == "固定缩放值" ){
		spr.scale.x = data['par_scaleBase'];
		spr.scale.y = data['par_scaleBase'];
	}
	if( data['par_scaleMode'] == "缩放值+波动量" ){
		var ran = Math.random();
		spr.scale.x = data['par_scaleBase'] + (ran - 0.5) * data['par_scaleRandom'];
		spr.scale.y = data['par_scaleBase'] + (ran - 0.5) * data['par_scaleRandom'];
	}
	
};
//==============================
// * 数学 - 计算点A朝向点B的角度
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//			返回：	> 数字      （角度，0 至 360 之间）
//			
//			说明：	0度朝右，90度朝下，180度朝左，270度朝上。
//==============================
Scene_Title.prototype.drill_MPa_getPointToPointDegree = function( x1,y1,x2,y2 ){
	var degree = 0;
	
	// > arctan不能为0情况
	if( x2 == x1 ){
		if( y2 > y1 ){
			degree = 90;
		}else{
			degree = 270;
		}
	}else if( y2 == y1 ){
		if( x2 > x1 ){
			degree = 0;
		}else{
			degree = 180;
		}
	
	// > arctan正常计算
	}else{
		degree = Math.atan( (y2 - y1)/(x2 - x1) );
		degree = degree / Math.PI * 180;
		if( x2 < x1 ){
			degree += 180;
		}
	}
	
	// > 修正值
	degree = degree % 360;
	if( degree < 0 ){ degree += 360; }
	
	return degree;
};


