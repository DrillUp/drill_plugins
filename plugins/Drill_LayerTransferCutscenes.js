//=============================================================================
// Drill_LayerTransferCutscenes.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        地图 - 场所移动的动画转场
 * @author Drill_up
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerTransferCutscenes +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以自定义 场所移动指令 的动画转场效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfCutscenes       系统-动画转场核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于界面切换的动画。
 * 2.详细内容可以去看看 "1.系统 > 关于动画转场核心.docx"。
 * 细节：
 *   (1.为避免 你设计的动画转场 与 默认的动画转场 相互干扰，
 *      你可以在播放自定义转场前，把场所移动的淡出淡入动画关掉。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 淡出淡入动画
 * 你可以使用下面插件指令修改设置：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>场所移动的动画转场 : 淡出淡入动画 : 启用
 * 插件指令：>场所移动的动画转场 : 淡出淡入动画 : 关闭
 * 插件指令：>场所移动的动画转场 : 淡出淡入动画 : 修改黑色选项为其它颜色[#000000]
 * 插件指令：>场所移动的动画转场 : 淡出淡入动画 : 修改白色选项为其它颜色[#ffffff]
 * 插件指令：>场所移动的动画转场 : 淡出淡入动画 : 修改时长[48]
 * 插件指令：>场所移动的动画转场 : 淡出淡入动画 : 恢复默认
 * 
 * 1.淡出动画 是指游戏画面变成纯色幕布，淡入动画 是指纯色幕布变回游戏画面。
 *   插件指令写"淡出淡入动画"或"淡入淡出动画"都可以，表示意思一样。
 * 2.事件指令"场所移动"中，有三个选项"黑"、"白"、"无"。
 *   你可以用插件指令将 "黑"、"白" 修改成其它颜色。
 *   "无" 与 关闭淡出淡入动画 的效果一样。
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
 * 测试方法：   去各个管理层跑一圈测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于淡出淡入只有一张贴图，所以动画播放的效果消耗非常小。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param ---淡出淡入动画---
 * @desc 
 * 
 * @param 是否开启淡出淡入
 * @parent ---淡出淡入动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 * @param 淡出淡入的黑色
 * @parent ---淡出淡入动画---
 * @desc 事件指令"场所移动"可以选择淡出淡入的黑色，你可以将选择的黑色改成其它颜色。
 * @default #000000
 * 
 * @param 淡出淡入的白色
 * @parent ---淡出淡入动画---
 * @desc 事件指令"场所移动"可以选择淡出淡入的白色，你可以将选择的白色改成其它颜色。
 * @default #ffffff
 * 
 * @param 淡出淡入时长
 * @parent ---淡出淡入动画---
 * @type number
 * @min 1
 * @desc 场所移动转到其它地图时，播放淡出淡入动画的时长。
 * @default 48
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LTCut（Layer_Transfer_Cutscenes）
//		临时全局变量	DrillUp.g_LTCut_xxx
//		临时局部变量	this._drill_LTCut_xxx
//		存储数据变量	$gameSystem._drill_LTCut_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	执行场所移动
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
//			->☆淡出淡入动画
//				->执行淡出
//				->执行淡入
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
//			暂无
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_LTCut_PluginTip_curName = "Drill_LayerTransferCutscenes.js 地图-场所移动的动画转场";
	DrillUp.g_LTCut_PluginTip_baseList = ["Drill_CoreOfCutscenes.js 系统-动画转场核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_LTCut_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_LTCut_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_LTCut_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_LTCut_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_LTCut_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerTransferCutscenes = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerTransferCutscenes');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_LTCut_fade_enabled = String(DrillUp.parameters["是否开启淡出淡入"] || "true") === "true";
	DrillUp.g_LTCut_fade_colorBlack = String(DrillUp.parameters["淡出淡入的黑色"] || "#000000");
	DrillUp.g_LTCut_fade_colorWhite = String(DrillUp.parameters["淡出淡入的白色"] || "#ffffff");
	DrillUp.g_LTCut_fade_time = Number(DrillUp.parameters["淡出淡入时长"] || 48);
	
	
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
DrillUp.g_LTCut_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LTCut_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LTCut_sys_initialize.call(this);
	this.drill_LTCut_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LTCut_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LTCut_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LTCut_saveEnabled == true ){	
		$gameSystem.drill_LTCut_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LTCut_initSysData();
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
Game_System.prototype.drill_LTCut_initSysData = function() {
	this.drill_LTCut_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LTCut_checkSysData = function() {
	this.drill_LTCut_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LTCut_initSysData_Private = function() {
	
	// > 淡出淡入动画
	this._drill_LTCut_fade_enabled = DrillUp.g_LTCut_fade_enabled;
	this._drill_LTCut_fade_colorBlack = DrillUp.g_LTCut_fade_colorBlack;
	this._drill_LTCut_fade_colorWhite = DrillUp.g_LTCut_fade_colorWhite;
	this._drill_LTCut_fade_time = DrillUp.g_LTCut_fade_time;
	
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LTCut_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LTCut_fade_enabled == undefined ){
		this.drill_LTCut_initSysData();
	}
	
};
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_LTCut_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LTCut_pluginCommand.call(this, command, args);
	if( command === ">场所移动的动画转场" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			
			/*-----------------转场设置------------------*/
			if( type == "淡出淡入动画" || type == "淡入淡出动画" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_LTCut_fade_enabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_LTCut_fade_enabled = false;
				}
				if( temp1.indexOf("修改黑色选项为其它颜色[") != -1 ){
					temp1 = temp1.replace("修改黑色选项为其它颜色[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_LTCut_fade_colorBlack = String(temp1);
				}
				if( temp1.indexOf("修改白色选项为其它颜色[") != -1 ){
					temp1 = temp1.replace("修改白色选项为其它颜色[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_LTCut_fade_colorWhite = String(temp1);
				}
				if( temp1.indexOf("修改时长[") != -1 ){
					temp1 = temp1.replace("修改时长[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_LTCut_fade_time = Number(temp1);
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_LTCut_fade_enabled = DrillUp.g_LTCut_fade_enabled;
					$gameSystem._drill_LTCut_fade_colorBlack = DrillUp.g_LTCut_fade_colorBlack;
					$gameSystem._drill_LTCut_fade_colorWhite = DrillUp.g_LTCut_fade_colorWhite;
					$gameSystem._drill_LTCut_fade_time = DrillUp.g_LTCut_fade_time;
				}
			}
			
		}
	}
};
	
	
	
//=============================================================================
// ** ☆淡出淡入动画
//
//			说明：	> 此模块控制 地图界面转地图界面 的场景切换过程。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 淡出淡入动画 - 配置初始化
//==============================
var _drill_LTCut_COCut_setFadeData = Scene_Base.prototype.drill_COCut_setFadeData;
Scene_Base.prototype.drill_COCut_setFadeData = function( cur_sceneName, tar_sceneName, fade_type, is_white ){
	_drill_LTCut_COCut_setFadeData.call( this, cur_sceneName, tar_sceneName, fade_type, is_white );
	
	// > 执行淡出（地图界面 -> 地图界面）
	if( cur_sceneName == "Scene_Map" &&
		tar_sceneName == "Scene_Map" &&
		fade_type == "淡出" ){
		
		// > 关闭动画时
		if( $gameSystem._drill_LTCut_fade_enabled == false ){
			this.drill_COCut_submitFade( false );
			
		// > 开启动画时
		}else{
			if( is_white == true ){
				this.drill_COCut_setFadeColor( $gameSystem._drill_LTCut_fade_colorWhite );
			}else{
				this.drill_COCut_setFadeColor( $gameSystem._drill_LTCut_fade_colorBlack );
			}
			this.drill_COCut_setFadeTime( $gameSystem._drill_LTCut_fade_time );
			this.drill_COCut_submitFade( true );
		}
		return;
	}
	
	// > 执行淡入（地图界面 -> 地图界面）
	if( cur_sceneName == "Scene_Map" &&
		tar_sceneName == "Scene_Map" &&
		fade_type == "淡入" ){
		
		// > 关闭动画时
		if( $gameSystem._drill_LTCut_fade_enabled == false ){
			this.drill_COCut_submitFade( false );
			
		// > 开启动画时
		}else{
			if( is_white == true ){
				this.drill_COCut_setFadeColor( $gameSystem._drill_LTCut_fade_colorWhite );
			}else{
				this.drill_COCut_setFadeColor( $gameSystem._drill_LTCut_fade_colorBlack );
			}
			this.drill_COCut_setFadeTime( $gameSystem._drill_LTCut_fade_time );
			this.drill_COCut_submitFade( true );
		}
		return;
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_LayerTransferCutscenes = false;
		var pluginTip = DrillUp.drill_LTCut_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


