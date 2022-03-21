//=============================================================================
// Drill_LayerShatterEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        地图 - 方块粉碎效果
 * @author Drill_up
 * 
 * @Drill_LE_param "粉碎背景-%d"
 * @Drill_LE_parentKey "---粉碎背景组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LSE_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_LayerShatterEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得行走图能播放方块状的粉碎效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件不能单独运行，必须要基于核心才能运行：
 * 基于：
 *   - Drill_CoreOfShatterEffect    系统-方块粉碎核心★★v1.3及以上版本★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件行走图。
 * 2.想要更多了解方块粉碎，可以去看看 "1.系统 > 方块粉碎大家族.docx"。
 * 细节:
 *   (1.粉碎背景与截图 固定放置在地图层的 最顶层 。
 * 设计:
 *   (1.指令中"方块粉碎[1]"对应 方块粉碎核心 插件中配置的粉碎id。
 *      如果你想设计碎片粉碎的轨迹，可以去看看"1.系统 > 关于弹道.docx"。
 *   (2.粉碎背景可以有两个过程，先反转拼合在一起，然后破碎。
 *      以此可以制作过场动画或者镜头切换的效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要设置插件指令播放指定对象的粉碎效果：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 地图 : 界面截图 : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 地图 : 界面截图 : 方块反转粉碎[1]
 * 插件指令：>方块粉碎效果 : 地图 : 界面截图 : 立刻复原
 * 
 * 插件指令：>方块粉碎效果 : 地图 : 粉碎背景[1] : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 地图 : 粉碎背景[1] : 方块反转粉碎[1]
 * 插件指令：>方块粉碎效果 : 地图 : 粉碎背景[1] : 立刻复原
 * 
 * 1."方块粉碎[1]"对应 方块粉碎核心 插件中配置的粉碎id。
 * 2.粉碎背景可以有两个过程，先反转拼合在一起，然后破碎。
 *   以此可以制作过场动画或者镜头切换的效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改碎片的消失设置：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 地图碎片 : 消失方式 : 不消失
 * 插件指令：>方块粉碎效果 : 地图碎片 : 消失方式 : 线性消失
 * 插件指令：>方块粉碎效果 : 地图碎片 : 消失方式 : 等一半时间后线性消失
 * 插件指令：>方块粉碎效果 : 地图碎片 : 消失方式 : 设回默认
 * 
 * 1."设回默认"表示设置为当前当前配置的默认的消失方式。
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
 * 时间复杂度： o(n^2)*o(贴图处理)
 * 测试方法：   在各个管理层中播放粉碎效果。
 * 测试结果：   200个事件的地图中，平均消耗为：【113.47ms】
 *              100个事件的地图中，平均消耗为：【105.42ms】
 *               50个事件的地图中，平均消耗为：【102.81ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.方块粉碎是性能消耗大户，因为粉碎后图片实际上被分成了m*n块新贴图碎片。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 3.由于只是一张背景图进行粉碎，所以和事件数量的多少没有关系。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了与核心的部分兼容设置。
 * 
 * 
 * @param 默认地图碎片消失方式
 * @type select
 * @option 不消失
 * @value 不消失
 * @option 线性消失
 * @value 线性消失
 * @option 等一半时间后线性消失
 * @value 等一半时间后线性消失
 * @desc 碎片消失的方式。
 * @default 线性消失
 * 
 * @param ---粉碎背景组 1至20---
 * @default 
 *
 * @param 粉碎背景-1
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-2
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-3
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-4
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-5
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-6
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-7
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-8
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-9
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-10
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-11
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-12
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-13
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-14
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-15
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-16
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-17
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-18
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-19
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-20
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param ---粉碎背景组21至40---
 * @default 
 *
 * @param 粉碎背景-21
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-22
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-23
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-24
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-25
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-26
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-27
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-28
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-29
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-30
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-31
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-32
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-33
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-34
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-35
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-36
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-37
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-38
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-39
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-40
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Map__shatterBackground/
 * @type file
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LSE（Event_Shatter_Effect）
//		临时全局变量	无
//		临时局部变量	this._drill_LSE_xxx
//		存储数据变量	$gameMap.drill_LSE_needReflash （不完全算存储，离开地图就被清除重做）
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理)
//		性能测试因素	在地图管理层中执行粉碎
//		性能测试消耗	113.47ms
//		最坏情况		粉碎分割的数量特别多。
//		备注			由于只有一个贴图，粉碎性能是不需要非常担心的，不过还是有影响。
//
//插件记录：
//		★大体框架与功能如下：
//			地图方块粉碎：
//				->粉碎配置
//					->普通粉碎
//					->扩散粉碎
//					->抛物线粉碎
//					->弹道反向
//				->粉碎背景
//
//		★必要注意事项：
//			1.整个插件只有一个sprite，并且放置在最顶层。
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
　　Imported.Drill_LayerShatterEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerShatterEffect');
	
	DrillUp.g_LSE_opacityType = String(DrillUp.parameters['默认地图碎片消失方式'] || "线性消失");	
	
	DrillUp.g_LSE_list_length = 40;
	DrillUp.g_LSE_list = [];
	for (var i = 0; i < DrillUp.g_LSE_list_length; i++) {
		DrillUp.g_LSE_list[i] = String(DrillUp.parameters["粉碎背景-" + String(i+1) ] || "");
	}
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfShatterEffect ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_LSE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_LSE_pluginCommand.call(this, command, args);
	if (command === ">方块粉碎效果") { // >方块粉碎效果 : 地图 : 界面截图 : 方块粉碎[1]
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
					
			if( type == "地图" ){
				if( temp1 == "界面截图" ){
					$gameSystem._drill_LSE['shatter_img_src'] = -1;
				}
				if( temp1.indexOf("粉碎背景[") != -1 ){
					temp1 = temp1.replace("粉碎背景[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_LSE['shatter_img_src'] = Number(temp1)-1;
				}
					
				if( temp2.indexOf("方块粉碎[") != -1 ){
					temp2 = temp2.replace("方块粉碎[","");
					temp2 = temp2.replace("]","");
					
					$gameSystem._drill_LSE['shatter_command'] = true;
					$gameSystem._drill_LSE['shatter_id'] = Number(temp2)-1;
					$gameSystem._drill_LSE['shatter_converted'] = false;
				}
				if( temp2.indexOf("方块反转粉碎[") != -1 ){
					temp2 = temp2.replace("方块反转粉碎[","");
					temp2 = temp2.replace("]","");
					
					$gameSystem._drill_LSE['shatter_command'] = true;
					$gameSystem._drill_LSE['shatter_id'] = Number(temp2)-1;
					$gameSystem._drill_LSE['shatter_converted'] = true;
				}
				if( temp2 == "立刻复原" ){
					$gameSystem._drill_LSE['redraw_command'] = true;
				}
			}
		}
		if(args.length == 6){		//>方块粉碎效果 : 地图碎片 : 消失方式 : 不消失
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "地图碎片" && temp1 == "消失方式" ){
				if( temp2 == "设回默认" ){
					$gameSystem._drill_LSE['opacityType'] = DrillUp.g_LSE_opacityType;
				}else{
					$gameSystem._drill_LSE['opacityType'] = temp1;
				}
			}
		}
	}
};

