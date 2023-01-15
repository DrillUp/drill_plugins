//=============================================================================
// Drill_EventText.js
//=============================================================================

/*:
 * @plugindesc [v2.2]        行走图 - 事件漂浮文字
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventText +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置一个一直跟随行走图的漂浮文字，并且支持特殊字符。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。还可以被其他插件扩展使用。
 * 基于：
 *   - Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心★★v1.9及以上★★
 * 可被扩展：
 *   - Drill_CoreOfColor           窗口字符-颜色核心
 *     该插件能给事件漂浮文字设置自定义颜色和高级渐变色。
 *   - Drill_X_EventTextFilter     行走图-事件漂浮文字的滤镜效果[扩展]
 *     该插件能给事件的漂浮文字添加滤镜效果。
 *   - Drill_X_EventTextBackground 行走图-事件漂浮文字的背景[扩展]
 *     该插件能给事件的漂浮文字添加背景。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只对事件有效，放置在 地图上层 。
 * 2.具体可以去看看 "7.行走图 > 关于事件漂浮文字.docx"。
 * 漂浮文字：
 *   (1.你可以通过换事件页，来切换头顶的漂浮文字。
 *      你可以使用变量等特殊字符，但是变量的变动不会主动刷新漂浮文字。
 *   (2.显示出来的文字不能包含 英文空格 ，但是可以包含中文空格。
 *   (3.你可以在文本中加入各种窗口字符：
 *       \c[n] 变颜色    \i[n] 显示图标    \{ \} 字体变大变小
 *       \V[n] 显示变量  \N[n] 显示角色名  \G 显示货币单位
 *      更多的特殊字符，可以去看看插件：窗口字符-窗口字符核心。
 *   (4.字符串中可以使用\V[n]变量，但是注释指令不会刷新变量值，
 *      需要用插件指令执行，才会刷新值。
 *   (5.你还可以添加更为特殊的窗口字符。
 *      具体可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 位置：
 *   (1.漂浮位置固定在事件上方24像素的位置，你可以根据需要，对文字进行
 *      位置偏移调整。
 *   (2.事件变形、位移时，漂浮文字会一直跟着事件。
 *   (3.你还可以设置文本左对齐/居中/右对齐。
 * 外框：
 *   (1.漂浮位置默认都带有外框，你可以设置显示或者隐藏。
 *      外框的皮肤与窗口皮肤一样。
 *   (2.漂浮文字的地图层级固定为 上层 ，图片层级为100。
 *      比如上层且图片层级大于100的地图背景，可以挡住漂浮文字，反之则
 *      在文字下面。
 * 设计：
 *   (1.你可以给事件漂浮文字添加高级颜色或者设置带框，来突出某些重要的npc。
 *   (2.事件漂浮文字支持轮播功能，你可以制作类似广告牌或者霓虹灯的效果。
 *      也可以和事件漂浮文字滤镜组合，制作文本渐变闪烁效果。
 *      具体可以去看看 "7.行走图 > 关于事件漂浮文字.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要在事件中添加注释，并填入以下指令：
 *（中英文冒号都可以,旧注释冒号左右不能有空格,标准注释左右都有一空格。）
 *
 * 事件注释：=>事件漂浮文字 : 这是一串被显示出来的文字
 * 事件注释：=>事件漂浮文字 : 这是一串被显示出来的文字 : 201
 * 事件注释：=>事件漂浮文字 : 偏移 : 5 : -5
 * 事件注释：=>事件漂浮文字 : 外框 : 显示
 * 事件注释：=>事件漂浮文字 : 外框 : 隐藏
 * 事件注释：=>事件漂浮文字 : 对齐方式 : 左对齐
 * 事件注释：=>事件漂浮文字 : 对齐方式 : 居中
 * 事件注释：=>事件漂浮文字 : 对齐方式 : 右对齐
 *
 * 事件注释(旧)：事件漂浮文字:这是一串被显示出来的文字
 * 事件注释(旧)：事件漂浮文字:偏移:5:-5
 * 事件注释(旧)：事件漂浮文字:外框:显示
 * 事件注释(旧)：事件漂浮文字:外框:隐藏
 * 事件注释(旧)：事件漂浮文字:对齐方式:左对齐
 * 事件注释(旧)：事件漂浮文字:对齐方式:居中
 * 事件注释(旧)：事件漂浮文字:对齐方式:右对齐
 *
 * 1.考虑到此插件用途太广泛，"显示出来的文字"中，
 *   注释已经支持英文空格，并支持换行符"\n"。
 *   你也可以用 字符串核心 的\str[21]代替，在字符串中加空格。
 * 2.冒号后面的数字表示颜色，可以填默认的0-31。
 *   也可以填高级颜色编号\c[201]，但需要 颜色核心 插件的支持。
 * 3.显示出来的文字不能包含 英文空格 ，但是可以包含中文空格。
 * 4.你可以通过特殊字符使得文字变大变小，可以与偏移设置一起用。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改事件漂浮文字：
 * 
 * 插件指令：>事件漂浮文字 : 本事件 : 修改文本 : 这是一串修改的文字
 * 插件指令：>事件漂浮文字 : 事件[10] : 修改文本 : 这是一串修改的文字
 * 插件指令：>事件漂浮文字 : 事件变量[10] : 修改文本 : 这是一串修改的文字
 * 
 * 插件指令：>事件漂浮文字 : 本事件 : 修改文本 : 这是一串修改的文字
 * 插件指令：>事件漂浮文字 : 本事件 : 清空文本
 * 插件指令：>事件漂浮文字 : 本事件 : 强制刷新文本
 * 插件指令：>事件漂浮文字 : 本事件 : 设置偏移 : 5 : -5
 * 插件指令：>事件漂浮文字 : 本事件 : 设置偏移(变量) : 5 : -5
 * 插件指令：>事件漂浮文字 : 本事件 : 外框 : 显示
 * 插件指令：>事件漂浮文字 : 本事件 : 外框 : 隐藏
 * 插件指令：>事件漂浮文字 : 本事件 : 对齐方式 : 左对齐
 * 插件指令：>事件漂浮文字 : 本事件 : 对齐方式 : 居中
 * 插件指令：>事件漂浮文字 : 本事件 : 对齐方式 : 右对齐
 * 
 * 1.你可以指定某个事件"事件[n]"，或者变量对应的事件id号"事件变量[n]"。
 * 2.字符串中可以使用\V[n]变量，但是注释指令不会刷新变量值，需要用插件
 *   指令执行，才会刷新值。
 * 3.修改的文本离开当前地图后将失效。
 * 4.显示出来的文字不能包含 英文空格 ，但是可以包含中文空格。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 轮播注释
 * 你可以在事件注释中添加下面内容，实现轮播文本：
 * 
 * 事件注释：=>事件漂浮文字 : 轮播文本 : 轮播下列文本
 *           =:第一行文本
 *           =:第二行文本
 * 事件注释：=>事件漂浮文字 : 轮播文本 : 修改轮播间隔[30]
 * 事件注释：=>事件漂浮文字 : 轮播文本 : 轮播模式[单次]
 * 事件注释：=>事件漂浮文字 : 轮播文本 : 轮播模式[循环]
 * 
 * 1.通过"=:"来设置多行的轮播文本，轮播文本数量不限，设置十几行也可以。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 轮播插件指令
 * 你可以通过插件指令来设置轮播文本：
 * 
 * 插件指令：>事件漂浮文字 : 本事件 : 轮播文本 : 清空
 * 插件指令：>事件漂浮文字 : 事件[10] : 轮播文本 : 清空
 * 插件指令：>事件漂浮文字 : 事件变量[10] : 轮播文本 : 清空
 * 
 * 插件指令：>事件漂浮文字 : 本事件 : 轮播文本 : 添加 : 一串文本
 * 插件指令：>事件漂浮文字 : 本事件 : 轮播文本 : 清空
 * 插件指令：>事件漂浮文字 : 本事件 : 轮播文本 : 开始单次播放
 * 插件指令：>事件漂浮文字 : 本事件 : 轮播文本 : 开始循环播放
 * 插件指令：>事件漂浮文字 : 本事件 : 轮播文本 : 暂停播放
 * 插件指令：>事件漂浮文字 : 本事件 : 轮播文本 : 继续播放
 * 插件指令：>事件漂浮文字 : 本事件 : 轮播文本 : 修改轮播间隔[30]
 * 
 * 1.轮播文本可以反复执行"添加"指令，实现多行文本的添加，并进行轮播。
 *   但注意，执行前最好先"清空"。
 * 2.轮播文本设置后，只在当前地图有效，离开地图后失效。
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   去物体管理层、地理管理层、鼠标管理层转一圈测试就可以了。
 * 测试结果：   200个事件的地图中，消耗为：【32.48ms】
 *              100个事件的地图中，消耗为：【21.73ms】
 *               50个事件的地图中，消耗为：【10.55ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.v1.3版本之后优化了结构，事件需要时才自动创建，减少了消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * [v1.2]
 * 添加了插件性能说明。
 * [v1.3]
 * 添加了修改漂浮文字的插件指令设置。
 * 该版本解决了需要时创建的bug，已固定为需要时自动创建。
 * [v1.4]
 * 添加了漂浮文字外框显示隐藏的功能。
 * [v1.5]
 * 添加了对齐方式。
 * [v1.6]
 * 修复了复制事件时，五毛特效 效果会多次叠加的bug。
 * [v1.7]
 * 优化了内部结构。并兼容 窗口字符块 。
 * [v1.8]
 * 修复了 切换菜单 时，漂浮文字会延迟加载的问题。
 * [v1.9]
 * 大幅度修改了内部结构，添加了轮播文本的功能。
 * [v2.0]
 * 修复了外框一直显示的bug，以及轮播无效的bug。
 * [v2.1]
 * 使得插件支持多行换行，以及事件注释中的英文空格。
 * [v2.2]
 * 添加了优化策略，减少性能消耗。
 * 
 * 
 * 
 * @param 图片层级
 * @type number
 * @min 1
 * @desc 所有漂浮文字都放置在 地图上层 ， 且都处于该图片层级。
 * @default 100
 *
 * @param 默认字体大小
 * @type number
 * @min 1
 * @desc 漂浮文字默认的字体大小。
 * @default 18
 * 
 * @param 默认对齐方式
 * @type select
 * @option 左对齐
 * @value 左对齐
 * @option 居中
 * @value 居中
 * @option 右对齐
 * @value 右对齐
 * @desc 默认文本的对齐方式。
 * @default 居中
 *
 * @param 默认是否显示外框
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 显示漂浮文字的外框背景。
 * @default false
 *
 * @param 内边距
 * @parent 默认是否显示外框
 * @type number
 * @min 1
 * @desc 漂浮文字框的内边距。
 * @default 4
 *
 * @param 默认轮播间隔
 * @type number
 * @min 1
 * @desc 开启轮播文本时，默认轮播的间隔，单位帧。（1秒60帧）
 * @default 30
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ET（Event_Text）
//		临时全局变量	DrillUp.g_ET_xxx
//		临时局部变量	this._drill_ET_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)	每帧
//		★性能测试因素	乱跑
//		★性能测试消耗	全创建（44.70ms） 自动创建（10.55ms）
//		★最坏情况		镜头内出现大量含有窗口的事件，并且随时都在更换文字。
//		★备注			1.我不太相信这个消耗那么少，很可能计算量都转移到了贴图处理上。
//						2.不确定是否优化成功了，不过消耗量的确是降了。
//		
//		★优化记录		
//			2022-7-23优化：
//				这次不是优化性能，而是优化内存，将数据和贴图分离，没有事件漂浮文字的事件，就为空数据。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件漂浮文字：
//				->容器
//					->事件容器（统计有 控制器 的事件）
//					->容器层（漂浮文字贴图）
//					->贴图自动销毁
//				->漂浮文字控制器
//					->标准模块 模板
//						->帧刷新【标准函数】
//						->重设数据【标准函数】
//						->显示/隐藏【标准函数】
//						->初始化数据【标准默认值】
//					->参数设置
//						->修改文本【开放函数】
//						->强制刷新文本【开放函数】
//						->设置偏移【开放函数】
//						->设置对齐方式【开放函数】
//						->设置外框显示【开放函数】
//						->设置轮播文本【开放函数】
//						->设置轮播间隔【开放函数】
//					->轮播文本
//					->插件指令控制
//				->漂浮文字贴图
//					->标准模块 模板
//						->设置控制器【开放函数】
//						->是否就绪【标准函数】
//						->是否需要销毁【标准函数】
//						->销毁【标准函数】
//					->文本跟随
//					->对齐方式
//					->根据字符长宽变化窗口大小
//
//		★私有类如下：
//			* Drill_ET_Controller【漂浮文字控制器】
//			* Drill_ET_WindowSprite【漂浮文字贴图】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【刷新统计】。
//			4.事件容器每次都会重新统计，新事件加入时，【只要加了注释或者定义了插件指令，就能捕获到】，不要考虑太多，把自己绕晕。
//			
//		★其它说明细节：
//			1.window把一个子sprite的bitmap，强制称呼为contents。同时定义了contentsOpacity，区别于窗口本身的opacity。
//				this.createContents();	实际为 new bitmap
//				this.contents.clear();	实际为 bitmap 清除内容（长宽不变）
//			  要重设bitmap，只能new bitmap，重新createContents()。
//			2.经过优化，贴图用到的时候才new，但是由于_init写在object里面，在spriteset_map刷新的时候，object也要刷。
//			  object在进入菜单后是不刷的，但是贴图会刷。
//			3.完美获取字符宽度： drawTextEx()的返回值（这里的函数调了两次，第一次是为计算，第二次是为画）
//			  完美获取字符高度： calcTextHeight()的返回值（必须组装临时textState使用）
//			  由于需要边画边算，需要的东西缠绕在一起，所以只能跟着绕。
//			4. 2020/8/15
//				重新整理了一下漂浮文字贴图的结构。
//				整体结构为 事件容器 + 窗口绘制文字 ，虽然结构清晰简单，但是以前是在探索阶段，留下了不少代码旧坑。
//				过去该插件bug修复的次数较多，其中有很多细微的关联，只要一去掉，就会丢失功能。不过这里都标注清楚了。
//			5. 2022/7/23
//				该插件的结构已经相对完整的分离成了 贴图与数据 的结构。
//				如果有什么想加的参数直接访问数据即可。出乎我意料的是，大幅度翻新之后，竟然没有什么bug和报错，最多也就漂浮文字不显示。
//				
//		★存在的问题：
//			1.循环地图中，如果在地图边界徘徊，文字变化和滤镜会被累加。 （2021-7-5 此问题似乎已被解决，"创建新的漂浮文字"结构修改之后，问题似乎不见了）
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventText = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventText');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_ET_layer = Number(DrillUp.parameters["图片层级"] || 100); 
	DrillUp.g_ET_fontSize = Number(DrillUp.parameters["默认字体大小"] || 18); 
	DrillUp.g_ET_padding = Number(DrillUp.parameters["内边距"] || 4); 
	DrillUp.g_ET_align = String(DrillUp.parameters["默认对齐方式"] || "居中");	
	DrillUp.g_ET_frameVisible = String(DrillUp.parameters["默认是否显示外框"] || "false") === "true";	
	DrillUp.g_ET_loopInterval = Number(DrillUp.parameters["默认轮播间隔"] || 30); 
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_ET_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_ET_pluginCommand.call(this, command, args);
	if( command === ">事件漂浮文字" ){
		
		/*-----------------单对象获取------------------*/
		var e_id = null;
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "本事件" ){
				e_id = this._eventId;
			}
			if( temp1.indexOf("事件[") != -1 ){
				temp1 = temp1.replace("事件[","");
				temp1 = temp1.replace("]","");
				e_id = Number(temp1);
			}
			if( temp1.indexOf("事件变量[") != -1 ){
				temp1 = temp1.replace("事件变量[","");
				temp1 = temp1.replace("]","");
				e_id = $gameVariables.value(Number(temp1));
			}
		}
		
		/*-----------------清空文本------------------*/
		if( e_id != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "清空文本" ){
				if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_ET_setText( "" );		//（清空文本同时关闭轮播）
				e._drill_ET_controller.drill_ET_setLoopEnabled( false );
			}
			if( type == "强制刷新文本" ){
				if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_ET_forceRefresh();
			}
		}
				
		/*-----------------修改文本------------------*/
		if( e_id != null && args.length == 6 ){ 	//	>事件漂浮文字 : 本事件 : 修改文本 : 这是一串字符
			var type = String(args[3]);
			var temp3 = String(args[5]);
			if( type == "修改文本" ){
				if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_ET_setText( temp3 );
			}
			if( type == "外框" ){
				if( temp3 == "显示" ){
					if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event(e_id);
					e.drill_ET_createController();
					e._drill_ET_controller.drill_ET_setFrameVisible( true );
				}
				if( temp3 == "隐藏" ){
					if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event(e_id);
					e.drill_ET_createController();
					e._drill_ET_controller.drill_ET_setFrameVisible( false );
				}
			}
			if( type == "对齐方式" ){
				if( temp3 == "左对齐" || temp3 == "居中" || temp3 == "右对齐" ){
					if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event(e_id);
					e.drill_ET_createController();
					e._drill_ET_controller.drill_ET_setAlign( temp3 );
				}
			}
		}
		
		/*-----------------偏移------------------*/
		if( e_id != null && args.length == 8 ){
			var type = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = String(args[7]);
			if( type == "设置偏移" ){
				if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_ET_setOffset( Number(temp3),Number(temp4) );
			}
			if( type == "设置偏移(变量)" ){
				if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller.drill_ET_setOffset( $gameVariables.value(Number(temp3)), $gameVariables.value(Number(temp4)) );
			}
		}
		
		
		/*-----------------轮播文本------------------*/
		if( e_id != null && args.length == 8 ){
			var type = String(args[3]);
			var temp3 = String(args[5]);
			var temp4 = String(args[7]);
			if( type == "轮播文本" && temp3 == "添加" ){
				if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				e.drill_ET_createController();
				e._drill_ET_controller._drill_data['loop_textTank'].push( temp4 );
			}
		}
		if( e_id != null && args.length == 6 ){
			var type = String(args[3]);
			var temp3 = String(args[5]);
			if( type == "轮播文本" ){
				if( $gameMap.drill_ET_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event(e_id);
				if( temp3 == "清空" ){
					e.drill_ET_createController();
					e._drill_ET_controller.drill_ET_setLoopText( [] );
				}
				if( temp3 == "开始单次播放" ){
					e.drill_ET_createController();
					e._drill_ET_controller.drill_ET_setLoopMode( "单次" );
					e._drill_ET_controller.drill_ET_setLoopEnabled( true );
				}
				if( temp3 == "开始循环播放" ){
					e.drill_ET_createController();
					e._drill_ET_controller.drill_ET_setLoopMode( "循环" );
					e._drill_ET_controller.drill_ET_setLoopEnabled( true );
				}
				if( temp3 == "暂停播放" ){
					e.drill_ET_createController();
					e._drill_ET_controller.drill_ET_setLoopEnabled( false );
				}
				if( temp3 == "继续播放" ){
					e.drill_ET_createController();
					e._drill_ET_controller.drill_ET_setLoopEnabled( true );
				}
				if( temp3.indexOf("修改轮播间隔[") != -1 ){
					temp3 = temp3.replace("修改轮播间隔[","");
					temp3 = temp3.replace("]","");
					e.drill_ET_createController();
					e._drill_ET_controller.drill_ET_setLoopInterval( Number(temp3) );
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ET_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventText.js 行走图 - 事件漂浮文字】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 事件注释初始化
//=============================================================================
//==============================
// * 事件 - 注释初始化
//==============================
var _drill_ET_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_ET_c_setupPageSettings.call(this);
	this.drill_ET_refreshText();
}
Game_Event.prototype.drill_ET_refreshText = function() {
	
	// > 默认情况下，归位并置空
	if( this._drill_ET_controller != null ){
		this._drill_ET_controller.drill_ET_setText( "" );
		this._drill_ET_controller.drill_ET_setOffset( 0,0 );
		this._drill_ET_controller.drill_ET_setLoopEnabled( false );
	}
	
	var page = this.page();
    if( page ){
				
		// > 多行注释标记
		var temp_start = false;	
		var temp_context = [];
		
		var temp_list = this.list();
		for(var k = 0; k < temp_list.length; k++ ){
			var l = temp_list[k];
			if( l.code === 108 || l.code === 408 ){		//（408表示注释后面的多行结构）
				
				/*-----------------标准注释------------------*/
				var row = l.parameters[0];
				var args = row.split(/[ ]+/);	
				var command = args.shift();
				if( command == "=>事件漂浮文字" ){
					
					/*-----------------标准格式的注释------------------*/
					if( args.length == 4 && ( String(args[2]) == ":" || String(args[2]) == "：" ) ){
						var temp1 = String(args[1]);
						var temp2 = String(args[3]);
						if( temp1 == "外框" ){
							if( temp2 == "显示" ){
								this.drill_ET_createController();
								this._drill_ET_controller.drill_ET_setFrameVisible( true );
							}
							if( temp2 == "隐藏" ){
								this.drill_ET_createController();
								this._drill_ET_controller.drill_ET_setFrameVisible( false );
							}
							continue;
						}else if( temp1 == "对齐方式" ){
							if( temp2 == "左对齐" || temp2 == "居中" || temp2 == "右对齐" ){
								this.drill_ET_createController();
								this._drill_ET_controller.drill_ET_setAlign( temp2 );
							}
							continue;
						}else if( temp1 == "轮播文本" ){
							if( temp2 == "轮播下列文本" ){
								temp_start = true;
								continue;	//（跳至下一行）
							}
							if( temp2.indexOf("修改轮播间隔[") != -1 ){
								temp2 = temp2.replace("修改轮播间隔[","");
								temp2 = temp2.replace("]","");
								this.drill_ET_createController();
								this._drill_ET_controller.drill_ET_setLoopInterval( Number(temp2) );
							}
							if( temp2.indexOf("轮播模式[") != -1 ){
								temp2 = temp2.replace("轮播模式[","");
								temp2 = temp2.replace("]","");
								this.drill_ET_createController();
								this._drill_ET_controller.drill_ET_setLoopMode( temp2 );
							}
							continue;
						}
					}
					if( args.length == 6 && ( String(args[4]) == ":" || String(args[4]) == "：" ) ){
						var temp1 = String(args[1]);
						var temp2 = String(args[3]);
						var temp3 = String(args[5]);
						if( temp1 == "偏移" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_ET_setOffset( Number(temp2),Number(temp3) );
							continue;
						}
					}
					
					/*-----------------允许空格的字符串注释------------------*/
					if( args.length >= 2 ){
						var last_arg_1 = String(args[ args.length-1 ]);
						var last_arg_2 = String(args[ args.length-2 ]);
						
						// > 文本色情况
						if( args.length >= 4 && ( last_arg_2 == ":" || last_arg_2 == "：" ) ){
							var str_list = [];
							for( var i=1; i < args.length-2; i++ ){
								str_list.push( String(args[i]) );
							}
							var str = str_list.join(" ");
							str = str.replace("\\n","\n");
							this.drill_ET_createController();
							this._drill_ET_controller.drill_ET_setText( "\\c["+last_arg_1+"]" + str );
						
						// > 普通文本情况
						}else{
							var str_list = [];
							for( var i=1; i < args.length; i++ ){
								str_list.push( String(args[i]) );
							}
							var str = str_list.join(" ");
							str = str.replace("\\n","\n");
							this.drill_ET_createController();
							this._drill_ET_controller.drill_ET_setText( str );
						}
					}
				};  
				
				// > 多行注释捕获（轮播下列文本）
				if( temp_start == true ){
					if( row.contains("=:") ){
						temp_context.push(row.replace("=:",""));
					}else{
						this.drill_ET_createController();
						this._drill_ET_controller.drill_ET_setLoopText( temp_context );
						this._drill_ET_controller.drill_ET_setLoopEnabled( true );
						temp_start = false;
					}
				}
				
				/*-----------------旧注释------------------*/
				var comment = l.parameters[0].split(/[:：]/);
				if( comment[0].toLowerCase() === "事件漂浮文字" ){
					if( comment.length == 2 ){
						this.drill_ET_createController();
						this._drill_ET_controller.drill_ET_setText( String(comment[1]) );
					}
					if( comment.length == 4 && comment[1] == "偏移" ){
						this.drill_ET_createController();
						this._drill_ET_controller.drill_ET_setOffset( Number(comment[2]),Number(comment[3]) );
					}
					if( comment.length == 3 && comment[1] == "外框" ){
						if( comment[2] == "显示" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_ET_setFrameVisible( true );
						}
						if( comment[2] == "隐藏" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_ET_setFrameVisible( false );
						}
					}
					if( comment.length == 3 && comment[1] == "对齐方式" ){
						if( comment[2] == "左对齐" || comment[2] == "居中" || comment[2] == "右对齐" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_ET_setAlign( comment[2] );
						}
					}
				}
				
			};
		};
				
		// > 多行注释捕获（轮播下列文本，如果没有捕获到时）
		if( temp_start == true ){
			this.drill_ET_createController();
			this._drill_ET_controller.drill_ET_setLoopText( temp_context );
			this._drill_ET_controller.drill_ET_setLoopEnabled( true );
			temp_start = false;
		}
    }
}


//=============================================================================
// ** 事件容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_ET_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_ET_temp_initialize.call(this);
	this._drill_ET_textEvents = [];			//（含漂浮文字的事件）
	this._drill_ET_needRestatistics = true;
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_ET_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	$gameTemp._drill_ET_textEvents = [];	//（含漂浮文字的事件）
	$gameTemp._drill_ET_needRestatistics = true;
	
	// > 原函数
	_drill_ET_gmap_setup.call( this, mapId );
	
	this.drill_ET_updateRestatistics();		//（强制刷新统计一次，确保刚加载就有）
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_ET_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_ET_textEvents = [];
	$gameTemp._drill_ET_needRestatistics = true;
	$gameMap.drill_ET_updateRestatistics();	//（强制刷新统计一次，确保刚加载就有）
	_drill_ET_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 地图销毁时
//==============================
var _drill_ET_map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_ET_map_terminate.call(this);
	$gameTemp._drill_ET_textEvents = [];
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_ET_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive){
	_drill_ET_map_update.call(this,sceneActive);
	this.drill_ET_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_ET_updateRestatistics = function() {
	if( $gameTemp._drill_ET_needRestatistics != true ){ return }
	$gameTemp._drill_ET_needRestatistics = false;
	
	$gameTemp._drill_ET_textEvents = [];			//容器中的事件，只增不减，除非清零
	var events = this.events();
	for( var i = 0; i < events.length; i++ ){
		var temp_event = events[i];
		if( temp_event == undefined ){ continue; }
		if( temp_event._drill_ET_controller == undefined ){ continue; }
		$gameTemp._drill_ET_textEvents.push(temp_event);
	}
}


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_ET_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_ET_layer_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Spriteset_Map.prototype.drill_ET_sortByZIndex = function() {
	this._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};


//=============================================================================
// ** 漂浮文字容器层 控制
//=============================================================================
//==============================
// * 容器层 - 初始化
//==============================
var _drill_ET_s_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_ET_s_createDestination.call(this);
	this.drill_ET_create();					//层级创建
	this.drill_ET_updateNewEventText();		//漂浮文字变化（创建后立刻强制变化一次）
}
//==============================
// * 容器层 - 层级创建
//==============================
Spriteset_Map.prototype.drill_ET_create = function() {
	this._drill_ET_textLayer = new Sprite();
	this._drill_ET_textLayer.zIndex = DrillUp.g_ET_layer;
	this._drill_ET_spriteTank = [];			//漂浮文字贴图集合
	this._drill_ET_eventCount = 0;			//事件数量变化监听
	
	this._drill_mapUpArea.addChild(this._drill_ET_textLayer);
	this.drill_ET_sortByZIndex();			//排序
}
//==============================
// * 容器层 - 帧刷新漂浮文字变化
//==============================
var _drill_ET_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	_drill_ET_update.call(this);
	this.drill_ET_updateNewEventText();		//帧刷新 - 添加漂浮文字
	this.drill_ET_updateAutoDestroy();		//帧刷新 - 自动销毁
}
//==============================
// * 容器层 - 添加漂浮文字
//==============================
Spriteset_Map.prototype.drill_ET_updateNewEventText = function(){
	var e_tank = $gameTemp._drill_ET_textEvents;	//（这里注意确保 事件容器 已经统计好了）
	
	// > 事件数量变化监听
	if( this._drill_ET_eventCount == e_tank.length ){ return; }		//（事件只增不减，以此来控制贴图数量）
	if( this._drill_ET_eventCount > e_tank.length ){ return; }		//异常情况（目前不会出现，如果出现，则需要remove所有的文字，重新添加）
	this._drill_ET_eventCount = e_tank.length;
	
	// > 创建新的漂浮文字（没有贴图时，创建贴图）
	for(var i = 0; i < e_tank.length; i++ ){		
		var temp_event = e_tank[i];
		var temp_sprite = this.drill_ET_getSpriteByEvent( temp_event );
		if( temp_sprite == undefined ){
			this.drill_ET_createWindowSprite( temp_event );
		}
	}
}
//==============================
// * 容器层 - 自动销毁
//==============================
Spriteset_Map.prototype.drill_ET_updateAutoDestroy = function(){
	for(var j = this._drill_ET_spriteTank.length-1; j >= 0; j-- ){
		var temp_sprite = this._drill_ET_spriteTank[j];
		if( temp_sprite == undefined ){
			this._drill_ET_spriteTank.splice( j, 1 );
			continue;
		}
		if( temp_sprite.drill_ET_isNeedDestroy() == true ){		//（事件被删除了，才去掉漂浮文字）
			this._drill_ET_textLayer.removeChild( temp_sprite );
			this._drill_ET_spriteTank.splice( j, 1 );
			temp_sprite.drill_ET_destroy();
		}
	}
}
//==============================
// * 获取 - 获取漂浮文字贴图（根据事件对象）
//==============================
Spriteset_Map.prototype.drill_ET_getSpriteByEvent = function( ev ){
	if( ev == undefined ){ return null; }
	for(var j = 0; j < this._drill_ET_spriteTank.length; j++ ){
		var temp_sprite = this._drill_ET_spriteTank[j];
		if( temp_sprite._drill_event == ev ){
			return temp_sprite;
		}
	}
	return null;
}
//==============================
// * 创建 - 漂浮文字贴图（单独分离该函数，便于扩展）
//==============================
Spriteset_Map.prototype.drill_ET_createWindowSprite = function( ev ){
	if( ev == undefined ){ return }
	var new_sprite = new Drill_ET_WindowSprite( ev );
	this._drill_ET_spriteTank.push( new_sprite );
	this._drill_ET_textLayer.addChild( new_sprite );
}


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 初始化
//==============================
var _drill_ET_c_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function( mapId, eventId ){
	this._drill_ET_controller = null;
	_drill_ET_c_initialize.call( this, mapId, eventId );
}
//==============================
// * 事件 - 创建漂浮文字控制器
//==============================
Game_Event.prototype.drill_ET_createController = function(){
	
	// > 已存在，跳过
	if( this._drill_ET_controller != null ){ return; }
	
	// > 创建控制器
	var data = {
		"visible":true,
		"eventId":this._eventId,
		
		"x":0,
		"y":0,
		"align":DrillUp.g_ET_align,
		"frameVisible":DrillUp.g_ET_frameVisible,
		
		"loop_enabled":false,
		"loop_textTank":[],
		"loop_interval":DrillUp.g_ET_loopInterval,
	}
	this._drill_ET_controller = new Drill_ET_Controller( data );
	
	// > 刷新统计
	$gameTemp._drill_ET_needRestatistics = true;
}
//==============================
// * 事件 - 帧刷新
//==============================
var _drill_ET_c_update = Game_Event.prototype.update;
Game_Event.prototype.update = function(){
	_drill_ET_c_update.call(this);
	if( this._drill_ET_controller != null ){
		this._drill_ET_controller.drill_ET_update();
	}
}



//=============================================================================
// ** 漂浮文字控制器【Drill_ET_Controller】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个专门控制漂浮文字的数据类。
// **					
// **		说明：	> 该类不能单独使用，必须结合 漂浮文字贴图 对象类。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_ET_Controller() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 控制器 - 初始化
//==============================
Drill_ET_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_initData();													//初始化数据
    this.drill_initPrivateData();											//私有数据初始化
	if( data == undefined ){ data = {}; }
    this.drill_ET_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_ET_Controller.prototype.drill_ET_update = function(){
	this.drill_updateVisible();			//帧刷新 - 可见
	this.drill_updatePosition();		//帧刷新 - 位置
	this.drill_updateLoop();			//帧刷新 - 轮播
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> data对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_ET_Controller.prototype.drill_ET_resetData = function( data ){
	this.drill_ET_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_ET_Controller.prototype.drill_ET_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 控制器 - 修改文本【开放函数】
//
//			参数：	> text 字符串（可以为空字符串）
//			返回：	> 无
//##############################
Drill_ET_Controller.prototype.drill_ET_setText = function( text ){
	this._drill_curText = text;
	this.drill_ET_forceRefresh();
};
//##############################
// * 控制器 - 强制刷新文本【开放函数】
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_ET_Controller.prototype.drill_ET_forceRefresh = function(){
	this._drill_refreshSerial = new Date().getTime();	//刷新用序列号
};
//##############################
// * 控制器 - 设置偏移【开放函数】
//
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//##############################
Drill_ET_Controller.prototype.drill_ET_setOffset = function( x, y ){
	var data = this._drill_data;
	data['x'] = x;
	data['y'] = y;
};
//##############################
// * 控制器 - 设置对齐方式【开放函数】
//
//			参数：	> align 字符串（左对齐/居中/右对齐）
//			返回：	> 无
//##############################
Drill_ET_Controller.prototype.drill_ET_setAlign = function( align ){
	var data = this._drill_data;
	data['align'] = align;
};
//##############################
// * 控制器 - 设置外框显示【开放函数】
//
//			参数：	> visible 布尔
//			返回：	> 无
//##############################
Drill_ET_Controller.prototype.drill_ET_setFrameVisible = function( visible ){
	var data = this._drill_data;
	data['frameVisible'] = visible;
};
//##############################
// * 控制器 - 轮播文本开关【开放函数】
//
//			参数：	> enabled 布尔
//			返回：	> 无
//##############################
Drill_ET_Controller.prototype.drill_ET_setLoopEnabled = function( enabled ){
	var data = this._drill_data;
	data['loop_enabled'] = enabled;
}
//##############################
// * 控制器 - 设置轮播文本【开放函数】
//
//			参数：	> text_list 字符串列表
//			返回：	> 无
//##############################
Drill_ET_Controller.prototype.drill_ET_setLoopText = function( text_list ){
	var data = this._drill_data;
	data['loop_textTank'] = text_list;
	if( text_list.length == 0 ){	//（空文本时，不播放）
		data['loop_enabled'] = false;
	}
	this._drill_curLoopTime = 0;
	this._drill_curLoopPos = 0;
};
//##############################
// * 控制器 - 设置轮播间隔【开放函数】
//
//			参数：	> loop_interval 数字
//			返回：	> 无
//##############################
Drill_ET_Controller.prototype.drill_ET_setLoopInterval = function( loop_interval ){
	var data = this._drill_data;
	data['loop_interval'] = loop_interval;
};
//##############################
// * 控制器 - 设置轮播模式【开放函数】
//
//			参数：	> loop_mode 字符串（循环/单次）
//			返回：	> 无
//##############################
Drill_ET_Controller.prototype.drill_ET_setLoopMode = function( loop_mode ){
	var data = this._drill_data;
	data['loop_mode'] = loop_mode;
	this._drill_curLoopTime = 0;
	this._drill_curLoopPos = 0;
};
//##############################
// * 控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_ET_Controller.prototype.drill_initData = function(){
	var data = this._drill_data;
	
	// > 默认值
	if( data['visible'] == undefined ){ data['visible'] = true };				//可见情况
	if( data['eventId'] == undefined ){ data['eventId'] = 0 };					//绑定的事件id
	
	if( data['x'] == undefined ){ data['x'] = 0 };								//偏移x
	if( data['y'] == undefined ){ data['y'] = 0 };								//偏移y
	if( data['align'] == undefined ){ data['align'] = "居中"; };				//对齐方式
	if( data['frameVisible'] == undefined ){ data['frameVisible'] = false; };	//外框显示
	
	if( data['loop_enabled'] == undefined ){ data['loop_enabled'] = false };	//轮播 - 开关（继续/暂停）
	if( data['loop_textTank'] == undefined ){ data['loop_textTank'] = [] };		//轮播 - 文本列表
	if( data['loop_interval'] == undefined ){ data['loop_interval'] = 4 };		//轮播 - 轮播间隔
	if( data['loop_mode'] == undefined ){ data['loop_mode'] = "循环" };			//轮播 - 轮播模式
}
//==============================
// * 初始化 - 私有数据初始化
//==============================
Drill_ET_Controller.prototype.drill_initPrivateData = function(){
	var data = this._drill_data;
	
	// > 检查
	//（暂无）
	
	
	// > 初始化 - 私有变量
	this._drill_x = 0;									//位置X
	this._drill_y = 0;									//位置Y
	this._drill_textOpacity = 0;						//文本透明度
	this._drill_frameOpacity = 0;						//框架透明度
	this._drill_visible = false;						//可见情况
	
	this._drill_curText = "";							//当前文本
	this._drill_curLoopTime = 0;						//当前轮播时间
	this._drill_curLoopPos = 0;							//当前轮播索引位置
	this._drill_refreshSerial = new Date().getTime();	//刷新用序列号
	this._drill_needDestroy = false;					//销毁标记（暂未用到）
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_ET_Controller.prototype.drill_ET_resetData_Private = function( data ){
	
	// > 判断数据重复情况
	if( this._drill_data != undefined ){
		var keys = Object.keys( data );
		var is_same = true;
		for( var i=0; i < keys.length; i++ ){
			var key = keys[i];
			if( this._drill_data[key] != data[key] ){
				is_same = false;
			}
		}
		if( is_same == true ){ return; }
	}
	// > 补充未设置的数据
	var keys = Object.keys( this._drill_data );
	for( var i=0; i < keys.length; i++ ){
		var key = keys[i];
		if( data[key] == undefined ){
			data[key] = this._drill_data[key];
		}
	}
	
	// > 执行重置
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝
    this.drill_initData();									//初始化数据
    this.drill_initPrivateData();							//私有数据初始化
}
//==============================
// * 帧刷新 - 可见
//==============================
Drill_ET_Controller.prototype.drill_updateVisible = function(){
	var data = this._drill_data;
	var ev = $gameMap.event( data['eventId'] );
	if( ev == undefined ){ return; }
	
	// > 控制器隐藏
	if( data['visible'] == false ){
		this._drill_visible = false;
	}
	
	// > 事件被删除时
	if( ev._erased == true ){
		this._drill_visible = false;
	}
	
	// > 事件透明时
	if( ev._transparent == true ){
		this._drill_visible = false;
	}
	
	// > 空文本时
	if( this._drill_curText == "" ){
		this._drill_visible = false;
	}
	
	this._drill_visible = true;
}
//==============================
// * 帧刷新 - 位置
//==============================
Drill_ET_Controller.prototype.drill_updatePosition = function(){
	var data = this._drill_data;
	var ev = $gameMap.event( data['eventId'] );
	if( ev == undefined ){ return; }
	
	// > 位置
	var xx = 0;
	var yy = 0;
	xx += data['x'];
	yy += data['y'];
	this._drill_x = xx;
	this._drill_y = yy;
	
	// > 透明度
	var oo = Number( ev.opacity() );
	this._drill_textOpacity = oo;										//文本透明度
	if( data['frameVisible'] == true && this._drill_curText != "" ){	//框架透明度（空文本时不显示外框）
		this._drill_frameOpacity = oo;
	}else{
		this._drill_frameOpacity = 0;
	}
}
//==============================
// * 帧刷新 - 轮播
//==============================
Drill_ET_Controller.prototype.drill_updateLoop = function(){
	var data = this._drill_data;
	if( data['loop_enabled'] != true ){ return; }
	var ev = $gameMap.event( data['eventId'] );
	if( ev == undefined ){ return; }
		
	// > 时间+1
	this._drill_curLoopTime += 1;
	
	// > 执行轮播
	if( this._drill_curLoopTime % data['loop_interval'] == 0 ){
		
		// > 循环
		var index = this._drill_curLoopPos % data['loop_textTank'].length;
		// > 单次
		if( data['loop_mode'] == "单次" &&
			this._drill_curLoopPos >= data['loop_textTank'].length ){
			index = data['loop_textTank'].length-1;
		}
		this._drill_curText = data['loop_textTank'][ index ];
		this._drill_curLoopPos += 1;
		this.drill_ET_forceRefresh();		//（轮播时强制刷新）
	}
}


//=============================================================================
// ** 漂浮文字贴图【Drill_ET_WindowSprite】
// **
// **		作用域：	地图界面
// **		主功能：	> 定义一个漂浮文字贴图，能够播放自定义文本。
// **
// **		说明：	> 该类不能单独使用，必须结合 漂浮文字控制器 数据类。
//=============================================================================
//==============================
// * 文字贴图 - 定义
//==============================
function Drill_ET_WindowSprite() {
    this.initialize.apply(this, arguments);
};
Drill_ET_WindowSprite.prototype = Object.create(Window_Base.prototype);
Drill_ET_WindowSprite.prototype.constructor = Drill_ET_WindowSprite;
//==============================
// * 文字贴图 - 初始化
//==============================
Drill_ET_WindowSprite.prototype.initialize = function( obj_event ){
	this._drill_event = obj_event;			//事件指针
	this._character = obj_event;			//事件指针（子类用，Drill_X_EventTextFilter、Drill_X_EventTextBackground等）
	this._drill_controller = null;			//控制器对象
	this._drill_refreshSerial = -1;			//刷新用序列号
	this._drill_textWidth = 0;				//文本宽度
	this._drill_textHeight = 0;				//文本高度
	
	// > 初始化
	Window_Base.prototype.initialize.call(this);
	
	// > 主体属性
	this.opacity = 0;
	this.contents.opacity = 255;
}
//==============================
// * 文字贴图 - 帧刷新
//==============================
Drill_ET_WindowSprite.prototype.update = function() {
	if( this.drill_ET_isOptimizationPassed() == false ){ return; }
	Window_Base.prototype.update.call(this);
	this.drill_ET_updateBind();				//帧刷新 - 自动绑定
	if( this._drill_controller == undefined ){ return; }
	this.drill_ET_updateText();				//帧刷新 - 文本变化
	this.drill_ET_updateAttr();				//帧刷新 - 属性变化
}
//##############################
// * 文字贴图 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_ET_WindowSprite.prototype.drill_ET_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * 文字贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> visible 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_ET_WindowSprite.prototype.drill_ET_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 文字贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_ET_WindowSprite.prototype.drill_ET_isOptimizationPassed = function(){
    return this.drill_ET_isOptimizationPassed_Private();
};
//##############################
// * 文字贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> visible 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_ET_WindowSprite.prototype.drill_ET_isNeedDestroy = function(){
	if( this._drill_event == undefined ){ return true; } 
	if( this._drill_event._erased == true ){ return true; } 
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 文字贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_ET_WindowSprite.prototype.drill_ET_destroy = function(){
	this.drill_ET_destroy_Private();
};
//==============================
// * 文字贴图 - 属性
//==============================
Drill_ET_WindowSprite.prototype.standardFontSize = function(){ return DrillUp.g_ET_fontSize; };
Drill_ET_WindowSprite.prototype.standardPadding = function(){ return DrillUp.g_ET_padding; };

//==============================
// * 文字贴图 - 销毁（私有）
//==============================
Drill_ET_WindowSprite.prototype.drill_ET_destroy_Private = function(){
	
	// > 测试
	// （可以去 物体管理层，试试三种删除事件的方法，看看此贴图被删除的提示信息。）
	//alert( "漂浮文字贴图跟随事件"+this._drill_event._eventId+"一并被删除。" );
	
	// > 断开连接
	this._drill_event = null;
	this._character = null;
	this._drill_controller = null;
};
//==============================
// * 帧刷新 - 自动绑定
//==============================
Drill_ET_WindowSprite.prototype.drill_ET_updateBind = function(){
	if( this._drill_event == undefined ){ return; }
	
	// > 自动绑定
	if( this._drill_controller == undefined &&
		this._drill_event._drill_ET_controller != undefined ){
		this.drill_ET_setController( this._drill_event._drill_ET_controller );
	}
}
//==============================
// * 帧刷新 - 文本变化
//==============================
Drill_ET_WindowSprite.prototype.drill_ET_updateText = function() {
	if( this._drill_refreshSerial == this._drill_controller._drill_refreshSerial ){ return; }
	this._drill_refreshSerial = this._drill_controller._drill_refreshSerial;
	
	// > 空文本情况
	var cur_text = this._drill_controller._drill_curText;
	if( cur_text == "" ){
		this.contents.clear();
		return ;
	}
	
	// > 文本转义
	var context_list;
	if( Imported.Drill_CoreOfString ){		//【系统 - 字符串核心】
		context_list = DataManager.drill_COSt_replaceChar( cur_text ).split("\n");
	}else{
		context_list = cur_text.split("\n");
	}
	
	// > 窗口高宽 - 计算
	var options = {};
	this.drill_COWA_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
	// > 窗口高宽 - 赋值
	var ww = 0;
	var hh = 0;
	for( var i=0; i < this.drill_COWA_widthList.length; i++ ){ if( ww < this.drill_COWA_widthList[i] ){ ww = this.drill_COWA_widthList[i]; } }
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){ hh += this.drill_COWA_heightList[i]; }
	ww += this.standardPadding() * 2;
	hh += this.standardPadding() * 2;
	this._drill_textWidth = ww;
	this._drill_textHeight = hh;
	this.width = this._drill_textWidth;			// 窗口宽度
	this.height = this._drill_textHeight;		// 窗口高度
	
	// > 重建bitmap
	this.contents.clear();
	this.createContents();
	
	// > 绘制内容（窗口辅助核心的 标准函数 ）
	this.drill_COWA_drawTextListEx( context_list, options );
}
//==============================
// * 帧刷新 - 属性变化
//==============================
Drill_ET_WindowSprite.prototype.drill_ET_updateAttr = function() {
	var data = this._drill_controller._drill_data;
	
	// > 位置
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	xx += this._drill_event.screenX();
	yy += this._drill_event.screenY() - $gameMap.tileHeight();
	if( data['align'] == "左对齐" ){
		xx += 0 ;
		yy += -0.5 * this.height ;
	}else if( data['align'] == "居中" ){
		xx += -0.5 * this.width ;
		yy += -0.5 * this.height ;
	}else if( data['align'] == "右对齐" ){
		xx += -1.0 * this.width ;
		yy += -0.5 * this.height ;
	}
	this.x = xx;
	this.y = yy;
	
	// > 透明度
	this.opacity = this._drill_controller._drill_frameOpacity;
	this.contentsOpacity = this._drill_controller._drill_textOpacity;
	
	// > 可见
	this.visible = this._drill_controller._drill_visible;
}
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_ET_WindowSprite.prototype.drill_ET_isOptimizationPassed_Private = function(){
	
	// > 镜头范围外时，不工作
	if( this._character == undefined ){
		this.visible = false;
		return false;
	}
	
	// > 镜头范围外时，不工作
	if( this.drill_ET_posIsInCamera( this._character._realX, this._character._realY ) == false ){
		this.visible = false;
		return false;
	}
	return true;
}
DrillUp.g_LCa_alert = true;
//==============================
// * 优化策略 - 判断贴图是否在镜头范围内
//==============================
Drill_ET_WindowSprite.prototype.drill_ET_posIsInCamera = function( realX, realY ){
	var oww = Graphics.boxWidth  / $gameMap.tileWidth();
	var ohh = Graphics.boxHeight / $gameMap.tileHeight();
	var sww = oww;
	var shh = ohh;
	if( Imported.Drill_LayerCamera ){
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LCa_alert == true ){ 
			alert("【Drill_EventText.js 行走图 - 事件漂浮文字】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v1.9及以上版本。");
			DrillUp.g_LCa_alert = false;
		}
		sww = sww / $gameSystem._drill_LCa_controller._drill_scaleX;
		shh = shh / $gameSystem._drill_LCa_controller._drill_scaleY;
	}
	return  Math.abs($gameMap.adjustX(realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventText = false;
		alert(
			"【Drill_EventText.js 行走图 - 事件漂浮文字】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}

