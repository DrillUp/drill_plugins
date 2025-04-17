//=============================================================================
// Drill_LayerUnidirectionalCliffArea.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        图块 - 单向斜坡区域
 * @author Drill_up
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_LayerUnidirectionalCliffArea +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以画图块R区域，实现 单向斜坡 效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、玩家。
 * 2.更多详细的介绍，去看看 "26.图块 > 关于单向斜坡区域.docx"。
 * 3.插件需要将指定 地形标志 或 图块R区域 设为单向斜坡，
 *   去看看 "26.图块 > 关于插件与图块R占用说明.xlsx"
 * 细节：
 *   (1.斜坡区域的设置可以看小键盘的 1234 6789 方向。
 *      28/22/24/26，对应 上/下/左/右。
 *      27/29/21/23，对应 左上/右上/左下/右下。
 * 设计：
 *   (1.你可以设计一些斜坡，让玩家只能单向走动。
 *      并且设计一些阻碍，确保在玩家获得跳跃能力前，无法通过这些斜坡。
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
 * 时间复杂度： o(n^3)*o(图块特征获取) 每帧
 * 测试方法1：  去特效管理层，没有事件踩在斜坡上，测试。
 * 测试结果1：  200个事件的地图中，消耗为：【17.44ms】
 *              100个事件的地图中，消耗为：【13.32ms】
 *               50个事件的地图中，消耗为：【11.50ms】
 * 测试方法2：  去特效管理层放置10个事件在斜坡移动测试。
 * 测试结果2：  200个事件的地图中，消耗为：【21.41ms】
 *              100个事件的地图中，消耗为：【13.43ms】
 *               50个事件的地图中，消耗为：【9.50ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单向斜坡不管有没有事件踩在上面，消耗基本都一样。
 * 3.插件在进入地图时将图块特征数据全部记录，所以只在获取数据时
 *   产生消耗，获取的次数与事件数量有关。总体消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 兼容了碰撞体位置叠加的功能。
 * 
 *
 * @param 单向斜坡高度
 * @type number
 * @min 0
 * @desc 物体走在单向斜坡上面时的高度值，单位像素。
 * @default 8
 * 
 * @param 斜坡区域-正上坡
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，地图中设置的R区域将变为单向斜坡，正上坡 能往上单向走，但是不能从坡外反向往下走。
 * @default ["28"]
 * 
 * @param 斜坡区域-正下坡
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，地图中设置的R区域将变为单向斜坡，正下坡 能往下单向走，但是不能从坡外反向往上走。
 * @default ["22"]
 * 
 * @param 斜坡区域-正左坡
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，地图中设置的R区域将变为单向斜坡，正左坡 能往左单向走，但是不能从坡外反向往右走。
 * @default ["24"]
 * 
 * @param 斜坡区域-正右坡
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，地图中设置的R区域将变为单向斜坡，正右坡 能往右单向走，但是不能从坡外反向往左走。
 * @default ["26"]
 * 
 * @param 斜坡区域-左上坡
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，左上坡 能往上单向走或左单向走，但是不能从 坡外反向往下走 或 坡外反向往右走。
 * @default ["27"]
 * 
 * @param 斜坡区域-右上坡
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，右上坡 能往上单向走或右单向走，但是不能从 坡外反向往下走 或 坡外反向往左走。
 * @default ["29"]
 * 
 * @param 斜坡区域-左下坡
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，左下坡 能往下单向走或左单向走，但是不能从 坡外反向往上走 或 坡外反向往右走。
 * @default ["21"]
 * 
 * @param 斜坡区域-右下坡
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入R区域的ID，右下坡 能往下单向走或右单向走，但是不能从 坡外反向往上走 或 坡外反向往左走。
 * @default ["23"]
 * 
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LUCA（Layer_Unidirectional_Cliff_Area）
//		临时全局变量	DrillUp.g_LUCA_xxx
//		临时局部变量	this._drill_LUCA_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(图块特征获取) 每帧
//		★性能测试因素	特效管理层
//		★性能测试消耗	9.5ms（drill_LUCA_updateUCliffHeight）11.5ms（没事件踩在斜坡上，drill_LUCA_getUCliffHeight）
//		★最坏情况		事件越多，情况越坏。
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			
//			->☆单向斜坡图块矩阵
//				->全图是否有单向斜坡（开放函数）
//				->是否为单向斜坡区域（开放函数）
//				->是否为正上坡（开放函数）
//				->是否为正下坡（开放函数）
//				->是否为正左坡（开放函数）
//				->是否为正右坡（开放函数）
//				->是否为左上坡（开放函数）
//				->是否为右上坡（开放函数）
//				->是否为左下坡（开放函数）
//				->是否为右下坡（开放函数）
//			->☆斜坡值
//				> 第1位 斜坡类型
//			->☆DEBUG单向斜坡值
//				->显示/隐藏单向斜坡值
//				->开启/关闭斜坡边缘修正
//				->开启/关闭斜坡阻塞
//			->稀疏矩阵【Drill_LUCA_SparseMatrix】
//			
//			->☆行走图高度
//				->高度值
//				->获取指定位置的高度
//					->整数边角点
//					->斜坡边缘修正
//						->正左坡
//						->正右坡
//					->已知三点平面求平面上第四点（求Z）
//				->条件
//					->没有斜坡区域，跳出
//					->飞行物体，跳出
//			->☆数据最终变换值
//
//			->☆可通行控制
//				->条件
//					->没有斜坡区域，跳出
//					->飞行物体，跳出
//					->斜坡阻塞 DEBUG
//				->单向阻塞
//					> 正上坡
//					> 正下坡
//					> 正左坡
//					> 正右坡
//					> 左上坡
//					> 右上坡
//					> 左下坡
//					> 右下坡
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			26.图块 > 阶梯图块阻塞原理.png
//			26.图块 > 阶梯行走图高度原理.png
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.此插件的常用词为：UCliff。
//			  功能复制时，注意换为 LUCA、斜坡、UCliff 字段。
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
	DrillUp.g_LUCA_PluginTip_curName = "Drill_LayerUnidirectionalCliffArea.js 图块-侧边单向斜坡区域";
	DrillUp.g_LUCA_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LUCA_getPluginTip_NeedUpdate_COEF = function(){
		return "【" + DrillUp.g_LUCA_PluginTip_curName + "】\n行走图优化核心插件版本过低，你需要更新 核心插件 至少v1.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_LayerUnidirectionalCliffArea = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_LayerUnidirectionalCliffArea');
	
	
	/*-----------------杂项------------------*/	
	DrillUp.g_LUCA_cliffHeight = Number(DrillUp.parameters["单向斜坡高度"] || 18);
	if( DrillUp.parameters["斜坡区域-正上坡"] != undefined &&
		DrillUp.parameters["斜坡区域-正上坡"] != "" ){
		DrillUp.g_LUCA_regionTank_U = JSON.parse( DrillUp.parameters["斜坡区域-正上坡"] || [] );
	}else{
		DrillUp.g_LUCA_regionTank_U = [];
	}
	if( DrillUp.parameters["斜坡区域-正下坡"] != undefined &&
		DrillUp.parameters["斜坡区域-正下坡"] != "" ){
		DrillUp.g_LUCA_regionTank_D = JSON.parse( DrillUp.parameters["斜坡区域-正下坡"] || [] );
	}else{
		DrillUp.g_LUCA_regionTank_D = [];
	}
	if( DrillUp.parameters["斜坡区域-正左坡"] != undefined &&
		DrillUp.parameters["斜坡区域-正左坡"] != "" ){
		DrillUp.g_LUCA_regionTank_L = JSON.parse( DrillUp.parameters["斜坡区域-正左坡"] || [] );
	}else{
		DrillUp.g_LUCA_regionTank_L = [];
	}
	if( DrillUp.parameters["斜坡区域-正右坡"] != undefined &&
		DrillUp.parameters["斜坡区域-正右坡"] != "" ){
		DrillUp.g_LUCA_regionTank_R = JSON.parse( DrillUp.parameters["斜坡区域-正右坡"] || [] );
	}else{
		DrillUp.g_LUCA_regionTank_R = [];
	}
	if( DrillUp.parameters["斜坡区域-左上坡"] != undefined &&
		DrillUp.parameters["斜坡区域-左上坡"] != "" ){
		DrillUp.g_LUCA_regionTank_LU = JSON.parse( DrillUp.parameters["斜坡区域-左上坡"] || [] );
	}else{
		DrillUp.g_LUCA_regionTank_LU = [];
	}
	if( DrillUp.parameters["斜坡区域-右上坡"] != undefined &&
		DrillUp.parameters["斜坡区域-右上坡"] != "" ){
		DrillUp.g_LUCA_regionTank_RU = JSON.parse( DrillUp.parameters["斜坡区域-右上坡"] || [] );
	}else{
		DrillUp.g_LUCA_regionTank_RU = [];
	}
	if( DrillUp.parameters["斜坡区域-左下坡"] != undefined &&
		DrillUp.parameters["斜坡区域-左下坡"] != "" ){
		DrillUp.g_LUCA_regionTank_LD = JSON.parse( DrillUp.parameters["斜坡区域-左下坡"] || [] );
	}else{
		DrillUp.g_LUCA_regionTank_LD = [];
	}
	if( DrillUp.parameters["斜坡区域-右下坡"] != undefined &&
		DrillUp.parameters["斜坡区域-右下坡"] != "" ){
		DrillUp.g_LUCA_regionTank_RD = JSON.parse( DrillUp.parameters["斜坡区域-右下坡"] || [] );
	}else{
		DrillUp.g_LUCA_regionTank_RD = [];
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_LUCA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_LUCA_pluginCommand.call(this, command, args);
	this.drill_LUCA_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_LUCA_pluginCommand = function( command, args ){
	if( command === ">单向斜坡区域" ){
		
		if(args.length == 2){
			var temp1 = String(args[1]);
			if( temp1 == "DEBUG-显示单向斜坡值" ){
				$gameTemp._drill_LUCA_debug_showUCliffId = true;
			}
			if( temp1 == "DEBUG-隐藏单向斜坡值" ){
				$gameTemp._drill_LUCA_debug_clearUCliffId = true;
			}
			if( temp1 == "DEBUG-关闭斜坡边缘修正" ){
				$gameTemp._drill_LUCA_debug_noUCliffFix = true;
			}
			if( temp1 == "DEBUG-开启斜坡边缘修正" ){
				$gameTemp._drill_LUCA_debug_noUCliffFix = false;
			}
			if( temp1 == "DEBUG-关闭斜坡阻塞" ){
				$gameTemp._drill_LUCA_debug_noUCliffBlock = true;
			}
			if( temp1 == "DEBUG-开启斜坡阻塞" ){
				$gameTemp._drill_LUCA_debug_noUCliffBlock = false;
			}
		}
	}
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_LUCA_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LUCA_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LUCA_sys_initialize.call(this);
	this.drill_LUCA_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LUCA_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LUCA_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LUCA_saveEnabled == true ){	
		$gameSystem.drill_LUCA_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LUCA_initSysData();
	}
};
//##############################
// * 存储数据 - 初始化数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，执行数据初始化，并存入存档数据中。
//##############################
Game_System.prototype.drill_LUCA_initSysData = function() {
	this.drill_LUCA_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LUCA_checkSysData = function() {
	this.drill_LUCA_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LUCA_initSysData_Private = function() {
	
	this._drill_LUCA_cliffHeight = DrillUp.g_LUCA_cliffHeight;
};	
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LUCA_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LUCA_cliffHeight == undefined ){
		this.drill_LUCA_initSysData();
	}
	
};
	
	
//=============================================================================
// ** ☆单向斜坡图块矩阵
//
//			说明：	> 此模块用于提供 图块的开放函数 ，外部插件也可以调用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 单向斜坡图块矩阵 - 全图是否有单向斜坡（开放函数）
//==============================
Game_Map.prototype.drill_LUCA_noUCliff = function(){
	return this._drill_LUCA_sparseMatrix.drill_isEmptyMatrix();
}
//==============================
// * 单向斜坡图块矩阵 - 是否为单向斜坡区域（开放函数）
//==============================
Game_Map.prototype.drill_LUCA_isUCliff = function( x, y ){
	if( this.drill_LUCA_getUCliffId( x, y ) == undefined ){
		return false;
	}else{
		return true;
	}
}
//==============================
// * 单向斜坡图块矩阵 - 是否为正上坡（开放函数）
//==============================
Game_Map.prototype.drill_LUCA_isUCliff_U = function( x, y ){
	var value = this.drill_LUCA_getUCliffId( x, y );
	if( value == undefined ){ return false; }
	if( value % 10 == 8 ){ return true; }	//（第1位）
	return false;
}
//==============================
// * 单向斜坡图块矩阵 - 是否为正下坡（开放函数）
//==============================
Game_Map.prototype.drill_LUCA_isUCliff_D = function( x, y ){
	var value = this.drill_LUCA_getUCliffId( x, y );
	if( value == undefined ){ return false; }
	if( value % 10 == 2 ){ return true; }	//（第1位）
	return false;
}
//==============================
// * 单向斜坡图块矩阵 - 是否为正左坡（开放函数）
//==============================
Game_Map.prototype.drill_LUCA_isUCliff_L = function( x, y ){
	var value = this.drill_LUCA_getUCliffId( x, y );
	if( value == undefined ){ return false; }
	if( value % 10 == 4 ){ return true; }	//（第1位）
	return false;
}
//==============================
// * 单向斜坡图块矩阵 - 是否为正右坡（开放函数）
//==============================
Game_Map.prototype.drill_LUCA_isUCliff_R = function( x, y ){
	var value = this.drill_LUCA_getUCliffId( x, y );
	if( value == undefined ){ return false; }
	if( value % 10 == 6 ){ return true; }	//（第1位）
	return false;
}
//==============================
// * 单向斜坡图块矩阵 - 是否为左上坡（开放函数）
//==============================
Game_Map.prototype.drill_LUCA_isUCliff_LU = function( x, y ){
	var value = this.drill_LUCA_getUCliffId( x, y );
	if( value == undefined ){ return false; }
	if( value % 10 == 7 ){ return true; }	//（第1位）
	return false;
}
//==============================
// * 单向斜坡图块矩阵 - 是否为右上坡（开放函数）
//==============================
Game_Map.prototype.drill_LUCA_isUCliff_RU = function( x, y ){
	var value = this.drill_LUCA_getUCliffId( x, y );
	if( value == undefined ){ return false; }
	if( value % 10 == 9 ){ return true; }	//（第1位）
	return false;
}
//==============================
// * 单向斜坡图块矩阵 - 是否为左下坡（开放函数）
//==============================
Game_Map.prototype.drill_LUCA_isUCliff_LD = function( x, y ){
	var value = this.drill_LUCA_getUCliffId( x, y );
	if( value == undefined ){ return false; }
	if( value % 10 == 1 ){ return true; }	//（第1位）
	return false;
}
//==============================
// * 单向斜坡图块矩阵 - 是否为右下坡（开放函数）
//==============================
Game_Map.prototype.drill_LUCA_isUCliff_RD = function( x, y ){
	var value = this.drill_LUCA_getUCliffId( x, y );
	if( value == undefined ){ return false; }
	if( value % 10 == 3 ){ return true; }	//（第1位）
	return false;
}
	
	
//=============================================================================
// ** ☆斜坡值
//
//			说明：	> 此模块用于对所有单向斜坡图块进行初始赋值（通过数字位代号，省存储空间）。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 斜坡值 - 初始化绑定
//==============================
var _drill_LUCA_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LUCA_map_setup.call( this, mapId );
	this.drill_LUCA_refreshUCliffId();
}
//==============================
// * 斜坡值 - 初始化
//
//			说明：	> 直接给所有图块赋值，获取到值后立刻能知道单向斜坡的特殊属性。
//					  null为非单向斜坡区域，非null为单向斜坡区域。
//					  图块赋值：	00000000 值
//									98654321 位
//					  第1位 斜坡类型 - 8/2/4/6 上/下/左/右，7/9/1/3 左上/右上/左下/右下
//==============================
Game_Map.prototype.drill_LUCA_refreshUCliffId = function(){
	
	// > 创建矩阵
	this._drill_LUCA_sparseMatrix = new Drill_LUCA_SparseMatrix();
	
	// > 图块错误，不赋值
	if( this.tileset() == undefined ){ return; }
	
	
	// > 全图块遍历（先y后x，x从左往右遍历）
	for( var x=0; x < this.width(); x++ ){
		for( var y=0; y < this.height(); y++ ){
			
			// > 已赋值的单向斜坡区域，跳过
			if( this.drill_LUCA_isUCliff( x, y ) ){ continue; }
			
			// > 找到 单向斜坡R图块
			var cur_regionId = this.regionId( x, y );
			
			// > 第1位 斜坡类型
			if( DrillUp.g_LUCA_regionTank_U.contains( String(cur_regionId) ) ){
				this._drill_LUCA_sparseMatrix.drill_setValue( x, y, 8 );
			}
			if( DrillUp.g_LUCA_regionTank_D.contains( String(cur_regionId) ) ){
				this._drill_LUCA_sparseMatrix.drill_setValue( x, y, 2 );
			}
			if( DrillUp.g_LUCA_regionTank_L.contains( String(cur_regionId) ) ){
				this._drill_LUCA_sparseMatrix.drill_setValue( x, y, 4 );
			}
			if( DrillUp.g_LUCA_regionTank_R.contains( String(cur_regionId) ) ){
				this._drill_LUCA_sparseMatrix.drill_setValue( x, y, 6 );
			}
			if( DrillUp.g_LUCA_regionTank_LU.contains( String(cur_regionId) ) ){
				this._drill_LUCA_sparseMatrix.drill_setValue( x, y, 7 );
			}
			if( DrillUp.g_LUCA_regionTank_RU.contains( String(cur_regionId) ) ){
				this._drill_LUCA_sparseMatrix.drill_setValue( x, y, 9 );
			}
			if( DrillUp.g_LUCA_regionTank_LD.contains( String(cur_regionId) ) ){
				this._drill_LUCA_sparseMatrix.drill_setValue( x, y, 1 );
			}
			if( DrillUp.g_LUCA_regionTank_RD.contains( String(cur_regionId) ) ){
				this._drill_LUCA_sparseMatrix.drill_setValue( x, y, 3 );
			}
			
		}
	}
}
//==============================
// * 斜坡值 - 获取斜坡值（私有）
//==============================
Game_Map.prototype.drill_LUCA_getUCliffId = function( x, y ){
	return this._drill_LUCA_sparseMatrix.drill_getValue( x, y );
}

	
//=============================================================================
// ** ☆DEBUG单向斜坡值
//
//			说明：	> 此模块用于DEBUG显示图块以及单向斜坡值。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG - 帧刷新绑定
//==============================
var _drill_LUCA_debug_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_LUCA_debug_update.call(this);
	this.drill_LUCA_updateDebugCreateSprite();
	this.drill_LUCA_updateDebugSprite();
}
//==============================
// * DEBUG - 帧刷新
//==============================
Scene_Map.prototype.drill_LUCA_updateDebugCreateSprite = function() {
	
	// > DEBUG显示 单向斜坡值
	if( $gameTemp._drill_LUCA_debug_showUCliffId == true ){
		$gameTemp._drill_LUCA_debug_showUCliffId = false;
		
		// > 清除旧贴图
		this.removeChild( $gameTemp._drill_LUCA_debug_sprite );
		$gameTemp._drill_LUCA_debug_sprite = null;
		
		var tw = $gameMap.tileWidth();
		var th = $gameMap.tileHeight();
		
		var temp_bitmap = new Bitmap( Graphics.boxWidth +tw*2, Graphics.boxHeight +th*2 );
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = temp_bitmap;
		temp_sprite._drill_curTime = 0;
		
		this.addChild( temp_sprite );
		$gameTemp._drill_LUCA_debug_sprite = temp_sprite;
	}
	// > DEBUG隐藏 单向斜坡值
	if( $gameTemp._drill_LUCA_debug_clearUCliffId == true ){
		$gameTemp._drill_LUCA_debug_clearUCliffId = false;
		this.removeChild( $gameTemp._drill_LUCA_debug_sprite );
		$gameTemp._drill_LUCA_debug_sprite = null;
	}
}
//==============================
// * DEBUG - 帧刷新
//==============================
Scene_Map.prototype.drill_LUCA_updateDebugSprite = function() {
	if( $gameTemp._drill_LUCA_debug_sprite == null ){ return; }
	var temp_sprite = $gameTemp._drill_LUCA_debug_sprite;
	var temp_bitmap = temp_sprite.bitmap;
	var tw = $gameMap.tileWidth();
	var th = $gameMap.tileHeight();
	
	// > 计时器
	temp_sprite._drill_curTime += 1;
	if( temp_sprite._drill_curTime % 2 == 0 ){ return; }	//『Debug减帧』减少绘制次数
	
	// > DEBUG贴图的位置
	var diff_x = Math.floor($gameMap._displayX) - $gameMap._displayX;
	var diff_y = Math.floor($gameMap._displayY) - $gameMap._displayY;
	temp_sprite.x = diff_x *tw;
	temp_sprite.y = diff_y *th;
	
	// > DEBUG画布绘制
	var display_x = Math.floor($gameMap._displayX);
	var display_y = Math.floor($gameMap._displayY);
	temp_bitmap.clear();
	
	var rect_w = Math.ceil( Graphics.boxWidth/tw ) +2;
	var rect_h = Math.ceil( Graphics.boxHeight/th ) +2;
	for( var i=0; i < rect_w; i++ ){
		for( var j=0; j < rect_h; j++ ){
			var xx = display_x + i;
			var yy = display_y + j;
			if( $gameMap.drill_LUCA_isUCliff( xx, yy ) ){
				
				// > DEBUG图块绘制
				temp_bitmap.fillRect( i*tw, j*th, tw, th, "#ffffff" );	//边框
				temp_bitmap.clearRect( i*tw +2, j*th +2, tw -4, th -4 );
				temp_bitmap.paintOpacity = 100;							//背景颜色
				temp_bitmap.fillRect( i*tw, j*th, tw, th, "#00ffff" );
				
				temp_bitmap.paintOpacity = 255;							//单向斜坡值
				temp_bitmap.drawText(
					String( $gameMap.drill_LUCA_getUCliffId( xx, yy ) ),
					i*tw, j*th + (xx%2) *th*0.5,
					tw, th*0.5, "center"
				);
			}
		}
	}
}

//=============================================================================
// ** 稀疏矩阵【Drill_LUCA_SparseMatrix】
// **		
// **		作用域：	地图界面
// **		主功能：	定义一个稀疏矩阵的数据类。
// **		子功能：	
// **					->稀疏矩阵
// **						->设置值（开放函数）
// **						->获取值（开放函数）
// **						->删除值（开放函数）
// **						->矩阵是否为空（开放函数）
// **		
// **		说明：	> 该类可存储在 $gameMap 中。
// **				> 此矩阵适用于 存在大量零值null值 的情况。
//=============================================================================
//==============================
// * 稀疏矩阵 - 定义
//==============================
function Drill_LUCA_SparseMatrix(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 稀疏矩阵 - 初始化
//==============================
Drill_LUCA_SparseMatrix.prototype.initialize = function(){
	this._drill_matrix = [];
};
//==============================
// * 稀疏矩阵 - 设置值（开放函数）
//==============================
Drill_LUCA_SparseMatrix.prototype.drill_setValue = function( x, y, value ){
	
	// > 非空情况
	if( value != undefined ){
		if( this._drill_matrix[x] == undefined ){
			this._drill_matrix[x] = [];
		}
		this._drill_matrix[x][y] = value;
		
	// > 空情况（删除）
	}else{
		
		// > 空数组，不操作
		if( this._drill_matrix[x] == undefined ){ return; }
		
		// > 具体值，置空
		this._drill_matrix[x][y] = value;
		
		// > 判断数组是否已经全空
		if( this.drill_isEmptyArray( this._drill_matrix[x] ) == true ){
			this._drill_matrix[x] = null;
		}
	}
};
//==============================
// * 稀疏矩阵 - 获取值（开放函数）
//==============================
Drill_LUCA_SparseMatrix.prototype.drill_getValue = function( x, y ){
	if( this._drill_matrix[x] == undefined ){ return null; }
	return this._drill_matrix[x][y];
};
//==============================
// * 稀疏矩阵 - 删除值（开放函数）
//==============================
Drill_LUCA_SparseMatrix.prototype.drill_removeValue = function( x, y, value ){
	this.drill_setValue( x, y, null );
};
//==============================
// * 稀疏矩阵 - 矩阵是否为空（开放函数）
//==============================
Drill_LUCA_SparseMatrix.prototype.drill_isEmptyMatrix = function(){
	
	// > 长度为零，必然空
	if( this._drill_matrix.length == 0 ){ return true; }
	
	// > 找到非空对象
	for( var i = this._drill_matrix.length-1; i >= 0; i-- ){	//（倒序遍历，更早跳出循环）
		if( this._drill_matrix[i] == null ){ continue; }
		return false;
	}
	return true;
};
//==============================
// * 稀疏矩阵 - 数组是否为空（私有）
//==============================
Drill_LUCA_SparseMatrix.prototype.drill_isEmptyArray = function( arr ){
	for( var i = arr.length-1; i >= 0; i-- ){	//（倒序遍历，更早跳出循环）
		if( arr[i] == null ){ continue; }
		return false;
	}
	return true;
};
	
	
	
//=============================================================================
// ** ☆行走图高度
//
//			说明：	> 此模块专门控制物体在图块上的高度。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图高度 - 初始化
//==============================
var _drill_LUCA_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function(){
	_drill_LUCA_initialize.call(this);
	this._drill_LUCA_height = 0;					//高度值
}
//==============================
// * 行走图高度 - 获取
//
//			说明：	> 高度值是正数。
//==============================
Game_CharacterBase.prototype.drill_LUCA_getHeight = function(){
	return this._drill_LUCA_height;
}
//==============================
// * 行走图高度 - 是否在斜坡区域（开放函数）
//==============================
Game_CharacterBase.prototype.drill_LUCA_isOnUCliffFloor = function(){
	return $gameMap.drill_LUCA_isUCliff( this._x, this._y );
}

//==============================
// * 行走图高度 - 帧刷新绑定
//==============================
var _drill_LUCA_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_LUCA_update.call( this );
	this.drill_LUCA_updateUCliffHeight();			//帧刷新 - 斜坡高度计算
}
//==============================
// * 行走图高度 - 帧刷新
//
//			说明：	> 此处直接根据玩家的 所在位置（图块单位）算出斜坡高度。
//==============================
Game_CharacterBase.prototype.drill_LUCA_updateUCliffHeight = function(){
	
	// > 高度清零
	this._drill_LUCA_height = 0;
	
	// > 条件 - 没有斜坡区域，跳出
	if( $gameMap.drill_LUCA_noUCliff() == true ){ return; }
	
	// > 条件 - 飞行物体，跳出
	if( this._priorityType > 1 ){ return; }
	
	
	// > 高度赋值
	this._drill_LUCA_height = $gameMap.drill_LUCA_getUCliffHeight( this._realX, this._realY );
}
//==============================
// * 行走图高度 - 获取指定位置的高度
//			
//			参数：	> realX 小数
//					> realY 小数
//			返回：	数字
//
//			说明：	> 地图上的任意小数位置都能得到高度值，相当于在3D的地图中获取坐标的高度值。
//==============================
Game_Map.prototype.drill_LUCA_getUCliffHeight = function( realX, realY ){
	
	// > 整数边角点 - 初始化
	//		p1 - p2
	//		|     |
	//		p3 - p4
	var x1 = Math.floor( realX );
	var y1 = Math.floor( realY );
	var x2 = Math.floor( realX ) +1;
	var y2 = Math.floor( realY );
	var x3 = Math.floor( realX );
	var y3 = Math.floor( realY ) +1;
	var x4 = Math.floor( realX ) +1;
	var y4 = Math.floor( realY ) +1;
	
	// > 整数边角点 - 高度计算（单位像素）
	var th = this.tileHeight();
	var z1 = 0;
	var z2 = 0;
	var z3 = 0;
	var z4 = 0;
	if( this.drill_LUCA_isUCliff( x1, y1 ) ){
		z1 = $gameSystem._drill_LUCA_cliffHeight;
	}
	if( this.drill_LUCA_isUCliff( x2, y2 ) ){
		z2 = $gameSystem._drill_LUCA_cliffHeight;
	}
	if( this.drill_LUCA_isUCliff( x3, y3 ) ){
		z3 = $gameSystem._drill_LUCA_cliffHeight;
	}
	if( this.drill_LUCA_isUCliff( x4, y4 ) ){
		z4 = $gameSystem._drill_LUCA_cliffHeight;
	}
	// > 高度相同，则返回高度
	if( z1 == z2 && z2 == z3 && z3 == z4 ){ return z1; }
	
	
	// > 斜坡边缘修正
	if( $gameTemp._drill_LUCA_debug_noUCliffFix == undefined ||
		$gameTemp._drill_LUCA_debug_noUCliffFix == false ){
		
		// > 斜坡边缘修正 - 正左坡
		//		p1 - p5 - p2
		//		|          |
		//		p3 - p6 - p4
		//	方格 p1-p3-p6-p5 为水平面，方格 p5-p6-p4-p2 为陡峭斜坡，▂▂▂▇▅▂
		if( this.drill_LUCA_isUCliff_L( x2, y2 ) == true ||
			this.drill_LUCA_isUCliff_L( x4, y4 ) == true ||
			this.drill_LUCA_isUCliff_LU( x4, y4 ) == true ||
			this.drill_LUCA_isUCliff_LU( x4, y4 ) == true ||
			this.drill_LUCA_isUCliff_LD( x4, y4 ) == true ||
			this.drill_LUCA_isUCliff_LD( x4, y4 ) == true ){
			if( this.drill_LUCA_isUCliff( x1, y1 ) == false &&
				this.drill_LUCA_isUCliff( x3, y3 ) == false ){
				var x5 = Math.floor( realX ) + 0.5;
				var y5 = Math.floor( realY );
				var z5 = z1;
				var x6 = Math.floor( realX ) + 0.5;
				var y6 = Math.floor( realY ) + 1;
				var z6 = z3;
				
				var diff_x = realX - Math.floor( realX );
				var diff_y = realY - Math.floor( realY );
				if( diff_x < 0.5 ){
					// > p1-p5-p3 和 p5-p3-p6 三角划分（◸◿）
					if( diff_x*2 + diff_y <= 1 ){
						return this.drill_LUCA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x5,y5,z5, x3,y3,z3, realX, realY );
					}else{
						return this.drill_LUCA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x3,y3,z3, x6,y6,z6, realX, realY );
					}
				}else{
					// > p5-p2-p6 和 p2-p6-p4 三角划分（◸◿）
					diff_x -= 0.5;
					if( diff_x*2 + diff_y <= 1 ){
						return this.drill_LUCA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x2,y2,z2, x6,y6,z6, realX, realY );
					}else{
						return this.drill_LUCA_Math3D_getPointOnPlane_FindZ( x2,y2,z2, x6,y6,z6, x4,y4,z4, realX, realY );
					}
				}
			}
		}
		
		// > 斜坡边缘修正 - 正右坡
		//		p1 - p5 - p2
		//		|          |
		//		p3 - p6 - p4
		//	方格 p1-p3-p6-p5 为水平面，方格 p5-p6-p4-p2 为陡峭斜坡，▂▅▇▂▂▂
		if( this.drill_LUCA_isUCliff_R( x1, y1 ) == true ||
			this.drill_LUCA_isUCliff_R( x3, y3 ) == true ||
			this.drill_LUCA_isUCliff_RU( x1, y1 ) == true ||
			this.drill_LUCA_isUCliff_RU( x3, y3 ) == true ||
			this.drill_LUCA_isUCliff_RD( x1, y1 ) == true ||
			this.drill_LUCA_isUCliff_RD( x3, y3 ) == true ){
			if( this.drill_LUCA_isUCliff( x2, y2 ) == false &&
				this.drill_LUCA_isUCliff( x4, y4 ) == false ){
				var x5 = Math.floor( realX ) + 0.5;
				var y5 = Math.floor( realY );
				var z5 = z2;
				var x6 = Math.floor( realX ) + 0.5;
				var y6 = Math.floor( realY ) + 1;
				var z6 = z4;
				
				var diff_x = realX - Math.floor( realX );
				var diff_y = realY - Math.floor( realY );
				if( diff_x < 0.5 ){
					// > p1-p5-p3 和 p5-p3-p6 三角划分（◸◿）
					if( diff_x*2 + diff_y <= 1 ){
						return this.drill_LUCA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x5,y5,z5, x3,y3,z3, realX, realY );
					}else{
						return this.drill_LUCA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x3,y3,z3, x6,y6,z6, realX, realY );
					}
				}else{
					// > p5-p2-p6 和 p2-p6-p4 三角划分（◸◿）
					diff_x -= 0.5;
					if( diff_x*2 + diff_y <= 1 ){
						return this.drill_LUCA_Math3D_getPointOnPlane_FindZ( x5,y5,z5, x2,y2,z2, x6,y6,z6, realX, realY );
					}else{
						return this.drill_LUCA_Math3D_getPointOnPlane_FindZ( x2,y2,z2, x6,y6,z6, x4,y4,z4, realX, realY );
					}
				}
			}
		}
		
		//（正上坡和正下坡高度变化看起来不明显，没必要浪费性能了）
		
	}
	
	
	// > 普通图块 - p1-p2-p3 和 p2-p3-p4 三角划分（◸◿）
	var diff_x = realX - Math.floor( realX );
	var diff_y = realY - Math.floor( realY );
	if( diff_x + diff_y <= 1 ){
		return this.drill_LUCA_Math3D_getPointOnPlane_FindZ( x1,y1,z1, x2,y2,z2, x3,y3,z3, realX, realY );
	}else{
		return this.drill_LUCA_Math3D_getPointOnPlane_FindZ( x2,y2,z2, x3,y3,z3, x4,y4,z4, realX, realY );
	}
}

