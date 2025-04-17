//=============================================================================
// Drill_PlayerFollowerManage.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        互动 - 玩家队员管理
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PlayerFollowerManage +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件专门管理跟随玩家的队员。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于玩家、玩家队员。
 * 细节：
 *   (1."角色队伍"指战斗界面中参加战斗的队伍。
 *      "玩家队员"指地图界面中跟随玩家的行走图。
 *      二者有一一对应的关系，但在细微定义上有些不一样。
 * 设计：
 *   (1.你可以修改"自定义队员显示数量"，以防止战斗角色成员过多时，
 *      玩家队员的队伍拖的太长不好看。
 *   (2.你可以修改 队员间隔距离，用于大行走图的情况，
 *      比如在动画序列小房间的二方向行走图，能让挤在一起的队伍变宽一点。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制开关：
 * 
 * 插件指令：>玩家队员管理 : 显示玩家队员
 * 插件指令：>玩家队员管理 : 隐藏玩家队员
 * 插件指令：>玩家队员管理 : 集合玩家队员
 * 
 * 1."显示/隐藏"的插件指令直接对应事件指令"人物 > 更改队列行进"的开关功能。
 *   另外，系统>选项>队列行进 为游戏初始时 是否显示玩家队员 的配置。
 * 2."集合玩家队员"的插件指令直接对应事件指令"人物 > 集合队列成员"的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 显示设置
 * 你可以通过插件指令手动控制开关：
 * 
 * 插件指令：>玩家队员管理 : 修改显示设置 : 与角色队伍数量一致
 * 插件指令：>玩家队员管理 : 修改显示设置 : 自定义队员显示数量[2]
 * 
 * 1."角色队伍"指战斗界面中参加战斗的队伍。
 *   "玩家队员"指地图界面中跟随玩家的行走图。
 * 2."自定义队员显示数量[2]"表示玩家队员最大显示2个人，
 *   加上玩家一共显示3人。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 队员间隔距离
 * 你可以通过插件指令手动控制开关：
 * 
 * 插件指令：>玩家队员管理 : 修改队员间隔距离 : 距离[1]
 * 
 * 1.默认间隔距离为1，单位图块。
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
 * 时间复杂度： o(n) 每帧
 * 测试方法：   去允许操作管理层进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param 显示设置 
 * @type select
 * @option 与角色队伍数量一致
 * @value 与角色队伍数量一致
 * @option 自定义队员显示数量
 * @value 自定义队员显示数量
 * @desc 玩家队员的显示设置模式。
 * @default 自定义队员显示数量
 * 
 * @param 自定义队员显示数量
 * @parent 显示设置
 * @type number
 * @min 1
 * @desc 如果显示设置为"自定义队员显示数量"，玩家队员显示的数量。注意玩家队员不包括玩家自己。
 * @default 7
 * 
 * @param 队员间隔距离
 * @type number
 * @min 1
 * @desc 玩家队员之间的间隔距离，单位图块。
 * @default 1
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PFM (Player_Follower_Manage)
//		临时全局变量	DrillUp.g_PFM_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	机关管理层
//		★性能测试消耗	消耗太低，暂时没找到
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
//			->☆管辖权
//			->☆插件指令
//			->☆存储数据
//			
//			->☆队员跟随
//			->☆队员显示
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
	DrillUp.g_PFM_PluginTip_curName = "Drill_PlayerFollowerManage.js 互动-玩家队员管理";
	DrillUp.g_PFM_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PlayerFollowerManage = true;
	var DrillUp = DrillUp || {};
	DrillUp.parameters = PluginManager.parameters('Drill_PlayerFollowerManage');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PFM_visibleType = String(DrillUp.parameters["显示设置"] || "与角色队伍数量一致"); 
	DrillUp.g_PFM_visibleCount = Number(DrillUp.parameters["自定义队员显示数量"] || 7); 
	DrillUp.g_PFM_distance = Number(DrillUp.parameters["队员间隔距离"] || 1); 
	
	
//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 玩家队员『玩家队员管理』 - 是否可见
//
//			说明：	> 单独的玩家队员不控制可见，由 玩家队员组 统一控制。
//==============================
Game_Follower.prototype.isVisible = function(){
    return this.actor() && $gamePlayer.followers().isVisible();
};
//==============================
// * 玩家队员『玩家队员管理』 - 跟随物体
//==============================
Game_Follower.prototype.chaseCharacter = function( character ){
    var sx = this.deltaXFrom(character.x);
    var sy = this.deltaYFrom(character.y);
    if( sx !== 0 && sy !== 0 ){
        this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
    }else if( sx !== 0 ){
        this.moveStraight(sx > 0 ? 4 : 6);
    }else if( sy !== 0 ){
        this.moveStraight(sy > 0 ? 8 : 2);
    }
    this.setMoveSpeed($gamePlayer.realMoveSpeed());
};
*/
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PFM_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PFM_pluginCommand.call(this, command, args);
	this.drill_PFM_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PFM_pluginCommand = function( command, args ){
	if( command === ">玩家队员管理" ){
		
		/*-----------------事件指令------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示玩家队员" ){
				$gamePlayer.showFollowers();
				$gamePlayer.refresh();	//（刷新显示情况）
			}
			if( type == "隐藏玩家队员" ){
				$gamePlayer.hideFollowers();
				$gamePlayer.refresh();	//（刷新显示情况）
			}
			if( type == "集合玩家队员" ){
				this.command217();
			}
		}
		
		/*-----------------显示设置------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改显示设置" ){
				if( temp1 == "与角色队伍数量一致" ){
					$gameSystem._drill_PFM_visibleType = temp1;
					$gamePlayer.refresh();	//（刷新显示情况）
				}
				if( temp1.indexOf("自定义队员显示数量[") != -1 ){
					temp1 = temp1.replace("自定义队员显示数量[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_PFM_visibleType = "自定义队员显示数量";
					$gameSystem._drill_PFM_visibleCount = Number( temp1 );
					$gamePlayer.refresh();	//（刷新显示情况）
				}
			}
		}
		
		/*-----------------队员间隔距离------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改队员间隔距离" ){
				temp1 = temp1.replace("距离[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_PFM_distance = Number( temp1 );
			}
		}
	}
};
	
	
//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_PFM_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PFM_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PFM_sys_initialize.call(this);
	this.drill_PFM_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PFM_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PFM_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PFM_saveEnabled == true ){	
		$gameSystem.drill_PFM_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PFM_initSysData();
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
Game_System.prototype.drill_PFM_initSysData = function() {
	this.drill_PFM_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PFM_checkSysData = function() {
	this.drill_PFM_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PFM_initSysData_Private = function() {
	
	this._drill_PFM_visibleType = DrillUp.g_PFM_visibleType;
	this._drill_PFM_visibleCount = DrillUp.g_PFM_visibleCount;
	this._drill_PFM_distance = DrillUp.g_PFM_distance;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PFM_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PFM_distance == undefined ){
		this.drill_PFM_initSysData();
	}
};
	
	
//=============================================================================
// ** ☆队员显示
//
//			说明：	> 此模块专门管理 玩家队员显示 控制功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 队员显示 - 是否可见
//==============================
var _drill_PFM_isVisible = Game_Follower.prototype.isVisible;
Game_Follower.prototype.isVisible = function(){
	
	// > 自定义数量时，索引超过数量则不可见
	if( $gameSystem._drill_PFM_visibleType == "自定义队员显示数量" ){
		if( this._memberIndex > $gameSystem._drill_PFM_visibleCount ){ return false; }
	}
	
	// > 原函数
	return _drill_PFM_isVisible.call(this);
};
	
	
//=============================================================================
// ** ☆队员跟随
//
//			说明：	> 此模块专门管理 玩家队员跟随 控制功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 队员跟随 - 跟随物体（半覆写）
//==============================
var _drill_PFM_chaseCharacter = Game_Follower.prototype.chaseCharacter;
Game_Follower.prototype.chaseCharacter = function( character ){
	
	// > 设定距离<=1时
	if( $gameSystem._drill_PFM_distance <= 1 ){
		
		// > 原函数
		_drill_PFM_chaseCharacter.call( this, character );
		return;
	}
	
	// > 移动速度同步【物体 - 移动速度】
	if( Imported.Drill_MoveSpeed ){		
		var speed = $gamePlayer.drill_MS_getRealASpeed();
		this.drill_MS_setASpeed( speed );
	}
	
	// > 设定距离>1时
	var sx = this.deltaXFrom(character.x);
	var sy = this.deltaYFrom(character.y);
	if( sx == 0 && sy == 0 ){ return; }			//在玩家位置时，不操作
	
	if( Math.abs(sx) + Math.abs(sy) >= $gameSystem._drill_PFM_distance ){
		this.moveTowardCharacter(character);	//接近玩家
	}else{
		this.turnTowardCharacter(character);	//面向玩家
	}
};

	