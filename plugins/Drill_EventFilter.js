//=============================================================================
// Drill_EventFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        行走图 - 滤镜效果
 * @author Drill_up
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_EventFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以给行走图添加滤镜效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFilter     系统-滤镜核心
 *     需要该核心才能启用滤镜效果。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   事件、玩家、跟随队员都可以添加滤镜效果。
 * 2.想要了解更多滤镜效果，去看看 "1.系统 > 大家族-滤镜效果.docx"。
 * 滤镜：
 *   (1.纯色滤镜、着色滤镜……等 相互独立，且效果可以相互叠加。
 *      添加滤镜的先后顺序不同，能产生不同的叠加效果。
 *   (2.波动纯色滤镜 与 纯色滤镜 是同一个滤镜，只是变化方式不同。
 *      二者指令会相互覆盖。
 *   (3.新复制的事件也可以添加滤镜效果。
 *   (4.行走图的滤镜效果不会作用在镜像上，因为极其消耗性能。
 * 设计：
 *   (1.使用滤镜时，最好先设置0（给一个关闭滤镜过程），再切换。
 *      避免瞬间切换的不自然。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令设置滤镜：
 * （注意，冒号左右两边有空格）
 * 
 * 插件指令：>行走图滤镜 : 领队 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>行走图滤镜 : 指定队员 : 1 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>行走图滤镜 : 指定队员(变量)  : 1 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>行走图滤镜 : 全部队员 : 纯色滤镜 : 纯黑 : 155 : 60
 * 
 * 插件指令：>行走图滤镜 : 本事件 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>行走图滤镜 : 指定事件 : 1 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>行走图滤镜 : 指定事件(变量) : 1 : 纯色滤镜 : 纯黑 : 155 : 60
 *
 * 插件指令：>行走图滤镜 : 领队 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>行走图滤镜 : 领队 : 纯色滤镜 : 纯蓝 : 155 : 60
 * 插件指令：>行走图滤镜 : 领队 : 纯色滤镜 : 纯绿 : 155 : 60
 * 插件指令：>行走图滤镜 : 领队 : 纯色滤镜 : 纯红 : 155 : 60
 * 插件指令：>行走图滤镜 : 领队 : 纯色滤镜 : 黄色 : 155 : 60
 * 插件指令：>行走图滤镜 : 领队 : 纯色滤镜 : 紫色 : 155 : 60
 * 插件指令：>行走图滤镜 : 领队 : 纯色滤镜 : 青色 : 155 : 60
 * 
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 黑白 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 反色 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 鲜艳 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 漂白 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 饱和度降低 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 古墨水画色 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 古铜色 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 宝丽来相机色 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 红绿蓝翻转 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 夜色 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 着色滤镜 : 致幻色 : 255 : 60
 * 
 * 插件指令：>行走图滤镜 : 领队 : 填充滤镜 : 纯黑 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 填充滤镜 : 纯蓝 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 填充滤镜 : 纯绿 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 填充滤镜 : 纯红 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 填充滤镜 : 黄色 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 填充滤镜 : 紫色 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 填充滤镜 : 青色 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 填充滤镜 : 纯白 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 填充滤镜 : #dd99ff : 255 : 60
 * 
 * 插件指令：>行走图滤镜 : 领队 : 模糊滤镜 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 噪点滤镜 : 155 : 60
 * 
 * 1.前两个参数，表示：敌方/我方，第几个/全体。
 *   比如，我方 1，表示第一个角色。
 * 2.滤镜后面的两个参数表示：目标程度，变化时长。
 * 3.目标程度范围为0-255。255的程度最强烈。
 *   比如，纯蓝滤镜的255表示敌人图像完全过滤为蓝色。
 * 4.填充滤镜的"#dd99ff"为自定义颜色代码，你可以填入自定义颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 事件注释
 * 你还可以直接指定滤镜设置：
 * （注意，冒号左右两边有空格）
 * 
 * 事件注释：=>行走图滤镜 : 纯色滤镜 : 纯蓝 : 55
 * 事件注释：=>行走图滤镜 : 着色滤镜 : 黑白 : 255
 * 事件注释：=>行走图滤镜 : 填充滤镜 : 紫色 : 255
 * 事件注释：=>行走图滤镜 : 模糊滤镜 : 55
 * 事件注释：=>行走图滤镜 : 噪点滤镜 : 55
 *
 * 1.四种注释的滤镜可以在初始化的时候叠加。
 * 2.注意，注释的滤镜只有一个参数，表示：变化程度。
 * 3.填充滤镜设置中，你可以填自定义颜色的颜色代码。
 * 
 * -----------------------------------------------------------------------------
 * ----高级设置 - 波动滤镜
 * 上述所有滤镜，都是线性滤镜，即变色后，一直保持状态。
 * 而波动滤镜的程度是依据正弦公式变化，时隐时现。
 * 
 * 插件指令：>行走图滤镜 : 领队 : 波动纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>行走图滤镜 : 领队 : 波动着色滤镜 : 鲜艳 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 波动填充滤镜 : 紫色 : 155 : 60
 * 插件指令：>行走图滤镜 : 领队 : 波动模糊滤镜 : 255 : 60
 * 插件指令：>行走图滤镜 : 领队 : 波动噪点滤镜 : 155 : 60
 *
 * 事件注释：=>行走图滤镜 : 波动纯色滤镜 : 纯蓝 : 55 : 60
 * 事件注释：=>行走图滤镜 : 波动着色滤镜 : 黑白 : 255 : 60
 * 事件注释：=>行走图滤镜 : 波动填充滤镜 : 紫色 : 155 : 60
 * 事件注释：=>行走图滤镜 : 波动模糊滤镜 : 255 : 60
 * 事件注释：=>行走图滤镜 : 波动噪点滤镜 : 255 : 60
 * 
 * 1.只要在滤镜类型前加"波动"二字即可。
 *   注意，后面两个参数表示为：程度0-255、周期（波动一次所需时间，单位帧） 
 * 2.波动滤镜为瞬间变化，所以不存在"出场后变化"注释指令。
 * 3.填充滤镜设置中，你可以填自定义颜色的颜色代码。
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
 * 测试方法：   在不同管理层放置10个含有滤镜的事件，检测性能。
 * 测试结果：   没有任何含滤镜标签的事件，平均消耗为：【9.99ms】
 *              200个事件的地图中，平均消耗为：【108.19ms】
 *              100个事件的地图中，平均消耗为：【92.32ms】
 *               50个事件的地图中，平均消耗为：【74.78ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的【20ms】范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.滤镜是性能消耗大户，因为带滤镜的图片效果都是通过即时演算形成的。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 3.低配电脑估计最多能跑得动30个带滤镜的事件。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了滤镜内核。
 * [v1.2]
 * 分离了滤镜核心，大幅度优化了底层结构。
 * 添加了填充滤镜功能，降低了模糊滤镜的性能消耗。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EvF（Event_Filter）
//		临时全局变量	无
//		临时局部变量	this._drill_EvF
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)*o(滤镜) 每帧
//		★性能测试因素	地图管理层 125事件
//		★性能测试消耗	74.78ms ~ 92.32ms
//						9.99ms（没有事件含滤镜）
//		★最坏情况		所有事件（125个事件）都加了滤镜效果，高性能电脑都卡成5帧。
//		★备注			滤镜几乎没有for，都是写在update中。
//						贴图变化对于性能的消耗还是比较大的。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			行走图滤镜效果：
//				->事件注释初始化
//				->行走图插件指令
//				-> 优化 镜像屏蔽
//				-> 优化 指令延迟
//				->（滤镜核）优化，滤镜/滤镜板用到的时候才new
//
//		★必要注意事项：
//			1.滤镜核详细内容，去见Drill_CoreOfFilter。
//
//		★其它说明细节：
//			1.由于地图和战斗显然不同，战斗最多8个贴图，而事件有100个。
//			  所以不得不重新优化内核，在使用时才new。
//			2.不考虑镜像的滤镜效果，因为消耗太大。
//				
//		★存在的问题：
//			暂无
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventFilter = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventFilter');

	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFilter ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_EvF_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EvF_pluginCommand.call(this, command, args);
	if (command === ">行走图滤镜") { // >行走图滤镜 : 领队 : 纯色滤镜 : 纯蓝 : 155 : 60
		if(args.length == 8 || args.length == 10){
			var unit = String(args[1]);
			if( unit == "领队" ){
				var type = String(args[3]);
				var temp1 = String(args[5]);
				var temp2 = String(args[7]);
				if( args[9]!=undefined ){ var temp3 = String(args[9]); }
				
				if( type == "纯色滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "着色滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "填充滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "模糊滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setBlurLinear = [ Number(temp1),Number(temp2) ];
				}
				if( type == "噪点滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setNoiseLinear = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动纯色滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动着色滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动填充滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动模糊滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setBlurWave = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动噪点滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setNoiseWave = [ Number(temp1),Number(temp2) ];
				}
			}
			if( unit == "全部队员" ){
				var type = String(args[3]);
				var temp1 = String(args[5]);
				var temp2 = String(args[7]);
				if( args[9]!=undefined ){ var temp3 = String(args[9]); }
				
				if( type == "纯色滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
					$gamePlayer.followers().forEach(function(f){ 
						f._drill_EvF.openFilter = true;
						f._drill_EvF.setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
					},this);
				}
				if( type == "着色滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
					$gamePlayer.followers().forEach(function(f){
						f._drill_EvF.openFilter = true;
						f._drill_EvF.setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
					},this);
				}
				if( type == "填充滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
					$gamePlayer.followers().forEach(function(f){
						f._drill_EvF.openFilter = true;
						f._drill_EvF.setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
					},this);
				}
				if( type == "模糊滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setBlurLinear = [ Number(temp1),Number(temp2) ];
					$gamePlayer.followers().forEach(function(f){
						f._drill_EvF.openFilter = true;
						f._drill_EvF.setBlurLinear = [ Number(temp1),Number(temp2) ];
					},this);
				}
				if( type == "噪点滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setNoiseLinear = [ Number(temp1),Number(temp2) ];
					$gamePlayer.followers().forEach(function(f){
						f._drill_EvF.openFilter = true;
						f._drill_EvF.setNoiseLinear = [ Number(temp1),Number(temp2) ];
					},this);
				}
				if( type == "波动纯色滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
					$gamePlayer.followers().forEach(function(f){
						f._drill_EvF.openFilter = true;
						f._drill_EvF.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ]; 
					},this);
				}
				if( type == "波动着色滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
					$gamePlayer.followers().forEach(function(f){ 
						f._drill_EvF.openFilter = true;
						f._drill_EvF.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ]; 
					},this);
				}
				if( type == "波动填充滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
					$gamePlayer.followers().forEach(function(f){ 
						f._drill_EvF.openFilter = true;
						f._drill_EvF.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ]; 
					},this);
				}
				if( type == "波动模糊滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setBlurWave = [ Number(temp1),Number(temp2) ];
					$gamePlayer.followers().forEach(function(f){ 
						f._drill_EvF.openFilter = true;
						f._drill_EvF.setBlurWave = [ Number(temp1),Number(temp2) ];
					},this);
				}
				if( type == "波动噪点滤镜" ){
					$gamePlayer._drill_EvF.openFilter = true;
					$gamePlayer._drill_EvF.setNoiseWave = [ Number(temp1),Number(temp2) ];
					$gamePlayer.followers().forEach(function(f){ 
						f._drill_EvF.openFilter = true;
						f._drill_EvF.setNoiseWave = [ Number(temp1),Number(temp2) ];
					},this);
				}
			}
			if( unit == "本事件" ){
				var type = String(args[3]);
				var temp1 = String(args[5]);
				var temp2 = String(args[7]);
				if( args[9]!=undefined ){ var temp3 = String(args[9]); }
				
				if( $gameMap.drill_EvF_isEventExist( this._eventId ) == false ){ return; }
				var e = $gameMap.event( this._eventId );
				if( type == "纯色滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "着色滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "填充滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "模糊滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setBlurLinear = [ Number(temp1),Number(temp2) ];
				}
				if( type == "噪点滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setNoiseLinear = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动纯色滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动着色滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动填充滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动模糊滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setBlurWave = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动噪点滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setNoiseWave = [ Number(temp1),Number(temp2) ];
				}
			}
		}
		if(args.length == 10 || args.length == 12){
			var unit = String(args[1]);
			if( unit == "指定队员" || unit == "指定队员(变量)" ){
				var index = String(args[3]);
				var type = String(args[5]);
				var temp1 = String(args[7]);
				var temp2 = String(args[9]);
				if( args[11]!=undefined ){ var temp3 = String(args[11]); }
				
				if( unit == "指定队员(变量)" ){ index = $gameVariables.value(index);}
				
				var _followers = $gamePlayer.followers().visibleFollowers();
				_followers.unshift($gamePlayer);
				if( type == "纯色滤镜" ){
					_followers[index]._drill_EvF.openFilter = true;
					_followers[index]._drill_EvF.setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "着色滤镜" ){
					_followers[index]._drill_EvF.openFilter = true;
					_followers[index]._drill_EvF.setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "填充滤镜" ){
					_followers[index]._drill_EvF.openFilter = true;
					_followers[index]._drill_EvF.setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "模糊滤镜" ){
					_followers[index]._drill_EvF.openFilter = true;
					_followers[index]._drill_EvF.setBlurLinear = [ Number(temp1),Number(temp2) ];
				}
				if( type == "噪点滤镜" ){
					_followers[index]._drill_EvF.openFilter = true;
					_followers[index]._drill_EvF.setNoiseLinear = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动纯色滤镜" ){
					_followers[index]._drill_EvF.openFilter = true;
					_followers[index]._drill_EvF.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动着色滤镜" ){
					_followers[index]._drill_EvF.openFilter = true;
					_followers[index]._drill_EvF.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动填充滤镜" ){
					_followers[index]._drill_EvF.openFilter = true;
					_followers[index]._drill_EvF.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动模糊滤镜" ){
					_followers[index]._drill_EvF.openFilter = true;
					_followers[index]._drill_EvF.setBlurWave = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动噪点滤镜" ){
					_followers[index]._drill_EvF.openFilter = true;
					_followers[index]._drill_EvF.setNoiseWave = [ Number(temp1),Number(temp2) ];
				}
			}
			if( unit == "指定事件" || unit == "指定事件(变量)"  ){
				var index = String(args[3]);
				var type = String(args[5]);
				var temp1 = String(args[7]);
				var temp2 = String(args[9]);
				if( args[11]!=undefined ){ var temp3 = String(args[11]); }
				
				if( unit == "指定事件(变量)" ){ index = $gameVariables.value(index);}
				
				if( $gameMap.drill_EvF_isEventExist( index ) == false ){ return; }
				var e = $gameMap.event( index );
				if( type == "纯色滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "着色滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "填充滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "模糊滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setBlurLinear = [ Number(temp1),Number(temp2) ];
				}
				if( type == "噪点滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setNoiseLinear = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动纯色滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动着色滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动填充滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动模糊滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setBlurWave = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动噪点滤镜" ){
					e._drill_EvF.openFilter = true;
					e._drill_EvF.setNoiseWave = [ Number(temp1),Number(temp2) ];
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EvF_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventFilter.js 行走图 - 滤镜效果】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

//=============================================================================
// * 事件注释初始化
//=============================================================================
var _drill_EvF_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EvF_setupPage.call(this);
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' : ');
			var command = args.shift();
			if (command == "=>行走图滤镜"){
				if(args.length >= 2 && args.length <= 4){
					var type = String(args[0]);
					var temp1 = String(args[1]);
					if( args[2] != undefined ){ var temp2 = String(args[2]); };
					if( args[3] != undefined ){ var temp3 = String(args[3]); };
					if( type == "纯色滤镜" ){	//=>行走图滤镜 : 纯色滤镜 : 纯蓝 : 155
						this._drill_EvF.openFilter = true;
						this._drill_EvF.setPureLinear = [ String(temp1),Number(temp2), 1 ];
					}
					if( type == "着色滤镜" ){
						this._drill_EvF.openFilter = true;
						this._drill_EvF.setColorLinear = [ String(temp1),Number(temp2), 1 ];
					}
					if( type == "填充滤镜" ){
						this._drill_EvF.openFilter = true;
						this._drill_EvF.setFillLinear = [ String(temp1),Number(temp2), 1 ];
					}
					if( type == "模糊滤镜" ){	//=>行走图滤镜 : 噪点滤镜 : 55
						this._drill_EvF.openFilter = true;
						this._drill_EvF.setBlurLinear = [ Number(temp1), 1 ];
					}
					if( type == "噪点滤镜" ){
						this._drill_EvF.openFilter = true;
						this._drill_EvF.setNoiseLinear = [ Number(temp1), 1 ];
					}
					if( type == "波动纯色滤镜" ){	//=>行走图滤镜 : 波动纯色滤镜 : 纯蓝 : 55 : 60
						this._drill_EvF.openFilter = true;
						this._drill_EvF.setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
					}
					if( type == "波动着色滤镜" ){
						this._drill_EvF.openFilter = true;
						this._drill_EvF.setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
					}
					if( type == "波动填充滤镜" ){
						this._drill_EvF.openFilter = true;
						this._drill_EvF.setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
					}
					if( type == "波动模糊滤镜" ){	//=>行走图滤镜 : 波动噪点滤镜 : 55 : 60
						this._drill_EvF.openFilter = true;
						this._drill_EvF.setBlurWave = [ Number(temp1),Number(temp2) ];
					}
					if( type == "波动噪点滤镜" ){
						this._drill_EvF.openFilter = true;
						this._drill_EvF.setNoiseWave = [ Number(temp1),Number(temp2) ];
					}
				}
			};
		};
	}, this);};
};

