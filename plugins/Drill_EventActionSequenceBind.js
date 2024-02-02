//=============================================================================
// Drill_EventActionSequenceBind.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        行走图 - GIF动画序列全绑定
 * @author Drill_up
 * 
 * @Drill_LE_param "全绑定-%d"
 * @Drill_LE_parentKey "---全绑定%d至%d---"
 * @Drill_LE_var "DrillUp.g_EASB_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventActionSequenceBind +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以根据 行走图资源 ，全绑定到对应的动画序列。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_EventActionSequence             行走图-GIF动画序列★★v1.2及以上★★
 *   - Drill_EventActionSequenceAutomation   行走图-GIF动画序列全标签播放★★v1.1及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.更多详细内容，去看看 "7.行走图 > 关于行走图GIF动画序列.docx"。
 * 细节：
 *   (1.全绑定 意思为 行走图资源与动画序列 一对一。
 *      如果你切换事件页，资源变化，那么动画序列也相应变化。
 *      如果事件页配置了空资源，那么动画序列则关闭。
 * 小工具：
 *   (1.防止你看不见：
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *   (2.小工具能导入 行走图、序列大图、GIF文件 等资源，
 *      然后小工具能将配置转移到插件 GIF动画序列核心 中。
 * 设计：
 *   (1.示例中 全绑定 将 小爱丽丝长发动画序列 和 行走图资源"$小爱丽丝_长"
 *      进行了关联。那么，只要配置了资源"$小爱丽丝_长"，就等同于全标签播放
 *      了小爱丽丝长发的动画序列。如果你设计的是一个换装游戏，那么可以弄
 *      两套不同服装的 动画序列 和 行走图资源，并设置两套绑定。这样，游戏中
 *      只要切换了行走图资源，就等同于切换了 动画序列 。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 全绑定
 * 你需要通过下面插件指令来激活绑定控制：
 * 
 * 插件指令：>行走图动画序列全绑定 : 开启全绑定 : 全绑定[1]
 * 插件指令：>行走图动画序列全绑定 : 关闭全绑定 : 全绑定[1]
 * 
 * 1.注意，这里的插件指令操作的是 全绑定 的开关。
 *   开关 全绑定 后，符合条件的 行走图，才会变化，而不是所有行走图都变化。
 * 2.如果行走图同时被 全绑定和行走图动画序列的事件注释 控制改变动画序列，
 *   则按 全绑定 的设置来，全绑定的优先级高。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 地图开关
 * 你可以通过地图备注手动控制当前地图的绑定：
 * 
 * 地图备注：=>行走图动画序列全绑定:启用
 * 地图备注：=>行走图动画序列全绑定:禁用
 * 
 * 1.默认为启用，设置禁用后，当前地图不会对任何事件进行 动画序列 全绑定。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   在动画序列管理层设置10个事件，加载小爱丽丝动画序列。
 * 测试结果：   200个事件的地图中，平均消耗为：【6.19ms】
 *              100个事件的地图中，平均消耗为：【5.90ms】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.全绑定每帧只遍历一次事件，因此消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 进一步优化了动画序列底层，该插件重新兼容。
 * [v1.2]
 * 优化了动画序列存储底层。
 * 
 * 
 * 
 * @param ---全绑定 1至20---
 * @default 
 * 
 * @param 全绑定-1
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-2
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-3
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-4
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-5
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-6
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-7
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-8
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-9
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-10
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-11
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-12
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-13
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-14
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-15
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-16
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-17
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-18
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-19
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-20
 * @parent ---全绑定 1至20---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param ---全绑定21至40---
 * @default 
 * 
 * @param 全绑定-21
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-22
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-23
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-24
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-25
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-26
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-27
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-28
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-29
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-30
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-31
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-32
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-33
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-34
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-35
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-36
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-37
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-38
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-39
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default 
 * 
 * @param 全绑定-40
 * @parent ---全绑定21至40---
 * @type struct<DrilEASBBind>
 * @desc 全绑定的详细配置信息。
 * @default
 * 
 */
/*~struct~DrilEASBBind:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的动画序列==
 * 
 * 
 * @param ---绑定---
 * @default
 *
 * @param 初始是否开启绑定
 * @parent ---绑定---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 你可以通过插件指令手动开关全绑定设置。
 * @default true
 *
 * @param 绑定的行走图资源
 * @parent ---绑定---
 * @desc 使用该行走图资源的 事件页 ，全都绑定 动画序列 。
 * @default 
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @param 绑定的动画序列id
 * @parent ---绑定---
 * @type number
 * @min 1
 * @desc 满足条件后，绑定的动画序列id。（1秒60帧）
 * @default 1
 * 
 * @param ---动画序列---
 * @default
 * 
 * @param 初始播放的状态节点
 * @parent ---动画序列---
 * @desc 如果为空，则表示播放 默认的状态元集合 。
 * @default 
 *
 * @param 行走图动画序列类型
 * @parent ---动画序列---
 * @type select
 * @option 站桩动画序列
 * @value 站桩动画序列
 * @option 四方向动画序列
 * @value 四方向动画序列
 * @option 二方向动画序列
 * @value 二方向动画序列
 * @desc 绑定的行走图动画序列的类型。
 * @default 四方向动画序列
 *
 * @param 是否开启全标签播放
 * @parent ---动画序列---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 绑定的动画序列是否开启全标签播放。
 * @default true
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EASB（Event_Action_Sequence_Bind）
//		临时全局变量	无
//		临时局部变量	this._drill_EASB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	动画序列管理层
//		★性能测试消耗	5.9ms（Game_CharacterBase.drill_EASB_openActionSequenceByName） 1.8ms（Game_CharacterBase.drill_EASB_closeActionSequence）
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
//			->☆存储数据
//			->☆地图备注
//			
//			->☆动画序列操作
//				->全事件 创建动画序列（根据资源名称）
//				->全事件 销毁动画序列（根据资源名称）
//				->创建动画序列（根据资源名称）
//				->销毁动画序列（根据资源名称）
//				->创建动画序列（基函数）
//				->销毁动画序列（基函数）
//			->☆物体绑定
//				->标记 _characterName 参数
//
//
//		★家谱：
//			大家族-GIF动画序列
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.该插件只执行 创建/销毁 动画序列，自动播放、四方向，都不是该插件该管的事情，该插件只提供开关。
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
	DrillUp.g_EASB_PluginTip_curName = "Drill_EventActionSequenceBind.js 行走图-GIF动画序列全绑定";
	DrillUp.g_EASB_PluginTip_baseList = [
		"Drill_EventActionSequence.js 行走图-GIF动画序列",
		"Drill_EventActionSequenceAutomation.js 行走图-GIF动画序列全标签播放"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EASB_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EASB_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EASB_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EASB_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EASB_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到配置数据
	//==============================
	DrillUp.drill_EASB_getPluginTip_DataNotFind = function( data_id ){
		return "【" + DrillUp.g_EASB_PluginTip_curName + "】\n未找到 全绑定"+data_id+"的配置。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventActionSequenceBind = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventActionSequenceBind');
	

	//==============================
	// * 静态数据 - 全绑定
	//				（~struct~DrilEASBBind）
	//==============================
	DrillUp.drill_EASB_initBind = function( dataFrom ){
		var data = {};
		
		// > 常规
		data['enabled'] = String( dataFrom["初始是否开启绑定"] || "true") == "true";
		data['bind_src'] = String( dataFrom["绑定的行走图资源"] || "");
		data['bind_src_file'] = "img/characters/";
		data['bind_seqId'] = Number( dataFrom["绑定的动画序列id"] || 1);
		
		// > 动画序列
		data['defaultNode'] = String( dataFrom["初始播放的状态节点"] || "");
		data['sequenceType'] = String( dataFrom["行走图动画序列类型"] || "四方向动画序列");
		data['enabled_automation'] = String( dataFrom["是否开启全标签播放"] || "true") == "true";
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_EASB_list_length = 40;
	DrillUp.g_EASB_list = [];
	for( var i = 0; i < DrillUp.g_EASB_list_length; i++ ){
		if( DrillUp.parameters["全绑定-" + String(i+1) ] != undefined &&
			DrillUp.parameters["全绑定-" + String(i+1) ] != "" ){
			var sequence = JSON.parse(DrillUp.parameters["全绑定-" + String(i+1) ]);
			DrillUp.g_EASB_list[i] = DrillUp.drill_EASB_initBind( sequence );
		}else{
			DrillUp.g_EASB_list[i] = null;
		}
	}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventActionSequence &&
	Imported.Drill_EventActionSequenceAutomation ){
	

//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EASB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_EASB_pluginCommand.call(this, command, args);
	if( command === ">行走图动画序列全绑定" ){ 
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "开启全绑定" ){
				temp1 = temp1.replace("全绑定[","");
				temp1 = temp1.replace("]","");
				temp1 = Number( temp1 )-1;
				var data = DrillUp.g_EASB_list[ temp1 ];
				if( data == undefined ){
					alert( DrillUp.drill_EASB_getPluginTip_DataNotFind(temp1+1) );
					return;
				}
				$gameSystem._drill_EASB_enabledList[ temp1 ] = true;
				$gameMap.drill_EASB_allEvent_openActionSequenceByName( data['bind_src'] );
			}
			if( type == "关闭全绑定" ){
				temp1 = temp1.replace("全绑定[","");
				temp1 = temp1.replace("]","");
				temp1 = Number( temp1 )-1;
				var data = DrillUp.g_EASB_list[ temp1 ];
				if( data == undefined ){
					alert( DrillUp.drill_EASB_getPluginTip_DataNotFind(temp1+1) );
					return;
				}
				$gameSystem._drill_EASB_enabledList[ temp1 ] = false;
				$gameMap.drill_EASB_allEvent_closeActionSequenceByName( data['bind_src'] );
			}
		}
		
	}
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_EASB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EASB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EASB_sys_initialize.call(this);
	this.drill_EASB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EASB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EASB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EASB_saveEnabled == true ){	
		$gameSystem.drill_EASB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EASB_initSysData();
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
Game_System.prototype.drill_EASB_initSysData = function() {
	this.drill_EASB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EASB_checkSysData = function() {
	this.drill_EASB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EASB_initSysData_Private = function() {
	
	this._drill_EASB_enabledList = [];
	for(var i = 0; i < DrillUp.g_EASB_list.length; i++){
		var temp_data = DrillUp.g_EASB_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_EASB_enabledList[i] = temp_data['enabled'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EASB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EASB_enabledList == undefined ){
		this.drill_EASB_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_EASB_list.length; i++ ){
		var temp_data = DrillUp.g_EASB_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_EASB_enabledList[i] == undefined ){
				this._drill_EASB_enabledList[i] = temp_data['enabled'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//=============================================================================
// ** ☆地图备注
//=============================================================================
//==============================
// * 地图备注 - 初始化绑定
//==============================
var _drill_EASB_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_EASB_map_setup.call(this, mapId);
	this.drill_EASB_setupMapNote();
};
//==============================
// * 地图备注 - 初始化
//==============================
Game_Map.prototype.drill_EASB_setupMapNote = function() {
	
	// > 绑定开关
	this._drill_EASB_bindEnable = true;
	
	$dataMap.note.split(/[\r\n]+/).forEach(function(note) {
		var args = note.split(':');
		var command = args.shift();
		if( command == "=>行走图动画序列全绑定" ){
			if(args.length == 1){
				var temp1 = String(args[0]);
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					this._drill_EASB_bindEnable = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					this._drill_EASB_bindEnable = false;
				}
			}
		}
	},this);
};


//=============================================================================
// ** ☆动画序列操作
//
//			说明：	> 该模块提供 动画序列操作函数。
//					> 该插件只执行 创建/销毁 动画序列，自动播放、四方向，都不是该插件该管的事情，该插件只提供开关。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 动画序列操作 - 地图 - 全事件 创建动画序列（根据资源名称）
//==============================
Game_Map.prototype.drill_EASB_allEvent_openActionSequenceByName = function( src_name ){
	
	// > 强制执行 创建
	for( var i=0; i < this._events.length; i++ ){
		var ev = this._events[i];
		if( ev == undefined ){ continue; }
		if( ev._erased == true ){ continue; }
		
		// > 延迟1帧，让其手动刷新
		ev._drill_EASB_lastName = "";
	}
};
//==============================
// * 动画序列操作 - 地图 - 全事件 销毁动画序列（根据资源名称）
//==============================
Game_Map.prototype.drill_EASB_allEvent_closeActionSequenceByName = function( src_name ){
	
	// > 强制执行 销毁
	for( var i=0; i < this._events.length; i++ ){
		var ev = this._events[i];
		if( ev == undefined ){ continue; }
		if( ev._erased == true ){ continue; }
		ev.drill_EASB_closeActionSequenceByName( src_name );
	}
};
//==============================
// * 动画序列操作 - 物体 - 创建动画序列（根据资源名称）
//
//			说明：	> 根据资源名称，创建该事件的动画序列。注意不要放在帧刷新中反复执行。
//==============================
Game_CharacterBase.prototype.drill_EASB_openActionSequenceByName = function( src_name ){
	
	// > 空名称时，销毁
	if( src_name == "" ){
		this.drill_EASB_closeActionSequence();
		return;
	}
	
	// > 遍历符合的条件
	for( var i=0; i < DrillUp.g_EASB_list.length; i++ ){
		var data = DrillUp.g_EASB_list[i];
		if( data == undefined ){ continue; }
		
		// > 绑定未开时
		if( $gameSystem._drill_EASB_enabledList[i] != true ){ continue; }
		
		if( src_name == data['bind_src'] ){
			this.drill_EASB_openActionSequence( data );
			return;
		}
	}
	
	// > 没遍历到条件时，销毁
	this.drill_EASB_closeActionSequence();
}
//==============================
// * 动画序列操作 - 物体 - 销毁动画序列（根据资源名称）
//
//			说明：	> 根据资源名称，销毁该事件的动画序列。注意不要放在帧刷新中反复执行。
//==============================
Game_CharacterBase.prototype.drill_EASB_closeActionSequenceByName = function( src_name ){
	
	// > 空名称时，销毁
	if( src_name == "" ){
		this.drill_EASB_closeActionSequence();
		return;
	}
	
	// > 对应名称的 销毁
	if( this._drill_EASe_controller == undefined ){ return; }
	if( this._drill_EASe_controller._drill_EASB_curSrcName != src_name ){ return; }
	this.drill_EASB_closeActionSequence();
}
//==============================
// * 动画序列操作 - 物体 - 创建动画序列（基函数）
//
//			说明：	> 输入参数来自该插件的 DrillUp.g_EASB_list 。
//==============================
Game_CharacterBase.prototype.drill_EASB_openActionSequence = function( data ){
	
	// > 创建动画序列
	if( data['sequenceType'] == "四方向动画序列" ){
		this.drill_EASe_setActionSequence( data['bind_seqId']-1, "4dir" );
	}else if( data['sequenceType'] == "二方向动画序列" ){
		this.drill_EASe_setActionSequence( data['bind_seqId']-1, "2dir" );
	}else{
		this.drill_EASe_setActionSequence( data['bind_seqId']-1, "stand" );
	}
	
	// > 初始播放的状态节点
	if( data['defaultNode'] != "" ){
		this.drill_EASe_setStateNode( data['defaultNode'] );
	}
	
	// > 开启 全标签播放【行走图 - GIF动画序列全标签播放】
	if( data['enabled_automation'] == true ){
		this.drill_EASA_setEnabled( true );
	}
	
	// > 资源绑定 标记
	this._drill_EASe_controller._drill_EASB_curSrcName = data['bind_src'];
	this._drill_EASB_binded = true;
}
//==============================
// * 动画序列操作 - 物体 - 销毁动画序列（基函数）
//==============================
Game_CharacterBase.prototype.drill_EASB_closeActionSequence = function(){
	if( this._drill_EASB_binded == false ){ return; }	//（检查绑定标记，该插件只能 销毁 插件自己创建的动画序列）
	this._drill_EASB_binded = false;					//清空 绑定标记
	this._drill_EASB_lastName = "";						//清空 上一个资源名称
	
	// > 执行销毁
	if( this._drill_EASe_controller != undefined ){
		this.drill_EASe_removeActionSequence();
	}
	
	// > 关闭 全标签播放【行走图 - GIF动画序列全标签播放】
	this.drill_EASA_setEnabled( false );
}



//=============================================================================
// ** ☆物体绑定
//
//			说明：	> 此模块在 物体切换资源时，根据情况执行 动画序列操作 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体绑定 - 初始化
//==============================
var _drill_EASB_c_initialize = Game_CharacterBase.prototype.initialize;
Game_CharacterBase.prototype.initialize = function() {
	//（『不考虑节约存储空间』，因为 __drill_EASB_characterName 没法优化）
	
	this._drill_EASB_binded = false;						//绑定标记
	this._drill_EASB_lastName = "";							//上一个资源名称
	//this._drill_EASe_controller._drill_EASB_curSrcName;	//绑定的资源名称（控制器中标记）
	
	// > 原函数
	_drill_EASB_c_initialize.call(this);
}
//==============================
// * 物体绑定 - 帧刷新
//==============================
var _drill_EASB_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_drill_EASB_c_update.call(this);
	if( this instanceof Game_Character == false ){ return; }
	
	// > 检查 - 地图开关关闭
	if( $gameMap._drill_EASB_bindEnable == false ){
		this.drill_EASB_closeActionSequence();
		return;
	}
	
	// > 检查 - 镜头范围外，不工作（优化策略）
	if( this.drill_EASB_posIsInCamera( this._realX, this._realY ) == false ){
		this.drill_EASB_closeActionSequence();
		return;
	}
	
	
	// > 检查 - 资源名称 变化时（这里用于批量修改的变化，但是执行后会慢1帧才能显示图片）
	if( this._drill_EASB_lastName != this._characterName ){
		this._drill_EASB_lastName = this._characterName;
		
		// > 创建动画序列（根据资源名称）
		this.drill_EASB_openActionSequenceByName( this._drill_EASB_lastName );
	}
}
//==============================
// * 物体绑定 - 检查 - 判断贴图是否在镜头范围内
//==============================
Game_CharacterBase.prototype.drill_EASB_posIsInCamera = function( realX, realY ){
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){	// 【地图 - 活动地图镜头】镜头范围内+缩放
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ;
}
//==============================
// * 物体绑定 - 检查 - 资源名称 变化时
//
//			说明：	> 【慢1帧闪烁优化】在改变 _characterName 后，可以立即同步 _drill_EASB_lastName 。
//==============================
Object.defineProperty(Game_CharacterBase.prototype, '_characterName', {
    get: function(){
        return this.__drill_EASB_characterName;
    },
    set: function( value ){
		this.__drill_EASB_characterName = value;
		if( this._drill_EASB_lastName != value ){
			this._drill_EASB_lastName = value;
			
			// > 创建动画序列（根据资源名称）
			this.drill_EASB_openActionSequenceByName( this._drill_EASB_lastName );
		}
    },
    configurable: true
});

//==============================
// * 物体绑定 - 覆盖注释
//
//			说明：	> 全绑定的优先级比 事件注释 的高，若已绑定，则直接跳出注释设置。
//					  因为全绑定的执行是瞬间的，_characterName 变化就立即执行。
//==============================
var _drill_EASB_EASe_setupPage = Game_Event.prototype.drill_EASe_setupPage;
Game_Event.prototype.drill_EASe_setupPage = function() {
	if( this._drill_EASB_binded == true ){ return; }	//（若已绑定资源，则跳过 创建动画序列 的注释）
	_drill_EASB_EASe_setupPage.call(this);
};
//==============================
// * 物体绑定 - 覆盖注释
//==============================
var _drill_EASB_EASA_setupPage = Game_Event.prototype.drill_EASA_setupPage;
Game_Event.prototype.drill_EASA_setupPage = function() {
	if( this._drill_EASB_binded == true ){ return; }	//（若已绑定资源，则跳过 全标签播放 的注释）
	_drill_EASB_EASA_setupPage.call(this);
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventActionSequenceBind = false;
		var pluginTip = DrillUp.drill_EASB_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


