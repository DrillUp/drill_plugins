//=============================================================================
// Drill_X_EventTextTransparent.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        行走图 - 事件漂浮文字自动显现[扩展]
 * @author Drill_up
 * 
 * @Drill_LE_param "声音集合-%d"
 * @Drill_LE_parentKey "---声音组---"
 * @Drill_LE_var "DrillUp.g_XETT_soundList_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_X_EventTextTransparent +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以设置事件漂浮文字能够根据条件自动显现。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下面插件才能运行。
 * 基于：
 *   - Drill_EventText              行走图-事件漂浮文字★★v1.9及以上★★
 *     需要该插件才能设置自动显现。
 * 可作用于：
 *   - Drill_X_EventTextBackground  行走图-事件漂浮文字的背景[扩展]
 *   - Drill_X_EventTextLine        行走图-事件漂浮文字批注线[扩展]
 *     该插件可以给扩展的内容，进行透明度变化、遮罩变化设置。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件漂浮文字。
 * 2.具体可以去看看 "7.行走图 > 关于事件漂浮文字.docx"。
 * 细节：
 *   (1.该插件能够给 批注线、背景，设置自定义的变化模式。
 * 设计：
 *   (1.你可以给事件漂浮文字的几个部件设置延迟时间。
 *      使得它们先后依次显现，提升流畅效果。
 *   (2.默认设定下，玩家必须接近事件一定范围后才能进行显现。
 *      你也可以通过插件指令，手动控制 强制显现，实现简单的
 *      文字描述动画效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要添加下面的事件注释：
 *
 * 事件注释：=>事件漂浮文字自动显现 : 开启
 * 事件注释：=>事件漂浮文字自动显现 : 关闭
 * 
 * 1.该设置不跨事件页，切换事件页后默认关闭，需要重新添加注释来开启。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 属性设置
 * 你可以添加下面的事件注释，修改自动显现的属性：
 *
 * 事件注释：=>事件漂浮文字自动显现 : 漂浮文字 : 持续时长[20] : 延迟时间[30]
 * 事件注释：=>事件漂浮文字自动显现 : 批注线 : 持续时长[30] : 延迟时间[0]
 * 事件注释：=>事件漂浮文字自动显现 : 背景 : 持续时长[30] : 延迟时间[0]
 * 
 * 事件注释：=>事件漂浮文字自动显现 : 批注线 : 修改变化模式 : 透明度变化
 * 事件注释：=>事件漂浮文字自动显现 : 批注线 : 修改变化模式 : 遮罩变化-自动
 * 事件注释：=>事件漂浮文字自动显现 : 批注线 : 修改变化模式 : 遮罩变化-从右往左
 * 事件注释：=>事件漂浮文字自动显现 : 批注线 : 修改变化模式 : 遮罩变化-从左往右
 * 事件注释：=>事件漂浮文字自动显现 : 背景 : 修改变化模式 : 透明度变化
 * 事件注释：=>事件漂浮文字自动显现 : 背景 : 修改变化模式 : 遮罩变化-自动
 * 事件注释：=>事件漂浮文字自动显现 : 背景 : 修改变化模式 : 遮罩变化-从右往左
 * 事件注释：=>事件漂浮文字自动显现 : 背景 : 修改变化模式 : 遮罩变化-从左往右
 * 事件注释：=>事件漂浮文字自动显现 : 触发范围 : 固定自动显现范围 : 横向图块[4] : 纵向图块[4]
 * 
 * 1.该设置不跨事件页，切换事件页后默认关闭，需要重新添加注释来开启。
 * 2."遮罩变化-自动"指根据 偏移值的正负 来决定 从右往左 或 从左往右。
 * 3."固定自动显现范围"之后，该事件的自动显现范围被固定，由横向图块与纵向图块
 *   形成一个矩形区域，玩家进入区域则显现。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 自动显现范围
 * 你可以通过插件指令临时修改属性：
 * 
 * 插件指令：>事件漂浮文字自动显现 : 修改自动显现范围 : 图块[4]
 * 插件指令：>事件漂浮文字自动显现 : 修改自动显现范围 : 默认值
 * 
 * 1.此设置修改后永久有效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令
 * 你可以通过插件指令临时修改属性：
 * 
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 开启
 * 插件指令：>事件漂浮文字自动显现 : 事件[5] : 开启
 * 插件指令：>事件漂浮文字自动显现 : 事件变量[5] : 开启
 * 
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 开启
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 关闭
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 强制显现
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 取消强制显现
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 漂浮文字 : 持续时长[20] : 延迟时间[30]
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 批注线 : 持续时长[30] : 延迟时间[0]
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 背景 : 持续时长[30] : 延迟时间[0]
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 批注线 : 修改变化模式 : 透明度变化
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 批注线 : 修改变化模式 : 遮罩变化-自动
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 批注线 : 修改变化模式 : 遮罩变化-从右往左
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 批注线 : 修改变化模式 : 遮罩变化-从左往右
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 背景 : 修改变化模式 : 透明度变化
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 背景 : 修改变化模式 : 遮罩变化-自动
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 背景 : 修改变化模式 : 遮罩变化-从右往左
 * 插件指令：>事件漂浮文字自动显现 : 本事件 : 背景 : 修改变化模式 : 遮罩变化-从左往右
 * 
 * 1.前半部分（本事件）和 后半部分（开启）
 *   的参数可以随意组合。一共有3*15种组合方式。
 * 2.修改的设置离开当前地图后将失效。
 * 3."强制显现"是指通过插件指令，强制执行显现，不需要玩家接近激活。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 显现声音控制
 * 你可以通过插件指令控制声音：
 * 
 * 插件指令：>事件漂浮文字自动显现 : 声音开关 : 开启
 * 插件指令：>事件漂浮文字自动显现 : 声音开关 : 关闭
 * 插件指令：>事件漂浮文字自动显现 : 设置随机播放集合 : 开启
 * 插件指令：>事件漂浮文字自动显现 : 设置随机播放集合 : 关闭
 * 插件指令：>事件漂浮文字自动显现 : 设置随机播放集合 : 恢复默认
 * 插件指令：>事件漂浮文字自动显现 : 设置播放的集合 : 集合[1]
 * 插件指令：>事件漂浮文字自动显现 : 设置播放的集合 : 默认集合
 * 
 * 1."集合[1]"表示对应声音集合配置1，修改后将使用该集合。
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
 * 测试方法：   20个事件，添加自动透明功能，分别放置测试。
 * 测试结果：   200个事件的地图中，消耗为：【25.08ms】
 *              100个事件的地图中，消耗为：【21.70ms】
 *               50个事件的地图中，消耗为：【10.47ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件基于 事件漂浮文字，消耗与含设置的事件数量有关，但消耗并不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了旧存档的识别与兼容。
 * [v1.2]
 * 整理了内部模块结构。
 * [v1.3]
 * 添加了触发范围的事件注释设置。
 * [v1.4]
 * 修复了显示框架时，框架不会播放透明动画的bug。
 * [v1.5]
 * 添加了 漂浮文字、批注线、背景 显现时播放声音的功能。
 * 
 * 
 * 
 * @param ---显现范围---
 * @default
 *
 * @param 自动显现范围
 * @parent ---显现范围---
 * @type number
 * @min 1
 * @desc 事件进入玩家的方形区域内后，会自动显现事件漂浮文字。
 * @default 4
 * 
 * 
 * @param ---显现时机---
 * @default
 *
 * @param 漂浮文字-持续时长
 * @parent ---显现时机---
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，变化持续的时长。
 * @default 20
 *
 * @param 漂浮文字-延迟时间
 * @parent ---显现时机---
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，延迟变化时间。你可以让该部件延迟，等其他部件显示完毕后，在显示此部件。
 * @default 30
 *
 * @param 批注线-持续时长
 * @parent ---显现时机---
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，变化持续的时长。
 * @default 30
 *
 * @param 批注线-延迟时间
 * @parent ---显现时机---
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，延迟变化时间。你可以让该部件延迟，等其他部件显示完毕后，在显示此部件。
 * @default 0
 *
 * @param 批注线-变化模式
 * @parent ---显现时机---
 * @type select
 * @option 透明度变化
 * @value 透明度变化
 * @option 遮罩变化-自动
 * @value 遮罩变化-自动
 * @option 遮罩变化-从右往左
 * @value 遮罩变化-从右往左
 * @option 遮罩变化-从左往右
 * @value 遮罩变化-从左往右
 * @desc 该部件显现的变化模式，详细可以去看看文档说明。
 * @default 遮罩变化-自动
 *
 * @param 背景-持续时长
 * @parent ---显现时机---
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，变化持续的时长。
 * @default 30
 *
 * @param 背景-延迟时间
 * @parent ---显现时机---
 * @type number
 * @min 1
 * @desc 漂浮文字自动显现时，延迟变化时间。你可以让该部件延迟，等其他部件显示完毕后，在显示此部件。
 * @default 0
 *
 * @param 背景-变化模式
 * @parent ---显现时机---
 * @type select
 * @option 透明度变化
 * @value 透明度变化
 * @option 遮罩变化-自动
 * @value 遮罩变化-自动
 * @option 遮罩变化-从右往左
 * @value 遮罩变化-从右往左
 * @option 遮罩变化-从左往右
 * @value 遮罩变化-从左往右
 * @desc 该部件显现的变化模式，详细可以去看看文档说明。
 * @default 遮罩变化-自动
 * 
 * 
 * @param ---声音控制---
 * @default
 * 
 * @param 默认播放集合
 * @parent ---声音控制---
 * @type number
 * @min 1
 * @desc 默认播放的声音集合。
 * @default 1
 *
 * @param 是否随机播放集合
 * @parent ---声音控制---
 * @type boolean
 * @on 随机
 * @off 关闭
 * @desc true - 随机，false - 关闭
 * @default true
 * 
 * @param ---声音组---
 * @default
 * 
 * @param 声音集合-1
 * @parent ---声音组---
 * @type struct<XETTSoundGroup>
 * @desc 声音集合的配置信息。
 * @default 
 * 
 * @param 声音集合-2
 * @parent ---声音组---
 * @type struct<XETTSoundGroup>
 * @desc 声音集合的配置信息。
 * @default 
 * 
 * @param 声音集合-3
 * @parent ---声音组---
 * @type struct<XETTSoundGroup>
 * @desc 声音集合的配置信息。
 * @default 
 * 
 * @param 声音集合-4
 * @parent ---声音组---
 * @type struct<XETTSoundGroup>
 * @desc 声音集合的配置信息。
 * @default 
 * 
 * @param 声音集合-5
 * @parent ---声音组---
 * @type struct<XETTSoundGroup>
 * @desc 声音集合的配置信息。
 * @default 
 * 
 * @param 声音集合-6
 * @parent ---声音组---
 * @type struct<XETTSoundGroup>
 * @desc 声音集合的配置信息。
 * @default 
 * 
 * @param 声音集合-7
 * @parent ---声音组---
 * @type struct<XETTSoundGroup>
 * @desc 声音集合的配置信息。
 * @default 
 * 
 * @param 声音集合-8
 * @parent ---声音组---
 * @type struct<XETTSoundGroup>
 * @desc 声音集合的配置信息。
 * @default 
 * 
 * @param 声音集合-9
 * @parent ---声音组---
 * @type struct<XETTSoundGroup>
 * @desc 声音集合的配置信息。
 * @default 
 * 
 * @param 声音集合-10
 * @parent ---声音组---
 * @type struct<XETTSoundGroup>
 * @desc 声音集合的配置信息。
 * @default 
 * 
 */
/*~struct~XETTSoundGroup:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的声音集合==
 *
 * @param 声音-漂浮文字显现时
 * @type struct<XETTSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-批注线显现时
 * @type struct<XETTSound>
 * @desc 声音的详细配置信息。
 * @default 
 *
 * @param 声音-背景显现时
 * @type struct<XETTSound>
 * @desc 声音的详细配置信息。
 * @default 
 * 
 */
/*~struct~XETTSound:
 * 
 * @param 资源-声音
 * @desc 声音的资源文件。
 * @default (需配置)默认声音
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param 音量
 * @type number
 * @min 0
 * @max 100
 * @desc 声音的音量大小，范围为 0至100 。
 * @default 80
 * 
 * @param 音调
 * @type number
 * @min 50
 * @max 150
 * @desc 声音的音调值，范围为 50至150 。
 * @default 100
 * 
 * @param 声像
 * @desc 声音的左右声像，范围为 -100至100 。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		XETT（X_Event_Text_Transparent）
//		临时全局变量	DrillUp.g_XETT_xxx
//		临时局部变量	this._drill_XETT_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	初始点
//		★性能测试消耗	7.30ms 10.47ms 21.70ms（drill_XETT_updateChange）
//		★最坏情况		暂无
//		★备注			在低配本中，测的是10ms以内，高配本能测出21.70ms。
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
//			->☆事件注释
//
//			->☆事件漂浮文字 控制器（继承）
//			->☆事件漂浮文字 贴图（继承）
//				->透明度控制
//					> 漂浮文字
//					> 批注线
//					> 背景
//			->☆显现声音控制
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
//			暂无
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
	DrillUp.g_XETT_PluginTip_curName = "Drill_X_EventTextTransparent.js 行走图-事件漂浮文字自动显现[扩展]";
	DrillUp.g_XETT_PluginTip_baseList = ["Drill_EventText.js 行走图-事件漂浮文字"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_XETT_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_XETT_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_XETT_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_XETT_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_XETT_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_XETT_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_XETT_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。"
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_EventTextTransparent = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_X_EventTextTransparent');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_XETT_triggerRange = Number(DrillUp.parameters["自动显现范围"] || 4 );
	DrillUp.g_XETT_text_time = Number(DrillUp.parameters["漂浮文字-持续时长"] || 20 );
	DrillUp.g_XETT_text_delay = Number(DrillUp.parameters["漂浮文字-延迟时间"] || 30 );
	DrillUp.g_XETT_line_time = Number(DrillUp.parameters["批注线-持续时长"] || 20 );
	DrillUp.g_XETT_line_delay = Number(DrillUp.parameters["批注线-延迟时间"] || 0 );
	DrillUp.g_XETT_line_mode = String(DrillUp.parameters["批注线-变化模式"] || "遮罩变化-自动" );
	DrillUp.g_XETT_background_time = Number(DrillUp.parameters["背景-持续时长"] || 20 );
	DrillUp.g_XETT_background_delay = Number(DrillUp.parameters["背景-延迟时间"] || 0 );
	DrillUp.g_XETT_background_mode = String(DrillUp.parameters["背景-变化模式"] || "遮罩变化-自动" );
	
	
	//==============================
	// * 静态数据 - 声音集合
	//				（~struct~XETTSoundGroup）
	//==============================
	DrillUp.drill_XETT_initSoundGroup = function( dataFrom ){
		var data = {};
		if( dataFrom["声音-漂浮文字显现时"] != "" &&
			dataFrom["声音-漂浮文字显现时"] != undefined ){
			var p_data = JSON.parse( dataFrom["声音-漂浮文字显现时"] );
			data['se_text'] = DrillUp.drill_XETT_initSound( p_data );
		}else{
			data['se_text'] = DrillUp.drill_XETT_initSound( {} );
		}
		if( dataFrom["声音-批注线显现时"] != "" &&
			dataFrom["声音-批注线显现时"] != undefined ){
			var p_data = JSON.parse( dataFrom["声音-批注线显现时"] );
			data['se_line'] = DrillUp.drill_XETT_initSound( p_data );
		}else{
			data['se_line'] = DrillUp.drill_XETT_initSound( {} );
		}
		if( dataFrom["声音-背景显现时"] != "" &&
			dataFrom["声音-背景显现时"] != undefined ){
			var p_data = JSON.parse( dataFrom["声音-背景显现时"] );
			data['se_background'] = DrillUp.drill_XETT_initSound( p_data );
		}else{
			data['se_background'] = DrillUp.drill_XETT_initSound( {} );
		}
		return data;
	}
	//==============================
	// * 静态数据 - 声音
	//				（~struct~XETTSound）
	//==============================
	DrillUp.drill_XETT_initSound = function( dataFrom ){
		var data = {};
		data['name'] = String( dataFrom["资源-声音"] || "");	//『完整声音数据』
		data['volume'] = Number( dataFrom["音量"] || 100);
		data['pitch'] = Number( dataFrom["音调"] || 100);
		data['pan'] = Number( dataFrom["声像"] || 0);
		return data;
	}
	/*-----------------声音控制------------------*/
	DrillUp.g_XETT_defaultSound = Number(DrillUp.parameters["默认播放集合"] || 1 );
	DrillUp.g_XETT_randomSoundEnabled = String(DrillUp.parameters["是否随机播放集合"] || "true") == "true";
	/*-----------------声音集合------------------*/
	DrillUp.g_XETT_soundList_length = 10;
	DrillUp.g_XETT_soundList = [];
	for (var i = 0; i < DrillUp.g_XETT_soundList_length; i++) {
		if( DrillUp.parameters["声音集合-" + String(i+1) ] != "" && 
			DrillUp.parameters["声音集合-" + String(i+1) ] != undefined ){
			var temp = JSON.parse(DrillUp.parameters["声音集合-" + String(i+1) ]);
			DrillUp.g_XETT_soundList[i] = DrillUp.drill_XETT_initSoundGroup( temp );
		}else{
			DrillUp.g_XETT_soundList[i] = null;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_EventText ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_XETT_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_XETT_pluginCommand.call(this, command, args);
	if( command === ">事件漂浮文字自动显现" ){
		
		/*-----------------单事件获取------------------*/
		var ev = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( ev == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				ev = e;
			}
			if( ev == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_XETT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				ev = e;
			}
			if( ev == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_XETT_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				ev = e;
			}
		}
		
		/*-----------------指令设置------------------*/
		if( ev != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "启用" || type == "开启" || type == "打开" || type == "启动" ){
				ev.drill_ET_createController();
				ev._drill_ET_controller.drill_XETT_setEnabled( true );
			}
			if( type == "关闭" || type == "禁用" ){
				ev.drill_ET_createController();
				ev._drill_ET_controller.drill_XETT_setEnabled( false );
			}
			if( type == "强制显现" ){
				ev.drill_ET_createController();
				ev._drill_ET_controller.drill_XETT_setForceActived( true );
			}
			if( type == "取消强制显现" ){
				ev.drill_ET_createController();
				ev._drill_ET_controller.drill_XETT_setForceActived( false );
			}
		}
		if( ev != null && args.length == 6 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "漂浮文字" ){
				if( temp1.indexOf("持续时长[") != -1 ){
					temp1 = temp1.replace("持续时长[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					temp2 = temp2.replace("延迟时间[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					ev.drill_ET_createController();
					ev._drill_ET_controller.drill_XETT_setTextAnimTime( temp1, temp2 );
				}
			}
			if( type == "批注线" ){
				if( temp1.indexOf("持续时长[") != -1 ){
					temp1 = temp1.replace("持续时长[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					temp2 = temp2.replace("延迟时间[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					ev.drill_ET_createController();
					ev._drill_ET_controller.drill_XETT_setLineAnimTime( temp1, temp2 );
				}
				if( temp1 == "修改变化模式" ){
					ev.drill_ET_createController();
					ev._drill_ET_controller.drill_XETT_setLineAnimMode( temp2 );
				}
			}
			if( type == "背景" ){
				if( temp1.indexOf("持续时长[") != -1 ){
					temp1 = temp1.replace("持续时长[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					temp2 = temp2.replace("延迟时间[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					ev.drill_ET_createController();
					ev._drill_ET_controller.drill_XETT_setBackgroundAnimTime( temp1, temp2 );
				}
				if( temp1 == "修改变化模式" ){
					ev.drill_ET_createController();
					ev._drill_ET_controller.drill_XETT_setBackgroundAnimMode( temp2 );
				}
			}
		}
		
		/*-----------------自动显现范围------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1 == "修改自动显现范围" ){
				if( temp2 == "默认值" ){
					$gameSystem._drill_XETT_triggerRange = DrillUp.g_XETT_triggerRange;
				}else{
					temp2 = temp2.replace("图块[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2);
					$gameSystem._drill_XETT_triggerRange = temp2;
				}
			}
		}
		
		/*-----------------声音开关------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "声音开关" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_XETT_soundEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_XETT_soundEnabled = false;
				}
			}
			if( type == "设置随机播放集合" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_XETT_randomSoundEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_XETT_randomSoundEnabled = false;
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_XETT_randomSoundEnabled = DrillUp.g_XETT_randomSoundEnabled;
				}
			}
			if( type == "设置播放的集合" ){
				if( temp1 == "默认集合" ){
					$gameSystem._drill_XETT_curSoundIndex = DrillUp.g_XETT_defaultSound -1;
				}
				if( temp1.indexOf("集合[") != -1 ){
					temp1 = temp1.replace("集合[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_XETT_curSoundIndex = Number(temp1) -1;
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_XETT_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_XETT_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_XETT_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_XETT_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_XETT_sys_initialize.call(this);
	this.drill_XETT_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_XETT_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_XETT_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_XETT_saveEnabled == true ){	
		$gameSystem.drill_XETT_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_XETT_initSysData();
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
Game_System.prototype.drill_XETT_initSysData = function() {
	this.drill_XETT_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_XETT_checkSysData = function() {
	this.drill_XETT_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_XETT_initSysData_Private = function() {
	
	this._drill_XETT_triggerRange = DrillUp.g_XETT_triggerRange;	//自动显现范围
	
	this._drill_XETT_soundEnabled = true;										//声音开关
	this._drill_XETT_curSoundIndex = DrillUp.g_XETT_defaultSound -1;			//默认播放集合
	this._drill_XETT_randomSoundEnabled = DrillUp.g_XETT_randomSoundEnabled;	//是否随机播放集合
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_XETT_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_XETT_triggerRange == undefined ){
		this.drill_XETT_initSysData();
	}
};
//==============================
// * 存储数据 - 刷新播放集合（开放函数）
//==============================
Game_System.prototype.drill_XETT_getRandomSoundIndex = function() {
	var index_tank = [];
	for( var i = 0; i < DrillUp.g_XETT_soundList.length; i++ ){
		if( DrillUp.g_XETT_soundList[i] != undefined ){
			index_tank.push( i );
		}
	}
	var random_i = Math.floor( Math.random() * index_tank.length );
	return index_tank[random_i];
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 初始化绑定
//
//			说明：	> 注释与当前事件页有关，不一定跨事件页。
//==============================
var _drill_XETT_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_XETT_c_setupPageSettings.call(this);
	this.drill_XETT_setupPageSettings();
}
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_XETT_setupPageSettings = function() {
	
	// > 默认情况下，关闭自动显现
	if( this._drill_ET_controller != undefined ){
		this._drill_ET_controller.drill_XETT_setEnabled( false );
	}
	
	var page = this.page();
    if( page ){
		this.list().forEach(function(l){
			if( l.code === 108 ){
				var l_str = l.parameters[0];
				var args = l_str.split(/[ ]+/);	
				var command = args.shift();
				
				/*-----------------注释------------------*/
				if( command == "=>事件漂浮文字自动显现" ){
					if( args.length == 2 ){
						var type = String(args[1]);
						if( type == "启用" || type == "开启" || type == "打开" || type == "启动" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_XETT_setEnabled( true );
						}
						if( type == "关闭" || type == "禁用" ){
							this.drill_ET_createController();
							this._drill_ET_controller.drill_XETT_setEnabled( false );
						}
					}
					if( args.length == 6 ){
						var type = String(args[1]);
						var temp1 = String(args[3]);
						var temp2 = String(args[5]);
						if( type == "漂浮文字" ){
							if( temp1.indexOf("持续时长[") != -1 ){
								temp1 = temp1.replace("持续时长[","");
								temp1 = temp1.replace("]","");
								temp1 = Number(temp1);
								temp2 = temp2.replace("延迟时间[","");
								temp2 = temp2.replace("]","");
								temp2 = Number(temp2);
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setTextAnimTime( temp1, temp2 );
							}
						}
						if( type == "批注线" ){
							if( temp1.indexOf("持续时长[") != -1 ){
								temp1 = temp1.replace("持续时长[","");
								temp1 = temp1.replace("]","");
								temp1 = Number(temp1);
								temp2 = temp2.replace("延迟时间[","");
								temp2 = temp2.replace("]","");
								temp2 = Number(temp2);
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setLineAnimTime( temp1, temp2 );
							}
							if( temp1 == "修改变化模式" ){
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setLineAnimMode( temp2 );
							}
						}
						if( type == "背景" ){
							if( temp1.indexOf("持续时长[") != -1 ){
								temp1 = temp1.replace("持续时长[","");
								temp1 = temp1.replace("]","");
								temp1 = Number(temp1);
								temp2 = temp2.replace("延迟时间[","");
								temp2 = temp2.replace("]","");
								temp2 = Number(temp2);
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setBackgroundAnimTime( temp1, temp2 );
							}
							if( temp1 == "修改变化模式" ){
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setBackgroundAnimMode( temp2 );
							}
						}
					}
					if( args.length == 8 ){
						var type = String(args[1]);
						var temp1 = String(args[3]);
						var temp2 = String(args[5]);
						var temp3 = String(args[7]);
						if( type == "触发范围" ){
							if( temp1 == "固定自动显现范围" ){
								temp2 = temp2.replace("横向图块[","");
								temp2 = temp2.replace("]","");
								temp2 = Number(temp2);
								temp3 = temp3.replace("纵向图块[","");
								temp3 = temp3.replace("]","");
								temp3 = Number(temp3);
								this.drill_ET_createController();
								this._drill_ET_controller.drill_XETT_setTriggerRange( temp2, temp3 );
							}
						}
					}
				};
			};
		}, this);
    }
}


//=============================================================================
// ** ☆事件漂浮文字 控制器（继承）
//=============================================================================
//==============================
// * 控制器 - 初始化数据（继承）
//==============================
var _drill_XETT_ET_c_initData = Drill_ET_Controller.prototype.drill_controller_initData;
Drill_ET_Controller.prototype.drill_controller_initData = function(){
	_drill_XETT_ET_c_initData.call(this);
	var data = this._drill_data;
	
	// > 自动显现（这里的参数都节约一点，默认都 undefined ）『节约事件数据存储空间』
	if( data['animEnabled'] == undefined ){ data['animEnabled'] = undefined };						//动画开关（布尔）
	if( data['animForceActived'] == undefined ){ data['animForceActived'] = undefined };			//强制显现（布尔）
	if( data['triggerRange_x'] == undefined ){ data['triggerRange_x'] = undefined };				//自动显现范围 X（数字）
	if( data['triggerRange_y'] == undefined ){ data['triggerRange_y'] = undefined };				//自动显现范围 Y（数字）
	
	if( data['animText_time'] == undefined ){ data['animText_time'] = undefined };					//文字 - 动画时长（数字）
	if( data['animText_delay'] == undefined ){ data['animText_delay'] = undefined };				//文字 - 动画延迟（数字）
	if( data['animLine_mode'] == undefined ){ data['animLine_mode'] = undefined };					//批注线 - 动画模式（字符串）
	if( data['animLine_time'] == undefined ){ data['animLine_time'] = undefined };					//批注线 - 动画时长（数字）
	if( data['animLine_delay'] == undefined ){ data['animLine_delay'] = undefined };				//批注线 - 动画延迟（数字）
	if( data['animBackground_mode'] == undefined ){ data['animBackground_mode'] = undefined };		//背景 - 动画模式（字符串）
	if( data['animBackground_time'] == undefined ){ data['animBackground_time'] = undefined };		//背景 - 动画时长（数字）
	if( data['animBackground_delay'] == undefined ){ data['animBackground_delay'] = undefined };	//背景 - 动画延迟（数字）
}
//==============================
// * 控制器 - 自动显现 - 设置可用（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setEnabled = function( enable ){
	var data = this._drill_data;
	if( enable == true ){
		data['animEnabled'] = true;
	}else{
		data['animEnabled'] = undefined;
	}
}
//==============================
// * 控制器 - 自动显现 - 设置强制显现（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setForceActived = function( enable ){
	var data = this._drill_data;
	if( enable == true ){
		data['animForceActived'] = true;
	}else{
		data['animForceActived'] = undefined;
	}
}
//==============================
// * 控制器 - 自动显现 - 设置触发范围（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setTriggerRange = function( x, y ){
	var data = this._drill_data;
	data['triggerRange_x'] = x;
	data['triggerRange_y'] = y;
}
//==============================
// * 控制器 - 自动显现 - 获取触发范围（开放函数）
//
//			说明：	> 函数返回值为数字，不存在空值情况。
//==============================
Drill_ET_Controller.prototype.drill_XETT_getData_triggerRange_x = function(){
	if( this._drill_data['triggerRange_x'] === undefined ){ return $gameSystem._drill_XETT_triggerRange; }
	return this._drill_data['triggerRange_x'];
}
Drill_ET_Controller.prototype.drill_XETT_getData_triggerRange_y = function(){
	if( this._drill_data['triggerRange_y'] === undefined ){ return $gameSystem._drill_XETT_triggerRange; }
	return this._drill_data['triggerRange_y'];
}
//==============================
// * 控制器 - 自动显现 - 获取最大时长（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_getMaxTime = function(){
	var data = this._drill_data;
	var t1 = this.drill_XETT_getData_animText_time() + this.drill_XETT_getData_animText_delay();
	var t2 = this.drill_XETT_getData_animLine_time() + this.drill_XETT_getData_animLine_delay();
	var t3 = this.drill_XETT_getData_animBackground_time() + this.drill_XETT_getData_animBackground_delay();
	if( t1 < t2 ){ t1 = t2; }
	if( t1 < t3 ){ t1 = t3; }
	return t1;
}

