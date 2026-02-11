//=============================================================================
// Drill_CoreOfWindowCharacterSprite.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        窗口字符 - 窗口字符贴图核心
 * @author Drill_up
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_CoreOfWindowCharacterSprite +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该核心提供 字符块贴图 的基础功能，能将窗口字符变成贴图。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v2.0及以上★★
 *     需要该核心才能创建字符块贴图。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于窗口字符。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 细节：
 *   (1.字符块：即多个常规字符打包成一组，并在文本域中生成一个贴图。
 *      字符块贴图：即多个常规字符打包后，形成的贴图对象。
 *      字符块和字符块贴图是一个意思。
 *      使用"\dts[一组字符]"，可以打包成字符块贴图。
 *   (2.你可以去看看文档 "23.窗口字符 > 关于窗口字符.docx" 中，
 *      功能的 窗口字符贴图 的章节介绍。
 *   (3.字符块可以设置翻转效果，
 *      比如"\dtsh[on]\dts[某文字]\dtsh[off]"
 *      表示将"某文字"字符块贴图进行横向翻转。
 * 设计：
 *   (1.一般的窗口字符中可以嵌套指代字符，比如"\c[\v[21]]"。
 *      这是因为 指代字符\v[21] 会先转成数字，再进行\c[]的效果。
 *      而字符块贴图设置包裹的优先级更高，比如"\c[6]\dts[\v[21]]"
 *      先执行"\dts[]"里层的效果字符，再执行外层的。
 *      也正因为先执行里层再执行外层，
 *      所以里层不会影响外层，而外层能影响里层，比如改变颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 字符块贴图
 * 使用该插件后，你可以使用下列窗口字符：
 * （注意，冒号之间没有空格，并且是英文冒号。）
 * 
 * 窗口字符：\dts[某文字]
 * 
 * 1."\dts"必须小写。
 *   "\dts[某文字]" 表示将 "某文字" 变成一个字符块贴图来显示。
 * 2.字符块 常用于在文本变色时、消息输入时，将多个字符作为一个整体显示。
 *   翻转字符、子插件的跳动字符，都基于字符块。
 *   （dts全称为：Drill_Text_Sprite）
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 翻转字符
 * 使用该插件后，你可以使用下列窗口字符：
 * 
 * 窗口字符：\dtsh[on]          之后的字符块贴图，开启横向翻转。
 * 窗口字符：\dtsh[off]         之后的字符块贴图，关闭横向翻转。
 * 窗口字符：\dtsv[on]          之后的字符块贴图，开启纵向翻转。
 * 窗口字符：\dtsv[off]         之后的字符块贴图，关闭纵向翻转。
 * 
 * 1.上述字符只对 字符块贴图 有效。
 * 2."\dtsh" 和 "\dtsv" 必须小写。
 *   使用 "\dtsh[on]\dts[翻转文字]\dtsh[off]" 可实现 "翻转文字" 的翻转。
 *   需要先开启翻转，然后才能对后面的字符块设置生效。
 *   （dtsh全称为：Drill_Text_Sprite_Horizontal）
 *   （dtsv全称为：Drill_Text_Sprite_Vertical）
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 贴图内边距
 * 使用该插件后，你可以使用下列窗口字符：
 * 
 * 窗口字符：\dtsp[5]            之后的字符块贴图，内边距上下左右5像素。
 * 窗口字符：\dtsp[5:10]         之后的字符块贴图，内边距上下5像素，左右10像素。
 * 窗口字符：\dtsp[5:5:10:10]    之后的字符块贴图，内边距上5，下5，左10，右10像素。
 * 窗口字符：\dtsp[reset]        之后的字符块贴图，内边距清零。
 * 
 * 1.上述字符只对 字符块贴图 有效。
 * 2."\dtsp" 必须小写。
 *   使用 "\dtsp[5]\dts[加宽内边距]\dtsp[reset]" 可实现 "加宽内边距" 文字向外扩宽5像素。
 *   （dtsp全称为：Drill_Text_Sprite_Padding）
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug字符
 * 使用该插件后，你可以使用下列窗口字符：
 * 
 * 窗口字符：\debug[显示字符块范围]      之后的字符块贴图，显示范围方框
 * 窗口字符：\debug[隐藏字符块范围]      之后的字符块贴图，取消显示范围方框
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>窗口字符贴图核心 : DEBUG贴图流程测试 : 开启
 * 插件指令：>窗口字符贴图核心 : DEBUG贴图流程测试 : 关闭
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   去各个管理层跑一圈测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *              战斗界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.你需要先把窗口字符变成字符块，然后该插件才会对字符块进行控制。
 *   如果只是纯文本，该插件不消耗性能，设置了很多字符块，该插件才会
 *   开始有一部分性能消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了 字符块 被清空的bug。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COWCSp（Core_Of_Window_Character_Sprite）
//		临时全局变量	DrillUp.g_COWCSp_xxx
//		临时局部变量	this._drill_COWCSp_xxx
//		存储数据变量	$gameSystem._drill_COWCSp_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	窗口字符管理层
//		★性能测试消耗	2025/4/30：
//							》0.1ms（drill_COWCSp_timing_initData）19.6ms（drill_COWCSp_Text_createDebugSprite）
//							》『TotalTime』：13.1ms（drill_COWCSp_timing_initData）
//		★最坏情况		暂无
//		★备注			字符块数量少的时候，消耗不大，但由于平时每次绘制都会调用检查函数，所以TotalTime会很大。
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
//			
//			->☆流程介绍 标准模块
//				->绘制文本(固定高宽)【标准函数】【Window_Base】
//				->绘制文本(自适应高宽)【标准函数】【Window_Base】
//			->☆DEBUG贴图流程测试
//			
//			--------------------------
//			
//			
//			->☆字符块贴图 标准模块
//				->刷新当前的字符块贴图【标准函数】【父Sprite + 父Window_Base】
//				->清空字符块贴图-全部【标准函数】【父Sprite + 父Window_Base】
//				->清空字符块贴图-指定区域【标准函数】【父Sprite + 父Window_Base】
//				->获取字符块贴图-全部【标准函数】【父Sprite + 父Window_Base】
//				->获取字符块贴图-指定区域【标准函数】【父Sprite + 父Window_Base】
//				->添加自定义子贴图【标准函数】【父Sprite + 父Window_Base】
//				->移除自定义子贴图【标准函数】【父Sprite + 父Window_Base】
//				->获取贴图原位置X【标准函数】【子Sprite】
//				->获取贴图原位置Y【标准函数】【子Sprite】
//			->☆字符块贴图实现
//				->继承 再处理阶段
//					->再处理阶段-贴图参数初始化
//				->获取文本宽度（半覆写）
//				->获取文本高度（半覆写）
//				->绘制基础字符（半覆写）
//					->绘制的贴图 - 创建画布
//					->绘制的贴图 - 创建贴图
//					->绘制的贴图 - 画布设置
//					->绘制的贴图 - 贴图设置
//				->贴图操作-刷新当前的字符块贴图（私有）
//				->贴图操作-清空字符块贴图-全部（私有）
//				->贴图操作-清空字符块贴图-指定区域（私有）
//			->☆窗口字符应用之效果字符（字符块贴图）
//				> \dts[文本]
//			
//			
//			->☆窗口标记
//				->建立画布时
//				->清理画布时（全部画布）
//				->清理画布时（矩形范围）
//			
//			
//			->☆翻转控制
//			->☆窗口字符应用之效果字符（翻转控制）
//				> \dtsh[on]
//				> \dtsh[off]
//				> \dtsv[on]
//				> \dtsv[off]
//			
//			->☆贴图内边距
//			->☆窗口字符应用之效果字符（贴图内边距）
//				> \dtsp[reset]
//				> \dtsp[5]
//				> \dtsp[5:10]
//				> \dtsp[5:5:10:10]
//			
//			->☆DEBUG显示
//			->☆窗口字符应用之效果字符（DEBUG显示）
//				> \debug[显示字符块范围]
//				> \debug[隐藏字符块范围]
//			
//			--------------------------
//			
//			
//			->☆逐个绘制的字符块阶段 标准模块
//				->是否处于逐个绘制流程中【标准接口】【子Sprite】
//				->每个字符块开始时【标准接口】【父Bitmap】
//			->☆逐个绘制的字符块贴图
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
//			1. 2025/12/18：放一个箱子在这里，或许有很多不错的灵感，可以装进这个插件里。
//				  ╭━┬━┬━┬━┬━┬━┬━┳╮
//				  ┃ | | | | | | |┃
//				  ┃_|_|_|_|_|_|_|┃
//				  ┃━┳━━━━口━━━━┳━┃
//				  ┃ ┃\/\|卜|/\/┃ ┃
//				  ┃ ┃/\/|  |\/\┃ ┃
//				  ╰━┻━━━━━━━━━━┻━╯
//		
//		★其它说明细节：
//			1. 2024/11/2：这个插件被我称为"木大的力量"，因为这插件既强大，又木大。
//			  比如词条功能、动态字符块功能，看起来非常厉害，但对于游戏的实际效果，只能是锦上添花，实用性太弱了。
//			2. 2025/12/18：这个插件出现了一个大bug，修了很久，真没想到。
//			  但确实，字符块能做的事情非常多，但我一年了还没开始加强。
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
	DrillUp.g_COWCSp_PluginTip_curName = "Drill_CoreOfWindowCharacterSprite.js 窗口字符-窗口字符贴图核心";
	DrillUp.g_COWCSp_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_COWCSp_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_COWCSp_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_COWCSp_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_COWCSp_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_COWCSp_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfWindowCharacterSprite = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfWindowCharacterSprite');
	
	
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
var _drill_COWCSp_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_COWCSp_pluginCommand.call(this, command, args);
	this.drill_COWCSp_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_COWCSp_pluginCommand = function( command, args ){
	if( command === ">窗口字符贴图核心" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG贴图流程测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COWCSp_Sprite_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COWCSp_Sprite_DebugEnabled = false;
				}
			}
		}
	}
};



//#############################################################################
// ** 【标准模块】☆流程介绍 标准模块
//#############################################################################
//##############################
// * 流程介绍 - 绘制文本(固定高宽)【标准函数】【Window_Base】
//			
//			参数：	> context 字符串
//			返回：	> 无
//			
//			说明：	> 该函数只作参考用。
//					> 实际绘制文本情况要复杂的多，并且流程经常是零散使用的。（所以不要继承这个函数）
//					> 该函数封装了 窗口字符 的规则，支持\v\c[]窗口字符，并且@@@xxx的底层字符也能使用。
//##############################
Window_Base.prototype.drill_COWCSp_refreshText_FixWidthAndHeight = function( context ){
	/* 该函数只作参考用，子插件的实现都可以参考该流程，可见脚本文档 流程-应用举例 */
	
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
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 参数准备 - 自定义
	//	（子插件实现）
	
	// > 清空画布（固定高宽只需要清空）
	temp_bitmap.clear();
	
	
	// > 『字符主流程』 - DEBUG显示画布范围【窗口字符 - 窗口字符核心】
	//temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	this.drill_COWC_drawText( org_text, options );
	
	// > 『字符贴图流程』 - 刷新当前的字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
}
//##############################
// * 流程介绍 - 绘制文本(自适应高宽)【标准函数】【Window_Base】
//			
//			参数：	> context 字符串
//			返回：	> 无
//			
//			说明：	> 该函数只作参考用。
//					> 实际绘制文本情况要复杂的多，并且流程经常是零散使用的。（所以不要继承这个函数）
//					> 该函数封装了 窗口字符 的规则，支持\v\c[]窗口字符，并且@@@xxx的底层字符也能使用。
//##############################
Window_Base.prototype.drill_COWCSp_refreshText_AutoWidthAndHeight = function( context ){
	/* 该函数只作参考用，子插件的实现都可以参考该流程，可见脚本文档 流程-应用举例 */
	
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
	//	（子插件实现）
	
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
	
	// > 『字符贴图流程』 - 刷新当前的字符块贴图【窗口字符 - 窗口字符贴图核心】
	if( Imported.Drill_CoreOfWindowCharacterSprite ){
		this.drill_COWCSp_sprite_refreshAllSprite();
	}
}


//=============================================================================
// ** ☆DEBUG贴图流程测试
//
//			说明：	> 此模块控制 DEBUG贴图流程测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG贴图流程测试 - 帧刷新（地图界面）
//==============================
var _drill_COWCSp_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COWCSp_debugMap_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_COWCSp_Sprite_DebugEnabled == true ){
		$gameTemp._drill_COWCSp_Sprite_DebugEnabled = undefined;
		this.drill_COWCSp_Text_createDebugSprite();
	}
	
	// > 销毁贴图
	if( $gameTemp._drill_COWCSp_Sprite_DebugEnabled == false ){
		$gameTemp._drill_COWCSp_Sprite_DebugEnabled = undefined;
		if( this._drill_COWCSp_Sprite_DebugSprite != undefined ){
			this.removeChild(this._drill_COWCSp_Sprite_DebugSprite);
			this._drill_COWCSp_Sprite_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG贴图流程测试 - 创建贴图
//==============================
Scene_Map.prototype.drill_COWCSp_Text_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_COWCSp_Sprite_DebugSprite != undefined ){
		this.removeChild(this._drill_COWCSp_Sprite_DebugSprite);
		this._drill_COWCSp_Sprite_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_bitmap = new Bitmap( Graphics.boxWidth*0.75, Graphics.boxHeight*0.75 );
	var temp_sprite = new Sprite();
	temp_sprite.x = Graphics.boxWidth*0.5;
	temp_sprite.y = Graphics.boxHeight*0.5;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = temp_bitmap;
	temp_sprite.bitmap.fillAll("rgba(0,0,0,0.5)");
	this.addChild( temp_sprite );	//（直接加在最顶层的上面）
	this._drill_COWCSp_Sprite_DebugSprite = temp_sprite;
	
	// > 绘制 - DEBUG显示画布范围
	temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 绘制 - 参数准备
	var options = {};
	
	options['infoParam'] = {};
	options['infoParam']['x'] = 20;
	options['infoParam']['y'] = 20;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	options['baseParam'] = {};
	//options['baseParam']['drawDebugBaseRect'] = true;
	options['baseParam']['sprite_debugRect'] = true;
	options['baseParam']['fontSize'] = 20;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_COWCSp_PluginTip_curName + "】<br>" + 
				"字符块贴图主要能将字符变成贴图。<br>" + 
				
				"》》底层字符测试： \\fr\n" + 
				"    ×@@-sp[onlyText:测试的贴图]  字符块贴图  @@@-sp[onlyText:测试的贴图] \\fr\n" + 
				"    ×@@-sp[fixFrame:150:20:测试的贴图]  固定高宽的贴图  @@@-sp[fixFrame:150:20:测试的贴图] \\fr\n" + 
				
				"》》窗口字符测试： \\fr\n" + 
				"    \\\\dts[测试的贴图]  字符块贴图  \\dts[测试的贴图]测试的贴图 （效果与常规字符一样）\\fr\n" + 
				"    \\\\dts[测试]\\\\dts[的]\\\\dts[贴图]  多个字符块贴图  \\dts[测试]\\dts[的]\\dts[贴图]测试的贴图 （效果与常规字符一样）\\fr\n" + 
				"    \\\\dtsh[on]\\\\dts[测试的贴图]  水平翻转贴图  \\dtsh[on]\\dts[测试的贴图]\\dtsh[off] \\fr\n" + 
				"    \\\\dtsv[on]\\\\dts[测试的贴图]  垂直翻转贴图  \\dtsv[on]\\dts[测试的贴图]\\dtsv[off] \\fr\n" + 
				"    \\\\dtsp[5:10]\\\\dts[测试的贴图]  给贴图添加内边距  \\dtsp[5:10]\\dts[测试的贴图]\\dtsp[reset] \\fr\n" + 
				"    " ;
				
	temp_bitmap.drill_COWC_drawText( text, options );
	
	
	// > 绘制 - 测试删除字符
	options['infoParam'] = {};
	options['infoParam']['x'] = 20;
	options['infoParam']['y'] = 320;
	
	var text =  "》》字符块贴图删除测试： \\fr\n" + 
				"    \\dts[这]\\dts[是]\\dts[测]\\dts[试]\\dts[的]\\dts[贴]\\dts[图] \n" + 
				"    \\dts[这]\\dts[是]\\dts[测]\\dts[试]\\dts[的]\\dts[贴]\\dts[图] \n" + 
				"    \\dts[这]\\dts[是]\\dts[测]\\dts[试]\\dts[的]\\dts[贴]\\dts[图] \n" + 
				"    \\dts[这]\\dts[是]\\dts[测]\\dts[试]\\dts[的]\\dts[贴]\\dts[图] \n" + 
				"    " ;
				
	temp_bitmap.drill_COWC_drawText( text, options );
	
	
	var rect = { 'x':70, 'y':370, 'width':80, 'height':20 }
	
	// > 『字符贴图流程』 - 刷新当前的字符块贴图【窗口字符 - 窗口字符贴图核心】
	temp_sprite.drill_COWCSp_sprite_refreshAllSprite();
	
	// > 『字符贴图流程』 - 清空字符块贴图-指定区域【窗口字符 - 窗口字符贴图核心】
	temp_sprite.drill_COWCSp_sprite_clearSpriteInRect( rect );
	//temp_bitmap.clearRect( rect['x'], rect['y'], rect['width'], rect['height'] );	//（不考虑这个函数的兼容）
	
	temp_bitmap.drill_COWC_strokeRect( rect['x'], rect['y'], rect['width'], rect['height'], "#aa2222", 2, "miter" );
}
	
	
	
//#############################################################################
// ** 【标准模块】☆字符块贴图 标准模块
//#############################################################################
//##############################
// * 字符块贴图『字符贴图流程』 - 刷新当前的字符块贴图【标准函数】【父Sprite + 父Window_Base】
//			
//			参数：	> 无
//			返回：	> 对象列表
//			
//			说明：	> 该函数 不能 放在帧刷新中反复调用。
//					> 该函数的主类为 父贴图/父窗口 。
//					> 父贴图/父窗口 绘制时注意调用此函数，确保能正常显示 绘制产生的字符块贴图 。
//##############################
Sprite.prototype.drill_COWCSp_sprite_refreshAllSprite = function(){
	this.drill_COWCSp_sprite_refreshAllSprite_Private();
}
Window_Base.prototype.drill_COWCSp_sprite_refreshAllSprite = function(){
	this._windowContentsSprite.drill_COWCSp_sprite_refreshAllSprite();
}
//##############################
// * 字符块贴图『字符贴图流程』 - 清空字符块贴图-全部【标准函数】【父Sprite + 父Window_Base】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 该函数 可以 放在帧刷新中反复调用。
//					> 该函数的主类为 父贴图/父窗口 。
//					> 父贴图/父窗口 绘制时注意调用此函数，确保清空全部 绘制产生的字符块贴图 。
//##############################
Sprite.prototype.drill_COWCSp_sprite_clearAllSprite = function(){
	this.drill_COWCSp_sprite_clearAllSprite_Private();
}
Window_Base.prototype.drill_COWCSp_sprite_clearAllSprite = function(){
	this._windowContentsSprite.drill_COWCSp_sprite_clearAllSprite();
}
//##############################
// * 字符块贴图『字符贴图流程』 - 清空字符块贴图-指定区域【标准函数】【父Sprite + 父Window_Base】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 该函数 可以 放在帧刷新中反复调用。
//					> 该函数的主类为 父贴图/父窗口 。
//##############################
Sprite.prototype.drill_COWCSp_sprite_clearSpriteInRect = function( rect ){
	this.drill_COWCSp_sprite_clearSpriteInRect_Private( rect );
}
Window_Base.prototype.drill_COWCSp_sprite_clearSpriteInRect = function( rect ){
	this._windowContentsSprite.drill_COWCSp_sprite_clearSpriteInRect( rect );
}
//##############################
// * 字符块贴图『字符贴图流程』 - 获取字符块贴图-全部【标准函数】【父Sprite + 父Window_Base】
//			
//			参数：	> 无
//			返回：	> 对象列表
//			
//			说明：	> 该函数 可以 放在帧刷新中反复调用。
//					> 该函数的主类为 父贴图/父窗口 。
//					> 该函数返回全部绘制产生的字符块贴图，但前提是已经执行过 刷新当前函数。
//##############################
Sprite.prototype.drill_COWCSp_sprite_getAllSprite = function(){
	if( this._drill_COWCSp_layer == undefined ){ return []; }
	return this._drill_COWCSp_layer.children;
}
Window_Base.prototype.drill_COWCSp_sprite_getAllSprite = function(){
	return this._windowContentsSprite.drill_COWCSp_sprite_getAllSprite();
}
//##############################
// * 字符块贴图『字符贴图流程』 - 获取字符块贴图-指定区域【标准函数】【父Sprite + 父Window_Base】
//			
//			参数：	> 无
//			返回：	> 对象列表
//			
//			说明：	> 该函数 可以 放在帧刷新中反复调用。
//					> 该函数的主类为 父贴图/父窗口 。
//					> 该函数返回区域范围内的绘制产生的字符块贴图，但前提是已经执行过 刷新当前函数。
//					> 【注意】，这个函数可能不太好用，总是有小问题，获取不到，最好全部获取。
//##############################
Sprite.prototype.drill_COWCSp_sprite_getSpriteInRect = function( rect ){
	return this.drill_COWCSp_sprite_getSpriteInRect_Private( rect );
}
Window_Base.prototype.drill_COWCSp_sprite_getSpriteInRect = function( rect ){
	return this._windowContentsSprite.drill_COWCSp_sprite_getSpriteInRect( rect );
}

//##############################
// * 字符块贴图『字符贴图流程』 - 添加自定义子贴图【标准函数】【父Sprite + 父Window_Base】
//			
//			参数：	> 无
//			返回：	> 对象列表
//			
//			说明：	> 该函数 不能 放在帧刷新中反复调用。
//					> 该函数的主类为 父贴图/父窗口 。
//					> 该函数可添加 自定义贴图，与字符块贴图处于同一个层级中。
//##############################
Sprite.prototype.drill_COWCSp_sprite_addCustomSprite = function( custom_sprite ){
	this.drill_COWCSp_sprite_addCustomSprite_Private( custom_sprite );
}
Window_Base.prototype.drill_COWCSp_sprite_addCustomSprite = function( custom_sprite ){
	this._windowContentsSprite.drill_COWCSp_sprite_addCustomSprite( custom_sprite );
}
//##############################
// * 字符块贴图『字符贴图流程』 - 移除自定义子贴图【标准函数】【父Sprite + 父Window_Base】
//			
//			参数：	> 无
//			返回：	> 对象列表
//			
//			说明：	> 该函数 不能 放在帧刷新中反复调用。
//					> 该函数的主类为 父贴图/父窗口 。
//##############################
Sprite.prototype.drill_COWCSp_sprite_removeCustomSprite = function( custom_sprite ){
	this.drill_COWCSp_sprite_removeCustomSprite_Private( custom_sprite );
}
Window_Base.prototype.drill_COWCSp_sprite_removeCustomSprite = function( custom_sprite ){
	this._windowContentsSprite.drill_COWCSp_sprite_removeCustomSprite( custom_sprite );
}
//##############################
// * 字符块贴图『字符贴图流程』 - 获取贴图原位置X【标准函数】【子Sprite】
//			
//			参数：	> 无
//			返回：	> 数字
//			
//			说明：	> 该函数 可以 放在帧刷新中反复调用。
//					> 该函数的主类为 字符块贴图 。
//##############################
Sprite.prototype.drill_COWCSp_sprite_getOriginalX = function(){
	if( this._drill_COWCSp_sprite_org_x == undefined ){ return 0; }
	return this._drill_COWCSp_sprite_org_x;
}
//##############################
// * 字符块贴图『字符贴图流程』 - 获取贴图原位置Y【标准函数】【子Sprite】
//			
//			参数：	> 无
//			返回：	> 数字
//			
//			说明：	> 该函数 可以 放在帧刷新中反复调用。
//					> 该函数的主类为 字符块贴图 。
//##############################
Sprite.prototype.drill_COWCSp_sprite_getOriginalY = function(){
	if( this._drill_COWCSp_sprite_org_y == undefined ){ return 0; }
	return this._drill_COWCSp_sprite_org_y;
}

//=============================================================================
// ** ☆字符块贴图实现
//
//			说明：	> 该模块专门提供 字符块贴图 的设置。本质上就是在绘制时，将当前字符块变成固定大小的贴图。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 字符块贴图实现 - 再处理阶段-配置阶段（继承）
//==============================
var _drill_COWCSp_COCD_textBlock_processSecond_1 = Game_Temp.prototype.drill_COCD_textBlock_processSecond;
Game_Temp.prototype.drill_COCD_textBlock_processSecond = function( command, args, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COWCSp_COCD_textBlock_processSecond_1.call( this, command, args, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command.toLowerCase() == "@@@-sp" ){
		if( args.length >= 1 ){
			
			// > 『底层字符定义』 - 字符块贴图（@@@-sp[onlyText:测试的字符]） sprite
			if( String(args[0]) == "onlyText" ){
				cur_baseParam['sprite_type'] = String(args[0]);
				cur_baseParam['sprite_width'] = 0;
				cur_baseParam['sprite_height'] = 0;
				var str_list = args;
				str_list.shift();
				cur_baseParam['sprite_text'] = str_list.join(":");
				
				// > 再处理阶段-贴图参数初始化
				cur_baseParam['sprite_options'] = this.drill_COWCSp_sprite_initData( cur_baseParam );
				
				this.drill_COCD_textBlock_submitSecond( "@" );	//（必须提交一个字符）
				return;
			}
			
			// > 『底层字符定义』 - 字符块贴图（@@@-sp[fixFrame:150:20:测试的字符]） sprite
			if( String(args[0]) == "fixFrame" ){
				cur_baseParam['sprite_type'] = String(args[0]);
				cur_baseParam['sprite_width'] = Number(args[1]);
				cur_baseParam['sprite_height'] = Number(args[2]);
				var str_list = args;
				str_list.shift();
				str_list.shift();
				str_list.shift();
				cur_baseParam['sprite_text'] = str_list.join(":");
				
				// > 再处理阶段-贴图参数初始化
				cur_baseParam['sprite_options'] = this.drill_COWCSp_sprite_initData( cur_baseParam );
				
				this.drill_COCD_textBlock_submitSecond( "@" );	//（必须提交一个字符）
				return;
			}
		}
	}
}
//==============================
// * 字符块贴图实现 - 再处理阶段-贴图参数初始化
//
//			说明：	> 此处是 嵌套绘制，bitmap下的另一轮绘制，注意这里传递的是指针，需要深拷贝。
//==============================
Game_Temp.prototype.drill_COWCSp_sprite_initData = function( baseParam ){
	
	// > 贴图内边距
	var padding_top = 0;
	var padding_bottom = 0;
	var padding_left = 0;
	var padding_right = 0;
	if( baseParam['sprite_paddingTop'] != undefined ){		//『绘制过程定义』 - 内边距 - 上（@@@-sp[paddingTop:10]）
		padding_top = baseParam['sprite_paddingTop'];
	}
	if( baseParam['sprite_paddingBottom'] != undefined ){	//『绘制过程定义』 - 内边距 - 下（@@@-sp[paddingBottom:10]）
		padding_bottom = baseParam['sprite_paddingBottom'];
	}
	if( baseParam['sprite_paddingLeft'] != undefined ){		//『绘制过程定义』 - 内边距 - 左（@@@-sp[paddingLeft:10]）
		padding_left = baseParam['sprite_paddingLeft'];
	}
	if( baseParam['sprite_paddingRight'] != undefined ){	//『绘制过程定义』 - 内边距 - 右（@@@-sp[paddingRight:10]）
		padding_right = baseParam['sprite_paddingRight'];
	}
	
	
	// > 绘制 - 准备绘制配置
	var new_spriteBaseParam = JSON.parse(JSON.stringify( baseParam ));
	var new_options = {};
	new_options['infoParam'] = {};
	new_options['infoParam']['x'] = 0 + padding_left;	//（贴图内边距 位置偏移）
	new_options['infoParam']['y'] = 0 + padding_top;
	new_options['infoParam']['canvasWidth']  = 100;		//（先给个非零值）
	new_options['infoParam']['canvasHeight'] = 100;
	new_options['baseParam'] = JSON.parse(JSON.stringify(new_spriteBaseParam));
	new_options['baseParam']['sprite_type'] = "";		//（清空 嵌套绘制，防止死循环执行绘制）
	new_options['baseParam']['sprite_text'] = "";
	new_options['baseParam']['sprite_width'] = 0;
	new_options['baseParam']['sprite_height'] = 0;
	
	// > 绘制 - 准备绘制配置
	this.drill_COCD_initOptions( new_options, null );	//（此时bitmap还没创建，先设置null）
	//	（此处没有走正规的流程，而是零散使用）
	//	（不要参考这里的绘制函数！会出很多问题！去看 drill_COCD_drawText 函数的流程！）
	
	
	// > 只文本时
	if( new_spriteBaseParam['sprite_type'] == "onlyText" ){
		
		// > 高宽计算
		//	（此时bitmap还没创建，所以需要提前进行高宽计算，使用离散的流程函数实现）
		
		// > 高宽计算 - 『字符主流程』 - 窗口字符转底层字符
		var converted_text = $gameTemp.drill_COWC_convertOrgText( new_spriteBaseParam['sprite_text'] );
		
		// > 高宽计算 - 『字符核心流程』 - 解析底层字符【系统 - 字符绘制核心】
		var cur_options = JSON.parse(JSON.stringify(new_options));	//（需要深拷贝，因为走一次流程options会变。比如@@@-fs[add:4]多次执行后会叠加）
		var rowBlock_list = $gameTemp.drill_COCD_analysisText( converted_text, cur_options );
		
		// > 高宽计算 - 最大宽度
		var width = 0;
		for(var i = 0; i < rowBlock_list.length; i++ ){
			var rowBlock = rowBlock_list[i];
			var cur_width = rowBlock.drill_rowBlock_getRowWidth();
			width = Math.max( cur_width, width );
		}
		
		// > 高宽计算 - 总高度
		var height = 0;
		for(var i = 0; i < rowBlock_list.length; i++ ){
			var rowBlock = rowBlock_list[i];
			height += rowBlock.drill_rowBlock_getRowHeight();
		}
		
		width += padding_left;	//（贴图内边距 高宽）
		width += padding_right;
		height += padding_top;
		height += padding_bottom;
		
		baseParam['sprite_width']  = Math.ceil( width );
		baseParam['sprite_height'] = Math.ceil( height );
		new_options['infoParam']['canvasWidth']  = Math.ceil( width );
		new_options['infoParam']['canvasHeight'] = Math.ceil( height );
	}
	
	// > 固定高宽时
	if( new_spriteBaseParam['sprite_type'] == "fixFrame" ){
		var width  = new_spriteBaseParam['sprite_width'];
		var height = new_spriteBaseParam['sprite_height'];
		
		width += padding_left;	//（贴图内边距 高宽）
		width += padding_right;
		height += padding_top;
		height += padding_bottom;
		
		new_options['infoParam']['canvasWidth']  = Math.ceil( width );
		new_options['infoParam']['canvasHeight'] = Math.ceil( height );
	}
	
	//（注意，此函数执行结束前，sprite_width 和 sprite_height 不能为零，否则不会创建画布）
	return new_options;
}
//==============================
// * 字符块贴图实现 - 基础字符 - 默认值（继承）
//==============================
var _drill_COWCSp_COCD_drawBaseText_initParam = Game_Temp.prototype.drill_COCD_drawBaseText_initParam;
Game_Temp.prototype.drill_COCD_drawBaseText_initParam = function( baseParam ){
	_drill_COWCSp_COCD_drawBaseText_initParam.call( this, baseParam );
	if( baseParam['sprite_type'] == undefined   ){ baseParam['sprite_type'] = ""   };
	if( baseParam['sprite_width'] == undefined  ){ baseParam['sprite_width'] = -1  };
	if( baseParam['sprite_height'] == undefined ){ baseParam['sprite_height'] = -1 };
	if( baseParam['sprite_text'] == undefined   ){ baseParam['sprite_text'] = ""   };
}
//==============================
// * 字符块贴图实现 - 基础字符 - 获取文本宽度（半覆写）
//==============================
var _drill_COWCSp_COCD_measureBaseTextWidth_Private = Game_Temp.prototype.drill_COCD_measureBaseTextWidth_Private;
Game_Temp.prototype.drill_COCD_measureBaseTextWidth_Private = function( painter, text, baseParam ){
	
	// > 贴图情况时 - 只文本时
	if( baseParam['sprite_type'] == "onlyText" ){
		if( baseParam['sprite_width'] > 0 ){ return baseParam['sprite_width']; }
		text = baseParam['sprite_text'];	//（无法返回非零值时，只能按原函数情况返回）
	}
	// > 贴图情况时 - 固定高宽时
	if( baseParam['sprite_type'] == "fixFrame" ){
		return baseParam['sprite_width'];
	}
	
	// > 原函数
	return _drill_COWCSp_COCD_measureBaseTextWidth_Private.call( this, painter, text, baseParam );
}
//==============================
// * 字符块贴图实现 - 基础字符 - 获取文本高度（半覆写）
//==============================
var _drill_COWCSp_COCD_measureBaseTextHeight_Private = Game_Temp.prototype.drill_COCD_measureBaseTextHeight_Private;
Game_Temp.prototype.drill_COCD_measureBaseTextHeight_Private = function( painter, text, baseParam ){
	
	// > 贴图情况时 - 只文本时
	if( baseParam['sprite_type'] == "onlyText" ){
		if( baseParam['sprite_height'] > 0 ){ return baseParam['sprite_height']; }
		text = baseParam['sprite_text'];	//（无法返回非零值，只能按原函数情况返回）
	}
	// > 贴图情况时 - 固定高宽时
	if( baseParam['sprite_type'] == "fixFrame" ){
		return baseParam['sprite_height'];
	}
	
	// > 原函数
	return _drill_COWCSp_COCD_measureBaseTextHeight_Private.call( this, painter, text, baseParam );
}
//==============================
// * 字符块贴图实现 - 基础字符 - 绘制基础字符（半覆写）
//==============================
var _drill_COWCSp_COCD_drawBaseText_Private = Bitmap.prototype.drill_COCD_drawBaseText_Private;
Bitmap.prototype.drill_COCD_drawBaseText_Private = function( text, x, y, baseParam ){
	
	// > 『绘制过程定义』 - 字符块贴图（@@@-sp[]）
	if( baseParam['sprite_type'] != "" ){
		
		// > 绘制的贴图 - 创建画布
		var new_bitmap = this.drill_COWCSp_sprite_createBitmap( baseParam['sprite_width'], baseParam['sprite_height'], baseParam['sprite_text'], baseParam );
		if( new_bitmap == undefined ){ return; }
		
		// > 绘制的贴图 - 创建贴图
		var new_sprite = this.drill_COWCSp_sprite_createSprite( new_bitmap, x, y, baseParam );
		if( new_sprite == undefined ){ return; }
		
		// > 绘制的贴图 - 画布设置
		this.drill_COWCSp_sprite_setupBitmap( new_bitmap, baseParam, baseParam['sprite_options'] );
		
		// > 绘制的贴图 - 贴图设置
		this.drill_COWCSp_sprite_setupSprite( new_sprite, baseParam, baseParam['sprite_options'] );
		
	// > 原函数
	}else{
		_drill_COWCSp_COCD_drawBaseText_Private.call( this, text, x, y, baseParam );
	}
}
//==============================
// * 绘制的贴图 - 创建画布
//==============================
Bitmap.prototype.drill_COWCSp_sprite_createBitmap = function( width, height, text, baseParam ){
	if( width  <= 0 ){ return null; }
	if( height <= 0 ){ return null; }
	if( text == ""  ){ return null; }
	
	// > 创建画布
	var new_bitmap = new Bitmap( width, height );
	return new_bitmap;
}
//==============================
// * 绘制的贴图 - 创建贴图
//==============================
Bitmap.prototype.drill_COWCSp_sprite_createSprite = function( new_bitmap, x, y, baseParam ){
	var new_bitmap_width  = new_bitmap.width;
	var new_bitmap_height = new_bitmap.height;
	
	// > 修正贴图位置
	//		（贴图固定锚点在正中心，绘制光标起始点在 左下角，所以需要修正位置至 正中心）
	x += new_bitmap_width*0.5;
	y -= new_bitmap_height*0.5;
	
	// > 矩形判断
	//		（贴图矩形在绘制区域内，才会被创建）
	//		（矩形比较都以 左上角 的锚点为准，需要修正位置）
	var rect_ww = new_bitmap_width;
	var rect_hh = new_bitmap_height;
	var rect_xx = x - rect_ww*0.5;
	var rect_yy = y - rect_hh*0.5;
	var rect_1 = { 'x':0, 'y':0, 'width':this.width, 'height':this.height };
	var rect_2 = { 'x':rect_xx, 'y':rect_yy, 'width':rect_ww, 'height':rect_hh };
	var enabled = $gameTemp.drill_COWCSp_Math2D_isRectIntersect( rect_1, rect_2 );
	if( enabled == false ){ return null; }
	
	// > 创建贴图
	var new_sprite = this.drill_COWCSp_sprite_newSprite( baseParam );
	new_sprite.x = x;
	new_sprite.y = y;
	new_sprite.anchor.x = 0.5;
	new_sprite.anchor.y = 0.5;
	new_sprite._drill_COWCSp_sprite_org_x = x;	//（记录 贴图原位置）
	new_sprite._drill_COWCSp_sprite_org_y = y;
	new_sprite.bitmap = new_bitmap;
	
	// > 创建贴图容器
	if( this._drill_COWCSp_blockSpriteList == undefined ){
		this._drill_COWCSp_blockSpriteList = [];
	}
	this._drill_COWCSp_blockSpriteList.push( new_sprite );
	
	return new_sprite;
}
//==============================
// * 绘制的贴图 - 创建贴图 - 贴图对象（可继承）
//==============================
Bitmap.prototype.drill_COWCSp_sprite_newSprite = function( baseParam ){
	return new Sprite();
}
//==============================
// * 绘制的贴图 - 画布设置（可继承）
//
//			说明：	> 此处是 嵌套绘制，bitmap下的另一轮绘制，注意这里传递的是指针，需要深拷贝。
//==============================
Bitmap.prototype.drill_COWCSp_sprite_setupBitmap = function( new_bitmap, baseParam, sprite_options ){
	
	// > 『字符主流程』 - 绘制文本
	new_bitmap.drill_COWC_drawText( baseParam['sprite_text'], sprite_options );
}
//==============================
// * 绘制的贴图 - 贴图设置（可继承）
//
//			说明：	> 此处是 嵌套绘制，bitmap下的另一轮绘制，注意这里传递的是指针，需要深拷贝。
//==============================
Bitmap.prototype.drill_COWCSp_sprite_setupSprite = function( new_sprite, baseParam, sprite_options ){
	//（暂无）
}

//==============================
// * 字符块贴图实现 - 贴图操作 - 刷新当前的字符块贴图（私有）
//
//			说明：	> 字符块贴图统一放在 层级 下面，能方便控制位移，也方便统一删除。
//==============================
Sprite.prototype.drill_COWCSp_sprite_refreshAllSprite_Private = function(){
	if( this.bitmap == undefined ){ return; }
	var parent_bitmap = this.bitmap;
	
	// > 条件筛选（只要有贴图在列表中，则创建层级，创建贴图）
	var has_sprite = false;
	if( parent_bitmap._drill_COWCSp_blockSpriteList != undefined &&
		parent_bitmap._drill_COWCSp_blockSpriteList.length > 0 ){
		has_sprite = true;
	}
	if( parent_bitmap._drill_COWCSp_customSpriteList != undefined &&
		parent_bitmap._drill_COWCSp_customSpriteList.length > 0 ){
		has_sprite = true;
	}
	if( has_sprite == false ){ return; }
	
	// > DEBUG字符块测试
	//alert("字符块函数执行：\"刷新当前的字符块贴图\" ");
	
	// > 层级 - 创建
	if( this._drill_COWCSp_layer == undefined ){
		var temp_layer = new Sprite();
		temp_layer.x = 0 - this.anchor.x * parent_bitmap.width; 	//（平移到中心锚点的位置）
		temp_layer.y = 0 - this.anchor.y * parent_bitmap.height;	//（由于是子贴图，所以不必考虑 旋转、缩放）
		this.addChild( temp_layer );
		this._drill_COWCSp_layer = temp_layer;
	}
	
	
	// > 字符块贴图
	if( parent_bitmap._drill_COWCSp_blockSpriteList != undefined &&
		parent_bitmap._drill_COWCSp_blockSpriteList.length > 0 ){
		
		// > 字符块贴图 - 不操作贴图容器
		//	（多次绘制会积累贴图，需要由父贴图手动执行才能清空贴图容器）
		
		// > 字符块贴图 - 添加新贴图
		var sprite_list = parent_bitmap._drill_COWCSp_blockSpriteList;
		for( var i = 0; i < sprite_list.length; i++ ){
			var temp_sprite = sprite_list[i];
			if( this._drill_COWCSp_layer.children.indexOf(temp_sprite) == -1 ){
				this._drill_COWCSp_layer.addChild( temp_sprite );
			}
		}
	}
	
	// > 自定义子贴图
	if( parent_bitmap._drill_COWCSp_customSpriteList != undefined &&
		parent_bitmap._drill_COWCSp_customSpriteList.length > 0 ){
		
		// > 自定义子贴图 - 添加新贴图
		var sprite_list = parent_bitmap._drill_COWCSp_customSpriteList;
		for( var i = 0; i < sprite_list.length; i++ ){
			var temp_sprite = sprite_list[i];
			if( this._drill_COWCSp_layer.children.indexOf(temp_sprite) == -1 ){
				this._drill_COWCSp_layer.addChild( temp_sprite );
			}
		}
	}
}
//==============================
// * 字符块贴图实现 - 贴图操作 - 清空字符块贴图-全部（私有）
//
//			说明：	> 层级贴图不删，防止刷新造成反复创建层级而浪费性能。
//==============================
Sprite.prototype.drill_COWCSp_sprite_clearAllSprite_Private = function(){
	
	// > DEBUG字符块测试
	if( this._drill_COWCSp_layer != undefined ){
		//alert("字符块函数执行：\"【清空】字符块贴图-全部\" ");
		//if( $gameTemp._drill_COWCSp_executeCount == undefined ){ $gameTemp._drill_COWCSp_executeCount = 0; }
		//$gameTemp._drill_COWCSp_executeCount += 1;
		//if( $gameTemp._drill_COWCSp_executeCount == 1 ){	//（debug用：执行第N次时强制报错）
		//	throw new Error("Drill 查看调用堆栈");
		//}
	}
	
	// > 清空贴图
	if( this._drill_COWCSp_layer != undefined ){
		
		// > 清空贴图 - 从层级中移除
		var sprite_list = this._drill_COWCSp_layer.children;
		for( var i = sprite_list.length-1; i >= 0; i-- ){
			var temp_sprite = sprite_list[i];
			temp_sprite._drill_COWCSp_destroyed = true;		//（销毁标记）
			this._drill_COWCSp_layer.removeChild(temp_sprite);
		}
		this._drill_COWCSp_layer = undefined;
	}
	
	// > 清空贴图容器
	if( this.bitmap != undefined ){
		var parent_bitmap = this.bitmap;
		
		// > 清空贴图容器 - 字符块贴图
		if( parent_bitmap._drill_COWCSp_blockSpriteList != undefined ){
			parent_bitmap._drill_COWCSp_blockSpriteList.length = 0;
		}
		
		// > 清空贴图容器 - 自定义子贴图
		if( parent_bitmap._drill_COWCSp_customSpriteList != undefined ){
			parent_bitmap._drill_COWCSp_customSpriteList.length = 0;
		}
	}
	
}
//=============================
// * 字符块贴图实现 - 贴图操作 - 清空字符块贴图-指定区域（私有）
//
//			说明：	> rect参数是指相对于 画布位置 的矩形区域。
//=============================
Sprite.prototype.drill_COWCSp_sprite_clearSpriteInRect_Private = function( rect ){
	if( this._drill_COWCSp_layer == undefined ){ return; }
	if( rect.width == 0  ){ return; }
	if( rect.height == 0 ){ return; }
	
	if( this.bitmap == undefined ){ return; }
	var parent_bitmap = this.bitmap;
	
	// > 遍历字符块贴图列表
	var sprite_list = this._drill_COWCSp_layer.children;
	for( var i = sprite_list.length-1; i >= 0; i-- ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite.bitmap == undefined ){ continue; }
		var ww = temp_sprite.bitmap.width;	//（字符块子贴图 的画布）
		var hh = temp_sprite.bitmap.height;
		var xx = temp_sprite.x - ww * temp_sprite.anchor.x;
		var yy = temp_sprite.y - hh * temp_sprite.anchor.y;
		var rect_2 = { 'x':xx, 'y':yy, 'width':ww, 'height':hh };
		var enabled = $gameTemp.drill_COWCSp_Math2D_isRectIntersect( rect, rect_2 );
		if( enabled == true ){
			
			//（与 指定区域 相交的，移除贴图）
			temp_sprite._drill_COWCSp_destroyed = true;		//（销毁标记）
			this._drill_COWCSp_layer.removeChild(temp_sprite);
			
			//（与 指定区域 相交的，移除贴图容器）
			for( var j = parent_bitmap._drill_COWCSp_blockSpriteList.length-1; j >= 0; j-- ){
				var cur_sprite = parent_bitmap._drill_COWCSp_blockSpriteList[j];
				if( cur_sprite == temp_sprite ){
					parent_bitmap._drill_COWCSp_blockSpriteList.splice( j, 1 );
					break;
				}
			}
		}
	}
};
//=============================
// * 字符块贴图实现 - 贴图操作 - 获取字符块贴图-指定区域（私有）
//
//			说明：	> rect参数是指相对于 画布位置 的矩形区域。
//=============================
Sprite.prototype.drill_COWCSp_sprite_getSpriteInRect_Private = function( rect ){
	if( this._drill_COWCSp_layer == undefined ){ return []; }
	if( rect.width == 0  ){ return []; }
	if( rect.height == 0 ){ return []; }
	
	if( this.bitmap == undefined ){ return []; }
	var parent_bitmap = this.bitmap;
	
	// > 遍历字符块贴图列表
	var result_list = [];
	var sprite_list = this._drill_COWCSp_layer.children;
	for( var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite.bitmap == undefined ){ continue; }
		var ww = temp_sprite.bitmap.width;	//（字符块子贴图 的画布）
		var hh = temp_sprite.bitmap.height;
		var xx = temp_sprite.x - ww * temp_sprite.anchor.x;
		var yy = temp_sprite.y - hh * temp_sprite.anchor.y;
		var rect_2 = { 'x':xx, 'y':yy, 'width':ww, 'height':hh };
		var enabled = $gameTemp.drill_COWCSp_Math2D_isRectIntersect( rect, rect_2 );
		if( enabled == true ){
			
			//（与 指定区域 相交的，捕获）
			result_list.push(temp_sprite);
		}
	}
	return result_list;
};
//=============================
// * 字符块贴图实现 - 贴图操作 - 添加自定义子贴图（私有）
//=============================
Sprite.prototype.drill_COWCSp_sprite_addCustomSprite_Private = function( custom_sprite ){
	if( this.bitmap == undefined ){ return; }
	var parent_bitmap = this.bitmap;
	
	// > 创建贴图容器
	if( parent_bitmap._drill_COWCSp_customSpriteList == undefined ){
		parent_bitmap._drill_COWCSp_customSpriteList = [];
	}
	
	// > 去重添加
	for( var i = 0; i < parent_bitmap._drill_COWCSp_customSpriteList.length; i++ ){
		var cur_sprite = parent_bitmap._drill_COWCSp_customSpriteList[i];
		if( cur_sprite == custom_sprite ){
			return;
		}
	}
	parent_bitmap._drill_COWCSp_customSpriteList.push( custom_sprite );
};
//=============================
// * 字符块贴图实现 - 贴图操作 - 移除自定义子贴图（私有）
//=============================
Sprite.prototype.drill_COWCSp_sprite_removeCustomSprite_Private = function( custom_sprite ){
	if( this.bitmap == undefined ){ return; }
	var parent_bitmap = this.bitmap;
	
	// > 从贴图容器中移除
	if( parent_bitmap._drill_COWCSp_customSpriteList != undefined ){
		for( var i = parent_bitmap._drill_COWCSp_customSpriteList.length-1; i >= 0; i-- ){
			var cur_sprite = parent_bitmap._drill_COWCSp_customSpriteList[i];
			if( cur_sprite == custom_sprite ){
				parent_bitmap._drill_COWCSp_customSpriteList.splice( i, 1 );
			}
		}
	}
	
	// > 移除贴图
	if( this._drill_COWCSp_layer != undefined ){
		this._drill_COWCSp_layer.removeChild( custom_sprite );
	}
};

