//=============================================================================
// Drill_AnimationGif.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        动画 - 多层动画GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "GIF样式-%d"
 * @Drill_LE_parentKey "---GIF样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_AGi_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_AnimationGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以添加GIF，绑定在一个指定的动画上面。播放动画时能出现GIF。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面，战斗界面。
 *   作用于动画，伴随动画一起出现。
 * 2.更多详细的组合方法，去看看 "17.主菜单 > 多层组合装饰（个体装饰）.docx"。
 * 3.更多详细的设置效果，去看看 "12.动画 > 关于魔法效果与并行动画.docx"。
 * 细节：
 *   (1.动画GIF是一个具有持续时间的效果，分为 出现、持续、消失 三阶段。
 *   (2.战斗界面中，会因为动画效果播放中而一直等到动画播放完才进行下一指令。
 *      如果你需要制作不等待的持续效果，则需添加使用 并行动画 插件。
 * 绑定：
 *   (1.多个样式可以绑定同一个动画，在动画播放时同时出现。
 *   (2.你需要在插件中 配置样式 ，样式中设置绑定指定的动画id。
 *     （绑定后，配置的动画和rmmv动画同时播放，rmmv动画你需要手动设置额外持续时间）
 * 旧版本：
 *   (1.注意，该插件v1.4及以前的版本有非常大的幅度改动，配置的数据在更新插件后都会
 *      丢失，注意备份工程。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__anim_gif （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__anim_gif文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * GIF样式-1 资源-GIF
 * GIF样式-2 资源-GIF
 * GIF样式-3 资源-GIF
 * ……
 *
 * 你可以在同一个动画里面加入非常多的不同种类的样式，并且持续时间可以非常长。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制动画GIF的显示情况：
 * 
 * 插件指令：>动画GIF : 样式[2] : 显示
 * 插件指令：>动画GIF : 样式[2] : 隐藏
 *
 * 1.如果样式被隐藏，则新动画不会显示该样式，但正在播放的不会变。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 只样式条件
 * 你可以通过插件指令对播放中的动画GIF进行设置：
 * 
 * 插件指令：>动画GIF : 播放中的样式[2] : 立即显示
 * 插件指令：>动画GIF : 播放中的样式[2] : 立即隐藏
 * 插件指令：>动画GIF : 播放中的样式[2] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 立即消失
 * 插件指令：>动画GIF : 播放中的样式[2] : 暂停
 * 插件指令：>动画GIF : 播放中的样式[2] : 继续
 *
 * 1."立即显示/隐藏"可以使得正在播放的样式瞬间显示/隐藏。
 *   "立即出现"可以使得播放的动画立刻跳过 出现状态。
 *   "立即消失"可以使得播放的动画立刻进入 消失状态。
 * 2.具体使用方法，可以去 个体装饰管理层示例 西环位置的
 *   "中断玩家蓄力动画"看看。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 样式条件和地图物体
 * 你可以通过插件指令对播放中的动画GIF样式进行设置：
 * 
 * 插件指令：>动画GIF : 所有样式 : 本事件 : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 本事件 : 立即出现
 * 
 * 插件指令：>动画GIF : 播放中的样式[2] : 玩家 : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 本事件 : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 事件[10] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 事件变量[21] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 批量事件[10,11] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 批量事件变量[21,22] : 立即出现
 * 
 * 插件指令：>动画GIF : 播放中的样式[2] : 本事件 : 立即显示
 * 插件指令：>动画GIF : 播放中的样式[2] : 本事件 : 立即隐藏
 * 插件指令：>动画GIF : 播放中的样式[2] : 本事件 : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 本事件 : 立即消失
 * 插件指令：>动画GIF : 播放中的样式[2] : 本事件 : 暂停
 * 插件指令：>动画GIF : 播放中的样式[2] : 本事件 : 继续
 * 
 * 1.前半部分（所有样式）中间部分（本事件）和 后半部分（立即出现）
 *   的参数可以随意组合。一共有2*6*6种组合方式。
 * 2.通过插件指令可以直接控制到地图界面中一个具体事件的一个具体GIF。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 样式条件和战斗单位
 * 你可以通过插件指令对播放中的动画GIF样式进行设置：
 * 
 * 插件指令：>动画GIF : 所有样式 : 敌方[2] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 敌方[2] : 立即出现
 * 
 * 插件指令：>动画GIF : 播放中的样式[2] : 敌方[2] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 敌方全体 : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 敌方变量[21] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 我方[2] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 我方全体 : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 我方变量[21] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 战斗敌人[5] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 战斗敌人变量[21] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 战斗角色[5] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 战斗角色变量[21] : 立即出现
 * 
 * 插件指令：>动画GIF : 播放中的样式[2] : 敌方[2] : 立即显示
 * 插件指令：>动画GIF : 播放中的样式[2] : 敌方[2] : 立即隐藏
 * 插件指令：>动画GIF : 播放中的样式[2] : 敌方[2] : 立即出现
 * 插件指令：>动画GIF : 播放中的样式[2] : 敌方[2] : 立即消失
 * 插件指令：>动画GIF : 播放中的样式[2] : 敌方[2] : 暂停
 * 插件指令：>动画GIF : 播放中的样式[2] : 敌方[2] : 继续
 * 
 * 1.前半部分（所有样式）中间部分（敌方[2]）和 后半部分（立即出现）
 *   的参数可以随意组合。一共有2*10*6种组合方式。
 * 2.通过插件指令可以直接控制到战斗界面中一个具体单位的一个具体GIF。
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
 * 时间复杂度： o(n^3)*o(贴图处理) 每帧
 * 测试方法：   在地图界面中播放4个含动画粒子的动画。
 * 测试结果：   200个事件的地图中，平均消耗为：【25.16ms】
 *              100个事件的地图中，平均消耗为：【20.44ms】
 *               50个事件的地图中，平均消耗为：【17.45ms】
 * 测试方法2：  在战斗界面中播放4个含动画粒子的动画。
 * 测试结果2：  战斗界面平均消耗为：【15.18ms】
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
 * 修改了内部结构。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 * [v1.3]
 * 添加了最大值编辑的支持。
 * [v1.4]
 * 修改了插件指令。
 * [v1.5]
 * 大幅度修改加强了插件的内部结构。
 * [v1.6]
 * 修复了动画位置为画面时，父贴图后面层仍然跟随施法者移动的bug。
 * [v1.7]
 * 修复了动画删除时出错的bug。
 * [v1.8]
 * 大幅度优化了插件结构。
 * [v1.9]
 * 优化了装饰贴图自动销毁与动画销毁关系，减少了内存累积问题。
 * [v2.0]
 * 优化了旧存档的识别与兼容。
 * [v2.1]
 * 大幅度优化了内部结构。
 *
 *
 * @param ---GIF样式组 1至20---
 * @default
 *
 * @param GIF样式-1
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-2
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-3
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-4
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-5
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-6
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-7
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-8
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-9
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-10
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-11
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-12
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-13
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-14
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-15
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-16
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-17
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-18
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-19
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-20
 * @parent ---GIF样式组 1至20---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组21至40---
 * @default
 *
 * @param GIF样式-21
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-22
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-23
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-24
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-25
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-26
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-27
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-28
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-29
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-30
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-31
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-32
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-33
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-34
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-35
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-36
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-37
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-38
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-39
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-40
 * @parent ---GIF样式组21至40---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组41至60---
 * @default
 *
 * @param GIF样式-41
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-42
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-43
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-44
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-45
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-46
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-47
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-48
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-49
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-50
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-51
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-52
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-53
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-54
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-55
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-56
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-57
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-58
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-59
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-60
 * @parent ---GIF样式组41至60---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组61至80---
 * @default
 *
 * @param GIF样式-61
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-62
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-63
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-64
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-65
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-66
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-67
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-68
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-69
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-70
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-71
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-72
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-73
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-74
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-75
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-76
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-77
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-78
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-79
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-80
 * @parent ---GIF样式组61至80---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组81至100---
 * @default
 *
 * @param GIF样式-81
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-82
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-83
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-84
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-85
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-86
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-87
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-88
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-89
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-90
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-91
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-92
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-93
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-94
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-95
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-96
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-97
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-98
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-99
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-100
 * @parent ---GIF样式组81至100---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组101至120---
 * @default
 *
 * @param GIF样式-101
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-102
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-103
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-104
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-105
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-106
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-107
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-108
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-109
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-110
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-111
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-112
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-113
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-114
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-115
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-116
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-117
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-118
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-119
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-120
 * @parent ---GIF样式组101至120---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组121至140---
 * @default
 *
 * @param GIF样式-121
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-122
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-123
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-124
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-125
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-126
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-127
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-128
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-129
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-130
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-131
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-132
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-133
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-134
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-135
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-136
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-137
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-138
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-139
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-140
 * @parent ---GIF样式组121至140---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组141至160---
 * @default
 *
 * @param GIF样式-141
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-142
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-143
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-144
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-145
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-146
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-147
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-148
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-149
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-150
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-151
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-152
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-153
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-154
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-155
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-156
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-157
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-158
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-159
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-160
 * @parent ---GIF样式组141至160---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组161至180---
 * @default
 *
 * @param GIF样式-161
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-162
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-163
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-164
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-165
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-166
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-167
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-168
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-169
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-170
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-171
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-172
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-173
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-174
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-175
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-176
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-177
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-178
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-179
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-180
 * @parent ---GIF样式组161至180---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param ---GIF样式组181至200---
 * @default
 *
 * @param GIF样式-181
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-182
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-183
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-184
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-185
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-186
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-187
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-188
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-189
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-190
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-191
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-192
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-193
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-194
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-195
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-196
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-197
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-198
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-199
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 *
 * @param GIF样式-200
 * @parent ---GIF样式组181至200---
 * @type struct<AGiStyle>
 * @desc 动画GIF样式的详细配置信息。
 * @default 
 */
/*~struct~AGiStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的动画GIF样式==
 * 
 * @param ---绑定---
 * @desc 
 *
 * @param 绑定的动画
 * @parent ---绑定---
 * @type animation
 * @desc 指定动画的id，GIF样式将会与动画相互绑定。
 * @default 0
 *
 * @param 初始是否显示
 * @parent ---绑定---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 * 
 * @param ---贴图---
 * @desc 
 * 
 * @param 资源-GIF
 * @parent ---贴图---
 * @desc GIF的图片资源组，多张构成gif。
 * @default ["(需配置)动画GIF"]
 * @require 1
 * @dir img/Special__anim_gif/
 * @type file[]
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
 * @param 平移-GIF X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-GIF Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
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
 * @desc 资源图像的色调值，范围为0至360。
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
 * @param 动画层级
 * @parent ---贴图---
 * @type select
 * @option 在父贴图后面
 * @value 在父贴图后面
 * @option 在动画后面
 * @value 在动画后面
 * @option 在动画前面
 * @value 在动画前面
 * @desc 粒子所属的动画层级。父贴图后面是指：战斗时，敌人/玩家贴图的后面，地图中，事件贴图的后面。
 * @default 在动画后面
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc GIF在同一个动画，并且在同一动画层级下，先后排序的位置，0表示最后面。
 * @default 0
 *
 * @param 旋转速度
 * @parent ---贴图---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 10.0
 * 
 * @param ---随机位置---
 * @desc 
 *
 * @param 是否启用随机位置
 * @parent ---随机位置---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 随机位置的范围宽度
 * @parent ---随机位置---
 * @type number
 * @min 0
 * @desc 随机位置为矩形范围，矩形中心为GIF的位置。这里填矩形范围的宽度。
 * @default 50
 *
 * @param 随机位置的范围高度
 * @parent ---随机位置---
 * @type number
 * @min 0
 * @desc 随机位置为矩形范围，矩形中心为GIF的位置。这里填矩形范围的高度。
 * @default 50
 *
 * @param 是否在每次播放GIF完毕后变化位置
 * @parent ---随机位置---
 * @type boolean
 * @on 变化
 * @off 关闭
 * @desc true - 变化，false - 关闭
 * @default false
 *
 * @param 是否随机GIF初始帧
 * @parent ---随机位置---
 * @type boolean
 * @on 随机
 * @off 关闭
 * @desc true - 随机，false - 关闭
 * @default false
 * 
 * @param ---动画过程---
 * @desc 
 *
 * @param 出现延迟
 * @parent ---动画过程---
 * @type number
 * @min 0
 * @desc GIF将延迟一段时间显现，单位帧。
 * @default 0
 *
 * @param 出现时长
 * @parent ---动画过程---
 * @type number
 * @min 0
 * @desc GIF显现的时间，单位帧。
 * @default 60
 *
 * @param 出现模式
 * @parent ---动画过程---
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
 * @desc GIF显现的模式方法。
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
 * @parent ---动画过程---
 * @type number
 * @min 0
 * @desc GIF持续的时间，单位帧。
 * @default 220
 *
 * @param 持续模式
 * @parent ---动画过程---
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
 * @parent ---动画过程---
 * @type number
 * @min 0
 * @desc GIF消失的时间。
 * @default 30
 *
 * @param 消失模式
 * @parent ---动画过程---
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
 * @desc GIF消失的模式方法。
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
 * @param ---3d效果---
 * @desc 
 * 
 * @param 整体缩放 X
 * @parent ---3d效果---
 * @desc GIF的缩放X值，默认比例1.0。缩放将会使得GIF看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体缩放 Y
 * @parent ---3d效果---
 * @desc GIF的缩放Y值，默认比例1.0。缩放将会使得GIF看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体斜切 X
 * @parent ---3d效果---
 * @desc GIF的斜切X值，默认比例0.0。斜切将会使得GIF看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 整体斜切 Y
 * @parent ---3d效果---
 * @desc GIF的斜切Y值，默认比例0.0。斜切将会使得GIF看起来旋转具有一定角度。
 * @default 0.0
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		AGi（Animation_Gif）
//		临时全局变量	DrillUp.g_AGi_xxx
//		临时局部变量	this._drill_AGi_xxx
//		存储数据变量	$gameSystem._drill_AGi_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	战斗界面
//		★性能测试消耗	2.54ms（update，从未使用时）
//		★最坏情况		大量动画被同时播放。
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
//				->立即出现
//				->立即消失
//			->☆存储数据
//			->☆个体层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序（界面装饰）【标准函数】
//				->图片层级排序（个体装饰）【标准函数】
//				> 动画前面层（_drill_animUpArea）
//				> 动画后面层（_drill_animDownArea）
//				> 父贴图后面层（_drill_animPBackArea）
//			
//			->☆动画GIF 容器
//				->获取贴图（开放函数）
//				->获取贴图 - 根据敌人对象（开放函数）
//				->获取贴图 - 根据角色对象（开放函数）
//				->获取贴图 - 根据物体对象（开放函数）
//				->获取全部控制器（开放函数）
//				->获取全部贴图（开放函数）
//				->获取全部贴图 - 根据敌人对象（开放函数）
//				->获取全部贴图 - 根据角色对象（开放函数）
//				->获取全部贴图 - 根据物体对象（开放函数）
//				->获取列表中指定动画的贴图
//				->设置贴图立即显示/隐藏（开放函数）
//				->设置贴图立即出现（开放函数）
//				->设置贴图立即消失（开放函数）
//			->☆动画绑定
//				->创建数据/创建贴图
//				->外键标记
//			->☆动画控制
//				->帧刷新（地图界面）
//				->帧刷新（战斗界面）
//				->自动销毁
//
//			->动画GIF控制器【Drill_AGi_Controller】
//				->A主体
//				->B变化控制
//				->C播放GIF
//				->D随机位置
//				->2A阶段
//			->动画GIF贴图【Drill_AGi_Sprite】
//				->A主体
//				->B变化控制
//				->C对象绑定
//				->D播放GIF
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 动画GIF控制器【Drill_AGi_Controller】
//			* 动画GIF贴图【Drill_AGi_Sprite】
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
//			4.留意关键字：【暂未使用】。
//
//		★其它说明细节：
//			1.插件详细原理说明见 Drill_AnimationCircle 。	
//			2.与 MOG_BattleHud 和 Drill_BattleCamera 有关联，用于定位第一人称下的动画位置。
//			3.在circle的基础上添加了gif播放功能，保留了3d效果。
//
//		★存在的问题：
//			暂无
//
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_AGi_PluginTip_curName = "Drill_AnimationGif.js 动画-多层动画GIF";
	DrillUp.g_AGi_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_AGi_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_AGi_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_AGi_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_AGi_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationGif = true;
　　Imported.Drill_AnimationGIF = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationGif');
	
	//==============================
	// * 静态数据 - GIF样式
	//				（~struct~AGiStyle）
	//==============================
	DrillUp.drill_AGi_styleInit = function( dataFrom ){
		var data = {};
		
		// > 控制器（绑定）
		data['anim'] = Number( dataFrom["绑定的动画"] || 0);
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 贴图
		if( dataFrom["资源-GIF"] != "" &&
			dataFrom["资源-GIF"] != undefined ){
			data['src_img_gif'] = JSON.parse( dataFrom["资源-GIF"] );
		}else{
			data['src_img_gif'] = [];
		}
		data['src_img_file'] = "img/Special__anim_gif/";
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['individualIndex'] = String( dataFrom["动画层级"] || "在动画后面");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体
		data['x'] = Number( dataFrom["平移-GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-GIF Y"] || 0);
		
		// > A主体 - 3d效果
		data['scale_x'] = Number( dataFrom["整体缩放 X"] || 1.0);
		data['scale_y'] = Number( dataFrom["整体缩放 Y"] || 1.0);
		data['skew_x'] = Number( dataFrom["整体斜切 X"] || 0.0);
		data['skew_y'] = Number( dataFrom["整体斜切 Y"] || 0.0);
		
		// > B变化控制
		data['rotate'] = Number( dataFrom["旋转速度"] || 0);
		
		// > D随机位置
		data['randomPos_enable'] = String( dataFrom["是否启用随机位置"] || "false") == "true";
		data['randomPos_width'] = Number( dataFrom["随机位置的范围宽度"] || 50);
		data['randomPos_height'] = Number( dataFrom["随机位置的范围高度"] || 50);
		data['randomPos_autoChange'] = String( dataFrom["是否在每次播放GIF完毕后变化位置"] || "false") == "true";
		data['randomPos_gifFrame'] = String( dataFrom["是否随机GIF初始帧"] || "false") == "true";
		
		// > 2A阶段（动画过程）
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
		
		return data;
	}
	
	/*-----------------GIF样式------------------*/
	DrillUp.g_AGi_style_length = 200;
	DrillUp.g_AGi_style = [];
	for (var i = 0; i < DrillUp.g_AGi_style_length; i++) {
		if( DrillUp.parameters['GIF样式-' + String(i+1) ] != undefined &&
			DrillUp.parameters['GIF样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['GIF样式-' + String(i+1) ]);
			DrillUp.g_AGi_style[i] = DrillUp.drill_AGi_styleInit( data );
			DrillUp.g_AGi_style[i]['id'] = i+1;
			DrillUp.g_AGi_style[i]['inited'] = true;
		}else{
			DrillUp.g_AGi_style[i] = DrillUp.drill_AGi_styleInit( {} );
			DrillUp.g_AGi_style[i]['id'] = i+1;
			DrillUp.g_AGi_style[i]['inited'] = false;
		}
	}
	
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_AGi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_AGi_pluginCommand.call(this, command, args);
	if( command === ">动画GIF" ){
		
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
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_AGi_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_AGi_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_AGi_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_AGi_isEventExist( e_id ) == false ){ return; }
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
				$gameSystem._drill_AGi_visible[ Number(style_str)-1 ] = true;
			}
			if( type === "隐藏" ){
				$gameSystem._drill_AGi_visible[ Number(style_str)-1 ] = false;
			}
			
			var sprite_list = [];
			if( style_str == "所有样式" ){
				sprite_list = $gameTemp.drill_AGi_getAllSpriteList();
			}else{
				sprite_list = $gameTemp.drill_AGi_getSpriteList( Number(style_str) );
			}
			
			if( type === "立即显示" ){
				$gameTemp.drill_AGi_setAnimVisible( sprite_list, true );
			}
			if( type === "立即隐藏" ){
				$gameTemp.drill_AGi_setAnimVisible( sprite_list, false );
			}
			if( type === "立即出现" ){
				$gameTemp.drill_AGi_setAnimBirth( sprite_list );
			}
			if( type === "立即消失" ){
				$gameTemp.drill_AGi_setAnimDeath( sprite_list );
			}
			if( type === "暂停" ){
				$gameTemp.drill_AGi_setAnimPause( sprite_list, true );
			}
			if( type === "继续" ){
				$gameTemp.drill_AGi_setAnimPause( sprite_list, false );
			}
		}
		
		/*-----------------执行变化 - 样式+角色条件------------------*/
		if( style_str != null && args.length == 6){
			var type = String(args[5]);
			
			var sprite_list = [];
			if( style_str == "所有样式" ){
				if( char_list != null ){
					for( var i=0; i < char_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_AGi_getAllSpriteList_Character(char_list[i]) );
					}
				}else if( actor_list != null ){
					for( var i=0; i < actor_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_AGi_getAllSpriteList_Actor(actor_list[i]) );
					}
				}else if( enemy_list != null ){
					for( var i=0; i < enemy_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_AGi_getAllSpriteList_Enemy(enemy_list[i]) );
					}
				}
			}else{
				if( char_list != null ){
					for( var i=0; i < char_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_AGi_getSpriteList_Character( Number(style_str), char_list[i]) );
					}
				}else if( actor_list != null ){
					for( var i=0; i < actor_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_AGi_getSpriteList_Actor( Number(style_str), actor_list[i]) );
					}
				}else if( enemy_list != null ){
					for( var i=0; i < enemy_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_AGi_getSpriteList_Enemy( Number(style_str), enemy_list[i]) );
					}
				}
			}
			
			if( type === "立即显示" ){
				$gameTemp.drill_AGi_setAnimVisible( sprite_list, true );
			}
			if( type === "立即隐藏" ){
				$gameTemp.drill_AGi_setAnimVisible( sprite_list, false );
			}
			if( type === "立即出现" ){
				$gameTemp.drill_AGi_setAnimBirth( sprite_list );
			}
			if( type === "立即消失" ){
				$gameTemp.drill_AGi_setAnimDeath( sprite_list );
			}
			if( type === "暂停" ){
				$gameTemp.drill_AGi_setAnimPause( sprite_list, true );
			}
			if( type === "继续" ){
				$gameTemp.drill_AGi_setAnimPause( sprite_list, false );
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_AGi_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_AGi_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_AGi_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_AGi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_AGi_sys_initialize.call(this);
	this.drill_AGi_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_AGi_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_AGi_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_AGi_saveEnabled == true ){	
		$gameSystem.drill_AGi_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_AGi_initSysData();
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
Game_System.prototype.drill_AGi_initSysData = function() {
	this.drill_AGi_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_AGi_checkSysData = function() {
	this.drill_AGi_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_AGi_initSysData_Private = function() {
	
	this._drill_AGi_visible = [];
	for(var i = 0; i < DrillUp.g_AGi_style.length ;i++){
		var data = DrillUp.g_AGi_style[i];
		if( data['inited'] == false ){ continue; }
		this._drill_AGi_visible[i] = data['visible'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_AGi_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_AGi_visible == undefined ){
		this.drill_AGi_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_AGi_style.length; i++ ){
		var temp_data = JSON.parse(JSON.stringify( DrillUp.g_AGi_style[i] ));
		
		// > 已配置（'inited'为 false 表示空数据）
		if( temp_data['inited'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_AGi_visible[i] == undefined ){
				this._drill_AGi_visible[i] = temp_data['visible'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】个体层级 ☆个体层级
//#############################################################################
//##############################
// * 个体层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图           （添加的贴图对象）
//					> layer_index 字符串    （添加到的层级名，动画前面层/动画后面层/父贴图后面层）
//					> individual_sprite 贴图（被装饰的个体贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Game_Temp.prototype.drill_AGi_layerAddSprite = function( sprite, layer_index, individual_sprite ){
    this.drill_AGi_layerAddSprite_Private( sprite, layer_index, individual_sprite );
}
//##############################
// * 个体层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从父层级中移除。
//##############################
Game_Temp.prototype.drill_AGi_layerRemoveSprite = function( sprite ){
	this.drill_AGi_layerRemoveSprite_Private( sprite );
}
//##############################
// * 个体层级 - 图片层级排序（界面装饰）【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，子贴图按照zIndex属性来进行先后排序。值越大，越靠前。
//					> 注意，由于个体装饰的差异性，此函数分为 界面装饰 和 个体装饰。
//##############################
Game_Temp.prototype.drill_AGi_sortByZIndex_Scene = function(){
	var cur_scene = SceneManager._scene;
	if( cur_scene instanceof Scene_Map ){
		cur_scene._spriteset._drill_animPBackArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//父贴图后面层
	}
	if( cur_scene instanceof Scene_Battle ){
		cur_scene._spriteset._drill_animPBackArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//父贴图后面层
	}
}
//##############################
// * 个体层级 - 图片层级排序（个体装饰）【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，子贴图按照zIndex属性来进行先后排序。值越大，越靠前。
//					> 注意，由于个体装饰的差异性，此函数分为 界面装饰 和 个体装饰。
//##############################
Sprite_Animation.prototype.drill_AGi_sortByZIndex_Individual = function(){
	this._drill_animDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});					//动画后面层
	this._drill_animUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});						//动画前面层
}
//=============================================================================
// ** 个体层级（接口实现）
//=============================================================================
//==============================
// * 个体层级 - 动画前面层/动画后面层
//==============================
var _drill_AGi_layer_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	
	// > 层级 - 动画后面层
	if( !this._drill_animDownArea ){
		this._drill_animDownArea = new Sprite();
		this.addChild(this._drill_animDownArea);
	}
	
	// > 原函数
    _drill_AGi_layer_setup.call(this,target, animation, mirror, delay);
	
	// > 层级 - 动画前面层
	if( !this._drill_animUpArea ){
		this._drill_animUpArea = new Sprite();
		this.addChild(this._drill_animUpArea);
	}
};
//==============================
// * 个体层级 - 父贴图后面层 - 战斗界面
//==============================
var _drill_AGi_layer_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    
	if( !this._drill_animPBackArea ){			//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0;		//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_animPBackArea);
	}
	
	_drill_AGi_layer_createEnemies.call(this);	
};
//==============================
// * 个体层级 - 父贴图后面层 - 地图界面
//==============================
var _drill_AGi_layer_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( !this._drill_animPBackArea ){			//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0.75;		//（在中层上面，事件后面）
		this._tilemap.addChild(this._drill_animPBackArea);
	}
	
	_drill_AGi_layer_createCharacters.call(this);
};
//==============================
// * 个体层级 - 添加贴图到层级（私有）
//==============================
Game_Temp.prototype.drill_AGi_layerAddSprite_Private = function( sprite, layer_index, individual_sprite ){
	if( layer_index == "父贴图后面层" || layer_index == "在父贴图后面" ){
		var cur_scene = SceneManager._scene;
		if( cur_scene instanceof Scene_Map ){
			sprite._drill_isAtAnimPBackArea = true;		//（标记 - 在父贴图后面）
			cur_scene._spriteset._drill_animPBackArea.addChild( sprite );
		}
		if( cur_scene instanceof Scene_Battle ){
			sprite._drill_isAtAnimPBackArea = true;		//（标记 - 在父贴图后面）
			cur_scene._spriteset._drill_animPBackArea.addChild( sprite );
		}
	}
	if( layer_index == "动画前面层" || layer_index == "在动画前面" ){
		individual_sprite._drill_animUpArea.addChild( sprite );
	}
	if( layer_index == "动画后面层" || layer_index == "在动画后面" ){
		individual_sprite._drill_animDownArea.addChild( sprite );
	}
};
//==============================
// * 个体层级 - 去除贴图（私有）
//==============================
Game_Temp.prototype.drill_AGi_layerRemoveSprite_Private = function( sprite ){
	if( sprite == undefined ){ return; }
	
	// > 清空指针
	sprite.drill_sprite_destroy();
	
	// > 断开父类
	if( sprite.parent != undefined ){
		sprite.parent.removeChild( sprite );
	}
};



//=============================================================================
// ** ☆动画GIF 容器
//
//			说明：	> 此模块提供对 动画GIF 各种操作的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_AGi_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_AGi_temp_initialize.call(this);
	
	this._drill_AGi_spriteTank = [];			//当前播放中的贴图
	this._drill_AGi_controllerTank = [];		//当前播放中的控制器
	this._drill_AGi_lastAdded = [];				//上一次添加的 贴图
}
//==============================
// * 容器 - 获取贴图（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_getSpriteList = function( style_id ){
	var result = [];
	for(var i = 0; i < this._drill_AGi_spriteTank.length; i++){
		var temp_sprite = this._drill_AGi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller._drill_data['id'] == style_id ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取贴图 - 根据敌人对象（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_getSpriteList_Enemy = function( style_id, enemy_obj ){
	var result = [];
	for(var i = 0; i < this._drill_AGi_spriteTank.length; i++){
		var temp_sprite = this._drill_AGi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller._drill_data['id'] == style_id &&
			temp_sprite._drill_parent_enemyObj == enemy_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取贴图 - 根据角色对象（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_getSpriteList_Actor = function( style_id, actor_obj ){
	var result = [];
	for(var i = 0; i < this._drill_AGi_spriteTank.length; i++){
		var temp_sprite = this._drill_AGi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller._drill_data['id'] == style_id &&
			temp_sprite._drill_parent_actorObj == actor_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取贴图 - 根据物体对象（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_getSpriteList_Character = function( style_id, character_obj ){
	var result = [];
	for(var i = 0; i < this._drill_AGi_spriteTank.length; i++){
		var temp_sprite = this._drill_AGi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller._drill_data['id'] == style_id &&
			temp_sprite._drill_parent_characterObj == character_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取全部控制器（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_getAllControllerList = function(){
	return this._drill_AGi_controllerTank;
}
//==============================
// * 容器 - 获取全部贴图（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_getAllSpriteList = function(){
	return this._drill_AGi_spriteTank;
}
//==============================
// * 容器 - 获取全部贴图 - 根据敌人对象（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_getAllSpriteList_Enemy = function( enemy_obj ){
	var result = [];
	for(var i = 0; i < this._drill_AGi_spriteTank.length; i++){
		var temp_sprite = this._drill_AGi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._drill_parent_enemyObj == enemy_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取全部贴图 - 根据角色对象（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_getAllSpriteList_Actor = function( actor_obj ){
	var result = [];
	for(var i = 0; i < this._drill_AGi_spriteTank.length; i++){
		var temp_sprite = this._drill_AGi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._drill_parent_actorObj == actor_obj ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器 - 获取全部贴图 - 根据物体对象（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_getAllSpriteList_Character = function( character_obj ){
	var result = [];
	for(var i = 0; i < this._drill_AGi_spriteTank.length; i++){
		var temp_sprite = this._drill_AGi_spriteTank[i];
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
Game_Temp.prototype.drill_AGi_selectSpriteByAnimId = function( sprite_list, anim_id ){
	var result = [];
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller._drill_data['anim'] == anim_id ){
			result.push( temp_sprite );
		}
	}
	return result;
}
//==============================
// * 容器操作 - 设置贴图 立即显示/隐藏（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_setAnimVisible = function( sprite_list, v ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		temp_controller.drill_controller_setVisible( v );
	}
}
//==============================
// * 容器操作 - 设置贴图 暂停/继续（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_setAnimPause = function( sprite_list, b ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		temp_controller.drill_controller_setPause( b );
	}
}
//==============================
// * 容器操作 - 设置贴图立即出现（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_setAnimBirth = function( sprite_list ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_AGi_getState() == "延迟" ||
			temp_controller.drill_AGi_getState() == "出现" ){
			temp_controller.drill_AGi_setState("持续");
			temp_controller.drill_controller_setPause( false );
		}
	}
}
//==============================
// * 容器操作 - 设置贴图立即消失（开放函数）
//==============================
Game_Temp.prototype.drill_AGi_setAnimDeath = function( sprite_list ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_AGi_getState() != "消失" ){
			temp_controller.drill_AGi_setState("消失");
			temp_controller.drill_controller_setPause( false );
		}
	}
}



