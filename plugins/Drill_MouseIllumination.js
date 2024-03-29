//=============================================================================
// Drill_MouseIllumination.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        鼠标 - 自定义照明效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MouseIllumination +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可以使得鼠标能够支持自定义照明效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 基于：
 *   - Drill_LayerIllumination     地图-自定义照明效果★★v1.7及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于鼠标。
 * 2.详细内容可以去看看 "6.地图 > 关于自定义照明效果.docx"。
 * 鼠标照明：
 *   (1.鼠标照明插件激活后，会一直有一个光源跟随鼠标。
 *   (2.限时动态照明出现后不会跟随鼠标移动。
 *   (3.插件指令设置只在当前地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令控制网格指向标：
 * 
 * 插件指令：>自定义照明 : 物体照明 : 鼠标 : 照明[1]
 * 插件指令：>自定义照明 : 物体照明 : 鼠标 : 关闭照明
 *
 * 1.插件指令设置只在当前地图有效，离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 限时动态照明
 * 你可以通过插件指令临时添加动态照明：
 * 
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐淡去 : 持续时间[180] : 鼠标 : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 逐渐显现 : 持续时间[180] : 鼠标 : 照明[17]
 * 插件指令：>自定义照明 : 限时动态照明 : 保持亮度 : 持续时间[10] : 鼠标 : 照明[17]
 * 
 * 1.限时动态照明在持续时间结束后，会被清除。多用于临时效果。
 * 2.限时动态照明本质上就是 预设的高级照明 。
 *   该预设 会从100-200中获取未创建的编号，然后创建一个高级照明，
 *   并设置生命时间、绑定对象、透明度变化。
 * 3.限时动态照明出现后不会跟随鼠标移动。
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
 * 时间复杂度： o(n^2)*o(贴图处理)*o(遮罩渲染) 每帧
 * 测试方法：   去光源管理层，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【12.19ms】
 *              100个事件的地图中，平均消耗为：【14.94ms】
 *               50个事件的地图中，平均消耗为：【12.56ms】
 *               20个事件的地图中，平均消耗为：【13.75ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 10ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件是基于光照插件运行的，虽然鼠标的单个光源消耗并不多。
 *   但是与基础插件的消耗加起来，还是不容小视。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 重新整理了 黑暗层开关 与 地图注释锁定 的关系。
 * [v1.2]
 * 强化了 物体照明 的各项功能和插件指令。
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MIl（Mouse_Destination）
//		临时全局变量	无
//		临时局部变量	this._drill_MIl_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)*o(遮罩渲染) 每帧
//		★性能测试因素	光源管理层，乱跑
//		★性能测试消耗	12.56ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			鼠标照明：
//				->鼠标的 物体照明
//				->鼠标的 限时动态照明
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
//			1.注意 MIl 和 LIl 的区别，该插件与基础插件的粘性较大。
//			
//		★其它说明细节：
//			暂无
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
	DrillUp.g_MIl_PluginTip_curName = "Drill_MouseIllumination.js 鼠标-自定义照明效果";
	DrillUp.g_MIl_PluginTip_baseList = ["Drill_LayerIllumination.js 地图-自定义照明效果"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_MIl_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_MIl_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_MIl_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_MIl_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_MIl_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** 静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MouseIllumination = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MouseIllumination');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_LayerIllumination ){


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MIl_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MIl_pluginCommand.call(this, command, args);
	if( command === ">自定义照明" ){
		
		// > 如果黑暗层未开，则插件指令无效
		if( $gameTemp.drill_LIl_isDarkMaskEnabled() == false ){ return; }
		
		/*-----------------物体照明------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var unit = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "物体照明" ){
				if( unit == "鼠标" ){
					if( temp2.indexOf("照明[") != -1 ){
						temp2 = temp2.replace("照明[","");
						temp2 = temp2.replace("]","");
						$gameMap.drill_LIl_addSimplePerspect_mouse( Number(temp2)-1 );
					}
					if( temp2 == "关闭照明" ){
						$gameMap.drill_LIl_removeSimplePerspect_mouse();
					}
				}
			}
		}
		
		/*-----------------限时动态照明------------------*/
		var marker_lim = null;
		if( args.length == 10 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			var temp4 = String(args[9]);
			if( type == "限时动态照明" && temp3 == "鼠标" ){
				temp2 = temp2.replace("持续时间[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				temp4 = temp4.replace("照明[","");
				temp4 = temp4.replace("]","");
				temp4 = Number(temp4)-1;
				
				// > 获取编号
				var id = $gameSystem._drill_LIl_container.drill_CODM_getEmptyId( 100, 200 );
				
				// > 创建
				var marker_lim = $gameMap.drill_LIl_addSeniorPerspect( id, temp4 );
				if( marker_lim == undefined ){ return; }
				
				// > 设置生命
				marker_lim.drill_setLifeTime( temp2 );
				
				// > 绑定对象（不绑定，只对齐坐标）
				marker_lim._drill_data['offsetX'] = _drill_mouse_x;
				marker_lim._drill_data['offsetY'] = _drill_mouse_y;
				
				// > 透明度变化
				if( temp1 == "逐渐淡去" ){
					marker_lim._opacity = 255;		//（强行修改初始化时透明度）
					var o_data = {
						"opacity":0,
						"time":temp2,
						"type":"匀速变化",
					}
					$gameSystem.drill_LIl_opacityTo( marker_lim.drill_id(), o_data );
				}
				if( temp1 == "逐渐显现" ){
					marker_lim._opacity = 0;
					var o_data = {
						"opacity":255,
						"time":temp2,
						"type":"匀速变化",
					}
					$gameSystem.drill_LIl_opacityTo( marker_lim.drill_id(), o_data );
				}
				if( temp1 == "保持亮度" ){
					marker_lim._opacity = 255;
					var o_data = {
						"opacity":255,
						"time":1,
						"type":"匀速变化",
					}
					$gameSystem.drill_LIl_opacityTo( marker_lim.drill_id(), o_data );
				}
			}
		}
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MouseIllumination = false;
		var pluginTip = DrillUp.drill_MIl_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

