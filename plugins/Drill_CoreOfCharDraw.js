//=============================================================================
// Drill_CoreOfCharDraw.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        系统 - 字符绘制核心
 * @author Drill_up
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_CoreOfCharDraw +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该核心提供最基础的字符绘制功能。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 该插件为基础核心，单独使用没有效果。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   对所有贴图有效。
 * 2.了解更多窗口字符，可以去看看 "23.窗口字符 > 关于窗口字符.docx"。
 * 细节：
 *   (1.
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令打开插件的Debug查看：
 * 
 * 插件指令：>字符绘制核心 : DEBUG基础字符测试 : 开启
 * 插件指令：>字符绘制核心 : DEBUG基础字符测试 : 关闭
 * 
 * 插件指令：>字符绘制核心 : DEBUG底层字符测试 : 开启
 * 插件指令：>字符绘制核心 : DEBUG底层字符测试 : 关闭
 * 
 * 插件指令：>字符绘制核心 : DEBUG范围盒测试 : 开启
 * 插件指令：>字符绘制核心 : DEBUG范围盒测试 : 关闭
 * 
 * 
 * 插件指令：>字符绘制核心 : DEBUG对齐方式测试 : 开启
 * 插件指令：>字符绘制核心 : DEBUG对齐方式测试 : 关闭
 * 
 * 插件指令：>字符绘制核心 : DEBUG行高控制测试 : 开启
 * 插件指令：>字符绘制核心 : DEBUG行高控制测试 : 关闭
 * 
 * 
 * 插件指令：>字符绘制核心 : DEBUG字符混合测试 : 开启
 * 插件指令：>字符绘制核心 : DEBUG字符混合测试 : 关闭
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   去各个管理层跑一圈测试。
 * 测试结果：   地图界面中，平均消耗为：【】
 *              战斗界面中，平均消耗为：【】
 *              菜单界面中，平均消耗为：【】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COCD（Core_Of_Char_Draw）
//		临时全局变量	DrillUp.g_COCD_xxx
//		临时局部变量	this._drill_COCD_xxx
//		存储数据变量	$gameSystem._drill_COCD_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
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
//			
//			
//			->☆流程介绍 标准模块
//				->绘制文本内容【标准函数】【Bitmap】
//				->准备绘制配置【标准函数】【Game_Temp】
//			
//			--------------------------
//			
//			
//			->☆基础字符 标准模块
//				->绘制基础字符【标准函数】【Bitmap】
//				->获取文本宽度【标准函数】【Game_Temp】
//				->获取文本高度【标准函数】【Game_Temp】
//			->☆基础字符实现
//				->默认值
//				->绘制基础字符
//					->设置样式
//					->字体设置
//					->文本描边
//				->画布对象（私有）
//					->获取文本宽度（私有）
//					->获取文本高度（私有）
//			
//			->☆DEBUG基础字符配置
//				->绘制文本矩形
//			->☆DEBUG基础字符显示
//			
//			
//			->☆底层字符 标准模块
//				->绘制
//					->绘制单个字符块【标准函数】【Bitmap】
//					->绘制单个单行块【标准函数】【Bitmap】
//				->解析底层字符【标准函数】【Game_Temp】
//				->样式阶段
//					->样式阶段-配置阶段【标准函数】【Game_Temp】
//					->样式阶段-配置提交【标准函数】【Game_Temp】
//					->样式阶段-回滚样式【标准函数】【Game_Temp】
//				->再处理阶段
//					->再处理阶段-配置阶段【标准函数】【Game_Temp】
//					->再处理阶段-配置提交【标准函数】【Game_Temp】
//				->统计阶段
//					->统计阶段-统计开始时【标准函数】【Game_Temp】
//					->统计阶段-统计结束时【标准函数】【Game_Temp】
//				->全重置字符【标准函数】【Game_Temp】
//			->☆底层字符实现
//				->解析底层字符
//					->切割字符串
//					->创建字符块列表/样式阶段
//						->普通文本时
//							->创建单个字符块（可继承）
//							->回滚样式（可继承）
//						->指令时
//							->通过时
//							->未通过时（转 普通文本时）
//					->二次处理字符块列表/再处理阶段
//						->指令时
//							->通过时（字符块只留一个字符）
//							->未通过时（不操作）
//					->范围盒计算
//					->创建单行块列表/手动换行
//						->创建单个单行块（可继承）
//					->字符拆散处理
//						->复制字符块
//					->自动换行处理
//						->复制单行块
//					->统计阶段
//						->当前行的文本
//						->当前行的字数
//					->位置X分配
//					->位置Y分配
//			->底层字符 字符块【Drill_COCD_TextBlock】
//			->底层字符 单行块【Drill_COCD_RowBlock】
//			->☆底层字符应用
//				->基础字符配置
//				->底层单块配置
//				->底层单行配置
//			
//			->☆DEBUG底层字符应用
//				->显示字符方框
//				->显示单行标线
//				->显示范围盒
//			->☆DEBUG底层字符显示
//			->☆DEBUG范围盒显示
//			
//			--------------------------
//			
//			
//			->☆对齐方式
//				->整体对齐
//				->切断对齐
//					->获取 横向居中位置
//					->获取 横向右对齐位置
//					->获取 纵向居中位置
//					->获取 纵向右对齐位置
//				->位置X叠加
//				->位置Y叠加
//			->☆DEBUG对齐方式显示
//
//			->☆行高控制
//				->行上增高
//				->行下增高
//					->只有这个是向下扩，其它都是向上扩
//				->锁定行高
//				->行上补正
//			->☆DEBUG行高控制显示
//
//			->☆图标字符
//				->继承 再处理阶段
//				->获取文本宽度（半覆写）
//				->获取文本高度（半覆写）
//				->绘制基础字符（半覆写）
//					->绘制图标
//
//			->☆分割线字符
//				->继承 再处理阶段
//				->获取文本宽度（半覆写）
//				->获取文本高度（半覆写）
//				->绘制基础字符（半覆写）
//					->绘制分割线
//
//			->☆DEBUG字符混合
//			
//			--------------------------
//			
//			
//			->☆管辖权
//			->☆管辖权覆写函数
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			1.系统 > 关于字符绘制核心（脚本）.docx
//		
//		★插件私有类：
//			* 底层字符 字符块【Drill_COCD_TextBlock】
//			* 底层字符 单行块【Drill_COCD_RowBlock】
//		
//		★必要注意事项：
//			1.名词术语 - 流程：
//				正规的流程：      指核心中所给的函数流程，按照该流程执行绘制函数，即符合正规的流程。
//				字符核心流程：    字符绘制核心 提供的标准函数，使用此函数表示走该流程。
//				字符主流程：      窗口字符核心 提供的标准函数，使用此函数表示走该流程。
//				字符逐个绘制流程：窗口字符核心 提供的标准函数，使用此函数表示走该流程。
//				字符贴图流程：    窗口字符贴图核心 提供的标准函数，使用此函数表示走该流程。
//				零散使用：        你可以不走正规的流程，也可以直接拆散用里面的函数，自己写一套。只是走正规的流程不容易出错，所以各核心才专门介绍流程函数。
//			  名词术语 - 字符绘制核心：
//				字符块：          基本的字符绘制单位，字符块可以有单个或多个字符，表示一次绘制。
//				单行块：          基本的行绘制单位，容纳一组字符块，表示一行绘制。且可以为空行。
//				基础字符：        指通过动态参数对象控制的字符，可见"baseParam"的参数。能直接使用h5画笔进行绘制。
//				底层字符：        指通过字符串控制的字符，"@@@xxx"和"@@@xxx[]"格式。需经历 样式阶段、再处理阶段、统计结束阶段 的解析，才能绘制的基础字符。
//				窗口字符：        指通过字符串控制的字符，"\xxx"、"\xxx[]"和"<xxx>"格式。需经历 优先指代阶段、表达式阶段、指代字符阶段、效果字符阶段、逐个绘制阶段 的解析，才能绘制的基础字符。
//				范围盒：          指绘制文本的实际范围，因为并不是所有文本都会在全画布范围内进行绘制。关键词"box"，范围能在上侧左侧右侧进行缩小，但文本会全部从下侧挤出。
//				字符拆散：        字符块可以有单个或多个字符，但有时多个字符不好处理，需要拆散。拆散分成 字符拆散-全部、字符拆散-当前行 两种拆散方法。
//				常规换行：        通过在字符串中添加底层字符（@@@-or）而实现的换行功能。
//				手动换行：        通过在字符串中添加底层字符（@@@-br）而实现的换行功能。
//				自动换行：        通过参数配置或添加底层字符（@@@-ws）而实现的换行功能。自动换行会无视常规换行（@@@-or），保留手动换行（@@@-br）。可见函数 自动换行处理，自动换行必然拆散全部字符。
//				图标字符：        属于底层字符，在再处理阶段解析，需要消耗一个字符块，并绘制出一个图标。
//				字符块贴图：      指能在画布上绘制可以动的贴图对象，由于该功能已强大到超出bitmap的掌控范围，所以单独在 窗口字符贴图核心 中控制。
//				全重置字符：      属于底层字符，在样式阶段解析，重置所有样式为 全局默认值。
//				全局默认值：      新建的所有贴图/窗口所使用的 默认值。（继承bitmap的"自带参数"或"准备绘制配置"的函数）子插件将其分成了 所有文本、对话框 两处的全局默认值配置。
//			  名词术语 - 窗口字符核心：
//				转义：            指将字符串转成其它字符串的过程。
//				转义字符：        在该核心中，特指 \ < > 用于转义的字符。
//				字符应用A底层：   指直连 底层字符应用 的窗口字符。
//				字符应用B原版：   指游戏编辑器默认定义的窗口字符。
//				字符应用C扩展：   指除了 字符应用A和B，该核心额外提供的窗口字符。
//				优先指代：        优先指代阶段用的字符，识别\xxx[]的字符串，最先转义成其它的字符。
//				表达式：          表达式阶段用的字符，识别<xxx>的字符串，并转义成其它的字符。
//				指代字符：        指代字符阶段用的字符，识别\xxx或\xxx[]的字符串，并转义成其它的字符。
//				效果字符：        效果字符阶段用的字符，识别\xxx或\xxx[]的字符串，并实现效果的字符。
//				消息输入字符：    消息输入阶段用的字符，识别\xxx或\xxx[]的字符串，并进行 逐个绘制 设置。
//				逐个绘制：        独立函数功能集，能拆散全部文本，且每隔几帧绘制一个常规字符。只有此功能集支持消息输入字符。
//			2.只该插件的名词术语：
//				基础字符配置： 就是单指baseParam对象下的所有参数，没别的含义。
//				底层单块配置： 就是单指blockParam对象下的所有参数，没别的含义。
//				底层单行配置： 就是单指rowParam对象下的所有参数，没别的含义。
//		
//		★其它说明细节：
//			1. 2025-2-19：这插件从建立到完善，搞了半年了快……
//				过年这段时间ai大模型deepseek放出来了，找ai要了一下字符画，ai给了一堆奇怪的字符画。
//				但发现还行，有点灵感，我自己画了一个螺旋三角形放在这里。
//				       /\
//				      /  \
//				     / /\ \
//				    / /  \ \
//				   / / /\ \ \
//				  / / / _\ \ \
//				 / / /______\ \
//				/ /____________\
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
	DrillUp.g_COCD_PluginTip_curName = "Drill_CoreOfCharDraw.js 系统-字符绘制核心";
	DrillUp.g_COCD_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfCharDraw = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfCharDraw');
	
	
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_COCD_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_COCD_pluginCommand.call(this, command, args);
	this.drill_COCD_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_COCD_pluginCommand = function( command, args ){
	if( command === ">字符绘制核心" ){
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG基础字符测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COCD_BaseText_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COCD_BaseText_DebugEnabled = false;
				}
			}
			if( type == "DEBUG底层字符测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COCD_BlockText_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COCD_BlockText_DebugEnabled = false;
				}
			}
			if( type == "DEBUG范围盒测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COCD_Box_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COCD_Box_DebugEnabled = false;
				}
			}
			if( type == "DEBUG对齐方式测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COCD_Align_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COCD_Align_DebugEnabled = false;
				}
			}
			if( type == "DEBUG行高控制测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COCD_LineHeight_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COCD_LineHeight_DebugEnabled = false;
				}
			}
			if( type == "DEBUG字符混合测试" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_COCD_Mix_DebugEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_COCD_Mix_DebugEnabled = false;
				}
			}
		}
	}
};
	
	
	
//#############################################################################
// ** 【标准模块】☆流程介绍 标准模块
//#############################################################################
//##############################
// * 流程介绍 - 绘制文本内容【标准函数】【Bitmap】
//			
//			参数：	> text 字符串                       （含 @@@xxx 的文本）
//					> options 动态参数对象              （参数集合，必须提供）
//					> options['infoParam']  动态参数对象（只读配置信息，可为空，相关参数见 文档 ）
//					> options['baseParam']  动态参数对象（基础字符配置，可为空，相关参数见 文档 ）
//					> options['blockParam'] 动态参数对象（底层单块配置，可为空，相关参数见 文档 ）
//					> options['rowParam']   动态参数对象（底层单行配置，可为空，相关参数见 文档 ）
//			返回：	> 无
//			
//			说明：	> 该函数只作参考用。
//					> 实际绘制文本情况要复杂的多，并且流程经常是零散使用的。（所以不要继承这个函数）
//					> 可以比对一下DEBUG中的拆散用法；也可以比对后面模块 管辖权覆写函数 的拆散用法。
//##############################
Bitmap.prototype.drill_COCD_drawText = function( text, options ){
	
	// > 『字符核心流程』 - 准备绘制配置
	var cur_options = JSON.parse(JSON.stringify(options));	//（需要深拷贝，因为走一次流程options会变）
	$gameTemp.drill_COCD_initOptions( cur_options, this );
	
	// > 『字符核心流程』 - 解析底层字符
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, cur_options );
	
	// > 『字符核心流程』 - 绘制 单行块列表
	for(var i = 0; i < rowBlock_list.length; i++){
		var rowBlock = rowBlock_list[i];
		this.drill_COCD_drawRowBlock( rowBlock );
	}
	
	// > 『字符贴图流程』 - 刷新字符块贴图（可选）【窗口字符 - 窗口字符贴图核心】
	//	（父贴图执行）sprite.drill_COWCSp_sprite_refreshAllSprite();
}
//##############################
// * 流程介绍『字符核心流程』 - 准备绘制配置【标准函数】【Game_Temp】
//			
//			参数：	> o_data 动态参数对象  （当前配置）
//					> o_bitmap 动态参数对象（当前画布，可为空）
//			返回：	> 无
//
//			说明：	> 子插件可以继承此函数，实现对绘制配置的初始化。
//					> o_data 就是 options，但是通常情况下 options 都是只读，但这里是初始化赋值，所以换个名字表示。
//##############################
Game_Temp.prototype.drill_COCD_initOptions = function( o_data, o_bitmap ){
	
	// > 配置
	if( o_data['infoParam'] == undefined ){ o_data['infoParam'] = {}; }
	if( o_data['infoParam']['x'] == undefined ){ o_data['infoParam']['x'] = 0; }
	if( o_data['infoParam']['y'] == undefined ){ o_data['infoParam']['y'] = 0; }
	if( o_bitmap != undefined ){
		if( o_data['infoParam']['canvasWidth']  == undefined ){ o_data['infoParam']['canvasWidth']  = o_bitmap.width;  }
		if( o_data['infoParam']['canvasHeight'] == undefined ){ o_data['infoParam']['canvasHeight'] = o_bitmap.height; }
	}else{
		if( o_data['infoParam']['canvasWidth']  == undefined ){ o_data['infoParam']['canvasWidth']  = 100; }
		if( o_data['infoParam']['canvasHeight'] == undefined ){ o_data['infoParam']['canvasHeight'] = 100; }
	}
	//o_data['infoParam']['drawDebugAllRect'] = true;	//（测试用参数）
	
	// > 配置 - 基础字符配置
	if( o_data['baseParam'] == undefined ){ o_data['baseParam'] = {}; }
	//o_data['baseParam']['textColor'];
	//o_data['baseParam']['outlineEnabled'];
	//o_data['baseParam']['outlineColor'];
	//o_data['baseParam']['outlineWidth'];
	//o_data['baseParam']['fontBold'];
	//o_data['baseParam']['fontItalic'];
	//o_data['baseParam']['fontSize'];
	//o_data['baseParam']['fontFace'];
	//o_data['baseParam']['drawDebugBaseRect'] = true;	//（测试用参数）
	
	// > 配置 - 底层单块配置
	if( o_data['blockParam'] == undefined ){ o_data['blockParam'] = {}; }
	if( o_data['blockParam']['posX'] == undefined ){ o_data['blockParam']['posX'] = 0; }
	if( o_data['blockParam']['posY'] == undefined ){ o_data['blockParam']['posY'] = 0; }
	if( o_data['blockParam']['offsetX'] == undefined ){ o_data['blockParam']['offsetX'] = 0; }
	if( o_data['blockParam']['offsetY'] == undefined ){ o_data['blockParam']['offsetY'] = 0; }
	//o_data['blockParam']['splitAll'];
	//o_data['blockParam']['splitRow'];
	//o_data['blockParam']['wordWrap'];
	//o_data['blockParam']['wordWrap_maxWidth'];
	
	// > 配置 - 底层单行配置
	if( o_data['rowParam'] == undefined ){ o_data['rowParam'] = {}; }
	//o_data['rowParam']['alignHor_type'];
	//o_data['rowParam']['alignHor_maxWidth'];
	//o_data['rowParam']['alignVer_type'];
	//o_data['rowParam']['alignVer_maxHeight'];
	//o_data['rowParam']['drawDebugRowRect'] = true;	//（测试用参数）
}

	
	
//#############################################################################
// ** 【标准模块】☆基础字符 标准模块
//#############################################################################
//##############################
// * 基础字符 - 绘制基础字符【标准函数】【Bitmap】
//			
//			参数：	> text 字符串           （目标文本）
//					> x, y 数字             （文本位置）
//					> baseParam 动态参数对象（可为null）
//			返回：	> 无
//			
//			说明：	> 只绘制纯文本，纯文本是一次性全绘制。
//					> 此绘制流程不会清理画布。
//##############################
Bitmap.prototype.drill_COCD_drawBaseText = function( text, x, y, baseParam ){
    if( text == undefined ){ return; }
	if( baseParam == undefined ){ baseParam = {}; }
	$gameTemp.drill_COCD_drawBaseText_initParam( baseParam );
	this.drill_COCD_drawBaseText_Private( text, x, y, baseParam );
}
//##############################
// * 基础字符 - 获取文本宽度【标准函数】【Game_Temp】
//			
//			参数：	> text 字符串           （目标文本）
//					> baseParam 动态参数对象（可为null）
//			返回：	> 无
//			
//			说明：	> 只计算纯文本的宽度。可以通过 Game_Temp 直接获取。
//					> 该函数在绘制前、绘制后都可以执行。
//##############################
Game_Temp.prototype.drill_COCD_measureBaseTextWidth = function( text, baseParam ){
    if( text == undefined ){ return 0; }
	var painter = DrillUp.g_COCD_objCanvas.getContext('2d');	//（直接拿全局的画笔）
	if( baseParam == undefined ){ baseParam = {}; }
	this.drill_COCD_drawBaseText_initParam( baseParam );
	return this.drill_COCD_measureBaseTextWidth_Private( painter, text, baseParam );
}
//##############################
// * 基础字符 - 获取文本高度【标准函数】【Game_Temp】
//			
//			参数：	> text 字符串           （目标文本）
//					> baseParam 动态参数对象（可为null）
//			返回：	> 无
//			
//			说明：	> 只计算纯文本的高度。可以通过 Game_Temp 直接获取。
//					> 该函数在绘制前、绘制后都可以执行。
//##############################
Game_Temp.prototype.drill_COCD_measureBaseTextHeight = function( text, baseParam ){
    if( text == undefined ){ return 0; }
	var painter = DrillUp.g_COCD_objCanvas.getContext('2d');	//（直接拿全局的画笔）
	if( baseParam == undefined ){ baseParam = {}; }
	this.drill_COCD_drawBaseText_initParam( baseParam );
	return this.drill_COCD_measureBaseTextHeight_Private( painter, text, baseParam );
}


//=============================================================================
// ** ☆基础字符实现
//
//			说明：	> 此模块提供 基础字符 的绘制与高宽计算。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 基础字符实现 - 默认值（私有）
//
//			说明：	> 该函数可以放帧刷新中反复执行。
//==============================
Game_Temp.prototype.drill_COCD_drawBaseText_initParam = function( baseParam ){
	if( baseParam['inited'] == true ){ return; }
	
	if( baseParam['textColor'] == undefined ){ baseParam['textColor'] = "rgb(255,255,255)" };		//文本本体 - 颜色『绘制过程定义』
	
	if( baseParam['outlineEnabled'] == undefined ){ baseParam['outlineEnabled'] = true };			//文本描边 - 描边开关『绘制过程定义』
	if( baseParam['outlineColor'] == undefined ){ baseParam['outlineColor'] = "rgba(0,0,0,0.5)" };	//文本描边 - 描边颜色『绘制过程定义』
	if( baseParam['outlineWidth'] == undefined ){ baseParam['outlineWidth'] = 4 };					//文本描边 - 描边厚度『绘制过程定义』
	
	if( baseParam['fontBold'] == undefined ){ baseParam['fontBold'] = false };						//字体设置 - 字体加粗『绘制过程定义』
	if( baseParam['fontItalic'] == undefined ){ baseParam['fontItalic'] = false };					//字体设置 - 字体倾斜『绘制过程定义』
	if( baseParam['fontSize'] == undefined ){ baseParam['fontSize'] = 28 };							//字体设置 - 字体大小『绘制过程定义』（默认为28）
	if( baseParam['fontSize'] < 12 ){ baseParam['fontSize'] = 12 };									//字体设置 - 字体大小『绘制过程定义』（最小只能为12px）
	if( baseParam['fontFace'] == undefined ){ baseParam['fontFace'] = "GameFont" };					//字体设置 - 字体名称『绘制过程定义』（默认为GameFont）
	
	baseParam['inited'] = true;		//（初始化标记）
}
//==============================
// * 基础字符实现 - 绘制基础字符（私有）
//
//			说明：	> 此函数的baseParam参数，需要 默认值 初始化。
//					> 注意此处是 纯绘制，与底层字符、窗口字符无关。
//==============================
Bitmap.prototype.drill_COCD_drawBaseText_Private = function( text, x, y, baseParam ){
	
	// > 开始绘制 字符
	//		（此处的xy位置就是最终绘制的位置，应该在绘制前就分配好）
	var painter = this._context;
	painter.save();																//（a.存储上一个画笔状态）
	
	$gameTemp.drill_COCD_drawBaseText_style(painter, text, x, y, baseParam);	//（b.设置样式）
	
	$gameTemp.drill_COCD_drawBaseText_outline(painter, text, x, y, baseParam);	//（c.路径填充/描边，fillText）
	$gameTemp.drill_COCD_drawBaseText_body(painter, text, x, y, baseParam);		//（c.路径填充/描边，strokeText）
	
	painter.restore();															//（d.回滚上一个画笔状态）
	this._setDirty();		//（此函数必须在bitmap内执行）
};
//==============================
// * 基础字符实现 - 绘制基础字符 - 设置样式
//==============================
Game_Temp.prototype.drill_COCD_drawBaseText_style = function( painter, text, tx, ty, baseParam ){
	painter.font = this.drill_COCD_drawBaseText_font(baseParam);	//（字体设置）
	painter.textBaseline = "bottom";								//（确保矩形保住基础字符）
	//painter.textBaseline = "alphabetic";							//（此参数兼容火狐的bug，但这样会造成矩形包不住基础字符）
	//painter.textAlign = "left";									//（此参数没用）
};
//==============================
// * 基础字符实现 - 绘制基础字符 - 设置样式 - 字体设置
//
//			说明：	> 该设置是 基础字符中 唯一影响高度宽度的设置。
//==============================
Game_Temp.prototype.drill_COCD_drawBaseText_font = function( baseParam ){
	var font_str = "";
	if( baseParam['fontBold'] == true ){ font_str += "Bold "; }
	if( baseParam['fontItalic'] == true ){ font_str += "Italic "; }
	font_str += String(baseParam['fontSize']) + "px ";
	font_str += baseParam['fontFace'];
    return font_str;
};
//==============================
// * 基础字符实现 - 绘制基础字符 - 文本本体
//==============================
Game_Temp.prototype.drill_COCD_drawBaseText_body = function( painter, text, tx, ty, baseParam ){
	painter.fillStyle = baseParam['textColor'];
	painter.fillText(text, tx, ty);			//（此函数的 maxWidth 是可选的）
};
//==============================
// * 基础字符实现 - 绘制基础字符 - 文本描边
//==============================
Game_Temp.prototype.drill_COCD_drawBaseText_outline = function( painter, text, tx, ty, baseParam ){
	if( baseParam['outlineEnabled'] == false ){ return; }	//（关闭描边，则不绘制）
	if( baseParam['outlineWidth'] <= 0 ){ return; }			//（如果描边厚度为0，则不绘制）
	
	painter.strokeStyle = baseParam['outlineColor'];
	painter.lineWidth = baseParam['outlineWidth'];
	painter.lineJoin = "round";
	painter.strokeText(text, tx, ty);		//（此函数的 maxWidth 是可选的）
};

