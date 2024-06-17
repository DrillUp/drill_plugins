//=============================================================================
// Drill_PictureMouseHoverTrigger.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        图片 - 鼠标悬停触发图片
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureMouseHoverTrigger +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 鼠标悬停触发图片指 鼠标悬停+执行点击操作 时，能触发执行公共事件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfPictureWithMouse   图片-图片与鼠标控制核心
 * 可被扩展：
 *   - Drill_LayerCommandThread       地图-多线程
 *   - Drill_BattleCommandThread      战斗-多线程
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只作用于图片。
 * 2.详细内容可以去看看 "16.图片 > 关于图片与鼠标控制核心.docx"。
 * 细节：
 *   (1.需要先建立图片后，再进行 绑定设置，顺序不能反。
 *      公共事件的绑定方法设计，可以去看看文档：
 *      "16.图片 > 关于图片与鼠标控制核心.docx" 的 公共事件规划 章节。
 *   (2.若在图片悬停时按住，然后鼠标移出图片范围，再释放，"悬停释放"不会被触发。
 *      无论图片能否被拖拽，只要没出图片范围，"离开悬停"就不会被触发。
 *   (3.删除图片后，所有图片的绑定会被解除，需要重新绑定。
 * 公共事件：
 *   (1.地图界面/战斗界面 都可以设置 串行/并行。
 *   (2.注意，对话框事件指令 是特殊的指令体，只要执行对话框，就会强制串行，
 *      阻塞其他所有事件的线程。
 *   (3."上一次触发的" = "当前触发的" 你在公共事件中执行获取，就是当前的。
 *   (4.如果你的公共事件是并行执行，且有等待指令，那么一定要在等待指令之
 *      前获取"上一次触发"的数据，不然数据可能会被其他事件冲掉。
 * 设计：
 *   (1.你可以通过该插件，制作简单的图片点击按钮功能。
 *      能实现 地图界面和战斗界面 的简单按钮。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 绑定设置
 * 你需要通过插件指令控制鼠标事件绑定：
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-离开悬停[一帧]时 : 执行公共事件[1]
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停左键按下[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停左键释放[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停左键双击[一帧]时 : 执行公共事件[1]
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停右键按下[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停右键释放[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停右键双击[一帧]时 : 执行公共事件[1]
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停滚轮按下[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停滚轮释放[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停滚轮双击[一帧]时 : 执行公共事件[1]
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停滚轮上滚时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停滚轮下滚时 : 执行公共事件[1]
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停左键或右键按下[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停左键或右键释放[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停左键或右键双击[一帧]时 : 执行公共事件[1]
 * 
 * 1.当前为单次触发，只在满足条件的那一帧执行一次开启/关闭。
 *   由于图片没有事件页机制，因此只支持单次触发，不支持持续触发。
 * 2.上述的指令互斥，每个绑定设置能绑定上述的一个类型。
 * 3.删除图片后，所有图片的绑定会被解除，需要重新绑定。
 *   切换地图不会影响绑定，切换战斗界面不会影响绑定。（但地图的图片在战斗界面不会显示）
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 变量值设置
 * 你需要通过插件指令控制鼠标事件绑定：
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片变量[21] : 绑定设置[1] : 绑定单次触发-悬停[一帧]时 : 执行公共事件[1]
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置变量[22] : 绑定单次触发-悬停[一帧]时 : 执行公共事件[1]
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停[一帧]时 : 执行公共事件变量[23]
 * 
 * 1."图片[1]"、"绑定设置[1]"、"执行公共事件[1]"的部分都可以用变量值设置，并随意组合。
 *   一共有2*2*16*2种组合方式。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 绑定设置
 * 你需要通过插件指令控制鼠标事件绑定：
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停[一帧]时 : 执行公共事件[1]
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 解除绑定
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 解除全部绑定设置
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : Debug显示当前全部绑定
 * 
 * 1.注意，如果直接执行了删除图片，则在删除后就已经"解除绑定"了。
 *   你如果不确定当前图片绑定了哪些公共事件，可以用指令"Debug显示当前全部绑定"。
 * 2.删除图片后，所有图片的绑定会被解除，需要重新绑定。
 *   切换地图不会影响绑定，切换战斗界面不会影响绑定。（但地图的图片在战斗界面不会显示）
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 临时关闭开启绑定
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 关闭绑定
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 开启绑定
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 关闭全部绑定
 * 插件指令：>鼠标悬停触发图片 : 图片[1] : 开启全部绑定
 * 
 * 1.你可以在公共事件中设置"关闭绑定"，防止 公共事件被连点后 造成重复触发的问题。
 *   详细内容可以去看看 "16.图片 > 关于图片与鼠标控制核心.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 触发设置
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>鼠标悬停触发图片 : 对话框弹出时保持触发
 * 插件指令：>鼠标悬停触发图片 : 对话框弹出时暂停触发
 * 插件指令：>鼠标悬停触发图片 : 鼠标按下重合区域时 : 禁止触发
 * 插件指令：>鼠标悬停触发图片 : 鼠标按下重合区域时 : 只触发最上面的
 * 插件指令：>鼠标悬停触发图片 : 鼠标按下重合区域时 : 触发全部
 * 
 * 1."只触发最上面的"表示如果有多张图片重合，
 *    且图片绑定了 按下[一帧]、释放[一帧]、双击[一帧] 的设置时，
 *    只触发 最上面的图片 。
 *    注意，该设置 不检查 悬停、离开悬停、滚轮上滚时、滚轮下滚时 的绑定。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取触发记录
 * 你可以获取插件触发记录中的数据：
 * 
 * 插件指令：>鼠标悬停触发图片 : 获取触发记录 : 上一次触发的图片ID : 变量[21]
 * 插件指令：>鼠标悬停触发图片 : 获取触发记录 : 上一次触发的绑定设置ID : 变量[22]
 * 插件指令：>鼠标悬停触发图片 : 获取触发记录 : 上一次触发的公共事件ID : 变量[23]
 * 
 * 插件指令：>鼠标悬停触发图片 : 获取触发记录 : 上一次触发的鼠标位置X : 变量[25]
 * 插件指令：>鼠标悬停触发图片 : 获取触发记录 : 上一次触发的鼠标位置Y : 变量[26]
 * 
 * 1."上一次触发的" = "当前触发的" 你在公共事件中执行获取，就是当前的。
 * 2.如果你的公共事件是并行执行，且有等待指令，那么一定要在等待指令之前获取
 *   "上一次触发"的数据，不然数据可能会被其他事件冲掉。
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
 * 时间复杂度： o(n^2)  每帧
 * 测试方法：   在图片管理层进行图片鼠标触发测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【10.31ms】
 *              100个事件的地图中，平均消耗为：【9.15ms】
 *               50个事件的地图中，平均消耗为：【7.10ms】
 * 测试方法2：  在战斗时，进行图片鼠标触发测试。
 * 测试结果2：  战斗界面中，平均消耗为：【9.41ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于主要监听鼠标的位置，并不对图片进行实时的追踪处理，所以
 *   消耗非常小。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了重复加入事件绑定会叠加的bug。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * [v1.3]
 * 大幅度改进了内部结构。
 * [v1.4]
 * 将插件改名，并接入了图片与鼠标控制核心支持结构。
 * [v1.5]
 * 添加了"鼠标按下重合区域时"的设置。
 * 
 * 
 * 
 * @param 对话框弹出时是否保持触发
 * @type boolean
 * @on 保持触发
 * @off 暂停触发
 * @desc 对话框弹出时，通常会暂停鼠标的事件触发监听。你可以设置弹出后仍然保持触发。
 * @default true
 *
 * @param 鼠标按下重合区域时
 * @type select
 * @option 禁止触发
 * @value 禁止触发
 * @option 只触发最上面的
 * @value 只触发最上面的
 * @option 触发全部
 * @value 触发全部
 * @desc 如果有多张图片重合，且图片绑定了 按下[一帧]、释放[一帧]、双击[一帧] 的设置时，执行的判断逻辑。
 * @default 只触发最上面的
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PMHT (Picture_Mouse_Hover_Trigger)
//		临时全局变量	DrillUp.g_PMHT_xxx
//		临时局部变量	this._drill_PMHT_xxx
//		存储数据变量	$gameSystem._drill_PMHT_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)  每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	2024/5/2：
//							》地图界面：7.1ms（drill_PMHT_updateSwitch）
//							》战斗界面：4.8ms（drill_PMHT_updateSwitch）
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
//			->☆图片的属性
//				->数据
//					->初始化 数据
//					->初始化 绑定容器
//					->删除数据
//					->消除图片
//					->消除图片（command235）
//				->参数
//					->公共事件开关赋值
//					->公共事件ID赋值
//					->设置鼠标触发类型
//				->获取图片ID
//				->显示全部绑定信息
//			->☆图片容器
//				->地图界面的图片
//				->战斗界面的图片
//			
//			->☆图片触发控制
//				->根据 触发顺序 执行 帧刷新（大的优先）
//				->触发结果
//					->无触发时
//					->有一个触发时
//					->有多个触发时
//			->☆公共事件控制
//			
//			->☆地图点击拦截
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			16.图片 > 关于图片与鼠标控制核心（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.该插件的悬停判定来自于核心，搜索 COPWM 就能找到。
//
//		★其它说明细节：
//			1.该插件原本写了一大堆的注释和说明，全都来自于如何判定鼠标悬停，使用核心后就全部不需要了。
//			2.图片比较特殊，同时在战斗界面和地图界面都要有效果。
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
	DrillUp.g_PMHT_PluginTip_curName = "Drill_PictureMouseHoverTrigger.js 图片-鼠标悬停触发图片";
	DrillUp.g_PMHT_PluginTip_baseList = [
		"Drill_CoreOfPictureWithMouse.js 图片-图片与鼠标控制核心",
		"Drill_LayerCommandThread.js 地图-多线程",
		"Drill_BattleCommandThread.js 战斗-多线程"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PMHT_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PMHT_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PMHT_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PMHT_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PMHT_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PMHT_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PMHT_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureMouseHoverTrigger = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureMouseHoverTrigger');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_PMHT_remainTrigger = String(DrillUp.parameters['对话框弹出时是否保持触发'] || "true") === "true";
    DrillUp.g_PMHT_pressSingleTrigger = String(DrillUp.parameters['鼠标按下重合区域时'] || "只触发最上面的");
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfPictureWithMouse &&
	Imported.Drill_LayerCommandThread &&
	Imported.Drill_BattleCommandThread ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_PMHT_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PMHT_pluginCommand.call(this, command, args);
	if( command === ">鼠标悬停触发图片" ){
			
		/*-----------------对象组获取------------------*/
		var pic = null;
		if( args.length >= 2 ){
			var pic_id = String(args[1]);
			if( pic_id.indexOf("图片变量[") != -1 ){
				pic_id = pic_id.replace("图片变量[","");
				pic_id = pic_id.replace("]","");
				pic_id = $gameVariables.value( Number(pic_id) );
				if( $gameScreen.drill_PMHT_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
			else if( pic_id.indexOf("图片[") != -1 ){
				pic_id = pic_id.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
				if( $gameScreen.drill_PMHT_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
		}
		
		var bind_id = null;
		if( args.length >= 4 ){
			var bind_id_str = String(args[3]);
			if( bind_id_str.indexOf("绑定设置变量[") != -1 ){
				bind_id_str = bind_id_str.replace("绑定设置变量[","");
				bind_id_str = bind_id_str.replace("]","");
				bind_id = $gameVariables.value( Number(bind_id_str) );
			}
			else if( bind_id_str.indexOf("绑定设置[") != -1 ){
				bind_id_str = bind_id_str.replace("绑定设置[","");
				bind_id_str = bind_id_str.replace("]","");
				bind_id = Number(bind_id_str);		//（这里就不减1了，因为变量为0就会得到-1值）
			}
		}
		
		/*-----------------绑定单次触发------------------*/
		if( args.length == 8 ){		//>鼠标悬停触发图片 : 图片[1] : 绑定设置[1] : 绑定单次触发-悬停[一帧]时 : 执行公共事件[1]
			var type = String(args[5]);
			var temp4 = String(args[7]);
			
			if( pic != null && bind_id != null ){
				if( temp4.indexOf("执行公共事件变量[") != -1 ){
					temp4 = temp4.replace("执行公共事件变量[","");
					temp4 = temp4.replace("]","");
					temp4 = $gameVariables.value( Number(temp4) );
				}
				else if( temp4.indexOf("执行公共事件[") != -1 ){
					temp4 = temp4.replace("执行公共事件[","");
					temp4 = temp4.replace("]","");
					temp4 = Number(temp4);
				}
				var value = Number(temp4);

				// > 单次触发 - 悬停
				if( type == "绑定单次触发-悬停[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-离开悬停[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "离开悬停[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				
				// > 单次触发 - 悬停左键按下
				if( type == "绑定单次触发-悬停左键按下[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停左键按下[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-悬停左键释放[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停左键释放[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-悬停左键双击[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停左键双击[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				
				// > 单次触发 - 悬停右键按下
				if( type == "绑定单次触发-悬停右键按下[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停右键按下[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-悬停右键释放[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停右键释放[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-悬停右键双击[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停右键双击[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				
				// > 单次触发 - 悬停滚轮按下
				if( type == "绑定单次触发-悬停滚轮按下[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停滚轮按下[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-悬停滚轮释放[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停滚轮释放[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-悬停滚轮双击[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停滚轮双击[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-悬停滚轮上滚时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停滚轮上滚" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-悬停滚轮下滚时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停滚轮下滚" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				
				// > 单次触发 - 悬停左键或右键按下
				if( type == "绑定单次触发-悬停左键或右键按下[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停左键或右键按下[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-悬停左键或右键释放[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停左键或右键释放[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "绑定单次触发-悬停左键或右键双击[一帧]时" ){
					pic.drill_PMHT_setMouseType( bind_id, "悬停左键或右键双击[一帧]" );
					pic.drill_PMHT_setSwitch_OnceValue( bind_id, value );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
			}
		}
		
		/*-----------------查看与解除绑定------------------*/
		if( args.length == 6 ){
			var type = String(args[5]);
			if( pic != null && bind_id != null ){
				if( type == "解除绑定" ){
					pic.drill_PMHT_removeBind( bind_id );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( pic != null ){
				if( type == "Debug显示当前全部绑定" ){
					alert( pic.drill_PMHT_getSwitchDataInfo() );
				}
				if( type == "解除全部绑定设置" ){
					pic.drill_PMHT_clearBindList();
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
			}
		}
		
		/*-----------------临时关闭开启绑定------------------*/
		if( args.length == 6 ){
			var type = String(args[5]);
			if( pic != null && bind_id != null ){
				if( type == "关闭绑定" ){
					pic.drill_PMHT_setSwitch_BindEnabled( bind_id, false );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "开启绑定" ){
					pic.drill_PMHT_setSwitch_BindEnabled( bind_id, true );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( pic != null ){
				if( type == "关闭全部绑定" ){
					pic.drill_PMHT_setSwitch_AllBindEnabled( false );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
				if( type == "开启全部绑定" ){
					pic.drill_PMHT_setSwitch_AllBindEnabled( true );
					$gameTemp._drill_PMHT_needRestatistics = true;
				}
			}
		}
		
		/*-----------------触发设置------------------*/
		if( args.length == 2 ){	
			var type = String(args[1]);
			if( type == "对话框弹出时保持触发" ){
				$gameSystem._drill_PMHT_remainTrigger = true;
			}
			if( type == "对话框弹出时暂停触发" ){
				$gameSystem._drill_PMHT_remainTrigger = false;
			}
		}
		if( args.length == 4 ){	
			var type = String(args[1]);
			var temp2 = String(args[3]);
			if( type == "鼠标按下重合区域时" ){
				if( temp2 == "禁止触发" ){
					$gameSystem._drill_PMHT_pressSingleTrigger = temp2;
				}
				if( temp2 == "只触发最上面的" ){
					$gameSystem._drill_PMHT_pressSingleTrigger = temp2;
				}
				if( temp2 == "触发全部" ){
					$gameSystem._drill_PMHT_pressSingleTrigger = temp2;
				}
			}
		}
		
		/*-----------------获取触发记录------------------*/
		if( args.length == 6 ){	
			var type = String(args[1]);
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			
			if( type == "获取触发记录" ){
				temp3 = temp3.replace("变量[","");
				temp3 = temp3.replace("]","");
				temp3 = Number(temp3);
				if( temp2 == "上一次触发的鼠标位置X" ){
					$gameVariables.setValue( temp3, $gameSystem._drill_PMHT_lastX );
				}
				if( temp2 == "上一次触发的鼠标位置Y" ){
					$gameVariables.setValue( temp3, $gameSystem._drill_PMHT_lastY );
				}
				if( temp2 == "上一次触发的图片ID" ){
					$gameVariables.setValue( temp3, $gameSystem._drill_PMHT_lastPicId );
				}
				if( temp2 == "上一次触发的绑定设置ID" ){
					$gameVariables.setValue( temp3, $gameSystem._drill_PMHT_lastBindId );
				}
				if( temp2 == "上一次触发的公共事件ID" ){
					$gameVariables.setValue( temp3, $gameSystem._drill_PMHT_lastCommonId );
				}
			}
		}
		
	};
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PMHT_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PMHT_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_PMHT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PMHT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PMHT_sys_initialize.call(this);
	this.drill_PMHT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PMHT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PMHT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PMHT_saveEnabled == true ){	
		$gameSystem.drill_PMHT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PMHT_initSysData();
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
Game_System.prototype.drill_PMHT_initSysData = function() {
	this.drill_PMHT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PMHT_checkSysData = function() {
	this.drill_PMHT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PMHT_initSysData_Private = function() {
	
	this._drill_PMHT_remainTrigger = DrillUp.g_PMHT_remainTrigger;				//对话框弹出时是否保持触发
	this._drill_PMHT_pressSingleTrigger = DrillUp.g_PMHT_pressSingleTrigger;	//鼠标按下重合区域时
	
	this._drill_PMHT_lastX = 0;					//上一次触发的鼠标位置X
	this._drill_PMHT_lastY = 0;					//上一次触发的鼠标位置Y
	this._drill_PMHT_lastPicId = 0;				//上一次触发的图片ID
	this._drill_PMHT_lastBindId = 0;			//上一次触发的绑定设置ID
	this._drill_PMHT_lastCommonId = 0;			//上一次触发的公共事件ID
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PMHT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PMHT_lastCommonId == undefined ){
		this.drill_PMHT_initSysData();
	}
};



//=============================================================================
// ** ☆图片的属性
//
//			说明：	> 此模块专门定义 图片的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片的属性 - 初始化
//==============================
var _drill_PMHT_switch_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(){
	this._drill_PMHT_switchData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PMHT_switch_initialize.call(this);
}
//==============================
// * 图片的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：switchData，一对一。
//==============================
Game_Picture.prototype.drill_PMHT_checkSwitchData = function(){	
	
	// > 【图片 - 图片与鼠标控制核心】执行绑定
	this.drill_COPWM_checkData();
	
	if( this._drill_PMHT_switchData != undefined ){ return; }
	this._drill_PMHT_switchData = {};
	
	// > 数据 - 图片ID【图片-图片优化核心】
	var pic_id = this.drill_COPi_getPictureId();
	this._drill_PMHT_switchData['pic_id'] = pic_id;
	
	// > 数据 - 触发顺序
	this._drill_PMHT_switchData['trigger_zIndex'] = pic_id;		//触发顺序
	
	// > 数据 - 绑定设置
	this._drill_PMHT_switchData['lastIsHover'] = false;			//悬停标记
	this._drill_PMHT_switchData['bindTank'] = [];				//绑定容器
}
//==============================
// * 图片的属性 - 初始化 绑定容器
//
//			说明：	> 注意，图片悬停绑定能控制多个绑定。
//					> 层面关键字为：bindTank，一对多。
//==============================
Game_Picture.prototype.drill_PMHT_checkSwitchData_Bind = function( switch_index ){
	this.drill_PMHT_checkSwitchData()
	if( this._drill_PMHT_switchData['bindTank'][switch_index] != undefined ){ return; }
	var switch_data = {};
	
	switch_data['mouseType'] = 0;				//鼠标触发类型（使用数字表示类型，能减轻if判定消耗，见 drill_PMHT_setMouseType ）
	
	switch_data['enabled'] = true;				//公共事件开关（默认开启）
	switch_data['onceValue'] = 0;				//公共事件ID值（单次触发用）
	
	this._drill_PMHT_switchData['bindTank'][switch_index] = switch_data;
}
//==============================
// * 图片的属性 - 绑定容器
//==============================
Game_Picture.prototype.drill_PMHT_hasAnyBind = function(){
	return this._drill_PMHT_switchData['bindTank'].length > 0;
}
//==============================
// * 图片的属性 - 绑定容器 - 删除单个
//==============================
Game_Picture.prototype.drill_PMHT_removeBind = function( switch_index ){
	this.drill_PMHT_checkSwitchData()
	this._drill_PMHT_switchData['bindTank'][switch_index] = undefined;
	delete this._drill_PMHT_switchData['bindTank'][switch_index];
}
//==============================
// * 图片的属性 - 绑定容器 - 删除全部
//==============================
Game_Picture.prototype.drill_PMHT_clearBindList = function(){
	this.drill_PMHT_checkSwitchData()
	this._drill_PMHT_switchData['bindTank'] = [];
}

//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PMHT_removeSwitchData = function(){
	this._drill_PMHT_switchData = undefined;
	$gameTemp._drill_PMHT_needRestatistics = true;			//（刷新统计）
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PMHT_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PMHT_p_erase.call( this );
	this.drill_PMHT_removeSwitchData();						//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PMHT_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PMHT_removeSwitchData();				//（删除数据）
	}
	_drill_PMHT_p_erasePicture.call( this, pictureId );
}

//==============================
// * 图片的属性 - 参数 - 公共事件开关赋值
//==============================
Game_Picture.prototype.drill_PMHT_setSwitch_BindEnabled = function( switch_index, enabled ){
	this.drill_PMHT_checkSwitchData();
	this.drill_PMHT_checkSwitchData_Bind( switch_index );
	this._drill_PMHT_switchData['bindTank'][switch_index]['enabled'] = enabled;
}
//==============================
// * 图片的属性 - 参数 - 公共事件全部开关赋值
//==============================
Game_Picture.prototype.drill_PMHT_setSwitch_AllBindEnabled = function( enabled ){
	this.drill_PMHT_checkSwitchData();
	for(var i = 0; i < this._drill_PMHT_switchData['bindTank'].length; i++ ){
		var bind = this._drill_PMHT_switchData['bindTank'][i];
		if( bind == undefined ){ continue; }
		bind['enabled'] = enabled;
	}
}
//==============================
// * 图片的属性 - 参数 - 公共事件ID赋值
//==============================
Game_Picture.prototype.drill_PMHT_setSwitch_OnceValue = function( switch_index, value_id ){
	this.drill_PMHT_checkSwitchData();
	this.drill_PMHT_checkSwitchData_Bind( switch_index );
	this._drill_PMHT_switchData['bindTank'][switch_index]['onceValue'] = value_id;
}
//==============================
// * 图片的属性 - 参数 - 设置鼠标触发类型
//==============================
Game_Picture.prototype.drill_PMHT_setMouseType = function( switch_index, type ){
	this.drill_PMHT_checkSwitchData();
	this.drill_PMHT_checkSwitchData_Bind( switch_index );
	var result_type = -1;
	
	// > 持续触发
	//	（无）
	
	// > 单次触发
	if( type == "悬停[一帧]" ){
		result_type = 18;
	}else if( type == "离开悬停[一帧]" ){
		result_type = 19;
		
	}else if( type == "悬停左键按下[一帧]" ){
		result_type = 11;
	}else if( type == "悬停左键释放[一帧]" ){
		result_type = 12;
	}else if( type == "悬停左键双击[一帧]" ){
		result_type = 13;
		
	}else if( type == "悬停右键按下[一帧]" ){
		result_type = 21;
	}else if( type == "悬停右键释放[一帧]" ){
		result_type = 22;
	}else if( type == "悬停右键双击[一帧]" ){
		result_type = 23;
		
	}else if( type == "悬停滚轮按下[一帧]" || type == "悬停中键按下[一帧]" ){
		result_type = 31;
	}else if( type == "悬停滚轮释放[一帧]" || type == "悬停中键按下[一帧]" ){
		result_type = 32;
	}else if( type == "悬停滚轮双击[一帧]" || type == "悬停中键按下[一帧]" ){
		result_type = 33;
	}else if( type == "悬停滚轮上滚" ){
		result_type = 34;
	}else if( type == "悬停滚轮下滚" ){
		result_type = 35;
		
	}else if( type == "悬停左键或右键按下[一帧]" ){
		result_type = 91;
	}else if( type == "悬停左键或右键释放[一帧]" ){
		result_type = 92;
	}else if( type == "悬停左键或右键双击[一帧]" ){
		result_type = 93;
	}
	
	if( result_type == -1 ){ return; }
	this.drill_PMHT_checkSwitchData();
	this.drill_PMHT_checkSwitchData_Bind( switch_index );
	
	
	// > 持续触发 叠加（左键+右键 合并）
	//	（无）
	
	// > 单次触发 叠加（左键+右键 合并）
	var cur_type = this._drill_PMHT_switchData['bindTank'][switch_index]['mouseType'];
	if( cur_type == 11 && result_type == 21 ){ result_type = 91; }
	if( cur_type == 21 && result_type == 11 ){ result_type = 91; }
	if( cur_type == 12 && result_type == 22 ){ result_type = 92; }
	if( cur_type == 22 && result_type == 12 ){ result_type = 92; }
	if( cur_type == 13 && result_type == 23 ){ result_type = 93; }
	if( cur_type == 23 && result_type == 13 ){ result_type = 93; }
	
	this._drill_PMHT_switchData['bindTank'][switch_index]['mouseType'] = result_type;
}
//==============================
// * 图片的属性 - 获取图片ID
//==============================
Game_Screen.prototype.drill_PMHT_getPictureId = function( game_picture ){
    if( $gameParty.inBattle() ){	//战斗界面的图片
		var pic_id = this._pictures.indexOf( game_picture );
		if( pic_id == -1 ){ return -1; }
        return pic_id - this.maxPictures();
    }else{							//地图界面的图片
		var pic_id = this._pictures.indexOf( game_picture );
        return pic_id;
    }
};
//==============================
// * 图片的属性 - 显示全部绑定信息
//==============================
Game_Picture.prototype.drill_PMHT_getSwitchDataInfo = function(){
	var result_text = "";
	result_text += "Debug显示当前全部绑定，来自图片Id：";
	result_text += String( $gameScreen.drill_PMHT_getPictureId(this) );
	result_text += "\n";
	if( this._drill_PMHT_switchData == undefined ||
		this._drill_PMHT_switchData['bindTank'].length == 0 ){
		result_text += "未绑定任何公共事件";
	}else{
		var bindTank = this._drill_PMHT_switchData['bindTank'];
		for(var i = 0; i < bindTank.length; i++){
			var bind = bindTank[i];
			if( bind == undefined ){ continue; }
			
			result_text += "绑定设置[";
			result_text += String( i );
			result_text += "] ";
			result_text += "公共事件[";
			result_text += bind['onceValue'];
			result_text += "] ";
			
			if( bind['mouseType'] == 18 ){ result_text += "悬停[一帧]"; }
			if( bind['mouseType'] == 19 ){ result_text += "离开悬停[一帧]"; }
			
			if( bind['mouseType'] == 11 ){ result_text += "悬停左键按下[一帧]"; }
			if( bind['mouseType'] == 12 ){ result_text += "悬停左键释放[一帧]"; }
			if( bind['mouseType'] == 13 ){ result_text += "悬停左键双击[一帧]"; }
			
			if( bind['mouseType'] == 21 ){ result_text += "悬停右键按下[一帧]"; }
			if( bind['mouseType'] == 22 ){ result_text += "悬停右键释放[一帧]"; }
			if( bind['mouseType'] == 23 ){ result_text += "悬停右键双击[一帧]"; }
			
			if( bind['mouseType'] == 31 ){ result_text += "悬停滚轮按下[一帧]"; }
			if( bind['mouseType'] == 32 ){ result_text += "悬停滚轮释放[一帧]"; }
			if( bind['mouseType'] == 33 ){ result_text += "悬停滚轮双击[一帧]"; }
			if( bind['mouseType'] == 34 ){ result_text += "悬停滚轮上滚"; }
			if( bind['mouseType'] == 35 ){ result_text += "悬停滚轮下滚"; }
			
			if( bind['mouseType'] == 91 ){ result_text += "悬停左键或右键按下[一帧]"; }
			if( bind['mouseType'] == 92 ){ result_text += "悬停左键或右键释放[一帧]"; }
			if( bind['mouseType'] == 93 ){ result_text += "悬停左键或右键双击[一帧]"; }
			
			result_text += "\n";
		}
	}
	return result_text;
};


//=============================================================================
// ** ☆图片容器
//			
//			说明：	> 此模块专门对 绑定数据的图片 进行 捕获。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_PMHT_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_PMHT_temp_initialize.call(this);
	this._drill_PMHT_pictureTank = [];			//实体类容器
	this._drill_PMHT_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_PMHT_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp._drill_PMHT_pictureTank = [];		//实体类容器
	$gameTemp._drill_PMHT_needRestatistics = true;
	_drill_PMHT_gmap_setup.call(this,mapId);
};
//==============================
// * 容器 - 切换贴图时（菜单界面/战斗界面 刷新）
//==============================
var _drill_PMHT_sbase_createPictures = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function() {
	$gameTemp._drill_PMHT_pictureTank = [];		//实体类容器
	$gameTemp._drill_PMHT_needRestatistics = true;
	_drill_PMHT_sbase_createPictures.call(this);
};
//==============================
// * 容器 - 场景销毁时『图片与多场景』
//==============================
var _drill_PMHT_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_PMHT_terminate.call(this);
	$gameTemp._drill_PMHT_pictureTank = [];		//实体类容器
	$gameTemp._drill_PMHT_needRestatistics = true;
};
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_PMHT_screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function(){
	_drill_PMHT_screen_update.call( this );
	this.drill_PMHT_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Screen.prototype.drill_PMHT_updateRestatistics = function() {
	if( $gameTemp._drill_PMHT_needRestatistics != true ){ return }
	$gameTemp._drill_PMHT_needRestatistics = false;
	
	$gameTemp._drill_PMHT_pictureTank = [];		//实体类容器
	
	// > 图片遍历『图片与多场景』
	var i_offset = 0;							//地图界面的图片
	var pic_length = this.maxPictures();
	if( $gameParty.inBattle() == true ){		//战斗界面的图片
		i_offset = pic_length;
	}
	for(var i = 0; i < pic_length; i++ ){
		var picture = this._pictures[ i + i_offset ];
		if( picture == undefined ){ continue; }
		if( picture._drill_PMHT_switchData != undefined ){
			$gameTemp._drill_PMHT_pictureTank.push( picture );
		}
	}
	
	// > 刷新统计 触发顺序
	for(var i = 0; i < $gameTemp._drill_PMHT_pictureTank.length; i++ ){
		var picture = $gameTemp._drill_PMHT_pictureTank[i];
		picture._drill_PMHT_switchData['trigger_zIndex'] = picture._drill_PMHT_switchData['pic_id'];
		
		// > 堆叠级影响【图片 - 层级与堆叠级】
		if( Imported.Drill_PictureLayerAndZIndex ){
			if( this._drill_PLAZ_data != undefined ){
				picture._drill_PMHT_switchData['trigger_zIndex'] = picture._drill_PLAZ_data['zIndex'];
			}
		}
	}
	$gameTemp._drill_PMHT_pictureTank.sort(function(a, b){return a._drill_PMHT_switchData['trigger_zIndex']-b._drill_PMHT_switchData['trigger_zIndex']});
};



//=============================================================================
// ** ☆图片触发控制
//
//			说明：	> 此模块管理 图片触发 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片触发控制 - 帧刷新（地图界面）
//==============================
var _drill_PMHT_map_update2 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_drill_PMHT_map_update2.call( this );
	if( this.drill_PMHT_isOptimizationPassed() == false ){ return; }
	this.drill_PMHT_updatePictureList();
}
//==============================
// * 图片触发控制 - 帧刷新 - 优化策略
//==============================
Scene_Map.prototype.drill_PMHT_isOptimizationPassed = function(){
	
	// > 地图中所有容器都为空时，不工作
	if( $gameTemp._drill_PMHT_pictureTank.length == 0 ){
		return false;
	}
	return true;
}
//==============================
// * 图片触发控制 - 帧刷新
//==============================
Scene_Map.prototype.drill_PMHT_updatePictureList = function(){
	
	// > 对话框弹出时是否保持触发
	if( ($gameMessage.isBusy() || SceneManager._scene.isBusy()) &&
		$gameSystem._drill_PMHT_remainTrigger == false ){
		return;
	}
	
	// > 触发结果 - 容器
	var triggerResult_list = [];
	
	
	// > 根据 触发顺序 执行 帧刷新（大的优先）
	for(var i = $gameTemp._drill_PMHT_pictureTank.length-1; i >=0; i-- ){
		var picture = $gameTemp._drill_PMHT_pictureTank[i];
		
		// > 结果准备
		var triggerResult = {};
		triggerResult['result_enabled'] = false;	//确认是否执行
		triggerResult['result_commonId'] = 0;		//执行的公共事件id
		triggerResult['result_isPress'] = false;	//是否为鼠标按下
		
		triggerResult['result_lastX'] = 0;			//上一次触发的鼠标位置X
		triggerResult['result_lastY'] = 0;			//上一次触发的鼠标位置Y
		triggerResult['result_lastPicId'] = 0;		//上一次触发的图片ID
		triggerResult['result_lastBindId'] = 0;		//上一次触发的公共事件ID
		
		// > 帧刷新图片
		picture.drill_PMHT_updateSwitch( triggerResult );
		
		// > 结果收集
		if( triggerResult['result_enabled'] == true ){	//（确认要执行触发的，收集起来）
			triggerResult_list.push( triggerResult );
		}
	}
	
	
	// > 触发结果 - 无触发时
	if( triggerResult_list.length == 0 ){ return; }
	
	// > 触发结果 - 有一个触发时
	if( triggerResult_list.length == 1 ){
		this.drill_PMHT_executeResult( triggerResult_list[0] );	//（直接执行即可）
		return;
	}
	
	// > 触发结果 - 有多个触发时 - 禁止触发
	if( $gameSystem._drill_PMHT_pressSingleTrigger == "禁止触发" ){
		for(var i = 0; i < triggerResult_list.length; i++){
			var triggerResult = triggerResult_list[i];
			
			// > 悬停、离开悬停、滚轮上滚时、滚轮下滚时，正常触发
			if( triggerResult['result_isPress'] == false ){
				this.drill_PMHT_executeResult( triggerResult );
				continue;
			}
			
			// > 按下[一帧]、释放[一帧]、双击[一帧]
			//	（不操作）
		}
		return;
	}
	
	// > 触发结果 - 有多个触发时 - 只触发最上面的
	if( $gameSystem._drill_PMHT_pressSingleTrigger == "" ||
		$gameSystem._drill_PMHT_pressSingleTrigger == "只触发最上面的" ){
		
		var is_triggered = false;
		for(var i = 0; i < triggerResult_list.length; i++){
			var triggerResult = triggerResult_list[i];
			
			// > 悬停、离开悬停、滚轮上滚时、滚轮下滚时，正常触发
			if( triggerResult['result_isPress'] == false ){
				this.drill_PMHT_executeResult( triggerResult );
				continue;
			}
			
			// > 按下[一帧]、释放[一帧]、双击[一帧]
			if( is_triggered == false ){
				is_triggered = true;
				this.drill_PMHT_executeResult( triggerResult );
			}
		}
		return;
	}
	
	// > 触发结果 - 有多个触发时 - 触发全部
	if( $gameSystem._drill_PMHT_pressSingleTrigger == "触发全部" ){
		for(var i = 0; i < triggerResult_list.length; i++){
			var triggerResult = triggerResult_list[i];
			this.drill_PMHT_executeResult( triggerResult );
		}
		return;
	}
}
//==============================
// * 图片触发控制 - 帧刷新图片
//==============================
Game_Picture.prototype.drill_PMHT_updateSwitch = function( triggerResult ){
	if( this._drill_PMHT_switchData == undefined ){ return; }
	
	// > 数据 - switchData层面（与图片一对一）
	var bindTank = this._drill_PMHT_switchData['bindTank'];
	if( bindTank.length == 0 ){ return; }
	
	// > 【图片 - 图片与鼠标控制核心】鼠标是否正在悬停（提前判定，不要放入子循环里面）
	var is_onHover = this.drill_COPWM_isOnHover();
	var last_isHover = this._drill_PMHT_switchData['lastIsHover'];
	
	// > 【图片 - 可拖拽的图片】被拖拽时，强制判定为正在悬停『鼠标悬停图片慢一帧』
	//		（打开 图片与鼠标控制核心 的debug悬停，然后拖拽一个图片不停地甩）
	//		（能看见甩的时候会看见描边线会有几帧由绿色变成黄色，这是因为慢一帧所导致。这个时候不能判定为 鼠标离开悬停）
	if( Imported.Drill_PictureDraggable == true ){
		if( this.drill_PDr_isDraging() == true ){
			is_onHover = true;
		}
	}
	
	// > 数据 - bindTank层面（与图片一对多）
	for(var j = 0; j < bindTank.length; j++ ){
		var bind_data = bindTank[j];
		if( bind_data == undefined ){ continue; }
		
		var cur_mouseType = bind_data['mouseType'];
		if( cur_mouseType < 10 ){
		
			// > 触发（持续）
			//	（无）
		
		}else{
			
			// > 触发（单次）
			var command_enabled = bind_data['enabled'];
			var command_id = bind_data['onceValue'];
			var canSetValue = false;
			if( is_onHover == true ){
				
				if( cur_mouseType == 11 && TouchInput.drill_isLeftTriggerd() ){
					canSetValue = true;		//悬停左键按下[一帧]
					triggerResult['result_isPress'] = true;
				}
				if( cur_mouseType == 12 && TouchInput.drill_isLeftReleased() ){
					canSetValue = true;		//悬停左键释放[一帧]
					triggerResult['result_isPress'] = true;
				}
				if( cur_mouseType == 13 && TouchInput.drill_isLeftDoubled() ){
					canSetValue = true;		//悬停左键双击[一帧]
					triggerResult['result_isPress'] = true;
				}
				
				if( cur_mouseType == 21 && TouchInput.drill_isRightTriggerd() ){
					canSetValue = true;		//悬停右键按下[一帧]
					triggerResult['result_isPress'] = true;
				}
				if( cur_mouseType == 22 && TouchInput.drill_isRightReleased() ){
					canSetValue = true;		//悬停右键释放[一帧]
					triggerResult['result_isPress'] = true;
				}
				if( cur_mouseType == 23 && TouchInput.drill_isRightDoubled() ){
					canSetValue = true;		//悬停右键双击[一帧]
					triggerResult['result_isPress'] = true;
				}
				
				if( cur_mouseType == 31 && TouchInput.drill_isMiddleTriggerd() ){
					canSetValue = true;		//悬停滚轮按下[一帧]
					triggerResult['result_isPress'] = true;
				}
				if( cur_mouseType == 32 && TouchInput.drill_isMiddleReleased() ){
					canSetValue = true;		//悬停滚轮释放[一帧]
					triggerResult['result_isPress'] = true;
				}
				if( cur_mouseType == 33 && TouchInput.drill_isMiddleDoubled() ){
					canSetValue = true;		//悬停滚轮双击[一帧]
					triggerResult['result_isPress'] = true;
				}
				if( cur_mouseType == 34 && TouchInput.drill_isWheelUp() ){
					canSetValue = true;		//悬停滚轮上滚
				}
				if( cur_mouseType == 35 && TouchInput.drill_isWheelDown() ){
					canSetValue = true;		//悬停滚轮下滚
				}
				
				if( cur_mouseType == 91 && 
					(TouchInput.drill_isLeftTriggerd() || TouchInput.drill_isRightTriggerd()) ){
					canSetValue = true;		//悬停左键或右键按下[一帧]
					triggerResult['result_isPress'] = true;
				}
				if( cur_mouseType == 92 && 
					(TouchInput.drill_isLeftReleased() || TouchInput.drill_isRightReleased()) ){
					canSetValue = true;		//悬停左键或右键释放[一帧]
					triggerResult['result_isPress'] = true;
				}
				if( cur_mouseType == 93 && 
					(TouchInput.drill_isLeftDoubled() || TouchInput.drill_isRightDoubled()) ){
					canSetValue = true;		//悬停左键或右键双击[一帧]
					triggerResult['result_isPress'] = true;
				}
			}
			
			// > 触发（单次） - 悬停[一帧]
			if( cur_mouseType == 18 && is_onHover == true && last_isHover == false ){
				canSetValue = true;
			}
			// > 触发（单次） - 不在悬停区域时[一帧]
			if( cur_mouseType == 19 && is_onHover == false && last_isHover == true ){
				canSetValue = true;
			}
			
			// > 触发（单次） - 赋值一次
			if( canSetValue == true && command_enabled == true ){
				triggerResult['result_enabled'] = true;
				triggerResult['result_commonId'] = command_id;
				
				triggerResult['result_lastX'] = _drill_mouse_x;
				triggerResult['result_lastY'] = _drill_mouse_y;
				triggerResult['result_lastPicId'] = this._drill_PMHT_switchData['pic_id'];
				triggerResult['result_lastBindId'] = j;
			}
		}
	}
	
	// > 数据 - switchData层面（记录 悬停标记）
	this._drill_PMHT_switchData['lastIsHover'] = is_onHover;
};
//==============================
// * 图片触发控制 - 执行公共事件
//==============================
Scene_Map.prototype.drill_PMHT_executeResult = function( triggerResult ){
	
	// > 上一次触发的
	$gameSystem._drill_PMHT_lastX = triggerResult['result_lastX'];
	$gameSystem._drill_PMHT_lastY = triggerResult['result_lastY'];
	$gameSystem._drill_PMHT_lastPicId = triggerResult['result_lastPicId'];
	$gameSystem._drill_PMHT_lastBindId = triggerResult['result_lastBindId'];
	$gameSystem._drill_PMHT_lastCommonId = triggerResult['result_commonId'];
	
	// > 执行公共事件
	this.drill_PMHT_executeCommonEvent( triggerResult['result_commonId'] );
};

//==============================
// * 图片触发控制 - 帧刷新（战斗界面）
//==============================
var _drill_PMHT_battle_update2 = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	_drill_PMHT_battle_update2.call( this );
	if( this.drill_PMHT_isOptimizationPassed() == false ){ return; }
	this.drill_PMHT_updatePictureList();
}
//==============================
// * 图片触发控制 - 函数赋值『图片与多场景』
//==============================
Scene_Battle.prototype.drill_PMHT_isOptimizationPassed = Scene_Map.prototype.drill_PMHT_isOptimizationPassed;
Scene_Battle.prototype.drill_PMHT_updatePictureList = Scene_Map.prototype.drill_PMHT_updatePictureList;
Scene_Battle.prototype.drill_PMHT_updateSwitch = Scene_Map.prototype.drill_PMHT_updateSwitch;
Scene_Battle.prototype.drill_PMHT_executeResult = Scene_Map.prototype.drill_PMHT_executeResult;


//=============================================================================
// ** ☆公共事件控制
//
//			说明：	> 此模块专门管理 公共事件控制 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 公共事件控制 - 『执行公共事件』（地图界面）
//==============================
Scene_Map.prototype.drill_PMHT_executeCommonEvent = function( commonId ){
	
	// > 记录触发位置
	$gameSystem._drill_PMHT_lastX = _drill_mouse_x;
	$gameSystem._drill_PMHT_lastY = _drill_mouse_y;
	$gameSystem._drill_PMHT_lastCommonId = commonId;
	
	// > 插件【地图-多线程】
	var e_data = {
		'type':"公共事件",
		'pipeType': "并行",
		'commonEventId': commonId,
	};
	$gameMap.drill_LCT_addPipeEvent( e_data );
}
//==============================
// * 公共事件控制 - 『执行公共事件』（战斗界面）『图片与多场景』
//==============================
Scene_Battle.prototype.drill_PMHT_executeCommonEvent = function( commonId ){
	
	// > 记录触发位置
	$gameSystem._drill_PMHT_lastX = _drill_mouse_x;
	$gameSystem._drill_PMHT_lastY = _drill_mouse_y;
	$gameSystem._drill_PMHT_lastCommonId = commonId;
	
	// > 插件【战斗-多线程】
	var e_data = {
		'type':"公共事件",
		'pipeType': "并行",
		'commonEventId': commonId,
	};
	$gameTroop.drill_BCT_addPipeEvent( e_data );
}


//=============================================================================
// ** ☆地图点击拦截
//
//			说明：	> 此模块专门管理 地图点击拦截，只要有鼠标悬停时，就阻止地图点击功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 地图点击拦截 - 点击监听『图片与多场景』
//==============================
var _drill_PMHT_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {	
	if( this.drill_PMHT_hasAnyHovered() ){ return; }
	_drill_PMHT_processMapTouch.call(this);
};
//==============================
// * 地图点击拦截 - 条件
//==============================
Scene_Map.prototype.drill_PMHT_hasAnyHovered = function() {	
	for(var i = 0; i < $gameTemp._drill_PMHT_pictureTank.length; i++){
		var temp_picture = $gameTemp._drill_PMHT_pictureTank[i];
		if( temp_picture == undefined ){ continue; };
		if( temp_picture._drill_PMHT_switchData == undefined ){ continue; };
		if( temp_picture._drill_PMHT_switchData['lastIsHover'] == true ){
			return true;
		}
	}
	return false;
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureMouseHoverTrigger = false;
		var pluginTip = DrillUp.drill_PMHT_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


