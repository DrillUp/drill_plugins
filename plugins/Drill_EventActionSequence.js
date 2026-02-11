//=============================================================================
// Drill_EventActionSequence.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        行走图 - GIF动画序列
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventActionSequence +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以控制 行走图 具有动画序列的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfActionSequence    系统-GIF动画序列核心★★v1.2及以上★★
 *   - Drill_CoreOfEventFrame        行走图-行走图优化核心
 * 可作用于：
 *   - Drill_EventActionSequenceAutomation   行走图-GIF动画序列全标签播放
 *   - Drill_EventActionSequenceBind         行走图-GIF动画序列全绑定
 *   - Drill_LayerSynchronizedReflection     行走图-图块同步镜像
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于行走图。
 * 2.更多详细内容，去看看 "7.行走图 > 关于行走图GIF动画序列.docx"。
 * 细节：
 *   (1.事件的 GIF动画序列 可以与消失动作/显现动作/持续动作效果叠加。
 *   (2.如果你配置的动画帧数量特别多，那么在进入游戏后显示会出现闪图，
 *      你可以勾选 预加载 的设置，防止设置动画序列后闪图。
 * 小工具：
 *   (1.防止你看不见：
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *      使用小工具 GIF动画序列编辑器 能全面编辑复杂的动画序列。
 *   (2.小工具能导入 行走图、序列大图、GIF文件 等资源，
 *      然后小工具能将配置转移到插件 GIF动画序列核心 中。
 * 设计：
 *   (1.动画序列可以是一个简单的GIF，也可以是一组动作集。
 *      比如，单纯的事件GIF播放 或者 根据情况播放不同的动画。
 *      你需要先了解动画序列核心 ，然后通过该插件调用指令实现事件GIF切换。
 *      具体可以去看看 "1.系统 > 大家族-GIF动画序列.docx" ，了解通过
 *      小工具配置GIF动画序列的方法。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件注释
 * 你需要通过下面事件注释来激活动画序列：
 * 
 * 事件注释：=>行走图动画序列 : 创建动画序列 : 动画序列[1]
 * 事件注释：=>行走图动画序列 : 创建动画序列(无方向) : 动画序列[1]
 * 事件注释：=>行走图动画序列 : 创建动画序列(无方向可翻转) : 动画序列[1]
 * 事件注释：=>行走图动画序列 : 创建动画序列(四方向) : 动画序列[1]
 * 事件注释：=>行走图动画序列 : 创建动画序列(二方向) : 动画序列[1]
 * 
 * 1.必须包含 注释的事件页 才会 创建动画序列。
 *   切换事件页时，插件会根据是否有注释而执行创建或销毁。
 * 2. "创建动画序列"、"创建动画序列(站桩)"、"创建动画序列(无方向)" 指令是一样的意思。
 *   动画序列分为 无方向动画序列、四方向动画序列、二方向动画序列，
 *   详细可以去看看文档："7.行走图 > 关于行走图GIF动画序列.docx"。
 * 3.如果行走图同时被 全绑定和行走图动画序列的事件注释 控制改变动画序列，
 *   则按 全绑定 的设置来，全绑定的优先级高。
 * 4.注意，如果你只写了 创建动画序列 注释，而没写 开启全标签播放 的注释。
 *   那么动画序列将只播放 默认的状态元集合 。
 *   因此事件移动时，不会播放移动动画，而是保持站立平移。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 插件指令
 * 你需要通过下面插件指令来激活动画序列：
 * 
 * 插件指令：>行走图动画序列 : 玩家 : 创建动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 玩家领队 : 创建动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 玩家全员 : 创建动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 玩家队员[1] : 创建动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 玩家队员变量[21] : 创建动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 本事件 : 创建动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 事件[1] : 创建动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 事件变量[1] : 创建动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 批量事件[10,11] : 创建动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 批量事件变量[21,22] : 创建动画序列 : 动画序列[1]
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 创建动画序列 : 动画序列[1]
 * 插件指令：>行走图动画序列 : 事件[1] : 创建动画序列(无方向) : 动画序列[1]
 * 插件指令：>行走图动画序列 : 事件[1] : 创建动画序列(无方向可翻转) : 动画序列[1]
 * 插件指令：>行走图动画序列 : 事件[1] : 创建动画序列(四方向) : 动画序列[1]
 * 插件指令：>行走图动画序列 : 事件[1] : 创建动画序列(二方向) : 动画序列[1]
 * 插件指令：>行走图动画序列 : 事件[1] : 销毁动画序列
 * 
 * 1.前半部分（事件[1]）和 后半部分（创建动画序列 : 动画序列[1]）
 *   的参数可以随意组合。一共有10*6种组合方式。
 * 2. "创建动画序列"、"创建动画序列(站桩)"、"创建动画序列(无方向)" 指令是一样的意思。
 *   动画序列分为 无方向动画序列、四方向动画序列、二方向动画序列，
 *   详细可以去看看文档："7.行走图 > 关于行走图GIF动画序列.docx"。
 * 3."玩家队员[1]"中，-2表示领队，1表示第一个跟随者。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 左右反向
 * 你可以通过下面事件注释或插件指令，控制左右反向：
 * 
 * 事件注释：=>行走图动画序列 : 设置左右反向
 * 事件注释：=>行走图动画序列 : 取消左右反向
 * 
 * 插件指令：>行走图动画序列 : 玩家 : 设置左右反向
 * 插件指令：>行走图动画序列 : 玩家领队 : 设置左右反向
 * 插件指令：>行走图动画序列 : 玩家全员 : 设置左右反向
 * 插件指令：>行走图动画序列 : 玩家队员[1] : 设置左右反向
 * 插件指令：>行走图动画序列 : 玩家队员变量[21] : 设置左右反向
 * 插件指令：>行走图动画序列 : 本事件 : 设置左右反向
 * 插件指令：>行走图动画序列 : 事件[1] : 设置左右反向
 * 插件指令：>行走图动画序列 : 事件变量[1] : 设置左右反向
 * 插件指令：>行走图动画序列 : 批量事件[10,11] : 设置左右反向
 * 插件指令：>行走图动画序列 : 批量事件变量[21,22] : 设置左右反向
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 设置左右反向
 * 插件指令：>行走图动画序列 : 事件[1] : 取消左右反向
 * 
 * 1.如果你之前在动画序列配置中，弄反了方向，可以使用上述指令，左右反向摆正。
 *   但是建议最好把资源给改正。二方向，先右后左；无方向，默认朝右。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 保持状态元
 * 你可以通过下面事件注释，让事件页处于指定状态元下：
 * 
 * 事件注释：=>行走图动画序列 : 当前页-播放默认的状态元集合
 * 事件注释：=>行走图动画序列 : 当前页-播放简单状态元集合 : 集合[小爱丽丝静止1,小爱丽丝静止2]
 * 事件注释：=>行走图动画序列 : 当前页-播放状态节点 : 状态节点[小爱丽丝拍裙子流程]
 * 
 * 1.该事件注释，需要放在"创建动画序列"的注释后面。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 播放
 * 你需要通过下面插件指令来操作动画序列：
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 播放默认的状态元集合
 * 插件指令：>行走图动画序列 : 事件[1] : 播放简单状态元集合 : 集合[小爱丽丝静止1,小爱丽丝静止2]
 * 插件指令：>行走图动画序列 : 事件[1] : 播放状态节点 : 状态节点[小爱丽丝拍裙子流程]
 * 
 * 插件指令：>行走图动画序列 : 事件[1] : 播放动作元 : 动作元[小爱丽丝发火]
 * 插件指令：>行走图动画序列 : 事件[1] : 立即停止动作元
 * 
 * 1.前半部分和后半部分组合方式与前面一样，一共有10*5种组合方式。
 * 2.必须设置动画序列后，才能使用上述操作。
 *   上述指令对应了 小工具 放映区 的播放功能。
 * 3."播放简单状态元集合"中，填入 状态元名称，若找不到对应名称则插件指令没有效果。
 *   "播放状态节点"中，填入 状态节点名称，若找不到对应名称则插件指令没有效果。
 *   "播放动作元"中，填入 动作元名称，若找不到对应名称则插件指令没有效果。
 * 4.注意，如果 动作元 的优先级低于当前播放的 状态元/状态节点/动作元，
 *   则插件指令没有效果。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   在动画序列管理层设置10个事件，加载小爱丽丝动画序列。
 * 测试结果：   200个事件的地图中，平均消耗为：【18.16ms】
 *              100个事件的地图中，平均消耗为：【12.29ms】
 *               50个事件的地图中，平均消耗为：【9.52ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.动画序列和一般的行走图功能是相似的，本身处理播放的控制器并不
 *   消耗计算量，都以实际配置的资源为准。由于行走图动画序列配置的
 *   图片都很小，所以消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了行走图播放序列时切换菜单会报错的bug。
 * [v1.2]
 * 较大幅度更新了 动画序列底层，该插件重新兼容。
 * [v1.3]
 * 进一步优化了动画序列底层，添加了二方向行走图，该插件重新兼容。
 * [v1.4]
 * 优化了动画序列存储底层。
 * [v1.5]
 * 优化了内部结构，修正描述细节。
 * [v1.6]
 * 添加了翻转功能，重新定义了 无方向和无方向可翻转 。
 * 
 * 
 * @param DEBUG-是否提示动画序列未创建
 * @type boolean
 * @on 提示
 * @off 关闭提示
 * @desc true - 提示，false - 关闭提示。如果你知道存在此问题但不想弹出此提示，可在配置中关闭此提示。
 * @default true
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EASe（Event_Action_Sequence）
//		临时全局变量	无
//		临时局部变量	this._drill_EASe_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	动画序列管理层
//		★性能测试消耗	2024/1/22：
//							》12.29ms、18.78ms（drill_EASe_isPlaying）
//						2024/6/15：
//							》124.0ms、53.1ms（drill_EASe_updateDecorator）11.1ms、6.1ms（drill_EASe_updateDecoratorCreate）5.1ms（drill_EASe_updateDecoratorDestroy）
//							》这次测试的消耗，核心插件反而不多，可能有很大一部分转移到这里了。
//		★最坏情况		所有事件都用动画序列。（其实也不坏…）
//		★备注			以前测的时候小爱丽丝不多，现在小爱丽丝同屏都至少有10个，所以消耗很大。
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
//			
//			->☆物体的属性
//				->绑定
//					> 初始化
//					> 帧刷新
//					> 事件销毁时
//				->创建 动画序列控制器
//					->创建动画序列(无方向)
//					->创建动画序列(无方向可翻转)
//					->创建动画序列(四方向)
//					->创建动画序列(二方向)
//				->销毁 动画序列控制器
//				->播放
//					> 播放默认的状态元集合（开放函数）
//					> 播放简单状态元集合（开放函数）
//					> 播放状态节点（开放函数）
//					> 播放动作元（开放函数）
//					> 立即停止动作元（开放函数）
//			->☆翻转控制
//				->设置左右可翻转（开放函数）
//				->设置左右反向（开放函数）
//			->☆暂停控制 实现
//			->☆暂停控制 标准模块
//				->是否暂停【标准接口】
//			
//			->☆行走图贴图绑定
//				->创建 动画序列贴图
//				->销毁 动画序列贴图
//				->帧刷新 动画序列贴图
//					->贴图销毁标记
//				->是否正在播放
//			->☆行走图贴图替换
//				->行走图 替换
//				->动画帧 替换
//				->播放动画序列的动画帧
//			->☆行走图贴图兼容
//				->宽度
//				->高度
//
//
//		★家谱：
//			大家族-GIF动画序列
//		
//		★脚本文档：
//			1.系统 > 大家族-GIF动画序列（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.该插件将 核心插件 的接口进行了一一对应。
//			  只修改贴图的 bitmap，其它都不影响。
//			2.注意，数据（data）和 贴图装饰器（decorator）是分离的。
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
	DrillUp.g_EASe_PluginTip_curName = "Drill_EventActionSequence.js 行走图-GIF动画序列";
	DrillUp.g_EASe_PluginTip_baseList = [
		"Drill_CoreOfActionSequence.js 系统-GIF动画序列核心",
		"Drill_CoreOfEventFrame.js 行走图-行走图优化核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EASe_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EASe_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EASe_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EASe_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EASe_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EASe_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EASe_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新要求
	//==============================
	DrillUp.drill_EASe_getPluginTip_NeedUpdate_actionSeq = function(){
		return "【" + DrillUp.g_EASe_PluginTip_curName + "】\n GIF动画序列核心 插件版本过低，请及时更新核心插件，以及所有动画序列相关子插件。";
	};
	//==============================
	// * 提示信息 - 报错 - 插件冲突
	//==============================
	DrillUp.drill_EASe_getPluginTip_ConflictMOG = function(){
		return "【" + DrillUp.g_EASe_PluginTip_curName + "】\n 检测到冲突插件：MOG_CharPoses姿势插件，GIF动画序列已经实现了此插件的全部功能替代。可以去看看文档 7.行走图 > 关于行走图GIF动画序列.docx 的 行走图的姿势 章节。";
	};
	//==============================
	// * 提示信息 - 报错 - 动画序列未创建
	//==============================
	DrillUp.drill_EASe_getPluginTip_NoActionSequence = function( e_id ){
		return "【" + DrillUp.g_EASe_PluginTip_curName + "】（此提示可在插件中关闭）\n" +   //『可关闭提示信息』
				"插件指令错误，事件"+e_id+"的动画序列并没有创建，无法播放动画。\n（如果你知道存在此问题但不想弹出此提示，可在配置中关闭此提示）";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_EventActionSequence = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_EventActionSequence');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_EASe_TipEnabled_NoActionSequence = String(DrillUp.parameters["DEBUG-是否提示动画序列未创建"] || "true") === "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfActionSequence &&
	Imported.Drill_CoreOfEventFrame ){
	
//==============================
// * >>>>基于插件检测>>>> - 强制更新要求
//==============================
if( DrillUp.drill_COAS_getSequenceData_ById == undefined ){
	alert( DrillUp.drill_EASe_getPluginTip_NeedUpdate_actionSeq() );
};

//==============================
// * >>>>基于插件检测>>>> - 最后继承1级（检测插件冲突）
//==============================
var _drill_EASe_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_EASe_scene_initialize.call(this);
	
	if( Imported.MOG_CharPoses == true ){
		alert( DrillUp.drill_EASe_getPluginTip_ConflictMOG() );
	};
};


//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_EASe_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_EASe_pluginCommand.call(this, command, args);
	this.drill_EASe_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_EASe_pluginCommand = function( command, args ){
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
					if( $gameMap.drill_EASe_isEventExist( e_id ) == false ){ continue; }
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
					if( $gameMap.drill_EASe_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EASe_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EASe_isEventExist( e_id ) == false ){ return; }
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
		
		
		/*-----------------销毁动画序列------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "销毁动画序列" || type == "关闭动画序列" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_removeActionSequence();
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_removeActionSequence();
				}
			}
		}
		/*-----------------创建动画序列------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "创建动画序列" || type == "设置动画序列" ||
				type == "创建动画序列(站桩)" || type == "设置动画序列(站桩)" ||
				type == "创建动画序列(无方向)" || type == "设置动画序列(无方向)" ){
				temp1 = temp1.replace("动画序列[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setActionSequence( Number(temp1)-1, "stand" );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setActionSequence( Number(temp1)-1, "stand" );
				}
			}
			if( type == "创建动画序列(无方向可翻转)" || type == "设置动画序列(无方向可翻转)" ){
				temp1 = temp1.replace("动画序列[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setActionSequence( Number(temp1)-1, "stand+flip" );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setActionSequence( Number(temp1)-1, "stand+flip" );
				}
			}
			if( type == "创建动画序列(四方向)" || type == "设置动画序列(四方向)" ){
				temp1 = temp1.replace("动画序列[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setActionSequence( Number(temp1)-1, "4dir" );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setActionSequence( Number(temp1)-1, "4dir" );
				}
			}
			if( type == "创建动画序列(二方向)" || type == "设置动画序列(二方向)" ){
				temp1 = temp1.replace("动画序列[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setActionSequence( Number(temp1)-1, "2dir" );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setActionSequence( Number(temp1)-1, "2dir" );
				}
			}
		}
		
		/*-----------------左右反向------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "设置左右反向" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setRLFlipReverse( true );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setRLFlipReverse( true );
				}
			}
			if( type == "取消左右反向" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setRLFlipReverse( false );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setRLFlipReverse( false );
				}
			}
		}
		
		/*-----------------播放------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "播放默认的状态元集合" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setStateNodeDefault();
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setStateNodeDefault();
				}
			}
			if( type == "立即停止动作元" || type == "立即停止动作" ){
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_stopAct();
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_stopAct();
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "播放简单状态元集合" || type == "修改状态元集合" || type == "修改集合" ){
				temp1 = temp1.replace("集合[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setSimpleStateNode( temp1.split(",") );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setSimpleStateNode( temp1.split(",") );
				}
			}
			if( type == "播放状态节点" ){
				temp1 = temp1.replace("状态节点[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setStateNode( temp1 );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setStateNode( temp1 );
				}
			}
			if( type == "播放动作元" || type == "播放动作" ){
				temp1 = temp1.replace("动作元[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_chars.length; k++ ){
					e_chars[k].drill_EASe_setAct( temp1 );
				}
				for( var k=0; k < p_chars.length; k++ ){
					p_chars[k].drill_EASe_setAct( temp1 );
				}
			}
		}
		
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EASe_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EASe_getPluginTip_EventNotFind( e_id ) );
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
var _drill_EASe_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_EASe_event_setupPage.call(this);
    this.drill_EASe_setupPage();
};
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EASe_setupPage = function() {
	
	var is_set = false;
	
	if( !this._erased && this.page() ){ this.list().forEach(function( l ){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>行走图动画序列" ){
				
				/*-----------------创建动画序列------------------*/
				if( args.length == 4 ){	//=>行走图动画序列 : 创建动画序列 : 动画序列[1]
					var type = String(args[1]);
					var temp1 = String(args[3]);
					temp1 = temp1.replace("动画序列[","");
					temp1 = temp1.replace("]","");
					if( type == "创建动画序列" || type == "创建动画序列(站桩)" || type == "创建动画序列(无方向)" ){
						this.drill_EASe_setActionSequence( Number(temp1)-1, "stand" );
						is_set = true;
					}
					if( type == "创建动画序列(无方向可翻转)" ){
						this.drill_EASe_setActionSequence( Number(temp1)-1, "stand+flip" );
						is_set = true;
					}
					if( type == "创建动画序列(四方向)" ){
						this.drill_EASe_setActionSequence( Number(temp1)-1, "4dir" );
						is_set = true;
					}
					if( type == "创建动画序列(二方向)" ){
						this.drill_EASe_setActionSequence( Number(temp1)-1, "2dir" );
						is_set = true;
					}
				}
				
				/*-----------------左右反向------------------*/
				if( args.length == 2 ){
					var type = String(args[1]);
					if( type == "设置左右反向" ){
						this.drill_EASe_setRLFlipReverse( true );
					}
					if( type == "取消左右反向" ){
						this.drill_EASe_setRLFlipReverse( false );
					}
				}
				
				/*-----------------播放------------------*/
				if( args.length == 2 ){
					var type = String(args[1]);
					if( type == "当前页-播放默认的状态元集合" ){
						this.drill_EASe_setStateNodeDefault();
					}
				}
				if( args.length == 4 ){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( type == "当前页-播放简单状态元集合" ){
						temp1 = temp1.replace("集合[","");
						temp1 = temp1.replace("]","");
						this.drill_EASe_setSimpleStateNode( temp1.split(",") );
					}
					if( type == "当前页-播放状态节点" ){
						temp1 = temp1.replace("状态节点[","");
						temp1 = temp1.replace("]","");
						this.drill_EASe_setStateNode( temp1 );
					}
				}
			};
		};
	}, this);};
	
	if( is_set == false ){
		this.drill_EASe_removeActionSequence();
	}
};



//=============================================================================
// ** ☆物体的属性
//
//			说明：	> 此模块专门控制 动画序列控制器 绑定到物体。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 物体的属性 - 初始化
//
//			说明：	> 这里的数据默认为空。『节约事件数据存储空间』
//==============================
var _drill_EASe_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	this._drill_EASe_controller = undefined;		//动画序列控制器（对象）
	
	this._drill_EASe_type = undefined;				//动画序列类型（字符串）（stand无方向/stand+flip无方向可翻转/4dir四方向/2dir二方向/8dir八方向）
	this._drill_EASe_keepDecoratorNull = undefined;	//贴图销毁标记（布尔）
	this._drill_EASe_lastId = undefined;			//上一个 动画序列ID（数字）
	this._drill_EASe_lastType = undefined;			//上一个 动画序列类型（字符串）
	
	// > 原函数
	_drill_EASe_c_initialize.call(this);
}
//==============================
// * 物体的属性 - 帧刷新
//==============================
var _drill_EASe_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_drill_EASe_c_update.call(this);
	
	// > 帧刷新控制器
	if( this._drill_EASe_controller != undefined ){
		this._drill_EASe_controller.update();
	}
}
//==============================
// * 物体的属性 - 事件销毁时
//==============================
var _drill_EASe_c_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EASe_c_erase.call(this);	
	this._drill_EASe_keepDecoratorNull = true;		//贴图销毁标记
}

