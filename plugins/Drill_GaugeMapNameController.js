//=============================================================================
// Drill_GaugeMapNameController.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        UI - 地图名管理器
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
 * 使得你可以修改地图名或者控制地图名窗口播放。
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
 *      与事件指令 "地图 > 启用/禁用显示地图名称" 的效果一模一样。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制地图名：
 * 
 * 插件指令：>地图名管理器 : 地图[1] : 修改地图名 : 某地图名称
 * 插件指令：>地图名管理器 : 当前地图 : 修改地图名 : 某地图名称
 * 插件指令：>地图名管理器 : 地图[1] : 恢复默认地图名
 * 插件指令：>地图名管理器 : 当前地图 : 恢复默认地图名
 * 
 * 插件指令：>地图名管理器 : 强制播放一次地图名
 * 
 * 1.修改地图名后永久有效。
 * 2.地图名强制播放时，可以无视"不显示地图名"的设置。另外如果地图名为空，则播放无效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 地图名设置
 * 你可以通过插件指令控制地图名：
 * 
 * 插件指令：>地图名管理器 : 地图名显示设置 : 开启
 * 插件指令：>地图名管理器 : 地图名显示设置 : 关闭
 * 插件指令：>地图名管理器 : 地图名不重复播放 : 开启
 * 插件指令：>地图名管理器 : 地图名不重复播放 : 关闭
 * 
 * 1."地图名不重复播放" 即进入相同地图名的地图时，不执行播放。
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
 * 测试方法：   在地图界面中测试地图名管理器。
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
 * [v1.1]
 * 完善了内部结构，添加了"不重复播放"的设置。
 * 
 * 
 *
 * @param 地图名默认是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 地图名是否不重复播放
 * @type boolean
 * @on 不重复
 * @off 关闭
 * @desc true - 不重复，false - 关闭。
 * @default true
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		GMNC（Gauge_Map_Name_Controller）
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
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			
//			->☆管辖权（地图名管理）
//			->☆修改地图名
//			
//			->☆管辖权（地图名窗口）
//			->☆强制播放一次地图名
//			->☆地图名不重复播放
//			
//			->☆MOG兼容
//			->☆引擎兼容（STG）
//			->☆引擎兼容（ACT）
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
//			1.该插件目前只管了 Window_MapName 和 Game_Map 。
//			  理论上其他引擎只要用了 Window_MapName，那么地图名的修改效果就都是同步的。
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
	DrillUp.g_GMNC_PluginTip_curName = "Drill_GaugeMapNameController.js UI-地图名管理器";
	DrillUp.g_GMNC_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_GaugeMapNameController = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_GaugeMapNameController');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_GMNC_nameVisible = String(DrillUp.parameters["地图名默认是否显示"] || "true") === "true";
	DrillUp.g_GMNC_nameNoRepeat = String(DrillUp.parameters["地图名是否不重复播放"] || "false") === "true";
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_GMNC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_GMNC_pluginCommand.call(this, command, args);
	this.drill_GMNC_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_GMNC_pluginCommand = function( command, args ){
	if( command === ">地图名管理器" ){
		
		/*-----------------修改地图名------------------*/
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
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
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
		
		/*-----------------强制播放一次地图名------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "强制播放一次地图名" ){
				$gameTemp.drill_GMNC_forcePlay();
			}
		}
		
		/*-----------------地图名设置------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1 == "地图名显示设置" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
					$gameMap.enableNameDisplay();
				}
				if( temp2 == "关闭" || temp2 == "禁用" ){
					$gameMap.disableNameDisplay();
				}
			}
			if( temp1 == "地图名不重复播放" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
					$gameSystem._drill_GMNC_mapNoRepeatEnabled = true;
				}
				if( temp2 == "关闭" || temp2 == "禁用" ){
					$gameSystem._drill_GMNC_mapNoRepeatEnabled = false;
				}
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
	
	this._drill_GMNC_mapNameTank = [];									//修改地图名容器（初始为空容器，不需要初始化）
	
	this._drill_GMNC_mapNoRepeatEnabled = DrillUp.g_GMNC_nameNoRepeat;	//地图名不重复开关
	this._drill_GMNC_mapLastName = "";									//地图名不重复容器（初始为空，不需要初始化）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_GMNC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_GMNC_mapLastName === undefined ){
		this.drill_GMNC_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，插件指令使用时才赋值）
};


//=============================================================================
// ** ☆管辖权（地图名管理）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * A基本属性《UI-地图名管理器》 - 地图名管理
//==============================
Game_Map.prototype.displayName = function(){ return $dataMap.displayName; };		//《UI-地图名管理器》地图名
Game_Map.prototype.isNameDisplayEnabled = function(){ return this._nameDisplay; };	//《UI-地图名管理器》是否显示地图名
Game_Map.prototype.disableNameDisplay = function(){ this._nameDisplay = false; };	//《UI-地图名管理器》是否显示地图名
Game_Map.prototype.enableNameDisplay = function(){ this._nameDisplay = true; };		//《UI-地图名管理器》是否显示地图名
*/

//=============================================================================
// ** ☆修改地图名
//
//			说明：	> 此模块提供 修改地图名 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 修改地图名 - 初始化
//
//			说明：	> $gameMap._nameDisplay 不会在setUp中被赋值，但是会被存储。
//					> 因此直接操作此参数即可。
//==============================
var _drill_GMNC_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function(){
	_drill_GMNC_initialize.call(this);
	this._nameDisplay = DrillUp.g_GMNC_nameVisible;
};
//==============================
// * 修改地图名 - 访问器（半覆写）
//==============================
var _drill_GMNC_displayName = Game_Map.prototype.displayName;
Game_Map.prototype.displayName = function() {
	
	// > 修改的名称
	var map_name = $gameSystem._drill_GMNC_mapNameTank[ Number(this._mapId) ];
	if( map_name != undefined ){
		return map_name;
	}
	
	// > 原函数
	return _drill_GMNC_displayName.call(this);
};


//=============================================================================
// ** ☆管辖权（地图名窗口）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 地图名窗口《UI-地图名管理器》 - 帧刷新
//==============================
Window_MapName.prototype.update = function(){
    Window_Base.prototype.update.call(this);
	
	// > 2B显现动画
    if( this._showCount > 0 && $gameMap.isNameDisplayEnabled() ){
        this.updateFadeIn();
        this._showCount--;
    }else{
        this.updateFadeOut();
    }
};
//==============================
// * 2A私有函数《UI-地图名管理器》 - 刷新内容（基函数）
//
//			说明：	> 此函数父类无定义，不存在函数 Window_Base.prototype.refresh。
//==============================
Window_MapName.prototype.refresh = function(){
    this.contents.clear();
    if( $gameMap.displayName() ){
        var width = this.contentsWidth();
        this.drawBackground(0, 0, width, this.lineHeight());
        this.drawText($gameMap.displayName(), 0, 0, width, 'center');
    }
};
*/

//=============================================================================
// ** ☆强制播放一次地图名
//
//			说明：	> 此模块提供 强制播放 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 强制播放一次地图名 - 执行（开放函数）
//
//			参数：	> 无
//			返回：	> 无
//==============================
Game_Temp.prototype.drill_GMNC_forcePlay = function(){
	var scene = SceneManager._scene;
	if( scene instanceof Scene_Map ){
		$gameTemp._drill_GMNC_isInForcePlay = true;	//（强制播放标记）
		scene._mapNameWindow.open();				//（执行播放）
	}
}
//==============================
// * 强制播放一次地图名 - 最后继承1级
//==============================
var _drill_GMNC_scene_initialize1 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_GMNC_scene_initialize1.call(this);
	
	//==============================
	// * 强制播放一次地图名 - 帧刷新
	//==============================
	var _drill_GMNC_update1 = Window_MapName.prototype.update;
	Window_MapName.prototype.update = function(){
		_drill_GMNC_update1.call(this);
		
		// > 播放结束时，解除 强制播放标记
		if( this._showCount <= 0 ){
			if( $gameTemp._drill_GMNC_isInForcePlay == true ){
				$gameTemp._drill_GMNC_isInForcePlay = undefined;
			}
		}
	};
	//==============================
	// * 强制播放一次地图名 - 访问器（半覆写）
	//==============================
	var _drill_GMNC_isNameDisplayEnabled1 = Game_Map.prototype.isNameDisplayEnabled;
	Game_Map.prototype.isNameDisplayEnabled = function() {
		
		// > 强制播放时，强制为可用状态
		if( $gameTemp._drill_GMNC_isInForcePlay == true ){ return true; }
		
		// > 原函数
		return _drill_GMNC_isNameDisplayEnabled1.call(this);
	}
}

//=============================================================================
// ** ☆地图名不重复播放
//
//			说明：	> 此模块提供 地图名不重复播放 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 地图名不重复播放 - 记录名称
//==============================
var _drill_GMNC_update2 = Window_MapName.prototype.update;
Window_MapName.prototype.update = function(){
	_drill_GMNC_update2.call(this);
	if( this._showCount == 0 || this._showCount == -1 ){  //（关闭时，记录名称）
		this._showCount = -2;
		$gameSystem._drill_GMNC_mapLastName = $gameMap.displayName();
	}
};
//==============================
// * 地图名不重复播放 - 访问器（半覆写）
//==============================
var _drill_GMNC_isNameDisplayEnabled2 = Game_Map.prototype.isNameDisplayEnabled;
Game_Map.prototype.isNameDisplayEnabled = function() {
	
	// > 开关
	if( $gameSystem._drill_GMNC_mapNoRepeatEnabled == true ){
		
		// > 开关 - 重复时，阻止播放
		if( $gameSystem._drill_GMNC_mapLastName == $gameMap.displayName() ){
			return false;
		}
	}
	
	// > 原函数
	return _drill_GMNC_isNameDisplayEnabled2.call(this);
};



//=============================================================================
// ** ☆MOG兼容
//
//			说明：	> 此模块用于兼容MOG界面的地图名显示。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * MOG兼容 - 最后继承1级
//==============================
var _drill_GMNC_scene_initialize2 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_GMNC_scene_initialize2.call(this);
	
	if( Imported.MOG_MapNameHud ){
		
		//==============================
		// * MOG兼容 - 强制播放一次地图名
		//
		//			说明：	> MOG自己会兼容 $gameMap.isNameDisplayEnabled() 功能，只是强制播放时需要重建窗口。
		//==============================
		var _drill_MOG_GMNC_play = Game_Temp.prototype.drill_GMNC_forcePlay;
		Game_Temp.prototype.drill_GMNC_forcePlay = function(){
			
			var scene = SceneManager._scene;
			if( scene instanceof Scene_Map ){
				
				// > mog插件播放地图名（只能在地图界面生效）
				$gameMap._mog_mhud_enable = true;
				$gameSystem._mapNameData.refresh = true;
				$gameSystem._mapNameData.name = $gameMap.displayName();
				$gameSystem.clearMapNameTemp();
				$gameSystem._mapNameData.mapID = $gameMap._mapId;
				if( scene._hudField != undefined ){	//（销毁窗口，重新建一个）
					scene._hudField.removeChild( scene._mapNameHud );
				}
				scene.createMapNameHud();
				
			// > 原函数
			}else{
				_drill_MOG_GMNC_play.call(this);
			}
		}
		//==============================
		// * 地图名窗口 - 刷新内容（覆写）
		//
		//			说明：	> mog插件覆写了这个函数，现在强制恢复一部分，因为MOG只能在 Scene_Map 中生效。
		//==============================
		Window_MapName.prototype.refresh = function(){
			
			// > 原操作
			this.contents.clear();
			
			var scene = SceneManager._scene;
			if( scene instanceof Scene_Map ){
				//（MOG有框，不操作）
			}else{
				
				// > 原操作
				if( $gameMap.displayName() ){
					var width = this.contentsWidth();
					this.drawBackground(0, 0, width, this.lineHeight());
					this.drawText($gameMap.displayName(), 0, 0, width, 'center');
				}
			}
		};
		//==============================
		// * MOG兼容 - 存档界面 的地图名
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
	}
};

