//=============================================================================
// Drill_WindowLog.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        战斗UI - 窗口提示消息
 * @author Drill_up
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_WindowLog +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 战斗时，任何动作信息都会在上方的蓝色横条中显示，这里你可以控制
 * 窗口的消息每个细节是否显示。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也可以被下列插件扩展。
 * 被扩展：
 *   - Drill_ActorTextColor     UI-角色文本颜色★★v1.9及以上★★
 *     通过该插件，消息提示中的角色名字可以变色。
 *   - Drill_EnemyTextColor     UI-敌人文本颜色★★v2.1及以上★★
 *     通过该插件，消息提示中的敌人名字可以变色。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于蓝色横条消息，并且控制战斗初始消息提示。
 * 2.要修改消息显示的内容，在 数据库>用语>信息 中设置。
 * 3.该插件修改 Window_BattleLog 非常多，与 YEP_BattleEngineCore 战斗核心
 *   插件直接冲突，需要做必要取舍。 
 * 4.这里1.32版本以前(包括1.32)的示例，都是直接在内核rpg_windows.js中进行
 *   了修改，现在已经做成插件形式，如果你用的是1.32以前版本，最好将内核复
 *   原。
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
 * 测试方法：   在战斗界面中测试性能。
 * 测试结果：   战斗界面中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件覆写了部分原函数，只在每次战斗行动前执行一次，并不是
 *   持续消耗，所以消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件 ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得与敌人文本颜色插件相互兼容。
 * [v1.2]
 * 使得与角色文本颜色、敌人文本颜色相互兼容。
 * [v1.3]
 * 修改了内部结构。
 * [v1.4]
 * 修复了使用颜色核心时，冲突的bug。
 * [v1.5]
 * 更新了敌人文本和角色文本的兼容。
 *
 *
 *
 * @param 战斗间隔
 * @type number
 * @min 0
 * @desc 释放技能或者攻击后间隔的时间，单位帧。（1秒60帧）
 * @default 12 
 * 
 * @param 消息框颜色
 * @desc 填入配置颜色的编码。
 * @default #0022ff
 *
 * @param 消息框透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 消息框的透明度，0为完全透明,255为完全不透明。
 * @default 176
 *
 * @param 是否显示战斗开始对话
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，xxxx出现的对话框。
 * @default true
 *
 * @param 是否显示先发制人对话
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param ----敌方----
 * @default
 *
 * @param 显示-敌人单体技
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人释放技能。
 * @default false
 *
 * @param 显示-敌人群体技
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人释放技能。
 * @default false
 *
 * @param 显示-敌人无伤
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方对敌人没造成伤害。
 * @default false
 *
 * @param 显示-对敌人暴击
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方对敌人造成暴击。
 * @default false
 *
 * @param 显示-未命中敌人
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方没有命中敌人。
 * @default false
 *
 * @param 显示-敌人物理闪避
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人闪避了我方的物理攻击。
 * @default true
 *
 * @param 显示-敌人魔法闪避
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人闪避了我方的魔法攻击。
 * @default true
 *
 * @param 显示-敌人物理反击
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人对我方反击。
 * @default true
 *
 * @param 显示-敌人魔法反射
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人对我方反射。
 * @default true
 *
 * @param 显示-敌人掩护
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人掩护敌人。
 * @default true
 *
 * @param 显示-敌人生命减少
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次生命减少都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-敌人生命恢复
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次生命恢复都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-敌人魔法减少
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次魔法减少都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-敌人魔法恢复
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次魔法恢复都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-敌人怒气减少
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 显示-敌人怒气恢复
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 显示-敌人遭到状态
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。死亡也是一种状态。
 * @default true
 *
 * @param 显示-敌人解除状态
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 显示-敌人强化弱化
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param ----我方----
 * @default
 *
 * @param 显示-我方使用道具
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 显示-我方单体技
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方释放技能。
 * @default false
 *
 * @param 显示-我方群体技
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方释放技能。
 * @default false
 *
 * @param 显示-我方无伤
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人对我方没造成伤害。
 * @default false
 *
 * @param 显示-对我方暴击
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人对我方造成暴击。
 * @default false
 *
 * @param 显示-未命中我方
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人没有命中我方。
 * @default false
 *
 * @param 显示-我方物理闪避
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方闪避了敌人的物理攻击。
 * @default true
 *
 * @param 显示-我方魔法闪避
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方闪避了敌人的魔法攻击。
 * @default true
 *
 * @param 显示-我方物理反击
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方对敌人反击。
 * @default true
 *
 * @param 显示-我方魔法反射
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方对敌人反射。
 * @default true
 *
 * @param 显示-我方掩护
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方掩护我方。
 * @default true
 *
 * @param 显示-我方生命减少
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次生命减少都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-我方生命恢复
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次生命恢复都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-我方魔法减少
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次魔法减少都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-我方魔法恢复
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次魔法恢复都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-我方怒气减少
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 显示-我方怒气恢复
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 显示-我方遭到状态
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。死亡也是一种状态。
 * @default true
 *
 * @param 显示-我方解除状态
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 显示-我方强化弱化
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		WL (Window_Log)
//		临时全局变量	DrillUp.g_WL_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	【全部函数都是覆盖重写，除了 Window_Base.prototype.textColor 】
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	在战斗界面中测试
//		★性能测试消耗	太小，没找到
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			窗口提示消息：
//				->消息提示
//				->初始战斗消息
//		
//		★必要注意事项：
//			1.这里的所有函数都是覆盖重写。跟其它消息处理的插件肯定有冲突。
//
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量配置
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_WindowLog = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_WindowLog');
	
	
    DrillUp.g_WL_speed = Number(DrillUp.parameters['战斗间隔'] || 12);
    DrillUp.g_WL_color = String(DrillUp.parameters['消息框颜色'] || '#0022ff');
    DrillUp.g_WL_opacity = Number(DrillUp.parameters['消息框透明度'] || 176);
	
    DrillUp.g_WL_e_message1 = String(DrillUp.parameters['显示-敌人单体技'] || "false") === "true";
    DrillUp.g_WL_e_message2 = String(DrillUp.parameters['显示-敌人群体技'] || "false") === "true";
	DrillUp.g_WL_e_fail = String(DrillUp.parameters['显示-敌人无伤'] || "false") === "true";
	DrillUp.g_WL_e_critical = String(DrillUp.parameters['显示-对敌人暴击'] || "false") === "true";
	DrillUp.g_WL_e_miss = String(DrillUp.parameters['显示-未命中敌人'] || "false") === "true";
	DrillUp.g_WL_e_evl_phy = String(DrillUp.parameters['显示-敌人物理闪避'] || "false") === "true";
	DrillUp.g_WL_e_evl_mana = String(DrillUp.parameters['显示-敌人魔法闪避'] || "false") === "true";
	DrillUp.g_WL_e_counter = String(DrillUp.parameters['显示-敌人物理反击'] || "false") === "true";
	DrillUp.g_WL_e_reflection = String(DrillUp.parameters['显示-敌人魔法反射'] || "false") === "true";
	DrillUp.g_WL_e_backup = String(DrillUp.parameters['显示-敌人掩护'] || "false") === "true";
	DrillUp.g_WL_e_hp_damage = String(DrillUp.parameters['显示-敌人生命减少'] || "false") === "true";
	DrillUp.g_WL_e_hp_recover = String(DrillUp.parameters['显示-敌人生命恢复'] || "false") === "true";
	DrillUp.g_WL_e_mp_damage = String(DrillUp.parameters['显示-敌人魔法减少'] || "false") === "true";
	DrillUp.g_WL_e_mp_recover = String(DrillUp.parameters['显示-敌人魔法恢复'] || "false") === "true";
	DrillUp.g_WL_e_tp_damage = String(DrillUp.parameters['显示-敌人怒气减少'] || "false") === "true";
	DrillUp.g_WL_e_tp_recover = String(DrillUp.parameters['显示-敌人怒气恢复'] || "false") === "true";
	DrillUp.g_WL_e_states_add = String(DrillUp.parameters['显示-敌人遭到状态'] || "false") === "true";
	DrillUp.g_WL_e_states_remove = String(DrillUp.parameters['显示-敌人解除状态'] || "false") === "true";
	DrillUp.g_WL_e_buffs = String(DrillUp.parameters['显示-敌人强化弱化'] || "false") === "true";
	
    DrillUp.g_WL_a_useItem = String(DrillUp.parameters['显示-我方使用道具'] || "false") === "true";
    DrillUp.g_WL_a_message1 = String(DrillUp.parameters['显示-我方单体技'] || "false") === "true";
    DrillUp.g_WL_a_message2 = String(DrillUp.parameters['显示-我方群体技'] || "false") === "true";
	DrillUp.g_WL_a_fail = String(DrillUp.parameters['显示-我方无伤'] || "false") === "true";
	DrillUp.g_WL_a_critical = String(DrillUp.parameters['显示-对我方暴击'] || "false") === "true";
	DrillUp.g_WL_a_miss = String(DrillUp.parameters['显示-未命中我方'] || "false") === "true";
	DrillUp.g_WL_a_evl_phy = String(DrillUp.parameters['显示-我方物理闪避'] || "false") === "true";
	DrillUp.g_WL_a_evl_mana = String(DrillUp.parameters['显示-我方魔法闪避'] || "false") === "true";
	DrillUp.g_WL_a_counter = String(DrillUp.parameters['显示-我方物理反击'] || "false") === "true";
	DrillUp.g_WL_a_reflection = String(DrillUp.parameters['显示-我方魔法反射'] || "false") === "true";
	DrillUp.g_WL_a_backup = String(DrillUp.parameters['显示-我方掩护'] || "false") === "true";
	DrillUp.g_WL_a_hp_damage = String(DrillUp.parameters['显示-我方生命减少'] || "false") === "true";
	DrillUp.g_WL_a_hp_recover = String(DrillUp.parameters['显示-我方生命恢复'] || "false") === "true";
	DrillUp.g_WL_a_mp_damage = String(DrillUp.parameters['显示-我方魔法减少'] || "false") === "true";
	DrillUp.g_WL_a_mp_recover = String(DrillUp.parameters['显示-我方魔法恢复'] || "false") === "true";
	DrillUp.g_WL_a_tp_damage = String(DrillUp.parameters['显示-我方怒气减少'] || "false") === "true";
	DrillUp.g_WL_a_tp_recover = String(DrillUp.parameters['显示-我方怒气恢复'] || "false") === "true";
	DrillUp.g_WL_a_states_add = String(DrillUp.parameters['显示-我方遭到状态'] || "false") === "true";
	DrillUp.g_WL_a_states_remove = String(DrillUp.parameters['显示-我方解除状态'] || "false") === "true";
	DrillUp.g_WL_a_buffs = String(DrillUp.parameters['显示-我方强化弱化'] || "false") === "true";
	
	DrillUp.g_WL_battleStartMessage = String(DrillUp.parameters['是否显示战斗开始对话'] || "false") === "true";
	DrillUp.g_WL_battlePreemptiveMessage = String(DrillUp.parameters['是否显示先发制人对话'] || "true") === "true";
	
	