//==============================
// * 数学工具 - 判断三点是否共线
//			
//			参数：	> x1,y1,z1 数字（第1个点）
//					> x2,y2,z2 数字（第2个点）
//					> x3,y3,z3 数字（第3个点）
//			返回：	> 布尔
//==============================
Game_Map.prototype.drill_LUCA_Math3D_isTherePointInOneLine = function( x1,y1,z1, x2,y2,z2, x3,y3,z3 ){
	var x_diff1 = x1-x2;
	var x_diff2 = x2-x3;
	var y_diff1 = y1-y2;
	var y_diff2 = y2-y3;
	var z_diff1 = z1-z2;
	var z_diff2 = z2-z3;
	if( x_diff1*y_diff2 == y_diff1*x_diff2 && z_diff1*y_diff2 == y_diff1*z_diff2 ){
		return true;
	}else{
		return false;
	}
}
//==============================
// * 数学工具 - 已知三点平面求平面上第四点（求Z）
//			
//			参数：	> x1,y1,z1 数字（第1个点）
//					> x2,y2,z2 数字（第2个点）
//					> x3,y3,z3 数字（第3个点）
//					> x,y 数字     （第4个点的x,y）
//			返回：	> 数字         （结果值）
//			
//			说明：	> 如果给的三点 共线 或者 垂直于z轴，都会返回0。
//==============================
Game_Map.prototype.drill_LUCA_Math3D_getPointOnPlane_FindZ = function( x1,y1,z1, x2,y2,z2, x3,y3,z3, x,y ){
	
	// > 判断三点是否共线
	if( this.drill_LUCA_Math3D_isTherePointInOneLine( x1,y1,z1, x2,y2,z2, x3,y3,z3 ) == true ){ return 0; }
	
	// > 平面方程 ax + by + cz + d = 0
	//	（若a=0，则平面平行于x轴；若b=0，则平面平行于y轴；若c=0，则平面平行于z轴）
	var a = y1*(z2 - z3) + y2*(z3 - z1) + y3*(z1 - z2);
	var b = z1*(x2 - x3) + z2*(x3 - x1) + z3*(x1 - x2);
	var c = x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2);
	var d = -1*x1*(y2*z3 - y3*z2) - x2*(y3*z1 - y1*z3) - x3*(y1*z2 - y2*z1);
	//alert( a+"*x"+" + "+b+"*y"+" + "+c+"*z"+" + "+d+" = 0" );
	
	if( c == 0 ){ return 0; }
    var z = (0 - a*x - b*y - d) / c;
	return z;
}


