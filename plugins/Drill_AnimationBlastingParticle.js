//=============================================================================
// Drill_AnimationBlastingParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        动画 - 粒子小爆炸
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子样式-%d"
 * @Drill_LE_parentKey "---粒子样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_ABPa_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_AnimationBlastingParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令播放一个粒子小爆炸的临时动画。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfBallistics       系统-弹道核心★★v2.0及以上★★
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于玩家、事件、战斗单位。
 * 细节：
 *   (1.粒子小爆炸是一个插件指令直接控制的动画。
 *      不需要绑定动画对象。
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
 * -----------------------------------------------------------------------------
 * ----激活条件 - 地图物体
 * 你需要通过插件指令控制粒子小爆炸在地图界面的效果：
 * 
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 玩家 : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 玩家领队 : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 玩家全员 : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 玩家队员[1] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 玩家队员变量[21] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 本事件 : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 事件[10] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 事件变量[21] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 批量事件[10,11] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 批量事件变量[21,22] : 播放
 *
 * 1.粒子小爆炸动画是临时效果，播放完毕后自动销毁。
 * 2.小爆炸绑定于地图物体，物体移动时，爆炸效果会跟随一并移动。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 战斗单位
 * 你需要通过插件指令控制粒子小爆炸在战斗界面的效果：
 * 
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 敌方[2] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 敌方全体 : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 敌方变量[21] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 我方[2] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 我方全体 : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 我方变量[21] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 战斗敌人[5] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 战斗敌人变量[21] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 战斗角色[5] : 播放
 * 插件指令：>动画粒子小爆炸 : 样式[2] : 战斗角色变量[21] : 播放
 *
 * 1.粒子小爆炸动画是临时效果，播放完毕后自动销毁。
 * 2.小爆炸绑定于战斗单位，单位移动时，爆炸效果会跟随一并移动。
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
 * 测试方法：   在地图界面中播放12个含粒子小爆炸的动画。
 * 测试结果：   200个事件的地图中，平均消耗为：【53.90ms】
 *              100个事件的地图中，平均消耗为：【43.70ms】
 *               50个事件的地图中，平均消耗为：【39.21ms】
 * 测试方法2：  在战斗界面中播放12个含粒子小爆炸的动画。
 * 测试结果2：  战斗界面平均消耗为：【31.19ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.粒子小爆炸的数量较多，由于一次性播放粒子数量的比较多，会产生
 *   一定的消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 *
 * @param ---粒子样式组 1至20---
 * @default
 *
 * @param 粒子样式-1
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-2
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-3
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-4
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-5
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-6
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-7
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-8
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-9
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-10
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-11
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-12
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-13
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-14
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-15
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-16
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-17
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-18
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-19
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-20
 * @parent ---粒子样式组 1至20---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组21至40---
 * @default
 *
 * @param 粒子样式-21
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-22
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-23
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-24
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-25
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-26
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-27
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-28
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-29
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-30
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-31
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-32
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-33
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-34
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-35
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-36
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-37
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-38
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-39
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-40
 * @parent ---粒子样式组21至40---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组41至60---
 * @default
 *
 * @param 粒子样式-41
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-42
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-43
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-44
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-45
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-46
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-47
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-48
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-49
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-50
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-51
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-52
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-53
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-54
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-55
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-56
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-57
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-58
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-59
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-60
 * @parent ---粒子样式组41至60---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组61至80---
 * @default
 *
 * @param 粒子样式-61
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-62
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-63
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-64
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-65
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-66
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-67
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-68
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-69
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-70
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-71
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-72
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-73
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-74
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-75
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-76
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-77
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-78
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-79
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-80
 * @parent ---粒子样式组61至80---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组81至100---
 * @default
 *
 * @param 粒子样式-81
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-82
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-83
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-84
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-85
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-86
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-87
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-88
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-89
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-90
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-91
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-92
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-93
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-94
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-95
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-96
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-97
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-98
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-99
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-100
 * @parent ---粒子样式组81至100---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组101至120---
 * @default
 *
 * @param 粒子样式-101
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-102
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-103
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-104
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-105
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-106
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-107
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-108
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-109
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-110
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-111
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-112
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-113
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-114
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-115
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-116
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-117
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-118
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-119
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-120
 * @parent ---粒子样式组101至120---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组121至140---
 * @default
 *
 * @param 粒子样式-121
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-122
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-123
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-124
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-125
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-126
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-127
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-128
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-129
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-130
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-131
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-132
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-133
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-134
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-135
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-136
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-137
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-138
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-139
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-140
 * @parent ---粒子样式组121至140---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组141至160---
 * @default
 *
 * @param 粒子样式-141
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-142
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-143
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-144
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-145
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-146
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-147
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-148
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-149
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-150
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-151
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-152
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-153
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-154
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-155
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-156
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-157
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-158
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-159
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-160
 * @parent ---粒子样式组141至160---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组161至180---
 * @default
 *
 * @param 粒子样式-161
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-162
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-163
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-164
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-165
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-166
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-167
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-168
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-169
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-170
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-171
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-172
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-173
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-174
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-175
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-176
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-177
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-178
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-179
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-180
 * @parent ---粒子样式组161至180---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组181至200---
 * @default
 *
 * @param 粒子样式-181
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-182
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-183
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-184
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-185
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-186
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-187
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-188
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-189
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-190
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-191
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-192
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-193
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-194
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-195
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-196
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-197
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-198
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-199
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-200
 * @parent ---粒子样式组181至200---
 * @type struct<ABPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 */
/*~struct~ABPaStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的粒子小爆炸样式==
 * 
 * @param ---贴图---
 * @desc 
 *
 * @param 资源-粒子
 * @parent ---贴图---
 * @desc 粒子的图片资源。
 * @default (需配置)粒子小爆炸
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
 * @option 在父贴图前面
 * @value 在父贴图前面
 * @desc 粒子所属的动画层级。父贴图后面是指：战斗时，敌人/玩家贴图的后面，地图中，事件贴图的后面。
 * @default 在父贴图前面
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个动画，并且在同一动画层级下，先后排序的位置，0表示最后面。
 * @default 4
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
 * @default 0
 *
 * @param 粒子方向模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(线性)
 * @value 四周扩散(线性)
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 扇形范围方向(线性)
 * @value 扇形范围方向(线性)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 四周扩散(线性)
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
 * @default 0.20221005
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
//		插件简称		ABPa (Animation_Blasting_Particle)
//		临时全局变量	DrillUp.g_ABPa_style_xxx
//		临时局部变量	this._drill_ABPa_xxx
//		存储数据变量	$gameSystem._drill_ABPa_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	物体管理层、战斗界面
//		★性能测试消耗	43.7ms（update）52.9ms（drill_updateParticle）
//		★最坏情况		大量动画被同时播放。
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			粒子小爆炸：
//				->单位贴图容器【标准模块】
//				->物体贴图容器【标准模块】
//				->个体层级【标准模块】
//		
//		★私有类如下：
//			* Drill_ABPa_Sprite		【小爆炸粒子贴图】
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
// ** 提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_ABPa_tipCurName = "Drill_AnimationBlastingParticle.js 动画-粒子小爆炸";
	DrillUp.g_ABPa_tipBasePluginList = ["Drill_CoreOfBallistics.js 系统-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_ABPa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_ABPa_tipBasePluginList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_ABPa_tipCurName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_ABPa_tipBasePluginList.length; i++){
			message += "\n- ";
			message += DrillUp.g_ABPa_tipBasePluginList[i];
		}
		return message;
	};

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationBlastingParticle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationBlastingParticle');
	
	//==============================
	// * 变量获取 - 粒子样式
	//				（~struct~ABPaStyle）
	//==============================
	DrillUp.drill_ABPa_styleInit = function( dataFrom ){
		var data = {};
		
		// > 资源
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/Special__anim/";
		
		// > 贴图
		data['x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['anim_index'] = String( dataFrom["动画层级"] || "在父贴图前面");
		data['zIndex'] = Number( dataFrom["图片层级"] || 4);
		
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
		
		// > 特殊功能
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		
		return data;
	}
	
	/*-----------------粒子样式------------------*/
	DrillUp.g_ABPa_style_length = 200;
	DrillUp.g_ABPa_style = [];
	for (var i = 0; i < DrillUp.g_ABPa_style_length; i++) {
		if( DrillUp.parameters['粒子样式-' + String(i+1) ] != undefined && 
			DrillUp.parameters['粒子样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['粒子样式-' + String(i+1) ]);
			DrillUp.g_ABPa_style[i] = DrillUp.drill_ABPa_styleInit( data );
			DrillUp.g_ABPa_style[i]['id'] = i+1;
			DrillUp.g_ABPa_style[i]['inited'] = true;
		}else{
			DrillUp.g_ABPa_style[i] = DrillUp.drill_ABPa_styleInit( {} );
			DrillUp.g_ABPa_style[i]['id'] = i+1;
			DrillUp.g_ABPa_style[i]['inited'] = false;
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ABPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ABPa_pluginCommand.call(this, command, args);
	if( command === ">动画粒子小爆炸" ){
		
		/*-----------------对象组获取 - 物体------------------*/
		var charSprite_list = null;
		if( args.length >= 4 ){
			var unit = String(args[3]);
			if( charSprite_list == null && unit == "本事件" ){
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByEventId( this._eventId ) );
			}
			if( charSprite_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				charSprite_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_ABPa_isEventExist( e_id ) == false ){ continue; }
					charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByEventId( e_id ) );
				}
			}
			if( charSprite_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				charSprite_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_ABPa_isEventExist( e_id ) == false ){ continue; }
					charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByEventId( e_id ) );
				}
			}
			if( charSprite_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_ABPa_isEventExist( e_id ) == false ){ return; }
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByEventId( e_id ) );
			}
			if( charSprite_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_ABPa_isEventExist( e_id ) == false ){ return; }
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByEventId( e_id ) );
			}
			if( charSprite_list == null && (unit == "玩家" || unit == "玩家领队") ){
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByFollowerIndex( 0 ) );
			}
			if( charSprite_list == null && unit == "玩家全员" ){
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByFollowerIndex( 0 ) );
				for(var i=0; i < $gamePlayer.followers().visibleFollowers().length; i++ ){
					charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByFollowerIndex( i+1 ) );
				}
			}
			if( charSprite_list == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var f_index = Number(unit);
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByFollowerIndex( f_index ) );
			}
			if( charSprite_list == null && unit.indexOf("玩家队员变量[") != -1 ){
				unit = unit.replace("玩家队员变量[","");
				unit = unit.replace("]","");
				var f_index = $gameVariables.value(Number(unit));
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByFollowerIndex( f_index ) );
			}
		}
		/*-----------------对象组获取 - 战斗单位------------------*/
		var unitSprite_list = null;
		if( args.length >= 4 ){
			var unit = String(args[3]);
			if( unitSprite_list == null && unit == "敌方全体" ){
				unitSprite_list = $gameTemp.drill_ABPa_getEnemySpriteTank();	//（死亡对象也包括）
			}
			if( unitSprite_list == null && unit.indexOf("敌方[") != -1 ){
				unit = unit.replace("敌方[","");
				unit = unit.replace("]","");
				var index = Number(unit)-1;
				unitSprite_list = [];
				unitSprite_list.push( $gameTemp.drill_ABPa_getEnemySpriteByIndex( index ) );
			}
			if( unitSprite_list == null && unit.indexOf("敌方变量[") != -1 ){
				unit = unit.replace("敌方变量[","");
				unit = unit.replace("]","");
				var index = $gameVariables.value(Number(unit))-1;
				unitSprite_list = [];
				unitSprite_list.push( $gameTemp.drill_ABPa_getEnemySpriteByIndex( index ) );
			}
			
			if( unitSprite_list == null && unit == "我方全体" ){
				unitSprite_list = $gameTemp.drill_ABPa_getActorSpriteTank();	//（死亡对象也包括）
			}
			if( unitSprite_list == null && unit.indexOf("我方[") != -1 ){
				unit = unit.replace("我方[","");
				unit = unit.replace("]","");
				var index = Number(unit)-1;
				unitSprite_list = [];
				unitSprite_list.push( $gameTemp.drill_ABPa_getActorSpriteByIndex( index ) );
			}
			if( unitSprite_list == null && unit.indexOf("我方变量[") != -1 ){
				unit = unit.replace("我方变量[","");
				unit = unit.replace("]","");
				var index = $gameVariables.value(Number(unit))-1;
				unitSprite_list = [];
				unitSprite_list.push( $gameTemp.drill_ABPa_getActorSpriteByIndex( index ) );
			}
			
			if( unitSprite_list == null && unit.indexOf("战斗敌人变量[") != -1 ){
				unit = unit.replace("战斗敌人变量[","");
				unit = unit.replace("]","");
				var battler_id = $gameVariables.value(Number(unit));
				unitSprite_list = $gameTemp.drill_ABPa_getEnemySpriteByEnemyId( battler_id );
			}
			if( unitSprite_list == null && unit.indexOf("战斗敌人[") != -1 ){
				unit = unit.replace("战斗敌人[","");
				unit = unit.replace("]","");
				var battler_id = Number(unit);
				unitSprite_list = $gameTemp.drill_ABPa_getEnemySpriteByEnemyId( battler_id );
			}
			if( unitSprite_list == null && unit.indexOf("战斗角色变量[") != -1 ){
				unit = unit.replace("战斗角色变量[","");
				unit = unit.replace("]","");
				var battler_id = $gameVariables.value(Number(unit));
				unitSprite_list = [];
				unitSprite_list.push( $gameTemp.drill_ABPa_getActorSpriteByActorId( battler_id ) );
			}
			if( unitSprite_list == null && unit.indexOf("战斗角色[") != -1 ){
				unit = unit.replace("战斗角色[","");
				unit = unit.replace("]","");
				var battler_id = Number(unit);
				unitSprite_list = [];
				unitSprite_list.push( $gameTemp.drill_ABPa_getActorSpriteByActorId( battler_id ) );
			}
		}
		
		/*-----------------执行播放------------------*/
		if( args.length == 6 ){
			var temp1 = String(args[1]);
			var type = String(args[5]);
			if( type == "播放" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				if( charSprite_list != undefined ){
					for( var i=0; i < charSprite_list.length; i++ ){
						var sprite = charSprite_list[i];
						$gameTemp.drill_ABPa_createSprite( temp1, sprite );
					}
				}
				if( unitSprite_list != undefined ){
					for( var i=0; i < unitSprite_list.length; i++ ){
						var sprite = unitSprite_list[i];
						$gameTemp.drill_ABPa_createSprite( temp1, sprite );
					}
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ABPa_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_AnimationBlastingParticle.js 动画 - 粒子小爆炸】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】单位贴图
//#############################################################################
//##############################
// * 单位贴图 - 获取 - 敌人容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组    （敌人贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_ABPa_getEnemySpriteTank = function(){
	return this.drill_ABPa_getEnemySpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据敌方索引【标准函数】
//				
//			参数：	> index 数字 （敌方第n个位置，从0开始计数）
//			返回：	> 贴图       （敌人贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_ABPa_getEnemySpriteByIndex = function( index ){
	return this.drill_ABPa_getEnemySpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据敌人ID【标准函数】
//				
//			参数：	> enemy_id 数字（敌人ID）
//			返回：	> 贴图数组     （敌人贴图数组）
//          
//			说明：	> 注意敌人可能有很多个，返回的是数组。
//##############################
Game_Temp.prototype.drill_ABPa_getEnemySpriteByEnemyId = function( enemy_id ){
	return this.drill_ABPa_getEnemySpriteByEnemyId_Private( enemy_id );
}
//##############################
// * 单位贴图 - 获取 - 角色容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组   （角色贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_ABPa_getActorSpriteTank = function(){
	return this.drill_ABPa_getActorSpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据我方索引【标准函数】
//				
//			参数：	> index 数字 （我方第n个位置，从0开始计数）
//			返回：	> 贴图       （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_ABPa_getActorSpriteByIndex = function( index ){
	return this.drill_ABPa_getActorSpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据角色ID【标准函数】
//				
//			参数：	> actor_id 数字（角色ID）
//			返回：	> sprite 贴图  （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_ABPa_getActorSpriteByActorId = function( actor_id ){
	return this.drill_ABPa_getActorSpriteByActorId_Private( actor_id );
}
//=============================================================================
// ** 单位贴图（接口实现）
//=============================================================================
//==============================
// * 单位贴图容器 - 获取 - 敌人容器指针（私有）
//==============================
Game_Temp.prototype.drill_ABPa_getEnemySpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._enemySprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌方索引（私有）
//==============================
Game_Temp.prototype.drill_ABPa_getEnemySpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_ABPa_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.index() == index ){
			return enemy_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌人ID（私有）
//==============================
Game_Temp.prototype.drill_ABPa_getEnemySpriteByEnemyId_Private = function( enemy_id ){
	var sprite_list = this.drill_ABPa_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return []; }
	var result_list = [];
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.enemyId() == enemy_id ){
			result_list.push( enemy_sprite );
		}
	}
	return result_list;
};
//==============================
// * 单位贴图容器 - 获取 - 角色容器指针（私有）
//==============================
Game_Temp.prototype.drill_ABPa_getActorSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._actorSprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据我方索引（私有）
//==============================
Game_Temp.prototype.drill_ABPa_getActorSpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_ABPa_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.index() == index ){
			return actor_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据角色ID（私有）
//==============================
Game_Temp.prototype.drill_ABPa_getActorSpriteByActorId_Private = function( actor_id ){
	var sprite_list = this.drill_ABPa_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.actorId() == actor_id ){
			return actor_sprite;
		}
	}
	return null;
};


