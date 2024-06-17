//=============================================================================
// Drill_EventStoppingSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        物体 - 制动开关
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventStoppingSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 物体停止移动超过限时时间后，立即触发独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.你需要先了解基础知识 "8.物体 > 触发的本质.docx"。
 *   详细介绍也可以去看看 "8.物体 > 大家族-开关.docx"。
 * 细节：
 *   (1.制动 即 "刹车"，是指将运行的汽车立即停下、减速的过程。 
 *      制动开关 即 制动传感器一类的开关。
 *      专门监听事件被阻塞不能移动/停止移动的情况，超过限定时间后立即触发。
 *   (2.一般触发制动开关的情况，分为下面两种：
 *      移动路线指令控制持续移动，但是遇到阻碍，不能继续移动，被迫暂停。
 *      移动路线指令执行时，遇到等待帧的指令。
 * 传感器：
 *   (1.制动开关被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      任何一个事件停止移动时，立即计时，超过限定时间后，开启开关。
 *      若事件未超限定时间继续移动，则关闭开关，重新计时。
 *   (2.制动开关的注释设置全都跨事件页。
 *      但是考虑到玩家可能会离开地图，所以最好每个事件页都写注释设置。
 * 阻塞设置：
 *   (1.默认情况下，物体在上方（飞行）或下方（地面）相互不会产生碰撞。
 *      如果不碰撞，那么就不能让制动开关因为阻塞停下的功能生效了。
 *      所以加阻塞的注释可以让飞行/地面物体也能阻塞，从而触发制动开关。
 * 撞击位置：
 *   (1.制动开关触发后，系统会自动记录被撞击的位置，
 *      即触发开关后，事件的朝向的后一格图块。
 *   (2.被撞击的位置可能是墙壁，也可能是一个事件。
 *      你需要考虑击空的情况。
 * 设计：
 *   (1.多用于限时子弹类的事件，碰壁后立即爆炸。
 *      可以与 事件复制器 插件配合使用。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 制动开关
 * 你需要设置指定开关为制动开关，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>制动开关 : 独立开关[A] : 绑定条件 : 停留时间 : 大于[3]
 * 事件注释：=>制动开关 : 独立开关[A] : 绑定条件 : 停留时间 : 小于[3]
 * 事件注释：=>制动开关 : 独立开关[A] : 绑定条件 : 停留时间 : 等于[3]
 * 事件注释：=>制动开关 : 独立开关[A] : 绑定条件 : 停留时间 : 大于等于[3]
 * 事件注释：=>制动开关 : 独立开关[A] : 绑定条件 : 停留时间 : 小于等于[3]
 * 
 * 事件注释：=>制动开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>制动开关 : 独立开关[A] : 满足条件时开启
 * 事件注释：=>制动开关 : 独立开关[A] : 不满足条件时关闭
 *
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发" 就是 "满足条件时开启"的触发+"不满足条件时关闭"的触发 两个触发。
 *   因为"绑定持续触发"更好理解一些，"不满足条件时关闭"这种单向触发容易把自己绕晕，
 *   你也可以去看看 "8.物体 > 触发的本质.docx" 的 开关触发与命题 章节。
 * 2.制动开关的默认停留时间3帧即可，"大于等于[3]"为常用项。
 *   触发描述为："如果事件停留/停止移动的时间大于等于3帧，则开启独立开关A"。
 *   停留时间最小为1，时间0和时间1的效果一样。不过一般都设置2至6的缓冲时间来触发。
 * 3.一个开关只能绑定一个条件，比如"独立开关[A]"写了两条注释"等于[4]"和"等于[3]"，
 *   则插件按写在后面的注释条件来算，写在前面的注释条件作废。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逆向触发
 * 如果你需要设置逆向开启/关闭的触发，使用下面的注释：
 * 
 * 事件注释：=>制动开关 : 独立开关[A] : 绑定持续触发(逆向)
 * 事件注释：=>制动开关 : 独立开关[A] : 满足条件时关闭
 * 事件注释：=>制动开关 : 独立开关[A] : 不满足条件时开启
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发(逆向)" 就是 "满足条件时关闭"的触发+"不满足条件时关闭"的触发 两个触发。
 *   由于是逆向开启/关闭，容易绕晕自己，设计时要小心。
 * 2.注释 "大于[3]" + "绑定持续触发" 等价于 "小于等于[3]" + "绑定持续触发(逆向)" 。
 * 3.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多开关触发
 * 你可以写多个注释，分别建立多个独立开关的触发：
 * 
 * 事件注释：=>制动开关 : 独立开关[A] : 绑定条件 : 停留时间 : 大于等于[3]
 * 事件注释：=>制动开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>制动开关 : 独立开关[B] : 绑定条件 : 停留时间 : 大于等于[3]
 * 事件注释：=>制动开关 : 独立开关[B] : 绑定持续触发
 * 事件注释：=>制动开关 : 独立开关[C] : 绑定条件 : 停留时间 : 大于等于[3]
 * 事件注释：=>制动开关 : 独立开关[C] : 绑定持续触发(逆向)
 * 
 * 1.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 飞行/地面阻塞
 * 如果你需要激活飞行/地面物体的阻塞，使用下面注释：
 * 
 * 事件注释：=>制动开关 : 开启全面阻塞
 * 事件注释：=>制动开关 : 关闭全面阻塞
 * 
 * 1.默认情况下，物体在上方（飞行）或下方（地面）相互不会产生碰撞。
 *   如果不碰撞，那么就不能让制动开关因为阻塞停下的功能生效了。
 *   所以加此注释可以让飞行/地面物体也能阻塞，从而触发制动开关。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令
 * 你可以使用插件指令，直接设置属性：
 * 
 * 插件指令：>制动开关 : 本事件 : 开启全面阻塞
 * 插件指令：>制动开关 : 事件[10] : 开启全面阻塞
 * 插件指令：>制动开关 : 事件变量[21] : 开启全面阻塞
 * 插件指令：>制动开关 : 批量事件[10,11] : 开启全面阻塞
 * 插件指令：>制动开关 : 批量事件变量[21,22] : 开启全面阻塞
 * 
 * 插件指令：>制动开关 : 本事件 : 开启全面阻塞
 * 插件指令：>制动开关 : 本事件 : 恢复默认阻塞
 * 插件指令：>制动开关 : 本事件 : 独立开关[A] : 绑定条件 : 停留时间 : 大于等于[3]
 * 插件指令：>制动开关 : 本事件 : 独立开关[A] : 绑定持续触发
 * 插件指令：>制动开关 : 本事件 : 独立开关[A] : 满足条件时开启
 * 插件指令：>制动开关 : 本事件 : 独立开关[A] : 不满足条件时关闭
 * 插件指令：>制动开关 : 本事件 : 独立开关[A] : 绑定持续触发(逆向)
 * 插件指令：>制动开关 : 本事件 : 独立开关[A] : 满足条件时关闭
 * 插件指令：>制动开关 : 本事件 : 独立开关[A] : 不满足条件时开启
 * 插件指令：>制动开关 : 本事件 : 独立开关[A] : 去除绑定
 * 
 * 1.前面部分（本事件）和后面设置（开启全面阻塞）可以随意组合。
 *   一共有5*10种组合方式。
 * 2.注意，插件指令设置后立即生效，如果目标事件没有移动，可能会立即开启独立开关。
 *   离开重进地图后，插件指令的设置会失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取对象
 * 你可以使用插件指令，获取触发制动后的对象：
 * 
 * 插件指令：>制动开关 : 本事件 : 获取上一个撞击位置 : 变量[25,26]
 * 插件指令：>制动开关 : 事件[10] : 获取上一个撞击位置 : 变量[25,26]
 * 插件指令：>制动开关 : 事件变量[21] : 获取上一个撞击位置 : 变量[25,26]
 * 
 * 1.制动开关触发后，系统会自动记录被撞击的位置，
 *   即触发开关后，事件的朝向的后一格图块。
 * 2.被撞击的位置可能是墙壁，也可能是一个事件。
 *   你需要考虑击空的情况。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 旧指令
 * 你需要设置指定开关为制动开关，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释(旧)：=>制动开关 : 最大暂停时间[3] : 作用于独立开关 : A
 * 
 * 插件指令(旧)：>制动开关 : 本事件 : 最大暂停时间[3] :作用于独立开关 : A
 * 
 * 1."最大暂停时间"的单位为 帧，1秒60帧。
 *   时间最小为1，时间0和时间1的效果一样。不过一般都设置2至6的缓冲时间来触发。
 * 2.制动开关的注释设置全都跨事件页。
 *   但是考虑到玩家可能会离开地图，所以最好每个事件页都写注释设置。
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
 * 测试方法：   去弹丸反射设计关卡，复制20个含制动开关的弹丸，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【22.19ms】
 *              100个事件的地图中，平均消耗为：【14.14ms】
 *               50个事件的地图中，平均消耗为：【11.89ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.制动开关需要实时判定弹丸事件是否停下，有部分消耗，不过并不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 大幅度优化了底层结构，节约了事件数据存储空间。
 * 实现了多个独立开关的制动开关触发功能。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EStS（Event_Stopping_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_EStS
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	机关管理层
//		★性能测试消耗	4.8ms（drill_EStS_updateCommonSwitch）
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
//
//			->☆开关的属性
//				->可多个独立开关触发
//				->触发设置
//					> 满足条件时开启
//					> 不满足条件时关闭
//					> 满足条件时关闭
//					> 不满足条件时开启
//				->绑定条件
//					> 条件类型
//					> 目标时间
//				->上一次碰撞位置
//				->是否全面阻塞
//			->☆制动开关容器
//				->开关的容器
//				->事件清除时
//
//			->☆开关控制
//			->☆制动开关阻塞属性
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
//			1.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//			
//		★其它说明细节：
//			2022-2-1：
//			━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━
//			╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮╭═╩═╮
//			|小 ||爱 ||丽 ||丝 ||祝 ||你 ||虎 ||年 ||大 ||吉 |
//			╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯╰═╦═╯
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
	DrillUp.g_EStS_PluginTip_curName = "Drill_EventStoppingSwitch.js 物体-制动开关";
	DrillUp.g_EStS_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EStS_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EStS_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_EStS_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_EStS_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventStoppingSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventStoppingSwitch');


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EStS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EStS_pluginCommand.call(this, command, args);
	if( command === ">制动开关" ){
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( c_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EStS_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EStS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EStS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EStS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return }; 		
		
		/*-----------------设置属性------------------*/	
		if( args.length == 4 ){
			var temp1 = String(args[3]);
			if( temp1 == "开启全面阻塞" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_setAllBlockEnabled( true );
				}
			}
			if( temp1 == "恢复默认阻塞" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_setAllBlockEnabled( false );
				}
			}
		}
		if( args.length == 6 ){
			var switch_str = String(args[3]);
			var type = String(args[5]);
			switch_str = switch_str.replace("独立开关[","");
			switch_str = switch_str.replace("]","");
			if( type == "绑定持续触发" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_setSwitch_TriggeredOn( switch_str, true );
					c_chars[k].drill_EStS_setSwitch_NotTriggeredOff( switch_str, true );
					c_chars[k].drill_EStS_setSwitch_TriggeredOff( switch_str, false );
					c_chars[k].drill_EStS_setSwitch_NotTriggeredOn( switch_str, false );
				}
				$gameTemp._drill_EStS_needRestatistics = true;
			}
			if( type == "满足条件时开启" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_setSwitch_TriggeredOn( switch_str, true );
					c_chars[k].drill_EStS_setSwitch_TriggeredOff( switch_str, false );
				}
				$gameTemp._drill_EStS_needRestatistics = true;
			}
			if( type == "不满足条件时关闭" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_setSwitch_NotTriggeredOff( switch_str, true );
					c_chars[k].drill_EStS_setSwitch_NotTriggeredOn( switch_str, false );
				}
				$gameTemp._drill_EStS_needRestatistics = true;
			}
			if( type == "绑定持续触发(逆向)" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_setSwitch_TriggeredOn( switch_str, false );
					c_chars[k].drill_EStS_setSwitch_NotTriggeredOff( switch_str, false );
					c_chars[k].drill_EStS_setSwitch_TriggeredOff( switch_str, true );
					c_chars[k].drill_EStS_setSwitch_NotTriggeredOn( switch_str, true );
				}
				$gameTemp._drill_EStS_needRestatistics = true;
			}
			if( type == "满足条件时关闭" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_setSwitch_TriggeredOn( switch_str, false );
					c_chars[k].drill_EStS_setSwitch_TriggeredOff( switch_str, true );
				}
				$gameTemp._drill_EStS_needRestatistics = true;
			}
			if( type == "不满足条件时开启" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_setSwitch_NotTriggeredOff( switch_str, false );
					c_chars[k].drill_EStS_setSwitch_NotTriggeredOn( switch_str, true );
				}
				$gameTemp._drill_EStS_needRestatistics = true;
			}
			if( type == "去除绑定" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_removeSwitch( switch_str );
				}
				$gameTemp._drill_EStS_needRestatistics = true;
			}
		}
		if( args.length == 10 ){
			var switch_str = String(args[3]);
			var type = String(args[5]);
			var temp1 = String(args[7]);
			var temp2 = String(args[9]);
			switch_str = switch_str.replace("独立开关[","");
			switch_str = switch_str.replace("]","");
			if( type == "绑定条件" && 
				(temp1 == "停留时间" || temp1 == "暂停时间" ) ){
				var condition = "大于等于";
				if( temp2.indexOf("大于等于[") != -1 ){
					condition = "大于等于";
				}else if( temp2.indexOf("小于等于[") != -1 ){
					condition = "小于等于";
				}else if( temp2.indexOf("等于[") != -1 ){
					condition = "等于";
				}else if( temp2.indexOf("大于[") != -1 ){
					condition = "大于";
				}else if( temp2.indexOf("小于[") != -1 ){
					condition = "小于";
				}
				var num = 0;
				temp2 = temp2.replace("大于等于[","");
				temp2 = temp2.replace("小于等于[","");
				temp2 = temp2.replace("等于[","");
				temp2 = temp2.replace("大于[","");
				temp2 = temp2.replace("小于[","");
				temp2 = temp2.replace("]","");
				num = Number(temp2);
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_setCondition( switch_str, condition, num );
				}
				$gameTemp._drill_EStS_needRestatistics = true;
			}
		}
		
		/*-----------------获取对象------------------*/	
		if( args.length == 6 ){
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1 == "获取上一个撞击位置" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				var pos_var = temp2.split(/[,，]/);
				if( pos_var.length >= 2 && 
					c_chars.length > 0 &&
					c_chars[0]._drill_EStS_switchData != undefined ){
					var xx = c_chars[0]._drill_EStS_switchData['lastTriggeredX'];
					var yy = c_chars[0]._drill_EStS_switchData['lastTriggeredY'];
					$gameVariables.setValue( Number(pos_var[0]), xx );
					$gameVariables.setValue( Number(pos_var[1]), yy );
				}
			}
		}
		
		
		/*-----------------旧指令------------------*/	
		if( args.length == 8 ){		//>制动开关 : 本事件 : 最大暂停时间[3] :作用于独立开关 : A
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var switch_str = String(args[7]);
			if( temp2 == "作用于独立开关" ){
				temp1 = temp1.replace("最大暂停时间[","");
				temp1 = temp1.replace("最大停留时间[","");
				temp1 = temp1.replace("]","");
				temp1 = Math.max( Number(temp1), 1 );
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EStS_setCondition( switch_str, "大于等于", temp1 );
				}
				$gameTemp._drill_EStS_needRestatistics = true;
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EStS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EStS_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_EStS_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EStS_event_initMembers.call(this);
	this._drill_EStS_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_EStS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EStS_event_setupPage.call(this);
    this.drill_EStS_setupMutiSwitch();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_EStS_setupMutiSwitch = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EStS_isFirstBirth == true ){ 
		this._drill_EStS_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_EStS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EStS_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EStS_readPage = function( page_list ){
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>制动开关" ){
				
				/*-----------------是否全面阻塞------------------*/	
				if( args.length == 2 ){
					var temp1 = String(args[1]);
					if( temp1 == "开启全面阻塞" ){
						this.drill_EStS_setAllBlockEnabled( true );
						$gameTemp._drill_EStS_needRestatistics = true;
					}
					if( temp1 == "关闭全面阻塞" ){
						this.drill_EStS_setAllBlockEnabled( false );
						$gameTemp._drill_EStS_needRestatistics = true;
					}
				}
				
				/*-----------------触发设置------------------*/	
				if( args.length == 8 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					var temp1 = String(args[5]);
					var temp2 = String(args[7]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( type == "绑定条件" && 
					    (temp1 == "停留时间" || temp1 == "暂停时间" ) ){
						var condition = "大于等于";
						if( temp2.indexOf("大于等于[") != -1 ){
							condition = "大于等于";
						}else if( temp2.indexOf("小于等于[") != -1 ){
							condition = "小于等于";
						}else if( temp2.indexOf("等于[") != -1 ){
							condition = "等于";
						}else if( temp2.indexOf("大于[") != -1 ){
							condition = "大于";
						}else if( temp2.indexOf("小于[") != -1 ){
							condition = "小于";
						}
						var num = 0;
						temp2 = temp2.replace("大于等于[","");
						temp2 = temp2.replace("小于等于[","");
						temp2 = temp2.replace("等于[","");
						temp2 = temp2.replace("大于[","");
						temp2 = temp2.replace("小于[","");
						temp2 = temp2.replace("]","");
						num = Number(temp2);
						this.drill_EStS_setCondition( switch_str, condition, num );
						$gameTemp._drill_EStS_needRestatistics = true;
					}
				}
				if( args.length == 4 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( type == "绑定持续触发" ){
						this.drill_EStS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EStS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EStS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EStS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EStS_needRestatistics = true;
					}
					if( type == "满足条件时开启" ){
						this.drill_EStS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EStS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EStS_needRestatistics = true;
					}
					if( type == "不满足条件时关闭" ){
						this.drill_EStS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EStS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EStS_needRestatistics = true;
					}
					if( type == "绑定持续触发(逆向)" ){
						this.drill_EStS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EStS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EStS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EStS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EStS_needRestatistics = true;
					}
					if( type == "满足条件时关闭" ){
						this.drill_EStS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EStS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EStS_needRestatistics = true;
					}
					if( type == "不满足条件时开启" ){
						this.drill_EStS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EStS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EStS_needRestatistics = true;
					}
				}
				
				/*-----------------旧指令------------------*/	
				if( args.length == 6 ){		//=>制动开关 : 最大暂停时间[3] : 作用于独立开关 : A
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var switch_str = String(args[5]);
					if( temp2 == "作用于独立开关" ){
						temp1 = temp1.replace("最大暂停时间[","");
						temp1 = temp1.replace("最大停留时间[","");
						temp1 = temp1.replace("]","");
						temp1 = Math.max( Number(temp1), 1 );
						
						// > 添加独立开关
						this.drill_EStS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EStS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EStS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EStS_setSwitch_NotTriggeredOn( switch_str, false );
						
						// > 添加绑定条件
						this.drill_EStS_setCondition( switch_str, "大于等于", temp1 );
						$gameTemp._drill_EStS_needRestatistics = true;
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
var _drill_EStS_switch_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EStS_switchData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EStS_switch_initialize.call(this);
}
//==============================
// * 开关的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：switchData，一对一。
//==============================
Game_Character.prototype.drill_EStS_checkSwitchData = function(){	
	if( this._drill_EStS_switchData != undefined ){ return; }
	this._drill_EStS_switchData = {};
	this._drill_EStS_switchData['lastTriggeredX'] = -1;		//上一次碰撞位置X
	this._drill_EStS_switchData['lastTriggeredY'] = -1;		//上一次碰撞位置Y
	this._drill_EStS_switchData['stoppingTime'] = 0;		//当前延时时间
	this._drill_EStS_switchData['allBlock'] = false;		//是否全面阻塞
	this._drill_EStS_switchData['switch'] = {};				//独立开关容器
}
//==============================
// * 开关的属性 - 初始化 独立开关容器
//
//			说明：	> 注意，多个注释能触发多个独立开关。
//					> 层面关键字为：['switch']，一对多。
//==============================
Game_Character.prototype.drill_EStS_checkSwitchData_Switch = function( switch_str ){
	this.drill_EStS_checkSwitchData()
	if( this._drill_EStS_switchData['switch'][switch_str] != undefined ){ return; }
	var switch_data = {};
	
	switch_data['triggeredOn'] = false;			//满足条件时开启
	switch_data['notTriggeredOff'] = false;		//不满足条件时关闭
	switch_data['triggeredOff'] = false;		//满足条件时关闭
	switch_data['notTriggeredOn'] = false;		//不满足条件时开启
	
	switch_data['condition'] = "";				//条件类型
	switch_data['tarTime'] = 1;					//目标时间
	
	this._drill_EStS_switchData['switch'][switch_str] = switch_data;
}
//==============================
// * 开关的属性 - 独立开关容器
//==============================
Game_Character.prototype.drill_EStS_hasAnySwitch = function(){
	return this.drill_EStS_getSwitchList().length > 0;
}
//==============================
// * 开关的属性 - 独立开关容器 - 获取列表
//==============================
Game_Character.prototype.drill_EStS_getSwitchList = function(){
	if( this._drill_EStS_switchData == undefined ){ return []; }
	return Object.keys( this._drill_EStS_switchData['switch'] );
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除单个
//==============================
Game_Character.prototype.drill_EStS_removeSwitch = function( switch_str ){
	this.drill_EStS_checkSwitchData()
	this._drill_EStS_switchData['switch'][switch_str] = undefined;
	delete this._drill_EStS_switchData['switch'][switch_str];
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除全部
//==============================
Game_Character.prototype.drill_EStS_clearSwitchList = function(){
	this.drill_EStS_checkSwitchData()
	this._drill_EStS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 设置是否全面阻塞
//==============================
Game_Character.prototype.drill_EStS_setAllBlockEnabled = function( enabled ){
	this.drill_EStS_checkSwitchData();
	this._drill_EStS_switchData['allBlock'] = enabled;
}
//==============================
// * 开关的属性 - 绑定条件
//==============================
Game_Character.prototype.drill_EStS_setCondition = function( switch_str, condition, tarTime ){
	this.drill_EStS_checkSwitchData();
	this.drill_EStS_checkSwitchData_Switch( switch_str );
	this._drill_EStS_switchData['switch'][switch_str]['condition'] = condition;
	this._drill_EStS_switchData['switch'][switch_str]['tarTime'] = Number(tarTime);
	if( isNaN( Number(tarTime) ) ){
		alert( DrillUp.drill_EStS_getPluginTip_ParamIsNaN( "tarTime" ) );
	}
}
//==============================
// * 开关的属性 - 触发设置 - 满足条件时开启
//==============================
Game_Character.prototype.drill_EStS_setSwitch_TriggeredOn = function( switch_str, enabled ){
	this.drill_EStS_checkSwitchData();
	this.drill_EStS_checkSwitchData_Switch( switch_str );
	this._drill_EStS_switchData['switch'][switch_str]['triggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 不满足条件时关闭
//==============================
Game_Character.prototype.drill_EStS_setSwitch_NotTriggeredOff = function( switch_str, enabled ){
	this.drill_EStS_checkSwitchData();
	this.drill_EStS_checkSwitchData_Switch( switch_str );
	this._drill_EStS_switchData['switch'][switch_str]['notTriggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 满足条件时关闭
//==============================
Game_Character.prototype.drill_EStS_setSwitch_TriggeredOff = function( switch_str, enabled ){
	this.drill_EStS_checkSwitchData();
	this.drill_EStS_checkSwitchData_Switch( switch_str );
	this._drill_EStS_switchData['switch'][switch_str]['triggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 不满足条件时开启
//==============================
Game_Character.prototype.drill_EStS_setSwitch_NotTriggeredOn = function( switch_str, enabled ){
	this.drill_EStS_checkSwitchData();
	this.drill_EStS_checkSwitchData_Switch( switch_str );
	this._drill_EStS_switchData['switch'][switch_str]['notTriggeredOn'] = enabled;
}


//=============================================================================
// ** ☆制动开关容器
//
//			说明：	> 此模块专门定义 制动开关 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_EStS_clearTemp = function(){
	this._drill_EStS_switchTank = [];
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_EStS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EStS_temp_initialize.call(this);
	this.drill_EStS_clearTemp();
	this._drill_EStS_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EStS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_EStS_clearTemp();
	$gameTemp._drill_EStS_needRestatistics = true;
	_drill_EStS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EStS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_EStS_clearTemp();
	$gameTemp._drill_EStS_needRestatistics = true;
	_drill_EStS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EStS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EStS_map_update.call( this, sceneActive );
	this.drill_EStS_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EStS_updateRestatistics = function(){
	if( $gameTemp._drill_EStS_needRestatistics != true ){ return }
	$gameTemp._drill_EStS_needRestatistics = false;
	
	$gameTemp._drill_EStS_switchTank = [];
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.drill_EStS_hasAnySwitch() ){
			$gameTemp._drill_EStS_switchTank.push(temp_event);
		}
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_EStS_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EStS_erase.call(this);
	if( this.drill_EStS_hasAnySwitch() ){
		$gameTemp._drill_EStS_needRestatistics = true;
	}
};




//=============================================================================
// ** ☆开关控制
//
//			说明：	> 此模块管理 制动开关 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制 - 帧刷新
//==============================
var _drill_EStS_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EStS_map_update2.call( this, sceneActive );
	this.drill_EStS_updateStoppingTime();
	this.drill_EStS_updateCommonSwitch();
}
//==============================
// * 开关控制 - 帧刷新 停留时间
//==============================
Game_Map.prototype.drill_EStS_updateStoppingTime = function() {
	for( var i = 0; i < $gameTemp._drill_EStS_switchTank.length; i++ ){
		var temp_switchEv = $gameTemp._drill_EStS_switchTank[i];
		if( temp_switchEv.isStopping() ){
			temp_switchEv._drill_EStS_switchData['stoppingTime'] += 1;
		}else{
			temp_switchEv._drill_EStS_switchData['stoppingTime'] = 0;
		}
	}
}
//==============================
// * 开关控制 - 帧刷新 制动开关
//==============================
Game_Map.prototype.drill_EStS_updateCommonSwitch = function() {
	
	// > 制动开关
	for( var i = 0; i < $gameTemp._drill_EStS_switchTank.length; i++ ){
		var temp_switchEv = $gameTemp._drill_EStS_switchTank[i];
		
		// > 数据 - switchData层面（与事件一对一）
		var stoppingTime = temp_switchEv._drill_EStS_switchData['stoppingTime'];
		
		var switch_list = temp_switchEv.drill_EStS_getSwitchList();
		if( switch_list.length == 0 ){ continue; }
		
		// > 数据 - ['switch']层面（与事件一对多）
		for(var j = 0; j < switch_list.length; j++ ){
			var cur_switch = switch_list[j];
			
			// > 触发
			var isTriggered = false;
			var condition = temp_switchEv._drill_EStS_switchData['switch'][cur_switch]['condition'];
			var tarTime = temp_switchEv._drill_EStS_switchData['switch'][cur_switch]['tarTime'];
			if( condition == "" || condition == "大于等于" ){
				if( stoppingTime >= tarTime ){
					isTriggered = true;
				}
			}
			if( condition == "小于等于" ){
				if( stoppingTime <= tarTime ){
					isTriggered = true;
				}
			}
			if( condition == "等于" ){
				if( stoppingTime == tarTime ){
					isTriggered = true;
				}
			}
			if( condition == "大于" ){
				if( stoppingTime > tarTime ){
					isTriggered = true;
				}
			}
			if( condition == "小于" ){
				if( stoppingTime < tarTime ){
					isTriggered = true;
				}
			}
			
			// > 标记上一次碰撞位置
			if( isTriggered ){
				
				// > 标记上一次碰撞位置（斜向朝向情况）【物体 - 事件转向】
				if( Imported.Drill_EventDirection &&
					temp_switchEv.drill_EDi_isDirectionDiagonal() ){
					var di = temp_switchEv.drill_EDi_getDiagonalDirection( temp_switchEv.direction() );
					var xx = temp_switchEv._x;
					var yy = temp_switchEv._y;
					xx = this.roundXWithDirection( xx, di[0] );	//（斜向有两个方向分量，前进两步）
					yy = this.roundXWithDirection( yy, di[0] );
					xx = this.roundXWithDirection( xx, di[1] );
					yy = this.roundXWithDirection( yy, di[1] );
					temp_switchEv._drill_EStS_switchData['lastTriggeredX'] = xx;
					temp_switchEv._drill_EStS_switchData['lastTriggeredY'] = yy;
					
				// > 标记上一次碰撞位置（默认）
				}else{
					temp_switchEv._drill_EStS_switchData['lastTriggeredX'] = this.roundXWithDirection( temp_switchEv._x, temp_switchEv.direction() );
					temp_switchEv._drill_EStS_switchData['lastTriggeredY'] = this.roundYWithDirection( temp_switchEv._y, temp_switchEv.direction() );
				}
			}
			
			// > 触发 - 满足条件时
			if( isTriggered ){
				
				if( temp_switchEv._drill_EStS_switchData['switch'][cur_switch]['triggeredOn'] == true ){
					this.drill_EStS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
				if( temp_switchEv._drill_EStS_switchData['switch'][cur_switch]['triggeredOff'] == true ){
					this.drill_EStS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				
			// > 触发 - 不满足条件时
			}else{
				
				if( temp_switchEv._drill_EStS_switchData['switch'][cur_switch]['notTriggeredOff'] == true ){
					this.drill_EStS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				if( temp_switchEv._drill_EStS_switchData['switch'][cur_switch]['notTriggeredOn'] == true ){
					this.drill_EStS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
			}
		}
	}
};
//==============================
// * 开关控制 - 执行切换开关
//==============================
Game_Map.prototype.drill_EStS_setValue = function( event_id, switch_str, enabled ){
	var s_key = [ this._mapId, event_id, switch_str ];
	if( $gameSelfSwitches.value(s_key) === enabled ){ return; }
	$gameSelfSwitches.setValue( s_key, enabled );
};


//=============================================================================
// ** ☆制动开关阻塞属性
//
//			说明：	> 此模块专门定义 开关的阻塞属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 可通行 - 判断 - 物体碰撞（与事件）『体积的阻塞与穿透』
//
//			说明：	> 注意，只考虑碰撞（返回true）的情况，其他情况不要覆盖了。
//==============================
var _drill_EStS_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
Game_Event.prototype.isCollidedWithEvents = function( x, y ){
	if( this._drill_EStS_switchData != undefined &&
		this._drill_EStS_switchData['allBlock'] == true ){
		var events = $gameMap.eventsXyNt(x, y);
		if( events.length > 0 ){
			return true;
		}
	}
	return _drill_EStS_isCollidedWithEvents.call( this, x, y );
}
//==============================
// * 可通行 - 判断 - 物体碰撞（与玩家）『体积的阻塞与穿透』
//==============================
var _drill_EStS_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
Game_Event.prototype.isCollidedWithPlayerCharacters = function( x, y ){
	if( this._drill_EStS_switchData != undefined &&
		this._drill_EStS_switchData['allBlock'] == true ){
		if( $gamePlayer.isCollided(x, y) ){
			return true;
		}
	}
	return _drill_EStS_isCollidedWithPlayerCharacters.call( this, x, y );
}

