//=============================================================================
// Drill_AnimationInParallel.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        动画 - 并行战斗动画
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_AnimationInParallel +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使用插件指令播放并行的动画效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也可以配合下面插件使用：
 * 作用于：
 *   - Drill_AnimationCircle    动画-多层动画魔法圈★★v1.5及以上版本★★
 *   - Drill_AnimationParticle  动画-多层动画粒子★★v1.5及以上版本★★
 *   - Drill_AnimationGif       动画-多层动画Gif★★v1.5及以上版本★★
 *   - Drill_AnimationSurround  动画-多层动画环绕球
 *     该插件执行 立即消失 时，可以关闭指定 动画 的全部装饰贴图。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   注意，只作用于战斗界面。
 * 2.更多详细的设置效果，去看看 "12.动画 > 关于魔法效果与并行动画.docx"。
 * 细节：
 *   (1.并行关联id的动画不会被加密直接识别，需要在地图事件中至少播放一次。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令添加要播放的并行动画：
 * （注意，冒号左右都有一个空格）
 * 
 * 插件指令：>并行战斗动画 : 动画[96] : 敌方[1] : 播放
 * 插件指令：>并行战斗动画 : 动画[96] : 敌方全体 : 播放
 * 插件指令：>并行战斗动画 : 动画[96] : 敌方变量[21] : 播放
 * 插件指令：>并行战斗动画 : 动画[96] : 我方[1] : 播放
 * 插件指令：>并行战斗动画 : 动画[96] : 我方全体 : 播放
 * 插件指令：>并行战斗动画 : 动画[96] : 我方变量[21] : 播放
 * 插件指令：>并行战斗动画 : 动画[96] : 战斗敌人[5] : 播放
 * 插件指令：>并行战斗动画 : 动画[96] : 战斗敌人变量[21] : 播放
 * 插件指令：>并行战斗动画 : 动画[96] : 战斗角色[5] : 播放
 * 插件指令：>并行战斗动画 : 动画[96] : 战斗角色变量[21] : 播放
 * 
 * 插件指令：>并行战斗动画 : 动画[96] : 敌方[1] : 播放
 * 插件指令：>并行战斗动画 : 动画[96] : 敌方[1] : 立即消失
 * 
 * 1.前半部分（动画[96]）和 后半部分（敌方[2]）的参数
 *   可以随意组合。一共有10*2种组合方式。
 * 2."敌方[1]"表示从左往右第1个敌人，
 *   "敌人[5]"表示所有 敌人id 为5的敌方单位。
 * 3.如果你的动画时间非常长，可以用该指令手动设置结束。
 *   注意结束并行战斗动画，只对 动画魔法圈等插件 的设置有效。
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
 * 测试结果：   战斗界面中，平均消耗为：【8.80ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只单次执行，用于播放并行动画，所以消耗并不大。
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
 * 修改了插件指令结构。
 * [v1.4]
 * 大幅度优化了内部结构。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		AIP（Animation_In_Parallel）
//		临时全局变量	无
//		临时局部变量	【无】
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Sprite_Base.prototype.isAnimationPlaying
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	物体管理层
//		★性能测试消耗	8.80ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			并行动画：
//				->战斗不阻塞设置
//				->并行播放
//				->插件指令
//
//		★必要注意事项：
//			1.【并行动画的核心，是==**动画**==后面的5个函数。可以累加/覆写多次，且不影响程序，也不需写唯一定义锁。】
//			2.真正阻止战斗等待的，是：
//				BattleManager.update = function() {
//  				if (!this.isBusy() && !this.updateEvent()) {}
//				}
//
//		★其它说明细节：
//			1.寻找路线超级绕：
//				找到阻止函数：
//				-> BattleManager.isBusy()  战斗任何等待动作都经过该函数
//				-> ($gameMessage.isBusy() || this._spriteset.isBusy() || this._logWindow.isBusy()) 信息、战斗图像、对话框 的等待
//				-> Spriteset_Battle.isAnimationPlaying()
//				-> Sprite_Base.isAnimationPlaying()
//				找到添加并行动画方法： 
//				-> BattleManager.updateAction()
//				-> BattleManager.startAction()（这里是死胡同，因为这里的方法都是一次性的计算）
//				-> Game_Battler.prototype.startAnimation(xxx) 从强制播放动画函数入手
//				-> Game_Battler.prototype.isAnimationRequested() （Game_Battler只存储基本的json数据，可以从这里把并行数据塞入）
//				-> Sprite_Battler.prototype.setupAnimation() 转到sprite.js，该方法用到了上面的函数，而且还是while……不明所以 
//				-> Sprite_Battler.prototype.startAnimation(xxx) 该函数创建动画，并加入_animationSprites，开始播放。
//			2.该插件写出来的函数非常绕。如果要修改，最好把上面的路线走一遍，再考虑。
//			3.这里的sv模式下，我没有找到是谁在调用startAnimation。
//				脚本中可以找到的函数都没有被触发，这就很奇怪。
//				（不过，我改变了一下策略，默认的动画都是并行，手动设置不并行，这样就不存在卡住的问题了。）
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
	DrillUp.g_AIP_tipCurName = "Drill_AnimationInParallel.js 动画-并行战斗动画";
	DrillUp.g_AIP_tipBasePluginList = [];

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_AnimationInParallel = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_AnimationInParallel');


//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_AIP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_AIP_pluginCommand.call(this, command, args);
	if( command === ">并行战斗动画" ){
		
		/*-----------------对象组获取 - 动画------------------*/
		var anim_str = null;
		var actor_list = null;
		var enemy_list = null;
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( anim_str == null && temp1.indexOf("动画[") != -1 ){
				temp1 = temp1.replace("动画[","");
				temp1 = temp1.replace("]","");
				anim_str = temp1;
			}
		}
		/*-----------------对象组获取 - 战斗单位------------------*/
		if( args.length >= 4 ){
			var unit = String(args[3]);
			if( enemy_list == null && unit == "敌方全体" ){
				enemy_list = [];
				for( var k=0; k < $gameTroop.members().length; k++ ){
					var battler = $gameTroop.members()[k];
					if( battler.isAlive() ){
						enemy_list.push( battler );
					}
				}
			}
			if( enemy_list == null && unit.indexOf("敌方[") != -1 ){
				unit = unit.replace("敌方[","");
				unit = unit.replace("]","");
				var battler_id = Number(unit)-1;
				var battler = $gameTroop.members()[ battler_id ];
				if( battler == undefined ){ return; }
				enemy_list = [];
				enemy_list.push( battler );
			}
			if( enemy_list == null && unit.indexOf("敌方变量[") != -1 ){
				unit = unit.replace("敌方变量[","");
				unit = unit.replace("]","");
				var battler_id = $gameVariables.value(Number(unit))-1;
				var battler = $gameTroop.members()[ battler_id ];
				if( battler == undefined ){ return; }
				enemy_list = [];
				enemy_list.push( battler );
			}
			
			if( actor_list == null && unit == "我方全体" ){
				actor_list = [];
				for( var k=0; k < $gameParty.members().length; k++ ){
					var battler = $gameParty.members()[k];
					if( battler.isAlive() ){
						actor_list.push( battler );
					}
				}
			}
			if( actor_list == null && unit.indexOf("我方[") != -1 ){
				unit = unit.replace("我方[","");
				unit = unit.replace("]","");
				var battler_id = Number(unit)-1;
				var battler = $gameParty.members()[ battler_id ];
				if( battler == undefined ){ return; }
				actor_list = [];
				actor_list.push( battler );
			}
			if( actor_list == null && unit.indexOf("我方变量[") != -1 ){
				unit = unit.replace("我方变量[","");
				unit = unit.replace("]","");
				var battler_id = $gameVariables.value(Number(unit))-1;
				var battler = $gameParty.members()[ battler_id ];
				if( battler == undefined ){ return; }
				actor_list = [];
				actor_list.push( battler );
			}
			
			if( enemy_list == null && unit.indexOf("战斗敌人变量[") != -1 ){
				unit = unit.replace("战斗敌人变量[","");
				unit = unit.replace("]","");
				enemy_list = [];
				var battler_id = $gameVariables.value(Number(unit));
				for( var k=0; k < $gameTroop.members().length; k++ ){
					var battler = $gameTroop.members()[k];
					if( battler._enemyId != battler_id ){ continue; }
					enemy_list.push( battler );
				}
			}
			if( enemy_list == null && unit.indexOf("战斗敌人[") != -1 ){
				unit = unit.replace("战斗敌人[","");
				unit = unit.replace("]","");
				enemy_list = [];
				var battler_id = Number(unit);
				for( var k=0; k < $gameTroop.members().length; k++ ){
					var battler = $gameTroop.members()[k];
					if( battler._enemyId != battler_id ){ continue; }
					enemy_list.push( battler );
				}
			}
			if( actor_list == null && unit.indexOf("战斗角色变量[") != -1 ){
				unit = unit.replace("战斗角色变量[","");
				unit = unit.replace("]","");
				actor_list = [];
				var battler_id = $gameVariables.value(Number(unit));
				for( var k=0; k < $gameParty.members().length; k++ ){
					var battler = $gameParty.members()[k];
					if( battler._actorId != battler_id ){ continue; }
					actor_list.push( battler );
				}
			}
			if( actor_list == null && unit.indexOf("战斗角色[") != -1 ){
				unit = unit.replace("战斗角色[","");
				unit = unit.replace("]","");
				actor_list = [];
				var battler_id = Number(unit);
				for( var k=0; k < $gameParty.members().length; k++ ){
					var battler = $gameParty.members()[k];
					if( battler._actorId != battler_id ){ continue; }
					actor_list.push( battler );
				}
			}
		}
		
		/*-----------------执行变化------------------*/
		if( anim_str != null && args.length == 6){
			var type = String(args[5]);
			if( type === "播放" ){
				if( actor_list != null ){
					for( var i=0; i < actor_list.length; i++ ){
						actor_list[i].drill_AIP_startParallelAnimation( Number(anim_str), false, 0 );
					}
				}else if( enemy_list != null ){
					for( var i=0; i < enemy_list.length; i++ ){
						enemy_list[i].drill_AIP_startParallelAnimation( Number(anim_str), false, 0 );
					}
				}
			}
			if( type === "立即消失" || type === "立即结束" ){
				if( actor_list != null ){
					for( var i=0; i < actor_list.length; i++ ){
						var actor = actor_list[i];
						$gameTemp.drill_AIP_setAnimDeathByAnimId_Actor( actor, Number(anim_str) );
					}
				}else if( enemy_list != null ){
					for( var i=0; i < enemy_list.length; i++ ){
						var enemy = enemy_list[i];
						$gameTemp.drill_AIP_setAnimDeathByAnimId_Enemy( enemy, Number(anim_str) );
					}
				}
			}
		}
	}
}

