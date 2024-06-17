//=============================================================================
// Drill_OperateSecretCode.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        键盘 - 秘籍输入器
 * @author Drill_up
 * 
 * @Drill_LE_param "秘籍-%d"
 * @Drill_LE_parentKey "---秘籍组%d至%d---"
 * @Drill_LE_var "DrillUp.g_OSCo_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_OperateSecretCode +++
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
 *   - Drill_CoreOfInput           系统-输入设备核心
 * 被扩展：
 *   - Drill_LayerCommandThread    地图-多线程
 *   - Drill_BattleCommandThread   战斗-多线程
 *     多线程插件可以使得秘籍的公共事件执行 串行/并行 操作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   秘籍输入只在 地图、战斗 有效。
 * 2.你需要去看看 "1.系统 > 关于输入设备核心（入门篇）.docx"。
 * 输入设备：
 *   (1.插件对鼠标、键盘、手柄有效，不支持触屏。
 *   (2.插件只支持 物理按键，不支持 逻辑按键。
 *      并且插件不识别 鼠标滚轮的上下滚动 的情况。
 *   (3.注意，秘籍的键盘/手柄按键不要出现 菜单键 对应的物理按键。
 *      因为进入菜单返回地图后，按键会被重新统计。
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
 * 手柄的物理按键：
 *   (1.你可以设置手柄按键，填入以下字符关键字：
 *       A B X Y LB RB LT RT
 *       SELECT START 左摇杆按键 右摇杆按键
 *       按键上 按键下 按键左 按键右
 *       左摇杆上 左摇杆下 左摇杆左 左摇杆右
 *       右摇杆上 右摇杆下 右摇杆左 右摇杆右
 *   (2.大部分游戏中，按键的上/下/左/右 等同于 左摇杆的上/下/左/右，
 *      但从物理按键的角度来看，二者是不同键位，设计时注意区分。
 *      另外，现在的手柄设计都主要以左摇杆来控制移动，按键反而很少用。
 * 鼠标的物理按键：
 *   (1.鼠标有三个键位：左键、中键/滚轮、右键。鼠标中键与鼠标滚轮是同一个键。
 *      鼠标滚轮的 上滚和下滚 只在特殊情况下能支持，需要看具体应用场景。
 *      此处插件不识别 鼠标滚轮的上下滚动 的情况。
 * 公共事件：
 *   (1.该插件在 地图界面/战斗界面 都可以设置 串行/并行。
 *      具体看看 "31.公共事件 > 关于公共事件与并行.docx"。
 *   (2.注意，事件指令"显示文字"、"显示选项"等对话框功能 是特殊的指令体，
 *      只要执行对话框，就会被强制串行，阻塞其他所有事件的线程。
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
 * 插件指令：>开启秘籍 : 秘籍[1]
 * 插件指令：>关闭秘籍 : 秘籍[1]
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
 * [v1.6]
 * 优化了内部结构。
 * [v1.7]
 * 兼容了手柄 右摇杆 的物理按键。
 * [v1.8]
 * 修改了文件名称，添加了 战斗多线程 的支持。
 * 
 * 
 * 
 * @param ---秘籍组 1至20---
 * @default
 *
 * @param 秘籍-1
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-2
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-3
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-4
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-5
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-6
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-7
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-8
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-9
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-10
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-11
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-12
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-13
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-14
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-15
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-16
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-17
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-18
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-19
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-20
 * @parent ---秘籍组 1至20---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param ---秘籍组21至40---
 * @default
 *
 * @param 秘籍-21
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-22
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-23
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-24
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-25
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-26
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-27
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-28
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-29
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-30
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-31
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-32
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-33
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-34
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-35
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-36
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-37
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-38
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-39
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 * @param 秘籍-40
 * @parent ---秘籍组21至40---
 * @type struct<DrillOSCo>
 * @desc 秘籍绑定的配置信息。
 * @default 
 *
 */
/*~struct~DrillOSCo:
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
 * @desc 公共事件的执行方式。地图界面/战斗界面 都可以设置 串行/并行。
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
 * @desc 键盘物理按键的顺序设置，填入"上"、"空格"等，详细去看当前插件说明：键盘的物理按键。
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
 * @option SELECT
 * @value SELECT
 * @option START
 * @value START
 * @option 左摇杆按键
 * @value 左摇杆按键
 * @option 右摇杆按键
 * @value 右摇杆按键
 * @option 按键上
 * @value 按键上
 * @option 按键下
 * @value 按键下
 * @option 按键左
 * @value 按键左
 * @option 按键右
 * @value 按键右
 * @option 左摇杆上
 * @value 左摇杆上
 * @option 左摇杆下
 * @value 左摇杆下
 * @option 左摇杆左
 * @value 左摇杆左
 * @option 左摇杆右
 * @value 左摇杆右
 * @option 右摇杆上
 * @value 右摇杆上
 * @option 右摇杆下
 * @value 右摇杆下
 * @option 右摇杆左
 * @value 右摇杆左
 * @option 右摇杆右
 * @value 右摇杆右
 * @desc 手柄物理按键的顺序设置，指定顺序流程完成，即触发公共事件。建议设置的顺序数量超过10。
 * @default []
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		OSCo (Secret_Code)
//		临时全局变量	DrillUp.g_OSCo_xxx
//		临时局部变量	无
//		存储数据变量	$gameSystem._drill_OSCo_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	无
//		★性能测试消耗	无
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
//			->☆秘籍控制
//				->帧刷新绑定（地图界面）
//				->帧刷新绑定（战斗界面）
//				->鼠标监听
//				->键盘监听（只物理按键）
//				->手柄监听（只物理按键）
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.该插件只考虑 物理按键，逻辑按键不支持。
//			  目前不考虑多个手柄连接情况，这里只考虑一个手柄情况。
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
	DrillUp.g_OSCo_PluginTip_curName = "Drill_OperateSecretCode.js 键盘-秘籍输入器";
	DrillUp.g_OSCo_PluginTip_baseList = ["Drill_CoreOfInput.js 系统-输入设备核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_OSCo_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_OSCo_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_OSCo_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_OSCo_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_OSCo_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_OperateSecretCode = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_OperateSecretCode');
	
	
	//==============================
	// * 静态数据 - 秘籍触发
	//				（~struct~DrillOSCo）
	//==============================
	DrillUp.drill_OSCo_initDrillOSCo = function( dataFrom ){
		var data = {};
		
		data['enable'] = String( dataFrom["初始是否开启"] || "true") == "true";
		data['commonEventId'] = Number( dataFrom["执行的公共事件"] || 0);
		data['pipeType'] = String( dataFrom["公共事件执行方式"] || "串行");
		
		data['mouse_cur'] = 0;
		data['mouse_enable'] = String( dataFrom["是否启用鼠标触发"] || "false") == "true";
		if( dataFrom["鼠标触发顺序"] != undefined &&
			dataFrom["鼠标触发顺序"] != "" ){
			data['mouse_seq'] = JSON.parse( dataFrom["鼠标触发顺序"] );
		}else{
			data['mouse_seq'] = [];
		}
		
		data['key_cur'] = 0;
		data['key_enable'] = String( dataFrom["是否启用键盘触发"] || "false") == "true";
		if( dataFrom["键盘触发顺序"] != undefined &&
			dataFrom["键盘触发顺序"] != "" ){
			data['key_seq'] = JSON.parse( dataFrom["键盘触发顺序"] );
		}else{
			data['key_seq'] = [];
		}
		
		data['pad_cur'] = 0;
		data['pad_enable'] = String( dataFrom["是否启用手柄触发"] || "false") == "true";
		if( dataFrom["手柄触发顺序"] != undefined &&
			dataFrom["手柄触发顺序"] != "" ){
			data['pad_seq'] = JSON.parse( dataFrom["手柄触发顺序"] );
		}else{
			data['pad_seq'] = [];
		}
		
		return data;
	}
	
	/*-----------------秘籍------------------*/
	DrillUp.g_OSCo_list_length = 40;
	DrillUp.g_OSCo_list = [];
	for (var i = 0; i < DrillUp.g_OSCo_list_length; i++) {
		if( DrillUp.parameters["秘籍-" + String(i+1) ] != undefined &&
			DrillUp.parameters["秘籍-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["秘籍-" + String(i+1) ]);
			DrillUp.g_OSCo_list[i] = DrillUp.drill_OSCo_initDrillOSCo( data );
		}else{
			DrillUp.g_OSCo_list[i] = null;
		}
	}
	

//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_OSCo_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_OSCo_pluginCommand.call(this, command, args);
	if( command === ">开启秘籍" ){
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			temp1 = temp1.replace("秘籍[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			var data = $gameSystem._drill_OSCo_list[temp1];
			if( data == undefined ){ return; }
			data['enable'] = true;
		}
	};
	if( command === ">关闭秘籍" ){
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			temp1 = temp1.replace("秘籍[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			var data = $gameSystem._drill_OSCo_list[temp1];
			if( data == undefined ){ return; }
			data['enable'] = false;
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
DrillUp.g_OSCo_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_OSCo_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_OSCo_sys_initialize.call(this);
	this.drill_OSCo_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_OSCo_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_OSCo_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_OSCo_saveEnabled == true ){	
		$gameSystem.drill_OSCo_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_OSCo_initSysData();
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
Game_System.prototype.drill_OSCo_initSysData = function() {
	this.drill_OSCo_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_OSCo_checkSysData = function() {
	this.drill_OSCo_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_OSCo_initSysData_Private = function() {
	
	this._drill_OSCo_list = [];
	for(var i=0; i < DrillUp.g_OSCo_list.length; i++){
		var temp_data = DrillUp.g_OSCo_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_OSCo_list[i] = JSON.parse(JSON.stringify( temp_data ));
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_OSCo_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_OSCo_list == undefined ){
		this.drill_OSCo_initSysData();
	}
	
	// > 绑定数据容器
	for(var i = 0; i < DrillUp.g_OSCo_list.length; i++ ){
		var temp_data = DrillUp.g_OSCo_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_OSCo_list[i] == undefined ){
				this._drill_OSCo_list[i] = JSON.parse(JSON.stringify( temp_data ));
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};



//=============================================================================
// ** ☆秘籍控制
//
//			说明：	> 此模块专门控制 秘籍的序列，序列满后执行公共事件。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 秘籍控制 - 帧刷新绑定（地图界面）
//==============================
var _drill_OSCo_m_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_OSCo_m_update.call(this);
	if( this.isActive() ){
		this.drill_OSCo_updateInput();
	}
}
//==============================
// * 秘籍控制 - 帧刷新（地图界面）
//==============================
Scene_Map.prototype.drill_OSCo_updateInput = function() {
	for(var i=0; i<$gameSystem._drill_OSCo_list.length; i++){
		var data = $gameSystem._drill_OSCo_list[i];
		if( data == undefined ){ continue; }
		if( data['enable'] == false ){ continue; }
		
		// > 鼠标监听
		if( data['mouse_enable'] == true ){
			if( data['mouse_seq'].length == 0 ){ continue; }
			// > 序列完成
			if( data['mouse_cur'] >= data['mouse_seq'].length ){
				this.drill_OSCo_doCommonEvent( data );
				data['mouse_cur'] = 0;
				continue;
			}
			// > 序列+1
			if( this.drill_OSCo_isAnyOnMouse() ){
				var seq = data['mouse_seq'][ Math.floor(data['mouse_cur']) ];
				if( this.drill_OSCo_isOnMouse( seq ) ){
					data['mouse_cur'] += 1;	//（符合则索引+1，不符合则归零）
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
				this.drill_OSCo_doCommonEvent( data );
				data['key_cur'] = 0;
				continue;
			}
			// > 序列+1
			if( Input.drill_isAnyKeyReleased() ){
				var seq = data['key_seq'][ Math.floor(data['key_cur']) ];
				if( Input.drill_isKeyReleased( String(seq).toLowerCase() ) ){	//（物理按键监听）
					data['key_cur'] += 1;	//（符合则索引+1，不符合则归零）
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
				this.drill_OSCo_doCommonEvent( data );
				data['pad_cur'] = 0;
				continue;
			}
			// > 序列+1
			if( Input.drill_isAnyPadReleased() ){
				var seq = data['pad_seq'][ Math.floor(data['pad_cur']) ];
				if( Input.drill_isPadReleased( String(seq).toUpperCase() ) ){	//（物理按键监听）
					data['pad_cur'] += 1;	//（符合则索引+1，不符合则归零）
				}else{
					data['pad_cur'] = 0;
				}
			}
		}
		
	}
}
//==============================
// * 秘籍控制 - 『执行公共事件』（地图界面）
//==============================
Scene_Map.prototype.drill_OSCo_doCommonEvent = function( data ){
	
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
// * 秘籍控制 - 鼠标 - 按下监听
//
//			说明：	> 鼠标滚轮是持续性动作，这里不算记录，否则 上滚 + 上滚 无法识别。
//==============================
Scene_Map.prototype.drill_OSCo_isAnyOnMouse = function() {
	if( TouchInput.drill_isLeftReleased() ){ return true };
	if( TouchInput.drill_isRightReleased() ){ return true };
	if( TouchInput.drill_isMiddleReleased() ){ return true };
	return false;	
};
//==============================
// * 秘籍控制 - 鼠标 - 按下类型监听
//==============================
Scene_Map.prototype.drill_OSCo_isOnMouse = function( type ){
	if( type == "左键释放[一帧]" ){
		if( TouchInput.drill_isLeftReleased() ){ return true };
	}else if( type == "右键释放[一帧]" ){
		if( TouchInput.drill_isRightReleased() ){ return true };
	}else if( type == "滚轮释放[一帧]" ){
		if( TouchInput.drill_isMiddleReleased() ){ return true };
	}
	return false;	
};


//==============================
// * 秘籍控制 - 帧刷新绑定（战斗界面）
//==============================
var _drill_OSCo_b_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_OSCo_b_update.call(this);
	if( this.isActive() ){
		this.drill_OSCo_updateInput();
	}
}
//==============================
// * 秘籍控制 - 帧刷新（战斗界面）
//==============================
Scene_Battle.prototype.drill_OSCo_updateInput = Scene_Map.prototype.drill_OSCo_updateInput;
//==============================
// * 秘籍控制 - 『执行公共事件』（战斗界面）
//==============================
Scene_Battle.prototype.drill_OSCo_doCommonEvent = function( data ){
	
	// > 插件【战斗-多线程】
	if( Imported.Drill_BattleCommandThread ){
		var e_data = {
			'type':"公共事件",
			'pipeType': data['pipeType'],
			'commonEventId': data['commonEventId'],
		};
		$gameTroop.drill_BCT_addPipeEvent( e_data );
		
	// > 默认执行
	}else{
		$gameTemp.reserveCommonEvent( data['commonEventId'] );
	}
}
//==============================
// * 秘籍控制 - 鼠标 - 按下监听
//==============================
Scene_Battle.prototype.drill_OSCo_isAnyOnMouse = Scene_Map.prototype.drill_OSCo_isAnyOnMouse;
//==============================
// * 秘籍控制 - 鼠标 - 按下类型监听
//==============================
Scene_Battle.prototype.drill_OSCo_isOnMouse = Scene_Map.prototype.drill_OSCo_isOnMouse;



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_OperateSecretCode = false;
		var pluginTip = DrillUp.drill_OSCo_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


