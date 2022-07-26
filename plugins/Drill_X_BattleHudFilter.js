//=============================================================================
// Drill_X_BattleHudFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        战斗UI - 角色窗口的滤镜效果[扩展]
 * @author Drill_up
 * 
 * @Drill_LE_param "滤镜条件-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_XBHF_condition_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_X_BattleHudFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以给战斗中的敌人的添加出场滤镜效果，或者通过插件指令调整滤镜。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 基于：
 *   - Drill_CoreOfFilter   系统-滤镜核心
 *     需要该核心才能启用滤镜效果。
 *   - MOG_BattleHud        战斗UI-角色窗口
 *     给 角色窗口 的框、头像添加滤镜效果。
 * 可作用于：
 *   - Drill_EnemyFilter    单位-滤镜效果★★v1.3版本及以上★★
 *     可以使得头像的滤镜效果与角色的滤镜效果同步。
 *     比如角色战斗图为噪点，则头像也噪点。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   只给角色窗口添加滤镜效果。
 * 2.想要了解更多滤镜效果，去看看 "1.系统 > 大家族-滤镜效果.docx"。
 * 滤镜：
 *   (1.纯色滤镜、着色滤镜……等 相互独立，且效果可以相互叠加。
 *      添加滤镜的先后顺序不同，能产生不同的叠加效果。
 *   (2.波动纯色滤镜 与 纯色滤镜 是同一个滤镜，只是变化方式不同。
 *      二者设置会相互覆盖。
 *   (3.如果配置的条件有相互交叉的地方，则按照配置在前面的条件滤镜来变化。
 *   (4.框的滤镜效果，满足条件后瞬间变化，没有过度的过程。
 *   (5.条件滤镜作用于角色窗口的前布局和后布局，数字、头像、生命条都不包括。
 *      整体黑白滤镜比较特殊，直接作用于角色窗口的所有部件。
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
 * 时间复杂度： o(n)*o(贴图处理)*o(滤镜) 每帧
 * 测试方法：   在战斗界面中以正常游戏流程进行测试。
 * 测试结果：   3个角色，平均消耗为：【56.87ms】
 *              2个角色，平均消耗为：【41.99ms】
 *              1个角色，平均消耗为：【38.32ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的【20ms】范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.滤镜是性能消耗大户，因为带滤镜的图片效果都是通过即时演算形成的。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。并且优化了滤镜内部结构算法。
 * [v1.2]
 * 优化了滤镜内核。
 * [v1.3]
 * 分离了滤镜核心，大幅度优化了底层结构。
 * 添加了填充滤镜功能，降低了模糊滤镜的性能消耗。
 * [v1.4]
 * 添加了最大值编辑的支持。
 *
 *
 * @param 头像是否与敌人滤镜同步
 * @type boolean
 * @on 同步
 * @off 关闭
 * @desc true - 同步，false - 关闭。头像与战斗中的角色遭受的滤镜效果一致。
 * @default true
 *
 * @param 角色死亡时是否加整体黑白滤镜
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。特殊的黑白滤镜，直接作用于整个角色窗口。
 * @default true
 *
 * @param ----滤镜条件----
 * @default 
 *
 * @param 滤镜条件-1
 * @parent ----滤镜条件----
 * @type struct<BattleHudFilter>
 * @desc 设置指定的条件下，角色窗口出现的滤镜效果。
 * @default  {"标签":"--死亡黑白框（关闭波动滤镜）--","===条件===":"","--生命条件--":"","是否添加生命条件":"true","条件-生命百分比上限":"0","条件-生命百分比下限":"0","--魔法条件--":"","是否添加魔法条件":"false","条件-魔法百分比上限":"0","条件-魔法百分比下限":"0","--怒气条件--":"","是否添加怒气条件":"false","条件-怒气百分比上限":"0","条件-怒气百分比下限":"0","===滤镜===":"","纯色滤镜":"关闭","着色滤镜":"黑白","模糊滤镜":"关闭","噪点滤镜":"关闭","滤镜模式":"线性滤镜","--线性滤镜设置--":"","目标程度":"255","--波动滤镜设置--":"","波动程度范围":"120","波动周期":"95"}
 *
 * @param 滤镜条件-2
 * @parent ----滤镜条件----
 * @type struct<BattleHudFilter>
 * @desc 设置指定的条件下，角色窗口出现的滤镜效果。
 * @default  {"标签":"--危机红滤镜--","===条件===":"","--生命条件--":"","是否添加生命条件":"true","条件-生命百分比上限":"25","条件-生命百分比下限":"0","--魔法条件--":"","是否添加魔法条件":"false","条件-魔法百分比上限":"0","条件-魔法百分比下限":"0","--怒气条件--":"","是否添加怒气条件":"false","条件-怒气百分比上限":"0","条件-怒气百分比下限":"0","===滤镜===":"","纯色滤镜":"纯红","着色滤镜":"关闭","模糊滤镜":"关闭","噪点滤镜":"关闭","滤镜模式":"波动滤镜","--线性滤镜设置--":"","目标程度":"255","--波动滤镜设置--":"","波动程度范围":"120","波动周期":"95"}
 *
 * @param 滤镜条件-3
 * @parent ----滤镜条件----
 * @type struct<BattleHudFilter>
 * @desc 设置指定的条件下，角色窗口出现的滤镜效果。
 * @default  {"标签":"--满血滤镜--","===条件===":"","--生命条件--":"","是否添加生命条件":"true","条件-生命百分比上限":"100","条件-生命百分比下限":"100","--魔法条件--":"","是否添加魔法条件":"false","条件-魔法百分比上限":"0","条件-魔法百分比下限":"0","--怒气条件--":"","是否添加怒气条件":"false","条件-怒气百分比上限":"0","条件-怒气百分比下限":"0","===滤镜===":"","纯色滤镜":"纯蓝","着色滤镜":"关闭","模糊滤镜":"关闭","噪点滤镜":"关闭","滤镜模式":"波动滤镜","--线性滤镜设置--":"","目标程度":"255","--波动滤镜设置--":"","波动程度范围":"60","波动周期":"360"}
 *
 * @param 滤镜条件-4
 * @parent ----滤镜条件----
 * @type struct<BattleHudFilter>
 * @desc 设置指定的条件下，角色窗口出现的滤镜效果。
 * @default  {"标签":"--满怒气滤镜--","===条件===":"","--生命条件--":"","是否添加生命条件":"false","条件-生命百分比上限":"0","条件-生命百分比下限":"0","--魔法条件--":"","是否添加魔法条件":"false","条件-魔法百分比上限":"0","条件-魔法百分比下限":"0","--怒气条件--":"","是否添加怒气条件":"true","条件-怒气百分比上限":"100","条件-怒气百分比下限":"100","===滤镜===":"","纯色滤镜":"关闭","着色滤镜":"漂白","模糊滤镜":"关闭","噪点滤镜":"关闭","滤镜模式":"波动滤镜","--线性滤镜设置--":"","目标程度":"255","--波动滤镜设置--":"","波动程度范围":"170","波动周期":"45"}
 *
 * @param 滤镜条件-5
 * @parent ----滤镜条件----
 * @type struct<BattleHudFilter>
 * @desc 设置指定的条件下，角色窗口出现的滤镜效果。
 * @default 
 *
 * @param 滤镜条件-6
 * @parent ----滤镜条件----
 * @type struct<BattleHudFilter>
 * @desc 设置指定的条件下，角色窗口出现的滤镜效果。
 * @default 
 *
 * @param 滤镜条件-7
 * @parent ----滤镜条件----
 * @type struct<BattleHudFilter>
 * @desc 设置指定的条件下，角色窗口出现的滤镜效果。
 * @default 
 *
 * @param 滤镜条件-8
 * @parent ----滤镜条件----
 * @type struct<BattleHudFilter>
 * @desc 设置指定的条件下，角色窗口出现的滤镜效果。
 * @default 
 *
 * @param 滤镜条件-9
 * @parent ----滤镜条件----
 * @type struct<BattleHudFilter>
 * @desc 设置指定的条件下，角色窗口出现的滤镜效果。
 * @default 
 *
 * @param 滤镜条件-10
 * @parent ----滤镜条件----
 * @type struct<BattleHudFilter>
 * @desc 设置指定的条件下，角色窗口出现的滤镜效果。
 * @default 
 */
/*~struct~BattleHudFilter:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的滤镜条件--
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
 * @default 0
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
 * @param ===滤镜===
 * @desc 
 *
 * @param 纯色滤镜
 * @parent ===滤镜===
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 纯黑
 * @value 纯黑
 * @option 纯蓝
 * @value 纯蓝
 * @option 纯绿
 * @value 纯绿
 * @option 纯红
 * @value 纯红
 * @option 黄色
 * @value 黄色
 * @option 紫色
 * @value 紫色
 * @option 青色
 * @value 青色
 * @desc 纯色滤镜的设置。
 * @default 关闭
 *
 * @param 着色滤镜
 * @parent ===滤镜===
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 黑白
 * @value 黑白
 * @option 反色
 * @value 反色
 * @option 鲜艳
 * @value 鲜艳
 * @option 漂白
 * @value 漂白
 * @option 饱和度降低
 * @value 饱和度降低
 * @option 古墨水画色
 * @value 古墨水画色
 * @option 古铜色
 * @value 古铜色
 * @option 宝丽来相机色
 * @value 宝丽来相机色
 * @option 红绿蓝翻转
 * @value 红绿蓝翻转
 * @option 夜色
 * @value 夜色
 * @option 致幻色
 * @value 致幻色
 * @desc 着色滤镜的设置。
 * @default 关闭
 *
 * @param 填充滤镜
 * @parent ===滤镜===
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 纯黑
 * @value 纯黑
 * @option 纯蓝
 * @value 纯蓝
 * @option 纯绿
 * @value 纯绿
 * @option 纯红
 * @value 纯红
 * @option 黄色
 * @value 黄色
 * @option 紫色
 * @value 紫色
 * @option 青色
 * @value 青色
 * @option 纯白
 * @value 纯白
 * @option 自定义
 * @value 自定义
 * @desc 填充滤镜的设置。
 * @default 关闭
 *
 * @param 自定义颜色
 * @parent 填充滤镜
 * @desc 填充滤镜选择自定义颜色时，设置的自定义颜色代码。
 * @default #000000
 *
 * @param 模糊滤镜
 * @parent ===滤镜===
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 模糊滤镜的设置。
 * @default 关闭
 *
 * @param 噪点滤镜
 * @parent ===滤镜===
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 噪点滤镜的设置。
 * @default 关闭
 *
 * @param 滤镜模式
 * @parent ===滤镜===
 * @type select
 * @option 线性滤镜
 * @value 线性滤镜
 * @option 波动滤镜
 * @value 波动滤镜
 * @desc 滤镜的模式。
 * @default 线性滤镜
 *
 * @param --线性滤镜设置--
 * @desc 
 *
 * @param 目标程度
 * @parent --线性滤镜设置--
 * @type number
 * @min 0
 * @max 255
 * @desc 填10，表示角色当前的怒气百分比大于10时的条件。（不包括等于10）
 * @default 255
 *
 * @param --波动滤镜设置--
 * @desc 
 *
 * @param 波动程度范围
 * @parent --波动滤镜设置--
 * @type number
 * @min 0
 * @max 255
 * @desc 填10，表示角色当前的怒气百分比大于10时的条件。（不包括等于10）
 * @default 255
 *
 * @param 波动周期
 * @parent --波动滤镜设置--
 * @type number
 * @min 0
 * @desc 填10，表示角色当前的怒气百分比大于10时的条件。（不包括等于10）
 * @default 60
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XBHF（X_Battle_Hud_Filter）
//		临时全局变量	DrillUp.g_XBHF_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)*o(滤镜) 每帧
//		★性能测试因素	普通战斗
//		★性能测试消耗	87.16ms（这是整个hud的）
//		★最坏情况		8个角色的滤镜全开。
//		★备注			测的性能值依然波动巨大。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			角色窗口-滤镜效果：
//				->角色头像同步
//				->生命状态阶段
//				->最前框+布局的变色
//
//		★必要注意事项：
//			1.滤镜核详细内容，去见Drill_EnemyFilter。
//
//		★其它说明细节：
//			1.窗口框的滤镜效果是瞬间变化的。因为作者我懒，而且有木有延缓变量都无伤大雅。
//			2.与Drill_X_GaugeBossFilter原理一模一样，只是参数稍微不同。
//			3.填充滤镜似乎在框中效果并不合适，但是纯色滤镜也一般般。主要还是取决于素材ui的设计。
//				
//		★存在的问题：
//			暂无
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_BattleHudFilter = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_BattleHudFilter');
	
	DrillUp.g_XBHF_mog_hud = String(Moghunter.parameters['头像是否与敌人滤镜同步'] || "true") == "true";
	DrillUp.g_XBHF_deathBlackWhite = String(Moghunter.parameters['角色死亡时是否加整体黑白滤镜'] || "true") == "true";

	DrillUp.g_XBHF_condition_list_length = 10;
	DrillUp.g_XBHF_condition_list = [];
	for (var i = 0; i < DrillUp.g_XBHF_condition_list_length; i++) {
		if( DrillUp.parameters['滤镜条件-' + String(i+1) ] != "" ){
			DrillUp.g_XBHF_condition_list[i] = JSON.parse(DrillUp.parameters['滤镜条件-' + String(i+1) ]);
			
			DrillUp.g_XBHF_condition_list[i]['hp_enable'] = String(DrillUp.g_XBHF_condition_list[i]["是否添加生命条件"] || "true") == "true";
			DrillUp.g_XBHF_condition_list[i]['hp_top'] = Number(DrillUp.g_XBHF_condition_list[i]["条件-生命百分比上限"] || 0);
			DrillUp.g_XBHF_condition_list[i]['hp_bottom'] = Number(DrillUp.g_XBHF_condition_list[i]["条件-生命百分比下限"] || 0);
			DrillUp.g_XBHF_condition_list[i]['mp_enable'] = String(DrillUp.g_XBHF_condition_list[i]["是否添加魔法条件"] || "false") == "true";
			DrillUp.g_XBHF_condition_list[i]['mp_top'] = Number(DrillUp.g_XBHF_condition_list[i]["条件-魔法百分比上限"] || 0);
			DrillUp.g_XBHF_condition_list[i]['mp_bottom'] = Number(DrillUp.g_XBHF_condition_list[i]["条件-魔法百分比下限"] || 0);
			DrillUp.g_XBHF_condition_list[i]['tp_enable'] = String(DrillUp.g_XBHF_condition_list[i]["是否添加怒气条件"] || "false") == "true";
			DrillUp.g_XBHF_condition_list[i]['tp_top'] = Number(DrillUp.g_XBHF_condition_list[i]["条件-怒气百分比上限"] || 0);
			DrillUp.g_XBHF_condition_list[i]['tp_bottom'] = Number(DrillUp.g_XBHF_condition_list[i]["条件-怒气百分比下限"] || 0);
			
			DrillUp.g_XBHF_condition_list[i]['pureBoard'] = String(DrillUp.g_XBHF_condition_list[i]["纯色滤镜"] || "关闭");
			DrillUp.g_XBHF_condition_list[i]['colorBoard'] = String(DrillUp.g_XBHF_condition_list[i]["着色滤镜"] || "关闭");
			DrillUp.g_XBHF_condition_list[i]['fillBoard'] = String(DrillUp.g_XBHF_condition_list[i]["填充滤镜"] || "关闭");
			DrillUp.g_XBHF_condition_list[i]['fillBoard_color'] = String(DrillUp.g_XBHF_condition_list[i]["自定义颜色"] || "#000000");
			DrillUp.g_XBHF_condition_list[i]['blurFilter'] = String(DrillUp.g_XBHF_condition_list[i]["模糊滤镜"] || "关闭");
			DrillUp.g_XBHF_condition_list[i]['noiseFilter'] = String(DrillUp.g_XBHF_condition_list[i]["噪点滤镜"] || "关闭");
			DrillUp.g_XBHF_condition_list[i]['mode'] = String(DrillUp.g_XBHF_condition_list[i]["滤镜模式"] || "线性滤镜");
			DrillUp.g_XBHF_condition_list[i]['o_tar'] = Number(DrillUp.g_XBHF_condition_list[i]["目标程度"] || 0);
			DrillUp.g_XBHF_condition_list[i]['o_range'] = Number(DrillUp.g_XBHF_condition_list[i]["波动程度范围"] || 0);
			DrillUp.g_XBHF_condition_list[i]['o_period'] = Number(DrillUp.g_XBHF_condition_list[i]["波动周期"] || 0);
			
			//alert(JSON.stringify(DrillUp.g_XBHF_condition_list[i]));
		}else{
			DrillUp.g_XBHF_condition_list[i] = null;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.MOG_BattleHud && 
	Imported.Drill_CoreOfFilter ){
	

//=============================================================================
// ** 敌人/角色
//=============================================================================
//==============================
// * 敌人/角色 初始化
//==============================
var _drill_XBHF_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_drill_XBHF_initMembers.call(this);
	this._drill_XBHF = {};
	this._drill_XBHF.openFilter = true;	
	this._drill_XBHF.setPureLinear = ["",0,0];	//临时赋值用的数组
	this._drill_XBHF.setColorLinear = ["",0,0];
	this._drill_XBHF.setFillLinear = ["",0,0];
	this._drill_XBHF.setBlurLinear = [0,0];
	this._drill_XBHF.setNoiseLinear = [0,0];
	this._drill_XBHF.setPureWave = ["",0,0];
	this._drill_XBHF.setColorWave = ["",0,0];
	this._drill_XBHF.setFillWave = ["",0,0];
	this._drill_XBHF.setBlurWave = [0,0];
	this._drill_XBHF.setNoiseWave = [0,0];
};

//==============================
// * 创建 - 框布局
//==============================
var _drill_XBHF_create_layout = Battle_Hud.prototype.create_layout;
Battle_Hud.prototype.create_layout = function() {
	_drill_XBHF_create_layout.call(this);
	this.drill_XBHF_createBlackWhite();
}
//==============================
// * 创建-整体黑白滤镜
//==============================
Battle_Hud.prototype.drill_XBHF_createBlackWhite = function() {
	if( !DrillUp.g_XBHF_deathBlackWhite ){ return }
	
	this._XBHF_colorFilter = new PIXI.filters.ColorMatrixFilter();
	this._XBHF_colorFilter_check = true;
	
	if( this.filters == null){		//整体滤镜
		var f_intermediary = [];
	}else{
		var f_intermediary = this.filters;
	}
	f_intermediary.push(this._XBHF_colorFilter);
	
	this.filters = f_intermediary;
}

//==============================
// * 帧刷新
//==============================
var _drill_XBHF_update = Battle_Hud.prototype.update;
Battle_Hud.prototype.update = function() {
	_drill_XBHF_update.call(this);
	this.drill_XBHF_updateParam();
	this.drill_XBHF_updateLayout();
	this.drill_XBHF_updateLayoutOverlay();
	this.drill_XBHF_updateBlackWhite();
}
//==============================
// * 帧刷新 - 条件与滤镜参数
//==============================
Battle_Hud.prototype.drill_XBHF_updateParam = function() {
	var battler = this._battler;
	if( this._battler ){
		battler._drill_XBHF.setPureLinear = ["",0,0];	//临时赋值用的数组
		battler._drill_XBHF.setColorLinear = ["",0,0];
		battler._drill_XBHF.setFillLinear = ["",0,0];
		battler._drill_XBHF.setBlurLinear = [0,0];
		battler._drill_XBHF.setNoiseLinear = [0,0];
		battler._drill_XBHF.setPureWave = ["",0,0];
		battler._drill_XBHF.setColorWave = ["",0,0];
		battler._drill_XBHF.setFillWave = ["",0,0];
		battler._drill_XBHF.setBlurWave = [0,0];
		battler._drill_XBHF.setNoiseWave = [0,0];
		
		for(var i=0; i < DrillUp.g_XBHF_condition_list.length ; i++){
			var condition = DrillUp.g_XBHF_condition_list[i];
			if( condition == null ){ continue; }
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
				if(condition.mode == "线性滤镜"){
					if( condition.pureBoard != "关闭" ){
						battler._drill_XBHF.setPureLinear[0] = condition.pureBoard;
						battler._drill_XBHF.setPureLinear[1] = condition.o_tar;
						battler._drill_XBHF.setPureLinear[2] = 1;
					}
					if( condition.colorBoard != "关闭" ){
						battler._drill_XBHF.setColorLinear[0] = condition.colorBoard;
						battler._drill_XBHF.setColorLinear[1] = condition.o_tar;
						battler._drill_XBHF.setColorLinear[2] = 1;
					}
					if( condition.fillBoard != "关闭" ){
						if(condition.fillBoard == "自定义"){
							battler._drill_XBHF.setFillLinear[0] = condition.fillBoard_color;
						}else{
							battler._drill_XBHF.setFillLinear[0] = condition.fillBoard;
						}
						battler._drill_XBHF.setFillLinear[1] = condition.o_tar;
						battler._drill_XBHF.setFillLinear[2] = 1;
					}
					if( condition.blurFilter != "关闭" ){
						battler._drill_XBHF.setBlurLinear[0] = condition.o_tar;
						battler._drill_XBHF.setBlurLinear[1] = 1;
					}
					if( condition.noiseFilter != "关闭" ){
						battler._drill_XBHF.setNoiseLinear[0] = condition.o_tar;
						battler._drill_XBHF.setNoiseLinear[1] = 1;
					}
				}
				if(condition.mode == "波动滤镜"){
					if( condition.pureBoard != "关闭" ){
						battler._drill_XBHF.setPureWave[0] = condition.pureBoard;
						battler._drill_XBHF.setPureWave[1] = condition.o_range;
						battler._drill_XBHF.setPureWave[2] = condition.o_period;
					}
					if( condition.colorBoard != "关闭" ){
						battler._drill_XBHF.setColorWave[0] = condition.colorBoard;
						battler._drill_XBHF.setColorWave[1] = condition.o_range;
						battler._drill_XBHF.setColorWave[2] = condition.o_period;
					}
					if( condition.fillBoard != "关闭" ){
						if(condition.fillBoard == "自定义"){
							battler._drill_XBHF.setFillWave[0] = condition.fillBoard_color;
						}else{
							battler._drill_XBHF.setFillWave[0] = condition.fillBoard;
						}
						battler._drill_XBHF.setFillWave[1] = condition.o_range;
						battler._drill_XBHF.setFillWave[2] = condition.o_period;
					}
					if( condition.blurFilter != "关闭" ){
						battler._drill_XBHF.setBlurWave[0] = condition.o_range;
						battler._drill_XBHF.setBlurWave[1] = condition.o_period;
					}
					if( condition.noiseFilter != "关闭" ){
						battler._drill_XBHF.setNoiseWave[0] = condition.o_range;
						battler._drill_XBHF.setNoiseWave[1] = condition.o_period;
					}
				}
				break;
			}
		}
		
		//battler._drill_XBHF.setPureWave = ["纯红",255,45];
		//battler._drill_XBHF.setColorLinear = ["漂白",255,45];（Linear因为写在前面，你要放在下一帧才会起效）
	}
}
//==============================
// * 帧刷新 - 框布局
//==============================
Battle_Hud.prototype.drill_XBHF_updateLayout = function() {
	if( this._battler && this._layout ){
		var battler = this._battler;
		var battler_sprite = this._layout;
		var data;
		
		//>初始化
		if( battler_sprite.drill_COF_isInited() == false ){
			battler_sprite.drill_COF_initialize();
		}
			
		//>插件指令配置 - 线性
		data = battler._drill_XBHF.setPureLinear;
		battler_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setColorLinear;
		battler_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setFillLinear;
		battler_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setBlurLinear;
		battler_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = battler._drill_XBHF.setNoiseLinear;
		battler_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		//>插件指令配置 - 波动
		data = battler._drill_XBHF.setPureWave;
		battler_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setColorWave;
		battler_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setFillWave;
		battler_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setBlurWave;
		battler_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = battler._drill_XBHF.setNoiseWave;
		battler_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
		
	}
}
//==============================
// * 帧刷新 - 最前布局
//==============================
Battle_Hud.prototype.drill_XBHF_updateLayoutOverlay = function() {
	if( this._battler && this._layout2 ){
		var battler = this._battler;
		var battler_sprite = this._layout2;
		var data;
		
		//>初始化
		if( battler_sprite.drill_COF_isInited() == false ){
			battler_sprite.drill_COF_initialize();
		}
		
		//>插件指令配置 - 线性
		data = battler._drill_XBHF.setPureLinear;
		battler_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setColorLinear;
		battler_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setFillLinear;
		battler_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setBlurLinear;
		battler_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = battler._drill_XBHF.setNoiseLinear;
		battler_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		//>插件指令配置 - 波动
		data = battler._drill_XBHF.setPureWave;
		battler_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setColorWave;
		battler_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setFillWave;
		battler_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = battler._drill_XBHF.setBlurWave;
		battler_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = battler._drill_XBHF.setNoiseWave;
		battler_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
		
	}
}
//==============================
// * 帧刷新 - 整体黑白滤镜
//==============================
Battle_Hud.prototype.drill_XBHF_updateBlackWhite = function() {
	var battler = this._battler;
	if( this._battler && DrillUp.g_XBHF_deathBlackWhite ){
		if(battler.hp == 0 && this._XBHF_colorFilter_check == true){
			this._XBHF_colorFilter_check = false;
			this._XBHF_colorFilter.blackAndWhite(true);
		}
		if(battler.hp > 0 && this._XBHF_colorFilter_check == false){
			this._XBHF_colorFilter_check = true;
			this._XBHF_colorFilter.reset();
		}
	}
}


//=============================================================================
// ** 兼容mog窗口+敌人滤镜 添加滤镜
//=============================================================================
if(Imported.Drill_EnemyFilter && DrillUp.g_XBHF_mog_hud){
	
	//==============================
	// * 帧刷新
	//==============================
	var _drill_XBHF_mog_update = Battle_Hud.prototype.update;
	Battle_Hud.prototype.update = function() {
		_drill_XBHF_mog_update.call(this);
		if(this._face && this._battler ){
			var battler = this._battler;
			var battler_sprite = this._face;
			var data;
		
			//>初始化
			if( battler_sprite.drill_COF_isInited() == false ){
				battler_sprite.drill_COF_initialize();
			}
		
			//>插件指令配置 - 线性
			data = battler._drill_EFi.setPureLinear;	
			battler_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
			data = battler._drill_EFi.setColorLinear;
			battler_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
			data = battler._drill_EFi.setFillLinear;
			if(data){ battler_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]); }
			data = battler._drill_EFi.setBlurLinear;
			battler_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
			data = battler._drill_EFi.setNoiseLinear;
			battler_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
			
			//>插件指令配置 - 波动
			data = battler._drill_EFi.setPureWave;	
			battler_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
			data = battler._drill_EFi.setColorWave;
			battler_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
			data = battler._drill_EFi.setFillWave;
			if(data){ battler_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]); }
			data = battler._drill_EFi.setBlurWave;
			battler_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
			data = battler._drill_EFi.setNoiseWave;
			battler_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
			
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_X_BattleHudFilter = false;
		alert(
			"【Drill_X_BattleHudFilter.js 战斗UI - 角色窗口的滤镜效果[扩展]】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFilter 系统-滤镜核心"+
			"\n- MOG_BattleHud 战斗UI-角色窗口"
		);
}


