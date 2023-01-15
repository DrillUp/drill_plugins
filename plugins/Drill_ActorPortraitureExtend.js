//=============================================================================
// Drill_ActorPortraitureExtend.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        战斗UI - 高级角色肖像
 * @author Drill_up
 * 
 * @Drill_LE_param "角色肖像-%d"
 * @Drill_LE_parentKey "----角色肖像%d至%d----"
 * @Drill_LE_var "DrillUp.g_APEx_list_length"
 * 
 * @Drill_LE_param "触发时机-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_APEx_condition_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_ActorPortraitureExtend +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置战斗当前角色的肖像,还可以配置不同条件下角色不同样子的肖像。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfActionSequence    系统-GIF动画序列核心
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   角色肖像放置在 战斗上层 。
 * 2.详细内容去看看 "5.战斗UI > 关于高级角色肖像.docx"。
 * 细节：
 *   (1.角色肖像的图片层级与所有处于战斗上层的相关插件的层级共享。
 *     （比如上层且图片层级大于100的战斗背景,会挡住角色肖像,反之在后面）
 *   (2.注意，该插件配置的坐标和平移与一般设定是相反的。
 *      一般设定X轴正数向右负数向左，这里是正数向左负数向右。
 *   (3.每个肖像都对应两个动画序列，动画序列在核心中进行配置。
 *      一个前视图GIF动画序列，一个背景图GIF动画序列。
 *   (4.插件1.4之前版本的状态元不会立刻改变，新版本的切换都为立刻改变。
 * 触发时机：
 *   (1.触发时机与事件页的功能相似，
 *      如果触发同时满足多个触发时机，则序号大的触发时机优先。
 * 设计：
 *   (1.该插件的上限比较高，但是同时复杂度也变大了，设计时最好参考
 *      "5.战斗UI > 关于高级角色肖像.docx"文档进行步骤配置。
 *   (2.插件中支持开关、变量、状态的类似事件页的功能，
 *      你可以以此来设计角色中毒、麻痹、释放某技能后的特殊肖像。
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
 * 测试结果：   1个角色的消耗为：【17.25ms】
 *              4个角色的消耗为：【45.58ms】
 *              8个角色的消耗为：【61.37ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.注意，角色数量 能够使得角色立绘计算量倍增。
 *   因为每个角色都配有动画序列，需要刷新动作与状态。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了 动画序列设为0 时，出错的bug。
 * [v1.2]
 * 修复了 怒气条件 没有效果的bug。
 * [v1.3]
 * 修复了 选择随机技能时 角色肖像不消失的bug。
 * [v1.4]
 * 在触发条件中添加了 状态条件，可以设置指定状态下的角色肖像。
 * [v1.5]
 * 较大幅度更新了 动画序列底层，该插件重新兼容。
 * 
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
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-2
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-3
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-4
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-5
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-6
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-7
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-8
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-9
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-10
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-11
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-12
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-13
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-14
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-15
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-16
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-17
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-18
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-19
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-20
 * @parent ----角色肖像1至20----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 *
 * @param ----角色肖像21至40----
 * @desc 
 *
 * @param 角色肖像-21
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-22
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-23
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-24
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-25
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-26
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-27
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-28
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-29
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-30
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-31
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-32
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-33
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-34
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-35
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-36
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-37
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-38
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-39
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-40
 * @parent ----角色肖像21至40----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param ----角色肖像41至60----
 * @desc 
 *
 * @param 角色肖像-41
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-42
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-43
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-44
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-45
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-46
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-47
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-48
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-49
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-50
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-51
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-52
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-53
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-54
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-55
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-56
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-57
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-58
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-59
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 *
 * @param 角色肖像-60
 * @parent ----角色肖像41至60----
 * @type struct<ActorPortraiture>
 * @desc 设置指定的条件下，角色肖像的效果。具体设计可以去看看 "1.系统 > 大家族-GIF动画序列.docx"。
 * @default 
 * 
 * 
 */
/*~struct~ActorPortraiture:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的肖像--
 *
 * @param --动画序列--
 * @desc 
 *
 * @param 前视图GIF动作序列
 * @parent --动画序列--
 * @type number
 * @desc 前视图gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 0
 *
 * @param 背景图GIF动作序列
 * @parent --动画序列--
 * @type number
 * @desc 前视图gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 0
 * 
 * @param --呼吸效果--
 * @desc 
 * 
 * @param 是否使用呼吸效果
 * @parent --呼吸效果--
 * @type boolean
 * @on 使用
 * @off 关闭
 * @desc true - 使用，false - 关闭。
 * @default false
 * 
 * @param 呼吸周期
 * @parent --呼吸效果--
 * @type number
 * @min 10
 * @desc 一次呼吸的周期时长，单位帧。（1秒60帧）
 * @default 70
 * 
 * @param 呼吸幅度
 * @parent --呼吸效果--
 * @type number
 * @min 0
 * @desc 呼吸时引起gif缩放的百分比值，10表示10%的图片大小幅度。
 * @default 3
 * 
 * @param 呼吸类型
 * @parent --呼吸效果--
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
 * @param --漂浮效果--
 * @desc 
 *
 * @param 是否使用漂浮效果
 * @parent --漂浮效果--
 * @type boolean
 * @on 使用
 * @off 关闭
 * @desc true - 使用，false - 关闭。
 * @default false
 *
 * @param 漂浮速度
 * @parent --漂浮效果--
 * @desc 漂浮的速度，可为小数负数。负数反向漂浮。
 * @default 1.5
 *
 * @param 漂浮幅度
 * @parent --漂浮效果--
 * @type number
 * @min 0
 * @desc 漂浮的移动量，单位像素。
 * @default 10
 *
 * @param 漂浮类型
 * @parent --漂浮效果--
 * @type select
 * @option 上下漂浮
 * @value 上下漂浮
 * @option 左右漂浮
 * @value 左右漂浮
 * @desc 漂浮的类型。
 * @default 上下漂浮
 *
 * 
 * @param --触发时机--
 * @desc 
 * 
 * @param 触发时机-1
 * @parent --触发时机--
 * @type struct<ActorPortraitureCondition>
 * @desc 在指定条件下，对角色肖像的动画序列进行操作。注意，这些条件必须全部同时满足才会操作。
 * @default {}
 *
 * @param 触发时机-2
 * @parent --触发时机--
 * @type struct<ActorPortraitureCondition>
 * @desc 在指定条件下，对角色肖像的动画序列进行操作。注意，这些条件必须全部同时满足才会操作。
 * @default {}
 *
 * @param 触发时机-3
 * @parent --触发时机--
 * @type struct<ActorPortraitureCondition>
 * @desc 在指定条件下，对角色肖像的动画序列进行操作。注意，这些条件必须全部同时满足才会操作。
 * @default 
 *
 * @param 触发时机-4
 * @parent --触发时机--
 * @type struct<ActorPortraitureCondition>
 * @desc 在指定条件下，对角色肖像的动画序列进行操作。注意，这些条件必须全部同时满足才会操作。
 * @default 
 *
 * @param 触发时机-5
 * @parent --触发时机--
 * @type struct<ActorPortraitureCondition>
 * @desc 在指定条件下，对角色肖像的动画序列进行操作。注意，这些条件必须全部同时满足才会操作。
 * @default 
 *
 * @param 触发时机-6
 * @parent --触发时机--
 * @type struct<ActorPortraitureCondition>
 * @desc 在指定条件下，对角色肖像的动画序列进行操作。注意，这些条件必须全部同时满足才会操作。
 * @default 
 * 
 * @param 触发时机-7
 * @parent --触发时机--
 * @type struct<ActorPortraitureCondition>
 * @desc 在指定条件下，对角色肖像的动画序列进行操作。注意，这些条件必须全部同时满足才会操作。
 * @default 
 *
 * @param 触发时机-8
 * @parent --触发时机--
 * @type struct<ActorPortraitureCondition>
 * @desc 在指定条件下，对角色肖像的动画序列进行操作。注意，这些条件必须全部同时满足才会操作。
 * @default 
 *
 */
/*~struct~ActorPortraitureCondition:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的触发时机--
 * 
 * 
 * @param --触发条件--
 * @desc 
 * 
 * @param 是否添加生命条件
 * @parent --触发条件--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default true
 *
 * @param 条件-生命百分比上限
 * @parent 是否添加生命条件
 * @type number
 * @min 0
 * @max 100
 * @desc 填20，表示角色当前的生命百分比小于或等于20时的条件。
 * @default 100
 *
 * @param 条件-生命百分比下限
 * @parent 是否添加生命条件
 * @type number
 * @min 0
 * @max 100
 * @desc 填10，表示角色当前的生命百分比大于10时的条件。（不包括等于10）
 * @default 0
 * 
 * @param 是否添加魔法条件
 * @parent --触发条件--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-魔法百分比上限
 * @parent 是否添加魔法条件
 * @type number
 * @min 0
 * @max 100
 * @desc 填20，表示角色当前的魔法百分比小于或等于20时的条件。
 * @default 0
 *
 * @param 条件-魔法百分比下限
 * @parent 是否添加魔法条件
 * @type number
 * @min 0
 * @max 100
 * @desc 填10，表示角色当前的魔法百分比大于10时的条件。（不包括等于10）
 * @default 0
 * 
 * @param 是否添加怒气条件
 * @parent --触发条件--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-怒气百分比上限
 * @parent 是否添加怒气条件
 * @type number
 * @min 0
 * @max 100
 * @desc 填20，表示角色当前的怒气百分比小于或等于20时的条件。
 * @default 0
 *
 * @param 条件-怒气百分比下限
 * @parent 是否添加怒气条件
 * @type number
 * @min 0
 * @max 100
 * @desc 填10，表示角色当前的怒气百分比大于10时的条件。（不包括等于10）
 * @default 0
 * 
 * @param 是否添加开关条件
 * @parent --触发条件--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-开关
 * @parent 是否添加开关条件
 * @type switch
 * @desc 指定开关的值为 on开 时，即可满足条件。
 * @default 0
 * 
 * @param 是否添加开关2条件
 * @parent --触发条件--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-开关2
 * @parent 是否添加开关2条件
 * @type switch
 * @desc 指定开关的值为 on开 时，即可满足条件。
 * @default 0
 * 
 * @param 是否添加变量条件
 * @parent --触发条件--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-变量
 * @parent 是否添加变量条件
 * @type variable
 * @desc 指定开关的值为 on开 时，即可满足条件。
 * @default 0
 *
 * @param 条件-变量比较符
 * @parent 是否添加变量条件
 * @type select
 * @option 大于等于
 * @value 大于等于
 * @option 小于等于
 * @value 小于等于
 * @option 大于
 * @value 大于
 * @option 小于
 * @value 小于
 * @option 等于
 * @value 等于
 * @desc 变量条件的比较符。
 * @default 大于等于
 *
 * @param 条件-比较值
 * @parent 是否添加变量条件
 * @desc 如果比较符为"大于"，比较值为10，那么表示 变量>10 时满足。
 * @default 10
 * 
 * @param 是否添加状态条件
 * @parent --触发条件--
 * @type boolean
 * @on 添加
 * @off 关闭
 * @desc true - 添加，false - 关闭
 * @default false
 *
 * @param 条件-任一状态
 * @parent 是否添加状态条件
 * @type state[]
 * @desc 角色包含列表中任一的状态时，即表示满足条件。
 * @default []
 * 
 * 
 * @param --触发条件(一帧)--
 * @desc 
 *
 * @param 触发条件(一帧)
 * @parent --触发条件(一帧)--
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 自己被攻击躲避时
 * @value 自己被攻击躲避时
 * @option 自己被攻击命中时-HP伤害
 * @value 自己被攻击命中时-HP伤害
 * @option 自己被攻击命中时-HP恢复
 * @value 自己被攻击命中时-HP恢复
 * @option 自己被攻击命中时-HP吸收
 * @value 自己被攻击命中时-HP吸收
 * @option 自己被攻击命中时-MP伤害
 * @value 自己被攻击命中时-MP伤害
 * @option 自己被攻击命中时-MP恢复
 * @value 自己被攻击命中时-MP恢复
 * @option 自己被攻击命中时-MP吸收
 * @value 自己被攻击命中时-MP吸收
 * @option 主动攻击目标且目标躲避时
 * @value 主动攻击目标且目标躲避时
 * @option 主动攻击目标命中时-HP伤害
 * @value 主动攻击目标命中时-HP伤害
 * @option 主动攻击目标命中时-HP恢复
 * @value 主动攻击目标命中时-HP恢复
 * @option 主动攻击目标命中时-HP吸收
 * @value 主动攻击目标命中时-HP吸收
 * @option 主动攻击目标命中时-MP伤害
 * @value 主动攻击目标命中时-MP伤害
 * @option 主动攻击目标命中时-MP恢复
 * @value 主动攻击目标命中时-MP恢复
 * @option 主动攻击目标命中时-MP吸收
 * @value 主动攻击目标命中时-MP吸收
 * @desc 触发条件(一帧)的类型，指定条件满足后一帧的时间内，激活触发。常用于播放一次动作。
 * @default 关闭
 * 
 * 
 * @param --触发前视图--
 * @desc 
 * 
 * @param 前视图-是否播放状态节点
 * @parent --触发前视图--
 * @type boolean
 * @on 切换
 * @off 关闭
 * @desc true - 切换，false - 关闭
 * @default false
 *
 * @param 前视图-播放状态节点
 * @parent 前视图-是否播放状态节点
 * @desc 角色肖像的动画序列播放的状态节点，如果动画序列没有对应的状态节点，则没有效果。
 * @default 状态节点名称(需配置)
 * 
 * @param 前视图-是否播放一次动作
 * @parent --触发前视图--
 * @type boolean
 * @on 播放
 * @off 关闭
 * @desc true - 播放，false - 关闭
 * @default false
 * 
 * @param 前视图-播放的动作名
 * @parent 前视图-是否播放一次动作
 * @desc 角色肖像的动画序列播放的动作元，如果动画序列没有对应动作名，则没有效果。
 * @default 动作元名称(需配置)
 * 
 * 
 * @param --触发背景图--
 * @desc 
 * 
 * @param 背景图-是否播放状态节点
 * @parent --触发背景图--
 * @type boolean
 * @on 切换
 * @off 关闭
 * @desc true - 切换，false - 关闭
 * @default false
 *
 * @param 背景图-播放状态节点
 * @parent 背景图-是否播放状态节点
 * @desc 背景的动画序列播放的状态节点，如果动画序列没有对应的状态节点，则没有效果。
 * @default 状态节点名称(需配置)
 * 
 * @param 背景图-是否播放一次动作
 * @parent --触发背景图--
 * @type boolean
 * @on 播放
 * @off 关闭
 * @desc true - 播放，false - 关闭
 * @default false
 *
 * @param 背景图-播放的动作名
 * @parent 背景图-是否播放一次动作
 * @desc 背景的动画序列播放的动作元，如果动画序列没有对应动作名，则没有效果。
 * @default 动作元名称(需配置)
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		APEx（Actor_Portraiture_Extend）
//		临时全局变量	无
//		临时局部变量	this._drill_APEx_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	战斗界面
//		★性能测试消耗	 25.87ms（drill_APEx_updatePosition） 19.71ms（drill_APEx_updateCondition） 17.25ms（update）
//		★最坏情况		配置了大量角色立绘，以及5-8个角色。
//		★备注			角色数量能够使得角色立绘计算量倍增，注意。
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
//			* Drill_APEx_Sprite【单角色肖像】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.触发时机 与事件页的功能相似，序号大的触发时机优先。
//
//		★其它说明细节：
//			暂无
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
	DrillUp.g_APEx_tipCurName = "Drill_ActorPortraitureExtend.js 战斗UI-高级角色肖像";
	DrillUp.g_APEx_tipBasePluginList = ["Drill_CoreOfActionSequence.js 系统-GIF动画序列核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_APEx_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_APEx_tipBasePluginList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_APEx_tipCurName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_APEx_tipBasePluginList.length; i++){
			message += "\n- ";
			message += DrillUp.g_APEx_tipBasePluginList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新要求
	//==============================
	DrillUp.drill_APEx_getPluginTip_NeedUpdate = function(){
		return DrillUp.g_APEx_tipCurName + "\n GIF动画序列核心 插件版本过低，请及时更新核心插件，以及所有动画序列相关子插件。";
	};

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_ActorPortraitureExtend = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_ActorPortraitureExtend');

	//==============================
	// * 变量获取 - 触发时机
	//				（~struct~ActorPortraitureCondition）
	//==============================
	DrillUp.drill_APEx_initCondition = function( dataFrom ) {
		var data = {};
		// > 触发条件
		data['hp_enable'] = String( dataFrom["是否添加生命条件"] || "true") == "true";
		data['hp_top'] = Number( dataFrom["条件-生命百分比上限"] || 0);
		data['hp_bottom'] = Number( dataFrom["条件-生命百分比下限"] || 0);
		data['mp_enable'] = String( dataFrom["是否添加魔法条件"] || "false") == "true";
		data['mp_top'] = Number( dataFrom["条件-魔法百分比上限"] || 0);
		data['mp_bottom'] = Number( dataFrom["条件-魔法百分比下限"] || 0);
		data['tp_enable'] = String( dataFrom["是否添加怒气条件"] || "false") == "true";
		data['tp_top'] = Number( dataFrom["条件-怒气百分比上限"] || 0);
		data['tp_bottom'] = Number( dataFrom["条件-怒气百分比下限"] || 0);
		data['switch_enable'] = String( dataFrom["是否添加开关条件"] || "false") == "true";
		data['switch_id'] = Number( dataFrom["条件-开关"] || 0);
		data['switch2_enable'] = String( dataFrom["是否添加开关2条件"] || "false") == "true";
		data['switch2_id'] = Number( dataFrom["条件-开关2"] || 0);
		data['variable_enable'] = String( dataFrom["是否添加变量条件"] || "false") == "true";
		data['variable_id'] = Number( dataFrom["条件-变量"] || 0);
		data['variable_operator'] = String( dataFrom["条件-变量比较符"] || "大于等于") ;
		data['variable_value'] = Number( dataFrom["条件-比较值"] || 10);
		data['battleState_enable'] = String( dataFrom["是否添加状态条件"] || "false") == "true";
		if( dataFrom['条件-任一状态'] != "" &&
			dataFrom['条件-任一状态'] != undefined ){
			data['battleState_idList'] = JSON.parse( dataFrom['条件-任一状态'] );
		}else{
			data['battleState_idList'] = [];
		}
		// > 触发条件(一帧)
		data['action_type'] = String( dataFrom["触发条件(一帧)"] || "" );
		// > 触发动作
		data['trigger_p_state_enable'] = String( dataFrom["前视图-是否播放状态节点"] || "false") == "true";
		data['trigger_p_state_node'] = String( dataFrom["前视图-播放状态节点"] || "");
		//data['trigger_p_state_default'] = String( dataFrom["前视图-是否恢复为默认集合"] || "false") == "true";		// （此编辑项去掉，严重影响配置时的理解）
		data['trigger_p_act_enable'] = String( dataFrom["前视图-是否播放一次动作"] || "false") == "true";
		data['trigger_p_act'] = String( dataFrom["前视图-播放的动作名"] || "");
		data['trigger_b_state_enable'] = String( dataFrom["背景图-是否播放状态节点"] || "false") == "true";
		data['trigger_b_state_node'] = String( dataFrom["背景图-播放状态节点"] || "");
		//data['trigger_b_state_default'] = String( dataFrom["背景图-是否恢复为默认集合"] || "false") == "true";		// （此编辑项去掉，严重影响配置时的理解）
		data['trigger_b_act_enable'] = String( dataFrom["背景图-是否播放一次动作"] || "false") == "true";
		data['trigger_b_act'] = String( dataFrom["背景图-播放的动作名"] || "");
		return data;
	}

	//==============================
	// * 变量获取 - 角色肖像
	//				（~struct~ActorPortraiture）
	//==============================
	DrillUp.drill_APEx_initPortraiture = function( dataFrom ) {
		var data = {};
		// > 动画序列
		data['p_actionSeq'] = Number( dataFrom["前视图GIF动作序列"] || 0);
		data['b_actionSeq'] = Number( dataFrom["背景图GIF动作序列"] || 0);
		// > 呼吸效果
		data['breath'] = String( dataFrom["是否使用呼吸效果"] || "false") == "true";
		data['breath_period'] = Number( dataFrom["呼吸周期"] || 70);
		data['breath_spread'] = Number( dataFrom["呼吸幅度"] || 3);
		data['breath_type'] = String( dataFrom["呼吸类型"] || '上下缩放');
		// > 漂浮效果		
		data['float'] = String( dataFrom["是否使用漂浮效果"] || "false") == "true";
		data['float_speed'] = Number( dataFrom["漂浮速度"] || 1.5);
		data['float_spread'] = Number( dataFrom["漂浮幅度"] || 10);
		data['float_type'] = String( dataFrom["漂浮类型"] || '上下漂浮');
		// > 触发时机
		data['condition_list'] = [];
		for (var j = 0; j < DrillUp.g_APEx_condition_list_length; j++) {
			if( dataFrom['触发时机-' + String(j+1) ] != "" &&
				dataFrom['触发时机-' + String(j+1) ] != undefined ){
				var temp = JSON.parse( dataFrom['触发时机-' + String(j+1)] );
				data['condition_list'].push( DrillUp.drill_APEx_initCondition( temp ) );
			}else{
				data['condition_list'].push( DrillUp.drill_APEx_initCondition( {} ) );
			}
		}
		return data;
	}
	
	/*-----------------默认位置------------------*/
	DrillUp.g_APEx_layer = Number(DrillUp.parameters["图片层级"] || 100); 
	DrillUp.g_APEx_p_x = Number(DrillUp.parameters["平移-前视图 X"] || 335);
	DrillUp.g_APEx_p_y = Number(DrillUp.parameters["平移-前视图 Y"] || -20);
	DrillUp.g_APEx_p_silde_x = Number(DrillUp.parameters["前视图起点 X"] || 60);
	DrillUp.g_APEx_p_silde_y = Number(DrillUp.parameters["前视图起点 Y"] || 0);
	DrillUp.g_APEx_p_silde_time = Number(DrillUp.parameters["前视图移动时长"] || 30);
	DrillUp.g_APEx_b_x = Number(DrillUp.parameters["平移-背景图 X"] || 0);
	DrillUp.g_APEx_b_y = Number(DrillUp.parameters["平移-背景图 Y"] || 0);
	DrillUp.g_APEx_b_silde_x = Number(DrillUp.parameters["背景图起点 X"] || -60);
	DrillUp.g_APEx_b_silde_y = Number(DrillUp.parameters["背景图起点 Y"] || 0);
	DrillUp.g_APEx_b_silde_time = Number(DrillUp.parameters["背景图移动时长"] || 30);
	DrillUp.g_APEx_noDeactive = String(DrillUp.parameters["是否保持角色肖像不消失"] || "false") == "true";
	
	/*-----------------角色肖像------------------*/
	DrillUp.g_APEx_list_length = 60;
	DrillUp.g_APEx_condition_list_length = 8;
	DrillUp.g_APEx_list = [];
	for (var i = 0; i < DrillUp.g_APEx_list_length; i++) {
		if( DrillUp.parameters['角色肖像-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['角色肖像-' + String(i+1) ]);
			DrillUp.g_APEx_list[i] = DrillUp.drill_APEx_initPortraiture( temp );
			DrillUp.g_APEx_list[i]['actor_id'] = i+1;		//（角色肖像与角色id一一对应）
		}else{
			DrillUp.g_APEx_list[i] = DrillUp.drill_APEx_initPortraiture( {} );
		}
	}
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfActionSequence ){
	
	
//=============================================================================
// * 强制更新要求
//=============================================================================
if( DrillUp.drill_COAS_getSequenceData == undefined ){
	var tip = DrillUp.drill_APEx_getPluginTip_NeedUpdate();
	alert( tip );
};
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_APEx_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_APEx_pluginCommand.call(this, command, args);
	if( command === ">角色肖像" ){	// >角色肖像 : 我方 : 1 : 强制处于条件 : 1
		
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
				if( actor ){
					actor._drill_APEx_force = temp2 -1;
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
				if( actor ){
					actor._drill_APEx_force = -1;
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
Spriteset_Battle.prototype.drill_APEx_layerAddSprite = function( sprite, layer_index ){
	this.drill_APEx_layerAddSprite_Private( sprite, layer_index );
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
Spriteset_Battle.prototype.drill_APEx_layerRemoveSprite = function( sprite ){
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
Spriteset_Battle.prototype.drill_APEx_sortByZIndex = function () {
    this.drill_APEx_sortByZIndex_Private();
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_APEx_layer_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_APEx_layer_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_APEx_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_APEx_layer_createLowerLayer.call(this);
	if(!this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Spriteset_Battle.prototype.drill_APEx_sortByZIndex_Private = function() {
	this._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Spriteset_Battle.prototype.drill_APEx_layerAddSprite_Private = function( sprite, layer_index ){
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
var _drill_APEx_s_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
	_drill_APEx_s_initialize.call(this);
	
	this._drill_APEx_spriteTank = [];			//角色贴图容器
	this._drill_APEx_needRefresh = true;		//角色贴图容器刷新标记
}
//==============================
// * 战斗层 - 创建
//==============================
var _drill_APEx_s_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
	_drill_APEx_s_createLowerLayer.call(this);
	this.drill_APEx_createLayer();		//创建角色层
}
//==============================
// * 创建 - 角色层
//==============================
Spriteset_Battle.prototype.drill_APEx_createLayer = function() {
	
	// > 角色层
	this._drill_APEx_actorLayer = new Sprite();
	this._drill_APEx_actorLayer.zIndex = DrillUp.g_APEx_layer;
	this.drill_APEx_layerAddSprite( this._drill_APEx_actorLayer, "上层" );
	
	// > 层级排序
	this.drill_APEx_sortByZIndex();	
	
	// > 重刷容器
	this._drill_APEx_needRefresh = true;
}

//==============================
// * 战斗 - 帧刷新
//==============================
var _drill_APEx_s_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_APEx_s_update.call(this);
	
	this._spriteset.drill_APEx_updateTankCheck();			//容器-检查刷新条件
	this._spriteset.drill_APEx_refreshTankIfNeed();			//容器-帧刷新
	
	this.drill_APEx_updateActorActive();		//判断当前选中角色
};
//==============================
// * 帧刷新 - 判断当前选中角色
//==============================
Scene_Battle.prototype.drill_APEx_updateActorActive = function() {
	if( this._spriteset == undefined ){ return; }
	if( this._spriteset._drill_APEx_spriteTank == undefined ){ return; }
	
	// > 激活当前选中的肖像
	var cur_Actor = BattleManager.actor();			
	for(var i=0; i < this._spriteset._drill_APEx_spriteTank.length; i++){
		var temp_sprite = this._spriteset._drill_APEx_spriteTank[i];
		if( temp_sprite == null ){ continue; }
		
		// > 显示的条件
		if( this.drill_APEx_isActorVisible() == true &&		//（肖像显示条件）
			cur_Actor != undefined &&						//（指定的贴图与角色id对应上）
			temp_sprite._drill_actor_id == cur_Actor.actorId() ){
			temp_sprite.drill_APEx_active();
			
		// > 不满足条件则隐藏
		}else{
			temp_sprite.drill_APEx_deactive();
		}
	}
};
//==============================
// * 帧刷新 - 肖像显示条件
//==============================
Scene_Battle.prototype.drill_APEx_isActorVisible = function() {
	if( DrillUp.g_APEx_noDeactive == true ){ return true; }			//（强制永久保持）
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
Spriteset_Battle.prototype.drill_APEx_updateTankCheck = function() {
	if( !this._drill_APEx_spriteTank ){ return; }
	if( this._drill_APEx_spriteTank.length == 0 ){ return; }
	if( $gameParty.members().length == 0 ){ return; }
	
	if( $gameParty.members().length != this._drill_APEx_spriteTank.length ){ 
		this._drill_APEx_needRefresh = true;
	}
}
//==============================
// * 容器 - 帧刷新
//==============================
Spriteset_Battle.prototype.drill_APEx_refreshTankIfNeed = function(){
	if( this._drill_APEx_needRefresh != true ){ return; }
	this._drill_APEx_needRefresh = false;
	
	// > 清空容器
	this.drill_APEx_clearTank();
	
	// > 建立角色贴图
	var members = $gameParty.members();
	for(var i=0; i < members.length; i++){
		var actor = members[i];
		var actor_id = actor.actorId();
		
		// > 根据数据建立sprite
		var temp_sprite = null;
		var temp_data = DrillUp.g_APEx_list[ actor_id-1 ];
		if( temp_data['actor_id'] != undefined ){	//（过滤未配置的角色肖像）
			temp_sprite = new Drill_APEx_Sprite( temp_data );
			this._drill_APEx_actorLayer.addChild(temp_sprite);
		}
		this._drill_APEx_spriteTank[i] = temp_sprite;
	}
};
//==============================
// * 容器 - 清空
//==============================
Spriteset_Battle.prototype.drill_APEx_clearTank = function(){
	for( var i = this._drill_APEx_spriteTank.length-1; i >= 0; i-- ){
		var temp_sprite = this._drill_APEx_spriteTank[i];
		if( temp_sprite == null ){ continue; }
		this._drill_APEx_actorLayer.removeChild(temp_sprite);
	}
	this._drill_APEx_spriteTank = [];
};


//=============================================================================
// ** 角色肖像【Drill_APEx_Sprite】
//
//			参数：	data.actor_id			//角色id
//					data.condition_list		//条件/GIF贴图列表（见全局变量获取的结构）
//			说明：	1.准备好数据，new即可。
//					2.实时调用函数.drill_APEx_active()和.drill_APEx_deactive()改变图像显示/隐藏。
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
function Drill_APEx_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_APEx_Sprite.prototype = Object.create(Sprite.prototype);
Drill_APEx_Sprite.prototype.constructor = Drill_APEx_Sprite;
//==============================
// * 角色肖像 - 初始化
//==============================
Drill_APEx_Sprite.prototype.initialize = function( data ) {
    Sprite.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));
	this._drill_actor = $gameActors.actor( data['actor_id'] );
	this._drill_actor_id = data['actor_id'];
	this._drill_conditions = data['condition_list'];
	//alert(JSON.stringify(data));
	
	// > 私有变量初始化
	this._drill_force_condition = [];	//强制的状态序列
	this._drill_isActived = false;		//激活状态
	
	this.drill_APEx_initSprite();		//创建前景背景
};

//==============================
// * 初始化 - 创建前景背景
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_initSprite = function() {
	var data = this._drill_data;
	
	// > 前视图
	this._drill_p_sprite = new Sprite();
	this._drill_p_sprite.anchor.x = 0.5;
	this._drill_p_sprite.anchor.y = 1;
	this._drill_p_sprite.x = Graphics.boxWidth - DrillUp.g_APEx_p_x - DrillUp.g_APEx_p_silde_x;
	this._drill_p_sprite.y = Graphics.boxHeight - DrillUp.g_APEx_p_y - DrillUp.g_APEx_p_silde_y;
	this._drill_p_sprite.opacity = 0;
	this._drill_p_sprite._move = 0;
	this._drill_p_sprite._breath = Math.random() * 10;
	this._drill_p_sprite._breath_dir = Math.floor(Math.random() * 2);
	this._drill_p_sprite._f_time = 0;
	var seq_data = DrillUp.drill_COAS_getSequenceData( data['p_actionSeq']-1 );
	if( seq_data == null ){ seq_data = {}; }
	this._drill_p_controller = new Drill_COAS_MainController( seq_data );
	this._drill_p_decorator = new Drill_COAS_SpriteDecorator( this._drill_p_sprite, this._drill_p_controller );
	
	// > 背景图
	this._drill_b_sprite = new Sprite();
	this._drill_b_sprite.anchor.x = 1;
	this._drill_b_sprite.anchor.y = 1;
	this._drill_b_sprite.x = Graphics.boxWidth - DrillUp.g_APEx_b_x - DrillUp.g_APEx_b_silde_x;
	this._drill_b_sprite.y = Graphics.boxHeight - DrillUp.g_APEx_b_y - DrillUp.g_APEx_b_silde_y;
	this._drill_b_sprite.opacity = 0;
	this._drill_b_sprite._move = 0;
	var seq_data = DrillUp.drill_COAS_getSequenceData( data['b_actionSeq']-1 );
	if( seq_data == null ){ seq_data = {}; }
	this._drill_b_controller = new Drill_COAS_MainController( seq_data );
	this._drill_b_decorator = new Drill_COAS_SpriteDecorator( this._drill_b_sprite, this._drill_b_controller );
	
	this.addChild(this._drill_b_sprite);	//背景图在后面
	this.addChild(this._drill_p_sprite);
}
//==============================
// * 角色肖像 - 显示
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_active = function(){ this._drill_isActived = true; }
//==============================
// * 角色肖像 - 隐藏
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_deactive = function(){ this._drill_isActived = false; }

//==============================
// * 角色肖像 - 帧刷新
//==============================
Drill_APEx_Sprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	if(!this._drill_actor ){ return; }
	
	this.drill_APEx_updateOrg();			//固定帧初始值
	this.drill_APEx_updateCondition();		//条件刷新
	this.drill_APEx_updatePosition();		//位置与显示
	this.drill_APEx_updateGIF();			//动画序列刷新
	this.drill_APEx_updateEffects();		//效果刷新
}
//==============================
// * 帧刷新 - 固定帧初始值
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_updateOrg = function() {
	
	// > 前视图
	this._drill_p_sprite.x = Graphics.boxWidth - DrillUp.g_APEx_p_x - DrillUp.g_APEx_p_silde_x;
	this._drill_p_sprite.y = Graphics.boxHeight - DrillUp.g_APEx_p_y - DrillUp.g_APEx_p_silde_y;
	this._drill_p_sprite.rotation = 0;
	this._drill_p_sprite.scale.x = 1;
	this._drill_p_sprite.scale.y = 1;
	
	// > 背景图
	this._drill_b_sprite.x = Graphics.boxWidth - DrillUp.g_APEx_b_x - DrillUp.g_APEx_b_silde_x;
	this._drill_b_sprite.y = Graphics.boxHeight - DrillUp.g_APEx_b_y - DrillUp.g_APEx_b_silde_y;
	this._drill_b_sprite.rotation = 0;
	this._drill_b_sprite.scale.x = 1;
	this._drill_b_sprite.scale.y = 1;
}

//==============================
// * 帧刷新 - 条件刷新
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_updateCondition = function() {
	
	var battler = this._drill_actor;
	for(var i=this._drill_conditions.length-1; i >= 0 ; i--){
		var condition = this._drill_conditions[i];
		if( condition['trigger_p_state_enable'] == false &&
			condition['trigger_p_act_enable'] == false &&
			condition['trigger_b_state_enable'] == false &&
			condition['trigger_b_act_enable'] == false ){ continue; }
		
		// > 生命条件
		if( condition['hp_enable'] == true ){		
			var per = battler.hp / battler.mhp * 100;
			if( (per < condition['hp_top'] && per > condition['hp_bottom'] ) || per == condition['hp_top'] ){
				//（不操作）
			}else{
				continue; //（开了条件，却不满足时，跳过）
			}
		}
		
		// > 魔法条件
		if( condition['mp_enable'] == true ){	
			var per = battler.mp / battler.mmp * 100;
			if( (per < condition['mp_top'] && per > condition['mp_bottom'] ) || per == condition['mp_top'] ){
				//（不操作）
			}else{
				continue; //（开了条件，却不满足时，跳过）
			}
		}
		
		// > 怒气条件
		if( condition['tp_enable'] == true ){	
			var per = battler.tp / battler.maxTp() * 100;
			if( (per < condition['tp_top'] && per > condition['tp_bottom'] ) || per == condition['tp_top'] ){
				//（不操作）
			}else{
				continue; //（开了条件，却不满足时，跳过）
			}
		}
		
		// > 开关条件
		if( condition['switch_enable'] == true ){	
			if( $gameSwitches.value( condition['switch_id'] ) == true ){
				//（不操作）
			}else{
				continue; //（开了条件，却不满足时，跳过）
			}
		}
		if( condition['switch2_enable'] == true ){	
			if( $gameSwitches.value( condition['switch2_id'] ) == true ){
				//（不操作）
			}else{
				continue; //（开了条件，却不满足时，跳过）
			}
		}
		
		// > 变量条件
		if( condition['variable_enable'] == true ){	
			if( condition['variable_operator'] == "大于等于" ){
				if( $gameVariables.value( condition['variable_id'] ) >= condition['variable_value'] ){
					//（不操作）
				}else{
					continue; //（开了条件，却不满足时，跳过）
				}
			}
			if( condition['variable_operator'] == "小于等于" ){
				if( $gameVariables.value( condition['variable_id'] ) <= condition['variable_value'] ){  }else{ continue; }
			}
			if( condition['variable_operator'] == "大于" ){
				if( $gameVariables.value( condition['variable_id'] ) > condition['variable_value'] ){  }else{ continue; }
			}
			if( condition['variable_operator'] == "小于" ){
				if( $gameVariables.value( condition['variable_id'] ) < condition['variable_value'] ){  }else{ continue; }
			}
			if( condition['variable_operator'] == "等于" ){
				if( $gameVariables.value( condition['variable_id'] ) == condition['variable_value'] ){  }else{ continue; }
			}
		}
		
		// > 状态条件
		if( condition['battleState_enable'] == true ){	
			if( battler.drill_APEx_isAnyStateAffected( condition['battleState_idList'] ) == true ){
				//（不操作）
			}else{
				continue; //（开了条件，却不满足时，跳过）
			}
		}
		
		// > 触发条件(一帧)
		var actor_id = battler.actorId();
		var temp_type = $gameTemp._drill_APEx_actionTank[ actor_id ];
		if( condition['action_type'] != "" &&
			condition['action_type'] != "关闭" ){
				
			if( condition['action_type'] == temp_type ){	
				$gameTemp._drill_APEx_actionTank[ actor_id ] = "";	//（触发满足后，关闭标记）
			}else{
				continue; //（开了条件，却不满足时，跳过）
			}
		}
		
		
		// > 前视图-切换状态元
		if( condition['trigger_p_state_enable'] == true ){
			if( condition['trigger_p_state_default'] == true ){
				this.drill_APEx_p_setStateNodeDefault();
			}else{
				this.drill_APEx_p_setStateNode( condition['trigger_p_state_node'] );
			}
		}
		// > 前视图-播放动作
		if( condition['trigger_p_act_enable'] == true ){
			this.drill_APEx_p_setAct( condition['trigger_p_act'] );
		}
		// > 背景图-切换状态元
		if( condition['trigger_b_state_enable'] == true ){
			if( condition['trigger_b_state_default'] == true ){
				this.drill_APEx_b_setStateNodeDefault();
			}else{
				this.drill_APEx_b_setStateNode( condition['trigger_b_state_node'] );
			}
		}
		// > 背景图-播放动作
		if( condition['trigger_b_act_enable'] == true ){
			this.drill_APEx_b_setAct( condition['trigger_b_act'] );
		}
		
		break;
	}
	
}

//==============================
// * 帧刷新 - 位置与显示
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_updatePosition = function() {
	
	// > 修正镜头
	if( Imported.Drill_BattleCamera ){		//（固定处于上层，在图层内）
		var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
		this._drill_p_sprite.x -= camera_pos.x;
		this._drill_p_sprite.y -= camera_pos.y;
		this._drill_b_sprite.x -= camera_pos.x;
		this._drill_b_sprite.y -= camera_pos.y;
	}
	
	// > 前视图显示/隐藏
	if( this._drill_isActived == true ){
		this._drill_p_sprite._move ++;
		if( this._drill_p_sprite._move > DrillUp.g_APEx_p_silde_time  ){
			this._drill_p_sprite._move = DrillUp.g_APEx_p_silde_time
		}
	}else{	
		this._drill_p_sprite._move --;
		if( this._drill_p_sprite._move < 0  ){
			this._drill_p_sprite._move = 0;
		}
	}
	this._drill_p_sprite.opacity = 255 / DrillUp.g_APEx_p_silde_time * this._drill_p_sprite._move;
	
	// > 前视图位置
	this._drill_p_sprite.x += Math.floor( DrillUp.g_APEx_p_silde_x / DrillUp.g_APEx_p_silde_time * this._drill_p_sprite._move );
	this._drill_p_sprite.y += Math.floor( DrillUp.g_APEx_p_silde_y / DrillUp.g_APEx_p_silde_time * this._drill_p_sprite._move );
	
	// > 背景图显示/隐藏
	if( this._drill_isActived == true ){
		this._drill_b_sprite._move ++;
		if( this._drill_b_sprite._move > DrillUp.g_APEx_b_silde_time  ){
			this._drill_b_sprite._move = DrillUp.g_APEx_b_silde_time
		}
	}else{						
		this._drill_b_sprite._move --;
		if( this._drill_b_sprite._move < 0  ){
			this._drill_b_sprite._move = 0;
		}
	}
	this._drill_b_sprite.opacity = 255 / DrillUp.g_APEx_b_silde_time * this._drill_b_sprite._move;
	
	// > 背景图位置
	this._drill_b_sprite.x += Math.floor( DrillUp.g_APEx_b_silde_x / DrillUp.g_APEx_b_silde_time * this._drill_b_sprite._move + 10 ); //（+10震动时防止过界）
	this._drill_b_sprite.y += Math.floor( DrillUp.g_APEx_b_silde_y / DrillUp.g_APEx_b_silde_time * this._drill_b_sprite._move );
}

//==============================
// * 帧刷新 - 动画序列刷新
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_updateGIF = function() {
	
	this._drill_p_controller.update();		//（COAS核心控制刷新bitmap部分）
	this._drill_p_decorator.update();
	
	this._drill_b_controller.update();
	this._drill_b_decorator.update();
}

//==============================
// * 帧刷新 - 效果刷新
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_updateEffects = function() {
	var temp_data = this._drill_data;
	var temp_sprite = this._drill_p_sprite;
	
	// > 呼吸效果
	if( temp_data['breath'] == true ){
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
	
	// > 漂浮效果
	if( temp_data['float'] == true ){
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

//==============================
// * 动画序列-前视图 - 播放默认的状态元集合（开放函数）
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_p_setStateNodeDefault = function(){
	this.drill_APEx_p_setStateNode( "默认的状态元集合" );
}
//==============================
// * 动画序列-前视图 - 播放状态节点（开放函数）
//			
//			说明：	> 父函数执行一次就重置一次，父函数不能 放帧刷新里面反复执行。
//					> 输入空名称时/无对应名称时 无效。
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_p_setStateNode = function( node_name ){
	
	// > 去重处理
	if( this._drill_APEx_p_lastName == node_name ){ return; }
	this._drill_APEx_p_lastName = node_name;
	
	this._drill_p_controller.drill_COAS_setStateNode( node_name );
}
//==============================
// * 动画序列-前视图 - 播放简单状态元集合（开放函数）
//==============================
//	（暂时不考虑用这个函数，不写了）
//==============================
// * 动画序列-前视图 - 播放动作元（开放函数）
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_p_setAct = function( act_name ){
	this._drill_p_controller.drill_COAS_setAct( act_name );
}
//==============================
// * 动画序列-前视图 - 立刻终止动作（开放函数）
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_p_stopAct = function(){
	this._drill_p_controller.drill_COAS_stopAct();
}

//==============================
// * 动画序列-背景图 - 播放默认的状态元集合（开放函数）
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_b_setStateNodeDefault = function(){
	this.drill_APEx_b_setStateNode( "默认的状态元集合" );
}
//==============================
// * 动画序列-背景图 - 播放状态节点（开放函数）
//			
//			说明：	> 父函数执行一次就重置一次，父函数不能 放帧刷新里面反复执行。
//					> 输入空名称时/无对应名称时 无效。
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_b_setStateNode = function( node_name ){
	
	// > 去重处理
	if( this._drill_APEx_b_lastName == node_name ){ return; }
	this._drill_APEx_b_lastName = node_name;
	
	this._drill_b_controller.drill_COAS_setStateNode( node_name );
}
//==============================
// * 动画序列-背景图 - 播放简单状态元集合（开放函数）
//==============================
//	（暂时不考虑用这个函数，不写了）
//==============================
// * 动画序列-背景图 - 设置动作元（开放函数）
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_b_setAct = function( act_name ){
	this._drill_b_controller.drill_COAS_setAct( act_name );
}
//==============================
// * 动画序列-背景图 - 立刻终止动作（开放函数）
//==============================
Drill_APEx_Sprite.prototype.drill_APEx_b_stopAct = function(){
	this._drill_b_controller.drill_COAS_stopAct();
}



//=============================================================================
// ** 技能捕获容器
//=============================================================================
//==============================
// * 技能捕获 - 执行捕获
//==============================
var _drill_APEx_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	_drill_APEx_apply.call(this,target);
	
	$gameTemp.drill_APEx_pushActionCatch( this.subject(), target, this.item() );
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_APEx_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_APEx_temp_initialize.call(this);
	
	this._drill_APEx_actionTank = {};
}
//==============================
// * 容器 - 战斗开始时，清空
//==============================
var _drill_APEx_manager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _drill_APEx_manager_initMembers.call(this);
	
	$gameTemp._drill_APEx_actionTank = {};
}
//==============================
// * 容器 - 加入一次攻击的技能对象
//
//			参数：	攻击者，被攻击者，技能数据
//==============================
Game_Temp.prototype.drill_APEx_pushActionCatch = function( attacker, target, skill_item ){
	
	// > 没有我方单位，跳过
	if( attacker.isActor() == false && target.isActor() == false ){ return; }
	
	var damage_type = skill_item.damage.type ;
	var damage_attr = skill_item.damage.elementId ;
	var result = target.result();
	
	// > 被攻击
	if( target.isActor() ){
		var actor_id = target.actorId();
		var action_type = "";
		
		if( result.isHit() ){
			if( damage_type == 1 ){ action_type = "自己被攻击命中时-HP伤害"; }
			if( damage_type == 2 ){ action_type = "自己被攻击命中时-HP恢复"; }
			if( damage_type == 3 ){ action_type = "自己被攻击命中时-HP吸收"; }
			if( damage_type == 4 ){ action_type = "自己被攻击命中时-MP伤害"; }
			if( damage_type == 5 ){ action_type = "自己被攻击命中时-MP恢复"; }
			if( damage_type == 6 ){ action_type = "自己被攻击命中时-MP吸收"; }
		}else{
			action_type = "自己被攻击躲避时";
		}
		this._drill_APEx_actionTank[ actor_id ] = action_type;
	}
	
	// > 主动攻击
	if( attacker.isActor() ){
		var actor_id = attacker.actorId();
		var action_type = "";
		
		if( result.isHit() ){
			if( damage_type == 1 ){ action_type = "主动攻击目标命中时-HP伤害"; }
			if( damage_type == 2 ){ action_type = "主动攻击目标命中时-HP恢复"; }
			if( damage_type == 3 ){ action_type = "主动攻击目标命中时-HP吸收"; }
			if( damage_type == 4 ){ action_type = "主动攻击目标命中时-MP伤害"; }
			if( damage_type == 5 ){ action_type = "主动攻击目标命中时-MP恢复"; }
			if( damage_type == 6 ){ action_type = "主动攻击目标命中时-MP吸收"; }
		}else{
			action_type = "主动攻击目标且目标躲避时";
		}
		this._drill_APEx_actionTank[ actor_id ] = action_type;
	}
	
}
//==============================
// * 状态 - 判断 - 是否含列表中任一状态
//==============================
Game_BattlerBase.prototype.drill_APEx_isAnyStateAffected = function( state_list ){
	for(var i = 0; i < state_list.length; i++ ){
		var state_id = Number(state_list[i]);
		if( this._states.contains(state_id) ){
			return true;
		}
	}
    return false;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_ActorPortraitureExtend = false;
		var tip = DrillUp.drill_APEx_getPluginTip_NoBasePlugin();
		alert( tip );
}


