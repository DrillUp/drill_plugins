//=============================================================================
// Drill_PlayerEncounterTiming.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        公共事件 - 遇敌时
 * @author Drill_up
 * 
 * @Drill_LE_param "遇敌触发-%d"
 * @Drill_LE_parentKey "---遇敌触发组%d至%d---"
 * @Drill_LE_var "DrillUp.g_PET_trigger_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_PlayerEncounterTiming +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置玩家遇敌前/遇敌后，执行公共事件。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于多线程插件才能运行。
 * 基于：
 *   - Drill_LayerCommandThread     地图-多线程★★v1.2及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面
 *   只作用于玩家。
 * 2.详细介绍可以去看看："31.公共事件 > 关于时机设置公共事件.docx"
 * 执行时机：
 *   (1.如果你添加了玩家 遇敌前 执行公共事件。
 *      那么玩家会在触发遇敌前，先执行公共事件，再执行遇敌战斗。
 * 设计：
 *   (1.多层战斗背景必须要提前用插件指令设置好，
 *      而在随机遇敌时，经常来不及设置战斗背景。
 *      现在通过此插件，可以提前给敌群设置公共事件。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制触发的开关：
 * 
 * 插件指令：>遇敌时公共事件 : 开启触发 : 遇敌触发[1]
 * 插件指令：>遇敌时公共事件 : 关闭触发 : 遇敌触发[1]
 * 
 * 1.注意，如果公共事件正在执行，关闭触发不会阻止当前的公共事件。
 *   关闭只会影响下一次 进入/离开 的判定。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取敌群ID
 * 你可以通过插件指令获取敌群ID：
 * 
 * 插件指令：>遇敌时公共事件 : 遇敌的敌群ID : 给予值 : 变量[21]
 * 
 * 1.无论是在遇敌前或遇敌后，都能够获取到当前遇敌的 敌群ID。
 *   你可以根据敌群ID，来配置场景，或添加某些其他操作。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   在遇敌管理层进行测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只在特定条件满足时，才进行触发判定，消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件指令设置。
 * [v1.2]
 * 修改了插件分类。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * 
 *
 *
 * 
 * @param ---遇敌触发组 1至20---
 * @desc 
 * 
 * @param 遇敌触发-1
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义玩家自动触发的设置。
 * @default 
 * 
 * @param 遇敌触发-2
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 遇敌触发-3
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 遇敌触发-4
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 遇敌触发-5
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 遇敌触发-6
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 遇敌触发-7
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 遇敌触发-8
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 遇敌触发-9
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-10
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-11
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-12
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-13
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-14
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-15
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-16
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-17
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-18
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-19
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 遇敌触发-20
 * @parent ---遇敌触发组 1至20---
 * @type struct<PETTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 */
/*~struct~PETTrigger:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的遇敌触发设置==
 * 
 * @param ---开关---
 * @default 
 *
 * @param 初始是否开启
 * @parent ---开关---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 *
 * @param 是否限制触发最多一次
 * @parent ---开关---
 * @type boolean
 * @on 只一次
 * @off 可反复触发
 * @desc true - 只一次，false - 可反复触发。只一次 表示触发之后，不再触发。
 * @default false
 * 
 * @param ---绑定---
 * @default 
 *
 * @param 是否作用到所有地图
 * @parent ---绑定---
 * @type boolean
 * @on 作用到所有
 * @off 作用于指定地图
 * @desc true - 作用到所有，false - 作用于指定地图。
 * @default false
 * 
 * @param 所属地图
 * @parent 是否作用到所有地图
 * @type number
 * @min 1
 * @desc 关闭"作用到所有地图"时，指定的地图发生遇敌时，才会触发。
 * @default 1
 *
 * @param 是否作用到所有区域
 * @parent ---绑定---
 * @type boolean
 * @on 作用到所有
 * @off 作用于指定区域
 * @desc 玩家处于任何R区域，遇敌时都会触发。你可以限制在指定R区域遇敌时，才执行触发。
 * @default true
 * 
 * @param 限制的指定区域
 * @parent 是否作用到所有区域
 * @type number
 * @min 1
 * @max 255
 * @desc 指定R区域遇敌时，才执行触发。
 * @default 1
 * 
 * @param ---触发---
 * @default 
 * 
 * @param 触发时机
 * @parent ---触发---
 * @type select
 * @option 遇敌前触发
 * @value 遇敌前触发
 * @option 遇敌后触发
 * @value 遇敌后触发
 * @desc 指定情况遇敌时将对应下面不同的配置。
 * @default 遇敌前触发
 * 
 * @param 公共事件执行方式
 * @parent ---触发---
 * @type select
 * @option 串行
 * @value 串行
 * @option 并行
 * @value 并行
 * @desc 公共事件的执行方式。
 * @default 并行
 * 
 * @param 触发的公共事件
 * @parent ---触发---
 * @type common_event
 * @desc 符合条件时，触发执行的公共事件。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PET（Player_Encounter_Timing）
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
//			遇敌时公共事件：
//				->遇敌前触发
//					->获取遇敌前，敌群id
//				->遇敌后触发
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			暂无
//			
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PlayerEncounterTiming = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PlayerEncounterTiming');
	
	
	//==============================
	// * 变量获取 - 遇敌触发
	//				（~struct~PETTrigger）
	//==============================
	DrillUp.drill_PET_triggerInit = function( dataFrom ){
		var data = {};
		
		// > 开关
		data['enable'] = String( dataFrom["初始是否开启"] || "true") == "true";
		data['onlyOnce'] = String( dataFrom["是否限制触发最多一次"] || "false") == "true";
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "false") == "true";
		data['mapId'] = Number( dataFrom["所属地图"] || 0);
		data['regionToAll'] = String( dataFrom["是否作用到所有区域"] || "true") == "true";
		data['regionId'] = Number( dataFrom["限制的指定区域"] || 0);
		
		// > 触发
		data['triggerMode'] = String( dataFrom["触发时机"] || "遇敌前触发");
		data['pipeType'] = String( dataFrom["公共事件执行方式"] || "并行");
		data['commonEventId'] = Number( dataFrom["触发的公共事件"] || 1);
		
		return data;
	}
	
	
	/*-----------------遇敌触发组------------------*/
	DrillUp.g_PET_trigger_length = 20;
	DrillUp.g_PET_trigger = [];
	for( var i = 0; i < DrillUp.g_PET_trigger_length; i++ ){
		if( DrillUp.parameters["遇敌触发-" + String(i+1) ] != "" &&
			DrillUp.parameters["遇敌触发-" + String(i+1) ] != undefined ){
			var data = JSON.parse(DrillUp.parameters["遇敌触发-" + String(i+1) ]);
			DrillUp.g_PET_trigger[i] = DrillUp.drill_PET_triggerInit( data );
		}else{
			DrillUp.g_PET_trigger[i] = null;
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_LayerCommandThread ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_PET_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PET_pluginCommand.call(this, command, args);
	if( command === ">遇敌时公共事件" ){
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "开启触发" ){	
				temp1 = temp1.replace("遇敌触发[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				$gameSystem._drill_PET_dataTank[ temp1 ]['enable'] = true;
			}
			if( type == "关闭触发" ){	
				temp1 = temp1.replace("遇敌触发[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				$gameSystem._drill_PET_dataTank[ temp1 ]['enable'] = false;
			}
		}
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "遇敌的敌群ID" && temp1 == "给予值" ){	
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				$gameVariables.setValue( temp2, $gamePlayer._drill_PET_curTroopId );
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
DrillUp.g_PET_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PET_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PET_sys_initialize.call(this);
	this.drill_PET_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PET_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PET_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PET_saveEnabled == true ){	
		$gameSystem.drill_PET_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PET_initSysData();
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
Game_System.prototype.drill_PET_initSysData = function() {
	this.drill_PET_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PET_checkSysData = function() {
	this.drill_PET_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PET_initSysData_Private = function() {
	
	this._drill_PET_dataTank = [];
	for(var i=0; i < DrillUp.g_PET_trigger.length; i++){
		var temp_data = DrillUp.g_PET_trigger[i];
		if( temp_data == undefined ){ continue; }
		this._drill_PET_dataTank[i] = JSON.parse(JSON.stringify( temp_data ));
		this._drill_PET_dataTank[i]['activeCount'] = 0;
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PET_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PET_dataTank == undefined ){
		this.drill_PET_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_PET_trigger.length; i++ ){
		var temp_data = DrillUp.g_PET_trigger[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_PET_dataTank[i] == undefined ){
				this._drill_PET_dataTank[i] = JSON.parse(JSON.stringify( temp_data ));
				this._drill_PET_dataTank[i]['activeCount'] = 0;
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
}

//=============================================================================
// ** 玩家遇敌
//
//			说明：	当没有阻塞事件运行时，且 $gamePlayer._encounterCount <= 0 时，激活遇敌。
//=============================================================================
//==============================
// * 玩家 - 触发遇敌
//==============================
var _drill_PET_updateEncounter = Scene_Map.prototype.updateEncounter;
Scene_Map.prototype.updateEncounter = function() {
	
	// > 遇敌前 - 捕获标记
	this.drill_PET_updateEncounterBefore();
	
	// > 遇敌前 - 公共事件设置
	this.drill_PET_updateCommonEventBefore();
	
	// > 遇敌前 - 公共事件阻塞
	if( $gamePlayer._drill_PET_isEncountering == true &&
		$gamePlayer._drill_PET_isCommonEventBlock == true ){
		return;
	}
	
	// > 原函数
	_drill_PET_updateEncounter.call( this );
	
	// > 遇敌后 - 公共事件设置
	this.drill_PET_updateCommonEventAfter();
	
	// > 遇敌后 - 清除标记
	this.drill_PET_updateEncounterAfter();
	
};
//==============================
// * 遇敌前 - 捕获标记
//
//			说明：	判定与 Game_Player.prototype.executeEncounter 一致。
//==============================
Scene_Map.prototype.drill_PET_updateEncounterBefore = function() {
	if( !$gameMap.isEventRunning() && $gamePlayer._encounterCount <= 0 ){
		
		var troopId = $gamePlayer.makeEncounterTroopId();
		if( $dataTroops[troopId] ){
			
			// > 已遇敌标记
			$gamePlayer._drill_PET_isEncountering = true;
			$gamePlayer._drill_PET_curTroopId = troopId;
			
		}else{
			//（不操作）
		}
	}else{
		//（不操作）
	}
};
//==============================
// * 遇敌后 - 清除标记
//==============================
Scene_Map.prototype.drill_PET_updateEncounterAfter = function() {
	$gamePlayer._drill_PET_isEncountering = false;		//（遇敌标记）
	$gamePlayer._drill_PET_isBeforeRunning = false;		//单次执行锁
	$gamePlayer._drill_PET_isAfterRunning = false;		//单次执行锁
};
//==============================
// * 遇敌前 - 固定敌群ID
//==============================
var _drill_PET_makeEncounterTroopId = Game_Player.prototype.makeEncounterTroopId;
Game_Player.prototype.makeEncounterTroopId = function(){
	if( this._drill_PET_isEncountering == true ){
		return this._drill_PET_curTroopId;
	}
	return _drill_PET_makeEncounterTroopId.call( this );
}

//==============================
// * 遇敌前 - 公共事件设置
//==============================
Scene_Map.prototype.drill_PET_updateCommonEventBefore = function() {
	if( $gamePlayer._drill_PET_isEncountering != true ){ return; }
	
	// > 单次执行锁（确保只在遇敌时执行一次）
	if( $gamePlayer._drill_PET_isBeforeRunning == true ){ return; }
	$gamePlayer._drill_PET_isBeforeRunning = true;
	
	
	// > R图块
	var r_id = $gameMap.regionId( $gamePlayer.x, $gamePlayer.y );

	for(var i = 0; i < $gameSystem._drill_PET_dataTank.length; i++){
		var temp_data = $gameSystem._drill_PET_dataTank[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['enable'] == false ){ continue; }
		
		// > 条件 - 限制触发最多一次
		if( temp_data['onlyOnce'] == true &&
			temp_data['activeCount'] > 0 ){
			continue;
		}
		
		// > 条件 - 遇敌前触发
		if( temp_data['triggerMode'] != "遇敌前触发" ){ continue; }
		
		// > 条件 - 地图条件
		var pass = false;
		if( temp_data['mapToAll'] == true ){
			pass = true;
		}
		if( temp_data['mapToAll'] == false && temp_data['mapId'] == $gameMap._mapId ){
			pass = true;
		}
		if( pass == false ){ continue; }
		
		// > 条件 - 区域条件
		var pass = false;
		if( temp_data['regionToAll'] == true ){
			pass = true;
		}
		if( temp_data['regionToAll'] == false && temp_data['regionId'] == r_id ){
			pass = true;
		}
		if( pass == false ){ continue; }
		
		
		// > 阻塞遇敌（等公共事件执行完了，才继续）
		$gamePlayer._drill_PET_isCommonEventBlock = true;
		
		// > 执行公共事件
		var e_data = {
			'type':"公共事件",
			'pipeType': temp_data['pipeType'],
			'commonEventId': temp_data['commonEventId'],
			'callBack_str':"this.drill_PET_commandEnd();",
		};
		$gameMap.drill_LCT_addPipeEvent( e_data );
		temp_data['activeCount'] += 1;
	}
		
};
//==============================
// * 遇敌前 - 公共事件 释放阻塞
//==============================
Game_Interpreter.prototype.drill_PET_commandEnd = function(){
	$gamePlayer._drill_PET_isCommonEventBlock = false;
}
//==============================
// * 遇敌触发 - 遇敌后帧刷新
//==============================
Scene_Map.prototype.drill_PET_updateCommonEventAfter = function() {
	if( $gamePlayer._drill_PET_isEncountering != true ){ return; }
	
	// > 单次执行锁（确保只在遇敌时执行一次）
	if( $gamePlayer._drill_PET_isAfterRunning == true ){ return; }
	$gamePlayer._drill_PET_isAfterRunning = true;
	
	
	// > R图块
	var r_id = $gameMap.regionId( $gamePlayer.x, $gamePlayer.y );

	for(var i = 0; i < $gameSystem._drill_PET_dataTank.length; i++){
		var temp_data = $gameSystem._drill_PET_dataTank[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['enable'] == false ){ continue; }
		
		// > 条件 - 限制触发最多一次
		if( temp_data['onlyOnce'] == true &&
			temp_data['activeCount'] > 0 ){
			continue;
		}
		
		// > 条件 - 遇敌后触发
		if( temp_data['triggerMode'] != "遇敌后触发" ){ continue; }
		
		// > 条件 - 地图条件
		var pass = false;
		if( temp_data['mapToAll'] == true ){
			pass = true;
		}
		if( temp_data['mapToAll'] == false && temp_data['mapId'] == $gameMap._mapId ){
			pass = true;
		}
		if( pass == false ){ continue; }
		
		// > 条件 - 区域条件
		var pass = false;
		if( temp_data['regionToAll'] == true ){
			pass = true;
		}
		if( temp_data['regionToAll'] == false && temp_data['regionId'] == r_id ){
			pass = true;
		}
		if( pass == false ){ continue; }
		
		
		// > 执行公共事件
		var e_data = {
			'type':"公共事件",
			'pipeType': temp_data['pipeType'],
			'commonEventId': temp_data['commonEventId'],
		};
		$gameMap.drill_LCT_addPipeEvent( e_data );
		temp_data['activeCount'] += 1;
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PlayerEncounterTiming = false;
		alert(
			"【Drill_PlayerEncounterTiming.js 公共事件 - 遇敌时】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_LayerCommandThread 地图-多线程"
		);
}


