//=============================================================================
// Drill_X_EventTextFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        行走图 - 事件漂浮文字的滤镜效果[扩展]
 * @author Drill_up
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_X_EventTextFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以给事件漂浮文字添加滤镜效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 基于：
 *   - Drill_CoreOfFilter          系统-滤镜核心
 *     需要该核心才能启用滤镜效果。
 *   - Drill_EventText             行走图-事件漂浮文字
 *     给目标插件提供滤镜效果支持。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件。
 * 2.想要了解更多滤镜效果，去看看 "1.系统 > 大家族-滤镜效果.docx"。
 * 滤镜：
 *   (1.纯色滤镜、着色滤镜、模糊滤镜、噪点滤镜 相互独立，且效果可以相互叠加。
 *      添加滤镜的先后顺序不同，能产生不同的叠加效果。
 *   (2.波动纯色滤镜 与 纯色滤镜 是同一个滤镜，只是变化方式不同。
 *      二者设置会相互覆盖。
 * 设计：
 *   (1.事件漂浮文字添加滤镜后，可以模拟出 霓虹灯、广告板 的效果，
 *      引起玩家注意。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令设置滤镜：
 * （注意，冒号左右两边有空格）
 * 
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>事件漂浮文字滤镜 : 指定事件 : 1 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>事件漂浮文字滤镜 : 指定事件(变量) : 1 : 纯色滤镜 : 纯黑 : 155 : 60
 *
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 纯色滤镜 : 纯蓝 : 155 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 纯色滤镜 : 纯绿 : 155 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 纯色滤镜 : 纯红 : 155 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 纯色滤镜 : 黄色 : 155 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 纯色滤镜 : 紫色 : 155 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 纯色滤镜 : 青色 : 155 : 60
 * 
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 黑白 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 反色 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 鲜艳 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 漂白 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 饱和度降低 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 古墨水画色 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 古铜色 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 宝丽来相机色 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 红绿蓝翻转 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 夜色 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 着色滤镜 : 致幻色 : 255 : 60
 * 
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 填充滤镜 : 纯黑 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 填充滤镜 : 纯蓝 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 填充滤镜 : 纯绿 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 填充滤镜 : 纯红 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 填充滤镜 : 黄色 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 填充滤镜 : 紫色 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 填充滤镜 : 青色 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 填充滤镜 : 纯白 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 填充滤镜 : #dd99ff : 255 : 60
 * 
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 模糊滤镜 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 噪点滤镜 : 155 : 60
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
 * 事件注释：=>事件漂浮文字滤镜 : 纯色滤镜 : 纯蓝 : 55
 * 事件注释：=>事件漂浮文字滤镜 : 着色滤镜 : 黑白 : 255
 * 事件注释：=>事件漂浮文字滤镜 : 填充滤镜 : 紫色 : 255
 * 事件注释：=>事件漂浮文字滤镜 : 模糊滤镜 : 55
 * 事件注释：=>事件漂浮文字滤镜 : 噪点滤镜 : 55
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
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 波动纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 波动着色滤镜 : 鲜艳 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 波动填充滤镜 : 紫色 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 波动模糊滤镜 : 255 : 60
 * 插件指令：>事件漂浮文字滤镜 : 本事件 : 波动噪点滤镜 : 155 : 60
 *
 * 事件注释：=>事件漂浮文字滤镜 : 波动纯色滤镜 : 纯蓝 : 55 : 60
 * 事件注释：=>事件漂浮文字滤镜 : 波动着色滤镜 : 黑白 : 255 : 60
 * 事件注释：=>事件漂浮文字滤镜 : 波动填充滤镜 : 紫色 : 255 : 60
 * 事件注释：=>事件漂浮文字滤镜 : 波动模糊滤镜 : 255 : 60
 * 事件注释：=>事件漂浮文字滤镜 : 波动噪点滤镜 : 255 : 60
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
 * 测试方法：   在不同管理层放置20个含有漂浮文字+波动滤镜的事件。
 * 测试结果：   地图没有任何含滤镜的事件，平均消耗为：【12.15ms】
 *              200个事件的地图中，平均消耗为：【92.44ms】
 *              100个事件的地图中，平均消耗为：【62.77ms】
 *               50个事件的地图中，平均消耗为：【35.31ms】
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
 * 分离了滤镜核心，大幅度优化了底层结构。
 * 添加了填充滤镜功能，降低了模糊滤镜的性能消耗。
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XETF（X_Event_Text_Filter）
//		临时全局变量	DrillUp.g_XETF_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)*o(滤镜) 每帧
//		★性能测试因素	对话管理层 放置大量波动滤镜的文字
//		★性能测试消耗	35.31ms ~ 102.44ms
//		★最坏情况		地图存在大量带有滤镜文字的事件。
//		★备注			其实我放了50个波动滤镜的事件，但是FPS从19到15，只降了4帧。
//						（未使用模糊滤镜和噪点滤镜）
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			漂浮文字-滤镜效果：
//				->文字贴图的滤镜
//				->（滤镜核）优化，滤镜/滤镜板用到的时候才new
//
//		★必要注意事项：
//			1.滤镜核详细内容，去见Drill_CoreOfFilter。
//
//		★其它说明细节：
//			1.继承于EventText，使用_drill_ET_spriteTank来控制滤镜变化。
//				
//		★存在的问题：
//			1.不知道是不是一次性读取不到的问题，不停地刷菜单，有几率出现波动滤镜时出现全黑的bitmap情况。
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_EventTextFilter = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_EventTextFilter');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFilter && 
	Imported.Drill_EventText ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_XETF_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_XETF_pluginCommand.call(this, command, args);
	if (command === ">事件漂浮文字滤镜") { // >事件漂浮文字滤镜 : 本事件 : 纯色滤镜 : 纯蓝 : 155 : 60
		if(args.length == 8 || args.length == 10){
			var unit = String(args[1]);
			if( unit == "本事件" ){
				var type = String(args[3]);
				var temp1 = String(args[5]);
				var temp2 = Number(args[7]);
				if( args[9]!=undefined ){ var temp3 = Number(args[9]); }
				
				var e = $gameMap.event( this._eventId );
				if( type == "纯色滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setPureLinear = [temp1,temp2,temp3];
				}
				if( type == "着色滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setColorLinear = [temp1,temp2,temp3];
				}
				if( type == "填充滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setFillLinear = [temp1,temp2,temp3];
				}
				if( type == "模糊滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setBlurLinear = [Number(temp1),temp2];
				}
				if( type == "噪点滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setNoiseLinear = [Number(temp1),temp2];
				}
				if( type == "波动纯色滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setPureWave = [temp1,temp2,temp3];
				}
				if( type == "波动着色滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setColorWave = [temp1,temp2,temp3];
				}
				if( type == "波动填充滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setFillWave = [temp1,temp2,temp3];
				}
				if( type == "波动模糊滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setBlurWave = [Number(temp1),temp2];
				}
				if( type == "波动噪点滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setNoiseWave = [Number(temp1),temp2];
				}
			}
		}
		if(args.length == 10 || args.length == 12){
			var unit = String(args[1]);
			if( unit == "指定事件" || unit == "指定事件(变量)"  ){
				var index = String(args[3]);
				var type = String(args[5]);
				var temp1 = String(args[7]);
				var temp2 = Number(args[9]);
				if( args[11]!=undefined ){ var temp3 = Number(args[11]); }
				
				if( unit == "指定事件(变量)" ){ index = $gameVariables.value(index);}
				
				if( $gameMap.drill_XETF_isEventExist( index ) == false ){ return; }
				var e = $gameMap.event( index );
				if( type == "纯色滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setPureLinear = [temp1,temp2,temp3];
				}
				if( type == "着色滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setColorLinear = [temp1,temp2,temp3];
				}
				if( type == "填充滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setFillLinear = [temp1,temp2,temp3];
				}
				if( type == "模糊滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setBlurLinear = [Number(temp1),temp2];
				}
				if( type == "噪点滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setNoiseLinear = [Number(temp1),temp2];
				}
				if( type == "波动纯色滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setPureWave = [temp1,temp2,temp3];
				}
				if( type == "波动着色滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setColorWave = [temp1,temp2,temp3];
				}
				if( type == "波动填充滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setFillWave = [temp1,temp2,temp3];
				}
				if( type == "波动模糊滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setBlurWave = [Number(temp1),temp2];
				}
				if( type == "波动噪点滤镜" ){
					e._drill_XETF.openFilter = true;
					e._drill_XETF.setNoiseWave = [Number(temp1),temp2];
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_XETF_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_X_EventTextFilter.js 行走图 - 事件漂浮文字的滤镜效果[扩展]】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体 初始化
//==============================
var _drill_XETF_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
	this.drill_XETF_init();						//初始化参数
	this._drill_XETF.openFilter = false;		//
	
	_drill_XETF_initialize.call(this, mapId, eventId);
};
Game_Event.prototype.drill_XETF_init = function() {
	this._drill_XETF = {};
	this._drill_XETF.setPureLinear = ["",0,0];	//刷新事件页的滤镜参数
	this._drill_XETF.setColorLinear = ["",0,0];
	this._drill_XETF.setFillLinear = ["",0,0];
	this._drill_XETF.setBlurLinear = [0,0];
	this._drill_XETF.setNoiseLinear = [0,0];
	this._drill_XETF.setPureWave = ["",0,0];
	this._drill_XETF.setColorWave = ["",0,0];
	this._drill_XETF.setFillWave = ["",0,0];
	this._drill_XETF.setBlurWave = [0,0];
	this._drill_XETF.setNoiseWave = [0,0];
}
//==============================
// * 事件页 刷新
//==============================
var _drill_XETF_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	this.drill_XETF_init();					//刷新事件滤镜
	_drill_XETF_setupPage.call(this);
	this.drill_XETF_setupFilters();
}
Game_Event.prototype.drill_XETF_setupFilters = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' : ');
			var command = args.shift();
			if (command == "=>事件漂浮文字滤镜"){
				if(args.length >= 2 && args.length <= 4){
					var type = String(args[0]);
					var temp1 = String(args[1]);
					var temp2 = 0;
					var temp3 = 0;
					if( args[2]!=undefined ){ temp2 = Number(args[2]); };
					if( args[3]!=undefined ){ temp3 = Number(args[3]); };
					if( type == "纯色滤镜" ){	//=>事件漂浮文字滤镜 : 纯色滤镜 : 纯蓝 : 155
						this._drill_XETF.openFilter = true;
						this._drill_XETF.setPureLinear = [temp1,temp2,temp3];
					}
					if( type == "着色滤镜" ){
						this._drill_XETF.openFilter = true;
						this._drill_XETF.setColorLinear = [temp1,temp2,temp3];
					}
					if( type == "填充滤镜" ){
						this._drill_XETF.openFilter = true;
						this._drill_XETF.setFillLinear = [temp1,temp2,temp3];
					}
					if( type == "模糊滤镜" ){	//=>事件漂浮文字滤镜 : 噪点滤镜 : 55
						this._drill_XETF.openFilter = true;
						this._drill_XETF.setBlurLinear = [Number(temp1),temp2];
					}
					if( type == "噪点滤镜" ){
						this._drill_XETF.openFilter = true;
						this._drill_XETF.setNoiseLinear = [Number(temp1),temp2];
					}
					if( type == "波动纯色滤镜" ){	//=>事件漂浮文字滤镜 : 波动纯色滤镜 : 纯蓝 : 55 : 60
						this._drill_XETF.openFilter = true;
						this._drill_XETF.setPureWave = [temp1,temp2,temp3];
					}
					if( type == "波动着色滤镜" ){
						this._drill_XETF.openFilter = true;
						this._drill_XETF.setColorWave = [temp1,temp2,temp3];
					}
					if( type == "波动填充滤镜" ){
						this._drill_XETF.openFilter = true;
						this._drill_XETF.setFillWave = [temp1,temp2,temp3];
					}
					if( type == "波动模糊滤镜" ){	//=>事件漂浮文字滤镜 : 波动噪点滤镜 : 55 : 60
						this._drill_XETF.openFilter = true;
						this._drill_XETF.setBlurWave = [Number(temp1),temp2];
					}
					if( type == "波动噪点滤镜" ){
						this._drill_XETF.openFilter = true;
						this._drill_XETF.setNoiseWave = [Number(temp1),temp2];
					}
				}
			};
		};
	}, this);};
};

