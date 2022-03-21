//=============================================================================
// Drill_AnimationCircle.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        动画 - 多层动画魔法圈
 * @author Drill_up
 * 
 * @Drill_LE_param "魔法圈样式-%d"
 * @Drill_LE_parentKey "---魔法圈样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_ACi_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_AnimationCircle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以添加魔法圈，绑定在一个指定的动画上面。播放动画时能出现魔法圈。
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面，战斗界面。
 *   作用于动画，伴随动画一起出现。
 * 2.更多详细的组合方法，去看看 "17.主菜单 > 多层组合装饰（对象装饰）.docx"。
 * 3.更多详细的设置效果，去看看 "12.动画 > 关于魔法效果与并行动画.docx"。
 * 细节：
 *   (1.动画魔法圈是一个具有持续时间的效果，分为 出现、持续、消失 三阶段。
 *   (2.战斗界面中，会因为动画效果播放中而一直等到动画播放完才进行下一指令。
 *      如果你需要制作不等待的持续效果，则需添加使用 并行动画 插件。
 * 绑定：
 *   (1.多个样式可以绑定同一个动画，在动画播放时同时出现。
 *   (2.你需要在插件中 配置样式 ，样式中设置绑定指定的动画id。
 *     （绑定后，配置的动画和rmmv动画同时播放，rmmv动画你需要手动设置额外持续时间）
 * 旧版本：
 *   (1.注意，该插件v1.4及以前的版本有非常大的幅度改动，配置的数据在更新插件后都会
 *      丢失，注意备份工程。
 * 设计：
 *   (1.你可以通过插件指令立即关闭特定的动画魔法圈样式，
 *      实现长时间持续的 魔法防御盾 被打断的效果。
 *      更高级的还可以直接将 动画魔法圈 绑定于 状态，
 *      具体去看看 "17.主菜单 > 多层组合装饰（对象装饰）.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__anim （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__anim文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 魔法圈样式1 资源-魔法圈
 * 魔法圈样式2 资源-魔法圈
 * 魔法圈样式3 资源-魔法圈
 * ……
 *
 * 你可以在同一个动画里面加入非常多的不同种类的样式，并且持续时间可以非常长。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制动画魔法圈样式的显示情况：
 * 
 * 插件指令：>动画魔法圈 : 样式[2] : 显示
 * 插件指令：>动画魔法圈 : 样式[2] : 隐藏
 * 
 * 1.如果样式被隐藏，则新动画不会显示该样式，但正在播放的不会变。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 只样式条件
 * 你可以通过插件指令对播放中的动画魔法圈样式进行设置：
 * 
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 立即显示
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 立即隐藏
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 立即消失
 *
 * 1."立即显示/隐藏"可以使得正在播放的样式瞬间显示/隐藏。
 *   "立即出现"可以使得播放的动画立刻跳过 出现状态。
 *   "立即消失"可以使得播放的动画立刻进入 消失状态。
 * 2.具体使用方法，可以去物体管理层西北角的"中断蓄力动画"看看。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 样式条件和地图物体
 * 你可以通过插件指令对播放中的动画魔法圈样式进行设置：
 * 
 * 插件指令：>动画魔法圈 : 所有样式 : 本事件 : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 本事件 : 立即出现
 * 
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 玩家 : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 本事件 : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 事件[10] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 事件变量[21] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 批量事件[10,11] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 批量事件变量[21,22] : 立即出现
 * 
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 本事件 : 立即显示
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 本事件 : 立即隐藏
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 本事件 : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 本事件 : 立即消失
 * 
 * 1.前半部分（所有样式）中间部分（本事件）和 后半部分（立即出现）
 *   的参数可以随意组合。一共有2*6*4种组合方式。
 * 2.通过插件指令可以直接控制到地图界面中一个具体事件的一个具体魔法圈。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 样式条件和战斗单位
 * 你可以通过插件指令对播放中的动画魔法圈样式进行设置：
 * 
 * 插件指令：>动画魔法圈 : 所有样式 : 敌方[2] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 敌方[2] : 立即出现
 * 
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 敌方[2] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 敌方全体 : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 敌方变量[21] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 我方[2] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 我方全体 : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 我方变量[21] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 战斗敌人[5] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 战斗敌人变量[21] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 战斗角色[5] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 战斗角色变量[21] : 立即出现
 * 
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 敌方[2] : 立即显示
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 敌方[2] : 立即隐藏
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 敌方[2] : 立即出现
 * 插件指令：>动画魔法圈 : 播放中的样式[2] : 敌方[2] : 立即消失
 * 
 * 1.前半部分（所有样式）中间部分（敌方[2]）和 后半部分（立即出现）
 *   的参数可以随意组合。一共有2*10*4种组合方式。
 * 2.通过插件指令可以直接控制到战斗界面中一个具体单位的一个具体魔法圈。
 * 3."敌方[1]"表示从左往右第1个敌人，
 *   "敌人[5]"表示所有 敌人id 为5的敌方单位。
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
 * 测试方法：   在地图界面中播放4个含动画粒子的动画。
 * 测试结果：   200个事件的地图中，平均消耗为：【27.49ms】
 *              100个事件的地图中，平均消耗为：【21.18ms】
 *               50个事件的地图中，平均消耗为：【16.40ms】
 * 测试方法2：  在战斗界面中播放4个含动画粒子的动画。
 * 测试结果2：  战斗界面平均消耗为：【11.35ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.动画开始播放后，相关的装饰贴图不但要与动画位置同步，还需要
 *   找到 父贴图后面层 并进行位置校准，还需播放自身的贴图效果。
 *   虽然少量时消耗不大，但数量多了，可能会造成较大的消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 可以使得魔法圈样式设置在图像的后面。优化了插件扩展关系。
 * [v1.2]
 * 修改了内部结构。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 添加了最大值编辑的支持。
 * [v1.5]
 * 大幅度修改加强了插件的内部结构。
 * [v1.6]
 * 修复了动画位置为画面时，父贴图后面层仍然跟随施法者移动的bug。
 * [v1.7]
 * 修复了动画删除时出错的bug。
 * 
 * 
 * @param ---魔法圈样式组 1至20---
 * @default
 *
 * @param 魔法圈样式-1
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-2
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-3
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-4
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-5
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-6
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-7
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-8
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-9
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-10
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-11
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-12
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-13
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-14
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-15
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-16
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-17
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-18
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-19
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-20
 * @parent ---魔法圈样式组 1至20---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param ---魔法圈样式组21至40---
 * @default
 *
 * @param 魔法圈样式-21
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-22
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-23
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-24
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-25
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-26
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-27
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-28
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-29
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-30
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-31
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-32
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-33
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-34
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-35
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-36
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-37
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-38
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-39
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-40
 * @parent ---魔法圈样式组21至40---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param ---魔法圈样式组41至60---
 * @default
 *
 * @param 魔法圈样式-41
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-42
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-43
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-44
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-45
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-46
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-47
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-48
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-49
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-50
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-51
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-52
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-53
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-54
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-55
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-56
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-57
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-58
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-59
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-60
 * @parent ---魔法圈样式组41至60---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param ---魔法圈样式组61至80---
 * @default
 *
 * @param 魔法圈样式-61
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-62
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-63
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-64
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-65
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-66
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-67
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-68
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-69
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-70
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-71
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-72
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-73
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-74
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-75
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-76
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-77
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-78
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-79
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-80
 * @parent ---魔法圈样式组61至80---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param ---魔法圈样式组81至100---
 * @default
 *
 * @param 魔法圈样式-81
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-82
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-83
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-84
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-85
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-86
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-87
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-88
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-89
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-90
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-91
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-92
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-93
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-94
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-95
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-96
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-97
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-98
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-99
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-100
 * @parent ---魔法圈样式组81至100---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param ---魔法圈样式组101至120---
 * @default
 *
 * @param 魔法圈样式-101
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-102
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-103
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-104
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-105
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-106
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-107
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-108
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-109
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-110
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-111
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-112
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-113
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-114
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-115
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-116
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-117
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-118
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-119
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-120
 * @parent ---魔法圈样式组101至120---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param ---魔法圈样式组121至140---
 * @default
 *
 * @param 魔法圈样式-121
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-122
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-123
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-124
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-125
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-126
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-127
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-128
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-129
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-130
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-131
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-132
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-133
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-134
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-135
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-136
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-137
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-138
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-139
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-140
 * @parent ---魔法圈样式组121至140---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param ---魔法圈样式组141至160---
 * @default
 *
 * @param 魔法圈样式-141
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-142
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-143
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-144
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-145
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-146
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-147
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-148
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-149
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-150
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-151
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-152
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-153
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-154
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-155
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-156
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-157
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-158
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-159
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-160
 * @parent ---魔法圈样式组141至160---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param ---魔法圈样式组161至180---
 * @default
 *
 * @param 魔法圈样式-161
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-162
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-163
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-164
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-165
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-166
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-167
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-168
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-169
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-170
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-171
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-172
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-173
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-174
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-175
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-176
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-177
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-178
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-179
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-180
 * @parent ---魔法圈样式组161至180---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param ---魔法圈样式组181至200---
 * @default
 *
 * @param 魔法圈样式-181
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-182
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-183
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-184
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-185
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-186
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-187
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-188
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-189
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-190
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-191
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-192
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-193
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-194
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-195
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-196
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-197
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-198
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-199
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 *
 * @param 魔法圈样式-200
 * @parent ---魔法圈样式组181至200---
 * @type struct<ACiStyle>
 * @desc 动画魔法圈样式的详细配置信息。
 * @default 
 */
/*~struct~ACiStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的动画魔法圈样式==
 * 
 * @param --绑定--
 * @desc 
 *
 * @param 绑定的动画
 * @parent --绑定--
 * @type animation
 * @desc 指定动画的id，魔法圈样式将会与动画相互绑定。
 * @default 0
 *
 * @param 初始是否显示
 * @parent --绑定--
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 * 
 * @param --贴图--
 * @desc 
 *
 * @param 资源-魔法圈
 * @parent --贴图--
 * @desc 魔法圈的图片资源。
 * @default 动画魔法圈-默认
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 * @param 平移-魔法圈 X
 * @parent --贴图--
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-魔法圈 Y
 * @parent --贴图--
 * @desc y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 混合模式
 * @parent --贴图--
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"混合模式.docx"。
 * @default 0
 *
 * @param 旋转速度
 * @parent --贴图--
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 10.0
 *
 * @param 动画层级
 * @parent --贴图--
 * @type select
 * @option 在父贴图后面
 * @value 在父贴图后面
 * @option 在动画后面
 * @value 在动画后面
 * @option 在动画前面
 * @value 在动画前面
 * @desc 该样式所属的动画层级。父贴图后面是指：战斗时，敌人/玩家贴图的后面，地图中，事件贴图的后面。
 * @default 在动画后面
 *
 * @param 图片层级
 * @parent --贴图--
 * @type number
 * @min 0
 * @desc 魔法圈在同一个动画，并且在同一动画层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 * @param --动画过程--
 * @desc 
 *
 * @param 出现延迟
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 魔法圈样式将延迟一段时间显现，单位帧。
 * @default 0
 *
 * @param 出现时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 魔法圈样式显现的时间，单位帧。
 * @default 60
 *
 * @param 出现模式
 * @parent --动画过程--
 * @type select
 * @option 横向显现
 * @value 横向显现
 * @option 纵向显现
 * @value 纵向显现
 * @option 放大显现
 * @value 放大显现
 * @option 缩小显现
 * @value 缩小显现
 * @option 普通淡入显现
 * @value 普通淡入显现
 * @option 自定义
 * @value 自定义
 * @desc 魔法圈样式显现的模式方法。
 * @default 横向显现
 *
 * @param 出现-自定义缩放 X
 * @parent 出现模式
 * @desc 模式为"自定义"时，出现前的缩放 X。
 * @default 1.0
 *
 * @param 出现-自定义缩放 Y
 * @parent 出现模式
 * @desc 模式为"自定义"时，出现前的缩放 Y。
 * @default 1.0
 *
 * @param 出现-自定义透明度
 * @parent 出现模式
 * @type number
 * @min 0
 * @max 255
 * @desc 模式为"自定义"时，出现前的透明度。
 * @default 0
 *
 * @param 持续时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 魔法圈样式持续的时间，单位帧。
 * @default 220
 *
 * @param 持续模式
 * @parent --动画过程--
 * @type select
 * @option 常规值
 * @value 常规值
 * @option 自定义
 * @value 自定义
 * @desc 持续状态时的模式。常规值表示：缩放1.0，透明度255。
 * @default 常规值
 *
 * @param 持续-自定义缩放 X
 * @parent 持续模式
 * @desc 模式为"自定义"时，持续时的缩放 X。
 * @default 1.0
 *
 * @param 持续-自定义缩放 Y
 * @parent 持续模式
 * @desc 模式为"自定义"时，持续时的缩放 Y。
 * @default 1.0
 *
 * @param 持续-自定义透明度
 * @parent 持续模式
 * @type number
 * @min 0
 * @max 255
 * @desc 模式为"自定义"时，持续时的透明度。
 * @default 255
 *
 * @param 消失时长
 * @parent --动画过程--
 * @type number
 * @min 0
 * @desc 魔法圈样式显现的延迟时间。
 * @default 30
 *
 * @param 消失模式
 * @parent --动画过程--
 * @type select
 * @option 横向消失
 * @value 横向消失
 * @option 纵向消失
 * @value 纵向消失
 * @option 放大消失
 * @value 放大消失
 * @option 缩小消失
 * @value 缩小消失
 * @option 普通淡出消失
 * @value 普通淡出消失
 * @option 自定义
 * @value 自定义
 * @desc 魔法圈样式消失的模式方法。
 * @default 普通淡出消失
 *
 * @param 消失-自定义缩放 X
 * @parent 消失模式
 * @desc 模式为"自定义"时，消失时的缩放 X。
 * @default 1.0
 *
 * @param 消失-自定义缩放 Y
 * @parent 消失模式
 * @desc 模式为"自定义"时，消失时的缩放 Y。
 * @default 1.0
 *
 * @param 消失-自定义透明度
 * @parent 消失模式
 * @type number
 * @min 0
 * @max 255
 * @desc 模式为"自定义"时，消失时的透明度。
 * @default 0
 * 
 * 
 * @param --3d效果--
 * @desc 
 * 
 * @param 整体缩放 X
 * @parent --3d效果--
 * @desc 魔法圈的缩放X值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体缩放 Y
 * @parent --3d效果--
 * @desc 魔法圈的缩放Y值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体斜切 X
 * @parent --3d效果--
 * @desc 魔法圈的斜切X值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 整体斜切 Y
 * @parent --3d效果--
 * @desc 魔法圈的斜切Y值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ACi (Animation_Circle)
//		临时全局变量	DrillUp.g_ACi_style_xxx
//		临时局部变量	this._drill_ACi_xxx
//		存储数据变量	$gameSystem._drill_ACi_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)
//		性能测试因素	物体管理层、战斗界面
//		性能测试消耗	16.40ms（Game_Timer.prototype.update） 11.35ms（drill_updatePosition）
//		最坏情况		大量动画被同时播放。
//		备注			物体管理层里面卡爆了，只有3帧（由于其他插件太多），
//						但是在战斗界面中，动画持续播放时，能保持15帧（但是释法时，特别卡，应该是目标释法时变色的问题）。
//
//插件记录：
//		★大体框架与功能如下：
//			动画魔法圈样式：
//				->动画过程
//					> 延迟
//					> 出现
//					> 持续
//					> 消失
//				->父贴图后面层
//				->插件指令
//					->立即出现
//					->立即消失
//		
//		★私有类如下：
//			* Drill_ACi_Sprite	【动画魔法圈贴图】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//				_drill_animPBackArea 			父贴图后面层
//				_drill_animDownArea				动画后面层
//				_drill_animUpArea				动画前面层
//			2.这三层关系如下：
//				┕-	父贴图后面层（_drill_animPBackArea）
//				┕-	父贴图列表
//				┕-	动画贴图列表（不受控）
//					┕-	动画后面层（_drill_animDownArea）
//					┕-	动画帧贴图
//					┕-	动画前面层（_drill_animUpArea）
//			  注意，父贴图和动画贴图是并列的，该写法是原函数固定的，无法控制。（见Sprite_Base.prototype.startAnimation ）
//			3.留意下面的变量：
//				_drill_duration_decreased		减一锁（多次相互覆盖）
//				_drill_duration					延迟时间（多次相互覆盖）
//
//		★其它说明细节：
//			1.该插件的原理模式与菜单魔法圈样式有较大不同，虽然配置原理相似。
//			  最出现做的是仅限于地图中固定的蓄力魔法阵。
//			  但是那一类插件局限性太大，还需要考虑播放时间，而且还要阻止魔法蓄力的事件移动。
//			  后来发现其实魔法圈样式可以其实直接绑定在动画容器中，因为动画时绑定在所有sprite_base中的，任何地方都可以播放动画。一劳永逸。
//			  rmmv底层，任何sprite都绑定了一个动画容器_animationSprites，这就使得动画可以在很多地方被播放。
//			2.【动画容器_animationSprites】绕等级★，
//			  将魔法圈样式sprite绑定在动画中，在动画基础上，扩展动画播放的效果。
//			  但是绑定之后，消失效果会出现比较麻烦的情况。
//			  不好获取所有正在播放的动画。
//			  （后面都是通过绕路来添加其他插件的控制条件）
//			3.【父贴图后面层】绕等级★★，
//			  为了使得动画在角色身后，找父类找到最顶层的 Spriteset_Battle，然后找到指定的子类层，添加。
//			  并且要绑定随时变化的敌人/玩家位置。
//			  ._drill_animPBackArea 父贴图后面层
//			  ._drill_ACi_tempArea 父贴图后面层（临时）
//			  ._drill_bindingSprite 确定跟随位移
//			5.与 MOG_BattleHud 和 Drill_BattleCamera 有关联，用于定位第一人称下的动画位置。
//
//		★存在的问题：
//			暂无
//
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationCircle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationCircle');
	
	//==============================
	// * 变量获取 - 魔法圈样式
	//				（~struct~ACiStyle）
	//==============================
	DrillUp.drill_ACi_styleInit = function( dataFrom ){
		var data = {};
		data['anim'] = Number( dataFrom["绑定的动画"] || 0);
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		
		data['src_img'] = String( dataFrom["资源-魔法圈"] || "");
		data['x'] = Number( dataFrom["平移-魔法圈 X"] || 0);
		data['y'] = Number( dataFrom["平移-魔法圈 Y"] || 0);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['rotate'] = Number( dataFrom["旋转速度"] || 0) /180*Math.PI;
		data['anim_index'] = String( dataFrom["动画层级"] || "在动画后面");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		data['delay'] = Number( dataFrom["出现延迟"] || 0);
		data['birth'] = Number( dataFrom["出现时长"] || 20);
		data['birthMode'] = String( dataFrom["出现模式"] || "横向显现");
		data['birthScaleX'] = Number( dataFrom["出现-自定义缩放 X"] || 1.0);
		data['birthScaleY'] = Number( dataFrom["出现-自定义缩放 Y"] || 1.0);
		data['birthOpacity'] = Number( dataFrom["出现-自定义透明度"] || 0);
		data['sustain'] = Number( dataFrom["持续时长"] || 120);
		data['sustainMode'] = String( dataFrom["持续模式"] || "常规值");
		data['sustainScaleX'] = Number( dataFrom["持续-自定义缩放 X"] || 1.0);
		data['sustainScaleY'] = Number( dataFrom["持续-自定义缩放 Y"] || 1.0);
		data['sustainOpacity'] = Number( dataFrom["持续-自定义透明度"] || 255);
		data['death'] = Number( dataFrom["消失时长"] || 20);
		data['deathMode'] = String( dataFrom["消失模式"] || "普通淡出消失");
		data['deathScaleX'] = Number( dataFrom["消失-自定义缩放 X"] || 1.0);
		data['deathScaleY'] = Number( dataFrom["消失-自定义缩放 Y"] || 1.0);
		data['deathOpacity'] = Number( dataFrom["消失-自定义透明度"] || 0);
		
		data['scale_x'] = Number( dataFrom["整体缩放 X"] || 1.0);
		data['scale_y'] = Number( dataFrom["整体缩放 Y"] || 1.0);
		data['skew_x'] = Number( dataFrom["整体斜切 X"] || 0.0);
		data['skew_y'] = Number( dataFrom["整体斜切 Y"] || 0.0);
		return data;
	}
	
	/*-----------------魔法圈样式------------------*/
	DrillUp.g_ACi_style_length = 200;
	DrillUp.g_ACi_style = [];
	for( var i = 0; i < DrillUp.g_ACi_style_length; i++ ){
		if( DrillUp.parameters['魔法圈样式-' + String(i+1) ] != undefined &&
			DrillUp.parameters['魔法圈样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['魔法圈样式-' + String(i+1) ]);
			DrillUp.g_ACi_style[i] = DrillUp.drill_ACi_styleInit( data );
			DrillUp.g_ACi_style[i]['id'] = i+1;
			DrillUp.g_ACi_style[i]['inited'] = true;
		}else{
			DrillUp.g_ACi_style[i] = DrillUp.drill_ACi_styleInit( {} );
			DrillUp.g_ACi_style[i]['id'] = i+1;
			DrillUp.g_ACi_style[i]['inited'] = false;
		}
	}
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialAnim = function(filename) {
    return this.loadBitmap('img/Special__anim/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ACi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ACi_pluginCommand.call(this, command, args);
	if( command === ">动画魔法圈" ){
		
		/*-----------------对象组获取 - 样式------------------*/
		var style_str = null;
		var char_list = null;
		var actor_list = null;
		var enemy_list = null;
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( style_str == null && temp1.indexOf("播放中的样式[") != -1 ){
				temp1 = temp1.replace("播放中的样式[","");
				temp1 = temp1.replace("]","");
				style_str = temp1;
			}
			if( style_str == null &&temp1.indexOf("样式[") != -1 ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				style_str = temp1;
			}
		}
		/*-----------------对象组获取 - 物体------------------*/
		if( args.length >= 4 ){
			var unit = String(args[3]);
			if( char_list == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_ACi_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_ACi_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_ACi_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_ACi_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit == "玩家" ){
				char_list = [ $gamePlayer ];
			}
		}
		/*-----------------对象组获取 - 战斗单位------------------*/
		if( args.length >= 4 ){
			var unit = String(args[3]);
			if( enemy_list == null && unit == "敌方全体" ){
				enemy_list = [];
				for( var k=0; k < $gameTroop.members().length; k++ ){
					var battler = $gameTroop.members()[k];
					if( battler.isAlive() ){
						enemy_list.push( battler );
					}
				}
			}
			if( enemy_list == null && unit.indexOf("敌方[") != -1 ){
				unit = unit.replace("敌方[","");
				unit = unit.replace("]","");
				var battler_id = Number(unit)-1;
				var battler = $gameTroop.members()[ battler_id ];
				if( battler == undefined ){ return; }
				enemy_list = [];
				enemy_list.push( battler );
			}
			if( enemy_list == null && unit.indexOf("敌方变量[") != -1 ){
				unit = unit.replace("敌方变量[","");
				unit = unit.replace("]","");
				var battler_id = $gameVariables.value(Number(unit))-1;
				var battler = $gameTroop.members()[ battler_id ];
				if( battler == undefined ){ return; }
				enemy_list = [];
				enemy_list.push( battler );
			}
			
			if( actor_list == null && unit == "我方全体" ){
				actor_list = [];
				for( var k=0; k < $gameParty.members().length; k++ ){
					var battler = $gameParty.members()[k];
					if( battler.isAlive() ){
						actor_list.push( battler );
					}
				}
			}
			if( actor_list == null && unit.indexOf("我方[") != -1 ){
				unit = unit.replace("我方[","");
				unit = unit.replace("]","");
				var battler_id = Number(unit)-1;
				var battler = $gameParty.members()[ battler_id ];
				if( battler == undefined ){ return; }
				actor_list = [];
				actor_list.push( battler );
			}
			if( actor_list == null && unit.indexOf("我方变量[") != -1 ){
				unit = unit.replace("我方变量[","");
				unit = unit.replace("]","");
				var battler_id = $gameVariables.value(Number(unit))-1;
				var battler = $gameParty.members()[ battler_id ];
				if( battler == undefined ){ return; }
				actor_list = [];
				actor_list.push( battler );
			}
			
			if( enemy_list == null && unit.indexOf("战斗敌人变量[") != -1 ){
				unit = unit.replace("战斗敌人变量[","");
				unit = unit.replace("]","");
				enemy_list = [];
				var battler_id = $gameVariables.value(Number(unit));
				for( var k=0; k < $gameTroop.members().length; k++ ){
					var battler = $gameTroop.members()[k];
					if( battler._enemyId != battler_id ){ continue; }
					enemy_list.push( battler );
				}
			}
			if( enemy_list == null && unit.indexOf("战斗敌人[") != -1 ){
				unit = unit.replace("战斗敌人[","");
				unit = unit.replace("]","");
				enemy_list = [];
				var battler_id = Number(unit);
				for( var k=0; k < $gameTroop.members().length; k++ ){
					var battler = $gameTroop.members()[k];
					if( battler._enemyId != battler_id ){ continue; }
					enemy_list.push( battler );
				}
			}
			if( actor_list == null && unit.indexOf("战斗角色变量[") != -1 ){
				unit = unit.replace("战斗角色变量[","");
				unit = unit.replace("]","");
				actor_list = [];
				var battler_id = $gameVariables.value(Number(unit));
				for( var k=0; k < $gameParty.members().length; k++ ){
					var battler = $gameParty.members()[k];
					if( battler._actorId != battler_id ){ continue; }
					actor_list.push( battler );
				}
			}
			if( actor_list == null && unit.indexOf("战斗角色[") != -1 ){
				unit = unit.replace("战斗角色[","");
				unit = unit.replace("]","");
				actor_list = [];
				var battler_id = Number(unit);
				for( var k=0; k < $gameParty.members().length; k++ ){
					var battler = $gameParty.members()[k];
					if( battler._actorId != battler_id ){ continue; }
					actor_list.push( battler );
				}
			}
		}
		
		/*-----------------执行变化 - 只样式条件------------------*/
		if( style_str != null && args.length == 4){
			var type = String(args[3]);
			if( type === "显示" ){
				$gameSystem._drill_ACi_visible[ Number(style_str)-1 ] = true;
			}
			if( type === "隐藏" ){
				$gameSystem._drill_ACi_visible[ Number(style_str)-1 ] = false;
			}
			
			var sprite_list = [];
			if( style_str == "所有样式" ){
				sprite_list = $gameTemp.drill_ACi_getAllSpriteList();
			}else{
				sprite_list = $gameTemp.drill_ACi_getSpriteList( Number(style_str) );
			}
			
			if( type === "立即显示" ){
				$gameTemp.drill_ACi_setAnimVisible( sprite_list, true );
			}
			if( type === "立即隐藏" ){
				$gameTemp.drill_ACi_setAnimVisible( sprite_list, false );
			}
			if( type === "立即出现" ){
				$gameTemp.drill_ACi_setAnimBirth( sprite_list );
			}
			if( type === "立即消失" ){
				$gameTemp.drill_ACi_setAnimDeath( sprite_list );
			}
		}
		
		/*-----------------执行变化 - 样式+角色条件------------------*/
		if( style_str != null && args.length == 6){
			var type = String(args[5]);
			
			var sprite_list = [];
			if( style_str == "所有样式" ){
				if( char_list != null ){
					for( var i=0; i < char_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ACi_getAllSpriteList_Character(char_list[i]) );
					}
				}else if( actor_list != null ){
					for( var i=0; i < actor_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ACi_getAllSpriteList_Actor(actor_list[i]) );
					}
				}else if( enemy_list != null ){
					for( var i=0; i < enemy_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ACi_getAllSpriteList_Enemy(enemy_list[i]) );
					}
				}
			}else{
				if( char_list != null ){
					for( var i=0; i < char_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ACi_getSpriteList_Character( Number(style_str), char_list[i]) );
					}
				}else if( actor_list != null ){
					for( var i=0; i < actor_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ACi_getSpriteList_Actor( Number(style_str), actor_list[i]) );
					}
				}else if( enemy_list != null ){
					for( var i=0; i < enemy_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ACi_getSpriteList_Enemy( Number(style_str), enemy_list[i]) );
					}
				}
			}
			
			if( type === "立即显示" ){
				$gameTemp.drill_ACi_setAnimVisible( sprite_list, true );
			}
			if( type === "立即隐藏" ){
				$gameTemp.drill_ACi_setAnimVisible( sprite_list, false );
			}
			if( type === "立即出现" ){
				$gameTemp.drill_ACi_setAnimBirth( sprite_list );
			}
			if( type === "立即消失" ){
				$gameTemp.drill_ACi_setAnimDeath( sprite_list );
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ACi_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_AnimationCircle.js 动画 - 多层动画魔法圈】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 存储变量初始化
//=============================================================================
//==============================
// * 存储变量 - 初始化
//==============================
var _drill_ACi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ACi_sys_initialize.call(this);
	
	this._drill_ACi_visible = [];
	for(var i = 0; i < DrillUp.g_ACi_style.length ;i++){
		var data = DrillUp.g_ACi_style[i];
		if( data['inited'] == false ){ continue; }
		this._drill_ACi_visible[i] = data['visible'];
	}
};	

//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_ACi_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}

//=============================================================================
// * 动画魔法圈 容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_ACi_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_ACi_temp_initialize.call(this);
	
	this._drill_ACi_spriteTank = [];			//当前播放中的样式
	this._drill_ACi_lastAdded = [];				//上一次添加的 魔法圈贴图
	this._drill_ACi_lastAdded_PBack = [];		//上一次添加在父贴图后面的 魔法圈贴图
}
//==============================
// * 容器 - 获取贴图（接口）
//==============================
Game_Temp.prototype.drill_ACi_getSpriteList = function( style_id ){
	var result = [];
	for(var i = 0; i < this._drill_ACi_spriteTank.length; i++){
		var temp_sprite = this._drill_ACi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._drill_data['id'] == style_id ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取贴图 - 根据敌人对象（接口）
//==============================
Game_Temp.prototype.drill_ACi_getSpriteList_Enemy = function( style_id, enemy_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ACi_spriteTank.length; i++){
		var temp_sprite = this._drill_ACi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._drill_data['id'] == style_id &&
			temp_sprite._drill_parent_enemyObj == enemy_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取贴图 - 根据角色对象（接口）
//==============================
Game_Temp.prototype.drill_ACi_getSpriteList_Actor = function( style_id, actor_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ACi_spriteTank.length; i++){
		var temp_sprite = this._drill_ACi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._drill_data['id'] == style_id &&
			temp_sprite._drill_parent_actorObj == actor_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取贴图 - 根据物体对象（接口）
//==============================
Game_Temp.prototype.drill_ACi_getSpriteList_Character = function( style_id, character_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ACi_spriteTank.length; i++){
		var temp_sprite = this._drill_ACi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._drill_data['id'] == style_id &&
			temp_sprite._drill_parent_characterObj == character_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取全部贴图（接口）
//==============================
Game_Temp.prototype.drill_ACi_getAllSpriteList = function(){
	return this._drill_ACi_spriteTank;
}
//==============================
// * 容器 - 获取全部贴图 - 根据敌人对象（接口）
//==============================
Game_Temp.prototype.drill_ACi_getAllSpriteList_Enemy = function( enemy_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ACi_spriteTank.length; i++){
		var temp_sprite = this._drill_ACi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._drill_parent_enemyObj == enemy_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取全部贴图 - 根据角色对象（接口）
//==============================
Game_Temp.prototype.drill_ACi_getAllSpriteList_Actor = function( actor_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ACi_spriteTank.length; i++){
		var temp_sprite = this._drill_ACi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._drill_parent_actorObj == actor_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取全部贴图 - 根据物体对象（接口）
//==============================
Game_Temp.prototype.drill_ACi_getAllSpriteList_Character = function( character_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ACi_spriteTank.length; i++){
		var temp_sprite = this._drill_ACi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._drill_parent_characterObj == character_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器筛选器 - 获取列表中指定动画的贴图
//==============================
Game_Temp.prototype.drill_ACi_selectSpriteByAnimId = function( sprite_list, anim_id ){
	var result = [];
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite._drill_data['anim'] == anim_id ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器操作 - 设置贴图立即显示/隐藏（接口）
//==============================
Game_Temp.prototype.drill_ACi_setAnimVisible = function( sprite_list, v ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		temp_sprite.visible = v;
	}
}
//==============================
// * 容器操作 - 设置贴图立即出现（接口）
//==============================
Game_Temp.prototype.drill_ACi_setAnimBirth = function( sprite_list ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite.drill_getState() == "延迟" ||
			temp_sprite.drill_getState() == "出现" ){
			temp_sprite.drill_setState("持续");
		}
	}
}
//==============================
// * 容器操作 - 设置贴图立即消失（接口）
//==============================
Game_Temp.prototype.drill_ACi_setAnimDeath = function( sprite_list ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite.drill_getState() != "消失" ){
			temp_sprite.drill_setState("消失");
		}
	}
}
//==============================
// * 容器 - 自动销毁
//==============================
var _drill_ACi_timer_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function( sceneActive ){
    _drill_ACi_timer_update.call( this, sceneActive );
	for(var i = $gameTemp._drill_ACi_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_ACi_spriteTank[i];
		if( temp_sprite == null ){
			$gameTemp._drill_ACi_spriteTank.splice(i,1);
		}else if( temp_sprite.drill_isDead() ){
			if( temp_sprite.parent != null ){
				temp_sprite.parent.removeChild( temp_sprite );
			}
			$gameTemp._drill_ACi_spriteTank.splice(i,1);
			delete temp_sprite;
		}
	}
};


//=============================================================================
// ** 动画设置
//=============================================================================
//==============================
// * 工具 - 父类溯源
//
//			说明：	输入对象、父类定义，返回父类对象。没有则返回空。
//==============================
DrillUp.drill_ACi_getAncestor = function( sprite, ancestor_class ){
	for( var i=0; i < 8; i++){
		if( sprite.parent == undefined ){
			break;
		}
		var sprite = sprite.parent;
		if( sprite instanceof ancestor_class ){
			return sprite;
		}
	}
	return null;
}
//==============================
// * 动画 - 初始化
//==============================
var _drill_ACi_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
	_drill_ACi_initMembers.call(this);
	this._drill_duration = 0;			//最大持续时间
}
//==============================
// * 动画 - 判断是否含装饰
//==============================
Sprite_Animation.prototype.drill_ACi_hasStyleBinding = function( anim_id ){
	for( var i = 0; i < DrillUp.g_ACi_style.length; i++ ){
		var anim_data = DrillUp.g_ACi_style[i];
		if( anim_data['anim'] == anim_id ){
			return true;
		}
	}
	return false;
}
//==============================
// * 动画 - 设置
//==============================
var _drill_ACi_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	
	var has_binding = this.drill_ACi_hasStyleBinding( animation.id );
	if( has_binding ){
		
		// > 层级 - 父贴图后面层（预置，后续在父类中重置取出）
		if( !this._drill_ACi_tempArea ){	
			this._drill_ACi_tempArea = new Sprite();
			this.addChild(this._drill_ACi_tempArea);
		}
		// > 层级 - 动画后面层
		if( !this._drill_animDownArea ){
			this._drill_animDownArea = new Sprite();
			this.addChild(this._drill_animDownArea);
		}
	}
	
	// > 原函数
    _drill_ACi_setup.call(this,target, animation, mirror, delay);
	
	if( has_binding ){
		
		// > 层级 - 动画前面层
		if( !this._drill_animUpArea ){
			this._drill_animUpArea = new Sprite();
			this.addChild(this._drill_animUpArea);
		}
		
		// > 添加动画贴图
		$gameTemp._drill_ACi_lastAdded = [];
		$gameTemp._drill_ACi_lastAdded_PBack = [];
		for( var i = 0; i < DrillUp.g_ACi_style.length; i++ ){
			var anim_data = DrillUp.g_ACi_style[i];
			if( this._animation.id == anim_data['anim'] ){
				
				var temp_sprite = new Drill_ACi_Sprite( this._animation, anim_data );
				$gameTemp._drill_ACi_spriteTank.push( temp_sprite );
				$gameTemp._drill_ACi_lastAdded.push( temp_sprite );
				
				if( anim_data['anim_index'] == "在动画前面" ){
					this._drill_animUpArea.addChild( temp_sprite );
				}else if( anim_data['anim_index'] == "在动画后面" ){
					this._drill_animDownArea.addChild( temp_sprite );
				}else if( anim_data['anim_index'] == "在父贴图后面" ){
					this._drill_ACi_tempArea.addChild( temp_sprite );
					$gameTemp._drill_ACi_lastAdded_PBack.push( temp_sprite );
				}
				this._drill_duration =  Math.max(this._drill_duration, Math.max( temp_sprite._drill_time_all + 1 , this._duration));
			}
		}
		this.drill_ACi_sortByZIndex();
		//alert(JSON.stringify(this._animation));
	}
	
	// 连接-> （动画 - 绑定对象）
};
//==============================
// * 动画 - 绑定对象
//==============================
var _drill_ACi_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    _drill_ACi_startAnimation.call(this,animation, mirror, delay);
	
	// <-承接 （动画 - 设置）
	//	（前面的函数执行完后，会进入到该函数继续）
	
	this.drill_ACi_foreignKeyBinding();		//外键标记
	this.drill_ACi_charBackPuting();		//父贴图后面层 的 层级转移
	
	$gameTemp._drill_ACi_lastAdded = [];		//清空上一次添加的标记
	$gameTemp._drill_ACi_lastAdded_PBack = [];	//
}
//==============================
// * 动画 - 外键标记
//==============================
Sprite_Base.prototype.drill_ACi_foreignKeyBinding = function(){
	if( $gameTemp._drill_ACi_lastAdded.length == 0 ){ return; }
	
	// > 敌人贴图（战斗界面）
	if( this instanceof Sprite_Enemy ){
		for(var i=0; i < $gameTemp._drill_ACi_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_ACi_lastAdded[i];
			sprite._drill_bindingSprite = this;
			sprite._drill_parent_enemyObj = this._enemy;
		}
	}
	
	// > 角色贴图（战斗界面）
	if( this instanceof Sprite_Actor ){
		for(var i=0; i < $gameTemp._drill_ACi_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_ACi_lastAdded[i];
			sprite._drill_bindingSprite = this;
			sprite._drill_parent_actorObj = this._actor;
		}
	}
	
	// > 物体贴图（地图界面）
	if( this instanceof Sprite_Character && $gameTemp.drill_ACi_isReflectionSprite(this) == false ){
		for(var i=0; i < $gameTemp._drill_ACi_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_ACi_lastAdded[i];
			sprite._drill_bindingSprite = this;
			sprite._drill_parent_characterObj = this._character;
		}
	}
}
//==============================
// * 父贴图后面层 - 层级转移
//==============================
Sprite_Base.prototype.drill_ACi_charBackPuting = function(){
	if( $gameTemp._drill_ACi_lastAdded_PBack.length == 0 ){ return; }
	var PBack_list = $gameTemp._drill_ACi_lastAdded_PBack;
	
	// > 敌人贴图（战斗界面）
	if( this instanceof Sprite_Enemy ){
		this.drill_ACi_addToPBackArea( PBack_list, Scene_Battle );
	}
	
	// > 角色贴图（战斗界面）
	if( this instanceof Sprite_Actor ){
		
		// > SV模式
		if( $gameSystem.isSideView() ){
			this.drill_ACi_addToPBackArea( PBack_list, Scene_Battle );
		}
		
		// > 第一人称+使用了mog角色窗口
		if( !$gameSystem.isSideView() && Imported.MOG_BattleHud ){
			this.drill_ACi_addToPBackArea( PBack_list, Scene_Battle );
		}
	}
	
	// > 物体贴图（地图界面）
	if( this instanceof Sprite_Character && $gameTemp.drill_ACi_isReflectionSprite(this) == false ){
		this.drill_ACi_addToPBackArea( PBack_list, Scene_Map );
	}
};
//==============================
// * 父贴图后面层 - 添加到层
//==============================
Sprite_Base.prototype.drill_ACi_addToPBackArea = function( sprite_list, scene_class ){
	var scene = DrillUp.drill_ACi_getAncestor( this, scene_class );
	if( scene == null ){ return; }
		
	for(var i = sprite_list.length-1; i >= 0; i--){					//（转移操作会改变children数组的长度）
		var sprite = sprite_list[i];
		sprite._drill_is_charBack = true;							//（标记 - 在父贴图后面）
		scene._spriteset._drill_animPBackArea.addChild( sprite );	//（重复addChild会被移走）
	}
	
	// > 层级排序（父贴图后面层）
	scene._spriteset._drill_animPBackArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 父贴图后面层 - 战斗界面 层定义
//==============================
var _drill_ACi_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    
	if( !this._drill_animPBackArea ){		//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_animPBackArea);
	}
	
	_drill_ACi_createEnemies.call(this);	
};
//==============================
// * 父贴图后面层 - 地图界面 层定义
//==============================
var _drill_ACi_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( !this._drill_animPBackArea ){		//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0.75;		//（在中层上面，事件后面）
		this._tilemap.addChild(this._drill_animPBackArea);
	}
	
	_drill_ACi_createCharacters.call(this);
};
//==============================
// * 动画 - 层级排序（不含 父贴图后面层）
//==============================
Sprite_Animation.prototype.drill_ACi_sortByZIndex = function() {
   this._drill_animDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._drill_animUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};


//==============================
// * 动画 - 播放中
//==============================
var _drill_ACi_isPlaying = Sprite_Animation.prototype.isPlaying;
Sprite_Animation.prototype.isPlaying = function() {
    if( this._drill_duration > 0 ){
		return true;
	}
	return _drill_ACi_isPlaying.call(this);
};
//==============================
// * 动画 - 帧刷新
//==============================
var _drill_ACi_update = Sprite_Animation.prototype.update;
Sprite_Animation.prototype.update = function() {
	this._drill_duration_decreased = false;		//减一锁，确保多次继承后，减一后，不会继续执行减一方法。
	_drill_ACi_update.call(this);
	if(this._drill_duration_decreased == false){
		this._drill_duration--;
		this._drill_duration_decreased = true;
	}
};
//==============================
// * 动画 - 移除（空指针优化）
//==============================
var _drill_ACi_remove = Sprite_Animation.prototype.remove;
Sprite_Animation.prototype.remove = function() {
	if( this._target != undefined ){
		_drill_ACi_remove.call(this);
	}else{
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
};


//=============================================================================
// ** 动画魔法圈贴图【Drill_ACi_Sprite】
//
// 			代码：	> 范围 - 该类显示单独的动画装饰。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
//					> 数量 - [单个/ ●多个] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 由于动画存放在temp的容器中，销毁仍然需要外部来控制。
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 动画魔法圈贴图 - 定义
//==============================
function Drill_ACi_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_ACi_Sprite.prototype = Object.create(Sprite.prototype);
Drill_ACi_Sprite.prototype.constructor = Drill_ACi_Sprite;
//==============================
// * 动画魔法圈贴图 - 初始化
//==============================
Drill_ACi_Sprite.prototype.initialize = function( animation, settings ){
	Sprite.prototype.initialize.call(this);
	this._animation = animation;									//动画父对象
	this._drill_data = JSON.parse(JSON.stringify( settings ));		//设置数据
	
	// > 阶段数据
	this._drill_cur_time = 0;									//阶段 - 当前时间
	this._drill_cur_state = "延迟";								//阶段 - 当前阶段（延迟、出现、持续、消失）
	this._drill_time_delay = this._drill_data['delay'];			//阶段 - 出现延迟
	this._drill_time_birth = this._drill_data['birth'];			//阶段 - 出现时长
	this._drill_time_sustain = this._drill_data['sustain'];		//阶段 - 持续时长
	this._drill_time_death = this._drill_data['death'];			//阶段 - 消失时长
	this._drill_time_all = this._drill_time_delay + this._drill_time_birth + this._drill_time_sustain + this._drill_time_death;
	
	// > 私有属性初始化
	this.x = this._drill_data['x'];
	this.y = this._drill_data['y'];
	this.blendMode = this._drill_data['blendMode'];
	this.zIndex = this._drill_data['zIndex'];
	this.opacity = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = $gameSystem._drill_ACi_visible[this._drill_data['id']-1];
	
	// > 外键数据
	this._drill_is_charBack = false;			//是否 在父贴图后面
	this._drill_bindingSprite = null;			//父贴图对象（需跨层级跟随sprite的xy位置）
	this._drill_parent_enemyObj = null;			//绑定的 战斗界面中的 敌人
	this._drill_parent_actorObj = null;			//绑定的 战斗界面中的 角色
	this._drill_parent_characterObj = null;		//绑定的 地图界面中的 物体
	
	this.drill_createCircle();				//创建 - 魔法圈	
};
//==============================
// * 创建 - 魔法圈
//==============================
Drill_ACi_Sprite.prototype.drill_createCircle = function() {
	
	// > 魔法圈贴图
	var temp_sprite_bitmap = new Sprite(ImageManager.load_SpecialAnim(this._drill_data['src_img']));
	temp_sprite_bitmap.anchor.x = 0.5;
	temp_sprite_bitmap.anchor.y = 0.5;
	
	// > 魔法圈层
	var temp_sprite = new Sprite();		//魔法圈样式两层容器
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.scale.x = this._drill_data['scale_x'];
	temp_sprite.scale.y = this._drill_data['scale_y'];
	temp_sprite.skew.x = this._drill_data['skew_x'];
	temp_sprite.skew.y = this._drill_data['skew_y'];
	
	this._drill_circle = temp_sprite;
	this._drill_circle_bitmap = temp_sprite_bitmap;
	temp_sprite.addChild(temp_sprite_bitmap);
	this.addChild(temp_sprite);
}
//==============================
// * 动画魔法圈贴图 - 帧刷新
//==============================
Drill_ACi_Sprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updatePosition();	//帧刷新 - 位置
	this.drill_updateStep();		//帧刷新 - 阶段
	this.drill_updateBirthing();	//帧刷新 - 出现阶段
	this.drill_updateDying();		//帧刷新 - 消失阶段
}
//==============================
// * 帧刷新 - 位置
//==============================
Drill_ACi_Sprite.prototype.drill_updatePosition = function() {
	
	// > 父贴图后面层
	if( this._drill_is_charBack == true ){
		
		// > 类型为 画面 情况时
		if( this._animation.position == 3 ){
			this.x = this._drill_data['x'] + Graphics.boxWidth *0.5;
			this.y = this._drill_data['y'] + Graphics.boxHeight*0.5;
		
		// > 一般类型的情况
		}else{
			var _sprite = this._drill_bindingSprite;
			this.x = this._drill_data['x'] + _sprite.x;
			this.y = this._drill_data['y'] + _sprite.y;
				
			// > 敌人位置修正
			if( _sprite instanceof Sprite_Enemy ){
				this.y -= _sprite.width/2;
			}
			// > 角色位置修正
			if( _sprite instanceof Sprite_Actor ){
				// > 第一人称位置修正（战斗镜头）
				if( Imported.Drill_BattleCamera && !$gameSystem.isSideView() ){
					this.x -= $gameTemp._drill_cam_pos[0];
					this.y -= $gameTemp._drill_cam_pos[1];
				}
			}
			// > 物体位置修正
			if( _sprite instanceof Sprite_Character ){
				this.y -= 24;
			}
		}
	}
	
	// > 自旋转
	this._drill_circle_bitmap.rotation += this._drill_data['rotate'];
}
//==============================
// * 帧刷新 - 阶段
//==============================
Drill_ACi_Sprite.prototype.drill_updateStep = function() {
	
	// > 阶段初始化
	if( this._drill_cur_time == 0){
		this.drill_initBirthState();
		this.drill_initDeathState();
	}
	
	// > 阶段变化
	this._drill_cur_time += 1;
	if( this._drill_cur_time < this._drill_time_delay ){
		this._drill_cur_state = "延迟";
	}else if( this._drill_cur_time < this._drill_time_delay + this._drill_time_birth ){
		this._drill_cur_state = "出现";
	}else if( this._drill_cur_time < this._drill_time_delay + this._drill_time_birth + this._drill_time_sustain ){
		this._drill_cur_state = "持续";
	}else{
		this._drill_cur_state = "消失";
	}
}
//==============================
// * 阶段 - 初始化 出现状态
//==============================
Drill_ACi_Sprite.prototype.drill_initBirthState = function() {
	this.start_scale_x = 1;
	this.start_scale_y = 1;
	this.start_opacity = 0;
	if(this._drill_data['birthMode'] == "横向显现"){
		this.start_scale_y = 0;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "纵向显现"){
		this.start_scale_x = 0;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "放大显现"){
		this.start_scale_x = 0;
		this.start_scale_y = 0;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "缩小显现"){
		this.start_scale_x = 2;
		this.start_scale_y = 2;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "普通淡入显现"){
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "自定义"){
		this.start_scale_x = this._drill_data['birthScaleX'];
		this.start_scale_y = this._drill_data['birthScaleY'];
		this.start_opacity = this._drill_data['birthOpacity'];
	}
	this.scale.x = this.start_scale_x;
	this.scale.y = this.start_scale_y;
	this.opacity = this.start_opacity;
	
	this.sustain_scale_x = 1;
	this.sustain_scale_y = 1;
	this.sustain_opacity = 255;
	if(this._drill_data['sustainMode'] == "自定义"){
		this.sustain_scale_x = this._drill_data['sustainScaleX'];
		this.sustain_scale_y = this._drill_data['sustainScaleY'];
		this.sustain_opacity = this._drill_data['sustainOpacity'];
	}
}
//==============================
// * 阶段 - 初始化 消失状态
//==============================
Drill_ACi_Sprite.prototype.drill_initDeathState = function() {
	this.end_scale_x = 1;
	this.end_scale_y = 1;
	this.end_opacity = 255;
	if(this._drill_data['deathMode'] == "横向消失"){
		this.end_scale_y = 0;
		this.end_opacity = 0;
	}else if(this._drill_data['deathMode'] == "纵向消失"){
		this.end_scale_x = 0;
		this.end_opacity = 0;
	}else if(this._drill_data['deathMode'] == "放大消失"){
		this.end_scale_x = 2;
		this.end_scale_y = 2;
		this.end_opacity = 0;
	}else if(this._drill_data['deathMode'] == "缩小消失"){
		this.end_scale_x = 0;
		this.end_scale_y = 0;
		this.end_opacity = 0;
	}else if(this._drill_data['deathMode'] == "普通淡出消失"){
		this.end_opacity = 0;
	}else if(this._drill_data['deathMode'] == "自定义"){
		this.end_scale_x = this._drill_data['deathScaleX'];
		this.end_scale_y = this._drill_data['deathScaleY'];
		this.end_opacity = this._drill_data['deathOpacity'];
	}
}
//==============================
// * 阶段 - 判断销毁
//==============================
Drill_ACi_Sprite.prototype.drill_isDead = function(){
	return this._drill_cur_time > this._drill_time_all;
}
//==============================
// * 阶段 - 获取当前阶段
//==============================
Drill_ACi_Sprite.prototype.drill_getState = function(){
	return this._drill_cur_state;
}
//==============================
// * 阶段 - 设置当前阶段
//
//			说明：	注意，由于 透明度和缩放 变化并不是固定公式，而是增量值。
//					因此 阶段切换 时不会出现贴图突然变化情况，但代价是变化情况不可控。
//==============================
Drill_ACi_Sprite.prototype.drill_setState = function( state ){
	if( state == "延迟" ){
		this._drill_cur_time = 0;
		this._drill_cur_state = state;
	}
	if( state == "出现" ){
		this._drill_cur_time = this._drill_time_delay;
		this._drill_cur_state = state;
	}
	if( state == "持续" ){
		this.opacity = 255;
		this._drill_cur_time = this._drill_time_delay + this._drill_time_birth;
		this._drill_cur_state = state;
	}
	if( state == "消失" ){
		this._drill_cur_time = this._drill_time_delay + this._drill_time_birth + this._drill_time_sustain;
		this._drill_cur_state = state;
	}
}
//==============================
// * 帧刷新 - 出现阶段
//==============================
Drill_ACi_Sprite.prototype.drill_updateBirthing = function() {
	if( this._drill_cur_state != "出现" ){ return; }
	
	// > 透明度
	this.opacity += ( this.sustain_opacity - this.start_opacity )/this._drill_time_birth;
	
	// > 缩放
	this.drill_scaleX_move_to(this, this.sustain_scale_x, Math.abs(this.start_scale_x -this.sustain_scale_x)/this._drill_time_birth);
	this.drill_scaleY_move_to(this, this.sustain_scale_y, Math.abs(this.start_scale_y -this.sustain_scale_y)/this._drill_time_birth);
}
//==============================
// * 帧刷新 - 消失阶段
//==============================
Drill_ACi_Sprite.prototype.drill_updateDying = function() {
	if( this._drill_cur_state != "消失" ){ return; }
	
	// > 透明度
	this.opacity -= ( this.sustain_opacity - this.end_opacity )/this._drill_time_death;
	
	// > 缩放
	this.drill_scaleX_move_to(this, this.end_scale_x, Math.abs(this.sustain_scale_x-this.end_scale_x)/this._drill_time_death);
	this.drill_scaleY_move_to(this, this.end_scale_y, Math.abs(this.sustain_scale_y-this.end_scale_y)/this._drill_time_death);
}

//==============================
// * 动画魔法圈贴图 - 缩放控制
//==============================
Drill_ACi_Sprite.prototype.drill_scaleX_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.x - s;
	if( ds < 0 ){ sprite.scale.x += speed; }
	if( ds > 0 ){ sprite.scale.x -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.x = s; }
}
Drill_ACi_Sprite.prototype.drill_scaleY_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.y - s;
	if( ds < 0 ){ sprite.scale.y += speed; }
	if( ds > 0 ){ sprite.scale.y -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.y = s; }
}

//=============================================================================
// * 播放中的动画魔法圈样式 - 容器（旧代码）
//=============================================================================
	//DrillUp.g_ACi_style_playing_tank = [];	//全局临时存储正在动画中播放的魔法圈样式（该操作可能不安全，但是目前没有别的方法）
	//
	//获取 所有动画id 的魔法圈样式消失
	//DrillUp.drill_aCircles_getCirclesById = function(tar_id) {
	//	var result = [];
	//	for(var i in DrillUp.g_ACi_style_playing_tank){
	//		var temp = DrillUp.g_ACi_style_playing_tank[i];
	//		if( temp._drill_data['id'] == tar_id ){
	//			result.push(temp);
	//		}
	//	}
	//	return result;
	//}
	////设置 所有动画id 的魔法圈样式消失
	//DrillUp.drill_aCircles_setDeathById = function(tar_id) {
	//	for(var i in DrillUp.g_ACi_style_playing_tank){
	//		var temp = DrillUp.g_ACi_style_playing_tank[i];
	//		if( temp._drill_data['id'] == tar_id &&
	//			temp._drill_cur_time < temp._drill_time_all - temp._drill_time_death ){
	//			temp._drill_cur_time = temp._drill_time_all - temp._drill_time_death;
	//		}
	//	}
	//}
	////设置 所有动画id 的魔法圈样式显现
	//DrillUp.drill_aCircles_setSustainById = function(tar_id) {
	//	for(var i in DrillUp.g_ACi_style_playing_tank){
	//		var temp = DrillUp.g_ACi_style_playing_tank[i];
	//		if( temp._drill_data['id'] == tar_id &&
	//			temp._drill_cur_time < temp._drill_time_delay ){
	//			temp._drill_cur_time = temp._drill_time_delay ;
	//		}
	//	}
	//}
	////设置 战斗单位+动画id 的魔法圈样式消失（仅限战斗单位，tar_id = -1 表示单位的全部魔法圈样式）
	//DrillUp.drill_aCircles_setDeathByIdAndBattler = function(tar_id,battler) {
	//	for(var i in DrillUp.g_ACi_style_playing_tank){
	//		var temp = DrillUp.g_ACi_style_playing_tank[i];
	//		if( (temp._drill_data['anim'] == tar_id || tar_id == -1 ) && 
	//			temp._drill_bindingSprite != undefined  && 
	//			temp._drill_bindingSprite._battler == battler  && 
	//			temp._drill_cur_time < temp._drill_time_all - temp._drill_time_death ){
	//			temp._drill_cur_time = temp._drill_time_all - temp._drill_time_death;
	//		}
	//	}
	//}
	////给未绑定的动画，绑定单位sprite
	//DrillUp.drill_aCircles_setBattlerSprite = function( battlerSprite ) {
	//	for(var i in DrillUp.g_ACi_style_playing_tank){
	//		var temp = DrillUp.g_ACi_style_playing_tank[i];
	//		if( temp._drill_bindingSprite == undefined ){
	//			temp._drill_bindingSprite = battlerSprite;
	//		}
	//	}
	//}
	//帧刷新去除
	//DrillUp.drill_aCircles_updateDelete = function() {
	//	for (var i in DrillUp.g_ACi_style_playing_tank ) {	
	//		var temp = DrillUp.g_ACi_style_playing_tank[i];
	//		if( temp['_drill_time_all'] <= temp['_drill_cur_time']){
	//			DrillUp.g_ACi_style_playing_tank.splice(i,1);
	//			delete temp;
	//		}
	//		break;
	//	}
	//}
	
