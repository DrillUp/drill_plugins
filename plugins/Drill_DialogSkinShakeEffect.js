//=============================================================================
// Drill_DialogSkinShakeEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        对话框 - 对话框的震动效果
 * @author Drill_up
 * 
 * @Drill_LE_param "震动样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DSSE_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_DialogSkinShakeEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在给对话框添加震动效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_DialogSkin              对话框-对话框皮肤★★v1.9及以上★★
 *     必须基于对话框皮肤插件，才能设置震动效果。
 * 可被扩展：
 *   - Drill_CoreOfDialog            对话框-对话框优化核心
 *     临时震动的功能，需要该插件才能生效。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于对话框和其子窗口。
 * 2.详细内容和图解，去看看 "15.对话框 > 关于对话框皮肤.docx"。
 * 开启震动：
 *   (1.该设置能保持对话框长时间的震动。
 *      震动样式同时只能有一种，无法实现多个窗口不同的震动样式。
 *   (2.该设置还能附加 震动条件 。
 *      默认为"无条件"，你可以设置为"对话文本播放时"，
 *      使得震动开启后，只在对话框播放时才震动，其他时间不震动。
 * 临时震动：
 *   (1.临时震动与开启震动 的功能相互独立，二者功能可以叠加。
 *      临时震动需要在对话框中插入窗口字符实现震动。
 * 设计：
 *   (1.临时震动的窗口字符+脸图的窗口字符，
 *      可以实现角色在说话时，突然很震惊的表情效果。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令手动控制震动：
 * 
 * 插件指令：>对话框的震动效果 : 修改震动样式 : 样式[1]
 * 插件指令：>对话框的震动效果 : 恢复默认震动样式
 * 
 * 插件指令：>对话框的震动效果 : 对话框及全部子窗口 : 开启震动
 * 插件指令：>对话框的震动效果 : 对话框及全部子窗口 : 关闭震动
 * 插件指令：>对话框的震动效果 : 只对话框 : 开启震动
 * 插件指令：>对话框的震动效果 : 只对话框 : 关闭震动
 * 插件指令：>对话框的震动效果 : 只金钱窗口 : 开启震动
 * 插件指令：>对话框的震动效果 : 只金钱窗口 : 关闭震动
 * 插件指令：>对话框的震动效果 : 只选择项窗口 : 开启震动
 * 插件指令：>对话框的震动效果 : 只选择项窗口 : 关闭震动
 * 插件指令：>对话框的震动效果 : 只数字输入窗口 : 开启震动
 * 插件指令：>对话框的震动效果 : 只数字输入窗口 : 关闭震动
 * 插件指令：>对话框的震动效果 : 只选择物品窗口 : 开启震动
 * 插件指令：>对话框的震动效果 : 只选择物品窗口 : 关闭震动
 * 插件指令：>对话框的震动效果 : 只姓名框窗口 : 开启震动
 * 插件指令：>对话框的震动效果 : 只姓名框窗口 : 关闭震动
 * 
 * 1."开启震动"后，立即生效，且永久有效。
 *   要记得在对话框播放完后添加"关闭震动"的指令。
 *   震动样式同时只能有一种，无法实现多个窗口不同的震动样式。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 震动条件
 * 你还可以通过窗口字符，进行临时震动：
 * 
 * 插件指令：>对话框的震动效果 : 修改条件 : 无条件
 * 插件指令：>对话框的震动效果 : 修改条件 : 对话文本播放时
 * 插件指令：>对话框的震动效果 : 恢复默认条件
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 临时震动
 * 你还可以通过窗口字符，进行临时震动：
 * 
 * 窗口字符：\dDSSE[对话框及全部子窗口:1:30]   遇到该字符时，使用样式1立即震动30帧。
 * 窗口字符：\dDSSE[只对话框:1:30]             遇到该字符时，使用样式1立即震动30帧。
 * 窗口字符：\dDSSE[只金钱窗口:1:30]           遇到该字符时，使用样式1立即震动30帧。
 * 窗口字符：\dDSSE[只选择项窗口:1:30]         遇到该字符时，使用样式1立即震动30帧。
 * 窗口字符：\dDSSE[只数字输入窗口:1:30]       遇到该字符时，使用样式1立即震动30帧。
 * 窗口字符：\dDSSE[只选择物品窗口:1:30]       遇到该字符时，使用样式1立即震动30帧。
 * 窗口字符：\dDSSE[只姓名框窗口:1:30]         遇到该字符时，使用样式1立即震动30帧。
 * 
 * 1.临时震动的功能必须要加插件 对话框-对话框优化核心 才能生效，
 *   在对话框内容中插入 上述窗口字符 实现临时震动。
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
 * 时间复杂度： o(n^2)*o(窗口数) 每帧
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【8.70ms】
 *              地图界面中，平均消耗为：【12.46ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.震动效果只影响对话框和子窗口的坐标，消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 *
 * 
 * @param 震动条件
 * @type select
 * @option 无条件
 * @value 无条件
 * @option 对话文本播放时
 * @value 对话文本播放时
 * @desc 开启震动后，震动会根据条件来决定震动时机。可以通过插件指令修改。
 * @default 无条件
 *
 * @param 默认震动样式
 * @type number
 * @min 1
 * @desc 窗口默认使用的震动样式。
 * @default 1
 *
 * @param ---震动样式集---
 * @default
 *
 * @param 震动样式-1
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default {"标签":"==标准震动==","---震动---":"","震动类型":"上右下左顺时针震动","震动帧间隔":"5","震动距离":"4","---特殊---":"","文本域是否一起震动":"false"}
 *
 * @param 震动样式-2
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default {"标签":"==标准震动+文本域==","---震动---":"","震动类型":"上右下左顺时针震动","震动帧间隔":"5","震动距离":"4","---特殊---":"","文本域是否一起震动":"true"}
 *
 * @param 震动样式-3
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default {"标签":"==剧烈震动==","---震动---":"","震动类型":"上右下左顺时针震动","震动帧间隔":"2","震动距离":"8","---特殊---":"","文本域是否一起震动":"false"}
 * 
 * @param 震动样式-4
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default {"标签":"==剧烈震动+文本域==","---震动---":"","震动类型":"上右下左顺时针震动","震动帧间隔":"2","震动距离":"8","---特殊---":"","文本域是否一起震动":"true"}
 * 
 * @param 震动样式-5
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-6
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-7
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-8
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-9
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-10
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-11
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-12
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-13
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-14
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-15
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-16
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-17
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-18
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-19
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 * @param 震动样式-20
 * @parent ---震动样式集---
 * @type struct<DrillDSSEStyle>
 * @desc 对话框的震动效果样式配置。
 * @default 
 * 
 */
/*~struct~DrillDSSEStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的震动样式==
 * 
 *
 * @param ---震动---
 * @default
 * 
 * @param 震动类型
 * @parent ---震动---
 * @type select
 * @option 左右震动
 * @value 左右震动
 * @option 上下震动
 * @value 上下震动
 * @option 上右下左顺时针震动
 * @value 上右下左顺时针震动
 * @option 上左下右逆时针震动
 * @value 上左下右逆时针震动
 * @desc 震动样式的类型。
 * @default 上右下左顺时针震动
 * 
 * @param 震动帧间隔
 * @parent ---震动---
 * @type number
 * @min 1
 * @desc 震动样式的帧间隔，间隔越小震动越快。（1秒60帧）
 * @default 6
 *
 * @param 震动距离
 * @parent ---震动---
 * @type number
 * @min 1
 * @desc 震动时偏移的距离量，单位像素。
 * @default 4
 *
 *
 * @param ---特殊---
 * @default
 * 
 * @param 文本域是否一起震动
 * @parent ---特殊---
 * @type boolean
 * @on 震动
 * @off 关闭震动
 * @desc true - 震动，false - 关闭震动。默认文本域关闭震动，因为会影响玩家阅读文本内容。
 * @default false
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		DSSE（Dialog_Skin_Shake_Effect）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(窗口数) 每帧
//		★性能测试因素	对话框管理层
//		★性能测试消耗	2026/4/25：
//							》8.7ms（drill_DSSE_updateWindowBind）1.8ms（drill_DSSE_updateSustainShake）
//		★最坏情况		暂无
//		★备注			暂无
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
//				->是否正在震动
//			->☆窗口字符应用之效果字符
//				->临时震动字符
//				> \dDSSE[只对话框:1:30]
//			
//			->☆震动控制
//				->帧刷新 开启震动时
//				->帧刷新 临时震动时
//			
//			->☆对话框绑定
//				->（原窗口皮肤）
//				->（窗口皮肤边贴图）
//			->☆对话框子窗口绑定
//				->4A金钱窗口
//				->4B选择项窗口
//				->4C数字输入窗口
//				->4D选择物品窗口
//				->4E姓名框窗口
//			->☆插件兼容
//				->（气泡尖角贴图）
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
//			无
//		
//		★其它说明细节：
//			暂无
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
	DrillUp.g_DSSE_PluginTip_curName = "Drill_DialogSkinShakeEffect.js 对话框-对话框的震动效果";
	DrillUp.g_DSSE_PluginTip_baseList = ["Drill_DialogSkin.js 对话框-对话框皮肤"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_DSSE_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_DSSE_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_DSSE_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_DSSE_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_DSSE_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 日志 - 未配置的参数
	//==============================
	DrillUp.drill_DSSE_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_DSSE_PluginTip_curName + "】\n找不到 震动样式["+(style_id+1)+"] 的配置，请检查 插件指令、窗口字符、样式配置。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_DialogSkinShakeEffect = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogSkinShakeEffect');

	//==============================
	// * 静态数据 - 样式
	//				（~struct~DrillDSSEStyle）
	//==============================
	DrillUp.drill_DSSE_initStyle = function( dataFrom ){
		var data = {};
		
		data['shake_type'] = String( dataFrom["震动类型"] || "上右下左顺时针震动");
		data['shake_interval'] = Number( dataFrom["震动帧间隔"] || 6);
		data['shake_offset'] = Number( dataFrom["震动距离"] || 4);
		
		data['context_enabled'] = String( dataFrom["文本域是否一起震动"] || "false") == "true";
		
		return data;
	}
	
	/*-----------------样式集------------------*/
	DrillUp.g_DSSE_list_length = 20;
	DrillUp.g_DSSE_list = [];
	for( var i = 0; i < DrillUp.g_DSSE_list_length; i++ ){
		if( DrillUp.parameters["震动样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["震动样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["震动样式-" + String(i+1) ]);
			DrillUp.g_DSSE_list[i] = DrillUp.drill_DSSE_initStyle( data );
		}else{
			DrillUp.g_DSSE_list[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_DSSE_styleId = Number(DrillUp.parameters["默认震动样式"] || 1);
	DrillUp.g_DSSE_condition = String(DrillUp.parameters["震动条件"] || "无条件");
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_DialogSkin ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_DSSE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_DSSE_pluginCommand.call(this, command, args);
	this.drill_DSSE_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_DSSE_pluginCommand = function( command, args ){
	if( command === ">对话框的震动效果" ){
		
		/*-----------------震动样式------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改震动样式" ){
				if( temp1.indexOf("样式[") != -1 ){
					temp1 = temp1.replace("样式[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DSSE_curStyleId = Number(temp1) -1;
				}
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "恢复默认震动样式" ){
				$gameSystem._drill_DSSE_curStyleId = DrillUp.g_DSSE_styleId -1;
			}
		}
		
		/*-----------------震动条件------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改条件" ){
				$gameSystem._drill_DSSE_curCondition = temp1;
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "恢复默认条件" ){
				$gameSystem._drill_DSSE_curCondition = DrillUp.g_DSSE_condition;
			}
		}
		
		/*-----------------开启震动------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "开启震动" ){
				if( temp1 == "对话框及全部子窗口" ){
					$gameSystem.drill_DSSE_addWindow("Window_Message");
					$gameSystem.drill_DSSE_addWindow("Window_Gold");
					$gameSystem.drill_DSSE_addWindow("Window_ChoiceList");
					$gameSystem.drill_DSSE_addWindow("Window_NumberInput");
					$gameSystem.drill_DSSE_addWindow("Window_EventItem");
					$gameSystem.drill_DSSE_addWindow("Drill_DNB_NameBoxWindow");
					$gameSystem.drill_DSSE_addWindow("Window_NameBox");
				}
				if( temp1 == "只对话框" ){
					$gameSystem.drill_DSSE_addWindow("Window_Message");
				}
				if( temp1 == "只金钱窗口" ){
					$gameSystem.drill_DSSE_addWindow("Window_Gold");
				}
				if( temp1 == "只选择项窗口" ){
					$gameSystem.drill_DSSE_addWindow("Window_ChoiceList");
				}
				if( temp1 == "只数字输入窗口" ){
					$gameSystem.drill_DSSE_addWindow("Window_NumberInput");
				}
				if( temp1 == "只选择物品窗口" ){
					$gameSystem.drill_DSSE_addWindow("Window_EventItem");
				}
				if( temp1 == "只姓名框窗口" ){
					$gameSystem.drill_DSSE_addWindow("Drill_DNB_NameBoxWindow");
					$gameSystem.drill_DSSE_addWindow("Window_NameBox");
				}
			}
			if( type == "关闭震动" ){
				if( temp1 == "对话框及全部子窗口" ){
					$gameSystem.drill_DSSE_removeAllWindow();
				}
				if( temp1 == "只对话框" ){
					$gameSystem.drill_DSSE_removeWindow("Window_Message");
				}
				if( temp1 == "只金钱窗口" ){
					$gameSystem.drill_DSSE_removeWindow("Window_Gold");
				}
				if( temp1 == "只选择项窗口" ){
					$gameSystem.drill_DSSE_removeWindow("Window_ChoiceList");
				}
				if( temp1 == "只数字输入窗口" ){
					$gameSystem.drill_DSSE_removeWindow("Window_NumberInput");
				}
				if( temp1 == "只选择物品窗口" ){
					$gameSystem.drill_DSSE_removeWindow("Window_EventItem");
				}
				if( temp1 == "只姓名框窗口" ){
					$gameSystem.drill_DSSE_removeWindow("Drill_DNB_NameBoxWindow");
					$gameSystem.drill_DSSE_removeWindow("Window_NameBox");
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
DrillUp.g_DSSE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSSE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DSSE_sys_initialize.call(this);
	this.drill_DSSE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSSE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DSSE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DSSE_saveEnabled == true ){	
		$gameSystem.drill_DSSE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DSSE_initSysData();
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
Game_System.prototype.drill_DSSE_initSysData = function() {
	this.drill_DSSE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DSSE_checkSysData = function() {
	this.drill_DSSE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DSSE_initSysData_Private = function() {
	
	// > 开启震动时
	this._drill_DSSE_curStyleId = DrillUp.g_DSSE_styleId -1;
	this._drill_DSSE_curCondition = DrillUp.g_DSSE_condition;
	this._drill_DSSE_curWindow = [];
	
	// > 临时震动时
	this._drill_DSSE_charStyleId = -1;
	this._drill_DSSE_charSustain = 0;
	this._drill_DSSE_charWindow = [];
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DSSE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DSSE_curStyleId == undefined ){
		this.drill_DSSE_initSysData();
	}
};
//==============================
// * 存储数据 - 是否正在震动（开放函数）
//==============================
Game_System.prototype.drill_DSSE_isWindowShaking = function( window_name ){
	
	// > 开启震动时
	if( this._drill_DSSE_curWindow.length > 0 ){
		if( this._drill_DSSE_curWindow.indexOf( window_name ) >= 0 ){
			return true;
		}
	}
	
	// > 临时震动时
	if( this._drill_DSSE_charWindow.length > 0 ){
		if( this._drill_DSSE_charWindow.indexOf( window_name ) >= 0 ){
			return true;
		}
	}
	return false;
};
//==============================
// * 存储数据 - 开启震动时 - 添加窗口（开放函数）
//==============================
Game_System.prototype.drill_DSSE_addWindow = function( window_name ){
	if( this._drill_DSSE_curWindow.indexOf( window_name ) >= 0 ){ return; }
	this._drill_DSSE_curWindow.push( window_name );
};
//==============================
// * 存储数据 - 开启震动时 - 去除窗口（开放函数）
//==============================
Game_System.prototype.drill_DSSE_removeWindow = function( window_name ){
	for( var i = this._drill_DSSE_curWindow.length -1; i >= 0; i-- ){
		if( this._drill_DSSE_curWindow[i] == window_name ){
			this._drill_DSSE_curWindow.splice( i, 1 );
		}
	}
};
//==============================
// * 存储数据 - 开启震动时 - 去除全部窗口（开放函数）
//==============================
Game_System.prototype.drill_DSSE_removeAllWindow = function(){
	this._drill_DSSE_curWindow = [];
};
//==============================
// * 存储数据 - 临时震动时 - 设置（开放函数）
//==============================
Game_System.prototype.drill_DSSE_setCharShake = function( window_name_list, style_id, sustain ){
	this._drill_DSSE_charStyleId = style_id;
	this._drill_DSSE_charSustain = sustain;
	this._drill_DSSE_charWindow = window_name_list;
};


//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
if( Imported.Drill_CoreOfDialog ){
	//（该插件是 对话框 的震动效果，窗口字符肯定写在对话框内，所以必须要对话框优化核心）
	
	//==============================
	// * 窗口字符应用之效果字符 - 组合符配置（继承）
	//==============================
	var _drill_DSSE_COWC_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
	Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
		_drill_DSSE_COWC_effect_processCombined.call( this, matched_index, matched_str, command, args );
		
		// > 『窗口字符定义』 - 临时震动字符（\dDSSE[只对话框:1:30]）
		if( command == "dDSSE" ){
			if( args.length == 3 ){
				this.drill_COWC_effect_submitCombined( "@@@dse["+String(args[0])+":"+String(args[1])+":"+String(args[2])+"]" );
				return;
			}
		}
	};
	//==============================
	// * 窗口字符应用之效果字符 - 样式阶段-配置阶段（继承）
	//==============================
	var _drill_DSSE_COCD_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
	Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
		_drill_DSSE_COCD_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
		
		// > 『底层字符定义』 - 临时震动字符（@@@dse[只对话框:1:30]） drill_shake_effect
		if( command == "@@@dse" ){	//（大小写敏感）
			if( args.length == 3 ){
				var window_name_list = [];
				if( String(args[0]) == "对话框及全部子窗口" ){
					window_name_list.push("Window_Message");
					window_name_list.push("Window_Gold");
					window_name_list.push("Window_ChoiceList");
					window_name_list.push("Window_NumberInput");
					window_name_list.push("Window_EventItem");
					window_name_list.push("Drill_DNB_NameBoxWindow");
					window_name_list.push("Window_NameBox");
					cur_blockParam['DSSE_data'] = {};
					cur_blockParam['DSSE_data']['window_name_list'] = window_name_list;
					cur_blockParam['DSSE_data']['style_id'] = Number(args[1]) -1;
					cur_blockParam['DSSE_data']['sustain']  = Number(args[2]);
				}
				if( String(args[0]) == "只对话框" ){
					window_name_list.push("Window_Message");
					cur_blockParam['DSSE_data'] = {};
					cur_blockParam['DSSE_data']['window_name_list'] = window_name_list;
					cur_blockParam['DSSE_data']['style_id'] = Number(args[1]) -1;
					cur_blockParam['DSSE_data']['sustain']  = Number(args[2]);
				}
				if( String(args[0]) == "只金钱窗口" ){
					window_name_list.push("Window_Gold");
					cur_blockParam['DSSE_data'] = {};
					cur_blockParam['DSSE_data']['window_name_list'] = window_name_list;
					cur_blockParam['DSSE_data']['style_id'] = Number(args[1]) -1;
					cur_blockParam['DSSE_data']['sustain']  = Number(args[2]);
				}
				if( String(args[0]) == "只选择项窗口" ){
					window_name_list.push("Window_ChoiceList");
					cur_blockParam['DSSE_data'] = {};
					cur_blockParam['DSSE_data']['window_name_list'] = window_name_list;
					cur_blockParam['DSSE_data']['style_id'] = Number(args[1]) -1;
					cur_blockParam['DSSE_data']['sustain']  = Number(args[2]);
				}
				if( String(args[0]) == "只数字输入窗口" ){
					window_name_list.push("Window_NumberInput");
					cur_blockParam['DSSE_data'] = {};
					cur_blockParam['DSSE_data']['window_name_list'] = window_name_list;
					cur_blockParam['DSSE_data']['style_id'] = Number(args[1]) -1;
					cur_blockParam['DSSE_data']['sustain']  = Number(args[2]);
				}
				if( String(args[0]) == "只选择物品窗口" ){
					window_name_list.push("Window_EventItem");
					cur_blockParam['DSSE_data'] = {};
					cur_blockParam['DSSE_data']['window_name_list'] = window_name_list;
					cur_blockParam['DSSE_data']['style_id'] = Number(args[1]) -1;
					cur_blockParam['DSSE_data']['sustain']  = Number(args[2]);
				}
				if( String(args[0]) == "只姓名框窗口" ){
					window_name_list.push("Drill_DNB_NameBoxWindow");
					window_name_list.push("Window_NameBox");
					cur_blockParam['DSSE_data'] = {};
					cur_blockParam['DSSE_data']['window_name_list'] = window_name_list;
					cur_blockParam['DSSE_data']['style_id'] = Number(args[1]) -1;
					cur_blockParam['DSSE_data']['sustain']  = Number(args[2]);
				}
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	};
	//==============================
	// * 窗口字符应用之效果字符（2S脸图管理） - 底层字符 - 样式阶段-回滚样式
	//==============================
	var _drill_DSSE_COCD_textBlock_restoreStyle = Game_Temp.prototype.drill_COCD_textBlock_restoreStyle;
	Game_Temp.prototype.drill_COCD_textBlock_restoreStyle = function( cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
		_drill_DSSE_COCD_textBlock_restoreStyle.call( this, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
		
		// > 『底层字符样式回滚』 - 临时震动字符（@@@dse[只对话框:1:30]）
		cur_blockParam['DSSE_data'] = undefined;
	}
	//==============================
	// * 窗口字符应用之效果字符 - 绘制过程 - 每个字符开始时（继承）
	//==============================
	var _drill_DSSE_COWC_timing_textStart = Bitmap.prototype.drill_COWC_timing_textStart;
	Bitmap.prototype.drill_COWC_timing_textStart = function( textBlock, row_index, text_index ){
		_drill_DSSE_COWC_timing_textStart.call( this, textBlock, row_index, text_index );
		/*
			这个过程已经处于 逐个绘制 中，且 <xxx>  \xxx  \xxx[xxx]  @@@xxx 全部都转换完毕。
			进入到此函数，至少与前面的字符解析过程相差1帧，具体看update情况。
		*/
		var cur_blockParam = textBlock.drill_textBlock_getBlockParam();
		
		// > 『绘制过程定义』 - 播放临时震动
		if( cur_blockParam['DSSE_data'] != undefined ){
			$gameSystem.drill_DSSE_setCharShake( cur_blockParam['DSSE_data']['window_name_list'], cur_blockParam['DSSE_data']['style_id'], cur_blockParam['DSSE_data']['sustain'] );
		}
	}
}



//=============================================================================
// ** ☆震动控制
//
//			说明：	> 此模块提供 震动造成的偏移量。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 震动控制 - 初始化
//==============================
var _drill_DSSE_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_DSSE_temp_initialize.call(this);
	this._drill_DSSE_curTime = 0;		//计数器
	this._drill_DSSE_x = 0;				//震动偏移量X
	this._drill_DSSE_y = 0;				//震动偏移量Y
}
//==============================
// * 震动控制 - 只报错一次
//==============================
DrillUp.g_DSSE_CheckStyleId = true;
//==============================
// * 震动控制（兼容） - 『对话框的帧刷新』
//==============================
var _drill_DSSE_massage_update1 = Window_Message.prototype.update;
Window_Message.prototype.update = function(){
	_drill_DSSE_massage_update1.call(this);
	
	$gameTemp._drill_DSSE_curTime += 1;		//帧刷新 - 计数器+1
	this.drill_DSSE_updateSustainShake();	//帧刷新 - 开启震动时
	this.drill_DSSE_updateCharShake();		//帧刷新 - 临时震动时
};
//==============================
// * 震动控制（对话框优化核心） - 『对话框的帧刷新』
//==============================
if( Imported.Drill_CoreOfDialog ){
	var _drill_DSSE_CODi_message_update1 = Window_Message.prototype.drill_CODi_message_update;
	Window_Message.prototype.drill_CODi_message_update = function(){
		_drill_DSSE_CODi_message_update1.call(this);
		
		$gameTemp._drill_DSSE_curTime += 1;		//帧刷新 - 计数器+1
		this.drill_DSSE_updateSustainShake();	//帧刷新 - 开启震动时
		this.drill_DSSE_updateCharShake();		//帧刷新 - 临时震动时
	};
}
//==============================
// * 帧刷新 - 开启震动时
//==============================
Window_Message.prototype.drill_DSSE_updateSustainShake = function(){
	if( $gameSystem._drill_DSSE_curWindow.length == 0 ){ return; }
	var style_id = $gameSystem._drill_DSSE_curStyleId;
	
	var time = $gameTemp._drill_DSSE_curTime;
	var data = DrillUp.g_DSSE_list[ style_id ];
	if( data == undefined ){
		if( DrillUp.g_DSSE_CheckStyleId == true ){
			DrillUp.g_DSSE_CheckStyleId = false;
			alert( DrillUp.drill_DSSE_getPluginTip_StyleNotFind(style_id) );
		}
		return;
	}
	
	// > 开启震动时 - 震动偏移量
	var xx = 0;
	var yy = 0;
	if( data['shake_type'] == "左右震动" ){
		if( Math.floor(time/ data['shake_interval'] )%2 == 0 ){
			xx = data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%2 == 1 ){
			xx = -1 * data['shake_offset'];
		}
	}
	if( data['shake_type'] == "上下震动" ){
		if( Math.floor(time/ data['shake_interval'] )%2 == 0 ){
			yy = data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%2 == 1 ){
			yy = -1 * data['shake_offset'];
		}
	}
	if( data['shake_type'] == "上右下左顺时针震动" ){
		if( Math.floor(time/ data['shake_interval'] )%4 == 0 ){
			yy = -1 * data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 1 ){
			xx = data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 2 ){
			yy = data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 3 ){
			xx = -1 * data['shake_offset'];
		}
	}
	if( data['shake_type'] == "上左下右逆时针震动" ){
		if( Math.floor(time/ data['shake_interval'] )%4 == 0 ){
			yy = -1 * data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 1 ){
			xx = -1 * data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 2 ){
			yy = data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 3 ){
			xx = data['shake_offset'];
		}
	}
	
	// > 开启震动时 - 震动条件（对话文本播放时）
	if( $gameSystem._drill_DSSE_curCondition == "对话文本播放时" ){
		if( this.drill_COWC_timing_isPlaying() == true ){
			$gameTemp._drill_DSSE_x = xx;
			$gameTemp._drill_DSSE_y = yy;
		}else{
			$gameTemp._drill_DSSE_x = 0;
			$gameTemp._drill_DSSE_y = 0;
		}
		
	// > 开启震动时 - 震动条件（无条件）
	}else{
		$gameTemp._drill_DSSE_x = xx;
		$gameTemp._drill_DSSE_y = yy;
	}
}
//==============================
// * 帧刷新 - 临时震动时
//==============================
Window_Message.prototype.drill_DSSE_updateCharShake = function(){
	if( $gameSystem._drill_DSSE_charWindow.length == 0 ){ return; }
	var style_id = $gameSystem._drill_DSSE_charStyleId;
	
	var time = $gameTemp._drill_DSSE_curTime;
	var data = DrillUp.g_DSSE_list[ style_id ];
	if( data == undefined ){
		if( DrillUp.g_DSSE_CheckStyleId == true ){
			DrillUp.g_DSSE_CheckStyleId = false;
			alert( DrillUp.drill_DSSE_getPluginTip_StyleNotFind(style_id) );
		}
		return;
	}
	
	// > 临时震动时 - 震动偏移量
	var xx = 0;
	var yy = 0;
	if( data['shake_type'] == "左右震动" ){
		if( Math.floor(time/ data['shake_interval'] )%2 == 0 ){
			xx = data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%2 == 1 ){
			xx = -1 * data['shake_offset'];
		}
	}
	if( data['shake_type'] == "上下震动" ){
		if( Math.floor(time/ data['shake_interval'] )%2 == 0 ){
			yy = data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%2 == 1 ){
			yy = -1 * data['shake_offset'];
		}
	}
	if( data['shake_type'] == "上右下左顺时针震动" ){
		if( Math.floor(time/ data['shake_interval'] )%4 == 0 ){
			yy = -1 * data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 1 ){
			xx = data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 2 ){
			yy = data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 3 ){
			xx = -1 * data['shake_offset'];
		}
	}
	if( data['shake_type'] == "上左下右逆时针震动" ){
		if( Math.floor(time/ data['shake_interval'] )%4 == 0 ){
			yy = -1 * data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 1 ){
			xx = -1 * data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 2 ){
			yy = data['shake_offset'];
		}
		if( Math.floor(time/ data['shake_interval'] )%4 == 3 ){
			xx = data['shake_offset'];
		}
	}
	$gameTemp._drill_DSSE_x = xx;
	$gameTemp._drill_DSSE_y = yy;
	
	// > 临时震动时 - 时间流逝
	$gameSystem._drill_DSSE_charSustain -= 1;
	if( $gameSystem._drill_DSSE_charSustain <= 0 ){
		$gameSystem._drill_DSSE_charSustain = 0;
		$gameSystem._drill_DSSE_charStyleId = -1;
		$gameSystem._drill_DSSE_charWindow = [];
	}
}



//=============================================================================
// ** ☆对话框绑定
//
//			说明：	> 该模块将对 对话框 进行 震动偏移量 绑定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 对话框绑定（兼容） - 『对话框的帧刷新』
//==============================
var _drill_DSSE_massage_update2 = Window_Message.prototype.update;
Window_Message.prototype.update = function(){
	_drill_DSSE_massage_update2.call(this);
	this.drill_DSSE_updateWindowBind();
};
//==============================
// * 对话框绑定（对话框优化核心） - 『对话框的帧刷新』
//==============================
if( Imported.Drill_CoreOfDialog ){
	var _drill_DSSE_CODi_message_update2 = Window_Message.prototype.drill_CODi_message_update;
	Window_Message.prototype.drill_CODi_message_update = function(){
		_drill_DSSE_CODi_message_update2.call(this);
		this.drill_DSSE_updateWindowBind();
	};
}
//==============================
// * 对话框绑定 - 帧刷新（原窗口皮肤）
//==============================
Window.prototype.drill_DSSE_updateWindowBind = function(){
	
	// > 窗口类型校验
	//		（帧刷新实时控制位置）
	if( $gameSystem.drill_DSSE_isWindowShaking(this._drill_DSk_tag) == true ){
		
		// > 归位标记
		this._drill_DSSE_needRestorePos = true;
		
		this._windowBackSprite.x = this._margin + $gameTemp._drill_DSSE_x;				//『0G背景贴图的位移』
		this._windowBackSprite.y = this._margin + $gameTemp._drill_DSSE_y;
		this._windowFrameSprite.x = $gameTemp._drill_DSSE_x;
		this._windowFrameSprite.y = $gameTemp._drill_DSSE_y;
		this._drill_skinBackground.x = this._drill_skin_pic_x + $gameTemp._drill_DSSE_x;
		this._drill_skinBackground.y = this._drill_skin_pic_y + $gameTemp._drill_DSSE_y;
		
		// > 开启震动时（文本域是否一起震动）
		if( $gameSystem._drill_DSSE_curWindow.length > 0 ){
			var data = DrillUp.g_DSSE_list[ $gameSystem._drill_DSSE_curStyleId ];
			if( data != undefined ){
				if( data['context_enabled'] == true ){
					this._windowContentsSprite.x = this.padding + $gameTemp._drill_DSSE_x;	//『0D文本域的位移』
					this._windowContentsSprite.y = this.padding + $gameTemp._drill_DSSE_y;
				}
			}
		}
		// > 临时震动时（文本域是否一起震动）
		if( $gameSystem._drill_DSSE_charWindow.length > 0 ){
			var data = DrillUp.g_DSSE_list[ $gameSystem._drill_DSSE_charStyleId ];
			if( data != undefined ){
				if( data['context_enabled'] == true ){
					this._windowContentsSprite.x = this.padding + $gameTemp._drill_DSSE_x;	//『0D文本域的位移』
					this._windowContentsSprite.y = this.padding + $gameTemp._drill_DSSE_y;
				}
			}
		}
		
	// > 窗口类型校验 - 不满足时
	//		（取消帧刷新，并在最后执行一次归位）
	//		（由于大部分的位置修改都 没有帧刷新，因此这里需要加 归位标记 来实现最后一次归位）
	}else{
		
		// > 归位标记
		if( this._drill_DSSE_needRestorePos == true ){
			this._drill_DSSE_needRestorePos = undefined;
			
			this._windowBackSprite.x = this._margin;		//『0G背景贴图的位移』
			this._windowBackSprite.y = this._margin;
			this._windowFrameSprite.x = 0;
			this._windowFrameSprite.y = 0;
			this._drill_skinBackground.x = this._drill_skin_pic_x;
			this._drill_skinBackground.y = this._drill_skin_pic_y;
			
			this._windowContentsSprite.x = this.padding;	//『0D文本域的位移』
			this._windowContentsSprite.y = this.padding;
		}
	}
}
//==============================
// * 对话框绑定 - 帧刷新（窗口皮肤边贴图）
//
//			说明：	> 该函数在帧刷新中，所以不需要手动归位。
//==============================
var _drill_DSSE_DSk_updateAttr = Drill_DSk_BorderSprite.prototype.drill_sprite_updateAttr;
Drill_DSk_BorderSprite.prototype.drill_sprite_updateAttr = function() {
	_drill_DSSE_DSk_updateAttr.call(this);
	
	// > 窗口类型校验
	if( $gameSystem.drill_DSSE_isWindowShaking(this._drill_parent._drill_DSk_tag) == true ){
		this.x += $gameTemp._drill_DSSE_x;
		this.y += $gameTemp._drill_DSSE_y;
	}
}


//=============================================================================
// ** ☆对话框子窗口绑定
//
//			说明：	> 该模块将对 对话框的子窗口 进行 震动偏移量 绑定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 4A金钱窗口 - 帧刷新『对话框多个子窗口』
//==============================
var _drill_DSSE_Gold_update = Window_Gold.prototype.update;
Window_Gold.prototype.update = function(){
	_drill_DSSE_Gold_update.call(this);
	this.drill_DSSE_updateWindowBind();
}

//==============================
// * 4B选择项窗口 - 帧刷新『对话框多个子窗口』
//==============================
var _drill_DSSE_ChoiceList_update = Window_ChoiceList.prototype.update;
Window_ChoiceList.prototype.update = function(){
	_drill_DSSE_ChoiceList_update.call(this);
	this.drill_DSSE_updateWindowBind();
}

//==============================
// * 4C数字输入窗口 - 帧刷新『对话框多个子窗口』
//==============================
var _drill_DSSE_NumberInput_update = Window_NumberInput.prototype.update;
Window_NumberInput.prototype.update = function(){
	_drill_DSSE_NumberInput_update.call(this);
	this.drill_DSSE_updateWindowBind();
}

//==============================
// * 4D选择物品窗口 - 帧刷新『对话框多个子窗口』
//==============================
var _drill_DSSE_EventItem_update = Window_EventItem.prototype.update;
Window_EventItem.prototype.update = function(){
	_drill_DSSE_EventItem_update.call(this);
	this.drill_DSSE_updateWindowBind();
}

//==============================
// * 对话框子窗口绑定 - 最后继承1级
//==============================
var _drill_DSSE_scene_initialize3 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_DSSE_scene_initialize3.call(this);
	
	//==============================
	// * 4E姓名框窗口（Drill姓名框）
	//==============================
	if( Imported.Drill_DialogNameBox ){
		
		//==============================
		// * 4E姓名框窗口（Drill姓名框） - 帧刷新
		//==============================
		var _drill_DSSE_DNB_update = Drill_DNB_NameBoxWindow.prototype.update;
		Drill_DNB_NameBoxWindow.prototype.update = function(){
			_drill_DSSE_DNB_update.call(this);
			this.drill_DSSE_updateWindowBind();
		}
	}
	//==============================
	// * 4E姓名框窗口（Yep姓名框）
	//==============================
	if( Imported.YEP_MessageCore ){
		
		//==============================
		// * 4E姓名框窗口（Yep姓名框） - 帧刷新
		//==============================
		var _drill_DSSE_yep_NameBox_update = Window_NameBox.prototype.update;
		Window_NameBox.prototype.update = function(){
			_drill_DSSE_yep_NameBox_update.call(this);
			this.drill_DSSE_updateWindowBind();
		}
	}
}


//=============================================================================
// ** ☆插件兼容
//
//			说明：	> 该模块兼容 子插件 的震动效果。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 插件兼容 - 最后继承1级
//==============================
var _drill_DSSE_scene_initialize2 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_DSSE_scene_initialize2.call(this);
	
	if( Imported.Drill_DialogBubble ){
		
		//==============================
		// * 插件兼容 - 帧刷新（气泡尖角贴图）
		//
		//			说明：	> 该函数在帧刷新中，所以不需要手动归位。
		//==============================
		var _drill_DSSE_DBu_updateAttr_Position = Drill_DBu_DecorationSprite.prototype.drill_sprite_updateAttr_Position;
		Drill_DBu_DecorationSprite.prototype.drill_sprite_updateAttr_Position = function() {
			_drill_DSSE_DBu_updateAttr_Position.call(this);
			
			// > 窗口类型校验
			if( $gameSystem.drill_DSSE_isWindowShaking("Window_Message") == true ){
				this.x += $gameTemp._drill_DSSE_x;
				this.y += $gameTemp._drill_DSSE_y;
			}
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogSkinShakeEffect = false;
		var pluginTip = DrillUp.drill_DSSE_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