//=============================================================================
// ** 动画装饰贴图控制
//=============================================================================
//==============================
// * 控制 - 指定角色 - 全部装饰立即消失（接口）
//==============================
Game_Temp.prototype.drill_AIP_setAllAnimDeath_Actor = function( actor_obj ){
	
	// > 动画魔法圈（ACi）
	if( Imported.Drill_AnimationCircle ){
		var sprite_list = $gameTemp.drill_ACi_getAllSpriteList_Actor( actor_obj );
		$gameTemp.drill_ACi_setAnimDeath( sprite_list );
	}
	// > 动画粒子（APa）
	if( Imported.Drill_AnimationParticle ){
		var sprite_list = $gameTemp.drill_APa_getAllSpriteList_Actor( actor_obj );
		$gameTemp.drill_APa_setAnimDeath( sprite_list );
	}
	// > 动画GIF（AGi）
	if( Imported.Drill_AnimationGIF ){
		var sprite_list = $gameTemp.drill_AGi_getAllSpriteList_Actor( actor_obj );
		$gameTemp.drill_AGi_setAnimDeath( sprite_list );
	}
	// > 动画环绕球（ASu）
	if( Imported.Drill_AnimationSurround ){
		var sprite_list = $gameTemp.drill_ASu_getAllSpriteList_Actor( actor_obj );
		$gameTemp.drill_ASu_setAnimDeath( sprite_list );
	}
}
//==============================
// * 控制 - 指定敌人 - 全部装饰立即消失（接口）
//==============================
Game_Temp.prototype.drill_AIP_setAllAnimDeath_Enemy = function( enemy_obj ){

	// > 动画魔法圈（ACi）
	if( Imported.Drill_AnimationCircle ){
		var sprite_list = $gameTemp.drill_ACi_getAllSpriteList_Enemy( enemy_obj );
		$gameTemp.drill_ACi_setAnimDeath( sprite_list );
	}
	// > 动画粒子（APa）
	if( Imported.Drill_AnimationParticle ){
		var sprite_list = $gameTemp.drill_APa_getAllSpriteList_Enemy( enemy_obj );
		$gameTemp.drill_APa_setAnimDeath( sprite_list );
	}
	// > 动画GIF（AGi）
	if( Imported.Drill_AnimationGIF ){
		var sprite_list = $gameTemp.drill_AGi_getAllSpriteList_Enemy( enemy_obj );
		$gameTemp.drill_AGi_setAnimDeath( sprite_list );
	}
	// > 动画环绕球（ASu）
	if( Imported.Drill_AnimationSurround ){
		var sprite_list = $gameTemp.drill_ASu_getAllSpriteList_Enemy( enemy_obj );
		$gameTemp.drill_ASu_setAnimDeath( sprite_list );
	}
}
//==============================
// * 控制 - 指定角色 - 指定动画ID的装饰立即消失（接口）
//==============================
Game_Temp.prototype.drill_AIP_setAnimDeathByAnimId_Actor = function( actor_obj, anim_id ){

	// > 动画魔法圈（ACi）
	if( Imported.Drill_AnimationCircle ){
		var sprite_list = $gameTemp.drill_ACi_getAllSpriteList_Actor( actor_obj );
		sprite_list = $gameTemp.drill_ACi_selectSpriteByAnimId( sprite_list, anim_id );
		$gameTemp.drill_ACi_setAnimDeath( sprite_list );
	}
	// > 动画粒子（APa）
	if( Imported.Drill_AnimationParticle ){
		var sprite_list = $gameTemp.drill_APa_getAllSpriteList_Actor( actor_obj );
		sprite_list = $gameTemp.drill_APa_selectSpriteByAnimId( sprite_list, anim_id );
		$gameTemp.drill_APa_setAnimDeath( sprite_list );
	}
	// > 动画GIF（AGi）
	if( Imported.Drill_AnimationGIF ){
		var sprite_list = $gameTemp.drill_AGi_getAllSpriteList_Actor( actor_obj );
		sprite_list = $gameTemp.drill_AGi_selectSpriteByAnimId( sprite_list, anim_id );
		$gameTemp.drill_AGi_setAnimDeath( sprite_list );
	}
	// > 动画环绕球（ASu）
	if( Imported.Drill_AnimationSurround ){
		var sprite_list = $gameTemp.drill_ASu_getAllSpriteList_Actor( actor_obj );
		sprite_list = $gameTemp.drill_ASu_selectSpriteByAnimId( sprite_list, anim_id );
		$gameTemp.drill_ASu_setAnimDeath( sprite_list );
	}
}
//==============================
// * 控制 - 指定敌人 - 指定动画ID的装饰立即消失（接口）
//==============================
Game_Temp.prototype.drill_AIP_setAnimDeathByAnimId_Enemy = function( enemy_obj, anim_id ){

	// > 动画魔法圈（ACi）
	if( Imported.Drill_AnimationCircle ){
		var sprite_list = $gameTemp.drill_ACi_getAllSpriteList_Enemy( enemy_obj );
		sprite_list = $gameTemp.drill_ACi_selectSpriteByAnimId( sprite_list, anim_id );
		$gameTemp.drill_ACi_setAnimDeath( sprite_list );
	}
	// > 动画粒子（APa）
	if( Imported.Drill_AnimationParticle ){
		var sprite_list = $gameTemp.drill_APa_getAllSpriteList_Enemy( enemy_obj );
		sprite_list = $gameTemp.drill_APa_selectSpriteByAnimId( sprite_list, anim_id );
		$gameTemp.drill_APa_setAnimDeath( sprite_list );
	}
	// > 动画GIF（AGi）
	if( Imported.Drill_AnimationGIF ){
		var sprite_list = $gameTemp.drill_AGi_getAllSpriteList_Enemy( enemy_obj );
		sprite_list = $gameTemp.drill_AGi_selectSpriteByAnimId( sprite_list, anim_id );
		$gameTemp.drill_AGi_setAnimDeath( sprite_list );
	}
	// > 动画环绕球（ASu）
	if( Imported.Drill_AnimationSurround ){
		var sprite_list = $gameTemp.drill_ASu_getAllSpriteList_Enemy( enemy_obj );
		sprite_list = $gameTemp.drill_ASu_selectSpriteByAnimId( sprite_list, anim_id );
		$gameTemp.drill_ASu_setAnimDeath( sprite_list );
	}
}

