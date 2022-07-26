//=============================================================================
// Drill_X_ItemImage.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        控件 - 物品+技能详细图片[扩展]
 * @author Drill_up
 * 
 * @Drill_LE_param "资源-物品%d"
 * @Drill_LE_parentKey "----物品%d至%d----"
 * @Drill_LE_var "DrillUp.g_XII_item_list_length"
 * 
 * @Drill_LE_param "资源-武器%d"
 * @Drill_LE_parentKey "----武器%d至%d----"
 * @Drill_LE_var "DrillUp.g_XII_weapon_list_length"
 * 
 * @Drill_LE_param "资源-防具%d"
 * @Drill_LE_parentKey "----防具%d至%d----"
 * @Drill_LE_var "DrillUp.g_XII_armor_list_length"
 * 
 * @Drill_LE_param "资源-技能%d"
 * @Drill_LE_parentKey "----技能%d至%d----"
 * @Drill_LE_var "DrillUp.g_XII_skill_list_length"
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_X_ItemImage +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可以切换 旋转卡牌 的物品/装备/技能的图标。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 但只对指定插件扩展，如果没有使用目标插件，则该插件没有任何效果。
 * 作用于：
 *   - Drill_RotateCard        控件-旋转卡牌★★v1.5及以上★★
 *     可以将目标插件的物品/装备/技能的图标换成高清图片。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于旋转卡牌的 卡面 。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui_card （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui_card文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-物品1
 * 资源-物品2
 * 资源-物品3
 * ……
 *
 * 资源-武器1
 * 资源-武器2
 * 资源-武器3
 * ……
 *
 * 资源-防具1
 * 资源-防具2
 * 资源-防具3
 * ……
 *
 * 资源-技能1
 * 资源-技能2
 * 资源-技能3
 * ……
 *
 *
 * 如果指定的物品/装备/技能没有图片，则使用默认的图标。
 * （目前配置上限：物品200，武器100，防具300，技能300）
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n)
 * 测试方法：   进入物品界面，并进行测试。
 * 测试结果：   菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只在窗口切换物品/技能时，才切换图片，几乎没有消耗。
  
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了图像id错位的bug。
 * [v1.2]
 * 修改了插件的内部结构。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 添加了最大值修改功能，可通过小工具修改最大值。
 * [v1.5]
 * 优化了内部结构。
 *
 *
 * @param ----修改开关----
 * @default 
 *
 * @param 是否修改物品卡牌图像
 * @parent ----修改开关----
 * @type boolean
 * @on 修改
 * @off 不修改
 * @desc true - 修改，false - 不修改。卡牌中的图标将换成指定的物品图像。
 * @default true
 *
 * @param 是否修改武器卡牌图像
 * @parent ----修改开关----
 * @type boolean
 * @on 修改
 * @off 不修改
 * @desc true - 修改，false - 不修改。卡牌中的图标将换成指定的武器图像。
 * @default true
 *
 * @param 是否修改防具卡牌图像
 * @parent ----修改开关----
 * @type boolean
 * @on 修改
 * @off 不修改
 * @desc true - 修改，false - 不修改。卡牌中的图标将换成指定的防具图像。
 * @default true
 *
 * @param 是否修改技能卡牌图像
 * @parent ----修改开关----
 * @type boolean
 * @on 修改
 * @off 不修改
 * @desc true - 修改，false - 不修改。卡牌中的图标将换成指定的技能图像。
 * @default true
 * 
 * 
 * 
 * @param ----物品 1至20----
 * @default 
 *
 * @param 资源-物品1
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品2
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品3
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品4
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品5
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品6
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品7
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品8
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品9
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品10
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品11
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品12
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品13
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品14
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品15
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品16
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品17
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品18
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品19
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品20
 * @parent ----物品 1至20----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----物品21至40----
 * @default 
 *
 * @param 资源-物品21
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品22
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品23
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品24
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品25
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品26
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品27
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品28
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品29
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品30
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品31
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品32
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品33
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品34
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品35
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品36
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品37
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品38
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品39
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品40
 * @parent ----物品21至40----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----物品41至60----
 * @default 
 *
 * @param 资源-物品41
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品42
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品43
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品44
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品45
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品46
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品47
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品48
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品49
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品50
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品51
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品52
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品53
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品54
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品55
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品56
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品57
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品58
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品59
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品60
 * @parent ----物品41至60----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----物品61至80----
 * @default 
 *
 * @param 资源-物品61
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品62
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品63
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品64
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品65
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品66
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品67
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品68
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品69
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品70
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品71
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品72
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品73
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品74
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品75
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品76
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品77
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品78
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品79
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品80
 * @parent ----物品61至80----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----物品81至100----
 * @default 
 *
 * @param 资源-物品81
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品82
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品83
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品84
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品85
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品86
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品87
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品88
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品89
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品90
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品91
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品92
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品93
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品94
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品95
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品96
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品97
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品98
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品99
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品100
 * @parent ----物品81至100----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----物品101至120----
 * @default 
 *
 * @param 资源-物品101
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品102
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品103
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品104
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品105
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品106
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品107
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品108
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品109
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品110
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品111
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品112
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品113
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品114
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品115
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品116
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品117
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品118
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品119
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品120
 * @parent ----物品101至120----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----物品121至140----
 * @default 
 *
 * @param 资源-物品121
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品122
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品123
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品124
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品125
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品126
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品127
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品128
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品129
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品130
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品131
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品132
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品133
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品134
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品135
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品136
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品137
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品138
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品139
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品140
 * @parent ----物品121至140----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----物品141至160----
 * @default 
 *
 * @param 资源-物品141
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品142
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品143
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品144
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品145
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品146
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品147
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品148
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品149
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品150
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品151
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品152
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品153
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品154
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品155
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品156
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品157
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品158
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品159
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品160
 * @parent ----物品141至160----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----物品161至180----
 * @default 
 *
 * @param 资源-物品161
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品162
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品163
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品164
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品165
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品166
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品167
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品168
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品169
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品170
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品171
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品172
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品173
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品174
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品175
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品176
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品177
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品178
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品179
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品180
 * @parent ----物品161至180----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----物品181至200----
 * @default 
 *
 * @param 资源-物品181
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品182
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品183
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品184
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品185
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品186
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品187
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品188
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品189
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品190
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品191
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品192
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品193
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品194
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品195
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品196
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品197
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品198
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品199
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-物品200
 * @parent ----物品181至200----
 * @desc 物品的图片资源。编号对应 数据库>物品 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 *
 *
 * @param ----武器 1至20----
 * @default 
 *
 * @param 资源-武器1
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器2
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器3
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器4
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器5
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器6
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器7
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器8
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器9
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器10
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器11
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器12
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器13
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器14
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器15
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器16
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器17
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器18
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器19
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器20
 * @parent ----武器 1至20----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----武器21至40----
 * @default 
 *
 * @param 资源-武器21
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器22
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器23
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器24
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器25
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器26
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器27
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器28
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器29
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器30
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器31
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器32
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器33
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器34
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器35
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器36
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器37
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器38
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器39
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器40
 * @parent ----武器21至40----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----武器41至60----
 * @default 
 *
 * @param 资源-武器41
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器42
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器43
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器44
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器45
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器46
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器47
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器48
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器49
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器50
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器51
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器52
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器53
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器54
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器55
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器56
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器57
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器58
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器59
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器60
 * @parent ----武器41至60----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----武器61至80----
 * @default 
 *
 * @param 资源-武器61
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器62
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器63
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器64
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器65
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器66
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器67
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器68
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器69
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器70
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器71
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器72
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器73
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器74
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器75
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器76
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器77
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器78
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器79
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器80
 * @parent ----武器61至80----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----武器81至100----
 * @default 
 *
 * @param 资源-武器81
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器82
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器83
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器84
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器85
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器86
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器87
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器88
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器89
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器90
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器91
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器92
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器93
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器94
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器95
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器96
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器97
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器98
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器99
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-武器100
 * @parent ----武器81至100----
 * @desc 武器的图片资源。编号对应 数据库>武器 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 *
 * @param ----防具 1至20----
 * @default 
 *
 * @param 资源-防具1
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具2
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具3
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具4
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具5
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具6
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具7
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具8
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具9
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具10
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具11
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具12
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具13
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具14
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具15
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具16
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具17
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具18
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具19
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具20
 * @parent ----防具 1至20----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具21至40----
 * @default 
 *
 * @param 资源-防具21
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具22
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具23
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具24
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具25
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具26
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具27
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具28
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具29
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具30
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具31
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具32
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具33
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具34
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具35
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具36
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具37
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具38
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具39
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具40
 * @parent ----防具21至40----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具41至60----
 * @default 
 *
 * @param 资源-防具41
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具42
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具43
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具44
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具45
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具46
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具47
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具48
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具49
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具50
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具51
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具52
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具53
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具54
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具55
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具56
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具57
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具58
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具59
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具60
 * @parent ----防具41至60----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具61至80----
 * @default 
 *
 * @param 资源-防具61
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具62
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具63
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具64
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具65
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具66
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具67
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具68
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具69
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具70
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具71
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具72
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具73
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具74
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具75
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具76
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具77
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具78
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具79
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具80
 * @parent ----防具61至80----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具81至100----
 * @default 
 *
 * @param 资源-防具81
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具82
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具83
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具84
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具85
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具86
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具87
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具88
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具89
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具90
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具91
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具92
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具93
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具94
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具95
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具96
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具97
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具98
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具99
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具100
 * @parent ----防具81至100----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具101至120----
 * @default 
 *
 * @param 资源-防具101
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具102
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具103
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具104
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具105
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具106
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具107
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具108
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具109
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具110
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具111
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具112
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具113
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具114
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具115
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具116
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具117
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具118
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具119
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具120
 * @parent ----防具101至120----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具121至140----
 * @default 
 *
 * @param 资源-防具121
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具122
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具123
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具124
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具125
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具126
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具127
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具128
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具129
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具130
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具131
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具132
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具133
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具134
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具135
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具136
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具137
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具138
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具139
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具140
 * @parent ----防具121至140----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具141至160----
 * @default 
 *
 * @param 资源-防具141
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具142
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具143
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具144
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具145
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具146
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具147
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具148
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具149
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具150
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具151
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具152
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具153
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具154
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具155
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具156
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具157
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具158
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具159
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具160
 * @parent ----防具141至160----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具161至180----
 * @default 
 *
 * @param 资源-防具161
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具162
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具163
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具164
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具165
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具166
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具167
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具168
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具169
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具170
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具171
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具172
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具173
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具174
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具175
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具176
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具177
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具178
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具179
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具180
 * @parent ----防具161至180----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具181至200----
 * @default 
 *
 * @param 资源-防具181
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具182
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具183
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具184
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具185
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具186
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具187
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具188
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具189
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具190
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具191
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具192
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具193
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具194
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具195
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具196
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具197
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具198
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具199
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具200
 * @parent ----防具181至200----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具201至220----
 * @default 
 *
 * @param 资源-防具201
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具202
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具203
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具204
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具205
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具206
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具207
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具208
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具209
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具210
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具211
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具212
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具213
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具214
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具215
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具216
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具217
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具218
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具219
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具220
 * @parent ----防具201至220----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具221至240----
 * @default 
 *
 * @param 资源-防具221
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具222
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具223
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具224
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具225
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具226
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具227
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具228
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具229
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具230
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具231
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具232
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具233
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具234
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具235
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具236
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具237
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具238
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具239
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具240
 * @parent ----防具221至240----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具241至260----
 * @default 
 *
 * @param 资源-防具241
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具242
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具243
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具244
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具245
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具246
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具247
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具248
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具249
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具250
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具251
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具252
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具253
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具254
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具255
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具256
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具257
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具258
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具259
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具260
 * @parent ----防具241至260----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具261至280----
 * @default 
 *
 * @param 资源-防具261
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具262
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具263
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具264
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具265
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具266
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具267
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具268
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具269
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具270
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具271
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具272
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具273
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具274
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具275
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具276
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具277
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具278
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具279
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具280
 * @parent ----防具261至280----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----防具281至300----
 * @default 
 *
 * @param 资源-防具281
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具282
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具283
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具284
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具285
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具286
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具287
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具288
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具289
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具290
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具291
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具292
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具293
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具294
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具295
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具296
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具297
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具298
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具299
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-防具300
 * @parent ----防具281至300----
 * @desc 防具的图片资源。编号对应 数据库>防具 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 *
 *
 * @param ----技能 1至20----
 * @default 
 *
 * @param 资源-技能1
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能2
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能3
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能4
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能5
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能6
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能7
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能8
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能9
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能10
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能11
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能12
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能13
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能14
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能15
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能16
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能17
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能18
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能19
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能20
 * @parent ----技能 1至20----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能21至40----
 * @default 
 *
 * @param 资源-技能21
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能22
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能23
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能24
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能25
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能26
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能27
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能28
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能29
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能30
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能31
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能32
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能33
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能34
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能35
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能36
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能37
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能38
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能39
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能40
 * @parent ----技能21至40----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能41至60----
 * @default 
 *
 * @param 资源-技能41
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能42
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能43
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能44
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能45
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能46
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能47
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能48
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能49
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能50
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能51
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能52
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能53
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能54
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能55
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能56
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能57
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能58
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能59
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能60
 * @parent ----技能41至60----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能61至80----
 * @default 
 *
 * @param 资源-技能61
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能62
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能63
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能64
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能65
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能66
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能67
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能68
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能69
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能70
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能71
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能72
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能73
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能74
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能75
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能76
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能77
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能78
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能79
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能80
 * @parent ----技能61至80----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能81至100----
 * @default 
 *
 * @param 资源-技能81
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能82
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能83
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能84
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能85
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能86
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能87
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能88
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能89
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能90
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能91
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能92
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能93
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能94
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能95
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能96
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能97
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能98
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能99
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能100
 * @parent ----技能81至100----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能101至120----
 * @default 
 *
 * @param 资源-技能101
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能102
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能103
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能104
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能105
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能106
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能107
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能108
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能109
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能110
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能111
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能112
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能113
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能114
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能115
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能116
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能117
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能118
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能119
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能120
 * @parent ----技能101至120----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能121至140----
 * @default 
 *
 * @param 资源-技能121
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能122
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能123
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能124
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能125
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能126
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能127
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能128
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能129
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能130
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能131
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能132
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能133
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能134
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能135
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能136
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能137
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能138
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能139
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能140
 * @parent ----技能121至140----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能141至160----
 * @default 
 *
 * @param 资源-技能141
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能142
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能143
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能144
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能145
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能146
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能147
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能148
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能149
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能150
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能151
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能152
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能153
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能154
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能155
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能156
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能157
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能158
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能159
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能160
 * @parent ----技能141至160----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能161至180----
 * @default 
 *
 * @param 资源-技能161
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能162
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能163
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能164
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能165
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能166
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能167
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能168
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能169
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能170
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能171
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能172
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能173
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能174
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能175
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能176
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能177
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能178
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能179
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能180
 * @parent ----技能161至180----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能181至200----
 * @default 
 *
 * @param 资源-技能181
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能182
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能183
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能184
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能185
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能186
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能187
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能188
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能189
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能190
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能191
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能192
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能193
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能194
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能195
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能196
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能197
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能198
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能199
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能200
 * @parent ----技能181至200----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能201至220----
 * @default 
 *
 * @param 资源-技能201
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能202
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能203
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能204
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能205
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能206
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能207
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能208
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能209
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能210
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能211
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能212
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能213
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能214
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能215
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能216
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能217
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能218
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能219
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能220
 * @parent ----技能201至220----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能221至240----
 * @default 
 *
 * @param 资源-技能221
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能222
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能223
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能224
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能225
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能226
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能227
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能228
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能229
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能230
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能231
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能232
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能233
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能234
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能235
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能236
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能237
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能238
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能239
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能240
 * @parent ----技能221至240----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能241至260----
 * @default 
 *
 * @param 资源-技能241
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能242
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能243
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能244
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能245
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能246
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能247
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能248
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能249
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能250
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能251
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能252
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能253
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能254
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能255
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能256
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能257
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能258
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能259
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能260
 * @parent ----技能241至260----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能261至280----
 * @default 
 *
 * @param 资源-技能261
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能262
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能263
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能264
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能265
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能266
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能267
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能268
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能269
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能270
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能271
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能272
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能273
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能274
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能275
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能276
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能277
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能278
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能279
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能280
 * @parent ----技能261至280----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param ----技能281至300----
 * @default 
 *
 * @param 资源-技能281
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能282
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能283
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能284
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能285
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能286
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能287
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能288
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能289
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能290
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能291
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能292
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能293
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能294
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能295
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能296
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能297
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能298
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能299
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-技能300
 * @parent ----技能281至300----
 * @desc 技能的图片资源。编号对应 数据库>技能 的编号。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XII（X_Item_Image）
