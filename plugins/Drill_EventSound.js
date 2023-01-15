//=============================================================================
// Drill_EventSound.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        声音 - 事件的声音
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventSound +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以控制事件播放动画的声音、事件指令播放SE的声音。
 * 使得地图事件的所有声音都能够根据镜头的远近变化音量。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。也可以配合目标插件一起使用。
 * 基于：
 *   - Drill_RmmvCoreFix    系统-rmmv核心修复★★v1.1及以上版本★★
 *     rmmv内部有声音数组bug，必须让目标插件修好bug后，才能用此插件。
 * 可作用于：
 *   - Drill_LayerCamera    地图-活动地图镜头★★v1.6及以上版本★★
 *     目标插件控制镜头放大缩小时，你能够听到的声音范围也会变化。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件，并且只作用于SE声音。
 * 声音距离化：
 *   (1.所有地图事件播放的声音/动画，都会被包括。
 *      如果镜头距离那些事件很远，声音音量将会被降到最小值。
 *   (2.声音衰减从起始距离开始计算，假设衰减起始距离为6，衰减距离为12，
 *      镜头中心宽度为6的菱形区域内的事件，播放的声音为标准上限音量。
 *      若事件与镜头距离大于6，则越远音量越小，距离为18以上的声音是最小音量。
 *   (3.如果衰减距离值很小，那么你会瞬间听到逐步变大的音量。
 *      所以距离要与你的地图大小适配，不要太小。
 * 声音中断：
 *   (1.你可以设置事件在释放魔法被打断时，声音突然消失的情况。
 * rmmv内核bug：
 *   (1.rmmv内部提供了错误的声音数组，如果同时在远处播放两个以上的声音，会造成
 *      只有一个声音成功衰减，其他声音是原音量。
 *   (2.此bug在 rmmv核心修复 插件中修复。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 声音距离化：
 * 你可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 地图备注：=>事件的声音 : 开启声音距离化
 * 地图备注：=>事件的声音 : 关闭声音距离化
 * 
 * 插件指令：>事件的声音 : 开启声音距离化
 * 插件指令：>事件的声音 : 关闭声音距离化
 * 
 * 1.所有地图默认是开启距离化的，你可以添加地图注释，使得指定地图关闭
 *   声音距离化。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 声音距离化：
 * 你可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 事件注释：=>事件的声音 : 关闭本事件的声音距离化
 * 
 * 插件指令：>事件的声音 : 下一个播放的SE : 关闭声音距离化
 * 插件指令：>事件的声音 : 下一个播放的动画 : 关闭声音距离化
 * 
 * 1."下一个"插件指令，需要写在rmmv事件指令"播放SE"或"播放动画"的前面。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 声音中断：
 * 你可以使用下面插件指令，切断事件发出的声音：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>事件的声音 : 玩家 : 立即中断SE
 * 插件指令：>事件的声音 : 本事件 : 立即中断SE
 * 插件指令：>事件的声音 : 事件[10] : 立即中断SE
 * 插件指令：>事件的声音 : 事件变量[21] : 立即中断SE
 * 插件指令：>事件的声音 : 玩家 : 立即淡出SE
 * 插件指令：>事件的声音 : 本事件 : 立即淡出SE
 * 插件指令：>事件的声音 : 事件[10] : 立即淡出SE
 * 插件指令：>事件的声音 : 事件变量[21] : 立即淡出SE
 * 
 * 1.中断是指立刻中断，淡出是指衰减一段时间。
 * 2.注意，播放动画的物体可能是玩家自己，也可能是玩家的事件。
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
 * 工作类型：   持续执行
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   去各个管理层跑一圈，测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【19.67ms】
 *              100个事件的地图中，平均消耗为：【11.30ms】
 *               50个事件的地图中，平均消耗为：【6.15ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于声音绑定了事件，所以事件多时，消耗也会上升，但是不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了部分结构。 
 * [v1.2]
 * 修正了事件距离与镜头的中心位置。
 * [v1.3]
 * 修复了 两个事件 同时在远处播放声音时，只有一个声音衰减的bug。
 * 此bug来源于rmmv内核的声音数组bug。
 * [v1.4]
 * 修改了插件分类。
 * [v1.5]
 * 优化了旧存档的识别与兼容。
 *
 * 
 *
 * @param ---声音距离化---
 * @default 
 *
 * @param 地图默认是否开启距离化
 * @parent ---声音距离化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 你可以通过插件指令在特定时段开启/关闭距离化衰减功能。
 * @default true
 * 
 * @param 音量上限
 * @parent ---声音距离化---
 * @type number
 * @min 0
 * @desc 填入最大音量百分比，100 表示最近距离的音量上限为原来音量的 100% 。
 * @default 100
 * 
 * @param 音量下限
 * @parent ---声音距离化---
 * @type number
 * @min 0
 * @desc 填入最小音量百分比，8 表示最远距离的音量下限为原来音量的 8% 。
 * @default 8
 * 
 * @param 衰减起始距离
 * @parent ---声音距离化---
 * @type number
 * @min 0
 * @desc 当事件与镜头的距离超过一定图块距离时，声音开始衰减。单位图块。
 * @default 6
 * 
 * @param 衰减距离
 * @parent ---声音距离化---
 * @type number
 * @min 0
 * @desc 当声音开始衰减时，声音由强变弱的图块宽度距离。比如起始为6，衰减距离为18，则距离24位置的音量是最小音量。
 * @default 18
 *
 * @param ---声音中断---
 * @default 
 * 
 * @param 事件声音淡出时间
 * @parent ---声音中断---
 * @type number
 * @min 0
 * @desc 事件在地图中发出的所有声音，淡出的时间，单位帧。(1秒60帧)
 * @default 45
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ESo （Event_Sound）
//		临时全局变量	DrillUp.g_ESo_xxx
//		临时局部变量	this._drill_ESo_xxxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	去逻辑图形管理层测试
//		★性能测试消耗	19.67ms (update函数)
//		★最坏情况		无（不可能一大堆的声音同时播放，而且就算播放了也不会加大消耗）
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			声音距离化
//				->根据事件声音远近变化
//				->下一个声音不衰减
//				->事件声音不衰减
//				->中断声音
//				->淡出声音
//				->只在特定地图中开启	x
//
//		★必要注意事项：
//			1.目前绑定事件id的渠道有3种：
//				事件指令、移动路线、动画序列
//	
//		★其它说明细节：
//			1.玩家的id是 -2 ，所有声音捕获都会被赋值，有玩家也有事件。
//			  玩家不设置声音距离化。
//		
//		★存在的问题：
//			1.捕获SE的方法有些零散，代码的结构有些复杂，不直观。
//			

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventSound = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventSound');
	
	/*-----------------声音距离化------------------*/
	DrillUp.g_ESo_enableDefault = String(DrillUp.parameters['地图默认是否开启距离化'] || "true") === "true";	
	DrillUp.g_ESo_volumeTop = Number(DrillUp.parameters['音量上限'] || 100) * 0.01;
	DrillUp.g_ESo_volumeBottom = Number(DrillUp.parameters['音量下限'] || 8) * 0.01;
	DrillUp.g_ESo_start = Number(DrillUp.parameters['衰减起始距离'] || 6);
	DrillUp.g_ESo_width = Number(DrillUp.parameters['衰减距离'] || 12);
	DrillUp.g_ESo_fadeTime = Number(DrillUp.parameters['事件声音淡出时间'] || 45);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_RmmvCoreFix ){
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_ESo_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ESo_pluginCommand.call(this, command, args);
	/*-----------------声音距离化------------------*/
	if( command === ">事件的声音" ){ // >事件的声音 : 开启声音距离化
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "开启声音距离化" ){
				$gameSystem._drill_ESo_enable = true;
			}
			if( type == "关闭声音距离化" ){
				$gameSystem._drill_ESo_enable = false;
			}
		}
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "关闭声音距离化" ){
				if( temp1 == "下一个播放的SE" ){
					$gameTemp._drill_ESo_nextSEOff = true;
				}
				if( temp1 == "下一个播放的动画" ){
					$gameTemp._drill_ESo_nextAnimOff = true;
				}
			}
		}
	}
	
	/*-----------------声音中断------------------*/
	if( command === ">事件的声音" ){ // >事件的声音 : 本事件 : 立即中断SE
		if(args.length == 4){
			var unit = String(args[1]);
			var type = String(args[3]);
			
			var e_ids = null;
			if( e_ids == null && unit == "玩家" ){
				e_ids = [ -2 ];
			}
			if( e_ids == null && unit == "本事件" ){
				e_ids = [ this._eventId ];
			}
			if( e_ids == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}
			if( e_ids == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[k]) );
				}
			}
			if( e_ids == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [ Number(unit) ];
			}
			if( e_ids == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [ $gameVariables.value(Number(unit)) ];
			}
			
			
			if( e_ids != null && type == "立即中断SE" ){
				for( var i=0; i < e_ids.length;i++ ){
					var e_id = e_ids[i];
					$gameTemp._drill_ESo_needInterruptEventIds.push(e_id);
				}
			}
			if( e_ids != null && type == "立即淡出SE" ){
				for( var i=0; i < e_ids.length;i++ ){
					var e_id = e_ids[i];
					$gameTemp._drill_ESo_needFadeEventIds.push(e_id);
				}
			}
			
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ESo_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventSound.js 声音 - 事件的声音】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_ESo_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ESo_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ESo_sys_initialize.call(this);
	this.drill_ESo_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_ESo_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_ESo_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_ESo_saveEnabled == true ){	
		$gameSystem.drill_ESo_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_ESo_initSysData();
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
Game_System.prototype.drill_ESo_initSysData = function() {
	this.drill_ESo_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_ESo_checkSysData = function() {
	this.drill_ESo_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_ESo_initSysData_Private = function() {
	
    this._drill_ESo_enable = DrillUp.g_ESo_enableDefault;
    this._drill_ESo_volumeTop = DrillUp.g_ESo_volumeTop;
    this._drill_ESo_volumeBottom = DrillUp.g_ESo_volumeBottom;
    this._drill_ESo_start = DrillUp.g_ESo_start;
    this._drill_ESo_width = DrillUp.g_ESo_width;
    this._drill_ESo_fadeTime = DrillUp.g_ESo_fadeTime;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_ESo_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_ESo_enable == undefined ){
		this.drill_ESo_initSysData();
	}
	
};


//=============================================================================
// * 临时变量初始化
//=============================================================================
var _drill_ESo_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_ESo_temp_initialize.call(this);
	
	this._drill_ESo_event = 0;						//声音距离化（捕获用临时记录事件）
	this._drill_ESo_isOff = false;					//声音距离化（状态关闭缓冲器）
	this._drill_ESo_nextSEOff = false;				//声音距离化（下一个播放的SE）
	this._drill_ESo_nextAnimOff = false;			//声音距离化（下一个播放的动画）
	
	this._drill_ESo_needInterruptEventIds = [];		//需中断事件
	this._drill_ESo_needFadeEventIds = [];			//需淡出事件
	this._drill_ESo_needFadeSounds = [];			//需淡出事件音
};


//=============================================================================
// ** 事件注释初始化
//=============================================================================
var _drill_ESo_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ESo_event_setupPage.call(this);
    this.drill_ESo_setupMutiSwitch();
};
Game_Event.prototype.drill_ESo_setupMutiSwitch = function() {		
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>事件的声音"){
				if(args.length == 2){	//=>事件的声音 : 关闭本事件的声音距离化
					var temp1 = String(args[1]);
					if( temp1 == "关闭本事件的声音距离化" ){
						this._drill_ESo_isEventOff = true;
					}
				}
			};
		};
	}, this);};
};

