//=============================================================================
// Drill_AnimationInState.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        动画 - 并行动画绑定于状态
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_AnimationInState +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以将动画与状态绑定，实现 并行+短时间/无限时间 的动画效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于插件才能运行。
 * 基于：
 *   - Drill_AnimationInParallel     动画-并行战斗动画★★v1.4及以上版本★★
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   注意，只作用于战斗界面。
 * 2.更多详细的设置效果，去看看 "12.动画 > 关于魔法效果与并行动画.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 附加、持续、解除
 * 要设置并行的动画，可以直接在状态注释中添加：
 * （注意，冒号左右没有空格）
 * 
 * 状态注释：<状态并行动画:93:附加时>
 * 状态注释：<状态并行动画:93:持续时>
 * 状态注释：<状态并行动画:93:解除时>
 * 状态注释：<状态并行动画:93:附加时:解除后消失>
 *
 * 1.指定单位遭受了该状态，附加、持续、解除时，会播放指定的并行动画。
 * 2."持续时"表示每回合结束时，如果状态仍在，则播放并行动画。
 * 3.你可以设置持续时间非常长的动画效果，并设置状态解除后消失。
 *  （只对多层动画魔法圈等插件有效果。）
 * 4.如果动画设置的是"画面"群体动画，则施法者表示玩家群体位置，
 *   目标表示敌人群体位置。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 命中、躲避
 * 除了以上的情况，还有下面比较特殊的情况，分为四种角色：
 *   被攻击时的自己、被攻击时的攻击者、
 *   主动攻击时的自己、主动攻击时的目标
 * （注意，冒号左右没有空格）
 *
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:HP伤害>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:HP恢复>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:HP吸收>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:MP伤害>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:MP恢复>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:MP吸收>
 * 状态注释：<状态并行动画:93:被攻击躲避时:自己>
 *
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:HP伤害>
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:HP恢复>
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:HP吸收>
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:MP伤害>
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:MP恢复>
 * 状态注释：<状态并行动画:93:被攻击命中时:攻击者:MP吸收>
 * 状态注释：<状态并行动画:93:被攻击躲避时:攻击者>
 *
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:HP伤害>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:HP恢复>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:HP吸收>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:MP伤害>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:MP恢复>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:MP吸收>
 * 状态注释：<状态并行动画:93:主动攻击躲避时:自己>
 *
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:HP伤害>
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:HP恢复>
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:HP吸收>
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:MP伤害>
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:MP恢复>
 * 状态注释：<状态并行动画:93:主动攻击命中时:目标:MP吸收>
 * 状态注释：<状态并行动画:93:主动攻击躲避时:目标>
 * 
 * 1.命中和躲避的角色包含 进攻者 与 自己，自己表示含有该状态的角色。
 * 2.该效果一般用于盾格挡效果，也可以用于加成伤害特效。
 * 3.命中的HP伤害、HP恢复，对应进攻者释放的技能的6个伤害类型。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 如果你设计的状态更具体，比如只挡住火焰属性伤害，可以用注释：
 * 
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:HP伤害:属性类型:6>
 * 状态注释：<状态并行动画:93:被攻击命中时:自己:HP伤害:属性类型:7>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:HP伤害:属性类型:6>
 * 状态注释：<状态并行动画:93:主动攻击命中时:自己:HP伤害:属性类型:7>
 *
 * 1.属性类型后面的数字，对应 数据库->类型->属性 中对应的类型id。
 * 2.如果需要对应三个属性，上面的注释写三行不同的对应就可以了。
 * 3.属性类型中，"无"的id对应 0 ，"普通攻击"的id对应 -1 。
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
 * 优化了注释部分细节。
 * [v1.4]
 * 修改了插件内部的对应关系。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		AISt（Animation_In_State）
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
//				->攻击者与被攻击者 状态
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.核心说明见 并行动画 Drill_AnimationInParallel
//			2.插件的条件其实不多，攻击者与被攻击者，谁拥有状态，攻击的是什么属性。
//			  经过排列组合，注释就变得非常多了。
//			3.MOG_ATB 控制状态依靠eraseState，这里与eraseState绑定，而不是removeState。
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
	DrillUp.g_AISt_tipCurName = "Drill_AnimationInState.js 动画-并行动画绑定于状态";
	DrillUp.g_AISt_tipBasePluginList = ["Drill_AnimationInParallel.js 动画-并行战斗动画"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_AISt_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_AISt_tipBasePluginList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_AISt_tipCurName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_AISt_tipBasePluginList.length; i++){
			message += "\n- ";
			message += DrillUp.g_AISt_tipBasePluginList[i];
		}
		return message;
	};
	
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationInState = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_AnimationInState');

	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_AnimationInParallel ){
	
	
//=============================================================================
// ** 动画绑定时机
//=============================================================================
//==============================
// * 动画初始化 - 附加
//==============================
var _drill_AISt_addNewState = Game_Battler.prototype.addNewState;
Game_Battler.prototype.addNewState = function(stateId) {
    _drill_AISt_addNewState.call(this,stateId);
	//附加重复的状态不播放动画
	
	var note = String($dataStates[stateId].note);
	var types = (note.match( /<状态并行动画:([^<>]*?)>/g )) || [];
	for(var r = 0;r< types.length; r++){
		var l = (types[r].match( /<状态并行动画:([^<>]*?)>/ )) || [];
		//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。
		
		var args = String(l[1]).split(':');
		if( args.length >= 1 ){
			if(args[0]){ var a_id = Number(args[0]);}
			if(args[1]){ var type = String(args[1]);}
			if ( type == "附加时"){
				this.drill_AIP_startParallelAnimation( a_id, false,0);
			}
		}
	}
};

//==============================
// * 动画初始化 - 持续
//==============================
var _drill_AISt_updateStateTurns = Game_BattlerBase.prototype.updateStateTurns;
Game_BattlerBase.prototype.updateStateTurns = function() {
    _drill_AISt_updateStateTurns.call(this);

	for(var i = 0; i< this._states.length ;i++){
		var stateId = this._states[i];
		var note = String($dataStates[stateId].note);
		var types = (note.match( /<状态并行动画:([^<>]*?)>/g )) || [];
		for(var r = 0;r< types.length; r++){
			var l = (types[r].match( /<状态并行动画:([^<>]*?)>/ )) || [];
			//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。
			
			var args = String(l[1]).split(':');
			if( args.length >= 1 ){
				if(args[0]){ var a_id = Number(args[0]);}
				if(args[1]){ var type = String(args[1]);}
				if ( type == "持续时"){
					this.drill_AIP_startParallelAnimation( a_id, false,0);
				}
			}
		}
	}
};

//==============================
// * 动画初始化 - 移除（用删除更好一些）
//==============================
/*
var _drill_AISt_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    _drill_AISt_removeState.call(this,stateId);
};*/

//==============================
// * 动画初始化 - 删除
//==============================
var _drill_AISt_eraseState = Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function(stateId) {
	
	var note = String($dataStates[stateId].note);
	var types = (note.match( /<状态并行动画:([^<>]*?)>/g )) || [];
	for(var r = 0;r< types.length; r++){
		var l = (types[r].match( /<状态并行动画:([^<>]*?)>/ )) || [];
		//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。
		
		var args = String(l[1]).split(':');
		if( args.length >= 1 ){
			if(args[0]){ var a_id = Number(args[0]);}
			if(args[1]){ var type = String(args[1]);}
			if(args[2]){ var temp1 = String(args[2]);}
			if( type == "解除时" ){
				this.drill_AIP_startParallelAnimation( a_id, false,0);
			}
			if( type == "附加时" && temp1 == "解除后消失" ){
				
				if( this instanceof Game_Actor ){	//（并行战斗动画 的接口）
					$gameTemp.drill_AIP_setAnimDeathByAnimId_Actor( this, a_id );
				}
				if( this instanceof Game_Enemy ){
					$gameTemp.drill_AIP_setAnimDeathByAnimId_Enemy( this, a_id );
				}
			}
		}
	}
	_drill_AISt_eraseState.call(this,stateId);
};

//==============================
// * 动画初始化 - 解除（全部清空）
//==============================
var _drill_AISt_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    _drill_AISt_clearStates.call(this);
	
	if( this instanceof Game_Actor ){	//（并行战斗动画 的接口）
		$gameTemp.drill_AIP_setAllAnimDeath_Actor( this );
	}
	if( this instanceof Game_Enemy ){
		$gameTemp.drill_AIP_setAllAnimDeath_Enemy( this );
	}
};