//==============================
// * 战斗信息窗口 - 消息间隔
//==============================
Window_BattleLog.prototype.messageSpeed = function(){
	if( Imported.MOG_FlashDamage && $gameTemp._flashDamage ){ 
		return 0;
	};
    return DrillUp.g_WL_speed;
};

//==============================
// * 战斗信息窗口 - 框颜色
//==============================
Window_BattleLog.prototype.backColor = function(){
    return DrillUp.g_WL_color;
};
//==============================
// * 战斗信息窗口 - 透明度
//==============================
Window_BattleLog.prototype.backPaintOpacity = function(){
    return DrillUp.g_WL_opacity;
};

//==============================
// * 消息 - 释放技能、物品
//==============================
Window_BattleLog.prototype.displayAction = function( subject, item ){
	if( subject == undefined ){ return; }
	if( item == undefined ){ return; }
    var numMethods = this._methods.length;
    if( DataManager.isSkill(item) ){
        if( item.message1 ){
			if(subject.isActor()){
				if(DrillUp.g_WL_a_message1){
					this.push('addText', subject.drill_WL_actorColorName() + item.message1.format(item.name));
				}else{
					this.push('wait');
				}
			}else{
				if(DrillUp.g_WL_e_message1){
					this.push('addText', subject.drill_WL_enemyColorName() + item.message1.format(item.name));
				}else{
					this.push('wait');
				}
			}
        }
        if( item.message2){
			if(subject.isActor()){
				if(DrillUp.g_WL_a_message2){
					this.push('addText', item.message2.format(item.name));
				}else{
					this.push('wait');
				}
			}else{
				if(DrillUp.g_WL_e_message2){
					this.push('addText', item.message2.format(item.name));
				}else{
					this.push('wait');
				}
			}
        }
    }else{
		if(DrillUp.g_WL_a_useItem){
			this.push('addText', TextManager.useItem.format(subject.name(), item.name));
        }else{
			this.push('wait');
		}
    }
    if( this._methods.length === numMethods){
        this.push('wait');
    }
};