//=============================================================================
// ** 文字贴图
//=============================================================================
//==============================
// * 帧刷新 - 滤镜指令
//==============================
var _drill_XETF_c_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	_drill_XETF_c_update.call(this);
	
	for(var i=0; i < this._drill_ET_spriteTank.length; i++){		// ._drill_ET_spriteTank 为文字贴图集合，在ET插件中
		var temp_WSprite = this._drill_ET_spriteTank[i];
		if( !temp_WSprite._character ){ continue; }
		if( !temp_WSprite._character._drill_XETF ){ continue; }
		if( !temp_WSprite._character._drill_XETF.openFilter ) { continue; }
		var character = temp_WSprite._character;
		var temp_sprite = temp_WSprite._windowContentsSprite;
		var data;
   
		//>初始化
		if( temp_sprite.drill_COF_isInited() == false ){
			temp_sprite.drill_COF_initialize();
		}
			
		//>插件指令配置 - 线性
		data = character._drill_XETF.setPureLinear;	
		temp_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = character._drill_XETF.setColorLinear;
		temp_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = character._drill_XETF.setFillLinear;
		temp_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = character._drill_XETF.setBlurLinear;
		temp_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = character._drill_XETF.setNoiseLinear;
		temp_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		//>插件指令配置 - 波动
		data = character._drill_XETF.setPureWave;	
		temp_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = character._drill_XETF.setColorWave;
		temp_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = character._drill_XETF.setFillWave;
		temp_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = character._drill_XETF.setBlurWave;
		temp_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = character._drill_XETF.setNoiseWave;
		temp_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
		
	}
}

//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_X_EventTextFilter = false;
		alert(
			"【Drill_X_EventTextFilter.js 行走图 - 事件漂浮文字的滤镜效果[扩展]】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFilter 系统-滤镜核心"+
			"\n- Drill_EventText 行走图-事件漂浮文字"
		);
}