//==============================
// * 控制器 - 自动显现（文字） - 设置时间（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setTextAnimTime = function( time, delay ){
	var data = this._drill_data;
	data['animText_time'] = time;
	data['animText_delay'] = delay;
}
//==============================
// * 控制器 - 自动显现（文字） - 获取时间（开放函数）
//
//			说明：	> 函数返回值为数字，不存在空值情况。
//==============================
Drill_ET_Controller.prototype.drill_XETT_getData_animText_time = function(){
	if( this._drill_data['animText_time'] === undefined ){ return DrillUp.g_XETT_text_time; }
	return this._drill_data['animText_time'];
}
Drill_ET_Controller.prototype.drill_XETT_getData_animText_delay = function(){
	if( this._drill_data['animText_delay'] === undefined ){ return DrillUp.g_XETT_text_delay; }
	return this._drill_data['animText_delay'];
}

//==============================
// * 控制器 - 自动显现（批注线） - 设置模式（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setLineAnimMode = function( mode ){
	var data = this._drill_data;
	data['animLine_mode'] = mode;
}
//==============================
// * 控制器 - 自动显现（批注线） - 获取模式（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_getData_animLine_mode = function(){
	if( this._drill_data['animLine_mode'] === undefined ){ return DrillUp.g_XETT_line_mode; }
	return this._drill_data['animLine_mode'];
}
//==============================
// * 控制器 - 自动显现（批注线） - 设置时间（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setLineAnimTime = function( time, delay ){
	var data = this._drill_data;
	data['animLine_time'] = time;
	data['animLine_delay'] = delay;
}
//==============================
// * 控制器 - 自动显现（批注线） - 获取时间（开放函数）
//
//			说明：	> 函数返回值为数字，不存在空值情况。
//==============================
Drill_ET_Controller.prototype.drill_XETT_getData_animLine_time = function(){
	if( this._drill_data['animLine_time'] === undefined ){ return DrillUp.g_XETT_line_time; }
	return this._drill_data['animLine_time'];
}
Drill_ET_Controller.prototype.drill_XETT_getData_animLine_delay = function(){
	if( this._drill_data['animLine_delay'] === undefined ){ return DrillUp.g_XETT_line_delay; }
	return this._drill_data['animLine_delay'];
}