//=============================================================================
// ** ☆动画绑定
//
//			说明：	> 此模块专门管理 控制器+贴图 的创建。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 工具 - 父类溯源
//
//			说明：	输入对象、父类定义，返回父类对象。没有则返回空。
//==============================
DrillUp.drill_AGi_getAncestor = function( sprite, ancestor_class ){
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
// * 动画绑定 - 初始化
//==============================
var _drill_AGi_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
	_drill_AGi_initMembers.call(this);
	this._drill_duration = 0;			//最大持续时间
}
//==============================
// * 动画绑定 - 创建数据/创建贴图
//==============================
var _drill_AGi_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	
	// > 原函数
    _drill_AGi_setup.call(this,target, animation, mirror, delay);
	
	
	// > 添加动画贴图
	$gameTemp._drill_AGi_lastAdded = [];
	for( var i = 0; i < DrillUp.g_AGi_style.length; i++ ){
		var anim_data = DrillUp.g_AGi_style[i];
		if( this._animation.id == anim_data['anim'] ){
			
			// > 创建数据
			var temp_controller = new Drill_AGi_Controller( anim_data );
			$gameTemp._drill_AGi_controllerTank.push( temp_controller );
			
			// > 创建贴图
			var temp_sprite = new Drill_AGi_Sprite();
			temp_sprite.drill_sprite_setController( temp_controller );
			temp_sprite.drill_sprite_setAnimationSprite( this );		//（绑定动画贴图，转半圈还要回来）
																	//（个体贴图后期绑定）
			temp_sprite.drill_sprite_initChild();
			$gameTemp._drill_AGi_spriteTank.push( temp_sprite );
			$gameTemp._drill_AGi_lastAdded.push( temp_sprite );		//（个体贴图绑定 的 临时容器）
			
			// > 添加贴图到层级
			$gameTemp.drill_AGi_layerAddSprite( temp_sprite, anim_data['individualIndex'], this );
			
			// > 层级排序
			$gameTemp.drill_AGi_sortByZIndex_Scene();
			this.drill_AGi_sortByZIndex_Individual();
			
			// > 动画时长
			this._drill_duration =  Math.max(this._drill_duration, Math.max( 
				anim_data['delay'] + anim_data['birth'] + anim_data['sustain'] + anim_data['death'] + 1 , this._duration));
		}
	}
	
	
	// 连接-> （动画绑定 - 外键标记）
};
//==============================
// * 动画绑定 - 绑定对象
//==============================
var _drill_AGi_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    _drill_AGi_startAnimation.call(this,animation, mirror, delay);
	
	// <-承接 （动画绑定 - 创建数据/创建贴图）
	//	（前面的函数执行完后，会进入到该函数继续）
	
	this.drill_AGi_foreignKeyBinding();			//外键标记
	$gameTemp._drill_AGi_lastAdded = [];		//清空上一次添加的标记
}
//==============================
// * 动画绑定 - 外键标记
//==============================
Sprite_Base.prototype.drill_AGi_foreignKeyBinding = function(){
	if( $gameTemp._drill_AGi_lastAdded.length == 0 ){ return; }
	
	// > 敌人贴图（战斗界面）
	if( this instanceof Sprite_Enemy ){
		for(var i=0; i < $gameTemp._drill_AGi_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_AGi_lastAdded[i];
			sprite.drill_sprite_setIndividualSprite( this );
			sprite._drill_parent_enemyObj = this._enemy;
		}
	}
	
	// > 角色贴图（战斗界面）
	if( this instanceof Sprite_Actor ){
		for(var i=0; i < $gameTemp._drill_AGi_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_AGi_lastAdded[i];
			sprite.drill_sprite_setIndividualSprite( this );
			sprite._drill_parent_actorObj = this._actor;
		}
	}
	
	// > 物体贴图（地图界面）
	if( this instanceof Sprite_Character && $gameTemp.drill_AGi_isReflectionSprite(this) == false ){
		for(var i=0; i < $gameTemp._drill_AGi_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_AGi_lastAdded[i];
			sprite.drill_sprite_setIndividualSprite( this );
			sprite._drill_parent_characterObj = this._character;
		}
	}
}
//==============================
// * 动画绑定 - 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_AGi_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}


