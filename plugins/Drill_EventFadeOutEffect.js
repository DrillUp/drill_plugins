//=============================================================================
// Drill_EventFadeOutEffect.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        行走图 - 消失动作效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventFadeOutEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以播放事件消失不见的各种动作。
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
 *   作用于 事件、玩家 。
 * 2.建议先了解 "0.基本定义 > 显示与透明度.docx"。
 *   更多详细内容，去看看 "7.行走图 > 关于动作效果.docx"。
 * 细节：
 *   (1.所有动作都是并行的，你需要手动设置总时间。
 *      并且需要 等待 时，加等待指令。
 *   (2.消失动作 同时只能播放一种。
 *      所有 消失动作 都可以与持续动作效果叠加，但不包括透明度的叠加。
 *      叠加效果要自己试，但叠加效果一般都不太好。
 *   (3.动作效果 与 动画序列 插件相互独立，可以叠加使用。
 * 指令：
 *   (1.消失动作固定为：从 完全不透明 到 完全透明 的过程。
 *      动作结束后，对象的透明度将变为0。
 *   (2.不同类型动作的参数和指令有较大区别。
 *      如果指令的参数名和参数数量不匹配，则动作不会被执行。
 * 透明度：
 *   (1.该插件只影响事件的 透明度 ，并不控制 透明状态 。
 *      若透明状态为ON时，事件直接不可见，动作也不可见。
 *   (2.开启"透明度检查"后，如果事件的透明度为0，则动作会被阻止播放。
 *   (3.如果你指定了一个队员消失，那么该队员将会长期不可见，因为透明
 *      度为0。需要执行 显示动作 或者 修改透明度，才能复原。
 * 设计：
 *   (1.你可以使得事件消失之后，显现出现在镜像中。或者反过来。
 *      具体可以去 镜像管理层示例 看看"镜像化"的小爱丽丝。
 *   (2.你可以让大量事件执行消失动作，作为某些解谜的清场动画效果，
 *      具体可以参考一下华容道解谜第5关的小彩蛋。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 指定人物
 * 你需要通过下面插件指令来执行消失动作：
 * 
 * 插件指令：>消失动作 : 玩家 : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>消失动作 : 玩家领队 : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>消失动作 : 玩家全员 : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>消失动作 : 玩家队员[1] : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>消失动作 : 玩家队员变量[21] : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>消失动作 : 本事件 : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>消失动作 : 事件[1] : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>消失动作 : 事件变量[1] : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>消失动作 : 批量事件[10,11] : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>消失动作 : 批量事件变量[21,22] : 标准弹跳 : 总时间[60] : 高度[168]
 * 
 * 插件指令：>消失动作 : 本事件 : 直接消失 : 总时间[60]
 * 插件指令：>消失动作 : 本事件 : 移动消失 : 总时间[60] : 方向角度[90] : 移动距离[100]
 * 插件指令：>消失动作 : 本事件 : 标准升起 : 总时间[60] : 缓冲时间[20] : 高度[168]
 * 插件指令：>消失动作 : 本事件 : 标准弹跳 : 总时间[60] : 高度[100]
 * 插件指令：>消失动作 : 本事件 : 向左炸飞 : 总时间[60] : 速度[11.5]
 * 插件指令：>消失动作 : 本事件 : 向右炸飞 : 总时间[60] : 速度[11.5]
 * 插件指令：>消失动作 : 本事件 : 横向挤扁 : 总时间[60] : 横向比例[1.5]
 * 插件指令：>消失动作 : 本事件 : 横向挤扁(不透明) : 总时间[60] : 横向比例[1.5]
 * 插件指令：>消失动作 : 本事件 : 纵向挤扁 : 总时间[60] : 纵向比例[1.5]
 * 插件指令：>消失动作 : 本事件 : 纵向挤扁(不透明) : 总时间[60] : 纵向比例[1.5]
 * 插件指令：>消失动作 : 本事件 : 缩小消失 : 总时间[60]
 * 插件指令：>消失动作 : 本事件 : 缩小消失(不透明) : 总时间[60]
 * 插件指令：>消失动作 : 本事件 : 弹性缩小消失 : 总时间[60] : 比例溢出[0.2] : 中心锚点[0.5,1.0]
 * 插件指令：>消失动作 : 本事件 : 弹性缩小消失(不透明) : 总时间[60] : 比例溢出[0.2] : 中心锚点[0.5,1.0]
 * 插件指令：>消失动作 : 本事件 : 向左旋转倒下 : 总时间[60] : 倒下时间[20] : 消失时间[30]
 * 插件指令：>消失动作 : 本事件 : 向右旋转倒下 : 总时间[60] : 倒下时间[20] : 消失时间[30]
 * 插件指令：>消失动作 : 本事件 : 顺时针螺旋消失 : 总时间[120] : 最大螺旋半径[108] : 螺旋一圈时间[40] : 透明度变化时间[30]
 * 插件指令：>消失动作 : 本事件 : 逆时针螺旋消失 : 总时间[120] : 最大螺旋半径[108] : 螺旋一圈时间[40] : 透明度变化时间[30]
 * 插件指令：>消失动作 : 本事件 : 立即终止动作
 * 
 * 1.前半部分（玩家）和 后半部分（标准升起 : 总时间[60] : 缓冲时间[20] : 高度[168]）
 *   的参数可以随意组合。一共有10*19种组合方式。
 * 2."玩家"和"玩家领队"是同一个意思。
 *   "玩家队员[1]"表示领队后面第一个跟随的队友。
 * 3.参数中"总时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"距离"、"高度"的单位是像素。
 * 4.部分类型的动作有 缓冲时间 的设置，该动作会被分为多个阶段。
 *   比如"标准升起"为例，
 *   一阶段升起前阶段起跳效果，时长为 缓冲时间。
 *   二阶段对应升起的动作，时长为 总时间 减 缓冲时间。
 * 5.类型的更详细介绍，去看看 "7.行走图 > 关于动作效果.docx"。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>玩家消失效果 : 领队 : 标准升起 : 60 : 168
 * 插件指令(旧)：>玩家消失效果 : 指定队员 : 1 : 标准升起 : 60 : 168
 * 插件指令(旧)：>玩家消失效果 : 指定队员(变量) : 1 : 标准升起 : 60 : 168
 * 插件指令(旧)：>玩家消失效果 : 全部队员 : 标准升起 : 60 : 168
 * 插件指令(旧)：>事件消失效果 : 本事件 : 标准升起 : 60 : 168
 * 插件指令(旧)：>事件消失效果 : 指定事件 : 1 : 标准升起 : 60 : 168
 * 插件指令(旧)：>事件消失效果 : 指定事件(变量) : 1 : 标准升起 : 60 : 168
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 透明度检查
 * 你可以使用下面的插件指令。
 * 
 * 插件指令：>消失动作 : 玩家 : 透明度检查 : 开启
 * 插件指令：>消失动作 : 玩家 : 透明度检查 : 关闭
 * 插件指令：>消失动作 : 事件 : 透明度检查 : 开启
 * 插件指令：>消失动作 : 事件 : 透明度检查 : 关闭
 * 
 * 1.插件指令直接作用于所有事件、玩家、玩家队员。
 * 2.如果已经透明度为0了，你不想让他再播放一次动画，
 *   则开启"透明度检查"即可。开启后会阻止 消失动作 多次播放。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取状态
 * 你可以单独获取物体的状态信息，并赋值给开关或字符串：
 * 
 * 插件指令：>消失动作 : 玩家领队 : 是否正在播放 : 开关[21]
 * 插件指令：>消失动作 : 玩家队员[1] : 是否正在播放 : 开关[21]
 * 插件指令：>消失动作 : 玩家队员变量[21] : 是否正在播放 : 开关[21]
 * 插件指令：>消失动作 : 本事件 : 是否正在播放 : 开关[21]
 * 插件指令：>消失动作 : 事件[1] : 是否正在播放 : 开关[21]
 * 插件指令：>消失动作 : 事件变量[21] : 是否正在播放 : 开关[21]
 * 
 * 插件指令：>消失动作 : 事件[1] : 是否正在播放 : 开关[21]
 * 插件指令：>消失动作 : 事件[1] : 获取正在播放的类型 : 字符串[21]
 * 
 * 1.前半部分（事件）和 后半部分（是否正在播放 : 开关[21]）
 *   的参数可以随意组合。一共有6*2种组合方式。
 * 2.用开关值获取时，可以考虑设置并行执行时获取。
 * 3."字符串[21]"表示 字符串核心 中的字符串，
 *   如果当前没有播放的类型，则获取到 空字符串 。
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
 * 时间复杂度： o(n)*o(镜像)*o(贴图处理) 每帧
 * 测试方法：   行走图管理层放置10个动作变化的事件测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【15.19ms】
 *              100个事件的地图中，平均消耗为：【12.60ms】
 *               50个事件的地图中，平均消耗为：【8.90ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件经过一轮大优化，相比旧插件，减少了大概一半的性能消耗。
 *   不用担心设置太多事件并播放动作会卡的问题了。
 *   但还是留意播放动作的事件数量和消耗成正比，不要设置太多事件。
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
 * 修改了一些注释bug和内容bug。
 * [v1.4]
 * 添加了横向挤扁和纵向挤扁。
 * [v1.5]
 * 添加了插件指令获取状态信息功能。
 * [v1.6]
 * 添加了 直接消失、移动消失 功能。修复了执行指令时，会闪的bug。
 * [v1.7]
 * 优化了数学缩短锚点的计算公式。
 * [v1.8]
 * 优化了内部结构，减少性能消耗。
 * [v1.9]
 * 优化了旧存档的识别与兼容。
 * [v2.0]
 * 优化了内部结构，减小存档时数据占用的空间。
 *
 * 
 * 
 * @param 玩家默认透明度检查
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。开启后，会在玩家贴图透明度处于0时（已经消失时），阻止玩家的消失动作。
 * @default false
 * 
 * @param 事件默认透明度检查
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。开启后，会在事件贴图透明度处于0时（已经消失时），阻止事件的消失动作。
 * @default false
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EFOE（Event_Fade_Out_Effect）
//		临时全局变量	DrillUp.g_EFOE_xxx
//		临时局部变量	this._drill_EFOE_xxx
//		存储数据变量	$gameSystem._drill_EFOE_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(镜像)*o(贴图处理) 每帧
//		★性能测试因素	动作效果管理层
//		★性能测试消耗	2025/4/30：
//							》12.6ms（drill_EFOE_updateBitmap）8.9ms（drill_EFOE_updateEffect）
//		★最坏情况		所有事件都在执行动作。
//		★备注			插件已将动作函数全都分离了。因此播放动作时，指定函数能被性能测试捕获到。
//						插件的播放数据没被创建时，捕获不到任何消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			
//			->☆玩家队员控制
//				->关闭透明度同步
//			->☆物体贴图控制
//			->☆物体的属性
//				->数学锚点变换问题
//				->玩家setOpacity时包含修改队员透明度
//				->结构优化（换成Game_Character）
//			->☆消失动作
//				->搜索『消失动作』查看所有动作
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			7.行走图 > 关于动作效果（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.【行走图 - 行走图优化核心】已包含了 固定帧初始值 功能，所以这里只要累加变化即可。
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
	DrillUp.g_EFOE_PluginTip_curName = "Drill_EventFadeOutEffect.js 行走图-消失动作效果";
	DrillUp.g_EFOE_PluginTip_baseList = ["Drill_CoreOfEventFrame.js 行走图-行走图优化核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EFOE_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EFOE_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EFOE_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EFOE_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EFOE_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EFOE_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EFOE_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 时间计算不正确
	//==============================
	DrillUp.drill_EFOE_getPluginTip_allTimeError = function( playing_type ){
		return "【" + DrillUp.g_EFOE_PluginTip_curName + "】\n动作效果\""+playing_type+"\"播放失败，其配置的时间参数总和大于 总时间的值。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_EFOE_getPluginTip_ParamIsNaN = function( param_name, check_tank ){
		var text = "【" + DrillUp.g_EFOE_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
		if( check_tank ){
			var keys = Object.keys( check_tank );
			for( var i=0; i < keys.length; i++ ){
				text += "\n" + keys[i] + "的值：" + check_tank[ keys[i] ] ;
			}
		}
		return text;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventFadeOutEffect = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventFadeOutEffect');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_EFOE_p_opacityCheck = String(DrillUp.parameters["玩家默认透明度检查"] || "false") === "true";
	DrillUp.g_EFOE_e_opacityCheck = String(DrillUp.parameters["事件默认透明度检查"] || "false") === "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfEventFrame ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_EFOE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_EFOE_pluginCommand.call(this, command, args);
	this.drill_EFOE_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_EFOE_pluginCommand = function( command, args ){
	if( command === ">消失动作" ){ 
		
		/*-----------------透明度检查------------------*/
		if( args.length == 6 ){
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( unit == "玩家" && temp1 == "透明度检查" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
					$gameSystem._drill_EFOE_opacityCheck_player = true;
				}
				if( temp2 == "关闭" || temp2 == "禁用" ){
					$gameSystem._drill_EFOE_opacityCheck_player = false;
				}
			}
			if( unit == "事件" && temp1 == "透明度检查" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
					$gameSystem._drill_EFOE_opacityCheck_event = true;
				}
				if( temp2 == "关闭" || temp2 == "禁用" ){
					$gameSystem._drill_EFOE_opacityCheck_event = false;
				}
			}
		}
		
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
					if( $gameMap.drill_EFOE_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EFOE_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EFOE_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EFOE_isEventExist( e_id ) == false ){ return; }
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
				var p_id = $gameVariables.value(Number(unit));
				if( p_id == -2 ){  //『玩家id』
					p_chars = [ $gamePlayer ];
				}
				if( p_id > 0 ){  //『玩家队员id』
					var group = $gamePlayer.followers().visibleFollowers();
					p_chars = [];
					p_chars.push(group[ p_id-1 ]);
				}
			}
			if( p_chars == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var p_id = Number(unit);
				if( p_id == -2 ){  //『玩家id』
					p_chars = [ $gamePlayer ];
				}
				if( p_id > 0 ){  //『玩家队员id』
					var group = $gamePlayer.followers().visibleFollowers();
					p_chars = [];
					p_chars.push(group[ p_id-1 ]);
				}
			}
		}
		// > 透明度检查
		if( p_chars != null && $gameSystem._drill_EFOE_opacityCheck_player && $gamePlayer.opacity() == 0 ){
			p_chars = null;
		}
		if( e_chars != null && $gameSystem._drill_EFOE_opacityCheck_event ){
			var temp_tank = [];
			for( var k=0; k < e_chars.length; k++ ){
				if( e_chars[k].opacity() != 0 ){
					temp_tank.push( e_chars[k] );
				}
			}
			e_chars = temp_tank;
		}
		
		
		/*-----------------立即终止动作------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即终止动作" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_stopEffect();
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_stopEffect();
					}
				}
			}
		}
		/*-----------------获取状态------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "是否正在播放" ){
				temp1 = temp1.replace("开关[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				if( e_chars != null){
					var b = false;
					for( var k=0; k < e_chars.length; k++ ){
						b = e_chars[k].drill_EFOE_isPlaying();
					}
					$gameSwitches.setValue( temp1, b );
				}
				if( p_chars != null){
					var b = false;
					for( var k=0; k < p_chars.length; k++ ){
						b = p_chars[k].drill_EFOE_isPlaying();
					}
					$gameSwitches.setValue( temp1, b );
				}
			}
			if( type == "获取正在播放的类型" && Imported.Drill_CoreOfString ){	//【系统 - 字符串核心】
				temp1 = temp1.replace("字符串[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				if( e_chars != null){
					var str = false;
					for( var k=0; k < e_chars.length; k++ ){
						str = e_chars[k].drill_EFOE_getPlayingType();
					}
					$gameStrings.setValue( temp1, str );
				}
				if( p_chars != null){
					var str = false;
					for( var k=0; k < p_chars.length; k++ ){
						str = p_chars[k].drill_EFOE_getPlayingType();
					}
					$gameStrings.setValue( temp1, str );
				}
			}
		}
		
		
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			/*-----------------直接消失------------------*/
			if( type == "直接消失" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingDisappear( Number(temp1) );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingDisappear( Number(temp1) );
					}
				}
			}
			/*-----------------缩小消失------------------*/
			if( type == "缩小消失" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingShrink( Number(temp1), false );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingShrink( Number(temp1), false );
					}
				}
			}
			if( type == "缩小消失(不透明)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingShrink( Number(temp1), true );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingShrink( Number(temp1), true );
					}
				}
			}
		}
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			
			/*-----------------标准弹跳------------------*/
			if( type == "标准弹跳" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("高度[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingJump( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingJump( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------横向挤扁------------------*/
			if( type == "横向挤扁" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("横向比例[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingHorizonFlat( Number(temp1),Number(temp2), false );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingHorizonFlat( Number(temp1),Number(temp2), false );
					}
				}
			}
			if( type == "横向挤扁(不透明)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("横向比例[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingHorizonFlat( Number(temp1),Number(temp2), true );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingHorizonFlat( Number(temp1),Number(temp2), true );
					}
				}
			}
			/*-----------------纵向挤扁------------------*/
			if( type == "纵向挤扁" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("纵向比例[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingVerticalFlat( Number(temp1),Number(temp2), false );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingVerticalFlat( Number(temp1),Number(temp2), false );
					}
				}
			}
			if( type == "纵向挤扁(不透明)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("纵向比例[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingVerticalFlat( Number(temp1),Number(temp2), true );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingVerticalFlat( Number(temp1),Number(temp2), true );
					}
				}
			}
			/*-----------------向左炸飞------------------*/
			if( type == "向左炸飞" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("速度[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingBlowOutLeft( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingBlowOutLeft( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------向右炸飞------------------*/
			if( type == "向右炸飞" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("速度[","");
				temp2 = temp2.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingBlowOutRight( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingBlowOutRight( Number(temp1),Number(temp2) );
					}
				}
			}
		}
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			
			/*-----------------移动消失------------------*/
			if( type == "移动消失" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("方向角度[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("移动距离[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingMoveDisappear( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingMoveDisappear( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}
			/*-----------------标准升起------------------*/
			if( type == "标准升起" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("高度[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingSpring( Number(temp1),Number(temp3),Number(temp2) );
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingSpring( Number(temp1),Number(temp3),Number(temp2) );
					}
				}
			}
			/*-----------------弹性缩小消失------------------*/
			if( type == "弹性缩小消失" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("比例溢出[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("中心锚点[","");
				temp3 = temp3.replace("]","");
				var temp_arr = temp3.split(/[,，]/);
				if( temp_arr.length >= 2 && e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingShrinkSpring( Number(temp1),Number(temp2), Number(temp_arr[0]), Number(temp_arr[1]),  false );
					}
				}
				if( temp_arr.length >= 2 && p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingShrinkSpring( Number(temp1),Number(temp2), Number(temp_arr[0]), Number(temp_arr[1]),  false );
					}
				}
			}
			if( type == "弹性缩小消失(不透明)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("比例溢出[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("中心锚点[","");
				temp3 = temp3.replace("]","");
				var temp_arr = temp3.split(/[,，]/);
				if( temp_arr.length >= 2 && e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingShrinkSpring( Number(temp1),Number(temp2), Number(temp_arr[0]), Number(temp_arr[1]),  true );
					}
				}
				if( temp_arr.length >= 2 && p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingShrinkSpring( Number(temp1),Number(temp2), Number(temp_arr[0]), Number(temp_arr[1]),  true );
					}
				}
			}
			/*-----------------向左旋转倒下------------------*/
			if( type == "向左旋转倒下" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("倒下时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("消失时间[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingFallGroundLeft( Number(temp1), Number(temp2), Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingFallGroundLeft( Number(temp1), Number(temp2), Number(temp3) );
					}
				}
			}
			/*-----------------向右旋转倒下------------------*/
			if( type == "向右旋转倒下" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("倒下时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("消失时间[","");
				temp3 = temp3.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingFallGroundRight( Number(temp1), Number(temp2), Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingFallGroundRight( Number(temp1), Number(temp2), Number(temp3) );
					}
				}
			}
		}
		if( args.length == 12 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			var temp4 = String(args[11]);
			
			/*-----------------顺时针螺旋消失------------------*/
			if( type == "顺时针螺旋消失" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("最大螺旋半径[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("螺旋一圈时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("透明度变化时间[","");
				temp4 = temp4.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingSpiralMove( Number(temp1), 1, Number(temp2),Number(temp3),Number(temp4) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingSpiralMove( Number(temp1), 1, Number(temp2),Number(temp3),Number(temp4) );
					}
				}
			}
			/*-----------------逆时针螺旋消失------------------*/
			if( type == "逆时针螺旋消失" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("最大螺旋半径[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("螺旋一圈时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("透明度变化时间[","");
				temp4 = temp4.replace("]","");
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EFOE_playHidingSpiralMove( Number(temp1), -1, Number(temp2),Number(temp3),Number(temp4) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EFOE_playHidingSpiralMove( Number(temp1), -1, Number(temp2),Number(temp3),Number(temp4) );
					}
				}
			}
		}
	}
	
	
	
	/*-----------------------------------------*/
	/*-----------------旧指令------------------*/
	/*-----------------------------------------*/
	if (command === '>玩家消失效果') { // >玩家消失效果 : 领队 : 标准升起 : 60 : 168
		if(args.length == 6 || args.length == 8){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var time = Number(args[5]);
			if(args[7]){ var height = Number(args[7]); }
			if( $gamePlayer.opacity() == 0 && $gameSystem._drill_EFOE_opacityCheck_player){
				return;
			}
			if( temp1 == '领队' ){ 
				if( type == '标准升起' ){
					$gamePlayer.drill_EFOE_playHidingSpring(time,height);
				}
				if( type == '标准弹跳' ){
					$gamePlayer.drill_EFOE_playHidingJump(time,height);
				}
				if( type == '缩小消失' ){
					$gamePlayer.drill_EFOE_playHidingShrink(time);
				}
			}
			if( temp1 == '全部队员' ){ 
				if( type == '标准升起' ){
					$gamePlayer.drill_EFOE_playHidingSpring(time,height);
					$gamePlayer.followers().forEach(function(f){ f.drill_EFOE_playHidingSpring(time,height); },this);
				}
				if( type == '标准弹跳' ){
					$gamePlayer.drill_EFOE_playHidingJump(time,height);
					$gamePlayer.followers().forEach(function(f){ f.drill_EFOE_playHidingJump(time,height); },this);
				}
				if( type == '缩小消失' ){
					$gamePlayer.drill_EFOE_playHidingShrink(time);
					$gamePlayer.followers().forEach(function(f){ f.drill_EFOE_playHidingShrink(time); },this);
				}
			}
		}
		if(args.length == 8 || args.length == 10){
			var temp1 = String(args[1]);
			var temp2 = Number(args[3]);
			var type = String(args[5]);
			var time = Number(args[7]);
			if(args[9]){ var height = Number(args[9]); }
			var _followers = $gamePlayer.followers().visibleFollowers();
			_followers.unshift($gamePlayer);
			if( temp1 == '指定队员' ){
				if( temp2 < _followers.length ){
					if( _followers[temp2].opacity() == 0 && $gameSystem._drill_EFOE_opacityCheck_player){
						return;
					}
					if( type == '标准升起' ){
						_followers[temp2].drill_EFOE_playHidingSpring(time,height);
					}
					if( type == '标准弹跳' ){
						_followers[temp2].drill_EFOE_playHidingJump(time,height);
					}
					if( type == '缩小消失' ){
						_followers[temp2].drill_EFOE_playHidingShrink(time);
					}
				}
			}
			if( temp1 == '指定队员(变量)' ){ 
				temp2 = $gameVariables.value(temp2);
				if( temp2 < _followers.length ){
					if( _followers[temp2].opacity() == 0 && $gameSystem._drill_EFOE_opacityCheck_player){
						return;
					}
					if( type == '标准升起' ){
						_followers[temp2].drill_EFOE_playHidingSpring(time,height);
					}
					if( type == '标准弹跳' ){
						_followers[temp2].drill_EFOE_playHidingJump(time,height);
					}
					if( type == '缩小消失' ){
						_followers[temp2].drill_EFOE_playHidingShrink(time);
					}
				}
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type == '透明度检查开启' ){
				$gameSystem._drill_EFOE_opacityCheck_player = true;
			}
			if( type == '透明度检查关闭' ){
				$gameSystem._drill_EFOE_opacityCheck_player = false;
			}
		}
	}
	if (command === '>事件消失效果') { // >事件消失效果 : 本事件 : 标准升起 : 60 : 168
		if(args.length == 6 || args.length == 8){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var time = Number(args[5]);
			if(args[7]){ var height = Number(args[7]); }
			if( temp1 == '本事件' ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				if( e.opacity() == 0 && $gameSystem._drill_EFOE_opacityCheck_event){
					return;
				}
				if( type == '标准升起'){
					e.drill_EFOE_playHidingSpring(time,height);
				}
				if( type == '标准弹跳'  ){
					e.drill_EFOE_playHidingJump(time,height)
				}
				if( type == '缩小消失' ){
					e.drill_EFOE_playHidingShrink(time)
				}
			}
		}
		if(args.length == 8 || args.length == 10){
			var temp1 = String(args[1]);
			var temp2 = Number(args[3]);
			var type = String(args[5]);
			var time = Number(args[7]);
			if(args[9]){ var height = Number(args[9]); }
			if( temp1 == '指定事件' ){ 
				if( $gameMap.drill_EFOE_isEventExist( temp2 ) == false ){ return; }
				var e = $gameMap.event( temp2 );
				if( e.opacity() == 0 && $gameSystem._drill_EFOE_opacityCheck_event){
					return;
				}
				if( type == '标准升起' ){
					e.drill_EFOE_playHidingSpring(time,height);
				}
				if( type == '标准弹跳' ){
					e.drill_EFOE_playHidingJump(time,height);
				}
				if( type == '缩小消失' ){
					e.drill_EFOE_playHidingShrink(time);
				}
			}
			if( temp1 == '指定事件(变量)' ){ 
				var e_id = $gameVariables.value(temp2);
				if( $gameMap.drill_EFOE_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				if( e.opacity() == 0 && $gameSystem._drill_EFOE_opacityCheck_event){
					return;
				}
				if( type == '标准升起' ){
					e.drill_EFOE_playHidingSpring(time,height);
				}
				if( type == '标准弹跳' ){
					e.drill_EFOE_playHidingJump(time,height);
				}
				if( type == '缩小消失' ){
					e.drill_EFOE_playHidingShrink(time);
				}
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type == '透明度检查开启' ){
				$gameSystem._drill_EFOE_opacityCheck_event = true;
			}
			if( type == '透明度检查关闭' ){
				$gameSystem._drill_EFOE_opacityCheck_event = false;
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EFOE_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EFOE_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_EFOE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EFOE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EFOE_sys_initialize.call(this);
	this.drill_EFOE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EFOE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EFOE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EFOE_saveEnabled == true ){	
		$gameSystem.drill_EFOE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EFOE_initSysData();
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
Game_System.prototype.drill_EFOE_initSysData = function() {
	this.drill_EFOE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EFOE_checkSysData = function() {
	this.drill_EFOE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EFOE_initSysData_Private = function() {
	
	this._drill_EFOE_opacityCheck_player = DrillUp.g_EFOE_p_opacityCheck;
	this._drill_EFOE_opacityCheck_event = DrillUp.g_EFOE_e_opacityCheck;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EFOE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EFOE_opacityCheck_player == undefined ){
		this.drill_EFOE_initSysData();
	}
};


//=============================================================================
// ** ☆玩家队员控制
//
//			说明：	> 此模块专门控制 玩家队员 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 玩家队员控制 - 关闭透明度同步
//
//			说明：	> 玩家队员在帧刷新中会保持与 玩家 相同透明度，这里关掉。
//==============================
var _drill_EFOE_setOpacity = Game_Follower.prototype.setOpacity;
Game_Follower.prototype.setOpacity = function( opacity ){
	if( $gamePlayer.drill_EFOE_isPlaying() ){ return; }
	if( this.drill_EFOE_isPlaying() ){ return; }
	
	// > 原函数
	_drill_EFOE_setOpacity.call( this, opacity );
};
/*	2025-4-2 以前写的代码，忘了为什么要让 玩家队员 的帧刷新透明度同步 失效。这会导致没播放的动作也会受影响。
//==============================
// * 玩家队员控制 - 关闭透明度同步 - 标记1
//==============================
var _drill_EFOE_f_setMoveSpeed = Game_Follower.prototype.setMoveSpeed;
Game_Follower.prototype.setMoveSpeed = function( movespeed ){
	_drill_EFOE_f_setMoveSpeed.call( this, movespeed );
	this._drill_EFOE_opacityLock = true;
}
//==============================
// * 玩家队员控制 - 关闭透明度同步 - 标记2
//==============================
var _drill_EFOE_f_setBlendMode = Game_Follower.prototype.setBlendMode;
Game_Follower.prototype.setBlendMode = function( blendmode ){
	_drill_EFOE_f_setBlendMode.call( this, blendmode );
	this._drill_EFOE_opacityLock = undefined;
}
//==============================
// * 玩家队员控制 - 设置透明度
//==============================
var _drill_EFOE_p_setOpacity = Game_Player.prototype.setOpacity;
Game_Player.prototype.setOpacity = function( opacity ){
	_drill_EFOE_p_setOpacity.call( this,opacity );
	
	if( this._drill_EFOE_opacityAssignment == true ){	//（玩家setOpacity时包含修改队员透明度）
		var followers = this.followers().visibleFollowers();
		for(var i=0; i < followers.length; i++){
			followers[i].setOpacity(opacity);
		}
	}
}
//==============================
// * 玩家队员控制 - 设置透明度 - 标记
//==============================
var _drill_EFOE_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function( command ){
	
	if( command.code == Game_Character.ROUTE_CHANGE_OPACITY ){
		this._drill_EFOE_opacityAssignment = true;
	}
	
	// > 原函数
	_drill_EFOE_processMoveCommand.call( this,command );
	
	if( command.code == Game_Character.ROUTE_CHANGE_OPACITY ){
		this._drill_EFOE_opacityAssignment = undefined;
	}
}
*/


//=============================================================================
// ** ☆物体贴图控制
//
//			说明：	> 此模块专门控制 物体贴图 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体贴图控制 - 帧刷新
//==============================
var _drill_EFOE_s_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_drill_EFOE_s_update.call(this);
	if( this._character != undefined ){
		this.drill_EFOE_updateEffect();			//帧刷新 - 执行变换
		this.drill_EFOE_updateBitmap();			//帧刷新 - 获取资源宽高
	}
};
//==============================
// * 物体贴图控制 - 帧刷新 - 执行变换
//
//			说明：	> 【行走图 - 行走图优化核心】已包含了 固定帧初始值 功能，所以这里只要累加变化即可。
//==============================
Sprite_Character.prototype.drill_EFOE_updateEffect = function() {
	if( this._character.drill_EFOE_isPlaying() != true ){ return; }
	
	var sprite_data = this._character._drill_EFOE_spriteData;
												// 贴图 - 锚点X（不操作）
												// 贴图 - 锚点Y（不操作）
	this.x += sprite_data.x;					// 贴图 - 位置X
	this.y += sprite_data.y;					// 贴图 - 位置Y
	this.scale.x += sprite_data.scale_x;		// 贴图 - 缩放X
	this.scale.y += sprite_data.scale_y;		// 贴图 - 缩放Y
	this.opacity = sprite_data.opacity;			// 贴图 - 透明度
	//this.skew.x += sprite_data.skew_x;		// 贴图 - 斜切X
	//this.skew.y += sprite_data.skew_y;		// 贴图 - 斜切Y
	this.rotation += sprite_data.rotation;		// 贴图 - 旋转
}
//==============================
// * 物体贴图控制 - 帧刷新 - 获取资源宽高
//==============================
Sprite_Character.prototype.drill_EFOE_updateBitmap = function() {
	if( this.bitmap && this.bitmap.isReady() &&
		this._character._drill_EFOE_spriteData != undefined ){
		this._character._drill_EFOE_spriteData.real_width = this.patternWidth();
		this._character._drill_EFOE_spriteData.real_height = this.patternHeight();
	}
}


//=============================================================================
// ** ☆物体的属性
//
//			说明：	> 此模块专门管理 物体的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体的属性 - 初始化
//==============================
var _drill_EFOE_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	this._drill_EFOE_spriteData = undefined;
	this._drill_EFOE_param = undefined;
	_drill_EFOE_c_initialize.call(this);
}
//==============================
// * 物体的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Character.prototype.drill_EFOE_checkData = function() {
	
	// > 贴图属性
	if( this._drill_EFOE_spriteData == undefined ){
		this._drill_EFOE_spriteData = {};				//（不要用initMembers，follower没有这个方法）
		this._drill_EFOE_spriteData.anchor_x = 0.5;		// 锚点X
		this._drill_EFOE_spriteData.anchor_y = 1.0;		// 锚点Y
		this._drill_EFOE_spriteData.x = 0;				// 位置X
		this._drill_EFOE_spriteData.y = 0;				// 位置Y
		this._drill_EFOE_spriteData.scale_x = 0;		// 缩放X
		this._drill_EFOE_spriteData.scale_y = 0;		// 缩放Y
		this._drill_EFOE_spriteData.opacity = 255;		// 透明度（不叠加，【注意，这里是消失效果，默认255】）
		this._drill_EFOE_spriteData.skew_x = 0;			// 斜切X
		this._drill_EFOE_spriteData.skew_y = 0;			// 斜切Y
		this._drill_EFOE_spriteData.rotation = 0;		// 旋转
		
		this._drill_EFOE_spriteData.real_width = -1;	// 贴图宽
		this._drill_EFOE_spriteData.real_height = -1;	// 贴图高
	}
	
	// > 动作配置
	if( this._drill_EFOE_param == undefined ){
		this._drill_EFOE_param = {};
		this._drill_EFOE_param.playing_type = "";		// 显示类型
	}
}
//==============================
// * 物体的属性 - 帧刷新
//==============================
var _drill_EFOE_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_drill_EFOE_c_update.call(this);
	
	if( this._drill_EFOE_spriteData == undefined ){ return; }  		//需要等资源加载完成
	if( this._drill_EFOE_spriteData.real_width == -1 ){ return; }	//
	if( this._drill_EFOE_spriteData.real_height == -1 ){ return; }	//
	
	this.drill_EFOE_updateHidingDisappear();		//帧刷新 - 直接消失
	this.drill_EFOE_updateHidingMoveDisappear();	//帧刷新 - 移动消失
	this.drill_EFOE_updateHidingSpring();			//帧刷新 - 标准升起
	this.drill_EFOE_updateHidingJump();				//帧刷新 - 标准弹跳
	this.drill_EFOE_updateHidingShrink();			//帧刷新 - 缩小消失
	this.drill_EFOE_updateHidingHorizonFlat();		//帧刷新 - 横向挤扁
	this.drill_EFOE_updateHidingVerticalFlat();		//帧刷新 - 纵向挤扁
	this.drill_EFOE_updateHidingBlowOutLeft();		//帧刷新 - 向左炸飞
	this.drill_EFOE_updateHidingBlowOutRight();		//帧刷新 - 向右炸飞
	this.drill_EFOE_updateHidingShrinkSpring();		//帧刷新 - 弹性缩小消失
	this.drill_EFOE_updateHidingFallGroundLeft();	//帧刷新 - 向左旋转倒下
	this.drill_EFOE_updateHidingFallGroundRight();	//帧刷新 - 向右旋转倒下
	this.drill_EFOE_updateHidingSpiralMove();		//帧刷新 - 顺时针/逆时针螺旋消失
}

//==============================
// * 物体的属性 - 是否正在播放（开放函数）
//==============================
Game_Character.prototype.drill_EFOE_isPlaying = function() {
	if( this._drill_EFOE_param == undefined ){ return false; }
	if( this._drill_EFOE_param.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 物体的属性 - 获取正在播放的类型（开放函数）
//==============================
Game_Character.prototype.drill_EFOE_getPlayingType = function() {
	if( this._drill_EFOE_param == undefined ){ return ""; }
	return this._drill_EFOE_param.playing_type;
}
//==============================
// * 物体的属性 - 设置透明度（开放函数）
//==============================
Game_Character.prototype.drill_EFOE_setOpacity = function( opacity ){
	if( isNaN(opacity) ){
		alert( DrillUp.drill_EFOE_getPluginTip_ParamIsNaN( "opacity" ) );
	}
	this.setOpacity( opacity );
}
//==============================
// * 物体的属性 - 立即终止动作（开放函数）
//==============================
Game_Character.prototype.drill_EFOE_stopEffect = function() {
	this.drill_EFOE_setOpacity( 0 );
	this._drill_EFOE_spriteData = undefined;
	this._drill_EFOE_param = undefined;
}

//==============================
// * 物体的属性 - 数学工具 - 锁定锚点
//			
//			参数：	> org_anchor_x 数字    （原贴图锚点X）
//					> org_anchor_y 数字    （原贴图锚点Y）
//					> target_anchor_x 数字 （新的锚点X）
//					> target_anchor_y 数字 （新的锚点Y）
//					> width 数字           （贴图宽度）
//					> height 数字          （贴图高度）
//					> rotation 数字        （旋转度数，弧度）
//					> scale_x,scale_y 数字 （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字   （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }         （偏移的坐标）
//			
//			说明：	> 修正 旋转+缩放+斜切 的坐标，使其看起来像是在绕着 新的锚点 变换。
//					  旋转+缩放+斜切 可为负数。
//==============================
Game_Temp.prototype.drill_EFOE_Math2D_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图锚点 
					target_anchor_x,target_anchor_y, 	//新的锚点 
					width, height,						//贴图高宽
					rotation,							//变换的值（旋转）
					scale_x, scale_y,					//变换的值（缩放）
					skew_x, skew_y  ){					//变换的值（斜切）
	
	if( scale_x == undefined ){ scale_x = 1; }
	if( scale_y == undefined ){ scale_y = 1; }
	if( skew_x == undefined ){ skew_x = 0; }
	if( skew_y == undefined ){ skew_y = 0; }
	
	// > 参数准备 （来自 Pixi.Transform）
    var _cx = 1; // cos rotation + skewY;
    var _sx = 0; // sin rotation + skewY;
    var _cy = 0; // cos rotation + Math.PI/2 - skewX;
    var _sy = 1; // sin rotation + Math.PI/2 - skewX;
	
	// > 旋转+斜切 （来自 Pixi.Transform.prototype.updateSkew）
    _cx = Math.cos( rotation + skew_y );
    _sx = Math.sin( rotation + skew_y );
    _cy = -Math.sin( rotation - skew_x ); // cos, added PI/2
    _sy = Math.cos( rotation - skew_x ); // sin, added PI/2
	
	// > 缩放 （来自 Pixi.Transform.prototype.updateLocalTransform）
    var a = _cx * scale_x;
    var b = _sx * scale_x;
    var c = _cy * scale_y;
    var d = _sy * scale_y;
	
	// > 将参数应用到坐标
	var cur_x = width  * target_anchor_x;
	var cur_y = height * target_anchor_y;
	var center_x = width  * org_anchor_x;
	var center_y = height * org_anchor_y;
	var dx = (center_x - cur_x);
	var dy = (center_y - cur_y);
    var tar_x = cur_x + (dx * a + dy * c) - center_x;
    var tar_y = cur_y + (dx * b + dy * d) - center_y;
	
	return { "x":tar_x, "y":tar_y };
}
//==============================
// * 物体的属性 - 数学工具 - 抛物线三点式
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//					> x3,y3 数字（点C）
//			返回：	> { a:0, b:0, c:0 } （抛物线公式的abc）
//			
//			说明：	已知三点，返回抛物线公式 y = a*x^2 + b*x + c 的abc值。
//==============================
Game_Temp.prototype.drill_EFOE_Math2D_getParabolicThree = function( x1,y1,x2,y2,x3,y3 ){
	
	var b = ((x2*x2 - x3*x3)*(y1 - y2) - (x1*x1 - x2*x2)*(y2 - y3)) / ((x2*x2 - x3*x3)*(x1 - x2) - (x1*x1 - x2*x2)*(x2 - x3));
	var a = (y1 - y2 - b*(x1 - x2)) / (x1*x1 - x2*x2);
	var c = y1 - a*x1*x1 - b*x1;
	
	return { "a":a, "b":b, "c":c };
}



//=============================================================================
// ** ☆消失动作
//
//			说明：	> 此模块专门管理 消失动作 的设置。
//					> 不考虑转控制器结构，且不考虑自定义变换扩展，只硬编码的公式控制变换动画。
//					> 此模块的代码 在其他同类插件中一模一样，只要替换 类名和简称 即可。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 『消失动作』直接消失 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingDisappear = function( allTime ){
	this.drill_EFOE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "直接消失";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『消失动作』直接消失 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingDisappear = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "直接消失" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		// > 透明度变化
		s_data.opacity = 255 *(1 - p_data.fA_time/p_data.fA_dest);
		this.drill_EFOE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};

//==============================
// * 『消失动作』移动消失 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingMoveDisappear = function( allTime,angle,distance ){
	this.drill_EFOE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "移动消失";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_angle = angle;
	p_data.fA_distance = distance;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『消失动作』移动消失 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingMoveDisappear = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "移动消失" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		// > 匀速移动
		var temp_d = p_data.fA_distance * p_data.fA_time/p_data.fA_dest;
		s_data.x = temp_d * Math.cos( p_data.fA_angle *Math.PI/180 );
		s_data.y = temp_d * Math.sin( p_data.fA_angle *Math.PI/180 );
		
		// > 透明度变化
		s_data.opacity = 255 *(1 - p_data.fA_time/p_data.fA_dest);
		this.drill_EFOE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};

//==============================
// * 『消失动作』标准升起 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingSpring = function( allTime,height,bufferTime ){
	this.drill_EFOE_checkData();
	if( bufferTime == undefined ){ bufferTime = 20; }
	if( allTime < bufferTime ){
		alert( DrillUp.drill_EFOE_getPluginTip_allTimeError("标准升起") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "标准升起";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime - bufferTime;
	p_data.fA_distance = -1 * height;
	p_data.fA_a = 2*p_data.fA_distance/p_data.fA_dest/p_data.fA_dest;	//加速度公式
	p_data.fB_time = 0;
	p_data.fB_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『消失动作』标准升起 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingSpring = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "标准升起" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fB_time <= p_data.fB_dest ){
		p_data.fB_time ++;
		
		// > 向下挤压
		var t = p_data.fB_time;
		var a = 0.8 / p_data.fB_dest / p_data.fB_dest;	//固定压缩0.2比例
		var b = -1 * a * p_data.fB_dest;
		var c = 0;
		s_data.scale_x = -1*(a*p_data.fB_time*p_data.fB_time + b*p_data.fB_time + c);
		s_data.scale_y = -s_data.scale_x;
		s_data.y = 0;
		s_data.opacity = 255;
		this.drill_EFOE_setOpacity(s_data.opacity);
		
	}else if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		// > 加速上升+透明度变化
		var t = p_data.fA_time;
		s_data.y = p_data.fA_a*t*t/2;
		s_data.opacity = 255 * (p_data.fA_dest - p_data.fA_time) /p_data.fA_dest * 2 ;
		this.drill_EFOE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};


//==============================
// * 『消失动作』标准弹跳 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingJump = function( allTime, height ){
	this.drill_EFOE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "标准弹跳";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_a = -4*height/allTime/allTime;	//抛物线公式 y = ax2 + bx +c（一样）
	p_data.fA_b = 4*height/allTime;	
	p_data.fA_c = 0;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『消失动作』标准弹跳 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingJump = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "标准弹跳" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest/2 ){		//通用一个公式，只是根据顶点值分成了两份
		p_data.fA_time ++;
		var t = p_data.fA_time;
		s_data.y = -1*(p_data.fA_a*t*t + p_data.fA_b*t + p_data.fA_c);
		s_data.opacity = 255 ;
		this.drill_EFOE_setOpacity(s_data.opacity);
	}else if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		var t = p_data.fA_time;
		s_data.y = -1*(p_data.fA_a*t*t + p_data.fA_b*t + p_data.fA_c);
		if(s_data.y >0){ s_data.y = 0; }
		s_data.opacity = 255 - 255 * (p_data.fA_time - p_data.fA_dest/2 ) /p_data.fA_dest*2 ;
		this.drill_EFOE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};


//==============================
// * 『消失动作』缩小消失 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingShrink = function( allTime, opacity_off ){
	this.drill_EFOE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "缩小消失";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_sa = 2/allTime/allTime/2;		//匀加速公式 scale = 1/2 * at2
	p_data.fA_sb = 0;
	p_data.fA_sc = 0;
	p_data.fA_ya = 20/allTime/allTime/2;	//抛物线公式 y = ax2 + bx +c
	p_data.fA_yb = 0;
	p_data.fA_yc = 0;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_opacityOff = opacity_off;
};
//==============================
// * 『消失动作』缩小消失 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingShrink = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "缩小消失" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		var t = p_data.fA_time;
		
		s_data.y = 20 -1*(p_data.fA_ya*t*t + p_data.fA_yb*t + p_data.fA_yc);	//抛物线
		s_data.scale_x = - p_data.fA_sa*t*t - p_data.fA_sb*t + p_data.fA_sc;	//匀加速放大
		s_data.scale_y = s_data.scale_x;
		if(s_data.y >0){ s_data.y = 0;}
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_EFOE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = s_data.y + fix_point.y;

		// > 透明度变化
		if( p_data.f_opacityOff == true ){
			s_data.opacity = 255
			this.drill_EFOE_setOpacity(255);
		}else{
			s_data.opacity = 255 - 255 * p_data.fA_time /p_data.fA_dest;
			this.drill_EFOE_setOpacity(s_data.opacity);
		}
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};


