//=============================================================================
// Drill_DialogTextAlign.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        窗口字符 - 文本居中
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogTextAlign +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以控制横向左对齐、居中、右对齐；纵向顶部对齐、居中、底部对齐。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 *     需要该核心才能设置横向与纵向对齐。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   对所有窗口有效。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 *   了解文本居中原理，可以去看看 "23.窗口字符 > 关于文本居中.docx"。
 * 细节：
 *   (1.字符对所有窗口都有效，你可以在任何支持 窗口字符 的窗口中试试该字符。
 *   (2.文本居中控制的对象是 整行文本，不是单个字符。
 *   (3.如果对话框中有头像，插件会以除去头像外的剩余位置来居中适应。
 * 叠加情况：
 *   (1.同一行不能设置两个以上 居中/右对齐 字符，设置了只按第一个生效。
 *      同一行不能设置两个以上 居中/底部对齐 字符，设置了只按第一个生效。
 *   (2.左对齐需要写在当前行的开头位置，并且不能出现 居中/右对齐 字符，否则左对齐失效。
 * 设计：
 *   (1.你可以将居中、右对齐符号插入文本的中间，
 *      实现文本断开成两段或三段贴着窗口边缘显示。
 *   (2.你可以结合 行高控制器 和 文本居中 两个插件，自由修改文本。
 *      比如：居中的标题、短文的段落间隔、右对齐的署名等。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\dta[横向左对齐]     当前行和后面所有行都 横向左对齐。
 * 窗口字符：\dta[横向居中]       当前行和后面所有行都 横向居中。
 * 窗口字符：\dta[横向右对齐]     当前行和后面所有行都 横向右对齐。
 * 
 * 窗口字符：\dta[横切居中]       只当前行有效，该字符之后的文字 横向居中，可切断。
 * 窗口字符：\dta[横切右对齐]     只当前行有效，该字符之后的文字 横向右对齐，可切断。
 * 
 * 窗口字符：\dta[纵向顶部对齐]   当前行和后面所有行都 纵向顶部对齐。
 * 窗口字符：\dta[纵向居中]       当前行和后面所有行都 纵向居中。
 * 窗口字符：\dta[纵向底部对齐]   当前行和后面所有行都 纵向底部对齐。
 * 
 * 1.同一行不能设置两个以上 居中/右对齐 字符，设置了只按第一个生效。
 *   同一行不能设置两个以上 居中/底部对齐 字符，设置了只按第一个生效。
 * 2.左对齐需要写在当前行的开头位置，并且不能出现 居中/右对齐 字符，否则左对齐失效。
 *   （dta全称为：Drill_Text_Align）
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>文本居中 : DEBUG对齐方式 : 开启
 * 插件指令：>文本居中 : DEBUG对齐方式 : 关闭
 * 
 * 1.执行插件指令后，会弹出四个窗口。
 *   一个是 横向纵向对齐方式 的测试；另一个是 宝塔诗 的测试；
 *   最后是两个窗口合并成的 能力面板窗口 的测试。
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
 * 2.插件的消耗其实为4.94ms，由于只单次执行，所以几乎不考虑其消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了对话框中 使用姓名框+改变对话框宽度 时，卡死的bug。
 * [v1.2]
 * 修复了对话框连续使用 居中窗口字符 时失效的bug。
 * [v1.3]
 * 大幅度优化了 窗口字符核心 的底层，简化了居中的插件结构。
 * [v1.4]
 * 修复了 居中字符 在选项窗口中使用时，会多一点点偏移的bug。
 * [v1.5]
 * 修改了插件的分类。
 * [v1.6]
 * 大幅度修改了底层，并且兼容了新的底层结构。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DTA（Dialog_Text_Align）
//		临时全局变量	无
//		临时局部变量	this._drill_DTA_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	窗口字符管理层
//		★性能测试消耗	
//		★最坏情况		
//		★备注			
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
//			->☆窗口字符应用之效果字符
//				> \dta[]
//			->☆DEBUG对齐方式
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
//			   直接从底层就开始支持 对齐方式 的设置。
//			
//		★其它说明细节：
//			暂无
//		
//		★存在的问题：
//			暂无
//		
//		★旧日志（2024/9以前）：
//			1.因为 Window_Message 根本就没用到 drawTextEx 函数。
//			  所以需要额外进行一次捕获。
//			2.修改 textState.x 时，【千万注意！】
//			  宽度计算也基于此 textState.x 参数，如果套娃了，会无限叠加错位。
//			3.对话框 改变宽度 时，【不能马上计算宽度（绘制）】，否则会出现死循环。
//			  从函数的角度来看，这个看似简单的问题已经深入到了一个更深层次的死锁问题了，
//			  即使代码都有注释，且是我熟悉的地方，但是我发现无法深入，因为太复杂了。最后，用update绕开了死循环问题。
//			  2021-8-24 在newpage时，只执行一次计算，就不会死循环。
//			  （底层非常清晰，不应该存在问题，猜测是yep插件的问题，不过先这样吧……）
//			4.居中要一个非常麻烦的变量：字符宽度，而这个宽度，必须先绘制一次之后，才能得到。
//			  经过多次套娃与反套娃，终于实现了效果。
//			  不过理解时可能比较绕。具体去窗口辅助核心去看看。
//			5. \px[100] 字符也是个影响因素，只不过是最外层的影响因素，最后考虑。
//			6.问题：设置多行时，超过6行，右对齐和居中会产生偏移位置。（套娃bug，已发现并解决）
//			7.问题：信息面板k中，移动选项光标时，计算的字符长度会变长，原因不明。可以确定不是套娃问题。（行数+1的问题，这里又是比较绕的地方了）
//			8. 2022/4/16 窗口字符核心 进行了一次大翻新，文本居中根本就没那么复杂。
//			   先计算每行宽度（居中字符不纳入计算），居中字符再进行宽度变化。
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_DTA_PluginTip_curName = "Drill_DialogTextAlign.js 窗口字符-文本居中";
	DrillUp.g_DTA_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DTA_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DTA_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DTA_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DTA_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DTA_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogTextAlign = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogTextAlign');
	
	
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
var _drill_DTA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DTA_pluginCommand.call(this, command, args);
	this.drill_DTA_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DTA_pluginCommand = function( command, args ){
	if( command === ">文本居中" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG对齐方式" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_DTA_Align_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_DTA_Align_DebugEnabled = false;
					
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
var _drill_COWC_DTA_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWC_DTA_effect_processCombined.call( this, matched_index, matched_str, command, args );
	if( command == "dta" ){
		if( args.length == 1 ){
			
			// > 『窗口字符定义』 - \dta[横向左对齐]
			if( String(args[0]) == "横向左对齐" ){
				this.drill_COWC_effect_submitCombined( "@@@-a0" );
			}
			
			// > 『窗口字符定义』 - \dta[横向居中]
			if( String(args[0]) == "横向居中" ){
				this.drill_COWC_effect_submitCombined( "@@@-a1" );
			}
			
			// > 『窗口字符定义』 - \dta[横向右对齐]
			if( String(args[0]) == "横向右对齐" ){
				this.drill_COWC_effect_submitCombined( "@@@-a2" );
			}
			
			// > 『窗口字符定义』 - \dta[横切居中]
			if( String(args[0]) == "横切居中" ){
				this.drill_COWC_effect_submitCombined( "@@@-a3" );
			}
			
			// > 『窗口字符定义』 - \dta[横切右对齐]
			if( String(args[0]) == "横切右对齐" ){
				this.drill_COWC_effect_submitCombined( "@@@-a4" );
			}
			
			// > 『窗口字符定义』 - \dta[纵向顶部对齐]
			if( String(args[0]) == "纵向顶部对齐" ){
				this.drill_COWC_effect_submitCombined( "@@@-a5" );
			}
			
			// > 『窗口字符定义』 - \dta[纵向居中]
			if( String(args[0]) == "纵向居中" ){
				this.drill_COWC_effect_submitCombined( "@@@-a6" );
			}
			
			// > 『窗口字符定义』 - \dta[纵向底部对齐]
			if( String(args[0]) == "纵向底部对齐" ){
				this.drill_COWC_effect_submitCombined( "@@@-a7" );
			}
		}
	}
}


//=============================================================================
// ** ☆DEBUG对齐方式
//
//			说明：	> 此模块控制 DEBUG对齐方式 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG对齐方式 - 帧刷新（地图界面）
//==============================
var _drill_DTA_Align_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_DTA_Align_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_DTA_Align_DebugEnabled == true ){
		$gameTemp._drill_DTA_Align_DebugEnabled = undefined;
		this.drill_DTA_Align_createDebugSprite();
	}
	// > 销毁贴图
	if( $gameTemp._drill_DTA_Align_DebugEnabled == false ){
		$gameTemp._drill_DTA_Align_DebugEnabled = undefined;
		if( this._drill_DTA_Align_DebugSprite_1 != undefined ){
			this.removeChild(this._drill_DTA_Align_DebugSprite_1);
			this._drill_DTA_Align_DebugSprite_1 = undefined;
		}
		if( this._drill_DTA_Align_DebugSprite_2 != undefined ){
			this.removeChild(this._drill_DTA_Align_DebugSprite_2);
			this._drill_DTA_Align_DebugSprite_2 = undefined;
		}
		if( this._drill_DTA_Align_DebugSprite_3 != undefined ){
			this.removeChild(this._drill_DTA_Align_DebugSprite_3);
			this._drill_DTA_Align_DebugSprite_3 = undefined;
		}
		if( this._drill_DTA_Align_DebugSprite_4 != undefined ){
			this.removeChild(this._drill_DTA_Align_DebugSprite_4);
			this._drill_DTA_Align_DebugSprite_4 = undefined;
		}
	}
}
//==============================
// * DEBUG对齐方式 - 创建贴图
//==============================
Scene_Map.prototype.drill_DTA_Align_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_DTA_Align_DebugSprite_1 != undefined ){
		this.removeChild(this._drill_DTA_Align_DebugSprite_1);
		this._drill_DTA_Align_DebugSprite_1 = undefined;
	}
	if( this._drill_DTA_Align_DebugSprite_2 != undefined ){
		this.removeChild(this._drill_DTA_Align_DebugSprite_2);
		this._drill_DTA_Align_DebugSprite_2 = undefined;
	}
	if( this._drill_DTA_Align_DebugSprite_3 != undefined ){
		this.removeChild(this._drill_DTA_Align_DebugSprite_3);
		this._drill_DTA_Align_DebugSprite_3 = undefined;
	}
	if( this._drill_DTA_Align_DebugSprite_4 != undefined ){
		this.removeChild(this._drill_DTA_Align_DebugSprite_4);
		this._drill_DTA_Align_DebugSprite_4 = undefined;
	}
	
	// > 创建贴图1
	var temp_window = new Window_Base( 20, 60, 320, 200 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DTA_Align_DebugSprite_1 = temp_window;
	
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
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = true;
	
	// > 绘制 - 测试的字符
	var text =  "\\fs[18]【" + DrillUp.g_DTA_PluginTip_curName + "】\n" + 
				"横向对齐和纵向对齐的效果：\n" + 
				"左上角\\dta[横切居中]正上方\\dta[横切右对齐]右上角\n" + 
				"\\dta[纵向居中]正左方\\dta[横切居中]居中\\dta[横切右对齐]正右方\n" + 
				"\\dta[纵向底部对齐]左下角\\dta[横切居中]正下方\\dta[横切右对齐]右下角\n";
	temp_window.drill_COWC_drawText( text, options );
	
	
	// > 创建贴图2
	var temp_window = new Window_Base( 20, 260, 170, 310 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DTA_Align_DebugSprite_2 = temp_window;
	
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
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = false;
	
	// > 绘制 - 测试的字符
	var text =  "\\fs[16]【" + DrillUp.g_DTA_PluginTip_curName + "】\n" + 
				"全体单位能力：\n" + 
				"物理攻击：\\dta[横切右对齐]\\c[24]+24\\c[0]\n" + 
				"物理加成：\\dta[横切右对齐]\\c[24]+6.5%\\c[0]\n" + 
				"无视护甲：\\dta[横切右对齐]\\c[24]+5\\c[0]\n" + 
				"暴击率：\\dta[横切右对齐]\\c[0]+0.0%\\c[0]\n" + 
				"暴击伤害：\\dta[横切右对齐]\\c[24]+8.0%\\c[0]\n" + 
				"攻击速度：\\dta[横切右对齐]\\c[24]+3.5%\\c[0]\n" + 
				"攻击距离：\\dta[横切右对齐]\\c[24]+30\\c[0]\n" + 
				"\n" + 
				"生命上限：\\dta[横切右对齐]\\c[24]+150\\c[0]\n" + 
				"生命加成：\\dta[横切右对齐]\\c[0]+0.0%\\c[0]\n" + 
				"生命恢复：\\dta[横切右对齐]\\c[24]+1.0\\c[0]\n" + 
				"回血加成：\\dta[横切右对齐]\\c[0]+0.0%\\c[0]\n" + 
				"物品掉率：\\dta[横切右对齐]\\c[24]+5%\\c[0]\n";
	temp_window.drill_COWC_drawText( text, options );
	
	
	// > 创建贴图3
	var temp_window = new Window_Base( 170, 260, 170, 310 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DTA_Align_DebugSprite_3 = temp_window;
	
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
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = false;
	
	// > 绘制 - 测试的字符
	var text =  "\\fs[16]\n" + 
				"\n" + 
				"魔法攻击：\\dta[横切右对齐]\\c[0]+0\\c[0]\n" + 
				"魔法加成：\\dta[横切右对齐]\\c[24]+1.4%\\c[0]\n" + 
				"无视魔抗：\\dta[横切右对齐]\\c[0]+0\\c[0]\n" + 
				"物理吸血：\\dta[横切右对齐]\\c[0]+0.0%\\c[0]\n" + 
				"魔法吸血：\\dta[横切右对齐]\\c[24]+1.0%\\c[0]\n" + 
				"命中率：\\dta[横切右对齐]\\c[0]+0%\\c[0]\n" + 
				"多重施法：\\dta[横切右对齐]\\c[0]+0%\\c[0]\n" + 
				"\n" + 
				"物理防御：\\dta[横切右对齐]\\c[24]+2\\c[0]\n" + 
				"魔法防御：\\dta[横切右对齐]\\c[24]+1\\c[0]\n" + 
				"魔法恢复：\\dta[横切右对齐]\\c[24]+0.1\\c[0]\n" + 
				"闪避率：\\dta[横切右对齐]\\c[0]+0%\\c[0]\n" + 
				"经验加成：\\dta[横切右对齐]\\c[24]+10%\\c[0]\n";
	temp_window.drill_COWC_drawText( text, options );
	
	
	// > 创建贴图4
	var temp_window = new Window_Base( 350, 80, 450, 420 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_DTA_Align_DebugSprite_4 = temp_window;
	
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
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = true;
	
	// > 绘制 - 测试的字符
	var text =  "\\fs[18]【" + DrillUp.g_DTA_PluginTip_curName + "】\n" + 
				"《一七体诗•诗》\n\n" + 
				"\\dta[横向居中]诗\n\n" + 
				"绮美，瑰奇\n\n" + 
				"明月夜，落花时\n\n" + 
				"能助欢笑，亦伤别离\n\n" + 
				"调清金石怨，吟苦鬼神悲\n\n" + 
				"天下只应我爱，世间唯有君知\n\n" + 
				"自从都尉别苏句，便到司空送白辞\n" + 
				"\\dta[纵向底部对齐]\\dta[横向右对齐]——[唐]白居易\n";
	temp_window.drill_COWC_drawText( text, options );
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogTextAlign = false;
		var pluginTip = DrillUp.drill_DTA_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