//==============================
// * 物体的属性 - 创建 动画序列控制器（开放函数）
//
//			说明：	> 此函数用于去除重复的 创建 。
//					> 要强制改变动画序列，直接 new控制器 即可，贴图会根据序列号自动销毁重建。
//==============================
Game_Character.prototype.drill_EASe_setActionSequence = function( as_id, type ){
	
	// > 重复锁
	if( this._drill_EASe_controller != undefined &&
		this._drill_EASe_lastId == as_id &&
		this._drill_EASe_lastType == type ){ return; }
	this._drill_EASe_lastId = as_id;			//记录上一个 动画序列ID
	this._drill_EASe_lastType = type;			//记录上一个 动画序列类型
	
	// > 根据类型创建
	if( type == "" || type == "stand" ){
		this.drill_EASe_setActionSequenceStand( as_id );
	}
	if( type == "stand+flip" ){
		this.drill_EASe_setActionSequenceStandAndFlip( as_id );
	}
	if( type == "4dir" ){
		this.drill_EASe_setActionSequenceWith4Direction( as_id );
	}
	if( type == "2dir" ){
		this.drill_EASe_setActionSequenceWith2Direction( as_id );
	}
	if( type == "8dir" ){
		this.drill_EASe_setActionSequenceWith8Direction( as_id );
	}
}
//==============================
// * 物体的属性 - 创建 动画序列控制器 - 无方向（私有）
//==============================
Game_Character.prototype.drill_EASe_setActionSequenceStand = function( as_id ){
	
	// > 创建控制器
	if( this._drill_EASe_controller == undefined ){
		this._drill_EASe_controller = new Drill_COAS_MainController( as_id );
	}else{
		this._drill_EASe_controller.drill_controllerMain_resetData( as_id );
	}
	this._drill_EASe_controller.drill_COAS_setBitmapRefreshFrame( false );	//（禁止刷新框架）
	
	// > 其它数据
	this._drill_EASe_type = "stand";
	this._drill_EASe_keepDecoratorNull = undefined;
	this.drill_EASe_setRLFlipEnabled( false );  //（翻转控制 - 关闭可翻转）
	this.drill_EASe_setRLFlipReverse( false );  //（翻转控制 - 关闭左右反向）
}
//==============================
// * 物体的属性 - 创建 动画序列控制器 - 无方向可翻转（私有）
//==============================
Game_Character.prototype.drill_EASe_setActionSequenceStandAndFlip = function( as_id ){
	
	// > 创建控制器
	if( this._drill_EASe_controller == undefined ){
		this._drill_EASe_controller = new Drill_COAS_MainController( as_id );
	}else{
		this._drill_EASe_controller.drill_controllerMain_resetData( as_id );
	}
	this._drill_EASe_controller.drill_COAS_setBitmapRefreshFrame( false );	//（禁止刷新框架）
	
	// > 其它数据
	this._drill_EASe_type = "stand";
	this._drill_EASe_keepDecoratorNull = undefined;
	this.drill_EASe_setRLFlipEnabled( true );   //（翻转控制 - 开启可翻转）
	this.drill_EASe_setRLFlipReverse( false );  //（翻转控制 - 关闭左右反向）
}
//==============================
// * 物体的属性 - 创建 动画序列控制器 - 四方向（私有）
//==============================
Game_Character.prototype.drill_EASe_setActionSequenceWith4Direction = function( as_id ){
	
	// > 创建控制器
	if( this._drill_EASe_controller == undefined ){
		this._drill_EASe_controller = new Drill_COAS_MainController( as_id );
	}else{
		this._drill_EASe_controller.drill_controllerMain_resetData( as_id );
	}
	this._drill_EASe_controller.drill_COAS_setBitmapRefreshFrame( false );	//（禁止刷新框架）
	
	// > 其它数据
	this._drill_EASe_type = "4dir";
	this._drill_EASe_keepDecoratorNull = undefined;
	this.drill_EASe_setRLFlipEnabled( false );  //（翻转控制 - 关闭可翻转）
	this.drill_EASe_setRLFlipReverse( false );  //（翻转控制 - 关闭左右反向）
}
//==============================
// * 物体的属性 - 创建 动画序列控制器 - 二方向（私有）
//==============================
Game_Character.prototype.drill_EASe_setActionSequenceWith2Direction = function( as_id ){
	
	// > 创建控制器
	if( this._drill_EASe_controller == undefined ){
		this._drill_EASe_controller = new Drill_COAS_MainController( as_id );
	}else{
		this._drill_EASe_controller.drill_controllerMain_resetData( as_id );
	}
	this._drill_EASe_controller.drill_COAS_setBitmapRefreshFrame( false );	//（禁止刷新框架）
	
	// > 其它数据
	this._drill_EASe_type = "2dir";
	this._drill_EASe_keepDecoratorNull = undefined;
	this.drill_EASe_setRLFlipEnabled( false );  //（翻转控制 - 关闭可翻转）
	this.drill_EASe_setRLFlipReverse( false );  //（翻转控制 - 关闭左右反向）
}
//==============================
// * 物体的属性 - 创建 动画序列控制器 - 八方向（私有）
//==============================
Game_Character.prototype.drill_EASe_setActionSequenceWith8Direction = function( as_id ){
	
	// > 创建控制器
	if( this._drill_EASe_controller == undefined ){
		this._drill_EASe_controller = new Drill_COAS_MainController( as_id );
	}else{
		this._drill_EASe_controller.drill_controllerMain_resetData( as_id );
	}
	this._drill_EASe_controller.drill_COAS_setBitmapRefreshFrame( false );	//（禁止刷新框架）
	
	// > 其它数据
	this._drill_EASe_type = "8dir";
	this._drill_EASe_keepDecoratorNull = undefined;
	this.drill_EASe_setRLFlipEnabled( false );  //（翻转控制 - 关闭可翻转）
	this.drill_EASe_setRLFlipReverse( false );  //（翻转控制 - 关闭左右反向）
}
//==============================
// * 物体的属性 - 销毁 动画序列控制器（开放函数）
//==============================
Game_Character.prototype.drill_EASe_removeActionSequence = function(){
	this._drill_EASe_controller = undefined;	//动画序列控制器
	
	this._drill_EASe_type = undefined;			//动画序列类型
	this._drill_EASe_keepDecoratorNull = true;	//贴图销毁标记
	this.drill_EASe_setRLFlipEnabled( false );  //（翻转控制 - 关闭可翻转）
	this.drill_EASe_setRLFlipReverse( false );  //（翻转控制 - 关闭左右反向）
}

