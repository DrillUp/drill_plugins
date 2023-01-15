//=============================================================================
// Drill_LayerAnimTile.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        图块 - 动态图块帧
 * @author Drill_up
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_LayerAnimTile +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可以修改动态图块的帧速度，比如加速地图图块的水流。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面
 *   作用于动态图块。
 * 细节：
 *   (1.插件直接作用于整张地图的所有动态图块，
 *      无法分区域或者划片。
 * 设计：
 *   (1.可以制作暴风雨时播放速度很快的流水，或者跳舞机的动态图块。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过地图备注，锁定当前地图的动画帧间隔。
 * 
 * 地图备注：=>动态图块帧:锁定帧间隔:15
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制边框的属性：
 * 
 * 插件指令：>动态图块帧 : 修改默认 : 帧间隔[10]
 * 插件指令：>动态图块帧 : 修改当前地图锁定 : 帧间隔[10]
 * 
 * 1."修改默认"后，所有默认的帧间隔将变化，永久有效。
 *   "修改当前地图锁定"后，只在当前地图临时有效，离开后失效。
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
 * 测试方法：   在各个管理层进行测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只修改了一个参数，相当于一个小优化，所以性能不变。
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
 * @param 默认动态图块帧间隔
 * @type number
 * @min 1
 * @desc 默认动态图块播放的帧间隔，单位帧。(1秒60帧) 值越小，播放速度越快。
 * @default 30
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LAT（Layer_Anim_Tile）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	对话管理层
//		★性能测试消耗	（太小，没有找到）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			动态图块帧：
//				->改帧间隔
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.不能直接覆盖update，因为Tilemap被ShaderTilemap继承。
//			
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerAnimTile = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_LayerAnimTile');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_LAT_interval = Number(DrillUp.parameters["默认动态图块帧间隔"] || 1); 
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LAT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LAT_pluginCommand.call(this, command, args);
	if( command === ">动态图块帧" ){
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改默认" ){	
				temp1 = temp1.replace("帧间隔[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_LAT_interval = Number(temp1);
			}
			if( type == "修改当前地图锁定" ){	
				temp1 = temp1.replace("帧间隔[","");
				temp1 = temp1.replace("]","");
				$gameMap._drill_LAT_m_interval = Number(temp1);
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
DrillUp.g_LAT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LAT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LAT_sys_initialize.call(this);
	this.drill_LAT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LAT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LAT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LAT_saveEnabled == true ){	
		$gameSystem.drill_LAT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LAT_initSysData();
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
Game_System.prototype.drill_LAT_initSysData = function() {
	this.drill_LAT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LAT_checkSysData = function() {
	this.drill_LAT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LAT_initSysData_Private = function() {
	
	this._drill_LAT_interval = DrillUp.g_LAT_interval;	//帧间隔
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LAT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LAT_interval == undefined ){
		this.drill_LAT_initSysData();
	}
	
};


//=============================================================================
// ** 地图备注
//=============================================================================
var _drill_LAT_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LAT_map_setup.call(this, mapId);
	this.drill_LAT_setup();
};
Game_Map.prototype.drill_LAT_setup = function() {
	
	// > 地图锁定初始化
	this._drill_LAT_m_interval = $gameSystem._drill_LAT_interval;
	
	$dataMap.note.split(/[\r\n]+/).forEach(function(note) {
		var args = note.split(':');
		var command = args.shift();
		if( command == "=>动态图块帧"){
			if(args.length == 2){
				var temp1 = String(args[0]);
				var temp2 = Number(args[1]);
				if( temp1 == "锁定帧间隔"){
					this._drill_LAT_m_interval = Math.max( 1, temp2 );
				}
			}
		}
	},this);
};


//=============================================================================
// * 动态图块帧
//=============================================================================
//==============================
// * 变量锁定
//==============================
Object.defineProperty(Tilemap.prototype, 'animationFrame', {
    get: function() {		//强制限制该变量的获取
        return Math.floor(this.animationCount / this.drill_LAT_getAnimationInterval() );
    },
    set: function(value) {
        //（什么都不做）
    }
});
//==============================
// * 获取图块帧
//==============================
Tilemap.prototype.drill_LAT_getAnimationInterval = function() {
	var interval = $gameMap._drill_LAT_m_interval;
	if( isNaN(interval) ){		//（防止错误值）
		interval = DrillUp.g_LAT_interval;
	}
	return interval;
}