//==============================
// * 『消失动作』横向挤扁 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingHorizonFlat = function( allTime, scale_x, opacity_off ){
	this.drill_EFOE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "横向挤扁";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_scale_x = scale_x - 1.0;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_opacityOff = opacity_off;
};
//==============================
// * 『消失动作』横向挤扁 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingHorizonFlat = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "横向挤扁" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		s_data.scale_x = p_data.fA_scale_x * p_data.fA_time/p_data.fA_dest ;
		s_data.scale_y = -1.0 * p_data.fA_time/p_data.fA_dest ;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_EFOE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
		
		// > 透明度变化
		if( p_data.f_opacityOff == true ){
			s_data.opacity = 255
			this.drill_EFOE_setOpacity(255);
		}else{
			s_data.opacity = 255 - 255 * p_data.fA_time /p_data.fA_dest ;
			this.drill_EFOE_setOpacity(s_data.opacity);
		}
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};

//==============================
// * 『消失动作』纵向挤扁 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingVerticalFlat = function( allTime, scale_y, opacity_off ){
	this.drill_EFOE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "纵向挤扁";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_scale_y = scale_y - 1.0;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_opacityOff = opacity_off;
};
//==============================
// * 『消失动作』纵向挤扁 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingVerticalFlat = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "纵向挤扁" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		s_data.scale_x = -1.0 * p_data.fA_time/p_data.fA_dest ;
		s_data.scale_y = p_data.fA_scale_y * p_data.fA_time/p_data.fA_dest ;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_EFOE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
		
		// > 透明度变化
		if( p_data.f_opacityOff == true ){
			s_data.opacity = 255
			this.drill_EFOE_setOpacity(255);
		}else{
			s_data.opacity = 255 - 255 * p_data.fA_time /p_data.fA_dest ;
			this.drill_EFOE_setOpacity(s_data.opacity);
		}
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};


