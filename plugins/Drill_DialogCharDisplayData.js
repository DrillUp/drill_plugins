//=============================================================================
// Drill_DialogCharDisplayData.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        窗口字符 - 常用的指代字符
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogCharDisplayData +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件提供常用的指代字符，方便查找。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   只作用于所有窗口字符。
 * 指代字符：
 *   (1.指代字符指格式为\xxx[]，且会被替换成指代文本的字符。
 *   (2.你可以使用嵌套写法\xxx[\v[21]]，变量"\v[21]"会被先转换，然后应用给\xxx[]用。
 * 设计：
 *   (1.你可以结合 永久文字+指代字符 的设计思路，实现长期显示的自定义框，
 *      用于展示属性值内容。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 核心的指代字符
 * 核心插件中，就已经具备下列指代字符：
 * 
 * 窗口字符：\v[1]        替换为第1个变量的值（0002变量，输入2，不要多余0）
 * 窗口字符：\n[1]        替换为第1个角色的名字
 * 窗口字符：\p[-2]       替换为玩家队员的名字(-2表示领队，1表示第一个跟随者)
 * 窗口字符：\G           替换为货币单位（ 数据库>系统 中设置单位）
 * 窗口字符：\\           替换为'\'反斜杠字符本身。
 * 
 * 窗口字符：\ac[1]       替换为第1个角色的职业名
 * 窗口字符：\an[1]       替换为第1个角色的昵称（小名）
 * 窗口字符：\pc[-2]      替换为玩家队员的职业名(-2表示领队，1表示第一个跟随者)
 * 窗口字符：\pn[-2]      替换为玩家队员的昵称（小名）(-2表示领队，1表示第一个跟随者)
 * 窗口字符：\nc[1]       替换为第1个职业的名字
 * 窗口字符：\ni[1]       替换为第1个物品的名字
 * 窗口字符：\nw[1]       替换为第1个武器的名字
 * 窗口字符：\na[1]       替换为第1个防具的名字
 * 窗口字符：\ns[1]       替换为第1个技能的名字
 * 窗口字符：\ne[1]       替换为第1个敌人的名字
 * 窗口字符：\nt[1]       替换为第1个状态的名字
 * 窗口字符：\ii[1]       替换为第1个物品的名字 + 图标
 * 窗口字符：\iw[1]       替换为第1个武器的名字 + 图标
 * 窗口字符：\ia[1]       替换为第1个防具的名字 + 图标
 * 窗口字符：\is[1]       替换为第1个技能的名字 + 图标
 * 窗口字符：\it[1]       替换为第1个状态的名字 + 图标
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 该插件的指代字符
 * 该插件中，提供了下列指代字符：
 * 
 * 窗口字符：\iin[1]      替换为第1个物品的持有数
 * 窗口字符：\iwn[1]      替换为第1个武器的持有数
 * 窗口字符：\ian[1]      替换为第1个防具的持有数
 * 
 * 窗口字符：\dDCDD[actorLevel:1]      替换为第1个角色的等级
 * 窗口字符：\dDCDD[actorExp:1]        替换为第1个角色的经验
 * 窗口字符：\dDCDD[actorHp:1]         替换为第1个角色的当前生命
 * 窗口字符：\dDCDD[actorMp:1]         替换为第1个角色的当前魔法
 * 窗口字符：\dDCDD[actorTp:1]         替换为第1个角色的当前怒气
 * 窗口字符：\dDCDD[actorMaxHp:1]      替换为第1个角色的生命上限
 * 窗口字符：\dDCDD[actorMaxMp:1]      替换为第1个角色的魔法上限
 * 窗口字符：\dDCDD[actorMaxTp:1]      替换为第1个角色的怒气上限
 * 窗口字符：\dDCDD[actorAtk:1]        替换为第1个角色的攻击力
 * 窗口字符：\dDCDD[actorDef:1]        替换为第1个角色的防御力
 * 窗口字符：\dDCDD[actorMat:1]        替换为第1个角色的魔法攻击
 * 窗口字符：\dDCDD[actorMdf:1]        替换为第1个角色的魔法防御
 * 窗口字符：\dDCDD[actorAgi:1]        替换为第1个角色的敏捷度
 * 窗口字符：\dDCDD[actorLuk:1]        替换为第1个角色的幸运
 * 
 * 窗口字符：\dDCDD[enemyHp:1]         替换为第1个敌人的当前生命
 * 窗口字符：\dDCDD[enemyMp:1]         替换为第1个敌人的当前魔法
 * 窗口字符：\dDCDD[enemyTp:1]         替换为第1个敌人的当前怒气
 * 窗口字符：\dDCDD[enemyMaxHp:1]      替换为第1个敌人的生命上限
 * 窗口字符：\dDCDD[enemyMaxMp:1]      替换为第1个敌人的魔法上限
 * 窗口字符：\dDCDD[enemyMaxTp:1]      替换为第1个敌人的怒气上限
 * 窗口字符：\dDCDD[enemyAtk:1]        替换为第1个敌人的攻击力
 * 窗口字符：\dDCDD[enemyDef:1]        替换为第1个敌人的防御力
 * 窗口字符：\dDCDD[enemyMat:1]        替换为第1个敌人的魔法攻击
 * 窗口字符：\dDCDD[enemyMdf:1]        替换为第1个敌人的魔法防御
 * 窗口字符：\dDCDD[enemyAgi:1]        替换为第1个敌人的敏捷度
 * 窗口字符：\dDCDD[enemyLuk:1]        替换为第1个敌人的幸运
 * 
 * 窗口字符：\dDCDD[characterTileX:1]        替换为id为1的事件的图块位置X
 * 窗口字符：\dDCDD[characterTileY:1]        替换为id为1的事件的图块位置Y
 * 窗口字符：\dDCDD[characterDirection:1]    替换为id为1的事件的朝向
 * 窗口字符：\dDCDD[characterScreenX:1]      替换为id为1的事件的屏幕位置X
 * 窗口字符：\dDCDD[characterScreenY:1]      替换为id为1的事件的屏幕位置Y
 * 
 * 窗口字符：\dDCDD[characterTileX:-2]       替换为玩家的图块位置X
 * 窗口字符：\dDCDD[characterTileY:-2]       替换为玩家的图块位置Y
 * 窗口字符：\dDCDD[characterDirection:-2]   替换为玩家的朝向
 * 窗口字符：\dDCDD[characterScreenX:-2]     替换为玩家的屏幕位置X
 * 窗口字符：\dDCDD[characterScreenY:-2]     替换为玩家的屏幕位置Y
 * 
 * 窗口字符：\dDCDD[memberActorId:-2]        替换为指定玩家队员的角色id(-2表示领队，1表示第一个跟随者)
 * 
 * 窗口字符：\dDCDD[mapId]             替换为当前所在地图ID
 * 窗口字符：\dDCDD[partyMemberNum]    替换为当前队伍人数
 * 窗口字符：\dDCDD[gold]              替换为金币持有数
 * 窗口字符：\dDCDD[step]              替换为移动总步数
 * 窗口字符：\dDCDD[playTime]          替换为游戏时长-秒
 * 窗口字符：\dDCDD[timerTime]         替换为计时器时长
 * 窗口字符：\dDCDD[saveCount]         替换为保存次数
 * 窗口字符：\dDCDD[battleCount]       替换为战斗次数
 * 窗口字符：\dDCDD[winCount]          替换为战斗胜利次数
 * 窗口字符：\dDCDD[escapeCount]       替换为战斗逃跑次数
 * 
 * 1.上述指代字符为常规写法。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 指代字符嵌套写法
 * 该插件中，提供了下列指代字符：
 * 
 * 窗口字符：\iin[\v[21]]      替换为变量21值的物品的持有数
 * 窗口字符：\iwn[\v[21]]      替换为变量21值的武器的持有数
 * 窗口字符：\ian[\v[21]]      替换为变量21值的防具的持有数
 * 
 * 窗口字符：\dDCDD[actorLevel:\v[21]]      替换为变量21值的角色的等级
 * 窗口字符：\dDCDD[actorExp:\v[21]]        替换为变量21值的角色的经验
 * 窗口字符：\dDCDD[actorHp:\v[21]]         替换为变量21值的角色的当前生命
 * 窗口字符：\dDCDD[actorMp:\v[21]]         替换为变量21值的角色的当前魔法
 * 窗口字符：\dDCDD[actorTp:\v[21]]         替换为变量21值的角色的当前怒气
 * 窗口字符：\dDCDD[actorMaxHp:\v[21]]      替换为变量21值的角色的生命上限
 * 窗口字符：\dDCDD[actorMaxMp:\v[21]]      替换为变量21值的角色的魔法上限
 * 窗口字符：\dDCDD[actorMaxTp:\v[21]]      替换为变量21值的角色的怒气上限
 * 窗口字符：\dDCDD[actorAtk:\v[21]]        替换为变量21值的角色的攻击力
 * 窗口字符：\dDCDD[actorDef:\v[21]]        替换为变量21值的角色的防御力
 * 窗口字符：\dDCDD[actorMat:\v[21]]        替换为变量21值的角色的魔法攻击
 * 窗口字符：\dDCDD[actorMdf:\v[21]]        替换为变量21值的角色的魔法防御
 * 窗口字符：\dDCDD[actorAgi:\v[21]]        替换为变量21值的角色的敏捷度
 * 窗口字符：\dDCDD[actorLuk:\v[21]]        替换为变量21值的角色的幸运
 * 
 * 窗口字符：\dDCDD[enemyHp:\v[21]]         替换为变量21值的敌人的当前生命
 * 窗口字符：\dDCDD[enemyMp:\v[21]]         替换为变量21值的敌人的当前魔法
 * 窗口字符：\dDCDD[enemyTp:\v[21]]         替换为变量21值的敌人的当前怒气
 * 窗口字符：\dDCDD[enemyMaxHp:\v[21]]      替换为变量21值的敌人的生命上限
 * 窗口字符：\dDCDD[enemyMaxMp:\v[21]]      替换为变量21值的敌人的魔法上限
 * 窗口字符：\dDCDD[enemyMaxTp:\v[21]]      替换为变量21值的敌人的怒气上限
 * 窗口字符：\dDCDD[enemyAtk:\v[21]]        替换为变量21值的敌人的攻击力
 * 窗口字符：\dDCDD[enemyDef:\v[21]]        替换为变量21值的敌人的防御力
 * 窗口字符：\dDCDD[enemyMat:\v[21]]        替换为变量21值的敌人的魔法攻击
 * 窗口字符：\dDCDD[enemyMdf:\v[21]]        替换为变量21值的敌人的魔法防御
 * 窗口字符：\dDCDD[enemyAgi:\v[21]]        替换为变量21值的敌人的敏捷度
 * 窗口字符：\dDCDD[enemyLuk:\v[21]]        替换为变量21值的敌人的幸运
 * 
 * 窗口字符：\dDCDD[characterTileX:\v[21]]       替换为id为变量21值的事件的图块位置X
 * 窗口字符：\dDCDD[characterTileY:\v[21]]       替换为id为变量21值的事件的图块位置Y
 * 窗口字符：\dDCDD[characterDirection:\v[21]]   替换为id为变量21值的事件的朝向
 * 窗口字符：\dDCDD[characterScreenX:\v[21]]     替换为id为变量21值的事件的屏幕位置X
 * 窗口字符：\dDCDD[characterScreenY:\v[21]]     替换为id为变量21值的事件的屏幕位置Y
 * 
 * 窗口字符：\dDCDD[memberActorId:\v[21]]        替换为指定玩家队员的角色id(-2表示领队，1表示第一个跟随者)
 * 
 * 1.上述指代字符为嵌套写法，即通过变量\v[21]来表示值。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>常用的指代字符 : DEBUG指代字符测试 : 开启
 * 插件指令：>常用的指代字符 : DEBUG指代字符测试 : 关闭
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
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只单次执行，并且只进行指代字符的转换，所以几乎没有消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DCDD (Dialog_Char_Display_Data)
//		临时全局变量	DrillUp.g_DCDD_xxx
//		临时局部变量	this._drill_DCDD_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	UI管理层
//		★性能测试消耗	2025/4/30：
//							》未找到，单次执行太快。消耗可能都在核心函数中。
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			
//			->☆窗口字符应用之指代字符
//				> \iin[1]
//				> \iwn[1]
//				> \ian[1]
//				> ……
//			->☆DEBUG指代字符测试
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
//			暂无
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
	DrillUp.g_DCDD_PluginTip_curName = "Drill_DialogCharDisplayData.js 窗口字符-常用的指代字符";
	DrillUp.g_DCDD_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DCDD_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DCDD_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DCDD_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DCDD_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DCDD_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogCharDisplayData = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogCharDisplayData');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DCDD_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DCDD_pluginCommand.call(this, command, args);
	this.drill_DCDD_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DCDD_pluginCommand = function( command, args ){
	if( command === ">常用的指代字符" ){
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG指代字符测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_DCDD_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_DCDD_DebugEnabled = false;
				}
			}
		}
	}
}
	
	
//=============================================================================
// ** ☆窗口字符应用之指代字符
//
//			说明：	> 指代字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之指代字符 - 组合符配置
//==============================
var _drill_DCDD_COWC_transform_processCombined = Game_Temp.prototype.drill_COWC_transform_processCombined;
Game_Temp.prototype.drill_COWC_transform_processCombined = function( matched_index, matched_str, command, args ){
	_drill_DCDD_COWC_transform_processCombined.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』 - 物品的持有数（\IIN[1]）
	if( command.toUpperCase() == "IIN" ){
		if( args.length == 1 ){
			var str = this.drill_DCDD_itemNum( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
			return;
		}
	}
	// > 『窗口字符定义』 - 武器的持有数（\IWN[1]）
	if( command.toUpperCase() == "IWN" ){
		if( args.length == 1 ){
			var str = this.drill_DCDD_weaponsNum( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
			return;
		}
	}
	// > 『窗口字符定义』 - 防具的持有数（\IAN[1]）
	if( command.toUpperCase() == "IAN" ){
		if( args.length == 1 ){
			var str = this.drill_DCDD_armorsNum( Number(args[0]) );
			this.drill_COWC_transform_submitCombined( str );
			return;
		}
	}
	
	if( command == "dDCDD" ){
		
		if( args.length == 2 ){
			// > 『窗口字符定义』 - 角色 - 等级（\dDCDD[actorLevel:1]）
			if( String(args[0]) == "actorLevel" ){
				var str = this.drill_DCDD_actorLevel( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 经验（\dDCDD[actorExp:1]）
			if( String(args[0]) == "actorExp" ){
				var str = this.drill_DCDD_actorExp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 当前生命（\dDCDD[actorHp:1]）
			if( String(args[0]) == "actorHp" ){
				var str = this.drill_DCDD_actorHp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 当前魔法（\dDCDD[actorMp:1]）
			if( String(args[0]) == "actorMp" ){
				var str = this.drill_DCDD_actorMp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 当前怒气（\dDCDD[actorTp:1]）
			if( String(args[0]) == "actorTp" ){
				var str = this.drill_DCDD_actorTp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 生命上限（\dDCDD[actorMaxHp:1]）
			if( String(args[0]) == "actorMaxHp" ){
				var str = this.drill_DCDD_actorMaxHp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 魔法上限（\dDCDD[actorMaxMp:1]）
			if( String(args[0]) == "actorMaxMp" ){
				var str = this.drill_DCDD_actorMaxMp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 怒气上限（\dDCDD[actorMaxTp:1]）
			if( String(args[0]) == "actorMaxTp" ){
				var str = this.drill_DCDD_actorMaxTp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 攻击力（\dDCDD[actorAtk:1]）
			if( String(args[0]) == "actorAtk" ){
				var str = this.drill_DCDD_actorAtk( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 防御力（\dDCDD[actorDef:1]）
			if( String(args[0]) == "actorDef" ){
				var str = this.drill_DCDD_actorDef( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 魔法攻击（\dDCDD[actorMat:1]）
			if( String(args[0]) == "actorMat" ){
				var str = this.drill_DCDD_actorMat( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 魔法防御（\dDCDD[actorMdf:1]）
			if( String(args[0]) == "actorMdf" ){
				var str = this.drill_DCDD_actorMdf( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 敏捷度（\dDCDD[actorAgi:1]）
			if( String(args[0]) == "actorAgi" ){
				var str = this.drill_DCDD_actorAgi( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 角色 - 幸运（\dDCDD[actorLuk:1]）
			if( String(args[0]) == "actorLuk" ){
				var str = this.drill_DCDD_actorLuk( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			
			// > 『窗口字符定义』 - 敌人 - 当前生命（\dDCDD[enemyHp:1]）
			if( String(args[0]) == "enemyHp" ){
				var str = this.drill_DCDD_enemyHp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 当前魔法（\dDCDD[enemyMp:1]）
			if( String(args[0]) == "enemyMp" ){
				var str = this.drill_DCDD_enemyMp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 当前怒气（\dDCDD[enemyTp:1]）
			if( String(args[0]) == "enemyTp" ){
				var str = this.drill_DCDD_enemyTp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 生命上限（\dDCDD[enemyMaxHp:1]）
			if( String(args[0]) == "enemyMaxHp" ){
				var str = this.drill_DCDD_enemyMaxHp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 魔法上限（\dDCDD[enemyMaxMp:1]）
			if( String(args[0]) == "enemyMaxMp" ){
				var str = this.drill_DCDD_enemyMaxMp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 怒气上限（\dDCDD[enemyMaxTp:1]）
			if( String(args[0]) == "enemyMaxTp" ){
				var str = this.drill_DCDD_enemyMaxTp( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 攻击力（\dDCDD[enemyAtk:1]）
			if( String(args[0]) == "enemyAtk" ){
				var str = this.drill_DCDD_enemyAtk( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 防御力（\dDCDD[enemyDef:1]）
			if( String(args[0]) == "enemyDef" ){
				var str = this.drill_DCDD_enemyDef( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 魔法攻击（\dDCDD[enemyMat:1]）
			if( String(args[0]) == "enemyMat" ){
				var str = this.drill_DCDD_enemyMat( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 魔法防御（\dDCDD[enemyMdf:1]）
			if( String(args[0]) == "enemyMdf" ){
				var str = this.drill_DCDD_enemyMdf( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 敏捷度（\dDCDD[enemyAgi:1]）
			if( String(args[0]) == "enemyAgi" ){
				var str = this.drill_DCDD_enemyAgi( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 敌人 - 幸运（\dDCDD[enemyLuk:1]）
			if( String(args[0]) == "enemyLuk" ){
				var str = this.drill_DCDD_enemyLuk( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			
			// > 『窗口字符定义』 - 事件 - 图块位置X（\dDCDD[characterTileX:1]）
			if( String(args[0]) == "characterTileX" ){
				var str = this.drill_DCDD_characterTileX( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 事件 - 图块位置Y（\dDCDD[characterTileY:1]）
			if( String(args[0]) == "characterTileY" ){
				var str = this.drill_DCDD_characterTileY( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 事件 - 朝向（\dDCDD[characterDirection:1]）
			if( String(args[0]) == "characterDirection" ){
				var str = this.drill_DCDD_characterDirection( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 事件 - 屏幕位置X（\dDCDD[characterScreenX:1]）
			if( String(args[0]) == "characterScreenX" ){
				var str = this.drill_DCDD_characterScreenX( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 事件 - 屏幕位置Y（\dDCDD[characterScreenY:1]）
			if( String(args[0]) == "characterScreenY" ){
				var str = this.drill_DCDD_characterScreenY( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			
			// > 『窗口字符定义』 - 玩家队员的角色id（\dDCDD[memberActorId:1]）
			if( String(args[0]) == "memberActorId" ){
				var str = this.drill_DCDD_memberActorId( Number(args[1]) );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
		}
	
		if( args.length == 1 ){
			// > 『窗口字符定义』 - 地图ID（\dDCDD[mapId]）
			if( String(args[0]) == "mapId" ){
				var str = String( $gameMap.mapId() );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 队伍人数（\dDCDD[partyMemberNum]）
			if( String(args[0]) == "partyMemberNum" ){
				var str = String( $gameParty.size() );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 金币持有数（\dDCDD[gold]）
			if( String(args[0]) == "gold" ){
				var str = String( $gameParty.gold() );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 移动总步数（\dDCDD[step]）
			if( String(args[0]) == "step" ){
				var str = String( $gameParty.steps() );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 游戏时长-秒（\dDCDD[playTime]）
			if( String(args[0]) == "playTime" ){
				var str = String( $gameSystem.playtime() );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 计时器时长（\dDCDD[timerTime]）
			if( String(args[0]) == "timerTime" ){
				var str = String( $gameTimer.seconds() );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 保存次数（\dDCDD[saveCount]）
			if( String(args[0]) == "saveCount" ){
				var str = String( $gameSystem.saveCount() );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 战斗次数（\dDCDD[battleCount]）
			if( String(args[0]) == "battleCount" ){
				var str = String( $gameSystem.battleCount() );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 战斗胜利次数（\dDCDD[winCount]）
			if( String(args[0]) == "winCount" ){
				var str = String( $gameSystem.winCount() );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
			// > 『窗口字符定义』 - 战斗逃跑次数（\dDCDD[escapeCount]）
			if( String(args[0]) == "escapeCount" ){
				var str = String( $gameSystem.escapeCount() );
				this.drill_COWC_transform_submitCombined( str );
				return;
			}
		}
	}
};

//==============================
// * 窗口字符应用之指代字符 - 物品的持有数（\IIN[1]）
//==============================
Game_Temp.prototype.drill_DCDD_itemNum = function( n ){
	var data_item = $dataItems[ n ];
	if( data_item == undefined ){ return ""; }
	return String( $gameParty.numItems( data_item ) );
};
//==============================
// * 窗口字符应用之指代字符 - 武器的持有数（\IWN[1]）
//==============================
Game_Temp.prototype.drill_DCDD_weaponsNum = function( n ){
	var data_weapons = $dataWeapons[ n ];
	if( data_weapons == undefined ){ return ""; }
	return String( $gameParty.numItems( data_weapons ) );
};
//==============================
// * 窗口字符应用之指代字符 - 防具的持有数（\IAN[1]）
//==============================
Game_Temp.prototype.drill_DCDD_armorsNum = function( n ){
	var data_armors = $dataArmors[ n ];
	if( data_armors == undefined ){ return ""; }
	return String( $gameParty.numItems( data_armors ) );
};

//==============================
// * 窗口字符应用之指代字符 - 角色 - 等级（\dDCDD[actorLevel:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorLevel = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.level );
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 经验（\dDCDD[actorExp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorExp = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.currentExp() );
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 当前生命（\dDCDD[actorHp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorHp = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.hp );	//等同于._hp
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 当前魔法（\dDCDD[actorMp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorMp = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.mp );	//等同于._mp
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 当前怒气（\dDCDD[actorTp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorTp = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.tp );	//等同于._tp
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 生命上限（\dDCDD[actorMaxHp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorMaxHp = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.mhp );	//等同于.param(0)
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 魔法上限（\dDCDD[actorMaxMp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorMaxMp = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.mmp );	//等同于.param(1)
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 怒气上限（\dDCDD[actorMaxTp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorMaxTp = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.maxTp() );
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 攻击力（\dDCDD[actorAtk:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorAtk = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.atk );	//等同于.param(2)
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 防御力（\dDCDD[actorDef:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorDef = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.def );	//等同于.param(3)
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 魔法攻击（\dDCDD[actorMat:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorMat = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.mat );	//等同于.param(4)
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 魔法防御（\dDCDD[actorMdf:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorMdf = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.mdf );	//等同于.param(5)
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 敏捷度（\dDCDD[actorAgi:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorAgi = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.agi );	//等同于.param(6)
};
//==============================
// * 窗口字符应用之指代字符 - 角色 - 幸运（\dDCDD[actorLuk:1]）
//==============================
Game_Temp.prototype.drill_DCDD_actorLuk = function( n ){
	var actor = $gameActors.actor( n );
	if( actor == undefined ){ return ""; }
	return String( actor.luk );	//等同于.param(7)
};

//==============================
// * 窗口字符应用之指代字符 - 敌人 - 当前生命（\dDCDD[enemyHp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyHp = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.hp );	//等同于._hp
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 当前魔法（\dDCDD[enemyMp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyMp = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.mp );	//等同于._mp
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 当前怒气（\dDCDD[enemyTp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyTp = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.tp );	//等同于._tp
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 生命上限（\dDCDD[enemyMaxHp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyMaxHp = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.mhp );	//等同于.param(0)
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 魔法上限（\dDCDD[enemyMaxMp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyMaxMp = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.mmp );	//等同于.param(1)
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 怒气上限（\dDCDD[enemyMaxTp:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyMaxTp = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.maxTp() );
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 攻击力（\dDCDD[enemyAtk:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyAtk = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.atk );	//等同于.param(2)
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 防御力（\dDCDD[enemyDef:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyDef = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.def );	//等同于.param(3)
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 魔法攻击（\dDCDD[enemyMat:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyMat = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.mat );	//等同于.param(4)
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 魔法防御（\dDCDD[enemyMdf:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyMdf = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.mdf );	//等同于.param(5)
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 敏捷度（\dDCDD[enemyAgi:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyAgi = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.agi );	//等同于.param(6)
};
//==============================
// * 窗口字符应用之指代字符 - 敌人 - 幸运（\dDCDD[enemyLuk:1]）
//==============================
Game_Temp.prototype.drill_DCDD_enemyLuk = function( n ){
	var enemy = $gameTroop.members()[n -1];
	if( enemy == undefined ){ return ""; }
	return String( enemy.luk );	//等同于.param(7)
};

//==============================
// * 窗口字符应用之指代字符 - 事件获取
//==============================
Game_Temp.prototype.drill_DCDD_character = function( n ){
	if( $gameParty.inBattle() ){	//（战斗界面无法获取地图事件）
		return null;
	}else if( n == -2 ){	//『玩家id』
		return $gamePlayer;
	}else{
		return $gameMap.event( n );
	}
};
//==============================
// * 窗口字符应用之指代字符 - 事件 - 位置X（\dDCDD[characterTileX:1]）
//==============================
Game_Temp.prototype.drill_DCDD_characterTileX = function( n ){
	var ch = this.drill_DCDD_character( n );
	if( ch == undefined ){ return ""; }
	return String( ch.x );
};
//==============================
// * 窗口字符应用之指代字符 - 事件 - 位置Y（\dDCDD[characterTileY:1]）
//==============================
Game_Temp.prototype.drill_DCDD_characterTileY = function( n ){
	var ch = this.drill_DCDD_character( n );
	if( ch == undefined ){ return ""; }
	return String( ch.y );
};
//==============================
// * 窗口字符应用之指代字符 - 事件 - 朝向（\dDCDD[characterDirection:1]）
//==============================
Game_Temp.prototype.drill_DCDD_characterDirection = function( n ){
	var ch = this.drill_DCDD_character( n );
	if( ch == undefined ){ return ""; }
	
	if( ch.direction() == 2 ){ return "下"; }
	if( ch.direction() == 4 ){ return "左"; }
	if( ch.direction() == 6 ){ return "右"; }
	if( ch.direction() == 8 ){ return "上"; }
	
	if( ch.direction() == 1 ){ return "左下"; }
	if( ch.direction() == 3 ){ return "右下"; }
	if( ch.direction() == 7 ){ return "左上"; }
	if( ch.direction() == 9 ){ return "右上"; }
	
	return "";
};
//==============================
// * 窗口字符应用之指代字符 - 事件 - 位置Y（\dDCDD[characterScreenX:1]）
//==============================
Game_Temp.prototype.drill_DCDD_characterScreenX = function( n ){
	var ch = this.drill_DCDD_character( n );
	if( ch == undefined ){ return ""; }
	return String( ch.screenX() );
};
//==============================
// * 窗口字符应用之指代字符 - 事件 - 位置Y（\dDCDD[characterScreenY:1]）
//==============================
Game_Temp.prototype.drill_DCDD_characterScreenY = function( n ){
	var ch = this.drill_DCDD_character( n );
	if( ch == undefined ){ return ""; }
	return String( ch.screenY() );
};

//==============================
// * 窗口字符应用之指代字符 - 玩家队员的角色id（\dDCDD[memberActorId:1]）
//==============================
Game_Temp.prototype.drill_DCDD_memberActorId = function( n ){
	var actor = null;
	if( n == -2 ){  //『玩家id』
		actor = $gameParty.members()[ 0 ];
	}
	if( n > 0 ){  //『玩家队员id』
		actor = $gameParty.members()[ n ];
	}
	if( actor == undefined ){ return ""; }
	return String( actor.actorId() );
};



//=============================================================================
// ** ☆DEBUG指代字符测试
//
//			说明：	> 此模块控制 DEBUG指代字符测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG指代字符测试 - 帧刷新（地图界面）
//==============================
var _drill_DCDD_debug_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_DCDD_debug_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_DCDD_DebugEnabled == true ){
		$gameTemp._drill_DCDD_DebugEnabled = undefined;
		this.drill_DCDD_createDebugSprite();
	}
	// > 销毁贴图
	if( $gameTemp._drill_DCDD_DebugEnabled == false ){
		$gameTemp._drill_DCDD_DebugEnabled = undefined;
		if( this._drill_DCDD_DebugSprite != undefined ){
			this.removeChild(this._drill_DCDD_DebugSprite);
			this._drill_DCDD_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG指代字符测试 - 帧刷新（战斗界面）
//==============================
var _drill_DCDD_debug_update2 = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _drill_DCDD_debug_update2.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_DCDD_DebugEnabled == true ){
		$gameTemp._drill_DCDD_DebugEnabled = undefined;
		this.drill_DCDD_createDebugSprite();
	}
	// > 销毁贴图
	if( $gameTemp._drill_DCDD_DebugEnabled == false ){
		$gameTemp._drill_DCDD_DebugEnabled = undefined;
		if( this._drill_DCDD_DebugSprite != undefined ){
			this.removeChild(this._drill_DCDD_DebugSprite);
			this._drill_DCDD_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG指代字符测试 - 创建贴图（地图界面）
//==============================
Scene_Map.prototype.drill_DCDD_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_DCDD_DebugSprite != undefined ){
		this.removeChild(this._drill_DCDD_DebugSprite);
		this._drill_DCDD_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_window = new Window_Base( 40, 0, 736, 624 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DCDD_DebugSprite = temp_window;
	
	// > 绘制 - 矩形
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#ff2222", 2, "miter" );
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};					//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = false;
	options['baseParam']['fontSize'] = 18;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了）
	
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_DCDD_PluginTip_curName + "】\n" + 
				"\n" + 
				
				"》持有数\n" + 
				"\\ii[1]：\\iin[1]   " + 
				"\\iw[1]：\\iwn[1]   " + 
				"\\ia[1]：\\ian[1]   \n" + 
				"\n" + 
				
				"》角色5的属性\n" + 
				"等级：\\dDCDD[actorLevel:5]    " + 
				"经验：\\dDCDD[actorExp:5]    \n" + 
				"生命：\\dDCDD[actorHp:5]/\\dDCDD[actorMaxHp:5]    " +
				"魔法：\\dDCDD[actorMp:5]/\\dDCDD[actorMaxMp:5]    " +
				"怒气：\\dDCDD[actorTp:5]/\\dDCDD[actorMaxTp:5]    \n" +
				"攻击力：\\dDCDD[actorAtk:5]    " +
				"防御力：\\dDCDD[actorDef:5]    " +
				"敏捷度：\\dDCDD[actorAgi:5]    \n" +
				"魔法攻击：\\dDCDD[actorMat:5]    " +
				"魔法防御：\\dDCDD[actorMdf:5]    " +
				"幸运：\\dDCDD[actorLuk:5]    \n" +
				"\n" + 
				
				"》敌人1的属性（需要在战斗界面）\n" + 
				"生命：\\dDCDD[enemyHp:1]/\\dDCDD[enemyMaxHp:1]    " +
				"魔法：\\dDCDD[enemyMp:1]/\\dDCDD[enemyMaxMp:1]    " +
				"怒气：\\dDCDD[enemyTp:1]/\\dDCDD[enemyMaxTp:1]    \n" +
				"攻击力：\\dDCDD[enemyAtk:1]    " +
				"防御力：\\dDCDD[enemyDef:1]    " +
				"敏捷度：\\dDCDD[enemyAgi:1]    \n" +
				"魔法攻击：\\dDCDD[enemyMat:1]    " +
				"魔法防御：\\dDCDD[enemyMdf:1]    " +
				"幸运：\\dDCDD[enemyLuk:1]    \n" +
				"\n" + 
				
				"》玩家的属性（需要在地图界面）\n" + 
				"图块位置X：\\dDCDD[characterTileX:-2]    " +
				"图块位置Y：\\dDCDD[characterTileY:-2]    " +
				"朝向：\\dDCDD[characterDirection:-2]    \n" +
				"屏幕位置X：\\dDCDD[characterScreenX:-2]    " +
				"屏幕位置Y：\\dDCDD[characterScreenY:-2]    \n" +
				"\n" + 
				
				"》其它属性\n" + 
				"玩家领队的角色ID：\\dDCDD[memberActorId:-2]    " +
				"玩家队员1的角色ID：\\dDCDD[memberActorId:1]    " +
				"队伍人数：\\dDCDD[partyMemberNum]    \n" +
				"地图ID：\\dDCDD[mapId]    " +
				"金币持有数：\\dDCDD[gold]    " +
				"移动总步数：\\dDCDD[step]    \n" +
				"游戏时长-秒：\\dDCDD[playTime]    " +
				"计时器时长：\\dDCDD[timerTime]    \n" +
				"保存次数：\\dDCDD[saveCount]    \n" +
				"战斗次数：\\dDCDD[battleCount]    " +
				"战斗胜利次数：\\dDCDD[winCount]    " +
				"战斗逃跑次数：\\dDCDD[escapeCount]    \n";
	
	temp_window.drill_COWC_drawText( text, options );
}
//==============================
// * DEBUG指代字符测试 - 创建贴图（战斗界面）
//==============================
Scene_Battle.prototype.drill_DCDD_createDebugSprite = Scene_Map.prototype.drill_DCDD_createDebugSprite;


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharDisplayData = false;
		var pluginTip = DrillUp.drill_DCDD_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

