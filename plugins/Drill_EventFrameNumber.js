//=============================================================================
// Drill_EventFrameNumber.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        行走图 - 多帧行走图
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventFrameNumber +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置行走图的 帧数、初始帧、帧播放速度 。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于核心插件，才能运行。
 * 基于：
 *   - Drill_CoreOfEventFrame        行走图-行走图优化核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   事件、玩家都可以设置多帧行走图。但只对大图 $xxxx.png 有效。
 * 2.更多详细内容，去看看 "7.行走图 > 关于多帧行走图.docx"。
 * 帧数：
 *   (1.该插件专门扩充横向的帧，将默认的3列帧扩展到任意列的帧数。
 *      具体可以去看看 "7.行走图 > 关于多帧行走图.docx"。
 *   (2.镜像插件无法反射出与多帧行走图相符的镜像，你需要隐藏镜像。
 *   (3.使用事件指令 修改玩家图片/修改事件图片 时要注意帧数一致。
 *      如果你给了一张不符尺寸的单行走图，会得到错误的图片。
 *   (4.该插件兼容mog角色姿势，但是这就意味着你需要配帧数全相同的
 *      跳跃、等待、奔跑图像。
 * 动画帧间隔：
 *   (1.你可以填固定数字，也可以使用速度公式，6+(7-speed)*3，
 *      使得速度快慢能够影响与行走帧的播放速度。
 *   (2.量子妹的间隔为默认间隔，而小爱丽丝的间隔要少一些，这样可以
 *      让小爱丽丝行走帧快一些，看起来动作更加"努力"一点。
 * 行走循环播放：
 *   (1.当事件步行行走时，会循环播放动画，你可以控制动画的循环方式
 *      包括循环序列。
 *   (2.多帧事件在步行结束时，会有一个连贯性修正，使得帧动作不会立
 *      即变成初始帧。
 * 初始帧：
 *   (1.通常行走图分为两种状态：等待和移动。
 *      一般情况下，两种状态会共用行走图初始帧。你可以设置移动时排
 *      除初始帧的播放，来实现等待和移动的行走图分离播放。
 *   (2.随机初始帧通常用于大面积的装饰物事件，比如石头、瓦砾等对象。
 *      在事件页中，添加随机初始帧之后，就可以复制粘贴很多石头了。
 * 固定帧：
 *   (1.固定帧与锁定帧的定义不一样，见文档介绍。
 *      固定帧只控制帧数，锁定帧会控制帧数+朝向。
 *   (2.多帧行走图的固定帧与循环播放，都是控制行走帧的播放顺序。
 *      固定帧开启时，朝上下左右时，会使用锁定的那一列帧的图像。
 * 设计：
 *   (1.你可以缩短动画帧间隔，并配置一个三帧以上的行走图，使得你的
 *      人物移动时动作更加流畅。
 *   (2.你可以设置固定帧+黑白滤镜效果，来表示一个能转向行走但不会
 *      摇摆的小爱丽丝石像。
 *   (3.多帧行走图有很多通过改变帧数实现流畅行走图的设计方法。
 *      具体去看看 "7.行走图 > 关于多帧行走图.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过设置事件注释，来设置你要对应的多帧图片：
 * 
 * 事件注释：=>多帧行走图 : 帧数 : 5
 * 事件注释：=>多帧行走图 : 初始帧 : 2
 * 事件注释：=>多帧行走图 : 移动时排除初始帧的播放
 * 事件注释：=>多帧行走图 : 移动时恢复初始帧的播放
 * 事件注释：=>多帧行走图 : 动画帧间隔 : 9
 * 事件注释：=>多帧行走图 : 动画帧间隔 : 6+(7-speed)*3
 * 事件注释：=>多帧行走图 : 动画帧间隔(奔跑时) : 9
 * 事件注释：=>多帧行走图 : 动画帧间隔(奔跑时) : 6+(7-speed)*3
 *
 * 角色注释：<多帧行走图:帧数:5>
 * 角色注释：<多帧行走图:初始帧:2>
 * 角色注释：<多帧行走图:移动时排除初始帧的播放>
 * 角色注释：<多帧行走图:移动时恢复初始帧的播放>
 * 角色注释：<多帧行走图:动画帧间隔:9>
 * 角色注释：<多帧行走图:动画帧间隔:6+(7-speed)*3>
 * 角色注释：<多帧行走图:动画帧间隔(奔跑时):9>
 * 角色注释：<多帧行走图:动画帧间隔(奔跑时):6+(7-speed)*3>
 * 
 * 1.行走图有三个基本属性：
 *     帧数（默认3）
 *     初始帧（默认2）
 *     动画帧间隔（默认"6+(7-speed)*3" ）
 *   具体可以去看看 "7.行走图 > 关于多帧行走图.docx"。
 * 2.玩家或者事件停止移动时，会恢复到初始帧的图片状态。
 * 3.注意，只有"动画帧间隔"能设置公式。
 *   默认情况下，动画帧间隔 和 动画帧间隔(奔跑时) 都为："6+(7-speed)*3"，
 *   即玩家改变速度，就能根据速度决定 行走图播放 的快慢。
 *   当然，你也可以固定播放速度。
 * 4.默认公式是 6+(7-speed)*3 ，成反比形式。
 *   速度最慢的1，代入公式，帧间隔为 24 。（相当于半秒换一帧）
 *   速度最快的6，代入公式，帧间隔为 9 。
 *   也就是说，速度越快，帧间隔越短，动画播放速度也越快。
 * 5.speed的值为 1,2,3,4,5,6 使用公式后，系统会自动计算，
 *   得出相应的间隔。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令
 * 你也可以通过插件指令临时修改三个属性：
 * 
 * 插件指令：>多帧行走图 : 玩家 : 帧数 : 5
 * 插件指令：>多帧行走图 : 玩家全员 : 帧数 : 5
 * 插件指令：>多帧行走图 : 玩家队员[1] : 帧数 : 5
 * 插件指令：>多帧行走图 : 玩家队员变量[21] : 帧数 : 5
 * 插件指令：>多帧行走图 : 本事件 : 帧数 : 5
 * 插件指令：>多帧行走图 : 事件[10] : 帧数 : 5
 * 插件指令：>多帧行走图 : 事件变量[21] : 帧数 : 5
 * 插件指令：>多帧行走图 : 批量事件[10,11] : 帧数 : 5
 * 插件指令：>多帧行走图 : 批量事件变量[21,22] : 帧数 : 5
 * 
 * 插件指令：>多帧行走图 : 事件[10] : 帧数 : 5
 * 插件指令：>多帧行走图 : 事件[10] : 初始帧 : 2
 * 插件指令：>多帧行走图 : 事件[10] : 动画帧间隔 : 9
 * 插件指令：>多帧行走图 : 事件[10] : 动画帧间隔 : 6+(7-speed)*3
 * 插件指令：>多帧行走图 : 事件[10] : 动画帧间隔(奔跑时) : 9
 * 插件指令：>多帧行走图 : 事件[10] : 动画帧间隔(奔跑时) : 6+(7-speed)*3
 * 
 * 1.前面部分（本事件）和后面设置（帧数 : 5）可以随意组合。
 *   一共有9*3种组合方式。
 * 2.玩家插件指令设置后，永久有效，必须手动解锁才可以恢复原样。
 *   事件插件指令设置后，只在本地图有效，离开地图失效。
 * 3.注意，只有"动画帧间隔"能设置公式。
 *   事件虽然可以设置"动画帧间隔(奔跑时)"，但事件并不能奔跑，所以没有效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 固定帧
 * 你可以固定指定事件的帧：
 * 
 * 事件注释：=>多帧行走图 : 固定帧 : 1
 * 事件注释：=>多帧行走图 : 解除固定帧
 *
 * 角色注释：<多帧行走图:固定帧:5>
 * 角色注释：<多帧行走图:解除固定帧>
 * 
 * 1.固定帧开启时，朝上下左右时，会使用锁定的那一列帧的图像。
 * 2.注意，固定帧与锁定帧的定义不一样，
 *   详细见文档 "7.行走图 > 关于多帧行走图.docx" 的介绍。
 *   固定帧只控制帧数，锁定帧会控制帧数+朝向。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 固定帧（插件指令）
 * 你也可以通过插件指令临时修改三个属性：
 * 
 * 插件指令：>多帧行走图 : 玩家 : 固定帧 : 1
 * 插件指令：>多帧行走图 : 玩家全员 : 固定帧 : 1
 * 插件指令：>多帧行走图 : 玩家队员[1] : 固定帧 : 1
 * 插件指令：>多帧行走图 : 玩家队员变量[21] : 固定帧 : 1
 * 插件指令：>多帧行走图 : 本事件 : 固定帧 : 1
 * 插件指令：>多帧行走图 : 事件[10] : 固定帧 : 1
 * 插件指令：>多帧行走图 : 事件变量[21] : 固定帧 : 1
 * 插件指令：>多帧行走图 : 批量事件[10,11] : 固定帧 : 1
 * 插件指令：>多帧行走图 : 批量事件变量[21,22] : 固定帧 : 1
 * 
 * 插件指令：>多帧行走图 : 事件[10] : 固定帧 : 1
 * 插件指令：>多帧行走图 : 事件[10] : 解除固定帧
 * 
 * 1.前面部分（本事件）和后面设置（固定帧 : 1）可以随意组合。
 *   一共有9*2种组合方式。
 * 2.玩家插件指令设置后，永久有效，必须手动解锁才可以恢复原样。
 *   事件插件指令设置后，只在本地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 行走循环播放
 * 你可以设置事件播放行走图的循环方式：
 *
 * 事件注释：=>多帧行走图 : 设置循环 : 从左往右循环
 * 事件注释：=>多帧行走图 : 设置循环 : 从右往左循环
 * 事件注释：=>多帧行走图 : 设置循环 : 左右往返
 * 事件注释：=>多帧行走图 : 设置循环 : 1,2,3,2
 * 事件注释：=>多帧行走图 : 恢复默认循环
 *
 * 角色注释：<多帧行走图:设置循环:从左往右循环>
 * 角色注释：<多帧行走图:设置循环:从右往左循环>
 * 角色注释：<多帧行走图:设置循环:左右往返>
 * 角色注释：<多帧行走图:设置循环:1,2,3,2>
 * 
 * 1.数字"1,2,3,2"表示循环的序列。
 *   如果帧数只有3帧，却出现了越界数字4，则这一帧的行走图为空图。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 行走循环播放（插件指令）
 * 你也可以通过插件指令临时修改三个属性：
 * 
 * 插件指令：>多帧行走图 : 玩家 : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 玩家全员 : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 玩家队员[1] : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 玩家队员变量[21] : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 本事件 : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 事件[10] : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 事件变量[21] : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 批量事件[10,11] : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 批量事件变量[21,22] : 设置循环 : 从左往右循环
 * 
 * 插件指令：>多帧行走图 : 事件[10] : 设置循环 : 从左往右循环
 * 插件指令：>多帧行走图 : 事件[10] : 设置循环 : 从右往左循环
 * 插件指令：>多帧行走图 : 事件[10] : 设置循环 : 左右往返
 * 插件指令：>多帧行走图 : 事件[10] : 设置循环 : 1,2,3,2
 * 插件指令：>多帧行走图 : 事件[10] : 恢复默认循环
 * 
 * 1.前面部分（本事件）和后面设置（设置循环 : 从左往右循环）可以随意组合。
 *   一共有9*4种组合方式。
 * 2.玩家插件指令设置后，永久有效，必须手动解锁才可以恢复原样。
 *   事件插件指令设置后，只在本地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 随机初始帧
 * 你可以通过设置事件注释，控制事件初始的帧数：
 * 
 * 事件注释：=>多帧行走图 : 随机初始帧
 * 事件注释：=>多帧行走图 : 随机初始帧 : 指定随机帧[1,2,4]
 * 事件注释：=>多帧行走图 : 随机初始帧(固定随机种子)
 * 事件注释：=>多帧行走图 : 随机初始帧(固定随机种子) : 指定随机帧[1,2,4]
 * 
 * 1.设置后，切换到事件页后会随机初始帧（默认 1~3 的随机范围）。
 *   "指定随机帧[1,2,4]"表示在指定的帧序号中，进行随机。
 * 2.默认情况下，如果玩家离开重进地图，那么帧数会再次随机。
 *   "固定随机种子"可以使得玩家重进地图时，帧数不再随机变化，而是固定的随机值。
 * 3.该设置能够和 行走图-锁定帧 插件合并使用。
 *   顺序固定为 先执行随机初始帧，再永久锁定帧。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   去行走图管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【114.60ms】
 *              100个事件的地图中，平均消耗为：【59.70ms】
 *               50个事件的地图中，平均消耗为：【29.10ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.此插件的性能消耗与事件直接成正比，因为一个事件对应一个行走图，
 *   是几乎一比一的消耗。关闭此插件并不能减少消耗，因为此插件只是把
 *   底层的消耗转移到此插件并显示了出来。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * [v1.2]
 * 优化了内部结构，并且添加了性能测试说明。
 * [v1.3]
 * 大幅度完善了插件指令，以及文档、概念的说明。
 * [v1.4]
 * 修复了玩家初始帧设置无效的bug。
 * [v1.5]
 * 修复了玩家 修改动画帧 无效的bug。
 * [v1.6]
 * 添加了 随机初始帧 的功能。
 * [v1.7]
 * 添加了移动时，排除初始帧播放的功能。
 * [v1.8]
 * 修复了玩家设置后反复在2-4帧重复的bug。
 * [v1.9]
 * 修复了原地踏步失效的bug。
 * [v2.0]
 * 优化了存储空间占用。
 * [v2.1]
 * 添加了 动画帧间隔(奔跑时) 的功能。
 * 
 * 
 * @param 是否修正多帧连贯性
 * @type boolean
 * @on 修正
 * @off 不修正
 * @desc 事件停止移动时，修正会有一个恢复过程。不修正则立即切换到初始帧。
 * @default true
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFN（Event_Frame_Number）
//		临时全局变量	DrillUp.g_EFN_xxx
//		临时局部变量	this._drill_EFN_xxxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_CharacterBase.prototype.updateAnimation（半覆写）
//						Game_CharacterBase.prototype.updateAnimationCount（半覆写）
//						Game_CharacterBase.prototype.updatePattern（半覆写）
//						Game_CharacterBase.prototype.animationWait（半覆写）
//						Game_CharacterBase.prototype.maxPatternn（半覆写）
//						Game_CharacterBase.prototype.pattern（半覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	行走图管理层
//		★性能测试消耗	2024/1/22：
//							》200个事件：114.6ms（drill_EFN_updateInter_Formula）59.7ms（drill_EFN_updateState）35.6ms（drill_EFN_updateLoop）
//							》50个事件：29.1ms（drill_EFN_updateInter_Formula）24.7ms（drill_EFN_updateState）1.1ms（drill_EFN_updateLoop）
//						2024/6/15：
//							》动画序列管理层80事件：15.4ms（drill_EFN_updateInter_Formula）11.1ms（drill_EFN_updateState）4.9ms（drill_EFN_updateInter_Tick）21.7ms（drill_EFN_isEnabled）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆事件注释
//			->☆角色注释
//
//			->多帧行走图 控制器【Drill_EFN_Controller】
//				->A主体
//				->B状态规划器
//				->C帧间隔器
//				->D帧播放器
//			->☆控制器绑定
//				->初始化检查
//				->是否启用多帧控制
//				->控制器 帧刷新
//				->控制器 赋值
//					> _originalPattern 初始帧
//					> _animationCount 计数器
//					> _pattern 当前帧
//				->执行原函数
//					> updateAnimationCount()
//					> updatePattern()
//			->☆控制器的动画帧
//				> setPattern( pattern )
//				> animationWait()
//				> maxPattern()
//				> pattern()
//				> drill_COEF_updateValue_PatternWidth()
//
//			->☆随机初始帧
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 多帧行走图 控制器【Drill_EFN_Controller】
//		
//		★必要注意事项：
//			1."_pattern"与方向没有关系，该插件不需要考虑方向问题。
//			
//		★其它说明细节：
//			1.Sprite_Character是附着在 Game_CharacterBase 上的，先有Character，后有Sprite。
//			2.两个需要留意的公式：
//				(this._pattern + 1) % this.maxPattern(); 帧循环公式
//				(9 - this.realMoveSpeed()) * 3;			帧速度公式
//			  展开公式后，if会变得非常多，看起来会比较杂乱。
//			  【公式的结果最好保存，而不是每次请求就计算一次。】
//			3.注意 多帧行走图 有时候会造成虚影的bug。
//			  是因为状态切换太频繁，导致只有1帧在显示某个特定帧，所以看起来像虚影。
//
//		★存在的问题：
//			1.问题：插件指令临时修改玩家的帧时，人物换队伍后，没有对应。暂时未想到办法。
//			  解决：【未解决】
//			2.问题：初始帧为0或2 且 勾选原地踏步 的情况下，切换事件页会导致 不再原地踏步 的问题。（2023-5-18）
//					此问题有其它解决方案，但是最好吧底层完全了解清楚为什么。
//			  解决：【已解决】，见"强制重新刷一次状态检查"。
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_EFN_PluginTip_curName = "Drill_EventFrameNumber.js 行走图-多帧行走图";
	DrillUp.g_EFN_PluginTip_baseList = ["Drill_CoreOfEventFrame.js 行走图-行走图优化核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EFN_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EFN_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EFN_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EFN_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EFN_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EFN_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EFN_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_EFN_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_EFN_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	//==============================
	// * 提示信息 - 报错 - 外部插件冲突（旧插件改名）
	//==============================
	DrillUp.drill_EFN_getPluginTip_ConflictOldName = function(){
		return "【" + DrillUp.g_EFN_PluginTip_curName + "】\n注意，检测到重复的多帧行走图插件，请及时去掉 Drill_EventFrame 旧插件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventFrameNumber = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventFrameNumber');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_EFN_continuityEnabled = String(DrillUp.parameters["是否修正多帧连贯性"] || "true") === "true";	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventFrame ){
	alert( DrillUp.drill_EFN_getPluginTip_ConflictOldName() );
};
if( Imported.Drill_CoreOfEventFrame ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EFN_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EFN_pluginCommand.call(this, command, args);
	if( command === ">多帧行走图" ){
		
		/*-----------------对象组获取------------------*/
		var e_chars = null;			// 事件对象组
		var p_chars = null;			// 玩家对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EFN_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EFN_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EFN_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EFN_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			
			if( p_chars == null && ( unit == "玩家" || unit == "玩家领队" ) ){
				p_chars = [ $gamePlayer ];
			}
			if( p_chars == null && unit == "玩家全员" ){
				p_chars = $gamePlayer.followers().visibleFollowers();
				p_chars.unshift($gamePlayer);
			}
			if( p_chars == null && unit.indexOf("玩家队员变量[") != -1 ){
				unit = unit.replace("玩家队员变量[","");
				unit = unit.replace("]","");
				var group = $gamePlayer.followers().visibleFollowers();
				group.unshift($gamePlayer);
				p_chars = [];
				p_chars.push(group[ $gameVariables.value(Number(unit)) ]);
			}
			if( p_chars == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var group = $gamePlayer.followers().visibleFollowers();
				group.unshift($gamePlayer);
				p_chars = [];
				p_chars.push(group[ Number(unit) ]);
			}
		}
		// > 未获取到对象，直接跳过
		if( e_chars == null && p_chars == null ){ return; }
		
		
		/*-----------------解除固定帧------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "解除固定帧" || type == "解除锁定帧" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFN_checkController();
						e_chars[k]._drill_EFN_controller.drill_EFN_clearLockPattern();
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFN_checkController();
						p_chars[k]._drill_EFN_controller.drill_EFN_clearLockPattern();
					}
				}
			}
		}
		
		/*-----------------设置帧数------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "帧数" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFN_checkController();
						e_chars[k]._drill_EFN_controller.drill_EFN_setMaxPattern( Number(temp2) );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFN_checkController();
						p_chars[k]._drill_EFN_controller.drill_EFN_setMaxPattern( Number(temp2) );
					}
				}
			}
			if( type == "初始帧" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFN_checkController();
						e_chars[k]._drill_EFN_controller.drill_EFN_setOrgPattern( Number(temp2)-1 );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFN_checkController();
						p_chars[k]._drill_EFN_controller.drill_EFN_setOrgPattern( Number(temp2)-1 );
					}
				}
			}
			if( type == "固定帧" || type == "锁定帧" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFN_checkController();
						e_chars[k]._drill_EFN_controller.drill_EFN_setLockPattern( Number(temp2)-1 );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFN_checkController();
						p_chars[k]._drill_EFN_controller.drill_EFN_setLockPattern( Number(temp2)-1 );
					}
				}
			}
			if( type == "动画帧间隔" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFN_checkController();
						e_chars[k]._drill_EFN_controller.drill_EFN_setInterFormula( String(temp2) );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFN_checkController();
						p_chars[k]._drill_EFN_controller.drill_EFN_setInterFormula( String(temp2) );
					}
				}
			}
			if( type == "动画帧间隔(奔跑时)" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFN_checkController();
						e_chars[k]._drill_EFN_controller.drill_EFN_setInterDashingFormula( String(temp2) );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFN_checkController();
						p_chars[k]._drill_EFN_controller.drill_EFN_setInterDashingFormula( String(temp2) );
					}
				}
			}
		}
		/*-----------------行走循环播放------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "恢复默认循环" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFN_checkController();
						e_chars[k]._drill_EFN_controller.drill_EFN_setLoopType( "左右往返", [] );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFN_checkController();
						p_chars[k]._drill_EFN_controller.drill_EFN_setLoopType( "左右往返", [] );
					}
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "设置循环" ){
				var loop_type = "";
				var loop_seq = [];
				if( temp2.indexOf(",") != -1 || temp2.indexOf("，") != -1 ){
					loop_type = "自定义序列";
					var arr = temp2.split(/[,，]/);
					var arr2 = [];
					for(var j=0; j < arr.length; j++ ){ arr2.push( Number(arr[j])-1 ); };
					loop_seq = arr2;
				}else{
					loop_type = String(temp2);
				}
				
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFN_checkController();
						e_chars[k]._drill_EFN_controller.drill_EFN_setLoopType( loop_type,loop_seq );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFN_checkController();
						p_chars[k]._drill_EFN_controller.drill_EFN_setLoopType( loop_type,loop_seq );
					}
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFN_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EFN_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};

	
//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 初始化绑定
//
//			说明：	> 注释与当前事件页有关，不一定跨事件页。
//==============================
var _drill_EFN_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_EFN_c_setupPageSettings.call(this);
	this.drill_EFN_setupPageSettings();
};
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EFN_setupPageSettings = function() {
	var page = this.page();
	if( page == undefined ){ return; }
    var image = page.image;
	if( image == undefined ){ return; }
	
	
	if( this._drill_EFN_controller != undefined ){
		
		// > 记录初始帧
		this._drill_EFN_controller.drill_EFN_setOrgPattern( Number(image.pattern) );
		
		// > 事件变化时，强制重新刷一次状态检查
		//		（2023-5-18 此处能解决 初始帧为0或2 且 勾选原地踏步 的情况下，切换事件页会导致 不再原地踏步 的问题。）
		//		（常规情况下，切换事件页不会修改 B状态规划器的当前状态 cur_state，但由于出现了 不再原地踏步问题，只能强制刷新一次状态检查了）
		this._drill_EFN_controller._drill_EFN_lastState = "";
	}
	
	
	// > 排除图块行走图情况
    if( image.tileId > 0 ){ return; }
	
	this.list().forEach(function(l) {
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>多帧行走图" ){
				
				if( args.length == 2 ){
					var type = String(args[1]);
					if( type == "解除固定帧"){
						this.drill_EFN_checkController();
						this._drill_EFN_controller.drill_EFN_clearLockPattern();
					}
					if( type == "移动时排除初始帧的播放"){
						this.drill_EFN_checkController();
						this._drill_EFN_controller.drill_EFN_setLoopExcludeOrg( true );
					}
					if( type == "移动时恢复初始帧的播放"){
						this.drill_EFN_checkController();
						this._drill_EFN_controller.drill_EFN_setLoopExcludeOrg( false );
					}
				}
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp2 = String(args[3]);
					if( type == "帧数"){
						this.drill_EFN_checkController();
						this._drill_EFN_controller.drill_EFN_setMaxPattern( Number(temp2) );
					}
					if( type == "初始帧"){
						this.drill_EFN_checkController();
						this._drill_EFN_controller.drill_EFN_setOrgPattern( Number(temp2)-1 );
					}
					if( type == "固定帧"){
						this.drill_EFN_checkController();
						this._drill_EFN_controller.drill_EFN_setLockPattern( Number(temp2)-1 );
					}
					if( type == "动画帧间隔"){
						this.drill_EFN_checkController();
						this._drill_EFN_controller.drill_EFN_setInterFormula( String(temp2) );
					}
					if( type == "动画帧间隔(奔跑时)"){
						this.drill_EFN_checkController();
						this._drill_EFN_controller.drill_EFN_setInterDashingFormula( String(temp2) );
					}
				}
				
				if( args.length == 2 ){
					var type = String(args[1]);
					if( type == "恢复默认循环" ){
						this.drill_EFN_checkController();
						this._drill_EFN_controller.drill_EFN_setLoopType( "左右往返", [] );
					}
				}
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp2 = String(args[3]);
					if( type == "设置循环"){
						var loop_type = "";
						var loop_seq = [];
						if( temp2.indexOf(",") != -1 || temp2.indexOf("，") != -1 ){
							loop_type = "自定义序列";
							var arr = temp2.split(/[,，]/);
							var arr2 = [];
							for(var j=0; j < arr.length; j++ ){ arr2.push( Number(arr[j])-1 ); };
							loop_seq = arr2;
						}else{
							loop_type = String(temp2);
						}
						this.drill_EFN_checkController();
						this._drill_EFN_controller.drill_EFN_setLoopType( loop_type,loop_seq );
					}
				}
			};  
		};
	}, this);
}

//=============================================================================
// ** ☆角色注释
//=============================================================================
//==============================
// * 角色注释 - 玩家初始化
//==============================
var _drill_EFN_player_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function(){
	_drill_EFN_player_refresh.call(this);
	var actor = $gameParty.leader();
	if( actor == undefined ){ return; }
	var note = String($dataActors[actor.actorId()].note);
	this.drill_EFN_setupNote( note );
}
//==============================
// * 角色注释 - 玩家队员初始化
//==============================
var _drill_EFN_follower_refresh = Game_Follower.prototype.refresh;
Game_Follower.prototype.refresh = function(){
	_drill_EFN_follower_refresh.call(this);
	var actor = this.actor();
	if( actor == undefined ){ return; }
	var note = String($dataActors[actor.actorId()].note);
	this.drill_EFN_setupNote( note );
}
//==============================
// * 角色注释 - 注释解析
//==============================
Game_CharacterBase.prototype.drill_EFN_setupNote = function( note ){
	
	// > 重设数据
	this.drill_EFN_checkController();
	this._drill_EFN_controller.drill_controller_resetData( DrillUp.g_EFN_controllerData );
	
	// > 角色注释
	var types = (note.match( /<多帧行走图:([^<>]*?)>/g )) || [];
	for(var r = 0; r < types.length; r++ ){
		var re_list = (types[r].match( /<多帧行走图:([^<>]*?)>/ )) || [];
		//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。

		var args = String( re_list[1] ).split(':');
		if( args.length == 1 ){
			var type = String(args[0]);
			if( type == "解除固定帧"){
				this._drill_EFN_controller.drill_EFN_clearLockPattern();
			}
			if( type == "移动时排除初始帧的播放"){
				this._drill_EFN_controller.drill_EFN_setLoopExcludeOrg( true );
			}
			if( type == "移动时恢复初始帧的播放"){
				this._drill_EFN_controller.drill_EFN_setLoopExcludeOrg( false );
			}
		}
		if( args.length == 2 ){
			var type = String(args[0]);
			var temp2 = String(args[1]);
			if( type == "帧数"){
				this._drill_EFN_controller.drill_EFN_setMaxPattern( Number(temp2) );	//初始化图片信息相关内容，还需要同步到 this._character 中
			}
			if( type == "初始帧"){
				this._drill_EFN_controller.drill_EFN_setOrgPattern( Number(temp2)-1 );
			}
			if( type == "固定帧"){
				this._drill_EFN_controller.drill_EFN_setLockPattern( Number(temp2)-1 );
			}
			if( type == "动画帧间隔"){
				this._drill_EFN_controller.drill_EFN_setInterFormula( String(temp2) );
			}
			if( type == "动画帧间隔(奔跑时)"){
				this._drill_EFN_controller.drill_EFN_setInterDashingFormula( String(temp2) );
			}
			if( type == "设置循环"){
				var loop_type = "";
				var loop_seq = [];
				if( temp2.indexOf(",") != -1 || temp2.indexOf("，") != -1 ){
					loop_type = "自定义序列";
					var arr = temp2.split(/[,，]/);
					var arr2 = [];
					for(var j=0; j < arr.length; j++ ){ arr2.push( Number(arr[j])-1 ); };
					loop_seq = arr2;
				}else{
					loop_type = String(temp2);
				}
				this._drill_EFN_controller.drill_EFN_setLoopType( loop_type,loop_seq );
			}
		}
	}
}



//=============================================================================
// ** 多帧行走图 控制器【Drill_EFN_Controller】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个专门控制行走图动画帧的数据类。
// **		子功能：	->动画帧
// **						->启用/关闭
// **						->暂停/继续
// **						->重设数据
// **					->A主体
// **						> 初始帧
// **						> 帧数
// **						> 固定帧
// **					->B状态规划器
// **						> 踏步动画
// **						> 停止状态
// **							> 停止状态的连贯性
// **						> 移动状态
// **						> 跳跃状态
// **					->C帧间隔器
// **						->公式
// **						->计数器
// **					->D帧播放器
// **						->循环播放
// **						->排除初始帧
// **						->获取序列
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_EFN_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 初始化
//==============================
Drill_EFN_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//私有数据初始化
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> character 指针（父类对象）
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_EFN_Controller.prototype.drill_EFN_update = function( character ){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_EFN_updateAttr();						//帧刷新 - A主体
	this.drill_EFN_updateState( character );			//帧刷新 - B状态规划器
	this.drill_EFN_updateInter_Formula( character );	//帧刷新 - C帧间隔器 - 公式
	this.drill_EFN_updateInter_Tick( character );		//帧刷新 - C帧间隔器 - 计数器
	this.drill_EFN_updateLoop();						//帧刷新 - D帧播放器
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
Drill_EFN_Controller.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};
//##############################
// * 控制器 - 启用/关闭【标准函数】
//
//			参数：	> enable 布尔（是否启用）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_EFN_Controller.prototype.drill_EFN_setEnable = function( enable ){
	var data = this._drill_data;
	data['enable'] = enable;
};
//##############################
// * 控制器 - 判断启用情况【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔（是否启用）
//##############################
Drill_EFN_Controller.prototype.drill_EFN_isEnable = function(){
	return this._drill_data['enable'];
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_EFN_Controller.prototype.drill_EFN_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};

//##############################
// * 控制器 - A主体 - 设置当前帧【开放函数】
//
//			参数：	> pattern 数字
//			返回：	> 无
//##############################
Drill_EFN_Controller.prototype.drill_EFN_setPattern = function( pattern ){
	this._drill_loop_curSeq = [ pattern ];
};
//##############################
// * 控制器 - A主体 - 获取当前帧数【开放函数】
//
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_EFN_Controller.prototype.drill_EFN_pattern = function(){
	return this._drill_loop_curPattern;
};
//##############################
// * 控制器 - A主体 - 设置初始帧【开放函数】
//
//			参数：	> orgPattern 数字
//			返回：	> 无
//			
//			说明：	> 不可放在帧刷新函数中实时调用。
//##############################
Drill_EFN_Controller.prototype.drill_EFN_setOrgPattern = function( orgPattern ){
	var data = this._drill_data;
	data['orgPattern'] = orgPattern;
	this.drill_EFN_refreshLoop();
};
//##############################
// * 控制器 - A主体 - 获取初始帧【开放函数】
//
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_EFN_Controller.prototype.drill_EFN_orgPattern = function(){
	return this._drill_data['orgPattern'];
};
//##############################
// * 控制器 - A主体 - 设置最大帧数【开放函数】
//
//			参数：	> maxPattern 数字
//			返回：	> 无
//			
//			说明：	> 不可放在帧刷新函数中实时调用。
//##############################
Drill_EFN_Controller.prototype.drill_EFN_setMaxPattern = function( maxPattern ){
	var data = this._drill_data;
	data['maxPattern'] = maxPattern;
	this.drill_EFN_refreshLoop();
};
//##############################
// * 控制器 - A主体 - 获取最大帧数【开放函数】
//
//			参数：	> 无
//			返回：	> 数字
//##############################
Drill_EFN_Controller.prototype.drill_EFN_maxPattern = function(){
	return this._drill_data['maxPattern'];
};
//##############################
// * 控制器 - A主体 - 获取当前计数器【开放函数】
//
//			参数：	> 无
//			返回：	> 数字
//
//			说明：	用于兼容外部的设定。
//##############################
Drill_EFN_Controller.prototype.drill_EFN_animationCount = function(){
	return 0;
};
//##############################
// * 控制器 - A主体 - 获取间隔【开放函数】
//
//			参数：	> 无
//			返回：	> 数字
//
//			说明：	用于兼容外部的设定。
//##############################
Drill_EFN_Controller.prototype.drill_EFN_animationWait = function(){
	return this._drill_inter_cur;
};
//##############################
// * 控制器 - A主体 - 设置固定帧【开放函数】
//
//			参数：	> pattern 数字
//			返回：	> 无
//##############################
Drill_EFN_Controller.prototype.drill_EFN_setLockPattern = function( pattern ){
	var data = this._drill_data;
	data['lockPattern'] = pattern;
};
//##############################
// * 控制器 - A主体 - 解除固定帧【开放函数】
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_EFN_Controller.prototype.drill_EFN_clearLockPattern = function(){
	var data = this._drill_data;
	data['lockPattern'] = -1;
};

//##############################
// * 控制器 - C帧间隔器 - 设置帧间隔【开放函数】
//
//			参数：	> interFormula 字符串
//			返回：	> 无
//##############################
Drill_EFN_Controller.prototype.drill_EFN_setInterFormula = function( interFormula ){
	var data = this._drill_data;
	data['interFormula'] = interFormula;
};
//##############################
// * 控制器 - C帧间隔器 - 设置帧间隔【开放函数】
//
//			参数：	> interDashingFormula 字符串
//			返回：	> 无
//##############################
Drill_EFN_Controller.prototype.drill_EFN_setInterDashingFormula = function( interDashingFormula ){
	var data = this._drill_data;
	data['interDashingFormula'] = interDashingFormula;
};

//##############################
// * 控制器 - D帧播放器 - 重刷序列【开放函数】
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_EFN_Controller.prototype.drill_EFN_refreshLoop = function(){
	this.drill_EFN_refreshStateSeq();
};
//##############################
// * 控制器 - D帧播放器 - 设置循环【开放函数】
//
//			参数：	> loopType 字符串
//					> seq 数字数组
//			返回：	> 无
//##############################
Drill_EFN_Controller.prototype.drill_EFN_setLoopType = function( loopType, seq ){
	var data = this._drill_data;
	data['loop_type'] = loopType;
	data['loop_seq'] = seq;
	this.drill_EFN_refreshLoop();
};
//##############################
// * 控制器 - D帧播放器 - 设置排除帧【开放函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Drill_EFN_Controller.prototype.drill_EFN_setLoopExcludeOrg = function( enable ){
	var data = this._drill_data;
	data['loop_excludeOrg'] = enable;
	this.drill_EFN_refreshLoop();
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
Drill_EFN_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 控制器
	if( data['enable'] == undefined ){ data['enable'] = true };							//显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };							//暂停情况
	
	// > A主体
	if( data['orgPattern'] == undefined ){ data['orgPattern'] = 1 };					//初始帧
	if( data['maxPattern'] == undefined ){ data['maxPattern'] = 3 };					//帧数
	if( data['lockPattern'] == undefined ){ data['lockPattern'] = -1 };					//固定帧
	
	// > B状态规划器
	if( data['continuityEnabled'] == undefined ){ data['continuityEnabled'] = false };	//B状态规划器 - 连贯性
	
	// > C帧间隔器
	if( data['interFormula'] == undefined ){ data['interFormula'] = "" };				//C帧间隔器 - 动画帧间隔
	if( data['interDashingFormula'] == undefined ){ data['interDashingFormula'] = "" };	//C帧间隔器 - 动画帧间隔(奔跑时)
	
	// > D帧播放器
	if( data['loop_type'] == undefined ){ data['loop_type'] = "左右往返" };				//D帧播放器 - 类型
	if( data['loop_seq'] == undefined ){ data['loop_seq'] = [] };						//D帧播放器 - 自定义序列
	if( data['loop_excludeOrg'] == undefined ){ data['loop_excludeOrg'] = false };		//D帧播放器 - 排除初始帧
}
//==============================
// * 控制器 - 初始化子功能
//==============================
Drill_EFN_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	this.drill_controller_initState();			//初始化子功能 - B状态规划器
	this.drill_controller_initInter();			//初始化子功能 - C帧间隔器
	this.drill_controller_initLoop();			//初始化子功能 - D帧播放器
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_EFN_Controller.prototype.drill_controller_resetData_Private = function( data ){
	
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
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//私有数据初始化
}

//==============================
// * A主体 - 初始化子功能
//==============================
Drill_EFN_Controller.prototype.drill_controller_initAttr = function(){
	this._drill_curTime = 0;					//A主体 - 当前时间
	this._drill_curTick = 0;					//A主体 - 当前计数器值
	this._drill_compatible = false;				//A主体 - 计数器兼容值
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_EFN_Controller.prototype.drill_EFN_updateAttr = function(){
	this._drill_curTime += 1;
}

//==============================
// * B状态规划器 - 初始化子功能
//==============================
Drill_EFN_Controller.prototype.drill_controller_initState = function(){
	this.drill_EFN_refreshStateSeq();			//B状态规划器 - 重刷序列
	this._drill_EFN_lastChangeDelay = 0;		//B状态规划器 - 变化锁
	this._drill_EFN_lastState = "";				//B状态规划器 - 上一次的状态
}
//==============================
// * B状态规划器 - 帧刷新
//
//			说明：	> 用于 规划状态机，使用哪种序列来播放。类似于插件 Drill_EventActionSequenceAutomation 。
//==============================
Drill_EFN_Controller.prototype.drill_EFN_updateState = function( character ){
	var cur_state = "";
	
	// > 踏步动画
	if( character.hasStepAnime() == true ){
		cur_state = "踏步动画";
	
	// > 静止状态
	}else if( character.isStopping() ){
		cur_state = "静止状态";
	
	// > 跳跃状态
	}else if( character.isJumping() ){
		cur_state = "跳跃状态";
	
	// > 移动状态
	}else if( character.isMoving() ){
		cur_state = "移动状态";
	}
	
	
	// > 『行走图状态变化锁』
	//		（当玩家/事件持续移动时，每经过一个图块时，都会出现1帧的静止问题，变化锁用于解决此问题）
	if( this._drill_EFN_lastState == cur_state ){
		this._drill_EFN_lastChangeDelay = 3;		//（状态变化后，需要至少持续3帧）
		return;
	}
	this._drill_EFN_lastChangeDelay -= 1;
	if( this._drill_EFN_lastChangeDelay >= 0 ){ return; }
	this._drill_EFN_lastState = cur_state;
	
	
	// > 设置序列 踏步动画
	if( cur_state == "踏步动画" ){
		this.drill_EFN_setState_StepAnime( character );
	}
	
	// > 设置序列 静止状态
	if( cur_state == "静止状态" ){
		this.drill_EFN_setState_Stop( character );
	}
	
	// > 设置序列 跳跃状态
	if( cur_state == "跳跃状态" ){
		this.drill_EFN_setState_Jumping( character );
	}
	
	// > 设置序列 移动状态
	if( cur_state == "移动状态" ){
		this.drill_EFN_setState_Moving( character );
	}
}
//==============================
// * B状态规划器 - 设置序列 - 踏步动画
//==============================
Drill_EFN_Controller.prototype.drill_EFN_setState_StepAnime = function( character ){
	this._drill_loop_curSeq = this._drill_state_seqStepAnime;	//（播放永久移动动画）
	this._drill_loop_isEndStop = false;
	this._drill_curTick = 0;
}
//==============================
// * B状态规划器 - 设置序列 - 停止状态
//==============================
Drill_EFN_Controller.prototype.drill_EFN_setState_Stop = function( character ){
	var data = this._drill_data;
	if( data['continuityEnabled'] == true ){				//（连贯性）
		this._drill_loop_curSeq = this.drill_EFN_getLoopSeq_Continuity();
		this._drill_loop_isEndStop = true;
		this._drill_curTick = 0;
	}else{
		this._drill_loop_curSeq = this._drill_state_seqStop;
		this._drill_loop_isEndStop = true;
		this._drill_curTick = 0;
	}
}
//==============================
// * B状态规划器 - 设置序列 - 跳跃状态
//==============================
Drill_EFN_Controller.prototype.drill_EFN_setState_Jumping = function( character ){
	this._drill_loop_curSeq = this._drill_state_seqJump;
	this._drill_loop_isEndStop = true;
	this._drill_curTick = 0;
}
//==============================
// * B状态规划器 - 设置序列 - 移动状态
//==============================
Drill_EFN_Controller.prototype.drill_EFN_setState_Moving = function( character ){
	this._drill_loop_curSeq = this._drill_state_seqMove;
	this._drill_loop_isEndStop = false;
	this._drill_curTick = 0;
}
//==============================
// * B状态规划器 - 重刷序列
//==============================
Drill_EFN_Controller.prototype.drill_EFN_refreshStateSeq = function(){
	var data = this._drill_data;
	var orgPattern = data['orgPattern'];
	
	this._drill_state_seqStepAnime = this.drill_EFN_getLoopSeq_Moving();	//B状态规划器 - 踏步动画的序列
	this._drill_state_seqStop = [ orgPattern ];								//B状态规划器 - 停止的序列
	this._drill_state_seqMove = this.drill_EFN_getLoopSeq_Moving();			//B状态规划器 - 移动的序列
	this._drill_state_seqJump = [ orgPattern ];								//B状态规划器 - 跳跃的序列
}
	

//==============================
// * C帧间隔器 - 初始化子功能
//==============================
Drill_EFN_Controller.prototype.drill_controller_initInter = function(){
	this._drill_inter_cur = 4;					//C帧间隔器 - 当前间隔
	this._drill_inter_lastFormula = "";			//C帧间隔器 - 当前公式
	this._drill_inter_lastSpeed = 0;			//C帧间隔器 - 当前移动速度
}
//==============================
// * C帧间隔器 - 帧刷新 - 公式
//
//			说明：	> C帧间隔器 只做帧间隔的适配，确保稳定的帧间隔值，以及计数器+1。
//==============================
Drill_EFN_Controller.prototype.drill_EFN_updateInter_Formula = function( character ){
	var data = this._drill_data;
	
	// > 默认公式
	//		（1速度24帧，2速度21帧，3速度18帧，6速度9帧）
	var cur_formula = "(9 - character.realMoveSpeed()) *3";
	
	// > 设置的公式
	if( data['interFormula'] != undefined &&
		data['interFormula'] != "" ){
		cur_formula = data['interFormula'];
	}
	
	// > 设置的公式（奔跑时）
	if( character.isDashing() ){
		if( data['interDashingFormula'] != undefined &&
			data['interDashingFormula'] != "" ){
			cur_formula = data['interDashingFormula'];
		}
	}
	
	// > 公式转数字
	var cur_speed = character.realMoveSpeed();
	var speed = cur_speed;
	if( this._drill_inter_lastFormula != cur_formula ||
		this._drill_inter_lastSpeed   != cur_speed ){
		this._drill_inter_lastFormula =  cur_formula;
		this._drill_inter_lastSpeed   =  cur_speed;
		
		this._drill_inter_cur = Math.floor( Number( eval(cur_formula) ) );
		//（优化：速度如果变化，才求解一次公式，而不是每次都求解公式）
	}
}
//==============================
// * C帧间隔器 - 帧刷新 - 计数器
//==============================
Drill_EFN_Controller.prototype.drill_EFN_updateInter_Tick = function( character ){
	
	// > 计数器 加速情况
	//		（updateAnimationCount函数的效果）
	var cur_inter = this._drill_inter_cur;
	if( character.isMoving() && character.hasWalkAnime() ){
        cur_inter /= 1.5;					//（奔跑时，计数器加速执行）
    }
	cur_inter = Math.floor( cur_inter );
	cur_inter = Math.max( cur_inter, 1 );	//（帧间隔最低不能小于1）
	
	// > 计数器+1
	if( this._drill_curTime % cur_inter == 0 ){
		this._drill_curTick += 1;
	}
	
	// > 计数器兼容值（每+1时，变0，触发一次 updatePattern ）
	this._drill_compatible = false;
	if( this._drill_curTime % cur_inter == 0 ){
		this._drill_compatible = true;
	}
}

//==============================
// * D帧播放器 - 初始化子功能
//==============================
Drill_EFN_Controller.prototype.drill_controller_initLoop = function(){
	this._drill_loop_curSeq = [1];				//D帧播放器 - 当前序列
	this._drill_loop_curPattern = 0;			//D帧播放器 - 当前帧数
	this._drill_loop_isEndStop = false;			//D帧播放器 - 序列只播放一次
}
//==============================
// * D帧播放器 - 帧刷新
//
//			说明：	D帧播放器 只根据当前序列，进行帧播放。
//==============================
Drill_EFN_Controller.prototype.drill_EFN_updateLoop = function() {
	var data = this._drill_data;
	
	// > 固定帧情况
	if( data['lockPattern'] != -1 ){	
		this._drill_loop_curPattern = data['lockPattern'];
		return;
	}
	
	// > 播放序列中的当前帧
	var cur_seqIndex = this._drill_curTick % this._drill_loop_curSeq.length;
	if( this._drill_loop_isEndStop == true ){
		cur_seqIndex = this._drill_curTick;
		if( cur_seqIndex > this._drill_loop_curSeq.length-1 ){
			cur_seqIndex = this._drill_loop_curSeq.length-1;
		}
	}
	var cur_index = this._drill_loop_curSeq[ cur_seqIndex ];
	this._drill_loop_curPattern = cur_index;
	
	// > 校验值
	if( isNaN( cur_index ) ){
		alert( DrillUp.drill_EFN_getPluginTip_ParamIsNaN( "cur_index" ) );
	}
}
//==============================
// * D帧播放器 - 获取序列 - 移动状态
//==============================
Drill_EFN_Controller.prototype.drill_EFN_getLoopSeq_Moving = function(){
	var data = this._drill_data;
	var cur_seq = [];
	
	// > 循环播放 - 从左往右
	if( data['loop_type'] == "从左往右循环" || data['loop_type'] == "从左至右循环" ){
		var cur_index = data['orgPattern'];
		for( var i=0; i < data['maxPattern']; i++ ){
			cur_seq.push( cur_index );
			cur_index += 1;
			if( cur_index >= data['maxPattern'] ){ cur_index = 0; }
		}
	}
	
	// > 循环播放 - 从右往左
	if( data['loop_type'] == "从右往左循环" || data['loop_type'] == "从右至左循环" ){
		var cur_index = data['orgPattern'];
		for( var i=0; i < data['maxPattern']; i++ ){
			cur_seq.push( cur_index );
			cur_index -= 1;
			if( cur_index < 0 ){ cur_index = data['maxPattern']-1; }
		}
	}
	
	// > 循环播放 - 左右往返
	if( data['loop_type'] == "左右往返" ){
		var cur_index = data['orgPattern'];
		var cur_dir = false;
		var len = data['maxPattern']*2-2;
		for( var i=0; i < len; i++ ){
			cur_seq.push( cur_index );
			if( cur_dir == true ){		//dir记录当前循环方向
				cur_index -= 1;
				if( cur_index < 0 ){
					cur_index = 1;
					cur_dir = false;
				};
			}else{
				cur_index += 1;
				if( cur_index >= data['maxPattern'] ){
					cur_index = data['maxPattern']-2;
					cur_dir = true;
				};
			}
		}
	}
	
	// > 循环播放 - 自定义序列
	if( data['loop_type'] == "自定义序列" ){
		cur_seq = data['loop_seq'];
	}
	
	// > 排除初始帧
	if( data['loop_excludeOrg'] == true ){
		for( var i = cur_seq.length-1; i >= 0; i-- ){
			if( cur_seq[i] == data['orgPattern'] ){
				cur_seq.splice(i,1);
			}
		}
	}
	
	return cur_seq;
}
//==============================
// * D帧播放器 - 获取序列 - 停止状态的连贯性
//
//			说明：	> 这里不要去考虑自定义序列的情况。
//					> 因为你没法控制 1,2,3,4,5,4,3,2,1 这种数组的帧连贯恢复问题。
//==============================
Drill_EFN_Controller.prototype.drill_EFN_getLoopSeq_Continuity = function(){
	var data = this._drill_data;
	
	// > 小于3帧则直接变化
	if( data['maxPattern'] <= 3 ){ return this._drill_state_seqStop; }
	
	// > 获取初始帧的位置
	var len = data['maxPattern'];
	var cur_index = this._drill_loop_curSeq[ Math.floor(this._drill_curTick%len) ];
	var tar_index = data['orgPattern'];
	
	// > 根据位置生成 序列索引
	var cur_seq = [];
	var temp_index = cur_index;
	var seqi_len = Math.abs(cur_index-tar_index);
	if( cur_index - tar_index >= 0 ){
		if( Math.abs(cur_index-tar_index) > len*0.5 ){
			seqi_len = len - seqi_len;
			for( var i=0; i < seqi_len; i++ ){
				cur_seq.push( temp_index );
				temp_index += 1;
				if( temp_index >= len ){ temp_index = 0; }
			}
		}else{
			for( var i=0; i < seqi_len; i++ ){
				cur_seq.push( temp_index );
				temp_index -= 1;
				if( temp_index < 0 ){ temp_index = len-1; }
			}
		}
	}else{
		if( Math.abs(cur_index-tar_index) > len*0.5 ){
			seqi_len = len - seqi_len;
			for( var i=0; i < seqi_len; i++ ){
				cur_seq.push( temp_index );
				temp_index -= 1;
				if( temp_index < 0 ){ temp_index = len-1; }
			}
		}else{
			for( var i=0; i < seqi_len; i++ ){
				cur_seq.push( temp_index );
				temp_index += 1;
				if( temp_index >= len ){ temp_index = 0; }
			}
		}
	}
	
	// > 在尾部强制再加上 初始帧
	cur_seq.push( data['orgPattern'] );
	
	//alert( 
	//	"当前位置："+cur_index+"，目标位置："+tar_index+"，长度["+len+"]\n"+
	//	"生成的路径："+cur_seq.join(",")
	//);
	
	return cur_seq;
}



//=============================================================================
// ** ☆控制器绑定
//
//			说明：	> 控制器的绑定设置，绑定于 物体基类 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 控制器绑定 - 初始化
//==============================
var _drill_EFN_c_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_drill_EFN_c_initMembers.call(this);
	this._drill_EFN_controller = undefined;
};
//==============================
// * 控制器绑定 - 初始化检查
//
//			说明：	> 这里的数据都要用到时才初始化。『节约事件数据存储空间』
//==============================
Game_CharacterBase.prototype.drill_EFN_checkController = function(){
	if( this._drill_EFN_controller != undefined ){ return; }
	this._drill_EFN_controller = new Drill_EFN_Controller( DrillUp.g_EFN_controllerData );
};
//==============================
// * 控制器绑定 - 是否启用多帧控制
//==============================
Game_CharacterBase.prototype.drill_EFN_isEnabled = function(){
	if( this._drill_EFN_controller == undefined ){ return false; }
	return this._drill_EFN_controller.drill_EFN_isEnable();
};
//==============================
// * 控制器绑定 - 数据
//==============================
DrillUp.g_EFN_controllerData = {
	
	// > 动画帧
	'enable':true,		//（初始化时，立即启用）
	'pause':false,
	
	// > A主体
	'orgPattern':this._originalPattern,
	'maxPattern':3,
	'lockPattern':-1,
	
	// > B状态规划器
	'continuityEnabled':DrillUp.g_EFN_continuityEnabled,
	
	// > C帧间隔器
	//	（不设置）
	
	// > D帧播放器
	//	（不设置）
};
//==============================
// * 控制器绑定 - 帧刷新（半覆写）
//==============================
var _drill_EFN_c_updateAnimation = Game_CharacterBase.prototype.updateAnimation;
Game_CharacterBase.prototype.updateAnimation = function() {
	
	if( this.drill_EFN_isEnabled() == true ){
		
		// > 控制器 帧刷新
		this._drill_EFN_controller.drill_EFN_update( this );
	
		// > 控制器 赋值
		this._originalPattern = this._drill_EFN_controller.drill_EFN_orgPattern();
		this._animationCount = this._drill_EFN_controller.drill_EFN_animationCount();
		this._pattern = this._drill_EFN_controller.drill_EFN_pattern();
		
		// > 执行原函数
		this.updateAnimationCount();
		if( this._drill_EFN_controller._drill_compatible == true ){
			this.updatePattern();
		}
		
		return;
	}
	
	// > 原函数
	_drill_EFN_c_updateAnimation.call(this);
};
//==============================
// * 控制器绑定 - 帧刷新计数器（半覆写）
//==============================
var _drill_EFN_c_updateAnimationCount = Game_CharacterBase.prototype.updateAnimationCount;
Game_CharacterBase.prototype.updateAnimationCount = function() {
	if( this.drill_EFN_isEnabled() == true ){ return };		//（过滤原函数）
	_drill_EFN_c_updateAnimationCount.call(this);
};
//==============================
// * 控制器绑定 - 推进（非帧）（半覆写）
//==============================
var _drill_EFN_c_updatePattern = Game_CharacterBase.prototype.updatePattern;
Game_CharacterBase.prototype.updatePattern = function() {
	if( this.drill_EFN_isEnabled() == true ){ return };		//（过滤原函数）
	_drill_EFN_c_updatePattern.call(this);
};


//=============================================================================
// ** ☆控制器的动画帧
//
//			说明：	> 物体基类中所有相关 动画帧 函数，都使用控制器给出的数据。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 控制器 - 动画帧 - 设置当前帧
//==============================
var _drill_EFN_c_setPattern = Game_CharacterBase.prototype.setPattern;
Game_CharacterBase.prototype.setPattern = function( pattern ){
	if( this.drill_EFN_isEnabled() == true ){
		this._drill_EFN_controller.drill_EFN_setPattern( pattern );
		return;
	}
    _drill_EFN_c_setPattern.call( this, pattern );
};
//==============================
// * 控制器 - 动画帧 - 间隔（半覆写）
//==============================
var _drill_EFN_c_animationWait = Game_CharacterBase.prototype.animationWait;
Game_CharacterBase.prototype.animationWait = function() {
	if( this.drill_EFN_isEnabled() == true ){ return this._drill_EFN_controller.drill_EFN_animationWait(); }
	return _drill_EFN_c_animationWait.call(this);
};
//==============================
// * 控制器 - 动画帧 - 最大帧数（半覆写）
//==============================
var _drill_EFN_c_maxPattern = Game_CharacterBase.prototype.maxPattern;
Game_CharacterBase.prototype.maxPattern = function() {
	if( this.drill_EFN_isEnabled() == true ){ return this._drill_EFN_controller.drill_EFN_maxPattern(); }
	return _drill_EFN_c_maxPattern.call(this);
};
//==============================
// * 控制器 - 动画帧 - 当前帧数（半覆写）
//==============================
var _drill_EFN_c_pattern = Game_CharacterBase.prototype.pattern;
Game_CharacterBase.prototype.pattern = function() {
	if( this.drill_EFN_isEnabled() == true ){ return this._drill_EFN_controller.drill_EFN_pattern(); }
	return _drill_EFN_c_pattern.call(this);
};
//==============================
// * 控制器 - 行走图贴图 - 宽度
//==============================
var _drill_EFN_COEF_s_patternWidth = Sprite_Character.prototype.drill_COEF_updateValue_PatternWidth;
Sprite_Character.prototype.drill_COEF_updateValue_PatternWidth = function() {
	_drill_EFN_COEF_s_patternWidth.call(this);
	if( this.bitmap == undefined ){ return; }
	if( this._character == undefined ){ return };
	if( this._character._drill_EFN_controller == undefined ){ return };
	
	// > 只对单行走图有效
    if( this._isBigCharacter ){
		var mm = this._character._drill_EFN_controller.drill_EFN_maxPattern();
		this._drill_COEF_PatternWidth = this.bitmap.width / mm;
    }
};
//==============================
// * 控制器 - 行走图贴图 - 高度
//==============================
/*		高度与朝向相关，不影响		*/



//=============================================================================
// ** ☆随机初始帧
//
//			说明：	> 在事件中设置随机初始帧，注意，不影响朝向。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 随机初始帧 - 初始化
//==============================
var _drill_EFN_event_setupPage_random = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	this.drill_EFN_setupRandom();
	_drill_EFN_event_setupPage_random.call(this);
};
//==============================
// * 随机初始帧 - 事件注释
//==============================
Game_Event.prototype.drill_EFN_setupRandom = function() {
    if( this._pageIndex < 0 ){ return; }
    if( this._erased != false ){ return; }
	var page = this.page();
    if( page == undefined ){ return; }
	
	var li = this.list();
	for(var k=0; k < li.length; k++){
		var l = li[k];
		if( l.code !== 108 ){ continue; }
		var args = l.parameters[0].split(' ');
		var command = args.shift();
		if( command == "=>多帧行走图" ){
			if( args.length == 2 ){			//=>多帧行走图 : 当前事件页随机帧数
				var type = String(args[1]);
				if( type == "随机初始帧" ){
					if( page.image.tileId > 0 ){
						//（图块贴图情况，不操作）
					}else{
						
						// > 当前帧设置
						page.image.pattern = Math.randomInt(3);
					}
				}
				if( type == "随机初始帧(固定随机种子)" ){
					if( page.image.tileId > 0 ){
						//（图块贴图情况，不操作）
					}else{
						
						// > 随机种子
						var seed = this._mapId * this._eventId * (this._pageIndex+1) + this._eventId * this._eventId - this._pageIndex +31;
						var random_num = this.drill_EFN_Math1D_getRandomInSeed( seed );
						
						// > 当前帧设置
						page.image.pattern = Math.floor(random_num*3);
					}
				}
			}
			if( args.length == 4 ){
				var type = String(args[1]);
				var temp1 = String(args[3]);
				if( type == "随机初始帧" ){
					temp1 = temp1.replace("指定随机帧[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( page.image.tileId > 0 ){
						//（图块贴图情况，不操作）
					}else{
						
						// > 当前帧设置
						var ran = Math.randomInt(temp1.length);
						page.image.pattern = Number( temp1[ran] );
					}
				}
				if( type == "随机初始帧(固定随机种子)" ){
					temp1 = temp1.replace("指定随机帧[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					if( page.image.tileId > 0 ){
						//（图块贴图情况，不操作）
					}else{
						
						// > 随机种子（与 地图id、事件id、事件页id 相关）
						var seed = this._mapId * this._eventId * (this._pageIndex+1) + this._eventId * this._eventId - this._pageIndex +31;
						var random_num = this.drill_EFN_Math1D_getRandomInSeed( seed );
						
						// > 当前帧设置
						var ran = Math.floor(random_num * temp1.length);
						page.image.pattern = Number( temp1[ran] );
					}
				}
			}
		};
	}
};
//==============================
// * 数学工具 - 生成随机数（随机种子）
//			
//			参数：	> seed 数字	（正整数）
//			返回：	> 数字 		（0~1随机数）
//			
//			说明：	> 如果随机种子为 1至100，那么你将得到线性均匀分布的随机值。不是乱序随机。
//==============================
Game_Event.prototype.drill_EFN_Math1D_getRandomInSeed = function( seed ){
	var new_ran = ( seed * 9301 + 49297 ) % 233280;
	new_ran = new_ran / 233280.0;
	return new_ran;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventFrameNumber = false;
		var pluginTip = DrillUp.drill_EFN_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