//==============================
// * 字符块贴图实现 - 数学工具 - 两矩形是否相交
//			
//			参数：	> rect_1 矩形（格式为：{ 'x':0, 'y':0, 'width':100, 'height':100 }）
//					> rect_2 矩形（格式为：{ 'x':0, 'y':0, 'width':100, 'height':100 }）
//			返回：	> 布尔
//			
//			说明：	> 已知两矩形，判断是否相交。矩形边线重合的情况不算相交。
//==============================
Game_Temp.prototype.drill_COWCSp_Math2D_isRectIntersect = function( rect_1, rect_2 ){
	
	var x1 = rect_1.x;
	var y1 = rect_1.y;
	var x2 = rect_1.x + rect_1.width;
	var y2 = rect_1.y + rect_1.height;
	
	var x3 = rect_2.x;
	var y3 = rect_2.y;
	var x4 = rect_2.x + rect_2.width;
	var y4 = rect_2.y + rect_2.height;
	
	var min_x = Math.max(x1, x3);	//（获取两矩形相交的矩形范围）
	var min_y = Math.max(y1, y3);
	var max_x = Math.min(x2, x4);
	var max_y = Math.min(y2, y4);
	
	return min_x <= max_x && min_y <= max_y;
};

//=============================================================================
// ** ☆窗口字符应用之效果字符（字符块贴图）
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之效果字符（字符块贴图） - 组合符配置
//==============================
var _drill_COWCSp_COWC_effect_processCombined_1 = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWCSp_COWC_effect_processCombined_1.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』 - 字符块（\dts[文本]）
	if( command == "dts" ){
		if( args.length >= 1 ){
			this.drill_COWC_effect_submitCombined( "@@@-sp[onlyText:" + args.join(":") + "]" );
		}
	}
}



