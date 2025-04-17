//=============================================================================
// Drill_GlobalGameTimer.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        管理器 - 累计游戏计时器
 * @author Drill_up
 * 
 * @Drill_LE_param "定时开关-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_GGT_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GlobalGameTimer +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以记录游戏累计真实时间，开游戏就记录。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于整个游戏。
 * 全局存储：
 *   (1.即使不存档，累计的游戏时间也能够被记录。
 *      也就是说，开游戏即永久记录。
 *   (2.由于该数据是跨存档的，所以在不重置、不删save文件夹的情况下，
 *      时间会持续累加。
 * 累计时间：
 *   (1.累计时间以真实时间为准，但是会受到变速齿轮影响。
 *   (2."当前累计时间"是指 玩家当前打开游戏 后，持续游玩的累计时间。
 *      "全部累计时间"是指 玩家玩此游戏的总计累计时间。
 *      重开游戏后，"当前累计时间"会清零，"全部累计时间"不会。
 * 定时开关：
 *   (1.你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 *      注意"全部累计时间"的条件只会触发一次，之后不再触发。
 *   (2.开关开启的时间，玩家可能处于 地图界面、战斗界面、菜单界面。
 *      这时事件的指令不一定能够立即生效，所以你需要注意监听开关。
 *   (3.定时开关的时间条件不能太早，至少需要设在5秒之后。
 *      因为在0时0分0秒，开关系统都还未初始化。
 * 电子秒表：
 *   (1.计时器"秒表计次"功能与 电子秒表 的功能一样。
 *      执行一次"秒表计次"后，时间将会依次存储到一个计次列表中。
 *   (2.计次的数据也是跨存档的，不同存档中计次数据都是统一的。
 * 设计：
 *   (1.你可以使用定时开关功能，在玩家玩了一小时后，
 *      给予玩家奖励或者成就，也可以执行某些特殊的支线开关操作。
 *   (2.通过使用"给予值"插件指令，可以判断玩家玩了多长时间。
 *      玩家游戏后，不存档的游戏时长也算在内。
 *      "给予值(时)"等于1时，说明玩家已经玩了一小时。
 *   (3.另外 不建议 将此插件做成"每小时加1点体力"，用体力买超级
 *      道具的网游玩法。这样对 玩家 不友好。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 计时器控制
 * 你可以通过插件指令控制计时器：
 * 
 * 插件指令：>累计游戏计时器 : 当前累计时间 : 给予值(累计帧数) : 变量[21]
 * 插件指令：>累计游戏计时器 : 当前累计时间 : 给予值(秒) : 变量[22]
 * 插件指令：>累计游戏计时器 : 当前累计时间 : 给予值(分) : 变量[23]
 * 插件指令：>累计游戏计时器 : 当前累计时间 : 给予值(时) : 变量[24]
 * 
 * 插件指令：>累计游戏计时器 : 全部累计时间 : 给予值(累计帧数) : 变量[21]
 * 插件指令：>累计游戏计时器 : 全部累计时间 : 给予值(秒) : 变量[22]
 * 插件指令：>累计游戏计时器 : 全部累计时间 : 给予值(分) : 变量[23]
 * 插件指令：>累计游戏计时器 : 全部累计时间 : 给予值(时) : 变量[24]
 * 
 * 插件指令：>累计游戏计时器 : 计时器完全重置
 * 
 * 1.累计时间以真实时间为准，但是会受到变速齿轮影响。
 * 2."当前累计时间"是指 玩家当前打开游戏 后，持续游玩的累计时间。
 *   "全部累计时间"是指 玩家玩此游戏的总计累计时间。
 *   重开游戏后，"当前累计时间"会清零，"全部累计时间"不会。
 * 3."完全重置"将会清零全部累计时间，重新累计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 电子秒表
 * 你可以通过插件指令实现电子秒表相关计次功能：
 * 
 * 插件指令：>累计游戏计时器 : 当前累计时间 : 秒表计次
 * 插件指令：>累计游戏计时器 : 全部累计时间 : 秒表计次
 * 插件指令：>累计游戏计时器 : 修改计次上限 : 10
 * 插件指令：>累计游戏计时器 : 清除全部计次的时间
 * 
 * 插件指令：>累计游戏计时器 : 计次的时间[1] : 给予值(累计帧数) : 变量[21]
 * 插件指令：>累计游戏计时器 : 计次的时间[1] : 给予值(秒) : 变量[21]
 * 插件指令：>累计游戏计时器 : 计次的时间[1] : 给予值(分) : 变量[21]
 * 插件指令：>累计游戏计时器 : 计次的时间[1] : 给予值(时) : 变量[21]
 * 
 * 1.该功能与 秒表计时器 的功能一样。
 *   执行一次"秒表计次"后，时间将会存储到一个计次列表中。
 *   计次达到上限后，不再计次，需要清除全部计次后，即可重新计次。
 * 
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
 * 测试方法：   在开启游戏后即可测试捕获到。
 * 测试结果：   地图界面的消耗为：【15.20ms】
 *              战斗界面的消耗为：【13.55ms】
 *              菜单界面的消耗为：【5.07ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件的消耗一直都在，且背后会悄悄记录时间，不过消耗比较小，
 *   保存数据时性能影响几乎感觉不到。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了时间过早出现的未定义bug，添加了 时间设置校验 。
 * [v1.2]
 * 修改了插件分类。
 * [v1.3]
 * 优化了内部结构。
 * 
 * 
 *
 * @param ---秒表计时器---
 * @desc 
 * 
 * @param 默认计次上限
 * @parent ---秒表计时器---
 * @type number
 * @min 1
 * @desc 电子秒表记录时间默认的计次上限。
 * @default 10
 * 
 * 
 * @param ---定时开关---
 * @desc 
 * 
 * @param 定时开关-1
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 * 
 * @param 定时开关-2
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 * 
 * @param 定时开关-3
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-4
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-5
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-6
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-7
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-8
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-9
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-10
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-11
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-12
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-13
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-14
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-15
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-16
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-17
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-18
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-19
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 *
 * @param 定时开关-20
 * @parent ---定时开关---
 * @type struct<TimingSwitch>
 * @desc 你可以设置在特定的时间里，只触发一次开关 或 持续保持开关为开。
 * @default 
 * 
 */
/*~struct~TimingSwitch:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的定时开关==
 * 
 * 
 * @param 定时类型
 * @type select
 * @option 当前累计时间达到条件时间后开启一次
 * @value 当前累计时间达到条件时间后开启一次
 * @option 当前累计时间大于条件时间后持续保持开启
 * @value 当前累计时间大于条件时间后持续保持开启
 * @option 全部累计时间达到条件时间后开启一次
 * @value 全部累计时间达到条件时间后开启一次
 * @option 全部累计时间大于条件时间后持续保持开启
 * @value 全部累计时间大于条件时间后持续保持开启
 * @desc 由于时间是不断累加的，全部累计时间只会执行一次，当前累计时间可以多次执行。
 * @default 全部累计时间达到条件时间后开启一次
 * 
 * @param 条件-时
 * @type number
 * @min 0
 * @desc 指定的条件时间，小时数。
 * @default 0
 * 
 * @param 条件-分
 * @type number
 * @min 0
 * @desc 指定的条件时间，分钟数。
 * @default 10
 * 
 * @param 条件-秒
 * @type number
 * @min 0
 * @desc 指定的条件时间，秒数。
 * @default 0
 * 
 * @param 触发开关
 * @type switch
 * @desc 条件激活后，会设置指定的开关为 on开。
 * @default 0
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		GGT (Global_Game_Timer)
//		临时全局变量	DrillUp.g_GGT_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	在开启游戏后即可测试捕获到。
//		★性能测试消耗	13.55ms（updateScene 战斗界面）5.07ms（updateScene 菜单界面）
//		★最坏情况		无
//		★备注			一直都在，且背后会悄悄记录时间，保存时性能影响感觉不到。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			
//			->☆计时器
//			->☆计时器容器
//				->累计时间
//				->电子秒表
//			->☆计时器控制
//				->累计时间
//				->定时开关
//			
//			->☆存档管理器
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
//			1.存储管理器 分为 本地文件存储和本地网页存储。
//			  这个去看看脚本注释 StorageManager 就能理解了。
//			2.时间数据存在 drill_timer.rpgsave 文件中。
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
	DrillUp.g_GGT_PluginTip_curName = "Drill_GlobalGameTimer.js 管理器-累计游戏计时器";
	DrillUp.g_GGT_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 配置错误
	//==============================
	DrillUp.drill_GGT_getPluginTip_ErrorConfig = function(){
		return "【" + DrillUp.g_GGT_PluginTip_curName + "】\n插件配置错误：定时开关的时间条件不能太早，至少需要设在5秒之后。因为在0时0分0秒，开关系统都还未初始化。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_GlobalGameTimer = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_GlobalGameTimer');
	
	//==============================
	// * 静态数据 - 定时开关
	//				（~struct~TimingSwitch）
	//==============================
	DrillUp.drill_GGT_initTimingSwitch = function( dataFrom ) {
		var data = {};
		
		// > 定时设置
		data['type'] = String( dataFrom["定时类型"] || "全部累计时间达到条件时间后开启一次");
		data['condition_hour'] = Number( dataFrom["条件-时"] || 0);
		data['condition_min'] = Number( dataFrom["条件-分"] || 10);
		data['condition_sec'] = Number( dataFrom["条件-秒"] || 0);
		data['condition_frame'] = data['condition_hour']*216000 + data['condition_min']*3600 + data['condition_sec']*60;
		data['trigger_switch'] = Number( dataFrom["触发开关"] || 0);
		
		// > 强制校验
		if( data['condition_hour'] == 0 && data['condition_min'] == 0 && data['condition_sec'] <= 5 ){
			alert( DrillUp.drill_GGT_getPluginTip_ErrorConfig() );
		}
		
		return data;
	}
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_GGT_recordNum = Number(DrillUp.parameters['默认计次上限'] || 10);	

	/*-----------------定时开关------------------*/
	DrillUp.g_GGT_list_length = 20;
	DrillUp.g_GGT_list = [];
	for (var i = 0; i < DrillUp.g_GGT_list_length; i++) {
		if( DrillUp.parameters['定时开关-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['定时开关-' + String(i+1) ]);
			DrillUp.g_GGT_list[i] = DrillUp.drill_GGT_initTimingSwitch( temp );
		}else{
			DrillUp.g_GGT_list[i] = null;		//（直接null，防止反复判定）
		}
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_GGT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_GGT_pluginCommand.call(this,command, args);
	this.drill_GGT_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_GGT_pluginCommand = function( command, args ){
	if( command === ">累计游戏计时器" ){ 
	
		/*-----------------当前累计时间------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "当前累计时间" ){
				if( temp1 == "给予值(累计帧数)" ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					$gameVariables.setValue( temp2, DrillUp.drill_GGT_getCurCount() );
				}
				if( temp1 == "给予值(秒)" ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					var sec = Math.floor( DrillUp.drill_GGT_getCurCount() / 60 ) % 60;
					$gameVariables.setValue( temp2, sec );
				}
				if( temp1 == "给予值(分)" ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					var min = Math.floor( DrillUp.drill_GGT_getCurCount() / 3600 ) % 60;
					$gameVariables.setValue( temp2, min );
				}
				if( temp1 == "给予值(时)" ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					var hour = Math.floor( DrillUp.drill_GGT_getCurCount() / 216000 );
					$gameVariables.setValue( temp2, hour );
				}
			}
		}
		
		/*-----------------全部累计时间------------------*/
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "计时器完全重置" ){
				DrillUp.drill_GGT_resetCount();
			}
		}
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "全部累计时间" ){
				if( temp1 == "给予值(累计帧数)" ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					$gameVariables.setValue( temp2, DrillUp.drill_GGT_getAllCount() );
				}
				if( temp1 == "给予值(秒)" ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					var sec = Math.floor( DrillUp.drill_GGT_getAllCount() / 60 ) % 60;
					$gameVariables.setValue( temp2, sec );
				}
				if( temp1 == "给予值(分)" ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					var min = Math.floor( DrillUp.drill_GGT_getAllCount() / 3600 ) % 60;
					$gameVariables.setValue( temp2, min );
				}
				if( temp1 == "给予值(时)" ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					var hour = Math.floor( DrillUp.drill_GGT_getAllCount() / 216000 );
					$gameVariables.setValue( temp2, hour );
				}
			}
		}
		
		/*-----------------电子秒表------------------*/
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "清除全部计次的时间" ){
				DrillUp.drill_GGT_resetTank();
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			
			if( type == "当前累计时间" && temp1 == "秒表计次" ){
				DrillUp.drill_GGT_addTimeToTank( DrillUp.drill_GGT_getCurCount() );
			}
			if( type == "全部累计时间" && temp1 == "秒表计次" ){
				DrillUp.drill_GGT_addTimeToTank( DrillUp.drill_GGT_getAllCount() );
			}
			if( type == "修改计次上限" ){
				DrillUp.drill_GGT_setTankMax( Number(temp1) );
			}
		}
		if(args.length == 6){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			
			if( temp1.indexOf("计次的时间[") != -1 ){
				temp1 = temp1.replace("计次的时间[","");
				temp1 = temp1.replace("]","");
				temp1 = Number( temp1 );
				
				if( temp2 == "给予值(累计帧数)" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3);
					$gameVariables.setValue( temp3, DrillUp.drill_GGT_getTank()[temp1] );
				}
				if( temp2 == "给予值(秒)" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3);
					var sec = Math.floor( DrillUp.drill_GGT_getTank()[temp1]  / 60 ) % 60;
					$gameVariables.setValue( temp3, sec );
				}
				if( temp2 == "给予值(分)" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3);
					var min = Math.floor( DrillUp.drill_GGT_getTank()[temp1]  / 3600 ) % 60;
					$gameVariables.setValue( temp3, min );
				}
				if( temp2 == "给予值(时)" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3);
					var hour = Math.floor( DrillUp.drill_GGT_getTank()[temp1]  / 216000 );
					$gameVariables.setValue( temp3, hour );
				}
			}
		}
	};
	return true;
};



//=============================================================================
// ** ☆计时器容器
//
//			说明：	> 此模块提供对 计时器容器 的数据管理。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 计时器容器 - 数据检查
//
//			说明：	> 由于数据全局有效，因此只要数据是空的，就说明是新开的游戏窗体。
//==============================
DrillUp.drill_GGT_checkData = function(){
	if( this.g_GGT_data != undefined ){ return; }
	this.g_GGT_data = {};
	this.g_GGT_data['frameCount'] = 0;			//累计时间 - 全部累计时间
	this.g_GGT_data['curCount'] = 0;			//累计时间 - 当前累计时间
	
	this.g_GGT_data['tank'] = [];									//电子秒表 - 容器
	this.g_GGT_data['tankMax'] = DrillUp.g_GGT_recordNum || 10;		//电子秒表 - 上限
	
	// > 载入数据
	var temp_data = {};
	var temp_data_str = StorageManager.drill_GGT_load();
	if( temp_data_str != undefined && temp_data_str != "" ){
		temp_data = JSON.parse( temp_data_str );
	}
	
	// > 载入数据 - 依次载入
	if( temp_data['frameCount'] != undefined ){ this.g_GGT_data['frameCount'] = temp_data['frameCount']; }
	if( temp_data['tank'] != undefined ){ this.g_GGT_data['tank'] = temp_data['tank']; }
	if( temp_data['tankMax'] != undefined ){ this.g_GGT_data['tankMax'] = temp_data['tankMax']; }
}
//==============================
// * 计时器容器 - 累计时间 - 帧刷新
//==============================
DrillUp.drill_GGT_updateCount = function(){
	this.drill_GGT_checkData();
	this.g_GGT_data['frameCount'] += 1;
	this.g_GGT_data['curCount'] += 1;
}
//==============================
// * 计时器容器 - 累计时间 - 重置时间
//==============================
DrillUp.drill_GGT_resetCount = function(){
	this.drill_GGT_checkData();
	this.g_GGT_data['frameCount'] = 0;
	this.g_GGT_data['curCount'] = 0;
}
//==============================
// * 计时器容器 - 累计时间 - 获取 全部累计时间
//==============================
DrillUp.drill_GGT_getAllCount = function(){
	this.drill_GGT_checkData();
	return this.g_GGT_data['frameCount'];
}
//==============================
// * 计时器容器 - 累计时间 - 获取 当前累计时间
//==============================
DrillUp.drill_GGT_getCurCount = function(){
	this.drill_GGT_checkData();
	return this.g_GGT_data['curCount'];
}

//==============================
// * 计时器容器 - 电子秒表 - 重置
//==============================
DrillUp.drill_GGT_resetTank = function(){
	this.drill_GGT_checkData();
	this.g_GGT_data['tank'] = [];
}
//==============================
// * 计时器容器 - 电子秒表 - 添加时间
//==============================
DrillUp.drill_GGT_addTimeToTank = function( time ){
	this.drill_GGT_checkData();
	if( this.g_GGT_data['tank'].length < this.g_GGT_data['tankMax'] ){
		this.g_GGT_data['tank'].push( time );
	}
}
//==============================
// * 计时器容器 - 电子秒表 - 获取容器
//==============================
DrillUp.drill_GGT_getTank = function(){
	this.drill_GGT_checkData();
	return this.g_GGT_data['tank'];
}
//==============================
// * 计时器容器 - 电子秒表 - 上限
//==============================
DrillUp.drill_GGT_setTankMax = function( max ){
	this.drill_GGT_checkData();
	this.g_GGT_data['tankMax'] = max;
}


//=============================================================================
// ** ☆计时器控制
//
//			说明：	> 此模块提供对 计时器 各种操作的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 计时器控制 - 帧刷新
//==============================
var _drill_GGT_updateScene = SceneManager.updateScene;
SceneManager.updateScene = function(){
	_drill_GGT_updateScene.call(this);
	this.drill_GGT_updateSceneCount();		//帧刷新 - 累计时间
	this.drill_GGT_updateSceneSwitch();		//帧刷新 - 定时开关
}
//==============================
// * 计时器控制 - 帧刷新 - 累计时间
//==============================
SceneManager.drill_GGT_updateSceneCount = function(){
	var all_count = DrillUp.drill_GGT_getAllCount();
	var cur_count = DrillUp.drill_GGT_getCurCount();
	
	// > 帧数累计
	DrillUp.drill_GGT_updateCount();
	
	// > 每5秒记录自动存储一次（强制，防止玩家关闭后失效）
	if( all_count % 300 == 0 ){
		StorageManager.drill_GGT_save();
	}
}
//==============================
// * 计时器控制 - 帧刷新 - 定时开关
//==============================
SceneManager.drill_GGT_updateSceneSwitch = function(){
	if( $gameSwitches == undefined ){ return; }
	var all_count = DrillUp.drill_GGT_getAllCount();
	var cur_count = DrillUp.drill_GGT_getCurCount();
	
	for(var i = 0; i < DrillUp.g_GGT_list.length; i++ ){
		var temp_data = DrillUp.g_GGT_list[i];
		if( temp_data == undefined ){ continue; }
		
		if( temp_data['type'] == "当前累计时间达到条件时间后开启一次" ){
			if( temp_data['trigger_switch'] != 0  && cur_count == temp_data['condition_frame'] ){
				$gameSwitches.setValue( temp_data['trigger_switch'] , true );
			}
		}
		if( temp_data['type'] == "当前累计时间大于条件时间后持续保持开启" ){
			if( temp_data['trigger_switch'] != 0  && cur_count > temp_data['condition_frame'] ){
				if( $gameSwitches._data[ temp_data['trigger_switch'] ] != true ){
					$gameSwitches.setValue( temp_data['trigger_switch'] , true );
				}
			}
		}
		
		if( temp_data['type'] == "全部累计时间达到条件时间后开启一次" ){
			if( temp_data['trigger_switch'] != 0  && all_count == temp_data['condition_frame'] ){
				$gameSwitches.setValue( temp_data['trigger_switch'] , true );
			}
		}
		if( temp_data['type'] == "全部累计时间大于条件时间后持续保持开启" ){
			if( temp_data['trigger_switch'] != 0  && all_count > temp_data['condition_frame'] ){
				if( $gameSwitches._data[ temp_data['trigger_switch'] ] != true ){
					$gameSwitches.setValue( temp_data['trigger_switch'] , true );
				}
			}
		}
	}
}


//=============================================================================
// ** ☆存档管理器
//
//			说明：	> 此模块提供对 存档管理器 各种操作的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 存档管理器 - 保存（主流程）
//==============================
StorageManager.drill_GGT_save = function(){
	
	// > B文件模式
	if( this.isLocalMode() ){
		this.drill_GGT_saveToLocalFile( JSON.stringify( DrillUp.g_GGT_data ) );
	
	// > C网页模式
	}else{
		this.drill_GGT_saveToWebStorage( JSON.stringify( DrillUp.g_GGT_data ) );
	}
};
//==============================
// * 存档管理器 - 载入（主流程）
//==============================
StorageManager.drill_GGT_load = function(){
	
	// > B文件模式
	if( this.isLocalMode() ){
		return this.drill_GGT_loadFromLocalFile();
		
	// > C网页模式
	}else{
		return this.drill_GGT_loadFromWebStorage();
	}
};

//==============================
// * 存档管理器 - B文件模式 - 保存
//==============================
StorageManager.drill_GGT_saveToLocalFile = function( json_str ){
	var fs = require('fs');
	var dirPath = this.localFileDirectoryPath();
	var filePath = this.drill_GGT_localFilePath();
	
	// > 加密
	var data = LZString.compressToBase64( json_str );
	
	// > 文件夹路径自动创建【生成文件夹】
	if(!fs.existsSync(dirPath) ){
		fs.mkdirSync(dirPath);
	}
	
	// > 写入
	fs.writeFileSync(filePath, data);
};
//==============================
// * 存档管理器 - B文件模式 - 载入
//==============================
StorageManager.drill_GGT_loadFromLocalFile = function(){
	var fs = require('fs');
	var filePath = this.drill_GGT_localFilePath();
	var data = null;
	
	// > 读取
	if( fs.existsSync(filePath) != true ){ return ""; }
	data = fs.readFileSync(filePath, { encoding: 'utf8' });
	
	// > 解密
	return LZString.decompressFromBase64(data);	//（返回字符串）
};
//==============================
// * 存档管理器 - B文件模式 - 文件路径
//==============================
StorageManager.drill_GGT_localFilePath = function(){
    return this.localFileDirectoryPath() + "drill_timer.rpgsave";	//【生成文件】
};

//==============================
// * 存档管理器 - C网页模式 - 保存
//==============================
StorageManager.drill_GGT_saveToWebStorage = function( json_str ){
    var key = this.webStorageKey( "RPG drill_timer" );
    var data = LZString.compressToBase64( json_str );
    localStorage.setItem(key, data);
};
//==============================
// * 存档管理器 - C网页模式 - 载入
//==============================
StorageManager.drill_GGT_loadFromWebStorage = function(){
    var key = this.webStorageKey( "RPG drill_timer" );
    var data = localStorage.getItem(key);
	if( data == undefined ){ return ""; }
    return LZString.decompressFromBase64(data);
};


