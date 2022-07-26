//=============================================================================
// Drill_DialogTextAlign.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        窗口字符 - 文本居中
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
 * 使得你可以控制指定行的文字居中，并且支持图标、不同字体大小的居中。
 * ★★必须基于 相关核心 插件★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心
 *     需要该核心才能设置居中与右对齐。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   对所有窗口有效。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 细节：
 *   (1.如果对话框中有头像，插件会以除去头像外的剩余位置来居中适应。
 *   (2.居中字符能与窗口字符"\px[100]"兼容。
 *   (3.字符对所有窗口都有效，你可以在任何支持 窗口字符 的窗口中试
 *      试该字符。对于某些特殊修改了自身的光标结构的窗口，可能无效。
 * 叠加情况：
 *   (1.注意，同一行不能出现两个以上 居中/右对齐 字符。
 *      否则字符光标的偏移会叠加，导致字符越界看不见。
 *   (2.同样的，如果你设置了面板中自带的居中/右对齐功能，使用字符时
 *      光标的偏移也会叠加，导致字符越界看不见。
 * 设计：
 *   (1.你可以将右对齐符号插入文本的中间，实现右对齐符号两边的文本
 *      断开并贴着两边显示。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\dal       当前行中，该字符之后的文字左对齐
 * 窗口字符：\dac       当前行中，该字符之后的文字居中
 * 窗口字符：\dar       当前行中，该字符之后的文字右对齐
 * 
 * 1.注意，同一行不能出现两个以上 居中/右对齐 字符。
 *   (dal全称为：Drill_Align_Left，即左对齐)
 *   (dac全称为：Drill_Align_Center，即居中)
 *   (dar全称为：Drill_Align_Right，即右对齐)
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
//		★性能测试因素	对话管理层
//		★性能测试消耗	4.94ms（drawTextEx） 2.40ms（没有插件使用时）
//		★最坏情况		暂无
//		★备注			在反复测试刷选项窗口时，帧数会降低到22帧，但是只是添加了渲染render的负担，过一下就好了。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			文本居中：
//				->drawTextEx捕获计算
//					->contents重建时（ this.createContents() ）
//					->contents清空时（ this.contents.clear() 暂时不考虑，因为窗口都在refresh的时候重建了 ）
//				->对话框捕获计算
//					->新建页时（ this.newPage() ）
//				->防套娃死循环
//
//		★必要注意事项：
//			1. 2022/4/16 窗口字符核心 进行了一次大翻新，文本居中根本就没那么复杂。
//			   先计算每行宽度（居中字符不纳入计算），居中字符再进行宽度变化。
//			
//		★其它说明细节：
//			暂无
//		
//		★存在的问题：
//			暂无
//		
//		★旧日志（2022/4以前）：
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
//
 
//=============================================================================
// ** 变量获取
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
// ** 行宽标记
//=============================================================================
//==============================
// * 当前行 - 执行当前行（继承接口）
//==============================
var _drill_DTA_COWC_processNewLine = Window_Base.prototype.drill_COWC_processNewLine;
Window_Base.prototype.drill_COWC_processNewLine = function( line_index, line_text ){
	_drill_DTA_COWC_processNewLine.call( this, line_index, line_text );
	this._drill_DTA_line_width = this.drill_COWC_getCurLineWidth();
}
//==============================
// * 效果字符应用 - 光标偏移X（\PX 效果字符专用）
//==============================
var _drill_DTA_COWC_charOffsetX = Window_Base.prototype.drill_COWC_charOffsetX;
Window_Base.prototype.drill_COWC_charOffsetX = function( xx ){
	_drill_DTA_COWC_charOffsetX.call( this, xx );
	// （此函数用不上，因为计算宽度时，\px[100] 的宽度已经纳入了宽度计算。）
}

//=============================================================================
// ** 效果字符应用
//=============================================================================
//==============================
// * 效果字符应用 - 字符转换（简单符）
//==============================
var _drill_DTA_processNewEffectChar_Simple = Window_Base.prototype.drill_COWC_processNewEffectChar_Simple;
Window_Base.prototype.drill_COWC_processNewEffectChar_Simple = function( matched_index, command ){
	_drill_DTA_processNewEffectChar_Simple.call( this, matched_index, command );
	
	// > 不准套娃（该字符是算好单行宽度后，而变化的宽度。所以不准套娃计算。）
	if( this.drill_COWA_isCalculating() ){ 
		if( command.toUpperCase() == "DAL" ){ this.drill_COWC_charSubmit_Effect(0,0); }
		if( command.toUpperCase() == "DAC" ){ this.drill_COWC_charSubmit_Effect(0,0); }
		if( command.toUpperCase() == "DAR" ){ this.drill_COWC_charSubmit_Effect(0,0); }
		return; 
	}
	
	
	// > 左对齐（\DAL）
	if( command.toUpperCase() == "DAL" ){
		//（什么都不做）
		this.drill_COWC_charSubmit_Effect(0,0);
	}
	// > 居中（\DAC）
	if( command.toUpperCase() == "DAC" ){
		var ww = this._drill_DTA_line_width;
		var xx = 0;
		if( ww > 0 ){
			
			// > 当前行宽度
			var c_ww = this.contentsWidth();
			c_ww -= this._drill_COWC_effect_curData['left'] || 0;	//（去除起始光标位置的影响）
			
			// > 对话框的脸图宽度影响
			if( this._drill_COWC_messageFaceWidthSubtracted != true ){	//（来自核心的标记）
				if( this instanceof Window_Message == true && $gameMessage.faceName() != "" ){
					c_ww -= (Window_Base._faceWidth + 20);
				}
			}
			
			// > 居中
			xx = c_ww *0.5 - ww*0.5;
		}
		this.drill_COWC_charSubmit_Effect(xx,0);
	}
	// > 右对齐（\DAR）
	if( command.toUpperCase() == "DAR" ){
		var ww = this._drill_DTA_line_width;
		var xx = 0;
		if( ww > 0 ){
			
			// > 当前行宽度
			var c_ww = this.contentsWidth();
			c_ww -= this._drill_COWC_effect_curData['left'] || 0;	//（去除起始光标位置的影响）
			
			// > 对话框的脸图宽度影响
			if( this._drill_COWC_messageFaceWidthSubtracted != true ){	//（来自核心的标记）
				if( this instanceof Window_Message == true && $gameMessage.faceName() != "" ){
					c_ww -= (Window_Base._faceWidth + 20);
				}
			}
			
			// > 右对齐
			xx = c_ww - ww;
		}
		this.drill_COWC_charSubmit_Effect(xx,0);
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogTextAlign = false;
		alert(
			"【Drill_DialogTextAlign.js 窗口字符 - 文本居中】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowCharacter 窗口字符-窗口字符核心"
		);
}


