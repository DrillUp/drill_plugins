//=============================================================================
// Drill_OperateKeyCommonEvent.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        键盘 - 键盘手柄触发公共事件
 * @author Drill_up
 * 
 * @Drill_LE_param "按键绑定-%d"
 * @Drill_LE_parentKey "---按键绑定组%d至%d---"
 * @Drill_LE_var "DrillUp.g_OKCE_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_OperateKeyCommonEvent +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得自定义的按键可以 额外触发 自定义的公共事件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 基于：
 *   - Drill_OperateKeys          键盘-键盘手柄按键修改器
 * 被扩展：
 *   - Drill_LayerCommandThread   地图-多线程
 *     多线程插件可以使得秘籍的公共事件执行 串行/并行 操作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于 键盘与手柄 。
 * 2.你需要了解基本的按键定义，去看看 "1.系统 > 关于输入设备核心.docx"。
 *   全部按键关系，可以去看看章节 按键关系表 。
 * 按键说明：
 *   (1.设置按键后，本身的功能不会变化，比如放置炸弹键按了仍然会放置炸弹。
 *      该插件 额外执行 自定义的公共事件。
 *   (2.注意，如果 按键的功能与公共事件 同时触发，
 *      那么会先执行按键功能，后执行公共事件。
 *      比如你设计了公共事件禁止炸弹，而这个按键也是 放置炸弹键，
 *      那么你按按键，并不能阻止炸弹的放置。
 *   (3.公共事件配置的都是 扩展键 。
 *      手柄支持 功能键+单键 的设置，键盘支持 A键+B键 的设置。
 * 键盘的物理按键：
 *   (1.你可以设置特殊的键盘按键，可以填入以下字符关键字：
 *       Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12
 *       ~ - = [ ] \ ; ' , . /
 *       Tab Shift Ctrl Alt 上 下 左 右 空格 Enter
 *       PageUp PageDown End Home Insert Delete
 *   (2.小键盘：
 *       Num0 Num1 Num2 Num3 Num4 Num5 Num6 Num7 Num8 Num9
 *       Num* Num+ Num- Num. Num/ NumEnter
 *   (3.注意，如果你想配置键盘的 空格，那么要填"空格"，而不是" "。
 * 手柄的物理按键：
 *   (1.你可以设置手柄按键，可以填入以下字符关键字：
 *       A B X Y LB RB LT RT
 *       SELECT START 左摇杆按键 右摇杆按键 上 下 左 右
 * 设计：
 *   (1.你可以设计钢琴小游戏，对应键盘上的不同按键，
 *      通过公共事件来捕获按的键盘按键。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 绑定开关
 * 你可以使用下列插件指令：
 *
 * 插件指令：>键盘手柄触发公共事件 : 按键绑定[1] : 开启
 * 插件指令：>键盘手柄触发公共事件 : 按键绑定[1] : 关闭
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
 * 测试结果：   200个事件的地图中，消耗为：【17.60ms】
 *              100个事件的地图中，消耗为：【12.53ms】
 *               50个事件的地图中，消耗为：【9.49ms】
 * 测试方法2：  在其它界面中进行性能测试。
 * 测试结果2：  战斗界面中，消耗为：【5.50ms】
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
 * @param ---按键绑定组 1至20---
 * @default
 *
 * @param 按键绑定-1
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-2
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-3
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-4
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-5
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-6
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-7
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-8
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-9
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-10
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-11
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-12
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-13
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-14
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-15
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-16
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-17
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-18
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-19
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-20
 * @parent ---按键绑定组 1至20---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param ---按键绑定组21至40---
 * @default
 *
 * @param 按键绑定-21
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-22
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-23
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-24
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-25
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-26
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-27
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-28
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-29
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-30
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-31
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-32
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-33
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-34
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-35
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-36
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-37
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-38
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-39
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 * @param 按键绑定-40
 * @parent ---按键绑定组21至40---
 * @type struct<DrillOKCE>
 * @desc 按键绑定绑定的配置信息。
 * @default 
 *
 */
/*~struct~DrillOKCE:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的按键绑定==
 *
 *
 * @param ---常规---
 * @default
 *
 * @param 初始是否开启
 * @parent ---常规---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。你可以在游戏中通过 插件指令 开启。
 * @default true
 *
 * @param 执行的公共事件
 * @parent ---常规---
 * @type common_event
 * @desc 下列的触发条件满足后，执行的公共事件。
 * @default 0
 *
 * @param 公共事件执行方式
 * @parent ---常规---
 * @type select
 * @option 串行
 * @value 串行
 * @option 并行
 * @value 并行
 * @desc 公共事件的执行方式。战斗界面中没有并行，只能串行。
 * @default 串行
 *
 *
 * @param ---手柄---
 * @default
 *
 * @param 是否启用手柄触发
 * @parent ---手柄---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 手柄按键
 * @parent ---手柄---
 * @type select
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
 * @option LT
 * @value LT
 * @option RT
 * @value RT
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @option 功能键 + A
 * @value 功能键 + A
 * @option 功能键 + B
 * @value 功能键 + B
 * @option 功能键 + X
 * @value 功能键 + X
 * @option 功能键 + Y
 * @value 功能键 + Y
 * @option 功能键 + LB
 * @value 功能键 + LB
 * @option 功能键 + RB
 * @value 功能键 + RB
 * @option 功能键 + LT
 * @value 功能键 + LT
 * @option 功能键 + RT
 * @value 功能键 + RT
 * @option 功能键 + SELECT
 * @value 功能键 + SELECT
 * @option 功能键 + START
 * @value 功能键 + START
 * @option 功能键 + 左摇杆按键
 * @value 功能键 + 左摇杆按键
 * @option 功能键 + 右摇杆按键
 * @value 功能键 + 右摇杆按键
 * @desc 手柄的按键设置。
 * @default Y
 *
 *
 * @param ---键盘---
 * @default
 *
 * @param 是否启用键盘触发
 * @parent ---键盘---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 键盘按键
 * @parent ---键盘---
 * @type text[]
 * @desc 能填 A 或A + B两个组合键，加号两边可有空格。填入字符或者键盘特殊按键。
 * @default ["z"]
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		OKCE（Operate_Key_Common_Event）
//		临时全局变量	DrillUp.g_OKCE_xxxx
//		临时局部变量	$gameTemp._drill_OKCE_xxx
//		存储数据变量	$gameSystem._drill_OKCE_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	键盘管理层
//		★性能测试消耗	5.5ms（drill_OKCE_updateCommonEvent）17.6ms（drill_OKCE_isCommonTriggered）
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
//			->☆映射数据继承 - 手柄
//			->☆映射数据继承 - 键盘
//			->☆逻辑按键条件判定继承
//
//			->☆公共事件控制
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
//			1.该插件继承 Drill_OperateKeys 的函数，实现了 自定义逻辑按键 功能。
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
	DrillUp.g_OKCE_PluginTip_curName = "Drill_OperateKeyCommonEvent.js 键盘-键盘手柄触发公共事件";
	DrillUp.g_OKCE_PluginTip_baseList = ["Drill_OperateKeys.js 键盘-键盘手柄按键修改器"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_OKCE_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_OKCE_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_OKCE_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_OKCE_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_OKCE_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_OperateKeyCommonEvent = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_OperateKeyCommonEvent');
	
	
	//==============================
	// * 静态数据 - 按键绑定
	//				（~struct~DrillOKCE）
	//==============================
	DrillUp.drill_OKCE_initDrillOKCE = function( dataFrom ){
		var data = {};
		
		// > 常规
		data['enabled'] = String( dataFrom["初始是否开启"] || "true") == "true";
		data['commonEventId'] = Number( dataFrom["执行的公共事件"] || 0);
		data['pipeType'] = String( dataFrom["公共事件执行方式"] || "串行");
		
		// > 手柄
		data['pad_enable'] = String( dataFrom["是否启用手柄触发"] || "false") == "true";
		data['pad_key'] = String( dataFrom["手柄按键"] || "" );
		
		// > 键盘
		data['keyboard_enable'] = String( dataFrom["是否启用键盘触发"] || "false") == "true";
		if( dataFrom["键盘按键"] != undefined &&
			dataFrom["键盘按键"] != "" ){
			data['keyboard_key'] = JSON.parse( dataFrom["键盘按键"] );
		}else{
			data['keyboard_key'] = [];
		}
		
		return data;
	}
	
	/*-----------------按键绑定------------------*/
	DrillUp.g_OKCE_list_length = 40;
	DrillUp.g_OKCE_list = [];
	for (var i = 0; i < DrillUp.g_OKCE_list_length; i++) {
		if( DrillUp.parameters["按键绑定-" + String(i+1) ] != undefined &&
			DrillUp.parameters["按键绑定-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["按键绑定-" + String(i+1) ]);
			DrillUp.g_OKCE_list[i] = DrillUp.drill_OKCE_initDrillOKCE( data );
		}else{
			DrillUp.g_OKCE_list[i] = null;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_OperateKeys ){



//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_OKCE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_OKCE_pluginCommand.call(this, command, args);
	if( command === ">键盘手柄触发公共事件" ){
		
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1.indexOf("按键绑定[") != -1 ){
				temp1 = temp1.replace("按键绑定[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
					$gameSystem._drill_OKCE_enableTank[ temp1 ] = true;
				}
				if( temp2 == "关闭" || temp2 == "禁用" ){
					$gameSystem._drill_OKCE_enableTank[ temp1 ] = false;
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
DrillUp.g_OKCE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_OKCE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_OKCE_sys_initialize.call(this);
	this.drill_OKCE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_OKCE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_OKCE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_OKCE_saveEnabled == true ){	
		$gameSystem.drill_OKCE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_OKCE_initSysData();
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
Game_System.prototype.drill_OKCE_initSysData = function() {
	this.drill_OKCE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_OKCE_checkSysData = function() {
	this.drill_OKCE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_OKCE_initSysData_Private = function() {
	
	this._drill_OKCE_enableTank = [];
	for(var i = 0; i < DrillUp.g_OKCE_list.length; i++){
		var temp_data = DrillUp.g_OKCE_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_OKCE_enableTank[i] = temp_data['enabled'];
	}
	
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_OKCE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_OKCE_enableTank == undefined ){
		this.drill_OKCE_initSysData();
	}
};



//=============================================================================
// ** ☆映射数据继承 - 手柄
//
//			说明：	> 此模块专门控制 手柄键位，建立 映射数据。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 手柄 - 映射数据 初始化（继承）
//==============================
var _drill_OKCE_OKe_gamePadKeys_RefreshData = Game_Temp.prototype.drill_OKe_gamePadKeys_RefreshData;
Game_Temp.prototype.drill_OKe_gamePadKeys_RefreshData = function() {
	_drill_OKCE_OKe_gamePadKeys_RefreshData.call( this );
	
	// > 映射数据 - 扩展键
	var bean_tank = this._drill_OKe_pad_BeanTank;
	for(var i=0; i < DrillUp.g_OKCE_list.length; i++ ){
		var data = DrillUp.g_OKCE_list[i];
		if( data == undefined ){ continue; }
		if( data['pad_enable'] != true ){ continue; }
		
		var name = "common" + i ;
		var key = "data_" + name;
		bean_tank[key] = new Drill_OKe_PadBean();
		bean_tank[key].drill_bean_setNameAndStrValue_Extend( name, data['pad_key'] );
	}
	
}
//==============================
// * 手柄 - 映射数据 生成映射（继承）
//==============================
var _drill_OKCE_OKe_gamePadKeys_RefreshMapper = Game_Temp.prototype.drill_OKe_gamePadKeys_RefreshMapper;
Game_Temp.prototype.drill_OKe_gamePadKeys_RefreshMapper = function() {
	_drill_OKCE_OKe_gamePadKeys_RefreshMapper.call( this );
	
	// > 合并重复映射
	var pad_I = this._drill_OKe_pad_LogicMapperInverse;
	var pad_F = this._drill_OKe_pad_LogicMapperForward;
	for(var i=0; i < DrillUp.g_OKCE_list.length; i++ ){
		var data = DrillUp.g_OKCE_list[i];
		if( data == undefined ){ continue; }
		if( data['pad_enable'] != true ){ continue; }
	
		var name = "common" + i ;
		var key = "data_" + name;
		if( pad_I[key] != undefined ){
			var temp_value = pad_I[key]._drill_value;
			var f_name = pad_F[ temp_value ];
			if( f_name != undefined ){
				pad_I[key]._drill_name = f_name;		//（若重复，则关联重复key）
			}
		}
	}
}


//=============================================================================
// ** ☆映射数据继承 - 键盘
//
//			说明：	> 此模块专门控制 键盘键位，建立 映射数据。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 键盘 - 映射数据 初始化（继承）
//==============================
var _drill_OKCE_OKe_keyboardKeys_RefreshData = Game_Temp.prototype.drill_OKe_keyboardKeys_RefreshData;
Game_Temp.prototype.drill_OKe_keyboardKeys_RefreshData = function() {
	_drill_OKCE_OKe_keyboardKeys_RefreshData.call( this );
	
	// > 映射数据 - 扩展键
	var bean_tank = this._drill_OKe_keyboard_BeanTank;
	for(var i=0; i < DrillUp.g_OKCE_list.length; i++ ){
		var data = DrillUp.g_OKCE_list[i];
		if( data == undefined ){ continue; }
		if( data['keyboard_enable'] != true ){ continue; }
		
		var name = "common" + i ;
		var key = "dataList_" + name;
		bean_tank[key] = this.drill_OKe_keyboard_getBeanList_Extend( name, data['keyboard_key'] );
	}
}


//=============================================================================
// ** ☆逻辑按键条件判定继承
//
//			说明：	> 此模块专门提供 逻辑按键 条件判定，基于前面的映射数据。
//					  注意，不提供其他操作，只提供 逻辑按键 是否按下的条件判定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 条件判定 - 按键判断
//==============================
Game_Temp.prototype.drill_OKCE_isCommonTriggered = function( i ){
	var data = DrillUp.g_OKCE_list[i];
	if( data == undefined ){ return false; }
	if( $gameSystem._drill_OKCE_enableTank[i] != true ){ return false; }
	
	// > 手柄
	if( Input.drill_OKe_isGamepadControling() ){
		if( data['pad_enable'] != true ){ return false; }
		
		var name = "common" + i ;
		var key = "data_" + name;
		var bean = this._drill_OKe_pad_LogicMapperInverse[key];
		var bean_fn = this._drill_OKe_pad_LogicMapperInverse['data_fn'];
		if( bean == undefined ){ return false; }
		if( bean_fn == undefined ){ return false; }
		
		// > 手柄 - 功能键+单键
		if( bean._drill_has_fn == true ){
			Input._drill_OKe_pad_isInFnOnce = true;	//（不阻塞标记）
			return  Input.isTriggered( bean._drill_name ) == true && 
					Input.isPressed( bean_fn._drill_name ) == true;
		}
		
		// > 手柄 - 单键
		return Input.isTriggered( bean._drill_name ) == true && 
			   Input.isPressed( bean_fn._drill_name ) == false;
		
	// > 键盘
	}else{
		if( data['keyboard_enable'] != true ){ return; }
		
		var name = "common" + i ;
		var key = "dataList_" + name;
		var bean_tank = this._drill_OKe_keyboard_LogicMapperInverse[key];
		for( var i=0; i < bean_tank.length; i++ ){
			var bean = bean_tank[i];
			if( bean == undefined ){ continue; }
			if( bean.drill_bean_isTriggered() ){
				return true;
			}
		}
		return false;
	}
}



//=============================================================================
// ** ☆公共事件控制
//
//			说明：	> 此模块专门控制 公共事件 执行。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 公共事件控制 - 『执行公共事件』（地图界面）
//==============================
Scene_Map.prototype.drill_OKCE_doCommonEvent = function( data ){
	
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
var _drill_OKCE_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_OKCE_Map_update.call(this);
	this.drill_OKCE_updateCommonEvent();
};
//==============================
// * 公共事件控制 - 帧刷新（地图界面）
//==============================
Scene_Map.prototype.drill_OKCE_updateCommonEvent = function() {
	
	for(var i=0; i < DrillUp.g_OKCE_list.length; i++ ){
		var data = DrillUp.g_OKCE_list[i];
		if( data == undefined ){ continue; }
		
		// > 按键后 执行公共事件
		if( $gameTemp.drill_OKCE_isCommonTriggered( i ) ){
			this.drill_OKCE_doCommonEvent( data );
		}
	}
};

//==============================
// * 公共事件控制 - 『执行公共事件』（战斗界面）
//==============================
Scene_Battle.prototype.drill_OKCE_doCommonEvent = function( data ){
	
	// > 默认执行
	$gameTemp.reserveCommonEvent( data['commonEventId'] );
}
//==============================
// * 公共事件控制 - 帧刷新绑定（战斗界面）
//==============================
var _drill_OKCE_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _drill_OKCE_Battle_update.call(this);
	this.drill_OKCE_updateCommonEvent();
};
//==============================
// * 公共事件控制 - 帧刷新（战斗界面）
//==============================
Scene_Battle.prototype.drill_OKCE_updateCommonEvent = Scene_Map.prototype.drill_OKCE_updateCommonEvent;



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_OperateKeyCommonEvent = false;
		var pluginTip = DrillUp.drill_OKCE_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


