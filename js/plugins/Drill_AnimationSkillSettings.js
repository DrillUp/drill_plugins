//=============================================================================
// Drill_AnimationSkillSettings.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        动画 - 技能动画设置
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_AnimationSkillSettings +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得各个技能对相同的动画做不同的朝向、位移、大小处理，产生不同效果。
 * ★★必须放在 并行动画绑定于技能 插件后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，也可以配合下面插件使用：
 * 作用于：
 *   - Drill_AnimationInSkill 动画 - 并行动画绑定于技能 ★★v1.3及以上版本★★
 *     可以使得目标并行动画也能对朝向、位移、大小进行设置。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于 rmmv技能动画 和 并行动画。
 * 2.朝向、位移、大小之间相互独立，可以叠加使用。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 要设置并行的动画，可以直接在技能注释或者物品注释中添加：
 * （注意，冒号左右没有空格）
 * 
 * 技能注释：<技能动画设置:朝向:随机>
 * 技能注释：<技能动画设置:朝向:固定:180>
 * 技能注释：<技能动画设置:位移:随机:60>
 * 技能注释：<技能动画设置:位移:固定:0:80>
 * 技能注释：<技能动画设置:位移:混乱:60>
 * 技能注释：<技能动画设置:大小:固定:0.5:0.5>
 * 技能注释：<技能动画设置:大小:随机:0.5:1.5>
 * 
 * 物品注释：<技能动画设置:朝向:随机>
 * 物品注释：<技能动画设置:朝向:固定:180>
 * 物品注释：<技能动画设置:位移:随机:60>
 * 物品注释：<技能动画设置:位移:固定:0:80>
 * 物品注释：<技能动画设置:位移:混乱:60>
 * 物品注释：<技能动画设置:大小:固定:0.5:0.5>
 * 物品注释：<技能动画设置:大小:随机:0.5:1.5>
 *
 * 1.朝向随机，表示随机0-360度的朝向旋转。
 *   朝向固定，参数表示逆时针旋转角度。0为不旋转。
 * 2.位移随机，参数表示偏移量，单位像素。设置100表示100x100的方形区域随机出现。
 *   位移固定，两个参数表示xy偏移量，单位像素。
 *   位移混乱，参数表示偏移量，单位像素。与随机一样，但由于是混乱随机，每一帧
 *             都会随机位移，实际会有多个重影效果。
 * 3.大小固定，两个参数表示x横向缩放和y纵向缩放，1.0:1.0表示原比例。
 *   大小随机，两个参数表示缩放范围，0.5:1.5表示动画大小在随机比例0.5-1.5之间。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ASS（Animation_Skill_Settings）
//		临时全局变量	无
//		临时局部变量	this._drill_ASS.xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Game_Actor.prototype.startAnimation（核）
//
//插件记录：
//		★大体框架与功能如下：
//			随机朝向与位移：
//				->原生rmmv技能与动画 的数据连接
//				->技能与并行动画 的数据连接
//				->旋转、偏移
//
//		★必要注意事项：
//			1.数据传输核有覆盖重写的方法。
//
//		★其它说明细节：
//			1.rmmv战斗系统的技能与动画播放是延时的，必须遵照流程：
//			    this.push('performActionStart', subject, action);
//			    this.push('waitForMovement');
//			    this.push('performAction', subject, action);
//			    this.push('showAnimation', subject, targets.clone(), item.animationId);
//			Window_BattleLog > 到了敌人/角色回合 > performActionStart > 上述流程 > showAnimation > 判断action是普通攻击还是技能 > 单位中设置动画数据
//				由于push，方法执行的时间是有差距的，动画和技能是断开的方法。
//				唯一的接入点在于"performAction"和"showAnimation"方法之间。
//			
//		★存在的问题：
//			暂无

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationSkillSettings = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_AnimationSkillSettings');



