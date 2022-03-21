//=============================================================================
// Drill_WindowSkillElement.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        控件 - 技能窗口块元素
 * @author Drill_up
 * 
 *
 * @help  
 * =============================================================================
 * +++ Drill_WindowSkillElement +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以针对技能窗口 内部元素 进行全自定义美化。
 * ★★必须放在 全自定义技能界面、战斗角色窗口 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件能单独使用，它只针对技能窗口 内部元素 进行美化。
 * 被扩展：
 *   - Drill_X_ElementSkillImage.js 控件-技能块元素的背景图片[扩展]
 *     通过该插件可以使得块元素中不同的技能，拥有不同的背景。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、战斗界面
 *   作用于技能界面的技能窗口，和战斗界面的技能窗口。
 * 2.详细配置方法去看看 "19.控件 > 关于技能窗口块元素.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui_skillElement （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui_skillElement文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-元素背景
 * 
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
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【49.87ms】
 *              菜单界面中，平均消耗为：【40.75ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件根据技能选项建立了m*n个贴图，贴图数量与窗口高宽有关。
 *   刷新起来相对消耗适中。如果窗口很大，显示了许多技能，那么消耗
 *   也会上去。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了在mog的战斗窗口中，宽度修改不了的bug。
 * [v1.2]
 * 修改了内部结构。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 添加了自定义字符串控制技能名的功能。
 * 
 * 
 *
 * @param ----窗口----
 * @default 
 * 
 * @param 是否应用于菜单技能窗口
 * @parent ----窗口----
 * @type boolean
 * @on 应用
 * @off 关闭
 * @desc true - 应用，false - 关闭。
 * @default true
 * 
 * @param 是否应用于战斗技能窗口
 * @parent ----窗口----
 * @type boolean
 * @on 应用
 * @off 关闭
 * @desc true - 应用，false - 关闭。
 * @default true
 *
 * @param ----元素组----
 * @default 
 * 
 * @param 选中元素偏移 X
 * @parent ----元素组----
 * @desc 选中的元素会自动移动到偏移的位置。x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 * 
 * @param 选中元素偏移 Y
 * @parent ----元素组----
 * @desc 选中的元素会自动移动到偏移的位置。y轴方向平移，单位像素。正数向下，负数向上。
 * @default -20
 * 
 * @param 选中元素缩放 X
 * @parent ----元素组----
 * @desc 选中的元素会自动放大到指定比例，x轴左右缩放。1.00为默认大小。
 * @default 1.00
 * 
 * @param 选中元素缩放 Y
 * @parent ----元素组----
 * @desc 选中的元素会自动放大到指定比例，y轴上下缩放。1.00为默认大小。
 * @default 1.00
 * 
 * @param 元素列数-战斗界面
 * @parent ----元素组----
 * @type number
 * @min 0
 * @desc 元素的列数，将会覆盖其它插件设置的技能窗口列数。详细配置方法去看看 "19.控件 > 关于技能窗口块元素.docx"。
 * @default 4
 * 
 * @param 元素列数-菜单界面
 * @parent ----元素组----
 * @type number
 * @min 0
 * @desc 元素的列数，将会覆盖其它插件设置的技能窗口列数。详细配置方法去看看 "19.控件 > 关于技能窗口块元素.docx"。
 * @default 2
 * 
 * @param 元素高度
 * @parent ----元素组----
 * @type number
 * @min 0
 * @desc 元素占的高度大小。详细配置方法去看看 "19.控件 > 关于技能窗口块元素.docx"。
 * @default 90
 * 
 * @param 元素横向间距
 * @parent ----元素组----
 * @type number
 * @min 0
 * @desc 横向两个选项之间的间距。详细配置方法去看看 "19.控件 > 关于技能窗口块元素.docx"。
 * @default 12
 * 
 * @param 是否严格控制元素的区域
 * @parent ----元素组----
 * @type boolean
 * @on 严格控制
 * @off 关闭
 * @desc true - 严格控制，false - 关闭。严格控制下，元素的块内容如果超出了元素的高宽，将会被遮挡、剪去。
 * @default true
 *
 * @param ----背景块----
 * @default 
 *
 * @param 资源-元素背景
 * @parent ----背景块----
 * @desc 元素背景的图片资源。
 * @default 技能窗口-技能卡槽背景
 * @require 1
 * @dir img/Menu__ui_skillElement/
 * @type file
 *
 * @param ----图标块----
 * @default 
 * 
 * @param 平移-图标 X
 * @parent ----图标块----
 * @type number
 * @min 0
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 134
 * 
 * @param 平移-图标 Y
 * @parent ----图标块----
 * @type number
 * @min 0
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 18
 * 
 * @param 图标大小
 * @parent ----图标块----
 * @desc 图标的比例大小，1.00为原大小。
 * @default 1.00
 *
 * @param ----技能名块----
 * @default 
 * 
 * @param 平移-技能名 X
 * @parent ----技能名块----
 * @type number
 * @min 0
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 42
 * 
 * @param 平移-技能名 Y
 * @parent ----技能名块----
 * @type number
 * @min 0
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 3
 * 
 * @param 技能名字体大小
 * @parent ----技能名块----
 * @type number
 * @min 0
 * @desc 技能名的字体大小。将会覆盖其它插件设置的该窗口字体大小。
 * @default 20
 * 
 * @param 技能块宽度
 * @parent ----技能名块----
 * @type number
 * @min 10
 * @desc 技能块区域的宽度。技能名如果太长，会根据宽度压缩。也与对齐方式相关。
 * @default 88
 *
 * @param 技能名对齐方式
 * @parent ----技能名块----
 * @type select
 * @option 左对齐
 * @value left
 * @option 居中
 * @value center
 * @option 右对齐
 * @value right
 * @desc 选项文本的对齐方式，left - 左对齐，center- 居中，right - 右对齐。
 * @default left
 *
 * @param ----消耗块----
 * @default 
 * 
 * @param 平移-消耗块 X
 * @parent ----消耗块----
 * @type number
 * @min 0
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 42
 * 
 * @param 平移-消耗块 Y
 * @parent ----消耗块----
 * @type number
 * @min 0
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 31
 * 
 * @param 消耗值字体大小
 * @parent ----消耗块----
 * @type number
 * @min 0
 * @desc 消耗值的字体大小。将会覆盖其它插件设置的该窗口字体大小。
 * @default 20
 * 
 * @param 消耗块宽度
 * @parent ----消耗块----
 * @type number
 * @min 10
 * @desc 消耗块区域的宽度。消耗值如果太长，会根据宽度压缩。也与对齐方式相关。
 * @default 88
 *
 * @param 消耗值对齐方式
 * @parent ----消耗块----
 * @type select
 * @option 左对齐
 * @value left
 * @option 居中
 * @value center
 * @option 右对齐
 * @value right
 * @desc 消耗值的对齐方式，left - 左对齐，center- 居中，right - 右对齐。
 * @default left
 * 
 * @param 魔法消耗文本颜色
 * @parent ----消耗块----
 * @type number
 * @min 0
 * @desc 魔法消耗的文本颜色，你可以输入100、200设置高级颜色，但前提是你使用了高级文本颜色插件。
 * @default 23
 * 
 * @param 怒气消耗文本颜色
 * @parent ----消耗块----
 * @type number
 * @min 0
 * @desc 怒气消耗的文本颜色，你可以输入100、200设置高级颜色，但前提是你使用了高级文本颜色插件。
 * @default 27
 * 
 * @param 无消耗文本
 * @parent ----消耗块----
 * @desc 魔法和怒气的消耗值为零情况下，显示的文本。可以为空。
 * @default -
 * 
 * @param 无消耗文本颜色
 * @parent ----消耗块----
 * @type number
 * @min 0
 * @desc 消耗值为零的文本颜色，你可以输入100、200设置高级颜色，但前提是你使用了高级文本颜色插件。
 * @default 23
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		WSE（Window_Skill_Element）
//		临时全局变量	DrillUp.g_WSE_xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Window_BattleSkill.prototype.drawAllItems
//						Window_BattleSkill.prototype.drawItem
//
//		工作类型		持续执行
//		时间复杂度		o(贴图处理)*o(n^2)
//		性能测试因素	技能面板
//		性能测试消耗	菜单：10.75ms，战斗：39.87ms
//		最坏情况		暂无
//		备注			这里测的值都偏低，由于都藏在400ms这种大消耗的函数中，所以不好找。
//
//插件记录：
//		★大体框架与功能如下：
//			技能窗口块元素：
//				->bitmap绘制技能块
//				->图标、背景、技能块、消耗值
//				->rmmv本体、mog方法分配
//
//		★必要注意事项：
//			1.绘制渐变颜色时，bitmap的刷子不知道为什么产生了偏移，置零了。目前解决方法是用 【Bitmap.drill_elements_drawText】 做识别。
//
//		★原理：
//			rmmv本体绘制，是在一个bitmap上面，重复画一堆内容，超过窗口的选项不画。（原本以为存在下拉图，结果完全不是）
//			rmmv本体每次上移下移动作，都会通过刷新drawItems，重新绘制当前的技能内容。
//			这里将bitmap换成sprite阵列。（面板最多放8个技能，那么就加8个sprite）
//
//		★其它说明细节：
//			1.静态界面，直接在Window_BattleSkill窗口的contents中画（contents就是个bitmap）。
//			  静态的关系直接参照window的rmmv原相关方法画。
//			  这里要推倒大部分，画sprite体现。
//			2.Window_SkillList 是 Window_BattleSkill 的父类
//			  采用覆写分配的方式来控制，（主要需要控制 父类被覆写，而确保子类 不被覆写）
//			  （覆写弄的乱七八糟的……关注drill_xxx方法就好了。）
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_WindowSkillElement = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_WindowSkillElement');

	/*-----------------窗口------------------*/
	DrillUp.g_WSE_use_in_menu = String(DrillUp.parameters['是否应用于菜单技能窗口'] || "true") === "true";	
	DrillUp.g_WSE_use_in_battle = String(DrillUp.parameters['是否应用于战斗技能窗口'] || "true") === "true";	
	
	/*-----------------元素组------------------*/
    DrillUp.g_WSE_selected_pos_x = Number(DrillUp.parameters['选中元素偏移 X'] || 0);
    DrillUp.g_WSE_selected_pos_y = Number(DrillUp.parameters['选中元素偏移 Y'] || -20);
    DrillUp.g_WSE_selected_size_x = Number(DrillUp.parameters['选中元素缩放 X'] || 1.00);
    DrillUp.g_WSE_selected_size_y = Number(DrillUp.parameters['选中元素缩放 Y'] || 1.00);
    DrillUp.g_WSE_battle_col = Number(DrillUp.parameters['元素列数-战斗界面'] || 4);
    DrillUp.g_WSE_menu_col = Number(DrillUp.parameters['元素列数-菜单界面'] || 2);
    DrillUp.g_WSE_height = Number(DrillUp.parameters['元素高度'] || 90);
    DrillUp.g_WSE_spacing = Number(DrillUp.parameters['元素横向间距'] || 12);
	DrillUp.g_WSE_is_strict = String(DrillUp.parameters['是否严格控制元素的区域'] || "true") === "true";	
	
	/*-----------------背景块------------------*/
    DrillUp.g_WSE_src_background = String(DrillUp.parameters['资源-元素背景'] || "");
    DrillUp.g_WSE_icon_x = Number(DrillUp.parameters['平移-图标 X'] || 134);
    DrillUp.g_WSE_icon_y = Number(DrillUp.parameters['平移-图标 Y'] || 18);
    DrillUp.g_WSE_icon_size = Number(DrillUp.parameters['图标大小'] || 1.00);
    DrillUp.g_WSE_skill_x = Number(DrillUp.parameters['平移-技能名 X'] || 42);
    DrillUp.g_WSE_skill_y = Number(DrillUp.parameters['平移-技能名 Y'] || 3);
    DrillUp.g_WSE_skill_fontsize = Number(DrillUp.parameters['技能名字体大小'] || 20);
    DrillUp.g_WSE_skill_width = Number(DrillUp.parameters['技能块宽度'] || 88);
    DrillUp.g_WSE_skill_align = String(DrillUp.parameters['技能名对齐方式'] || 'left');
	
	/*-----------------消耗块------------------*/
    DrillUp.g_WSE_cost_x = Number(DrillUp.parameters['平移-消耗块 X'] || 42);
    DrillUp.g_WSE_cost_y = Number(DrillUp.parameters['平移-消耗块 Y'] || 31);
    DrillUp.g_WSE_cost_fontsize = Number(DrillUp.parameters['消耗值字体大小'] || 20);
    DrillUp.g_WSE_cost_width = Number(DrillUp.parameters['消耗块宽度'] || 88);
    DrillUp.g_WSE_cost_align = String(DrillUp.parameters['消耗值对齐方式'] || 'left');
    DrillUp.g_WSE_cost_mp_color = Number(DrillUp.parameters['魔法消耗文本颜色'] || 23);
    DrillUp.g_WSE_cost_tp_color = Number(DrillUp.parameters['怒气消耗文本颜色'] || 27);
    DrillUp.g_WSE_cost_no_cost = String(DrillUp.parameters['无消耗文本'] || "-");
    DrillUp.g_WSE_cost_no_cost_color = Number(DrillUp.parameters['无消耗文本颜色'] || 23);
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuSkillElement = function(filename) {
    return this.loadBitmap('img/Menu__ui_skillElement/', filename, 0, true);
};		