//=============================================================================
// ** ☆动画控制
//
//			说明：	> 此模块专门管理 控制器+贴图 的帧刷新与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 动画控制 - 帧刷新（地图界面）
//==============================
var _drill_AGi_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_AGi_smap_update.call(this);
	this.drill_AGi_updateInScene();
}
Scene_Map.prototype.drill_AGi_updateInScene = function() {
	
	
	// > 控制器帧刷新（需要放后面，与层级变化错开1帧）
	for(var i = 0; i < $gameTemp._drill_AGi_controllerTank.length; i++){
		var temp_controller = $gameTemp._drill_AGi_controllerTank[i];
		temp_controller.drill_controller_update();
	};
	
	
	// > 自动销毁 - 控制器
	for(var i = $gameTemp._drill_AGi_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameTemp._drill_AGi_controllerTank[i];
		if( temp_controller == undefined ||
			temp_controller.drill_AGi_isDead() ){
			$gameTemp._drill_AGi_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_AGi_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_AGi_spriteTank[i];
		
		// > 自动销毁 - 贴图本身为空
		if( temp_sprite == undefined ){
			$gameTemp._drill_AGi_spriteTank.splice(i,1);
			continue;
		}
		
		// > 自动销毁 - 控制器生命周期结束
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ||
			temp_controller.drill_AGi_isDead() ){
			$gameTemp.drill_AGi_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_AGi_spriteTank.splice(i,1);
			delete temp_sprite;
		}
	}
};
//==============================
// * 动画控制 - 帧刷新（战斗界面）
//==============================
var _drill_AGi_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_AGi_sbattle_update.call(this);
	this.drill_AGi_updateInScene();
}
Scene_Battle.prototype.drill_AGi_updateInScene = Scene_Map.prototype.drill_AGi_updateInScene;
//==============================
// * 动画控制 - 播放中
//==============================
var _drill_AGi_isPlaying = Sprite_Animation.prototype.isPlaying;
Sprite_Animation.prototype.isPlaying = function() {
    if( this._drill_duration > 0 ){
		return true;
	}
	return _drill_AGi_isPlaying.call(this);
};
//==============================
// * 动画控制 - 帧刷新
//==============================
var _drill_AGi_update = Sprite_Animation.prototype.update;
Sprite_Animation.prototype.update = function() {
	this._drill_duration_decreased = false;		//减一锁，确保多次继承后，减一后，不会继续执行减一方法。
	_drill_AGi_update.call(this);
	if( this._drill_duration_decreased == false ){
		this._drill_duration--;
		this._drill_duration_decreased = true;
	}
};
//==============================
// * 动画控制 - 移除（空指针优化）
//==============================
var _drill_AGi_remove = Sprite_Animation.prototype.remove;
Sprite_Animation.prototype.remove = function() {
	if( this._target != undefined ){
		_drill_AGi_remove.call(this);
	}else{
		if( this.parent ){
			this.parent.removeChild(this);
		}
	}
};