//==============================
// * 消息 - 无伤
//==============================
Window_BattleLog.prototype.displayFailure = function( target ){
	if( target == undefined ){ return; }
    if( target.result().isHit() && !target.result().success ){
        if( target.isActor()){
			if(DrillUp.g_WL_a_fail){
				this.push('addText', TextManager.actionFailure.format(target.drill_WL_actorColorName()));
			}else{
				this.push('wait');
			}
		}else{
			if(DrillUp.g_WL_e_fail){
				this.push('addText', TextManager.actionFailure.format(target.drill_WL_enemyColorName()));
			}else{
				this.push('wait');
			}
		}
    }
};

//==============================
// * 消息 - 暴击
//==============================
Window_BattleLog.prototype.displayCritical = function( target ){
	if( target == undefined ){ return; }
    if( target.result().critical ){
        if( target.isActor() ){
			if( DrillUp.g_WL_a_critical ){
				this.push('addText', TextManager.criticalToActor);
			}else{
				this.push('wait');
			}
        }else{
			if( DrillUp.g_WL_e_critical ){
				this.push('addText', TextManager.criticalToEnemy);
			}else{
				this.push('wait');
			}
        }
    }
};

//==============================
// * 消息 - 未击中
//==============================
Window_BattleLog.prototype.displayMiss = function( target ){
	if( target == undefined ){ return; }
    var fmt;
    if( target.result().physical ){
        fmt = target.isActor() ? TextManager.actorNoHit : TextManager.enemyNoHit;
        this.push('performMiss', target);
    }else{
        fmt = TextManager.actionFailure;
    }
    if( target.isActor() ){
		if( DrillUp.g_WL_a_miss ){
			this.push('addText', fmt.format(target.drill_WL_actorColorName()));
		}else{
			this.push('wait');
		}
	}else{
		if( DrillUp.g_WL_e_miss ){
			this.push('addText', fmt.format(target.drill_WL_enemyColorName()));
		}else{
			this.push('wait');
		}
	}
};

