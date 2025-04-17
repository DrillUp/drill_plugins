//=============================================================================
// Drill_DialogFontFace.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        窗口字符 - 字体管理器
 * @author Drill_up
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_DialogFontFace +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件专门对字体进行设置。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 *     需要该核心才能使用窗口字符修改字体。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于窗口的文本。
 * 2.更多详细内容，去看看 "23.窗口字符 > 关于字体管理器.docx"。
 * 细节：
 *   (1.你需要去看文档，来配置fonts文件夹下面的字体。
 *      才能保证字体能正常加载到游戏中并使用。
 *   (2.你也可以填系统自带的"SimHei"黑体，"SimSun"宋体。
 * 预加载：
 *   (1.插件中的资源会被反复使用，所以插件默认所有资源都预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符，才能切换字体：
 * 
 * 窗口字符：\ff[xxx]        之后的文本使用对应的xxx字体。
 * 窗口字符：\fn[xxx]        之后的文本使用对应的xxx字体。
 * 窗口字符：\fr             全重置字符，重置之后文本所有设置，包括恢复默认字体。
 * 
 * 1.窗口字符"\ff"和"\fn"是一样的，都能修改字体，"xxx"为字体名称。
 *   即你在 fonts文件夹下 gamefont.css文件中 自定义的英文名。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 全局默认值
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>字体管理器 : 所有文本 : 修改字体 : 字体[GameFont]
 * 插件指令：>字体管理器 : 所有文本 : 恢复默认字体
 * 
 * 插件指令：>字体管理器 : 对话框 : 修改模式 : 自定义模式
 * 插件指令：>字体管理器 : 对话框 : 修改模式 : 与所有文本一致
 * 插件指令：>字体管理器 : 对话框 : 修改字体 : 字体[GameFont]
 * 插件指令：>字体管理器 : 对话框 : 恢复默认字体
 * 
 * 1.插件指令修改的是全局默认值，设置后永久有效。
 *   新建的所有贴图/窗口，全部使用此设置作为 默认值。
 *   并且 全重置字符\fr 执行重置时，也会重置为 此设置的值。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
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
 * 时间复杂度： o(n)
 * 测试方法：   去各个界面进行性能测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *              战斗界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只改变字体格式，并不产生多少消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件的分类。优化了内部结构。
 * [v1.2]
 * 区分了所有文本和对话框的字体设置。
 * [v1.3]
 * 大幅度修改了底层，并且兼容了新的底层结构。
 * 
 * 
 * 
 * @param ---常规---
 * @desc 
 * 
 * @param 预加载的字体名
 * @parent ---常规---
 * @type text[]
 * @desc 将fonts文件夹中gamefont.css文件里配置的字体名称，添加到这里，即可预加载字体。
 * @default ["GameFont"]
 * 
 * 
 * @param ---全局默认值---
 * @desc 
 * 
 * @param 所有文本-默认字体类型
 * @parent ---全局默认值---
 * @desc 所有文本默认的字体类型。默认可填"GameFont"，你也可以填系统自带的"SimHei"黑体，"SimSun"宋体。
 * @default GameFont
 * 
 * @param 对话框字体模式
 * @parent ---全局默认值---
 * @type select
 * @option 自定义模式
 * @value 自定义模式
 * @option 与所有文本一致
 * @value 与所有文本一致
 * @desc 对话框的模式。
 * @default 与所有文本一致
 * 
 * @param 对话框-字体类型
 * @parent 对话框字体模式
 * @desc 对话框模式为"自定义模式"时生效。对话框的字体类型。默认可填"GameFont"，你也可以填系统自带的"SimHei"黑体，"SimSun"宋体。
 * @default GameFont
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DFF（Dialog_Font_Face）
//		临时全局变量	DrillUp.g_DFF_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Window_Base.prototype.standardFontFace
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	随意跑一圈
//		★性能测试消耗	2024/5/10：
//							》未找到，消耗太小。
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
//				> \FF[GameFont]
//				> \FN[GameFont]
//			->☆全局默认值
//				->自带参数（继承）
//					> this.fontFace
//			->☆重置控制
//				->全重置字符（继承）
//				x->自定义重置字符
//			
//			->☆预加载（字体）
//			->☆管辖权
//			->☆兼容
//				->所有窗口的默认字体
//				->对话框的默认字体
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			1.系统 > 关于字符绘制核心（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.该插件单独控制字体，其他的插件注意避开对字体的控制情况。
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
	DrillUp.g_DFF_PluginTip_curName = "Drill_DialogFontFace.js 窗口字符-字体管理器";
	DrillUp.g_DFF_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DFF_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DFF_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DFF_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DFF_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DFF_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 兼容冲突
	//==============================
	DrillUp.drill_DFF_getPluginTip_CompatibilityYEP = function(){
		return "【" + DrillUp.g_DFF_PluginTip_curName + "】\n"+
				"检测到你开启了 YEP_MessageCore插件。\n"+
				"请及时关闭该插件，该插件与 窗口字符核心 存在兼容冲突。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogFontFace = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogFontFace');
	
	
	/*-----------------杂项------------------*/
	if( DrillUp.parameters["预加载的字体名"] != undefined && 
		DrillUp.parameters["预加载的字体名"] != "" ){
		DrillUp.g_DFF_preload = JSON.parse( DrillUp.parameters["预加载的字体名"] );
	}else{
		DrillUp.g_DFF_preload = [];
	}
	
	/*-----------------『全局默认值』所有文本（静态数据）------------------*/
	DrillUp.g_DFF_globalFontFace = String(DrillUp.parameters["所有文本-默认字体类型"] || "GameFont"); 
	
	/*-----------------『全局默认值』对话框（静态数据）------------------*/
	DrillUp.g_DFF_dialogMode = String(DrillUp.parameters["对话框字体模式"] || "与所有文本一致"); 
	DrillUp.g_DFF_dialogFontFace = String(DrillUp.parameters["对话框-字体类型"] || "GameFont"); 



//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//==============================
// * 基于插件检测 - 启动时检测兼容性
//==============================
var _drill_DFF_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_DFF_scene_initialize.call(this);
	
	if( Imported.YEP_MessageCore ){
		alert( DrillUp.drill_DFF_getPluginTip_CompatibilityYEP() );
	}
};
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DFF_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DFF_pluginCommand.call(this, command, args);
	this.drill_DFF_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DFF_pluginCommand = function( command, args ){
	if( command === ">字体管理器" ){
		
		/*-----------------『全局默认值』所有文本（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "所有文本" ){
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("字体[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "修改字体" ){
						$gameSystem._drill_DFF_globalFontFace = temp2;
					}
				}
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认字体" || temp1 == "恢复默认设置" ){
						$gameSystem._drill_DFF_globalFontFace = DrillUp.g_DFF_globalFontFace;
					}
				}
			}
		}
		
		/*-----------------『全局默认值』对话框（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "对话框" ){
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					temp2 = temp2.replace("字体[","");
					temp2 = temp2.replace("]","");
					if( temp1 == "修改模式" ){
						$gameSystem._drill_DFF_dialogMode = temp2;
					}
					if( temp1 == "修改字体" ){
						$gameSystem._drill_DFF_dialogFontFace = temp2;
					}
				}
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认字体" || temp1 == "恢复默认设置" ){
						$gameSystem._drill_DFF_dialogFontFace = DrillUp.g_DFF_dialogFontFace;
					}
				}
			}
		}
	}
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DFF_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DFF_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DFF_sys_initialize.call(this);
	this.drill_DFF_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DFF_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DFF_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DFF_saveEnabled == true ){	
		$gameSystem.drill_DFF_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DFF_initSysData();
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
Game_System.prototype.drill_DFF_initSysData = function() {
	this.drill_DFF_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DFF_checkSysData = function() {
	this.drill_DFF_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DFF_initSysData_Private = function() {
	
	// > 『全局默认值』 - 所有文本（存储数据）
	this._drill_DFF_globalFontFace = DrillUp.g_DFF_globalFontFace;		//所有文本 - 字体
	
	// > 『全局默认值』 - 对话框（存储数据）
	this._drill_DFF_dialogMode = DrillUp.g_DFF_dialogMode;				//对话框 - 模式
	this._drill_DFF_dialogFontFace = DrillUp.g_DFF_dialogFontFace;		//对话框 - 字体
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DFF_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DFF_dialogMode == undefined ){
		this.drill_DFF_initSysData();
	}
};
	
	
	
//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 组合符配置（继承）
//==============================
var _drill_COWC_DFF_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_DFF_effect_processCombined.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』 - 字体名称（\FF[GameFont]、\FN[GameFont]）
	if( command.toUpperCase() == "FF" || 
		command.toUpperCase() == "FN" ){	//（\ff、\FF、\fn、\FN 都可以）
		if( args.length == 1 ){
			this.drill_COWC_effect_submitCombined( "@@@-ff[" + String(args[0]) + "]" );
		}
	}
}
	
	
//=============================================================================
// ** ☆全局默认值
//
//			说明：	> 此处专门窗口相关控制操作。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 全局默认值 - 自带参数（继承）
//
//			说明：	> 由于 Bitmap 中存放了参数 fontFace，所以需要初始化赋值。
//					  核心会使用上述参数，并在函数 drill_COCD_initOptions 中执行绘制配置。
//==============================
var _drill_DFF_COCD_initBitmapDefault = Bitmap.prototype.drill_COCD_org_initBitmapDefault;
Bitmap.prototype.drill_COCD_org_initBitmapDefault = function(){
	_drill_DFF_COCD_initBitmapDefault.call(this);
	this.drill_DFF_initBitmapDefault();
}
//==============================
// * 全局默认值 - 自带参数初始化
//==============================
Bitmap.prototype.drill_DFF_initBitmapDefault = function(){
	if( $gameSystem == undefined ){ return; }
	
	// > 『全局默认值』 - 使用值 - 所有文本
	var cur_fontFace = $gameSystem._drill_DFF_globalFontFace;
	
	// > 『全局默认值』 - 使用值 - 对话框
	if( this.drill_COWC_isInMessageWindow() == true ){
		if( $gameSystem._drill_DFF_dialogMode == "自定义模式" ){
			cur_fontFace = $gameSystem._drill_DFF_dialogFontFace;
		}
	}
	
	// > 『全局默认值』 - 使用值
	this.fontFace = cur_fontFace;
};


//=============================================================================
// ** ☆重置控制
//
//			说明：	> 此处兼容 重置 功能，包括 全重置字符 的效果。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 重置控制 - 全重置字符（继承）
//==============================
// （不需要继承，因为 drill_COCD_textBlock_fontReset 中已经实现了赋值fr_xxx）
//==============================
// * 重置控制 - 全重置字符 - 执行
//==============================
// （不实现）
//==============================
// * 重置控制 - 样式阶段-配置阶段
//==============================
// （没有 自定义重置字符）
	
	
	
//=============================================================================
// ** ☆预加载（字体）
//
//			说明：	> 此处专门执行字体的预加载。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 执行字体预加载
//
//			说明：	> 函数 _createFontLoader 本质上是创建一个div对象，然后绑定字体样式。
//					  由于绑定的样式需要显示，所以字体才会被加载进来。
//==============================
var _drill_DFF__createGameFontLoader = Graphics._createGameFontLoader;
Graphics._createGameFontLoader = function(){
	_drill_DFF__createGameFontLoader.call( this );
	for(var i = 0; i < DrillUp.g_DFF_preload.length; i++ ){
		var font_name = DrillUp.g_DFF_preload[i];
		if( font_name == "GameFont" ){ continue; }
		this._createFontLoader( font_name );
	}
}


//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * A默认属性『窗口字符-字体管理器』 - 默认字体类型
//
//			功能：	> 该函数会根据语言配置自动切换字体，但实际上并没有明显的效果。
//					> 语言功能比较鸡肋，可有可无。
//==============================
Window_Base.prototype.standardFontFace = function(){
    if( $gameSystem.isChinese() ){
        return 'SimHei, Heiti TC, sans-serif';
    }else if( $gameSystem.isKorean() ){
        return 'Dotum, AppleGothic, sans-serif';
    }else{
        return 'GameFont';
    }
};
*/


//=============================================================================
// ** ☆兼容
//
//			说明：	> 该模块专门兼容外部插件。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 兼容 - 所有窗口的默认字体（覆写）
//
//			说明：	> drill插件并不会使用此函数，只作为外部插件兼容用。
//==============================
Window_Base.prototype.standardFontFace = function(){
	if( $gameSystem == undefined ){ return DrillUp.g_DFF_globalFontFace; }
	return $gameSystem._drill_DFF_globalFontFace;
};
//==============================
// * 兼容 - 对话框的默认字体（覆写）
//
//			说明：	> drill插件并不会使用此函数，只作为外部插件兼容用。
//==============================
Window_Message.prototype.standardFontFace = function(){
	if( $gameSystem != undefined && 
		$gameSystem._drill_DFF_dialogMode == "自定义模式" ){
		return $gameSystem._drill_DFF_dialogFontFace;
	}
	return Window_Base.prototype.standardFontFace.call( this );
};
Window_Gold.prototype.standardFontFace = Window_Message.prototype.standardFontFace;
Window_ChoiceList.prototype.standardFontFace = Window_Message.prototype.standardFontFace;
Window_NumberInput.prototype.standardFontFace = Window_Message.prototype.standardFontFace;
Window_EventItem.prototype.standardFontFace = Window_Message.prototype.standardFontFace;


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogFontFace = false;
		var pluginTip = DrillUp.drill_DFF_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


