//=============================================================================
// Drill_PlayerRegionTiming.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        公共事件 - 出入区域时
 * @author Drill_up
 * 
 * @Drill_LE_param "区域触发-%d"
 * @Drill_LE_parentKey "---区域触发组%d至%d---"
 * @Drill_LE_var "DrillUp.g_PRT_trigger_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_PlayerRegionTiming +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 当玩家进入/离开某特定区域时，执行公共事件。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于多线程插件才能运行。
 * 基于：
 *   - Drill_LayerCommandThread     地图-多线程
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面
 *   只作用于玩家。
 * 2.详细介绍可以去看看："31.公共事件 > 关于时机设置公共事件.docx"
 * 执行时机：
 *   (1.如果玩家在区域交界处反复出入，则会反复触发并执行公共事件。
 *   (2.触发中的 区域组，表示多个不同区域形成一个整体。
 *      进入/离开 这个整体才会触发，整体内部移动不会触发。
 * 设计：
 *   (1.通过设置公共事件，你可以对玩家进入区域/离开区域时，
 *      进行插入执行特殊的事件指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制触发的开关：
 * 
 * 插件指令：>出入区域公共事件 : 开启触发 : 区域触发[1]
 * 插件指令：>出入区域公共事件 : 关闭触发 : 区域触发[1]
 * 
 * 1.注意，如果公共事件正在执行，关闭触发不会阻止当前的公共事件。
 *   关闭只会影响下一次 进入/离开 的判定。
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
 * 添加了地图条件设置。
 * [v1.2]
 * 修改了插件分类。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * 
 *
 *
 * 
 * @param ---区域触发组 1至20---
 * @desc 
 * 
 * @param 区域触发-1
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义玩家自动触发的设置。
 * @default 
 * 
 * @param 区域触发-2
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 区域触发-3
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 区域触发-4
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 区域触发-5
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 区域触发-6
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 区域触发-7
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 区域触发-8
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 区域触发-9
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-10
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-11
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-12
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-13
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-14
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-15
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-16
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-17
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-18
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-19
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 区域触发-20
 * @parent ---区域触发组 1至20---
 * @type struct<PRTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 */
/*~struct~PRTTrigger:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的区域触发设置==
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
 * @desc 关闭"作用到所有地图"时，指定的地图发生区域出入时，才会触发。
 * @default 1
 *
 * @param 区域组
 * @parent ---绑定---
 * @type number[]
 * @min 1
 * @max 255
 * @desc 指定R区域组将会触发公共事件。（1-255）如果写了[11,12]，表示11和12作为一个整体，整体内部移动时不会触发。
 * @default []
 * 
 * @param ---触发---
 * @default 
 * 
 * @param 触发时机
 * @parent ---触发---
 * @type select
 * @option 进入区域时触发
 * @value 进入区域时触发
 * @option 离开区域时触发
 * @value 离开区域时触发
 * @desc 选择不同的区域将对应下面不同的配置。
 * @default 进入区域时触发
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
//		插件简称		PRT（Player_Region_Timing）
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
//			出入区域公共事件：
//				->脚下区域记录
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
　　Imported.Drill_PlayerRegionTiming = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PlayerRegionTiming');
	
	
	//==============================
	// * 变量获取 - 区域触发
	//				（~struct~PRTTrigger）
	//==============================
	DrillUp.drill_PRT_triggerInit = function( dataFrom ){
		var data = {};
		
		// > 开关
		data['enable'] = String( dataFrom["初始是否开启"] || "true") == "true";
		data['onlyOnce'] = String( dataFrom["是否限制触发最多一次"] || "false") == "true";
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "true") == "true";
		data['mapId'] = Number( dataFrom["所属地图"] || 0);
		if( dataFrom['区域组'] != "" &&
			dataFrom['区域组'] != undefined ){
			var temp = JSON.parse( dataFrom['区域组'] );
			data['regionIdTank'] = (temp).map( function(n){ return Number(n);} );
		}else{
			data['regionIdTank'] = ([]).map( function(n){ return Number(n);} );
		}
		
		// > 触发
		data['triggerMode'] = String( dataFrom["触发时机"] || "进入区域时触发");
		data['pipeType'] = String( dataFrom["公共事件执行方式"] || "并行");
		data['commonEventId'] = Number( dataFrom["触发的公共事件"] || 1);
		
		return data;
	}
	
	
	/*-----------------区域触发组------------------*/
	DrillUp.g_PRT_trigger_length = 20;
	DrillUp.g_PRT_trigger = [];
	for( var i = 0; i < DrillUp.g_PRT_trigger_length; i++ ){
		if( DrillUp.parameters["区域触发-" + String(i+1) ] != "" &&
			DrillUp.parameters["区域触发-" + String(i+1) ] != undefined ){
			var data = JSON.parse(DrillUp.parameters["区域触发-" + String(i+1) ]);
			DrillUp.g_PRT_trigger[i] = DrillUp.drill_PRT_triggerInit( data );
		}else{
			DrillUp.g_PRT_trigger[i] = null;
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_LayerCommandThread ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_PRT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PRT_pluginCommand.call(this, command, args);
	if( command === ">出入区域公共事件" ){
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "开启触发" ){	
				temp1 = temp1.replace("区域触发[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				$gameSystem._drill_PRT_dataTank[ temp1 ]['enable'] = true;
			}
			if( type == "关闭触发" ){	
				temp1 = temp1.replace("区域触发[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				$gameSystem._drill_PRT_dataTank[ temp1 ]['enable'] = false;
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
DrillUp.g_PRT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PRT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PRT_sys_initialize.call(this);
	this.drill_PRT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PRT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PRT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PRT_saveEnabled == true ){	
		$gameSystem.drill_PRT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PRT_initSysData();
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
Game_System.prototype.drill_PRT_initSysData = function() {
	this.drill_PRT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PRT_checkSysData = function() {
	this.drill_PRT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PRT_initSysData_Private = function() {
	
	this._drill_PRT_dataTank = [];
	for(var i=0; i < DrillUp.g_PRT_trigger.length; i++){
		var temp_data = DrillUp.g_PRT_trigger[i];
		if( temp_data == undefined ){ continue; }
		this._drill_PRT_dataTank[i] = JSON.parse(JSON.stringify( temp_data ));
		this._drill_PRT_dataTank[i]['activeCount'] = 0;
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PRT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PRT_dataTank == undefined ){
		this.drill_PRT_initSysData();
	}
	
	// > 绑定数据容器
	for(var i = 0; i < DrillUp.g_PRT_trigger.length; i++ ){
		var temp_data = DrillUp.g_PRT_trigger[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_PRT_dataTank[i] == undefined ){
				this._drill_PRT_dataTank[i] = JSON.parse(JSON.stringify( temp_data ));
				this._drill_PRT_dataTank[i]['activeCount'] = 0;
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
}

//=============================================================================
// ** 玩家记录
//=============================================================================
//==============================
// * 存储数据 - 初始化
//==============================
var _drill_PRT_player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function(){
	_drill_PRT_player_initMembers.call(this);
	this._drill_PRT_lastFloor = -1;
};
//==============================
// * 区域触发 - 帧刷新
//==============================
var _drill_PRT_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function( sceneActive ){
	_drill_PRT_player_update.call( this, sceneActive );
	this.drill_PRT_updateCommonEvent();
};
Game_Player.prototype.drill_PRT_updateCommonEvent = function() {
	
	// > R图块
	var r_id = $gameMap.regionId( this.x, this.y );
	if( r_id == this._drill_PRT_lastFloor ){ return; }	//（区域未改变，则跳过）
	
	for(var i = 0; i < $gameSystem._drill_PRT_dataTank.length; i++){
		var temp_data = $gameSystem._drill_PRT_dataTank[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['enable'] == false ){ continue; }
		
		// > 条件 - 地图条件
		var pass = false;
		if( temp_data['mapToAll'] == true ){
			pass = true;
		}
		if( temp_data['mapToAll'] == false && temp_data['mapId'] == $gameMap._mapId ){
			pass = true;
		}
		if( pass == false ){ continue; }
		
		// > 条件 - 限制触发最多一次
		if( temp_data['onlyOnce'] == true &&
			temp_data['activeCount'] > 0 ){
			continue;
		}
		
		if( temp_data['triggerMode'] == "进入区域时触发" ){
			if( temp_data['regionIdTank'].contains( r_id ) == true &&
				temp_data['regionIdTank'].contains( this._drill_PRT_lastFloor ) == false ){
				
				// > 执行公共事件
				var e_data = {
					'type':"公共事件",
					'pipeType': temp_data['pipeType'],
					'commonEventId': temp_data['commonEventId'],
				};
				$gameMap.drill_LCT_addPipeEvent( e_data );
			}
		}
		if( temp_data['triggerMode'] == "离开区域时触发" ){
			if( temp_data['regionIdTank'].contains( r_id ) == false &&
				temp_data['regionIdTank'].contains( this._drill_PRT_lastFloor ) == true ){
					
				// > 执行公共事件
				var e_data = {
					'type':"公共事件",
					'pipeType': temp_data['pipeType'],
					'commonEventId': temp_data['commonEventId'],
				};
				$gameMap.drill_LCT_addPipeEvent( e_data );
			}
		}
		temp_data['activeCount'] += 1;
	}
	
	this._drill_PRT_lastFloor = r_id;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PlayerRegionTiming = false;
		alert(
			"【Drill_PlayerRegionTiming.js 公共事件 - 出入区域时】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_LayerCommandThread 地图-多线程"
		);
}