//==============================
// * 控制器 - 自动显现（背景） - 设置模式（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setBackgroundAnimMode = function( mode ){
	var data = this._drill_data;
	data['animBackground_mode'] = mode;
}
//==============================
// * 控制器 - 自动显现（背景） - 获取模式（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_getData_animBackground_mode = function(){
	if( this._drill_data['animBackground_mode'] === undefined ){ return DrillUp.g_XETT_background_mode; }
	return this._drill_data['animBackground_mode'];
}
//==============================
// * 控制器 - 自动显现（背景） - 设置时间（开放函数）
//==============================
Drill_ET_Controller.prototype.drill_XETT_setBackgroundAnimTime = function( time, delay ){
	var data = this._drill_data;
	data['animBackground_time'] = time;
	data['animBackground_delay'] = delay;
}
//==============================
// * 控制器 - 自动显现（背景） - 获取时间（开放函数）
//
//			说明：	> 函数返回值为数字，不存在空值情况。
//==============================
Drill_ET_Controller.prototype.drill_XETT_getData_animBackground_time = function(){
	if( this._drill_data['animBackground_time'] === undefined ){ return DrillUp.g_XETT_background_time; }
	return this._drill_data['animBackground_time'];
}
Drill_ET_Controller.prototype.drill_XETT_getData_animBackground_delay = function(){
	if( this._drill_data['animBackground_delay'] === undefined ){ return DrillUp.g_XETT_background_delay; }
	return this._drill_data['animBackground_delay'];
}


