//=============================================================================
// Drill_DialogNameBox.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        对话框 - 姓名框窗口
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
 * 使得你可以使用窗口字符，在对话框旁建立姓名框窗口。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowAuxiliary    系统-窗口辅助核心★★v1.9及以上★★
 *     姓名框窗口需要根据窗口字符的宽度来确定窗口大小，需要用到该核心。
 * 可被扩展：
 *   - Drill_DialogSkin               对话框-对话框皮肤
 *     对话框皮肤能够对 本插件的姓名框 进行皮肤装饰。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只对对话框窗口有效。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 细节：
 *   (1.姓名框窗口的窗口字符转换的 优先级 最高，最先进行识别与转换。
 *      姓名框"\n<>"的结构中，你甚至可以嵌套其它 窗口字符 。
 * 设计：
 *   (1.虽然名称叫姓名框，但是该窗口的长度并没有限制。
 *      你可以将其当做的一行某些内容的注释帮助信息。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来显示姓名框：
 * 
 * 窗口字符：\n<姓名框内容>
 * 窗口字符：\nl<姓名框内容>
 * 窗口字符：\nc<姓名框内容>
 * 窗口字符：\nr<姓名框内容>
 * 
 * 1."\n"和"\nl"表示姓名框在最左侧。
 *   "\nc"表示姓名框在中间。
 *   "\nr"表示姓名框在最右侧。
 * 2.注意，姓名框的内容需要用尖括号包裹。
 *   并且，尖括号内的内容，支持其他窗口字符嵌套。
 *   比如："\n<\c[6]小爱丽丝>"
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
 * 
 * 
 * 
 * @param ---姓名框窗口---
 * @desc 
 * 
 * @param 姓名框-横向收拢偏移量
 * @parent ---姓名框窗口---
 * @desc 姓名框基础上额外的偏移量，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 * 
 * @param 姓名框-纵向收拢偏移量
 * @parent ---姓名框窗口---
 * @desc 姓名框基础上额外的偏移量，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
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
 * @param 姓名框-额外前缀
 * @parent ---姓名框窗口---
 * @desc 姓名框文本基础上额外的添加的额外前缀文本。
 * @default 
 * 
 * @param 姓名框-额外后缀
 * @parent ---姓名框窗口---
 * @desc 姓名框文本基础上额外的添加的额外后缀文本。
 * @default 
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
//		★性能测试因素	对话管理层
//		★性能测试消耗	太小，未找到
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			姓名框窗口：
//				->姓名框
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
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogNameBox = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogNameBox');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DNB_nameBox_closingX = Number(DrillUp.parameters["姓名框-横向收拢偏移量"] || 0); 
	DrillUp.g_DNB_nameBox_closingY = Number(DrillUp.parameters["姓名框-纵向收拢偏移量"] || 0); 
	DrillUp.g_DNB_nameBox_padding = Number(DrillUp.parameters["姓名框-内边距"] || 18); 
	DrillUp.g_DNB_nameBox_fontSize = Number(DrillUp.parameters["姓名框-字体大小"] || 28); 
	DrillUp.g_DNB_nameBox_prefix = String(DrillUp.parameters["姓名框-额外前缀"] || ""); 
	DrillUp.g_DNB_nameBox_suffix = String(DrillUp.parameters["姓名框-额外后缀"] || ""); 
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** 启动时校验
//=============================================================================
var _drill_DNB_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_DNB_scene_initialize.call(this);
	
	if( Imported.YEP_MessageCore ){
		alert(
			"【Drill_DialogNameBox.js 对话框 - 姓名框窗口】\n"+
			"检测到你开启了 YEP_MessageCore插件。\n"+
			"请及时关闭该插件，该插件与 姓名框窗口 兼容性冲突。"
		);
	}
};


//=============================================================================
// ** 姓名框绑定
//=============================================================================
//==============================
// * 对话框 - 创建子窗口
//==============================
var _drill_DNB_msg_createSubWindows = Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
	_drill_DNB_msg_createSubWindows.call(this);
	this._drill_DNB_nameWindow = new Drill_DNB_NameBoxWindow( this );
    
	// > 强行用addChild，因为addWindow会出现窗口相互遮挡问题
	var scene = SceneManager._scene;
    scene.addChild(this._drill_DNB_nameWindow);
};
//==============================
// * 对话框 - 相关子窗口
//
//			说明：	该函数被父场景调用并自动addWindow。
//==============================
//var _drill_DNB_msg_subWindows = Window_Message.prototype.subWindows;
//Window_Message.prototype.subWindows = function(){
//	var win_list = _drill_DNB_msg_subWindows.call(this);
//	win_list.push( this._drill_DNB_nameWindow );
//	return win_list;
//};
//==============================
// * 对话框 - 显示新建页
//==============================
var _drill_DNB_msg_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    this._drill_DNB_nameWindow.deactivate();	//（关闭姓名框）
    _drill_DNB_msg_startMessage.call(this);
};
//==============================
// * 对话框 - 关闭对话框
//==============================
var _drill_DNB_msg_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
	this._drill_DNB_nameWindow.deactivate();	//（关闭姓名框）
	_drill_DNB_msg_terminateMessage.call(this);
};

