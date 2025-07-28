//=============================================================================
// Drill_EventBufferSwitches.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        物体管理 - 事件的缓存开关值
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventBufferSwitches +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以将开关的值存储到事件身上，节约开关的占用，但离开地图失效。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 需要基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfNumberArray     系统-变量数组核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对事件有效。
 * 2.更多相关内容，去看看 "28.物体管理 > 关于事件的缓存数据.docx"。
 *   如果你想批量操作，可以看看 "1.系统 > 关于变量数组核心.docx"。
 * 细节：
 *   (1.设计物体触发时，经常会大量使用开关并赋值，事件越多，开关也用的越多。
 *      比如事件的连续技能、延迟动画等功能。
 *      这些功能并行执行时会长期占用一些开关，这些开关不能被其他事件使用否则会乱。
 *      这时候，你可以将这些 开关值 存储在事件中，以节约开关占用。
 *   (2.存储的开关跨事件页，并且能与事件一起保存在存档中。
 *      但注意，存储的开关离开地图即失效，因为离开地图事件会被全部销毁。
 * 设计：
 *   (1.缓存开关的应用场景与缓存变量的应用场景一样，
 *      都是在大量事件并行执行指令时，确保对应的变量、开关不冲突。
 *      先存储到事件，等待几帧，然后再读取，拿出值使用。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 单事件时
 * 你可以通过设置插件指令，对指定事件进行存储：
 * 
 * 插件指令：>事件的缓存开关值 : 本事件 : 存储开关值 : 槽位[1] : 开关[21]
 * 插件指令：>事件的缓存开关值 : 事件[10] : 存储开关值 : 槽位[1] : 开关[21]
 * 插件指令：>事件的缓存开关值 : 事件变量[21] : 存储开关值 : 槽位[1] : 开关[21]
 * 
 * 插件指令：>事件的缓存开关值 : 本事件 : 存储-开关给槽位 : 槽位[1] : 开关[21]
 * 插件指令：>事件的缓存开关值 : 本事件 : 存储-开关给槽位 : 槽位[自定义名] : 开关[21]
 * 插件指令：>事件的缓存开关值 : 本事件 : 存储-值给槽位 : 槽位[1] : 值[ON]
 * 插件指令：>事件的缓存开关值 : 本事件 : 存储-值给槽位 : 槽位[自定义名] : 值[ON]
 * 插件指令：>事件的缓存开关值 : 本事件 : 读取-槽位给开关 : 槽位[1] : 开关[21]
 * 插件指令：>事件的缓存开关值 : 本事件 : 读取-槽位给开关 : 槽位[自定义名] : 开关[21]
 * 插件指令：>事件的缓存开关值 : 本事件 : 读取-槽位给开关 : 槽位[1] : 开关[21] : 槽位为空则赋值[ON]
 * 插件指令：>事件的缓存开关值 : 本事件 : 读取-槽位给开关 : 槽位[自定义名] : 开关[21] : 槽位为空则赋值[OFF]
 * 
 * 1.前半部分（本事件）和 后半部分（存储开关值 : 槽位[1] : 开关[21]）
 *   的参数可以随意组合。一共有3*6种组合方式。
 * 2."存储开关值"执行后，开关的值将存储到槽位中。
 *   "读取开关值"执行后，槽位中的值将赋值给开关。
 *   "槽位[]"中可以是数字、文本，但不能出现逗号。
 * 3."读取失败则赋值"多用于批量事件的情况，有的事件存储了值，有的事件没存。
 *   没存的事件，默认赋值OFF，设置"读取失败则赋值"，可以自定义这个默认赋值。
 *   插件指令值中写"ON"、"OFF"或者写"true"、"false"都可以，大小写也都支持。
 * 4.指令只在当前地图有效，离开地图后会失效，因为事件被销毁重建了。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 单事件的注释
 * 你可以通过设置事件注释，进行初始化赋值：
 * 
 * 事件注释：=>事件的缓存开关值 : 存储-值给槽位-跨事件页 : 槽位[1] : 值[ON]
 * 事件注释：=>事件的缓存开关值 : 存储-值给槽位-跨事件页 : 槽位[自定义名] : 值[ON]
 * 事件注释：=>事件的缓存开关值 : 存储-值给槽位-不跨事件页 : 槽位[1] : 值[ON]
 * 事件注释：=>事件的缓存开关值 : 存储-值给槽位-不跨事件页 : 槽位[自定义名] : 值[ON]
 * 
 * 1."不跨事件页" 是值每次事件页切换时，都会生效并赋值。
 *   "跨事件页" 是指事件创建时，也就是进入地图时，会被赋值一次，切换事件页不会被再次赋值。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - (批量槽位)时
 * 你还可以进行批量操作：
 * 
 * 插件指令：>事件的缓存开关值 : 本事件 : 存储-开关给槽位(批量槽位) : 批量槽位[1,3,2] : 批量开关[21,22,23]
 * 插件指令：>事件的缓存开关值 : 事件[10] : 存储-开关给槽位(批量槽位) : 批量槽位[1,3,2] : 批量开关[21,22,23]
 * 插件指令：>事件的缓存开关值 : 事件变量[21] : 存储-开关给槽位(批量槽位) : 批量槽位[1,3,2] : 批量开关[21,22,23]
 * 
 * 插件指令：>事件的缓存开关值 : 本事件 : 存储-开关给槽位(批量槽位) : 批量槽位[1,3,2] : 批量开关[21,22,23]
 * 插件指令：>事件的缓存开关值 : 本事件 : 存储-值给槽位(批量槽位) : 批量槽位[1,3,2] : 数组值[ON,ON,ON]
 * 插件指令：>事件的缓存开关值 : 本事件 : 读取-槽位给开关(批量槽位) : 批量槽位[1,3,2] : 批量开关[21,22,23]
 * 插件指令：>事件的缓存开关值 : 本事件 : 读取-槽位给开关(批量槽位) : 批量槽位[点数,分数] : 批量开关[21,22]
 * 插件指令：>事件的缓存开关值 : 本事件 : 读取-槽位给开关(批量槽位) : 批量槽位[点数,分数] : 批量开关[21,22] : 槽位为空则赋值[OFF]
 * 
 * 1.前半部分（本事件）和 后半部分（存储-开关给槽位(批量槽位) : 批量槽位[1,3,2] : 批量开关[21,22,23]）
 *   的参数可以随意组合。一共有3*4种组合方式。
 * 2."(批量槽位)"是指 单独一个事件，
 *   批量的开关值 存储到 批量的槽位 中，或者 批量的开关 从 批量的槽位 中获取值。
 *   槽位的数量 和 开关的数量 要一致。
 * 3.指令支持 "槽位[]" 自定义名称，但名称不能出现逗号。
 *   指令支持 "槽位为空则赋值"，插件指令值中写"ON"、"OFF"或者写"true"、"false"都可以，大小写也都支持。
 * 4.如果你想让"槽位[1,2,3]"存储相同的值，
 *   可以直接写"批量开关[21,21,21]"。
 * 5.注意，批量槽位和批量事件不能同时使用，只能选择其一进行批量赋值。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - (批量事件)时
 * 你还可以进行批量操作：
 * 
 * 插件指令：>事件的缓存开关值 : 批量事件[10,11] : 存储-开关给槽位(批量事件) : 槽位[1] : 批量开关[21,22]
 * 插件指令：>事件的缓存开关值 : 批量事件变量[21,22] : 存储-开关给槽位(批量事件) : 槽位[1] : 批量开关[21,22]
 * 插件指令：>事件的缓存开关值 : 事件变量数组[21] : 存储-开关给槽位(批量事件) : 槽位[1] : 批量开关[21,22]
 * 插件指令：>事件的缓存开关值 : 事件变量数组[数组名] : 存储-开关给槽位(批量事件) : 槽位[1] : 批量开关[21,22]
 * 
 * 插件指令：>事件的缓存开关值 : 批量事件[10,11] : 存储-开关给槽位(批量事件) : 槽位[1] : 批量开关[21,22]
 * 插件指令：>事件的缓存开关值 : 批量事件[10,11] : 存储-值给槽位(批量事件) : 槽位[1] : 数组值[ON,ON,ON]
 * 插件指令：>事件的缓存开关值 : 批量事件[10,11] : 读取-槽位给开关(批量事件) : 槽位[1] : 批量开关[21,22]
 * 插件指令：>事件的缓存开关值 : 批量事件[10,11] : 读取-槽位给开关(批量事件) : 槽位[点数] : 批量开关[21,22]
 * 插件指令：>事件的缓存开关值 : 批量事件[10,11] : 读取-槽位给开关(批量事件) : 槽位[点数] : 批量开关[21,22] : 槽位为空则赋值[OFF]
 * 
 * 1.前半部分（批量事件[10,11]）和 后半部分（存储-开关给槽位(批量事件) : 槽位[1] : 批量开关[21,22]）
 *   的参数可以随意组合。一共有4*4种组合方式。
 * 2."(批量事件)"是指 单独一个槽位，
 *   批量的开关值 存储到 每个事件的"槽位[1]" 中，或者 批量的开关 从 每个事件的"槽位[1]" 中获取值。
 *   事件的数量 和 开关的数量 要一致。
 * 3.指令支持 "槽位[]" 自定义名称，但名称不能出现逗号。
 *   指令支持 "槽位为空则赋值"，插件指令值中写"ON"、"OFF"或者写"true"、"false"都可以，大小写也都支持。
 * 4.注意，"(批量槽位)"和"(批量事件)"不能同时使用，只能选择其一进行批量存储/读取。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - (批量槽位)(批量事件)使用变量数组
 * 你还可以使用变量数组进行批量操作：
 * 
 * 插件指令：>事件的缓存开关值 : 本事件 : 存储-开关给槽位(批量槽位) : 槽位[1,3,2] : 变量数组[21]
 * 插件指令：>事件的缓存开关值 : 本事件 : 读取-槽位给开关(批量槽位) : 槽位[1,3,2] : 变量数组[21]
 * 插件指令：>事件的缓存开关值 : 本事件 : 读取-槽位给开关(批量槽位) : 槽位[1,3,2] : 变量数组[21] : 槽位为空则赋值[OFF]
 * 
 * 插件指令：>事件的缓存开关值 : 批量事件[10,11] : 存储-开关给槽位(批量事件) : 槽位[1] : 变量数组[22]
 * 插件指令：>事件的缓存开关值 : 批量事件[10,11] : 读取-槽位给开关(批量事件) : 槽位[1] : 变量数组[22]
 * 插件指令：>事件的缓存开关值 : 批量事件[10,11] : 读取-槽位给开关(批量事件) : 槽位[1] : 变量数组[22] : 槽位为空则赋值[OFF]
 * 
 * 1.注意，这里是开关值，虽然能支持 变量数组，但注意 开关和变量 是有区别的。
 *   你可以使用变量数组来执行批量 存储/读取，但是 槽位的数量/事件的数量 要与 数组长度一致。
 *   存入时，变量数组中，只有 0 被识别为OFF，其它值都识别为ON。
 *   读取时，所有OFF都会被转成 0，所有ON都会被转成 1。
 * 2.指令支持 "槽位[]" 自定义名称，但名称不能出现逗号。
 *   指令支持 "槽位为空则赋值"。
 * 3.详细操作可以去看看文档，有图解，方便理解。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口字符显示
 * 你可以通过设置窗口字符，显示缓存的开关值：
 * 
 * 窗口字符：\dEBS[12]
 * 窗口字符：\dEBS[事件[10]:12]
 * 窗口字符：\dEBS[事件变量[21]:12]
 * 
 * 1."\dEBS[12]"表示本事件的 槽位"12" 的值。
 *   "\dEBS[事件[10]:12]"表示事件id为10 的 槽位"12" 的值。
 *   如果指定槽位为空，则返回"null"文本。
 * 2.该窗口字符只能在地图界面中使用，其它界面都找不到值，会返回"null"文本。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - DEBUG
 * 你可以使用下面的插件指令：
 * 
 * 插件指令：>事件的缓存开关值 : 本事件 : DEBUG显示开关值
 * 插件指令：>事件的缓存开关值 : 事件[10] : DEBUG显示开关值
 * 插件指令：>事件的缓存开关值 : 事件变量[10] : DEBUG显示开关值
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
 * 测试方法：   给事件执行存储、读取开关值，测试性能。
 * 测试结果：   200个事件的地图中，消耗为：【5ms以下】
 *              100个事件的地图中，消耗为：【5ms以下】
 *               50个事件的地图中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于该插件为单次执行，性能几乎可以忽略。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 更新并兼容了新的窗口字符底层。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EBS（Event_Buffer_Switches）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	物体管理管理层
//		★性能测试消耗	2024/8/8：
//							》0.2ms（drill_EBS_getData）
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
//			->☆事件注释
//			->☆窗口字符应用之指代字符
//			
//			->☆物体的属性
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
//			暂无。
//			
//		★其它说明细节：
//			1.建立临时开关快速存储。
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
	DrillUp.g_EBS_PluginTip_curName = "Drill_EventBufferSwitches.js 物体管理-事件的缓存开关值";
	DrillUp.g_EBS_PluginTip_baseList = ["Drill_CoreOfNumberArray.js 系统-变量数组核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EBS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EBS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EBS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EBS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EBS_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EBS_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EBS_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 数组长度不一致
	//==============================
	DrillUp.drill_EBS_getPluginTip_ListLengthError = function( arrName1, arrName2 ){
		return "【" + DrillUp.g_EBS_PluginTip_curName + "】\n插件指令错误，"+arrName1+"和"+arrName2+"的数组长度不一致，无法执行指令。";
	};
	//==============================
	// * 提示信息 - 报错 - 必须使用批量槽位
	//==============================
	DrillUp.drill_EBS_getPluginTip_ListError_Slot = function(){
		return "【" + DrillUp.g_EBS_PluginTip_curName + "】\n插件指令错误，检测到指令中指向了多个槽位，而多个槽位必须使用指令\"存储-开关给槽位(批量槽位)\"或\"读取-槽位给开关(批量槽位)\"才能生效。注意看插件指令说明。";
	};
	//==============================
	// * 提示信息 - 报错 - 必须使用批量事件
	//==============================
	DrillUp.drill_EBS_getPluginTip_ListError_Event = function(){
		return "【" + DrillUp.g_EBS_PluginTip_curName + "】\n插件指令错误，检测到指令中指向了多个事件，而多个事件必须使用指令\"存储-开关给槽位(批量事件)\"或\"读取-槽位给开关(批量事件)\"才能生效。注意看插件指令说明。";
	};
	//==============================
	// * 提示信息 - 报错 - 窗口字符底层校验
	//==============================
	DrillUp.drill_EBS_getPluginTip_NeedUpdate_drawText = function(){
		return "【" + DrillUp.g_EBS_PluginTip_curName + "】\n检测到窗口字符核心版本过低。\n由于底层变化巨大，你需要更新 全部 窗口字符相关插件。\n去看看\"23.窗口字符 > 关于窗口字符底层全更新说明.docx\"进行更新。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventBufferSwitches = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventBufferSwitches');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfNumberArray ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_EBS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_EBS_pluginCommand.call(this, command, args);
	this.drill_EBS_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_EBS_pluginCommand = function( command, args ){
	if( command === ">事件的缓存开关值" ){
		
		/*-----------------对象组获取-事件组------------------*/
		var e_list = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_list == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				e_list = [ e ];
			}
			if( e_list == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EBS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_list.push( e );
				}
			}
			if( e_list == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_list = [];
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EBS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_list.push( e );
				}
			}
			if( e_list == null && unit.indexOf("事件变量数组[") != -1 ){
				unit = unit.replace("事件变量数组[","");
				unit = unit.replace("]","");
				e_list = [];
				var num_arr = $gameNumberArray.value( unit );	//（字符串参数）
				for( var k=0; k < num_arr.length; k++ ){
					var e_id = num_arr[k];
					if( $gameMap.drill_EBS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_list.push( e );
				}
			}
			if( e_list == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EBS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_list = [ e ];
			}
			if( e_list == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EBS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_list = [ e ];
			}
		}
		/*-----------------对象组获取-槽位组------------------*/
		var slot_list = null;
		if( args.length >= 6 ){
			var slot_str = String(args[5]);
			if( slot_list == null && slot_str.indexOf("批量槽位[") != -1 ){
				slot_str = slot_str.replace("批量槽位[","");
				slot_str = slot_str.replace("]","");
				slot_list = [];
				var slot_str_list = slot_str.split(/[,，]/);
				for( var k=0; k < slot_str_list.length; k++ ){
					slot_list.push( String(slot_str_list[k]) );
				}
			}
			if( slot_list == null && slot_str.indexOf("槽位[") != -1 ){
				slot_str = slot_str.replace("槽位[","");
				slot_str = slot_str.replace("]","");
				slot_list = [];
				var slot_str_list = slot_str.split(/[,，]/);
				for( var k=0; k < slot_str_list.length; k++ ){
					slot_list.push( String(slot_str_list[k]) );
				}
			}
		}
		/*-----------------对象组获取-开关组------------------*/
		var switchIdList = null;	//批量开关
		var valueList = null;		//数组值
		var arrId = null;			//变量数组（数据结构不一样，需要分别处理）
		if( args.length >= 8 ){
			var cur_str = String(args[7]);
			if( cur_str.indexOf("变量数组[") != -1 ){
				cur_str = cur_str.replace("变量数组[","");
				cur_str = cur_str.replace("]","");
				arrId = String( cur_str );	//（字符串名）
			}
			else if( cur_str.indexOf("批量开关[") != -1 ){
				cur_str = cur_str.replace("批量开关[","");
				cur_str = cur_str.replace("]","");
				switchIdList = [];
				var cur_str_list = cur_str.split(/[,，]/);
				for( var k=0; k < cur_str_list.length; k++ ){
					switchIdList.push( Number(cur_str_list[k]) );
				}
			}
			else if( cur_str.indexOf("开关[") != -1 ){
				cur_str = cur_str.replace("开关[","");
				cur_str = cur_str.replace("]","");
				switchIdList = [];
				switchIdList.push( Number(cur_str) );
			}
			else if( cur_str.indexOf("数组值[") != -1 ){
				cur_str = cur_str.replace("数组值[","");
				cur_str = cur_str.replace("]","");
				valueList = [];
				var cur_str_list = cur_str.split(/[,，]/);
				for( var k=0; k < cur_str_list.length; k++ ){
					valueList.push( Number(cur_str_list[k]) );
				}
			}
			else if( cur_str.indexOf("值[") != -1 ){
				cur_str = cur_str.replace("值[","");
				cur_str = cur_str.replace("]","");
				valueList = [];
				var cur_str_list = cur_str.split(/[,，]/);
				for( var k=0; k < cur_str_list.length; k++ ){
					valueList.push( Number(cur_str_list[k]) );
				}
			}
		}
		
		
		if( e_list != null    && e_list.length > 0    && 
			slot_list != null && slot_list.length > 0 && 
			args.length >= 8 ){
			var type = String(args[3]);
			
			/*-----------------存储与读取-单事件单槽位------------------*/
			if( type == "存储-开关给槽位" || type == "存储-值给槽位" ){
				
				// > 单事件单槽位 - 存储 校验
				if( e_list.length >= 2 ){
					alert( DrillUp.drill_EBS_getPluginTip_ListError_Event() );
					return;
				}
				if( slot_list.length >= 2 ){
					alert( DrillUp.drill_EBS_getPluginTip_ListError_Slot() );
					return;
				}
				
				// > 单事件单槽位 - 存储 批量开关（选第一个赋值）
				if( switchIdList != null ){
					var e = e_list[0];
					e.drill_EBS_setData( String(slot_list[0]), $gameSwitches.value( Number(switchIdList[0]) ) );
				}
				
				// > 单事件单槽位 - 存储 数组值
				if( valueList != null ){
					var e = e_list[0];
					e.drill_EBS_setData( String(slot_list[0]), String(valueList[0]) );
				}
				
				// > 单事件单槽位 - 存储 变量数组（不支持）
				if( arrId != null ){ }
			}
			if( type == "读取-槽位给开关" ){
				var default_enabled = -1;
				if( args[9] != undefined ){
					default_enabled = String(args[9]);
					default_enabled = default_enabled.replace("槽位为空则赋值[","");
					default_enabled = default_enabled.replace("]","");
					if( default_enabled.toLowerCase == "on" ){ default_enabled = true; }
					if( default_enabled.toLowerCase == "off" ){ default_enabled = false; }
					if( default_enabled.toLowerCase == "true" ){ default_enabled = true; }
					if( default_enabled.toLowerCase == "false" ){ default_enabled = false; }
				}
				
				// > 单事件单槽位 - 读取 校验
				if( e_list.length >= 2 ){
					alert( DrillUp.drill_EBS_getPluginTip_ListError_Event() );
					return;
				}
				if( slot_list.length >= 2 ){
					alert( DrillUp.drill_EBS_getPluginTip_ListError_Slot() );
					return;
				}
				
				// > 单事件单槽位 - 读取 批量开关（选第一个赋值）
				if( switchIdList != null ){
					var e = e_list[0];
					var v_e_enabled = e.drill_EBS_getData( String(slot_list[0]) );
					if( v_e_enabled == undefined ){
						$gameSwitches.setValue( Number(switchIdList[0]), default_enabled );
					}else{
						$gameSwitches.setValue( Number(switchIdList[0]), v_e_enabled );
					}
				}
				
				// > 单事件单槽位 - 读取 数组值（不支持，只有存值）
				if( valueList != null ){ }
				
				// > 单事件单槽位 - 读取 变量数组（不支持）
				if( arrId != null ){ }
			}
			
			/*-----------------存储与读取-单事件多槽位 (批量槽位)------------------*/
			if( type == "存储-开关给槽位(批量槽位)" || type == "存储-值给槽位(批量槽位)" ){
				
				// > 单事件多槽位 - 存储 校验
				if( e_list.length >= 2 ){
					alert( DrillUp.drill_EBS_getPluginTip_ListError_Event() );
					return;
				}
				
				// > 单事件多槽位 - 存储 批量开关
				if( switchIdList != null ){
					if( switchIdList.length != slot_list.length ){
						alert( DrillUp.drill_EBS_getPluginTip_ListLengthError("批量槽位","批量开关") );
						return;
					}
					var e = e_list[0];
					for(var k = 0; k < switchIdList.length; k++){
						e.drill_EBS_setData( String(slot_list[k]), $gameSwitches.value( Number(switchIdList[k]) ) );
					}
				}
				// > 单事件多槽位 - 存储 数组值
				if( valueList != null ){
					if( valueList.length != slot_list.length ){
						alert( DrillUp.drill_EBS_getPluginTip_ListLengthError("批量槽位","数组值") );
						return;
					}
					var e = e_list[0];
					for(var k = 0; k < slot_list.length; k++){
						e.drill_EBS_setData( String(slot_list[k]), String(valueList[k]) );
					}
				}
				// > 单事件多槽位 - 存储 变量数组
				if( arrId != null ){
					var num_arr = $gameNumberArray.value( arrId );
					if( num_arr.length != slot_list.length ){
						alert( DrillUp.drill_EBS_getPluginTip_ListLengthError("批量槽位","变量数组") );
						return;
					}
					var e = e_list[0];
					for(var k = 0; k < slot_list.length; k++){
						e.drill_EBS_setData( String(slot_list[k]), num_arr[k] );
					}
				}
			}
			if( type == "读取-槽位给开关(批量槽位)" ){
				var default_enabled = -1;
				if( args[9] ){
					default_enabled = String(args[9]);
					default_enabled = default_enabled.replace("槽位为空则赋值[","");
					default_enabled = default_enabled.replace("]","");
					if( default_enabled.toLowerCase == "on" ){ default_enabled = true; }
					if( default_enabled.toLowerCase == "off" ){ default_enabled = false; }
					if( default_enabled.toLowerCase == "true" ){ default_enabled = true; }
					if( default_enabled.toLowerCase == "false" ){ default_enabled = false; }
				}
				
				// > 单事件多槽位 - 读取 校验
				if( e_list.length >= 2 ){
					alert( DrillUp.drill_EBS_getPluginTip_ListError_Event() );
					return;
				}
				
				// > 单事件多槽位 - 读取 批量开关
				if( switchIdList != null ){
					if( switchIdList.length != slot_list.length ){
						alert( DrillUp.drill_EBS_getPluginTip_ListLengthError("批量槽位","批量开关") );
						return;
					}
					var e = e_list[0];
					for(var k = 0; k < switchIdList.length; k++){
						var v_e_enabled = e.drill_EBS_getData( String(slot_list[k]) );
						if( v_e_enabled == undefined ){
							$gameSwitches.setValue( Number(switchIdList[k]), default_enabled );
						}else{
							$gameSwitches.setValue( Number(switchIdList[k]), v_e_enabled );
						}
					}
				}
				// > 单事件多槽位 - 读取 数组值（不支持，只有存值）
				if( valueList != null ){ }
				// > 单事件多槽位 - 读取 变量数组
				if( arrId != null ){
					var num_arr = [];	//（读取时，变量数组长度可以不一致）
					var e = e_list[0];
					for(var k = 0; k < slot_list.length; k++){
						var v_e_enabled = e.drill_EBS_getData( String(slot_list[k]) );
						if( v_e_enabled == undefined ){
							if( default_enabled == true){	//（布尔列表 转 数字列表）
								num_arr[k] = 1;
							}else{
								num_arr[k] = 0;
							}
						}else{
							if( v_e_enabled == true){
								num_arr[k] = 1;
							}else{
								num_arr[k] = 0;
							}
						}
					}
					$gameNumberArray.setValue( arrId, num_arr );
				}
			}
			
			/*-----------------存储与读取-多事件单槽位 (批量事件)------------------*/
			if( type == "存储-开关给槽位(批量事件)" || type == "存储-值给槽位(批量事件)" ){
				
				// > 多事件单槽位 - 存储 校验
				if( slot_list.length >= 2 ){
					alert( DrillUp.drill_EBS_getPluginTip_ListError_Slot() );
					return;
				}
				
				// > 多事件单槽位 - 存储 批量开关
				if( switchIdList != null ){
					if( switchIdList.length != e_list.length ){
						alert( DrillUp.drill_EBS_getPluginTip_ListLengthError("批量事件","批量开关") );
						return;
					}
					for(var k = 0; k < switchIdList.length; k++){
						var e = e_list[k];
						e.drill_EBS_setData( String(slot_list[0]), $gameSwitches.value( Number(switchIdList[k]) ) );
					}
				}
				// > 多事件单槽位 - 存储 数组值
				if( valueList != null ){
					if( valueList.length != e_list.length ){
						alert( DrillUp.drill_EBS_getPluginTip_ListLengthError("批量事件","数组值") );
						return;
					}
					for(var k = 0; k < e_list.length; k++){
						var e = e_list[k];
						e.drill_EBS_setData( String(slot_list[0]), String(valueList[k]) );
					}
				}
				// > 多事件单槽位 - 存储 变量数组
				if( arrId != null ){
					var num_arr = $gameNumberArray.value( arrId );
					if( num_arr.length != e_list.length ){
						alert( DrillUp.drill_EBS_getPluginTip_ListLengthError("批量事件","变量数组") );
						return;
					}
					for(var k = 0; k < e_list.length; k++){
						var e = e_list[k];
						e.drill_EBS_setData( String(slot_list[0]), num_arr[k] );
					}
				}
			}
			if( type == "读取-槽位给开关(批量事件)" ){
				var default_enabled = -1;
				if( args[9] ){
					default_enabled = String(args[9]);
					default_enabled = default_enabled.replace("槽位为空则赋值[","");
					default_enabled = default_enabled.replace("]","");
					if( default_enabled.toLowerCase == "on" ){ default_enabled = true; }
					if( default_enabled.toLowerCase == "off" ){ default_enabled = false; }
					if( default_enabled.toLowerCase == "true" ){ default_enabled = true; }
					if( default_enabled.toLowerCase == "false" ){ default_enabled = false; }
				}
				
				// > 多事件单槽位 - 读取 校验
				if( slot_list.length >= 2 ){
					alert( DrillUp.drill_EBS_getPluginTip_ListError_Slot() );
					return;
				}
				
				// > 多事件单槽位 - 读取 批量开关
				if( switchIdList != null ){
					if( switchIdList.length != e_list.length ){
						alert( DrillUp.drill_EBS_getPluginTip_ListLengthError("批量事件","批量开关") );
						return;
					}
					for(var k = 0; k < switchIdList.length; k++){
						var e = e_list[k];
						var v_e_enabled = e.drill_EBS_getData( String(slot_list[0]) );
						if( v_e_enabled == undefined ){
							$gameSwitches.setValue( Number(switchIdList[k]), default_enabled );
						}else{
							$gameSwitches.setValue( Number(switchIdList[k]), v_e_enabled );
						}
					}
				}
				// > 多事件单槽位 - 读取 数组值（不支持，只有存值）
				if( valueList != null ){ }
				// > 多事件单槽位 - 读取 变量数组
				if( arrId != null ){
					var num_arr = [];	//（读取时，变量数组长度可以不一致）
					for(var k = 0; k < e_list.length; k++){
						var e = e_list[k];
						var v_e_enabled = e.drill_EBS_getData( String(slot_list[0]) );
						if( v_e_enabled == undefined ){
							if( default_enabled == true){	//（布尔列表 转 数字列表）
								num_arr[k] = 1;
							}else{
								num_arr[k] = 0;
							}
						}else{
							if( v_e_enabled == true){
								num_arr[k] = 1;
							}else{
								num_arr[k] = 0;
							}
						}
					}
					$gameNumberArray.setValue( arrId, num_arr );
				}
			}
		}
		
		/*-----------------DEBUG------------------*/
		if( e_list != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "DEBUG显示开关值"){
				for(var j=0; j < e_list.length; j++){
					var e = e_list[j];
					
					var context = "【" + DrillUp.g_EBS_PluginTip_curName + "】\n";
					context += "事件";
					context += String( e._eventId );
					context += "的开关值：\n";
					var data = e._drill_EBS_data;
					if( data == undefined ){
						context += "无";
					}else{
						var keys = Object.keys( data );
						for(var k = 0; k < keys.length; k++){
							var key = keys[k];
							context += "槽位[";
							context += key;
							context += "]，槽位的值[";
							context += (data[key] == true ? "ON" : "OFF" );
							context += "]\n";
						}
					}
					alert( context );
				}
			}
		}
	}
}
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EBS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EBS_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_EBS_event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_EBS_event_initMembers.call(this);
	this._drill_EBS_isFirstBirth = true;
};
//==============================
// * 事件注释 - 读取绑定
//==============================
var _drill_EBS_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EBS_event_setupPage.call(this);
    this.drill_EBS_event_readPage();
};
//==============================
// * 事件注释 - 读取 页
//==============================
Game_Event.prototype.drill_EBS_event_readPage = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_EBS_isFirstBirth == true ){ 
		this.drill_EBS_event_readList( this.event().pages[0].list );
		this._drill_EBS_isFirstBirth = undefined;		//『节约临时参数存储空间』（放后面，注释通过这个识别"跨事件页/不跨事件页"。"跨事件页"的注释必须放在第一页才能生效。）
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_EBS_event_readList( this.list() );
	}
}
//==============================
// * 事件注释 - 读取 注释
//==============================
Game_Event.prototype.drill_EBS_event_readList = function( pageOfList ){
	pageOfList.forEach( function( l ){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			
			if( command == "=>事件的缓存开关值" ){
				if( args.length == 6 ){
					var type = String(args[1]);
					var slot_id = String(args[3]);
					var value = String(args[5]);
					
					if( type == "存储-值给槽位-跨事件页" ){
						slot_id = slot_id.replace("槽位[","");
						slot_id = slot_id.replace("]","");
						value = value.replace("值[","");
						value = value.replace("]","");
						
						if( this._drill_EBS_isFirstBirth == true ){		//（只在事件重建时赋值）
							this.drill_EBS_setData( String(slot_id), String(value) );
						}
					}
					if( type == "存储-值给槽位-不跨事件页" ){
						slot_id = slot_id.replace("槽位[","");
						slot_id = slot_id.replace("]","");
						value = value.replace("值[","");
						value = value.replace("]","");
						
						this.drill_EBS_setData( String(slot_id), String(value) );
					}
				}
			}
		}
	}, this);
}


