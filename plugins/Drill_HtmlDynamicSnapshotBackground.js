//=============================================================================
// Drill_HtmlDynamicSnapshotBackground.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        游戏窗体 - 天窗层的多层背景
 * @author Drill_up
 * 
 * @Drill_LE_param "背景层-%d"
 * @Drill_LE_parentKey "---背景层组%d至%d---"
 * @Drill_LE_var "DrillUp.g_HDSB_layers_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_HtmlDynamicSnapshotBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在天窗层放置一个或者多个背景。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 基于：
 *   - Drill_CoreOfDynamicSnapshot    游戏窗体-动态快照核心
 *   - Drill_CoreOfBallistics         数学模型-弹道核心★★v2.2及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于渲染器。
 * 2.更多详细内容，去看看文档 "1.系统 > 大家族-屏幕快照.docx"。
 * 3.要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-天窗层）.docx"。
 * 细节：
 *   (1.天窗层是在整个游戏画面之上的特殊层级，比最顶层还高，
 *      只有天窗层才能使用动态快照效果。
 *   (2.游戏中所有的画面都会被动态快照实时播放，
 *      但不包括天窗层的贴图，以及动态快照自己。
 *   (3.默认情况下 所有背景 都是隐藏的，需要插件指令手动显示。
 *      另外，如果开了存储功能，插件指令操作的变化结果是永久性的。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__layer （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 背景层1 资源-背景
 * 背景层2 资源-背景
 * 背景层3 资源-背景
 * ……
 *
 * 所有素材都放在Special__layer文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改单属性
 * 你可以通过插件指令手动修改各个属性：
 * 
 * 插件指令：>天窗层背景 : 背景[11] : 显示
 * 插件指令：>天窗层背景 : 背景变量[21] : 显示
 * 插件指令：>天窗层背景 : 批量背景[7,8] : 显示
 * 插件指令：>天窗层背景 : 批量背景变量[21,22] : 显示
 * 插件指令：>天窗层背景 : 全部背景 : 显示
 *
 * 插件指令：>天窗层背景 : 背景[11] : 显示
 * 插件指令：>天窗层背景 : 背景[11] : 隐藏
 * 插件指令：>天窗层背景 : 背景[11] : 暂停
 * 插件指令：>天窗层背景 : 背景[11] : 继续
 * 插件指令：>天窗层背景 : 背景[11] : 切换混合模式[0]
 * 插件指令：>天窗层背景 : 背景[11] : 切换图片层级[10]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 透明度变量[21] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 旋转[90] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 旋转变量[21] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 移动速度X[1.5] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 移动速度X变量%[21] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 移动速度Y[1.5] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 移动速度Y变量%[21] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 缩放X[1.2] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 缩放X变量%[21] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 缩放Y[1.2] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 缩放Y变量%[21] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 斜切X[0.2] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 斜切X变量%[21] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 斜切Y[0.2] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性 : 斜切Y变量%[21] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 立即还原所有单属性
 * 
 * 1.前半部分（背景变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有5*23种组合方式。
 * 2.注意，如果你想永久保持插件指令的改变结果，则需要开启 参数存储 。
 *   参数存储默认关闭，即 插件指令 的所有改变在读取存档后都会复原。
 * 3.插件指令的变化是永久性的。
 *   修改后的变化能与 配置的自变化效果 叠加，但是实际效果一般都不太好。
 * 4.天窗层是固定的层级，在最上面，无法移动到下面的层级。
 * 5."变量%["表示该变量修改属性值时，会缩小100倍。因为变量只能存整数。
 *   比如缩放的变量值为120时，则表示赋值： 120 / 100 = 1.2。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 移动到
 * 你可以通过插件指令手动设置移动：
 * 
 * 插件指令：>天窗层背景 : 背景[11] : 移动到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到-匀速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到-弹性移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到-增减速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到-增减速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到-立即归位
 * 
 * 1.前半部分（背景[11]）和 后半部分（移动到-匀速移动 : 位置[100,100] : 时间[60]）
 *   的参数可以随意组合。一共有5*7种组合方式。
 * 2.指令中不含相对移动，比如多次执行移动到[20,20]，贴图只会到达一个固定的位置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取属性
 * 你可以通过插件指令来获取 天窗层背景 的属性值：
 * 
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>天窗层背景 : 背景变量[21] : 获取属性 : 位置X : 变量[21]
 * 
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 位置Y : 变量[21]
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 透明度 : 变量[21]
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 旋转 : 变量[21]
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 移动速度X : 变量%[21]
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 移动速度Y : 变量%[21]
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 缩放X : 变量%[21]
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 缩放Y : 变量%[21]
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 斜切X : 变量%[21]
 * 插件指令：>天窗层背景 : 背景[11] : 获取属性 : 斜切Y : 变量%[21]
 * 
 * 1.前半部分（背景[11]）和 后半部分（获取属性 : 位置X : 变量[21]）
 *   的参数可以随意组合。一共有2*10种组合方式。
 * 2."变量%["表示该变量获取到属性时，会乘以100倍。因为变量只能存整数。
 *   比如缩放值为1.2时，则获取到： 1.2 * 100 = 120。
 * 
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟修改单属性
 * 上述的插件指令中，部分插件指令可以延迟执行：
 * 
 * 插件指令：>天窗层背景 : 背景[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景变量[21] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 批量背景[7,8] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 批量背景变量[21,22] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 全部背景 : 隐藏(延迟) : 延迟执行时间[20]
 * 
 * 插件指令：>天窗层背景 : 背景[11] : 显示(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 暂停(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 继续(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 透明度[255] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 透明度变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 旋转[90] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 旋转变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 移动速度X[1.5] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 移动速度X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 移动速度Y[1.5] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 移动速度Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 缩放X[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 缩放X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 缩放Y[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 缩放Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 斜切X[0.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 斜切X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 斜切Y[0.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 修改单属性(延迟) : 斜切Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 还原所有单属性(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 立即取消全部延迟指令
 * 
 * 1.前半部分（背景[11]）和 后半部分（隐藏(延迟) : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有5*22种组合方式。
 * 2.设置延迟指令后，指令会被暂存到延迟队列中，等待延迟时间结束之后，执行指令。
 *   "立即取消全部延迟指令"可以清空排在队列中的所有延迟指令。
 * 3.此功能可以简化 并行事件 的设计，你可以在串行事件中执行延迟，延迟后并行变化贴图。
 * 4.注意，该插件能在 菜单界面 中工作，也就是说，延迟的指令在菜单界面也有效。
 * 5."变量%["表示该变量修改属性值时，会缩小100倍。因为变量只能存整数。
 *   比如缩放的变量值为120时，则表示赋值： 120 / 100 = 1.2。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟移动到
 * 上述的插件指令中，移动到的插件指令也可以延迟执行：
 * 
 * 插件指令：>天窗层背景 : 背景[11] : 移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到(延迟)-匀速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到(延迟)-弹性移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到(延迟)-弹性移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到(延迟)-增减速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到(延迟)-增减速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层背景 : 背景[11] : 移动到(延迟)-延迟归位 : 延迟执行时间[20]
 * 
 * 1.前半部分（背景[11]）和 后半部分（移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有5*7种组合方式。
 * 2.注意，该插件能在 菜单界面 中工作，也就是说，延迟的指令在菜单界面也有效。
 * 
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期修改单属性
 * 上述的插件指令中，部分插件指令可以周期执行：
 * 
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景变量[21] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 批量背景[7,8] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 批量背景变量[21,22] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 全部背景 : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-显示(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-暂停(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-继续(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 透明度[255] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 透明度变量[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 旋转[90] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 旋转变量[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 移动速度X[1.5] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 移动速度X变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 移动速度Y[1.5] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 移动速度Y变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 缩放X[1.2] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 缩放X变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 缩放Y[1.2] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 缩放Y变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 斜切X[0.2] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 斜切X变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 斜切Y[0.2] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-修改单属性(周期) : 斜切Y变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-还原所有单属性(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 清空周期指令
 * 
 * 1.前半部分（背景[11]）和 后半部分（ 添加周期-隐藏(周期) ）
 *   的参数可以随意组合。一共有5*22种组合方式。
 * 2."添加周期"后，指令会根据"周期时长"和"开始时间"，持续循环执行。
 *   "清空周期指令"可以清空添加的指令。
 * 3.你可以塞入多条周期指令，每个周期指令控制不同的属性，实现复杂的变换效果。
 * 4.注意，该插件能在 菜单界面 中工作，也就是说，周期的指令在菜单界面也有效。
 * 5."变量%["表示该变量修改属性值时，会缩小100倍。因为变量只能存整数。
 *   比如缩放的变量值为120时，则表示赋值： 120 / 100 = 1.2。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期移动到
 * 上述的插件指令中，移动到的插件指令也可以周期执行：
 * 
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-移动到(周期)-匀速移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-移动到(周期)-匀速移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-移动到(周期)-弹性移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-移动到(周期)-弹性移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-移动到(周期)-增减速移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-移动到(周期)-增减速移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 添加周期-移动到(周期)-执行归位 : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>天窗层背景 : 背景[11] : 清空周期指令
 * 
 * 1.前半部分（背景[11]）和 后半部分（ 添加周期-移动到(周期)-匀速移动 ）
 *   的参数可以随意组合。一共有5*8种组合方式。
 * 2.注意，该插件能在 菜单界面 中工作，也就是说，周期的指令在菜单界面也有效。
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
 * 测试方法1：  在地图中放置多个背景，进行性能测试。
 * 测试结果1：  200个事件的地图中，平均消耗为：【21.70ms】
 *              100个事件的地图中，平均消耗为：【19.54ms】
 *               50个事件的地图中，平均消耗为：【17.64ms】
 * 测试方法2：  在不同的界面中，进行性能测试。
 * 测试结果2：  战斗界面中，平均消耗为：【17.38ms】
 *              菜单界面中，平均消耗为：【13.92ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.背景是一个简单贴图，只不过放在了天窗层而已，消耗并不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了延迟指令功能。
 * [v1.2]
 * 完善了变换功能的插件指令。
 * [v1.3]
 * 整理改进了内部结构，并添加了周期指令。
 * 
 * 
 * 
 * @param 是否开启参数存储
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 一般建议 关闭 存储。注意，此开关详细介绍去看看文档说明。
 * @default false
 * 
 * @param ---背景层组 1至20---
 * @default
 *
 * @param 背景层-1
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-2
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-3
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-4
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-5
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-6
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-7
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-8
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-9
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-10
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-11
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-12
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-13
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-14
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-15
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-16
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-17
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-18
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-19
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-20
 * @parent ---背景层组 1至20---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组21至40---
 * @default
 *
 * @param 背景层-21
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-22
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-23
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-24
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-25
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-26
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-27
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-28
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-29
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-30
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-31
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-32
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-33
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-34
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-35
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-36
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-37
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-38
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-39
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-40
 * @parent ---背景层组21至40---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组41至60---
 * @default
 *
 * @param 背景层-41
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-42
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-43
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-44
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-45
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-46
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-47
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-48
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-49
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-50
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-51
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-52
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-53
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-54
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-55
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-56
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-57
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-58
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-59
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-60
 * @parent ---背景层组41至60---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景层组61至80---
 * @default
 *
 * @param 背景层-61
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-62
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-63
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-64
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-65
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-66
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-67
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-68
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-69
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-70
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-71
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-72
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-73
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-74
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-75
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-76
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-77
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-78
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-79
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景层-80
 * @parent ---背景层组61至80---
 * @type struct<HDSBLayer>
 * @desc 背景的详细配置信息。
 * @default 
 *
 */
/*~struct~HDSBLayer:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的天窗层背景==
 * 
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 资源-背景
 * @parent ---贴图---
 * @desc 背景的图片资源。
 * @default (需配置)天窗层背景
 * @require 1
 * @dir img/Special__layer/
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
 *
 * @param 平移-背景 X
 * @parent ---贴图---
 * @desc x轴方向平移，正数向左，负数向右，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 平移-背景 Y
 * @parent ---贴图---
 * @desc y轴方向平移，正数向上，负数向下，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 背景X速度
 * @parent ---贴图---
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0.0
 *
 * @param 背景Y速度
 * @parent ---贴图---
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
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
 * @param 是否在地图界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 是否在战斗界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 是否在菜单界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 天窗层先后排序的位置，0表示最后面。
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
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		HDSB（Html_Dynamic_Snapshot_Background）
//		临时全局变量	DrillUp.g_HDSB_xxx
//		临时局部变量	this._drill_HDSB_xxx
//		存储数据变量	$gameSystem._drill_HDSB_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	特效管理层
//		★性能测试消耗	2026/2/11：
//							》21.7ms（Drill_HDSB_Sprite.update）
//		★最坏情况		暂无
//		★备注			暂无
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
//					->修改单属性（不含层级）
//					->移动到
//					->获取属性
//					x->修改中心锚点
//					->延迟修改单属性（不含混合模式、层级、图片层级）
//					->延迟移动到
//					->周期修改单属性（不含混合模式、层级、图片层级）
//					->周期移动到
//				x->其它特性
//			->☆预加载
//			->☆存储数据
//			
//			->☆控制器与贴图
//				->多场景
//				->界面创建
//				->控制器帧刷新
//				->基础特性
//				->销毁
//			
//			->天窗层背景控制器【Drill_HDSB_Controller】
//			->天窗层背景贴图【Drill_HDSB_Sprite】
//
//
//		★家谱：
//			大家族-屏幕快照
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰）（脚本）.docx
//			22.游戏窗体 > 动态快照-天窗层（脚本）.docx
//		
//		★插件私有类：
//			* 天窗层背景控制器【Drill_HDSB_Controller】
//			* 天窗层背景贴图【Drill_HDSB_Sprite】
//		
//		★必要注意事项：
//			暂无
//		
//		★其它说明细节：
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@    /@@@@@@   /@@@@@@@  │
//			  │  /@@__  @@  /@@__  @@ | @@____/  │
//			  │ | @@  \ @@ |__/  \ @@ | @@       │
//			  │ | @@  | @@    /@@@@@/ | @@@@@@@  │
//			  │ | @@  | @@   |___  @@ |_____  @@ │
//			  │ | @@  | @@  /@@  \ @@  /@@  \ @@ │
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
	DrillUp.g_HDSB_PluginTip_curName = "Drill_HtmlDynamicSnapshotBackground.js 游戏窗体-多层天窗层背景";
	DrillUp.g_HDSB_PluginTip_baseList = [
		"Drill_CoreOfDynamicSnapshot.js 游戏窗体-动态快照核心",
		"Drill_CoreOfBallistics.js 数学模型-弹道核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_HDSB_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_HDSB_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_HDSB_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_HDSB_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_HDSB_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_HDSB_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_HDSB_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_HDSB_getPluginTip_ParamIsNaN = function( param_name, check_tank ){
		var text = "【" + DrillUp.g_HDSB_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
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
	DrillUp.drill_HDSB_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_HDSB_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_HDSB_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_HDSB_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 控制器的非数字参数
	//==============================
	DrillUp.drill_HDSB_getPluginTip_controllerData_NotId = function( class_name ){
		return "【" + DrillUp.g_HDSB_PluginTip_curName + "】\n错误，类对象 "+class_name+" 获取到了非数字参数，数据初始化失败。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_HtmlDynamicSnapshotBackground = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_HtmlDynamicSnapshotBackground');

	//==============================
	// * 静态数据 - 背景
	//				（~struct~HDSBLayer）
	//==============================
	DrillUp.drill_HDSB_backgroundInit = function( dataFrom ){
		var data = {};
		
		// > 预加载
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		
		// > 界面
		data['map_enabled'] = String( dataFrom["是否在地图界面中启用"] || "true") == "true";
		data['battle_enabled'] = String( dataFrom["是否在战斗界面中启用"] || "true") == "true";
		data['menu_enabled'] = String( dataFrom["是否在菜单界面中启用"] || "true") == "true";
		
		
		// > A主体 - 基础特性
		data['src_img'] = String( dataFrom["资源-背景"] || "");
		data['src_img_file'] = "img/Special__layer/";
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = false;
		data['pause'] = false;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体 - 其它特性
		//	（无）
		
		
		// > B变换特性
		data['x'] = Number( dataFrom["平移-背景 X"] || 0);
		data['y'] = Number( dataFrom["平移-背景 Y"] || 0);
		data['speedX'] = Number( dataFrom["背景X速度"] || 0);
		data['speedY'] = Number( dataFrom["背景Y速度"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['parentRotate'] = Number( dataFrom["平铺的旋转角度"] || 0.0);
		
		// > B变换特性 - 平铺的缩放与斜切
		//	（无）
		
		
		// > G自变化效果
		//		（背景 不含 摇晃效果）
		data['effect_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['effect_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['effect_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		data['effect_flicker'] = String( dataFrom["闪烁效果"] || "关闭");
		data['effect_flickerSpeed'] = Number( dataFrom["闪烁速度"] || 6.0);
		data['effect_flickerRange'] = Number( dataFrom["闪烁幅度范围"] || 20);
		data['effect_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['effect_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['effect_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		
		// > 控制器 初始化数据『控制器与贴图的样式-静态数据-指针初始化』
		Drill_HDSB_Controller.drill_controller_initData( data );
		
		return data;
	}
	//==============================
	// * 静态数据 - 最后继承1级
	//==============================
	var _drill_HDSB_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_HDSB_scene_initialize.call(this);
		
		/*-----------------背景------------------*/
		for( var i = 0; i < DrillUp.g_HDSB_layers.length; i++ ){
			var temp = DrillUp.g_HDSB_layers[i];
			if( temp != undefined ){
				DrillUp.g_HDSB_layers[i] = DrillUp.drill_HDSB_backgroundInit( temp );
			}
		}
	}
	/*-----------------背景------------------*/
	DrillUp.g_HDSB_layers_length = 80;
	DrillUp.g_HDSB_layers = [];
	for( var i = 0; i < DrillUp.g_HDSB_layers_length; i++ ){
		if( DrillUp.parameters["背景层-" + String(i+1) ] != undefined &&
			DrillUp.parameters["背景层-" + String(i+1) ] != "" ){
			DrillUp.g_HDSB_layers[i] = JSON.parse(DrillUp.parameters["背景层-" + String(i+1) ]);
		}else{
			DrillUp.g_HDSB_layers[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_HDSB_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfDynamicSnapshot &&
	Imported.Drill_CoreOfBallistics ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_HDSB_getPluginTip_NeedUpdate_Ballistics() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_HDSB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_HDSB_pluginCommand.call(this, command, args);
	this.drill_HDSB_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_HDSB_pluginCommand = function( command, args ){
	if( command === ">天窗层背景" ){ // >天窗层背景 : 背景[1] : 显示
		
		/*-----------------对象组获取------------------*/
		var controllers = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( controllers == null && unit.indexOf("批量背景[") != -1 ){
				unit = unit.replace("批量背景[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = Number(temp_arr[k]);
					var temp_controller = $gameSystem._drill_HDSB_controllerTank[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("批量背景变量[") != -1 ){
				unit = unit.replace("批量背景变量[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = $gameVariables.value(Number(temp_arr[k]));
					var temp_controller = $gameSystem._drill_HDSB_controllerTank[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("背景变量[") != -1 ){
				unit = unit.replace("背景变量[","");
				unit = unit.replace("]","");
				var controller_id = $gameVariables.value(Number(unit));
				var temp_controller = $gameSystem._drill_HDSB_controllerTank[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit.indexOf("背景[") != -1 ){
				unit = unit.replace("背景[","");
				unit = unit.replace("]","");
				var controller_id = Number(unit);
				var temp_controller = $gameSystem._drill_HDSB_controllerTank[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit == "全部背景" ){
				controllers = [];
				for( var k=0; k < $gameSystem._drill_HDSB_controllerTank.length; k++ ){
					var temp_controller = $gameSystem._drill_HDSB_controllerTank[ k ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
		}
		if( controllers == null ){ return; }
		
		/*-----------------常规指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "显示" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setVisible( true );
				}
			}
			if( type == "隐藏" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setVisible( false );
				}
			}
			if( type == "暂停" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPause( true );
				}
			}
			if( type == "继续" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPause( false );
				}
			}
			if( type.indexOf("切换混合模式[") != -1 ){
				type = type.replace("切换混合模式[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setBlendMode( Number(type) );
				}
			}
			if( type.indexOf("切换图片层级[") != -1 ){
				type = type.replace("切换图片层级[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setZIndex( Number(type) );
				}
			}
		}
		
		/*-----------------获取属性------------------*/
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "获取属性" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("变量%[","");
				temp2 = temp2.replace("]","");
				if( temp1 == "位置X" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_x );
				}
				if( temp1 == "位置Y" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_y );
				}
				if( temp1 == "透明度" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_opacity );
				}
				if( temp1 == "旋转" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_rotate );
				}
				if( temp1 == "移动速度X" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_selfXSpeed *100 );
				}
				if( temp1 == "移动速度Y" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_selfYSpeed *100 );
				}
				if( temp1 == "缩放X" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_scaleX *100 );
				}
				if( temp1 == "缩放Y" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_scaleY *100 );
				}
				if( temp1 == "斜切X" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_skewX *100 );
				}
				if( temp1 == "斜切Y" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_skewY *100 );
				}
			}
		}
		
		/*-----------------D指令叠加变化------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即还原所有单属性" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_commandChange_restoreAttr();
				}
			}
			if( type == "移动到-立即归位" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_commandChange_restoreMove();
				}
			}
		}
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "修改单属性" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setOpacity(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setRotate(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("移动速度X[") != -1 ||
					temp1.indexOf("移动速度X变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSpeedX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ||
					temp1.indexOf("移动速度Y变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSpeedY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ||
					temp1.indexOf("斜切X变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSkewX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ||
					temp1.indexOf("斜切Y变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSkewY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
			}
			if( type == "移动到-匀速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"匀速变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
			if( type == "移动到-弹性移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"弹性变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
			if( type == "移动到-增减速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"增减速变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
		}
		
		/*-----------------E延迟指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即取消全部延迟指令" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_clearDelayingCommand();
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var delay_time = String(args[5]);
			if( type == "显示(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setVisible", [true], delay_time
					);
				}
			}
			if( type == "隐藏(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setVisible", [false], delay_time
					);
				}
			}
			if( type == "暂停(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setPause", [true], delay_time
					);
				}
			}
			if( type == "继续(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setPause", [false], delay_time
					);
				}
			}
			if( type == "还原所有单属性(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_commandChange_restoreAttr", [], delay_time
					);
				}
			}
			if( type == "移动到(延迟)-延迟归位" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_commandChange_restoreMove", [], delay_time
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
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setOpacity", 
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setRotate",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("移动速度X[") != -1 ||
					temp1.indexOf("移动速度X变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSpeedX",
							["匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ||
					temp1.indexOf("移动速度Y变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSpeedY",
							["匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleY",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ||
					temp1.indexOf("斜切X变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSkewX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ||
					temp1.indexOf("斜切Y变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSkewY",
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
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
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
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
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
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
		}
		
		/*-----------------F周期指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "清空周期指令" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_clearPeriodizeCommand();
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
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_setVisible", [true], time_period, time_start
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
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_setVisible", [false], time_period, time_start
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
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_setPause", [true], time_period, time_start
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
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_setPause", [false], time_period, time_start
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
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_commandChange_restoreAttr", [], time_period, time_start
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
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_commandChange_restoreMove", [], time_period, time_start
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
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setOpacity", 
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setRotate",
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("移动速度X[") != -1 ||
					temp1.indexOf("移动速度X变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setSpeedX",
							["匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ||
					temp1.indexOf("移动速度Y变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setSpeedY",
							["匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setScaleX",
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setScaleY",
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ||
					temp1.indexOf("斜切X变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setSkewX",
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ||
					temp1.indexOf("斜切Y变量%[") != -1 ){
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setSkewY",
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
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setMove",
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
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setMove",
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
					var num_list = this.drill_HDSB_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setMove",
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
Game_Interpreter.prototype.drill_HDSB_getArgNumList = function( arg_str ){
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
var _drill_HDSB_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_HDSB_preload_initialize.call(this);
	this.drill_HDSB_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_HDSB_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_HDSB_preloadInit = function(){
	this._drill_HDSB_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_HDSB_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_HDSB_layers.length; i++ ){
		var temp_data = DrillUp.g_HDSB_layers[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['preload'] != true ){ continue; }
		
		this._drill_HDSB_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img'], temp_data['tint'], temp_data['smooth'], this._drill_HDSB_cacheId ) 
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
//DrillUp.g_HDSB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_HDSB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(){
    _drill_HDSB_sys_initialize.call(this);
	this.drill_HDSB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_HDSB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_HDSB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_HDSB_saveEnabled == true ){	
		$gameSystem.drill_HDSB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_HDSB_initSysData();
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
Game_System.prototype.drill_HDSB_initSysData = function(){
	this.drill_HDSB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_HDSB_checkSysData = function(){
	this.drill_HDSB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_HDSB_initSysData_Private = function(){
	
	this._drill_HDSB_controllerTank = [];	//当前容器（与 g_HDSB_layers 依次对应，容器允许出现null值）
	for(var i = 0; i < DrillUp.g_HDSB_layers.length; i++){
		var temp_data = DrillUp.g_HDSB_layers[i];
		if( temp_data == undefined ){ continue; }
		
		var temp_controller = new Drill_HDSB_Controller( i );
		this._drill_HDSB_controllerTank[i] = temp_controller;
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_HDSB_checkSysData_Private = function(){
	
	// > 旧存档数据自动补充
	if( this._drill_HDSB_controllerTank == undefined ){
		this.drill_HDSB_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_HDSB_layers.length; i++ ){
		var temp_data = DrillUp.g_HDSB_layers[i];
		
		// > 未存储的，重新初始化
		if( this._drill_HDSB_controllerTank[i] == undefined ){
			var temp_controller = new Drill_HDSB_Controller( i );
			this._drill_HDSB_controllerTank[i] = temp_controller;
		
		// > 已存储的，跳过
		}else{
			//（不操作）
		}
	}
};



//=============================================================================
// ** ☆控制器与贴图
//
//			说明：	> 此模块专门管理 贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 控制器与贴图 - 容器初始化
//==============================
var _drill_HDSB_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_HDSB_temp_initialize2.call(this);
	this._drill_HDSB_spriteTank = [];			//贴图容器
	Graphics.drill_CODS_overstoryLayerClear();	//清空 天窗层
};

//==============================
// * 控制器与贴图 - 销毁时『多场景与游戏窗体-地图界面』
//==============================
var _drill_HDSB_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function(){
	_drill_HDSB_smap_terminate.call(this);
	$gameTemp._drill_HDSB_spriteTank = [];		//贴图容器
	Graphics.drill_CODS_overstoryLayerClear();	//清空 天窗层
};
//==============================
// * 控制器与贴图 - 帧刷新『多场景与游戏窗体-地图界面』
//==============================
var _drill_HDSB_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_drill_HDSB_smap_update.call(this);
	this.drill_HDSB_updateController();			//帧刷新 - 控制器
	this.drill_HDSB_updateAttr();				//帧刷新 - 基础特性
	this.drill_HDSB_updateDestroy();			//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时『多场景与游戏窗体-地图界面』
//==============================
var _drill_HDSB_smap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_HDSB_smap_createAllWindows.call(this);
	this.drill_HDSB_create();
};
//==============================
// * 控制器与贴图 - 界面创建『多场景与游戏窗体-地图界面』
//==============================
Scene_Map.prototype.drill_HDSB_create = function(){
	$gameTemp._drill_HDSB_spriteTank = [];			//贴图容器（不允许出现null值）
	var cur_scene = SceneManager._scene;
	
	for(var i=0; i< $gameSystem._drill_HDSB_controllerTank.length; i++){
		var temp_controller = $gameSystem._drill_HDSB_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 如果关闭，则不创建
		var data = temp_controller.drill_data();
		if( cur_scene instanceof Scene_Map && data['map_enabled'] != true ){ continue; }
		if( cur_scene instanceof Scene_Battle && data['battle_enabled'] != true ){ continue; }
		if( cur_scene instanceof Scene_MenuBase && data['menu_enabled'] != true ){ continue; }
		
		
		// > 创建贴图
		var temp_sprite = new Drill_HDSB_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		
		// > 添加贴图到层级（天窗层）
		$gameTemp._drill_HDSB_spriteTank.push( temp_sprite );
		Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
		
	}
	
	// > 层级排序（天窗层）
	Graphics.drill_CODS_sortByZIndex();
}
//==============================
// * 控制器与贴图 - 帧刷新 控制器『多场景与游戏窗体-地图界面』
//==============================
Scene_Map.prototype.drill_HDSB_updateController = function(){
	for(var i = 0; i < $gameSystem._drill_HDSB_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSB_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器帧刷新
		temp_controller.drill_controller_update();
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 基础特性『多场景与游戏窗体-地图界面』
//==============================
Scene_Map.prototype.drill_HDSB_updateAttr = function(){
	var has_layerChange = false;
	for(var i = 0; i < $gameTemp._drill_HDSB_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_HDSB_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 基础特性 - 天窗层层级（无）
		
		// > 基础特性 - 图片层级
		if( temp_sprite.zIndex != temp_controller._drill_zIndex ){
			temp_sprite.zIndex =  temp_controller._drill_zIndex;
			has_layerChange = true;
		}
	};
	
	// > 层级排序（天窗层）
	if( has_layerChange == true ){
		Graphics.drill_CODS_sortByZIndex();
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 销毁『多场景与游戏窗体-地图界面』
//==============================
Scene_Map.prototype.drill_HDSB_updateDestroy = function(){
	
	// > 自动销毁 - 控制器
	for(var i = $gameSystem._drill_HDSB_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_HDSB_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_HDSB_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_HDSB_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_HDSB_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_HDSB_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};

//==============================
// * 控制器与贴图 - 销毁时『多场景与游戏窗体-战斗界面』
//==============================
var _drill_HDSB_sbattle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function(){
	_drill_HDSB_sbattle_terminate.call(this);
	$gameTemp._drill_HDSB_spriteTank = [];		//贴图容器
	Graphics.drill_CODS_overstoryLayerClear();	//清空 天窗层
};
//==============================
// * 控制器与贴图 - 帧刷新『多场景与游戏窗体-战斗界面』
//==============================
var _drill_HDSB_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	_drill_HDSB_sbattle_update.call(this);
	this.drill_HDSB_updateController();			//帧刷新 - 控制器
	this.drill_HDSB_updateAttr();				//帧刷新 - 基础特性
	this.drill_HDSB_updateDestroy();			//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时『多场景与游戏窗体-战斗界面』
//==============================
var _drill_HDSB_sbattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function(){
	_drill_HDSB_sbattle_createAllWindows.call(this);
	this.drill_HDSB_create();
};
//==============================
// * 控制器与贴图 - 函数复制
//==============================
Scene_Battle.prototype.drill_HDSB_create = Scene_Map.prototype.drill_HDSB_create;						//界面创建       『多场景与游戏窗体-战斗界面』
Scene_Battle.prototype.drill_HDSB_updateController = Scene_Map.prototype.drill_HDSB_updateController;	//帧刷新 控制器  『多场景与游戏窗体-战斗界面』
Scene_Battle.prototype.drill_HDSB_updateAttr = Scene_Map.prototype.drill_HDSB_updateAttr;				//帧刷新 基础特性『多场景与游戏窗体-战斗界面』
Scene_Battle.prototype.drill_HDSB_updateDestroy = Scene_Map.prototype.drill_HDSB_updateDestroy;			//帧刷新 销毁    『多场景与游戏窗体-战斗界面』

//==============================
// * 控制器与贴图 - 销毁时『多场景与游戏窗体-菜单界面』
//==============================
var _drill_HDSB_smenu_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function(){
	_drill_HDSB_smenu_terminate.call(this);
	$gameTemp._drill_HDSB_spriteTank = [];		//贴图容器
	Graphics.drill_CODS_overstoryLayerClear();	//清空 天窗层
};
//==============================
// * 控制器与贴图 - 帧刷新『多场景与游戏窗体-菜单界面』
//==============================
var _drill_HDSB_smenu_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function(){
	_drill_HDSB_smenu_update.call(this);
	this.drill_HDSB_updateController();			//帧刷新 - 控制器
	this.drill_HDSB_updateAttr();				//帧刷新 - 基础特性
	this.drill_HDSB_updateDestroy();			//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时『多场景与游戏窗体-菜单界面』
//==============================
var _drill_HDSB_smenu_createWindowLayer = Scene_MenuBase.prototype.createWindowLayer;
Scene_MenuBase.prototype.createWindowLayer = function(){
	_drill_HDSB_smenu_createWindowLayer.call(this);
	this.drill_HDSB_create();
};
//==============================
// * 控制器与贴图 - 函数复制
//==============================
Scene_MenuBase.prototype.drill_HDSB_create = Scene_Map.prototype.drill_HDSB_create;						//界面创建       『多场景与游戏窗体-菜单界面』
Scene_MenuBase.prototype.drill_HDSB_updateController = Scene_Map.prototype.drill_HDSB_updateController;	//帧刷新 控制器  『多场景与游戏窗体-菜单界面』
Scene_MenuBase.prototype.drill_HDSB_updateAttr = Scene_Map.prototype.drill_HDSB_updateAttr;				//帧刷新 基础特性『多场景与游戏窗体-菜单界面』
Scene_MenuBase.prototype.drill_HDSB_updateDestroy = Scene_Map.prototype.drill_HDSB_updateDestroy;		//帧刷新 销毁    『多场景与游戏窗体-菜单界面』



//=============================================================================
// ** 天窗层背景控制器【Drill_HDSB_Controller】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个专门控制天窗层背景的数据类。
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
// **							x> 层级
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
// **		说明：	> 该类可存储。
// **				> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_HDSB_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 初始化
//==============================
Drill_HDSB_Controller.prototype.initialize = function( data_id ){
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
Drill_HDSB_Controller.prototype.drill_controller_update = function(){
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
Drill_HDSB_Controller.prototype.drill_controller_resetData = function( data_id ){
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
Drill_HDSB_Controller.prototype.drill_controller_setVisible = function( visible ){
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
Drill_HDSB_Controller.prototype.drill_controller_setPause = function( pause ){
	this._drill_pause = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_HDSB_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_HDSB_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * 控制器 - 切换混合模式【标准函数】
//
//			参数：	> blendMode 数字
//			返回：	> 无
//##############################
Drill_HDSB_Controller.prototype.drill_controller_setBlendMode = function( blendMode ){
	this._drill_blendMode = blendMode;
};
//##############################
// * 控制器 - 切换图片层级【标准函数】
//
//			参数：	> zIndex 数字
//			返回：	> 无
//##############################
Drill_HDSB_Controller.prototype.drill_controller_setZIndex = function( zIndex ){
	this._drill_zIndex = zIndex;
};

//##############################
// * 控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> data 对象
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_HDSB_Controller.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 接收数据 的参数）
	
	// > A主体 - 基础特性
	if( data['src_img'] == undefined ){ data['src_img'] = "" };										//A主体 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Special__layer/" };		//A主体 - 文件夹
	if( data['tint'] == undefined ){ data['tint'] = 0 };											//A主体 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };									//A主体 - 图像-模糊边缘
	
	if( data['visible'] == undefined ){ data['visible'] = true };									//A主体 - 显示/隐藏
	if( data['pause'] == undefined ){ data['pause'] = false };										//A主体 - 暂停/继续
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };									//A主体 - 混合模式
																									//A主体 - 层级（无）
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };										//A主体 - 图片层级
	
	// > A主体 - 其它特性
	//	（无）
	
	
	// > B变换特性
	if( data['x'] == undefined ){ data['x'] = 0 };													//B变换特性 - 背景X
	if( data['y'] == undefined ){ data['y'] = 0 };													//B变换特性 - 背景Y
	if( data['speedX'] == undefined ){ data['speedX'] = 0 };										//B变换特性 - 背景X速度
	if( data['speedY'] == undefined ){ data['speedY'] = 0 };										//B变换特性 - 背景Y速度
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
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_HDSB_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();				//初始化子功能 - A主体
	this.drill_controller_initChange();				//初始化子功能 - B变换特性
	this.drill_controller_initCheck();				//初始化子功能 - C校验值
	this.drill_controller_initCommandChange();		//初始化子功能 - D指令叠加变化
	this.drill_controller_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_controller_initPeriodizeCommand();	//初始化子功能 - F周期指令
	this.drill_controller_initEffect();				//初始化子功能 - G自变化效果
}
//==============================
// * 控制器 - 重设数据（私有）
//==============================
Drill_HDSB_Controller.prototype.drill_controller_resetData_Private = function( data_id ){
	
	// > 参数检查
	if( typeof data_id != "number" ){
		alert( DrillUp.drill_HDSB_getPluginTip_controllerData_NotId("Drill_HDSB_Controller") );
		throw Error( DrillUp.drill_HDSB_getPluginTip_controllerData_NotId("Drill_HDSB_Controller") );
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
DrillUp.g_HDSB_notFindStyleAlertOnce = true;
//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』空的静态数据
//			
//			说明：	> 空数据会在initData时会进行默认值初始化，在其他地方只读。
//##############################
Drill_HDSB_Controller.emptyData = {};
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
Drill_HDSB_Controller.prototype.drill_data = function(){
	var cur_styleId   = this._drill_data_id +1;
	var cur_styleData = DrillUp.g_HDSB_layers[ this._drill_data_id ];
	if( cur_styleData == undefined ){
		
		// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（只执行一次）
		if( DrillUp.g_HDSB_notFindStyleAlertOnce == true ){
			DrillUp.g_HDSB_notFindStyleAlertOnce = false;
			alert( DrillUp.drill_HDSB_getPluginTip_StyleNotFind(cur_styleId) );
		}
		return Drill_HDSB_Controller.emptyData;
	}
	return cur_styleData;
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_HDSB_Controller.prototype.drill_controller_initAttr = function(){
	var data = this.drill_data();
	
	// > A主体 - 基础特性
	this._drill_visible = data['visible'];			//控制器 - 显示/隐藏
	this._drill_pause = data['pause'];				//控制器 - 暂停/继续
	this._drill_blendMode = data['blendMode'];		//控制器 - 混合模式
													//控制器 - 层级（无）
	this._drill_zIndex = data['zIndex'];			//控制器 - 堆叠级
	
	// > A主体 - 其它特性
	//	（无）
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_HDSB_Controller.prototype.drill_controller_updateAttr = function(){
	
	// > 时间流逝
	this._drill_curTime += 1;
}

//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_HDSB_Controller.prototype.drill_controller_initChange = function(){
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
Drill_HDSB_Controller.prototype.drill_controller_updateChange_Position = function(){
	
	// > 自累积位移
	this._drill_change_selfXAcc += this.drill_controller_finalTransform_selfXSpeed();
	this._drill_change_selfYAcc += this.drill_controller_finalTransform_selfYSpeed();
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置X（可继承，开放函数）
//##############################
Drill_HDSB_Controller.prototype.drill_controller_finalTransform_x = function(){
	return this._drill_change_x + this._drill_change_selfXAcc + this._drill_move_originOffsetX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置Y（可继承，开放函数）
//##############################
Drill_HDSB_Controller.prototype.drill_controller_finalTransform_y = function(){
	return this._drill_change_y + this._drill_change_selfYAcc + this._drill_move_originOffsetY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 移动速度X（可继承，开放函数）
//##############################
Drill_HDSB_Controller.prototype.drill_controller_finalTransform_selfXSpeed = function(){
	return this._drill_change_selfXSpeed;
}
//##############################
// * B变换特性 - 数据最终变换值 - 移动速度Y（可继承，开放函数）
//##############################
Drill_HDSB_Controller.prototype.drill_controller_finalTransform_selfYSpeed = function(){
	return this._drill_change_selfYSpeed;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放X（可继承，开放函数）
//##############################
Drill_HDSB_Controller.prototype.drill_controller_finalTransform_scaleX = function(){
	return this._drill_change_scaleX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放Y（可继承，开放函数）
//##############################
Drill_HDSB_Controller.prototype.drill_controller_finalTransform_scaleY = function(){
	return this._drill_change_scaleY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 透明度（可继承，开放函数）
//##############################
Drill_HDSB_Controller.prototype.drill_controller_finalTransform_opacity = function(){
	return this._drill_change_opacity;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切X（可继承，开放函数）
//##############################
Drill_HDSB_Controller.prototype.drill_controller_finalTransform_skewX = function(){
	return this._drill_change_skewX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切Y（可继承，开放函数）
//##############################
Drill_HDSB_Controller.prototype.drill_controller_finalTransform_skewY = function(){
	return this._drill_change_skewY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 旋转（可继承，开放函数）
//##############################
Drill_HDSB_Controller.prototype.drill_controller_finalTransform_rotate = function(){
	return this._drill_change_rotate;
}
//==============================
// * B变换特性 - 帧刷新 平铺范围
//==============================
Drill_HDSB_Controller.prototype.drill_controller_updateChange_MoveRange = function(){
	if( this._drill_change_rotate == 0 && 
		this._drill_change_skewX == 0 && 
		this._drill_change_skewY == 0 ){ return; }
	
	// > 矩形变换后的外接矩形
	//		（这个函数用于获取 旋转+斜切 变换后的矩形高宽）
	var ww = Graphics.boxWidth;
	var hh = Graphics.boxHeight;
	var rect = $gameTemp.drill_HDSB_Math2D_getRectWithTransform(
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
Game_Temp.prototype.drill_HDSB_Math2D_getRectWithTransform = function( 
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
	var pp1 = $gameTemp.drill_HDSB_Math2D_getPointWithTransform( p1_x,p1_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp2 = $gameTemp.drill_HDSB_Math2D_getPointWithTransform( p2_x,p2_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp3 = $gameTemp.drill_HDSB_Math2D_getPointWithTransform( p3_x,p3_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp4 = $gameTemp.drill_HDSB_Math2D_getPointWithTransform( p4_x,p4_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	
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
Game_Temp.prototype.drill_HDSB_Math2D_getPointWithTransform = function( 
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
Drill_HDSB_Controller.prototype.drill_controller_initCheck = function(){
	//（无）
}
//==============================
// * C校验值 - 校验标记
//==============================
DrillUp.g_HDSB_checkNaN = true;
//==============================
// * C校验值 - 帧刷新
//==============================
Drill_HDSB_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_HDSB_checkNaN == true ){
		if( isNaN( this.drill_controller_finalTransform_x() ) ){
			DrillUp.g_HDSB_checkNaN = false;
			var check_tank = {};
			check_tank["_drill_change_x"] = this._drill_change_x;
			check_tank["_drill_change_selfXAcc"] = this._drill_change_selfXAcc;
			check_tank["_drill_move_originOffsetX"] = this._drill_move_originOffsetX;
			alert( DrillUp.drill_HDSB_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_x", check_tank ) );
		}
		if( isNaN( this.drill_controller_finalTransform_y() ) ){
			DrillUp.g_HDSB_checkNaN = false;
			var check_tank = {};
			check_tank["_drill_change_y"] = this._drill_change_y;
			check_tank["_drill_change_selfYAcc"] = this._drill_change_selfYAcc;
			check_tank["_drill_move_originOffsetY"] = this._drill_move_originOffsetY;
			alert( DrillUp.drill_HDSB_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_y", check_tank ) );
		}
		if( isNaN( this.drill_controller_finalTransform_opacity() ) ){
			DrillUp.g_HDSB_checkNaN = false;
			alert( DrillUp.drill_HDSB_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_opacity" ) );
		}
		if( isNaN( this.drill_controller_finalTransform_rotate() ) ){
			DrillUp.g_HDSB_checkNaN = false;
			alert( DrillUp.drill_HDSB_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_rotate" ) );
		}
	}
}


//==============================
// * D指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_HDSB_Controller.prototype.drill_controller_initCommandChange = function(){
	
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
Drill_HDSB_Controller.prototype.drill_controller_updateCommandChange = function(){
	
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
Drill_HDSB_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
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
Drill_HDSB_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = undefined;
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动到
//==============================
Drill_HDSB_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", data['x'], data['y'],		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 透明度
//==============================
Drill_HDSB_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动速度X
//==============================
Drill_HDSB_Controller.prototype.drill_controller_commandChange_setSpeedX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedX_data", data['speedX'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动速度Y
//==============================
Drill_HDSB_Controller.prototype.drill_controller_commandChange_setSpeedY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedY_data", data['speedY'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 旋转
//==============================
Drill_HDSB_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", data['parentRotate'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放X
//==============================
Drill_HDSB_Controller.prototype.drill_controller_commandChange_setScaleX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleX_data", data['scale_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放Y
//==============================
Drill_HDSB_Controller.prototype.drill_controller_commandChange_setScaleY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", data['scale_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切X
//==============================
Drill_HDSB_Controller.prototype.drill_controller_commandChange_setSkewX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewX_data", data['skew_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切Y
//==============================
Drill_HDSB_Controller.prototype.drill_controller_commandChange_setSkewY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewY_data", data['skew_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}


//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_HDSB_Controller.prototype.drill_controller_initDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}
//==============================
// * E延迟指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_HDSB_Controller.prototype.drill_controller_updateDelayingCommandImportant = function(){
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
Drill_HDSB_Controller.prototype.drill_controller_updateDelayingCommand = function(){
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
Drill_HDSB_Controller.prototype.drill_controller_setDelayingCommand = function( method, paramList, delay_time ){
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
		method != "drill_controller_commandChange_restoreMove"
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
Drill_HDSB_Controller.prototype.drill_controller_clearDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}


//==============================
// * F周期指令 - 初始化子功能
//==============================
Drill_HDSB_Controller.prototype.drill_controller_initPeriodizeCommand = function(){
	this._drill_curPeriodizeCommandTank = [];
}
//==============================
// * F周期指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_HDSB_Controller.prototype.drill_controller_updatePeriodizeCommandImportant = function(){
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
Drill_HDSB_Controller.prototype.drill_controller_updatePeriodizeCommand = function(){
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
			}
		}
	}
	
}
//==============================
// * F周期指令 - 设置指令（开放函数）
//==============================
Drill_HDSB_Controller.prototype.drill_controller_setPeriodizeCommand = function( method, paramList, time_period, time_start ){
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
		method != "drill_controller_commandChange_restoreMove"
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
Drill_HDSB_Controller.prototype.drill_controller_clearPeriodizeCommand = function(){
	this._drill_curPeriodizeCommandTank = [];
}


//==============================
// * G自变化效果 - 初始化子功能
//==============================
Drill_HDSB_Controller.prototype.drill_controller_initEffect = function(){
	this._drill_curEffectTime = 0;
}
//==============================
// * G自变化效果 - 帧刷新
//==============================
Drill_HDSB_Controller.prototype.drill_controller_updateEffect = function(){
	this._drill_curEffectTime += 1;
}



//=============================================================================
// ** 天窗层背景贴图【Drill_HDSB_Sprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个背景贴图。
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
// * 背景贴图 - 定义
//==============================
function Drill_HDSB_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_HDSB_Sprite.prototype = Object.create(Sprite.prototype);
Drill_HDSB_Sprite.prototype.constructor = Drill_HDSB_Sprite;
//==============================
// * 背景贴图 - 初始化
//==============================
Drill_HDSB_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 背景贴图 - 帧刷新
//==============================
Drill_HDSB_Sprite.prototype.update = function(){
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
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_HDSB_Sprite.prototype.drill_sprite_setController = function( controller ){
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
Drill_HDSB_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A贴图主体
	this.drill_sprite_initChange();				//初始化子功能 - B变换特性
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initCommandChange();		//初始化子功能 - D指令叠加变化-控制器用
	this.drill_sprite_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_sprite_initPeriodizeCommand();	//初始化子功能 - F周期指令
	this.drill_sprite_initEffect();				//初始化子功能 - G自变化效果
};

//##############################
// * 背景贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_HDSB_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 背景贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_HDSB_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 背景贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_HDSB_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 背景贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_HDSB_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 背景贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_HDSB_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 背景贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_HDSB_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A贴图主体
	this.visible = false;
	this.removeChild( this._drill_layerSprite );
	this._drill_layerSprite = null;
	
	// > 销毁 - B变换特性
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
};
//==============================
// * 背景贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_HDSB_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A贴图主体 - 初始化子功能
//==============================
Drill_HDSB_Sprite.prototype.drill_sprite_initAttr = function(){
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
																//贴图 - 层级（无）
	this.zIndex = this._drill_controller._drill_zIndex;			//贴图 - 堆叠级
	
	// > 平铺贴图
	var temp_layer = new TilingSprite();
	temp_layer.move(0, 0, Graphics.width, Graphics.height);		//（填满游戏窗口）
	temp_layer.bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'], data['tint'], data['smooth'] );
	temp_layer.origin.x = data['x'];
	temp_layer.origin.y = data['y'];
	temp_layer.blendMode = this._drill_controller._drill_blendMode;
	this._drill_layerSprite = temp_layer;
	
	// > 平铺范围（平铺的旋转角度用）
	this._drill_spriteMove_x = 0;
	this._drill_spriteMove_y = 0;
	this._drill_spriteMove_w = 0;
	this._drill_spriteMove_h = 0;
	
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A贴图主体 - 帧刷新
//==============================
Drill_HDSB_Sprite.prototype.drill_sprite_updateAttr = function(){
	
	// > 基础特性 - 显示/隐藏
	this.visible = this._drill_controller._drill_visible;
	
	// > 基础特性 - 暂停/继续
	//	（无）
	
	// > 基础特性 - 混合模式
	if( this.blendMode != this._drill_controller._drill_blendMode ){
		this.blendMode =  this._drill_controller._drill_blendMode;
		this._drill_layerSprite.blendMode = this._drill_controller._drill_blendMode;
	}
	
	//（其它 基础特性 的帧刷新赋值见：drill_HDSB_updateAttr）
}


//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_HDSB_Sprite.prototype.drill_sprite_initChange = function(){
	//（无）
}
//==============================
// * B变换特性 - 帧刷新
//==============================
Drill_HDSB_Sprite.prototype.drill_sprite_updateChange = function(){
	/*
		原策略：使用锁定锚点+扩展矩形，实现 缩放+斜切+旋转 。
				但是原策略使用数学公式怎么算都算不对。
		改变策略：干脆换成 主体贴图执行旋转、斜切，平铺贴图执行move平铺范围变化。
				缩放固定为1.0，平铺的缩放来自tileTransform.scale。
	*/
	
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
Drill_HDSB_Sprite.prototype.drill_sprite_initCommandChange = function(){
	
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
Drill_HDSB_Sprite.prototype.drill_sprite_updateCommandChange = function(){
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
Drill_HDSB_Sprite.prototype.drill_sprite_initDelayingCommand = function(){
	//（无）
}

//==============================
// * F周期指令 - 初始化子功能
//==============================
Drill_HDSB_Sprite.prototype.drill_sprite_initPeriodizeCommand = function(){
	//（无）
}


//==============================
// * G自变化效果 - 初始化子功能
//==============================
Drill_HDSB_Sprite.prototype.drill_sprite_initEffect = function(){
	//（无）
}
//==============================
// * G自变化效果 - 帧刷新
//==============================
Drill_HDSB_Sprite.prototype.drill_sprite_updateEffect = function(){
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


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_HtmlDynamicSnapshotBackground = false;
		var pluginTip = DrillUp.drill_HDSB_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