//==============================
// * 播放 - 播放默认的状态元集合（开放函数）
//
//			说明：	> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//==============================
Game_Character.prototype.drill_EASe_setStateNodeDefault = function(){
	if( this._drill_EASe_controller == undefined ){		//（动画序列校验）
		if( DrillUp.g_EASe_TipEnabled_NoActionSequence == true ){  //『可关闭提示信息』
			if( this._eventId != undefined ){ alert( DrillUp.drill_EASe_getPluginTip_NoActionSequence(this._eventId) ); }
		}
		return;
	}
	this._drill_EASe_controller.drill_COAS_setStateNodeDefault();
}
//==============================
// * 播放 - 播放简单状态元集合（开放函数）
//
//			说明：	> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//					> 输入空名称时/无对应名称时 无效。
//==============================
Game_Character.prototype.drill_EASe_setSimpleStateNode = function( state_nameList ){
	if( this._drill_EASe_controller == undefined ){		//（动画序列校验）
		if( DrillUp.g_EASe_TipEnabled_NoActionSequence == true ){  //『可关闭提示信息』
			if( this._eventId != undefined ){ alert( DrillUp.drill_EASe_getPluginTip_NoActionSequence(this._eventId) ); }
		}
		return;
	}
	this._drill_EASe_controller.drill_COAS_setSimpleStateNode( state_nameList );
}
//==============================
// * 播放 - 播放状态节点（开放函数）
//
//			说明：	> 此函数执行会重置一次当前状态节点，不能 放帧刷新里面反复执行。
//					> 输入空名称时/无对应名称时 无效。
//==============================
Game_Character.prototype.drill_EASe_setStateNode = function( node_name ){
	if( this._drill_EASe_controller == undefined ){		//（动画序列校验）
		if( DrillUp.g_EASe_TipEnabled_NoActionSequence == true ){  //『可关闭提示信息』
			if( this._eventId != undefined ){ alert( DrillUp.drill_EASe_getPluginTip_NoActionSequence(this._eventId) ); }
		}
		return;
	}
	this._drill_EASe_controller.drill_COAS_setStateNode( node_name );
}
//==============================
// * 播放 - 播放动作元（开放函数）
//==============================
Game_Character.prototype.drill_EASe_setAct = function( act_name ){
	if( this._drill_EASe_controller == undefined ){		//（动画序列校验）
		if( DrillUp.g_EASe_TipEnabled_NoActionSequence == true ){  //『可关闭提示信息』
			if( this._eventId != undefined ){ alert( DrillUp.drill_EASe_getPluginTip_NoActionSequence(this._eventId) ); }
		}
		return;
	}
	this._drill_EASe_controller.drill_COAS_setAct( act_name );
}
//==============================
// * 播放 - 立即停止动作元（开放函数）
//==============================
Game_Character.prototype.drill_EASe_stopAct = function(){
	if( this._drill_EASe_controller == undefined ){		//（动画序列校验）
		if( DrillUp.g_EASe_TipEnabled_NoActionSequence == true ){  //『可关闭提示信息』
			if( this._eventId != undefined ){ alert( DrillUp.drill_EASe_getPluginTip_NoActionSequence(this._eventId) ); }
		}
		return;
	}
	this._drill_EASe_controller.drill_COAS_stopAct();
}



