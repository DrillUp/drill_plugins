//=============================================================================
// Drill_EventFadeOutEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        行走图 - 消失动作效果
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
 *   (1.所有动作都是并行的，你可能需要手动加等待时间。
 *   (2.所有 消失动作 都可以与持续动作效果叠加，但不包括透明度的叠加。
 *      消失动作 同时只能播放一种。
 *   (3.如果你指定了一个队员消失，那么该队员将会长期不可见，因为透明
 *      度为0。需要执行显示效果或者修改透明度，才能复原。
 *   (4.该效果可以与 滤镜效果、方块粉碎效果 叠加。
 * 指令：
 *   (1.消失动作固定为：从 完全不透明 到 完全透明 的过程。
 *      动作结束后，对象的透明度将变为0。
 *   (2.不同类型动作的参数和指令有较大区别。
 *      如果指令的参数名和参数数量不匹配，则动作不会被执行。
 * 透明度：
 *   (1.开启"透明度检查"后，如果事件的透明度为0，则动作会被阻止播放。
 *   (2.该插件只影响事件的 透明度 ，并不控制 透明状态 。
 *      若透明状态为ON时，事件直接不可见，动作也不可见。
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
 * 插件指令：>消失动作 : 玩家 : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 玩家领队 : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 玩家全员 : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 玩家队员[1] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 玩家队员变量[21] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 本事件 : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 事件[1] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 事件变量[1] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 批量事件[10,11] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 批量事件变量[21,22] : 标准弹跳 : 时间[60] : 高度[168]
 * 
 * 插件指令：>消失动作 : 本事件 : 直接消失 : 时间[60]
 * 插件指令：>消失动作 : 本事件 : 移动消失 : 时间[60] : 方向角度[90] : 移动距离[100]
 * 插件指令：>消失动作 : 本事件 : 标准升起 : 时间[60] : 缓冲时间[20] : 高度[168]
 * 插件指令：>消失动作 : 本事件 : 标准弹跳 : 时间[60] : 高度[500]
 * 插件指令：>消失动作 : 本事件 : 向左炸飞 : 时间[60] : 速度[11.5]
 * 插件指令：>消失动作 : 本事件 : 向右炸飞 : 时间[60] : 速度[11.5]
 * 插件指令：>消失动作 : 本事件 : 横向挤扁 : 时间[60] : 横向比例[1.5]
 * 插件指令：>消失动作 : 本事件 : 横向挤扁(不透明) : 时间[60] : 横向比例[1.5]
 * 插件指令：>消失动作 : 本事件 : 纵向挤扁 : 时间[60] : 纵向比例[1.5]
 * 插件指令：>消失动作 : 本事件 : 纵向挤扁(不透明) : 时间[60] : 纵向比例[1.5]
 * 插件指令：>消失动作 : 本事件 : 缩小消失 : 时间[60]
 * 插件指令：>消失动作 : 本事件 : 缩小消失(不透明) : 时间[60]
 * 插件指令：>消失动作 : 本事件 : 弹性缩小消失 : 时间[60] : 比例溢出[0.2] : 中心锚点[0.5,1.0]
 * 插件指令：>消失动作 : 本事件 : 弹性缩小消失(不透明) : 时间[60] : 比例溢出[0.2] : 中心锚点[0.5,1.0]
 * 插件指令：>消失动作 : 本事件 : 立即终止动作
 * 
 * 1.前半部分（玩家）和 后半部分（标准升起 : 时间[60] : 缓冲时间[20] : 高度[168]）
 *   的参数可以随意组合。一共有10*15种组合方式。
 * 2."玩家"和"玩家领队"是同一个意思。
 *   "玩家队员[1]"表示领队后面第一个跟随的队友。
 * 3.参数中"时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"距离"、"高度"的单位是像素。
 * 4.类型的更详细介绍，去看看 "7.行走图 > 关于动作效果.docx"。
 * 5.部分类型的动作有 时间和缓冲时间 两个设置，该动作分两个阶段。
 *   比如"标准升起"，分别对应升起的动作时间，和升起前阶段起跳效果的缓冲时间。
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
 * 如果有的事件已经是透明度为255了，你不想让他再播放一次出现动画，你可以使用
 * 下面的插件指令。
 * 
 * 插件指令：>消失动作 : 玩家 : 透明度检查 : 开启
 * 插件指令：>消失动作 : 玩家 : 透明度检查 : 关闭
 * 插件指令：>消失动作 : 事件 : 透明度检查 : 开启
 * 插件指令：>消失动作 : 事件 : 透明度检查 : 关闭
 * 
 * 1.插件指令直接作用于所有玩家，或者所有事件。
 * 2.开启检查后，如果当前事件透明度为255，出现动作不会起作用。
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
 * 3."字符串[21]"表示 字符串核心 中字符串，
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
 * 测试结果：   200个事件的地图中，平均消耗为：【85.19ms】
 *              100个事件的地图中，平均消耗为：【46.21ms】
 *               50个事件的地图中，平均消耗为：【38.16ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件对镜像也有效果，该测试是包括镜像一起测试的结果。
 *   由于持续变化的事件数量和消耗几乎成正比，所以放20个以上电脑就带不动了。
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
//		★性能测试因素	行走图管理层
//		★性能测试消耗	39.91ms（Sprite_Character.update）
//		★最坏情况		所有事件都在执行动作。
//		★备注			从原理上看，变化并没有那么复杂，只是图像一直在变。
//						类似于滤镜，但没有滤镜消耗复杂。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			消失动作效果：
//				->动作
//					->标准升起
//					->标准弹跳
//					->缩小消失
//					->横向挤扁
//					->纵向挤扁
//					->向左炸飞
//					->向右炸飞
//					->翻转消失	x
//					->地面升起	x
//				->其他
//					->数学锚点变换问题
//					->取消跟随队员的透明度绑定
//					->玩家setOpacity时包含修改队员透明度
//					->结构优化（换成Game_Character）
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.变化原理为：每帧都【固定初始值】，然后适时赋值公式变化值。
//			  该插件限定透明度 255->0 的变化。
//			2.由于函数中没有【Game_Character.prototype.update】，所以继承时要用【Game_CharacterBase.prototype.update】。
//			  之前继承了这个没有的函数，造成了举起物体插件出问题。
//
//		★其它说明细节：
//			1.事件的锚点固定为(0.5,1)。
//			2.需要改变x,y,opacity,rotation,scale_x,scale_y的值，并且毫无损失地复原。
//			  另外，对齐每一个插件指令，也是比较头疼的问题。
//			  结构并不复杂，只是内容划分太多。	
//			3.队伍透明度统一存在麻烦的地方，队长的透明度每帧都会分配给跟随者。
//			  目前只设置了播放动作的时候，透明度才不统一。
//			4.继承Game_Character不要用initMembers，因为follower不会调用这个方法。
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
	DrillUp.g_EFOE_PluginTip_curName = "Drill_EventFadeOutEffect.js 行走图-消失动作效果";
	DrillUp.g_EFOE_PluginTip_baseList = ["Drill_CoreOfEventFrame.js 行走图-行走图优化核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
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
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_EFOE_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_EFOE_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** 静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventFadeOutEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventFadeOutEffect');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_EFOE_p_opacityCheck = String(DrillUp.parameters['玩家默认透明度检查'] || "false") === "true";
	DrillUp.g_EFOE_e_opacityCheck = String(DrillUp.parameters['事件默认透明度检查'] || "false") === "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfEventFrame ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_EFOE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_EFOE_pluginCommand.call(this, command, args);
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
						str = e_chars[k]._Drill_EFOE.playing_type;
					}
					$gameStrings.setValue( temp1, str );
				}
				if( p_chars != null){
					var str = false;
					for( var k=0; k < p_chars.length; k++ ){
						str = p_chars[k]._Drill_EFOE.playing_type;
					}
					$gameStrings.setValue( temp1, str );
				}
			}
			
			/*-----------------直接消失------------------*/
			if( type == "直接消失" ){
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
		}	
			
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			
			/*-----------------移动消失------------------*/
			if( type == "移动消失" ){
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
			
		}
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			/*-----------------标准弹跳------------------*/
			if( type == "标准弹跳" ){
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
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			/*-----------------缩小消失------------------*/
			if( type == "缩小消失" ){
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
// ** 插件指令 - 事件检查
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


//=============================================================================
// * 数学工具 - 锁定锚点
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
//=============================================================================
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
//=============================================================================
// * 数学工具 - 抛物线三点式
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//					> x3,y3 数字（点C）
//			返回：	> { a:0, b:0, c:0 } （抛物线公式的abc）
//			
//			说明：	已知三点，返回抛物线公式 y = a*x^2 + b*x + c 的abc值。
//=============================================================================
Game_Temp.prototype.drill_EFOE_Math2D_getParabolicThree = function( x1,y1,x2,y2,x3,y3 ){
	
	var b = ((x2*x2 - x3*x3)*(y1 - y2) - (x1*x1 - x2*x2)*(y2 - y3)) / ((x2*x2 - x3*x3)*(x1 - x2) - (x1*x1 - x2*x2)*(x2 - x3));
	var a = (y1 - y2 - b*(x1 - x2)) / (x1*x1 - x2*x2);
	var c = y1 - a*x1*x1 - b*x1;
	
	return { "a":a, "b":b, "c":c };
}


//#############################################################################
// ** 【标准模块】存储数据
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
// ** 跟随者
//=============================================================================
//==============================
// * 跟随者 - 透明度同步
//==============================
var _drill_EFOE_setOpacity = Game_Follower.prototype.setOpacity;
Game_Follower.prototype.setOpacity = function(opacity) {
	if( $gamePlayer.drill_EFOE_isPlaying() ){ return; }
	if( this.drill_EFOE_isPlaying() ){ return; }
	if( this._Drill_EFOE._opacityLock == true ){ return; }	//使得 原函数 失效
	_drill_EFOE_setOpacity.call( this,opacity );
};
//==============================
// * 跟随者 - 锚点A
//==============================
var _drill_EFOE_f_setMoveSpeed = Game_Follower.prototype.setMoveSpeed;
Game_Follower.prototype.setMoveSpeed = function( movespeed ) {
	_drill_EFOE_f_setMoveSpeed.call( this,movespeed );
	this._Drill_EFOE._opacityLock = true;
}
//==============================
// * 跟随者 - 锚点B
//==============================
var _drill_EFOE_f_setBlendMode = Game_Follower.prototype.setBlendMode;
Game_Follower.prototype.setBlendMode = function( blendmode ) {
	_drill_EFOE_f_setBlendMode.call( this,blendmode );
	this._Drill_EFOE._opacityLock = false;
}
//==============================
// * 玩家 - 设置透明度
//==============================
var _drill_EFOE_p_setOpacity = Game_Player.prototype.setOpacity;
Game_Player.prototype.setOpacity = function( opacity ) {
	_drill_EFOE_p_setOpacity.call( this,opacity );
	
	if( this._Drill_EFOE._opacityAssignment == true ){	//玩家setOpacity时包含修改队员透明度
		var followers = this.followers().visibleFollowers();
		for(var i=0; i < followers.length; i++){
			followers[i].setOpacity(opacity);
		}
	}
}
//==============================
// * 玩家 - 锚点
//==============================
var _drill_EFOE_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
	if( command.code == Game_Character.ROUTE_CHANGE_OPACITY ){
		this._Drill_EFOE._opacityAssignment = true;
	}
	_drill_EFOE_processMoveCommand.call( this,command );
	if( command.code == Game_Character.ROUTE_CHANGE_OPACITY ){
		this._Drill_EFOE._opacityAssignment = false;
	}
}

//=============================================================================
// ** 事件贴图
//
//			说明：	行走图的动作变化支持镜像反射。
//=============================================================================
//==============================
// * 事件贴图 - 初始化
//==============================
var _Drill_EFOE_s_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {
	_Drill_EFOE_s_setCharacter.call(this,character);
	if( character ){ this._Drill_EFOE = character._Drill_EFOE; };
};

//==============================
// * 事件贴图 - 帧刷新
//==============================
var _Drill_EFOE_s_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_Drill_EFOE_s_update.call(this);
	if ( this._character && this._Drill_EFOE ) {
		this.drill_EFOE_updateEffect();			//执行变换
		this.drill_EFOE_updateBitmap();			//获取图片宽高
	}
};
//==============================
// * 帧刷新 - 执行变换
//==============================
Sprite_Character.prototype.drill_EFOE_updateEffect = function() {
	if( !this._character.drill_EFOE_isPlaying() ){ return; }
	
	this.x += this._Drill_EFOE.x ;					// x
	this.y += this._Drill_EFOE.y ;					// y
	this.rotation += this._Drill_EFOE.rotation;		// 旋转
	this.scale.x += this._Drill_EFOE.scale_x;		// 缩放x
	this.scale.y += this._Drill_EFOE.scale_y;		// 缩放y
	//this.skew.x += this._Drill_EFOE.skew_x;		// 斜切x
	//this.skew.y += this._Drill_EFOE.skew_y;		// 斜切y
	
	this.opacity = this._Drill_EFOE.opacity;		// 透明度
}
//==============================
// * 帧刷新 - 获取图片宽高
//==============================
Sprite_Character.prototype.drill_EFOE_updateBitmap = function() {
	if( this.bitmap && this.bitmap.isReady() ){
		this._Drill_EFOE.real_width = this.patternWidth();
		this._Drill_EFOE.real_height = this.patternHeight();
	}
}


//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _Drill_EFOE_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_Drill_EFOE_c_initialize.call(this);
	this._Drill_EFOE = {};					//（不要用initMembers，follower没有这个方法）
	this._Drill_EFOE.x = 0;					// x
	this._Drill_EFOE.y = 0;					// y
	this._Drill_EFOE.rotation = 0;			// 旋转
	this._Drill_EFOE.scale_x = 0;			// 缩放x
	this._Drill_EFOE.scale_y = 0;			// 缩放y
	this._Drill_EFOE.skew_x = 0;			// 斜切x
	this._Drill_EFOE.skew_y = 0;			// 斜切y
	
	this._Drill_EFOE.opacity = 255;			// 透明度（不叠加，【注意，这里是消失效果，默认255】）
	this._Drill_EFOE.playing_type = "";		// 显示类型
	this._Drill_EFOE.real_width = -1;		// 贴图宽
	this._Drill_EFOE.real_height = -1;		// 贴图高
	this._Drill_EFOE.anchor_x = 0.5;		// 锚点中心x
	this._Drill_EFOE.anchor_y = 1.0;		// 锚点中心y
}
//==============================
// * 物体 - 动作判定
//==============================
Game_Character.prototype.drill_EFOE_isPlaying = function() {
	if( !this._Drill_EFOE ){ return false; }
	if( this._Drill_EFOE.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 物体 - 设置透明度
//==============================
Game_Character.prototype.drill_EFOE_setOpacity = function( opacity ){
	if( isNaN(opacity) ){
		alert( DrillUp.drill_EFOE_getPluginTip_ParamIsNaN( "opacity" ) );
	}
	this.setOpacity( opacity );
}
//==============================
// * 物体 - 帧刷新
//==============================
var _Drill_EFOE_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_Drill_EFOE_c_update.call(this);
	
	if( this._Drill_EFOE == undefined ){ return; } 
	if( this._Drill_EFOE.playing_type == "" ){ return; }
	if( this._Drill_EFOE.real_width == -1 ){ return; }		//需要等图片加载完成
	if( this._Drill_EFOE.real_height == -1 ){ return; }
	
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
}
//==============================
// * 物体 - 终止效果
//==============================
Game_Character.prototype.drill_EFOE_stopEffect = function() {
	var ef = this._Drill_EFOE;
	ef.x = 0;					// x
	ef.y = 0;					// y
	ef.rotation = 0;			// 旋转
	ef.scale_x = 0;				// 缩放x
	ef.scale_y = 0;				// 缩放y
	ef.skew_x = 0;				// 斜切x
	ef.skew_y = 0;				// 斜切y
	ef.opacity = 0 ;
	ef.playing_type = "";
	this.drill_EFOE_setOpacity(ef.opacity);
}


//=============================================================================
// ** 消失动作
//=============================================================================
//==============================
// * 初始化 - 消失 直接消失
//==============================
Game_Character.prototype.drill_EFOE_playHidingDisappear = function( time ){
	var ef = this._Drill_EFOE;
	ef.playing_type = "直接消失";
	ef.fA_dtime = time;
	ef.fA_time = 0;
}
//==============================
// * 帧刷新 - 消失 直接消失
//==============================
Game_Character.prototype.drill_EFOE_updateHidingDisappear = function() {
	var ef = this._Drill_EFOE;
	if( ef.playing_type != "直接消失" ){ return; }
	
	if( ef.fA_time < ef.fA_dtime ){
		ef.fA_time ++;
		ef.opacity = 255 *(1 - ef.fA_time/ef.fA_dtime);
		this.drill_EFOE_setOpacity(ef.opacity);
	}else{
		this.drill_EFOE_stopEffect();	//结束动作
	}
}

//==============================
// * 初始化 - 消失 移动消失
//==============================
Game_Character.prototype.drill_EFOE_playHidingMoveDisappear = function( time,angle,distance ){
	var ef = this._Drill_EFOE;
	ef.playing_type = "移动消失";
	ef.fA_dtime = time;
	ef.fA_time = 0;
	ef.fA_angle = angle;
	ef.fA_distance = distance;
}
//==============================
// * 帧刷新 - 消失 移动消失
//==============================
Game_Character.prototype.drill_EFOE_updateHidingMoveDisappear = function() {
	var ef = this._Drill_EFOE;
	if( ef.playing_type != "移动消失" ){ return; }
	
	if( ef.fA_time < ef.fA_dtime ){
		ef.fA_time ++;
		var temp_d = ef.fA_distance * ef.fA_time/ef.fA_dtime;		//匀速移动
		ef.x = temp_d * Math.cos( ef.fA_angle *Math.PI/180 );
		ef.y = temp_d * Math.sin( ef.fA_angle *Math.PI/180 );
		ef.opacity = 255 *(1 - ef.fA_time/ef.fA_dtime);
		this.drill_EFOE_setOpacity(ef.opacity);
	}else{
		this.drill_EFOE_stopEffect();	//结束动作
	}
}

//==============================
// * 初始化 - 消失 标准升起
//==============================
Game_Character.prototype.drill_EFOE_playHidingSpring = function( time,height,b_time ) {
	var ef = this._Drill_EFOE;
	ef.playing_type = "标准升起";
	ef.fA_tdest = time;
	ef.fA_distance = -1 * height;
	ef.fA_a = 2*ef.fA_distance/ef.fA_tdest/ef.fA_tdest;	//加速度公式
	ef.fA_time = 0;
	ef.fB_tdest = b_time || 30;
	ef.fB_time = 0;
}
//==============================
// * 帧刷新 - 消失 标准升起
//==============================
Game_Character.prototype.drill_EFOE_updateHidingSpring = function() {
	var ef = this._Drill_EFOE;
	if( ef.playing_type != "标准升起" ){ return; }
	
	if( ef.fB_time <= ef.fB_tdest ){
		ef.fB_time ++;
		var t = ef.fB_time;
		var a = 0.8 / ef.fB_tdest / ef.fB_tdest;	//固定压缩0.2比例
		var b = -1 * a * ef.fB_tdest;
		var c = 0;
		ef.scale_x = -1*(a*ef.fB_time*ef.fB_time + b*ef.fB_time + c);
		ef.scale_y = -ef.scale_x;
		ef.y = 0;
		ef.opacity = 255;
		this.drill_EFOE_setOpacity(ef.opacity);
	}else if( ef.fA_time < ef.fA_tdest ){
		ef.fA_time ++;
		var t = ef.fA_time;
		ef.y = ef.fA_a*t*t/2;	//加速上升
		ef.opacity = 255 * (ef.fA_tdest - ef.fA_time) /ef.fA_tdest * 2 ;
		this.drill_EFOE_setOpacity(ef.opacity);
	}else{
		this.drill_EFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 消失 标准弹跳
//==============================
Game_Character.prototype.drill_EFOE_playHidingJump = function( time, height ) {
	var ef = this._Drill_EFOE;
	ef.playing_type = "标准弹跳";
	ef.f_a = -4*height/time/time;	//抛物线公式 y = ax2 + bx +c（一样）
	ef.f_b = 4*height/time;	
	ef.f_c = 0;	
	ef.f_time = 0;
	ef.f_tdest = time;
}
//==============================
// * 帧刷新 - 消失 标准弹跳
//==============================
Game_Character.prototype.drill_EFOE_updateHidingJump = function() {
	var ef = this._Drill_EFOE;
	if( ef.playing_type != "标准弹跳" ){ return; }
	
	if( ef.f_time < ef.f_tdest/2 ){		//通用一个公式，只是根据顶点值分成了两份
		ef.f_time ++;
		var t = ef.f_time;
		ef.y = -1*(ef.f_a*t*t + ef.f_b*t);
		ef.opacity = 255 ;
		this.drill_EFOE_setOpacity(ef.opacity);
	}else if( ef.f_time < ef.f_tdest ){
		ef.f_time ++;
		var t = ef.f_time;
		ef.y = -1*(ef.f_a*t*t + ef.f_b*t);
		if(ef.y >0){ ef.y = 0; }
		ef.opacity = 255 - 255 * (ef.f_time - ef.f_tdest/2 ) /ef.f_tdest*2 ;
		this.drill_EFOE_setOpacity(ef.opacity);
	}else{
		this.drill_EFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 消失 缩小消失
//==============================
Game_Character.prototype.drill_EFOE_playHidingShrink = function( time, opacity_off ) {
	var ef = this._Drill_EFOE;
	ef.playing_type = "缩小消失";
	
	ef.fA_sa = 2/time/time/2;	//匀加速公式 scale = 1/2 * at2
	ef.fA_sb = 0;	
	ef.fA_sc = 0;	
	ef.fA_ya = 20/time/time/2;	//抛物线公式 y = ax2 + bx +c
	ef.fA_yb = 0;	
	ef.fA_yc = 0;	
	ef.fA_time = 0;
	ef.fA_dTime = time;
	
	ef.f_opacityOff = opacity_off;
}
//==============================
// * 帧刷新 - 消失 缩小消失
//==============================
Game_Character.prototype.drill_EFOE_updateHidingShrink = function() {
	var ef = this._Drill_EFOE;
	if( ef.playing_type != "缩小消失" ){ return; }
	
	if( ef.fA_time < ef.fA_dTime ){
		ef.fA_time ++;
		var t = ef.fA_time;
		
		ef.y = 20 -1*(ef.fA_ya*t*t + ef.fA_yb*t);	//抛物线
		ef.scale_x = - ef.fA_sa*t*t - ef.fA_sb*t;	//匀加速放大
		ef.scale_y = ef.scale_x;
		if(ef.y >0){ ef.y = 0;}
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_EFOE_Math2D_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;
		ef.y = ef.y + fix_point.y;

		// > 透明度变化
		if( ef.f_opacityOff == true ){
			ef.opacity = 255
			this.drill_EFOE_setOpacity(255);
		}else{
			ef.opacity = 255 - 255 * ef.fA_time /ef.fA_dTime ;
			this.drill_EFOE_setOpacity(ef.opacity);
		}
		
	}else{
		this.drill_EFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 显现 横向挤扁
//==============================
Game_Character.prototype.drill_EFOE_playHidingHorizonFlat = function( time, scale_x, opacity_off ) {
	var ef = this._Drill_EFOE;
	ef.playing_type = "横向挤扁";
	
	ef.f_dTime = time ;
	ef.f_time = 0;
	ef.f_scale_x = scale_x - 1.0;
	
	ef.f_opacityOff = opacity_off;
}
//==============================
// * 帧刷新 - 显现 横向挤扁
//==============================
Game_Character.prototype.drill_EFOE_updateHidingHorizonFlat = function() {
	var ef = this._Drill_EFOE;
	if( ef.playing_type != "横向挤扁" ){ return; }
		
	if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		
		ef.scale_x = ef.f_scale_x * ef.f_time/ef.f_dTime ;
		ef.scale_y = -1.0 * ef.f_time/ef.f_dTime ;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_EFOE_Math2D_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;
		ef.y = fix_point.y;
		
		// > 透明度变化
		if( ef.f_opacityOff == true ){
			ef.opacity = 255
			this.drill_EFOE_setOpacity(255);
		}else{
			ef.opacity = 255 - 255 * ef.f_time /ef.f_dTime ;
			this.drill_EFOE_setOpacity(ef.opacity);
		}
		
	}else{
		this.drill_EFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 显现 纵向挤扁
//==============================
Game_Character.prototype.drill_EFOE_playHidingVerticalFlat = function( time, scale_y, opacity_off ) {
	var ef = this._Drill_EFOE;
	ef.playing_type = "纵向挤扁";
	
	ef.f_dTime = time ;
	ef.f_time = 0;
	ef.f_scale_y = scale_y - 1.0;
	
	ef.f_opacityOff = opacity_off;
}
//==============================
// * 帧刷新 - 显现 纵向挤扁
//==============================
Game_Character.prototype.drill_EFOE_updateHidingVerticalFlat = function() {
	var ef = this._Drill_EFOE;
	if( ef.playing_type != "纵向挤扁" ){ return; }
		
	if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		
		ef.scale_x = -1.0 * ef.f_time/ef.f_dTime ;
		ef.scale_y = ef.f_scale_y * ef.f_time/ef.f_dTime ;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_EFOE_Math2D_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;
		ef.y = fix_point.y;
		
		// > 透明度变化
		if( ef.f_opacityOff == true ){
			ef.opacity = 255
			this.drill_EFOE_setOpacity(255);
		}else{
			ef.opacity = 255 - 255 * ef.f_time /ef.f_dTime ;
			this.drill_EFOE_setOpacity(ef.opacity);
		}
		
	}else{
		this.drill_EFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 显现 向左炸飞
//==============================
Game_Character.prototype.drill_EFOE_playHidingBlowOutLeft = function( time, speed ) {
	var ef = this._Drill_EFOE;
	ef.playing_type = "向左炸飞";
	
	ef.f_dTime = time ;
	ef.f_time = 0;
	ef.f_speedX = speed;
	ef.f_speedY = speed * 0.5;
	ef.f_rotate = Math.PI/2 + Math.PI/4;	//135度
}
//==============================
// * 帧刷新 - 显现 向左炸飞
//==============================
Game_Character.prototype.drill_EFOE_updateHidingBlowOutLeft = function() {
	var ef = this._Drill_EFOE;
	if( ef.playing_type != "向左炸飞" ){ return; }
		
	if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		
		ef.x = -1 * ef.f_speedX * ef.f_time ;
		ef.y = -1 *(ef.f_speedY*ef.f_time - ef.f_speedY*0.015 *ef.f_time*ef.f_time);	//抛物线公式
		ef.rotation = -1*(ef.f_rotate * ef.f_time/ef.f_dTime);
		
		ef.opacity = 255 - 255 * ef.f_time /ef.f_dTime ;
		this.drill_EFOE_setOpacity(ef.opacity);
	}else{
		this.drill_EFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 显现 向右炸飞
//==============================
Game_Character.prototype.drill_EFOE_playHidingBlowOutRight = function( time, speed ) {
	var ef = this._Drill_EFOE;
	ef.playing_type = "向右炸飞";
	
	ef.f_dTime = time ;
	ef.f_time = 0;
	ef.f_speedX = speed;
	ef.f_speedY = speed * 0.5;
	ef.f_rotate = Math.PI/2 + Math.PI/4;	//135度
}
//==============================
// * 帧刷新 - 显现 向右炸飞
//==============================
Game_Character.prototype.drill_EFOE_updateHidingBlowOutRight = function() {
	var ef = this._Drill_EFOE;
	if( ef.playing_type != "向右炸飞" ){ return; }
		
	if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		
		ef.x = ef.f_speedX * ef.f_time ;
		ef.y = -1 *(ef.f_speedY*ef.f_time - ef.f_speedY*0.015 *ef.f_time*ef.f_time);	//抛物线公式
		ef.rotation = (ef.f_rotate * ef.f_time/ef.f_dTime);
		
		ef.opacity = 255 - 255 * ef.f_time /ef.f_dTime ;
		this.drill_EFOE_setOpacity(ef.opacity);
	}else{
		this.drill_EFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 显现 弹性缩小消失
//==============================
Game_Character.prototype.drill_EFOE_playHidingShrinkSpring = function( dtime, overflow_scale, anchor_x, anchor_y, opacity_off ){
	var ef = this._Drill_EFOE;
	ef.playing_type = "弹性缩小消失";
	
	ef.f_time = 0;	
	ef.f_dTime = dtime;
	
	ef.f_anchor_x = anchor_x;
	ef.f_anchor_y = anchor_y;
	ef.f_opacityOff = opacity_off;
	
	ef.f_abc = $gameTemp.drill_EFOE_Math2D_getParabolicThree( 0,0, dtime*0.2,overflow_scale, dtime,-1 );
	
}
//==============================
// * 帧刷新 - 显现 弹性缩小消失
//==============================
Game_Character.prototype.drill_EFOE_updateHidingShrinkSpring = function() {
	var ef = this._Drill_EFOE;
	if( ef.playing_type != "弹性缩小消失" ){ return; }
		
	if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		var time = ef.f_time;
		
		var dt = ef.f_dTime;		//计算 落脚点
		var a = 2 / dt / dt;		//（匀减速移动到目标值）
		var c_time = dt - time;
		var per_step = 0.5 * a * dt * dt - 0.5 * a * c_time * c_time ;
		
		//【不要用分段函数，分段函数必然有 锯齿感 和 不和谐感 】
		
		// > 落脚点分配缩放值（三点抛物线）
		ef.scale_x = ef.f_abc['a']*time*time + ef.f_abc['b']*time + ef.f_abc['c'];
		ef.scale_y = ef.scale_x;
		
		// > 锚点锁定
		var fix_point = $gameTemp.drill_EFOE_Math2D_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, ef.f_anchor_x, ef.f_anchor_y, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;
		ef.y = fix_point.y;
		
		// > 透明度变化
		if( ef.f_opacityOff == true ){
			ef.opacity = 255
			this.drill_EFOE_setOpacity(255);
		}else{
			ef.opacity = 255 - 255 * ef.f_time /ef.f_dTime ;
			this.drill_EFOE_setOpacity(ef.opacity);
		}
		
	}else{
		this.drill_EFOE_stopEffect();	//结束动作
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventFadeOutEffect = false;
		var pluginTip = DrillUp.drill_EFOE_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


