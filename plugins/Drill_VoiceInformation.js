//=============================================================================
// Drill_VoiceInformation.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        声音 - 声音数据获取器
 * @author Drill_up
 * 
 * @Drill_LE_param "声音-%d"
 * @Drill_LE_parentKey "---声音组%d至%d---"
 * @Drill_LE_var "DrillUp.g_VI_sound_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_VoiceInformation +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以获取声音数据并赋值给变量。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于声音文件。
 * 细节：
 *   (1.由于该插件无法控制正在播放的音乐，因此只能获取到声音总时长数据。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以需要通过插件指令获取数据：
 * 
 * 插件指令：>声音数据获取器 : 文件夹[bgm] : 文件名[Battle1] : 加载资源并等待
 * 插件指令：>声音数据获取器 : 文件夹[bgm] : 文件名[Battle1] : 获取-声音总时长(帧) : 变量[21]
 * 插件指令：>声音数据获取器 : 文件夹[bgs] : 文件名[Clock] : 加载资源并等待
 * 插件指令：>声音数据获取器 : 文件夹[bgs] : 文件名[Clock] : 获取-声音总时长(帧) : 变量[21]
 * 插件指令：>声音数据获取器 : 文件夹[me] : 文件名[Inn] : 加载资源并等待
 * 插件指令：>声音数据获取器 : 文件夹[me] : 文件名[Inn] : 获取-声音总时长(帧) : 变量[21]
 * 插件指令：>声音数据获取器 : 文件夹[se] : 文件名[Buzzer1] : 加载资源并等待
 * 插件指令：>声音数据获取器 : 文件夹[se] : 文件名[Buzzer1] : 获取-声音总时长(帧) : 变量[21]
 * 
 * 1.必须先加载资源，才能获取到变量。
 *   如果没有指定的声音文件，则插件指令没有任何效果。
 * 2.文件夹和文件名必须在游戏工程的"audio/"路径下，否则找不到文件。
 *   文件夹名称区分大小写。
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
 * 2.插件只单次执行指令，消耗可以忽略不计。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		VI（Voice_Information）
//		临时全局变量	无
//		临时局部变量	this._drill_VI_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	
//		★性能测试消耗	
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
//			
//			->☆声音加载容器
//			->☆等待控制
//			
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
//			暂无
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
	DrillUp.g_VI_PluginTip_curName = "Drill_VoiceInformation.js 声音-声音数据获取器";
	DrillUp.g_VI_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_VoiceInformation = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_VoiceInformation');
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_VI_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_VI_pluginCommand.call(this, command, args);
	this.drill_VI_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_VI_pluginCommand = function( command, args ){
	if( command === ">声音数据获取器" ){
		
		/*-----------------加载资源并等待------------------*/
		if(args.length == 6){
			var audio_folder = String(args[1]);
			var audio_name = String(args[3]);
			var type = String(args[5]);
			if( audio_name.indexOf("文件名[") != -1 ){
				audio_folder = audio_folder.replace("文件夹[","");
				audio_folder = audio_folder.replace("]","");
				audio_name = audio_name.replace("文件名[","");
				audio_name = audio_name.replace(/\]$/,"");	//（去掉末尾的]）
				
				if( type == "加载资源并等待" ){
					$gameTemp.drill_VI_pushAudio( audio_folder, audio_name );
					
					// > 执行等待
					this._drill_VI_waitFolder = audio_folder;
					this._drill_VI_waitName = audio_name;
					this.setWaitMode("_drill_VI_waitLoading");		//『强制等待』
				}
			}
		}
		
		/*-----------------获取信息------------------*/
		if(args.length == 8){
			var audio_folder = String(args[1]);
			var audio_name = String(args[3]);
			var type = String(args[5]);
			var temp2 = String(args[7]);
			if( audio_name.indexOf("文件名[") != -1 ){
				audio_folder = audio_folder.replace("文件夹[","");
				audio_folder = audio_folder.replace("]","");
				audio_name = audio_name.replace("文件名[","");
				audio_name = audio_name.replace(/\]$/,"");	//（去掉末尾的]）
				
				if( type == "获取-声音总时长(帧)" ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					
					var audio = $gameTemp.drill_VI_getAudio( audio_folder, audio_name );
					if( audio == null ){ return; }
					$gameVariables.setValue( temp2, Math.floor( audio._totalTime*60 ) ); 
				}
			}
		}
		
	}
};


//=============================================================================
// ** ☆声音加载容器
//
//			说明：	> 此模块专门定义 声音加载容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 声音加载容器 - 初始化
//==============================
var _drill_VI_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_VI_temp_initialize.call(this);
	this._drill_VI_audioTank = {};				//声音加载容器
	this._drill_VI_audioTank["bgm"] = {};
	this._drill_VI_audioTank["bgs"] = {};
	this._drill_VI_audioTank["me"] = {};
	this._drill_VI_audioTank["se"] = {};
};
//==============================
// * 声音加载容器 - 加入容器（开放函数）
//
//			说明：	> folder必须小写（bgm/bgs/me/se）。
//==============================
Game_Temp.prototype.drill_VI_pushAudio = function( folder, audio_name ){	
	var buffer = AudioManager.createBuffer( folder, audio_name );
	this._drill_VI_audioTank[ folder ][ audio_name ] = buffer;
};
//==============================
// * 声音加载容器 - 是否有对象（开放函数）
//==============================
Game_Temp.prototype.drill_VI_hasAudio = function( folder, audio_name ){	
	var buffer = this._drill_VI_audioTank[ folder ][ audio_name ];
	if( buffer == undefined ){ return false; }
	return true;
};

//==============================
// * 声音加载容器 - 获取已加载对象（开放函数）
//
//			说明：	> 若未加载则返回null。
//==============================
Game_Temp.prototype.drill_VI_getAudio = function( folder, audio_name ){	
	if( this.drill_VI_isAudioLoaded( folder, audio_name ) == false ){ return null; }
	return this._drill_VI_audioTank[ folder ][ audio_name ];
};
//==============================
// * 声音加载容器 - 是否加载完成（开放函数）
//==============================
Game_Temp.prototype.drill_VI_isAudioLoaded = function( folder, audio_name ){	
	var buffer = this._drill_VI_audioTank[ folder ][ audio_name ];
	if( buffer == undefined ){ return false; }
	
	// > 出现标记时则表示加载完成
	if( buffer._drill_VI_isLoaded == true ){
		return true;
	}else{
		return false;
	}
};
//==============================
// * 声音加载容器 - 完成加载时
//
//			说明：	> 此函数在声音加载完成时会调用一次。
//==============================
var _drill_VI__onLoad = WebAudio.prototype._onLoad;
WebAudio.prototype._onLoad = function(){
	_drill_VI__onLoad.call(this);
	this._drill_VI_isLoaded = true;
};


//=============================================================================
// ** ☆等待控制
//
//			说明：	> 此模块专门定义 等待类型。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 等待控制 - 自定义等待类型
//==============================
var _drill_VI_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function(){
	
	// > 等待类型
	if( this._waitMode == "_drill_VI_waitLoading" ){		//『强制等待』有资源名称且未加载完成，则持续等待
		if( this._drill_VI_waitFolder != undefined &&
			this._drill_VI_waitFolder != "" &&
			this._drill_VI_waitName != undefined &&
			this._drill_VI_waitName != "" &&
			$gameTemp.drill_VI_isAudioLoaded( this._drill_VI_waitFolder, this._drill_VI_waitName ) == false ){
			return true;	//（返回true表示要等待）
		}
	}
	
	// > 原函数
	return _drill_VI_updateWaitMode.call(this);
};