//=============================================================================
// ** ☆事件漂浮文字 贴图（继承）
//=============================================================================
//==============================
// * 文字贴图 - 初始化子功能（继承）
//==============================
var _drill_XETT_ET_sp_initChild = Drill_ET_WindowSprite.prototype.drill_sprite_initChild;
Drill_ET_WindowSprite.prototype.drill_sprite_initChild = function(){
    _drill_XETT_ET_sp_initChild.call( this );
	
	this._drill_XETT_curTime = 0;
	this._drill_XETT_maxTime = 0;
}
//==============================
// * 文字贴图 - 帧刷新（继承）
//==============================
var _drill_XETT_ET_sp_update = Drill_ET_WindowSprite.prototype.update;
Drill_ET_WindowSprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	_drill_XETT_ET_sp_update.call(this);
	
	this.drill_XETT_updateTime();			//帧刷新 - 时间流逝
	this.drill_XETT_updateChange();			//帧刷新 - 变化过程
	this.drill_XETT_updateSound();			//帧刷新 - 显示声音控制
}
//==============================
// * 文字贴图 - 帧刷新 - 时间流逝
//
//			说明：	> 此流逝在贴图中进行，与控制器无关。
//==============================
Drill_ET_WindowSprite.prototype.drill_XETT_updateTime = function() {
	var d_data = this._drill_controller._drill_data;
	if( d_data['animEnabled'] != true ){ return; }
	
	// > 最大时间
	this._drill_XETT_maxTime = this._drill_controller.drill_XETT_getMaxTime();
	
	// > 显现
	if( this.drill_XETT_canShow() ){
		
		// > 时间+1
		this._drill_XETT_curTime += 1;
		if( this._drill_XETT_curTime > this._drill_XETT_maxTime ){
			this._drill_XETT_curTime = this._drill_XETT_maxTime;
		}
	
	// > 隐藏
	}else{
		
		// > 时间-1
		this._drill_XETT_curTime -= 1;
		if( this._drill_XETT_curTime < 0 ){
			this._drill_XETT_curTime = 0;
		}
	}
}
//==============================
// * 文字贴图 - 帧刷新 - 变化过程
//==============================
Drill_ET_WindowSprite.prototype.drill_XETT_updateChange = function() {
	var d_data = this._drill_controller._drill_data;
	if( d_data['animEnabled'] != true ){ return; }
	
	// > 参数准备
	var animText_time =  this._drill_controller.drill_XETT_getData_animText_time();
	var animText_delay = this._drill_controller.drill_XETT_getData_animText_delay();
	var animLine_mode = this._drill_controller.drill_XETT_getData_animLine_mode();
	var animLine_time =  this._drill_controller.drill_XETT_getData_animLine_time();
	var animLine_delay = this._drill_controller.drill_XETT_getData_animLine_delay();
	var animBackground_mode = this._drill_controller.drill_XETT_getData_animBackground_mode();
	var animBackground_time =  this._drill_controller.drill_XETT_getData_animBackground_time();
	var animBackground_delay = this._drill_controller.drill_XETT_getData_animBackground_delay();
	
	// > 文本域 透明度
	var time = this._drill_XETT_curTime - animText_delay;
	if( time < 0 ){ time = 0; }
	this.contentsOpacity = this._drill_controller._drill_textOpacity * time / animText_time;	//（文本域 透明度）
	
	// > 背景容器层 透明度
	if( d_data['frameVisible'] == true ){
		this.opacity = this._drill_controller._drill_frameOpacity * time / animText_time;	
	}else{
		this.opacity = this._drill_controller._drill_frameOpacity;
	}
	
	// > 批注线透明度【注意XETL】
	if( this._drill_XETL_curSprite ){
		var time = this._drill_XETT_curTime - animLine_delay;
		if( time < 0 ){ time = 0; }
		if( animLine_mode == "透明度变化" ){
			this._drill_XETL_curSprite.opacity = 255 * time / animLine_time;
		}
		var bitmap = this._drill_XETL_curSprite.bitmap;
		var ww = bitmap.width * time / animLine_time;
		if( animLine_mode == "遮罩变化-自动" ){
			if( d_data['x'] < 0 ){	//（从右往左）
				var xx = bitmap.width - ww;
				if( xx < 0 ){ xx = 0; }
				this._drill_XETL_curSprite.x += xx;		//（从该基础上增加）
				this._drill_XETL_curSprite.drill_XETT_setFrame( xx, 0, bitmap.width, bitmap.height ); 
			}else{					//（从左往右）
				this._drill_XETL_curSprite.drill_XETT_setFrame( 0, 0, ww, bitmap.height ); 
			}
		}
		if( animLine_mode == "遮罩变化-从右往左" ){
			var xx = bitmap.width - ww;
			if( xx < 0 ){ xx = 0; }
			this._drill_XETL_curSprite.x += xx;			//（从该基础上增加）
			this._drill_XETL_curSprite.drill_XETT_setFrame( xx, 0, bitmap.width, bitmap.height );
		}
		if( animLine_mode == "遮罩变化-从左往右" ){
			this._drill_XETL_curSprite.drill_XETT_setFrame( 0, 0, ww, bitmap.height );
		}
	}
	
	// > 背景透明度【注意XETB】
	if( this._drill_XETB_curBackground ){
		var time = this._drill_XETT_curTime - animBackground_delay;
		if( time < 0 ){ time = 0; }
		if( animBackground_mode == "透明度变化" ){
			this._drill_XETB_curBackground.opacity = 255 * time / animBackground_time;
		}
		var bitmap = this._drill_XETB_curBackground.bitmap;
		var ww = bitmap.width * time / animBackground_time;
		if( animBackground_mode == "遮罩变化-自动" ){
			if( d_data['x'] < 0 ){	//（从右往左）
				var xx = bitmap.width - ww;
				if( xx < 0 ){ xx = 0; }
				this._drill_XETB_curBackground.x += xx;		//（从该基础上增加）
				this._drill_XETB_curBackground.drill_XETT_setFrame( xx, 0, bitmap.width, bitmap.height ); 
			}else{					//（从左往右）
				this._drill_XETB_curBackground.drill_XETT_setFrame( 0, 0, ww, bitmap.height ); 
			}
		}
		if( animBackground_mode == "遮罩变化-从右往左" ){
			var xx = bitmap.width - ww;
			if( xx < 0 ){ xx = 0; }
			this._drill_XETB_curBackground.x += xx;			//（从该基础上增加）
			this._drill_XETB_curBackground.drill_XETT_setFrame( xx, 0, bitmap.width, bitmap.height );
		}
		if( animBackground_mode == "遮罩变化-从左往右" ){
			this._drill_XETB_curBackground.drill_XETT_setFrame( 0, 0, ww, bitmap.height ); 
		}
	}
}
//==============================
// * 文字贴图 - 显现条件
//==============================
Drill_ET_WindowSprite.prototype.drill_XETT_canShow = function() {
	var d_data = this._drill_controller._drill_data;
	if( d_data['animForceActived'] == true ){ return true; }
	if( Math.abs( this._drill_event.x - $gamePlayer.x ) < this._drill_controller.drill_XETT_getData_triggerRange_x() &&
		Math.abs( this._drill_event.y - $gamePlayer.y ) < this._drill_controller.drill_XETT_getData_triggerRange_y() ){
		return true;
	}
	return false;
}
//=============================================================================
// * 优化 - 浮点数过滤
//
//			说明：	用floor防止 浮点数 比较时，造成frame的反复刷新。
//=============================================================================
Sprite.prototype.drill_XETT_setFrame = function( x, y, width, height ){
	this.setFrame( Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height) );
}


