//=============================================================================
// Drill_WhenKeyboradTriggered.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        公共事件 - 键盘触发公共事件
 * @author Drill_up
 * 
 * @Drill_LE_param "物理按键绑定-%d"
 * @Drill_LE_parentKey "---物理按键绑定组%d至%d---"
 * @Drill_LE_var "DrillUp.g_WKT_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_WhenKeyboradTriggered +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得键盘的按键可以触发公共事件，这里只支持物理按键。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfInput          系统-输入设备核心
 * 可被扩展：
 *   - Drill_LayerCommandThread   地图-多线程
 *     多线程插件可以使得 公共事件执行 串行/并行 操作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于 键盘 。
 * 2.你需要去看看 "1.系统 > 关于输入设备核心（入门篇）.docx"。
 * 输入设备：
 *   (1.插件只对键盘有效。
 *   (2.插件只支持 物理按键，不支持 逻辑按键。
 * 键盘的物理按键：
 *   (1.键盘的物理按键可以使用 字母、数字 的关键字，
 *      如 a b A B 1 2 等，字母大小写都可以。
 *   (2.你还可以设置特殊的键盘按键，填入以下字符关键字：
 *       Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
 *       ~ - = [ ] \ ; ' , . /
 *       Tab Shift Ctrl Alt Backspace 上 下 左 右 空格 Enter
 *       PageUp PageDown End Home Insert Delete
 *   (3.小键盘的关键字如下：
 *       Num0 Num1 Num2 Num3 Num4 Num5 Num6 Num7 Num8 Num9
 *       Num* Num+ Num- Num. Num/ NumEnter
 *   (4.注意，如果你想配置键盘的 空格，那么要填"空格"，而不是" "。
 * 细节：
 *   (1.设置物理按键绑定时，需要避免与已有的功能重叠。
 *      建议设计游戏时列一个物理按键分配表。
 *   (2.如果 按键已有功能与公共事件 同时触发，
 *      那么会先执行按键功能，后执行公共事件。
 *      比如你设计了公共事件禁止炸弹，而这个按键是 放置炸弹键，
 *      那么你按按键，并不能阻止炸弹的放置。
 * 设计：
 *   (1.你可以设计钢琴小游戏，对应键盘上的不同按键，
 *      通过公共事件来捕获按的键盘按键。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 绑定开关
 * 你可以使用下列插件指令：
 *
 * 插件指令：>键盘触发公共事件 : 物理按键绑定[1] : 开启
 * 插件指令：>键盘触发公共事件 : 物理按键绑定[1] : 关闭
 *
 * 1.参数设置中若初始为关闭，可以通过此插件指令开启。
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
 * 时间复杂度： o(n^2)
 * 测试方法：   直接去键盘管理层转一圈即可。
 * 测试结果：   200个事件的地图中，消耗为：【13.42ms】
 *              100个事件的地图中，消耗为：【8.43ms】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 测试方法2：  在其它界面中进行性能测试。
 * 测试结果2：  战斗界面中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件对按键进行实时监听，从而判定公共事件是否执行，消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * 
 * @param ---物理按键绑定组 1至20---
 * @default
 *
 * @param 物理按键绑定-1
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-2
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-3
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-4
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-5
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-6
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-7
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-8
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-9
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-10
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-11
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-12
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-13
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-14
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-15
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-16
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-17
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-18
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-19
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-20
 * @parent ---物理按键绑定组 1至20---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param ---物理按键绑定组21至40---
 * @default
 *
 * @param 物理按键绑定-21
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-22
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-23
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-24
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-25
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-26
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-27
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-28
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-29
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-30
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-31
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-32
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-33
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-34
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-35
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-36
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-37
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-38
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-39
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 * @param 物理按键绑定-40
 * @parent ---物理按键绑定组21至40---
 * @type struct<DrillWKT>
 * @desc 物理按键绑定的配置信息。
 * @default 
 *
 */
/*~struct~DrillWKT:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的物理按键绑定==
 * 
 * 
 * @param 初始是否开启
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。你可以在游戏中通过 插件指令 开启。
 * @default true
 * 
 * @param 键盘物理按键
 * @type text
 * @desc 当前绑定的键盘物理按键。具体填入见前面说明：键盘的物理按键。
 * @default F
 * 
 * @param 键盘按键方式
 * @type select
 * @option 单次触发-按下[一帧]
 * @value 单次触发-按下[一帧]
 * @option 单次触发-释放[一帧]
 * @value 单次触发-释放[一帧]
 * @option 单次触发-双击[一帧]
 * @value 单次触发-双击[一帧]
 * @desc 键盘按键的触发方式。
 * @default 单次触发-按下[一帧]
 * 
 * @param 执行的公共事件
 * @type common_event
 * @desc 下列的触发条件满足后，执行的公共事件。
 * @default 0
 *
 * @param 公共事件执行方式
 * @type select
 * @option 串行
 * @value 串行
 * @option 并行
 * @value 并行
 * @desc 公共事件的执行方式。战斗界面中没有并行，只能串行。
 * @default 串行
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		WKT（When_Keyborad_Triggered）
//		临时全局变量	DrillUp.g_WKT_xxxx
//		临时局部变量	$gameTemp._drill_WKT_xxx
//		存储数据变量	$gameSystem._drill_WKT_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	键盘管理层
//		★性能测试消耗	4.0ms（drill_WKT_updateCommonEvent）
//		★最坏情况		暂无
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
//			->☆公共事件控制
//				->地图界面
//				->战斗界面
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			1.系统 > 关于输入设备核心（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			无
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
	DrillUp.g_WKT_PluginTip_curName = "Drill_WhenKeyboradTriggered.js 公共事件-键盘触发公共事件";
	DrillUp.g_WKT_PluginTip_baseList = ["Drill_CoreOfInput.js 系统-输入设备核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_WKT_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_WKT_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_WKT_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_WKT_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_WKT_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_WhenKeyboradTriggered = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_WhenKeyboradTriggered');
	
	
	//==============================
	// * 静态数据 - 物理按键绑定
	//				（~struct~DrillWKT）
	//==============================
	DrillUp.drill_WKT_initDrillWKT = function( dataFrom ){
		var data = {};
		
		data['enabled'] = String( dataFrom["初始是否开启"] || "true") == "true";
		data['keyboard_name'] = String( dataFrom["键盘物理按键"] || "" );
		data['keyboard_type'] = String( dataFrom["键盘按键方式"] || "单次触发-按下[一帧]" );
		data['commonEventId'] = Number( dataFrom["执行的公共事件"] || 0);
		data['pipeType'] = String( dataFrom["公共事件执行方式"] || "串行");
		
		return data;
	}
	
	/*-----------------物理按键绑定------------------*/
	DrillUp.g_WKT_list_length = 40;
	DrillUp.g_WKT_list = [];
	for (var i = 0; i < DrillUp.g_WKT_list_length; i++) {
		if( DrillUp.parameters["物理按键绑定-" + String(i+1) ] != undefined &&
			DrillUp.parameters["物理按键绑定-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["物理按键绑定-" + String(i+1) ]);
			DrillUp.g_WKT_list[i] = DrillUp.drill_WKT_initDrillWKT( data );
		}else{
			DrillUp.g_WKT_list[i] = null;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput ){


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_WKT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_WKT_pluginCommand.call(this, command, args);
	if( command === ">键盘触发公共事件" ){
		
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1.indexOf("物理按键绑定[") != -1 ){
				temp1 = temp1.replace("物理按键绑定[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
					$gameSystem._drill_WKT_enableTank[ temp1 ] = true;
				}
				if( temp2 == "关闭" || temp2 == "禁用" ){
					$gameSystem._drill_WKT_enableTank[ temp1 ] = false;
				}
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
DrillUp.g_WKT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_WKT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_WKT_sys_initialize.call(this);
	this.drill_WKT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_WKT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_WKT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_WKT_saveEnabled == true ){	
		$gameSystem.drill_WKT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_WKT_initSysData();
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
Game_System.prototype.drill_WKT_initSysData = function() {
	this.drill_WKT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_WKT_checkSysData = function() {
	this.drill_WKT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_WKT_initSysData_Private = function() {
	
	this._drill_WKT_enableTank = [];
	for(var i = 0; i < DrillUp.g_WKT_list.length; i++){
		var temp_data = DrillUp.g_WKT_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_WKT_enableTank[i] = temp_data['enabled'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_WKT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_WKT_enableTank == undefined ){
		this.drill_WKT_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_WKT_list.length; i++ ){
		var temp_data = DrillUp.g_WKT_list[i];
		if( temp_data == undefined ){ continue; }
		
		// > 未存储的，重新初始化
		if( this._drill_WKT_enableTank[i] == undefined ){
			this._drill_WKT_enableTank[i] = temp_data['enabled'];
		
		// > 已存储的，跳过
		}else{
			//（不操作）
		}
	}
};



//=============================================================================
// ** ☆公共事件控制
//
//			说明：	> 此模块专门控制 公共事件 执行。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 公共事件控制 - 『执行公共事件』（地图界面）
//==============================
Scene_Map.prototype.drill_WKT_doCommonEvent = function( data ){
	
	// > 插件【地图-多线程】
	if( Imported.Drill_LayerCommandThread ){
		var e_data = {
			'type':"公共事件",
			'pipeType': data['pipeType'],
			'commonEventId': data['commonEventId'],
		};
		$gameMap.drill_LCT_addPipeEvent( e_data );
		
	// > 默认执行
	}else{
		$gameTemp.reserveCommonEvent( data['commonEventId'] );
	}
}
//==============================
// * 公共事件控制 - 帧刷新绑定（地图界面）
//==============================
var _drill_WKT_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_WKT_Map_update.call(this);
	this.drill_WKT_updateCommonEvent();
};
//==============================
// * 公共事件控制 - 帧刷新（地图界面）
//==============================
Scene_Map.prototype.drill_WKT_updateCommonEvent = function() {
	
	for(var i=0; i < DrillUp.g_WKT_list.length; i++ ){
		var data = DrillUp.g_WKT_list[i];
		if( data == undefined ){ continue; }
		if( $gameSystem._drill_WKT_enableTank[i] != true ){ continue; }
		
		// > 按键后 执行公共事件
		if( data['keyboard_type'] == "单次触发-按下[一帧]" &&
			Input.drill_isKeyTriggered( data['keyboard_name'] ) ){
			this.drill_WKT_doCommonEvent( data );
		}
		else if( data['keyboard_type'] == "单次触发-释放[一帧]" &&
			Input.drill_isKeyReleased( data['keyboard_name'] ) ){
			this.drill_WKT_doCommonEvent( data );
		}
		else if( data['keyboard_type'] == "单次触发-双击[一帧]" &&
			Input.drill_isKeyDoubled( data['keyboard_name'] ) ){
			this.drill_WKT_doCommonEvent( data );
		}
	}
};

//==============================
// * 公共事件控制 - 『执行公共事件』（战斗界面）
//==============================
Scene_Battle.prototype.drill_WKT_doCommonEvent = function( data ){
	
	// > 默认执行
	$gameTemp.reserveCommonEvent( data['commonEventId'] );
}
//==============================
// * 公共事件控制 - 帧刷新绑定（战斗界面）
//==============================
var _drill_WKT_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _drill_WKT_Battle_update.call(this);
	this.drill_WKT_updateCommonEvent();
};
//==============================
// * 公共事件控制 - 帧刷新（战斗界面）
//==============================
Scene_Battle.prototype.drill_WKT_updateCommonEvent = Scene_Map.prototype.drill_WKT_updateCommonEvent;



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_WhenKeyboradTriggered = false;
		var pluginTip = DrillUp.drill_WKT_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


