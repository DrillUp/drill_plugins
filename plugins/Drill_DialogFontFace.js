//=============================================================================
// Drill_DialogFontFace.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        窗口字符 - 字体管理器
 * @author Drill_up
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_DialogFontFace +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件专门对字体进行设置。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter   窗口字符-窗口字符核心★★v1.3及以上★★
 *     需要该核心才能使用窗口字符修改字体。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于窗口的文本。
 * 2.更多详细内容，去看看 "23.窗口字符 > 关于字体管理器.docx"。
 * 细节：
 *   (1.你需要去看文档，来配置fonts文件夹下面的字体。
 *      才能保证字体能正常加载到游戏中并使用。
 *   (2.你也可以填系统自带的"SimHei"黑体，"SimSun"宋体。
 * 预加载：
 *   (1.插件中的资源会被反复使用，所以插件默认所有资源都预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符，才能切换字体：
 * 
 * 窗口字符：\fn[xxx]
 * 
 * 1.该窗口字符，能指定之后的文字字体，"xxx"为字体名称。
 *   即你在 fonts文件夹下 gamefont.css文件中 自定义的英文名。
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
 * 测试方法：   去各个界面进行性能测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *              战斗界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只改变字体格式，并不产生多少消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件的分类。优化了内部结构。
 * 
 * 
 * @param 默认字体类型
 * @desc 所有窗口中默认的字体类型。默认为"GameFont"。你也可以填系统自带的"SimHei"黑体，"SimSun"宋体。
 * @default GameFont
 * 
 * @param 预加载的字体名
 * @type text[]
 * @desc 将fonts文件夹中gamefont.css文件里配置的字体名称，添加到这里，即可预加载字体。
 * @default ["GameFont"]
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DFF（Dialog_Font_Face）
//		临时全局变量	DrillUp.g_DFF_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Window_Base.prototype.standardFontFace
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)
//		★性能测试因素	随意跑一圈
//		★性能测试消耗	2024/5/10：
//							》未找到，消耗太小。
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
//			->☆管辖权
//			
//			->☆预加载（字体）
//			->☆窗口字符解析
//			
//			->☆窗口控制
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
//			1.该插件单独控制字体，其他的插件注意避开对字体的控制情况。
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
	DrillUp.g_DFF_PluginTip_curName = "Drill_DialogFontFace.js 窗口字符-字体管理器";
	DrillUp.g_DFF_PluginTip_baseList = ["Drill_CoreOfWindowCharacter.js 窗口字符-窗口字符核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DFF_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DFF_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DFF_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DFF_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DFF_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 兼容冲突
	//==============================
	DrillUp.drill_DFF_getPluginTip_CompatibilityYEP = function(){
		return "【" + DrillUp.g_DFF_PluginTip_curName + "】\n"+
				"检测到你开启了 YEP_MessageCore插件。\n"+
				"请及时关闭该插件，该插件与 窗口字符核心 存在兼容冲突。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogFontFace = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogFontFace');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DFF_fontFace = String(DrillUp.parameters["默认字体类型"] || "GameFont"); 
	if( DrillUp.parameters["预加载的字体名"] != undefined && 
		DrillUp.parameters["预加载的字体名"] != "" ){
		DrillUp.g_DFF_preload = JSON.parse( DrillUp.parameters["预加载的字体名"] );
	}else{
		DrillUp.g_DFF_preload = [];
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	//==============================
	// * 启动时 检测兼容性
	//==============================
	var _drill_DFF_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_DFF_scene_initialize.call(this);
		
		if( Imported.YEP_MessageCore ){
			alert( DrillUp.drill_DFF_getPluginTip_CompatibilityYEP() );
		}
	};



//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * A默认属性『窗口字符-字体管理器』 - 默认字体类型
//
//			功能：	> 该函数会根据语言配置自动切换字体，但实际上并没有明显的效果。
//					> 语言功能比较鸡肋，可有可无。
//==============================
Window_Base.prototype.standardFontFace = function(){
    if( $gameSystem.isChinese() ){
        return 'SimHei, Heiti TC, sans-serif';
    }else if( $gameSystem.isKorean() ){
        return 'Dotum, AppleGothic, sans-serif';
    }else{
        return 'GameFont';
    }
};
*/


//=============================================================================
// ** ☆预加载（字体）
//
//			说明：	> 此处专门执行字体的预加载。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 执行字体预加载
//
//			说明：	> 函数 _createFontLoader 本质上是创建一个div对象，然后绑定字体样式。
//					  由于绑定的样式需要显示，所以字体才会被加载进来。
//==============================
var _drill_DFF__createGameFontLoader = Graphics._createGameFontLoader;
Graphics._createGameFontLoader = function(){
	_drill_DFF__createGameFontLoader.call( this );
	for(var i = 0; i < DrillUp.g_DFF_preload.length; i++ ){
		var font_name = DrillUp.g_DFF_preload[i];
		if( font_name == "GameFont" ){ continue; }
		this._createFontLoader( font_name );
	}
}


//=============================================================================
// ** ☆窗口字符解析
//=============================================================================
//==============================
// * 窗口字符解析 - 效果字符 组合符（继承）
//==============================
var _drill_DFF_COWC_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_DFF_COWC_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	if( command.toUpperCase() == "FN" ){	//（\fn和\FN 都可以）
		
		if( args.length == 1 ){
			this.contents.fontFace = String(args[0]);
			this.drill_COWC_charSubmit_Effect(0,0);
		}
		
	}
}
//==============================
// * 窗口字符解析 - 画笔同步（继承）
//==============================
var _drill_DFF_COWC_drawSynchronization = Window_Base.prototype.drill_COWC_drawSynchronization;
Window_Base.prototype.drill_COWC_drawSynchronization = function( bitmap_from, bitmap_to ){
	_drill_DFF_COWC_drawSynchronization.call( this, bitmap_from, bitmap_to );
	bitmap_to.fontFace = bitmap_from.fontFace;
}


//=============================================================================
// ** ☆窗口控制
//
//			说明：	> 此处专门窗口相关控制操作。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口控制 - 默认字体类型（覆写）
//==============================
Window_Base.prototype.standardFontFace = function(){
	return DrillUp.g_DFF_fontFace;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogFontFace = false;
		var pluginTip = DrillUp.drill_DFF_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