//==============================
// * 『消失动作』向左炸飞 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingBlowOutLeft = function( allTime, speed ){
	this.drill_EFOE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "向左炸飞";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_speedX = speed;
	p_data.fA_speedY = speed * 0.5;
	p_data.fA_rotate = Math.PI/2 + Math.PI/4;	//135度
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『消失动作』向左炸飞 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingBlowOutLeft = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "向左炸飞" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		s_data.x = -1 * p_data.fA_speedX * p_data.fA_time ;
		s_data.y = -1 *(p_data.fA_speedY*p_data.fA_time - p_data.fA_speedY*0.015 *p_data.fA_time*p_data.fA_time);	//抛物线公式
		s_data.rotation = -1*(p_data.fA_rotate * p_data.fA_time/p_data.fA_dest);
		
		// > 透明度变化
		s_data.opacity = 255 - 255 * p_data.fA_time /p_data.fA_dest ;
		this.drill_EFOE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};

//==============================
// * 『消失动作』向右炸飞 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingBlowOutRight = function( allTime, speed ){
	this.drill_EFOE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "向右炸飞";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_speedX = speed;
	p_data.fA_speedY = speed * 0.5;
	p_data.fA_rotate = Math.PI/2 + Math.PI/4;	//135度
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『消失动作』向右炸飞 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingBlowOutRight = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "向右炸飞" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		s_data.x = p_data.fA_speedX * p_data.fA_time ;
		s_data.y = -1 *(p_data.fA_speedY*p_data.fA_time - p_data.fA_speedY*0.015 *p_data.fA_time*p_data.fA_time);	//抛物线公式
		s_data.rotation = (p_data.fA_rotate * p_data.fA_time/p_data.fA_dest);
		
		// > 透明度变化
		s_data.opacity = 255 - 255 * p_data.fA_time /p_data.fA_dest ;
		this.drill_EFOE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};