//=============================================================================
// ** 窗口初始化（追加分配）
//=============================================================================
//==============================
// * 初始化 - 函数捕获
//==============================
var _drill_WSE_menu_initialize = Window_SkillList.prototype.initialize;
var _drill_WSE_battle_initialize = Window_BattleSkill.prototype.initialize;
//==============================
// * 初始化 - 菜单
//==============================
if( DrillUp.g_WSE_use_in_menu ){
	//==============================
	// * 初始化 - rmmv技能窗口
	//==============================
	Window_SkillList.prototype.initialize = function(x, y, width, height) {
		_drill_WSE_menu_initialize.call(this, x, y, width, height);
		this.drill_WSE_skillSpriteInit();
	};
	//==============================
	// * 初始化 - mog技能窗口
	//==============================
	if(Imported.MOG_SceneSkill){
		var _drill_WSE_MOG_menu_initialize = Window_SkillListM.prototype.initialize;
		Window_SkillListM.prototype.initialize = function(x, y, width, height) {
			_drill_WSE_MOG_menu_initialize.call(this, x, y, width, height);
			this.drill_WSE_skillSpriteInit();
		};
	}
}
//==============================
// * 初始化 - 战斗界面
//==============================
if( DrillUp.g_WSE_use_in_battle ){
	
	//==============================
	// * 初始化 - mog战斗技能窗口
	//==============================
	if( Imported.MOG_BattleHud ){	//mog角色窗口设置必须实时初始化
		Window_BattleSkill.prototype.initialize = function(x, y, width, height) {
			_drill_WSE_battle_initialize.call(this, x, y, Moghunter.bhud_skill_width, Moghunter.bhud_skill_height);
			this.drill_WSE_skillSpriteInit();
		};
		
	//==============================
	// * 初始化 - rmmv战斗技能窗口
	//==============================
	}else{
		Window_BattleSkill.prototype.initialize = function(x, y, width, height) {
			_drill_WSE_battle_initialize.call(this, x, y, width, height);
			this.drill_WSE_skillSpriteInit();
		};
	}
}
//==============================
// * 初始化 - 执行初始化
//==============================
Window_SkillList.prototype.drill_WSE_skillSpriteInit = function() {
	
	// > 私有函数初始化
	this._drill_WSE_spriteTank = [];
	this._drill_WSE_bitmapTank = [];
	this._drill_WSE_bitmapBackground = ImageManager.load_MenuSkillElement(DrillUp.g_WSE_src_background);
	
	// > 创建选项层
	if( this._drill_selectable_layer == undefined ){	
		this._drill_selectable_layer = new Sprite();
		this.addChild(this._drill_selectable_layer);		//（这里建立sprite层，根据rect的大小固定创建 sprite）
	}
	// > 创建贴图
	for( var j = 0; j < this.maxPageItems(); j++ ){		//（窗口只划分n*m矩阵，多余的部分不画）
		var rect = this.itemRect( j );
		var temp_sprite = new Sprite();
		temp_sprite.x = this.standardPadding() + rect.x;
		temp_sprite.y = this.standardPadding() + rect.y;
		temp_sprite._org_x = temp_sprite.x;
		temp_sprite._org_y = temp_sprite.y;
		temp_sprite.zIndex = 100;		//（菜单选项框的zIndex为 10，滚动条不在该layer中）
										//（滚动条放入任何一个layer都会出现诡异bug，影响这个插件第7个sprite）
		
		if( DrillUp.g_WSE_is_strict ){
			var temp_bitmap = new Bitmap( rect.width , rect.height );
		}else{
			var temp_bitmap = new Bitmap( this.width , this.height );
		}
		temp_bitmap.fontSize = this.standardFontSize();
		
		temp_sprite.bitmap = temp_bitmap;
		this._drill_WSE_bitmapTank.push(temp_bitmap);
		this._drill_WSE_spriteTank.push(temp_sprite);
		this._drill_selectable_layer.addChild(temp_sprite);	
		
	}
	
	// > 层级排序
	this._drill_selectable_layer.children.sort(function(a, b){return a.zIndex-b.zIndex});
		
}

