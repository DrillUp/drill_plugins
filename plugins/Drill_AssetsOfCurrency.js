//=============================================================================
// Drill_AssetsOfCurrency.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        管理器 - 素材库之货币
 * @author Drill_up
 * 
 * @Drill_LE_param "货币样式-%d"
 * @Drill_LE_parentKey "---样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_AsOC_style_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_AssetsOfCurrency +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将所有与"货币"相关的素材配置到该插件，并关联到其他插件。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 可被扩展：
 *   - Drill_DialogTextBigImage       窗口字符-窗口字符核心★★v2.2及以上★★
 *     有了该插件，素材库能支持指代字符。
 *   - Drill_DialogTextBigImage       窗口字符-大图片字符★★v1.5及以上★★
 *     有了该插件，素材库能支持绘制大图片字符。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面、菜单界面。
 *   作用于地图UI、菜单面板等。
 * 2.详细内容可以去看看 "21.管理器 > 关于素材库.docx"。
 * 定义：
 *   (1.该插件的名称为 "货币"，固定的名词。
 *      游戏中可以称呼为其它名称，在参数中修改用语即可。
 * 细节：
 *   (1."Assets"是指"素材库"，作用于战斗界面、地图界面、菜单界面。
 *      素材库的意义是对某些通用的数据，只配置一次，就能应用到所有相关子插件中。
 *      而不需要每个插件都去配置一次资源素材。
 *   (2.插件中可以修改样式，效果只是给游戏默认的素材进行批量换皮。
 *      如果你希望定义多种不同的货币，建议直接用物品来作为特殊货币。
 * 设计：
 *   (1.素材库可以换样式，你可以根据游戏剧情，设计不同时代的货币，
 *      玩家在多个章节中，货币的样子不断地在改，但是并不改变货币的面值。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Assets__Currency （Assets后面有两个下划线）
 * 先确保项目img文件夹下是否有Assets__Currency文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 需要配置资源文件：
 * 
 * 资源-小图
 * 资源-中型图
 * 资源-高清图
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 窗口字符
 * 你可以使用下面的窗口字符：
 * 
 * 窗口字符：\dtxt[货币文本]
 * 窗口字符：\dtxt[货币文本:只图标]
 * 窗口字符：\dtxt[货币文本:只文本]
 * 窗口字符：\dtxt[货币文本:图标+文本]
 * 
 * 窗口字符：\dimg[货币素材:小图:不占高宽]
 * 窗口字符：\dimg[货币素材:小图:不占高宽:位置[10,-10]]
 * 窗口字符：\dimg[货币素材:小图:占用高宽]
 * 窗口字符：\dimg[货币素材:中型图:不占高宽]
 * 窗口字符：\dimg[货币素材:中型图:不占高宽:位置[10,-10]]
 * 窗口字符：\dimg[货币素材:中型图:占用高宽]
 * 窗口字符：\dimg[货币素材:高清图:不占高宽]
 * 窗口字符：\dimg[货币素材:高清图:不占高宽:位置[10,-10]]
 * 窗口字符：\dimg[货币素材:高清图:占用高宽]
 * 窗口字符：\dimg[货币素材:自定义[108,96]:不占高宽]
 * 窗口字符：\dimg[货币素材:自定义[108,96]:不占高宽:位置[10,-10]]
 * 窗口字符：\dimg[货币素材:自定义[108,96]:占用高宽]
 * 
 * 1.上述的窗口字符中，
 *   "\dtxt" 是指代字符，会被替换成 图标+文本 的文本格式。
 *   "\dimg" 是大图片字符，效果是绘制大图片。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 样式切换
 * 你可以通过插件指令修改样式：
 * 
 * 插件指令：>素材库之货币 : 修改样式 : 样式[1]
 * 插件指令：>素材库之货币 : 恢复默认样式
 * 
 * 1.注意，插件中可以修改样式，效果只是给游戏默认的素材进行批量换皮。
 *   如果你希望定义多种不同的货币，建议直接用物品来作为特殊货币。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>素材库之货币 : DEBUG资源情况测试 : 打开
 * 插件指令：>素材库之货币 : DEBUG资源情况测试 : 关闭
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
 * 时间复杂度： o(n)
 * 测试方法：   在各个界面中进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件只单次执行，提供对应的素材数据。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 兼容了新的窗口字符。
 * [v1.2]
 * 更新并兼容了新的窗口字符底层。
 *
 *
 *
 * @param 是否将'系统货币单位'同步为货币文本
 * @type boolean
 * @on 同步
 * @off 不操作
 * @desc true - 同步，false - 不操作。"数据库 > 系统 > 货币单位" 的文本将变为当前样式的货币文本。
 * @default false
 *
 * @param 同步的货币文本格式
 * @parent 是否将'系统货币单位'同步为货币文本
 * @type select
 * @option 只图标
 * @value 只图标
 * @option 只文本
 * @value 只文本
 * @option 图标+文本
 * @value 图标+文本
 * @desc "数据库 > 系统 > 货币单位" 的文本将变为当前样式的货币文本。
 * @default 只文本
 *
 *
 * @param 默认货币样式
 * @type number
 * @min 1
 * @desc 默认的货币样式。
 * @default 1
 * 
 * @param ---货币样式组---
 * @default 
 * 
 * @param 货币样式-1
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default {"标签":"==金币==","---常规---":"","用语-货币文本":"金币","用语-货币文本颜色":"17","货币图标":"536","---资源---":"","货币资源-小图":"金币_64x64小图","货币资源-中型图":"金币_96x96中型图","货币资源-高清图":"金币_256x256高清图"}
 *
 * @param 货币样式-2
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-3
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-4
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-5
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-6
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-7
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-8
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-9
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 * @param 货币样式-10
 * @parent ---货币样式组---
 * @type struct<DrillAsOCStyle>
 * @desc 漂浮文字的内容配置信息。
 * @default 
 * 
 */
/*~struct~DrillAsOCStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的货币样式==
 * 
 * 
 * @param ---常规---
 * @default 
 * 
 * @param 用语-货币文本
 * @parent ---常规---
 * @desc 货币的用语文本。
 * @default 金币
 * 
 * @param 用语-货币文本颜色
 * @parent ---常规---
 * @type number
 * @min 0
 * @desc 货币文本的颜色。
 * @default 17
 * 
 * @param 货币图标
 * @parent ---常规---
 * @type number
 * @min 0
 * @desc 货币的图标序号。为0表示不用图标。
 * @default 536
 * 
 * 
 * @param ---资源---
 * @default 
 *
 * @param 货币资源-小图
 * @parent ---资源---
 * @desc 货币作为小图时的资源，大小为64x64，建议该资源背景为透明。
 * @default (需配置)货币-小图
 * @require 1
 * @dir img/Assets__Currency/
 * @type file
 *
 * @param 货币资源-中型图
 * @parent ---资源---
 * @desc 货币作为中型图时的资源，大小为96x96，建议该资源背景为透明。
 * @default (需配置)货币-中型图
 * @require 1
 * @dir img/Assets__Currency/
 * @type file
 *
 * @param 货币资源-高清图
 * @parent ---资源---
 * @desc 货币作为高清图时的资源，大小为256x256，建议该资源背景为透明。
 * @default (需配置)货币-高清图
 * @require 1
 * @dir img/Assets__Currency/
 * @type file
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		AsOC (Assets_Of_Currency)
//		临时全局变量	DrillUp.g_AsOC_xxx
//		临时局部变量	this._drill_AsOC_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	
//		★性能测试消耗	
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
//			->☆预加载
//			
//			
//			->☆素材库的样式
//				->样式变化（子插件继承用）
//			
//			->☆素材库的窗口字符 标准模块
//				->货币（文本/文本颜色索引/图标索引/完整文本） - 获取【标准函数】
//			->☆素材库的窗口字符实现
//			
//			->☆素材库的资源 标准模块
//				->货币（图标/小图/中型图/高清图/自定义） - 获取【标准函数】
//			->☆素材库的资源实现
//			
//			->☆窗口字符应用之指代字符
//				> \dtxt[货币文本:]
//			->☆窗口字符应用之效果字符
//				> \dimg[货币素材:]
//			
//			->☆用语管理器覆盖
//			
//			
//			->☆DEBUG资源情况测试
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
//			1.这个插件2023/5/21就写好了，然而现在已经2024年快2025年了，还是没开坑到这里。
//			  群友："什么时候填坑？" 我："以后"。开坑喜+1。
//				  ╭━━━━━━━━━━━╮
//				  ┃╱╱╱╱╱╱╱┏┓╱╱┃
//				  ┃╱╱┏┓╱╱┏╯┃╱╱┃
//				  ┃╱┏┛┗┓╱┗┓┃╱╱┃
//				  ┃╱┗┓┏┛╱╱┃┃╱╱┃
//				  ┃╱╱┗┛╱╱╱┃┃╱╱┃
//				  ┃╱╱╱╱╱╱╱┗┛╱╱┃
//				  ╰━━━━━━━━━━━╯
//			2.『素材库批量复制方法』如下：
//					
//					1)标记已有的全部 "生命上限" 和 "maxHP" 字段
//						（若新插件把该插件直接复制过去即可）
//					
//					2)复制 "可选设定 - 窗口字符" 设置
//						（生命上限 替换为 魔法上限）
//					
//					3)复制 "@param ---生命上限---" 设置
//						（生命上限 替换为 魔法上限）
//					
//					4)复制 功能结构树信息
//						（生命上限 替换为 魔法上限）
//					
//					5)复制 函数 drill_AsOC_initStyle 的参数读取
//						（生命上限 替换为 魔法上限，maxHP替换maxMP）
//					
//					6)复制 预加载 的脚本
//						（生命上限 替换为 魔法上限，maxHP替换maxMP）
//					
//					7)复制 素材库的窗口字符 的脚本
//						（复制 货币素材库插件 的函数）（因为是独立函数，所以后面替换时就不会与 生命上限 重复）
//					
//					8)复制 素材库的资源 的脚本
//						（复制 货币素材库插件 的函数）（因为是独立函数，所以后面替换时就不会与 生命上限 重复）
//					
//					9)复制 窗口字符应用之指代字符 的脚本
//						（复制 货币素材库插件 的脚本片段，因为"货币文本" 脚本中没加空格，所以可以整体复制）
//					
//					10)复制 窗口字符应用之效果字符 的脚本
//						（复制 货币素材库插件 的脚本片段，因为 "货币素材" 脚本中没加空格，所以可以整体复制）
//						（再处理阶段不需要动）
//						（复制 货币素材库插件 的脚本片段，因为 "绘制 货币素材" 脚本中没加空格，所以可以整体复制）
//						（复制完毕后，1/2/3/4，要改成如5/6/7/8，搜索带引号的"1"，确保只有四个匹配）
//					
//					11)最后替换 "货币" "Assets__Currency" "currency(大小写匹配)" "AsOC"
//						（替换后，货币和currency都无残留）
//
//		★其它说明细节：
//			1.文档中规定 小图和图标 必须配置一个，但这里不检查，因为找不到时函数会给个空图片，并不会报错。
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
	DrillUp.g_AsOC_PluginTip_curName = "Drill_AssetsOfCurrency.js 管理器-素材库之货币";
	DrillUp.g_AsOC_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_AsOC_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_AsOC_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_AssetsOfCurrency = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_AssetsOfCurrency');
	
	
	//==============================
	// * 静态数据 - 货币样式
	//				（~struct~DrillAsOCStyle）
	//==============================
	DrillUp.drill_AsOC_initStyle = function( dataFrom ){
		var data = {};
		
		// > 货币文本
		data['currency_text'] = String( dataFrom["用语-货币文本"] || "金币");
		data['currency_textColor'] = Number( dataFrom["用语-货币文本颜色"] || 17);
		data['currency_iconIndex'] = Number( dataFrom["货币图标"] || 536);
		// > 货币素材
		data['currency_src_img_64x64'] = String( dataFrom["货币资源-小图"] || "");
		data['currency_src_img_96x96'] = String( dataFrom["货币资源-中型图"] || "");
		data['currency_src_img_256x256'] = String( dataFrom["货币资源-高清图"] || "");
		
		return data;
	}
	/*-----------------货币样式集合------------------*/
	DrillUp.g_AsOC_style_length = 10;
	DrillUp.g_AsOC_style = [];
	for( var i = 0; i < DrillUp.g_AsOC_style_length; i++ ){
		if( DrillUp.parameters["货币样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["货币样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["货币样式-" + String(i+1) ]);
			DrillUp.g_AsOC_style[i] = DrillUp.drill_AsOC_initStyle( temp );
		}else{
			DrillUp.g_AsOC_style[i] = DrillUp.drill_AsOC_initStyle( {} );
		}
	}
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_AsOC_defaultStyleId = Number(DrillUp.parameters["默认货币样式"] || 1); 
	DrillUp.g_AsOC_coverEnabled_currency = String(DrillUp.parameters["是否将'系统货币单位'同步为货币文本"] || "false") == "true";
	DrillUp.g_AsOC_coverFormat_currency = String(DrillUp.parameters["同步的货币文本格式"] || "只文本");
	
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_AsOC_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_AsOC_pluginCommand.call(this, command, args);
	this.drill_AsOC_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_AsOC_pluginCommand = function( command, args ){
	if( command === ">素材库之货币" ){
		
		/*-----------------修改样式------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改样式" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				$gameSystem.drill_AsOC_setStyleData( Number(temp1) );
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "恢复默认样式" ){
				$gameSystem.drill_AsOC_setStyleData( DrillUp.g_AsOC_defaultStyleId );
			}
		}
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG资源情况测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_AsOC_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_AsOC_DebugEnabled = false;
				}
			}
		}
	};
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_AsOC_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_AsOC_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_AsOC_sys_initialize.call(this);
	this.drill_AsOC_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_AsOC_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_AsOC_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_AsOC_saveEnabled == true ){	
		$gameSystem.drill_AsOC_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_AsOC_initSysData();
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
Game_System.prototype.drill_AsOC_initSysData = function() {
	this.drill_AsOC_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_AsOC_checkSysData = function() {
	this.drill_AsOC_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_AsOC_initSysData_Private = function() {
	
	this._drill_AsOC_styleId = DrillUp.g_AsOC_defaultStyleId;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_AsOC_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_AsOC_styleId == undefined ){
		this.drill_AsOC_initSysData();
	}
};
	
	
//=============================================================================
// ** ☆预加载
//
//			说明：	> 用过的bitmap，全部标记不删除，防止刷菜单时重建导致浪费资源。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
DrillUp.g_AsOC_preloadEnabled = true;		//（预加载开关）
if( DrillUp.g_AsOC_preloadEnabled == true ){
	//==============================
	// * 预加载 - 初始化
	//==============================
	var _drill_AsOC_preload_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_drill_AsOC_preload_initialize.call(this);
		this.drill_AsOC_preloadInit();
	}
	//==============================
	// * 预加载 - 版本校验
	//==============================
	if( Utils.generateRuntimeId == undefined ){
		alert( DrillUp.drill_AsOC_getPluginTip_LowVersion() );
	}
	//==============================
	// * 预加载 - 执行资源预加载
	//
	//			说明：	> 遍历全部资源，提前预加载标记过的资源。
	//==============================
	Game_Temp.prototype.drill_AsOC_preloadInit = function() {
		this._drill_AsOC_cacheId = Utils.generateRuntimeId();	//资源缓存id
		this._drill_AsOC_preloadTank = [];						//bitmap容器
		for( var i = 0; i < DrillUp.g_AsOC_style.length; i++ ){
			var temp_data = DrillUp.g_AsOC_style[i];
			if( temp_data == undefined ){ continue; }
			
			// > 货币素材
			this._drill_AsOC_preloadTank.push( ImageManager.reserveBitmap( "img/Assets__Currency/", temp_data['currency_src_img_64x64'], 0, true, this._drill_AsOC_cacheId ) );
			this._drill_AsOC_preloadTank.push( ImageManager.reserveBitmap( "img/Assets__Currency/", temp_data['currency_src_img_96x96'], 0, true, this._drill_AsOC_cacheId ) );
			this._drill_AsOC_preloadTank.push( ImageManager.reserveBitmap( "img/Assets__Currency/", temp_data['currency_src_img_256x256'], 0, true, this._drill_AsOC_cacheId ) );
		}
	}
}



//=============================================================================
// ** ☆素材库的样式
//
//			说明：	> 该模块提供 素材库 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 素材库的样式 - 切换样式
//==============================
Game_System.prototype.drill_AsOC_setStyleData = function( style_id ){
	this._drill_AsOC_styleId = Number(style_id);
	$gameTemp.drill_AsOC_styleDataChanged();
}
//==============================
// * 素材库的样式 - 获取当前样式
//==============================
Game_Temp.prototype.drill_AsOC_getStyleData = function() {
	return DrillUp.g_AsOC_style[ $gameSystem._drill_AsOC_styleId-1 ];
}
//==============================
// * 素材库的样式 - 样式变化时（子插件继承用）
//==============================
Game_Temp.prototype.drill_AsOC_styleDataChanged = function() {
	//（当样式发生变化时，此函数会被调用，子插件可以继承此函数，即时监听并变化）
	//（你也可以将监听放在帧刷新中同步，但是那样更消耗性能）
};



//#############################################################################
// ** ☆素材库的窗口字符 标准模块
//#############################################################################
//##############################
// * 『素材库的窗口字符』 - 货币（文本） - 获取【标准函数】
//			
//			参数：	> 无
//			返回：	> 字符串
//##############################
Game_Temp.prototype.drill_AsOC_getText_currency = function() {
	return this.drill_AsOC_getStyleData()['currency_text'];
};
//##############################
// * 『素材库的窗口字符』 - 货币（文本颜色索引） - 获取【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Game_Temp.prototype.drill_AsOC_getTextColor_currency = function() {
	return this.drill_AsOC_getStyleData()['currency_textColor'];
};
//##############################
// * 『素材库的窗口字符』 - 货币（图标索引） - 获取【标准函数】
//			
//			参数：	> 无
//			返回：	> 数字
//##############################
Game_Temp.prototype.drill_AsOC_getIconIndex_currency = function() {
	return this.drill_AsOC_getStyleData()['currency_iconIndex'];
};
//##############################
// * 『素材库的窗口字符』 - 货币（完整文本） - 获取【标准函数】
//			
//			参数：	> format 字符串 （只图标/只文本/图标+文本）
//			返回：	> 字符串
//##############################
Game_Temp.prototype.drill_AsOC_getTextByFormat_currency = function( format ){
	return this.drill_AsOC_getTextByFormatPrivate( "currency", format );
};

//=============================================================================
// ** ☆素材库的窗口字符实现
//
//			说明：	> 该模块提供 素材库 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 素材库的窗口字符实现 - 完整文本 - 获取（私有）
//==============================
Game_Temp.prototype.drill_AsOC_getTextByFormatPrivate = function( paramName, format ){
	var data = this.drill_AsOC_getStyleData();
	var paramName_text = paramName + '_text';				//（组装的参数名）
	var paramName_iconIndex = paramName + '_iconIndex';		//
	var paramName_textColor = paramName + '_textColor';		//
	
	var context = "";
	if( format == "只图标" ){
		context += "\\i[" + data[paramName_iconIndex] + "]";
	}
	if( format == "只文本" ){
		
		// > 文本 - 修改颜色（白色时，不修改）
		if( data[paramName_textColor] > 0 ){
			if( Imported.Drill_CoreOfColor ){ context += "\\cc[oSave]"; }	//【窗口字符-颜色核心】
			context += "\\c[" + data[paramName_textColor] + "]";
		}
		
		// > 文本
		context += data[paramName_text];
		
		// > 文本 - 恢复颜色
		if( data[paramName_textColor] > 0 ){
			if( Imported.Drill_CoreOfColor ){ context += "\\cc[oLoad]"; }
		}
	}
	if( format == "图标+文本" ){
		
		// > 图标
		context += "\\i[" + data[paramName_iconIndex] + "]";
		
		// > 文本 - 修改颜色（白色时，不修改）
		if( data[paramName_textColor] > 0 ){
			if( Imported.Drill_CoreOfColor ){ context += "\\cc[oSave]"; }
			context += "\\c[" + data[paramName_textColor] + "]";
		}
		
		// > 文本
		context += data[paramName_text];
		
		// > 文本 - 恢复颜色
		if( data[paramName_textColor] > 0 ){
			if( Imported.Drill_CoreOfColor ){ context += "\\cc[oLoad]"; }
		}
	}
	return context;
};
//==============================
// * 素材库的窗口字符实现 - 旧函数
//==============================
Game_Temp.prototype.drill_AsOC_getDataText = Game_Temp.prototype.drill_AsOC_getText_currency;
Game_Temp.prototype.drill_AsOC_getDataTextColor = Game_Temp.prototype.drill_AsOC_getTextColor_currency;
Game_Temp.prototype.drill_AsOC_getDataIcon = Game_Temp.prototype.drill_AsOC_getIconIndex_currency;
Game_Temp.prototype.drill_AsOC_getFullTextByType = Game_Temp.prototype.drill_AsOC_getTextByFormat_currency;



//#############################################################################
// ** ☆素材库的资源 标准模块
//#############################################################################
//##############################
// * 『素材库的资源』 - 货币（图标） - 获取【标准函数】
//			
//			参数：	> 无
//			返回：	> 画布对象
//			
//			说明：	> 大小为32x32，返回的bitmap使用画布实现，且一定为isReady状态。
//##############################
Game_Temp.prototype.drill_AsOC_getBitmap32x32_currency = function() {
	return this.drill_AsOC_getBitmap32x32Private( "currency" );
}
//##############################
// * 『素材库的资源』 - 货币（小图） - 获取【标准函数】
//			
//			参数：	> 无
//			返回：	> 画布对象
//
//			说明：	> 大小为64x64，返回的bitmap使用画布实现，且一定为isReady状态。
//##############################
Game_Temp.prototype.drill_AsOC_getBitmap64x64_currency = function() {
	return this.drill_AsOC_getBitmap64x64Private( "currency" );
}
//##############################
// * 『素材库的资源』 - 货币（中型图） - 获取【标准函数】
//			
//			参数：	> 无
//			返回：	> 画布对象
//
//			说明：	> 大小为96x96，返回的bitmap使用画布实现，且一定为isReady状态。
//##############################
Game_Temp.prototype.drill_AsOC_getBitmap96x96_currency = function() {
	return this.drill_AsOC_getBitmap96x96Private( "currency" );
}
//##############################
// * 『素材库的资源』 - 货币（高清图） - 获取【标准函数】
//			
//			参数：	> 无
//			返回：	> 画布对象
//
//			说明：	> 大小为256x256，返回的bitmap使用画布实现，且一定为isReady状态。（512x512太占内存了，所以不要太大）
//##############################
Game_Temp.prototype.drill_AsOC_getBitmap256x256_currency = function() {
	return this.drill_AsOC_getBitmap256x256Private( "currency" );
}
//##############################
// * 『素材库的资源』 - 货币（自定义） - 获取【标准函数】
//			
//			参数：	> width,height 数字
//			返回：	> 画布对象
//
//			说明：	> 大小为width*height，返回的bitmap使用画布实现，且一定为isReady状态。
//##############################
Game_Temp.prototype.drill_AsOC_getBitmapCustomSize_currency = function( width, height ){
	return this.drill_AsOC_getBitmapCustomSizePrivate( "currency", width, height );
}

//=============================================================================
// ** ☆素材库的资源实现
//
//			说明：	> 该模块管理 资源贴图 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 素材库的资源实现 - 图标 - 获取（私有）
//
//			说明：	> 插件不允许同时缺少 图标和小图。
//==============================
Game_Temp.prototype.drill_AsOC_getBitmap32x32Private = function( paramName ){
	var new_bitmap = new Bitmap(32,32);
	
	// > 有图标时（32x32）
	if( this.drill_AsOC_hasBitmap32x32(paramName) == true ){
		var paramName_iconIndex = paramName + '_iconIndex';		//（组装的参数名）
		var icon_index = this.drill_AsOC_getStyleData()[paramName_iconIndex];
		var src_bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = icon_index % 16 * pw;
		var sy = Math.floor(icon_index / 16) * ph;
		new_bitmap.blt( src_bitmap, sx, sy, pw, ph, 0, 0, 32, 32 );
		return new_bitmap;
	}
	// > 有小图时（64x64）
	if( this.drill_AsOC_isReadyBitmap64x64(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_64x64';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap.blt( src_bitmap, 0, 0, 64, 64, 0, 0, 32, 32 );
		return new_bitmap;
	}
	return new_bitmap;
}
//==============================
// * 素材库的资源实现 - 图标 - 是否存在（开放函数）
//			
//			参数：	> paramName 字符串（参数名）
//			返回：	> 布尔
//			
//			说明：	> 该函数返回真实情况下的资源状态。
//==============================
Game_Temp.prototype.drill_AsOC_hasBitmap32x32 = function( paramName ){
	var data = this.drill_AsOC_getStyleData();
	if( data == undefined ){ return false; }
	var paramName_iconIndex = paramName + '_iconIndex';		//（组装的参数名）
	var icon_index = data[paramName_iconIndex];
	if( icon_index <= 0 ){ return false; }
	return true;
}
//==============================
// * 素材库的资源实现 - 图标 - 是否已加载（开放函数）
//			
//			参数：	> paramName 字符串（参数名）
//			返回：	> 布尔
//			
//			说明：	> 该函数返回真实情况下的资源状态。
//==============================
Game_Temp.prototype.drill_AsOC_isReadyBitmap32x32 = function( paramName ){
	var src_bitmap = ImageManager.loadSystem('IconSet');
	return src_bitmap.isReady();
}

//==============================
// * 素材库的资源实现 - 小图 - 获取（私有）
//
//			说明：	> 插件不允许同时缺少 图标和小图。
//==============================
Game_Temp.prototype.drill_AsOC_getBitmap64x64Private = function( paramName ){
	var new_bitmap = new Bitmap(64,64);
	
	// > 有小图时（64x64）
	if( this.drill_AsOC_isReadyBitmap64x64(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_64x64';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap.blt( src_bitmap, 0, 0, 64, 64, 0, 0, 64, 64 );
		return new_bitmap;
	}
	// > 有图标时（32x32）
	if( this.drill_AsOC_hasBitmap32x32(paramName) == true ){
		var paramName_iconIndex = paramName + '_iconIndex';		//（组装的参数名）
		var icon_index = this.drill_AsOC_getStyleData()[paramName_iconIndex];
		var src_bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = icon_index % 16 * pw;
		var sy = Math.floor(icon_index / 16) * ph;
		new_bitmap._context.imageSmoothingEnabled = false;	//（像素邻近缩放）
		new_bitmap.blt( src_bitmap, sx, sy, pw, ph, 0, 0, 64, 64 );
		new_bitmap._context.imageSmoothingEnabled = true;
		return new_bitmap;
	}
	return new_bitmap;
}
//==============================
// * 素材库的资源实现 - 小图 - 是否存在（开放函数）
//			
//			参数：	> paramName 字符串（参数名）
//			返回：	> 布尔
//			
//			说明：	> 该函数返回真实情况下的资源状态。
//==============================
Game_Temp.prototype.drill_AsOC_hasBitmap64x64 = function( paramName ){
	var data = this.drill_AsOC_getStyleData();
	if( data == undefined ){ return false; }
	var paramName_src_img = paramName + '_src_img_64x64';		//（组装的参数名）
	var src_img = data[paramName_src_img];
	if( src_img == undefined ){ return false; }
	if( src_img == "" ){ return false; }
	return true;
}
//==============================
// * 素材库的资源实现 - 小图 - 是否已加载（开放函数）
//			
//			参数：	> paramName 字符串（参数名）
//			返回：	> 布尔
//			
//			说明：	> 该函数返回真实情况下的资源状态。
//==============================
Game_Temp.prototype.drill_AsOC_isReadyBitmap64x64 = function( paramName ){
	var data = this.drill_AsOC_getStyleData();
	if( data == undefined ){ return false; }
	var paramName_src_img = paramName + '_src_img_64x64';		//（组装的参数名）
	var src_img = data[paramName_src_img];
	if( src_img == undefined ){ return false; }
	if( src_img == "" ){ return false; }
	var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
	return src_bitmap.isReady();
}

//==============================
// * 素材库的资源实现 - 中型图 - 获取（私有）
//==============================
Game_Temp.prototype.drill_AsOC_getBitmap96x96Private = function( paramName ){
	var new_bitmap = new Bitmap(96,96);
	
	// > 有中型图时（96x96）
	if( this.drill_AsOC_isReadyBitmap96x96(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_96x96';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap.blt( src_bitmap, 0, 0, 96, 96, 0, 0, 96, 96 );
		return new_bitmap;
	}
	// > 有高清图时（256x256）
	if( this.drill_AsOC_isReadyBitmap256x256(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_256x256';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap.blt( src_bitmap, 0, 0, 256, 256, 0, 0, 96, 96 );
		return new_bitmap;
	}
	// > 有小图时（64x64）
	if( this.drill_AsOC_isReadyBitmap64x64(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_64x64';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap._context.imageSmoothingEnabled = false;	//（像素邻近缩放）
		new_bitmap.blt( src_bitmap, 0, 0, 64, 64, 0, 0, 96, 96 );
		new_bitmap._context.imageSmoothingEnabled = true;
		return new_bitmap;
	}
	// > 有图标时（32x32）
	if( this.drill_AsOC_hasBitmap32x32(paramName) == true ){
		var paramName_iconIndex = paramName + '_iconIndex';		//（组装的参数名）
		var icon_index = this.drill_AsOC_getStyleData()[paramName_iconIndex];
		var src_bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = icon_index % 16 * pw;
		var sy = Math.floor(icon_index / 16) * ph;
		new_bitmap._context.imageSmoothingEnabled = false;	//（像素邻近缩放）
		new_bitmap.blt( src_bitmap, sx, sy, pw, ph, 0, 0, 96, 96 );
		new_bitmap._context.imageSmoothingEnabled = true;
		return new_bitmap;
	}
	return new_bitmap;
}
//==============================
// * 素材库的资源实现 - 中型图 - 是否存在（开放函数）
//			
//			参数：	> paramName 字符串（参数名）
//			返回：	> 布尔
//			
//			说明：	> 该函数返回真实情况下的资源状态。
//==============================
Game_Temp.prototype.drill_AsOC_hasBitmap96x96 = function( paramName ){
	var data = this.drill_AsOC_getStyleData();
	if( data == undefined ){ return false; }
	var paramName_src_img = paramName + '_src_img_96x96';		//（组装的参数名）
	var src_img = data[paramName_src_img];
	if( src_img == undefined ){ return false; }
	if( src_img == "" ){ return false; }
	return true;
}
//==============================
// * 素材库的资源实现 - 中型图 - 是否已加载（开放函数）
//			
//			参数：	> paramName 字符串（参数名）
//			返回：	> 布尔
//			
//			说明：	> 该函数返回真实情况下的资源状态。
//==============================
Game_Temp.prototype.drill_AsOC_isReadyBitmap96x96 = function( paramName ){
	var data = this.drill_AsOC_getStyleData();
	if( data == undefined ){ return false; }
	var paramName_src_img = paramName + '_src_img_96x96';		//（组装的参数名）
	var src_img = data[paramName_src_img];
	if( src_img == undefined ){ return false; }
	if( src_img == "" ){ return false; }
	var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
	return src_bitmap.isReady();
}

//==============================
// * 素材库的资源实现 - 高清图 - 获取（私有）
//==============================
Game_Temp.prototype.drill_AsOC_getBitmap256x256Private = function( paramName ){
	var new_bitmap = new Bitmap(256,256);
	
	// > 有高清图时（256x256）
	if( this.drill_AsOC_isReadyBitmap256x256(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_256x256';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap.blt( src_bitmap, 0, 0, 256, 256, 0, 0, 256, 256 );
		return new_bitmap;
	}
	// > 有中型图时（96x96）
	if( this.drill_AsOC_isReadyBitmap96x96(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_96x96';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap.blt( src_bitmap, 0, 0, 96, 96, 0, 0, 256, 256 );
		return new_bitmap;
	}
	// > 有小图时（64x64）
	if( this.drill_AsOC_isReadyBitmap64x64(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_64x64';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap._context.imageSmoothingEnabled = false;	//（像素邻近缩放）
		new_bitmap.blt( src_bitmap, 0, 0, 64, 64, 0, 0, 256, 256 );
		new_bitmap._context.imageSmoothingEnabled = true;
		return new_bitmap;
	}
	// > 有图标时（32x32）
	if( this.drill_AsOC_hasBitmap32x32(paramName) == true ){
		var paramName_iconIndex = paramName + '_iconIndex';		//（组装的参数名）
		var icon_index = this.drill_AsOC_getStyleData()[paramName_iconIndex];
		var src_bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = icon_index % 16 * pw;
		var sy = Math.floor(icon_index / 16) * ph;
		new_bitmap._context.imageSmoothingEnabled = false;	//（像素邻近缩放）
		new_bitmap.blt( src_bitmap, sx, sy, pw, ph, 0, 0, 256, 256 );
		new_bitmap._context.imageSmoothingEnabled = true;
		return new_bitmap;
	}
	return new_bitmap;
}
//==============================
// * 素材库的资源实现 - 高清图 - 是否存在（开放函数）
//			
//			参数：	> paramName 字符串（参数名）
//			返回：	> 布尔
//			
//			说明：	> 该函数返回真实情况下的资源状态。
//==============================
Game_Temp.prototype.drill_AsOC_hasBitmap256x256 = function( paramName ){
	var data = this.drill_AsOC_getStyleData();
	if( data == undefined ){ return false; }
	var paramName_src_img = paramName + '_src_img_256x256';		//（组装的参数名）
	var src_img = data[paramName_src_img];
	if( src_img == undefined ){ return false; }
	if( src_img == "" ){ return false; }
	return true;
}
//==============================
// * 素材库的资源实现 - 高清图 - 是否已加载（开放函数）
//			
//			参数：	> paramName 字符串（参数名）
//			返回：	> 布尔
//			
//			说明：	> 该函数返回真实情况下的资源状态。
//==============================
Game_Temp.prototype.drill_AsOC_isReadyBitmap256x256 = function( paramName ){
	var data = this.drill_AsOC_getStyleData();
	if( data == undefined ){ return false; }
	var paramName_src_img = paramName + '_src_img_256x256';		//（组装的参数名）
	var src_img = data[paramName_src_img];
	if( src_img == undefined ){ return false; }
	if( src_img == "" ){ return false; }
	var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
	return src_bitmap.isReady();
}

//==============================
// * 素材库的资源实现 - 自定义 - 获取（私有）
//==============================
Game_Temp.prototype.drill_AsOC_getBitmapCustomSizePrivate = function( paramName, width, height ){
	var new_bitmap = new Bitmap( width,height );
	//	（直接用更清晰的图来缩放大小）
	
	// > 有高清图时（256x256）
	if( this.drill_AsOC_isReadyBitmap256x256(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_256x256';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap.blt( src_bitmap, 0, 0, 256, 256, 0, 0, width, height );
		return new_bitmap;
	}
	// > 有中型图时（96x96）
	if( this.drill_AsOC_isReadyBitmap96x96(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_96x96';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap.blt( src_bitmap, 0, 0, 96, 96, 0, 0, width, height );
		return new_bitmap;
	}
	// > 有小图时（64x64）
	if( this.drill_AsOC_isReadyBitmap64x64(paramName) == true ){
		var paramName_src_img = paramName + '_src_img_64x64';	//（组装的参数名）
		var src_img = this.drill_AsOC_getStyleData()[paramName_src_img];
		var src_bitmap = ImageManager.loadBitmap( "img/Assets__Currency/", src_img, 0, true );
		new_bitmap._context.imageSmoothingEnabled = false;	//（像素邻近缩放）
		new_bitmap.blt( src_bitmap, 0, 0, 64, 64, 0, 0, width, height );
		new_bitmap._context.imageSmoothingEnabled = true;
		return new_bitmap;
	}
	// > 有图标时（32x32）
	if( this.drill_AsOC_hasBitmap32x32(paramName) == true ){
		var paramName_iconIndex = paramName + '_iconIndex';		//（组装的参数名）
		var icon_index = this.drill_AsOC_getStyleData()[paramName_iconIndex];
		var src_bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = icon_index % 16 * pw;
		var sy = Math.floor(icon_index / 16) * ph;
		new_bitmap._context.imageSmoothingEnabled = false;	//（像素邻近缩放）
		new_bitmap.blt( src_bitmap, sx, sy, pw, ph, 0, 0, width, height );
		new_bitmap._context.imageSmoothingEnabled = true;
		return new_bitmap;
	}
	return new_bitmap;
}



//=============================================================================
// ** ☆窗口字符应用之指代字符
//
//			说明：	> 指代字符阶段的 接口继承、执行 的相关应用。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 窗口字符应用之指代字符 - 最后继承1级
//==============================
var _drill_AsOC_scene_initialize_1 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_AsOC_scene_initialize_1.call(this);
	
	//==============================
	// * 窗口字符应用之指代字符 - 组合符配置
	//==============================
	var _drill_AsOC_COWC_transform_processCombined = Game_Temp.prototype.drill_COWC_transform_processCombined;
	Game_Temp.prototype.drill_COWC_transform_processCombined = function( matched_index, matched_str, command, args ){
		_drill_AsOC_COWC_transform_processCombined.call( this, matched_index, matched_str, command, args );
		
		if( command.toUpperCase() == "DTXT" ){
			
			// > 『窗口字符定义』 - 货币文本（\dtxt[货币文本]）
			if( args.length == 1 ){
				var type = String(args[0]);
				if( type == "货币文本" ){
					var str = this.drill_AsOC_getTextByFormat_currency( "图标+文本" );
					this.drill_COWC_transform_submitCombined( str );
					return;
				}
			}
			// > 『窗口字符定义』 - 货币文本（\dtxt[货币文本:图标+文本]）
			if( args.length == 2 ){
				var type = String(args[0]);
				var temp1 = String(args[1]);
				if( type == "货币文本" ){
					var str = this.drill_AsOC_getTextByFormat_currency( temp1 );
					this.drill_COWC_transform_submitCombined( str );
					return;
				}
			}
			
		}
	}
}


//=============================================================================
// ** ☆窗口字符应用之效果字符
//=============================================================================
//==============================
// * 窗口字符应用之效果字符 - 最后继承1级
//==============================
var _drill_AsOC_scene_initialize_2 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_AsOC_scene_initialize_2.call(this);
	
	// 【窗口字符 - 大图片字符】
	if( Imported.Drill_DialogTextBigImage ){
	
	//==============================
	// * 大图片字符 - 组合符配置
	//==============================
	var _drill_AsOC_DTBI_COWC_effect_processCombined = Game_Temp.prototype.drill_COWC_effect_processCombined;
	Game_Temp.prototype.drill_COWC_effect_processCombined = function( matched_index, matched_str, command, args ){
		_drill_AsOC_DTBI_COWC_effect_processCombined.call( this, matched_index, matched_str, command, args );
		
		if( command == "dimg" && args.length >= 3 ){
			var temp1 = String(args[0]);
			var temp2 = String(args[1]);
			var temp3 = String(args[2]);
			
			if( temp1 == "货币素材" ){
				if( args.length == 3 ){
					if( temp3 == "不占高宽" ){	// > 『窗口字符定义』 - 大图片字符（\dimg[货币素材:小图:不占高宽]）
						if( temp2 == "小图" ){
							var str_imgIndex  = "1";
							var str_imgWidth  = "0";
							var str_imgHeight = "0";
							var str_imgPosX   = "0";
							var str_imgPosY   = "0";
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
						}
						if( temp2 == "中型图" ){
							var str_imgIndex  = "2";
							var str_imgWidth  = "0";
							var str_imgHeight = "0";
							var str_imgPosX   = "0";
							var str_imgPosY   = "0";
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
						}
						if( temp2 == "高清图" ){
							var str_imgIndex  = "3";
							var str_imgWidth  = "0";
							var str_imgHeight = "0";
							var str_imgPosX   = "0";
							var str_imgPosY   = "0";
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
						}
						if( temp2.indexOf("自定义[") != -1 ){
							temp2 = temp2.replace("自定义[","");
							temp2 = temp2.replace("]","");
							var size_arr = temp2.split(/[,，]/);
							if( size_arr.length >= 2 ){
								size_arr.unshift("4");
								var str_imgIndex = size_arr.join("_");
								var str_imgWidth  = "0";
								var str_imgHeight = "0";
								var str_imgPosX   = "0";
								var str_imgPosY   = "0";
								this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
							}
						}
						return;
					}
					if( temp3 == "占用高宽" ){	// > 『窗口字符定义』 - 大图片字符（\dimg[货币素材:小图:占用高宽]）
						if( temp2 == "小图" ){
							var src_bitmap = $gameTemp.drill_AsOC_getBitmap64x64_currency();
							var str_imgIndex  = "1";
							var str_imgWidth  = String(src_bitmap.width);
							var str_imgHeight = String(src_bitmap.height);
							var str_imgPosX   = "0";
							var str_imgPosY   = "0";
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
						}
						if( temp2 == "中型图" ){
							var src_bitmap = $gameTemp.drill_AsOC_getBitmap96x96_currency();
							var str_imgIndex  = "2";
							var str_imgWidth  = String(src_bitmap.width);
							var str_imgHeight = String(src_bitmap.height);
							var str_imgPosX   = "0";
							var str_imgPosY   = "0";
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
						}
						if( temp2 == "高清图" ){
							var src_bitmap = $gameTemp.drill_AsOC_getBitmap256x256_currency();
							var str_imgIndex  = "3";
							var str_imgWidth  = String(src_bitmap.width);
							var str_imgHeight = String(src_bitmap.height);
							var str_imgPosX   = "0";
							var str_imgPosY   = "0";
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
						}
						if( temp2.indexOf("自定义[") != -1 ){
							temp2 = temp2.replace("自定义[","");
							temp2 = temp2.replace("]","");
							var size_arr = temp2.split(/[,，]/);
							if( size_arr.length >= 2 ){
								size_arr.unshift("4");
								var str_imgIndex  = size_arr.join("_");
								var str_imgWidth  = Number(size_arr[1]);
								var str_imgHeight = Number(size_arr[2]);
								var str_imgPosX   = "0";
								var str_imgPosY   = "0";
								this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
							}
						}
						return;
					}
				}
				if( args.length == 4 ){		// > 『窗口字符定义』 - 大图片字符（\dimg[货币素材:小图:不占高宽:位置[10,-10]]）
					var temp4 = String(args[3]);
					temp4 = temp4.replace("位置[","");
					temp4 = temp4.replace("]","");
					var pos = temp4.split(/[,，]/);
					if( pos.length >= 2 ){
						if( temp2 == "小图" ){
							var str_imgIndex  = "1";
							var str_imgWidth  = "0";
							var str_imgHeight = "0";
							var str_imgPosX   = String(pos[0]);
							var str_imgPosY   = String(pos[1]);
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
						}
						if( temp2 == "中型图" ){
							var str_imgIndex  = "2";
							var str_imgWidth  = "0";
							var str_imgHeight = "0";
							var str_imgPosX   = String(pos[0]);
							var str_imgPosY   = String(pos[1]);
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
						}
						if( temp2 == "高清图" ){
							var str_imgIndex  = "3";
							var str_imgWidth  = "0";
							var str_imgHeight = "0";
							var str_imgPosX   = String(pos[0]);
							var str_imgPosY   = String(pos[1]);
							this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
						}
						if( temp2.indexOf("自定义[") != -1 ){
							temp2 = temp2.replace("自定义[","");
							temp2 = temp2.replace("]","");
							var size_arr = temp2.split(/[,，]/);
							if( size_arr.length >= 2 ){
								size_arr.unshift("4");
								var str_imgIndex  = size_arr.join("_");
								var str_imgWidth  = "0";
								var str_imgHeight = "0";
								var str_imgPosX   = String(pos[0]);
								var str_imgPosY   = String(pos[1]);
								this.drill_COWC_effect_submitCombined( "@@@dbi[drawAsset:_AsOC_:"+str_imgIndex+":"+str_imgWidth+":"+str_imgHeight+":"+str_imgPosX+":"+str_imgPosY+"]" );
							}
						}
						return;
					}
				}
			}
			
		}
	};
	
	//==============================
	// * 字符图 - 再处理阶段-配置阶段（继承）
	//==============================
	var _drill_AsOC_DTBI_COCD_textBlock_processSecond = Game_Temp.prototype.drill_COCD_textBlock_processSecond;
	Game_Temp.prototype.drill_COCD_textBlock_processSecond = function( command, args, cur_baseParam, cur_blockParam, cur_rowParam ){
		_drill_AsOC_DTBI_COCD_textBlock_processSecond.call( this, command, args, cur_baseParam, cur_blockParam, cur_rowParam );
		
		if( command == "@@@dbi" ){
			if( args.length >= 5 ){
				var drawType = String(args[0]);
				if( drawType == "drawAsset" ){
					
					// > 『底层字符定义』 - 字符图（@@@dbi[drawAsset:货币素材:"1":0:0:4:4]） drill_big_image
					if( args.length == 7 ){
						cur_baseParam['DTBI_imgType'] = String(args[1]);		//（基础字符配置）
						cur_baseParam['DTBI_imgIndex'] = String(args[2]);		//
						
						cur_baseParam['DTBI_imgWidth'] = Number(args[3]);		//
						cur_baseParam['DTBI_imgHeight'] = Number(args[4]);		//
						cur_baseParam['DTBI_imgPosX'] = Number(args[5]);		//
						cur_baseParam['DTBI_imgPosY'] = Number(args[6]);		//
						
						this.drill_COCD_textBlock_submitSecond( "@" );			//（必须提交一个字符）
						return;
					}
				}
			}
		}
	}
	//==============================
	// * 大图片字符 - 绘制大图片
	//==============================
	var _drill_AsOC_DTBI_getBitmap = Bitmap.prototype.drill_DTBI_getBitmap;
	Bitmap.prototype.drill_DTBI_getBitmap = function( baseParam ){
		var imgType = baseParam['DTBI_imgType'];
		var imgIndex = baseParam['DTBI_imgIndex'];
		if( imgType == "_AsOC_" ){
			
			// > 自定义情况
			var custom_list = null;
			if( imgIndex.indexOf("_") != -1 ){
				var temp_arr = imgIndex.split("_");
				if( temp_arr.length >= 3 ){
					custom_list = temp_arr;
				}
			}
			
			// > 绘制 货币素材（小图/中型图/高清图/自定义）
			if( imgIndex == "1" ){
				return $gameTemp.drill_AsOC_getBitmap64x64_currency();
			}
			if( imgIndex == "2" ){
				return $gameTemp.drill_AsOC_getBitmap96x96_currency();
			}
			if( imgIndex == "3" ){
				return $gameTemp.drill_AsOC_getBitmap256x256_currency();
			}
			if( custom_list != null && custom_list[0] == "4" ){
				return $gameTemp.drill_AsOC_getBitmapCustomSize_currency( Number(custom_list[1]),Number(custom_list[2]) );
			}
		}
		
		// > 原函数
		return _drill_AsOC_DTBI_getBitmap.call( this, baseParam );
	};
	
	
	}
}


//=============================================================================
// ** ☆用语管理器覆盖
//
//			说明：	> 该模块专门管理 用语管理器 的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 用语管理器覆盖 - 最后继承1级
//==============================
var _drill_AsOC_scene_initialize_3 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_AsOC_scene_initialize_3.call(this);
	
	//==============================
	// * 用语管理器覆盖 - 货币单位（覆写）
	//
	//			说明：	> 此文本在 【数据库 > 系统 > 货币单位】 设置。
	//==============================
	Object.defineProperty(TextManager, 'currencyUnit', {
		get: function(){
			if( DrillUp.g_AsOC_coverEnabled_currency == true ){
				return $gameTemp.drill_AsOC_getTextByFormat_currency( DrillUp.g_AsOC_coverFormat_currency );
			}
			
			// > 原函数
			return $dataSystem.currencyUnit;
		},
		configurable: true
	});
}



//=============================================================================
// ** ☆DEBUG资源情况测试
//
//			说明：	> 此模块控制 DEBUG资源情况测试 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG资源情况测试 - 帧刷新（地图界面）
//==============================
var _drill_AsOC_debug_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_AsOC_debug_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_AsOC_DebugEnabled == true ){
		$gameTemp._drill_AsOC_DebugEnabled = undefined;
		this.drill_AsOC_createDebugSprite();
	}
	// > 销毁贴图
	if( $gameTemp._drill_AsOC_DebugEnabled == false ){
		$gameTemp._drill_AsOC_DebugEnabled = undefined;
		if( this._drill_AsOC_DebugSprite != undefined ){
			this.removeChild(this._drill_AsOC_DebugSprite);
			this._drill_AsOC_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG资源情况测试 - 创建贴图
//==============================
Scene_Map.prototype.drill_AsOC_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_AsOC_DebugSprite != undefined ){
		this.removeChild(this._drill_AsOC_DebugSprite);
		this._drill_AsOC_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_layer = new Sprite();
	this.addChild( temp_layer );	//（直接加在最顶层的上面）
	this._drill_AsOC_DebugSprite = temp_layer;
	
	// > 显示图片
	var temp_sprite = new Sprite();
	temp_sprite.x = 50;
	temp_sprite.y = 150;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = $gameTemp.drill_AsOC_getBitmap32x32_currency();
	temp_layer.addChild( temp_sprite );
	
	var temp_sprite = new Sprite();
	temp_sprite.x = 70;
	temp_sprite.y = 220;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = $gameTemp.drill_AsOC_getBitmap64x64_currency();
	temp_layer.addChild( temp_sprite );
	
	var temp_sprite = new Sprite();
	temp_sprite.x = 90;
	temp_sprite.y = 320;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = $gameTemp.drill_AsOC_getBitmap96x96_currency();
	temp_layer.addChild( temp_sprite );
	
	var temp_sprite = new Sprite();
	temp_sprite.x = 120;
	temp_sprite.y = 500;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = $gameTemp.drill_AsOC_getBitmap256x256_currency();
	temp_layer.addChild( temp_sprite );
	
	// > 显示图片（自定义）
	var temp_sprite = new Sprite();
	temp_sprite.x = 200;
	temp_sprite.y = 100;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.bitmap = $gameTemp.drill_AsOC_getBitmapCustomSize_currency( 128, 64 );
	temp_layer.addChild( temp_sprite );
	
	
	// > 显示窗口字符
	var temp_window = new Window_Base( 300, 10, 500, 600 );
	temp_layer.addChild( temp_window );
	
	// > 绘制 - DEBUG显示画布范围
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COWC_debug_drawRect();
	
	// > 绘制 - 参数准备
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	// > 绘制 - 参数准备 - 自定义
	options['blockParam'] = {};					//『清零字符默认间距』
	options['blockParam']['paddingTop'] = 0;
	options['rowParam'] = {};
	options['rowParam']['lineHeight_upCorrection'] = 0;
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = false;
	options['baseParam']['fontSize'] = 18;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	// > 绘制 - 测试的字符
	var text =  "【" + DrillUp.g_AsOC_PluginTip_curName + "】<br>" + 
				"当前测试窗口字符，如下： <br>" + 
				
				"\\\\dtxt[货币文本]　　　   \\dtxt[货币文本] \\fr<br>" + 
				"\\\\dtxt[货币文本:只文本]  \\dtxt[货币文本:只文本] \\fr<br>" + 
				
				"\\\\dimg[货币素材:小图:占用高宽]   \\dimg[货币素材:小图:占用高宽] \\fr<br>" + 
				"\\\\dimg[货币素材:自定义[72,48]:占用高宽]   \\dimg[货币素材:自定义[72,48]:占用高宽] \\fr<br>" + 
				"";
				
	// > 『字符主流程』 - 绘制文本【窗口字符 - 窗口字符核心】
	temp_window.drill_COWC_drawText( text, options );
}