//#############################################################################
// ** 【标准模块】物体贴图
//#############################################################################
//##############################
// * 物体贴图 - 获取 - 容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组     （物体贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_ABPa_getCharacterSpriteTank = function(){
	return this.drill_ABPa_getCharacterSpriteTank_Private();
}
//##############################
// * 物体贴图 - 获取 - 根据事件ID【标准函数】
//			
//			参数：	> event_id 数字（事件ID）
//			返回：	> 贴图对象     （事件贴图）
//          
//			说明：	> 事件id和物体贴图一一对应。（不含镜像）
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//##############################
Game_Temp.prototype.drill_ABPa_getCharacterSpriteByEventId = function( event_id ){
	return this.drill_ABPa_getCharacterSpriteByEventId_Private( event_id );
}
//##############################
// * 物体贴图 - 获取 - 根据玩家队员索引【标准函数】
//			
//			参数：	> follower_index 数字（玩家队员索引）
//			返回：	> 贴图对象           （玩家队员贴图）
//          
//			说明：	> 0表示玩家，1表示第一个跟随者。（不含镜像）
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//##############################
Game_Temp.prototype.drill_ABPa_getCharacterSpriteByFollowerIndex = function( follower_index ){
	return this.drill_ABPa_getCharacterSpriteByFollowerIndex_Private( follower_index );
}
//=============================================================================
// ** 物体贴图（接口实现）
//=============================================================================
//==============================
// * 物体贴图容器 - 获取 - 根据事件ID（私有）
//==============================
Game_Temp.prototype.drill_ABPa_getCharacterSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._characterSprites;
};
//==============================
// * 物体贴图容器 - 获取 - 根据事件ID（私有）
//==============================
Game_Temp.prototype.drill_ABPa_getCharacterSpriteByEventId_Private = function( event_id ){
	var sprite_list = this.drill_ABPa_getCharacterSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite._character == undefined ){ continue; }				//（判断 _character 就可以，不需要检验 Sprite_Character 了）
		if( this.drill_ABPa_isReflectionSprite( sprite ) ){ continue; }	//（镜像跳过）
		if( sprite._character._eventId == event_id ){
			return sprite;
		}
	}
	return null;
};
//==============================
// * 物体贴图容器 - 获取 - 根据玩家索引（私有）
//==============================
Game_Temp.prototype.drill_ABPa_getCharacterSpriteByFollowerIndex_Private = function( follower_index ){
	var sprite_list = this.drill_ABPa_getCharacterSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite._character == undefined ){ continue; }				//（判断 _character 就可以，不需要检验 Sprite_Character 了）
		if( this.drill_ABPa_isReflectionSprite( sprite ) ){ continue; }	//（镜像跳过）
		if( follower_index == 0 && sprite._character == $gamePlayer ){
			return sprite;
		}
		if( sprite._character._memberIndex == follower_index &&
			sprite._character.isVisible() ){
			return sprite;
		}
	}
	return null;
};

