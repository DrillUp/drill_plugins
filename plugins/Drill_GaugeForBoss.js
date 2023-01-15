//=============================================================================
// Drill_GaugeForBoss.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        UI - 高级BOSS生命固定框
 * @author Drill_up
 * 
 * @Drill_LE_param "固定框样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_GFB_styleList_length"
 * 
 * @Drill_LE_param "BOSS设置-%d"
 * @Drill_LE_parentKey "---BOSS设置%d至%d---"
 * @Drill_LE_var "DrillUp.g_GFB_bind_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_GaugeForBoss +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能在给指定敌人显示多个不同的BOSS生命固定框。
 * ★★必须放在 车轮战 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。也可以与其它插件组合。
 * 基于：
 *   - Drill_CoreOfBallistics       系统-弹道核心
 *   - Drill_CoreOfGaugeMeter       系统-参数条核心★★v1.5及以上★★
 *   - Drill_CoreOfGaugeNumber      系统-参数数字核心★★v1.2及以上★★
 *     必须要有上述核心，才能配置完整的boss框。
 * 作用于：
 *   - MOG_ConsecutiveBattles       战斗-车轮战
 *     可以使得敌人出现，以及车轮战出现的boss，出现时显示新的固定框。
 * 被扩展：
 *   - Drill_EnemyTextColor         UI-敌人文本颜色
 *     通过该插件，可以使得boss的名字变色。
 *   - Drill_MiniPlateForState      鼠标-状态和buff说明窗口
 *     通过该插件，可以状态能显示详细说明。
 *   - Drill_X_GaugeBossFilter      UI-高级BOSS框的滤镜效果[扩展]
 *     通过该插件，BOSS框、头像可以添加滤镜效果。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面（暂无地图界面）
 *   可放置于 上层、图片层、最顶层。
 * 2.更多内容可以去看看文档 "13.UI > 关于高级BOSS生命固定框.docx"。
 *   其中也有BOSS框"从零开始设计"的教程。
 * 细节：
 *   (1.BOSS固定框样式 = 3个参数条 + 6个参数数字 + 2个外框 + 其他贴图。
 *   (2.战斗界面和地图界面中，你可以自定义战斗层级/图片层级。
 *      你需要考虑规划 BOSS框 与 其他贴图 的先后顺序与位置。
 *   (3.BOSS设置将使得 样式和敌人 绑定在一起。
 *      注意，敌群设置时，重复敌人可以出现多个。而如果指定BOSS的敌人
 *      重复出现了两个，则会出现两个重叠在一起的BOSS框。
 *   (4.战斗中有四个名词： 角色、敌人、我方、敌方。
 *      角色/敌人，是指数据库里配置的数据信息。
 *      我方/敌方，是指战斗时，双方所站立的位置。
 *      比如，角色[1] 表示角色ID为1的数据。
 *      比如，敌方[1] 表示战斗时，第1个位置的敌人。
 *      另外，这里的 BOSS设置[1] 表示插件中配置的绑定数据。
 *   (5.注意，该插件配置有 固定框样式 和 BOSS设置 两个。
 *      找不到配置的时候，记得 往下翻 参数列表，因为BOSS设置在下面。
 * 参数条：
 *   (1.参数值：　固定绑定BOSS属性。
 *      遮罩：　　可自定义。
 *      旋转：　　可自定义。
 *      段上限：　固定绑定BOSS属性，可多段。
 *      流动效果：可自定义。
 *      凹槽条：　可自定义。
 *      弹出条：　可自定义。
 *      粒子：　　可自定义。
 *      游标：　　可自定义。
 *      加满动画：可自定义。
 *   (2.参数条样式配置在 参数条核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 *      你需要先配置参数条样式，才能将样式id对应到 生命、魔法、怒气。
 *   (3.如果你有不同想法，魔法条、怒气条可以设置多段、游标、凹槽条。
 * 参数数字：
 *   (1.参数值：　固定绑定敌人属性。
 *      旋转：　　可自定义。
 *      滚动效果：可自定义。
 *      符号：　　可自定义。
 *      前缀后缀：可自定义。
 *      对齐方式：可自定义。
 *      额定值：　固定绑定敌人属性。
 *      额定符号：可自定义。
 *      时间格式：可自定义。
 *   (2.参数数字样式配置在 参数数字核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 *      你需要先配置参数数字样式，才能将样式id对应到 生命、魔法、怒气。
 *   (3."x19"或"+100/100"等数字组合写法，都在核心中配置样式，该插件只
 *      关联样式id。
 * 插件指令：
 *   (1.你必须先完成固定框样式配置，并且绑定到敌人之后，再来考虑插件指
 *      令的额外辅助功能。
 *   (2.插件指令分为两种情况，一种是在战斗时的临时修改数据，另一种需要
 *      在战斗前进行配置设置。
 * 时机：
 *   (1.由于BOSS处于"中途出现"的状态时，BOSS框也会显示。
 *      所以你需要在战斗前隐藏框，再通过插件指令显示，达到"中途出现"框。
 *   (2.BOSS变身后，相当于换了另一个敌人。
 *      原来的BOSS框会消失，对应新的BOSS框会显现。
 *   (3.车轮战中，每一波战斗相当于一次完整的战斗。BOSS框会重复刷新。
 *      由于mog车轮战和战斗镜头插件交互存在bug，BOSS框在修正坐标时可能
 *      会出界，看不见。
 * 存储数据：
 *   (1.插件中很多属性修改后永久有效，这些数据存入了存档中，
 *      如果读取旧存档，会出现旧存档中部分数据不一致的问题。
 *   (2.插件支持 空数据同步更新 的优化，
 *      详细去看看"21.管理器 > 数据更新与旧存档.docx"
 * 设计：
 *   (1.很多时候你并不缺少工具，你缺的是一个生命框设计参考。
 *      比如，玩一款你喜欢的游戏，留意一下游戏中敌人的血条和数值。
 *      或者去看一些游戏视频，尝试模仿，你就能逐渐理解其结构了。
 *      另外注意，该插件配置有 固定框样式 和 BOSS设置 两个。
 *      找不到配置的时候，记得 往下翻 参数列表，因为BOSS设置在下面。
 * 旧版本：
 *   (1.由于底层进行了全面翻新，当前版本与 1.6及1.6以前版本 已经完全不同，
 *      旧版本配置的数据在新版本中不兼容。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__boss （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__boss文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 样式1 资源-固定框背景
 * 样式1 资源-固定框前景
 * 样式2 ……
 * ……
 * 
 * BOSS设置1 资源-BOSS头像
 * BOSS设置2 资源-BOSS头像
 * ……
 * 
 * BOSS样式本体设置的资源不多，但是参数条和参数数字的资源非常多，你需
 * 要仔细给你的文件分门别类。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制部分内容在战斗时显示隐藏：
 * （冒号左右都有一个空格）
 *
 * 插件指令：>高级BOSS框 : 敌方[1] : 固定框 : 隐藏
 * 插件指令：>高级BOSS框 : 全部敌方 : 固定框 : 隐藏
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 固定框 : 隐藏
 * 
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 固定框 : 隐藏
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 固定框 : 显示
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 固定框 : 修改样式[1]
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 固定框 : 修改当前层级[图片层]
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 名称 : 显示
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 名称 : 隐藏
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 头像 : 显示
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 头像 : 隐藏
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 头像 : 切换备用头像[1]
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 头像 : 还原头像
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 生命条 : 修改段上限[200]
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 魔法条 : 修改段上限[200]
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 怒气条 : 修改段上限[200]
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 生命数字 : 显示
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 生命数字 : 隐藏
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 魔法数字 : 显示
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 魔法数字 : 隐藏
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 怒气数字 : 显示
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 怒气数字 : 隐藏
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 生命段数 : 显示
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 生命段数 : 隐藏
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 魔法段数 : 显示
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 魔法段数 : 隐藏
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 怒气段数 : 显示
 * 插件指令：>高级BOSS框 : BOSS设置[1] : 怒气段数 : 隐藏
 * 
 * 1.插件指令的 前半部分（敌方）和后半部分（隐藏固定框） 的参数可以
 *   随意组合。一共有3*24种组合方式。
 * 2."BOSS设置[1]"对应插件中id为1的BOSS设置，插件指令执行后，
 *   在游戏中永久有效。
 * 3.因为"敌方"只在战斗界面时有定义，
 *   所以含有"敌方"的插件指令只在战斗界面中有效。
 *   "敌方[1]"数字对应的是战斗中从左至右第1个敌人。
 *   如果这个敌人没有绑定BOSS设置，则没有效果。
 * 4.上述的插件指令基本都是立即生效的。
 *   只有"修改样式"指令，在下一场战斗中才能生效。
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
 * 测试方法：   在各个界面中以正常游戏流程进行测试。
 * 测试结果：   战斗界面，消耗为：【22.52ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.之前一直以为战斗时偶尔会出现的卡顿是BOSS框引起的，后来才发现
 *   都是动画播放时自身底层大量使用了滤镜造成的。
 *   BOSS框本身的消耗较小。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了显示隐藏的插件指令。修复了与技能树插件冲突的bug。
 * [v1.2]
 * 修复了生命值一直显示最大值的bug。
 * [v1.3]
 * 添加了战斗结束后消失设置，以及优化层级位置。
 * [v1.4]
 * 优化了车轮战中连续出现boss时，boss框显示隐藏的部分。
 * [v1.5]
 * 修改了插件关联的资源文件夹。
 * [v1.6]
 * 优化了内部结构。
 * [v1.7]
 * 翻新了整体结构，使其基于更宽泛的参数条、参数数字核心。
 * 添加了一些战斗前修改样式的插件指令。
 * [v1.8]
 * 优化了 旧存档 中新加的数据不能同步更新的问题。
 * [v1.9]
 * 添加了boss框可修改 上层、图片层、最顶层 的设置。
 * [v2.0]
 * 优化了与战斗活动镜头的变换关系。
 * [v2.1]
 * 优化了旧存档的识别与兼容。
 *
 *
 * @param 战斗结算时是否隐藏框
 * @type boolean
 * @on 隐藏
 * @off 保持显示
 * @desc true - 隐藏，false - 保持显示。进入战斗结算后，boss框会自动消失。
 * @default true
 * 
 * @param 资源-备用BOSS头像
 * @desc 备用的boss头像，你可以通过插件指令给某个boss换上临时的备用头像。比如boss变身时。
 * @default []
 * @require 1
 * @dir img/Special__boss/
 * @type file[]
 *
 * @param ---固定框样式---
 * @default
 *
 * @param 固定框样式-1
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==BOSS精简风格==","----参数条----":"","生命-是否显示参数条":"true","生命-参数条样式":"21","生命-平移-参数条 X":"15","生命-平移-参数条 Y":"16","生命-是否启用加满动画":"true","生命-加满方式":"匀速加满","生命-加满持续时间":"90","生命-加满延迟":"30","魔法-是否显示参数条":"false","魔法-参数条样式":"0","魔法-平移-参数条 X":"0","魔法-平移-参数条 Y":"0","魔法-是否启用加满动画":"false","魔法-加满方式":"匀速加满","魔法-加满持续时间":"90","魔法-加满延迟":"30","怒气-是否显示参数条":"false","怒气-参数条样式":"0","怒气-平移-参数条 X":"0","怒气-平移-参数条 Y":"0","怒气-是否启用加满动画":"false","怒气-加满方式":"匀速加满","怒气-加满持续时间":"90","怒气-加满延迟":"30","----参数数字----":"","生命-是否显示参数数字":"false","生命-参数数字样式":"0","生命-平移-参数数字 X":"0","生命-平移-参数数字 Y":"0","生命段数-是否显示参数数字":"false","生命段数-参数数字样式":"0","生命段数-平移-参数数字 X":"0","生命段数-平移-参数数字 Y":"0","魔法-是否显示参数数字":"false","魔法-参数数字样式":"0","魔法-平移-参数数字 X":"0","魔法-平移-参数数字 Y":"0","魔法段数-是否显示参数数字":"false","魔法段数-参数数字样式":"0","魔法段数-平移-参数数字 X":"0","魔法段数-平移-参数数字 Y":"0","怒气-是否显示参数数字":"false","怒气-参数数字样式":"0","怒气-平移-参数数字 X":"0","怒气-平移-参数数字 Y":"0","怒气段数-是否显示参数数字":"false","怒气段数-参数数字样式":"0","怒气段数-平移-参数数字 X":"0","怒气段数-平移-参数数字 Y":"0","----外框----":"","资源-固定框背景":"BOSS精简风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----震动效果----":"","受伤是否震动框":"true","震动模式":"上下震动","震动偏移量":"4","----姓名显示----":"","是否显示姓名":"true","平移-姓名 X":"55","平移-姓名 Y":"19","姓名字体大小":"22","----状态显示----":"","是否显示状态":"false","平移-状态 X":"229","平移-状态 Y":"62","状态显示模式":"单一闪烁","状态对齐方式":"左对齐","状态间距":"0","最大显示状态数量":"4"}
 * 
 * @param 固定框样式-2
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==BOSS像素风格==","----参数条----":"","生命-是否显示参数条":"true","生命-参数条样式":"22","生命-平移-参数条 X":"20","生命-平移-参数条 Y":"20","生命-是否启用加满动画":"true","生命-加满方式":"匀速加满","生命-加满持续时间":"90","生命-加满延迟":"30","魔法-是否显示参数条":"false","魔法-参数条样式":"0","魔法-平移-参数条 X":"0","魔法-平移-参数条 Y":"0","魔法-是否启用加满动画":"false","魔法-加满方式":"匀速加满","魔法-加满持续时间":"90","魔法-加满延迟":"30","怒气-是否显示参数条":"false","怒气-参数条样式":"0","怒气-平移-参数条 X":"0","怒气-平移-参数条 Y":"0","怒气-是否启用加满动画":"false","怒气-加满方式":"匀速加满","怒气-加满持续时间":"90","怒气-加满延迟":"30","----参数数字----":"","生命-是否显示参数数字":"true","生命-参数数字样式":"21","生命-平移-参数数字 X":"570","生命-平移-参数数字 Y":"80","生命段数-是否显示参数数字":"false","生命段数-参数数字样式":"0","生命段数-平移-参数数字 X":"0","生命段数-平移-参数数字 Y":"0","魔法-是否显示参数数字":"false","魔法-参数数字样式":"0","魔法-平移-参数数字 X":"0","魔法-平移-参数数字 Y":"0","魔法段数-是否显示参数数字":"false","魔法段数-参数数字样式":"0","魔法段数-平移-参数数字 X":"0","魔法段数-平移-参数数字 Y":"0","怒气-是否显示参数数字":"false","怒气-参数数字样式":"0","怒气-平移-参数数字 X":"0","怒气-平移-参数数字 Y":"0","怒气段数-是否显示参数数字":"false","怒气段数-参数数字样式":"0","怒气段数-平移-参数数字 X":"0","怒气段数-平移-参数数字 Y":"0","----外框----":"","资源-固定框背景":"BOSS像素风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----震动效果----":"","受伤是否震动框":"true","震动模式":"上下震动","震动偏移量":"4","----姓名显示----":"","是否显示姓名":"false","平移-姓名 X":"55","平移-姓名 Y":"19","姓名字体大小":"22","----状态显示----":"","是否显示状态":"false","平移-状态 X":"229","平移-状态 Y":"62","状态显示模式":"单一闪烁","状态对齐方式":"左对齐","状态间距":"0","最大显示状态数量":"4"}
 * 
 * @param 固定框样式-3
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==BOSS粗风格==","----参数条----":"","生命-是否显示参数条":"true","生命-参数条样式":"23","生命-平移-参数条 X":"84","生命-平移-参数条 Y":"9","生命-是否启用加满动画":"true","生命-加满方式":"匀速加满","生命-加满持续时间":"90","生命-加满延迟":"30","魔法-是否显示参数条":"false","魔法-参数条样式":"0","魔法-平移-参数条 X":"10","魔法-平移-参数条 Y":"10","魔法-是否启用加满动画":"true","魔法-加满方式":"匀速加满","魔法-加满持续时间":"90","魔法-加满延迟":"30","怒气-是否显示参数条":"false","怒气-参数条样式":"0","怒气-平移-参数条 X":"10","怒气-平移-参数条 Y":"10","怒气-是否启用加满动画":"true","怒气-加满方式":"匀速加满","怒气-加满持续时间":"90","怒气-加满延迟":"30","----参数数字----":"","生命-是否显示参数数字":"false","生命-参数数字样式":"22","生命-平移-参数数字 X":"546","生命-平移-参数数字 Y":"59","生命段数-是否显示参数数字":"true","生命段数-参数数字样式":"23","生命段数-平移-参数数字 X":"540","生命段数-平移-参数数字 Y":"22","魔法-是否显示参数数字":"false","魔法-参数数字样式":"0","魔法-平移-参数数字 X":"10","魔法-平移-参数数字 Y":"10","魔法段数-是否显示参数数字":"false","魔法段数-参数数字样式":"0","魔法段数-平移-参数数字 X":"10","魔法段数-平移-参数数字 Y":"10","怒气-是否显示参数数字":"false","怒气-参数数字样式":"0","怒气-平移-参数数字 X":"10","怒气-平移-参数数字 Y":"10","怒气段数-是否显示参数数字":"false","怒气段数-参数数字样式":"0","怒气段数-平移-参数数字 X":"10","怒气段数-平移-参数数字 Y":"10","----外框----":"","资源-固定框背景":"BOSS粗风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----震动效果----":"","受伤是否震动框":"false","震动模式":"上下震动","震动偏移量":"4","----姓名显示----":"","是否显示姓名":"true","平移-姓名 X":"94","平移-姓名 Y":"51","姓名字体大小":"20","----状态显示----":"","是否显示状态":"true","平移-状态 X":"229","平移-状态 Y":"62","状态显示模式":"单一闪烁","状态对齐方式":"左对齐","状态间距":"0","最大显示状态数量":"4"}
 * 
 * @param 固定框样式-4
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==BOSS标准风格==","----参数条----":"","生命-是否显示参数条":"true","生命-参数条样式":"24","生命-平移-参数条 X":"84","生命-平移-参数条 Y":"13","生命-是否启用加满动画":"true","生命-加满方式":"匀速加满","生命-加满持续时间":"90","生命-加满延迟":"30","魔法-是否显示参数条":"true","魔法-参数条样式":"25","魔法-平移-参数条 X":"84","魔法-平移-参数条 Y":"28","魔法-是否启用加满动画":"true","魔法-加满方式":"匀速加满","魔法-加满持续时间":"90","魔法-加满延迟":"30","怒气-是否显示参数条":"true","怒气-参数条样式":"26","怒气-平移-参数条 X":"84","怒气-平移-参数条 Y":"36","怒气-是否启用加满动画":"true","怒气-加满方式":"匀速加满","怒气-加满持续时间":"90","怒气-加满延迟":"30","----参数数字----":"","生命-是否显示参数数字":"true","生命-参数数字样式":"22","生命-平移-参数数字 X":"542","生命-平移-参数数字 Y":"48","生命段数-是否显示参数数字":"false","生命段数-参数数字样式":"23","生命段数-平移-参数数字 X":"10","生命段数-平移-参数数字 Y":"10","魔法-是否显示参数数字":"false","魔法-参数数字样式":"0","魔法-平移-参数数字 X":"10","魔法-平移-参数数字 Y":"10","魔法段数-是否显示参数数字":"false","魔法段数-参数数字样式":"0","魔法段数-平移-参数数字 X":"10","魔法段数-平移-参数数字 Y":"10","怒气-是否显示参数数字":"false","怒气-参数数字样式":"0","怒气-平移-参数数字 X":"10","怒气-平移-参数数字 Y":"10","怒气段数-是否显示参数数字":"false","怒气段数-参数数字样式":"0","怒气段数-平移-参数数字 X":"10","怒气段数-平移-参数数字 Y":"10","----外框----":"","资源-固定框背景":"BOSS标准风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----震动效果----":"","受伤是否震动框":"false","震动模式":"上下震动","震动偏移量":"10","----姓名显示----":"","是否显示姓名":"true","平移-姓名 X":"94","平移-姓名 Y":"52","姓名字体大小":"20","----状态显示----":"","是否显示状态":"true","平移-状态 X":"229","平移-状态 Y":"63","状态显示模式":"直线并排","状态对齐方式":"左对齐","状态间距":"0","最大显示状态数量":"4"}
 * 
 * @param 固定框样式-5
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==BOSS反向风格==","----参数条----":"","生命-是否显示参数条":"true","生命-参数条样式":"27","生命-平移-参数条 X":"485","生命-平移-参数条 Y":"58","生命-是否启用加满动画":"true","生命-加满方式":"匀速加满","生命-加满持续时间":"90","生命-加满延迟":"30","魔法-是否显示参数条":"true","魔法-参数条样式":"28","魔法-平移-参数条 X":"485","魔法-平移-参数条 Y":"71","魔法-是否启用加满动画":"true","魔法-加满方式":"匀速加满","魔法-加满持续时间":"90","魔法-加满延迟":"30","怒气-是否显示参数条":"false","怒气-参数条样式":"0","怒气-平移-参数条 X":"10","怒气-平移-参数条 Y":"10","怒气-是否启用加满动画":"true","怒气-加满方式":"匀速加满","怒气-加满持续时间":"90","怒气-加满延迟":"30","----参数数字----":"","生命-是否显示参数数字":"true","生命-参数数字样式":"26","生命-平移-参数数字 X":"445","生命-平移-参数数字 Y":"43","生命段数-是否显示参数数字":"false","生命段数-参数数字样式":"0","生命段数-平移-参数数字 X":"10","生命段数-平移-参数数字 Y":"10","魔法-是否显示参数数字":"true","魔法-参数数字样式":"24","魔法-平移-参数数字 X":"445","魔法-平移-参数数字 Y":"65","魔法段数-是否显示参数数字":"false","魔法段数-参数数字样式":"0","魔法段数-平移-参数数字 X":"10","魔法段数-平移-参数数字 Y":"10","怒气-是否显示参数数字":"false","怒气-参数数字样式":"0","怒气-平移-参数数字 X":"10","怒气-平移-参数数字 Y":"10","怒气段数-是否显示参数数字":"false","怒气段数-参数数字样式":"0","怒气段数-平移-参数数字 X":"10","怒气段数-平移-参数数字 Y":"10","----外框----":"","资源-固定框背景":"BOSS反向风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0","----震动效果----":"","受伤是否震动框":"true","震动模式":"左右震动","震动偏移量":"4","----姓名显示----":"","是否显示姓名":"true","平移-姓名 X":"378","平移-姓名 Y":"10","姓名字体大小":"20","----状态显示----":"","是否显示状态":"true","平移-状态 X":"340","平移-状态 Y":"20","状态显示模式":"单一闪烁","状态对齐方式":"左对齐","状态间距":"0","最大显示状态数量":"4"}
 *
 * @param 固定框样式-6
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-7
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-8
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-9
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-10
 * @parent ---固定框样式---
 * @type struct<GFBStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param ---BOSS设置 1至20---
 * @default
 *
 * @param BOSS设置-1
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-2
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-3
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-4
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-5
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-6
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-7
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-8
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-9
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-10
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-11
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-12
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-13
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-14
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-15
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-16
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-17
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-18
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-19
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-20
 * @parent ---BOSS设置 1至20---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param ---BOSS设置21至40---
 * @default
 *
 * @param BOSS设置-21
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-22
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-23
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-24
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-25
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-26
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-27
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-28
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-29
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-30
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-31
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-32
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-33
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-34
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-35
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-36
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-37
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-38
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-39
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-40
 * @parent ---BOSS设置21至40---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param ---BOSS设置41至60---
 * @default
 *
 * @param BOSS设置-41
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-42
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-43
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-44
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-45
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-46
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-47
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-48
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-49
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-50
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-51
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-52
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-53
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-54
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-55
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-56
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-57
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-58
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-59
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 * @param BOSS设置-60
 * @parent ---BOSS设置41至60---
 * @type struct<GFBBind>
 * @desc 绑定指定敌人为BOSS。
 * @default 
 *
 */
/*~struct~GFBStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的boss样式==
 *
 * @param ----参数条----
 * @desc 
 * 
 * @param 生命-是否显示参数条
 * @parent ----参数条----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 生命-参数条样式
 * @parent 生命-是否显示参数条
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param 生命-平移-参数条 X
 * @parent 生命-是否显示参数条
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 生命-平移-参数条 Y
 * @parent 生命-是否显示参数条
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 生命-是否启用加满动画
 * @parent 生命-是否显示参数条
 * @type boolean
 * @on 播放
 * @off 不播放
 * @desc true - 播放，false - 不播放
 * @default true
 *
 * @param 生命-加满方式
 * @parent 生命-是否启用加满动画
 * @type select
 * @option 匀速加满
 * @value 匀速加满
 * @option 弹性加满
 * @value 弹性加满
 * @desc 参数条加满的方式。
 * @default 匀速加满
 *
 * @param 生命-加满持续时间
 * @parent 生命-是否启用加满动画
 * @type number
 * @min 1
 * @desc 动画将在时间内加满参数条，单位帧。（1秒60帧）
 * @default 150
 *
 * @param 生命-加满延迟
 * @parent 生命-是否启用加满动画
 * @type number
 * @min 0
 * @desc 浮动框出现后，播放加满动画的延迟时间，单位帧。（1秒60帧）
 * @default 90
 * 
 * @param 魔法-是否显示参数条
 * @parent ----参数条----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 魔法-参数条样式
 * @parent 魔法-是否显示参数条
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param 魔法-平移-参数条 X
 * @parent 魔法-是否显示参数条
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 魔法-平移-参数条 Y
 * @parent 魔法-是否显示参数条
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 魔法-是否启用加满动画
 * @parent 魔法-是否显示参数条
 * @type boolean
 * @on 播放
 * @off 不播放
 * @desc true - 播放，false - 不播放
 * @default true
 *
 * @param 魔法-加满方式
 * @parent 魔法-是否启用加满动画
 * @type select
 * @option 匀速加满
 * @value 匀速加满
 * @option 弹性加满
 * @value 弹性加满
 * @desc 参数条加满的方式。
 * @default 匀速加满
 *
 * @param 魔法-加满持续时间
 * @parent 魔法-是否启用加满动画
 * @type number
 * @min 1
 * @desc 动画将在时间内加满参数条，单位帧。（1秒60帧）
 * @default 150
 *
 * @param 魔法-加满延迟
 * @parent 魔法-是否启用加满动画
 * @type number
 * @min 0
 * @desc 浮动框出现后，播放加满动画的延迟时间，单位帧。（1秒60帧）
 * @default 90
 * 
 * @param 怒气-是否显示参数条
 * @parent ----参数条----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 怒气-参数条样式
 * @parent 怒气-是否显示参数条
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param 怒气-平移-参数条 X
 * @parent 怒气-是否显示参数条
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 怒气-平移-参数条 Y
 * @parent 怒气-是否显示参数条
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 怒气-是否启用加满动画
 * @parent 怒气-是否显示参数条
 * @type boolean
 * @on 播放
 * @off 不播放
 * @desc true - 播放，false - 不播放
 * @default true
 *
 * @param 怒气-加满方式
 * @parent 怒气-是否启用加满动画
 * @type select
 * @option 匀速加满
 * @value 匀速加满
 * @option 弹性加满
 * @value 弹性加满
 * @desc 参数条加满的方式。
 * @default 匀速加满
 *
 * @param 怒气-加满持续时间
 * @parent 怒气-是否启用加满动画
 * @type number
 * @min 1
 * @desc 动画将在时间内加满参数条，单位帧。（1秒60帧）
 * @default 150
 * 
 * @param 怒气-加满延迟
 * @parent 怒气-是否启用加满动画
 * @type number
 * @min 0
 * @desc 浮动框出现后，播放加满动画的延迟时间，单位帧。（1秒60帧）
 * @default 90
 * 
 * 
 * @param ----参数数字----
 * @desc 
 * 
 * @param 生命-是否显示参数数字
 * @parent ----参数数字----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 生命-参数数字样式
 * @parent 生命-是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param 生命-平移-参数数字 X
 * @parent 生命-是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 生命-平移-参数数字 Y
 * @parent 生命-是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 生命-是否将最大值覆盖到额定值
 * @parent 生命-是否显示参数数字
 * @type boolean
 * @on 覆盖
 * @off 保持默认额定值
 * @desc 如果你在参数数字样式中开启了额定值显示，这里将会把最大生命值作为额定值。
 * @default true
 * 
 * @param 生命段数-是否显示参数数字
 * @parent ----参数数字----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 生命段数-参数数字样式
 * @parent 生命段数-是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param 生命段数-平移-参数数字 X
 * @parent 生命段数-是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 生命段数-平移-参数数字 Y
 * @parent 生命段数-是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 魔法-是否显示参数数字
 * @parent ----参数数字----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 魔法-参数数字样式
 * @parent 魔法-是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 * 
 * @param 魔法-平移-参数数字 X
 * @parent 魔法-是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 魔法-平移-参数数字 Y
 * @parent 魔法-是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 魔法-是否将最大值覆盖到额定值
 * @parent 魔法-是否显示参数数字
 * @type boolean
 * @on 覆盖
 * @off 保持默认额定值
 * @desc 如果你在参数数字样式中开启了额定值显示，这里将会把最大魔法值作为额定值。
 * @default true
 * 
 * @param 魔法段数-是否显示参数数字
 * @parent ----参数数字----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 魔法段数-参数数字样式
 * @parent 魔法段数-是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param 魔法段数-平移-参数数字 X
 * @parent 魔法段数-是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 魔法段数-平移-参数数字 Y
 * @parent 魔法段数-是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 怒气-是否显示参数数字
 * @parent ----参数数字----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 怒气-参数数字样式
 * @parent 怒气-是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param 怒气-平移-参数数字 X
 * @parent 怒气-是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 怒气-平移-参数数字 Y
 * @parent 怒气-是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 * @param 怒气-是否将最大值覆盖到额定值
 * @parent 怒气-是否显示参数数字
 * @type boolean
 * @on 覆盖
 * @off 保持默认额定值
 * @desc 如果你在参数数字样式中开启了额定值显示，这里将会把最大怒气值作为额定值。
 * @default true
 * 
 * @param 怒气段数-是否显示参数数字
 * @parent ----参数数字----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 * 
 * @param 怒气段数-参数数字样式
 * @parent 怒气段数-是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param 怒气段数-平移-参数数字 X
 * @parent 怒气段数-是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 10
 *
 * @param 怒气段数-平移-参数数字 Y
 * @parent 怒气段数-是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 10
 * 
 *
 * @param ----外框----
 * @desc 
 *
 * @param 资源-固定框背景
 * @parent ----外框----
 * @desc 固定框背景的图片资源。
 * @default (需配置)BOSS固定框背景
 * @require 1
 * @dir img/Special__boss/
 * @type file
 *
 * @param 平移-固定框背景 X
 * @parent ----外框----
 * @desc 修正校对背景的位置用，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-固定框背景 Y
 * @parent ----外框----
 * @desc 修正校对背景的位置用，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 资源-固定框前景
 * @parent ----外框----
 * @desc 固定框前景的图片资源，可以遮住生命条、魔法条、怒气条。
 * @default (需配置)BOSS固定框前景
 * @require 1
 * @dir img/Special__boss/
 * @type file
 *
 * @param 平移-固定框前景 X
 * @parent ----外框----
 * @desc 修正校对前景的位置用，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-固定框前景 Y
 * @parent ----外框----
 * @desc 修正校对前景的位置用，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 * 
 * 
 * @param ----震动效果----
 * @desc 
 * 
 * @param 受伤是否震动框
 * @parent ----震动效果----
 * @type boolean
 * @on 震动
 * @off 不震动
 * @desc true - 震动，false - 不震动
 * @default true
 *
 * @param 震动模式
 * @parent ----震动效果----
 * @type select
 * @option 左右震动
 * @value 左右震动
 * @option 上下震动
 * @value 上下震动
 * @desc 样式框震动的模式。
 * @default 左右震动
 *
 * @param 震动偏移量
 * @parent ----震动效果----
 * @type number
 * @min 1
 * @desc 震动偏移的距离，单位像素。
 * @default 10
 * 
 * 
 * @param ----姓名显示----
 * @desc 
 * 
 * @param 是否显示姓名
 * @parent ----姓名显示----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 平移-姓名 X
 * @parent ----姓名显示----
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 94
 *
 * @param 平移-姓名 Y
 * @parent ----姓名显示----
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 51
 * 
 * @param 姓名字体大小
 * @parent ----姓名显示----
 * @type number
 * @min 1
 * @desc 姓名的字体大小。
 * @default 20
 * 
 * @param ----状态显示----
 * @desc 
 * 
 * @param 是否显示状态
 * @parent ----状态显示----
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 平移-状态 X
 * @parent ----状态显示----
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 229
 *
 * @param 平移-状态 Y
 * @parent ----状态显示----
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 62
 *
 * @param 状态显示模式
 * @parent ----状态显示----
 * @type select
 * @option 单一闪烁
 * @value 单一闪烁
 * @option 直线并排
 * @value 直线并排
 * @desc 状态显示的模式。
 * @default 单一闪烁
 *
 * @param 状态对齐方式
 * @parent 状态显示模式
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 右对齐
 * @value 右对齐
 * @option 上对齐
 * @value 上对齐
 * @option 下对齐
 * @value 下对齐
 * @desc 直线并排的状态的对齐方式。
 * @default 左对齐
 *
 * @param 状态间距
 * @parent 状态显示模式
 * @type number
 * @min 0
 * @desc 直线并排的状态之间的间距，单位像素。
 * @default 0
 *
 * @param 最大显示状态数量
 * @parent 状态显示模式
 * @type number
 * @min 1
 * @desc 直线并排能显示的状态的最大数量。超过数量的状态图标不会被显示。
 * @default 4
 *
 */
/*~struct~GFBBind:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的boss设置--
 * 
 * @param ---绑定---
 * @desc 
 * 
 * @param 绑定的敌人
 * @parent ---绑定---
 * @desc 设置指定的敌人为BOSS。
 * @type enemy
 * @default 0
 *
 * @param 绑定的样式
 * @parent ---绑定---
 * @desc 设置这个BOSS对应的框样式。
 * @type number
 * @min 1
 * @default 1
 * 
 * @param ---段上限---
 * @desc 
 *
 * @param 生命条的段上限
 * @parent ---段上限---
 * @desc 作用于生命条。根据该BOSS的当前生命值，分配到 单段生命条 中显示。
 * @type number
 * @min 1
 * @default 500
 *
 * @param 魔法条的段上限
 * @parent ---段上限---
 * @desc 作用于魔法条。根据该BOSS的当前魔法值，分配到 单段魔法条 中显示。
 * @type number
 * @min 1
 * @default 200
 *
 * @param 怒气条的段上限
 * @parent ---段上限---
 * @desc 作用于怒气条。根据该BOSS的最大怒气值，分配到 单段怒气条 中显示。
 * @type number
 * @min 1
 * @default 100
 * 
 * @param ---常规---
 * @desc 
 * 
 * @param 初始是否显示
 * @parent ---常规---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 平移-固定框 X
 * @parent ---常规---
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 平移-固定框 Y
 * @parent ---常规---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 * 
 * @param 整体移动动画
 * @parent ---常规---
 * @type struct<DrillWindowMoving>
 * @desc 整个boss框会从某个点跑回自己的原位置。移动模式介绍可见 弹道核心-两点式。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"100","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 * @param ---BOSS头像---
 * @desc 
 * 
 * @param 是否显示BOSS头像
 * @parent ---BOSS头像---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 资源-BOSS头像
 * @parent ---BOSS头像---
 * @desc boss的头像，可以一个boss对应一个头像。
 * @default (需配置)BOSS头像
 * @require 1
 * @dir img/Special__boss/
 * @type file
 * 
 * @param 平移-头像 X
 * @parent ---BOSS头像---
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 6
 *
 * @param 平移-头像 Y
 * @parent ---BOSS头像---
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 6
 * 
 *
 * @param ---界面层级---
 * @desc 
 *
 * @param 战斗层级
 * @parent ---界面层级---
 * @type select
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 变量框所在的地图层级。可以用插件指令修改。
 * @default 上层
 *
 * @param 战斗界面图片层级
 * @parent ---界面层级---
 * @type number
 * @min 0
 * @desc 战斗界面中，该框固定放在战斗上层，图片层级控制先后顺序。与多层战斗背景的图片层级共享。
 * @default 10
 * 
 *
 */
/*~struct~DrillWindowMoving:
 *
 * @param 移动类型
 * @type select
 * @option 不移动
 * @value 不移动
 * @option 匀速移动
 * @value 匀速移动
 * @option 增减速移动
 * @value 增减速移动
 * @option 弹性移动
 * @value 弹性移动
 * @desc 移动类型基于 弹道核心-两点式 移动。更多内容可以去看看 "1.系统 > 关于弹道.docx"。
 * @default 匀速移动
 *
 * @param 移动时长
 * @type number
 * @min 1
 * @desc 起点位置回到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 移动延迟
 * @type number
 * @min 0
 * @desc 开始移动前的等待时间，单位帧。（1秒60帧）
 * @default 0
 *
 * @param ---起点---
 * @default 
 *
 * @param 坐标类型
 * @parent ---起点---
 * @type select
 * @option 相对坐标
 * @value 相对坐标
 * @option 绝对坐标
 * @value 绝对坐标
 * @desc 起点的坐标类型。
 * @default 相对坐标
 *
 * @param 起点-相对坐标 X
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向右，正数向左，单位像素。
 * @default 100
 * 
 * @param 起点-相对坐标 Y
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向上，正数向下，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 X
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最左边，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 Y
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最上面，单位像素。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		GFB (Gauge_For_Boss)
//		临时全局变量	DrillUp.g_GFB_xxx
//		临时局部变量	this._drill_GFB_xxx
//		存储数据变量	$gameSystem._drill_GFB_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	战斗界面
//		★性能测试消耗	18.28ms 22.52ms
//		★最坏情况		暂无
//		★备注			之前一直以为战斗时偶尔会出现的卡顿是boss框引起的，后来才发现都是 动画 自身底层大量使用了滤镜造成的。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			固定框样式：
//				->外框
//					->背景
//					->前景
//				->参数条
//					->生命条
//					->魔法条
//					->怒气条
//					->加满动画
//				->参数数字
//					->生命数字
//					->魔法数字
//					->怒气数字
//					->生命段数
//					->魔法段数
//					->怒气段数
//				->震动效果
//				->姓名显示
//				->状态显示
//			BOSS设置：
//				->绑定
//					->敌人
//					->样式
//				->段上限
//				->位置/镜头修正
//				->整体移动动画
//					->弹道核心 控制
//				->BOSS头像
//					->敌人头像一对一
//				->图片层级
//					->战斗图片层级
//					->地图图片层级	x
//				->插件指令
//					->切换敌人头像
//					->修改boss框样式
//				->时机
//					->敌人出现
//					->敌人中途出现（框也会出现，需要手动插件指令控制）
//					->敌人变身
//					->战斗结算隐藏框
//					->BOSS死亡隐藏框	x
//					->车轮战			x
//		
//		
//		★配置参数结构体如下：
//			~struct~GFBStyle:				固定框样式
//			~struct~GFBBind:				BOSS设置
//			~struct~DrillWindowMoving:		整体移动动画（弹道核心-两点式）
//
//		★私有类如下：
//			* Drill_GFB_StyleSprite【固定框样式】
//	
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.  BOSS设置 和 贴图 一对一，容器内存放指针，【注意避免直接修改指针内容】
//					$gameSystem._drill_GFB_bindTank
//					$gameTemp._drill_GFB_spriteTank
//			  	敌方（敌人指针） 和 贴图 一对一，容器内存放指针。
//					$gameTemp._drill_GFB_spriteTank[0]._drill_enemy
//					$gameTemp._drill_GFB_spriteTank[0]
//			3.留意框显示/隐藏的【时机】，这里的时机相对比较复杂。
//			  框消失有两种情况，一种是手动数据控制消除 data_b['visible']，另一种是贴图消除 .drill_setForceDestroy( true )。
//			  【这里的时机都是控制贴图消除】。
//
//		★其它说明细节：
//			1.2020-7-20 （耗时三星期，与最初写这个插件的耗时相同）
//				参数条、参数数字都已经分离至各自的核心，这里只调用，不再管样式具体内容。
//				整个插件重写花费了大量的时间，由于之前核心没有很好的分离，现在翻新后，感觉像是给一个古老的机器换上了全新的引擎。
//			2.状态显示：
//				状态和数值原理一样，建立固定数量的sprite，排成一排，然后根据情况变图标。
//			3.与车轮战的交互：
//				如果车轮战陆续出现了很多boss，那么他们的生命浮动框不会被立即去除。（索引："去除旧的boss框"）
//				"战斗结算时是否隐藏框"如果为不隐藏，则玩家可能会看到积压了很多的boss框。
//			4.由于框在战斗界面，还受到镜头的影响，这里使用 弹道-两点式 + 镜头修正 来确定位移坐标。
//			
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeForBoss = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_GaugeForBoss');
	
	
	//==============================
	// * 变量获取 - BOSS固定框样式
	//				（~struct~GFBStyle）
	//==============================
	DrillUp.drill_GFB_initStyle = function( dataFrom ) {
		var data = {};
		// > 参数条
		data['hp_meter_enable'] = String( dataFrom["生命-是否显示参数条"] || "true") === "true";
		data['hp_meter_id'] = Number( dataFrom["生命-参数条样式"] || 0 );
		data['hp_meter_x'] = Number( dataFrom["生命-平移-参数条 X"] || 0 );
		data['hp_meter_y'] = Number( dataFrom["生命-平移-参数条 Y"] || 0 );
		data['hp_meter_filling_enable'] = String( dataFrom["生命-是否启用加满动画"] || "true") === "true";
		data['hp_meter_filling_mode'] = String( dataFrom["生命-加满方式"] || "匀速加满" );
		data['hp_meter_filling_time'] = Number( dataFrom["生命-加满持续时间"] || 60 );
		data['hp_meter_filling_delay'] = Number( dataFrom["生命-加满延迟"] || 10 );
		data['mp_meter_enable'] = String( dataFrom["魔法-是否显示参数条"] || "true") === "true";
		data['mp_meter_id'] = Number( dataFrom["魔法-参数条样式"] || 0 );
		data['mp_meter_x'] = Number( dataFrom["魔法-平移-参数条 X"] || 0 );
		data['mp_meter_y'] = Number( dataFrom["魔法-平移-参数条 Y"] || 0 );
		data['mp_meter_filling_enable'] = String( dataFrom["魔法-是否启用加满动画"] || "false") === "true";
		data['mp_meter_filling_mode'] = String( dataFrom["魔法-加满方式"] || "匀速加满" );
		data['mp_meter_filling_time'] = Number( dataFrom["魔法-加满持续时间"] || 60 );
		data['mp_meter_filling_delay'] = Number( dataFrom["魔法-加满延迟"] || 10 );
		data['tp_meter_enable'] = String( dataFrom["怒气-是否显示参数条"] || "true") === "true";
		data['tp_meter_id'] = Number( dataFrom["怒气-参数条样式"] || 0 );
		data['tp_meter_x'] = Number( dataFrom["怒气-平移-参数条 X"] || 0 );
		data['tp_meter_y'] = Number( dataFrom["怒气-平移-参数条 Y"] || 0 );
		data['tp_meter_filling_enable'] = String( dataFrom["怒气-是否启用加满动画"] || "false") === "true";
		data['tp_meter_filling_mode'] = String( dataFrom["怒气-加满方式"] || "匀速加满" );
		data['tp_meter_filling_time'] = Number( dataFrom["怒气-加满持续时间"] || 60 );
		data['tp_meter_filling_delay'] = Number( dataFrom["怒气-加满延迟"] || 10 );
		// > 参数数字
		data['hp_symbol_visible'] = String( dataFrom["生命-是否显示参数数字"] || "true") === "true";
		data['hp_symbol_id'] = Number( dataFrom["生命-参数数字样式"] || 0 );
		data['hp_symbol_x'] = Number( dataFrom["生命-平移-参数数字 X"] || 0 );
		data['hp_symbol_y'] = Number( dataFrom["生命-平移-参数数字 Y"] || 0 );
		data['hp_symbol_specified'] = String( dataFrom["生命-是否将最大值覆盖到额定值"] || "true") === "true";
		data['hpx_symbol_visible'] = String( dataFrom["生命段数-是否显示参数数字"] || "true") === "true";
		data['hpx_symbol_id'] = Number( dataFrom["生命段数-参数数字样式"] || 0 );
		data['hpx_symbol_x'] = Number( dataFrom["生命段数-平移-参数数字 X"] || 0 );
		data['hpx_symbol_y'] = Number( dataFrom["生命段数-平移-参数数字 Y"] || 0 );
		data['mp_symbol_visible'] = String( dataFrom["魔法-是否显示参数数字"] || "true") === "true";
		data['mp_symbol_id'] = Number( dataFrom["魔法-参数数字样式"] || 0 );
		data['mp_symbol_x'] = Number( dataFrom["魔法-平移-参数数字 X"] || 0 );
		data['mp_symbol_y'] = Number( dataFrom["魔法-平移-参数数字 Y"] || 0 );
		data['mp_symbol_specified'] = String( dataFrom["魔法-是否将最大值覆盖到额定值"] || "true") === "true";
		data['mpx_symbol_visible'] = String( dataFrom["魔法段数-是否显示参数数字"] || "false") === "true";
		data['mpx_symbol_id'] = Number( dataFrom["魔法段数-参数数字样式"] || 0 );
		data['mpx_symbol_x'] = Number( dataFrom["魔法段数-平移-参数数字 X"] || 0 );
		data['mpx_symbol_y'] = Number( dataFrom["魔法段数-平移-参数数字 Y"] || 0 );
		data['tp_symbol_visible'] = String( dataFrom["怒气-是否显示参数数字"] || "true") === "true";
		data['tp_symbol_id'] = Number( dataFrom["怒气-参数数字样式"] || 0 );
		data['tp_symbol_x'] = Number( dataFrom["怒气-平移-参数数字 X"] || 0 );
		data['tp_symbol_y'] = Number( dataFrom["怒气-平移-参数数字 Y"] || 0 );
		data['tp_symbol_specified'] = String( dataFrom["怒气-是否将最大值覆盖到额定值"] || "true") === "true";
		data['tpx_symbol_visible'] = String( dataFrom["怒气段数-是否显示参数数字"] || "false") === "true";
		data['tpx_symbol_id'] = Number( dataFrom["怒气段数-参数数字样式"] || 0 );
		data['tpx_symbol_x'] = Number( dataFrom["怒气段数-平移-参数数字 X"] || 0 );
		data['tpx_symbol_y'] = Number( dataFrom["怒气段数-平移-参数数字 Y"] || 0 );
		// > 外框
		data['background_src'] = String( dataFrom["资源-固定框背景"] || "" );
		data['background_x'] = Number( dataFrom["平移-固定框背景 X"] || 0 );
		data['background_y'] = Number( dataFrom["平移-固定框背景 Y"] || 0 );
		data['foreground_src'] = String( dataFrom["资源-固定框前景"] || "" );
		data['foreground_x'] = Number( dataFrom["平移-固定框前景 X"] || 0 );
		data['foreground_y'] = Number( dataFrom["平移-固定框前景 Y"] || 0 );
		// > 震动效果
		data['shake_enable'] = String( dataFrom["受伤是否震动框"] || "true") === "true";
		data['shake_mode'] = String( dataFrom["震动模式"] || "上下震动");
		data['shake_float'] = Number( dataFrom["震动偏移量"] || 4 );
		// > 姓名显示
		data['name_visible'] = String( dataFrom["是否显示姓名"] || "true") === "true";
		data['name_x'] = Number( dataFrom["平移-姓名 X"] || 0 );
		data['name_y'] = Number( dataFrom["平移-姓名 Y"] || 0 );
		data['name_fontsize'] = Number( dataFrom["姓名字体大小"] || 20 );
		// > 状态显示
		data['state_enable'] = String( dataFrom["是否显示状态"] || "true") === "true";
		data['state_x'] = Number( dataFrom["平移-状态 X"] || 0 );
		data['state_y'] = Number( dataFrom["平移-状态 Y"] || 0 );
		data['state_mode'] = String( dataFrom["状态显示模式"] || "单一闪烁");
		data['state_align'] = String( dataFrom["状态对齐方式"] || "左对齐");
		data['state_spacing'] = Number( dataFrom["状态间距"] || 0 );
		data['state_max'] = Number( dataFrom["最大显示状态数量"] || 4 );
		
		return data;
	}
	
	//==============================
	// * 变量获取 - BOSS设置
	//				（~struct~GFBBind）
	//==============================
	DrillUp.drill_GFB_initBind = function( dataFrom ) {
		var data = {};
		// > 绑定
		data['enemy_id'] = Number( dataFrom["绑定的敌人"] || 0 );
		data['style_id'] = Number( dataFrom["绑定的样式"] || 0 );
		// > 段上限
		data['hp_level_max'] = Number( dataFrom["生命条的段上限"] || 500 );
		data['mp_level_max'] = Number( dataFrom["魔法条的段上限"] || 200 );
		data['tp_level_max'] = Number( dataFrom["怒气条的段上限"] || 100 );
		// > 常规
		data['visible'] = String( dataFrom["初始是否显示"] || "true") === "true";
		data['frame_x'] = Number( dataFrom["平移-固定框 X"] || 0 );
		data['frame_y'] = Number( dataFrom["平移-固定框 Y"] || 0 );
		if( dataFrom["整体移动动画"] != undefined &&
			dataFrom["整体移动动画"] != "" ){
			var slideAnimFrom = JSON.parse( dataFrom["整体移动动画"] || {} );
			var slideAnim = {};
			slideAnim['slideMoveType'] = String(slideAnimFrom["移动类型"] || "匀速移动");
			slideAnim['slideTime'] = Number(slideAnimFrom["移动时长"] || 20);
			slideAnim['slideDelay'] = Number(slideAnimFrom["移动延迟"] || 0);
			slideAnim['slidePosType'] = String(slideAnimFrom["坐标类型"] || "相对坐标");
			slideAnim['slideX'] = Number(slideAnimFrom["起点-相对坐标 X"] || -100);
			slideAnim['slideY'] = Number(slideAnimFrom["起点-相对坐标 Y"] || 0);
			slideAnim['slideAbsoluteX'] = Number(slideAnimFrom["起点-绝对坐标 X"] || 0);
			slideAnim['slideAbsoluteY'] = Number(slideAnimFrom["起点-绝对坐标 Y"] || 0);
			data['slideAnim'] = slideAnim;
		}else{
			data['slideAnim'] = {};
		}
		// > BOSS头像
		data['head_visible'] = String( dataFrom["是否显示BOSS头像"] || "true") === "true";
		data['head_src'] = String( dataFrom["资源-BOSS头像"] || "" );
		data['head_x'] = Number( dataFrom["平移-头像 X"] || 0 );
		data['head_y'] = Number( dataFrom["平移-头像 Y"] || 0 );
		// > 图片层级
		data['stageMode'] = String( dataFrom["显示场合"] || "只战斗界面");		//未开放
		data['layerIndex_map'] = String( dataFrom["地图层级"] || "图片层" );
		data['layerIndex_battle'] = String( dataFrom["战斗层级"] || "上层" );
		data['zIndex_map'] = Number( dataFrom["地图界面图片层级"] || 10 );
		data['zIndex_battle'] = Number( dataFrom["战斗界面图片层级"] || 10 );
		
		return data;
	};
	
	/*----------------一般---------------*/
    DrillUp.g_GFB_hideInEnd = String(DrillUp.parameters["战斗结算时是否隐藏框"] || "true") === "true";
    DrillUp.g_GFB_hideInDead = String(DrillUp.parameters["BOSS死亡后是否隐藏框"] || "false") === "true";	//未开放
	if( DrillUp.parameters["资源-备用BOSS头像"] != undefined && 
		DrillUp.parameters["资源-备用BOSS头像"] != "" ){
		DrillUp.g_GFB_backupFaceList = JSON.parse( DrillUp.parameters["资源-备用BOSS头像"] || [] );
	}else{
		DrillUp.g_GFB_backupFaceList = [];
	}
			
	/*----------------固定框样式---------------*/
	DrillUp.g_GFB_styleList_length = 10;
	DrillUp.g_GFB_styleList = [];
	for (var i = 0; i < DrillUp.g_GFB_styleList_length; i++) {
		if( DrillUp.parameters["固定框样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["固定框样式-" + String(i+1) ]);
			DrillUp.g_GFB_styleList[i] = DrillUp.drill_GFB_initStyle( data );
			DrillUp.g_GFB_styleList[i]['inited'] = true;
		}else{
			DrillUp.g_GFB_styleList[i] = DrillUp.drill_GFB_initStyle( {} );
			DrillUp.g_GFB_styleList[i]['inited'] = false;
		}
	}
	
	/*----------------BOSS设置---------------*/
	DrillUp.g_GFB_bind_length = 60;
	DrillUp.g_GFB_bind = [];
	for (var i = 0; i < DrillUp.g_GFB_bind_length; i++) {
		if( DrillUp.parameters["BOSS设置-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["BOSS设置-" + String(i+1) ]);
			DrillUp.g_GFB_bind[i] = DrillUp.drill_GFB_initBind( data );
		}else{
			DrillUp.g_GFB_bind[i] = null;		//（强制设为空值，节约存储资源）
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfGaugeMeter &&
	Imported.Drill_CoreOfGaugeNumber ){
	
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialBoss = function(filename) {
    return this.loadBitmap('img/Special__boss/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_GFB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GFB_pluginCommand.call(this, command, args);
	
	if( command === ">高级BOSS框" ){
		
		/*-----------------绑定设置捕获------------------*/
		var bind_ids = [];
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "全部敌方" ){
				var enemy_list = $gameTroop.members();
				for(var j=0; j< enemy_list.length; j++){
					var enemy = enemy_list[j];
					var e_ids = $gameTemp.drill_GFB_getBindIdListByEnemyId( enemy._enemyId );
					bind_ids = bind_ids.concat(e_ids);
				}
			}else if( temp1.indexOf("敌方[") != -1 ){
				temp1 = temp1.replace("敌方[","");
				temp1 = temp1.replace("]","");
				var enemy = $gameTroop.members()[ Number(temp1) -1 ];
				bind_ids = $gameTemp.drill_GFB_getBindIdListByEnemyId( enemy._enemyId );
				
			}else if( temp1.indexOf("BOSS设置[") != -1 ){
				temp1 = temp1.replace("BOSS设置[","");
				temp1 = temp1.replace("]","");
				var id_list = temp1.split(",");
				for(var j = 0; j< id_list.length; j++ ){
					bind_ids.push( Number(id_list[j])-1 );
				}
			}
		}
		
		/*-----------------战斗前指令------------------*/
		if( args.length == 6 ){
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			for(var j = 0; j < bind_ids.length; j++ ){
				var id = bind_ids[j];
				var dataBind = $gameSystem._drill_GFB_bindTank[ id ];
				if( dataBind == undefined ){
					alert(
						"【Drill_GaugeForBoss.js  UI - 高级BOSS生命固定框】\n"+
						"错误，未找到BOSS设置["+id+"]的配置数据。"
					);
					continue;
				}
				
				if( temp2 == "固定框" ){
					if( temp3 == "显示" ){
						dataBind['visible'] = true;
						$gameTemp._drill_GFB_needRefresh = true;
					}
					if( temp3 == "隐藏" ){
						dataBind['visible'] = false;
						$gameTemp._drill_GFB_needRefresh = true;
					}
					if( temp3.indexOf("修改样式[") != -1 ){	//不能立即生效
						temp3 = temp3.replace("修改样式[","");
						temp3 = temp3.replace("]","");
						dataBind['style_id'] = Number(temp3);
						// > 切换参数时，实例参数需要全部去掉
						dataBind['name_visible'] = null;
						dataBind['hp_symbol_visible'] = null;
						dataBind['mp_symbol_visible'] = null;
						dataBind['tp_symbol_visible'] = null;
						dataBind['hpx_symbol_visible'] = null;
						dataBind['mpx_symbol_visible'] = null;
						dataBind['tpx_symbol_visible'] = null;
						$gameTemp._drill_GFB_needRefresh = true;
					}
					else if( temp3.indexOf("修改当前层级[") != -1 ){
						temp3 = temp3.replace("修改当前层级[","");
						temp3 = temp3.replace("]","");
						for(var k = 0; k < bind_ids.length; k++ ){
							var id = bind_ids[k];
							dataBind['layerIndex_map'] = temp3;
							dataBind['layerIndex_battle'] = temp3;
						}
						$gameTemp._drill_GFB_needRefresh = true;
					}
				}
				if( temp2 == "名称" ){
					if( temp3 == "显示" ){
						dataBind['name_visible'] = true;
						dataBind['commandParamChanged'] = true;
					}
					if( temp3 == "隐藏" ){
						dataBind['name_visible'] = false;
						dataBind['commandParamChanged'] = true;
					}
				}
				if( temp2 == "头像" ){
					if( temp3 == "显示" ){
						dataBind['head_visible'] = true;
						dataBind['commandParamChanged'] = true;
					}
					if( temp3 == "隐藏" ){
						dataBind['head_visible'] = false;
						dataBind['commandParamChanged'] = true;
					}
					if( temp3 == "还原头像" ){
						dataBind['head_bitmap_id'] = 0;
						dataBind['commandParamChanged'] = true;
					}
					if( temp3.indexOf("切换备用头像[") != -1 ){
						temp3 = temp3.replace("切换备用头像[","");
						temp3 = temp3.replace("]","");
						dataBind['head_bitmap_id'] = Number(temp3);
						dataBind['commandParamChanged'] = true;
					}
				}
				if( temp2 == "生命条" ){
					if( temp3.indexOf("修改段上限[") != -1 ){
						temp3 = temp3.replace("修改段上限[","");
						temp3 = temp3.replace("]","");
						dataBind['hp_level_max'] = Number(temp3);
						dataBind['commandParamChanged'] = true;
					}
				}
				if( temp2 == "魔法条" ){
					if( temp3.indexOf("修改段上限[") != -1 ){
						temp3 = temp3.replace("修改段上限[","");
						temp3 = temp3.replace("]","");
						dataBind['mp_level_max'] = Number(temp3);
						dataBind['commandParamChanged'] = true;
					}
				}
				if( temp2 == "怒气条" ){
					if( temp3.indexOf("修改段上限[") != -1 ){
						temp3 = temp3.replace("修改段上限[","");
						temp3 = temp3.replace("]","");
						dataBind['tp_level_max'] = Number(temp3);
						dataBind['commandParamChanged'] = true;
					}
				}
				if( temp2 == "生命数字" ){
					if( temp3 == "显示" ){
						dataBind['hp_symbol_visible'] = true;
						dataBind['commandParamChanged'] = true;
					}
					if( temp3 == "隐藏" ){
						dataBind['hp_symbol_visible'] = false;
						dataBind['commandParamChanged'] = true;
					}
				}
				if( temp2 == "魔法数字" ){
					if( temp3 == "显示" ){
						dataBind['mp_symbol_visible'] = true;
						dataBind['commandParamChanged'] = true;
					}
					if( temp3 == "隐藏" ){
						dataBind['mp_symbol_visible'] = false;
						dataBind['commandParamChanged'] = true;
					}
				}
				if( temp2 == "怒气数字" ){
					if( temp3 == "显示" ){
						dataBind['tp_symbol_visible'] = true;
						dataBind['commandParamChanged'] = true;
					}
					if( temp3 == "隐藏" ){
						dataBind['tp_symbol_visible'] = false;
						dataBind['commandParamChanged'] = true;
					}
				}
				if( temp2 == "生命段数" ){
					if( temp3 == "显示" ){
						dataBind['hpx_symbol_visible'] = true;
						dataBind['commandParamChanged'] = true;
					}
					if( temp3 == "隐藏" ){
						dataBind['hpx_symbol_visible'] = false;
						dataBind['commandParamChanged'] = true;
					}
				}
				if( temp2 == "魔法段数" ){
					if( temp3 == "显示" ){
						dataBind['mpx_symbol_visible'] = true;
						dataBind['commandParamChanged'] = true;
					}
					if( temp3 == "隐藏" ){
						dataBind['mpx_symbol_visible'] = false;
						dataBind['commandParamChanged'] = true;
					}
				}
				if( temp2 == "怒气段数" ){
					if( temp3 == "显示" ){
						dataBind['tpx_symbol_visible'] = true;
						dataBind['commandParamChanged'] = true;
					}
					if( temp3 == "隐藏" ){
						dataBind['tpx_symbol_visible'] = false;
						dataBind['commandParamChanged'] = true;
					}
				}
			}
		}
	}
};

//=============================================================================
// * 临时数据
//=============================================================================
//==============================
// * 临时数据 - 初始化
//==============================
var _drill_GFB_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_GFB_temp_initialize.call(this);
	this._drill_GFB_needRefresh = true;			// 容器刷新
	this._drill_GFB_spriteTank = [];			// 战斗/地图 贴图容器（记得随时清空）
	this._drill_GFB_needVictoryClear = false;	// 胜利触发的强制消失
}
//==============================
// * 通用容器 - 根据 敌人id 获取到 BOSS设置id组
//==============================
Game_Temp.prototype.drill_GFB_getBindIdListByEnemyId = function( enemyId ){
	var id_list = [];
	for(var i = 0; i< this._drill_GFB_spriteTank.length; i++ ){
		var temp_sprite = this._drill_GFB_spriteTank[i];
		if( temp_sprite == null ){ continue; }
		if( temp_sprite._drill_enemy._enemyId == enemyId ){
			id_list.push(i);
		}
	}
	return id_list;
}
//==============================
// * 通用容器 - 强制去除框（只对贴图，不影响数据。填入id组）
//==============================
Game_Temp.prototype.drill_GFB_forceDestroyByBindIdList = function( bindId_list ){
	for(var j=0; j< bindId_list.length; j++){
		var temp_sprite = this._drill_GFB_spriteTank[ bindId_list[j] ];
		if( temp_sprite == null ){ continue; }
		temp_sprite.drill_setForceDestroy( true );
	}
}


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_GFB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_GFB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_GFB_sys_initialize.call(this);
	this.drill_GFB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_GFB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_GFB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_GFB_saveEnabled == true ){	
		$gameSystem.drill_GFB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_GFB_initSysData();
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
Game_System.prototype.drill_GFB_initSysData = function() {
	this.drill_GFB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_GFB_checkSysData = function() {
	this.drill_GFB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_GFB_initSysData_Private = function() {
	
	this._drill_GFB_bindTank = [];				// 绑定数据容器
	for(var i = 0; i < DrillUp.g_GFB_bind.length; i++ ){
		var temp_data = JSON.parse(JSON.stringify( DrillUp.g_GFB_bind[i] ));
		if( temp_data == undefined ){ continue; }
		this._drill_GFB_bindTank.push( temp_data );
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_GFB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_GFB_bindTank == undefined ){
		this.drill_GFB_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_GFB_bind.length; i++ ){
		var temp_data = DrillUp.g_GFB_bind[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_GFB_bindTank[i] == undefined ){
				this._drill_GFB_bindTank[i] = JSON.parse(JSON.stringify( temp_data ));
			
			// > 已存储的，跳过
			}else{
				//（不操作）
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
//##############################
Scene_Battle.prototype.drill_GFB_layerAddSprite = function( sprite, layer_index ){
	this.drill_GFB_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_GFB_layerRemoveSprite = function( sprite ){
	this.drill_GFB_layerRemoveSprite_Private( sprite );
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_GFB_sortByZIndex = function () {
    this.drill_GFB_sortByZIndex_Private();
}
//##############################
// * 战斗层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置，当前为 镜头参照）
//					> y 数字              （y位置，当前为 镜头参照）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Battle.prototype.drill_GFB_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_GFB_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_GFB_battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_GFB_battle_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_GFB_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_GFB_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_GFB_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_GFB_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_GFB_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_GFB_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_GFB_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_GFB_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_battleDownArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_battleUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}
//==============================
// * 战斗层级 - 删除贴图（私有）
//==============================
Scene_Battle.prototype.drill_GFB_layerRemoveSprite_Private = function( sprite ) {
	this._spriteset._drill_battleDownArea.removeChild( sprite );
	this._spriteset._drill_battleUpArea.removeChild( sprite );
	this._spriteset._drill_battlePicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 战斗层级 - 层级与镜头的位移（私有）
//==============================
Scene_Battle.prototype.drill_GFB_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 镜头参照 -> 战斗参照
	if( layer == "下层" || layer == "上层" ){
		xx -= this._spriteset._baseSprite.x;
		yy -= this._spriteset._baseSprite.y;
		
		// > 战斗镜头偏移（在图层内）
		if( Imported.Drill_BattleCamera ){
			var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
			xx -= camera_pos.x;
			yy -= camera_pos.y;
		}else{
			xx -= this._spriteset._battleField.x;
			yy -= this._spriteset._battleField.y;
		}
		return {'x':xx, 'y':yy };
	}
	
	// > 镜头参照 -> 镜头参照
	if( layer == "图片层" || layer == "最顶层" ){
		
		// > 战斗镜头位移（在图层外）
		//				 （其实 图片层、最顶层 执行不到这里，因为可以直接粘在镜头上，走镜头参照的分支了）
		//var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
		//xx -= camera_pos.x;
		//yy -= camera_pos.y;
		//var camera_pos2 = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_OuterSprite( xx, yy );
		//xx = camera_pos2.x;
		//yy = camera_pos2.y;
		
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}
//=============================================================================
// ** 战斗界面 固定框贴图容器
//=============================================================================
//==============================
// * 战斗界面 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_GFB_battle_createAllWindows2 = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_GFB_battle_createAllWindows2.call(this);
	$gameTemp._drill_GFB_spriteTank = [];
	$gameTemp._drill_GFB_needRefresh = true;
}
//==============================
// * 战斗容器 - 帧刷新
//==============================
var _drill_GFB_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _drill_GFB_battle_update.call(this);
	this.drill_GFB_updateRefreshGauge();		//帧刷新 - 重建监听
	this.drill_GFB_updateGaugePosition();		//帧刷新 - 位置
};
//==============================
// * 战斗容器 - 帧刷新重刷
//==============================
Scene_Battle.prototype.drill_GFB_updateRefreshGauge = function() {
	if( $gameTemp._drill_GFB_needRefresh != true ){ return; }
	$gameTemp._drill_GFB_needRefresh = false;
	
	// > 清除不显示的
	for(var i=0; i < $gameSystem._drill_GFB_bindTank.length; i++){
		var temp_bind = $gameSystem._drill_GFB_bindTank[i];
		var temp_sprite = $gameTemp._drill_GFB_spriteTank[i];		//一个贴图对应一个绑定
		if( temp_bind == null ){ continue; }
		if( temp_sprite == null ){ continue; }
		
		// > 关闭显示的 消除
		if( temp_bind['visible'] == false && temp_sprite._drill_foldTime <= 0 ){
			temp_sprite.drill_destroy();	//（执行内部销毁）
			this.drill_GFB_layerRemoveSprite( temp_sprite );
			$gameTemp._drill_GFB_spriteTank[i] = null;
		}
		// > 强制销毁的 消除
		if( temp_sprite.drill_isNeedForceDestroy() == true && temp_sprite._drill_foldTime <= 0 ){
			temp_sprite.drill_destroy();	//（执行内部销毁）
			this.drill_GFB_layerRemoveSprite( temp_sprite );
			$gameTemp._drill_GFB_spriteTank[i] = null;
		}
	}
	
	// > 重建需要显示的
	for(var i = 0; i< $gameSystem._drill_GFB_bindTank.length; i++ ){
		var temp_bind = $gameSystem._drill_GFB_bindTank[i];
		var temp_sprite = $gameTemp._drill_GFB_spriteTank[i];		//一个贴图对应一个绑定
		if( temp_bind == null ){ continue; }
		if( temp_sprite != null ){ continue; }
		
		if( temp_bind['visible'] == true && 
			( temp_bind['stageMode'] == "都有" || temp_bind['stageMode'] == "只战斗界面" ) ){
			
			// > 找到敌人对象
			var bind_enemy = null;
			var enemy_list = $gameTroop.members();
			for(var j=0; j< enemy_list.length; j++){
				var enemy = enemy_list[j];
				if( temp_bind['enemy_id'] == enemy._enemyId ){
					bind_enemy = enemy;
					//alert( enemy._enemyId );
					break;
				}
			}
			
			// > 建立数据绑定
			if( bind_enemy != null ){
				temp_bind['parentName'] = "Scene_Battle";
				var temp_sprite = new Drill_GFB_StyleSprite( temp_bind,bind_enemy );
				$gameTemp._drill_GFB_spriteTank[i] = temp_sprite;
			}
		}
	}
	
	// > 强制设置层级（层级不一样会改变层级）
	for(var i = 0; i< $gameSystem._drill_GFB_bindTank.length; i++ ){
		var temp_bind = $gameSystem._drill_GFB_bindTank[i];
		var temp_sprite = $gameTemp._drill_GFB_spriteTank[i];
		if( temp_bind == null ){ continue; }
		if( temp_sprite == null ){ continue; }
		this.drill_GFB_layerAddSprite( temp_sprite, temp_bind['layerIndex_battle'] );
	}
	
	this.drill_GFB_sortByZIndex();		//层级排序
};
//==============================
// * 帧刷新 - 位置
//==============================
Scene_Battle.prototype.drill_GFB_updateGaugePosition = function() {
	for(var i=0; i < $gameTemp._drill_GFB_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_GFB_spriteTank[i];		//一个贴图对应一个绑定
		if( temp_sprite == null ){ continue; }
		
		var data_b = temp_sprite._drill_data_bind;
		var data_s = temp_sprite._drill_data_style;
		
		// > 位移（镜头参照）
		var xx = 0;
		var yy = 0;
		xx += data_b['frame_x'];
		yy += data_b['frame_y'];
		
		// > 弹道位移
		var time = temp_sprite._drill_foldTime;
		var time_max = temp_sprite._drill_foldMax;
		xx += temp_sprite['_drill_COBa_x'][ time_max ] - temp_sprite['_drill_COBa_x'][ time ];
		yy += temp_sprite['_drill_COBa_y'][ time_max ] - temp_sprite['_drill_COBa_y'][ time ];
		
		
		// > 层级与镜头的位移（战斗参照）
		var pos = this.drill_GFB_layerCameraMoving(xx, yy, data_b['layerIndex_battle'], {});
		xx = pos['x'];
		yy = pos['y'];
		
		
		temp_sprite.x = xx;
		temp_sprite.y = yy;
	}
};


//=============================================================================
// * 战斗时机
//=============================================================================
//==============================
// * 时机 - 敌人出现
//==============================
var _drill_GFB_enemyAppear = Game_BattlerBase.prototype.appear;
Game_BattlerBase.prototype.appear = function() {
    _drill_GFB_enemyAppear.call(this);
	$gameTemp._drill_GFB_needRefresh = true;
};
//==============================
// * 时机 - 敌人变身
//==============================
var _drill_GFB_enemyTransform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function( enemyId ){
	// > 强制去除框
	var ids = $gameTemp.drill_GFB_getBindIdListByEnemyId( this._enemyId );
	$gameTemp.drill_GFB_forceDestroyByBindIdList( ids );
	$gameTemp._drill_GFB_needRefresh = true;
	// > 变身
	_drill_GFB_enemyTransform.call( this,enemyId );		
};
//==============================
// * 时机 - 帧刷新
//==============================
var _drill_GFB_timeBattle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _drill_GFB_timeBattle_update.call(this);
	this.drill_GFB_updateVictory();			//战斗结算隐藏框
	this.drill_GFB_updateBossDeath();		//BOSS死亡隐藏框
};
//==============================
// * 时机 - 战斗结算隐藏框（帧刷新判定）
//==============================
var _drill_GFB_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
	_drill_GFB_processVictory.call(this);
	$gameTemp._drill_GFB_needVictoryClear = true;		//胜利触发的强制消失
}
Spriteset_Battle.prototype.drill_GFB_updateVictory = function() {
	if( $gameTemp._drill_GFB_needVictoryClear && DrillUp.g_GFB_hideInEnd ){
		$gameTemp._drill_GFB_needVictoryClear = false;
		var ids = [];
		for( var i=0; i < $gameTemp._drill_GFB_spriteTank.length; i++ ){ ids.push( i ); }
		$gameTemp.drill_GFB_forceDestroyByBindIdList( ids );		//强制去除框
	}
}
//==============================
// * 时机 - BOSS死亡隐藏框（帧刷新判定）
//==============================
Spriteset_Battle.prototype.drill_GFB_updateBossDeath = function() {
	//...（如果死亡后立即隐藏，还需要考虑boss复活后回归问题……）
}
//==============================
// * 时机 - 兼容车轮战（存在问题）
//==============================
if( Imported.MOG_ConsecutiveBattles ){
	var _drill_GFB_prepareConBat = BattleManager.prepareConBat;
	BattleManager.prepareConBat = function() {
		_drill_GFB_prepareConBat.call(this);
		$gameTemp._drill_GFB_needRefresh = true;
	}
}




//=============================================================================
// * 固定框样式【Drill_GFB_StyleSprite】
//			
//			代码：	> 范围 - 该类对于BOSS设置的固定框进行多层可视化。
//					> 结构 - [合并/分离/ ●混乱 ] 数据和贴图混乱交错。贴图自身带数据，插件指令单独管另一套数据。
//												 这里的结构为：插件指令修改数据，放入缓存，然后贴图根据缓存数据，自变化（drill_updateCommandParam）。
//					> 数量 - [单个/ ●多个 ] 
//					> 创建 - [ ●一次性/ 自延迟/外部延迟] 
//					> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 注意，这里销毁方式【有些问题】，待改善。
//					> 样式 - [不可修改/ ●自变化 /外部变化] 
//=============================================================================
//==============================
// * 固定框 - 定义
//==============================
function Drill_GFB_StyleSprite() {
    this.initialize.apply(this, arguments);
};
Drill_GFB_StyleSprite.prototype = Object.create(Sprite.prototype);
Drill_GFB_StyleSprite.prototype.constructor = Drill_GFB_StyleSprite;
//==============================
// * 固定框 - 初始化
//==============================
Drill_GFB_StyleSprite.prototype.initialize = function( bossBind,enemy ) {
	Sprite.prototype.initialize.call(this);
	this._drill_enemy = enemy;													//敌人对象
	this._drill_data_bind = bossBind;											//绑定数据
	this._drill_data_style = DrillUp.g_GFB_styleList[ bossBind['style_id']-1 ];	//样式数据
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
}
//==============================
// * 固定框 - 帧刷新
//==============================
Drill_GFB_StyleSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updateSprite();			//帧刷新对象
}
//==============================
// * 初始化 - 数据
//==============================
Drill_GFB_StyleSprite.prototype.drill_initData = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	// > 私有对象初始化
	this._drill_time = 0;						//时间
	this._drill_foldTime = 0;					//消失/显现时间
	this._drill_forceDestroy = false;			//强制销毁标记
	this._drill_background_sprite = null;		//背景贴图
	this._drill_foreground_sprite = null;		//前景贴图
	
	this._drill_hp_meterSprite = null;			//生命参数条
	this._drill_mp_meterSprite = null;			//魔法参数条
	this._drill_tp_meterSprite = null;			//怒气参数条
	
	this._drill_hp_numberSprite = null;			//生命参数数字
	this._drill_mp_numberSprite = null;			//魔法参数数字
	this._drill_tp_numberSprite = null;			//怒气参数数字
	this._drill_hp_levelNumberSprite = null;	//生命段数
	this._drill_mp_levelNumberSprite = null;	//魔法段数
	this._drill_tp_levelNumberSprite = null;	//怒气段数
	
	this._drill_head_sprite = null;											//头像贴图
	this._drill_name_sprite = null;											//姓名贴图
	this._drill_state_sprite = null;										//状态贴图
	this._drill_states_systemIcon = ImageManager.loadSystem("IconSet");		//状态资源
	
	this._drill_shake_cur_life = 0;				//震动效果 - 持续时间
	this._drill_shake_trigger = 0;				//震动效果 - 触发
	this._drill_shake_dir = 1;					//震动效果 - 方向
	this._drill_shake_diff = 0;					//震动效果 - 实际偏移
	
	// > 样式参数 转移到 实例参数
	data_b['commandParamChanged'] = false;		//插件指令扫描指针
	data_b['head_bitmap_id'] = 0;				//与备份头像切换用
	if( data_b['name_visible'] == undefined ){ data_b['name_visible'] = data_s['name_visible']; }	
	if( data_b['hp_symbol_visible'] == undefined ){ data_b['hp_symbol_visible'] = data_s['hp_symbol_visible']; }	
	if( data_b['mp_symbol_visible'] == undefined ){ data_b['mp_symbol_visible'] = data_s['mp_symbol_visible']; }	
	if( data_b['tp_symbol_visible'] == undefined ){ data_b['tp_symbol_visible'] = data_s['tp_symbol_visible']; }	
	if( data_b['hpx_symbol_visible'] == undefined ){ data_b['hpx_symbol_visible'] = data_s['hpx_symbol_visible']; }	
	if( data_b['mpx_symbol_visible'] == undefined ){ data_b['mpx_symbol_visible'] = data_s['mpx_symbol_visible']; }	
	if( data_b['tpx_symbol_visible'] == undefined ){ data_b['tpx_symbol_visible'] = data_s['tpx_symbol_visible']; }	
	
	// > 主体属性
	this.x = data_b['frame_x']
	this.y = data_b['frame_y']
	this.opacity = 0;
	this.visible = true;		//创建了，就一定显示（ data_b['visible']控制的是出现/消失过程 ）
	if( data_b['parentName'] == "Scene_Map" ){ this.zIndex = data_b['zIndex_map']; }
	if( data_b['parentName'] == "Scene_Battle" ){ this.zIndex = data_b['zIndex_battle']; }
	this.width = Graphics.boxWidth;
	this.height = Graphics.boxHeight;
}
//==============================
// * 初始化 - 对象
//==============================
Drill_GFB_StyleSprite.prototype.drill_initSprite = function() {

	this.drill_initPreMove();				//预推演初始移动动画
	
	this.drill_createBackground();			//创建背景
	this.drill_createHPMeter();				//创建生命参数条
	this.drill_createMPMeter();				//创建魔法参数条
	this.drill_createTPMeter();				//创建怒气参数条
	this.drill_createHeadImage();			//创建头像
	this.drill_createForeground();			//创建前景
	
	this.drill_createState();				//创建状态
	this.drill_createName();				//创建姓名
	this.drill_createHPNumber();			//创建生命参数数字
	this.drill_createMPNumber();			//创建魔法参数数字
	this.drill_createTPNumber();			//创建怒气参数数字
	this.drill_createHPLevelNumber();		//创建生命段数
	this.drill_createMPLevelNumber();		//创建魔法段数
	this.drill_createTPLevelNumber();		//创建怒气段数
};
//==============================
// * 预推演初始移动动画
//==============================
Drill_GFB_StyleSprite.prototype.drill_initPreMove = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	// > 移动动画参数 转 两点式弹道
	var data = {};
	data['movementMode'] = "两点式";
	data['movementTime'] = data_b['slideAnim']['slideTime'];
	data['movementDelay']= data_b['slideAnim']['slideDelay'];
	data['twoPointType'] = data_b['slideAnim']['slideMoveType'];
	if( data_b['slideAnim']['slidePosType'] == "相对坐标" ){
		data['twoPointDifferenceX'] = data_b['slideAnim']['slideX'];
		data['twoPointDifferenceY'] = data_b['slideAnim']['slideY'];
	}else{
		data['twoPointDifferenceX'] = data_b['slideAnim']['slideAbsoluteX'] - data_b['frame_x'];
		data['twoPointDifferenceY'] = data_b['slideAnim']['slideAbsoluteY'] - data_b['frame_y'];
	}
	//alert(JSON.stringify(data_b['slideAnim']));
	
	$gameTemp.drill_COBa_setBallisticsMove( data );													//初始化
	$gameTemp.drill_COBa_preBallisticsMove( this, 0 , data_b['frame_x'], data_b['frame_y'] );		//推演赋值
}
//==============================
// * 创建 - 背景
//==============================
Drill_GFB_StyleSprite.prototype.drill_createBackground = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialBoss( data_s['background_src'] );
	temp_sprite.x = data_s['background_x'];
	temp_sprite.y = data_s['background_y'];
	this.addChild(temp_sprite);
	this._drill_background_sprite = temp_sprite;
}
//==============================
// * 创建 - 前景
//==============================
Drill_GFB_StyleSprite.prototype.drill_createForeground = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialBoss( data_s['foreground_src']  );
	temp_sprite.x = data_s['foreground_x'];
	temp_sprite.y = data_s['foreground_y'];
	this.addChild(temp_sprite);
	this._drill_foreground_sprite = temp_sprite;
}
//==============================
// * 创建 - 生命条
//==============================
Drill_GFB_StyleSprite.prototype.drill_createHPMeter = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['hp_meter_enable'] != true ){ return }	//（不显示，则不创建）
	if( data_s['hp_meter_id'] == 0 ){ return }
	
	// > 生命条 数据初始化
	var temp_data = DrillUp.drill_COGM_getCopyedData( data_s['hp_meter_id']-1 );	//深拷贝数据
	temp_data['level_max'] = data_b['hp_level_max'];						//段上限
	temp_data['x'] = data_s['hp_meter_x'];									//x
	temp_data['y'] = data_s['hp_meter_y'];									//y
	temp_data['anchor_x'] = 0.0;											//中心锚点x
	temp_data['anchor_y'] = 0.0;											//中心锚点y
	temp_data['filling_enable'] = data_s['hp_meter_filling_enable'];		//加满动画
	temp_data['filling_mode'] = data_s['hp_meter_filling_mode'];			//
	temp_data['filling_time'] = data_s['hp_meter_filling_time'];			//
	temp_data['filling_delay'] = data_s['hp_meter_filling_delay'];			//
	
	// > 生命条 贴图初始化
	var temp_sprite = new Drill_COGM_MeterSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_hp_meterSprite = temp_sprite;
}
//==============================
// * 创建 - 魔法条
//==============================
Drill_GFB_StyleSprite.prototype.drill_createMPMeter = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['mp_meter_enable'] != true ){ return }	//（不显示，则不创建）
	if( data_s['mp_meter_id'] == 0 ){ return }
	
	// > 魔法条 数据初始化
	var temp_data = DrillUp.drill_COGM_getCopyedData( data_s['mp_meter_id']-1 );	//深拷贝数据
	temp_data['level_max'] = data_b['mp_level_max'];						//段上限
	temp_data['x'] = data_s['mp_meter_x'];									//x
	temp_data['y'] = data_s['mp_meter_y'];									//y
	temp_data['anchor_x'] = 0.0;											//中心锚点x
	temp_data['anchor_y'] = 0.0;											//中心锚点y
	temp_data['filling_enable'] = data_s['mp_meter_filling_enable'];		//加满动画
	temp_data['filling_mode'] = data_s['mp_meter_filling_mode'];			//
	temp_data['filling_time'] = data_s['mp_meter_filling_time'];			//
	temp_data['filling_delay'] = data_s['mp_meter_filling_delay'];			//
	
	// > 魔法条 贴图初始化
	var temp_sprite = new Drill_COGM_MeterSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_mp_meterSprite = temp_sprite;
}
//==============================
// * 创建 - 怒气条
//==============================
Drill_GFB_StyleSprite.prototype.drill_createTPMeter = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['tp_meter_enable'] != true ){ return }	//（不显示，则不创建）
	if( data_s['tp_meter_id'] == 0 ){ return }
	
	// > 怒气条 数据初始化
	var temp_data = DrillUp.drill_COGM_getCopyedData( data_s['tp_meter_id']-1 );	//深拷贝数据
	temp_data['level_max'] = data_b['tp_level_max'];						//段上限
	temp_data['x'] = data_s['tp_meter_x'];									//x
	temp_data['y'] = data_s['tp_meter_y'];									//y
	temp_data['anchor_x'] = 0.0;											//中心锚点x
	temp_data['anchor_y'] = 0.0;											//中心锚点y
	temp_data['filling_enable'] = data_s['tp_meter_filling_enable'];		//加满动画
	temp_data['filling_mode'] = data_s['tp_meter_filling_mode'];			//
	temp_data['filling_time'] = data_s['tp_meter_filling_time'];			//
	temp_data['filling_delay'] = data_s['tp_meter_filling_delay'];			//
	
	// > 怒气条 贴图初始化
	var temp_sprite = new Drill_COGM_MeterSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_tp_meterSprite = temp_sprite;
}
//==============================
// * 创建 - 头像
//==============================
Drill_GFB_StyleSprite.prototype.drill_createHeadImage = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialBoss( data_b['head_src'] );
	temp_sprite.x = data_b['head_x'];
	temp_sprite.y = data_b['head_y'];
	temp_sprite.visible = data_b['head_visible'];		//（不显示，也要创建）
	this.addChild(temp_sprite);
	this._drill_head_sprite = temp_sprite;
}
//==============================
// * 创建 - 姓名
//==============================
Drill_GFB_StyleSprite.prototype.drill_createName = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	// > 姓名初始化
	var temp_sprite = new Sprite();
	temp_sprite.x = data_s['name_x'];
	temp_sprite.y = data_s['name_y'];
	temp_sprite.visible = data_b['name_visible'];		//（不显示，也要创建）
	
	// > 绘制字符
	temp_sprite.bitmap = new Bitmap(360, data_s['name_fontsize'] + 4 );
	temp_sprite.bitmap.fontSize = data_s['name_fontsize'];
	this.addChild(temp_sprite);
	this._drill_name_sprite = temp_sprite;
	this.drill_drawName();
}
//==============================
// * 姓名 - 绘制（继承接口）
//==============================
Drill_GFB_StyleSprite.prototype.drill_drawName = function() {
	this._drill_name_sprite.bitmap.drawText(
		this._drill_enemy.enemy().name, 
		0, 0, this._drill_name_sprite.bitmap.width, this._drill_name_sprite.bitmap.height, 0 );	
}
//==============================
// * 创建 - 状态
//==============================
Drill_GFB_StyleSprite.prototype.drill_createState = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['state_enable'] != true ){ return }		//（不显示，则不创建）
	
	if( data_s['state_mode'] == "直线并排" ){
		
		// > 并排的状态贴图
		this._drill_state_sprite = new Sprite();
		this._drill_state_sprite_tank = [];
		this._drill_state_sprite.anchor.x = 0.5;
		this._drill_state_sprite.anchor.y = 0.5;
		this._drill_state_sprite.x = data_s['state_x'];
		this._drill_state_sprite.y = data_s['state_y'];
		
		// > 状态图标集
		for(var i=0; i < data_s['state_max']; i++){	
			var temp_sprite = new Sprite();
			temp_sprite.bitmap = this._drill_states_systemIcon;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.setFrame(0,0,0,0);
			
			var iw = Window_Base._iconWidth;
			var ih = Window_Base._iconHeight;
			var space = data_s['state_spacing'];
			var align = data_s['state_align'];
			if( align == "右对齐" ){
				temp_sprite.x = -1 * i * (iw + space) ;
			}else if( align == "上对齐" ){
				temp_sprite.y = -1 * i * (ih + space) ;
			}else if( align == "下对齐" ){
				temp_sprite.y = 1 * i * (ih + space) ;
			}else{
				temp_sprite.x = 1 * i * (iw + space) ;
			}
			this._drill_state_sprite_tank.push(temp_sprite);
			this._drill_state_sprite.addChild(temp_sprite);
		}
		
	}else{
		// > 闪烁的状态贴图（直接用默认）
		this._drill_state_sprite = new Sprite_StateIcon();	
		this._drill_state_sprite.anchor.x = 0.5;
		this._drill_state_sprite.anchor.y = 0.5;
		this._drill_state_sprite.x = this._drill_data_style['state_x'];
		this._drill_state_sprite.y = this._drill_data_style['state_y'];
		this._drill_state_sprite.setup(this._drill_enemy);
	}
	
	this.addChild(this._drill_state_sprite);
}

//==============================
// * 创建 - 生命参数数字
//==============================
Drill_GFB_StyleSprite.prototype.drill_createHPNumber = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['hp_symbol_id'] == 0 ){ return }
	
	// > 生命数字 数据初始化
	var temp_data = DrillUp.drill_COGN_getCopyedData( data_s['hp_symbol_id']-1 );	//深拷贝数据
	temp_data['x'] = data_s['hp_symbol_x'];						//x
	temp_data['y'] = data_s['hp_symbol_y'];						//y
	temp_data['visible'] = data_b['hp_symbol_visible'];			//（不显示，也要创建）
	if( data_s['hp_symbol_specified'] == true ){				//额定数值
		temp_data['specified_conditionNum'] = this._drill_enemy.param(0);	
	}
	
	// > 生命数字 贴图初始化
	var temp_sprite = new Drill_COGN_NumberSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_hp_numberSprite = temp_sprite;
}
//==============================
// * 创建 - 魔法参数数字
//==============================
Drill_GFB_StyleSprite.prototype.drill_createMPNumber = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['mp_symbol_id'] == 0 ){ return }
	
	// > 魔法数字 数据初始化
	var temp_data = DrillUp.drill_COGN_getCopyedData( data_s['mp_symbol_id']-1 );	//深拷贝数据
	temp_data['x'] = data_s['mp_symbol_x'];						//x
	temp_data['y'] = data_s['mp_symbol_y'];						//y
	temp_data['visible'] = data_b['mp_symbol_visible'];			//（不显示，也要创建）
	if( data_s['mp_symbol_specified'] == true ){				//额定数值
		temp_data['specified_conditionNum'] = this._drill_enemy.param(1);
	}
	
	// > 魔法数字 贴图初始化
	var temp_sprite = new Drill_COGN_NumberSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_mp_numberSprite = temp_sprite;
}
//==============================
// * 创建 - 怒气参数数字
//==============================
Drill_GFB_StyleSprite.prototype.drill_createTPNumber = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['tp_symbol_id'] == 0 ){ return }
	
	// > 怒气数字 数据初始化
	var temp_data = DrillUp.drill_COGN_getCopyedData( data_s['tp_symbol_id']-1 );	//深拷贝数据
	temp_data['x'] = data_s['tp_symbol_x'];						//x
	temp_data['y'] = data_s['tp_symbol_y'];						//y
	temp_data['visible'] = data_b['tp_symbol_visible'];			//（不显示，也要创建）
	if( data_s['tp_symbol_specified'] == true ){				//额定数值
		temp_data['specified_conditionNum'] = this._drill_enemy.maxTp();
	}
	
	// > 怒气数字 贴图初始化
	var temp_sprite = new Drill_COGN_NumberSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_tp_numberSprite = temp_sprite;
}
//==============================
// * 创建 - 生命参数 段数
//==============================
Drill_GFB_StyleSprite.prototype.drill_createHPLevelNumber = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['hpx_symbol_id'] == 0 ){ return }
	
	// > 生命段数 数据初始化
	var temp_data = DrillUp.drill_COGN_getCopyedData( data_s['hpx_symbol_id']-1 );	//深拷贝数据
	temp_data['x'] = data_s['hpx_symbol_x'];					//x
	temp_data['y'] = data_s['hpx_symbol_y'];					//y
	temp_data['visible'] = data_b['hpx_symbol_visible'];		//（不显示，也要创建）
	
	// > 生命段数 贴图初始化
	var temp_sprite = new Drill_COGN_NumberSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_hp_levelNumberSprite = temp_sprite;
}
//==============================
// * 创建 - 魔法参数段数
//==============================
Drill_GFB_StyleSprite.prototype.drill_createMPLevelNumber = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['mpx_symbol_id'] == 0 ){ return }
	
	// > 魔法段数 数据初始化
	var temp_data = DrillUp.drill_COGN_getCopyedData( data_s['mpx_symbol_id']-1 );	//深拷贝数据
	temp_data['x'] = data_s['mpx_symbol_x'];					//x
	temp_data['y'] = data_s['mpx_symbol_y'];					//y
	temp_data['visible'] = data_b['mpx_symbol_visible'];		//（不显示，也要创建）
	
	// > 魔法段数 贴图初始化
	var temp_sprite = new Drill_COGN_NumberSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_mp_levelNumberSprite = temp_sprite;
}
//==============================
// * 创建 - 怒气参数段数
//==============================
Drill_GFB_StyleSprite.prototype.drill_createTPLevelNumber = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['tpx_symbol_id'] == 0 ){ return }
	
	// > 怒气段数 数据初始化
	var temp_data = DrillUp.drill_COGN_getCopyedData( data_s['tpx_symbol_id']-1 );	//深拷贝数据
	temp_data['x'] = data_s['tpx_symbol_x'];					//x
	temp_data['y'] = data_s['tpx_symbol_y'];					//y
	temp_data['visible'] = data_b['tpx_symbol_visible'];		//（不显示，也要创建）
	
	// > 怒气段数 贴图初始化
	var temp_sprite = new Drill_COGN_NumberSprite( temp_data );
	this.addChild( temp_sprite );
	this._drill_tp_levelNumberSprite = temp_sprite;
}
//==============================
// * 销毁 - 设置销毁标记（接口）
//==============================
Drill_GFB_StyleSprite.prototype.drill_setForceDestroy = function( enabled ){
	this._drill_forceDestroy = enabled;
}
//==============================
// * 销毁 - 是否要强制销毁（接口）
//==============================
Drill_GFB_StyleSprite.prototype.drill_isNeedForceDestroy = function(){
	return this._drill_forceDestroy;
}
//==============================
// * 销毁 - 执行销毁
//==============================
Drill_GFB_StyleSprite.prototype.drill_destroy = function() {
	
	// > 参数条销毁
	if( this._drill_hp_meterSprite != undefined ){
		this._drill_hp_meterSprite.drill_COGM_destroy();
		this.removeChild( this._drill_hp_meterSprite );
		this._drill_hp_meterSprite = null;
	}
	if( this._drill_mp_meterSprite != undefined ){
		this._drill_mp_meterSprite.drill_COGM_destroy();
		this.removeChild( this._drill_mp_meterSprite );
		this._drill_mp_meterSprite = null;
	}
	if( this._drill_tp_meterSprite != undefined ){
		this._drill_tp_meterSprite.drill_COGM_destroy();
		this.removeChild( this._drill_tp_meterSprite );
		this._drill_tp_meterSprite = null;
	}
	
	// > 参数数字销毁
	if( this._drill_hp_numberSprite != undefined ){
		this._drill_hp_numberSprite.drill_COGN_destroy();
		this.removeChild( this._drill_hp_numberSprite );
		this._drill_hp_numberSprite = null;
	}
	if( this._drill_mp_numberSprite != undefined ){
		this._drill_mp_numberSprite.drill_COGN_destroy();
		this.removeChild( this._drill_mp_numberSprite );
		this._drill_mp_numberSprite = null;
	}
	if( this._drill_tp_numberSprite != undefined ){
		this._drill_tp_numberSprite.drill_COGN_destroy();
		this.removeChild( this._drill_tp_numberSprite );
		this._drill_tp_numberSprite = null;
	}
	if( this._drill_hp_levelNumberSprite != undefined ){
		this._drill_hp_levelNumberSprite.drill_COGN_destroy();
		this.removeChild( this._drill_hp_levelNumberSprite );
		this._drill_hp_levelNumberSprite = null;
	}
	if( this._drill_mp_levelNumberSprite != undefined ){
		this._drill_mp_levelNumberSprite.drill_COGN_destroy();
		this.removeChild( this._drill_mp_levelNumberSprite );
		this._drill_mp_levelNumberSprite = null;
	}
	if( this._drill_tp_levelNumberSprite != undefined ){
		this._drill_tp_levelNumberSprite.drill_COGN_destroy();
		this.removeChild( this._drill_tp_levelNumberSprite );
		this._drill_tp_levelNumberSprite = null;
	}
	
	// > 头像贴图
	this.removeChild( this._drill_head_sprite );
	this._drill_head_sprite = null;	
	
	// > 姓名贴图
	this.removeChild( this._drill_name_sprite );
	this._drill_name_sprite = null;			
	
	// > 状态贴图
	this.removeChild( this._drill_state_sprite );
	this._drill_state_sprite = null;	
	
	// > 前景/背景销毁
	this.removeChild( this._drill_background_sprite );
	this.removeChild( this._drill_foreground_sprite );
	this._drill_background_sprite = null;
	this._drill_foreground_sprite = null;
}

