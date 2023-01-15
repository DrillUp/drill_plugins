//=============================================================================
// Drill_LayerWallBlock.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        图块 - 墙壁阻塞器
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_LayerWallBlock +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得在你可以设置墙顶的天花板无法通行，或者无法跳跃翻越。
 * ★★如果有 事件跳跃 插件，该插件需要放在跳跃插件后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也可以作用于其他插件。
 * 可作用于：
 *   - Drill_EventJump              物体-事件跳跃
 *     若有目标插件，则可以设置墙壁无法跳跃翻越。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于 图块设置 。
 * 细节：
 *   (1.图块A4为 墙壁图块，其中分为 墙壁和墙顶 。
 * 阻塞通行：
 *   (1.原墙顶（在屋内叫天花板）无法设置四通行。
 *      墙顶设置了不可通行后，玩家仍然可以在上面行走。
 *   (2.你可以通过插件的阻塞器强制阻止玩家通行。
 *      也可以不用插件，添加 透明墙 来阻止玩家行走。
 *      （透明墙可以看看示例中的图块E）
 * 禁止翻越：
 *   (1.你可以设置 墙面和墙顶图块 无法被翻越，节省R图块配置。
 *   (2.不使用该插件，通过 事件跳跃插件 配置禁跳区R图块，
 *      并将R图块涂在墙上，能达到一样禁止翻越的效果。
 * 设计：
 *   (1.墙壁阻塞器常用于室内墙壁和柱子。
 *      原墙顶由于其可通行，所以很多地方会有小问题。
 *      添加阻塞器后，就能够灵活制作 室内拱门、有高度差的平台 了。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过地图备注或插件指令控制：
 * 
 * 地图备注：=>墙壁阻塞器:临时锁定:开启墙顶阻塞
 * 地图备注：=>墙壁阻塞器:临时锁定:关闭墙顶阻塞
 * 
 * 插件指令：>墙壁阻塞器 : 开启墙顶阻塞
 * 插件指令：>墙壁阻塞器 : 关闭墙顶阻塞
 * 
 * 1.插件指令修改后，将会对所有默认的地图有效，但不包括 临时锁定 的地图。
 * 2.添加"临时锁定"地图备注后，当前地图的墙顶将会固定处于 阻塞/关闭 状态。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过地图备注或插件指令控制：
 * 
 * 地图备注：=>墙壁阻塞器:临时锁定:开启墙顶禁止翻越
 * 地图备注：=>墙壁阻塞器:临时锁定:关闭墙顶禁止翻越
 * 地图备注：=>墙壁阻塞器:临时锁定:开启墙面禁止翻越
 * 地图备注：=>墙壁阻塞器:临时锁定:关闭墙面禁止翻越
 * 
 * 插件指令：>墙壁阻塞器 : 开启墙顶禁止翻越
 * 插件指令：>墙壁阻塞器 : 关闭墙顶禁止翻越
 * 插件指令：>墙壁阻塞器 : 开启墙面禁止翻越
 * 插件指令：>墙壁阻塞器 : 关闭墙面禁止翻越
 * 
 * 1.插件指令修改后，将会对所有默认的地图有效，但不包括 临时锁定 的地图。
 * 2.添加"临时锁定"地图备注后，当前地图的墙顶/墙面将会固定处于 禁止翻越 状态。
 * 3.注意，"禁止翻越"不包括强制跳跃情况。
 *   因为默认的强制跳跃指令，连地图都可以跳出到外界。
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
 * 测试方法：   去地图管理层，建立一堆上方图块的围栏。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只改了一个识别条件，所以性能几乎没有变化。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param 初始是否开启墙顶阻塞
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，你可以通过插件指令或者地图备注后续修改阻塞关系。
 * @default false
 * 
 * @param 初始是否开启墙顶禁止翻越
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，你可以通过插件指令或者地图备注后续修改阻塞关系。
 * @default false
 * 
 * @param 初始是否开启墙面禁止翻越
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，你可以通过插件指令或者地图备注后续修改阻塞关系。
 * @default false
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LUB （Layer_Upper_Block）
//		临时全局变量	DrillUp.xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_Map.prototype.checkPassage
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	地图管理层跑步
//		★性能测试消耗	未找到
//		★最坏情况		无	
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			上层图块：
//				->四通行阻碍
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.将判定换一下顺序就可以了。
//
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerWallBlock = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerWallBlock');


	/*-----------------杂项------------------*/
	DrillUp.g_LWB_ceilingBlockDefault = String(DrillUp.parameters["初始是否开启墙顶阻塞"] || "true") == "true" ;
	DrillUp.g_LWB_ceilingJumpDefault = String(DrillUp.parameters["初始是否开启墙顶禁止翻越"] || "true") == "true" ;
	DrillUp.g_LWB_metopeJumpDefault = String(DrillUp.parameters["初始是否开启墙面禁止翻越"] || "true") == "true" ;
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LWB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LWB_pluginCommand.call(this, command, args);
	if( command === ">墙壁阻塞器" ){
		if(args.length == 2){
			var temp1 = String(args[1]);
			if( temp1 == "开启墙顶阻塞"){
				$gameSystem._drill_LWB_ceilingBlockDefault = true;
			}
			if( temp1 == "关闭墙顶阻塞"){
				$gameSystem._drill_LWB_ceilingBlockDefault = false;
			}
			if( temp1 == "开启墙顶禁止翻越"){
				$gameSystem._drill_LWB_ceilingJumpDefault = true;
			}
			if( temp1 == "关闭墙顶禁止翻越"){
				$gameSystem._drill_LWB_ceilingJumpDefault = false;
			}
			if( temp1 == "开启墙面禁止翻越"){
				$gameSystem._drill_LWB_metopeJumpDefault = true;
			}
			if( temp1 == "关闭墙面禁止翻越"){
				$gameSystem._drill_LWB_metopeJumpDefault = false;
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_LWB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LWB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LWB_sys_initialize.call(this);
	this.drill_LWB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LWB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LWB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LWB_saveEnabled == true ){	
		$gameSystem.drill_LWB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LWB_initSysData();
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
Game_System.prototype.drill_LWB_initSysData = function() {
	this.drill_LWB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LWB_checkSysData = function() {
	this.drill_LWB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LWB_initSysData_Private = function() {
	
	this._drill_LWB_ceilingBlockDefault = DrillUp.g_LWB_ceilingBlockDefault;		//墙顶阻塞
	this._drill_LWB_ceilingJumpDefault = DrillUp.g_LWB_ceilingJumpDefault;			//墙顶禁止翻越
	this._drill_LWB_metopeJumpDefault = DrillUp.g_LWB_metopeJumpDefault;			//墙面禁止翻越
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LWB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LWB_ceilingBlockDefault == undefined ){
		this.drill_LWB_initSysData();
	}
	
};


//=============================================================================
// ** 地图备注
//=============================================================================
var _drill_LWB_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LWB_map_setup.call(this, mapId);
	this.drill_LWB_setupMapNote();
};
Game_Map.prototype.drill_LWB_setupMapNote = function() {
	
	// > 初始设置
	this._drill_LWB_enableCeilingBlock = $gameSystem._drill_LWB_ceilingBlockDefault;
	this._drill_LWB_enableCeilingJump = $gameSystem._drill_LWB_ceilingJumpDefault;
	this._drill_LWB_enableMetopeJump = $gameSystem._drill_LWB_metopeJumpDefault;
	
	
	$dataMap.note.split(/[\r\n]+/).forEach(function(note) {
		var args = note.split(':');
		var command = args.shift();
		if( command == "=>墙壁阻塞器"){
			if(args.length == 2){
				var temp1 = String(args[0]);
				var temp2 = String(args[1]);
				if( temp1 == "临时锁定"){
					if( temp2 == "开启墙顶阻塞"){
						this._drill_LWB_enableCeilingBlock = true;
					}
					if( temp2 == "关闭墙顶阻塞"){
						this._drill_LWB_enableCeilingBlock = false;
					}
					if( temp2 == "开启墙顶禁止翻越"){
						this._drill_LWB_enableCeilingJump = true;
					}
					if( temp2 == "关闭墙顶禁止翻越"){
						this._drill_LWB_enableCeilingJump = false;
					}
					if( temp2 == "开启墙面禁止翻越"){
						this._drill_LWB_enableMetopeJump = true;
					}
					if( temp2 == "关闭墙面禁止翻越"){
						this._drill_LWB_enableMetopeJump = false;
					}
				}
			}
		}
	},this);
};


//=============================================================================
// * 通行检查
//=============================================================================
var _drill_LWB_checkPassage = Game_Map.prototype.checkPassage;
Game_Map.prototype.checkPassage = function( x, y, bit ){
	
	// > 墙顶检查
	if( this._drill_LWB_enableCeilingBlock == true ){
		var tiles = this.allTiles(x, y);
		for( var i = 0; i < tiles.length; i++ ){
			if( Tilemap.isWallTopTile( tiles[i] ) == true ){
				return false;
			}
		}
	}
	
	// > 原函数
	return _drill_LWB_checkPassage.call( this, x, y, bit );
};

//=============================================================================
// * 普通跳跃 - 判断悬崖高度
//=============================================================================
if( Imported.Drill_EventJump ){	//【物体-事件跳跃】
	var _drill_LWB_EJu_getCliffHeight = Game_CharacterBase.prototype.drill_EJu_getCliffHeight;
	Game_CharacterBase.prototype.drill_EJu_getCliffHeight = function(x, y) {
		
		// > 墙顶检查
		if( $gameMap._drill_LWB_enableCeilingJump == true ){
			var tiles = $gameMap.allTiles(x, y);
			for( var i = 0; i < tiles.length; i++ ){
				if( Tilemap.isWallTopTile( tiles[i] ) == true ){
					return 100;
				}
			}
		}
		// > 墙面检查
		if( $gameMap._drill_LWB_enableMetopeJump == true ){
			var tiles = $gameMap.allTiles(x, y);
			for( var i = 0; i < tiles.length; i++ ){
				if( Tilemap.isWallSideTile( tiles[i] ) == true ){
					return 100;
				}
			}
		}
		
		return _drill_LWB_EJu_getCliffHeight(x,y);
	}
}