//=============================================================================
// ** ☆窗口标记
//
//			说明：	> 该模块提供 窗口标记 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//=============================
// * 窗口标记 - 建立画布时
//=============================
var _drill_COWCSp_createContents = Window_Base.prototype.createContents;
Window_Base.prototype.createContents = function() {
	
	// > 执行 清空字符块贴图-全部
	if( this.contents != undefined ){
		this.drill_COWCSp_sprite_clearAllSprite();   //『字符块全部清空注意』（每次重建画布时，之前的字符块贴图都清空）
	}
	
	// > 原函数
	_drill_COWCSp_createContents.call(this);
};
//=============================
// * 窗口标记 - 清理画布时（全部画布）
//=============================
var _drill_COWCSp_bitmap_clear = Bitmap.prototype.clear;
Bitmap.prototype.clear = function(){
	_drill_COWCSp_bitmap_clear.call(this);
	
	// > 寻找父贴图
	var temp_child_sprite = null;
	if( temp_child_sprite == null &&
		this._drill_COWCSp_blockSpriteList != undefined &&
		this._drill_COWCSp_blockSpriteList.length > 0 ){
		temp_child_sprite = this._drill_COWCSp_blockSpriteList[0];
	}
	if( temp_child_sprite == null &&
		this._drill_COWCSp_customSpriteList != undefined &&
		this._drill_COWCSp_customSpriteList.length > 0 ){
		temp_child_sprite = this._drill_COWCSp_customSpriteList[0];
	}
	if( temp_child_sprite == null ){ return; }
	var temp_parent_layer = temp_child_sprite.parent;
	if( temp_parent_layer == null ){ return; }
	var temp_parent_sprite = temp_parent_layer.parent;
	if( temp_parent_sprite == null ){ return; }
	
	// > 执行 清空字符块贴图-全部
	temp_parent_sprite.drill_COWCSp_sprite_clearAllSprite();   //『字符块全部清空注意』（每次清理全部画布时，之前的字符块贴图都清空）
}
//=============================
// * 窗口标记 - 清理画布时（矩形范围）
//
//			说明：	> 矩形范围的局部清理，特别浪费性能。这里不操作了，让子插件根据情况自己手动加。
//					> 此函数还会造成 对话框+无头像 的字符块，只能显示最后一个，暂时不明原因。
//=============================
/*
var _drill_COWCSp_bitmap_clearRect = Bitmap.prototype.clearRect;
Bitmap.prototype.clearRect = function( x, y, width, height ){
	_drill_COWCSp_bitmap_clearRect.call(this, x, y, width, height);
	
	// > 寻找父贴图
	var temp_child_sprite = null;
	if( temp_child_sprite == null &&
		this._drill_COWCSp_blockSpriteList != undefined &&
		this._drill_COWCSp_blockSpriteList.length > 0 ){
		temp_child_sprite = this._drill_COWCSp_blockSpriteList[0];
	}
	if( temp_child_sprite == null &&
		this._drill_COWCSp_customSpriteList != undefined &&
		this._drill_COWCSp_customSpriteList.length > 0 ){
		temp_child_sprite = this._drill_COWCSp_customSpriteList[0];
	}
	if( temp_child_sprite == null ){ return; }
	var temp_parent_layer = temp_child_sprite.parent;
	if( temp_parent_layer == null ){ return; }
	var temp_parent_sprite = temp_parent_layer.parent;
	if( temp_parent_sprite == null ){ return; }
	
	// > 执行 清空字符块贴图-指定区域
	var rect = { 'x':x, 'y':y, 'width':width, 'height':height }
	temp_parent_sprite.drill_COWCSp_sprite_clearSpriteInRect( rect );
};
*/


