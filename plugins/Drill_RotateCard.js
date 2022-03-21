//=============================================================================
// Drill_RotateCard.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        控件 - 旋转卡牌
 * @author Drill_up
 *
 *
 * @help 
 * =============================================================================
 * +++ Drill_RotateCard +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 查看物品或装备时，会弹出旋转卡牌并展示物品的图片。
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，可以在多个界面中显示。
 * 被扩展：
 *   - Drill_X_ItemImage 控件-物品+技能详细图片[扩展]
 *     通过该插件，卡片中的图标可以换成高清图片。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以作用于物品、技能、装备、商店、战斗等界面。
 *  （作用的界面不影响其界面的其他相关插件。）
 * 2.如果你只想卡片浮动，旋转速度设置为0就可以了。
 * 3.每个界面的卡片类型(装备类/技能类/物品类)都可以不一样，这里可以
 *   对界面单独设置卡片类型。
 * 4.这里设置的是卡片类型，不是对应的每个物品，对每个物品的改变图像
 *   建议使用扩展插件 Drill_X_ItemImage 物品+技能详细图片[扩展]。
 * 5.该插件现在已支持YEP物品核心插件。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui_card （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui_card文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-默认卡片正面
 * 资源-卡片正面1
 * 资源-卡片正面2
 * 资源-卡片正面3
 * …… （至12）
 *
 * 资源-默认卡片背面
 * 资源-卡片背面1
 * 资源-卡片背面2
 * 资源-卡片背面3
 * …… （至12）
 *
 * 正面背面是卡片的框架图片，如果不需要背面，可以不配置。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以在物品/技能/装备中添加下面注释：
 *
 * <卡片类型:1>
 *
 * 用于显示设置的不同类型的卡片。
 * 类型1对应的相应界面配置的卡片正反面1。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了速度为0，卡片不显示的bug。
 * [v1.2]
 * 修改了内部结构。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 添加了与yep物品核心的兼容。
 *
 *
 * @param 切换按钮
 * @type text[]
 * @desc 切换该窗口是否显示的按钮。tab的设置意思是，按tab会隐藏窗口，再按会显示。
 * @default ["tab","menu"]
 *
 * @param ----物品界面----
 * @default 
 *
 * @param 是否启用物品界面卡片
 * @parent ----物品界面----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 物品卡片设置
 * @parent ----物品界面----
 * @type struct<RotateCardSet>
 * @desc 物品界面的卡片设置。
 * @default 
 *
 * @param 是否固定物品界面坐标
 * @parent ----物品界面----
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-物品界面窗口 X
 * @parent ----物品界面----
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 110
 *
 * @param 平移-物品界面窗口 Y
 * @parent ----物品界面----
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 280
 *
 * @param ----技能界面----
 * @default 
 *
 * @param 是否启用技能界面卡片
 * @parent ----技能界面----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 技能卡片设置
 * @parent ----技能界面----
 * @type struct<RotateCardSet>
 * @desc 技能界面的卡片设置。
 * @default 
 *
 * @param 是否固定技能界面坐标
 * @parent ----技能界面----
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-技能界面窗口 X
 * @parent ----技能界面----
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-技能界面窗口 Y
 * @parent ----技能界面----
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param ----装备界面----
 * @default 
 *
 * @param 是否启用装备界面卡片
 * @parent ----装备界面----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 装备卡片设置
 * @parent ----装备界面----
 * @type struct<RotateCardSet>
 * @desc 装备界面的卡片设置。
 * @default 
 *
 * @param 是否固定装备界面坐标
 * @parent ----装备界面----
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-装备界面窗口 X
 * @parent ----装备界面----
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-装备界面窗口 Y
 * @parent ----装备界面----
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param ----商店界面----
 * @default 
 *
 * @param 是否启用商店界面卡片
 * @parent ----商店界面----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 商店卡片设置
 * @parent ----商店界面----
 * @type struct<RotateCardSet>
 * @desc 商店界面的卡片设置。
 * @default 
 *
 * @param 是否固定商店界面坐标
 * @parent ----商店界面----
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-商店界面窗口 X
 * @parent ----商店界面----
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 110
 *
 * @param 平移-商店界面窗口 Y
 * @parent ----商店界面----
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 280
 *
 * @param ----战斗界面----
 * @default 
 *
 * @param 是否启用战斗界面卡片
 * @parent ----战斗界面----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 战斗卡片设置
 * @parent ----战斗界面----
 * @type struct<RotateCardSet>
 * @desc 战斗界面的卡片设置。
 * @default 
 *
 * @param 是否固定战斗界面坐标
 * @parent ----战斗界面----
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default false
 *
 * @param 平移-战斗界面窗口 X
 * @parent ----战斗界面----
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-战斗界面窗口 Y
 * @parent ----战斗界面----
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param ----技能树界面----
 * @default 
 *
 * @param 是否启用技能树界面卡片
 * @parent ----技能树界面----
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，需要导入FTKR技能树插件。
 * @default false
 *
 * @param 技能树卡片设置
 * @parent ----技能树界面----
 * @type struct<RotateCardSet>
 * @desc 技能树界面的卡片设置。
 * @default 
 *
 * @param 是否固定FTKR技能树界面坐标
 * @parent ----技能树界面----
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default false
 *
 * @param 平移-FTKR技能树界面窗口 X
 * @parent ----技能树界面----
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-FTKR技能树界面窗口 Y
 * @parent ----技能树界面----
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 0
 *
 */
 /*~struct~RotateCardSet:
 *
 *
 * @param 卡片旋转速度
 * @desc 卡片旋转的速度，单位 度/帧。设置1表示60帧里卡片旋转60度。（1秒60帧）
 * @default 1.5
 *
 * @param 是否使用浮动效果
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用。
 * @default true
 *
 * @param 浮动速度
 * @parent 是否使用浮动效果
 * @desc 浮动的速度，单位 像素/帧。
 * @default 1.0
 *
 * @param 是否对齐对角线角度
 * @type boolean
 * @on 对齐
 * @off 手动设置
 * @desc 卡片将根据对角线，自动倾斜，你也可以手动设置卡片斜向角度。
 * @default true
 *
 * @param 卡片斜向角度
 * @parent 是否对齐对角线角度
 * @type number
 * @min 0
 * @max 180
 * @desc 手动设置卡片斜向角度，单位度。
 * @default 30
 *
 * @param 是否含有背面
 * @type boolean
 * @on 含
 * @off 不含
 * @desc true - 含，false - 不含。使得卡片有正反面。
 * @default true
 *
 * @param 默认图标缩放比例
 * @desc 物品的默认图标绘制在卡片上的大小，1.00为原始大小。
 * @default 1.50
 *
 * @param 资源-默认卡片正面
 * @desc 卡片正面的图片资源。默认为类型0。
 * @default 旋转卡牌-默认正面
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-默认卡片背面
 * @desc 卡片背面的图片资源，如果没有背面，可以不设置。默认为类型0。
 * @default 旋转卡牌-默认背面
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面1
 * @desc 类型1的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面1
 * @desc 类型1的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面2
 * @desc 类型2的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面2
 * @desc 类型2的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面3
 * @desc 类型3的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面3
 * @desc 类型3的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面4
 * @desc 类型4的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面4
 * @desc 类型4的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面5
 * @desc 类型5的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面5
 * @desc 类型5的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面6
 * @desc 类型6的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面6
 * @desc 类型6的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面7
 * @desc 类型7的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面7
 * @desc 类型7的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面8
 * @desc 类型8的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面8
 * @desc 类型8的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面9
 * @desc 类型9的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面9
 * @desc 类型9的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面10
 * @desc 类型10的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面10
 * @desc 类型10的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面11
 * @desc 类型11的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面11
 * @desc 类型11的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面12
 * @desc 类型12的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面12
 * @desc 类型12的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		RCard（Rotate_Card）
//		临时全局变量	DrillUp.g_RCard_xxx
//		临时局部变量	this._drill_RCard
//						this._drill_rotate_card
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		★大体框架与功能如下：
//			旋转卡牌：
//				->卡片旋转
//				->各个菜单界面的显示
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.卡牌不存在左旋转还是右旋转的问题，因为旋转的线是平行的。
//
//		★存在的问题：
//			暂无
//

	var Imported = Imported || {};
	Imported.Drill_RotateCard = true;
	var DrillUp = DrillUp || {}; 

	DrillUp.parameters = PluginManager.parameters('Drill_RotateCard');
	
    DrillUp.g_RCard_btn_key = JSON.parse( DrillUp.parameters['切换按钮'] || [] );
    DrillUp.g_RCard_useSceneItem = String(DrillUp.parameters['是否启用物品界面卡片'] || "true") === "true";
    DrillUp.g_RCard_item_offset_fix = String(DrillUp.parameters['是否固定物品界面坐标'] || "true") === "true" ;
    DrillUp.g_RCard_item_offsetX = Number(DrillUp.parameters['平移-物品界面窗口 X'] || 0);
    DrillUp.g_RCard_item_offsetY = Number(DrillUp.parameters['平移-物品界面窗口 Y'] || 0);
    DrillUp.g_RCard_useSceneSkill = String(DrillUp.parameters['是否启用技能界面卡片'] || "true") === "true";
    DrillUp.g_RCard_skill_offset_fix = String(DrillUp.parameters['是否固定技能界面坐标'] || "true") === "true" ;
    DrillUp.g_RCard_skill_offsetX = Number(DrillUp.parameters['平移-技能界面窗口 X'] || 0);
    DrillUp.g_RCard_skill_offsetY = Number(DrillUp.parameters['平移-技能界面窗口 Y'] || 0);
    DrillUp.g_RCard_useSceneEquip = String(DrillUp.parameters['是否启用装备界面卡片'] || "true") === "true";
    DrillUp.g_RCard_equip_offset_fix = String(DrillUp.parameters['是否固定装备界面坐标'] || "true") === "true" ;
    DrillUp.g_RCard_equip_offsetX = Number(DrillUp.parameters['平移-装备界面窗口 X'] || 0);
    DrillUp.g_RCard_equip_offsetY = Number(DrillUp.parameters['平移-装备界面窗口 Y'] || 0);
    DrillUp.g_RCard_useSceneShop = String(DrillUp.parameters['是否启用商店界面卡片'] || "true") === "true";
    DrillUp.g_RCard_shop_offset_fix = String(DrillUp.parameters['是否固定商店界面坐标'] || "true") === "true" ;
    DrillUp.g_RCard_shop_offsetX = Number(DrillUp.parameters['平移-商店界面窗口 X'] || 0);
    DrillUp.g_RCard_shop_offsetY = Number(DrillUp.parameters['平移-商店界面窗口 Y'] || 0);
	DrillUp.g_RCard_useSceneBattle = String(DrillUp.parameters['是否启用战斗界面卡片'] || "true") === "true";
    DrillUp.g_RCard_battle_offset_fix = String(DrillUp.parameters['是否固定战斗界面坐标'] || "true") === "true" ;
    DrillUp.g_RCard_battle_offsetX = Number(DrillUp.parameters['平移-战斗界面窗口 X'] || 0);
    DrillUp.g_RCard_battle_offsetY = Number(DrillUp.parameters['平移-战斗界面窗口 Y'] || 0);
	DrillUp.g_RCard_useSceneFTKR = String(DrillUp.parameters['是否启用技能树界面卡片'] || "true") === "true";
    DrillUp.g_RCard_FTKR_offset_fix = String(DrillUp.parameters['是否固定FTKR技能树界面坐标'] || "true") === "true" ;
    DrillUp.g_RCard_FTKR_offsetX = Number(DrillUp.parameters['平移-FTKR技能树界面窗口 X'] || 0);
    DrillUp.g_RCard_FTKR_offsetY = Number(DrillUp.parameters['平移-FTKR技能树界面窗口 Y'] || 0);
	
	DrillUp.g_RCard_list = [];
	if( DrillUp.parameters['物品卡片设置'] != "" ){
		DrillUp.g_RCard_list[1] = JSON.parse(DrillUp.parameters['物品卡片设置']);
	}else{
		DrillUp.g_RCard_list[1] = "";
	}
	if( DrillUp.parameters['技能卡片设置'] != "" ){
		DrillUp.g_RCard_list[2] = JSON.parse(DrillUp.parameters['技能卡片设置']);
	}else{
		DrillUp.g_RCard_list[2] = "";
	}
	if( DrillUp.parameters['装备卡片设置'] != "" ){
		DrillUp.g_RCard_list[3] = JSON.parse(DrillUp.parameters['装备卡片设置']);
	}else{
		DrillUp.g_RCard_list[3] = "";
	}
	if( DrillUp.parameters['商店卡片设置'] != "" ){
		DrillUp.g_RCard_list[4] = JSON.parse(DrillUp.parameters['商店卡片设置']);
	}else{
		DrillUp.g_RCard_list[4] = "";
	}
	if( DrillUp.parameters['战斗卡片设置'] != "" ){
		DrillUp.g_RCard_list[5] = JSON.parse(DrillUp.parameters['战斗卡片设置']);
	}else{
		DrillUp.g_RCard_list[5] = "";
	}
	if( DrillUp.parameters['技能树卡片设置'] != "" ){
		DrillUp.g_RCard_list[6] = JSON.parse(DrillUp.parameters['技能树卡片设置']);
	}else{
		DrillUp.g_RCard_list[6] = "";
	}
	//alert(JSON.stringify(DrillUp.g_RCard_list[1]));
	
	
	DrillUp.g_RCard_is_in_window = 0;

//=============================================================================
// ** ImageManager
//=============================================================================
ImageManager.load_MenuCard = function(filename) {
    return this.loadBitmap('img/Menu__ui_card/', filename, 0, true);
};
	

//=============================================================================
// ** 选择窗口项绑定
//=============================================================================
//=============================
// * 窗口初始化，添加卡片
//=============================
var _drill_RCard_setHelpWindowItem = Window_Selectable.prototype.setHelpWindowItem;
Window_Selectable.prototype.setHelpWindowItem = function(item) {
	_drill_RCard_setHelpWindowItem.call(this, item);
	
	var item_ = item;
	if(!item_ ){ return; }
	if( item_.baseItemId ){ 	//Yep物品核心兼容
		if (DataManager.isItem( item_ )){ item_ = $dataItems[ item_.baseItemId ]; }
		if (DataManager.isWeapon( item_ )){ item_ = $dataWeapons[ item_.baseItemId ]; }
		if (DataManager.isArmor( item_ )){ item_ = $dataArmors[ item_.baseItemId ]; }
		if (DataManager.isSkill( item_ )){ item_ = $dataSkills[ item_.baseItemId ]; }
	}
			
	this.drill_setRotateCard(item_);
};
//=============================
// * 窗口销毁，隐藏卡片
//=============================
var _drill_RCard_deactivate = Window_Selectable.prototype.deactivate;
Window_Selectable.prototype.deactivate = function() {
	_drill_RCard_deactivate.call(this);
	if (this._drill_rotate_card) this._drill_rotate_card.hide();
};

//=============================
// * 设置卡片
//=============================
Window_Selectable.prototype.drill_setRotateCard = function(item) {
	if (this._drill_rotate_card){
		if (this.active && item) {
			var rect = this.itemRect(this.index());
			rect.x = rect.x + this.x;
			rect.y = rect.y + rect.height + this.y + this.standardPadding() + 4;
			rect.padding = this.standardPadding();
			this._drill_rotate_card.show();
			this._drill_rotate_card.setItem(item, rect);
		} else {
			this._drill_rotate_card.hide();
		}
	}
};

//=============================
// * 按键控制卡片
//=============================
var _drill_RCard_processHandling = Window_Selectable.prototype.processHandling;
Window_Selectable.prototype.processHandling = function() {
	_drill_RCard_processHandling.call(this);
	if (	this.isOpenAndActive() && 
			this._drill_rotate_card && 
			this.drill_isCardSwitchTriggered()) {
		
		this._drill_rotate_card._switch_visible = !this._drill_rotate_card.visible;//开关
		if( this._drill_rotate_card._switch_visible ){
			this._drill_rotate_card.show();	//按键显示卡片（刷新）	
			if(Imported.FTKR_STS && FTKR && FTKR.STS && this.constructor == Window_SkillTree) {
				// FTKR_SkillTreeSystem.js技能树插件
				this.drill_setRotateCard(this.item());
			} else {
				this.updateHelp();
			}
		}else{
			this._drill_rotate_card.hide();	//按键隐藏卡片
		}
	}
};
Window_Selectable.prototype.drill_isCardSwitchTriggered = function() {
	for (var i=0; i<DrillUp.g_RCard_btn_key.length; i++) {	//按键判断
		var key = DrillUp.g_RCard_btn_key[i];
		if (Input.isTriggered(key)) return true;
	}
	return false;
};

//=============================================================================
// ** 界面绑定
//=============================================================================

//=============================
// * 初始化
//=============================
Scene_Base.prototype.drill_RCard_create = function() {	//界面只有一个卡片

	for (var i = 0; i < DrillUp.g_RCard_list.length ; i++ ) {	//配置初始化
		if(DrillUp.g_RCard_list[i] == null || DrillUp.g_RCard_list[i] == ""){ continue ;}
		var card = DrillUp.g_RCard_list[i];
		card['img_list'] = [];
		card['img_list'][0] = ImageManager.load_MenuCard( card['资源-默认卡片正面'] );
		for (var j = 1; j <= 12 ; j++ ) {
			card['img_list'][j] = ImageManager.load_MenuCard( card['资源-卡片正面' + String(j)] );
		}
		card['img_back_list'] = [];
		card['img_back_list'][0] = ImageManager.load_MenuCard( card['资源-默认卡片背面'] );
		for (var j = 1; j <= 12 ; j++ ) {
			card['img_back_list'][j] = ImageManager.load_MenuCard( card['资源-卡片背面' + String(j)] );
		}
		card['r_speed'] = Number( card['卡片旋转速度'] || 0);
		card['is_float'] = String( card['是否使用浮动效果'] || 'true') === 'true';
		card['f_speed'] = Number( card['浮动速度'] || 0);
		card['is_degree'] = String( card['是否对齐对角线角度'] || 'true') === 'true';
		card['degree'] = Number( card['卡片斜向角度'] || 0);
		card['is_back'] = String( card['是否含有背面'] || 'true') === 'true';
		card['size'] = Number( card['默认图标缩放比例'] || 0);
	}
	//alert( DrillUp.g_RCard_list[1]['img_list'] );
	
	this._drill_RCard = new Sprite_RCard();		//实例初始化
	if (this._buyWindow) this._buyWindow._drill_rotate_card = this._drill_RCard;
	if (this._sellWindow) this._sellWindow._drill_rotate_card = this._drill_RCard;
	if (this._slotWindow) this._slotWindow._drill_rotate_card = this._drill_RCard;
	if (this._itemWindow) this._itemWindow._drill_rotate_card = this._drill_RCard;
	if (this._skillWindow) this._skillWindow._drill_rotate_card = this._drill_RCard;
	if (Imported.FTKR_STS && FTKR && FTKR.STS && this._stsSkillTreeWindow) this._stsSkillTreeWindow._drill_rotate_card = this._drill_RCard;
	this.addChild(this._drill_RCard);
};
//=============================
// * 物品界面
//=============================
var _drill_RCard_SItem_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
	_drill_RCard_SItem_create.call(this);
	if (DrillUp.g_RCard_useSceneItem){ this.drill_RCard_create();}
	DrillUp.g_RCard_is_in_window = 1;
};
//=============================
// * 技能界面
//=============================
var _drill_RCard_SSkill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
	_drill_RCard_SSkill_create.call(this);
	if (DrillUp.g_RCard_useSceneSkill){ this.drill_RCard_create();}
	DrillUp.g_RCard_is_in_window = 2;
};
//=============================
// * 装备界面
//=============================
var _drill_RCard_SEquip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
	_drill_RCard_SEquip_create.call(this);
	if (DrillUp.g_RCard_useSceneEquip){ this.drill_RCard_create();}
	DrillUp.g_RCard_is_in_window = 3;
};
//=============================
// * 商店界面
//=============================
var _drill_RCard_SShop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
	_drill_RCard_SShop_create.call(this);
	if (DrillUp.g_RCard_useSceneShop){ this.drill_RCard_create();}
	DrillUp.g_RCard_is_in_window = 4;
};
//=============================
// * 战斗界面
//=============================
var _drill_RCard_SBattle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
	_drill_RCard_SBattle_create.call(this);
	if (DrillUp.g_RCard_useSceneBattle){ this.drill_RCard_create();}
	DrillUp.g_RCard_is_in_window = 5;
};
//=============================
// * 技能树界面（FTKR_SkillTreeSystem.js）
//=============================
if(Imported.FTKR_STS && FTKR && FTKR.STS) {
	const _drill_RCard_SSTS_createSkillTreeWindow = Scene_STS.prototype.createSkillTreeWindow;
	Scene_STS.prototype.createSkillTreeWindow = function() {
		_drill_RCard_SSTS_createSkillTreeWindow.call(this);
		if (DrillUp.g_RCard_useSceneFTKR){ this.drill_RCard_create();}
		DrillUp.g_RCard_is_in_window = 6;
	};

	const _drill_RCard_WSkillTree_select = Window_SkillTree.prototype.select;
	Window_SkillTree.prototype.select = function(index) {
		_drill_RCard_WSkillTree_select.call(this, index);
		this.drill_setRotateCard(this.item());
	};
}


//=============================================================================
// ** 卡片本体
//=============================================================================
function Sprite_RCard() {
	this.initialize.apply(this, arguments);
}

Sprite_RCard.prototype = Object.create(Sprite_Base.prototype);
Sprite_RCard.prototype.constructor = Sprite_RCard;

Sprite_RCard.prototype.initialize = function() {
	Sprite_Base.prototype.initialize.call(this, 0,0,32,32);
	this._time = 0;
	this._f_time = 0;
	this.x = -Graphics.boxWidth * 2;	//刚开始移出界面
	this.y = 0;
	this._org_x = 0;
	this._org_y = 0;
	
	this._card_content = new Sprite();	//卡片内容（Sprite_RCard为卡片的外部旋转平台）
	this._card_content.anchor.x = 0.5;
	this._card_content.anchor.y = 0.5;
	this._layout = new Sprite();		//卡片框架
	this._layout.anchor.x = 0.5;
	this._layout.anchor.y = 0.5;
	this._layout_back = new Sprite();	//卡片背面
	this._layout_back.anchor.x = 0.5;
	this._layout_back.anchor.y = 0.5;
	this._item_img = new Sprite();		//卡片物品图片
	this._item_img.anchor.x = 0.5;
	this._item_img.anchor.y = 0.5;
	this.addChild(this._card_content);
	this._card_content.addChild(this._layout);
	this._card_content.addChild(this._layout_back);
	this._layout.addChild(this._item_img);
	
	this._icon_src = ImageManager.loadSystem('IconSet');
};

//=============================
// * 卡片-内容刷新（根据选项）
//=============================
Sprite_RCard.prototype.update = function() {
	var card = DrillUp.g_RCard_list[DrillUp.g_RCard_is_in_window];
	if( card == undefined || card == "" ){ return; }

	this._time += Math.abs( card['r_speed'] );
	if(this._time > 360){ this._time -= 360; }
	
	this.scale.x = Math.sin( this._time / 180 * Math.PI );
	if(card['r_speed'] == 0 ){this.scale.x = 1};
	//this._layout.skew.x = Math.sin( this._time / 180 * Math.PI ) * 0.2 ;
	//this._layout_back.skew.x = Math.sin( this._time / 180 * Math.PI )* 0.2 ;
	
	if( card['is_back'] ){
		if( this._time > 180 ){
			this._layout.visible = false;
			this._layout_back.visible = true;
		}else{
			this._layout.visible = true;
			this._layout_back.visible = false;
		}
	}
	if( card['is_float'] ){
		this._f_time += card['f_speed'];
		if(this._f_time > 360){ this._f_time -= 360; }
		this.y = this._org_y + Math.sin( this._f_time / 180 * Math.PI ) * 30;
	}
	if( this._layout.bitmap && this._layout.bitmap.isReady() ){
		if( card['is_degree'] ){
			var w = this._layout.bitmap.width;
			var h = this._layout.bitmap.height;
			this._card_content.rotation = Math.atan( w/h ) ;
		}else{
			this._card_content.rotation = card['degree'] / 180 * Math.PI;
		}
	}
};

//=============================
// * 卡片-内容刷新（根据选项）
//=============================
Sprite_RCard.prototype.setItem = function( item, rect ) {
	// FTKR_SkillTreeSystem.js 技能树插件
	if( typeof(Scene_STS) != "undefined" && this.parent.constructor == Scene_STS) { item = $dataSkills[item.id]; }

	this._item = item;
	this.refreshImage(item);
	this.refreshPosition(rect, rect.padding);
};

//=============================
// * 卡片-刷新图片
//=============================
Sprite_RCard.prototype.refreshImage = function(item) {
	//alert(JSON.stringify(item));
	var card = DrillUp.g_RCard_list[DrillUp.g_RCard_is_in_window];
	if( card == undefined || card == "" ){ return; }

	var note = String( item.note );
	var re_color = /<卡片类型:([^<>]*?)>/; 			//正则获取（返回数组，第二个为匹配内容）
	var color = (note.match(re_color)) || [];
	
	if(color != "" && color != [] ){
		var card_type = Number(color[1]);
		if( card["img_list"][card_type] == undefined || card["img_list"][card_type] == null ){
			this._layout.bitmap = card["img_list"][0];
			this._layout_back.bitmap = card["img_back_list"][0];
		}else{
			this._layout.bitmap = card["img_list"][card_type];
			this._layout_back.bitmap = card["img_back_list"][card_type];
		}
	}else{
		this._layout.bitmap = card["img_list"][0];
		this._layout_back.bitmap = card["img_back_list"][0];
	}
	
	this._item_img.bitmap = this._icon_src;
	var sx = item.iconIndex % 16 * 32;
	var sy = Math.floor(item.iconIndex / 16) * 32;
	this._item_img.setFrame(sx, sy, 32, 32);
	this._item_img.scale.x = card['size'];
	this._item_img.scale.y = card['size'];
};

//=============================
// * 卡片-刷新位置
//=============================
Sprite_RCard.prototype.refreshPosition = function(rect, padding) {
	this._org_x = Math.min(Math.max(0,rect.width - this.width) + rect.x, Graphics.boxWidth - this.width);
	this._org_y = rect.y;
	if ((this._org_y + this.height) > Graphics.boxHeight) {
		this._org_y = Math.max(rect.y - this.height - padding - rect.height,0);
	}
	if( DrillUp.g_RCard_is_in_window === 1 ){
		if( DrillUp.g_RCard_item_offset_fix){
			this._org_x = DrillUp.g_RCard_item_offsetX;
			this._org_y = DrillUp.g_RCard_item_offsetY;
		}else{
			this._org_x += DrillUp.g_RCard_item_offsetX;
			this._org_y += DrillUp.g_RCard_item_offsetY;
		}
	}else if( DrillUp.g_RCard_is_in_window === 2 ){
		if( DrillUp.g_RCard_skill_offset_fix ){
			this._org_x = DrillUp.g_RCard_skill_offsetX;
			this._org_y = DrillUp.g_RCard_skill_offsetY;
		}else{
			this._org_x += DrillUp.g_RCard_skill_offsetX;
			this._org_y += DrillUp.g_RCard_skill_offsetY;
		}
	}else if( DrillUp.g_RCard_is_in_window === 3 ){
		if( DrillUp.g_RCard_equip_offset_fix ){
			this._org_x = DrillUp.g_RCard_equip_offsetX;
			this._org_y = DrillUp.g_RCard_equip_offsetY;
		}else{
			this._org_x += DrillUp.g_RCard_equip_offsetX;
			this._org_y += DrillUp.g_RCard_equip_offsetY;
		}
	}else if( DrillUp.g_RCard_is_in_window === 4 ){
		if( DrillUp.g_RCard_shop_offset_fix ){
			this._org_x = DrillUp.g_RCard_shop_offsetX;
			this._org_y = DrillUp.g_RCard_shop_offsetY;
		}else{
			this._org_x += DrillUp.g_RCard_shop_offsetX;
			this._org_y += DrillUp.g_RCard_shop_offsetY;
		}
	}else if( DrillUp.g_RCard_is_in_window === 5 ){
		if( DrillUp.g_RCard_battle_offset_fix ){
			this._org_x = DrillUp.g_RCard_battle_offsetX;
			this._org_y = DrillUp.g_RCard_battle_offsetY;
		}else{
			this._org_x += DrillUp.g_RCard_battle_offsetX;
			this._org_y += DrillUp.g_RCard_battle_offsetY;
		}
	}else if( DrillUp.g_RCard_is_in_window === 6 ){
		if( DrillUp.g_RCard_FTKR_offset_fix  ){
			this._org_x = DrillUp.g_RCard_FTKR_offsetX;
			this._org_y = DrillUp.g_RCard_FTKR_offsetY;
		}else{
			this._org_x += DrillUp.g_RCard_FTKR_offsetX;
			this._org_y += DrillUp.g_RCard_FTKR_offsetY;
		}
	}
	this.x = this._org_x;
	this.y = this._org_y;
	
};