//=============================================================================
// ** 动画GIF控制器【Drill_AGi_Controller】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个专门控制动画GIF的数据类。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **						->层级位置修正
// **					->B变化控制
// **					->C播放GIF
// **					->D随机位置
// **					->2A阶段
// **						->延迟/出现/持续/消失/销毁
// **						->平移/旋转/缩放
// **		
// **		说明：	> 该类可存储在 $gameSystem 中。
// **				  但暂时没必要，因为动画贴图无法再次创建。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_AGi_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_AGi_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_AGi_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_AGi_Controller.prototype.drill_controller_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_controller_updateAttr();					//帧刷新 - A主体
	this.drill_controller_updateChange_Position();		//帧刷新 - B变化控制 - 平移
	this.drill_controller_updateChange_Rotation();		//帧刷新 - B变化控制 - 旋转
	this.drill_controller_updateGIF();					//帧刷新 - C播放GIF
	this.drill_controller_updateRandom();				//帧刷新 - D随机位置
	this.drill_AGi_updateState();						//帧刷新 - 2A阶段
	this.drill_controller_updateCheckNaN();				//帧刷新 - A主体 - 校验值
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
Drill_AGi_Controller.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】（暂未使用，采用 $gameSystem._drill_AGi_visible 控制）
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_AGi_Controller.prototype.drill_controller_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_AGi_Controller.prototype.drill_controller_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_AGi_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_AGi_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * 2A阶段 - 获取当前阶段【开放函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_AGi_Controller.prototype.drill_AGi_getState = function(){
	return this._drill_curState;
};
//##############################
// * 2A阶段 - 设置当前阶段【开放函数】
//
//			参数：	> state 字符串
//			返回：	> 无
//##############################
Drill_AGi_Controller.prototype.drill_AGi_setState = function( state ){
	this.drill_AGi_setState_Private( state );
};
//##############################
// * 2A阶段 - 判断阶段销毁【开放函数】
//
//			参数：	> 无
//			返回：	> 布尔
//
//			说明：	> 此处融合了前面的判断销毁。
//##############################
Drill_AGi_Controller.prototype.drill_AGi_isDead = function(){
	return  this.drill_controller_isDead() || 
			this._drill_curState == "销毁";
};

