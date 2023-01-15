//=============================================================================
// Drill_BattleShatterEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        战斗 - 方块粉碎效果
 * @author Drill_up
 * 
 * @Drill_LE_param "粉碎背景-%d"
 * @Drill_LE_parentKey "---粉碎背景组%d至%d---"
 * @Drill_LE_var "DrillUp.g_BSE_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_BattleShatterEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得战斗界面能播放方块状的粉碎效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfShatterEffect    系统-方块粉碎核心★★v1.6及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   只作用于战斗界面整体。
 * 2.想要更多了解方块粉碎，可以去看看 "1.系统 > 大家族-方块粉碎.docx"。
 * 细节:
 *   (1.粉碎背景与截图 固定放置在战斗层的 最顶层 。
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
 * 插件指令：>方块粉碎效果 : 战斗 : 界面截图 : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 战斗 : 界面截图 : 方块反转粉碎[1]
 * 插件指令：>方块粉碎效果 : 战斗 : 界面截图 : 立刻复原
 * 插件指令：>方块粉碎效果 : 战斗 : 界面截图 : 暂停播放
 * 插件指令：>方块粉碎效果 : 战斗 : 界面截图 : 继续播放
 * 
 * 插件指令：>方块粉碎效果 : 战斗 : 粉碎背景[1] : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 战斗 : 粉碎背景[1] : 方块反转粉碎[1]
 * 插件指令：>方块粉碎效果 : 战斗 : 粉碎背景[1] : 立刻复原
 * 插件指令：>方块粉碎效果 : 战斗 : 粉碎背景[1] : 暂停播放
 * 插件指令：>方块粉碎效果 : 战斗 : 粉碎背景[1] : 继续播放
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
 * 插件指令：>方块粉碎效果 : 战斗碎片 : 消失方式 : 不消失
 * 插件指令：>方块粉碎效果 : 战斗碎片 : 消失方式 : 线性消失
 * 插件指令：>方块粉碎效果 : 战斗碎片 : 消失方式 : 等一半时间后线性消失
 * 插件指令：>方块粉碎效果 : 战斗碎片 : 消失方式 : 设回默认
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
 * 测试方法：   战斗界面中播放粉碎效果。
 * 测试结果：   战斗界面中，平均消耗为：【113.47ms】
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
 * [v1.2]
 * 较大改动了结构，支持了 暂停播放和继续播放 功能。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * @param 默认战斗碎片消失方式
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
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-2
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-3
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-4
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-5
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-6
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-7
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-8
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-9
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-10
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-11
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-12
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-13
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-14
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-15
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-16
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-17
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-18
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-19
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-20
 * @parent ---粉碎背景组 1至20---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
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
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-22
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-23
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-24
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-25
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-26
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-27
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-28
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-29
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-30
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-31
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-32
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-33
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-34
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-35
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-36
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-37
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-38
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-39
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 *
 * @param 粉碎背景-40
 * @parent ---粉碎背景组21至40---
 * @desc 粉碎背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Battle__shatterBackground/
 * @type file
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BSE（Battle_Shatter_Effect）
//		临时全局变量	无
//		临时局部变量	this._drill_BSE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)
//		★性能测试因素	在战斗管理层中执行粉碎
//		★性能测试消耗	113.47ms
//		★最坏情况		粉碎分割的数量特别多。
//		★备注			由于只有一个贴图，粉碎性能是不需要非常担心的，不过还是有影响。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			战斗方块粉碎：
//				->粉碎配置
//					->普通粉碎
//					->扩散粉碎
//					->抛物线粉碎
//					->弹道反向
//				->粉碎背景
//
//		★必要注意事项：
//			1.整个插件只有一个sprite，并且放置在最顶层。
//			  核心中提供了 存储碎片 的功能，但是此插件不存任何数据。
//			2.完全没有修改。只替换了下面字符：
//				Drill_LayerShatterEffect	->	Drill_BattleShatterEffect
//				LSE							->	BSE
//				Map							->	Battle
//				地图						->	战斗
//				另外注意 性能消耗值。
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
　　Imported.Drill_BattleShatterEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BattleShatterEffect');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_BSE_opacityType = String(DrillUp.parameters['默认战斗碎片消失方式'] || "线性消失");	
	
	/*-----------------粉碎背景------------------*/
	DrillUp.g_BSE_list_length = 40;
	DrillUp.g_BSE_list = [];
	for( var i = 0; i < DrillUp.g_BSE_list_length; i++ ){
		DrillUp.g_BSE_list[i] = String(DrillUp.parameters['粉碎背景-' + String(i+1) ] || "");
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfShatterEffect ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_BSE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_BSE_pluginCommand.call(this, command, args);
	if( command === ">方块粉碎效果" ){ // >方块粉碎效果 : 战斗 : 界面截图 : 方块粉碎[1]
		
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			
			if( type == "战斗" ){
				if( $gameTemp._drill_BSE_controlled_sprite == undefined ){ return; }
				if( temp2 == "立刻复原" ){
					$gameTemp._drill_BSE_controller.drill_COSE_restoreShatter();
					return;
				}
				if( temp2 == "暂停播放" ){
					$gameTemp._drill_BSE_controller.drill_COSE_pause();
					return;
				}
				if( temp2 == "继续播放" ){
					$gameTemp._drill_BSE_controller.drill_COSE_continue();
					return;
				}
				
				
				// > 参数准备
				var temp_data = {
					"frameX": 0,	
					"frameY": 0,
					"frameW": Graphics.boxWidth,
					"frameH": Graphics.boxHeight,
					"shatter_id": 0,
					"shatter_opacityType": $gameSystem._drill_BSE_opacityType,	//透明度变化方式
					"shatter_hasParent": false,									//父贴图标记
				};
				if( temp1 == "界面截图" ){
					temp_data["src_mode"] = "关闭资源控制";
					temp_data["src_img"] = "";
					temp_data["src_file"] = "img/Battle__shatterBackground/";
				}
				if( temp1.indexOf("粉碎背景[") != -1 ){
					temp1 = temp1.replace("粉碎背景[","");
					temp1 = temp1.replace("]","");
					var img_src = DrillUp.g_BSE_list[ Number(temp1)-1 ];
					temp_data["src_mode"] = "指定资源名";
					temp_data["src_img"] = img_src;
					temp_data["src_file"] = "img/Battle__shatterBackground/";
				}
				
				// > 贴图设置
				if( temp2.indexOf("方块粉碎[") != -1 ){
					temp2 = temp2.replace("方块粉碎[","");
					temp2 = temp2.replace("]","");
					temp_data["shatter_id"] = Number(temp2)-1;
					
					$gameTemp._drill_BSE_controller.drill_COSE_resetData( temp_data );		//方块粉碎核心 - 初始化
					$gameTemp._drill_BSE_controller.drill_COSE_runShatter();				//正常播放
					
					// > 截图资源对象情况（只能直接控制贴图，不能从数据层面上去改）
					if( temp_data["src_mode"] == "关闭资源控制" ){
						$gameTemp._drill_BSE_controlled_sprite.drill_COSE_setUncontroledBitmap( SceneManager.snap() );
					}
				}
				if( temp2.indexOf("方块反转粉碎[") != -1 ){
					temp2 = temp2.replace("方块反转粉碎[","");
					temp2 = temp2.replace("]","");
					temp_data["shatter_id"] = Number(temp2)-1;
					
					$gameTemp._drill_BSE_controller.drill_COSE_resetData( temp_data );		//方块粉碎核心 - 初始化
					$gameTemp._drill_BSE_controller.drill_COSE_backrunShatter();			//倒放
					
					// > 截图资源对象情况（只能直接控制贴图，不能从数据层面上去改）
					if( temp_data["src_mode"] == "关闭资源控制" ){
						$gameTemp._drill_BSE_controlled_sprite.drill_COSE_setUncontroledBitmap( SceneManager.snap() );
					}
				}
			}
		}
		if(args.length == 6){		//>方块粉碎效果 : 战斗碎片 : 消失方式 : 不消失
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "战斗碎片" && temp1 == "消失方式" ){
				if( temp2 == "设回默认" ){
					$gameSystem._drill_BSE_opacityType = DrillUp.g_BSE_opacityType;
				}else{
					$gameSystem._drill_BSE_opacityType = temp1;
				}
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
DrillUp.g_BSE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BSE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BSE_sys_initialize.call(this);
	this.drill_BSE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BSE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BSE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BSE_saveEnabled == true ){	
		$gameSystem.drill_BSE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BSE_initSysData();
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
Game_System.prototype.drill_BSE_initSysData = function() {
	this.drill_BSE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BSE_checkSysData = function() {
	this.drill_BSE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BSE_initSysData_Private = function() {
	this._drill_BSE_opacityType = DrillUp.g_BSE_opacityType;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BSE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BSE_opacityType == undefined ){
		this.drill_BSE_initSysData();
	}
	
};


//=============================================================================
// ** 战斗层级
//=============================================================================
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_BSE_layer_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_BSE_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 层级排序
//==============================
Scene_Battle.prototype.drill_BSE_sortByZIndex = function() {
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};


//=============================================================================
// ** 粉碎贴图
//=============================================================================
//==============================
// * 粉碎贴图 - 初始化
//==============================
var _drill_BSE_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BSE_temp_initialize.call(this);
	this._drill_BSE_controller = null;				//粉碎控制器
	this._drill_BSE_controlled_sprite = null;		//粉碎贴图容器
};
//==============================
// * 粉碎贴图 - 创建
//==============================
var _drill_BSE_sTank_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_BSE_sTank_createAllWindows.call(this);
	$gameTemp._drill_BSE_controller = new Drill_COSE_Controller();	//（此数据对象不存）
	$gameTemp._drill_BSE_controlled_sprite = new Drill_COSE_LayerSprite();
	$gameTemp._drill_BSE_controlled_sprite.drill_COSE_setController( $gameTemp._drill_BSE_controller );
	this._drill_SenceTopArea.addChild( $gameTemp._drill_BSE_controlled_sprite );
};
//==============================
// * 粉碎贴图 - 帧刷新
//==============================
var _drill_BSE_sTank_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_BSE_sTank_update.call(this);
	$gameTemp._drill_BSE_controller.drill_COSE_update();			//（不要忘了，数据必须手动帧刷新）
};
//==============================
// * 粉碎贴图 - 销毁
//==============================
var _drill_BSE_sTank_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_BSE_sTank_terminate.call(this);
	$gameTemp._drill_BSE_controlled_sprite.drill_COSE_destroy();
	$gameTemp._drill_BSE_controlled_sprite = null;
	$gameTemp._drill_BSE_controller = null;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BattleShatterEffect = false;
		alert(
			"【Drill_BattleShatterEffect.js 战斗 - 方块粉碎效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfShatterEffect 系统-方块粉碎核心"
		);
}



