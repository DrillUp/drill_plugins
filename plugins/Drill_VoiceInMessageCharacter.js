//=============================================================================
// Drill_VoiceInMessageCharacter.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        声音 - 对话文字响声
 * @author Drill_up
 * 
 * @Drill_LE_param "声音-%d"
 * @Drill_LE_parentKey "---声音组%d至%d---"
 * @Drill_LE_var "DrillUp.g_VIMC_sound_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_VoiceInMessageCharacter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得对话框的每个字符播放时，发出相应的文字响声。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于对话框。
 * 2.了解更多响声相关，可以去看看 "23.窗口字符 > 关于对话文字速度.docx"。
 * 细节：
 *   (1.窗口字符设置的优先级比 插件指令设置 高。
 *      如果窗口字符设置了声音，优先使用窗口字符的。
 * 设计：
 *   (1.由于默认情况下游戏对话的播放速度为每帧一个字，速度
 *      特别快，对话响声会比较刺耳。
 *      你需要配合 对话文字速度 插件，降低播放速度，让响声
 *      慢一点，效果会温和许多。
 *   (2.如果字数太多，声音仍然太密集，你可以设置字数跳跃，
 *      比如设置每2个字才播放一次声音，这样能有效减少播放频率。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令修改
 * 你可以通过插件指令修改当前的声音：
 * 
 * 插件指令：>对话文字响声 : 设置声音 : 声音[1]
 * 插件指令：>对话文字响声 : 设置声音 : 默认声音
 * 插件指令：>对话文字响声 : 关闭声音
 * 插件指令：>对话文字响声 : 设置字数跳跃 : 字数[2]
 * 
 * 1."声音[1]"表示对应ID为1的声音配置，修改后将使用该文字响声。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口字符修改
 * 你可以使用窗口字符修改文字响声：
 * 
 * 窗口字符：\dVIMC[1]
 * 窗口字符：\dVIMC[默认]
 * 窗口字符：\dVIMC[关闭]
 * 
 * 1."\dVIMC[1]"表示对应ID为1的声音配置。
 *   窗口字符设置后，只在当前对话框页内有效，下一页将恢复设置。
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
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只在每个字符显示时，单次执行，产生的消耗几乎可以忽略不计。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了字数跳跃设置。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * 
 * @param 字数跳跃
 * @type number
 * @min 1
 * @desc 默认为1，1表示每1个字播放一次声音，2表示每2个字播放一次声音。
 * @default 1
 * 
 * @param 默认对话播放声音
 * @type number
 * @min 0
 * @desc 默认对话播放的声音ID，0表示没有声音。
 * @default 0
 * 
 * @param ---声音组 1至20---
 * @default
 *
 * @param 声音-1
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-2
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-3
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-4
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-5
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-6
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-7
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-8
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-9
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-10
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-11
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-12
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-13
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-14
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-15
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-16
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-17
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-18
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-19
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-20
 * @parent ---声音组 1至20---
 * @type struct<VIMCSound>
 * @desc 声音的详细配置信息。
 * @default 
 * 
 */
/*~struct~VIMCSound:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的声音==
 * 
 * @param 资源-声音
 * @desc 声音的资源文件。
 * @default (需配置)默认对话文字响声
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param 音量
 * @type number
 * @min 0
 * @max 100
 * @desc 声音的音量大小，范围为 0至100 。
 * @default 80
 * 
 * @param 音调
 * @type number
 * @min 50
 * @max 150
 * @desc 声音的音调值，范围为 50至150 。
 * @default 100
 * 
 * @param 声像
 * @desc 声音的左右声像，范围为 -100至100 。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		VIMC（Voice_In_Message_Character）
//		临时全局变量	无
//		临时局部变量	this._drill_VIMC_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	窗口字符管理层
//		★性能测试消耗	6.08ms
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			对话文字响声：
//				->字数跳跃
//				->声音配置
//			
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.对话文字响声的实际效果并没有想象中那么合适。
//			  暂时不要考虑太多扩展功能，以免显得配置过于臃肿。
//			
//		★存在的问题：
//			暂无
//		

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_VoiceInMessageCharacter = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_VoiceInMessageCharacter');
	
	
	//==============================
	// * 变量获取 - 声音
	//				（~struct~VIMCSound）
	//==============================
	DrillUp.drill_VIMC_initSound = function( dataFrom ){
		var data = {};
		data['name'] = String( dataFrom["资源-声音"] || "");
		data['volume'] = Number( dataFrom["音量"] || 100);
		data['pitch'] = Number( dataFrom["音调"] || 100);
		data['pan'] = Number( dataFrom["声像"] || 0);
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_VIMC_charSkip = Number(DrillUp.parameters["字数跳跃"] || 1);
	DrillUp.g_VIMC_default = Number(DrillUp.parameters["默认对话播放声音"] || 0);
	
	/*-----------------声音------------------*/
	DrillUp.g_VIMC_sound_length = 20;
	DrillUp.g_VIMC_sound = [];
	for (var i = 0; i < DrillUp.g_VIMC_sound_length; i++) {
		if( DrillUp.parameters['声音-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['声音-' + String(i+1) ]);
			DrillUp.g_VIMC_sound[i] = DrillUp.drill_VIMC_initSound( temp );
		}else{
			DrillUp.g_VIMC_sound[i] = null;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_VIMC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_VIMC_pluginCommand.call(this, command, args);
	if( command === ">对话文字响声" ){
		
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "关闭声音" ){
				$gameSystem._drill_VIMC_curSound = 0;
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "设置声音" ){
				if( temp1 == "默认声音" ){
					$gameSystem._drill_VIMC_curSound = DrillUp.g_VIMC_default;
				}
				if( temp1.indexOf("声音[") != -1 ){
					temp1 = temp1.replace("声音[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_VIMC_curSound = Number(temp1);
				}
			}
			if( type == "设置字数跳跃" ){
				temp1 = temp1.replace("字数[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_VIMC_charSkip = Math.max( 1,Number(temp1) );
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_VIMC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_VIMC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_VIMC_sys_initialize.call(this);
	this.drill_VIMC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_VIMC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_VIMC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_VIMC_saveEnabled == true ){	
		$gameSystem.drill_VIMC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_VIMC_initSysData();
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
Game_System.prototype.drill_VIMC_initSysData = function() {
	this.drill_VIMC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_VIMC_checkSysData = function() {
	this.drill_VIMC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_VIMC_initSysData_Private = function() {
	
	this._drill_VIMC_curSound = DrillUp.g_VIMC_default;			//当前声音（默认的）
	this._drill_VIMC_curMessageSound = -1;						//当前声音（窗口字符的，优先级更高）
	
	this._drill_VIMC_playCount = 0;								//声音播放次数
	this._drill_VIMC_charSkip = DrillUp.g_VIMC_charSkip;		//字数跳跃
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_VIMC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_VIMC_curSound == undefined ){
		this.drill_VIMC_initSysData();
	}
	
};


//=============================================================================
// * 窗口字符
//=============================================================================
//==============================
// * 效果字符 - 对话文字响声
//==============================
var _drill_VIMC_COWC_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_VIMC_COWC_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	
	if( command == "dVIMC" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( temp1 == "关闭" ){
				$gameSystem._drill_VIMC_curMessageSound = 0;
			}else if( temp1 == "默认" ){
				$gameSystem._drill_VIMC_curMessageSound = DrillUp.g_VIMC_default;
			}else{
				$gameSystem._drill_VIMC_curMessageSound = Number(temp1);
			}
			this.drill_COWC_charSubmit_Effect( 0, 0 );
		}
	}
};
//==============================
// * 新建页 - 执行新建
//==============================
var _drill_VIMC_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function( textState ){
	_drill_VIMC_newPage.call( this, textState );
	$gameSystem._drill_VIMC_curMessageSound = -1;
};


//=============================================================================
// ** 文字响声
//=============================================================================
//==============================
// * 文字响声 - 添加声音
//==============================
var _drill_VIMC_processNormalCharacter = Window_Message.prototype.processNormalCharacter;
Window_Message.prototype.processNormalCharacter = function( textState ){
	_drill_VIMC_processNormalCharacter.call( this, textState );
	
	// > 跳出时，才播放声音（循环打印多个字的时候，只发出一个字的响声）
	if( this.drill_COWC_canBreakProcess() ){
		
		var cur_sound = -1;
		if( $gameSystem._drill_VIMC_curSound > 0 ){
			cur_sound = $gameSystem._drill_VIMC_curSound-1;
		}
		if( $gameSystem._drill_VIMC_curMessageSound > 0 ){
			cur_sound = $gameSystem._drill_VIMC_curMessageSound-1;
		}
		if( cur_sound < 0 ){ return; }
		
		// > 声音资源
		var se_data = DrillUp.g_VIMC_sound[ cur_sound ];
		if( se_data == undefined ){ return; }
		
		
		// > 每帧最多播放一次
		if( $gameTemp._drill_VIMC_canPlay != true ){ return; }
		$gameTemp._drill_VIMC_canPlay = false;
		
		
		// > 声音播放计数
		$gameSystem._drill_VIMC_playCount += 1;
		
		// > 字数跳跃
		if( $gameSystem._drill_VIMC_playCount % $gameSystem._drill_VIMC_charSkip != 0 ){
			return;
		}
		
		// > 播放声音
		var se = {};
		se.name = se_data['name'];
		se.volume = se_data['volume'];
		se.pitch = se_data['pitch'];
		se.pan = se_data['pan'];
		AudioManager.playSe(se);
	}
}
//==============================
// * 文字响声 - 帧刷新 - 声音开关（每帧最多播放一次）
//==============================
var _drill_VIMC_update = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
	_drill_VIMC_update.call(this);
	$gameTemp._drill_VIMC_canPlay = true;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_VoiceInMessageCharacter = false;
		alert(
			"【Drill_VoiceInMessageCharacter.js 声音-对话文字响声】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowCharacter  窗口字符-窗口字符核心"
		);
}