//=============================================================================
// ** ☆翻转控制
//
//			说明：	> 此模块专门控制 翻转 动画序列。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 翻转控制 - 帧刷新
//==============================
var _drill_EASe_flip_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	this._drill_EASe_RLFlip_enabled = false;		//是否开启
	this._drill_EASe_RLFlip_isReverse = false;		//是否反向
	this._drill_EASe_RLFlip_dirValue = 1;			//翻转值
	
	// > 原函数
	_drill_EASe_flip_initialize.call(this);
}
//==============================
// * 翻转控制 - 设置左右可翻转（开放函数）
//==============================
Game_Character.prototype.drill_EASe_setRLFlipEnabled = function( enabled ){ this._drill_EASe_RLFlip_enabled = enabled; }
Game_Character.prototype.drill_EASe_isRLFlipEnabled = function(){ return this._drill_EASe_RLFlip_enabled; }
//==============================
// * 翻转控制 - 设置左右反向（开放函数）
//==============================
Game_Character.prototype.drill_EASe_setRLFlipReverse = function( enabled ){ this._drill_EASe_RLFlip_isReverse = enabled; }
Game_Character.prototype.drill_EASe_isRLFlipReversed = function(){ return this._drill_EASe_RLFlip_isReverse; }
//==============================
// * 翻转控制 - 帧刷新
//==============================
var _drill_EASe_flip_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_drill_EASe_flip_update.call(this);
	
	// > 左右可翻转
	if( this._drill_EASe_RLFlip_enabled == true ){
		var cur_dir = this.direction();
		if( cur_dir == 6 ){ 		//（朝右）
			this._drill_EASe_RLFlip_dirValue = 1;
		}else if( cur_dir == 4 ){	//（朝左）
			this._drill_EASe_RLFlip_dirValue = -1;
		}
		//（其它情况不要改变翻转值）
	}
}
//==============================
// * 翻转控制 - 翻转设置
//==============================
var _drill_EASe_flip_finalTransform_scaleX = Game_CharacterBase.prototype.drill_COEF_finalTransform_scaleX;
Game_CharacterBase.prototype.drill_COEF_finalTransform_scaleX = function(){
	var value = _drill_EASe_flip_finalTransform_scaleX.call(this);
	
	// > 左右可翻转
	if( this._drill_EASe_RLFlip_enabled == true ){
		value *= this._drill_EASe_RLFlip_dirValue;
	}
	
	// > 左右反向
	if( this._drill_EASe_RLFlip_isReverse == true ){
		value *= -1;
	}
	return value;
}