//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_ABPa_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}


//#############################################################################
// ** 【标准模块】个体层级
//#############################################################################
//##############################
// * 个体层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图           （添加的贴图对象）
//					> layer_index 字符串    （添加到的层级名，行走图前面层/父贴图后面层）
//					> individual_sprite 贴图（被装饰的个体贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//					> 注意，此函数必须在 _spriteset 图层 建立之后执行。见锁 $gameTemp._drill_spritesetCreated 。
//##############################
Game_Temp.prototype.drill_ABPa_layerAddSprite = function( sprite, layer_index, individual_sprite ){
    this.drill_ABPa_layerAddSprite_Private( sprite, layer_index, individual_sprite );
}
//##############################
// * 个体层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从父层级中移除。
//##############################
Game_Temp.prototype.drill_ABPa_layerRemoveSprite = function( sprite ){
	this.drill_ABPa_layerRemoveSprite_Private( sprite );
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
Game_Temp.prototype.drill_ABPa_sortByZIndex_Scene = function(){
	var cur_scene = SceneManager._scene;
	if( cur_scene instanceof Scene_Map ){
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
Sprite_Character.prototype.drill_ABPa_sortByZIndex_Individual = function(){
	this._drill_animPFrontArea.children.sort(function(a, b){return a.zIndex-b.zIndex});				//行走图前面层
}
Sprite_Battler.prototype.drill_ABPa_sortByZIndex_Individual = function(){
	this._drill_animPFrontArea.children.sort(function(a, b){return a.zIndex-b.zIndex});				//行走图前面层
}
//=============================================================================
// ** 个体层级（接口实现）
//=============================================================================
//==============================
// * 个体层级 - 父贴图前面层 - 行走图
//==============================
var _drill_ABPa_layer_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function(){
	_drill_ABPa_layer_update.call(this);
	if( this._drill_animPFrontArea == undefined ){		//父贴图前面层（行走图）
		this._drill_animPFrontArea = new Sprite();
		this.addChild(this._drill_animPFrontArea);
	}
};
//==============================
// * 个体层级 - 父贴图前面层 - 单位贴图
//==============================
var _drill_ABPa_layer_update2 = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function(){
	_drill_ABPa_layer_update2.call(this);
	if( this._drill_animPFrontArea == undefined ){		//父贴图前面层（单位贴图）
		this._drill_animPFrontArea = new Sprite();
		this.addChild(this._drill_animPFrontArea);
	}
};
//==============================
// * 个体层级 - 父贴图后面层 - 地图界面
//==============================
var _drill_ABPa_layer_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	
	if( this._drill_animPBackArea == undefined ){		//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0.85;				//（在中层上面，事件后面）
		this._tilemap.addChild(this._drill_animPBackArea);
	}
	
	_drill_ABPa_layer_createCharacters.call(this);
};
//==============================
// * 个体层级 - 父贴图后面层 - 战斗界面
//==============================
var _drill_ABPa_layer_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    
	if( !this._drill_animPBackArea ){			//父贴图后面层
		this._drill_animPBackArea = new Sprite();
		this._drill_animPBackArea.z = 0;		//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_animPBackArea);
	}
	
	_drill_ABPa_layer_createEnemies.call(this);	
};
//==============================
// * 个体层级 - 添加贴图到层级（私有）
//==============================
Game_Temp.prototype.drill_ABPa_layerAddSprite_Private = function( sprite, layer_index, individual_sprite ){
	if( layer_index == "父贴图后面层" || layer_index == "在父贴图后面" ){
		if( $gameTemp._drill_spritesetCreated != true ){ return; }
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
	if( layer_index == "父贴图前面层" || layer_index == "在父贴图前面" ){
		individual_sprite._drill_animPFrontArea.addChild( sprite );
	}
};
//==============================
// * 个体层级 - 层级锁 - 地图界面
//==============================
var _drill_ABPa_layerMap_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
	$gameTemp._drill_spritesetCreated = false;
	_drill_ABPa_layerMap_createDisplayObjects.call(this);
	$gameTemp._drill_spritesetCreated = true;
};
//==============================
// * 个体层级 - 层级锁 - 战斗界面
//==============================
var _drill_ABPa_layerBattle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
	$gameTemp._drill_spritesetCreated = false;
	_drill_ABPa_layerBattle_createDisplayObjects.call(this);
	$gameTemp._drill_spritesetCreated = true;
};
//==============================
// * 个体层级 - 去除贴图（私有）
//==============================
Game_Temp.prototype.drill_ABPa_layerRemoveSprite_Private = function( sprite ){
	if( sprite == undefined ){ return; }
	
	// > 销毁
	sprite.drill_ABPa_destroy();
	
	// > 断开父类
	if( sprite.parent != undefined ){
		sprite.parent.removeChild( sprite );
	}
};


