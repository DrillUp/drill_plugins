//=============================================================================
// Drill_PictureConditionBranch.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        图片 - 图片的分支条件
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureConditionBranch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得分支条件能对图片的一些属性进行判断。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfConditionBranch     系统-分支条件核心
 *   - Drill_CoreOfPictureWithMouse    图片-图片与鼠标控制核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于 图片 。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 分支条件
 * 你可以将下面的指令写到分支条件脚本中：
 * 
 * 分支条件：>图片的分支条件:图片[1]:是否已创建
 * 分支条件：>图片的分支条件:图片变量[21]:是否已创建
 * 
 * 分支条件：>图片的分支条件:图片[1]:鼠标是否悬停于图片
 * 分支条件：>图片的分支条件:图片变量[21]:鼠标是否悬停于图片
 * 
 * 1."鼠标是否悬停于图片"指鼠标是否悬停于图片。
 *   图片 碰撞体判定/像素判定 的设置需要在 图片-图片与鼠标控制核心 插件中修改。
 *   注意，如果图片未设置预加载，就不能在刚创建时就立即判定是否悬停，否则一直是false。
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
//		插件简称		PiCB（Picture_Condition_Branch）
//		临时全局变量	DrillUp.g_PiCB_xxxx
//		临时局部变量	$gameTemp._drill_PiCB_xxx
//		存储数据变量	$gameSystem._drill_PiCB_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	图片管理层
//		★性能测试消耗	2024/5/2：
//							》消耗太小，测不出来。
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
//			无
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
	DrillUp.g_PiCB_PluginTip_curName = "Drill_PictureConditionBranch.js 图片-图片的分支条件";
	DrillUp.g_PiCB_PluginTip_baseList = [
		"Drill_CoreOfConditionBranch.js 系统-分支条件核心",
		"Drill_CoreOfPictureWithMouse.js 图片-图片与鼠标控制核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PiCB_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PiCB_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PiCB_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PiCB_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PiCB_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureConditionBranch = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureConditionBranch');
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfConditionBranch &&
	Imported.Drill_CoreOfPictureWithMouse ){


//=============================================================================
// ** ☆分支指令
//=============================================================================
var _drill_PiCB_COCB_conditionCommand = Game_Interpreter.prototype.drill_COCB_conditionCommand;
Game_Interpreter.prototype.drill_COCB_conditionCommand = function(command, args) {
	_drill_PiCB_COCB_conditionCommand.call(this, command, args);
	if( command === ">图片的分支条件" ){
		
		/*-----------------是否已创建------------------*/
		if( args.length == 2 ){
			var pic_str = String(args[0]);
			var temp2 = String(args[1]);
			if( temp2 == "是否已创建" ){
				
				var pic = null;
				var pic_str = String(args[0]);
				if( pic == null && pic_str.indexOf("图片变量[") != -1 ){
					pic_str = pic_str.replace("图片变量[","");
					pic_str = pic_str.replace("]","");
					var pic_id = $gameVariables.value( Number(pic_str) );
					pic = $gameScreen.picture( pic_id );
				}
				if( pic == null && pic_str.indexOf("图片[") != -1 ){
					pic_str = pic_str.replace("图片[","");
					pic_str = pic_str.replace("]","");
					var pic_id = Number(pic_str);
					pic = $gameScreen.picture( pic_id );
				}
				
				var passed = (pic != undefined);
				this.drill_COCB_conditionSubmit( passed );
				return;
			}
		}
		
		/*-----------------对象组获取------------------*/
		var pic = null;
		if( args.length >= 1 ){
			var pic_str = String(args[0]);
			if( pic == null && pic_str.indexOf("图片变量[") != -1 ){
				pic_str = pic_str.replace("图片变量[","");
				pic_str = pic_str.replace("]","");
				var pic_id = $gameVariables.value( Number(pic_str) );
				if( $gameScreen.drill_PiCB_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			if( pic == null && pic_str.indexOf("图片[") != -1 ){
				pic_str = pic_str.replace("图片[","");
				pic_str = pic_str.replace("]","");
				var pic_id = Number(pic_str);
				if( $gameScreen.drill_PiCB_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
		}
		
		/*-----------------图片判定------------------*/
		if( args.length == 2 && pic != null ){
			var temp2 = String(args[1]);
			if( temp2 == "鼠标是否悬停于图片" ){
				
				// > 强制 绑定碰撞体+数据
				pic.drill_COPWM_checkData();
				
				var passed = pic.drill_COPWM_isOnHover();
				this.drill_COCB_conditionSubmit( passed );
			}
		}
	}
};
//==============================
// * 分支指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PiCB_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PiCB_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureConditionBranch = false;
		var pluginTip = DrillUp.drill_PiCB_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


