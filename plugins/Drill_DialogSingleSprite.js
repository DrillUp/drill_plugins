//=============================================================================
// Drill_DialogSingleSprite.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        对话框 - 简易对话图
 * @author Drill_up
 * 
 * @Drill_LE_param "对话图-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DSS_pics_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogSingleSprite +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将单张图片作为对话显示。
 * ★★必须放在 窗口字符-窗口字符核心 插件后面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于最顶层。
 * 细节：
 *   (1.贴图固定放在最顶层。
 *   (2.对话框可以阻塞流程进度。使得玩家必须点击确定才能继续。
 *      对话图与对话框阻塞原理一样，必须点击确定才能往下下一步指令。
 *   (3.根据流程阻塞关系，对话框和对话图不会同时存在，也无法同时存在。
 * 设计：
 *   (1.该插件一般用于 地图界面 或者 战斗界面 的简易教程图示。
 *      必须按确定键才能进入下一步，这样能够引起玩家注意。
 *   (2.插件的功能完全可以用纯事件做：
 *      先控制显示图片，再播放一个隐形对话框（背景透明+空内容），效果
 *      是一模一样的。
 *      不过，纯事件有一个小瑕疵，你能看见对话框的小箭头，而该插件没有。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__dialogPic （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__dialogPic文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 对话图1
 * 对话图2
 * 对话图3
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令，设置对话图：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>简易对话图 : 执行 : 图[1]
 * 
 * 1.根据流程阻塞关系，对话框和对话图不会同时存在，也无法同时存在。
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
 * 测试方法：   在分别在各个管理层中测试单张对话图功能。
 * 测试结果：   战斗界面中，平均消耗为：【8.82ms】
 *              200个事件的地图中，平均消耗为：【9.04ms】
 *              100个事件的地图中，平均消耗为：【8.65ms】
 *               50个事件的地图中，平均消耗为：【8.79ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只控制一个贴图，所以消耗并不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * 
 * 
 * 
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 对话图固定处于最顶层，这里为对话图所在的图片层级。
 * @default 50
 * 
 * @param 贴图显现时间
 * @type number
 * @min 1
 * @desc 对话图的显现时间。
 * @default 20
 * 
 * @param ----对话图组----
 * @default 
 *
 * @param 对话图-1
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-2
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-3
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-4
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-5
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-6
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-7
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-8
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-9
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-10
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-11
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-12
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-13
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-14
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-15
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-16
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-17
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-18
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-19
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-20
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-21
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-22
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-23
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-24
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-25
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-26
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-27
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-28
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-29
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-30
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-31
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-32
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-33
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-34
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-35
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-36
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-37
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-38
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-39
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 *
 * @param 对话图-40
 * @parent ----对话图组----
 * @desc 对话图的图片资源。
 * @default 
 * @require 1
 * @dir img/Special__dialogPic/
 * @type file
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DSS（Dialog_Single_Sprite）
//		临时全局变量	DrillUp.g_DSS_xxx
//		临时局部变量	this._drill_DSS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	对话管理层
//		★性能测试消耗	8.79ms
//		★最坏情况		暂无
//		★备注			只有一个贴图控制，不需要担心消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			对话图：
//				->隐藏对话框
//				->阻塞流程
//
//		★必要注意事项：
//			1.这里有一个比较不稳定的因素：对话框开启、关闭的时间。
//			  这里被设置为强制delay 8帧左右时间，就是为了不让对话框瞬间恢复自己的位置。
//			2. 2021-7-25
//			  原先采用 固定帧初始值，强制固定了Window_Message对话框的位置。
//			  后来考虑到，坐标固定并不适合叠加功能，窗口也不存在变换的概念，
//			  所以这里改回为临时修改窗口位置的方法。
//			
//		★其它说明细节：
//			1.在对话框出现某个关键字段的时候，把对话框下移到别的位置。
//			  然后显示指定的图片。
//
//		★存在的问题：
//			暂无
//		
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogSingleSprite = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogSingleSprite');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DSS_layerIndex = Number(DrillUp.parameters["图片层级"] || 50);	
	DrillUp.g_DSS_fadeTime = Number(DrillUp.parameters["贴图显现时间"] || 20);	
	
	/*-----------------对话图------------------*/
	DrillUp.g_DSS_pics_length = 40;
	DrillUp.g_DSS_pics = [];
	for( var i = 0; i < DrillUp.g_DSS_pics_length; i++ ){
		DrillUp.g_DSS_pics[i] = String(DrillUp.parameters["对话图-" + String(i+1) ] || "");
	}
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialDialogPic = function(filename) {
    return this.loadBitmap('img/Special__dialogPic/', filename, 0, true);
};
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_DSS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_Drill_DSS_pluginCommand.call( this, command, args );
	if( command === ">简易对话图" ){
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "执行" ){
				temp1 = temp1.replace("图[","");
				temp1 = temp1.replace("]","");
				$gameMessage.newPage();
				$gameMessage.add("_drill_DSS_picIndex" + temp1);
				this.setWaitMode('message');
			}
		}
	}
}
	
//=============================================================================
// ** 对话框变换
//=============================================================================
//==============================
// * 对话框 - 初始化
//==============================
var _drill_DSS_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
	_drill_DSS_initialize.call(this);
	
	this._drill_DSS = {};					//
	this._drill_DSS['orgX'] = -1;			//原坐标x
	this._drill_DSS['orgY'] = -1;			//原坐标y
	this._drill_DSS['delay'] = 0;			//变动延迟
	this._drill_DSS['lastState'] = false;	//变动延迟
}

//==============================
// * 对话框 - 帧刷新
//
//			说明：	注意，对话框窗口不要 固定帧初始值 。
//==============================
var _drill_DSS_update = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
	_drill_DSS_update.call(this);
	this.drill_DSS_updateEffect();			//帧刷新变换
};
	
