//=============================================================================
// Drill_SkillRecorder.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        技能 - 技能记录器
 * @author Drill_up
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_SkillRecorder +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 一些简单物品、技能的插件指令或变量操作。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面。
 *   只给变量作赋值，不作多余复杂操作。
 * 2.该插件的逻辑比较绕，去看看 "4.技能 > 攻击者与被攻击者.docx"。
 * 记录方式：
 *   (1.注意，记录分为 技能释放 与 物品使用 两种。
 *   (2.菜单中，使用物品/释放技能 都是 我方->我方 ，
 *      所以目标敌人ID和队伍序号都会赋值0。
 *      菜单中，使用物品时默认为队长使用物品。
 *      如果有队员拥有药理知识特殊属性，则该能力最强队员会成为使用物品的人。
 *   (3.如果物品/技能作用于多个对象，则赋值为最后一个作用的对象ID或者序号。
 *   (4.不管 技能释放/物品使用 成功与否，数据都会被记录下来。
 *      不管 技能作用于多少单位、多少连击，记录数据都只被认定为一次技能。
 *      并且开始释放前一瞬间就会被赋值，技能/物品的公共事件可以直接取值来用。
 * 细节：
 *   (1.技能中配置的公共事件，只能执行一次。与连击、多目标无关。
 *      技能如果失败了，技能中的公共事件不会被执行。
 *      因此你可以放心在 公共事件 中获取上一次的施法技能ID以及施法者ID。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 技能使用
 * 如果你想节约变量的绑定，可以使用插件指令直接获取：
 * 
 * 插件指令：>技能记录器 : 敌方 : 获取技能使用次数 : 21 : 15
 * 插件指令：>技能记录器 : 敌方 : 上一个施法的技能ID : 21
 * 
 * 插件指令：>技能记录器 : 我方 : 获取技能使用次数 : 21 : 15
 * 插件指令：>技能记录器 : 我方 : 上一个施法的技能ID : 21
 * 
 * 我方->我方：
 * 插件指令：>技能记录器 : 我方 : 上一个施法者ID : 21
 * 插件指令：>技能记录器 : 我方 : 上一个施法者队伍序号 : 21
 * 插件指令：>技能记录器 : 我方 : 上一个目标角色ID : 21
 * 插件指令：>技能记录器 : 我方 : 上一个目标我方队伍序号 : 21
 * 
 * 我方->敌方：
 * 插件指令：>技能记录器 : 我方 : 上一个施法者ID : 21
 * 插件指令：>技能记录器 : 我方 : 上一个施法者队伍序号 : 21
 * 插件指令：>技能记录器 : 我方 : 上一个目标敌人ID : 21
 * 插件指令：>技能记录器 : 我方 : 上一个目标敌方队伍序号 : 21
 * 
 * 敌方->我方：
 * 插件指令：>技能记录器 : 敌方 : 上一个施法者ID : 21
 * 插件指令：>技能记录器 : 敌方 : 上一个施法者队伍序号 : 21
 * 插件指令：>技能记录器 : 敌方 : 上一个目标角色ID : 21
 * 插件指令：>技能记录器 : 敌方 : 上一个目标我方队伍序号 : 21
 * 
 * 敌方->敌方：
 * 插件指令：>技能记录器 : 敌方 : 上一个施法者ID : 21
 * 插件指令：>技能记录器 : 敌方 : 上一个施法者队伍序号 : 21
 * 插件指令：>技能记录器 : 敌方 : 上一个目标敌人ID : 21
 * 插件指令：>技能记录器 : 敌方 : 上一个目标敌方队伍序号 : 21
 * 
 * 1."获取技能使用次数"前面的数值为赋值的变量id，后面的为技能id。
 * 2.施法者 和 施法目标 分别指 技能产生对象 和 技能作用对象。
 * 3."上一个"指令后面的数字，为赋值的变量id。
 *   没作用到的，会被赋值0，表示没有对象。
 * 4.由于阵营分为 我方和敌方，你需要注意区分，相互存在下面4种情况：
 *       我方->我方，我方->敌方，敌方->我方，敌方->敌方
 *   举个例子，量子妹 释放技能攻击 小爱丽丝(骑士枪)，
 *   则 我方-上一个施法者ID 被赋值 5，我方-上一个施法目标敌人ID 被赋值 1。
 *   量子妹 释放技能治愈 珍妮，
 *   则 我方-上一个施法者ID 被赋值 5，我方-上一个施法目标角色ID 被赋值 6。
 *   具体还是去看看文档 "4.技能 > 攻击者与被攻击者.docx"，纯文字说明有些难理解。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 物品使用
 * 如果你想节约变量的绑定，可以使用插件指令直接获取：
 * 
 * 插件指令：>物品记录器 : 获取物品使用次数 : 21 : 15
 * 
 * 插件指令：>物品记录器 : 上一个使用的物品ID : 21
 * 插件指令：>物品记录器 : 上一个使用者ID : 21
 * 插件指令：>物品记录器 : 上一个使用者队伍序号 : 21
 * 插件指令：>物品记录器 : 上一个作用目标角色ID : 21
 * 插件指令：>物品记录器 : 上一个作用目标我方队伍序号 : 21
 * 插件指令：>物品记录器 : 上一个作用目标敌人ID : 21
 * 插件指令：>物品记录器 : 上一个作用目标敌方队伍序号 : 21
 * 
 * 1."获取物品使用次数"前面的数值为赋值的变量id，后面的为物品id。
 * 2.使用者 和 使用目标 分别指 物品使用对象 和 物品作用对象。
 * 3."上一个"指令后面的数字，为赋值的变量id。
 *   没作用到的，会被赋值0，表示没有对象。
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
 * 测试方法：   正常战斗，测试性能消耗
 * 测试结果：   战斗界面的消耗为：【5ms以下】
 * 测试方法2：  菜单界面下释放技能，记录消耗。
 * 测试结果2：  菜单界面的消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次执行，且时间复杂度太低，性能消耗可以完全忽略不计。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了"敌方 : 上一个施法者ID"获取不到的bug。
 * 修改了注释说明，防止理解混淆。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param ---物品使用---
 * @default
 * 
 * @param 上一个使用的物品ID
 * @parent ---物品使用---
 * @type variable
 * @desc 该设置会绑定到变量。使用物品后指定变量会被赋值物品ID。没有时值为0。
 * @default 0
 * 
 * @param 上一个使用者ID
 * @parent ---物品使用---
 * @type variable
 * @desc 该设置会绑定到变量。使用物品后指定变量会被赋值使用者角色ID。没有时值为0。
 * @default 0
 * 
 * @param 上一个使用者队伍序号
 * @parent ---物品使用---
 * @type variable
 * @desc 该设置会绑定到变量。使用物品后指定变量会被赋值使用者队伍序号。没有时值为0。
 * @default 0
 * 
 * @param 上一个作用目标角色ID
 * @parent ---物品使用---
 * @type variable
 * @desc 该设置会绑定到变量。使用物品后指定变量会被赋值目标角色ID。没有时值为0。
 * @default 0
 * 
 * @param 上一个作用目标我方队伍序号
 * @parent ---物品使用---
 * @type variable
 * @desc 该设置会绑定到变量。使用物品后指定变量会被赋值目标我方队伍序号。没有时值为0。
 * @default 0
 * 
 * @param 上一个作用目标敌人ID
 * @parent ---物品使用---
 * @type variable
 * @desc 该设置会绑定到变量。使用物品后指定变量会被赋值目标敌人ID。没有时值为0。
 * @default 0
 * 
 * @param 上一个作用目标敌方队伍序号
 * @parent ---物品使用---
 * @type variable
 * @desc 该设置会绑定到变量。使用物品后指定变量会被赋值目标敌方队伍序号。没有时值为0。
 * @default 0
 * 
 * @param ---敌方技能释放---
 * @default
 *
 * @param 每次新战斗时是否清零敌方次数
 * @parent ---敌方技能释放---
 * @type boolean
 * @on 清零
 * @off 不清零
 * @desc 每次玩家进入新的战斗时，清零敌方释放技能的次数。
 * @default true
 * 
 * @param 敌方上一个施法的技能ID
 * @parent ---敌方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值技能ID。没有时值为0。
 * @default 0
 * 
 * @param 敌方上一个施法者ID
 * @parent ---敌方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值使用者角色ID。没有时值为0。
 * @default 0
 * 
 * @param 敌方上一个施法者队伍序号
 * @parent ---敌方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值使用者队伍序号。没有时值为0。
 * @default 0
 * 
 * @param 敌方上一个目标角色ID
 * @parent ---敌方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值目标角色ID。没有时值为0。
 * @default 0
 * 
 * @param 敌方上一个目标我方队伍序号
 * @parent ---敌方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值目标我方队伍序号。没有时值为0。
 * @default 0
 * 
 * @param 敌方上一个目标敌人ID
 * @parent ---敌方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值目标敌人ID。没有时值为0。
 * @default 0
 * 
 * @param 敌方上一个目标敌方队伍序号
 * @parent ---敌方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值目标敌方队伍序号。没有时值为0。
 * @default 0
 *  
 * @param ---我方技能释放---
 * @default
 *
 * @param 我方上一个施法的技能ID
 * @parent ---我方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值技能ID。没有时值为0。
 * @default 0
 * 
 * @param 我方上一个施法者ID
 * @parent ---我方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值使用者角色ID。没有时值为0。
 * @default 0
 * 
 * @param 我方上一个施法者队伍序号
 * @parent ---我方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值使用者队伍序号。没有时值为0。
 * @default 0
 * 
 * @param 我方上一个目标角色ID
 * @parent ---我方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值目标角色ID。没有时值为0。
 * @default 0
 * 
 * @param 我方上一个目标我方队伍序号
 * @parent ---我方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值目标我方队伍序号。没有时值为0。
 * @default 0
 * 
 * @param 我方上一个目标敌人ID
 * @parent ---我方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值目标敌人ID。没有时值为0。
 * @default 0
 * 
 * @param 我方上一个目标敌方队伍序号
 * @parent ---我方技能释放---
 * @type variable
 * @desc 该设置会绑定到变量。释放技能后指定变量会被赋值目标敌方队伍序号。没有时值为0。
 * @default 0
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SkR（Skill_Recorder）
//		临时全局变量	DrillUp.g_SkR_xxx
//		临时局部变量	$gameTemp._drill_SkR_xxx
//		存储数据变量	$gameSystem._drill_SkR_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	正常执行游戏流程
//		★性能测试消耗	5ms以下
//		★最坏情况		无
//		★备注			性能测试列表中找不到该插件名，后来通过文本查找，找到发现消耗为0ms。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			物品记录器：
//				->记录上一个使用的物品、角色、队伍序号
//				->获取物品、技能的使用次数
//				->技能分为我方和敌方
//				->我方对我方、我方对敌方 指向型概念分类
//				->多单位、连击 都被认定为一次技能
//				->每次伤害都执行公共事件	x（暂不考虑）
//
//		★必要注意事项：
//			1.释放技能		战斗界面：Game_Action.prototype.apply（所有动作都经过此方法）
//							菜单界面：Game_Action.prototype.apply
//			  使用物品：	战斗界面：Game_Action.prototype.apply
//							菜单界面：Game_Action.prototype.apply
//			2.一次Action可以apply多次，是 连击 的原理。
//			  并且apply的目标可以不一样，是 全体/随机目标 的原理。
//				
//		★其它说明细节：
//			1.原先以为菜单和战斗需要分开处理，后来才发现都经过了action。
//			  每次 攻击/防御/闪避/反击/反射/使用物品/掩护【必然】使用action，不包括 逃跑。
//
//		★存在的问题：
//			1.使用事件来区分上一个记录可能会存在敌人释放技能A，我方释放技能A，则记录仪会被捕获两次。
//			  （不过点到为止就好）
//			

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_SkillRecorder = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_SkillRecorder');
	
	
    DrillUp.g_SkR_varLast_i = Number(DrillUp.parameters["上一个使用的物品ID"] || 0);
    DrillUp.g_SkR_varLast_i_from_aid = Number(DrillUp.parameters["上一个使用者ID"] || 0);
    DrillUp.g_SkR_varLast_i_from_aindex = Number(DrillUp.parameters["上一个使用者队伍序号"] || 0);
    DrillUp.g_SkR_varLast_i_tar_aid = Number(DrillUp.parameters["上一个作用目标角色ID"] || 0);
    DrillUp.g_SkR_varLast_i_tar_aindex = Number(DrillUp.parameters["上一个作用目标我方队伍序号"] || 0);
    DrillUp.g_SkR_varLast_i_tar_eid = Number(DrillUp.parameters["上一个作用目标敌人ID"] || 0);
    DrillUp.g_SkR_varLast_i_tar_eindex = Number(DrillUp.parameters["上一个作用目标敌方队伍序号"] || 0);
	
	DrillUp.g_SkR_varLast_clear = String(DrillUp.parameters["每次新战斗时是否清零敌方次数"] || "true") == "true";
    DrillUp.g_SkR_varLast_sa = Number(DrillUp.parameters["敌方上一个施法的技能ID"] || 0);
    DrillUp.g_SkR_varLast_sa_from_id = Number(DrillUp.parameters["敌方上一个施法者ID"] || 0);
    DrillUp.g_SkR_varLast_sa_from_index = Number(DrillUp.parameters["敌方上一个施法者队伍序号"] || 0);
    DrillUp.g_SkR_varLast_sa_tar_aid = Number(DrillUp.parameters["敌方上一个目标角色ID"] || 0);
    DrillUp.g_SkR_varLast_sa_tar_aindex = Number(DrillUp.parameters["敌方上一个目标我方队伍序号"] || 0);
    DrillUp.g_SkR_varLast_sa_tar_eid = Number(DrillUp.parameters["敌方上一个目标敌人ID"] || 0);
    DrillUp.g_SkR_varLast_sa_tar_eindex = Number(DrillUp.parameters["敌方上一个目标敌方队伍序号"] || 0);
	
    DrillUp.g_SkR_varLast_se = Number(DrillUp.parameters["我方上一个施法的技能ID"] || 0);
    DrillUp.g_SkR_varLast_se_from_id = Number(DrillUp.parameters["我方上一个施法者ID"] || 0);
    DrillUp.g_SkR_varLast_se_from_index = Number(DrillUp.parameters["我方上一个施法者队伍序号"] || 0);
    DrillUp.g_SkR_varLast_se_tar_aid = Number(DrillUp.parameters["我方上一个目标角色ID"] || 0);
    DrillUp.g_SkR_varLast_se_tar_aindex = Number(DrillUp.parameters["我方上一个目标我方队伍序号"] || 0);
    DrillUp.g_SkR_varLast_se_tar_eid = Number(DrillUp.parameters["我方上一个目标敌人ID"] || 0);
    DrillUp.g_SkR_varLast_se_tar_eindex = Number(DrillUp.parameters["我方上一个目标敌方队伍序号"] || 0);


//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_SkR_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SkR_pluginCommand.call(this, command, args);
	if( command === ">物品记录器" ){
		
		if( args.length == 6 ){
			var type = String(args[1]);
			var temp1 = Number(args[3]);
			var temp2 = Number(args[5]);
			if( type == "获取物品使用次数" ){
				$gameVariables.setValue( temp1 , $gameSystem.drill_SkR_getItemUsedCount(temp2) );
				return;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = Number(args[3]);
			if( type == "上一个使用的物品ID" ){
				$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_i );
				return;
			}
			if( type == "上一个使用者ID" ){
				$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_i_from_aid );
				return;
			}
			if( type == "上一个使用者队伍序号" ){
				$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_i_from_aindex );
				return;
			}
			if( type == "上一个作用目标角色ID" ){
				$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_i_tar_aid );
				return;
			}
			if( type == "上一个作用目标我方队伍序号" ){
				$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_i_tar_aindex );
				return;
			}
			if( type == "上一个作用目标敌人ID" ){
				$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_i_tar_eid );
				return;
			}
			if( type == "上一个作用目标敌方队伍序号" ){
				$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_i_tar_eindex );
				return;
			}
		}
		
		if( args.length == 8 ){
			var group = String(args[1]);
			var type = String(args[3]);
			var temp1 = Number(args[5]);
			var temp2 = Number(args[7]);
			if( group == "我方" ){
				if( type == "获取技能使用次数" ){
					$gameVariables.setValue( temp1 , $gameSystem.drill_SkR_getActorSkillUsedCount(temp2) );
					return;
				}
			}
			if( group == "敌方" ){
				if( type == "获取技能使用次数" ){
					$gameVariables.setValue( temp1 , $gameSystem.drill_SkR_getEnemySkillUsedCount(temp2) );
					return;
				}
			}
		}
		if( args.length == 6 ){
			var group = String(args[1]);
			var type = String(args[3]);
			var temp1 = Number(args[5]);
			if( group == "我方" ){
				if( type == "上一个施法的技能ID" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_sa );
					return;
				}
				if( type == "上一个施法者ID" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_sa_from_id );
					return;
				}
				if( type == "上一个施法者队伍序号" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_sa_from_index );
					return;
				}
				if( type == "上一个目标角色ID" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_sa_tar_aid );
					return;
				}
				if( type == "上一个目标我方队伍序号" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_sa_tar_aindex );
					return;
				}
				if( type == "上一个目标敌人ID" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_sa_tar_eid );
					return;
				}
				if( type == "上一个目标敌方队伍序号" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_sa_tar_eindex );
					return;
				}
			}
			if( group == "敌方" ){
				if( type == "上一个施法的技能ID" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_se );
					return;
				}
				if( type == "上一个施法者ID" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_se_from_id );
					return;
				}
				if( type == "上一个施法者队伍序号" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_se_from_index );
					return;
				}
				if( type == "上一个目标角色ID" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_se_tar_aid );
					return;
				}
				if( type == "上一个目标我方队伍序号" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_se_tar_aindex );
					return;
				}
				if( type == "上一个目标敌人ID" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_se_tar_eid );
					return;
				}
				if( type == "上一个目标敌方队伍序号" ){
					$gameVariables.setValue( temp1 , $gameSystem._drill_SkR_se_tar_eindex );
					return;
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
DrillUp.g_SkR_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SkR_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SkR_sys_initialize.call(this);
	this.drill_SkR_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SkR_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_SkR_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_SkR_saveEnabled == true ){	
		$gameSystem.drill_SkR_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_SkR_initSysData();
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
Game_System.prototype.drill_SkR_initSysData = function() {
	this.drill_SkR_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_SkR_checkSysData = function() {
	this.drill_SkR_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_SkR_initSysData_Private = function() {
	
	this._drill_SkR_i_usedCount = [];		//物品次数
	this._drill_SkR_sa_usedCount = [];		//我方技能次数
	this._drill_SkR_se_usedCount = [];		//敌方技能次数
	//（初始为空容器，不需要初始化）
	
	this._drill_SkR_i = 0;					//上一个物品
	this._drill_SkR_i_from_aid = 0;			//上一个使用者ID
	this._drill_SkR_i_from_aindex = 0;		//上一个使用者队伍序号
	this._drill_SkR_i_tar_aid = 0;			//上一个作用目标角色ID
	this._drill_SkR_i_tar_aindex = 0;		//上一个作用目标我方队伍序号
	this._drill_SkR_i_tar_eid = 0;			//上一个作用目标敌人ID
	this._drill_SkR_i_tar_eindex = 0;		//上一个作用目标敌方队伍序号
	
	this._drill_SkR_sa = 0;					//我方 上一个施法的技能ID
	this._drill_SkR_sa_from_id = 0;			//我方 上一个施法者ID
	this._drill_SkR_sa_from_index = 0;		//我方 上一个施法者队伍序号
	this._drill_SkR_sa_tar_aid = 0;			//我方 上一个目标角色ID
	this._drill_SkR_sa_tar_aindex = 0;		//我方 上一个目标我方队伍序号
	this._drill_SkR_sa_tar_eid = 0;			//我方 上一个目标敌人ID
	this._drill_SkR_sa_tar_eindex = 0;		//我方 上一个目标敌方队伍序号
	
	this._drill_SkR_se = 0;					//敌方 上一个施法的技能ID
	this._drill_SkR_se_from_id = 0;			//敌方 上一个施法者ID
	this._drill_SkR_se_from_index = 0;		//敌方 上一个施法者队伍序号
	this._drill_SkR_se_tar_aid = 0;			//敌方 上一个目标角色ID
	this._drill_SkR_se_tar_aindex = 0;		//敌方 上一个目标我方队伍序号
	this._drill_SkR_se_tar_eid = 0;			//敌方 上一个目标敌人ID
	this._drill_SkR_se_tar_eindex = 0;		//敌方 上一个目标敌方队伍序号
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SkR_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SkR_i_usedCount == undefined ){
		this.drill_SkR_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器在物品/技能使用时才赋值，且从0开始计数，不需要空判断）
};
//==============================
// * 物品 - 数量修改
//==============================
Game_System.prototype.drill_SkR_addItemUsedCount = function( item_id , count ) {
	if( this._drill_SkR_i_usedCount[item_id] == undefined ){
		this._drill_SkR_i_usedCount[item_id] = 0;
	}
	this._drill_SkR_i_usedCount[item_id] += count;
};	
//==============================
// * 物品 - 获取数量
//==============================
Game_System.prototype.drill_SkR_getItemUsedCount = function( item_id ) {
	return (this._drill_SkR_i_usedCount[item_id] || 0);
};
//==============================
// * 技能 - 我方数量修改
//==============================
Game_System.prototype.drill_SkR_addActorSkillUsedCount = function( skill_id , count ) {
	if( this._drill_SkR_sa_usedCount[skill_id] == undefined ){
		this._drill_SkR_sa_usedCount[skill_id] = 0;
	}
	this._drill_SkR_sa_usedCount[skill_id] += count;
};	
//==============================
// * 技能 - 我方获取数量
//==============================
Game_System.prototype.drill_SkR_getActorSkillUsedCount = function( skill_id ) {
	return (this._drill_SkR_sa_usedCount[skill_id] || 0);
};
//==============================
// * 技能 - 敌方数量修改
//==============================
Game_System.prototype.drill_SkR_addEnemySkillUsedCount = function( skill_id , count ) {
	if( this._drill_SkR_se_usedCount[skill_id] == undefined ){
		this._drill_SkR_se_usedCount[skill_id] = 0;
	}
	this._drill_SkR_se_usedCount[skill_id] += count;
};	
//==============================
// * 技能 - 敌方获取数量
//==============================
Game_System.prototype.drill_SkR_getEnemySkillUsedCount = function( skill_id ) {
	return (this._drill_SkR_se_usedCount[skill_id] || 0);
};

//=============================================================================
// ** 使用物品
//=============================================================================
//==============================
// * 记录次数
//==============================
var _drill_SkR_i_consumeItem = Game_Party.prototype.consumeItem;
Game_Party.prototype.consumeItem = function(item) {
	if (DataManager.isItem(item)){
		$gameSystem.drill_SkR_addItemUsedCount( item.id , 1 );	//记录次数
		
		$gameSystem._drill_SkR_i = item.id;						//上一个使用的物品ID
		$gameVariables.setValue( DrillUp.g_SkR_varLast_i,$gameSystem._drill_SkR_i );
	}
	_drill_SkR_i_consumeItem.call(this,item);
};

//==============================
// * 战斗界面 - 使用物品
//==============================
var _drill_SkR_i_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	this.drill_SkR_applyItemRecord(target);
	_drill_SkR_i_apply.call(this,target);
}
Game_Action.prototype.drill_SkR_applyItemRecord = function(target) {
	if( !this.isItem() ){ return }
	if( this._drill_SkR_action_applyed ){ return }
	this._drill_SkR_action_applyed = true;
	
	$gameSystem._drill_SkR_i_from_aid = this.subject()._actorId;
	$gameSystem._drill_SkR_i_from_aindex = this.subject().index()+1;
	if( target.isActor() ){
		$gameSystem._drill_SkR_i_tar_aid = target._actorId;
		$gameSystem._drill_SkR_i_tar_aindex = target.index()+1;
		$gameSystem._drill_SkR_i_tar_eid = 0;
		$gameSystem._drill_SkR_i_tar_eindex = 0;
		//alert( $gameSystem._drill_SkR_i_from_aid +" 角色 "+ target._actorId );
	}else{
		$gameSystem._drill_SkR_i_tar_aid = 0;
		$gameSystem._drill_SkR_i_tar_aindex = 0;
		$gameSystem._drill_SkR_i_tar_eid = target._enemyId;
		$gameSystem._drill_SkR_i_tar_eindex = target.index()+1;
		//alert( $gameSystem._drill_SkR_i_from_aid +" 敌人 "+ target._enemyId );
	}
	
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_from_aid,   $gameSystem._drill_SkR_i_from_aid );	//变量赋值
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_from_aindex,$gameSystem._drill_SkR_i_from_aindex );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_tar_aid,    $gameSystem._drill_SkR_i_tar_aid );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_tar_aindex, $gameSystem._drill_SkR_i_tar_aindex );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_tar_eid,    $gameSystem._drill_SkR_i_tar_eid );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_tar_eindex, $gameSystem._drill_SkR_i_tar_eindex );
}
//==============================
// * 菜单界面 - 使用物品【菜单界面也直接通过建立Game_Action来进行apply】
//==============================
/*
var _drill_SkR_i_useItem = Scene_Item.prototype.useItem;
Scene_Item.prototype.useItem = function() {
	this.drill_SkR_useItemRecord();
	_drill_SkR_i_useItem.call(this);
};
Scene_Item.prototype.drill_SkR_useItemRecord = function() {
	if( !this.item() || !DataManager.isItem(this.item()) ){ return }
	
	$gameSystem._drill_SkR_i_from_aid = this.user()._actorId;
	$gameSystem._drill_SkR_i_from_aindex = this.user().index()+1;
	var targets = this.itemTargetActors();
	if( targets.length == 0 ){
		$gameSystem._drill_SkR_i_tar_aid = 0;
		$gameSystem._drill_SkR_i_tar_aindex = 0;
	}else{
		$gameSystem._drill_SkR_i_tar_aid = targets[ targets.length-1 ]._actorId;	//菜单界面全体中最后一个被作用的对象
		$gameSystem._drill_SkR_i_tar_aindex = targets[ targets.length-1 ].index()+1;
	}
	$gameSystem._drill_SkR_i_tar_eid = 0;		//菜单界面只有我方->我方
	$gameSystem._drill_SkR_i_tar_eindex = 0;
	
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_from_aid,   $gameSystem._drill_SkR_i_from_aid );	//变量赋值
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_from_aindex,$gameSystem._drill_SkR_i_from_aindex );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_tar_aid,    $gameSystem._drill_SkR_i_tar_aid );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_tar_aindex, $gameSystem._drill_SkR_i_tar_aindex );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_tar_eid,    $gameSystem._drill_SkR_i_tar_eid );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_i_tar_eindex, $gameSystem._drill_SkR_i_tar_eindex );
}*/

