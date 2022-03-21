//=============================================================================
// Drill_DialogTextAlign.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        对话框 - 文本居中
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
 * 该插件 不能 单独使用，必须基于核心。
 * 基于：
 *   - YEP_MessageCore               对话框-消息核心★★[v1.1]及以上★★
 *   - Drill_CoreOfWindowAuxiliary   系统-窗口辅助核心★★v1.3及以上★★
 *     需要该核心才能设置居中与右对齐。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   对所有窗口有效。
 * 2.了解更多窗口字符，可以去看看 "15.对话框 > 关于窗口字符.docx"。
 * 细节：
 *   (1.如果对话框中有头像，插件会以除去头像外的剩余位置来居中适应。
 *   (2.你可以将右对齐符号插入文本的中间，实现文本断开并贴着两边。
 *   (3.居中字符能与字符"\px[100]"兼容。
 *   (4.字符对所有窗口都有效，你可以在任何支持效果字符的窗口中试试
 *      该字符。对于某些特殊修改了自身的光标结构的窗口，可能无效。
 * 叠加情况：
 *   (1.注意，同一行不能出现两个以上 居中/右对齐 字符。
 *      否则字符光标的偏移会叠加，导致字符越界看不见。
 *   (2.同样的，如果你设置了面板中自带的居中/右对齐功能，使用字符时
 *      光标的偏移也会叠加。
 * 
 * -----------------------------------------------------------------------------
 * ----激活方式
 * 
 * 效果字符
 *   \dal       当前行中，该字符之后的文字左对齐。
 *   \dac       当前行中，该字符之后的文字居中。
 *   \dar       当前行中，该字符之后的文字右对齐。
 *   (dal全称为：Drill_Align_Left，即左对齐)
 *   (dac全称为：Drill_Align_Center，即居中)
 *   (dar全称为：Drill_Align_Right，即右对齐)
 * 
 * 注意，同一行不能出现两个以上 居中/右对齐 字符。
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
//		工作类型		单次执行
//		时间复杂度		o(n)
//		性能测试因素	对话管理层
//		性能测试消耗	4.94ms（drawTextEx） 2.40ms（没有插件使用时）
//		最坏情况		暂无
//		备注			在反复测试刷选项窗口时，帧数会降低到22帧，但是只是添加了渲染render的负担，过一下就好了。
//
//插件记录：
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
//			1.因为 Window_Message 根本就没用到 drawTextEx 函数。
//			  所以需要额外进行一次捕获。
//			2.修改 textState.x 时，【千万注意！】
//			  宽度计算也基于此 textState.x 参数，如果套娃了，会无限叠加错位。
//			3.对话框 改变宽度 时，【不能马上计算宽度（绘制）】，否则会出现死循环。
//			  从函数的角度来看，这个看似简单的问题已经深入到了一个更深层次的死锁问题了，
//			  即使代码都有注释，且是我熟悉的地方，但是我发现无法深入，因为太复杂了。最后，用update绕开了死循环问题。
//			  2021-8-24 在newpage时，只执行一次计算，就不会死循环。
//			  （底层非常清晰，不应该存在问题，猜测是yep插件的问题，不过先这样吧……）
//			
//		★其它说明细节：
//			1.居中要一个非常麻烦的变量：字符宽度，而这个宽度，必须先绘制一次之后，才能得到。
//			  经过多次套娃与反套娃，终于实现了效果。
//			  不过理解时可能比较绕。具体去窗口辅助核心去看看。
//			2. \px[100] 字符也是个影响因素，只不过是最外层的影响因素，最后考虑。
//		
//		★存在的问题：
//			1.设置多行时，超过6行，右对齐和居中会产生偏移位置。（套娃bug，已发现并解决）
//			2.信息面板k中，移动选项光标时，计算的字符长度会变长，原因不明。可以确定不是套娃问题。（行数+1的问题，这里又是比较绕的地方了）
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
if( Imported.YEP_MessageCore &&
	Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** 宽度计算（一般窗口）
//=============================================================================
//==============================
// ** 宽度计算 - 初始化
//==============================
var _drill_DTA_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
	_drill_DTA_initialize.call( this, x, y, width, height );	
	this.drill_DTA_clearList();
}
//==============================
// ** 宽度计算 - 重新统计
//==============================
Window_Base.prototype.drill_DTA_clearList = function() {
	this._drill_DTA_cur_line = 0;		//当前行
	this._drill_DTA_textList = [];		//文本列表
	this._drill_DTA_widthList = [];		//文本宽度列表
}
//==============================
// ** 宽度计算 - 内容contents重建时，重新统计
//==============================
var _drill_DTA_createContents = Window_Base.prototype.createContents;
Window_Base.prototype.createContents = function() {
	_drill_DTA_createContents.call( this );
	if( this instanceof Window_Message == true ){ return; }	//排除对话框情况
	
	this.drill_DTA_clearList();	
}
//==============================
// ** 宽度计算 - 多次绘制时，累加统计
//==============================
var _drill_DTA_drawTextEx = Window_Base.prototype.drawTextEx;
Window_Base.prototype.drawTextEx = function( text, x, y ){
	
	// > 不准套娃
	if( $gameTemp._drill_COWA_bitmap_isCalculating == true ){
		return _drill_DTA_drawTextEx.call( this, text, x, y );
	}
				
	// > 统计宽度（drawTextEx可能会多次绘制，每次绘制前，累加统计）
    if( text != undefined ){
		var new_text = String(text);
		var temp_ww = this.drill_COWA_getTextExWidth( new_text );
		this._drill_DTA_textList.push( new_text );
		this._drill_DTA_widthList.push( temp_ww );
	}
	
	return _drill_DTA_drawTextEx.call( this, text, x, y );
}

//=============================================================================
// ** 宽度计算（对话框）
//=============================================================================
//==============================
// ** 宽度计算 - 对话框 绘制前初始化（对话框并不使用drawTextEx绘制）
//==============================
var _drill_DTA_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function( textState ){
	
	// > 不准套娃
	if( $gameTemp._drill_COWA_bitmap_isCalculating == true ){ return; }
	
	// > 防死循环
	if( this._drill_DTA_Block == true ){ return; }
	this._drill_DTA_Block = true;
	
		// > 强制清理
		this.drill_DTA_clearList();
		
		// > 统计宽度（对话框的文本每页是固定的，所以不需要那么麻烦）
		var new_text = String( textState.text );
		var temp_textList = new_text.split(/[\n\r]+/g);
		for( var i=0; i < temp_textList.length; i++ ){
			var temp_text = temp_textList[i];
			this._drill_DTA_textList.push( temp_text );
			//this._drill_DTA_widthList.push( temp_ww );	//（不能放这里，会死锁）
		}
		
		// > 只计算第一行的宽度（修复第一行不能居中的bug，宽度计算不能放循环）
		if( this._drill_DTA_textList.length > 0 ){
			var temp_ww = this.drill_COWA_getTextExWidth( this._drill_DTA_textList[0] );
			this._drill_DTA_widthList.push( temp_ww );
		}
	
	this._drill_DTA_Block = false;
	
	// > 执行新页控制
	_drill_DTA_newPage.call( this,textState );
}
//==============================
// ** 宽度计算 - 对话框 延迟计算宽度
//==============================
var _drill_DTA_m_update = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
	_drill_DTA_m_update.call( this );
	
	if( this._drill_DTA_textList.length > 0 &&
		this._drill_DTA_widthList.length <= 1 &&
		this.contents && this.contents.isReady() ){
			
		for( var i = 1; i < this._drill_DTA_textList.length; i++ ){
			var temp_text = this._drill_DTA_textList[i];
			var temp_ww = this.drill_COWA_getTextExWidth( temp_text );	//（计算长度时有可能会影响文本颜色，目前没有解决方法）
			this._drill_DTA_widthList.push( temp_ww );
		}
	}
}



//=============================================================================
// ** 文本转义
//=============================================================================
//==============================
// ** 文本转义 - 换行标记
//==============================
var _drill_DTA_processNewLine = Window_Base.prototype.processNewLine;
Window_Base.prototype.processNewLine = function( textState ){
	this._drill_DTA_cur_line += 1;
	_drill_DTA_processNewLine.call( this, textState );
}
//==============================
// ** 文本转义 - 指代字符 转换
//==============================
var _drill_DTA_YEP_convertExtraEscapeCharacters = Window_Base.prototype.convertExtraEscapeCharacters;
Window_Base.prototype.convertExtraEscapeCharacters = function( text ){
	text = text.replace(/\x1bDAL/gi, '\x1bDLGDRILL[0]');	//0 左对齐
	text = text.replace(/\x1bDAC/gi, '\x1bDLGDRILL[1]');	//1 居中
	text = text.replace(/\x1bDAR/gi, '\x1bDLGDRILL[2]');	//2 右对齐
	return _drill_DTA_YEP_convertExtraEscapeCharacters.call( this, text );
}
//==============================
// ** 文本转义 - 字符参数输入
//
//			说明：	字符参数输入时，必须考虑计算时"不准套娃"情况。
//==============================
var _drill_DTA_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function( code, textState ){
	switch ( code ){
		case 'DLGDRILL':	//（Dialog_Drill）
			var id = this.obtainEscapeParam(textState);	
			
			/*-----------------左对齐------------------*/
			if( id === 0 ){
				
				// > 不准套娃
				if( $gameTemp._drill_COWA_bitmap_isCalculating == true ){
					return;
				}
				
				//（什么都不做）
			}
			
			/*-----------------居中------------------*/
			if( id === 1 ){
				
				// > 不准套娃
				if( $gameTemp._drill_COWA_bitmap_isCalculating == true ){
					return;
				}
				
				// > 修改 textState.x 绘制（注意，改变textState.x会影响宽度计算）
				if( this._drill_DTA_cur_line < this._drill_DTA_widthList.length ){
					
					//（文字宽度）
					var ww = this._drill_DTA_widthList[ this._drill_DTA_cur_line ];
					
					//（当前绘制矩阵宽度）
					var c_ww = this.contentsWidth();
					if( this._drill_COWA_drawingOption ){
						c_ww = this._drill_COWA_drawingOption['width'];
					}
					if( this instanceof Window_Message == true ){	//（对话框的脸图宽度影响）
						c_ww = c_ww - this.newLineX();
					}
					
					//（居中）
					textState.x += c_ww *0.5 - ww*0.5;
				}
			}
			
			/*-----------------右对齐------------------*/
			if( id === 2 ){
				
				// > 不准套娃
				if( $gameTemp._drill_COWA_bitmap_isCalculating == true ){
					return;
				}
				
				// > 修改 textState.x 绘制（注意，改变textState.x会影响宽度计算）
				if( this._drill_DTA_cur_line < this._drill_DTA_widthList.length ){
					
					//（文字宽度）
					var ww = this._drill_DTA_widthList[ this._drill_DTA_cur_line ];
					
					//（当前绘制矩阵宽度）
					var c_ww = this.contentsWidth();
					if( this._drill_COWA_drawingOption ){
						c_ww = this._drill_COWA_drawingOption['width'];
					}
					if( this instanceof Window_Message == true ){	//（对话框的脸图宽度影响）
						c_ww = c_ww - this.newLineX();
					}
					
					//（右对齐）
					textState.x += c_ww - ww;
				}
			}
			break;
		default:
			_drill_DTA_processEscapeCharacter.call(this, code, textState);
			break;
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogTextAlign = false;
		alert(
			"【Drill_DialogTextAlign.js 对话框-文本居中】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"+
			"\n- YEP_MessageCore 对话框-消息核心"
		);
}