//=============================================================================
// ** 窗口内容值初始化（覆写分配）
//=============================================================================
var _drill_WSE_menu_itemHeight = Window_SkillList.prototype.itemHeight;
var _drill_WSE_battle_itemHeight = Window_BattleSkill.prototype.itemHeight;
var _drill_WSE_menu_maxCols = Window_SkillList.prototype.maxCols;
var _drill_WSE_battle_maxCols = Window_BattleSkill.prototype.maxCols;
var _drill_WSE_menu_spacing = Window_SkillList.prototype.spacing;
var _drill_WSE_battle_spacing = Window_BattleSkill.prototype.spacing;

if( DrillUp.g_WSE_use_in_menu ){
	Window_SkillList.prototype.itemHeight = function() {
		return DrillUp.g_WSE_height;
	};
	Window_SkillList.prototype.maxCols = function() {
		return DrillUp.g_WSE_menu_col;
	};
	Window_SkillList.prototype.spacing = function() {
		return DrillUp.g_WSE_spacing;
	};
	Window_BattleSkill.prototype.itemHeight = function() {
		return _drill_WSE_battle_itemHeight.call(this);
	};
	Window_BattleSkill.prototype.maxCols = function() {
		return _drill_WSE_battle_maxCols.call(this);
	};
	Window_BattleSkill.prototype.spacing = function() {
		return _drill_WSE_battle_spacing.call(this);
	};
	if(Imported.MOG_SceneSkill){
		Window_SkillListM.prototype.itemHeight = function() {
			return DrillUp.g_WSE_height;
		};
		Window_SkillListM.prototype.maxCols = function() {
			return DrillUp.g_WSE_menu_col;
		};
		Window_SkillListM.prototype.spacing = function() {
			return DrillUp.g_WSE_spacing;
		};
	}
}

