//=============================================================================
// Drill_EnemyFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        单位 - 滤镜效果
 * @author Drill_up
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_EnemyFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以给战斗中的敌人的添加出场滤镜效果，或者通过插件指令调整滤镜。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFilter       系统-滤镜核心
 *     需要该核心才能启用滤镜效果。
 * 可被扩展：
 *   - Drill_X_BattleHudFilter  战斗UI-角色窗口的滤镜效果[扩展]
 *     该插件的滤镜效果，可以对战斗窗口的头像也起效。
 *   - Drill_X_GaugeBossFilter  UI-高级BOSS框的滤镜效果[扩展]
 *     该插件的滤镜效果，可以对BOSS框的头像也起效。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   角色、敌人都可以添加滤镜效果。
 * 2.想要了解更多滤镜效果，去看看 "1.系统 > 大家族-滤镜效果.docx"。
 * 细节：
 *   (1.战斗中有四个名词： 角色、敌人、我方、敌方。
 *      角色/敌人，是指数据库里配置的数据信息。
 *      我方/敌方，是指战斗时，双方所站立的位置。
 *      比如，角色[1] 表示角色ID为1的数据。
 *      比如，敌方[1] 表示战斗时，第1个位置的敌人。
 * 滤镜：
 *   (1.纯色滤镜、着色滤镜……等 相互独立，且效果可以相互叠加。
 *      添加滤镜的先后顺序不同，能产生不同的叠加效果。
 *   (2.波动纯色滤镜 与 纯色滤镜 是同一个滤镜，只是变化方式不同。
 *      二者指令会相互覆盖。
 *   (3.使用滤镜时，最好先设置0（给一个关闭滤镜过程），再切换。
 *      这样可避免瞬间切换的不自然。
 * 设计：
 *   (1.你可以给部分敌人加上默认的 红、绿、蓝 纯色滤镜的注释，
 *      用来表示敌人的等级强度。
 *      单位滤镜效果在 数据库 > 敌群 中有示例说明。可以去看看。
 * 旧版本：
 *   (1. v1.1版本之前的指令都写的是"敌人滤镜"，
 *      这里写"敌人滤镜"或"单位滤镜"都有效。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令设置滤镜：
 * （注意，冒号左右两边有空格）
 * 
 * 插件指令：>单位滤镜 : 敌方 : 1 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>单位滤镜 : 敌方 : 全体 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>单位滤镜 : 我方 : 1 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>单位滤镜 : 我方 : 全体 : 纯色滤镜 : 纯黑 : 155 : 60
 *
 * 插件指令：>单位滤镜 : 敌方 : 1 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 纯色滤镜 : 纯蓝 : 155 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 纯色滤镜 : 纯绿 : 155 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 纯色滤镜 : 纯红 : 155 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 纯色滤镜 : 黄色 : 155 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 纯色滤镜 : 紫色 : 155 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 纯色滤镜 : 青色 : 155 : 60
 * 
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 黑白 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 反色 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 鲜艳 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 漂白 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 饱和度降低 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 古墨水画色 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 古铜色 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 宝丽来相机色 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 红绿蓝翻转 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 夜色 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 着色滤镜 : 致幻色 : 255 : 60
 * 
 * 插件指令：>单位滤镜 : 敌方 : 1 : 填充滤镜 : 纯黑 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 填充滤镜 : 纯蓝 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 填充滤镜 : 纯绿 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 填充滤镜 : 纯红 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 填充滤镜 : 黄色 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 填充滤镜 : 紫色 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 填充滤镜 : 青色 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 填充滤镜 : 纯白 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 填充滤镜 : #dd99ff : 255 : 60
 * 
 * 插件指令：>单位滤镜 : 敌方 : 1 : 模糊滤镜 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 噪点滤镜 : 155 : 60
 * 
 * 1.前两个参数，表示：敌方/我方，第几个/全体。
 *   比如，我方 1，表示第一个角色。
 * 2.滤镜后面的两个参数表示：目标程度，变化时长。
 * 3.目标程度范围为0-255。255的程度最强烈。
 *   比如，纯蓝滤镜的255表示敌人图像完全过滤为蓝色。
 * 4.填充滤镜的"#dd99ff"为自定义颜色代码，你可以填入自定义颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 敌人注释
 * 你还可以直接指定滤镜的颜色：
 * （注意，冒号左右两边都没有空格）
 * 
 * 敌人注释：<单位滤镜:纯色滤镜:纯蓝:55>
 * 敌人注释：<单位滤镜:着色滤镜:黑白:255>
 * 敌人注释：<单位滤镜:填充滤镜:紫色:255>
 * 敌人注释：<单位滤镜:模糊滤镜:55>
 * 敌人注释：<单位滤镜:噪点滤镜:55>
 * 
 * 敌人注释：<单位滤镜:纯色滤镜:纯蓝:55:出场后变化:122:60>
 * 敌人注释：<单位滤镜:着色滤镜:黑白:255:出场后变化:122:60>
 * 敌人注释：<单位滤镜:填充滤镜:紫色:255:出场后变化:122:60>
 * 敌人注释：<单位滤镜:模糊滤镜:255:出场后变化:0:120>
 * 敌人注释：<单位滤镜:噪点滤镜:255:出场后变化:0:120>
 *
 * 1.四种注释的滤镜可以在初始化的时候叠加。
 * 2.你可以设置初始出场后开始变化滤镜，后面两个参数表示：
 *     目标程度，变化时长。
 *   （相当于你刚进入战斗界面就执行的插件指令。）
 * 3.填充滤镜设置中，你可以填自定义颜色的颜色代码。
 * 
 * -----------------------------------------------------------------------------
 * ----高级设置 - 波动滤镜
 * 上述所有滤镜，都是线性滤镜，即变色后，一直保持状态。
 * 而波动滤镜的程度是依据正弦公式变化，时隐时现。
 * 
 * 插件指令：>单位滤镜 : 敌方 : 1 : 波动纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 波动着色滤镜 : 鲜艳 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 波动填充滤镜 : 紫色 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 波动模糊滤镜 : 255 : 60
 * 插件指令：>单位滤镜 : 敌方 : 1 : 波动噪点滤镜 : 155 : 60
 *
 * 敌人注释：<单位滤镜:波动纯色滤镜:纯蓝:55:60>
 * 敌人注释：<单位滤镜:波动着色滤镜:黑白:255:60>
 * 敌人注释：<单位滤镜:波动填充滤镜:紫色:255:60>
 * 敌人注释：<单位滤镜:波动模糊滤镜:55:60>
 * 敌人注释：<单位滤镜:波动噪点滤镜:55:60>
 * 
 * 1.只要在滤镜类型前加"波动"二字即可。
 *   注意，后面两个参数表示为：程度0-255、周期（波动一次所需时间，单位帧） 
 * 2.波动滤镜为瞬间变化，所以不存在"出场后变化"注释指令。
 * 3.波动填充滤镜设置中，你可以填自定义颜色的颜色代码。
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
 * 测试方法：   设置不同数量的敌人单位在战斗界面中，检测性能。
 * 测试结果：   没有任何含滤镜标签的事件，平均消耗为：【6.85ms】
 *              8个敌人，平均消耗为：【104.06ms】
 *              4个敌人，平均消耗为：【91.31ms】
 *              1个敌人，平均消耗为：【68.42ms】
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
 * 优化了插件指令。原插件指令也可以用。
 * [v1.3]
 * 分离了滤镜核心，大幅度优化了底层结构。
 * 添加了填充滤镜功能，降低了模糊滤镜的性能消耗。
 * [v1.4]
 * 优化了该插件与其他作者插件的部分兼容性。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFi（Enemy_Filter）
//		临时全局变量	无
//		临时局部变量	this._drill_EFi
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)*o(滤镜) 每帧
//		★性能测试因素	战斗示例中的7个小爱丽丝
//		★性能测试消耗	23.10ms（本体） 144.06ms（update总量减去标准的350ms）
//						6.85ms（没有含滤镜的单位时）
//		★最坏情况		所有敌人都加了滤镜效果。（会卡成7帧）
//		★备注			滤镜几乎没有for，都是写在update中。
//						贴图变化对于性能的消耗还是比较大的。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			单位滤镜效果：
//				->敌人注释初始化
//				->战斗角色头像
//				->（滤镜核）优化，滤镜/滤镜板用到的时候才new
//
//		★必要注意事项：
//			1.操作数据在【Game_Battler】中，但是数据变化，是在【Sprite_Battler】的帧刷新中。
//			  Game_Battler不能直接控制sprite，所以只能让sprite自己找到数据，然后关闭锁。
//
//		★其它说明细节：
//			1.分离了核心之后，大部分锁的操作都不需要再该插件中设置。
//			  这里只作为一个参数转换中介，数据转换后给核心执行。
//				
//		★存在的问题：
//			1.根据敌人获取到敌人贴图，这是问题简单，但解决方法复杂的大问题。
//			  还有 根据玩家获取到玩家头像、玩家前视图。
//			  因为 贴图和物体 是 多对一，只能从多的一方着手。
//			  本质是物体控制数据，贴图直接变化即可，而滤镜直接破坏了规则，控制数据和变化数据直接交织。
//			  导致了物体传数据给贴图成了麻烦。
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EnemyFilter = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EnemyFilter');

	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFilter ){
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_EFi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EFi_pluginCommand.call(this, command, args);
	if( command === '>单位滤镜' || command === '>敌人滤镜' ){ // >单位滤镜 : 敌方 : 1 : 纯色滤镜 : 纯蓝 : 155 : 60
		if(args.length >= 10){
			var target_group = String(args[1]);
			var target = String(args[3]);
			var type = String(args[5]);
			var temp1 = String(args[7]);
			var temp2 = String(args[9]);
			if( args[11]!=undefined ){ var temp3 = String(args[11]); }
			
			if( target_group === '敌方' ){
				if( target === '全体' ){
					this.iterateEnemyIndex(-1,function(enemy) {
						if( enemy.isAlive() ){
							if( type == "纯色滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "着色滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "填充滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "模糊滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setBlurLinear = [ Number(temp1),Number(temp2) ];
							}
							if( type == "噪点滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setNoiseLinear = [ Number(temp1),Number(temp2) ];
							}
							if( type == "波动纯色滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "波动着色滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "波动填充滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "波动模糊滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setBlurWave = [ Number(temp1),Number(temp2) ];
							}
							if( type == "波动噪点滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setNoiseWave = [ Number(temp1),Number(temp2) ];
							}
						}
					}.bind(this));
				}else{
					this.iterateEnemyIndex( Number(target) -1, function (enemy) {
						if( enemy.isAlive() ){
							if( type == "纯色滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "着色滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "填充滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "模糊滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setBlurLinear = [ Number(temp1),Number(temp2) ];
							}
							if( type == "噪点滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setNoiseLinear = [ Number(temp1),Number(temp2) ];
							}
							if( type == "波动纯色滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "波动着色滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "波动填充滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "波动模糊滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setBlurWave = [ Number(temp1),Number(temp2) ];
							}
							if( type == "波动噪点滤镜" ){
								enemy._drill_EFi.openFilter = true;
								enemy._drill_EFi.setNoiseWave = [ Number(temp1),Number(temp2) ];
							}
						}
					}.bind(this));
				}
			}
			if( target_group === '我方' ){
				if( target === '全体' ){
					this.iterateActorId(0,function(actor) {
						if( actor.isAlive() ){
							if( actor._drill_EFi == undefined ){ actor.drill_EFi_initFilter(); }	//（强制初始化）
							
							if( type == "纯色滤镜" ){
								actor._drill_EFi.openFilter = true;
								actor._drill_EFi.setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "着色滤镜" ){
								actor._drill_EFi.openFilter = true;
								actor._drill_EFi.setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "填充滤镜" ){
								actor._drill_EFi.openFilter = true;
								actor._drill_EFi.setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "模糊滤镜" ){
								actor._drill_EFi.openFilter = true;
								actor._drill_EFi.setBlurLinear = [ Number(temp1),Number(temp2) ];
							}
							if( type == "噪点滤镜" ){
								actor._drill_EFi.openFilter = true;
								actor._drill_EFi.setNoiseLinear = [ Number(temp1),Number(temp2) ];
							}
							if( type == "波动纯色滤镜" ){
								actor._drill_EFi.openFilter = true;
								actor._drill_EFi.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "波动着色滤镜" ){
								actor._drill_EFi.openFilter = true;
								actor._drill_EFi.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "波动填充滤镜" ){
								actor._drill_EFi.openFilter = true;
								actor._drill_EFi.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
							}
							if( type == "波动模糊滤镜" ){
								actor._drill_EFi.openFilter = true;
								actor._drill_EFi.setBlurWave = [ Number(temp1),Number(temp2) ];
							}
							if( type == "波动噪点滤镜" ){
								actor._drill_EFi.openFilter = true;
								actor._drill_EFi.setNoiseWave = [ Number(temp1),Number(temp2) ];
							}
						}
					}.bind(this));
				}else{
					var actor = $gameParty.members()[Number(target) -1];
					if( actor.isAlive() ){
						if( actor._drill_EFi == undefined ){ actor.drill_EFi_initFilter(); }	//（强制初始化）
							
						if( type == "纯色滤镜" ){
							actor._drill_EFi.openFilter = true;
							actor._drill_EFi.setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
						}
						if( type == "着色滤镜" ){
							actor._drill_EFi.openFilter = true;
							actor._drill_EFi.setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
						}
						if( type == "填充滤镜" ){
							actor._drill_EFi.openFilter = true;
							actor._drill_EFi.setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
						}
						if( type == "模糊滤镜" ){
							actor._drill_EFi.openFilter = true;
							actor._drill_EFi.setBlurLinear = [ Number(temp1),Number(temp2) ];
						}
						if( type == "噪点滤镜" ){
							actor._drill_EFi.openFilter = true;
							actor._drill_EFi.setNoiseLinear = [ Number(temp1),Number(temp2) ];
						}
						if( type == "波动纯色滤镜" ){
							actor._drill_EFi.openFilter = true;
							actor._drill_EFi.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
						}
						if( type == "波动着色滤镜" ){
							actor._drill_EFi.openFilter = true;
							actor._drill_EFi.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
						}
						if( type == "波动填充滤镜" ){
							actor._drill_EFi.openFilter = true;
							actor._drill_EFi.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
						}
						if( type == "波动模糊滤镜" ){
							actor._drill_EFi.openFilter = true;
							actor._drill_EFi.setBlurWave = [ Number(temp1),Number(temp2) ];
						}
						if( type == "波动噪点滤镜" ){
							actor._drill_EFi.openFilter = true;
							actor._drill_EFi.setNoiseWave = [ Number(temp1),Number(temp2) ];
						}
					}
				}
			}
		}
	}
};

//=============================================================================
// ** 敌人注释初始化
//=============================================================================	
var _drill_EFi_b_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_drill_EFi_b_setup.call(this,enemyId, x, y);
	
	var note = String(this.enemy().note);
	var note_list = note.split('\n');
	for(var i=0; i< note_list.length; i++){
		var re_filter = /<(单位滤镜|敌人滤镜):([^<>]*?)>/; 				//正则获取（返回数组，第二个为匹配内容）
		var commands = (note_list[i].match(re_filter)) || [];
		if( commands != "" && commands != [] ){
			var args = commands[2].split(':');
			if( args.length >= 2 && args.length <= 4 ){
				var type = String(args[0]);
				var temp1 = String(args[1]);
				if( args[2]!=undefined ){ var temp2 = Number(args[2]); };
				if( args[3]!=undefined ){ var temp3 = Number(args[3]); };
				if( type == "纯色滤镜" ){	//<单位滤镜:纯色滤镜:纯蓝:55>
					this._drill_EFi.openFilter = true;
					this._drill_EFi.pureInit = ["linear",String(temp1),temp2];
				}
				if( type == "着色滤镜" ){
					this._drill_EFi.openFilter = true;
					this._drill_EFi.colorInit = ["linear",String(temp1),temp2];
				}
				if( type == "填充滤镜" ){
					this._drill_EFi.openFilter = true;
					this._drill_EFi.fillInit = ["linear",String(temp1),temp2];
				}
				if( type == "模糊滤镜" ){	//<单位滤镜:噪点滤镜:55>
					this._drill_EFi.openFilter = true;
					this._drill_EFi.blurInit = ["linear",Number(temp1)];
				}
				if( type == "噪点滤镜" ){
					this._drill_EFi.openFilter = true;
					this._drill_EFi.noiseInit = ["linear",Number(temp1)];
				}
				if( type == "波动纯色滤镜" ){	//<单位滤镜:波动纯色滤镜:纯蓝:55:60>
					this._drill_EFi.openFilter = true;
					this._drill_EFi.pureInit = ["wave",String(temp1),temp2,temp3];
				}
				if( type == "波动着色滤镜" ){
					this._drill_EFi.openFilter = true;
					this._drill_EFi.colorInit = ["wave",String(temp1),temp2,temp3];
				}
				if( type == "波动填充滤镜" ){
					this._drill_EFi.openFilter = true;
					this._drill_EFi.fillInit = ["wave",String(temp1),temp2,temp3];
				}
				if( type == "波动模糊滤镜" ){	//<单位滤镜:波动噪点滤镜:55:60>
					this._drill_EFi.openFilter = true;
					this._drill_EFi.blurInit = ["wave",Number(temp1),Number(temp2)];
				}
				if( type == "波动噪点滤镜" ){
					this._drill_EFi.openFilter = true;
					this._drill_EFi.noiseInit = ["wave",Number(temp1),Number(temp2)];
				}
			}
			if(args.length == 6){	//<单位滤镜:纯色滤镜:纯蓝:55:出场后变化:122:60>
				var type = String(args[0]);
				var temp1 = String(args[1]);
				var temp2 = Number(args[2]);
				var method = String(args[3]);
				var temp4 = Number(args[4]);
				var temp5 = Number(args[5]);
				if( method == "出场后变化" ){
					if( type == "纯色滤镜" ){
						this._drill_EFi.openFilter = true;
						this._drill_EFi.pureInit = ["linear",temp1,temp2];
						this._drill_EFi.setPureLinear = [temp1,temp4,Math.max(temp5,1)];
					}
					if( type == "着色滤镜" ){
						this._drill_EFi.openFilter = true;
						this._drill_EFi.colorInit = ["linear",temp1,temp2];
						this._drill_EFi.setColorLinear = [temp1,temp4,Math.max(temp5,1)];
					}
					if( type == "填充滤镜" ){
						this._drill_EFi.openFilter = true;
						this._drill_EFi.fillInit = ["linear",temp1,temp2];
						this._drill_EFi.setFillLinear = [temp1,temp4,Math.max(temp5,1)];
					}
				}
			}
			if(args.length == 5){	//<单位滤镜:模糊滤镜:255:出场后变化:0:120>
				var type = String(args[0]);
				var temp1 = Number(args[1]);
				var method = String(args[2]);
				var temp3 = Number(args[3]);
				var temp4 = Number(args[4]);
				if( method == "出场后变化" ){
					if( type == "模糊滤镜" ){
						this._drill_EFi.openFilter = true;
						this._drill_EFi.blurInit = ["linear",temp1];
						this._drill_EFi.setBlurLinear = [temp3,Math.max(temp4,1)];
					}
					if( type == "噪点滤镜" ){
						this._drill_EFi.openFilter = true;
						this._drill_EFi.noiseInit = ["linear",temp1];
						this._drill_EFi.setNoiseLinear = [temp3,Math.max(temp4,1)];
					}
				}
			}
		}
	}
};

//=============================================================================
// ** 敌人/角色
//=============================================================================
//==============================
// * 敌人/角色 初始化
//==============================
var _drill_EFi_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_drill_EFi_initMembers.call(this);
	this.drill_EFi_initFilter();
};
Game_Battler.prototype.drill_EFi_initFilter = function() {
	this._drill_EFi = {};
	this._drill_EFi.openFilter = false;
	
	this._drill_EFi.pureInit = ["linear","",0,0];	//初始化数组
	this._drill_EFi.colorInit = ["linear","",0,0];
	this._drill_EFi.fillInit = ["linear","",0,0];
	this._drill_EFi.blurInit = ["linear",0,0];
	this._drill_EFi.noiseInit = ["linear",0,0];
	
	this._drill_EFi.setPureLinear = ["",0,0];		//临时赋值用的数组
	this._drill_EFi.setColorLinear = ["",0,0];
	this._drill_EFi.setFillLinear = ["",0,0];
	this._drill_EFi.setBlurLinear = [0,0];
	this._drill_EFi.setNoiseLinear = [0,0];
	this._drill_EFi.setPureWave = ["",0,0];
	this._drill_EFi.setColorWave = ["",0,0];
	this._drill_EFi.setFillWave = ["",0,0];
	this._drill_EFi.setBlurWave = [0,0];
	this._drill_EFi.setNoiseWave = [0,0];
};

//=============================================================================
// ** 敌人 贴图
//=============================================================================
//==============================
// * 敌人贴图 帧刷新
//==============================
var _drill_EFi_e_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
	_drill_EFi_e_update.call(this);
	this.drill_EFi_updateEnemyFilter();
}
Sprite_Enemy.prototype.drill_EFi_updateEnemyFilter = function() {
	if( !this._battler ){ return; }
	if( !this._battler._drill_EFi ){ return; }
	if( !this._battler._drill_EFi.openFilter ){ return; }
	var battler = this._battler;
	var battler_sprite = this;
	var data;
	
	//>初始化
	if( battler_sprite.drill_COF_isInited() == false ){
		battler_sprite.drill_COF_initialize();
		data = battler._drill_EFi.pureInit;
		if( data[0] == "linear" ){
			battler_sprite.drill_COF_setPureLinear_Init(data[1],data[2]);
		}else if( data[0] == "wave" ){
			battler_sprite.drill_COF_setPureWave_Init(data[1],data[2],data[3]);
		}
		data = battler._drill_EFi.colorInit;
		if( data[0] == "linear" ){
			battler_sprite.drill_COF_setColorLinear_Init(data[1],data[2]);
		}else if( data[0] == "wave" ){
			battler_sprite.drill_COF_setColorWave_Init(data[1],data[2],data[3]);
		}
		data = battler._drill_EFi.fillInit;
		if( data[0] == "linear" ){
			battler_sprite.drill_COF_setFillLinear_Init(data[1],data[2]);
		}else if( data[0] == "wave" ){
			battler_sprite.drill_COF_setFillWave_Init(data[1],data[2],data[3]);
		}
		data = battler._drill_EFi.blurInit;
		if( data[0] == "linear" ){
			battler_sprite.drill_COF_setBlurLinear_Init(data[1]);
		}else if( data[0] == "wave" ){
			battler_sprite.drill_COF_setBlurWave_Init(data[1],data[2]);
		}
		data = battler._drill_EFi.noiseInit;
		if( data[0] == "linear" ){
			battler_sprite.drill_COF_setNoiseLinear_Init(data[1]);
		}else if( data[0] == "wave" ){
			battler_sprite.drill_COF_setNoiseWave_Init(data[1],data[2]);
		}
	}
	
	//>插件指令配置 - 线性
	data = battler._drill_EFi.setPureLinear;	
	battler_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
	data = battler._drill_EFi.setColorLinear;
	battler_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
	data = battler._drill_EFi.setFillLinear;
	battler_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
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
	battler_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
	data = battler._drill_EFi.setBlurWave;
	battler_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
	data = battler._drill_EFi.setNoiseWave;
	battler_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
	
	
}

//=============================================================================
// ** 角色 贴图
//=============================================================================
//==============================
// * 角色贴图 帧刷新
//==============================
var _drill_EFi_a_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
	_drill_EFi_a_update.call(this);
	this.drill_EFi_updateActorFilter();
}
Sprite_Actor.prototype.drill_EFi_updateActorFilter = function() {
	if( !this._battler ){ return; }
	if( !this._battler._drill_EFi ){ return; }
	if( !this._battler._drill_EFi.openFilter ){ return; }
	if( !this._mainSprite ){ return; }
	var battler = this._battler;
	var battler_sprite = this._mainSprite;
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
	battler_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
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
	battler_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
	data = battler._drill_EFi.setBlurWave;
	battler_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
	data = battler._drill_EFi.setNoiseWave;
	battler_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
	
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EnemyFilter = false;
		alert(
			"【Drill_EnemyFilter.js 单位 - 滤镜效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFilter 系统-滤镜核心"
		);
}