//=============================================================================
// ** ☆数据最终变换值『物体数据最终变换值』
//
//			说明：	> 此模块专门控制 偏移与其他插件兼容 的设置。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
if( Imported.Drill_CoreOfEventFrame ){
	
	// > 强制更新提示
	if( Game_CharacterBase.prototype.drill_COEF_acc_LRR_x == undefined ){
		alert( DrillUp.drill_LUCA_getPluginTip_NeedUpdate_COEF() );
	}
	
	//==============================
	// * 数据最终变换值 - 累积位置X（不影响）
	//==============================
	//var _drill_LUCA_COEF_finalTransform_x = Game_CharacterBase.prototype.drill_COEF_acc_x;
	//Game_CharacterBase.prototype.drill_COEF_acc_x = function(){
	//	var xx = _drill_LUCA_COEF_finalTransform_x.call( this );
	//	return xx;
	//}
	//==============================
	// * 数据最终变换值 - 累积位置Y
	//==============================
	var _drill_LUCA_COEF_finalTransform_y = Game_CharacterBase.prototype.drill_COEF_acc_y;
	Game_CharacterBase.prototype.drill_COEF_acc_y = function(){
		var yy = _drill_LUCA_COEF_finalTransform_y.call( this );
		return yy - this.drill_LUCA_getHeight();
	}
	//==============================
	// * 数据最终变换值 - 累积位置X - 倒影镜像用（不影响）
	//==============================
	//var _drill_LUCA_COEF_final_LRR_x = Game_CharacterBase.prototype.drill_COEF_acc_LRR_x;
	//Game_CharacterBase.prototype.drill_COEF_acc_LRR_x = function(){
	//	var xx = _drill_LUCA_COEF_final_LRR_x.call( this );
	//	return xx;
	//}
	//==============================
	// * 数据最终变换值 - 累积位置Y - 倒影镜像用
	//==============================
	var _drill_LUCA_COEF_final_LRR_y = Game_CharacterBase.prototype.drill_COEF_acc_LRR_y;
	Game_CharacterBase.prototype.drill_COEF_acc_LRR_y = function(){
		var yy = _drill_LUCA_COEF_final_LRR_y.call( this );
		return yy + this.drill_LUCA_getHeight();
	}
	//==============================
	// * 数据最终变换值 - 累积位置X - 同步镜像用（不影响）
	//==============================
	//var _drill_LUCA_COEF_acc_LSR_x = Game_CharacterBase.prototype.drill_COEF_acc_LSR_x;
	//Game_CharacterBase.prototype.drill_COEF_acc_LSR_x = function(){
	//	var xx = _drill_LUCA_COEF_acc_LSR_x.call( this );
	//	return xx;
	//}
	//==============================
	// * 数据最终变换值 - 累积位置Y - 同步镜像用
	//==============================
	var _drill_LUCA_COEF_acc_LSR_y = Game_CharacterBase.prototype.drill_COEF_acc_LSR_y;
	Game_CharacterBase.prototype.drill_COEF_acc_LSR_y = function(){
		var yy = _drill_LUCA_COEF_acc_LSR_y.call( this );
		return yy + this.drill_LUCA_getHeight();
	}
	
}else{
	//==============================
	// * 数据最终变换值 - 相对镜头所在位置X（不影响）
	//
	//			说明：	> 如果没加 行走图优化核心，就继承screenX。
	//==============================
	//var _drill_LUCA_screenX = Game_CharacterBase.prototype.screenX;
	//Game_CharacterBase.prototype.screenX = function(){
	//	var xx = _drill_LUCA_screenX.call( this );
	//	return xx;
	//}
	//==============================
	// * 数据最终变换值 - 相对镜头所在位置Y
	//
	//			说明：	> 如果没加 行走图优化核心，就继承screenY。
	//==============================
	var _drill_LUCA_screenY = Game_CharacterBase.prototype.screenY;
	Game_CharacterBase.prototype.screenY = function(){
		var yy = _drill_LUCA_screenY.call( this );
		return yy - this.drill_LUCA_getHeight();
	}
}



