//=============================================================================
// Drill_EventSelfSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        物体 - 独立开关
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventSelfSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得 事件 拥有更多的独立开关，并操作独立开关。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 可被扩展：
 *   - Drill_CoreOfConditionBranch   系统-分支条件核心
 *     有分支条件后，才能设置E、F、G等的独立开关的分支条件判定。
 *   - Drill_EventDuplicator         物体管理-事件复制器
 *     复制的事件可以支持自定义E、F、G等的独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.你需要先了解基础知识 "8.物体 > 触发的本质.docx"。
 *   详细介绍也可以去看看 "8.物体 > 独立开关与事件页.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 出现条件：
 *   (1.事件页的条件可以受到注释<<出现条件>>的影响。
 *      看条件时，你需要留意事件页是否有这个注释。
 *   (2.通常事件页的出现条件分为三种：开关、变量、独立开关。
 *      所有其他复杂条件，都可以先绑定开关/变量，再对开关/变量进行赋值。
 * 独立开关：
 *   (1.注释与独立开关设置同时存在时，注释会覆盖设置。
 *      独立开关的出现条件写多条注释也没有效果，只以第一个注释为准。
 *   (2.你可以通过插件指令控制额外的 E、F、G 等的独立开关。
 *      也可以直接操作其他的事件的独立开关。
 *   (3.">指定事件的独立开关"不建议放在 并行事件 中频繁使用，因为容易使得
 *      游戏刷新过于频繁，造成卡顿。
 * 分支条件：
 *   (1.由于默认的分支条件指令只支持ABCD，所以这里提供了写分支条件指令来
 *      判断 E、F、G 等的独立开关的功能。
 *   (2."如果批量独立开关[A,B]:为ON" 表示涉及的独立开关必须全部为ON才能
 *      通过分支。只要有一个独立开关不为ON，就会进入到 不通过的分支。
 * 设计：
 *   (1.独立开关不够用时，你可以添加 出现条件注释 来设置新的独立开关。
 *      详细机制可以去看看 "8.物体 > 独立开关与事件页.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 设置
 * 要设置更多的独立开关，直接在指定页添加下面的注释即可：
 * 
 * 事件注释：<<出现条件>> : 独立开关 : A : 为ON
 * 事件注释：<<出现条件>> : 独立开关 : B : 为ON
 * 事件注释：<<出现条件>> : 独立开关 : E : 为ON
 * 事件注释：<<出现条件>> : 独立开关 : F : 为ON
 * 事件注释：<<出现条件>> : 独立开关 : A1 : 为ON
 * 事件注释：<<出现条件>> : 独立开关 : A2 : 为ON
 * 
 * 1.由于注释修改的是"出现条件"，指令特殊，所以与其他注释有区别。
 * 2.E、F、A1、A2 是可完全自定义的字符串，ABCD是标准的原开关设置。
 * 3.注释与独立开关设置互斥，注释会覆盖设置。
 *   写多条注释也没有效果，只以第一个注释为准。
 *   如果你希望能设置多个独立开关的 出现条件，去看看插件 物体-序列开关 。
 * 4.由于之前版本单词拼写错误，这里写"ON"或"NO"都有效。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 使用
 * 要设置开启指定的独立开关，直接使用插件指令即可：
 * 
 * 插件指令：>独立开关 : 本事件 : A : 开启
 * 插件指令：>独立开关 : 全图事件 : A : 开启
 * 插件指令：>独立开关 : 事件[10] : A : 开启
 * 插件指令：>独立开关 : 事件变量[21] : A : 开启
 * 插件指令：>独立开关 : 批量事件[10,11] : A : 开启
 * 插件指令：>独立开关 : 批量事件变量[21,22] : A : 开启
 * 
 * 插件指令：>独立开关 : 本事件 : A : 开启
 * 插件指令：>独立开关 : 本事件 : B : 开启
 * 插件指令：>独立开关 : 本事件 : E : 开启
 * 插件指令：>独立开关 : 本事件 : F : 开启
 * 插件指令：>独立开关 : 本事件 : A1 : 开启
 * 插件指令：>独立开关 : 本事件 : A2 : 开启
 * 
 * 插件指令：>独立开关 : 本事件 : A : 开启
 * 插件指令：>独立开关 : 本事件 : A : 关闭
 * 插件指令：>独立开关 : 本事件 : A : 获取值 : 开关[21]
 * 插件指令：>独立开关 : 本事件 : A : 给予值 : 开关[21]
 * 
 * 1.前半部分（本事件）中间部分（A）和 后半部分（开启）的参数
 *   可以随意组合。一共有 6*n*4 种组合方式。
 * 2."获取值"表示，开关的值 -> 独立开关 。
 *   "给予值"表示，独立开关的值 -> 开关 。
 *   "批量事件"中，事件独立开关和开关是多对一的关系，独立开关可以批
 *   量获取开关的值，但是不能批量给予值给开关。
 * 3.操作其他事件独立开关不建议放在并行事件中频繁使用，因为容易使得
 *   游戏刷新过于频繁，造成卡顿。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 分支条件
 * 如果你用到了分支条件，可以使用下面的指令：
 * 
 * 分支条件：>独立开关:如果本事件:独立开关[A]:为ON
 * 分支条件：>独立开关:如果事件[10]:独立开关[A]:为ON
 * 
 * 分支条件：>独立开关:如果本事件:独立开关[A]:为ON
 * 分支条件：>独立开关:如果本事件:独立开关[A]:为OFF
 * 分支条件：>独立开关:如果本事件:独立开关[A]:等于开关[21]
 * 分支条件：>独立开关:如果本事件:独立开关[A]:等于独立开关[A]
 * 分支条件：>独立开关:如果本事件:批量独立开关[A,B,A1]:为ON
 * 分支条件：>独立开关:如果本事件:批量独立开关[A,B,A1]:为OFF
 * 分支条件：>独立开关:如果本事件:批量独立开关[A,B,A1]:等于开关[21]
 * 分支条件：>独立开关:如果本事件:批量独立开关[A,B,A1]:等于独立开关[C]
 * 
 * 1.前半部分（如果本事件）和 后半部分（独立开关[A]:为ON）的参数
 *   可以随意组合。一共有 2*8 种组合方式。
 * 2.需要 分支条件核心 才能支持指令。
 *   由于默认的分支条件指令只支持ABCD，所以这里提供了写分支条件指令来
 *   判断 E、F、G 等的独立开关的功能。
 * 3.分支条件会返回一个布尔值，分别为true和false（是和否），
 *   表示满足条件的分支和不满足条件的分支。
 * 4."如果批量独立开关[A,B]:为ON" 表示涉及的独立开关必须全部为ON才能
 *   通过分支。只要有一个独立开关不为ON，就会进入到 不通过的分支。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 旧指令
 * 旧指令的格式相对没有那么规范，但是一样有效：
 * 
 * 插件指令(旧)：>独立开关 : E : 开启
 * 插件指令(旧)：>独立开关 : F : 关闭
 * 插件指令(旧)：>独立开关 : G : 获取值 : 开关[21]
 * 插件指令(旧)：>独立开关 : G : 给予值 : 开关[21]
 * 
 * 插件指令(旧)：>指定事件的独立开关 : 1 : E : 开启
 * 插件指令(旧)：>指定事件的独立开关 : 1 : F : 关闭
 * 插件指令(旧)：>指定事件的独立开关 : 1,2,3,4,5 : A : 开启
 * 插件指令(旧)：>指定事件的独立开关 : 1,2,3,4,5 : A : 关闭
 *
 * 1.">独立开关 : E : 开启"没有指明事件，表示本事件。
 * 2.">指定事件的独立开关"的数字表示事件id，
 *   你可以用逗号隔开，表示多个事件的id，批量控制独立开关。
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n)
 * 测试方法：   以正常流程进行游戏，查看插件消耗情况。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次执行的插件几乎没有消耗，因为计算次数太少。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了批量操作事件独立开关的插件指令。
 * [v1.2]
 * 优化了内部结构。
 * [v1.3]
 * 添加了插件性能说明。
 * [v1.4]
 * 优化了指令设置，添加了获取值功能。
 * [v1.5]
 * 优化了内部结构，并修改了插件指令格式。
 * [v1.6]
 * 修复了NO和ON的写法，都有效。
 * [v1.7]
 * 添加了复制事件的 自定义独立开关 的支持。
 * [v1.8]
 * 优化了独立开关的性能。添加了分支条件功能。
 * [v1.9]
 * 优化了内部结构。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ESS（Event_Self_Switch）
//		临时全局变量	无
//		临时局部变量	无（直接操作）
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_SelfSwitches.prototype.setValue （半覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	机关管理层
//		★性能测试消耗	0.1ms（drill_ESS_valueChanged）
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
//			->☆分支条件
//
//			->☆出现条件
//				->读取事件数据
//					->全部事件数据
//					->单个事件数据
//					->单个事件页
//
//			->☆管辖权（独立开关控制）
//			->☆独立开关控制 实现
//			->☆独立开关控制 标准模块
//				->值变化时【标准接口】
//
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
//			暂无
//			
//		★其它说明细节：
//			1.直接在地图读取的时候对所有注释遍历，这样就会只执行一次，不会浪费性能。
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
	DrillUp.g_ESS_PluginTip_curName = "Drill_EventSelfSwitch.js 物体-独立开关";
	DrillUp.g_ESS_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_ESS_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_ESS_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 出现条件的重复独立开关
	//
	//			说明：	> 该函数在 其他界面 也会被调用。
	//==============================
	DrillUp.drill_ESS_getPluginTip_SwitchChRepeat = function( e_id, switchCh ){
		return "【" + DrillUp.g_ESS_PluginTip_curName + "】\n事件注释错误，事件"+e_id+"的事件页，出现了多个独立开关<<出现条件>>，每页独立开关<<出现条件>>只能生效一个，即 "+ switchCh +"。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventSelfSwitch = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventSelfSwitch');



//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_ESS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_ESS_pluginCommand.call(this, command, args);
	this.drill_ESS_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_ESS_pluginCommand = function( command, args ){
	if( command === ">独立开关" ){
		
		/*-----------------对象组获取------------------*/
		var e_chars = null;			// 事件对象组
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
					if( $gameMap.drill_ESS_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_ESS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_ESS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_ESS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit == "全图事件" ){
				e_chars = [];
				var event_list = $gameMap._events;
				for(var i = 0; i < event_list.length; i++ ){
					var temp_event = event_list[i];
					if( temp_event == null ){ continue; }
					if( temp_event._erased == true ){ continue; }	//『有效事件』
					e_chars.push( temp_event );
				}
			}
		}
		
		/*-----------------开启/关闭------------------*/
		if( args.length == 6 ){
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			
			if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
				if( e_chars != null){
					for( var k = 0; k < e_chars.length; k++ ){
						var temp_event = e_chars[k];
						var key = [this._mapId, temp_event._eventId, temp1 ];
						$gameSelfSwitches.setValue( key, true );
					}
					return;
				}
			}
			if( temp2 == "关闭" || temp2 == "禁用" ){
				if( e_chars != null){
					for( var k = 0; k < e_chars.length; k++ ){
						var temp_event = e_chars[k];
						var key = [this._mapId, temp_event._eventId, temp1 ];
						$gameSelfSwitches.setValue( key, false );
					}
					return;
				}
			}
		}
		/*-----------------获取值/给予值------------------*/
		if( args.length == 8 ){
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			
			if( temp3.indexOf("开关[") != -1 ){
				temp3 = temp3.replace("开关[","");
				temp3 = temp3.replace("]","");
				if( temp2 == "获取值" ){
					if( e_chars != null){
						for( var k=0; k < e_chars.length; k++ ){
							var temp_event = e_chars[k];
							var key = [this._mapId, temp_event._eventId, temp1 ];
							var value_ = $gameSwitches.value( Number(temp3) );
							$gameSelfSwitches.setValue( key, value_ );
						}
						return;
					}
				}
				if( temp2 == "给予值" ){		//独立开关和开关 多对一
					if( e_chars != null){
						var temp_event = e_chars[0];
						var key = [this._mapId, temp_event._eventId, temp1 ];
						var value_ = $gameSelfSwitches.value(key);
						$gameSwitches.setValue( Number(temp3), value_ );
						return;
					}
				}
			}
		}
	}
	
	
	/*-----------------独立开关（旧指令）------------------*/
	if( command === ">独立开关" ){		//>独立开关 : E : 开启
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "启用" || type == "开启" || type == "打开" || type == "启动" ){
				var key = [this._mapId, this._eventId, temp1 ];
				$gameSelfSwitches.setValue( key, true );
				return;
			}
			if( type == "关闭" || type == "禁用" ){
				var key = [this._mapId, this._eventId, temp1 ];
				$gameSelfSwitches.setValue( key, false );
				return;
			}
		}
		if( args.length == 6 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp3 = String(args[5]);
			if( temp3.indexOf("开关[") != -1 ){
				temp3 = temp3.replace("开关[","");
				temp3 = temp3.replace("]","");
				if( type == "获取值" ){
					var key = [this._mapId, this._eventId, temp1 ];
					var value_ = $gameSwitches.value( Number(temp3) );
					$gameSelfSwitches.setValue( key, value_ );
					return;
				}
				if( type == "给予值" ){
					var key = [this._mapId, this._eventId, temp1 ];
					var value_ = $gameSelfSwitches.value(key);
					$gameSwitches.setValue( Number(temp3), value_);
					return;
				}
			}
		}
	}
	
	/*-----------------指定事件的独立开关（旧指令）------------------*/
	if( command === ">指定事件的独立开关" ){
		if( args.length == 6 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			if( !temp1.contains(",") && !temp1.contains("，") ){
				if( temp3 == "启用" || temp3 == "开启" || temp3 == "打开" || temp3 == "启动" ){
					var key = [this._mapId, Number(temp1), temp2 ];
					$gameSelfSwitches.setValue(key,true);
				}else{
					var key = [this._mapId, Number(temp1), temp2 ];
					$gameSelfSwitches.setValue(key,false);
				}
			}else{
				var need_refresh = false;
				var ids = temp1.split(/[,，]/);
				for(var i = 0; i<ids.length; i++){
					if( temp3 == "启用" || temp3 == "开启" || temp3 == "打开" || temp3 == "启动" ){
						var s_key = [this._mapId, Number(ids[i]), temp2 ];
						if( $gameSelfSwitches.value(s_key) !== true){
							$gameSelfSwitches.drill_setValueWithOutChange(s_key,true);
							need_refresh = true;
						}
					}else{
						var s_key = [this._mapId, Number(ids[i]), temp2 ];
						if( $gameSelfSwitches.value(s_key) !== false){
							$gameSelfSwitches.drill_setValueWithOutChange(s_key,false);
							need_refresh = true;
						}
					}
				}
				if( need_refresh ){
					$gameMap.requestRefresh();	//变化后手动刷新
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ESS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_ESS_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};
//==============================
// * 插件指令 - 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_setValueWithOutChange = function( key, value ){
	if( value ){
		this._data[key] = true;
	}else{
		delete this._data[key];
	}
};


//=============================================================================
// ** ☆分支条件
//=============================================================================
if( Imported.Drill_CoreOfConditionBranch ){
	
	//==============================
	// * 分支条件 - 指令绑定
	//==============================
	var _drill_ESS_COCB_conditionCommand = Game_Interpreter.prototype.drill_COCB_conditionCommand;
	Game_Interpreter.prototype.drill_COCB_conditionCommand = function( command, args ){
		_drill_ESS_COCB_conditionCommand.call( this, command, args );
		this.drill_ESS_COCB_conditionCommand( command, args );
	}
	//==============================
	// * 分支条件 - 指令执行
	//==============================
	Game_Interpreter.prototype.drill_ESS_COCB_conditionCommand = function( command, args ){
		if( command === ">独立开关" ){		//>独立开关:如果独立开关[A]:为ON
			if( args.length == 3 ){
				var unit = String(args[0]);
				var temp1 = String(args[1]);
				var temp2 = String(args[2]);
				
				/*-----------------对象组获取 - 事件------------------*/
				var e_id = null;
				if( e_id == null && unit == "如果本事件" ){
					e_id = this._eventId;
				}
				if( e_id == null && unit.indexOf("如果事件[") != -1 ){
					unit = unit.replace("如果事件[","");
					unit = unit.replace("]","");
					e_id = Number(unit);
				}
				if( e_id == null ){ return; }
				
				/*-----------------对象组获取 - 独立开关------------------*/
				var id_list = null;
				if( id_list == null && temp1.indexOf("批量独立开关[") != -1 ){
					temp1 = temp1.replace("批量独立开关[","");
					temp1 = temp1.replace("]","");
					id_list = [];
					var temp_arr = temp1.split(/[,，]/);
					for( var k=0; k < temp_arr.length; k++ ){
						var id = String(temp_arr[k]);	//（注意独立开关是字符串）
						id_list.push( id );
					}
				}else if( id_list == null && temp1.indexOf("独立开关[") != -1 ){
					temp1 = temp1.replace("独立开关[","");
					temp1 = temp1.replace("]","");
					temp1 = String(temp1);	//（注意独立开关是字符串）
					id_list = [];
					id_list.push( temp1 );
				}
				if( id_list == null ){ return; }
				
				/*-----------------判定------------------*/
				if( temp2 == "为ON" ){
					var passed = true;
					for(var i = 0; i < id_list.length; i++){
						var s_key = [this._mapId, e_id, id_list[i] ];
						var cur_value = $gameSelfSwitches.value( s_key );
						if( cur_value != true ){	//（只要有一个不满足，则不通过）
							passed = false
							break;
						}
					}
					this.drill_COCB_conditionSubmit( passed );
					return;
				}
				if( temp2 == "为OFF" ){
					var passed = true;
					for(var i = 0; i < id_list.length; i++){
						var s_key = [this._mapId, e_id, id_list[i] ];
						var cur_value = $gameSelfSwitches.value( s_key );
						if( cur_value != false ){	//（只要有一个不满足，则不通过）
							passed = false
							break;
						}
					}
					this.drill_COCB_conditionSubmit( passed );
					return;
				}
				if( temp2.indexOf("等于开关[") != -1 ){
					temp2 = temp2.replace("等于开关[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					var passed = true;
					var tar_value = $gameSwitches.value( temp2 );
					for(var i = 0; i < id_list.length; i++){
						var s_key = [this._mapId, e_id, id_list[i] ];
						var cur_value = $gameSelfSwitches.value( s_key );
						if( cur_value != tar_value ){	//（只要有一个不满足，则不通过）
							passed = false
							break;
						}
					}
					this.drill_COCB_conditionSubmit( passed );
					return;
				}
				if( temp2.indexOf("等于独立开关[") != -1 ){
					temp2 = temp2.replace("等于独立开关[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					var passed = true;
					var tar_key = [this._mapId, e_id, temp2 ];
					var tar_value = $gameSelfSwitches.value( tar_key );
					for(var i = 0; i < id_list.length; i++){
						var s_key = [this._mapId, e_id, id_list[i] ];
						var cur_value = $gameSelfSwitches.value( s_key );
						if( cur_value != tar_value ){	//（只要有一个不满足，则不通过）
							passed = false
							break;
						}
					}
					this.drill_COCB_conditionSubmit( passed );
					return;
				}
			}
		}
	}

}


//=============================================================================
// ** ☆出现条件
//
//			说明：	> 此模块管理 事件页出现条件 的控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 出现条件 - 初始参数转换
//==============================
var _drill_ESS_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	
	// > 读取事件数据（该位置的$dataMap数据正好加载完毕）
	$gameTemp.drill_ESS_eventData_readAll();
	
	// > 原函数
	_drill_ESS_onMapLoaded.call(this);
};

//==============================
// * 出现条件 - 读取事件数据 - 全部事件数据（开放函数）
//==============================
Game_Temp.prototype.drill_ESS_eventData_readAll = function(){
	
	// > 事件数据 列表
	for( var i = 0; i < $dataMap.events.length; i++ ){
		var eventData = $dataMap.events[i];
		this.drill_ESS_dataCovert( eventData );
	}
};
//==============================
// * 出现条件 - 读取事件数据 - 单个事件数据（开放函数）
//
//			说明：	> 事件管理核心 调用了此函数。用于复制的新事件初始化。
//==============================
Game_Temp.prototype.drill_ESS_dataCovert = function( eventData ){
	if( eventData == undefined ){ return; }
	if( eventData.pages == undefined ){ return; }
	
	// > 事件页 列表
	for( var j = 0; j < eventData.pages.length; j++ ){
		var page = eventData.pages[j];
		if( page == undefined ){ continue; }
		this.drill_ESS_eventData_readOnePage( i, page );
	}
};
//==============================
// * 出现条件 - 读取事件数据 - 单个事件页（开放函数）
//==============================
Game_Temp.prototype.drill_ESS_eventData_readOnePage = function( eventId, page ){
	var pageOfList = page.list;
	if( pageOfList == undefined ){ return; }
	
	// > 出现条件的重复独立开关 检查
	var last_selfSwitchCh = "";
	
	// > 事件注释
	for(var n = 0; n < pageOfList.length; n++){
		var l = pageOfList[n];
		if( l.code != 108 ){ continue; }
		var args = l.parameters[0].split(' ');
		var command = args.shift();
		if( command == "<<出现条件>>" ){	//<<出现条件>> : 独立开关 : A2 : 为ON
			if( args.length == 6 ){
				var type = String(args[1]);
				var temp2 = String(args[3]);
				var temp3 = String(args[5]);
				if( type == "独立开关" && (temp3 == "为NO" || temp3 == "为ON") ){	
					if( last_selfSwitchCh == "" ){
						page.conditions.selfSwitchValid = true;	//（直接修改data数据）
						page.conditions.selfSwitchCh = temp2;	//（直接修改data数据）
						last_selfSwitchCh = temp2;
					}else{
						alert( DrillUp.drill_ESS_getPluginTip_SwitchChRepeat(eventId,last_selfSwitchCh) );
						break;
					}
				}
			}
		};
		
		/*-----------------旧指令------------------*/
		if( command == "=>独立开关为ON条件" || command == "=>独立开关为NO条件" ){	//=>独立开关为ON条件 : A
			if( args.length == 2 ){
				var temp1 = String(args[1]);
				if( last_selfSwitchCh == "" ){
					page.conditions.selfSwitchValid = true;		//（直接修改data数据）
					page.conditions.selfSwitchCh = temp1;		//（直接修改data数据）
					last_selfSwitchCh = temp1;
				}else{
					alert( DrillUp.drill_ESS_getPluginTip_SwitchChRepeat(eventId,last_selfSwitchCh) );
					break;
				}
			}
		};
	}
}



//=============================================================================
// ** ☆管辖权（独立开关控制）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 独立开关《物体-独立开关》 - 获取值
//==============================
Game_SelfSwitches.prototype.value = function( key ){
    return !!this._data[key];
};
//==============================
// * 独立开关《物体-独立开关》 - 设置值
//
//			说明：	> key的值格式为： [ 地图id（mapId）, 事件id（eventId）, 字符串值（switch_str） ]
//==============================
Game_SelfSwitches.prototype.setValue = function( key, value ){
    if( value ){
        this._data[key] = true;
    }else{
        delete this._data[key];
    }
    this.onChange();
};
//==============================
// * 独立开关《物体-独立开关》 - 刷新地图事件
//
//			标签：	> 手动刷新条件-独立开关『⊙多场景与换页-地图界面』。
//==============================
Game_SelfSwitches.prototype.onChange = function(){
    $gameMap.requestRefresh();
};
*/

//=============================================================================
// ** ☆独立开关控制 实现
//
//			说明：	> 此模块管理 独立开关 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 独立开关控制 - 最后继承
//==============================
var _drill_ESS_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_ESS_scene_initialize.call(this);		//（此方法放到最后再继承）
	
	//==============================
	// * 独立开关控制 - 跳过重复值（半覆写）
	//
	//			标签：	> 『json赋值时数组变字符串问题』
	//					> 手动刷新条件-独立开关『⊙多场景与换页-地图界面』
	//			说明：	> key的值格式为： [ 地图id（mapId）, 事件id（eventId）, 字符串值（temp1） ]
	//					> 其它引擎界面会继承此函数，所以这里使用 最后继承 。
	//==============================
	var _drill_ESS_self_setValue = Game_SelfSwitches.prototype.setValue;
	Game_SelfSwitches.prototype.setValue = function( key, value ){
		
		// > 跳过重复值
		//		（存储的值只有下面两个状态：true 和 undefined。原函数传参value为false时会执行 delete，从而变成 undefined 存储值）
		if( value ){
			if( this._data[key] == true ){ return; }
		}else{
			if( this._data[key] == undefined ){ return; }
		}
		
		// > 原函数
		_drill_ESS_self_setValue.call( this, key, value );
		
		// > 值变化时
		this.drill_ESS_valueChanged( key, value );
	}
}

//#############################################################################
// ** ☆独立开关控制 标准模块
//
//			说明：	> 即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 独立开关控制 - 值变化时
//				
//			参数：	> key 数组对象（当前键，格式为： [ 地图id（mapId）, 事件id（eventId）, 字符串值（switch_str） ]）
//					> value 布尔  （当前值）
//			返回：	> 无
//
//			说明：	> 此函数由子插件继承，用于监听 独立开关的值变化。
//##############################
Game_SelfSwitches.prototype.drill_ESS_valueChanged = function( key, value ){
	
	//（不操作，子插件用）
	
}