//##############################
// * 控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_AGi_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 控制器
	if( data['visible'] == undefined ){ data['visible'] = true };							//控制器 - 显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };								//控制器 - 暂停情况
	if( data['anim'] == undefined ){ data['anim'] = 0 };									//控制器 - 绑定的动画id
	
	// > 贴图
	if( data['src_img_gif'] == undefined ){ data['src_img_gif'] = [] };						//贴图 - GIF
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Special__anim/" };	//贴图 - 文件夹
	if( data['interval'] == undefined ){ data['interval'] = 4 };							//贴图 - 帧间隔
	if( data['back_run'] == undefined ){ data['back_run'] = false };						//贴图 - 是否倒放
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };							//贴图 - 混合模式
	if( data['tint'] == undefined ){ data['tint'] = 0 };									//贴图 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };							//贴图 - 图像-模糊边缘
	if( data['individualIndex'] == undefined ){ data['individualIndex'] = "在动画后面" };	//贴图 - 动画层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };								//贴图 - 图片层级
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };											//A主体 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };											//A主体 - 平移Y
	
	// > A主体 - 3d效果
	if( data['scale_x'] == undefined ){ data['scale_x'] = 1.0 };							//A主体 - 3d效果 - 整体缩放X
	if( data['scale_y'] == undefined ){ data['scale_y'] = 1.0 };							//A主体 - 3d效果 - 整体缩放Y
	if( data['skew_x'] == undefined ){ data['skew_x'] = 0 };								//A主体 - 3d效果 - 整体斜切X
	if( data['skew_y'] == undefined ){ data['skew_y'] = 0 };								//A主体 - 3d效果 - 整体斜切Y
	
	// > B变化控制
	if( data['rotate'] == undefined ){ data['rotate'] = 0 };								//B变化控制 - 自旋转速度（单位角度）
	
	// > C播放GIF（无）
	
	// > D随机位置
	if( data['randomPos_enable'] == undefined ){ data['randomPos_enable'] = false };		//D随机位置 - 是否启用随机位置
	if( data['randomPos_width'] == undefined ){ data['randomPos_width'] = 50 };				//D随机位置 - 随机位置的范围宽度
	if( data['randomPos_height'] == undefined ){ data['randomPos_height'] = 50 };			//D随机位置 - 随机位置的范围高度
	if( data['randomPos_autoChange'] == undefined ){ data['randomPos_autoChange'] = false };//D随机位置 - 是否在每次播放GIF完毕后变化位置
	if( data['randomPos_gifFrame'] == undefined ){ data['randomPos_gifFrame'] = false };	//D随机位置 - 是否随机GIF初始帧
	
	// > 2A阶段
	if( data['delay'] == undefined ){ data['delay'] = 0 };									//2A阶段 - 出现延迟
	if( data['birth'] == undefined ){ data['birth'] = 20 };									//2A阶段 - 出现时长
	if( data['birthMode'] == undefined ){ data['birthMode'] = "横向显现" };					//2A阶段 - 出现模式
	if( data['birthScaleX'] == undefined ){ data['birthScaleX'] = 1.0 };					//2A阶段 - 出现-自定义缩放X
	if( data['birthScaleY'] == undefined ){ data['birthScaleY'] = 1.0 };					//2A阶段 - 出现-自定义缩放Y
	if( data['birthOpacity'] == undefined ){ data['birthOpacity'] = 0 };					//2A阶段 - 出现-自定义透明度
	if( data['sustain'] == undefined ){ data['sustain'] = 120 };							//2A阶段 - 持续时长
	if( data['sustainMode'] == undefined ){ data['sustainMode'] = "常规值" };				//2A阶段 - 持续模式
	if( data['sustainScaleX'] == undefined ){ data['sustainScaleX'] = 1.0 };				//2A阶段 - 持续-自定义缩放X
	if( data['sustainScaleY'] == undefined ){ data['sustainScaleY'] = 1.0 };				//2A阶段 - 持续-自定义缩放Y
	if( data['sustainOpacity'] == undefined ){ data['sustainOpacity'] = 0 };				//2A阶段 - 持续-自定义透明度
	if( data['death'] == undefined ){ data['death'] = 20 };									//2A阶段 - 消失时长
	if( data['deathMode'] == undefined ){ data['deathMode'] = "普通淡出消失" };				//2A阶段 - 消失模式
	if( data['deathScaleX'] == undefined ){ data['deathScaleX'] = 1.0 };					//2A阶段 - 消失-自定义缩放X
	if( data['deathScaleY'] == undefined ){ data['deathScaleY'] = 1.0 };					//2A阶段 - 消失-自定义缩放Y
	if( data['deathOpacity'] == undefined ){ data['deathOpacity'] = 0 };					//2A阶段 - 消失-自定义透明度
}
//==============================
// * 初始化 - 初始化子功能
//==============================
Drill_AGi_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	this.drill_controller_initChange();			//初始化子功能 - B变化控制
	this.drill_controller_initGIF();			//初始化子功能 - C播放GIF
	this.drill_controller_initRandom();			//初始化子功能 - D随机位置
	this.drill_AGi_initState();					//初始化子功能 - 2A阶段
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_AGi_Controller.prototype.drill_controller_resetData_Private = function( data ){
	
	// > 判断数据重复情况
	if( this._drill_data != undefined ){
		var keys = Object.keys( data );
		var is_same = true;
		for( var i=0; i < keys.length; i++ ){
			var key = keys[i];
			if( this._drill_data[key] != data[key] ){
				is_same = false;
			}
		}
		if( is_same == true ){ return; }
	}
	// > 补充未设置的数据
	var keys = Object.keys( this._drill_data );
	for( var i=0; i < keys.length; i++ ){
		var key = keys[i];
		if( data[key] == undefined ){
			data[key] = this._drill_data[key];
		}
	}
	
	// > 执行重置
	this._drill_data = JSON.parse(JSON.stringify( data ));					//深拷贝
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_AGi_Controller.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
	
	// > 贴图属性
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	this._drill_opacity = 255;
	
	// > 3d效果
	this._drill_layer_scaleX = data['scale_x'];
	this._drill_layer_scaleY = data['scale_y'];
	this._drill_layer_skewX = data['skew_x'];
	this._drill_layer_skewY = data['skew_y'];
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_AGi_Controller.prototype.drill_controller_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_AGi_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_AGi_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_AGi_checkNaN = false;
			alert( DrillUp.drill_AGi_getPluginTip_ParamIsNaN( "_drill_x" ) );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_AGi_checkNaN = false;
			alert( DrillUp.drill_AGi_getPluginTip_ParamIsNaN( "_drill_y" ) );
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_AGi_checkNaN = false;
			alert( DrillUp.drill_AGi_getPluginTip_ParamIsNaN( "_drill_opacity" ) );
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_AGi_checkNaN = false;
			alert( DrillUp.drill_AGi_getPluginTip_ParamIsNaN( "_drill_scaleX" ) );
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_AGi_checkNaN = false;
			alert( DrillUp.drill_AGi_getPluginTip_ParamIsNaN( "_drill_scaleY" ) );
		}
	}
}


