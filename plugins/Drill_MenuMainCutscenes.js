//=============================================================================
// Drill_MenuMainCutscenes.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        主菜单 - 主菜单面板的动画转场
 * @author Drill_up
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_MenuMainCutscenes +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以自定义 主菜单面板 的动画转场效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfCutscenes       系统-动画转场核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、菜单界面。
 *   作用于界面切换的动画。
 * 2.详细内容可以去看看 "16.图片 > 关于动画转场核心.docx"。
 * 细节：
 *   (1.切换主菜单面板时，游戏默认不播放 淡出淡入动画 。
 *   (2.没有动画时，玩家能看到菜单加载的过程。
 *      如果菜单加载卡1秒以上，玩家能明显感觉到菜单加载的卡顿。
 *      这时候用淡出淡入动画可以缓解这种卡顿感。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 淡出淡入动画
 * 你可以使用下面插件指令修改设置：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>主菜单面板的动画转场 : 进入主菜单-淡出淡入动画 : 启用
 * 插件指令：>主菜单面板的动画转场 : 进入主菜单-淡出淡入动画 : 关闭
 * 插件指令：>主菜单面板的动画转场 : 进入主菜单-淡出淡入动画 : 修改颜色[#ffffff]
 * 插件指令：>主菜单面板的动画转场 : 进入主菜单-淡出淡入动画 : 修改时长[48]
 * 插件指令：>主菜单面板的动画转场 : 进入主菜单-淡出淡入动画 : 恢复默认
 * 
 * 插件指令：>主菜单面板的动画转场 : 离开主菜单-淡出淡入动画 : 启用
 * 插件指令：>主菜单面板的动画转场 : 离开主菜单-淡出淡入动画 : 关闭
 * 插件指令：>主菜单面板的动画转场 : 离开主菜单-淡出淡入动画 : 修改颜色[#ffffff]
 * 插件指令：>主菜单面板的动画转场 : 离开主菜单-淡出淡入动画 : 修改时长[48]
 * 插件指令：>主菜单面板的动画转场 : 离开主菜单-淡出淡入动画 : 恢复默认
 * 
 * 1.淡出动画 是指游戏画面变成纯色幕布，淡入动画 是指纯色幕布变回游戏画面。
 *   插件指令写"淡出淡入动画"或"淡入淡出动画"都可以，表示意思一样。
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
 *              菜单界面中，平均消耗为：【5ms以下】
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
 * @param 进入主菜单-是否开启淡出淡入
 * @parent ---淡出淡入动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 * @param 进入主菜单-淡出淡入颜色
 * @parent ---淡出淡入动画---
 * @desc 从地图界面进入到菜单界面时，淡出淡入的颜色。
 * @default #000000
 * 
 * @param 进入主菜单-淡出淡入时长
 * @parent ---淡出淡入动画---
 * @type number
 * @min 1
 * @desc 进入主菜单时，播放淡出淡入动画的时长。
 * @default 15
 * 
 * 
 * @param 离开主菜单-是否开启淡出淡入
 * @parent ---淡出淡入动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 * 
 * @param 离开主菜单-淡出淡入颜色
 * @parent ---淡出淡入动画---
 * @desc 从菜单界面回到地图界面时，淡出淡入的颜色。
 * @default #000000
 * 
 * @param 离开主菜单-淡出淡入时长
 * @parent ---淡出淡入动画---
 * @type number
 * @min 1
 * @desc 离开主菜单时，播放淡出淡入动画的时长。
 * @default 15
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MMCut（Menu_Main_Cutscenes）
//		临时全局变量	DrillUp.g_MMCut_xxx
//		临时局部变量	this._drill_MMCut_xxx
//		存储数据变量	$gameSystem._drill_MMCut_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	点开主菜单
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
//			->☆添加动画
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
	DrillUp.g_MMCut_PluginTip_curName = "Drill_MenuMainCutscenes.js 主菜单-主菜单面板的动画转场";
	DrillUp.g_MMCut_PluginTip_baseList = ["Drill_CoreOfCutscenes.js 系统-动画转场核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_MMCut_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_MMCut_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_MMCut_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_MMCut_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_MMCut_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuMainCutscenes = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MenuMainCutscenes');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_MMCut_fadeStart_enabled = String(DrillUp.parameters["进入主菜单-是否开启淡出淡入"] || "true") === "true";
	DrillUp.g_MMCut_fadeStart_color = String(DrillUp.parameters["进入主菜单-淡出淡入颜色"] || "#000000");
	DrillUp.g_MMCut_fadeStart_time = Number(DrillUp.parameters["进入主菜单-淡出淡入时长"] || 15);
	
	DrillUp.g_MMCut_fadeEnd_enabled = String(DrillUp.parameters["离开主菜单-是否开启淡出淡入"] || "true") === "true";
	DrillUp.g_MMCut_fadeEnd_color = String(DrillUp.parameters["离开主菜单-淡出淡入颜色"] || "#000000");
	DrillUp.g_MMCut_fadeEnd_time = Number(DrillUp.parameters["离开主菜单-淡出淡入时长"] || 15);
	
	
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
DrillUp.g_MMCut_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MMCut_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MMCut_sys_initialize.call(this);
	this.drill_MMCut_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MMCut_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MMCut_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MMCut_saveEnabled == true ){	
		$gameSystem.drill_MMCut_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MMCut_initSysData();
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
Game_System.prototype.drill_MMCut_initSysData = function() {
	this.drill_MMCut_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MMCut_checkSysData = function() {
	this.drill_MMCut_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MMCut_initSysData_Private = function() {
	
	// > 淡出淡入动画
	this._drill_MMCut_fadeStart_enabled = DrillUp.g_MMCut_fadeStart_enabled;
	this._drill_MMCut_fadeStart_color = DrillUp.g_MMCut_fadeStart_color;
	this._drill_MMCut_fadeStart_time = DrillUp.g_MMCut_fadeStart_time;
	
	this._drill_MMCut_fadeEnd_enabled = DrillUp.g_MMCut_fadeEnd_enabled;
	this._drill_MMCut_fadeEnd_color = DrillUp.g_MMCut_fadeEnd_color;
	this._drill_MMCut_fadeEnd_time = DrillUp.g_MMCut_fadeEnd_time;
	
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MMCut_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MMCut_fadeStart_enabled == undefined ){
		this.drill_MMCut_initSysData();
	}
	
};
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_MMCut_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MMCut_pluginCommand.call(this, command, args);
	if( command === ">主菜单面板的动画转场" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			
			/*-----------------转场设置------------------*/
			if( type == "进入主菜单-淡出淡入动画" || type == "进入主菜单-淡入淡出动画" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_MMCut_fadeStart_enabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_MMCut_fadeStart_enabled = false;
				}
				if( temp1.indexOf("修改颜色[") != -1 ){
					temp1 = temp1.replace("修改颜色[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MMCut_fadeStart_color = String(temp1);
				}
				if( temp1.indexOf("修改时长[") != -1 ){
					temp1 = temp1.replace("修改时长[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MMCut_fadeStart_time = Number(temp1);
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_MMCut_fadeStart_enabled = DrillUp.g_MMCut_fadeStart_enabled;
					$gameSystem._drill_MMCut_fadeStart_color = DrillUp.g_MMCut_fadeStart_color;
					$gameSystem._drill_MMCut_fadeStart_time = DrillUp.g_MMCut_fadeStart_time;
				}
			}
			if( type == "离开主菜单-淡出淡入动画" || type == "离开主菜单-淡入淡出动画" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_MMCut_fadeEnd_enabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_MMCut_fadeEnd_enabled = false;
				}
				if( temp1.indexOf("修改颜色[") != -1 ){
					temp1 = temp1.replace("修改颜色[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MMCut_fadeEnd_color = String(temp1);
				}
				if( temp1.indexOf("修改时长[") != -1 ){
					temp1 = temp1.replace("修改时长[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MMCut_fadeEnd_time = Number(temp1);
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_MMCut_fadeEnd_enabled = DrillUp.g_MMCut_fadeEnd_enabled;
					$gameSystem._drill_MMCut_fadeEnd_color = DrillUp.g_MMCut_fadeEnd_color;
					$gameSystem._drill_MMCut_fadeEnd_time = DrillUp.g_MMCut_fadeEnd_time;
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
var _drill_MMCut_COCut_setFadeData = Scene_Base.prototype.drill_COCut_setFadeData;
Scene_Base.prototype.drill_COCut_setFadeData = function( cur_sceneName, tar_sceneName, fade_type, is_white ){
	_drill_MMCut_COCut_setFadeData.call( this, cur_sceneName, tar_sceneName, fade_type, is_white );
	
	// > 执行淡出（地图界面 -> 主菜单界面）
	if( cur_sceneName == "Scene_Map" &&
		tar_sceneName == "Scene_Menu" &&
		fade_type == "淡出" ){
		
		// > 关闭动画时
		if( $gameSystem._drill_MMCut_fadeStart_enabled == false ){
			this.drill_COCut_submitFade( false );
			
		// > 开启动画时
		}else{
			this.drill_COCut_setFadeColor( $gameSystem._drill_MMCut_fadeStart_color );
			this.drill_COCut_setFadeTime( $gameSystem._drill_MMCut_fadeStart_time );
			this.drill_COCut_submitFade( true );
		}
		return;
	}
	
	// > 执行淡入（地图界面 -> 主菜单界面）
	if( cur_sceneName == "Scene_Map" &&
		tar_sceneName == "Scene_Menu" &&
		fade_type == "淡入" ){
		
		// > 关闭动画时
		if( $gameSystem._drill_MMCut_fadeStart_enabled == false ){
			this.drill_COCut_submitFade( false );
			
		// > 开启动画时
		}else{
			this.drill_COCut_setFadeColor( $gameSystem._drill_MMCut_fadeStart_color );
			this.drill_COCut_setFadeTime( $gameSystem._drill_MMCut_fadeStart_time );
			this.drill_COCut_submitFade( true );
		}
		return;
	}
	
	
	// > 执行淡出（主菜单界面 -> 地图界面）
	if( cur_sceneName == "Scene_Menu" &&
		tar_sceneName == "Scene_Map" &&
		fade_type == "淡出" ){
		
		// > 关闭动画时
		if( $gameSystem._drill_MMCut_fadeEnd_enabled == false ){
			this.drill_COCut_submitFade( false );
			
		// > 开启动画时
		}else{
			this.drill_COCut_setFadeColor( $gameSystem._drill_MMCut_fadeEnd_color );
			this.drill_COCut_setFadeTime( $gameSystem._drill_MMCut_fadeEnd_time );
			this.drill_COCut_submitFade( true );
		}
		return;
	}
	
	// > 执行淡入（主菜单界面 -> 地图界面）
	if( cur_sceneName == "Scene_Menu" &&
		tar_sceneName == "Scene_Map" &&
		fade_type == "淡入" ){
		
		// > 关闭动画时
		if( $gameSystem._drill_MMCut_fadeEnd_enabled == false ){
			this.drill_COCut_submitFade( false );
			
		// > 开启动画时
		}else{
			this.drill_COCut_setFadeColor( $gameSystem._drill_MMCut_fadeEnd_color );
			this.drill_COCut_setFadeTime( $gameSystem._drill_MMCut_fadeEnd_time );
			this.drill_COCut_submitFade( true );
		}
		return;
	}
}


//=============================================================================
// ** ☆添加动画
//
//			说明：	> 此模块控制 主菜单界面 强制加淡出淡入动画。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 添加动画 - 地图界面 判断淡入
//
//			说明：	> 从其他界面 回到 地图界面时，需要播放 淡入动画的，在此函数标记。
//==============================
var _drill_MMCut_map_needsFadeIn = Scene_Map.prototype.needsFadeIn;
Scene_Map.prototype.needsFadeIn = function() {
	
	if( SceneManager.isPreviousScene(Scene_Menu) ){ return true; }
	
	// > 原函数
	return _drill_MMCut_map_needsFadeIn.call(this);
};
//==============================
// * 添加动画 - 地图界面 结束运行
//==============================
var _drill_MMCut_map_stop = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function() {
	_drill_MMCut_map_stop.call(this);
	
	if( SceneManager.isNextScene(Scene_Menu) ){
		this.startFadeOut(this.fadeSpeed());
	}
};

//==============================
// * 添加动画 - 主菜单界面 开始运行
//==============================
var _drill_MMCut_menu_start = Scene_Menu.prototype.start;
Scene_Menu.prototype.start = function() {
	_drill_MMCut_menu_start.call(this);
	
	if( SceneManager.isPreviousScene(Scene_Map) ){
		this.startFadeIn(this.fadeSpeed(), false);
	}
};
//==============================
// * 添加动画 - 主菜单界面 结束运行
//
//			说明：	> 主菜单面板中，执行不到 Scene_Menu.prototype.stop 函数。
//==============================
var _drill_MMCut_menu_popScene = Scene_Menu.prototype.popScene;
Scene_Menu.prototype.popScene = function() {
	_drill_MMCut_menu_popScene.call(this);
	
	if( SceneManager.isNextScene(Scene_Map) ){
		this.startFadeOut(this.fadeSpeed());
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MenuMainCutscenes = false;
		var pluginTip = DrillUp.drill_MMCut_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


