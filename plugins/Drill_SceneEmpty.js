//=============================================================================
// Drill_SceneEmpty.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        面板 - 全自定义空面板
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_SceneEmpty +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 一个没有任何内容的空界面。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 * 2.自定义空面板属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Drill_SEm
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 结构：
 *   (1.插件没有包含任何窗口、贴图。
 *      但是该插件可以被多层背景等插件装饰。
 * 设计：
 *   (1.该插件没有任何窗口、贴图，但是可以被多层背景、多层魔法圈
 *      等插件装饰。还可以作为单纯播放一个菜单GIF的界面。
 *      你也可以用来制作 地图界面中 解谜小游戏 的单纯暂停界面。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 打开全自定义空面板，使用下面的插件指令：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>空面板 : 打开面板
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
 * 时间复杂度： o(n^2)*o(场景元素) 每帧
 * 测试方法：   直接进入该信息面板进行测试。
 * 测试结果：   在菜单界面中，基本元素消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件为一个界面，在该插件的界面中，地图界面、战斗界面处于完全
 *   暂停状态，所以该界面占用的图形资源、计算资源充足，消耗也低。
 * 3.该界面中的元素数量有限，消耗也上不去。暂无与消耗相关的线性关系量。
 *   （地图的线性关系量：事件，因为50/100/200事件对于消耗影响较大。）
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 *
 * @param ----杂项----
 * @default 
 *
 * @param 是否添加到主菜单
 * @parent ----杂项----
 * @type boolean
 * @on 添加
 * @off 不添加
 * @desc true - 添加，false - 不添加
 * @default false
 *
 * @param 主菜单显示名
 * @parent 是否添加到主菜单
 * @desc 主菜单显示的选项名。
 * @default 空面板
 *
 * @param 是否在标题窗口中显示
 * @parent ----杂项----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true-显示,false-不显示。注意数据存储的位置，如果是正常存储，标题将打开上一存档的数据。没有存档则会报错。
 * @default false
 *
 * @param 标题窗口显示名
 * @parent 是否在标题窗口中显示
 * @desc 标题窗口显示的名称。
 * @default 空面板
 *
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SEm（Scene_Empty）
//		临时全局变量	DrillUp.g_SEm_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	直接进入信息面板进行测试。
//		★性能测试消耗	1.21ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			空面板：
//				->只有按钮添加功能
// 
//		★私有类如下：
//			* Scene_Drill_SEm【空面板】
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.本来想只演示装饰插件的那些效果，但是想想，这个插件存在的意义也不是没有，于是就写了。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_SceneEmpty = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_SceneEmpty');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_SEm_add_to_menu = String(DrillUp.parameters['是否添加到主菜单'] || "true") === "true";	
    DrillUp.g_SEm_menu_name = String(DrillUp.parameters['主菜单显示名'] || "");
	DrillUp.g_SEm_add_to_title = String(DrillUp.parameters['是否在标题窗口中显示'] || "false") === "true";	
    DrillUp.g_SEm_title_name = String(DrillUp.parameters['标题窗口显示名'] || "");


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_SEm_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_SEm_pluginCommand.call(this, command, args);
	
	if (command === ">空面板") {
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "打开面板" ){			//打开菜单
				SceneManager.push(Scene_Drill_SEm);
			}
		}
	}
};

//=============================================================================
// * Scene_Menu 主菜单按钮
//=============================================================================
var _drill_SEm_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_SEm_createCommandWindow.call(this);
    this._commandWindow.setHandler('Drill_SEm',   this.drill_SEm_menuCommand.bind(this));
};
Scene_Menu.prototype.drill_SEm_menuCommand = function() {
    SceneManager.push(Scene_Drill_SEm);
};

var _drill_SEm_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_SEm_addOriginalCommands.call(this);
	if( DrillUp.g_SEm_add_to_menu ){
		this.addCommand(DrillUp.g_SEm_menu_name, 'Drill_SEm', this.areMainCommandsEnabled());
	}
};

//=============================================================================
// ** Scene Tittle 标题选项
//=============================================================================	
var _drill_SEm_title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _drill_SEm_title_createCommandWindow.call(this);
	this._commandWindow.setHandler('Drill_SEm',  this.drill_SEm_titleCommand.bind(this));
};
Scene_Title.prototype.drill_SEm_titleCommand = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Drill_SEm);
};
var _drill_SEm_title_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_SEm_title_makeCommandList.call(this);
	if( DrillUp.g_SEm_add_to_title ){
		this.addCommand( DrillUp.g_SEm_title_name ,'Drill_SEm');
	}
};	


//=============================================================================
// ** 制作组面板【Scene_Drill_SEm】
//
//=============================================================================
//==============================
// * 面板 - 定义
//==============================
function Scene_Drill_SEm() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_SEm.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Drill_SEm.prototype.constructor = Scene_Drill_SEm;
//==============================
// * 面板 - 初始化
//==============================
Scene_Drill_SEm.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

//==============================
// * 面板 - 创建
//==============================
Scene_Drill_SEm.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
}

//==============================
// * 面板 - 帧刷新
//==============================
Scene_Drill_SEm.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
	
	this.drill_updateQuit();			//退出监听
}

//==============================
// * 帧刷新 - 退出
//==============================
Scene_Drill_SEm.prototype.drill_updateQuit = function() {
	
	// > 按键退出
	if( TouchInput.isCancelled() || Input.isTriggered("cancel") ) {
		SoundManager.playCursor();
		SceneManager.pop();
	};	 
	
}





