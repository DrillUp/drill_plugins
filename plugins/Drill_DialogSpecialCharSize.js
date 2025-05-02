//=============================================================================
// Drill_DialogSpecialCharSize.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        窗口字符 - 字符大小控制器
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogSpecialCharSize +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以修改默认字体大小，包括控制 \{ 和 \} 修改字体大小。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于所有窗口的文本域。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 细节：
 *   (1.缩放符的缩放效果，是根据当前窗口的字体大小而决定的。
 *   (2.对于不支持 窗口字符 的窗口，同样也不支持字体/图标缩放。
 *   (3.注意，字体大小最小为12。低于12的都按12来绘制字体。（html的底层机制）
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符，才能切换字体大小：
 * 
 * 窗口字符：\fs[20]         之后的文本设置字体大小为20。
 * 窗口字符：\{              之后的文本字体大小加大，具体与 字体缩放值 相关。
 * 窗口字符：\}              之后的文本字体大小减小，具体与 字体缩放值 相关。
 * 窗口字符：\fr             全重置字符，重置之后文本所有设置，包括恢复默认字体大小。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 全局默认值
 * 你可以通过插件指令修改默认设置：
 * 
 * 插件指令：>字符大小控制器 : 所有文本 : 修改字体大小 : 20
 * 插件指令：>字符大小控制器 : 所有文本 : 恢复默认大小
 * 
 * 插件指令：>字符大小控制器 : 对话框 : 修改模式 : 自定义模式
 * 插件指令：>字符大小控制器 : 对话框 : 修改模式 : 与所有文本一致
 * 插件指令：>字符大小控制器 : 对话框 : 修改字体大小 : 20
 * 插件指令：>字符大小控制器 : 对话框 : 恢复默认大小
 * 
 * 1.插件指令修改的是全局默认值，设置后永久有效。
 *   新建的所有贴图/窗口，全部使用此设置作为 默认值。
 *   并且 全重置字符\fr 执行重置时，也会重置为 此设置的值。
 *   但注意，窗口字符的优先级 比该指令高，若有窗口字符，优先用窗口字符效果。
 * 2.注意，字体大小最小为12。低于12的都按12来绘制字体。（html的底层机制）
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
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只单次执行控制字符的绘制，几乎没有消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了注释内容。
 * [v1.2]
 * 修改了插件的分类。
 * [v1.3]
 * 大幅度修改了底层，并且兼容了新的底层结构。
 * 
 * 
 * @param ---常规---
 * @desc 
 * 
 * @param 字体缩放值
 * @parent ---常规---
 * @type number
 * @min 1
 * @desc 该值为所有窗口中 \{ 放大、 \} 缩小 字体的像素值。（默认：12，建议：6）
 * @default 6
 * 
 * 
 * @param ---全局默认值---
 * @desc 
 * 
 * @param 所有文本-默认字体大小
 * @parent ---全局默认值---
 * @type number
 * @min 12
 * @desc 所有文本默认的字体大小。游戏默认值为28。
 * @default 28
 * 
 * @param 对话框字体大小模式
 * @parent ---全局默认值---
 * @type select
 * @option 自定义模式
 * @value 自定义模式
 * @option 与所有文本一致
 * @value 与所有文本一致
 * @desc 对话框的模式。
 * @default 与所有文本一致
 * 
 * @param 对话框-字体大小
 * @parent 对话框字体大小模式
 * @type number
 * @min 12
 * @desc 所有文本默认的字体大小。游戏默认值为28。
 * @default 28
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DSCS（Dialog_Special_Char_Size）
//		临时全局变量	DrillUp.g_DSCS_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	对话框管理层
//		★性能测试消耗	1.26ms（所有插件最小值）
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
//				> \{
//				> \}
//			->☆全局默认值
//				->自带参数（继承）
//					> this.fontSize
//			->☆重置控制
//				->全重置字符（继承）
//				x->自定义重置字符
//
//			->☆缩放字体大小
//			->☆管辖权
//			->☆兼容
//				->所有窗口的默认大小
//				->对话框的默认大小
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
	DrillUp.g_DSCS_PluginTip_curName = "Drill_DialogSpecialCharSize.js 窗口字符-字符大小控制器";
	DrillUp.g_DSCS_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DSCS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DSCS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DSCS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DSCS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DSCS_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogSpecialCharSize = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogSpecialCharSize');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DSCS_scale = Number(DrillUp.parameters["字体缩放值"] || 6);
	
	/*-----------------『全局默认值』所有文本（静态数据）------------------*/
	DrillUp.g_DSCS_globalFontSize = Number(DrillUp.parameters["所有文本-默认字体大小"] || 28); 
	
	/*-----------------『全局默认值』对话框（静态数据）------------------*/
	DrillUp.g_DSCS_dialogMode = String(DrillUp.parameters["对话框字体大小模式"] || "与所有文本一致"); 
	DrillUp.g_DSCS_dialogFontSize = Number(DrillUp.parameters["对话框-字体大小"] || 28); 
	
	
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
var _drill_DSCS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DSCS_pluginCommand.call(this, command, args);
	this.drill_DSCS_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DSCS_pluginCommand = function( command, args ){
	if( command === ">字符大小控制器" ){
		
		/*-----------------『全局默认值』所有文本（插件指令）------------------*/
		if( args.length >= 2 ){
			var type = String(args[1]);
			if( type == "所有文本" ){
				if( args.length == 6 ){
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					if( temp1 == "修改字体大小" ){
						$gameSystem._drill_DSCS_globalFontSize = Number(temp2);
					}
				}
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认大小" || temp1 == "恢复默认设置" ){
						$gameSystem._drill_DSCS_globalFontSize = DrillUp.g_DSCS_globalFontSize;
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
					if( temp1 == "修改模式" ){
						$gameSystem._drill_DSCS_dialogMode = temp2;
					}
					if( temp1 == "修改字体大小" ){
						$gameSystem._drill_DSCS_dialogMode = "自定义模式";	//（改了字体大小直接设为自定义模式）
						$gameSystem._drill_DSCS_dialogFontSize = Number(temp2);
					}
				}
				if( args.length == 4 ){
					var temp1 = String(args[3]);
					if( temp1 == "恢复默认大小" || temp1 == "恢复默认设置" ){
						$gameSystem._drill_DSCS_dialogMode = DrillUp.g_DSCS_dialogMode;
						$gameSystem._drill_DSCS_dialogFontSize = DrillUp.g_DSCS_dialogFontSize;
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
DrillUp.g_DSCS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSCS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DSCS_sys_initialize.call(this);
	this.drill_DSCS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSCS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DSCS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DSCS_saveEnabled == true ){	
		$gameSystem.drill_DSCS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DSCS_initSysData();
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
Game_System.prototype.drill_DSCS_initSysData = function() {
	this.drill_DSCS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DSCS_checkSysData = function() {
	this.drill_DSCS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DSCS_initSysData_Private = function() {
	
	// > 『全局默认值』 - 所有文本（存储数据）
	this._drill_DSCS_globalFontSize = DrillUp.g_DSCS_globalFontSize;		//所有文本 - 字体
	
	// > 『全局默认值』 - 对话框（存储数据）
	this._drill_DSCS_dialogMode = DrillUp.g_DSCS_dialogMode;				//对话框 - 模式
	this._drill_DSCS_dialogFontSize = DrillUp.g_DSCS_dialogFontSize;		//对话框 - 字体
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DSCS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DSCS_dialogMode == undefined ){
		this.drill_DSCS_initSysData();
	}
};



//=============================================================================
// ** ☆窗口字符应用之效果字符
//
//			说明：	> 此模块提供 缩放字体大小 窗口字符。注意，不是字体大小，而是 缩放字体大小。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
// （该部分已在 【窗口字符 - 窗口字符核心】 中实现）
// （见 "字体大小（\{）" 和 "字体大小（\}）"）


//=============================================================================
// ** ☆全局默认值
//
//			说明：	> 此处专门窗口相关控制操作。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 全局默认值 - 自带参数（继承）
//
//			说明：	> 由于 Bitmap 中存放了参数 fontSize，所以需要初始化赋值。
//					  核心会使用上述参数，并在函数 drill_COCD_initOptions 中执行绘制配置。
//==============================
var _drill_DSCS_COCD_initBitmapDefault = Bitmap.prototype.drill_COCD_org_initBitmapDefault;
Bitmap.prototype.drill_COCD_org_initBitmapDefault = function(){
	_drill_DSCS_COCD_initBitmapDefault.call(this);
	this.drill_DSCS_initBitmapDefault();
}
//==============================
// * 全局默认值 - 自带参数初始化
//==============================
Bitmap.prototype.drill_DSCS_initBitmapDefault = function(){
	if( $gameSystem == undefined ){ return; }
	
	// > 『全局默认值』 - 使用值 - 所有文本
	var cur_fontSize = $gameSystem._drill_DSCS_globalFontSize;
	
	// > 『全局默认值』 - 使用值 - 对话框
	if( this.drill_COWC_isInMessageWindow() == true ){
		if( $gameSystem._drill_DSCS_dialogMode == "自定义模式" ){
			cur_fontSize = $gameSystem._drill_DSCS_dialogFontSize;
		}
	}
	
	// > 『全局默认值』 - 使用值
	this.fontSize = cur_fontSize;
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
// ** ☆缩放字体大小
//
//			说明：	> 此模块专门管理 缩放字体大小。注意，不是字体大小，而是 缩放字体大小。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 缩放字体大小 - 字体大小变化值（覆写）
//==============================
Game_Temp.prototype.drill_COWC_effect_fontSizeChangedValue = function(){
	return DrillUp.g_DSCS_scale;
}
	
	
//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * A默认属性『窗口字符-字符大小控制器』 - 默认字体大小
//==============================
Window_Base.prototype.standardFontSize = function(){ return 28; };
*/


//=============================================================================
// ** ☆兼容
//
//			说明：	> 该模块专门兼容外部插件。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 兼容 - 所有窗口的默认大小（覆写）
//
//			说明：	> drill插件并不会使用此函数，只作为外部插件兼容用。
//==============================
Window_Base.prototype.standardFontSize = function(){
	if( $gameSystem == undefined ){ return DrillUp.g_DSCS_globalFontSize; }
	return $gameSystem._drill_DSCS_globalFontSize;
};
//==============================
// * 兼容 - 对话框的默认大小（覆写）
//
//			说明：	> drill插件并不会使用此函数，只作为外部插件兼容用。
//==============================
Window_Message.prototype.standardFontSize = function(){
	if( $gameSystem != undefined && 
		$gameSystem._drill_DSCS_dialogMode == "自定义模式" ){
		return $gameSystem._drill_DSCS_dialogFontSize;
	}
	return Window_Base.prototype.standardFontSize.call( this );
};
Window_Gold.prototype.standardFontSize = Window_Message.prototype.standardFontSize;
Window_ChoiceList.prototype.standardFontSize = Window_Message.prototype.standardFontSize;
Window_NumberInput.prototype.standardFontSize = Window_Message.prototype.standardFontSize;
Window_EventItem.prototype.standardFontSize = Window_Message.prototype.standardFontSize;


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogSpecialCharSize = false;
		var pluginTip = DrillUp.drill_DSCS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

