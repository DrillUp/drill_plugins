//=============================================================================
// Drill_CoreOfWindowAuxiliary.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        系统 - 窗口辅助核心
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
 * 给各 子插件 提供文本高宽、文本绘制、窗口属性修改 等脚本辅助。
 * ★★尽量放在最靠上的位置★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 作用于：
 *   - Drill_CoreOfScreenRoller     系统-滚轴核心
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
 *   (1.插件给 子插件 提供 "窗口属性修改"、"移动动画"、"透明度动画"、
 *      "获取文本高宽"、"获取扩展文本高宽" 标准函数。
 *   (2.旧版本插件中有 表达式 的功能，现已全部转移到 窗口字符核心 中。
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
 * 2.插件有单次执行的辅助功能，子插件的窗口进行内容刷新时，会调用
 *   该插件的函数，刷新所有内容会消耗部分量。
 * 3.插件还有持续执行的辅助功能，当窗口/贴图移动时，会产生一定的
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
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		COWA (Core_Of_Window_Auxiliary)
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
//		★大体框架与功能如下：
//			窗口辅助核心：
//				->计算文本高度/宽度
//					->标准模块
//						->文本宽度【标准函数】
//						->文本高度【标准函数】
//						->扩展文本宽度【标准函数】
//						->扩展文本高度【标准函数】
//						->是否正在计算【标准函数】
//						->扩展文本列表的高宽列表【标准函数】
//				->绘制内容 
//					->标准模块
//						->绘制文本【标准函数】
//						->绘制文本列表【标准函数】
//						->绘制扩展文本【标准函数】
//						->绘制扩展文本列表【标准函数】
//					->把指定的文字画在面板中
//					->固定行间距/自适应行间距
//				->窗口属性修改 
//					->标准模块
//						->窗口属性修改【标准函数】
//				->属性动画 
//					->标准模块
//						->移动设置【标准函数】
//						->透明度设置【标准函数】
//						->重新移动【标准函数】
//						->重设透明度【标准函数】
//					->旧接口
//						->设置简易窗口动画【标准函数】
//						->重设简易窗口动画【标准函数】
//						->设置简易贴图动画【标准函数】
//						->重设简易贴图动画【标准函数】
//					->窗口属性
//						->窗口高宽
//						->窗口布局
//							> 默认皮肤/单张背景贴图/隐藏布局
//					->移动属性
//						->位置
//						->起点相对坐标/起点绝对坐标
//						->匀速移动/弹性移动/不移动
//					->透明度属性
//					->回调属性
//				->核心功能扩展
//					->帮助窗口换行
//
//		★必要注意事项：
//			1.该插件不要再对子插件开放各种新的支持了，不然多次更新反而千疮百孔。
//			
//		★其它说明细节：
//			暂无
//			
//		★核心接口说明：
//			1.核心中含有 标准接口/标准函数 ，这是其它子插件的底座，无论核心内容怎么变，标准接口一定不能动。
//			2.帮助窗口换行 是一个附属的小功能，不具备标准接口。
//
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfWindowAuxiliary = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfWindowAuxiliary');
	
	
//#############################################################################
// ** 【标准模块】计算文本高度/宽度
//
//			说明：	即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 计算 - 文本宽度【标准函数】
//			
//			参数：	> text 字符串（字符串中不能有换行符，否则只按第一行计算）
//			返回：	> 数字（纯文本的总宽度）
//			
//			说明：	> 注意，此函数只计算纯文本的宽度，不含窗口字符。
//##############################
Window_Base.prototype.drill_COWA_getTextWidth = function( text ){
	return this.drill_COWA_getTextWidth_Private( text );
}
//##############################
// * 计算 - 文本高度【标准函数】
//			
//			参数：	> text 字符串（字符串中不能有换行符，否则只按第一行计算）
//			返回：	> 数字（纯文本的最大高度）
//					
//			说明：	> 注意，此函数只计算纯文本的高度，不含窗口字符。
//##############################
Window_Base.prototype.drill_COWA_getTextHeight = function( text ){
	return this.drill_COWA_getTextHeight_Private( text );
}
//##############################
// * 计算 - 扩展文本宽度【标准函数】
//			
//			参数：	> text 字符串（字符串中不能有换行符，否则只按第一行计算）
//			返回：	> 数字（扩展文本的总宽度）
//			
//			说明：	> 注意，该函数不能在 drawTextEx函数 中嵌套，可能会因为 套娃 而造成死循环。
//				 	> 一定要先调用此函数  计算宽度，后进行绘制，顺序不能反。
//##############################
Window_Base.prototype.drill_COWA_getTextExWidth = function( text ){
	return this.drill_COWA_getTextExWidth_Private( text );
}
//##############################
// * 计算 - 扩展文本高度【标准函数】
//			
//			参数：	> text 字符串（字符串中不能有换行符，否则只按第一行计算）
//			返回：	> 数字（扩展文本的最大高度）
//			
//			说明：	> 注意，该函数不能在 drawTextEx函数 中嵌套，可能会因为 套娃 而造成死循环。
//					> 一定要先调用此函数 计算高度，后进行绘制，顺序不能反。
//##############################
Window_Base.prototype.drill_COWA_getTextExHeight = function( text ){
	return this.drill_COWA_getTextExHeight_Private( text );
}
//##############################
// * 计算 - 是否正在计算【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数一般只给其他 核心 使用。
//					  如果你的函数或特殊字符，干扰了实际的字符宽度/高度计算，需要用此函数做特殊标记。
//					  需要防止反复套娃，需要防止重复绘制。
//##############################
Window_Base.prototype.drill_COWA_isCalculating = function(){
	if( $gameTemp == undefined ){ return false; }
	return $gameTemp._drill_COWA_bitmap_isCalculating == true;
}
Game_Temp.prototype.drill_COWA_isCalculating = function(){
	return this._drill_COWA_bitmap_isCalculating == true;
}
//##############################
// * 计算 - 计算 扩展文本列表 的高度列表和宽度列表【标准函数】
//			
//			参数：	> context_list 字符串列表
//					> options 动态参数对象（目前没用，可以为null）
//			返回：	> 无
//			
//			说明：	> 执行此函数后，能得到：
//					  this.drill_COWA_heightList 数字列表（高度列表）
//					  this.drill_COWA_widthList  数字列表（宽度列表）
//					> 目前，options参数没有任何作用
//##############################
Window_Base.prototype.drill_COWA_calculateHeightAndWidth = function( context_list, options ){
	this.drill_COWA_calculateHeightAndWidth_Private( context_list, options );
}
Window_Base.prototype.drill_COWA_DTLE_calculateHeightAndWidth = function( context_list, options ){
	this.drill_COWA_calculateHeightAndWidth_Private( context_list, options );
}


//#############################################################################
// ** 【标准模块】绘制内容
//#############################################################################
//##############################
// * 绘制内容 - 绘制文本【标准函数】
//			
//			参数：	> context 字符串
//					> options 动态参数对象（可为null）
//					> options['x'] （光标位置x）
//					> options['y'] （光标位置y）
//					> options['maxWidth'] （最大宽度）
//					> options['lineheight'] （行间距）
//					> options['align'] （对齐方式，填 左对齐/居中/右对齐）
//			返回：	> 无
//			
//			说明：	> 只绘制纯文本，纯文本是一次性全绘制。
//					> 此绘制流程不会清理画布。
//##############################
Window_Base.prototype.drill_COWA_drawText = function( context, options ){
	this.drill_COWA_drawText_Private( context, options );
}
//##############################
// * 绘制内容 - 绘制文本列表【标准函数】
//			
//			参数：	> context_list 字符串列表
//					> options 动态参数对象（可为null）
//					> options['x'] （光标位置x）
//					> options['y'] （光标位置y）
//					> options['maxWidth'] （最大宽度）
//					> options['lineheight'] （行间距）
//					> options['align'] （对齐方式，填 左对齐/居中/右对齐）
//			返回：	> 无
//			
//			说明：	> 只绘制纯文本，纯文本是一次性全绘制。
//					> 默认会清理画布，使用"_notClean"则不会清理画布。
//##############################
Window_Base.prototype.drill_COWA_drawTextList = function( context_list, options ){
	this.contents.clear();
	this.createContents();
	this.drill_COWA_drawTextList_Private( context_list, options );
}
Window_Base.prototype.drill_COWA_drawTextList_notClean = function( context_list, options ){
	this.drill_COWA_drawTextList_Private( context_list, options );
}
//##############################
// * 绘制内容 - 绘制扩展文本【标准函数】
//			
//			参数：	> context 字符串
//					> options 动态参数对象（可为null）
//					> options['x'] （光标位置x）
//					> options['y'] （光标位置y）
//			返回：	> 无
//			
//			说明：	> 扩展文本需经过多次变换，并且每个文字单独绘制。
//					> 此绘制流程不会清理画布。
//##############################
Window_Base.prototype.drill_COWA_drawTextEx = function( context, options ){
	this.drill_COWA_drawTextEx_Private( context, options );
}
//##############################
// * 绘制内容 - 绘制扩展文本列表【标准函数】
//			
//			参数：	> context_list 字符串列表
//					> options 动态参数对象（可为null）
//					> options['x'] （光标位置x）
//					> options['y'] （光标位置y）
//					> options['width'] （居中用宽度）
//					> options['autoLineheight'] （是否自适应行间距）
//					> options['lineheight'] （行间距）
//					> options['align'] （对齐方式，填 左对齐/居中/右对齐）
//			返回：	> 无
//			
//			说明：	> 扩展文本需经过多次变换，并且每个文字单独绘制。
//					> 默认会清理画布，使用"_notClean"则不会清理画布。
//##############################
Window_Base.prototype.drill_COWA_drawTextListEx = function( context_list, options ){
	this.contents.clear();
	this.createContents();
	this.drill_COWA_drawTextListEx_Private( context_list, options );
}
Window_Base.prototype.drill_COWA_drawTextListEx_notClean = function( context_list, options ){
	this.drill_COWA_drawTextListEx_Private( context_list, options );
}

//#############################################################################
// ** 【标准模块】窗口属性修改
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

//#############################################################################
// ** 【标准模块】属性动画
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

//#############################################################################
// ** 【标准模块】旧接口
//#############################################################################
//##############################
// * 旧接口 - 简易窗口动画 - 设置【标准函数】
//			
//			参数：	> data 动态参数对象
//					> data['…'] （具体见前面 drill_COWA_setAttrMove 的参数和 drill_COWA_setAttrOpacity 的参数）
//			返回：	> 无
//			
//			说明：	> 此设置相当于同时设置了 位置、透明度 。
//##############################
Window_Base.prototype.drill_COWA_setButtonMove = function( data ){
	this.drill_COWA_setAttrMove_Private( data );
	this.drill_COWA_setAttrOpacity_Private( data );
}
//##############################
// * 旧接口 - 简易窗口动画 - 重设【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 重新将窗口的 位置、透明度 归位，再播放 回到起点、逐渐显现 的动画。
//##############################
Window_Base.prototype.drill_COWA_SBM_resetMove = function(){
	this.drill_COWA_resetAttrMove_Private();
	this.drill_COWA_resetAttrOpacity_Private();
}
Window_Base.prototype.drill_COWA_CPD_resetMove = function(){
	this.drill_COWA_resetAttrMove_Private();
	this.drill_COWA_resetAttrOpacity_Private();
}
//##############################
// * 旧接口 - 简易贴图动画 - 设置【标准函数】
//			
//			参数：	> data 动态参数对象
//					> data['…'] （具体见前面 drill_COWA_setAttrMove 的参数）
//			返回：	> 无
//			
//			说明：	> 贴图动画 不控制透明度。
//##############################
Sprite.prototype.drill_COWA_setButtonMove = function( data ){
	this.drill_COWA_setAttrMove_Private( data );
}
//##############################
// * 旧接口 - 简易贴图动画 - 重设【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 重新将位置设置到 起点偏移处，再播放回到起点动画。
//					> 贴图动画 不控制透明度。
//##############################
Sprite.prototype.drill_COWA_SBM_resetMove = function(){
	this.drill_COWA_resetAttrMove_Private();
}



//=============================================================================
// ** 计算文本高度/宽度
//=============================================================================
//==============================
// * 计算 - 文本宽度
//==============================
Window_Base.prototype.drill_COWA_getTextWidth_Private = function( text ){
	return this.textWidth( text );
};
//==============================
// * 计算 - 文本高度
//==============================
Window_Base.prototype.drill_COWA_getTextHeight_Private = function( text ){
	var maxFontSize = this.contents.fontSize;
	return maxFontSize + 8;
};

//=============================================================================
// ** 计算Ex文本高度/宽度
//
//			说明：	对于一些继承了并且抢先执行 processEscapeCharacter 函数的插件，最好加上 不准套娃 标记。（现在已经不需要了，因为直接最后继承）
//=============================================================================
var _drill_COWA_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_COWA_scene_initialize.call(this);		//（套两层，能够让下列函数在最后才执行继承）
	
	//==============================
	// * 计算 - 拦截文本绘制（私有）
	//==============================
	var _drill_COWA_bitmap_drawText = Bitmap.prototype.drawText;
	Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineheight, align) {
		
		if( $gameTemp && $gameTemp._drill_COWA_bitmap_isCalculating == true ){ return; }	//（如果正在计算，则不绘制文字）
		
		_drill_COWA_bitmap_drawText.call( this,text, x, y, maxWidth, lineheight, align );
	}
	//==============================
	// * 计算 - 拦截文本清理（私有）
	//==============================
	var _drill_COWA_bitmap_clearRect = Bitmap.prototype.clearRect;
	Bitmap.prototype.clearRect = function(x, y, width, height) {
		
		if( $gameTemp && $gameTemp._drill_COWA_bitmap_isCalculating == true ){ return; }	//（如果正在计算，则不准清理）
		
		_drill_COWA_bitmap_clearRect.call( this, x, y, width, height );
	}
	//==============================
	// * 计算 - 拦截图标绘制（私有）
	//==============================
	var _drill_COWA_bitmap_drawIcon = Window_Base.prototype.drawIcon;
	Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
		
		if( $gameTemp._drill_COWA_bitmap_isCalculating == true ){ return; }	//（如果正在计算，则不绘制图标）
		
		_drill_COWA_bitmap_drawIcon.call( this, iconIndex, x, y );
	}
	//==============================
	// * 计算 - 拦截换行符影响（私有）
	//==============================
	var _drill_COWA_processNewLine = Window_Base.prototype.processNewLine;
	Window_Base.prototype.processNewLine = function( textState ){
		var xx = textState.x;
		_drill_COWA_processNewLine.call( this, textState );
		if( $gameTemp._drill_COWA_bitmap_isCalculating == true ){ textState.x = xx; }	//（如果正在计算，换行符不能影响宽度）
	}
	//==============================
	// * 计算 - 拦截对话框的暂停字符（私有）
	//==============================
	var _drill_COWA_startWait = Window_Message.prototype.startWait;
	Window_Message.prototype.startWait = function(count) {
		_drill_COWA_startWait.call( this, count );
		if( $gameTemp._drill_COWA_bitmap_isCalculating == true ){ this._waitCount = 0; }	//（如果正在计算，暂停符不能等待）
	}
	//==============================
	// * 计算 - 拦截文本重建（私有）
	//==============================
	var _drill_COWA_createContents = Window_Base.prototype.createContents;
	Window_Base.prototype.createContents = function() {
		
		if( $gameTemp && $gameTemp._drill_COWA_bitmap_isCalculating == true ){ return; }	//（如果正在计算，也不准重建bitmap）
		
		_drill_COWA_createContents.call( this );
	}
	//==============================
	// * 计算 - 拦截字体颜色重置（私有）
	//==============================
	var _drill_COWA_resetTextColor = Window_Base.prototype.resetTextColor;
	Window_Base.prototype.resetTextColor = function() {
		
		if( $gameTemp && $gameTemp._drill_COWA_bitmap_isCalculating == true ){ return; }	//（如果正在计算，也不准重置颜色）
		
		_drill_COWA_resetTextColor.call( this );
	}
	////==============================
	//// * 计算 - 拦截效果字符（私有）（窗口字符核心的字符需要纳入计算）
	////==============================
	//var _drill_COWA_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
	//Window_Base.prototype.processEscapeCharacter = function( code, textState ){
	//	
	//	if( $gameTemp && $gameTemp._drill_COWA_bitmap_isCalculating == true ){ return; }	//（如果正在计算，效果字符全部忽略）
	//	
	//	_drill_COWA_processEscapeCharacter.call( this, code, textState );
	//}
}
//==============================
// * 绘制 - 扩展文本 - 原函数副本
//
//			说明：	这只是一个drawTextEx函数的副本。
//==============================
Window_Base.prototype.drill_COWA_drawTextEx_Copyed = function( text, x, y ){
	if( text == undefined ){ return 0; }
	if( text == "" ){ return 0; }
	this.resetFontSettings();
	
	var textState = {};
	textState['index'] = 0;
	textState['x'] = x;
	textState['y'] = y;
	textState['left'] = x;
	textState['text'] = this.convertEscapeCharacters(text);
	textState['height'] = this.calcTextHeight(textState, false);
	
	while( textState['index'] < textState['text'].length ){
		this.processCharacter(textState);		//（开始绘制字符/推进字符）
	}
	return textState['x'] - x;
};
//==============================
// * 绘制 - 扩展文本 - 自定义函数
//
//			说明：	原函数基础上，加了 递归嵌套锁 和 起始光标Y。
//==============================
Window_Base.prototype.drill_COWA_drawTextEx_Custom = function( text, x, y ){
	if( text == undefined ){ return 0; }
	if( text == "" ){ return 0; }
	if( this._drill_COWA_recursionLock1 == true ){ return 0; }	//（递归嵌套锁）
	this._drill_COWA_recursionLock1 = true;
	this.resetFontSettings();
	
	var textState = {};
	textState['index'] = 0;
	textState['x'] = x;
	textState['y'] = y;
	textState['left'] = x;			//（起始光标X）
	textState['top'] = y;			//（起始光标Y）
	textState['text'] = this.convertEscapeCharacters(text);
	textState['height'] = this.calcTextHeight(textState, false);
	
	while( textState['index'] < textState['text'].length ){
		this.processCharacter(textState);		//（开始绘制字符/推进字符）
	}
	this._drill_COWA_recursionLock1 = false;
	return textState['x'] - x;
};
//==============================
// * 计算 - 计算文本宽度前（核心用接口，比如 窗口字符核心 继承此函数）
//==============================
Window_Base.prototype.drill_COWA_calculateExWidth_Before = function(){
	
	// > 变化参数存储
	this._drill_COWA_lastFontSettings = {};
	this._drill_COWA_lastFontSettings['fontFace']    = this.contents.fontFace;		//（默认的三个参数）
	this._drill_COWA_lastFontSettings['fontSize']    = this.contents.fontSize;
	this._drill_COWA_lastFontSettings['textColor']   = this.contents.textColor;
	
	// > 窗口字符核心/Yep插件 控制的参数
	this._drill_COWA_lastFontSettings['fontBold'] = this.contents.fontBold;
	this._drill_COWA_lastFontSettings['_drill_COWC_fontBold'] = this.contents._drill_COWC_fontBold;
	this._drill_COWA_lastFontSettings['fontItalic'] = this.contents.fontItalic;
	this._drill_COWA_lastFontSettings['outlineColor'] = this.contents.outlineColor;
	this._drill_COWA_lastFontSettings['outlineWidth'] = this.contents.outlineWidth;
};
//==============================
// * 计算 - 计算文本宽度后（核心用接口，比如 窗口字符核心 继承此函数）
//==============================
Window_Base.prototype.drill_COWA_calculateExWidth_After = function(){
	
	// > 重置字体（字体恢复，计算时会造成变色、字体大小变化）
	this.resetFontSettings();
	
	// > 变化参数恢复
	this.contents.fontFace    = this._drill_COWA_lastFontSettings['fontFace'];
	this.contents.fontSize    = this._drill_COWA_lastFontSettings['fontSize'];
	this.contents.textColor   = this._drill_COWA_lastFontSettings['textColor'];
	
	// > 窗口字符核心/Yep插件 控制的参数
	this.contents.fontBold = this._drill_COWA_lastFontSettings['fontBold'];
	this.contents._drill_COWC_fontBold = this._drill_COWA_lastFontSettings['_drill_COWC_fontBold'];
	this.contents.fontItalic = this._drill_COWA_lastFontSettings['fontItalic'];
	this.contents.outlineColor = this._drill_COWA_lastFontSettings['outlineColor'];
	this.contents.outlineWidth = this._drill_COWA_lastFontSettings['outlineWidth'];
};
//==============================
// * 计算 - 扩展文本宽度（私有函数）
//
//			说明：	> 修改 textState.x 的值时一定要谨慎，会无限套娃。
//					> 注意版本中，隔行重置字体的情况。
//==============================
Window_Base.prototype.drill_COWA_getTextExWidth_Private = function( text ){
	if( this.contents == undefined ){ return 0; }
	if( this._drill_COWA_recursionLock2 == true ){ return 0; }	//（递归嵌套锁）
	this._drill_COWA_recursionLock2 = true;
		
	// > 确保绘制在画布外面，形成无效的绘制
	var out_y = this.contents.height+this.lineHeight();
	
	// -----开始计算----
	this.drill_COWA_calculateExWidth_Before();
	$gameTemp._drill_COWA_bitmap_isCalculating = true;
		
		
		// > 原装ex计算 （原装计算时，遇到文本居中需要计算自身长度时，会造成递归死循环）
		//this._drill_COWA_calculatedExWidth = this.drawTextEx( text, 0, out_y );
		
		// > 用副本进行计算
		this._drill_COWA_calculatedExWidth = this.drill_COWA_drawTextEx_Custom( text, 0, out_y );
		
		
	$gameTemp._drill_COWA_bitmap_isCalculating = false;
	this.drill_COWA_calculateExWidth_After();
	// -----结束计算----
	
	this._drill_COWA_recursionLock2 = false;
	return this._drill_COWA_calculatedExWidth;
}
//==============================
// * 计算 - 扩展文本高度（接口，单次调用）
//			
//==============================
Window_Base.prototype.drill_COWA_getTextExHeight_Private = function( text ){
	if( this._drill_COWA_recursionLock3 == true ){ return 0; }	//（递归嵌套锁）
	this._drill_COWA_recursionLock3 = true;
	
	var textState = { 'index': 0, 'x': 0, 'y': 0, 'left': 0 };
	textState.text = this.convertEscapeCharacters( text );
	var hh = this.calcTextHeight(textState, false);		
	
	this._drill_COWA_recursionLock3 = false;
	return hh;
}



