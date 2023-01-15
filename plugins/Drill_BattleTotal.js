//=============================================================================
// Drill_BattleTotal.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        战斗UI - 单次战斗统计信息
 * @author Drill_up
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_BattleTotal +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能统计单次战斗相关信息。
 * ★★必须放在插件 MOG_ComboCounter伤害统计浮动框 的后面★★
 * ★★必须放在插件 Drill_WindowLog窗口提示消息 的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 但是部分功能需要其它插件支持。
 * 被扩展：
 *   - MOG_ComboCounter             战斗UI-伤害统计浮动框
 *     通过该插件，玩家最大连击数 和 玩家最大连击伤害 能被统计到。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   根据战斗的情况，实时给变量赋值。
 * 细节：
 *   (1.统计是整个角色团体的，单人统计太复杂，这里不涉及。
 *   (2.逃跑次数、连续杀敌等与多次战斗相关的统计这里不涉及。
 * 获取：
 *   (1.统计需要设置到具体的变量，0表示没有变量。
 *      统计情况是实时变化的，战斗前的统计信息会被全部清零。
 *   (2.你也可以不设置变量，使用插件指令将 指定统计值 赋给 变量。
 * 设计：
 *   (1.你可以使用变量获取到统计的具体数据，
 *      然后显示在菜单自定义信息面板上，用于战果展示。
 *   (2.你也可以设计并行公共事件，每隔几帧获取统计数据，
 *      来触发 爆发伤害、最大连击数 等破记录类的成就。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令获取到指定统计的值：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>单次战斗统计 : 角色对敌人总伤害 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 角色对自己总伤害 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 角色受到敌人总伤害 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 恢复生命量 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 伤害总次数 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 最大连击数 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 最大连击伤害 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 单次最大伤害 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 魔法消耗总量 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 怒气消耗总量 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 躲避攻击次数 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 暴击次数 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 物理反击次数 : 给予值 : 变量[2]
 * 插件指令：>单次战斗统计 : 魔法反射次数 : 给予值 : 变量[2]
 * 
 * 1.战斗时 或 战斗结束后，都可以通过插件指令得到值。
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
 * 测试方法：   直接进入战斗界面进行测试。
 * 测试结果：   战斗界面中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件为简单的变量值捕获，每次发生一次战斗行动后，进行数值
 *   计算。消耗几乎没有。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 与mog伤害统计浮动框 相适配。
 * [v1.2]
 * 修改了插件内部结构。
 * [v1.3]
 * 修复了多次战斗数据累加的bug。添加了插件指令。
 * [v1.4]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param 角色对敌人总伤害
 * @type variable
 * @desc 单场战斗玩家对敌人造成的所有伤害。实时给指定变量赋值。
 * @default 0
 * 
 * @param 角色对自己总伤害
 * @type variable
 * @desc 单场战斗玩家对自己造成的所有伤害。实时给指定变量赋值。
 * @default 0
 * 
 * @param 角色受到敌人总伤害
 * @type variable
 * @desc 单场战斗敌人对玩家造成的所有伤害。实时给指定变量赋值。
 * @default 0
 * 
 * @param 恢复生命量
 * @type variable
 * @desc 单场战斗玩家对自己恢复的总量。实时给指定变量赋值。
 * @default 0
 * 
 * @param 伤害总次数
 * @type variable
 * @desc 单场战斗玩家对敌人伤害的总次数。实时给指定变量赋值。
 * @default 0
 * 
 * @param 最大连击数
 * @type variable
 * @desc 单场战斗玩家最大的连击数量。该参数需要 伤害统计浮动框 插件支持。
 * @default 0
 * 
 * @param 最大连击伤害
 * @type variable
 * @desc 单场战斗玩家最大的连击伤害，注意连击数最大不一定伤害最大。该参数需要 伤害统计浮动框 插件支持。
 * @default 0
 * 
 * @param 单次最大伤害
 * @type variable
 * @desc 单场战斗玩家对敌人造成的单次最大伤害。实时给指定变量赋值。
 * @default 0
 * 
 * @param 魔法消耗总量
 * @type variable
 * @desc 单场战斗玩家消耗的总魔法数量。实时给指定变量赋值。
 * @default 0
 * 
 * @param 怒气消耗总量
 * @type variable
 * @desc 单场战斗玩家消耗的总怒气数量。实时给指定变量赋值。
 * @default 0
 * 
 * @param 躲避攻击次数
 * @type variable
 * @desc 包含物理闪避和魔法闪避的总次数。实时给指定变量赋值。
 * @default 0
 * 
 * @param 暴击次数
 * @type variable
 * @desc 单场战斗玩家对敌人造成的暴击次数。实时给指定变量赋值。
 * @default 0
 * 
 * @param 物理反击次数
 * @type variable
 * @desc 单场战斗玩家对敌人物理反击的次数。实时给指定变量赋值。
 * @default 0
 * 
 * @param 魔法反射次数
 * @type variable
 * @desc 单场战斗玩家对敌人魔法反射的暴击次数。实时给指定变量赋值。
 * @default 0
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BT（Battle_Total）
//		临时全局变量	DrillUp.g_BT_xxxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	战斗界面测试。
//		★性能测试消耗	太小，找不到插件的标记
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			单次战斗统计信息：
//				->hp情况
//				->技能消耗
//				->反击、反射、暴击、闪避
//				->插件指令
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.统计信息直接写入变量中。
//			2.目前只考虑单次信息，不包括多次战斗的各种因素，比如逃跑次数。胜利次数等。
//				
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleTotal = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BattleTotal');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_BT_variable_0 = Number(DrillUp.parameters["角色对敌人总伤害"] || 0);
    DrillUp.g_BT_variable_1 = Number(DrillUp.parameters["角色对自己总伤害"] || 0);
    DrillUp.g_BT_variable_2 = Number(DrillUp.parameters["角色受到敌人总伤害"] || 0);
    DrillUp.g_BT_variable_3 = Number(DrillUp.parameters["恢复生命量"] || 0);
    DrillUp.g_BT_variable_4 = Number(DrillUp.parameters["伤害总次数"] || 0);
    DrillUp.g_BT_variable_5 = Number(DrillUp.parameters["最大连击数"] || 0);
    DrillUp.g_BT_variable_6 = Number(DrillUp.parameters["最大连击伤害"] || 0);
    DrillUp.g_BT_variable_7 = Number(DrillUp.parameters["单次最大伤害"] || 0);
    DrillUp.g_BT_variable_8 = Number(DrillUp.parameters["魔法消耗总量"] || 0);
    DrillUp.g_BT_variable_9 = Number(DrillUp.parameters["怒气消耗总量"] || 0);
    DrillUp.g_BT_variable_10 = Number(DrillUp.parameters["躲避攻击次数"] || 0);
    DrillUp.g_BT_variable_11 = Number(DrillUp.parameters["暴击次数"] || 0);
    DrillUp.g_BT_variable_12 = Number(DrillUp.parameters["物理反击次数"] || 0);
    DrillUp.g_BT_variable_13 = Number(DrillUp.parameters["魔法反射次数"] || 0);

	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_BT_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BT_pluginCommand.call(this, command, args);
	if( command === ">单次战斗统计" ){
		
		if( args.length == 6 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "给予值" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				if( temp1 == "角色对敌人总伤害" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[0] );
				}
				if( temp1 == "角色对自己总伤害" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[1] );
				}
				if( temp1 == "角色受到敌人总伤害" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[2] );
				}
				if( temp1 == "恢复生命量" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[3] );
				}
				if( temp1 == "伤害总次数" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[4] );
				}
				if( temp1 == "最大连击数" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[5] );
				}
				if( temp1 == "最大连击伤害" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[6] );
				}
				if( temp1 == "单次最大伤害" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[7] );
				}
				if( temp1 == "魔法消耗总量" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[8] );
				}
				if( temp1 == "怒气消耗总量" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[9] );
				}
				if( temp1 == "躲避攻击次数" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[10] );
				}
				if( temp1 == "暴击次数" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[11] );
				}
				if( temp1 == "物理反击次数" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[12] );
				}
				if( temp1 == "魔法反射次数" ){
					$gameVariables.setValue( Number(temp2), $gameSystem._drill_BT_data[13] );
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
DrillUp.g_BT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BT_sys_initialize.call(this);
	this.drill_BT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BT_saveEnabled == true ){	
		$gameSystem.drill_BT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BT_initSysData();
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
Game_System.prototype.drill_BT_initSysData = function() {
	this.drill_BT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BT_checkSysData = function() {
	this.drill_BT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BT_initSysData_Private = function() {
	this._drill_BT_data = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0];
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BT_data == undefined ){
		this.drill_BT_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（不含容器）
};


//=============================================================================
// ** 战斗界面
//=============================================================================
//==============================
// * 战斗 - 新战斗清零
//==============================
var _drill_BT_onBattleStart = Game_System.prototype.onBattleStart;
Game_System.prototype.onBattleStart = function() {
	_drill_BT_onBattleStart.call(this);
    $gameSystem._drill_BT_data = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0]; 
	$gameVariables.setValue(DrillUp.g_BT_variable_0,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_1,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_2,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_3,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_4,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_5,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_6,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_7,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_8,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_9,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_10,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_11,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_12,0 );
	$gameVariables.setValue(DrillUp.g_BT_variable_13,0 );
}
//==============================
// * 战斗 - 闪避情况
//==============================
var _drill_BT_displayEvasion = Window_BattleLog.prototype.displayEvasion;
Window_BattleLog.prototype.displayEvasion = function(target) {
	_drill_BT_displayEvasion.call(this,target);
	if (target.result().physical) {
		if (target.isActor()) {
			$gameSystem._drill_BT_data[10] += 1;
			$gameVariables.setValue(DrillUp.g_BT_variable_10,$gameSystem._drill_BT_data[10]);
		}
	}
}
//==============================
// * 战斗 - 暴击情况
//==============================
var _drill_BT_displayCritical = Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
	_drill_BT_displayCritical.call(this,target);
	if (target.result().critical) {
		if (target.isActor()) {
			// 敌人对角色暴击
		}else{
			$gameSystem._drill_BT_data[11] += 1;
			$gameVariables.setValue(DrillUp.g_BT_variable_11,$gameSystem._drill_BT_data[11]);
		}
	}
}
//==============================
// * 战斗 - 物理反击
//==============================
var _drill_BT_displayCounter = Window_BattleLog.prototype.displayCounter;
Window_BattleLog.prototype.displayCounter = function(target) {
	_drill_BT_displayCounter.call(this,target);
	if (target.isActor()) {
		$gameSystem._drill_BT_data[12] += 1;
		$gameVariables.setValue(DrillUp.g_BT_variable_12,$gameSystem._drill_BT_data[12]);
	}
}
//==============================
// * 战斗 - 魔法反射
//==============================
var _drill_BT_displayReflection = Window_BattleLog.prototype.displayReflection;
Window_BattleLog.prototype.displayReflection = function(target) {
	_drill_BT_displayReflection.call(this,target);
	if (target.isActor()) {
		$gameSystem._drill_BT_data[13] += 1;
		$gameVariables.setValue(DrillUp.g_BT_variable_13,$gameSystem._drill_BT_data[13]);
	}
}

