//=============================================================================
// Drill_HtmlWindowTitle.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        游戏窗体 - 游戏窗体标题修改
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_HtmlWindowTitle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在游戏中随时修改游戏窗体的标题。
 * ★★需要放在 全局存储核心 插件后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGlobalSave       管理器-全局存储核心
 *     必须基于核心才能切换标题。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于游戏窗体。
 * 细节：
 *   (1.标题只有一行，且内容量有限，编辑时尽量使用简短的文字。
 * 全局存储：
 *   (1.该插件的标题的固定存储在全局文件中。
 *      如果游戏中修改了文本，则永久有效，不保存也有效。
 *   (2.更多详细介绍，去看看 "21.管理器 > 关于全局存储.docx"。
 * 设计：
 *   (1.你可以开启自由轮播的标题内容，每隔一段时间，标题都会变化。
 *   (2.你也可以关掉自由轮播功能，在玩家接触特定的剧情后，
 *      标题根据当前玩家的游戏进度永久变化。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以使用下面插件指令控制窗口标题：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>游戏窗体标题 : 修改文本 : 文本[一段文本]
 * 插件指令：>游戏窗体标题 : 修改文本 : 字符串[1]
 * 插件指令：>游戏窗体标题 : 追加文本 : 文本[一段文本]
 * 插件指令：>游戏窗体标题 : 追加文本 : 字符串[1]
 * 插件指令：>游戏窗体标题 : 恢复原标题
 *                                                          
 * 1.设置插件指令后，窗体的标题会 全局 永久变化。
 *   如果不恢复标题，关游戏重开后，标题仍然不变。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 空格支持
 * 插件指令下面的写法也是有效的：
 * 
 * 插件指令：>游戏窗体标题 : 修改文本 : 文本[~ 神秘 小爱丽丝 ~]
 * 插件指令：>游戏窗体标题 : 追加文本 : 文本[~ 神秘 小爱丽丝 ~]
 * 
 * 1.你可以在该插件指令中的文本使用空格。
 *   从原则上来说，脚本会将插件指令的空格分开，所以含空格的写法是不推荐的。
 * 2.建议使用 字符串 来控制，字符串不仅支持空格，还支持 换行符 。
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
 * 测试方法：   在各个界面中，进行插件指令测试。
 * 测试结果：   地图界面中，消耗为：【5ms以下】
 *              战斗界面中，消耗为：【5ms以下】
 *              菜单界面中，消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于只修改标题文本，且为单次执行，所以几乎无消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 大幅度修改了全局存储的文件存储结构。
 * [v1.2]
 * 修改了插件分类。
 * 
 * 
 * 
 * @param 是否在开游戏时恢复原名称
 * @type boolean
 * @on 恢复
 * @off 不恢复
 * @desc true - 恢复，false - 不恢复
 * @default false
 * 
 * @param 是否开启轮播名称
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default false
 *
 * @param 轮播方式
 * @parent 是否开启轮播名称
 * @type select
 * @option 从上至下循环
 * @value 从上至下循环
 * @option 随机播放
 * @value 随机播放
 * @desc 轮播的方式。
 * @default 从上至下循环
 *
 * @param 轮播间隔
 * @parent 是否开启轮播名称
 * @type number
 * @min 0
 * @desc 每个文本内容之间的播放间隔，单位帧。（1秒60帧）
 * @default 1800
 * 
 * @param 单次标题持续时间
 * @parent 是否开启轮播名称
 * @type number
 * @min 1
 * @desc 标题内容文本显示的持续时间，单位帧。（1秒60帧）
 * @default 3600
 * 
 * @param 轮播内容
 * @parent 是否开启轮播名称
 * @type text[]
 * @desc 轮播的文本内容。
 * @default []
 *
 * @param 全局存储的文件路径
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID，该插件的数据将存储到指定的文件路径中，具体去 全局存储核心 看看。
 * @default 1
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		HWT (Html_Window_Title)
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	DrillUp.global_HWT_xxx
//		覆盖重写方法	Scene_Boot.prototype.updateDocumentTitle
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	任意位置
//		★性能测试消耗	2.50ms（轮播时）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			游戏窗体标题修改：
//				->修改标题
//					->全局存储修改项
//				->轮播文字
//				->根据某些时机，修改窗口文字？
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.窗口标题和nwjs没有关系。
//				if( Utils.isNwjs() == false ){ return; }
//				var gui = require('nw.gui'); 
//				var win = gui.Window.get(); 
//				win.title = win.title + "~天才小爱丽丝冲鸭~";		//nwjs中标题为空，需要修改的是html的标题
//				alert(win.title);
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_HtmlWindowTitle = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_HtmlWindowTitle');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_HWT_homingOrgName = String(DrillUp.parameters['是否在开游戏时恢复原名称'] || "false") === "true";	
	DrillUp.g_HWT_loop_enabled = String(DrillUp.parameters['是否开启轮播名称'] || "false") === "true";	
	DrillUp.g_HWT_loop_type = String(DrillUp.parameters['轮播方式'] || "从上至下循环");	
	DrillUp.g_HWT_loop_interval = Number(DrillUp.parameters['轮播间隔'] || 180);	
	DrillUp.g_HWT_loop_titleSustain = Number(DrillUp.parameters['单次标题持续时间'] || 360);	
	if( DrillUp.parameters['轮播内容'] != undefined && 
		DrillUp.parameters['轮播内容'] != "" ){
		DrillUp.g_HWT_loop_context = JSON.parse( DrillUp.parameters['轮播内容'] );	
	}else{
		DrillUp.g_HWT_loop_context = [];
	}
    DrillUp.g_HWT_saveFileId = Number(DrillUp.parameters['全局存储的文件路径'] || 1);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGlobalSave ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令
//==============================
var _drill_HWT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_HWT_pluginCommand.call(this, command, args);
	if( command === ">游戏窗体标题" ){
		
		/*-----------------文本------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "恢复原标题" ){
				$gameTemp.drill_HWT_setText( DrillUp.global_HWT_orgName );
			}
		}
		if( args.length >= 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			
			if( type == "修改文本" ){
				if( temp1.indexOf("字符串[") != -1 && Imported.Drill_CoreOfString ){
					temp1 = temp1.replace("字符串[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameStrings.value( Number(temp1) );
					$gameTemp.drill_HWT_setText( temp1 );
					
				}else{	
					var data_str = "";		//（支持空格的多行结构）
					for(var m = 3; m < args.length ; m++ ){
						data_str += String(args[ m ]);
						if( m < args.length-1 ){  data_str += " "; }
					}
					data_str = data_str.replace("文本[","");
					data_str = data_str.replace(/\]$/,"");	//（去掉末尾的]）
					$gameTemp.drill_HWT_setText( data_str );
					
				}
			}
			
			if( type == "追加文本" ){
				if( temp1.indexOf("字符串[") != -1 && Imported.Drill_CoreOfString ){
					temp1 = temp1.replace("字符串[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameStrings.value( Number(temp1) );
					$gameTemp.drill_HWT_addText( temp1 );
					
				}else{	
					var data_str = "";		//（支持空格的多行结构）
					for(var m = 3; m < args.length ; m++ ){
						data_str += String(args[ m ]);
						if( m < args.length-1 ){  data_str += " "; }
					}
					data_str = data_str.replace("文本[","");
					data_str = data_str.replace(/\]$/,"");	//（去掉末尾的]）
					$gameTemp.drill_HWT_addText( data_str );
					
				}
			}
		}
		
	}
}
	
//=============================================================================
// ** 全局存储
//=============================================================================
//==============================
// * 全局 - 读取
//==============================
	var global_fileId = DrillUp.g_HWT_saveFileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "HWT" );
	
	// > 原名称
	if( DrillUp.global_HWT_orgName == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_orgName"];
		if( data == undefined ){ data = document.title; };		//（若没有全局存储的值，则初始化）
		DrillUp.global_HWT_orgName = data;
	}
	// > 当前名称
	if( DrillUp.global_HWT_curName == null ){	
		var data = global_data["global_curName"];
		if( data == undefined ){ data = document.title; };
		DrillUp.global_HWT_curName = data;
	}
	// > 当前索引
	if( DrillUp.global_HWT_curIndex == null ){	
		var data = global_data["global_curIndex"];
		if( data == undefined ){ data = 0; };
		DrillUp.global_HWT_curIndex = data;
	}
	
//==============================
// * 全局 - 存储
//==============================
StorageManager.drill_HWT_saveData = function(){
	var file_id = DrillUp.g_HWT_saveFileId;
	var data = {};
	data["global_orgName"] = DrillUp.global_HWT_orgName;
	data["global_curName"] = DrillUp.global_HWT_curName;
	data["global_curIndex"] = DrillUp.global_HWT_curIndex;
	this.drill_COGS_saveData( file_id, "HWT", data );
};

// > 强制赋值
if( DrillUp.g_HWT_homingOrgName == true ){
	document.title = DrillUp.global_HWT_orgName;
}else{
	document.title = DrillUp.global_HWT_curName;
}
	

//=============================================================================
// ** 临时数据
//=============================================================================
//==============================
// * 临时 - 添加文本
//==============================
Game_Temp.prototype.drill_HWT_addText = function( text ){	
	
	// > 设置全局值
	DrillUp.global_HWT_curName += text;
	document.title = DrillUp.global_HWT_curName;
	
	// > 强制存储
	StorageManager.drill_HWT_saveData();
};
//==============================
// * 临时 - 设置文本
//==============================
Game_Temp.prototype.drill_HWT_setText = function( text ){	
	
	// > 设置全局值
	DrillUp.global_HWT_curName = text;
	document.title = DrillUp.global_HWT_curName;
	
	// > 强制存储
	StorageManager.drill_HWT_saveData();
};

//=============================================================================
// ** 启动界面
//=============================================================================
//==============================
// * 启动界面 - 设置标题（覆写）
//==============================
Scene_Boot.prototype.updateDocumentTitle = function() {
	if( DrillUp.g_HWT_homingOrgName == true ){
		document.title = DrillUp.global_HWT_orgName;
	}else{
		document.title = DrillUp.global_HWT_curName;
	}
}


//=============================================================================
// ** 轮播设置
//=============================================================================
//==============================
// * 轮播设置 - 帧渲染
//==============================
var _drill_HWT_renderScene = SceneManager.renderScene;
SceneManager.renderScene = function() {
	_drill_HWT_renderScene.call(this);
	
	this.drill_HWT_updateLoop();	//轮播
}
//==============================
// * 轮播设置 - 帧刷新
//==============================
SceneManager.drill_HWT_updateLoop = function() {
	if( $gameTemp == undefined ){ return; }
	if( DrillUp.g_HWT_loop_enabled != true ){ return; }
	if( DrillUp.g_HWT_loop_context.length == 0 ){ return; }
	
	// > 初始化
	if( this._drill_HWT_loopTime == undefined ){
		this._drill_HWT_loopTime = 0;
	}
	this._drill_HWT_loopTime += 1;
	
	
	// > 空白时
	var step_time = DrillUp.g_HWT_loop_interval + DrillUp.g_HWT_loop_titleSustain;
	if( this._drill_HWT_loopTime % step_time == 0 ){
		
		DrillUp.global_HWT_curName = DrillUp.global_HWT_orgName;
		document.title = DrillUp.global_HWT_orgName;	//（恢复原标题，暂时不强制存储）
		
	}
	// > 下一个标题时
	if( this._drill_HWT_loopTime % step_time == DrillUp.g_HWT_loop_interval-1 ){
		
		if( DrillUp.g_HWT_loop_type == "从上至下循环" ){
			var text = DrillUp.g_HWT_loop_context[ DrillUp.global_HWT_curIndex ];
			$gameTemp.drill_HWT_setText( DrillUp.global_HWT_orgName + text );
			
			DrillUp.global_HWT_curIndex += 1;
			if( DrillUp.global_HWT_curIndex >= DrillUp.g_HWT_loop_context.length ){
				DrillUp.global_HWT_curIndex = 0;
			}
		}
		
		if( DrillUp.g_HWT_loop_type == "随机播放" ){
			DrillUp.global_HWT_curIndex = Math.floor( Math.random() * DrillUp.g_HWT_loop_context.length );
			var text = DrillUp.g_HWT_loop_context[ DrillUp.global_HWT_curIndex ];
			$gameTemp.drill_HWT_setText( DrillUp.global_HWT_orgName + text );
		}
	}
	
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_HtmlWindowTitle = false;
		alert(
			"【Drill_HtmlWindowTitle.js 系统 - 游戏窗体标题修改】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfGlobalSave 管理器-全局存储核心"
		);
}

