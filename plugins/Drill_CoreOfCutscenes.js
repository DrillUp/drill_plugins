//=============================================================================
// Drill_CoreOfCutscenes.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        系统 - 动画转场核心
 * @author Drill_up
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_CoreOfCutscenes +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件对底层进行直接控制，提供动画转场的基本功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于界面切换的动画。
 * 2.详细内容可以去看看 "1.系统 > 关于动画转场核心.docx"。
 * 细节：
 *   (1.动画转场核心提供基本的淡出淡入控制函数，
 *      但这些函数需要子插件才能被激活，单独的核心插件没有任何效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>动画转场核心 : DEBUG转场信息查看 : 开启
 * 插件指令：>动画转场核心 : DEBUG转场信息查看 : 关闭
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
 * 测试方法：   去各个界面跑一圈测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *              战斗界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于淡出淡入只有一张贴图，所以动画播放的效果消耗非常小。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COCut（Core_Of_Cutscenes）
//		临时全局变量	DrillUp.g_COCut_xxx
//		临时局部变量	this._drill_COCut_xxx
//		存储数据变量	$gameSystem._drill_COCut_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	界面切换
//		★性能测试消耗	2024/6/15：
//							》0.7ms（drill_COCut_setFadeData）
//		★最坏情况		暂无
//		★备注			就一张贴图变透明度，消耗不了多少。
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
//			->☆管辖权
//			->☆原型链规范 - 战斗场景
//			->☆原型链规范 - 地图场景
//			->☆原型链规范 - 菜单界面基类
//			->☆原型链规范 - 项界面基类
//			->☆原型链规范 - 存档界面基类
//
//			->☆淡出淡入管理
//				->配置初始化【标准接口】
//				->提交控制【标准函数】
//				->修改颜色【标准函数】
//				->修改时长【标准函数】
//			->☆淡出淡入管理（实现）
//			->☆淡出淡入颜色
//			->☆放置到最上面
//
//			->☆动画转场DEBUG
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
//			1.目前核心专门捕获 startFadeOut 和 startFadeIn 两个基础函数进行控制。
//			  但并不是所有界面的转场都会执行这两函数，子插件需要手动提供两基础函数的执行。
//			2.动画转场 【不管】 公共事件的执行。
//		
//		★其它说明细节：
//			1.
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
	DrillUp.g_COCut_PluginTip_curName = "Drill_CoreOfCutscenes.js 系统-动画转场核心";
	DrillUp.g_COCut_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfCutscenes = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfCutscenes');
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_COCut_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COCut_pluginCommand.call(this, command, args);
	if( command === ">动画转场核心" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG转场信息查看" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_COCut_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_COCut_DebugEnabled = false;
				}
			}
		}
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
DrillUp.g_COCut_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COCut_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_COCut_sys_initialize.call(this);
	this.drill_COCut_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COCut_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_COCut_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_COCut_saveEnabled == true ){	
		$gameSystem.drill_COCut_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_COCut_initSysData();
	}
};
//##############################
// * 存储数据 - 初始化数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，执行配置初始化，并存入存档数据中。
//##############################
Game_System.prototype.drill_COCut_initSysData = function() {
	this.drill_COCut_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_COCut_checkSysData = function() {
	this.drill_COCut_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_COCut_initSysData_Private = function() {
	
	this._drill_COCut_DebugEnabled = false;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_COCut_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_COCut_DebugEnabled == undefined ){
		this.drill_COCut_initSysData();
	}
};
	
	
//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * C淡出淡入『系统-动画转场核心』 - 淡出淡入速度 - 常规
//==============================
Scene_Base.prototype.fadeSpeed = function(){ return 24; };
//==============================
// * C淡出淡入『系统-动画转场核心』 - 淡出淡入速度 - 慢速
//==============================
Scene_Base.prototype.slowFadeSpeed = function(){ return this.fadeSpeed() * 2; };
//==============================
// * C淡出淡入『系统-动画转场核心』 - 执行淡出
//
//				参数：	> duration 数字（持续时间，单位帧）
//						> white 布尔   （是否为白底，否则为黑底）
//				说明：	> 子场景对duration参数不直接赋值数字，而是使用函数 fadeSpeed() 或 slowFadeSpeed() 赋值。
//==============================
Scene_Base.prototype.startFadeOut = function( duration, white ){
    this.createFadeSprite(white);
    this._fadeSign = -1;
    this._fadeDuration = duration || 30;	//（默认30帧的持续时间）
    this._fadeSprite.opacity = 0;
};
//==============================
// * C淡出淡入『系统-动画转场核心』 - 执行淡出 声音和画面
//==============================
Scene_Base.prototype.fadeOutAll = function() {
    var time = this.slowFadeSpeed() / 60;
    AudioManager.fadeOutBgm(time);
    AudioManager.fadeOutBgs(time);
    AudioManager.fadeOutMe(time);
    this.startFadeOut(this.slowFadeSpeed());
};
//==============================
// * C淡出淡入『系统-动画转场核心』 - 执行淡入
//
//				参数：	> duration 数字（持续时间，单位帧）
//						> white 布尔   （是否为白底，否则为黑底）
//				说明：	> 子场景对duration参数不直接赋值数字，而是使用函数 fadeSpeed() 或 slowFadeSpeed() 赋值。
//==============================
Scene_Base.prototype.startFadeIn = function( duration, white ){
    this.createFadeSprite(white);
    this._fadeSign = 1;
    this._fadeDuration = duration || 30;	//（默认30帧的持续时间）
    this._fadeSprite.opacity = 255;
};
//==============================
// * C淡出淡入『系统-动画转场核心』 - 创建贴图对象
//
//				参数：	> white 布尔   （是否为白底，否则为黑底）
//==============================
Scene_Base.prototype.createFadeSprite = function( white ){
    if( !this._fadeSprite ){
        this._fadeSprite = new ScreenSprite();
        this.addChild(this._fadeSprite);
    }
    if( white ){
        this._fadeSprite.setWhite();
    }else{
        this._fadeSprite.setBlack();
    }
};
//==============================
// * C淡出淡入『系统-动画转场核心』 - 帧刷新
//==============================
Scene_Base.prototype.updateFade = function() {
    if( this._fadeDuration > 0 ){
        var d = this._fadeDuration;
        if( this._fadeSign > 0 ){
            this._fadeSprite.opacity -= this._fadeSprite.opacity / d;
        }else{
            this._fadeSprite.opacity += (255 - this._fadeSprite.opacity) / d;
        }
        this._fadeDuration--;
    }
};
*/
	
	
//=============================================================================
// ** ☆原型链规范 - 战斗场景
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 战斗场景 - C淡出淡入 - 淡出淡入速度 - 常规
//==============================
Scene_Battle.prototype.fadeSpeed = function(){
	return Scene_Base.prototype.fadeSpeed.call(this);
};
//==============================
// * 战斗场景 - C淡出淡入 - 淡出淡入速度 - 慢速
//==============================
Scene_Battle.prototype.slowFadeSpeed = function(){
	return Scene_Base.prototype.slowFadeSpeed.call(this);
};
//==============================
// * 战斗场景 - C淡出淡入 - 执行淡出
//==============================
Scene_Battle.prototype.startFadeOut = function( duration, white ){
	Scene_Base.prototype.startFadeOut.call(this, duration, white );
};
//==============================
// * 战斗场景 - C淡出淡入 - 执行淡出 声音和画面
//==============================
Scene_Battle.prototype.fadeOutAll = function() {
	Scene_Base.prototype.fadeOutAll.call(this);
};
//==============================
// * 战斗场景 - C淡出淡入 - 执行淡入
//==============================
Scene_Battle.prototype.startFadeIn = function( duration, white ){
	Scene_Base.prototype.startFadeIn.call(this, duration, white );
};
//==============================
// * 战斗场景 - C淡出淡入 - 创建贴图对象
//==============================
Scene_Battle.prototype.createFadeSprite = function( white ){
	Scene_Base.prototype.createFadeSprite.call(this, white );
};
//==============================
// * 战斗场景 - C淡出淡入 - 帧刷新
//==============================
Scene_Battle.prototype.updateFade = function() {
	Scene_Base.prototype.updateFade.call(this);
};


//=============================================================================
// ** ☆原型链规范 - 地图场景
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 地图场景 - C淡出淡入 - 淡出淡入速度 - 常规
//==============================
Scene_Map.prototype.fadeSpeed = function(){
	return Scene_Base.prototype.fadeSpeed.call(this);
};
//==============================
// * 地图场景 - C淡出淡入 - 淡出淡入速度 - 慢速
//==============================
Scene_Map.prototype.slowFadeSpeed = function(){
	return Scene_Base.prototype.slowFadeSpeed.call(this);
};
//==============================
// * 地图场景 - C淡出淡入 - 执行淡出
//==============================
Scene_Map.prototype.startFadeOut = function( duration, white ){
	Scene_Base.prototype.startFadeOut.call(this, duration, white );
};
//==============================
// * 地图场景 - C淡出淡入 - 执行淡出 声音和画面
//==============================
Scene_Map.prototype.fadeOutAll = function() {
	Scene_Base.prototype.fadeOutAll.call(this);
};
//==============================
// * 地图场景 - C淡出淡入 - 执行淡入
//==============================
Scene_Map.prototype.startFadeIn = function( duration, white ){
	Scene_Base.prototype.startFadeIn.call(this, duration, white );
};
//==============================
// * 地图场景 - C淡出淡入 - 创建贴图对象
//==============================
Scene_Map.prototype.createFadeSprite = function( white ){
	Scene_Base.prototype.createFadeSprite.call(this, white );
};
//==============================
// * 地图场景 - C淡出淡入 - 帧刷新
//==============================
Scene_Map.prototype.updateFade = function() {
	Scene_Base.prototype.updateFade.call(this);
};


//=============================================================================
// ** ☆原型链规范 - 菜单界面基类
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 菜单界面基类 - C淡出淡入 - 淡出淡入速度 - 常规
//==============================
Scene_MenuBase.prototype.fadeSpeed = function(){
	return Scene_Base.prototype.fadeSpeed.call(this);
};
//==============================
// * 菜单界面基类 - C淡出淡入 - 淡出淡入速度 - 慢速
//==============================
Scene_MenuBase.prototype.slowFadeSpeed = function(){
	return Scene_Base.prototype.slowFadeSpeed.call(this);
};
//==============================
// * 菜单界面基类 - C淡出淡入 - 执行淡出
//==============================
Scene_MenuBase.prototype.startFadeOut = function( duration, white ){
	Scene_Base.prototype.startFadeOut.call(this, duration, white );
};
//==============================
// * 菜单界面基类 - C淡出淡入 - 执行淡出 声音和画面
//==============================
Scene_MenuBase.prototype.fadeOutAll = function() {
	Scene_Base.prototype.fadeOutAll.call(this);
};
//==============================
// * 菜单界面基类 - C淡出淡入 - 执行淡入
//==============================
Scene_MenuBase.prototype.startFadeIn = function( duration, white ){
	Scene_Base.prototype.startFadeIn.call(this, duration, white );
};
//==============================
// * 菜单界面基类 - C淡出淡入 - 创建贴图对象
//==============================
Scene_MenuBase.prototype.createFadeSprite = function( white ){
	Scene_Base.prototype.createFadeSprite.call(this, white );
};
//==============================
// * 菜单界面基类 - C淡出淡入 - 帧刷新
//==============================
Scene_MenuBase.prototype.updateFade = function() {
	Scene_Base.prototype.updateFade.call(this);
};


//=============================================================================
// ** ☆原型链规范 - 项界面基类
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 项界面基类 - C淡出淡入 - 淡出淡入速度 - 常规
//==============================
Scene_ItemBase.prototype.fadeSpeed = function(){
	return Scene_MenuBase.prototype.fadeSpeed.call(this);
};
//==============================
// * 项界面基类 - C淡出淡入 - 淡出淡入速度 - 慢速
//==============================
Scene_ItemBase.prototype.slowFadeSpeed = function(){
	return Scene_MenuBase.prototype.slowFadeSpeed.call(this);
};
//==============================
// * 项界面基类 - C淡出淡入 - 执行淡出
//==============================
Scene_ItemBase.prototype.startFadeOut = function( duration, white ){
	Scene_MenuBase.prototype.startFadeOut.call(this, duration, white );
};
//==============================
// * 项界面基类 - C淡出淡入 - 执行淡出 声音和画面
//==============================
Scene_ItemBase.prototype.fadeOutAll = function() {
	Scene_MenuBase.prototype.fadeOutAll.call(this);
};
//==============================
// * 项界面基类 - C淡出淡入 - 执行淡入
//==============================
Scene_ItemBase.prototype.startFadeIn = function( duration, white ){
	Scene_MenuBase.prototype.startFadeIn.call(this, duration, white );
};
//==============================
// * 项界面基类 - C淡出淡入 - 创建贴图对象
//==============================
Scene_ItemBase.prototype.createFadeSprite = function( white ){
	Scene_MenuBase.prototype.createFadeSprite.call(this, white );
};
//==============================
// * 项界面基类 - C淡出淡入 - 帧刷新
//==============================
Scene_ItemBase.prototype.updateFade = function() {
	Scene_MenuBase.prototype.updateFade.call(this);
};


//=============================================================================
// ** ☆原型链规范 - 存档界面基类
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 存档界面基类 - C淡出淡入 - 淡出淡入速度 - 常规
//==============================
Scene_File.prototype.fadeSpeed = function(){
	return Scene_MenuBase.prototype.fadeSpeed.call(this);
};
//==============================
// * 存档界面基类 - C淡出淡入 - 淡出淡入速度 - 慢速
//==============================
Scene_File.prototype.slowFadeSpeed = function(){
	return Scene_MenuBase.prototype.slowFadeSpeed.call(this);
};
//==============================
// * 存档界面基类 - C淡出淡入 - 执行淡出
//==============================
Scene_File.prototype.startFadeOut = function( duration, white ){
	Scene_MenuBase.prototype.startFadeOut.call(this, duration, white );
};
//==============================
// * 存档界面基类 - C淡出淡入 - 执行淡出 声音和画面
//==============================
Scene_File.prototype.fadeOutAll = function() {
	Scene_MenuBase.prototype.fadeOutAll.call(this);
};
//==============================
// * 存档界面基类 - C淡出淡入 - 执行淡入
//==============================
Scene_File.prototype.startFadeIn = function( duration, white ){
	Scene_MenuBase.prototype.startFadeIn.call(this, duration, white );
};
//==============================
// * 存档界面基类 - C淡出淡入 - 创建贴图对象
//==============================
Scene_File.prototype.createFadeSprite = function( white ){
	Scene_MenuBase.prototype.createFadeSprite.call(this, white );
};
//==============================
// * 存档界面基类 - C淡出淡入 - 帧刷新
//==============================
Scene_File.prototype.updateFade = function() {
	Scene_MenuBase.prototype.updateFade.call(this);
};



//#############################################################################
// ** 【标准模块】淡出淡入管理 ☆淡出淡入管理
//#############################################################################
//##############################
// * 淡出淡入管理 - 配置初始化【标准接口】
//				
//			参数：	> cur_sceneName 字符串（当前场景）
//					> tar_sceneName 字符串（目标场景）
//					> fade_type 字符串    （淡出/淡入）
//					> is_white 布尔       （是否使用白色背景）
//			返回：	> 无
//
//			说明：	> 如果成功配置，需要调用函数： this.drill_COCut_submitFade(true);
//					  未调用此函数的字符，会进入后面阶段多次解析。
//##############################
Scene_Base.prototype.drill_COCut_setFadeData = function( cur_sceneName, tar_sceneName, fade_type, is_white ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 淡出淡入管理 - 提交控制【标准函数】
//
//			参数：	> can_call 布尔（可执行开关）
//			返回：	> 无
//
//			说明：	> 配置后，如果想继续播放淡入淡出动画，可以设置参数为true；如果不想，设置参数为false。
//##############################
Scene_Base.prototype.drill_COCut_submitFade = function( can_call ){
	this._drill_COCut_fade_canCall = can_call;
}
//##############################
// * 淡出淡入管理 - 修改颜色【标准函数】
//
//			参数：	> color 字符串
//			返回：	> 无
//
//			说明：	> 此修改将横跨一次 淡出、淡入 流程。流程结束后复原。
//					> 不考虑界面缺少执行 淡出淡入函数 的情况。
//##############################
Scene_Base.prototype.drill_COCut_setFadeColor = function( color ){
	this._drill_COCut_fade_colorEnabled = true;
	this._drill_COCut_fade_color = color;
}
//##############################
// * 淡出淡入管理 - 修改时长【标准函数】
//
//			参数：	> time 数字
//			返回：	> 无
//
//			说明：	> 此修改将横跨一次 淡出、淡入 流程。流程结束后复原。
//					> 不考虑界面缺少执行 淡出淡入函数 的情况。
//##############################
Scene_Base.prototype.drill_COCut_setFadeTime = function( time ){
	this._drill_COCut_fade_timeEnabled = true;
	this._drill_COCut_fade_time = time;
}


//=============================================================================
// ** ☆淡出淡入管理（实现）
//
//			说明：	> 此模块控制场景切换时 淡出淡入 的过程。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 淡出淡入管理 - 重设配置
//==============================
Scene_Base.prototype.drill_COCut_resetFadeConfig = function(){
	this._drill_COCut_fade_colorEnabled = false;
	this._drill_COCut_fade_timeEnabled = false;
}
//==============================
// * 淡出淡入管理 - 执行淡出
//==============================
var _drill_COCut_map_startFadeOut = Scene_Base.prototype.startFadeOut;
Scene_Base.prototype.startFadeOut = function( duration, is_white ){
	
	// > 重设配置
	this.drill_COCut_resetFadeConfig();
	
	
	// > 配置初始化 - 参数准备
	var fade_type = "淡出";
	var cur_sceneName = "";
	var tar_sceneName = "";
	cur_sceneName = this.constructor.name;			//（当前场景）
	if( SceneManager._nextScene != undefined &&		//（下一个场景）
		SceneManager._nextScene.constructor != undefined ){
		tar_sceneName = SceneManager._nextScene.constructor.name;
	}
	
	// > 配置初始化
	this.drill_COCut_setFadeData( cur_sceneName, tar_sceneName, fade_type, is_white );
	
	
	// > 配置 - 修改时长
	if( this._drill_COCut_fade_timeEnabled == true ){
		duration = Math.max( this._drill_COCut_fade_time, 1 );
	}
	
	// > 配置 - 可执行开关 关闭，跳出
	if( this._drill_COCut_fade_canCall == false ){
		return;
	}
	
	
	// > 原函数
	_drill_COCut_map_startFadeOut.call( this, duration, is_white );
}
//==============================
// * 淡出淡入管理 - 执行淡入
//==============================
var _drill_COCut_battle_startFadeIn = Scene_Base.prototype.startFadeIn;
Scene_Base.prototype.startFadeIn = function( duration, is_white ){
	
	// > 配置初始化 - 参数准备
	var fade_type = "淡入";
	var cur_sceneName = "";
	var tar_sceneName = "";
	if( SceneManager._previousClass != undefined ){		//（前一个场景）
		cur_sceneName = SceneManager._previousClass.name;
	}
	tar_sceneName = this.constructor.name;				//（当前场景）
	
	// > 配置初始化
	this.drill_COCut_setFadeData( cur_sceneName, tar_sceneName, fade_type, is_white );
	
	
	// > 配置 - 修改时长
	if( this._drill_COCut_fade_timeEnabled == true ){
		duration = Math.max( this._drill_COCut_fade_time, 1 );
	}
	
	// > 配置 - 可执行开关 关闭，跳出
	if( this._drill_COCut_fade_canCall == false ){
		
		// > 重设配置
		this.drill_COCut_resetFadeConfig();
		return;
	}
	
	
	// > 原函数
	_drill_COCut_battle_startFadeIn.call( this, duration, is_white );
	
	
	// > 重设配置
	this.drill_COCut_resetFadeConfig();
}


//=============================================================================
// ** ☆淡出淡入颜色
//
//			说明：	> 此模块控制淡出淡入的 屏幕颜色 。
//					> 这里也只能改颜色，其它的做不了，因为贴图被缩放过。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 淡出淡入颜色 - 创建贴图
//==============================
var _drill_COCut_createFadeSprite = Scene_Base.prototype.createFadeSprite;
Scene_Base.prototype.createFadeSprite = function( is_white ){
	_drill_COCut_createFadeSprite.call( this, is_white );
	
	// > 配置 - 修改颜色
	if( this._drill_COCut_fade_colorEnabled == true ){
		this._fadeSprite.drill_COCut_setColor( this._drill_COCut_fade_color );
	}
}
//==============================
// * 淡出淡入颜色 - 设为指定颜色
//==============================
ScreenSprite.prototype.drill_COCut_setColor = function( color ){
	var color_obj = $gameTemp.drill_COCut_color_StringToRGB( color );
	this.setColor( color_obj['r'], color_obj['g'], color_obj['b'] );
};
//==============================
// * 淡出淡入颜色 - 颜色工具 - 字符串转RGB（开放函数）
//			
//			参数：	> color_string 字符串 （颜色）
//			返回：	> 动态参数对象        （如 {"r":255,"g":255,"b":255} ）
//			
//			说明：	> 颜色的格式支持 十六进制表示法、RGB表示法 。
//==============================
Game_Temp.prototype.drill_COCut_color_StringToRGB = function( color_string ){
	color_string = color_string.toLowerCase();
	
	// > 格式"#ffffff"情况
	if( color_string.charAt(0) == "#" ){
		color_string = color_string.substring(1);
		
		// > 格式"#fff"情况
		if( color_string.length == 3 ){
			color_string = color_string[0]+color_string[0] +color_string[1]+color_string[1] +color_string[2]+color_string[2];
		}
		if( /^[0-9a-f]{6}$/.test(color_string) ){
			var color_obj = {};
			color_obj['r'] = parseInt( color_string.substr(0,2), 16 );
			color_obj['g'] = parseInt( color_string.substr(2,2), 16 );
			color_obj['b'] = parseInt( color_string.substr(4,2), 16 );
			return color_obj;
		}
	}
	// > 格式"rgb(255,255,255)"情况
	if( color_string.charAt(0) == "r" ){
		color_string = color_string.replace( /[ rgba\(\)（）]/g, "" );
		var str_list = color_string.split( /[,，]+/ );
		if( str_list.length < 3 ){ return null; }
		var color_obj = {};
		color_obj['r'] = Number( str_list[0] );
		color_obj['g'] = Number( str_list[1] );
		color_obj['b'] = Number( str_list[2] );
		return color_obj;
	}
	return null;
}


//=============================================================================
// ** ☆放置到最上面
//
//			说明：	> 此模块确保 淡出淡入贴图 一直在最上面，能盖住其它所有贴图以及装饰。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 放置到最上面 - 创建贴图
//==============================
var _drill_COCut_top_createFadeSprite = Scene_Base.prototype.createFadeSprite;
Scene_Base.prototype.createFadeSprite = function( white ){
	_drill_COCut_top_createFadeSprite.call( this, white );
	
	// > 最顶层
	if( this._drill_SenceTopArea != undefined ){
		this._fadeSprite.zIndex = 666422 + 100;
		this._drill_SenceTopArea.addChild(this._fadeSprite);
	}
	
	// > 菜单前面层
	if( this._foregroundSprite != undefined ){
		this._fadeSprite.zIndex = 666422 + 100;
		this._foregroundSprite.addChild(this._fadeSprite);
	}
}


//=============================================================================
// ** ☆动画转场DEBUG
//
//			说明：	> 此模块控制 DEBUG 过程。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
var _drill_COCut_COCut_setFadeData = Scene_Base.prototype.drill_COCut_setFadeData;
Scene_Base.prototype.drill_COCut_setFadeData = function( cur_sceneName, tar_sceneName, fade_type, is_white ){
	_drill_COCut_COCut_setFadeData.call( this, cur_sceneName, tar_sceneName, fade_type, is_white );
	
	if( $gameSystem._drill_COCut_DebugEnabled == true ){
		var context = "当前动画：淡出淡入动画";
		context += "\n";
		context += "当前流程：";
		context += cur_sceneName;
		context += " -> ";
		context += tar_sceneName;
		context += "\n";
		context += "执行函数：";
		context += fade_type;
		context += "\n";
		context += "默认颜色：";
		if( is_white == true ){
			context += "白";
		}else{
			context += "黑";
		}
		alert(context);
	}
}
