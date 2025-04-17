//=============================================================================
// Drill_MenuParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        主菜单 - 多层菜单粒子
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子-%d"
 * @Drill_LE_parentKey "---粒子组%d至%d---"
 * @Drill_LE_var "DrillUp.g_MPa_list_length"
 *
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
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfParticle        系统-粒子核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以放置在菜单前面层或者菜单后面层。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
 * 3.该插件可以装饰其他菜单插件。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-菜单界面）.docx"。
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
 * [v1.8]
 * 结合粒子核心，加强了粒子相关功能。
 * [v1.9]
 * 添加了粒子 彩虹化 功能。
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
 * @desc 粒子所属的菜单层级。
 * @default 菜单后面层
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
 * @param 粒子弹道是否倒放
 * @parent ---粒子效果---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭，粒子弹道完全倒放。比如 四周扩散效果 变成 四周吸收效果。
 * @default false
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
 * @option 保持原透明度
 * @value 保持原透明度
 * @option 等一半时间后逐渐消失
 * @value 等一半时间后逐渐消失
 * @option 先显现后消失(慢速)
 * @value 先显现后消失(慢速)
 * @option 先显现后消失
 * @value 先显现后消失
 * @option 先显现后消失(快速)
 * @value 先显现后消失(快速)
 * @option 一闪一闪
 * @value 一闪一闪
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 先显现后消失
 *
 * @param 粒子自旋转模式
 * @parent ---粒子效果---
 * @type select
 * @option 随机角度
 * @value 随机角度
 * @option 固定角度
 * @value 固定角度
 * @option 始终与朝向一致
 * @value 始终与朝向一致
 * @desc 粒子自旋转的模式。
 * @default 固定角度
 *
 * @param 粒子自旋转初始角度
 * @parent 粒子自旋转模式
 * @desc 粒子自旋转的初始角度，单位角度。
 * @default 0.0
 *
 * @param 粒子自旋转速度
 * @parent 粒子自旋转模式
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 10.0
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
 * @value 菜单后面层
 * @option 菜单前面层
 * @value 菜单前面层
 * @desc 第二层粒子所属的菜单层级。
 * @default 菜单后面层
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 7
 * 
 * 
 * @param ---随机种子---
 * @desc 
 *
 * @param 是否固定随机种子
 * @parent ---随机种子---
 * @type boolean
 * @on 固定
 * @off 关闭
 * @desc true - 固定，false - 关闭，固定随机种子，能使得所有该样式的粒子，随机轨迹都一模一样。
 * @default false
 * 
 * @param 固定随机种子
 * @parent 是否固定随机种子
 * @desc 固定的随机种子值，范围在0.0000至1.0000之间。
 * @default 0.20221002
 * 
 * 
 * @param ---直线拖尾效果---
 * @desc 
 *
 * @param 是否开启直线拖尾效果
 * @parent ---直线拖尾效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，拖尾贴图会根据粒子的方向进行旋转。
 * @default false
 *
 * @param 是否固定拖尾在粒子中心
 * @parent ---直线拖尾效果---
 * @type boolean
 * @on 固定在中心
 * @off 正右方锚点
 * @desc true - 固定在中心，false - 正右方锚点。
 * @default false
 *
 * @param 资源-直线拖尾
 * @parent ---直线拖尾效果---
 * @desc 粒子的图片资源。
 * @default (需配置)地图临时粒子小爆炸直线拖尾贴图
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 * 
 * 
 * @param ---彩虹化---
 * @desc 
 *
 * @param 是否开启彩虹化-粒子
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个粒子都会根据彩虹进行染色变化。
 * @default false
 *
 * @param 是否开启彩虹化-第二层粒子
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个第二层粒子都会根据彩虹进行染色变化。
 * @default false
 *
 * @param 是否开启彩虹化-直线拖尾
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个粒子的拖尾都会根据彩虹进行染色变化。
 * @default false
 * 
 * @param 彩虹化色彩数量
 * @parent ---彩虹化---
 * @type number
 * @min 1
 * @max 360
 * @desc 彩虹化色彩的数量，最大值为360。
 * @default 20
 *
 * @param 彩虹化是否锁定色调值
 * @parent ---彩虹化---
 * @type boolean
 * @on 锁定
 * @off 关闭
 * @desc true - 锁定，false - 关闭，彩虹变化将按照 色调值列表 进行依次染色，具体可以看看文档。
 * @default false
 * 
 * @param 锁定的色调值列表
 * @parent 彩虹化是否锁定色调值
 * @type number[]
 * @min 0
 * @max 360
 * @desc 彩虹变化将按照 色调值列表 进行依次染色，具体可以看看文档。
 * @default []
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
 * @param 粒子弹道是否倒放
 * @parent ---粒子效果---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭，粒子弹道完全倒放。比如 四周扩散效果 变成 四周吸收效果。
 * @default false
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
 * @param 粒子自旋转模式
 * @parent ---粒子效果---
 * @type select
 * @option 随机角度
 * @value 随机角度
 * @option 固定角度
 * @value 固定角度
 * @option 始终与朝向一致
 * @value 始终与朝向一致
 * @desc 粒子自旋转的模式。
 * @default 固定角度
 *
 * @param 粒子自旋转初始角度
 * @parent 粒子自旋转模式
 * @desc 粒子自旋转的初始角度，单位角度。
 * @default 0.0
 *
 * @param 粒子自旋转速度
 * @parent 粒子自旋转模式
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 10.0
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
 * @value 菜单后面层
 * @option 菜单前面层
 * @value 菜单前面层
 * @desc 第二层粒子所属的菜单层级。
 * @default 菜单后面层
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 7
 * 
 * 
 * @param ---随机种子---
 * @desc 
 *
 * @param 是否固定随机种子
 * @parent ---随机种子---
 * @type boolean
 * @on 固定
 * @off 关闭
 * @desc true - 固定，false - 关闭，固定随机种子，能使得所有该样式的粒子，随机轨迹都一模一样。
 * @default false
 * 
 * @param 固定随机种子
 * @parent 是否固定随机种子
 * @desc 固定的随机种子值，范围在0.0000至1.0000之间。
 * @default 0.20221002
 * 
 * 
 * @param ---直线拖尾效果---
 * @desc 
 *
 * @param 是否开启直线拖尾效果
 * @parent ---直线拖尾效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，拖尾贴图会根据粒子的方向进行旋转。
 * @default false
 *
 * @param 是否固定拖尾在粒子中心
 * @parent ---直线拖尾效果---
 * @type boolean
 * @on 固定在中心
 * @off 正右方锚点
 * @desc true - 固定在中心，false - 正右方锚点。
 * @default false
 *
 * @param 资源-直线拖尾
 * @parent ---直线拖尾效果---
 * @desc 粒子的图片资源。
 * @default (需配置)地图临时粒子小爆炸直线拖尾贴图
 * @require 1
 * @dir img/Menu__layer/
 * @type file
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
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			->☆菜单层级
//			
//			->☆贴图创建标记
//			->☆贴图控制
//				->不考虑销毁情况
//			
//			->粒子控制器【Drill_MPa_Controller】
//			->粒子贴图【Drill_MPa_Sprite】
//			->粒子贴图（第二层）【Drill_MPa_SecSprite】
//
//
//		★家谱：
//			大家族-粒子效果
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//		
//		★插件私有类：
//			* 粒子控制器【Drill_MPa_Controller】
//			* 粒子贴图【Drill_MPa_Sprite】
//			* 粒子贴图（第二层）【Drill_MPa_SecSprite】
//		
//		★必要注意事项：
//			1.插件继承至 粒子核心。
//			  核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//
//		★其它说明细节：
//			1.插件结构比背景复杂，多一个数组的量级，需要理清楚下面变量的关系：
//				DrillUp.g_MPa_list					获取的值（80个）
//				this._drill_MPa_controllerTank		符合的值（小于80个，不要将数组二者混合使用）
//				this._drill_MPa_spriteTankOrg		符合的图片（小于80个）
//				DrillUp.g_MPa_list[i]['par_count']	粒子数量（直接遍历塞进符合图片中）
//				temp_sprite			临时图片
//				temp_sprite_data	临时的值
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
	DrillUp.g_MPa_PluginTip_curName = "Drill_MenuParticle.js 主菜单-多层菜单粒子";
	DrillUp.g_MPa_PluginTip_baseList = ["Drill_CoreOfParticle.js 系统-粒子核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_MPa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_MPa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_MPa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_MPa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_MPa_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_MenuParticle = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MenuParticle');
	
	//==============================
	// * 静态数据 - 默认粒子
	//				（~struct~MenuParticleDefault）
	//==============================
	DrillUp.drill_MPa_particleDefaultInit = function( dataFrom ) {
		var data = {};
		
		// > 控制器
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_mask'] = String( dataFrom["资源-粒子遮罩"] || "");
		data['src_img_file'] = "img/Menu__layer/";
		data['x'] = 0;
		data['y'] = 0;
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		//data['layerIndex'] = Number( dataFrom["菜单层级"] || "菜单后面层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 0);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		//data['par_holdingBirthPosition'] = String( dataFrom["粒子是否滞留"] || "false") == "true";
		
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
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "固定角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_layerIndex'] = Number( dataFrom["第二层粒子菜单层级"] || "菜单后面层");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 7);
		
		// > 随机种子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > 直线拖尾贴图
		data['trailing_enable'] = String( dataFrom["是否开启直线拖尾效果"] || "false") == "true";
		data['trailing_centerAnchor'] = String( dataFrom["是否固定拖尾在粒子中心"] || "false") == "true";
		data['trailing_src_img'] = String( dataFrom["资源-直线拖尾"] || "");
		data['trailing_src_img_file'] = "img/Menu__layer/";
		
		// > 彩虹化
		data['rainbow_enable'] = String( dataFrom["是否开启彩虹化-粒子"] || "false") == "true";
		data['rainbow_enableSecond'] = String( dataFrom["是否开启彩虹化-第二层粒子"] || "false") == "true";
		data['rainbow_enableTrailing'] = String( dataFrom["是否开启彩虹化-直线拖尾"] || "false") == "true";
		data['rainbow_num'] = Number( dataFrom["彩虹化色彩数量"] || 20);
		data['rainbow_lockTint'] = String( dataFrom["彩虹化是否锁定色调值"] || "false") == "true";
		if( dataFrom["锁定的色调值列表"] != undefined &&
			dataFrom["锁定的色调值列表"] != "" ){
			data['rainbow_tintList'] = JSON.parse( dataFrom["锁定的色调值列表"] || [] );
		}else{
			data['rainbow_tintList'] = [];
		}
		
		return data;
	}
	//==============================
	// * 静态数据 - 粒子
	//				（~struct~MenuParticle）
	//==============================
	DrillUp.drill_MPa_particleInit = function( dataFrom ) {
		var data = {};
		
		// > 绑定
		data['menu'] = String( dataFrom["所属菜单"] || "");
		data['menu_key'] = String( dataFrom["自定义关键字"] || "");
		
		
		// > 控制器
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_mask'] = String( dataFrom["资源-粒子遮罩"] || "");
		data['src_img_file'] = "img/Menu__layer/";
		data['x'] = 0;
		data['y'] = 0;
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = Number( dataFrom["菜单层级"] || "菜单后面层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 0);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		//data['par_holdingBirthPosition'] = String( dataFrom["粒子是否滞留"] || "false") == "true";
		
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
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "固定角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_layerIndex'] = Number( dataFrom["第二层粒子菜单层级"] || "菜单后面层");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 7);
		
		// > 随机种子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > 直线拖尾贴图
		data['trailing_enable'] = String( dataFrom["是否开启直线拖尾效果"] || "false") == "true";
		data['trailing_centerAnchor'] = String( dataFrom["是否固定拖尾在粒子中心"] || "false") == "true";
		data['trailing_src_img'] = String( dataFrom["资源-直线拖尾"] || "");
		data['trailing_src_img_file'] = "img/Menu__layer/";
		
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
			DrillUp.g_MPa_list[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfParticle ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_MPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_MPa_pluginCommand.call(this, command, args);
	this.drill_MPa_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_MPa_pluginCommand = function( command, args ){
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
// ** 【标准模块】存储数据 ☆存储数据
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
	for( var i = 0; i < DrillUp.g_MPa_list.length ;i++){
		var temp_data = DrillUp.g_MPa_list[i];
		if( temp_data == undefined ){ continue; }	//『控制器与贴图的样式』 - 校验+直接跳出（只存visible）
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
	for( var i = 0; i < DrillUp.g_MPa_list.length; i++ ){
		var temp_data = DrillUp.g_MPa_list[i];		//『控制器与贴图的样式』 - 校验+直接跳出（存储数据检查）
		
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
Scene_MenuBase.prototype.drill_MPa_layerAddSprite = function( sprite, layer_index ){
    this.drill_MPa_layerAddSprite_Private(sprite, layer_index);
};
//##############################
// * 菜单层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从菜单层级中移除。
//##############################
Scene_MenuBase.prototype.drill_MPa_layerRemoveSprite = function( sprite ){
	this.drill_MPa_layerRemoveSprite_Private( sprite );
};
//##############################
// * 菜单层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，菜单层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_MenuBase.prototype.drill_MPa_sortByZIndex = function () {
    this.drill_MPa_sortByZIndex_Private();
};
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
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 菜单层级 - 图片层级排序（私有）
//==============================
Scene_MenuBase.prototype.drill_MPa_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单层级 - 去除贴图（私有）
//==============================
Scene_MenuBase.prototype.drill_MPa_layerRemoveSprite_Private = function( sprite ){
	this._backgroundSprite.removeChild( sprite );
	this._foregroundSprite.removeChild( sprite );
};
//==============================
// * 菜单层级 - 添加贴图到层级（私有）
//
//			说明：	> 此处兼容了 战斗界面、地图界面 的层级名词。
//==============================
Scene_MenuBase.prototype.drill_MPa_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "菜单后面层" || layer_index === 0 || 
		layer_index == "下层" || layer_index == "中层" || layer_index == "上层"){
		this._backgroundSprite.addChild( sprite );
	}
	if( layer_index == "菜单前面层" || layer_index === 1 || 
		layer_index == "图片层" || layer_index == "最顶层" ){
		this._foregroundSprite.addChild( sprite );
	}
};


//=============================================================================
// ** ☆贴图创建标记
//			
//			说明：	> 此模块专门对 菜单面板 进行 创建标记，确保只创建一次。
//					  注意，该功能在所有菜单面板中都会执行。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图创建标记 - 初始化
//==============================
var _drill_MPa_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	_drill_MPa_createBackground.call(this);
   	this._drill_MPa_spriteTankOrg = [];
   	this._drill_MPa_spriteTankSec = [];
   	this._drill_MPa_controllerTank = [];
	SceneManager._drill_MPa_created = false;
};
//==============================
// * 贴图创建标记 - 退出界面
//==============================
var _drill_MPa_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_MPa_terminate.call(this);			//（下次进入界面需重新创建）
	SceneManager._drill_MPa_created = false;
};
//==============================
// * 贴图创建标记 - 帧刷新
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
		this.drill_MPa_updateController();
	};
};


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的创建。不考虑 控制器/贴图 销毁情况。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 创建
//==============================
Scene_MenuBase.prototype.drill_MPa_create = function() {	
	SceneManager._drill_MPa_created = true;
	
	if(!this._drill_MPa_spriteTankOrg){	//防止覆写报错 - 贴图初始化
		this._drill_MPa_spriteTankOrg = [];		//（数组元素不允许出现null值）
		this._drill_MPa_spriteTankSec = [];		//（数组元素不允许出现null值）
		this._drill_MPa_controllerTank = [];	//（数组元素不允许出现null值）
	}
	
	// > 配置的粒子
	for (var i = 1; i < DrillUp.g_MPa_list.length; i++) {
		var temp_data = DrillUp.g_MPa_list[i];
		if( temp_data == undefined ){ continue; }		//『控制器与贴图的样式』 - 校验+直接跳出
		
		if( this.drill_MPa_checkKeyword( temp_data ) ){
			
			// > 创建控制器
			var temp_controller = new Drill_MPa_Controller( temp_data ); //『控制器与贴图的样式』 - 创建控制器
			this._drill_MPa_controllerTank.push( temp_controller );
			
			// > 创建贴图
			var temp_sprite = new Drill_MPa_Sprite();
			temp_sprite.drill_sprite_setController( temp_controller );
			temp_sprite.drill_sprite_initChild();
			
			
			// > 双层效果
			if( temp_controller._drill_data['second_enable'] == true ){
				
				// > 双层效果 - 创建贴图
				var temp_secSprite = new Drill_MPa_SecSprite( temp_sprite );
				
				// > 双层效果 - 添加贴图到层级（先添加）
				this._drill_MPa_spriteTankSec.push( temp_secSprite );
				this.drill_MPa_layerAddSprite( temp_secSprite, temp_data['second_layerIndex'] );
				
				// > 双层效果 - 粒子遮罩
				if( temp_data['src_img_mask'] != "" ){
					var temp_mask = new Sprite(ImageManager.loadBitmap( temp_data['src_img_file'], temp_data['src_img_mask'], 0, true ));
					temp_secSprite.addChild(temp_mask);
					temp_secSprite.mask = temp_mask;		//『遮罩赋值』
				}
			}
			
			// > 添加贴图到层级
			this._drill_MPa_spriteTankOrg.push( temp_sprite );
			this.drill_MPa_layerAddSprite( temp_sprite, temp_data['layerIndex'] );
			
			// > 粒子遮罩
			if( temp_data['src_img_mask'] != "" ){
				var temp_mask = new Sprite( ImageManager.loadBitmap( temp_data['src_img_file'], temp_data['src_img_mask'], 0, true ) );
				temp_sprite.addChild(temp_mask);
				temp_sprite.mask = temp_mask;		//『遮罩赋值』
			}
			
		}
	}
	
	if( this._drill_MPa_spriteTankOrg.length == 0 ){	//默认粒子，0菜单层级，0图片层级
		var i = $gameSystem._drill_MPa_default;
		var temp_data = DrillUp.g_MPa_list[i];
		if( temp_data == undefined ){ return; }			//『控制器与贴图的样式』 - 校验+直接跳出
	
		// > 创建控制器
		var temp_controller = new Drill_MPa_Controller( temp_data ); //『控制器与贴图的样式』 - 创建控制器
		this._drill_MPa_controllerTank.push( temp_controller );
		
		// > 创建贴图
		var temp_sprite = new Drill_MPa_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		
		// > 双层效果
		if( temp_controller._drill_data['second_enable'] == true ){
			
			// > 双层效果 - 创建贴图
			var temp_secSprite = new Drill_MPa_SecSprite( temp_sprite );
			
			// > 双层效果 - 添加贴图到层级（先添加）
			this._drill_MPa_spriteTankSec.push( temp_secSprite );
			this.drill_MPa_layerAddSprite( temp_secSprite, temp_data['second_layerIndex'] );
		
			// > 双层效果 - 粒子遮罩
			if( temp_data['src_img_mask'] != "" ){
				var temp_mask = new Sprite(ImageManager.loadBitmap( temp_data['src_img_file'], temp_data['src_img_mask'], 0, true ));
				temp_secSprite.addChild(temp_mask);
				temp_secSprite.mask = temp_mask;		//『遮罩赋值』
			}
		}
		
		// > 添加贴图到层级
		this._drill_MPa_spriteTankOrg.push( temp_sprite );
		this.drill_MPa_layerAddSprite( temp_sprite, "菜单后面层" );
		
		// > 粒子遮罩
		if( temp_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite( ImageManager.loadBitmap( temp_data['src_img_file'], temp_data['src_img_mask'], 0, true ) );
			temp_sprite.addChild(temp_mask);
			temp_sprite.mask = temp_mask;		//『遮罩赋值』
		}
		
	}
	this.drill_MPa_sortByZIndex();
};
//==============================
// * 贴图控制 - 创建 - 检查位置
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
// * 贴图控制 - 帧刷新 控制器
//==============================
Scene_MenuBase.prototype.drill_MPa_updateController = function(){
	for( var i = 0; i < this._drill_MPa_controllerTank.length; i++ ){
		var controller = this._drill_MPa_controllerTank[i];
		
		// > 控制器 帧刷新
		controller.drill_controller_update();
	}
};



