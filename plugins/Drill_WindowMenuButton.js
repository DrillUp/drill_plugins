//=============================================================================
// Drill_WindowMenuButton.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        控件 - 主菜单选项按钮管理器
 * @author Drill_up
 * 
 * @Drill_LE_param "菜单按钮-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_WMB_btns_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_WindowMenuButton +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 针对主菜单的选项窗口进行控制的插件，你可以控制按钮或者添加新按钮。
 * ★★必须放在所有 面板类 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 作用于：
 *   - Drill_SceneMain            面板-全自定义主菜单面板
 *     与目标插件通过关键字相互联系，可以控制其顺序与显示。
 * 被扩展：
 *   - Drill_LayerCommandThread   地图-多线程
 *     多线程插件可以使得 自定义按钮 的公共事件执行 串行/并行 操作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面
 *   只针对 主菜单选项窗口 的按钮 进行控制。
 * 按钮关键字：
 *   (1.关键字是识别一切按钮的关键，你可以通过关键字控制主菜单中
 *      任何按钮的显示与隐藏。
 *   (2.关键字的大小写敏感，必须完全匹配。
 *      更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 按钮状态：
 *   (1.DEBUG-显示状态列表可以看到所有按钮的状态，进入主菜单时弹出。
 *      状态中如果显示"未找到"，说明你的关键字错误，或者按钮没添加到
 *      菜单中。
 *   (2.按钮可以控制显示/隐藏，但是如果你一开始就没有添加该按钮。
 *      那么控制显示是没有任何效果的。
 * 自定义按钮：
 *   (1.你可以直接自己定义新的按钮关键字，并绑定公共事件。但是必须确
 *      保关键字独一无二。全自定义主菜单中设置的按钮与关键字，将与你
 *      的新按钮对应上。
 *   (2.在菜单界面中，游戏是处于暂停状态的，因此你在不离开菜单的情况
 *      下，只能执行脚本。按钮的公共事件需要切出菜单来执行。
 * 公共事件：
 *   (1.地图公共事件的执行可通过 地图-多线程 插件来控制。
 *      可选择串行与并行，具体看看 "31.公共事件 > 关于公共事件与并行.docx"。
 *   (2.注意，对话框事件指令 是特殊的指令体，只要执行对话框，就会强
 *      制串行，阻塞其他所有事件的线程。
 * 设计：
 *   (1.你可以用按钮管理器，添加公共事件到主菜单面板中。
 *      比如示例中进入到 设计谜题 时，可以执行 卡关按钮 的公共事件，
 *      瞬间回到迷宫起始点，用于防玩家卡关情况。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制任何按钮的显示情况。
 *
 * 插件指令：>主菜单按钮 : item : 隐藏
 * 插件指令：>主菜单按钮 : item : 显示
 * 插件指令：>主菜单按钮 : item : 优先级 : 20
 * 
 * 插件指令：>主菜单按钮 : item : 隐藏
 * 插件指令：>主菜单按钮 : skill : 隐藏
 * 插件指令：>主菜单按钮 : equip : 隐藏
 * 插件指令：>主菜单按钮 : status : 隐藏
 * 插件指令：>主菜单按钮 : formation : 隐藏
 * 插件指令：>主菜单按钮 : options : 隐藏
 * 插件指令：>主菜单按钮 : save : 隐藏
 * 插件指令：>主菜单按钮 : gameEnd : 隐藏
 * 插件指令：>主菜单按钮 : Drill_SSpA : 隐藏
 *
 * 1.关键字适用于任何 已加入菜单 的按钮。
 *   注意，必须是已加入菜单的按钮，按钮都没加入菜单，是显示不出来的。
 * 2.关键字的大小写敏感，必须完全匹配。
 * 3."优先级"控制按钮顺序，优先级高的排前面，优先级低的排后面。
 *   优先级相同的，菜单插件添加的按钮根据插件顺序排。
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n^3)
 * 测试方法：   打开主菜单界面，进行性能测试。
 * 测试结果：   菜单界面中，插件的消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.按钮插件只控制进入菜单的一瞬间，对选项窗口进行拦截，所以不
 *   会造成任何负担。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了内部结构。
 * [v1.2]
 * 修改了插件注释说明。
 * [v1.3]
 * 修改优化了插件内部结构。
 * [v1.4]
 * 优化了旧存档的识别与兼容。
 * 
 *
 * @param DEBUG-显示状态列表
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，进入菜单，将弹出各按钮的全部状态列表信息。
 * @default false
 *
 * @param 按钮默认优先级
 * @type number
 * @min 0
 * @desc 其它菜单插件新加的按钮所处的默认优先级，你可以后期通过插件指令调整优先级。
 * @default 40
 *
 * @param ----默认按钮----
 * @default 
 *
 * @param 是否显示道具按钮
 * @parent ----默认按钮----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示技能按钮
 * @parent ----默认按钮----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示装备按钮
 * @parent ----默认按钮----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示状态按钮
 * @parent ----默认按钮----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示队形按钮
 * @parent ----默认按钮----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示选项按钮
 * @parent ----默认按钮----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。系统按钮，一般都需要显示。
 * @default true
 *
 * @param 是否显示保存按钮
 * @parent ----默认按钮----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示游戏结束按钮
 * @parent ----默认按钮----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。系统按钮，一般都需要显示。
 * @default true
 *
 * @param 道具按钮优先级
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @desc 道具按钮的优先级。优先级高的按钮靠前。
 * @default 100
 *
 * @param 技能按钮优先级
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @desc 技能按钮的优先级。优先级高的按钮靠前。
 * @default 99
 *
 * @param 装备按钮优先级
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @desc 装备按钮的优先级。优先级高的按钮靠前。
 * @default 98
 *
 * @param 状态按钮优先级
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @desc 状态按钮的优先级。优先级高的按钮靠前。
 * @default 97
 *
 * @param 队形按钮优先级
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @desc 队形按钮的优先级。优先级高的按钮靠前。
 * @default 96
 *
 * @param 选项按钮优先级
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @desc 选项按钮的优先级。优先级高的按钮靠前。
 * @default 3
 *
 * @param 保存按钮优先级
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @desc 保存按钮的优先级。优先级高的按钮靠前。
 * @default 2
 *
 * @param 游戏结束按钮优先级
 * @parent ----默认按钮----
 * @type number
 * @min 0
 * @desc 游戏结束按钮的优先级。优先级高的按钮靠前。
 * @default 1
 *
 *
 * @param ----自定义按钮----
 * @default 
 *
 * @param 菜单按钮-1
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-2
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-3
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-4
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-5
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-6
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-7
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-8
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-9
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-10
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-11
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-12
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-13
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-14
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-15
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-16
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-17
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-18
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-19
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-20
 * @parent ----自定义按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * 
 */
/*~struct~MenuBtn:
 * 
 * @param 标记
 * @desc 用于区分你设置的颜色的说明注释，脚本中不起作用。
 * @default ==新的按钮==
 *
 * @param 是否初始显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 按钮名称
 * @desc 新增的按钮的名称。
 * @default 新按钮
 *
 * @param 按钮关键字
 * @desc 你需要设置一个给主菜单去识别的关键字。注意，关键字必须独一无二。
 * @default KeyWord_1
 * 
 * @param 按钮优先级
 * @type number
 * @min 0
 * @desc 新增的按钮的顺序优先级。
 * @default 40
 *
 * @param 执行的脚本
 * @type note
 * @desc 按钮按下后执行的脚本。
 * @default ""
 * 
 * @param 是否执行公共事件
 * @type boolean
 * @on 执行
 * @off 不执行
 * @desc true - 执行，false - 不执行。执行公共事件会必然离开菜单界面，因为菜单界面中游戏是暂停状态。
 * @default false
 * 
 * @param 执行的公共事件
 * @parent 是否执行公共事件
 * @type common_event
 * @desc 按钮按下后执行的公共事件。执行公共事件会必然离开菜单界面，因为菜单界面中游戏是暂停状态。
 * @default 0
 *
 * @param 公共事件执行方式
 * @parent 是否执行公共事件
 * @type select
 * @option 串行
 * @value 串行
 * @option 并行
 * @value 并行
 * @desc 公共事件的执行方式。
 * @default 串行
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		WMB（Window_Menu_Button）
//		临时全局变量	DrillUp.g_WMB_xxx
//		临时局部变量	this._drill_WMB_xxx
//		存储数据变量	$gameSystem._drill_WMB_xxx
//		全局存储变量	无
//		覆盖重写方法	Window_MenuCommand.prototype.callHandler
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^3)
//		★性能测试因素	打开主菜单界面
//		★性能测试消耗	1.21ms
//		★最坏情况		暂无
//		★备注			插件只在一瞬间执行控制内容，并不影响性能。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			窗口按钮管理器：
//				->拦截器
//				->callHandler 绑定传值
//				->debug寻找可用按钮
//
//		★必要注意事项：
//			1.	this._drill_WMB_maps 拦截器的条件，
//				this._drill_WMB_intercepter 拦截器拦截的内容列表。
//				this._debug_list 二者的并集，用于显示给用户看管理器信息。
//				this._debug_Rlist 
//
//		★其它说明细节：
//			1.Window_MenuCommand是固定菜单界面用的选项窗口，每次变化都需要重复进入菜单才会生效。
//			  不过，菜单界面也不需要考虑临时修改按钮的问题。
//			2.插件放在所有主菜单插件后面，作为一个拦截器，过滤显示的指令。
//			3.自定义按钮不做存储，直接在临时全局中使用。（因为没有其他特殊参数，相当于硬编码加按钮）
//			4.考虑到执行生效问题，这里按钮不能在菜单中执行插件指令。
//			
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_WindowMenuButton = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_WindowMenuButton');
	
	/*-----------------杂项------------------*/
    DrillUp.g_WMB_debug = String(DrillUp.parameters['DEBUG-显示状态列表'] || "false") === "true";
    DrillUp.g_WMB_btn_default_zIndex = Number(DrillUp.parameters['按钮默认优先级'] || 40) ;
	
	/*-----------------默认按钮------------------*/
    DrillUp.g_WMB_btn_item_visible = String(DrillUp.parameters['是否显示道具按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_skill_visible = String(DrillUp.parameters['是否显示技能按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_equip_visible = String(DrillUp.parameters['是否显示装备按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_status_visible = String(DrillUp.parameters['是否显示状态按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_formation_visible = String(DrillUp.parameters['是否显示队形按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_options_visible = String(DrillUp.parameters['是否显示选项按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_save_visible = String(DrillUp.parameters['是否显示保存按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_gameEnd_visible = String(DrillUp.parameters['是否显示游戏结束按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_item_zIndex = Number(DrillUp.parameters['道具按钮优先级'] || 100) ;
    DrillUp.g_WMB_btn_skill_zIndex = Number(DrillUp.parameters['技能按钮优先级'] || 99) ;
    DrillUp.g_WMB_btn_equip_zIndex = Number(DrillUp.parameters['装备按钮优先级'] || 98) ;
    DrillUp.g_WMB_btn_status_zIndex = Number(DrillUp.parameters['状态按钮优先级'] || 97) ;
    DrillUp.g_WMB_btn_formation_zIndex = Number(DrillUp.parameters['队形按钮优先级'] || 96) ;
    DrillUp.g_WMB_btn_options_zIndex = Number(DrillUp.parameters['选项按钮优先级'] || 3) ;
    DrillUp.g_WMB_btn_save_zIndex = Number(DrillUp.parameters['保存按钮优先级'] || 2) ;
    DrillUp.g_WMB_btn_gameEnd_zIndex = Number(DrillUp.parameters['游戏结束按钮优先级'] || 1) ;
	
	//==============================
	// * 变量获取 - 菜单按钮
	//				（~struct~MenuBtn）
	//==============================
	DrillUp.drill_WMB_initMenuBtn = function( dataFrom ){
		var data = {};
		data['visible'] = String( dataFrom["是否初始显示"] || "true") == "true";
		data['btn_name'] = String( dataFrom["按钮名称"] || "");
		data['btn_key'] = String( dataFrom["按钮关键字"] || "");
		data['zIndex'] = Number( dataFrom["按钮优先级"] || 0);
		//data['command'] = JSON.parse( dataFrom["执行的插件指令"] || []);
		data['script'] = String( dataFrom["执行的脚本"] || "");
		data['commonEventEnable'] = String( dataFrom["是否执行公共事件"] || "false") == "true";
		data['commonEventId'] = Number( dataFrom["执行的公共事件"] || 0);
		data['pipeType'] = String( dataFrom["公共事件执行方式"] || "串行");
		return data;
	}
	
	/*-----------------菜单按钮------------------*/
	DrillUp.g_WMB_btns_length = 20;
	DrillUp.g_WMB_btns = [];
	for (var i = 0; i < DrillUp.g_WMB_btns_length ; i++ ) {
		if( DrillUp.parameters["菜单按钮-" + String(i+1) ] != undefined &&
			DrillUp.parameters["菜单按钮-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["菜单按钮-" + String(i+1)] );
			DrillUp.g_WMB_btns[i] = DrillUp.drill_WMB_initMenuBtn( data );
		}else{
			DrillUp.g_WMB_btns[i] = null;
		}
	};
	

	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_WMB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_WMB_pluginCommand.call(this, command, args);
	if( command === ">主菜单按钮" ){
		
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if (type === "显示") {
				$gameSystem.drill_WMB_mapSetAttr(temp1,"visible",true);
			}
			if (type === "隐藏") {
				$gameSystem.drill_WMB_mapSetAttr(temp1,"visible",false);
			}
		}
		
		if(args.length == 6){
			var temp1 = String(args[1]);
			var temp2 = String(args[5]);
			var type = String(args[3]);
			if (type === "优先级") {
				$gameSystem.drill_WMB_mapSetAttr(temp1,"zIndex",temp2);
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_WMB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_WMB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_WMB_sys_initialize.call(this);
	this.drill_WMB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_WMB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_WMB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_WMB_saveEnabled == true ){	
		$gameSystem.drill_WMB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_WMB_initSysData();
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
Game_System.prototype.drill_WMB_initSysData = function() {
	this.drill_WMB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_WMB_checkSysData = function() {
	this.drill_WMB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_WMB_initSysData_Private = function() {
	
	// > 默认按钮
	this._drill_WMB_maps = [];
	this._drill_WMB_maps.push({"key":"item" ,"zIndex":DrillUp.g_WMB_btn_item_zIndex,"visible":DrillUp.g_WMB_btn_item_visible });
	this._drill_WMB_maps.push({"key":"skill","zIndex":DrillUp.g_WMB_btn_skill_zIndex,"visible":DrillUp.g_WMB_btn_skill_visible });
	this._drill_WMB_maps.push({"key":"equip" ,"zIndex":DrillUp.g_WMB_btn_equip_zIndex,"visible":DrillUp.g_WMB_btn_equip_visible });
	this._drill_WMB_maps.push({"key":"status" ,"zIndex":DrillUp.g_WMB_btn_status_zIndex,"visible":DrillUp.g_WMB_btn_status_visible });
	this._drill_WMB_maps.push({"key":"formation","zIndex":DrillUp.g_WMB_btn_formation_zIndex ,"visible":DrillUp.g_WMB_btn_formation_visible });
	this._drill_WMB_maps.push({"key":"options","zIndex":DrillUp.g_WMB_btn_options_zIndex,"visible":DrillUp.g_WMB_btn_options_visible });
	this._drill_WMB_maps.push({"key":"save" ,"zIndex":DrillUp.g_WMB_btn_save_zIndex,"visible":DrillUp.g_WMB_btn_save_visible });
	this._drill_WMB_maps.push({"key":"gameEnd" ,"zIndex":DrillUp.g_WMB_btn_gameEnd_zIndex,"visible":DrillUp.g_WMB_btn_gameEnd_visible });
	
	// > 自定义按钮
	for(var i = 0;i< DrillUp.g_WMB_btns.length; i++){
		var temp_btn = DrillUp.g_WMB_btns[i]
		if( temp_btn == null ){ continue; }
		var data = {
			"key":temp_btn['btn_key'],
			"zIndex":temp_btn['zIndex'],
			"visible":temp_btn['visible']
		};
		this._drill_WMB_maps.push( data );
	}
	//alert(JSON.stringify(this._drill_WMB_maps));
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_WMB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_WMB_maps == undefined ){
		this.drill_WMB_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（此容器为增量容器，不能根据索引进行空检查）
};
//==============================
// * 指令容器 - map插入属性
//==============================
Game_System.prototype.drill_WMB_mapSetAttr = function( key,attr_name,attr_val ) {
	// > 获取键
	var map = null;
	for(var j = 0; j < this._drill_WMB_maps.length ;j++ ){
		var temp_m = this._drill_WMB_maps[j];
		if( temp_m['key'] == key ){
			map = temp_m;
		}
	}
	// > 没有键时新增
	if( map == null ){
		map = {"key":key,"zIndex":DrillUp.g_WMB_btn_default_zIndex,"visible":true };
		this._drill_WMB_maps.push( map );
	}
	// > 修改属性
	map[attr_name] = attr_val;
};


//=============================================================================
// ** 主菜单选项窗口
//=============================================================================
//==============================
// * 选项窗口 - 按钮拦截（根据条件拦截按钮）
//==============================
var _drill_WMB_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
Window_MenuCommand.prototype.makeCommandList = function() {
	_drill_WMB_makeCommandList.call(this);
	this.drill_WMB_interceptCommand();
}
Window_MenuCommand.prototype.drill_WMB_interceptCommand = function() {
	// > debug列表初始化
	this._debug_list = [];
	this._debug_Rlist = [];
	for(var i = 0; i < $gameSystem._drill_WMB_maps.length ;i++ ){
		this._debug_list[i] = {};
		this._debug_list[i]['connected'] = false;		//DEBUG-默认全未连接
	}
	// > 拦截 _list 指令容器
	this._drill_WMB_intercepter = this._list;
	this._list = [];
	for(var i = 0; i < this._drill_WMB_intercepter.length ;i++ ){
		var temp_inter = this._drill_WMB_intercepter[i];
		var pushed = false;
		// > 对照 指令容器 选择性添加按钮
		for(var j = 0; j < $gameSystem._drill_WMB_maps.length ;j++ ){
			var temp_m = $gameSystem._drill_WMB_maps[j];
			if( temp_m['key'] == null || temp_inter['symbol'] == null ){ continue; }
			if( temp_m['key'].toLowerCase() == temp_inter['symbol'].toLowerCase() ){
				// > 按钮状态检查（显示的push进_list，隐藏的跳过）
				if( temp_m['visible'] ){
					var temp = {};
					temp = temp_inter;
					temp['zIndex'] = temp_m['zIndex'];
					this._list.push(temp);
				}
				pushed = true;
				this._debug_list[j]['name'] = temp_inter['name'];
				this._debug_list[j]['connected'] = true;	//DEBUG-确认建立连接
			}
			this._debug_list[j]['zIndex'] = temp_m['zIndex'];
			this._debug_list[j]['visible'] = temp_m['visible'];
			this._debug_list[j]['symbol'] = temp_m['key'];
		}
		// > 未纳入指令容器的按钮（顺序默认，并放行）
		if( !pushed ){
			var temp = {};
			temp = temp_inter;
			temp['zIndex'] = DrillUp.g_WMB_btn_default_zIndex;
			this._list.push(temp);
			
			var temp_back = JSON.parse(JSON.stringify( temp ));	//DEBUG-拦截器中放行的新按钮，捕获
			temp_back['visible'] = true;
			temp_back['connected'] = true;
			this._debug_Rlist.push(temp_back);
		}
	}
	// > 按钮排序
	this.drill_WMB_btn_sortByZIndex();
	// > DEBUG信息
	if(DrillUp.g_WMB_debug){
		for(var i = 0; i< this._debug_Rlist.length ;i++){ this._debug_list.push(this._debug_Rlist[i]); }
		this.drill_WMB_btn_printDEBUG(this._debug_list);
	}
};
//==============================
// * 选项窗口 - DEBUG信息（拦截器条件 与 按钮集 的并集）
//==============================
Window_MenuCommand.prototype.drill_WMB_btn_printDEBUG = function(debug_list) {
	debug_list.sort(function(a, b){return b.zIndex-a.zIndex});	//排序
	var str = "以下为按钮的状态列表：\n";
	for(var i = 0; i< debug_list.length; i++){
		var d = debug_list[i];
		str += ">关键字:" + d["symbol"] + "，";
		if( d["name"] == undefined ){
			str += "名字:未找到，";
		}else{
			str += "名字:" + d["name"] + "，";
		}
		str += "状态:" + (d["connected"] ? "存在" : "未找到") + "，";
		if(d["connected"]){
			str += "" + (d["visible"] ? "显示中" : "隐藏中") + "，";
		}
		str += "\n";
	}
	alert(str);
};
//==============================
// * 选项窗口 - 按钮排序
//==============================
Window_MenuCommand.prototype.drill_WMB_btn_sortByZIndex = function() {
   this._list.sort(function(a, b){return b.zIndex-a.zIndex});	//比较器
};


//=============================================================================
// ** 自定义按钮
//=============================================================================
//==============================
// * 自定义按钮 - 方法绑定
//==============================
var _drill_WMB_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_WMB_createCommandWindow.call(this);
	// > 添加 setHandler 绑定
	for(var i = 0; i< DrillUp.g_WMB_btns.length ;i++){
		var temp_btn = DrillUp.g_WMB_btns[i];
		if( temp_btn == null ){ continue; }
		this._commandWindow.setHandler( temp_btn['btn_key'], this.drill_WMB_methodCall.bind(this));
	}
};
//==============================
// * 自定义按钮 - 绑定的方法传值
//==============================
Window_MenuCommand.prototype.callHandler = function(symbol) {
    if (this.isHandled(symbol)) {
        this._handlers[symbol](symbol);		//强制让handler传一个值进去（bind 的 methodCall 就能接受到 symbol 了）
    }
};
//==============================
// * 自定义按钮 - 绑定方法的执行指令
//==============================
Scene_Menu.prototype.drill_WMB_methodCall = function( symbol ) {
	for(var i = 0; i< DrillUp.g_WMB_btns.length ;i++){
		var temp_btn = DrillUp.g_WMB_btns[i];
		if( temp_btn == null ){ continue; }
		if( temp_btn['btn_key'] == symbol ){
			
			// > 执行插件指令
			//if( temp_btn['command'] ){
			//	var gameInterpreter = new Game_Interpreter();	
			//	for(var j = 0; j< temp_btn['command'].length ;j++){
			//		var t_args = String(temp_btn['command'][j]).split(" ");
			//		var t_command = t_args.shift();
			//		gameInterpreter.pluginCommand( t_command, t_args);
			//	}
			//}
			
			// > 执行脚本
			if(temp_btn['script'] != ""){
				eval(JSON.parse(temp_btn['script']));
			}
			
			// > 执行公共事件（切出当前所有菜单Scene）
			if( temp_btn['commonEventEnable'] ){
				if( Imported.Drill_LayerCommandThread ){	//【Drill_LayerCommandThread  地图 - 多线程】
					if(SceneManager._stack.length > 0){ SceneManager.pop(); }	
					if(SceneManager._stack.length > 0){ SceneManager.pop(); }	
					if(SceneManager._stack.length > 0){ SceneManager.pop(); }	
					//$gameTemp.reserveCommonEvent( temp_btn['commonEventId'] );
					SoundManager.playOk();
					var e_data = {
						'type':"公共事件",
						'pipeType': temp_btn['pipeType'],
						'commonEventId': temp_btn['commonEventId'],
					};
					$gameMap.drill_LCT_addPipeEvent( e_data );
				}else{
					alert(
						"【Drill_WindowMenuButton.js 控件 - 选项窗口管理器】\n按钮'" + temp_btn['btn_name'] + "'执行公共事件时，缺少基础插件 Drill_LayerCommandThread 地图-多线程。"
					);
				}
			}
		}
	}
}
//==============================
// * 自定义按钮 - 额外添加显示的按钮
//==============================
var _drill_WMB_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_WMB_addOriginalCommands.call(this);
	// > 额外添加
	for(var i = 0; i< DrillUp.g_WMB_btns.length ;i++){		// _list中，肯定没有自定义按钮，所以要额外添加
		var temp_btn = DrillUp.g_WMB_btns[i];
		if( temp_btn == null ){ continue; }
		this.addCommand( temp_btn['btn_name'], temp_btn['btn_key'], true);
	}
};


