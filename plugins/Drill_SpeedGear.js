//=============================================================================
// Drill_SpeedGear.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        管理器 - 变速齿轮
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
 * 你也可以对下列插件有选择地添加，实现特定功能。
 * 可被扩展：
 *   - Drill_OperateKeys       键盘-键盘手柄按键修改器★★v1.9及以上★★
 *     通过按键修改器，能实现测试时 alt键 按下就加速的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于整个游戏。
 * 加速键：
 *   (1.插件中有各种各样的加速键设置，详细可以去看看文档：
 *      "1.系统 > 关于输入设备核心.docx" 的 所有加速键 章节。
 *   (2.如果你只是用于游戏测试的临时加速，可以按Alt键进行加速。
 *      但注意，需要 键盘-键盘手柄按键修改器 插件。
 *   (3.你可以了解基本的按键定义，去看看 "1.系统 > 关于输入设备核心.docx"。
 *      全部按键关系，可以去看看章节 按键关系表 。
 * 设计：
 *   (1.变速齿轮比较适用于某些慢镜头的剧情特写，
 *      或者被加速的鬼畜战斗。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令即时变化变速齿轮的内部参数：
 * 
 * 插件指令：>变速齿轮 : 修改速度 : 比例[1.00]
 * 
 * 插件指令：>变速齿轮 : 是否绑定齿轮到变量 : 开启
 * 插件指令：>变速齿轮 : 是否绑定齿轮到变量 : 关闭
 * 插件指令：>变速齿轮 : 修改绑定的变量 : 变量[2]
 * 
 * 插件指令：>变速齿轮 : 声音是否变速 : 开启
 * 插件指令：>变速齿轮 : 声音是否变速 : 关闭
 * 插件指令：>变速齿轮 : 修改声音同步率 : 比例[0.25]
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
 * [v1.6]
 * 添加了 游戏测试时 按键加速的功能。
 * [v1.7]
 * 修复了声音在变速齿轮切换时，叠加的bug。
 * [v1.8]
 * 修复了之前关闭播放的声音，切换速度后会开启播放的bug。
 * 
 * 
 * @param ---齿轮速度---
 * @default 
 * 
 * @param 初始齿轮速度
 * @parent ---齿轮速度---
 * @desc 设置初始游戏的速度。1.00为100%的游戏速度，正常速度。
 * @default 1.00
 * 
 * @param 是否绑定齿轮到变量
 * @parent ---齿轮速度---
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
 * 
 * @param ---游戏加速键---
 * @default 
 * 
 * @param 加速键按下时速度
 * @parent ---游戏加速键---
 * @desc 游戏测试时，按下Alt加速键时的速度。2.50为250%的游戏速度。
 * @default 2.50
 * 
 * @param 加速键是否在发布版中启用
 * @parent ---游戏加速键---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 测试版和发布版都有效，false - 只测试版有效。
 * @default false
 * 
 * 
 * @param ---声音变速---
 * @default 
 *
 * @param 声音是否变速
 * @parent ---声音变速---
 * @type boolean
 * @on 变速
 * @off 不变速
 * @desc true - 变速，false - 不变速
 * @default true
 *
 * @param 声音变速同步率
 * @parent ---声音变速---
 * @desc 声音播放速度与图像播放速度的同步率，建议设置0.4以下，同步率太高的声音会非常难听。
 * @default 0.25
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SG (Speed_Gear)
//		临时全局变量	DrillUp.g_SG_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_SG_xxx
//		全局存储变量	无
//		覆盖重写方法	AudioManager.updateBufferParameters
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		倍率持续
//		★时间复杂度		o(n)*o(游戏整体运行速度)
//		★性能测试因素	无
//		★性能测试消耗	无
//		★最坏情况		无
//		★备注			该插件直接影响帧数的数量，性能无法确定。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//
//			->☆游戏速度控制
//				->绑定变量变化
//				->游戏加速键
//			->☆游戏声音控制
//				->确保变调时保留当前正在播放的声音
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			1.系统 > 关于输入设备核心（脚本）.docx
//		
//		★插件私有类：
//			无
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
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_SG_PluginTip_curName = "Drill_SpeedGear.js 管理器-变速齿轮";
	DrillUp.g_SG_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_SpeedGear = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_SpeedGear');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_SG_defaultSpeed = Number(DrillUp.parameters['初始齿轮速度'] || 1.00);
	DrillUp.g_SG_varEnabled = String(DrillUp.parameters['是否绑定齿轮到变量'] || "true") === "true";	
	DrillUp.g_SG_varSpeed = Number(DrillUp.parameters['绑定的变量'] || 0);
	
	DrillUp.g_SG_keySpeed = Number(DrillUp.parameters['加速键按下时速度'] || 2.50);
	DrillUp.g_SG_keyPublishEnabled = String(DrillUp.parameters['加速键是否在发布版中启用'] || "false") === "true";	
	
	DrillUp.g_SG_soundEnabled = String(DrillUp.parameters['声音是否变速'] || "true") === "true";	
	DrillUp.g_SG_soundPer = Number(DrillUp.parameters['声音变速同步率'] || 0.25);	


//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_SG_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_SG_pluginCommand.call(this,command, args);
	this.drill_SG_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_SG_pluginCommand = function( command, args ){
	if( command === ">变速齿轮" ){ 
	
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			
			if( type == "改速度" || type == "修改速度" ){
				temp1 = temp1.replace("比例[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_SG_defaultSpeed = Math.max( Number(temp1), 0.05 );
			}
			
			if( type == "是否绑定齿轮到变量" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_SG_varEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_SG_varEnabled = false;
				}
			}
			if( type == "改变量" || type == "修改绑定的变量" ){
				temp1 = temp1.replace("变量[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_SG_varSpeed = Number(temp1);
			}
			
			if( type == "声音是否变速" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_SG_soundEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_SG_soundEnabled = false;
				}
			}
			if( type == "改同步" || type == "修改声音同步率" ){
				temp1 = temp1.replace("比例[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_SG_soundPer = Number(temp1);
			}
		}
	};
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
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
	
	this._drill_SG_defaultSpeed = Math.max(DrillUp.g_SG_defaultSpeed,0.05);
	this._drill_SG_lastSpeed = 1;
	
	this._drill_SG_varEnabled = DrillUp.g_SG_varEnabled;
	this._drill_SG_varSpeed = DrillUp.g_SG_varSpeed;
	
	this._drill_SG_soundEnabled = DrillUp.g_SG_soundEnabled;
	this._drill_SG_soundPer = DrillUp.g_SG_soundPer;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SG_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SG_lastSpeed == undefined ){
		this.drill_SG_initSysData();
	}
};


//=============================================================================
// ** ☆游戏速度控制
//
//			说明：	> 此模块专门控制 游戏速度。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 速度 - 帧刷新绑定
//==============================
var _drill_SG_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	this.drill_SG_updateSpeed();
    _drill_SG_Map_update.call(this);
};
//==============================
// * 速度 - 帧刷新（地图界面）
//==============================
Scene_Map.prototype.drill_SG_updateSpeed = function() {
	var d_time = 1.0/60.0;
	var d_speed = $gameSystem._drill_SG_defaultSpeed;
	
	// > 绑定变量变化
	if( $gameSystem._drill_SG_varEnabled == true ){
		var result_value = $gameVariables.value( $gameSystem._drill_SG_varSpeed );
		if( result_value < 20 ){ result_value = 20 };
		d_speed = result_value * 0.01;
	}
	
	// > 游戏加速键【键盘 - 键盘手柄按键修改器】
	if( Imported.Drill_OperateKeys &&
		$gameTemp.drill_OKe_isSpeedGearPressed() ){
		
		if( DrillUp.g_SG_keyPublishEnabled == true ){
			d_speed = DrillUp.g_SG_keySpeed;
		}
		if( DrillUp.g_SG_keyPublishEnabled == false &&
			$gameTemp.isPlaytest() == true ){	//（只测试版有效）
			d_speed = DrillUp.g_SG_keySpeed;
		}
	}
	
	// > 赋值
	d_time = d_time / d_speed;
	SceneManager._deltaTime = d_time;		//『游戏变速之帧率变速』
	
	// > 声音变速
	if( $gameSystem._drill_SG_lastSpeed != d_speed ){
		$gameSystem._drill_SG_lastSpeed = d_speed;
		AudioManager.drill_SG_refreshPitch();
	}
};
//==============================
// * 速度 - 帧刷新绑定
//==============================
var _drill_SG_Battle_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
	this.drill_SG_updateSpeed();
    _drill_SG_Battle_update.call(this);
};
//==============================
// * 速度 - 帧刷新（战斗界面）
//==============================
Scene_Battle.prototype.drill_SG_updateSpeed = Scene_Map.prototype.drill_SG_updateSpeed;



//=============================================================================
// ** ☆游戏声音控制
//
//			说明：	> 此模块专门控制 游戏声音。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 声音 - 变调捕获（覆写）
//==============================
AudioManager.updateBufferParameters = function( buffer, configVolume, audio ){
	if( $gameSystem == undefined ){ return; }
	if( buffer && audio ){
		
		// > 音量
		buffer.volume = configVolume * (audio.volume || 0) / 10000;
		
		// > 音调 - 对所有新加入的声音进行变调
		var cur_pitch = (audio.pitch || 0) / 100;
		if( buffer._drill_orgPitch == undefined ){
			buffer._drill_orgPitch = cur_pitch;
		};
		buffer.pitch = buffer._drill_orgPitch +(( $gameSystem._drill_SG_lastSpeed-1 )*$gameSystem._drill_SG_soundPer);
		
		// > 声像
		buffer.pan = (audio.pan || 0) / 100;
	}
}
//==============================
// * 声音 - 声音变速
//==============================
AudioManager.drill_SG_refreshPitch = function() {
	if( $gameSystem == undefined ){ return; }
	if( $gameSystem._drill_SG_soundEnabled != true ){ return; }
	
	// > 当前bgm变调
	if( this._bgmBuffer != undefined &&
		this._bgmBuffer.isPlaying() &&
		this._currentBgm != undefined ){		//（正在播放的音乐才变调）
		
		if( this._bgmBuffer._drill_orgPitch == undefined ){
			this._bgmBuffer._drill_orgPitch = this._bgmBuffer.pitch;
		};
		var pos = this._bgmBuffer.seek();		//（pitch变化之后，当前播放的声音进度会被清空，所以要存一下）
		this._bgmBuffer.pitch = this._bgmBuffer._drill_orgPitch +(( $gameSystem._drill_SG_lastSpeed-1 )*$gameSystem._drill_SG_soundPer);
		this._bgmBuffer.play(true, pos || 0);
	}
	
	// > 当前bgs变调
	if( this._bgsBuffer != undefined &&
		this._bgsBuffer.isPlaying() &&
		this._currentBgs != undefined ){		//（正在播放的音乐才变调）
		
		if( this._bgsBuffer._drill_orgPitch == undefined ){
			this._bgsBuffer._drill_orgPitch = this._bgsBuffer.pitch; 
		};
		var pos = this._bgsBuffer.seek();		//（pitch变化之后，当前播放的声音进度会被清空，所以要存一下）
		this._bgsBuffer.pitch = this._bgsBuffer._drill_orgPitch +(( $gameSystem._drill_SG_lastSpeed-1 )*$gameSystem._drill_SG_soundPer);
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