//==============================
// * 基础字符实现 - 画布对象（私有）
//==============================
DrillUp.g_COCD_objCanvas = document.createElement('canvas');
//==============================
// * 基础字符实现 - 获取文本宽度（私有）
//
//			说明：	> 注意，painter需要通过参数传入指针。
//==============================
Game_Temp.prototype.drill_COCD_measureBaseTextWidth_Private = function( painter, text, baseParam ){
    painter.save();														//（a.存储上一个画笔状态）
	
	this.drill_COCD_drawBaseText_style(painter, text, 0, 0, baseParam);	//（b.设置样式）
    
	var width = painter.measureText(text).width;						//（获取文本宽度，measureText）
    
	painter.restore();													//（d.回滚上一个画笔状态）
    return width;
};
//==============================
// * 基础字符实现 - 获取文本高度（私有）
//
//			说明：	> 注意，painter需要通过参数传入指针。
//==============================
Game_Temp.prototype.drill_COCD_measureBaseTextHeight_Private = function( painter, text, baseParam ){
	return baseParam['fontSize'] *1.10;		//『手算高度』（没有直接获取高度的方法，但通常为1.1倍字体大小）
};


//=============================================================================
// ** ☆DEBUG基础字符配置
//
//			说明：	> 此模块控制 DEBUG基础字符配置 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG基础字符配置 - 文本描边（继承）
//==============================
var _drill_COCD_COCD_drawBaseText_outline = Game_Temp.prototype.drill_COCD_drawBaseText_outline;
Game_Temp.prototype.drill_COCD_drawBaseText_outline = function( painter, text, tx, ty, baseParam ){
	
	// > 『绘制过程定义』 - 测试标记（@@@-de[显示字符方框]、@@@-de[隐藏字符方框]）
	if( baseParam['drawDebugBaseRect'] == true ){
		this.drill_COCD_drawBaseText_debug( painter, text, tx, ty, baseParam );
	}
	
	// > 原函数
	_drill_COCD_COCD_drawBaseText_outline.call( this, painter, text, tx, ty, baseParam );
}
//==============================
// * DEBUG基础字符配置 - 显示字符方框（继承）
//==============================
Game_Temp.prototype.drill_COCD_drawBaseText_debug = function( painter, text, tx, ty, baseParam ){
	var width  = painter.measureText(text).width;		//（因为此处正被 save和restore 包裹，所以直接获取文本宽度）
	var height = baseParam['fontSize'] *1.10;			//『手算高度』（因为此处正被 save和restore 包裹，所以直接获取文本高度）
	
	painter.strokeStyle = "rgb(255,255,255)";
	painter.lineWidth = 1;
	painter.lineJoin = "miter";
	painter.strokeRect( tx, ty-height, width, height );
	
	painter.fillStyle = "rgb(255,255,255)";
	painter.beginPath();
    painter.arc( tx, ty, 3, 0, Math.PI * 2, false );
    painter.fill();
};

//=============================================================================
// ** ☆DEBUG基础字符显示
//
//			说明：	> 此模块控制 DEBUG基础字符显示 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG基础字符显示 - 帧刷新（地图界面）
//==============================
var _drill_COCD_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COCD_debugMap_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_COCD_BaseText_DebugEnabled == true ){
		$gameTemp._drill_COCD_BaseText_DebugEnabled = undefined;
		this.drill_COCD_BaseText_createDebugSprite();
	}
	
	// > 销毁贴图
	if( $gameTemp._drill_COCD_BaseText_DebugEnabled == false ){
		$gameTemp._drill_COCD_BaseText_DebugEnabled = undefined;
		if( this._drill_COCD_BaseText_DebugSprite != undefined ){
			this.removeChild(this._drill_COCD_BaseText_DebugSprite);
			this._drill_COCD_BaseText_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG基础字符显示 - 创建贴图
//==============================
Scene_Map.prototype.drill_COCD_BaseText_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_COCD_BaseText_DebugSprite != undefined ){
		this.removeChild(this._drill_COCD_BaseText_DebugSprite);
		this._drill_COCD_BaseText_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 0;
	temp_debugSprite.y = 0;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.5)");
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_BaseText_DebugSprite = temp_debugSprite;
	
	// > 绘制 - 参数准备
	//		（注意，此处是纯绘制）
	var xx = 40;
	var yy = 80;
	var baseParam = {};
	baseParam['fontBold'] = false;
	baseParam['fontItalic'] = false;
	baseParam['fontSize'] = 20;
	baseParam['fontFace'] = "GameFont";
	baseParam['drawDebugBaseRect'] = true;
	
	// > 绘制 - 插件标识
	//		（注意，此处是纯绘制）
	var text = "【" + DrillUp.g_COCD_PluginTip_curName + "】";
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 字体文本
	//		（注意，此处是纯绘制，不支持 @@@xxx 字符）
	var text = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	var text = "1234567890.:,;'\"(!?)+-*/=";
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 像素参数准备
	//		（注意，此处是纯绘制，不支持 @@@xxx 字符）
	var suffix_text = "drill test 钻头测试 0123456789";
	
	// > 绘制 - 12像素
	var text = "12 " + suffix_text;
	baseParam['fontSize'] = 12;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 14像素
	var text = "14 " + suffix_text;
	baseParam['fontSize'] = 14;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 16像素
	var text = "16 " + suffix_text;
	baseParam['fontSize'] = 16;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 18像素
	var text = "18 " + suffix_text;
	baseParam['fontSize'] = 18;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 20像素
	var text = "20 " + suffix_text;
	baseParam['fontSize'] = 20;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 24像素
	var text = "24 " + suffix_text;
	baseParam['fontSize'] = 24;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 28像素
	var text = "28 " + suffix_text;
	baseParam['fontSize'] = 28;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 32像素
	var text = "32 " + suffix_text;
	baseParam['fontSize'] = 32;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 36像素
	var text = "36 " + suffix_text;
	baseParam['fontSize'] = 36;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 48像素
	var text = "48 " + suffix_text;
	baseParam['fontSize'] = 48;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 60像素
	var text = "60 " + suffix_text;
	baseParam['fontSize'] = 60;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
	
	// > 绘制 - 72像素
	var text = "72 " + suffix_text;
	baseParam['fontSize'] = 72;
	yy += $gameTemp.drill_COCD_measureBaseTextHeight( text, baseParam );
	temp_bitmap.drill_COCD_drawBaseText( text, xx, yy, baseParam );
}
	
	
	
//#############################################################################
// ** 【标准模块】☆底层字符 标准模块
//#############################################################################
//##############################
// * 底层字符『字符核心流程』 - 绘制-绘制单个字符块【标准函数】【Bitmap】
//			
//			参数：	> textBlock 对象
//			返回：	> 无
//			
//			说明：	> 需要一个 字符块 数据，才能进行一次绘制。
//##############################
Bitmap.prototype.drill_COCD_drawTextBlock = function( textBlock ){
	this.drill_COCD_drawTextBlock_Private( textBlock );
}
//##############################
// * 底层字符『字符核心流程』 - 绘制-绘制单个单行块【标准函数】【Bitmap】
//			
//			参数：	> rowBlock 对象
//			返回：	> 无
//			
//			说明：	> 需要一个 单行块 数据，才能进行一次绘制。
//##############################
Bitmap.prototype.drill_COCD_drawRowBlock = function( rowBlock ){
	this.drill_COCD_drawRowBlock_Private( rowBlock );
}

