//=============================================================================
// Drill_AnimationSurround.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        动画 - 多层动画环绕球
 * @author Drill_up
 * 
 * @Drill_LE_param "环绕球样式-%d"
 * @Drill_LE_parentKey "---环绕球样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_ASu_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_AnimationSurround +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以添加环绕球，绑定在一个指定的动画上面。播放动画时能出现环绕球。
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面，战斗界面。
 *   作用于动画，伴随动画一起出现。
 * 2.更多详细的组合方法，去看看 "17.主菜单 > 多层组合装饰（对象装饰）.docx"。
 * 3.更多详细的设置效果，去看看 "12.动画 > 关于魔法效果与并行动画.docx"。
 * 细节：
 *   (1.动画环绕球是一个具有持续时间的效果，分为 出现、持续、消失 三阶段。
 *   (2.战斗界面中，会因为动画效果播放中而一直等到动画播放完才进行下一指令。
 *      如果你需要制作不等待的持续效果，则需添加使用 并行动画 插件。
 * 绑定：
 *   (1.多个样式可以绑定同一个动画，在动画播放时同时出现。
 *   (2.你需要在插件中 配置样式 ，样式中设置绑定指定的动画id。
 *     （绑定后，配置的动画和rmmv动画同时播放，rmmv动画你需要手动设置额外持续时间）
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__anim （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__anim文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 环绕球样式-1 资源-环绕球
 * 环绕球样式-2 资源-环绕球
 * 环绕球样式-3 资源-环绕球
 * ……
 *
 * 你可以在同一个动画里面加入非常多的不同种类的样式，并且持续时间可以非常长。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制动画环绕球的显示情况：
 * 
 * 插件指令：>动画环绕球 : 样式[2] : 显示
 * 插件指令：>动画环绕球 : 样式[2] : 隐藏
 *
 * 1.如果样式被隐藏，则新动画不会显示该样式，但正在播放的不会变。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 只样式条件
 * 你可以通过插件指令对播放中的动画环绕球进行设置：
 * 
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 立即显示
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 立即隐藏
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 立即消失
 *
 * 1."立即显示/隐藏"可以使得正在播放的样式瞬间显示/隐藏。
 *   "立即出现"可以使得播放的动画立刻跳过 出现状态。
 *   "立即消失"可以使得播放的动画立刻进入 消失状态。
 * 2.具体使用方法，可以去物体管理层西北角的"中断蓄力动画"看看。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 样式条件和地图物体
 * 你可以通过插件指令对播放中的动画环绕球样式进行设置：
 * 
 * 插件指令：>动画环绕球 : 所有样式 : 本事件 : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 本事件 : 立即出现
 * 
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 玩家 : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 本事件 : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 事件[10] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 事件变量[21] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 批量事件[10,11] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 批量事件变量[21,22] : 立即出现
 * 
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 本事件 : 立即显示
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 本事件 : 立即隐藏
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 本事件 : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 本事件 : 立即消失
 * 
 * 1.前半部分（所有样式）中间部分（本事件）和 后半部分（立即出现）
 *   的参数可以随意组合。一共有2*6*4种组合方式。
 * 2.通过插件指令可以直接控制到地图界面中一个具体事件的一个具体环绕球。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 样式条件和战斗单位
 * 你可以通过插件指令对播放中的动画环绕球样式进行设置：
 * 
 * 插件指令：>动画环绕球 : 所有样式 : 敌方[2] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 敌方[2] : 立即出现
 * 
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 敌方[2] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 敌方全体 : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 敌方变量[21] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 我方[2] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 我方全体 : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 我方变量[21] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 战斗敌人[5] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 战斗敌人变量[21] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 战斗角色[5] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 战斗角色变量[21] : 立即出现
 * 
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 敌方[2] : 立即显示
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 敌方[2] : 立即隐藏
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 敌方[2] : 立即出现
 * 插件指令：>动画环绕球 : 播放中的样式[2] : 敌方[2] : 立即消失
 * 
 * 1.前半部分（所有样式）中间部分（敌方[2]）和 后半部分（立即出现）
 *   的参数可以随意组合。一共有2*10*4种组合方式。
 * 2.通过插件指令可以直接控制到战斗界面中一个具体单位的一个具体环绕球。
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
 * 测试结果：   200个事件的地图中，平均消耗为：【27.36ms】
 *              100个事件的地图中，平均消耗为：【22.65ms】
 *               50个事件的地图中，平均消耗为：【15.83ms】
 * 测试方法2：  在战斗界面中播放4个含动画粒子的动画。
 * 测试结果2：  战斗界面平均消耗为：【13.82ms】
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
 * 修复了动画删除时出错的bug。
 *
 *
 * @param ---环绕球样式组 1至20---
 * @default
 *
 * @param 环绕球样式-1
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-2
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-3
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-4
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-5
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-6
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-7
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-8
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-9
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-10
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-11
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-12
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-13
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-14
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-15
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-16
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-17
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-18
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-19
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-20
 * @parent ---环绕球样式组 1至20---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组21至40---
 * @default
 *
 * @param 环绕球样式-21
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-22
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-23
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-24
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-25
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-26
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-27
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-28
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-29
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-30
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-31
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-32
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-33
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-34
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-35
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-36
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-37
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-38
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-39
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-40
 * @parent ---环绕球样式组21至40---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组41至60---
 * @default
 *
 * @param 环绕球样式-41
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-42
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-43
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-44
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-45
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-46
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-47
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-48
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-49
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-50
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-51
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-52
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-53
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-54
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-55
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-56
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-57
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-58
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-59
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-60
 * @parent ---环绕球样式组41至60---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组61至80---
 * @default
 *
 * @param 环绕球样式-61
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-62
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-63
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-64
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-65
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-66
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-67
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-68
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-69
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-70
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-71
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-72
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-73
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-74
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-75
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-76
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-77
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-78
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-79
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-80
 * @parent ---环绕球样式组61至80---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组81至100---
 * @default
 *
 * @param 环绕球样式-81
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-82
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-83
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-84
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-85
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-86
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-87
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-88
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-89
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-90
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-91
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-92
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-93
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-94
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-95
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-96
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-97
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-98
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-99
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-100
 * @parent ---环绕球样式组81至100---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组101至120---
 * @default
 *
 * @param 环绕球样式-101
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-102
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-103
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-104
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-105
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-106
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-107
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-108
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-109
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-110
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-111
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-112
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-113
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-114
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-115
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-116
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-117
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-118
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-119
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-120
 * @parent ---环绕球样式组101至120---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组121至140---
 * @default
 *
 * @param 环绕球样式-121
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-122
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-123
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-124
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-125
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-126
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-127
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-128
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-129
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-130
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-131
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-132
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-133
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-134
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-135
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-136
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-137
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-138
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-139
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-140
 * @parent ---环绕球样式组121至140---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组141至160---
 * @default
 *
 * @param 环绕球样式-141
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-142
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-143
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-144
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-145
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-146
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-147
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-148
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-149
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-150
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-151
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-152
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-153
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-154
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-155
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-156
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-157
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-158
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-159
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-160
 * @parent ---环绕球样式组141至160---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组161至180---
 * @default
 *
 * @param 环绕球样式-161
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-162
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-163
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-164
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-165
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-166
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-167
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-168
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-169
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-170
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-171
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-172
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-173
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-174
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-175
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-176
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-177
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-178
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-179
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-180
 * @parent ---环绕球样式组161至180---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param ---环绕球样式组181至200---
 * @default
 *
 * @param 环绕球样式-181
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-182
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-183
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-184
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-185
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-186
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-187
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-188
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-189
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-190
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-191
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-192
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-193
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-194
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-195
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-196
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-197
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-198
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-199
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 *
 * @param 环绕球样式-200
 * @parent ---环绕球样式组181至200---
 * @type struct<ASuStyle>
 * @desc 动画环绕球样式的详细配置信息。
 * @default 
 */
/*~struct~ASuStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的动画环绕球样式==
 * 
 * @param --绑定--
 * @desc 
 *
 * @param 绑定的动画
 * @parent --绑定--
 * @type animation
 * @desc 指定动画的id，环绕球样式将会与动画相互绑定。
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
 * @param 资源-环绕球
 * @parent --贴图--
 * @desc 环绕球的图片资源，可以是单张图片，也可以是多张图片构成的GIF。
 * @default ["动画环绕球-默认"]
 * @require 1
 * @dir img/Special__anim/
 * @type file[]
 *
 * @param 帧间隔
 * @parent --贴图--
 * @type number
 * @min 1
 * @desc 环绕球每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent --贴图--
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 平移-环绕球 X
 * @parent --贴图--
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-环绕球 Y
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
 * @param 自旋转速度
 * @parent --贴图--
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 0.0
 *
 * @param 图片层级
 * @parent --贴图--
 * @type number
 * @min 0
 * @desc 环绕球在同一个动画，并且在同一动画层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 * @param --环绕轨迹--
 * @desc 
 * 
 * @param 长轴长度
 * @parent --环绕轨迹--
 * @type number
 * @min 1
 * @desc 环绕球的轨迹为椭圆，短轴长度 指该椭圆的长轴长度。
 * @default 100
 * 
 * @param 短轴长度
 * @parent --环绕轨迹--
 * @type number
 * @min 1
 * @desc 环绕球的轨迹为椭圆，短轴长度 指该椭圆的短轴长度。
 * @default 20
 * 
 * @param 环绕速度
 * @parent --环绕轨迹--
 * @desc 环绕球的环绕速度，单位 角度/帧，正数顺时针，负数逆时针。(1秒60帧)
 * @default -3.0
 * 
 * @param 起始角度
 * @parent --环绕轨迹--
 * @type number
 * @min 0
 * @max 360
 * @desc 环绕球的开始移动时，所在椭圆轨道的起始角度。
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
 * @desc 环绕球的缩放X值，默认比例1.0。缩放将会使得环绕球看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体缩放 Y
 * @parent --3d效果--
 * @desc 环绕球的缩放Y值，默认比例1.0。缩放将会使得环绕球看起来旋转具有一定的3d效果。
 * @default 1.0
 * 
 * @param 整体斜切 X
 * @parent --3d效果--
 * @desc 环绕球的斜切X值，默认比例0.0。斜切将会使得环绕球看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 整体斜切 Y
 * @parent --3d效果--
 * @desc 环绕球的斜切Y值，默认比例0.0。斜切将会使得环绕球看起来旋转具有一定角度。
 * @default 0.0
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ASu（Animation_Surround）
//		临时全局变量	DrillUp.g_ASu_xxx
//		临时局部变量	this._drill_ASu_xxx
//		存储数据变量	$gameSystem._drill_ASu_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)
//		性能测试因素	物体管理层
//		性能测试消耗	13.82ms、8.83ms（Game_Timer.prototype.update）
//		最坏情况		大量动画被同时播放。
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			动画环绕球：
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
//			* Drill_ASu_Sprite	【动画环绕球贴图】
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
//			1.插件详细原理说明见 Drill_AnimationCircle 。	
//			2.与 MOG_BattleHud 和 Drill_BattleCamera 有关联，用于定位第一人称下的动画位置。
//			3.在circle的基础上添加了环绕球播放功能，保留了3d效果。
//
//		★存在的问题：
//			暂无
//
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationSurround = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationSurround');
	
	//==============================
	// * 变量获取 - 环绕球样式
	//				（~struct~ASuStyle）
	//==============================
	DrillUp.drill_ASu_styleInit = function( dataFrom ){
		var data = {};
		data['anim'] = Number( dataFrom["绑定的动画"] || 0);
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		
		if( dataFrom["资源-环绕球"] != "" &&
			dataFrom["资源-环绕球"] != undefined ){
			data['src_img_gif'] = JSON.parse( dataFrom["资源-环绕球"] );
		}else{
			data['src_img_gif'] = [];
		}
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['x'] = Number( dataFrom["平移-环绕球 X"] || 0);
		data['y'] = Number( dataFrom["平移-环绕球 Y"] || 0);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['rotate'] = Number( dataFrom["自旋转速度"] || 0) /180*Math.PI;
		data['anim_index'] = String( dataFrom["动画层级"] || "在动画后面");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		data['a'] = Number( dataFrom["长轴长度"] || 100);
		data['b'] = Number( dataFrom["短轴长度"] || 20);
		data['surroundSpeed'] = Number( dataFrom["环绕速度"] || 3.0);
		data['startAngle'] = Number( dataFrom["起始角度"] || 0);
		
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
	
	/*-----------------环绕球样式------------------*/
	DrillUp.g_ASu_style_length = 200;
	DrillUp.g_ASu_style = [];
	for (var i = 0; i < DrillUp.g_ASu_style_length; i++) {
		if( DrillUp.parameters['环绕球样式-' + String(i+1) ] != undefined &&
			DrillUp.parameters['环绕球样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['环绕球样式-' + String(i+1) ]);
			DrillUp.g_ASu_style[i] = DrillUp.drill_ASu_styleInit( data );
			DrillUp.g_ASu_style[i]['id'] = i+1;
			DrillUp.g_ASu_style[i]['inited'] = true;
		}else{
			DrillUp.g_ASu_style[i] = DrillUp.drill_ASu_styleInit( {} );
			DrillUp.g_ASu_style[i]['id'] = i+1;
			DrillUp.g_ASu_style[i]['inited'] = false;
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
var _drill_ASu_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ASu_pluginCommand.call(this, command, args);
	if( command === ">动画环绕球" ){
		
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
					if( $gameMap.drill_ASu_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_ASu_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_ASu_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_ASu_isEventExist( e_id ) == false ){ return; }
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
				$gameSystem._drill_ASu_visible[ Number(style_str)-1 ] = true;
			}
			if( type === "隐藏" ){
				$gameSystem._drill_ASu_visible[ Number(style_str)-1 ] = false;
			}
			
			var sprite_list = [];
			if( style_str == "所有样式" ){
				sprite_list = $gameTemp.drill_ASu_getAllSpriteList();
			}else{
				sprite_list = $gameTemp.drill_ASu_getSpriteList( Number(style_str) );
			}
			
			if( type === "立即显示" ){
				$gameTemp.drill_ASu_setAnimVisible( sprite_list, true );
			}
			if( type === "立即隐藏" ){
				$gameTemp.drill_ASu_setAnimVisible( sprite_list, false );
			}
			if( type === "立即出现" ){
				$gameTemp.drill_ASu_setAnimBirth( sprite_list );
			}
			if( type === "立即消失" ){
				$gameTemp.drill_ASu_setAnimDeath( sprite_list );
			}
		}
		
		/*-----------------执行变化 - 样式+角色条件------------------*/
		if( style_str != null && args.length == 6){
			var type = String(args[5]);
			
			var sprite_list = [];
			if( style_str == "所有样式" ){
				if( char_list != null ){
					for( var i=0; i < char_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ASu_getAllSpriteList_Character(char_list[i]) );
					}
				}else if( actor_list != null ){
					for( var i=0; i < actor_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ASu_getAllSpriteList_Actor(actor_list[i]) );
					}
				}else if( enemy_list != null ){
					for( var i=0; i < enemy_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ASu_getAllSpriteList_Enemy(enemy_list[i]) );
					}
				}
			}else{
				if( char_list != null ){
					for( var i=0; i < char_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ASu_getSpriteList_Character( Number(style_str), char_list[i]) );
					}
				}else if( actor_list != null ){
					for( var i=0; i < actor_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ASu_getSpriteList_Actor( Number(style_str), actor_list[i]) );
					}
				}else if( enemy_list != null ){
					for( var i=0; i < enemy_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_ASu_getSpriteList_Enemy( Number(style_str), enemy_list[i]) );
					}
				}
			}
			
			if( type === "立即显示" ){
				$gameTemp.drill_ASu_setAnimVisible( sprite_list, true );
			}
			if( type === "立即隐藏" ){
				$gameTemp.drill_ASu_setAnimVisible( sprite_list, false );
			}
			if( type === "立即出现" ){
				$gameTemp.drill_ASu_setAnimBirth( sprite_list );
			}
			if( type === "立即消失" ){
				$gameTemp.drill_ASu_setAnimDeath( sprite_list );
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ASu_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_AnimationSurround.js 动画 - 多层动画环绕球】\n" +
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
var _drill_ASu_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ASu_sys_initialize.call(this);
	
	this._drill_ASu_visible = [];
	for(var i = 0; i < DrillUp.g_ASu_style.length ;i++){
		var data = DrillUp.g_ASu_style[i];
		if( data['inited'] == false ){ continue; }
		this._drill_ASu_visible[i] = data['visible'];
	}
};	

//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_ASu_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}

//=============================================================================
// * 动画环绕球 容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_ASu_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_ASu_temp_initialize.call(this);
	
	this._drill_ASu_spriteTank = [];			//当前播放中的样式
	this._drill_ASu_lastAdded = [];				//上一次添加的 贴图
}
//==============================
// * 容器 - 获取贴图（接口）
//==============================
Game_Temp.prototype.drill_ASu_getSpriteList = function( style_id ){
	var result = [];
	for(var i = 0; i < this._drill_ASu_spriteTank.length; i++){
		var temp_sprite = this._drill_ASu_spriteTank[i];
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
Game_Temp.prototype.drill_ASu_getSpriteList_Enemy = function( style_id, enemy_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ASu_spriteTank.length; i++){
		var temp_sprite = this._drill_ASu_spriteTank[i];
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
Game_Temp.prototype.drill_ASu_getSpriteList_Actor = function( style_id, actor_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ASu_spriteTank.length; i++){
		var temp_sprite = this._drill_ASu_spriteTank[i];
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
Game_Temp.prototype.drill_ASu_getSpriteList_Character = function( style_id, character_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ASu_spriteTank.length; i++){
		var temp_sprite = this._drill_ASu_spriteTank[i];
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
Game_Temp.prototype.drill_ASu_getAllSpriteList = function(){
	return this._drill_ASu_spriteTank;
}
//==============================
// * 容器 - 获取全部贴图 - 根据敌人对象（接口）
//==============================
Game_Temp.prototype.drill_ASu_getAllSpriteList_Enemy = function( enemy_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ASu_spriteTank.length; i++){
		var temp_sprite = this._drill_ASu_spriteTank[i];
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
Game_Temp.prototype.drill_ASu_getAllSpriteList_Actor = function( actor_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ASu_spriteTank.length; i++){
		var temp_sprite = this._drill_ASu_spriteTank[i];
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
Game_Temp.prototype.drill_ASu_getAllSpriteList_Character = function( character_obj ){
	var result = [];
	for(var i = 0; i < this._drill_ASu_spriteTank.length; i++){
		var temp_sprite = this._drill_ASu_spriteTank[i];
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
Game_Temp.prototype.drill_ASu_selectSpriteByAnimId = function( sprite_list, anim_id ){
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
Game_Temp.prototype.drill_ASu_setAnimVisible = function( sprite_list, v ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		temp_sprite.visible = v;
	}
}
//==============================
// * 容器操作 - 设置贴图立即出现（接口）
//==============================
Game_Temp.prototype.drill_ASu_setAnimBirth = function( sprite_list ){
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
Game_Temp.prototype.drill_ASu_setAnimDeath = function( sprite_list ){
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
var _drill_ASu_timer_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function( sceneActive ){
    _drill_ASu_timer_update.call( this, sceneActive );
	for(var i = $gameTemp._drill_ASu_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_ASu_spriteTank[i];
		if( temp_sprite == null ){
			$gameTemp._drill_ASu_spriteTank.splice(i,1);
		}else if( temp_sprite.drill_isDead() ){
			if( temp_sprite.parent != null ){
				temp_sprite.parent.removeChild( temp_sprite );
			}
			$gameTemp._drill_ASu_spriteTank.splice(i,1);
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
DrillUp.drill_ASu_getAncestor = function( sprite, ancestor_class ){
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
var _drill_ASu_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
	_drill_ASu_initMembers.call(this);
	this._drill_duration = 0;			//最大持续时间
}
//==============================
// * 动画 - 判断是否含装饰
//==============================
Sprite_Animation.prototype.drill_ASu_hasStyleBinding = function( anim_id ){
	for( var i = 0; i < DrillUp.g_ASu_style.length; i++ ){
		var anim_data = DrillUp.g_ASu_style[i];
		if( anim_data['anim'] == anim_id ){
			return true;
		}
	}
	return false;
}
//==============================
// * 动画 - 设置
//==============================
var _drill_ASu_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	
	// > 原函数
    _drill_ASu_setup.call(this,target, animation, mirror, delay);
	
	var has_binding = this.drill_ASu_hasStyleBinding( animation.id );
	if( has_binding ){
		
		// > 层级 - 动画前面层
		if( !this._drill_animUpArea ){
			this._drill_animUpArea = new Sprite();
			this.addChild(this._drill_animUpArea);
		}
		
		// > 添加动画贴图
		$gameTemp._drill_ASu_lastAdded = [];
		for( var i = 0; i < DrillUp.g_ASu_style.length; i++ ){
			var anim_data = DrillUp.g_ASu_style[i];
			if( this._animation.id == anim_data['anim'] ){
				
				var temp_sprite = new Drill_ASu_Sprite( this._animation, anim_data );
				$gameTemp._drill_ASu_spriteTank.push( temp_sprite );
				$gameTemp._drill_ASu_lastAdded.push( temp_sprite );
				temp_sprite._drill_parent_AnimSprite = this;	//（绑定动画贴图，转半圈还要回来）
				
				this._drill_duration =  Math.max(this._drill_duration, Math.max( temp_sprite._drill_time_all + 1 , this._duration));
			}
		}
	}
	
	// 连接-> （动画 - 绑定对象）
};
//==============================
// * 动画 - 绑定对象
//==============================
var _drill_ASu_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    _drill_ASu_startAnimation.call(this,animation, mirror, delay);
	
	// <-承接 （动画 - 设置）
	//	（前面的函数执行完后，会进入到该函数继续）
	
	this.drill_ASu_foreignKeyBinding();		//外键标记
	
	$gameTemp._drill_ASu_lastAdded = [];		//清空上一次添加的标记
}
//==============================
// * 动画 - 外键标记
//==============================
Sprite_Base.prototype.drill_ASu_foreignKeyBinding = function(){
	if( $gameTemp._drill_ASu_lastAdded.length == 0 ){ return; }
	
	// > 敌人贴图（战斗界面）
	if( this instanceof Sprite_Enemy ){
		for(var i=0; i < $gameTemp._drill_ASu_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_ASu_lastAdded[i];
			sprite._drill_bindingSprite = this;
			sprite._drill_parent_enemyObj = this._enemy;
		}
	}
	
	// > 角色贴图（战斗界面）
	if( this instanceof Sprite_Actor ){
		for(var i=0; i < $gameTemp._drill_ASu_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_ASu_lastAdded[i];
			sprite._drill_bindingSprite = this;
			sprite._drill_parent_actorObj = this._actor;
		}
	}
	
	// > 物体贴图（地图界面）
	if( this instanceof Sprite_Character && $gameTemp.drill_ASu_isReflectionSprite(this) == false ){
		for(var i=0; i < $gameTemp._drill_ASu_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_ASu_lastAdded[i];
			sprite._drill_bindingSprite = this;
			sprite._drill_parent_characterObj = this._character;
		}
	}
}

//=============================================================================
// ** 层级变换
//=============================================================================
/*
//==============================
// * 父贴图后面层 - 层级转移
//==============================
Sprite_Base.prototype.drill_ASu_charBackPuting = function(){
	
	_drill_cur_layer
	
	// > 敌人贴图（战斗界面）
	if( this instanceof Sprite_Enemy ){
		this.drill_ASu_addToPBackArea( PBack_list, Scene_Battle );
	}
	
	// > 角色贴图（战斗界面）
	if( this instanceof Sprite_Actor ){
		
		// > SV模式
		if( $gameSystem.isSideView() ){
			this.drill_ASu_addToPBackArea( PBack_list, Scene_Battle );
		}
		
		// > 第一人称+使用了mog角色窗口
		if( !$gameSystem.isSideView() && Imported.MOG_BattleHud ){
			this.drill_ASu_addToPBackArea( PBack_list, Scene_Battle );
		}
	}
	
	// > 物体贴图（地图界面）
	if( this instanceof Sprite_Character && $gameTemp.drill_ASu_isReflectionSprite(this) == false ){
		this.drill_ASu_addToPBackArea( PBack_list, Scene_Map );
	}
};
//==============================
// * 父贴图后面层 - 添加到层
//==============================
Sprite_Base.prototype.drill_ASu_addToPBackArea = function( sprite_list, scene_class ){
	var scene = DrillUp.drill_ASu_getAncestor( this, scene_class );
	if( scene == null ){ return; }
		
	for(var i = sprite_list.length-1; i >= 0; i--){					//（转移操作会改变children数组的长度）
		var sprite = sprite_list[i];
		scene._spriteset._drill_animPBackArea.addChild( sprite );	//（重复addChild会被移走）
	}
	
	// > 层级排序（父贴图后面层）
	scene._spriteset._drill_animPBackArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};*/
//==============================
// * 图层基类 - 帧刷新
//==============================
var _drill_ASu_sp_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {
	_drill_ASu_sp_update.call(this);
	
	if( this._drill_animPBackArea == undefined ){ return; }
	
	// > 动画前面层 - 监听
	for(var i = 0; i < $gameTemp._drill_ASu_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_ASu_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var anim_sprite = temp_sprite._drill_parent_AnimSprite;
		if( temp_sprite._drill_cur_layer == "动画前面层" &&
			anim_sprite._drill_animUpArea.children.contains( temp_sprite ) == false ){
			
			anim_sprite._drill_animUpArea.addChild( temp_sprite );

			// > 动画前面层 - 层级排序
			anim_sprite._drill_animUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
		}
	}
	
	// > 父贴图后面层 - 监听
	var animPBackArea_changed = false;
	for(var i = 0; i < $gameTemp._drill_ASu_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_ASu_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._drill_cur_layer == "父贴图后面层" &&
			this._drill_animPBackArea.children.contains( temp_sprite ) == false ){
			
			this._drill_animPBackArea.addChild( temp_sprite );
			animPBackArea_changed = true;
		}
	}
	// > 父贴图后面层 - 层级排序
	if( animPBackArea_changed == true ){
		this._drill_animPBackArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	}
};

//==============================
// * 父贴图后面层 - 战斗界面 层定义
//==============================
var _drill_ASu_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    
	if( !this._drill_animPBackArea ){		//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_animPBackArea);
	}
	
	_drill_ASu_createEnemies.call(this);	
}
//==============================
// * 父贴图后面层 - 地图界面 层定义
//==============================
var _drill_ASu_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( !this._drill_animPBackArea ){		//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0.75;		//（在中层上面，事件后面）
		this._tilemap.addChild(this._drill_animPBackArea);
	}
	
	_drill_ASu_createCharacters.call(this);
};


//==============================
// * 动画 - 播放中
//==============================
var _drill_ASu_isPlaying = Sprite_Animation.prototype.isPlaying;
Sprite_Animation.prototype.isPlaying = function() {
    if( this._drill_duration > 0 ){
		return true;
	}
	return _drill_ASu_isPlaying.call(this);
};
//==============================
// * 动画 - 帧刷新
//==============================
var _drill_ASu_update = Sprite_Animation.prototype.update;
Sprite_Animation.prototype.update = function() {
	this._drill_duration_decreased = false;		//减一锁，确保多次继承后，减一后，不会继续执行减一方法。
	_drill_ASu_update.call(this);
	if(this._drill_duration_decreased == false){
		this._drill_duration--;
		this._drill_duration_decreased = true;
	}
};
//==============================
// * 动画 - 移除自身（空指针优化）
//==============================
var _drill_ASu_remove = Sprite_Animation.prototype.remove;
Sprite_Animation.prototype.remove = function() {
	if( this._target != undefined ){
		_drill_ASu_remove.call(this);
	}else{
		if( this.parent ){
			this.parent.removeChild(this);
		}
	}
};


//=============================================================================
// ** 动画环绕球贴图【Drill_ASu_Sprite】
//
// 			代码：	> 范围 - 该类显示单独的动画装饰。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
//					> 数量 - [单个/ ●多个] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 由于动画存放在temp的容器中，销毁仍然需要外部来控制。
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 动画环绕球贴图 - 定义
//==============================
function Drill_ASu_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_ASu_Sprite.prototype = Object.create(Sprite.prototype);
Drill_ASu_Sprite.prototype.constructor = Drill_ASu_Sprite;
//==============================
// * 动画环绕球贴图 - 初始化
//==============================
Drill_ASu_Sprite.prototype.initialize = function( animation, settings ){
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
	this.visible = $gameSystem._drill_ASu_visible[this._drill_data['id']-1];
	this._drill_GIF_time = 0;					//GIF - 播放时间
	this._drill_data['src_bitmaps'] = [];		//GIF - 资源
	this._drill_surround_time = 0;				//环绕球 - 旋转时间
	this._drill_cur_layer = "动画前面层";		//环绕球 - 当前所在层
	
	// > 外键数据
	this._drill_bindingSprite = null;			//父贴图对象（需跨层级跟随sprite的xy位置）
	this._drill_parent_AnimSprite = null;		//绑定的 动画贴图
	this._drill_parent_enemyObj = null;			//绑定的 战斗界面中的 敌人
	this._drill_parent_actorObj = null;			//绑定的 战斗界面中的 角色
	this._drill_parent_characterObj = null;		//绑定的 地图界面中的 物体
	
	this.drill_createGIF();				//创建 - 环绕球	
};
//==============================
// * 创建 - 环绕球
//==============================
Drill_ASu_Sprite.prototype.drill_createGIF = function() {
	
	// > GIF资源对象组
	for(var j = 0; j < this._drill_data['src_img_gif'].length ; j++){
		this._drill_data['src_bitmaps'].push(ImageManager.load_SpecialAnim(this._drill_data['src_img_gif'][j]));
	}
			
	// > GIF贴图
	var temp_sprite_bitmap = new Sprite();
	temp_sprite_bitmap.anchor.x = 0.5;
	temp_sprite_bitmap.anchor.y = 0.5;
	temp_sprite_bitmap.bitmap = this._drill_data['src_bitmaps'][0];
	
	// > GIF层
	var temp_sprite = new Sprite();		//GIF两层容器
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.scale.x = this._drill_data['scale_x'];
	temp_sprite.scale.y = this._drill_data['scale_y'];
	temp_sprite.skew.x = this._drill_data['skew_x'];
	temp_sprite.skew.y = this._drill_data['skew_y'];
	
	this._drill_GIF = temp_sprite;
	this._drill_GIF_bitmap = temp_sprite_bitmap;
	temp_sprite.addChild(temp_sprite_bitmap);
	this.addChild(temp_sprite);
}
//==============================
// * 动画环绕球贴图 - 帧刷新
//==============================
Drill_ASu_Sprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updatePosition();	//帧刷新 - 位置
	this.drill_updateStep();		//帧刷新 - 阶段
	this.drill_updateGIF();			//帧刷新 - GIF
	this.drill_updateBirthing();	//帧刷新 - 出现阶段
	this.drill_updateDying();		//帧刷新 - 消失阶段
}
//==============================
// * 帧刷新 - 位置
//==============================
Drill_ASu_Sprite.prototype.drill_updatePosition = function() {
	this._drill_surround_time += 1;
	
	// > 层级变化
	var time = this._drill_surround_time * this._drill_data['surroundSpeed'] + this._drill_data['startAngle'];
	if( time > 0 ){
		if( time % 360 < 180 ){
			this._drill_cur_layer = "动画前面层";
		}else{
			this._drill_cur_layer = "父贴图后面层";
		}
	}else{
		if( time % 360 < -180 ){
			this._drill_cur_layer = "动画前面层";
		}else{
			this._drill_cur_layer = "父贴图后面层";
		}
	}
	
	
	// > 椭圆极坐标公式（实际效果的速度不均匀）
	//var aa = 100;
	//var bb = 30;
	//var theta = this._drill_surround_time*3 /180*Math.PI;
	//var a_t = Math.cos( theta )*Math.cos( theta )/aa/aa;
	//var b_t = Math.sin( theta )*Math.sin( theta )/bb/bb;
	//var r = Math.sqrt( 1/(a_t + b_t) );
	//var xx = r*Math.cos( theta );
	//var yy = r*Math.sin( theta );
	
	// > 圆极坐标公式（先圆，后坐标按比例压缩）
	var aa = this._drill_data['a'];
	var bb = this._drill_data['b'];
	var theta = time /180*Math.PI;
	var max_r = Math.max( aa, bb );
	var min_r = Math.min( aa, bb );
	var xx = max_r*Math.cos( theta );
	var yy = max_r*Math.sin( theta );
	if( aa > bb ){
		yy = yy * min_r / max_r;
	}else{
		xx = xx * min_r / max_r;
	}
	
	// > 位置平移
	xx += this._drill_data['x'];
	yy += this._drill_data['y'];
	
	// > 位置修正 - 动画前面层
	if( this._drill_cur_layer == "动画前面层" ){
		//（无操作）
	}
	
	// > 位置修正 - 父贴图后面层
	if( this._drill_cur_layer == "父贴图后面层" ){
		xx = xx + this._drill_parent_AnimSprite.x;	//（直接保持与动画位置一致）
		yy = yy + this._drill_parent_AnimSprite.y;
	
		// > 敌人位置修正（无操作）
		
		// > 角色位置修正
		if( this._drill_bindingSprite instanceof Sprite_Actor ){
			// > 第一人称位置修正（战斗镜头）
			if( Imported.Drill_BattleCamera && !$gameSystem.isSideView() ){
				xx -= $gameTemp._drill_cam_pos[0];
				yy -= $gameTemp._drill_cam_pos[1];
			}
		}
		
		// > 物体位置修正（无操作）
	}
	
	this.x = xx;
	this.y = yy;
	
	// > 自旋转
	this._drill_GIF_bitmap.rotation += this._drill_data['rotate'];
}
//==============================
// * 帧刷新 - 阶段
//==============================
Drill_ASu_Sprite.prototype.drill_updateStep = function() {
	
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
Drill_ASu_Sprite.prototype.drill_initBirthState = function() {
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
Drill_ASu_Sprite.prototype.drill_initDeathState = function() {
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
Drill_ASu_Sprite.prototype.drill_isDead = function(){
	return this._drill_cur_time > this._drill_time_all;
}
//==============================
// * 阶段 - 获取当前阶段
//==============================
Drill_ASu_Sprite.prototype.drill_getState = function(){
	return this._drill_cur_state;
}
//==============================
// * 阶段 - 设置当前阶段
//
//			说明：	注意，由于 透明度和缩放 变化并不是固定公式，而是增量值。
//					因此 阶段切换 时不会出现贴图突然变化情况，但代价是变化情况不可控。
//==============================
Drill_ASu_Sprite.prototype.drill_setState = function( state ){
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
// * 帧刷新 - GIF
//==============================
Drill_ASu_Sprite.prototype.drill_updateGIF = function() {
	
	this._drill_GIF_time += 1;		//gif播放
	var inter = this._drill_GIF_time ;
	inter = inter / this._drill_data['interval'];
	inter = inter % this._drill_data['src_bitmaps'].length;
	if(this._drill_data['back_run']){
		inter = this._drill_data['src_bitmaps'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	this._drill_GIF_bitmap.bitmap = this._drill_data['src_bitmaps'][inter];
}
//==============================
// * 帧刷新 - 出现阶段
//==============================
Drill_ASu_Sprite.prototype.drill_updateBirthing = function() {
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
Drill_ASu_Sprite.prototype.drill_updateDying = function() {
	if( this._drill_cur_state != "消失" ){ return; }
	
	// > 透明度
	this.opacity -= ( this.sustain_opacity - this.end_opacity )/this._drill_time_death;
	
	// > 缩放
	this.drill_scaleX_move_to(this, this.end_scale_x, Math.abs(this.sustain_scale_x-this.end_scale_x)/this._drill_time_death);
	this.drill_scaleY_move_to(this, this.end_scale_y, Math.abs(this.sustain_scale_y-this.end_scale_y)/this._drill_time_death);
}

//==============================
// * 动画环绕球贴图 - 缩放控制
//==============================
Drill_ASu_Sprite.prototype.drill_scaleX_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.x - s;
	if( ds < 0 ){ sprite.scale.x += speed; }
	if( ds > 0 ){ sprite.scale.x -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.x = s; }
}
Drill_ASu_Sprite.prototype.drill_scaleY_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.y - s;
	if( ds < 0 ){ sprite.scale.y += speed; }
	if( ds > 0 ){ sprite.scale.y -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.y = s; }
}

