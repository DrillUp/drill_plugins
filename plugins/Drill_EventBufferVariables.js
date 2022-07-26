//=============================================================================
// Drill_EventBufferVariables.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        物体管理 - 事件缓存变量
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventBufferVariables +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以将变量的值存储到事件身上，节约变量的占用。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对事件有效。
 * 细节：
 *   (1.物体触发模块将会大量使用变量并赋值，事件越多，变量也用的越多。
 *      比如事件的连续技能、延迟动画等功能，并行时会长期占用某个变量。
 *      你可以将这些 变量值 存储在事件中，以节约变量占用。
 *   (2.存储的变量跨事件页，并且能与事件一起保存在存档中。
 *      注意，存储的变量离开地图即失效。
 * 设计：
 *   (1.如果你要设计一个延迟的雷电施法过程。
 *      比如每隔2秒向前产生一个落雷，那么落雷的坐标需绑定25,26临时变量。
 *      如果其它小爱丽丝也要并行释放相同技能，那么这两个变量肯定会出现
 *      赋值错误的情况。所以，建议将坐标信息缓存，隔两秒后再取出来使用。
 *      这样两个小爱丽丝各自存储了各自施法的坐标信息，就不会相互干扰了。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过设置插件指令，对指定事件进行存储：
 * （注意，冒号左右都有一个空格）
 * 
 * 插件指令：>事件缓存变量 : 本事件 : 存储变量值 : 槽位[1] : 变量[21]
 * 插件指令：>事件缓存变量 : 事件[10] : 存储变量值 : 槽位[1] : 变量[21]
 * 插件指令：>事件缓存变量 : 事件变量[21] : 存储变量值 : 槽位[1] : 变量[21]
 * 插件指令：>事件缓存变量 : 批量事件[10,11] : 存储变量值 : 槽位[1] : 变量[21]
 * 插件指令：>事件缓存变量 : 批量事件变量[21,22] : 存储变量值 : 槽位[1] : 变量[21]
 * 
 * 插件指令：>事件缓存变量 : 本事件 : 存储变量值 : 槽位[1] : 变量[21]
 * 插件指令：>事件缓存变量 : 本事件 : 读取变量值 : 槽位[1] : 变量[21]
 * 
 * 1.前半部分（本事件）和 后半部分（存储变量值 : 槽位[1] : 变量[21]）
 *   的参数可以随意组合。一共有5*2种组合方式。
 * 2."存储变量值"执行后，变量的值将存储到槽位中。槽位的id可以是任意数字。
 *   "读取变量值"执行后，槽位中的值将赋值给变量。
 * 3.如果指定的槽位中没有值，则槽位将会赋值-1给变量。
 *   注意，如果你存储变量的真实值也为-1，那可能就不好判断区分了。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 批量槽位赋值
 * 你还可以进行批量存值读值：
 * 
 * 插件指令：>事件缓存变量 : 本事件 : 存储变量值 : 槽位[1,3,2] : 变量[21,22,23]
 * 插件指令：>事件缓存变量 : 本事件 : 读取变量值 : 槽位[1,3,2] : 变量[21,22,23]
 * 
 * 1.多个槽位用逗号分割，注意，槽位数量和变量数量要一致。
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
 * 测试方法：   物体触发管理层，执行大量闪电，测试性能。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于该插件为单次执行，性能几乎可以忽略。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 改进了说明注释。
 * [v1.2]
 * 修改了插件分类。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EBV（Event_Buffer_Variables）
//		临时全局变量	无
//		临时局部变量	this._drill_EBV
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	物体触发管理层，大量闪电测试
//		★性能测试消耗	未找到
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件缓存变量：
//				->存储到事件中
//
//		★必要注意事项：
//			暂无。
//			
//		★其它说明细节：
//			1.建立临时变量快速存储。
//
//		★存在的问题：
//			暂无。
//		
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventBufferVariables = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventBufferVariables');
	
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_EBV_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EBV_pluginCommand.call(this, command, args);
	if (command === ">事件缓存变量") {
		
		/*-----------------对象组获取------------------*/
		var char_list = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( char_list == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EBV_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				char_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EBV_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					char_list.push( e );
				}
			}
			if( char_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EBV_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
			if( char_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EBV_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				char_list = [ e ];
			}
		}
		
		/*-----------------自定义区域------------------*/
		if( char_list != null && args.length == 8){
			var type = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = String(args[7]);
			
			if( type == "存储变量值"){
				var v_e = temp3;
				v_e = v_e.replace("槽位[","");
				v_e = v_e.replace("]","");
				v_e = v_e.split(/[,，]/);
				var v = temp4;
				v = v.replace("变量[","");
				v = v.replace("]","");
				v = v.split(/[,，]/);
				
				for(var j=0; j < char_list.length; j++){
					var ch = char_list[j];
					for(var k = 0; k < v_e.length; k++){
						ch._drill_EBV[ Number(v_e[k]) ] = $gameVariables.value(Number( v[k] ));
					}
				}
			}
			if( type == "读取变量值"){
				var v_e = temp3;
				v_e = v_e.replace("槽位[","");
				v_e = v_e.replace("]","");
				v_e = v_e.split(/[,，]/);
				var v = temp4;
				v = v.replace("变量[","");
				v = v.replace("]","");
				v = v.split(/[,，]/);
				
				for(var j=0; j < char_list.length; j++){
					var ch = char_list[j];
					for(var k = 0; k < v_e.length; k++){
						var v_e_value = ch._drill_EBV[ Number(v_e[k]) ];
						if( v_e_value == undefined ){
							$gameVariables.setValue( Number( v[k] ), -1 );
						}else{
							$gameVariables.setValue( Number( v[k] ), v_e_value );
						}
					}
				}
			}
		}
	}
}
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EBV_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventBufferVariables.js 物体管理 - 事件缓存变量】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件初始化
//==============================
var _drill_EBV_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EBV_initMembers.call(this);
	this._drill_EBV = [];	
};