//=============================================================================
// ** 释放技能
//=============================================================================
//==============================
// * 战斗前敌人次数清零
//==============================
var _drill_SkR_s_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
	if( DrillUp.g_SkR_varLast_clear ){
		$gameSystem._drill_SkR_se_usedCount = [];
	}
	_drill_SkR_s_startBattle.call(this);
}


//==============================
// * 战斗界面 - 释放技能
//==============================
var _drill_SkR_s_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	this.drill_SkR_applySkillRecord(target);
	_drill_SkR_s_apply.call(this,target);
}
Game_Action.prototype.drill_SkR_applySkillRecord = function(target) {
	if( !this.isSkill() ){ return }
	if( this._drill_SkR_action_applyed ){ return }
	this._drill_SkR_action_applyed = true;
	
	if( this.subject().isActor() ){	//我方技能
		$gameSystem._drill_SkR_sa = this.item().id;
		$gameSystem._drill_SkR_sa_from_id = this.subject()._actorId;
		$gameSystem._drill_SkR_sa_from_index = this.subject().index()+1;
		if( target.isActor() ){
			$gameSystem._drill_SkR_sa_tar_aid = target._actorId;
			$gameSystem._drill_SkR_sa_tar_aindex = target.index()+1;
			$gameSystem._drill_SkR_sa_tar_eid = 0;
			$gameSystem._drill_SkR_sa_tar_eindex = 0;
		}else{
			$gameSystem._drill_SkR_sa_tar_aid = 0;
			$gameSystem._drill_SkR_sa_tar_aindex = 0;
			$gameSystem._drill_SkR_sa_tar_eid = target._enemyId;
			$gameSystem._drill_SkR_sa_tar_eindex = target.index()+1;
		}
	
		$gameSystem.drill_SkR_addActorSkillUsedCount( this.item().id , 1 );	//记录次数
		
		$gameVariables.setValue( DrillUp.g_SkR_varLast_sa,           $gameSystem._drill_SkR_sa );	//变量赋值
		$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_from_id,   $gameSystem._drill_SkR_sa_from_id );
		$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_from_index,$gameSystem._drill_SkR_sa_from_index );
		$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_tar_aid,   $gameSystem._drill_SkR_sa_tar_aid );
		$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_tar_aindex,$gameSystem._drill_SkR_sa_tar_aindex );
		$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_tar_eid,   $gameSystem._drill_SkR_sa_tar_eid );
		$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_tar_eindex,$gameSystem._drill_SkR_sa_tar_eindex );
	
	}else{	//敌方技能
		$gameSystem._drill_SkR_se = this.item().id;
		$gameSystem._drill_SkR_se_from_id = this.subject()._enemyId;
		$gameSystem._drill_SkR_se_from_index = this.subject().index()+1;
		if( target.isActor() ){
			$gameSystem._drill_SkR_se_tar_aid = target._actorId;
			$gameSystem._drill_SkR_se_tar_aindex = target.index()+1;
			$gameSystem._drill_SkR_se_tar_eid = 0;
			$gameSystem._drill_SkR_se_tar_eindex = 0;
		}else{
			$gameSystem._drill_SkR_se_tar_aid = 0;
			$gameSystem._drill_SkR_se_tar_aindex = 0;
			$gameSystem._drill_SkR_se_tar_eid = target._enemyId;
			$gameSystem._drill_SkR_se_tar_eindex = target.index()+1;
		}
	
		$gameSystem.drill_SkR_addEnemySkillUsedCount( this.item().id , 1 );	//记录次数
		
		$gameVariables.setValue( DrillUp.g_SkR_varLast_se,           $gameSystem._drill_SkR_se );	//变量赋值
		$gameVariables.setValue( DrillUp.g_SkR_varLast_se_from_id,   $gameSystem._drill_SkR_se_from_id );
		$gameVariables.setValue( DrillUp.g_SkR_varLast_se_from_index,$gameSystem._drill_SkR_se_from_index );
		$gameVariables.setValue( DrillUp.g_SkR_varLast_se_tar_aid,   $gameSystem._drill_SkR_se_tar_aid );
		$gameVariables.setValue( DrillUp.g_SkR_varLast_se_tar_aindex,$gameSystem._drill_SkR_se_tar_aindex );
		$gameVariables.setValue( DrillUp.g_SkR_varLast_se_tar_eid,   $gameSystem._drill_SkR_se_tar_eid );
		$gameVariables.setValue( DrillUp.g_SkR_varLast_se_tar_eindex,$gameSystem._drill_SkR_se_tar_eindex );
		
	}
	
}
//==============================
// * 菜单界面 - 释放技能【菜单界面也直接通过建立Game_Action来进行apply】
//==============================
/*
var _drill_SkR_s_useItem = Scene_Skill.prototype.useItem;
Scene_Skill.prototype.useItem = function() {
	this.drill_SkR_useSkillRecord();
	_drill_SkR_s_useItem.call(this);
}
Scene_Skill.prototype.drill_SkR_useSkillRecord = function() {
	if( !this.item() || !DataManager.isSkill(this.item()) ){ return }
	
	$gameSystem._drill_SkR_sa = this.item().id;
	$gameSystem._drill_SkR_sa_from_id = this.user()._actorId;
	$gameSystem._drill_SkR_sa_from_index = this.user().index()+1;
	var targets = this.itemTargetActors();
	if( targets.length == 0 ){
		$gameSystem._drill_SkR_sa_tar_aid = 0;
		$gameSystem._drill_SkR_sa_tar_aindex = 0;
	}else{
		$gameSystem._drill_SkR_sa_tar_aid = targets[ targets.length-1 ]._actorId;	//菜单界面全体中最后一个被作用的对象
		$gameSystem._drill_SkR_sa_tar_aindex = targets[ targets.length-1 ].index()+1;
	}
	$gameSystem._drill_SkR_sa_tar_eid = 0;		//菜单界面只有我方->我方
	$gameSystem._drill_SkR_sa_tar_eindex = 0;
	
	$gameSystem.drill_SkR_addActorSkillUsedCount( this.item().id , 1 );	//记录次数
	
	$gameVariables.setValue( DrillUp.g_SkR_varLast_sa,           $gameSystem._drill_SkR_sa );	//变量赋值
	$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_from_id,   $gameSystem._drill_SkR_sa_from_id );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_from_index,$gameSystem._drill_SkR_sa_from_index );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_tar_aid,   $gameSystem._drill_SkR_sa_tar_aid );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_tar_aindex,$gameSystem._drill_SkR_sa_tar_aindex );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_tar_eid,   $gameSystem._drill_SkR_sa_tar_eid );
	$gameVariables.setValue( DrillUp.g_SkR_varLast_sa_tar_eindex,$gameSystem._drill_SkR_sa_tar_eindex );
}*/

