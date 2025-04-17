//=============================================================================
// Drill_BattleEncounterCutscenes.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        战斗 - 战斗界面的动画转场
 * @author Drill_up
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_BattleEncounterCutscenes +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以自定义 战斗界面 的所有动画转场效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfCutscenes       系统-动画转场核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于界面切换的动画。
 * 2.详细内容可以去看看 "16.图片 > 关于动画转场核心.docx"。
 * 细节：
 *   (1.战斗界面有一些默认的动画流程，你可以分别控制它们：
 *      遇敌动画、战斗开始-淡出淡入动画、开始战斗对话、
 *      战斗结束-淡出淡入动画
 *   (2.为避免 你设计的动画转场 与 默认的动画转场 相互干扰，
 *      你可以在播放自定义转场前，把上述默认流程都关掉。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 遇敌动画
 * 你可以使用下面插件指令修改设置：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>战斗界面的动画转场 : 遇敌动画 : 开启
 * 插件指令：>战斗界面的动画转场 : 遇敌动画 : 关闭
 * 插件指令：>战斗界面的动画转场 : 遇敌动画 : 开启隐藏行走图
 * 插件指令：>战斗界面的动画转场 : 遇敌动画 : 关闭隐藏行走图
 * 插件指令：>战斗界面的动画转场 : 遇敌动画 : 修改时长[60]
 * 插件指令：>战斗界面的动画转场 : 遇敌动画 : 恢复默认
 * 
 * 1.遇敌动画是在播放 淡出淡入动画前，地图界面的屏幕闪烁且来回缩放的动画。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 淡出淡入动画
 * 你可以使用下面插件指令修改设置：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>战斗界面的动画转场 : 战斗开始-淡出淡入动画 : 开启
 * 插件指令：>战斗界面的动画转场 : 战斗开始-淡出淡入动画 : 关闭
 * 插件指令：>战斗界面的动画转场 : 战斗开始-淡出淡入动画 : 修改颜色[#ffffff]
 * 插件指令：>战斗界面的动画转场 : 战斗开始-淡出淡入动画 : 修改时长[48]
 * 插件指令：>战斗界面的动画转场 : 战斗开始-淡出淡入动画 : 恢复默认
 * 
 * 插件指令：>战斗界面的动画转场 : 战斗结束-淡出淡入动画 : 开启
 * 插件指令：>战斗界面的动画转场 : 战斗结束-淡出淡入动画 : 关闭
 * 插件指令：>战斗界面的动画转场 : 战斗结束-淡出淡入动画 : 修改颜色[#ffffff]
 * 插件指令：>战斗界面的动画转场 : 战斗结束-淡出淡入动画 : 修改时长[48]
 * 插件指令：>战斗界面的动画转场 : 战斗结束-淡出淡入动画 : 恢复默认
 * 
 * 1.淡出动画 是指游戏画面变成纯色幕布，淡入动画 是指纯色幕布变回游戏画面。
 *   插件指令写"淡出淡入动画"或"淡入淡出动画"都可以，表示意思一样。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 战斗开始对话
 * 你可以使用下面插件指令修改设置：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>战斗界面的动画转场 : 战斗开始对话 : 开启
 * 插件指令：>战斗界面的动画转场 : 战斗开始对话 : 关闭
 * 插件指令：>战斗界面的动画转场 : 战斗开始对话 : 恢复默认
 * 插件指令：>战斗界面的动画转场 : 战斗开始对话-敌人出现 : 关闭
 * 插件指令：>战斗界面的动画转场 : 战斗开始对话-敌人出现 : 开启
 * 插件指令：>战斗界面的动画转场 : 战斗开始对话-先发制人 : 关闭
 * 插件指令：>战斗界面的动画转场 : 战斗开始对话-先发制人 : 开启
 * 插件指令：>战斗界面的动画转场 : 战斗开始对话-被偷袭 : 关闭
 * 插件指令：>战斗界面的动画转场 : 战斗开始对话-被偷袭 : 开启
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   去各个界面跑一圈测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *              战斗界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于遇敌动画只有两张贴图，淡出淡入只有一张贴图，所以动画播放
 *   的效果消耗非常小。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param ---遇敌动画---
 * @desc 
 * 
 * @param 是否开启遇敌动画
 * @parent ---遇敌动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 * @param 遇敌时是否隐藏行走图
 * @parent ---遇敌动画---
 * @type boolean
 * @on 隐藏
 * @off 不操作
 * @desc true - 隐藏，false - 不操作。默认过场动画会在遇敌时隐藏行走图。
 * @default true
 * 
 * @param 遇敌动画时长
 * @parent ---遇敌动画---
 * @type number
 * @min 1
 * @desc 玩家在遇敌后播放遇敌动画的时长。
 * @default 60
 * 
 * 
 * @param ---淡出淡入动画---
 * @desc 
 * 
 * @param 战斗开始-是否开启淡出淡入
 * @parent ---淡出淡入动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 * @param 战斗开始-淡出淡入颜色
 * @parent ---淡出淡入动画---
 * @desc 淡出淡入动画的背景色，默认为黑色(#000000)。
 * @default #000000
 * 
 * @param 战斗开始-淡出淡入时长
 * @parent ---淡出淡入动画---
 * @type number
 * @min 1
 * @desc 离开地图界面，转到战斗界面时，播放淡出淡入动画的时长。
 * @default 48
 * 
 * @param 战斗结束-是否开启淡出淡入
 * @parent ---淡出淡入动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 * @param 战斗结束-淡出淡入颜色
 * @parent ---淡出淡入动画---
 * @desc 淡出淡入动画的背景色，默认为黑色(#000000)。
 * @default #000000
 * 
 * @param 战斗结束-淡出淡入时长
 * @parent ---淡出淡入动画---
 * @type number
 * @min 1
 * @desc 离开战斗界面，转到地图界面时，播放淡出淡入动画的时长。
 * @default 48
 * 
 * 
 * @param ---战斗开始对话---
 * @desc 
 * 
 * @param 是否显示对话
 * @parent ---战斗开始对话---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。你可以在游戏中用插件指令修改当前设置。
 * @default true
 * 
 * @param 是否显示对话-敌人出现
 * @parent 是否显示对话
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。你可以在游戏中用插件指令修改当前设置。
 * @default true
 * 
 * @param 是否显示对话-先发制人
 * @parent 是否显示对话
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。你可以在游戏中用插件指令修改当前设置。
 * @default true
 * 
 * @param 是否显示对话-被偷袭
 * @parent 是否显示对话
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。你可以在游戏中用插件指令修改当前设置。
 * @default true
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BECut（Battle_Encounter_Cutscenes）
//		临时全局变量	DrillUp.g_BECut_xxx
//		临时局部变量	this._drill_BECut_xxx
//		存储数据变量	$gameSystem._drill_BECut_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	进入战斗界面
//		★性能测试消耗	2024/6/15：
//							》未找到，消耗可能都在核心函数中。
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
//			->☆存储数据
//			->☆插件指令
//
//			->☆管辖权 - 遇敌动画
//			->☆管辖权 - 地图场景遇敌的切换
//			->☆管辖权 - 战斗开始对话
//
//			->☆遇敌动画
//				->遇敌动画开关
//				->时长
//				->隐藏全部行走图
//				->遇敌的声音
//			->☆淡出淡入动画
//				->战斗开始-执行淡出
//				->战斗开始-执行淡入
//				->战斗结束-执行淡出
//				->战斗结束-执行淡入
//			->☆战斗开始对话
//				->是否显示对话
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
//			1.动画转场 【不管】 公共事件的执行。
//
//		★其它说明细节：
//			暂无
//				
//		★存在的问题：
//			1.问题：战斗音乐在地图界面淡出动画之前就切换播放了，地图音乐也在战斗界面淡出动画之前就切换播放了。（2024-6-12）
//			  解决：【未解决】
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_BECut_PluginTip_curName = "Drill_BattleEncounterCutscenes.js 战斗-战斗界面的动画转场";
	DrillUp.g_BECut_PluginTip_baseList = ["Drill_CoreOfCutscenes.js 系统-动画转场核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_BECut_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_BECut_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_BECut_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_BECut_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_BECut_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_BattleEncounterCutscenes = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_BattleEncounterCutscenes');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_BECut_anim_enabled = String(DrillUp.parameters["是否开启遇敌动画"] || "true") === "true";
	DrillUp.g_BECut_anim_hideEnabled = String(DrillUp.parameters["遇敌时是否隐藏行走图"] || "true") === "true";
	DrillUp.g_BECut_anim_time = Number(DrillUp.parameters["遇敌动画时长"] || 60);
	
	DrillUp.g_BECut_fadeStart_enabled = String(DrillUp.parameters["战斗开始-是否开启淡出淡入"] || "true") === "true";
	DrillUp.g_BECut_fadeStart_color = String(DrillUp.parameters["战斗开始-淡出淡入颜色"] || "#000000");
	DrillUp.g_BECut_fadeStart_time = Number(DrillUp.parameters["战斗开始-淡出淡入时长"] || 48);
	
	DrillUp.g_BECut_fadeEnd_enabled = String(DrillUp.parameters["战斗结束-是否开启淡出淡入"] || "true") === "true";
	DrillUp.g_BECut_fadeEnd_color = String(DrillUp.parameters["战斗结束-淡出淡入颜色"] || "#000000");
	DrillUp.g_BECut_fadeEnd_time = Number(DrillUp.parameters["战斗结束-淡出淡入时长"] || 48);
	
	/*-----------------战斗开始对话------------------*/
	DrillUp.g_BECut_enableMessage = String(DrillUp.parameters["是否显示对话"] || "true") === "true";
	DrillUp.g_BECut_enableMessage_emerge = String(DrillUp.parameters["是否显示对话-敌人出现"] || "true") === "true";
	DrillUp.g_BECut_enableMessage_preemptive = String(DrillUp.parameters["是否显示对话-先发制人"] || "true") === "true";
	DrillUp.g_BECut_enableMessage_surprise = String(DrillUp.parameters["是否显示对话-被偷袭"] || "true") === "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfCutscenes ){
	
	
	
//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_BECut_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BECut_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BECut_sys_initialize.call(this);
	this.drill_BECut_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BECut_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BECut_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BECut_saveEnabled == true ){	
		$gameSystem.drill_BECut_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BECut_initSysData();
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
Game_System.prototype.drill_BECut_initSysData = function() {
	this.drill_BECut_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BECut_checkSysData = function() {
	this.drill_BECut_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BECut_initSysData_Private = function() {
	
	// > 遇敌动画
	this._drill_BECut_anim_enabled = DrillUp.g_BECut_anim_enabled;
	this._drill_BECut_anim_hideEnabled = DrillUp.g_BECut_anim_hideEnabled;
	this._drill_BECut_anim_time = DrillUp.g_BECut_anim_time;
	
	// > 战斗开始-淡出淡入动画
	this._drill_BECut_fadeStart_enabled = DrillUp.g_BECut_fadeStart_enabled;
	this._drill_BECut_fadeStart_color = DrillUp.g_BECut_fadeStart_color;
	this._drill_BECut_fadeStart_time = DrillUp.g_BECut_fadeStart_time;
	
	// > 战斗结束-淡出淡入动画
	this._drill_BECut_fadeEnd_enabled = DrillUp.g_BECut_fadeEnd_enabled;
	this._drill_BECut_fadeEnd_color = DrillUp.g_BECut_fadeEnd_color;
	this._drill_BECut_fadeEnd_time = DrillUp.g_BECut_fadeEnd_time;
	
	// > 战斗开始对话
	this._drill_BECut_enableMessage = DrillUp.g_BECut_enableMessage;
	this._drill_BECut_enableMessage_emerge = DrillUp.g_BECut_enableMessage_emerge;
	this._drill_BECut_enableMessage_preemptive = DrillUp.g_BECut_enableMessage_preemptive;
	this._drill_BECut_enableMessage_surprise = DrillUp.g_BECut_enableMessage_surprise;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BECut_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BECut_enableMessage == undefined ){
		this.drill_BECut_initSysData();
	}
	
};
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_BECut_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_BECut_pluginCommand.call(this, command, args);
	this.drill_BECut_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_BECut_pluginCommand = function( command, args ){
	if( command === ">战斗界面的动画转场" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			
			/*-----------------转场设置------------------*/
			if( type == "遇敌动画" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_BECut_anim_enabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_BECut_anim_enabled = false;
				}
				if( temp1 == "开启隐藏行走图" ){
					$gameSystem._drill_BECut_anim_hideEnabled = true;
				}
				if( temp1 == "关闭隐藏行走图" ){
					$gameSystem._drill_BECut_anim_hideEnabled = false;
				}
				if( temp1.indexOf("修改时长[") != -1 ){
					temp1 = temp1.replace("修改时长[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_BECut_anim_time = Number(temp1);
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_BECut_anim_enabled = DrillUp.g_BECut_anim_enabled;
					$gameSystem._drill_BECut_anim_hideEnabled = DrillUp.g_BECut_anim_hideEnabled;
					$gameSystem._drill_BECut_anim_time = DrillUp.g_BECut_anim_time;
				}
			}
			if( type == "战斗开始-淡出淡入动画" || type == "战斗开始-淡入淡出动画" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_BECut_fadeStart_enabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_BECut_fadeStart_enabled = false;
				}
				if( temp1.indexOf("修改颜色[") != -1 ){
					temp1 = temp1.replace("修改颜色[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_BECut_fadeStart_color = String(temp1);
				}
				if( temp1.indexOf("修改时长[") != -1 ){
					temp1 = temp1.replace("修改时长[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_BECut_fadeStart_time = Number(temp1);
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_BECut_fadeStart_enabled = DrillUp.g_BECut_fadeStart_enabled;
					$gameSystem._drill_BECut_fadeStart_color = DrillUp.g_BECut_fadeStart_color;
					$gameSystem._drill_BECut_fadeStart_time = DrillUp.g_BECut_fadeStart_time;
				}
			}
			if( type == "战斗结束-淡出淡入动画" || type == "战斗结束-淡入淡出动画" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_BECut_fadeEnd_enabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_BECut_fadeEnd_enabled = false;
				}
				if( temp1.indexOf("修改颜色[") != -1 ){
					temp1 = temp1.replace("修改颜色[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_BECut_fadeEnd_color = String(temp1);
				}
				if( temp1.indexOf("修改时长[") != -1 ){
					temp1 = temp1.replace("修改时长[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_BECut_fadeEnd_time = Number(temp1);
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_BECut_fadeEnd_enabled = DrillUp.g_BECut_fadeEnd_enabled;
					$gameSystem._drill_BECut_fadeEnd_color = DrillUp.g_BECut_fadeEnd_color;
					$gameSystem._drill_BECut_fadeEnd_time = DrillUp.g_BECut_fadeEnd_time;
				}
			}
			
			/*-----------------战斗开始对话------------------*/
			if( type == "战斗开始对话" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_BECut_enableMessage = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_BECut_enableMessage = false;
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_BECut_enableMessage = DrillUp.g_BECut_enableMessage;
					$gameSystem._drill_BECut_enableMessage_emerge = DrillUp.g_BECut_enableMessage_emerge;
					$gameSystem._drill_BECut_enableMessage_preemptive = DrillUp.g_BECut_enableMessage_preemptive;
					$gameSystem._drill_BECut_enableMessage_surprise = DrillUp.g_BECut_enableMessage_surprise;
				}
			}
			if( type == "战斗开始对话-敌人出现" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_BECut_enableMessage_emerge = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_BECut_enableMessage_emerge = false;
				}
			}
			if( type == "战斗开始对话-先发制人" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_BECut_enableMessage_preemptive = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_BECut_enableMessage_preemptive = false;
				}
			}
			if( type == "战斗开始对话-被偷袭" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_BECut_enableMessage_surprise = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_BECut_enableMessage_surprise = false;
				}
			}
		}
	}
};
	
	
//=============================================================================
// ** ☆管辖权 - 遇敌动画
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 2D遇敌动画『战斗-战斗界面的动画转场』 - 创建 屏幕效果贴图
//==============================
Spriteset_Base.prototype.createScreenSprites = function(){
    this._flashSprite = new ScreenSprite();
    this._fadeSprite = new ScreenSprite();
    this.addChild(this._flashSprite);
    this.addChild(this._fadeSprite);
};
//==============================
// * 2D遇敌动画『战斗-战斗界面的动画转场』 - 帧刷新 屏幕效果贴图
//
//			说明：	> 该功能被 $gameScreen 控制，用于播放 玩家遇敌 后，屏幕的闪烁效果。
//==============================
Spriteset_Base.prototype.updateScreenSprites = function(){
    var color = $gameScreen.flashColor();
    this._flashSprite.setColor(color[0], color[1], color[2]);
    this._flashSprite.opacity = color[3];
    this._fadeSprite.opacity = 255 - $gameScreen.brightness();
};
//==============================
// * 2D遇敌动画『战斗-战斗界面的动画转场』 - 帧刷新 位置与缩放
//
//			说明：	> 该功能被 $gameScreen 控制，用于播放 玩家遇敌 后，屏幕的缩放效果。
//==============================
Spriteset_Base.prototype.updatePosition = function(){
    var screen = $gameScreen;
    var scale = screen.zoomScale();
    this.scale.x = scale;
    this.scale.y = scale;
    this.x = Math.round(-screen.zoomX() * (scale - 1));
    this.y = Math.round(-screen.zoomY() * (scale - 1));
    this.x += Math.round(screen.shake());
};
*/
//=============================================================================
// ** ☆管辖权 - 地图场景遇敌的切换
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 2G遇敌的切换『战斗-战斗界面的动画转场』 - 监听切换
//==============================
Scene_Map.prototype.updateEncounter = function() {
	if( $gamePlayer.executeEncounter() ){
		
		// > 切换到战斗界面
		//		（Scene_Map.prototype.stop 函数可以识别 战斗界面，自动加入遇敌动画）
		SceneManager.push(Scene_Battle);
	}
};
//==============================
// * 2G遇敌的切换『战斗-战斗界面的动画转场』 - 切换初始化
//==============================
Scene_Map.prototype.launchBattle = function() {
	
	// > 遇敌音乐控制
    BattleManager.saveBgmAndBgs();
    this.stopAudioOnBattleStart();
    SoundManager.playBattleStart();
	
	// > 遇敌初始化
    this.startEncounterEffect();
    this._mapNameWindow.hide();
};
//==============================
// * 2G遇敌的切换『战斗-战斗界面的动画转场』 - 切换前暂停音乐
//==============================
Scene_Map.prototype.stopAudioOnBattleStart = function() {
    if (!AudioManager.isCurrentBgm($gameSystem.battleBgm())) {
        AudioManager.stopBgm();
    }
    AudioManager.stopBgs();
    AudioManager.stopMe();
    AudioManager.stopSe();
};

//==============================
// * 2G遇敌的切换『战斗-战斗界面的动画转场』 - 遇敌动画 - 初始化
//==============================
Scene_Map.prototype.startEncounterEffect = function() {
    this._spriteset.hideCharacters();								//隐藏行走图
    this._encounterEffectDuration = this.encounterEffectSpeed();	//设置遇敌动画时长
};
//==============================
// * 2G遇敌的切换『战斗-战斗界面的动画转场』 - 遇敌动画 - 时长
//==============================
Scene_Map.prototype.encounterEffectSpeed = function(){ return 60; };
//==============================
// * 2G遇敌的切换『战斗-战斗界面的动画转场』 - 遇敌动画 - 帧刷新
//==============================
Scene_Map.prototype.updateEncounterEffect = function() {
    if( this._encounterEffectDuration > 0 ){		//（参数 _encounterEffectDuration 会使界面处于 isBusy 状态，从而延迟界面切换）
        this._encounterEffectDuration--;
        var speed = this.encounterEffectSpeed();
        var n = speed - this._encounterEffectDuration;
		
        var p = n / speed;
        var q = ((p - 1) * 20 * p + 5) * p + 1;
        var zoomX = $gamePlayer.screenX();
        var zoomY = $gamePlayer.screenY() - 24;
        if( n === 2 ){
            $gameScreen.setZoom(zoomX, zoomY, 1);
            this.snapForBattleBackground();
            this.startFlashForEncounter(speed / 2);
        }
        $gameScreen.setZoom(zoomX, zoomY, q);
        if( n === Math.floor(speed / 6) ){
            this.startFlashForEncounter(speed / 2);
        }
        if( n === Math.floor(speed / 2) ){
			
			// > 执行淡出流程
            BattleManager.playBattleBgm();
            this.startFadeOut(this.fadeSpeed());	//（淡出函数中 _fadeDuration 也会使界面处于 isBusy 状态，从而延迟界面切换）
        }
    }
};
//==============================
// * 2G遇敌的切换『战斗-战斗界面的动画转场』 - 遇敌动画 - 地图截图
//==============================
Scene_Map.prototype.snapForBattleBackground = function() {
    this._windowLayer.visible = false;		//（隐藏窗口层 再截图）
    SceneManager.snapForBackground();
    this._windowLayer.visible = true;
};
//==============================
// * 2G遇敌的切换『战斗-战斗界面的动画转场』 - 遇敌动画 - 执行白色闪烁
//==============================
Scene_Map.prototype.startFlashForEncounter = function( duration ){
    var color = [255, 255, 255, 255];
    $gameScreen.startFlash(color, duration);
};
*/
//=============================================================================
// ** ☆管辖权 - 战斗开始对话
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 战斗流程『战斗-战斗界面的动画转场』 - 开始 - 战斗开始对话
//==============================
BattleManager.displayStartMessages = function() {
	$gameTroop.enemyNames().forEach(function( name ){
		$gameMessage.add( TextManager.emerge.format(name) );					//信息 - 敌人出现
	});
	if( this._preemptive ){
		$gameMessage.add( TextManager.preemptive.format($gameParty.name()) );	//信息 - 先发制人
	}else if( this._surprise ){
		$gameMessage.add( TextManager.surprise.format($gameParty.name()) );		//信息 - 被偷袭
	}
};
*/



//=============================================================================
// ** ☆遇敌动画
//
//			说明：	> 此模块控制 地图界面转战斗界面 的遇敌动画、淡出淡入。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 遇敌动画 - 帧刷新 屏幕效果贴图
//==============================
var _drill_BECut_updateScreenSprites = Spriteset_Base.prototype.updateScreenSprites;
Spriteset_Base.prototype.updateScreenSprites = function(){
	
	// > 遇敌动画开关
	if( $gameSystem._drill_BECut_anim_enabled == false ){ return; }
	
	// > 原函数
    _drill_BECut_updateScreenSprites.call(this);
};
//==============================
// * 遇敌动画 - 帧刷新 位置与缩放
//==============================
var _drill_BECut_updatePosition = Spriteset_Base.prototype.updatePosition;
Spriteset_Base.prototype.updatePosition = function(){
	
	// > 遇敌动画开关
	if( $gameSystem._drill_BECut_anim_enabled == false ){ return; }
	
	// > 原函数
    _drill_BECut_updatePosition.call(this);
};
//==============================
// * 遇敌动画 - 初始化
//==============================
var _drill_BECut_startEncounterEffect = Scene_Map.prototype.startEncounterEffect;
Scene_Map.prototype.startEncounterEffect = function() {
	
	// > 遇敌动画开关
	if( $gameSystem._drill_BECut_anim_enabled == false ){
		
		BattleManager.playBattleBgm();		//（直接执行淡出流程）
		this.startFadeOut(this.fadeSpeed());
		
		return; 
	}
	
	// > 原函数
	_drill_BECut_startEncounterEffect.call(this);
};
//==============================
// * 遇敌动画 - 时长
//==============================
Scene_Map.prototype.encounterEffectSpeed = function(){
	return $gameSystem._drill_BECut_anim_time;
};
//==============================
// * 遇敌动画 - 隐藏全部行走图
//
//			说明：	> 该函数由于只被 startEncounterEffect 函数调用，所以这里直接加开关。
//==============================
var _drill_BECut_hideCharacters = Spriteset_Map.prototype.hideCharacters;
Spriteset_Map.prototype.hideCharacters = function(){
	
	// > 是否隐藏行走图
	if( $gameSystem._drill_BECut_anim_hideEnabled == false ){ return; }
	
	// > 原函数
	_drill_BECut_hideCharacters.call(this);
};
//==============================
// * 遇敌动画 - 遇敌的声音
//==============================
var _drill_BECut_playBattleStart = SoundManager.playBattleStart;
SoundManager.playBattleStart = function() {
    
	// > 遇敌动画开关
	if( $gameSystem._drill_BECut_anim_enabled == false ){ return; }
	
	// > 原函数
	_drill_BECut_playBattleStart.call(this);
};


//=============================================================================
// ** ☆淡出淡入动画
//
//			说明：	> 此模块控制场景切换时 淡出淡入 的过程。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 淡出淡入动画 - 配置初始化
//==============================
var _drill_BECut_COCut_setFadeData = Scene_Base.prototype.drill_COCut_setFadeData;
Scene_Base.prototype.drill_COCut_setFadeData = function( cur_sceneName, tar_sceneName, fade_type, is_white ){
	_drill_BECut_COCut_setFadeData.call( this, cur_sceneName, tar_sceneName, fade_type, is_white );
	
	// > 战斗开始-执行淡出（地图界面 -> 战斗界面，不区分 is_white 参数）
	if( cur_sceneName == "Scene_Map" &&
		tar_sceneName == "Scene_Battle" &&
		fade_type == "淡出" ){
		
		// > 关闭动画时
		if( $gameSystem._drill_BECut_fadeStart_enabled == false ){
			this.drill_COCut_submitFade( false );
			
		// > 开启动画时
		}else{
			this.drill_COCut_setFadeColor( $gameSystem._drill_BECut_fadeStart_color );
			this.drill_COCut_setFadeTime( $gameSystem._drill_BECut_fadeStart_time );
			this.drill_COCut_submitFade( true );
		}
		return;
	}
	
	// > 战斗开始-执行淡入（地图界面 -> 战斗界面，不区分 is_white 参数）
	if( cur_sceneName == "Scene_Map" &&
		tar_sceneName == "Scene_Battle" &&
		fade_type == "淡入" ){
		
		// > 关闭动画时
		if( $gameSystem._drill_BECut_fadeStart_enabled == false ){
			this.drill_COCut_submitFade( false );
			
		// > 开启动画时
		}else{
			this.drill_COCut_setFadeColor( $gameSystem._drill_BECut_fadeStart_color );
			this.drill_COCut_setFadeTime( $gameSystem._drill_BECut_fadeStart_time );
			this.drill_COCut_submitFade( true );
		}
		return;
	}
	
	// > 战斗结束-执行淡出（战斗界面 -> 地图界面/战斗失败界面，不区分 is_white 参数）
	if( cur_sceneName == "Scene_Battle" &&
		(tar_sceneName == "Scene_Map" || tar_sceneName == "Scene_Gameover") &&
		fade_type == "淡出" ){
		
		// > 关闭动画时
		if( $gameSystem._drill_BECut_fadeEnd_enabled == false ){
			this.drill_COCut_submitFade( false );
			
		// > 开启动画时
		}else{
			this.drill_COCut_setFadeColor( $gameSystem._drill_BECut_fadeEnd_color );
			this.drill_COCut_setFadeTime( $gameSystem._drill_BECut_fadeEnd_time );
			this.drill_COCut_submitFade( true );
		}
		return;
	}
	
	// > 战斗结束-执行淡入（战斗界面 -> 地图界面/战斗失败界面，不区分 is_white 参数）
	if( cur_sceneName == "Scene_Battle" &&
		(tar_sceneName == "Scene_Map" || tar_sceneName == "Scene_Gameover") &&
		fade_type == "淡入" ){
		
		// > 关闭动画时
		if( $gameSystem._drill_BECut_fadeEnd_enabled == false ){
			this.drill_COCut_submitFade( false );
			
		// > 开启动画时
		}else{
			this.drill_COCut_setFadeColor( $gameSystem._drill_BECut_fadeEnd_color );
			this.drill_COCut_setFadeTime( $gameSystem._drill_BECut_fadeEnd_time );
			this.drill_COCut_submitFade( true );
		}
		return;
	}
}


//=============================================================================
// ** ☆战斗开始对话
//
//			说明：	> 此模块控制 战斗界面 开始时对话。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 战斗开始对话 - 最后继承
//==============================
var _drill_BECut_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_BECut_scene_initialize.call(this);		//（此方法放到最后再继承）
	
	//==============================
	// * 战斗开始对话 - 添加对话
	//==============================
	BattleManager.displayStartMessages = function(){
		
		// > 是否显示对话
		if( $gameSystem._drill_BECut_enableMessage == false ){ return; }
		
		// > 信息 - 敌人出现
		if( $gameSystem._drill_BECut_enableMessage_emerge == true ){
			
			for(var i = 0; i < $gameTroop._enemies.length; i++ ){
				var enemy = $gameTroop._enemies[i];
				if( enemy.isAlive() == false ){ continue; }
				
				var name = enemy.drill_BECut_enemyColorName();
				$gameMessage.add( TextManager.emerge.format(name) );
			}
		};
		
		if( this._preemptive ){
			
			// > 信息 - 先发制人
			if( $gameSystem._drill_BECut_enableMessage_preemptive == true ){
				$gameMessage.add( TextManager.preemptive.format($gameParty.name()) );
			}
		}else if( this._surprise ){
			
			// > 信息 - 被偷袭
			if( $gameSystem._drill_BECut_enableMessage_surprise == true ){
				$gameMessage.add( TextManager.surprise.format($gameParty.name()) );
			}
		}
	};
}
//==============================
// * 战斗开始对话 - 获取敌人名称（含颜色）
//==============================
Game_Enemy.prototype.drill_BECut_enemyColorName = function(){
	var name = this.name();
	if( Imported.Drill_EnemyTextColor ){	//【UI-敌人文本颜色】
		var color = $gameTemp.drill_ETC_getColorId( this.enemyId() );
		if( color >= 0 ){
			name = "\\c["+ String(Number(color)+100) + "]" + name + "\\c[0]";
		}
	}
	return name;
};
//==============================
// * 战斗开始对话 - 获取角色名称（含颜色）
//==============================
Game_Actor.prototype.drill_BECut_actorColorName = function(){
	var name = this.name();
	if( Imported.Drill_ActorTextColor ){	//【UI-角色文本颜色】
		var color = $gameTemp.drill_ATC_getColorId( this.actorId() );
		if( color >= 0 ){
			name = "\\c["+ String(color) + "]" + name + "\\c[0]";
		}
	}
	return this.name();
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BattleEncounterCutscenes = false;
		var pluginTip = DrillUp.drill_BECut_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