//=============================================================================
// ** 绘制内容
//=============================================================================
//==============================
// * 绘制内容 - 绘制文本（不清理画布）
//==============================
Window_Base.prototype.drill_COWA_drawText_Private = function( context, options ){
	if( options == undefined ){ options = {}; }
	if( options['x'] == undefined ){ options['x'] = 0; }
	if( options['y'] == undefined ){ options['y'] = 0; }
	if( options['maxWidth'] == undefined ){ options['maxWidth'] = 999999; }
	if( options['lineheight'] == undefined ){ options['lineheight'] = this.lineHeight(); }
	if( options['align'] == undefined ){ options['align'] = "left"; }	//（填left/center/right）
	if( options['align'] == "左对齐" ){ options['align'] = "left"; }
	if( options['align'] == "居中" ){ options['align'] = "center"; }
	if( options['align'] == "右对齐" ){ options['align'] = "right"; }
    this.contents.drawText( context, options['x'], options['y'], options['maxWidth'], options['lineheight'], options['align'] );
}
//==============================
// * 绘制内容 - 绘制文本列表（不清理画布）
//==============================
Window_Base.prototype.drill_COWA_drawTextList_Private = function( context_list, options ){
	if( options == undefined ){ options = {}; }
	if( options['x'] == undefined ){ options['x'] = 0; }
	if( options['y'] == undefined ){ options['y'] = 0; }
	if( options['maxWidth'] == undefined ){ options['maxWidth'] = 999999; }
	if( options['lineheight'] == undefined ){ options['lineheight'] = this.lineHeight(); }
	if( options['align'] == undefined ){ options['align'] = "left"; }	//（填left/center/right）
	if( options['align'] == "左对齐" ){ options['align'] = "left"; }
	if( options['align'] == "居中" ){ options['align'] = "center"; }
	if( options['align'] == "右对齐" ){ options['align'] = "right"; }
	for( var i=0; i < context_list.length; i++ ){
		var context = context_list[i];
		var yy = options['y'] + i * options['lineheight'];
		this.contents.drawText( context, options['x'], yy, options['maxWidth'], options['lineheight'], options['align'] );
	}
}
//==============================
// * 绘制内容 - 绘制扩展文本（不清理画布）
//==============================
Window_Base.prototype.drill_COWA_drawTextEx_Private = function( context, options ){
	if( options == undefined ){ options = {}; }
	if( options['x'] == undefined ){ options['x'] = 0; }
	if( options['y'] == undefined ){ options['y'] = 0; }
	this.drill_COWA_drawTextEx_Copyed( context, options['x'], options['y'] );	//（直接走副本结构）
}
//==============================
// * 绘制内容 - 绘制扩展文本列表（不清理画布）
//==============================
Window_Base.prototype.drill_COWA_drawTextListEx_Private = function( context_list, options ){
	
	// > 动态参数对象的默认值
	options = this.drill_COWA_checkDrawExOptions(options);
	
	// > 参数记录（子插件可能会用到）
	this._drill_COWA_drawingContextList = context_list;
	this._drill_COWA_drawingOption = options;
	
	// > 计算字符高宽
	this.drill_COWA_calculateHeightAndWidth( context_list, options );
	
	// > 开始绘制
	this.drill_COWA_startDrawListEx( context_list, options );
	
	// > 参数去除
	this._drill_COWA_drawingContextList = null;
	this._drill_COWA_drawingOption = null;
}
//==============================
// * 绘制内容 - 默认值（私有）
//==============================
Window_Base.prototype.drill_COWA_checkDrawExOptions = function( options ){
	if( options == undefined ){ options = {}; };
	if( options['x'] == undefined ){ options['x'] = 0 };									//光标起始位置x
	if( options['y'] == undefined ){ options['y'] = 0 };									//光标起始位置y
	if( options['width'] == undefined ){ options['width'] = this.contentsWidth() };			//居中用宽度（默认为窗口画布宽度）
	if( options['autoLineheight'] == undefined ){ options['autoLineheight'] = true };		//是否自适应行间距
	if( options['lineheight'] == undefined ){ options['lineheight'] = 28 };					//行间距
	if( options['align'] == undefined ){ options['align'] = "左对齐" };						//对齐方式
	return options;
}
//==============================
// * 绘制内容 - 计算高宽（接口，单次调用）
//
//			参数：	> context_list 字符串列表
//					> options 动态参数对象（可以为null，没用到）
//			返回：	高度列表 this.drill_COWA_heightList
//					宽度列表 this.drill_COWA_widthList
//==============================
Window_Base.prototype.drill_COWA_calculateHeightAndWidth_Private = function( context_list, options ){
	var height_list = [];
	var width_list = [];
	for( var i=0; i < context_list.length; i++ ){
		var temp_text = context_list[i];
		var ww = this.drill_COWA_getTextExWidth(temp_text);
		var hh = this.drill_COWA_getTextExHeight(temp_text);
		height_list.push(hh);
		width_list.push(ww);
	}
	this.drill_COWA_heightList = height_list;
	this.drill_COWA_widthList = width_list;
}
//==============================
// * 绘制内容 - 开始绘制（接口，单次调用）
//
//			参数：	字符串列表，选项参数
//			返回：	无
//==============================
Window_Base.prototype.drill_COWA_startDrawListEx = function( context_list, options ){
	var xx = options['x'] ;
	var yy = options['y'] ;
	var ww = options['width'] ;
	for(var i=0; i < context_list.length; i++ ){
		var temp_text = context_list[i];
		
		// > 对齐方式
		xx = options['x'] ;
		if( options['align'] == "左对齐" || options['align'] == "left" ){
			//（不操作）
		}
		if( options['align'] == "居中" || options['align'] == "center" ){
			xx += ww/2 - this.drill_COWA_widthList[i]/2;
		}
		if( options['align'] == "右对齐" || options['align'] == "right" ){
			xx += ww - this.drill_COWA_widthList[i];
		}
		
		// > 绘制
		this.drawTextEx( temp_text, xx, yy );
	
		// > 【窗口字符-文本居中】插件（绘制一次，行数+1，由于该方法把context切断了，所以就不能processNewLine了）
		if( Imported.Drill_DialogTextAlign ){
			this._drill_DTA_cur_line += 1;
		}
		
		// > 划分行间距
		if( options['autoLineheight'] == true ){
			yy += this.drill_COWA_heightList[i];	//自适应行间距
		}else{
			yy += options['lineheight'];			//固定行间距
		}
	}
}