//==============================
// * 对话框 - 帧刷新变换
//==============================
Window_Message.prototype.drill_DSS_updateEffect = function() {
	
	// > 时间+1
	this._drill_DSS['delay'] += 1;
	
	// > 播放隐藏
	if( $gameTemp._drill_DSS_isPlaying ){
		if( this._drill_DSS['lastState'] == false ){
			this._drill_DSS['lastState'] = true;		//锁-开始播放时
			
			this._drill_DSS['orgX'] = this.x;			//（记录位置）
			this._drill_DSS['orgY'] = this.y;
			
			this.x += 0;
			this.y += Graphics.boxHeight * 2;
		}
		
	// > 关闭隐藏
	}else{
		if( this._drill_DSS['lastState'] == true ){
			this._drill_DSS['lastState'] = false;		//锁-结束播放时
			
			this._drill_DSS['delay'] = 0;
		}
		
		// > 延迟归位（8帧后 执行一次归位，已经归位则不执行）
		if( this._drill_DSS['lastState'] == false && 
			this._drill_DSS['delay'] > 8 ){
			this.drill_DSS_homingPosition();
		}
	}
}
//==============================
// * 对话框 - 执行归位
//==============================
Window_Message.prototype.drill_DSS_homingPosition = function() {
	if( this._drill_DSS['orgX'] == -1 &&
		this._drill_DSS['orgY'] == -1 ){ return; }
	this.x = this._drill_DSS['orgX'];
	this.y = this._drill_DSS['orgY'];
	this._drill_DSS['orgX'] = -1;			//（清理原坐标）
	this._drill_DSS['orgY'] = -1;			//
}


//=============================================================================
// ** 对话框切入点
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_DSS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_DSS_temp_initialize.call(this);
	this._drill_DSS_isPlaying = false;		//对话图 播放情况
	this._drill_DSS_picIndex = 0;			//对话图 当前bitmap
};

//==============================
// * 对话框 - 新的消息
//==============================
var _drill_DSS_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	_drill_DSS_startMessage.call(this);
	
	var context = this._textState.text;		//获取消息
	if( context.contains("_drill_DSS_picIndex") ){
		var index = context.replace("_drill_DSS_picIndex","");
		index = Number(index.trim()) - 1;
		$gameTemp._drill_DSS_isPlaying = true;
		$gameTemp._drill_DSS_picIndex = index;
	}else{
		$gameTemp._drill_DSS_isPlaying = false;
	}
	
};
//==============================
// * 对话框 - 关闭消息
//==============================
var _drill_DSS_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    _drill_DSS_terminateMessage.call(this);
	$gameTemp._drill_DSS_isPlaying = false;
};


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 最顶层
//==============================
var _drill_DSS_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_DSS_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Map.prototype.drill_DSS_sortByZIndex = function() {
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 对话图 - 创建
//==============================
var _drill_DSS_mapScene_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_DSS_mapScene_createAllWindows.call(this);
	this.drill_DSS_create();	
};
Scene_Map.prototype.drill_DSS_create = function() {
	
	// > bitmap全加载
	this._drill_DSS_src_bitmaps = [];
	for( var i=0; i < DrillUp.g_DSS_pics.length; i++ ){
		var bitmap = ImageManager.load_SpecialDialogPic( DrillUp.g_DSS_pics[i] );
		this._drill_DSS_src_bitmaps[i] = bitmap;
	}
	
	// > 贴图初始化
	var temp_sprite = new Sprite();
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.x = Graphics.boxWidth/2;
	temp_sprite.y = Graphics.boxHeight/2;
	temp_sprite.zIndex = DrillUp.g_DSS_layerIndex;
	
	this._drill_DSS_sprite = temp_sprite;
	this._drill_SenceTopArea.addChild(temp_sprite);
			
	this.drill_DSS_sortByZIndex();		//排序
}
//==============================
// * 对话图 - 帧刷新
//==============================
var _drill_DSS_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_DSS_map_update.call(this);
	if( this.isActive() ){
		this.drill_DSS_updateSprite();
	}
};
Scene_Map.prototype.drill_DSS_updateSprite = function() {
	var temp_sprite = this._drill_DSS_sprite;
	
	// > 隐藏对话图
	if( $gameTemp._drill_DSS_isPlaying != true ){ 
		temp_sprite.visible = false;
		temp_sprite.opacity = 0;
		return;
	}
	
	// > 切换对话图
	temp_sprite.visible = true;
	temp_sprite.opacity += 255/DrillUp.g_DSS_fadeTime;
	temp_sprite.bitmap = this._drill_DSS_src_bitmaps[ $gameTemp._drill_DSS_picIndex ];
}



//=============================================================================
// ** 战斗层级
//=============================================================================
//==============================
// ** 最顶层
//==============================
var _drill_DSS_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_DSS_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Battle.prototype.drill_DSS_sortByZIndex = function() {
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//==============================
// * 对话图 - 创建
//==============================
var _drill_DSS_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    _drill_DSS_createDisplayObjects.call(this);
	this.drill_DSS_create();	
}
Scene_Battle.prototype.drill_DSS_create = Scene_Map.prototype.drill_DSS_create;	//与地图创建一样

//==============================
// * 对话图 - 帧刷新
//==============================
var _drill_DSS_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {	
	_drill_DSS_battle_update.call(this);
	if( this.isActive() ){
		this.drill_DSS_updateSprite();
	}
};
Scene_Battle.prototype.drill_DSS_updateSprite = Scene_Map.prototype.drill_DSS_updateSprite;	//与地图创建一样




