//=============================================================================
// Drill_RotateCard.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        控件 - 旋转卡牌
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
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也可以与其他插件组合使用。
 * 被扩展：
 *   - Drill_X_ItemImage        控件-物品+技能详细图片[扩展]
 *     通过该插件，卡片中的图标可以换成高清图片。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以作用于物品、技能、装备、商店、战斗等界面。
 * 细节：
 *   (1.如果你只想卡片浮动，旋转速度设置为0就可以了。
 *   (2.每个界面的卡片类型(装备界面/技能界面/物品界面)都可以不一样，
 *      你可以对界面单独设置不同的卡片背景图。
 *   (3.注意，这里设置的是卡片类型，用于表示一种卡片的背景样式。
 *      如果你要对具体物品来改变图像，建议使用扩展插件：
 *      Drill_X_ItemImage 物品+技能详细图片[扩展]。
 *   (4.该插件现在已支持YEP物品核心插件。
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
 * 测试方法：   进入物品界面，并进行测试。
 * 测试结果：   菜单界面中，平均消耗为：【7.04ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.旋转卡牌在界面中只有一个，内部只含5个贴图，消耗不多。
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
 * [v1.5]
 * 优化了内部结构。
 *
 *
 * @param 切换按钮
 * @type text[]
 * @desc 切换该窗口是否显示的按钮。tab的设置意思是，按tab会隐藏窗口，再按会显示。
 * @default ["tab","menu"]
 *
 * @param ---物品界面---
 * @default 
 *
 * @param 是否启用物品界面卡片
 * @parent ---物品界面---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 物品卡片设置
 * @parent ---物品界面---
 * @type struct<RotateCardSet>
 * @desc 物品界面的卡片设置。
 * @default {}
 *
 * @param 是否固定物品界面坐标
 * @parent ---物品界面---
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-物品界面窗口 X
 * @parent ---物品界面---
 * @desc x轴方向平移，单位像素。如果是自适应，就为偏移量，正数向右，负数向左，如果是固定，0为贴在最左边。
 * @default 110
 *
 * @param 平移-物品界面窗口 Y
 * @parent ---物品界面---
 * @desc y轴方向平移，单位像素。如果是自适应，就为偏移量，正数向下，负数向上，如果是固定，0为贴在最上面。
 * @default 280
 *
 * @param ---技能界面---
 * @default 
 *
 * @param 是否启用技能界面卡片
 * @parent ---技能界面---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 技能卡片设置
 * @parent ---技能界面---
 * @type struct<RotateCardSet>
 * @desc 技能界面的卡片设置。
 * @default {}
 *
 * @param 是否固定技能界面坐标
 * @parent ---技能界面---
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-技能界面窗口 X
 * @parent ---技能界面---
 * @desc x轴方向平移，单位像素。如果是自适应，就为偏移量，正数向右，负数向左，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-技能界面窗口 Y
 * @parent ---技能界面---
 * @desc y轴方向平移，单位像素。如果是自适应，就为偏移量，正数向下，负数向上，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param ---装备界面---
 * @default 
 *
 * @param 是否启用装备界面卡片
 * @parent ---装备界面---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 装备卡片设置
 * @parent ---装备界面---
 * @type struct<RotateCardSet>
 * @desc 装备界面的卡片设置。
 * @default {}
 *
 * @param 是否固定装备界面坐标
 * @parent ---装备界面---
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-装备界面窗口 X
 * @parent ---装备界面---
 * @desc x轴方向平移，单位像素。如果是自适应，就为偏移量，正数向右，负数向左，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-装备界面窗口 Y
 * @parent ---装备界面---
 * @desc y轴方向平移，单位像素。如果是自适应，就为偏移量，正数向下，负数向上，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param ---商店界面---
 * @default 
 *
 * @param 是否启用商店界面卡片
 * @parent ---商店界面---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 商店卡片设置
 * @parent ---商店界面---
 * @type struct<RotateCardSet>
 * @desc 商店界面的卡片设置。
 * @default {}
 *
 * @param 是否固定商店界面坐标
 * @parent ---商店界面---
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-商店界面窗口 X
 * @parent ---商店界面---
 * @desc x轴方向平移，单位像素。如果是自适应，就为偏移量，正数向右，负数向左，如果是固定，0为贴在最左边。
 * @default 110
 *
 * @param 平移-商店界面窗口 Y
 * @parent ---商店界面---
 * @desc y轴方向平移，单位像素。如果是自适应，就为偏移量，正数向下，负数向上，如果是固定，0为贴在最上面。
 * @default 280
 *
 * @param ---战斗界面---
 * @default 
 *
 * @param 是否启用战斗界面卡片
 * @parent ---战斗界面---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 *
 * @param 战斗卡片设置
 * @parent ---战斗界面---
 * @type struct<RotateCardSet>
 * @desc 战斗界面的卡片设置。
 * @default {}
 *
 * @param 是否固定战斗界面坐标
 * @parent ---战斗界面---
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default false
 *
 * @param 平移-战斗界面窗口 X
 * @parent ---战斗界面---
 * @desc x轴方向平移，单位像素。如果是自适应，就为偏移量，正数向右，负数向左，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-战斗界面窗口 Y
 * @parent ---战斗界面---
 * @desc y轴方向平移，单位像素。如果是自适应，就为偏移量，正数向下，负数向上，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param ---技能树界面---
 * @default 
 *
 * @param 是否启用技能树界面卡片
 * @parent ---技能树界面---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，需要导入FTKR技能树插件。
 * @default false
 *
 * @param 技能树卡片设置
 * @parent ---技能树界面---
 * @type struct<RotateCardSet>
 * @desc 技能树界面的卡片设置。
 * @default {}
 *
 * @param 是否固定FTKR技能树界面坐标
 * @parent ---技能树界面---
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default false
 *
 * @param 平移-FTKR技能树界面窗口 X
 * @parent ---技能树界面---
 * @desc x轴方向平移，单位像素。如果是自适应，就为偏移量，正数向右，负数向左，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-FTKR技能树界面窗口 Y
 * @parent ---技能树界面---
 * @desc y轴方向平移，单位像素。如果是自适应，就为偏移量，正数向下，负数向上，如果是固定，0为贴在最上面。
 * @default 0
 *
 */
 /*~struct~RotateCardSet:
 * 
 * @param ---常规---
 * @default 
 *
 * @param 卡片旋转速度
 * @parent ---常规---
 * @desc 卡片旋转的速度，单位 度/帧。设置1表示60帧里卡片旋转60度。（1秒60帧）
 * @default 1.5
 *
 * @param 是否使用浮动效果
 * @parent ---常规---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用。
 * @default true
 *
 * @param 浮动速度
 * @parent ---常规---
 * @parent 是否使用浮动效果
 * @desc 浮动的速度，单位 像素/帧。
 * @default 1.0
 *
 * @param 是否对齐对角线角度
 * @parent ---常规---
 * @type boolean
 * @on 自动对齐
 * @off 手动设置
 * @desc 卡片将根据对角线，自动倾斜，你也可以手动设置卡片斜向角度。
 * @default true
 *
 * @param 卡片斜向角度
 * @parent ---常规---
 * @parent 是否对齐对角线角度
 * @type number
 * @min 0
 * @max 180
 * @desc 手动设置卡片斜向角度，单位度。
 * @default 30
 *
 * @param 是否含有背面
 * @parent ---常规---
 * @type boolean
 * @on 含
 * @off 不含
 * @desc true - 含，false - 不含。使得卡片有正反面。
 * @default true
 *
 * @param 默认图标缩放比例
 * @parent ---常规---
 * @desc 物品的默认图标绘制在卡片上的大小，1.00为原始大小。
 * @default 1.50
 * 
 * @param ---卡面设置---
 * @default 
 *
 * @param 资源-默认卡片正面
 * @parent ---卡面设置---
 * @desc 卡片正面的图片资源。默认为类型0。
 * @default 旋转卡牌-默认正面
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-默认卡片背面
 * @parent ---卡面设置---
 * @desc 卡片背面的图片资源，如果没有背面，可以不设置。默认为类型0。
 * @default 旋转卡牌-默认背面
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面1
 * @parent ---卡面设置---
 * @desc 类型1的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面1
 * @parent ---卡面设置---
 * @desc 类型1的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面2
 * @parent ---卡面设置---
 * @desc 类型2的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面2
 * @parent ---卡面设置---
 * @desc 类型2的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面3
 * @parent ---卡面设置---
 * @desc 类型3的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面3
 * @parent ---卡面设置---
 * @desc 类型3的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面4
 * @parent ---卡面设置---
 * @desc 类型4的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面4
 * @parent ---卡面设置---
 * @desc 类型4的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面5
 * @parent ---卡面设置---
 * @desc 类型5的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面5
 * @parent ---卡面设置---
 * @desc 类型5的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面6
 * @parent ---卡面设置---
 * @desc 类型6的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面6
 * @parent ---卡面设置---
 * @desc 类型6的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面7
 * @parent ---卡面设置---
 * @desc 类型7的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面7
 * @parent ---卡面设置---
 * @desc 类型7的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面8
 * @parent ---卡面设置---
 * @desc 类型8的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面8
 * @parent ---卡面设置---
 * @desc 类型8的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面9
 * @parent ---卡面设置---
 * @desc 类型9的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面9
 * @parent ---卡面设置---
 * @desc 类型9的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面10
 * @parent ---卡面设置---
 * @desc 类型10的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面10
 * @parent ---卡面设置---
 * @desc 类型10的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面11
 * @parent ---卡面设置---
 * @desc 类型11的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面11
 * @parent ---卡面设置---
 * @desc 类型11的卡片背面的图片资源，如果没有背面，可以不设置。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片正面12
 * @parent ---卡面设置---
 * @desc 类型12的卡片正面的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_card/
 * @type file
 *
 * @param 资源-卡片背面12
 * @parent ---卡面设置---
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
//		临时局部变量	this._drill_RCard_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	菜单界面
//		★性能测试消耗	消耗太小没有找到。
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
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

//=============================================================================
// ** 变量获取
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_RotateCard = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_RotateCard');
	
	//==============================
	// * 变量获取 - 卡片设置
	//				（~struct~RotateCardSet）
	//==============================
	DrillUp.drill_RCard_initRotateCardSet = function( dataFrom ) {
		var data = {};
		
		data['r_speed'] = Number( dataFrom['卡片旋转速度'] || 0);
		data['is_float'] = String( dataFrom['是否使用浮动效果'] || 'true') === 'true';
		data['f_speed'] = Number( dataFrom['浮动速度'] || 0);
		data['is_degree'] = String( dataFrom['是否对齐对角线角度'] || 'true') === 'true';
		data['degree'] = Number( dataFrom['卡片斜向角度'] || 0);
		data['is_back'] = String( dataFrom['是否含有背面'] || 'true') === 'true';
		data['size'] = Number( dataFrom['默认图标缩放比例'] || 0);
		
		data['img_list'] = [];
		data['img_list'][0] = String( dataFrom['资源-默认卡片正面'] || "" );
		for( var j = 1; j <= 12 ; j++ ){
			data['img_list'][j] = String( dataFrom['资源-卡片正面' + String(j)] || "" );
		}
		data['img_back_list'] = [];
		data['img_back_list'][0] = String( dataFrom['资源-默认卡片背面'] || "" );
		for( var j = 1; j <= 12 ; j++ ){
			data['img_back_list'][j] = String( dataFrom['资源-卡片背面' + String(j)] || "" );
		}
		
		return data;
	}
	
	/*-----------------杂项------------------*/
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
	
	/*-----------------卡片设置------------------*/
	DrillUp.g_RCard_setting = {};
	if( DrillUp.parameters['物品卡片设置'] != "" &&
		DrillUp.parameters['物品卡片设置'] != undefined ){
		var data = JSON.parse(DrillUp.parameters['物品卡片设置']);
		DrillUp.g_RCard_setting["Scene_Item"] = DrillUp.drill_RCard_initRotateCardSet( data );
	}else{
		DrillUp.g_RCard_setting["Scene_Item"] = null;
	}
	if( DrillUp.parameters['技能卡片设置'] != "" &&
		DrillUp.parameters['技能卡片设置'] != undefined ){
		var data = JSON.parse(DrillUp.parameters['技能卡片设置']);
		DrillUp.g_RCard_setting["Scene_Skill"] = DrillUp.drill_RCard_initRotateCardSet( data );
	}else{
		DrillUp.g_RCard_setting["Scene_Skill"] = null;
	}
	if( DrillUp.parameters['装备卡片设置'] != "" &&
		DrillUp.parameters['装备卡片设置'] != undefined ){
		var data = JSON.parse(DrillUp.parameters['装备卡片设置']);
		DrillUp.g_RCard_setting["Scene_Equip"] = DrillUp.drill_RCard_initRotateCardSet( data );
	}else{
		DrillUp.g_RCard_setting["Scene_Equip"] = null;
	}
	if( DrillUp.parameters['商店卡片设置'] != "" &&
		DrillUp.parameters['商店卡片设置'] != undefined ){
		var data = JSON.parse(DrillUp.parameters['商店卡片设置']);
		DrillUp.g_RCard_setting["Scene_Shop"] = DrillUp.drill_RCard_initRotateCardSet( data );
	}else{
		DrillUp.g_RCard_setting["Scene_Shop"] = null;
	}
	if( DrillUp.parameters['战斗卡片设置'] != "" &&
		DrillUp.parameters['战斗卡片设置'] != undefined ){
		var data = JSON.parse(DrillUp.parameters['战斗卡片设置']);
		DrillUp.g_RCard_setting["Scene_Battle"] = DrillUp.drill_RCard_initRotateCardSet( data );
	}else{
		DrillUp.g_RCard_setting["Scene_Battle"] = null;
	}
	if( DrillUp.parameters['技能树卡片设置'] != "" &&
		DrillUp.parameters['技能树卡片设置'] != undefined ){
		var data = JSON.parse(DrillUp.parameters['技能树卡片设置']);
		DrillUp.g_RCard_setting["Scene_STS"] = DrillUp.drill_RCard_initRotateCardSet( data );
	}else{
		DrillUp.g_RCard_setting["Scene_STS"] = null;
	}
	
	DrillUp.g_RCard_curScene = "";
	
	
//=============================================================================
// ** 文件夹路径
//=============================================================================
ImageManager.load_MenuCard = function( filename ){
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
	
	var temp_item = item;
	if( temp_item == undefined ){ return; }
	if( temp_item.baseItemId ){ 	//（Yep物品核心兼容，改变指针）
		if( DataManager.isItem( temp_item )){ temp_item = $dataItems[ temp_item.baseItemId ]; }
		if( DataManager.isWeapon( temp_item )){ temp_item = $dataWeapons[ temp_item.baseItemId ]; }
		if( DataManager.isArmor( temp_item )){ temp_item = $dataArmors[ temp_item.baseItemId ]; }
		if( DataManager.isSkill( temp_item )){ temp_item = $dataSkills[ temp_item.baseItemId ]; }
	}
			
	this.drill_setRotateCard( temp_item );
};
//=============================
// * 窗口销毁，隐藏卡片
//=============================
var _drill_RCard_deactivate = Window_Selectable.prototype.deactivate;
Window_Selectable.prototype.deactivate = function() {
	_drill_RCard_deactivate.call(this);
	if( this._drill_RCardSprite == undefined ){ return; }
	this._drill_RCardSprite.hide();
};
//=============================
// * 设置卡片
//=============================
Window_Selectable.prototype.drill_setRotateCard = function(item) {
	if( this._drill_RCardSprite == undefined ){ return; }
	if( this.active && item ){
		var rect = this.itemRect(this.index());
		rect.x = rect.x + this.x;
		rect.y = rect.y + rect.height + this.y + this.standardPadding() + 4;
		rect.padding = this.standardPadding();
		this._drill_RCardSprite.show();
		this._drill_RCardSprite.drill_setItem(item, rect);
	}else{
		this._drill_RCardSprite.hide();
	}
};

//=============================
// * 按键控制卡片
//=============================
var _drill_RCard_processHandling = Window_Selectable.prototype.processHandling;
Window_Selectable.prototype.processHandling = function() {
	_drill_RCard_processHandling.call(this);
	if( this._drill_RCardSprite == undefined ){ return; }
	if( this.isOpenAndActive() && this.drill_isCardSwitchTriggered() ){
		
		this._drill_RCardSprite._switch_visible = !this._drill_RCardSprite.visible;	//开关
		if( this._drill_RCardSprite._switch_visible ){
			this._drill_RCardSprite.show();	//按键显示卡片（刷新）	
			
			// >【FTKR_SkillTreeSystem.js技能树插件】
			if( Imported.FTKR_STS && FTKR && FTKR.STS && this.constructor == Window_SkillTree ){
				this.drill_setRotateCard(this.item());
			}else{
				this.updateHelp();
			}
		}else{
			this._drill_RCardSprite.hide();	//按键隐藏卡片
		}
	}
};
Window_Selectable.prototype.drill_isCardSwitchTriggered = function() {
	for(var i=0; i<DrillUp.g_RCard_btn_key.length; i++ ){	//按键判断
		var key = DrillUp.g_RCard_btn_key[i];
		if( Input.isTriggered(key) ){
			return true; 
		}
	}
	return false;
};

//=============================================================================
// ** 界面绑定
//============================================================================
//=============================
// * 界面 - 创建
//=============================
Scene_Base.prototype.drill_RCard_create = function() {
	
	// > 创建卡片贴图（界面只有一个卡片）
	this._drill_scene_RCardSprite = new Drill_RCardSprite();
	this.addChild(this._drill_scene_RCardSprite);
	
	if( this._buyWindow ){ this._buyWindow._drill_RCardSprite = this._drill_scene_RCardSprite; }
	if( this._sellWindow ){ this._sellWindow._drill_RCardSprite = this._drill_scene_RCardSprite; }
	if( this._slotWindow ){ this._slotWindow._drill_RCardSprite = this._drill_scene_RCardSprite; }
	if( this._itemWindow ){ this._itemWindow._drill_RCardSprite = this._drill_scene_RCardSprite; }
	if( this._skillWindow ){ this._skillWindow._drill_RCardSprite = this._drill_scene_RCardSprite; }
	
	// >【FTKR_SkillTreeSystem.js技能树插件】
	if( Imported.FTKR_STS && FTKR && FTKR.STS && this._stsSkillTreeWindow ){ this._stsSkillTreeWindow._drill_RCardSprite = this._drill_scene_RCardSprite; }
};
//=============================
// * 界面 - 物品界面
//=============================
var _drill_RCard_SItem_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
	_drill_RCard_SItem_create.call(this);
	if( DrillUp.g_RCard_useSceneItem == true ){ this.drill_RCard_create(); }
	DrillUp.g_RCard_curScene = "Scene_Item";
};
//=============================
// * 界面 - 技能界面
//=============================
var _drill_RCard_SSkill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
	_drill_RCard_SSkill_create.call(this);
	if( DrillUp.g_RCard_useSceneSkill == true ){ this.drill_RCard_create(); }
	DrillUp.g_RCard_curScene = "Scene_Skill";
};
//=============================
// * 界面 - 装备界面
//=============================
var _drill_RCard_SEquip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
	_drill_RCard_SEquip_create.call(this);
	if( DrillUp.g_RCard_useSceneEquip == true ){ this.drill_RCard_create(); }
	DrillUp.g_RCard_curScene = "Scene_Equip";
};
//=============================
// * 界面 - 商店界面
//=============================
var _drill_RCard_SShop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
	_drill_RCard_SShop_create.call(this);
	if( DrillUp.g_RCard_useSceneShop == true ){ this.drill_RCard_create(); }
	DrillUp.g_RCard_curScene = "Scene_Shop";
};
//=============================
// * 界面 - 战斗界面
//=============================
var _drill_RCard_SBattle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
	_drill_RCard_SBattle_create.call(this);
	if( DrillUp.g_RCard_useSceneBattle == true ){ this.drill_RCard_create(); }
	DrillUp.g_RCard_curScene = "Scene_Battle";
};
//=============================
// * 界面 - 技能树界面【FTKR_SkillTreeSystem.js技能树插件】
//=============================
if( Imported.FTKR_STS && FTKR && FTKR.STS ){
	var _drill_RCard_SSTS_createSkillTreeWindow = Scene_STS.prototype.createSkillTreeWindow;
	Scene_STS.prototype.createSkillTreeWindow = function() {
		_drill_RCard_SSTS_createSkillTreeWindow.call(this);
		if( DrillUp.g_RCard_useSceneFTKR == true ){ this.drill_RCard_create(); }
		DrillUp.g_RCard_curScene = "Scene_STS";
	};

	var _drill_RCard_WSkillTree_select = Window_SkillTree.prototype.select;
	Window_SkillTree.prototype.select = function( index ){
		_drill_RCard_WSkillTree_select.call(this, index);
		this.drill_setRotateCard(this.item());
	};
};


