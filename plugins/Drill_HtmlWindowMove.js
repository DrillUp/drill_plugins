//=============================================================================
// Drill_HtmlWindowMove.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        游戏窗体 - 游戏窗体移动
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_HtmlWindowMove +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在使用nwjs窗口游戏时，窗体在电脑屏幕上移动一周。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于游戏窗体。
 * 设计：
 *   (1.注意，由于底层nwjs关系，速度越快，移动效果越不流畅。
 *      所以该插件只能作为简单的小彩蛋一用。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以使用下面插件指令操作窗口移动：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>游戏窗体 : 右移一周 : 持续时间[60]
 * 插件指令：>游戏窗体 : 左移一周 : 持续时间[60]
 * 插件指令：>游戏窗体 : 上移一周 : 持续时间[60]
 * 插件指令：>游戏窗体 : 下移一周 : 持续时间[60]
 * 插件指令：>游戏窗体 : 左上移一周 : 持续时间[60]
 * 插件指令：>游戏窗体 : 右上移一周 : 持续时间[60]
 * 插件指令：>游戏窗体 : 左下移一周 : 持续时间[60]
 * 插件指令：>游戏窗体 : 右下移一周 : 持续时间[60]
 *                                                          
 * 1.设置插件指令后，窗体将会在持续时间内移动一周。
 *   移动期间，游戏不会暂停。
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
 * 时间复杂度： o(n^2)*o(游戏窗体渲染) 每帧
 * 测试方法：   在初始点，进行插件指令测试。
 * 测试结果：   地图界面中，消耗为：【47.57ms】
 *              战斗界面中，消耗为：【51.66ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.底层环境没有提供纯粹的窗口移动功能。
 *   该插件移动窗体后，必然要对整个游戏渲染进行重新刷新，所以速度
 *   会明显下降许多，变得不流畅。消耗也大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		HWM (Html_Window_Move)
//		临时全局变量	DrillUp.drill_HWM_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(游戏层渲染)
//		★性能测试因素	初始点测试
//		★性能测试消耗	47.57ms
//		★最坏情况		暂无
//		★备注			底层环境没有提供纯粹的窗口移动功能。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			游戏窗体移动：
//				->八个方向移动一周
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.根据nwjs的底层提供的函数，只有 nw.window.x 能够改变坐标。
//			  而这个坐标改动的效果，非常不流畅。而且变动后，窗口高宽会变。
//			2.找到的官方文档说明：（函数并没有想象那么多那么好用）
//			  https://nwjs.readthedocs.io/en/latest/References/Window/#winmovetox-y
//
//		★存在的问题：
//			1.目前没办法解决窗口移动流畅性，并且不增加负担。
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_HtmlWindowMove = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_HtmlWindowMove');
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令
//==============================
var _drill_HWM_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_HWM_pluginCommand.call(this, command, args);
	if( command === ">游戏窗体" ){
		
		/*-----------------窗体------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			temp1 = temp1.replace("持续时间[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1);
			
			if( type == "右移一周" ||
				type == "左移一周" || 
				type == "上移一周" || 
				type == "下移一周" || 
				type == "左上移一周" || 
				type == "右上移一周" || 
				type == "左下移一周" || 
				type == "右下移一周" ){
				DrillUp.drill_HWM_setWindowMove( type, temp1 );
			}
		}
		
	}
}

//=============================================================================
// ** 全局临时数据
//=============================================================================
//==============================
// * 全局临时数据 - 初始化
//==============================
DrillUp.drill_HWM_init = function() {
	this.drill_HWM_data = {};
	this.drill_HWM_data['org_x'] = 0;
	this.drill_HWM_data['org_y'] = 0;
	this.drill_HWM_data['org_width'] = 0;
	this.drill_HWM_data['org_height'] = 0;
	this.drill_HWM_data['screen_width'] = window.screen.width;
	this.drill_HWM_data['screen_height'] = window.screen.height;
	this.drill_HWM_data['type'] = "";
	this.drill_HWM_data['time'] = 0;
	this.drill_HWM_data['tarTime'] = 60;
}
//==============================
// * 全局临时数据 - 设置移动
//==============================
DrillUp.drill_HWM_setWindowMove = function( type, temp1 ){
	if( this.drill_HWM_isMoving() ){ return; } 
	this.drill_HWM_data['type'] = String(type);
	this.drill_HWM_data['time'] = 0;
	this.drill_HWM_data['tarTime'] = Number(temp1);
}
//==============================
// * 全局临时数据 - 判断移动
//==============================
DrillUp.drill_HWM_isMoving = function() {
	var data = this.drill_HWM_data;
	if( data['type'] == "" ){ return false; }
	return true;
}
//==============================
// * 全局临时数据 - 执行初始化
//==============================
DrillUp.drill_HWM_init();


//=============================================================================
// ** 关闭自适应
//=============================================================================
//==============================
// * 视图 - 刷新视图
//==============================
var _drill_HWM__updateAllElements = Graphics._updateAllElements;
Graphics._updateAllElements = function() {
	if( DrillUp.drill_HWM_isMoving() == true ){ return; } 	//移动时，不改变事件
	_drill_HWM__updateAllElements.call(this);
}
//==============================
// * 视图 - 缩放事件
//==============================
var _drill_HWM__onWindowResize = Graphics._onWindowResize;
Graphics._onWindowResize = function() {
	if( DrillUp.drill_HWM_isMoving() == true ){ return; } 	//移动时，不改变事件
	_drill_HWM__onWindowResize.call(this);
}
//==============================
// * 视图 - 刷新比例
//==============================
var _drill_HWM__updateRealScale = Graphics._updateRealScale;
Graphics._updateRealScale = function() {
	if( DrillUp.drill_HWM_isMoving() == true ){ return; } 	//移动时，不改变事件
	_drill_HWM__updateRealScale.call(this);
}


//=============================================================================
// ** 窗口
//=============================================================================
//==============================
// * 场景管理器 - 帧渲染
//==============================
var _drill_HWM_renderScene = SceneManager.renderScene;
SceneManager.renderScene = function() {
	_drill_HWM_renderScene.call(this);
	
	if( DrillUp.drill_HWM_isMoving() == false ){ return; }
	this.drill_HWM_updatePositionNwjs();	//刷新位置（nwjs情况）
}

//==============================
// * 帧刷新 - 刷新位置（nwjs情况）
//==============================
SceneManager.drill_HWM_updatePositionNwjs = function() {
	var data = DrillUp.drill_HWM_data;
	if( Utils.isNwjs() == false ){ return; }
	var gui = require('nw.gui'); 
	var win = gui.Window.get(); 
	
	// > 初始化
	if( data['time'] == 0 ){
		data['org_x'] = win.x;
		data['org_y'] = win.y;
		data['org_width'] = win.width;
		data['org_height'] = win.height;
	}
		
	// > 移动
	var xx = data['org_x'];
	var yy = data['org_y'];
	if( data['type'] == "右移一周" ){
		xx += data['screen_width'] * 2 * data['time'] / data['tarTime'];
		if( xx > data['screen_width'] ){
			xx = xx - data['screen_width'] *2;
		}
	}
	if( data['type'] == "左移一周" ){
		xx -= data['screen_width'] * 2 * data['time'] / data['tarTime'];
		if( xx < -1 * data['screen_width'] ){
			xx = xx + data['screen_width'] *2;
		}
	}
	if( data['type'] == "下移一周" ){
		yy += data['screen_height'] * 2 * data['time'] / data['tarTime'];
		if( yy > data['screen_height'] ){
			yy = yy - data['screen_height'] *2;
		}
	}
	if( data['type'] == "上移一周" ){
		yy -= data['screen_height'] * 2 * data['time'] / data['tarTime'];
		if( yy < -1 * data['screen_height'] ){
			yy = yy + data['screen_height'] *2;
		}
	}
	if( data['type'] == "左上移一周" ){
		xx -= data['screen_width'] * 2 * data['time'] / data['tarTime'];
		yy -= data['screen_height'] * 2 * data['time'] / data['tarTime'];
		if( xx < -1 * data['screen_width'] ){ xx = xx + data['screen_width'] *2; }
		if( yy < -1 * data['screen_height'] ){ yy = yy + data['screen_height'] *2; }
	}
	if( data['type'] == "右上移一周" ){
		xx += data['screen_width'] * 2 * data['time'] / data['tarTime'];
		yy -= data['screen_height'] * 2 * data['time'] / data['tarTime'];
		if( xx > data['screen_width'] ){ xx = xx - data['screen_width'] *2; }
		if( yy < -1 * data['screen_height'] ){ yy = yy + data['screen_height'] *2; }
	}
	if( data['type'] == "左下移一周" ){
		xx -= data['screen_width'] * 2 * data['time'] / data['tarTime'];
		yy += data['screen_height'] * 2 * data['time'] / data['tarTime'];
		if( xx < -1 * data['screen_width'] ){ xx = xx + data['screen_width'] *2; }
		if( yy > data['screen_height'] ){ yy = yy - data['screen_height'] *2; }
	}
	if( data['type'] == "右下移一周" ){
		xx += data['screen_width'] * 2 * data['time'] / data['tarTime'];
		yy += data['screen_height'] * 2 * data['time'] / data['tarTime'];
		if( xx > data['screen_width'] ){ xx = xx - data['screen_width'] *2; }
		if( yy > data['screen_height'] ){ yy = yy - data['screen_height'] *2; }
	}
	//if( isNaN( xx ) )
	//win.setResizable(false);
	//win.moveTo( Math.round( xx ), Math.round( yy ) )
	//win.resizeTo( data['org_width'], data['org_height'] )
	//win.moveBy( Math.round( xx )-win.x, Math.round( yy )-win.y );
	
	win.x = Math.round( xx );	//（只单独装此插件时，也必须锁定宽度，可能是nw底层问题）
	win.y = Math.round( yy );
	win.width = data['org_width'];
	win.height = data['org_height'];
	
	// > 结束移动
	data['time'] += 1;
	if( data['time'] > data['tarTime'] ){
		data['type'] = "";
	}
}


