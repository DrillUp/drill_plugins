//=============================================================================
// Drill_CoreOfWindowAuxiliary.js
//=============================================================================

/*:
 * @plugindesc [v2.2]        系统 - 窗口辅助核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfWindowAuxiliary +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 给各 子插件 提供 窗口属性修改 的辅助功能。
 * ★★尽量放在最靠上的位置★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 作用于：
 *   - Drill_SceneSelfplateA        面板-全自定义信息面板A
 *   - Drill_SceneSelfplateB        面板-全自定义信息面板B
 *   - Drill_SceneSelfplateC        面板-全自定义信息面板C
 *   - Drill_SceneSelfplateD        面板-全自定义信息面板D
 *   - Drill_SceneShop              面板-全自定义商店界面
 *   - Drill_SceneLimitedShop       面板-限量商店
 *   ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面、战斗界面。
 *   作用于所有窗口，添加辅助功能。
 * 细节：
 *   (1.旧版本插件中有 表达式、文本绘制 的功能，现已全部转移到 窗口字符核心 中。
 *      了解更多窗口字符，去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----知识点 - 帮助窗口换行
 * 在各类菜单窗口中如果使用到了帮助窗口，
 * 你可以直接在编辑器中写"\n"字符实现换行。
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
 * 测试方法1：  以正常流程进行游戏，记录参数消耗。
 * 测试结果1：  菜单界面，平均消耗为：【7.27ms】
 * 测试方法2：  以正常流程进行游戏，记录贴图消耗。
 * 测试结果2：  菜单界面，平均消耗为：【13.61ms】
 *              地图界面，平均消耗为：【17.40ms】
 *              战斗界面，平均消耗为：【8.35ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件有单次执行的辅助功能，当窗口/贴图移动时，会产生一定的
 *   贴图处理的消耗量。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * [v1.2]
 * 添加了帮助窗口换行的功能。
 * [v1.3]
 * 优化了内部结构。
 * [v1.4]
 * 修复了对话框中 使用姓名框+改变对话框宽度 时，卡死的bug。
 * [v1.5]
 * 修复了窗口移动只延迟一次的bug。
 * [v1.6]
 * 优化了窗口延迟显现时，透明度不为0的bug。
 * [v1.7]
 * 修复了计算高宽后，字体属性被重置的bug。
 * [v1.8]
 * 优化了文本宽度的计算结构。
 * [v1.9]
 * 大幅度优化了底层结构，并定义了标准接口。
 * [v2.0]
 * 优化了窗口底层的部分结构。
 * [v2.1]
 * 修复了对话框的窗口等待字符\!变成按两次才显示文本的bug。
 * [v2.2]
 * 分离了窗口字符大底层，只提供基本的窗口移动功能。
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COWA (Core_Of_Window_Auxiliary)
//		临时全局变量	无
//		临时局部变量	this._drill_COWA_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	来回切换选项、描述。
//		★性能测试消耗	7.27ms(信息面板A)	8.35ms/13.61ms(限量商店)
//		★最坏情况		暂无
//		★备注			由于该插件恰好处于树根位置，300ms的贴图消耗会变成这个插件的消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			
//			
//			->☆计算文本 标准模块
//				->基本文本 宽度【标准函数】（弃用）
//				->基本文本 高度【标准函数】（弃用）
//				->扩展文本 宽度【标准函数】（弃用）
//				->扩展文本 高度【标准函数】（弃用）
//				->是否正在计算【标准函数】（弃用）
//				->获取 扩展文本列表 的高度列表和宽度列表【标准函数】（弃用）
//			->☆绘制内容 标准模块
//				->绘制文本【标准函数】（弃用）
//				->绘制文本列表【标准函数】（弃用）
//				->绘制扩展文本【标准函数】（弃用）
//				->绘制扩展文本列表【标准函数】（弃用）
//			
//			
//			->☆窗口属性修改 标准模块
//				->窗口属性修改【标准函数】
//			->☆窗口属性修改实现
//			->☆属性动画 标准模块
//				->移动设置【标准函数】
//				->透明度设置【标准函数】
//				->重新移动【标准函数】
//				->重设透明度【标准函数】
//			->☆属性动画实现（窗口）
//				->窗口属性
//					->窗口高宽
//					->窗口布局
//						> 默认皮肤/单张背景贴图/隐藏布局
//				->移动属性
//					->位置
//					->起点相对坐标/起点绝对坐标
//					->匀速移动/弹性移动/不移动
//				->透明度属性
//				->回调属性
//			->☆属性动画实现（贴图）
//
//			->☆核心功能扩展
//				->帮助窗口换行
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			14.鼠标 > 关于鼠标悬浮窗口（脚本）.docx
//		
//		★插件私有类：
//			无
//			
//		★核心说明：
//			1.核心中含有 标准接口/标准函数 ，这是其它子插件的底座，无论核心内容怎么变，标准接口一定不能动。
//			2.帮助窗口换行 是一个附属的小功能，不具备标准接口。
//		
//		★必要注意事项：
//			1.该插件不要再对子插件开放各种新的支持了，不然多次更新反而千疮百孔。
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
	DrillUp.g_COWA_PluginTip_curName = "Drill_CoreOfWindowAuxiliary.js 系统-窗口辅助核心";
	DrillUp.g_COWA_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 弃用的函数
	//==============================
	DrillUp.drill_COWA_getPluginTip_DeprecatedFunction = function( function_name ){
		return  "【" + DrillUp.g_COWA_PluginTip_curName + "】\n"+
				"检测到有其他插件调用了函数" + function_name + "，\n"+
				"这个函数已没有任何效果，并且已被弃用。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfWindowAuxiliary = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfWindowAuxiliary');
	
	
	
	
//#############################################################################
// ** ☆计算文本 标准模块
//#############################################################################
//==============================
// * 计算 - 弃用提示 锁
//==============================
DrillUp.g_COWA_DeprecatedAlert = true;
//##############################
// * 计算 - 基本文本 宽度【标准函数】（弃用）
//##############################
Window_Base.prototype.drill_COWA_getTextWidth = function( text ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_getTextWidth" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
	return 0;
}
//##############################
// * 计算 - 基本文本 高度【标准函数】（弃用）
//##############################
Window_Base.prototype.drill_COWA_getTextHeight = function( text ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_getTextHeight" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
	return 0;
}
//##############################
// * 计算 - 扩展文本 宽度【标准函数】（弃用）
//##############################
Window_Base.prototype.drill_COWA_getTextExWidth = function( text ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_getTextExWidth" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
	return 0;
}
//##############################
// * 计算 - 扩展文本 高度【标准函数】（弃用）
//##############################
Window_Base.prototype.drill_COWA_getTextExHeight = function( text ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_getTextExHeight" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
	return 0;
}
//##############################
// * 计算 - 是否正在计算【标准函数】（弃用）
//##############################
Window_Base.prototype.drill_COWA_isCalculating = function(){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_isCalculating" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
	return false;
}
Game_Temp.prototype.drill_COWA_isCalculating = function(){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_isCalculating" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
	return false;
}
//##############################
// * 计算 - 获取 扩展文本列表 的高度列表和宽度列表【标准函数】（弃用）
//##############################
Window_Base.prototype.drill_COWA_calculateHeightAndWidth = function( context_list, options ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_calculateHeightAndWidth" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
}
Window_Base.prototype.drill_COWA_DTLE_calculateHeightAndWidth = function( context_list, options ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_DTLE_calculateHeightAndWidth" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
}


//#############################################################################
// ** ☆绘制内容 标准模块
//#############################################################################
//##############################
// * 绘制内容 - 绘制文本【标准函数】（弃用）
//##############################
Window_Base.prototype.drill_COWA_drawText = function( context, options ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_drawText" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
}
//##############################
// * 绘制内容 - 绘制文本列表【标准函数】（弃用）
//##############################
Window_Base.prototype.drill_COWA_drawTextList = function( context_list, options ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_drawTextList" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
}
Window_Base.prototype.drill_COWA_drawTextList_notClean = function( context_list, options ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_drawTextList_notClean" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
}
//##############################
// * 绘制内容 - 绘制扩展文本【标准函数】（弃用）
//##############################
Window_Base.prototype.drill_COWA_drawTextEx = function( context, options ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_drawTextEx" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
}
//##############################
// * 绘制内容 - 绘制扩展文本列表【标准函数】（弃用）
//##############################
Window_Base.prototype.drill_COWA_drawTextListEx = function( context_list, options ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_drawTextListEx" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
}
Window_Base.prototype.drill_COWA_drawTextListEx_notClean = function( context_list, options ){
	if( DrillUp.g_COWA_DeprecatedAlert == true ){ 
		alert( DrillUp.drill_COWA_getPluginTip_DeprecatedFunction( "drill_COWA_drawTextListEx_notClean" ) );
		DrillUp.g_COWA_DeprecatedAlert = false;
	}
}




//#############################################################################
// ** 【标准模块】☆窗口属性修改
//#############################################################################
//##############################
// * 窗口属性修改 - 执行窗口属性修改【标准函数】
//			
//			参数：	> data 动态参数对象
//					> data['width']    （窗口宽度）
//					> data['height']   （窗口高度）
//					> data['fontsize'] （字体大小）
//					> data['layoutType']    （布局-布局类型）
//					> data['layoutSrc']     （布局-资源贴图）
//					> data['layoutSrcFile'] （布局-资源文件夹）
//					> data['layoutX']       （布局-位置修正x）
//					> data['layoutY']       （布局-位置修正y）
//					> data['x']           （位置x）
//					> data['y']           （位置y）
//					> data['slideDelay']    （移动-延迟时间）
//					> data['slideTime']     （移动-移动时长）
//					> data['slideMoveType'] （移动-移动类型（匀速移动/增减速移动/弹性移动/不移动……））
//					> data['slidePosType']   （起点-坐标类型（相对坐标/绝对坐标））
//					> data['slideX']         （起点-相对坐标x）
//					> data['slideY']         （起点-相对坐标y）
//					> data['slideAbsoluteX'] （起点-绝对坐标x）
//					> data['slideAbsoluteY'] （起点-绝对坐标y）
//					> data['opacityLock']  （透明度-锁定透明度255）
//					> data['opacityDelay'] （透明度-延迟时间）
//					> data['opacityTime']  （透明度-变化时长）
//			返回：	> 无
//			
//			说明：	> 执行修改方法后，contents将会被强制重建，你需要注意refresh文本内容。
//##############################
Window_Base.prototype.drill_COWA_changeParamData = function( data ){
	this.drill_COWA_changeParamData_Private( data );
}

//=============================================================================
// ** ☆窗口属性修改实现
// 		
// 			说明：	> 建立窗口后，初始化参数的操作。【包含窗口与布局的标准属性设置】
// 				  	  直接初始化一个window容易被参数交联弄的晕头转向，
// 				  	  这里聚拢了接口与参数，方便统一控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口属性修改实现 - 执行修改
//			
//			参数：	【见默认值】
//			返回：	无
//					
//			说明：	窗口属性被拆散了，部分属性会给贴图使用。
//==============================
Window_Base.prototype.drill_COWA_changeParamData_Private = function( new_data ){
	
	// > 默认值 - 窗口属性
	this.drill_COWA_setAttrWindow( new_data );
	
	// > 默认值 - 移动属性
	this.drill_COWA_setAttrMove_Private( new_data );
	
	// > 默认值 - 透明度属性
	this.drill_COWA_setAttrOpacity_Private( new_data );
	
	// > 默认值 - 回调属性
	this.drill_COWA_setAttrCallBack( new_data['callBack'] );
	
	// > 初始化函数
	this.drill_COWA_initFrame();				//初始化 - 窗口高宽 
	this.drill_COWA_initLayout();				//初始化 - 窗口布局 
	this.drill_COWA_resetAttrMove_Private();	//初始化 - 移动属性 
	this.drill_COWA_resetAttrOpacity_Private();	//初始化 - 透明度属性 
}


//#############################################################################
// ** 【标准模块】☆属性动画
//#############################################################################
//##############################
// * 属性动画 - 移动设置【标准函数】
//			
//			参数：	> data 动态参数对象
//					> data['x'] （位置x）
//					> data['y'] （位置y）
//					> data['slideDelay']    （延迟时间）
//					> data['slideTime']     （移动时长）
//					> data['slideMoveType'] （移动类型（匀速移动/增减速移动/弹性移动/不移动……））
//					> data['slidePosType']   （起点-坐标类型（相对坐标/绝对坐标））
//					> data['slideX']         （起点-相对坐标x）
//					> data['slideY']         （起点-相对坐标y）
//					> data['slideAbsoluteX'] （起点-绝对坐标x）
//					> data['slideAbsoluteY'] （起点-绝对坐标y）
//			返回：	> 无
//			
//			说明：	> 此设置将给窗口提供简单的移动动画，只移动属性，移动方式独立于 弹道核心。
//					> 变化结束后，位置固定为 data['x']，data['y'] 的位置。
//##############################
Window_Base.prototype.drill_COWA_setAttrMove = function( data ){
	this.drill_COWA_setAttrMove_Private( data );
}
Sprite.prototype.drill_COWA_setAttrMove = function( data ){
	this.drill_COWA_setAttrMove_Private( data );
}
//##############################
// * 属性动画 - 透明度设置【标准函数】
//					
//			参数：	> data 动态参数对象
//					> data['opacityLock']  布尔（锁定透明度255）
//					> data['opacityDelay'] 数字（延迟时间）
//					> data['opacityTime']  数字（变化时长）
//			返回：	> 无
//					
//			说明：	> 此设置将给窗口提供简单的透明度动画，只透明度属性。
//					> 变化结束后，透明度固定为 255 。
//					> 注意，如果没有配置 opacityDelay 和 opacityTime ，则会自动使用 移动设置 对应的 延迟时间和时长。
//##############################
Window_Base.prototype.drill_COWA_setAttrOpacity = function( data ){
	this.drill_COWA_setAttrOpacity_Private( data );
}
Sprite.prototype.drill_COWA_setAttrOpacity = function( data ){
	this.drill_COWA_setAttrOpacity_Private( data );
}
//##############################
// * 属性动画 - 重新移动【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 重新将位置设置到 起点偏移处，再播放回到起点动画。
//##############################
Window_Base.prototype.drill_COWA_resetAttrMove = function(){
	this.drill_COWA_resetAttrMove_Private();
}
Sprite.prototype.drill_COWA_resetAttrMove = function(){
	this.drill_COWA_resetAttrMove_Private();
}
//##############################
// * 属性动画 - 重设透明度【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 重新将透明度设置到 0，再播放逐渐显现的动画。
//##############################
Window_Base.prototype.drill_COWA_resetAttrOpacity = function(){
	this.drill_COWA_resetAttrOpacity_Private();
}
Sprite.prototype.drill_COWA_resetAttrOpacity = function(){
	this.drill_COWA_resetAttrOpacity_Private();
}


//=============================================================================
// ** ☆属性动画实现（窗口）
// 		
// 			说明：	> 此动画没有基于 弹道核心，而是一般的窗口/贴图平移函数的实现。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 属性动画实现（窗口） - 初始化 绑定
//==============================
var _drill_COWA_winAttr_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height){
	_drill_COWA_winAttr_initialize.call(this, x, y, width, height);
	this.drill_COWA_initialize();
	this._drill_COWA_isWindow = true;
}
//==============================
// * 属性动画实现（窗口） - 初始化
//==============================
Window_Base.prototype.drill_COWA_initialize = function(){
	this._drill_COWA_attrEnabled = false;
	this._drill_COWA_attrEnabled_move = false;
	this._drill_COWA_attrEnabled_opacity = false;
	this._drill_COWA_attrCallBackNeeded = false;
	this._drill_COWA_attrData = {};
}
//==============================
// * 属性动画实现（窗口） - 帧刷新 绑定
//==============================
var _drill_COWA_winAttr_update = Window_Base.prototype.update;
Window_Base.prototype.update = function(){
	_drill_COWA_winAttr_update.call(this);
	this.drill_COWA_update();
}
//==============================
// * 属性动画实现（窗口） - 帧刷新
//==============================
Window_Base.prototype.drill_COWA_update = function(){
	if( this._drill_COWA_attrEnabled != true ){ return; }
	
	this.drill_COWA_updateAttrMove();						//帧刷新 - 移动属性 
	this.drill_COWA_updateAttrOpacity();					//帧刷新 - 透明度属性 
	this.drill_COWA_updateAttrCallBack();					//帧刷新 - 回调属性 
}
//==============================
// * 属性动画实现（窗口） - 帧刷新（被弃用的接口）
//==============================
Window_Base.prototype.drill_COWA_CPD_update = function(){
	//（此接口被弃用，被调用也不执行任何操作）
}
Window_Base.prototype.drill_COWA_SBM_update = function(){
	//（此接口被弃用，被调用也不执行任何操作）
}

//==============================
// * 窗口属性 - 参数批量赋值
//
//			说明：	此函数用于将 new_data 中的所有子项，批量赋值到 old_data 中。
//==============================
Window_Base.prototype.drill_COWA_registAttrData = function( old_data, new_data ){
	var keys = Object.keys(new_data);
	for(var i = 0; i < keys.length; i++ ){
		var key = keys[i];
		old_data[ key ] = new_data[ key ];
	}
}
//==============================
// * 窗口属性 - 窗口属性设置（私有）
//==============================
Window_Base.prototype.drill_COWA_setAttrWindow = function( new_data ){
	var data = this._drill_COWA_attrData;
	
	// > 参数批量赋值
	this.drill_COWA_registAttrData( data, new_data );
	
	// > 默认值 - 窗口
	if( data['width'] == undefined ){ data['width'] = this.width };						//窗口 - 宽度
	if( data['height'] == undefined ){ data['height'] = this.height };					//窗口 - 高度
	if( data['fontsize'] == undefined ){ data['fontsize'] = this.standardFontSize(); };	//窗口 - 字体大小
	
	// > 默认值 - 窗口布局
	if( data['layoutType'] == undefined ){ data['layoutType'] = "默认皮肤" };			//窗口布局 - 布局类型（默认皮肤/单张背景贴图/隐藏布局）
	if( data['layoutSrc'] == undefined ){ data['layoutSrc'] = "" };						//窗口布局 - 资源贴图
	if( data['layoutSrcFile'] == undefined ){ data['layoutSrcFile'] = "img/system/" };	//窗口布局 - 资源文件夹
	if( data['layoutX'] == undefined ){ data['layoutX'] = 0 };							//窗口布局 - 位置修正x
	if( data['layoutY'] == undefined ){ data['layoutY'] = 0 };							//窗口布局 - 位置修正y
}
//==============================
// * 窗口属性 - 窗口高宽 初始化（私有）
//==============================
Window_Base.prototype.drill_COWA_initFrame = function(){
	var data = this._drill_COWA_attrData;
	
	// > 属性赋值
	this.width = data['width'];
	this.height = data['height'];
	this.standardFontSize = function(){ return this._drill_COWA_attrData['fontsize']; }
	
	// > 重刷画布
	this.createContents();
}
//==============================
// * 窗口属性 - 窗口布局 初始化（私有）
//==============================
Window_Base.prototype.drill_COWA_initLayout = function(){
	var data = this._drill_COWA_attrData;
	
	// > 创建 背景图片 贴图
	var temp_sprite = new Sprite();
	if( data['layoutType'] == "单张背景贴图" ){ 
		temp_sprite.bitmap = ImageManager.loadBitmap( data['layoutSrcFile'], data['layoutSrc'], 0, true);
	}
	temp_sprite.x = data['layoutX'];
	temp_sprite.y = data['layoutY'];
	this._drill_COWA_skinBackground = temp_sprite ;
	this._windowSpriteContainer.addChild(this._drill_COWA_skinBackground);	//（ _windowSpriteContainer 为窗口的最底层贴图）
}


//==============================
// * 移动属性 - 移动设置
//==============================
Window_Base.prototype.drill_COWA_setAttrMove_Private = function( new_data ){
	var data = this._drill_COWA_attrData;
	
	// > 参数批量赋值
	this.drill_COWA_registAttrData( data, new_data );
	
	
	// > 默认值
	if( data['x'] == undefined ){ data['x'] = this.x };									//移动 - 位置x
	if( data['y'] == undefined ){ data['y'] = this.y };									//移动 - 位置y
	if( data['slideDelay'] == undefined ){ data['slideDelay'] = 0 };					//移动 - 延迟时间
	if( data['slideTime'] == undefined ){ data['slideTime'] = 1 };						//移动 - 移动时长
	if( data['slideMoveType'] == undefined ){ data['slideMoveType'] = "匀速移动" };		//移动 - 移动类型（匀速移动/增减速移动/弹性移动/不移动……）
	if( data['slidePosType'] == undefined ){ data['slidePosType'] = "相对坐标" };		//移动 - 起点-坐标类型（相对坐标/绝对坐标）
	if( data['slideX'] == undefined ){ data['slideX'] = 0 };							//移动 - 起点-相对坐标x
	if( data['slideY'] == undefined ){ data['slideY'] = 0 };							//移动 - 起点-相对坐标y
	if( data['slideAbsoluteX'] == undefined ){ data['slideAbsoluteX'] = 0 };			//移动 - 起点-绝对坐标x
	if( data['slideAbsoluteY'] == undefined ){ data['slideAbsoluteY'] = 0 };			//移动 - 起点-绝对坐标y
	
	
	// > 强制设置时长，防止计算出现NaN
	if( data['slideTime'] < 1 ){ data['slideTime'] = 1; }
	
	// > 私有参数初始化
	this._drill_COWA_move_curTime = 0;							//移动 - 当前时间
	this._drill_COWA_move_delaytTime = data['slideDelay'];		//移动 - 延迟时间
	
	// > 动画开关（此函数被调用，则立即开启）
	this._drill_COWA_attrEnabled = true;
	this._drill_COWA_attrEnabled_move = true;
}
//==============================
// * 移动属性 - 重新移动
//==============================
Window_Base.prototype.drill_COWA_resetAttrMove_Private = function(){
	var data = this._drill_COWA_attrData;
	
	// > 参数重设
	this._drill_COWA_move_curTime = 0;	
	this._drill_COWA_move_delaytTime = data['slideDelay'] +1;
	
	// > 立即 帧刷新 一次，统一初始状态
	this.drill_COWA_updateAttrMove();	
}
//==============================
// * 移动属性 - 帧刷新
//==============================
Window_Base.prototype.drill_COWA_updateAttrMove = function(){
	if( this._drill_COWA_attrEnabled_move != true ){ return; }
	var data = this._drill_COWA_attrData;
	
	// > 时间+1
	this._drill_COWA_move_curTime += 1;
	if( this._drill_COWA_move_curTime > data['slideTime'] ){ return; }
	
	// > 延迟时间-1
	if( this._drill_COWA_move_delaytTime > 0 ){
		this._drill_COWA_move_delaytTime -= 1;
		this._drill_COWA_move_curTime = 0;
	}
	
	// > 坐标
	var dx = 0;									//距离差值x
	var dy = 0;									//距离差值y
	var dt = data['slideTime'];					//时长
	var time = this._drill_COWA_move_curTime;	//当前时间
	if( data['slidePosType'] == "相对坐标" ){
		dx = data['slideX'];
		dy = data['slideY'];
	}
	if( data['slidePosType'] == "绝对坐标" ){
		dx = data['slideAbsoluteX'] - data['x'];	//窗口的上层一般直接为scene，所以绝对坐标不会被叠加。
		dy = data['slideAbsoluteY'] - data['y'];
	}
	
	// > 移动（注意，先指定位置，再偏移回到起点）
	var xx = 0;
	var yy = 0;
	if( data['slideMoveType'] == "不移动" ){
		xx = data['x'];
		yy = data['y'];
	}
	if( data['slideMoveType'] == "瞬间移动" ){
		xx = data['x'];
		yy = data['y'];
	}
	if( data['slideMoveType'] == "匀速移动" ){
		xx = time * dx / dt;			//（此算法与 弹道核心 中的一致）
		yy = time * dy / dt;
		
		xx = data['x'] + dx - xx;		//（反转算法）
		yy = data['y'] + dy - yy;
	}
	if( data['slideMoveType'] == "增减速移动"){
		var v_max = dx / dt *2;			//（先加速后减速）
		var a = v_max / dt *2;
		if( time < dt/2 ){
			xx = a*time*time/2;
		}else{
			var t_p = time - dt/2;
			xx = dx/2 + v_max*t_p - a*t_p*t_p/2;
		}
		
		var v_max = dy / dt *2;
		var a = v_max / dt *2;
		if( time < dt/2 ){
			yy = a*time*time/2;
		}else{
			var t_p = time - dt/2;
			yy = dy/2 + v_max*t_p - a*t_p*t_p/2;
		}
		
		xx = data['x'] + dx - xx;
		yy = data['y'] + dy - yy;
	}
	if( data['slideMoveType'] == "弹性移动" ){
		var ax = 2 * dx / dt / dt;		//r = 1/2*a*t^2
		var ay = 2 * dy / dt / dt;		//（匀减速移动到目标点）
		var c_time = dt - time;
		xx = 0.5 * ax * dt * dt - 0.5 * ax * c_time * c_time ;
		yy = 0.5 * ay * dt * dt - 0.5 * ay * c_time * c_time ;
		
		xx = data['x'] + dx - xx;
		yy = data['y'] + dy - yy;
	}
	
	// > 最后一刻锁定坐标位置
	if( this._drill_COWA_move_curTime == data['slideTime'] ){
		xx = data['x'];
		yy = data['y'];
	}
	
	// > 设置移动
	this.x = xx;
	this.y = yy;
}


//==============================
// * 透明度属性 - 透明度设置
//==============================
Window_Base.prototype.drill_COWA_setAttrOpacity_Private = function( new_data ){
	var data = this._drill_COWA_attrData;
	
	// > 参数批量赋值
	this.drill_COWA_registAttrData( data, new_data );
	
	
	// > 默认值
	if( data['opacityLock'] == undefined ){ data['opacityLock'] = false };	//透明度 - 锁定透明度255
	if( data['opacityDelay'] == undefined ){								//透明度 - 延迟时间
		if( data['slideDelay'] != undefined ){								//（如果没有，则用 移动 的延迟时间设置）
			data['opacityDelay'] = data['slideDelay'];						//
		}else{																//
			data['opacityDelay'] = 0;										//
		}																	//
	};																		//
	if( data['opacityTime'] == undefined ){									//透明度 - 变化时长
		if( data['slideTime'] != undefined ){								//（如果没有，则用 移动 的时长设置）
			data['opacityTime'] = data['slideTime'];						//
		}else{																//
			data['opacityTime'] = 1;										//
		}																	//
	};																		//
	
	
	// > 强制设置时长，防止计算出现NaN
	if( data['opacityTime'] < 1 ){ data['opacityTime'] = 1; }
	
	// > 私有参数初始化
	this._drill_COWA_opacity_curTime = 0;						//透明度 - 当前时间
	this._drill_COWA_opacity_delaytTime = data['opacityDelay'];	//透明度 - 延迟时间
	
	// > 动画开关（此函数被调用，则立即开启）
	this._drill_COWA_attrEnabled = true;
	this._drill_COWA_attrEnabled_opacity = true;
}
//==============================
// * 透明度属性 - 重设透明度
//==============================
Window_Base.prototype.drill_COWA_resetAttrOpacity_Private = function(){
	var data = this._drill_COWA_attrData;
	
	// > 参数重设
	this._drill_COWA_opacity_curTime = 0;
	this._drill_COWA_opacity_delaytTime = data['opacityDelay'] +1;
	
	// > 立即 帧刷新 一次，统一初始状态
	this.drill_COWA_updateAttrOpacity();	
}
//==============================
// * 透明度属性 - 帧刷新
//==============================
Window_Base.prototype.drill_COWA_updateAttrOpacity = function(){
	if( this._drill_COWA_attrEnabled_opacity != true ){ return; }
	var data = this._drill_COWA_attrData;
	
	// > 时间+1
	this._drill_COWA_opacity_curTime += 1;
	if( this._drill_COWA_opacity_curTime > data['opacityTime'] ){ return; }
	
	// > 延迟时间-1
	if( this._drill_COWA_opacity_delaytTime > 0 ){
		this._drill_COWA_opacity_delaytTime -= 1;
		this._drill_COWA_opacity_curTime = 0;
	}
	
	// > 透明度
	var oo = 0;
	oo = 255 / data['opacityTime'] * this._drill_COWA_opacity_curTime;
	
	// > 透明度锁定情况
	if( data['opacityLock'] == true ){
		oo = 255;
	}
	
	// > 最后一刻锁定透明度为255
	if( this._drill_COWA_opacity_curTime == data['opacityTime'] ){
		oo = 255;
	}
	
	// > 设置透明度（窗口）
	//		（注意，窗口布局['layoutType'] 的设定并没有那么灵活，后续需要使用 窗口皮肤['window_type'] 的设定）
	if( this._drill_COWA_isWindow == true ){
		if( data['layoutType'] == "默认皮肤" ){ 
			this.contentsOpacity = oo;										//文本域 透明度（与 背景容器层 并列）
			//this.opacity = 255;											//背景容器层 透明度
			this._windowBackSprite.opacity = oo;							//背景容器层 - 平铺贴图 透明度
			this._windowFrameSprite.opacity = oo;							//背景容器层 - 框架贴图 透明度
			this._drill_COWA_skinBackground.opacity = 0;					//背景容器层 - 背景图片 透明度
		}
		if( data['layoutType'] == "单张背景贴图" ){ 
			this.contentsOpacity = oo;										//文本域 透明度（与 背景容器层 并列）
			//this.opacity = 255;											//背景容器层 透明度
			this._windowBackSprite.opacity = 0;								//背景容器层 - 平铺贴图 透明度
			this._windowFrameSprite.opacity = 0;							//背景容器层 - 框架贴图 透明度
			this._drill_COWA_skinBackground.opacity = oo;					//背景容器层 - 背景图片 透明度
		}
		if( data['layoutType'] == "隐藏布局" ){ 
			this.contentsOpacity = oo;										//文本域 透明度（与 背景容器层 并列）
			//this.opacity = 255;											//背景容器层 透明度
			this._windowBackSprite.opacity = 0;								//背景容器层 - 平铺贴图 透明度
			this._windowFrameSprite.opacity = 0;							//背景容器层 - 框架贴图 透明度
			this._drill_COWA_skinBackground.opacity = oo;					//背景容器层 - 背景图片 透明度
		}
	}
	// > 设置透明度（贴图）
	if( this._drill_COWA_isWindow != true ){
		this.opacity = oo;
	}
}


//==============================
// * 回调属性 - 透明度设置
//==============================
Window_Base.prototype.drill_COWA_setAttrCallBack = function( obj_function ){
	if( obj_function == undefined ){ return; }
	this._drill_COWA_attrCallBackNeeded = true;
	this._drill_COWA_attrCallBackFn = obj_function;
}
//==============================
// * 回调属性 - 帧刷新
//==============================
Window_Base.prototype.drill_COWA_updateAttrCallBack = function(){
	if( this._drill_COWA_attrCallBackNeeded != true ){ return; }
	if( this._drill_COWA_move_curTime <= data['slideTime'] ){ return; }
	if( this._drill_COWA_opacity_curTime <= data['opacityTime'] ){ return; }
	
	// > 初始设置后，透明度/移动 停止后，会执行一次回调函数
	this._drill_COWA_attrCallBackNeeded = false;
	this._drill_COWA_attrCallBackFn.call(this);
}

//=============================================================================
// ** ☆属性动画实现（贴图）
// 		
// 			说明：	> 此动画没有基于 弹道核心，而是一般的窗口/贴图平移函数的实现。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 属性动画实现（贴图） - 初始化 绑定
//==============================
var _drill_COWA_spriteAttr_initialize = Sprite.prototype.initialize;
Sprite.prototype.initialize = function( bitmap ){
	_drill_COWA_spriteAttr_initialize.call( this, bitmap );
	this.drill_COWA_initialize();
	this._drill_COWA_isWindow = false;
}
//==============================
// * 属性动画实现（贴图） - 帧刷新 绑定
//==============================
var _drill_COWA_spriteAttr_update = Sprite.prototype.update;
Sprite.prototype.update = function(){
	_drill_COWA_spriteAttr_update.call(this);
	this.drill_COWA_update();
}
//==============================
// * 属性动画实现（贴图） - 相关函数
//==============================
Sprite.prototype.drill_COWA_initialize = Window_Base.prototype.drill_COWA_initialize;
Sprite.prototype.drill_COWA_update = Window_Base.prototype.drill_COWA_update;
Sprite.prototype.drill_COWA_registAttrData = Window_Base.prototype.drill_COWA_registAttrData;
//==============================
// * 属性动画实现（贴图） - 相关函数 - 移动属性
//==============================
Sprite.prototype.drill_COWA_updateAttrMove = Window_Base.prototype.drill_COWA_updateAttrMove;
Sprite.prototype.drill_COWA_setAttrMove_Private = Window_Base.prototype.drill_COWA_setAttrMove_Private;
Sprite.prototype.drill_COWA_resetAttrMove_Private = Window_Base.prototype.drill_COWA_resetAttrMove_Private;
//==============================
// * 属性动画实现（贴图） - 相关函数 - 透明度属性
//==============================
Sprite.prototype.drill_COWA_updateAttrOpacity = Window_Base.prototype.drill_COWA_updateAttrOpacity;
Sprite.prototype.drill_COWA_setAttrOpacity_Private = Window_Base.prototype.drill_COWA_setAttrOpacity_Private;
Sprite.prototype.drill_COWA_resetAttrOpacity_Private = Window_Base.prototype.drill_COWA_resetAttrOpacity_Private;
//==============================
// * 属性动画实现（贴图） - 相关函数 - 回调属性
//==============================
Sprite.prototype.drill_COWA_updateAttrCallBack = Window_Base.prototype.drill_COWA_updateAttrCallBack;
	
	
	
//=============================================================================
// ** ☆核心功能扩展
// 			
// 			说明：	> 给一些窗口的功能进行扩展。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 核心功能扩展 - 帮助窗口换行
//
//			说明：	> 该功能不属于窗口字符，只是扩展了一点点转义的效果。
//==============================
var _drill_COWA_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
	var str = item ? item.description : "";
	if( str.contains("\\n") ){
		str = str.replace("\\n","\n");
		this.setText( str );
	}else{
		_drill_COWA_setItem.call(this, item);
	}
};