//=============================================================================
// ** 粒子控制器【Drill_MPa_Controller】
// **		
// **		作用域：	地图界面
// **		主功能：	定义一个专门控制动画粒子的数据类。
// **		子功能：	
// **					->控制器『控制器与贴图』
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					
// **					->A主体
// **					->B粒子群弹道
// **					->C随机因子
// **					->D粒子变化
// **					->E粒子重设
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **					
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_MPa_Controller(){
    this.initialize.apply(this, arguments);
};
Drill_MPa_Controller.prototype = Object.create(Drill_COPa_Controller.prototype);
Drill_MPa_Controller.prototype.constructor = Drill_MPa_Controller;
//==============================
// * 控制器 - 初始化
//==============================
Drill_MPa_Controller.prototype.initialize = function( data ){
    Drill_COPa_Controller.prototype.initialize.call( this, data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_MPa_Controller.prototype.drill_controller_update = function(){
    Drill_COPa_Controller.prototype.drill_controller_update.call( this );
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_MPa_Controller.prototype.drill_controller_resetData = function( data ){
    Drill_COPa_Controller.prototype.drill_controller_resetData.call( this, data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_MPa_Controller.prototype.drill_controller_setVisible = function( visible ){
    Drill_COPa_Controller.prototype.drill_controller_setVisible.call( this, visible );
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_MPa_Controller.prototype.drill_controller_setPause = function( pause ){
    Drill_COPa_Controller.prototype.drill_controller_setPause.call( this, pause );
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_MPa_Controller.prototype.drill_controller_destroy = function(){
    Drill_COPa_Controller.prototype.drill_controller_destroy.call( this );
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_MPa_Controller.prototype.drill_MPa_isDead = function(){
	return Drill_COPa_Controller.prototype.drill_controller_isDead.call( this );
};
//##############################
// * 控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_MPa_Controller.prototype.drill_controller_initData = function(){
	Drill_COPa_Controller.prototype.drill_controller_initData.call( this );
	var data = this._drill_data;
	
	// > 贴图
	data['src_img_file'] = "img/Menu__layer/";
	data['trailing_src_img_file'] = "img/Menu__layer/";
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "菜单后面层" };							//贴图 - 所在层级（贴图用）
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };											//贴图 - 图片层级（贴图用）
	
	// > D粒子变化
	data['par_holdingBirthPosition'] = false;															//D粒子变化 - 粒子是否滞留
	
	// > E粒子重设
	if( data['par_birthMode'] == undefined ){ data['par_birthMode'] = "随机出现" };						//E粒子重设 - 粒子出现模式
	if( data['par_birthX'] == undefined ){ data['par_birthX'] = 0 };									//E粒子重设 - 粒子固定点 X
	if( data['par_birthY'] == undefined ){ data['par_birthY'] = 0 };									//E粒子重设 - 粒子固定点 Y
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };							//E粒子重设 - 粒子出现范围
	
	// > F双层效果
	if( data['second_layerIndex'] == undefined ){ data['second_layerIndex'] = "菜单后面层" };			//F双层效果 - 第二层粒子层级
	if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 3 };								//F双层效果 - 第二层粒子图片层级
	
	// > I粒子生命周期
	data['par_lifeType'] = "跳过产生过程";
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_MPa_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_Controller.prototype.drill_controller_initChild.call( this );
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_MPa_Controller.prototype.drill_controller_initAttr = function() {
	Drill_COPa_Controller.prototype.drill_controller_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_MPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
}
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_MPa_Controller.prototype.drill_controller_initBallistics = function() {
	Drill_COPa_Controller.prototype.drill_controller_initBallistics.call( this );
}
//==============================
// * C随机因子 - 初始化子功能
//==============================
Drill_MPa_Controller.prototype.drill_controller_initRandom = function() {
	Drill_COPa_Controller.prototype.drill_controller_initRandom.call( this );
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_MPa_Controller.prototype.drill_controller_initTransform = function() {
	Drill_COPa_Controller.prototype.drill_controller_initTransform.call( this );
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_MPa_Controller.prototype.drill_controller_initReset = function() {
	Drill_COPa_Controller.prototype.drill_controller_initReset.call( this );
}
//==============================
// * E粒子重设 - 帧刷新
//==============================
Drill_MPa_Controller.prototype.drill_controller_updateReset = function() {
	Drill_COPa_Controller.prototype.drill_controller_updateReset.call( this );
}
//==============================
// * E粒子重设 - 判断条件
//==============================
Drill_MPa_Controller.prototype.drill_controller_isParticleDead = function( i ){
	return Drill_COPa_Controller.prototype.drill_controller_isParticleDead.call( this, i );
}
//==============================
// * E粒子重设 - 执行重设 - 位置
//
//			说明：	> 起始点为 一个矩形内随机出现 。
//==============================	
Drill_MPa_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	Drill_COPa_Controller.prototype.drill_controller_resetParticles_Position.call( this, i );
	var data = this._drill_data;
	var cur_iteration = this._drill_parList_randomIteration[i];
	var xx = 0;
	var yy = 0;
	var margin = this.drill_controller_getBitmapMargin();
	var ww = margin['ww'];
	var hh = margin['hh'];
	var ran1 = this.drill_controller_curRandom( cur_iteration*i +41*i );
	var ran2 = this.drill_controller_curRandom( cur_iteration*i +43*i +1000 );
	
	if( data['par_birthMode'] == "随机出现" ){
		xx = Graphics.boxWidth * ran1;
		yy = Graphics.boxHeight * ran2;
	}
	if( data['par_birthMode'] == "左侧出现" ){
		xx = 0 - ww*0.5;
		yy = Graphics.boxHeight * ran2;
	}
	if( data['par_birthMode'] == "右侧出现" ){
		xx = Graphics.boxWidth + ww*0.5;
		yy = Graphics.boxHeight * ran2;
	}
	if( data['par_birthMode'] == "顶部出现" ){
		xx = Graphics.boxWidth * ran1;
		yy = 0 - hh*0.5;
	}
	if( data['par_birthMode'] == "底部出现" ){
		xx = Graphics.boxWidth * ran1;
		yy = Graphics.boxHeight + hh*0.5;
	}
	if( data['par_birthMode'] == "固定点范围出现" ){
		angle = 360 * ran1;
		radius = data['par_birthRange'] * ran2;
		xx = radius * Math.cos( angle *Math.PI/180 );
		yy = radius * Math.sin( angle *Math.PI/180 );
	}
	
	this._drill_parList_x[i] = xx;
	this._drill_parList_y[i] = yy;
}
//==============================
// * F双层效果 - 初始化子功能
//==============================
// * G直线拖尾贴图 - 初始化子功能
//==============================
// * H贴图高宽 - 初始化子功能
//==============================
// * I粒子生命周期 - 初始化子功能
//==============================



//=============================================================================
// ** 粒子贴图【Drill_MPa_Sprite】
// **
// **		作用域：	地图界面
// **		主功能：	定义一个粒子贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					
// **					->A主体
// **					->B粒子群弹道
// **					->C对象绑定
// **					->D粒子变化
// **					->E粒子重设
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 贴图控制 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_MPa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_MPa_Sprite.prototype = Object.create(Drill_COPa_Sprite.prototype);
Drill_MPa_Sprite.prototype.constructor = Drill_MPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_MPa_Sprite.prototype.initialize = function(){
    Drill_COPa_Sprite.prototype.initialize.call( this );
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_MPa_Sprite.prototype.update = function() {
	Drill_COPa_Sprite.prototype.update.call(this);
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_MPa_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行手动初始化。
//##############################
Drill_MPa_Sprite.prototype.drill_sprite_initChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initChild.call( this );
};

//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_MPa_Sprite.prototype.drill_sprite_isReady = function(){
    return Drill_COPa_Sprite.prototype.drill_sprite_isReady.call( this );
};
//##############################
// * 粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_MPa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed.call( this );
};
//##############################
// * 粒子贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_MPa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
    return Drill_COPa_Sprite.prototype.drill_sprite_isNeedDestroy.call( this );
};
//##############################
// * 粒子贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_MPa_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initSelf.call( this );
};
//==============================
// * 粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroySelf.call( this );
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private = function(){
	return Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private.call( this );
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_initAttr = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_MPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
	this.zIndex = this._drill_controller._drill_data['zIndex'];
};
//==============================
// * A主体 - 帧刷新 - 位置
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_updateAttr_Position = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Position.call( this );
};
//==============================
// * A主体 - 帧刷新 - 可见（覆写）
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_updateAttr_Visible = function() {
	var data = this._drill_controller._drill_data;
	this._drill_visible = $gameSystem._drill_MPa_visible[ data['id'] ];
};
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_initBallistics = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initBallistics.call( this );
}
//==============================
// * B粒子群弹道 - 推演弹道
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_refreshBallistics = function( i ){
    Drill_COPa_Sprite.prototype.drill_sprite_refreshBallistics.call( this, i );
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_initTransform = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initTransform.call( this );
}
//==============================
// * D粒子变化 - 帧刷新 - 位置
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
    Drill_COPa_Sprite.prototype.drill_sprite_updateTransform_Position.call( this, i, time );
	
	
	// > 粒子过边界时（直接取余，不要重置）
	var margin = this._drill_controller.drill_controller_getBitmapMargin();
	var ww = margin['ww'];
	var hh = margin['hh'];
	var bww = Graphics.boxWidth + ww*2;
	var bhh = Graphics.boxHeight + hh*2;
	
	// > 边界取余
	this._drill_par_x %= bww;
	this._drill_par_x += bww;
	this._drill_par_x %= bww;
	this._drill_par_x -= ww;
	this._drill_par_y %= bww;
	this._drill_par_y += bww;
	this._drill_par_y %= bww;
	this._drill_par_y -= hh;
	
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_initReset = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initReset.call( this );
}
//==============================
// * F双层效果 - 初始化子功能
//==============================
// * G直线拖尾贴图 - 初始化子功能
//==============================
// * H贴图高宽 - 初始化子功能
//==============================
// * I粒子生命周期 - 初始化子功能
//==============================



