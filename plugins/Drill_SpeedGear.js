//=============================================================================
// Drill_SpeedGear.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        管理器 - 变速齿轮
 * @author Drill_up
 * 
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
 * ----插件扩展
 * 该插件可以单独使用。
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
 * 插件指令： >变速齿轮 : 修改速度 : 比例[1.00]
 * 插件指令： >变速齿轮 : 修改绑定的变量 : 变量[2]
 * 插件指令： >变速齿轮 : 修改声音同步率 : 比例[0.25]
 *
 * 1.如果你开启了变量绑定，则 修改速度 不起作用，
 *   直接修改对应绑定的变量值即可修改速度。
 * 2.注意，绑定后的变量值为 100 时，表示速度比例 1.00 。
 *   绑定后的变量值为140时，表示速度比例1.40 。
 *   最低速度比例为0.20，若小于0.20的按0.20算。
 *
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 工作类型：   倍率持续
 * 时间复杂度： o(n)*o(游戏整体运行速度)
 * 测试方法：   无
 * 测试结果：   无
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于该插件修改游戏速度，会直接影响到游戏帧数，所以无法确定
 *   该插件具体的性能消耗。
 *   如果游戏速度加快，将会使得所有插件的消耗 呈倍数增加。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件的内部结构。
 * [v1.2]
 * 修复了启动界面播放音乐时，该插件出现的空指针错误。
 * [v1.3]
 * 优化了内部注释。
 * [v1.4]
 * 修改了插件分类。
 * [v1.5]
 * 优化了旧存档的识别与兼容。
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
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		无法确定
//		★性能测试因素	无
//		★性能测试消耗	无
//		★最坏情况		无
//		★备注			该插件直接影响帧数的数量，性能无法确定。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
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
	
	
	/*-----------------杂项------------------*/
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
	if( command === ">变速齿轮" ){ 
	
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			temp1 = temp1.replace("比例[","");
			temp1 = temp1.replace("变量[","");
			temp1 = temp1.replace("]","");
			if( type == "改速度" || type == "修改速度" ){
				if( DrillUp.g_SG_var_bind == false ){
					$gameSystem._drill_SG_speed = Math.max( Number(temp1), 0.05 );
					SceneManager._deltaTime = 1/60.0 / $gameSystem._drill_SG_speed;
					AudioManager.drill_SG_refreshPitch();
				}
			}
			if( type == "改变量" || type == "修改绑定的变量" ){
				$gameSystem._drill_SG_var = Number(temp1);
			}
			if( type == "改同步" || type == "修改声音同步率" ){
				$gameSystem._drill_SG_sound = Number(temp1);
			}
		}
	};
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_SG_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SG_sys_initialize.call(this);
	this.drill_SG_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SG_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_SG_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_SG_saveEnabled == true ){	
		$gameSystem.drill_SG_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_SG_initSysData();
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
Game_System.prototype.drill_SG_initSysData = function() {
	this.drill_SG_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_SG_checkSysData = function() {
	this.drill_SG_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_SG_initSysData_Private = function() {
	
	this._drill_SG_speed = Math.max(DrillUp.g_SG_speed,0.05);
	this._drill_SG_var = DrillUp.g_SG_var;
	this._drill_SG_var_cur_value = 0;
	this._drill_SG_sound = DrillUp.g_SG_sound;
	
	// > 修改速度
    SceneManager._deltaTime = 1/60.0 / this._drill_SG_speed;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SG_speed == undefined ){
		this.drill_SG_initSysData();
	}
	
};


//=============================================================================
// ** 速度变化
//=============================================================================
//==============================
// * 速度 - 绑定变量（地图界面）
//==============================
var _drill_SG_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	$gameSystem.drill_SG_variable();
    _drill_SG_Map_update.call(this);
};
//==============================
// * 速度 - 绑定变量（战斗界面）
//==============================
var _drill_SG_Battle_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
	$gameSystem.drill_SG_variable();
    _drill_SG_Battle_update.call(this);
};
//==============================
// * 速度 - 执行变化
//==============================
Game_System.prototype.drill_SG_variable = function() {
	if( DrillUp.g_SG_var_bind == true ){
		var temp = $gameVariables.value(this._drill_SG_var);
		if( temp < 20 ){ temp = 20};
		if( this._drill_SG_var_cur_value != temp ){		//对变量值进行缓冲，不需要任何时候都变化速度和声音
			this._drill_SG_var_cur_value = temp;
			this._drill_SG_speed = temp / 100;
			SceneManager._deltaTime = 1/60.0 / this._drill_SG_speed;
			AudioManager.drill_SG_refreshPitch();
		}
	}
};

//=============================================================================
// ** 声音变化
//=============================================================================
//==============================
// * 声音 - 变调捕获（覆写）
//==============================
AudioManager.updateBufferParameters = function(buffer, configVolume, audio) {
    if( buffer && audio && $gameSystem ){
        buffer.volume = configVolume * (audio.volume || 0) / 10000;
		
		// > 对所有新加入的声音进行变调
		if( !buffer._org_pitch ){  buffer._org_pitch = (audio.pitch || 0) / 100; };
        buffer.pitch = (audio.pitch || 0) / 100 +(( $gameSystem._drill_SG_speed-1 )*$gameSystem._drill_SG_sound);
        buffer.pan = (audio.pan || 0) / 100;
    }
}
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
//==============================
// * 声音 - 声音变速
//==============================
AudioManager.drill_SG_refreshPitch = function() {
	if( DrillUp.g_SG_sound_bind != true ){ return; }
	
	// > 当前bgm变调
	if( this._bgmBuffer != undefined ){
		if( this._bgmBuffer._org_pitch != undefined ){
			this._bgmBuffer._org_pitch = this._bgmBuffer.pitch;
		};
		var pos = this._bgmBuffer.seek();	//pitch变化之后，当前播放的声音进度被清空了
		this._bgmBuffer.pitch = this._bgmBuffer._org_pitch +(( $gameSystem._drill_SG_speed-1 )*$gameSystem._drill_SG_sound);
		this._bgmBuffer.play(true, pos || 0);
	}
	// > 当前bgs变调
	if( this._bgsBuffer != undefined ){
		if( this._bgsBuffer._org_pitch != undefined ){
			this._bgsBuffer._org_pitch = this._bgsBuffer.pitch; 
		};
		var pos = this._bgsBuffer.seek();
		this._bgsBuffer.pitch = this._bgsBuffer._org_pitch +(( $gameSystem._drill_SG_speed-1 )*$gameSystem._drill_SG_sound);
		this._bgsBuffer.play(true, pos || 0);
	}
	/*
		this._bgmBuffer      = null;
		this._bgsBuffer      = null;
		this._meBuffer       = null;
		this._seBuffers      = [];
		this._staticBuffers  = [];
	*/
};


