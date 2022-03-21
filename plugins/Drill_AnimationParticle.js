//=============================================================================
// Drill_AnimationParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        动画 - 多层动画粒子
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子样式-%d"
 * @Drill_LE_parentKey "---粒子样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_APa_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_AnimationParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以添加粒子，绑定在一个指定的动画上面。播放动画时能出现粒子。
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面，战斗界面。
 *   作用于动画，伴随动画一起出现。
 * 2.更多详细的组合方法，去看看 "17.主菜单 > 多层组合装饰（对象装饰）.docx"。
 * 3.更多详细的设置效果，去看看 "12.动画 > 关于魔法效果与并行动画.docx"。
 * 细节：
 *   (1.动画粒子是一个具有持续时间的效果，分为 出现、持续、消失 三阶段。
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
 * 资源路径：img/Special__anim （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__anim文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 粒子样式-1 资源-粒子
 * 粒子样式-2 资源-粒子
 * 粒子样式-3 资源-粒子
 * ……
 * 
 * 你可以在同一个动画里面加入非常多的不同种类的样式，并且持续时间可以非常长。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制动画粒子样式的显示情况：
 * 
 * 插件指令：>动画粒子 : 样式[2] : 显示
 * 插件指令：>动画粒子 : 样式[2] : 隐藏
 *
 * 1.如果样式被隐藏，则新动画不会显示该样式，但正在播放的不会变。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 只样式条件
 * 你可以通过插件指令对播放中的动画粒子样式进行设置：
 * 
 * 插件指令：>动画粒子 : 播放中的样式[2] : 立即显示
 * 插件指令：>动画粒子 : 播放中的样式[2] : 立即隐藏
 * 插件指令：>动画粒子 : 播放中的样式[2] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 立即消失
 *
 * 1."立即显示/隐藏"可以使得正在播放的样式瞬间显示/隐藏。
 *   "立即出现"可以使得播放的动画立刻跳过 出现状态。
 *   "立即消失"可以使得播放的动画立刻进入 消失状态。
 * 2.具体使用方法，可以去物体管理层西北角的"中断蓄力动画"看看。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 样式条件和地图物体
 * 你可以通过插件指令对播放中的动画粒子样式进行设置：
 * 
 * 插件指令：>动画粒子 : 所有样式 : 本事件 : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 本事件 : 立即出现
 * 
 * 插件指令：>动画粒子 : 播放中的样式[2] : 玩家 : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 本事件 : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 事件[10] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 事件变量[21] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 批量事件[10,11] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 批量事件变量[21,22] : 立即出现
 * 
 * 插件指令：>动画粒子 : 播放中的样式[2] : 本事件 : 立即显示
 * 插件指令：>动画粒子 : 播放中的样式[2] : 本事件 : 立即隐藏
 * 插件指令：>动画粒子 : 播放中的样式[2] : 本事件 : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 本事件 : 立即消失
 * 
 * 1.前半部分（所有样式）中间部分（本事件）和 后半部分（立即出现）
 *   的参数可以随意组合。一共有2*6*4种组合方式。
 * 2.通过插件指令可以直接控制到地图界面中一个具体事件的一个具体粒子。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 样式条件和战斗单位
 * 你可以通过插件指令对播放中的动画粒子样式进行设置：
 * 
 * 插件指令：>动画粒子 : 所有样式 : 敌方[2] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 敌方[2] : 立即出现
 * 
 * 插件指令：>动画粒子 : 播放中的样式[2] : 敌方[2] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 敌方全体 : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 敌方变量[21] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 我方[2] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 我方全体 : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 我方变量[21] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 战斗敌人[5] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 战斗敌人变量[21] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 战斗角色[5] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 战斗角色变量[21] : 立即出现
 * 
 * 插件指令：>动画粒子 : 播放中的样式[2] : 敌方[2] : 立即显示
 * 插件指令：>动画粒子 : 播放中的样式[2] : 敌方[2] : 立即隐藏
 * 插件指令：>动画粒子 : 播放中的样式[2] : 敌方[2] : 立即出现
 * 插件指令：>动画粒子 : 播放中的样式[2] : 敌方[2] : 立即消失
 * 
 * 1.前半部分（所有样式）中间部分（敌方[2]）和 后半部分（立即出现）
 *   的参数可以随意组合。一共有2*10*4种组合方式。
 * 2.通过插件指令可以直接控制到战斗界面中一个具体单位的一个具体粒子。
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
 * 测试结果：   200个事件的地图中，平均消耗为：【26.25ms】
 *              100个事件的地图中，平均消耗为：【21.48ms】
 *               50个事件的地图中，平均消耗为：【18.87ms】
 * 测试方法2：  在战斗界面中播放4个含动画粒子的动画。
 * 测试结果2：  战斗界面平均消耗为：【16.57ms】
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
 * 可以使得粒子样式设置在图像的后面。优化了插件扩展关系。
 * [v1.2]
 * 修改了内部结构。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 添加了最大值编辑的支持。
 * [v1.5]
 * 大幅度修改加强了插件的内部结构。
 * [v1.6]
 * 加强了粒子效果的配置。
 * [v1.7]
 * 修复了动画位置为画面时，父贴图后面层仍然跟随施法者移动的bug。
 * [v1.8]
 * 修复了动画删除时出错的bug。
 *
 *
 * @param ---粒子样式组 1至20---
 * @default
 *
 * @param 粒子样式-1
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-2
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-3
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-4
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-5
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-6
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-7
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-8
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-9
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-10
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-11
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-12
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-13
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-14
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-15
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-16
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-17
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-18
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-19
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-20
 * @parent ---粒子样式组 1至20---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组21至40---
 * @default
 *
 * @param 粒子样式-21
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-22
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-23
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-24
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-25
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-26
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-27
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-28
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-29
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-30
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-31
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-32
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-33
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-34
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-35
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-36
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-37
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-38
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-39
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-40
 * @parent ---粒子样式组21至40---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组41至60---
 * @default
 *
 * @param 粒子样式-41
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-42
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-43
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-44
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-45
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-46
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-47
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-48
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-49
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-50
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-51
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-52
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-53
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-54
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-55
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-56
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-57
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-58
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-59
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-60
 * @parent ---粒子样式组41至60---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组61至80---
 * @default
 *
 * @param 粒子样式-61
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-62
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-63
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-64
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-65
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-66
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-67
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-68
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-69
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-70
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-71
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-72
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-73
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-74
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-75
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-76
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-77
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-78
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-79
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-80
 * @parent ---粒子样式组61至80---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组81至100---
 * @default
 *
 * @param 粒子样式-81
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-82
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-83
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-84
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-85
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-86
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-87
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-88
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-89
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-90
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-91
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-92
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-93
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-94
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-95
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-96
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-97
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-98
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-99
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-100
 * @parent ---粒子样式组81至100---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组101至120---
 * @default
 *
 * @param 粒子样式-101
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-102
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-103
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-104
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-105
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-106
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-107
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-108
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-109
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-110
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-111
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-112
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-113
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-114
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-115
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-116
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-117
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-118
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-119
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-120
 * @parent ---粒子样式组101至120---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组121至140---
 * @default
 *
 * @param 粒子样式-121
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-122
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-123
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-124
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-125
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-126
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-127
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-128
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-129
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-130
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-131
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-132
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-133
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-134
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-135
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-136
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-137
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-138
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-139
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-140
 * @parent ---粒子样式组121至140---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组141至160---
 * @default
 *
 * @param 粒子样式-141
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-142
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-143
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-144
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-145
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-146
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-147
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-148
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-149
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-150
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-151
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-152
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-153
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-154
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-155
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-156
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-157
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-158
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-159
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-160
 * @parent ---粒子样式组141至160---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组161至180---
 * @default
 *
 * @param 粒子样式-161
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-162
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-163
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-164
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-165
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-166
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-167
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-168
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-169
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-170
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-171
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-172
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-173
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-174
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-175
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-176
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-177
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-178
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-179
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-180
 * @parent ---粒子样式组161至180---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组181至200---
 * @default
 *
 * @param 粒子样式-181
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-182
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-183
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-184
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-185
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-186
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-187
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-188
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-189
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-190
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-191
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-192
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-193
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-194
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-195
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-196
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-197
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-198
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-199
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-200
 * @parent ---粒子样式组181至200---
 * @type struct<APaStyle>
 * @desc 动画粒子样式的详细配置信息。
 * @default 
 */
/*~struct~APaStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的动画粒子样式==
 * 
 * @param ---绑定---
 * @desc 
 *
 * @param 绑定的动画
 * @parent ---绑定---
 * @type animation
 * @desc 指定动画的id，粒子样式将会与动画相互绑定。
 * @default 0
 * 
 * @param ---贴图---
 * @desc 
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
 * @default 动画粒子-默认
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 * @param 平移-粒子 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-粒子 Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
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
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"混合模式.docx"。
 * @default 0
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
 * @desc 粒子样式所属的动画层级。父贴图后面是指：战斗时，敌人/玩家贴图的后面，地图中，事件贴图的后面。
 * @default 在动画后面
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个动画，并且在同一动画层级下，先后排序的位置，0表示最后面。
 * @default 4
 * 
 * @param ---动画过程---
 * @desc 
 *
 * @param 出现延迟
 * @parent ---动画过程---
 * @type number
 * @min 0
 * @desc 粒子样式将延迟一段时间显现，单位帧。
 * @default 0
 *
 * @param 出现时长
 * @parent ---动画过程---
 * @type number
 * @min 0
 * @desc 粒子样式显现的时间，单位帧。
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
 * @desc 粒子样式显现的模式方法。
 * @default 横向显现
 *
 * @param 持续时长
 * @parent ---动画过程---
 * @type number
 * @min 0
 * @desc 粒子样式持续的时间，单位帧。
 * @default 220
 *
 * @param 消失时长
 * @parent ---动画过程---
 * @type number
 * @min 0
 * @desc 粒子样式显现的延迟时间。
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
 * @desc 粒子样式消失的模式方法。
 * @default 普通淡出消失
 * 
 * 
 * @param ---粒子效果---
 * @desc 
 * 
 * @param 粒子数量
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 出现的粒子数量。
 * @default 15
 *
 * @param 粒子生命周期
 * @parent ---粒子效果---
 * @type number
 * @min 5
 * @desc 一个粒子从显现到消失的周期时长，单位帧。(1秒60帧)
 * @default 45
 *
 * @param 粒子自旋转速度
 * @parent ---粒子效果---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 10.0
 *
 * @param 粒子出现范围
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 以动画中心为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。
 * @default 40
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
 * @option 方向聚焦于粒子固定点
 * @value 方向聚焦于粒子固定点
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
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
 * @default 2.5
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
 * @default 粒子-默认粒子
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 * @param 第二层粒子动画层级
 * @parent ---双层效果---
 * @type select
 * @option 在父贴图后面
 * @value 在父贴图后面
 * @option 在动画后面
 * @value 在动画后面
 * @option 在动画前面
 * @value 在动画前面
 * @desc 第二层粒子所属的动画层级。父贴图后面是指：战斗时，敌人/玩家贴图的后面，地图中，事件贴图的后面。
 * @default 在动画后面
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 3
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		APa (Animation_Particle)
//		临时全局变量	DrillUp.g_APa_style_xxx
//		临时局部变量	this._drill_APa_xxx
//		存储数据变量	$gameSystem._drill_APa_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^3)*o(贴图处理) 每帧
//		性能测试因素	物体管理层、战斗界面
//		性能测试消耗	2.51ms、7.57ms（update）13.87ms（drill_updateParticle）
//		最坏情况		大量动画被同时播放。
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			动画粒子：
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
//			* Drill_APa_Sprite		【动画粒子贴图】
//			* Drill_APa_SecSprite	【动画粒子贴图（第二层）】
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
//
//		★存在的问题：
//			1.目前所有粒子样式的配置以及方法都没有统一化。（不解决，保留粒子的零散配置）
//			2. 2021-1-8 第二层粒子的配置与第一层粒子坐标一样，但是实际播放好像差了1帧，不明原因。
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationParticle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationParticle');
	
	//==============================
	// * 变量获取 - 粒子样式
	//				（~struct~APaStyle）
	//==============================
	DrillUp.drill_APa_styleInit = function( dataFrom ){
		var data = {};
		
		// > 绑定
		data['anim'] = Number( dataFrom["绑定的动画"] || 0);
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['anim_index'] = String( dataFrom["动画层级"] || "在动画后面");
		data['zIndex'] = Number( dataFrom["图片层级"] || 4);
		
		// > 动画过程
		data['delay'] = Number( dataFrom["出现延迟"] || 0);
		data['birth'] = Number( dataFrom["出现时长"] || 20);
		data['birthMode'] = String( dataFrom["出现模式"] || "横向展开");
		data['sustain'] = Number( dataFrom["持续时长"] || 120);
		data['death'] = Number( dataFrom["消失时长"] || 20);
		data['deathMode'] = String( dataFrom["消失模式"] || "普通淡出消失");
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 15);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_selfRotate'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		data['par_birthRange'] = Number( dataFrom["粒子出现范围"] || 40);
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_animIndex'] = String( dataFrom["第二层粒子动画层级"] || "在动画后面");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 3);
		
		return data;
	}
	
	/*-----------------粒子样式------------------*/
	DrillUp.g_APa_style_length = 200;
	DrillUp.g_APa_style = [];
	for (var i = 0; i < DrillUp.g_APa_style_length; i++) {
		if( DrillUp.parameters['粒子样式-' + String(i+1) ] != undefined && 
			DrillUp.parameters['粒子样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['粒子样式-' + String(i+1) ]);
			DrillUp.g_APa_style[i] = DrillUp.drill_APa_styleInit( data );
			DrillUp.g_APa_style[i]['id'] = i+1;
			DrillUp.g_APa_style[i]['inited'] = true;
		}else{
			DrillUp.g_APa_style[i] = DrillUp.drill_APa_styleInit( {} );
			DrillUp.g_APa_style[i]['id'] = i+1;
			DrillUp.g_APa_style[i]['inited'] = false;
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
var _drill_APa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_APa_pluginCommand.call(this, command, args);
	if( command === ">动画粒子" ){
		
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
					if( $gameMap.drill_APa_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_APa_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_APa_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_APa_isEventExist( e_id ) == false ){ return; }
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
				$gameSystem._drill_APa_visible[ Number(style_str)-1 ] = true;
			}
			if( type === "隐藏" ){
				$gameSystem._drill_APa_visible[ Number(style_str)-1 ] = false;
			}
			
			var sprite_list = [];
			if( style_str == "所有样式" ){
				sprite_list = $gameTemp.drill_APa_getAllSpriteList();
			}else{
				sprite_list = $gameTemp.drill_APa_getSpriteList( Number(style_str) );
			}
			
			if( type === "立即显示" ){
				$gameTemp.drill_APa_setAnimVisible( sprite_list, true );
			}
			if( type === "立即隐藏" ){
				$gameTemp.drill_APa_setAnimVisible( sprite_list, false );
			}
			if( type === "立即出现" ){
				$gameTemp.drill_APa_setAnimBirth( sprite_list );
			}
			if( type === "立即消失" ){
				$gameTemp.drill_APa_setAnimDeath( sprite_list );
			}
		}
		
		/*-----------------执行变化 - 样式+角色条件------------------*/
		if( style_str != null && args.length == 6){
			var type = String(args[5]);
			
			var sprite_list = [];
			if( style_str == "所有样式" ){
				if( char_list != null ){
					for( var i=0; i < char_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_APa_getAllSpriteList_Character(char_list[i]) );
					}
				}else if( actor_list != null ){
					for( var i=0; i < actor_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_APa_getAllSpriteList_Actor(actor_list[i]) );
					}
				}else if( enemy_list != null ){
					for( var i=0; i < enemy_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_APa_getAllSpriteList_Enemy(enemy_list[i]) );
					}
				}
			}else{
				if( char_list != null ){
					for( var i=0; i < char_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_APa_getSpriteList_Character( Number(style_str), char_list[i]) );
					}
				}else if( actor_list != null ){
					for( var i=0; i < actor_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_APa_getSpriteList_Actor( Number(style_str), actor_list[i]) );
					}
				}else if( enemy_list != null ){
					for( var i=0; i < enemy_list.length; i++ ){
						sprite_list = sprite_list.concat( $gameTemp.drill_APa_getSpriteList_Enemy( Number(style_str), enemy_list[i]) );
					}
				}
			}
			
			if( type === "立即显示" ){
				$gameTemp.drill_APa_setAnimVisible( sprite_list, true );
			}
			if( type === "立即隐藏" ){
				$gameTemp.drill_APa_setAnimVisible( sprite_list, false );
			}
			if( type === "立即出现" ){
				$gameTemp.drill_APa_setAnimBirth( sprite_list );
			}
			if( type === "立即消失" ){
				$gameTemp.drill_APa_setAnimDeath( sprite_list );
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_APa_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_AnimationParticle.js 动画 - 多层动画粒子】\n" +
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
var _drill_APa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_APa_sys_initialize.call(this);
	
	this._drill_APa_visible = [];
	for(var i = 0; i < DrillUp.g_APa_style.length ;i++){
		var data = DrillUp.g_APa_style[i];
		if( data['inited'] == false ){ continue; }
		this._drill_APa_visible[i] = data['visible'];
	}
};	