//==============================
// * 『消失动作』弹性缩小消失 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingShrinkSpring = function( allTime, overflow_scale, anchor_x, anchor_y, opacity_off ){
	this.drill_EFOE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "弹性缩小消失";
	p_data.fA_time = 0;	
	p_data.fA_dest = allTime;
	p_data.fA_anchor_x = anchor_x;
	p_data.fA_anchor_y = anchor_y;
	p_data.fA_abc = $gameTemp.drill_EFOE_Math2D_getParabolicThree( 0,0, allTime*0.2,overflow_scale, allTime,-1 );
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_opacityOff = opacity_off;
};
//==============================
// * 『消失动作』弹性缩小消失 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingShrinkSpring = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "弹性缩小消失" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		var time = p_data.fA_time;
		
		var dt = p_data.fA_dest;		//计算 落脚点
		var a = 2 / dt / dt;			//（匀减速移动到目标值）
		var c_time = dt - time;
		var per_step = 0.5 * a * dt * dt - 0.5 * a * c_time * c_time ;
		
		//【不要用分段函数，分段函数必然有 锯齿感 和 不和谐感 】
		
		// > 落脚点分配缩放值（三点抛物线）
		s_data.scale_x = p_data.fA_abc['a']*time*time + p_data.fA_abc['b']*time + p_data.fA_abc['c'];
		s_data.scale_y = s_data.scale_x;
		
		// > 锚点锁定
		var fix_point = $gameTemp.drill_EFOE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, p_data.fA_anchor_x, p_data.fA_anchor_y, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
		
		// > 透明度变化
		if( p_data.f_opacityOff == true ){
			s_data.opacity = 255
			this.drill_EFOE_setOpacity(255);
		}else{
			s_data.opacity = 255 - 255 * p_data.fA_time /p_data.fA_dest ;
			this.drill_EFOE_setOpacity(s_data.opacity);
		}
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};


