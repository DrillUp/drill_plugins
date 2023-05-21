//=============================================================================
// Drill_DialogTextBigImage.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        窗口字符 - 大图片字符
 * @author Drill_up
 * 
 * @Drill_LE_param "字符图-%d"
 * @Drill_LE_parentKey "---字符图组%d至%d---"
 * @Drill_LE_var "DrillUp.g_DTBI_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogTextBigImage +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将图片当成一个字符，绘制在窗口中。
 * ★★必须基于 窗口字符核心 插件★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心
 *     需要该核心才能将图片绘制在窗口的文本域中。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__textBigImg （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__main文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 字符图-1
 * 字符图-2
 * 字符图-3
 * ……
 * 
 * 注意，虽然属于对话框分类，但是实际也作用于菜单中的窗口。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只对话框有效。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 细节：
 *   (1.不要将大图片当成背景来用，因为窗口的文本域限制，绘制到边缘时
 *      会被切割。
 *   (2.在游戏启动5秒前后，窗口需要加载并初始化全部窗口字符图。
 *      如果这时候立即使用窗口字符，插件可能会反应不过来。
 *      因为图片未加载结束，所以可能会出现偶尔的绘制失败情况。     
 * 设计：
 *   (1.该插件可以和 字符串核心 结合使用。
 *      因为字符串核心可以通过插件指令或者玩家手动编辑修改。
 *      所以二者功能结合后，可以通过修改 大图片字符，达成窗口说明中
 *      显示/切换图片的效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来绘制大图片：
 * 
 * 窗口字符：\dimg[1]
 * 窗口字符：\dimg[1:位置[10,-10]]
 * 
 * 1."\dimg[1]"字符会把编号为1的图片绘制到当前光标下。 
 *   （dimg全称为：Drill_Image，即图片字符）
 * 2."\dimg[1:位置[10,-10]]"字符会把编号为1的图片绘制到当前光标
 *   偏移到 x 10像素 y -10像素 的位置。
 * 3.后绘制的图片，能够遮挡先绘制的文字或图片。但不包括 字符块 。
 *   详细可以去看看对话管理层 阅后即焚 的效果。
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
 * 2.插件只单次执行控制字符的图像绘制，绘制完毕后就结束了操作。
 *   所以几乎没有消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了注释说明。
 * [v1.2]
 * 修改了插件的分类。
 * [v1.3]
 * 修复了部分情况下无法显示图片的问题。
 * 
 * 
 * 
 * @param ---字符图组 1至20---
 * @default 
 *
 * @param 字符图-1
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-2
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-3
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-4
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-5
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-6
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-7
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-8
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-9
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-10
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-11
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-12
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-13
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-14
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-15
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-16
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-17
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-18
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-19
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-20
 * @parent ---字符图组 1至20---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param ---字符图组21至40---
 * @default 
 *
 * @param 字符图-21
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-22
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-23
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-24
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-25
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-26
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-27
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-28
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-29
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-30
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-31
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-32
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-33
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-34
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-35
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-36
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-37
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-38
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-39
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 *
 * @param 字符图-40
 * @parent ---字符图组21至40---
 * @desc 使用字符时，该图片将会被绘制到指定文本域中。
 * @default 
 * @require 1
 * @dir img/Menu__textBigImg/
 * @type file
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DTBI（Dialog_Text_Big_Image）
//		临时全局变量	无
//		临时局部变量	this._drill_DTBI_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	对话管理层
//		★性能测试消耗	1.20ms（所有插件最小值）
//		★最坏情况		暂无
//		★备注			在反复测试刷选项窗口时，帧数会降低到22帧，但是只是添加了渲染render的负担，过一下就好了。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆变量获取
//			
//			->☆临时变量初始化
//				->预加载
//			->☆字符图
//				->绘制大图片
//		
//		
//		★家谱：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.没什么细节说明，就是照着drawIcon仿写了一下。
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
	DrillUp.g_DTBI_PluginTip_curName = "Drill_DialogTextBigImage.js 窗口字符-大图片字符";
	DrillUp.g_DTBI_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 系统-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DTBI_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DTBI_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DTBI_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DTBI_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DTBI_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_DTBI_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_DTBI_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	
	
//=============================================================================
// ** ☆变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogTextBigImage = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogTextBigImage');
	
	/*------------------字符图-------------------*/
	DrillUp.g_DTBI_list_length = 40;
	DrillUp.g_DTBI_list = [];
	for( var i = 0; i < DrillUp.g_DTBI_list_length; i++ ){
		DrillUp.g_DTBI_list[i] = String(DrillUp.parameters['字符图-' + String(i+1) ] || "");
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// ** ☆临时变量初始化
//
//			说明：	> 用过的bitmap，全部标记不删除，防止刷菜单时重建导致浪费资源。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
DrillUp.g_DTBI_preloadEnabled = true;		//（强制预加载）
if( DrillUp.g_DTBI_preloadEnabled == true ){
	//==============================
	// * 临时变量 - 初始化
	//==============================
	var _drill_DTBI_temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_drill_DTBI_temp_initialize.call(this);
		this.drill_DTBI_preloadInit();
	}
	//==============================
	// * 临时变量 - 预加载 版本校验
	//==============================
	if( Utils.generateRuntimeId == undefined ){
		alert( DrillUp.drill_DTBI_getPluginTip_LowVersion() );
	}
	//==============================
	// * 临时变量 - 资源提前预加载
	//
	//			说明：	遍历全部资源，提前预加载标记过的资源。
	//==============================
	Game_Temp.prototype.drill_DTBI_preloadInit = function() {
		this._drill_DTBI_cacheId = Utils.generateRuntimeId();	//资源缓存id
		this._drill_DTBI_preloadTank = [];						//bitmap容器
		for( var i = 0; i < DrillUp.g_DTBI_list.length; i++ ){
			var temp_data = DrillUp.g_DTBI_list[i];
			if( temp_data == undefined ){ continue; }
			
			this._drill_DTBI_preloadTank.push( 
				ImageManager.reserveBitmap( "img/Menu__textBigImg/", temp_data, 0, true ) 
			);
		}
	}
}


//=============================================================================
// ** ☆字符图
//			
//			说明：	> 此模块对 效果字符 进行转义，并绘制大图片。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 字符图 - 效果字符转义
//==============================
var _drill_DTBI_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_DTBI_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	if( command == "dimg" ){
		
		if( args.length == 1 ){
			this.drill_DTBI_drawImg( Number(args[0]), 
				this._drill_COWC_effect_curData['x'], 
				this._drill_COWC_effect_curData['y'] );
			this.drill_COWC_charSubmit_Effect(0,0);
		}
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			temp2 = temp2.replace("位置[","");
			temp2 = temp2.replace("]","");
			var pos = temp2.split(/[,，]/);
			if( pos.length >= 2 ){
				this.drill_DTBI_drawImg( Number(temp1), 
					this._drill_COWC_effect_curData['x'] + Number(pos[0]), 
					this._drill_COWC_effect_curData['y'] + Number(pos[1]) );
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
		
	}
};
//==============================
// * 字符图 - 绘制大图片
//==============================
Window_Base.prototype.drill_DTBI_drawImg = function( imgIndex, x, y ){
    var bitmap = $gameTemp._drill_DTBI_preloadTank[ imgIndex-1 ];	//（直接从 预加载容器 中取出并绘制）
	if( bitmap && bitmap.isReady() ){
		var pw = bitmap.width;
		var ph = bitmap.height;
		var sx = 0;
		var sy = 0;
		this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogTextBigImage = false;
		var pluginTip = DrillUp.drill_DTBI_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


