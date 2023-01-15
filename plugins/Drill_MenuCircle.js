//=============================================================================
// Drill_MenuCircle.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        主菜单 - 多层菜单魔法圈
 * @author Drill_up
 * 
 * @Drill_LE_param "魔法圈-%d"
 * @Drill_LE_parentKey "---魔法圈%d至%d---"
 * @Drill_LE_var "DrillUp.g_MCi_list_length"
 *
 * @help
 * =============================================================================
 * +++ Drill_MenuCircle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在任意菜单界面中放置一个或者多个魔法圈。
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
 *   (2.魔法圈对一些自带背景的菜单插件可能不起作用，因为有些插件自己
 *      设置了底图，会把菜单的功能覆盖掉。
 * 效果：
 *   (1.魔法圈可以通过缩放/斜切设置简单类似3d的效果。
 * 设计：
 *   (1.你可以在同一个菜单里面加入非常多的魔法圈。
 *      结合 旋转速度/魔法圈遮罩 制作出不同的动态效果。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__layer （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 魔法圈1 资源-魔法圈
 * 魔法圈2 资源-魔法圈
 * 魔法圈3 资源-魔法圈
 * ……
 *
 * 所有素材都放在Menu__layer文件夹下。
 * 你可以在同一个菜单里面加入非常多的不同种类的魔法圈。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制菜单魔法圈的显示情况：
 * 
 * 插件指令：>菜单魔法圈 : 魔法圈[1] : 显示
 * 插件指令：>菜单魔法圈 : 魔法圈[1] : 隐藏
 *
 * 1.数字表示魔法圈对应配置的编号。
 * 2.魔法圈没有默认，都是一个个贴在指定菜单中的。
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
 * 测试结果：   菜单界面中，魔法圈的消耗为：【7.18ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.魔法圈相当于单张运动+自旋转的图片，消耗不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了魔法圈3d效果处理的功能。
 * 使得你可以通过插件指令控制魔法圈的显示。
 * [v1.2]
 * 规范了插件指令设置。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 优化了内部结构，修改了插件指令格式。
 * 添加了魔法圈遮罩功能。
 * [v1.5]
 * 优化了内部结构。
 * 旋转速度单位改为 角度/帧。
 * [v1.6]
 * 优化了旧存档的识别与兼容。
 *
 *
 * @param ---魔法圈组 1至20---
 * @default
 *
 * @param 魔法圈-1
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-2
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-3
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-4
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-5
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-6
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-7
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-8
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-9
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-10
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-11
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-12
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-13
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-14
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-15
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-16
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-17
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-18
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-19
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-20
 * @parent ---魔法圈组 1至20---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组21至40---
 * @default
 *
 * @param 魔法圈-21
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-22
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-23
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-24
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-25
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-26
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-27
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-28
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-29
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-30
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-31
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-32
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-33
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-34
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-35
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-36
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-37
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-38
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-39
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-40
 * @parent ---魔法圈组21至40---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组41至60---
 * @default
 *
 * @param 魔法圈-41
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-42
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-43
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-44
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-45
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-46
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-47
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-48
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-49
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-50
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-51
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-52
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-53
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-54
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-55
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-56
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-57
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-58
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-59
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-60
 * @parent ---魔法圈组41至60---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈组61至80---
 * @default
 *
 * @param 魔法圈-61
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-62
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-63
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-64
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-65
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-66
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-67
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-68
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-69
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-70
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-71
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-72
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-73
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-74
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-75
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-76
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-77
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-78
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-79
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈-80
 * @parent ---魔法圈组61至80---
 * @type struct<MenuCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 */
/*~struct~MenuCircle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新菜单魔法圈==
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
 * @param 资源-魔法圈
 * @parent ---贴图---
 * @desc 魔法圈的图片资源。
 * @default (需配置)菜单魔法圈
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 资源-魔法圈遮罩
 * @parent ---贴图---
 * @desc 魔法圈遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 平移-魔法圈 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最左边。
 * @default 0
 *
 * @param 平移-魔法圈 Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。0为圈的圆心贴在最上面。
 * @default 0
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
 * @param 旋转速度
 * @parent ---贴图---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 1.5
 *
 * @param 菜单层级
 * @parent ---贴图---
 * @type select
 * @option 菜单后面层
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 背景所属的菜单层级。
 * @default 0
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 4
 * 
 * @param ---3d效果---
 * @desc 
 * 
 * @param 缩放 X
 * @parent ---3d效果---
 * @desc 魔法圈的缩放X值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 缩放 Y
 * @parent ---3d效果---
 * @desc 魔法圈的缩放Y值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 斜切 X
 * @parent ---3d效果---
 * @desc 魔法圈的斜切X值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 斜切 Y
 * @parent ---3d效果---
 * @desc 魔法圈的斜切Y值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MCi（Menu_Circle）
//		临时全局变量	DrillUp.g_MCi_xxx
//		临时局部变量	this._drill_MCi_xxx
//		存储数据变量	$gameSystem._drill_MCi_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)
//		★性能测试因素	主菜单界面
//		★性能测试消耗	7.18ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			菜单魔法圈：
//				->菜单层级
//				->显示/隐藏
//				->魔法圈遮罩
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.插件结构并不复杂，但是坑多，需要理清楚下面变量的关系：
//				DrillUp.g_MCi_list			获取的值（80个）
//				this._drill_MCi_dataTank	符合的值（小于80个，不要将数组二者混合使用）
//				this._drill_MCi_spriteTank		符合的图片（小于80个）
//				temp_sprite			临时图片
//				temp_sprite_data	临时的值
//	
//				_drill_MCi_spriteChildTank	用于存储魔法圈图片信息，因为图片经过了 旋转 和 斜切 两层图片处理。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuCircle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MenuCircle');
	
	//==============================
	// * 变量获取 - 魔法圈
	//				（~struct~MenuCircle）
	//==============================
	DrillUp.drill_MCi_circleInit = function( dataFrom ) {
		var data = {};
		
		// > 绑定
		data['menu'] = String( dataFrom["所属菜单"] || "");
		data['menu_key'] = String( dataFrom["自定义关键字"] || "");
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-魔法圈"] || "");
		data['src_img_mask'] = String( dataFrom["资源-魔法圈遮罩"] || "");
		data['x'] = Number( dataFrom["平移-魔法圈 X"] || 0);
		data['y'] = Number( dataFrom["平移-魔法圈 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['rotate'] = Number( dataFrom["旋转速度"] || 0.0);
		data['menu_index'] = Number( dataFrom["菜单层级"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 3d效果
		data['scale_x'] = Number( dataFrom["缩放 X"] || 1.0);
		data['scale_y'] = Number( dataFrom["缩放 Y"] || 1.0);
		data['skew_x'] = Number( dataFrom["斜切 X"] || 0);
		data['skew_y'] = Number( dataFrom["斜切 Y"] || 0);
		
		return data;
	}
	
	/*-----------------魔法圈------------------*/
	DrillUp.g_MCi_list_length = 80;
	DrillUp.g_MCi_list = [];
	for (var i = 0; i < DrillUp.g_MCi_list_length; i++) {
		if( DrillUp.parameters["魔法圈-" + String(i+1) ] != undefined &&
			DrillUp.parameters["魔法圈-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["魔法圈-" + String(i+1) ]);
			DrillUp.g_MCi_list[i] = DrillUp.drill_MCi_circleInit( temp );
			DrillUp.g_MCi_list[i]['id'] = Number(i)+1;
		}else{
			DrillUp.g_MCi_list[i] = null;		//（强制设为空值，节约存储资源）
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
var _drill_MCi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MCi_pluginCommand.call(this, command, args);
	if( command === ">菜单魔法圈" ){
		if(args.length == 4){
			var temp1 = String(args[1]);
			temp1 = temp1.replace("魔法圈[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			var type = String(args[3]);
			if (type === '显示') {
				$gameSystem._drill_MCi_visible[temp1] = true;
			}
			if (type === '隐藏') {
				$gameSystem._drill_MCi_visible[temp1] = false;
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
DrillUp.g_MCi_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MCi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MCi_sys_initialize.call(this);
	this.drill_MCi_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MCi_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MCi_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MCi_saveEnabled == true ){	
		$gameSystem.drill_MCi_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MCi_initSysData();
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
Game_System.prototype.drill_MCi_initSysData = function() {
	this.drill_MCi_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MCi_checkSysData = function() {
	this.drill_MCi_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MCi_initSysData_Private = function() {
	
	this._drill_MCi_visible = [];
	for(var i = 0; i< DrillUp.g_MCi_list.length ;i++){
		var temp_data = DrillUp.g_MCi_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_MCi_visible[i] = temp_data['visible'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MCi_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MCi_visible == undefined ){
		this.drill_MCi_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_MCi_list.length; i++ ){
		var temp_data = DrillUp.g_MCi_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_MCi_visible[i] == undefined ){
				this._drill_MCi_visible[i] = temp_data['visible'];
			
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
Scene_MenuBase.prototype.drill_MCi_layerAddSprite = function( sprite, layer_index ){
    this.drill_MCi_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 菜单层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_MenuBase.prototype.drill_MCi_layerRemoveSprite = function( sprite ){
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
Scene_MenuBase.prototype.drill_MCi_sortByZIndex = function () {
    this.drill_MCi_sortByZIndex_Private();
}
//=============================================================================
// ** 菜单层级（接口实现）
//=============================================================================
//==============================
// * 菜单层级 - 最顶层
//==============================
var _drill_MCi_menuLayer_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MCi_menuLayer_update.call(this);
	
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
Scene_MenuBase.prototype.drill_MCi_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单层级 - 添加贴图到层级（私有）
//==============================
Scene_MenuBase.prototype.drill_MCi_layerAddSprite_Private = function( sprite, layer_index ){
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
var _drill_MCi_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	
	// > 魔法圈初始化
	SceneManager._drill_MCi_created = false;	
   	this._drill_MCi_spriteTank = [];
   	this._drill_MCi_spriteChildTank = [];
   	this._drill_MCi_dataTank = [];
	
	// > 菜单后面层
	_drill_MCi_createBackground.call(this);
};
//==============================
// ** 菜单 - 退出界面
//==============================
var _drill_MCi_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_MCi_terminate.call(this);			//（下次进入界面需重新创建）
	SceneManager._drill_MCi_created = false;
};

//==============================
// * 菜单 - 帧刷新
//==============================
var _drill_MCi_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MCi_update.call(this);
		
	// > 要求载入完毕后 创建
	if( SceneManager.isCurrentSceneStarted() && 
		SceneManager._drill_MCi_created != true ){
		this.drill_MCi_create();
	}
	// > 帧刷新
	if( SceneManager._drill_MCi_created == true ){
		this.drill_MCi_update();
	}
};

//=============================================================================
// ** 魔法圈
//=============================================================================
//==============================
// * 魔法圈 - 创建
//==============================
Scene_MenuBase.prototype.drill_MCi_create = function() {	
	SceneManager._drill_MCi_created = true;
	
	if(!this._drill_MCi_spriteTank){	//防止覆写报错 - 贴图初始化
		this._drill_MCi_spriteTank = [];		//（数组元素不允许出现null值）
		this._drill_MCi_spriteChildTank = [];	//（数组元素不允许出现null值）
		this._drill_MCi_dataTank = [];			//（数组元素不允许出现null值）
	}
	
	// > 配置的魔法圈
	for (var i = 0; i < DrillUp.g_MCi_list.length; i++) {
		var temp_data = DrillUp.g_MCi_list[i];
		if( temp_data == undefined ){ continue; }
		
		if( this.drill_MCi_checkKeyword( temp_data ) ){
			// > 魔法圈贴图
			var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));			//深拷贝数据（杜绝引用造成的修改）
			
			var temp_sprite_bitmap = new Sprite(ImageManager.load_MenuLayer(temp_sprite_data['src_img']));
			temp_sprite_bitmap.anchor.x = 0.5;
			temp_sprite_bitmap.anchor.y = 0.5;
			this._drill_MCi_spriteChildTank.push(temp_sprite_bitmap);
			
			var temp_sprite = new Sprite();
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.x = temp_sprite_data['x'];
			temp_sprite.y = temp_sprite_data['y'];
			temp_sprite.opacity = temp_sprite_data['opacity'];
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.scale.x = temp_sprite_data['scale_x'];
			temp_sprite.scale.y = temp_sprite_data['scale_y'];
			temp_sprite.skew.x = temp_sprite_data['skew_x'];
			temp_sprite.skew.y = temp_sprite_data['skew_y'];
			temp_sprite.visible = $gameSystem._drill_MCi_visible[i] || false;
			temp_sprite.addChild(temp_sprite_bitmap);
			
			this._drill_MCi_spriteTank.push(temp_sprite);
			this._drill_MCi_dataTank.push(temp_sprite_data);
			
			// > 魔法圈父级
			var temp_layer = new Sprite();
			temp_layer.addChild(temp_sprite);
			temp_layer.zIndex = temp_sprite_data['zIndex'];
			
			// > 魔法圈遮罩
			if( temp_sprite_data['src_img_mask'] != "" ){
				var temp_mask = new Sprite(ImageManager.load_MenuLayer(temp_sprite_data['src_img_mask']));
				temp_layer.addChild(temp_mask);
				temp_layer.mask = temp_mask;
			}
			
			this.drill_MCi_layerAddSprite( temp_layer, temp_sprite_data['menu_index'] );
		}
	}
	this.drill_MCi_sortByZIndex();
};

//==============================
// * 魔法圈 - 检查位置
//==============================
Scene_MenuBase.prototype.drill_MCi_checkKeyword = function( temp_sprite_data ){
	
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
// * 魔法圈 - 帧刷新
//==============================
Scene_MenuBase.prototype.drill_MCi_update = function() {
	for (var i = 0; i < this._drill_MCi_spriteChildTank.length; i++) {
		this._drill_MCi_spriteChildTank[i].rotation += this._drill_MCi_dataTank[i]['rotate'] /180*Math.PI;
	};
};


