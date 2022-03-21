//=============================================================================
// Drill_SpeedGear.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        系统 - 变速齿轮
 * @author Drill_up
 * 
 * @help  
 * =============================================================================
 * +++ Drill_SpeedGear +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以随意控制游戏的速度。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于整个游戏。
 * 设计：
 *   (1.变速齿轮比较适用于某些慢镜头的剧情特写，
 *      或者被加速的鬼畜战斗。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令即时变化变速齿轮的内部参数：
 * 
 * 插件指令： >变速齿轮 : 改速度 : 1.00
 * 插件指令： >变速齿轮 : 改变量 : 2
 * 插件指令： >变速齿轮 : 改同步 : 0.25
 *
 * 如果你绑定了变量，改速度是不起作用的。
 *
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 工作类型：   单次执行
 * 时间复杂度： 无法确定
 * 测试方法：   无
 * 测试结果：   无
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件改速度功能，会影响帧数的数量，所以无法确定哪些性能受到影响。
 *   注意，如果游戏速度加快，将会直接造成所有插件的消耗 呈倍数增加。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件的内部结构。
 * [v1.2]
 * 修复了启动画面播放音乐时，该插件出现的空指针错误。
 * 
 *
 * @param 初始齿轮速度
 * @desc 设置初始游戏的速度。1.00为100%的游戏速度，正常速度。
 * @default 1.00
 *
 * @param 是否绑定齿轮到变量
 * @type boolean
 * @on 绑定
 * @off 不绑定
 * @desc true - 绑定，false - 不绑定，齿轮的速度会根据变量的值实时变化。
 * @default false
 *
 * @param 绑定的变量
 * @parent 是否绑定齿轮到变量
 * @type variable
 * @desc 变量的值为百分比速度，100表示100%游戏速度。如果变量的值小于20，则默认算作20%的速度。
 * @default 0
 *
 * @param 声音是否变速
 * @type boolean
 * @on 变速
 * @off 不变速
 * @desc true - 变速，false - 不变速
 * @default true
 *
 * @param 声音变速同步率
 * @parent 声音是否变速
 * @desc 声音播放速度与图像播放速度的同步率，建议设置0.4以下，同步率太高的声音会非常难听。
 * @default 0.25
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		SG (Speed_Gear)
//		临时全局变量	DrillUp.g_SG_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_SG_xxx
//		全局存储变量	无
//		覆盖重写方法	AudioManager.updateBufferParameters
//
//插件记录：
//		★大体框架与功能如下：
//			变速齿轮：
//				->游戏变速
//				->声音变速
//				->确保变调时保留当前正在播放的声音
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.很鬼畜的插件。核心在于修改帧刷新间隔。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_SpeedGear = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_SpeedGear');
	
	DrillUp.g_SG_speed = Number(DrillUp.parameters['初始齿轮速度'] || 1.00);	
	DrillUp.g_SG_var_bind = String(DrillUp.parameters['是否绑定齿轮到变量'] || "true") === "true";	
	DrillUp.g_SG_var = Number(DrillUp.parameters['绑定的变量'] || 0);	
	DrillUp.g_SG_sound_bind = String(DrillUp.parameters['声音是否变速'] || "true") === "true";	
	DrillUp.g_SG_sound = Number(DrillUp.parameters['声音变速同步率'] || 0.25);	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_SG_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SG_pluginCommand.call(this,command, args);
	if (command === ">变速齿轮")  { 
		if(args.length == 4){
			var temp1 = Number(args[3]);
			var type = String(args[1]);
			if (type === '改速度' && !DrillUp.g_SG_var_bind) {
				$gameSystem._drill_SG_speed = Math.max(temp1,0.05);
				SceneManager._deltaTime = 1/60.0 / $gameSystem._drill_SG_speed;
				AudioManager.drill_SG_reflash_pitch();
			}
			if (type === '改变量') {
				$gameSystem._drill_SG_var = temp1;
			}
			if (type === '改同步') {
				$gameSystem._drill_SG_sound = temp1;
			}
		}
	};
	return true;
};