//		临时全局变量	DrillUp.g_XII_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	菜单界面
//		★性能测试消耗	消耗太小没有找到。
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			旋转卡牌扩展：
//				->修改卡面图像
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.这里为了不影响 this._drill_itemIconSprite，额外加了个 _drill_itemPicSprite 贴图对象。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_ItemImage = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_ItemImage');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_XII_card_item = String(DrillUp.parameters['是否修改物品卡牌图像'] || "true") === "true";
    DrillUp.g_XII_card_weapon = String(DrillUp.parameters['是否修改武器卡牌图像'] || "true") === "true";
    DrillUp.g_XII_card_armor = String(DrillUp.parameters['是否修改防具卡牌图像'] || "true") === "true";
    DrillUp.g_XII_card_skill = String(DrillUp.parameters['是否修改技能卡牌图像'] || "true") === "true";
	
	/*-----------------资源图片------------------*/
	DrillUp.g_XII_item_list_length = 200;
	DrillUp.g_XII_item_list = [];
	for (var i = 0; i < DrillUp.g_XII_item_list_length ; i++ ) {
		DrillUp.g_XII_item_list[i] = String( DrillUp.parameters['资源-物品' + String(i+1) ] || "" );
	};
	DrillUp.g_XII_weapon_list_length = 100;
	DrillUp.g_XII_weapon_list = [];
	for (var i = 0; i < DrillUp.g_XII_weapon_list_length ; i++ ) {
		DrillUp.g_XII_weapon_list[i] = String( DrillUp.parameters['资源-武器' + String(i+1) ] || "" );
	};
	DrillUp.g_XII_armor_list_length = 300;
	DrillUp.g_XII_armor_list = [];
	for (var i = 0; i < DrillUp.g_XII_armor_list_length ; i++ ) {
		DrillUp.g_XII_armor_list[i] = String( DrillUp.parameters['资源-防具' + String(i+1) ] || "" );
	};
	DrillUp.g_XII_skill_list_length = 300;
	DrillUp.g_XII_skill_list = [];
	for (var i = 0; i < DrillUp.g_XII_skill_list_length ; i++ ) {
		DrillUp.g_XII_skill_list[i] = String( DrillUp.parameters['资源-技能' + String(i+1) ] || "" );
	};


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_RotateCard ){


//=============================================================================
// ** 旋转卡牌修改
//=============================================================================
var _drill_XII_refreshImage = Drill_RCardSprite.prototype.drill_refreshImage;
Drill_RCardSprite.prototype.drill_refreshImage = function( item ){
	_drill_XII_refreshImage.call( this, item );
	//alert(JSON.stringify(item));
	
	if( !this._drill_itemPicSprite ){
		this._drill_itemPicSprite = new Sprite();
		this._drill_itemPicSprite.anchor.x = 0.5;
		this._drill_itemPicSprite.anchor.y = 0.5;
		this._drill_front.addChild(this._drill_itemPicSprite);
	}
	this._drill_itemIconSprite.visible = true;
	this._drill_itemPicSprite.visible = false;
	
	// > 物品
	if( DataManager.isItem(item) && DrillUp.g_XII_card_item == true ){
		var file_name = DrillUp.g_XII_item_list[ item.id -1 ];
		if( file_name != "" ){
			this._drill_itemIconSprite.visible = false;
			this._drill_itemPicSprite.visible = true;
			this._drill_itemPicSprite.bitmap = ImageManager.loadBitmap('img/Menu__ui_card/', file_name, 0, true);
		}
	}
	// > 武器
	if( DataManager.isWeapon(item) && DrillUp.g_XII_card_weapon == true ){
		var file_name = DrillUp.g_XII_weapon_list[ item.id -1 ];
		if( file_name != "" ){
			this._drill_itemIconSprite.visible = false;
			this._drill_itemPicSprite.visible = true;
			this._drill_itemPicSprite.bitmap = ImageManager.loadBitmap('img/Menu__ui_card/', file_name, 0, true);
		}
	}
	// > 防具（护甲）
	if( DataManager.isArmor(item) && DrillUp.g_XII_card_armor == true ){
		var file_name = DrillUp.g_XII_armor_list[ item.id -1 ];
		if( file_name != "" ){
			this._drill_itemIconSprite.visible = false;
			this._drill_itemPicSprite.visible = true;
			this._drill_itemPicSprite.bitmap = ImageManager.loadBitmap('img/Menu__ui_card/', file_name, 0, true);
		}
	}
	// > 技能
	if( DataManager.isSkill(item) && DrillUp.g_XII_card_skill == true ){
		var file_name = DrillUp.g_XII_skill_list[ item.id -1 ];
		if( file_name != "" ){
			this._drill_itemIconSprite.visible = false;
			this._drill_itemPicSprite.visible = true;
			this._drill_itemPicSprite.bitmap = ImageManager.loadBitmap('img/Menu__ui_card/', file_name, 0, true);
		}
	}
	
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_X_ItemImage = false;
		alert(
			"【Drill_X_ItemImage.js 控件 - 物品+技能详细图片[扩展]】\n缺少基础插件，去看看插件是不是 未添加 / 被关闭 / 顺序不对 / 版本过低："+
			"\n- Drill_RotateCard 控件-旋转卡牌"
		);
}