//==============================
// * 对话框 - 执行转义字符
//==============================
var _drill_DNB_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function( text ){
	
	// > 姓名框捕获（注意，这个位置是在 \ 变成 \x1b 之前的时候）
	if( this instanceof Window_Message ){
		text = this.drill_DNB_processNameBox( text );
	}
	
	// > 原函数
	return _drill_DNB_convertEscapeCharacters.call( this, text );
}
//==============================
// * 对话框 - 姓名框字符转换
//==============================
Window_Message.prototype.drill_DNB_processNameBox = function( text ){
	
	var re = /\\N\<([^\>]+)\>/gi;		//（用g时，lastIndex才能生效）
	var re_data = re.exec(text);
	if( re_data != null ){
		
		// > 刷新姓名窗口
		this._drill_DNB_nameWindow.drill_setData( re_data[1], "左");
		
		// > 截断字符串
		var index_a = re.lastIndex - re_data[0].length;
		var index_b = re.lastIndex;
		var text_a = text.substring( 0, index_a );
		var text_b = text.substring( index_b );
		text = text_a + text_b;
		return text;
	}
	
	var re = /\\NL\<([^\>]+)\>/gi;
	var re_data = re.exec(text);
	if( re_data != null ){
		
		// > 刷新姓名窗口
		this._drill_DNB_nameWindow.drill_setData( re_data[1], "左");
		
		// > 截断字符串
		var index_a = re.lastIndex - re_data[0].length;
		var index_b = re.lastIndex;
		var text_a = text.substring( 0, index_a );
		var text_b = text.substring( index_b );
		text = text_a + text_b;
		return text;
	}
	
	var re = /\\NC\<([^\>]+)\>/gi;
	var re_data = re.exec(text);
	if( re_data != null ){
		
		// > 刷新姓名窗口
		this._drill_DNB_nameWindow.drill_setData( re_data[1], "中");
		
		// > 截断字符串
		var index_a = re.lastIndex - re_data[0].length;
		var index_b = re.lastIndex;
		var text_a = text.substring( 0, index_a );
		var text_b = text.substring( index_b );
		text = text_a + text_b;
		return text;
	}
	
	var re = /\\NR\<([^\>]+)\>/gi;
	var re_data = re.exec(text);
	if( re_data != null ){
		
		// > 刷新姓名窗口
		this._drill_DNB_nameWindow.drill_setData( re_data[1], "右");
		
		// > 截断字符串
		var index_a = re.lastIndex - re_data[0].length;
		var index_b = re.lastIndex;
		var text_a = text.substring( 0, index_a );
		var text_b = text.substring( index_b );
		text = text_a + text_b;
		return text;
	}
	
	return text;
};



//=============================================================================
// ** 姓名窗口【Drill_DNB_NameBoxWindow】
//
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
Drill_DNB_NameBoxWindow.prototype.initialize = function( p ){
	
	// > 绑定父窗体
	this._drill_parentWindow = p;
	
	// > 原函数
    Window_Base.prototype.initialize.call(this, 0, 0, 240, this.windowHeight());
	
	// > 私有参数初始化
    this._drill_text = "";
    this._drill_showingText = "";
    this._drill_width = 240;
    this._drill_closeDelay = 0;
	
	// > 私有属性初始化
    this._openness = 0;			//初始紧闭
	
	// > 初始隐藏
    this.deactivate();
    this.hide();
};
//==============================
// * 姓名窗口 - 属性 - 内边距
//==============================
Drill_DNB_NameBoxWindow.prototype.standardPadding = function(){ return DrillUp.g_DNB_nameBox_padding; };
//==============================
// * 姓名窗口 - 属性 - 窗口宽度（暂不考虑文本伸缩情况，后续还需要伸缩）
//==============================
Drill_DNB_NameBoxWindow.prototype.windowWidth = function(){ return this._drill_width + this.standardPadding()*2; };
//==============================
// * 姓名窗口 - 属性 - 高度（1行高）
//==============================
Drill_DNB_NameBoxWindow.prototype.windowHeight = function(){ return this.fittingHeight(1); };
//==============================
// * 姓名窗口 - 属性 - 字体大小
//==============================
Drill_DNB_NameBoxWindow.prototype.standardFontSize = function() { return DrillUp.g_DNB_nameBox_fontSize; };