//=============================================================================
// * 	原生rmmv技能与动画 数据传输核
//
//		功能：		将Game_Action中的数据（技能/物品），传输到动画贴图中。
//		可选项：	无
//		主函数：	this.drill_pushAnimExData(data);		//Window_BattleLog中
//					var data = this.drill_getAnimExData();	//Sprite_Animation中
//					也可以直接手动封装调用（见drill_AISk_startParallelAnimation函数）
//		注意事项：	1.核要放在调用函数前面。
//					2.data必须是json格式。
//=============================================================================
if( typeof(_drill_AnimExData_showNormalAnimation) == "undefined" ){	//防止重复定义

	//==============================
	// * 战斗流程 - 传入值
	//==============================
	Window_BattleLog.prototype.drill_pushAnimExData = function(data) {
		var keys = Object.keys(data);
		for(var i = 0; i<keys.length; i++){
			this._drill_AnimExData_data[keys[i]] = data[keys[i]];
		}
	}
	//==============================
	// * 战斗流程 - 初始化
	//==============================
	var _drill_AnimExData_initialize = Window_BattleLog.prototype.initialize;
	Window_BattleLog.prototype.initialize = function() {
		_drill_AnimExData_initialize.call(this);
		this._drill_AnimExData_data = {};
	};
	//==============================
	// * 战斗流程 - 播放动画
	//==============================
	var _drill_AnimExData_showNormalAnimation = Window_BattleLog.prototype.showNormalAnimation;
	Window_BattleLog.prototype.showNormalAnimation = function(targets, animationId, mirror) {
		this._drill_AnimExData_data['_drill_mirror'] = mirror;
		_drill_AnimExData_showNormalAnimation.call(this, targets, animationId, this._drill_AnimExData_data);
		this._drill_AnimExData_data = {};
	};
	//==============================
	// * 角色 - 播放动画（覆写）
	//==============================
	Game_Actor.prototype.startAnimation = function(animationId, mirror, delay) {
		if( typeof(mirror) == "boolean" ){ 
			mirror = !mirror;
		}else if( typeof(mirror) == "object" ){
			mirror['_drill_mirror'] = !mirror;
		}
		Game_Battler.prototype.startAnimation.call(this, animationId, mirror, delay);
	};
	//==============================
	// * 动画贴图 - 转换数据
	//==============================
	var _drill_AnimExData_setup = Sprite_Animation.prototype.setup;
	Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
		this._drill_AnimExData = {};
		if( typeof(mirror) == "boolean" ){ 
			//不操作
		}else if( typeof(mirror) == "undefined" ){
			mirror = true; 		
		}else if( typeof(mirror) == "object" ){
			var temp_data = JSON.parse(JSON.stringify( mirror ));	//复制一份
			if( temp_data['_drill_mirror'] == true ){
				mirror = true; 
			}else{
				mirror = false; 
			}
			this._drill_AnimExData = temp_data;
		}
		_drill_AnimExData_setup.call(this, target, animation, mirror, delay);
	};
	//==============================
	// * 动画贴图 - 获取数据
	//==============================
	Sprite_Animation.prototype.drill_getAnimExData = function() {
		return this._drill_AnimExData;
	}
}
	
	
//=============================================================================
// ** 数据设置
//=============================================================================
//==============================
// * 原生rmmv技能与动画
//==============================
var _drill_ASS_performAction = Window_BattleLog.prototype.performAction;
Window_BattleLog.prototype.performAction = function(subject, action) {
    _drill_ASS_performAction.call(this, subject, action);
	
	var temp_data = {};
	temp_data._drill_ASS = {};
	
	var note = "";
	if( action.isSkill() ){ note = String($dataSkills[action._item.itemId()].note); }
	if( action.isItem() ){ note = String($dataItems[action._item.itemId()].note); }
	var note_list = note.split('\n');
	for(var i=0; i< note_list.length; i++){
		var re_filter = /<技能动画设置:([^<>]*?)>/; 
		var commands = (note_list[i].match(re_filter)) || [];
		if(commands != "" && commands != [] ){
			var args = commands[1].split(':');
			if( args.length == 2 ){
				var type = String(args[0]);
				var type2 = String(args[1]);
				if(type == "朝向"){
					temp_data._drill_ASS.rotateType = type2;
				}
			}
			if( args.length == 3 ){
				var type = String(args[0]);
				var type2 = String(args[1]);
				var temp1 = Number(args[2]);
				if(type == "朝向"){
					temp_data._drill_ASS.rotateType = type2;
					temp_data._drill_ASS.rotateData1 = temp1;
				}
				if(type == "位移"){
					temp_data._drill_ASS.moveType = type2;
					temp_data._drill_ASS.moveData1 = temp1;
					temp_data._drill_ASS.moveData2 = temp1;
				}
				if(type == "大小"){
					temp_data._drill_ASS.resizeType = type2;
					temp_data._drill_ASS.resizeData1 = temp1;
					temp_data._drill_ASS.resizeData2 = temp1;
				}
			}
			if( args.length == 4 ){
				var type = String(args[0]);
				var type2 = String(args[1]);
				var temp1 = Number(args[2]);
				var temp2 = Number(args[3]);
				if(type == "位移"){
					temp_data._drill_ASS.moveType = type2;
					temp_data._drill_ASS.moveData1 = temp1;
					temp_data._drill_ASS.moveData2 = temp2;
				}
				if(type == "大小"){
					temp_data._drill_ASS.resizeType = type2;
					temp_data._drill_ASS.resizeData1 = temp1;
					temp_data._drill_ASS.resizeData2 = temp2;
				}
			}
		}
	}
			
	
	this.drill_pushAnimExData(temp_data);
};

