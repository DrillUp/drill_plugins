//=============================================================================
// Drill_LayerDamageFloor.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        图块 - 地形伤害与地形治愈
 * @author Drill_up
 * 
 * @Drill_LE_param "自定义地形伤害-%d"
 * @Drill_LE_parentKey "---自定义地形伤害集---"
 * @Drill_LE_var "DrillUp.g_LDF_data_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_LayerDamageFloor +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以手动修改有害地形的伤害公式，并且能够额外设置治愈的地形。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也可以被下列插件扩展。
 * 可被扩展：
 *   - Drill_X_GaugeForFloorDamage   图块-地形伤害漂浮数字[扩展]
 *     目标插件可以在地形伤害/治愈时，弹出相应的数字。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于 图块 。
 * 2.更多详细的介绍，去看看 "26.图块 > 关于地形伤害与地形治愈.docx"。
 * 3.插件需要将指定 图块R区域 地形伤害/治愈，
 *   去看看 "26.图块 > 关于插件与图块R占用说明.xlsx"
 * 细节：
 *   (1.地形伤害/地形治愈针对所有队伍成员。
 *      如果地形伤害能够致死，所有成员死亡后会导致游戏失败。
 *   (2.角色成员可以设置 地形伤害的倍率 翻倍或减半，
 *      此倍率同样对治愈有效，即 地形伤害翻倍 = 地形治愈翻倍。
 * 自定义地形伤害：
 *   (1.游戏中遇到多个自定义地形伤害的图块时，不会叠加效果，而是
 *      按id最小的地形伤害来进行计算。
 *   (2.但是注意，默认地形伤害和自定义地形伤害 是可以叠加的，
 *      不建议同时设置有害地形又涂自定义伤害地形的R图块区域。
 * 设计：
 *   (1.自定义地形伤害可以设置多个，你可以设置好几个作用于同一
 *      个R图块的自定义地形伤害。根据剧情的推演，开关这些地形伤
 *      害，使得看起来地形伤害值和伤害等级在逐步提升。
 *   (2.你可以设计一个温泉区域，玩家进入后来回走动，可以不断恢复
 *      生命值，直到加满。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 默认地形伤害
 * 你可以通过插件指令控制：
 * 
 * 插件指令：>地形伤害与地形治愈 : 默认地形伤害致死 : 开启
 * 插件指令：>地形伤害与地形治愈 : 默认地形伤害致死 : 关闭
 * 插件指令：>地形伤害与地形治愈 : 修改默认地形伤害公式 : a.mhp*0.10+10
 * 
 * 1.修改默认地形伤害公式后，永久有效。公式的值可以为负数，表示治愈地形。
 *   另外注意，公式中不能有空格。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 自定义地形伤害
 * 你可以通过插件指令控制：
 * 
 * 插件指令：>地形伤害与地形治愈 : 自定义地形伤害[1] : 开启
 * 插件指令：>地形伤害与地形治愈 : 自定义地形伤害[1] : 关闭
 * 
 * 1.游戏中遇到多个自定义地形伤害的图块时，不会叠加效果，而是按id最小
 *   的地形伤害来进行计算。
 * 2.你可以设置多个自定义地形伤害，通过开关不同的地形伤害，来设计不同
 *   程度的地形伤害效果。
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
 * 时间复杂度： o(n^2)
 * 测试方法：   去地图管理层，建立一堆上方图块的围栏。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只进行单次地形伤害计算，并不消耗多少性能。
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
 * @param 默认地形伤害是否致死
 * @type boolean
 * @on 致死
 * @off 不致死
 * @desc true - 致死，false - 不致死
 * @default false
 * 
 * @param 默认地形伤害公式
 * @desc 默认为"10"，负数表示治愈。可填"a.mhp*0.10"，表示a.mhp生命最大值的10%，注意公式里面不能写百分号。
 * @default 10
 * 
 * @param ---自定义地形伤害集---
 * @default
 *
 * @param 自定义地形伤害-1
 * @parent ---自定义地形伤害集---
 * @type struct<LDFCustom>
 * @desc 自定义地形的伤害公式等配置信息。
 * @default 
 *
 * @param 自定义地形伤害-2
 * @parent ---自定义地形伤害集---
 * @type struct<LDFCustom>
 * @desc 自定义地形的伤害公式等配置信息。
 * @default 
 *
 * @param 自定义地形伤害-3
 * @parent ---自定义地形伤害集---
 * @type struct<LDFCustom>
 * @desc 自定义地形的伤害公式等配置信息。
 * @default 
 *
 * @param 自定义地形伤害-4
 * @parent ---自定义地形伤害集---
 * @type struct<LDFCustom>
 * @desc 自定义地形的伤害公式等配置信息。
 * @default 
 *
 * @param 自定义地形伤害-5
 * @parent ---自定义地形伤害集---
 * @type struct<LDFCustom>
 * @desc 自定义地形的伤害公式等配置信息。
 * @default 
 *
 * @param 自定义地形伤害-6
 * @parent ---自定义地形伤害集---
 * @type struct<LDFCustom>
 * @desc 自定义地形的伤害公式等配置信息。
 * @default 
 *
 * @param 自定义地形伤害-7
 * @parent ---自定义地形伤害集---
 * @type struct<LDFCustom>
 * @desc 自定义地形的伤害公式等配置信息。
 * @default 
 *
 * @param 自定义地形伤害-8
 * @parent ---自定义地形伤害集---
 * @type struct<LDFCustom>
 * @desc 自定义地形的伤害公式等配置信息。
 * @default 
 *
 * @param 自定义地形伤害-9
 * @parent ---自定义地形伤害集---
 * @type struct<LDFCustom>
 * @desc 自定义地形的伤害公式等配置信息。
 * @default 
 *
 * @param 自定义地形伤害-10
 * @parent ---自定义地形伤害集---
 * @type struct<LDFCustom>
 * @desc 自定义地形的伤害公式等配置信息。
 * @default 
 */
/*~struct~LDFCustom:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的自定义地形伤害==
 *
 *
 * @param 初始是否开启
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 * 
 * @param 判定区域
 * @type number
 * @min 0
 * @max 255
 * @desc 填入区域id，该R图块区域将会产生指定地形伤害/治愈效果。
 * @default 0
 * 
 * @param 地形伤害是否致死
 * @type boolean
 * @on 致死
 * @off 不致死
 * @desc true - 致死，false - 不致死
 * @default false
 * 
 * @param 地形伤害公式
 * @desc 正数表示伤害，负数表示治愈。可填"a.mhp*0.10"，表示a.mhp生命最大值的10%，注意公式里面不能写百分号。
 * @default 10
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LDF （Layer_Damage_Floor）
//		临时全局变量	DrillUp.g_LDF_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_LDF_xxx
//		全局存储变量	无
//		覆盖重写方法	Game_Actor.prototype.executeFloorDamage
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	UI管理层
//		★性能测试消耗	（未找到）
//		★最坏情况		无	
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			地形伤害与地形治愈：
//				->默认地形伤害
//					->公式设置
//					->伤害闪烁效果
//					->伤害时执行公共事件 x
//				->自定义地形伤害
//					->设置开关
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.本来不想覆写函数的，但是原来的函数结构分的多但乱七八糟的。干脆覆写算了。
//			  注意，覆写了之后，原来的一些子函数就被作废了。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerDamageFloor = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerDamageFloor');


	//==============================
	// * 变量获取 - 自定义地形伤害
	//				（~struct~LDFCustom）
	//==============================
	DrillUp.drill_LDF_initParam = function( dataFrom ) {
		var data = {};
		data['enabled'] = String( dataFrom["初始是否开启"] || "true") == "true";
		data['regionId'] = Number( dataFrom["判定区域"] || 0);
		data['deadly'] = String( dataFrom["地形伤害是否致死"] || "false") == "true";
		data['formula'] = String( dataFrom["地形伤害公式"] || "10");
		return data;
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_LDF_defaultDeadly = String(DrillUp.parameters["默认地形伤害是否致死"] || "false") == "true";
    DrillUp.g_LDF_defaultFormula = String(DrillUp.parameters["默认地形伤害公式"] || "10");
	
	/*----------------自定义地形伤害-----------------*/
	DrillUp.g_LDF_data_length = 10;
	DrillUp.g_LDF_data = [];
	for (var i = 0; i < DrillUp.g_LDF_data_length; i++) {
		if( DrillUp.parameters["自定义地形伤害-" + String(i+1) ] != undefined &&
			DrillUp.parameters["自定义地形伤害-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["自定义地形伤害-" + String(i+1) ]);
			DrillUp.g_LDF_data[i] = DrillUp.drill_LDF_initParam( data );
		}else{
			DrillUp.g_LDF_data[i] = null;		//（强制设为空值，节约存储资源）
		}
	}
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_LDF_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LDF_pluginCommand.call(this, command, args);
	if( command === ">地形伤害与地形治愈" ){
		
		/*-----------------默认------------------*/
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "默认地形伤害致死" ){
				if( temp1 == "开启" ){
					$gameSystem._drill_LDF_defaultDeadly = true;
				}
				if( temp1 == "关闭" ){
					$gameSystem._drill_LDF_defaultDeadly = false;
				}
			}
			if( type == "修改默认地形伤害公式" ){
				$gameSystem._drill_LDF_defaultFormula = temp1;
			}
		}
		
		/*-----------------自定义------------------*/
		if(args.length == 4){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1.indexOf("自定义地形伤害[") != -1 ){
				temp1 = temp1.replace("自定义地形伤害[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				if( temp2 == "开启" ){
					var data = $gameSystem._drill_LDF_custom[ temp1 ];
					if( data != undefined ){
						data['enabled'] = true;
					}
				}
				if( temp2 == "关闭" ){
					var data = $gameSystem._drill_LDF_custom[ temp1 ];
					if( data != undefined ){
						data['enabled'] = false;
					}
				}
			}
		}
	};
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_LDF_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LDF_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LDF_sys_initialize.call(this);
	this.drill_LDF_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LDF_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LDF_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LDF_saveEnabled == true ){	
		$gameSystem.drill_LDF_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LDF_initSysData();
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
Game_System.prototype.drill_LDF_initSysData = function() {
	this.drill_LDF_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LDF_checkSysData = function() {
	this.drill_LDF_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LDF_initSysData_Private = function() {
	
	this._drill_LDF_defaultDeadly = DrillUp.g_LDF_defaultDeadly;		//默认地形伤害是否致死
	this._drill_LDF_defaultFormula = DrillUp.g_LDF_defaultFormula;		//默认地形伤害公式
	this._drill_LDF_custom = [];
	for(var i=0; i < DrillUp.g_LDF_data.length; i++ ){
		var temp_data = DrillUp.g_LDF_data[i];
		if( temp_data == undefined ){ continue; }
		this._drill_LDF_custom[i] = JSON.parse(JSON.stringify( temp_data ));
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LDF_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LDF_seq == undefined ){
		this.drill_LDF_initSysData();
	}
	
	// > 容器的 空数据 检查
	for( var i = 0; i < DrillUp.g_LDF_data.length; i++ ){
		var temp_data = DrillUp.g_LDF_data[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_LDF_custom[i] == undefined ){
				this._drill_LDF_custom[i] = JSON.parse(JSON.stringify( temp_data ));
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//=============================================================================
// ** 地形伤害/治愈
//
//			说明：	这里分离成两种计算方式：默认地形伤害 和 自定义地形伤害。
//=============================================================================
//==============================
// * 地形伤害/治愈 - 检查伤害
//==============================
var _drill_LDF_checkFloorEffect = Game_Actor.prototype.checkFloorEffect;
Game_Actor.prototype.checkFloorEffect = function(){
	
	// > 检查 - 默认地形伤害
	_drill_LDF_checkFloorEffect.call( this );
	
	// > 检查 - 自定义地形伤害
    if( $gamePlayer.drill_LDF_isOnDamageFloor() ){
        this.drill_LDF_executeFloorDamage();
    }
};
//==============================
// * 地形伤害/治愈 - 最大治愈
//
//			说明：	生命值满了则不再增加。
//==============================
Game_Actor.prototype.drill_LDF_maxFloorRecover = function(){
    return -1 * (this.mhp - this.hp);
};
//==============================
// * 地形伤害/治愈 - 治愈闪烁效果
//==============================
Game_Actor.prototype.drill_LDF_performMapRecover = function(){
    if( !$gameParty.inBattle() ){
        $gameScreen.startFlash([50, 255, 50, 128], 8);		//（绿色闪烁）
	}
};


//=============================================================================
// ** 默认地形伤害
//
//			说明：	此部分对原设置的默认地形伤害作扩展。
//=============================================================================
//==============================
// * 默认地形 - 初始化属性
//==============================
var _drill_LDF_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function(){
	_drill_LDF_initMembers.call(this);
	this._drill_LDF_lastDamage_default = 0;			//（上一次默认地形伤害）
}
//==============================
// * 默认地形 - 伤害效果（覆写）
//==============================
Game_Actor.prototype.executeFloorDamage = function(){
	
	// > 计算伤害
    var damage = Math.floor(this.drill_LDF_basicFloorDamage_default() * this.fdr);	//（与地形伤害的倍率叠加）

	// > 执行伤害，并红色闪烁
	if( damage > 0 ){
		var dv = Math.min(damage, this.drill_LDF_maxFloorDamage_default());
		this.gainHp(-1 * dv);
		if( dv > 0 ){
			this.performMapDamage();
		}
		
		this._drill_LDF_lastDamage_default = dv;	//（记录伤害，默认地形伤害）
	}
	
	// > 执行治愈，并绿色闪烁
	if( damage < 0 ){
		var dv = Math.max(damage, this.drill_LDF_maxFloorRecover());
		this.gainHp(-1 * dv);
		if( dv < 0 ){
			this.drill_LDF_performMapRecover();
		}
		
		this._drill_LDF_lastDamage_default = dv;	//（记录伤害，默认地形伤害）
	}
};
//==============================
// * 默认地形 - 基础伤害
//==============================
Game_Actor.prototype.drill_LDF_basicFloorDamage_default = function(){
	var a = this;
	var result = eval( $gameSystem._drill_LDF_defaultFormula );
	if( isNaN(result) ){ return 0; }
    return result;
};
//==============================
// * 默认地形 - 最大伤害
//
//			说明：	此设置用于防止生命值低于1而造成死亡。
//					这里直接绕开了 $dataSystem.optFloorDeath 的设置。
//==============================
Game_Actor.prototype.drill_LDF_maxFloorDamage_default = function(){
    return $gameSystem._drill_LDF_defaultDeadly ? this.hp : Math.max(this.hp - 1, 0);
};


//=============================================================================
// ** 自定义地形伤害
//
//			说明：	此部分完全 独立于 默认地形伤害 的功能。
//=============================================================================
//==============================
// * 自定义地形 - 初始化属性
//==============================
var _drill_LDF_initMembers2 = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function(){
	_drill_LDF_initMembers2.call(this);
	this._drill_LDF_lastDamage_custom = 0;		//（上一次自定义地形伤害）
}
//==============================
// * 自定义地形 - 执行伤害
//==============================
Game_Actor.prototype.drill_LDF_executeFloorDamage = function(){
	
	// > 计算伤害
    var damage = Math.floor(this.drill_LDF_basicFloorDamage_custom() * this.fdr);	//（与地形伤害的倍率叠加）

	// > 执行伤害，并红色闪烁
	if( damage > 0 ){
		var dv = Math.min(damage, this.drill_LDF_maxFloorDamage_custom());
		this.gainHp(-1 * dv);
		if( dv > 0 ){
			this.performMapDamage();
		}
		
		this._drill_LDF_lastDamage_custom = dv;	//（记录伤害，自定义地形伤害）
	}
	
	// > 执行治愈，并绿色闪烁
	if( damage < 0 ){
		var dv = Math.max(damage, this.drill_LDF_maxFloorRecover());
		this.gainHp(-1 * dv);
		if( dv < 0 ){
			this.drill_LDF_performMapRecover();
		}
		
		this._drill_LDF_lastDamage_custom = dv;	//（记录伤害，自定义地形伤害）
	}
};
//==============================
// * 自定义地形 - 基础伤害
//==============================
Game_Actor.prototype.drill_LDF_basicFloorDamage_custom = function(){
	var type = $gamePlayer._drill_LDF_lastCustomType;
	var a = this;	
	var data = $gameSystem._drill_LDF_custom[ type ];
	if( data == undefined ){ return 0; }
	var result = eval( data['formula'] );
	if( isNaN(result) ){ return 0; }
	return result;
};
//==============================
// * 自定义地形 - 最大伤害
//==============================
Game_Actor.prototype.drill_LDF_maxFloorDamage_custom = function(){
	var type = $gamePlayer._drill_LDF_lastCustomType;
	var data = $gameSystem._drill_LDF_custom[ type ];
	if( data == undefined ){ return 0; }
    return data['deadly'] ? this.hp : Math.max(this.hp - 1, 0);
};
//==============================
// * 自定义地形 - 条件检查
//==============================
Game_Player.prototype.drill_LDF_isOnDamageFloor = function(){
	if( this.isInAirship() == true ){ return false; }
	var r_id = $gameMap.regionId( this.x, this.y );
	for(var i=0; i < $gameSystem._drill_LDF_custom.length; i++ ){
		var custom = $gameSystem._drill_LDF_custom[i];
		if( custom == undefined ){ continue; }
		if( custom['enabled'] == false ){ continue; }
		if( custom['regionId'] == r_id ){
			this._drill_LDF_lastCustomType = i;		//（记录脚下的自定义类型）
			return true; 
		}
	}
    return false;
};



