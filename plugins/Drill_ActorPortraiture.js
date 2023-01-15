//=============================================================================
// Drill_ActorPortraiture.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        战斗UI - 角色肖像
 * @author Drill_up
 * 
 * @Drill_LE_param "角色肖像-%d"
 * @Drill_LE_parentKey "----角色肖像%d至%d----"
 * @Drill_LE_var "DrillUp.g_AP_list_length"
 * 
 * @Drill_LE_param "肖像条件-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_AP_condition_list_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_ActorPortraiture +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置战斗当前角色的肖像,还可以配置不同条件下角色不同样子的肖像。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   角色肖像放置在 战斗上层 。
 * 2.如果你对角色肖像反应细节有更高要求，
 *   建议使用 Drill_ActorPortraitureExtend 高级角色肖像 插件。
 * 细节：
 *   (1.角色肖像的图片层级与所有处于战斗上层的相关插件的层级共享。
 *     （比如上层且图片层级大于100的战斗背景,会挡住角色肖像,反之在后面）
 *   (2.注意，该插件配置的坐标和平移与一般设定是相反的。
 *      一般设定X轴正数向右负数向左，这里是正数向左负数向右。
 *   (3.写在前面的条件优先处理，如果当前条件不符合后，才进入后面的条件判定。
 *      你可以设置满状态、满血、负伤、虚弱等的肖像，只要你有充足的美术资源。
 * 角色变动：
 *   (1.注意，战斗时如果执行了指令：角色入队、角色出队，那么插件指令的修改
 *      会被重置。
 * 设计：
 *   (1.你可以只配一种条件一张图片。也可以配置多种条件多张图片实现gif动作。
 *      你并不需要设置HP为0的肖像，因为角色死亡后是无法选择的。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Battle__portraiture （Battle后面有两个下划线）
 * 先确保项目img文件夹下是否有Battle__portraiture文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。这里需要在角色组中手动配置：
 * 
 * 角色肖像1-条件1-前视图（GIF）
 * 角色肖像1-条件1-背景图（GIF）
 * 角色肖像1-条件2-前视图（GIF）
 * 角色肖像1-条件2-背景图（GIF）
 * 角色肖像1-条件…
 * 角色肖像2-条件1-前视图（GIF）
 * 角色肖像2-条件2-前视图（GIF）
 * 角色肖像2-条件…
 * ……
 *
 * 你可以配置一个角色有多种状态图像，并且还可以是组成GIF的多张图像。
 * 
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 如果你想切换出角色特殊的状态肖像，可以使用下面插件指令:
 *
 * 插件指令：>角色肖像 : 我方 : 1 : 强制处于条件 : 4
 * 插件指令：>角色肖像 : 我方 : 1 : 解除强制条件
 * 
 * 插件指令：>角色肖像 : 角色 : 5 : 强制处于条件 : 4
 * 插件指令：>角色肖像 : 角色 : 5 : 解除强制条件
 *
 * 1."我方"表示角色队伍中第1个角色，这个角色强制处于条件id为4的条件。
 *   "角色"表示角色id为5的角色，这个角色强制处于条件id为4的条件。
 *   如果处于的条件内容为空，那么插件指令没有任何效果。
 * 2.战斗结束后肖像自动解除强制条件。
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
 * 测试方法：   进入战斗界面，进行相关的性能测试。
 * 测试结果：   1个角色的消耗为：【21.33ms】
 *              4个角色的消耗为：【37.60ms】
 *              8个角色的消耗为：【57.92ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.注意，角色数量 能够使得角色立绘计算量倍增。
 *   因为每个角色都配有许多图片资源。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件关联的资源文件夹。
 * [v1.2]
 * 添加了最大值编辑的支持。
 * [v1.3]
 * 添加了长期保持角色在战斗界面的功能。
 * [v1.4]
 * 修复了战斗时，角色入队出队变化时出错的bug。
 * [v1.5]
 * 修复了 选择随机技能时 角色肖像不消失的bug。
 * 
 *
 * @param ----常规----
 * @desc 
 *
 * @param 图片层级
 * @parent ----常规----
 * @type number
 * @min 1
 * @desc 所有角色肖像都放置在 战斗上层 ， 且都处于该图片层级。
 * @default 100
 *
 * @param 平移-前视图 X
 * @parent ----常规----
 * @desc x轴方向平移，单位像素。注意，0为肖像的中心点贴在最右边。正数向左，负数向右。
 * @default 265
 * 
 * @param 平移-前视图 Y
 * @parent ----常规----
 * @desc y轴方向平移，单位像素。0为贴在最下面。注意，正数向上，负数向下。
 * @default -20
 *
 * @param 前视图起点 X
 * @parent ----常规----
 * @desc 图像初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（正数向左，负数向右）
 * @default 60
 * 
 * @param 前视图起点 Y
 * @parent ----常规----
 * @desc 图像初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（正数向上，负数向下）
 * @default 0
 *
 * @param 前视图移动时长
 * @parent ----常规----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 平移-背景图 X
 * @parent ----常规----
 * @desc x轴方向平移，单位像素。0为贴在最右边。注意，正数向左，负数向右。
 * @default 0
 * 
 * @param 平移-背景图 Y
 * @parent ----常规----
 * @desc y轴方向平移，单位像素。0为贴在最下面。注意，正数向上，负数向下。
 * @default 0
 *
 * @param 背景图起点 X
 * @parent ----常规----
 * @desc 图像初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（正数向左，负数向右）
 * @default -60
 * 
 * @param 背景图起点 Y
 * @parent ----常规----
 * @desc 图像初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（正数向上，负数向下）
 * @default 0
 *
 * @param 背景图移动时长
 * @parent ----常规----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 是否保持角色肖像不消失
 * @parent ----常规----
 * @type boolean
 * @on 保持
 * @off 关闭
 * @desc 进入菜单选择或者在战斗时，角色肖像会自动消失，该选项强制不消失。
 * @default false
 *
 *
 * @param ----角色肖像1至20----
 * @desc 
 *
 * @param 角色肖像-1
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-2
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-3
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-4
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-5
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-6
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-7
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-8
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-9
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-10
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-11
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-12
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-13
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-14
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-15
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-16
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-17
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-18
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-19
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-20
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 *
 * @param ----角色肖像21至40----
 * @desc 
 *
 * @param 角色肖像-21
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-22
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-23
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-24
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-25
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-26
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-27
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-28
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-29
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-30
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-31
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-32
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-33
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-34
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-35
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-36
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-37
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-38
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-39
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-40
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param ----角色肖像41至60----
 * @desc 
 *
 * @param 角色肖像-41
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-42
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-43
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-44
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-45
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-46
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-47
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-48
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-49
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-50
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-51
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-52
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-53
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-54
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-55
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-56
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-57
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-58
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-59
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 *
 * @param 角色肖像-60
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。一行表示一种条件下播放的角色肖像。
 * @default 
 */
/*~struct~ActorPortraiture:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的肖像--
 *
 * @param 肖像条件-1
 * @type struct<ActorPortraitureCondition>
 * @desc 当前条件下，播放的角色肖像。
 * @default 
 *
 * @param 肖像条件-2
 * @type struct<ActorPortraitureCondition>
 * @desc 当前条件下，播放的角色肖像。
 * @default 
 *
 * @param 肖像条件-3
 * @type struct<ActorPortraitureCondition>
 * @desc 当前条件下，播放的角色肖像。
 * @default 
 *
 * @param 肖像条件-4
 * @type struct<ActorPortraitureCondition>
 * @desc 当前条件下，播放的角色肖像。
 * @default 
 *
 * @param 肖像条件-5
 * @type struct<ActorPortraitureCondition>
 * @desc 当前条件下，播放的角色肖像。
 * @default 
 *
 * @param 肖像条件-6
 * @type struct<ActorPortraitureCondition>
 * @desc 当前条件下，播放的角色肖像。
 * @default 
 *
 */
/*~struct~ActorPortraitureCondition:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的肖像条件--
 *
 * @param ===条件===
 * @desc 
 *
 * @param --生命条件--
 * @parent ===条件===
 * @desc 
 * 
 * @param 是否添加生命条件
 * @parent --生命条件--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default true
 *
 * @param 条件-生命百分比上限
 * @parent --生命条件--
 * @type number
 * @min 0
 * @max 100
 * @desc 填20，表示角色当前的生命百分比小于或等于20时的条件。
 * @default 100
 *
 * @param 条件-生命百分比下限
 * @parent --生命条件--
 * @type number
 * @min 0
 * @max 100
 * @desc 填10，表示角色当前的生命百分比大于10时的条件。（不包括等于10）
 * @default 0
 *
 * @param --魔法条件--
 * @parent ===条件===
 * @desc 
 * 
 * @param 是否添加魔法条件
 * @parent --魔法条件--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-魔法百分比上限
 * @parent --魔法条件--
 * @type number
 * @min 0
 * @max 100
 * @desc 填20，表示角色当前的魔法百分比小于或等于20时的条件。
 * @default 0
 *
 * @param 条件-魔法百分比下限
 * @parent --魔法条件--
 * @type number
 * @min 0
 * @max 100
 * @desc 填10，表示角色当前的魔法百分比大于10时的条件。（不包括等于10）
 * @default 0
 *
 * @param --怒气条件--
 * @parent ===条件===
 * @desc 
 * 
 * @param 是否添加怒气条件
 * @parent --怒气条件--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-怒气百分比上限
 * @parent --怒气条件--
 * @type number
 * @min 0
 * @max 100
 * @desc 填20，表示角色当前的怒气百分比小于或等于20时的条件。
 * @default 0
 *
 * @param 条件-怒气百分比下限
 * @parent --怒气条件--
 * @type number
 * @min 0
 * @max 100
 * @desc 填10，表示角色当前的怒气百分比大于10时的条件。（不包括等于10）
 * @default 0
 *
 * @param ===前视图===
 * @desc 
 *
 * @param 资源-前视图
 * @parent ===前视图===
 * @desc 前视图的图片资源，多张可以构成gif。
 * @default ["(需配置)角色肖像-前视图"]
 * @require 1
 * @dir img/Battle__portraiture/
 * @type file[]
 *
 * @param 前视图帧间隔
 * @parent ===前视图===
 * @type number
 * @min 1
 * @desc 前视图gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 前视图是否倒放
 * @parent ===前视图===
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param ===背景图===
 * @desc 
 *
 * @param 资源-背景图
 * @parent ===背景图===
 * @desc 背景图的图片资源，多张可以构成gif。
 * @default ["(需配置)角色肖像-背景图"]
 * @require 1
 * @dir img/Battle__portraiture/
 * @type file[]
 *
 * @param 背景图帧间隔
 * @parent ===背景图===
 * @type number
 * @min 1
 * @desc 前视图gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 背景图是否倒放
 * @parent ===背景图===
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 * 
 * 
 * @param ===呼吸效果===
 * @desc 
 *
 * @param 是否使用呼吸效果
 * @parent ===呼吸效果===
 * @type boolean
 * @on 使用
 * @off 关闭
 * @desc true - 使用，false - 关闭。
 * @default false
 *
 * @param 呼吸周期
 * @parent ===呼吸效果===
 * @type number
 * @min 10
 * @desc 一次呼吸的周期时长，单位帧。（1秒60帧）
 * @default 70
 *
 * @param 呼吸幅度
 * @parent ===呼吸效果===
 * @type number
 * @min 0
 * @desc 呼吸时引起gif缩放的百分比值，10表示10%的图片大小幅度。
 * @default 3
 *
 * @param 呼吸类型
 * @parent ===呼吸效果===
 * @type select
 * @option 上下缩放
 * @value 上下缩放
 * @option 左右缩放
 * @value 左右缩放
 * @option 整体缩放
 * @value 整体缩放
 * @desc 呼吸的类型。
 * @default 上下缩放
 * 
 * @param ===漂浮效果===
 * @desc 
 *
 * @param 是否使用漂浮效果
 * @parent ===漂浮效果===
 * @type boolean
 * @on 使用
 * @off 关闭
 * @desc true - 使用，false - 关闭。
 * @default false
 *
 * @param 漂浮速度
 * @parent ===漂浮效果===
 * @desc 漂浮的速度，可为小数负数。负数反向漂浮。
 * @default 1.5
 *
 * @param 漂浮幅度
 * @parent ===漂浮效果===
 * @type number
 * @min 0
 * @desc 漂浮的移动量，单位像素。
 * @default 10
 *
 * @param 漂浮类型
 * @parent ===漂浮效果===
 * @type select
 * @option 上下漂浮
 * @value 上下漂浮
 * @option 左右漂浮
 * @value 左右漂浮
 * @desc 漂浮的类型。
 * @default 上下漂浮
 *
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		AP（Actor_Portraiture）
//		临时全局变量	无
//		临时局部变量	this._drill_AP_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	战斗界面
//		★性能测试消耗	21.33ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//		
//<<<<<<<<插件记录<<<<<<<<
//		
//		★大体框架与功能如下：
//			角色肖像：
//				->条件
//					->根据生命/魔法值切换
//					->角色肖像插件指令
//				->角色肖像
//					->前视图gif
//					->背景图gif
//					->前视图呼吸效果
//					->支持滤镜
//					->长期保持显示状态
//					->前视图的滤镜扩展	x
//
//		★私有类如下：
//			* Drill_AP_Sprite【单角色肖像】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.注意，由于Drill_AP_Sprite的分布为双sprite+双重数组结构，-前视/背景 -第N个条件 -第N帧GIF，一些地方需要注意划分。
//			3.【该插件数据和贴图未分离】。
//			   如果容器被重刷，插件指令做出的改变，比如变身贴图，就会被还原。
//			  （这个问题在此插件中不解决，）
//	
//		★其它说明细节：
//			1.该插件比较核心的部分，是识别当前的角色部分，需要确保是在输入窗口情况再进行图片切换。
//			  其他部分就是常用的图片图层切换。
//			2.图片切换条件依旧绕来绕去，但是原理并不难。默认全部隐藏，需要时显示sprite。
//				上层
//					._drill_AP_actorLayer
//						Drill_AP_Sprite 1
//							条件A_Sprite
//								.前视图
//								.背景图
//							条件B_Sprite
//							……
//						Drill_AP_Sprite 2
//						Drill_AP_Sprite 3
//						……
//			3.前视图和背景图都被固定了初始值，每次帧刷新都会重置位置。
//			4._drill_AP_force为比较特殊的参数，它通过actor对象传递给肖像贴图。
//			
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_AP_tipCurName = "Drill_ActorPortraiture.js 战斗UI-角色肖像";
	DrillUp.g_AP_tipBasePluginList = [];

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_ActorPortraiture = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_ActorPortraiture');
	
	/*-----------------默认位置------------------*/
	DrillUp.g_AP_layer = Number(DrillUp.parameters["图片层级"] || 100); 
	DrillUp.g_AP_p_x = Number(DrillUp.parameters["平移-前视图 X"] || 335);
	DrillUp.g_AP_p_y = Number(DrillUp.parameters["平移-前视图 Y"] || -20);
	DrillUp.g_AP_p_silde_x = Number(DrillUp.parameters["前视图起点 X"] || 60);
	DrillUp.g_AP_p_silde_y = Number(DrillUp.parameters["前视图起点 Y"] || 0);
	DrillUp.g_AP_p_silde_time = Number(DrillUp.parameters["前视图移动时长"] || 30);
	DrillUp.g_AP_b_x = Number(DrillUp.parameters["平移-背景图 X"] || 0);
	DrillUp.g_AP_b_y = Number(DrillUp.parameters["平移-背景图 Y"] || 0);
	DrillUp.g_AP_b_silde_x = Number(DrillUp.parameters["背景图起点 X"] || -60);
	DrillUp.g_AP_b_silde_y = Number(DrillUp.parameters["背景图起点 Y"] || 0);
	DrillUp.g_AP_b_silde_time = Number(DrillUp.parameters["背景图移动时长"] || 30);
	DrillUp.g_AP_noDeactive = String(DrillUp.parameters["是否保持角色肖像不消失"] || "false") == "true";
	
	/*-----------------角色肖像------------------*/
	DrillUp.g_AP_list_length = 60;
	DrillUp.g_AP_condition_list_length = 6;
	DrillUp.g_AP_list = [];
	for (var i = 0; i < DrillUp.g_AP_list_length; i++) {
		if( DrillUp.parameters['角色肖像-' + String(i+1) ] != "" ){
			var src_data_all = JSON.parse(DrillUp.parameters['角色肖像-' + String(i+1) ]);
			
			var temp_condition = {};		//由于嵌套层数太多，这里重新构建。
			temp_condition['actor_id'] = i+1;
			temp_condition['condition_list'] = [];
			for (var j = 0; j < DrillUp.g_AP_condition_list_length; j++) {
				if( src_data_all['肖像条件-' + String(j+1) ] != "" ){
					var src_condition = JSON.parse(src_data_all['肖像条件-' + String(j+1)]);
					var data = {};
					data['enable'] = true;
					
					data['hp_enable'] = String(src_condition["是否添加生命条件"] || "true") == "true";
					data['hp_top'] = Number(src_condition["条件-生命百分比上限"] || 0);
					data['hp_bottom'] = Number(src_condition["条件-生命百分比下限"] || 0);
					data['mp_enable'] = String(src_condition["是否添加魔法条件"] || "false") == "true";
					data['mp_top'] = Number(src_condition["条件-魔法百分比上限"] || 0);
					data['mp_bottom'] = Number(src_condition["条件-魔法百分比下限"] || 0);
					data['tp_enable'] = String(src_condition["是否添加怒气条件"] || "false") == "true";
					data['tp_top'] = Number(src_condition["条件-怒气百分比上限"] || 0);
					data['tp_bottom'] = Number(src_condition["条件-怒气百分比下限"] || 0);
					
					data['p_src_img'] = JSON.parse(src_condition["资源-前视图"]);
					data['p_interval'] = Number(src_condition["前视图帧间隔"] || 4);
					data['p_back_run'] = String(src_condition["前视图是否倒放"] || "false") == "true";
					
					data['b_src_img'] = JSON.parse(src_condition["资源-背景图"]);
					data['b_interval'] = Number(src_condition["背景图帧间隔"] || 4);
					data['b_back_run'] = String(src_condition["背景图是否倒放"] || "false") == "true";
					
					data['breath'] = String(src_condition["是否使用呼吸效果"] || "false") == "true";
					data['breath_period'] = Number(src_condition["呼吸周期"] || 70);
					data['breath_spread'] = Number(src_condition["呼吸幅度"] || 3);
					data['breath_type'] = String(src_condition["呼吸类型"] || '上下缩放');
					
					data['float'] = String(src_condition["是否使用漂浮效果"] || "false") == "true";
					data['float_speed'] = Number(src_condition["漂浮速度"] || 1.5);
					data['float_spread'] = Number(src_condition["漂浮幅度"] || 10);
					data['float_type'] = String(src_condition["漂浮类型"] || '上下漂浮');
					
					temp_condition['condition_list'].push(data);
					//alert(JSON.stringify(data['p_src_img']));
					//alert(JSON.stringify(data));
				}else{
					var data = {};
					data['enable'] = false;
					temp_condition['condition_list'].push(data);
				}
			}
			
			DrillUp.g_AP_list[i] = temp_condition;
		}else{
			DrillUp.g_AP_list[i] = {};
		}
	}
	

//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_BattlePortraiture = function(filename) {
    return this.loadBitmap('img/Battle__portraiture/', filename, 0, true);
};
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_AP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_AP_pluginCommand.call(this, command, args);
	
	if (command === ">角色肖像") { // >角色肖像 : 我方 : 1 : 强制处于条件 : 1
		if(args.length == 8){
			var group = String(args[1]);
			var temp1 = Number(args[3]);
			var type = String(args[5]);
			var temp2 = Number(args[7]);
			
			if( type == "强制处于条件" ){
				var actor = null;
				if( group == "我方" && temp1 <= $gameParty.members().length){
					actor = $gameParty.members()[ temp1 -1];
				}
				if( group == "角色" ){
					actor = $gameActors.actor(temp1);
				}
				if ( actor ) {
					actor._drill_AP_force = temp2 -1;
				}
			}
		}
		if(args.length == 6){
			var group = String(args[1]);
			var temp1 = Number(args[3]);
			var type = String(args[5]);
			
			if( type == "解除强制条件" ){
				var actor = null;
				if( group == "我方" && temp1 <= $gameParty.members().length){
					actor = $gameParty.members()[ temp1 -1];
				}
				if( group == "角色" ){
					actor = $gameActors.actor(temp1);
				}
				if ( actor ) {
					actor._drill_AP_force = -1;
				}
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//					> 注意，当前类为 Spriteset_Battle 。
//##############################
Spriteset_Battle.prototype.drill_AP_layerAddSprite = function( sprite, layer_index ){
	this.drill_AP_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//					> 注意，当前类为 Spriteset_Battle 。
//##############################
Spriteset_Battle.prototype.drill_AP_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//					> 注意，当前类为 Spriteset_Battle 。
//##############################
Spriteset_Battle.prototype.drill_AP_sortByZIndex = function () {
    this.drill_AP_sortByZIndex_Private();
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_AP_layer_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_AP_layer_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_AP_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_AP_layer_createLowerLayer.call(this);
	if(!this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Spriteset_Battle.prototype.drill_AP_sortByZIndex_Private = function() {
	this._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Spriteset_Battle.prototype.drill_AP_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._drill_battleDownArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._drill_battleUpArea.addChild( sprite );
	}
}


//=============================================================================
// ** 战斗层 绘制
//=============================================================================
//==============================
// * 战斗层 - 初始化
//==============================
var _drill_AP_s_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
	_drill_AP_s_initialize.call(this);
	
	this._drill_AP_spriteTank = [];			//角色贴图容器
	this._drill_AP_needRefresh = true;		//角色贴图容器刷新标记
}
//==============================
// * 战斗层 - 创建
//==============================
var _drill_AP_s_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
	_drill_AP_s_createLowerLayer.call(this);
	this.drill_AP_createLayer();			//角色层
}
//==============================
// * 创建 - 角色层
//==============================
Spriteset_Battle.prototype.drill_AP_createLayer = function() {
	
	// > 角色层
	this._drill_AP_actorLayer = new Sprite();
	this._drill_AP_actorLayer.zIndex = DrillUp.g_AP_layer;
	this.drill_AP_layerAddSprite( this._drill_AP_actorLayer, "上层" );
	
	// > 层级排序
	this.drill_AP_sortByZIndex();
	
	// > 重刷容器
	this._drill_AP_needRefresh = true;
}
//==============================
// * 战斗界面 - 帧刷新
//==============================
var _drill_AP_s_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_AP_s_update.call(this);
	
	this._spriteset.drill_AP_updateTankCheck();			//容器-检查刷新条件
	this._spriteset.drill_AP_refreshTankIfNeed();		//容器-帧刷新
	
	this.drill_AP_updateActorActive();		//判断当前选中角色
};
//==============================
// * 帧刷新 - 判断当前选中角色
//==============================
Scene_Battle.prototype.drill_AP_updateActorActive = function() {
	if( this._spriteset == undefined ){ return; }
	if( this._spriteset._drill_AP_spriteTank == undefined ){ return; }
	
	// > 激活当前选中的肖像
	var cur_Actor = BattleManager.actor();		
	for(var i=0; i < this._spriteset._drill_AP_spriteTank.length; i++){
		var temp_sprite = this._spriteset._drill_AP_spriteTank[i];
		if( temp_sprite == null ){ continue; }
		var actor = $gameParty.members()[i];
		var actor_id = actor.actorId();
				
		// > 显示的条件
		if( this.drill_AP_isActorVisible() == true &&		//（肖像显示条件）
			cur_Actor != undefined &&						//（指定的贴图与角色id对应上）
			cur_Actor.actorId() == actor.actorId() ){
			temp_sprite.active();
			temp_sprite.force(cur_Actor._drill_AP_force);
			
		// > 不满足条件则隐藏
		}else{
			temp_sprite.deactive();
		}
	}
};
//==============================
// * 帧刷新 - 判断图片显示
//==============================
Scene_Battle.prototype.drill_AP_isActorVisible = function() {
	if( DrillUp.g_AP_noDeactive == true ){ return true; }			//（强制永久保持）
	if( BattleManager.isInputting() == false ){ return false; }					//不是选择指令阶段时，隐藏
	if( this._enemyWindow.active ){ return false; }								//选择敌人时隐藏
	if( this._partyCommandWindow.active ){ return false; }						//选择队伍指令时隐藏
	if( $gameSystem.isSideView() && this._actorWindow.active ){ return false; }	//选择角色时，SV模式隐藏，第一人称不需要隐藏
	return true;
}

//=============================================================================
// ** 角色贴图容器
//
//			说明：	该容器是在Spriteset_Battle自身上的，销毁时不需要考虑残留问题。
//=============================================================================
//==============================
// * 容器 - 检查刷新条件
//==============================
Spriteset_Battle.prototype.drill_AP_updateTankCheck = function() {
	if( !this._drill_AP_spriteTank ){ return; }
	if( this._drill_AP_spriteTank.length == 0 ){ return; }
	if( $gameParty.members().length == 0 ){ return; }
	
	if( $gameParty.members().length != this._drill_AP_spriteTank.length ){ 
		this._drill_AP_needRefresh = true;
	}
}
//==============================
// * 容器 - 帧刷新
//==============================
Spriteset_Battle.prototype.drill_AP_refreshTankIfNeed = function(){
	if( this._drill_AP_needRefresh != true ){ return; }
	this._drill_AP_needRefresh = false;
	
	// > 清空容器
	this.drill_AP_clearTank();
	
	// > 建立角色贴图
	var members = $gameParty.members();
	for(var i=0; i < members.length; i++){
		var actor = members[i];
		var actor_id = actor.actorId();
		
		actor._drill_AP_force = -1;		//（强制条件重置）
		
		// > 根据数据建立sprite
		var temp_sprite = null;
		var temp_data = JSON.parse(JSON.stringify( DrillUp.g_AP_list[actor_id-1] ));
		if( temp_data.actor_id ){
			temp_sprite = new Drill_AP_Sprite( temp_data );
			this._drill_AP_actorLayer.addChild(temp_sprite);
		}
		this._drill_AP_spriteTank[i] = temp_sprite;
	}
};
//==============================
// * 容器 - 清空
//==============================
Spriteset_Battle.prototype.drill_AP_clearTank = function(){
	for( var i = this._drill_AP_spriteTank.length-1; i >=0; i-- ){
		var temp_sprite = this._drill_AP_spriteTank[i];
		if( temp_sprite == null ){ continue; }
		this._drill_AP_actorLayer.removeChild(temp_sprite);
	}
	this._drill_AP_spriteTank = [];
};




//=============================================================================
// ** Drill_AP_Sprite 单角色肖像
//
//			参数：	data.actor_id			//角色id
//					data.condition_list		//条件/GIF贴图列表（见全局变量获取的结构）
//			说明：	1.准备好数据，new即可。
//					2.实时调用函数.active()和.deactive()改变图像显示/隐藏。
//					3.调用函数.force(1)和.clearForce()锁定解锁条件。
//					4.条件变化和gif播放控制都由内部处理。
//
// 			代码：	> 范围 - 该类显示单独的角色肖像。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
//					> 数量 - [单个/ ●多个] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 角色肖像 - 定义
//==============================
function Drill_AP_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_AP_Sprite.prototype = Object.create(Sprite.prototype);
Drill_AP_Sprite.prototype.constructor = Drill_AP_Sprite;
//==============================
// * 角色肖像 - 初始化
//==============================
Drill_AP_Sprite.prototype.initialize = function( data ) {
    Sprite.prototype.initialize.call(this);
	
	this._drill_actor = $gameActors.actor(data.actor_id);
	this._drill_actor_id = data.actor_id;
	this._drill_conditions = data.condition_list;
	//alert(JSON.stringify(data));
	
	this._move = 0;
	this._drill_cur_condition = -1;
	this._drill_tar_condition = -1;
	this._drill_force_condition = -1;
	this._drill_isActived = false;
	
	this._drill_p_sprite = null;		//前视图
	this._drill_b_sprite = null;		//背景图
	this._drill_bitmap_p_matrix = [];	//贴图矩阵
	this._drill_bitmap_b_matrix = [];
	
	this.drill_AP_initSprite();
	this.drill_AP_initBitmap();
};

//==============================
// * 初始化 - 创建前景背景
//==============================
Drill_AP_Sprite.prototype.drill_AP_initSprite = function() {
	
	this._drill_p_sprite = new Sprite();
	this._drill_p_sprite.anchor.x = 0.5;
	this._drill_p_sprite.anchor.y = 1;
	this._drill_p_sprite.x = Graphics.boxWidth - DrillUp.g_AP_p_x - DrillUp.g_AP_p_silde_x;
	this._drill_p_sprite.y = Graphics.boxHeight - DrillUp.g_AP_p_y - DrillUp.g_AP_p_silde_y;
	this._drill_p_sprite.opacity = 0;
	this._drill_p_sprite._move = 0;
	this._drill_p_sprite._breath = Math.random() * 10;
	this._drill_p_sprite._breath_dir = Math.floor(Math.random() * 2);
	this._drill_p_sprite._f_time = 0;
	
	this._drill_b_sprite = new Sprite();
	this._drill_b_sprite.anchor.x = 1;
	this._drill_b_sprite.anchor.y = 1;
	this._drill_b_sprite.x = Graphics.boxWidth - DrillUp.g_AP_b_x - DrillUp.g_AP_b_silde_x;
	this._drill_b_sprite.y = Graphics.boxHeight - DrillUp.g_AP_b_y - DrillUp.g_AP_b_silde_y;
	this._drill_b_sprite.opacity = 0;
	this._drill_b_sprite._move = 0;
	
	this.addChild(this._drill_b_sprite);	//背景图在后面
	this.addChild(this._drill_p_sprite);
}
//==============================
// * 初始化 - 创建前景背景
//==============================
Drill_AP_Sprite.prototype.drill_AP_initBitmap = function() {
	
	for(var i=0; i < this._drill_conditions.length ; i++){
		var temp_data = this._drill_conditions[i] ;
		if( temp_data['enable'] ){
			var p_bitmaps = [];
			var b_bitmaps = [];
			
			for(var j=0; j < temp_data['p_src_img'].length ; j++){
				var bitmap = ImageManager.load_BattlePortraiture(temp_data['p_src_img'][j]);
				p_bitmaps.push(bitmap);
			}
			this._drill_bitmap_p_matrix.push(p_bitmaps);
		
			for(var j=0; j < temp_data['b_src_img'].length ; j++){
				var bitmap = ImageManager.load_BattlePortraiture(temp_data['b_src_img'][j]);
				b_bitmaps.push(bitmap);
			}
			this._drill_bitmap_b_matrix.push(b_bitmaps);
		}else{
			this._drill_bitmap_p_matrix.push([]);
			this._drill_bitmap_b_matrix.push([]);
		}
	}
}
//==============================
// * 显示
//==============================
Drill_AP_Sprite.prototype.active = function() {
	this._drill_isActived = true;
}
//==============================
// * 隐藏
//==============================
Drill_AP_Sprite.prototype.deactive = function() {
	this._drill_isActived = false;
}
//==============================
// * 强制条件
//==============================
Drill_AP_Sprite.prototype.force = function( c_id ) {
	this._drill_force_condition = c_id;
}
//==============================
// * 解除强制条件
//==============================
Drill_AP_Sprite.prototype.clearForce = function() {
	this._drill_force_condition = -1;
}

//==============================
// * 帧刷新
//==============================
Drill_AP_Sprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	if(this._drill_actor){
		this.drill_AP_updateOrg();
		this.drill_AP_updateCondition();
		this.drill_AP_updateSprite();
		this.drill_AP_updateGIF();
		this.drill_AP_updateEffects();
	}
}
//==============================
// * 帧刷新 - 固定帧初始值
//==============================
Drill_AP_Sprite.prototype.drill_AP_updateOrg = function() {
	
	this._drill_p_sprite.x = Graphics.boxWidth - DrillUp.g_AP_p_x - DrillUp.g_AP_p_silde_x;
	this._drill_p_sprite.y = Graphics.boxHeight - DrillUp.g_AP_p_y - DrillUp.g_AP_p_silde_y;
	this._drill_p_sprite.rotation = 0;
	this._drill_p_sprite.scale.x = 1;
	this._drill_p_sprite.scale.y = 1;
	
	this._drill_b_sprite.x = Graphics.boxWidth - DrillUp.g_AP_b_x - DrillUp.g_AP_b_silde_x + 10; //（+10震动时防止过界）
	this._drill_b_sprite.y = Graphics.boxHeight - DrillUp.g_AP_b_y - DrillUp.g_AP_b_silde_y;
	this._drill_b_sprite.rotation = 0;
	this._drill_b_sprite.scale.x = 1;
	this._drill_b_sprite.scale.y = 1;
}

//==============================
// * 帧刷新 - 条件刷新
//==============================
Drill_AP_Sprite.prototype.drill_AP_updateCondition = function() {
	
	var battler = this._drill_actor;
	for(var i=0; i < this._drill_conditions.length ; i++){
		var condition = this._drill_conditions[i];
		if( !condition['enable'] ){ continue; }
		var hp_fit = false;
		var mp_fit = false;
		var tp_fit = false;
		if( condition.hp_enable == true ){		//生命条件
			var per = battler.hp / battler.mhp * 100;
			if( (per < condition.hp_top && per > condition.hp_bottom) || per == condition.hp_top ){
				hp_fit = true;
			}else{
				hp_fit = false;
			}
		}else{
			hp_fit = true;
		}
		if( condition.mp_enable == true ){		//魔法条件
			var per = battler.mp / battler.mmp * 100;
			if( (per < condition.mp_top && per > condition.mp_bottom) || per == condition.mp_top ){
				mp_fit = true;
			}else{
				mp_fit = false;
			}
		}else{
			mp_fit = true;
		}
		if( condition.tp_enable == true ){		//怒气条件
			var per = battler.tp / battler.mtp * 100;
			if( (per < condition.tp_top && per > condition.tp_bottom) || per == condition.tp_top ){
				tp_fit = true;
			}else{
				tp_fit = false;
			}
		}else{
			tp_fit = true;
		}
		if( hp_fit && mp_fit && tp_fit ){
			this._drill_tar_condition = i;
			break;
		}
	}
	
	if( this._drill_force_condition != -1 ){		//强制条件
		var temp_data = this._drill_conditions[this._drill_force_condition];
		if( temp_data && temp_data['enable'] == true ){
			this._drill_tar_condition = this._drill_force_condition;
		}
	}
}

//==============================
// * 帧刷新 - 图片
//==============================
Drill_AP_Sprite.prototype.drill_AP_updateSprite = function() {
	
	if( this._drill_cur_condition != this._drill_tar_condition ){	// >切换条件状态
		this._drill_cur_condition = this._drill_tar_condition;
		//暂无操作（满血图像切换残血图像是直接切换，不需要过渡）
	}
	if(this._drill_cur_condition < 0){ return }
	
	// > 修正镜头
	if( Imported.Drill_BattleCamera ){		//（固定处于上层，在图层内）
		var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
		this._drill_p_sprite.x -= camera_pos.x;
		this._drill_p_sprite.y -= camera_pos.y;
		this._drill_b_sprite.x -= camera_pos.x;
		this._drill_b_sprite.y -= camera_pos.y;
	}
	
	if(this._drill_isActived){	// >前视图显示
		this._drill_p_sprite._move ++;
		if( this._drill_p_sprite._move > DrillUp.g_AP_p_silde_time  ){
			this._drill_p_sprite._move = DrillUp.g_AP_p_silde_time
		}
	}else{						// >前视图隐藏
		this._drill_p_sprite._move --;
		if( this._drill_p_sprite._move < 0  ){
			this._drill_p_sprite._move = 0;
		}
	}
	this._drill_p_sprite.x += DrillUp.g_AP_p_silde_x / DrillUp.g_AP_p_silde_time * this._drill_p_sprite._move;
	this._drill_p_sprite.y += DrillUp.g_AP_p_silde_y / DrillUp.g_AP_p_silde_time * this._drill_p_sprite._move;
	this._drill_p_sprite.opacity = 255 / DrillUp.g_AP_p_silde_time * this._drill_p_sprite._move;
	
	if(this._drill_isActived){	// >背景图显示
		this._drill_b_sprite._move ++;
		if( this._drill_b_sprite._move > DrillUp.g_AP_b_silde_time  ){
			this._drill_b_sprite._move = DrillUp.g_AP_b_silde_time
		}
	}else{						// >背景图隐藏
		this._drill_b_sprite._move --;
		if( this._drill_b_sprite._move < 0  ){
			this._drill_b_sprite._move = 0;
		}
	}
	this._drill_b_sprite.x += DrillUp.g_AP_b_silde_x / DrillUp.g_AP_b_silde_time * this._drill_b_sprite._move;
	this._drill_b_sprite.y += DrillUp.g_AP_b_silde_y / DrillUp.g_AP_b_silde_time * this._drill_b_sprite._move;
	this._drill_b_sprite.opacity = 255 / DrillUp.g_AP_b_silde_time * this._drill_b_sprite._move;
}

//==============================
// * 帧刷新 - GIF刷新
//==============================
Drill_AP_Sprite.prototype.drill_AP_updateGIF = function() {
	if(this._drill_cur_condition < 0){ return }
	var temp_data = this._drill_conditions[this._drill_cur_condition];
	if( !temp_data['enable'] ){ return }
	this._move += 1;
	
	var inter = this._move ;	// >前视图GIF
	inter = inter / temp_data['p_interval'];
	inter = inter % temp_data['p_src_img'].length;
	if(temp_data['p_back_run']){
		inter = temp_data['p_src_img'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	this._drill_p_sprite.bitmap = this._drill_bitmap_p_matrix[this._drill_cur_condition][inter];
	
	inter = this._move ;		// >背景图GIF
	inter = inter / temp_data['b_interval'];
	inter = inter % temp_data['b_src_img'].length;
	if(temp_data['b_back_run']){
		inter = temp_data['b_src_img'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	this._drill_b_sprite.bitmap = this._drill_bitmap_b_matrix[this._drill_cur_condition][inter];
	
}

//==============================
// * 帧刷新 - 效果刷新
//==============================
Drill_AP_Sprite.prototype.drill_AP_updateEffects = function() {
	if(this._drill_cur_condition < 0){ return }
	var temp_data = this._drill_conditions[this._drill_cur_condition];
	var temp_sprite = this._drill_p_sprite;
	if( !temp_data['enable'] ){ return }
	
	// >呼吸效果
	if( temp_data['breath'] ){
		if( temp_sprite._breath_dir == 0 ){
			temp_sprite._breath += 2.1;
			if( temp_sprite._breath >= temp_data['breath_period'] ){
				temp_sprite._breath_dir = 1;
			}
		}
		if( temp_sprite._breath_dir == 1 ){
			temp_sprite._breath -= 1.3;
			if( temp_sprite._breath <= 0 ){
				temp_sprite._breath_dir = 0;
			}
		}
		if(temp_data['breath_type'] == '上下缩放' || temp_data['breath_type'] == '整体缩放'){
			temp_sprite.scale.y += (temp_sprite._breath/temp_data['breath_period'] * temp_data['breath_spread']/100 );
		}
		if(temp_data['breath_type'] == '左右缩放' || temp_data['breath_type'] == '整体缩放'){
			temp_sprite.scale.x += (temp_sprite._breath/temp_data['breath_period'] * temp_data['breath_spread']/100 );
		}
	}
	// >漂浮效果
	if( temp_data['float'] ){
		temp_sprite._f_time += temp_data['float_speed'];
		if(temp_sprite._f_time > 360){ temp_sprite._f_time -= 360; }
		if(temp_sprite._f_time < 360){ temp_sprite._f_time += 360; }
		if(temp_data['float_type'] == '上下漂浮' ){
			temp_sprite.y += Math.sin( temp_sprite._f_time / 180 * Math.PI ) * temp_data['float_spread'];
		}
		if(temp_data['float_type'] == '左右漂浮' ){
			temp_sprite.x += Math.sin( temp_sprite._f_time / 180 * Math.PI ) * temp_data['float_spread'];
		}
	}
}