//=============================================================================
// ** ☆引擎兼容（STG）
//
//			说明：	> 此模块对引擎进行专门兼容。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 引擎兼容 - 插件指令『STG的插件指令』
//==============================
if( Imported.Drill_STG__objects ){
	
	//==============================
	// * 插件指令 - STG指令绑定
	//==============================
	var _drill_STG_GMNC_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_GMNC_pluginCommand.call(this, command, args);
		this.drill_GMNC_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_GMNC_pluginCommand = Game_Interpreter.prototype.drill_GMNC_pluginCommand;
}
//==============================
// * 引擎兼容 - 强制播放一次地图名（STG）
//==============================
if( Imported.Drill_STG__objects ){
	
	//==============================
	// * 强制播放一次地图名（STG） - 执行（继承）
	//==============================
	var _drill_STG_GMNC_forcePlay = Game_Temp.prototype.drill_GMNC_forcePlay;
	Game_Temp.prototype.drill_GMNC_forcePlay = function(){
		_drill_STG_GMNC_forcePlay.call(this);
		var scene = SceneManager._scene;
		if( scene instanceof Drill_STG_MapScene ){
			$gameTemp._drill_GMNC_isInForcePlay = true;	//（强制播放标记）
			scene._drill_mapNameWindow.open();			//（执行播放）
		}
	}
};