//=============================================================================
// ** 粒子贴图（第二层）【Drill_MPa_SecSprite】
// **
// **		作用域：	地图界面
// **		主功能：	定义一个 第二层粒子贴图 。
// **		子功能：	
// **					->贴图（第二层）『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					
// **					->A主体
// **					->B粒子群弹道（无）
// **					->C对象绑定（无）
// **					->D粒子变化
// **					->E粒子重设（无）
// **					->F双层效果（无）
// **					->G直线拖尾贴图（无）
// **					->H贴图高宽（无）
// **					->I粒子生命周期（无）
// **					
// **		说明：	> 第二层粒子与 父贴图 的 D粒子变化 保持一致。
//=============================================================================
//==============================
// * 第二层粒子 - 定义
//==============================
function Drill_MPa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_MPa_SecSprite.prototype = Object.create(Drill_COPa_SecSprite.prototype);
Drill_MPa_SecSprite.prototype.constructor = Drill_MPa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_MPa_SecSprite.prototype.initialize = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.initialize.call( this, parentSprite );
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_MPa_SecSprite.prototype.update = function() {
	Drill_COPa_SecSprite.prototype.update.call(this);
}
//##############################
// * 第二层粒子 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_MPa_SecSprite.prototype.drill_spriteSec_isReady = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_isReady.call(this);
};
//##############################
// * 第二层粒子 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_MPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed.call(this);
};
//##############################
// * 第二层粒子 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_MPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy.call(this);
};
//##############################
// * 第二层粒子 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_MPa_SecSprite.prototype.drill_spriteSec_destroy = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_destroy.call(this);
};
//==============================
// * 第二层粒子 - 初始化子功能『控制器与贴图』
//==============================
Drill_MPa_SecSprite.prototype.drill_spriteSec_initChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initChild.call( this );
};
//==============================
// * 第二层粒子 - 初始化自身『控制器与贴图』
//==============================
Drill_MPa_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initSelf.call( this, parentSprite );
};
//==============================
// * 第二层粒子 - 销毁子功能『控制器与贴图』
//==============================
Drill_MPa_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroyChild.call( this );
};
//==============================
// * 第二层粒子 - 销毁自身『控制器与贴图』
//==============================
Drill_MPa_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroySelf.call( this );
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_MPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private = function(){
	return Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private.call( this );
}

