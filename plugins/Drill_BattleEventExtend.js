//=============================================================================
// Drill_BattleEventExtend.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        公共事件 - 战斗开始结束时
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_BattleEventExtend +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置战斗开始时/战斗结束时执行公共事件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于所有战斗。
 * 2.详细介绍可以去看看："31.公共事件 > 关于时机设置公共事件.docx"
 * 细节：
 *   (1.该插件对所有战斗都有效，如果你要对指定的战斗进行配置。
 *      在公共事件中加 分支条件 通过开关区分即可。
 *   (2.该插件只能在 mog车轮战 插件中的第一波战斗有效，
 *      后面波数战斗中都不能执行。
 * 执行时机：
 *   (1."战斗开始时执行"将在进入战斗对话框显示"xxx出现"后，执行。
 *      如果你去掉了"xxx出现"的对话框，那么直接执行。
 *   (2."战斗结束时执行"将在战斗结束前执行，
 *      执行期间可以阻塞流程，执行完后进入战斗结算。
 * 设计：
 *   (1.通过"战斗开始时执行"，你可以在每次战斗前进行特殊的准备，
 *      比如示例中的锦囊，开局角色获得一个buff。
 *   (2.由于"战斗结束时执行"可以在游戏结束后暂时阻塞结算流程，
 *      你可以根据这个时机制作boss死亡后的动画CG，再进行结算。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令修改执行的公共事件：
 * 
 * 插件指令：>战斗事件扩展 : 切换执行 : 战斗开始时 : 公共事件[1]
 * 插件指令：>战斗事件扩展 : 切换执行 : 战斗结束时 : 公共事件[1]
 * 插件指令：>战斗事件扩展 : 切换不执行 : 战斗开始时
 * 插件指令：>战斗事件扩展 : 切换不执行 : 战斗结束时
 * 
 * 1.切换后，原来的公共事件配置会被覆盖。
 * 2.如果你想在战斗前执行多个公共事件，在执行的公共事件中，
 *   使用事件指令"执行公共事件"嵌套即可。
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
 * 测试方法：   进入战斗界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 10ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于插件只在指定实际执行一次，不存在反复执行情况，所以几乎
 *   没有消耗。
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
 * @param 战斗开始时执行
 * @type common_event
 * @desc 战斗开始时执行的公共事件。
 * @default 0
 * 
 * @param 战斗结束时执行
 * @type common_event
 * @desc 战斗结束时执行的公共事件。
 * @default 0
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BEE（Battle_Event_Extend）
//		临时全局变量	无
//		临时局部变量	this._drill_BEE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	战斗界面
//		★性能测试消耗	（太小，没有找到）
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			战斗事件扩展：
//				->战斗开始时执行
//				->战斗结束时执行
//
//		★必要注意事项：
//			1.将事件页数据捕获，并加入到 ._interpreter 解释器 中。
//			
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//		
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleEventExtend = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BattleEventExtend');
	
	/*-----------------杂项------------------*/
	DrillUp.g_BEE_commentEventId_start = Number(DrillUp.parameters["战斗开始时执行"] || 0);
	DrillUp.g_BEE_commentEventId_end = Number(DrillUp.parameters["战斗结束时执行"] || 0);


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_BEE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BEE_pluginCommand.call(this, command, args);
	if( command === ">战斗时公共事件" && command === ">战斗事件扩展" ){
		
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "切换不执行" ){
				if( temp1 == "战斗开始时" ){
					$gameSystem._drill_BEE_commentEventId_start = 0;
				}
				if( temp1 == "战斗结束时" ){
					$gameSystem._drill_BEE_commentEventId_end = 0;
				}
			}
		}
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "切换执行" ){
				if( temp1 == "战斗开始时" ){
					if( temp2.indexOf("公共事件[") != -1 ){
						temp2 = temp2.replace("公共事件[","");
						temp2 = temp2.replace("]","");
						$gameSystem._drill_BEE_commentEventId_start = Number(temp2);
					}
				}
				if( temp1 == "战斗结束时" ){
					if( temp2.indexOf("公共事件[") != -1 ){
						temp2 = temp2.replace("公共事件[","");
						temp2 = temp2.replace("]","");
						$gameSystem._drill_BEE_commentEventId_end = Number(temp2);
					}
				}
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
DrillUp.g_BEE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BEE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BEE_sys_initialize.call(this);
	this.drill_BEE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BEE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BEE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BEE_saveEnabled == true ){	
		$gameSystem.drill_BEE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BEE_initSysData();
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
Game_System.prototype.drill_BEE_initSysData = function() {
	this.drill_BEE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BEE_checkSysData = function() {
	this.drill_BEE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BEE_initSysData_Private = function() {
	this._drill_BEE_commentEventId_start = DrillUp.g_BEE_commentEventId_start;
	this._drill_BEE_commentEventId_end = DrillUp.g_BEE_commentEventId_end;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BEE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BEE_commentEventId_start == undefined ){
		this.drill_BEE_initSysData();
	}
	
};


//=============================================================================
// ** 敌群
//=============================================================================
//==============================
// * 敌群 - 事件页数据
//==============================
Game_Troop.prototype.drill_BEE_getPageData = function( commonEventId ){
	var data = {
		"conditions":{
			"actorHp":50,
			"actorId":1,
			"actorValid":false,
			"enemyHp":50,
			"enemyIndex":0,
			"enemyValid":false,
			"switchId":1,
			"switchValid":false,
			"turnA":0,
			"turnB":0,
			"turnEnding":false,
			"turnValid":true
		},
		"list":[
			{"code":117,"indent":0,"parameters":[ commonEventId ]},
			{"code":0,"indent":0,"parameters":[]}
		],
		"span":0
	};
	return data;
}
//==============================
// * 敌群 - 设置战斗开始时执行
//==============================
Game_Troop.prototype.drill_BEE_setupStart = function() {
	var id = $gameSystem._drill_BEE_commentEventId_start;
	if( id <= 0 ){ return; }
	var page = this.drill_BEE_getPageData( id );
    this._interpreter.setup(page.list);
}
//==============================
// * 敌群 - 设置战斗结束时执行
//==============================
Game_Troop.prototype.drill_BEE_setupEnd = function() {
	var id = $gameSystem._drill_BEE_commentEventId_end;
	if( id <= 0 ){ return; }
	var page = this.drill_BEE_getPageData( id );
    this._interpreter.setup(page.list);
}


//=============================================================================
// ** 战斗管理器
//=============================================================================
//==============================
// * 战斗管理器 - 初始化
//==============================
var _drill_BEE_setup = BattleManager.setup;
BattleManager.setup = function( troopId, canEscape, canLose ){
	_drill_BEE_setup.call( this, troopId, canEscape, canLose );
	this._drill_BEE_needStartExecute = true;	//起始执行
	this._drill_BEE_needEndExecute = true;		//结束执行
}

//==============================
// * 战斗管理器 - 帧刷新
//==============================
var _drill_BEE_updateEventMain = BattleManager.updateEventMain;
BattleManager.updateEventMain = function() {
	
	// > 在update前，硬插入公共事件集
	if( this._drill_BEE_needStartExecute == true ){
		this._drill_BEE_needStartExecute = false;
		$gameTroop.drill_BEE_setupStart();
	}
	if( this._drill_BEE_needEndExecute == true && this.drill_BEE_checkBattleEnd() ){
		this._drill_BEE_needEndExecute = false;
		$gameTroop.drill_BEE_setupEnd();	//（在update前执行时间，可以拦截战斗结束执行函数）
	}
	
	return _drill_BEE_updateEventMain.call( this );
}
//==============================
// * 战斗管理器 - 检查战斗结束（只监听）
//==============================
BattleManager.drill_BEE_checkBattleEnd = function() {
    if( this._phase ){
		
		// > 逃跑
        if( this.checkAbort() ){
            return true;
			
		// > 战败
        }else if( $gameParty.isAllDead() ){
            return true;
			
		// > 战胜
        }else if( $gameTroop.isAllDead() ){
            return true;
        }
    }
    return false;
};



