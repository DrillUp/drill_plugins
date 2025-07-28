//=============================================================================
// Drill_EventActionSequenceAutomation.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        行走图 - GIF动画序列全标签播放
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventActionSequenceAutomation +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 行走图有一套固定的标签，通过那些标签能自动播放动画序列的 状态元/状态节点。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_EventActionSequence       行走图-GIF动画序列★★v1.5及以上★★
 * 可作用于：
 *   - Drill_EventActionSequenceBind   行走图-GIF动画序列全绑定
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.更多详细内容，去看看 "7.行走图 > 关于行走图GIF动画序列.docx"。
 * 标签播放：
 *   (1.标签播放：指 通过标签控制 播放 状态元/状态节点。
 *      需要手动通过插件指令调用，才能实现标签播放。
 * 全标签播放：
 *   (1.全标签播放：指行走图有一套固定的标签，通过那些标签自动播放 状态元/状态节点。
 *      通过插件指令或事件注释 开启 全标签开关后，自动进行标签播放。
 *   (2.全标签包含<行走图-静止>、<行走图-移动>、<行走图-跳跃>、<行走图-奔跑>等，
 *      具体去看看文档中 全标签播放 的章节。
 *   (3."静止等待时间"是指标签切换到<行走图-静止>时，保持什么都不做的持续时间。
 *      此功能一般用于防止小爱丽丝刚停下脚步就立刻照镜子的动作行为。
 * 小工具：
 *   (1.防止你看不见：
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *   (2.小工具能导入 行走图、序列大图、GIF文件 等资源，
 *      然后小工具能将配置转移到插件 GIF动画序列核心 中。
 * 设计：
 *   (1.你可以将一个原12帧的行走图资源，拆分成 行走图动画序列，再配置给事件或玩家。
 *      跑通后再进行更复杂的 状态节点 连接，实现更复杂的动画效果。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件注释
 * 你需要通过下面事件注释来开关全标签播放：
 * 
 * 事件注释：=>行走图动画序列 : 全标签播放 : 开启
 * 事件注释：=>行走图动画序列 : 全标签播放 : 关闭
 * 
 * 事件注释：=>行走图动画序列 : 静止等待时间 : 时长[120]
 * 事件注释：=>行走图动画序列 : 静止等待时间 : 恢复默认
 * 
 * 1.必须包含注释 "全标签播放 : 开启" 的事件页 才会生效。
 * 2.注意，如果你只写了 创建动画序列 注释，而没写 开启全标签播放 的注释。
 *   那么动画序列将只播放 默认的状态元集合 。
 *   因此事件移动时，不会播放移动动画，而是保持站立平移。
 * 2."静止等待时间"是指标签切换到<行走图-静止>时，保持什么都不做的持续时间。
 *   此功能一般用于防止小爱丽丝刚停下脚步就立刻照镜子的动作行为。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 全标签播放开关
 * 你可以通过下面插件指令来开关全标签播放：
 * 
 * 插件指令：>行走图动画序列 : 玩家 : 全标签播放 : 关闭
 * 插件指令：>行走图动画序列 : 玩家领队 : 全标签播放 : 关闭
 * 插件指令：>行走图动画序列 : 玩家全员 : 全标签播放 : 关闭
 * 插件指令：>行走图动画序列 : 玩家队员[1] : 全标签播放 : 关闭
 * 插件指令：>行走图动画序列 : 玩家队员变量[21] : 全标签播放 : 关闭
 * 插件指令：>行走图动画序列 : 本事件 : 全标签播放 : 关闭
 * 插件指令：>行走图动画序列 : 事件[1] : 全标签播放 : 关闭
 * 插件指令：>行走图动画序列 : 事件变量[1] : 全标签播放 : 关闭
 * 插件指令：>行走图动画序列 : 批量事件[10,11] : 全标签播放 : 关闭
 * 插件指令：>行走图动画序列 : 批量事件变量[21,22] : 全标签播放 : 关闭
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 全标签播放 : 关闭
 * 插件指令：>行走图动画序列 : 事件[1] : 全标签播放 : 开启
 * 
 * 1.前半部分（玩家）和 后半部分（全标签播放 : 关闭）
 *   的参数可以随意组合。一共有10*2种组合方式。
 * 2.动画序列中，必须要配置标签，才能全标签播放。
 *   没有设置标签则只能播放 默认的状态元集合 。
 * 3.需要先关闭 全标签播放，
 *   才能再 播放状态元 或者 播放指定标签。
 * 4."玩家队员[1]"中，-2表示领队，1表示第一个跟随者。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 播放指定标签
 * 你可以通过下面插件指令来操作播放：
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : <行走图-静止>
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : <行走图-移动>
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : <行走图-奔跑>
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : <行走图-跳跃>
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : <行走图-滑行>
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : <行走图-滑行静止>
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : <行走图-被举起>
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : <行走图-举花盆>
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : 自定义动作-拾取
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : 自定义动作-拾取重要道具
 * 插件指令：>行走图动画序列 : 事件[1] : 播放指定标签 : 其他自定义标签
 * 
 * 1.前半部分（事件[1]）和 后半部分（播放指定标签 : <行走图-静止>）
 *   的参数可以随意组合。一共有10*2种组合方式。
 * 2.需要先关闭 全标签播放，
 *   才能再 播放状态元 或者 播放指定标签。
 * 3.如果没有对应的标签配置，则此插件指令没有任何效果。
 * 4.行走图的标签详细介绍可以去看看文档的 动画序列标签表 。
 *   手动播放"其他自定义标签"也能生效，但是不受 全标签播放 控制。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 静止等待时间
 * 你可以通过插件指令修改静止等待时间：
 * 
 * 插件指令：>行走图动画序列 : 修改默认静止等待时间 : 时长[180]
 * 
 * 插件指令：>行走图动画序列 : 玩家 : 静止等待时间 : 时长[180]
 * 插件指令：>行走图动画序列 : 玩家 : 静止等待时间 : 恢复默认
 * 插件指令：>行走图动画序列 : 事件[1] : 静止等待时间 : 时长[180]
 * 插件指令：>行走图动画序列 : 事件[1] : 静止等待时间 : 恢复默认
 * 
 * 1.设置后永久有效，持续时长可以设为0。
 * 2."静止等待时间"是指标签切换到<行走图-静止>时，保持什么都不做的持续时间。
 *   此功能一般用于防止小爱丽丝刚停下脚步就立刻照镜子的动作行为。
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
 * 测试结果：   200个事件的地图中，平均消耗为：【8.20ms】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.每次事件需要改变移动路线时，标签匹配才会触发一次，所以消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 较大幅度更新了 动画序列底层，该插件重新兼容。
 * [v1.2]
 * 重新归纳了播放 状态节点 的结构。
 * [v1.3]
 * 支持了二方向行走图，该插件重新兼容。
 * [v1.4]
 * 优化了动画序列存储底层。
 * [v1.5]
 * 修正描述细节，修复了 行走图-跳跃 无效的bug。
 *
 *
 * @param 默认静止等待时间
 * @type number
 * @min 0
 * @desc 指标签切换到<行走图-静止>时，保持什么都不做的持续时间。
 * @default 120
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EASA（Event_Action_Sequence_Automation）
//		临时全局变量	无
//		临时局部变量	this._drill_EASA_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	动画序列管理层
//		★性能测试消耗	2024/1/22：
//							》4.1ms（drill_EASA_setAnnotation）
//						2024/6/15：
//							》5.3ms（drill_EASA_setAnnotation）4.5ms（drill_EASA_posIsInCamera）
//		★最坏情况		状态元的注解超级多。（不过目前算法并不会造成注解解析困难）
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
//			->☆事件注释
//			->☆存储数据
//
//			->☆播放（继承）
//				> 播放默认的状态元集合
//				> 播放简单状态元集合
//				> 播放状态节点
//
//			->☆状态规划器 标准函数
//			->☆状态规划器实现
//				->检查 - 未开启功能
//				->检查 - 控制器为空
//				->检查 - 镜头范围外
//				->注解
//					->基础
//						> <行走图-静止>
//						> <行走图-移动>
//					->常规
//						> <行走图-奔跑>
//						> <行走图-跳跃>
//					->插件
//						> <行走图-滑行>
//						> <行走图-滑行静止>
//						> <行走图-被举起>
//						> <行走图-举花盆>
//			
//			->☆状态规划器 标准接口
//			->☆标签播放器
//				->播放失败时
//					> <行走图-滑行> 转 <行走图-移动>
//					> <行走图-滑行静止> 转 <行走图-静止>
//					> <行走图-奔跑> 转 <行走图-移动>
//					> <行走图-跳跃> 转 <行走图-移动>
//				->滑行标记
//
//			->☆静止等待时间
//			->☆移动变速
//			->☆固定帧
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
//			1.该插件需要随时控制 播放 状态节点。
//			2.<行走图-移动> 要注意移动速度变化对帧速度的影响。
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
	DrillUp.g_EASA_PluginTip_curName = "Drill_EventActionSequenceAutomation.js 行走图-GIF动画序列全标签播放";
	DrillUp.g_EASA_PluginTip_baseList = ["Drill_EventActionSequence.js 行走图-GIF动画序列"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EASA_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EASA_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EASA_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EASA_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EASA_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EASA_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EASA_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventActionSequenceAutomation = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventActionSequenceAutomation');
	
	/*-----------------杂项------------------*/
	DrillUp.g_EASA_defaultWaitTime = Number(DrillUp.parameters["默认静止等待时间"] || 120); 
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventActionSequence ){
	

//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_EASA_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_EASA_pluginCommand.call(this, command, args);
	this.drill_EASA_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_EASA_pluginCommand = function( command, args ){
	if( command === ">行走图动画序列" ){ 
	
		/*-----------------对象组获取------------------*/
		var e_chars = null;			// 事件对象组
		var p_chars = null;			// 玩家对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EASA_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EASA_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EASA_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EASA_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			
			if( p_chars == null && ( unit == "玩家" || unit == "玩家领队" ) ){
				p_chars = [ $gamePlayer ];
			}
			if( p_chars == null && unit == "玩家全员" ){
				p_chars = $gamePlayer.followers().visibleFollowers();
				p_chars.unshift($gamePlayer);
			}
			if( p_chars == null && unit.indexOf("玩家队员变量[") != -1 ){
				unit = unit.replace("玩家队员变量[","");
				unit = unit.replace("]","");
				var p_id = $gameVariables.value(Number(unit));
				if( p_id == -2 ){  //『玩家id』
					p_chars = [ $gamePlayer ];
				}
				if( p_id > 0 ){  //『玩家队员id』
					var group = $gamePlayer.followers().visibleFollowers();
					p_chars = [];
					p_chars.push(group[ p_id-1 ]);
				}
			}
			if( p_chars == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var p_id = Number(unit);
				if( p_id == -2 ){  //『玩家id』
					p_chars = [ $gamePlayer ];
				}
				if( p_id > 0 ){  //『玩家队员id』
					var group = $gamePlayer.followers().visibleFollowers();
					p_chars = [];
					p_chars.push(group[ p_id-1 ]);
				}
			}
		}
		if( e_chars == null ){ e_chars = []; }
		if( p_chars == null ){ p_chars = []; }
		
		
		/*-----------------全标签播放------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "全标签播放" || type == "自动化" ){
				
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EASA_setEnabled( true );
					}
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EASA_setEnabled( true );
					}
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EASA_setEnabled( false );
					}
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EASA_setEnabled( false );
					}
				}
			}
		}
		
		/*-----------------播放指定标签------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "播放指定标签" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASA_setAnInCommand( temp1 );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASA_setAnInCommand( temp1 );
				}
			}
		}
		
		/*-----------------静止等待时间------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改默认静止等待时间" ){
				temp1 = temp1.replace("持续时长[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_EASA_defaultWaitTime = Number(temp1);
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "静止等待时间" ){
				if( temp1.indexOf("时长[") != -1 ){
					temp1 = temp1.replace("时长[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EASA_setWaitTime( Number(temp1) );
					}
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EASA_setWaitTime( Number(temp1) );
					}
					
				}else if( temp1 == "恢复默认" ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_EASA_resetWaitTime();
					}
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_EASA_resetWaitTime();
					}
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EASA_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EASA_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 初始化绑定
//
//			说明：	> 注释与当前事件页有关，不一定跨事件页。
//==============================
var _drill_EASA_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EASA_event_setupPage.call(this);
    this.drill_EASA_setupPage();
};
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EASA_setupPage = function() {
	
	var is_set1 = false;
	var is_set2 = false;
	
	if( !this._erased && this.page() ){ this.list().forEach(function( l ){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>行走图动画序列" ){
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( type == "全标签播放" ){
						if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
							this.drill_EASA_setEnabled( true );
							is_set1 = true;
						}
					}
					if( type == "静止等待时间" ){
						if( temp1.indexOf("时长[") != -1 ){
							temp1 = temp1.replace("时长[","");
							temp1 = temp1.replace("]","");
							this.drill_EASA_setWaitTime( Number(temp1) );
							is_set2 = true;
							
						}else if( temp1 == "恢复默认" ){
							this.drill_EASA_resetWaitTime();
							is_set2 = true;
						}
					}
				}
			};
		};
	}, this);};
	
	if( is_set1 == false ){
		this.drill_EASA_setEnabled( false );	//关闭 全标签播放
	}
	if( is_set2 == false ){
		this.drill_EASA_resetWaitTime();		//关闭 静止等待时间
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
DrillUp.g_EASA_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EASA_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EASA_sys_initialize.call(this);
	this.drill_EASA_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EASA_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EASA_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EASA_saveEnabled == true ){	
		$gameSystem.drill_EASA_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EASA_initSysData();
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
Game_System.prototype.drill_EASA_initSysData = function() {
	this.drill_EASA_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EASA_checkSysData = function() {
	this.drill_EASA_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EASA_initSysData_Private = function() {
	
	this._drill_EASA_defaultWaitTime = DrillUp.g_EASA_defaultWaitTime;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EASA_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EASA_defaultWaitTime == undefined ){
		this.drill_EASA_initSysData();
	}
};



//=============================================================================
// ** ☆播放（继承）
//
//			说明：	> 继承于 行走图动画序列 ，并提供 标签播放 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 播放 - 播放默认的状态元集合（继承）
//==============================
var _drill_EASA_EASe_setStateNodeDefault = Game_Character.prototype.drill_EASe_setStateNodeDefault;
Game_Character.prototype.drill_EASe_setStateNodeDefault = function(){
	this.drill_EASA_setEnabled( false );		//（立即关闭 全标签播放）
	_drill_EASA_EASe_setStateNodeDefault.call(this);
}
//==============================
// * 播放 - 播放简单状态元集合（继承）
//==============================
var _drill_EASA_EASe_setSimpleStateNode = Game_Character.prototype.drill_EASe_setSimpleStateNode;
Game_Character.prototype.drill_EASe_setSimpleStateNode = function( state_nameList ){
	this.drill_EASA_setEnabled( false );		//（立即关闭 全标签播放）
	_drill_EASA_EASe_setSimpleStateNode.call( this, state_nameList );
}
//==============================
// * 播放 - 播放状态节点（继承）
//==============================
var _drill_EASA_EASe_setStateNode = Game_Character.prototype.drill_EASe_setStateNode;
Game_Character.prototype.drill_EASe_setStateNode = function( node_name ){
	this.drill_EASA_setEnabled( false );		//（立即关闭 全标签播放）
	_drill_EASA_EASe_setStateNode.call( this, node_name );
}


//=============================================================================
// ** ☆状态规划器
//
//			说明：	> 物体处于任一状态时，即时捕获，并播放状态节点。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 状态规划器 - 初始化
//
//			说明：	> 这里的数据默认为空。『节约事件数据存储空间』
//==============================
var _drill_EASA_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	this._drill_EASA_enabled = undefined;			//全标签播放开关（布尔）
	this._drill_EASA_lastAnnotation = undefined;	//上一次的状态（字符串）
	
	// > 原函数
	_drill_EASA_c_initialize.call(this);
}
//==============================
// * 状态规划器 - 启动/关闭（开放函数）
//==============================
Game_Character.prototype.drill_EASA_setEnabled = function( enabled ){
	
	// > 开启时
	if( enabled == true ){
		this._drill_EASA_enabled = true;
		this._drill_EASA_lastAnnotation = "";
		
	// > 关闭时
	}else{
		this._drill_EASA_enabled = undefined;
	}
}
//==============================
// * 状态规划器 - 帧刷新 绑定
//==============================
var _drill_EASA_ch_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_EASA_ch_update.call(this);
	this.drill_EASA_updateAnnotation();
}
//==============================
// * 状态规划器 - 帧刷新
//==============================
Game_CharacterBase.prototype.drill_EASA_updateAnnotation = function(){
	
	// > 检查 - 未开启功能，跳过
	if( this._drill_EASA_enabled != true ){ return; }
	
	// > 检查 - 控制器为空，跳过
	if( this._drill_EASe_controller == undefined ){
		this._drill_EASA_lastAnnotation = "";
		return;
	}
	
	// > 检查 - 镜头范围外，跳过
	if( this.drill_EASA_posIsInCamera( this._realX, this._realY ) == false ){
		this._drill_EASA_lastAnnotation = "";
		return;
	}
	
	
	// > 注解 - 基础（只区分 静止情况 和 移动情况 ）
	var is_stoping = false;
	if( this.isStopping() ){
		is_stoping = true;
	}
	
	// > 注解 - 当前注解
	var cur_annotation = "<行走图-静止>";
	if( is_stoping == false ){
		cur_annotation = "<行走图-移动>";
	}
	
	
	// > 注解优先级
	//
	// push(50,"滑行判定");
	// push(90,"被举起判定");
	// push(30,"举花盆判定");	//（外部插件仍然需要在自己脚本中单独开辟 动画序列优先级 设置的配置，并文档统一管理）
	// push(20,"奔跑判定");
	// push(100,"跳跃判定");
	//
	// check("滑行判定");
	
	
	// > 注解 - 第一层 - 插件【图块-物体滑行】
	if( this.slipperyPose != undefined && this.slipperyPose() == true && 
		(this instanceof Game_Player || this instanceof Game_Follower ) ){	//（插件 YEP_SlipperyTiles）
		if( this.isMoving() ){
			cur_annotation = "<行走图-滑行>";
		}else{
			cur_annotation = "<行走图-滑行静止>";
		}
		
	}else if( this.drill_LST_isOnSlipperyFloor != undefined && 
			  this.drill_LST_isOnSlipperyFloor() == true ){					//（插件 Drill_LayerSlipperyTile）
		if( this.isMoving() ){
			cur_annotation = "<行走图-滑行>";
		}else{
			cur_annotation = "<行走图-滑行静止>";
		}
		
		
	// > 注解 - 第一层 - 插件【互动-举起花盆能力】
	}else if( this._drill_PT_is_being_lift == true ){		//（插件 Drill_PickThrow）
		cur_annotation = "<行走图-被举起>";
	
	
	// > 注解 - 第一层 - 常规
	}else if( this.isMoving() ){
		if( this.isDashing() || 
			(this instanceof Game_Follower && $gamePlayer.isDashing()) ){
			cur_annotation = "<行走图-奔跑>";
		}else{
			cur_annotation = "<行走图-移动>";
		}
	
	}else if( this.isStopping() ){
		cur_annotation = "<行走图-静止>";
	}
	
	
	// > 注解 - 第二层 - 常规
	if( this.isJumping() ){
		cur_annotation = "<行走图-跳跃>";
	}
	// > 注解 - 第二层 - 插件【互动-举起花盆能力】
	if( this._drill_PT_is_lifting == true ){
		cur_annotation = "<行走图-举花盆>";
	}
	
	
	// > 『行走图状态变化锁』
	//		（当玩家/事件持续移动时，每经过一个图块时，都会出现1帧的静止问题，变化锁用于解决此问题）
	if( this._drill_EASA_lastChangeDelay == undefined ){ this._drill_EASA_lastChangeDelay = 0; }
	if( this._drill_EASA_lastAnnotation == cur_annotation ){
		this._drill_EASA_lastChangeDelay = 3;		//（注解变化后，需要至少持续3帧）
		return;
	}
	this._drill_EASA_lastChangeDelay -= 1;
	if( this._drill_EASA_lastChangeDelay > 0 ){ return; }
	this._drill_EASA_lastAnnotation = cur_annotation;
	
	
	// > 标签播放器 - 帧刷新控制
	this.drill_EASA_setAnInUpdate( is_stoping, cur_annotation );
}
//==============================
// * 状态规划器 - 优化策略 - 判断贴图是否在镜头范围内
//==============================
Game_CharacterBase.prototype.drill_EASA_posIsInCamera = function( realX, realY ){
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


//=============================================================================
// ** ☆标签播放器
//
//			说明：	> 此模块专门管理 播放指定标签 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 标签播放器 - 帧刷新控制
//==============================
Game_Character.prototype.drill_EASA_setAnInUpdate = function( is_stoping, cur_annotation ){
	
	// > 重置 - 静止等待时间
	this.drill_EASA_waitTime_reset( is_stoping, cur_annotation );
	
	// > 重置 - 移动变速
	this.drill_EASA_speed_reset( cur_annotation );
	
	// > 执行播放
	var success = this.drill_EASA_setAnnotation( cur_annotation );
	
	// > 强制刷新动画序列（切换标签后，静止等待时间内，要保持新标签的图像）
	this._drill_EASe_controller.drill_COAS_update();
}
//==============================
// * 标签播放器 - 插件指令控制
//==============================
Game_Character.prototype.drill_EASA_setAnInCommand = function( annotation ){
	
	// > 清除等待设置
	this.drill_EASA_clearWait();
	
	// > 执行播放
	var success = this.drill_EASA_setAnnotation( annotation );
}

//==============================
// * 标签播放器 - 执行播放
//
//			参数：	> annotation 字符串（标签文本）
//			说明：	> 状态元/状态节点名称中含有特定注解的，会被捕获。
//					> 如果捕获失败，返回false。
//==============================
Game_Character.prototype.drill_EASA_setAnnotation = function( annotation ){
	
	// > 执行播放（状态元+状态节点+动作元）
	var success = this._drill_EASe_controller.drill_COAS_setAnnotation( annotation );
	
	// > 执行播放 - 播放失败时
	if( success == false ){
		success = this.drill_EASA_setAnnotation_Unsuccess( annotation );
	}
	return success;
}
//==============================
// * 标签播放器 - 执行播放 - 播放失败时
//==============================
Game_Character.prototype.drill_EASA_setAnnotation_Unsuccess = function( annotation ){
	var success = false;
	
	// > 注解 - 第一层 - 插件【图块-物体滑行】
	if( annotation == "<行走图-滑行>" ){
		
		// > 修改标签
		success = this._drill_EASe_controller.drill_COAS_setAnnotation( "<行走图-移动>" );
		if( success == true ){
			this._drill_EASe_controller.drill_COAS_update();	//（设置标签后，强制刷新一次，确保节点被赋值）
			
			// > 标记 - 滑行时但没有滑行标签
			this._drill_EASA_tag_slideWithNoSeq = true;
			
			// > 固定帧
			var cur_state = this._drill_EASe_controller.drill_controllerMain_Node_getCurState();
			cur_state.drill_controllerState_setCurIndex(2);
		}
	}
	if( annotation == "<行走图-滑行静止>" ){
		success = this._drill_EASe_controller.drill_COAS_setAnnotation( "<行走图-静止>" );
	}
	
	// > 注解 - 第一层 - 常规
	if( annotation == "<行走图-奔跑>" ){
		success = this._drill_EASe_controller.drill_COAS_setAnnotation( "<行走图-移动>" );
	}
	
	// > 注解 - 第二层 - 常规
	if( annotation == "<行走图-跳跃>" ){
		success = this._drill_EASe_controller.drill_COAS_setAnnotation( "<行走图-移动>" );
	}
	
	return success;
}
//==============================
// * 标签播放器 - 滑行标记（继承）
//==============================
var _drill_EASA_EASA_setAnnotation = Game_Character.prototype.drill_EASA_setAnnotation;
Game_Character.prototype.drill_EASA_setAnnotation = function( annotation ){
	
	// > 滑行标记 - 重置
	this._drill_EASA_tag_slideWithNoSeq = false;	//标记 - 滑行时但没有滑行标签
	
	// > 原函数
	return _drill_EASA_EASA_setAnnotation.call( this, annotation );
}
//==============================
// * 标签播放器 - 滑行标记 - 是否暂停（继承）
//==============================
var _drill_EASA_EASe_needPause1 = Game_CharacterBase.prototype.drill_EASe_needPause;
Game_CharacterBase.prototype.drill_EASe_needPause = function(){
	
	// > 滑行标记 - 条件（滑行时但没有滑行标签）
	if( this._drill_EASA_tag_slideWithNoSeq == true ){ return true; }
	
	// > 原函数
	return _drill_EASA_EASe_needPause1.call(this);
}



//=============================================================================
// ** ☆静止等待时间
//
//			说明：	> 此模块专门管理 暂停功能，并包含 静止等待时间 的功能。
//					> 如果要debug，把这整个的模块全部注释即可。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 静止等待时间 - 初始化
//
//			说明：	> 这里的数据默认为空。『节约事件数据存储空间』
//==============================
var _drill_EASA_waitTime_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	this._drill_EASA_dataWaitTime = undefined;		//指定静止等待时间
	this._drill_EASA_curWaitTime = undefined;		//剩余静止等待时间
	
	// > 原函数
	_drill_EASA_waitTime_initialize.call(this);
}
//==============================
// * 静止等待时间 - 设置等待时间（开放函数）
//==============================
Game_Character.prototype.drill_EASA_setWaitTime = function( wait_time ){
	this._drill_EASA_dataWaitTime = wait_time;
}
//==============================
// * 静止等待时间 - 恢复默认等待时间（开放函数）
//==============================
Game_Character.prototype.drill_EASA_resetWaitTime = function(){
	this._drill_EASA_dataWaitTime = undefined;
}
//==============================
// * 静止等待时间 - 清除等待设置（开放函数）
//
//			说明：	> 如果要播放指定标签，就不要被 静止等待时间 卡住播放了。
//==============================
Game_Character.prototype.drill_EASA_clearWait = function(){
	this._drill_EASA_curWaitTime = undefined;
}
//==============================
// * 静止等待时间 - 重置
//
//			说明：	> 此函数不在帧刷新中，而是 行走图状态变化后，执行的注释刷新。
//==============================
Game_Character.prototype.drill_EASA_waitTime_reset = function( is_stoping, cur_annotation ){
	
	// > 正在播放动作元，跳出
	if( this._drill_EASe_controller.drill_COAS_isPlayingAct() ){
		this.drill_EASA_clearWait();
		return;
	}
	
	// > 静止情况时
	if( is_stoping == true ){
		
		// > 默认静止等待时间
		this._drill_EASA_curWaitTime = $gameSystem._drill_EASA_defaultWaitTime;
		
		// > 指定静止等待时间
		if( this._drill_EASA_dataWaitTime != undefined ){
			this._drill_EASA_curWaitTime = this._drill_EASA_dataWaitTime;
		}
		return;
		
	// > 移动情况时
	}else{
		this.drill_EASA_clearWait();
		return;
	}
}
//==============================
// * 静止等待时间 - 帧刷新
//==============================
var _drill_EASA_waitTime_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_EASA_waitTime_update.call(this);
	if( this._drill_EASe_controller == null ){ return; }
	
	// > 静止等待时间-1
	if( this._drill_EASA_curWaitTime != undefined ){
		this._drill_EASA_curWaitTime -= 1;
	}
}
//==============================
// * 静止等待时间 - 是否暂停（继承）
//==============================
var _drill_EASA_EASe_needPause2 = Game_CharacterBase.prototype.drill_EASe_needPause;
Game_CharacterBase.prototype.drill_EASe_needPause = function(){
	
	// > 条件 - 时间未结束时，暂停播放
	if( this._drill_EASA_curWaitTime != undefined ){
		if( this._drill_EASA_curWaitTime > 0 ){ return true; }
	}
	
	// > 原函数
	return _drill_EASA_EASe_needPause2.call(this);
}


//=============================================================================
// ** ☆移动变速
//
//			说明：	> 此模块专门控制 移动与变速。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 移动变速 - 重置
//
//			说明：	> 此函数不在帧刷新中，而是 行走图状态变化后，执行的注释刷新。
//==============================
Game_Character.prototype.drill_EASA_speed_reset = function( annotation ){
	
	// > 变速控制
	if( this._drill_EASe_controller.drill_controllerMain_Act_isPlayingAct() == false &&	//（只对状态元变速）
		(annotation == "<行走图-移动>" ||
		 annotation == "<行走图-奔跑>")
		){
		
		var moveSpeed = this.moveSpeed();
		if( moveSpeed == 1 ){
			this._drill_EASe_controller.drill_controllerMain_setCurSpeed( 0.35 );
		}else if( moveSpeed == 2 ){
			this._drill_EASe_controller.drill_controllerMain_setCurSpeed( 0.5 );
		}else if( moveSpeed == 3 ){
			this._drill_EASe_controller.drill_controllerMain_setCurSpeed( 0.75 );
		}else if( moveSpeed == 4 ){
			this._drill_EASe_controller.drill_controllerMain_setCurSpeed( 1 );
		}else if( moveSpeed == 5 ){
			this._drill_EASe_controller.drill_controllerMain_setCurSpeed( 1.5 );
		}else if( moveSpeed == 6 ){
			this._drill_EASe_controller.drill_controllerMain_setCurSpeed( 2.5 );
		}else{
			this._drill_EASe_controller.drill_controllerMain_setCurSpeed( 1 );
		}
		
	}else{
		this._drill_EASe_controller.drill_controllerMain_setCurSpeed( 1 );
	}
}


//=============================================================================
// ** ☆固定帧
//=============================================================================
//...



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventActionSequenceAutomation = false;
		var pluginTip = DrillUp.drill_EASA_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