//==============================
// * 消息 - 闪避
//==============================
Window_BattleLog.prototype.displayEvasion = function( target ){
	if( target == undefined ){ return; }
    var fmt;
    if( target.result().physical){
        fmt = TextManager.evasion;
        this.push('performEvasion', target);
		if( target.isActor()){
			if(DrillUp.g_WL_a_evl_phy){
				this.push('addText', fmt.format(target.drill_WL_actorColorName()));
			}else{
				this.push('wait');
			}
		}else{
			if(DrillUp.g_WL_e_evl_phy){
				this.push('addText', fmt.format(target.drill_WL_enemyColorName()));
			}else{
				this.push('wait');
			}
		}
    }else{
        fmt = TextManager.magicEvasion;
        this.push('performMagicEvasion', target);
		if( target.isActor()){
			if(DrillUp.g_WL_a_evl_mana){
				this.push('addText', fmt.format(target.drill_WL_actorColorName()));
			}else{
				this.push('wait');
			}
		}else{
			if(DrillUp.g_WL_e_evl_mana){
				this.push('addText', fmt.format(target.drill_WL_enemyColorName()));
			}else{
				this.push('wait');
			}
		}
    }
};

//==============================
// * 消息 - 物理反击
//==============================
Window_BattleLog.prototype.displayCounter = function( target ){
	if( target == undefined ){ return; }
    this.push('performCounter', target);
	if( target.isActor() ){
		if(DrillUp.g_WL_a_counter){
			this.push('addText', TextManager.counterAttack.format(target.drill_WL_actorColorName()));
        }else{
			this.push('wait');
		}
    }else{
		if(DrillUp.g_WL_e_counter){
			this.push('addText', TextManager.counterAttack.format(target.drill_WL_enemyColorName()));
        }else{
			this.push('wait');
		}
	}
};

