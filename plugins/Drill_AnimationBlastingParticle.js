//=============================================================================
// Drill_AnimationBlastingParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        动画 - 粒子小爆炸
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
 * 使得你可以通过插件指令播放一个粒子小爆炸的临时动画，基于个体装饰。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfParticle       系统-粒子核心
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于玩家、事件、战斗单位。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
 * 细节：
 *   (1.粒子小爆炸是一个插件指令直接控制的动画。
 *      此动画基于个体装饰，需要绑定在 玩家/事件/角色/敌人 身上。
 * 设计：
 *   (1.你可以给能拾取的道具事件，设置拾取后，播放粒子小爆炸效果。
 *      类似于得分道具的反馈。
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
 * [v1.1]
 * 强化了粒子核心底层，并进行兼容适配。
 * [v1.2]
 * 添加了粒子 彩虹化 功能。
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
 * @param 所在层级
 * @parent ---贴图---
 * @type select
 * @option 在父贴图后面
 * @value 在父贴图后面
 * @option 在父贴图前面
 * @value 在父贴图前面
 * @desc 粒子所属的所在层级。父贴图后面是指：战斗时，敌人/玩家贴图的后面，地图中，事件贴图的后面。
 * @default 在父贴图前面
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个动画，并且在同一所在层级下，先后排序的位置，0表示最后面。
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
 * @desc 以目标中心为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。设置0表示粒子全部集中于圆心。
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
 * @default (需配置)第二层粒子
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 * @param 第二层粒子所在层级
 * @parent ---双层效果---
 * @type select
 * @option 在父贴图后面
 * @value 在父贴图后面
 * @option 在动画后面
 * @value 在动画后面
 * @option 在动画前面
 * @value 在动画前面
 * @desc 第二层粒子所属的层级。父贴图后面是指：战斗时，敌人/玩家贴图的后面，地图中，事件贴图的后面。
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
//		★性能测试因素	个体装饰管理层、战斗界面
//		★性能测试消耗	2024/5/10：
//							》43.7ms（update）52.9ms（drill_updateParticle）
//		★最坏情况		大量小爆炸被同时播放。
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
//			->☆场景容器之单位贴图
//			->☆场景容器之物体贴图
//			->☆个体层级
//				> 父贴图前面层（_drill_animPFrontArea）
//				> 父贴图后面层（_drill_animPBackArea）
//			
//			->☆贴图控制
//				->帧刷新（地图界面）
//				->帧刷新（战斗界面）
//			
//			->小爆炸粒子控制器【Drill_ABPa_Controller】
//			->小爆炸粒子贴图【Drill_ABPa_Sprite】
//			->小爆炸粒子贴图（第二层）【Drill_ABPa_SecSprite】
//			
//			
//		★家谱：
//			大家族-粒子效果
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//		
//		★插件私有类：
//			* 小爆炸粒子控制器【Drill_ABPa_Controller】
//			* 小爆炸粒子贴图【Drill_ABPa_Sprite】
//			* 小爆炸粒子贴图（第二层）【Drill_ABPa_SecSprite】
//		
//		★必要注意事项：
//			1.插件继承至 粒子核心。
//			  核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//			2.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//				_drill_animPBackArea 			父贴图后面层
//				_drill_animPFrontArea			父贴图前面层
//
//		★其它说明细节：
//			暂无
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
	DrillUp.g_ABPa_PluginTip_curName = "Drill_AnimationBlastingParticle.js 动画-粒子小爆炸";
	DrillUp.g_ABPa_PluginTip_baseList = ["Drill_CoreOfParticle.js 系统-粒子核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_ABPa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_ABPa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_ABPa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_ABPa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_ABPa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_ABPa_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_ABPa_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_ABPa_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_ABPa_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_AnimationBlastingParticle = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AnimationBlastingParticle');
	
	//==============================
	// * 静态数据 - 粒子样式
	//				（~struct~ABPaStyle）
	//==============================
	DrillUp.drill_ABPa_styleInit = function( dataFrom ){
		var data = {};
		
		// > 控制器
		data['visible'] = true;
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/Special__anim/";
		data['x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['opacity'] = 255;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['individualIndex'] = String( dataFrom["所在层级"] || "在父贴图前面");
		data['zIndex'] = Number( dataFrom["图片层级"] || 4);
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 15);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
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
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "固定角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_individualIndex'] = String( dataFrom["第二层粒子所在层级"] || "在父贴图前面");
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
	DrillUp.g_ABPa_style_length = 200;
	DrillUp.g_ABPa_style = [];
	for (var i = 0; i < DrillUp.g_ABPa_style_length; i++) {
		if( DrillUp.parameters['粒子样式-' + String(i+1) ] != undefined && 
			DrillUp.parameters['粒子样式-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['粒子样式-' + String(i+1) ]);
			DrillUp.g_ABPa_style[i] = DrillUp.drill_ABPa_styleInit( data );
			DrillUp.g_ABPa_style[i]['inited'] = true;
		}else{
			DrillUp.g_ABPa_style[i] = DrillUp.drill_ABPa_styleInit( {} );
			DrillUp.g_ABPa_style[i]['inited'] = false;
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
var _drill_ABPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_ABPa_pluginCommand.call(this, command, args);
	this.drill_ABPa_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_ABPa_pluginCommand = function( command, args ){
	if( command === ">动画粒子小爆炸" ){
		
		/*-----------------对象组获取 - 物体------------------*/
		var charSprite_list = null;
		if( args.length >= 4 ){
			var unit = String(args[3]);
			if( charSprite_list == null && unit == "本事件" ){
				var charSprite = $gameTemp.drill_ABPa_getCharacterSpriteByEventId( this._eventId );
				if( charSprite == undefined ){ return; }	//『防止并行删除事件出错』
				charSprite_list = [];
				charSprite_list.push( charSprite );
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
				charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByFollowerIndex( -2 ) );  //『玩家id』
			}
			if( charSprite_list == null && unit == "玩家全员" ){
				charSprite_list = [];
				charSprite_list.push( $gameTemp.drill_ABPa_getCharacterSpriteByFollowerIndex( -2 ) );  //『玩家id』
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
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ABPa_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_ABPa_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】单位贴图容器 ☆场景容器之单位贴图
//#############################################################################
//##############################
// * 单位贴图容器 - 获取 - 敌人容器指针【标准函数】
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
// * 单位贴图容器 - 获取 - 根据敌方索引【标准函数】
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
// * 单位贴图容器 - 获取 - 根据敌人ID【标准函数】
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
// * 单位贴图容器 - 获取 - 角色容器指针【标准函数】
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
// * 单位贴图容器 - 获取 - 根据我方索引【标准函数】
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
// * 单位贴图容器 - 获取 - 根据角色ID【标准函数】
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
// ** 场景容器之单位贴图（实现）
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
// ** 【标准模块】物体贴图容器 ☆场景容器之物体贴图
//#############################################################################
//##############################
// * 物体贴图容器 - 获取 - 容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组     （物体贴图）
//          
//			说明：	> 此函数直接返回容器对象。不含镜像。
//##############################
Game_Temp.prototype.drill_ABPa_getCharacterSpriteTank = function(){
	return this.drill_ABPa_getCharacterSpriteTank_Private();
}
//##############################
// * 物体贴图容器 - 获取 - 根据事件ID【标准函数】
//			
//			参数：	> event_id 数字（事件ID）
//			返回：	> 贴图对象     （事件贴图）
//          
//			说明：	> -2表示玩家，1表示第一个事件的贴图。不含镜像。
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//##############################
Game_Temp.prototype.drill_ABPa_getCharacterSpriteByEventId = function( event_id ){
	return this.drill_ABPa_getCharacterSpriteByEventId_Private( event_id );
}
//##############################
// * 物体贴图容器 - 获取 - 根据玩家队员索引【标准函数】
//			
//			参数：	> follower_index 数字（玩家队员索引）
//			返回：	> 贴图对象           （玩家队员贴图）
//          
//			说明：	> -2表示玩家，1表示第一个玩家队员的贴图。不含镜像。
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//##############################
Game_Temp.prototype.drill_ABPa_getCharacterSpriteByFollowerIndex = function( follower_index ){
	return this.drill_ABPa_getCharacterSpriteByFollowerIndex_Private( follower_index );
}
//=============================================================================
// ** 场景容器之物体贴图（实现）
//=============================================================================
//==============================
// * 物体贴图容器 - 获取 - 容器指针（私有）
//          
//			说明：	> 贴图容器 _characterSprites，存放全部物体贴图，不含镜像贴图。
//					  这只是一个贴图容器，即使贴图在其他层级，也不影响容器获取到贴图。（更多细节去看 脚本文档说明）
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
		if( sprite._character == undefined ){ continue; }		//（判断 _character 就可以，不需要检验 Sprite_Character）
		if( event_id == -2 &&   //『玩家id』
			sprite._character == $gamePlayer ){
			return sprite;
		}
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
		if( sprite._character == undefined ){ continue; }	//（判断 _character 就可以，不需要检验 Sprite_Character）
		if( follower_index == -2 &&   //『玩家id』
			sprite._character == $gamePlayer ){
			return sprite;
		}
		if( sprite._character._memberIndex == follower_index &&
			sprite._character.isVisible() ){
			return sprite;
		}
	}
	return null;
};


//#############################################################################
// ** 【标准模块】个体层级 ☆个体层级
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
		this._drill_animPBackArea.z = 0.75;				//（在中层上面，事件后面）
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
	sprite.drill_sprite_destroy();
	
	// > 断开父类
	if( sprite.parent != undefined ){
		sprite.parent.removeChild( sprite );
	}
};


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 容器初始化
//==============================
var _drill_ABPa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_ABPa_temp_initialize.call(this);
	this._drill_ABPa_controllerTank = [];		//数据容器
	this._drill_ABPa_spriteTank = [];			//贴图容器
};
//==============================
// * 贴图控制 - 创建数据/创建贴图
//
//			说明：	> 执行一次，则创建一次。
//==============================
Game_Temp.prototype.drill_ABPa_createSprite = function( style_id, individual_sprite ){
	if( $gameTemp._drill_spritesetCreated != true ){ return; }
	
	// > 『控制器与贴图的样式』 - 校验+提示信息
	var cur_styleId   = style_id +1;
	var cur_styleData = DrillUp.g_ABPa_style[ style_id ];
	if( cur_styleData == undefined || 
		cur_styleData['inited'] == false ){
		alert( DrillUp.drill_ABPa_getPluginTip_StyleNotFind(cur_styleId) );
		return;
	}
	
	// > 『控制器与贴图的样式』 - 创建控制器
	var temp_controller = new Drill_ABPa_Controller( cur_styleData );
	this._drill_ABPa_controllerTank.push( temp_controller );
	
	// > 创建贴图
	var temp_sprite = new Drill_ABPa_Sprite();
	temp_sprite.drill_sprite_setController( temp_controller );
	temp_sprite.drill_ABPa_setIndividualSprite( individual_sprite );
	temp_sprite.drill_sprite_initChild();
	
	
	// > 双层效果
	if( temp_controller._drill_data['second_enable'] == true ){
		
		// > 双层效果 - 创建贴图
		var temp_secSprite = new Drill_ABPa_SecSprite( temp_sprite );
		
		// > 双层效果 - 添加贴图到层级（先添加）
		this._drill_ABPa_spriteTank.push( temp_secSprite );
		this.drill_ABPa_layerAddSprite( temp_secSprite, temp_controller._drill_data['second_individualIndex'], individual_sprite );
	}
	
	
	// > 添加贴图到层级
	this._drill_ABPa_spriteTank.push( temp_sprite );
	this.drill_ABPa_layerAddSprite( temp_sprite, temp_controller._drill_data['individualIndex'], individual_sprite );
	
	// > 层级排序
	//（暂时不排了，浪费资源）
};
//==============================
// * 贴图控制 - 帧刷新（地图界面）
//==============================
var _drill_ABPa_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_ABPa_smap_update.call(this);
	this.drill_ABPa_updateInScene();
}
Scene_Map.prototype.drill_ABPa_updateInScene = function() {
	
	// > 帧刷新 - 控制器
	for(var i = $gameTemp._drill_ABPa_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameTemp._drill_ABPa_controllerTank[i];
		temp_controller.drill_controller_update();
	}
	
	// > 自动销毁 - 控制器
	for(var i = $gameTemp._drill_ABPa_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameTemp._drill_ABPa_controllerTank[i];
		if( temp_controller.drill_ABPa_isDead() ){
			$gameTemp._drill_ABPa_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_ABPa_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_ABPa_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			$gameTemp.drill_ABPa_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_ABPa_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};
//==============================
// * 动画控制 - 帧刷新（战斗界面）
//==============================
var _drill_ABPa_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_ABPa_sbattle_update.call(this);
	this.drill_ABPa_updateInScene();
}
Scene_Battle.prototype.drill_ABPa_updateInScene = Scene_Map.prototype.drill_ABPa_updateInScene;

	

//=============================================================================
// ** 小爆炸粒子控制器【Drill_ABPa_Controller】
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
// **					
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_ABPa_Controller(){
    this.initialize.apply(this, arguments);
};
Drill_ABPa_Controller.prototype = Object.create(Drill_COPa_Controller.prototype);
Drill_ABPa_Controller.prototype.constructor = Drill_ABPa_Controller;
//==============================
// * 控制器 - 初始化
//==============================
Drill_ABPa_Controller.prototype.initialize = function( data ){
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
Drill_ABPa_Controller.prototype.drill_controller_update = function(){
    Drill_COPa_Controller.prototype.drill_controller_update.call( this );
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
Drill_ABPa_Controller.prototype.drill_controller_resetData = function( data ){
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
Drill_ABPa_Controller.prototype.drill_controller_setVisible = function( visible ){
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
Drill_ABPa_Controller.prototype.drill_controller_setPause = function( pause ){
    Drill_COPa_Controller.prototype.drill_controller_setPause.call( this, pause );
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_ABPa_Controller.prototype.drill_controller_destroy = function(){
    Drill_COPa_Controller.prototype.drill_controller_destroy.call( this );
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_ABPa_Controller.prototype.drill_ABPa_isDead = function(){
	return Drill_COPa_Controller.prototype.drill_controller_isDead.call( this );
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
Drill_ABPa_Controller.prototype.drill_controller_initData = function(){
	Drill_COPa_Controller.prototype.drill_controller_initData.call( this );
	var data = this._drill_data;
	
	// > 贴图
	data['src_img_file'] = "img/Special__anim/";
	data['trailing_src_img_file'] = "img/Special__anim/";
	if( data['individualIndex'] == undefined ){ data['individualIndex'] = "在父贴图前面" };				//贴图 - 所在层级（贴图用）
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };											//贴图 - 图片层级（贴图用）
	
	// > D粒子变化
	if( data['par_holdingBirthPosition'] == undefined ){ data['par_holdingBirthPosition'] = false };	//D粒子变化 - 粒子是否滞留
	
	// > E粒子重设
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };							//E粒子重设 - 粒子出现范围
	
	// > F双层效果
	if( data['second_individualIndex'] == undefined ){ data['second_individualIndex'] = "" };			//F双层效果 - 第二层粒子层级
	if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 3 };								//F双层效果 - 第二层粒子图片层级
	
	// > I粒子生命周期
	data['par_lifeType'] = "同时产生(一次性)";
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_ABPa_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_Controller.prototype.drill_controller_initChild.call( this );
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_ABPa_Controller.prototype.drill_controller_initAttr = function() {
	Drill_COPa_Controller.prototype.drill_controller_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_ABPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
}
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_ABPa_Controller.prototype.drill_controller_initBallistics = function() {
	Drill_COPa_Controller.prototype.drill_controller_initBallistics.call( this );
}
//==============================
// * C随机因子 - 初始化子功能
//==============================
Drill_ABPa_Controller.prototype.drill_controller_initRandom = function() {
	Drill_COPa_Controller.prototype.drill_controller_initRandom.call( this );
}
//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_ABPa_Controller.prototype.drill_controller_initTransform = function() {
	Drill_COPa_Controller.prototype.drill_controller_initTransform.call( this );
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_ABPa_Controller.prototype.drill_controller_initReset = function() {
	Drill_COPa_Controller.prototype.drill_controller_initReset.call( this );
}
//==============================
// * E粒子重设 - 帧刷新
//==============================
Drill_ABPa_Controller.prototype.drill_controller_updateReset = function() {
	Drill_COPa_Controller.prototype.drill_controller_updateReset.call( this );
}
//==============================
// * E粒子重设 - 执行重设 - 位置
//
//			说明：	> 由于当前插件为 个体装饰，因此起始点为 一个圆内随机出现 。
//==============================	
Drill_ABPa_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	Drill_COPa_Controller.prototype.drill_controller_resetParticles_Position.call( this, i );
	var data = this._drill_data;
	var cur_iteration = this._drill_parList_randomIteration[i];
	
	var angle = 360 * this.drill_controller_curRandom( cur_iteration*i +41*i );		//（一个圆内随机出现）
	var radius = data['par_birthRange'] * this.drill_controller_curRandom( cur_iteration*i +43*i +1000 );
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



//=============================================================================
// ** 小爆炸粒子贴图【Drill_ABPa_Sprite】
// **
// **		作用域：	地图界面、战斗界面
// **		主功能：	定义一个粒子贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
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
function Drill_ABPa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_ABPa_Sprite.prototype = Object.create(Drill_COPa_Sprite.prototype);
Drill_ABPa_Sprite.prototype.constructor = Drill_ABPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_ABPa_Sprite.prototype.initialize = function(){
    Drill_COPa_Sprite.prototype.initialize.call( this );
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_ABPa_Sprite.prototype.update = function() {
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
Drill_ABPa_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 设置个体贴图【开放函数】
//			
//			参数：	> individual_sprite 贴图对象
//			返回：	> 无
//##############################
Drill_ABPa_Sprite.prototype.drill_ABPa_setIndividualSprite = function( individual_sprite ){
	this._drill_individualSprite = individual_sprite;
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器和个体贴图 之后，才能进行手动初始化。
//##############################
Drill_ABPa_Sprite.prototype.drill_sprite_initChild = function(){
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
Drill_ABPa_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_individualSprite == undefined ){ return false; }		//（必须配置个体贴图）
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
Drill_ABPa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
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
Drill_ABPa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
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
Drill_ABPa_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_ABPa_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_initSelf.call( this );
	this._drill_individualSprite = null;		//个体贴图
};
//==============================
// * 粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_ABPa_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_ABPa_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_Sprite.prototype.drill_sprite_destroySelf.call( this );
	this._drill_individualSprite = null;		//个体贴图
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_ABPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private = function(){
	return Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private.call( this );
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_ABPa_Sprite.prototype.drill_sprite_initAttr = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initAttr.call( this );
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_ABPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
	this.zIndex = this._drill_controller._drill_data['zIndex'];
};
//==============================
// * A主体 - 帧刷新 - 位置
//==============================
Drill_ABPa_Sprite.prototype.drill_sprite_updateAttr_Position = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Position.call( this );
	var data = this._drill_controller._drill_data;
	var xx = 0;
	var yy = 0;
	
	// > 层级位置修正
	var cur_layer = data['individualIndex'];
	if( cur_layer == "父贴图前面层" || cur_layer == "在父贴图前面" ){
		
		// > 敌人位置修正
		if( this._drill_individualSprite instanceof Sprite_Enemy ){
			//（前面层，不需要包含父贴图的位置）
			yy -= this._drill_individualSprite.height*0.5;
		}
		// > 角色位置修正
		if( this._drill_individualSprite instanceof Sprite_Actor ){
			//（前面层，不需要包含父贴图的位置）
			// > 第一人称位置修正（战斗镜头）
			if( Imported.Drill_BattleCamera && !$gameSystem.isSideView() ){		//（在图层内）
				var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
				xx -= camera_pos.x;
				yy -= camera_pos.y;
			}
		}
		// > 物体位置修正
		if( this._drill_individualSprite instanceof Sprite_Character ){
			//（前面层，不需要包含父贴图的位置）
			yy -= 24;
		}
	}
	if( cur_layer == "父贴图后面层" || cur_layer == "在父贴图后面" ){
		
		// > 敌人位置修正
		if( this._drill_individualSprite instanceof Sprite_Enemy ){
			xx += this._drill_individualSprite.x;
			yy += this._drill_individualSprite.y;
			yy -= this._drill_individualSprite.height*0.5;
		}
		// > 角色位置修正
		if( this._drill_individualSprite instanceof Sprite_Actor ){
			xx += this._drill_individualSprite.x;
			yy += this._drill_individualSprite.y;
			// > 第一人称位置修正（战斗镜头）
			if( Imported.Drill_BattleCamera && !$gameSystem.isSideView() ){		//（在图层内）
				var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
				xx -= camera_pos.x;
				yy -= camera_pos.y;
			}
		}
		// > 物体位置修正
		if( this._drill_individualSprite instanceof Sprite_Character ){
			xx += this._drill_individualSprite.x;
			yy += this._drill_individualSprite.y;
			yy -= 24;
		}
	}
	
	this._drill_x += xx;
	this._drill_y += yy;
};
//==============================
// * A主体 - 帧刷新 - 可见
//==============================
Drill_ABPa_Sprite.prototype.drill_sprite_updateAttr_Visible = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Visible.call( this );
};
//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_ABPa_Sprite.prototype.drill_sprite_initBallistics = function() {
	
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
Drill_ABPa_Sprite.prototype.drill_sprite_refreshBallistics = function( i ){
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
Drill_ABPa_Sprite.prototype.drill_sprite_initTransform = function() {
    Drill_COPa_Sprite.prototype.drill_sprite_initTransform.call( this );
}
//==============================
// * D粒子变化 - 帧刷新 - 位置
//==============================
Drill_ABPa_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
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
Drill_ABPa_Sprite.prototype.drill_sprite_initReset = function() {
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
// ** 小爆炸粒子贴图（第二层）【Drill_ABPa_SecSprite】
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
function Drill_ABPa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_ABPa_SecSprite.prototype = Object.create(Drill_COPa_SecSprite.prototype);
Drill_ABPa_SecSprite.prototype.constructor = Drill_ABPa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_ABPa_SecSprite.prototype.initialize = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.initialize.call( this, parentSprite );
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_ABPa_SecSprite.prototype.update = function() {
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
Drill_ABPa_SecSprite.prototype.drill_spriteSec_isReady = function(){
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
Drill_ABPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
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
Drill_ABPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
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
Drill_ABPa_SecSprite.prototype.drill_spriteSec_destroy = function(){
    return Drill_COPa_SecSprite.prototype.drill_spriteSec_destroy.call(this);
};
//==============================
// * 第二层粒子 - 初始化子功能『控制器与贴图』
//==============================
Drill_ABPa_SecSprite.prototype.drill_spriteSec_initChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initChild.call( this );
};
//==============================
// * 第二层粒子 - 初始化自身『控制器与贴图』
//==============================
Drill_ABPa_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initSelf.call( this, parentSprite );
	this._drill_individualSprite = parentSprite._drill_individualSprite;	//个体贴图
};
//==============================
// * 第二层粒子 - 销毁子功能『控制器与贴图』
//==============================
Drill_ABPa_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroyChild.call( this );
};
//==============================
// * 第二层粒子 - 销毁自身『控制器与贴图』
//==============================
Drill_ABPa_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	Drill_COPa_SecSprite.prototype.drill_spriteSec_destroySelf.call( this );
	this._drill_individualSprite = null;		//个体贴图
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_ABPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private = function(){
	return Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private.call( this );
}

//==============================
// * A主体（第二层） - 初始化子功能
//==============================
Drill_ABPa_SecSprite.prototype.drill_spriteSec_initAttr = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initAttr.call( this );
	this.zIndex = this._drill_controller._drill_data['second_zIndex'];
};
//==============================
// * B粒子群弹道（第二层） - 初始化子功能
//==============================
Drill_ABPa_SecSprite.prototype.drill_spriteSec_initBallistics = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initBallistics.call( this );
};
//==============================
// * D粒子变化（第二层） - 初始化子功能
//==============================
Drill_ABPa_SecSprite.prototype.drill_spriteSec_initTransform = function() {
	Drill_COPa_SecSprite.prototype.drill_spriteSec_initTransform.call( this );
}
//==============================
// * E粒子重设（第二层） - 初始化子功能
//==============================
Drill_ABPa_SecSprite.prototype.drill_spriteSec_initReset = function() {
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
		Imported.Drill_AnimationBlastingParticle = false;
		var pluginTip = DrillUp.drill_ABPa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