//=============================================================================
// ** 卡片贴图【Drill_RCardSprite】
//			
//	 		代码：	> 范围 - 该类显示单独的角色框。
//					> 结构 - [合并/分离/ ●混乱 ] 该类的参数对外开放。
//					> 数量 - [ ●单个 /多个] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁 ] 
//					> 样式 - [不可修改/自变化/ ●外部变化 ] 卡片样式全由外部进行控制。
//=============================================================================
//==============================
// * 卡片贴图 - 定义
//==============================
function Drill_RCardSprite() {
	this.initialize.apply(this, arguments);
}
Drill_RCardSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_RCardSprite.prototype.constructor = Drill_RCardSprite;
//==============================
// * 卡片贴图 - 初始化
//==============================
Drill_RCardSprite.prototype.initialize = function() {
	Sprite_Base.prototype.initialize.call(this);
	
	this._drill_time = 0;
	this._drill_floatTime = 0;
	this._drill_orgX = 0;
	this._drill_orgY = 0;
	
	// > 私有属性初始化
	this.x = Graphics.boxWidth * (-2);	//（刚开始移出界面）
	this.y = 0;
	
	this.drill_createLayer();
};
//=============================
// * 卡片贴图 - 帧刷新
//=============================
Drill_RCardSprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	
	if( DrillUp.g_RCard_curScene == "" ){ return; }
	var card = DrillUp.g_RCard_setting[ DrillUp.g_RCard_curScene ];
	if( card == undefined ){ return; }
	
	// > 旋转变化
	this._drill_time += Math.abs( card['r_speed'] );
	if( this._drill_time > 360 ){ this._drill_time -= 360; }
	
	// > 缩放变化
	this.scale.x = Math.sin( this._drill_time / 180 * Math.PI );
	if( card['r_speed'] == 0 ){ this.scale.x = 1; }
	//this._drill_front.skew.x = Math.sin( this._drill_time / 180 * Math.PI ) * 0.2 ;
	//this._drill_back.skew.x = Math.sin( this._drill_time / 180 * Math.PI )* 0.2 ;
	
	// > 双面反转
	if( card['is_back'] == true ){
		if( this._drill_time > 180 ){
			this._drill_front.visible = false;
			this._drill_back.visible = true;
		}else{
			this._drill_front.visible = true;
			this._drill_back.visible = false;
		}
	}
	
	// > 位置变化
	var xx = this._drill_orgX;
	var yy = this._drill_orgY;
	if( card['is_float'] == true ){		//（浮动效果）
		this._drill_floatTime += card['f_speed'];
		if(this._drill_floatTime > 360){ this._drill_floatTime -= 360; }
		yy = yy + Math.sin( this._drill_floatTime / 180 * Math.PI ) * 30;
	}
	this.x = xx;
	this.y = yy;
	
	// > 对角旋转
	if( this._drill_front.bitmap && this._drill_front.bitmap.isReady() ){
		if( card['is_degree'] == true ){
			var w = this._drill_front.bitmap.width;
			var h = this._drill_front.bitmap.height;
			this._drill_layer.rotation = Math.atan( w/h ) ;
		}else{
			this._drill_layer.rotation = card['degree'] / 180 * Math.PI;
		}
	}
};

