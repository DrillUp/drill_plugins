//=============================================================================
// Drill_MiniPlateForEvent.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        鼠标 - 事件说明窗口
 * @author Drill_up
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_MiniPlateForEvent +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得鼠标靠近事件时，可以显示说明窗口。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用，必须拥有下面插件作为基础，才能运行：
 * 基于：
 *   - Drill_CoreOfInput             系统 - 输入设备核心
 *   - Drill_CoreOfWindowAuxiliary   系统 - 窗口辅助核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件的行走图。
 *   单独对鼠标有效，支持触屏按住。
 * 2.具体内容可以去看看 "14.鼠标 > 关于鼠标悬浮窗口.docx"。
 * 细节：
 *   (1.一个事件只能对应一个鼠标触发窗口方式，设置多个没有效果。
 *   (2.如果说明中没有任何字符，将不显示这个状态的说明内容。
 *   (3.写了一个"=>事件说明窗口"后，后面可以跟非常多的"=:"内容。
 *   (4.你可以设置"附加宽度高度"来适应可能会被遮住的文字。
 * 刷新：
 *   (1.插件不会主动刷新内容。
 *   (2.如果你想改变事件的内容信息，首先需要改变第二页的事件注释，
 *      并且，你需要确保第一页和第二页的行走图不同即可。
 *      只改变行走图朝向不会刷新。
 *   (3.你也可以使用插件指令强制刷新。
 *      但是注意，强制刷新时，如果事件所处的事件页没有写注释，则没有任何效果。
 * 触发：
 *   (1.接触显示说明窗口的触发范围与行走图资源大小相关。
 *      同一张行走图情况下，考虑到优化，鼠标范围默认不刷新。所以需要换图来触发刷新。
 * 设计：
 *   (1.由于该窗口的大小是变化的，所以布局可以设定四种。
 *      如果是触屏情况，建议将说明窗口锁定在一个固定位置，方便查看信息。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/system
 * 先确保项目img文件夹下是否有system文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-自定义窗口皮肤
 * 资源-自定义背景图片
 *
 * 系统窗口与rmmv默认的window.png图片一样，可设置为不同的皮肤。
 * 图片布局不能根据窗口内容自适应，你需要合理控制的设置的说明文字。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令手动控制类型情况：
 * （第一个冒号两边都有一个空格，=:后面的文字表示一行的内容。）
 * 
 * 事件注释：=>事件说明窗口 : 鼠标接近 : 显示下列说明
 *           =:第一行内容
 *           =:第二行内容
 * 事件注释：=>事件说明窗口 : 鼠标左键按下[持续] : 显示下列说明
 * 事件注释：=>事件说明窗口 : 鼠标滚轮按下[持续] : 显示下列说明
 * 事件注释：=>事件说明窗口 : 鼠标右键按下[持续] : 显示下列说明
 * 事件注释：=>事件说明窗口 : 触屏按下[持续] : 显示下列说明
 *
 * 注意，一条注释最多能填入六行，如果你要设置更多内容，多加几个注释即可。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令，临时显示/隐藏窗口设置。
 * （注意，冒号后面有两个空格。）
 *
 * 插件指令：>事件说明窗口 : 本事件 : 隐藏说明
 * 插件指令：>事件说明窗口 : 本事件 : 显示说明
 * 插件指令：>事件说明窗口 : 本事件 : 强制刷新说明
 * 插件指令：>事件说明窗口 : 事件[2] : 隐藏说明
 * 插件指令：>事件说明窗口 : 事件[3] : 显示说明
 * 插件指令：>事件说明窗口 : 事件[3] : 强制刷新说明
 * 
 * 1.数字对应的事件的id。
 *   隐藏是暂时性的，切换了地图或者改变了事件的图像，就会失效。
 * 2.使用"强制刷新说明"时，事件所处的事件页没有写注释，则没有任何效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口属性
 * 你可以修改设置说明窗口的部分属性：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>事件说明窗口 : 修改附加宽高 : 宽度[100]
 * 插件指令：>事件说明窗口 : 修改附加宽高 : 高度[100]
 * 
 * 1.由于该窗口在场景中只有一个，因此相关属性修改后是永久有效的。
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
 * 时间复杂度： o(n^2) + o(图像处理) 每帧
 * 测试方法：   指定地图中放置10个带有说明窗口的事件，测试触发情况。
 * 测试结果：   200个事件的地图中，平均消耗为：【32.18ms】
 *              100个事件的地图中，平均消耗为：【30.09ms】
 *               50个事件的地图中，平均消耗为：【22.95ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.目前并没有设置大量含说明窗口的事件进行测试。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了附加宽度附加高度设置。
 * [v1.2]
 * 优化了窗口层级的位置。
 * [v1.3]
 * 分离了核心，优化了插件性能。添加了锁定功能。
 * [v1.4]
 * 修改了内部结构，添加了强制刷新插件指令。
 * [v1.5]
 * 优化了内部整体结构，添加了地图层级的设置。添加了窗口中心锚点的设置。
 * 
 * 
 * 
 * @param ---窗口---
 * @default 
 *
 * @param 布局模式
 * @parent ---窗口---
 * @type select
 * @option 默认窗口皮肤
 * @value 默认窗口皮肤
 * @option 自定义窗口皮肤
 * @value 自定义窗口皮肤
 * @option 自定义背景图片
 * @value 自定义背景图片
 * @option 黑底背景
 * @value 黑底背景
 * @desc 窗口背景布局的模式。
 * @default 黑底背景
 *
 * @param 布局透明度
 * @parent 布局模式
 * @type number
 * @min 0
 * @max 255
 * @desc 布局的透明度，0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 资源-自定义窗口皮肤
 * @parent 布局模式
 * @desc 配置该资源，可以使得该窗口有与默认不同的系统窗口。
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 资源-自定义背景图片
 * @parent 布局模式
 * @desc 背景图片布局的资源。
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param 平移-自定义背景图片 X
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-自定义背景图片 Y
 * @parent 布局模式
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 窗口中心锚点
 * @parent ---窗口---
 * @type select
 * @option 左上角
 * @value 左上角
 * @option 右上角
 * @value 右上角
 * @option 正中心
 * @value 正中心
 * @option 左下角
 * @value 左下角
 * @option 右下角
 * @value 右下角
 * @desc 窗口追随鼠标时，中心锚点的位置。
 * @default 左上角
 *
 * @param 是否锁定窗口位置
 * @parent ---窗口---
 * @type boolean
 * @on 锁定
 * @off 关闭
 * @desc true - 锁定，false - 关闭，将面板锁定在一个固定的地方，而不是跟随鼠标位置走。
 * @default false
 *
 * @param 平移-锁定位置 X
 * @parent 是否锁定窗口位置
 * @desc 将面板锁定在一个固定的地方，而不是跟随鼠标位置走。x轴方向平移，单位像素，0为贴在最左边。
 * @default 0
 *
 * @param 平移-锁定位置 Y
 * @parent 是否锁定窗口位置
 * @desc 将面板锁定在一个固定的地方，而不是跟随鼠标位置走。y轴方向平移，单位像素，0为贴在最上面。
 * @default 0
 *
 * @param 窗口行间距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容之间的行间距。（rmmv默认标准：36）
 * @default 10
 *
 * @param 窗口内边距
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口内容与窗口外框的内边距。（rmmv默认标准：18）
 * @default 10
 *
 * @param 窗口字体大小
 * @parent ---窗口---
 * @type number
 * @min 1
 * @desc 窗口的字体大小。注意图标无法根据字体大小变化。（rmmv默认标准：28）
 * @default 22
 *
 * @param 窗口附加宽度
 * @parent ---窗口---
 * @desc 在当前自适应的基础上，再额外增加的宽度。可为负数。
 * @default 0
 *
 * @param 窗口附加高度
 * @parent ---窗口---
 * @desc 在当前自适应的基础上，再额外增加的高度。可为负数。
 * @default 0
 *
 * @param 地图层级
 * @parent ---窗口---
 * @type select
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 窗口所在的地图层级位置，你需要以此来考虑分配ui遮挡关系。
 * @default 图片层
 *
 * @param 图片层级
 * @parent ---窗口---
 * @type number
 * @min 0
 * @desc 窗口在同一个地图层，先后排序的位置，0表示最后面。
 * @default 90
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		MPFE (Mini_Plate_For_Event)
//		临时全局变量	DrillUp.g_MPFE_xxx
//		临时局部变量	this._drill_MPFE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2) + o(图像处理) 每帧
//		性能测试因素	鼠标乱晃
//		性能测试消耗	30.09ms  39.97ms（update函数，在镜像Drill_Sprite_LRR中）
//		最坏情况		当前视角，存在大批说明窗口的事件，并且玩家的鼠标乱晃。
//						（该插件目前没有对最坏情况进行实测。）
//
//插件记录：
//		★大体框架与功能如下：
//			事件说明窗口：
//				->说明面板
//					->类定义
//					->内容
//						> 事件中的注释文本
//					->判定项
//						> 鼠标移走则重刷
//						> 文本变化则重刷
//						> 事件id变化则重刷
//				->鼠标事件
//				
//		
//		★必要注意事项：
//			1.鼠标悬浮窗口目前已经固定了一套框架，你可以找到其他的 MiniPlateXXX 插件，看看私有类的定义。
//			  通过 drill_pushChecks 判定项 帧刷新，来控制面板显示的内容。
//
//		★其它说明细节：
//			1.该插件原理为 鼠标触发事件 和 状态和buff说明窗口 的组合效果。
//			  实际上结合后，改动非常大，结构已经截然不同了。
//			2.地图界面最容易造成卡顿问题，稍不注意，计算量就暴涨，一定要加约束。
//			  （窗口的宽高不要轻易修改，每次修改都会重画）
//			3.	2020/9/13：
//				这个插件给我的印象一点都不好，糟透了。刷新文本非常困难。
//				由于之前加锁加的太死了，结构环环相扣，修改内容后，仍然不变，就很头疼。
//				从原理上，这里分成了三个管理体系：
//					窗口与鼠标（难点在鼠标悬停、鼠标离开）
//					事件页与文本内容（难点在文本变化时机、行走图变化时机）
//					事件贴图触发范围（难点在获取事件的位置、贴图触发区）
//				这三个结构纠缠在一起，难以分离。
//				并且，我还没有找到很好的方法将它们独立开来。
//				可能还需要花时间建立 特殊的核心 或 对象捕获体系。
//			4.	2021/7/13：
//				我没有大改代码，我只整理了大体结构。
//				现在这一套框架，已经可以相对轻松地复制到其他各个界面并形成新插件了。
//				现在的我已经没有插件初期开荒的记忆，并开始对曾经的自己感到疑惑，为什么当时的我会那么困难？那么纠结？
//				也许是这样的：从0到1难，从1到2易。
//				
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MiniPlateForEvent = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MiniPlateForEvent');
	
	
	/*----------------窗口---------------*/
	DrillUp.g_MPFE_layout_type = String(DrillUp.parameters["布局模式"] || "黑底背景");
	DrillUp.g_MPFE_layout_opacity = Number(DrillUp.parameters["布局透明度"] || 255);
	DrillUp.g_MPFE_layout_sys_src = String(DrillUp.parameters["资源-自定义窗口皮肤"] || "");
	DrillUp.g_MPFE_layout_pic_src = String(DrillUp.parameters["资源-自定义背景图片"] || "");
	DrillUp.g_MPFE_layout_pic_x = Number(DrillUp.parameters["平移-自定义背景图片 X"] || 0 );
	DrillUp.g_MPFE_layout_pic_y = Number(DrillUp.parameters["平移-自定义背景图片 Y"] || 0 );
	DrillUp.g_MPFE_anchor = String(DrillUp.parameters["窗口中心锚点"] || "左上角" );
	DrillUp.g_MPFE_lock_enable = String(DrillUp.parameters["是否锁定窗口位置"] || "false") === "true";
	DrillUp.g_MPFE_lock_x = Number(DrillUp.parameters["平移-锁定位置 X"] || 0);
	DrillUp.g_MPFE_lock_y = Number(DrillUp.parameters["平移-锁定位置 Y"] || 0);
	DrillUp.g_MPFE_lineheight = Number(DrillUp.parameters["窗口行间距"] || 10);
	DrillUp.g_MPFE_padding = Number(DrillUp.parameters["窗口内边距"] || 18);
	DrillUp.g_MPFE_fontsize = Number(DrillUp.parameters["窗口字体大小"] || 22);
	DrillUp.g_MPFE_ex_width = Number(DrillUp.parameters["窗口附加宽度"] || 0);
	DrillUp.g_MPFE_ex_height = Number(DrillUp.parameters["窗口附加高度"] || 0);
	DrillUp.g_MPFE_layer = String(DrillUp.parameters["地图层级"] || "图片层");
	DrillUp.g_MPFE_zIndex = Number(DrillUp.parameters["图片层级"] || 0);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfWindowAuxiliary ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_MPFE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MPFE_pluginCommand.call(this, command, args);
	if( command === ">事件说明窗口" ){		// >事件说明窗口 : A : 隐藏说明
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "隐藏说明" ){ 
				var e_id = 0;
				if( temp1 == "本事件" ){ 
					e_id = this._eventId;
				}else if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					e_id = Number(temp1);
				}else{
					e_id = Number(temp1);
				}
				if( $gameMap.drill_MPFE_isEventExist( e_id ) == false ){ return; }
				$gameMap.drill_MPFE_setDataVisible( e_id , false );
			}
			if( type == "显示说明" ){
				var e_id = 0;
				if( temp1 == "本事件" ){ 
					e_id = this._eventId;
				}else if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					e_id = Number(temp1);
				}else{
					e_id = Number(temp1);
				}
				if( $gameMap.drill_MPFE_isEventExist( e_id ) == false ){ return; }
				$gameMap.drill_MPFE_setDataVisible( e_id , true );
			}
			if( type == "强制刷新说明" ){
				var e_id = 0;
				if( temp1 == "本事件" ){ 
					e_id = this._eventId;
				}else if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					e_id = Number(temp1);
				}else{
					e_id = Number(temp1);
				}
				if( $gameMap.drill_MPFE_isEventExist( e_id ) == false ){ return; }
				$gameMap.event( e_id )._drill_MPFE_eventNeedRefresh = true;
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改附加宽高" ){ 
				
				if( temp1.indexOf("宽度[") != -1 ){
					temp1 = temp1.replace("宽度[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFE_ex_width = Number(temp1);
				}
				if( temp1.indexOf("高度[") != -1 ){
					temp1 = temp1.replace("高度[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_MPFE_ex_height = Number(temp1);
				}
				
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_MPFE_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_MiniPlateForEvent.js 鼠标 - 事件说明窗口】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
}


//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_MPFE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MPFE_sys_initialize.call(this);
	
	this._drill_MPFE_ex_width = DrillUp.g_MPFE_ex_width;		//（附加高宽）
	this._drill_MPFE_ex_height = DrillUp.g_MPFE_ex_height; 
};	

//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_MPFE_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}

//=============================================================================
// ** 事件贴图
//=============================================================================
//==============================
// * 事件贴图 - 初始化
//==============================
//var _drill_MPFE_setCharacter = Sprite_Character.prototype.setCharacter;
//Sprite_Character.prototype.setCharacter = function( character ){		//图像改变，范围就改变
//	_drill_MPFE_setCharacter.call(this,character);
//    this.drill_MPFE_refreshTrigger();
//};
//==============================
// * 事件贴图 - 刷新内容
//==============================
Sprite_Character.prototype.drill_MPFE_refreshTrigger = function() {
	if(!this._character ){ return; }
	if( this._character.constructor.name !== "Game_Event" ){ return; }
	var page = this._character.page();
	if(!page ){ return; }
	var temp_list = this._character.list();
	
	var temp_context = [];
	var start_count = false;	//多行注释索引
	var type = "";
	for(var i=0; i < temp_list.length; i++){
		var l = temp_list[i];
		if( l.code === 108 || l.code === 408 ){
			var row = l.parameters[0];
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>事件说明窗口" ){	//=>事件说明窗口 : 鼠标滚轮按下[持续] : 显示下列说明 =:xxxx =:xxx
				if(args.length >= 2){
					if(args[1]){ type = String(args[1]); }
					if(args[3]){ var temp1 = String(args[3]); }
					if( temp1 == "显示下列说明" ){
						start_count = true;
						continue;
					}
				}
			};
			if( start_count == true ){
				if(row.contains("=:")){
					temp_context.push(row.replace("=:",""));
				}else{
					start_count = false;
				}
			}
		};
	};
	if( temp_context.length != 0 ){		//添加多条内容
		var obj = {};
		obj._event_id = this._character._eventId;	//只能存数据，不能存对象指针
		obj._event_pageIndex = this._character._pageIndex;
		obj._type = type;
		obj._context = temp_context;
		obj._enable = true;
		$gameMap.drill_MPFE_pushData(obj);
	}
};
//==============================
// * 事件贴图 - 刷新内容
//==============================
var _drill_MPFE_spriteUpdate = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	
	// > 镜像情况时，直接跳过
	if( $gameTemp.drill_MPFE_isReflectionSprite(this) ){
		_drill_MPFE_spriteUpdate.call(this);
		return;
	}
	
	// > 切换图片时变化
    if( this.isImageChanged() ){
		this.drill_MPFE_refreshTrigger();
	}
	
	// > 原函数
	_drill_MPFE_spriteUpdate.call( this );
	
	// > 强制刷新
	if(!this._character ){ return; }
	if( this._character.constructor.name !== "Game_Event" ){ return; }
	if( this._character._drill_MPFE_eventNeedRefresh == true ){
		this._character._drill_MPFE_eventNeedRefresh = false;
		this.drill_MPFE_refreshTrigger();
	}
}


//=============================================================================
// ** 数据刷新
//=============================================================================
//==============================
// * 地图 - 初始化
//==============================
var _drill_MPFE_gmap_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {	
	_drill_MPFE_gmap_initialize.call(this);
	this._drill_MPFE_data = [];
};
//==============================
// * 地图 - 切换地图
//==============================
var _drill_MPFE_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_MPFE_gmap_setup.call(this,mapId);
	this._drill_MPFE_data = [];
}
//==============================
// * 地图 - 添加条件
//==============================
Game_Map.prototype.drill_MPFE_pushData = function( obj ){	
	for(var i=0; i<this._drill_MPFE_data.length; i++){
		var temp_obj = this._drill_MPFE_data[i];
		if( temp_obj._event_id == obj._event_id &&
			temp_obj._type == obj._type ){
			
			// > 重复的不插入
			if( temp_obj._event_pageIndex == obj._event_pageIndex ){ return ;}
			
			// > 事件页不同的，覆盖
			this._drill_MPFE_data[i] = obj;
			
			return;
		}
	}
	this._drill_MPFE_data.push(obj);
};
//==============================
// * 地图 - 去除条件
//==============================
Game_Map.prototype.drill_MPFE_setDataVisible = function(event_id,v) {	
	
	for(var i = this._drill_MPFE_data.length-1; i >= 0; i--){
		var temp_obj = this._drill_MPFE_data[i];
		if( temp_obj._event_id == event_id ){
			temp_obj._enable = v;
		}
	}
}


//=============================================================================
// ** 数据绑定
//=============================================================================
//==============================
// * 绑定 - 帧刷新
//==============================
var _drill_MPFE_smap_update = Scene_Map.prototype.updateScene;
Scene_Map.prototype.updateScene = function() {	
	_drill_MPFE_smap_update.call(this);
	this._drill_MPFE_updateMiniPlate();
}
//==============================
// * 帧刷新 - 根据所有事件添加 判断项
//==============================
Scene_Map.prototype._drill_MPFE_updateMiniPlate = function() {	

	// > 从地图贴图找起 >> 找到含event的Sprite_Character >> 刷新事件的注释
	var char_sprites = this._spriteset._characterSprites;
	for(var i=0; i< char_sprites.length; i++){
		var temp_sprite = char_sprites[i];
		if( temp_sprite == undefined ){ continue; }
		if( $gameTemp.drill_MPFE_isReflectionSprite(temp_sprite) ){ continue; }		//（跳过镜像情况）
		var temp_character = temp_sprite._character;
		if( temp_character == undefined ){ continue; }
		if( temp_character.constructor.name !== "Game_Event" ){ continue; }
		
		for( var j = 0; j< $gameMap._drill_MPFE_data.length; j++ ){
			var temp_obj = $gameMap._drill_MPFE_data[j];
			if( temp_character._eventId == temp_obj._event_id ){
				
				//刷新事件注释不需要找父类，因为这个函数就在Scene_Map中
				var cw = temp_sprite.patternWidth() ;
				var ch = temp_sprite.patternHeight() ;
				var check = {
					'x': temp_sprite.x - cw*temp_sprite.anchor.x,
					'y': temp_sprite.y - ch*temp_sprite.anchor.y,
					'w': cw,
					'h': ch,
					'str': temp_obj._context,	
					'id': temp_character._eventId,
					'mouseType': temp_obj._type,
					'enable': temp_obj._enable
				}
				
				this._drill_MPFE_window.drill_pushChecks(check);
			}
		}
	}
};


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_MPFE_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_MPFE_layer_createDestination.call(this);	//rmmv鼠标目的地 < 上层 < rmmv天气
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 图片层
//==============================
var _drill_MPFE_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_MPFE_layer_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// ** 最顶层
//==============================
var _drill_MPFE_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MPFE_layer_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Map.prototype.drill_MPFE_sortByZIndex = function() {
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 创建面板
//==============================
var _drill_MPFE_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MPFE_map_createAllWindows.call(this);
	
	if(!this._drill_MPFE_window ){		//只建立一个窗口
		this._drill_MPFE_window = new Drill_MPFE_Window();
		
		this._drill_MPFE_window.zIndex = DrillUp.g_MPFE_zIndex;
		if( DrillUp.g_MPFE_layer == '上层' ){
			this._spriteset._drill_mapUpArea.addChild( this._drill_MPFE_window );
		}
		if( DrillUp.g_MPFE_layer == '图片层' ){
			this._spriteset._drill_mapPicArea.addChild( this._drill_MPFE_window );
		}
		if( DrillUp.g_MPFE_layer == '最顶层' ){
			this._drill_SenceTopArea.addChild( this._drill_MPFE_window );
		}
		this.drill_MPFE_sortByZIndex();
	}
};
	
	
//=============================================================================
// ** 说明面板【Drill_MPFE_Window】
//			
//			索引：	无
//			来源：	继承于Window_Base
//			实例：	Scene_Map下的 _drill_MPFE_window 成员
//			应用：	暂无 
//			
//			作用域：	地图界面
//			主功能：	定义一个面板，能随时改变内容和高宽，用于描述事件内置信息。
//			子功能：
//						->贴图内容
//							->文本层
//							->背景
//								> 默认窗口皮肤
//								> 自定义窗口皮肤
//								> 自定义背景图片
//								> 黑底背景
//						->位置
//							> 锁定位置
//							> 跟随鼠标位置
//						->显现时机
//							->激活
//							->显示条件
//							->刷新内容
//				
//			说明：	> 整个场景只有一个该窗口。
//					> 其它相似的可变窗口插件： Drill_MiniPlateForState、Drill_X_SceneShopDiscount。
//=============================================================================
//==============================
// * 说明面板 - 定义
//==============================
function Drill_MPFE_Window() {
    this.initialize.apply(this, arguments);
};
Drill_MPFE_Window.prototype = Object.create(Window_Base.prototype);
Drill_MPFE_Window.prototype.constructor = Drill_MPFE_Window;
//==============================
// * 说明面板 - 初始化
//==============================
Drill_MPFE_Window.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	this._drill_data = {};
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 说明面板 - 帧刷新
//==============================
Drill_MPFE_Window.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	
	this.drill_updateChecks();			//帧刷新 - 判断条件
	this.drill_updatePosition();		//帧刷新 - 位置
}
//==============================
// * 说明面板 - 窗口属性
//==============================
Drill_MPFE_Window.prototype.lineHeight = function(){ return DrillUp.g_MPFE_lineheight; };			//窗口行间距
Drill_MPFE_Window.prototype.standardPadding = function(){ return DrillUp.g_MPFE_padding; };		//窗口内边距
Drill_MPFE_Window.prototype.standardFontSize = function(){ return DrillUp.g_MPFE_fontsize; };		//窗口字体大小
//==============================
// * 初始化 - 数据
//==============================
Drill_MPFE_Window.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > 皮肤设置
	data['window_type'] = DrillUp.g_MPFE_layout_type;
	data['window_opacity'] = DrillUp.g_MPFE_layout_opacity;
	data['window_sys_bitmap'] = ImageManager.loadSystem( DrillUp.g_MPFE_layout_sys_src );
	data['window_pic_bitmap'] = ImageManager.loadSystem( DrillUp.g_MPFE_layout_pic_src );
	data['window_pic_x'] = DrillUp.g_MPFE_layout_pic_x;
	data['window_pic_y'] = DrillUp.g_MPFE_layout_pic_y;
	
	// > 私有属性初始化
	this._drill_width = 0;
	this._drill_height = 0;
	this._drill_visible = false;
	
	this._drill_check_tank = [];		//条件缓冲器（帧刷新会不断加入，窗口内会去重复）
	this._drill_curEventId = 0;			//当前指向事件
	this._drill_curContext = null;		//当前指向内容（传的是指针）
	
	this._drill_anchor_x = 0;			//中心锚点x
	this._drill_anchor_y = 0;			//中心锚点y
	if( DrillUp.g_MPFE_anchor == "右上角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 0.0; }
	if( DrillUp.g_MPFE_anchor == "正中心" ){ this._drill_anchor_x = 0.5; this._drill_anchor_y = 0.5; }
	if( DrillUp.g_MPFE_anchor == "左下角" ){ this._drill_anchor_x = 0.0; this._drill_anchor_y = 1.0; }
	if( DrillUp.g_MPFE_anchor == "右下角" ){ this._drill_anchor_x = 1.0; this._drill_anchor_y = 1.0; }
}
//==============================
// * 初始化 - 对象
//==============================
Drill_MPFE_Window.prototype.drill_initSprite = function() {
	this.drill_createBackground();		//创建背景
	this.drill_sortBottomByZIndex();	//底层层级排序
	
	// > 窗口属性
	this.createContents();
    this.contents.clear();
}
//==============================
// * 创建 - 背景
//==============================
Drill_MPFE_Window.prototype.drill_createBackground = function() {
	var data = this._drill_data;
	this._drill_background = new Sprite();
	
	// > 图层顺序处理
	this._drill_background.zIndex = 1;
	this._windowBackSprite.zIndex = 2;
	this._windowFrameSprite.zIndex = 3;
	
	// > 信息框布局
	if( data['window_type'] == "默认窗口皮肤" || data['window_type'] == "默认窗口布局" ){
		
		// > 透明度
		this.opacity = data['window_opacity'];
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = data['window_opacity'];
		this._windowFrameSprite.opacity = data['window_opacity'];
		
		
	}else if( data['window_type'] == "自定义窗口皮肤" || data['window_type'] == "系统窗口布局" ){
		
		// > 皮肤设置
		this.windowskin = data['window_sys_bitmap'];
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = data['window_opacity'];
		this._windowFrameSprite.opacity = data['window_opacity'];
		
		
	}else if( data['window_type'] == "自定义背景图片" || data['window_type'] == "图片窗口布局" ){
		
		// > bimap建立
		this._drill_background.bitmap = data['window_pic_bitmap'];
		this._drill_background.x = data['window_pic_x'];
		this._drill_background.y = data['window_pic_y'];
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
		
		
	}else if( data['window_type'] == "黑底背景" || data['window_type'] == "黑底布局" ){
		
		// > bimap建立
		//（需延迟设置，见后面）
		
		// > 透明度
		this._drill_background.opacity = data['window_opacity'];
		this._windowBackSprite.opacity = 0;
		this._windowFrameSprite.opacity = 0;
	}
	
	this._windowSpriteContainer.addChild(this._drill_background);	//（ _windowSpriteContainer 为窗口的最底层贴图）
}
//==============================
// ** 底层层级排序
//==============================
Drill_MPFE_Window.prototype.drill_sortBottomByZIndex = function() {
   this._windowSpriteContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};


//==============================
// * 帧刷新 - 位置
//==============================
Drill_MPFE_Window.prototype.drill_updatePosition = function() {
	var data = this._drill_data;
	
	// > 锁定位置
	if( DrillUp.g_MPFE_lock_enable == true ){
		this.x = DrillUp.g_MPFE_lock_x;
		this.y = DrillUp.g_MPFE_lock_y;
		return;
	}
	
	// > 跟随鼠标位置
	var cal_x = _drill_mouse_x;
	var cal_y = _drill_mouse_y;
	cal_x -= this._drill_width * this._drill_anchor_x;
	cal_y -= this._drill_height * this._drill_anchor_y;
	if( cal_x < 0 ){	//（横向贴边控制）
		cal_x = 0;
	}
	if( cal_x + this._drill_width > Graphics.boxWidth ){
		cal_x = Graphics.boxWidth - this._drill_width;
	}
	if( cal_y < 0 ){	//（纵向贴边控制）
		cal_y = 0;
	}
	if( cal_y + this._drill_height > Graphics.boxHeight ){
		cal_y = Graphics.boxHeight - this._drill_height;
	}
	this.x = cal_x;
	this.y = cal_y;
}
//==============================
// * 接口 - 添加内容 判断项
//
//			参数：	c['x']: 触发范围坐标X
//					c['y']: 触发范围坐标Y
//					c['w']: 触发范围宽
//					c['h']: 触发范围高
//					c['mouseType']: 激活方式（鼠标接近 / 鼠标左键按下[持续] / …… ）
//					c['str']: 文本	
//					c['id']: 事件id
//					c['enable']: 是否显示
//==============================
Drill_MPFE_Window.prototype.drill_pushChecks = function( c ){
	if( this._drill_check_tank.length < 1000){	//防止卡顿造成的过度积压
		this._drill_check_tank.push(c);
	}
}
//==============================
// * 帧刷新 - 判断条件
//==============================
Drill_MPFE_Window.prototype.drill_updateChecks = function() {
	if( !this._drill_check_tank ){ this.visible = false; return; }
	
	// > 捕获 判断项
	var is_visible = false;
	var check_obj = null;
	for(var i=0; i< this._drill_check_tank.length; i++){
		var check = this._drill_check_tank[i];
		
		if ( this.drill_checkCondition(check) ) { 
			is_visible = true; 
			check_obj = check; 
			break; 
		}
	}
	this._drill_check_tank = [];
	
	// > 根据 判断项 显示/隐藏
	//		（这里有三道锁，看起来会比较乱）
	//		（check.enable显示/隐藏 锁 ，this._drill_visible 接近/离开 锁，this._drill_curEventId 落在不同事件上的锁）
	if( check_obj && check_obj.enable == true ){	
		if ( this._drill_visible == true ) {
			if( is_visible == true ){
				// > 显示中
				if( this._drill_curEventId != check_obj.id ||
					this._drill_curContext != check_obj.str ){	//（id或文本变化，则重刷）
					this._drill_curEventId = check_obj.id;
					this._drill_curContext = check_obj.str;
					this.drill_refreshMessage(check_obj.str);
				}
			}else{
				// > 显示中断时
				this._drill_visible = false;
				this._drill_width = 0;
				this._drill_height = 0;
			}
		}else{
			if( is_visible == true ){
				// > 激活显示时
				//this.drill_refreshMessage(check_obj.str);
				//this._drill_curEventId = check_obj.id ;
				this._drill_visible = true;
			}else{
				// > 隐藏中，不操作
			}
		}
	}else{
		this._drill_visible = false;
	}
	
	//（宽高不要在update中轻易修改）
	this.visible = this._drill_visible;
}
//==============================
// * 激活 - 显示条件
//==============================
Drill_MPFE_Window.prototype.drill_checkCondition = function( check ){
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if( check['mouseType'] == "触屏按下[持续]" ){
		var _x = TouchInput.x;
		var _y = TouchInput.y;
	}
	if( _x > check['x'] + check['w'] ){ return false;}
	if( _x < check['x'] + 0 ){ return false;}
	if( _y > check['y'] + check['h'] ){ return false;}
	if( _y < check['y'] + 0 ){ return false;}
	if( check['mouseType'] == "鼠标左键按下[持续]" ){
		if( TouchInput.drill_isLeftPressed() ){ return true; }else{ return false; }
	}else if( check['mouseType'] == "鼠标滚轮按下[持续]" ){
		if( TouchInput.drill_isMiddlePressed() ){ return true; }else{ return false; }
	}else if( check['mouseType'] == "鼠标右键按下[持续]" ){
		if( TouchInput.drill_isRightPressed() ){ return true; }else{ return false; }
	}else if( check['mouseType'] == "触屏按下[持续]" ){
		if( TouchInput.isPressed() ){ return true; }else{ return false; }
	}
	return true;
}

//==============================
// * 激活 - 刷新内容
//==============================
Drill_MPFE_Window.prototype.drill_refreshMessage = function( context_list ){
	var data = this._drill_data;
	if( context_list.length == 0 ){ return; }
	
	////1.内容获取
	//var tar_width = 0;
	//
	////2.长度判定（必须在绘制前）
	//for (var i=0; i< context_list.length; i++) {
	//	var ic = 0;		//icon字符大小
	//	var temp = context_list[i];	
	//	var temp_s = temp.concat();
	//	temp_s = temp_s.replace(/\\C\[\d+\]/gi,'');
	//	temp_s = temp_s.replace(/\\I\[\d+\]/gi,function(){
	//		ic+=1;
	//		return '';
	//	}.bind(this));
	//	var temp_w = this.textWidth(temp_s) + ic * (this.standardFontSize() + 8);
	//	if( temp_w > tar_width ){
	//		tar_width = temp_w;
	//	}
	//}
	//this._drill_width = tar_width;
	//this._drill_height = context_list.length * ( this.standardFontSize() + DrillUp.g_MPFE_lineheight);
	//this._drill_width += this.standardPadding() * 2;
	//this._drill_height += this.standardPadding() * 2;
	//this._drill_width += DrillUp.g_MPFE_ex_width;
	//this._drill_height += DrillUp.g_MPFE_ex_height;
	//if( context_list.length == 0){	
	//	this._drill_width = 0;
	//	this._drill_height = 0;
	//}
	//this.width = this._drill_width;
	//this.height = this._drill_height;
	//
	////3.绘制内容
	//this.createContents();
    //this.contents.clear();
	//for (var i=0; i< context_list.length; i++) {
	//	var x = 0;
	//	var y = 0 + i*( this.standardFontSize() + DrillUp.g_MPFE_lineheight);
	//	
	//	var temp = context_list[i];	
	//	this.drawTextEx(temp,x,y);
	//}
	////if(context_list.length >= 1){
	////	alert(context_list);
	////	alert(this._drill_width);
	////	alert(this._drill_height);
	////}
	
	
	// > 窗口高宽 - 计算
	var options = {};
	options['convertEnabled'] = false;
	options['autoLineheight'] = true;
	options['lineheight'] = data['window_lineheight'];
	this.drill_COWA_DTLE_calculateHeightAndWidth( context_list, options );		//（窗口辅助核心）
	// > 窗口高宽 - 赋值
	var ww = 0;
	var hh = 0;
	for( var i=0; i < this.drill_COWA_widthList.length; i++ ){ if( ww < this.drill_COWA_widthList[i] ){ ww = this.drill_COWA_widthList[i]; } }
	for( var i=0; i < this.drill_COWA_heightList.length; i++ ){ hh += this.drill_COWA_heightList[i]; }
	ww += this.standardPadding() * 2;
	hh += this.standardPadding() * 2;
	ww += $gameSystem._drill_MPFE_ex_width || 0;		//（附加高宽）
	hh += $gameSystem._drill_MPFE_ex_height || 0;
	this._drill_width = ww;
	this._drill_height = hh;
	this.width = this._drill_width;
	this.height = this._drill_height;
	
	
	// > 绘制内容
	this.drill_COWA_drawTextListEx( context_list, options );
	
	
	if( data['window_type'] == "黑底背景" ){
		this._drill_background_BlackBitmap = new Bitmap(this._drill_width, this._drill_height);
		this._drill_background_BlackBitmap.fillRect(0, 0 , this._drill_width, this._drill_height, "#000000");	//（背景黑框）
		this._drill_background.bitmap = this._drill_background_BlackBitmap;
	}
	
}
	
	
//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MiniPlateForEvent = false;
		alert(
			"【Drill_MiniPlateForEvent.js 鼠标 - 事件说明窗口】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfInput 系统-输入设备核心"+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}