//==============================
// * 姓名窗口 - 帧刷新
//==============================
Drill_DNB_NameBoxWindow.prototype.update = function() {
    Window_Base.prototype.update.call(this);
	this.drill_updateClosing();
};
//==============================
// * 帧刷新 - 跟随父窗口关闭
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_updateClosing = function() {
	if( this.active ){ return; }
	if( this.isClosed() ){ return; }
	if( this.isClosing() ){ return; }
	
	// > 关闭延迟
	this._drill_closeDelay -= 1;
	if( this._drill_closeDelay > 0 ){ return; }
	
	// > 父窗口关闭 则关闭
	if( this._drill_parentWindow.isClosing() ){
		this._openness = this._drill_parentWindow.openness;
	}else{
		this.close();
	}
}
//==============================
// * 姓名窗口 - 设置数据（接口）
//
//			说明：	通过手动调用此函数，
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_setData = function( text, position_type ){
	
	// > 参数刷新
	this._drill_text = text;					//文本
	this._drill_showingText = DrillUp.g_DNB_nameBox_prefix + text + DrillUp.g_DNB_nameBox_suffix;
	this._drill_positionType = position_type;	//位置类型
	this._drill_closeDelay = 4;					//关闭激活延迟
	
	// > 刷新姓名框大小
	this._drill_width = this.drill_COWA_getTextExWidth( this._drill_showingText );	//（计算宽度）
	this.width = this.windowWidth();
	this.createContents();
	this.contents.clear();
	this.resetFontSettings();
	
	// > 绘制内容（窗口辅助核心的 标准函数 ）
	this.drill_COWA_drawTextEx( this._drill_showingText, {"x":0,"y":0} );
	
	if( this._drill_parentWindow instanceof Window_Message ){
		this._drill_parentWindow.updatePlacement();
	}
	this.drill_refreshPositionX();
	this.drill_refreshPositionY();
	
	// > 激活窗口
	this.show();
	this.open();
	this.activate();
};
//==============================
// * 姓名窗口 - 刷新位置X
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_refreshPositionX = function() {
	var xx = 0;
	
	if( this._drill_positionType == "左" ){
		xx = this._drill_parentWindow.x;
		xx += DrillUp.g_DNB_nameBox_closingX;		//（向内偏移量）
	
	}else if( this._drill_positionType === "中" ){
		xx = this._drill_parentWindow.x;
		xx += this._drill_parentWindow.width / 2;
		xx -= this.width / 2;
	
	}else if( this._drill_positionType === "右" ){
		xx = this._drill_parentWindow.x + this._drill_parentWindow.width;
		xx -= this.width;
		xx -= DrillUp.g_DNB_nameBox_closingX;
	}
	
	// > 不能过界
	if( xx < 0 ){ xx = 0; }
	if( xx > Graphics.boxWidth - this.width ){ xx = Graphics.boxWidth - this.width; }
	
	this.x = xx;
};
//==============================
// * 姓名窗口 - 刷新位置Y
//==============================
Drill_DNB_NameBoxWindow.prototype.drill_refreshPositionY = function() {
	
	if( $gameMessage.positionType() == 0 ){		//顶部
		this.y = this._drill_parentWindow.y + this._drill_parentWindow.height;
		this.y -= DrillUp.g_DNB_nameBox_closingY;
	}else{
		this.y = this._drill_parentWindow.y;
		this.y -= this.height;
		this.y += DrillUp.g_DNB_nameBox_closingY;
	}
	
	if( this.y < 0 ){
		this.y = this._drill_parentWindow.y + this._drill_parentWindow.height;
		this.y -= DrillUp.g_DNB_nameBox_closingY;
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogNameBox = false;
		alert(
			"【Drill_DialogNameBox.js  对话框 - 姓名框窗口】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowAuxiliary  系统-窗口辅助核心"
		);
}

