//=============================================================================
// Drill_X_LayerColorFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        地图 - 全图纯色滤镜[扩展]
 * @author Drill_up
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_X_LayerColorFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以给整个地图界面的图像加滤色镜，甚至可以影响ui、对话框、以及任何图像。
 * ★★尽量放在所有 地图UI类 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于整个地图界面，包括地图ui。
 * 2.由于其图片层级的特殊性，尽量放在越后面越好，
 *   确保所有相关插件的图像都被滤色。
 * 滤镜：
 *   (1.该插件与纯色滤镜的功能一模一样。
 *      但不属于滤镜核心。
 *   (2.光的三原色是：红、绿、蓝。 
 *      黄=红+绿。紫=红+蓝。青=蓝+绿。白=红+绿+蓝。
 *   (3.设置滤色镜后，比如纯蓝色，地图界面将只剩下的蓝色光线。
 *      不要用纯白色，因为什么光线都过滤不了。
 *      你需要适当调整透明度，对周围环境滤镜颜色进行微调。
 *   (4.滤色不要太深，你可以过滤成纯红色，但是那样太阴暗恐怖，而且伤眼睛。
 *   (5.使用纯黄色滤镜时，你会发现明明只有红色和绿色的光线，你却能看出蓝
 *      色的感觉。这属于色彩错觉，有兴趣可以上网搜搜。
 *   (6.滤色的原理与 战斗管理层的"变换空间" 中战斗背景变绿变红一样。
 *      你也可以使用图片事件手动加滤色镜效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令添加滤镜：
 *
 * 插件指令：>全图纯色滤镜 : 颜色 : 纯黑
 * 插件指令：>全图纯色滤镜 : 颜色 : 纯红
 * 插件指令：>全图纯色滤镜 : 颜色 : 纯蓝
 * 插件指令：>全图纯色滤镜 : 颜色 : 纯绿
 * 插件指令：>全图纯色滤镜 : 颜色 : 黄色
 * 插件指令：>全图纯色滤镜 : 颜色 : 紫色
 * 插件指令：>全图纯色滤镜 : 颜色 : 青色
 * 插件指令：>全图纯色滤镜 : 透明度 : 255 : 60
 *
 * 1.透明度前者为目标透明度，后者为变化时长，单位帧。
 *   设置透明度255，滤镜将过滤最大化。
 *   设置透明度0，则滤镜相当于关闭。
 * 2.切换滤镜颜色是瞬间的，你需要先设置滤镜透明度0，再换颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你还可以直接指定滤镜的颜色代码：
 *
 * 插件指令：>全图纯色滤镜 : 颜色 : #000000
 *
 * 1.由于是滤色镜，如果游戏界面的颜色不鲜明，则滤镜效果不明显。
 *   所以一般不需要特别复杂颜色的滤色镜。
 * 2.白色滤镜没有任何效果。
 * 3.如果你想配置更完美的颜色，推荐去这个网址找到你想要的颜色代码：
 *   http://tool.oschina.net/commons?type=3
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   在不同管理层添加滤色镜。
 * 测试结果：   200个事件的地图中，平均消耗为：【43.44ms】
 *              100个事件的地图中，平均消耗为：【32.33ms】
 *               50个事件的地图中，平均消耗为：【21.14ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的【20ms】范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件性能说明。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XLCF（X_Layer_Color_Filter）
//		临时全局变量	DrillUp.g_XLCF_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_XLCF_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	地图管理层
//		★性能测试消耗	103.45ms
//		★最坏情况		和滤镜一样，开启就是最坏情况。
//		★备注			这个消耗无法辩驳是真实还是虚假的。
//						因为我不相信只贴一个sprite就会消耗那么高。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			全图纯色滤镜：
//				->图片修改透明度
//
//		★必要注意事项：
//			无
//
//		★其它说明细节：
//			1.只是贴了一张纯色图，然后控制透明度了而已。
//			  最顶层放置了一个私有层级。
//				
//		★存在的问题：
//			无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_LayerColorFilter = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_X_LayerColorFilter');
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_XLCF_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_XLCF_pluginCommand.call(this, command, args);
	if (command === '>全图纯色滤镜' || command === '>全图滤色镜') { // >全图纯色滤镜 : 透明度 : 255
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "颜色" ){	
				if( temp1 == "纯黑" ){
					$gameSystem._drill_XLCF_color = "#000000";
				}else if( temp1 == "纯红" ){
					$gameSystem._drill_XLCF_color = "#ff0000";
				}else if( temp1 == "纯蓝" ){
					$gameSystem._drill_XLCF_color = "#0000ff";
				}else if( temp1 == "纯绿" ){
					$gameSystem._drill_XLCF_color = "#00ff00";
				}else if( temp1 == "黄色" ){
					$gameSystem._drill_XLCF_color = "#ffff00";
				}else if( temp1 == "紫色" ){
					$gameSystem._drill_XLCF_color = "#ff00ff";
				}else if( temp1 == "青色" ){
					$gameSystem._drill_XLCF_color = "#00ffff";
				}else{
					$gameSystem._drill_XLCF_color = temp1;
				}
			}
		}
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = Number(args[3]);
			var temp2 = Number(args[5]);
			if( type == "透明度" ){
				var o = $gameSystem._drill_XLCF_opacity;
				o.tar = temp1;
				o.move = 0;
				o.time = temp2;
				o.speed = (o.tar - o.cur)/o.time;
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_XLCF_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_XLCF_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_XLCF_sys_initialize.call(this);
	this.drill_XLCF_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_XLCF_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_XLCF_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_XLCF_saveEnabled == true ){	
		$gameSystem.drill_XLCF_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_XLCF_initSysData();
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
Game_System.prototype.drill_XLCF_initSysData = function() {
	this.drill_XLCF_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_XLCF_checkSysData = function() {
	this.drill_XLCF_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_XLCF_initSysData_Private = function() {
	
	this._drill_XLCF_color = "#ffffff";
	this._drill_XLCF_opacity = {};
	this._drill_XLCF_opacity.cur = 0;
	this._drill_XLCF_opacity.tar = 0;
	this._drill_XLCF_opacity.speed = 0;
	this._drill_XLCF_opacity.move = 0;
	this._drill_XLCF_opacity.time = 0;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_XLCF_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_XLCF_opacity == undefined ){
		this.drill_XLCF_initSysData();
	}
	
};


//=============================================================================
// ** 场景
//=============================================================================
//==============================
// * 帧刷新
//==============================
var _drill_XLCF_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_XLCF_update.call(this);
	this.drill_XLCF_init();
	this.drill_XLCF_change();
};
//==============================
// * 初始化
//==============================
Scene_Map.prototype.drill_XLCF_init = function() {
	if( this._drill_XLCF_layer == undefined ){
		this._drill_XLCF_layer = new Sprite();
		
		this._drill_XLCF_bitmap = new Bitmap(Graphics.boxWidth,Graphics.boxHeight);
		this._drill_XLCF_bitmap.fillRect(0, 0, Graphics.boxWidth,Graphics.boxHeight, $gameSystem._drill_XLCF_color);
		this._drill_XLCF_layer.bitmap = this._drill_XLCF_bitmap;
		this._drill_XLCF_layer.blendMode = 2;
		this._drill_XLCF_layer.opacity = $gameSystem._drill_XLCF_opacity.cur;
		this._drill_XLCF_layer.f_color = $gameSystem._drill_XLCF_color;
		
		this.addChild(this._drill_XLCF_layer);
	}
}
//==============================
// * 变色
//==============================
Scene_Map.prototype.drill_XLCF_change = function() {
	var o = $gameSystem._drill_XLCF_opacity;
	o.move +=1;
	if( o.move <= o.time ){
		if( Math.abs(o.cur - o.tar) <= Math.abs(o.speed) ){
			o.cur = o.tar;
		}else{
			o.cur += o.speed;
		}
		this._drill_XLCF_layer.opacity = o.cur;
	}
	if( $gameSystem._drill_XLCF_color != this._drill_XLCF_layer.f_color ){
		this._drill_XLCF_layer.f_color = $gameSystem._drill_XLCF_color;
		this._drill_XLCF_bitmap.fillRect(0, 0, Graphics.boxWidth,Graphics.boxHeight, $gameSystem._drill_XLCF_color);
	}
}