//==============================
// * B变化控制 - 初始化子功能
//==============================
Drill_AGi_Controller.prototype.drill_controller_initChange = function() {
	var data = this._drill_data;
	
	// > 位置（无）
	
	// > 透明度（无）
	
	// > 缩放（无）
	
	// > 旋转
	this._drill_childGIF_rotation = 0;
}
//==============================
// * B变化控制 - 帧刷新 位置
//==============================
Drill_AGi_Controller.prototype.drill_controller_updateChange_Position = function(){
	var data = this._drill_data;
	
	// > 位置平移
	var xx = 0;
	var yy = 0;
	xx += data['x'];
	yy += data['y'];
	
	// > D随机位置
	xx += this._drill_randomPos_x;
	yy += this._drill_randomPos_y;
	
	this._drill_x = xx;
	this._drill_y = yy;
}
//==============================
// * B变化控制 - 帧刷新 旋转
//==============================
Drill_AGi_Controller.prototype.drill_controller_updateChange_Rotation = function(){
	var data = this._drill_data;
	
	// > 自旋转
	this._drill_childGIF_rotation += data['rotate'];
}


//==============================
// * C播放GIF - 初始化子功能
//==============================
Drill_AGi_Controller.prototype.drill_controller_initGIF = function() {
	var data = this._drill_data;
	
	// > GIF播放
	this._drill_GIF_time = 0;			//GIF播放 - 当前时间
	this._drill_GIF_index = 0;			//GIF播放 - 当前索引
}
//==============================
// * C播放GIF - 帧刷新
//==============================
Drill_AGi_Controller.prototype.drill_controller_updateGIF = function(){
	var data = this._drill_data;
	
	// > 播放GIF
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = Math.floor(inter);
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
	
	// > 播放GIF时间+1（放后面）
	this._drill_GIF_time += 1;
}


