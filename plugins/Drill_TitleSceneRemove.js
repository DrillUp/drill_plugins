//=============================================================================
// Drill_TitleSceneRemove.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        标题 - 去掉标题界面
 * @author Drill_up
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_TitleSceneRemove +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在进入游戏后直接进入地图界面，而不经过标题界面。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 可被扩展：
 *   - Drill_CoreOfGlobalSave       管理器-全局存储核心
 *     该核心可加也可不加，加了能支持插件指令"恢复进入标题界面的渠道"的设置。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于标题界面。
 * 去掉标题界面：
 *   (1.如果你的游戏一开始就不想要标题界面，可以在参数中设置直接
 *      去掉标题界面。
 *   (2.去掉界面后，将切断下面三个路线：
 *      启动界面 -> 标题界面 -> 新游戏
 *      游戏结束界面 -> 标题界面 -> 退出游戏
 *      游戏失败界面 -> 标题界面 -> 新游戏
 *   (3.你需要去 数据库>用语 中修改"回到标题"的字符串。 
 * 设计：
 *   (1.如果你的游戏一开始就不想要标题界面，可以在参数中设置直接
 *      去掉标题界面。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制：
 * 
 * 插件指令：>去掉标题界面 : 去掉标题界面的进入渠道
 * 插件指令：>去掉标题界面 : 恢复标题界面的进入渠道
 * 
 * 1.插件指令需要添加 全局存储核心 才能使用。
 *   你可以在游戏中随意切换 是否可进入标题界面 。
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
 * 测试方法：   在标题界面中测试性能。
 * 测试结果：   菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只单次执行，所以几乎没有消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param 默认是否去掉标题界面
 * @type boolean
 * @on 去掉
 * @off 保留
 * @desc true - 去掉，false - 保留，进入游戏后，不会进入标题界面。
 * @default false
 * 
 * @param 全局存储的文件路径
 * @type number
 * @min 1
 * @desc 若没加全局存储核心插件，则此设置没有效果。 该设置对应文件路径ID，具体去 全局存储核心 看看。
 * @default 1
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		TSRe (Title_Scene)
//		临时全局变量	DrillUp.g_TSRe_xxx
//		临时局部变量	this._drill_TSRe_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.g_TSRe_removeEnabled
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	在标题界面中测试
//		★性能测试消耗	2025/4/30：
//							》未找到，单次执行太快。
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆全局存储
//			
//			->☆去掉标题界面
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
//			1. 2025/3/15：用的时候才发现，这个插件功能干嘛要和标题界面合在一个插件里。
//				其它小工程用起来很麻烦，所以就分离出来了。
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
	DrillUp.g_TSRe_PluginTip_curName = "Drill_TitleSceneRemove.js 标题-去掉标题界面";
	DrillUp.g_TSRe_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_TitleSceneRemove = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleSceneRemove');
	
	
	/*----------------杂项-----------------*/
	DrillUp.g_TSRe_defaultRemoveEnabled = String(DrillUp.parameters["默认是否去掉标题界面"] || "false") === "true";
    DrillUp.g_TSRe_dataFileId = Number(DrillUp.parameters["全局存储的文件路径"] || 1);
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_TSRe_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_TSRe_pluginCommand.call(this, command, args);
	this.drill_TSRe_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_TSRe_pluginCommand = function( command, args ){
	if( command === ">去掉标题界面" ){
		
		if( args.length == 2 ){
			if( Imported.Drill_CoreOfGlobalSave ){
				var type = String(args[1]);
				if( type === "去掉标题界面的进入渠道" ){
					DrillUp.g_TSRe_removeEnabled = true;
					StorageManager.drill_TSRe_saveData();
				}
				if( type === "恢复标题界面的进入渠道" ){
					DrillUp.g_TSRe_removeEnabled = false;
					StorageManager.drill_TSRe_saveData();
				}
			}
		}
	}
};


//=============================================================================
// ** ☆全局存储
//=============================================================================
if( Imported.Drill_CoreOfGlobalSave ){
	
	//==============================
	// * 全局 - 读取
	//
	//			说明：	这里全局存储的是单一固定数据，不需要数据检查。
	//==============================
		var global_fileId = DrillUp.g_TSRe_dataFileId;
		var global_data = StorageManager.drill_COGS_loadData( global_fileId, "TSRe" );
		
		// > 布局样式ID
		if( DrillUp.g_TSRe_removeEnabled == null ){			//（游戏没关时，不会为null)
			var data = global_data["global_removeEnabled"];
			if( data == undefined ){ data = DrillUp.g_TSRe_defaultRemoveEnabled };
			DrillUp.g_TSRe_removeEnabled = data;
		}
		
	//==============================
	// * 全局 - 存储
	//==============================
	StorageManager.drill_TSRe_saveData = function(){
		var file_id = DrillUp.g_TSRe_dataFileId;
		var data = {};
		data["global_removeEnabled"] = DrillUp.g_TSRe_removeEnabled;
		this.drill_COGS_saveData( file_id, "TSRe", data );
	};
}


//=============================================================================
// ** ☆去掉标题界面
//
//			说明：	> 该模块将对 去掉标题界面 进行专门管理。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 去掉标题界面 - 标记 - 启动界面 的跳转
//==============================
var _drill_TSRe_boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	DataManager._drill_TSRe_in_boot = true;
	_drill_TSRe_boot_start.call(this);
};
//==============================
// * 去掉标题界面 - 标记 - 游戏结束界面 的跳转
//==============================
var _drill_TSRe_gameEnd_toTitle = Scene_GameEnd.prototype.commandToTitle;
Scene_GameEnd.prototype.commandToTitle = function() {
	DataManager._drill_TSRe_in_gameEnd = true;
    _drill_TSRe_gameEnd_toTitle.call(this);
};
//==============================
// * 去掉标题界面 - 标记 - 游戏失败界面 的跳转
//==============================
var _drill_TSRe_gameover_toTitle = Scene_Gameover.prototype.gotoTitle;
Scene_Gameover.prototype.gotoTitle = function() {
	DataManager._drill_TSRe_in_gameover = true;
    _drill_TSRe_gameover_toTitle.call(this);
};
//==============================
// * 去掉标题界面 - 场景跳转限制
//==============================
var _drill_TSRe_boot_goto = SceneManager.goto;
SceneManager.goto = function( sceneClass ){
	
	var enabled = DrillUp.g_TSRe_removeEnabled;
	if( enabled == undefined ){
		enabled = DrillUp.g_TSRe_defaultRemoveEnabled;
	}
	if( enabled == true ){
		
		// > 从启动界面到标题
		if( DataManager._drill_TSRe_in_boot == true && DataManager._drill_TBS_in_boot !== true && sceneClass == Scene_Title ){
			DataManager._drill_TSRe_in_boot = false;
			
			DataManager.setupNewGame();
			SceneManager.goto(Scene_Map);
			return;
		}
		// > 从游戏结束界面到标题
		if( DataManager._drill_TSRe_in_gameEnd == true && sceneClass == Scene_Title ){
			DataManager._drill_TSRe_in_gameEnd = false;
			
			SceneManager.exit();
			return;
		}
		// > 从游戏失败界面到标题
		if( DataManager._drill_TSRe_in_gameover == true && sceneClass == Scene_Title ){
			DataManager._drill_TSRe_in_gameover = false;
			
			DataManager.setupNewGame();
			SceneManager.goto(Scene_Map);
			return;
		}
	}
	
	// > 原函数
	_drill_TSRe_boot_goto.call(this, sceneClass);
}


