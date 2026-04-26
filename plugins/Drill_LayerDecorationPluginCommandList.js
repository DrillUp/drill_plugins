//=============================================================================
// Drill_LayerDecorationPluginCommandList.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        地图 - 多层装饰的指令容器
 * @author Drill_up
 * 
 * @Drill_LE_param "指令容器-%d"
 * @Drill_LE_parentKey "---容器组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LDPCL_group_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_LayerDecorationPluginCommandList +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 地图装饰插件支持 延时指令/周期指令，你可以将那些指令写在该插件中，方便调用。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 可作用于：
 *   - Drill_LayerGround         地图-多层地图背景
 *   - Drill_LayerParticle       地图-多层地图粒子
 *   - Drill_LayerCircle         地图-多层地图魔法圈
 *   - Drill_LayerGif            地图-多层地图GIF
 *   - Drill_LayerTiledGif       地图-多层地图平铺GIF
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   提供插件指令容器。
 * 2.该插件可以去看看 "17.主菜单 > 多层组合装饰插件的指令容器.docx"。
 * 细节：
 *   (1.制作一个动画效果需要用到大量插件指令，
 *      把它们装在一个能换行的容器里改，比在 游戏编辑器 里一行一行改要方便的多。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 执行指令
 * 你可以通过插件指令手动执行容器内的指令：
 * 
 * 插件指令：>地图装饰的指令容器 : 指令容器[3] : 执行指令
 * 
 * 1."指令容器[3]" 相当于把多个装饰插件的 插件指令 合并到一起，
 *   能像公共事件那样调用，但仅限 地图 的装饰插件的指令。
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
 * 测试方法：   执行容器中的指令，进行性能测试。
 * 测试结果：   地图界面中，消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只是一个辅助用的壳，实际功能执行仍然在装饰插件内。
 *   所以消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 *
 *
 * @param ---容器组 1至20---
 * @default
 *
 * @param 指令容器-1
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-2
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-3
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-4
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-5
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-6
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-7
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-8
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-9
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-10
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-11
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-12
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-13
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-14
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-15
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-16
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-17
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-18
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-19
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-20
 * @parent ---容器组 1至20---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param ---容器组21至40---
 * @default
 *
 * @param 指令容器-21
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-22
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-23
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-24
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-25
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-26
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-27
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-28
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-29
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-30
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-31
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-32
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-33
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-34
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-35
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-36
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-37
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-38
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-39
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-40
 * @parent ---容器组21至40---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param ---容器组41至60---
 * @default
 *
 * @param 指令容器-41
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-42
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-43
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-44
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-45
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-46
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-47
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-48
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-49
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-50
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-51
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-52
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-53
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-54
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-55
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-56
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-57
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-58
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-59
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-60
 * @parent ---容器组41至60---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param ---容器组61至80---
 * @default
 *
 * @param 指令容器-61
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-62
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-63
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-64
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-65
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-66
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-67
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-68
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-69
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-70
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-71
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-72
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-73
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-74
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-75
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-76
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-77
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-78
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-79
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 * @param 指令容器-80
 * @parent ---容器组61至80---
 * @type struct<PluginCommandNote>
 * @desc 指令容器的详细配置信息。
 * @default 
 *
 */
/*~struct~PluginCommandNote:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的指令容器名==
 * 
 * 
 * @param 插件指令列表
 * @type note
 * @desc 这里可以写多行，每行代表一条插件指令。（方便修改）
 * @default ""
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		LDPCL（Layer_Decoration_Plugin_Command_List）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	无
//		★性能测试消耗	2026/4/25：
//							》未找到，消耗太小。
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			
//			->☆指令解析
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰）（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@   /@@   /@@     /@@    │
//			  │  /@@__  @@ | @@  | @@   /@@@@    │
//			  │ | @@  \ @@ | @@  | @@  |_  @@    │
//			  │ | @@  | @@ | @@@@@@@@    | @@    │
//			  │ | @@  | @@ |_____  @@    | @@    │
//			  │ | @@  | @@       | @@    | @@    │
//			  │ |  @@@@@@/       | @@   /@@@@@@  │
//			  │  \______/        |__/  |______/  │
//			  └──────────────────────────────────┘
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
	DrillUp.g_LDPCL_PluginTip_curName = "Drill_LayerDecorationPluginCommandList.js 地图-多层装饰的指令容器";
	DrillUp.g_LDPCL_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_LayerDecorationPluginCommandList = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_LayerDecorationPluginCommandList');
	
	//==============================
	// * 静态数据 - 指令容器
	//				（~struct~PluginCommandNote）
	//==============================
	DrillUp.drill_LDPCL_groupInit = function( dataFrom ){
		var data = {};
		
		if( dataFrom["插件指令列表"] != undefined &&
			dataFrom["插件指令列表"] != "" ){
			data['commandContext'] = JSON.parse( dataFrom["插件指令列表"] );
		}else{
			data['commandContext'] = "";
		}
		
		return data;
	}
	/*-----------------指令容器------------------*/
	DrillUp.g_LDPCL_group_length = 80;
	DrillUp.g_LDPCL_group = [];
	for( var i = 0; i < DrillUp.g_LDPCL_group_length; i++ ){
		if( DrillUp.parameters["指令容器-" + String(i+1) ] != undefined &&
			DrillUp.parameters["指令容器-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["指令容器-" + String(i+1) ]);
			DrillUp.g_LDPCL_group[i] = DrillUp.drill_LDPCL_groupInit( temp );
		}else{
			DrillUp.g_LDPCL_group[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_LDPCL_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_LDPCL_pluginCommand.call(this, command, args);
	this.drill_LDPCL_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_LDPCL_pluginCommand = function( command, args ){
	if( command === ">地图装饰的指令容器" ){
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			temp1 = temp1.replace("指令容器[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			if( type === "执行指令" ){
				var temp_data = DrillUp.g_LDPCL_group[ temp1 ];
				if( temp_data != undefined ){
					DataManager.drill_LDPCL_runCommandContext( temp_data['commandContext'], this );
				}
			}
		}
	}
}


//=============================================================================
// ** ☆指令解析
//			
//			说明：	> 此模块提供 指令解析 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 指令解析 - 执行 多行文本（开放函数）
//==============================
DataManager.drill_LDPCL_runCommandContext = function( commandContext, gameInterpreter ){
	var temp_str_list = commandContext.split("\n");
	for(var j = 0; j < temp_str_list.length; j++ ){
		var temp_str = temp_str_list[j].trim();
		if( temp_str == "" ){ continue; }				//（跳过空行）
		if( temp_str.charAt(0) != ">" ){ continue; }	//（跳过无效行）
		this.drill_LDPCL_runCommandRow( temp_str, gameInterpreter );
	}
};
//==============================
// * 指令解析 - 执行 单行文本（开放函数）
//==============================
DataManager.drill_LDPCL_runCommandRow = function( str, gameInterpreter ){
	var args = str.split(" ");
	var command = args.shift();
	
	// > 背景
	if( Imported.Drill_LayerGround ){
		DrillUp.drill_LG_globalPluginCommand( command, args, gameInterpreter );
	}
	// > 粒子
	if( Imported.Drill_LayerParticle ){
		DrillUp.drill_LPa_globalPluginCommand( command, args, gameInterpreter );
	}
	// > 魔法圈
	if( Imported.Drill_LayerCircle ){
		DrillUp.drill_LCi_globalPluginCommand( command, args, gameInterpreter );
	}
	// > GIF
	if( Imported.Drill_LayerGif ){
		DrillUp.drill_LGi_globalPluginCommand( command, args, gameInterpreter );
	}
	// > 平铺GIF
	if( Imported.Drill_LayerTiledGif ){
		DrillUp.drill_LTG_globalPluginCommand( command, args, gameInterpreter );
	}
	// > 数字雨
	if( Imported.Drill_LayerParticleRain ){
		DrillUp.drill_LPR_globalPluginCommand( command, args, gameInterpreter );
	}
};

