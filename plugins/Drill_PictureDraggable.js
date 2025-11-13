//=============================================================================
// Drill_PictureDraggable.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        图片 - 可拖拽的图片
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureDraggable +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可以使得图片能够被鼠标拖拽。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfDragAndAdsorb        数学模型-拖拽与吸附核心
 *   - Drill_CoreOfPictureWithMouse     图片-图片与鼠标控制核心
 *   - Drill_PictureLayerAndZIndex      图片-层级与堆叠级
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片。
 * 2.详细内容可以去看看 "16.图片 > 关于鼠标拖拽图片.docx"。
 * 细节：
 *   (1.你必须先显示图片，再添加可拖拽属性，顺序不能反。
 *   (2.图片可以被鼠标拖移到任何地方，包括被拖移到游戏屏幕之外。
 *      若已经拖到屏幕外，可以使用插件指令让图片归位。
 * 图片的拖拽设置：
 *   (1.拖拽偏移量 指将图片拖拽后，图片的位置与原位置的距离差。
 *   (2.偏移清零 指将图片迅速归位到 原位置 。
 *      偏移合并 指将图片 原位置 变为图片现在所处位置，并以此位置为基准。
 *   (3.你可以通过插件指令手动控制图片 可拖拽 和 不可拖拽。
 * 鼠标的拖拽设置：
 *   (1.如果拖拽数量只有1，则拖拽时将会优先选择 最前面的（堆叠级大的）图片。
 *   (2.鼠标拖拽时，图片会自动置顶。
 *      如果其它图片通过图钉钉在当前拖拽图片，图钉的图片也会一起被置顶。
 * 设计：
 *   (1.你可以实现一张图片被拖移后，永久保持其位置状态。
 *      首先使用 拖拽合并 指令，合并拖移的位置，然后将图片的位置存储在
 *      变量中，下次再显示时，直接让图片移动到 存储的变量位置 即可。
 *   (2.图片可以在战斗界面中拖拽，
 *      但要注意战斗界面的指令默认 串行执行，需要注意改成并行执行，
 *      不然 插件指令 的反应会有延迟问题。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令控制拖拽绑定：
 * 
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 设置可拖拽
 * 插件指令：>鼠标拖拽图片 : 图片变量[1] : 设置可拖拽
 * 插件指令：>鼠标拖拽图片 : 批量图片[10,11] : 设置可拖拽
 * 插件指令：>鼠标拖拽图片 : 批量图片变量[21,22] : 设置可拖拽
 * 
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 设置可拖拽
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 设置不可拖拽
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 立即合并拖拽偏移量
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 立即清零拖拽偏移量
 * 
 * 1.前半部分（图片）和 后半部分（设置可拖拽）的参数可以随意组合。
 *   一共有4*4种组合方式。执行插件指令后，指定id的图片将会可拖拽。
 * 2."立即合并拖拽偏移量"可以使得图片的原位置重新标记为当前位置，避免偏移误差。
 *   "立即清零拖拽偏移量"可以使得图片回到拖拽前的位置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取偏移量
 * 你可以通过插件指令获取图片的拖拽偏移量：
 * 
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 获取拖拽偏移量X : 变量[25]
 * 插件指令：>鼠标拖拽图片 : 图片[1] : 获取拖拽偏移量Y : 变量[26]
 * 插件指令：>鼠标拖拽图片 : 图片变量[21] : 获取拖拽偏移量X : 变量[25]
 * 插件指令：>鼠标拖拽图片 : 图片变量[21] : 获取拖拽偏移量Y : 变量[26]
 * 
 * 1.若执行了事件指令"消除图片"，图片的拖拽偏移量将会被清零。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 鼠标的拖拽设置
 * 你可以通过插件指令控制鼠标的拖拽设置：
 * 
 * 插件指令：>鼠标拖拽图片 : 设置拖拽按键 : 鼠标左键开启
 * 插件指令：>鼠标拖拽图片 : 设置拖拽按键 : 鼠标左键关闭
 * 插件指令：>鼠标拖拽图片 : 设置拖拽按键 : 鼠标中键开启
 * 插件指令：>鼠标拖拽图片 : 设置拖拽按键 : 鼠标中键关闭
 * 插件指令：>鼠标拖拽图片 : 设置拖拽按键 : 鼠标右键开启
 * 插件指令：>鼠标拖拽图片 : 设置拖拽按键 : 鼠标右键关闭
 * 
 * 插件指令：>鼠标拖拽图片 : 设置最大同时拖拽数量 : 1
 * 插件指令：>鼠标拖拽图片 : 设置最大同时拖拽数量 : 变量[21]
 * 
 * 插件指令：>鼠标拖拽图片 : 拖拽时自动置顶图片 : 开启
 * 插件指令：>鼠标拖拽图片 : 拖拽时自动置顶图片 : 关闭
 * 插件指令：>鼠标拖拽图片 : 拖拽后永久置顶图片 : 开启
 * 插件指令：>鼠标拖拽图片 : 拖拽后永久置顶图片 : 关闭
 * 
 * 1."设置拖拽按键"即鼠标的拖拽功能开关，可以全关，表示关闭拖拽功能。
 * 2.如果拖拽数量只有1，则拖拽时将会优先选择 最前面的（堆叠级大的）图片。
 * 3."拖拽时自动置顶图片" 可以在拖拽时，使得图片堆叠级在最上面，结束拖拽就能还原堆叠级。
 *   "拖拽后永久置顶图片" 可以在结束拖拽后，改变图片的堆叠级，使其处于最上方。
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
 * 时间复杂度： o(n^3) 每帧
 * 测试方法：   在图片管理层放置多张图片，进行多张拖拽。
 * 测试结果：   200个事件的地图中，平均消耗为：【24.15ms】
 *              100个事件的地图中，平均消耗为：【21.46ms】
 *               50个事件的地图中，平均消耗为：【16.70ms】
 * 测试方法2：  在战斗时放置多张图片，进行多张拖拽。
 * 测试结果2：  战斗界面中，平均消耗为：【23.47ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件中需要实时确定鼠标位置，并且监听鼠标的按下释放状态，
 *   同时，还需要获取多张图片的范围位置，不过总体来说消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了 该插件 造成图片插件设置斜切无效的bug。
 * [v1.2]
 * 修正了"获取拖拽偏移量X"指令延迟生效的bug。
 * [v1.3]
 * 添加了 批量图片 插件指令设置。
 * 添加了 立即合并拖拽偏移量 功能。
 * [v1.4]
 * 大幅度改进了内部结构。
 * [v1.5]
 * 改进了拖拽多个对象时的结构。
 * 
 * 
 * 
 * @param 鼠标左键是否可拖拽
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 * 
 * @param 鼠标中键是否可拖拽
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 * 
 * @param 鼠标右键是否可拖拽
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭
 * @default true
 * 
 * @param 最大同时拖拽数量
 * @type number
 * @min 1
 * @desc 拖拽图片时，能同时拖拽图片的最大数量。
 * @default 10
 * 
 * @param 图片被拖拽时是否自动顺序置顶
 * @type boolean
 * @on 顺序置顶
 * @off 关闭
 * @desc true - 顺序置顶，false - 关闭
 * @default true
 * 
 * @param 图片被拖拽后是否永久置顶
 * @type boolean
 * @on 永久置顶
 * @off 关闭
 * @desc true - 永久置顶，false - 关闭。注意，永久置顶会改变图片的堆叠级。
 * @default false
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PDr (Picture_Draggable)
//		临时全局变量	DrillUp.g_PDr_xxx
//		临时局部变量	this._drill_PDr_xxx
//		存储数据变量	$gameSystem._drill_PDr_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)  每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	2024/5/2：
//							》16.7ms（drill_PDr_updateDrag_OffsetAndDraging）
//						2025/7/27：
//							》6.9ms（drill_PDr_updateDrag_OffsetAndDraging）11.9ms（drill_PDr_updateDrag_Priority）
//		★最坏情况		暂无
//		★备注			核心功能应用到图片贴图上，不需要过多考虑优化问题。
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
//			->☆拖拽管理 标准模块
//				->获取拖拽的偏移量X【标准函数】
//				->获取拖拽的偏移量Y【标准函数】
//				->立即合并拖拽偏移量【标准函数】
//				->立即清零拖拽偏移量【标准函数】
//			
//			->☆图片的属性
//				->数据
//					->初始化 数据
//					->删除数据
//					->消除图片
//					->消除图片（command235）
//				->获取控制器
//				->参数
//					->设置可拖拽
//					->是否可拖拽
//					->是否正在拖拽
//				->操作
//					->立即合并拖拽偏移量（私有）
//					->立即清零拖拽偏移量（私有）
//			->☆图片容器
//				->地图界面的图片
//				->战斗界面的图片
//				->刷新统计 被拖拽顺序
//			
//			->☆图片拖拽控制
//				->帧刷新 拖拽
//					->根据 被拖拽顺序 执行 帧刷新（大的优先）
//					->是否悬停
//					->是否按下
//					->鼠标位置
//					->继承 Game_Picture 的帧刷新，不分界面
//				->拖拽的偏移量X（继承）
//				->拖拽的偏移量Y（继承）
//			
//			->☆堆叠级控制
//				->开始拖拽时（继承）
//				->结束拖拽时（继承）
//				->刷新 拖拽时自动置顶图片
//				->刷新 拖拽后永久置顶图片
//			->☆地图点击拦截
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			16.图片 > 关于图片与鼠标控制核心（脚本）.docx
//			32.数学模型 > 关于拖拽与吸附控制核心（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			无
//
//		★其它说明细节：
//			1.图片比较特殊，同时在战斗界面和地图界面都要有效果。
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
	DrillUp.g_PDr_PluginTip_curName = "Drill_PictureDraggable.js 图片-可拖拽的图片";
	DrillUp.g_PDr_PluginTip_baseList = [
		"Drill_CoreOfDragAndAdsorb.js 数学模型-拖拽与吸附核心",
		"Drill_CoreOfPictureWithMouse.js 图片-图片与鼠标控制核心",
		"Drill_PictureLayerAndZIndex.js 图片-层级与堆叠级"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PDr_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PDr_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PDr_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PDr_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PDr_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PDr_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PDr_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	//==============================
	// * 提示信息 - 报错 - 外部插件冲突（旧插件改名）
	//==============================
	DrillUp.drill_PDr_getPluginTip_ConflictOldName = function(){
		return "【" + DrillUp.g_PDr_PluginTip_curName + "】\n注意，检测到重复的可拖拽的图片插件，请及时去掉旧插件 Drill_MouseDragPicture 。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureDraggable = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureDraggable');
	
	/*-----------------杂项------------------*/
	DrillUp.g_PDr_dragableLeft = String(DrillUp.parameters["鼠标左键是否可拖拽"] || "true") === "true";
	DrillUp.g_PDr_dragableMiddle = String(DrillUp.parameters["鼠标中键是否可拖拽"] || "true") === "true";
	DrillUp.g_PDr_dragableRight = String(DrillUp.parameters["鼠标右键是否可拖拽"] || "true") === "true";
	DrillUp.g_PDr_dragMaxCount = Number(DrillUp.parameters["最大同时拖拽数量"] || 1);
	DrillUp.g_PDr_dragAutoTop = String(DrillUp.parameters["图片被拖拽时是否自动顺序置顶"] || "true") === "true";
	DrillUp.g_PDr_dragChangeZIndex = String(DrillUp.parameters["图片被拖拽后是否永久置顶"] || "false") === "true";


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfDragAndAdsorb &&
	Imported.Drill_CoreOfPictureWithMouse &&
	Imported.Drill_PictureLayerAndZIndex ){
	
//==============================
// * >>>>基于插件检测>>>> - 最后继承
//==============================
var _drill_PDr_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_PDr_scene_initialize.call(this);
	if( Imported.Drill_MouseDragPicture ){
		alert( DrillUp.drill_PDr_getPluginTip_ConflictOldName() );
	};
}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PDr_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PDr_pluginCommand.call(this, command, args);
	this.drill_PDr_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PDr_pluginCommand = function( command, args ){
	if( command === ">鼠标拖拽图片" ){
		
		/*-----------------设置可拖拽------------------*/
		if( args.length == 4 ){			//>鼠标拖拽图片 : 图片[1] : 设置可拖拽
			var pic_str = String(args[1]);
			var type = String(args[3]);
			
			var pics = null;			// 图片对象组
			if( pics == null && pic_str.indexOf("批量图片[") != -1 ){
				pic_str = pic_str.replace("批量图片[","");
				pic_str = pic_str.replace("]","");
				pics = [];
				var temp_arr = pic_str.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_PDr_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && pic_str.indexOf("批量图片变量[") != -1 ){
				pic_str = pic_str.replace("批量图片变量[","");
				pic_str = pic_str.replace("]","");
				pics = [];
				var temp_arr = pic_str.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_PDr_isPictureExist( pic_id ) == false ){ continue; }
					var pic = $gameScreen.picture( pic_id );
					pics.push( pic );
				}
			}
			if( pics == null && pic_str.indexOf("图片变量[") != -1 ){
				pic_str = pic_str.replace("图片变量[","");
				pic_str = pic_str.replace("]","");
				var pic_id = $gameVariables.value( Number(pic_str) );
				if( $gameScreen.drill_PDr_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && pic_str.indexOf("图片[") != -1 ){
				pic_str = pic_str.replace("图片[","");
				pic_str = pic_str.replace("]","");
				var pic_id = Number(pic_str);
				if( $gameScreen.drill_PDr_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			
			if( pics != null ){
				if( type == "设置可拖拽" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PDr_setCanDrag( true );
					}
				}
				if( type == "设置不可拖拽" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PDr_setCanDrag( false );
					}
				}
				if( type == "立即合并拖拽偏移量" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PDr_mergeDragPosition();
					}
				}
				if( type == "立即清零拖拽偏移量" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PDr_clearDragPosition();
					}
				}
			}
		}
		
		/*-----------------获取偏移量------------------*/
		if( args.length == 6 ){				//>鼠标拖拽图片 : 图片[1] : 获取拖拽偏移量X : 变量[1]
			var pic_str = String(args[1]);
			var type = String(args[3]);
			var temp3 = String(args[5]);
			
			var pic = null;
			if( pic_str.indexOf("图片变量[") != -1 ){
				pic_str = pic_str.replace("图片变量[","");
				pic_str = pic_str.replace("]","");
				var pic_id = $gameVariables.value( Number(pic_str) );
				if( $gameScreen.drill_PDr_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			if( pic_str.indexOf("图片[") != -1 ){
				pic_str = pic_str.replace("图片[","");
				pic_str = pic_str.replace("]","");
				var pic_id = Number(pic_str);
				if( $gameScreen.drill_PDr_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			
			if( pic != null ){
				if( type == "获取拖拽偏移量X" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3);
					$gameVariables.setValue( temp3, Math.floor( pic.drill_PDr_getDraggingXOffset() ) );
				}
				if( type == "获取拖拽偏移量Y" ){
					temp3 = temp3.replace("变量[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3);
					$gameVariables.setValue( temp3, Math.floor( pic.drill_PDr_getDraggingYOffset() ) );
				}
			}
		}
		
		/*-----------------拖拽配置------------------*/
		if( args.length == 4 ){				//>鼠标拖拽图片 : 设置拖拽按键 : 鼠标左键开启
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			
			if( temp1 == "设置拖拽按键" || temp1 == "设置拖拽开关" ){
				if( temp2 == "鼠标左键开启" ){ $gameSystem._drill_PDr_dragableLeft = true; }
				if( temp2 == "鼠标左键关闭" ){ $gameSystem._drill_PDr_dragableLeft = false; }
				if( temp2 == "鼠标中键开启" ){ $gameSystem._drill_PDr_dragableMiddle = true; }
				if( temp2 == "鼠标中键关闭" ){ $gameSystem._drill_PDr_dragableMiddle = false; }
				if( temp2 == "鼠标右键开启" ){ $gameSystem._drill_PDr_dragableRight = true; }
				if( temp2 == "鼠标右键关闭" ){ $gameSystem._drill_PDr_dragableRight = false; }
			}
			if( temp1 == "设置最大同时拖拽数量" ){
				if( temp2.indexOf("变量[") != -1 ){
					temp2 = temp2.replace("变量[","");
					temp2 = temp2.replace("]","");
					var max_count = $gameVariables.value( Number(temp2) );
					$gameSystem.drill_CODAA_dragFactory().drill_factoryDrag_setDragMaxCount( "PDr", max_count );
				}else{
					var max_count = Number(temp2);
					$gameSystem.drill_CODAA_dragFactory().drill_factoryDrag_setDragMaxCount( "PDr", max_count );
				}
			}
			if( temp1 == "拖拽时自动置顶图片" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
					$gameSystem._drill_PDr_dragAutoTop = true;
				}
				if( temp2 == "关闭" || temp2 == "禁用" ){
					$gameSystem._drill_PDr_dragAutoTop = false;
					$gameSystem._drill_PDr_dragChangeZIndex = false;	//（自动置顶关闭时，永久置顶也关闭）
				}
			}
			if( temp1 == "拖拽后永久置顶图片" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
					$gameSystem._drill_PDr_dragAutoTop = true;
					$gameSystem._drill_PDr_dragChangeZIndex = true;		//（永久置顶开启时，自动置顶也开启）
				}
				if( temp2 == "关闭" || temp2 == "禁用" ){
					$gameSystem._drill_PDr_dragChangeZIndex = false;
				}
			}
		}
	};
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PDr_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PDr_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};
//==============================
// * 插件指令 - STG兼容『STG的插件指令』
//==============================
if( Imported.Drill_STG__objects ){
	
	//==============================
	// * 插件指令 - STG指令绑定
	//==============================
	var _drill_STG_PDr_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_PDr_pluginCommand.call(this, command, args);
		this.drill_PDr_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_PDr_pluginCommand = Game_Interpreter.prototype.drill_PDr_pluginCommand;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_PDr_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PDr_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PDr_sys_initialize.call(this);
	this.drill_PDr_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PDr_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PDr_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PDr_saveEnabled == true ){	
		$gameSystem.drill_PDr_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PDr_initSysData();
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
Game_System.prototype.drill_PDr_initSysData = function() {
	this.drill_PDr_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PDr_checkSysData = function() {
	this.drill_PDr_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PDr_initSysData_Private = function() {
	
	this._drill_PDr_dragableLeft = DrillUp.g_PDr_dragableLeft;			//鼠标左键是否可拖拽
	this._drill_PDr_dragableMiddle = DrillUp.g_PDr_dragableMiddle;		//鼠标中键是否可拖拽
	this._drill_PDr_dragableRight = DrillUp.g_PDr_dragableRight;		//鼠标右键是否可拖拽
	this._drill_PDr_dragAutoTop = DrillUp.g_PDr_dragAutoTop;			//拖拽时自动置顶图片
	this._drill_PDr_dragChangeZIndex = DrillUp.g_PDr_dragChangeZIndex;	//拖拽后永久置顶图片
	
	
	// > 最大同时拖拽数量
	this.drill_CODAA_dragFactory().drill_factoryDrag_setDragMaxCount( "PDr", DrillUp.g_PDr_dragMaxCount );
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PDr_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PDr_dragMaxCount == undefined ){
		this.drill_PDr_initSysData();
	}
};



//#############################################################################
// ** ☆拖拽管理 标准模块
//
//			说明：	> 即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 拖拽管理 - 获取拖拽的偏移量X【标准函数】
//
//			参数：	> 无
//			返回：	> 数字
//					
//			说明：	> 返回拖拽所产生的实际偏移量X，单位像素。
//##############################
Game_Picture.prototype.drill_PDr_getDraggingXOffset = function(){
	return this.drill_PDr_getDraggingXOffset_Private();
}
//##############################
// * 拖拽管理 - 获取拖拽的偏移量Y【标准函数】
//
//			参数：	> 无
//			返回：	> 数字
//					
//			说明：	> 返回拖拽所产生的实际偏移量Y，单位像素。
//##############################
Game_Picture.prototype.drill_PDr_getDraggingYOffset = function(){
	return this.drill_PDr_getDraggingYOffset_Private();
}
//##############################
// * 拖拽管理 - 立即合并拖拽偏移量【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 将拖拽偏移量转移到图片坐标中，图片显示的位置不会变。
//					> 子插件 会手动调用此函数。
//##############################
Game_Picture.prototype.drill_PDr_mergeDragPosition = function(){
	this.drill_PDr_mergeDragPosition_Private();
}
//##############################
// * 拖拽管理 - 立即清零拖拽偏移量【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 将拖拽偏移量清零，图片会立即归位原位置。
//					> 子插件 会手动调用此函数。
//##############################
Game_Picture.prototype.drill_PDr_clearDragPosition = function(){
	this.drill_PDr_clearDragPosition_Private();
}
//==============================
// * 拖拽管理 - 相同函数兼容
//==============================
Game_Picture.prototype.drill_MDP_getDraggingXOffset = Game_Picture.prototype.drill_PDr_getDraggingXOffset;
Game_Picture.prototype.drill_MDP_getDraggingYOffset = Game_Picture.prototype.drill_PDr_getDraggingYOffset;



//=============================================================================
// ** ☆图片的属性
//
//			说明：	> 此模块专门定义 图片的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片的属性 - 初始化
//==============================
var _drill_PDr_attr_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(){
	this._drill_PDr_attrData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PDr_attr_initialize.call(this);
}
//==============================
// * 图片的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：attrData，一对一。
//==============================
Game_Picture.prototype.drill_PDr_checkAttrData = function(){
	
	// > 【图片-图片与鼠标控制核心】强制绑定
	this.drill_COPWM_checkData();
	
	if( this._drill_PDr_attrData != undefined ){ return; }
	this._drill_PDr_attrData = {};
	
	// > 数据 - 图片ID【图片-图片优化核心】
	var pic_id = this.drill_COPi_getPictureId();
	this._drill_PDr_attrData['pic_id'] = pic_id;
	
	// > 数据 - 拖拽控制器ID【数学模型-拖拽与吸附核心】
	var drag_factory = $gameSystem.drill_CODAA_dragFactory();
	var product_id = drag_factory.drill_factoryDrag_create( "PDr" );	//（通过工厂创建控制器，并印上该插件的简称）
	this._drill_PDr_attrData['dragController_id'] = product_id;
	
	// > 数据 - 拖拽控制器的优先级
	var controller = this.drill_PDr_getDragController();
	controller.drill_controllerDrag_setPriorityValue( pic_id );
	
	// > 数据 - 拖拽控制器的优先级 堆叠级影响【图片 - 层级与堆叠级】
	if( this._drill_PLAZ_data != undefined ){
		controller.drill_controllerDrag_setPriorityValue( this._drill_PLAZ_data['zIndex'] );
	}
}
//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PDr_removeAttrData = function(){
	
	// > 删除控制器
	var controller = this.drill_PDr_getDragController();
	if( controller != undefined ){
		$gameSystem.drill_CODAA_dragFactory().drill_factoryDrag_remove( controller );
	}
	
	// > 删除数据
	this._drill_PDr_attrData = undefined;
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PDr_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PDr_p_erase.call( this );
	this.drill_PDr_removeAttrData();						//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PDr_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PDr_removeAttrData();				//（删除数据）
	}
	_drill_PDr_p_erasePicture.call( this, pictureId );
}

//==============================
// * 图片的属性 - 获取控制器（根据控制器id）（开放函数）
//
//			说明：	> 该函数返回 拖拽控制器 的指针。
//==============================
Game_Picture.prototype.drill_PDr_getDragController = function(){
	if( this._drill_PDr_attrData == undefined ){ return null; }
	var product_id = this._drill_PDr_attrData['dragController_id'];
	return $gameSystem.drill_CODAA_dragFactory().drill_factoryDrag_getByProductId( product_id );
}
//==============================
// * 图片的属性 - 获取图片（根据控制器id）（开放函数）
//
//			说明：	> 该函数返回 图片数据 的指针。注意此处是Game_Screen类。
//==============================
Game_Screen.prototype.drill_PDr_getPicture_ByDragControllerId = function( dragControllerId ){
	for(var i = 0; i < this._pictures.length; i++ ){
		var temp_picture = this._pictures[i];
		if( temp_picture == undefined ){ continue; }
		if( temp_picture._drill_PDr_attrData == undefined ){ continue; }
		if( temp_picture._drill_PDr_attrData['dragController_id'] == dragControllerId ){
			return temp_picture;
		}
	}
	return null;
}
//==============================
// * 图片的属性 - 设置堆叠级（继承）【图片 - 层级与堆叠级】
//
//			说明：	> 此处专门同步 拖拽控制器的优先级 的数据。
//==============================
var _drill_PDr_PLAZ_setZIndex = Game_Picture.prototype.drill_PLAZ_setZIndex;
Game_Picture.prototype.drill_PLAZ_setZIndex = function( zIndex ){
	_drill_PDr_PLAZ_setZIndex.call( this, zIndex );
	
	// > 同步 拖拽控制器的优先级
	var controller = this.drill_PDr_getDragController();
	if( controller != undefined ){
		controller.drill_controllerDrag_setPriorityValue( zIndex );
	}
}
//==============================
// * 图片的属性 - 参数 - 设置可拖拽
//==============================
Game_Picture.prototype.drill_PDr_setCanDrag = function( enabled ){
	this.drill_PDr_checkAttrData();
	this.drill_PDr_getDragController().drill_controllerDrag_setCanDrag( enabled );
}
//==============================
// * 图片的属性 - 参数 - 是否可拖拽
//==============================
Game_Picture.prototype.drill_PDr_canDrag = function(){
	if( this._drill_PDr_attrData == undefined ){ return false; }
	return this.drill_PDr_getDragController().drill_controllerDrag_canDrag();
}
//==============================
// * 图片的属性 - 参数 - 是否正在拖拽
//==============================
Game_Picture.prototype.drill_PDr_isDraging = function(){
	if( this._drill_PDr_attrData == undefined ){ return false; }
	return this.drill_PDr_getDragController().drill_controllerDrag_isDraging();
}

//==============================
// * 图片的属性 - 操作 - 立即合并拖拽偏移量（私有）
//==============================
Game_Picture.prototype.drill_PDr_mergeDragPosition_Private = function() {
	this.drill_PDr_checkAttrData();
	
	// > 原位置+=偏移量
	var controller = this.drill_PDr_getDragController();
	this._x += controller.drill_controllerDrag_getDraggingXOffset();
	this._y += controller.drill_controllerDrag_getDraggingYOffset();
	
	// > 立即清零
	controller.drill_controllerDrag_clearDragPosition();
}
//==============================
// * 图片的属性 - 操作 - 立即清零拖拽偏移量（私有）
//==============================
Game_Picture.prototype.drill_PDr_clearDragPosition_Private = function() {
	this.drill_PDr_checkAttrData();
	this.drill_PDr_getDragController().drill_controllerDrag_clearDragPosition();
}



//=============================================================================
// ** ☆图片拖拽控制
//
//			说明：	> 此模块管理 图片拖拽 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片拖拽控制 - 帧刷新
//==============================
var _drill_PDr_screen2_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function(){
	_drill_PDr_screen2_update.call( this );
	
	// > 『拖拽的散装帧刷新』 - 拖拽优先级
	for(var i = 0; i < $gameScreen._pictures.length; i++){
		var picture = $gameScreen._pictures[i];
		if( picture == undefined ){ continue; }
		picture.drill_PDr_updateDrag_Priority();
	}
	
	// > 『拖拽的散装帧刷新』 - 拖拽数量最大值
	$gameSystem.drill_CODAA_dragFactory().drill_factoryDrag_updateDragMax( "PDr" );
	
	// > 『拖拽的散装帧刷新』 - 拖拽位移和标记
	for(var i = 0; i < $gameScreen._pictures.length; i++){
		var picture = $gameScreen._pictures[i];
		if( picture == undefined ){ continue; }
		picture.drill_PDr_updateDrag_OffsetAndDraging();
	}
}
//==============================
// * 图片拖拽控制 - 帧刷新 - 拖拽优先级
//==============================
Game_Picture.prototype.drill_PDr_updateDrag_Priority = function() {
	var controller = this.drill_PDr_getDragController();
	if( controller == undefined ){ return; }
	
	// > 参数 - 是否悬停【图片 - 图片与鼠标控制核心】
	var is_onHover = this.drill_COPWM_isOnHover();
	
	// > 参数 - 是否按下
	var is_onPress = false;
	if( $gameSystem._drill_PDr_dragableLeft   && TouchInput.drill_isLeftPressed()   ){ is_onPress = true; }
	if( $gameSystem._drill_PDr_dragableMiddle && TouchInput.drill_isMiddlePressed() ){ is_onPress = true; }
	if( $gameSystem._drill_PDr_dragableRight  && TouchInput.drill_isRightPressed()  ){ is_onPress = true; }
	
	// > 帧刷新 控制器
	controller.drill_controllerDrag_updatePriority( is_onHover, is_onPress );
}
//==============================
// * 图片拖拽控制 - 帧刷新 - 拖拽位移和标记
//			
//			说明：	> 此处已经完成了 拖拽优先级 和 拖拽优先级结果 的帧刷新。
//					> 可以获取 优先级结果列表。（$gameTemp.drill_CODAA_getDragPriorityOrderTank("PDr"); ）
//==============================
Game_Picture.prototype.drill_PDr_updateDrag_OffsetAndDraging = function() {
	var controller = this.drill_PDr_getDragController();
	if( controller == undefined ){ return; }
	
	// > 参数 - 是否悬停【图片 - 图片与鼠标控制核心】
	var is_onHover = this.drill_COPWM_isOnHover();
	
	// > 参数 - 是否按下
	var is_onPress = false;
	if( $gameSystem._drill_PDr_dragableLeft   && TouchInput.drill_isLeftPressed()   ){ is_onPress = true; }
	if( $gameSystem._drill_PDr_dragableMiddle && TouchInput.drill_isMiddlePressed() ){ is_onPress = true; }
	if( $gameSystem._drill_PDr_dragableRight  && TouchInput.drill_isRightPressed()  ){ is_onPress = true; }
	
	// > 参数 - 鼠标位置
	var xx = _drill_mouse_x;
	var yy = _drill_mouse_y;
	
	// > 帧刷新 控制器
	controller.drill_controllerDrag_updateOffset( xx, yy );
	controller.drill_controllerDrag_updateDraging( is_onHover, is_onPress );
}

//==============================
// * 图片拖拽控制 - 获取拖拽偏移量X（私有）
//==============================
Game_Picture.prototype.drill_PDr_getDraggingXOffset_Private = function(){
	if( this._drill_PDr_attrData == undefined ){ return 0; }
	return this.drill_PDr_getDragController().drill_controllerDrag_getDraggingXOffset();
}
//==============================
// * 图片拖拽控制 - 获取拖拽偏移量Y（私有）
//==============================
Game_Picture.prototype.drill_PDr_getDraggingYOffset_Private = function(){
	if( this._drill_PDr_attrData == undefined ){ return 0; }
	return this.drill_PDr_getDragController().drill_controllerDrag_getDraggingYOffset();
}
//==============================
// * 图片拖拽控制 - 拖拽的偏移量X（继承）
//==============================
var _drill_PDr_COPi_finalTransform_x = Game_Picture.prototype.drill_COPi_finalTransform_x;
Game_Picture.prototype.drill_COPi_finalTransform_x = function() {
	var xx = _drill_PDr_COPi_finalTransform_x.call(this);
	xx += this.drill_PDr_getDraggingXOffset_Private();
	return xx;
};
//==============================
// * 图片拖拽控制 - 拖拽的偏移量Y（继承）
//==============================
var _drill_PDr_COPi_finalTransform_y = Game_Picture.prototype.drill_COPi_finalTransform_y;
Game_Picture.prototype.drill_COPi_finalTransform_y = function() {
	var yy = _drill_PDr_COPi_finalTransform_y.call(this);
	yy += this.drill_PDr_getDraggingYOffset_Private();
	return yy;
};



//=============================================================================
// ** ☆堆叠级控制
//
//			说明：	> 此模块控制 图片 的堆叠级。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 堆叠级控制 - 开始拖拽时（继承）
//==============================
var _drill_PDr_CODAA_dragStarting = Drill_CODAA_DragController.prototype.drill_controllerDrag_dragStarting;
Drill_CODAA_DragController.prototype.drill_controllerDrag_dragStarting = function() {
	_drill_PDr_CODAA_dragStarting.call(this);
	
	if( this._drill_pluginShort == "PDr" ){				//（根据插件简称，找到该插件创建的 拖拽控制器 ）
		$gameTemp.drill_COPi_needRefreshSpriteZIndex();	//（刷新堆叠级）
	}
}
//==============================
// * 堆叠级控制 - 结束拖拽时（继承）
//==============================
var _drill_PDr_CODAA_dragEnding = Drill_CODAA_DragController.prototype.drill_controllerDrag_dragEnding;
Drill_CODAA_DragController.prototype.drill_controllerDrag_dragEnding = function() {
	_drill_PDr_CODAA_dragEnding.call(this);
	
	if( this._drill_pluginShort == "PDr" ){									//（根据插件简称，找到该插件创建的 拖拽控制器 ）
		$gameScreen.drill_PDr_refreshPictureZIndex(this._drill_productId);	//（刷新堆叠级数据）
		$gameTemp.drill_COPi_needRefreshSpriteZIndex();						//（刷新堆叠级）
	}
}
//==============================
// * 堆叠级控制 - 设置堆叠级时（继承）
//==============================
var _drill_PDr_whenRefreshZIndex = Game_Temp.prototype.drill_COPi_whenRefreshZIndex;
Game_Temp.prototype.drill_COPi_whenRefreshZIndex = function( temp_sprite, picture_id ){
	_drill_PDr_whenRefreshZIndex.call( this, temp_sprite, picture_id );
	this.drill_PDr_refreshSpriteZIndex( temp_sprite, picture_id );
}
//==============================
// * 堆叠级控制 - 刷新 拖拽时自动置顶图片
//==============================
Game_Temp.prototype.drill_PDr_refreshSpriteZIndex = function( temp_sprite, picture_id ){
	var picture = temp_sprite.picture();
	if( picture == undefined ){ return; }
	
	// > 设置 贴图的堆叠级
	if( picture.drill_PDr_isDraging() == true ){
		if( $gameSystem._drill_PDr_dragAutoTop == true ){
			temp_sprite.zIndex += 9999;
			return;
		}
	}
	
	// > 钉住的图片情况【图片-图片图钉】
	if( Imported.Drill_PictureThumbtack ){
		if( picture._drill_PTh_data != undefined &&
			picture._drill_PTh_data['bindPos_type'] == "图片" ){
			var tar_pic_id = picture._drill_PTh_data['bindPos_picId'];
			var tar_picture = $gameScreen.picture( tar_pic_id );
			if( tar_picture != undefined ){
				
				// > 设置 贴图的堆叠级（图钉的目标图片被拖拽，图钉图片也一起提升 堆叠级）
				if( tar_picture.drill_PDr_isDraging() == true ){
					if( $gameSystem._drill_PDr_dragAutoTop == true ){
						temp_sprite.zIndex += 9999;
						return;
					}
				}
			}
		}
	}
}
//==============================
// * 堆叠级控制 - 刷新 拖拽后永久置顶图片
//==============================
Game_Screen.prototype.drill_PDr_refreshPictureZIndex = function( dragControllerId ){
	if( $gameSystem._drill_PDr_dragChangeZIndex != true ){ return; }
	
	// > 获取推荐优先级
	//		（结束拖拽时，处于函数 拖拽位移和标记 中，此时已经执行完了 drill_factoryDrag_updateDragMax ）
	var recommend_zIndex = $gameTemp.drill_CODAA_getDragRecommendPriority( "PDr", dragControllerId );
	
	// > 设置 堆叠级
	var picture = this.drill_PDr_getPicture_ByDragControllerId( dragControllerId );
	if( picture == undefined ){ return; }
	var last_zIndex = picture.drill_PLAZ_getZIndex();
	var diff_zIndex = recommend_zIndex - last_zIndex;
	picture.drill_PLAZ_setZIndex( recommend_zIndex );
	
	// > 钉住的图片情况【图片-图片图钉】
	if( Imported.Drill_PictureThumbtack ){
		if( picture._drill_PTh_data != undefined &&
			picture._drill_PTh_data['bindPos_type'] == "图片" ){
			var tar_pic_id = picture._drill_PTh_data['bindPos_picId'];
			var tar_picture = $gameScreen.picture( tar_pic_id );
			if( tar_picture != undefined ){
				var tar_zIndex = tar_picture.drill_PLAZ_getZIndex();
				tar_picture.drill_PLAZ_setZIndex( tar_zIndex + diff_zIndex );
			}
		}
	}
}


//=============================================================================
// ** ☆地图点击拦截
//
//			说明：	> 此模块专门管理 地图点击拦截，只要有鼠标悬停时，就阻止地图点击功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 地图点击拦截 - 点击监听『多场景与图片-地图界面』
//==============================
var _drill_PDr_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {	
	if( this.drill_PDr_hasAnyHovered() ){ return; }
	_drill_PDr_processMapTouch.call(this);
};
//==============================
// * 地图点击拦截 - 条件
//==============================
Scene_Map.prototype.drill_PDr_hasAnyHovered = function() {
	for(var i = 0; i < $gameScreen._pictures.length; i++){
		var picture = $gameScreen._pictures[i];
		if( picture == undefined ){ continue; }
		var controller = picture.drill_PDr_getDragController();
		if( controller == undefined ){ continue; }
		if( controller.drill_controllerDrag_isHovering() == true ){
			return true;
		}
	}
	return false;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureDraggable = false;
		var pluginTip = DrillUp.drill_PDr_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