//=============================================================================
// ** ☆窗口字符应用之指代字符
//=============================================================================
if( Imported.Drill_CoreOfWindowCharacter ){
	
	//==============================
	// * 窗口字符应用之指代字符 - 指代字符阶段（继承）
	//==============================
	var _drill_EBS_COWC_transform_processCombined = Game_Temp.prototype.drill_COWC_transform_processCombined;
	Game_Temp.prototype.drill_COWC_transform_processCombined = function( matched_index, matched_str, command, args ){
		_drill_EBS_COWC_transform_processCombined.call( this, matched_index, matched_str, command, args );
		if( command == "dEBS" ){
			
			// > 本事件的值（\dEBS[12]）
			if( args.length == 1 ){
				
				// > 『窗口字符的本事件』
				var e_id = $gameTemp.drill_COWC_getEvnetId_InInterpreter();
				if( Imported.Drill_EventText ){  //【行走图 - 事件漂浮文字】
					if( e_id == undefined ){ e_id = $gameTemp.drill_ET_getEvnetId_InEventText(); }
				}
				if( e_id == undefined ){ return; }
				var slot_name = String(args[0]);
				
				// > 获取事件
				if( $gameMap == undefined ){
					this.drill_COWC_transform_submitCombined( "null" );
					return;
				}
				var e = $gameMap.event( Number(e_id) );
				if( e == undefined ){
					this.drill_COWC_transform_submitCombined( "null" );
					return;
				}
				
				// > 获取值
				var v_e_enabled = e.drill_EBS_getData( slot_name );
				if( v_e_enabled != undefined ){
					if( v_e_enabled == true ){
						this.drill_COWC_transform_submitCombined( "ON" );
					}else{
						this.drill_COWC_transform_submitCombined( "OFF" );
					}
				}else{
					this.drill_COWC_transform_submitCombined( "null" );
				}
				return;
			}
			
			// > 指定事件的值（\dEBS[事件[10]:12]）
			if( args.length == 2 ){
				var temp1 = String(args[0]);
				var e_id = -1;
				var slot_name = String(args[1]);
				
				if( e_id == -1 && unit.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					e_id = $gameVariables.value( Number(temp1) );
				}
				if( e_id == -1 && unit.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					e_id = Number(temp1);
				}
				
				// > 获取事件
				if( $gameMap == undefined ){
					this.drill_COWC_transform_submitCombined( "null" );
					return;
				}
				var e = $gameMap.event( Number(e_id) );
				if( e == undefined ){
					this.drill_COWC_transform_submitCombined( "null" );
					return;
				}
				
				// > 获取值
				var v_e_enabled = e.drill_EBS_getData( slot_name );
				if( v_e_enabled != undefined ){
					if( v_e_enabled == true ){
						this.drill_COWC_transform_submitCombined( "ON" );
					}else{
						this.drill_COWC_transform_submitCombined( "OFF" );
					}
				}else{
					this.drill_COWC_transform_submitCombined( "null" );
				}
				return;
			}
		}
	}
	//==============================
	// * 窗口字符应用之指代字符 - 窗口字符底层校验
	//==============================
	if( typeof(_drill_COWC_drawText_functionExist) == "undefined" ){
		alert( DrillUp.drill_EBS_getPluginTip_NeedUpdate_drawText() );
	}
}



