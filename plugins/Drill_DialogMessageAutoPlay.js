//=============================================================================
// Drill_DialogMessageAutoPlay.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        对话框 - 对话自动播放
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogMessageAutoPlay +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以开启对话框自动播放的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfDialog         对话框-对话框优化核心
 * 可作用于：
 *   - Drill_DialogArrow          对话框-对话框小箭头★★v1.4及以上★★
 *     对话框开启自动播放时，可以顺带自动切换对话框小箭头样式。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只作用于 对话框 。
 * 自动播放：
 *   (1.对话框的自动播放介绍，可以去看看文档：
 *      "15.对话框 > 关于对话框优化核心.docx"。
 *   (2.插件提供自动播放功能，等一段时间后，自动进入下一页对话。
 *      自动播放时，还可以顺带切换对话框小箭头样式，表示正在自动播放。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改设置：
 * 
 * 插件指令：>对话自动播放 : 自动播放开关 : 启用
 * 插件指令：>对话自动播放 : 自动播放开关 : 关闭
 * 插件指令：>对话自动播放 : 自动播放开关 : 恢复默认
 * 插件指令：>对话自动播放 : 修改延迟时间 : 时间[120]
 * 插件指令：>对话自动播放 : 修改延迟时间 : 恢复默认
 * 
 * 插件指令：>对话自动播放 : 小箭头开关 : 启用
 * 插件指令：>对话自动播放 : 小箭头开关 : 关闭
 * 插件指令：>对话自动播放 : 小箭头开关 : 恢复默认
 * 插件指令：>对话自动播放 : 修改小箭头样式 : 样式[2]
 * 插件指令：>对话自动播放 : 修改小箭头样式 : 恢复默认
 * 
 * 1.插件提供自动播放功能，等一段时间后，自动进入下一页对话。
 *   自动播放时，还可以顺带切换对话框小箭头样式，表示正在自动播放。
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
 * 时间复杂度： o(n)
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只监听对话框的状态，并帮助玩家自动按确定键，消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param 初始是否启用
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 启用 - true，关闭 - false。
 * @default false
 * 
 * @param 自动播放延迟时间
 * @type number
 * @min 0
 * @desc 对话框播放完全部内容后，跳转到下一页的延迟时间。（1秒60帧）
 * @default 90
 * 
 * @param 自动播放时是否切换小箭头
 * @type boolean
 * @on 启用切换
 * @off 关闭
 * @desc 启用切换 - true，关闭 - false。
 * @default true
 * 
 * @param 切换的小箭头样式
 * @parent 自动播放时是否切换小箭头
 * @type number
 * @min 0
 * @desc 切换的小箭头样式。对应的对话框小箭头，0表示默认的小箭头。
 * @default 0
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		DMAP（Dialog_Message_Auto_Play）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	对话框管理层
//		★性能测试消耗	2026/4/25：
//							》未找到，消耗太小。
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
//			->☆存储数据
//			
//			->☆对话自动播放控制
//			->☆小箭头控制
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
//			无
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
	DrillUp.g_DMAP_PluginTip_curName = "Drill_DialogMessageAutoPlay.js 对话框-对话自动播放";
	DrillUp.g_DMAP_PluginTip_baseList = ["Drill_CoreOfDialog.js 对话框-对话框优化核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DMAP_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DMAP_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DMAP_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DMAP_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DMAP_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogMessageAutoPlay = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogMessageAutoPlay');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DMAP_autoPlayEnabled = String(DrillUp.parameters["初始是否启用"] || "true") == "true"; 
	DrillUp.g_DMAP_autoPlayDelay = Number(DrillUp.parameters["自动播放延迟时间"] || 120); 
	
	DrillUp.g_DMAP_arrowEnabled = String(DrillUp.parameters["自动播放时是否切换小箭头"] || "true") == "true"; 
	DrillUp.g_DMAP_arrowStyleId = Number(DrillUp.parameters["切换的小箭头样式"] || 1); 
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfDialog ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DMAP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
    _drill_DMAP_pluginCommand.call(this, command, args);
	this.drill_DMAP_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DMAP_pluginCommand = function( command, args ){
    if( command === ">对话自动播放" ){
        if( args.length == 4 ){
            var type = String(args[1]);
            var temp1 = String(args[3]);
            if( type == "自动播放开关" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_DMAP_autoPlayEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_DMAP_autoPlayEnabled = false;
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_DMAP_autoPlayEnabled = DrillUp.g_DMAP_autoPlayEnabled;
				}
			}
            if( type == "修改延迟时间" ){
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_DMAP_autoPlayDelay = DrillUp.g_DMAP_autoPlayDelay;
				}else{
					temp1 = temp1.replace("时间[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DMAP_autoPlayDelay = Number(temp1);
				}
			}
			
            if( type == "小箭头开关" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_DMAP_arrowEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_DMAP_arrowEnabled = false;
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_DMAP_arrowEnabled = DrillUp.g_DMAP_arrowEnabled;
				}
			}
            if( type == "修改小箭头样式" ){
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_DMAP_arrowStyleId = DrillUp.g_DMAP_arrowStyleId;
				}else{
					temp1 = temp1.replace("时间[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DMAP_arrowStyleId = Number(temp1);
				}
			}
        }
    }
}
	
	
//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DMAP_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DMAP_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DMAP_sys_initialize.call(this);
	this.drill_DMAP_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DMAP_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DMAP_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DMAP_saveEnabled == true ){	
		$gameSystem.drill_DMAP_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DMAP_initSysData();
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
Game_System.prototype.drill_DMAP_initSysData = function() {
	this.drill_DMAP_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DMAP_checkSysData = function() {
	this.drill_DMAP_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DMAP_initSysData_Private = function() {
	
	this._drill_DMAP_autoPlayEnabled = DrillUp.g_DMAP_autoPlayEnabled;
	this._drill_DMAP_autoPlayDelay = DrillUp.g_DMAP_autoPlayDelay;
	
	this._drill_DMAP_arrowEnabled = DrillUp.g_DMAP_arrowEnabled;
	this._drill_DMAP_arrowStyleId = DrillUp.g_DMAP_arrowStyleId;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DMAP_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DMAP_autoPlayEnabled == undefined ){
		this.drill_DMAP_initSysData();
	}
};



//=============================================================================
// ** ☆对话自动播放控制
//
//			说明：	> 此模块提供 自动播放 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//=============================
// * 对话自动播放控制 - 执行新建页
//=============================
var _drill_DMAP_CODi_message_newPage = Window_Message.prototype.drill_CODi_message_newPage;
Window_Message.prototype.drill_CODi_message_newPage = function() {
	_drill_DMAP_CODi_message_newPage.call(this);
	this._drill_DMAP_curTime = 0;	//计时器（新建页时重新计时）
}
//=============================
// * 对话自动播放控制 - 帧刷新
//=============================
var _drill_DMAP_CODi_message_updatePage = Window_Message.prototype.drill_CODi_message_updatePage;
Window_Message.prototype.drill_CODi_message_updatePage = function() {
	_drill_DMAP_CODi_message_updatePage.call(this);
	
	// > 自动播放开关 开启时
	if( $gameSystem._drill_DMAP_autoPlayEnabled == true ){
		
		// > 计时器监听
		//		（单独对话框时，才自动播放；对话框+子窗口时，不能自动播放）
		if( this.drill_CODi_message_isPageWaitingInput() == true &&
			this.isAnySubWindowActive() != true ){
			
			this._drill_DMAP_curTime += 1;
			if( this._drill_DMAP_curTime >= $gameSystem._drill_DMAP_autoPlayDelay ){
				this._drill_CODi_message_curPagePlaying = false;	//（结束当前页，进入下一页）
			}
		}
	}
}


//=============================================================================
// ** ☆小箭头控制
//
//			说明：	> 此模块提供 小箭头样式切换。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 小箭头控制 - 最后继承1级
//==============================
var _drill_DMAP_scene_initialize1 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_DMAP_scene_initialize1.call(this);
	
	if( Imported.Drill_DialogArrow ){
		
		//=============================
		// * 小箭头控制 - 执行新建页
		//=============================
		var _drill_DMAP_DAr_getCurStyleId = Game_System.prototype.drill_DAr_getCurStyleId;
		Game_System.prototype.drill_DAr_getCurStyleId = function() {
			
			// > 自动播放开关 开启时
			if( this._drill_DMAP_autoPlayEnabled == true ){
				
				// > 小箭头开关 开启时
				if( this._drill_DMAP_arrowEnabled == true ){
					return this._drill_DMAP_arrowStyleId;
				}
			}
			
			// > 原函数
			return _drill_DMAP_DAr_getCurStyleId.call(this);
		}
		
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogMessageAutoPlay = false;
		var pluginTip = DrillUp.drill_DMAP_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

