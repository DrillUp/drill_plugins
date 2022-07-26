//=============================================================================
// Drill_HtmlLoadingTip.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        游戏窗体 - 资源“加载中”提示图
 * @author Drill_up
 *
 *
 * @help
 * =============================================================================
 * +++ Drill_HtmlLoadingTip +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以对系统层面显示的“加载中”贴图进行控制。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面、菜单界面。
 *   作用于底层贴图功能。
 * 细节：
 *   (1.“加载中”贴图是底层图片，固定为资源"/system/Loading.png"。
 *      且进入游戏一定需要此资源，没有则游戏直接报错，不让进。
 *   (2.此资源图片不能被加密，注意不要让其强制被加密。
 *   (3.由于资源唯一，所以只能将多帧gif绘制在同一张图片上。
 * 设计：
 *   (1.该插件可以将"加载中"提示换掉，
 *      如果你只想要单张图片，可以设置GIF为1帧 或者 直接关闭此插件。
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
 * 时间复杂度： o(n) 每帧
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只改变loading图片的处理方式，计算性能消耗几乎没有。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * 
 * 
 *
 * 
 * @param ---常规---
 * @desc 
 *
 * @param 最小载入超时时间
 * @parent ---常规---
 * @type number
 * @min 1
 * @desc 当资源文件开始读取后，等待超过N帧后，"加载中"贴图会显示。默认20帧。
 * @default 20
 *
 * @param 贴图显现时长
 * @parent ---常规---
 * @type number
 * @min 1
 * @desc "加载中"贴图显现的时长。
 * @default 20
 * 
 * @param ---GIF效果---
 * @desc 
 *
 * @param 切割帧数
 * @parent ---GIF效果---
 * @type number
 * @min 1
 * @desc "加载中"贴图(/system/Loading.png)会被横切成N等分，然后作为GIF循环播放。
 * @default 1
 *
 * @param 帧间隔
 * @parent ---GIF效果---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		HLT（Html_Loading_Tip）
//		临时全局变量	无
//		临时局部变量	this._drill_HLT_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Graphics._paintUpperCanvas
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	对话管理层
//		★性能测试消耗	太小，没找到
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			资源“加载中”提示：
//				->getContext('2d')绘制处理
//
//		★必要注意事项：
//			1.
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
　　Imported.Drill_HtmlLoadingTip = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_HtmlLoadingTip');

	
	/*-----------------杂项------------------*/
	DrillUp.g_HLT_delay = Number(DrillUp.parameters["最小载入超时时间"] || 20);
	DrillUp.g_HLT_showingTime = Number(DrillUp.parameters["贴图显现时长"] || 20);
	DrillUp.g_HLT_gifFrame = Number(DrillUp.parameters["切割帧数"] || 1);
	DrillUp.g_HLT_gifInterval = Number(DrillUp.parameters["帧间隔"] || 4);
	
	
//=============================================================================
// ** 视图
//=============================================================================
//==============================
// * 视图 - 初始化
//==============================
var _drill_HLT_initialize = Graphics.initialize;
Graphics.initialize = function( width, height, type ){
	_drill_HLT_initialize.call( this, width, height, type );
	this._drill_HLT_curFrame = 0;		//当前帧
}
//==============================
// * 视图 - 开始读取
//==============================
var _drill_HLT_startLoading = Graphics.startLoading;
Graphics.startLoading = function() {
	_drill_HLT_startLoading.call( this );
	this._drill_HLT_curFrame = 0;		//当前帧置零
}
//==============================
// * 视图 - 帧刷新图像（覆写）
//==============================
Graphics._paintUpperCanvas = function() {
    this._clearUpperCanvas();
    if( this._loadingImage && this._loadingCount >= DrillUp.g_HLT_delay ){
        var context = this._upperCanvas.getContext('2d');
		var ww = this._loadingImage.width;
		var hh = this._loadingImage.height;
		
		var sw = ww;		//（剪切的矩形）
		var sh = Math.floor(hh / DrillUp.g_HLT_gifFrame);
		var sx = 0;
		var sy = sh * this._drill_HLT_curFrame;
		var pw = ww;		//（放置的矩形）
		var ph = sh;
        var px = (this._width - ww) / 2;
        var py = (this._height - sh) / 2;
        var alpha = ((this._loadingCount - DrillUp.g_HLT_delay) / DrillUp.g_HLT_showingTime).clamp(0, 1);
        context.save();
        context.globalAlpha = alpha;
        context.drawImage(this._loadingImage, sx, sy, sw, sh, px, py, pw, ph );
        context.restore();
		
		// > 当前帧+1
		if( (this._loadingCount - DrillUp.g_HLT_delay) % DrillUp.g_HLT_gifInterval == 0 ){
			this._drill_HLT_curFrame += 1;
			this._drill_HLT_curFrame %= DrillUp.g_HLT_gifFrame;
		}
    }
};
//==============================
// * 地图界面 - （强制执行帧刷新显示）
//==============================
//var _drill_HLT_update = Scene_Map.prototype.update;
//Scene_Map.prototype.update = function() {
//	_drill_HLT_update.call(this);
//	Graphics.updateLoading();
//}


