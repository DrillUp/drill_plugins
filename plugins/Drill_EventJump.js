//=============================================================================
// Drill_EventJump.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        物体 - 事件跳跃
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventJump +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以使得事件/玩家执行普通跳跃或强制跳跃。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。也可以作用于其他插件。
 * 基于：
 *   - Drill_CoreOfMoveRoute      移动路线-移动路线核心★★v1.7以上★★
 * 可作用于：
 *   - Drill_Jump                 互动-跳跃能力
 *     目标插件基于此插件，可以使得控制台控制玩家的跳跃。
 * 可被扩展：
 *   - Drill_LayerWallBlock       图块-墙壁阻塞器
 *     墙壁阻塞器，可以设置 墙面和墙顶图块 无法被翻越，节省R图块配置。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、玩家。
 * 2.更多详细的介绍，去看看 "10.互动 > 关于跳跃能力.docx"。
 * 3.插件需要将指定 地形标志 或 图块R区域 设为悬崖，
 *   去看看 "26.图块 > 关于插件与图块R占用说明.xlsx"
 * 普通跳跃：
 *   (1.普通跳跃将考虑事件、悬崖、地形等因素。
 *      普通跳跃时，事件/玩家都不会改变朝向。
 *   (2.你可以设置事件的普通跳跃属性：距离、延迟、音效。
 *      在事件执行移动路线指令时，根据属性进行跳跃。
 *   (3.注意，如果事件的跳跃延迟属性大于0，那么执行普通跳跃事件指令时，
 *      将会受到延迟影响，不能立即跳多次。
 * 强制跳跃：
 *   (1.强制跳跃为默认的跳跃功能，都属于强制跳跃。
 *      即无视地形、悬崖、事件等条件，强制跳到目标位置。
 * 地形条件：
 *   (1.你有必要在一些特殊障碍中直接设置最高悬崖高度，比如河流，天花板等。
 *      万一玩家发现可以跳河或者跳天花板就麻烦了。
 *   (2.从高的地方可以跳到低的地方，反之不能跳。
 *      等高时可以跳过低谷，但是不能翻越 悬崖高墙 和 禁跳区域。
 *   (3.如果你在悬崖12345都设置了同一个区域，那么按最低的悬崖算。
 *   (4.禁止跳跃区为最高悬崖高度，无法翻越，可以作为天花板墙壁。
 *   (5.你可以在禁止跳跃区中行走，但是无法跳跃。
 *   (6.阶梯区域 等于 禁止跳跃区，阶梯上禁止跳跃，也不能跳入。
 * 设计：
 *   (1.你可以使用移动路线或者插件指令手动让事件跳跃。
 *      通过该方法，可以设计一些需要固定走动/跳跃的事件帮助踩按钮的谜题。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 普通跳跃属性
 * 你可以设置事件的跳跃属性：
 * （注释冒号两边都有一个空格，移动路线两边没有空格）
 * 
 * 事件注释：=>事件跳跃 : 跳跃距离 : 图块距离[2]
 * 事件注释：=>事件跳跃 : 跳跃声音 : 声音[1]
 * 事件注释：=>事件跳跃 : 跳跃延迟 : 时间[30]
 * 
 * 插件指令：>事件跳跃 : 本事件 : 修改属性-跳跃距离 : 图块距离[2]
 * 插件指令：>事件跳跃 : 事件[10] : 修改属性-跳跃距离 : 图块距离[2]
 * 插件指令：>事件跳跃 : 事件变量[21] : 修改属性-跳跃距离 : 图块距离[2]
 * 插件指令：>事件跳跃 : 批量事件[10,11] : 修改属性-跳跃距离 : 图块距离[2]
 * 插件指令：>事件跳跃 : 批量事件变量[21,22] : 修改属性-跳跃距离 : 图块距离[2]
 * 
 * 插件指令：>事件跳跃 : 本事件 : 修改属性-跳跃距离 : 图块距离[2]
 * 插件指令：>事件跳跃 : 本事件 : 修改属性-跳跃声音 : 声音[2]
 * 插件指令：>事件跳跃 : 本事件 : 修改属性-跳跃延迟 : 时间[30]
 * 
 * 1."跳跃声音 : 1"表示当前插件配置的第一个跳跃音效。
 * 2.插件指令前面部分（本事件）和后面设置（修改属性-跳跃距离）可以随意组合。
 *   一共有5*3种组合方式。
 * 3.插件指令修改的事件跳跃，只在当前地图中有效，离开地图后会恢复默认。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 执行普通跳跃
 * 你可以使用下面指令执行普通跳跃：
 * （冒号两边都有一个空格）
 * 
 * 移动路线指令：>普通跳跃
 * 移动路线指令：>普通跳跃:前:距离[属性值]
 * 移动路线指令：>普通跳跃:前:距离[2]
 * 移动路线指令：>普通跳跃:后:距离[2]
 * 移动路线指令：>普通跳跃:左:距离[2]
 * 移动路线指令：>普通跳跃:右:距离[2]
 * 移动路线指令：>普通跳跃:左前方:距离[2]
 * 移动路线指令：>普通跳跃:左后方:距离[2]
 * 移动路线指令：>普通跳跃:右前方:距离[2]
 * 移动路线指令：>普通跳跃:右后方:距离[2]
 * 
 * 1.单个">普通跳跃"指令，表示向前跳跃。
 * 2."距离[0]"表示原地跳，"距离[属性值]"表示事件自带的跳跃距离值。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 执行普通跳跃（插件指令）
 * 你可以使用下面插件指令执行普通跳跃：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>事件跳跃 : 玩家 : 普通跳跃 : 前 : 距离[2]
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 前 : 距离[2]
 * 插件指令：>事件跳跃 : 事件[10] : 普通跳跃 : 前 : 距离[2]
 * 插件指令：>事件跳跃 : 事件变量[21] : 普通跳跃 : 前 : 距离[2]
 * 插件指令：>事件跳跃 : 批量事件[10,11] : 普通跳跃 : 前 : 距离[2]
 * 插件指令：>事件跳跃 : 批量事件变量[21,22] : 普通跳跃 : 前 : 距离[2]
 * 
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 前 : 距离[2]
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 后 : 距离[2]
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 左 : 距离[2]
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 右 : 距离[2]
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 左前方 : 距离[2]
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 左后方 : 距离[2]
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 右前方 : 距离[2]
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 右后方 : 距离[2]
 * 
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 前 : 距离[2]
 * 插件指令：>事件跳跃 : 本事件 : 普通跳跃 : 前 : 距离[属性值]
 *                                                          
 * 1.前面部分（本事件）和后面设置（前 : 距离[2]）可以随意组合。
 *   一共有6*8*2种组合方式。
 * 2."距离[0]"表示原地跳，"距离[属性值]"表示事件自带的跳跃距离值。
 * 3.如果事件的跳跃延迟属性大于0，那么执行普通跳跃事件指令时，也会受到
 *   延迟影响，不能立即跳多次。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 强制跳跃
 * 实现快速位移，可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>事件跳跃 : 玩家 : 强制跳跃到 : 位置[3,3]
 * 插件指令：>事件跳跃 : 本事件 : 强制跳跃到 : 位置[3,3]
 * 插件指令：>事件跳跃 : 事件[10] : 强制跳跃到 : 位置[3,3]
 * 插件指令：>事件跳跃 : 事件变量[21] : 强制跳跃到 : 位置[3,3]
 * 插件指令：>事件跳跃 : 批量事件[10,11] : 强制跳跃到 : 位置[3,3]
 * 插件指令：>事件跳跃 : 批量事件变量[21,22] : 强制跳跃到 : 位置[3,3]
 * 
 * 插件指令：>事件跳跃 : 本事件 : 强制跳跃到 : 位置[3,3]
 * 插件指令：>事件跳跃 : 本事件 : 强制跳跃到 : 位置变量[25,26]
 * 插件指令：>事件跳跃 : 本事件 : 强制跳跃到 : 相对坐标[0,1]
 * 插件指令：>事件跳跃 : 本事件 : 强制跳跃到 : 相对坐标变量[25,26]
 * 插件指令：>事件跳跃 : 本事件 : 强制跳跃到 : 相对朝向坐标[0,1]
 * 插件指令：>事件跳跃 : 本事件 : 强制跳跃到 : 相对朝向坐标变量[25,26]
 *
 * 1.前面部分（本事件）和后面设置（位置[3,3]）可以随意组合。
 *   一共有6*6种组合方式。
 * 2."位置"即当前地图的坐标。
 *   "相对坐标"为以事件为准的偏移坐标，x正右负左，y正下负上。
 * 3."相对朝向坐标"表示以当前事件的朝向为准，
 *   0,1为前进 0,-1为后退 1,0为右手边位移 -1,0为左手边位移
 *   位移不改变事件的朝向。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 地形条件
 * 实现快速位移，可以使用下面插件指令：
 * （冒号两边都有一个空格）
 * 
 * 插件指令：>事件跳跃 : 玩家 : 获取当前悬崖高度 : 变量[21]
 * 插件指令：>事件跳跃 : 本事件 : 获取当前悬崖高度 : 变量[21]
 * 插件指令：>事件跳跃 : 事件[10] : 获取当前悬崖高度 : 变量[21]
 * 插件指令：>事件跳跃 : 事件变量[21] : 获取当前悬崖高度 : 变量[21]
 * 
 * 插件指令：>事件跳跃 : 玩家 : 获取当前悬崖高度 : 变量[21]
 * 插件指令：>事件跳跃 : 玩家 : 上一次跳跃前的悬崖高度 : 变量[21]
 * 插件指令：>事件跳跃 : 玩家 : 上一次跳跃后的悬崖高度 : 变量[21]
 * 
 * 1.前面部分（本事件）和后面设置（获取当前悬崖高度）可以随意组合。
 *   一共有4*3种组合方式。
 * 2.执行指定插件指令后，"变量[21]"将会被赋值高度值。
 *   如果没有高度值，则返回-1。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   在大部分管理层中，设置10个事件使用移动路线普通跳跃。
 * 测试结果：   200个事件的地图中，消耗为：【24.61ms】
 *              100个事件的地图中，消耗为：【14.77ms】
 *               50个事件的地图中，消耗为：【11.08ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于许多事件在移动路线中，每个事件都需要判断各自的地形条件，
 *   所以消耗会有一些，但并不多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了区域修正判定。
 * [v1.2]
 * 改进了移动路线指令结构。
 * 
 * 
 * @param 是否修正区域判定
 * @type boolean
 * @on 修正
 * @off 不修正
 * @desc 修正后，物体未完全离开图块时，算作从未离开的图块中起跳。
 * @default true
 * 
 * @param 资源-跳跃音效
 * @desc 事件进行普通跳跃时播放音效。
 * @default ["Jump1"]
 * @require 1
 * @dir audio/se/
 * @type file[]
 *
 * @param ----事件属性----
 * @desc 
 *
 * @param 默认跳跃音效
 * @parent ----事件属性----
 * @type number
 * @min 0
 * @desc 事件跳跃时，默认播放资源配置的音效的序号。0表示不播放音效。
 * @default 0
 *
 * @param 默认跳跃距离
 * @parent ----事件属性----
 * @type number
 * @min 0
 * @desc 事件跳跃到目的地的距离长度，单位图块。0表示只能原地跳跃。
 * @default 2
 *
 * @param 默认跳跃延迟
 * @parent ----事件属性----
 * @type number
 * @min 0
 * @desc 事件跳跃后，下次跳跃需要等待的时间，单位帧。（1秒60帧）
 * @default 0
 *
 * @param ----悬崖----
 * @desc 
 * 
 * @param 悬崖高度1
 * @parent ----悬崖----
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作高度1，即绘图的R选项中的区域，未填的区域默认高度0。
 * @default ["1"]
 * 
 * @param 悬崖高度2
 * @parent ----悬崖----
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作高度2，即绘图的R选项中的区域，未填的区域默认高度0。
 * @default ["2"]
 * 
 * @param 悬崖高度3
 * @parent ----悬崖----
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作高度3，即绘图的R选项中的区域，未填的区域默认高度0。
 * @default ["3"]
 * 
 * @param 悬崖高度4
 * @parent ----悬崖----
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作高度4，即绘图的R选项中的区域，未填的区域默认高度0。
 * @default ["4"]
 * 
 * @param 悬崖高度5
 * @parent ----悬崖----
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作高度5，即绘图的R选项中的区域，未填的区域默认高度0。
 * @default ["5"]
 * 
 * @param 禁止跳跃区
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作禁止跳跃区，玩家不能在该区域跳跃，并且悬崖高度为最高，无法翻越。
 * @default ["8"]
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		EJu (Event_EJu)
//		临时全局变量	无
//		临时局部变量	this._drill_EJu_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	物体触发管理层
//		★性能测试消耗	24.61ms
//		★最坏情况		所有事件都到处跳。
//		★备注			只要继承了event的update函数，就有几率出现在61.53ms的行走图刷新的消耗列表中。
//						判断就很头疼。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			事件跳跃：
//				->强制跳跃
//				->普通跳跃
//				->悬崖高度
//				->获取指定位置的悬崖高度
//					->计算两点高度差（不需要）
//				->移动路线指令
//				->事件本身就控制悬崖高度？
//				->深渊图块？
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventJump = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventJump');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_EJu_fix = String(DrillUp.parameters["是否修正区域判定"] || "true") === "true";
	if( DrillUp.parameters["资源-跳跃音效"] != undefined &&
		DrillUp.parameters["资源-跳跃音效"] != "" ){
		DrillUp.g_EJu_se = JSON.parse(DrillUp.parameters["资源-跳跃音效"]);
	}else{
		DrillUp.g_EJu_se = [""];
	}
	DrillUp.g_EJu_se_id = Number(DrillUp.parameters["默认跳跃音效"] || 0);
	DrillUp.g_EJu_distance = Number(DrillUp.parameters["默认跳跃距离"] || 2);
	DrillUp.g_EJu_delay = Number(DrillUp.parameters["默认跳跃延迟"] || 0);
	
	/*-----------------悬崖------------------*/
	if( DrillUp.parameters["悬崖高度1"] != undefined &&
		DrillUp.parameters["悬崖高度1"] != "" ){
		DrillUp.g_EJu_cliff_1 = JSON.parse(DrillUp.parameters["悬崖高度1"]);
	}else{
		DrillUp.g_EJu_cliff_1 = [] ;
	}
	if( DrillUp.parameters["悬崖高度2"] != undefined &&
		DrillUp.parameters["悬崖高度2"] != "" ){
		DrillUp.g_EJu_cliff_2 = JSON.parse(DrillUp.parameters["悬崖高度2"]);
	}else{
		DrillUp.g_EJu_cliff_2 = [] ;
	}
	if( DrillUp.parameters["悬崖高度3"] != undefined &&
		DrillUp.parameters["悬崖高度3"] != "" ){
		DrillUp.g_EJu_cliff_3 = JSON.parse(DrillUp.parameters["悬崖高度3"]);
	}else{
		DrillUp.g_EJu_cliff_3 = [] ;
	}
	if( DrillUp.parameters["悬崖高度4"] != undefined &&
		DrillUp.parameters["悬崖高度4"] != "" ){
		DrillUp.g_EJu_cliff_4 = JSON.parse(DrillUp.parameters["悬崖高度4"]);
	}else{
		DrillUp.g_EJu_cliff_4 = [] ;
	}
	if( DrillUp.parameters["悬崖高度5"] != undefined &&
		DrillUp.parameters["悬崖高度5"] != "" ){
		DrillUp.g_EJu_cliff_5 = JSON.parse(DrillUp.parameters["悬崖高度5"]);
	}else{
		DrillUp.g_EJu_cliff_5 = [] ;
	}
	
	/*-----------------禁止跳跃区------------------*/
	if( DrillUp.parameters["禁止跳跃区"] != undefined && 
		DrillUp.parameters["禁止跳跃区"] != "" ){
		DrillUp.g_EJu_forbidden_area = JSON.parse(DrillUp.parameters["禁止跳跃区"]);
	}else{
		DrillUp.g_EJu_forbidden_area = [] ;
	}
	
	
//=============================================================================
// * 插件顺序检测
//=============================================================================
if( Imported.Drill_LayerWallBlock ){
	alert(
		"【Drill_EventJump.js  物体 - 事件跳跃】\n"+
		"插件顺序不对，Drill_LayerWallBlock 图块-墙壁阻塞器 插件需要放在该插件后面。"
	);
}


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfMoveRoute ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令
//==============================
var _drill_EJu_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	_drill_EJu_pluginCommand.call(this, command, args);
	this.drill_EJu_forceJumpCommand(command, args);		//强制跳跃
	this.drill_EJu_commonJumpCommand(command, args);	//普通跳跃
	this.drill_EJu_tileCommand(command, args);			//地形条件获取
}
//==============================
// * 插件指令 - 强制跳跃
//==============================
Game_Interpreter.prototype.drill_EJu_forceJumpCommand = function( command, args ){
	if( command === ">事件跳跃" ){
		
		/*-----------------事件------------------*/
		var e_ids = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_ids == null && unit == "本事件" ){
				e_ids = [];
				e_ids.push( this._eventId );
			}
			if( e_ids == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_ids = [];
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[k]) );
				}
			}
			if( e_ids == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_ids = [];
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}
			if( e_ids == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				e_ids.push( Number(unit) );
			}
			if( e_ids == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [];
				e_ids.push( $gameVariables.value(Number(unit)) );
			}
		}
		if( e_ids != null && args.length == 6){
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1 == "强制跳跃到" ){
				var pos = temp2;
				var e_pos = [];
				if( pos.indexOf("位置变量[") != -1 ){
					pos = pos.replace("位置变量[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ $gameVariables.value(Number(temp_arr[0])),
								  $gameVariables.value(Number(temp_arr[1])) ];
								  
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							e.jump( e_pos[0] - e.x, e_pos[1] - e.y );
						}
					}
				}
				if( pos.indexOf("相对朝向坐标变量[") != -1 ){
					pos = pos.replace("相对朝向坐标变量[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ $gameVariables.value(Number(temp_arr[0])),
								  $gameVariables.value(Number(temp_arr[1])) ];
						
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							if( e.direction() === 2 ){		//下
								e.jump(e.x + e_pos[0], e.y + e_pos[1]);
							} else if( e.direction() === 4 ){	//左
								e.jump(e.x - e_pos[1], e.y + e_pos[0]);
							} else if( e.direction() === 6 ){	//右
								e.jump(e.x + e_pos[1], e.y - e_pos[0]);
							} else if( e.direction() === 8 ){	//上
								e.jump( - e_pos[0], - e_pos[1] );
							}
						}
					}
				}
				if( pos.indexOf("相对坐标变量[") != -1 ){
					pos = pos.replace("相对坐标变量[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ $gameVariables.value(Number(temp_arr[0])),
								  $gameVariables.value(Number(temp_arr[1])) ];
						
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							e.jump( e_pos[0], e_pos[1] );
						}
					}
				}
				if( pos.indexOf("位置[") != -1 ){
					pos = pos.replace("位置[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
						
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							e.jump( e_pos[0] - e.x, e_pos[1] - e.y );
						}
					}
				}
				if( pos.indexOf("相对朝向坐标[") != -1 ){
					pos = pos.replace("相对朝向坐标[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
						
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							if( e.direction() === 2 ){		//下
								e.jump(e.x + e_pos[0], e.y + e_pos[1]);
							} else if( e.direction() === 4 ){	//左
								e.jump(e.x - e_pos[1], e.y + e_pos[0]);
							} else if( e.direction() === 6 ){	//右
								e.jump(e.x + e_pos[1], e.y - e_pos[0]);
							} else if( e.direction() === 8 ){	//上
								e.jump( - e_pos[0], - e_pos[1] );
							}
						}
					}
				}
				if( pos.indexOf("相对坐标[") != -1 ){
					pos = pos.replace("相对坐标[","");
					pos = pos.replace("]","");
					var temp_arr = pos.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
						
						for( var k=0; k < e_ids.length; k++ ){
							var e_id = e_ids[k];
							if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ continue; }
							var e = $gameMap.event( e_id );
							e.jump( e_pos[0], e_pos[1] );
						}
					}
				}
			}
		}
		
		if(args.length == 6){
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( unit == "玩家" ){
				if( temp1 == "强制跳跃到" ){
					var pos = temp2;
					var e_pos = [];
					if( pos.indexOf("位置变量[") != -1 ){
						pos = pos.replace("位置变量[","");
						pos = pos.replace("]","");
						var temp_arr = pos.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							e_pos = [ $gameVariables.value(Number(temp_arr[0])),
									  $gameVariables.value(Number(temp_arr[1])) ];
									  
							$gamePlayer.jump( e_pos[0] - $gamePlayer.x, e_pos[1] - $gamePlayer.y );
						}
					}
					if( pos.indexOf("相对朝向坐标变量[") != -1 ){
						pos = pos.replace("相对朝向坐标变量[","");
						pos = pos.replace("]","");
						var temp_arr = pos.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							e_pos = [ $gameVariables.value(Number(temp_arr[0])),
									  $gameVariables.value(Number(temp_arr[1])) ];
							
							if( $gamePlayer.direction() === 2 ){		//下
								$gamePlayer.jump($gamePlayer.x + e_pos[0], $gamePlayer.y + e_pos[1]);
							} else if( $gamePlayer.direction() === 4 ){	//左
								$gamePlayer.jump($gamePlayer.x - e_pos[1], $gamePlayer.y + e_pos[0]);
							} else if( $gamePlayer.direction() === 6 ){	//右
								$gamePlayer.jump($gamePlayer.x + e_pos[1], $gamePlayer.y - e_pos[0]);
							} else if( $gamePlayer.direction() === 8 ){	//上
								$gamePlayer.jump( - e_pos[0], - e_pos[1] );
							}
						}
					}
					if( pos.indexOf("相对坐标变量[") != -1 ){
						pos = pos.replace("相对坐标变量[","");
						pos = pos.replace("]","");
						var temp_arr = pos.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							e_pos = [ $gameVariables.value(Number(temp_arr[0])),
									  $gameVariables.value(Number(temp_arr[1])) ];
							
							$gamePlayer.jump( e_pos[0], e_pos[1] );
						}
					}
					if( pos.indexOf("位置[") != -1 ){
						pos = pos.replace("位置[","");
						pos = pos.replace("]","");
						var temp_arr = pos.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
							
							$gamePlayer.jump( e_pos[0] - $gamePlayer.x, e_pos[1] - $gamePlayer.y );
						}
					}
					if( pos.indexOf("相对朝向坐标[") != -1 ){
						pos = pos.replace("相对朝向坐标[","");
						pos = pos.replace("]","");
						var temp_arr = pos.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
							
							if( $gamePlayer.direction() === 2 ){		//下
								$gamePlayer.jump($gamePlayer.x + e_pos[0], $gamePlayer.y + e_pos[1]);
							} else if( $gamePlayer.direction() === 4 ){	//左
								$gamePlayer.jump($gamePlayer.x - e_pos[1], $gamePlayer.y + e_pos[0]);
							} else if( $gamePlayer.direction() === 6 ){	//右
								$gamePlayer.jump($gamePlayer.x + e_pos[1], $gamePlayer.y - e_pos[0]);
							} else if( $gamePlayer.direction() === 8 ){	//上
								$gamePlayer.jump( - e_pos[0], - e_pos[1] );
							}
						}
					}
					if( pos.indexOf("相对坐标[") != -1 ){
						pos = pos.replace("相对坐标[","");
						pos = pos.replace("]","");
						var temp_arr = pos.split(/[,，]/);
						if( temp_arr.length >= 2 ){
							e_pos = [ Number(temp_arr[0]),Number(temp_arr[1]) ];
							
							$gamePlayer.jump( e_pos[0], e_pos[1] );
						}
					}
				}
			}
		}
	}
}
//==============================
// * 插件指令 - 普通跳跃
//==============================
Game_Interpreter.prototype.drill_EJu_commonJumpCommand = function( command, args ){
	if( command === ">事件跳跃" ){
		
		/*-----------------事件------------------*/
		var e_ids = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_ids == null && unit == "本事件" ){
				e_ids = [];
				e_ids.push( this._eventId );
			}
			if( e_ids == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_ids = [];
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[k]) );
				}
			}
			if( e_ids == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				var temp_arr = unit.split(/[,，]/);
				e_ids = [];
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}
			if( e_ids == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				e_ids.push( Number(unit) );
			}
			if( e_ids == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [];
				e_ids.push( $gameVariables.value(Number(unit)) );
			}
		}
		if( e_ids != null && e_ids.length > 0 && args.length == 8 ){
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( temp1 == "普通跳跃" ){
				temp3 = temp3.replace("距离[","");
				temp3 = temp3.replace("]","");
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					if( temp3 == "属性值" ){
						e.drill_EJu_commonJumpCommand( e._drill_EJu_jump['distance'],temp2 );
					}else{
						e.drill_EJu_commonJumpCommand( Number(temp3),temp2 );
					}
				}
			}
		}
		if( e_ids != null && e_ids.length > 0 && args.length == 6 ){
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1 == "修改属性-跳跃距离" ){
				temp2 = temp2.replace("图块距离[","");
				temp2 = temp2.replace("]","");
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e._drill_EJu_jump['distance'] = Number(temp2);
				}
			}
			if( temp1 == "修改属性-跳跃声音" ){
				temp2 = temp2.replace("声音[","");
				temp2 = temp2.replace("]","");
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e._drill_EJu_jump['sound'] = DrillUp.g_EJu_se[ Number(temp2)-1 ];
				}
			}
			if( temp1 == "修改属性-跳跃延迟" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e._drill_EJu_jump['delay'] = Number(temp2);
				}
			}
		}
		
		/*-----------------玩家------------------*/
		if( args.length == 8 ){
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( unit == "玩家" ){
				if( temp1 == "普通跳跃" ){
					temp3 = temp3.replace("距离[","");
					temp3 = temp3.replace("]","");
					if( temp3 == "属性值" ){
						$gamePlayer.drill_EJu_commonJumpCommand( $gamePlayer._drill_EJu_jump['distance'],temp2 );
					}else{
						$gamePlayer.drill_EJu_commonJumpCommand( Number(temp3),temp2 );
					}
				}
			}
		}
	}
}

