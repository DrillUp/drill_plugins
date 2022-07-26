//=============================================================================
// Drill_EventSelfSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        物体 - 独立开关
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
 * 你可以通过设置事件拥有更多的独立开关，并操作独立开关。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 可被扩展：
 *   - Drill_EventDuplicator        物体管理-事件复制器
 *     复制的事件可以支持自定义E、F、G 等的独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 2.详细介绍可以去看看 "8.物体 > 独立开关与事件页.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 出现条件：
 *   (1.事件页的条件可以受到注释<<出现条件>>的影响。
 *      看条件时，你需要留意事件页是否有这个注释。
 *   (2.通常事件页的出现条件分为三种：开关、变量、独立开关。
 *      所有其他复杂条件，都可以先绑定开关/变量，再对开关/变量进行赋值。
 * 独立开关：
 *   (1.注释与独立开关设置同时存在，注释会覆盖设置。
 *      独立开关的出现条件写多条注释也没有效果，只以第一个注释为准。
 *   (2.你可以通过插件指令控制额外的 E、F、G 等的独立开关。
 *      也可以直接操作其他的事件的独立开关。
 *   (3.操作其他事件独立开关不建议放在 并行事件 中频繁使用，因为容易使得
 *      游戏刷新过于频繁，造成卡顿。
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
 * 3.注释与独立开关设置同时存在，注释会覆盖设置。
 *   独立开关的出现条件写多条注释也没有效果，只以第一个注释为准。
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
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ESS（Event_Self_Switch）
//		临时全局变量	无
//		临时局部变量	无（直接操作）
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	任意地图
//		★性能测试消耗	5ms以下
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			独立开关：
//				->多个独立开关
//				->控制独立开关快速指令
//				->分支条件脚本		x
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.原理精确定位了，就比较好写。直接在地图读取的时候对所有注释遍历。
//
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventSelfSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventSelfSwitch');

	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ESS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ESS_pluginCommand.call(this, command, args);
	
	if (command === ">独立开关") {
		
		/*-----------------对象组获取------------------*/
		var e_chars = null;			// 事件对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
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
				var all_e = $gameMap._events;
				e_chars = [];
				for( var i=0; i < all_e.length; i++ ){
					if( !all_e[i] ){ continue; }
					e_chars.push( all_e[i] );
				}
			}
		}
		
		/*-----------------开启/关闭------------------*/
		if( args.length == 6 ){
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			
			if( temp2 == "开启" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						if( !e_chars[k] ){ continue; }
						var key = [this._mapId, e_chars[k]._eventId, temp1 ];
						$gameSelfSwitches.setValue(key,true);
					}
				}
			}
			if( temp2 == "关闭" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						if( !e_chars[k] ){ continue; }
						var key = [this._mapId, e_chars[k]._eventId, temp1 ];
						$gameSelfSwitches.setValue(key,false);
					}
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
							if( !e_chars[k] ){ continue; }
							var key = [this._mapId, e_chars[k]._eventId, temp1 ];
							var value_ = $gameSwitches.value( Number(temp3) );
							$gameSelfSwitches.setValue( key, value_ );
						}
					}
				}
				if( temp2 == "给予值" ){		//独立开关和开关 多对一
					if( e_chars != null){
						var key = [this._mapId, e_chars[0]._eventId, temp1 ];
						var value_ = $gameSelfSwitches.value(key);
						$gameSwitches.setValue( Number(temp3), value_);
					}
				}
			}
		}
	}
	
	
	/*-----------------独立开关（旧指令）------------------*/
	if (command === ">独立开关") {		//>独立开关 : E : 开启
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "开启" ){
				var key = [this._mapId, this._eventId, temp1 ];
				$gameSelfSwitches.setValue(key,true);
			}
			if( type == "关闭" ){
				var key = [this._mapId, this._eventId, temp1 ];
				$gameSelfSwitches.setValue(key,false);
			}
		}
		if(args.length == 6){
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
				}
				if( type == "给予值" ){
					var key = [this._mapId, this._eventId, temp1 ];
					var value_ = $gameSelfSwitches.value(key);
					$gameSwitches.setValue( Number(temp3), value_);
				}
			}
		}
	}
	/*-----------------指定事件的独立开关（旧指令）------------------*/
	if (command === ">指定事件的独立开关" ){
		if(args.length == 6){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			if( !temp1.contains(",") && !temp1.contains("，") ){
				if( temp3 == "开启" ){
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
					if( temp3 == "开启" ){
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
				if(need_refresh){
					$gameMap.requestRefresh();	//变化后手动刷新
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ESS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventSelfSwitch.js 物体 - 独立开关】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_setValueWithOutChange = function(key, value) {
    if (value) {
        this._data[key] = true;
    } else {
        delete this._data[key];
    }
};

//=============================================================================
// ** 参数绑定
//=============================================================================
//==============================
// * 绑定 - 初始参数转换
//==============================
var _drill_ESS_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
	
	// > 事件data源（该位置$dataMap数据正好载入完全）
	for( var i in $dataMap.events ){
		$gameTemp.drill_ESS_dataCovert( $dataMap.events[i] );
	}
	
	_drill_ESS_onMapLoaded.call(this);
};
//==============================
// * 绑定 - 转换 事件data源（直接操作 data指针对象）
//==============================
Game_Temp.prototype.drill_ESS_dataCovert = function( data_e ){
	if( data_e == undefined ){ return; }
	
	for(var j in data_e.pages ){
		// > 事件页
		var page = data_e.pages[j];	
		if(!page ){ continue; }	
		for(var k in page.list ){
			var l = page.list[k];
			if( l.code != 108 ){ continue; }
			// > 事件注释
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>独立开关为ON条件" || command == "=>独立开关为NO条件" ){	//=>独立开关为ON条件 : A
				if(args.length == 2){
					var temp1 = String(args[1]);
					page.conditions.selfSwitchValid = true;
					page.conditions.selfSwitchCh = temp1;
					break;
				}
			};
			if( command == "<<出现条件>>" ){	//<<出现条件>> : 独立开关 : A2 : 为ON
				if(args.length == 6){
					var type = String(args[1]);
					var temp2 = String(args[3]);
					var temp3 = String(args[5]);
					if( type == "独立开关" && (temp3 == "为NO" || temp3 == "为ON") ){	
						page.conditions.selfSwitchValid = true;
						page.conditions.selfSwitchCh = temp2;
						break;
					}
				}
			};
		}
	}
}

