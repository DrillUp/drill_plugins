//=============================================================================
// Drill_OperateKeyboradConditionBranch.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        键盘 - 键盘的分支条件
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_OperateKeyboradConditionBranch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得分支条件能对键盘按键进行判断。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfInput              系统-输入设备核心
 *   - Drill_CoreOfConditionBranch    系统-分支条件核心
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
 * 设计：
 *   (1.你可以使用 触发+分支条件 实现两个物理按键组合的触发效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 分支条件
 * 你可以将下面的指令写到分支条件脚本中：
 * 
 * 分支条件：>键盘的分支条件:物理按键"f":按下时
 * 分支条件：>键盘的分支条件:物理按键"f":未按下时
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
 * 测试方法：   去各个管理层跑一圈测试。
 * 测试结果：   地图界面，平均消耗为：【5ms以下】
 *              战斗界面，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只为单次执行，且执行的功能与if相似，所以消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		OKCB（Operate_Keyborad_Condition_Branch）
//		临时全局变量	DrillUp.g_OKCB_xxxx
//		临时局部变量	$gameTemp._drill_OKCB_xxx
//		存储数据变量	$gameSystem._drill_OKCB_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	键盘管理层
//		★性能测试消耗	消耗太小，测不出来。
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
//			->☆分支指令
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
	DrillUp.g_OKCB_PluginTip_curName = "Drill_OperateKeyboradConditionBranch.js 键盘-键盘的分支条件";
	DrillUp.g_OKCB_PluginTip_baseList = [
		"Drill_CoreOfInput.js 系统-输入设备核心",
		"Drill_CoreOfConditionBranch.js 系统-分支条件核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_OKCB_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_OKCB_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_OKCB_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_OKCB_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_OKCB_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_OperateKeyboradConditionBranch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_OperateKeyboradConditionBranch');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfConditionBranch ){


//=============================================================================
// ** ☆分支指令
//=============================================================================
var _drill_OKCB_COCB_conditionCommand = Game_Interpreter.prototype.drill_COCB_conditionCommand;
Game_Interpreter.prototype.drill_COCB_conditionCommand = function(command, args) {
	_drill_OKCB_COCB_conditionCommand.call(this, command, args);
	if( command === ">键盘的分支条件" ){
		
		if( args.length == 2 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			if( temp1.indexOf("物理按键") != -1 ){
				temp1 = temp1.replace("物理按键","");
				temp1 = temp1.replace(/\"/g,"");
				if( temp2 == "按下时" ){
					var passed = Input.drill_isKeyPressed( temp1 ) == true;
					this.drill_COCB_conditionSubmit( passed );
				}
				if( temp2 == "未按下时" ){
					var passed = Input.drill_isKeyPressed( temp1 ) == false;
					this.drill_COCB_conditionSubmit( passed );
				}
			}
		}
	}
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_OperateKeyboradConditionBranch = false;
		var pluginTip = DrillUp.drill_OKCB_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