//##############################
// * 底层字符『字符核心流程』 - 解析底层字符【标准函数】【Game_Temp】
//			
//			参数：	> text 字符串                       （目标文本）
//					> options 动态参数对象              （参数集合，必须提供）
//					> options['infoParam']  动态参数对象（只读配置信息，可为空，相关参数见 文档 ）
//					> options['baseParam']  动态参数对象（基础字符配置，可为空，相关参数见 文档 ）
//					> options['blockParam'] 动态参数对象（底层单块配置，可为空，相关参数见 文档 ）
//					> options['rowParam']   动态参数对象（底层单行配置，可为空，相关参数见 文档 ）
//			返回：	> 对象列表                          （单行块列表）
//			
//			说明：	> 配置底层字符有下面两种方法：
//					    通过options对参数进行全配置。
//					    在文本中夹杂配置字符，但格式必须为 @@@xxx 或 @@@xxx[] 两种格式，且[]内必须为英文冒号。
//					> 注意，使用前需要考虑 深拷贝 。
//					  连续使用该函数解析底层字符时，options对象指针会变，会沾染上一次解析的颜色配置，以及其它样式配置。
//##############################
Game_Temp.prototype.drill_COCD_analysisText = function( text, options ){
    if( text == undefined ){ return; }
	return this.drill_COCD_analysisText_Private( text, options );
}
//##############################
// * 底层字符 - 样式阶段-配置阶段【标准接口】【Game_Temp】
//			
//			参数：	> command 字符串             （当前的指令）
//					> args 字符串列表            （当前的参数列表）
//					> cur_infoParam  动态参数对象（只读配置信息）
//					> cur_baseParam  动态参数对象（基础字符配置）
//					> cur_blockParam 动态参数对象（底层单块配置）
//					> cur_rowParam   动态参数对象（底层单行配置）
//			返回：	> 无
//			
//			说明：	> 指令格式固定为 @@@xxx 或 @@@xxx[] 两种格式，且[]内必须为英文冒号。
//					> 参数 cur_baseParam 赋值后，会传输到基础字符的配置中，在相关函数中，能拿出来用。
//					> 参数 cur_blockParam 赋值后，会传输到底层字符的配置中，在相关函数中，能拿出来用。
//					> 参数 cur_rowParam 赋值后，会传输到单行的配置中，在相关函数中，能拿出来用。
//					> 如果成功配置，需要调用 配置提交 函数。
//					  未调用此函数的字符，会进入后面阶段多次解析。
//##############################
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 底层字符 - 样式阶段-配置提交【标准函数】【Game_Temp】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数只在 样式阶段 有效。
//##############################
Game_Temp.prototype.drill_COCD_textBlock_submitStyle = function(){
	this._drill_COCD_textBlock_successStyle = true;
}
//##############################
// * 底层字符 - 样式阶段-回滚样式【标准接口】【Game_Temp】
//			
//			参数：	> cur_infoParam  动态参数对象（只读配置信息）
//					> cur_baseParam  动态参数对象（基础字符配置）
//					> cur_blockParam 动态参数对象（底层单块配置）
//					> cur_rowParam   动态参数对象（底层单行配置）
//			返回：	> 无
//			
//			说明：	> 此函数在 创建单个字符块 后执行，可以确保配置只作用于一个字符块。
//					> 此函数只在样式阶段有用，再处理阶段没用。
//##############################
Game_Temp.prototype.drill_COCD_textBlock_restoreStyle = function( cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 底层字符 - 再处理阶段-配置阶段【标准接口】【Game_Temp】
//			
//			参数：	> command 字符串             （当前的指令）
//					> args 字符串列表            （当前的参数列表）
//					> cur_baseParam  动态参数对象（基础字符配置）
//					> cur_blockParam 动态参数对象（底层单块配置）
//					> cur_rowParam   动态参数对象（底层单行配置）
//			返回：	> 无
//			
//			说明：	> 指令格式固定为 @@@xxx 或 @@@xxx[] 两种格式，且[]内必须为英文冒号。
//					> 参数 cur_baseParam 赋值后，会传输到基础字符的配置中，在相关函数中，能拿出来用。
//					> 参数 cur_blockParam 赋值后，会传输到底层字符的配置中，在相关函数中，能拿出来用。
//					> 如果成功配置，需要调用 配置提交 函数。
//					  未调用此函数的字符，会进入后面阶段多次解析。
//##############################
Game_Temp.prototype.drill_COCD_textBlock_processSecond = function( command, args, cur_baseParam, cur_blockParam, cur_rowParam ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 底层字符 - 再处理阶段-配置提交【标准函数】【Game_Temp】
//			
//			参数：	> text 字符串 （必须提交一个字符）
//			返回：	> 无
//			
//			说明：	> 此函数只在 再处理阶段 有效。
//					> 再处理阶段中，所有 @@@xxx 或 @@@xxx[] 已经被单独成为了字符块，因此需要输入 text 来代替这个字符块。
//					> 必须提交一个字符。
//					  text不能为空字符串，因为空的 字符块 会被排除。
//					  text不能为多个字符，因为后面还会经过 字符拆散 处理，拆散时字符块会被复制多次。
//##############################
Game_Temp.prototype.drill_COCD_textBlock_submitSecond = function( text ){
	this._drill_COCD_textBlock_successSecond = true;
	this._drill_COCD_textBlock_successText = text;
}
//##############################
// * 底层字符 - 统计阶段-统计开始时【标准接口】【Game_Temp】
//			
//			参数：	> rowBlock_list 动态对象列表（需修改的单行块列表）
//					> infoParam  动态参数对象   （只读配置信息）
//			返回：	> 无
//			
//			说明：	> 如果要赋值，直接对单行块的内部对象赋值即可。
//##############################
Game_Temp.prototype.drill_COCD_total_processBeforeTotal = function( rowBlock_list, infoParam ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 底层字符 - 统计阶段-统计结束时【标准接口】【Game_Temp】
//			
//			参数：	> rowBlock_list 动态对象列表（需修改的单行块列表）
//					> infoParam  动态参数对象   （只读配置信息）
//			返回：	> 无
//			
//			说明：	> 如果要赋值，直接对单行块的内部对象赋值即可。
//##############################
Game_Temp.prototype.drill_COCD_total_processAfterTotal = function( rowBlock_list, infoParam ){
	
	//（待子类继承写内容）
	
}
//##############################
// * 底层字符 - 全重置字符【标准函数】【Game_Temp】
//			
//			参数：	> cur_infoParam  动态参数对象（只读配置信息）
//					> cur_baseParam  动态参数对象（基础字符配置）
//					> cur_blockParam 动态参数对象（底层单块配置）
//			返回：	> 无
//			
//			说明：	> 此函数为 全重置字符 @@@-fr 的功能，可被继承。
//##############################
Game_Temp.prototype.drill_COCD_textBlock_fontReset = function( cur_infoParam, cur_baseParam, cur_blockParam ){
	
	// > 『绘制过程定义』 - 全重置字符
	cur_blockParam['posX'] = 0;							//基础字符配置 - 偏移量X
	cur_blockParam['posY'] = 0;							//基础字符配置 - 偏移量Y
	//（不控制）										//基础字符配置 - 额外量X
	//（不控制）										//基础字符配置 - 额外量Y
	
	if( cur_baseParam['fr_textColor']      != undefined ){ cur_baseParam['textColor']      = cur_baseParam['fr_textColor'];      } //基础字符配置 - 颜色（子插件 【窗口字符 - 颜色核心】 自定义扩展该参数，去见模块 重置控制 ）
	if( cur_baseParam['fr_outlineEnabled'] != undefined ){ cur_baseParam['outlineEnabled'] = cur_baseParam['fr_outlineEnabled']; } //基础字符配置 - 描边开关（子插件 【窗口字符 - 描边效果】 自定义扩展该参数，去见模块 重置控制 ）
	if( cur_baseParam['fr_outlineColor']   != undefined ){ cur_baseParam['outlineColor']   = cur_baseParam['fr_outlineColor'];   } //基础字符配置 - 描边颜色（子插件 【窗口字符 - 描边效果】 自定义扩展该参数，去见模块 重置控制 ）
	if( cur_baseParam['fr_outlineWidth']   != undefined ){ cur_baseParam['outlineWidth']   = cur_baseParam['fr_outlineWidth'];   } //基础字符配置 - 描边厚度（子插件 【窗口字符 - 描边效果】 自定义扩展该参数，去见模块 重置控制 ）
	if( cur_baseParam['fr_fontBold']       != undefined ){ cur_baseParam['fontBold']       = cur_baseParam['fr_fontBold'];       } //基础字符配置 - 字体加粗
	if( cur_baseParam['fr_fontItalic']     != undefined ){ cur_baseParam['fontItalic']     = cur_baseParam['fr_fontItalic'];     } //基础字符配置 - 字体倾斜
	if( cur_baseParam['fr_fontSize']       != undefined ){ cur_baseParam['fontSize']       = cur_baseParam['fr_fontSize'];       } //基础字符配置 - 字体大小（子插件 【窗口字符 - 字符大小控制器】 自定义扩展该参数，去见模块 重置控制 ）
	if( cur_baseParam['fr_fontFace']       != undefined ){ cur_baseParam['fontFace']       = cur_baseParam['fr_fontFace'];       } //基础字符配置 - 字体名称（子插件 【窗口字符 - 字体管理器】 自定义扩展该参数，去见模块 重置控制 ）	
	
	// > 全重置字符 - 空值提醒
	if( cur_baseParam['fr_textColor'] == undefined ){
		//（暂不提醒）
		//（只要正常调用了 drill_COCD_initOptions 函数，fr_xxx 就不可能为空）
		//（如果出现了全重置字符失效的情况，记得检查一下是不是自定义绘制流程中，遗漏了这个函数）
	}
}


//=============================================================================
// ** ☆底层字符实现
//
//			说明：	> 此模块提供 底层字符 的绘制与高宽计算。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 底层字符实现 - 绘制单个字符块（私有）
//==============================
Bitmap.prototype.drill_COCD_drawTextBlock_Private = function( textBlock ){
	this.drill_COCD_drawBaseText(
		textBlock.drill_textBlock_getText(),
		textBlock.drill_textBlock_getX(),
		textBlock.drill_textBlock_getY(),
		textBlock.drill_textBlock_getBaseParam()
	);
}
//==============================
// * 底层字符实现 - 绘制单个单行块（私有）
//==============================
Bitmap.prototype.drill_COCD_drawRowBlock_Private = function( rowBlock ){
	
	// > 绘制 字符块列表
	var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
	for( var i = 0; i < textBlock_list.length; i++ ){
		var textBlock = textBlock_list[i];
		this.drill_COCD_drawTextBlock_Private( textBlock );
	}
}
//==============================
// * 底层字符实现 - 解析底层字符（私有）
//==============================
Game_Temp.prototype.drill_COCD_analysisText_Private = function( cur_text, options ){
	if( options['infoParam']  == undefined ){ options['infoParam']  = {}; }	//只读配置信息
	if( options['baseParam']  == undefined ){ options['baseParam']  = {}; }	//基础字符配置
	if( options['blockParam'] == undefined ){ options['blockParam'] = {}; }	//底层单块配置
	if( options['rowParam']   == undefined ){ options['rowParam']   = {}; }	//底层单行配置
	
	// > 解析底层字符 - 切割字符串
	var text_list = this.drill_COCD_splitText( cur_text );
	//alert( text_list.join("|__|") );	//（查看效果）
	
	
	// > 解析底层字符 - 创建字符块列表/样式阶段
	var textBlock_list = this.drill_COCD_createTextBlockList( text_list, options );
	if( textBlock_list.length == 0 ){ return []; }
	//		（完成这一步时，baseParam、blockParam、rowParam 已赋值完毕，没有必要再用了）
	
	// > 解析底层字符 - 二次处理字符块列表/再处理阶段
	this.drill_COCD_setupSecondCheck( textBlock_list );
	//		（完成这一步时，所有 @@@xxx 或 @@@xxx[] 字符解析完毕，若有剩则是没生效的底层字符）
	
	// > 解析底层字符 - 范围盒计算
	this.drill_COCD_setupBoxCalculate( textBlock_list, options['infoParam'] );
	
	
	// > 解析底层字符 - 创建单行块列表/手动换行
	var rowBlock_list = this.drill_COCD_createRowBlockList( textBlock_list );
	if( rowBlock_list.length == 0 ){ return []; }
	
	// > 解析底层字符 - 字符拆散处理
	this.drill_COCD_setupSplitAll( rowBlock_list, options['infoParam'] );
	
	// > 解析底层字符 - 自动换行处理
	this.drill_COCD_setupWordWrap( rowBlock_list, options['infoParam'] );
	
	// > 解析底层字符 - 统计阶段
	this.drill_COCD_setupTotal( rowBlock_list, options['infoParam'] );
	
	// > 解析底层字符 - 位置分配
	this.drill_COCD_setupPositionX( rowBlock_list, options['infoParam'] );
	this.drill_COCD_setupOffsetX( rowBlock_list, options['infoParam'] );
	this.drill_COCD_setupPositionY( rowBlock_list, options['infoParam'] );
	this.drill_COCD_setupOffsetY( rowBlock_list, options['infoParam'] );
	
	return rowBlock_list;
}

//==============================
// * 解析底层字符 - 切割字符串
//			
//			参数：	> cur_text 字符串      （未切的字符串）
//			返回：	> 字符串列表           （已切割的字符串列表）
//			
//			说明：	> 该函数将识别字符块的 @@@xxx 和 @@@xxx[] 格式，切割字符串并形成字符串列表。
//					> 只要符合格式就切。
//==============================
Game_Temp.prototype.drill_COCD_splitText = function( cur_text ){
	var result_list = [];			//结果列表
	var search_pos = 0;				//字符串索引位置（每次寻找下一个"["）
	var step_pos = 0;				//字符串索引位置（找成功时记录位置，找失败时不操作）
	var re = /[0-9a-zA-Z_\-]/;
	
	// > 开始搜索（固定执行次数）
	for( var n = 0; n < cur_text.length; n++ ){
		var cur_index = cur_text.indexOf("@@@", search_pos);
		
		// > 搜索到末尾时
		if( cur_index == -1 ){
			
			// > 最后一个字符串
			var result_str = cur_text.substring( step_pos );
			if( result_str != "" ){
				result_list.push( result_str );
			}
			break;
		}
		
		// > @@@xxx指令 - 固定6个字符（@@@xxx格式）
		var ch1 = cur_text.charAt( cur_index + 3 );
		var ch2 = cur_text.charAt( cur_index + 4 );
		var ch3 = cur_text.charAt( cur_index + 5 );
		if( re.test(ch1) == false ){	//（如果后面三个不是 字母/数字/下划线/横杠，则跳出，重新搜索）
			search_pos = cur_index +1;		//search_pos += 1;
			continue;
		}
		if( re.test(ch2) == false ){
			search_pos = cur_index +1;		//search_pos += 1;
			continue;
		}
		if( re.test(ch3) == false ){
			search_pos = cur_index +1;		//search_pos += 1;
			continue;
		}
		var cur_endIndex = cur_index + 6;
		
		// > @@@xxx指令 - 前面的字符串
		var result_str = cur_text.substring( step_pos, cur_index );
		if( result_str != "" ){
			result_list.push( result_str );
		}
		
		// > @@@xxx指令 - 后面还有[]时（@@@xxx[]格式）
		var ch = cur_text.charAt( cur_endIndex );
		if( ch == "[" ){
			var temp_index = this.drill_COCD_getRightBracketPos( cur_text, cur_endIndex, "[" );
			if( temp_index != -1 ){
				cur_endIndex = temp_index +1;
			}
		}
		
		// > @@@xxx指令 - 指令字符串
		var result_str = cur_text.substring( cur_index, cur_endIndex );
		if( result_str != "" ){
			result_list.push( result_str );
		}
		
		search_pos = cur_endIndex;
		step_pos = cur_endIndex;
	}
	return result_list;
}
//==============================
// * 解析底层字符 - 切割字符串 - 找到括号闭包位置（最大闭包）
//			
//			参数：	> text 字符串         （任意字符串）
//					> left_pos 数字       （左括号的位置）
//					> left_char 字符串    （左括号字符）
//			返回：	> 数字                （右括号的位置）
//
//			说明：	> 返回的是 "]" 的位置，截取字符串时注意 位置+1 把"]"字符捕获。
//					> 最大闭包，能识别 "[[]]" 多层嵌套，但必须左括号右括号数量相等。
//==============================
Game_Temp.prototype.drill_COCD_getRightBracketPos = function( text, left_pos, left_char ){
	if( text.charAt(left_pos) != left_char ){ return -1; }	//（该位置必须是左括号，否则跳出）
	var right_char = "";
	if( left_char == "(" ){ right_char = ")"; }
	if( left_char == "[" ){ right_char = "]"; }
	if( left_char == "{" ){ right_char = "}"; }
	if( left_char == "<" ){ right_char = ">"; }
	if( right_char == "" ){ return -1; }
	
	// > 开始搜索
	var right_count = 0;
	var search_pos = left_pos;
	for( var k = 0; k < text.length; k++ ){
		
		// > 找到一个 右扩号
		var cur_rightPos = text.indexOf(right_char, search_pos);
		if( cur_rightPos == -1 ){ return -1; }
		right_count += 1;
		
		// > 将 "[???]" 扩号之间的字符串圈起来
		var temp_text = text.substring( left_pos, cur_rightPos +1 );
		
		// > 统计 左括号 数量
		var left_count = this.drill_COCD_getCharCount( temp_text, left_char );
		if( left_count < right_count ){			//异常情况，跳出
			return -1;
			
		}else if( left_count == right_count ){	//有一个，闭合
			return cur_rightPos;
			
		}else{									//左括号 比 右括号 数量多，继续找
			search_pos = cur_rightPos +1;
		}
	}
	
	return -1;
};
//==============================
// * 解析底层字符 - 切割字符串 - 找到括号闭包位置（最小闭包）
//			
//			参数：	> text 字符串         （任意字符串）
//					> left_pos 数字       （左括号的位置）
//					> left_char 字符串    （左括号字符）
//			返回：	> 数字                （右括号的位置）
//
//			说明：	> 返回的是 "]" 的位置，截取字符串时注意 位置+1 把"]"字符捕获。
//					> 最小闭包，只识别 "[]" 单层嵌套，只要出现第二个左括号则立即返回-1。
//==============================
Game_Temp.prototype.drill_COCD_getMinRightBracketPos = function( text, left_pos, left_char ){
	if( text.charAt(left_pos) != left_char ){ return -1; }	//（该位置必须是左括号，否则跳出）
	var right_char = "";
	if( left_char == "(" ){ right_char = ")"; }
	if( left_char == "[" ){ right_char = "]"; }
	if( left_char == "{" ){ right_char = "}"; }
	if( left_char == "<" ){ right_char = ">"; }
	if( right_char == "" ){ return -1; }
	
	// > 找到一个 右扩号
	var cur_rightPos = text.indexOf(right_char, left_pos);
	if( cur_rightPos == -1 ){ return -1; }
	
	// > 将 "[???]" 扩号之间的字符串圈起来
	var temp_text = text.substring( left_pos, cur_rightPos +1 );
	
	// > 统计 左括号 数量
	var left_count = this.drill_COCD_getCharCount( temp_text, left_char );
	if( left_count == 1 ){		//只能有一个左括号，闭合
		return cur_rightPos;
	}else{						//其它情况，跳出
		return -1;
	}
};
//==============================
// * 解析底层字符 - 切割字符串 - 获取字符数量
//			
//			参数：	> text 字符串  （任意字符串）
//			返回：	> 数字         （数量）
//==============================
Game_Temp.prototype.drill_COCD_getCharCount = function( text, tar_char ){
	var result_count = 0;
	for(var i = 0; i < text.length; i++ ){
		var ch = text.charAt(i);
		if( ch == tar_char ){
			result_count += 1;
		}
	}
	return result_count;
};

//==============================
// * 解析底层字符 - 创建字符块列表/样式阶段
//			
//			参数：	> text_list 字符串列表 （已切割的字符串列表）
//					> options 动态参数对象 （配置）
//			返回：	> 对象列表             （字符块列表）
//			
//			说明：	> 该函数将 已切割的字符串列表，转成 字符块+配置 。
//==============================
Game_Temp.prototype.drill_COCD_createTextBlockList = function( text_list, options ){
	var result_list = [];
	
	// > 开始创建
	for(var i = 0; i < text_list.length; i++ ){
		var temp_text = text_list[i];
		
		// > 校验是否为指令
		var is_command = false;
		if( temp_text.substring(0,3) == "@@@" ){
			if( temp_text.length == 6 ){							//（@@@xxx格式）
				is_command = true;
			}
			if( temp_text.charAt( temp_text.length-1 ) == "]" ){	//（@@@xxx[]格式）
				is_command = true;
			}
		}
		
		// > 校验是否为指令 - 测试
		//alert( temp_text + (is_command ? " = true" : " = false") );
		
		
		// > 普通文本时
		if( is_command == false ){
			
			// > 普通文本时 - 创建单个字符块
			var temp_block = this.drill_COCD_createOneTextBlock( temp_text, options['baseParam'], options['blockParam'], options['rowParam'] );
			if( temp_block != null ){
				result_list.push( temp_block );
			}
			
			// > 普通文本时 - 回滚样式
			this.drill_COCD_textBlock_restoreStyle( options['infoParam'], options['baseParam'], options['blockParam'], options['rowParam'] );
		}
		
		// > 指令时
		if( is_command == true ){
			var command = temp_text.substring(0,6);
			var args = [];
			if( temp_text.length > 6 ){
				var args_str = temp_text.substring( 6+1, temp_text.length-1 );
				args = args_str.split(":");	//（固定只能用英文冒号）
			}
			
			// > 样式阶段
			//		（此处的 baseParam、blockParam、rowParam 全部传的是指针）
			//		（每个字符配置了任意参数，都会不断传递给后面更多的字符）
			this._drill_COCD_textBlock_successStyle = false;
			this.drill_COCD_textBlock_processStyle( command, args, options['infoParam'], options['baseParam'], options['blockParam'], options['rowParam'] );
			
			// > 样式阶段 - 通过时
			if( this._drill_COCD_textBlock_successStyle == true ){
				//（不操作）
				
			// > 样式阶段 - 未通过时
			}else{
				
				// > 普通文本时 - 创建单个字符块（未通过时，就作为普通文本添加）
				var temp_block = this.drill_COCD_createOneTextBlock( temp_text, options['baseParam'], options['blockParam'], options['rowParam'] );
				if( temp_block != null ){
					result_list.push( temp_block );
				}
				
				// > 普通文本时 - 回滚样式
				this.drill_COCD_textBlock_restoreStyle( options['infoParam'], options['baseParam'], options['blockParam'], options['rowParam'] );
			}
		}
	}
	
	return result_list;
}
//==============================
// * 解析底层字符 - 创建字符块列表/样式阶段 - 创建单个字符块
//
//			说明：	> 该函数创建并初始化 单个字符块。
//					> 注意，传入的参数为指针，初始化时需要执行深拷贝。
//==============================
Game_Temp.prototype.drill_COCD_createOneTextBlock = function( cur_text, baseParam, blockParam, rowParam ){
	if( cur_text == undefined ){ return null; }
	if( cur_text == "" ){ return null; }
	
	var temp_block = new Drill_COCD_TextBlock();
	temp_block.drill_textBlock_setTextAndParam( cur_text, baseParam, blockParam );	//（设置文本和配置）
	temp_block.drill_textBlock_setRowParam( rowParam );								//（设置单行配置）
	return temp_block;
}

//==============================
// * 解析底层字符 - 二次处理字符块列表/再处理阶段
//			
//			参数：	> textBlock_list 对象列表 （字符块列表）
//			返回：	> 无
//
//			说明：	> 将前面未完成处理的 @@@xxx 字符进行 再处理阶段 的处理。
//==============================
Game_Temp.prototype.drill_COCD_setupSecondCheck = function( textBlock_list ){
	for(var i = 0; i < textBlock_list.length; i++ ){
		var textBlock = textBlock_list[i];
		var temp_text = textBlock.drill_textBlock_getText();
		
		// > 校验是否为指令
		var is_command = false;
		if( temp_text.substring(0,3) == "@@@" ){
			if( temp_text.length == 6 ){							//（@@@xxx格式）
				is_command = true;
			}
			if( temp_text.charAt( temp_text.length-1 ) == "]" ){	//（@@@xxx[]格式）
				is_command = true;
			}
		}
		
		// > 指令时
		if( is_command == true ){
			var command = temp_text.substring(0,6);
			var args = [];
			if( temp_text.length > 6 ){
				var args_str = temp_text.substring( 6+1, temp_text.length-1 );
				args = args_str.split(":");	//（固定只能用英文冒号）
			}
			
			// > 再处理阶段
			//		（此处的 baseParam、blockParam、rowParam 全部传的是指针）
			//		（这里每个字符的配置都已经深拷贝，修改参数后，不再传递给后面的字符）
			this._drill_COCD_textBlock_successSecond = false;
			this._drill_COCD_textBlock_successText = "";
			this.drill_COCD_textBlock_processSecond( command, args, textBlock.drill_textBlock_getBaseParam(), textBlock.drill_textBlock_getBlockParam(), textBlock.drill_textBlock_getRowParam() );
			
			// > 再处理阶段 - 通过时
			if( this._drill_COCD_textBlock_successSecond == true ){
				textBlock.drill_textBlock_setText( this._drill_COCD_textBlock_successText );
				//（字符块只留一个字符）（此处只能有一个字符，不能为空，也不能多字符）
				
			// > 再处理阶段 - 未通过时
			}else{
				//（不操作）
			}
		}
	}
}
//==============================
// * 解析底层字符 - 范围盒计算
//			
//			参数：	> textBlock_list 对象列表 （字符块列表）
//					> infoParam 动态参数对象  （配置）
//			返回：	> 无
//			
//			说明：	> 该函数进行范围盒计算。
//==============================
Game_Temp.prototype.drill_COCD_setupBoxCalculate = function( textBlock_list, infoParam ){
	
	// > 直接取 最后一个字符块 的参数设置
	var textBlock = textBlock_list[ textBlock_list.length -1 ];
	var blockParam = textBlock.drill_textBlock_getBlockParam();
	
	// > 范围盒 - 初始化
	var box_x = 0;
	var box_y = 0;
	var box_width = 0;
	var box_height = 0;
	if( infoParam['x'] != undefined ){ box_x = infoParam['x']; }
	if( infoParam['y'] != undefined ){ box_y = infoParam['y']; }
	if( infoParam['canvasWidth']  != undefined ){ box_width  = infoParam['canvasWidth'];  }
	if( infoParam['canvasHeight'] != undefined ){ box_height = infoParam['canvasHeight']; }
	
	// > 范围盒 - 去掉初始偏移量
	box_width  -= box_x;
	box_height -= box_y;
	
	// > 范围盒 - 边界设置
	if( blockParam['paddingLeft'] != undefined ){	//『绘制过程定义』 - 内边距 - 左
		box_x += blockParam['paddingLeft'];
		box_width -= blockParam['paddingLeft'];
	}
	if( blockParam['paddingRight'] != undefined ){	//『绘制过程定义』 - 内边距 - 右
		box_width -= blockParam['paddingRight'];
	}
	if( blockParam['paddingTop'] != undefined ){	//『绘制过程定义』 - 内边距 - 上
		box_y += blockParam['paddingTop'];
		box_height -= blockParam['paddingTop'];
	}
	if( blockParam['paddingBottom'] != undefined ){	//『绘制过程定义』 - 内边距 - 下
		box_height -= blockParam['paddingBottom'];
	}
	
	// > 范围盒 - 赋值
	infoParam['box_x'] = box_x;
	infoParam['box_y'] = box_y;
	infoParam['box_width']  = box_width;
	infoParam['box_height'] = box_height;
}

//==============================
// * 解析底层字符 - 创建单行块列表/手动换行
//			
//			参数：	> textBlock_list 对象列表 （字符块列表）
//			返回：	> 对象列表                （单行块列表）
//			
//			说明：	> 该函数将 字符块 存入 单行块 中。
//					> 包含 手动换行 的处理。
//==============================
Game_Temp.prototype.drill_COCD_createRowBlockList = function( textBlock_list ){
	if( textBlock_list.length == 0 ){ return []; }
	var result_list = [];
	
	// > 找到 自动换行标记
	var need_wordWrap = false;
	for(var i = 0; i < textBlock_list.length; i++ ){
		var textBlock = textBlock_list[i];
		var blockParam = textBlock.drill_textBlock_getBlockParam();
		if( blockParam['wordWrap'] == true ){
			need_wordWrap = true;
			break;
		}
	}
	
	// > 创建单行块
	var cur_rowBlock = this.drill_COCD_createOneRowBlock();
	for(var i = 0; i < textBlock_list.length; i++ ){
		var textBlock = textBlock_list[i];
		var blockParam = textBlock.drill_textBlock_getBlockParam();
		
		// > 『绘制过程定义』 - 常规换行时（@@@-or）（自动换行情况下，此换行设置失效）
		if( blockParam['originalRow'] >= 1 && need_wordWrap == false ){
			for(var j = 0; j < blockParam['originalRow']; j++ ){	//（要考虑多个空行情况）
				
				// > 存入单行块
				result_list.push( cur_rowBlock );
				
				// > 创建单行块
				cur_rowBlock = this.drill_COCD_createOneRowBlock();
			}
		}
		
		// > 『绘制过程定义』 - 手动换行时（@@@-br）
		if( blockParam['breakRow'] >= 1 ){
			for(var j = 0; j < blockParam['breakRow']; j++ ){		//（要考虑多个空行情况）
				
				// > 存入单行块
				result_list.push( cur_rowBlock );
				
				// > 创建单行块
				cur_rowBlock = this.drill_COCD_createOneRowBlock();
			}
		}
		
		cur_rowBlock.drill_rowBlock_addTextBlock( textBlock );	//（添加字符块）
	}
	// > 存入单行块
	result_list.push( cur_rowBlock );
	
	
	// > 单行块赋值 - 单行配置
	//		（注意，空行的单行配置没有任何参数）
	for(var i = 0; i < result_list.length; i++ ){
		var rowBlock = result_list[i];
		rowBlock.drill_rowBlock_refreshRowParam();	//（刷新单行配置）
	}
	
	
	// > 单行块赋值 - 默认字符高度
	//		（单行块如果是空行，那么其高度肯定是0，所以需要根据前一行的最大字符高度来算）
	//		（如果第一个单行块就是空行，那么按照第一个 字符块 的高度来算）
	var textBlock = textBlock_list[0];
	var cur_height = textBlock.drill_textBlock_getHeight();
	
	for(var i = 0; i < result_list.length; i++ ){
		var rowBlock = result_list[i];
		var height = rowBlock.drill_rowBlock_getMaxCharacterHeight();
		if( height > 0 ){ cur_height = height; }
		rowBlock.drill_rowBlock_setMaxCharacterSpecialHeight( cur_height );	//（设置默认字符高度）
	}
	
	return result_list;
}
//==============================
// * 解析底层字符 - 创建单行块列表/手动换行 - 创建单个单行块
//
//			说明：	> 该函数创建并初始化 单个单行块。
//==============================
Game_Temp.prototype.drill_COCD_createOneRowBlock = function(){
	var rowBlock = new Drill_COCD_RowBlock();
	return rowBlock;
}
	
//==============================
// * 解析底层字符 - 字符拆散处理
//			
//			参数：	> rowBlock_list 对象列表  （单行块列表）
//					> infoParam 动态参数对象  （配置）
//			返回：	> 无
//			
//			说明：	> 该函数专门执行 字符拆散处理，可能会增加字符块的对象数量。
//==============================
Game_Temp.prototype.drill_COCD_setupSplitAll = function( rowBlock_list, infoParam ){
	
	// > 找到配置
	var need_splitRow = [];			//（要拆散的行）
	var need_splitAll = false;		//（是否全部拆散）
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for( var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var blockParam = textBlock.drill_textBlock_getBlockParam();
			
			// > 『绘制过程定义』 - 字符拆散-当前行（@@@-sr）
			if( blockParam['splitRow'] == true ){
				if( need_splitRow.contains(i) == false ){
					need_splitRow.push(i);
				}
			}
			
			// > 『绘制过程定义』 - 字符拆散-全部（@@@-sa）
			if( blockParam['splitAll'] == true ){
				need_splitAll = true;
				break;
			}
		}
		if( need_splitAll == true ){
			break;
		}
	}
	if( need_splitAll == true ){	//（全部拆散时，填满要拆散的行）
		need_splitRow = [];
		for(var i = 0; i < rowBlock_list.length; i++ ){
			need_splitRow.push(i);
		}
	}
	
	// > 遍历拆散
	if( need_splitRow.length > 0 ){
		var cur_row_list = [];		//（重组的单行块）
		for(var i = 0; i < rowBlock_list.length; i++ ){
			var rowBlock = rowBlock_list[i];
			
			// > 不需要拆散时
			if( need_splitRow.contains(i) == false ){
				cur_row_list.push( rowBlock );
				
			// > 需要拆散时
			}else{
				var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
				
				// > 清除 单行块 下的 字符块
				rowBlock.drill_rowBlock_clearTextBlock();
				
				// > 遍历 字符块列表
				for( var j = 0; j < textBlock_list.length; j++ ){
					var textBlock = textBlock_list[j];
					var text = textBlock.drill_textBlock_getText();
					for( var k = 0; k < text.length; k++ ){
						var ch = text.charAt(k);
						
						// > 依次添加 字符块
						var new_block = this.drill_COCD_createCopyedTextBlock( textBlock );
						new_block.drill_textBlock_setText( ch );
						if( k >= 1 ){	//（已拆散字符的配置）
							new_block.drill_textBlock_copySetupInSplit();
						}
						rowBlock.drill_rowBlock_addTextBlock( new_block );
					}
				}
				cur_row_list.push( rowBlock );
			}
		}
		
		// > 重新赋值（根据 重组的单行块）
		rowBlock_list.length = 0;
		for(var i = 0; i < cur_row_list.length; i++ ){
			var rowBlock = cur_row_list[i];
			rowBlock_list.push( rowBlock );
		}
	}
}
//==============================
// * 解析底层字符 - 字符拆散处理 - 复制字符块
//			
//			参数：	> textBlock 对象  （被复制的字符块）
//			返回：	> 无
//==============================
Game_Temp.prototype.drill_COCD_createCopyedTextBlock = function( textBlock ){
	var new_textBlock = new Drill_COCD_TextBlock();
	new_textBlock.drill_textBlock_copyFrom( textBlock );
	return new_textBlock;
}
	
//==============================
// * 解析底层字符 - 自动换行处理
//			
//			参数：	> rowBlock_list 对象列表  （单行块列表）
//					> infoParam 动态参数对象  （配置）
//			返回：	> 无
//			
//			说明：	> 该函数专门执行 自动换行处理，可能会增加参数 rowBlock_list 的对象数量。
//==============================
Game_Temp.prototype.drill_COCD_setupWordWrap = function( rowBlock_list, infoParam ){
	
	// > 找到 自动换行标记
	var need_wordWrap = false;
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for( var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var blockParam = textBlock.drill_textBlock_getBlockParam();
			if( blockParam['wordWrap'] == true ){	//『绘制过程定义』 - 自动换行标记（@@@-ws）
				need_wordWrap = true;
				break;
			}
		}
		if( need_wordWrap == true ){
			break;
		}
	}
	// > 找到 自动换行最大宽度
	if( need_wordWrap == true ){
		var has_width = false;
		var max_width = infoParam['box_width'];
		for(var i = 0; i < rowBlock_list.length; i++ ){
			var rowBlock = rowBlock_list[i];
			var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
			for( var j = 0; j < textBlock_list.length; j++ ){
				var textBlock = textBlock_list[j];
				var blockParam = textBlock.drill_textBlock_getBlockParam();
				if( blockParam['wordWrap_maxWidth'] != undefined ){	//（只要有一个字符块配置了宽度，则所有自动换行都根据此宽度计算）
					max_width = blockParam['wordWrap_maxWidth'];
					has_width = true;
					break;
				}
			}
			if( has_width == true ){
				break;
			}
		}
	}
	
	// > 自动换行处理
	if( need_wordWrap == true ){
		var cur_row_list = [];
		
		for(var i = 0; i < rowBlock_list.length; i++ ){
			var rowBlock = rowBlock_list[i];
			var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
			
			var cur_width = 0;			//当前 宽度
			var cur_block_list = [];	//当前 字符块列表
			
			// > 空行情况
			if( textBlock_list.length == 0 ){
				cur_row_list.push( rowBlock );
				continue;
			}
			
			// > 遍历 单行块 下的 字符块
			for( var j = 0; j < textBlock_list.length; j++ ){
				var textBlock = textBlock_list[j];
				var blockParam = textBlock.drill_textBlock_getBlockParam();
				
				// > 折行判定 - 宽度满了
				cur_width += textBlock.drill_textBlock_getWidth();
				if( cur_width > max_width ){
					var new_row = this.drill_COCD_createCopyedRowBlock( rowBlock );
					new_row.drill_rowBlock_clearTextBlock();
					new_row.drill_rowBlock_addTextBlockList( cur_block_list );
					cur_row_list.push( new_row );
					
					cur_width = 0;
					cur_width += textBlock.drill_textBlock_getWidth();
					cur_block_list = [];
					cur_block_list.push( textBlock );
					continue;
					
				// > 折行判定 - 宽度没满
				}else{
					cur_block_list.push( textBlock );
				}
			}
			
			// > 折行判定 - 当前行结束了
			if( cur_block_list.length > 0 ){
				var new_row = this.drill_COCD_createCopyedRowBlock( rowBlock );
				new_row.drill_rowBlock_clearTextBlock();
				new_row.drill_rowBlock_addTextBlockList( cur_block_list );
				cur_row_list.push( new_row );
				
				cur_width = 0;
				cur_block_list = [];
			}
		}
		
		// > 重新赋值
		rowBlock_list.length = 0;
		for(var i = 0; i < cur_row_list.length; i++ ){
			var rowBlock = cur_row_list[i];
			rowBlock_list.push( rowBlock );
		}
	}
}
//==============================
// * 解析底层字符 - 自动换行处理 - 复制单行块
//			
//			参数：	> rowBlock 对象  （被复制的单行块）
//			返回：	> 无
//==============================
Game_Temp.prototype.drill_COCD_createCopyedRowBlock = function( rowBlock ){
	var new_row = new Drill_COCD_RowBlock();
	new_row.drill_rowBlock_copyFrom( rowBlock );
	return new_row;
}

//==============================
// * 解析底层字符 - 统计阶段
//==============================
Game_Temp.prototype.drill_COCD_setupTotal = function( rowBlock_list, infoParam ){
	
	// > 统计阶段 - 统计开始时
	this.drill_COCD_total_processBeforeTotal( rowBlock_list, infoParam );
	
	// > 统计阶段 - 执行统计
	this.drill_COCD_total_processTotal( rowBlock_list, infoParam );
	
	// > 统计阶段 - 统计结束时
	this.drill_COCD_total_processAfterTotal( rowBlock_list, infoParam );
}
//==============================
// * 解析底层字符 - 统计阶段 - 执行统计
//==============================
Game_Temp.prototype.drill_COCD_total_processTotal = function( rowBlock_list, infoParam ){
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		
		// > 开始统计
		var row_text_all = "";		//当前行的文本
		var row_text_count = 0;		//当前行的字数（包含空格）
		
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for(var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var text = textBlock.drill_textBlock_getText();
			row_text_all += text;
			row_text_count += text.length;
		}
		
		// > 统计信息存放
		//		（此处直接修改的是指针，所以直接赋值即可）
		var rowParam = rowBlock.drill_rowBlock_getRowParam();
		rowParam['total_rowNum'] = i+1;						//行编号
		rowParam['total_rowText'] = row_text_all;			//行全部文本
		rowParam['total_rowCharCount'] = row_text_count;	//行全部文本字数
	}
}
	