if( DrillUp.g_WSE_use_in_battle ){
	Window_BattleSkill.prototype.itemHeight = function() {
		return DrillUp.g_WSE_height;
	};
	Window_BattleSkill.prototype.maxCols = function() {
		return DrillUp.g_WSE_battle_col;
	};
	Window_BattleSkill.prototype.spacing = function() {
		return DrillUp.g_WSE_spacing;
	};
}

//==============================
// * bitmap窗口动作 刷新（覆写分配）
//==============================
var _drill_WSE_menu_drawAllItems = Window_SkillList.prototype.drawAllItems;
var _drill_WSE_battle_drawAllItems = Window_BattleSkill.prototype.drawAllItems;

if( DrillUp.g_WSE_use_in_menu ){
	
	Window_SkillList.prototype.drawAllItems = function() {
		this.drill_WSE_drawAllItems();
	};
	
	if(Imported.MOG_SceneSkill){
		Window_SkillListM.prototype.drawAllItems = function() {
			this.drill_WSE_drawAllItems();
		};
	}
}

if( DrillUp.g_WSE_use_in_battle ){
	Window_BattleSkill.prototype.drawAllItems = function() {
		this.drill_WSE_drawAllItems();
	};
}

//==============================
// * bitmap窗口动作 刷新
//==============================
Window_SkillList.prototype.drill_WSE_drawAllItems = function() {
	var topIndex = this.topIndex();
	
	for (var i = 0; i < this.maxPageItems(); i++) {
		var index = topIndex + i;
		var cur_bitmap = this._drill_WSE_bitmapTank[i];
		if( index < this.maxItems() ){
			this.drawItem( index,cur_bitmap );
		}else{
			cur_bitmap.clear();
		}
	}
};