//=============================================================================
// ** ☆引擎兼容（ACT）
//
//			说明：	> 此模块对引擎进行专门兼容。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 引擎兼容 - 插件指令『ACT的插件指令』
//==============================
if( Imported.Drill_ACT__objects ){
	
	//==============================
	// * 插件指令 - ACT指令绑定
	//==============================
	var _drill_ACT_GMNC_pluginCommand = Drill_ACT_GameInterpreter.prototype.pluginCommand;
	Drill_ACT_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_ACT_GMNC_pluginCommand.call(this, command, args);
		this.drill_GMNC_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - ACT指令执行
	//==============================
	Drill_ACT_GameInterpreter.prototype.drill_GMNC_pluginCommand = Game_Interpreter.prototype.drill_GMNC_pluginCommand;
}
//==============================
// * 引擎兼容 - 强制播放一次地图名（ACT）
//==============================
if( Imported.Drill_ACT__objects ){
	
	//==============================
	// * 强制播放一次地图名（ACT） - 执行（继承）
	//==============================
	var _drill_ACT_GMNC_forcePlay = Game_Temp.prototype.drill_GMNC_forcePlay;
	Game_Temp.prototype.drill_GMNC_forcePlay = function(){
		_drill_ACT_GMNC_forcePlay.call(this);
		var scene = SceneManager._scene;
		if( scene instanceof Drill_ACT_MapScene ){
			$gameTemp._drill_GMNC_isInForcePlay = true;	//（强制播放标记）
			scene._drill_mapNameWindow.open();			//（执行播放）
		}
	}
};