//==============================
// * A主体（第二层） - 初始化子功能
//==============================
Drill_MPa_SecSprite.prototype.drill_spriteSec_initAttr = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initAttr.call( this );
	this.zIndex = this._drill_controller._drill_data['second_zIndex'];
};
//==============================
// * B粒子群弹道（第二层） - 初始化子功能
//==============================
Drill_MPa_SecSprite.prototype.drill_spriteSec_initBallistics = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initBallistics.call( this );
};
//==============================
// * D粒子变化（第二层） - 初始化子功能
//==============================
Drill_MPa_SecSprite.prototype.drill_spriteSec_initTransform = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initTransform.call( this );
}
//==============================
// * D粒子变化（第二层） - 帧刷新 - 位置
//==============================
Drill_MPa_SecSprite.prototype.drill_spriteSec_updateTransform_Position = function( i, time ) {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_updateTransform_Position.call( this, i, time );
	
	
	// > 粒子过边界时（直接取余，不要重置）
	var margin = this._drill_controller.drill_controller_getBitmapMargin();
	var ww = margin['ww'];
	var hh = margin['hh'];
	var bww = Graphics.boxWidth + ww*2;
	var bhh = Graphics.boxHeight + hh*2;
	
	// > 边界取余
	this._drill_parSec_x %= bww;
	this._drill_parSec_x += bww;
	this._drill_parSec_x %= bww;
	this._drill_parSec_x -= ww;
	this._drill_parSec_y %= bww;
	this._drill_parSec_y += bww;
	this._drill_parSec_y %= bww;
	this._drill_parSec_y -= hh;
	
}
//==============================
// * E粒子重设（第二层） - 初始化子功能
//==============================
Drill_MPa_SecSprite.prototype.drill_spriteSec_initReset = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initReset.call( this );
};
//==============================
// * F双层效果（第二层） - 初始化子功能
//==============================
// * G直线拖尾贴图（第二层） - 初始化子功能
//==============================
// * H贴图高宽（第二层） - 初始化子功能
//==============================
// * I粒子生命周期（第二层） - 初始化子功能
//==============================



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_LayerParticle = false;
		var pluginTip = DrillUp.drill_MPa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}