//==============================
// * bitmap绘制（覆写分配）
//==============================
var _drill_WSE_menu_drawItem = Window_SkillList.prototype.drawItem;
var _drill_WSE_battle_drawItem = Window_BattleSkill.prototype.drawItem;

if( DrillUp.g_WSE_use_in_menu ){
	
	Window_SkillList.prototype.drawItem = function(index,cur_bitmap) {
		this.drill_WSE_drawItem(index,cur_bitmap);
	};
	
	if(Imported.MOG_SceneSkill){
		Window_SkillListM.prototype.drawItem = function(index,cur_bitmap) {
			this.drill_WSE_drawItem(index,cur_bitmap);
		};
	}
}

if( DrillUp.g_WSE_use_in_battle ){
	Window_BattleSkill.prototype.drawItem = function(index,cur_bitmap) {
		this.drill_WSE_drawItem(index,cur_bitmap);
	};
}

//==============================
// * bitmap绘制
//==============================
Window_SkillList.prototype.drill_WSE_drawItem = function( index,cur_bitmap ){
    var skill = this._data[index];
    if( skill ){
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
		cur_bitmap._disabled = !this.isEnabled(skill);
		cur_bitmap.paintOpacity = this.isEnabled(skill) ? 255 : this.translucentOpacity();	//	不可用的技能透明度控制
		cur_bitmap.clear();
        this.drill_WSE_s_drawBlock( cur_bitmap, skill );
		cur_bitmap.paintOpacity = 255 ;
    }
};
Window_SkillList.prototype.drill_WSE_s_drawBlock = function( cur_bitmap, skill ){
	
    if( this._drill_WSE_lastSkill != skill ){
		this._drill_WSE_lastSkill = skill;
		cur_bitmap.drill_elements_drawText = null;	//绘制颜色特殊位置修正
        this.resetTextColor();
        
		this.drill_WSE_s_drawBackground(cur_bitmap, skill);		//绘制背景
		//cur_bitmap.fillRect(0, 0 , cur_bitmap.width, cur_bitmap.height, "#000");
		
		this.drill_WSE_s_drawIcon(cur_bitmap, skill);			//绘制图标
		
		
		var name_x = DrillUp.g_WSE_skill_x;		//绘制技能名
		var name_y = DrillUp.g_WSE_skill_y;
		var name_width = DrillUp.g_WSE_skill_width; //cur_bitmap.width;
		var name_align = DrillUp.g_WSE_skill_align;
		cur_bitmap.fontSize = DrillUp.g_WSE_skill_fontsize;
		if(Imported.Drill_ItemTextColor){
			var temp_c = $gameSystem._drill_ITC_skills[ skill.id ];
			if( temp_c != "" ){ 
				cur_bitmap.textColor = temp_c ;
				cur_bitmap.drill_elements_drawText = true;
			}
		}
		var skill_name = String(skill.name)
		if( Imported.Drill_CoreOfString == true ){
			// > 指代字符（提前转换）
			skill_name = skill_name.replace(/[\\]?\\STR\[(\d+)\]/gi, function() {
				return $gameStrings.convertedValue( parseInt(arguments[1]) );
			}.bind(this));
		}
		cur_bitmap.drawText( skill_name, name_x, name_y, name_width, this.lineHeight(), name_align);
		cur_bitmap.textColor = "#ffffff" ;
		
		var cost_x = DrillUp.g_WSE_cost_x;		// 绘制消耗值
		var cost_y = DrillUp.g_WSE_cost_y;
		var cost_width = DrillUp.g_WSE_cost_width; //cur_bitmap.width;
		var cost_align = DrillUp.g_WSE_cost_align;
		cur_bitmap.fontSize = DrillUp.g_WSE_cost_fontsize;
		if (this._actor.skillTpCost(skill) > 0) {		
			cur_bitmap.textColor = this.textColor(DrillUp.g_WSE_cost_tp_color) ;
			cur_bitmap.drill_elements_drawText = true;
			cur_bitmap.drawText( String(this._actor.skillTpCost(skill)), cost_x, cost_y, cost_width,  this.lineHeight(), cost_align);
			
		} else if (this._actor.skillMpCost(skill) > 0) {
			cur_bitmap.textColor = this.textColor(DrillUp.g_WSE_cost_mp_color) ;
			cur_bitmap.drill_elements_drawText = true;
			cur_bitmap.drawText( String(this._actor.skillMpCost(skill)), cost_x, cost_y, cost_width,  this.lineHeight(), cost_align);
		
		} else if ( this._actor.skillTpCost(skill) == 0 || this._actor.skillMpCost(skill) == 0) {
			cur_bitmap.textColor = this.textColor(DrillUp.g_WSE_cost_no_cost_color) ;
			cur_bitmap.drill_elements_drawText = true;
			cur_bitmap.drawText( String(DrillUp.g_WSE_cost_no_cost), cost_x, cost_y, cost_width,  this.lineHeight(), cost_align);
		}
		cur_bitmap.textColor = "#ffffff" ;
    }
};

