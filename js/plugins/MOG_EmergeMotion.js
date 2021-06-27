//=============================================================================
// MOG_EmergeMotion.js
//=============================================================================
/*:
 * @plugindesc (v1.4)[v1.3]  单位 - 敌人出现动画效果
 * @author Moghunter (Drill_up翻译+优化）
 *
 * @param 初始等待时间
 * @type number
 * @min 1
 * @desc 第一个敌人出现的等待时间，单位帧。
 * @default 30
 *
 * @param 下一个敌人出现延迟
 * @type number
 * @min 1
 * @desc 敌人依次出现需要等待的时间，单位帧。
 * @default 20
 *
 * @help  
 * =============================================================================
 * +++ MOG - Emerge Motion (v1.4) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 敌人出现的动画效果。
 * ★★关联id的动画不会被加密直接识别，需要在地图事件中至少播放一次★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   只作用于敌人。
 * 2.后来出现的敌人也有出现效果。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要在 敌人注释 中添加下面的关键字：
 * （注意，冒号为英文冒号，且后面有一个空格。）
 *
 * Emerge Motion: A
 *
 * 参数A：出现方式
 *      0 - 滑行 (从左往右)
 *      1 - 滑行 (从右往左)
 *      2 - 滑行 (从上往下)
 *      3 - 滑行 (从下往上)
 *      4 - 放大出现  
 *      5 - 传送（横向压缩）
 *      6 - 从地面冒出来
 *      7 - 舞蹈（朝左朝右然后跳）
 *      8 - 弹跳下来
 *      9 - 从天而降（速度很慢）
 *
 * 你也可以在敌人注释中添加附加的动画：
 * （注意，冒号为英文冒号，且后面有一个空格。）
 *
 * Emerge Animation: B
 *
 * 参数B：动画的编号
 *
 *
 * 示例：
 * Emerge Motion: 4
 * （敌人缩放出现。）
 * Emerge Animation: 45
 * （敌人在治疗动画效果中出现。）
 * 注意，使用动画出现或者使用动作出现，二者只能选一个，不能同时使用。
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 修复了使用敌人姿势时，种类6会出现的bug。
 * 修复了直接测试时，敌人不出来的bug。
 * [v1.2]
 * 修复了mog内部脚本定义混乱的问题。
 * [v1.3]
 * 修改了插件分类。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//插件记录：
//		插件针对旧版本的兼容做了一点点优化，306行、335行。
//
//		所有 $gameTemp._emerging相关变量整理。
//		（一下子定义成数组，一下定义别的，都不知道什么时候是”出现时“的判断。）
//

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_EmergeMotion = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_EmergeMotion');  
    Moghunter.emot_initialWait = Number(Moghunter.parameters['初始等待时间'] || 30);
	Moghunter.emot_next = Number(Moghunter.parameters['下一个敌人出现延迟'] || 20);
	
//=============================================================================
// ** Game Temp
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_eMot_gTemp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _mog_eMot_gTemp_initialize.call(this);
	this._emerging = [false,30];
	this._emergingInt = 0;
};

//==============================
// * need skip Battle Process
//==============================
Game_Temp.prototype.needSkipBattleProcessEM = function() {
	if ($gameTemp._emerging[0]) {return true};
	if ($gameTemp._emerging[1] > 0) {return true};
	if ($gameTemp._emergingInt > 0) {return true};
    return false;
};


//=============================================================================
// ** Game_Battler
//=============================================================================	

//==============================
// * Init Members
//==============================
var _mog_eMot_gbat_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_mog_eMot_gbat_initMembers.call(this);
	this._emerge = [false,0,0,0,-1,0,30,0,0,0,0,0,0,false,0,0,0,0,0,0];
};

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//=============================================================================
// ** Game_Enemy
//=============================================================================	

//==============================
// * Setup
//==============================
var _mog_eMot_gEnmy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_mog_eMot_gEnmy_setup.call(this,enemyId, x, y);
    this.emotSetup();
};

//==============================
// * emot Setup
//==============================
Game_Enemy.prototype.emotSetup = function() {
    this.notetags().forEach(function(note) {			
         var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "emerge motion"){
			 var par = note_data[1].split(':');
		     this._emerge[0] = true;
		     this._emerge[4] = Math.min(Math.max(Number(par[0]),0),9);
		 } else if (note_data[0].toLowerCase() == "emerge animation"){
			 var par = note_data[1].split(':');
		     this._emerge[0] = true;
			 this._emerge[4] = 10;
		     this._emerge[19] = Number(par[0]);
		     };
	},this);
};

//=============================================================================
// ** Scene Battle
//=============================================================================	
var _mog_em_sBat_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
	$gameTemp._emerging = [true,30];
	$gameTemp._emergingInt = 10;
    _mog_em_sBat_initialize.call(this);
};

//==============================
// * update Battle Process
//==============================
var _mog_eMot_sBat_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function() {
	if (!Imported.MOG_ATB && $gameTemp.needSkipBattleProcessEM()) {
		$gameTemp._emerging[1]--;
		if ($gameTemp._emergingInt > 0) {$gameTemp._emergingInt--};
		return;
	};
	_mog_eMot_sBat_updateBattleProcess.call(this);
};

//=============================================================================
// ** Spriteset Battle
//=============================================================================	

//==============================
// * create Enemies
//==============================
var _mog_eMot_sprEnemy_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
	_mog_eMot_sprEnemy_createEnemies.call(this);
    for (var i = 0; i < this._enemySprites.length; i++) {
		var sprtEnemy = this._enemySprites[i];
        sprtEnemy.setIndexEm(i);
    };
};

//=============================================================================
// ** Sprite Enemy
//=============================================================================	

//==============================
// * init Members
//==============================
var _mog_eMot_sprtEnemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
	_mog_eMot_sprtEnemy_initMembers.call(this);
	this._indexEM = 0;
};

//==============================
// * init Members
//==============================
Sprite_Enemy.prototype.setIndexEm = function(index) {
	this._indexEM = index;
	this._battler._emerge[3] =  Number(Moghunter.emot_initialWait) + this._indexEM * Number(Moghunter.emot_next);
};

//==============================
// * set Battler
//==============================
var _mog_eMot_gbar_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
	_mog_eMot_gbar_setBattler.call(this,battler);
	$gameTemp._emerging = [false,30];
    if (this._battler && this._battler._emerge[0]) {this.setupEMot()};
};

//==============================
// * set Mot
//==============================
Sprite_Enemy.prototype.setupEMot = function() {
	this._battler._emerge[1] = this._battler.screenX() + this._offsetX // X org;
	this._battler._emerge[2] = this._battler.screenY() + this._offsetY // Y org;
	this._battler._emerge[3] = Imported.MOG_BattleTransitions ? 2 + Math.randomInt(20) : 30 + Math.randomInt(20); // Initial Wait
	this._battler._emerge[5] = false; //Data Check
	this._battler._emerge[7] = 1 // Scale X
	this._battler._emerge[8] = 1 // Scale Y
	this._battler._emerge[9] = 1.00 / this._battler._emerge[6] // Speed
	this._battler._emerge[10] = 0; // cw
	this._battler._emerge[11] = 0; // ch
	this._battler._emerge[12] = 0; // frame Count
	this._battler._emerge[14] = 0; // Animation Speed
	this._battler._emerge[15] = 0; // Animation Phase 1
	this._battler._emerge[16] = 0; // Animation Phase 2
	this._battler._emerge[17] = 0; // Animation Phase 3
	this._battler._emerge[18] = 255; // Opacity
	this.x = this._battler._emerge[1]; 
	this.y = this._battler._emerge[2];
};
	
//==============================
// * set Battler Motion Em
//==============================
Sprite_Enemy.prototype.setBattlerMotionEm = function() {
	this._battler._emerge[1] = this._battler.screenX() + this._offsetX + this._battler.motion_Xaxis();
	this._battler._emerge[2] = this._battler.screenY() + this._offsetY + this._battler.motion_Yaxis();	
};

//==============================
// * set Mot
//==============================
Sprite_Enemy.prototype.setupEmotType = function() {
	var cw = this.bitmap ? this.bitmap.width : 600;
	var ch = this.bitmap ? this.bitmap.height : 600;
	this._battler._emerge[7] = this.scale.x;
	this._battler._emerge[8] = this.scale.y;
    this._battler._emerge[10] = cw;
	this._battler._emerge[11] = ch;
	this._battler._emerge[12] = 0;
	this._battler._emerge[18] = this.opacity;
	this._battler._emerge[6] = 15;		
	if (this._battler._emerge[4] === 0) {
		this.x = -cw;
		this.y = this._battler._emerge[2];	
	} else if (this._battler._emerge[4] === 1) {
		this.x = Graphics.boxWidth + cw;
		this.y = this._battler._emerge[2];
	} else if (this._battler._emerge[4] === 2) {	
	    this._battler._emerge[6] = 20;	
		this.x = this._battler._emerge[1];
		this.y = -ch;		
	} else if (this._battler._emerge[4] === 3) {
		this._battler._emerge[6] = 20;		
		this.x = this._battler._emerge[1];
		this.y = Graphics.boxHeight + ch;	
	} else if (this._battler._emerge[4] === 4) {	
	    this._battler._emerge[6] = 25;
        this.x = this._battler._emerge[1];
        this.y = this._battler._emerge[2];	
	    this.scale.x = 0;
		this.scale.y = 0;
	} else if (this._battler._emerge[4] === 5) {
		this._battler._emerge[6] = 30;	
        this.x = this._battler._emerge[1];
        this.y = this._battler._emerge[2];	
	    this.scale.x = 0;
		this.scale.y = 2;	
	} else if (this._battler._emerge[4] === 6) {	
	    this._battler._emerge[6] = 50;	
        this.x = this._battler._emerge[1];
        this.y = this._battler._emerge[2];	
		this._battler._emerge[12] = ch;
		if (Imported.MOG_EnemyPoses && this._battler.isBPose()) {
			this._battler._emerge[10] = cw/4;
		}
		this.setFrame(0,0,0,ch);
		this._battler._emerge[9] = ch / this._battler._emerge[6];
	} else if (this._battler._emerge[4] === 7) {	
        this.x = this._battler._emerge[1];
        this.y = this._battler._emerge[2];	
	    this._battler._emerge[13] = 90;
		this._battler._emerge[14] = 20;
		this._battler._emerge[17] = this._battler._emerge[2];
		this.opacity = 0;
	} else if (this._battler._emerge[4] === 8) {	
        this.x = this._battler._emerge[1];
        this.y = -ch;	
		this._battler._emerge[13] = true;
		this._battler._emerge[6] = 6;
	} else if (this._battler._emerge[4] === 9) {	
		this.x = this._battler._emerge[1];
		this.y = -ch;
		 this._battler._emerge[6] = 700;	
	} else if (this._battler._emerge[4] === 10) {
        this.x = this._battler._emerge[1];
        this.y = this._battler._emerge[2];	
		var aniId = this._battler._emerge[19];			
	    var animation = $dataAnimations[aniId];
	    if (animation) {
		   this._battler._emerge[13] = true;
		   this._battler._emerge[14] = animation.frames.length * 3;
			if (Imported.MOG_EnemyPoses && this._battler.isBPose()) {
				this._battler._emerge[10] = cw/4;
			}
		   this.setFrame(0,0,0,0);	//初始化看不见任何图片
		} else {
		   this._battler._emerge[13] = false;
		};
	};
	if (this._battler._emerge[4] != 6) {	
	    this._battler._emerge[9] = 1.00 /  this._battler._emerge[6];
	};
    this._battler._emerge[5] = this.bitmap ? true : false;
	$gameTemp._emerging = [true,10];
	this.visible = false;
};
 
//==============================
// * update Bouncing Emot
//==============================
Sprite_Enemy.prototype.updateBouncingEmot = function() {
	  if (this.y < this._battler._emerge[2]) {
		  this.y += 25;
		  if (this.y >= this._battler._emerge[2]) {
			  this.y = this._battler._emerge[2];
		  };
	  };
	  if (this._battler._emerge[14] === 0) {
		  if (this.y === this._battler._emerge[2]) {
			  this._battler._emerge[14] = 1;  
		  }; 
	  } else if (this._battler._emerge[14] === 1) {
		  if (this._battler._emerge[15] === 0) {
			  if (this.scale.x < this._battler._emerge[7] + 0.30) {
				  this.scale.x += 0.03;
				  this.scale.y -= 0.03;  
				  if (this.scale.x >= this._battler._emerge[7] + 0.30) {
					  this.scale.x = this._battler._emerge[7] + 0.30;
					  this.scale.y = this._battler._emerge[7] - 0.30;  		
					  this._battler._emerge[15] = 1;		  
				  };
     		  };
		  } else {
			  if (this.scale.x > this._battler._emerge[7]) {
				  this.scale.x -= 0.03;
				  this.scale.y += 0.03;  
				  if (this.scale.x <= this._battler._emerge[7]) {
					  this.scale.x = this._battler._emerge[7];
					  this.scale.y = this._battler._emerge[8];  		
					  this._battler._emerge[13] = false;		  
				  };
     		  };			  
		  };
     };
};

//==============================
// * need To Get Data
//==============================
Sprite_Enemy.prototype.needToGetData = function() {
    if (this._battler._emerge[5]) {return false};
	if (!this.bitmap) {return false};
	if (!this.bitmap.isReady()) {return false};
	return true;
};

//==============================
// * update Position Emot
//==============================
Sprite_Enemy.prototype.updatePositionEmot = function() {
    this.x = this.moveEmot(this.x,this._battler._emerge[1]);
	this.y = this.moveEmot(this.y,this._battler._emerge[2]);
};

//==============================
// * update Scale Emot
//==============================
Sprite_Enemy.prototype.updateScaleEmot = function() {
	if (this._battler._emerge[4] === 8) {return};
	var zs = this._battler._emerge[9];
	if (!zs) {return}
    if (this.scale.x != this._battler._emerge[7]) {
		if (this.scale.x < this._battler._emerge[7]) {
			this.scale.x += zs
			if (this.scale.x >= this._battler._emerge[7]) {
				this.scale.x = this._battler._emerge[7];
			};
		} else if (this.scale.x > this._battler._emerge[7]) {
			this.scale.x -= zs
			if (this.scale.x <= this._battler._emerge[7]) {
				this.scale.x = this._battler._emerge[7];
			};
		};
	};
	if (this.scale.y != this._battler._emerge[8]) {
		if (this.scale.y < this._battler._emerge[8]) {
			this.scale.y += zs
			if (this.scale.y >= this._battler._emerge[8]) {
				this.scale.y = this._battler._emerge[8];
			};
		} else if (this.scale.y > this._battler._emerge[8]) {
			this.scale.y -= zs
			if (this.scale.y <= this._battler._emerge[8]) {
				this.scale.y = this._battler._emerge[8];
			};
		};		
	};
};

//==============================
// * update Frame EM
//==============================
Sprite_Enemy.prototype.updateFrameEm = function() {
	var cw = this._battler._emerge[10];
	var ch = this._battler._emerge[11];
	var ch2 = this._battler._emerge[11] - this._battler._emerge[12];
	this.setFrame(0,0,cw,ch2)
	if (this._battler._emerge[12] > 0) {
		this._battler._emerge[12] -= this._battler._emerge[9];
		if (this._battler._emerge[12] <= 0) {
			this.setFrame(0,0,cw,ch)
		};
	};
};

//==============================
// * update Swing EM
//==============================
Sprite_Enemy.prototype.updateSwingEm = function() {
   if (this._battler._emerge[15] === 0) {
       this._battler._emerge[14]++;
	   if (this._battler._emerge[14] < 6) {return};
	   this._battler._emerge[14] = 0;
	   this.scale.x = this.scale.x > 0 ? -this._battler._emerge[7] : this._battler._emerge[7];
	   this._battler._emerge[16]++;
	   if (this._battler._emerge[16] > 5) {
		   this._battler._emerge[16] = 0;
		   this._battler._emerge[15] = 1; 
		   this._battler._emerge[2] -= 100;
	   };
   } else if (this._battler._emerge[15] === 1) {
       this._battler._emerge[14]++;
	   if (this._battler._emerge[14] < 20) {return};
	   this._battler._emerge[14] = 0;
	   if (this._battler._emerge[16] === 0) {
		   this._battler._emerge[2] += 100;
		   this._battler._emerge[16] = 1;
	   } else if (this._battler._emerge[16] === 1) {
		   this._battler._emerge[2] = this._battler._emerge[17];
		   this._battler._emerge[16] = 2;
		   this._battler._emerge[13] = false;
	       this.y = this._battler._emerge[2];	
	   };
   };
};

//==============================
// * update Animation Emot
//==============================
Sprite_Enemy.prototype.updateAnimationEmot = function() {
    this._battler._emerge[14]--;
	if (this._battler._emerge[14] < 20) {
	    this.setFrame(0,0,this._battler._emerge[10],this._battler._emerge[11]);	
	};
	if (this._battler._emerge[14] > 0) {return};
	this._battler._emerge[13] = false;
};

//==============================
// * update Em Motion
//==============================
Sprite_Enemy.prototype.updateEmMotion = function() {
	//$gameTemp._emerging[0] = false;
    if (this.needToGetData()) {this.setupEmotType()};
	if (Imported.MOG_BattleTransitions && $gameSystem._trefctData[0]) {
		this.visible = false;
		return	
	}	
    if (this._battler._emerge[3] > 0) {
	    this._battler._emerge[3]--;
        if (this._battler._emerge[3] === 0 && this._battler._emerge[4] === 10 && this._battler._emerge[13]) {
		    this._battler.startAnimation(this._battler._emerge[19], false, 0);
	    }
		this.visible = false;
		return;
	}
	this.visible = true;
	if (this._battler._emerge[4] === 8) {	
	    this.updateBouncingEmot();
	} else {
	    this.updatePositionEmot()
    };
	this.updateOpacityEmot();
	if (this._battler._emerge[4] === 10) {this.updateAnimationEmot()};
    if (this._battler._emerge[4] === 6) {this.updateFrameEm()};
	if (this._battler._emerge[4] === 7) {
		this.updateSwingEm()
	} else {
		this.updateScaleEmot();
	};
	if (this.isEmotEmerging()) {
		$gameTemp._emerging[0] = true
	} else {
		this._battler._emerge[0] = false;
		this.opacity = this._battler._emerge[18];
		this.revertToNormal();
	};
    if (this._battler._emerge[6] <= 70) {$gameTemp._emerging[0] = false};
	$gameTemp._emerging[1] = 5;
};


//==============================
// * update Opacity Emot
//==============================
Sprite_Enemy.prototype.updateOpacityEmot = function() {
    if (this.opacity < this._battler._emerge[18]) {
		this.opacity += 5;
		if (this.opacity >= this._battler._emerge[18]) {
			this.opacity = this._battler._emerge[18];
		}; 
	};
};

//==============================
// * is Emot Done
//==============================
Sprite_Enemy.prototype.isEmotEmerging = function() {
   if (this.x != this._battler._emerge[1]) {return true};
   if (this.y != this._battler._emerge[2]) {return true};
   if (this.scale.x != this._battler._emerge[7]) {return true};
   if (this.scale.y != this._battler._emerge[8]) {return true};
   if (this._battler._emerge[12] > 0) {return true};
   if (this._battler._emerge[13]) {return true};
   return false;
};

//==============================
// * Move Emot
//==============================
Sprite_Enemy.prototype.moveEmot = function(value,real_value) {
	if (value == real_value) {return value};
	var dnspeed = 1 + (Math.abs(value - real_value) / this._battler._emerge[6]);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value}}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * update Frame
//==============================
Sprite_Enemy.prototype.needSkipFrameEM = function() {
    if (!this._battler) {return false};
	if (!this._battler._emerge[0]) {return false};
	if (this._battler._emerge[4] === 6) {return true};
	if (this._battler._emerge[4] === 10) {return true};
	return false;
};
	
//==============================
// * update Frame
//==============================
var _mog_eMot_sprtEnemy_updateFrame = Sprite_Enemy.prototype.updateFrame;
Sprite_Enemy.prototype.updateFrame = function() {
    if (this.needSkipFrameEM()) {return}
	_mog_eMot_sprtEnemy_updateFrame.call(this);
};

//==============================
// * need Update Em
//==============================
Sprite_Enemy.prototype.needUpdateEm = function() {
    if (!this._battler) {return false};
	if (!this._battler._emerge[0]) {return false};
	if (this._battler.isHidden()) {return false};
	if (Imported.MOG_BattleCameraFrontal) {return false};
	if (Imported.MOG_Theatrhythm && $gameSystem._theatrhythm) {return false};
	return true;
};

//==============================
// * update Position
//==============================
var _mog_eMot_sprtEnemy_updatePosition = Sprite_Enemy.prototype.updatePosition;
Sprite_Enemy.prototype.updatePosition = function() {
    if (this.needUpdateEm()) {
	   this.updateEmMotion();
	   return;
	};
	_mog_eMot_sprtEnemy_updatePosition.call(this);
};