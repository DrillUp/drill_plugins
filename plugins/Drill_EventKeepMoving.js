//=============================================================================
// Drill_EventKeepMoving.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        物体 - 镜头外事件保持移动
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventKeepMoving +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得事件离开镜头非常远的位置，仍然保持移动路线走动。
 * 原设定的事件离开镜头一定距离后，会一直站住不动。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件。
 * 细节：
 *   (1.你如果设置了会随机移动的人物，那么需要考虑他们随机走动时可能会触发
 *      重力开关等的特殊情况。
 *   (2.原设定的事件，出了视野就暂停，这是考虑到性能才做的优化。
 *      如果关闭该功能，性能消耗会少一些。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过地图备注或插件指令控制：
 * 
 * 地图备注：=>镜头外事件保持移动:临时锁定:开启
 * 地图备注：=>镜头外事件保持移动:临时锁定:关闭
 * 
 * 插件指令：>镜头外事件保持移动 : 开启
 * 插件指令：>镜头外事件保持移动 : 关闭
 * 
 * 1.插件指令修改后，将会对所有默认的地图有效，但不包括 临时锁定 的地图。
 * 2.添加"临时锁定"地图备注后，当前地图的将会固定永久处于 事件保持移动 状态。
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
 * 时间复杂度： o(n)*o(移动路线) 每帧
 * 测试方法：   去地图管理层，建立一堆上方图块的围栏。
 * 测试结果：   200个事件的地图中，消耗为：【26.10ms】
 *              100个事件的地图中，消耗为：【15.61ms】
 *               50个事件的地图中，消耗为：【8.28ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.原设定的事件，出了视野就暂停，这是考虑到性能才做的优化。
 *   如果关闭该插件，性能消耗会少一些。
 * 3.从理论上来说，不移动的事件的确能优化性能。
 *   但从实际性能角度来说，很难界定消耗是否真的减少了。
 *   试验中测试了6组数据，开与不开的事件消耗波动都很大，每次测出
 *   的平均值也不稳定。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件性能测试说明。
 * [v1.2]
 * 添加了 插件指令和地图备注 功能。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * @param 初始是否开启保持移动功能
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，你可以通过插件指令或者地图备注后续修改该功能开关。
 * @default true
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EKM（Event_Keep_Moving）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(移动路线) 每帧
//		★性能测试因素	地图管理层跑步
//		★性能测试消耗	与不开该插件估算得出
//		★最坏情况		无	
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			保持移动：
//				->覆写判定
//				->性能测试（结果找不准）
//
//		★必要注意事项：
//			暂无。
//			
//		★其它说明细节：
//			1.可以覆写isNearTheScreen。
//			  目前没有任何插件用到这个函数，也就是说并没有优化设置，可以放心覆写。
//			2.该插件节约了多少性能无法界定，因为找不到……
//
//		★存在的问题：
//			暂无
//		
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventKeepMoving = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventKeepMoving');


	/*-----------------杂项------------------*/
	DrillUp.g_EKM_enabled = String(DrillUp.parameters["初始是否开启保持移动功能"] || "true") == "true" ;
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_EKM_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EKM_pluginCommand.call(this, command, args);
	if( command === ">镜头外事件保持移动" ){
		if(args.length == 2){				//>镜头外事件保持移动 : 关闭
			var type = String(args[1]);
			if( type == "开启" ){
				$gameSystem._drill_EKM_enable = true;
			}
			if( type == "关闭" ){
				$gameSystem._drill_EKM_enable = false;
			}
		}
	}
}


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_EKM_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EKM_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EKM_sys_initialize.call(this);
	this.drill_EKM_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EKM_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EKM_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EKM_saveEnabled == true ){	
		$gameSystem.drill_EKM_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EKM_initSysData();
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
Game_System.prototype.drill_EKM_initSysData = function() {
	this.drill_EKM_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EKM_checkSysData = function() {
	this.drill_EKM_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EKM_initSysData_Private = function() {
	
	this._drill_EKM_enable = DrillUp.g_EKM_enabled;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EKM_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EKM_enable == undefined ){
		this.drill_EKM_initSysData();
	}
	
};


//=============================================================================
// ** 地图备注
//=============================================================================
var _drill_EKM_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_EKM_map_setup.call(this, mapId);
	this.drill_EKM_setupMapNote();
};
Game_Map.prototype.drill_EKM_setupMapNote = function() {
	
	// > 初始设置
	this._drill_EKM_enableMoving = $gameSystem._drill_EKM_enable;
	
	$dataMap.note.split(/[\r\n]+/).forEach(function(note) {
		var args = note.split(':');
		var command = args.shift();
		if( command == "=>镜头外事件保持移动"){
			if(args.length == 2){
				var temp1 = String(args[0]);
				var temp2 = String(args[1]);
				if( temp1 == "临时锁定"){
					if( temp2 == "开启"){
						this._drill_EKM_enableMoving = true;
					}
					if( temp2 == "关闭"){
						this._drill_EKM_enableMoving = false;
					}
				}
			}
		}
	},this);
};

//=============================================================================
// ** 事件接近检测
//=============================================================================
var _drill_EKM_isNearTheScreen = Game_CharacterBase.prototype.isNearTheScreen;
Game_CharacterBase.prototype.isNearTheScreen = function() {
	if( $gameMap._drill_EKM_enableMoving === true ){
		return true;
	}
	return _drill_EKM_isNearTheScreen.call(this);
	
    //var gw = Graphics.width;
    //var gh = Graphics.height;
    //var tw = $gameMap.tileWidth();
    //var th = $gameMap.tileHeight();
    //var px = this.scrolledX() * tw + tw / 2 - gw / 2;
    //var py = this.scrolledY() * th + th / 2 - gh / 2;
    //return px >= -gw && px <= gw && py >= -gh && py <= gh;
};