Window_SkillList.prototype.drill_WSE_s_drawBackground = function(cur_bitmap, skill ) {
	
	//绘制背景（背景后期可能会扩展，这里从单独拿出来）
	var back_x = 0;
	var back_y = 0;
	var back_w = this._drill_WSE_bitmapBackground.width;
	var back_h = this._drill_WSE_bitmapBackground.height;
	cur_bitmap.blt( this._drill_WSE_bitmapBackground,  back_x, back_y, back_w, back_h,  0,0, back_w, back_h);
}
Window_SkillList.prototype.drill_WSE_s_drawIcon = function(cur_bitmap, skill ) {
	
	//绘制图标（背景后期可能会扩展，这里从单独拿出来）
	var pbitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth ;
	var ph = Window_Base._iconHeight ;
	var px = skill.iconIndex % 16 * pw ;
	var py = Math.floor(skill.iconIndex / 16) * ph;
	var icon_x = DrillUp.g_WSE_icon_x;
	var icon_y = DrillUp.g_WSE_icon_y;
	var icon_size = DrillUp.g_WSE_icon_size;
	cur_bitmap._context.imageSmoothingEnabled = false;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y, pw*icon_size, ph*icon_size);
	cur_bitmap._context.imageSmoothingEnabled = true;
}

//==============================
// * sprite动作（追加分配）
//==============================
var _drill_WSE_menu_update = Window_SkillList.prototype.update;
var _drill_WSE_battle_update = Window_BattleSkill.prototype.update;