//==============================
// * 帧刷新对象
//==============================
Drill_GFB_StyleSprite.prototype.drill_updateSprite = function() {
	this._drill_time += 1;
	
	this.drill_updateMeter();			//帧刷新 - 参数条
	this.drill_updateNumber();			//帧刷新 - 参数数字
	this.drill_updateOpacity();			//帧刷新 - 透明度
	this.drill_updateShake();			//帧刷新 - 震动效果
	this.drill_updateStates();			//帧刷新 - 状态绘制
	this.drill_updateCommandParam();	//帧刷新 - 插件指令修改参数
}
//==============================
// * 帧刷新 - 参数条
//==============================
Drill_GFB_StyleSprite.prototype.drill_updateMeter = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	// >参数条 - 值刷新
	if(this._drill_hp_meterSprite){ this._drill_hp_meterSprite.drill_COGM_reflashValue(this._drill_enemy._hp); }
	if(this._drill_mp_meterSprite){ this._drill_mp_meterSprite.drill_COGM_reflashValue(this._drill_enemy._mp); }
	if(this._drill_tp_meterSprite){ this._drill_tp_meterSprite.drill_COGM_reflashValue(this._drill_enemy._tp); }
}
//==============================
// * 帧刷新 - 参数数字
//==============================
Drill_GFB_StyleSprite.prototype.drill_updateNumber = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	// >参数数字 - 值刷新
	if(this._drill_hp_numberSprite){ this._drill_hp_numberSprite.drill_COGN_reflashValue(this._drill_enemy._hp); }
	if(this._drill_mp_numberSprite){ this._drill_mp_numberSprite.drill_COGN_reflashValue(this._drill_enemy._mp); }
	if(this._drill_tp_numberSprite){ this._drill_tp_numberSprite.drill_COGN_reflashValue(this._drill_enemy._tp); }
	if(this._drill_hp_levelNumberSprite){ this._drill_hp_levelNumberSprite.drill_COGN_reflashValue(Math.floor( this._drill_enemy._hp / data_b['hp_level_max'])); }
	if(this._drill_mp_levelNumberSprite){ this._drill_mp_levelNumberSprite.drill_COGN_reflashValue(Math.floor( this._drill_enemy._mp / data_b['mp_level_max'])); }
	if(this._drill_tp_levelNumberSprite){ this._drill_tp_levelNumberSprite.drill_COGN_reflashValue(Math.floor( this._drill_enemy._tp / data_b['tp_level_max'])); }
}
//==============================
// * 帧刷新 - 位移+透明度
//==============================
Drill_GFB_StyleSprite.prototype.drill_updateOpacity = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	// > 出现/消失控制
	this._drill_foldMax = this['_drill_COBa_x'].length - 1;
	if( data_b['visible'] == false ){				//隐藏 消失
		this._drill_foldTime -= 1;
	}else if( this.drill_isNeedForceDestroy() == true ){	//销毁 消失
		this._drill_foldTime -= 1;
	}else{
		this._drill_foldTime += 1;
	}
	if( this._drill_foldTime > this._drill_foldMax ){ this._drill_foldTime = this._drill_foldMax; }
	if( this._drill_foldTime < 0 ){ this._drill_foldTime = 0; }
	
	// > 出现/消失控制
	this.opacity = 255 * this._drill_foldTime / this._drill_foldMax;
}
//==============================
// * 帧刷新 - 震动效果
//==============================
Drill_GFB_StyleSprite.prototype.drill_updateShake = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['shake_enable'] != true ){ return }
	
	// > 触发条件
	if( this._drill_shake_cur_life <= this._drill_enemy._hp ){
		this._drill_shake_cur_life = this._drill_enemy._hp;
	}else{
		this._drill_shake_trigger = 25;
		this._drill_shake_cur_life = this._drill_enemy._hp;
	}
	
	var f = data_s['shake_float'];
	if( this._drill_shake_trigger > 0 ){
		// > 持续震动
		if( this._drill_shake_dir == 1 ){
			this._drill_shake_diff += f/2;
			if( this._drill_shake_diff > f ){
				this._drill_shake_dir = -1;
				this._drill_shake_diff = f;
			}
		}else{
			this._drill_shake_diff -= f/2;
			if( this._drill_shake_diff < -1 * f ){
				this._drill_shake_dir = 1;
				this._drill_shake_diff = -1 * f;
			}
		}
	}else{
		// > 结束震动
		if(this._drill_shake_diff > 0){
			this._drill_shake_diff -= f/2;
			if(this._drill_shake_diff < 0){
				this._drill_shake_diff = 0;
			}
		}
		if(this._drill_shake_diff < 0){
			this._drill_shake_diff += f/2;
			if(this._drill_shake_diff > 0){
				this._drill_shake_diff = 0;
			}
		}
	}
	if( data_s['shake_mode'] == "上下震动" ){
		this.y += this._drill_shake_diff;
	}else{
		this.x += this._drill_shake_diff;
	}
	
	this._drill_shake_trigger -= 1;
}
//==============================
// * 帧刷新 - 状态绘制
//==============================
Drill_GFB_StyleSprite.prototype.drill_updateStates = function(){
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_s['state_enable'] != true ){ return }
	if( !this._drill_states_systemIcon.isReady() ){ return }
	
	// > 直线并排
	if( data_s['state_mode'] == "直线并排" ){
		var icons = this._drill_enemy.allIcons();
		for(var i=0; i<this._drill_state_sprite_tank.length; i++){	
			var temp_sprite = this._drill_state_sprite_tank[i];
			var id = Number(icons[i]);
			if( id ){
				var iw = Window_Base._iconWidth;
				var ih = Window_Base._iconHeight;
				var ix = id % 16 * iw;
				var iy = Math.floor( id / 16) * ih;
				temp_sprite.setFrame(ix, iy, iw, ih);
			}else{
				temp_sprite.setFrame(0,0,0,0) ;
			}
		}
	}
	// > 单一闪烁
	//	（不需要帧刷新，对象自己会变）
}
//==============================
// * 帧刷新 - 插件指令修改参数
//==============================
Drill_GFB_StyleSprite.prototype.drill_updateCommandParam = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_b['commandParamChanged'] == false ){ return; }
	data_b['commandParamChanged'] = false;

	//（此函数在现有贴图中修改，插件指令直接在$gameSystem中修改不会立即生效，需要刷贴图与刷菜单才能生效）

	// > 生命数字
	if( this._drill_hp_numberSprite ){
		this._drill_hp_numberSprite.drill_COGN_setVisible( data_b['hp_symbol_visible'] );
	}
	// > 魔法数字
	if( this._drill_mp_numberSprite ){
		this._drill_mp_numberSprite.drill_COGN_setVisible( data_b['mp_symbol_visible'] );
	}
	// > 怒气数字
	if( this._drill_tp_numberSprite ){
		this._drill_tp_numberSprite.drill_COGN_setVisible( data_b['tp_symbol_visible'] );
	}
	// > 生命段数
	if( this._drill_hp_levelNumberSprite ){
		this._drill_hp_levelNumberSprite.drill_COGN_setVisible( data_b['hpx_symbol_visible'] );
	}
	// > 魔法段数
	if( this._drill_mp_levelNumberSprite ){
		this._drill_mp_levelNumberSprite.drill_COGN_setVisible( data_b['mpx_symbol_visible'] );
	}
	// > 怒气段数
	if( this._drill_tp_levelNumberSprite ){
		this._drill_tp_levelNumberSprite.drill_COGN_setVisible( data_b['tpx_symbol_visible'] );
	}
	
	// > 生命条
	if( this._drill_hp_meterSprite ){
		this._drill_hp_meterSprite.drill_COGM_setLevelMax( data_b['hp_level_max'] );
	}
	// > 魔法条
	if( this._drill_mp_meterSprite ){
		this._drill_mp_meterSprite.drill_COGM_setLevelMax( data_b['mp_level_max'] );
	}
	// > 怒气条
	if( this._drill_tp_meterSprite ){
		this._drill_tp_meterSprite.drill_COGM_setLevelMax( data_b['tp_level_max'] );
	}
	
	// > 名称文本（敌人变身时重刷名字）
	this.drill_drawName();
	// > 名称显示
	this._drill_name_sprite.visible = data_b['name_visible'];
	
	// > 头像显示
	this._drill_head_sprite.visible = data_b['head_visible'];
	if( data_b['head_bitmap_id'] == 0 ){
		this._drill_head_sprite.bitmap = ImageManager.load_SpecialBoss( data_b['head_src'] );
	}else{
		var face_src = DrillUp.g_GFB_backupFaceList[ data_b['head_bitmap_id']-1 ];
		if( face_src ){
			this._drill_head_sprite.bitmap = ImageManager.load_SpecialBoss( face_src );
		}
	}
	
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeForBoss = false;
		alert(
			"【Drill_GaugeForBoss.js  UI - 高级BOSS生命固定框】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics  系统-弹道核心"+
			"\n- Drill_CoreOfGaugeMeter  系统-参数条核心"+
			"\n- Drill_CoreOfGaugeNumber 系统-参数数字核心"
		);
}