//==============================
// * 插件指令 - 地形条件获取
//==============================
Game_Interpreter.prototype.drill_EJu_tileCommand = function( command, args ){
	if( command === ">事件跳跃" ){
		/*-----------------事件------------------*/
		if(args.length == 6){
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var e_id = -1;
			
			if( e_id == -1 && unit == "本事件" ){
				e_id = this._eventId;
			}
			if( e_id == -1 && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_id = Number(unit);
			}
			if( e_id == -1 && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_id = $gameVariables.value(Number(unit));
			}
			
			if( e_id > 0 ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( type == "获取当前悬崖高度" ){
					if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					var h = e.drill_EJu_getCliffHeight( e._x,e._y );
					$gameVariables.setValue( temp2,h );
				}
				if( type == "上一次跳跃前的悬崖高度" ){
					if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					var h = e._drill_EJu_jump['lastCliff'];
					$gameVariables.setValue( temp2,h );
				}
				if( type == "上一次跳跃后的悬崖高度" ){
					if( $gameMap.drill_EJu_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					var h = e._drill_EJu_jump['tarCliff'];
					$gameVariables.setValue( temp2,h );
				}
			}
			
		}
		/*-----------------玩家------------------*/
		if(args.length == 6){
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( unit == "玩家" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("]","");
				temp2 = Number(temp2);
				if( type == "获取当前悬崖高度" ){
					var h = $gamePlayer.drill_EJu_getCliffHeight( $gamePlayer._x,$gamePlayer._y );
					$gameVariables.setValue( temp2,h );
				}
				if( type == "上一次跳跃前的悬崖高度" ){
					var h = $gamePlayer._drill_EJu_jump['lastCliff'];
					$gameVariables.setValue( temp2,h );
				}
				if( type == "上一次跳跃后的悬崖高度" ){
					var h = $gamePlayer._drill_EJu_jump['tarCliff'];
					$gameVariables.setValue( temp2,h );
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EJu_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventJump.js 物体 - 事件跳跃】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// * 注释初始化
//=============================================================================
var _drill_EJu_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function( ){
	_drill_EJu_event_setupPage.call(this);
    this.drill_EJu_setupPage();
};
Game_Event.prototype.drill_EJu_setupPage = function( ){
	if( !this._erased && this.page() ){this.list().forEach(function(l ){
		if( l.code === 108 ){
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if( command == "=>事件跳跃"){	//=>事件跳跃 : 跳跃距离 : 2
				if(args.length == 4){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					if( type == "跳跃距离" ){
						temp1 = temp1.replace("图块距离[","");
						temp1 = temp1.replace("]","");
						this._drill_EJu_jump['distance'] = Number(temp1);
					}
					if( type == "跳跃声音" ){
						temp1 = temp1.replace("声音[","");
						temp1 = temp1.replace("]","");
						this._drill_EJu_jump['sound'] = DrillUp.g_EJu_se[ Number(temp1)-1 ];
					}
					if( type == "跳跃延迟" ){
						temp1 = temp1.replace("时间[","");
						temp1 = temp1.replace("]","");
						this._drill_EJu_jump['delay'] = Number(temp1);
					}
				}
			};
		};
	}, this);};
};	

//=============================================================================
// ** 移动路线设置
//=============================================================================
//==============================
// * 指令 - 执行移动路线指令（继承）
//==============================
var _drill_EJu_routeCommand = Game_Character.prototype.drill_COMR_routeCommand;
Game_Character.prototype.drill_COMR_routeCommand = function(command, args){
	_drill_EJu_routeCommand.call( this, command, args );
	if( command == ">普通跳跃" ){
		if( args.length == 0 ){
			this.drill_EJu_commonJump();
		}
		if( args.length == 2 ){
			var type = String(args[0]);
			var temp1 = String(args[1]);
			temp1 = temp1.replace("距离[","");
			temp1 = temp1.replace("]","");
			if( temp1 == "属性值" ){
				this.drill_EJu_commonJumpCommand( this._drill_EJu_jump['distance'], type );
			}else{
				this.drill_EJu_commonJumpCommand( Number(temp1), type );
			}
		}
	}
};



//=============================================================================
// ** 普通跳跃（综合指令）
//=============================================================================
//==============================
// * 普通跳跃 - 执行普通跳跃
// 
//				说明：根据角色当前朝向、距离，向前跳。
//==============================
Game_CharacterBase.prototype.drill_EJu_commonJump = function( ){
	var data = this._drill_EJu_jump;
	this.drill_EJu_jumpWithCheck( data['distance'],this._direction );	//条件跳跃
}
//==============================
// * 普通跳跃 - 执行普通跳跃（插件指令）
// 
//				说明：根据朝向字符串，转换成实际方向。
//			    参数：最大距离，朝向字符串
//			    返回：无 
//==============================
Game_CharacterBase.prototype.drill_EJu_commonJumpCommand = function( distance,direction_str  ){
	var direction = 2;
	if( this._direction == 2 ){//下
		if( direction_str == "前" ){ direction = 2; }
		if( direction_str == "后" ){ direction = 8; }
		if( direction_str == "左" ){ direction = 6; }
		if( direction_str == "右" ){ direction = 4; }
		if( direction_str == "左前方" ){ direction = 62; }
		if( direction_str == "右前方" ){ direction = 42; }
		if( direction_str == "左后方" ){ direction = 68; }
		if( direction_str == "右后方" ){ direction = 48; }
	}
	if( this._direction == 4 ){//左
		if( direction_str == "前" ){ direction = 4; }
		if( direction_str == "后" ){ direction = 6; }
		if( direction_str == "左" ){ direction = 2; }
		if( direction_str == "右" ){ direction = 8; }
		if( direction_str == "左前方" ){ direction = 42; }
		if( direction_str == "右前方" ){ direction = 48; }
		if( direction_str == "左后方" ){ direction = 62; }
		if( direction_str == "右后方" ){ direction = 68; }
	}
	if( this._direction == 6 ){//右
		if( direction_str == "前" ){ direction = 6; }
		if( direction_str == "后" ){ direction = 4; }
		if( direction_str == "左" ){ direction = 8; }
		if( direction_str == "右" ){ direction = 2; }
		if( direction_str == "左前方" ){ direction = 68; }
		if( direction_str == "右前方" ){ direction = 62; }
		if( direction_str == "左后方" ){ direction = 48; }
		if( direction_str == "右后方" ){ direction = 42; }
	}
	if( this._direction == 8 ){//上
		if( direction_str == "前" ){ direction = 8; }
		if( direction_str == "后" ){ direction = 2; }
		if( direction_str == "左" ){ direction = 4; }
		if( direction_str == "右" ){ direction = 6; }
		if( direction_str == "左前方" ){ direction = 48; }
		if( direction_str == "右前方" ){ direction = 68; }
		if( direction_str == "左后方" ){ direction = 42; }
		if( direction_str == "右后方" ){ direction = 62; }
	}
	this.drill_EJu_jumpWithCheckLockDir( distance, direction );	//条件跳跃（锁定朝向）
}
//==============================
// * 普通跳跃 - 条件跳跃（锁定朝向）
// 
//				说明：只多了一个锁定朝向的步骤。
//			    参数：最大距离，朝向(2/4/6/8/62/68/48/42)
//			    返回：无 
//==============================
Game_CharacterBase.prototype.drill_EJu_jumpWithCheckLockDir = function( distance,direction  ){
	this._drill_EJu_tempLockDir = true;
	this.drill_EJu_jumpWithCheck( distance,direction );
	this._drill_EJu_tempLockDir = false;
}
//==============================
// * 锁定朝向 - 过滤设置
//==============================
var _drill_EJu_lock_setDirection = Game_CharacterBase.prototype.setDirection;
Game_CharacterBase.prototype.setDirection = function(d ){
	if( this._drill_EJu_tempLockDir == true ){ return; }
	_drill_EJu_lock_setDirection.call(this,d);
}


//=============================================================================
// ** 普通跳跃（基础功能）
//=============================================================================
//==============================
// * 普通跳跃 - 参数初始化
//==============================
var _drill_EJu_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function( ){
	_drill_EJu_initMembers.call(this);
	
	this._drill_EJu_jump = {};
	this._drill_EJu_jump['distance'] = DrillUp.g_EJu_distance;
	this._drill_EJu_jump['delay'] = DrillUp.g_EJu_delay;
	this._drill_EJu_jump['cur_delay'] = 0;
	if( DrillUp.g_EJu_se_id == 0 ){
		this._drill_EJu_jump['sound'] = "";
	}else{
		this._drill_EJu_jump['sound'] = DrillUp.g_EJu_se[ DrillUp.g_EJu_se_id-1 ];
	}
	
	this._drill_EJu_jump['lastCliff'] = 0;
	this._drill_EJu_jump['lastX'] = 0;
	this._drill_EJu_jump['lastY'] = 0;
	this._drill_EJu_jump['tarCliff'] = 0;
	this._drill_EJu_jump['tarX'] = 0;
	this._drill_EJu_jump['tarY'] = 0;
}

//==============================
// * 普通跳跃 - 条件跳跃
// 
//				说明：识别悬崖+识别可通行+识别禁止区域 的跳跃
//			    参数：最大距离，朝向(2/4/6/8/62/68/48/42)
//			    返回：无 
//==============================
Game_CharacterBase.prototype.drill_EJu_jumpWithCheck = function( distance,direction  ){
	// > 禁止跳跃区
	if( this.drill_EJu_isInJumpForbiddenArea() ){ return; }
	
	// > 跳跃延时
	var data = this._drill_EJu_jump;
	if( data['cur_delay'] > 0 ){ return; }
	data['cur_delay'] = data['delay'];
	
	// > 播放跳跃声音
	SoundManager.drill_EJu_playSE(data['sound'],this);
	
	// > 起点位置记录
	data['lastCliff'] = this.drill_EJu_getCliffHeight(this._x, this._y);
	data['lastX'] = this._x;
	data['lastY'] = this._y;
	this.drill_EJu_jumpTouch(this._x,this._y);			//接触原地
	
	// > 当未完全进入起点时，距离-1（区域修正）
	if( DrillUp.g_EJu_fix && distance > 0 ){
		if( Math.abs( this._realX - this._x ) > 0.4 ||
			Math.abs( this._realY - this._y ) > 0.4 ){
			distance -= 1;
		}
	}
	
	// > 判定推进
	var tar_x = this._x;
	var tar_y = this._y;
	var next_x = 0;		
	var next_y = 0;
	for (var i = 1; i <= distance; i++ ){		//向前一步步推进判断，函数是直接执行到底的
		if(  direction === 2 ){		//下
			next_x = this._x;		
			next_y = this._y + i;
		} else if(  direction === 4 ){	//左
			next_x = this._x - i;
			next_y = this._y;
		} else if(  direction === 6 ){	//右
			next_x = this._x + i;
			next_y = this._y;
		} else if(  direction === 8 ){	//上
			next_x = this._x;
			next_y = this._y - i;
		} else if(  direction === 62 ){	//右下
			next_x = this._x + i;
			next_y = this._y + i;
		} else if(  direction === 68 ){	//右上
			next_x = this._x + i;
			next_y = this._y - i;
		} else if(  direction === 48 ){	//左上
			next_x = this._x - i;
			next_y = this._y - i;
		} else if(  direction === 42 ){	//左下
			next_x = this._x - i;
			next_y = this._y + i;
		}	
		
		// >障碍判定
		//		比如，A为不可通行区域，B为可通行，B在A的后面，B会覆盖A的tar_值
		//		这样就可以跳过鸿沟了，但是遇到高墙，就break
		if( this.drill_EJu_canPassJump(next_x,next_y,data['lastCliff']) ){
			tar_x = next_x;
			tar_y = next_y;
		};
		if( this.drill_EJu_getCliffHeight(next_x, next_y) > data['lastCliff'] ){
			break;
		}
		this.drill_EJu_jumpTouch(tar_x,tar_y);	//跳跃接触过的地面
	};	
	
	
	// >目标位置记录
	data['tarCliff'] = this.drill_EJu_getCliffHeight(tar_x, tar_y);
	data['tarX'] = tar_x;
	data['tarY'] = tar_y;
	
	// >跳
	tar_x -= this._x;
	tar_y -= this._y;
	this.jump(tar_x ,tar_y );
}

//==============================
// * 普通跳跃 - 接触过的地面
//==============================
Game_CharacterBase.prototype.drill_EJu_jumpTouch = function( x,y  ){
	//该方法需要被继承，用于子插件控制跳跃经过的轨迹
}

//==============================
// * 普通跳跃 - 延迟计数
//==============================
var _drill_EJu_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function( ){
	_drill_EJu_c_update.call(this);
	this._drill_EJu_jump['cur_delay'] -= 1;
}

//==============================
// * 普通跳跃 - 声音
//==============================
SoundManager.drill_EJu_playSE = function(fileName,character){
	var se = {};
	se.name = fileName;
	se.pitch = 100;
	se.volume = 100;
	
	// > 【声音 - 事件的声音】适应声音距离化
	if( Imported.Drill_EventSound && AudioManager.drill_ESo_playCharacterSe ){
		AudioManager.drill_ESo_playCharacterSe(se,character);
	}else{
		AudioManager.playSe(se);
	}
};  

//==============================
// * 普通跳跃 - 判断悬崖高度
//==============================
Game_CharacterBase.prototype.drill_EJu_getCliffHeight = function(x, y ){
	var r_id = $gameMap.regionId(x,y);
	for(var i = 0;i< DrillUp.g_EJu_cliff_1.length ;i++){
		if( r_id == DrillUp.g_EJu_cliff_1[i] ){
			return 1;
		}
	}
	for(var i = 0;i< DrillUp.g_EJu_cliff_2.length ;i++){
		if( r_id == DrillUp.g_EJu_cliff_2[i] ){
			return 2;
		}
	}
	for(var i = 0;i< DrillUp.g_EJu_cliff_3.length ;i++){
		if( r_id == DrillUp.g_EJu_cliff_3[i] ){
			return 3;
		}
	}
	for(var i = 0;i< DrillUp.g_EJu_cliff_4.length ;i++){
		if( r_id == DrillUp.g_EJu_cliff_4[i] ){
			return 4;
		}
	}
	for(var i = 0;i< DrillUp.g_EJu_cliff_5.length ;i++){
		if( r_id == DrillUp.g_EJu_cliff_5[i] ){
			return 5;
		}
	}
	for(var i = 0;i< DrillUp.g_EJu_forbidden_area.length ;i++){	//禁止跳跃区域
		if( r_id == DrillUp.g_EJu_forbidden_area[i] ){
			return 100;
		}
	}
	return 0;
}
//==============================
// * 普通跳跃 - 判断禁止跳跃区
//==============================
Game_CharacterBase.prototype.drill_EJu_isInJumpForbiddenArea = function( ){
	var r_id = $gameMap.regionId(this._x,this._y);
	for(var i=0; i< DrillUp.g_EJu_forbidden_area.length ;i++){	//禁止跳跃区域
		if( r_id == DrillUp.g_EJu_forbidden_area[i] ){
			return true;
		}
	}
	return false;
}

//==============================
// * 普通跳跃 - 判断跳跃目的地
//==============================
Game_CharacterBase.prototype.drill_EJu_canPassJump = function(x, y, cur_cliff ){
	
	// > 判断 - 地图边界
    if( !$gameMap.isValid(x, y) ){ return false; }
	
	// > 判断 - 自身穿透属性
    if( this.isThrough() || this.isDebugThrough() ){
        return true;
    }
	
	// > 判断 - 悬崖高度
    if( this.drill_EJu_getCliffHeight(x, y) > cur_cliff ){
        return false;
    };
	
	// > 判断 - 图块可通行设置（地图数据）
    if( !$gameMap.drill_EJu_isAnyPassable(x, y) ){
        return false;
    };
	// > 判断 - 物体碰撞
    if( this.isCollidedWithCharacters(x, y) ){
        return false;
    }
    return true;
};

//==============================
// * 普通跳跃 - 判断图块可通行情况
//==============================
Game_Map.prototype.drill_EJu_isAnyPassable = function( x, y  ){
	return this.isPassable(x, y, 2)||this.isPassable(x, y, 4)||this.isPassable(x, y, 6)||this.isPassable(x, y, 8);
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventJump = false;
		alert(
			"【Drill_EventJump.js 物体 - 事件跳跃】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfMoveRoute 移动路线-移动路线核心"
		);
}

