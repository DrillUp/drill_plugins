//=============================================================================
// Drill_HtmlDynamicSnapshotCircle.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        游戏窗体 - 天窗层的多层魔法圈
 * @author Drill_up
 * 
 * @Drill_LE_param "魔法圈层-%d"
 * @Drill_LE_parentKey "---魔法圈层组%d至%d---"
 * @Drill_LE_var "DrillUp.g_HDSC_layers_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_HtmlDynamicSnapshotCircle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在天窗层放置一个或者多个魔法圈。
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
 * 细节：
 *   (1.天窗层是在整个游戏画面之上的特殊层级，比最顶层还高，
 *      只有天窗层才能使用动态快照效果。
 *   (2.游戏中所有的画面都会被动态快照实时播放，
 *      但不包括天窗层的贴图，以及动态快照自己。
 *   (3.默认情况下 所有魔法圈 都是隐藏的，需要插件指令手动显示。
 *      另外，如果开了存储功能，插件指令操作的变化结果是永久性的。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 设计：
 *   (1.你可以设计一个游戏水印，由于魔法圈在天窗层，所有界面中
 *      都可以看到这个魔法圈做成的游戏水印。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__layer （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 魔法圈1 资源-魔法圈
 * 魔法圈2 资源-魔法圈
 * 魔法圈3 资源-魔法圈
 * ……
 *
 * 所有素材都放在Special__layer文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改单属性
 * 你可以通过插件指令手动修改各个属性：
 * 
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 显示
 * 插件指令：>天窗层魔法圈 : 魔法圈变量[21] : 显示
 * 插件指令：>天窗层魔法圈 : 批量魔法圈[7,8] : 显示
 * 插件指令：>天窗层魔法圈 : 批量魔法圈变量[21,22] : 显示
 * 插件指令：>天窗层魔法圈 : 全部魔法圈 : 显示
 * 
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 显示
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 隐藏
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 暂停
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 继续
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 切换混合模式[0]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 切换图片层级[10]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 透明度变量[21] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 旋转[90] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 旋转变量[21] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 转速[10.0] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 转速变量[21] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 缩放X[1.2] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 缩放X变量%[21] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 缩放Y[1.2] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 缩放Y变量%[21] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 斜切X[0.2] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 斜切X变量%[21] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 斜切Y[0.2] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性 : 斜切Y变量%[21] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 立即还原所有单属性
 * 
 * 1.前半部分（魔法圈变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有5*21种组合方式。
 * 2.注意，如果你想永久保持插件指令的改变结果，则需要开启 参数存储 。
 *   参数存储默认关闭，即 插件指令 的所有改变在读取存档后都会复原。
 * 3."旋转"、"转速"的变化效果可以叠加。
 *   天窗层是固定的层级，在最上面，无法移动到下面的层级。
 * 4.插件指令的变化是永久性的。
 *   修改后的变化能与 配置的自变化效果 叠加，但是实际效果一般都不太好。
 * 5."变量%["表示该变量修改属性值时，会缩小100倍。因为变量只能存整数。
 *   比如缩放的变量值为120时，则表示赋值： 120 / 100 = 1.2。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 移动到
 * 你可以通过插件指令手动设置移动：
 * 
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到-匀速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到-弹性移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到-增减速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到-增减速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到-立即归位
 * 
 * 1.前半部分（魔法圈[11]）和 后半部分（移动到-匀速移动 : 位置[100,100] : 时间[60]）
 *   的参数可以随意组合。一共有4*7种组合方式。
 * 2.指令中不含相对移动，比如多次执行移动到[20,20]，贴图只会到达一个固定的位置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改中心锚点
 * 你可以通过插件指令手动修改中心锚点：
 * 
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改中心锚点 : 锚点[0.5,0.5]
 * 插件指令：>天窗层魔法圈 : 魔法圈变量[21] : 修改中心锚点 : 锚点[0.5,0.5]
 * 
 * 1.注意，由于中心锚点会影响缩放、旋转效果，
 *   最好在创建后，修改一次中心锚点，就不要再动了。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取属性
 * 你可以通过插件指令来获取 天窗层魔法圈 的属性值：
 * 
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>天窗层魔法圈 : 魔法圈变量[21] : 获取属性 : 位置X : 变量[21]
 * 
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 获取属性 : 位置Y : 变量[21]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 获取属性 : 透明度 : 变量[21]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 获取属性 : 旋转 : 变量[21]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 获取属性 : 转速 : 变量[21]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 获取属性 : 缩放X : 变量%[21]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 获取属性 : 缩放Y : 变量%[21]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 获取属性 : 斜切X : 变量%[21]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 获取属性 : 斜切Y : 变量%[21]
 * 
 * 1.前半部分（魔法圈[11]）和 后半部分（获取属性 : 位置X : 变量[21]）
 *   的参数可以随意组合。一共有2*9种组合方式。
 * 2."变量%["表示该变量获取到属性时，会乘以100倍。因为变量只能存整数。
 *   比如缩放值为1.2时，则获取到： 1.2 * 100 = 120。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改中心锚点
 * 你可以通过插件指令手动修改中心锚点：
 * 
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改中心锚点 : 锚点[0.5,1.0]
 * 插件指令：>天窗层魔法圈 : 魔法圈变量[21] : 修改中心锚点 : 锚点[0.5,1.0]
 * 插件指令：>天窗层魔法圈 : 批量魔法圈[4,5] : 修改中心锚点 : 锚点[0.5,1.0]
 * 插件指令：>天窗层魔法圈 : 批量魔法圈变量[21,22] : 修改中心锚点 : 锚点[0.5,1.0]
 * 插件指令：>天窗层魔法圈 : 全部魔法圈 : 修改中心锚点 : 锚点[0.5,1.0]
 * 
 * 1.前半部分（魔法圈[11]）和 后半部分（修改中心锚点 : 锚点[0.5,1.0]）的参数
 *   可以随意组合。一共有5*2种组合方式。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟修改单属性
 * 上述的插件指令中，部分插件指令可以延迟执行：
 * 
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈变量[21] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 批量魔法圈[7,8] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 批量魔法圈变量[21,22] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 全部魔法圈 : 隐藏(延迟) : 延迟执行时间[20]
 * 
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 显示(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 暂停(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 继续(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 透明度[255] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 透明度变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 旋转[90] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 旋转变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 转速[10.0] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 转速变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 缩放X[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 缩放X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 缩放Y[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 缩放Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 斜切X[0.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 斜切X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 斜切Y[0.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 修改单属性(延迟) : 斜切Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 还原所有单属性(延迟) : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 立即取消全部延迟指令
 * 
 * 1.前半部分（魔法圈[11]）和 后半部分（隐藏(延迟) : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有4*20种组合方式。
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
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到(延迟)-匀速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到(延迟)-弹性移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到(延迟)-弹性移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到(延迟)-增减速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到(延迟)-增减速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>天窗层魔法圈 : 魔法圈[11] : 移动到(延迟)-延迟归位 : 延迟执行时间[20]
 * 
 * 1.前半部分（魔法圈[11]）和 后半部分（移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有4*7种组合方式。
 * 2.注意，该插件能在 菜单界面 中工作，也就是说，延迟的指令在菜单界面也有效。
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
 * 测试方法1：  在地图中放置多个魔法圈，进行性能测试。
 * 测试结果1：  200个事件的地图中，平均消耗为：【17.57ms】
 *              100个事件的地图中，平均消耗为：【14.31ms】
 *               50个事件的地图中，平均消耗为：【13.20ms】
 * 测试方法2：  在不同的界面中，进行性能测试。
 * 测试结果2：  战斗界面中，平均消耗为：【14.52ms】
 *              菜单界面中，平均消耗为：【18.23ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.魔法圈是一个简单贴图，只不过放在了天窗层而已，消耗并不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了延迟指令功能。
 * [v1.2]
 * 完善了变换功能的插件指令。
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
 * @param ---魔法圈层组 1至20---
 * @default
 *
 * @param 魔法圈层-1
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-2
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-3
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-4
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-5
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-6
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-7
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-8
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-9
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-10
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-11
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-12
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-13
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-14
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-15
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-16
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-17
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-18
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-19
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-20
 * @parent ---魔法圈层组 1至20---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组21至40---
 * @default
 *
 * @param 魔法圈层-21
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-22
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-23
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-24
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-25
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-26
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-27
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-28
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-29
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-30
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-31
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-32
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-33
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-34
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-35
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-36
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-37
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-38
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-39
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-40
 * @parent ---魔法圈层组21至40---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组41至60---
 * @default
 *
 * @param 魔法圈层-41
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-42
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-43
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-44
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-45
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-46
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-47
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-48
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-49
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-50
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-51
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-52
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-53
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-54
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-55
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-56
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-57
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-58
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-59
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-60
 * @parent ---魔法圈层组41至60---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组61至80---
 * @default
 *
 * @param 魔法圈层-61
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-62
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-63
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-64
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-65
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-66
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-67
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-68
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-69
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-70
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-71
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-72
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-73
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-74
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-75
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-76
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-77
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-78
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-79
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-80
 * @parent ---魔法圈层组61至80---
 * @type struct<HDSCCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 */
/*~struct~HDSCCircle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的天窗层魔法圈==
 * 
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 资源-魔法圈
 * @parent ---贴图---
 * @desc 魔法圈的图片资源。
 * @default (需配置)天窗层魔法圈
 * @require 1
 * @dir img/Special__layer/
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
 * @param 是否预加载
 * @parent ---贴图---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍可见："1.系统 > 关于预加载.docx"。
 * @default false
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
 * @param 平移-魔法圈 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 平移-魔法圈 Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 *
 * @param 旋转速度
 * @parent ---贴图---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 2.50
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
 * @default 14
 * 
 * 
 * @param ---3d效果---
 * @desc 
 * 
 * @param 整体缩放 X
 * @parent ---3d效果---
 * @desc 魔法圈的缩放X值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体缩放 Y
 * @parent ---3d效果---
 * @desc 魔法圈的缩放Y值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体斜切 X
 * @parent ---3d效果---
 * @desc 魔法圈的斜切X值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 整体斜切 Y
 * @parent ---3d效果---
 * @desc 魔法圈的斜切Y值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 整体再旋转角度
 * @parent ---3d效果---
 * @desc 在上述效果的基础上，魔法圈再旋转的角度。
 * @default 0.0
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
 * @param 摇晃效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前贴图，会来回摇晃。
 * @default 关闭
 * 
 * @param 摇晃速度
 * @parent 摇晃效果
 * @desc 来回摇晃变化的速度。
 * @default 4.0
 * 
 * @param 摇晃幅度范围
 * @parent 摇晃效果
 * @type number
 * @min 1
 * @desc 来回摇晃的幅度范围。单位角度。
 * @default 12
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
//		插件简称		HDSC（Html_Dynamic_Snapshot_Circle）
//		临时全局变量	DrillUp.g_HDSC_xxx
//		临时局部变量	this._drill_HDSC_xxx
//		存储数据变量	$gameSystem._drill_HDSC_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	特效管理层
//		★性能测试消耗	13.2ms（Drill_HDSC_Sprite.update）
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
//				->修改基础属性
//					x> 资源名
//					>  混合模式
//					x> 层级
//					>  图片层级
//				->修改变换属性
//					> 锚点X
//					> 锚点Y
//					> 位置X
//					> 位置Y
//					> 缩放X
//					> 缩放Y
//					> 透明度
//					> 斜切X
//					> 斜切Y
//					> 旋转
//					> 转速
//			->☆预加载
//			->☆存储数据
//			
//			->☆控制器与贴图
//				->跨多个界面控制
//				->界面创建
//				->控制器帧刷新
//				->基础特性
//				->销毁
//			
//			->天窗层魔法圈控制器【Drill_HDSC_Controller】
//				->A主体
//				->B变换特性
//				->D指令叠加变化
//				->E延迟指令
//				->F自变化效果
//			->天窗层魔法圈贴图【Drill_HDSC_Sprite】
//				->A主体
//				->B变换特性
//				->C对象绑定
//				->D指令叠加变化-控制器用
//				->E延迟指令
//				->F自变化效果
//
//
//		★家谱：
//			大家族-屏幕快照
//		
//		★脚本文档：
//			22.游戏窗体 > 动态快照-天窗层（脚本）.docx
//		
//		★插件私有类：
//			* 天窗层魔法圈控制器【Drill_HDSC_Controller】
//			* 天窗层魔法圈贴图【Drill_HDSC_Sprite】
//		
//		★必要注意事项：
//			1. 
//		
//		★其它说明细节：
//			1.
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
	DrillUp.g_HDSC_PluginTip_curName = "Drill_HtmlDynamicSnapshotCircle.js 游戏窗体-天窗层的多层魔法圈";
	DrillUp.g_HDSC_PluginTip_baseList = [
		"Drill_CoreOfDynamicSnapshot.js 游戏窗体-动态快照核心",
		"Drill_CoreOfBallistics.js 数学模型-弹道核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_HDSC_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_HDSC_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_HDSC_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_HDSC_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_HDSC_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_HDSC_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_HDSC_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 控制器的非数字参数
	//==============================
	DrillUp.drill_HDSC_getPluginTip_controllerData_NotId = function( class_name ){
		return "【" + DrillUp.g_HDSC_PluginTip_curName + "】\n错误，类对象 "+class_name+" 获取到了非数字参数，数据初始化失败。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_HtmlDynamicSnapshotCircle = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_HtmlDynamicSnapshotCircle');
	
	//==============================
	// * 静态数据 - 魔法圈
	//				（~struct~HDSCCircle）
	//==============================
	DrillUp.drill_HDSC_circleInit = function( dataFrom ) {
		var data = {};
		
		// > 预加载
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		
		// > 界面
		data['map_enabled'] = String( dataFrom["是否在地图界面中启用"] || "true") == "true";
		data['battle_enabled'] = String( dataFrom["是否在战斗界面中启用"] || "true") == "true";
		data['menu_enabled'] = String( dataFrom["是否在菜单界面中启用"] || "true") == "true";
		
		
		// > A主体 - 基础特性
		data['src_img'] = String( dataFrom["资源-魔法圈"] || "");
		data['src_img_file'] = "img/Special__layer/";
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = false;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 14);
		
		// > A主体 - 其它特性
		data['pause'] = false;
		
		
		// > B变换特性
		data['x'] = Number( dataFrom["平移-魔法圈 X"] || 0);
		data['y'] = Number( dataFrom["平移-魔法圈 Y"] || 0);
		data['rotate'] = Number( dataFrom["旋转速度"] || 0.0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['anchor_x'] = 0.5;
		data['anchor_y'] = 0.5;
		
		// > B变换特性 - 3d效果
		data['scale_x'] = Number( dataFrom["整体缩放 X"] || 1.0);
		data['scale_y'] = Number( dataFrom["整体缩放 Y"] || 1.0);
		data['skew_x'] = Number( dataFrom["整体斜切 X"] || 0);
		data['skew_y'] = Number( dataFrom["整体斜切 Y"] || 0);
		data['parentRotate'] = Number( dataFrom["整体再旋转角度"] || 0.0);
		
		
		// > F自变化效果
		data['effect_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['effect_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['effect_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		data['effect_flicker'] = String( dataFrom["闪烁效果"] || "关闭");
		data['effect_flickerSpeed'] = Number( dataFrom["闪烁速度"] || 6.0);
		data['effect_flickerRange'] = Number( dataFrom["闪烁幅度范围"] || 20);
		data['effect_swing'] = String( dataFrom["摇晃效果"] || "关闭");
		data['effect_swingSpeed'] = Number( dataFrom["摇晃速度"] || 4.0);
		data['effect_swingRange'] = Number( dataFrom["摇晃幅度范围"] || 12);
		data['effect_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['effect_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['effect_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		
		return data;
	}

	/*-----------------杂项------------------*/
	DrillUp.g_HDSC_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*-----------------魔法圈------------------*/
	DrillUp.g_HDSC_layers_length = 80;
	DrillUp.g_HDSC_layers = [];
	for (var i = 0; i < DrillUp.g_HDSC_layers_length; i++) {
		if( DrillUp.parameters["魔法圈层-" + String(i+1) ] != undefined &&
			DrillUp.parameters["魔法圈层-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["魔法圈层-" + String(i+1) ]);
			DrillUp.g_HDSC_layers[i] = DrillUp.drill_HDSC_circleInit( temp );
		}else{
			DrillUp.g_HDSC_layers[i] = undefined;		//（强制设为空值，节约存储资源）
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfDynamicSnapshot &&
	Imported.Drill_CoreOfBallistics ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_HDSC_getPluginTip_NeedUpdate_Ballistics() );
	}


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_HDSC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_HDSC_pluginCommand.call(this, command, args);
	if( command === ">天窗层魔法圈" ){ // >天窗层魔法圈 : 魔法圈[1] : 显示
	
		/*-----------------对象组获取------------------*/
		var controllers = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( controllers == null && unit.indexOf("批量魔法圈[") != -1 ){
				unit = unit.replace("批量魔法圈[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = Number(temp_arr[k]);
					var temp_controller = $gameSystem._drill_HDSC_controllerTank[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("批量魔法圈变量[") != -1 ){
				unit = unit.replace("批量魔法圈变量[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = $gameVariables.value(Number(temp_arr[k]));
					var temp_controller = $gameSystem._drill_HDSC_controllerTank[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("魔法圈变量[") != -1 ){
				unit = unit.replace("魔法圈变量[","");
				unit = unit.replace("]","");
				var controller_id = $gameVariables.value(Number(unit));
				var temp_controller = $gameSystem._drill_HDSC_controllerTank[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit.indexOf("魔法圈[") != -1 ){
				unit = unit.replace("魔法圈[","");
				unit = unit.replace("]","");
				var controller_id = Number(unit);
				var temp_controller = $gameSystem._drill_HDSC_controllerTank[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit == "全部魔法圈" ){
				controllers = [];
				for( var k=0; k < $gameSystem._drill_HDSC_controllerTank.length; k++ ){
					var temp_controller = $gameSystem._drill_HDSC_controllerTank[ k ];
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
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "修改中心锚点" && temp1.indexOf("锚点[") != -1 ){
				temp1 = temp1.replace("锚点[","");
				temp1 = temp1.replace("]","");
				var temp_arr = temp1.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					for( var k=0; k < controllers.length; k++ ){
						controllers[k]._drill_change_anchor_x = Number(temp_arr[0]);
						controllers[k]._drill_change_anchor_y = Number(temp_arr[1]);
					}
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
				if( temp1 == "转速" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_childCircle_rotateSpeed );
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
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setOpacity(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setRotate(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("转速[") != -1 ||
					temp1.indexOf("转速变量[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setRotateSpeed(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ||
					temp1.indexOf("斜切X变量%[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSkewX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ||
					temp1.indexOf("斜切Y变量%[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
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
					var num_list = this.drill_HDSC_getArgNumList(temp1);
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
					var num_list = this.drill_HDSC_getArgNumList(temp1);
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
					var num_list = this.drill_HDSC_getArgNumList(temp1);
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
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setOpacity", 
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setRotate",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("转速[") != -1 ||
					temp1.indexOf("转速变量[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setRotateSpeed",
							["匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleY",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ||
					temp1.indexOf("斜切X变量%[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSkewX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ||
					temp1.indexOf("斜切Y变量%[") != -1 ){
					var num_list = this.drill_HDSC_getArgNumList(temp1);
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
					var num_list = this.drill_HDSC_getArgNumList(temp1);
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
					var num_list = this.drill_HDSC_getArgNumList(temp1);
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
					var num_list = this.drill_HDSC_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
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
Game_Interpreter.prototype.drill_HDSC_getArgNumList = function( arg_str ){
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
var _drill_HDSC_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_HDSC_preload_initialize.call(this);
	this.drill_HDSC_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_HDSC_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_HDSC_preloadInit = function(){
	this._drill_HDSC_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_HDSC_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_HDSC_layers.length; i++ ){
		var temp_data = DrillUp.g_HDSC_layers[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['preload'] != true ){ continue; }
		
		this._drill_HDSC_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img'], temp_data['tint'], temp_data['smooth'], this._drill_HDSC_cacheId ) 
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
//DrillUp.g_HDSC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_HDSC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(){
    _drill_HDSC_sys_initialize.call(this);
	this.drill_HDSC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_HDSC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_HDSC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_HDSC_saveEnabled == true ){	
		$gameSystem.drill_HDSC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_HDSC_initSysData();
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
Game_System.prototype.drill_HDSC_initSysData = function(){
	this.drill_HDSC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_HDSC_checkSysData = function(){
	this.drill_HDSC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_HDSC_initSysData_Private = function(){
	
	this._drill_HDSC_controllerTank = [];	//当前容器（与 g_HDSC_layers 依次对应，容器允许出现null值）
	for(var i = 0; i < DrillUp.g_HDSC_layers.length; i++){
		var temp_data = DrillUp.g_HDSC_layers[i];
		if( temp_data == undefined ){ continue; }
		
		var temp_controller = new Drill_HDSC_Controller( i );
		this._drill_HDSC_controllerTank[i] = temp_controller;
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_HDSC_checkSysData_Private = function(){
	
	// > 旧存档数据自动补充
	if( this._drill_HDSC_controllerTank == undefined ){
		this.drill_HDSC_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_HDSC_layers.length; i++ ){
		var temp_data = DrillUp.g_HDSC_layers[i];
			
		// > 未存储的，重新初始化
		if( this._drill_HDSC_controllerTank[i] == undefined ){
			var temp_controller = new Drill_HDSC_Controller( i );
			this._drill_HDSC_controllerTank[i] = temp_controller;
		
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
var _drill_HDSC_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_HDSC_temp_initialize2.call(this);
	this._drill_HDSC_spriteTank = [];			//贴图容器
	Graphics.drill_CODS_overstoryLayerClear();	//清空 天窗层
};
//==============================
// * 控制器与贴图 - 销毁时（地图界面）
//==============================
var _drill_HDSC_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function(){
	_drill_HDSC_smap_terminate.call(this);
	$gameTemp._drill_HDSC_spriteTank = [];		//贴图容器
	Graphics.drill_CODS_overstoryLayerClear();	//清空 天窗层
};
//==============================
// * 控制器与贴图 - 帧刷新（地图界面）
//==============================
var _drill_HDSC_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_drill_HDSC_smap_update.call(this);
	this.drill_HDSC_updateController();		//帧刷新 - 控制器
	this.drill_HDSC_updateAttr();			//帧刷新 - 基础特性
	this.drill_HDSC_updateDestroy();		//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时（地图界面）
//==============================
var _drill_HDSC_smap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_HDSC_smap_createAllWindows.call(this);
	this.drill_HDSC_create();				//创建
};
//==============================
// * 控制器与贴图 - 界面创建 （地图界面）
//==============================
Scene_Map.prototype.drill_HDSC_create = function(){
	$gameTemp._drill_HDSC_spriteTank = [];			//贴图容器（不允许出现null值）
	var cur_scene = SceneManager._scene;
	
	for(var i=0; i< $gameSystem._drill_HDSC_controllerTank.length; i++){
		var temp_controller = $gameSystem._drill_HDSC_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 如果关闭，则不创建
		var data = temp_controller.drill_data();
		if( cur_scene instanceof Scene_Map && data['map_enabled'] != true ){ continue; }
		if( cur_scene instanceof Scene_Battle && data['battle_enabled'] != true ){ continue; }
		if( cur_scene instanceof Scene_MenuBase && data['menu_enabled'] != true ){ continue; }
		
		
		// > 创建贴图
		var temp_sprite = new Drill_HDSC_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		
		// > 添加贴图到层级（天窗层）
		$gameTemp._drill_HDSC_spriteTank.push( temp_sprite );
		Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
		
	}
	
	// > 层级排序（天窗层）
	Graphics.drill_CODS_sortByZIndex();
}
//==============================
// * 控制器与贴图 - 帧刷新 控制器（地图界面）
//==============================
Scene_Map.prototype.drill_HDSC_updateController = function(){
	for(var i = 0; i < $gameSystem._drill_HDSC_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSC_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器帧刷新
		temp_controller.drill_controller_update();
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 基础特性
//==============================
Scene_Map.prototype.drill_HDSC_updateAttr = function(){
	var has_layerChange = false;
	for(var i = 0; i < $gameTemp._drill_HDSC_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_HDSC_spriteTank[i];
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
// * 控制器与贴图 - 帧刷新 销毁（地图界面）
//==============================
Scene_Map.prototype.drill_HDSC_updateDestroy = function(){
	
	// > 自动销毁 - 控制器
	for(var i = $gameSystem._drill_HDSC_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_HDSC_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_HDSC_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_HDSC_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_HDSC_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_HDSC_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};

//==============================
// * 控制器与贴图 - 销毁时（战斗界面）
//==============================
var _drill_HDSC_sbattle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function(){
	_drill_HDSC_sbattle_terminate.call(this);
	$gameTemp._drill_HDSC_spriteTank = [];		//贴图容器
	Graphics.drill_CODS_overstoryLayerClear();	//清空 天窗层
};
//==============================
// * 控制器与贴图 - 帧刷新（战斗界面）
//==============================
var _drill_HDSC_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	_drill_HDSC_sbattle_update.call(this);
	this.drill_HDSC_updateController();		//帧刷新 - 控制器
	this.drill_HDSC_updateDestroy();		//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时（战斗界面）
//==============================
var _drill_HDSC_sbattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function(){
	_drill_HDSC_sbattle_createAllWindows.call(this);
	this.drill_HDSC_create();
};
//==============================
// * 控制器与贴图 - 界面创建 （战斗界面）
//==============================
Scene_Battle.prototype.drill_HDSC_create = Scene_Map.prototype.drill_HDSC_create;
//==============================
// * 控制器与贴图 - 帧刷新 控制器（战斗界面）
//==============================
Scene_Battle.prototype.drill_HDSC_updateController = Scene_Map.prototype.drill_HDSC_updateController;
//==============================
// * 控制器与贴图 - 帧刷新 销毁（战斗界面）
//==============================
Scene_Battle.prototype.drill_HDSC_updateDestroy = Scene_Map.prototype.drill_HDSC_updateDestroy;

//==============================
// * 控制器与贴图 - 销毁时（菜单界面）
//==============================
var _drill_HDSC_smenu_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function(){
	_drill_HDSC_smenu_terminate.call(this);
	$gameTemp._drill_HDSC_spriteTank = [];		//贴图容器
	Graphics.drill_CODS_overstoryLayerClear();	//清空 天窗层
};
//==============================
// * 控制器与贴图 - 帧刷新（菜单界面）
//==============================
var _drill_HDSC_smenu_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function(){
	_drill_HDSC_smenu_update.call(this);
	this.drill_HDSC_updateController();		//帧刷新 - 控制器
	this.drill_HDSC_updateDestroy();		//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时（菜单界面）
//==============================
var _drill_HDSC_smenu_createWindowLayer = Scene_MenuBase.prototype.createWindowLayer;
Scene_MenuBase.prototype.createWindowLayer = function(){
	_drill_HDSC_smenu_createWindowLayer.call(this);
	this.drill_HDSC_create();
};
//==============================
// * 控制器与贴图 - 界面创建 （菜单界面）
//==============================
Scene_MenuBase.prototype.drill_HDSC_create = Scene_Map.prototype.drill_HDSC_create;
//==============================
// * 控制器与贴图 - 帧刷新 控制器（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_HDSC_updateController = Scene_Map.prototype.drill_HDSC_updateController;
//==============================
// * 控制器与贴图 - 帧刷新 销毁（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_HDSC_updateDestroy = Scene_Map.prototype.drill_HDSC_updateDestroy;



//=============================================================================
// ** 天窗层魔法圈控制器【Drill_HDSC_Controller】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个专门控制天窗层魔法圈的数据类。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体『界面装饰最终变换值』『变换特性的规范』
// **						->基础特性
// **							>  资源名
// **							>  可见
// **							>  混合模式
// **							x> 层级
// **							>  堆叠级
// **						->其它特性
// **							> 暂停/继续
// **					->B变换特性『变换特性-单贴图』
// **						>  锚点X
// **						>  锚点Y
// **						>  位置X
// **						>  位置Y
// **						>  缩放X
// **						>  缩放Y
// **						>  透明度
// **						>  斜切X
// **						>  斜切Y
// **						>  旋转
// **						>  转速
// **					->D指令叠加变化
// **						> 主体贴图>移动到
// **						> 主体贴图>透明度
// **						> 主体贴图>旋转
// **						> 圈贴图>转速
// **						> 层贴图>缩放X
// **						> 层贴图>缩放Y
// **						> 层贴图>斜切X
// **						> 层贴图>斜切Y
// **					->E延迟指令
// **					->F自变化效果
// **						> 主体贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>摇晃效果
// **						> 层贴图>缩放效果
// **		
// **		说明：	> 该类可存储。
// **				> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_HDSC_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_HDSC_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_HDSC_Controller.prototype.initialize = function( data_id ){
	this._drill_data_id = data_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
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
Drill_HDSC_Controller.prototype.drill_controller_update = function(){
	this.drill_controller_updateDelayingCommandImportant();		//帧刷新 - E延迟指令 - 时间流逝
	if( this._drill_pause == true ){ return; }
	this.drill_controller_updateAttr();							//帧刷新 - A主体
	this.drill_controller_updateChange_Rotation();				//帧刷新 - B变换特性 - 旋转
	this.drill_controller_updateCommandChange();				//帧刷新 - D指令叠加变化
	this.drill_controller_updateDelayingCommand();				//帧刷新 - E延迟指令 - 执行延迟指令
	this.drill_controller_updateEffect();						//帧刷新 - F自变化效果
	this.drill_controller_updateCheckNaN();						//帧刷新 - A主体 - 校验值
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data_id 数字
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//##############################
Drill_HDSC_Controller.prototype.drill_controller_resetData = function( data_id ){
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
Drill_HDSC_Controller.prototype.drill_controller_setVisible = function( visible ){
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
Drill_HDSC_Controller.prototype.drill_controller_setPause = function( pause ){
	this._drill_pause = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_HDSC_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_HDSC_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * 控制器 - 切换混合模式【标准函数】
//
//			参数：	> blendMode 数字
//			返回：	> 无
//##############################
Drill_HDSC_Controller.prototype.drill_controller_setBlendMode = function( blendMode ){
	this._drill_blendMode = blendMode;
};
//##############################
// * 控制器 - 切换图片层级【标准函数】
//
//			参数：	> zIndex 数字
//			返回：	> 无
//##############################
Drill_HDSC_Controller.prototype.drill_controller_setZIndex = function( zIndex ){
	this._drill_zIndex = zIndex;
};

//##############################
// * 控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_HDSC_Controller.prototype.drill_controller_initData = function(){
	var data = this.drill_data();		//（此处会修改到 静态数据 的指针值）
	
	// > A主体 - 基础特性
	if( data['src_img'] == undefined ){ data['src_img'] = "" };										//A主体 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Special__layer/" };		//A主体 - 文件夹
	if( data['tint'] == undefined ){ data['tint'] = 0 };											//A主体 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };									//A主体 - 图像-模糊边缘
	
	if( data['visible'] == undefined ){ data['visible'] = true };									//A主体 - 可见
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };									//A主体 - 混合模式
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };										//A主体 - 图片层级
	
	// > A主体 - 其它特性
	if( data['pause'] == undefined ){ data['pause'] = false };										//A主体 - 暂停情况
	
	
	// > B变换特性
	if( data['x'] == undefined ){ data['x'] = 0 };													//B变换特性 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };													//B变换特性 - 平移Y
	if( data['rotate'] == undefined ){ data['rotate'] = 0 };										//B变换特性 - 转速（单位角度）
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };									//B变换特性 - 透明度
	if( data['anchor_x'] == undefined ){ data['anchor_x'] = 0.5 };									//B变换特性 - 锚点X
	if( data['anchor_y'] == undefined ){ data['anchor_y'] = 0.5 };									//B变换特性 - 锚点Y
	
	// > B变换特性 - 3d效果
	if( data['scale_x'] == undefined ){ data['scale_x'] = 1.0 };									//B变换特性 - 3d效果 - 整体缩放X
	if( data['scale_y'] == undefined ){ data['scale_y'] = 1.0 };									//B变换特性 - 3d效果 - 整体缩放Y
	if( data['skew_x'] == undefined ){ data['skew_x'] = 0 };										//B变换特性 - 3d效果 - 整体斜切X
	if( data['skew_y'] == undefined ){ data['skew_y'] = 0 };										//B变换特性 - 3d效果 - 整体斜切Y
	if( data['parentRotate'] == undefined ){ data['parentRotate'] = 0 };							//B变换特性 - 3d效果 - 整体再旋转角度（单位角度）
	
	
	// > D指令叠加变化（无）
	
	// > E延迟指令（无）
	
	// > F自变化效果
	if( data['effect_float'] == undefined ){ data['effect_float'] = "关闭" };						//F自变化效果 - 浮动效果
	if( data['effect_floatSpeed'] == undefined ){ data['effect_floatSpeed'] = 1.0 };				//F自变化效果 - 浮动速度
	if( data['effect_floatRange'] == undefined ){ data['effect_floatRange'] = 15 };					//F自变化效果 - 浮动偏移量
	if( data['effect_flicker'] == undefined ){ data['effect_flicker'] = "关闭" };					//F自变化效果 - 闪烁效果
	if( data['effect_flickerSpeed'] == undefined ){ data['effect_flickerSpeed'] = 6.0 };			//F自变化效果 - 闪烁速度
	if( data['effect_flickerRange'] == undefined ){ data['effect_flickerRange'] = 20 };				//F自变化效果 - 闪烁幅度范围
	if( data['effect_swing'] == undefined ){ data['effect_swing'] = "关闭" };						//F自变化效果 - 摇晃效果
	if( data['effect_swingSpeed'] == undefined ){ data['effect_swingSpeed'] = 4.0 };				//F自变化效果 - 摇晃速度
	if( data['effect_swingRange'] == undefined ){ data['effect_swingRange'] = 12 };					//F自变化效果 - 摇晃幅度范围
	if( data['effect_zoom'] == undefined ){ data['effect_zoom'] = "关闭" };							//F自变化效果 - 缩放效果
	if( data['effect_zoomSpeed'] == undefined ){ data['effect_zoomSpeed'] = 1.0 };					//F自变化效果 - 缩放速度
	if( data['effect_zoomRange'] == undefined ){ data['effect_zoomRange'] = 0.2 };					//F自变化效果 - 缩放幅度范围
}
//==============================
// * 初始化 - 初始化子功能
//==============================
Drill_HDSC_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();				//初始化子功能 - A主体
	this.drill_controller_initChange();				//初始化子功能 - B变换特性
	this.drill_controller_initCommandChange();		//初始化子功能 - D指令叠加变化
	this.drill_controller_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_controller_initEffect();				//初始化子功能 - F自变化效果
}
//==============================
// * 控制器 - 重设数据（私有）
//==============================
Drill_HDSC_Controller.prototype.drill_controller_resetData_Private = function( data_id ){
	
	// > 参数检查
	if( typeof data_id != "number" ){
		alert( DrillUp.drill_HDSC_getPluginTip_controllerData_NotId("Drill_HDSC_Controller") );
		throw Error( DrillUp.drill_HDSC_getPluginTip_controllerData_NotId("Drill_HDSC_Controller") );
		return;
	}
	
	// > 执行重置
	this._drill_data_id = data_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
}
//##############################
// * 控制器 - 空的静态数据
//			
//			说明：	> 空数据会在initData时会进行默认值初始化，在其他地方只读。
//##############################
Drill_HDSC_Controller.emptyData = {};
//##############################
// * 控制器 - 获取静态数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，不要存储到存档中，也不要直接挂载到Controller身上。
//					> 静态数据会在initData时会进行默认值初始化，在其他地方只读。
//					> 【此函数不含遍历，而是直接获取值，可以放在帧刷新中使用】
//##############################
Drill_HDSC_Controller.prototype.drill_data = function(){
	var data = DrillUp.g_HDSC_layers[ this._drill_data_id ];
	if( data == undefined ){ return Drill_HDSC_Controller.emptyData; }
	return data;
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_HDSC_Controller.prototype.drill_controller_initAttr = function(){
	var data = this.drill_data();
	
	// > A主体 - 基础特性
	this._drill_visible = data['visible'];
	this._drill_blendMode = data['blendMode'];
	this._drill_zIndex = data['zIndex'];
	
	// > A主体 - 其它特性
	this._drill_pause = data['pause'];
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_HDSC_Controller.prototype.drill_controller_updateAttr = function(){
	
	// > 时间流逝
	this._drill_curTime += 1;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_HDSC_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_HDSC_checkNaN == true ){
		if( isNaN( this._drill_change_x ) ){
			DrillUp.g_HDSC_checkNaN = false;
			alert( DrillUp.drill_HDSC_getPluginTip_ParamIsNaN( "_drill_change_x" ) );
		}
		if( isNaN( this._drill_change_y ) ){
			DrillUp.g_HDSC_checkNaN = false;
			alert( DrillUp.drill_HDSC_getPluginTip_ParamIsNaN( "_drill_change_y" ) );
		}
		if( isNaN( this._drill_change_opacity ) ){
			DrillUp.g_HDSC_checkNaN = false;
			alert( DrillUp.drill_HDSC_getPluginTip_ParamIsNaN( "_drill_change_opacity" ) );
		}
		if( isNaN( this._drill_change_scaleX ) ){
			DrillUp.g_HDSC_checkNaN = false;
			alert( DrillUp.drill_HDSC_getPluginTip_ParamIsNaN( "_drill_change_scaleX" ) );
		}
		if( isNaN( this._drill_change_scaleY ) ){
			DrillUp.g_HDSC_checkNaN = false;
			alert( DrillUp.drill_HDSC_getPluginTip_ParamIsNaN( "_drill_change_scaleY" ) );
		}
	}
}

//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_HDSC_Controller.prototype.drill_controller_initChange = function(){
	var data = this.drill_data();
	
	// > 变换值 - 锚点
	this._drill_change_anchor_x = data['anchor_x'];
	this._drill_change_anchor_y = data['anchor_y'];
	
	// > 变换值 - 位置
	this._drill_change_x = data['x'];
	this._drill_change_y = data['y'];
	
	
	// > 变换值 - 缩放
	this._drill_change_scaleX = data['scale_x'];	//（3d效果）
	this._drill_change_scaleY = data['scale_y'];
	
	// > 变换值 - 缩放（圈贴图）
	//	（无）
	
	
	// > 变换值 - 透明度
	this._drill_change_opacity = data['opacity'];
	
	
	// > 变换值 - 斜切
	this._drill_change_skewX = data['skew_x'];		//（3d效果）
	this._drill_change_skewY = data['skew_y'];
	
	// > 变换值 - 斜切（圈贴图）
	//	（无）
	
	
	// > 变换值 - 旋转
	this._drill_change_rotate = data['parentRotate'];		//（整体再旋转角度）
	
	// > 变换值 - 旋转（圈贴图）
	this._drill_childCircle_rotation = 0;					//（自旋转）
	this._drill_childCircle_rotateSpeed = data['rotate'];	//（自旋转速度）
}
//==============================
// * B变换特性 - 帧刷新 旋转
//==============================
Drill_HDSC_Controller.prototype.drill_controller_updateChange_Rotation = function(){
	
	// > 变换值 - 帧刷新 旋转（圈贴图）
	this._drill_childCircle_rotation += this.drill_controller_finalTransform_rotateSpeed();
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置X（可继承，开放函数）
//##############################
Drill_HDSC_Controller.prototype.drill_controller_finalTransform_x = function(){
	return this._drill_change_x;
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置Y（可继承，开放函数）
//##############################
Drill_HDSC_Controller.prototype.drill_controller_finalTransform_y = function(){
	return this._drill_change_y;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放X（可继承，开放函数）
//##############################
Drill_HDSC_Controller.prototype.drill_controller_finalTransform_scaleX = function(){
	return this._drill_change_scaleX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放Y（可继承，开放函数）
//##############################
Drill_HDSC_Controller.prototype.drill_controller_finalTransform_scaleY = function(){
	return this._drill_change_scaleY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 透明度（可继承，开放函数）
//##############################
Drill_HDSC_Controller.prototype.drill_controller_finalTransform_opacity = function(){
	return this._drill_change_opacity;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切X（可继承，开放函数）
//##############################
Drill_HDSC_Controller.prototype.drill_controller_finalTransform_skewX = function(){
	return this._drill_change_skewX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切Y（可继承，开放函数）
//##############################
Drill_HDSC_Controller.prototype.drill_controller_finalTransform_skewY = function(){
	return this._drill_change_skewY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 旋转（可继承，开放函数）
//##############################
Drill_HDSC_Controller.prototype.drill_controller_finalTransform_rotate = function(){
	return this._drill_change_rotate;
}
//##############################
// * B变换特性 - 数据最终变换值 - 转速（可继承，开放函数）
//##############################
Drill_HDSC_Controller.prototype.drill_controller_finalTransform_rotateSpeed = function(){
	return this._drill_childCircle_rotateSpeed;
}


//==============================
// * D指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_HDSC_Controller.prototype.drill_controller_initCommandChange = function(){
	
	// > 控制器参数 - 移动到
	this["_drill_command_move_data"] = undefined;
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	// > 控制器参数 - 转速
	this["_drill_command_rotateSpeed_data"] = undefined;
	
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
Drill_HDSC_Controller.prototype.drill_controller_updateCommandChange = function(){
	
	// > 帧刷新 - 移动到（二维弹道）
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_update( this, "_drill_command_move_data" );
	
	// > 帧刷新 - 透明度
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_opacity_data" );
	
	// > 帧刷新 - 旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_rotate_data" );
	// > 帧刷新 - 转速
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_rotateSpeed_data" );
	
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
Drill_HDSC_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
	// > 控制器参数 - 移动到
	//	（这里不含）
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	// > 控制器参数 - 转速
	this["_drill_command_rotateSpeed_data"] = undefined;
	
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
Drill_HDSC_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = undefined;
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动到
//==============================
Drill_HDSC_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", data['x'], data['y'],		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 透明度
//==============================
Drill_HDSC_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 旋转
//==============================
Drill_HDSC_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", data['parentRotate'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 转速
//==============================
Drill_HDSC_Controller.prototype.drill_controller_commandChange_setRotateSpeed = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotateSpeed_data", data['rotate'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放X
//==============================
Drill_HDSC_Controller.prototype.drill_controller_commandChange_setScaleX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleX_data", data['scale_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放Y
//==============================
Drill_HDSC_Controller.prototype.drill_controller_commandChange_setScaleY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", data['scale_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切X
//==============================
Drill_HDSC_Controller.prototype.drill_controller_commandChange_setSkewX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewX_data", data['skew_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切Y
//==============================
Drill_HDSC_Controller.prototype.drill_controller_commandChange_setSkewY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewY_data", data['skew_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}


//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_HDSC_Controller.prototype.drill_controller_initDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}
//==============================
// * E延迟指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_HDSC_Controller.prototype.drill_controller_updateDelayingCommandImportant = function(){
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
Drill_HDSC_Controller.prototype.drill_controller_updateDelayingCommand = function(){
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
			}else if( method == "drill_controller_commandChange_setRotate" ){
				this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setRotateSpeed" ){
				this.drill_controller_commandChange_setRotateSpeed( paramList[0], paramList[1], paramList[2] );
				
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
Drill_HDSC_Controller.prototype.drill_controller_setDelayingCommand = function( method, paramList, delay_time ){
	if( method != "drill_controller_setVisible" &&
		method != "drill_controller_setPause" &&
		
		method != "drill_controller_commandChange_setOpacity" &&
		method != "drill_controller_commandChange_setRotate" &&
		method != "drill_controller_commandChange_setRotateSpeed" &&
		
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
Drill_HDSC_Controller.prototype.drill_controller_clearDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}


//==============================
// * F自变化效果 - 初始化子功能
//==============================
Drill_HDSC_Controller.prototype.drill_controller_initEffect = function(){
	this._drill_curEffectTime = 0;
}
//==============================
// * F自变化效果 - 帧刷新
//==============================
Drill_HDSC_Controller.prototype.drill_controller_updateEffect = function(){
	this._drill_curEffectTime += 1;
}



//=============================================================================
// ** 天窗层魔法圈贴图【Drill_HDSC_Sprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个魔法圈贴图。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					->A主体
// **					->B变换特性
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **					->D指令叠加变化-控制器用
// **					->E延迟指令
// **					->F自变化效果
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
// * 魔法圈贴图 - 定义
//==============================
function Drill_HDSC_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_HDSC_Sprite.prototype = Object.create(Sprite.prototype);
Drill_HDSC_Sprite.prototype.constructor = Drill_HDSC_Sprite;
//==============================
// * 魔法圈贴图 - 初始化
//==============================
Drill_HDSC_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 魔法圈贴图 - 帧刷新
//==============================
Drill_HDSC_Sprite.prototype.update = function(){
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A主体
	this.drill_sprite_updateChange();				//帧刷新 - B变换特性
													//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateCommandChange();		//帧刷新 - D指令叠加变化-控制器用
													//帧刷新 - E延迟指令（无）
	this.drill_sprite_updateEffect();				//帧刷新 - F自变化效果
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_HDSC_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
	this._drill_curSerial = controller._drill_controllerSerial;
};
//##############################
// * C对象绑定 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_HDSC_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B变换特性
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initCommandChange();		//初始化子功能 - D指令叠加变化-控制器用
	this.drill_sprite_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_sprite_initEffect();				//初始化子功能 - F自变化效果
};

//##############################
// * 魔法圈贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_HDSC_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 魔法圈贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_HDSC_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 魔法圈贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_HDSC_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 魔法圈贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_HDSC_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 魔法圈贴图 - 贴图初始化（私有）
//==============================
Drill_HDSC_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 魔法圈贴图 - 销毁子功能（私有）
//==============================
Drill_HDSC_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	this._drill_layerSprite.removeChild( this._drill_childCircleSprite );
	this.removeChild( this._drill_layerSprite );
	this._drill_childCircleSprite = null;
	this._drill_layerSprite = null;
	
	// > 销毁 - B变换特性
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
};
//==============================
// * 魔法圈贴图 - 销毁自身（私有）
//==============================
Drill_HDSC_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_HDSC_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller.drill_data();
	/*
		贴图的层级如下：
			- 主体贴图
			- - 层贴图
			- - - 圈贴图
		
		其中，圈贴图专门用于旋转（所以缩放必须为1.0），层贴图可以带遮罩，
		主体贴图和层贴图的缩放旋转效果一样，可以看情况自定义，不需要刻意区分。
	*/
	
	// > 主体贴图
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = this._drill_controller._drill_visible;
	this.blendMode = this._drill_controller._drill_blendMode;
	this.zIndex = this._drill_controller._drill_zIndex;
	
	// > 圈贴图
	var temp_sprite = new Sprite(); 
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.blendMode = this._drill_controller._drill_blendMode;
	temp_sprite.bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'], data['tint'], data['smooth'] );
	this._drill_childCircleSprite = temp_sprite;
	
	// > 层贴图
	var temp_layer = new Sprite();		//魔法圈样式两层容器
	temp_layer.anchor.x = 0.5;
	temp_layer.anchor.y = 0.5;
	temp_layer.blendMode = this._drill_controller._drill_blendMode;
	this._drill_layerSprite = temp_layer;
	
	this._drill_layerSprite.addChild( this._drill_childCircleSprite );
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_HDSC_Sprite.prototype.drill_sprite_updateAttr = function(){
	
	// > 基础特性 - 可见
	this.visible = this._drill_controller._drill_visible;

	// > 基础特性 - 混合模式
	if( this.blendMode != this._drill_controller._drill_blendMode ){
		this.blendMode =  this._drill_controller._drill_blendMode;
		this._drill_layerSprite.blendMode = this._drill_controller._drill_blendMode;
		this._drill_childCircleSprite.blendMode = this._drill_controller._drill_blendMode;
	}
	
	//（其它 基础特性 的帧刷新赋值见：drill_HDSC_updateAttr）
}


//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_HDSC_Sprite.prototype.drill_sprite_initChange = function(){
	//（无）
}
//==============================
// * B变换特性 - 帧刷新
//==============================
Drill_HDSC_Sprite.prototype.drill_sprite_updateChange = function(){
	
	// > 贴图 - 锚点（圈贴图）
	//		（锚点只能放 圈贴图 才能有效）
	this._drill_childCircleSprite.anchor.x = this._drill_controller._drill_change_anchor_x;
	this._drill_childCircleSprite.anchor.y = this._drill_controller._drill_change_anchor_y;
	
	
	// > 贴图 - 位置
	var xx = this._drill_controller.drill_controller_finalTransform_x();
	var yy = this._drill_controller.drill_controller_finalTransform_y();
	this.x = xx;
	this.y = yy;
	
	
	// > 贴图 - 缩放
	this._drill_layerSprite.scale.x  = this._drill_controller.drill_controller_finalTransform_scaleX();
	this._drill_layerSprite.scale.y  = this._drill_controller.drill_controller_finalTransform_scaleY();
	
	// > 贴图 - 缩放（圈贴图）
	//	（无）
	
	
	// > 贴图 - 透明度
	this.opacity = this._drill_controller.drill_controller_finalTransform_opacity();
	
	
	// > 贴图 - 斜切
	this._drill_layerSprite.skew.x   = this._drill_controller.drill_controller_finalTransform_skewX();
	this._drill_layerSprite.skew.y   = this._drill_controller.drill_controller_finalTransform_skewY();
	
	// > 贴图 - 斜切（圈贴图）
	//	（无）
	
	
	// > 贴图 - 旋转
	this.rotation = this._drill_controller.drill_controller_finalTransform_rotate() *Math.PI/180;
	
	// > 贴图 - 旋转（圈贴图）
	this._drill_childCircleSprite.rotation = this._drill_controller._drill_childCircle_rotation *Math.PI/180;
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
Drill_HDSC_Sprite.prototype.drill_sprite_initCommandChange = function(){
	
	// > 贴图参数 - 移动到
	this["_drill_command_move_spriteData"] = undefined;
	
	// > 贴图参数 - 透明度
	this["_drill_command_opacity_spriteData"] = undefined;
	
	// > 贴图参数 - 旋转
	this["_drill_command_rotate_spriteData"] = undefined;
	// > 贴图参数 - 转速
	this["_drill_command_rotateSpeed_spriteData"] = undefined;
	
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
Drill_HDSC_Sprite.prototype.drill_sprite_updateCommandChange = function(){
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
	
	
	// > 旋转 - 帧刷新
	var CDataName = "_drill_command_rotate_data";
	var SDataName = "_drill_command_rotate_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 旋转 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_rotate = controller[CDataName]['cur_value'];	//（整体再旋转角度）
	}else{
		controller._drill_change_rotate = data['parentRotate'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 转速 - 帧刷新
	var CDataName = "_drill_command_rotateSpeed_data";
	var SDataName = "_drill_command_rotateSpeed_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 转速 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_childCircle_rotateSpeed = controller[CDataName]['cur_value'];
	}else{
		controller._drill_childCircle_rotateSpeed = data['rotate'];	//（没有数据时，赋值为 初始值）
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
Drill_HDSC_Sprite.prototype.drill_sprite_initDelayingCommand = function(){
	//（无）
}


//==============================
// * F自变化效果 - 初始化子功能
//==============================
Drill_HDSC_Sprite.prototype.drill_sprite_initEffect = function(){
	//（无）
}
//==============================
// * F自变化效果 - 帧刷新
//==============================
Drill_HDSC_Sprite.prototype.drill_sprite_updateEffect = function(){
	var data = this._drill_controller.drill_data();
	var cur_time = this._drill_controller._drill_curEffectTime;
	
	// > 浮动效果
	if( data['effect_float'] == "左右浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x += value;
	}
	if( data['effect_float'] == "上下浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.y += value;
	}
	if( data['effect_float'] == "左上右下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x += value;
		this.y += value;
	}
	if( data['effect_float'] == "右上左下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x -= value;
		this.y += value;
	}
	// > 闪烁效果
	if( data['effect_flicker'] == "开启" ){
		var speed = data['effect_flickerSpeed'];
		var range = data['effect_flickerRange'];
		this.opacity += range * Math.sin( cur_time * speed /180*Math.PI );
	}
	// > 摇晃效果
	if( data['effect_swing'] == "开启" ){
		var speed = data['effect_swingSpeed'];
		var range = data['effect_swingRange'];
		var value = range / 180 * Math.PI * Math.sin( cur_time * speed /180*Math.PI );
		this.rotation += value;
	}
	// > 缩放效果
	if( data['effect_zoom'] == "左右缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.x += value;
	}
	if( data['effect_zoom'] == "上下缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.y += value;
	}
	if( data['effect_zoom'] == "整体缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.x += value;
		this._drill_layerSprite.scale.y += value;
	}
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_HtmlDynamicSnapshotCircle = false;
		var pluginTip = DrillUp.drill_HDSC_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