//=============================================================================
// ** 窗口属性修改
// 		
// 			功能：	> 建立窗口后，初始化参数的操作。【包含窗口与布局的标准属性设置】
// 				  	  直接初始化一个window容易被参数交联弄的晕头转向，
// 				  	  这里聚拢了接口与参数，方便统一控制。
//=============================================================================
//==============================
// * 窗口属性修改 - 执行修改
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


//=============================================================================
// ** 属性修改（窗口）
//=============================================================================
//==============================
// * 窗口 - 初始化
//==============================
var _drill_COWA_winAttr_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height){
	_drill_COWA_winAttr_initialize.call(this, x, y, width, height);
	this.drill_COWA_initialize();
	this._drill_COWA_isWindow = true;
}
//==============================
// * 窗口 - 帧刷新
//==============================
var _drill_COWA_winAttr_update = Window_Base.prototype.update;
Window_Base.prototype.update = function(){
	_drill_COWA_winAttr_update.call(this);
	this.drill_COWA_update();
}
//==============================
// * 窗口 - 底层部件（私有）
//==============================
var _drill_COWA_winAttr__createAllParts = Window_Base.prototype._createAllParts;
Window_Base.prototype._createAllParts = function() {
	
	// > 背景层（窗口最底层）
	this._drill_COWA_layer = new Sprite();
	this.addChild( this._drill_COWA_layer );
	
	// > 原函数
	_drill_COWA_winAttr__createAllParts.call(this);
}
//==============================
// * 窗口 - 帧刷新（被弃用的接口）
//==============================
Window_Base.prototype.drill_COWA_CPD_update = function(){
	//（此接口被弃用，被调用也不执行任何操作）
}
Window_Base.prototype.drill_COWA_SBM_update = function(){
	//（此接口被弃用，被调用也不执行任何操作）
}