if( DrillUp.g_WSE_use_in_menu ){
	
	Window_SkillList.prototype.update = function() {
		_drill_WSE_menu_update.call(this);
		this.drill_WSE_skillSpriteUpdate();
	}
	
	if(Imported.MOG_SceneSkill){
		var _drill_WSE_MOG_menu_update = Window_SkillListM.prototype.update;
		Window_SkillListM.prototype.update = function(x, y, width, height) {
			_drill_WSE_MOG_menu_update.call(this, x, y, width, height);
			this.drill_WSE_skillSpriteUpdate();
		};
	}
}

if( DrillUp.g_WSE_use_in_battle ){
	Window_BattleSkill.prototype.update = function() {
		_drill_WSE_battle_update.call(this);
		this.drill_WSE_skillSpriteUpdate();
	}
}

//==============================
// * sprite动作
//==============================
Window_SkillList.prototype.drill_WSE_skillSpriteUpdate = function() {
	for(var i = 0; i< this._drill_WSE_spriteTank.length; i++){
		var temp_sprite = this._drill_WSE_spriteTank[i];
		if(  this._index == i + this.topIndex() 
			&& !(temp_sprite.bitmap._disabled) ){
			this.drill_WSE_button_move_to(temp_sprite,
				temp_sprite._org_x + DrillUp.g_WSE_selected_pos_x,
				temp_sprite._org_y + DrillUp.g_WSE_selected_pos_y,
				3);
			this.drill_WSE_scale_move_to(temp_sprite,DrillUp.g_WSE_selected_size_x,'x',0.01);
			this.drill_WSE_scale_move_to(temp_sprite,DrillUp.g_WSE_selected_size_y,'y',0.01);
		}else{
			this.drill_WSE_button_move_to(temp_sprite,temp_sprite._org_x,temp_sprite._org_y,3);
			this.drill_WSE_scale_move_to(temp_sprite,1.00,'x',0.01);
			this.drill_WSE_scale_move_to(temp_sprite,1.00,'y',0.01);
		}
		if(this.contentsOpacity != null){
			temp_sprite.opacity = this.contentsOpacity;
		}
	}
}