//=============================================================================
// ** ☆翻转控制
//
//			说明：	> 该模块提供 翻转控制，即对 贴图缩放 的属性修改。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 翻转控制 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COWCSp_Flip_COCD_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COWCSp_Flip_COCD_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command.toLowerCase() == "@@@-sp" ){
		if( args.length == 2 ){
			
			// > 『底层字符定义』 - 横向翻转（@@@-sp[horFlip:true]） sprite
			if( String(args[0]) == "horFlip" ){
				if( String(args[1]) == "true" ){
					cur_baseParam['sprite_needHorFlip'] = true;
				}else{
					cur_baseParam['sprite_needHorFlip'] = undefined;
				}
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			
			// > 『底层字符定义』 - 纵向翻转（@@@-sp[verFlip:true]） sprite
			if( String(args[0]) == "verFlip" ){
				if( String(args[1]) == "true" ){
					cur_baseParam['sprite_needVerFlip'] = true;
				}else{
					cur_baseParam['sprite_needVerFlip'] = undefined;
				}
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
}
//==============================
// * 翻转控制 - 贴图设置（继承）
//==============================
var _drill_COWCSp_Flip_sprite_setupSprite = Bitmap.prototype.drill_COWCSp_sprite_setupSprite;
Bitmap.prototype.drill_COWCSp_sprite_setupSprite = function( new_sprite, baseParam, sprite_options ){
	_drill_COWCSp_Flip_sprite_setupSprite.call( this, new_sprite, baseParam, sprite_options );
	
	// > 『绘制过程定义』 - 横向翻转（@@@-sp[horFlip:true]）
	if( baseParam['sprite_needHorFlip'] == true ){
		new_sprite.scale.x = -1;
	}
	
	// > 『绘制过程定义』 - 纵向翻转（@@@-sp[verFlip:true]）
	if( baseParam['sprite_needVerFlip'] == true ){
		new_sprite.scale.y = -1;
	}
}

//=============================================================================
// ** ☆窗口字符应用之效果字符（翻转控制）
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之效果字符（翻转控制） - 组合符配置
//==============================
var _drill_COWCSp_COWC_effect_processCombined_2 = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWCSp_COWC_effect_processCombined_2.call( this, matched_index, matched_str, command, args );
	
	// > 『窗口字符定义』 - 横向翻转（\dtsh[on]、\dtsh[off]）
	if( command == "dtsh" ){
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "ON" || String(args[0]).toUpperCase() == "TRUE" ){
				this.drill_COWC_effect_submitCombined( "@@@-sp[horFlip:true]" );
				return;
			}
			if( String(args[0]).toUpperCase() == "OFF" || String(args[0]).toUpperCase() == "FALSE" ){
				this.drill_COWC_effect_submitCombined( "@@@-sp[horFlip:false]" );
				return;
			}
		}
	}
	
	// > 『窗口字符定义』 - 纵向翻转（\dtsv[on]、\dtsv[off]）
	if( command == "dtsv" ){
		if( args.length == 1 ){
			if( String(args[0]).toUpperCase() == "ON" || String(args[0]).toUpperCase() == "TRUE" ){
				this.drill_COWC_effect_submitCombined( "@@@-sp[verFlip:true]" );
				return;
			}
			if( String(args[0]).toUpperCase() == "OFF" || String(args[0]).toUpperCase() == "FALSE" ){
				this.drill_COWC_effect_submitCombined( "@@@-sp[verFlip:false]" );
				return;
			}
		}
	}
}