//==============================
// * 消息 - 魔法反射
//==============================
Window_BattleLog.prototype.displayReflection = function( target ){
	if( target == undefined ){ return; }
    this.push('performReflection', target);
	if(target.isActor()){
		if(DrillUp.g_WL_a_reflection){
			this.push('addText', TextManager.magicReflection.format(target.drill_WL_actorColorName()));
        }else{
			this.push('wait');
		}
    }else{
		if(DrillUp.g_WL_e_reflection){
			this.push('addText', TextManager.magicReflection.format(target.drill_WL_enemyColorName()));
        }else{
			this.push('wait');
		}
	}
};

//==============================
// * 消息 - 掩护
//==============================
Window_BattleLog.prototype.displaySubstitute = function( substitute, target ){
	if( substitute == undefined ){ return; }
	if( target == undefined ){ return; }
    var substName = substitute.name();
    this.push('performSubstitute', substitute, target);
	if(target.isActor()){
		if(DrillUp.g_WL_a_backup){
			this.push('addText', TextManager.substitute.format(substName, target.drill_WL_actorColorName()));
        }else{
			this.push('wait');
		}
    }else{
		if(DrillUp.g_WL_e_backup){
			this.push('addText', TextManager.substitute.format(substName, target.drill_WL_enemyColorName()));
        }else{
			this.push('wait');
		}
	}
};

//==============================
// * 消息 - 生命变化
//==============================
Window_BattleLog.prototype.displayHpDamage = function( target ){
	if( target == undefined ){ return; }
    if( target.result().hpAffected ){
		
		// > 生命伤害
        if( target.result().hpDamage > 0 && !target.result().drain ){
            this.push('performDamage', target);
			if(target.isActor()){
				if(DrillUp.g_WL_a_hp_damage){
					this.push('addText', this.makeHpDamageText(target));
				}else{
					//this.push('wait');
				}
			}else{
				if(DrillUp.g_WL_e_hp_damage){
					this.push('addText', this.makeHpDamageText(target));
				}else{
					//this.push('wait');
				}
			}
        }
		// > 生命恢复
        if( target.result().hpDamage < 0 ){
            this.push('performRecovery', target);
			if(target.isActor()){
				if(DrillUp.g_WL_a_hp_recover){
					this.push('addText', this.makeHpDamageText(target));
				}else{
					//this.push('wait');
				}
			}else{
				if(DrillUp.g_WL_e_hp_recover){
					this.push('addText', this.makeHpDamageText(target));
				}else{
					//this.push('wait');
				}
			}
        }
    }
};