//=============================================================================
// ** 变量初始化
//=============================================================================
var _drill_SG_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_SG_initialize.call(this);
	this._drill_SG_speed = Math.max(DrillUp.g_SG_speed,0.05);
	this._drill_SG_var = DrillUp.g_SG_var;
	this._drill_SG_var_cur_value = 0;
	this._drill_SG_sound = DrillUp.g_SG_sound;
    SceneManager._deltaTime = 1/60.0 / this._drill_SG_speed;
};

//==============================
// * 齿轮绑定的变量
//==============================
var _drill_SG_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	$gameSystem.drill_SG_variable();
    _drill_SG_Map_update.call(this);
};
var _drill_SG_Battle_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
	$gameSystem.drill_SG_variable();
    _drill_SG_Battle_update.call(this);
};
Game_System.prototype.drill_SG_variable = function() {
	if(DrillUp.g_SG_var_bind){
		var temp = $gameVariables.value(this._drill_SG_var);
		if (temp < 20 ){ temp = 20};
		if(this._drill_SG_var_cur_value != temp ){		//对变量值进行缓冲，不需要任何时候都变化速度和声音
			this._drill_SG_var_cur_value = temp;
			this._drill_SG_speed = temp / 100;
			SceneManager._deltaTime = 1/60.0 / this._drill_SG_speed;
			AudioManager.drill_SG_reflash_pitch();
		}
	}
};

//==============================
// * 声音变化
//==============================
/*
var _drill_speedgear_AudioManagerBuffer = AudioManager.updateBufferParameters ;
AudioManager.updateBufferParameters = function(buffer, configVolume, audio) {
	_drill_speedgear_AudioManagerBuffer.call(this,buffer, configVolume, audio);	//pitch只要变化，播放的声音就会被重置（所以只能覆写了）
	
	//对所有新加入的声音进行变调
    if (buffer && audio && DrillUp.g_SG_sound_bind) {
		if( !buffer._org_pitch ){ 
			buffer._org_pitch = (audio.pitch || 0) / 100;
		};
        buffer.pitch = buffer._org_pitch +(( $gameSystem._drill_SG_speed-1 )*$gameSystem._drill_SG_sound);
    }
};*/

AudioManager.updateBufferParameters = function(buffer, configVolume, audio) {
    if (buffer && audio && $gameSystem) {
        buffer.volume = configVolume * (audio.volume || 0) / 10000;
		//对所有新加入的声音进行变调
		if( !buffer._org_pitch ){  buffer._org_pitch = (audio.pitch || 0) / 100; };
        buffer.pitch = (audio.pitch || 0) / 100 +(( $gameSystem._drill_SG_speed-1 )*$gameSystem._drill_SG_sound);
        buffer.pan = (audio.pan || 0) / 100;
    }
}
AudioManager.drill_SG_reflash_pitch = function() {
	
	//刷新变调当前正在播放的声音
	if( this._bgmBuffer && DrillUp.g_SG_sound_bind){
		if( !this._bgmBuffer._org_pitch ){ this._bgmBuffer._org_pitch = this._bgmBuffer.pitch };
		var pos = this._bgmBuffer.seek();	//pitch变化之后，当前播放的声音进度被清空了
		this._bgmBuffer.pitch = this._bgmBuffer._org_pitch +(( $gameSystem._drill_SG_speed-1 )*$gameSystem._drill_SG_sound);
		this._bgmBuffer.play(true, pos || 0);
	}
	if( this._bgsBuffer && DrillUp.g_SG_sound_bind){
		if( !this._bgsBuffer._org_pitch ){ this._bgsBuffer._org_pitch = this._bgsBuffer.pitch };
		var pos = this._bgmBuffer.seek();
		this._bgsBuffer.pitch = this._bgsBuffer._org_pitch +(( $gameSystem._drill_SG_speed-1 )*$gameSystem._drill_SG_sound);
		this._bgsBuffer.play(true, pos || 0);
	}
	/*
	this._bgmBuffer      = null;
	this._bgsBuffer      = null;
	this._meBuffer       = null;
	this._seBuffers      = [];
	this._staticBuffers  = [];*/
};