//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_APa_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}

//=============================================================================
// * 动画粒子 容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_APa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_APa_temp_initialize.call(this);
	
	this._drill_APa_spriteTank = [];			//当前播放中的样式
	this._drill_APa_lastAdded = [];				//上一次添加的 粒子贴图
	this._drill_APa_lastAdded_PBack = [];		//上一次添加在父贴图后面的 粒子贴图
}
//==============================
// * 容器 - 获取贴图（接口）
//==============================
Game_Temp.prototype.drill_APa_getSpriteList = function( style_id ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
Game_Temp.prototype.drill_APa_getSpriteList_Enemy = function( style_id, enemy_obj ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
Game_Temp.prototype.drill_APa_getSpriteList_Actor = function( style_id, actor_obj ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
Game_Temp.prototype.drill_APa_getSpriteList_Character = function( style_id, character_obj ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
Game_Temp.prototype.drill_APa_getAllSpriteList = function(){
	return this._drill_APa_spriteTank;
}
//==============================
// * 容器 - 获取全部贴图 - 根据敌人对象（接口）
//==============================
Game_Temp.prototype.drill_APa_getAllSpriteList_Enemy = function( enemy_obj ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
Game_Temp.prototype.drill_APa_getAllSpriteList_Actor = function( actor_obj ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
Game_Temp.prototype.drill_APa_getAllSpriteList_Character = function( character_obj ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
Game_Temp.prototype.drill_APa_selectSpriteByAnimId = function( sprite_list, anim_id ){
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
Game_Temp.prototype.drill_APa_setAnimVisible = function( sprite_list, v ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		temp_sprite.visible = v;
	}
}
//==============================
// * 容器操作 - 设置贴图立即出现（接口）
//==============================
Game_Temp.prototype.drill_APa_setAnimBirth = function( sprite_list ){
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
Game_Temp.prototype.drill_APa_setAnimDeath = function( sprite_list ){
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
var _drill_APa_timer_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function( sceneActive ){
    _drill_APa_timer_update.call( this, sceneActive );
	for(var i = $gameTemp._drill_APa_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_APa_spriteTank[i];
		if( temp_sprite == null ){
			$gameTemp._drill_APa_spriteTank.splice(i,1);
		}else if( temp_sprite.drill_isDead() ){
			if( temp_sprite.parent != null ){
				temp_sprite.parent.removeChild( temp_sprite );
			}
			$gameTemp._drill_APa_spriteTank.splice(i,1);
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
DrillUp.drill_APa_getAncestor = function( sprite, ancestor_class ){
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
var _drill_APa_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
	_drill_APa_initMembers.call(this);
	this._drill_duration = 0;			//最大持续时间
}
//==============================
// * 动画 - 判断是否含装饰
//==============================
Sprite_Animation.prototype.drill_APa_hasStyleBinding = function( anim_id ){
	for( var i = 0; i < DrillUp.g_APa_style.length; i++ ){
		var anim_data = DrillUp.g_APa_style[i];
		if( anim_data['anim'] == anim_id ){
			return true;
		}
	}
	return false;
}
//==============================
// * 动画 - 设置
//==============================
var _drill_APa_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	
	var has_binding = this.drill_APa_hasStyleBinding( animation.id );
	if( has_binding ){
		
		// > 层级 - 父贴图后面层（预置，后续在父类中重置取出）
		if( !this._drill_APa_tempArea ){	
			this._drill_APa_tempArea = new Sprite();
			this.addChild(this._drill_APa_tempArea);
		}
		// > 层级 - 动画后面层
		if( !this._drill_animDownArea ){
			this._drill_animDownArea = new Sprite();
			this.addChild(this._drill_animDownArea);
		}
	}
	
	// > 原函数
    _drill_APa_setup.call(this,target, animation, mirror, delay);
	
	if( has_binding ){
		
		// > 层级 - 动画前面层
		if( !this._drill_animUpArea ){
			this._drill_animUpArea = new Sprite();
			this.addChild(this._drill_animUpArea);
		}
		
		// > 添加动画贴图
		$gameTemp._drill_APa_lastAdded = [];
		$gameTemp._drill_APa_lastAdded_PBack = [];
		for( var i = 0; i < DrillUp.g_APa_style.length; i++ ){
			var anim_data = DrillUp.g_APa_style[i];
			if( this._animation.id == anim_data['anim'] ){
				
				// > 创建动画贴图
				var temp_sprite = new Drill_APa_Sprite( this._animation, anim_data );
				$gameTemp._drill_APa_spriteTank.push( temp_sprite );
				$gameTemp._drill_APa_lastAdded.push( temp_sprite );
				
				// > 绑定层级
				if( anim_data['anim_index'] == "在动画前面" ){
					this._drill_animUpArea.addChild( temp_sprite );
				}else if( anim_data['anim_index'] == "在动画后面" ){
					this._drill_animDownArea.addChild( temp_sprite );
				}else if( anim_data['anim_index'] == "在父贴图后面" ){
					this._drill_APa_tempArea.addChild( temp_sprite );
					$gameTemp._drill_APa_lastAdded_PBack.push( temp_sprite );
				}
				
				// > 双层效果
				if( anim_data['second_enable'] == true ){
					
					// > 双层效果 - 创建动画贴图
					var temp_secSprite = new Drill_APa_SecSprite( temp_sprite );
					$gameTemp._drill_APa_spriteTank.push( temp_sprite );
					
					// > 双层效果 - 绑定层级
					if( anim_data['second_animIndex'] == "在动画前面" ){
						this._drill_animUpArea.addChild( temp_secSprite );
					}else if( anim_data['second_animIndex'] == "在动画后面" ){
						this._drill_animDownArea.addChild( temp_secSprite );
					}else if( anim_data['second_animIndex'] == "在父贴图后面" ){
						this._drill_APa_tempArea.addChild( temp_secSprite );
						$gameTemp._drill_APa_lastAdded_PBack.push( temp_secSprite );
					}
				}
				
				this._drill_duration =  Math.max(this._drill_duration, Math.max( temp_sprite._drill_time_all + 1 , this._duration));
			}
		}
		this.drill_APa_sortByZIndex();
		//alert(JSON.stringify(this._animation));
	}
	
	// 连接-> （动画 - 绑定对象）
};
//==============================
// * 动画 - 绑定对象
//==============================
var _drill_APa_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    _drill_APa_startAnimation.call(this,animation, mirror, delay);
	
	// <-承接 （动画 - 设置）
	//	（前面的函数执行完后，会进入到该函数继续）
	
	this.drill_APa_foreignKeyBinding();		//外键标记
	this.drill_APa_charBackPuting();		//父贴图后面层 的 层级转移
	
	$gameTemp._drill_APa_lastAdded = [];		//清空上一次添加的标记
	$gameTemp._drill_APa_lastAdded_PBack = [];	//
}
//==============================
// * 动画 - 外键标记
//==============================
Sprite_Base.prototype.drill_APa_foreignKeyBinding = function(){
	if( $gameTemp._drill_APa_lastAdded.length == 0 ){ return; }
	
	// > 敌人贴图（战斗界面）
	if( this instanceof Sprite_Enemy ){
		for(var i=0; i < $gameTemp._drill_APa_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_APa_lastAdded[i];
			sprite._drill_bindingSprite = this;
			sprite._drill_parent_enemyObj = this._enemy;
		}
	}
	
	// > 角色贴图（战斗界面）
	if( this instanceof Sprite_Actor ){
		for(var i=0; i < $gameTemp._drill_APa_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_APa_lastAdded[i];
			sprite._drill_bindingSprite = this;
			sprite._drill_parent_actorObj = this._actor;
		}
	}
	
	// > 物体贴图（地图界面）
	if( this instanceof Sprite_Character && $gameTemp.drill_APa_isReflectionSprite(this) == false ){
		for(var i=0; i < $gameTemp._drill_APa_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_APa_lastAdded[i];
			sprite._drill_bindingSprite = this;
			sprite._drill_parent_characterObj = this._character;
		}
	}
}
//==============================
// * 父贴图后面层 - 层级转移
//==============================
Sprite_Base.prototype.drill_APa_charBackPuting = function(){
	if( $gameTemp._drill_APa_lastAdded_PBack.length == 0 ){ return; }
	var PBack_list = $gameTemp._drill_APa_lastAdded_PBack;
	
	// > 敌人贴图（战斗界面）
	if( this instanceof Sprite_Enemy ){
		this.drill_APa_addToPBackArea( PBack_list, Scene_Battle );
	}
	
	// > 角色贴图（战斗界面）
	if( this instanceof Sprite_Actor ){
		
		// > SV模式
		if( $gameSystem.isSideView() ){
			this.drill_APa_addToPBackArea( PBack_list, Scene_Battle );
		}
		
		// > 第一人称+使用了mog角色窗口
		if( !$gameSystem.isSideView() && Imported.MOG_BattleHud ){
			this.drill_APa_addToPBackArea( PBack_list, Scene_Battle );
		}
	}
	
	// > 物体贴图（地图界面）
	if( this instanceof Sprite_Character && $gameTemp.drill_APa_isReflectionSprite(this) == false ){
		this.drill_APa_addToPBackArea( PBack_list, Scene_Map );
	}
};
//==============================
// * 父贴图后面层 - 添加到层
//==============================
Sprite_Base.prototype.drill_APa_addToPBackArea = function( sprite_list, scene_class ){
	var scene = DrillUp.drill_APa_getAncestor( this, scene_class );
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
var _drill_APa_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    
	if( !this._drill_animPBackArea ){		//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_animPBackArea);
	}
	
	_drill_APa_createEnemies.call(this);	
};
//==============================
// * 父贴图后面层 - 地图界面 层定义
//==============================
var _drill_APa_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( !this._drill_animPBackArea ){		//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0.75;		//（在中层上面，事件后面）
		this._tilemap.addChild(this._drill_animPBackArea);
	}
	
	_drill_APa_createCharacters.call(this);
};
//==============================
// * 动画 - 层级排序（不含 父贴图后面层）
//==============================
Sprite_Animation.prototype.drill_APa_sortByZIndex = function() {
   this._drill_animDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._drill_animUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};


//==============================
// * 动画 - 播放中
//==============================
var _drill_APa_isPlaying = Sprite_Animation.prototype.isPlaying;
Sprite_Animation.prototype.isPlaying = function() {
    if( this._drill_duration > 0 ){
		return true;
	}
	return _drill_APa_isPlaying.call(this);
};
//==============================
// * 动画 - 帧刷新
//==============================
var _drill_APa_update = Sprite_Animation.prototype.update;
Sprite_Animation.prototype.update = function() {
	this._drill_duration_decreased = false;		//减一锁，确保多次继承后，减一后，不会继续执行减一方法。
	_drill_APa_update.call(this);
	if(this._drill_duration_decreased == false){
		this._drill_duration--;
		this._drill_duration_decreased = true;
	}
};
//==============================
// * 动画 - 移除（空指针优化）
//==============================
var _drill_APa_remove = Sprite_Animation.prototype.remove;
Sprite_Animation.prototype.remove = function() {
	if( this._target != undefined ){
		_drill_APa_remove.call(this);
	}else{
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
};


//=============================================================================
// ** 动画粒子贴图【Drill_APa_Sprite】
//
// 			代码：	> 范围 - 该类显示单独的动画装饰。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
//					> 数量 - [单个/ ●多个] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 由于动画存放在temp的容器中，销毁仍然需要外部来控制。
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 动画粒子贴图 - 定义
//==============================
function Drill_APa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_APa_Sprite.prototype = Object.create(Sprite.prototype);
Drill_APa_Sprite.prototype.constructor = Drill_APa_Sprite;
//==============================
// * 动画粒子贴图 - 初始化
//==============================
Drill_APa_Sprite.prototype.initialize = function( animation, settings ){
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
	this.visible = $gameSystem._drill_APa_visible[this._drill_data['id']-1];
	this._drill_APa_particleTankOrg = [];		//粒子贴图容器
	this._drill_APa_particleDataTank = [];		//粒子数据容器
	
	// > 外键数据
	this._drill_is_charBack = false;			//是否 在父贴图后面
	this._drill_bindingSprite = null;			//父贴图对象（需跨层级跟随sprite的xy位置）
	this._drill_parent_enemyObj = null;			//绑定的 战斗界面中的 敌人
	this._drill_parent_actorObj = null;			//绑定的 战斗界面中的 角色
	this._drill_parent_characterObj = null;		//绑定的 地图界面中的 物体
	
	this.drill_createParticle();		//创建 - 粒子	
};

//==============================
// * 粒子 - 创建
//==============================
Drill_APa_Sprite.prototype.drill_createParticle = function() {
	
	// > 粒子集合
	for( var j = 0; j < this._drill_data['par_count'] ; j++ ){	
		var temp_sprite_data = JSON.parse(JSON.stringify( this._drill_data ));	//深拷贝数据（杜绝引用造成的修改）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = ImageManager.load_SpecialAnim(temp_sprite_data['src_img']);
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.blendMode = temp_sprite_data['blendMode'];
		temp_sprite.opacity = 0;
		
		this._drill_APa_particleTankOrg.push(temp_sprite);
		this._drill_APa_particleDataTank.push(temp_sprite_data);
		this.addChild(temp_sprite);
		
		// > 粒子初始化
		this.drill_APa_resetParticles(this._drill_APa_particleDataTank.length-1);
		temp_sprite['_time'] = Math.floor( temp_sprite_data['par_life'] * Math.random() );
	}
}
//==============================
// * 粒子 - 帧刷新
//==============================
Drill_APa_Sprite.prototype.drill_updateParticle = function() {
	
	// > 粒子贴图
	for(var i = 0; i < this._drill_APa_particleTankOrg.length; i++ ){
		var spr = this._drill_APa_particleTankOrg[i];
		var data = this._drill_APa_particleDataTank[i];
		spr['_time'] += 1;
		
		// > 位置
		var xx = 0;
		var yy = 0;
		xx += data['start_x'];
		yy += data['start_y'];
		xx += spr['_time'] * data['cur_speed'] * Math.cos( data['start_dir'] );
		yy += spr['_time'] * data['cur_speed'] * Math.sin( data['start_dir'] );
		spr.x = xx;
		spr.y = yy;
		
		// > 透明度
		var index = spr['_time'];
		if( index >= data['_drill_COBa_opacity'].length ){
			index = data['_drill_COBa_opacity'].length -1;
		}
		spr.opacity = data['_drill_COBa_opacity'][index];
		
		// > 自旋转
		spr.rotation += data['par_selfRotate'] /180*Math.PI;
		
		// > 过界刷新
    	if( this.drill_APa_needResetParticles(i) ){
			this.drill_APa_resetParticles(i);
		};
	};
}

//==============================
// * 粒子 - 重设条件
//==============================	
Drill_APa_Sprite.prototype.drill_APa_needResetParticles = function( i ){
	var spr = this._drill_APa_particleTankOrg[i];
	var data = this._drill_APa_particleDataTank[i];
	
	// > 生命周期结束
	if( spr['_time'] > data['par_life'] ){ return true; }
	
	return false;
};

//==============================
// * 粒子 - 重设起始点
//==============================	
Drill_APa_Sprite.prototype.drill_APa_resetParticles = function( i ){
	var spr = this._drill_APa_particleTankOrg[i];
	var data = this._drill_APa_particleDataTank[i];
	var ww = Math.max( spr.width, 100 );
	var hh = Math.max( spr.height, 100 );
	
	spr['_time'] = 0;
	spr.rotation = 2*Math.PI*Math.random();
	
	// > 粒子出现模式（固定范围）
	data['start_x'] = data['par_birthRange'] * Math.cos( 2*Math.PI*Math.random() );
	data['start_y'] = data['par_birthRange'] * Math.sin( 2*Math.PI*Math.random() );
	
	// > 粒子方向模式
	if( data['par_dirMode'] == "固定方向" ){
		data['start_dir'] = data['par_dirFix'];
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	if( data['par_dirMode'] == "四周扩散(随机)" || data['par_dirMode'] == "四周扩散" ){
		data['start_dir'] = 360 * Math.random();
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	if( data['par_dirMode'] == "扇形范围方向(随机)" ){
		data['start_dir'] = data['par_dirSectorFace'] + (Math.random() - 0.5) * data['par_dirSectorDegree'];
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	if( data['par_dirMode'] == "方向聚焦于粒子固定点" ){
		data['start_dir'] = this.drill_APa_getPointToPointDegree( data['start_x'],data['start_y'], data['par_birthX'],data['par_birthY'] );
		data['start_dir'] = data['start_dir'] /180*Math.PI;
	}
	
	// > 粒子速度模式
	if( data['par_speedMode'] == "只初速度" ){
		data['cur_speed'] = data['par_speedBase'];
	}
	if( data['par_speedMode'] == "初速度+波动量" ){
		data['cur_speed'] = data['par_speedBase'] + (Math.random() - 0.5) * data['par_speedRandom'];
	}
	
	// > 粒子透明度模式
	if( data['par_opacityMode'] == "逐渐消失" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "先显现后消失(慢速)" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':45,'o':255} );
		data['anchorPointTank'].push( {'t':55,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "先显现后消失" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':25,'o':255} );
		data['anchorPointTank'].push( {'t':75,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "先显现后消失(快速)" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':10,'o':255} );
		data['anchorPointTank'].push( {'t':90,'o':255} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	if( data['par_opacityMode'] == "保持原透明度" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':100,'o':255} );
	}
	if( data['par_opacityMode'] == "一闪一闪" ){
		data['anchorPointTank'] = [];
		data['anchorPointTank'].push( {'t':0,'o':0} );
		data['anchorPointTank'].push( {'t':30,'o':125} );
		data['anchorPointTank'].push( {'t':35,'o':255} );
		data['anchorPointTank'].push( {'t':40,'o':125} );
		data['anchorPointTank'].push( {'t':45,'o':255} );
		data['anchorPointTank'].push( {'t':50,'o':125} );
		data['anchorPointTank'].push( {'t':70,'o':125} );
		data['anchorPointTank'].push( {'t':75,'o':255} );
		data['anchorPointTank'].push( {'t':80,'o':125} );
		data['anchorPointTank'].push( {'t':85,'o':255} );
		data['anchorPointTank'].push( {'t':90,'o':125} );
		data['anchorPointTank'].push( {'t':100,'o':0} );
	}
	
	// > 粒子透明度模式（复刻至"弹道核心 - 时间锚点公式"）
	data['_drill_COBa_opacity'] = [ 0 ];
	if( data['anchorPointTank'] != undefined ){
		data['_drill_COBa_opacity'] = [];
		
		// > 起点值
		data['_drill_COBa_opacity'].push( 0 );
		
		// > 时间锚点初始化
		if( data['anchorPointTank'].length < 2 ){	//（至少要两个点才能计算）
			data['anchorPointTank'] = [];
			data['anchorPointTank'].push( {'t':0,'o':0} );
			data['anchorPointTank'].push( {'t':100,'o':255} );
		}
		
		// > 开始找点（这里默认 data['anchorPointTank'] 已根据 t 排序 ）
		for(var time = 1; time <= data['par_life']; time++){
			var time_per = time * 100 / data['par_life'];	//（时间百分比） 
			
			// > 找到百分比的落脚点
			var start_index = 0;
			var end_index = 0;
			for( var i = 0; i < data['anchorPointTank'].length; i++ ){
				var p = data['anchorPointTank'][i];
				if( time_per < p['t'] ){
					start_index = i-1;
					end_index = i;
					break;
				}
			}
			
			// > 直接找到末尾点
			if( end_index == 0 ){
				data['_drill_COBa_opacity'].push( data['anchorPointTank'][ data['anchorPointTank'].length-1 ]['o'] );
				continue;
			}
			// > 开头点都没接触到
			if( start_index == -1 ){
				data['_drill_COBa_opacity'].push( data['anchorPointTank'][0]['o'] );
				continue;
			}
			
			// > 计算通用落点
			var p_start = data['anchorPointTank'][start_index];
			var p_end = data['anchorPointTank'][end_index];
			var d_time = p_end['t'] - p_start['t'];
			var cur_time = time_per - p_start['t'];
			var cc = cur_time / d_time * ( p_end['o'] - p_start['o'] ) + p_start['o'];
			data['_drill_COBa_opacity'].push( cc );
		}
	}
	
	// > 粒子缩放模式
	if( data['par_scaleMode'] == "固定缩放值" ){
		spr.scale.x = data['par_scaleBase'];
		spr.scale.y = data['par_scaleBase'];
	}
	if( data['par_scaleMode'] == "缩放值+波动量" ){
		spr.scale.x = data['par_scaleBase'] + (Math.random() - 0.5) * data['par_scaleRandom'];
		spr.scale.y = data['par_scaleBase'] + (Math.random() - 0.5) * data['par_scaleRandom'];
	}
	
};
//==============================
// * 数学 - 计算点A朝向点B的角度
//
//			说明：	0度朝右，90度朝下，180度朝左，270度朝上。
//					返回的值永远保持在 0 至 360 之间。
//==============================
Drill_APa_Sprite.prototype.drill_APa_getPointToPointDegree = function( x1,y1,x2,y2 ){
	var degree = 0;
	if( x2 == x1 ){		// arctan不能为0情况
		if( y2 > y1 ){
			degree = 90;
		}else{
			degree = 270;
		}
	}else if( y2 == y1 ){
		if( x2 > x1 ){
			degree = 0;
		}else{
			degree = 180;
		}
	}else{	// arctan正常计算
		degree = Math.atan( (y2 - y1)/(x2 - x1) );		//朝向自机的角度
		degree = degree / Math.PI * 180;
		if( x2 < x1 ){
			degree += 180;
		}
	}
	
	// > 修正值
	degree = degree % 360;
	if( degree < 0 ){ degree += 360; }
	
	return degree;
};

//==============================
// * 动画粒子贴图 - 帧刷新
//==============================
Drill_APa_Sprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updatePosition();	//帧刷新 - 位置
	this.drill_updateStep();		//帧刷新 - 阶段
	this.drill_updateParticle();	//帧刷新 - 粒子
	this.drill_updateBirthing();	//帧刷新 - 出现阶段
	this.drill_updateDying();		//帧刷新 - 消失阶段
}
//==============================
// * 帧刷新 - 位置
//==============================
Drill_APa_Sprite.prototype.drill_updatePosition = function() {
	
	// > 父贴图后面层
	if( this._drill_is_charBack == true ){
		
		// > 类型为 画面 情况时
		if( this._animation.position == 3 ){
			this.x = this._drill_data['x'] + Graphics.boxWidth *0.5;
			this.y = this._drill_data['y'] + Graphics.boxHeight*0.5;
		
		// > 一般类型的情况
		}else{
			var _sprite = this._drill_bindingSprite;
			var xx = 0;
			var yy = 0;
			xx = this._drill_data['x'] + _sprite.x;
			yy = this._drill_data['y'] + _sprite.y;
			
			// > 敌人位置修正
			if( _sprite instanceof Sprite_Enemy ){
				yy -= _sprite.width/2;
			}
			// > 角色位置修正
			if( _sprite instanceof Sprite_Actor ){
				// > 第一人称位置修正（战斗镜头）
				if( Imported.Drill_BattleCamera && !$gameSystem.isSideView() ){
					xx -= $gameTemp._drill_cam_pos[0];
					yy -= $gameTemp._drill_cam_pos[1];
				}
			}
			// > 物体位置修正
			if( _sprite instanceof Sprite_Character ){
				yy -= 24;
			}
			
			this.x = Math.round( xx );
			this.y = Math.round( yy );
		}
	}
}
//==============================
// * 帧刷新 - 阶段
//==============================
Drill_APa_Sprite.prototype.drill_updateStep = function() {
	
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
Drill_APa_Sprite.prototype.drill_initBirthState = function() {
	this.start_scale_x = 1;
	this.start_scale_y = 1;
	this.start_opacity = 0;
	if(this._drill_data['birthMode'] == "横向显现"){
		this.scale.y = 0;
		this.opacity = 0;
		this.start_scale_y = 0;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "纵向显现"){
		this.scale.x = 0;
		this.opacity = 0;
		this.start_scale_x = 0;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "放大显现"){
		this.scale.x = 0;
		this.scale.y = 0;
		this.opacity = 0;
		this.start_scale_x = 0;
		this.start_scale_y = 0;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "缩小显现"){
		this.scale.x = 2;
		this.scale.y = 2;
		this.opacity = 0;
		this.start_scale_x = 2;
		this.start_scale_y = 2;
		this.start_opacity = 0;
	}else if(this._drill_data['birthMode'] == "普通淡入显现"){
		this.opacity = 0;
		this.start_opacity = 0;
	}
}
//==============================
// * 阶段 - 初始化 消失状态
//==============================
Drill_APa_Sprite.prototype.drill_initDeathState = function() {
	this.tar_scale_x = 1;
	this.tar_scale_y = 1;
	this.tar_opacity = 255;
	if(this._drill_data['deathMode'] == "横向消失"){
		this.tar_scale_y = 0;
		this.tar_opacity = 0;
	}else if(this._drill_data['deathMode'] == "纵向消失"){
		this.tar_scale_x = 0;
		this.tar_opacity = 0;
	}else if(this._drill_data['deathMode'] == "放大消失"){
		this.tar_scale_x = 2;
		this.tar_scale_y = 2;
		this.tar_opacity = 0;
	}else if(this._drill_data['deathMode'] == "缩小消失"){
		this.tar_scale_x = 0;
		this.tar_scale_y = 0;
		this.tar_opacity = 0;
	}else if(this._drill_data['deathMode'] == "普通淡出消失"){
		this.tar_opacity = 0;
	}
}
//==============================
// * 阶段 - 判断销毁
//==============================
Drill_APa_Sprite.prototype.drill_isDead = function(){
	return this._drill_cur_time > this._drill_time_all;
}
//==============================
// * 阶段 - 获取当前阶段
//==============================
Drill_APa_Sprite.prototype.drill_getState = function(){
	return this._drill_cur_state;
}
//==============================
// * 阶段 - 设置当前阶段
//
//			说明：	注意，由于 透明度和缩放 变化并不是固定公式，而是增量值。
//					因此 阶段切换 时不会出现贴图突然变化情况，但代价是变化情况不可控。
//==============================
Drill_APa_Sprite.prototype.drill_setState = function( state ){
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
// * 阶段 - 出现阶段帧刷新
//==============================
Drill_APa_Sprite.prototype.drill_updateBirthing = function() {
	if( this._drill_cur_state != "出现" ){ return; }
	
	// > 透明度
	this.opacity += ( 255 - this.start_opacity )/this._drill_time_birth;
	
	// > 缩放
	this.drill_scaleX_move_to(this, 1, Math.abs(this.start_scale_x -1)/this._drill_time_birth);
	this.drill_scaleY_move_to(this, 1, Math.abs(this.start_scale_y -1)/this._drill_time_birth);
}
//==============================
// * 阶段 - 消失阶段帧刷新
//==============================
Drill_APa_Sprite.prototype.drill_updateDying = function() {
	if( this._drill_cur_state != "消失" ){ return; }
	
	// > 透明度
	this.opacity -= ( 255 - this.tar_opacity )/this._drill_time_death;
	
	// > 缩放
	this.drill_scaleX_move_to(this, this.tar_scale_x, Math.abs(1-this.tar_scale_x)/this._drill_time_death);
	this.drill_scaleY_move_to(this, this.tar_scale_y, Math.abs(1-this.tar_scale_y)/this._drill_time_death);
}
//==============================
// * 动画粒子贴图 - 缩放控制
//==============================
Drill_APa_Sprite.prototype.drill_scaleX_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.x - s;
	if( ds < 0 ){ sprite.scale.x += speed; }
	if( ds > 0 ){ sprite.scale.x -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.x = s; }
}
Drill_APa_Sprite.prototype.drill_scaleY_move_to = function(sprite,s,speed) {
	var ds = sprite.scale.y - s;
	if( ds < 0 ){ sprite.scale.y += speed; }
	if( ds > 0 ){ sprite.scale.y -= speed; }
		
	if( Math.abs(ds) <= speed ){ sprite.scale.y = s; }
}


//=============================================================================
// ** 动画粒子贴图（第二层）【Drill_APa_SecSprite】
//
//=============================================================================
//==============================
// * 第二层粒子 - 定义
//==============================
function Drill_APa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_APa_SecSprite.prototype = Object.create(Sprite.prototype);
Drill_APa_SecSprite.prototype.constructor = Drill_APa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_APa_SecSprite.prototype.initialize = function( parentSprite ){
	Sprite.prototype.initialize.call(this);
	this._drill_parentSprite = parentSprite;	//设置父类
	
	// > 私有属性初始化
	this.blendMode = this._drill_parentSprite.blendMode;
	this.zIndex = this._drill_parentSprite._drill_data['second_zIndex'];
	this.opacity = 0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = this._drill_parentSprite.visible;
	this._drill_APa_particleTankSec = [];			//粒子贴图容器
	
	// > 外键数据
	this._drill_is_charBack = false;			//是否 在父贴图后面
	
	this.drill_createParticle();		//创建 - 粒子	
}
//==============================
// * 第二层粒子 - 创建粒子
//==============================
Drill_APa_SecSprite.prototype.drill_createParticle = function() {
	var p_data = this._drill_parentSprite._drill_data;
	
	// > 粒子集合
	for( var j = 0; j < p_data['par_count'] ; j++ ){	
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = ImageManager.load_SpecialAnim(p_data['second_src_img']);
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.blendMode = this._drill_parentSprite.blendMode;
		temp_sprite.opacity = 0;
		
		this._drill_APa_particleTankSec.push(temp_sprite);
		this.addChild(temp_sprite);
	}
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_APa_SecSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updateParticle();	//帧刷新 - 粒子
}
//==============================
// * 第二层粒子 - 帧刷新粒子
//==============================
Drill_APa_SecSprite.prototype.drill_updateParticle = function(){
	
	this.x = this._drill_parentSprite.x;
	this.y = this._drill_parentSprite.y;
	this.scale.x = this._drill_parentSprite.scale.x;
	this.scale.y = this._drill_parentSprite.scale.y;
	this.opacity = this._drill_parentSprite.opacity;
	
	// > 粒子贴图
	for(var i = 0; i < this._drill_APa_particleTankSec.length; i++ ){
		var spr = this._drill_APa_particleTankSec[i];
		var org_spr = this._drill_parentSprite._drill_APa_particleTankOrg[i];
		if( org_spr == undefined ){ continue; }
		
		// > 位置
		spr.x = org_spr.x;
		spr.y = org_spr.y;
		
		// > 透明度
		spr.opacity = org_spr.opacity;
		
		// > 自旋转
		spr.rotation = org_spr.rotation;
		
	};
}
//==============================
// * 第二层粒子 - 判断销毁
//==============================
Drill_APa_SecSprite.prototype.drill_isDead = function(){
	if( this._drill_parentSprite == undefined ){ return true; }
	if( this._drill_parentSprite.drill_isDead() ){ return true; }
	return false;
}


