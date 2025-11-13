//=============================================================================
// Drill_DialogNameBox.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        对话框 - 姓名框窗口
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogNameBox +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以使用窗口字符，在对话框旁边显示姓名框窗口。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfDialog           对话框-对话框优化核心
 * 可被扩展：
 *   - Drill_DialogSkin             对话框-对话框皮肤
 *     对话框皮肤能够对 本插件的姓名框 进行皮肤装饰。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只对对话框窗口有效。
 * 2.了解对话框关系，可以去看看 "15.对话框 > 关于对话框优化核心.docx"。
 * 3.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 细节：
 *   (1.姓名框"\dDNB[]"或"\n<>"的结构中，可以嵌套其它 窗口字符 。
 *   (2.姓名框窗口关闭的速度比 对话框 要慢。
 *      如果这时候你快速进入商店页面，那么商店页面可能会提前把地图界面
 *      进行截图然后模糊，这样对话框就被截进去了。
 *      如果你不想让姓名框在 商店页面 看到，进入商店前等20帧即可。
 * 设计：
 *   (1.虽然名称叫姓名框，但是该窗口的长度并没有限制。
 *      你可以将其当做的一行某些内容的注释帮助信息。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来显示姓名框：
 * 
 * 窗口字符：\dDNB[姓名框内容]            对话框中，打开姓名框并显示内容，姓名框位置左对齐
 * 窗口字符：\dDNB[姓名框内容:左对齐]     对话框中，打开姓名框并显示内容，姓名框位置左对齐
 * 窗口字符：\dDNB[姓名框内容:居中]       对话框中，打开姓名框并显示内容，姓名框位置居中
 * 窗口字符：\dDNB[姓名框内容:右对齐]     对话框中，打开姓名框并显示内容，姓名框位置右对齐
 * 
 * 窗口字符：\n<姓名框内容>            对话框中，打开姓名框并显示内容，姓名框位置左对齐
 * 窗口字符：\nl<姓名框内容>           对话框中，打开姓名框并显示内容，姓名框位置左对齐
 * 窗口字符：\nc<姓名框内容>           对话框中，打开姓名框并显示内容，姓名框位置居中
 * 窗口字符：\nr<姓名框内容>           对话框中，打开姓名框并显示内容，姓名框位置右对齐
 * 
 * 1. "\dDNB[姓名框内容]" 可以嵌套其它窗口字符，比如 "\dDNB[\c[6]姓名\c[0]]" 。
 *    "\n<姓名框内容>" 是旧版本的窗口字符设置，也能用。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改参数
 * 你需要通过下面插件指令来修改：
 * 
 * 插件指令：>姓名框窗口 : 修改横向收拢偏移量 : 偏移[10]
 * 插件指令：>姓名框窗口 : 修改横向收拢偏移量 : 偏移变量[25]
 * 插件指令：>姓名框窗口 : 修改横向收拢偏移量 : 默认值
 * 插件指令：>姓名框窗口 : 修改纵向收拢偏移量 : 偏移[10]
 * 插件指令：>姓名框窗口 : 修改纵向收拢偏移量 : 偏移变量[25]
 * 插件指令：>姓名框窗口 : 修改纵向收拢偏移量 : 默认值
 * 
 * 插件指令：>姓名框窗口 : 修改前缀 : 文本[\c[6]]
 * 插件指令：>姓名框窗口 : 修改前缀 : 默认值
 * 插件指令：>姓名框窗口 : 修改后缀 : 文本[\c[0]]
 * 插件指令：>姓名框窗口 : 修改后缀 : 默认值
 * 
 * 1.修改后永久有效。
 *   横向收拢偏移量：左对齐时，正右负左；右对齐时，正左负右；居中时，不偏移。
 *   纵向收拢偏移量：姓名框在对话框下方时，正上负下；姓名框在对话框上方时，正下负上。
 * 2.对话框皮肤插件中，
 *   在指定样式下有参数能自定义 收拢偏移量、前缀后缀，可以不通过此修改来实现收拢。
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
 * 测试方法：   在对话框管理层和战斗界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只在对话框显示时，才会显示姓名框窗口，其他时间不工作。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了姓名框能遮挡对话框的bug。
 * [v1.2]
 * 更新并兼容了新的窗口字符底层。
 * [v1.3]
 * 修复了姓名框的边框有时缝合不了的bug。
 * [v1.4]
 * 添加了插件指令修改 收拢偏移量、前缀后缀。
 * 修复了姓名框修改样式后一直显示的bug。
 * 
 * 
 * 
 * @param ---姓名框窗口---
 * @desc 
 * 
 * @param 姓名框-横向收拢偏移量
 * @parent ---姓名框窗口---
 * @desc 横向收拢偏移量。左对齐时，正右负左；右对齐时，正左负右；居中时，不偏移。
 * @default 0
 * 
 * @param 姓名框-纵向收拢偏移量
 * @parent ---姓名框窗口---
 * @desc 纵向收拢偏移量。姓名框在对话框下方时，正上负下；姓名框在对话框上方时，正下负上。
 * @default 0
 * 
 * @param 姓名框-额外前缀
 * @parent ---姓名框窗口---
 * @desc 姓名框文本基础上额外的添加的前缀文本。
 * @default \c[6]
 * 
 * @param 姓名框-额外后缀
 * @parent ---姓名框窗口---
 * @desc 姓名框文本基础上额外的添加的后缀文本。
 * @default \c[0]
 * 
 * @param 姓名框-内边距
 * @parent ---姓名框窗口---
 * @type number
 * @min 0
 * @desc 姓名框的内边距。
 * @default 18
 * 
 * @param 姓名框-字体大小
 * @parent ---姓名框窗口---
 * @type number
 * @min 4
 * @desc 姓名框的默认字体大小。
 * @default 28
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DNB（Dialog_Name_Box）
//		临时全局变量	DrillUp.g_DNB_xxx
//		临时局部变量	this._drill_DNB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	对话框管理层
//		★性能测试消耗	2025/7/27：
//							》0.9ms（drill_resetData_Message）4.5ms（drill_updateAttr）48.5ms（Drill_DNB_NameBoxWindow.update）
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
//			->☆窗口字符应用之消息输入字符
//			
//			->☆姓名框展开控制
//			->姓名窗口【Drill_DNB_NameBoxWindow】
//				->2A主体
//				->2B展开控制
//				->2C窗口内容
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 姓名窗口【Drill_DNB_NameBoxWindow】
//		
//		★必要注意事项：
//			1.注意其他插件对 该插件 的支持情况，交错的部分有点多。
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
	DrillUp.g_DNB_PluginTip_curName = "Drill_DialogNameBox.js 对话框-姓名框窗口";
	DrillUp.g_DNB_PluginTip_baseList = ["Drill_CoreOfDialog.js 对话框-对话框优化核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DNB_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DNB_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DNB_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DNB_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DNB_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 兼容冲突（目前窗口字符核心已不再冲突）
	//==============================
	DrillUp.drill_DNB_getPluginTip_CompatibilityYEP = function(){
		return  "【" + DrillUp.g_DNB_PluginTip_curName + "】\n"+
				"检测到你开启了 YEP_MessageCore插件。\n"+
				"请及时关闭该插件，该插件与 对话框优化核心 存在兼容冲突。";
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_DNB_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_DNB_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	//==============================
	// * 提示信息 - 报错 - 漏洞函数警告
	//==============================
	DrillUp.drill_DNB_getPluginTip_TransformBugWarning = function(){
		return "【" + DrillUp.g_DNB_PluginTip_curName + "】\n注意，检测到函数Yanfly.Core.Sprite_updateTransform，该函数会破坏pixi渲染底层，从而引入像素抖动问题。\n目前已知危害到了镜头插件、对话框插件。\n去看看文档 \"0.问题解答集合（FAQ） > Rmmv中的罕见问题.docx\" 的章节 \"偶尔1像素缝隙抖动问题\" 来解决。";
	};
	//==============================
	// * 提示信息 - 报错 - 漏洞函数警告 - 检测『非整数坐标抖动问题』
	//==============================
	if( typeof(Yanfly) != "undefined" && 
		Yanfly.Core != undefined && 
		Yanfly.Core.Sprite_updateTransform != undefined ){
		alert( DrillUp.drill_DNB_getPluginTip_TransformBugWarning() );
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogNameBox = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogNameBox');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DNB_nameBox_closingX = Number(DrillUp.parameters["姓名框-横向收拢偏移量"] || 0); 
	DrillUp.g_DNB_nameBox_closingY = Number(DrillUp.parameters["姓名框-纵向收拢偏移量"] || 0); 
	DrillUp.g_DNB_nameBox_prefix = String(DrillUp.parameters["姓名框-额外前缀"] || ""); 
	DrillUp.g_DNB_nameBox_suffix = String(DrillUp.parameters["姓名框-额外后缀"] || ""); 
	DrillUp.g_DNB_nameBox_padding = Number(DrillUp.parameters["姓名框-内边距"] || 18); 
	DrillUp.g_DNB_nameBox_fontSize = Number(DrillUp.parameters["姓名框-字体大小"] || 28); 
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfDialog ){



//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DNB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DNB_pluginCommand.call(this, command, args);
	this.drill_DNB_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DNB_pluginCommand = function( command, args ){
	if( command === ">姓名框窗口" ){
		
		/*-----------------收拢偏移量------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改横向收拢偏移量" ){
				if( temp1 == "默认值" ){
					$gameSystem._drill_DNB_closingX = DrillUp.g_DNB_nameBox_closingX;
				}else if( temp1.indexOf("偏移变量[") != -1 ){
					temp1 = temp1.replace("偏移变量[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DNB_closingX = $gameVariables.value( Number(temp1) );
				}else if( temp1.indexOf("偏移[") != -1 ){
					temp1 = temp1.replace("偏移[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DNB_closingX = Number(temp1);
				}
			}
			if( type == "修改纵向收拢偏移量" ){
				if( temp1 == "默认值" ){
					$gameSystem._drill_DNB_closingY = DrillUp.g_DNB_nameBox_closingY;
				}else if( temp1.indexOf("偏移变量[") != -1 ){
					temp1 = temp1.replace("偏移变量[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DNB_closingY = $gameVariables.value( Number(temp1) );
				}else if( temp1.indexOf("偏移[") != -1 ){
					temp1 = temp1.replace("偏移[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DNB_closingY = Number(temp1);
				}
			}
		}
		
		/*-----------------前缀后缀------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改前缀" ){
				if( temp1 == "默认值" ){
					$gameSystem._drill_DNB_prefix = DrillUp.g_DNB_nameBox_prefix;
				}else{
					temp1 = temp1.replace("文本[","");
					temp1 = temp1.replace(/\]$/,"");	//（去掉末尾的]）
					$gameSystem._drill_DNB_prefix = String(temp1);
				}
			}
			if( type == "修改后缀" ){
				if( temp1 == "默认值" ){
					$gameSystem._drill_DNB_suffix = DrillUp.g_DNB_nameBox_suffix;
				}else{
					temp1 = temp1.replace("文本[","");
					temp1 = temp1.replace(/\]$/,"");	//（去掉末尾的]）
					$gameSystem._drill_DNB_suffix = String(temp1);
				}
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
DrillUp.g_DNB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DNB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DNB_sys_initialize.call(this);
	this.drill_DNB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DNB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DNB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DNB_saveEnabled == true ){	
		$gameSystem.drill_DNB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DNB_initSysData();
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
Game_System.prototype.drill_DNB_initSysData = function() {
	this.drill_DNB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DNB_checkSysData = function() {
	this.drill_DNB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DNB_initSysData_Private = function() {
	
	this._drill_DNB_closingX = DrillUp.g_DNB_nameBox_closingX;		//横向收拢偏移量
	this._drill_DNB_closingY = DrillUp.g_DNB_nameBox_closingY;		//纵向收拢偏移量
	this._drill_DNB_prefix = DrillUp.g_DNB_nameBox_prefix;			//额外前缀
	this._drill_DNB_suffix = DrillUp.g_DNB_nameBox_suffix;			//额外后缀
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DNB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DNB_prefix == undefined ){
		this.drill_DNB_initSysData();
	}
};

//==============================
// * 存储数据 - 获取 横向收拢偏移量（可继承）
//==============================
Game_System.prototype.drill_DNB_getClosingX = function(){
	return this._drill_DNB_closingX;
};
//==============================
// * 存储数据 - 获取 纵向收拢偏移量（可继承）
//==============================
Game_System.prototype.drill_DNB_getClosingY = function(){
	return this._drill_DNB_closingY;
};
//==============================
// * 存储数据 - 获取 额外前缀（可继承）
//==============================
Game_System.prototype.drill_DNB_getPrefix = function(){
	return this._drill_DNB_prefix;
};
//==============================
// * 存储数据 - 获取 额外后缀（可继承）
//==============================
Game_System.prototype.drill_DNB_getSuffix = function(){
	return this._drill_DNB_suffix;
};


//=============================================================================
// ** ☆窗口字符应用之消息输入字符
//=============================================================================
//==============================
// * 窗口字符应用之消息输入字符 - 窗口字符 - 组合符配置
//==============================
var _drill_DNB_COWC_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_DNB_COWC_effect_processCombined.call( this, matched_index, matched_str, command, args );
	
	if( command == "dDNB" ){
		
		// > 『窗口字符定义』 - 打开姓名框（\dDNB[姓名框内容]）
		//		（不通过底层字符，直接从$gameTemp控制对话框，因为姓名框不需要依靠 窗口字符 实时变化）
		if( args.length == 1 ){
			$gameTemp._drill_DNB_text = String(args[0]);
			$gameTemp._drill_DNB_type = "";
			this.drill_COWC_effect_submitCombined( "" );
		}
		
		// > 『窗口字符定义』 - 打开姓名框（\dDNB[姓名框内容:左对齐]）
		//		（不通过底层字符，直接从$gameTemp控制对话框，因为姓名框不需要依靠 窗口字符 实时变化）
		if( args.length == 2 ){
			var text = String(args[0]);
			var type = String(args[1]);
			if( type == "左对齐" || type == "居中" || type == "右对齐" ){
				$gameTemp._drill_DNB_text = text;
				$gameTemp._drill_DNB_type = type;
			}
			this.drill_COWC_effect_submitCombined( "" );
		}
	}
}
//==============================
// * 窗口字符应用之消息输入字符 - 窗口字符（表达式） - 字符转换
//==============================
var _drill_DNB_COWC_expression_process = Game_Temp.prototype.drill_COWC_expression_process;
Game_Temp.prototype.drill_COWC_expression_process = function( matched_index, matched_str, command, args ){
	_drill_DNB_COWC_expression_process.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』 - 打开姓名框（\N<姓名框内容>）
	var last_allText = this._drill_COWC_expression_curAllText;	//（后台参数）
	if( last_allText.substring( last_allText.length-2,last_allText.length ).toUpperCase() == "\\N" ){	//（倒切）
		this._drill_COWC_expression_removeCharNum = 2;			//（后台参数）
		$gameTemp._drill_DNB_text = matched_str.substring( 1,matched_str.length-1 );
		$gameTemp._drill_DNB_type = "";
		this.drill_COWC_expression_submit( "" );
	}
	// > 『窗口字符定义』 - 打开姓名框（\NL<姓名框内容>）
	if( last_allText.substring( last_allText.length-3,last_allText.length ).toUpperCase() == "\\NL" ){	//（倒切）
		this._drill_COWC_expression_removeCharNum = 3;			//（后台参数）
		$gameTemp._drill_DNB_text = matched_str.substring( 1,matched_str.length-1 );
		$gameTemp._drill_DNB_type = "左对齐";
		this.drill_COWC_expression_submit( "" );
	}
	// > 『窗口字符定义』 - 打开姓名框（\NC<姓名框内容>）
	if( last_allText.substring( last_allText.length-3,last_allText.length ).toUpperCase() == "\\NC" ){	//（倒切）
		this._drill_COWC_expression_removeCharNum = 3;			//（后台参数）
		$gameTemp._drill_DNB_text = matched_str.substring( 1,matched_str.length-1 );
		$gameTemp._drill_DNB_type = "居中";
		this.drill_COWC_expression_submit( "" );
	}
	// > 『窗口字符定义』 - 打开姓名框（\NR<姓名框内容>）
	if( last_allText.substring( last_allText.length-3,last_allText.length ).toUpperCase() == "\\NR" ){	//（倒切）
		this._drill_COWC_expression_removeCharNum = 3;			//（后台参数）
		$gameTemp._drill_DNB_text = matched_str.substring( 1,matched_str.length-1 );
		$gameTemp._drill_DNB_type = "右对齐";
		this.drill_COWC_expression_submit( "" );
	}
};



//=============================================================================
// ** ☆姓名框展开控制
//
//			说明：	> 此模块专门控制 姓名框。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 姓名框展开控制 - 对话框 创建子窗口
//==============================
var _drill_DNB_msg_createSubWindows = Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
	_drill_DNB_msg_createSubWindows.call(this);
	
	// > 创建姓名框
	this._drill_DNB_nameWindow = new Drill_DNB_NameBoxWindow( this );
    
	// > 添加到层级（强行用addChild，因为addWindow会出现窗口相互遮挡问题）
	var scene = SceneManager._scene;
    scene.addChild(this._drill_DNB_nameWindow);
};
//==============================
// * 姓名框展开控制 - 对话框 获取子窗口
//
//			说明：	> 该函数被父场景调用并自动addWindow，所以此函数不需要。
//==============================
//var _drill_DNB_msg_subWindows = Window_Message.prototype.subWindows;
//Window_Message.prototype.subWindows = function(){
//	var window_list = _drill_DNB_msg_subWindows.call(this);
//	window_list.push( this._drill_DNB_nameWindow );
//	return window_list;
//};
//==============================
// * 姓名框展开控制 - 对话框 执行新建页时
//==============================
var _drill_DNB_CODi_message_doStart = Window_Message.prototype.drill_CODi_message_newPage;
Window_Message.prototype.drill_CODi_message_newPage = function() {
	
	// > 解析前
	$gameTemp._drill_DNB_text = "";
	$gameTemp._drill_DNB_type = "";
	
	// > 原函数（此过程会解析窗口字符）
	_drill_DNB_CODi_message_doStart.call(this);
	
	// > 解析后
	if( $gameTemp._drill_DNB_text != undefined && 
		$gameTemp._drill_DNB_text != "" ){
		
		// > 重设数据
		this._drill_DNB_nameWindow.drill_resetData_Message(
			$gameTemp._drill_DNB_text, $gameTemp._drill_DNB_type
		);
		
		// > 打开姓名框
		this._drill_DNB_nameWindow.drill_DNB_openNow();
	}
};
//==============================
// * 姓名框展开控制 - 对话框 关闭对话框时
//==============================
var _drill_DNB_CODi_message_doTerminate = Window_Message.prototype.drill_CODi_message_doTerminate;
Window_Message.prototype.drill_CODi_message_doTerminate = function() {
	_drill_DNB_CODi_message_doTerminate.call(this);
	
	// > 延迟关闭姓名框
	this._drill_DNB_nameWindow.drill_DNB_closeDelay( 3 );
};


//=============================================================================
// ** 姓名窗口【Drill_DNB_NameBoxWindow】
// **		
// **		作用域：	地图界面
// **		主功能：	定义一个窗口，用于显示姓名。
// **		子功能：	
// **					->窗口『独立贴图』
// **						x->显示贴图/隐藏贴图
// **						x->是否就绪
// **						x->优化策略
// **						x->销毁
// **						->初始化数据
// **						->初始化对象
// **					
// **					->2A主体
// **						->窗口属性
// **						->位置X类型
// **						->位置Y类型
// **					->2B展开控制
// **					->2C窗口内容
// **						->窗口字符
// **						->文本域自适应
// **					
// **		说明：	> 该窗口在游戏中实时创建，创建后将被销毁。
//=============================================================================
//==============================
// * 姓名窗口 - 定义
//==============================
function Drill_DNB_NameBoxWindow() {
	this.initialize.apply(this, arguments);
}
Drill_DNB_NameBoxWindow.prototype = Object.create(Window_Base.prototype);
Drill_DNB_NameBoxWindow.prototype.constructor = Drill_DNB_NameBoxWindow;
//==============================
// * 姓名窗口 - 初始化
//==============================
Drill_DNB_NameBoxWindow.prototype.initialize = function( parentWindow ){
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	this._messageWindow = parentWindow;	//（绑定父窗体）
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 姓名窗口 - 帧刷新
//==============================
Drill_DNB_NameBoxWindow.prototype.update = function() {
    Window_Base.prototype.update.call(this);
	this.drill_updateAttr();		//帧刷新 - 2A主体
	this.drill_updateOpen();		//帧刷新 - 2B展开控制
									//帧刷新 - 2C窗口内容（无）
};
//==============================
// * 姓名窗口 - 初始化数据『独立贴图』
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_initData = function() {
	//（暂无 默认值）
}
//==============================
// * 姓名窗口 - 初始化对象『独立贴图』
//
//			说明：	> 此函数只在初始化时执行一次，重设数据 被分到各个子功能里面执行。
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_initSprite = function() {
	this.drill_initAttr();				//初始化对象 - 2A主体
	this.drill_initOpen();				//初始化对象 - 2B展开控制
	this.drill_initMessage();			//初始化对象 - 2C窗口内容
}
//==============================
// * 姓名窗口 - 窗口属性
//==============================
Drill_DNB_NameBoxWindow.prototype.standardPadding = function(){ return DrillUp.g_DNB_nameBox_padding; };		//窗口内边距
Drill_DNB_NameBoxWindow.prototype.standardFontSize = function() { return DrillUp.g_DNB_nameBox_fontSize; };		//窗口字体大小

//==============================
// * 2A主体 - 初始化
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_initAttr = function() {
	this._drill_positionXType = "";		//（位置X类型）
	//（无）							//（位置Y类型）
}
//==============================
// * 2A主体 - 设置位置类型（开放函数）
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_setPositionType = function( position_type ){
	this._drill_positionXType = position_type;
}
//==============================
// * 2A主体 - 帧刷新
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_updateAttr = function() {
	this.drill_updateAttr_PositionX();
	this.drill_updateAttr_PositionY();
};
//==============================
// * 2A主体 - 帧刷新 - 位置X（开放函数）
//
//			说明：	> 该函数会被 对话框变形器 调用，用于对话框位置跟随控制。
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_updateAttr_PositionX = function() {
	var xx = 0;
	
	// > 位置X类型
	var cur_x_type = this._drill_positionXType;
	if( cur_x_type == "" || cur_x_type == "左对齐" ){
		xx = this._messageWindow.x;
		xx += $gameSystem.drill_DNB_getClosingX();		//（横向收拢偏移量）
	
	}else if( cur_x_type === "居中" ){
		xx = this._messageWindow.x;
		xx += this._messageWindow.width / 2;
		xx -= this.width / 2;
	
	}else if( cur_x_type === "右对齐" ){
		xx = this._messageWindow.x + this._messageWindow.width;
		xx -= this.width;
		xx -= $gameSystem.drill_DNB_getClosingX();		//（横向收拢偏移量）
	}
	
	// > 不能过界
	if( xx < 0 ){ xx = 0; }
	if( xx > Graphics.boxWidth - this.width ){ xx = Graphics.boxWidth - this.width; }
	
	this.x = xx;
	//this.x = Math.round( xx );	//『非整数坐标抖动问题』问题来自YEP插件，而不是该插件
};
//==============================
// * 2A主体 - 帧刷新 - 位置Y（开放函数）
//
//			说明：	> 该函数会被 对话框变形器 调用，用于对话框位置跟随控制。
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_updateAttr_PositionY = function() {
	var yy = 0;
	
	// > 位置Y类型 - 0顶部（根据父窗口的位置来判断，这里不用 $gameMessage.positionType() == 0 ）
	if( this._messageWindow.y < this._messageWindow.height ){
		yy = this._messageWindow.y + this._messageWindow.height;
		yy -= $gameSystem.drill_DNB_getClosingY();		//（纵向收拢偏移量）
		
	// > 位置Y类型 - 1中间/2底部
	}else{
		yy = this._messageWindow.y;
		yy -= this.height;
		yy += $gameSystem.drill_DNB_getClosingY();		//（纵向收拢偏移量）
	}
	
	this.y = yy;
	//this.y = Math.round( yy );	//『非整数坐标抖动问题』问题来自YEP插件，而不是该插件
};

//==============================
// * 2B展开控制 - 初始化
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_initOpen = function() {
    this.openness = 0;					//初始紧闭（0C展开动画）（不要直接给_openness赋值，具体去看变量定义）
	this._drill_closeDelayTime = -1;	//延迟时间
}
//==============================
// * 2B展开控制 - 打开姓名框（开放函数）
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_DNB_openNow = function(){
	this._drill_closeDelayTime = -1;
	this.open();
}
//==============================
// * 2B展开控制 - 关闭姓名框（开放函数）
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_DNB_closeNow = function(){
	this._drill_closeDelayTime = -1;
	this.close();
}
//==============================
// * 2B展开控制 - 延迟关闭姓名框（开放函数）
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_DNB_closeDelay = function( closeDelayTime ){
	this._drill_closeDelayTime = closeDelayTime;
}
//==============================
// * 2B展开控制 - 帧刷新
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_updateOpen = function() {
	
	// > 延迟关闭姓名框
	this._drill_closeDelayTime -= 1;
	if( this._drill_closeDelayTime == 0 ){
		this.drill_DNB_closeNow();
	}
}

//==============================
// * 2C窗口内容 - 初始化
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_initMessage = function() {
    this._drill_text = "";
}
//==============================
// * 2C窗口内容 - 重设数据（开放函数）
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_resetData_Message = function( text, position_type ){
	
	// > 刷新内容
	this._drill_text = text;
	var result_text = $gameSystem.drill_DNB_getPrefix() + text + $gameSystem.drill_DNB_getSuffix();
	this.drill_refreshMessage( result_text );
	
	this.drill_setPositionType( position_type );	//2A主体 - 设置位置类型
};
//==============================
// * 2C窗口内容 - 刷新内容
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_refreshMessage = function( context ){
	
	// > 『字符贴图流程』 - 清空字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_clearAllSprite();
	}
	
	// > 参数准备 - 校验
	var temp_bitmap = this.contents;
	if( temp_bitmap == undefined ){ return; }
	var org_text = context;
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth']  = 100;	//（此参数暂时不用，先给个非零值）
	options['infoParam']['canvasHeight'] = 100;
	
	// > 参数准备 - 自定义
	options['blockParam'] = {};					//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	options['baseParam'] = {};
	options['baseParam']['fontSize'] = this.standardFontSize();	//（使用当前窗口的字体大小）
	
	// > 参数准备 - 『字符主流程』 - 获取文本高宽【窗口字符 - 窗口字符核心】
	var ww = this.drill_COWC_getOrgTextWidth( org_text, options );
	var hh = this.drill_COWC_getOrgTextHeight( org_text, options );
	ww = Math.ceil(ww);
	hh = Math.ceil(hh);
	options['infoParam']['canvasWidth']  = ww;
	options['infoParam']['canvasHeight'] = hh;
	
	
	// > 自适应 - 设置窗口高宽
	ww += this.standardPadding() * 2;		//（使用当前窗口的内边距）
	hh += this.standardPadding() * 2;
	this._drill_windowWidth = ww;
	this._drill_windowHeight = hh;
	this.width = this._drill_windowWidth;		//（窗口宽度）
	this.height = this._drill_windowHeight;		//（窗口高度）
	
	// > 自适应 - 重建画布（自适应高宽需要重建）
	this.createContents();
	temp_bitmap = this.contents;			//（临时画布重新绑定）
	
	
	// > 『字符主流程』 - DEBUG显示画布范围【窗口字符 - 窗口字符核心】
	//temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
	
	// > 『字符贴图流程』 - 刷新字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
}
//==============================
// * 2C窗口内容 - 刷新内容 - 窗口字符底层校验
//==============================
if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
	alert( DrillUp.drill_DNB_getPluginTip_NeedUpdate_drawText() );
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogNameBox = false;
		var pluginTip = DrillUp.drill_DNB_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