//=============================================================================
// ** 地图备注
//=============================================================================
var _drill_ESo_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_ESo_map_setup.call(this, mapId);
	this.drill_ESo_setupReflection();
};
Game_Map.prototype.drill_ESo_setupReflection = function() {
	$gameSystem._drill_ESo_enable = DrillUp.g_ESo_enableDefault;
	$dataMap.note.split(/[\r\n]+/).forEach(function(row) {
		var args = row.split(' ');
		var command = args.shift();
		if (command == "=>事件的声音"){
			if(args.length == 2){	//=>事件的声音 : 开启声音距离化
				var temp1 = String(args[1]);
				if( temp1 == "开启声音距离化" ){
					$gameSystem._drill_ESo_enable = true;
				}
				if( temp1 == "关闭声音距离化" ){
					$gameSystem._drill_ESo_enable = false;
				}
			}
		};
	},this);
};

//=============================================================================
// ** 绑定事件
//=============================================================================
//==============================
// * 绑定 - 播放SE（事件指令）
//==============================
var _drill_ESo_command250 = Game_Interpreter.prototype.command250;
Game_Interpreter.prototype.command250 = function() {
    $gameTemp._drill_ESo_event = this._eventId;
    $gameTemp._drill_ESo_isOff = $gameTemp._drill_ESo_nextSEOff;
	$gameTemp._drill_ESo_nextSEOff = false;
    return _drill_ESo_command250.call(this);
};