//=============================================================================
// ** ☆显现声音控制『音效模块』
//
//			说明：	> 此模块控制 显现声音 的播放。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 显现声音控制 - 帧刷新
//==============================
Drill_ET_WindowSprite.prototype.drill_XETT_updateSound = function() {
	var se_played = false;		//（播放锁，防止同一帧播放多个音效）
	var animText_delay = this._drill_controller.drill_XETT_getData_animText_delay();
	var animLine_delay = this._drill_controller.drill_XETT_getData_animLine_delay();
	var animBackground_delay = this._drill_controller.drill_XETT_getData_animBackground_delay();
	
	// > 只在显示时播放声音
	var cur_time = this._drill_XETT_curTime;
	if( this.drill_XETT_canShow() && cur_time > 0 ){
		
		// > 声音资源
		var index = $gameSystem._drill_XETT_curSoundIndex;
		if( $gameSystem._drill_XETT_randomSoundEnabled == true ){
			index = $gameSystem.drill_XETT_getRandomSoundIndex();
		}
		var se_data = DrillUp.g_XETT_soundList[ index ];
		if( se_data == undefined ){ return; }
		
		var time = cur_time - animText_delay;
		if( time == 1 ){		//（监听时间1，排除时间0反复触发的情况）
			if( se_played == false ){
				se_played = true;
				AudioManager.playSe( se_data['se_text'] );
			}
		}
		var time = cur_time - animLine_delay;
		if( time == 1 ){
			if( se_played == false ){
				se_played = true;
				AudioManager.playSe( se_data['se_line'] );
			}
		}
		var time = cur_time - animBackground_delay;
		if( time == 1 ){
			if( se_played == false ){
				se_played = true;
				AudioManager.playSe( se_data['se_background'] );
			}
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_X_EventTextTransparent = false;
		var pluginTip = DrillUp.drill_XETT_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