//=============================================================================
// ** 外部控制
//=============================================================================
//==============================
// * 外部控制 - 容器初始化
//==============================
var _drill_ABPa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_ABPa_temp_initialize.call(this);
	this._drill_ABPa_spriteTank = [];			//贴图容器
};
//==============================
// * 外部控制 - 创建贴图
//
//			说明：	执行一次，则创建一次。
//==============================
Game_Temp.prototype.drill_ABPa_createSprite = function( style_id, individual_sprite ){
	if( $gameTemp._drill_spritesetCreated != true ){ return; }
	
	// > 创建贴图
	var data =  DrillUp.g_ABPa_style[ style_id ];
	var temp_sprite = new Drill_ABPa_Sprite( data );
	temp_sprite.drill_ABPa_setIndividualSprite( individual_sprite );	//（绑定个体贴图）
	this._drill_ABPa_spriteTank.push( temp_sprite );
	
	// > 添加贴图到层级
	$gameTemp.drill_ABPa_layerAddSprite( temp_sprite, data['anim_index'], individual_sprite );
};
//==============================
// * 外部控制 - 帧刷新 - 地图界面
//==============================
var _drill_ABPa_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_ABPa_smap_update.call(this);
	this.drill_ABPa_updateInScene();
}
Scene_Map.prototype.drill_ABPa_updateInScene = function() {
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_ABPa_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_ABPa_spriteTank[i];
		
		// > 自动销毁 - 贴图本身为空
		if( temp_sprite == undefined ){
			$gameTemp._drill_ABPa_spriteTank.splice(i,1);
			continue;
		}
		
		// > 自动销毁 - 贴图生命周期结束
		if( temp_sprite.drill_ABPa_isNeedDestroy() ){
			$gameTemp.drill_ABPa_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_ABPa_spriteTank.splice(i,1);
			delete temp_sprite;
		}
	}
};