//=============================================================================
// ** ☆暂停控制 实现
//
//			说明：	> 此模块专门控制 暂停 动画序列。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 暂停控制 - 帧刷新
//==============================
var _drill_EASe_pause_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function(){
	_drill_EASe_pause_update.call(this);
	if( this._drill_EASe_controller == null ){ return; }
	
	// > 暂停控制
	if( this.drill_EASe_needPause() ){
		this._drill_EASe_controller.drill_controllerMain_setPause(true);
	}else{
		this._drill_EASe_controller.drill_controllerMain_setPause(false);
	}
	
	// > 强制关闭暂停
	if( this._drill_EASe_pauseDisabledTime != undefined ){
		this._drill_EASe_pauseDisabledTime -= 1;
		if( this._drill_EASe_pauseDisabledTime <= 0 ){
			this._drill_EASe_pauseDisabledTime = undefined;
		}
		this._drill_EASe_controller.drill_controllerMain_setPause(false);
	}
}
//==============================
// * 暂停控制 - 强制关闭暂停（开放函数）
//
//			说明：	> 部分子插件如果无法关闭暂停，这里可以 在有限时间内 强制关闭暂停。
//==============================
Game_CharacterBase.prototype.drill_EASe_setPauseDisabledInTime = function( time ){
	this._drill_EASe_pauseDisabledTime = time;
}

