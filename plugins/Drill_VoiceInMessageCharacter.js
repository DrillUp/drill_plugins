//=============================================================================
// Drill_VoiceInMessageCharacter.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        声音 - 逐个绘制的响声
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
 * 你可以使得逐个绘制每个字符时，发出相应的字符响声。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 * 可被扩展：
 *   - Drill_CoreOfDialog            对话框-对话框优化核心
 *     如果没有对话框优化核心，则响声的设置在对话框中不起作用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于对话框。
 * 2.了解更多响声相关，可以去看看 "23.窗口字符 > 关于逐个绘制的播放速度.docx"。
 * 细节：
 *   (1.窗口字符设置的优先级比插件指令设置的高。
 *      如果窗口字符修改了声音，那么按窗口字符来修改。
 *      但窗口字符的修改，只临时有效，对话框中下一页 或 执行重新绘制，都会被重置。
 * 设计：
 *   (1.由于默认情况下游戏对话的播放速度为每帧一个字，速度
 *      特别快，对话响声会比较刺耳。
 *      你需要配合 对话文字速度 插件，降低播放速度，让响声
 *      慢一点，效果会温和许多。
 *   (2.如果字数太多，声音仍然太密集，你可以设置字数跳跃，
 *      比如设置每2个字才播放一次声音，这样能有效减少播放频率。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以使用窗口字符修改字符响声：
 * 
 * 窗口字符：\dVIMC[1]
 * 窗口字符：\dVIMC[默认声音]
 * 窗口字符：\dVIMC[关闭]
 * 
 * 1."\dVIMC[1]"表示对应ID为1的声音配置。
 *   窗口字符设置后，只在当前对话框页内有效，下一页将恢复设置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 全局默认值
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>逐个绘制的响声 : 所有文本 : 修改声音 : 声音[1]
 * 插件指令：>逐个绘制的响声 : 所有文本 : 修改字数跳跃 : 字数[2]
 * 插件指令：>逐个绘制的响声 : 所有文本 : 恢复默认声音
 * 插件指令：>逐个绘制的响声 : 所有文本 : 恢复默认字数跳跃
 * 
 * 插件指令：>逐个绘制的响声 : 对话框 : 修改模式 : 自定义模式
 * 插件指令：>逐个绘制的响声 : 对话框 : 修改模式 : 与所有文本一致
 * 插件指令：>逐个绘制的响声 : 对话框 : 修改声音 : 声音[1]
 * 插件指令：>逐个绘制的响声 : 对话框 : 修改字数跳跃 : 字数[2]
 * 插件指令：>逐个绘制的响声 : 对话框 : 恢复默认声音
 * 插件指令：>逐个绘制的响声 : 对话框 : 恢复默认字数跳跃
 * 
 * 1.插件指令修改的是全局默认值，设置后永久有效。
 *   新建的所有贴图/窗口，全部使用此设置作为 默认值。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
 * 2."声音[1]"表示对应声音配置1，修改后将使用该字符响声。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令修改
 * 你可以通过插件指令修改当前的声音：
 * 
 * 插件指令：>逐个绘制的响声 : 声音总开关 : 开启
 * 插件指令：>逐个绘制的响声 : 声音总开关 : 关闭
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
 * [v1.3]
 * 修复了按键时会响一声的bug。
 * [v1.4]
 * 大幅度修改了底层，并且兼容了新的底层结构。
 * 
 * 
 * 
 * 
 * 
 * @param ---全局默认值---
 * @desc 
 * 
 * @param 所有文本-默认对话播放声音
 * @parent ---全局默认值---
 * @type number
 * @min 0
 * @desc 默认对话播放的声音ID，0表示没有声音。
 * @default 0
 * 
 * @param 所有文本-默认字数跳跃
 * @parent ---全局默认值---
 * @type number
 * @min 1
 * @desc 默认为1，1表示每1个字播放一次声音，2表示每2个字播放一次声音。
 * @default 1
 * 
 * 
 * @param 对话框声音模式
 * @parent ---全局默认值---
 * @type select
 * @option 自定义模式
 * @value 自定义模式
 * @option 与所有文本一致
 * @value 与所有文本一致
 * @desc 对话框的模式。
 * @default 自定义模式
 * 
 * @param 对话框-默认对话播放声音
 * @parent 对话框声音模式
 * @type number
 * @min 0
 * @desc 默认对话播放的声音ID，0表示没有声音。
 * @default 0
 * 
 * @param 对话框-默认字数跳跃
 * @parent 对话框声音模式
 * @type number
 * @min 1
 * @desc 默认为1，1表示每1个字播放一次声音，2表示每2个字播放一次声音。
 * @default 1
 * 
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
 * @default (需配置)默认逐个绘制的响声
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
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			
//			->☆窗口字符应用之效果字符
//				> \dVIMC[关闭]
//				> \dVIMC[默认声音]
//				> \dVIMC[1]
//			->☆全局默认值
//				->准备绘制配置（继承）
//			x->☆重置控制
//			
//			->☆字符响声
//				->字数跳跃
//				->每帧最多播放一次
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.逐个绘制的响声的实际效果并没有想象中那么合适。
//			  暂时不要考虑太多扩展功能，以免显得配置过于臃肿。
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
	DrillUp.g_VIMC_PluginTip_curName = "Drill_VoiceInMessageCharacter.js 声音-逐个绘制的响声";
	DrillUp.g_VIMC_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_VIMC_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_VIMC_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_VIMC_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_VIMC_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_VIMC_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_VoiceInMessageCharacter = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_VoiceInMessageCharacter');
	
	
	//==============================
	// * 静态数据 - 声音
	//				（~struct~VIMCSound）
	//==============================
	DrillUp.drill_VIMC_initSound = function( dataFrom ){
		var data = {};
		data['name'] = String( dataFrom["资源-声音"] || "");	//『完整声音数据』
		data['volume'] = Number( dataFrom["音量"] || 100);
		data['pitch'] = Number( dataFrom["音调"] || 100);
		data['pan'] = Number( dataFrom["声像"] || 0);
		return data;
	}
	/*-----------------声音------------------*/
	DrillUp.g_VIMC_sound_length = 20;
	DrillUp.g_VIMC_sound = [];
	for (var i = 0; i < DrillUp.g_VIMC_sound_length; i++) {
		if( DrillUp.parameters["声音-" + String(i+1) ] != "" && 
			DrillUp.parameters["声音-" + String(i+1) ] != undefined ){
			var temp = JSON.parse(DrillUp.parameters["声音-" + String(i+1) ]);
			DrillUp.g_VIMC_sound[i] = DrillUp.drill_VIMC_initSound( temp );
		}else{
			DrillUp.g_VIMC_sound[i] = null;
		}
	}
	
	/*-----------------『全局默认值』所有文本（静态数据）------------------*/
	DrillUp.g_VIMC_globalVoice = Number(DrillUp.parameters["所有文本-默认对话播放声音"] || 0);
	DrillUp.g_VIMC_globalCharSkip = Number(DrillUp.parameters["所有文本-默认字数跳跃"] || 1);
	
	/*-----------------『全局默认值』对话框（静态数据）------------------*/
	DrillUp.g_VIMC_dialogMode = String(DrillUp.parameters["对话框声音模式"] || "自定义模式"); 
	DrillUp.g_VIMC_dialogVoice = Number(DrillUp.parameters["对话框-默认对话播放声音"] || 0);
	DrillUp.g_VIMC_dialogCharSkip = Number(DrillUp.parameters["对话框-默认字数跳跃"] || 1);
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_VIMC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_VIMC_pluginCommand.call(this, command, args);
	this.drill_VIMC_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_VIMC_pluginCommand = function( command, args ){
	if( command === ">逐个绘制的响声" ){
		
		/*-----------------『全局默认值』所有文本（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "所有文本" ){
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认声音" ){
						$gameSystem._drill_VIMC_globalVoice = DrillUp.g_VIMC_globalVoice;
					}
					if( temp1 == "恢复默认字数跳跃" ){
						$gameSystem._drill_VIMC_globalCharSkip = DrillUp.g_VIMC_globalCharSkip;
					}
				}
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					if( temp1 == "修改声音" ){
						temp2 = temp2.replace("声音[","");
						temp2 = temp2.replace("]","");
						$gameSystem._drill_VIMC_globalVoice = Number(temp2);
					}
					if( temp1 == "修改字数跳跃" ){
						temp2 = temp2.replace("字数[","");
						temp2 = temp2.replace("]","");
						$gameSystem._drill_VIMC_globalCharSkip = Math.max( 1,Number(temp2) );
					}
				}
			}
		}
		
		/*-----------------『全局默认值』对话框（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "对话框" ){
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认声音" ){
						$gameSystem._drill_VIMC_dialogVoice = DrillUp.g_VIMC_globalVoice;
					}
					if( temp1 == "恢复默认字数跳跃" ){
						$gameSystem._drill_VIMC_dialogCharSkip = DrillUp.g_VIMC_globalCharSkip;
					}
				}
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					if( temp1 == "修改模式" ){
						$gameSystem._drill_VIMC_dialogMode = temp2;
					}
					if( temp1 == "修改声音" ){
						temp2 = temp2.replace("声音[","");
						temp2 = temp2.replace("]","");
						$gameSystem._drill_VIMC_dialogVoice = Number(temp2);
					}
					if( temp1 == "修改字数跳跃" ){
						temp2 = temp2.replace("字数[","");
						temp2 = temp2.replace("]","");
						$gameSystem._drill_VIMC_dialogCharSkip = Math.max( 1,Number(temp2) );
					}
				}
			}
		}
		
		/*-----------------声音总开关------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "声音总开关" || type == "声音开关" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_VIMC_voiceEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_VIMC_voiceEnabled = false;
				}
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "开启声音" ){
				$gameSystem._drill_VIMC_voiceEnabled = true;
			}
			if( type == "关闭声音" ){
				$gameSystem._drill_VIMC_voiceEnabled = false;
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
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
	
	// > 『全局默认值』 - 所有文本（存储数据）
	this._drill_VIMC_globalVoice = DrillUp.g_VIMC_globalVoice;			//所有文本-默认对话播放声音
	this._drill_VIMC_globalCharSkip = DrillUp.g_VIMC_globalCharSkip;	//所有文本-默认字数跳跃
	
	// > 『全局默认值』 - 对话框（存储数据）
	this._drill_VIMC_dialogMode = DrillUp.g_VIMC_dialogMode;			//对话框-模式
	this._drill_VIMC_dialogVoice = DrillUp.g_VIMC_dialogVoice;			//对话框-默认对话播放声音
	this._drill_VIMC_dialogCharSkip = DrillUp.g_VIMC_dialogCharSkip;	//对话框-默认字数跳跃
	
	this._drill_VIMC_voiceEnabled = true;		//声音总开关
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_VIMC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_VIMC_voiceEnabled == undefined ){
		this.drill_VIMC_initSysData();
	}
	
};


//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 组合符配置
//==============================
var _drill_VIMC_COWC_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_VIMC_COWC_effect_processCombined.call( this, matched_index, matched_str, command, args );
	
	if( command == "dVIMC" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			
			// > 『窗口字符定义』 - 关闭声音（\dVIMC[关闭]）
			if( temp1 == "关闭" || temp1 == "禁用" ){
				this.drill_COWC_effect_submitCombined( "@@@dvc[false]" );
				
			// > 『窗口字符定义』 - 播放默认声音（\dVIMC[默认声音]）
			}else if( temp1 == "默认" || temp1 == "默认声音" ){
				this.drill_COWC_effect_submitCombined( "@@@dvc[default]" );
				
			// > 『窗口字符定义』 - 播放指定声音（\dVIMC[1]）
			}else{
				this.drill_COWC_effect_submitCombined( "@@@dvc[" + String(temp1) + "]" );
			}
		}
	}
};
//==============================
// * 窗口字符应用之效果字符 - 样式阶段-配置阶段（继承）
//==============================
var _drill_VIMC_COCD_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_VIMC_COCD_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command == "@@@dvc" ){	//（大小写敏感）
		if( args.length == 1 ){
			
			// > 『底层字符定义』 - 关闭声音（@@@dvc[0]） drill_voice_character
			if( String(args[0]) == "false" ){
				cur_blockParam['VIMC_voiceId'] = 0;
				
			// > 『底层字符定义』 - 播放默认声音（@@@dvc[1]） drill_voice_character
			}else if( String(args[0]) == "default" ){
				if( $gameSystem._drill_VIMC_dialogMode == "自定义模式" && 
					cur_infoParam['parentWindow'] == "Window_Message" ){
					cur_blockParam['VIMC_voiceId'] = $gameSystem._drill_VIMC_dialogVoice;
				}else{
					cur_blockParam['VIMC_voiceId'] = $gameSystem._drill_VIMC_globalVoice;
				}
				
			// > 『底层字符定义』 - 播放声音（@@@dvc[1]） drill_voice_character
			}else{
				cur_blockParam['VIMC_voiceId'] = Number(args[0]);
			}
			
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
};


//=============================================================================
// ** ☆全局默认值
//
//			说明：	> 此处提供 全局默认值，使得可以作用于所有文本。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 全局默认值 - 准备绘制配置（继承）
//
//			说明：	> 由于 Bitmap 没有存放相关参数，所以直接继承函数 drill_COCD_initOptions 进行初始化。
//==============================
var _drill_VIMC_COCD_drawTextInit = Game_Temp.prototype.drill_COCD_initOptions;
Game_Temp.prototype.drill_COCD_initOptions = function( o_data, o_bitmap ){
	_drill_VIMC_COCD_drawTextInit.call( this, o_data, o_bitmap );
	
	// > 『全局默认值』 - 使用值 - 所有文本
	if( $gameSystem == undefined ){ return; }
	var cur_voice_id = $gameSystem._drill_VIMC_globalVoice;
	
	// > 『全局默认值』 - 使用值 - 对话框
	if( o_bitmap != undefined && 
		o_bitmap.drill_COWC_isInMessageWindow() ){
		
		if( $gameSystem._drill_VIMC_dialogMode == "自定义模式" ){
			cur_voice_id = $gameSystem._drill_VIMC_dialogVoice;
		}
	}
	
	// > 『全局默认值』 - 使用值
	if( o_data['blockParam']['VIMC_voiceId'] == undefined ){ o_data['blockParam']['VIMC_voiceId'] = cur_voice_id; }
	
}



//=============================================================================
// ** ☆字符响声『音效模块』
//
//			说明：	> 此模块控制 在指定文字位置，播放响声。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 字符响声 - 每个字符开始时（继承）
//==============================
var _drill_VIMC_COWC_timing_textStart = Bitmap.prototype.drill_COWC_timing_textStart;
Bitmap.prototype.drill_COWC_timing_textStart = function( textBlock, row_index, text_index ){
	_drill_VIMC_COWC_timing_textStart.call( this, textBlock, row_index, text_index );
	/*
		这个过程已经处于 逐个绘制 中，且 <xxx>  \xxx  \xxx[xxx]  @@@xxx 全部都转换完毕。
		进入到此函数，至少与前面的字符解析过程相差1帧，具体看update情况。
	*/
	var cur_blockParam = textBlock.drill_textBlock_getBlockParam();
	
	// > 开关关闭时，不要播放声音
	if( $gameSystem._drill_VIMC_voiceEnabled == false ){ return; }
	
	// > 每帧最多播放一次
	if( $gameTemp._drill_VIMC_canPlayInUpdate != true ){ return; }
	$gameTemp._drill_VIMC_canPlayInUpdate = false;
	
	// > 声音资源
	var voice_id = cur_blockParam['VIMC_voiceId'] -1;
	var se_data = DrillUp.g_VIMC_sound[ voice_id ];
	if( se_data == undefined ){ return; }
	
	
	// > 字数跳跃 - 字数计数
	if( this._drill_VIMC_charCount == undefined ){
		this._drill_VIMC_charCount = 0;
	}
	this._drill_VIMC_charCount += 1;
	
	// > 字数跳跃 - 执行跳跃
	if( this.drill_COWC_isInMessageWindow() ){
		if( $gameSystem._drill_VIMC_dialogMode == "自定义模式" ){
			if( this._drill_VIMC_charCount % $gameSystem._drill_VIMC_dialogCharSkip != 0 ){
				return;
			}
		}
	}else{
		if( this._drill_VIMC_charCount % $gameSystem._drill_VIMC_globalCharSkip != 0 ){
			return;
		}
	}
	
	// > 『绘制过程定义』 - 播放声音（@@@dvc[1]）
	$gameTemp.drill_VIMC_playSE( se_data );
}
//==============================
// * 字符响声 - 播放声音（开放函数）
//==============================
Game_Temp.prototype.drill_VIMC_playSE = function( se_data ){
	var se = {};
	se.name = se_data['name'];
	se.volume = se_data['volume'];
	se.pitch = se_data['pitch'];
	se.pan = se_data['pan'];
	AudioManager.playSe(se);
}
//==============================
// * 字符响声 - 场景基类 帧刷新
//==============================
var _drill_VIMC_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function(){
	_drill_VIMC_update.call(this);
	
	// > 每帧最多播放一次
	if( $gameTemp != undefined ){
		$gameTemp._drill_VIMC_canPlayInUpdate = true;
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_VoiceInMessageCharacter = false;
		var pluginTip = DrillUp.drill_VIMC_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