//=============================================================================
// ** 小爆炸粒子贴图【Drill_ABPa_Sprite】
// **
// **		作用域：	地图界面、战斗界面
// **		主功能：	> 定义一个粒子贴图。
// **		子功能：	->贴图初始化（手动）
// **					->销毁（手动）
// **					->层级位置修正
// **
// **		说明：	> 此贴图不使用弹道，不使用 贴图-数据 分离形式。
// **				  完全处于性能考虑，只使用最单一原始的贴图结构。
// **
// **		代码：	> 范围 - 该类只显示一次性贴图。
// **				> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 由于动画存放在temp的容器中，销毁仍然需要外部来控制。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_ABPa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_ABPa_Sprite.prototype = Object.create(Sprite.prototype);
Drill_ABPa_Sprite.prototype.constructor = Drill_ABPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_ABPa_Sprite.prototype.initialize = function( data ){
	Sprite.prototype.initialize.call(this);
	this._drill_data = data;		//设置数据（直接用指针，只读）
	this.drill_ABPa_initSprite();	//贴图初始化
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_ABPa_Sprite.prototype.update = function() {
	if( this.drill_ABPa_isReady() == false ){ return; }
	if( this.drill_ABPa_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_updateParticle();	//帧刷新 - 粒子
	this.drill_updatePosition();	//帧刷新 - 位置
	this.drill_updateLife();		//帧刷新 - 生命周期
};
//##############################
// * 粒子贴图 - 设置个体贴图【开放函数】
//			
//			参数：	> individual_sprite 贴图对象
//			返回：	> 无
//			
//			说明：	> 由于贴图随时会变换位置，贴图必须标记个体贴图。
//##############################
Drill_ABPa_Sprite.prototype.drill_ABPa_setIndividualSprite = function( individual_sprite ){
	this._drill_individualSprite = individual_sprite;
};
//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_ABPa_Sprite.prototype.drill_ABPa_isReady = function(){
	if( this._drill_bitmap.isReady() == false ){ return false; }
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
Drill_ABPa_Sprite.prototype.drill_ABPa_isOptimizationPassed = function(){
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
Drill_ABPa_Sprite.prototype.drill_ABPa_isNeedDestroy = function(){
	if( this._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 粒子贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数由外部控制执行。
//##############################
Drill_ABPa_Sprite.prototype.drill_ABPa_destroy = function(){
	this.drill_ABPa_destroy_Private();
};
//==============================
// * 粒子贴图 - 贴图初始化
//==============================
Drill_ABPa_Sprite.prototype.drill_ABPa_initSprite = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;
	this._drill_individualSprite = null;
	this._drill_needDestroy = false;
	
	// > 私有属性初始化
	this.x = 0;
	this.y = 0;
	this.blendMode = data['blendMode'];
	this.zIndex = data['zIndex'];
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.opacity = 255;
	this.visible = true;
	
	// > 粒子资源
	this._drill_bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'], 0, true );
	
	
	// > 粒子群弹道 - 随机因子
	this._drill_randomFactor_speed = Math.random();
	this._drill_randomFactor_dir = Math.random();
	this._drill_randomFactor_opacity = Math.random();
	if( data['seed_enable'] == true ){
		this._drill_randomFactor_speed = data['seed_value'] %1;
		this._drill_randomFactor_dir = data['seed_value'] *41 %1;
		this._drill_randomFactor_opacity = data['seed_value'] *71 %1;
	}
	
	// > 粒子群弹道 - 弹道数据
	this._drill_ABPa_ballistics_move = {};
	this._drill_ABPa_ballistics_opacity = {};
    this.drill_initBallisticsMove( data, data, data['par_life'] );		//弹道初始化（坐标）
    this.drill_initBallisticsOpacity( data, data['par_life'] );			//弹道初始化（透明度）
	
	// > 粒子群弹道 - 粒子初始化
	this._drill_ABPa_parBMoveX = [];
	this._drill_ABPa_parBMoveY = [];
	this._drill_ABPa_parBOpacity = [];
	this._drill_ABPa_parTank = [];					//粒子贴图容器
	for( var i = 0; i < data['par_count'] ; i++ ){
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = this._drill_bitmap;
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.opacity = 0;
		this.addChild(temp_sprite);
		this._drill_ABPa_parTank.push(temp_sprite);
		
		// > 单个粒子初始化
		this.drill_ABPa_resetParticles( temp_sprite, i );
	}
};
//==============================
// * 粒子贴图 - 销毁（私有）
//==============================
Drill_ABPa_Sprite.prototype.drill_ABPa_destroy_Private = function(){
	
	// > 贴图销毁
	for( var i=0; i < this._drill_ABPa_parTank.length; i++ ){
		var par_sprite = this._drill_ABPa_parTank[i];
		this.removeChild( par_sprite );
	}
	this._drill_ABPa_parTank = null;
	
	// > 指针清空
	this._drill_data = null;
};
//==============================
// * 粒子群弹道 - 弹道初始化（坐标）
//
//			说明：	> 只存 弹道配置，不存 实际弹道。包括随机因子、随机迭代次数。
//					> 实际弹道只在贴图中进行推演并使用。
//==============================
Drill_ABPa_Sprite.prototype.drill_initBallisticsMove = function( data, b_data, sustain ){
	
	// > 弹道初始化（坐标）
	var temp_b_move = {}
	
	//   移动（movement）
	temp_b_move['movementNum'] = data["par_count"];								//数量
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
	temp_b_move['polarSpeedRandomFactor'] = this._drill_randomFactor_speed;	//极坐标 - 速度 - 随机因子
	temp_b_move['polarDirRandomFactor'] = this._drill_randomFactor_dir;		//极坐标 - 方向 - 随机因子
	// > 随机迭代次数（RandomIteration）
	//		（不迭代）
	
	// > 生成参数数据
	this._drill_ABPa_ballistics_move = $gameTemp.drill_COBa_setBallisticsMove( temp_b_move );
}
//==============================
// * 粒子群弹道 - 弹道初始化（透明度）
//
//			说明：	> 只存 弹道配置，不存 实际弹道。包括随机因子、随机迭代次数。
//					> 实际弹道只在贴图中进行推演并使用。
//==============================
Drill_ABPa_Sprite.prototype.drill_initBallisticsOpacity = function( data, sustain ){
	
	// > 弹道初始化（透明度）
	var temp_b_opacity = {};
	temp_b_opacity['opacityNum'] = data["par_count"];		//数量
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
			"【Drill_EventFrameParticle.js 行走图-多层行走图粒子】\n"+
			"透明度类型错误，没有类型'" + data['par_opacityMode'] + "'。"
		);
	}
	
	// > 随机因子（RandomFactor）
	//		（每个粒子对应一个随机因子，掌握一条弹道。）
	temp_b_opacity['randomFactor'] = this._drill_randomFactor_opacity;
	// > 随机迭代次数（RandomIteration）
	//		（不迭代）
	
	// > 生成参数数据
	this._drill_ABPa_ballistics_opacity = $gameTemp.drill_COBa_setBallisticsOpacity( temp_b_opacity );
}
//==============================
// * 粒子贴图 - 单个粒子初始化
//
//			说明：	粒子只播放一次，不要考虑重设问题。
//==============================
Drill_ABPa_Sprite.prototype.drill_ABPa_resetParticles = function( par_sprite, i ){
	var data = this._drill_data;
	
	// > 粒子效果 - 粒子自旋转速度
	if( data['par_selfRotate'] != 0 ){
		par_sprite.rotation = 2*Math.PI*Math.random();
	}
	
	// > 粒子效果 - 粒子出现范围
	par_sprite._drill_startX = data['par_birthRange'] * Math.cos( 2*Math.PI*Math.random() );
	par_sprite._drill_startY = data['par_birthRange'] * Math.sin( 2*Math.PI*Math.random() );
	
	// > 粒子效果 - 粒子方向模式
	//		（如果为线性的四周扩散，则随机旋转角）
	if( data['par_dirMode'] == "四周扩散(线性)" ){
		data['par_dirFix'] = Math.random() * 360;
	}
	
	// > 粒子群弹道 - 预推演（坐标）
	$gameTemp._drill_COBa_moveData = this._drill_ABPa_ballistics_move;
	$gameTemp.drill_COBa_preBallisticsMove( this, i, 0, 0 );
	this._drill_ABPa_parBMoveX[i] = this._drill_COBa_x;
	this._drill_ABPa_parBMoveY[i] = this._drill_COBa_y;
	this._drill_COBa_x = null;
	this._drill_COBa_y = null;
	
	// > 粒子群弹道 - 预推演（透明度）
	$gameTemp._drill_COBa_commonData = this._drill_ABPa_ballistics_opacity;
	$gameTemp.drill_COBa_preBallisticsOpacity( this, i, 0 );
	this._drill_ABPa_parBOpacity[i] = this._drill_COBa_opacity;
	this._drill_COBa_opacity = null;
	
	
	// > 粒子效果 - 粒子缩放模式
	if( data['par_scaleMode'] == "固定缩放值" ){
		par_sprite.scale.x = data['par_scaleBase'];
		par_sprite.scale.y = data['par_scaleBase'];
	}
	if( data['par_scaleMode'] == "缩放值+波动量" ){
		par_sprite.scale.x = data['par_scaleBase'] + (Math.random() - 0.5) * data['par_scaleRandom'];
		par_sprite.scale.y = data['par_scaleBase'] + (Math.random() - 0.5) * data['par_scaleRandom'];
	}
	
};

//==============================
// * 帧刷新 - 粒子
//==============================
Drill_ABPa_Sprite.prototype.drill_updateParticle = function() {
	var data = this._drill_data;
	
	// > 粒子贴图容器
	for(var i = 0; i < this._drill_ABPa_parTank.length; i++ ){
		var par_sprite = this._drill_ABPa_parTank[i];
		var time = this._drill_curTime;
		if( time >= data['par_life'] ){
			time = data['par_life']-1;
		}
		
		// > 粒子弹道倒放
		if( data['par_backrun'] == true ){
			time = data['par_life'] -time -1;
		}
		
		var xx = par_sprite._drill_startX;
		var yy = par_sprite._drill_startY;
		var oo = 0;
		
		// > 位置（粒子群弹道）
		xx += this._drill_ABPa_parBMoveX[i][ time ];
		yy += this._drill_ABPa_parBMoveY[i][ time ];
		// > 位置
		par_sprite.x = xx;
		par_sprite.y = yy;
		
		// > 透明度（粒子群弹道）
		oo = this._drill_ABPa_parBOpacity[i][ time ];
		// > 透明度
		par_sprite.opacity = oo;
		
		// > 自旋转
		par_sprite.rotation += data['par_selfRotate'] /180*Math.PI;
	};
};
//==============================
// * 帧刷新 - 生命周期
//==============================
Drill_ABPa_Sprite.prototype.drill_updateLife = function() {
	var data = this._drill_data;
	
	// > 时间+1
	this._drill_curTime += 1;
	
	// > 销毁判定
	if( this._drill_curTime > data['par_life'] ){
		this._drill_needDestroy = true;
		this.visible = false;
	}
};
//==============================
// * 帧刷新 - 位置
//==============================
Drill_ABPa_Sprite.prototype.drill_updatePosition = function() {
	var data = this._drill_data;
	var xx = 0;
	var yy = 0;
	
	xx += data['x'];
	yy += data['y'];
	
	// > 层级位置修正
	if( data['anim_index'] == "父贴图后面层" || data['anim_index'] == "在父贴图后面" ){
		xx += this._drill_individualSprite.x;
		yy += this._drill_individualSprite.y;
			
		// > 敌人位置修正
		if( this._drill_individualSprite instanceof Sprite_Enemy ){
			yy -= this._drill_individualSprite.height*0.5;
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
			yy -= 24;
		}
	}
	
	this.x = xx;
	this.y = yy;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_AnimationBlastingParticle = false;
		var tip = DrillUp.drill_ABPa_getPluginTip_NoBasePlugin();
		alert( tip );
}

