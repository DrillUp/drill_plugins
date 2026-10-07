//=============================================================================
// Drill_LayerTransferHtmlAnim.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        地图 - 场所移动的天窗节点动画
 * @author Drill_up
 * 
 * @Drill_LE_param "天窗节点动画-%d"
 * @Drill_LE_parentKey "---动画组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LTHA_animList_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_LayerTransferHtmlAnim +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以自定义 场所移动指令 的动画转场效果（天窗节点动画）。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_LayerTransferCutscenes            地图-场所移动的动画转场★★v1.2及以上★★
 * 可作用于：
 *   - Drill_HtmlDynamicSnapshotSprite         游戏窗体-天窗层的动态快照
 *   - Drill_HtmlDynamicSnapshotBackground     游戏窗体-天窗层的多层背景
 *   - Drill_HtmlDynamicSnapshotCircle         游戏窗体-天窗层的多层魔法圈
 *   - Drill_HtmlDynamicSnapshotGif            游戏窗体-天窗层的多层GIF
 *   - Drill_HtmlDynamicSnapshotTiledGif       游戏窗体-天窗层的多层平铺GIF
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   提供 天窗节点动画。
 * 2.该插件可以去看看 "17.主菜单 > 关于动画转场核心.docx"。
 *   该插件可以了解下 "17.主菜单 > 多层组合装饰（界面装饰-天窗层）.docx"。
 * 细节：
 *   (1.制作一个动画效果需要用到大量插件指令，
 *      把它们装在一个能换行的容器里改，比在 游戏编辑器 里一行一行改要方便的多。
 *   (2.天窗节点动画 自带指令容器，
 *      但是这个容器只支持 天窗层装饰插件 的指令。
 *      使用插件指令加入动画队列后，玩家进行场所移动时，会自动播放队列中的动画。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 执行指令
 * 你可以通过插件指令手动执行容器内的指令：
 * 
 * 插件指令：>场所移动的天窗节点动画 : 动画[1] : 加入动画队列(一次)
 * 插件指令：>场所移动的天窗节点动画 : 动画[1] : 设为永久动画
 * 插件指令：>场所移动的天窗节点动画 : 清空队列
 * 
 * 插件指令：>场所移动的天窗节点动画 : 动画[1] : 强制播放-节点A
 * 插件指令：>场所移动的天窗节点动画 : 动画[1] : 强制播放-节点B
 * 
 * 1."加入动画队列"后，目标动画只会执行一次，然后复原。
 *   "设为永久动画"后，目标动画会在每次 场所移动时 播放。
 *   "清空队列"会清除动画队列，并清除永久动画。这时候播放默认的 淡出淡入动画。
 * 2.注意，天窗节点动画，只影响 "场所移动" 指令，
 *   其他的地图传送或插件的传送功能，不涉及。
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
 * @param 默认的永久动画
 * @type number
 * @min 0
 * @desc 填入天窗节点动画的id，填0表示默认不加动画。
 * @default 0
 * 
 * @param ---动画组 1至20---
 * @default 
 * 
 * @param 天窗节点动画-1
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-2
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-3
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-4
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-5
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-6
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-7
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-8
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-9
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-10
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-11
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-12
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-13
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-14
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-15
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-16
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-17
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-18
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-19
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 * @param 天窗节点动画-20
 * @parent ---动画组 1至20---
 * @type struct<HtmlAnim>
 * @desc 天窗节点动画的详细配置信息。
 * @default 
 * 
 */
/*~struct~HtmlAnim:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的天窗节点动画名==
 * 
 * 
 * @param ---节点AB---
 * @default 
 * 
 * @param 节点A-插件指令列表
 * @parent ---节点AB---
 * @type note
 * @desc 这里可以写多行，每行代表一条插件指令。（方便修改）（注意只能填天窗层装饰插件的指令）
 * @default ""
 *
 * @param 节点A-持续时长
 * @parent ---节点AB---
 * @type number
 * @min 0
 * @desc 节点A播放动画的总持续时长。
 * @default 60
 * 
 * @param 节点B-插件指令列表
 * @parent ---节点AB---
 * @type note
 * @desc 这里可以写多行，每行代表一条插件指令。（方便修改）（注意只能填天窗层装饰插件的指令）
 * @default ""
 *
 * @param 节点B-持续时长
 * @parent ---节点AB---
 * @type number
 * @min 0
 * @desc 节点B播放动画的总持续时长。
 * @default 60
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		LTHA（Layer_Transfer_Html_Anim）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	无
//		★性能测试消耗	2026/10/7：
//							》未找到，消耗可能都在核心函数中或对应装饰插件。
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
//			->☆动画队列控制
//			->☆动画绑定
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰-天窗层）（脚本）.docx
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
//			  │   /@@@@@@   /@@   /@@  /@@   /@@ │
//			  │  /@@__  @@ | @@  | @@ | @@  | @@ │
//			  │ | @@  \ @@ | @@  | @@ | @@  | @@ │
//			  │ | @@  | @@ | @@@@@@@@ | @@@@@@@@ │
//			  │ | @@  | @@ |_____  @@ |_____  @@ │
//			  │ | @@  | @@       | @@       | @@ │
//			  │ |  @@@@@@/       | @@       | @@ │
//			  │  \______/        |__/       |__/ │
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
	DrillUp.g_LTHA_PluginTip_curName = "Drill_LayerTransferHtmlAnim.js 地图-场所移动的天窗节点动画";
	DrillUp.g_LTHA_PluginTip_baseList = ["Drill_LayerTransferCutscenes.js 地图-场所移动的动画转场"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_LTHA_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_LTHA_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_LTHA_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_LTHA_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_LTHA_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_LayerTransferCutscenes ){
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_LayerTransferHtmlAnim = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_LayerTransferHtmlAnim');
	
	//==============================
	// * 静态数据 - 天窗节点动画
	//				（~struct~HtmlAnim）
	//==============================
	DrillUp.drill_LTHA_animInit = function( dataFrom ){
		var data = {};
		
		// > 节点AB
		data['stepA_time'] = Number( dataFrom["节点A-持续时长"] || 0);
		if( dataFrom["节点A-插件指令列表"] != undefined &&
			dataFrom["节点A-插件指令列表"] != "" ){
			data['stepA_commandContext'] = JSON.parse( dataFrom["节点A-插件指令列表"] );
		}else{
			data['stepA_commandContext'] = "";
		}
		data['stepB_time'] = Number( dataFrom["节点B-持续时长"] || 0);
		if( dataFrom["节点B-插件指令列表"] != undefined &&
			dataFrom["节点B-插件指令列表"] != "" ){
			data['stepB_commandContext'] = JSON.parse( dataFrom["节点B-插件指令列表"] );
		}else{
			data['stepB_commandContext'] = "";
		}
		
		return data;
	}
	/*-----------------天窗节点动画------------------*/
	DrillUp.g_LTHA_animList_length = 20;
	DrillUp.g_LTHA_animList = [];
	for( var i = 0; i < DrillUp.g_LTHA_animList_length; i++ ){
		if( DrillUp.parameters["天窗节点动画-" + String(i+1) ] != undefined &&
			DrillUp.parameters["天窗节点动画-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["天窗节点动画-" + String(i+1) ]);
			DrillUp.g_LTHA_animList[i] = DrillUp.drill_LTHA_animInit( temp );
		}else{
			DrillUp.g_LTHA_animList[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_LTHA_animDefaultId = Number(DrillUp.parameters["默认的永久动画"] || 0);
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_LTHA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_LTHA_pluginCommand.call(this, command, args);
	this.drill_LTHA_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_LTHA_pluginCommand = function( command, args ){
	if( command === ">场所移动的天窗节点动画" ){
		
		/*-----------------加入动画队列------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			temp1 = temp1.replace("动画[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			if( type === "加入动画队列" || type === "加入动画队列(一次)" ){
				var temp_data = DrillUp.g_LTHA_animList[ temp1 ];
				if( temp_data != undefined ){
					DrillUp.drill_LTHA_addSeq( temp_data );
				}
			}
			if( type === "设为永久动画" ){
				var temp_data = DrillUp.g_LTHA_animList[ temp1 ];
				if( temp_data != undefined ){
					DrillUp.drill_LTHA_setDefault( temp_data );
				}
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			if( type === "清空队列" ){
				DrillUp.drill_LTHA_clear();
			}
		}
		
		/*-----------------强制播放------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			temp1 = temp1.replace("动画[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			if( type === "强制播放-节点A" ){
				var temp_data = DrillUp.g_LTHA_animList[ temp1 ];
				if( temp_data != undefined ){
					DataManager.drill_LTHA_runCommandContext( temp_data['stepA_commandContext'], this );
				}
			}
			if( type === "强制播放-节点B" ){
				var temp_data = DrillUp.g_LTHA_animList[ temp1 ];
				if( temp_data != undefined ){
					DataManager.drill_LTHA_runCommandContext( temp_data['stepB_commandContext'], this );
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
DataManager.drill_LTHA_runCommandContext = function( commandContext, gameInterpreter ){
	var temp_str_list = commandContext.split("\n");
	for(var j = 0; j < temp_str_list.length; j++ ){
		var temp_str = temp_str_list[j].trim();
		if( temp_str == "" ){ continue; }				//（跳过空行）
		if( temp_str.charAt(0) != ">" ){ continue; }	//（跳过无效行）
		this.drill_LTHA_runCommandRow( temp_str, gameInterpreter );
	}
};
//==============================
// * 指令解析 - 执行 单行文本（开放函数）
//==============================
DataManager.drill_LTHA_runCommandRow = function( str, gameInterpreter ){
	var args = str.split(" ");
	var command = args.shift();
	
	// > 动态快照
	if( Imported.Drill_HtmlDynamicSnapshotSprite ){
		DrillUp.drill_HDSS_globalPluginCommand( command, args, gameInterpreter );
	}
	// > 背景
	if( Imported.Drill_HtmlDynamicSnapshotBackground ){
		DrillUp.drill_HDSB_globalPluginCommand( command, args, gameInterpreter );
	}
	// > 平铺GIF
	if( Imported.Drill_HtmlDynamicSnapshotTiledGif ){
		DrillUp.drill_HDSTG_globalPluginCommand( command, args, gameInterpreter );
	}
	// > 魔法圈
	if( Imported.Drill_HtmlDynamicSnapshotCircle ){
		DrillUp.drill_HDSC_globalPluginCommand( command, args, gameInterpreter );
	}
	// > GIF
	if( Imported.Drill_HtmlDynamicSnapshotGif ){
		DrillUp.drill_HDSGi_globalPluginCommand( command, args, gameInterpreter );
	}
};


//=============================================================================
// ** ☆动画队列控制
//			
//			说明：	> 此模块提供 动画队列控制 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 动画队列控制 - 参数
//==============================
DrillUp.g_LTHA_seqA = [];
DrillUp.g_LTHA_seqB = [];
DrillUp.g_LTHA_seqDefault = null;
if( DrillUp.g_LTHA_animDefaultId > 0 ){  //（默认的永久动画）
	DrillUp.g_LTHA_seqDefault = DrillUp.g_LTHA_animList[ DrillUp.g_LTHA_animDefaultId-1 ];
}
//==============================
// * 动画队列控制 - 是否有动画（开放函数）
//==============================
DrillUp.drill_LTHA_hasAnim = function(){
	if( DrillUp.g_LTHA_seqA.length > 0 ){ return true; }
	if( DrillUp.g_LTHA_seqB.length > 0 ){ return true; }
	if( DrillUp.g_LTHA_seqDefault != null ){ return true; }
	return false;
};
//==============================
// * 动画队列控制 - 加入动画队列（开放函数）
//==============================
DrillUp.drill_LTHA_addSeq = function( temp_data ){
	if( temp_data == undefined ){ return; }
	DrillUp.g_LTHA_seqA.push( temp_data );
	DrillUp.g_LTHA_seqB.push( temp_data );
};
//==============================
// * 动画队列控制 - 设为永久动画（开放函数）
//==============================
DrillUp.drill_LTHA_setDefault = function( temp_data ){
	if( temp_data == undefined ){ return; }
	DrillUp.g_LTHA_seqDefault = temp_data;
};
//==============================
// * 动画队列控制 - 清空队列（开放函数）
//==============================
DrillUp.drill_LTHA_clear = function(){
	DrillUp.g_LTHA_seqA = [];
	DrillUp.g_LTHA_seqB = [];
	DrillUp.g_LTHA_seqDefault = null;
};
//==============================
// * 动画队列控制 - 获取数据 - 节点A（私有）
//
//			说明：	> 该函数节点A专用，不对外。
//==============================
DrillUp.drill_LTHA_getData_InStepA = function(){
	var result_data = null;
	if( DrillUp.g_LTHA_seqA.length > 0 ){
		result_data = DrillUp.g_LTHA_seqA[ DrillUp.g_LTHA_seqA.length -1 ];
		DrillUp.g_LTHA_seqA.length = DrillUp.g_LTHA_seqA.length -1;  //（获取一次，容器-1）
	}else{
		result_data = DrillUp.g_LTHA_seqDefault;
	}
	return result_data;
};
//==============================
// * 动画队列控制 - 获取数据 - 节点B（私有）
//
//			说明：	> 该函数节点B专用，不对外。
//==============================
DrillUp.drill_LTHA_getData_InStepB = function(){
	var result_data = null;
	if( DrillUp.g_LTHA_seqB.length > 0 ){
		result_data = DrillUp.g_LTHA_seqB[ DrillUp.g_LTHA_seqB.length -1 ];
		DrillUp.g_LTHA_seqB.length = DrillUp.g_LTHA_seqB.length -1;  //（获取一次，容器-1）
	}else{
		result_data = DrillUp.g_LTHA_seqDefault;
	}
	return result_data;
};


//=============================================================================
// ** ☆动画绑定
//			
//			说明：	> 此模块提供 动画绑定 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 动画绑定 - 节点A（继承）
//==============================
var _drill_LTHA_LTCut_stepA = Scene_Base.prototype.drill_LTCut_stepA;
Scene_Base.prototype.drill_LTCut_stepA = function( is_white ){
	
	// > 播放动画
	var temp_data = DrillUp.drill_LTHA_getData_InStepA();
	if( temp_data != null ){
		
		// > 播放动画 - 插件指令列表
		DataManager.drill_LTHA_runCommandContext( temp_data['stepA_commandContext'], null );
		
		// > 播放动画 - 持续时长
		this.drill_COCut_setFadeColor( "" );
		this.drill_COCut_setFadeTime( temp_data['stepA_time'] );
		this.drill_COCut_submitFade( true );
		return;
	}
	
	// > 原函数
	_drill_LTHA_LTCut_stepA.call( this, is_white );
};
//==============================
// * 动画绑定 - 节点B（继承）
//==============================
var _drill_LTHA_LTCut_stepB = Scene_Base.prototype.drill_LTCut_stepB;
Scene_Base.prototype.drill_LTCut_stepB = function( is_white ){
	
	// > 播放动画
	var temp_data = DrillUp.drill_LTHA_getData_InStepB();
	if( temp_data != null ){
		
		// > 播放动画 - 插件指令列表
		DataManager.drill_LTHA_runCommandContext( temp_data['stepB_commandContext'], null );
		
		// > 播放动画 - 持续时长
		this.drill_COCut_setFadeColor( "" );
		this.drill_COCut_setFadeTime( temp_data['stepB_time'] );
		this.drill_COCut_submitFade( true );
		return;
	}
	
	// > 原函数
	_drill_LTHA_LTCut_stepB.call( this, is_white );
};

//==============================
// * 动画绑定 - 场所移动类型（继承）
//==============================
var _drill_LTHA_fadeType = Game_Player.prototype.fadeType;
Game_Player.prototype.fadeType = function(){
	
	// > 有动画时，锁定类型，使淡出淡入动画能正常播放
	if( DrillUp.drill_LTHA_hasAnim() == true ){ return 1; }
	
	// > 原函数
	return _drill_LTHA_fadeType.call(this);
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_LayerTransferCutscenes = false;
		var pluginTip = DrillUp.drill_LTHA_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

