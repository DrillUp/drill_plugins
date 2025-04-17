//=============================================================================
// Drill_AnimationParticle.js
//=============================================================================

/*:
 * @plugindesc [v2.2]        动画 - 多层动画粒子
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
 *   - Drill_CoreOfParticle       系统-粒子核心★★v2.0及以上★★
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面，战斗界面。
 *   作用于动画，伴随动画一起出现。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
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
 * 2.具体使用方法，可以去 个体装饰管理层示例 西环位置的
 *   "中断玩家蓄力动画"看看。
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
 * [v2.1]
 * 强化了粒子核心底层，并进行兼容适配。
 * [v2.2]
 * 添加了粒子 彩虹化 功能。
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
 * @desc 粒子将延迟一段时间显现，单位帧。
 * @default 0
 *
 * @param 出现时长
 * @parent ---动画过程---
 * @type number
 * @min 0
 * @desc 粒子显现的时间，单位帧。
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
 * @desc 粒子显现的模式方法。
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
 * @desc 粒子持续的时间，单位帧。
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
 * @desc 粒子消失的时间。
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
 * @desc 粒子消失的模式方法。
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
 * @param 粒子产生方式
 * @parent ---粒子效果---
 * @type select
 * @option 跳过产生过程
 * @value 跳过产生过程
 * @option 同时产生
 * @value 同时产生
 * @option 依次产生
 * @value 依次产生
 * @desc 粒子的产生方式，详细区别可以去看看文档 "1.系统 > 大家族-粒子效果.docx"。
 * @default 跳过产生过程
 *
 * @param 粒子弹道是否倒放
 * @parent ---粒子效果---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭，粒子弹道完全倒放。比如 四周扩散效果 变成 四周吸收效果。
 * @default false
 *
 * @param 粒子是否滞留
 * @parent ---粒子效果---
 * @type boolean
 * @on 滞留
 * @off 保持位置同步
 * @desc true - 滞留，false - 保持位置同步。滞留意思为粒子发出后，不会跟随 装饰的个体 一起移动。
 * @default false
 *
 * @param 粒子出现范围
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 以动画中心为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。设置0表示粒子全部集中于圆心。
 * @default 32
 *
 * @param 粒子方向模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 四周扩散(线性)
 * @value 四周扩散(线性)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @option 扇形范围方向(线性)
 * @value 扇形范围方向(线性)
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
 * @default 随机角度
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
 * @default (需配置)多层动画粒子直线拖尾贴图
 * @require 1
 * @dir img/Special__anim/
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
//		★性能测试因素	个体装饰管理层、战斗界面
//		★性能测试消耗	2024/5/10：
//							》2.51ms、7.57ms（update）13.87ms（drill_updateChild）
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
//			->☆动画粒子 容器
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
//			->动画粒子控制器【Drill_APa_Controller】
//				->A主体
//				->B粒子群弹道
//				->C随机因子
//				->D粒子变化
//				->E粒子重设
//				->F双层效果
//				->G直线拖尾贴图
//				->H贴图高宽
//				->I粒子生命周期
//				->2A阶段
//			->动画粒子贴图【Drill_APa_Sprite】
//				->A主体
//				->B粒子群弹道
//				->C对象绑定
//				->D粒子变化
//				->E粒子重设
//				->F双层效果
//				->G直线拖尾贴图
//				->H贴图高宽
//				->I粒子生命周期
//			->动画粒子贴图（第二层）【Drill_APa_SecSprite】
//				->A主体
//				->B粒子群弹道
//				->C对象绑定
//				->D粒子变化
//				->E粒子重设
//				->F双层效果
//				->G直线拖尾贴图
//				->H贴图高宽
//				->I粒子生命周期
//		
//		
//		★家谱：
//			大家族-粒子效果
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//		
//		★插件私有类：
//			* 动画粒子控制器【Drill_APa_Controller】
//			* 动画粒子贴图【Drill_APa_Sprite】
//			* 动画粒子贴图（第二层）【Drill_APa_SecSprite】
//		
//		★必要注意事项：
//			1.插件继承至 粒子核心。
//			  核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//			2.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//				_drill_animPBackArea 			父贴图后面层
//				_drill_animDownArea				动画后面层
//				_drill_animUpArea				动画前面层
//			3.这三层关系如下：
//				┕-	父贴图后面层（_drill_animPBackArea）
//				┕-	父贴图列表
//				┕-	动画贴图列表（不受控）
//					┕-	动画后面层（_drill_animDownArea）
//					┕-	动画帧贴图
//					┕-	动画前面层（_drill_animUpArea）
//			  注意，父贴图和动画贴图是并列的，该写法是原函数固定的，无法控制。（见Sprite_Base.prototype.startAnimation ）
//			4.留意下面的变量：
//				_drill_duration_decreased		减一锁（多次相互覆盖）
//				_drill_duration					延迟时间（多次相互覆盖）
//			5.留意关键字：【暂未使用】。
//
//		★其它说明细节：
//			1.插件详细原理说明见 Drill_AnimationCircle 。	
//			2.与 MOG_BattleHud 和 Drill_BattleCamera 有关联，用于定位第一人称下的动画位置。
//
//		★存在的问题：
//			1.问题：目前所有粒子样式的配置以及方法都没有统一化。
//			  解决：【不解决】，保留粒子的零散配置。
//			2.问题：第二层粒子的配置与第一层粒子坐标一样，但是实际播放好像差了1帧，不明原因。（2021-1-8）
//			  解决：【已解决】，使用控制器-贴图结构就能解决，可见『粒子弹道慢一帧』。
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_APa_PluginTip_curName = "Drill_AnimationParticle.js 动画-多层动画粒子";
	DrillUp.g_APa_PluginTip_baseList = ["Drill_CoreOfParticle.js 系统-粒子核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_APa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_APa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_APa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_APa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_APa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_APa_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_APa_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_APa_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_APa_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_AnimationParticle = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationParticle');
	
	//==============================
	// * 静态数据 - 粒子样式
	//				（~struct~APaStyle）
	//==============================
	DrillUp.drill_APa_styleInit = function( dataFrom ){
		var data = {};
		
		// > 控制器
		data['anim'] = Number( dataFrom["绑定的动画"] || 0);
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/Special__anim/";
		data['x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['opacity'] = 255;		//（此参数被 动画过程 覆盖）
		
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['individualIndex'] = String( dataFrom["动画层级"] || "在动画后面");
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
		data['par_lifeCustomType'] = String( dataFrom["粒子产生方式"] || "跳过产生过程");
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		data['par_holdingBirthPosition'] = String( dataFrom["粒子是否滞留"] || "false") == "true";
		
		data['par_birthRange'] = Number( dataFrom["粒子出现范围"] || 32);
		
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "随机角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_individualIndex'] = String( dataFrom["第二层粒子动画层级"] || "在动画后面");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 3);
		
		// > 随机种子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > 直线拖尾贴图
		data['trailing_enable'] = String( dataFrom["是否开启直线拖尾效果"] || "false") == "true";
		data['trailing_centerAnchor'] = String( dataFrom["是否固定拖尾在粒子中心"] || "false") == "true";
		data['trailing_src_img'] = String( dataFrom["资源-直线拖尾"] || "");
		data['trailing_src_img_file'] = "img/Special__anim/";
		
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
if( Imported.Drill_CoreOfParticle ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_APa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_APa_pluginCommand.call(this, command, args);
	this.drill_APa_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_APa_pluginCommand = function( command, args ){
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
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_APa_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_APa_getPluginTip_EventNotFind( e_id ) );
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
	sprite.drill_sprite_destroy();
	
	// > 断开父类
	if( sprite.parent != undefined ){
		sprite.parent.removeChild( sprite );
	}
};



//=============================================================================
// ** ☆动画粒子 容器
//
//			说明：	> 此模块提供对 动画粒子 各种操作的功能。
//					（插件完整的功能目录去看看：功能结构树）
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
// * 容器 - 获取贴图（开放函数）
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
// * 容器 - 获取贴图 - 根据敌人对象（开放函数）
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
// * 容器 - 获取贴图 - 根据角色对象（开放函数）
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
// * 容器 - 获取贴图 - 根据物体对象（开放函数）
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
// * 容器 - 获取全部控制器（开放函数）
//==============================
Game_Temp.prototype.drill_APa_getAllControllerList = function(){
	return this._drill_APa_controllerTank;
}
//==============================
// * 容器 - 获取全部贴图（开放函数）
//==============================
Game_Temp.prototype.drill_APa_getAllSpriteList = function(){
	return this._drill_APa_spriteTank;
}
//==============================
// * 容器 - 获取全部贴图 - 根据敌人对象（开放函数）
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
// * 容器 - 获取全部贴图 - 根据角色对象（开放函数）
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
// * 容器 - 获取全部贴图 - 根据物体对象（开放函数）
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
// * 容器操作 - 设置贴图 立即显示/隐藏（开放函数）
//==============================
Game_Temp.prototype.drill_APa_setAnimVisible = function( sprite_list, v ){
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
Game_Temp.prototype.drill_APa_setAnimPause = function( sprite_list, b ){
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
Game_Temp.prototype.drill_APa_setAnimBirth = function( sprite_list ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_APa_getState() == "延迟" ||
			temp_controller.drill_APa_getState() == "出现" ){
			temp_controller.drill_APa_setState("持续");
			temp_controller.drill_controller_setPause( false );
		}
	}
}
//==============================
// * 容器操作 - 设置贴图立即消失（开放函数）
//==============================
Game_Temp.prototype.drill_APa_setAnimDeath = function( sprite_list ){
	for(var i = 0; i < sprite_list.length ;i++){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_APa_getState() != "消失" ){
			temp_controller.drill_APa_setState("消失");
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
// * 动画绑定 - 初始化
//==============================
var _drill_APa_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
	_drill_APa_initMembers.call(this);
	this._drill_duration = 0;			//最大持续时间
}
//==============================
// * 动画绑定 - 创建数据/创建贴图
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
			
			// > 『控制器与贴图的样式』 - 校验+提示信息
			var cur_styleId   = i +1;
			var cur_styleData = anim_data;
			if( cur_styleData == undefined || 
				cur_styleData['inited'] == false ){
				alert( DrillUp.drill_APa_getPluginTip_StyleNotFind(cur_styleId) );
				return;
			}
			
			// > 『控制器与贴图的样式』 - 创建控制器
			var temp_controller = new Drill_APa_Controller( anim_data );
			$gameTemp._drill_APa_controllerTank.push( temp_controller );
			
			// > 创建贴图
			var temp_sprite = new Drill_APa_Sprite();
			temp_sprite.drill_sprite_setController( temp_controller );
			temp_sprite.drill_APa_setAnimationSprite( this );		//（绑定动画贴图，转半圈还要回来）
																	//（个体贴图后期绑定）
			temp_sprite.drill_sprite_initChild();
			$gameTemp._drill_APa_spriteTank.push( temp_sprite );
			$gameTemp._drill_APa_lastAdded.push( temp_sprite );		//（个体贴图绑定 的 临时容器）
			
			// > 添加贴图到层级
			$gameTemp.drill_APa_layerAddSprite( temp_sprite, anim_data['individualIndex'], this );
			
			
			// > 双层效果
			if( anim_data['second_enable'] == true ){
				
				// > 双层效果 - 创建贴图
				var temp_secSprite = new Drill_APa_SecSprite( temp_sprite );
				$gameTemp._drill_APa_spriteTank.push( temp_secSprite );
				
				// > 双层效果 - 添加贴图到层级
				$gameTemp.drill_APa_layerAddSprite( temp_secSprite, anim_data['second_individualIndex'], this );
			}
			
			// > 层级排序
			$gameTemp.drill_APa_sortByZIndex_Scene();
			this.drill_APa_sortByZIndex_Individual();
			
			// > 动画时长
			this._drill_duration =  Math.max(this._drill_duration, Math.max( 
				anim_data['delay'] + anim_data['birth'] + anim_data['sustain'] + anim_data['death'] + 1 , this._duration));
		}
	}
	
	
	// 连接-> （动画绑定 - 外键标记）
};
//==============================
// * 动画绑定 - 外键标记
//==============================
var _drill_APa_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    _drill_APa_startAnimation.call(this,animation, mirror, delay);
	
	// <-承接 （动画绑定 - 创建数据/创建贴图）
	//	（前面的函数执行完后，会进入到该函数继续）
	
	this.drill_APa_foreignKeyBinding();			//外键标记
	$gameTemp._drill_APa_lastAdded = [];		//清空上一次添加的标记
}
//==============================
// * 动画绑定 - 外键标记
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
//==============================
// * 动画绑定 - 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_APa_isReflectionSprite = function( sprite ){
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
var _drill_APa_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_APa_smap_update.call(this);
	this.drill_APa_updateInScene();
}
Scene_Map.prototype.drill_APa_updateInScene = function() {
	
	
	// > 控制器帧刷新（需要放后面，与层级变化错开1帧）
	for(var i = 0; i < $gameTemp._drill_APa_controllerTank.length; i++){
		var temp_controller = $gameTemp._drill_APa_controllerTank[i];
		temp_controller.drill_controller_update();		//含『装饰延时销毁』的帧刷新
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
// * 动画控制 - 帧刷新（战斗界面）
//==============================
var _drill_APa_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_APa_sbattle_update.call(this);
	this.drill_APa_updateInScene();
}
Scene_Battle.prototype.drill_APa_updateInScene = Scene_Map.prototype.drill_APa_updateInScene;
//==============================
// * 动画控制 - 播放中
//==============================
var _drill_APa_isPlaying = Sprite_Animation.prototype.isPlaying;
Sprite_Animation.prototype.isPlaying = function() {
    if( this._drill_duration > 0 ){
		return true;
	}
	return _drill_APa_isPlaying.call(this);
};
//==============================
// * 动画控制 - 帧刷新
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
// * 动画控制 - 移除（空指针优化）
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
// **					->2A阶段
// **					
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_APa_Controller(){
    this.initialize.apply(this, arguments);
};
Drill_APa_Controller.prototype = Object.create(Drill_COPa_Controller.prototype);
Drill_APa_Controller.prototype.constructor = Drill_APa_Controller;
//==============================
// * 控制器 - 初始化
//==============================
Drill_APa_Controller.prototype.initialize = function( data ){
    Drill_COPa_Controller.prototype.initialize.call( this, data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_APa_Controller.prototype.drill_controller_update = function(){
    Drill_COPa_Controller.prototype.drill_controller_update.call( this );
	if( this._drill_data['pause'] == true ){ return; }
	
	this.drill_APa_updateState();			//帧刷新 - 2A阶段
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
Drill_APa_Controller.prototype.drill_controller_resetData = function( data ){
    Drill_COPa_Controller.prototype.drill_controller_resetData.call( this, data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】（暂未使用，采用 $gameSystem._drill_APa_visible 控制，见 drill_updateAttr ）
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_APa_Controller.prototype.drill_controller_setVisible = function( visible ){
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
Drill_APa_Controller.prototype.drill_controller_setPause = function( pause ){
    Drill_COPa_Controller.prototype.drill_controller_setPause.call( this, pause );
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_APa_Controller.prototype.drill_controller_destroy = function(){
    Drill_COPa_Controller.prototype.drill_controller_destroy.call( this );
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_APa_Controller.prototype.drill_controller_isDead = function(){
	return Drill_COPa_Controller.prototype.drill_controller_isDead.call( this );
};

//##############################
// * 2A阶段 - 获取当前阶段【开放函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_APa_Controller.prototype.drill_APa_getState = function(){
	return this._drill_curState;
};
//##############################
// * 2A阶段 - 设置当前阶段【开放函数】
//
//			参数：	> state 字符串
//			返回：	> 无
//##############################
Drill_APa_Controller.prototype.drill_APa_setState = function( state ){
	this.drill_APa_setState_Private( state );
};
//##############################
// * 2A阶段 - 判断阶段销毁【开放函数】
//
//			参数：	> 无
//			返回：	> 布尔
//
//			说明：	> 此处融合了前面的判断销毁。
//##############################
Drill_APa_Controller.prototype.drill_APa_isDead = function(){
	return  this.drill_controller_isDead() || 
			this._drill_curState == "销毁";
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
Drill_APa_Controller.prototype.drill_controller_initData = function(){
	Drill_COPa_Controller.prototype.drill_controller_initData.call( this );
	var data = this._drill_data;
	
	// > 控制器
	if( data['anim'] == undefined ){ data['anim'] = 0 };												//控制器 - 绑定的动画id
	
	// > 贴图
	data['src_img_file'] = "img/Special__anim/";
	data['trailing_src_img_file'] = "img/Special__anim/";
	if( data['individualIndex'] == undefined ){ data['individualIndex'] = "在动画前面" };				//贴图 - 动画层级（贴图用）
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };											//贴图 - 图片层级（贴图用）
	
	// > D粒子变化
	if( data['par_holdingBirthPosition'] == undefined ){ data['par_holdingBirthPosition'] = false };	//D粒子变化 - 粒子是否滞留
	
	// > E粒子重设
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };							//E粒子重设 - 粒子出现范围
	
	// > F双层效果
	if( data['second_individualIndex'] == undefined ){ data['second_individualIndex'] = "" };			//F双层效果 - 第二层粒子层级
	if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 3 };								//F双层效果 - 第二层粒子图片层级
	
	// > I粒子生命周期
	if( data['par_lifeCustomType'] == "跳过产生过程" ){ data['par_lifeType'] = "跳过产生过程";	}
	if( data['par_lifeCustomType'] == "同时产生" ){ data['par_lifeType'] = "同时产生"; }
	if( data['par_lifeCustomType'] == "依次产生" ){ data['par_lifeType'] = "依次产生"; }
	
	// > 2A阶段
	if( data['delay'] == undefined ){ data['delay'] = 0 };												//2A阶段 - 出现延迟
	if( data['birth'] == undefined ){ data['birth'] = 20 };												//2A阶段 - 出现时长
	if( data['birthMode'] == undefined ){ data['birthMode'] = "横向显现" };								//2A阶段 - 出现模式
	if( data['birthScaleX'] == undefined ){ data['birthScaleX'] = 1.0 };								//2A阶段 - 出现-自定义缩放X
	if( data['birthScaleY'] == undefined ){ data['birthScaleY'] = 1.0 };								//2A阶段 - 出现-自定义缩放Y
	if( data['birthOpacity'] == undefined ){ data['birthOpacity'] = 0 };								//2A阶段 - 出现-自定义透明度
	if( data['sustain'] == undefined ){ data['sustain'] = 120 };										//2A阶段 - 持续时长
	if( data['sustainMode'] == undefined ){ data['sustainMode'] = "常规值" };							//2A阶段 - 持续模式
	if( data['sustainScaleX'] == undefined ){ data['sustainScaleX'] = 1.0 };							//2A阶段 - 持续-自定义缩放X
	if( data['sustainScaleY'] == undefined ){ data['sustainScaleY'] = 1.0 };							//2A阶段 - 持续-自定义缩放Y
	if( data['sustainOpacity'] == undefined ){ data['sustainOpacity'] = 0 };							//2A阶段 - 持续-自定义透明度
	if( data['death'] == undefined ){ data['death'] = 20 };												//2A阶段 - 消失时长
	if( data['deathMode'] == undefined ){ data['deathMode'] = "普通淡出消失" };							//2A阶段 - 消失模式
	if( data['deathScaleX'] == undefined ){ data['deathScaleX'] = 1.0 };								//2A阶段 - 消失-自定义缩放X
	if( data['deathScaleY'] == undefined ){ data['deathScaleY'] = 1.0 };								//2A阶段 - 消失-自定义缩放Y
	if( data['deathOpacity'] == undefined ){ data['deathOpacity'] = 0 };								//2A阶段 - 消失-自定义透明度
	
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_APa_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_Controller.prototype.drill_controller_initChild.call( this );
	this.drill_APa_initState();					//初始化子功能 - 2A阶段
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_APa_Controller.prototype.drill_controller_initAttr = function() {
	Drill_COPa_Controller.prototype.drill_controller_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_APa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
}
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_APa_Controller.prototype.drill_controller_initBallistics = function() {
	Drill_COPa_Controller.prototype.drill_controller_initBallistics.call( this );
}
//==============================
// * C随机因子 - 初始化子功能
//==============================
Drill_APa_Controller.prototype.drill_controller_initRandom = function() {
	Drill_COPa_Controller.prototype.drill_controller_initRandom.call( this );
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_APa_Controller.prototype.drill_controller_initTransform = function() {
	Drill_COPa_Controller.prototype.drill_controller_initTransform.call( this );
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_APa_Controller.prototype.drill_controller_initReset = function() {
	Drill_COPa_Controller.prototype.drill_controller_initReset.call( this );
}
//==============================
// * E粒子重设 - 帧刷新
//==============================
Drill_APa_Controller.prototype.drill_controller_updateReset = function() {
	Drill_COPa_Controller.prototype.drill_controller_updateReset.call( this );
}
//==============================
// * E粒子重设 - 执行重设 - 位置
//
//			说明：	> 由于当前插件为 个体装饰，因此起始点为 一个圆内随机出现 。
//==============================	
Drill_APa_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	Drill_COPa_Controller.prototype.drill_controller_resetParticles_Position.call( this, i );
	var data = this._drill_data;
	var cur_iteration = this._drill_parList_randomIteration[i];
	
	var angle = 360 * this.drill_controller_curRandom( cur_iteration*i + 41*i );		//（一个圆内随机出现）
	var radius = data['par_birthRange'] * this.drill_controller_curRandom( cur_iteration*i + 43*i +1000 );
	var xx = radius * Math.cos( angle *Math.PI/180 );
	var yy = radius * Math.sin( angle *Math.PI/180 );
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
// * 2A阶段 - 初始化子功能
//==============================
Drill_APa_Controller.prototype.drill_APa_initState = function() {
	
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
		this.drill_controller_destroyWithDelay();	//『装饰延时销毁』
	}
}
//==============================
// * 2A阶段 - 帧刷新
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
		this.drill_controller_destroyWithDelay();	//『装饰延时销毁』
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
// * 2A阶段 - 初始化 持续状态
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
// * 2A阶段 - 初始化 消失状态
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



//=============================================================================
// ** 动画粒子贴图【Drill_APa_Sprite】
// **
// **		作用域：	地图界面、战斗界面
// **		主功能：	定义一个粒子贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					
// **					->A主体
// **						->层级位置修正
// **					->B粒子群弹道
// **					->C对象绑定
// **					->D粒子变化
// **					->E粒子重设
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器和个体贴图 ）
// **
// **		代码：	> 范围 - 该类显示单独的动画装饰。
// **				> 结构 - [合并/ ●分离 /混乱] 贴图与数据分离。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，在 _spriteset 创建后，再创建此贴图。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_APa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_APa_Sprite.prototype = Object.create(Drill_COPa_Sprite.prototype);
Drill_APa_Sprite.prototype.constructor = Drill_APa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_APa_Sprite.prototype.initialize = function(){
    Drill_COPa_Sprite.prototype.initialize.call( this );
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_APa_Sprite.prototype.update = function() {
	Drill_COPa_Sprite.prototype.update.call(this);
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_APa_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 设置个体贴图【开放函数】
//			
//			参数：	> individual_sprite 贴图对象
//			返回：	> 无
//			
//			说明：	> 如果只播放单纯动画，此项可以为null。
//##############################
Drill_APa_Sprite.prototype.drill_APa_setIndividualSprite = function( individual_sprite ){
	this._drill_individualSprite = individual_sprite;
};
//##############################
// * C对象绑定 - 设置动画贴图【开放函数】
//			
//			参数：	> animation_sprite 动画贴图
//			返回：	> 无
//##############################
Drill_APa_Sprite.prototype.drill_APa_setAnimationSprite = function( animation_sprite ){
	this._drill_animationSprite = animation_sprite;
	this._animation = animation_sprite._animation;
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器和个体贴图 之后，才能进行手动初始化。
//##############################
Drill_APa_Sprite.prototype.drill_sprite_initChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initChild.call( this );
};

//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_APa_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_animationSprite == undefined ){ return false; }
	//if( this._drill_individualSprite == undefined ){ return false; }	//（注意，如果只播放单纯动画，个体贴图为null）
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
Drill_APa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
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
Drill_APa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
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
Drill_APa_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_APa_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initSelf.call( this );
	this._drill_individualSprite = null;		//个体贴图
	this._drill_animationSprite = null;			//动画贴图
	this._animation = null;						//动画数据指针
};
//==============================
// * 粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_APa_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_APa_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroySelf.call( this );
	this._drill_individualSprite = null;		//个体贴图
	this._drill_animationSprite = null;			//动画贴图
	this._animation = null;						//动画数据指针
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_APa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private = function(){
	return Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private.call( this );
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_APa_Sprite.prototype.drill_sprite_initAttr = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_APa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
	this.zIndex = this._drill_controller._drill_data['zIndex'];
};
//==============================
// * A主体 - 帧刷新 - 位置
//==============================
Drill_APa_Sprite.prototype.drill_sprite_updateAttr_Position = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Position.call( this );
	var data = this._drill_controller._drill_data;
	var xx = 0;
	var yy = 0;
	
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
	
	this._drill_x += xx;
	this._drill_y += yy;
};
//==============================
// * A主体 - 帧刷新 - 可见（覆写）
//==============================
Drill_APa_Sprite.prototype.drill_sprite_updateAttr_Visible = function() {
	var data = this._drill_controller._drill_data;
	this._drill_visible = $gameSystem._drill_APa_visible[data['id']-1];
};
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_APa_Sprite.prototype.drill_sprite_initBallistics = function() {
	var data = this._drill_controller._drill_data;
	
	// > 粒子 出生时父类位置标记
	this._drill_COPa_parList_birthParentX = [];
	this._drill_COPa_parList_birthParentY = [];
	for( var i = 0; i < data['par_count']; i++ ){
		this._drill_COPa_parList_birthParentX[i] = -2000;
		this._drill_COPa_parList_birthParentY[i] = -2000;
	}
	
    Drill_COPa_Sprite.prototype.drill_sprite_initBallistics.call( this );
}
//==============================
// * B粒子群弹道 - 推演弹道
//==============================
Drill_APa_Sprite.prototype.drill_sprite_refreshBallistics = function( i ){
    Drill_COPa_Sprite.prototype.drill_sprite_refreshBallistics.call( this, i );
	
	// > 粒子 出生时父类位置标记
	if( this._drill_individualSprite instanceof Sprite_Enemy ){		//（敌人位置）
		this._drill_COPa_parList_birthParentX[i] = this._drill_individualSprite.x;
		this._drill_COPa_parList_birthParentY[i] = this._drill_individualSprite.y;
	}
	if( this._drill_individualSprite instanceof Sprite_Actor ){		//（角色位置）
		this._drill_COPa_parList_birthParentX[i] = this._drill_individualSprite.x;
		this._drill_COPa_parList_birthParentY[i] = this._drill_individualSprite.y;
	}
	if( this._drill_individualSprite instanceof Sprite_Character ){	//（物体位置）
		this._drill_COPa_parList_birthParentX[i] = this._drill_individualSprite._character._realX;
		this._drill_COPa_parList_birthParentY[i] = this._drill_individualSprite._character._realY;
	}
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_APa_Sprite.prototype.drill_sprite_initTransform = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initTransform.call( this );
}
//==============================
// * D粒子变化 - 帧刷新 - 位置
//==============================
Drill_APa_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
    Drill_COPa_Sprite.prototype.drill_sprite_updateTransform_Position.call( this, i, time );
	var data = this._drill_controller._drill_data;
	
	// > 位置（粒子滞留）
	if( data['par_holdingBirthPosition'] == true ){
		if( this._drill_COPa_parList_birthParentX[i] != -2000 &&
			this._drill_COPa_parList_birthParentY[i] != -2000 ){
				
			// > 粒子滞留 - 敌人位置
			if( this._drill_individualSprite instanceof Sprite_Enemy ){
				this._drill_par_x -= this._drill_individualSprite.x - this._drill_COPa_parList_birthParentX[i];
				this._drill_par_y -= this._drill_individualSprite.y - this._drill_COPa_parList_birthParentY[i];
			}
			// > 粒子滞留 - 角色位置
			if( this._drill_individualSprite instanceof Sprite_Actor ){
				this._drill_par_x -= this._drill_individualSprite.x - this._drill_COPa_parList_birthParentX[i];
				this._drill_par_y -= this._drill_individualSprite.y - this._drill_COPa_parList_birthParentY[i];
			}
			// > 粒子滞留 - 物体位置
			if( this._drill_individualSprite instanceof Sprite_Character ){
				this._drill_par_x -= $gameMap.roundX( this._drill_individualSprite._character._realX - this._drill_COPa_parList_birthParentX[i] )*$gameMap.tileWidth();
				this._drill_par_y -= $gameMap.roundY( this._drill_individualSprite._character._realY - this._drill_COPa_parList_birthParentY[i] )*$gameMap.tileHeight();
			}
		}
	}
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_APa_Sprite.prototype.drill_sprite_initReset = function() {
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



//=============================================================================
// ** 动画粒子贴图（第二层）【Drill_APa_SecSprite】
// **
// **		作用域：	地图界面、战斗界面
// **		主功能：	定义一个 第二层粒子贴图 。
// **		子功能：	
// **					->贴图（第二层）『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					
// **					->A主体
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
function Drill_APa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_APa_SecSprite.prototype = Object.create(Drill_COPa_SecSprite.prototype);
Drill_APa_SecSprite.prototype.constructor = Drill_APa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_APa_SecSprite.prototype.initialize = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.initialize.call( this, parentSprite );
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_APa_SecSprite.prototype.update = function() {
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
Drill_APa_SecSprite.prototype.drill_spriteSec_isReady = function(){
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
Drill_APa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
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
Drill_APa_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
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
Drill_APa_SecSprite.prototype.drill_spriteSec_destroy = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_destroy.call(this);
};
//==============================
// * 第二层粒子 - 初始化子功能『控制器与贴图』
//==============================
Drill_APa_SecSprite.prototype.drill_spriteSec_initChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initChild.call( this );
};
//==============================
// * 第二层粒子 - 初始化自身『控制器与贴图』
//==============================
Drill_APa_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initSelf.call( this, parentSprite );
	this._drill_individualSprite = parentSprite._drill_individualSprite;	//个体贴图
	this._drill_animationSprite = parentSprite._drill_animationSprite;		//动画贴图
	this._animation = parentSprite._animation;								//动画数据指针
};
//==============================
// * 第二层粒子 - 销毁子功能『控制器与贴图』
//==============================
Drill_APa_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroyChild.call( this );
};
//==============================
// * 第二层粒子 - 销毁自身『控制器与贴图』
//==============================
Drill_APa_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroySelf.call( this );
	this._drill_individualSprite = null;		//个体贴图
	this._drill_animationSprite = null;			//动画贴图
	this._animation = null;						//动画数据指针
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_APa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private = function(){
	return Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private.call( this );
}

//==============================
// * A主体（第二层） - 初始化子功能
//==============================
Drill_APa_SecSprite.prototype.drill_spriteSec_initAttr = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initAttr.call( this );
	this.zIndex = this._drill_controller._drill_data['second_zIndex'];
};
//==============================
// * B粒子群弹道（第二层） - 初始化子功能
//==============================
Drill_APa_SecSprite.prototype.drill_spriteSec_initBallistics = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initBallistics.call( this );
};
//==============================
// * D粒子变化（第二层） - 初始化子功能
//==============================
Drill_APa_SecSprite.prototype.drill_spriteSec_initTransform = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initTransform.call( this );
}
//==============================
// * E粒子重设（第二层） - 初始化子功能
//==============================
Drill_APa_SecSprite.prototype.drill_spriteSec_initReset = function() {
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
		Imported.Drill_AnimationParticle = false;
		var pluginTip = DrillUp.drill_APa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}