//=============================================================================
// ** ☆可通行控制
//
//			说明：	> 此模块专门控制物体在图块的阻塞情况。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 可通行控制 - 通行绑定
//==============================
var _drill_LUCA_canPass = Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function( x, y, d ){
	var can_pass = _drill_LUCA_canPass.call( this, x, y, d );
	if( can_pass == false ){ return can_pass; }
	
	// > 在可通行时，才添加阻塞
	var result = this.drill_LUCA_canPass( x, y, d );
	if( result == null ){ return can_pass; }
	return result;
}
//==============================
// * 可通行控制 - 通行 - 添加阻塞
//
//			说明：	> 只添加阻塞，返回false；如果不影响 通行，返回null值。
//==============================
Game_CharacterBase.prototype.drill_LUCA_canPass = function( x, y, d ){
	
	// > 条件 - 没有斜坡区域，跳出
	if( $gameMap.drill_LUCA_noUCliff() == true ){ return null; }
	
	// > 条件 - 飞行物体，跳出
	if( this._priorityType > 1 ){ return null; }
	
	// > 条件 - 斜坡阻塞 DEBUG
	if( $gameTemp._drill_LUCA_debug_noUCliffBlock == true ){ return null; }
	
	var x2 = $gameMap.roundXWithDirection(x, d);
	var y2 = $gameMap.roundYWithDirection(y, d);
	
	
	// > 正上坡 单向阻塞
	if( d == 2 ){
		if( $gameMap.drill_LUCA_isUCliff_U(x2,y2) == true ){
			return false;
		}
	}
	// > 正下坡 单向阻塞
	if( d == 8 ){
		if( $gameMap.drill_LUCA_isUCliff_D(x2,y2) == true ){
			return false;
		}
	}
	// > 正左坡 单向阻塞
	if( d == 6 ){
		if( $gameMap.drill_LUCA_isUCliff_L(x2,y2) == true ){
			return false;
		}
	}
	// > 正右坡 单向阻塞
	if( d == 4 ){
		if( $gameMap.drill_LUCA_isUCliff_R(x2,y2) == true ){
			return false;
		}
	}
	// > 左上坡 单向阻塞
	if( d == 2 || d == 6 ){
		if( $gameMap.drill_LUCA_isUCliff_LU(x2,y2) == true ){
			return false;
		}
	}
	// > 右上坡 单向阻塞
	if( d == 2 || d == 4 ){
		if( $gameMap.drill_LUCA_isUCliff_RU(x2,y2) == true ){
			return false;
		}
	}
	// > 左下坡 单向阻塞
	if( d == 8 || d == 6 ){
		if( $gameMap.drill_LUCA_isUCliff_LD(x2,y2) == true ){
			return false;
		}
	}
	// > 右下坡 单向阻塞
	if( d == 8 || d == 4 ){
		if( $gameMap.drill_LUCA_isUCliff_RD(x2,y2) == true ){
			return false;
		}
	}
	
	return null;
}