//==============================
// * 解析底层字符 - 位置X分配
//			
//			参数：	> rowBlock_list 对象列表  （单行块列表）
//					> infoParam 动态参数对象  （配置）
//			返回：	> 无
//			
//			说明：	> 该函数将对字符块进行位置分配。
//					> 此处只按 横向左对齐 分配位置，扩展的位置分配见函数 drill_COCD_addPositionX 。
//==============================
Game_Temp.prototype.drill_COCD_setupPositionX = function( rowBlock_list, infoParam ){
	
	// > 设置行起始位置X
	var cur_x = infoParam['box_x'];
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		rowBlock.drill_rowBlock_setRowStartX( cur_x );
	}
	
	// > 位置X分配
	var cur_x = 0;
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		
		// > 每行的X位置
		cur_x = infoParam['box_x'];
		
		// > 位置X分配
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for(var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			textBlock.drill_textBlock_setX( cur_x );
			
			// > 宽度累加
			cur_x += textBlock.drill_textBlock_getWidth();
		}
	}
}
//==============================
// * 解析底层字符 - 位置X叠加
//			
//			参数：	> rowBlock_list 对象列表  （单行块列表）
//					> infoParam 动态参数对象  （配置）
//			返回：	> 无
//==============================
Game_Temp.prototype.drill_COCD_setupOffsetX = function( rowBlock_list, infoParam ){
	
	// > 位置X叠加
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for(var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var blockParam = textBlock.drill_textBlock_getBlockParam();
			var cur_x = textBlock.drill_textBlock_getX();
			
			cur_x += blockParam['posX'];	//『绘制过程定义』 - 偏移量X
			cur_x += blockParam['offsetX'];	//『绘制过程定义』 - 额外量X
			
			textBlock.drill_textBlock_setX( cur_x );
		}
	}
}
//==============================
// * 解析底层字符 - 位置Y分配
//			
//			参数：	> rowBlock_list 对象列表  （单行块列表）
//					> infoParam 动态参数对象  （配置）
//			返回：	> 无
//			
//			说明：	> 该函数将对字符块进行位置分配。
//					> 此处只按 纵向顶部对齐 分配位置，扩展的位置分配见函数 drill_COCD_addPositionY 。
//==============================
Game_Temp.prototype.drill_COCD_setupPositionY = function( rowBlock_list, infoParam ){
	
	// > 设置行起始位置Y
	var cur_y = infoParam['box_y'];
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		cur_y += rowBlock.drill_rowBlock_getRowHeight();
		rowBlock.drill_rowBlock_setRowStartY( cur_y );
	}
	
	// > 位置Y分配
	var cur_y = infoParam['box_y'];	//（重新赋值）
	var last_downHeight = 0;		//（前一行的行下增高）
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var rowParam = rowBlock.drill_rowBlock_getRowParam();
		var charHeight = rowBlock.drill_rowBlock_getMaxCharacterHeight();
		
		// > 行上增高
		var lineHeight_up = 0;
		if( rowParam['lineHeight_up'] != undefined &&
			rowParam['lineHeight_up'] > 0 ){
			lineHeight_up = rowParam['lineHeight_up'];
		}
		if( rowParam['lineHeight_upOnce'] != undefined &&
			rowParam['lineHeight_upOnce'] > 0 ){
			lineHeight_up = rowParam['lineHeight_upOnce'];
		}
		
		// > 行下增高
		var lineHeight_down = 0;
		if( rowParam['lineHeight_down'] != undefined &&
			rowParam['lineHeight_down'] > 0 ){
			lineHeight_down = rowParam['lineHeight_down'];
		}
		if( rowParam['lineHeight_downOnce'] != undefined &&
			rowParam['lineHeight_downOnce'] > 0 ){
			lineHeight_down = rowParam['lineHeight_downOnce'];
		}
		
		// > 锁定行高
		var lineHeight_lock = 0;
		if( rowParam['lineHeight_lock'] != undefined &&
			rowParam['lineHeight_lock'] > 0 ){
			lineHeight_lock = rowParam['lineHeight_lock'];
		}
		if( rowParam['lineHeight_lockOnce'] != undefined &&
			rowParam['lineHeight_lockOnce'] > 0 ){
			lineHeight_lock = rowParam['lineHeight_lockOnce'];
		}
	
		// > 行上补正
		var lineHeight_upCorrection = 0;
		if( rowParam['lineHeight_upCorrection'] != undefined &&
			rowParam['lineHeight_upCorrection'] > 0 ){
			lineHeight_upCorrection = rowParam['lineHeight_upCorrection'];
		}
		if( rowParam['lineHeight_upCorrectionOnce'] != undefined &&
			rowParam['lineHeight_upCorrectionOnce'] > 0 ){
			lineHeight_upCorrection = rowParam['lineHeight_upCorrectionOnce'];
		}
		if( lineHeight_upCorrection > charHeight ){
			var up_correction = lineHeight_upCorrection - charHeight;
			if( lineHeight_up < up_correction ){
				lineHeight_up = up_correction;
			}
		}
		
		
		// > 行高控制 - 锁定行高
		if( lineHeight_lock > 0 ){
			
			// > 锁定的高度
			cur_y += lineHeight_lock;
			
			
		// > 行高控制 - 常规情况
		}else{
			
			// > 前一行的行下增高
			cur_y += last_downHeight;
			
			// > 行上增高
			cur_y += lineHeight_up;
			
			// > 最大字符高度
			cur_y += charHeight;
			
			// > 行下增高
			last_downHeight = lineHeight_down;
		}
		
		
		// > 位置Y分配
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for(var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			textBlock.drill_textBlock_setY( cur_y );
		}
	}
}
//==============================
// * 解析底层字符 - 位置Y叠加
//			
//			参数：	> rowBlock_list 对象列表  （单行块列表）
//					> infoParam 动态参数对象  （配置）
//			返回：	> 无
//==============================
Game_Temp.prototype.drill_COCD_setupOffsetY = function( rowBlock_list, infoParam ){
	
	// > 位置Y叠加
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for(var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var blockParam = textBlock.drill_textBlock_getBlockParam();
			var cur_y = textBlock.drill_textBlock_getY();
			
			cur_y += blockParam['posY'];	//『绘制过程定义』 - 偏移量Y
			cur_y += blockParam['offsetY'];	//『绘制过程定义』 - 额外量Y
			
			textBlock.drill_textBlock_setY( cur_y );
		}
	}
}


