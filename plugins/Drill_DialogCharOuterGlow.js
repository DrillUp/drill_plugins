//=============================================================================
// Drill_DialogCharOuterGlow.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        窗口字符 - 外发光效果
 * @author Drill_up
 * 
 * @Drill_LE_param "颜色-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DCOG_color_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogCharOuterGlow +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以给窗口字符添加 外发光效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowCharacter  窗口字符-窗口字符核心★★v1.3及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   只作用于所有窗口字符。
 * 2.了解更多内容，可以去看看 "23.窗口字符 > 关于字符描边与外发光.docx"。
 * 发光效果：
 *   (1.使用描边的窗口字符包裹，可以实现字符的描边效果。
 *      默认情况下，所有字符都不含发光效果。
 * 设计：
 *   (1.你可以将描边效果与发光效果组合，来增强字符的边沿的亮度。
 *      具体可以去示例中 窗口字符管理层 看看。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要使用下面的窗口字符来实现效果：
 * 
 * 窗口字符：\dDCOG[1]          之后的文字使用颜色1的外发光。
 * 窗口字符：\dDCOG[1:5:1:1]    之后的文字使用颜色1，厚度5，偏移(1,1)的外发光。
 * 窗口字符：\dDCOGr            之后的文字关闭外发光。
 * 
 * 窗口字符：\og[1]             与\dDCOG[1]一样，简写形式。
 * 窗口字符：\os[5]             之后的文字改变外发光厚度5，简写形式。
 * 窗口字符：\fr                重置之后文字所有设置。包括关闭外发光。
 * 
 * 1.这里的窗口字符均为效果字符，
 *   比如"\dDCOG[1]发光\dDCOGr"，包裹的字符将会产生外发光效果。
 * 2.字符"\dDCOGr"只关闭外发光效果，字符"\fr"会重置所有设置。
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
 * 2.由于发光字符只单次执行，所以几乎不考虑其消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 *
 * 
 * @param ---默认设置---
 * @desc 
 * 
 * @param 默认外发光厚度
 * @parent ---默认设置---
 * @type number
 * @min 1
 * @desc 默认外发光的厚度，单位像素。
 * @default 5
 * 
 * @param 默认外发光偏移 X
 * @parent ---默认设置---
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 1
 * 
 * @param 默认外发光偏移 Y
 * @parent ---默认设置---
 * @desc y轴方向平移，单位像素。正数向下，负数向上。
 * @default 1
 * 
 * @param ---外发光颜色---
 * @default 
 * 
 * @param 颜色-1
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==赤==","颜色代码":"#FF4444"}
 * 
 * @param 颜色-2
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==橙==","颜色代码":"#FF784C"}
 * 
 * @param 颜色-3
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==黄==","颜色代码":"#FFFF40"}
 * 
 * @param 颜色-4
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==绿==","颜色代码":"#80FF80"}
 * 
 * @param 颜色-5
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==青==","颜色代码":"#98F5FF"}
 * 
 * @param 颜色-6
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==蓝==","颜色代码":"#40C0F0"}
 * 
 * @param 颜色-7
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==紫==","颜色代码":"#8080FF"}
 * 
 * @param 颜色-8
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==粉==","颜色代码":"#FF69B4"}
 * 
 * @param 颜色-9
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==棕==","颜色代码":"#8B4C39"}
 * 
 * @param 颜色-10
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==灰==","颜色代码":"#797979"}
 * 
 * @param 颜色-11
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==黑==","颜色代码":"#000000"}
 * 
 * @param 颜色-12
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default {"标记":"==白==","颜色代码":"#FFFFFF"}
 * 
 * @param 颜色-13
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-14
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-15
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-16
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-17
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-18
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-19
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 * @param 颜色-20
 * @parent ---外发光颜色---
 * @type struct<CommonColor>
 * @desc 自定义你的配置颜色。颜色代码大写小写字母都可以识别。
 * @default 
 * 
 */
/*~struct~CommonColor:
 * 
 * @param 标记
 * @desc 用于区分你设置的颜色的说明注释，脚本中不起作用。
 * @default ==新的颜色==
 * 
 * @param 颜色代码
 * @desc 颜色对应的字符串代码。
 * @default #FFFFFF
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DCOG (Dialog_Char_Outer_Glow)
//		临时全局变量	DrillUp.g_DCOG_xxx
//		临时局部变量	this._drill_DCOG_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)  每帧
//		★性能测试因素	UI管理层
//		★性能测试消耗	
//		★最坏情况		
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			外发光效果：
//				->参数设置
//
//		★必要注意事项：
//			暂无
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
　　Imported.Drill_DialogCharOuterGlow = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogCharOuterGlow');
	
	
	//==============================
	// * 变量获取 - 外发光颜色
	//				（~struct~CommonColor）
	//==============================
	DrillUp.drill_DCOG_initCommonColor = function( dataFrom ){
		var data = {};
		data['color'] = String( dataFrom["颜色代码"] || "#FFFFFF" );
		return data;
	}
	//==============================
	// * 临时全局 - 获取外发光颜色
	//==============================
	DrillUp.drill_DCOG_getColor = function( n ){
		if( !DrillUp.g_DCOG_color_list[n] ){ console.log("【窗口字符-外发光效果】外发光颜色接受到一个无效的参数："+n+"。" ); return "#ffffff" }
		if( !DrillUp.g_DCOG_color_list[n]['color'] ){ console.log("【窗口字符-外发光效果】你没有在 外发光颜色-"+n+" 中配置，而你在游戏中使用了它。" ); return "#ffffff" }
		return DrillUp.g_DCOG_color_list[n]['color'];
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_DCOG_shadowBlur = Number(DrillUp.parameters["默认外发光厚度"] || 5); 
	DrillUp.g_DCOG_shadowOffsetX = Number(DrillUp.parameters["默认外发光偏移 X"] || 1); 
	DrillUp.g_DCOG_shadowOffsetY = Number(DrillUp.parameters["默认外发光偏移 Y"] || 1); 
	
	/*-----------------外发光颜色------------------*/
	DrillUp.g_DCOG_color_list_length = 20;
	DrillUp.g_DCOG_color_list = [];
	for( var i = 0; i < DrillUp.g_DCOG_color_list_length; i++ ){
		if( DrillUp.parameters['颜色-' + String(i+1) ] != "" &&
			DrillUp.parameters['颜色-' + String(i+1) ] != undefined ){
			var data = JSON.parse(DrillUp.parameters['颜色-' + String(i+1) ]);
			DrillUp.g_DCOG_color_list[i] = DrillUp.drill_DCOG_initCommonColor( data );
		}else{
			DrillUp.g_DCOG_color_list[i] = {};
		}
	}
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	
//=============================================================================
// * 效果字符 - 字符转换（简单符）
//=============================================================================
var _drill_DCOG_processNewEffectChar_Simple = Window_Base.prototype.drill_COWC_processNewEffectChar_Simple;
Window_Base.prototype.drill_COWC_processNewEffectChar_Simple = function( matched_index, command ){
	_drill_DCOG_processNewEffectChar_Simple.call( this, matched_index, command );
	
	// > 重置
	if( command == "dDCOGr" ){
		this.drill_DCOG_clearOuterGlow();
		this.drill_COWC_charSubmit_Effect(0,0);
	}
}
//=============================================================================
// * 效果字符 - 字符转换（组合符）
//=============================================================================
var _drill_DCOG_processNewEffectChar_Combined = Window_Base.prototype.drill_COWC_processNewEffectChar_Combined;
Window_Base.prototype.drill_COWC_processNewEffectChar_Combined = function( matched_index, matched_str, command, args ){
	_drill_DCOG_processNewEffectChar_Combined.call( this, matched_index, matched_str, command, args );
	
	// > 设置外发光
	if( command == "dDCOG" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( this.contents != undefined ){
				this.contents._context.shadowColor = DrillUp.drill_DCOG_getColor( Number(temp1)-1 );
				if( this.contents._context.shadowBlur == 0 ){
					this.contents._context.shadowBlur = DrillUp.g_DCOG_shadowBlur;
				}
				this.contents._context.shadowOffsetX = DrillUp.g_DCOG_shadowOffsetX;
				this.contents._context.shadowOffsetY = DrillUp.g_DCOG_shadowOffsetY;
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
		if( args.length == 4 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			var temp3 = String(args[2]);
			var temp4 = String(args[3]);
			if( this.contents != undefined ){
				this.contents._context.shadowColor = DrillUp.drill_DCOG_getColor( Number(temp1)-1 );
				this.contents._context.shadowBlur = Number(temp2);
				this.contents._context.shadowOffsetX = Number(temp3);
				this.contents._context.shadowOffsetY = Number(temp4);
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	
	// > 简写形式
	if( command.toLowerCase() == "og" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( this.contents != undefined ){
				this.contents._context.shadowColor = DrillUp.drill_DCOG_getColor( Number(temp1)-1 );
				if( this.contents._context.shadowBlur == 0 ){
					this.contents._context.shadowBlur = DrillUp.g_DCOG_shadowBlur;
				}
				this.contents._context.shadowOffsetX = DrillUp.g_DCOG_shadowOffsetX;
				this.contents._context.shadowOffsetY = DrillUp.g_DCOG_shadowOffsetY;
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
	if( command.toLowerCase() == "os" ){
		if( args.length == 1 ){
			var temp1 = String(args[0]);
			if( this.contents != undefined ){
				this.contents._context.shadowBlur = Number(temp1);
			}
			this.drill_COWC_charSubmit_Effect(0,0);
		}
	}
}
//==============================
// * 外发光 - 画笔同步（继承）
//==============================
var _drill_COWC_DCOG_drawSynchronization = Window_Base.prototype.drill_COWC_drawSynchronization;
Window_Base.prototype.drill_COWC_drawSynchronization = function( bitmap_from, bitmap_to ){
	_drill_COWC_DCOG_drawSynchronization.call( this, bitmap_from, bitmap_to );
	bitmap_to._context.shadowColor = bitmap_from._context.shadowColor;
	bitmap_to._context.shadowBlur = bitmap_from._context.shadowBlur;
	bitmap_to._context.shadowOffsetX = bitmap_from._context.shadowOffsetX;
	bitmap_to._context.shadowOffsetY = bitmap_from._context.shadowOffsetY;
}
//==============================
// * 外发光 - 重置
//==============================
Window_Base.prototype.drill_DCOG_clearOuterGlow = function() {
	if( this.contents == undefined ){ return; }
	this.contents._context.shadowColor = "#000000";			//重置 - 默认黑色
	this.contents._context.shadowBlur = 0;					//重置 - 不发光
	this.contents._context.shadowOffsetX = 0;				//重置 - 不偏移
	this.contents._context.shadowOffsetY = 0;				//重置 - 不偏移
};
//==============================
// * 外发光 - 重置绑定
//==============================
var _drill_DCOG_resetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
	_drill_DCOG_resetFontSettings.call(this);
	this.drill_DCOG_clearOuterGlow();
};

/*
var _drill_DCOG__drawTextOutline = Bitmap.prototype._drawTextOutline;
Bitmap.prototype._drawTextOutline = function( text, tx, ty, maxWidth ){
	
    var context = this._context;
	context.shadowColor = "#00ffff";
	context.shadowBlur = 5;
	context.shadowOffsetX = 1;
	context.shadowOffsetY = 1;
	
	// > 原函数
	_drill_DCOG__drawTextOutline.call( this, text, tx, ty, maxWidth );
}*/


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogCharOuterGlow = false;
		alert(
			"【Drill_DialogCharOuterGlow.js 窗口字符 - 外发光效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowCharacter 窗口字符-窗口字符核心"
		);
}

