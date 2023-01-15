//=============================================================================
// Drill_PlayerItemCollectTiming.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        公共事件 - 物品积累时
 * @author Drill_up
 * 
 * @Drill_LE_param "积累触发-%d"
 * @Drill_LE_parentKey "---积累触发组%d至%d---"
 * @Drill_LE_var "DrillUp.g_PICT_trigger_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_PlayerItemCollectTiming +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置玩家收集某物品达到一定数量后，执行公共事件。
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
 *   (1.只有物品数量变化时，才会执行公共事件。
 *   (2.如果你在战斗界面或菜单界面消耗物品到一定数量后，
 *      回到地图界面时，才会激活公共事件，且只激活一次。
 * 设计思路提示：
 *   (1.你可以不通过此插件，来设计出相似的功能。
 *      比如某物品第一次获得时，执行公共事件，然后关闭此公共事件。
 *      具体去看看文档。
 * 设计：
 *   (1.玩家第一次获得指定物品时，可以设置只触发一次，用于对该物
 *      品的首次介绍。
 *   (2.玩家身上的指定物品数量变化时，才会触发公共事件，你可以对
 *      有限数量的特殊道具，做公共事件处理。
 *      比如告知玩家还剩3个，还剩2个，还剩1个。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制触发的开关：
 * 
 * 插件指令：>物品积累公共事件 : 开启触发 : 积累触发[1]
 * 插件指令：>物品积累公共事件 : 关闭触发 : 积累触发[1]
 * 
 * 1.注意，如果公共事件正在执行，关闭触发不会阻止当前的公共事件。
 *   关闭只会影响下一次 数量变化 的判定。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制触发的开关：
 * 
 * 插件指令：>物品积累公共事件 : 积累触发[1] : 物品数量 : 给予值 : 变量[21]
 * 
 * 1.你可以直接使用事件指令获取到物品数量。
 *   也可以使用该插件，获取到积累触发对应的物品数量。
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
 * 测试结果：   地图界面中，平均消耗为：【7.37ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件需要实时判断所有物品情况，在特定条件满足时，才进行触发判定，
 *   消耗不大。
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
 * @param ---积累触发组 1至20---
 * @desc 
 * 
 * @param 积累触发-1
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义玩家自动触发的设置。
 * @default 
 * 
 * @param 积累触发-2
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 积累触发-3
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 积累触发-4
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 积累触发-5
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 积累触发-6
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 积累触发-7
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 积累触发-8
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 * @param 积累触发-9
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-10
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-11
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-12
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-13
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-14
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-15
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-16
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-17
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-18
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-19
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 *
 * @param 积累触发-20
 * @parent ---积累触发组 1至20---
 * @type struct<PICTTrigger>
 * @desc 自定义触发事件的区域范围。
 * @default 
 * 
 */
/*~struct~PICTTrigger:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的积累触发设置==
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
 * @param 绑定的物品id
 * @parent ---绑定---
 * @desc 物品类型下对应变量id号。
 * @type item
 * @default 0
 * 
 * @param ---触发---
 * @default 
 *
 * @param 触发条件-比较符
 * @parent ---触发---
 * @type select
 * @option 大于等于
 * @value 大于等于
 * @option 小于等于
 * @value 小于等于
 * @option 大于
 * @value 大于
 * @option 小于
 * @value 小于
 * @option 等于
 * @value 等于
 * @desc 物品数量条件的比较符。
 * @default 大于等于
 *
 * @param 触发条件-比较值
 * @parent ---触发---
 * @desc 如果比较符为"大于"，比较值为10，那么表示 物品数量>10 时满足。每次物品数量变化，都会判定一次公共事件。
 * @default 1
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
//		插件简称		PICT（Player_ItemCollect_Timing）
//		临时全局变量	DrillUp.g_PICT_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	UI管理层
//		★性能测试消耗	7.37ms
//		★最坏情况		暂无
//		★备注			由于实时批量判断物品，消耗能找到。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			物品积累公共事件：
//				->物品数量变化
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
　　Imported.Drill_PlayerItemCollectTiming = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PlayerItemCollectTiming');
	
	
	//==============================
	// * 变量获取 - 积累触发
	//				（~struct~PICTTrigger）
	//==============================
	DrillUp.drill_PICT_triggerInit = function( dataFrom ){
		var data = {};
		
		// > 开关
		data['enable'] = String( dataFrom["初始是否开启"] || "true") == "true";
		data['onlyOnce'] = String( dataFrom["是否限制触发最多一次"] || "false") == "true";
		
		// > 绑定
		data['itemId'] = Number( dataFrom["绑定的物品id"] || 0);
		
		// > 触发
		data['itemOperator'] = String( dataFrom["触发条件-比较符"] || "大于等于");
		data['itemValue'] = Number( dataFrom["触发条件-比较值"] || 1);
		data['pipeType'] = String( dataFrom["公共事件执行方式"] || "并行");
		data['commonEventId'] = Number( dataFrom["触发的公共事件"] || 1);
		
		return data;
	}
	
	
	/*-----------------积累触发组------------------*/
	DrillUp.g_PICT_trigger_length = 20;
	DrillUp.g_PICT_trigger = [];
	for( var i = 0; i < DrillUp.g_PICT_trigger_length; i++ ){
		if( DrillUp.parameters["积累触发-" + String(i+1) ] != "" &&
			DrillUp.parameters["积累触发-" + String(i+1) ] != undefined ){
			var data = JSON.parse(DrillUp.parameters["积累触发-" + String(i+1) ]);
			DrillUp.g_PICT_trigger[i] = DrillUp.drill_PICT_triggerInit( data );
		}else{
			DrillUp.g_PICT_trigger[i] = null;
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_LayerCommandThread ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_PICT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PICT_pluginCommand.call(this, command, args);
	if( command === ">物品积累公共事件" ){
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "开启触发" ){	
				temp1 = temp1.replace("积累触发[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				$gameSystem._drill_PICT_dataTank[ temp1 ]['enable'] = true;
			}
			if( type == "关闭触发" ){	
				temp1 = temp1.replace("积累触发[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				$gameSystem._drill_PICT_dataTank[ temp1 ]['enable'] = false;
			}
		}
		if(args.length == 8){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = String(args[7]);
			if( temp2 == "物品数量" && temp3 == "给予值" ){	
				temp1 = temp1.replace("积累触发[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				temp4 = temp4.replace("变量[","");
				temp4 = temp4.replace("]","");
				temp4 = Number(temp4);
				
				var item_id = $gameSystem._drill_PICT_dataTank[ temp1 ]['itemId'];
				var item = $dataItems[ item_id ];
				var item_container = $gameParty.itemContainer(item);
				if( item_container == undefined ){
					$gameVariables.setValue( temp4, 0 );
				}
				var item_count = item_container[ item_id ];
				
				$gameVariables.setValue( temp4, item_count );
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
DrillUp.g_PICT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PICT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PICT_sys_initialize.call(this);
	this.drill_PICT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PICT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PICT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PICT_saveEnabled == true ){	
		$gameSystem.drill_PICT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PICT_initSysData();
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
Game_System.prototype.drill_PICT_initSysData = function() {
	this.drill_PICT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PICT_checkSysData = function() {
	this.drill_PICT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PICT_initSysData_Private = function() {
	
	this._drill_PICT_dataTank = [];
	for(var i=0; i < DrillUp.g_PICT_trigger.length; i++){
		var temp_data = DrillUp.g_PICT_trigger[i];
		if( temp_data == undefined ){ continue; }
		this._drill_PICT_dataTank[i] = JSON.parse(JSON.stringify( temp_data ));
		this._drill_PICT_dataTank[i]['lastItemCount'] = 0;
		this._drill_PICT_dataTank[i]['activeCount'] = 0;
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PICT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PICT_dataTank == undefined ){
		this.drill_PICT_initSysData();
	}
	
	// > 绑定数据容器
	for(var i = 0; i < DrillUp.g_PICT_trigger.length; i++ ){
		var temp_data = DrillUp.g_PICT_trigger[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_PICT_dataTank[i] == undefined ){
				this._drill_PICT_dataTank[i] = JSON.parse(JSON.stringify( temp_data ));
				this._drill_PICT_dataTank[i]['lastItemCount'] = 0;
				this._drill_PICT_dataTank[i]['activeCount'] = 0;
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
}

//=============================================================================
// ** 物品监听
//
//			说明：	当没有阻塞事件运行时，激活监听。
//=============================================================================
//==============================
// * 物品监听 - 帧刷新
//==============================
var _drill_PICT_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_PICT_update.call( this );
	this.drill_PICT_updateCommonEvent();
};
//==============================
// * 物品监听 - 公共事件设置
//==============================
Scene_Map.prototype.drill_PICT_updateCommonEvent = function() {
	
	// > 阻塞时，不执行
	if( $gameMap.isEventRunning() == true ){ return; }
	
	for(var i = 0; i < $gameSystem._drill_PICT_dataTank.length; i++){
		var temp_data = $gameSystem._drill_PICT_dataTank[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['enable'] == false ){ continue; }
		
		// > 条件 - 限制触发最多一次
		if( temp_data['onlyOnce'] == true &&
			temp_data['activeCount'] > 0 ){
			continue;
		}
		
		// > 物品数量
		var item = $dataItems[ temp_data['itemId'] ];
		var item_container = $gameParty.itemContainer(item);
		if( item_container == undefined ){ continue; }
		var item_count = item_container[ temp_data['itemId'] ];
		
		// > 条件 - 数量变化监听
		if( temp_data['lastItemCount'] == item_count ){ continue; }
		temp_data['lastItemCount'] = item_count;
		
		// > 条件 - 变化
		var pass = false;
		if( temp_data['itemOperator'] == "大于等于" && item_count >= temp_data['itemValue'] ){ pass = true; }
		if( temp_data['itemOperator'] == "小于等于" && item_count <= temp_data['itemValue'] ){ pass = true; }
		if( temp_data['itemOperator'] == "大于" && item_count > temp_data['itemValue'] ){ pass = true; }
		if( temp_data['itemOperator'] == "小于" && item_count < temp_data['itemValue'] ){ pass = true; }
		if( temp_data['itemOperator'] == "等于" && item_count == temp_data['itemValue'] ){ pass = true; }
		if( pass == false ){ continue; }
		
		// > 执行公共事件
		var e_data = {
			'type':"公共事件",
			'pipeType': temp_data['pipeType'],
			'commonEventId': temp_data['commonEventId'],
		};
		$gameMap.drill_LCT_addPipeEvent( e_data );
		temp_data['activeCount'] += 1;
		break;
	}
		
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PlayerItemCollectTiming = false;
		alert(
			"【Drill_PlayerItemCollectTiming.js 公共事件 - 物品积累时】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_LayerCommandThread 地图-多线程"
		);
}


