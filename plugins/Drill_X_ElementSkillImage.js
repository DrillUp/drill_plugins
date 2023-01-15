//=============================================================================
// Drill_X_ElementSkillImage.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        控件 - 技能块元素的背景图片[扩展]
 * @author Drill_up
 *
 * @help  
 * =============================================================================
 * +++ Drill_X_ElementSkillImage +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 结合技能窗口块元素插件，可以设置不同的技能，拥有不同的背景。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 作用于：
 *   - Drill_WindowSkillElement    主菜单-技能窗口块元素
 *     可以给目标插件中的块元素提供多背景支持，不同的技能设置更多不同背景。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于技能块元素的 块背景 。
 * 2.你可以按照技能卡片的类型设置类型背景。
 * 3.你也可以像物品图片一样，整个技能就是一张高清卡片。
 *  （那样你每个技能都需要一个背景，并且在技能里加注释。）
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 在要修改指定技能的背景中，在技能中添加注释即可：
 *
 * 技能注释：<技能背景:1>
 *
 * 1.技能背景的数字1对应你配置中的第1个技能背景。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui_skillElement （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui_skillElement文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-技能背景1
 * 资源-技能背景2
 * 资源-技能背景3
 * ……
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
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【9.56ms】
 *              菜单界面中，平均消耗为：【8.83ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只做存储图片功能，调用的频率不高，消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件的内部结构。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 * [v1.3]
 * 修改了内部结构。
 *
 *
 * 
 * @param 是否隐藏技能图标
 * @type boolean
 * @on 隐藏
 * @off 不隐藏
 * @desc true - 隐藏，false - 不隐藏。如果你要将每个技能做成一张高清卡片，可以选择隐藏图标。
 * @default false
 *
 * @param ----技能背景 1至20----
 * @default 
 *
 * @param 资源-技能背景1
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景2
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景3
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景4
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景5
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景6
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景7
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景8
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景9
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景10
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景11
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景12
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景13
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景14
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景15
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景16
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景17
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景18
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景19
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景20
 * @parent ----技能背景 1至20----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param ----技能背景21至40----
 * @parent ----技能背景图像----
 * @default 
 *
 * @param 资源-技能背景21
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景22
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景23
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景24
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景25
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景26
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景27
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景28
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景29
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景30
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景31
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景32
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景33
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景34
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景35
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景36
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景37
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景38
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景39
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景40
 * @parent ----技能背景21至40----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param ----技能背景41至60----
 * @parent ----技能背景图像----
 * @default 
 *
 * @param 资源-技能背景41
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景42
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景43
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景44
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景45
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景46
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景47
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景48
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景49
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景50
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景51
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景52
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景53
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景54
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景55
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景56
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景57
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景58
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景59
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景60
 * @parent ----技能背景41至60----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param ----技能背景61至80----
 * @parent ----技能背景图像----
 * @default 
 *
 * @param 资源-技能背景61
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景62
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景63
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景64
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景65
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景66
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景67
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景68
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景69
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景70
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景71
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景72
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景73
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景74
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景75
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景76
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景77
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景78
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景79
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景80
 * @parent ----技能背景61至80----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param ----技能背景81至100----
 * @parent ----技能背景图像----
 * @default 
 *
 * @param 资源-技能背景81
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景82
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景83
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景84
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景85
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景86
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景87
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景88
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景89
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景90
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景91
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景92
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景93
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景94
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景95
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景96
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景97
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景98
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景99
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景100
 * @parent ----技能背景81至100----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param ----技能背景101至120----
 * @parent ----技能背景图像----
 * @default 
 *
 * @param 资源-技能背景101
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景102
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景103
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景104
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景105
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景106
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景107
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景108
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景109
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景110
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景111
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景112
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景113
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景114
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景115
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景116
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景117
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景118
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景119
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景120
 * @parent ----技能背景101至120----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param ----技能背景121至140----
 * @parent ----技能背景图像----
 * @default 
 *
 * @param 资源-技能背景121
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景122
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景123
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景124
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景125
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景126
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景127
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景128
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景129
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景130
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景131
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景132
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景133
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景134
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景135
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景136
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景137
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景138
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景139
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景140
 * @parent ----技能背景121至140----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param ----技能背景141至160----
 * @parent ----技能背景图像----
 * @default 
 *
 * @param 资源-技能背景141
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景142
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景143
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景144
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景145
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景146
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景147
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景148
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景149
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景150
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景151
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景152
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景153
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景154
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景155
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景156
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景157
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景158
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景159
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景160
 * @parent ----技能背景141至160----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param ----技能背景161至180----
 * @parent ----技能背景图像----
 * @default 
 *
 * @param 资源-技能背景161
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景162
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景163
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景164
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景165
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景166
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景167
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景168
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景169
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景170
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景171
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景172
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景173
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景174
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景175
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景176
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景177
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景178
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景179
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景180
 * @parent ----技能背景161至180----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param ----技能背景181至200----
 * @parent ----技能背景图像----
 * @default 
 *
 * @param 资源-技能背景181
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景182
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景183
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景184
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景185
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景186
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景187
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景188
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景189
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景190
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景191
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景192
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景193
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景194
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景195
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景196
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景197
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景198
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景199
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param 资源-技能背景200
 * @parent ----技能背景181至200----
 * @desc 技能背景的图片资源。 
 * @default 
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XESI（X_Element_Skill_Image）
//		临时全局变量	DrillUp.g_XESI_xxx
//		临时局部变量	$gameTemp._drill_XESI_ex_backs
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无（自己的插件方法半重写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	技能面板
//		★性能测试消耗	9.56ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			技能图片扩展：
//				->修改背景
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.技能图片的扩展。
//			  该插件和物品详细不同的是，背景需要一个个注释。
//			（因为一开始是打算按类型添加的，根据id固定死背景，那么按类型配置会非常麻烦。）
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_ElementSkillImage = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_ElementSkillImage');
	
	/*-----------------杂项------------------*/
	DrillUp.g_XESI_hide_icon = String(DrillUp.parameters['是否隐藏技能图标'] || "true") === "true";	
	
	/*-----------------技能背景------------------*/
	DrillUp.g_XESI_back_list_length = 200;
	DrillUp.g_XESI_back_list = [];
	for (var i = 0; i < DrillUp.g_XESI_back_list_length ; i++ ) {
		DrillUp.g_XESI_back_list[i] = String( DrillUp.parameters['资源-技能背景' + String(i+1) ] || "" );
	};
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_WindowSkillElement && ImageManager.load_MenuSkillElement !== undefined ){
	

//=============================================================================
// ** 绘制背景
//=============================================================================
Window_SkillList.prototype.drill_WSE_s_drawBackground = function( cur_bitmap, skill ){
	
	var note = String(skill.note);
	var re_back = /<技能背景:([^<>]*?)>/; 				//正则获取（返回数组，第二个为匹配内容）
	var back = (note.match(re_back)) || [];
	if( back != "" && back != [] && $gameTemp._drill_XESI_ex_backs != null ){
		var back_id = Number(back[1]) -1;
		var back_x = 0;
		var back_y = 0;
		var back_w = $gameTemp._drill_XESI_ex_backs[back_id].width;
		var back_h = $gameTemp._drill_XESI_ex_backs[back_id].height;
		cur_bitmap.blt( $gameTemp._drill_XESI_ex_backs[back_id],  back_x, back_y, back_w, back_h,  0,0, back_w, back_h);
	}else{
		var back_x = 0;
		var back_y = 0;
		var back_w = this._drill_WSE_bitmapBackground.width;
		var back_h = this._drill_WSE_bitmapBackground.height;
		cur_bitmap.blt( this._drill_WSE_bitmapBackground,  back_x, back_y, back_w, back_h,  0,0, back_w, back_h);
	}
	
}
//=============================================================================
// ** 绘制图标
//=============================================================================
var _drill_XESI_s_drawIcon = Window_SkillList.prototype.drill_WSE_s_drawIcon;
Window_SkillList.prototype.drill_WSE_s_drawIcon = function( cur_bitmap, skill ){
	if( DrillUp.g_XESI_hide_icon ){
		
	}else{
		_drill_XESI_s_drawIcon.call(this,cur_bitmap, skill);
	}
}


//=============================================================================
// * mog技能界面 - 塞入drill作用方法
//=============================================================================
if( Imported.MOG_SceneSkill ){
	Window_SkillListM.prototype.drill_WSE_s_drawBackground = Window_SkillList.prototype.drill_WSE_s_drawBackground;
	Window_SkillListM.prototype.drill_WSE_s_drawIcon = Window_SkillList.prototype.drill_WSE_s_drawIcon;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_X_ElementSkillImage = false;
		alert(
			"【Drill_X_ElementSkillImage.js 控件-技能块元素的背景图片[扩展]】\n缺少基础插件，去看看插件是不是 未添加 / 被关闭 / 顺序不对 / 版本过低："+
			"\n- Drill_WindowSkillElement 控件-技能窗口块元素"
		);
}