//=============================================================================
// ** 底层字符 字符块【Drill_COCD_TextBlock】
// **		
// **		作用域：	战斗界面、地图界面、菜单界面
// **		主功能：	定义一个字符块的数据类。
// **		子功能：	
// **					->无帧刷新
// **					->被动赋值
// **						> 文本
// **						> 基础字符配置
// **						> 底层单块配置
// **						> 底层单行配置
// **						> 块宽度
// **						> 块高度
// **						> 位置X
// **						> 位置Y
// **		
// **		说明：	> 该类没有帧刷新，只能通过函数被动赋值。
// **				> 该类存储的数据量非常庞大，临时使用，不要存储。
//=============================================================================
//==============================
// * 字符块 - 定义
//==============================
function Drill_COCD_TextBlock(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 字符块 - 初始化
//==============================
Drill_COCD_TextBlock.prototype.initialize = function(){
    this.drill_textBlock_initData();		//私有数据初始化
};
//##############################
// * 字符块 - 设置文本和配置【开放函数】
//			
//			参数：	> text 字符串
//					> baseParam  动态参数对象
//					> blockParam 动态参数对象
//			返回：	> 无
//			
//			说明：	> 该函数执行后，能得到 块宽度 和 块高度 。
//					> 若任何一个参数发生了变化，那么 块宽度 和 块高度 会重新计算。
//##############################
Drill_COCD_TextBlock.prototype.drill_textBlock_setTextAndParam = function( text, baseParam, blockParam ){
	
	// > 基础字符配置
	$gameTemp.drill_COCD_drawBaseText_initParam( baseParam );				//（初始化）
	this._drill_tb_baseParam = JSON.parse(JSON.stringify( baseParam ));		//（深拷贝）
	
	// > 底层单块配置
	this._drill_tb_blockParam = JSON.parse(JSON.stringify( blockParam ));	//（深拷贝）
	
	// > 设置文本
	this.drill_textBlock_setText( text );
};
//##############################
// * 字符块 - 设置文本【开放函数】
//			
//			参数：	> text 字符串
//			返回：	> 无
//			
//			说明：	> 只设置文本。该函数执行后，块宽度 和 块高度 会重新计算。
//##############################
Drill_COCD_TextBlock.prototype.drill_textBlock_setText = function( text ){
	
	// > 文本
	this._drill_tb_text = text;
	
	// > 刷新高宽值
	this.drill_textBlock_refreshWidthAndHeight();
};
//##############################
// * 字符块 - 刷新高宽值【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 只设置文本。该函数执行后，块宽度 和 块高度 会重新计算。
//##############################
Drill_COCD_TextBlock.prototype.drill_textBlock_refreshWidthAndHeight = function(){
	this._drill_tb_width  = $gameTemp.drill_COCD_measureBaseTextWidth(  this._drill_tb_text, this._drill_tb_baseParam );
	this._drill_tb_height = $gameTemp.drill_COCD_measureBaseTextHeight( this._drill_tb_text, this._drill_tb_baseParam );
};
//##############################
// * 字符块 - 设置单行配置【开放函数】
//			
//			参数：	> rowParam 动态参数对象
//			返回：	> 无
//			
//			说明：	> 存储在字符块中的单行配置，单行块会对此配置进行遍历收集。
//##############################
Drill_COCD_TextBlock.prototype.drill_textBlock_setRowParam = function( rowParam ){
	this._drill_tb_rowParam = JSON.parse(JSON.stringify( rowParam ));		//（深拷贝）
};
//##############################
// * 字符块 - 设置位置X【开放函数】
//			
//			参数：	> x 数字
//			返回：	> 无
//##############################
Drill_COCD_TextBlock.prototype.drill_textBlock_setX = function( x ){
	this._drill_tb_x = x;
};
//##############################
// * 字符块 - 设置位置Y【开放函数】
//			
//			参数：	> y 数字
//			返回：	> 无
//##############################
Drill_COCD_TextBlock.prototype.drill_textBlock_setY = function( y ){
	this._drill_tb_y = y;
};
//==============================
// * 字符块 - 私有数据初始化
//==============================
Drill_COCD_TextBlock.prototype.drill_textBlock_initData = function(){
	
	// > 阶段 - 创建字符块列表
	this._drill_tb_text = "";				//字符块 - 文本
	this._drill_tb_baseParam = {};			//字符块 - 基础字符配置
	this._drill_tb_blockParam = {};			//字符块 - 底层单块配置
	this._drill_tb_rowParam = {};			//字符块 - 底层单行配置
	this._drill_tb_width = 0;				//字符块 - 块宽度
	this._drill_tb_height = 0;				//字符块 - 块高度
	
	// > 阶段 - 位置分配
	this._drill_tb_x = 0;					//字符块 - 位置X
	this._drill_tb_y = 0;					//字符块 - 位置Y
};
//==============================
// * 字符块 - 复制数据
//
//			说明：	> 该函数目前只被 拆散字符 的功能使用到了。
//==============================
Drill_COCD_TextBlock.prototype.drill_textBlock_copyFrom = function( textBlock ){
	
	// > 阶段 - 创建字符块列表
	this._drill_tb_text = textBlock._drill_tb_text;
	this._drill_tb_baseParam  = JSON.parse(JSON.stringify( textBlock._drill_tb_baseParam ));		//（深拷贝）
	this._drill_tb_blockParam = JSON.parse(JSON.stringify( textBlock._drill_tb_blockParam ));		//（深拷贝）
	this._drill_tb_rowParam   = JSON.parse(JSON.stringify( textBlock._drill_tb_rowParam ));			//（深拷贝）
	this._drill_tb_width  = textBlock._drill_tb_width;
	this._drill_tb_height = textBlock._drill_tb_height;
	
	this._drill_tb_blockParam['originalRow'] = undefined;	//（换行符不能被复制）
	this._drill_tb_blockParam['breakRow'] = undefined;
	
	// > 阶段 - 位置分配
	this._drill_tb_x = textBlock._drill_tb_x;
	this._drill_tb_y = textBlock._drill_tb_y;
};
//==============================
// * 字符块 - 复制数据 - 已拆散字符的配置
//
//			说明：	> 外部函数注意执行回滚样式，确保复制不会让 只生效一次 的参数被多次复制。
//==============================
Drill_COCD_TextBlock.prototype.drill_textBlock_copySetupInSplit = function(){
	$gameTemp.drill_COCD_textBlock_restoreStyle( null, this._drill_tb_baseParam, this._drill_tb_blockParam, this._drill_tb_rowParam );
};
//==============================
// * 字符块 - 访问器
//==============================
Drill_COCD_TextBlock.prototype.drill_textBlock_getText = function(){ return this._drill_tb_text; };
Drill_COCD_TextBlock.prototype.drill_textBlock_getBaseParam  = function(){ return this._drill_tb_baseParam;  };
Drill_COCD_TextBlock.prototype.drill_textBlock_getBlockParam = function(){ return this._drill_tb_blockParam; };
Drill_COCD_TextBlock.prototype.drill_textBlock_getRowParam   = function(){ return this._drill_tb_rowParam;   };
Drill_COCD_TextBlock.prototype.drill_textBlock_getWidth  = function(){ return this._drill_tb_width;  };
Drill_COCD_TextBlock.prototype.drill_textBlock_getHeight = function(){ return this._drill_tb_height; };
Drill_COCD_TextBlock.prototype.drill_textBlock_getX = function(){ return this._drill_tb_x; };
Drill_COCD_TextBlock.prototype.drill_textBlock_getY = function(){ return this._drill_tb_y; };


//=============================================================================
// ** 底层字符 单行块【Drill_COCD_RowBlock】
// **		
// **		作用域：	战斗界面、地图界面、菜单界面
// **		主功能：	定义一个单行块的数据类。
// **		子功能：	
// **					->无帧刷新
// **					->被动赋值
// **						> 字符块列表
// **						> 单行配置
// **						> 行宽度
// **						> 行起始位置X
// **						> 行起始位置Y
// **						> 最大字符高度
// **						> 默认字符高度
// **					->获取行高度
// **		
// **		说明：	> 该类没有帧刷新，只能通过函数被动赋值。
// **				> 该类存储的数据量非常庞大，临时使用，不要存储。
//=============================================================================
//==============================
// * 单行块 - 定义
//==============================
function Drill_COCD_RowBlock(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 单行块 - 初始化
//==============================
Drill_COCD_RowBlock.prototype.initialize = function(){
    this.drill_rowBlock_initData();				//私有数据初始化
};
//##############################
// * 单行块 - 添加字符块【开放函数】
//			
//			参数：	> textBlock 对象  （字符块）
//			返回：	> 无
//##############################
Drill_COCD_RowBlock.prototype.drill_rowBlock_addTextBlock = function( textBlock ){
	
	// > 字符块列表
	this._drill_rb_textBlockList.push( textBlock );
	
	// > 行宽度
	var width = textBlock.drill_textBlock_getWidth();
	this._drill_rb_rowWidth += width;
	
	// > 行高度
	var height = textBlock.drill_textBlock_getHeight();
	this._drill_rb_maxCharacterHeight = Math.max( this._drill_rb_maxCharacterHeight, height );
};
//##############################
// * 单行块 - 添加字符块列表【开放函数】
//			
//			参数：	> textBlock_list 对象列表  （字符块列表）
//			返回：	> 无
//##############################
Drill_COCD_RowBlock.prototype.drill_rowBlock_addTextBlockList = function( textBlock_list ){
	for( var i = 0; i < textBlock_list.length; i++ ){
		this.drill_rowBlock_addTextBlock( textBlock_list[i] );
	}
};
//##############################
// * 单行块 - 清空字符块【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_COCD_RowBlock.prototype.drill_rowBlock_clearTextBlock = function(){
	
	// > 字符块列表
	this._drill_rb_textBlockList = [];
	
	// > 行宽度
	this._drill_rb_rowWidth = 0;
	
	// > 行高度
	this._drill_rb_maxCharacterHeight = 0;
};
//##############################
// * 单行块 - 刷新单行配置【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 遍历收集自己的 字符块列表 的单行配置，将参数集合在一起。
//					> 注意，空行的单行配置没有任何参数。
//##############################
Drill_COCD_RowBlock.prototype.drill_rowBlock_refreshRowParam = function(){
	var rowParam = {};
	for( var j = 0; j < this._drill_rb_textBlockList.length; j++ ){
		var textBlock = this._drill_rb_textBlockList[j];
		var tb_rowParam = textBlock.drill_textBlock_getRowParam();
		
		// > 遍历收集 所有单行块 的参数
		for( var key in tb_rowParam ){
			rowParam[key] = tb_rowParam[key];
		}
	}
	this._drill_rb_rowParam = rowParam;
};
//##############################
// * 单行块 - 设置行起始位置X【开放函数】
//			
//			参数：	> rowStartX 数字
//			返回：	> 无
//
//			说明：	> 行的起始位置不一定是 第一个字符块 的位置，因为字符块位置会受到居中影响。
//##############################
Drill_COCD_RowBlock.prototype.drill_rowBlock_setRowStartX = function( rowStartX ){
	this._drill_rb_rowStartX = rowStartX;
};
//##############################
// * 单行块 - 设置行起始位置Y【开放函数】
//			
//			参数：	> rowStartY 数字
//			返回：	> 无
//
//			说明：	> 行的起始位置不一定是 第一个字符块 的位置，因为字符块位置会受到居中影响。
//##############################
Drill_COCD_RowBlock.prototype.drill_rowBlock_setRowStartY = function( rowStartY ){
	this._drill_rb_rowStartY = rowStartY;
};
//##############################
// * 单行块 - 设置默认字符高度【开放函数】
//			
//			参数：	> specialRowHeight 数字
//			返回：	> 无
//			
//			说明：	> 该配置用于 当前为空行时 或 当前高度为零时，提供的高度值。
//##############################
Drill_COCD_RowBlock.prototype.drill_rowBlock_setMaxCharacterSpecialHeight = function( specialRowHeight ){
	this._drill_rb_maxCharacterSpecialHeight = specialRowHeight;
};
//==============================
// * 单行块 - 私有数据初始化
//==============================
Drill_COCD_RowBlock.prototype.drill_rowBlock_initData = function(){
	
	this._drill_rb_textBlockList = [];					//单行块 - 字符块列表
	this._drill_rb_rowParam = {};						//单行块 - 单行配置
	
	this._drill_rb_rowStartX = 0;						//单行块 - 行起始位置X
	this._drill_rb_rowStartY = 0;						//单行块 - 行起始位置Y
	this._drill_rb_rowWidth = 0;						//单行块 - 行宽度
	this._drill_rb_maxCharacterHeight = 0;				//单行块 - 最大字符高度
	this._drill_rb_maxCharacterSpecialHeight = 0;		//单行块 - 默认字符高度
};
//==============================
// * 单行块 - 复制数据
//==============================
Drill_COCD_RowBlock.prototype.drill_rowBlock_copyFrom = function( rowBlock ){
	
	this._drill_rb_textBlockList = rowBlock._drill_rb_textBlockList;						//（复制指针列表）
	this._drill_rb_rowParam = JSON.parse(JSON.stringify( rowBlock._drill_rb_rowParam ));	//（深拷贝）
	
	this._drill_rb_rowStartX = rowBlock._drill_rb_rowStartX;
	this._drill_rb_rowStartY = rowBlock._drill_rb_rowStartY;
	this._drill_rb_rowWidth = rowBlock._drill_rb_rowWidth;
	this._drill_rb_maxCharacterHeight = rowBlock._drill_rb_maxCharacterHeight;
	//this._drill_rb_maxCharacterSpecialHeight （此项不复制）
};
//==============================
// * 单行块 - 访问器
//==============================
Drill_COCD_RowBlock.prototype.drill_rowBlock_getTextBlockList = function(){ return this._drill_rb_textBlockList; };
Drill_COCD_RowBlock.prototype.drill_rowBlock_getRowParam = function(){ return this._drill_rb_rowParam; };
Drill_COCD_RowBlock.prototype.drill_rowBlock_getRowStartX = function(){ return this._drill_rb_rowStartX; };
Drill_COCD_RowBlock.prototype.drill_rowBlock_getRowStartY = function(){ return this._drill_rb_rowStartY; };
Drill_COCD_RowBlock.prototype.drill_rowBlock_getRowWidth = function(){ return this._drill_rb_rowWidth; };
//==============================
// * 单行块 - 获取最大字符高度
//==============================
Drill_COCD_RowBlock.prototype.drill_rowBlock_getMaxCharacterHeight = function(){
	if( this._drill_rb_textBlockList.length == 0 ){ return this._drill_rb_maxCharacterSpecialHeight; }
	if( this._drill_rb_maxCharacterHeight == 0 ){ return this._drill_rb_maxCharacterSpecialHeight; }
	return this._drill_rb_maxCharacterHeight;
};
//==============================
// * 单行块 - 获取行高度（可继承）
//==============================
Drill_COCD_RowBlock.prototype.drill_rowBlock_getRowHeight = function(){
	return this.drill_rowBlock_getMaxCharacterHeight();
};


//=============================================================================
// ** ☆底层字符应用
//
//			说明：	> 效果字符阶段的 接口继承、执行 的相关应用。
//					> 相关 子插件 继承/应用 时，建议单独作为一个大模块，名为："底层字符应用"。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 底层字符应用 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COCD_COCD_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_COCD_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 颜色（@@@-tc[rgb(255,255,255)]） text_color
	if( command.toLowerCase() == "@@@-tc" ){
		if( args.length == 1 ){
			cur_baseParam['textColor'] = String(args[0]);		//（基础字符配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 描边开关（@@@-oe[true]） outline_enabled
	if( command.toLowerCase() == "@@@-oe" ){
		if( args.length == 1 ){
			if( String(args[0]) == "true" ){
				cur_baseParam['outlineEnabled'] = true;			//（基础字符配置）
			}else{
				cur_baseParam['outlineEnabled'] = false;
			}
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 描边颜色（@@@-oc[rgb(255,255,255)]） outline_color
	if( command.toLowerCase() == "@@@-oc" ){
		if( args.length == 1 ){
			cur_baseParam['outlineEnabled'] = true;				//（基础字符配置）
			cur_baseParam['outlineColor'] = String(args[0]);	//（修改了就立即生效）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 描边厚度（@@@-ow[4]） outline_width
	if( command.toLowerCase() == "@@@-ow" ){
		if( args.length == 1 ){
			if( Number(args[0]) <= 0 ){
				cur_baseParam['outlineEnabled'] = false;		//（厚度为0视作关闭开关）
			}else{
				cur_baseParam['outlineEnabled'] = true;			//（修改了就立即生效）
				cur_baseParam['outlineWidth'] = Number(args[0]);
			}
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 字体加粗（@@@-fb[true]） font_bold
	if( command.toLowerCase() == "@@@-fb" ){
		if( args.length == 1 ){
			if( String(args[0]) == "true" ){
				cur_baseParam['fontBold'] = true;				//（基础字符配置）
			}else{
				cur_baseParam['fontBold'] = false;
			}
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 字体倾斜（@@@-fi[true]） font_italic
	if( command.toLowerCase() == "@@@-fi" ){
		if( args.length == 1 ){
			if( String(args[0]) == "true" ){
				cur_baseParam['fontItalic'] = true;				//（基础字符配置）
			}else{
				cur_baseParam['fontItalic'] = false;
			}
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 字体大小（@@@-fs[20]） font_size
	if( command.toLowerCase() == "@@@-fs" ){
		if( args.length == 1 ){
			cur_baseParam['fontSize'] = Number(args[0]);		//（基础字符配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
		if( args.length == 2 ){
			if( args[0] == "set" ){		//『底层字符定义』 - 字体大小（@@@-fs[set:20]） font_size
				cur_baseParam['fontSize'] = Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			if( args[0] == "add" ){		//『底层字符定义』 - 字体大小（@@@-fs[add:4]） font_size
				cur_baseParam['fontSize'] += Number(args[1]);
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
	// > 『底层字符定义』 - 字体名称（@@@-ff[GameFont]） font_face
	if( command.toLowerCase() == "@@@-ff" ){
		if( args.length == 1 ){
			cur_baseParam['fontFace'] = String(args[0]);		//（基础字符配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 全重置字符（@@@-fr） font_reset
	if( command.toLowerCase() == "@@@-fr" ){
		if( args.length == 0 ){
			this.drill_COCD_textBlock_fontReset( cur_infoParam, cur_baseParam, cur_blockParam );
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	
	// > 『底层字符定义』 - 偏移量X（@@@-px[0]） pos_x
	if( command.toLowerCase() == "@@@-px" ){
		if( args.length == 1 ){
			cur_blockParam['posX'] = Number(args[0]);			//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 偏移量Y（@@@-py[0]） pos_y
	if( command.toLowerCase() == "@@@-py" ){
		if( args.length == 1 ){
			cur_blockParam['posY'] = Number(args[0]);			//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 额外量X（@@@-ox[0]） offset_x
	if( command.toLowerCase() == "@@@-ox" ){
		if( args.length == 1 ){
			cur_blockParam['offsetX'] = Number(args[0]);		//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 额外量Y（@@@-oy[4]） offset_y
	if( command.toLowerCase() == "@@@-oy" ){
		if( args.length == 1 ){
			cur_blockParam['offsetY'] = Number(args[0]);		//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 内边距 - 全部（@@@-pa[10]） padding_all
	if( command.toLowerCase() == "@@@-pa" ){
		if( args.length == 1 ){
			var border = Number(args[0]);
			cur_blockParam['paddingLeft'] = border;				//（底层单块配置）
			cur_blockParam['paddingRight'] = border;
			cur_blockParam['paddingTop'] = border;
			cur_blockParam['paddingBottom'] = border;
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 内边距 - 上（@@@-pt[10]） padding_top
	if( command.toLowerCase() == "@@@-pt" ){
		if( args.length == 1 ){
			cur_blockParam['paddingTop'] = Number(args[0]);		//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 内边距 - 下（@@@-pb[10]） padding_bottom
	if( command.toLowerCase() == "@@@-pb" ){
		if( args.length == 1 ){
			cur_blockParam['paddingBottom'] = Number(args[0]);	//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 内边距 - 左（@@@-pl[10]） padding_left
	if( command.toLowerCase() == "@@@-pl" ){
		if( args.length == 1 ){
			cur_blockParam['paddingLeft'] = Number(args[0]);	//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 内边距 - 右（@@@-pr[10]） padding_right
	if( command.toLowerCase() == "@@@-pr" ){
		if( args.length == 1 ){
			cur_blockParam['paddingRight'] = Number(args[0]);	//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	// > 『底层字符定义』 - 常规换行（@@@-or） original_row
	if( command.toLowerCase() == "@@@-or" ){
		if( args.length == 0 ){
			if( cur_blockParam['originalRow'] == undefined ){ cur_blockParam['originalRow'] = 0; }
			cur_blockParam['originalRow'] += 1;					//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 手动换行（@@@-br） break_row
	if( command.toLowerCase() == "@@@-br" ){
		if( args.length == 0 ){
			if( cur_blockParam['breakRow'] == undefined ){ cur_blockParam['breakRow'] = 0; }
			cur_blockParam['breakRow'] += 1;					//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 自动换行标记（@@@-ws） word_wrap
	if( command.toLowerCase() == "@@@-ws" ){
		if( args.length == 0 ){
			cur_blockParam['splitAll'] = true;		//（自动换行必然拆散全部字符）
			cur_blockParam['wordWrap'] = true;		//（只要有一个字符块出现了此标记，则所有文本都要自动换行）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 字符拆散-全部（@@@-sa） split_all
	if( command.toLowerCase() == "@@@-sa" ){
		if( args.length == 0 ){
			cur_blockParam['splitAll'] = true;					//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 字符拆散-当前行（@@@-sr） split_row
	if( command.toLowerCase() == "@@@-sr" ){
		if( args.length == 0 ){
			cur_blockParam['splitRow'] = true;					//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
}
//==============================
// * 底层字符应用 - 样式阶段-回滚样式（继承）
//==============================
var _drill_COCD_COCD_textBlock_restoreStyle = Game_Temp.prototype.drill_COCD_textBlock_restoreStyle;
Game_Temp.prototype.drill_COCD_textBlock_restoreStyle = function( cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_COCD_textBlock_restoreStyle.call( this, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符样式回滚』 - 颜色（@@@-tc[rgb(255,255,255)]）
	//	（不操作）
	
	// > 『底层字符样式回滚』 - 描边开关（@@@-oe[true]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 描边颜色（@@@-oc[rgb(255,255,255)]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 描边厚度（@@@-ow[4]）
	//	（不操作）
	
	// > 『底层字符样式回滚』 - 字体加粗（@@@-fb[true]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 字体倾斜（@@@-fi[true]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 字体大小（@@@-fs[20]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 字体名称（@@@-ff[GameFont]）
	//	（不操作）
	
	// > 『底层字符样式回滚』 - 全重置字符（@@@-fr）
	//	（不需要回滚）
	
	// > 『底层字符样式回滚』 - 偏移量X（@@@-px[0]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 偏移量Y（@@@-py[0]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 额外量X（@@@-ox[0]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 额外量Y（@@@-oy[4]）
	//	（不操作）
	
	// > 『底层字符样式回滚』 - 内边距 - 全部（@@@-pa[10]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 内边距 - 上（@@@-pt[10]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 内边距 - 下（@@@-pb[10]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 内边距 - 左（@@@-pl[10]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 内边距 - 右（@@@-pr[10]）
	//	（不操作）
	
	
	// > 『底层字符样式回滚』 - 常规换行（@@@-or）
	cur_blockParam['originalRow'] = undefined;		//（底层单块配置）
	
	// > 『底层字符样式回滚』 - 手动换行（@@@-br）
	cur_blockParam['breakRow'] = undefined;			//（底层单块配置）
	
	// > 『底层字符样式回滚』 - 自动换行标记（@@@-ws）
	//		（不操作，有一个就全部生效）
	
	
	// > 『底层字符样式回滚』 - 字符拆散-全部（@@@-sa）
	//		（不操作，有一个就全部生效）
	
	// > 『底层字符样式回滚』 - 字符拆散-当前行（@@@-sr）
	cur_blockParam['splitRow'] = undefined;			//（底层单块配置）
}


//=============================================================================
// ** ☆DEBUG底层字符应用
//
//			说明：	> 此模块控制 DEBUG底层字符应用 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG底层字符应用 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COCD_debug_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_debug_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	if( command.toLowerCase() == "@@@-de" ){
		if( args.length == 1 ){
			var type = String(args[0]);
			
			// > 『底层字符定义』 - 测试标记（@@@-de[显示字符方框]） debug
			if( type == "显示字符方框" ){
				cur_baseParam['drawDebugBaseRect'] = true;	//（之后的文本才会显示标记）
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 测试标记（@@@-de[隐藏字符方框]） debug
			if( type == "隐藏字符方框" ){
				cur_baseParam['drawDebugBaseRect'] = false;	//（之后的文本才会显示标记）
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			
			// > 『底层字符定义』 - 测试标记（@@@-de[显示单行标线]） debug
			if( type == "显示单行标线" ){
				cur_rowParam['drawDebugRowRect'] = true;	//（之后的文本才会显示标记）
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 测试标记（@@@-de[隐藏单行标线]） debug
			if( type == "隐藏单行标线" ){
				cur_rowParam['drawDebugRowRect'] = false;	//（之后的文本才会显示标记）
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			
			// > 『底层字符定义』 - 测试标记（@@@-de[显示范围盒]） debug
			if( type == "显示范围盒" ){
				cur_rowParam['drawDebugBoxRect'] = true;
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
			// > 『底层字符定义』 - 测试标记（@@@-de[隐藏范围盒]） debug
			if( type == "隐藏范围盒" ){
				cur_rowParam['drawDebugBoxRect'] = false;
				this.drill_COCD_textBlock_submitStyle();
				return;
			}
		}
	}
}
//==============================
// * DEBUG底层字符应用 - 准备绘制配置（继承）
//==============================
var _drill_COCD_COCD_initOptions_1 = Game_Temp.prototype.drill_COCD_initOptions;
Game_Temp.prototype.drill_COCD_initOptions = function( o_data, o_bitmap ){
	_drill_COCD_COCD_initOptions_1.call( this, o_data, o_bitmap );
	
	if( o_data['infoParam']['drawDebugAllRect'] == true ){
		
		// > 显示字符方框（字符块）
		o_data['baseParam']['drawDebugBaseRect'] = true;
		
		// > 显示单行标线（单行块）
		o_data['rowParam']['drawDebugRowRect'] = true;
		
		// > 显示范围盒
		o_data['rowParam']['drawDebugBoxRect'] = true;
	}
}
//==============================
// * DEBUG底层字符应用 - 范围盒计算（继承）
//==============================
var _drill_COCD_COCD_setupBoxCalculate = Game_Temp.prototype.drill_COCD_setupBoxCalculate;
Game_Temp.prototype.drill_COCD_setupBoxCalculate = function( textBlock_list, infoParam ){
	_drill_COCD_COCD_setupBoxCalculate.call( this, textBlock_list, infoParam );
	
	// > 最后一个字符块（把范围盒计算结果存入）
	var textBlock = textBlock_list[ textBlock_list.length -1 ];
	var blockParam = textBlock.drill_textBlock_getBlockParam();
	blockParam['box_x'] = infoParam['box_x'];
	blockParam['box_y'] = infoParam['box_y'];
	blockParam['box_width']  = infoParam['box_width'];
	blockParam['box_height'] = infoParam['box_height'];
}
//==============================
// * DEBUG底层字符应用 - 监听 - 绘制单个单行块时（继承）
//
//			说明：	> 注意，这里继承的是 绘制 函数。
//==============================
var _drill_COCD_debug_drawRowBlock_Private = Bitmap.prototype.drill_COCD_drawRowBlock_Private;
Bitmap.prototype.drill_COCD_drawRowBlock_Private = function( rowBlock ){
	
	// > 绘制范围盒
	this.drill_COCD_drawDebugBoxRect( rowBlock );
	
	// > 原函数
	_drill_COCD_debug_drawRowBlock_Private.call( this, rowBlock );
	
	// > 绘制单行标线
	this.drill_COCD_drawDebugRowRect( rowBlock );
}
//==============================
// * DEBUG底层字符应用 - 绘制范围盒（开放函数）
//==============================
Bitmap.prototype.drill_COCD_drawDebugBoxRect = function( rowBlock ){
	
	// > 『绘制过程定义』 - 测试标记（@@@-de[显示范围盒]、@@@-de[隐藏范围盒]）
	var rowParam = rowBlock.drill_rowBlock_getRowParam();
	if( rowParam['drawDebugBoxRect'] == true ){
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		if( textBlock_list.length > 0 ){
			
			// > 显示范围盒 - 最后一个字符块（取出范围盒计算结果）
			var textBlock = textBlock_list[ textBlock_list.length -1 ]
			var blockParam = textBlock.drill_textBlock_getBlockParam();
			if( blockParam['box_x'] != undefined ){
				this.drill_COCD_strokeRect(
					blockParam['box_x'],
					blockParam['box_y'],
					blockParam['box_width'],
					blockParam['box_height'],
					"#22aa22", 1, "miter" );
			}
		}
	}
}
//==============================
// * DEBUG底层字符应用 - 绘制单行标线（开放函数）
//==============================
Bitmap.prototype.drill_COCD_drawDebugRowRect = function( rowBlock ){
	
	// > 『绘制过程定义』 - 测试标记（@@@-de[显示单行标线]、@@@-de[隐藏单行标线]）
	//		（在字符绘制之后绘制，能看见标线和数字）
	var rowParam = rowBlock.drill_rowBlock_getRowParam();
	if( rowParam['drawDebugRowRect'] == true ){
		var textBlock = rowBlock.drill_rowBlock_getTextBlockList()[0];
		if( textBlock != undefined ){
			var xx = rowBlock.drill_rowBlock_getRowStartX();
			var yy = rowBlock.drill_rowBlock_getRowStartY();
			var ww = rowBlock.drill_rowBlock_getRowWidth();
			var hh = rowBlock.drill_rowBlock_getRowHeight();
			
			// > 标线
			this.drill_COCD_strokeRect( xx-10, yy-1, ww+20, 2, "#aaaa00", 2, "miter" );
			
			// > 标线的高度值
			var temp_param = {};
			temp_param['textColor'] = "#aaaa00";
			temp_param['fontSize'] = 12;
			temp_param['fontBold'] = true;
			var hh_str = String(rowParam['total_rowNum']) +"["+ String( Math.round(hh) ) + "]";
			var str_width = $gameTemp.drill_COCD_measureBaseTextWidth( hh_str, temp_param );
			this.drill_COCD_drawBaseText( hh_str, xx, yy-1, temp_param );
			this.drill_COCD_drawBaseText( hh_str, xx+ww-str_width, yy-1, temp_param );
		}
	}
}
//==============================
// * DEBUG底层字符应用 - 填充矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> color 字符串   （颜色）
//			说明：	> 此函数复刻自 Bitmap.prototype.fillRect 。
//==============================
Bitmap.prototype.drill_COCD_fillRect = function( x, y, width, height, color ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.fillStyle = color;				//（b.设置样式）
	
    painter.fillRect(x, y, width, height);	//（c.路径填充/描边，fillRect）
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};
//==============================
// * DEBUG底层字符应用 - 描边矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> color 字符串    （颜色）
//					> lineWidth 数字  （线宽）
//					> lineJoin 字符串 （连接处，包含miter/round/bevel 尖角/圆角/斜角，默认miter）
//			说明：	> 无。
//==============================
Bitmap.prototype.drill_COCD_strokeRect = function( x, y, width, height, color, lineWidth, lineJoin ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.strokeStyle = color;			//（b.设置样式）
	painter.lineWidth = lineWidth;
	painter.lineJoin = lineJoin;
	
	x += lineWidth*0.5;						//（c.向内描边）
	y += lineWidth*0.5;
	width  -= lineWidth;
	height -= lineWidth;
	
    painter.strokeRect(x, y, width, height);//（c.路径填充/描边，strokeRect）
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};


//=============================================================================
// ** ☆DEBUG底层字符显示
//
//			说明：	> 此模块控制 DEBUG底层字符显示 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG底层字符显示 - 帧刷新（地图界面）
//==============================
var _drill_COCD_debug2Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COCD_debug2Map_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_COCD_BlockText_DebugEnabled == true ){
		$gameTemp._drill_COCD_BlockText_DebugEnabled = undefined;
		this.drill_COCD_Text_createDebugSprite();
	}
	
	// > 销毁贴图
	if( $gameTemp._drill_COCD_BlockText_DebugEnabled == false ){
		$gameTemp._drill_COCD_BlockText_DebugEnabled = undefined;
		if( this._drill_COCD_Text_DebugSprite != undefined ){
			this.removeChild(this._drill_COCD_Text_DebugSprite);
			this._drill_COCD_Text_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG底层字符显示 - 创建贴图
//==============================
Scene_Map.prototype.drill_COCD_Text_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_COCD_Text_DebugSprite != undefined ){
		this.removeChild(this._drill_COCD_Text_DebugSprite);
		this._drill_COCD_Text_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 0;
	temp_debugSprite.y = 0;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.5)");
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_Text_DebugSprite = temp_debugSprite;
	
	
	// > 绘制 - 准备绘制配置（初始化）
	var options = {};
	
	options['infoParam'] = {};
	options['infoParam']['x'] = 40;
	options['infoParam']['y'] = 40;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = true;
	options['baseParam']['fontSize'] = 18;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	// > 绘制 - 准备绘制配置
	$gameTemp.drill_COCD_initOptions( options, temp_bitmap );
	//	（此处没有走正规的流程，而是零散使用）
	//	（不要参考这里的绘制函数！会出很多问题！去看 drill_COCD_drawText 函数的流程！）
	
	// > 绘制 - 插件标识
	var text = "【" + DrillUp.g_COCD_PluginTip_curName + "】";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	for(var i = 0; i < rowBlock_list.length; i++){
		options['infoParam']['y'] += rowBlock_list[i].drill_rowBlock_getRowHeight();	//（y值叠加）
	}
	
	// > 绘制 - 插件简单说明
	//		（注意，此处连续解析底层字符时，使用相同的options对象指针，会沾染上一次解析的颜色配置，以及其它样式配置）
	var text =  "   当前将测试底层字符的功能，底层字符格式为\"@@@xxx\"或\"@@@xxx[]\"。 @@@-br" +
				"   注意，这里不识别\"\\xx\"或\"\\xx[]\"，该格式是窗口字符核心识别的格式。";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	for(var i = 0; i < rowBlock_list.length; i++){
		options['infoParam']['y'] += rowBlock_list[i].drill_rowBlock_getRowHeight();	//（y值叠加）
	}
	
	// > 绘制 - 切割字符串
	var text =  "》测试切割字符串：@@@-br" + 
				"    @@@xxx[[[ddd]]] @@@-fs[@@@-fs[aaa@@@xxx[bbb @@@xxx[ccc]@@@xxx] @@@-br" + 
				"    aaa@aaa@@aaa@@@aaa@@@@aaa@@@@@aaa@@@@@@aaa@@@@@@@aaa";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	for(var i = 0; i < rowBlock_list.length; i++){
		options['infoParam']['y'] += rowBlock_list[i].drill_rowBlock_getRowHeight();	//（y值叠加）
	}
	
	// > 绘制 - 底层字符
	var text =  "》测试底层字符： @@@-br" + 
				"    ×@@-px[10]   字符X偏移  @@@-px[10]测试的字符 @@@-fr@@@-br" + 
				"    ×@@-py[-10]  字符Y偏移  @@@-py[-10]测试的字符 @@@-fr@@@-br" + 
				"    ×@@-tc[rgb(0,255,255)]  文本颜色  @@@-tc[rgb(0,255,255)]测试的字符 @@@-fr@@@-br" + 
				"    ×@@-oc[rgb(205,205,0)]  描边颜色  @@@-oc[rgb(205,205,0)]测试的字符 @@@-fr@@@-br" + 
				"    ×@@-ow[8]  描边厚度  @@@-oc[rgb(0,155,0)]@@@-ow[8]测试的字符 @@@-fr@@@-br" + 
				"    ×@@-fb[true]  字体加粗  @@@-fb[true]测试的@@@-fb[false]字符 @@@-fr@@@-br" + 
				"    ×@@-fi[true]  字体倾斜  @@@-fi[true]测试的@@@-fi[false]字符 @@@-fr@@@-br" + 
				"    ×@@-fs[12]  字体大小  @@@-fs[12]测试的字符（字体大小最小为12像素） @@@-fr@@@-br" + 
				"    ×@@-ff[HappyFont]  字体名称  @@@-ff[HappyFont]测试的字符@@@-fs[12]（需字体管理器插件,否则不生效） @@@-fr@@@-fs[18]@@@-br" + 
				"    ×@@-ic[9]  图标字符  @@@-ic[9]测试的图标 @@@-fr@@@-br";
				//以下底层字符不测：（直接去看窗口字符吧）
				//		@@@-ox[0]
				//		@@@-oy[4]
				//		@@@-oe[true]
				//		@@@-fs[add:6]
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	for(var i = 0; i < rowBlock_list.length; i++){
		options['infoParam']['y'] += rowBlock_list[i].drill_rowBlock_getRowHeight();	//（y值叠加）
	}
	
	// > 绘制 - 拆散字符
	var text =  "》测试拆散字符： @@@-br" + 
				"    ×@@-sa   拆散字符-全部  （这里不展示效果）@@@-br" + 
				"    ×@@-sr   拆散字符-当前行  @@@-sr测试的字符，包括标点符号,?~。   @@@-br" + 
				"              （该拆散字符只会拆散一行，不会影响后面行）" ;
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	for(var i = 0; i < rowBlock_list.length; i++){
		options['infoParam']['y'] += rowBlock_list[i].drill_rowBlock_getRowHeight();	//（y值叠加）
	}
	
	// > 绘制 - 手动换行
	var text =  "》测试手动换行：@@@-br" + 
				"    每行都会被字体大小最大的字符给撑开。@@@-br" + 
				"@@@-fs[28]x超x@@@-fs[24]x级x@@@-fs[20]x可x@@@-fs[18]x爱x@@@-fs[14]x的x@@@-fs[12]x小x@@@-fs[14]x爱x@@@-fs[18]x丽x@@@-fs[20]x丝x@@@-fs[24]x来x@@@-fs[28]x啦x @@@-fr@@@-br" + 
				"@@@-fs[12]今天@@@-fs[14]又是@@@-fs[18]非常@@@-fs[20]忙碌@@@-fs[24]的一@@@-fs[28]天哦@@@-fs[24]，我@@@-fs[20]们要@@@-fs[18]打起@@@-fs[14]精神@@@-fs[12]来！ @@@-fr" + 
				"@@@-br@@@-br@@@-is[two:2:#eef]@@@-br@@@-is[three:2:#eef]";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	//for(var i = 0; i < rowBlock_list.length; i++){
	//	options['infoParam']['y'] += rowBlock_list[i].drill_rowBlock_getRowHeight();	//（y值叠加）
	//}
	options['infoParam']['x'] += 420;
	
	// > 绘制 - 自动换行
	options['blockParam']['splitAll'] = true;
	options['blockParam']['wordWrap'] = true;
	options['blockParam']['wordWrap_maxWidth'] = 310;
	
	var text =  "》测试自动换行：@@@-br" + 
				"    无有因，头悬市曹何故？无有因，四渎失管何故？无有因，诸色惘惘何故？无有因，慈悲颠倒何故？无有因，庙潜黄衣何故？是曰：细碎沾衣，萦空堕地，犁然寡欲，心动神疲。";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
}


//=============================================================================
// ** ☆DEBUG范围盒显示
//
//			说明：	> 此模块控制 DEBUG范围盒显示 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG范围盒显示 - 帧刷新（地图界面）
//==============================
var _drill_COCD_debug3Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COCD_debug3Map_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_COCD_Box_DebugEnabled == true ){
		$gameTemp._drill_COCD_Box_DebugEnabled = undefined;
		this.drill_COCD_Box_createDebugSprite();
	}
	
	// > 销毁贴图
	if( $gameTemp._drill_COCD_Box_DebugEnabled == false ){
		$gameTemp._drill_COCD_Box_DebugEnabled = undefined;
		if( this._drill_COCD_Box_DebugSprite1 != undefined ){
			this.removeChild(this._drill_COCD_Box_DebugSprite1);
			this._drill_COCD_Box_DebugSprite1 = undefined;
		}
		if( this._drill_COCD_Box_DebugSprite2 != undefined ){
			this.removeChild(this._drill_COCD_Box_DebugSprite2);
			this._drill_COCD_Box_DebugSprite2 = undefined;
		}
		if( this._drill_COCD_Box_DebugSprite3 != undefined ){
			this.removeChild(this._drill_COCD_Box_DebugSprite3);
			this._drill_COCD_Box_DebugSprite3 = undefined;
		}
		if( this._drill_COCD_Box_DebugSprite4 != undefined ){
			this.removeChild(this._drill_COCD_Box_DebugSprite4);
			this._drill_COCD_Box_DebugSprite4 = undefined;
		}
		if( this._drill_COCD_Box_DebugSprite5 != undefined ){
			this.removeChild(this._drill_COCD_Box_DebugSprite5);
			this._drill_COCD_Box_DebugSprite5 = undefined;
		}
		if( this._drill_COCD_Box_DebugSprite6 != undefined ){
			this.removeChild(this._drill_COCD_Box_DebugSprite6);
			this._drill_COCD_Box_DebugSprite6 = undefined;
		}
		if( this._drill_COCD_Box_DebugSprite7 != undefined ){
			this.removeChild(this._drill_COCD_Box_DebugSprite7);
			this._drill_COCD_Box_DebugSprite7 = undefined;
		}
	}
}
//==============================
// * DEBUG范围盒显示 - 创建贴图
//==============================
Scene_Map.prototype.drill_COCD_Box_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_COCD_Box_DebugSprite1 != undefined ){
		this.removeChild(this._drill_COCD_Box_DebugSprite1);
		this._drill_COCD_Box_DebugSprite1 = undefined;
	}
	if( this._drill_COCD_Box_DebugSprite2 != undefined ){
		this.removeChild(this._drill_COCD_Box_DebugSprite2);
		this._drill_COCD_Box_DebugSprite2 = undefined;
	}
	if( this._drill_COCD_Box_DebugSprite3 != undefined ){
		this.removeChild(this._drill_COCD_Box_DebugSprite3);
		this._drill_COCD_Box_DebugSprite3 = undefined;
	}
	if( this._drill_COCD_Box_DebugSprite4 != undefined ){
		this.removeChild(this._drill_COCD_Box_DebugSprite4);
		this._drill_COCD_Box_DebugSprite4 = undefined;
	}
	if( this._drill_COCD_Box_DebugSprite5 != undefined ){
		this.removeChild(this._drill_COCD_Box_DebugSprite5);
		this._drill_COCD_Box_DebugSprite5 = undefined;
	}
	if( this._drill_COCD_Box_DebugSprite6 != undefined ){
		this.removeChild(this._drill_COCD_Box_DebugSprite6);
		this._drill_COCD_Box_DebugSprite6 = undefined;
	}
	if( this._drill_COCD_Box_DebugSprite7 != undefined ){
		this.removeChild(this._drill_COCD_Box_DebugSprite7);
		this._drill_COCD_Box_DebugSprite7 = undefined;
	}
	
	// > 绘制 - 准备绘制配置（初始化）
	var options = {};
	
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;	//（这个会影响范围盒位置）
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = 220;
	options['infoParam']['canvasHeight'] = 180;
	
	options['rowParam'] = {};
	options['rowParam']['drawDebugBoxRect'] = true;
	
	options['baseParam'] = {};
	options['baseParam']['drawDebugBaseRect'] = true;
	options['baseParam']['fontSize'] = 24;		//（初始设置字体大小，这样就不会被 全局默认值 干扰了，fr也会重置为此值）
	
	// > 绘制 - 准备绘制配置
	var temp_bitmap = new Bitmap( 220, 180 );
	$gameTemp.drill_COCD_initOptions( options, temp_bitmap );
	//	（此处没有走正规的流程，而是零散使用）
	//	（不要参考这里的绘制函数！会出很多问题！去看 drill_COCD_drawText 函数的流程！）
	
	
	// > 创建贴图1
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 50;
	temp_debugSprite.y = 50;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.7)");
	temp_debugSprite.bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 3, "miter" );
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_Box_DebugSprite1 = temp_debugSprite;
	
	// > 绘制 - 插件标识
	var text = "@@@-ws（常规情况）@@@-br常规绘制文本时，文本域的范围会填满整个画布，就像现在这样，加了自动换行，会根据情况排布文本。";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	
	// > 创建贴图2
	options['infoParam']['x'] = 20;
	options['infoParam']['y'] = 20;
	options['baseParam']['drawDebugBaseRect'] = false;
	var temp_bitmap = new Bitmap( 220, 180 );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 300;
	temp_debugSprite.y = 50;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.7)");
	temp_debugSprite.bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 3, "miter" );
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_Box_DebugSprite2 = temp_debugSprite;
	
	// > 绘制 - 插件标识
	var text = "@@@-ws（初始位置20,20）@@@-br但是，部分时候，绘制起始位置不一定紧贴左上角，而是像现在这样，有xy位置的偏移。";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	
	// > 创建贴图3
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	var temp_bitmap = new Bitmap( 220, 180 );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 550;
	temp_debugSprite.y = 50;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.7)");
	temp_debugSprite.bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 3, "miter" );
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_Box_DebugSprite3 = temp_debugSprite;
	
	// > 绘制 - 插件标识
	var text = "@@@-pa[20]@@@-ws（内边距20）@@@-br还有一种情况，就像现在这样，画布范围整体向内压缩了一段距离。";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	
	// > 创建贴图4
	var temp_bitmap = new Bitmap( 220, 180 );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 50;
	temp_debugSprite.y = 250;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.7)");
	temp_debugSprite.bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 3, "miter" );
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_Box_DebugSprite4 = temp_debugSprite;
	
	// > 绘制 - 插件标识
	var text = "@@@-pt[20]@@@-ws（上侧内边距20）@@@-br你可以自定义画布范围向内压缩的距离，分为上下左右四个方向，可以分开设置，但重复设置会被覆盖。";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	
	// > 创建贴图5
	var temp_bitmap = new Bitmap( 220, 180 );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 300;
	temp_debugSprite.y = 250;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.7)");
	temp_debugSprite.bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 3, "miter" );
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_Box_DebugSprite5 = temp_debugSprite;
	
	// > 绘制 - 插件标识
	var text = "@@@-pl[20]@@@-ws（左侧内边距20）@@@-br但你现在也看见了，四个方向只有上、左、右有效，所有文本被挤后都会往下挤出界。比如现在这段文本。";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	
	// > 创建贴图6
	var temp_bitmap = new Bitmap( 220, 180 );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 550;
	temp_debugSprite.y = 250;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.7)");
	temp_debugSprite.bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 3, "miter" );
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_Box_DebugSprite6 = temp_debugSprite;
	
	// > 绘制 - 插件标识
	var text = "@@@-pr[20]@@@-ws（右侧内边距20）@@@-br所以，修改 下方向 的边距，只能对一些特殊功能的子插件有用，其它情况都是没用的。";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	
	// > 创建贴图7
	options['infoParam']['canvasWidth'] = 620;
	options['infoParam']['canvasHeight'] = 120;
	var temp_bitmap = new Bitmap( 620, 120 );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 50;
	temp_debugSprite.y = 450;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.7)");
	temp_debugSprite.bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 3, "miter" );
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_Box_DebugSprite7 = temp_debugSprite;
	
	// > 绘制 - 插件标识
	var text = "@@@-pl[30]@@@-pr[30]（左右内边距30像素+左右对齐）@@@-br测试的字符@@@-a3测试的字符@@@-a4测试的字符@@@-br测试的字符测试的字符@@@-a4测试的字符测试的字符";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify(options)) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
}



//=============================================================================
// ** ☆对齐方式
//
//			说明：	> 该模块专门提供 对齐方式 的设置。本质上就是在位置分配后再进行一轮分配。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 对齐方式 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COCD_align_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_align_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 整体对齐 - 横向左对齐（@@@-a0） align_0
	if( command.toLowerCase() == "@@@-a0" ){
		if( args.length == 0 ){
			cur_rowParam['alignHor_type'] = "left";		//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 整体对齐 - 横向居中（@@@-a1） align_1
	if( command.toLowerCase() == "@@@-a1" ){
		if( args.length == 0 ){
			cur_rowParam['alignHor_type'] = "center";	//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 整体对齐 - 横向右对齐（@@@-a2） align_2
	if( command.toLowerCase() == "@@@-a2" ){
		if( args.length == 0 ){
			cur_rowParam['alignHor_type'] = "right";	//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	// > 『底层字符定义』 - 切断对齐 - 横向左对齐（无）
	//		（此配置没用）
	
	// > 『底层字符定义』 - 切断对齐 - 横向居中（@@@-a3） align_3
	if( command.toLowerCase() == "@@@-a3" ){
		if( args.length == 0 ){
			cur_blockParam['alignHor_centerCut'] = true;	//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 切断对齐 - 横向右对齐（@@@-a4） align_4
	if( command.toLowerCase() == "@@@-a4" ){
		if( args.length == 0 ){
			cur_blockParam['alignHor_rightCut'] = true;		//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	
	// > 『底层字符定义』 - 整体对齐 - 纵向顶部对齐（@@@-a5） align_5
	if( command.toLowerCase() == "@@@-a5" ){
		if( args.length == 0 ){
			cur_rowParam['alignVer_type'] = "top";		//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	// > 『底层字符定义』 - 整体对齐 - 纵向居中（@@@-a6） align_6
	if( command.toLowerCase() == "@@@-a6" ){
		if( args.length == 0 ){
			cur_rowParam['alignVer_type'] = "center";	//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 整体对齐 - 纵向底部对齐（@@@-a7） align_7
	if( command.toLowerCase() == "@@@-a7" ){
		if( args.length == 0 ){
			cur_rowParam['alignVer_type'] = "bottom";	//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	// > 『底层字符定义』 - 切断对齐 - 纵向顶部对齐（无）
	//		（此配置没用）
	
	// > 『底层字符定义』 - 切断对齐 - 纵向居中（@@@-a8） align_8
	if( command.toLowerCase() == "@@@-a8" ){
		if( args.length == 0 ){
			cur_blockParam['alignVer_centerCut'] = true;	//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 切断对齐 - 纵向底部对齐（@@@-a9） align_9
	if( command.toLowerCase() == "@@@-a9" ){
		if( args.length == 0 ){
			cur_blockParam['alignVer_rightCut'] = true;		//（底层单块配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
}
//==============================
// * 对齐方式 - 样式阶段-回滚样式（继承）
//==============================
var _drill_COCD_align_textBlock_restoreStyle = Game_Temp.prototype.drill_COCD_textBlock_restoreStyle;
Game_Temp.prototype.drill_COCD_textBlock_restoreStyle = function( cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_align_textBlock_restoreStyle.call( this, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符样式回滚』 - 整体对齐 - 横向左对齐（@@@-a0）
	//	（不操作）
	// > 『底层字符样式回滚』 - 整体对齐 - 横向居中（@@@-a1）
	//	（不操作）
	// > 『底层字符样式回滚』 - 整体对齐 - 横向右对齐（@@@-a2）
	//	（不操作）
	// > 『底层字符样式回滚』 - 整体对齐 - 横向左对齐（无）
	//	（不操作）
	
	// > 『底层字符样式回滚』 - 切断对齐 - 横向居中（@@@-a3）
	cur_blockParam['alignHor_centerCut'] = undefined;	//（底层单块配置）
	
	// > 『底层字符样式回滚』 - 切断对齐 - 横向右对齐（@@@-a4）
	cur_blockParam['alignHor_rightCut'] = undefined;	//（底层单块配置）
	
	// > 『底层字符样式回滚』 - 整体对齐 - 纵向顶部对齐（@@@-a5）
	//	（不操作）
	// > 『底层字符样式回滚』 - 整体对齐 - 纵向居中（@@@-a6）
	//	（不操作）
	// > 『底层字符样式回滚』 - 整体对齐 - 纵向底部对齐（@@@-a7）
	//	（不操作）
	// > 『底层字符样式回滚』 - 整体对齐 - 纵向顶部对齐（无）
	//	（不操作）
	
	// > 『底层字符样式回滚』 - 切断对齐 - 纵向居中（@@@-a8）
	cur_blockParam['alignVer_centerCut'] = undefined;	//（底层单块配置）
	
	// > 『底层字符样式回滚』 - 切断对齐 - 纵向底部对齐（@@@-a9）
	cur_blockParam['alignVer_rightCut'] = undefined;	//（底层单块配置）
}
//==============================
// * 对齐方式 - 切断对齐 - 获取 横向居中位置
//
//			说明：	> 单行块内，找到第一个索引位置即可。
//==============================
Drill_COCD_RowBlock.prototype.drill_rowBlock_getAlignHorCenterIndex = function(){
	for( var i = 0; i < this._drill_rb_textBlockList.length; i++ ){
		var textBlock = this._drill_rb_textBlockList[i];
		var blockParam = textBlock.drill_textBlock_getBlockParam();
		if( blockParam['alignHor_centerCut'] == true ){
			return i;
		}
	}
	return -1;
};
//==============================
// * 对齐方式 - 切断对齐 - 获取 横向右对齐位置
//
//			说明：	> 单行块内，找到第一个索引位置即可。
//==============================
Drill_COCD_RowBlock.prototype.drill_rowBlock_getAlignHorRightIndex = function(){
	for( var i = 0; i < this._drill_rb_textBlockList.length; i++ ){
		var textBlock = this._drill_rb_textBlockList[i];
		var blockParam = textBlock.drill_textBlock_getBlockParam();
		if( blockParam['alignHor_rightCut'] == true ){
			return i;
		}
	}
	return -1;
};
//==============================
// * 对齐方式 - 切断对齐 - 获取 纵向居中位置
//
//			说明：	> 需要在单行块列表中，找到第一个符合的单行块。
//==============================
Game_Temp.prototype.drill_COCD_getAlignVerCenterIndex = function( rowBlock_list ){
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		
		for( var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var blockParam = textBlock.drill_textBlock_getBlockParam();
			if( blockParam['alignVer_centerCut'] == true ){
				return i;
			}
		}
	}
	return -1;
};
//==============================
// * 对齐方式 - 切断对齐 - 获取 纵向右对齐位置
//
//			说明：	> 需要在单行块列表中，找到第一个符合的单行块。
//==============================
Game_Temp.prototype.drill_COCD_getAlignVerRightIndex = function( rowBlock_list ){
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		
		for( var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var blockParam = textBlock.drill_textBlock_getBlockParam();
			if( blockParam['alignVer_rightCut'] == true ){
				return i;
			}
		}
	}
	return -1;
};

//==============================
// * 对齐方式 - 解析底层字符 - 位置X叠加（继承）
//==============================
var _drill_COCD_align_setupOffsetX = Game_Temp.prototype.drill_COCD_setupOffsetX;
Game_Temp.prototype.drill_COCD_setupOffsetX = function( rowBlock_list, infoParam ){
	_drill_COCD_align_setupOffsetX.call( this, rowBlock_list, infoParam );
	this.drill_COCD_addPositionX( rowBlock_list, infoParam );
}
//==============================
// * 对齐方式 - 解析底层字符 - 位置X叠加
//			
//			说明：	> 先找空隙，然后根据索引位置，对指定的 字符块 进行空隙偏移叠加。
//==============================
Game_Temp.prototype.drill_COCD_addPositionX = function( rowBlock_list, infoParam ){
	
	// > 找到 对齐宽度
	var maxWidth = infoParam['box_width'];
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var rowParam = rowBlock.drill_rowBlock_getRowParam();
		if( rowParam['alignHor_maxWidth'] != undefined ){	//（只要有一个单行块配置了宽度，则用此宽度）
			maxWidth = rowParam['alignHor_maxWidth'];
			break;
		}
	}
	
	// > 位置X叠加
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var rowParam = rowBlock.drill_rowBlock_getRowParam();
		
		
		// > 横向对齐的空隙
		var rowSpace = maxWidth;							//对齐宽度
		rowSpace -= rowBlock.drill_rowBlock_getRowWidth();	//减去字符全宽度
		if( rowSpace < 0 ){ rowSpace = 0; }					//剩下的空隙如果为负数，那么就不要加空隙了
		
		// > 切断对齐（横向）
		var right_index = rowBlock.drill_rowBlock_getAlignHorRightIndex();
		var center_index = rowBlock.drill_rowBlock_getAlignHorCenterIndex();
		
		
		// > 位置X叠加
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for(var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var cur_x = textBlock.drill_textBlock_getX();
			
			// > 判断 - 切断对齐时 - 横向右对齐（@@@-a4）
			if( right_index != -1 ){
				if( j >= right_index ){		//（右对齐设置优先于居中）
					cur_x += rowSpace;
					textBlock.drill_textBlock_setX( cur_x );
					continue;
				}
			}	
			// > 判断 - 切断对齐时 - 横向居中（@@@-a3）
			if( center_index != -1 ){
				if( j >= center_index ){
					cur_x += 0.5 * rowSpace;
					textBlock.drill_textBlock_setX( cur_x );
					continue;
				}
			}
			
			// > 判断 - 整体对齐时 - 横向左对齐（@@@-a0）
			//	（不操作）
			
			// > 判断 - 整体对齐时 - 横向居中（@@@-a1）
			if( rowParam['alignHor_type'] == "center" ){
				cur_x += 0.5 * rowSpace;
				textBlock.drill_textBlock_setX( cur_x );
				continue;
			}
			
			// > 判断 - 整体对齐时 - 横向右对齐（@@@-a2）
			if( rowParam['alignHor_type'] == "right" ){
				cur_x += rowSpace;
				textBlock.drill_textBlock_setX( cur_x );
				continue;
			}
		}
	}
}
//==============================
// * 对齐方式 - 解析底层字符 - 位置Y叠加（继承）
//==============================
var _drill_COCD_align_setupOffsetY = Game_Temp.prototype.drill_COCD_setupOffsetY;
Game_Temp.prototype.drill_COCD_setupOffsetY = function( rowBlock_list, infoParam ){
	_drill_COCD_align_setupOffsetY.call( this, rowBlock_list, infoParam );
	this.drill_COCD_addPositionY( rowBlock_list, infoParam );
}
//==============================
// * 对齐方式 - 解析底层字符 - 位置Y叠加
//			
//			说明：	> 先找空隙，然后根据索引位置，对指定的 单行块 进行空隙偏移叠加。
//==============================
Game_Temp.prototype.drill_COCD_addPositionY = function( rowBlock_list, infoParam ){
	
	// > 找到 对齐高度
	var maxHeight = infoParam['box_height'];
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var rowParam = rowBlock.drill_rowBlock_getRowParam();
		if( rowParam['alignVer_maxHeight'] != undefined ){	//（只要有一个单行块配置了高度，则用此高度）
			maxHeight = rowParam['alignVer_maxHeight'];
			break;
		}
	}
	
	// > 切断对齐（纵向）
	var right_index = $gameTemp.drill_COCD_getAlignVerRightIndex( rowBlock_list );
	var center_index = $gameTemp.drill_COCD_getAlignVerCenterIndex( rowBlock_list );
	
	// > 总高度
	var all_height = 0;
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		all_height += rowBlock.drill_rowBlock_getRowHeight();
	}
		
	// > 位置Y叠加
	for(var i = 0; i < rowBlock_list.length; i++ ){
		var rowBlock = rowBlock_list[i];
		var rowParam = rowBlock.drill_rowBlock_getRowParam();
		
		
		// > 纵向对齐的空隙
		var colSpace = maxHeight;							//对齐高度
		colSpace -= all_height;								//减去字符总高度
		if( colSpace < 0 ){ colSpace = 0; }					//剩下的空隙如果为负数，那么就不要加空隙了
		
		
		// > 判断说明
		//		（注意，此处的 @@@-a6 == @@@-a8，虽然实现不一样，但功能一模一样）
		//		（注意，此处的 @@@-a7 == @@@-a9，虽然实现不一样，但功能一模一样）
		//		（也没有必要将相同功能合并，区分实现 切断对齐 和 整体对齐 至少思路不会乱）
		
		
		// > 判断 - 切断对齐时 - 纵向底部对齐（@@@-a9）
		var add_y = 0;
		if( add_y == 0 && right_index != -1 ){
			if( i >= right_index ){		//（底部对齐设置优先于居中）
				add_y = colSpace;
			}
		}
		
		// > 判断 - 切断对齐时 - 纵向居中（@@@-a8）
		if( add_y == 0 && center_index != -1 ){
			if( i >= center_index ){
				add_y = 0.5 * colSpace;
			}
		}
		
		
		// > 判断 - 整体对齐时 - 纵向顶部对齐（@@@-a5）
		//	（不操作）
		
		// > 判断 - 整体对齐时 - 纵向居中（@@@-a6）
		if( add_y == 0 && rowParam['alignVer_type'] == "center" ){
			add_y = 0.5 * colSpace;
		}
		
		// > 判断 - 整体对齐时 - 纵向底部对齐（@@@-a7）
		if( add_y == 0 && rowParam['alignVer_type'] == "bottom" ){
			add_y = colSpace;
		}
		
		
		// > 位置Y叠加
		var textBlock_list = rowBlock.drill_rowBlock_getTextBlockList();
		for(var j = 0; j < textBlock_list.length; j++ ){
			var textBlock = textBlock_list[j];
			var cur_y = textBlock.drill_textBlock_getY();
			cur_y += add_y;
			textBlock.drill_textBlock_setY( cur_y );
		}
	}
}


//=============================================================================
// ** ☆DEBUG对齐方式显示
//
//			说明：	> 此模块控制 DEBUG对齐方式显示 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG对齐方式显示 - 帧刷新（地图界面）
//==============================
var _drill_COCD_debugAlignMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COCD_debugAlignMap_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_COCD_Align_DebugEnabled == true ){
		$gameTemp._drill_COCD_Align_DebugEnabled = undefined;
		this.drill_COCD_Align_createDebugSprite();
	}
	
	// > 销毁贴图
	if( $gameTemp._drill_COCD_Align_DebugEnabled == false ){
		$gameTemp._drill_COCD_Align_DebugEnabled = undefined;
		if( this._drill_COCD_Align_DebugSprite_1 != undefined ){
			this.removeChild(this._drill_COCD_Align_DebugSprite_1);
			this._drill_COCD_Align_DebugSprite_1 = undefined;
		}
		if( this._drill_COCD_Align_DebugSprite_2 != undefined ){
			this.removeChild(this._drill_COCD_Align_DebugSprite_2);
			this._drill_COCD_Align_DebugSprite_2 = undefined;
		}
	}
}
//==============================
// * DEBUG对齐方式显示 - 创建贴图
//==============================
Scene_Map.prototype.drill_COCD_Align_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_COCD_Align_DebugSprite_1 != undefined ){
		this.removeChild(this._drill_COCD_Align_DebugSprite_1);
		this._drill_COCD_Align_DebugSprite_1 = undefined;
	}
	if( this._drill_COCD_Align_DebugSprite_2 != undefined ){
		this.removeChild(this._drill_COCD_Align_DebugSprite_2);
		this._drill_COCD_Align_DebugSprite_2 = undefined;
	}
	
	// > 创建贴图1
	var temp_bitmap = new Bitmap( 320, 280 );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 60;
	temp_debugSprite.y = 140;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.7)");
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_Align_DebugSprite_1 = temp_debugSprite;
	
	// > 绘制 - 准备绘制配置
	var options = {};
	
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	options['baseParam'] = {};
	options['baseParam']['fontSize'] = 18;
	options['baseParam']['drawDebugBaseRect'] = true;
	
	options['rowParam'] = {};
	options['rowParam']['drawDebugBoxRect'] = true;
	//options['rowParam']['alignHor_maxWidth'] = temp_bitmap.width -10;
	//options['rowParam']['alignVer_maxHeight'] = temp_bitmap.height -10;
	
	// > 绘制 - 准备绘制配置
	$gameTemp.drill_COCD_initOptions( options, temp_bitmap );
	//	（此处没有走正规的流程，而是零散使用）
	//	（不要参考这里的绘制函数！会出很多问题！去看 drill_COCD_drawText 函数的流程！）
	
	// > 绘制 - 对齐方式
	var text =  "【" + DrillUp.g_COCD_PluginTip_curName + "】@@@-br" + 
				"》测试对齐方式：@@@-br" + 
				"左上角@@@-a3正上方@@@-a4右上角@@@-br" + 
				"@@@-a6正左方@@@-a3居中@@@-a4正右方@@@-br" + 
				"@@@-a7左下角@@@-a3正下方@@@-a4右下角" ;
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify( options )) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	
	
	// > 创建贴图2
	var temp_window = new Window_Base( 420, 140, 320, 280 );
	this.addChild( temp_window );	//（直接加在最顶层的上面）
	this._drill_COCD_Align_DebugSprite_2 = temp_window;
	
	// > 绘制 - 矩形
	var temp_bitmap = temp_window.contents;
	temp_bitmap.drill_COCD_strokeRect( 0, 0, temp_bitmap.width, temp_bitmap.height, "#22aa22", 2, "miter" );
	
	// > 绘制 - 准备绘制配置
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify( options )) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
}
	
	
//=============================================================================
// ** ☆行高控制
//
//			说明：	> 该模块专门提供 行高控制 的设置。本质上就是在位置分配后再进行一轮分配。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 行高控制 - 样式阶段-配置阶段（继承）
//==============================
var _drill_COCD_lineHeight_textBlock_processStyle = Game_Temp.prototype.drill_COCD_textBlock_processStyle;
Game_Temp.prototype.drill_COCD_textBlock_processStyle = function( command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_lineHeight_textBlock_processStyle.call( this, command, args, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 后面行-行上增高（@@@-l1[10]） lineHeight_1
	if( command.toLowerCase() == "@@@-l1" ){
		if( args.length == 1 ){
			cur_rowParam['lineHeight_up'] = Number(args[0]);				//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 后面行-行下增高（@@@-l2[10]） lineHeight_2
	//		（只有这个是向下扩，其它都是向上扩）
	if( command.toLowerCase() == "@@@-l2" ){
		if( args.length == 1 ){
			cur_rowParam['lineHeight_down'] = Number(args[0]);				//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 后面行-锁定行高（@@@-l3[24]） lineHeight_3
	if( command.toLowerCase() == "@@@-l3" ){
		if( args.length == 1 ){
			cur_rowParam['lineHeight_lock'] = Number(args[0]);				//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 后面行-行上补正（@@@-l4[24]） lineHeight_4
	if( command.toLowerCase() == "@@@-l4" ){
		if( args.length == 1 ){
			cur_rowParam['lineHeight_upCorrection'] = Number(args[0]);		//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	
	// > 『底层字符定义』 - 当前行-行上增高（@@@-l5[10]） lineHeight_5
	if( command.toLowerCase() == "@@@-l5" ){
		if( args.length == 1 ){
			cur_rowParam['lineHeight_upOnce'] = Number(args[0]);			//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 当前行-行下增高（@@@-l6[10]） lineHeight_6
	//		（只有这个是向下扩，其它都是向上扩）
	if( command.toLowerCase() == "@@@-l6" ){
		if( args.length == 1 ){
			cur_rowParam['lineHeight_downOnce'] = Number(args[0]);			//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 当前行-锁定行高（@@@-l7[24]） lineHeight_7
	if( command.toLowerCase() == "@@@-l7" ){
		if( args.length == 1 ){
			cur_rowParam['lineHeight_lockOnce'] = Number(args[0]);			//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
	// > 『底层字符定义』 - 当前行-行上补正（@@@-l8[24]） lineHeight_8
	if( command.toLowerCase() == "@@@-l8" ){
		if( args.length == 1 ){
			cur_rowParam['lineHeight_upCorrectionOnce'] = Number(args[0]);	//（底层单行配置）
			this.drill_COCD_textBlock_submitStyle();
			return;
		}
	}
}
//==============================
// * 行高控制 - 样式阶段-回滚样式（继承）
//==============================
var _drill_COCD_lineHeight_textBlock_restoreStyle = Game_Temp.prototype.drill_COCD_textBlock_restoreStyle;
Game_Temp.prototype.drill_COCD_textBlock_restoreStyle = function( cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_lineHeight_textBlock_restoreStyle.call( this, cur_infoParam, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符样式回滚』 - 后面行-行上增高（@@@-l1[10]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 后面行-行下增高（@@@-l2[10]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 后面行-锁定行高（@@@-l3[24]）
	//	（不操作）
	// > 『底层字符样式回滚』 - 后面行-行上补正（@@@-l4[24]）
	//	（不操作）
	
	// > 『底层字符样式回滚』 - 当前行-行上增高（@@@-l5[10]）
	cur_rowParam['lineHeight_upOnce'] = undefined;				//（底层单行配置）
	
	// > 『底层字符样式回滚』 - 当前行-行下增高（@@@-l6[10]）
	cur_rowParam['lineHeight_downOnce'] = undefined;			//（底层单行配置）
	
	// > 『底层字符样式回滚』 - 当前行-锁定行高（@@@-l7[24]）
	cur_rowParam['lineHeight_lockOnce'] = undefined;			//（底层单行配置）
	
	// > 『底层字符样式回滚』 - 当前行-行上补正（@@@-l8[24]）
	cur_rowParam['lineHeight_upCorrectionOnce'] = undefined;	//（底层单行配置）
}
//==============================
// * 行高控制 - 获取行高度（继承）
//==============================
var _drill_COCD_lineHeight_rowBlock_getRowHeight = Drill_COCD_RowBlock.prototype.drill_rowBlock_getRowHeight;
Drill_COCD_RowBlock.prototype.drill_rowBlock_getRowHeight = function(){
	var height = _drill_COCD_lineHeight_rowBlock_getRowHeight.call( this );
	var rowParam = this._drill_rb_rowParam;
	
	// > 行上增高
	var lineHeight_up = 0;
	if( rowParam['lineHeight_up'] != undefined &&
		rowParam['lineHeight_up'] > 0 ){
		lineHeight_up = rowParam['lineHeight_up'];
	}
	if( rowParam['lineHeight_upOnce'] != undefined &&
		rowParam['lineHeight_upOnce'] > 0 ){
		lineHeight_up = rowParam['lineHeight_upOnce'];
	}
	
	// > 行下增高
	var lineHeight_down = 0;
	if( rowParam['lineHeight_down'] != undefined &&
		rowParam['lineHeight_down'] > 0 ){
		lineHeight_down = rowParam['lineHeight_down'];
	}
	if( rowParam['lineHeight_downOnce'] != undefined &&
		rowParam['lineHeight_downOnce'] > 0 ){
		lineHeight_down = rowParam['lineHeight_downOnce'];
	}
	
	// > 锁定行高
	var lineHeight_lock = 0;
	if( rowParam['lineHeight_lock'] != undefined &&
		rowParam['lineHeight_lock'] > 0 ){
		lineHeight_lock = rowParam['lineHeight_lock'];
	}
	if( rowParam['lineHeight_lockOnce'] != undefined &&
		rowParam['lineHeight_lockOnce'] > 0 ){
		lineHeight_lock = rowParam['lineHeight_lockOnce'];
	}
	
	// > 行上补正
	var lineHeight_upCorrection = 0;
	if( rowParam['lineHeight_upCorrection'] != undefined &&
		rowParam['lineHeight_upCorrection'] > 0 ){
		lineHeight_upCorrection = rowParam['lineHeight_upCorrection'];
	}
	if( rowParam['lineHeight_upCorrectionOnce'] != undefined &&
		rowParam['lineHeight_upCorrectionOnce'] > 0 ){
		lineHeight_upCorrection = rowParam['lineHeight_upCorrectionOnce'];
	}
	if( lineHeight_upCorrection > height ){
		var up_correction = lineHeight_upCorrection - height;
		if( lineHeight_up < up_correction ){
			lineHeight_up = up_correction;
		}
	}
	
	if( lineHeight_up > 0   ){ height += lineHeight_up;   }
	if( lineHeight_down > 0 ){ height += lineHeight_down; }
	if( lineHeight_lock > 0 ){ height = lineHeight_lock;  }
	
	return height;
}


//=============================================================================
// ** ☆DEBUG行高控制显示
//
//			说明：	> 此模块控制 DEBUG行高控制显示 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG行高控制显示 - 帧刷新（地图界面）
//==============================
var _drill_COCD_debugLineHeightMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COCD_debugLineHeightMap_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_COCD_LineHeight_DebugEnabled == true ){
		$gameTemp._drill_COCD_LineHeight_DebugEnabled = undefined;
		this.drill_COCD_LineHeight_createDebugSprite();
	}
	
	// > 销毁贴图
	if( $gameTemp._drill_COCD_LineHeight_DebugEnabled == false ){
		$gameTemp._drill_COCD_LineHeight_DebugEnabled = undefined;
		if( this._drill_COCD_LineHeight_DebugSprite != undefined ){
			this.removeChild(this._drill_COCD_LineHeight_DebugSprite);
			this._drill_COCD_LineHeight_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG行高控制显示 - 创建贴图
//==============================
Scene_Map.prototype.drill_COCD_LineHeight_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_COCD_LineHeight_DebugSprite != undefined ){
		this.removeChild(this._drill_COCD_LineHeight_DebugSprite);
		this._drill_COCD_LineHeight_DebugSprite = undefined;
	}
	
	// > 创建贴图1
	var temp_bitmap = new Bitmap( 700, 500 );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 60;
	temp_debugSprite.y = 60;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.7)");
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_LineHeight_DebugSprite = temp_debugSprite;
	
	// > 绘制 - 准备绘制配置
	var options = {};
	
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	options['baseParam'] = {};
	options['baseParam']['fontSize'] = 18;
	options['baseParam']['drawDebugBaseRect'] = true;
	
	options['rowParam'] = {};
	options['rowParam']['drawDebugRowRect'] = true;
	
	// > 绘制 - 准备绘制配置
	$gameTemp.drill_COCD_initOptions( options, temp_bitmap );
	//	（此处没有走正规的流程，而是零散使用）
	//	（不要参考这里的绘制函数！会出很多问题！去看 drill_COCD_drawText 函数的流程！）
	
	// > 绘制 - 对齐方式
	var text =  "【" + DrillUp.g_COCD_PluginTip_curName + "】@@@-br" + 
				"默认行高为20像素，接下来开始进行增高、锁定、补正，留意下列行高值。@@@-br" + 
				"        @@@-br" + 
				
				"》》测试-行上增高：@@@-br" + 
				"    @@@-l1[12]测试的字符，行上增高[12]。     @@@-br" + 
				"    测试的字符，行上增高[12]。     @@@-br@@@-l1[0]" + 
				"    @@@-l5[18]测试的字符，行上增高[18]。     @@@-br" + 
				"    测试的字符，没有行高效果的行。     @@@-br" +
				"        @@@-br" + 
				
				"》》测试-行下增高：@@@-br" + 
				"    @@@-l2[12]测试的字符，行下增高[12]。     @@@-br" + 
				"    测试的字符，行下增高[12]。     @@@-br@@@-l2[0]" + 
				"    @@@-l6[18]测试的字符，行下增高[18]。     @@@-br" + 
				"    测试的字符，没有行高效果的行。     @@@-br" ;
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify( options )) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
	
	// > 绘制 - 对齐方式
	options['infoParam']['x'] = 340;
	options['infoParam']['y'] = 0;
	var text =  "@@@-br" + 
				"@@@-br" + 
				"@@@-br" +
				
				"》》测试-锁定行高：@@@-br" + 
				"    @@@-l3[28]测试的字符，锁定行高[28]。     @@@-br" + 
				"    测试的字符，@@@-fs[36]测试的字符@@@-fr。     @@@-br@@@-l3[0]" + 
				"    @@@-l7[32]测试的字符，锁定行高[32]。     @@@-br" + 
				"    测试的字符，没有行高效果的行。     @@@-br" + 
				"        @@@-br" + 
				
				"》》测试-行上补正：@@@-br" + 
				"    @@@-l4[32]测试的字符，行上补正[32]。     @@@-br" + 
				"    测试的字符，@@@-fs[36]测试的字符@@@-fr。     @@@-br@@@-l4[0]" + 
				"    @@@-l8[36]测试的字符，行上补正[36]。     @@@-br" + 
				"    测试的字符，没有行高效果的行。     @@@-br";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify( options )) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
}


//=============================================================================
// ** ☆图标字符
//
//			说明：	> 该模块专门提供 图标字符 的设置。本质上就是在绘制时，将当前字符块变成固定大小的图标符号。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图标字符 - 再处理阶段-配置阶段（继承）
//==============================
var _drill_COCD_COCD_icon_textBlock_processSecond = Game_Temp.prototype.drill_COCD_textBlock_processSecond;
Game_Temp.prototype.drill_COCD_textBlock_processSecond = function( command, args, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_COCD_icon_textBlock_processSecond.call( this, command, args, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 图标字符（@@@-ic[0]） icon
	if( command.toLowerCase() == "@@@-ic" ){
		if( args.length == 1 ){
			cur_baseParam['iconIndex'] = Number(args[0]);	//（基础字符配置）
			this.drill_COCD_textBlock_submitSecond( "@" );	//（必须提交一个字符）
			return;
		}
	}
}
//==============================
// * 图标字符 - 基础字符 - 默认值（继承）
//==============================
var _drill_COCD_COCD_icon_drawBaseText_initParam = Game_Temp.prototype.drill_COCD_drawBaseText_initParam;
Game_Temp.prototype.drill_COCD_drawBaseText_initParam = function( baseParam ){
	_drill_COCD_COCD_icon_drawBaseText_initParam.call( this, baseParam );
	if( baseParam['iconIndex'] == undefined ){ baseParam['iconIndex'] = -1 };		//绘制的图标索引
}
//==============================
// * 图标字符 - 基础字符 - 获取文本宽度（半覆写）
//==============================
var _drill_COCD_COCD_icon_measureBaseTextWidth_Private = Game_Temp.prototype.drill_COCD_measureBaseTextWidth_Private;
Game_Temp.prototype.drill_COCD_measureBaseTextWidth_Private = function( painter, text, baseParam ){
	
	// > 图标情况时（直接返回宽度值，因为图标是固定的正方形）
	if( baseParam['iconIndex'] >= 0 ){
		return baseParam['fontSize'] *1.10;		//『手算高度』
		
	// > 原函数
	}else{
		return _drill_COCD_COCD_icon_measureBaseTextWidth_Private.call( this, painter, text, baseParam );
	}
}
//==============================
// * 图标字符 - 基础字符 - 获取文本高度（半覆写）
//==============================
var _drill_COCD_COCD_icon_measureBaseTextHeight_Private = Game_Temp.prototype.drill_COCD_measureBaseTextHeight_Private;
Game_Temp.prototype.drill_COCD_measureBaseTextHeight_Private = function( painter, text, baseParam ){
	
	// > 图标情况时（直接返回高度值，因为图标是固定的正方形）
	if( baseParam['iconIndex'] >= 0 ){
		return baseParam['fontSize'] *1.10;		//『手算高度』
		
	// > 原函数
	}else{
		return _drill_COCD_COCD_icon_measureBaseTextHeight_Private.call( this, painter, text, baseParam );
	}
}
//==============================
// * 图标字符 - 基础字符 - 绘制基础字符（半覆写）
//==============================
var _drill_COCD_COCD_icon_drawBaseText_Private = Bitmap.prototype.drill_COCD_drawBaseText_Private;
Bitmap.prototype.drill_COCD_drawBaseText_Private = function( text, x, y, baseParam ){
	
	// > 图标情况时
	if( baseParam['iconIndex'] >= 0 ){
		
		// > 图标情况时 - 『绘制过程定义』 - 图标字符（@@@-ic[0]）
		this.drill_COCD_drawBaseText_Icon( baseParam['iconIndex'], x, y, baseParam );
		
	// > 原函数
	}else{
		_drill_COCD_COCD_icon_drawBaseText_Private.call( this, text, x, y, baseParam );
	}
}
//==============================
// * 图标字符 - 基础字符 - 绘制基础字符 - 绘制图标
//==============================
Bitmap.prototype.drill_COCD_drawBaseText_Icon = function( iconIndex, x, y, baseParam ){
	
	// > 开始绘制 图标
	var painter = this._context;
	var bitmap = ImageManager.loadSystem('IconSet');	//（IconSet在启动界面就被加载了，见函数 Scene_Boot.loadSystemImages）
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	var size = baseParam['fontSize'] *1.10;				//『手算高度』（图标大小就是字符高度）
	y -= size;
	
	var last_enabled = painter.imageSmoothingEnabled;
	painter.imageSmoothingEnabled = false;
	this.blt(bitmap, sx, sy, pw, ph, x, y, size, size);
	painter.imageSmoothingEnabled = last_enabled;
}


//=============================================================================
// ** ☆分割线字符
//
//			说明：	> 该模块专门提供 分割线字符 的设置。本质上就是在绘制时，将当前字符块变成固定大小的直线。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 分割线字符 - 再处理阶段-配置阶段（继承）
//==============================
var _drill_COCD_COCD_sep_textBlock_processSecond = Game_Temp.prototype.drill_COCD_textBlock_processSecond;
Game_Temp.prototype.drill_COCD_textBlock_processSecond = function( command, args, cur_baseParam, cur_blockParam, cur_rowParam ){
	_drill_COCD_COCD_sep_textBlock_processSecond.call( this, command, args, cur_baseParam, cur_blockParam, cur_rowParam );
	
	// > 『底层字符定义』 - 分割线字符（@@@-is[one:1:#eef]） individually_separate
	if( command.toLowerCase() == "@@@-is" ){
		if( args.length == 3 ){
			if( String(args[0]) == "one" || 
				String(args[0]) == "two" || 
				String(args[0]) == "three" ){
				cur_baseParam['sepType'] = String(args[0]);
				cur_baseParam['sepThickness'] = Number(args[1]);
				cur_baseParam['sepColor'] = String(args[2]);
				this.drill_COCD_textBlock_submitSecond( "@" );	//（必须提交一个字符）
				return;
			}
		}
	}
}
//==============================
// * 分割线字符 - 基础字符 - 默认值（继承）
//==============================
var _drill_COCD_COCD_sep_drawBaseText_initParam = Game_Temp.prototype.drill_COCD_drawBaseText_initParam;
Game_Temp.prototype.drill_COCD_drawBaseText_initParam = function( baseParam ){
	_drill_COCD_COCD_sep_drawBaseText_initParam.call( this, baseParam );
	if( baseParam['sepType'] == undefined ){ baseParam['sepType'] = "" };				//分割线类型
	if( baseParam['sepThickness'] == undefined ){ baseParam['sepThickness'] = 1 };		//分割线厚度
	if( baseParam['sepColor'] == undefined ){ baseParam['sepColor'] = "#ffffff" };		//分割线颜色
}
//==============================
// * 分割线字符 - 基础字符 - 获取文本宽度（半覆写）
//==============================
var _drill_COCD_COCD_sep_measureBaseTextWidth_Private = Game_Temp.prototype.drill_COCD_measureBaseTextWidth_Private;
Game_Temp.prototype.drill_COCD_measureBaseTextWidth_Private = function( painter, text, baseParam ){
	
	// > 分割线情况时
	//		（直接给一个零宽度值，因为非零会影响窗口自适应功能）
	//		（注意，这个分割线字符不能放在多列的选项中，因为绘制会超长出界）
	if( baseParam['sepType'] != undefined &&
		baseParam['sepType'] != "" ){
		return 0;
		
	// > 原函数
	}else{
		return _drill_COCD_COCD_sep_measureBaseTextWidth_Private.call( this, painter, text, baseParam );
	}
}
//==============================
// * 分割线字符 - 基础字符 - 获取文本高度（半覆写）
//==============================
var _drill_COCD_COCD_sep_measureBaseTextHeight_Private = Game_Temp.prototype.drill_COCD_measureBaseTextHeight_Private;
Game_Temp.prototype.drill_COCD_measureBaseTextHeight_Private = function( painter, text, baseParam ){
	
	// > 分割线情况时（直接返回高度值）
	if( baseParam['sepType'] != undefined &&
		baseParam['sepType'] != "" ){
		return baseParam['fontSize'] *1.10;		//『手算高度』
		
	// > 原函数
	}else{
		return _drill_COCD_COCD_sep_measureBaseTextHeight_Private.call( this, painter, text, baseParam );
	}
}
//==============================
// * 分割线字符 - 基础字符 - 绘制基础字符（半覆写）
//==============================
var _drill_COCD_COCD_sep_drawBaseText_Private = Bitmap.prototype.drill_COCD_drawBaseText_Private;
Bitmap.prototype.drill_COCD_drawBaseText_Private = function( text, x, y, baseParam ){
	
	// > 分割线情况时
	if( baseParam['sepType'] != undefined &&
		baseParam['sepType'] != "" ){
		
		// > 分割线情况时 - 『绘制过程定义』 - 分割线字符（@@@-is[one:1:#eef]）
		this.drill_COCD_drawBaseText_Sep( baseParam['sepType'], baseParam['sepThickness'], baseParam['sepColor'], x, y, baseParam );
		
	// > 原函数
	}else{
		_drill_COCD_COCD_sep_drawBaseText_Private.call( this, text, x, y, baseParam );
	}
}
//==============================
// * 分割线字符 - 基础字符 - 绘制基础字符 - 绘制分割线
//==============================
Bitmap.prototype.drill_COCD_drawBaseText_Sep = function( sepType, thickness, color, x, y, baseParam ){
	var height = baseParam['fontSize'] *1.10;		//『手算高度』
	y -= (height - thickness)*0.5;
	y = Math.floor(y);
	
	x = 0;	//（强制置零，因为居中、右对齐会影响绘制的起始位置）
	
	// > 绘制 - 矩形
	if( baseParam['sepType'] == "one" ){
		this.drill_COCD_fillRect( x, y, this.width, thickness, color );
	}
	if( baseParam['sepType'] == "two" ){
		this.drill_COCD_fillRect( x, y -thickness, this.width, thickness, color );
		this.drill_COCD_fillRect( x, y +thickness, this.width, thickness, color );
	}
	if( baseParam['sepType'] == "three" ){
		this.drill_COCD_fillRect( x, y -thickness*2, this.width, thickness, color );
		this.drill_COCD_fillRect( x, y, this.width, thickness, color );
		this.drill_COCD_fillRect( x, y +thickness*2, this.width, thickness, color );
	}
}



//=============================================================================
// ** ☆DEBUG字符混合
//
//			说明：	> 此模块控制 DEBUG字符混合 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG字符混合 - 帧刷新（地图界面）
//==============================
var _drill_COCD_debugMixMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COCD_debugMixMap_update.call(this);
	
	// > 创建贴图
	if( $gameTemp._drill_COCD_Mix_DebugEnabled == true ){
		$gameTemp._drill_COCD_Mix_DebugEnabled = undefined;
		this.drill_COCD_Mix_createDebugSprite();
	}
	
	// > 销毁贴图
	if( $gameTemp._drill_COCD_Mix_DebugEnabled == false ){
		$gameTemp._drill_COCD_Mix_DebugEnabled = undefined;
		if( this._drill_COCD_Mix_DebugSprite != undefined ){
			this.removeChild(this._drill_COCD_Mix_DebugSprite);
			this._drill_COCD_Mix_DebugSprite = undefined;
		}
	}
}
//==============================
// * DEBUG字符混合 - 创建贴图
//==============================
Scene_Map.prototype.drill_COCD_Mix_createDebugSprite = function() {
	
	// > 销毁贴图
	if( this._drill_COCD_Mix_DebugSprite != undefined ){
		this.removeChild(this._drill_COCD_Mix_DebugSprite);
		this._drill_COCD_Mix_DebugSprite = undefined;
	}
	
	// > 创建贴图
	var temp_bitmap = new Bitmap( 700, 500 );
	var temp_debugSprite = new Sprite();
	temp_debugSprite.x = 60;
	temp_debugSprite.y = 60;
	temp_debugSprite.bitmap = temp_bitmap;
	temp_debugSprite.bitmap.fillAll("rgba(0,0,0,0.7)");
	this.addChild( temp_debugSprite );	//（直接加在最顶层的上面）
	this._drill_COCD_Mix_DebugSprite = temp_debugSprite;
	
	// > 绘制 - 准备绘制配置
	var options = {};
	
	options['infoParam'] = {};
	options['infoParam']['x'] = 0;
	options['infoParam']['y'] = 0;
	options['infoParam']['canvasWidth'] = temp_bitmap.width;
	options['infoParam']['canvasHeight'] = temp_bitmap.height;
	
	options['baseParam'] = {};
	options['baseParam']['fontSize'] = 18;
	options['baseParam']['drawDebugBaseRect'] = true;
	
	// > 绘制 - 准备绘制配置
	$gameTemp.drill_COCD_initOptions( options, temp_bitmap );
	//	（此处没有走正规的流程，而是零散使用）
	//	（不要参考这里的绘制函数！会出很多问题！去看 drill_COCD_drawText 函数的流程！）
	
	// > 绘制 - 对齐方式
	var text =  "【" + DrillUp.g_COCD_PluginTip_curName + "】@@@-br" + 
				"当前为混合测试，将特殊字符混合在一起，看看其兼容性情况。@@@-br" + 
				"        @@@-br" + 
				
				"》》测试-三个空行：@@@-br" + 
				"  ---@@@-br" + 
				"@@@-br@@@-br@@@-br" + 
				"  ---@@@-br" + 
				
				"》》测试-空行+图标+空行：@@@-br" + 
				"@@@-br@@@-ic[9]@@@-br@@@-br" + //（末尾的@@@-br是用来换行的，必须写）
				"  ---@@@-br" + 
				"@@@-br字@@@-ic[9]@@@-br@@@-br" + 
				"  ---@@@-br" + 
				"@@@-br@@@-ic[9]字@@@-br@@@-br" + 
				"  ---@@@-br";
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, JSON.parse(JSON.stringify( options )) );
	for(var i = 0; i < rowBlock_list.length; i++){
		temp_bitmap.drill_COCD_drawRowBlock( rowBlock_list[i] );		//（绘制字符块）
	}
}
	
	
	
//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*  管辖 - 文本绘制
//==============================
// * C画布『系统-字符绘制核心』 - 文本绘制 - 绘制文本内容（开放函数）
//			
//			参数：	> text 字符串    （目标文本）
//					> x, y 数字      （文本位置）
//					> maxWidth 数字  （最大宽度值）
//					> lineHeight 数字（行高）
//					> align 字符串   （对齐方式，left/center/right）
//			返回：	> 无
//==============================
Bitmap.prototype.drawText = function( text, x, y, maxWidth, lineHeight, align ){
    // Note: Firefox has a bug with textBaseline: Bug 737852
    //       So we use 'alphabetic' here.
    if( text !== undefined ){
        var tx = x;
        var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
        var context = this._context;
        var alpha = context.globalAlpha;
        maxWidth = maxWidth || 0xffffffff;
        if( align === 'center' ){
            tx += maxWidth / 2;
        }
        if( align === 'right' ){
            tx += maxWidth;
        }
        context.save();									//（a.存储上一个画笔状态）
		
        context.font = this._makeFontNameText();		//（b.设置样式）
        context.textAlign = align;
        context.textBaseline = 'alphabetic';
		
		// > 绘制文本描边
        context.globalAlpha = 1;
        this._drawTextOutline(text, tx, ty, maxWidth);	//（c.路径填充/描边，fillText）
        
		// > 绘制文本本体
		context.globalAlpha = alpha;
        this._drawTextBody(text, tx, ty, maxWidth);		//（c.路径填充/描边，strokeText）
        
		context.restore();								//（d.回滚上一个画笔状态）
        this._setDirty();
    }
};
//==============================
// * C画布『系统-字符绘制核心』 - 文本绘制 - 斜体设置
//==============================
Bitmap.prototype._makeFontNameText = function(){
    return (this.fontItalic ? 'Italic ' : '') +
            this.fontSize + 'px ' + this.fontFace;
};
//==============================
// * C画布『系统-字符绘制核心』 - 文本绘制 - 绘制文本本体
//==============================
Bitmap.prototype._drawTextBody = function( text, tx, ty, maxWidth ){
    var context = this._context;
    context.fillStyle = this.textColor;
    context.fillText(text, tx, ty, maxWidth);
};
//==============================
// * C画布『系统-字符绘制核心』 - 文本绘制 - 绘制文本描边
//==============================
Bitmap.prototype._drawTextOutline = function( text, tx, ty, maxWidth ){
    var context = this._context;
    context.strokeStyle = this.outlineColor;
    context.lineWidth = this.outlineWidth;
    context.lineJoin = 'round';
    context.strokeText(text, tx, ty, maxWidth);
};
*/
/*  管辖 - 高宽计算
//==============================
// * C画布『系统-字符绘制核心』 - 文本绘制 - 获取文本宽度（开放函数）
//			
//			参数：	> text 字符串（目标文本）
//			返回：	> 数字（文本宽度值）
//
//			说明：	> 这个函数只被 Window_Base.prototype.textWidth 用到了。
//==============================
Bitmap.prototype.measureTextWidth = function( text ){
    var context = this._context;
    context.save();
    context.font = this._makeFontNameText();
    var width = context.measureText(text).width;
    context.restore();
    return width;
};
*/
	
	
//=============================================================================
// ** ☆管辖权覆写函数
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
//==============================
// * 管辖权覆写函数 - 最后继承1级
//==============================
var _drill_COCD_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_COCD_scene_initialize.call(this);
	
	//==============================
	// * 管辖权覆写函数 - 绘制文本内容（覆写） 『窗口字符旧函数覆写』
	//
	//			说明：	> 覆盖其它非drill插件的影响，确保文本能完美绘制。
	//					> 注意，drill插件如果想继承 Bitmap.prototype.drawText ，去继承函数 Bitmap.prototype.drill_COCD_org_drawText 即可。
	//==============================
	Bitmap.prototype.drawText = function( text, x, y, maxWidth, lineHeight, align ){
		this.drill_COCD_org_drawText( text, x, y, maxWidth, lineHeight, align );
	}
	
	//==============================
	// * 管辖权覆写函数 - 自带参数（继承） 『窗口字符旧函数覆写』
	//			
	//			说明：	> 以防万一，这里给 自带参数 再执行一次初始化赋值。
	//					> 注意，drill插件如果想继承 Bitmap.prototype.initialize ，去继承函数 Bitmap.prototype.drill_COCD_org_initBitmapDefault 即可。
	//==============================
	var _drill_COCD_bitmap_initialize = Bitmap.prototype.initialize;
	Bitmap.prototype.initialize = function( width, height ){
		_drill_COCD_bitmap_initialize.call( this, width, height );
		this.drill_COCD_org_initBitmapDefault();		//自带参数初始化
	}
}
//==============================
// * 管辖权覆写函数 - 绘制文本内容
//			
//			参数：	> text 字符串    （目标文本）
//					> x, y 数字      （文本位置）
//					> maxWidth 数字  （最大宽度值）
//					> lineHeight 数字（行高）
//					> align 字符串   （对齐方式，left/center/right）
//			返回：	> 无
//==============================
Bitmap.prototype.drill_COCD_org_drawText = function( text, x, y, maxWidth, lineHeight, align ){
	if( text == undefined ){ return; }
	if( text == "" ){ return; }
	
	// > 参数类型强转
	text       = String(text);
	x          = Number(x);
	y          = Number(y);
	maxWidth   = Number(maxWidth);
	lineHeight = Number(lineHeight);
	align      = String(align);
	
	
	// > 底层参数准备 - 准备绘制配置（初始化）
	var options = {};
	options['infoParam'] = {};
	options['infoParam']['x'] = x;
	options['infoParam']['y'] = y;
	options['infoParam']['canvasWidth'] = this.width;
	options['infoParam']['canvasHeight'] = this.height;
	
	// > 底层参数准备 - 『字符核心流程』 - 准备绘制配置
	$gameTemp.drill_COCD_initOptions( options, this );
	
	// > 底层参数准备 - 准备绘制配置（特殊情况）
	if( align == "center" || align == "right" ){
		options['rowParam']['alignHor_type'] = align;
		options['rowParam']['alignHor_maxWidth'] = maxWidth;
	}
	
	// > 『字符核心流程』 - 解析底层字符
	var rowBlock_list = $gameTemp.drill_COCD_analysisText( text, options );
	
	// > 『字符核心流程』 - 绘制 单行块列表
	for(var i = 0; i < rowBlock_list.length; i++){
		var rowBlock = rowBlock_list[i];
		this.drill_COCD_drawRowBlock( rowBlock );
	}
}
//==============================
// * 管辖权覆写函数 - 自带参数初始化
//==============================
Bitmap.prototype.drill_COCD_org_initBitmapDefault = function(){
	this.textColor = "#ffffff";					//C画布 - 文本绘制 - 文本色
	
	this.outlineEnabled = true;					//C画布 - 文本绘制 - 描边颜色（该插件新加的）
	this.outlineColor = "rgba(0,0,0,0.5)";		//C画布 - 文本绘制 - 描边颜色
	this.outlineWidth = 4;						//C画布 - 文本绘制 - 描边厚度
	
	this.fontBold = false;						//C画布 - 文本绘制 - 是否加粗（该插件新加的）
	this.fontItalic = false;					//C画布 - 文本绘制 - 是否斜体
	this.fontSize = 28;							//C画布 - 文本绘制 - 字体大小
	this.fontFace = "GameFont";					//C画布 - 文本绘制 - 字体类型
}
//==============================
// * 管辖权覆写函数 - 准备绘制配置（继承）
//==============================
var _drill_COCD_COCD_initOptions_2 = Game_Temp.prototype.drill_COCD_initOptions;
Game_Temp.prototype.drill_COCD_initOptions = function( o_data, o_bitmap ){
	_drill_COCD_COCD_initOptions_2.call( this, o_data, o_bitmap );
	
	// > 全局默认值 - 使用值
	if( o_bitmap != undefined ){
		if( o_data['baseParam']['textColor']      == undefined ){ o_data['baseParam']['textColor']      = o_bitmap.textColor;      }	//自带参数（子插件 【窗口字符 - 颜色核心】 自定义扩展该参数，去见模块 全局默认值 ）
		if( o_data['baseParam']['outlineEnabled'] == undefined ){ o_data['baseParam']['outlineEnabled'] = o_bitmap.outlineEnabled; }	//自带参数（子插件 【窗口字符 - 描边效果】 自定义扩展该参数，去见模块 全局默认值 ）
		if( o_data['baseParam']['outlineColor']   == undefined ){ o_data['baseParam']['outlineColor']   = o_bitmap.outlineColor;   }	//自带参数（子插件 【窗口字符 - 描边效果】 自定义扩展该参数，去见模块 全局默认值 ）
		if( o_data['baseParam']['outlineWidth']   == undefined ){ o_data['baseParam']['outlineWidth']   = o_bitmap.outlineWidth;   }	//自带参数（子插件 【窗口字符 - 描边效果】 自定义扩展该参数，去见模块 全局默认值 ）
		if( o_data['baseParam']['fontBold']       == undefined ){ o_data['baseParam']['fontBold']       = o_bitmap.fontBold;       }	//自带参数
		if( o_data['baseParam']['fontItalic']     == undefined ){ o_data['baseParam']['fontItalic']     = o_bitmap.fontItalic;     }	//自带参数
		if( o_data['baseParam']['fontSize']       == undefined ){ o_data['baseParam']['fontSize']       = o_bitmap.fontSize;       }	//自带参数（子插件 【窗口字符 - 字符大小控制器】 自定义扩展该参数，去见模块 全局默认值 ）
		if( o_data['baseParam']['fontFace']       == undefined ){ o_data['baseParam']['fontFace']       = o_bitmap.fontFace;       }	//自带参数（子插件 【窗口字符 - 字体管理器】 自定义扩展该参数，去见模块 全局默认值 ）
	}else{
		//（函数能进这里，说明 o_bitmap 直接被赋值null了，比如 窗口字符贴图核心 的嵌套绘制情况）
		if( o_data['baseParam']['textColor']      == undefined ){ o_data['baseParam']['textColor']      = "#ffffff";         }			//默认值
		if( o_data['baseParam']['outlineEnabled'] == undefined ){ o_data['baseParam']['outlineEnabled'] = true;              }			//默认值
		if( o_data['baseParam']['outlineColor']   == undefined ){ o_data['baseParam']['outlineColor']   = "rgba(0,0,0,0.5)"; }			//默认值
		if( o_data['baseParam']['outlineWidth']   == undefined ){ o_data['baseParam']['outlineWidth']   = 4;                 }			//默认值
		if( o_data['baseParam']['fontBold']       == undefined ){ o_data['baseParam']['fontBold']       = false;             }			//默认值
		if( o_data['baseParam']['fontItalic']     == undefined ){ o_data['baseParam']['fontItalic']     = false;             }			//默认值
		if( o_data['baseParam']['fontSize']       == undefined ){ o_data['baseParam']['fontSize']       = 28;                }			//默认值
		if( o_data['baseParam']['fontFace']       == undefined ){ o_data['baseParam']['fontFace']       = "GameFont";        }			//默认值
	}
	
	// > 重置控制 - 使用值
	//		（在全局默认值之后赋值，这样其它插件就不用管fr_xxx参数有没有值，要不要赋值的问题了）
	if( o_data['baseParam']['fr_textColor']      == undefined ){ o_data['baseParam']['fr_textColor']      = o_data['baseParam']['textColor'];      }	//自带参数（子插件 【窗口字符 - 颜色核心】 自定义扩展该参数，去见模块 全局默认值 ）
	if( o_data['baseParam']['fr_outlineEnabled'] == undefined ){ o_data['baseParam']['fr_outlineEnabled'] = o_data['baseParam']['outlineEnabled']; }	//自带参数（子插件 【窗口字符 - 描边效果】 自定义扩展该参数，去见模块 全局默认值 ）
	if( o_data['baseParam']['fr_outlineColor']   == undefined ){ o_data['baseParam']['fr_outlineColor']   = o_data['baseParam']['outlineColor'];   }	//自带参数（子插件 【窗口字符 - 描边效果】 自定义扩展该参数，去见模块 全局默认值 ）
	if( o_data['baseParam']['fr_outlineWidth']   == undefined ){ o_data['baseParam']['fr_outlineWidth']   = o_data['baseParam']['outlineWidth'];   }	//自带参数（子插件 【窗口字符 - 描边效果】 自定义扩展该参数，去见模块 全局默认值 ）
	if( o_data['baseParam']['fr_fontBold']       == undefined ){ o_data['baseParam']['fr_fontBold']       = o_data['baseParam']['fontBold'];       }	//自带参数
	if( o_data['baseParam']['fr_fontItalic']     == undefined ){ o_data['baseParam']['fr_fontItalic']     = o_data['baseParam']['fontItalic'];     }	//自带参数
	if( o_data['baseParam']['fr_fontSize']       == undefined ){ o_data['baseParam']['fr_fontSize']       = o_data['baseParam']['fontSize'];       }	//自带参数（子插件 【窗口字符 - 字符大小控制器】 自定义扩展该参数，去见模块 全局默认值 ）
	if( o_data['baseParam']['fr_fontFace']       == undefined ){ o_data['baseParam']['fr_fontFace']       = o_data['baseParam']['fontFace'];       }	//自带参数（子插件 【窗口字符 - 字体管理器】 自定义扩展该参数，去见模块 全局默认值 ）
}

