//=============================================================================
// Drill_MenuParticle.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        主菜单 - 多层菜单粒子
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子-%d"
 * @Drill_LE_parentKey "---粒子组%d至%d---"
 * @Drill_LE_var "DrillUp.g_MPa_style_length"
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
 * 必须基于核心插件才能运行。
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
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
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
 * 粒子1 资源-粒子
 * 粒子2 资源-粒子
 * 粒子3 资源-粒子
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 启用/禁用
 * 你可以通过插件指令控制菜单粒子的启用情况：
 * 
 * 插件指令：>菜单粒子 : 粒子[3] : 启用
 * 插件指令：>菜单粒子 : 粒子[3] : 禁用
 * 插件指令：>菜单粒子 : 批量粒子[3,4] : 启用
 * 插件指令：>菜单粒子 : 批量粒子[3,4] : 禁用
 * 
 * 插件指令：>菜单粒子 : 默认粒子 : 启用
 * 插件指令：>菜单粒子 : 默认粒子 : 禁用
 * 插件指令：>菜单粒子 : 默认粒子 : 复制样式 : 粒子[3]
 * 插件指令：>菜单粒子 : 默认粒子 : 还原样式
 * 
 * 1.默认粒子作用于所有菜单界面。
 *   你可以"复制样式"，来修改默认粒子的样式。
 * 2. 启用/禁用 与 显示/隐藏，是两个不同开关，可以叠加使用。
 *   只要其中一个为禁用或隐藏，那么贴图就不会显示。
 *
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟修改单属性
 * 你可以通过插件指令手动延迟修改各个属性：
 * 
 * 插件指令：>菜单粒子 : 粒子[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子变量[21] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 批量粒子[7,8] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 批量粒子变量[21,22] : 隐藏(延迟) : 延迟执行时间[20]
 * 
 * 插件指令：>菜单粒子 : 粒子[11] : 显示(延迟) : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 暂停(延迟) : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 继续(延迟) : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 切换混合模式(延迟)[0] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 切换菜单层级(延迟)[菜单前面层] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 切换图片层级(延迟)[10] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 修改单属性(延迟) : 透明度[255] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 修改单属性(延迟) : 透明度变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 修改单属性(延迟) : 旋转[90] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 修改单属性(延迟) : 旋转变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 修改单属性(延迟) : 缩放X[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 修改单属性(延迟) : 缩放X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 修改单属性(延迟) : 缩放Y[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 修改单属性(延迟) : 缩放Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 还原所有单属性(延迟) : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 清空菜单的延迟指令列表
 * 
 * 1.前半部分（粒子变量[21]）和 后半部分（隐藏(延迟) : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有4*17种组合方式。
 * 2."变量%["表示该变量修改属性值时，会缩小100倍。因为变量只能存整数。
 *   比如缩放的变量值为120时，则表示赋值： 120 / 100 = 1.2。
 * 3.由于菜单界面中无法执行插件指令，所以指令会暂存到列表中。
 *   每进入到菜单界面一次，指令都会生效一次。
 *   插件指令在地图界面中预先执行，进入到菜单界面之后，延迟时间才开始计时。
 *   "清空菜单的延迟指令列表"可以清空排在列表中的所有"粒子[11]"的延迟指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟移动到
 * 你可以通过插件指令手动设置延迟移动：
 * 
 * 插件指令：>菜单粒子 : 粒子[11] : 移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 移动到(延迟)-匀速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 移动到(延迟)-弹性移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 移动到(延迟)-弹性移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 移动到(延迟)-增减速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 移动到(延迟)-增减速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 移动到(延迟)-延迟归位 : 延迟执行时间[20]
 * 
 * 1.前半部分（粒子[11]）和 后半部分（移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有4*7种组合方式。
 * 2.由于菜单界面中无法执行插件指令，所以指令会暂存到列表中。
 *   每进入到菜单界面一次，指令都会生效一次。
 *   插件指令在地图界面中预先执行，进入到菜单界面之后，延迟时间才开始计时。
 *   "清空菜单的延迟指令列表"可以清空排在列表中的所有"粒子[11]"的延迟指令。
 *
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期修改单属性
 * 上述的插件指令中，部分插件指令可以周期执行：
 * 
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子变量[21] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 批量粒子[7,8] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 批量粒子变量[21,22] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-显示(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-暂停(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-继续(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-切换混合模式(周期)[0] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-切换菜单层级(周期)[菜单前面层] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-切换图片层级(周期)[10] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-修改单属性(周期) : 透明度[255] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-修改单属性(周期) : 透明度变量[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-修改单属性(周期) : 旋转[90] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-修改单属性(周期) : 旋转变量[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-修改单属性(周期) : 缩放X[1.2] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-修改单属性(周期) : 缩放X变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-修改单属性(周期) : 缩放Y[1.2] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-修改单属性(周期) : 缩放Y变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-还原所有单属性(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 清空菜单的周期指令列表
 * 
 * 1.前半部分（粒子[11]）和 后半部分（ 添加周期-隐藏(周期) ）
 *   的参数可以随意组合。一共有4*17种组合方式。
 * 2."添加周期"后，指令会根据"周期时长"和"开始时间"，持续循环执行。
 *   你可以塞入多条周期指令，每个周期指令控制不同的属性，实现复杂的变换效果。
 * 3."变量%["表示该变量修改属性值时，会缩小100倍。因为变量只能存整数。
 *   比如缩放的变量值为120时，则表示赋值： 120 / 100 = 1.2。
 * 4.由于菜单界面中无法执行插件指令，所以指令会暂存到列表中。
 *   每进入到菜单界面一次，指令都会生效一次。
 *   "清空菜单的周期指令列表"可以清空排在列表中的所有"粒子[11]"的周期指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期移动到
 * 上述的插件指令中，移动到的插件指令也可以周期执行：
 * 
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-移动到(周期)-匀速移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-移动到(周期)-匀速移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-移动到(周期)-弹性移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-移动到(周期)-弹性移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-移动到(周期)-增减速移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-移动到(周期)-增减速移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 添加周期-移动到(周期)-执行归位 : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>菜单粒子 : 粒子[11] : 清空菜单的周期指令列表
 * 
 * 1.前半部分（粒子[11]）和 后半部分（ 添加周期-移动到(周期)-匀速移动 ）
 *   的参数可以随意组合。一共有4*8种组合方式。
 * 2.由于菜单界面中无法执行插件指令，所以指令会暂存到列表中。
 *   每进入到菜单界面一次，指令都会生效一次。
 *   "清空菜单的周期指令列表"可以清空排在列表中的所有"粒子[11]"的周期指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期的延迟
 * 上述的插件指令中，可以设置：
 * 
 * 插件指令：>菜单粒子 : 粒子[11] : 暂停周期指令(延迟) : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 继续周期指令(延迟) : 延迟执行时间[20]
 * 插件指令：>菜单粒子 : 粒子[11] : 清空周期指令(延迟) : 延迟执行时间[20]
 * 
 * 1.前半部分（粒子[11]）和 后半部分（ 暂停周期指令(延迟) : 延迟执行时间[20] ）
 *   的参数可以随意组合。一共有4*3种组合方式。
 * 2.注意，周期指令添加后，就开始循环了，
 *   你如果一开始不想立即执行，可以使用"暂停周期指令"，而后再"继续周期指令(延迟)"。
 * 3.注意，没有"添加周期(延迟)"的功能，
 *   只能一次性添加，不能并行延迟添加，这样是为了防止过度设计。
 * 4.如果一个装饰贴图真的有 两套周期指令，（比如先周期放大后周期缩小）
 *   那你应该考虑把它合并成一套，增加周期时长，修改周期内开始时间；
 *   或者使用两个不同的装饰贴图，分别执行不同周期指令，然后通过延迟指令显示隐藏贴图。
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
 * [v2.0]
 * 整理改进了内部结构。
 * [v2.1]
 * 再次改进了结构。
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
 *
 * @param ---绑定---
 * @default 
 *
 * @param 初始是否启用
 * @parent ---绑定---
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc true - 启用，false - 禁用
 * @default true
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
 * @param 是否预加载
 * @parent ---贴图---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍去看看："1.系统 > 关于预加载.docx"。
 * @default false
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
 * @desc 此参数可以看看："0.基本定义 > 混合模式.docx"。pixi的渲染混合模式。0-普通,1-发光,2-实色混合,3-浅色,4-叠加。
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
 * @default (需配置)直线拖尾贴图
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
 * @param 是否预加载
 * @parent ---贴图---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍去看看："1.系统 > 关于预加载.docx"。
 * @default false
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
 * @desc 此参数可以看看："0.基本定义 > 混合模式.docx"。pixi的渲染混合模式。0-普通,1-发光,2-实色混合,3-浅色,4-叠加。
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
 * @default (需配置)直线拖尾贴图
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		MPa（Menu_Particle）
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
//				->『变换特性-粒子贴图』
//					x->修改单属性
//					x->移动到
//					x->获取属性
//					x->修改中心锚点
//					->延迟修改单属性（中转）
//					->延迟移动到（中转）
//					->周期修改单属性（中转）
//					->周期移动到（中转）
//				x->其它特性
//			->☆预加载
//			->☆存储数据
//			->☆菜单层级
//			
//			->☆贴图创建标记
//			->☆贴图控制
//				->不考虑销毁情况
//			->☆中转指令容器
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
//			17.主菜单 > 多层组合装饰（界面装饰）（脚本）.docx
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
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@    /@@@@@@    /@@@@@@  │
//			  │  /@@__  @@  /@@__  @@  /@@__  @@ │
//			  │ | @@  \ @@ | @@  \ @@ |__/  \ @@ │
//			  │ | @@  | @@ | @@  | @@    /@@@@@/ │
//			  │ | @@  | @@ | @@  | @@   |___  @@ │
//			  │ | @@  | @@ | @@  | @@  /@@  \ @@ │
//			  │ |  @@@@@@/ |  @@@@@@/ |  @@@@@@/ │
//			  │  \______/   \______/   \______/  │
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
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_MPa_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_MPa_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_MenuParticle = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MenuParticle');
	
	//==============================
	// * 静态数据 - 粒子
	//				（~struct~MenuParticle）
	//==============================
	DrillUp.drill_MPa_particleInit = function( dataFrom ){
		var data = {};
		
		// > 绑定
		data['enable'] = String( dataFrom["初始是否启用"] || "true") == "true";
		data['menu'] = String( dataFrom["所属菜单"] || "");
		data['menu_key'] = String( dataFrom["自定义关键字"] || "");
		
		
		// > 控制器
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_mask'] = String( dataFrom["资源-粒子遮罩"] || "");
		data['src_img_file'] = "img/Menu__layer/";
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		data['x'] = 0;
		data['y'] = 0;
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = String( dataFrom["菜单层级"] || "菜单后面层");
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
		data['second_layerIndex'] = String( dataFrom["第二层粒子菜单层级"] || "菜单后面层");
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
	//==============================
	// * 静态数据 - 默认粒子
	//				（~struct~MenuParticleDefault）
	//==============================
	DrillUp.drill_MPa_particleDefaultInit = function( dataFrom ){
		var data = {};
		
		// > 控制器
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_mask'] = String( dataFrom["资源-粒子遮罩"] || "");
		data['src_img_file'] = "img/Menu__layer/";
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		data['x'] = 0;
		data['y'] = 0;
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		//data['layerIndex'] = String( dataFrom["菜单层级"] || "菜单后面层");
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
		data['second_layerIndex'] = String( dataFrom["第二层粒子菜单层级"] || "菜单后面层");
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
	/*-----------------默认粒子------------------*/
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
	DrillUp.g_MPa_style_length = 80;
	DrillUp.g_MPa_style = [];
	DrillUp.g_MPa_style[0] = DrillUp.g_MPa_default;
	for( var i = 1; i <= DrillUp.g_MPa_style_length; i++ ){
		if( DrillUp.parameters["粒子-" + String(i) ] != undefined &&
			DrillUp.parameters["粒子-" + String(i) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["粒子-" + String(i) ]);
			DrillUp.g_MPa_style[i] = DrillUp.drill_MPa_particleInit( temp );
			DrillUp.g_MPa_style[i]['id'] = Number(i);
		}else{
			DrillUp.g_MPa_style[i] = undefined;		//（设为空值，节约静态数据占用容量）
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
	DrillUp.drill_MPa_globalPluginCommand( command, args, this );
}
//==============================
// * 插件指令 - 『作用全局的插件指令』
//
//			参数：	> command 字符串
//					> args 字符串列表
//					> gameInterpreter 解释器对象
//
//			说明：	> 该函数不能有 this 对象。
//					> 该函数不依赖解释器对象，gameInterpreter 可以为 null。函数可跨界面调用。
//==============================
DrillUp.drill_MPa_globalPluginCommand = function( command, args, gameInterpreter ){
	if( command === ">菜单粒子" ){
		
		if( args.length == 4 ){
			var unit = String(args[1]);
			var type = String(args[3]);
			
			var style_id_list = [];
			if( unit == "默认粒子" ){
				style_id_list.push( 0 );
			}else if( unit.indexOf("批量粒子[") != -1 ){
				unit = unit.replace("批量粒子[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var style_id = Number(temp_arr[k]);	//（有默认样式，不需要-1）
					style_id_list.push( style_id );
				}
			}else{
				unit = unit.replace("粒子[","");
				unit = unit.replace("]","");
				var style_id = Number(unit);			//（有默认样式，不需要-1）
				style_id_list.push( style_id );
			}
			
			if( type === "启用" || type === "显示" ){
				for(var i = 0; i < style_id_list.length; i++ ){
					$gameSystem._drill_MPa_enableTank[ Number(style_id_list[i]) ] = true;
				}
				return;
			}
			if( type === "禁用" || type === "隐藏" ){
				for(var i = 0; i < style_id_list.length; i++ ){
					$gameSystem._drill_MPa_enableTank[ Number(style_id_list[i]) ] = false;
				}
				return;
			}
			if( type === "还原样式" ){
				if( style_id_list.length > 0 && style_id_list[0] == 0 ){
					$gameSystem._drill_MPa_defaultStyleId = 0;
				}
				return;
			}
		}
		if( args.length == 6 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1 === "默认粒子" && type === "复制样式" ){
				temp2 = temp2.replace("粒子[","");
				temp2 = temp2.replace("]","");
				$gameSystem._drill_MPa_defaultStyleId = Number(temp2);
				return;
			}
		}
		
		/*-----------------对象组获取------------------*/
		var controller_id_list = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( controller_id_list == null && unit.indexOf("批量粒子[") != -1 ){
				unit = unit.replace("批量粒子[","");
				unit = unit.replace("]","");
				controller_id_list = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = Number(temp_arr[k]);
					controller_id_list.push( controller_id -1 );
				}
			}
			if( controller_id_list == null && unit.indexOf("批量粒子变量[") != -1 ){
				unit = unit.replace("批量粒子变量[","");
				unit = unit.replace("]","");
				controller_id_list = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = $gameVariables.value(Number(temp_arr[k]));
					controller_id_list.push( controller_id -1 );
				}
			}
			if( controller_id_list == null && unit.indexOf("粒子变量[") != -1 ){
				unit = unit.replace("粒子变量[","");
				unit = unit.replace("]","");
				var controller_id = $gameVariables.value(Number(unit));
				controller_id_list = [];
				controller_id_list.push( controller_id -1 );
			}
			if( controller_id_list == null && unit.indexOf("粒子[") != -1 ){
				unit = unit.replace("粒子[","");
				unit = unit.replace("]","");
				var controller_id = Number(unit);
				controller_id_list = [];
				controller_id_list.push( controller_id -1 );
			}
		}
		if( controller_id_list == null ){ return; }
		
		/*-----------------2B延迟指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "清空菜单的延迟指令列表" ){
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_clearDelayingCommand( controller_id_list[k] );
				}
			}
		}
		//if( args.length == 6 ){
		//	var type = String(args[3]);
		//	var delay_time = String(args[5]);
		//	if( type == "全部延迟指令增加延迟" ){
		//		//...（此功能用不上）
		//	}
		//}
		if( args.length == 6 ){
			var type = String(args[3]);
			var delay_time = String(args[5]);
			if( type == "显示(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setVisible, [true], delay_time
					);
				}
			}
			if( type == "隐藏(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setVisible, [false], delay_time
					);
				}
			}
			if( type == "暂停(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setPause, [true], delay_time
					);
				}
			}
			if( type == "继续(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setPause, [false], delay_time
					);
				}
			}
			if( type == "暂停周期指令(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_periodizeCommand_setPause, [true], delay_time
					);
				}
			}
			if( type == "继续周期指令(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_periodizeCommand_setPause, [false], delay_time
					);
				}
			}
			if( type == "清空周期指令(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_periodizeCommand_clear, [], delay_time
					);
				}
			}
			
			if( type.indexOf("切换混合模式(延迟)[") != -1 ){
				type = type.replace("切换混合模式(延迟)[","");
				type = type.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setBlendMode, [Number(type)], delay_time
					);
				}
			}
			if( type.indexOf("切换菜单层级(延迟)[") != -1 ){
				type = type.replace("切换菜单层级(延迟)[","");
				type = type.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setLayerIndex, [String(type)], delay_time
					);
				}
			}
			if( type.indexOf("切换图片层级(延迟)[") != -1 ){
				type = type.replace("切换图片层级(延迟)[","");
				type = type.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setZIndex, [Number(type)], delay_time
					);
				}
			}
			if( type == "还原所有单属性(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreAttr, [], delay_time
					);
				}
			}
			if( type == "移动到(延迟)-延迟归位" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreMove, [], delay_time
					);
				}
			}
		}
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var delay_time = String(args[9]);
			if( type == "修改单属性(延迟)" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setOpacity, 
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setRotate,
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleX,
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleY,
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
			}
			if( type == "移动到(延迟)-匀速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove,
							[ "匀速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
			if( type == "移动到(延迟)-弹性移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove,
							[ "弹性变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
			if( type == "移动到(延迟)-增减速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addDelayingCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove,
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
		}
		
		/*-----------------2C周期指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "清空菜单的周期指令列表" ){
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_clearPeriodizeCommand( controller_id_list[k] );
				}
			}
		}
		if( args.length == 8 ){
			var type = String(args[3]);
			var time_period = String(args[5]);
			var time_start = String(args[7]);
			if( type == "添加周期-显示(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setVisible, [true], time_period, time_start
					);
				}
			}
			if( type == "添加周期-隐藏(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setVisible, [false], time_period, time_start
					);
				}
			}
			if( type == "添加周期-暂停(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setPause, [true], time_period, time_start
					);
				}
			}
			if( type == "添加周期-继续(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setPause, [false], time_period, time_start
					);
				}
			}
			if( type.indexOf("添加周期-切换混合模式(周期)[") != -1 ){
				type = type.replace("添加周期-切换混合模式(周期)[","");
				type = type.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setBlendMode, [Number(type)], time_period, time_start
					);
				}
			}
			if( type.indexOf("添加周期-切换菜单层级(周期)[") != -1 ){
				type = type.replace("添加周期-切换菜单层级(周期)[","");
				type = type.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setLayerIndex, [String(type)], time_period, time_start
					);
				}
			}
			if( type.indexOf("添加周期-切换图片层级(周期)[") != -1 ){
				type = type.replace("添加周期-切换图片层级(周期)[","");
				type = type.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_setZIndex, [Number(type)], time_period, time_start
					);
				}
			}
			if( type == "添加周期-还原所有单属性(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreAttr, [], time_period, time_start
					);
				}
			}
			if( type == "添加周期-移动到(周期)-执行归位" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controller_id_list.length; k++ ){
					$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
						Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreMove, [], time_period, time_start
					);
				}
			}
		}
		if( args.length == 12 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var time_period = String(args[9]);
			var time_start = String(args[11]);
			if( type == "添加周期-修改单属性(周期)" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setOpacity, 
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setRotate,
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleX,
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleY,
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
			}
			if( type == "添加周期-移动到(周期)-匀速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove,
							[ "匀速变化", num_list[0], num_list[1], Number(temp2) ], time_period, time_start
						);
					}
				}
			}
			if( type == "添加周期-移动到(周期)-弹性移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove,
							[ "弹性变化", num_list[0], num_list[1], Number(temp2) ], time_period, time_start
						);
					}
				}
			}
			if( type == "添加周期-移动到(周期)-增减速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = DrillUp.drill_MPa_getArgNumList(temp1);
					for( var k=0; k < controller_id_list.length; k++ ){
						$gameSystem.drill_MPa_sys_addPeriodizeCommand( controller_id_list[k],
							Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove,
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], time_period, time_start
						);
					}
				}
			}
		}
		
	}
};
//==============================
// * 插件指令 - 获取方括号中的数字
//
//			参数：	> arg_str 字符串
//			返回：	> 数字数组
//
//			说明：	> 能获取到字符串中的数字，且包含 变量 转换情况。
//==============================
DrillUp.drill_MPa_getArgNumList = function( arg_str ){
	var arr = arg_str.match( /([^\[]+)\[([^\]]+)\]/ );
	if( arr != undefined && arr.length >= 3 ){
	// > 有方括号
		var data_name = arr[1];
		var data_list = arr[2].split(",");
		var result_list = [];
		
		if( data_name.contains("变量%") ){	//（将变量值赋值给目标，需要*0.01）
			for(var i=0; i < data_list.length; i++){ result_list.push( $gameVariables.value(Number(data_list[i]))*0.01 ); }
			return result_list;
		}else if( data_name.contains("变量") ){
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


//=============================================================================
// ** ☆预加载
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 初始化
//==============================
var _drill_MPa_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_MPa_preload_initialize.call(this);
	this.drill_MPa_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_MPa_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_MPa_preloadInit = function(){
	this._drill_MPa_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_MPa_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_MPa_style.length; i++ ){
		var temp_data = DrillUp.g_MPa_style[i];
		if( temp_data == undefined ){ continue; }			//『控制器与贴图的样式-』 - 校验+直接跳出（预加载）
		if( temp_data['preload'] != true ){ continue; }
		
		this._drill_MPa_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img'], 0, true, this._drill_MPa_cacheId ) 
		);
		this._drill_MPa_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['second_src_img'], 0, true, this._drill_MPa_cacheId ) 
		);
		this._drill_MPa_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['trailing_src_img_file'], temp_data['trailing_src_img'], 0, true, this._drill_MPa_cacheId ) 
		);
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
	
	this._drill_MPa_defaultStyleId = 0;				//默认样式
	this._drill_MPa_enableTank = [];				//启用/禁用
	for( var i = 0; i < DrillUp.g_MPa_style.length ;i++){
		var temp_data = DrillUp.g_MPa_style[i];
		if( temp_data == undefined ){ continue; }	//『控制器与贴图的样式-』 - 校验+直接跳出（只存visible）
		this._drill_MPa_enableTank[i] = temp_data['enable'];
	}
	
	this._drill_MPa_DelayingCommandTank = [];		//中转指令容器（延时指令）
	this._drill_MPa_PeriodizeCommandTank = [];		//中转指令容器（周期指令）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MPa_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MPa_enableTank == undefined ){
		this.drill_MPa_initSysData();
	}
	
	// > 容器的 空数据 检查
	for( var i = 0; i < DrillUp.g_MPa_style.length; i++ ){
		var temp_data = DrillUp.g_MPa_style[i];		//『控制器与贴图的样式-』 - 校验+直接跳出（存储数据检查）
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_MPa_enableTank[i] == undefined ){
				this._drill_MPa_enableTank[i] = temp_data['enable'];
			
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
			if( this.__drill_zIndex == undefined ){ return 20250701; }	//（如果未定义则放最上面）
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
//==============================
Scene_MenuBase.prototype.drill_MPa_layerAddSprite_Private = function( sprite, layer_index ){
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
var _drill_MPa_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	
	// > 粒子初始化
   	this._drill_MPa_spriteTankOrg = [];
   	this._drill_MPa_spriteTankSec = [];
   	this._drill_MPa_controllerTank = [];
	SceneManager._drill_MPa_created = false;
	
	// > 原函数
	_drill_MPa_createBackground.call(this);
};
//==============================
// * 贴图创建标记 - 退出界面
//==============================
var _drill_MPa_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_MPa_terminate.call(this);
	SceneManager._drill_MPa_created = false;	//（下次进入界面需重新创建）
};
//==============================
// * 贴图创建标记 - 帧刷新
//==============================
var _drill_MPa_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MPa_update.call(this);
	
	// > 要求载入完毕后 创建
	//		（创建过程放在update，是为了确保其他修改了_backgroundSprite底图的菜单界面，也能被覆盖函数，能被装饰到）
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
// * 贴图控制 - 检查位置
//==============================
Scene_MenuBase.prototype.drill_MPa_checkKeyword = function( temp_data ){
	
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
Scene_MenuBase.prototype.drill_MPa_create = function() {	
	SceneManager._drill_MPa_created = true;
	
	// > 防止报错
	if( this._drill_MPa_spriteTankOrg == undefined ){
		this._drill_MPa_spriteTankOrg = [];
	}
	if( this._drill_MPa_spriteTankSec == undefined ){
		this._drill_MPa_spriteTankSec = [];
	}
	if( this._drill_MPa_controllerTank == undefined ){
		this._drill_MPa_controllerTank = [];
	}
	
	// > 配置的数据
	var temp_count = 0;
	for( var i = 1; i < DrillUp.g_MPa_style.length; i++ ){
		var temp_data = DrillUp.g_MPa_style[i];
		if( temp_data == undefined ){ continue; }		//『控制器与贴图的样式-』 - 校验+直接跳出
		
		// > 配置的数据 - 检查位置
		if( this.drill_MPa_checkKeyword( temp_data ) != true ){ continue; }
		temp_count += 1;
		
		// > 配置的数据 - 检查启用
		if( $gameSystem._drill_MPa_enableTank[ i ] === false ){ continue; }
		
		// > 创建控制器
		var temp_controller = new Drill_MPa_Controller( temp_data ); //『控制器与贴图的样式-』 - 创建控制器
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
	
	// > 配置的默认数据
	if( temp_count == 0 ){
		var i = $gameSystem._drill_MPa_defaultStyleId;
		var temp_data = DrillUp.g_MPa_style[i];
		if( temp_data == undefined ){ return; }			//『控制器与贴图的样式-』 - 校验+直接跳出
		
		// > 配置的数据 - 检查启用
		if( $gameSystem._drill_MPa_enableTank[ 0 ] === false ){ return; }
	
		// > 创建控制器
		var temp_controller = new Drill_MPa_Controller( temp_data ); //『控制器与贴图的样式-』 - 创建控制器
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
// ** ☆中转指令容器
//			
//			说明：	> 此模块管理 中转指令容器。
//					  实现进入菜单后执行指令的操作，仅限 延时指令/周期指令。
//					> 字符串（插件指令） 》 数组数据（中转指令容器） 》 控制器函数（延时指令/周期指令）
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 中转指令容器 - 加入延时指令（开放函数）
//==============================
Game_System.prototype.drill_MPa_sys_addDelayingCommand = function( controller_id, method, paramList, delay_time ){
	/*
		该函数用于中转，进入菜单界面后（这时候才创建controller），
		才执行 controller.drill_controller_setDelayingCommand( method, paramList, delay_time );
	*/
	if( this._drill_MPa_DelayingCommandTank[controller_id] == undefined ){
		this._drill_MPa_DelayingCommandTank[controller_id] = [];  //（注意，控制器内还能放多条指令）
	}
	var method_data = {};
	method_data['method'] = method;
	method_data['paramList'] = paramList;
	method_data['delay_time'] = delay_time;
	this._drill_MPa_DelayingCommandTank[controller_id].push( method_data );
};
//==============================
// * 中转指令容器 - 清空延时指令（开放函数）
//==============================
Game_System.prototype.drill_MPa_sys_clearDelayingCommand = function( controller_id ){
	this._drill_MPa_DelayingCommandTank[controller_id] = undefined;
};
//==============================
// * 中转指令容器 - 加入周期指令（开放函数）
//==============================
Game_System.prototype.drill_MPa_sys_addPeriodizeCommand = function( controller_id, method, paramList, time_period, time_start ){
	/*
		该函数用于中转，进入菜单界面后（这时候才创建controller），
		才执行 controller.drill_controller_setPeriodizeCommand( method, paramList, time_period, time_start );
	*/
	if( this._drill_MPa_PeriodizeCommandTank[controller_id] == undefined ){
		this._drill_MPa_PeriodizeCommandTank[controller_id] = [];  //（注意，控制器内还能放多条指令）
	}
	var method_data = {};
	method_data['method'] = method;
	method_data['paramList'] = paramList;
	method_data['time_period'] = time_period;
	method_data['time_start'] = time_start;
	this._drill_MPa_PeriodizeCommandTank[controller_id].push( method_data );
};
//==============================
// * 中转指令容器 - 清空周期指令（开放函数）
//==============================
Game_System.prototype.drill_MPa_sys_clearPeriodizeCommand = function( controller_id ){
	this._drill_MPa_PeriodizeCommandTank[controller_id] = undefined;
};
//==============================
// * 中转指令容器 - 控制器初始化
//==============================
var _drill_MPa_MPa_create = Scene_MenuBase.prototype.drill_MPa_create;
Scene_MenuBase.prototype.drill_MPa_create = function() {
	_drill_MPa_MPa_create.call(this);
	
	for( var i = 0; i < this._drill_MPa_controllerTank.length; i++ ){
		var controller = this._drill_MPa_controllerTank[i];
		var controller_id = controller._drill_data_id -1;	//（注意，因为有默认样式在，所以对齐指令容器要-1）
		
		// > 延时指令
		var delayingCommand_tank = $gameSystem._drill_MPa_DelayingCommandTank[ controller_id ];
		if( delayingCommand_tank != undefined ){
			for( var j = 0; j < delayingCommand_tank.length; j++ ){
				var delayingCommand = delayingCommand_tank[j];
				if( delayingCommand == undefined ){ continue; }
				controller.drill_controller_setDelayingCommand(
					delayingCommand['method'], delayingCommand['paramList'], delayingCommand['delay_time']
				);
			}
		}
		
		// > 周期指令
		var periodizeCommand_tank = $gameSystem._drill_MPa_PeriodizeCommandTank[ controller_id ];
		if( periodizeCommand_tank != undefined ){
			for( var j = 0; j < periodizeCommand_tank.length; j++ ){
				var periodizeCommand = periodizeCommand_tank[j];
				if( periodizeCommand == undefined ){ continue; }
				controller.drill_controller_setPeriodizeCommand(
					periodizeCommand['method'], periodizeCommand['paramList'], periodizeCommand['time_period'], periodizeCommand['time_start']
				);
			}
		}
	}
};



//=============================================================================
// ** 粒子控制器【Drill_MPa_Controller】
// **		
// **		作用域：	菜单界面
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
// **					->2A指令叠加变化『变换特性-粒子贴图』
// **						> 主体贴图-移动到
// **						> 主体贴图-透明度
// **						> 粒子贴图组-旋转
// **						> 粒子贴图组-缩放X
// **						> 粒子贴图组-缩放Y
// **					->2B延迟指令
// **					->2C周期指令
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
	this._drill_data_id = data['id'];							//样式ID（控制器与样式 多对一 或 一对一）
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
	this.drill_controller_updateDelayingCommandImportant();		//帧刷新 - 2B延迟指令 - 时间流逝
	this.drill_controller_updatePeriodizeCommandImportant();	//帧刷新 - 2C周期指令 - 时间流逝
    Drill_COPa_Controller.prototype.drill_controller_update.call( this );
	this.drill_controller_updateCommandChange();				//帧刷新 - 2A指令叠加变化
	this.drill_controller_updateDelayingCommand();				//帧刷新 - 2B延迟指令 - 执行延迟指令
	this.drill_controller_updatePeriodizeCommand();				//帧刷新 - 2C周期指令 - 执行延迟指令
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
//==============================
// * 控制器 - 函数枚举
//
//			说明：	> 使用枚举要比字符串比较快很多，适用于大量 延迟指令、周期指令 。
//==============================
Drill_MPa_Controller.METHOD__drill_controller_setVisible                   = 11;
Drill_MPa_Controller.METHOD__drill_controller_setPause                     = 12;
Drill_MPa_Controller.METHOD__drill_controller_periodizeCommand_setPause    = 13;
Drill_MPa_Controller.METHOD__drill_controller_periodizeCommand_clear       = 14;

Drill_MPa_Controller.METHOD__drill_controller_setBlendMode                 = 21;
Drill_MPa_Controller.METHOD__drill_controller_setLayerIndex                = 22;
Drill_MPa_Controller.METHOD__drill_controller_setZIndex                    = 23;

Drill_MPa_Controller.METHOD__drill_controller_commandChange_setOpacity     = 31;
Drill_MPa_Controller.METHOD__drill_controller_commandChange_setRotate      = 34;

Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleX      = 41;
Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleY      = 42;
Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreAttr    = 45;

Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove        = 51;
Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreMove    = 52;

//##############################
// * A主体 - 切换混合模式【标准函数】
//
//			参数：	> blendMode 数字
//			返回：	> 无
//##############################
Drill_MPa_Controller.prototype.drill_controller_setBlendMode = function( blendMode ){
	var data = this._drill_data;
	data['blendMode'] = blendMode;
};
//##############################
// * A主体 - 切换菜单层级【标准函数】
//
//			参数：	> layerIndex 字符串
//			返回：	> 无
//##############################
Drill_MPa_Controller.prototype.drill_controller_setLayerIndex = function( layerIndex ){
	var data = this._drill_data;
	data['layerIndex'] = layerIndex;
};
//##############################
// * A主体 - 切换图片层级【标准函数】
//
//			参数：	> zIndex 数字
//			返回：	> 无
//##############################
Drill_MPa_Controller.prototype.drill_controller_setZIndex = function( zIndex ){
	var data = this._drill_data;
	data['zIndex'] = zIndex;
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
	
	// > 2A指令叠加变化（无）
	
	// > 2B延迟指令（无）
	
	// > 2C周期指令（无）
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_MPa_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_Controller.prototype.drill_controller_initChild.call( this );
	this.drill_controller_initCommandChange();		//初始化子功能 - 2A指令叠加变化
	this.drill_controller_initDelayingCommand();	//初始化子功能 - 2B延迟指令
	this.drill_controller_initPeriodizeCommand();	//初始化子功能 - 2C周期指令
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

//==============================
// * 2A指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_MPa_Controller.prototype.drill_controller_initCommandChange = function(){
	
	// > 控制器参数 - 移动到
	this["_drill_command_move_data"] = undefined;
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	
	// > 控制器参数 - 缩放X
	this["_drill_command_scaleX_data"] = undefined;
	// > 控制器参数 - 缩放Y
	this["_drill_command_scaleY_data"] = undefined;
	
}
//==============================
// * 2A指令叠加变化 - 帧刷新
//==============================
Drill_MPa_Controller.prototype.drill_controller_updateCommandChange = function(){
	
	// > 帧刷新 - 移动到（二维弹道）
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_update( this, "_drill_command_move_data" );
	
	// > 帧刷新 - 透明度
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_opacity_data" );
	
	// > 帧刷新 - 旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_rotate_data" );
	
	// > 帧刷新 - 缩放X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_scaleX_data" );
	// > 帧刷新 - 缩放Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_scaleY_data" );
	
}
//==============================
// * 2A指令叠加变化 - 立即还原所有单属性
//==============================
Drill_MPa_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
	// > 控制器参数 - 移动到
	//	（这里不含）
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	
	// > 控制器参数 - 缩放X
	this["_drill_command_scaleX_data"] = undefined;
	// > 控制器参数 - 缩放Y
	this["_drill_command_scaleY_data"] = undefined;
}
//==============================
// * 2A指令叠加变化 - 立即归位
//==============================
Drill_MPa_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = undefined;
}
//==============================
// * 2A指令叠加变化 - 修改单属性 - 移动到
//==============================
Drill_MPa_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", 0, 0,		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
}
//==============================
// * 2A指令叠加变化 - 修改单属性 - 透明度
//==============================
Drill_MPa_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * 2A指令叠加变化 - 修改单属性 - 旋转
//==============================
Drill_MPa_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", 0,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * 2A指令叠加变化 - 修改单属性 - 缩放X
//==============================
Drill_MPa_Controller.prototype.drill_controller_commandChange_setScaleX = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleX_data", 1,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * 2A指令叠加变化 - 修改单属性 - 缩放Y
//==============================
Drill_MPa_Controller.prototype.drill_controller_commandChange_setScaleY = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", 1,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}

//==============================
// * 2B延迟指令 - 初始化子功能
//==============================
Drill_MPa_Controller.prototype.drill_controller_initDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}
//==============================
// * 2B延迟指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_MPa_Controller.prototype.drill_controller_updateDelayingCommandImportant = function(){
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
			
			if( method == Drill_MPa_Controller.METHOD__drill_controller_setPause ){
				this.drill_controller_setPause( paramList[0] );
			}else if( method == Drill_MPa_Controller.METHOD__drill_controller_periodizeCommand_setPause ){  //暂停周期指令(延迟)
				this.drill_controller_periodizeCommand_setPause( paramList[0] );
			}else if( method == Drill_MPa_Controller.METHOD__drill_controller_periodizeCommand_clear ){  //清空周期指令(延迟)
				this.drill_controller_periodizeCommand_clear();
			}
		}
	}
}
//==============================
// * 2B延迟指令 - 帧刷新 - 执行延迟指令
//==============================
Drill_MPa_Controller.prototype.drill_controller_updateDelayingCommand = function(){
	if( this._drill_curDelayingCommandTank.length == 0 ){ return; }
	
	// > 执行延迟指令
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			var method = dc_data['method'];
			var paramList = dc_data['paramList'];
			
			switch( method ){
				case Drill_MPa_Controller.METHOD__drill_controller_setVisible:
					this.drill_controller_setVisible( paramList[0] );
					break;
				
				case Drill_MPa_Controller.METHOD__drill_controller_setBlendMode:
					this.drill_controller_setBlendMode( paramList[0] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_setLayerIndex:
					this.drill_controller_setLayerIndex( paramList[0] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_setZIndex:
					this.drill_controller_setZIndex( paramList[0] );
					break;
				
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setOpacity:
					this.drill_controller_commandChange_setOpacity( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setRotate:
					this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
					break;
					
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleX:
					this.drill_controller_commandChange_setScaleX( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleY:
					this.drill_controller_commandChange_setScaleY( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreAttr:
					this.drill_controller_commandChange_restoreAttr();
					break;
				
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove:
					this.drill_controller_commandChange_setMove( paramList[0], paramList[1], paramList[2], paramList[3] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreMove:
					this.drill_controller_commandChange_restoreMove();
					break;
				
				default:
					break;
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
// * 2B延迟指令 - 设置指令（开放函数）
//==============================
Drill_MPa_Controller.prototype.drill_controller_setDelayingCommand = function( method, paramList, delay_time ){
	var enable = false;
	switch( method ){
		case Drill_MPa_Controller.METHOD__drill_controller_setVisible:
		case Drill_MPa_Controller.METHOD__drill_controller_setPause:
		case Drill_MPa_Controller.METHOD__drill_controller_periodizeCommand_setPause:
		case Drill_MPa_Controller.METHOD__drill_controller_periodizeCommand_clear:
		
		case Drill_MPa_Controller.METHOD__drill_controller_setBlendMode:
		case Drill_MPa_Controller.METHOD__drill_controller_setLayerIndex:
		case Drill_MPa_Controller.METHOD__drill_controller_setZIndex:
		
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setOpacity:
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setRotate:
		
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleX:
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleY:
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreAttr:
		
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove:
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreMove:
			enable = true;
			break;
		
		default:
			break;
	}
	if( enable == false ){ return; }
	
	var dc_data = {};
	dc_data['method'] = method;
	dc_data['paramList'] = paramList;
	dc_data['left_time'] = delay_time;
	this._drill_curDelayingCommandTank.push( dc_data );
}
//==============================
// * 2B延迟指令 - 增加延迟（开放函数）
//==============================
Drill_MPa_Controller.prototype.drill_controller_addDelayingTime = function( time ){
	if( isNaN(time) ){ return; }
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		dc_data['left_time'] += Number( time );
	}
}
//==============================
// * 2B延迟指令 - 清空全部（开放函数）
//==============================
Drill_MPa_Controller.prototype.drill_controller_clearDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}


//==============================
// * 2C周期指令 - 初始化子功能
//==============================
Drill_MPa_Controller.prototype.drill_controller_initPeriodizeCommand = function(){
	this._drill_curPeriodizeCommandTank = [];
	this._drill_periodizeCommand_pause = undefined;				//暂停周期指令
	this._drill_periodizeCommand_waitAndPauseTime = undefined;	//一次性计时器（暂停周期指令-周期末尾时）
	this._drill_periodizeCommand_waitAndClearTime = undefined;	//一次性计时器（清空周期指令-周期末尾时）
}
//==============================
// * 2C周期指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_MPa_Controller.prototype.drill_controller_updatePeriodizeCommandImportant = function(){
	if( this._drill_curPeriodizeCommandTank.length == 0 ){ return; }
	
	// > 暂停周期指令
	if( this._drill_periodizeCommand_pause == true ){ return; }
	
	// > 一次性计时器
	if( this._drill_periodizeCommand_waitAndPauseTime !== undefined ){
		this._drill_periodizeCommand_waitAndPauseTime -= 1;
		if( this._drill_periodizeCommand_waitAndPauseTime == 0 ){
			this.drill_controller_periodizeCommand_setPause(true);  //（暂停周期指令-周期末尾时）
		}
	}
	if( this._drill_periodizeCommand_waitAndClearTime !== undefined ){
		this._drill_periodizeCommand_waitAndClearTime -= 1;
		if( this._drill_periodizeCommand_waitAndClearTime == 0 ){
			this.drill_controller_periodizeCommand_clear();  //（清空周期指令-周期末尾时）
		}
	}
	
	
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
			
			if( method == Drill_MPa_Controller.METHOD__drill_controller_setPause ){
				this.drill_controller_setPause( paramList[0] );
			}
		}
	}
}
//==============================
// * 2C周期指令 - 帧刷新 - 执行周期指令
//==============================
Drill_MPa_Controller.prototype.drill_controller_updatePeriodizeCommand = function(){
	if( this._drill_curPeriodizeCommandTank.length == 0 ){ return; }
	
	// > 执行周期指令
	for(var i = 0; i < this._drill_curPeriodizeCommandTank.length; i++ ){
		var pc_data = this._drill_curPeriodizeCommandTank[i];
		var time =  pc_data['cur_time'] % pc_data['time_period'];
		if( time == pc_data['time_start'] ){
			var method = pc_data['method'];
			var paramList = pc_data['paramList'];
			
			switch( method ){
				case Drill_MPa_Controller.METHOD__drill_controller_setVisible:
					this.drill_controller_setVisible( paramList[0] );
					break;
				
				case Drill_MPa_Controller.METHOD__drill_controller_setBlendMode:
					this.drill_controller_setBlendMode( paramList[0] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_setLayerIndex:
					this.drill_controller_setLayerIndex( paramList[0] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_setZIndex:
					this.drill_controller_setZIndex( paramList[0] );
					break;
				
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setOpacity:
					this.drill_controller_commandChange_setOpacity( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setRotate:
					this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
					break;
					
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleX:
					this.drill_controller_commandChange_setScaleX( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleY:
					this.drill_controller_commandChange_setScaleY( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreAttr:
					this.drill_controller_commandChange_restoreAttr();
					break;
				
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove:
					this.drill_controller_commandChange_setMove( paramList[0], paramList[1], paramList[2], paramList[3] );
					break;
				case Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreMove:
					this.drill_controller_commandChange_restoreMove();
					break;
				
				default:
					break;
			}
		}
	}
	
}
//==============================
// * 2C周期指令 - 设置指令（开放函数）
//==============================
Drill_MPa_Controller.prototype.drill_controller_setPeriodizeCommand = function( method, paramList, time_period, time_start ){
	var enable = false;
	switch( method ){
		case Drill_MPa_Controller.METHOD__drill_controller_setVisible:
		case Drill_MPa_Controller.METHOD__drill_controller_setPause:
		
		case Drill_MPa_Controller.METHOD__drill_controller_setBlendMode:
		case Drill_MPa_Controller.METHOD__drill_controller_setLayerIndex:
		case Drill_MPa_Controller.METHOD__drill_controller_setZIndex:
		
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setOpacity:
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setRotate:
		
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleX:
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setScaleY:
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreAttr:
		
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_setMove:
		case Drill_MPa_Controller.METHOD__drill_controller_commandChange_restoreMove:
			enable = true;
			break;
		
		default:
			break;
	}
	if( enable == false ){ return; }
	
	var pc_data = {};
	pc_data['method'] = method;
	pc_data['paramList'] = paramList;
	pc_data['time_period'] = time_period;
	pc_data['time_start'] = time_start;
	pc_data['cur_time'] = -1;			//（时间先+1后判断，所以取-1）
	this._drill_curPeriodizeCommandTank.push( pc_data );
}
//==============================
// * F周期指令 - 获取 周期剩余时间（开放函数）
//==============================
Drill_MPa_Controller.prototype.drill_controller_periodizeCommand_getWaitAndClearTime = function(){
	if( this._drill_curPeriodizeCommandTank.length == 0 ){ return 0; }
	var pc_data = this._drill_curPeriodizeCommandTank[0];				//（只取第一个周期指令的时间）
	var cur_period_time = pc_data['cur_time'] % pc_data['time_period'];	//（周期内的当前时间）
	return pc_data['time_period'] - cur_period_time;					//（周期内的剩余时间）
}
//==============================
// * F周期指令 - 暂停周期指令-立刻（开放函数）
//==============================
Drill_MPa_Controller.prototype.drill_controller_periodizeCommand_setPause = function( enabled ){
	this._drill_periodizeCommand_pause = enabled;				//（暂停周期指令）
	this.drill_controller_setPause( enabled );					//（暂停变换）
	this._drill_periodizeCommand_waitAndPauseTime = undefined;	//（删除 一次性计时器）
}
//==============================
// * F周期指令 - 暂停周期指令-周期末尾时（开放函数）
//==============================
Drill_MPa_Controller.prototype.drill_controller_periodizeCommand_waitAndPause = function(){
	this._drill_periodizeCommand_waitAndPauseTime = this.drill_controller_periodizeCommand_getWaitAndClearTime();
}
//==============================
// * F周期指令 - 清空周期指令-立刻（开放函数）
//==============================
Drill_MPa_Controller.prototype.drill_controller_periodizeCommand_clear = function(){
	this._drill_curPeriodizeCommandTank = [];
	this._drill_periodizeCommand_waitAndClearTime = undefined;	//（删除 一次性计时器）
}
//==============================
// * F周期指令 - 清空周期指令-周期末尾时（开放函数）
//==============================
Drill_MPa_Controller.prototype.drill_controller_periodizeCommand_waitAndClear = function(){
	this._drill_periodizeCommand_waitAndClearTime = this.drill_controller_periodizeCommand_getWaitAndClearTime();
}



//=============================================================================
// ** 粒子贴图【Drill_MPa_Sprite】
// **
// **		作用域：	菜单界面
// **		主功能：	定义一个粒子贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					
// **					->A贴图主体
// **					->B粒子群弹道
// **					->C对象绑定
// **					->D粒子变化
// **					->E粒子重设
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **					
// **					->2A指令叠加变化-控制器用
// **					->2B延迟指令
// **					->2C周期指令
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
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	this.drill_sprite_updateCommandChange();		//帧刷新 - 2A指令叠加变化-控制器用
													//帧刷新 - 2B延迟指令（无）
													//帧刷新 - 2C周期指令（无）
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
	this.drill_sprite_initCommandChange();		//初始化子功能 - 2A指令叠加变化-控制器用
	this.drill_sprite_initDelayingCommand();	//初始化子功能 - 2B延迟指令
	this.drill_sprite_initPeriodizeCommand();	//初始化子功能 - 2C周期指令
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
// * A贴图主体 - 初始化子功能
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_initAttr = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initAttr.call( this );
	/*
		贴图的层级如下：
			- 主体贴图（this）
			- - 粒子贴图组（_drill_COPa_parSpriteTank）
			- - 直线拖尾贴图组（_drill_COPa_trailingSpriteTank）
	*/
	
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_MPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
	this.zIndex = this._drill_controller._drill_data['zIndex'];
};
//==============================
// * A贴图主体 - 帧刷新 - 位置
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_updateAttr_Position = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Position.call( this );
};
//==============================
// * A贴图主体 - 帧刷新 - 可见（覆写）
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_updateAttr_Visible = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Visible.call( this );
	if( $gameSystem._drill_MPa_enableTank[ this._drill_data_id ] === false ){
		this._drill_visible = false;
	}	//（如果已经创建，则设置禁用后立即不显示）
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

//==============================
// * 2A指令叠加变化-控制器用 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 贴图部分。
//					> 之所以把代码放这里，是因为 控制器-贴图 一对一，且可以节约弹道计算的存储空间。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_initCommandChange = function(){
	
	// > 贴图参数 - 移动到
	this["_drill_command_move_spriteData"] = undefined;
	
	// > 贴图参数 - 透明度
	this["_drill_command_opacity_spriteData"] = undefined;
	
	// > 贴图参数 - 旋转
	this["_drill_command_rotate_spriteData"] = undefined;
	
	// > 贴图参数 - 缩放X
	this["_drill_command_scaleX_spriteData"] = undefined;
	// > 贴图参数 - 缩放Y
	this["_drill_command_scaleY_spriteData"] = undefined;
}
//==============================
// * 2A指令叠加变化-控制器用 - 帧刷新
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_updateCommandChange = function(){
	var data = this._drill_controller._drill_data;
	var controller = this._drill_controller;
	
	// > 移动到 - 帧刷新
	var CDataName = "_drill_command_move_data";
	var SDataName = "_drill_command_move_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动到 - 贴图赋值
	if( controller[CDataName] != undefined ){
		this.x += controller[CDataName]['cur_valueA'];
		this.y += controller[CDataName]['cur_valueB'];
		//for(var i = 0; i < data['par_count']; i++ ){
		//	var par_sprite = this._drill_COPa_parSpriteTank[i];	//（修改所有粒子的移动）
		//	par_sprite.x += controller[CDataName]['cur_valueA'];
		//	par_sprite.y += controller[CDataName]['cur_valueB'];
		//}
	}
	
	
	// > 透明度 - 帧刷新
	var CDataName = "_drill_command_opacity_data";
	var SDataName = "_drill_command_opacity_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 透明度 - 贴图赋值（覆盖）
	if( controller[CDataName] != undefined ){
		this.opacity = controller[CDataName]['cur_value'];
	}
	
	
	// > 旋转 - 帧刷新
	var CDataName = "_drill_command_rotate_data";
	var SDataName = "_drill_command_rotate_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 旋转 - 控制器赋值
	if( controller[CDataName] != undefined ){
		for(var i = 0; i < data['par_count']; i++ ){
			var par_sprite = this._drill_COPa_parSpriteTank[i];	//（修改所有粒子的旋转）
			par_sprite.rotation += controller[CDataName]['cur_value'] *Math.PI /180;
		}
	}
	
	
	// > 缩放X - 帧刷新
	var CDataName = "_drill_command_scaleX_data";
	var SDataName = "_drill_command_scaleX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		for(var i = 0; i < data['par_count']; i++ ){
			var par_sprite = this._drill_COPa_parSpriteTank[i];	//（修改所有粒子的缩放）
			par_sprite.scale.x *= controller[CDataName]['cur_value'];
		}
	}
	
	
	// > 缩放Y - 帧刷新
	var CDataName = "_drill_command_scaleY_data";
	var SDataName = "_drill_command_scaleY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		for(var i = 0; i < data['par_count']; i++ ){
			var par_sprite = this._drill_COPa_parSpriteTank[i];	//（修改所有粒子的缩放）
			par_sprite.scale.y *= controller[CDataName]['cur_value'];
		}
	}
}

//==============================
// * 2B延迟指令 - 初始化子功能
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_initDelayingCommand = function(){
	//（无）
}

//==============================
// * 2C周期指令 - 初始化子功能
//==============================
Drill_MPa_Sprite.prototype.drill_sprite_initPeriodizeCommand = function(){
	//（无）
}



//=============================================================================
// ** 粒子贴图（第二层）【Drill_MPa_SecSprite】
// **
// **		作用域：	菜单界面
// **		主功能：	定义一个 第二层粒子贴图 。
// **		子功能：	
// **					->贴图（第二层）『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					
// **					->A贴图主体
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
// * A贴图主体（第二层） - 初始化子功能
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