//==============================
// * 绑定 - 播放SE（移动路线）
//==============================
var _drill_ESo_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
	if( this instanceof Game_Event ){
		switch (command.code) {
			case Game_Character.ROUTE_PLAY_SE:
				$gameTemp._drill_ESo_event = this._eventId;
				$gameTemp._drill_ESo_isOff = $gameTemp._drill_ESo_nextSEOff;
				$gameTemp._drill_ESo_nextSEOff = false;
		}
	}
	if( this instanceof Game_Player ){
		switch (command.code) {
			case Game_Character.ROUTE_PLAY_SE:
				$gameTemp._drill_ESo_event = -2;
		}
	}
	_drill_ESo_processMoveCommand.call( this, command );
}

//==============================
// * 绑定 - 动画 - 存储事件id
//==============================
var _drill_ESo_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
	_drill_ESo_startAnimation.call(this,animation, mirror, delay);
	if( this instanceof Sprite_Character && this._character ){
		var sprite = this._animationSprites[ this._animationSprites.length-1 ];
		sprite._drill_ESo_event = this._character._eventId;
		if( this._character instanceof Game_Player ){
			sprite._drill_ESo_event = -2;
		}
	}
}
//==============================
// * 绑定 - 动画 - 播放SE（动画序列）
//==============================
var _drill_ESo_processTimingData = Sprite_Animation.prototype.processTimingData;
Sprite_Animation.prototype.processTimingData = function(timing) {
    if (!this._duplicated && timing.se) {
		$gameTemp._drill_ESo_event = this._drill_ESo_event;		//每次播放声音前，进行一次声音捕获
		$gameTemp._drill_ESo_isOff = $gameTemp._drill_ESo_nextAnimOff;
		$gameTemp._drill_ESo_nextAnimOff = false;
    }
	_drill_ESo_processTimingData.call(this,timing);
};