//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_EvF_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}

//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体 初始化
//==============================
var _drill_EvF_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_drill_EvF_initialize.call(this);
	this._drill_EvF = {};
	this._drill_EvF.curTime = 0;
	this._drill_EvF.openFilter = false;
	
	this._drill_EvF.setPureLinear = ["",0,0];	//临时赋值用的数组
	this._drill_EvF.setColorLinear = ["",0,0];
	this._drill_EvF.setFillLinear = ["",0,0];
	this._drill_EvF.setBlurLinear = [0,0];
	this._drill_EvF.setNoiseLinear = [0,0];
	this._drill_EvF.setPureWave = ["",0,0];
	this._drill_EvF.setColorWave = ["",0,0];
	this._drill_EvF.setFillWave = ["",0,0];
	this._drill_EvF.setBlurWave = [0,0];
	this._drill_EvF.setNoiseWave = [0,0];
};

//=============================================================================
// ** 行走图 贴图
//=============================================================================
//==============================
// * 帧刷新 - 滤镜指令
//==============================
var _drill_EvF_c_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_drill_EvF_c_update.call(this);
	if( $gameTemp.drill_EvF_isReflectionSprite(this) ){ return; }	//（屏蔽镜像情况）
	this.drill_EvF_updateCharacterFilter();
}
Sprite_Character.prototype.drill_EvF_updateCharacterFilter = function() {
	if( !this._character ){ return; }
	if( !this._character._drill_EvF ){ return; }
	if( !this._character._drill_EvF.openFilter ) { return; }
	var character = this._character;
	var character_sprite = this;
	var data;
	
	//>指令延迟
	character._drill_EvF.curTime ++;
	if( character._drill_EvF.curTime % 5 != 0 ){ return }
	
	//>初始化
	if( character_sprite.drill_COF_isInited() == false ){
		character_sprite.drill_COF_initialize();
	}
	
	//>插件指令配置 - 线性
	data = character._drill_EvF.setPureLinear;	
	character_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
	data = character._drill_EvF.setColorLinear;
	character_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
	data = character._drill_EvF.setFillLinear;
	character_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
	data = character._drill_EvF.setBlurLinear;
	character_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
	data = character._drill_EvF.setNoiseLinear;
	character_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
	
	//>插件指令配置 - 波动
	data = character._drill_EvF.setPureWave;	
	character_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
	data = character._drill_EvF.setColorWave;
	character_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
	data = character._drill_EvF.setFillWave;
	character_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
	data = character._drill_EvF.setBlurWave;
	character_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
	data = character._drill_EvF.setNoiseWave;
	character_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
	
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventFilter = false;
		alert(
			"【Drill_EventFilter.js 行走图 - 滤镜效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFilter 系统-滤镜核心"
		);
}