//=============================================================================
// ** 动画
//=============================================================================
//==============================
// * 动画 - 初始化
//==============================
var _drill_AIP_initMembers = Sprite_Animation.prototype.initMembers;
Sprite_Animation.prototype.initMembers = function() {
    _drill_AIP_initMembers.call(this);
	this._drill_AIP_isParallel = false;
};
//==============================
// * 动画 - 播放情况（覆写）
//==============================
Sprite_Base.prototype.isAnimationPlaying = function() {
	var len = 0;
	for(var i=0; i < this._animationSprites.length; i++){
		if(this._animationSprites[i]._drill_AIP_isParallel !== true){
			len += 1;
		}
	}
    return len > 0;
};
	
//=============================================================================
// ** 战斗动画
//=============================================================================
//==============================
// * 战斗动画 - 添加并行动画（接口）
//==============================
Game_Battler.prototype.drill_AIP_startParallelAnimation = function(animationId, mirror, delay) {
    var data = { animationId: animationId, mirror: mirror, delay: delay , drill_AIP_parallel: true};
    this._animations.push(data);
};
//==============================
// * 战斗动画 - 设置动画
//==============================
var _drill_AIP_setupAnimation = Sprite_Battler.prototype.setupAnimation;
Sprite_Battler.prototype.setupAnimation = function() {
	if( this._battler.isAnimationRequested() ){	
		this._drill_AIP_data = JSON.parse(JSON.stringify( this._battler._animations ));	//复制一份
		this._drill_AIP_data_enable = true;
	}
	
	// > 原函数
	_drill_AIP_setupAnimation.call(this);	//原方法是 猴子 写的，为了不冲突，我只能绕非常大一圈路线
											// Sprite_Battler.prototype.startAnimation 这个函数也被写死了，不好继承，所以直接写外面来	

	if( this._drill_AIP_data_enable == true ){	//通过enable来绕开猴子程序
		this._drill_AIP_data_enable = false;
		
		var len = this._drill_AIP_data.length;	//从_animationSprites结果集中赋值
		for(var i = 0; i< len ;i++ ){
			var sprite = this._animationSprites[this._animationSprites.length - len + i];
			if( this._drill_AIP_data[i]['drill_AIP_parallel'] == true ){
				sprite._drill_AIP_isParallel = true ;
			}else{
				sprite._drill_AIP_isParallel = false ;
			}
			//alert(this._drill_AIP_data[i]['drill_AIP_parallel']);
		}
	}
};
//==============================
// * 战斗动画 - 默认标记
//	
//			说明：	设置动画的下一层，这里用来修复特殊情况，【默认未知的动画，直接并行】）
//==============================
var _drill_AIP_startAnimation = Sprite_Battler.prototype.startAnimation;
Sprite_Battler.prototype.startAnimation = function(animation, mirror, delay) {
	_drill_AIP_startAnimation.call(this,animation, mirror, delay);
	
	var sprite = this._animationSprites[this._animationSprites.length-1];
	sprite._drill_AIP_isParallel = true;
};

	