//==============================
// * 『消失动作』向左旋转倒下 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingFallGroundLeft = function( allTime, fallTime, hideTime ){
	this.drill_EFOE_checkData();
	if( allTime < fallTime + hideTime ){
		alert( DrillUp.drill_EFOE_getPluginTip_allTimeError("向左旋转倒下") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "向左旋转倒下";
	p_data.fA_time = 0;
	p_data.fA_dest = fallTime;
	p_data.fA_rotate = -1 * Math.PI/2;	//-90度
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -fallTime -hideTime;
	p_data.fC_time = 0;
	p_data.fC_dest = hideTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『消失动作』向左旋转倒下 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingFallGroundLeft = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "向左旋转倒下" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		// > 旋转
		s_data.rotation = (p_data.fA_rotate * p_data.fA_time/p_data.fA_dest);
		// > 旋转 - 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_EFOE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
		
		// > 透明度变化
		s_data.opacity = 255;
		this.drill_EFOE_setOpacity(s_data.opacity);
		
	}else if( p_data.fB_time < p_data.fB_dest ){
		p_data.fB_time ++;
		
		// > 透明度变化
		s_data.opacity = 255;
		this.drill_EFOE_setOpacity(s_data.opacity);
		
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		
		// > 透明度变化
		s_data.opacity = 255 - 255 * p_data.fC_time /p_data.fC_dest ;
		this.drill_EFOE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};

//==============================
// * 『消失动作』向右旋转倒下 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingFallGroundRight = function( allTime, fallTime, hideTime ){
	this.drill_EFOE_checkData();
	if( allTime < fallTime + hideTime ){
		alert( DrillUp.drill_EFOE_getPluginTip_allTimeError("向右旋转倒下") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "向右旋转倒下";
	p_data.fA_time = 0;
	p_data.fA_dest = fallTime;
	p_data.fA_rotate = Math.PI/2;	//90度
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -fallTime -hideTime;
	p_data.fC_time = 0;
	p_data.fC_dest = hideTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『消失动作』向右旋转倒下 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingFallGroundRight = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "向右旋转倒下" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		// > 旋转
		s_data.rotation = (p_data.fA_rotate * p_data.fA_time/p_data.fA_dest);
		// > 旋转 - 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_EFOE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
		
		// > 透明度变化
		s_data.opacity = 255;
		this.drill_EFOE_setOpacity(s_data.opacity);
		
	}else if( p_data.fB_time < p_data.fB_dest ){
		p_data.fB_time ++;
		
		// > 透明度变化
		s_data.opacity = 255;
		this.drill_EFOE_setOpacity(s_data.opacity);
		
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		
		// > 透明度变化
		s_data.opacity = 255 - 255 * p_data.fC_time /p_data.fC_dest ;
		this.drill_EFOE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};

//==============================
// * 『消失动作』顺时针/逆时针螺旋消失 - 初始化
//==============================
Game_Character.prototype.drill_EFOE_playHidingSpiralMove = function( allTime, numDirection, radius, spiralTime, hideTime ){
	this.drill_EFOE_checkData();
	if( allTime < hideTime ){
		alert( DrillUp.drill_EFOE_getPluginTip_allTimeError("顺时针/逆时针螺旋消失") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_EFOE_param;
	p_data.playing_type = "顺时针/逆时针螺旋消失";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_period = spiralTime;
	p_data.fA_radius = radius;
	p_data.fA_hideTime = hideTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_numDirection = numDirection;
};
//==============================
// * 『消失动作』顺时针/逆时针螺旋消失 - 帧刷新
//==============================
Game_Character.prototype.drill_EFOE_updateHidingSpiralMove = function() {
	var p_data = this._drill_EFOE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "顺时针/逆时针螺旋消失" ){ return; }
	var s_data = this._drill_EFOE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 圆周移动
	p_data.fA_time ++;
	var cur_radius = p_data.fA_radius *p_data.fA_time/p_data.fA_dest;
	var cur_rotation = 360*Math.PI/180 *p_data.fA_time/p_data.fA_period;
	cur_rotation *= p_data.f_numDirection;
	s_data.x = cur_radius*Math.cos(cur_rotation);
	s_data.y = cur_radius*Math.sin(cur_rotation);
	
	// > 透明度变化
	var left_time = p_data.fA_dest - p_data.fA_time;
	if( left_time < p_data.fA_hideTime ){
		s_data.opacity = 255 *left_time/p_data.fA_hideTime;
		this.drill_EFOE_setOpacity(s_data.opacity);
	}else{
		s_data.opacity = 255
		this.drill_EFOE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_EFOE_stopEffect();
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventFadeOutEffect = false;
		var pluginTip = DrillUp.drill_EFOE_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


