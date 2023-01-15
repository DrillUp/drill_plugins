//=============================================================================
// Drill_AnimationInSkill.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        动画 - 并行动画绑定于技能
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_AnimationInSkill +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在技能释放的过程中，实现 并行+短时间 的动画效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于插件才能运行，也可以配合下面插件使用：
 * 基于：
 *   - Drill_AnimationInParallel     动画-并行战斗动画★★v1.4及以上版本★★
 * 作用于：
 *   - Drill_AnimationSkillSettings  动画-技能动画设置★★v1.1及以上版本★★
 *     通过该插件，技能的朝向、位移、大小进行设置可以作用于并行动画。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   注意，只作用于战斗界面。
 * 2.更多详细的设置效果，去看看 "12.动画 > 关于魔法效果与并行动画.docx"。
 * 设计：
 *   (1.注意，普通技能 不要 绑定无限时间的动画效果，
 *      战斗中会因此串行等待而永久卡界面。
 *      rmmv技能设置的动画 与 该插件设置的并行动画，是两种不同的动画。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 要设置并行的动画，可以直接在技能注释或者物品注释中添加：
 * （注意，冒号左右没有空格）
 * 
 * 技能注释：<技能并行动画:54:施法者:一次>
 * 技能注释：<技能并行动画:54:施法者:连续>
 * 技能注释：<技能并行动画:93:目标:一次>
 * 技能注释：<技能并行动画:93:目标:连续>
 * 
 * 物品注释：<技能并行动画:54:施法者:一次>
 * 物品注释：<技能并行动画:54:施法者:连续>
 * 物品注释：<技能并行动画:93:目标:一次>
 * 物品注释：<技能并行动画:93:目标:连续>
 *
 * 1.数字对应要并行的动画编号。
 * 2.如果rmmv中动画设置的是"画面"群体动画，则施法者表示玩家群体位置，
 *   目标表示敌人群体位置。
 * 3.如果技能的连续次数为6次，"连续"表示伤害6次播放6次，"一次"表示只播放1次。
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
 * 测试方法：   在战斗界面中测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只单次执行，且基于 并行战斗动画 进行动画播放，
 *   所以几乎没有消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了sv模式下，针对玩家的动画并行无效的问题。
 * [v1.2]
 * 修改了内部结构。
 * [v1.3]
 * 使得该插件与 技能动画设置 插件相互适配。
 * [v1.4]
 * 修改了插件内部的对应关系。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		AISk（Animation_In_Skill）
//		临时全局变量	无
//		临时局部变量	【无】
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	战斗界面
//		★性能测试消耗	未找到
//		★最坏情况		无
//		★备注			该插件基于 AIP并行战斗动画，那个是单次执行，能找到8.8ms的消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			并行动画绑定于状态：
//				->战斗不阻塞设置
//				->并行播放
//				->施法者与目标
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.核心说明见 并行动画 Drill_AnimationInParallel
//			2.技能的并行动画都是一瞬间的。不适合持续魔法效果。
//			（持续动画并连续伤害的技能，是有，但是目前不考虑，毕竟rmmv都限制了连续次数）
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_AISk_tipCurName = "Drill_AnimationInSkill.js 动画-并行动画绑定于技能";
	DrillUp.g_AISk_tipBasePluginList = ["Drill_AnimationInParallel.js 动画-并行战斗动画"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_AISk_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_AISk_tipBasePluginList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_AISk_tipCurName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_AISk_tipBasePluginList.length; i++){
			message += "\n- ";
			message += DrillUp.g_AISk_tipBasePluginList[i];
		}
		return message;
	};

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationInSkill = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_AnimationInSkill');

	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_AnimationInParallel ){
	
	
//=============================================================================
// ** 注释初始化
//=============================================================================
//==============================
// * 玩家选定了一个技能时
//==============================
/* Game_Action包含了 Game_Item 用于存储技能、物品的数据
Game_Action.prototype.setSkill = function(skillId) {	//（该函数为玩家选定了一个技能时的时机）
    this._item.setObject($dataSkills[skillId]);
	if( skillId == 25){
		this.subject().startAnimation( 143, false,0);
	}
};*/

//==============================
// * 技能开始作用时
//==============================
var _drill_AISk_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	_drill_AISk_apply.call(this,target);
	this.drill_AISk_setParallelAnimation(target);
}
Game_Action.prototype.drill_AISk_setParallelAnimation = function(target) {
	var is_consecutive = true;		//判断当前攻击是否连续
	if(this._drill_AISk_last_target == undefined){
		this._drill_AISk_last_target = target;
		is_consecutive = false;
	}
	if(this._drill_AISk_last_target != target){
		this._drill_AISk_last_target = target;
		is_consecutive = false;
	}
	
	var note = "";
	if( this.isSkill() ){ note = String($dataSkills[this._item.itemId()].note); }
	if( this.isItem() ){ note = String($dataItems[this._item.itemId()].note); }
			
	var types = (note.match( /<技能并行动画:([^<>]*?)>/g )) || [];
	for(var r = 0;r< types.length; r++){
		var l = (types[r].match( /<技能并行动画:([^<>]*?)>/ )) || [];
		//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。

		var args = String(l[1]).split(':');
		if( args.length >= 2 ){
			if(args[0]){ var a_id = Number(args[0]);}
			if(args[1]){ var type = String(args[1]);}
			if(args[2]){ var temp1 = String(args[2]);}
			if ( type == "施法者"){
				if ( temp1 == "连续"){
					this.drill_AISk_startParallelAnimation( this.subject(), a_id, note);
				}
				if ( temp1 == "一次" && is_consecutive == false){
					this.drill_AISk_startParallelAnimation( this.subject(), a_id, note);
				}
			}
			if ( type == "目标"){
				if( target.isAlive() ){ 	//死亡后不播放动画
					if ( temp1 == "连续"){
						this.drill_AISk_startParallelAnimation( target, a_id, note);
					}
					if ( temp1 == "一次" && is_consecutive == false){
						this.drill_AISk_startParallelAnimation( target, a_id, note);
					}
				}
			}
		}
	}
}
//==============================
// * 播放动画（用于其它插件扩展）
//==============================
Game_Action.prototype.drill_AISk_startParallelAnimation = function( battler , a_id , note ) {
	battler.drill_AIP_startParallelAnimation( a_id, false, 0 );
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_AnimationInSkill = false;
		var tip = DrillUp.drill_AISk_getPluginTip_NoBasePlugin();
		alert( tip );
}

