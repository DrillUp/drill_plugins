//=============================================================================
// Drill_X_BattleComControl.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        战斗UI - 技能类型控制[扩展]
 * @author Drill_up
 * 
 * @Drill_LE_param "封印类型-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_XBCC_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_X_BattleComControl +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以控制禁用攻击、防御、道具，以及敌人的技能类型被封印的效果。
 * ★★必须放在插件 MOG_BattleCommands技能类型面板 的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也可以作用于下面的插件。
 * 作用于：
 *   - MOG_BattleCommands     战斗UI-技能类型面板 
 *     可以给目标插件设置封印技能的按钮。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗中技能类型面板。
 * 细节：
 *   (1.注意禁用和封印的区别，封印会显示选项，但是不能按，
 *      禁用是直接隐藏选项。
 *   (2."技能类"对应 数据库>类型>技能类型 的编号。
 * 设计：
 *   (1.封印技能和禁用技能只对 角色有效。
 *      你可以设计某些棘手的敌人能对角色造成技能封印。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 要禁用玩家的攻击、防御、道具能力，直接添加注释即可：
 *
 * 角色注释：<禁用攻击>
 * 角色注释：<禁用防御>
 * 角色注释：<禁用道具>
 * 角色注释：<封印攻击>
 * 角色注释：<封印防御>
 * 角色注释：<封印道具>
 * 
 * 状态注释：<封印攻击>
 * 状态注释：<封印防御>
 * 状态注释：<封印道具>
 * 状态注释：<封印技能类:A>
 * 
 * 1.参数A表示技能类型id，对应 数据库>类型>技能类型 的编号。
 * 2.状态的控制只对角色起作用，对敌人不起作用。
 *   注意禁用和封印的区别，封印会显示选项，但是不能按，禁用是直接隐藏选项。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 基本类型
 * 你可以通过插件指令手动控制类型情况：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>技能类型 : 角色[5] : 禁用攻击
 * 插件指令：>技能类型 : 角色变量[21] : 禁用攻击
 * 插件指令：>技能类型 : 我方位置[1] : 禁用攻击
 * 插件指令：>技能类型 : 我方变量位置[21] : 禁用攻击
 * 
 * 插件指令：>技能类型 : 角色[5] : 禁用攻击
 * 插件指令：>技能类型 : 角色[5] : 禁用防御
 * 插件指令：>技能类型 : 角色[5] : 禁用道具
 * 插件指令：>技能类型 : 角色[5] : 可用攻击
 * 插件指令：>技能类型 : 角色[5] : 可用防御
 * 插件指令：>技能类型 : 角色[5] : 可用道具
 * 插件指令：>技能类型 : 角色[5] : 封印攻击
 * 插件指令：>技能类型 : 角色[5] : 封印防御
 * 插件指令：>技能类型 : 角色[5] : 封印道具
 * 插件指令：>技能类型 : 角色[5] : 解封攻击
 * 插件指令：>技能类型 : 角色[5] : 解封防御
 * 插件指令：>技能类型 : 角色[5] : 解封道具
 * 
 * 1.前半部分（角色[5]）和 后半部分（禁用攻击）
 *   的参数可以随意组合。一共有4*12种组合方式。
 * 2."角色[5]" 指5号角色。
 *   "我方位置[1]" 指战斗时我方的第1个角色。
 * 3.插件指令的封印的效果一直持续到战斗结束。
 *   注意禁用和封印的区别，封印会显示选项，但是不能按，禁用是直接隐藏选项。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 自定义类型
 * 你可以通过插件指令手动控制类型情况：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>技能类型 : 角色[5] : 封印技能类 : 类型[4]
 * 插件指令：>技能类型 : 角色变量[5] : 封印技能类 : 类型[4]
 * 插件指令：>技能类型 : 我方位置[5] : 封印技能类 : 类型[4]
 * 插件指令：>技能类型 : 我方变量位置[5] : 封印技能类 : 类型[4]
 * 
 * 插件指令：>技能类型 : 角色[5] : 封印技能类 : 类型[4]
 * 插件指令：>技能类型 : 角色[5] : 解封技能类 : 类型[4]
 * 
 * 插件指令：>技能类型 : 角色[5] : 封印技能类 : 类型[4]
 * 插件指令：>技能类型 : 角色[5] : 封印技能类 : 类型变量[4]
 * 
 * 1.前半部分（角色[5]）、中间部分（封印技能类）和 后半部分（类型[4]）
 *   的参数可以随意组合。一共有4*2*2种组合方式。
 * 2."类型"对应了 数据库>类型>技能类型 的编号。
 * 3.插件指令的封印的效果一直持续到战斗结束。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件的内部结构。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 * [v1.3]
 * 添加了最大值编辑的支持。
 * [v1.4]
 * 修正了插件指令格式。
 * [v1.5]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param 资源-封印攻击
 * @desc 封印攻击按钮的图片资源。
 * @default Com_节奏攻击_封印
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 资源-封印防御
 * @desc 封印防御按钮的图片资源。
 * @default Com_防御_封印
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 资源-封印道具
 * @desc 封印道具按钮的图片资源。
 * @default Com_道具_封印
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param ---自定义封印类型组---
 * @default 
 *
 * @param 封印类型-1
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-2
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-3
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-4
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-5
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-6
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-7
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-8
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-9
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-10
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-11
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-12
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-13
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-14
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-15
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-16
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-17
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-18
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-19
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * @param 封印类型-20
 * @parent ---自定义封印类型组---
 * @desc 封印类型按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__ui_command/
 * @type file
 *
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XBCC（X_Battle_Com_Control）
//		临时全局变量	DrillUp.g_XBCC_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_XBCC_xxx
//		全局存储变量	无
//		覆盖重写方法	Window_ActorCommand.prototype.addSkillCommands
//						Window_ActorCommand.prototype.load_com_images（MOG_BattleCommands插件中的函数）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		无
//		★时间复杂度		无
//		★性能测试因素	无
//		★性能测试消耗	无
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			技能类型控制：
//				->攻击、防御、道具
//				->自定义类型
//				->状态绑定
//				->插件指令
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.对玩家命令窗口进行高度分配控制，禁用 = 不添加命令，封印 = 建立一个空的不可点击的命令。
//				addAttackCommand
//				addGuardCommand
//				addItemCommand
//				addSkillCommands
//				
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_BattleComControl = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_BattleComControl');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_XBCC_atk = String(DrillUp.parameters['资源-封印攻击'] || "");
	DrillUp.g_XBCC_def = String(DrillUp.parameters['资源-封印防御'] || "");
	DrillUp.g_XBCC_item = String(DrillUp.parameters['资源-封印道具'] || "");
	
	/*-----------------封印类型------------------*/
	DrillUp.g_XBCC_list_length = 20;
	DrillUp.g_XBCC_list = [];
	for( var i = 1; i <= DrillUp.g_XBCC_list_length ; i++ ){
		DrillUp.g_XBCC_list[i] = String( DrillUp.parameters["封印类型-" + String(i) ] );
	};
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_XBCC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_XBCC_pluginCommand.call(this, command, args);
	if( command === ">技能类型" ){		// >技能类型 : A : 禁用攻击
	
		/*-----------------对象组获取------------------*/
		var actor_id = null;
		if(args.length >= 2){
			var temp1 = String(args[1]);
			if( temp1.indexOf("我方变量位置[") != -1 ){
				temp1 = temp1.replace("我方变量位置[","");
				temp1 = temp1.replace("]","");
				var unit = $gameParty.members()[ $gameVariables.value( Number(temp1) )-1 ];
				if( unit != null && unit.isActor() ){
					actor_id = unit.actorId();
				}
				
			}else if( temp1.indexOf("我方位置[") != -1 ){
				temp1 = temp1.replace("我方位置[","");
				temp1 = temp1.replace("]","");
				var unit = $gameParty.members()[ Number(temp1)-1 ];
				if( unit != null && unit.isActor() ){
					actor_id = unit.actorId();
				}
				
			}else if( temp1.indexOf("角色变量[") != -1 ){
				temp1 = temp1.replace("角色变量[","");
				temp1 = temp1.replace("]","");
				actor_id = $gameVariables.value( Number(temp1) );
				
			}else if( temp1.indexOf("角色[") != -1 ){
				temp1 = temp1.replace("角色[","");
				temp1 = temp1.replace("]","");
				actor_id = Number(temp1);
			}
		}
				
		/*-----------------设置------------------*/
		if( actor_id != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "禁用攻击" ){ $gameSystem._drill_XBCC_availables[actor_id][0] = true; }
			if( type == "禁用防御" ){ $gameSystem._drill_XBCC_availables[actor_id][1] = true; }
			if( type == "禁用道具" ){ $gameSystem._drill_XBCC_availables[actor_id][2] = true; }
			if( type == "可用攻击" ){ $gameSystem._drill_XBCC_availables[actor_id][0] = false; }
			if( type == "可用防御" ){ $gameSystem._drill_XBCC_availables[actor_id][1] = false; }
			if( type == "可用道具" ){ $gameSystem._drill_XBCC_availables[actor_id][2] = false; }
			
			if( type == "封印攻击" ){ $gameSystem._drill_XBCC_enables[actor_id][0] = true; }
			if( type == "封印防御" ){ $gameSystem._drill_XBCC_enables[actor_id][1] = true; }
			if( type == "封印道具" ){ $gameSystem._drill_XBCC_enables[actor_id][2] = true; }
			if( type == "解封攻击" ){ $gameSystem._drill_XBCC_enables[actor_id][0] = false; }
			if( type == "解封防御" ){ $gameSystem._drill_XBCC_enables[actor_id][1] = false; }
			if( type == "解封道具" ){ $gameSystem._drill_XBCC_enables[actor_id][2] = false; }
		}
		if( actor_id != null && args.length == 6 ){
			var type = String(args[3]);
			var temp2 = Number(args[5]);
			if( type == "封印技能类" ){ 
				$gameSystem._drill_XBCC_enables[actor_id][temp2 +3 -1 ] = true; 
			}
			if( type == "解封技能类" ){ 
				$gameSystem._drill_XBCC_enables[actor_id][temp2 +3 -1 ] = false; 
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
DrillUp.g_XBCC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_XBCC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_XBCC_sys_initialize.call(this);
	this.drill_XBCC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_XBCC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_XBCC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_XBCC_saveEnabled == true ){	
		$gameSystem.drill_XBCC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_XBCC_initSysData();
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
Game_System.prototype.drill_XBCC_initSysData = function() {
	this.drill_XBCC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_XBCC_checkSysData = function() {
	this.drill_XBCC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_XBCC_initSysData_Private = function() {
	
	this._drill_XBCC_availables = [];				//禁用类型（ 3*n 矩阵）
	this._drill_XBCC_enables = [];					//封印类型（ (m+3)*n 矩阵）
	
	for( var i = 0; i < $dataActors.length; i++ ){
		this._drill_XBCC_availables[i] = [false,false,false];
		this._drill_XBCC_enables[i] = [false,false,false, 			// 预置20个技能类型（设计者应该不会弄那么多技能的）
			false,false,false,false,false, false,false,false,false,false,
			false,false,false,false,false, false,false,false,false,false];
		if( $dataActors[i] == null ){
			continue;
		}
		var note = String($dataActors[i].note);
		var color = (note.match( /<禁用攻击>/ )) || [];
		if( color.length != 0 ){ this._drill_XBCC_availables[i][0] = true; }
		color = (note.match( /<禁用防御>/ )) || [];
		if( color.length != 0 ){ this._drill_XBCC_availables[i][1] = true; }
		color = (note.match( /<禁用道具>/ )) || [];
		if( color.length != 0 ){ this._drill_XBCC_availables[i][2] = true; }
		color = (note.match( /<封印攻击>/ )) || [];
		if( color.length != 0 ){ this._drill_XBCC_enables[i][0] = true; }
		color = (note.match( /<封印防御>/ )) || [];
		if( color.length != 0 ){ this._drill_XBCC_enables[i][1] = true; }
		color = (note.match( /<封印道具>/ )) || [];
		if( color.length != 0 ){ this._drill_XBCC_enables[i][2] = true; }
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_XBCC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_XBCC_availables == undefined ){
		this.drill_XBCC_initSysData();
	}
	
	// ...（数组长度变化空值时操作）
	//		（此处为稀疏矩阵，存储结构需要改成 json 坐标标记的形式{} ，但这是以后的事情了）
};


//=============================================================================
// ** 命令
//=============================================================================
//==============================
// * 命令 - 攻击
//==============================
var _drill_XBCC_addAttackCommand = Window_ActorCommand.prototype.addAttackCommand;
Window_ActorCommand.prototype.addAttackCommand = function() {
	
	// >插件指令禁用（不添加命令）
	if( $gameSystem._drill_XBCC_availables[this._actor._actorId][0] ){ return; }
	
	// >插件指令封印（红叉命令）
	if( $gameSystem._drill_XBCC_enables[this._actor._actorId][0] ){
		this.addCommand(TextManager.attack, 'attack_lock', false);
		return;
	}
	
	// >状态封印（红叉命令）
	for(var i = 0; i< this._actor._states.length ;i++){
		var s_id = this._actor._states[i];
		var note = String($dataStates[s_id].note);
		var color = (note.match( /<封印攻击>/ )) || [];
		if( color.length != 0 ){ this.addCommand(TextManager.attack, 'attack_lock', false); return;}
	}
	
	_drill_XBCC_addAttackCommand.call(this);
}
//==============================
// * 命令 - 防御
//==============================
var _drill_XBCC_addGuardCommand = Window_ActorCommand.prototype.addGuardCommand;
Window_ActorCommand.prototype.addGuardCommand = function() {
	
	// >插件指令禁用（不添加命令）
	if( $gameSystem._drill_XBCC_availables[this._actor._actorId][1] ){ return; }
	
	// >插件指令封印（红叉命令）
	if( $gameSystem._drill_XBCC_enables[this._actor._actorId][1] ){
		this.addCommand(TextManager.guard, 'guard_lock', false);
		return;
	}
	
	// >状态封印（红叉命令）
	for(var i = 0; i< this._actor._states.length ;i++){
		var s_id = this._actor._states[i];
		var note = String($dataStates[s_id].note);
		var color = (note.match( /<封印防御>/ )) || [];
		if( color.length != 0 ){ this.addCommand(TextManager.guard, 'guard_lock', false); return;}
	}
	
	_drill_XBCC_addGuardCommand.call(this);
}
//==============================
// * 命令 - 道具
//==============================
var _drill_XBCC_addItemCommand = Window_ActorCommand.prototype.addItemCommand;
Window_ActorCommand.prototype.addItemCommand = function() {
	
	// >插件指令禁用（不添加命令）
	if( $gameSystem._drill_XBCC_availables[this._actor._actorId][2] ){ return; }
	
	// >插件指令封印（红叉命令）
	if( $gameSystem._drill_XBCC_enables[this._actor._actorId][2] ){
		this.addCommand(TextManager.item, 'item_lock', false);
		return;
	}
	
	// >状态封印（红叉命令）
	for(var i = 0; i< this._actor._states.length ;i++){	
		var s_id = this._actor._states[i];
		var note = String($dataStates[s_id].note);
		var color = (note.match( /<封印道具>/ )) || [];
		if( color.length != 0 ){ this.addCommand(TextManager.item, 'item_lock', false); return;}
	}
	
	_drill_XBCC_addItemCommand.call(this);
}

//==============================
// * 命令 - 技能类型（覆写）
//==============================
Window_ActorCommand.prototype.addSkillCommands = function() {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b) {
        return a - b;
    });
	for( var j = 0; j <skillTypes.length; j++ ){
		var stypeId = skillTypes[j];
        var name = $dataSystem.skillTypes[stypeId];
		
		// >插件指令封印（红叉命令）
		if( $gameSystem._drill_XBCC_enables[this._actor._actorId][ stypeId + 3 -1 ] ){
			this.addCommand(name, 'skill_lock', false, stypeId);
			continue;
		}
	
		// >状态封印（红叉命令）
		var is_locked = false;
		for(var i = 0; i< this._actor._states.length; i++){
			var s_id = this._actor._states[i];
			var note = String($dataStates[s_id].note);
			var types = (note.match( /<封印技能类:([^<>:]*?)>/g )) || [];
			
			for(var r = 0;r< types.length; r++){
				var type_ = (types[r].match( /<封印技能类:([^<>:]*?)>/ )) || [];
				
				//alert(type_);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。
				if( String(type_[1]) == String(stypeId) ){ 
					this.addCommand(name, 'skill_lock', false, stypeId);
					is_locked = true;
					break;
				}
			}
		}
		if(is_locked){continue;}
		
		this.addCommand(name, 'skill', true, stypeId);
    };
};


//=============================================================================
// ** mog插件兼容
//=============================================================================
if( Imported.MOG_BattleCommands ){
	
	//==============================
	// * Load Com Images
	//==============================
	Window_ActorCommand.prototype.load_com_images = function() {
		this._com_images = [];
		for (var i = 0; i < this._list.length; i++) {
			 if (this._max_com < this._list.length) {this._max_com = this._list.length}
			 for (var r = 0; r < this._list.length; r++) {
				 if( this._list[r]['symbol'] == 'attack' ){
					this._com_images.push(ImageManager.loadBcom(Moghunter.src_com_atk));		//攻击
				 }
				 if( this._list[r]['symbol'] == 'attack_lock' ){
					this._com_images.push(ImageManager.loadBcom(DrillUp.g_XBCC_atk));		//封印攻击
				 }
				 if( this._list[r]['symbol'] == 'skill' ){
					this._com_images.push(ImageManager.loadBcom(Moghunter.com_list[this._list[r]['ext']]));		//自定义技能类型
				 }
				 if( this._list[r]['symbol'] == 'skill_lock' ){
					this._com_images.push(ImageManager.loadBcom(DrillUp.g_XBCC_list[this._list[r]['ext']]));		//封印自定义技能类型
				 }
				 if( this._list[r]['symbol'] == 'guard' ){
					this._com_images.push(ImageManager.loadBcom(Moghunter.src_com_def));		//防御
				 }
				 if( this._list[r]['symbol'] == 'guard_lock' ){
					this._com_images.push(ImageManager.loadBcom(DrillUp.g_XBCC_def));		//封印防御
				 }
				 if( this._list[r]['symbol'] == 'item' ){
					this._com_images.push(ImageManager.loadBcom(Moghunter.src_com_item));	//道具
				 }
				 if( this._list[r]['symbol'] == 'item_lock' ){
					this._com_images.push(ImageManager.loadBcom(DrillUp.g_XBCC_item));	//封印道具
				 }
				 //注意，顺序是固定的
			 };
		};
		this._layout_img = ImageManager.loadBcom(Moghunter.src_type_Layout);
		this._cursor_b_img = ImageManager.loadBcom(Moghunter.src_type_Cursor);
		if (String(Moghunter.bcom_arrow) === "true") {this._arrow_img = ImageManager.loadBcom(Moghunter.src_type_arrow)};
	};
	//==============================
	// * Create Commands
	//==============================
	var _drill_XBCC_create_commands = Window_ActorCommand.prototype.create_commands;
	Window_ActorCommand.prototype.create_commands = function() {	
		_drill_XBCC_create_commands.call(this);
		for (var i = 0; i < this._max_com; i++) {
			 this._com_sprites[i].enabled = true;		//消除按钮透明设置
		};
	};

}

	