//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapShatterBackground = function(filename) {
    return this.loadBitmap('img/Map__shatterBackground/', filename, 0, true);
};

//=============================================================================
// * 存储数据初始化
//=============================================================================
var _drill_LSE_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LSE_system_initialize.call(this);
	this._drill_LSE = {};
	this._drill_LSE['redraw_command'] = false;				//重画指令
	this._drill_LSE['shatter_command'] = false;				//碎片指令
	this._drill_LSE['shatter_id'] = -1;						//当前碎片样式id
	this._drill_LSE['shatter_converted'] = false;			//反向弹道
	this._drill_LSE['shatter_img_src'] = -1;				//粉碎背景
	this._drill_LSE['opacityType'] = DrillUp.g_LSE_opacityType;
}

//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 最顶层
//==============================
var _drill_LSE_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LSE_layer_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Map.prototype.drill_LSE_sortByZIndex = function() {
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};

//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 帧刷新
//==============================
var _drill_LSE_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_LSE_scene_update.call(this);
	
	if( this.isActive() ){
		this.drill_LSE_updateCommand();
	}
};
//==============================
// * 指令控制
//==============================
Scene_Map.prototype.drill_LSE_updateCommand = function() {
	
	// > 粉碎指令
	if( $gameSystem._drill_LSE['shatter_command'] == true ){
		$gameSystem._drill_LSE['shatter_command'] = false;
		
		if( this._Drill_LSE_sprite != null ){
			this._drill_SenceTopArea.removeChild( this._Drill_LSE_sprite );
		}
		
		if( $gameSystem._drill_LSE['shatter_img_src'] == -1 ){
			this._Drill_LSE_sprite_bitmap = SceneManager.snap();
		}else{
			var img_src = DrillUp.g_LSE_list[ $gameSystem._drill_LSE['shatter_img_src'] ];
			this._Drill_LSE_sprite_bitmap = ImageManager.load_MapShatterBackground(img_src);
		}
		
		this._Drill_LSE_sprite = new Sprite();
		this._drill_SenceTopArea.addChild( this._Drill_LSE_sprite );
		
		this._drill_LSE_waiting = true;
	}
	if( this._Drill_LSE_sprite &&
		this._Drill_LSE_sprite_bitmap &&
		this._Drill_LSE_sprite_bitmap.isReady() &&
		this._drill_LSE_waiting == true ){
		this._drill_LSE_waiting = false;
		var data = {
			"frameX":0,	
			"frameY":0,
			"frameW":Graphics.boxWidth,
			"frameH":Graphics.boxHeight,
			"shatter_id":$gameSystem._drill_LSE['shatter_id'],							//粉碎样式
			"shatter_converted":$gameSystem._drill_LSE['shatter_converted'],			//反向弹道
			"shatter_opacityType":$gameSystem._drill_LSE['opacityType'],				//透明度变化方式
			"shatter_autoHide":false,													//自动隐藏
		};
		this._Drill_LSE_sprite.drill_COSE_setShatter( data,this._Drill_LSE_sprite_bitmap );		//方块粉碎核心 - 初始化
	}
	
	
	// > 重画指令
	if( $gameSystem._drill_LSE['redraw_command'] == true ){
		$gameSystem._drill_LSE['redraw_command'] = false;
		
		this._Drill_LSE_sprite.drill_COSE_restoreShatter();				//方块粉碎核心 - 复原
	}
	
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_LayerShatterEffect = false;
		alert(
			"【Drill_LayerShatterEffect.js 行走图-方块粉碎效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfShatterEffect 系统-方块粉碎核心"
		);
}