//==============================
// * 并行动画
//==============================
if(Imported.Drill_AnimationInSkill){
	
	Game_Action.prototype.drill_AISk_startParallelAnimation = function( battler , a_id , note ) {
		var temp_data = {};
		temp_data._drill_mirror = false;
		temp_data._drill_ASS = {};
		temp_data._drill_ASS.rotateType = "";
		temp_data._drill_ASS.rotateData1 = 0;
		temp_data._drill_ASS.moveType = "";
		temp_data._drill_ASS.moveData1 = 0;
		temp_data._drill_ASS.moveData2 = 0;
		temp_data._drill_ASS.resizeType = "";
		temp_data._drill_ASS.resizeData1 = 1.0;
		temp_data._drill_ASS.resizeData2 = 1.0;
		
		var note_list = note.split('\n');
		for(var i=0; i< note_list.length; i++){
			var re_filter = /<技能动画设置:([^<>]*?)>/; 
			var commands = (note_list[i].match(re_filter)) || [];
			if(commands != "" && commands != [] ){
				var args = commands[1].split(':');
				if( args.length == 2 ){
					var type = String(args[0]);
					var type2 = String(args[1]);
					if(type == "朝向"){
						temp_data._drill_ASS.rotateType = type2;
					}
				}
				if( args.length == 3 ){
					var type = String(args[0]);
					var type2 = String(args[1]);
					var temp1 = Number(args[2]);
					if(type == "朝向"){
						temp_data._drill_ASS.rotateType = type2;
						temp_data._drill_ASS.rotateData1 = temp1;
					}
					if(type == "位移"){
						temp_data._drill_ASS.moveType = type2;
						temp_data._drill_ASS.moveData1 = temp1;
						temp_data._drill_ASS.moveData2 = temp1;
					}
					if(type == "大小"){
						temp_data._drill_ASS.resizeType = type2;
						temp_data._drill_ASS.resizeData1 = temp1;
						temp_data._drill_ASS.resizeData2 = temp1;
					}
				}
				if( args.length == 4 ){
					var type = String(args[0]);
					var type2 = String(args[1]);
					var temp1 = Number(args[2]);
					var temp2 = Number(args[3]);
					if(type == "位移"){
						temp_data._drill_ASS.moveType = type2;
						temp_data._drill_ASS.moveData1 = temp1;
						temp_data._drill_ASS.moveData2 = temp2;
					}
					if(type == "大小"){
						temp_data._drill_ASS.resizeType = type2;
						temp_data._drill_ASS.resizeData1 = temp1;
						temp_data._drill_ASS.resizeData2 = temp2;
					}
				}
			}
		}
		
		battler.drill_startParallelAnimation( a_id, temp_data, 0);
	}

}

//=============================================================================
// ** 动画设置
//=============================================================================
//==============================
// * 动画贴图 - 随机设置
//==============================
var _drill_ASS_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
	_drill_ASS_setup.call(this, target, animation, mirror, delay);
	var data = this.drill_getAnimExData();
	if( data && data._drill_ASS ){
		
		if( data._drill_ASS.rotateType == "随机" ){	//朝向
			this.rotation = Math.random()*Math.PI*2;
		}
		if( data._drill_ASS.rotateType == "固定" ){
			this.rotation = data._drill_ASS.rotateData1 / 180 * Math.PI;
		}
		
		if( data._drill_ASS.moveType == "随机" ){	//位移
			this._drill_factor_x = Math.random() - 0.5;
			this._drill_factor_y = Math.random() - 0.5;
		}
		
		if( data._drill_ASS.resizeType == "随机" ){	//大小
			var min = data._drill_ASS.resizeData1;
			var max = data._drill_ASS.resizeData2;
			this._drill_factor_size = Math.random() * (max - min) + min ;
		}
		
	}
}
//==============================
// * 动画贴图 - 随机设置
//==============================
var _drill_ASS_updatePosition = Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function() {
	_drill_ASS_updatePosition.call(this);
	var data = this.drill_getAnimExData();
	if( data && data._drill_ASS ){
		
		if( data._drill_ASS.moveType == "固定" ){	//位移
			this.x += data._drill_ASS.moveData1;
			this.y += data._drill_ASS.moveData2;
		}
		if( data._drill_ASS.moveType == "随机" ){
			this.x += this._drill_factor_x * data._drill_ASS.moveData1;
			this.y += this._drill_factor_y * data._drill_ASS.moveData2;
		}
		if( data._drill_ASS.moveType == "混乱" ){
			this.x += (Math.random() - 0.5)*data._drill_ASS.moveData1;
			this.y += (Math.random() - 0.5)*data._drill_ASS.moveData2;
		}
		
		if( data._drill_ASS.resizeType == "固定" ){	//大小
			this.scale.x = data._drill_ASS.resizeData1;
			this.scale.y = data._drill_ASS.resizeData2;
		}
		if( data._drill_ASS.resizeType == "随机" ){
			this.scale.x = this._drill_factor_size;
			this.scale.y = this._drill_factor_size;
		}
	}
}
	