//==============================
// * 消息 - 魔法变化
//==============================
Window_BattleLog.prototype.displayMpDamage = function( target ){
	if( target == undefined ){ return; }
    if( target.isAlive() && target.result().mpDamage !== 0 ){
		
		// > 魔法伤害
        if( target.result().mpDamage > 0 && !target.result().drain ){
			if(target.isActor()){
				if(DrillUp.g_WL_a_mp_damage){
					this.push('addText', this.makeMpDamageText(target));
				}else{
					//this.push('wait');
				}
			}else{
				if(DrillUp.g_WL_e_mp_damage){
					this.push('addText', this.makeMpDamageText(target));
				}else{
					//this.push('wait');
				}
			}
		}
		// > 魔法恢复
        if( target.result().mpDamage < 0 ){
            this.push('performRecovery', target);
			if( target.isActor() ){
				if( DrillUp.g_WL_a_mp_recover ){
					this.push('addText', this.makeMpDamageText(target));
				}else{
					//this.push('wait');
				}
			}else{
				if( DrillUp.g_WL_e_mp_recover ){
					this.push('addText', this.makeMpDamageText(target));
				}else{
					//this.push('wait');
				}
			}
        }
    }
};

//==============================
// * 消息 - 怒气变化
//==============================
Window_BattleLog.prototype.displayTpDamage = function( target ){
	if( target == undefined ){ return; }
    if( target.isAlive() && target.result().tpDamage !== 0){
		
		// > 怒气伤害
        if( target.result().tpDamage > 0 && !target.result().drain){
			if( target.isActor() ){
				if( DrillUp.g_WL_a_tp_damage ){
					this.push('addText', this.makeTpDamageText(target));
				}else{
					this.push('wait');
				}
			}else{
				if( DrillUp.g_WL_e_tp_damage ){
					this.push('addText', this.makeTpDamageText(target));
				}else{
					this.push('wait');
				}
			}
		}
		// > 怒气恢复
        if( target.result().tpDamage < 0 ){
            this.push('performRecovery', target);
			if( target.isActor() ){
				if( DrillUp.g_WL_a_tp_recover ){
					this.push('addText', this.makeTpDamageText(target));
				}else{
					this.push('wait');
				}
			}else{
				if( DrillUp.g_WL_e_tp_recover ){
					this.push('addText', this.makeTpDamageText(target));
				}else{
					this.push('wait');
				}
			}
        }
    }
};

//==============================
// * 消息 - 添加状态
//==============================
Window_BattleLog.prototype.displayAddedStates = function( target ){
	if( target == undefined ){ return; }
    target.result().addedStateObjects().forEach(function(state){
		if( state == undefined ){ return; }
        if( state.id === target.deathStateId()){
            this.push('performCollapse', target);
        }
        var stateMsg = target.isActor() ? state.message1 : state.message2;
        if( stateMsg ){
            this.push('popBaseLine');
            this.push('pushBaseLine');
			if(target.isActor()){
				if(DrillUp.g_WL_a_states_add){
					this.push('addText', target.drill_WL_actorColorName() + stateMsg);
				}else{
					this.push('wait');
				}
			}else{
				if(DrillUp.g_WL_e_states_add){
					this.push('addText', target.drill_WL_enemyColorName() + stateMsg);
				}else{
					this.push('wait');
				}
			}
            this.push('waitForEffect');
        }
    }, this);
};