//=============================================================================
// ** ☆贴图内边距
//
//			说明：	> 该模块提供 贴图内边距，即对 画布 的背景修改。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图内边距 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COWCSp_padding_COCD_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COWCSp_padding_COCD_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command.toLowerCase() == "@@@-sp" ){
		if( args.length == 2 ){
			
			// > 『底层字符定义』 - 内边距 - 全部（@@@-sp[padding:10]） sprite
			if( String(args[0]) == "padding" ){
				cur_baseParam['sprite_paddingTop'] = Number(args[1]);
				cur_baseParam['sprite_paddingBottom'] = Number(args[1]);
				cur_baseParam['sprite_paddingLeft'] = Number(args[1]);
				cur_baseParam['sprite_paddingRight'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 内边距 - 上（@@@-sp[paddingTop:10]） sprite
			if( String(args[0]) == "paddingTop" ){
				cur_baseParam['sprite_paddingTop'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 内边距 - 下（@@@-sp[paddingBottom:10]） sprite
			if( String(args[0]) == "paddingBottom" ){
				cur_baseParam['sprite_paddingBottom'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 内边距 - 左（@@@-sp[paddingLeft:10]） sprite
			if( String(args[0]) == "paddingLeft" ){
				cur_baseParam['sprite_paddingLeft'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 内边距 - 右（@@@-sp[paddingRight:10]） sprite
			if( String(args[0]) == "paddingRight" ){
				cur_baseParam['sprite_paddingRight'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			
		}
	}
}

//=============================================================================
// ** ☆窗口字符应用之效果字符（贴图内边距）
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之效果字符（贴图内边距） - 组合符配置
//==============================
var _drill_COWCSp_COWC_effect_processCombined_3 = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWCSp_COWC_effect_processCombined_3.call( this, matched_index, matched_str, command, args );
	
	if( command == "dtsp" ){
		if( args.length == 1 ){
			
			// > 『窗口字符定义』 - 内边距 - 清空（\dtsp[reset]）
			if( String(args[0]).toLowerCase() == "reset" ){
				this.drill_COWC_effect_submitCombined( "@@@-sp[padding:0]" );
				return;
				
			// > 『窗口字符定义』 - 内边距 - 全部（\dtsp[10]）
			}else{
				this.drill_COWC_effect_submitCombined( "@@@-sp[padding:"+String(args[0])+"]" );
				return;
			}
		}
		// > 『窗口字符定义』 - 内边距 - 上下+左右（\dtsp[5:10]）
		if( args.length == 2 ){
			this.drill_COWC_effect_submitCombined(
				"@@@-sp[paddingTop:"+String(args[0])+"]"+
				"@@@-sp[paddingBottom:"+String(args[0])+"]"+
				"@@@-sp[paddingLeft:"+String(args[1])+"]"+
				"@@@-sp[paddingRight:"+String(args[1])+"]"
			);
			return;
		}
		// > 『窗口字符定义』 - 内边距 - 上+下+左+右（\dtsp[5,5,10,10]）
		if( args.length == 4 ){
			this.drill_COWC_effect_submitCombined(
				"@@@-sp[paddingTop:"+String(args[0])+"]"+
				"@@@-sp[paddingBottom:"+String(args[1])+"]"+
				"@@@-sp[paddingLeft:"+String(args[2])+"]"+
				"@@@-sp[paddingRight:"+String(args[3])+"]"
			);
			return;
		}
	}
}



//=============================================================================
// ** ☆DEBUG显示
//
//			说明：	> 该模块提供 DEBUG显示 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG显示 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COWCSp_debug_COCD_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COWCSp_debug_COCD_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command.toLowerCase() == "@@@-de" ){
		if( args.length == 1 ){
			var type = String(args[0]);
			
			// > 『底层字符定义』 - 测试标记（@@@-de[显示字符块范围]） debug
			if( type == "显示字符块范围" ){
				cur_baseParam['sprite_debugRect'] = true;	//（之后的文本才会显示标记）
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 测试标记（@@@-de[隐藏字符块范围]） debug
			if( type == "隐藏字符块范围" ){
				cur_baseParam['sprite_debugRect'] = false;	//（之后的文本才会显示标记）
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
}
//==============================
// * DEBUG显示 - 测试标记（继承）
//==============================
var _drill_COWCSp_debug_sprite_setupBitmap = Bitmap.prototype.drill_COWCSp_sprite_setupBitmap;
Bitmap.prototype.drill_COWCSp_sprite_setupBitmap = function( new_bitmap, baseParam, sprite_options ){
	_drill_COWCSp_debug_sprite_setupBitmap.call( this, new_bitmap, baseParam, sprite_options );
	
	// > 『绘制过程定义』 - 测试标记（@@@-de[显示字符块范围]、@@@-de[隐藏字符块范围]）
	if( baseParam['sprite_debugRect'] == true ){
		new_bitmap.drill_COCD_strokeRect( 0,0,new_bitmap.width,new_bitmap.height, "#22aa22", 2, "miter" );
	}
}

//=============================================================================
// ** ☆窗口字符应用之效果字符（DEBUG显示）
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之效果字符（DEBUG显示） - 组合符配置
//==============================
var _drill_COWCSp_COWC_effect_processCombined_4 = Game_Temp.prototype.drill_COWC_effect_processCombined;
Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
	_drill_COWCSp_COWC_effect_processCombined_4.call( this, matched_index, matched_str, command, args );
	
	if( command.toUpperCase() == "DEBUG" ){
		if( args.length == 1 ){
			var type = String(args[0]);
			if( type == "显示字符块范围" ||  //『窗口字符定义』 - 测试标记（\debug[显示字符块范围]）
				type == "隐藏字符块范围" ){  //『窗口字符定义』 - 测试标记（\debug[隐藏字符块范围]）
				var str = "@@@-de[" + String(args[0]) + "]";
				this.drill_COWC_effect_submitCombined( str );
				return;
			}
		}
	}
}




//#############################################################################
// ** 【标准模块】☆逐个绘制的字符块阶段 标准模块
//#############################################################################
//##############################
// * 逐个绘制的字符块阶段 - 是否处于逐个绘制流程中【标准参数】【子Sprite】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 该函数 可以 放在帧刷新中反复调用。
//					> 该函数的主类为 字符块贴图 。
//##############################
Sprite.prototype.drill_COWCSp_sprite_isTimingEnabled = function(){
	return this._drill_COWCSp_sprite_isTimingEnabled == true;
};
//##############################
// * 逐个绘制的字符块阶段 - 每个字符块开始时【标准接口】【父Bitmap】
//			
//			参数：	> sprite 对象      （贴图）
//					> sprite_index 数字（贴图索引）
//					> textBlock 对象   （字符块）
//					> row_index 数字   （当前行索引）
//					> text_index 数字  （当前字符索引）
//			返回：	> 无
//			
//			说明：	> 子插件需要专门处理 逐个绘制+字符块贴图 条件时可继承此函数。
//##############################
Bitmap.prototype.drill_COWCSp_timing_spriteStart = function( sprite, sprite_index, textBlock, row_index, text_index ){
	
	//（待子类继承写内容）
	
};

//=============================================================================
// ** ☆逐个绘制的字符块贴图
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 逐个绘制的字符块贴图 - 流程开始时（继承）
//==============================
var _drill_COWCSp_COWC_timing_allStart = Bitmap.prototype.drill_COWC_timing_allStart;
Bitmap.prototype.drill_COWC_timing_allStart = function( rowBlock_list ){
	_drill_COWCSp_COWC_timing_allStart.call( this, rowBlock_list );
	this.drill_COWCSp_timing_initData( rowBlock_list );
}
//==============================
// * 逐个绘制的字符块贴图 - 数据初始化
//==============================
Bitmap.prototype.drill_COWCSp_timing_initData = function( rowBlock_list ){
	
	// > 字符块贴图 - 提前绘制
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for(var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var cur_baseParam = textBlock.drill_textBlock_getBaseParam();
			if( cur_baseParam['sprite_type'] != "" ){
				
				// > 底层字符『字符核心流程』 - 绘制-绘制单个字符块
				this.drill_COCD_drawTextBlock( textBlock );
			}
		}
	}
	
	// > 字符块贴图 - 隐藏
	if( this._drill_COWCSp_blockSpriteList != undefined ){
		for(var i = 0; i < this._drill_COWCSp_blockSpriteList.length; i++ ){
			var temp_sprite = this._drill_COWCSp_blockSpriteList[i];
			temp_sprite.visible = false;
			temp_sprite._drill_COWCSp_sprite_isTimingEnabled = true;	//（是否处于逐个绘制流程，子插件可能用到）
		}
	}
	
	// > 字符块贴图 - 计数器
	this._drill_COWCSp_timing_index = 0;
}
//==============================
// * 逐个绘制的字符块贴图 - 次刷新执行绘制 绑定
//==============================
var _drill_COWCSp_COWC_timing_textDraw = Bitmap.prototype.drill_COWC_timing_textDraw;
Bitmap.prototype.drill_COWC_timing_textDraw = function( textBlock ){
	
	// > 字符块贴图 - 已提前绘制，不再绘制
	var cur_baseParam = textBlock.drill_textBlock_getBaseParam();
	if( cur_baseParam['sprite_type'] != "" ){
		this.drill_COWCSp_timing_textDraw( textBlock );
		return;
	}
	
	// > 原函数
	_drill_COWCSp_COWC_timing_textDraw.call( this, textBlock );
}
//==============================
// * 逐个绘制的字符块贴图 - 次刷新执行绘制
//==============================
Bitmap.prototype.drill_COWCSp_timing_textDraw = function( textBlock ){
	var index = this._drill_COWCSp_timing_index;
	
	// > 字符块贴图 - 显示
	var temp_sprite = this._drill_COWCSp_blockSpriteList[ index ];
	if( temp_sprite != undefined ){
		temp_sprite.visible = true;
		
		// > 逐个绘制的字符块阶段 - 每个字符块开始时
		this.drill_COWCSp_timing_spriteStart( temp_sprite, index, textBlock, this._drill_COWC_timing_rowIndex, this._drill_COWC_timing_textIndex );
	}
	
	// > 字符块贴图 - 计数器
	this._drill_COWCSp_timing_index += 1;
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfWindowCharacterSprite = false;
		var pluginTip = DrillUp.drill_COWCSp_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