//==============================
// * 窗口 - 初始化
//==============================
Window_Base.prototype.drill_COWA_initialize = function(){
	this._drill_COWA_attrEnabled = false;
	this._drill_COWA_attrEnabled_move = false;
	this._drill_COWA_attrEnabled_opacity = false;
	this._drill_COWA_attrCallBackNeeded = false;
	this._drill_COWA_attrData = {};
}
//==============================
// * 窗口 - 帧刷新
//==============================
Window_Base.prototype.drill_COWA_update = function(){
	if( this._drill_COWA_attrEnabled != true ){ return; }

	if( this._drill_COWA_isWindow ){
		this._drill_COWA_layer.visible = !this.isClosed();	//窗口帧刷新 - 与 打开/关闭 的透明度同步
	}
	
	this.drill_COWA_updateAttrMove();						//帧刷新 - 移动属性 
	this.drill_COWA_updateAttrOpacity();					//帧刷新 - 透明度属性 
	this.drill_COWA_updateAttrCallBack();					//帧刷新 - 回调属性 
}
//==============================
// * 窗口 - 参数批量赋值
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
	
	// > 创建 窗口布局背景
	var temp_sprite = new Sprite();
	if( data['layoutType'] == "单张背景贴图" ){ 
		temp_sprite.bitmap = ImageManager.loadBitmap( data['layoutSrcFile'], data['layoutSrc'], 0, true);
	}
	temp_sprite.x = data['layoutX'];
	temp_sprite.y = data['layoutY'];
	this._drill_COWA_backSprite = temp_sprite ;
	this._drill_COWA_layer.addChild( temp_sprite );
	
	// > 窗口布局 透明度
	if( data['layoutType'] == "默认皮肤" ){ 
		this.contentsOpacity = 255;
		this._drill_COWA_frameOpacity = 255;
		this._drill_COWA_layoutOpacity = 0;
	}
	if( data['layoutType'] == "单张背景贴图" ){ 
		this.contentsOpacity = 255;
		this._drill_COWA_frameOpacity = 0;
		this._drill_COWA_layoutOpacity = 255;
	}
	if( data['layoutType'] == "隐藏布局" ){ 
		this.contentsOpacity = 255;
		this._drill_COWA_frameOpacity = 0;
		this._drill_COWA_layoutOpacity = 0;
	}
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
	if( this._drill_COWA_isWindow && data['layoutType'] == "默认皮肤" ){ 
		this.contentsOpacity = oo;
		this._drill_COWA_frameOpacity = oo;
		this._drill_COWA_layoutOpacity = 0;
	}
	if( this._drill_COWA_isWindow && data['layoutType'] == "单张背景贴图" ){ 
		this.contentsOpacity = oo;
		this._drill_COWA_frameOpacity = 0;
		this._drill_COWA_layoutOpacity = oo;
	}
	if( this._drill_COWA_isWindow && data['layoutType'] == "隐藏布局" ){ 
		this.contentsOpacity = oo;
		this._drill_COWA_frameOpacity = 0;
		this._drill_COWA_layoutOpacity = 0;
	}
	// > 设置透明度（贴图）
	if( this._drill_COWA_isWindow != true ){
		this.opacity = oo;
	}
}
//==============================
// * 透明度属性 - 布局透明定义（私有）
//==============================
Object.defineProperty(Window_Base.prototype, '_drill_COWA_layoutOpacity', {
    get: function() {
        return this._drill_COWA_layer.alpha * 255;
    },
    set: function(value) {
        this._drill_COWA_layer.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});
//==============================
// * 透明度属性 - 窗口框架透明定义（私有）
//==============================
Object.defineProperty(Window.prototype, '_drill_COWA_frameOpacity', {	//这部分其实已经被rpg_core定义为"opacity"
    get: function() {													//但为了防止概念混淆，这里重新定义一次
        return this._windowSpriteContainer.alpha * 255;
    },
    set: function(value) {
        this._windowSpriteContainer.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});


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
// ** 属性修改（贴图）
//=============================================================================
//==============================
// * 贴图 - 相关函数
//==============================
Sprite.prototype.drill_COWA_initialize = Window_Base.prototype.drill_COWA_initialize;
Sprite.prototype.drill_COWA_update = Window_Base.prototype.drill_COWA_update;
Sprite.prototype.drill_COWA_registAttrData = Window_Base.prototype.drill_COWA_registAttrData;

Sprite.prototype.drill_COWA_updateAttrMove = Window_Base.prototype.drill_COWA_updateAttrMove;
Sprite.prototype.drill_COWA_setAttrMove_Private = Window_Base.prototype.drill_COWA_setAttrMove_Private;
Sprite.prototype.drill_COWA_resetAttrMove_Private = Window_Base.prototype.drill_COWA_resetAttrMove_Private;

Sprite.prototype.drill_COWA_updateAttrOpacity = Window_Base.prototype.drill_COWA_updateAttrOpacity;
Sprite.prototype.drill_COWA_setAttrOpacity_Private = Window_Base.prototype.drill_COWA_setAttrOpacity_Private;
Sprite.prototype.drill_COWA_resetAttrOpacity_Private = Window_Base.prototype.drill_COWA_resetAttrOpacity_Private;

Sprite.prototype.drill_COWA_updateAttrCallBack = Window_Base.prototype.drill_COWA_updateAttrCallBack;
//==============================
// * 贴图 - 初始化（私有）
//==============================
var _drill_COWA_spriteAttr_initialize = Sprite.prototype.initialize;
Sprite.prototype.initialize = function( bitmap ){
	_drill_COWA_spriteAttr_initialize.call( this, bitmap );
	this.drill_COWA_initialize();
	this._drill_COWA_isWindow = false;
}
//==============================
// * 贴图 - 帧刷新（私有）
//==============================
var _drill_COWA_spriteAttr_update = Sprite.prototype.update;
Sprite.prototype.update = function(){
	_drill_COWA_spriteAttr_update.call(this);
	this.drill_COWA_update();
}


	
//=============================================================================
// ** 核心功能扩展 - 帮助窗口换行
//=============================================================================
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