//==============================
// * 动画初始化 - 命中、躲避
//==============================
var _drill_AISt_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	_drill_AISt_apply.call(this,target);
	
	var result = target.result();
	//--------------------------------
	//----被攻击
	var states = target.states();
	for(var i = 0;i< states.length; i++){
		var note = String(states[i].note);
		var types = (note.match( /<状态并行动画:([^<>]*?)>/g )) || [];
		for(var r = 0;r< types.length; r++){
			var l = (types[r].match( /<状态并行动画:([^<>]*?)>/ )) || [];
			//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。

			var args = String(l[1]).split(':');
			if( args.length >= 2 ){
				if(args[0]){ var a_id = Number(args[0]);}
				if(args[1]){ var type = String(args[1]);}
				if(args[2]){ var temp1 = String(args[2]);}
				if(args[3]){ var temp2 = String(args[3]);}
				if(args[4]){ var temp3 = String(args[4]);}
				if(args[5]){ var temp4 = String(args[5]);}
				if ( type == "被攻击命中时"){
					var damage_type = this.item().damage.type ;
					var damage_attr = this.item().damage.elementId ;
					if (result.isHit() && damage_type > 0 ) {
						var is_actived = false;
						if( temp3 == "属性类型" ){
							if ( damage_type == 1 && temp2 == "HP伤害" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 2 && temp2 == "MP伤害" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 3 && temp2 == "HP恢复" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 4 && temp2 == "MP恢复" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 5 && temp2 == "HP吸收" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 6 && temp2 == "MP吸收" && Number(temp4) == damage_attr ){ is_actived = true; }
						}else{
							if ( damage_type == 1 && temp2 == "HP伤害"){ is_actived = true; }
							if ( damage_type == 2 && temp2 == "MP伤害"){ is_actived = true; }
							if ( damage_type == 3 && temp2 == "HP恢复"){ is_actived = true; }
							if ( damage_type == 4 && temp2 == "MP恢复"){ is_actived = true; }
							if ( damage_type == 5 && temp2 == "HP吸收"){ is_actived = true; }
							if ( damage_type == 6 && temp2 == "MP吸收"){ is_actived = true; }
						}
						if(is_actived){
							if ( temp1 == "攻击者"){
								this.subject().drill_AIP_startParallelAnimation( a_id, false,0);
							}
							if ( temp1 == "自己" ){
								target.drill_AIP_startParallelAnimation( a_id, false,0);
							}
						}
					}
				}
				if ( type == "被攻击躲避时"){
					if ( !result.isHit() && this.item().damage.type > 0 ) {
						if ( temp1 == "攻击者"){
							this.subject().drill_AIP_startParallelAnimation( a_id, false,0);
						}
						if ( temp1 == "自己" ){
							target.drill_AIP_startParallelAnimation( a_id, false,0);
						}
					}
				}
			}
		}
	}
	//--------------------------------
	//----主动攻击
	states = this.subject().states();
	for(var i = 0;i< states.length; i++){
		var note = String(states[i].note);
		var types = (note.match( /<状态并行动画:([^<>]*?)>/g )) || [];
		for(var r = 0;r< types.length; r++){
			var l = (types[r].match( /<状态并行动画:([^<>]*?)>/ )) || [];
			//alert(l);		//正则，g搜索每行符合列，然后在每个符合字符串中抽取出 数字。

			var args = String(l[1]).split(':');
			if( args.length >= 2 ){
				if(args[0]){ var a_id = Number(args[0]);}
				if(args[1]){ var type = String(args[1]);}
				if(args[2]){ var temp1 = String(args[2]);}
				if(args[3]){ var temp2 = String(args[3]);}
				if(args[4]){ var temp3 = String(args[4]);}
				if(args[5]){ var temp4 = String(args[5]);}
				if ( type == "主动攻击命中时"){
					var damage_type = this.item().damage.type ;
					var damage_attr = this.item().damage.elementId ;
					if (result.isHit() && damage_type > 0 ) {
						var is_actived = false;
						if( temp3 == "属性类型" ){
							if ( damage_type == 1 && temp2 == "HP伤害" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 2 && temp2 == "MP伤害" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 3 && temp2 == "HP恢复" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 4 && temp2 == "MP恢复" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 5 && temp2 == "HP吸收" && Number(temp4) == damage_attr ){ is_actived = true; }
							if ( damage_type == 6 && temp2 == "MP吸收" && Number(temp4) == damage_attr ){ is_actived = true; }
						}else{
							if ( damage_type == 1 && temp2 == "HP伤害"){ is_actived = true; }
							if ( damage_type == 2 && temp2 == "MP伤害"){ is_actived = true; }
							if ( damage_type == 3 && temp2 == "HP恢复"){ is_actived = true; }
							if ( damage_type == 4 && temp2 == "MP恢复"){ is_actived = true; }
							if ( damage_type == 5 && temp2 == "HP吸收"){ is_actived = true; }
							if ( damage_type == 6 && temp2 == "MP吸收"){ is_actived = true; }
						}
						if(is_actived){
							if ( temp1 == "自己"){
								this.subject().drill_AIP_startParallelAnimation( a_id, false,0);
							}
							if ( temp1 == "目标" ){
								target.drill_AIP_startParallelAnimation( a_id, false,0);
							}
						}
					}
				}
				if ( type == "主动攻击躲避时"){
					if ( !result.isHit() && this.item().damage.type > 0 ) {
						if ( temp1 == "自己"){
							this.subject().drill_AIP_startParallelAnimation( a_id, false,0);
						}
						if ( temp1 == "目标" ){
							target.drill_AIP_startParallelAnimation( a_id, false,0);
						}
					}
				}
			}
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_AnimationInState = false;
		var tip = DrillUp.drill_AISt_getPluginTip_NoBasePlugin();
		alert( tip );
}

