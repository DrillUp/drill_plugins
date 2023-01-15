//=============================================================================
// Drill_SecretCode.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        键盘 - 秘籍输入器
 * @author Drill_up
 * 
 * @Drill_LE_param "秘籍-%d"
 * @Drill_LE_parentKey "---秘籍组%d至%d---"
 * @Drill_LE_var "DrillUp.g_SCo_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_SecretCode +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 输入指定特殊序列的 鼠标/键盘/手柄 按键，触发指定的公共事件。
 * ★★必须放在所有"基于"的插件后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfInput          系统-输入设备核心
 * 被扩展：
 *   - Drill_LayerCommandThread   地图-多线程
 *     多线程插件可以使得秘籍的公共事件执行 串行/并行 操作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   秘籍输入只在 地图、战斗 有效。
 * 按键监听：
 *   (1.对鼠标、键盘、手柄有效。触屏不支持。
 *   (2.鼠标滚轮的上下滚动不计算在序列内。
 *   (3.注意秘籍的键盘按键，不要出现菜单键。
 *      进入菜单返回地图后，按键会被重新统计。
 * 公共事件：
 *   (1.地图公共事件的执行可通过 地图-多线程 插件来控制。
 *      可选择串行与并行，具体看看 "31.公共事件 > 关于公共事件与并行.docx"。
 *   (2.战斗界面中，公共事件只能串行执行，当弹出战斗选择窗口时，
 *      指令都不能立即生效。
 *   (3.注意，对话框事件指令 是特殊的指令体，只要执行对话框，就会强
 *      制串行，阻塞其他所有事件的线程。
 * 设计：
 *   (1.秘籍输入器默认是用于方便后台测试时，
 *      立即获取游戏中的金钱和道具、开启剧情支线等功能。
 *      （上上下下左右左右baba）
 *   (2.你也可以利用此设置为剧情中指定的某个地点的特殊开关，
 *      必须输入秘籍才能进入。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制秘籍的开关：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>开启秘籍 : 1
 * 插件指令：>关闭秘籍 : 1
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
 * 测试方法：   在不同界面多次输入秘籍，查看消耗程度。
 * 测试结果：   地图界面，平均消耗为：【20.23ms】
 *              战斗界面，平均消耗为：【31.32ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件的内部结构。
 * [v1.2]
 * 修复了地图界面中按键不是很灵的问题。优化了插件性能。
 * [v1.3]
 * 添加了 地图界面 中串行并行的支持。
 * [v1.4]
 * 修改了插件分类。
 * [v1.5]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param ---秘籍组 1至20---
 * @default
 *
 * @param 秘籍-1
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-2
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-3
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-4
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-5
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-6
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-7
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-8
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-9
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-10
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-11
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-12
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-13
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-14
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-15
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-16
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-17
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-18
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-19
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-20
 * @parent ---秘籍组 1至20---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param ---秘籍组21至40---
 * @default
 *
 * @param 秘籍-21
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-22
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-23
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-24
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-25
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-26
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-27
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-28
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-29
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-30
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-31
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-32
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-33
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-34
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-35
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-36
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-37
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-38
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-39
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-40
 * @parent ---秘籍组21至40---
 * @type struct<DrillSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 */
/*~struct~DrillSCo:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的秘籍触发==
 *
 * @param 初始是否开启
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 关闭，false - 关闭
 * @default true
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
 * @param 是否启用鼠标触发
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 鼠标触发顺序
 * @parent 是否启用鼠标触发
 * @type select[]
 * @option 左键释放[一帧]
 * @value 左键释放[一帧]
 * @option 右键释放[一帧]
 * @value 右键释放[一帧]
 * @option 滚轮释放[一帧]
 * @value 滚轮释放[一帧]
 * @desc 鼠标触发的顺序设置，指定顺序流程完成，即触发公共事件。建议设置的顺序数量超过10。
 * @default []
 *
 * @param 是否启用键盘触发
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 键盘触发顺序
 * @parent 是否启用键盘触发
 * @type text[]
 * @desc 键盘按键的顺序设置，填入数字、字母、"上"、"下"、"左"、"右"、"空格"等。
 * @default []
 *
 * @param 是否启用手柄触发
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 手柄触发顺序
 * @parent 是否启用手柄触发
 * @type select[]
 * @option A
 * @value A
 * @option B
 * @value B
 * @option X
 * @value X
 * @option Y
 * @value Y
 * @option LB
 * @value LB
 * @option RB
 * @value RB
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 手柄触发的顺序设置，指定顺序流程完成，即触发公共事件。建议设置的顺序数量超过10。
 * @default []
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		SCo (Secret_Code)
//		临时全局变量	DrillUp.g_SCo_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_SCo_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	无
//		★性能测试消耗	无
//		★最坏情况		无
//		★备注			该插件主要消耗部分见 Drill_CoreOfOperate 。
//		
//		★优化记录		暂无
//		
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			秘籍输入器：
//				->鼠标按键
//				->手柄按键
//				->键盘按键
//
//		★必要注意事项：
//			1.插件使用了两个核 鼠标按键核心、键盘按键核心 。 
//			  手柄暂未定为 核心。因为可能存在多个手柄连接情况，这里只考虑一个手柄情况。
//
//		★其它说明细节：
//			1.实时监听条件，分别绑定在 scene_battle 和 scene_map 中。
//
//		★存在的问题：
//			1.按键核 与 键盘改键设置 的按键范围不一样。
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_SecretCode = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_SecretCode');
	
	
	//==============================
	// * 变量获取 - 指针与边框
	//				（~struct~DrillSCo）
	//==============================
	DrillUp.drill_SCo_initDrillSCo = function( dataFrom ){
		var data = {};
		data['enable'] = String( dataFrom["初始是否开启"] || "true") == "true";
		data['commonEventId'] = Number( dataFrom["执行的公共事件"] || 0);
		data['pipeType'] = String( dataFrom["公共事件执行方式"] || "串行");
		data['mouse_enable'] = String( dataFrom["是否启用鼠标触发"] || "false") == "true";
		if( dataFrom["鼠标触发顺序"] != undefined &&
			dataFrom["鼠标触发顺序"] != "" ){
			data['mouse_seq'] = JSON.parse( dataFrom["鼠标触发顺序"] );
		}else{
			data['mouse_seq'] = [];
		}
		data['key_enable'] = String( dataFrom["是否启用键盘触发"] || "false") == "true";
		if( dataFrom["键盘触发顺序"] != undefined &&
			dataFrom["键盘触发顺序"] != "" ){
			data['key_seq'] = JSON.parse( dataFrom["键盘触发顺序"] );
		}else{
			data['key_seq'] = [];
		}
		data['pad_enable'] = String( dataFrom["是否启用手柄触发"] || "false") == "true";
		if( dataFrom["手柄触发顺序"] != undefined &&
			dataFrom["手柄触发顺序"] != "" ){
			data['pad_seq'] = JSON.parse( dataFrom["手柄触发顺序"] );
		}else{
			data['pad_seq'] = [];
		}
		data['mouse_cur'] = 0;
		data['key_cur'] = 0;
		data['pad_cur'] = 0;
		return data;
	}
	
	/*-----------------秘籍------------------*/
	DrillUp.g_SCo_list_length = 40;
	DrillUp.g_SCo_list = [];
	for (var i = 0; i < DrillUp.g_SCo_list_length; i++) {
		if( DrillUp.parameters["秘籍-" + String(i+1) ] != undefined &&
			DrillUp.parameters["秘籍-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["秘籍-" + String(i+1) ]);
			DrillUp.g_SCo_list[i] = DrillUp.drill_SCo_initDrillSCo( data );
		}else{
			DrillUp.g_SCo_list[i] = null;
		}
	}

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_SCo_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SCo_pluginCommand.call(this, command, args);
	if( command === ">开启秘籍" ){
		if( args.length == 2 ){
			var temp1 = Number(args[1]) - 1;
			var data = $gameSystem._drill_SCo_list[temp1];
			if( data == undefined ){ return; }
			data['enable'] = true;
		}
	};
	if( command === ">关闭秘籍" ){
		if( args.length == 2 ){
			var temp1 = Number(args[1]) - 1;
			var data = $gameSystem._drill_SCo_list[temp1];
			if( data == undefined ){ return; }
			data['enable'] = false;
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
DrillUp.g_SCo_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SCo_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_SCo_sys_initialize.call(this);
	this.drill_SCo_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_SCo_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_SCo_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_SCo_saveEnabled == true ){	
		$gameSystem.drill_SCo_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_SCo_initSysData();
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
Game_System.prototype.drill_SCo_initSysData = function() {
	this.drill_SCo_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_SCo_checkSysData = function() {
	this.drill_SCo_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_SCo_initSysData_Private = function() {
	
	this._drill_SCo_list = [];
	for(var i=0; i < DrillUp.g_SCo_list.length; i++){
		var temp_data = DrillUp.g_SCo_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_SCo_list[i] = JSON.parse(JSON.stringify( temp_data ));
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_SCo_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_SCo_list == undefined ){
		this.drill_SCo_initSysData();
	}
	
	// > 绑定数据容器
	for(var i = 0; i < DrillUp.g_SCo_list.length; i++ ){
		var temp_data = DrillUp.g_SCo_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_SCo_list[i] == undefined ){
				this._drill_SCo_list[i] = JSON.parse(JSON.stringify( temp_data ));
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 帧刷新
//==============================
var _drill_SCo_m_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_SCo_m_update.call(this);
	if( this.isActive() ){
		this.drill_SCo_updateInput();
	}
}
//==============================
// * 帧刷新 - 输入监听
//==============================
Scene_Map.prototype.drill_SCo_updateInput = function() {
	for(var i=0; i<$gameSystem._drill_SCo_list.length; i++){
		var data = $gameSystem._drill_SCo_list[i];
		if( data == undefined ){ continue; }
		if( data['enable'] == false ){ continue; }
		
		// > 鼠标监听
		if( data['mouse_enable'] == true ){
			if( data['mouse_seq'].length == 0 ){ continue; }
			// > 序列完成
			if( data['mouse_cur'] >= data['mouse_seq'].length ){
				this.drill_SCo_doCommonEvent( data );
				data['mouse_cur'] = 0;
				continue;
			}
			// > 序列+1
			if( this.drill_SCo_isAnyOnMouse() ){
				var seq = data['mouse_seq'][ Math.floor(data['mouse_cur']) ];
				if( this.drill_SCo_isOnMouse( seq ) ){
					data['mouse_cur'] += 1;
				}else{
					data['mouse_cur'] = 0;
				}
			}
		}
		// > 键盘监听
		if( data['key_enable'] == true ){
			if( data['key_seq'].length == 0 ){ continue; }
			// > 序列完成
			if( data['key_cur'] >= data['key_seq'].length ){
				this.drill_SCo_doCommonEvent( data );
				data['key_cur'] = 0;
				continue;
			}
			// > 序列+1
			if( Input.drill_isAnyKeyReleased() ){
				var seq = data['key_seq'][ Math.floor(data['key_cur']) ];
				if( Input.drill_isKeyReleased( String(seq).toLowerCase() ) ){
					data['key_cur'] += 1;
				}else{
					data['key_cur'] = 0;
				}
			}
		}
		// > 手柄监听
		if( data['pad_enable'] == true ){
			if( data['pad_seq'].length == 0 ){ continue; }
			// > 序列完成
			if( data['pad_cur'] >= data['pad_seq'].length ){
				this.drill_SCo_doCommonEvent( data );
				data['pad_cur'] = 0;
				continue;
			}
			// > 序列+1
			if( Input.drill_isAnyPadReleased() ){
				var seq = data['pad_seq'][ Math.floor(data['pad_cur']) ];
				if( Input.drill_isPadReleased( String(seq).toUpperCase() ) ){
					data['pad_cur'] += 1;
				}else{
					data['pad_cur'] = 0;
				}
			}
		}
		
	}
}
//==============================
// * 帧刷新 - 执行公共事件
//==============================
Scene_Map.prototype.drill_SCo_doCommonEvent = function( data ){
	// > 战斗界面的公共事件
	if( SceneManager._scene.constructor.name === "Scene_Battle" ){
		$gameTemp.reserveCommonEvent( data['commonEventId'] );
	}
	// > 地图界面的公共事件
	if( SceneManager._scene.constructor.name === "Scene_Map" ){
		if( Imported.Drill_LayerCommandThread ){
			var e_data = {
				'type':"公共事件",
				'pipeType': data['pipeType'],
				'commonEventId': data['commonEventId'],
			};
			$gameMap.drill_LCT_addPipeEvent( e_data );
		}else{
			$gameTemp.reserveCommonEvent( data['commonEventId'] );
		}
	}
}
//==============================
// * 帧刷新 - 鼠标按下监听
//==============================
Scene_Map.prototype.drill_SCo_isAnyOnMouse = function() {
	if( TouchInput.drill_isLeftReleased() ){ return true };
	if( TouchInput.drill_isRightReleased() ){ return true };
	if( TouchInput.drill_isMiddleReleased() ){ return true };
	//鼠标滚轮是持续性动作，这里不能记录，否则 上滚 + 上滚 无法识别。
	return false;	
};
//==============================
// * 帧刷新 - 鼠标按下类型监听
//==============================
Scene_Map.prototype.drill_SCo_isOnMouse = function( type ) {
	if( type == "左键释放[一帧]" ){
		if( TouchInput.drill_isLeftReleased() ){ return true };
	}else if( type == "右键释放[一帧]" ){
		if( TouchInput.drill_isRightReleased() ){ return true };
	}else if( type == "滚轮释放[一帧]" ){
		if( TouchInput.drill_isMiddleReleased() ){ return true };
	}
	return false;	
};

//=============================================================================
// ** 战斗界面
//=============================================================================
//==============================
// * 帧刷新
//==============================
var _drill_SCo_b_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_SCo_b_update.call(this);
	if( this.isActive() ){
		this.drill_SCo_updateInput();
	}
}
//==============================
// * 帧刷新 - 输入监听
//==============================
Scene_Battle.prototype.drill_SCo_updateInput = Scene_Map.prototype.drill_SCo_updateInput;
//==============================
// * 帧刷新 - 执行公共事件
//==============================
Scene_Battle.prototype.drill_SCo_doCommonEvent = Scene_Map.prototype.drill_SCo_doCommonEvent;
//==============================
// * 帧刷新 - 鼠标按下监听
//==============================
Scene_Battle.prototype.drill_SCo_isAnyOnMouse = Scene_Map.prototype.drill_SCo_isAnyOnMouse;
//==============================
// * 帧刷新 - 鼠标按下类型监听
//==============================
Scene_Battle.prototype.drill_SCo_isOnMouse = Scene_Map.prototype.drill_SCo_isOnMouse;



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_SecretCode = false;
		alert(
			"【Drill_SecretCode.js 键盘 - 秘籍输入器】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心" 
		);
}


