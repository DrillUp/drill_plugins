//=============================================================================
// Drill_GaugeMapNameController.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        地图UI - 地图名控制器
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GaugeMapNameController +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以修改地图名的内容及显示情况。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 可作用于：
 *   - MOG_MapNameHud            地图UI-地图浮动框
 *     该插件能让地图浮动框强制播放一次地图名。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于 进入地图时 显示的地图名。
 * 细节：
 *   (1.地图名显示设置开启/关闭的插件指令，
 *      与事件指令 地图>启用/禁用显示地图名称 效果一模一样。
 *   (2."强制播放一次地图名"对默认的地图名窗口也有效。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制地图名：
 * 
 * 插件指令：>地图名控制器 : 地图[1] : 修改地图名 : 某地图名称
 * 插件指令：>地图名控制器 : 当前地图 : 修改地图名 : 某地图名称
 * 插件指令：>地图名控制器 : 地图[1] : 恢复默认地图名
 * 插件指令：>地图名控制器 : 当前地图 : 恢复默认地图名
 * 
 * 插件指令：>地图名控制器 : 地图名显示设置 : 开启
 * 插件指令：>地图名控制器 : 地图名显示设置 : 关闭
 * 
 * 插件指令：>地图名控制器 : 强制播放一次地图名
 * 
 * 1.地图名、地图名显示 修改后永久有效。
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
 * 测试方法：   在地图界面中测试地图名控制器。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只单次执行，消耗可以忽略不计。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 *
 * @param 地图名默认是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		GMNC（Gauge_Map_Name_Controller）
//		临时全局变量	DrillUp.g_GMNC_xxx
//		临时局部变量	this._drill_GMNC_xxx
//		存储数据变量	$gameSystem._drill_GMNC_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	乱跑
//		★性能测试消耗	没有找到消耗
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			地图名控制器：
//				->地图名控制器
//					->修改地图名
//					->地图名显示设置
//					->强制播放一次地图名
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
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeMapNameController = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_GaugeMapNameController');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_GMNC_nameVisible = String(DrillUp.parameters["地图名默认是否显示"] || "false") === "true";	
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_GMNC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GMNC_pluginCommand.call(this, command, args);
	if( command === ">地图名控制器" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "强制播放一次地图名" ){
				var scene = SceneManager._scene;
				if( scene instanceof Scene_Map ){
					
					// > mog插件播放
					if( Imported.MOG_MapNameHud ){
						$gameMap._mog_mhud_enable = true;
						$gameSystem._mapNameData.refresh = true;
						$gameSystem._mapNameData.name = $gameMap.displayName();
						$gameSystem.clearMapNameTemp();
						$gameSystem._mapNameData.mapID = $gameMap._mapId;
						if( scene._hudField ){	//（销毁窗口，重新建一个）
							scene._hudField.removeChild( scene._mapNameHud );
						}
						scene.createMapNameHud();
						
					// > 默认地图窗口播放
					}else{
						scene._mapNameWindow.show();
						scene._mapNameWindow.open();
					}
				}
			}
		}
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1 == "地图名显示设置" ){
				if( temp2 == "开启" ){
					$gameMap.enableNameDisplay();
				}
				if( temp2 == "关闭" ){
					$gameMap.disableNameDisplay();
				}
			}
			if( temp2 == "恢复默认地图名" ){
				var map_id = 0;
				if( temp1 == "当前地图" ){
					map_id = Number( $gameMap._mapId );
				}else{
					temp1 = temp1.replace("地图[","");
					temp1 = temp1.replace("]","");
					map_id = Number( temp1 );
				}
				$gameSystem._drill_GMNC_mapNameTank[ map_id ] = null;
			}
		}
		if( args.length == 6 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			if( temp2 == "修改地图名" ){
				var map_id = 0;
				if( temp1 == "当前地图" ){
					map_id = Number( $gameMap._mapId );
				}else{
					temp1 = temp1.replace("地图[","");
					temp1 = temp1.replace("]","");
					map_id = Number( temp1 );
				}
				$gameSystem._drill_GMNC_mapNameTank[ map_id ] = temp3;
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
DrillUp.g_GMNC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_GMNC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_GMNC_sys_initialize.call(this);
	this.drill_GMNC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_GMNC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_GMNC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_GMNC_saveEnabled == true ){	
		$gameSystem.drill_GMNC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_GMNC_initSysData();
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
Game_System.prototype.drill_GMNC_initSysData = function() {
	this.drill_GMNC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_GMNC_checkSysData = function() {
	this.drill_GMNC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_GMNC_initSysData_Private = function() {
	
	this._drill_GMNC_mapNameTank = [];
	//（初始为空容器，不需要初始化）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_GMNC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_GMNC_mapNameTank == undefined ){
		this.drill_GMNC_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，插件指令使用时才赋值）
};


//=============================================================================
// ** 地图名控制器
//=============================================================================
//==============================
// * 地图名 - 获取
//==============================
var _drill_GMNC_displayName = Game_Map.prototype.displayName;
Game_Map.prototype.displayName = function() {
	var map_name = $gameSystem._drill_GMNC_mapNameTank[ Number(this._mapId) ];
	if( map_name != undefined ){
		return map_name;
	}
	return _drill_GMNC_displayName.call(this);
};
//==============================
// * 地图名显示 - 初始化
//
//			说明：	> $gameMap._nameDisplay 不会在setUp中赋值，但是会被存储。
//					> 因此直接操作此参数即可。
//==============================
var _drill_GMNC_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function(){
	_drill_GMNC_initialize.call(this);
	this._nameDisplay = DrillUp.g_GMNC_nameVisible;
}
//==============================
// * 地图名显示 - 设置
//==============================
//Game_Map.prototype.isNameDisplayEnabled = function(){ return this._nameDisplay; };	//地图名显示
//Game_Map.prototype.disableNameDisplay = function(){ this._nameDisplay = false; };		//地图名显示
//Game_Map.prototype.enableNameDisplay = function(){ this._nameDisplay = true; };		//地图名显示

//=============================================================================
// ** 兼容
//=============================================================================
//==============================
// * mog兼容 - 最后继承
//==============================
var _drill_GMNC_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_GMNC_scene_initialize.call(this);
	
	//==============================
	// * mog兼容 - 存档界面
	//==============================
	var _drill_GMNC_mog_makeSavefileInfo = DataManager.makeSavefileInfo;
	DataManager.makeSavefileInfo = function() {
		var info = _drill_GMNC_mog_makeSavefileInfo.call(this);
		
		if( $gameMap && $gameMap.displayName() ){
			info.location = $gameMap.displayName();
		}else{
			if( $dataMapInfos[$gameMap._mapId] ){
				info.location = $dataMapInfos[$gameMap._mapId].name;
			}else{
				info.location = "";
			}
		}
		return info;
	};
};