//==============================
// * 绑定 - se声音存储事件id
//	
//			说明：	this._seBuffers 数组有bug，每次过滤后都只剩下一个声音。
//					该bug需要在系统插件中修复。
//==============================
var _drill_ESo_createBuffer = AudioManager.createBuffer;
AudioManager.createBuffer = function(folder, name){
	var buffer = _drill_ESo_createBuffer.call(this, folder, name);
	if( folder == 'se' && $gameTemp ){
		if( $gameTemp._drill_ESo_event > 0 || $gameTemp._drill_ESo_event == -2 ){
			buffer._drill_ESo_b_event = $gameTemp._drill_ESo_event;			//绑定的事件
			buffer._drill_ESo_b_isOff = $gameTemp._drill_ESo_isOff;			//距离化关闭状态
			buffer._drill_ESo_b_volume = buffer.volume;						//原音量
			$gameTemp._drill_ESo_event = 0;
		}
	}
	return buffer;
}

//==============================
// * 绑定 - 获取事件声音（所有）
//==============================
AudioManager.drill_ESo_getAllEventSounds = function() {
	var result = [];
	var buffers = this._seBuffers;
	for( var i=0; i < buffers.length; i++ ){
		var buffer = buffers[i];
		if( buffer._drill_ESo_b_event && buffer._drill_ESo_b_event > 0 ){
			result.push( buffer );
		}
	}
	return result;
}

