//=============================================================================
// Drill_AnimationParticle.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        动画 - 多层动画粒子
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
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfBallistics       系统-弹道核心★★v2.0及以上★★
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面，战斗界面。
 *   作用于动画，伴随动画一起出现。
 * 2.更多详细的组合方法，去看看 "17.主菜单 > 多层组合装饰（个体装饰）.docx"。
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
 * 插件指令：>动画粒子 : 播放中的样式[2] : 暂停
 * 插件指令：>动画粒子 : 播放中的样式[2] : 继续
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
 * 插件指令：>动画粒子 : 播放中的样式[2] : 本事件 : 暂停
 * 插件指令：>动画粒子 : 播放中的样式[2] : 本事件 : 继续
 * 
 * 1.前半部分（所有样式）中间部分（本事件）和 后半部分（立即出现）
 *   的参数可以随意组合。一共有2*6*6种组合方式。
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
 * 插件指令：>动画粒子 : 播放中的样式[2] : 敌方[2] : 暂停
 * 插件指令：>动画粒子 : 播放中的样式[2] : 敌方[2] : 继续
 * 
 * 1.前半部分（所有样式）中间部分（敌方[2]）和 后半部分（立即出现）
 *   的参数可以随意组合。一共有2*10*6种组合方式。
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
 * [v1.9]
 * 大幅度优化了插件结构，优化了装饰贴图自动销毁与动画销毁关系。
 * [v2.0]
 * 优化了旧存档的识别与兼容。
 *
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
 * @desc 指定动画的id，粒子将会与动画相互绑定。
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
 * @default (需配置)动画粒子
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
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
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
 * @desc 粒子所属的动画层级。父贴图后面是指：战斗时，敌人/玩家贴图的后面，地图中，事件贴图的后面。
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
 * @desc 环绕球将延迟一段时间显现，单位帧。
 * @default 0
 *
 * @param 出现时长
 * @parent ---动画过程---
 * @type number
 * @min 0
 * @desc 环绕球显现的时间，单位帧。
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
 * @desc 环绕球显现的模式方法。
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
 * @desc 环绕球持续的时间，单位帧。
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
 * @desc 环绕球消失的时间。
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
 * @desc 环绕球消失的模式方法。
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
 * @desc 以动画中心为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。设置0表示粒子全部集中于圆心。
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
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 四周扩散(随机)
 *
 * @param 粒子固定方向
 * @parent 粒子方向模式
 * @desc 方向模式为"固定方向"时，固定方向的角度值。0朝右，90朝下，180朝左，270朝上。
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
 * @default (需配置)第二层粒子
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
 * 
 * @param ---特殊功能---
 * @desc 
 *
 * @param 是否固定随机种子
 * @parent ---特殊功能---
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
 * @param 粒子弹道是否倒放
 * @parent ---特殊功能---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭，粒子弹道完全倒放。比如 四周扩散效果 变成 四周吸收效果。
 * @default false
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
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	物体管理层、战斗界面
//		★性能测试消耗	2.51ms、7.57ms（update）13.87ms（drill_updateChild）
//		★最坏情况		大量动画被同时播放。
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			动画粒子：
//				->动画粒子 容器
//					->获取贴图（接口）
//					->获取贴图 - 根据敌人对象（接口）
//					->获取贴图 - 根据角色对象（接口）
//					->获取贴图 - 根据物体对象（接口）
//					->获取全部控制器（接口）
//					->获取全部贴图（接口）
//					->获取全部贴图 - 根据敌人对象（接口）
//					->获取全部贴图 - 根据角色对象（接口）
//					->获取全部贴图 - 根据物体对象（接口）
//					->获取列表中指定动画的贴图
//					->设置贴图立即显示/隐藏（接口）
//					->设置贴图立即出现（接口）
//					->设置贴图立即消失（接口）
//				->插件指令
//					->立即出现
//					->立即消失
//				->个体层级
//					->添加贴图到层级【标准函数】
//					->去除贴图【标准函数】
//					->图片层级排序（界面装饰）【标准函数】
//					->图片层级排序（个体装饰）【标准函数】
//				->动画创建
//					->创建数据/创建贴图
//					->外键标记
//				->外部控制
//					->控制器刷新
//					->自动销毁
//
//				->动画粒子控制器【Drill_APa_Controller】
//				->动画粒子贴图【Drill_APa_Sprite】
//		
//		★私有类如下：
//			* Drill_APa_Controller	【动画粒子控制器】
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
//			4.留意关键字：【暂未使用】。
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
// ** 提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_APa_tipCurName = "Drill_AnimationParticle.js 动画-多层动画粒子";
	DrillUp.g_APa_tipBasePluginList = ["Drill_CoreOfBallistics.js 系统-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_APa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_APa_tipBasePluginList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_APa_tipCurName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_APa_tipBasePluginList.length; i++){
			message += "\n- ";
			message += DrillUp.g_APa_tipBasePluginList[i];
		}
		return message;
	};

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
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 资源
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/Special__anim/";
		
		// > 贴图
		data['x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['anim_index'] = String( dataFrom["动画层级"] || "在动画后面");
		data['zIndex'] = Number( dataFrom["图片层级"] || 4);
		
		// > 动画过程
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
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 15);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_selfRotate'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		data['par_birthRange'] = Number( dataFrom["粒子出现范围"] || 40);
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_animIndex'] = String( dataFrom["第二层粒子动画层级"] || "在动画后面");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 3);
		
		// > 特殊功能
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		
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
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	
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
			if( type === "暂停" ){
				$gameTemp.drill_APa_setAnimPause( sprite_list, true );
			}
			if( type === "继续" ){
				$gameTemp.drill_APa_setAnimPause( sprite_list, false );
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
			if( type === "暂停" ){
				$gameTemp.drill_APa_setAnimPause( sprite_list, true );
			}
			if( type === "继续" ){
				$gameTemp.drill_APa_setAnimPause( sprite_list, false );
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


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_APa_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_APa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_APa_sys_initialize.call(this);
	this.drill_APa_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_APa_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_APa_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_APa_saveEnabled == true ){	
		$gameSystem.drill_APa_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_APa_initSysData();
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
Game_System.prototype.drill_APa_initSysData = function() {
	this.drill_APa_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_APa_checkSysData = function() {
	this.drill_APa_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_APa_initSysData_Private = function() {
	
	this._drill_APa_visible = [];
	for(var i = 0; i < DrillUp.g_APa_style.length ;i++){
		var data = DrillUp.g_APa_style[i];
		if( data['inited'] == false ){ continue; }
		this._drill_APa_visible[i] = data['visible'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_APa_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_APa_visible == undefined ){
		this.drill_APa_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_APa_style.length; i++ ){
		var temp_data = JSON.parse(JSON.stringify( DrillUp.g_APa_style[i] ));
		
		// > 已配置（'inited'为 false 表示空数据）
		if( temp_data['inited'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_APa_visible[i] == undefined ){
				this._drill_APa_visible[i] = temp_data['visible'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
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
	
	this._drill_APa_spriteTank = [];			//当前播放中的贴图
	this._drill_APa_controllerTank = [];		//当前播放中的控制器
	this._drill_APa_lastAdded = [];				//上一次添加的 贴图
}
//==============================
// * 容器 - 获取贴图（接口）
//==============================
Game_Temp.prototype.drill_APa_getSpriteList = function( style_id ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
// * 容器 - 获取贴图 - 根据敌人对象（接口）
//==============================
Game_Temp.prototype.drill_APa_getSpriteList_Enemy = function( style_id, enemy_obj ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
// * 容器 - 获取贴图 - 根据角色对象（接口）
//==============================
Game_Temp.prototype.drill_APa_getSpriteList_Actor = function( style_id, actor_obj ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
// * 容器 - 获取贴图 - 根据物体对象（接口）
//==============================
Game_Temp.prototype.drill_APa_getSpriteList_Character = function( style_id, character_obj ){
	var result = [];
	for(var i = 0; i < this._drill_APa_spriteTank.length; i++){
		var temp_sprite = this._drill_APa_spriteTank[i];
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
// * 容器 - 获取全部控制器（接口）
//==============================
Game_Temp.prototype.drill_APa_getAllControllerList = function(){
	return this._drill_APa_controllerTank;
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
// * 容器操作 - 设置贴图 立即显示/隐藏（接口）
//==============================
Game_Temp.prototype.drill_APa_setAnimVisible = function( sprite_list, v ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		temp_controller.drill_APa_setVisible( v );
	}
}
//==============================
// * 容器操作 - 设置贴图 暂停/继续（接口）
//==============================
Game_Temp.prototype.drill_APa_setAnimPause = function( sprite_list, b ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		temp_controller.drill_APa_setPause( b );
	}
}
//==============================
// * 容器操作 - 设置贴图立即出现（接口）
//==============================
Game_Temp.prototype.drill_APa_setAnimBirth = function( sprite_list ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_APa_getState() == "延迟" ||
			temp_controller.drill_APa_getState() == "出现" ){
			temp_controller.drill_APa_setState("持续");
			temp_controller.drill_APa_setPause( false );
		}
	}
}
//==============================
// * 容器操作 - 设置贴图立即消失（接口）
//==============================
Game_Temp.prototype.drill_APa_setAnimDeath = function( sprite_list ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_APa_getState() != "消失" ){
			temp_controller.drill_APa_setState("消失");
			temp_controller.drill_APa_setPause( false );
		}
	}
}



//#############################################################################
// ** 【标准模块】个体层级
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
//					> 注意，此函数必须在 _spriteset 图层 建立之后执行。
//##############################
Game_Temp.prototype.drill_APa_layerAddSprite = function( sprite, layer_index, individual_sprite ){
    this.drill_APa_layerAddSprite_Private( sprite, layer_index, individual_sprite );
}
//##############################
// * 个体层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从父层级中移除。
//##############################
Game_Temp.prototype.drill_APa_layerRemoveSprite = function( sprite ){
	this.drill_APa_layerRemoveSprite_Private( sprite );
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
Game_Temp.prototype.drill_APa_sortByZIndex_Scene = function(){
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
Sprite_Animation.prototype.drill_APa_sortByZIndex_Individual = function(){
	this._drill_animDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});					//动画后面层
	this._drill_animUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});						//动画前面层
}
//=============================================================================
// ** 个体层级（接口实现）
//=============================================================================
//==============================
// * 个体层级 - 动画前面层/动画后面层
//==============================
var _drill_APa_layer_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	
	// > 层级 - 动画后面层
	if( !this._drill_animDownArea ){
		this._drill_animDownArea = new Sprite();
		this.addChild(this._drill_animDownArea);
	}
	
	// > 原函数
    _drill_APa_layer_setup.call(this,target, animation, mirror, delay);
	
	// > 层级 - 动画前面层
	if( !this._drill_animUpArea ){
		this._drill_animUpArea = new Sprite();
		this.addChild(this._drill_animUpArea);
	}
};
//==============================
// * 个体层级 - 父贴图后面层 - 战斗界面
//==============================
var _drill_APa_layer_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    
	if( !this._drill_animPBackArea ){			//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0;		//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_animPBackArea);
	}
	
	_drill_APa_layer_createEnemies.call(this);	
};
//==============================
// * 个体层级 - 父贴图后面层 - 地图界面
//==============================
var _drill_APa_layer_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( !this._drill_animPBackArea ){			//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0.75;		//（在中层上面，事件后面）
		this._tilemap.addChild(this._drill_animPBackArea);
	}
	
	_drill_APa_layer_createCharacters.call(this);
};
//==============================
// * 个体层级 - 添加贴图到层级（私有）
//==============================
Game_Temp.prototype.drill_APa_layerAddSprite_Private = function( sprite, layer_index, individual_sprite ){
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
Game_Temp.prototype.drill_APa_layerRemoveSprite_Private = function( sprite ){
	if( sprite == undefined ){ return; }
	
	// > 清空指针
	sprite.drill_APa_destroy();
	
	// > 断开父类
	if( sprite.parent != undefined ){
		sprite.parent.removeChild( sprite );
	}
};



//=============================================================================
// ** 动画创建
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
// * 动画创建 - 初始化
//==============================
var _drill_APa_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
	_drill_APa_initMembers.call(this);
	this._drill_duration = 0;			//最大持续时间
}
//==============================
// * 动画创建 - 创建数据/创建贴图
//==============================
var _drill_APa_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	
	// > 原函数
    _drill_APa_setup.call(this,target, animation, mirror, delay);
	
		
	// > 添加动画贴图
	$gameTemp._drill_APa_lastAdded = [];
	for( var i = 0; i < DrillUp.g_APa_style.length; i++ ){
		var anim_data = DrillUp.g_APa_style[i];
		if( this._animation.id == anim_data['anim'] ){
			
			// > 创建数据
			var temp_controller = new Drill_APa_Controller( anim_data );
			$gameTemp._drill_APa_controllerTank.push( temp_controller );
			
			// > 创建贴图
			var temp_sprite = new Drill_APa_Sprite();
			temp_sprite.drill_APa_setController( temp_controller );
			temp_sprite.drill_APa_setAnimationSprite( this );		//（绑定动画贴图，转半圈还要回来）
																	//（个体贴图后期绑定）
			temp_sprite.drill_APa_initSprite();
			$gameTemp._drill_APa_spriteTank.push( temp_sprite );
			$gameTemp._drill_APa_lastAdded.push( temp_sprite );		//（个体贴图绑定 的 临时容器）
			
			// > 添加贴图到层级
			$gameTemp.drill_APa_layerAddSprite( temp_sprite, anim_data['anim_index'], this );
			
			
			// > 双层效果
			if( anim_data['second_enable'] == true ){
				
				// > 双层效果 - 创建贴图
				var temp_secSprite = new Drill_APa_SecSprite( temp_sprite );
				$gameTemp._drill_APa_spriteTank.push( temp_secSprite );
				
				// > 双层效果 - 添加贴图到层级
				$gameTemp.drill_APa_layerAddSprite( temp_secSprite, anim_data['second_animIndex'], this );
			}
			
			// > 层级排序
			$gameTemp.drill_APa_sortByZIndex_Scene();
			this.drill_APa_sortByZIndex_Individual();
			
			// > 动画时长
			this._drill_duration =  Math.max(this._drill_duration, Math.max( 
				anim_data['delay'] + anim_data['birth'] + anim_data['sustain'] + anim_data['death'] + 1 , this._duration));
		}
	}
	
	
	// 连接-> （动画创建 - 外键标记）
};
//==============================
// * 动画创建 - 外键标记
//==============================
var _drill_APa_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    _drill_APa_startAnimation.call(this,animation, mirror, delay);
	
	// <-承接 （动画创建 - 创建数据/创建贴图）
	//	（前面的函数执行完后，会进入到该函数继续）
	
	this.drill_APa_foreignKeyBinding();			//外键标记
	$gameTemp._drill_APa_lastAdded = [];		//清空上一次添加的标记
}
//==============================
// * 动画创建 - 外键标记
//==============================
Sprite_Base.prototype.drill_APa_foreignKeyBinding = function(){
	if( $gameTemp._drill_APa_lastAdded.length == 0 ){ return; }
	
	// > 敌人贴图（战斗界面）
	if( this instanceof Sprite_Enemy ){
		for(var i=0; i < $gameTemp._drill_APa_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_APa_lastAdded[i];
			sprite.drill_APa_setIndividualSprite( this );
			sprite._drill_parent_enemyObj = this._enemy;
		}
	}
	
	// > 角色贴图（战斗界面）
	if( this instanceof Sprite_Actor ){
		for(var i=0; i < $gameTemp._drill_APa_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_APa_lastAdded[i];
			sprite.drill_APa_setIndividualSprite( this );
			sprite._drill_parent_actorObj = this._actor;
		}
	}
	
	// > 物体贴图（地图界面）
	if( this instanceof Sprite_Character && $gameTemp.drill_APa_isReflectionSprite(this) == false ){
		for(var i=0; i < $gameTemp._drill_APa_lastAdded.length; i++ ){
			var sprite = $gameTemp._drill_APa_lastAdded[i];
			sprite.drill_APa_setIndividualSprite( this );
			sprite._drill_parent_characterObj = this._character;
		}
	}
}

//=============================================================================
// ** 外部控制
//=============================================================================
//==============================
// * 外部控制 - 帧刷新 - 地图界面
//==============================
var _drill_APa_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_APa_smap_update.call(this);
	this.drill_APa_updateInScene();
}
Scene_Map.prototype.drill_APa_updateInScene = function() {
	
	
	// > 控制器刷新（需要放后面，与层级变化错开1帧）
	for(var i = 0; i < $gameTemp._drill_APa_controllerTank.length; i++){
		var temp_controller = $gameTemp._drill_APa_controllerTank[i];
		temp_controller.drill_APa_update();
	};
	
	
	// > 自动销毁 - 控制器
	for(var i = $gameTemp._drill_APa_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameTemp._drill_APa_controllerTank[i];
		if( temp_controller == undefined ||
			temp_controller.drill_APa_isDead() ){
			$gameTemp._drill_APa_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_APa_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_APa_spriteTank[i];
		
		// > 自动销毁 - 贴图本身为空
		if( temp_sprite == undefined ){
			$gameTemp._drill_APa_spriteTank.splice(i,1);
			continue;
		}
		
		// > 自动销毁 - 控制器生命周期结束
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ||
			temp_controller.drill_APa_isDead() ){
			$gameTemp.drill_APa_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_APa_spriteTank.splice(i,1);
			delete temp_sprite;
		}
	}
};
//==============================
// * 外部控制 - 帧刷新 - 战斗界面
//==============================
var _drill_APa_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_APa_sbattle_update.call(this);
	this.drill_APa_updateInScene();
}
Scene_Battle.prototype.drill_APa_updateInScene = Scene_Map.prototype.drill_APa_updateInScene;
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
// ** 动画粒子控制器【Drill_APa_Controller】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个专门控制动画粒子的数据类。
// **		子功能：	->帧刷新
// **						->显示/隐藏
// **						->暂停/继续
// **						> 平移
// **						> 旋转
// **						> 缩放
// **					->重设数据
// **						->序列号（暂未使用）
// **					->阶段
// **						->延迟/出现/持续/消失/销毁
// **		
// **		说明：	> 该类可存储在 $gameSystem 中。
// **				  但暂时没必要，因为动画贴图无法再次创建。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_APa_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_APa_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_APa_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_initData();													//初始化数据
    this.drill_initPrivateData();											//私有数据初始化
	if( data == undefined ){ data = {}; }
    this.drill_APa_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_APa_Controller.prototype.drill_APa_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this._drill_curTime += 1;			//帧刷新 - 时间流逝
	this.drill_APa_updateParData();		//帧刷新 - 粒子数据
	this.drill_APa_updatePosition();	//帧刷新 - 位置
	this.drill_APa_updateState();		//帧刷新 - 阶段
	this.drill_APa_updateCheckNaN();	//帧刷新 - 校验值
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
Drill_APa_Controller.prototype.drill_APa_resetData = function( data ){
	this.drill_APa_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】（暂未使用，采用 $gameSystem._drill_APa_visible 控制）
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_APa_Controller.prototype.drill_APa_setVisible = function( visible ){
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
Drill_APa_Controller.prototype.drill_APa_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};

//##############################
// * 阶段 - 获取当前阶段【开放函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_APa_Controller.prototype.drill_APa_getState = function(){
	return this._drill_curState;
};
//##############################
// * 阶段 - 设置当前阶段【开放函数】
//
//			参数：	> state 字符串
//			返回：	> 无
//##############################
Drill_APa_Controller.prototype.drill_APa_setState = function( state ){
	this.drill_APa_setState_Private( state );
};
//##############################
// * 阶段 - 判断阶段销毁【开放函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_APa_Controller.prototype.drill_APa_isDead = function(){
	return this._drill_curState == "销毁";
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
Drill_APa_Controller.prototype.drill_initData = function(){
	var data = this._drill_data;
	
	// > 绑定
	if( data['visible'] == undefined ){ data['visible'] = true };				//显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };					//暂停情况
	if( data['anim'] == undefined ){ data['anim'] = 0 };						//绑定的动画id
	
	// > 资源
	if( data['src_img'] == undefined ){ data['src_img'] = "" };								//资源 - 粒子
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Special__anim/" };	//资源 - 文件夹
	
	// > 贴图
	if( data['x'] == undefined ){ data['x'] = 0 };								//贴图 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };								//贴图 - 平移Y
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };				//贴图 - 混合模式
	if( data['anim_index'] == undefined ){ data['anim_index'] = "在动画后面" };	//贴图 - 动画层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };					//贴图 - 图片层级
	
	// > 动画过程
	if( data['delay'] == undefined ){ data['delay'] = 0 };						//阶段 - 出现延迟
	if( data['birth'] == undefined ){ data['birth'] = 20 };						//阶段 - 出现时长
	if( data['birthMode'] == undefined ){ data['birthMode'] = "横向显现" };		//阶段 - 出现模式
	if( data['birthScaleX'] == undefined ){ data['birthScaleX'] = 1.0 };		//阶段 - 出现-自定义缩放X
	if( data['birthScaleY'] == undefined ){ data['birthScaleY'] = 1.0 };		//阶段 - 出现-自定义缩放Y
	if( data['birthOpacity'] == undefined ){ data['birthOpacity'] = 0 };		//阶段 - 出现-自定义透明度
	if( data['sustain'] == undefined ){ data['sustain'] = 120 };				//阶段 - 持续时长
	if( data['sustainMode'] == undefined ){ data['sustainMode'] = "常规值" };	//阶段 - 持续模式
	if( data['sustainScaleX'] == undefined ){ data['sustainScaleX'] = 1.0 };	//阶段 - 持续-自定义缩放X
	if( data['sustainScaleY'] == undefined ){ data['sustainScaleY'] = 1.0 };	//阶段 - 持续-自定义缩放Y
	if( data['sustainOpacity'] == undefined ){ data['sustainOpacity'] = 0 };	//阶段 - 持续-自定义透明度
	if( data['death'] == undefined ){ data['death'] = 20 };						//阶段 - 消失时长
	if( data['deathMode'] == undefined ){ data['deathMode'] = "普通淡出消失" };	//阶段 - 消失模式
	if( data['deathScaleX'] == undefined ){ data['deathScaleX'] = 1.0 };		//阶段 - 消失-自定义缩放X
	if( data['deathScaleY'] == undefined ){ data['deathScaleY'] = 1.0 };		//阶段 - 消失-自定义缩放Y
	if( data['deathOpacity'] == undefined ){ data['deathOpacity'] = 0 };		//阶段 - 消失-自定义透明度
	
	// > 粒子效果
	if( data['par_count'] == undefined ){ data['par_count'] = 15 };							//粒子效果 - 粒子数量
	if( data['par_life'] == undefined ){ data['par_life'] = 30 };							//粒子效果 - 粒子生命周期
	if( data['par_selfRotate'] == undefined ){ data['par_selfRotate'] = 1.0 };				//粒子效果 - 粒子自旋转速度
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };				//粒子效果 - 粒子出现范围
	if( data['par_scaleMode'] == undefined ){ data['par_scaleMode'] = "固定缩放值" };		//粒子效果 - 粒子缩放模式
	if( data['par_scaleBase'] == undefined ){ data['par_scaleBase'] = 1.0 };				//粒子效果 - 粒子缩放值
	if( data['par_scaleRandom'] == undefined ){ data['par_scaleRandom'] = 0.2 };			//粒子效果 - 粒子缩放随机波动量
	
	if( data['par_dirMode'] == undefined ){ data['par_dirMode'] = "四周扩散(随机)" };		//粒子效果 - 粒子方向模式
	if( data['par_dirFix'] == undefined ){ data['par_dirFix'] = 90.0 };						//粒子效果 - 粒子固定方向
	if( data['par_dirSectorFace'] == undefined ){ data['par_dirSectorFace'] = 45.0 };		//粒子效果 - 粒子扇形朝向
	if( data['par_dirSectorDegree'] == undefined ){ data['par_dirSectorDegree'] = 30.0 };	//粒子效果 - 粒子扇形角度
	if( data['par_speedMode'] == undefined ){ data['par_speedMode'] = "只初速度" };			//粒子效果 - 粒子速度模式
	if( data['par_speedBase'] == undefined ){ data['par_speedBase'] = 0.5 };				//粒子效果 - 粒子初速度
	if( data['par_speedRandom'] == undefined ){ data['par_speedRandom'] = 2.0 };			//粒子效果 - 粒子速度随机波动量
	if( data['par_opacityMode'] == undefined ){ data['par_opacityMode'] = "先显现后消失" };	//粒子效果 - 粒子透明度模式
	
	// > 双层效果
	if( data['second_enable'] == undefined ){ data['second_enable'] = false };				//双层效果 - 是否开启双层效果
	if( data['second_src_img'] == undefined ){ data['second_src_img'] = "" };				//双层效果 - 第二层粒子资源
	if( data['second_animIndex'] == undefined ){ data['second_animIndex'] = "在动画后面" };	//双层效果 - 第二层粒子个体层级
	if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 3 };					//双层效果 - 第二层粒子图片层级
	
	// > 特殊功能
	if( data['seed_enable'] == undefined ){ data['seed_enable'] = false };					//特殊功能 - 是否固定随机种子
	if( data['seed_value'] == undefined ){ data['seed_value'] = 0.20221002 };				//特殊功能 - 固定随机种子
	if( data['par_backrun'] == undefined ){ data['par_backrun'] = false };					//特殊功能 - 粒子弹道是否倒放
}
//==============================
// * 初始化 - 私有数据初始化
//==============================
Drill_APa_Controller.prototype.drill_initPrivateData = function(){
	var data = this._drill_data;
	
	// > 阶段
	this._drill_curTime = 0;			//阶段 - 当前时间
	this._drill_curState = "延迟";		//阶段 - 当前阶段（延迟、出现、持续、消失、销毁）
	this._drill_needDestroy = false;	//阶段 - 销毁
	
	// > 阶段初始化
	this.drill_initBirthState();
	this.drill_initSustainState();
	this.drill_initDeathState();
	
	
	// > 控制器 - 贴图属性
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	this._drill_opacity = 255;
	
	
	// > 粒子群弹道 - 随机因子
	this._drill_randomFactor_speed = Math.random();
	this._drill_randomFactor_dir = Math.random();
	this._drill_randomFactor_opacity = Math.random();
	if( data['seed_enable'] == true ){
		this._drill_randomFactor_speed = data['seed_value'] %1;
		this._drill_randomFactor_dir = data['seed_value'] *41 %1;
		this._drill_randomFactor_opacity = data['seed_value'] *71 %1;
	}
	
	// > 粒子群弹道 - 粒子属性
	this._drill_parNum = data['par_count'];			//粒子数量
	this._drill_parList_x = [];						//粒子 - X
	this._drill_parList_y = [];						//粒子 - Y
	this._drill_parList_opacity = [];				//粒子 - 透明度
	this._drill_parList_rotation = [];				//粒子 - 旋转
	this._drill_parList_scaleX = [];				//粒子 - 缩放X
	this._drill_parList_scaleY = [];				//粒子 - 缩放Y
	this._drill_parList_curTime = [];				//粒子 - 当前时间
	this._drill_parList_randomIteration = [];		//粒子 - 迭代次数
	for( var i=0; i < data['par_count']; i++ ){
		this._drill_parList_x[i] = 0;
		this._drill_parList_y[i] = 0;
		this._drill_parList_opacity[i] = 0;
		this._drill_parList_rotation[i] = Math.floor( 360*this.drill_APa_curRandom(i) );		//（随机旋转角度）
		if( data['par_selfRotate'] == 0 ){ this._drill_parList_rotation[i] = 0; }
		this._drill_parList_scaleX[i] = 1.0;
		this._drill_parList_scaleY[i] = 1.0;
		this._drill_parList_curTime[i] = Math.floor( data['par_life'] *i /data['par_count'] );	//（线性的初始时间，保持粒子均匀）
		this._drill_parList_randomIteration[i] = 0;
		this.drill_APa_resetParticles( i );		//（重设）
	}
	
	// > 粒子群弹道 - 弹道数据
	this._drill_APa_ballistics_move = {};
	this._drill_APa_ballistics_opacity = {};
    this.drill_initBallisticsMove( data, data, data['par_life'] );		//弹道初始化（坐标）
    this.drill_initBallisticsOpacity( data, data['par_life'] );			//弹道初始化（透明度）
}
//==============================
// * 粒子群弹道 - 弹道初始化（坐标）
//
//			说明：	> 只存 弹道配置，不存 实际弹道。包括随机因子、随机迭代次数。
//					> 实际弹道只在贴图中进行推演并使用。
//==============================
Drill_APa_Controller.prototype.drill_initBallisticsMove = function( data, b_data, sustain ){
	
	// > 弹道初始化（坐标）
	var temp_b_move = {}
	
	//   移动（movement）
	temp_b_move['movementNum'] = this._drill_parNum;							//数量
	temp_b_move['movementTime'] = sustain;										//时长
	temp_b_move['movementDelay'] = 0;											//延迟
	temp_b_move['movementEndDelay'] = 0;										//延迟
	temp_b_move['movementOrderDelay'] = 0;										//依次延迟时间
	temp_b_move['movementMode'] = "极坐标模式";									//移动模式
	//   极坐标（polar）
	temp_b_move['polarSpeedType'] = b_data["par_speedMode"];					//极坐标 - 速度 - 类型
	temp_b_move['polarSpeedBase'] = b_data["par_speedBase"];					//极坐标 - 速度 - 初速度
	temp_b_move['polarSpeedRandom'] = b_data["par_speedRandom"];				//极坐标 - 速度 - 速度随机波动量
	temp_b_move['polarSpeedInc'] = null;										//极坐标 - 速度 - 加速度
	temp_b_move['polarSpeedMax'] = null;										//极坐标 - 速度 - 最大速度
	temp_b_move['polarSpeedMin'] = null;										//极坐标 - 速度 - 最小速度
	temp_b_move['polarDistanceFormula'] = null;									//极坐标 - 速度 - 路程计算公式
	temp_b_move['polarDirType'] = b_data["par_dirMode"];						//极坐标 - 方向 - 类型
	temp_b_move['polarDirFixed'] = b_data["par_dirFix"];						//极坐标 - 方向 - 固定方向
	temp_b_move['polarDirSectorFace'] = b_data["par_dirSectorFace"];			//极坐标 - 方向 - 扇形朝向
	temp_b_move['polarDirSectorDegree'] = b_data["par_dirSectorDegree"];		//极坐标 - 方向 - 扇形角度
	temp_b_move['polarDirFormula'] = null;										//极坐标 - 方向 - 方向计算公式
	
	// > 随机因子（RandomFactor）
	//		（每个粒子对应一个随机因子，掌握一条弹道。）
	//		（注意，独立参数项之间，随机因子不可共用。会造成强关联的错误关系。）
	temp_b_move['polarSpeedRandomFactor'] = this._drill_randomFactor_speed;		//极坐标 - 速度 - 随机因子
	temp_b_move['polarDirRandomFactor'] = this._drill_randomFactor_dir;			//极坐标 - 方向 - 随机因子
	// > 随机迭代次数（RandomIteration）
	//		（每个粒子对应一个随机迭代次数，变换弹道用。）
	temp_b_move['polarSpeedRandomIterationList'] = this._drill_parList_randomIteration;
	temp_b_move['polarDirRandomIterationList'] = this._drill_parList_randomIteration;
	
	// > 生成参数数据
	this._drill_APa_ballistics_move = $gameTemp.drill_COBa_setBallisticsMove( temp_b_move );
}
//==============================
// * 粒子群弹道 - 弹道初始化（透明度）
//
//			说明：	> 只存 弹道配置，不存 实际弹道。包括随机因子、随机迭代次数。
//					> 实际弹道只在贴图中进行推演并使用。
//==============================
Drill_APa_Controller.prototype.drill_initBallisticsOpacity = function( data, sustain ){
	
	// > 弹道初始化（透明度）
	var temp_b_opacity = {};
	temp_b_opacity['opacityNum'] = this._drill_parNum;		//数量
	temp_b_opacity['opacityTime'] = sustain;				//时长
	temp_b_opacity['opacityDelay'] = 0;						//延迟
	temp_b_opacity['opacityEndDelay'] = 0;					//延迟
	temp_b_opacity['opacityOrderDelay'] = 0;				//依次延迟时间
	temp_b_opacity['opacityMode'] = "时间锚点模式";			//变化模式
	
	if( data['par_opacityMode'] == "逐渐消失" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "先显现后消失(慢速)" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':45,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':55,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "先显现后消失" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':25,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':75,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "先显现后消失(快速)" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':10,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':90,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "保持原透明度" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':255} );
	}
	else if( data['par_opacityMode'] == "一闪一闪" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':30,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':35,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':40,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':45,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':50,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':70,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':75,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':80,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':85,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':90,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else{
		alert(
			"【Drill_AnimationParticle.js 动画-多层动画粒子】\n"+
			"透明度类型错误，没有类型'" + data['par_opacityMode'] + "'。"
		);
	}
	
	// > 随机因子（RandomFactor）
	//		（每个粒子对应一个随机因子，掌握一条弹道。）
	//		（注意，独立参数项之间，随机因子不可共用。会造成强关联的错误关系。）
	temp_b_opacity['randomFactor'] = this._drill_randomFactor_opacity;
	// > 随机迭代次数（RandomIteration）
	//		（每个粒子对应一个随机迭代次数，变换弹道用。）
	temp_b_opacity['randomIterationList'] = this._drill_parList_randomIteration;
	
	// > 生成参数数据
	this._drill_APa_ballistics_opacity = $gameTemp.drill_COBa_setBallisticsOpacity( temp_b_opacity );
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_APa_Controller.prototype.drill_APa_resetData_Private = function( data ){
	
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
    this.drill_initData();													//初始化数据
    this.drill_initPrivateData();											//私有数据初始化
}

//==============================
// * 帧刷新 - 粒子数据
//
//			说明：	注意，控制器中不含 实际弹道 ，实际弹道在贴图中推演展开。
//==============================
Drill_APa_Controller.prototype.drill_APa_updateParData = function(){
	var data = this._drill_data;
	for( var i=0; i < this._drill_parNum; i++ ){
		
		// > 位置（弹道在贴图中叠加）
		//（无）
		
		// > 透明度（弹道在贴图中叠加）
		//（无）
		
		// > 自旋转
		this._drill_parList_rotation[i] += data['par_selfRotate'];
		
		// > 缩放（重设中才变化）
		//（无）
		
		// > 当前时间
		this._drill_parList_curTime[i] += 1;
		if( this._drill_parList_curTime[i] >= data['par_life'] ){
			this._drill_parList_curTime[i] = 0;
			
			//（生命周期结束时，重设）
			this.drill_APa_resetParticles( i );
		}
		
		// > 迭代次数（重设中才变化）
		//（无）
	}
};
//==============================
// * 粒子数据 - 重设
//==============================	
Drill_APa_Controller.prototype.drill_APa_resetParticles = function( i ){
	var data = this._drill_data;
	var iteration = this._drill_parList_randomIteration[i];
	
	// > 位置
	var angle = 360 * this.drill_APa_curRandom( iteration*i );
	var radius = data['par_birthRange'] * this.drill_APa_curRandom( iteration*i +1000 );
	var xx = radius * Math.cos( angle *Math.PI/180 );
	var yy = radius * Math.sin( angle *Math.PI/180 );
	this._drill_parList_x[i] = xx;
	this._drill_parList_y[i] = yy;
	
	// > 透明度
	//（无）
	
	// > 自旋转
	//（无）
	
	// > 缩放
	if( data['par_scaleMode'] == "固定缩放值" ){
		this._drill_parList_scaleX[i] = data['par_scaleBase'];
		this._drill_parList_scaleY[i] = data['par_scaleBase'];
	}
	if( data['par_scaleMode'] == "缩放值+波动量" ){
		this._drill_parList_scaleX[i] = data['par_scaleBase'] + (this.drill_APa_curRandom( iteration*i +2000 ) - 0.5) * data['par_scaleRandom'];
		this._drill_parList_scaleY[i] = data['par_scaleBase'] + (this.drill_APa_curRandom( iteration*i +2000 ) - 0.5) * data['par_scaleRandom'];
	}
	
	// > 当前时间
	//（无）
	
	// > 迭代次数
	this._drill_parList_randomIteration[i] += 1;
	
};
//==============================
// * 粒子数据 - 当前的随机数
//==============================
Drill_APa_Controller.prototype.drill_APa_curRandom = function( iteration ){
	return this.drill_APa_getRandomInIteration( this._drill_randomFactor_opacity, iteration );
};
//==============================
// * 数学 - 生成随机数（随机种子）
//			
//			参数：	> seed 数字	（正整数）
//			返回：	> 数字 		（0~1随机数）
//			
//			说明：	> 如果随机种子为 1至100，那么你将得到线性均匀分布的随机值。不是乱序随机。
//==============================
Drill_APa_Controller.prototype.drill_APa_getRandomInSeed = function( seed ){
	var new_ran = ( seed * 9301 + 49297 ) % 233280;
	new_ran = new_ran / 233280.0;
	return new_ran;
};
//==============================
// * 数学 - 生成随机数（迭代）
//			
//			参数：	> org_ran 数字   （0~1原随机数）
//					> iteration 数字 （正整数，迭代次数）
//			返回：	> 数字           （0~1新随机数）
//			
//			说明：	> 经过迭代后，能够得到乱序的随机数。
//==============================
Drill_APa_Controller.prototype.drill_APa_getRandomInIteration = function( org_ran, iteration ){
	var prime = DrillUp.drill_APa_primeList[ iteration % DrillUp.drill_APa_primeList.length ];
	var temp_ran = ( (org_ran + iteration) * 9301 + 49297 ) % 233280;
	temp_ran = temp_ran / prime;
	var new_ran = (temp_ran + org_ran * iteration * prime) %1;
	return new_ran;
};
//==============================
// * 数学 - 质数表（1000以内）
//==============================
DrillUp.drill_APa_primeList = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,
	73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,
	191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,
	311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,
	439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,
	577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,
	709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,
	857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];

//==============================
// * 位置 - 帧刷新
//==============================
Drill_APa_Controller.prototype.drill_APa_updatePosition = function(){
	var data = this._drill_data;
	
	// > 位置平移
	var xx = 0;
	var yy = 0;
	xx += data['x'];
	yy += data['y'];
	
	this._drill_x = xx;
	this._drill_y = yy;
}
	
//==============================
// * 阶段 - 设置当前阶段
//
//			说明：	注意，由于 透明度和缩放 变化并不是固定公式，而是增量值。
//					因此 阶段切换 时不会出现贴图突然变化情况，但代价是变化情况不可控。
//==============================
Drill_APa_Controller.prototype.drill_APa_setState_Private = function( state ){
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
		this._drill_needDestroy = true;
	}
}
//==============================
// * 阶段 - 帧刷新
//==============================
Drill_APa_Controller.prototype.drill_APa_updateState = function(){
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
		this._drill_needDestroy = true;
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
// * 阶段 - 初始化 出现状态
//==============================
Drill_APa_Controller.prototype.drill_initBirthState = function() {
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
// * 阶段 - 初始化 持续状态
//==============================
Drill_APa_Controller.prototype.drill_initSustainState = function() {
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
// * 阶段 - 初始化 消失状态
//==============================
Drill_APa_Controller.prototype.drill_initDeathState = function() {
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

//==============================
// * 帧刷新 - 校验值
//==============================
Drill_APa_Controller.prototype.drill_APa_updateCheckNaN = function(){
	
	// > 校验值
	if( DrillUp.g_APa_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_APa_checkNaN = false;
			alert(
				"【Drill_AnimationParticle.js 动画 - 多层动画粒子】\n"+
				"检测到控制器参数_drill_x出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_APa_checkNaN = false;
			alert(
				"【Drill_AnimationParticle.js 动画 - 多层动画粒子】\n"+
				"检测到控制器参数_drill_y出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_APa_checkNaN = false;
			alert(
				"【Drill_AnimationParticle.js 动画 - 多层动画粒子】\n"+
				"检测到控制器参数_drill_opacity出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_APa_checkNaN = false;
			alert(
				"【Drill_AnimationParticle.js 动画 - 多层动画粒子】\n"+
				"检测到控制器参数_drill_scaleX出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_APa_checkNaN = false;
			alert(
				"【Drill_AnimationParticle.js 动画 - 多层动画粒子】\n"+
				"检测到控制器参数_drill_scaleY出现了NaN值，请及时检查你的函数。"
			);
		}
	}
}


//=============================================================================
// ** 动画粒子贴图【Drill_APa_Sprite】
// **
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个粒子贴图。
// **		子功能：	->对象绑定
// **						->设置控制器
// **						->设置动画贴图
// **						->设置个体贴图
// **					->贴图初始化（手动）
// **					->销毁（手动）
// **					->层级位置修正
// **
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器和个体贴图 ）
// **
// **		代码：	> 范围 - 该类显示单独的动画装饰。
// **				> 结构 - [合并/ ●分离 /混乱] 贴图与数据合并。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_APa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_APa_Sprite.prototype = Object.create(Sprite.prototype);
Drill_APa_Sprite.prototype.constructor = Drill_APa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_APa_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this._drill_controller = null;				//控制器对象
	this._drill_individualSprite = null;		//个体贴图
	this._drill_animationSprite = null;			//动画贴图
	this._animation = null;						//动画对象（不存储的数据）
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_APa_Sprite.prototype.update = function() {
	if( this.drill_APa_isReady() == false ){ return; }
	if( this.drill_APa_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_updateLayer();					//帧刷新 - 层级
	this.drill_updateChild();					//帧刷新 - 粒子
}
//##############################
// * 粒子贴图 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_APa_Sprite.prototype.drill_APa_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * 粒子贴图 - 设置动画贴图【开放函数】
//			
//			参数：	> animation_sprite 动画贴图
//			返回：	> 无
//##############################
Drill_APa_Sprite.prototype.drill_APa_setAnimationSprite = function( animation_sprite ){
	this._drill_animationSprite = animation_sprite;
	this._animation = animation_sprite._animation;
};
//##############################
// * 粒子贴图 - 设置个体贴图【开放函数】
//			
//			参数：	> individual_sprite 贴图对象
//			返回：	> 无
//##############################
Drill_APa_Sprite.prototype.drill_APa_setIndividualSprite = function( individual_sprite ){
	this._drill_individualSprite = individual_sprite;
};
//##############################
// * 粒子贴图 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器和个体贴图 之后，才能进行初始化。
//##############################
Drill_APa_Sprite.prototype.drill_APa_initSprite = function(){
	this.drill_APa_initSprite_Private();
};
//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_APa_Sprite.prototype.drill_APa_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
	if( this._drill_individualSprite == undefined ){ return false; }
    return true;
};
//##############################
// * 粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_APa_Sprite.prototype.drill_APa_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 粒子贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_APa_Sprite.prototype.drill_APa_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 粒子贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_APa_Sprite.prototype.drill_APa_destroy = function(){
	this.drill_APa_destroy_Private();
};
//==============================
// * 粒子贴图 - 贴图初始化（私有）
//==============================
Drill_APa_Sprite.prototype.drill_APa_initSprite_Private = function() {
	
	// > 私有数据初始化
	var data = this._drill_controller._drill_data;
	
	
	// > 属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.blendMode = data['blendMode'];
	this.zIndex = data['zIndex'];
	this.visible = false;
	
	
	// > 外键数据
	this._drill_parent_enemyObj = null;			//绑定的 战斗界面中的 敌人
	this._drill_parent_actorObj = null;			//绑定的 战斗界面中的 角色
	this._drill_parent_characterObj = null;		//绑定的 地图界面中的 物体
	
	
	// > 粒子集合
	this._drill_APa_parSprite = [];		//粒子贴图容器
	for( var j = 0; j < this._drill_controller._drill_parNum; j++ ){	
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'], 0, true );
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.opacity = 0;
		this._drill_APa_parSprite.push(temp_sprite);
		this.addChild(temp_sprite);
	}
	
	// > 粒子弹道
	this._drill_APa_curIteration = [];		//（当前迭代次数）
	this._drill_APa_parBMoveX = [];
	this._drill_APa_parBMoveY = [];
	this._drill_APa_parBOpacity = [];
	for( var i = 0; i < this._drill_controller._drill_parNum; i++ ){
		this._drill_APa_curIteration[i] = 1;
		this.drill_refreshBallistics( i );
	}
	
};
//==============================
// * 粒子贴图 - 销毁（私有）
//==============================
Drill_APa_Sprite.prototype.drill_APa_destroy_Private = function(){
	
	// > 贴图销毁
	for( var i=0; i < this._drill_APa_parSprite.length; i++ ){
		var par_sprite = this._drill_APa_parSprite[i];
		this.removeChild( par_sprite );
	}
	this._drill_APa_parSprite = null;
	
	// > 指针清空
	this._drill_controller = null;				//控制器对象
	this._drill_individualSprite = null;		//个体贴图
	this._drill_animationSprite = null;			//动画贴图
	this._animation = null;						//动画对象
	
	this._drill_parent_enemyObj = null;
	this._drill_parent_actorObj = null;
	this._drill_parent_characterObj = null;
};
//==============================
// * 帧刷新 - 层级
//==============================
Drill_APa_Sprite.prototype.drill_updateLayer = function() {
	var data = this._drill_controller._drill_data;
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	
	
	// > 层级位置修正
	var cur_layer = data['anim_index'];
	
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
	
	
	// > 贴图 - 贴图属性
	this.x = xx;
	this.y = yy;
	this.scale.x = this._drill_controller._drill_scaleX;
	this.scale.y = this._drill_controller._drill_scaleY;
	this.opacity = this._drill_controller._drill_opacity;
	//this.visible = data['visible'];
	this.visible = $gameSystem._drill_APa_visible[ data['id']-1 ];
	
}
//==============================
// * 粒子群弹道 - 重新推演弹道
//==============================
Drill_APa_Sprite.prototype.drill_refreshBallistics = function( i ){
	
	// > 粒子群弹道 - 预推演（坐标）
	var org_x = this._drill_controller._drill_parList_x[i];
	var org_y = this._drill_controller._drill_parList_y[i];
	$gameTemp._drill_COBa_moveData = this._drill_controller._drill_APa_ballistics_move;
	$gameTemp.drill_COBa_preBallisticsMove( this, i, org_x, org_y );
	this._drill_APa_parBMoveX[i] = this._drill_COBa_x;
	this._drill_APa_parBMoveY[i] = this._drill_COBa_y;
	this._drill_COBa_x = null;
	this._drill_COBa_y = null;
	
	// > 粒子群弹道 - 预推演（透明度）
	$gameTemp._drill_COBa_commonData = this._drill_controller._drill_APa_ballistics_opacity;
	$gameTemp.drill_COBa_preBallisticsOpacity( this, i, 0 );
	this._drill_APa_parBOpacity[i] = this._drill_COBa_opacity;
	this._drill_COBa_opacity = null;
}
//==============================
// * 粒子 - 帧刷新
//==============================
Drill_APa_Sprite.prototype.drill_updateChild = function() {
	var data = this._drill_controller._drill_data;
	
	// > 每次迭代变化时，重新推演弹道
	for(var i = 0; i < this._drill_controller._drill_parNum; i++ ){
		if( this._drill_APa_curIteration[i] != this._drill_controller._drill_parList_randomIteration[i] ){
			this._drill_APa_curIteration[i] =  this._drill_controller._drill_parList_randomIteration[i];
			
			this.drill_refreshBallistics( i );
		}
	}
	
	// > 贴图 - 粒子属性
	for(var i = 0; i < this._drill_controller._drill_parNum; i++ ){
		var par_sprite = this._drill_APa_parSprite[i];
		var time = this._drill_controller._drill_parList_curTime[i];
		
		// > 粒子弹道倒放
		if( data['par_backrun'] == true ){
			time = data['par_life'] -time -1;
		}
		
		var xx = this._drill_controller._drill_parList_x[i];
		var yy = this._drill_controller._drill_parList_y[i];
		var oo = this._drill_controller._drill_parList_opacity[i];
		var rr = this._drill_controller._drill_parList_rotation[i];
		var scale_x = this._drill_controller._drill_parList_scaleX[i];
		var scale_y = this._drill_controller._drill_parList_scaleY[i];
		
		// > 位置（粒子群弹道）
		xx += this._drill_APa_parBMoveX[i][ time ];
		yy += this._drill_APa_parBMoveY[i][ time ];
		// > 位置
		par_sprite.x = xx;
		par_sprite.y = yy;
		
		// > 透明度（粒子群弹道）
		oo = this._drill_APa_parBOpacity[i][ time ];
		// > 透明度
		par_sprite.opacity = oo;
		
		// > 自旋转
		par_sprite.rotation = rr *Math.PI /180;
		
		// > 缩放
		par_sprite.scale.x = scale_x;
		par_sprite.scale.y = scale_y;
	};
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
	this._drill_controller = this._drill_parentSprite._drill_controller;
	
	// > 私有属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.blendMode = this._drill_parentSprite.blendMode;
	this.zIndex = this._drill_controller._drill_data['second_zIndex'];
	this.opacity = 0;
	this.visible = false;
	
	this.drill_createParticle();		//创建 - 粒子	
}
//==============================
// * 第二层粒子 - 创建粒子
//==============================
Drill_APa_SecSprite.prototype.drill_createParticle = function() {
	var p_data = this._drill_controller._drill_data;
	
	// > 粒子集合
	this._drill_APa_particleTankSec = [];			//粒子贴图容器
	for( var j = 0; j < p_data['par_count'] ; j++ ){	
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = ImageManager.loadBitmap( p_data['src_img_file'], p_data['second_src_img'], 0, true );
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
	
	this.drill_updateChild();	//帧刷新 - 粒子
}
//==============================
// * 第二层粒子 - 帧刷新粒子
//==============================
Drill_APa_SecSprite.prototype.drill_updateChild = function(){
	var data = this._drill_controller._drill_data;
	
	this.x = this._drill_parentSprite.x;
	this.y = this._drill_parentSprite.y;
	this.scale.x = this._drill_parentSprite.scale.x;
	this.scale.y = this._drill_parentSprite.scale.y;
	this.opacity = this._drill_parentSprite.opacity;
	this.visible = this._drill_parentSprite.visible;
	
	// > 贴图 - 粒子属性
	//		（最好不要用 par_sprite.x = org_sprite.x 的方式来赋值，会产生1帧的延迟问题 ）
	for(var i = 0; i < this._drill_controller._drill_parNum; i++ ){
		var par_sprite = this._drill_APa_particleTankSec[i];
		var time = this._drill_controller._drill_parList_curTime[i];
		
		// > 粒子弹道倒放
		if( data['par_backrun'] == true ){
			time = data['par_life'] -time -1;
		}
		
		var xx = this._drill_controller._drill_parList_x[i];
		var yy = this._drill_controller._drill_parList_y[i];
		var oo = this._drill_controller._drill_parList_opacity[i];
		var rr = this._drill_controller._drill_parList_rotation[i];
		var scale_x = this._drill_controller._drill_parList_scaleX[i];
		var scale_y = this._drill_controller._drill_parList_scaleY[i];
		
		// > 位置（粒子群弹道）
		xx += this._drill_parentSprite._drill_APa_parBMoveX[i][ time ];
		yy += this._drill_parentSprite._drill_APa_parBMoveY[i][ time ];
		// > 位置
		par_sprite.x = xx;
		par_sprite.y = yy;
		
		// > 透明度（粒子群弹道）
		oo = this._drill_parentSprite._drill_APa_parBOpacity[i][ time ];
		// > 透明度
		par_sprite.opacity = oo;
		
		// > 自旋转
		par_sprite.rotation = rr *Math.PI /180;
		
		// > 缩放
		par_sprite.scale.x = scale_x;
		par_sprite.scale.y = scale_y;
	};
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_AnimationParticle = false;
		var tip = DrillUp.drill_APa_getPluginTip_NoBasePlugin();
		alert( tip );
}