//#############################################################################
// ** ☆暂停控制 标准模块
//
//			说明：	> 即对子插件开放的固定函数，无论插件如何变化，标准函数都不变。
//#############################################################################
//##############################
// * 暂停控制 - 是否暂停【标准接口】
//
//			参数：	> 无
//			返回：	> 布尔
//
//			说明：	> 子插件可根据情况来继承，控制 动画序列 暂停。
//##############################
Game_CharacterBase.prototype.drill_EASe_needPause = function(){
	return false;
}



//=============================================================================
// ** ☆行走图贴图绑定
//
//			说明：	> 此模块专门控制 动画序列贴图 绑定到行走图。
//					> 行走图的动画序列支持镜像反射。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图贴图绑定 - 初始化
//==============================
var _drill_EASe_sp_initialize = Sprite_Character.prototype.initMembers;
Sprite_Character.prototype.initMembers = function(){
    _drill_EASe_sp_initialize.call( this );
	this._drill_EASe_decorator = null;					//动画序列 贴图
	this._drill_EASe_decoratorCreateSerial = -1;		//动画序列 贴图序列号
}
//==============================
// * 行走图贴图绑定 - 创建 动画序列贴图
//
//			说明：	> 此函数可以在帧刷新中反复执行。只在 空贴图 的时候才创建。
//==============================
Sprite_Character.prototype.drill_EASe_createDecorator = function(){
	var character = this._character;
	if( character == null ){ return; }
	if( character._drill_EASe_controller == null ){ return; }
	if( this._drill_EASe_decorator == null ){
		this._drill_EASe_decorator = new Drill_COAS_SpriteDecorator( this, character._drill_EASe_controller );
	}
}
//==============================
// * 行走图贴图绑定 - 销毁 动画序列贴图
//
//			说明：	> 此函数可以在帧刷新中反复执行。只在 非空贴图 的时候才销毁。
//==============================
Sprite_Character.prototype.drill_EASe_destroyDecorator = function(){
	if( this._drill_EASe_decorator != null ){
		this._drill_EASe_decorator.drill_spriteMain_destroy();	//（执行销毁，确保还原贴图）
		this._drill_EASe_decorator = null;						//（置空）
	}
}
//==============================
// * 行走图贴图绑定 - 帧刷新
//==============================
var _drill_EASe_sp_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	//（有 行走图优化核心 支撑，行走图动画序列 不会 产生巨大消耗）
	
	this.drill_EASe_updateDecoratorCreate();		//帧刷新 - 创建贴图
	this.drill_EASe_updateDecoratorDestroy();		//帧刷新 - 销毁贴图
	this.drill_EASe_updateDecorator();				//帧刷新 - 贴图
													//『行走图资源切换慢一帧』：注意，必须优先判定 decorator 创建/销毁，不然会慢1帧，导致闪图。
	
	// > 原函数
	_drill_EASe_sp_update.call(this);
};
//==============================
// * 行走图贴图绑定 - 帧刷新 - 创建贴图
//==============================
Sprite_Character.prototype.drill_EASe_updateDecoratorCreate = function() {
	var character = this._character;
	if( character == undefined ){ return; }
	
	// > 贴图销毁标记 开启时，不再创建
	if( character._drill_EASe_keepDecoratorNull == true ){ return; }
	
	// > 控制器序列号变化时，重建贴图
	if( character._drill_EASe_controller != undefined ){
		if( this._drill_EASe_decoratorCreateSerial != character._drill_EASe_controller._drill_controllerSerial ){
			this._drill_EASe_decoratorCreateSerial =  character._drill_EASe_controller._drill_controllerSerial;
			this.drill_EASe_destroyDecorator();
			this.drill_EASe_createDecorator();
		}
	}
	
	// > 有控制器时，创建贴图
	if( character._drill_EASe_controller != undefined ){
		this.drill_EASe_createDecorator();
	}
}
//==============================
// * 行走图贴图绑定 - 帧刷新 - 销毁贴图
//==============================
Sprite_Character.prototype.drill_EASe_updateDecoratorDestroy = function() {
	var character = this._character;
	if( character == undefined ){
		this.drill_EASe_destroyDecorator();		//（找不到数据时，立即销毁）
		return;
	}
	
	// > 贴图销毁标记（数据存在时，仍然销毁贴图）
	if( character._drill_EASe_keepDecoratorNull == true ){
		this.drill_EASe_destroyDecorator();
	}
}
//==============================
// * 行走图贴图绑定 - 帧刷新 - 贴图
//==============================
Sprite_Character.prototype.drill_EASe_updateDecorator = function() {
	if( this.drill_EASe_isPlaying() ){
		this._drill_EASe_decorator.update();
	}
}
//==============================
// * 行走图贴图绑定 - 是否正在播放
//==============================
Sprite_Character.prototype.drill_EASe_isPlaying = function() {
	if( this._drill_EASe_decorator == null ){ return false; }
	if( this._character == undefined ){ return false; }
	if( this._character._drill_EASe_controller == undefined ){ return false; }
	return true;
}