//==============================
// * 绑定 - 获取事件声音（根据id）
//==============================
AudioManager.drill_ESo_getEventSoundsById = function( event_id ) {
	var result = [];
	var buffers = this._seBuffers;
	for( var i=0; i < buffers.length; i++ ){
		var buffer = buffers[i];
		if( buffer._drill_ESo_b_event == event_id ){
			result.push( buffer );
		}
	}
	return result;
}

//==============================
// * 绑定 - 获取玩家声音
//==============================
AudioManager.drill_ESo_getPlayerSounds = function() {
	var result = [];
	var buffers = this._seBuffers;
	for( var i=0; i < buffers.length; i++ ){
		var buffer = buffers[i];
		if( buffer._drill_ESo_b_event == -2 ){
			result.push( buffer );
		}
	}
	return result;
}

//=============================================================================
// ** 函数接口
//=============================================================================
//==============================
// * 接口 - 播放玩家声音
//==============================
AudioManager.drill_ESo_playPlayerSe = function(se) {
	$gameTemp._drill_ESo_event = -2;
	$gameTemp._drill_ESo_isOff = false;		//强制距离化
	this.playSe(se);
}
//==============================
// * 接口 - 播放事件声音
//==============================
AudioManager.drill_ESo_playEventSe = function(se,event_id) {
	$gameTemp._drill_ESo_event = event_id;
	$gameTemp._drill_ESo_isOff = false;		//强制距离化
	this.playSe(se);
}
//==============================
// * 接口 - 播放人物指针的声音
//==============================
AudioManager.drill_ESo_playCharacterSe = function(se,character) {
	if( character instanceof Game_Event ){
		$gameTemp._drill_ESo_event = character._eventId;
	}
	if( character instanceof Game_Player ){
		$gameTemp._drill_ESo_event = -2;
	}
	$gameTemp._drill_ESo_isOff = false;		//强制距离化
	this.playSe(se);
}


