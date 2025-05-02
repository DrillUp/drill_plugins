//=============================================================================
// Drill_DialogTextLineHeight.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        窗口字符 - 行高控制器
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogTextLineHeight +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以使用窗口字符修改行高。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 *     需要该核心才能设置行高值。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   对所有窗口有效。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 *   了解行高控制器原理，可以去看看 "23.窗口字符 > 关于行高控制器.docx"。
 * 细节：
 *   (1.字符对所有窗口都有效，你可以在任何支持 窗口字符 的窗口中试试该字符。
 *   (2.行高控制的对象是 整行文本，不是单个字符。
 *   (3.此窗口字符放在行末尾无效，必须放第一个或者夹在字符中间才能生效。
 * 叠加情况：
 *   (1.行上增高 和 行下增高 可以叠加，行上补正 和 行下增高可以叠加，
 *      行上增高 和 行上补正 可以叠加但按增高效果值大的算。
 *      锁定行高只能单独使用，不能叠加。
 * 设计：
 *   (1.你可以结合 行高控制器 和 文本居中 两个插件，自由修改文本。
 *      比如：居中的标题、短文的段落间隔、右对齐的署名等。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\dtlh[后面行:行上增高:10]     当前行和后面所有行的行高向上扩10像素。
 * 窗口字符：\dtlh[后面行:行下增高:10]     当前行和后面所有行的行高向下扩10像素。
 * 窗口字符：\dtlh[后面行:锁定行高:24]     当前行和后面所有行的行高锁定为24像素。
 * 窗口字符：\dtlh[后面行:行上补正:24]     当前行和后面所有行，若行高没超过24像素，则补正到24像素高。
 * 窗口字符：\dtlh[后面行:清零设置]        当前行和后面所有行的行高设置清零，注意是清零。
 * 
 * 窗口字符：\dtlh[当前行:行上增高:10]     只当前行的行高向上扩10像素。
 * 窗口字符：\dtlh[当前行:行下增高:10]     只当前行的行高向下扩10像素。
 * 窗口字符：\dtlh[当前行:锁定行高:24]     只当前行的行高锁定为24像素。
 * 窗口字符：\dtlh[当前行:行上补正:24]     只当前行，若行高没超过24像素，则补正到24像素高。
 * 
 * 1.同一行不能设置两个以上字符，若多设置了则只按最后一个生效。
 * 2.行高控制的对象是 整行文本，不是单个字符。
 *   此窗口字符放在行末尾无效，必须放第一个或者夹在字符中间才能生效。
 * 3.行上增高 和 行下增高 可以叠加，行上补正 和 行下增高可以叠加，
 *   行上增高 和 行上补正 可以叠加但按增高效果值大的算。
 *   锁定行高只能单独使用，不能叠加。
 *   （dtlh全称为：Drill_Text_Line_Height）
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>行高控制器 : DEBUG行高效果显示 : 开启
 * 插件指令：>行高控制器 : DEBUG行高效果显示 : 关闭
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
 * 2.该插件只单次执行，并且只进行行高设置，所以几乎没有消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DTLH（Dialog_Text_Line_Height）
//		临时全局变量	无
//		临时局部变量	this._drill_DTLH_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	UI管理层
//		★性能测试消耗	2025/4/30：
//							》未找到，单次执行太快。消耗可能都在核心函数中。
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
//			->☆管辖权
//
//			->☆窗口字符应用之效果字符
//				> \dtlh[]
//			->☆全局默认值
//			x->☆重置控制
//
//			->☆DEBUG行高控制
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
//			1. 2024/9/14 编写了 字符绘制核心，两个月进行了全底层的翻新。
//			   直接从底层就开始支持 行高控制 的设置。
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
	DrillUp.g_DTLH_PluginTip_curName = "Drill_DialogTextLineHeight.js 窗口字符-行高控制器";
	DrillUp.g_DTLH_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DTLH_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DTLH_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DTLH_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DTLH_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DTLH_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_DTLH_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_DTLH_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogTextLineHeight = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogTextLineHeight');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
//==============================
// * >>>>基于插件检测>>>> - 窗口字符底层校验
//==============================
if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
	alert( DrillUp.drill_DTLH_getPluginTip_NeedUpdate_drawText() );
}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DTLH_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DTLH_pluginCommand.call(this, command, args);
	this.drill_DTLH_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DTLH_pluginCommand = function( command, args ){
	if( command === ">行高控制器" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG行高效果显示" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_DTLH_LineHeight_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_DTLH_LineHeight_DebugEnabled = false;
					
				}
			}
		}
	}
};


//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 组合符配置
//==============================
var _drill_COWC_DTLH_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_DTLH_effect_processCombined.call( this, matched_index, matched_str, command, args );
	if( command == "dtlh" ){
		if( args.length == 2 ){
			
			// > 『窗口字符定义』 - \dtlh[后面行:清零设置]
			if( String(args[0]) == "后面行" &&
				String(args[1]) == "清零设置" ){
				this.drill_COWC_effect_submitCombined( "@@@-l1[0]@@@-l2[0]@@@-l3[0]@@@-l4[0]" );
				return;
			}
		}
		if( args.length == 3 ){
			if( String(args[0]) == "后面行" ){
				
				// > 『窗口字符定义』 - \dtlh[后面行:行上增高:10]
				if( String(args[1]) == "行上增高" ){
					this.drill_COWC_effect_submitCombined( "@@@-l1["+ String(args[2]) +"]" );
					return;
				}
				// > 『窗口字符定义』 - \dtlh[后面行:行下增高:10]
				if( String(args[1]) == "行下增高" ){
					this.drill_COWC_effect_submitCombined( "@@@-l2["+ String(args[2]) +"]" );
					return;
				}
				// > 『窗口字符定义』 - \dtlh[后面行:锁定行高:24]
				if( String(args[1]) == "锁定行高" ){
					this.drill_COWC_effect_submitCombined( "@@@-l3["+ String(args[2]) +"]" );
					return;
				}
				// > 『窗口字符定义』 - \dtlh[后面行:行上补正:24]
				if( String(args[1]) == "行上补正" ){
					this.drill_COWC_effect_submitCombined( "@@@-l4["+ String(args[2]) +"]" );
					return;
				}
			}
			if( String(args[0]) == "当前行" ){
				
				// > 『窗口字符定义』 - \dtlh[当前行:行上增高:10]
				if( String(args[1]) == "行上增高" ){
					this.drill_COWC_effect_submitCombined( "@@@-l5["+ String(args[2]) +"]" );
					return;
				}
				// > 『窗口字符定义』 - \dtlh[当前行:行下增高:10]
				if( String(args[1]) == "行下增高" ){
					this.drill_COWC_effect_submitCombined( "@@@-l6["+ String(args[2]) +"]" );
					return;
				}
				// > 『窗口字符定义』 - \dtlh[当前行:锁定行高:24]
				if( String(args[1]) == "锁定行高" ){
					this.drill_COWC_effect_submitCombined( "@@@-l7["+ String(args[2]) +"]" );
					return;
				}
				// > 『窗口字符定义』 - \dtlh[当前行:行上补正:24]
				if( String(args[1]) == "行上补正" ){
					this.drill_COWC_effect_submitCombined( "@@@-l8["+ String(args[2]) +"]" );
					return;
				}
			}
		}
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
// * A默认属性『窗口字符-行高控制器』 - 默认行高
//==============================
Window_Base.prototype.lineHeight = function(){ return 36; };
*/


//=============================================================================
// ** ☆全局默认值
//
//			说明：	> 此处专门窗口相关控制操作。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 全局默认值 - 所有窗口的默认行高（覆写）
//
//			说明：	> 这个函数直接覆写，也不提供修改的余地。子插件会覆写此函数并提供参数。
//					> 因为修改成其它值，会影响所有窗口的行高计算，会缩小大部分窗口，不合适。
//==============================
Window_Base.prototype.lineHeight = function() {
	return 36;		//『全局默认值』 - 固定值
};
//==============================
// * 全局默认值 - 对话框的默认行高（覆写）
//
//			说明：	> 这个函数直接覆写，也不提供修改的余地。子插件会覆写此函数并提供参数。
//==============================
Window_Message.prototype.lineHeight = function() {
	return 36;
};
Window_Gold.prototype.lineHeight = Window_Message.prototype.lineHeight;
Window_ChoiceList.prototype.lineHeight = Window_Message.prototype.lineHeight;
Window_NumberInput.prototype.lineHeight = Window_Message.prototype.lineHeight;
Window_EventItem.prototype.lineHeight = Window_Message.prototype.lineHeight;


//=============================================================================
// ** ☆DEBUG行高控制
//
//			说明：	> 此模块控制 DEBUG行高控制 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG行高控制 - 帧刷新（地图界面）
//==============================
var _drill_DTLH_LineHeight_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_DTLH_LineHeight_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_DTLH_LineHeight_DebugEnabled == true ){
		$gameTemp._drill_DTLH_LineHeight_DebugEnabled = undefined;
		this.drill_DTLH_LineHeight_createDebugSprite();
	}
	// > 销毁贴图
	if( $gameTemp._drill_DTLH_LineHeight_DebugEnabled == false ){
		$gameTemp._drill_DTLH_LineHeight_DebugEnabled = undefined;
		if( this._drill_DTLH_LineHeight_DebugSprite_1 != undefined ){
			this.removeChild(this._drill_DTLH_LineHeight_DebugSprite_1);
			this._drill_DTLH_LineHeight_DebugSprite_1 = undefined;
		}
		if( this._drill_DTLH_LineHeight_DebugSprite_2 != undefined ){
			this.removeChild(this._drill_DTLH_LineHeight_DebugSprite_2);
			this._drill_DTLH_LineHeight_DebugSprite_2 = undefined;
		}
		if( this._drill_DTLH_LineHeight_DebugSprite_3 != undefined ){
			this.removeChild(this._drill_DTLH_LineHeight_DebugSprite_3);
			this._drill_DTLH_LineHeight_DebugSprite_3 = undefined;
		}
		if( this._drill_DTLH_LineHeight_DebugSprite_4 != undefined ){
			this.removeChild(this._drill_DTLH_LineHeight_DebugSprite_4);
			this._drill_DTLH_LineHeight_DebugSprite_4 = undefined;
		}
		if( this._drill_DTLH_LineHeight_DebugSprite_5 != undefined ){
			this.removeChild(this._drill_DTLH_LineHeight_DebugSprite_5);
			this._drill_DTLH_LineHeight_DebugSprite_5 = undefined;
		}
	}
}
//==============================
// * DEBUG行高控制 - 创建贴图
//==============================
Scene_Map.prototype.drill_DTLH_LineHeight_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_DTLH_LineHeight_DebugSprite_1 != undefined ){
		this.removeChild(this._drill_DTLH_LineHeight_DebugSprite_1);
		this._drill_DTLH_LineHeight_DebugSprite_1 = undefined;
	}
	if( this._drill_DTLH_LineHeight_DebugSprite_2 != undefined ){
		this.removeChild(this._drill_DTLH_LineHeight_DebugSprite_2);
		this._drill_DTLH_LineHeight_DebugSprite_2 = undefined;
	}
	if( this._drill_DTLH_LineHeight_DebugSprite_3 != undefined ){
		this.removeChild(this._drill_DTLH_LineHeight_DebugSprite_3);
		this._drill_DTLH_LineHeight_DebugSprite_3 = undefined;
	}
	if( this._drill_DTLH_LineHeight_DebugSprite_4 != undefined ){
		this.removeChild(this._drill_DTLH_LineHeight_DebugSprite_4);
		this._drill_DTLH_LineHeight_DebugSprite_4 = undefined;
	}
	if( this._drill_DTLH_LineHeight_DebugSprite_5 != undefined ){
		this.removeChild(this._drill_DTLH_LineHeight_DebugSprite_5);
		this._drill_DTLH_LineHeight_DebugSprite_5 = undefined;
	}
	
	// > 创建贴图1
	var temp_window = new Window_Base( 10, 160, 200, 400 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DTLH_LineHeight_DebugSprite_1 = temp_window;
	
	// > 绘制 - 矩形
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 2, "miter" );
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};			//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	// > 绘制 - 测试的字符
	var text =  "\\fs[20]行上补正[0]：\\dtlh[后面行:行上补正:0] <br>" + 	//（不能放行末尾至少要夹在字符中间）
				"<wordwrap>床不会问问题，床不会批评你，床不会与你抬杠，床也不会催你写插件，床永远在那等你，床很温暖，床很舒适，床很好。";
	temp_window.drill_COWC_drawText( text, options );
	
	
	// > 创建贴图2
	var temp_window = new Window_Base( 210, 160, 200, 400 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DTLH_LineHeight_DebugSprite_2 = temp_window;
	
	// > 绘制 - 矩形
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 2, "miter" );
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};			//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	// > 绘制 - 测试的字符
	var text =  "\\fs[20]行上补正[28]：\\dtlh[后面行:行上补正:28] <br>" + 	//（不能放行末尾至少要夹在字符中间）
				"<wordwrap>床不会问问题，床不会批评你，床不会与你抬杠，床也不会催你写插件，床永远在那等你，床很温暖，床很舒适，床很好。";
	temp_window.drill_COWC_drawText( text, options );
	
	
	// > 创建贴图3
	var temp_window = new Window_Base( 410, 160, 200, 400 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DTLH_LineHeight_DebugSprite_3 = temp_window;
	
	// > 绘制 - 矩形
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 2, "miter" );
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};			//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	// > 绘制 - 测试的字符
	var text =  "\\fs[20]行上补正[32]：\\dtlh[后面行:行上补正:32] <br>" + 	//（不能放行末尾至少要夹在字符中间）
				"<wordwrap>床不会问问题，床不会批评你，床不会与你抬杠，床也不会催你写插件，床永远在那等你，床很温暖，床很舒适，床很好。";
	temp_window.drill_COWC_drawText( text, options );
	
	
	// > 创建贴图4
	var temp_window = new Window_Base( 610, 160, 200, 400 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DTLH_LineHeight_DebugSprite_4 = temp_window;
	
	// > 绘制 - 矩形
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 2, "miter" );
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};			//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	// > 绘制 - 测试的字符
	var text =  "\\fs[20]行上补正[36]：\\dtlh[后面行:行上补正:36] <br>" + 	//（不能放行末尾至少要夹在字符中间）
				"<wordwrap>床不会问问题，床不会批评你，床不会与你抬杠，床也不会催你写插件，床永远在那等你，床很温暖，床很舒适，床很好。";
	temp_window.drill_COWC_drawText( text, options );
	
	
	// > 创建贴图5
	var temp_window = new Window_Base( 10, 20, 800, 140 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DTLH_LineHeight_DebugSprite_5 = temp_window;
	
	// > 绘制 - 矩形
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 2, "miter" );
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};			//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	// > 绘制 - 测试的字符
	var text =  "\\fs[20]【" + DrillUp.g_DTLH_PluginTip_curName + "】@@@-br" + 
				"下面四个窗口列举了不同补正行高时，每行文本的间距情况。@@@-br大量段落时，挤在一起的文本不好阅读，可以适当加一些行高补正来增加阅读性。";
	temp_window.drill_COWC_drawText( text, options );
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogTextLineHeight = false;
		var pluginTip = DrillUp.drill_DTLH_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