//=============================================================================
// ** hp情况
//=============================================================================
var _drill_BT_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
	_drill_BT_executeHpDamage.call(this,target, value);
	
	// > 伤害
	if (value > 0) {
		if (this.subject().isActor() && target.isEnemy()) {
			$gameSystem._drill_BT_data[0] += value;
			$gameVariables.setValue(DrillUp.g_BT_variable_0,$gameSystem._drill_BT_data[0]);	//总伤害
			$gameSystem._drill_BT_data[4] += 1;
			$gameVariables.setValue(DrillUp.g_BT_variable_4,$gameSystem._drill_BT_data[4]);	//伤害次数
			if ( $gameSystem._drill_BT_data[7] < value ) {
				$gameSystem._drill_BT_data[7] = value;
				$gameVariables.setValue(DrillUp.g_BT_variable_7,$gameSystem._drill_BT_data[7]);//单次最大伤害
			}
		}
		else if (this.subject().isActor() && target.isActor()) {
			$gameSystem._drill_BT_data[1] += value;
			$gameVariables.setValue(DrillUp.g_BT_variable_1,$gameSystem._drill_BT_data[1]);
		}
		else if (this.subject().isEnemy() && target.isActor()) {
			$gameSystem._drill_BT_data[2] += value;
			$gameVariables.setValue(DrillUp.g_BT_variable_2,$gameSystem._drill_BT_data[2]);
		};
	}
	// > 治愈
	if (value < 0) {
		if (this.subject().isActor() && target.isActor()) {
			$gameSystem._drill_BT_data[3] -= value;
			$gameVariables.setValue(DrillUp.g_BT_variable_3,$gameSystem._drill_BT_data[3]);
		}
	}
	
	// > mog伤害统计兼容
	if( Imported.MOG_ComboCounter && $gameTemp.combo_data ){
		if( Moghunter.combo_allies ){
			if ( $gameSystem._drill_BT_data[5] < $gameTemp.combo_data[0][1] ) {
				$gameSystem._drill_BT_data[5] = $gameTemp.combo_data[0][1];
				$gameVariables.setValue(DrillUp.g_BT_variable_5,$gameSystem._drill_BT_data[5]);
			}
			if ( $gameSystem._drill_BT_data[6] < $gameTemp.combo_data[0][2] ) {
				$gameSystem._drill_BT_data[6] = $gameTemp.combo_data[0][2];
				$gameVariables.setValue(DrillUp.g_BT_variable_6,$gameSystem._drill_BT_data[6]);
			}
		}else{
			if ( $gameSystem._drill_BT_data[5] < $gameTemp.combo_data[1] ) {
				$gameSystem._drill_BT_data[5] = $gameTemp.combo_data[1];
				$gameVariables.setValue(DrillUp.g_BT_variable_5,$gameSystem._drill_BT_data[5]);
			}
			if ( $gameSystem._drill_BT_data[6] < $gameTemp.combo_data[2] ) {
				$gameSystem._drill_BT_data[6] = $gameTemp.combo_data[2];
				$gameVariables.setValue(DrillUp.g_BT_variable_6,$gameSystem._drill_BT_data[6]);
			}
		}
	}
};	
//=============================================================================
// ** 技能消耗（Game_Actor）
//=============================================================================
var _drill_BT_paySkillCost = Game_Actor.prototype.paySkillCost;
Game_Actor.prototype.paySkillCost = function(skill) {
	_drill_BT_paySkillCost.call(this,skill);
	// > mp消耗
	$gameSystem._drill_BT_data[8] += this.skillMpCost(skill);
	$gameVariables.setValue(DrillUp.g_BT_variable_8,$gameSystem._drill_BT_data[8]);
	// > tp消耗
	$gameSystem._drill_BT_data[9] += this.skillTpCost(skill);
	$gameVariables.setValue(DrillUp.g_BT_variable_9,$gameSystem._drill_BT_data[9]);
};


	