//=============================================================================
// ** ☆物体的属性
//
//			说明：	> 此模块专门定义 物体的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体的属性 - 初始化
//==============================
var _drill_EBS_event_initMembers2 = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	this._drill_EBS_data = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EBS_event_initMembers2.call(this);
};
//==============================
// * 物体的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Event.prototype.drill_EBS_checkData = function(){
	if( this._drill_EBS_data != undefined ){ return; }
	this._drill_EBS_data = {};
}
//==============================
// * 物体的属性 - 存储值（开放函数）
//==============================
Game_Event.prototype.drill_EBS_setData = function( key, enabled ){
	this.drill_EBS_checkData();
	
	// > 值转换
	if( typeof enabled == "number" ){
		if( enabled == 0 ){ enabled = false; }else{ enabled = true; }
	}
	if( typeof enabled == "string" ){
		if( enabled.toUpperCase() == "OFF" ||
			enabled.toUpperCase() == "FALSE"
		){ enabled = false; }else{ enabled = true; }
	}
	
	// > 赋值
	this._drill_EBS_data[ key ] = enabled;
}
//==============================
// * 物体的属性 - 获取值（开放函数）
//==============================
Game_Event.prototype.drill_EBS_getData = function( key ){
	if( this._drill_EBS_data == undefined ){ return null; }
	return this._drill_EBS_data[ key ];
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventBufferSwitches = false;
		var pluginTip = DrillUp.drill_EBS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