//=============================
// * 创建 - 卡片内容
//=============================
Drill_RCardSprite.prototype.drill_createLayer = function(){
	
	// > 图标bitmap
	this._icon_bitmap = ImageManager.loadSystem('IconSet');
	
	// > 卡片内容（Drill_RCardSprite为卡片的外部旋转平台）
	this._drill_layer = new Sprite();
	this._drill_layer.anchor.x = 0.5;
	this._drill_layer.anchor.y = 0.5;
	this.addChild(this._drill_layer);
	
	// > 卡片框架
	this._drill_front = new Sprite();
	this._drill_front.anchor.x = 0.5;
	this._drill_front.anchor.y = 0.5;
	this._drill_layer.addChild(this._drill_front);
	
	// > 卡片背面
	this._drill_back = new Sprite();
	this._drill_back.anchor.x = 0.5;
	this._drill_back.anchor.y = 0.5;
	this._drill_layer.addChild(this._drill_back);
	
	// > 卡片物品图片
	this._drill_itemIconSprite = new Sprite();
	this._drill_itemIconSprite.anchor.x = 0.5;
	this._drill_itemIconSprite.anchor.y = 0.5;
	this._drill_front.addChild(this._drill_itemIconSprite);
}

//=============================
// * 卡片贴图 - 内容刷新（接口，根据选项调用）
//=============================
Drill_RCardSprite.prototype.drill_setItem = function( item, rect ){
	// FTKR_SkillTreeSystem.js 技能树插件
	if( typeof(Scene_STS) != "undefined" && this.parent.constructor == Scene_STS ){ item = $dataSkills[item.id]; }

	this._item = item;
	this.drill_refreshImage(item);
	this.drill_refreshPosition(rect, rect.padding);
};
//=============================
// * 卡片贴图 - 刷新图片
//=============================
Drill_RCardSprite.prototype.drill_refreshImage = function( item ){
	if( DrillUp.g_RCard_curScene == "" ){ return; }
	var card = DrillUp.g_RCard_setting[ DrillUp.g_RCard_curScene ];
	if( card == undefined ){ return; }
	
	var note = String( item.note );
	var re_color = /<卡片类型:([^<>]*?)>/;		//正则获取（返回数组，第二个为匹配内容）
	var data_color = note.match(re_color);
	if( data_color != undefined ){
		var card_type = Number(data_color[1]);
		if( card["img_list"][card_type] == undefined ){
			this._drill_front.bitmap = ImageManager.load_MenuCard( card["img_list"][0] );
			this._drill_back.bitmap = ImageManager.load_MenuCard( card["img_back_list"][0] );
		}else{
			this._drill_front.bitmap = ImageManager.load_MenuCard( card["img_list"][card_type] );
			this._drill_back.bitmap = ImageManager.load_MenuCard( card["img_back_list"][card_type] );
		}
	}else{
		this._drill_front.bitmap = ImageManager.load_MenuCard( card["img_list"][0] );
		this._drill_back.bitmap = ImageManager.load_MenuCard( card["img_back_list"][0] );
	}
	
	// > 设置卡片的图标
	var sx = item.iconIndex % 16 * 32;
	var sy = Math.floor(item.iconIndex / 16) * 32;
	this._drill_itemIconSprite.bitmap = this._icon_bitmap;
	this._drill_itemIconSprite.setFrame(sx, sy, 32, 32);
	this._drill_itemIconSprite.scale.x = card['size'];
	this._drill_itemIconSprite.scale.y = card['size'];
};
//=============================
// * 卡片贴图 - 刷新位置
//=============================
Drill_RCardSprite.prototype.drill_refreshPosition = function(rect, padding) {
	var xx = Math.min(Math.max(0,rect.width - this.width) + rect.x, Graphics.boxWidth - this.width);
	var yy = rect.y;
	if((yy + this.height) > Graphics.boxHeight ){
		yy = Math.max(rect.y - this.height - padding - rect.height,0);
	}
	if( DrillUp.g_RCard_curScene == "Scene_Item" ){
		if( DrillUp.g_RCard_item_offset_fix == true ){
			xx = DrillUp.g_RCard_item_offsetX;
			yy = DrillUp.g_RCard_item_offsetY;
		}else{
			xx += DrillUp.g_RCard_item_offsetX;
			yy += DrillUp.g_RCard_item_offsetY;
		}
	}
	if( DrillUp.g_RCard_curScene == "Scene_Skill" ){
		if( DrillUp.g_RCard_skill_offset_fix == true ){
			xx = DrillUp.g_RCard_skill_offsetX;
			yy = DrillUp.g_RCard_skill_offsetY;
		}else{
			xx += DrillUp.g_RCard_skill_offsetX;
			yy += DrillUp.g_RCard_skill_offsetY;
		}
	}
	if( DrillUp.g_RCard_curScene == "Scene_Equip" ){
		if( DrillUp.g_RCard_equip_offset_fix == true ){
			xx = DrillUp.g_RCard_equip_offsetX;
			yy = DrillUp.g_RCard_equip_offsetY;
		}else{
			xx += DrillUp.g_RCard_equip_offsetX;
			yy += DrillUp.g_RCard_equip_offsetY;
		}
	}
	if( DrillUp.g_RCard_curScene == "Scene_Shop" ){
		if( DrillUp.g_RCard_shop_offset_fix == true ){
			xx = DrillUp.g_RCard_shop_offsetX;
			yy = DrillUp.g_RCard_shop_offsetY;
		}else{
			xx += DrillUp.g_RCard_shop_offsetX;
			yy += DrillUp.g_RCard_shop_offsetY;
		}
	}
	if( DrillUp.g_RCard_curScene == "Scene_Battle" ){
		if( DrillUp.g_RCard_battle_offset_fix == true ){
			xx = DrillUp.g_RCard_battle_offsetX;
			yy = DrillUp.g_RCard_battle_offsetY;
		}else{
			xx += DrillUp.g_RCard_battle_offsetX;
			yy += DrillUp.g_RCard_battle_offsetY;
		}
	}
	if( DrillUp.g_RCard_curScene == "Scene_STS" ){
		if( DrillUp.g_RCard_FTKR_offset_fix == true ){
			xx = DrillUp.g_RCard_FTKR_offsetX;
			yy = DrillUp.g_RCard_FTKR_offsetY;
		}else{
			xx += DrillUp.g_RCard_FTKR_offsetX;
			yy += DrillUp.g_RCard_FTKR_offsetY;
		}
	}
	this._drill_orgX = xx;
	this._drill_orgY = yy;
};