//==============================
// * 消息 - 消除状态
//==============================
Window_BattleLog.prototype.displayRemovedStates = function( target ){
	if( target == undefined ){ return; }
    target.result().removedStateObjects().forEach(function( state ){
        if( state && state.message4 ){
            this.push('popBaseLine');
            this.push('pushBaseLine');
			if(target.isActor()){
				if(DrillUp.g_WL_a_states_remove){
					this.push('addText', target.drill_WL_actorColorName() + state.message4);
				}else{
					this.push('wait');
				}
			}else{
				if(DrillUp.g_WL_e_states_remove){
					this.push('addText', target.drill_WL_enemyColorName() + state.message4);
				}else{
					this.push('wait');
				}
			}
        }
    }, this);
};

//==============================
// * 消息 - 弱化强化
//==============================
Window_BattleLog.prototype.displayBuffs = function( target, buffs, fmt ){
	if( target == undefined ){ return; }
	if( buffs == undefined ){ return; }
	if( fmt == undefined ){ return; }
    buffs.forEach(function( paramId ){
        this.push('popBaseLine');
        this.push('pushBaseLine');
		if( target.isActor() ){
			if( DrillUp.g_WL_a_buffs ){
				this.push('addText', fmt.format(target.drill_WL_actorColorName(), TextManager.param(paramId)));
			}else{
				this.push('wait');
			}
		}else{
			if( DrillUp.g_WL_e_buffs ){
				this.push('addText', fmt.format(target.drill_WL_enemyColorName(), TextManager.param(paramId)));
			}else{
				this.push('wait');
			}
		}
    }, this);
};

//==============================
// * 战斗 - 初始战斗对话
//==============================
BattleManager.displayStartMessages = function(){
    if( DrillUp.g_WL_battleStartMessage){
		
		if( Imported.Drill_EnemyTextColor ){	//【Drill_EnemyTextColor  UI - 敌人文本颜色】
			$gameTroop.drill_WL_enemyColorNames().forEach(function(name){
				$gameMessage.add(TextManager.emerge.format(name));
			});
		}else{
			$gameTroop.enemyNames().forEach(function(name){
				$gameMessage.add(TextManager.emerge.format(name));
			});
		}
	};
	if( DrillUp.g_WL_battlePreemptiveMessage){
		if( this._preemptive){
			$gameMessage.add(TextManager.preemptive.format($gameParty.name()));
		} else if( this._surprise){
			$gameMessage.add(TextManager.surprise.format($gameParty.name()));
		}
	};
};

//=============================================================================
// ** 兼容 - 颜色核心
//=============================================================================
//==============================
// * 敌人文本颜色 - 设置颜色
//==============================
Game_Troop.prototype.drill_WL_enemyColorNames = function(){
    var names = [];
    this.members().forEach(function(enemy){
        var name = enemy.drill_WL_enemyColorName();
		if( names.contains(name) == false ){
			names.push(name);
		}
    });
    return names;
};
//==============================
// * 敌人文本颜色 - 设置单个敌人颜色
//==============================
Game_Enemy.prototype.drill_WL_enemyColorName = function(){
	if( Imported.Drill_EnemyTextColor && DrillUp.g_ETC_message ){
		var name = this.name();
		var color = $gameTemp.drill_ETC_getColorId( this.enemyId() );
		if( color >= 0 ){
			name = "\\c["+ String(Number(color)+100) + "]" + name + "\\c[0]";
		}
		return name;
	}else{
		return this.name();
	}
};

//==============================
// * 角色文本颜色 - 设置单个角色颜色
//==============================
Game_Actor.prototype.drill_WL_actorColorName = function(){
	if( Imported.Drill_ActorTextColor && DrillUp.g_ATC_message ){
		var name = this.name();
		var color = $gameTemp.drill_ATC_getColorId( this.actorId() );
		if( color >= 0 ){
			name = "\\c["+ String(Number(color)+100) + "]" + name + "\\c[0]";
		}
		return name;
	}else{
		return this.name();
	}
};