//==============================
// * 按钮变化工具方法
//==============================
Window_SkillList.prototype.drill_WSE_button_move_to = function(sprite,x,y,speed) {
	var dx = sprite.x - x;
	var dy = sprite.y - y;
	if( dx < 0 ){ sprite.x += speed; }
	if( dx > 0 ){ sprite.x -= speed; }
	if( dy < 0 ){ sprite.y += speed; }
	if( dy > 0 ){ sprite.y -= speed; }
		
	if( Math.abs(dx) <= speed ){ sprite.x = x; }
	if( Math.abs(dy) <= speed ){ sprite.y = y; }
}

Window_SkillList.prototype.drill_WSE_scale_move_to = function(sprite,s,type,speed) {
	if( type == "x" ){
		var ds = sprite.scale.x - s;
		if( ds < 0 ){ sprite.scale.x += speed; }
		if( ds > 0 ){ sprite.scale.x -= speed; }
		if( Math.abs(ds) <= speed ){ sprite.scale.x = s; }
	}else{
		var ds = sprite.scale.y - s;
		if( ds < 0 ){ sprite.scale.y += speed; }
		if( ds > 0 ){ sprite.scale.y -= speed; }
		if( Math.abs(ds) <= speed ){ sprite.scale.y = s; }
	}
}
	
//==============================
// * 往mog强制塞入drill作用方法
//==============================
if(Imported.MOG_SceneSkill){
	Window_SkillListM.prototype.drill_WSE_skillSpriteInit = Window_SkillList.prototype.drill_WSE_skillSpriteInit;
	Window_SkillListM.prototype.drill_WSE_drawAllItems = Window_SkillList.prototype.drill_WSE_drawAllItems;
	Window_SkillListM.prototype.drill_WSE_drawItem = Window_SkillList.prototype.drill_WSE_drawItem;
	Window_SkillListM.prototype.drill_WSE_s_drawBlock = Window_SkillList.prototype.drill_WSE_s_drawBlock;
	Window_SkillListM.prototype.drill_WSE_s_drawBackground = Window_SkillList.prototype.drill_WSE_s_drawBackground;
	Window_SkillListM.prototype.drill_WSE_s_drawIcon = Window_SkillList.prototype.drill_WSE_s_drawIcon;
	Window_SkillListM.prototype.drill_WSE_skillSpriteUpdate = Window_SkillList.prototype.drill_WSE_skillSpriteUpdate;
	Window_SkillListM.prototype.drill_WSE_button_move_to = Window_SkillList.prototype.drill_WSE_button_move_to;
	Window_SkillListM.prototype.drill_WSE_scale_move_to = Window_SkillList.prototype.drill_WSE_scale_move_to;
}