//==============================
// * D随机位置 - 初始化子功能
//
//			说明：	> 此功能对 B变化控制 和 C播放GIF 进行组合控制。
//==============================
Drill_AGi_Controller.prototype.drill_controller_initRandom = function() {
	var data = this._drill_data;
	
	// > 随机位置
	this._drill_randomPos_x = 0;			//随机位置 - 位置X
	this._drill_randomPos_y = 0;			//随机位置 - 位置Y
	this._drill_randomPos_lastInter = 0;	//随机位置 - 上一次时间
	if( data['randomPos_enable'] == true ){
		this._drill_randomPos_x = Math.floor( data['randomPos_width'] *( Math.random()-0.5 ));
		this._drill_randomPos_y = Math.floor( data['randomPos_height']*( Math.random()-0.5 ));
	}
	if( data['randomPos_gifFrame'] == true ){
		this._drill_GIF_time = Math.floor( data['interval']*data['src_img_gif'].length * Math.random() );
	}
}
//==============================
// * D随机位置 - 帧刷新
//==============================
Drill_AGi_Controller.prototype.drill_controller_updateRandom = function(){
	var data = this._drill_data;
	
	// > 每次播放结束后变化
	if( data['randomPos_enable'] == true ){
		var inter = Math.floor(this._drill_GIF_time / data['interval'] / data['src_img_gif'].length);
		if( this._drill_randomPos_lastInter != inter ){
			this._drill_randomPos_lastInter = inter;
			this._drill_randomPos_x = Math.floor( data['randomPos_width'] *( Math.random()-0.5 ));
			this._drill_randomPos_y = Math.floor( data['randomPos_height']*( Math.random()-0.5 ));
		}
	}
}


//==============================
// * 2A阶段 - 初始化子功能
//==============================
Drill_AGi_Controller.prototype.drill_AGi_initState = function() {
	
	// > 阶段
	this._drill_curState = "延迟";		//阶段 - 当前阶段（延迟、出现、持续、消失、销毁）
	
	// > 阶段初始化
	this.drill_initBirthState();
	this.drill_initSustainState();
	this.drill_initDeathState();
}
//==============================
// * 2A阶段 - 设置当前阶段
//
//			说明：	注意，由于 透明度和缩放 变化并不是固定公式，而是增量值。
//					因此 阶段切换 时不会出现贴图突然变化情况，但代价是变化情况不可控。
//==============================
Drill_AGi_Controller.prototype.drill_AGi_setState_Private = function( state ){
	var data = this._drill_data;
	if( state == "延迟" ){
		this._drill_curTime = 0;
		this._drill_curState = state;
	}
	if( state == "出现" ){
		this._drill_curTime = data['delay'];
		this._drill_curState = state;
	}
	if( state == "持续" ){
		this._drill_opacity = 255;
		this._drill_curTime = data['delay'] + data['birth'];
		this._drill_curState = state;
	}
	if( state == "消失" ){
		this._drill_curTime = data['delay'] + data['birth'] + data['sustain'];
		this._drill_curState = state;
	}
	if( state == "销毁" ){
		this._drill_curTime = data['delay'] + data['birth'] + data['sustain'] + data['death'];
		this._drill_curState = state;
		this.drill_controller_destroy();	//（执行销毁）
	}
}
//==============================
// * 2A阶段 - 帧刷新
//==============================
Drill_AGi_Controller.prototype.drill_AGi_updateState = function(){
	var data = this._drill_data;
	
	// > 阶段赋值
	if( this._drill_curTime < data['delay'] ){
		this._drill_curState = "延迟";
	}else if( this._drill_curTime < data['delay'] + data['birth'] ){
		this._drill_curState = "出现";
	}else if( this._drill_curTime < data['delay'] + data['birth'] + data['sustain'] ){
		this._drill_curState = "持续";
	}else if( this._drill_curTime < data['delay'] + data['birth'] + data['sustain'] + data['death'] ){
		this._drill_curState = "消失";
	}else{
		this._drill_curState = "销毁";
		this.drill_controller_destroy();	//（执行销毁）
	}
	
	// > 缩放与旋转
	var opacity = 255;
	var scale_x = 1;
	var scale_y = 1;
	if( this._drill_curState == "延迟" ){
		opacity = this._drill_birth_opacity;
		scale_x = this._drill_birth_scaleX;
		scale_y = this._drill_birth_scaleY;
	}
	if( this._drill_curState == "出现" ){
		var cur_time = this._drill_curTime - data['delay'];
		
		// > 透明度
		var d0 = this._drill_birth_opacity;
		var diff = this._drill_sustain_opacity - this._drill_birth_opacity;
		opacity = d0 + diff * cur_time / data['birth'];
		
		// > 缩放X
		var d0 = this._drill_birth_scaleX;
		var diff = this._drill_sustain_scaleX - this._drill_birth_scaleX;
		scale_x = d0 + diff * cur_time / data['birth'];
		
		// > 缩放Y
		var d0 = this._drill_birth_scaleY;
		var diff = this._drill_sustain_scaleY - this._drill_birth_scaleY;
		scale_y = d0 + diff * cur_time / data['birth'];
	}
	if( this._drill_curState == "持续" ){
		opacity = this._drill_sustain_opacity;
		scale_x = this._drill_sustain_scaleX;
		scale_y = this._drill_sustain_scaleY;
	}
	if( this._drill_curState == "消失" ){
		var cur_time = this._drill_curTime - data['delay'] - data['birth'] - data['sustain'];
		
		// > 透明度
		var d0 = this._drill_sustain_opacity;
		var diff = this._drill_death_opacity - this._drill_sustain_opacity;
		opacity = d0 + diff * cur_time / data['death'];
		
		// > 缩放X
		var d0 = this._drill_sustain_scaleX;
		var diff = this._drill_death_scaleX - this._drill_sustain_scaleX;
		scale_x = d0 + diff * cur_time / data['death'];
		
		// > 缩放Y
		var d0 = this._drill_sustain_scaleY;
		var diff = this._drill_death_scaleY - this._drill_sustain_scaleY;
		scale_y = d0 + diff * cur_time / data['death'];
	}
	if( this._drill_curState == "销毁" ){
		opacity = 0;
		scale_x = 1;
		scale_y = 1;
	}
	this._drill_opacity = opacity;
	this._drill_scaleX  = scale_x;
	this._drill_scaleY  = scale_y;
}
//==============================
// * 2A阶段 - 初始化 出现状态
//==============================
Drill_AGi_Controller.prototype.drill_initBirthState = function() {
	var data = this._drill_data;
	
	this._drill_birth_scaleX = 1;	//（常规值）
	this._drill_birth_scaleY = 1;
	this._drill_birth_opacity = 0;
	if( data['birthMode'] == "横向显现"){
		this._drill_birth_scaleY = 0;
		this._drill_birth_opacity = 0;
	}else if( data['birthMode'] == "纵向显现"){
		this._drill_birth_scaleX = 0;
		this._drill_birth_opacity = 0;
	}else if( data['birthMode'] == "放大显现"){
		this._drill_birth_scaleX = 0;
		this._drill_birth_scaleY = 0;
		this._drill_birth_opacity = 0;
	}else if( data['birthMode'] == "缩小显现"){
		this._drill_birth_scaleX = 2;
		this._drill_birth_scaleY = 2;
		this._drill_birth_opacity = 0;
	}else if( data['birthMode'] == "普通淡入显现"){
		this._drill_birth_opacity = 0;
	}else if( data['birthMode'] == "自定义"){
		this._drill_birth_scaleX = data['birthScaleX'];
		this._drill_birth_scaleY = data['birthScaleY'];
		this._drill_birth_opacity = data['birthOpacity'];
	}
}
//==============================
// * 2A阶段 - 初始化 持续状态
//==============================
Drill_AGi_Controller.prototype.drill_initSustainState = function() {
	var data = this._drill_data;
	
	this._drill_sustain_scaleX = 1;	//（常规值）
	this._drill_sustain_scaleY = 1;
	this._drill_sustain_opacity = 255;
	if( data['sustainMode'] == "自定义" ){
		this._drill_sustain_scaleX = data['sustainScaleX'];
		this._drill_sustain_scaleY = data['sustainScaleY'];
		this._drill_sustain_opacity = data['sustainOpacity'];
	}
}
//==============================
// * 2A阶段 - 初始化 消失状态
//==============================
Drill_AGi_Controller.prototype.drill_initDeathState = function() {
	var data = this._drill_data;
	
	this._drill_death_scaleX = 1;	//（常规值）
	this._drill_death_scaleY = 1;
	this._drill_death_opacity = 255;
	if( data['deathMode'] == "横向消失"){
		this._drill_death_scaleY = 0;
		this._drill_death_opacity = 0;
	}else if( data['deathMode'] == "纵向消失"){
		this._drill_death_scaleX = 0;
		this._drill_death_opacity = 0;
	}else if( data['deathMode'] == "放大消失"){
		this._drill_death_scaleX = 2;
		this._drill_death_scaleY = 2;
		this._drill_death_opacity = 0;
	}else if( data['deathMode'] == "缩小消失"){
		this._drill_death_scaleX = 0;
		this._drill_death_scaleY = 0;
		this._drill_death_opacity = 0;
	}else if( data['deathMode'] == "普通淡出消失"){
		this._drill_death_opacity = 0;
	}else if( data['deathMode'] == "自定义"){
		this._drill_death_scaleX = data['deathScaleX'];
		this._drill_death_scaleY = data['deathScaleY'];
		this._drill_death_opacity = data['deathOpacity'];
	}
}