//=============================================================================
// ** ☆行走图贴图替换
//
//			说明：	> 此模块专门控制 行走图 替换为 动画序列。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图贴图替换 - 帧刷新 - 2B资源（半覆写）
//==============================
var _drill_EASe_sp_updateBitmap = Sprite_Character.prototype.updateBitmap;
Sprite_Character.prototype.updateBitmap = function() {
	
	// > 播放时，阻塞原函数
	if( this.drill_EASe_isPlaying() == true ){ return; }
	
	// > 原函数
	_drill_EASe_sp_updateBitmap.call(this);
}
//==============================
// * 行走图贴图替换 - 帧刷新 - 2C切割矩形（半覆写）
//==============================
var _drill_EASe_sp_updateFrame = Sprite_Character.prototype.updateFrame;
Sprite_Character.prototype.updateFrame = function() {
	
	// > 播放时，阻塞原函数
	if( this.drill_EASe_isPlaying() == true ){
		if( this._drill_EASe_decorator.drill_COAS_isReady() == false ){ return; }
		this.drill_EASe_updateFrame();
		return;
	}
	
	// > 原函数
	_drill_EASe_sp_updateFrame.call(this);
}
//==============================
// * 行走图贴图替换 - 帧刷新 - 播放动画序列的动画帧
//==============================
Sprite_Character.prototype.drill_EASe_updateFrame = function() {
	var pw = this.patternWidth();
	var ph = this.patternHeight();
	var sx = 0;
	var sy = 0;
	
	// > 当前朝向
	var cur_dir = this._character.direction();	//（默认朝向 2/4/6/8）
	
	// > 当前朝向 - 兼容【行走图 - 图块同步镜像】
	if( Imported.Drill_LayerSynchronizedReflection ){
		if( this instanceof Drill_Sprite_LSR ){
			
			// > 朝向倒转
			if( this._character.drill_LSR_isLockDir() != true ){
				if( cur_dir == 2 ){ cur_dir = 8; }
				else if( cur_dir == 8 ){ cur_dir = 2; }
				else if( cur_dir == 1 ){ cur_dir = 7; }
				else if( cur_dir == 7 ){ cur_dir = 1; }
				else if( cur_dir == 3 ){ cur_dir = 9; }
				else if( cur_dir == 9 ){ cur_dir = 3; }
			}
		}
	}
	
	// > 当前朝向 - 无方向
	//	（不操作）
	
	// > 当前朝向 - 无方向可翻转
	//	（不操作）
	
	// > 当前朝向 - 四方向
	if( this._character._drill_EASe_type == "4dir" ){
		
		// > 上下朝向时，保持左右朝向
		var cur_sp_dir = 2;
		if( cur_dir == 2 ){ cur_sp_dir = 2; }
		if( cur_dir == 4 ){ cur_sp_dir = 4; }
		if( cur_dir == 6 ){ cur_sp_dir = 6; }
		if( cur_dir == 8 ){ cur_sp_dir = 8; }
		
		if( cur_dir == 1 ){ cur_sp_dir = 2; }	//（这里直接写死吧，后期再考虑改进）
		if( cur_dir == 7 ){ cur_sp_dir = 4; }
		if( cur_dir == 3 ){ cur_sp_dir = 6; }
		if( cur_dir == 9 ){ cur_sp_dir = 8; }
		
		var y_index = 0;
		if( cur_sp_dir == 2 ){ y_index = 0; }
		else if( cur_sp_dir == 4 ){ y_index = 1; }
		else if( cur_sp_dir == 6 ){ y_index = 2; }
		else if( cur_sp_dir == 8 ){ y_index = 3; }
		sy = y_index * ph;
	
	// > 当前朝向 - 二方向
	}else if( this._character._drill_EASe_type == "2dir" ){
		
		// > 默认朝向右
		if( this._drill_EASe_lastSpriteDir == undefined ){ this._drill_EASe_lastSpriteDir = 6; }
		
		// > 上下朝向时，保持之前的朝向
		var cur_sp_dir = 6;
		if( cur_dir == 2 ){ cur_sp_dir = this._drill_EASe_lastSpriteDir; }
		if( cur_dir == 8 ){ cur_sp_dir = this._drill_EASe_lastSpriteDir; }
		if( cur_dir == 4 ){ this._drill_EASe_lastSpriteDir = 4; cur_sp_dir = 4; }
		if( cur_dir == 6 ){ this._drill_EASe_lastSpriteDir = 6; cur_sp_dir = 6; }
		if( cur_dir == 1 ){ this._drill_EASe_lastSpriteDir = 1; cur_sp_dir = 1; }
		if( cur_dir == 7 ){ this._drill_EASe_lastSpriteDir = 7; cur_sp_dir = 7; }
		if( cur_dir == 3 ){ this._drill_EASe_lastSpriteDir = 3; cur_sp_dir = 3; }
		if( cur_dir == 9 ){ this._drill_EASe_lastSpriteDir = 9; cur_sp_dir = 9; }
		
		var y_index = 0;
		if( cur_sp_dir == 6 ){ y_index = 0; }	//（二方向资源：先朝右，后朝左）
		else if( cur_sp_dir == 4 ){ y_index = 1; }
		else if( cur_sp_dir == 1 ){ y_index = 1; }
		else if( cur_sp_dir == 7 ){ y_index = 1; }
		else if( cur_sp_dir == 3 ){ y_index = 0; }
		else if( cur_sp_dir == 9 ){ y_index = 0; }
		sy = y_index * ph;
	
	// > 当前朝向 - 八方向
	}else if( this._character._drill_EASe_type == "8dir" ){
		
		var y_index = 0;
		if( cur_dir == 2 ){ y_index = 0; }
		else if( cur_dir == 4 ){ y_index = 1; }
		else if( cur_dir == 6 ){ y_index = 2; }
		else if( cur_dir == 8 ){ y_index = 3; }
		else if( cur_dir == 1 ){ y_index = 4; }
		else if( cur_dir == 7 ){ y_index = 5; }
		else if( cur_dir == 3 ){ y_index = 6; }
		else if( cur_dir == 9 ){ y_index = 7; }
		sy = y_index * ph;
	}
	
	// > 当前朝向 - 执行切割
	this.setFrame(sx, sy, pw, ph);
}


