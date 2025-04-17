//=============================================================================
// Drill_EventPressureSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        物体 - 重力开关
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventPressureSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 任何事件踩到开关时，立即按下，离开开关时，立即弹出。
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
 *   (1.重力开关在事件完全踩在它身上之前，就会立即做出反应。
 *      跟随的玩家队员不会对重力开关有任何影响，只有领队与事件可以。
 *   (2.插件本身不会提供按下、弹起的缓冲过程，此功能需要你自己写事件页
 *      来控制，可以去 机关管理层示例 了解用法。
 * 传感器：
 *   (1.重力开关被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      事件/玩家踩到开关时，立即按下，离开开关时，立即弹出。
 *   (2.重力开关的注释设置全都跨事件页。
 *      但是考虑到玩家可能会离开地图，所以最好每个事件页都写注释设置。
 * 脉冲开关：
 *   (1.脉冲开关即踩第一次，按下，离开后踩第二次，弹出，如此往复。
 *   (2.重力开关二次迭代可以制作成脉冲开关，原理可见文档。
 *      你也可以直接参考示例中的开关，或者复制粘贴。
 * 钥匙/锁：
 *   (1.你可以设置 条件钥匙事件 和 条件锁事件 。
 *      只有指定的钥匙，压在上面才可以开启指定的条件锁。
 *   (2.同一个事件可以带上多个钥匙，或者多把锁。
 *      只要锁和钥匙的关键字相互对应上，压着才能够触发重力开关。
 * 设计：
 *   (1.多用于箱子与按压板之类的解谜游戏。
 *      通常与 计数开关 结合，制作箱子按压多个开关才能开启门的解谜。
 *   (2.注意，如果你设计了arpg事件战斗的游戏，事件死亡切换事件页后，
 *      需要关闭重力作用，不然该事件将会持续按压重力开关，使得开关
 *      无法弹起或再次触发。
 *   (3.两个重力开关如果相互碰撞，会相互触发重力，注意避免此情况。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要设置指定开关为重力开关，使用下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>重力开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>重力开关 : 独立开关[A] : 踩住时开启
 * 事件注释：=>重力开关 : 独立开关[A] : 没踩住时关闭
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发" 就是 "踩住时开启"的触发+"没踩住时关闭"的触发 两个触发。
 *   因为"绑定持续触发"更好理解一些，"没踩住时关闭"这种单向触发的容易把自己绕晕，
 *   你也可以去看看 "8.物体 > 触发的本质.docx" 的 开关触发与命题 章节。
 * 2.重力开关的注释设置全都跨事件页，在第一页设置重力开关后，就永久绑定了。
 *   切换事件页 不能实现 启用/禁用 的重力开关绑定。
 * 3.注意，若写了多条注释如"独立开关[A]"、"独立开关[B]"，
 *   则会根据注释，对多个独立开关进行不同的触发。
 * 4.只用"踩住时开启"的注释，能实现玩家踩了一次重力开关之后，不会回弹的效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逆向触发
 * 如果你需要设置逆向开启/关闭的触发，使用下面的注释：
 * 
 * 事件注释：=>重力开关 : 独立开关[A] : 绑定持续触发(逆向)
 * 事件注释：=>重力开关 : 独立开关[A] : 踩住时关闭
 * 事件注释：=>重力开关 : 独立开关[A] : 没踩住时开启
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发(逆向)" 就是 "踩住时关闭"的触发+"没踩住时开启"的触发 两个触发。
 *   由于是逆向开启/关闭，容易绕晕自己，设计时要小心。
 * 2.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多开关触发
 * 你可以写多个注释，分别建立多个独立开关的触发：
 * 
 * 事件注释：=>重力开关 : 独立开关[A] : 绑定持续触发
 * 事件注释：=>重力开关 : 独立开关[B] : 绑定持续触发
 * 事件注释：=>重力开关 : 独立开关[C] : 绑定持续触发(逆向)
 * 
 * 1.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 重力作用
 * 如果你要设置一个对重力开关不起作用的事件，可以添加下面注释：
 * （注意，冒号左右有一个空格）
 *
 * 事件注释：=>重力开关 : 关闭重力作用
 * 
 * 1.该注释需要写在一般事件身上。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 条件钥匙/条件锁
 * 你可以设置只有含有条件钥匙的事件才能触发条件锁的开关。
 * 
 * 事件注释：=>重力开关 : 添加条件钥匙 : 条件[钥匙_A]
 * 
 * 事件注释：=>重力开关 : 独立开关[A] : 添加条件锁 : 条件[钥匙_A]
 * 
 * 1.条件钥匙的注释 需要写在一般事件身上。
 *   条件锁的注释 需要添加到已绑定持续触发的 重力开关 上。
 *   注意，"添加条件锁"注释单独不能用，需要先加"绑定持续触发"的注释。
 * 2.同一个事件可以带上多个钥匙，同一个重力开关可以带上多把锁。
 *   只要锁和钥匙的关键字相互对应上，压着才能够触发重力开关。
 * 3.写"条件[钥匙_A]"与直接写"钥匙_A"效果一样，只是前者容易理解一些。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令控制
 * 你可以使用插件指令，直接设置属性：
 * 
 * 插件指令：>重力开关 : 玩家 : 开启重力作用
 * 插件指令：>重力开关 : 本事件 : 开启重力作用
 * 插件指令：>重力开关 : 事件[10] : 开启重力作用
 * 插件指令：>重力开关 : 事件变量[21] : 开启重力作用
 * 插件指令：>重力开关 : 批量事件[10,11] : 开启重力作用
 * 插件指令：>重力开关 : 批量事件变量[21,22] : 开启重力作用
 * 
 * 插件指令：>重力开关 : 玩家 : 开启重力作用
 * 插件指令：>重力开关 : 玩家 : 关闭重力作用
 * 插件指令：>重力开关 : 玩家 : 添加条件钥匙 : 条件[钥匙_B]
 * 插件指令：>重力开关 : 玩家 : 去除条件钥匙 : 条件[钥匙_B]
 * 插件指令：>重力开关 : 玩家 : 去除全部条件钥匙
 * 
 * 1.前半部分（玩家）和 后半部分（开启重力作用）
 *   的参数可以随意组合。一共有6*5种组合方式。
 * 2.插件指令设置了玩家后，永久有效。
 *   插件指令设置了事件后，只在当前地图有效。因为离开地图后事件会重建。
 * 3.写"条件[钥匙_B]"与直接写"钥匙_B"效果一样，只是前者容易理解一些。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取对象
 * 你可以使用插件指令，获取事件ID：
 * 
 * 插件指令：>重力开关 : 本事件 : 获取上一个踩住时的事件ID : 变量[21]
 * 插件指令：>重力开关 : 事件[10] : 获取上一个踩住时的事件ID : 变量[21]
 * 插件指令：>重力开关 : 事件变量[21] : 获取上一个踩住时的事件ID : 变量[21]
 * 
 * 1.每个重力开关触发重力后，会记录上一个踩住时的重力事件ID。
 *   由于可能存在多个事件几乎同时触发重力开关的情况，多个时会选择id最小的。
 *   所以此插件指令只适用于触发重力后立即执行的事件页。
 * 2.如果没有任何重力事件触发，那么变量值会赋予"-1"，
 *   由于玩家不是事件，所以如果是玩家触发的重力，那么变量值会赋予"-2"。
 *   如果多个事件处于开关上，那么将获取到id最小的事件（玩家按-2算）。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 旧指令
 * 旧指令的格式相对没有那么规范，但是一样有效：
 * 
 * 事件注释(旧)：=>重力开关 : 作用于独立开关 : A
 * 
 * 事件注释(旧)：=>重力开关 : 重力钥匙 : 钥匙_A
 * 事件注释(旧)：=>重力开关 : 重力锁 : 钥匙_A : 作用于独立开关 : A
 * 
 * 1."作用于独立开关 : A" 等同于 "独立开关[A] : 绑定持续触发"。
 * 2.旧指令的"重力锁"等同于 绑定持续触发+添加条件锁 两条注释，
 *   现由于条件锁可以单独绑定，所以新指令拆开成了两个注释。
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
 * 测试方法：   去设计关卡，复制足够多的重力开关，测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【76.00ms】
 *              100个事件的地图中，平均消耗为：【44.80ms】
 *               50个事件的地图中，平均消耗为：【20.50ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于重力开关是常用开关，所以数量都比较多。
 *   并且开关数量与消耗为线性增长，所以看起来重力开关比其他开关消耗更多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * [v1.2]
 * 添加了条件钥匙和条件锁的功能，并添加了插件性能说明。
 * [v1.3]
 * 修复了切换事件页 + 离开地图 + 再回来，开关失效的bug。
 * 修改了注释说明。
 * [v1.4]
 * 添加了插件指令控制。
 * [v1.5]
 * 添加了 获取上一个触发重力的事件ID 的功能，修复了 事件消除 后，重力仍然存在的bug。
 * [v1.6]
 * 优化了底层，提升了性能，减轻了脉冲开关关卡地图的卡顿问题。
 * [v1.7]
 * 大幅度优化了底层结构，节约了事件数据存储空间。
 * 实现了多个独立开关的重力触发功能。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EPS（Event_Pressure_Switch）
//		临时全局变量	无
//		临时局部变量	this._drill_EPS
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	机关管理层
//		★性能测试消耗	20.5ms、15.8ms（drill_EPS_updateSwitch）44.8ms（drill_EPS_getSlotId）
//						108.7ms、76.0ms（drill_EPS_updatePositionTank）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录
//			2022-10-6优化：
//				每次帧刷新都 翻新一次坐标容器，减少每个锁遍历 全图事件 的次数。
//				脉冲开关关卡极端情况 4305.9ms，优化后降低到 271.8ms。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆事件注释
//			->☆存储数据
//			
//			->☆物体的属性
//				->重力作用
//				->条件钥匙
//			->☆开关的属性
//				->可多个独立开关触发
//				->触发设置
//					> 踩住时开启
//					> 没踩住时关闭
//					> 踩住时关闭
//					> 没踩住时开启
//				->上一个踩住时的事件ID
//				->条件锁
//			->☆重力开关容器
//				->开关的容器
//				->事件清除时
//			
//			->☆开关控制
//			->☆开关控制（坐标容器）
//			->☆开关控制（触发设置）
//				->是否能被按下
//				->是否满足条件锁
//				->帧刷新 重力开关（重力开关列表 > 独立开关列表 > 物体判定）
//				->执行切换开关
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
//			1.一只老鼠提醒你，我可没有那么重能踩下重力开关哦。
//				   .--,       .--,
//				  ( (  \.---./  ) )
//				   '.__/o   o\__.'
//				      {=  ^  =}
//				       >  -  <
//				      /       \
//				     //       \\
//				    //|   .   |\\
//				    "'\       /'"_.-~
//				       \  _  /--'
//				     ___)( )(___
//				    (((__) (__)))
//		
//		★其它说明细节：
//			1.每次检查坐标情况，来确定开关是否被压住。
//			2.优化：地图中所有容器都为空时，不工作。
//			3.钥匙赋值为：{"开关_A":true,"开关_B":true} 只看键是否存在。
//			  锁赋值为：  {"开关_A":"A", "开关_B":"A"}  需要检查键，并且对应的值是开启的独立开关。
//			  如果没有触发，则锁的所有键对应的开关会关闭。
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
	DrillUp.g_EPS_PluginTip_curName = "Drill_EventPressureSwitch.js 物体-重力开关";
	DrillUp.g_EPS_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EPS_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EPS_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventPressureSwitch = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventPressureSwitch');



//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_EPS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_EPS_pluginCommand.call(this, command, args);
	this.drill_EPS_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_EPS_pluginCommand = function( command, args ){
	if( command === ">重力开关" ){
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( c_chars == null && unit == "玩家" ){
				c_chars = [ $gamePlayer ];
			}
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
					if( $gameMap.drill_EPS_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EPS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EPS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EPS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return };
		
		
		/*-----------------重力作用------------------*/	
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "开启重力作用" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EPS_setPressEnabled( true );
				}
			}
			if( type == "关闭重力作用" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EPS_setPressEnabled( false );
				}
			}
		}
		
		/*-----------------条件钥匙------------------*/	
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			temp1 = temp1.replace("条件[","");
			temp1 = temp1.replace("]","");
			if( type == "添加条件钥匙" || type == "添加重力钥匙" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EPS_addConditionKey( temp1 );
				}
			}
			if( type == "去除条件钥匙" || type == "去除重力钥匙" || 
				type == "去掉条件钥匙" || type == "去掉重力钥匙" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EPS_removeConditionKey( temp1 );
				}
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除全部条件钥匙" || type == "去除全部重力钥匙" ||
				type == "去掉全部条件钥匙" || type == "去掉全部重力钥匙" ){
				for( var k=0; k < c_chars.length; k++ ){
					c_chars[k].drill_EPS_clearConditionKey();
				}
			}
		}
		
		/*-----------------上一个踩住时的事件ID------------------*/	
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "获取上一个踩住时的事件ID" || type == "获取上一个触发重力的事件ID" ){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				if( c_chars.length > 0 ){
					var id = c_chars[0].drill_EPS_getLastEventId();
					$gameVariables.setValue( temp1, id );
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EPS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EPS_getPluginTip_EventNotFind( e_id ) );
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
var _drill_EPS_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function(){
	_drill_EPS_event_initMembers.call(this);
	this._drill_EPS_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定
//==============================
var _drill_EPS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function(){
	_drill_EPS_event_setupPage.call(this);
    this.drill_EPS_setupPressSwitch();
};
//==============================
// * 事件注释 - 初始化绑定
//==============================
Game_Event.prototype.drill_EPS_setupPressSwitch = function(){
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EPS_isFirstBirth == true ){ 
		this._drill_EPS_isFirstBirth = undefined;		//『节约临时参数存储空间』
		this.drill_EPS_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EPS_readPage( this.list() );
	}
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EPS_readPage = function( page_list ){		
	page_list.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>重力开关" ){
				
				/*-----------------重力作用------------------*/	
				if( args.length == 2 ){		//=>重力开关 : 关闭重力作用
					var temp1 = String(args[1]);
					if( temp1 == "关闭重力作用" ){
						this.drill_EPS_setPressEnabled( false );
						$gameTemp._drill_EPS_needRestatistics = true;
					}
				}
				
				/*-----------------条件钥匙------------------*/	
				if( args.length == 4 ){		//=>重力开关 : 添加条件钥匙 : 条件[钥匙_A]
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					temp2 = temp2.replace("条件[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "添加条件钥匙" ){
						this.drill_EPS_addConditionKey( temp2 );
						$gameTemp._drill_EPS_needRestatistics = true;
					}
				}
				
				/*-----------------触发设置------------------*/	
				if( args.length == 4 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( type == "绑定持续触发" ){
						this.drill_EPS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EPS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EPS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EPS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EPS_needRestatistics = true;
					}
					if( type == "踩住时开启" ){
						this.drill_EPS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EPS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EPS_needRestatistics = true;
					}
					if( type == "没踩住时关闭" ){
						this.drill_EPS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EPS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EPS_needRestatistics = true;
					}
					if( type == "绑定持续触发(逆向)" ){
						this.drill_EPS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EPS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EPS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EPS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EPS_needRestatistics = true;
					}
					if( type == "踩住时关闭" ){
						this.drill_EPS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EPS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EPS_needRestatistics = true;
					}
					if( type == "没踩住时开启" ){
						this.drill_EPS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EPS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EPS_needRestatistics = true;
					}
				}
				
				/*-----------------条件锁------------------*/	
				if( args.length == 6 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					var temp2 = String(args[5]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					temp2 = temp2.replace("条件[","");
					temp2 = temp2.replace("]","");
					if( type == "添加条件锁" ){
						this.drill_EPS_addConditionLock( switch_str, temp2 );
					}
				}
				
				
				/*-----------------旧指令------------------*/
				if( args.length == 4 ){
					var temp1 = String(args[1]);
					var switch_str = String(args[3]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( temp1 == "作用于独立开关" ){
						this.drill_EPS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EPS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EPS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EPS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EPS_needRestatistics = true;
						
						//alert( JSON.stringify( this._drill_EPS_switchData ) );
					}
				}
				if( args.length == 4 ){
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					temp2 = temp2.replace("条件[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "重力钥匙" ){
						this.drill_EPS_addConditionKey( temp2 );
						$gameTemp._drill_EPS_needRestatistics = true;
					}
				}
				if( args.length == 8 ){
					var temp1 = String(args[1]);
					var temp2 = String(args[3]);
					var temp3 = String(args[5]);
					var switch_str = String(args[7]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					temp2 = temp2.replace("条件[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "重力锁" && temp3 == "作用于独立开关" ){
						
						// > 添加独立开关
						this.drill_EPS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EPS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EPS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EPS_setSwitch_NotTriggeredOn( switch_str, false );
						
						// > 添加条件锁
						this.drill_EPS_addConditionLock( switch_str, temp2 );
						
						$gameTemp._drill_EPS_needRestatistics = true;
					}
				}
				
			};
		};
	}, this);
};
	
	
//=============================================================================
// ** ☆物体的属性
//
//			说明：	> 此模块专门定义 物体的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体的属性 - 初始化
//==============================
var _drill_EPS_key_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EPS_pressureData = undefined;
	_drill_EPS_key_initialize.call(this);
}
//==============================
// * 物体的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：pressureData，一对一。
//==============================
Game_Character.prototype.drill_EPS_checkPressureData = function(){
	if( this._drill_EPS_pressureData != undefined ){ return; }
	this._drill_EPS_pressureData = {};
	this._drill_EPS_pressureData['pressEnabled'] = true;	//重力作用
	this._drill_EPS_pressureData['conditionKey'] = [];		//条件钥匙
}
//==============================
// * 物体的属性 - 重力作用
//==============================
Game_Character.prototype.drill_EPS_pressEnabled = function(){
	if( this._drill_EPS_pressureData == undefined ){ return true; }		//（物体默认具备重力作用）
	return this._drill_EPS_pressureData['pressEnabled'];
}
//==============================
// * 物体的属性 - 重力作用 - 设置
//==============================
Game_Character.prototype.drill_EPS_setPressEnabled = function( enabled ){
	this.drill_EPS_checkPressureData();
	this._drill_EPS_pressureData['pressEnabled'] = enabled;
}
//==============================
// * 物体的属性 - 条件钥匙
//==============================
Game_Character.prototype.drill_EPS_hasAnyConditionKey = function(){
	return this.drill_EPS_getConditionKeyList().length > 0;
}
//==============================
// * 物体的属性 - 条件钥匙 - 获取列表
//==============================
Game_Character.prototype.drill_EPS_getConditionKeyList = function(){
	if( this._drill_EPS_pressureData == undefined ){ return []; }
	return this._drill_EPS_pressureData['conditionKey'];
}
//==============================
// * 物体的属性 - 条件钥匙 - 添加
//==============================
Game_Character.prototype.drill_EPS_addConditionKey = function( key ){
	this.drill_EPS_checkPressureData();
	for(var i = 0; i < this._drill_EPS_pressureData['conditionKey'].length; i++ ){
		var cur_key = this._drill_EPS_pressureData['conditionKey'][i];
		if( cur_key == key ){ return; }		//（不重复添加）
	}
	this._drill_EPS_pressureData['conditionKey'].push(key);
}
//==============================
// * 物体的属性 - 条件钥匙 - 删除
//==============================
Game_Character.prototype.drill_EPS_removeConditionKey = function( key ){
	this.drill_EPS_checkPressureData();
	for(var i = this._drill_EPS_pressureData['conditionKey'].length -1; i >= 0; i-- ){
		var cur_key = this._drill_EPS_pressureData['conditionKey'][i];
		if( cur_key == key ){
			this._drill_EPS_pressureData['conditionKey'].splice( i, 1 );
		}
	}
}
//==============================
// * 物体的属性 - 条件钥匙 - 删除全部
//==============================
Game_Character.prototype.drill_EPS_clearConditionKey = function(){
	this.drill_EPS_checkPressureData();
	this._drill_EPS_pressureData['conditionKey'] = [];
}


//=============================================================================
// ** ☆开关的属性
//
//			说明：	> 此模块专门定义 开关的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关的属性 - 初始化
//==============================
var _drill_EPS_switch_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EPS_switchData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EPS_switch_initialize.call(this);
}
//==============================
// * 开关的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：switchData，一对一。
//==============================
Game_Character.prototype.drill_EPS_checkSwitchData = function(){	
	if( this._drill_EPS_switchData != undefined ){ return; }
	this._drill_EPS_switchData = {};
	this._drill_EPS_switchData['lastEventId'] = -1;			//上一个踩住时的事件ID
	this._drill_EPS_switchData['switch'] = {};				//独立开关容器
}
//==============================
// * 开关的属性 - 初始化 独立开关容器
//
//			说明：	> 注意，重力开关能控制多个独立开关。
//					> 层面关键字为：['switch']，一对多。
//==============================
Game_Character.prototype.drill_EPS_checkSwitchData_Switch = function( switch_str ){
	this.drill_EPS_checkSwitchData()
	if( this._drill_EPS_switchData['switch'][switch_str] != undefined ){ return; }
	var switch_data = {};
	
	switch_data['triggeredOn'] = false;			//踩住时开启
	switch_data['notTriggeredOff'] = false;		//没踩住时关闭
	switch_data['triggeredOff'] = false;		//踩住时关闭
	switch_data['notTriggeredOn'] = false;		//没踩住时开启
	
	switch_data['conditionLock'] = [];			//条件锁
	
	this._drill_EPS_switchData['switch'][switch_str] = switch_data;
}
//==============================
// * 开关的属性 - 上一个踩住时的事件ID
//==============================
Game_Character.prototype.drill_EPS_getLastEventId = function(){
	if( this._drill_EPS_switchData == undefined ){ return -1; }
	return this._drill_EPS_switchData['lastEventId'];
}
//==============================
// * 开关的属性 - 独立开关容器
//==============================
Game_Character.prototype.drill_EPS_hasAnySwitch = function(){
	return this.drill_EPS_getSwitchList().length > 0;
}
//==============================
// * 开关的属性 - 独立开关容器 - 获取列表
//==============================
Game_Character.prototype.drill_EPS_getSwitchList = function(){
	if( this._drill_EPS_switchData == undefined ){ return []; }
	return Object.keys( this._drill_EPS_switchData['switch'] );
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除单个
//==============================
Game_Character.prototype.drill_EPS_removeSwitch = function( switch_str ){
	this.drill_EPS_checkSwitchData()
	this._drill_EPS_switchData['switch'][switch_str] = undefined;
	delete this._drill_EPS_switchData['switch'][switch_str];
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除全部
//==============================
Game_Character.prototype.drill_EPS_clearSwitchList = function(){
	this.drill_EPS_checkSwitchData()
	this._drill_EPS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 触发设置 - 踩住时开启
//==============================
Game_Character.prototype.drill_EPS_setSwitch_TriggeredOn = function( switch_str, enabled ){
	this.drill_EPS_checkSwitchData();
	this.drill_EPS_checkSwitchData_Switch( switch_str );
	this._drill_EPS_switchData['switch'][switch_str]['triggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 没踩住时关闭
//==============================
Game_Character.prototype.drill_EPS_setSwitch_NotTriggeredOff = function( switch_str, enabled ){
	this.drill_EPS_checkSwitchData();
	this.drill_EPS_checkSwitchData_Switch( switch_str );
	this._drill_EPS_switchData['switch'][switch_str]['notTriggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 踩住时关闭
//==============================
Game_Character.prototype.drill_EPS_setSwitch_TriggeredOff = function( switch_str, enabled ){
	this.drill_EPS_checkSwitchData();
	this.drill_EPS_checkSwitchData_Switch( switch_str );
	this._drill_EPS_switchData['switch'][switch_str]['triggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 没踩住时开启
//==============================
Game_Character.prototype.drill_EPS_setSwitch_NotTriggeredOn = function( switch_str, enabled ){
	this.drill_EPS_checkSwitchData();
	this.drill_EPS_checkSwitchData_Switch( switch_str );
	this._drill_EPS_switchData['switch'][switch_str]['notTriggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 条件锁
//
//			说明：	> 注意，多个注释能触发多个独立开关，所以独立开关是一个必要参数，不要漏了。
//==============================
Game_Character.prototype.drill_EPS_hasConditionLock = function( switch_str ){
	return this.drill_EPS_getConditionLock( switch_str ).length > 0;
}
//==============================
// * 开关的属性 - 条件锁 - 获取列表
//
//			说明：	> 注意，多个注释能触发多个独立开关，所以独立开关是一个必要参数，不要漏了。
//==============================
Game_Character.prototype.drill_EPS_getConditionLock = function( switch_str ){
	if( this._drill_EPS_switchData == undefined ){ return []; }
	if( this._drill_EPS_switchData['switch'][switch_str] == undefined ){ return []; }
	return this._drill_EPS_switchData['switch'][switch_str]['conditionLock'];
}
//==============================
// * 开关的属性 - 条件锁 - 添加
//==============================
Game_Character.prototype.drill_EPS_addConditionLock = function( switch_str, key ){
	this.drill_EPS_checkSwitchData();
	this.drill_EPS_checkSwitchData_Switch( switch_str );	//（条件锁注释 可以写在 绑定持续触发注释 的前面）
	for(var i = 0; i < this._drill_EPS_switchData['switch'][switch_str]['conditionLock'].length; i++ ){
		var cur_key = this._drill_EPS_switchData['switch'][switch_str]['conditionLock'][i];
		if( cur_key == key ){ return; }		//（不重复添加）
	}
	this._drill_EPS_switchData['switch'][switch_str]['conditionLock'].push(key);
}
//==============================
// * 开关的属性 - 条件锁 - 删除
//==============================
Game_Character.prototype.drill_EPS_removeConditionLock = function( switch_str, key ){
	this.drill_EPS_checkSwitchData();
	if( this._drill_EPS_switchData['switch'][switch_str] == undefined ){ return; }
	for(var i = this._drill_EPS_switchData['switch'][switch_str]['conditionLock'].length -1; i >= 0; i-- ){
		var cur_key = this._drill_EPS_switchData['switch'][switch_str]['conditionLock'][i];
		if( cur_key == key ){
			this._drill_EPS_switchData['switch'][switch_str]['conditionLock'].splice( i, 1 );
		}
	}
}
//==============================
// * 开关的属性 - 条件锁 - 删除全部
//==============================
Game_Character.prototype.drill_EPS_clearConditionLock = function( switch_str ){
	this.drill_EPS_checkSwitchData();
	if( this._drill_EPS_switchData['switch'][switch_str] == undefined ){ return; }
	this._drill_EPS_switchData['switch'][switch_str]['conditionLock'] = [];
}


//=============================================================================
// ** ☆重力开关容器
//
//			说明：	> 此模块专门定义 重力开关 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_EPS_clearTemp = function(){
	this._drill_EPS_switchTank = [];
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_EPS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EPS_temp_initialize.call(this);
	this.drill_EPS_clearTemp();
	this._drill_EPS_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EPS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_EPS_clearTemp();
	$gameTemp._drill_EPS_needRestatistics = true;
	_drill_EPS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EPS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_EPS_clearTemp();
	$gameTemp._drill_EPS_needRestatistics = true;
	_drill_EPS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EPS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EPS_map_update.call( this, sceneActive );
	this.drill_EPS_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EPS_updateRestatistics = function(){
	if( $gameTemp._drill_EPS_needRestatistics != true ){ return }
	$gameTemp._drill_EPS_needRestatistics = false;
	
	$gameTemp._drill_EPS_switchTank = [];		//重力开关容器
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.drill_EPS_hasAnySwitch() ){
			$gameTemp._drill_EPS_switchTank.push(temp_event);
		}
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_EPS_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EPS_erase.call(this);
	if( this.drill_EPS_hasAnySwitch() ){
		$gameTemp._drill_EPS_needRestatistics = true;
	}
};



//=============================================================================
// ** ☆开关控制
//
//			说明：	> 此模块管理 重力开关 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制 - 帧刷新
//==============================
var _drill_EPS_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EPS_map_update2.call( this, sceneActive );
	if( this.drill_EPS_isOptimizationPassed() == false ){ return; }
	this.drill_EPS_updatePositionTank();		//帧刷新 - 坐标容器
	this.drill_EPS_updateSwitch();				//帧刷新 - 重力开关
}
//==============================
// * 开关控制 - 帧刷新 - 优化策略
//==============================
Game_Map.prototype.drill_EPS_isOptimizationPassed = function(){
	
	// > 地图中所有容器都为空时，不工作
	if( $gameTemp._drill_EPS_switchTank.length == 0 ){
		return false;
	}
	return true;
}


//=============================================================================
// ** ☆开关控制（坐标容器）
//
//			说明：	> 此模块为 坐标容器 的操作控制。注意，存储所有事件的坐标。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制（坐标容器） - 初始化
//==============================
var _drill_EPS_clearTemp = Game_Temp.prototype.drill_EPS_clearTemp;
Game_Temp.prototype.drill_EPS_clearTemp = function(){
	_drill_EPS_clearTemp.call( this );
	this._drill_EPS_positionTank = {};			//坐标容器
}
//==============================
// * 开关控制（坐标容器） - 帧刷新
//==============================
Game_Map.prototype.drill_EPS_updatePositionTank = function(){
	$gameTemp._drill_EPS_positionTank = {};
	
	// > 如果有 事件管理核心，用核心的函数，节约性能
	if( Imported.Drill_CoreOfEventManager ){
		
		// > 事件容器指针（注意指针不要加东西，只读）
		var character_list = this.drill_COEM_getAvailableEventTank_Pointer();
		for( var i = 0; i < character_list.length; i++ ){
			var character = character_list[i];
			var slot_id = this.drill_EPS_getSlotId( character );
		
			if( $gameTemp._drill_EPS_positionTank[slot_id] == undefined ){
				$gameTemp._drill_EPS_positionTank[slot_id] = [];
			}
			$gameTemp._drill_EPS_positionTank[slot_id].push( character );
		}
		
		// > 玩家后加入
		var slot_id = this.drill_EPS_getSlotId( $gamePlayer );
		if( $gameTemp._drill_EPS_positionTank[slot_id] == undefined ){
			$gameTemp._drill_EPS_positionTank[slot_id] = [];
		}
		$gameTemp._drill_EPS_positionTank[slot_id].push( $gamePlayer );
		
		
	// > 没加核心那只能手动筛选了
	}else{
		var character_list = [];
		var event_list = this._events;
		for(var i = 0; i < event_list.length; i++ ){
			var temp_event = event_list[i];
			if( temp_event == null ){ continue; }
			if( temp_event._erased == true ){ continue; }	//『有效事件』
			character_list.push( temp_event );
		}
		
		character_list.unshift( $gamePlayer );
		for( var i = 0; i < character_list.length; i++ ){
			var character = character_list[i];
			var slot_id = this.drill_EPS_getSlotId( character );
			
			if( $gameTemp._drill_EPS_positionTank[slot_id] == undefined ){
				$gameTemp._drill_EPS_positionTank[slot_id] = [];
			}
			$gameTemp._drill_EPS_positionTank[slot_id].push( character );
		}
	}
}
//==============================
// * 开关控制（坐标容器） - 获取坐标ID
//==============================
Game_Map.prototype.drill_EPS_getSlotId = function( character ){
	return Math.floor( character.x ) * 100000 + Math.floor( character.y );
}


//=============================================================================
// ** ☆开关控制（触发设置）
//
//			说明：	> 此模块为 触发设置 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制（触发设置） - 是否能被按下
//
//			参数：	> this 对象              （重力开关）
//					> cur_switch 字符串      （重力开关的独立开关）
//					> pressing_character 对象（站在重力开关上的物体）
//			说明：	> 注意，重力开关具备触发多个独立开关，所以独立开关是一个必要条件，不要漏了。
//==============================
Game_Character.prototype.drill_EPS_canBePress = function( cur_switch, pressing_character ){
	
	// > 排除自己
	if( this == pressing_character ){ return false; }
	
	// > 飞行单位情况
	//...（暂不考虑，可能会影响制动开关？）
	
	// > 物体的属性
	if( pressing_character.drill_EPS_pressEnabled() == false ){ return false; }
	
	// > 条件锁情况
	if( this.drill_EPS_isMatchCondition( cur_switch, pressing_character ) == false ){ return false; }
	
	return true;
};
//==============================
// * 开关控制（触发设置） - 是否满足条件锁
//==============================
Game_Character.prototype.drill_EPS_isMatchCondition = function( cur_switch, pressing_character ){
	
	// > 没有条件锁，直接通过
	var conditionLock = this.drill_EPS_getConditionLock( cur_switch );
	if( conditionLock.length == 0 ){ return true; }
	
	// > 没有条件钥匙，直接拒绝
	var conditionKey = pressing_character.drill_EPS_getConditionKeyList();
	if( conditionKey.length == 0 ){ return false; }
	
	// > 条件钥匙对应条件锁，才能通过
	for( var i = 0; i < conditionLock.length; i++ ){
		var cur_l = conditionLock[i];
		for( var j = 0; j < conditionKey.length; j++ ){
			var cur_k = conditionKey[j];
			if( cur_k == cur_l ){
				return true;
			}
		}
	}
	return false;
};
//==============================
// * 开关控制（触发设置） - 帧刷新
//==============================
Game_Map.prototype.drill_EPS_updateSwitch = function(){
	
	// > 重力开关
	for( var i = 0; i < $gameTemp._drill_EPS_switchTank.length; i++ ){
		var temp_switchEv = $gameTemp._drill_EPS_switchTank[i];
		var slot_id = this.drill_EPS_getSlotId( temp_switchEv );
		
		// > 数据 - switchData层面（与事件一对一）
		var ch_list = $gameTemp._drill_EPS_positionTank[slot_id];	//（重力开关上的物体）
		if( ch_list == undefined ){ continue; }
		
		var switch_list = temp_switchEv.drill_EPS_getSwitchList();
		if( switch_list.length == 0 ){ continue; }
		
		// > 数据 - ['switch']层面（与事件一对多）
		for(var j = 0; j < switch_list.length; j++ ){
			var cur_switch = switch_list[j];
			
			// > 触发
			var isTriggered = false;
			for( var k = 0; k < ch_list.length; k++ ){
				var ch = ch_list[k];
				
				// > 触发 - 是否能被按下
				if( temp_switchEv.drill_EPS_canBePress( cur_switch, ch ) == true ){
					
					// > 激活触发（踩住时）
					isTriggered = true;
				
					// > 标记 上一个踩住时的事件ID
					if( ch == $gamePlayer ){
						temp_switchEv._drill_EPS_switchData['lastEventId'] = -2;	//『玩家id』
					}else{
						temp_switchEv._drill_EPS_switchData['lastEventId'] = ch._eventId;
					}
					
					break;
				}
			}
			
			// > 触发 - 踩住时
			if( isTriggered ){
				
				if( temp_switchEv._drill_EPS_switchData['switch'][cur_switch]['triggeredOn'] == true ){
					this.drill_EPS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						true
					);
				}
				if( temp_switchEv._drill_EPS_switchData['switch'][cur_switch]['triggeredOff'] == true ){
					this.drill_EPS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				
			// > 触发 - 没踩住时
			}else{
				
				if( temp_switchEv._drill_EPS_switchData['switch'][cur_switch]['notTriggeredOff'] == true ){
					this.drill_EPS_setValue( 
						temp_switchEv._eventId, 
						cur_switch, 
						false
					);
				}
				if( temp_switchEv._drill_EPS_switchData['switch'][cur_switch]['notTriggeredOn'] == true ){
					this.drill_EPS_setValue( 
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
// * 开关控制（触发设置） - 执行切换开关
//==============================
Game_Map.prototype.drill_EPS_setValue = function( event_id, switch_str, enabled ){
	var s_key = [ this._mapId, event_id, switch_str ];
	if( $gameSelfSwitches.value(s_key) === enabled ){ return; }
	$gameSelfSwitches.setValue( s_key, enabled );
};


