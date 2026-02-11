//=============================================================================
// Drill_DialogChoiceBox.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        对话框 - 选择项窗口
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogChoiceBox +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以专门控制对话框的选择项窗口。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfDialog     对话框-对话框优化核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只作用于对话框选项窗口。
 * 2.详细去看看文档 "15.对话框 > 关于选择项窗口.docx"。
 * 选择项窗口：
 *   (1.开启插件指令后，可以合并连着写的选项指令，不限制合并数量。
 *   (2.你可以设置选项置灰与隐藏，还能设置选项随机排列。
 *   (3.你可以修改选项的列数，让选项变成横向排列。
 * 设计：
 *   (1.你可以结合字符串核心，制作多行、长文本的选项。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多选项合并
 * 你可以开启多选项合并功能，使用下面的插件指令：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>选择项窗口 : 多选项合并 : 开启
 * 插件指令：>选择项窗口 : 多选项合并 : 关闭
 * 
 * 1.功能开启后，永久有效。
 *   连着写的选项指令，都会被合并，不限制合并数量。
 *   其它细节可以去看看文档 "15.对话框 > 关于选择项窗口.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 下一个窗口
 * 你需要提前设置下面的插件指令，修改下一个选择项窗口的属性：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>选择项窗口 : 下一个窗口-锁定默认选中 : 选项[1]
 * 插件指令：>选择项窗口 : 下一个窗口-锁定默认选中 : 选项变量[21]
 * 插件指令：>选择项窗口 : 下一个窗口-解锁默认选中
 * 
 * 插件指令：>选择项窗口 : 下一个窗口-修改列数 : 列数[2]
 * 插件指令：>选择项窗口 : 下一个窗口-修改列数 : 列数变量[21]
 * 插件指令：>选择项窗口 : 下一个窗口-修改选项最小宽度 : 宽度[96]
 * 插件指令：>选择项窗口 : 下一个窗口-修改选项最小宽度 : 宽度变量[21]
 * 
 * 1."下一个窗口"是指 只对 下一个选择项窗口 临时有效。
 * 2.最好在对话开始前，先执行插件指令。
 *   如果插件指令 夹在 对话指令与选择项指令中间，
 *   会使得对话时对话框和选项窗口分开成两步显示。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 置灰与隐藏
 * 你需要提前设置下面的插件指令，修改下一个选择项窗口的属性：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>选择项窗口 : 下一个窗口-置灰列表-添加选项 : 选项[1]
 * 插件指令：>选择项窗口 : 下一个窗口-置灰列表-添加选项 : 选项变量[21]
 * 插件指令：>选择项窗口 : 下一个窗口-置灰列表-添加选项 : 批量选项[1,2]
 * 插件指令：>选择项窗口 : 下一个窗口-置灰列表-添加选项 : 批量选项变量[21,22]
 * 
 * 插件指令：>选择项窗口 : 下一个窗口-置灰列表-添加选项 : 选项[1]
 * 插件指令：>选择项窗口 : 下一个窗口-置灰列表-去掉选项 : 选项[1]
 * 插件指令：>选择项窗口 : 下一个窗口-隐藏列表-添加选项 : 选项[1]
 * 插件指令：>选择项窗口 : 下一个窗口-隐藏列表-去掉选项 : 选项[1]
 * 插件指令：>选择项窗口 : 下一个窗口-排列后置灰列表-添加选项 : 选项[1]
 * 插件指令：>选择项窗口 : 下一个窗口-排列后置灰列表-去掉选项 : 选项[1]
 * 插件指令：>选择项窗口 : 下一个窗口-排列后隐藏列表-添加选项 : 选项[1]
 * 插件指令：>选择项窗口 : 下一个窗口-排列后隐藏列表-去掉选项 : 选项[1]
 * 
 * 插件指令：>选择项窗口 : 下一个窗口-清空全部置灰与隐藏列表
 * 插件指令：>选择项窗口 : 下一个窗口-开启全部选项随机排列
 * 
 * 1.前半部分（下一个窗口-置灰列表-添加选项）和 后半部分（选项[1]）
 *   的参数可以随意组合。一共有4*8种组合方式。
 * 2.隐藏分为三个阶段：隐藏选项、随机排列、排列后隐藏选项。
 *   详细可以去看看文档 "15.对话框 > 关于选择项窗口.docx" 的介绍。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 配置修改
 * 你需要使用下面的插件指令，修改配置：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>选择项窗口 : 修改选项置灰时前缀 : 文本[\c[7]]
 * 插件指令：>选择项窗口 : 修改选项置灰时前缀 : 默认值
 * 插件指令：>选择项窗口 : 修改选项置灰时后缀 : 文本[\c[0]]
 * 插件指令：>选择项窗口 : 修改选项置灰时后缀 : 默认值
 * 
 * 1.前缀后缀修改后永久有效。
 *   默认置灰的方式就是将文本颜色变为灰色，
 *   如果选项自带颜色改变，则置灰效果可能会失效。
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
 * 测试方法：   对话框管理层，开启选择项窗口，并进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件会在每次打开窗口时，计算高度宽度，会消耗部分性能，但不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 兼容了选项内的文本居中功能。
 * 
 * 
 * 
 * @param ---选择项窗口---
 * @desc 
 * 
 * @param 选项置灰时-额外前缀
 * @parent ---选择项窗口---
 * @desc 选项置灰时，文本基础上额外的添加的前缀文本。
 * @default \c[7]
 * 
 * @param 选项置灰时-额外后缀
 * @parent ---选择项窗口---
 * @desc 选项置灰时，文本基础上额外的添加的后缀文本。
 * @default 
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DCBo (Dialog_Choice_Box)
//		临时全局变量	DrillUp.g_DCBo_xxx
//		临时局部变量	this._drill_DCBo_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Window_ChoiceList.prototype.drawItem（覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	对话框管理层
//		★性能测试消耗	2025/11/12：
//							》74.6ms（drill_DCBo_refreshMaxChoiceHeight）0.8ms（drill_DCBo_isInputEnabled）
//		★最坏情况		暂无
//		★备注			每次计算高度，都比较耗性能。
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
//
//			->☆原型链规范（Window_ChoiceList）
//
//			->☆管辖权（多选项合并）
//			->☆多选项合并
//				->管理器
//				->重置数据
//				->【信息 > 显示选项】
//
//
//			->☆管辖权（输入权限）
//			->☆输入权限 实现
//			->☆输入权限 标准模块
//				->是否启用输入【标准接口】
//
//			->☆可见控制 实现
//			->☆可见控制 标准模块
//				->是否可见【标准接口】
//
//			->☆选择结束时 实现
//			->☆选择结束时 标准模块
//				->执行函数【标准接口】
//
//			->☆管辖权（默认选中）
//			->☆默认选中
//			->☆管辖权（列数与行高）
//			->☆列数与行高
//			->☆管辖权（置灰与隐藏）
//			->☆置灰与隐藏
//			->☆管辖权（绘制单个子项）
//			->☆绘制单个子项
//
//
//			->☆引擎兼容（STG）
//			->☆引擎兼容（ACT）
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
//			1.选择项窗口的函数，执行流程如下：（从上往下顺序执行）
//				指令阶段：
//					Game_Interpreter.prototype.command102
//						Game_Interpreter.prototype.setupChoices
//							Game_Message.prototype.setChoices
//							Game_Message.prototype.setChoiceBackground
//							Game_Message.prototype.setChoicePositionType
//							Game_Message.prototype.setChoiceCallback
//				窗口阶段：
//					Window_ChoiceList.prototype.start
//						Window_ChoiceList.prototype.updatePlacement
//							Window_ChoiceList.prototype.windowWidth
//								Window_ChoiceList.prototype.maxChoiceWidth
//							Window_ChoiceList.prototype.windowHeight
//								Window_ChoiceList.prototype.numVisibleRows
//						Window_ChoiceList.prototype.updateBackground
//						Window_ChoiceList.prototype.refresh				（初始化时也会执行一次，Window_Command中）
//							Window_ChoiceList.prototype.makeCommandList	（初始化时也会执行一次，Window_Command中）
//						Window_ChoiceList.prototype.selectDefault
//				输入阶段（确定时）：
//					Window_ChoiceList.prototype.callOkHandler
//						Game_Message.prototype.onChoice
//						Window_ChoiceList.prototype.drill_DCBo_whenChoiceEnd
//				输入阶段（取消时）：
//					Window_ChoiceList.prototype.callCancelHandler
//						Game_Message.prototype.onChoice
//						Window_ChoiceList.prototype.drill_DCBo_whenChoiceEnd
//				后指令阶段：
//					Game_Interpreter.prototype.command402
//					Game_Interpreter.prototype.command403
//					Game_Interpreter.prototype.command404
//
//		★其它说明细节：
//			1. 2025-11-7：选择项窗口，真是个相当原始的功能啊，总让我想起这样的场景。
//					-----------------------------
//					|\                         /|
//					| \________/\_____________/ |
//					|  |      /  \           |  |
//					|  |     @@@@@@          |  |
//					|  |    @ O  o @         |  |
//					|  |    @  w   @         |  |
//					|  |    @-@-@-@          |  |
//					|  |_____________________|  |
//					| /                       \ |
//					|/                         \|
//					-----------------------------
//					| [攻击] |   一只戴帽子的   |
//					| [技能] |   幽灵出现了！   |
//					| [物品] |                  |
//					| [逃跑] |                  |
//					-----------------------------
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
	DrillUp.g_DCBo_PluginTip_curName = "Drill_DialogChoiceBox.js 对话框-选择项窗口";
	DrillUp.g_DCBo_PluginTip_baseList = ["Drill_CoreOfDialog.js 对话框-对话框优化核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DCBo_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DCBo_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DCBo_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DCBo_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DCBo_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogChoiceBox = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogChoiceBox');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DCBo_grey_prefix = String(DrillUp.parameters["选项置灰时-额外前缀"] || "\\c[7]"); 
	DrillUp.g_DCBo_grey_suffix = String(DrillUp.parameters["选项置灰时-额外后缀"] || ""); 
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfDialog ){
	//（置灰功能、对齐方式功能，必须要基于对话框优化核心。）
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DCBo_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DCBo_pluginCommand.call(this, command, args);
	this.drill_DCBo_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DCBo_pluginCommand = function( command, args ){
	if( command === ">选择项窗口" ){
		
		/*-----------------多选项合并------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "多选项合并" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_DCBo_combineEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_DCBo_combineEnabled = false;
				}
			}
		}
		
		/*-----------------默认选中------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "下一个窗口-锁定默认选中" ){
				if( temp1.indexOf("选项变量[") != -1 ){
					temp1 = temp1.replace("选项变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) ) -1;
				}else{
					temp1 = temp1.replace("选项[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1) -1;
				}
				$gameSystem._drill_DCBo_defaultSelected = temp1;
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "下一个窗口-解锁默认选中" ){
				$gameSystem._drill_DCBo_defaultSelected = -1;
			}
		}
		
		/*-----------------列数与行高------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "下一个窗口-修改列数" ){
				if( temp1.indexOf("列数变量[") != -1 ){
					temp1 = temp1.replace("列数变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
				}else{
					temp1 = temp1.replace("列数[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
				}
				$gameSystem._drill_DCBo_nextCol = temp1;
			}
			if( type == "下一个窗口-修改选项最小宽度" ){
				if( temp1.indexOf("宽度变量[") != -1 ){
					temp1 = temp1.replace("宽度变量[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value( Number(temp1) );
				}else{
					temp1 = temp1.replace("宽度[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
				}
				$gameSystem._drill_DCBo_nextMinWidth = temp1;
			}
		}
		
		/*-----------------置灰与隐藏------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var option_str = String(args[3]);
			var option_list = null;
			if( option_list == null && option_str.indexOf("批量选项[") != -1 ){
				option_str = option_str.replace("批量选项[","");
				option_str = option_str.replace("]","");
				option_list = [];
				var temp_arr = option_str.split(/[,，]/);
				for(var k = 0; k < temp_arr.length; k++ ){
					var index = Number(temp_arr[k]) -1;
					option_list.push( index );
				}
			}
			if( option_list == null && option_str.indexOf("批量选项变量[") != -1 ){
				option_str = option_str.replace("批量选项变量[","");
				option_str = option_str.replace("]","");
				option_list = [];
				var temp_arr = option_str.split(/[,，]/);
				for(var k = 0; k < temp_arr.length; k++ ){
					var index = $gameVariables.value(Number(temp_arr[k])) -1;
					option_list.push( index );
				}
			}
			if( option_list == null && option_str.indexOf("选项变量[") != -1 ){
				option_str = option_str.replace("选项变量[","");
				option_str = option_str.replace("]","");
				var index = $gameVariables.value(Number(option_str)) -1;
				option_list = [ index ];
			}
			if( option_list == null && option_str.indexOf("选项[") != -1 ){
				option_str = option_str.replace("选项[","");
				option_str = option_str.replace("]","");
				var index = Number(option_str) -1;
				option_list = [ index ];
			}
			
			if( option_list != null ){
				if( type == "下一个窗口-置灰列表-添加选项" ){
					for(var k = 0; k < option_list.length; k++ ){
						var temp_index = Number(option_list[k]);
						$gameSystem._drill_DCBo_greyIndexMap[temp_index] = true;
					}
				}
				if( type == "下一个窗口-置灰列表-去掉选项" ){
					for(var k = 0; k < option_list.length; k++ ){
						var temp_index = Number(option_list[k]);
						$gameSystem._drill_DCBo_greyIndexMap[temp_index] = undefined;
					}
				}
				if( type == "下一个窗口-隐藏列表-添加选项" ){
					for(var k = 0; k < option_list.length; k++ ){
						var temp_index = Number(option_list[k]);
						$gameSystem._drill_DCBo_hideIndexMap[temp_index] = true;
					}
				}
				if( type == "下一个窗口-隐藏列表-去掉选项" ){
					for(var k = 0; k < option_list.length; k++ ){
						var temp_index = Number(option_list[k]);
						$gameSystem._drill_DCBo_hideIndexMap[temp_index] = undefined;
					}
				}
				if( type == "下一个窗口-排列后置灰列表-添加选项" ){
					for(var k = 0; k < option_list.length; k++ ){
						var temp_index = Number(option_list[k]);
						$gameSystem._drill_DCBo_afterGreyIndexMap[temp_index] = true;
					}
				}
				if( type == "下一个窗口-排列后置灰列表-去掉选项" ){
					for(var k = 0; k < option_list.length; k++ ){
						var temp_index = Number(option_list[k]);
						$gameSystem._drill_DCBo_afterGreyIndexMap[temp_index] = undefined;
					}
				}
				if( type == "下一个窗口-排列后隐藏列表-添加选项" ){
					for(var k = 0; k < option_list.length; k++ ){
						var temp_index = Number(option_list[k]);
						$gameSystem._drill_DCBo_afterHideIndexMap[temp_index] = true;
					}
				}
				if( type == "下一个窗口-排列后隐藏列表-去掉选项" ){
					for(var k = 0; k < option_list.length; k++ ){
						var temp_index = Number(option_list[k]);
						$gameSystem._drill_DCBo_afterHideIndexMap[temp_index] = undefined;
					}
				}
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "下一个窗口-清空全部置灰与隐藏列表" ){
				$gameSystem._drill_DCBo_greyIndexMap = {};			//置灰列表
				$gameSystem._drill_DCBo_hideIndexMap = {};			//隐藏列表
				$gameSystem._drill_DCBo_afterGreyIndexMap = {};		//排列后置灰列表
				$gameSystem._drill_DCBo_afterHideIndexMap = {};		//排列后隐藏列表
			}
			if( type == "下一个窗口-开启全部选项随机排列" ){
				$gameSystem._drill_DCBo_randomOptionEnabled = true;
			}
		}
		
		/*-----------------置灰与隐藏 - 前缀后缀------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改选项置灰时前缀" ){
				if( temp1 == "默认值" ){
					$gameSystem._drill_DCBo_greyPrefix = DrillUp.g_DCBo_grey_prefix;
				}else{
					temp1 = temp1.replace("文本[","");
					temp1 = temp1.replace(/\]$/,"");	//（去掉末尾的]）
					$gameSystem._drill_DCBo_greyPrefix = String(temp1);
				}
			}
			if( type == "修改选项置灰时后缀" ){
				if( temp1 == "默认值" ){
					$gameSystem._drill_DCBo_greySuffix = DrillUp.g_DCBo_grey_suffix;
				}else{
					temp1 = temp1.replace("文本[","");
					temp1 = temp1.replace(/\]$/,"");	//（去掉末尾的]）
					$gameSystem._drill_DCBo_greySuffix = String(temp1);
				}
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
DrillUp.g_DCBo_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DCBo_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DCBo_sys_initialize.call(this);
	this.drill_DCBo_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DCBo_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DCBo_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DCBo_saveEnabled == true ){	
		$gameSystem.drill_DCBo_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DCBo_initSysData();
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
Game_System.prototype.drill_DCBo_initSysData = function() {
	this.drill_DCBo_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DCBo_checkSysData = function() {
	this.drill_DCBo_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DCBo_initSysData_Private = function() {
	
	this._drill_DCBo_combineEnabled = false;					//多选项合并开关
	
	this._drill_DCBo_defaultSelected = -1;						//锁定默认选中（-1表示未设置）
	
	this._drill_DCBo_nextCol = -1;								//修改列数（-1表示未设置）
	this._drill_DCBo_nextMinWidth = -1;							//修改选项最小宽度（-1表示未设置）
	
	this._drill_DCBo_greyIndexMap = {};							//置灰列表
	this._drill_DCBo_hideIndexMap = {};							//隐藏列表
	this._drill_DCBo_afterGreyIndexMap = {};					//排列后置灰列表
	this._drill_DCBo_afterHideIndexMap = {};					//排列后隐藏列表
	this._drill_DCBo_randomOptionEnabled = false;				//随机排列开关
	this._drill_DCBo_greyPrefix = DrillUp.g_DCBo_grey_prefix;	//选项置灰时前缀
	this._drill_DCBo_greySuffix = DrillUp.g_DCBo_grey_suffix;	//选项置灰时后缀
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DCBo_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DCBo_defaultSelected == undefined ){
		this.drill_DCBo_initSysData();
	}
};



//=============================================================================
// ** ☆原型链规范（Window_ChoiceList）
//
//			说明：	> 此处专门补上缺失的原型链，由于结构复杂，留意下面情况：
//						注释的函数：
//							这个函数 Window_ChoiceList 本身就有，不需要补上。
//						注意Window_Selectable：
//							父类Window_Command没有指定函数，所以再往父一级继承。
//						call和return：
//							继承时容易遗漏call和return，多检查几遍。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 选择项窗口 - 帧刷新
//==============================
Window_ChoiceList.prototype.update = function(){
	Window_Selectable.prototype.update.call(this);	//（注意Window_Selectable）
};
//==============================
// * 选择项窗口 - 2A子项 - 属性 - 列数
//==============================
Window_ChoiceList.prototype.maxCols = function(){
	return Window_Selectable.prototype.maxCols.call(this);	//（注意Window_Selectable）
};
//==============================
// * 选择项窗口 - 2A子项 - 属性 - 子项数量
//==============================
Window_ChoiceList.prototype.maxItems = function(){
	return Window_Command.prototype.maxItems.call(this);
};
//==============================
// * 选择项窗口 - 2A子项 - 属性 - 子项间距
//==============================
Window_ChoiceList.prototype.spacing = function(){
	return Window_Selectable.prototype.spacing.call(this);	//（注意Window_Selectable）
};
//==============================
// * 选择项窗口 - 2A子项 - 计算后的属性
//==============================
	//（此功能用不上）
//==============================
// * 选择项窗口 - 2A子项 - 重画当前的子项
//==============================
Window_ChoiceList.prototype.redrawCurrentItem = function(){
	Window_Selectable.prototype.redrawCurrentItem.call(this);	//（注意Window_Selectable）
};
//==============================
// * 选择项窗口 - 2A子项 - 重画单个子项
//==============================
Window_ChoiceList.prototype.redrawItem = function( index ){
	Window_Selectable.prototype.redrawItem.call(this,index);	//（注意Window_Selectable）
};
//==============================
// * 选择项窗口 - 2A子项 - 重画所有子项
//==============================
Window_ChoiceList.prototype.refresh = function(){
	Window_Command.prototype.refresh.call(this);
};
//==============================
// * 选择项窗口 - 2A子项 - 绘制单个子项
//==============================
	//Window_ChoiceList.prototype.drawItem = function( index ){
	//	Window_Command.prototype.drawItem.call(this,index);
	//};
//==============================
// * 选择项窗口 - 2A子项 - 绘制所有子项
//==============================
Window_ChoiceList.prototype.drawAllItems = function(){
	Window_Selectable.prototype.drawAllItems.call(this);	//（注意Window_Selectable）
};
//==============================
// * 选择项窗口 - 2A子项 - 清除单个子项
//==============================
Window_ChoiceList.prototype.clearItem = function( index ){
	Window_Selectable.prototype.clearItem.call(this,index);	//（注意Window_Selectable）
};
//==============================
// * 选择项窗口 - 2A子项 - 清除所有子项
//==============================
	//（无）

//==============================
// * 选择项窗口 - 3A命令窗口属性 - 窗口宽度
//==============================
	//Window_ChoiceList.prototype.windowWidth = function(){
	//	return Window_Command.prototype.windowWidth.call(this);
	//};
//==============================
// * 选择项窗口 - 3A命令窗口属性 - 窗口高度
//==============================
Window_ChoiceList.prototype.windowHeight = function(){
	return Window_Command.prototype.windowHeight.call(this);
};
//==============================
// * 选择项窗口 - 3A命令窗口属性 - 窗口高度 - 最大可见行数
//==============================
	//Window_ChoiceList.prototype.numVisibleRows = function(){
	//	return Window_Command.prototype.numVisibleRows.call(this);
	//};
//==============================
// * 选择项窗口 - 3A命令窗口属性 - 对齐方式
//==============================
Window_ChoiceList.prototype.itemTextAlign = function(){
	return Window_Command.prototype.itemTextAlign.call(this);
};

//==============================
// * 选择项窗口 - 3B命令选项 - 创建
//==============================
	//Window_ChoiceList.prototype.makeCommandList = function(){
	//	Window_Command.prototype.makeCommandList.call(this);
	//};
//==============================
// * 选择项窗口 - 3B命令选项 - 删除
//==============================
Window_ChoiceList.prototype.clearCommandList = function(){
	Window_Command.prototype.clearCommandList.call(this);
};
//==============================
// * 选择项窗口 - 3B命令选项 - 添加命令
//==============================
Window_ChoiceList.prototype.addCommand = function( name, symbol, enabled, ext ){
	Window_Command.prototype.addCommand.call(this,name,symbol,enabled,ext);
};
//==============================
// * 选择项窗口 - 3B命令选项 - 获取 - 当前选中
//==============================
Window_ChoiceList.prototype.currentData = function(){
	return Window_Command.prototype.currentData.call(this);
};
//==============================
// * 选择项窗口 - 3B命令选项 - 获取 - 名称（根据索引）
//==============================
Window_ChoiceList.prototype.commandName = function( index ){
	return Window_Command.prototype.commandName.call(this,index);
};
//==============================
// * 选择项窗口 - 3B命令选项 - 获取 - 是否可用（根据索引）
//==============================
Window_ChoiceList.prototype.isCommandEnabled = function( index ){
	return Window_Command.prototype.isCommandEnabled.call(this,index);
};
//==============================
// * 选择项窗口 - 3B命令选项 - 获取 - 是否可用（根据当前选中）
//==============================
Window_ChoiceList.prototype.isCurrentItemEnabled = function(){
	return Window_Command.prototype.isCurrentItemEnabled.call(this);
};

//==============================
// * 选择项窗口 - 3C命令关键字
//==============================
	//（此功能用不上）
//==============================
// * 选择项窗口 - 3D命令其它关键字
//==============================
	//（此功能用不上）

//==============================
// * 选择项窗口 - 3E命令窗口输入 - 执行 确定键 - 回调函数
//==============================
	//Window_ChoiceList.prototype.callOkHandler = function(){
	//	Window_Command.prototype.callOkHandler.call(this);
	//};
//==============================
// * 选择项窗口 - 3E命令窗口输入 - 执行 取消键 - 回调函数
//==============================
	//Window_ChoiceList.prototype.callCancelHandler = function(){
	//	Window_Selectable.prototype.callCancelHandler.call(this);	//（注意Window_Selectable）
	//};
//==============================
// * 选择项窗口 - 3E命令窗口输入 - 确定键
//==============================
	//Window_ChoiceList.prototype.isOkTriggered = function(){
	//	return Window_Selectable.prototype.isOkTriggered.call(this);	//（注意Window_Selectable）
	//};
//==============================
// * 选择项窗口 - 3E命令窗口输入 - 确定键的可用情况
//==============================
Window_ChoiceList.prototype.isOkEnabled = function(){
	return Window_Command.prototype.isOkEnabled.call(this);
};
//==============================
// * 选择项窗口 - 3E命令窗口输入 - 取消键
//==============================
Window_ChoiceList.prototype.isCancelTriggered = function(){
	return Window_Selectable.prototype.isCancelTriggered.call(this);	//（注意Window_Selectable）
};
//==============================
// * 选择项窗口 - 3E命令窗口输入 - 取消键的可用情况
//==============================
	//Window_ChoiceList.prototype.isCancelEnabled = function(){
	//	return Window_Selectable.prototype.isCancelEnabled.call(this);	//（注意Window_Selectable）
	//};



//=============================================================================
// ** ☆管辖权（多选项合并）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * I指令《对话框-选择项窗口》 - 【信息 > 显示选项】
//==============================
Game_Interpreter.prototype.command102 = function(){
    if( !$gameMessage.isBusy() ){
        this.setupChoices(this._params);
        this._index++;
        this.setWaitMode('message');  //开始阻塞『对话框的阻塞原理』
    }
    return false;
};
//==============================
// * I指令《对话框-选择项窗口》 - 【信息 > 显示选项】 - 建立选项
//
//			说明：	> 插件《对话框-选择项窗口》覆写了此函数，用于支持 多选项合并 功能。
//					  如果子插件要继承此函数，则记得使用 最后继承。
//==============================
Game_Interpreter.prototype.setupChoices = function( params ){
	
	// > 参数准备
	//		（ params[0]  字符串数组  选项容器 ["是","否"]       ）
	//		（ params[1]  数字        取消类型 -2/-1/0/1/2/3/4/5 ）
	//		（ params[2]  数字        默认选择项 0/1/2/3/4/5     ）
	//		（ params[3]  数字        选项位置类型 0/1/2         ）
	//		（ params[4]  数字        选项框皮肤 0/1/2           ）
    var choices = params[0].clone();
    var cancelType = params[1];
    var defaultType = params.length > 2 ? params[2] : 0;
    var positionType = params.length > 3 ? params[3] : 2;
    var background = params.length > 4 ? params[4] : 0;
	
	// > 遍历指令
	//		（在游戏编辑器中，102指令的内容后面 缩进一致 的指令，有1~6个402指令，1个403指令，1个404指令）
	//		（缩进不一致的指令，都属于该分支条件下的新指令，注意区别）
	//（无）
	
	// > 参数赋值
    if( cancelType >= choices.length ){ cancelType = -2; }	//（若超出选项长度，则按"取消分支"来算）
    $gameMessage.setChoices(choices, defaultType, cancelType);
    $gameMessage.setChoiceBackground(background);
    $gameMessage.setChoicePositionType(positionType);
	
	// > 参数赋值 - 回调函数
    $gameMessage.setChoiceCallback(function( n ){
        this._branch[this._indent] = n;
    }.bind(this));
};
//==============================
// * I指令《对话框-选择项窗口》 - 【信息 > 显示选项】 - "选择 xxx 时"
//
//			说明：	> 插件《对话框-选择项窗口》覆写了此函数，用于支持 多选项合并 功能。
//					  如果子插件要继承此函数，则记得使用 最后继承。
//==============================
Game_Interpreter.prototype.command402 = function(){
	
	// > 参数准备
	//		（ this._params[0]  数字   选项索引 ）
	//		（ this._params[1]  字符串 选项名称 ）
	//（无）
	
	// > 跳出分支（回调函数索引对应时）
    if( this._branch[this._indent] !== this._params[0] ){
        this.skipBranch();
    }
    return true;
};
//==============================
// * I指令《对话框-选择项窗口》 - 【信息 > 显示选项】 - "当取消(分支)时"
//
//			说明：	> 插件《对话框-选择项窗口》覆写了此函数，用于支持 多选项合并 功能。
//					  如果子插件要继承此函数，则记得使用 最后继承。
//==============================
Game_Interpreter.prototype.command403 = function(){
	
	// > 跳出分支（402未跳出，执行到这里时）
    if( this._branch[this._indent] >= 0 ){
        this.skipBranch();
    }
    return true;
};
//==============================
// * I指令《对话框-选择项窗口》 - 【信息 > 显示选项】 - "结束"
//
//			说明：	> 插件《对话框-选择项窗口》覆写了此函数，用于支持 多选项合并 功能。
//					  如果子插件要继承此函数，则记得使用 最后继承。
//					> "code":404，对应函数command404，未被使用，但是函数存在。
//					> 另外，每个分支结束后，还会跟一个"code":0，也未被使用。
//==============================
	//（无）
*/

//=============================================================================
// ** ☆多选项合并
//
//			说明：	> 此模块专门管理 102/402/403/404 指令，实现选项合并。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 多选项合并 - 管理器 - 清理全部配置（开放函数）
//
//			说明： > 管理器功能 不能放 Game_Temp 里面，因为解释器有很多个，clear函数反复执行，容易乱套。
//==============================
Game_Interpreter.prototype.drill_DCBo_clearAllCombine = function(){
	this._drill_DCBo_combined_actived = [];						//合并是否激活（indent+布尔）（激活后会阻塞102指令）
	this._drill_DCBo_combined_102Index = [];					//当前102指令索引（indent+数字）
	this._drill_DCBo_combined_choiceMatrix = [];				//选项矩阵（indent+二维字符串数组）（每行对应每条102指令的选项列表）
};
//==============================
// * 多选项合并 - 管理器 - 检查清理配置（开放函数）
//
//			说明： > 该函数一般挂载到 404指令 中，因为该指令是选项的末尾。
//==============================
Game_Interpreter.prototype.drill_DCBo_checkClearCombineIn404 = function( indent ){
	//alert( "遇到404指令，当前缩进："+String(indent)+"，当前102索引值："+String(this._drill_DCBo_combined_102Index[indent])+"，102总数："+String(this._drill_DCBo_combined_choiceMatrix[indent].length) );
	if( this._drill_DCBo_combined_102Index[indent] +1 >= this._drill_DCBo_combined_choiceMatrix[indent].length ){
		this._drill_DCBo_combined_actived[indent] = false;		//合并是否激活（布尔）（激活后会阻塞102指令）
		this._drill_DCBo_combined_102Index[indent] = 0;			//当前102指令索引（数字）
		this._drill_DCBo_combined_choiceMatrix[indent] = [];	//选项矩阵（二维字符串数组）（每行对应每条102指令的选项列表）
	}
};
//==============================
// * 多选项合并 - 管理器 - 初始化配置（开放函数）
//
//			参数：	> command_list       对象数组（指令列表）
//					> frist_choiceIndex  数字（第一条的指令位置）
//					> frist_choiceIndent 数字（第一条的指令缩进）
//			返回：	> 无
//==============================
Game_Interpreter.prototype.drill_DCBo_initCombine = function( command_list, frist_choiceIndex, frist_choiceIndent ){
	
	// > 功能关闭时，跳过初始化
	if( $gameSystem._drill_DCBo_combineEnabled != true ){ return; }
	
	// > 已激活合并时，跳过初始化
	if( this._drill_DCBo_combined_actived[frist_choiceIndent] == true ){ return; }
	
	var temp_frist_command = command_list[frist_choiceIndex];
	if( temp_frist_command == undefined ){ return; }
	var frist_choiceList = temp_frist_command.parameters[0].clone();
	if( frist_choiceList.length == 0 ){ return; }
	
	var temp_index = frist_choiceIndex;
	while( true ){
		temp_index += 1;
		var temp_command = command_list[temp_index];
		if( temp_command == undefined ){ break; }
		
		// > 遍历指令
		//		（寻找下一条 缩进一致 的指令）
		// 		（只要102后面紧贴102，就合并）
		if( temp_command.indent == frist_choiceIndent ){
			
			// > 遍历指令 - 选项的指令时
			if( temp_command.code == 402 ){ continue; }
			if( temp_command.code == 403 ){ continue; }
			if( temp_command.code == 404 ){ continue; }
			
			// > 遍历指令 - 发现合并项时
			if( temp_command.code == 102 ){
				var temp_choices = temp_command.parameters[0].clone();
				
				// > 合并 - 初始化（第一条）
				if( this._drill_DCBo_combined_actived[frist_choiceIndent] != true ){
					//alert("发现可合并的指令，当前缩进："+String(frist_choiceIndent)+"，第一条选项："+frist_choiceList.join(","));
					this._drill_DCBo_combined_actived[frist_choiceIndent] = true;
					this._drill_DCBo_combined_102Index[frist_choiceIndent] = 0;
					this._drill_DCBo_combined_choiceMatrix[frist_choiceIndent] = [];
					this._drill_DCBo_combined_choiceMatrix[frist_choiceIndent].push( frist_choiceList );	//（矩阵中塞入列表）
				}
				
				// > 合并 - 下一条
				this._drill_DCBo_combined_choiceMatrix[frist_choiceIndent].push( temp_choices );
				continue;
			}
			
			// > 遍历指令 - 不符的条件
			//		（选择项指令 后面必须直连 选择项指令，否则不合并）
			break;
		}
	}
};
//==============================
// * 多选项合并 - 管理器 - 当前102指令索引+1（开放函数）
//==============================
Game_Interpreter.prototype.drill_DCBo_addOne102Index = function( indent ){
	if( typeof this._drill_DCBo_combined_102Index[indent] === "number" ){	//（不能用 == undefined 来判断）
		this._drill_DCBo_combined_102Index[indent] += 1;
	}
};
//==============================
// * 多选项合并 - 管理器 - 获取全部选项文本（开放函数）
//==============================
Game_Interpreter.prototype.drill_DCBo_getCombinedChoiceList = function( indent ){
	var result_list = [];
	if( this._drill_DCBo_combined_choiceMatrix[indent] != undefined ){
		for( var i = 0; i < this._drill_DCBo_combined_choiceMatrix[indent].length; i++ ){
			var choice_list = this._drill_DCBo_combined_choiceMatrix[indent][i];
			result_list = result_list.concat( choice_list );
		}
	}
	return result_list;
};
//==============================
// * 多选项合并 - 管理器 - 转换索引值（开放函数）
//
//			说明：	> 不同102指令中的索引值为：0/1/2、0/1/2/3，需要通过此函数转成：0/1/2、3/4/5/6。
//==============================
Game_Interpreter.prototype.drill_DCBo_convertChoiceIndex = function( cur_index, indent ){
	if( this._drill_DCBo_combined_102Index[indent] != undefined && 
		this._drill_DCBo_combined_choiceMatrix[indent] != undefined ){
		for(var i = 0; i < this._drill_DCBo_combined_102Index[indent]; i++ ){
			cur_index += this._drill_DCBo_combined_choiceMatrix[indent][i].length;	//（直接加合并矩阵的每行数量即可）
		}
	}
	return cur_index;
};


//==============================
// * 多选项合并 - 重置数据（继承）
//==============================
var _drill_DCBo_Interpreter_clear = Game_Interpreter.prototype.clear;
Game_Interpreter.prototype.clear = function(){
	_drill_DCBo_Interpreter_clear.call(this);
	this.drill_DCBo_clearAllCombine();		//（清理全部配置）
};
//==============================
// * 多选项合并 - 【信息 > 显示选项】
//==============================
	//Game_Interpreter.prototype.command102
	//（暂不继承）
//==============================
// * 多选项合并 - 【信息 > 显示选项】 - 建立选项（覆写）
//==============================
Game_Interpreter.prototype.setupChoices = function( params ){
	
	// > 合并 - 索引+1
	this.drill_DCBo_addOne102Index(this._indent);
	
	// > 合并 - 已激活合并时，跳过建立选项
	if( this._drill_DCBo_combined_actived[this._indent] == true ){ return; }
	
	
	// > 参数准备
	//		（ params[0]  字符串数组  选项容器 ["是","否"]       ）
	//		（ params[1]  数字        取消类型 -2/-1/0/1/2/3/4/5 ）
	//		（ params[2]  数字        默认选择项 0/1/2/3/4/5     ）
	//		（ params[3]  数字        选项位置类型 0/1/2         ）
	//		（ params[4]  数字        选项框皮肤 0/1/2           ）
	var choices = params[0].clone();
    var cancelType = params[1];
    var defaultType = params.length > 2 ? params[2] : 0;
    var positionType = params.length > 3 ? params[3] : 2;
    var background = params.length > 4 ? params[4] : 0;
	
	// > 遍历指令
	//		（在游戏编辑器中，102指令的内容后面 缩进一致 的指令，有1~6个402指令，1个403指令，1个404指令）
	//		（缩进不一致的指令，都属于该分支条件下的新指令，注意区别）
	this.drill_DCBo_initCombine( this._list, this._index, this._indent );
	var combind_choice = this.drill_DCBo_getCombinedChoiceList(this._indent);
	if( combind_choice.length > 0 ){
		choices = combind_choice;
	}
	
	// > 参数赋值
    if( cancelType >= choices.length ){ cancelType = -2; }	//（若超出选项长度，则按"取消分支"来算）
    $gameMessage.setChoices(choices, defaultType, cancelType);
    $gameMessage.setChoiceBackground(background);
    $gameMessage.setChoicePositionType(positionType);
	
	// > 参数赋值 - 回调函数
    $gameMessage.setChoiceCallback( Game_Interpreter.prototype.drill_DCBo_choiceCallback.bind(this) );
};
//==============================
// * 多选项合并 - 【信息 > 显示选项】 - 回调函数（覆写）
//==============================
Game_Interpreter.prototype.drill_DCBo_choiceCallback = function( n ){
	//	（此处不要修改，n直接对应 选项、多选项合并 的索引值）
	
	this._branch[this._indent] = n;
};
//==============================
// * 多选项合并 - 【信息 > 显示选项】 - "选择 xxx 时"（覆写）
//==============================
Game_Interpreter.prototype.command402 = function(){
	
	// > 参数准备
	//		（ this._params[0]  数字   选项索引 ）
	//		（ this._params[1]  字符串 选项名称 ）
	var cur_index = this._params[0];
	
	// > 合并
	if( this._drill_DCBo_combined_actived[this._indent] == true ){
		cur_index = this.drill_DCBo_convertChoiceIndex( cur_index, this._indent );
	}
	
	// > 跳出分支（回调函数索引对应时）
    if( this._branch[this._indent] !== cur_index ){
        this.skipBranch();
    }
    return true;
};
//==============================
// * 多选项合并 - 【信息 > 显示选项】 - "当取消(分支)时"
//==============================
	//Game_Interpreter.prototype.command403
	//（暂不继承）
//==============================
// * 多选项合并 - 【信息 > 显示选项】 - "结束"（覆写）
//==============================
Game_Interpreter.prototype.command404 = function(){
	
	// > 合并
	if( this._drill_DCBo_combined_actived[this._indent] == true ){
		
		// > 合并 - 检查清理配置
		this.drill_DCBo_checkClearCombineIn404(this._indent);
	}
    return true;
};



//=============================================================================
// ** ☆管辖权（输入权限）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 4D选择项输入《对话框-选择项窗口》（2G键盘与手柄） - 确定键（继承）
//==============================
Window_ChoiceList.prototype.isOkTriggered = function(){
    return Input.isTriggered('ok');
};
//==============================
// * 4D选择项输入《对话框-选择项窗口》（2G键盘与手柄） - 确定键的可用情况
//==============================
	//	（无）
//==============================
// * 4D选择项输入《对话框-选择项窗口》（2G键盘与手柄） - 取消键
//==============================
	//	（无）
//==============================
// * 4D选择项输入《对话框-选择项窗口》（2G键盘与手柄） - 取消键的可用情况（继承）
//==============================
Window_ChoiceList.prototype.isCancelEnabled = function(){
    return $gameMessage.choiceCancelType() !== -1;
};
*/

//=============================================================================
// ** ☆输入权限 实现
//
//			说明：	> 此模块提供 输入权限 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 输入权限 - 4D选择项输入 - 确定键的可用情况（继承）
//==============================
var _drill_DCBo_input_isOkEnabled = Window_ChoiceList.prototype.isOkEnabled;
Window_ChoiceList.prototype.isOkEnabled = function(){
	if( this.drill_DCBo_isInputEnabled() == false ){ return false; }
	return _drill_DCBo_input_isOkEnabled.call(this);
};
//==============================
// * 输入权限 - 4D选择项输入 - 取消键的可用情况（继承）
//==============================
var _drill_DCBo_input_isCancelEnabled = Window_ChoiceList.prototype.isCancelEnabled;
Window_ChoiceList.prototype.isCancelEnabled = function(){
	if( this.drill_DCBo_isInputEnabled() == false ){ return false; }
    return _drill_DCBo_input_isCancelEnabled.call(this);
};
//==============================
// * 输入权限 - 2D指针 - 指针是否可移动（继承）
//
//			说明：	> 此设置与按钮组功能相关，使得鼠标点击按钮无效。
//==============================
var _drill_DCBo_input_isCursorMovable = Window_ChoiceList.prototype.isCursorMovable;
Window_ChoiceList.prototype.isCursorMovable = function(){
	if( this.drill_DCBo_isInputEnabled() == false ){ return false; }
    return _drill_DCBo_input_isCursorMovable.call(this);
};

//#############################################################################
// ** ☆输入权限 标准模块
//
//			说明：	> 即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 输入权限 - 是否启用输入【标准接口】
//
//			参数：	> 无
//			返回：	> 布尔
//
//			说明：	> 子插件可根据情况来继承，控制 选择项窗口 的输入权限。
//##############################
Window_ChoiceList.prototype.drill_DCBo_isInputEnabled = function(){
	return true;
};



//=============================================================================
// ** ☆可见控制 实现
//
//			说明：	> 此模块提供 输入权限 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 可见控制 - 刷新时
//==============================
var _drill_DCBo_visible_refresh = Window_ChoiceList.prototype.refresh;
Window_ChoiceList.prototype.refresh = function(){
	
	// > 刷新可见一次
	this.drill_DCBo_refreshVisible();
	
	// > 原函数
	_drill_DCBo_visible_refresh.call(this);
};
//==============================
// * 可见控制 - 刷新时 - 刷新可见一次
//==============================
Window_ChoiceList.prototype.drill_DCBo_refreshVisible = function(){
	if( this.drill_DCBo_isVisible() == true ){
		this.visible = true;
	}else{
		this.visible = false;
	}
};

//#############################################################################
// ** ☆可见控制 标准模块
//
//			说明：	> 即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 可见控制 - 是否可见【标准接口】
//
//			参数：	> 无
//			返回：	> 布尔
//
//			说明：	> 该函数不在 帧刷新 中调用，不能实时变化可见。
//##############################
Window_ChoiceList.prototype.drill_DCBo_isVisible = function(){
	return true;
};



//=============================================================================
// ** ☆选择结束时 实现
//
//			说明：	> 此模块提供 选择结束时 的接口。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 选择结束时 - 最后继承1级
//==============================
var _drill_DCBo_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_DCBo_scene_initialize.call(this);
	
	//==============================
	// * 选择结束时 - 执行取消键 - 回调函数（继承）
	//==============================
	var _drill_DCBo_choiceEnd_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
	Window_ChoiceList.prototype.callOkHandler = function(){
		_drill_DCBo_choiceEnd_callOkHandler.call(this);
		this.drill_DCBo_whenChoiceEnd();		//（选择结束时）
	};
	//==============================
	// * 选择结束时 - 执行取消键 - 回调函数（继承）
	//==============================
	var _drill_DCBo_choiceEnd_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler;
	Window_ChoiceList.prototype.callCancelHandler = function(){
		_drill_DCBo_choiceEnd_callCancelHandler.call(this);
		this.drill_DCBo_whenChoiceEnd();		//（选择结束时）
	};
}

//#############################################################################
// ** ☆选择结束时 标准模块
//
//			说明：	> 即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 选择结束时 - 执行函数【标准接口】
//
//			参数：	> 无
//			返回：	> 无
//
//			说明：	> 选择结束时，执行的函数。
//##############################
Window_ChoiceList.prototype.drill_DCBo_whenChoiceEnd = function(){
	//（可继承）
};



//=============================================================================
// ** ☆管辖权（默认选中）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 4A选择项控制《对话框-选择项窗口》 - 选择默认
//==============================
Window_ChoiceList.prototype.selectDefault = function(){
    this.select($gameMessage.choiceDefaultType());
};
*/

//=============================================================================
// ** ☆默认选中
//
//			说明：	> 此模块控制 默认选中 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 默认选中 - 选择默认
//==============================
var _drill_DCBo_sel_selectDefault = Window_ChoiceList.prototype.selectDefault;
Window_ChoiceList.prototype.selectDefault = function(){
	_drill_DCBo_sel_selectDefault.call(this);
	
	// > 覆盖选择
	if( $gameSystem._drill_DCBo_defaultSelected != -1 ){
		this.select( $gameSystem._drill_DCBo_defaultSelected );
	}
};
//==============================
// * 默认选中 - 选择结束时
//==============================
var _drill_DCBo_sel_whenChoiceEnd = Window_ChoiceList.prototype.drill_DCBo_whenChoiceEnd;
Window_ChoiceList.prototype.drill_DCBo_whenChoiceEnd = function(){
	_drill_DCBo_sel_whenChoiceEnd.call(this);
	$gameSystem._drill_DCBo_defaultSelected = -1;
};



//=============================================================================
// ** ☆管辖权（列数与行高）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 4A选择项控制《对话框-选择项窗口》 - 执行窗口
//
//			说明：	> 对话框执行子窗口时，会执行一次此函数。
//==============================
Window_ChoiceList.prototype.start = function(){
    this.updatePlacement();		//（4B位置刷新）
    this.updateBackground();	//（4C背景刷新）
    this.refresh();				//（来自函数 Window_Command.prototype.refresh ）
    this.selectDefault();
    this.open();
    this.activate();
};
*/
/*
//==============================
// * 4B位置刷新《对话框-选择项窗口》 - 刷新 - 最大选项宽度
//==============================
Window_ChoiceList.prototype.maxChoiceWidth = function(){
    var maxWidth = 96;
    var choices = $gameMessage.choices();
    for( var i = 0; i < choices.length; i++ ){
        var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
        if( maxWidth < choiceWidth ){
            maxWidth = choiceWidth;
        }
    }
    return maxWidth;
};
*/
/*
//==============================
// * 3A命令窗口属性《对话框-选择项窗口》 - 窗口宽度（覆写）
//==============================
Window_ChoiceList.prototype.windowWidth = function(){
    var width = this.maxChoiceWidth() + this.padding * 2;
    return Math.min(width, Graphics.boxWidth);
};
//==============================
// * 3A命令窗口属性《对话框-选择项窗口》 - 窗口高度
//==============================
	// （无，默认受 最大可见行数 控制）
//==============================
// * 3A命令窗口属性《对话框-选择项窗口》 - 窗口高度 - 最大可见行数（覆写）
//==============================
Window_ChoiceList.prototype.numVisibleRows = function(){
    var messageY = this._messageWindow.y;
    var messageHeight = this._messageWindow.height;
    var centerY = Graphics.boxHeight / 2;
    var choices = $gameMessage.choices();
    var numLines = choices.length;
    var maxLines = 8;
    if( messageY < centerY && messageY + messageHeight > centerY ){
        maxLines = 4;
    }
    if( numLines > maxLines ){
        numLines = maxLines;
    }
    return numLines;
};
//==============================
// * 3A命令窗口属性《对话框-选择项窗口》 - 对齐方式
//==============================
	// （无，默认 左对齐）
*/

//=============================================================================
// ** ☆列数与行高
//
//			说明：	> 此模块控制 列数与行高 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 列数与行高 - 初始化时
//==============================
var _drill_DCBo_col_initialize = Window_ChoiceList.prototype.initialize;
Window_ChoiceList.prototype.initialize = function( messageWindow ){
	_drill_DCBo_col_initialize.call( this, messageWindow );
	$gameSystem._drill_DCBo_nextCol = -1;		//列数
	$gameSystem._drill_DCBo_nextMinWidth = -1;	//选项最小宽度
	this._drill_DCBo_maxItemHeight = 36;		//选项最大高度
};
//==============================
// * 列数与行高 - 选择结束时
//==============================
var _drill_DCBo_col_whenChoiceEnd = Window_ChoiceList.prototype.drill_DCBo_whenChoiceEnd;
Window_ChoiceList.prototype.drill_DCBo_whenChoiceEnd = function(){
	_drill_DCBo_col_whenChoiceEnd.call(this);
	$gameSystem._drill_DCBo_nextCol = -1;		//列数
	$gameSystem._drill_DCBo_nextMinWidth = -1;	//选项最小宽度
	this._drill_DCBo_maxItemHeight = 36;		//选项最大高度
};

//==============================
// * 列数与行高 - 列数（覆写）
//==============================
Window_ChoiceList.prototype.maxCols = function(){
	if( $gameSystem._drill_DCBo_nextCol > 0 ){		//（列数）
		return $gameSystem._drill_DCBo_nextCol;
	}
	return 1;
};
//==============================
// * 列数与行高 - 窗口宽度（覆写）
//==============================
Window_ChoiceList.prototype.windowWidth = function(){
    var width = this.maxChoiceWidth()*this.maxCols() + this.padding * 2;	//（列数相关计算）
    return Math.min(width, Graphics.boxWidth);
};
//==============================
// * 列数与行高 - 窗口宽度 - 最大选项宽度（覆写）
//==============================
Window_ChoiceList.prototype.maxChoiceWidth = function(){
	
	// > 选项最小宽度
    var maxWidth = 96;
	if( $gameSystem._drill_DCBo_nextMinWidth > 0 ){
		maxWidth = $gameSystem._drill_DCBo_nextMinWidth;
	}
	
	// > 文本宽度撑开
    var choices = $gameMessage.choices();
    for( var i = 0; i < choices.length; i++ ){
        var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
        if( maxWidth < choiceWidth ){
            maxWidth = choiceWidth;
        }
    }
    return maxWidth;
};
//==============================
// * 列数与行高 - 窗口宽度 - 最大选项宽度 - 获取文本宽度
//
//			说明：	> 该函数已经被 对话框-对话框优化核心 兼容，所以此处不需要再专门控制。
//==============================
	//Window_ChoiceList.prototype.textWidthEx

//==============================
// * 列数与行高 - 窗口高度 - 执行窗口时
//==============================
var _drill_DCBo_col_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function(){
	
	// > 刷新选项最大高度
	this.drill_DCBo_refreshMaxChoiceHeight();
	
	// > 原函数
	_drill_DCBo_col_start.call(this);
};
//==============================
// * 列数与行高 - 窗口高度 - 执行窗口时 - 刷新选项最大高度
//
//			说明：	> 选项最大高度 会在帧刷新中被反复获取，所以这里使用临时变量，临时刷一次。
//==============================
Window_ChoiceList.prototype.drill_DCBo_refreshMaxChoiceHeight = function(){
	var maxHeight = 36;
	var choices = $gameMessage.choices();
	for( var i = 0; i < choices.length; i++ ){
		var text = choices[i];
		var text_height = this.drill_COWC_getOrgTextHeight( text, {} );	//（窗口字符计算高度）
		if( maxHeight < text_height ){
			maxHeight = text_height;
		}
	}
	this._drill_DCBo_maxItemHeight = maxHeight;
};
//==============================
// * 列数与行高 - 窗口高度 - 获取高度值（覆写）
//==============================
Window_ChoiceList.prototype.fittingHeight = function( numLines ){
    return numLines * this._drill_DCBo_maxItemHeight + this.standardPadding() * 2;	//（行数 * 选项最大高度）
};
//==============================
// * 列数与行高 - 窗口高度 - 子项高度（覆写）
//==============================
Window_ChoiceList.prototype.itemHeight = function(){
    return this._drill_DCBo_maxItemHeight;	//（选项最大高度）
};
//==============================
// * 列数与行高 - 窗口高度 - 最大可见行数（覆写）
//==============================
Window_ChoiceList.prototype.numVisibleRows = function(){
	
	// > 最大可见行数
	var messageY = this._messageWindow.y;
	var messageHeight = this._messageWindow.height;
	var centerY = Graphics.boxHeight / 2;
	var maxLines = 8;
	if( messageY < centerY && messageY + messageHeight > centerY ){
		maxLines = 4;
	}
	
	// > 当前行数
	var choices = $gameMessage.choices();
	var numLines = choices.length;
	if( this._drill_DCBo_resultChoiceList != undefined ){	//（显示的命令列表）
		numLines = this._drill_DCBo_resultChoiceList.length;
	}
	numLines = Math.ceil( numLines/this.maxCols() );		//（列数相关计算）
	
	// > 行数限制
	if( numLines > maxLines ){
		numLines = maxLines;
	}
	return numLines;
};



//=============================================================================
// ** ☆管辖权（置灰与隐藏）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 4A选择项控制《对话框-选择项窗口》 - 创建命令列表
//==============================
Window_ChoiceList.prototype.makeCommandList = function(){
    var choices = $gameMessage.choices();
    for( var i = 0; i < choices.length; i++ ){
        this.addCommand(choices[i], 'choice');
    }
};
*/
/*
//==============================
// * 4D选择项输入《对话框-选择项窗口》（2E输入触发） - 执行 确定键 - 回调函数（继承）
//==============================
Window_ChoiceList.prototype.callOkHandler = function(){
    $gameMessage.onChoice(this.index());
    this._messageWindow.terminateMessage();
    this.close();
};
//==============================
// * 4D选择项输入《对话框-选择项窗口》（2E输入触发） - 执行 取消键 - 回调函数（继承）
//==============================
Window_ChoiceList.prototype.callCancelHandler = function(){
    $gameMessage.onChoice($gameMessage.choiceCancelType());
    this._messageWindow.terminateMessage();
    this.close();
};
*/

//=============================================================================
// ** ☆置灰与隐藏
//
//			说明：	> 此模块控制 置灰、隐藏、洗牌算法 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 置灰与隐藏 - 执行窗口时
//==============================
var _drill_DCBo_gray_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function(){
	
	// > 刷新 显示的命令列表
	this.drill_DCBo_refreshChoiceData();
	
	// > 原函数
	_drill_DCBo_gray_start.call(this);
};
//==============================
// * 置灰与隐藏 - 执行窗口时 - 刷新 显示的命令列表
//
//			说明：	> 因为需要提前刷新并获取到 洗牌+隐藏 之后的行数，所以绑定在 Window_ChoiceList.prototype.start 函数中了。
//					  行数函数可见：Window_ChoiceList.prototype.numVisibleRows，在 Window_ChoiceList.prototype.updatePlacement 中执行了一次。
//==============================
Window_ChoiceList.prototype.drill_DCBo_refreshChoiceData = function(){
	
	// > 原始选项列表（合并+无隐藏+顺序对应）
    var choice_org_list = $gameMessage.choices();
	
	// > 排列前的列表
	var choice_change_list = [];
    for( var i = 0; i < choice_org_list.length; i++ ){
		var text = choice_org_list[i];
		var symbol = "choice" + String(i);
		
		// > 排列前的列表 - 置灰列表
		var enabled = true;
		if( $gameSystem._drill_DCBo_greyIndexMap[i] == true ){
			enabled = false;
		}
		
		// > 排列前的列表 - 隐藏列表
		if( $gameSystem._drill_DCBo_hideIndexMap[i] == true ){
			continue;
		}
		
		var choice_data = {};
		choice_data["text"] = text;
		choice_data["symbol"] = symbol;
		choice_data["enabled"] = enabled;
		choice_change_list.push( choice_data );
    }
	
	// > 洗牌算法
	if( $gameSystem._drill_DCBo_randomOptionEnabled == true ){
		for( var j = choice_change_list.length - 1; j > 0; j-- ){
			
			// > 洗牌算法 - 随机数（每一轮都生成一次）
			var randomIndex = Math.floor(Math.random() * (j + 1));	//『随机因子-玩法用』
			
			// > 洗牌算法 - 交换
			var temp_data = choice_change_list[j];
			choice_change_list[j] = choice_change_list[randomIndex];
			choice_change_list[randomIndex] = temp_data;
		}
	}
	
	// > 排列后的列表
	var result_list = [];
    for( var k = 0; k < choice_change_list.length; k++ ){
		var choice_data = choice_change_list[k];
		
		// > 排列后的列表 - 排列后置灰列表
		if( $gameSystem._drill_DCBo_afterGreyIndexMap[k] == true ){
			choice_data["enabled"] = false;
		}
		
		// > 排列后的列表 - 排列后隐藏列表
		if( $gameSystem._drill_DCBo_afterHideIndexMap[k] == true ){
			continue;
		}
		
		result_list.push( choice_data );
	}
	
	// > 显示的命令列表
	this._drill_DCBo_resultChoiceList = result_list;
};
//==============================
// * 置灰与隐藏 - 创建命令列表（覆写）
//
//			说明：	> 该函数被专门覆写。
//==============================
Window_ChoiceList.prototype.makeCommandList = function(){
	
	// > 显示的命令列表 - 创建
	if( this._drill_DCBo_resultChoiceList != undefined ){
		for( var k = 0; k < this._drill_DCBo_resultChoiceList.length; k++ ){
			var choice_data = this._drill_DCBo_resultChoiceList[k];
			this.addCommand(choice_data["text"], choice_data["symbol"], choice_data["enabled"]);
		}
	}
};
//==============================
// * 置灰与隐藏 - 获取命令文本
//==============================
var _drill_DCBo_gray_commandName = Window_ChoiceList.prototype.commandName;
Window_ChoiceList.prototype.commandName = function( index ){
	var text = _drill_DCBo_gray_commandName.call( this, index );
	if( text != undefined && text != "" &&
		this._drill_DCBo_resultChoiceList != undefined ){
		
		// > 置灰的文本
		var choice_data = this._drill_DCBo_resultChoiceList[index];
		if( choice_data["enabled"] != true ){
			text = $gameSystem._drill_DCBo_greyPrefix + text + $gameSystem._drill_DCBo_greySuffix;
		}
	}
    return text;
};

//==============================
// * 置灰与隐藏 - 执行确定键 - 回调函数（覆写）
//
//			说明：	> 该函数被专门覆写。
//==============================
Window_ChoiceList.prototype.callOkHandler = function(){
    var symbol = this.currentSymbol();
	var real_index = Number( symbol.replace("choice","") );
	
	$gameMessage.onChoice(real_index);	//（隐藏+排序后，index会变，通过symbol识别）
    this._messageWindow.terminateMessage();
    this.close();
};
//==============================
// * 置灰与隐藏 - 选择结束时
//==============================
var _drill_DCBo_gray_whenChoiceEnd = Window_ChoiceList.prototype.drill_DCBo_whenChoiceEnd;
Window_ChoiceList.prototype.drill_DCBo_whenChoiceEnd = function(){
	_drill_DCBo_gray_whenChoiceEnd.call(this);
	$gameSystem._drill_DCBo_greyIndexMap = {};
	$gameSystem._drill_DCBo_hideIndexMap = {};
	$gameSystem._drill_DCBo_afterGreyIndexMap = {};
	$gameSystem._drill_DCBo_afterHideIndexMap = {};
	$gameSystem._drill_DCBo_randomOptionEnabled = false;
};



//=============================================================================
// ** ☆管辖权（绘制单个子项）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 2A子项 - 绘制单个子项（继承）
//==============================
Window_ChoiceList.prototype.drawItem = function( index ){
    var rect = this.itemRectForText(index);
    this.drawTextEx(this.commandName(index), rect.x, rect.y);
};
*/

//=============================================================================
// ** ☆绘制单个子项
//
//			说明：	> 此模块控制 绘制单个子项 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 绘制单个子项 - 执行绘制（覆写）
//==============================
Window_ChoiceList.prototype.drawItem = function( index ){
	this.drill_DCBo_drawItem( index );
};
//==============================
// * 绘制单个子项 - 执行绘制
//
//			说明：	> 该函数是一个单独定义的函数，参考了 Window_Command.prototype.drawItem 结构。
//==============================
Window_ChoiceList.prototype.drill_DCBo_drawItem = function( index ){
	var rect = this.itemRectForText(index);
	
	// > 参数准备 - 校验
	var temp_bitmap = this.contents;
	if( temp_bitmap == undefined ){ return; }
	var org_text = this.commandName(index);
	if( org_text == undefined ){ return; }
	if( org_text == "" ){ return; }
	
	// > 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = rect.x;
	options['infoParam']['y'] = rect.y;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 参数准备 - 自定义
	options['rowParam'] = {};
	options['rowParam']['alignHor_maxWidth'] = rect.width;		//『选项的文本域范围』
	options['rowParam']['alignVer_maxHeight'] = rect.height;	//
	
	
	// > 清空画布（这里在连续绘制选项，不要清空）
	//temp_bitmap.clear();
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
};



//=============================================================================
// ** ☆引擎兼容（STG）
//
//			说明：	> 此模块对引擎进行专门兼容。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 引擎兼容 - 插件指令『STG的插件指令』
//==============================
if( Imported.Drill_STG__objects ){
	
	//==============================
	// * 插件指令 - STG指令绑定
	//==============================
	var _drill_STG_DCBo_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_DCBo_pluginCommand.call(this, command, args);
		this.drill_DCBo_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_DCBo_pluginCommand = Game_Interpreter.prototype.drill_DCBo_pluginCommand;
};
//==============================
// * 引擎兼容 - 多选项合并（STG）
//==============================
if( Imported.Drill_STG__objects ){
	
	//==============================
	// * 多选项合并（STG） - 管理器（继承）『多场景与对话框-STG界面』
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_DCBo_clearAllCombine = Game_Interpreter.prototype.drill_DCBo_clearAllCombine;
	Drill_STG_GameInterpreter.prototype.drill_DCBo_checkClearCombineIn404 = Game_Interpreter.prototype.drill_DCBo_checkClearCombineIn404;
	Drill_STG_GameInterpreter.prototype.drill_DCBo_initCombine = Game_Interpreter.prototype.drill_DCBo_initCombine;
	Drill_STG_GameInterpreter.prototype.drill_DCBo_addOne102Index = Game_Interpreter.prototype.drill_DCBo_addOne102Index;
	Drill_STG_GameInterpreter.prototype.drill_DCBo_getCombinedChoiceList = Game_Interpreter.prototype.drill_DCBo_getCombinedChoiceList;
	Drill_STG_GameInterpreter.prototype.drill_DCBo_convertChoiceIndex = Game_Interpreter.prototype.drill_DCBo_convertChoiceIndex;
	
	//==============================
	// * 多选项合并（STG） - 重置数据（继承）『多场景与对话框-STG界面』
	//==============================
	var _drill_DCBo_STG_Interpreter_clear = Drill_STG_GameInterpreter.prototype.drill_clear;
	Drill_STG_GameInterpreter.prototype.drill_clear = function(){
		_drill_DCBo_STG_Interpreter_clear.call(this);
		this.drill_DCBo_clearAllCombine();		//（清理全部配置）
	};
	//==============================
	// * 多选项合并（STG） - 【信息 > 显示选项】『多场景与对话框-STG界面』
	//==============================
		//（暂不继承）
	//==============================
	// * 多选项合并（STG） - 【信息 > 显示选项】 - 建立选项（覆写）『多场景与对话框-STG界面』
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_setupChoices = function( params ){
		
		// > （STG）合并 - 索引+1
		this.drill_DCBo_addOne102Index(this._drill_indent);
		
		// > （STG）合并 - 已激活合并时，跳过建立选项
		if( this._drill_DCBo_combined_actived[this._drill_indent] == true ){ return; }
		
		
		// > （STG）参数准备
		var choices = params[0].clone();
		var cancelType = params[1];
		var defaultType = params.length > 2 ? params[2] : 0;
		var positionType = params.length > 3 ? params[3] : 2;
		var background = params.length > 4 ? params[4] : 0;
		
		// > （STG）遍历指令
		this.drill_DCBo_initCombine( this._drill_list, this._drill_index, this._drill_indent );
		var combind_choice = this.drill_DCBo_getCombinedChoiceList(this._drill_indent);
		if( combind_choice.length > 0 ){
			choices = combind_choice;
		}
		
		// > （STG）参数赋值
		if( cancelType >= choices.length ){ cancelType = -2; }
		$gameMessage.setChoices(choices, defaultType, cancelType);
		$gameMessage.setChoiceBackground(background);
		$gameMessage.setChoicePositionType(positionType);
		
		// > （STG）参数赋值 - 回调函数
		$gameMessage.setChoiceCallback( Drill_STG_GameInterpreter.prototype.drill_DCBo_choiceCallback.bind(this) );
	};
	//==============================
	// * 多选项合并（STG） - 【信息 > 显示选项】 - 回调函数『多场景与对话框-STG界面』
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_DCBo_choiceCallback = function( n ){
		this._drill_branch[this._drill_indent] = n;
	};
	//==============================
	// * 多选项合并（STG） - 【信息 > 显示选项】 - "选择 xxx 时"『多场景与对话框-STG界面』
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_STG_command402 = function(){
		
		// > （STG）参数准备
		var cur_index = this._drill_params[0];
		
		// > （STG）合并
		if( this._drill_DCBo_combined_actived[this._drill_indent] == true ){
			cur_index = this.drill_DCBo_convertChoiceIndex( cur_index, this._drill_indent );
		}
		
		// > （STG）跳出分支（回调函数索引对应时）
		if( this._drill_branch[this._drill_indent] !== cur_index ){
			this.drill_skipBranch();
		}
		return true;
	};
	//==============================
	// * 多选项合并（STG） - 【信息 > 显示选项】 - "当取消(分支)时"『多场景与对话框-STG界面』
	//==============================
		//（暂不继承）
	//==============================
	// * 多选项合并（STG） - 【信息 > 显示选项】 - "结束"『多场景与对话框-STG界面』
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_STG_command404 = function(){
		
		// > （STG）合并
		if( this._drill_DCBo_combined_actived[this._drill_indent] == true ){
			
			// > （STG）合并 - 检查清理配置
			this.drill_DCBo_checkClearCombineIn404(this._drill_indent);
		}
		return true;
	};
};

//=============================================================================
// ** ☆引擎兼容（ACT）
//
//			说明：	> 此模块对引擎进行专门兼容。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 引擎兼容 - 插件指令『ACT的插件指令』
//==============================
if( Imported.Drill_ACT__objects ){
	
	//==============================
	// * 插件指令 - ACT指令绑定
	//==============================
	var _drill_ACT_DCBo_pluginCommand = Drill_ACT_GameInterpreter.prototype.pluginCommand;
	Drill_ACT_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_ACT_DCBo_pluginCommand.call(this, command, args);
		this.drill_DCBo_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - ACT指令执行
	//==============================
	Drill_ACT_GameInterpreter.prototype.drill_DCBo_pluginCommand = Game_Interpreter.prototype.drill_DCBo_pluginCommand;
};
//==============================
// * 引擎兼容 - 多选项合并（ACT）
//==============================
if( Imported.Drill_ACT__objects ){
	
	//==============================
	// * 多选项合并（ACT） - 管理器（继承）『多场景与对话框-ACT界面』
	//==============================
	Drill_ACT_GameInterpreter.prototype.drill_DCBo_clearAllCombine = Game_Interpreter.prototype.drill_DCBo_clearAllCombine;
	Drill_ACT_GameInterpreter.prototype.drill_DCBo_checkClearCombineIn404 = Game_Interpreter.prototype.drill_DCBo_checkClearCombineIn404;
	Drill_ACT_GameInterpreter.prototype.drill_DCBo_initCombine = Game_Interpreter.prototype.drill_DCBo_initCombine;
	Drill_ACT_GameInterpreter.prototype.drill_DCBo_addOne102Index = Game_Interpreter.prototype.drill_DCBo_addOne102Index;
	Drill_ACT_GameInterpreter.prototype.drill_DCBo_getCombinedChoiceList = Game_Interpreter.prototype.drill_DCBo_getCombinedChoiceList;
	Drill_ACT_GameInterpreter.prototype.drill_DCBo_convertChoiceIndex = Game_Interpreter.prototype.drill_DCBo_convertChoiceIndex;
	
	//==============================
	// * 多选项合并（ACT） - 重置数据（继承）『多场景与对话框-ACT界面』
	//==============================
	var _drill_DCBo_ACT_Interpreter_clear = Drill_ACT_GameInterpreter.prototype.drill_clear;
	Drill_ACT_GameInterpreter.prototype.drill_clear = function(){
		_drill_DCBo_ACT_Interpreter_clear.call(this);
		this.drill_DCBo_clearAllCombine();		//（清理全部配置）
	};
	//==============================
	// * 多选项合并（ACT） - 【信息 > 显示选项】『多场景与对话框-ACT界面』
	//==============================
		//（暂不继承）
	//==============================
	// * 多选项合并（ACT） - 【信息 > 显示选项】 - 建立选项（覆写）『多场景与对话框-ACT界面』
	//==============================
	Drill_ACT_GameInterpreter.prototype.drill_setupChoices = function( params ){
		
		// > （ACT）合并 - 索引+1
		this.drill_DCBo_addOne102Index(this._drill_indent);
		
		// > （ACT）合并 - 已激活合并时，跳过建立选项
		if( this._drill_DCBo_combined_actived[this._drill_indent] == true ){ return; }
		
		
		// > （ACT）参数准备
		var choices = params[0].clone();
		var cancelType = params[1];
		var defaultType = params.length > 2 ? params[2] : 0;
		var positionType = params.length > 3 ? params[3] : 2;
		var background = params.length > 4 ? params[4] : 0;
		
		// > （ACT）遍历指令
		this.drill_DCBo_initCombine( this._drill_list, this._drill_index, this._drill_indent );
		var combind_choice = this.drill_DCBo_getCombinedChoiceList(this._drill_indent);
		if( combind_choice.length > 0 ){
			choices = combind_choice;
		}
		
		// > （ACT）参数赋值
		if( cancelType >= choices.length ){ cancelType = -2; }
		$gameMessage.setChoices(choices, defaultType, cancelType);
		$gameMessage.setChoiceBackground(background);
		$gameMessage.setChoicePositionType(positionType);
		
		// > （ACT）参数赋值 - 回调函数
		$gameMessage.setChoiceCallback( Drill_ACT_GameInterpreter.prototype.drill_DCBo_choiceCallback.bind(this) );
	};
	//==============================
	// * 多选项合并（ACT） - 【信息 > 显示选项】 - 回调函数『多场景与对话框-ACT界面』
	//==============================
	Drill_ACT_GameInterpreter.prototype.drill_DCBo_choiceCallback = function( n ){
		this._drill_branch[this._drill_indent] = n;
	};
	//==============================
	// * 多选项合并（ACT） - 【信息 > 显示选项】 - "选择 xxx 时"『多场景与对话框-ACT界面』
	//==============================
	Drill_ACT_GameInterpreter.prototype.drill_ACT_command402 = function(){
		
		// > （ACT）参数准备
		var cur_index = this._drill_params[0];
		
		// > （ACT）合并
		if( this._drill_DCBo_combined_actived[this._drill_indent] == true ){
			cur_index = this.drill_DCBo_convertChoiceIndex( cur_index, this._drill_indent );
		}
		
		// > （ACT）跳出分支（回调函数索引对应时）
		if( this._drill_branch[this._drill_indent] !== cur_index ){
			this.drill_skipBranch();
		}
		return true;
	};
	//==============================
	// * 多选项合并（ACT） - 【信息 > 显示选项】 - "当取消(分支)时"『多场景与对话框-ACT界面』
	//==============================
		//（暂不继承）
	//==============================
	// * 多选项合并（ACT） - 【信息 > 显示选项】 - "结束"『多场景与对话框-ACT界面』
	//==============================
	Drill_ACT_GameInterpreter.prototype.drill_ACT_command404 = function(){
		
		// > （ACT）合并
		if( this._drill_DCBo_combined_actived[this._drill_indent] == true ){
			
			// > （ACT）合并 - 检查清理配置
			this.drill_DCBo_checkClearCombineIn404(this._drill_indent);
		}
		return true;
	};
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogChoiceBox = false;
		var pluginTip = DrillUp.drill_DCBo_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