//=============================================================================
// ** ☆行走图贴图兼容
//
//			说明：	> 此模块专门兼容 行走图优化核心 插件。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行走图贴图兼容 - 宽度
//==============================
var _drill_EASe_COEF_s_patternWidth = Sprite_Character.prototype.drill_COEF_updateValue_PatternWidth;
Sprite_Character.prototype.drill_COEF_updateValue_PatternWidth = function() {
	_drill_EASe_COEF_s_patternWidth.call(this);
	if( this.bitmap == undefined ){ return; }
	if( this.drill_EASe_isPlaying() == false ){ return; }
	
	// > 图块情况
	if( this._tileId > 0 ){ return; }
	
	// > 宽度
	this._drill_COEF_PatternWidth = this.bitmap.width;
};
//==============================
// * 行走图贴图兼容 - 高度
//==============================
var _drill_EASe_COEF_s_patternHeight = Sprite_Character.prototype.drill_COEF_updateValue_PatternHeight;
Sprite_Character.prototype.drill_COEF_updateValue_PatternHeight = function() {
	_drill_EASe_COEF_s_patternHeight.call(this);
	if( this.bitmap == undefined ){ return; }
	if( this.drill_EASe_isPlaying() == false ){ return; }
	
	// > 图块情况
	if( this._tileId > 0 ){ return; }
	
	
	// > 高度 - 四方向
	if( this._character._drill_EASe_type == "4dir" ){
		this._drill_COEF_PatternHeight = this.bitmap.height / 4;
	
	// > 高度 - 二方向
	}else if( this._character._drill_EASe_type == "2dir" ){
		this._drill_COEF_PatternHeight = this.bitmap.height / 2;
	
	// > 高度 - 八方向
	}else if( this._character._drill_EASe_type == "8dir" ){
		this._drill_COEF_PatternHeight = this.bitmap.height / 8;
	
	// > 高度 - 无方向、无方向可翻转
	}else{
		this._drill_COEF_PatternHeight = this.bitmap.height;
	}
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventActionSequence = false;
		var pluginTip = DrillUp.drill_EASe_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


