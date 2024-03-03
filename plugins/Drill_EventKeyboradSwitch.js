//=============================================================================
// Drill_EventKeyboradSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        物体 - 键盘响应开关
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventKeyboradSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 键盘响应开关指 键盘按键按下 就能触发事件的开关，这里只支持物理按键。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfInput        系统-输入设备核心
 *     通过该核心才能进行键盘控制操作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面
 *   只作用于事件，单独对键盘有效。
 * 2.你需要先了解基础知识 "8.物体 > 触发的本质.docx"。
 * 传感器：
 *   (1.该插件被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      键盘按下时，触发事件的独立开关。
 *   (2.该插件的注释设置全都跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 输入设备：
 *   (1.插件只对键盘有效。
 *   (2.插件只支持 物理按键，不支持 逻辑按键。
 *      按键介绍可以去看看 "1.系统 > 关于输入设备核心（入门篇）.docx"。
 * 键盘的物理按键：
 *   (1.键盘的物理按键可以使用 字母、数字 的关键字，
 *      如 a b A B 1 2 等，字母大小写都可以。
 *   (2.你还可以设置特殊的键盘按键，填入以下字符关键字：
 *       Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
 *       ~ - = [ ] \ ; ' , . /
 *       Tab Shift Ctrl Alt Backspace 上 下 左 右 空格 Enter
 *       PageUp PageDown End Home Insert Delete
 *   (3.小键盘的关键字如下：
 *       Num0 Num1 Num2 Num3 Num4 Num5 Num6 Num7 Num8 Num9
 *       Num* Num+ Num- Num. Num/ NumEnter
 *   (4.注意，如果你想配置键盘的 空格，那么要填"空格"，而不是" "。
 * 细节：
 *   (1.设置物理按键绑定时，需要避免与已有的功能重叠。
 *      建议设计游戏时列一个物理按键分配表。
 * 设计：
 *   (1.你可以设置一个事件，监听 地图内 键盘的操作。
 *      在剧情进行时，对话全部是固定时间播放。
 *      只要键盘持续有双击操作，则触发"是否要跳过剧情？"的流程。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要给指定的开关事件添加下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 绑定持续触发-物理按键"f"
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 物理按键"f"按下时开启
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 物理按键"f"没按时关闭
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   (绑定持续触发-物理按键"f") 就是 (物理按键"f"按下时开启)的触发+(物理按键"f"没按时关闭)的触发 两个触发。
 *   因为"绑定持续触发"更好理解一些，(物理按键"f"没按时关闭)这种单向触发容易把自己绕晕，
 *   你也可以去看看 "8.物体 > 触发的本质.docx" 的 开关触发与命题 章节。
 * 2.引号内能填的按键，见 键盘的物理按键 介绍，
 *   写法"f"和"F"效果一样，大小写随意，只要键盘按了 f键 就能触发。
 *   开关放在地图任何地方都能触发。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逆向触发
 * 如果你需要设置逆向开启/关闭的触发，使用下面的注释：
 * 
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 绑定持续触发-物理按键"f"(逆向)
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 物理按键"f"按下时关闭
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 物理按键"f"没按时开启
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   (绑定持续触发-物理按键"f"(逆向)) 就是 (物理按键"f"按下时关闭)的触发+(物理按键"f"没按时开启)的触发 两个触发。
 *   由于是逆向开启/关闭，容易绕晕自己，设计时要小心。
 * 2.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多开关触发
 * 你可以写多个注释，分别建立多个独立开关的触发：
 * 
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 绑定持续触发-物理按键"a"
 * 事件注释：=>键盘响应开关 : 独立开关[B] : 绑定持续触发-物理按键"f"
 * 事件注释：=>键盘响应开关 : 独立开关[C] : 绑定持续触发-物理按键"g"(逆向)
 * 
 * 1.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 单次触发
 * 你可以写注释，绑定单次触发的功能：
 * 
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 绑定单次触发-物理按键"f"按下[一帧]时 : 开启
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 绑定单次触发-物理按键"f"按下[一帧]时 : 关闭
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 绑定单次触发-物理按键"f"释放[一帧]时 : 开启
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 绑定单次触发-物理按键"f"释放[一帧]时 : 关闭
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 绑定单次触发-物理按键"f"双击[一帧]时 : 开启
 * 事件注释：=>键盘响应开关 : 独立开关[A] : 绑定单次触发-物理按键"f"双击[一帧]时 : 关闭
 * 
 * 1.当前为单次触发，只在满足条件的那一帧执行一次开启/关闭。
 * 2.上述的指令互斥，每个独立开关只能绑定上述的一个类型。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>键盘响应开关 : 对话框弹出时保持触发
 * 插件指令：>键盘响应开关 : 对话框弹出时暂停触发
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 临时控制触发
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>键盘响应开关 : 添加触发 : 本事件 : 独立开关[A] : 绑定持续触发-物理按键"f"
 * 插件指令：>键盘响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-物理按键"f"
 * 插件指令：>键盘响应开关 : 添加触发 : 事件变量[21] : 独立开关[A] : 绑定持续触发-物理按键"f"
 * 插件指令：>键盘响应开关 : 添加触发 : 批量事件[10,11] : 独立开关[A] : 绑定持续触发-物理按键"f"
 * 插件指令：>键盘响应开关 : 添加触发 : 批量事件变量[21,22] : 独立开关[A] : 绑定持续触发-物理按键"f"
 * 
 * 插件指令：>键盘响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-物理按键"f"
 * 插件指令：>键盘响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-物理按键"f"
 * 插件指令：>键盘响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-物理按键"f"
 * 
 * 插件指令：>键盘响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-物理按键"f"按下[一帧]时 : 开启
 * 插件指令：>键盘响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-物理按键"f"释放[一帧]时 : 开启
 * 插件指令：>键盘响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-物理按键"f"双击[一帧]时 : 开启
 * 
 * 插件指令：>键盘响应开关 : 去除触发 : 事件[10] : 独立开关[A]
 * 插件指令：>键盘响应开关 : 去除触发 : 事件[10] : 全部独立开关
 * 
 * 1.插件指令前面部分（本事件）和后面设置（独立开关[A] : 绑定持续触发-物理按键"f"）可以随意组合。
 *   一共有5*(3+3+2)种组合方式。
 * 2.注意，"添加触发"、"去除触发"的设置都只在当前地图有效，离开地图后失效。
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
 * 测试方法：   地图界面中，放置20个键盘响应开关，进行键盘触发等操作。
 * 测试结果：   200个事件的地图中，消耗为：【33.26ms】
 *              100个事件的地图中，消耗为：【21.60ms】
 *               50个事件的地图中，消耗为：【12.59ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于 键盘响应开关 对全图有效，地图的开关放置多了，
 *   性能消耗会线性增加。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param 对话框弹出时是否保持触发
 * @type boolean
 * @on 保持触发
 * @off 暂停触发
 * @desc 对话框弹出时，通常会暂停键盘的事件触发监听。你可以设置弹出后仍然保持触发。
 * @default true
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EKbS (Event_Keyborad_Switch)
//		临时全局变量	DrillUp.g_EKbS_xxx
//		临时局部变量	this._drill_EKbS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	键盘管理层
//		★性能测试消耗	21.6ms（drill_EKbS_updateSwitch）
//		★最坏情况		地图存在大量开关，都在帧刷新键盘监听。
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
//			->☆存储数据
//			->☆事件注释
//			
//			->☆开关的属性
//			->☆键盘响应开关容器
//			
//			->☆开关控制
//				->触发（持续）
//				->触发（单次）
//					> 按下[一帧]
//					> 释放[一帧]
//					> 双击[一帧]
//		
//		
//		★家谱：
//			大家族-开关
//		
//		★脚本文档：
//			8.物体 > 大家族-开关（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			无
//
//		★其它说明细节：
//			无
//
//		★存在的问题：
//			无
//		

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_EKbS_PluginTip_curName = "Drill_EventKeyboradSwitch.js 物体-键盘响应开关";
	DrillUp.g_EKbS_PluginTip_baseList = ["Drill_CoreOfInput.js 系统-输入设备核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EKbS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EKbS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EKbS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EKbS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EKbS_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EKbS_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EKbS_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventKeyboradSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventKeyboradSwitch');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_EKbS_remainTrigger = String(DrillUp.parameters['对话框弹出时是否保持触发'] || "true") === "true";



//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EKbS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){ 
	_drill_EKbS_pluginCommand.call(this, command, args);
	if( command === ">键盘响应开关" ){
		
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "对话框弹出时保持触发" ){
				$gameSystem._drill_EKbS_remainTrigger = true;
			}
			if( temp1 == "对话框弹出时暂停触发" ){
				$gameSystem._drill_EKbS_remainTrigger = false;
			}
		}
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 4 ){		//（注意，第3个位置为事件对象）
			var unit = String(args[3]);
			if( c_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EKbS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EKbS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EKbS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EKbS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return }; 	
		
		/*-----------------持续触发------------------*/
		if( args.length == 8 ){
			var a_type = String(args[1]);
			var switch_str = String(args[5]);
			var type = String(args[7]);
			if( a_type == "添加触发" ){
				switch_str = switch_str.replace("独立开关[","");
				switch_str = switch_str.replace("]","");
				
				for( var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					
					if( type.contains("绑定持续触发-物理按键\"") ){
						if( type.contains("\"(逆向)") ){
							var key = type;
							key = key.replace("绑定持续触发-物理按键\"","");
							key = key.replace("\"(逆向)","");
							ch.drill_EKbS_setButton( switch_str, 0, key );
							ch.drill_EKbS_setSwitch_TriggeredOn( switch_str, false );
							ch.drill_EKbS_setSwitch_NotTriggeredOff( switch_str, false );
							ch.drill_EKbS_setSwitch_TriggeredOff( switch_str, true );
							ch.drill_EKbS_setSwitch_NotTriggeredOn( switch_str, true );
							$gameTemp._drill_EKbS_needRestatistics = true;
						}else{
							var key = type;
							key = key.replace("绑定持续触发-物理按键\"","");
							key = key.replace("\"","");
							ch.drill_EKbS_setButton( switch_str, 0, key );
							ch.drill_EKbS_setSwitch_TriggeredOn( switch_str, true );
							ch.drill_EKbS_setSwitch_NotTriggeredOff( switch_str, true );
							ch.drill_EKbS_setSwitch_TriggeredOff( switch_str, false );
							ch.drill_EKbS_setSwitch_NotTriggeredOn( switch_str, false );
							$gameTemp._drill_EKbS_needRestatistics = true;
						}
					}
					
				}
			}
		}
		/*-----------------单次触发------------------*/
		if( args.length == 10 ){
			var a_type = String(args[1]);
			var switch_str = String(args[5]);
			var type = String(args[7]);
			var value = String(args[9]);
			if( a_type == "添加触发" ){
				switch_str = switch_str.replace("独立开关[","");
				switch_str = switch_str.replace("]","");
				if( value == "开启" ){ 
					value = true;
				}else{
					value = false;
				}
				
				for( var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					
					// > 单次触发
					if( type.contains("绑定单次触发-物理按键\"") ){
						if( type.contains("\"按下[一帧]时") ){
							var key = type;
							key = key.replace("绑定单次触发-物理按键\"","");
							key = key.replace("\"按下[一帧]时","");
							ch.drill_EKbS_setButton( switch_str, 1, key );
							ch.drill_EKbS_setSwitch_OnceValue( switch_str, value );
							$gameTemp._drill_EKbS_needRestatistics = true;
						}
						if( type.contains("\"释放[一帧]时") ){
							var key = type;
							key = key.replace("绑定单次触发-物理按键\"","");
							key = key.replace("\"释放[一帧]时","");
							ch.drill_EKbS_setButton( switch_str, 2, key );
							ch.drill_EKbS_setSwitch_OnceValue( switch_str, value );
							$gameTemp._drill_EKbS_needRestatistics = true;
						}
						if( type.contains("\"双击[一帧]时") ){
							var key = type;
							key = key.replace("绑定单次触发-物理按键\"","");
							key = key.replace("\"双击[一帧]时","");
							ch.drill_EKbS_setButton( switch_str, 3, key );
							ch.drill_EKbS_setSwitch_OnceValue( switch_str, value );
							$gameTemp._drill_EKbS_needRestatistics = true;
						}
					}
					
				}
			}
		}
		/*-----------------去除触发------------------*/
		if( args.length == 6 ){
			var a_type = String(args[1]);
			var switch_str = String(args[5]);
			if( a_type == "去除触发" ){
				switch_str = switch_str.replace("独立开关[","");
				switch_str = switch_str.replace("]","");
				
				if( switch_str == "全部独立开关" ){
					for( var i = 0; i < c_chars.length; i++ ){
						var ch = c_chars[i];
						ch.drill_EKbS_clearSwitchList();
						$gameTemp._drill_EKbS_needRestatistics = true;
					}
				}else{
					for( var i = 0; i < c_chars.length; i++ ){
						var ch = c_chars[i];
						ch.drill_EKbS_removeSwitch( switch_str );
						$gameTemp._drill_EKbS_needRestatistics = true;
					}
				}
			}
		}
	};
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EKbS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EKbS_getPluginTip_EventNotFind( e_id ) );
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
DrillUp.g_EKbS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EKbS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EKbS_sys_initialize.call(this);
	this.drill_EKbS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EKbS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EKbS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EKbS_saveEnabled == true ){	
		$gameSystem.drill_EKbS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EKbS_initSysData();
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
Game_System.prototype.drill_EKbS_initSysData = function() {
	this.drill_EKbS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EKbS_checkSysData = function() {
	this.drill_EKbS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EKbS_initSysData_Private = function() {
	
	this._drill_EKbS_remainTrigger = DrillUp.g_EKbS_remainTrigger;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EKbS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EKbS_remainTrigger == undefined ){
		this.drill_EKbS_initSysData();
	}
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_EKbS_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EKbS_event_initMembers.call(this);
	this._drill_EKbS_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_EKbS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EKbS_event_setupPage.call(this);
    this.drill_EKbS_setupMutiSwitch();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_EKbS_setupMutiSwitch = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EKbS_isFirstBirth == true ){ 
		this._drill_EKbS_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_EKbS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EKbS_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EKbS_readPage = function( page_list ){
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>键盘响应开关" ){
				
				/*-----------------触发设置------------------*/
				if( args.length == 4 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					
					// > 持续触发
					if( type.contains("绑定持续触发-物理按键\"") ){
						if( type.contains("\"(逆向)") ){
							var key = type;
							key = key.replace("绑定持续触发-物理按键\"","");
							key = key.replace("\"(逆向)","");
							this.drill_EKbS_setButton( switch_str, 0, key );
							this.drill_EKbS_setSwitch_TriggeredOn( switch_str, false );
							this.drill_EKbS_setSwitch_NotTriggeredOff( switch_str, false );
							this.drill_EKbS_setSwitch_TriggeredOff( switch_str, true );
							this.drill_EKbS_setSwitch_NotTriggeredOn( switch_str, true );
							$gameTemp._drill_EKbS_needRestatistics = true;
						}else{
							var key = type;
							key = key.replace("绑定持续触发-物理按键\"","");
							key = key.replace("\"","");
							this.drill_EKbS_setButton( switch_str, 0, key );
							this.drill_EKbS_setSwitch_TriggeredOn( switch_str, true );
							this.drill_EKbS_setSwitch_NotTriggeredOff( switch_str, true );
							this.drill_EKbS_setSwitch_TriggeredOff( switch_str, false );
							this.drill_EKbS_setSwitch_NotTriggeredOn( switch_str, false );
							$gameTemp._drill_EKbS_needRestatistics = true;
						}
					}
					else if( type.contains("\"按下时开启") ){
						var key = type;
						key = key.replace("物理按键\"","");
						key = key.replace("\"按下时开启","");
						this.drill_EKbS_setButton( switch_str, 0, key );
						this.drill_EKbS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EKbS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EKbS_needRestatistics = true;
					}
					else if( type.contains("\"没按时关闭") ){
						var key = type;
						key = key.replace("物理按键\"","");
						key = key.replace("\"没按时关闭","");
						this.drill_EKbS_setButton( switch_str, 0, key );
						this.drill_EKbS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EKbS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EKbS_needRestatistics = true;
					}
					else if( type.contains("\"按下时关闭") ){
						var key = type;
						key = key.replace("物理按键\"","");
						key = key.replace("\"按下时关闭","");
						this.drill_EKbS_setButton( switch_str, 0, key );
						this.drill_EKbS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EKbS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EKbS_needRestatistics = true;
					}
					else if( type.contains("\"没按时开启") ){
						var key = type;
						key = key.replace("物理按键\"","");
						key = key.replace("\"没按时开启","");
						this.drill_EKbS_setButton( switch_str, 0, key );
						this.drill_EKbS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EKbS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EKbS_needRestatistics = true;
					}
				}
				if( args.length == 6 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					var value = String(args[5]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( value == "开启" ){ 
						value = true;
					}else{
						value = false;
					}
					
					// > 单次触发
					if( type.contains("绑定单次触发-物理按键\"") ){
						if( type.contains("\"按下[一帧]时") ){
							var key = type;
							key = key.replace("绑定单次触发-物理按键\"","");
							key = key.replace("\"按下[一帧]时","");
							this.drill_EKbS_setButton( switch_str, 1, key );
							this.drill_EKbS_setSwitch_OnceValue( switch_str, value );
							$gameTemp._drill_EKbS_needRestatistics = true;
						}
						if( type.contains("\"释放[一帧]时") ){
							var key = type;
							key = key.replace("绑定单次触发-物理按键\"","");
							key = key.replace("\"释放[一帧]时","");
							this.drill_EKbS_setButton( switch_str, 2, key );
							this.drill_EKbS_setSwitch_OnceValue( switch_str, value );
							$gameTemp._drill_EKbS_needRestatistics = true;
						}
						if( type.contains("\"双击[一帧]时") ){
							var key = type;
							key = key.replace("绑定单次触发-物理按键\"","");
							key = key.replace("\"双击[一帧]时","");
							this.drill_EKbS_setButton( switch_str, 3, key );
							this.drill_EKbS_setSwitch_OnceValue( switch_str, value );
							$gameTemp._drill_EKbS_needRestatistics = true;
						}
					}
				}
			};
		};
	}, this);
};



//=============================================================================
// ** ☆开关的属性
//
//			说明：	> 此模块专门定义 开关的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关的属性 - 初始化
//==============================
var _drill_EKbS_switch_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	_drill_EKbS_switch_initialize.call(this);
	this._drill_EKbS_switchData = undefined;
}
//==============================
// * 开关的属性 - 初始化
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Character.prototype.drill_EKbS_checkSwitchData = function(){	
	if( this._drill_EKbS_switchData != undefined ){ return; }
	this._drill_EKbS_switchData = {};
	this._drill_EKbS_switchData['switch'] = {};					//独立开关容器
}
//==============================
// * 开关的属性 - 初始化独立开关
//
//			说明：	> 注意，键盘响应开关能控制多个独立开关。
//==============================
Game_Character.prototype.drill_EKbS_checkSwitchData_Switch = function( switch_str ){
	this.drill_EKbS_checkSwitchData()
	if( this._drill_EKbS_switchData['switch'][switch_str] != undefined ){ return; }
	var switch_data = {};
	
	switch_data['triggeredType'] = 0;			//触发类型（0：持续触发；1：单次触发-按下[一帧]；2：单次触发-释放[一帧]；3：单次触发-双击[一帧]）
	switch_data['keyboardKey'] = "";			//键盘键位
	
	switch_data['triggeredOn'] = false;			//按下时开启（持续触发用）
	switch_data['notTriggeredOff'] = false;		//没按下时关闭（持续触发用）
	switch_data['triggeredOff'] = false;		//按下时关闭（持续触发用）
	switch_data['notTriggeredOn'] = false;		//没按下时开启（持续触发用）
	
	switch_data['onceValue'] = true;			//开关赋值（单次触发用）
	
	this._drill_EKbS_switchData['switch'][switch_str] = switch_data;
}
//==============================
// * 开关的属性 - 独立开关容器
//==============================
Game_Character.prototype.drill_EKbS_hasAnySwitch = function(){
	return this.drill_EKbS_getSwitchList().length > 0;
}
//==============================
// * 开关的属性 - 独立开关容器 - 获取列表
//==============================
Game_Character.prototype.drill_EKbS_getSwitchList = function(){
	if( this._drill_EKbS_switchData == undefined ){ return []; }
	return Object.keys( this._drill_EKbS_switchData['switch'] );
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除单个
//==============================
Game_Character.prototype.drill_EKbS_removeSwitch = function( switch_str ){
	this.drill_EKbS_checkSwitchData()
	this._drill_EKbS_switchData['switch'][switch_str] = undefined;
	delete this._drill_EKbS_switchData['switch'][switch_str];
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除全部
//==============================
Game_Character.prototype.drill_EKbS_clearSwitchList = function(){
	this.drill_EKbS_checkSwitchData()
	this._drill_EKbS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 触发设置 - 踩住时开启
//==============================
Game_Character.prototype.drill_EKbS_setSwitch_TriggeredOn = function( switch_str, enabled ){
	this.drill_EKbS_checkSwitchData();
	this.drill_EKbS_checkSwitchData_Switch( switch_str );
	this._drill_EKbS_switchData['switch'][switch_str]['triggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 没踩住时关闭
//==============================
Game_Character.prototype.drill_EKbS_setSwitch_NotTriggeredOff = function( switch_str, enabled ){
	this.drill_EKbS_checkSwitchData();
	this.drill_EKbS_checkSwitchData_Switch( switch_str );
	this._drill_EKbS_switchData['switch'][switch_str]['notTriggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 踩住时关闭
//==============================
Game_Character.prototype.drill_EKbS_setSwitch_TriggeredOff = function( switch_str, enabled ){
	this.drill_EKbS_checkSwitchData();
	this.drill_EKbS_checkSwitchData_Switch( switch_str );
	this._drill_EKbS_switchData['switch'][switch_str]['triggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 没踩住时开启
//==============================
Game_Character.prototype.drill_EKbS_setSwitch_NotTriggeredOn = function( switch_str, enabled ){
	this.drill_EKbS_checkSwitchData();
	this.drill_EKbS_checkSwitchData_Switch( switch_str );
	this._drill_EKbS_switchData['switch'][switch_str]['notTriggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 开关赋值
//==============================
Game_Character.prototype.drill_EKbS_setSwitch_OnceValue = function( switch_str, value ){
	this.drill_EKbS_checkSwitchData();
	this.drill_EKbS_checkSwitchData_Switch( switch_str );
	this._drill_EKbS_switchData['switch'][switch_str]['onceValue'] = value;
}
//==============================
// * 开关的属性 - 设置键盘触发
//==============================
Game_Character.prototype.drill_EKbS_setButton = function( switch_str, triggeredType, key ){
	this.drill_EKbS_checkSwitchData();
	this.drill_EKbS_checkSwitchData_Switch( switch_str );
	this._drill_EKbS_switchData['switch'][switch_str]['triggeredType'] = triggeredType;
	this._drill_EKbS_switchData['switch'][switch_str]['keyboardKey'] = key;
}


//=============================================================================
// ** ☆键盘响应开关容器
//
//			说明：	> 此模块专门定义 键盘响应开关 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_EKbS_clearTemp = function(){
	this._drill_EKbS_switchTank = [];
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_EKbS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EKbS_temp_initialize.call(this);
	this.drill_EKbS_clearTemp();
	this._drill_EKbS_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EKbS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_EKbS_clearTemp();
	$gameTemp._drill_EKbS_needRestatistics = true;
	_drill_EKbS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EKbS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_EKbS_clearTemp();
	$gameTemp._drill_EKbS_needRestatistics = true;
	_drill_EKbS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EKbS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EKbS_map_update.call( this, sceneActive );
	this.drill_EKbS_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EKbS_updateRestatistics = function(){
	if( $gameTemp._drill_EKbS_needRestatistics != true ){ return }
	$gameTemp._drill_EKbS_needRestatistics = false;
	
	$gameTemp._drill_EKbS_switchTank = [];
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event == undefined ){ continue; }
		if( temp_event._erased == true ){ continue; }
		if( temp_event.drill_EKbS_hasAnySwitch() ){
			$gameTemp._drill_EKbS_switchTank.push(temp_event);
		}
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_EKbS_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EKbS_erase.call(this);
	if( this.drill_EKbS_hasAnySwitch() ){
		$gameTemp._drill_EKbS_needRestatistics = true;
	}
};



//=============================================================================
// ** ☆开关控制
//
//			说明：	> 此模块管理 键盘响应开关 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制 - 帧刷新
//==============================
var _drill_EKbS_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EKbS_map_update2.call( this, sceneActive );
	if( this.drill_EKbS_isOptimizationPassed() == false ){ return; }
	this.drill_EKbS_updateSwitch();
}
//==============================
// * 开关控制 - 帧刷新 - 优化策略
//==============================
Game_Map.prototype.drill_EKbS_isOptimizationPassed = function(){
	
	// > 地图中所有容器都为空时，不工作
	if( $gameTemp._drill_EKbS_switchTank.length == 0 ){
		return false;
	}
	return true;
}
//==============================
// * 开关控制 - 帧刷新
//==============================
Game_Map.prototype.drill_EKbS_updateSwitch = function(){
	
	// > 对话框弹出时是否仍然可触发
	if( ($gameMessage.isBusy() || SceneManager._scene.isBusy()) &&
		$gameSystem._drill_EKbS_remainTrigger == false ){
		return;
	}
	
	// > 键盘响应开关
	for( var i = 0; i < $gameTemp._drill_EKbS_switchTank.length; i++ ){
		var temp_switchEv = $gameTemp._drill_EKbS_switchTank[i];
		
		//	键盘响应开关 - 获取独立开关列表
		var switch_list = temp_switchEv.drill_EKbS_getSwitchList();
		if( switch_list.length == 0 ){ continue; }
		
		for(var j = 0; j < switch_list.length; j++ ){
			var cur_switch = switch_list[j];
			var cur_keyboardKey = temp_switchEv._drill_EKbS_switchData['switch'][cur_switch]['keyboardKey'];
			var cur_triggeredType = temp_switchEv._drill_EKbS_switchData['switch'][cur_switch]['triggeredType'];
			if( cur_triggeredType == 0 ){
			
				// > 触发（持续）
				var isTriggered = false;
				if( Input.drill_isKeyPressed(cur_keyboardKey) ){
					isTriggered = true;
				}
				
				// > 触发（持续） - 按下时
				if( isTriggered ){
					
					if( temp_switchEv._drill_EKbS_switchData['switch'][cur_switch]['triggeredOn'] == true ){
						this.drill_EKbS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							true
						);
					}
					if( temp_switchEv._drill_EKbS_switchData['switch'][cur_switch]['triggeredOff'] == true ){
						this.drill_EKbS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							false
						);
					}
					
				// > 触发（持续） - 没按下时
				}else{
					
					if( temp_switchEv._drill_EKbS_switchData['switch'][cur_switch]['notTriggeredOff'] == true ){
						this.drill_EKbS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							false
						);
					}
					if( temp_switchEv._drill_EKbS_switchData['switch'][cur_switch]['notTriggeredOn'] == true ){
						this.drill_EKbS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							true
						);
					}
				}
			
			}else{
				
				// > 触发（单次）
				var canSetValue = false;
				
				if( cur_triggeredType == 1 ){
					if( Input.drill_isKeyTriggered(cur_keyboardKey) ){
						canSetValue = true;		//按下[一帧]
					}
				}
				if( cur_triggeredType == 2 ){
					if( Input.drill_isKeyReleased(cur_keyboardKey) ){
						canSetValue = true;		//释放[一帧]
					}
				}
				if( cur_triggeredType == 3 ){
					if( Input.drill_isKeyDoubled(cur_keyboardKey) ){
						canSetValue = true;		//双击[一帧]
					}
				}
				
				// > 触发（单次） - 赋值一次
				if( canSetValue ){
					var cur_value = temp_switchEv._drill_EKbS_switchData['switch'][cur_switch]['onceValue'];
					this.drill_EKbS_setValue(
						temp_switchEv._eventId, 
						cur_switch, 
						cur_value
					);
				}
			}
		}
	}
};
//==============================
// * 开关控制 - 执行切换开关
//==============================
Game_Map.prototype.drill_EKbS_setValue = function( event_id, switch_str, enabled ){
	var s_key = [ this._mapId, event_id, switch_str ];
	if( $gameSelfSwitches.value(s_key) === enabled ){ return; }
	$gameSelfSwitches.setValue( s_key, enabled );
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventKeyboradSwitch = false;
		var pluginTip = DrillUp.drill_EKbS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