//=============================================================================
// ** 音量控制
//=============================================================================
//==============================
// * 帧刷新
//==============================
var _drill_ESo_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_ESo_map_update.call(this,sceneActive);
	this.drill_ESo_updateDistanceDecay();		//帧刷新 - 距离衰减
	this.drill_ESo_updateSoundInterrupt();		//帧刷新 - 声音中断
}
//==============================
// * 帧刷新 - 距离衰减
//==============================
Game_Map.prototype.drill_ESo_updateDistanceDecay = function() {
	if( $gameSystem._drill_ESo_enable != true ){ return; }
	
	var buffers = AudioManager.drill_ESo_getAllEventSounds();	//遍历正在播放的声音，根据距离改变音量
	for( var i=0; i < buffers.length; i++ ){	
		var buffer = buffers[i];
		if( buffer._drill_ESo_b_isOff != false ){ continue; }
		
		// > 事件捕获
		var e = $gameMap.event(buffer._drill_ESo_b_event);
		if( e ){
			var x1 = e._realX + 0.5;						//事件位置（中心位置）
			var y1 = e._realY + 0.5;
			var x2 = this._displayX + this.screenTileX()/2;	//镜头中心点
			var y2 = this._displayY + this.screenTileY()/2;
			var d = Math.abs( $gameMap.distance(x1, y1, x2, y2) );
			var per = 1.00;
			
			// > 计算距离
			var _start = $gameSystem._drill_ESo_start;
			var _width = $gameSystem._drill_ESo_width;
			
			// > 镜头缩放与位移【地图 - 活动地图镜头】
			if( Imported.Drill_LayerCamera && $gameSystem.drill_LCa_curScaleX ){
				_start = _start * 2 / ( $gameSystem.drill_LCa_curScaleX() + $gameSystem.drill_LCa_curScaleY() );
				_width = _width * 2 / ( $gameSystem.drill_LCa_curScaleX() + $gameSystem.drill_LCa_curScaleY() );
			}
			
			// > 计算衰减值
			if( d > _start ){
				per = 1.00 - (d - _start) / _width; 
			}
			per = Math.min(Math.max( per, $gameSystem._drill_ESo_volumeBottom),$gameSystem._drill_ESo_volumeTop);
			buffer.volume = buffer._drill_ESo_b_volume * per;
		}
	}
}
//==============================
// * 帧刷新 - 声音中断
//==============================
Game_Map.prototype.drill_ESo_updateSoundInterrupt = function() {
	
	// > 中断标记
	for( var i=0; i < $gameTemp._drill_ESo_needInterruptEventIds.length; i++ ){
		var e_id = $gameTemp._drill_ESo_needInterruptEventIds[i];
		var buffers = [];
		if( e_id == -2 ){
			buffers = AudioManager.drill_ESo_getPlayerSounds();			//玩家的声音
		}else{
			buffers = AudioManager.drill_ESo_getEventSoundsById(e_id);	//事件的声音
		}
		for( var j=0; j < buffers.length; j++ ){	
			var buffer = buffers[j];
			buffer.stop();
		}
	}
	$gameTemp._drill_ESo_needInterruptEventIds = [];
	
	// > 淡出标记
	for( var i=0; i < $gameTemp._drill_ESo_needFadeEventIds.length; i++ ){
		var e_id = $gameTemp._drill_ESo_needFadeEventIds[i];
		var buffers = [];
		if( e_id == -2 ){
			buffers = AudioManager.drill_ESo_getPlayerSounds();			//玩家的声音
		}else{
			buffers = AudioManager.drill_ESo_getEventSoundsById(e_id);	//事件的声音
		}
		for( var j=0; j < buffers.length; j++ ){	
			var buffer = buffers[j];
			$gameTemp._drill_ESo_needFadeSounds.push(buffer);
		}
	}
	$gameTemp._drill_ESo_needFadeEventIds = [];
	
	// > 淡出过程
	for( var j=$gameTemp._drill_ESo_needFadeSounds.length-1; j >= 0; j-- ){	
		var buffer = $gameTemp._drill_ESo_needFadeSounds[j];
		if( !buffer._drill_ESo_b_time ){ buffer._drill_ESo_b_time = 0; }
		buffer._drill_ESo_b_time += 1;
		buffer.volume = 1 - buffer._drill_ESo_b_volume * (buffer._drill_ESo_b_time / $gameSystem._drill_ESo_fadeTime);
		if( buffer.volume <= 0 ){
			buffer.stop();
			$gameTemp._drill_ESo_needFadeSounds.splice(j,1);
		}
	}
	
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventSound = false;
		alert(
			"【Drill_EventSound.js 声音 - 事件的声音】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_RmmvCoreFix 系统-rmmv核心修复"
		);
}