//=============================================================================
// ** 动画GIF贴图【Drill_AGi_Sprite】
// **
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个动画GIF贴图。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					->A主体
// **					->B变化控制
// **						->层级位置修正
// **					->C对象绑定
// **						->设置控制器
// **						->设置动画贴图
// **						->设置个体贴图
// **						->贴图初始化（手动）
// **					->D播放GIF
// **
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器和个体贴图 ）
// **
// **		代码：	> 范围 - 该类显示单独的动画装饰。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 动画控制 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 动画GIF贴图 - 定义
//==============================
function Drill_AGi_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_AGi_Sprite.prototype = Object.create(Sprite.prototype);
Drill_AGi_Sprite.prototype.constructor = Drill_AGi_Sprite;
//==============================
// * 动画GIF贴图 - 初始化
//==============================
Drill_AGi_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 动画GIF贴图 - 帧刷新
//==============================
Drill_AGi_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();				//帧刷新 - A主体
	this.drill_sprite_updateChange();			//帧刷新 - B变化控制
												//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateGIF();				//帧刷新 - D播放GIF
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_AGi_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * C对象绑定 - 设置动画贴图【开放函数】
//			
//			参数：	> animation_sprite 动画贴图
//			返回：	> 无
//##############################
Drill_AGi_Sprite.prototype.drill_sprite_setAnimationSprite = function( animation_sprite ){
	this._drill_animationSprite = animation_sprite;
	this._animation = animation_sprite._animation;
};
//##############################
// * C对象绑定 - 设置个体贴图【开放函数】
//			
//			参数：	> individual_sprite 贴图对象
//			返回：	> 无
//			
//			说明：	> 如果只播放单纯动画，此项可以为null。
//##############################
Drill_AGi_Sprite.prototype.drill_sprite_setIndividualSprite = function( individual_sprite ){
	this._drill_individualSprite = individual_sprite;
};
//##############################
// * C对象绑定 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器和个体贴图 之后，才能进行初始化。
//##############################
Drill_AGi_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B变化控制
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initGIF();				//初始化子功能 - D播放GIF
};

//##############################
// * 动画GIF贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_AGi_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
	if( this._drill_animationSprite == undefined ){ return false; }
	//if( this._drill_individualSprite == undefined ){ return false; }	//（注意，如果只播放单纯动画，个体贴图为null）
    return true;
};
//##############################
// * 动画GIF贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_AGi_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 动画GIF贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_AGi_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 动画GIF贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_AGi_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 动画GIF贴图 - 初始化自身（私有）
//==============================
Drill_AGi_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
	this._drill_individualSprite = null;		//个体贴图（指针）
	this._drill_animationSprite = null;			//动画贴图（指针）
	this._animation = null;						//动画对象（指针）
};
//==============================
// * 动画GIF贴图 - 销毁子功能（私有）
//==============================
Drill_AGi_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	this._drill_layerSprite.removeChild( this._drill_childGIFSprite );
	this.removeChild( this._drill_layerSprite );
	this._drill_childGIFSprite = null;
	this._drill_layerSprite = null;
	
	// > 销毁 - B变化控制
	//	（无）
	
	// > 销毁 - C对象绑定
	this._drill_parent_enemyObj = null;			//外键标记
	this._drill_parent_actorObj = null;			//外键标记
	this._drill_parent_characterObj = null;		//外键标记
	
	// > 销毁 - D播放GIF
	//	（无）
};
//==============================
// * 动画GIF贴图 - 销毁自身（私有）
//==============================
Drill_AGi_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
	this._drill_individualSprite = null;		//个体贴图（指针）
	this._drill_animationSprite = null;			//动画贴图（指针）
	this._animation = null;						//动画对象（指针）
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_AGi_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller._drill_data;

	// > 属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.blendMode = data['blendMode'];
	this.zIndex = data['zIndex'];
	this.visible = false;
	
	
	// > 资源对象组
	this._drill_bitmapTank = [];
	for(var j = 0; j < data['src_img_gif'].length; j++ ){
		var bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img_gif'][j], data['tint'], data['smooth'] );
		this._drill_bitmapTank.push( bitmap );
	}
			
	// > GIF贴图
	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = this._drill_bitmapTank[0];
	this._drill_childGIFSprite = temp_sprite;
	
	// > GIF层
	var temp_layer = new Sprite();		//GIF两层容器
	temp_layer.anchor.x = 0.5;
	temp_layer.anchor.y = 0.5;
	this._drill_layerSprite = temp_layer;
	
	this._drill_layerSprite.addChild( this._drill_childGIFSprite );
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A主体 - 初始化子功能
//==============================
Drill_AGi_Sprite.prototype.drill_sprite_updateAttr = function(){
	var data = this._drill_controller._drill_data;
	
	// > 贴图 - 贴图属性
	this.scale.x = this._drill_controller._drill_scaleX;
	this.scale.y = this._drill_controller._drill_scaleY;
	this.opacity = this._drill_controller._drill_opacity;
	//this.visible = data['visible'];
	this.visible = $gameSystem._drill_AGi_visible[ data['id']-1 ];
	
	// > 贴图 - 层级属性
	this._drill_layerSprite.scale.x = this._drill_controller._drill_layer_scaleX;
	this._drill_layerSprite.scale.y = this._drill_controller._drill_layer_scaleY;
	this._drill_layerSprite.skew.x  = this._drill_controller._drill_layer_skewX;
	this._drill_layerSprite.skew.y  = this._drill_controller._drill_layer_skewY;
}


//==============================
// * B变化控制 - 初始化子功能
//==============================
Drill_AGi_Sprite.prototype.drill_sprite_initChange = function(){
	var data = this._drill_controller._drill_data;
	//	（无）
}
//==============================
// * B变化控制 - 初始化子功能
//==============================
Drill_AGi_Sprite.prototype.drill_sprite_updateChange = function(){
	var data = this._drill_controller._drill_data;
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	
	
	// > 层级位置修正
	var cur_layer = data['individualIndex'];
	
	if( cur_layer == "动画前面层" || cur_layer == "在动画前面" ){
		//（无操作）
	}
	
	if( cur_layer == "动画后面层" || cur_layer == "在动画后面" ){
		//（无操作）
	}
	
	if( cur_layer == "父贴图后面层" || cur_layer == "在父贴图后面" ){
		
		// > 类型为 画面 情况时
		if( this._animation.position == 3 ){
			xx += Graphics.boxWidth *0.5;
			yy += Graphics.boxHeight*0.5;
		
		// > 一般类型的情况
		}else{
			xx += this._drill_animationSprite.x;
			yy += this._drill_animationSprite.y;
			
			// > 动画贴图还未初始化的情况
			if( this._drill_animationSprite.x == 0 &&
				this._drill_animationSprite.y == 0 ){
				this.visible = false;
				return;	//（当前帧直接跳过）
			}
			
			// > 敌人位置修正
			if( this._drill_individualSprite instanceof Sprite_Enemy ){
				//（不修正）
				//yy += this._drill_individualSprite.height*0.1;
			}
			// > 角色位置修正
			if( this._drill_individualSprite instanceof Sprite_Actor ){
				// > 第一人称位置修正（战斗镜头）
				if( Imported.Drill_BattleCamera && !$gameSystem.isSideView() ){		//（在图层内）
					var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
					xx -= camera_pos.x;
					yy -= camera_pos.y;
				}
			}
			// > 物体位置修正
			if( this._drill_individualSprite instanceof Sprite_Character ){
				//（不修正）
				//yy -= 24;
			}
		}
	}
	this.x = xx;
	this.y = yy;
	
	// > 贴图 - GIF属性
	this._drill_childGIFSprite.rotation = this._drill_controller._drill_childGIF_rotation *Math.PI/180;
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * D播放GIF - 初始化子功能
//==============================
Drill_AGi_Sprite.prototype.drill_sprite_initGIF = function(){
	var data = this._drill_controller._drill_data;
	//	（无）
}
//==============================
// * D播放GIF - 帧刷新
//==============================
Drill_AGi_Sprite.prototype.drill_sprite_updateGIF = function(){
	var data = this._drill_controller._drill_data;
	
	// > 贴图Bitmap
	this._drill_childGIFSprite.bitmap = this._drill_bitmapTank[ this._drill_controller._drill_GIF_index ];
}



