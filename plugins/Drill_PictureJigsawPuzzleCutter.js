//=============================================================================
// Drill_PictureJigsawPuzzleCutter.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        图片 - 拼图切割器
 * @author Drill_up
 * 
 * @Drill_LE_param "切割板-%d"
 * @Drill_LE_parentKey "---切割板组%d至%d---"
 * @Drill_LE_var "DrillUp.g_PJPC_styleList_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureJigsawPuzzleCutter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件提供拼图切割的功能，能根据切割板来切割图片，得到多个拼图块。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面、地图界面。
 *   对所有窗口有效。
 * 2.更多详细内容，去看看文档 "16.图片 > 关于拼图切割器.docx"。
 * 细节：
 *   (1.该插件的功能简单来说就是：
 *        原图片+切割板=切割后的多个拼图块图片
 *   (2.你需要先切割图片，再将拼图块赋值给图片对象。
 *      图片可以是任意资源，根据资源，现切拼图块。
 *      切割规则去看看文档 "16.图片 > 关于拼图切割器.docx"。
 * 设计：
 *   (1.拼图切割器主要省去了ps手切拼图的麻烦，
 *      只要给个切割板，任意不规则的拼图形状都能切。
 *      因为能自画切割板，所以可以制作藏宝拼图、石板、图腾等复杂形状的拼图了。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行截图：
 * 
 * 插件指令：>拼图切割器 : 原图片[1] : 等待加载完成
 * 插件指令：>拼图切割器 : 临时容器 : 开始切割图片 : 原图片[1] : 切割板[1]
 * 插件指令：>拼图切割器 : 临时容器 : 开始切割图片 : 原图片[1] : 切割板变量[21]
 * 
 * 插件指令：>拼图切割器 : 图片[1] : 设为拼图块 : 临时容器 : 块[1]
 * 插件指令：>拼图切割器 : 图片变量[21] : 设为拼图块 : 临时容器 : 块[1]
 * 插件指令：>拼图切割器 : 批量图片[1,2] : 设为拼图块 : 临时容器 : 块[1,2]
 * 插件指令：>拼图切割器 : 批量图片变量[21,22] : 设为拼图块 : 临时容器 : 块[1,2]
 * 插件指令：>拼图切割器 : 图片[1] : 去除拼图块
 * 插件指令：>拼图切割器 : 图片变量[21] : 去除拼图块
 * 插件指令：>拼图切割器 : 批量图片[1,2] : 去除拼图块
 * 插件指令：>拼图切割器 : 批量图片变量[21,22] : 去除拼图块
 * 
 * 1.你需要先切割图片，再将拼图块赋值给 图片对象。
 * 2.注意，拼图块都是临时的，且只能作为临时贴图使用，无法保存到存档中。
 * 3.图片可以是任意资源，根据资源，现切拼图块。
 *   图片切割后，"临时容器"会暂存拼图块，数量为切割板配置的 横向切割数*纵向切割数。
 *   比如，横向切割数为5，纵向切割数为4，那么容器中就有 5*4 = 20个拼图块。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - DEBUG指令
 * 你可以执行下面的插件指令：
 * 
 * 插件指令：>拼图切割器 : DEBUG测试切割步骤 : 开启
 * 插件指令：>拼图切割器 : DEBUG测试切割步骤 : 关闭
 * 
 * 插件指令：>拼图切割器 : DEBUG测试切割样式效果 : 开启
 * 插件指令：>拼图切割器 : DEBUG测试切割样式效果 : 关闭
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
 * 时间复杂度： o(n^5)
 * 测试方法1：  在各个界面中以正常游戏流程进行测试。
 * 测试结果1：  战斗界面的测试，消耗为：【5ms以下】
 *              地图界面的测试，消耗为：【5ms以下】
 *              菜单界面的测试，消耗为：【5ms以下】
 * 测试方法2：  专门执行拼图切割。
 * 测试结果2：  执行1次切割，消耗为：【42.91ms】
 *              执行3次切割，消耗为：【118.00ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件单次执行。注意，切一次就要40ms左右，不要反复执行切割。
 *   反复执行会造成游戏卡顿。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param ---切割板组 1至20---
 * @default
 *
 * @param 切割板-1
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-2
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-3
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-4
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-5
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-6
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-7
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-8
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-9
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-10
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-11
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-12
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-13
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-14
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-15
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-16
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-17
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-18
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-19
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-20
 * @parent ---切割板组 1至20---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 * 
 * @param ---切割板组21至40---
 * @default
 *
 * @param 切割板-21
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-22
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-23
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-24
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-25
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-26
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-27
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-28
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-29
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-30
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-31
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-32
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-33
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-34
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-35
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-36
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-37
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-38
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-39
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 *
 * @param 切割板-40
 * @parent ---切割板组21至40---
 * @type struct<CutBoardStyle>
 * @desc 切割板的详细配置信息。
 * @default 
 * 
 */
/*~struct~CutBoardStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的切割板==
 * 
 * 
 * @param ---切割规则---
 * @default 
 * 
 * @param 资源-切割板
 * @parent ---切割规则---
 * @desc 切割板的图片资源。黑色为切割部分，其它为非切割部分。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 横向切割数
 * @parent ---切割规则---
 * @type number
 * @min 1
 * @desc 切割板的横向切割数。
 * @default 5
 *
 * @param 纵向切割数
 * @parent ---切割规则---
 * @type number
 * @min 1
 * @desc 切割板的纵向切割数。
 * @default 4
 *
 * @param 切割溢出厚度
 * @parent ---切割规则---
 * @type number
 * @min 0
 * @desc 切割时的溢出边界的厚度，详细说明去看文档介绍。
 * @default 20
 * 
 * 
 * @param ---描边设置---
 * @default 
 * 
 * @param 是否描边
 * @parent ---描边设置---
 * @type boolean
 * @on 描边
 * @off 不描边
 * @desc true - 描边，false - 不描边
 * @default true
 * 
 * @param 描边颜色
 * @parent ---描边设置---
 * @desc 描边颜色格式固定为："rgba(255,255,255,1.0)"。
 * @default rgba(0,0,0,1.0)
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PJPC (Picture_Jigsaw_Puzzle_Cutter)
//		临时全局变量	DrillUp.g_PJPC_xxx
//		临时局部变量	this._drill_PJPC_xxx
//		存储数据变量	$gameSystem._drill_PJPC_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^5)
//		★性能测试因素	限时拼图关卡
//		★性能测试消耗	2026/2/11：
//							》执行了3次切割，共118.0ms（drill_PJPC_copyPixelInMaskNearByRange）
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
//			->☆预加载
//			->☆场景容器之图片贴图
//			
//			->☆等待控制
//			->☆图片的属性
//			->☆图片控制
//			->☆拼图块容器
//			
//			->☆切割板执行
//			
//			->☆DEBUG拼图块切割
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
//		★核心说明：
//			无
//		
//		★必要注意事项：
//			1. 作者我想到了很多拼图与地图结合的玩法，但是现在开坑太慢了。
//				  ╭────────────────┬──╮
//				  │家家  树路  墙宝│地│
//				  │  我    路  墙墙│图│
//				  │      猫路      ├──╯
//				  │路路路路路路路路│
//				  │    树          │
//				  │丘    钓  塘河河│
//				  │丘  河河河河山山│
//				  ╰━━━━━━━━━━━━━━━━╯
//
//		★其它说明细节：
//			无
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
	DrillUp.g_PJPC_PluginTip_curName = "Drill_PictureJigsawPuzzleCutter.js 图片-拼图切割器";
	DrillUp.g_PJPC_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PJPC_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PJPC_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到配置
	//==============================
	DrillUp.drill_PJPC_getPluginTip_CutBoardNotFind = function( cutBoard_id ){
		return "【" + DrillUp.g_PJPC_PluginTip_curName + "】\n插件指令错误，id为"+cutBoard_id+"的切割板配置是空的。";
	};
	//==============================
	// * 提示信息 - 报错 - 批量设置失败
	//==============================
	DrillUp.drill_PJPC_getPluginTip_PictureLengthNotMatch = function( pic_length, jigsawTank_indexList_length ){
		return "【" + DrillUp.g_PJPC_PluginTip_curName + "】\n插件指令错误，批量图片的数组长度为："+pic_length+"，而你设置的块索引数组长度为："+jigsawTank_indexList_length+"\n需要长度一致，才能批量一一对应。";
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_PJPC_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_PJPC_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureJigsawPuzzleCutter = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureJigsawPuzzleCutter');
	
	//==============================
	// * 变量获取 - 切割板
	//				（~struct~CutBoardStyle）
	//==============================
	DrillUp.drill_PJPC_CutBoardInit = function( dataFrom ){
		var data = {};
		
		// > 切割规则
		data['cutBoard_src'] = String( dataFrom["资源-切割板"] || "" );
		data['cutBoard_horNum'] = Number( dataFrom["横向切割数"] || 8);
		data['cutBoard_verNum'] = Number( dataFrom["纵向切割数"] || 8);
		data['cutBoard_thickness'] = Number( dataFrom["切割溢出厚度"] || 20);
		
		// > 描边设置
		data['stoke_enabled'] = String( dataFrom["是否描边"] || "false") === "true";
		data['stoke_color'] = String( dataFrom["描边颜色"] || "rgba(0,0,0,1.0)");
		
		return data;
	}
	
	/*-----------------切割板------------------*/
	DrillUp.g_PJPC_styleList_length = 40;
	DrillUp.g_PJPC_styleList = [];
	for (var i = 0; i < DrillUp.g_PJPC_styleList_length; i++) {
		if( DrillUp.parameters["切割板-" + String(i+1) ] != undefined &&
			DrillUp.parameters["切割板-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["切割板-" + String(i+1) ]);
			DrillUp.g_PJPC_styleList[i] = DrillUp.drill_PJPC_CutBoardInit( temp );
		}else{
			DrillUp.g_PJPC_styleList[i] = null;
		}
	}
	
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PJPC_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PJPC_pluginCommand.call(this, command, args);
	this.drill_PJPC_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PJPC_pluginCommand = function( command, args ){
	if( command === ">拼图切割器" ){
		
		/*-----------------开始切割图片------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "等待加载完成" ){
				temp1 = temp1.replace("原图片[","");
				temp1 = temp1.replace("]","");
				var pic_id = Number(temp1);
				var pic_ids = [];
				pic_ids.push( pic_id );
				this.drill_PJPC_setWait_PicIdList( pic_ids );
				this.setWaitMode("_drill_PJPC_waitLoading");	//『强制等待』
				return;
			}
		}
		if( args.length == 8 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "开始切割图片" && temp1 == "临时容器" ){
				temp2 = temp2.replace("原图片[","");
				temp2 = temp2.replace("]","");
				var pic_id = Number(temp2);
				if( temp3.indexOf("切割板变量[") != -1 ){
					temp3 = temp3.replace("切割板变量[","");
					temp3 = temp3.replace("]","");
					temp3 = $gameVariables.value(Number(temp3)) -1;
				}else{
					temp3 = temp3.replace("切割板[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3) -1;
				}
				var picture_sprite = $gameTemp.drill_PJPC_getPictureSpriteByPictureId( pic_id );
				if( picture_sprite != undefined &&
					picture_sprite.bitmap != undefined &&
					picture_sprite.bitmap.isReady() == true ){
					$gameTemp.drill_PJPC_createJigsawPiece( picture_sprite.bitmap, temp3 );
				}
				return;
			}
		}
		
		/*-----------------设为拼图块 - 对象组获取------------------*/
		var pics = null;			// 图片对象组
		var pic_ids = null;			// 图片ID组（图片对象本身没有id值）
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( pics == null && unit.indexOf("批量图片[") != -1 ){
				unit = unit.replace("批量图片[","");
				unit = unit.replace("]","");
				pics = [];
				pic_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_PJPC_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
					pic_ids.push( pic_id );
				}
			}
			else if( pics == null && unit.indexOf("批量图片变量[") != -1 ){
				unit = unit.replace("批量图片变量[","");
				unit = unit.replace("]","");
				pics = [];
				pic_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_PJPC_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
					pic_ids.push( pic_id );
				}
			}
			else if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PJPC_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
				pic_ids = [];
				pic_ids.push( pic_id );
			}
			else if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PJPC_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
				pic_ids = [];
				pic_ids.push( pic_id );
			}
		}
		
		/*-----------------设为拼图块 - 执行------------------*/
		if( pic_ids != null && pics != null && args.length == 8 ){
			var type = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "设为拼图块" && temp2 == "临时容器" ){
				if( pics.length == 1 ){
					temp3 = temp3.replace("块[","");
					temp3 = temp3.replace("]","");
					temp3 = Number(temp3) -1;
					
					// > 贴图赋值
					var picture_sprite = $gameTemp.drill_PJPC_getPictureSpriteByPictureId( pic_ids[0] );
					if( picture_sprite == undefined ){ return; }
					var jigsaw_id = $gameTemp.drill_PJPC_getLastJigsawPieceListId();
					picture_sprite.drill_PJPC_setBitmapJigsaw( jigsaw_id, temp3 );
					
					// > 数据赋值
					pics[0].drill_PJPC_setDataId( jigsaw_id, temp3 );
				}else{
					temp3 = temp3.replace("块[","");
					temp3 = temp3.replace("]","");
					var temp_arr = temp3.split(/[,，]/);
					var jigsawTank_indexList = [];
					for( var k=0; k < temp_arr.length; k++ ){
						var jigsawTank_index = Number(temp_arr[k]) -1;
						jigsawTank_indexList.push( jigsawTank_index );
					}
					if( jigsawTank_indexList.length == pics.length ){
						for( var i = 0; i < pics.length; i++ ){
							
							// > 贴图赋值
							var picture_sprite = $gameTemp.drill_PJPC_getPictureSpriteByPictureId( pic_ids[i] );
							if( picture_sprite == undefined ){ continue; }
							var jigsaw_id = $gameTemp.drill_PJPC_getLastJigsawPieceListId();
							picture_sprite.drill_PJPC_setBitmapJigsaw( jigsaw_id, jigsawTank_indexList[i] );
							
							// > 数据赋值
							pics[i].drill_PJPC_setDataId( jigsaw_id, jigsawTank_indexList[i] );
						}
					}else{
						alert( DrillUp.drill_PJPC_getPluginTip_PictureLengthNotMatch(pics.length,jigsawTank_indexList.length) );
					}
				}
			}
		}
		if( pic_ids != null && pics != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除拼图块" ){
				for( var i = 0; i < pics.length; i++ ){
					
					// > 贴图赋值
					var picture_sprite = $gameTemp.drill_PJPC_getPictureSpriteByPictureId( pic_ids[i] );
					if( picture_sprite == undefined ){ continue; }
					picture_sprite.drill_PJPC_removeBitmapJigsaw();
					
					// > 数据赋值
					pics[i].drill_PJPC_removeData();
				}
			}
		}
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "DEBUG测试切割步骤" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_PJPC_Debug1Enabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_PJPC_Debug1Enabled = false;
				}
			}
			if( type == "DEBUG测试切割样式效果" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameTemp._drill_PJPC_Debug2Enabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameTemp._drill_PJPC_Debug2Enabled = false;
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PJPC_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PJPC_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};


//=============================================================================
// ** ☆预加载
//
//			说明：	> 用过的bitmap，全部标记不删除，防止刷菜单时重建导致浪费资源。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
DrillUp.g_PJPC_preloadEnabled = true;		//（预加载开关）
if( DrillUp.g_PJPC_preloadEnabled == true ){
	//==============================
	// * 预加载 - 初始化
	//==============================
	var _drill_PJPC_preload_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_drill_PJPC_preload_initialize.call(this);
		this.drill_PJPC_preloadInit();
	}
	//==============================
	// * 预加载 - 版本校验
	//==============================
	if( Utils.generateRuntimeId == undefined ){
		alert( DrillUp.drill_PJPC_getPluginTip_LowVersion() );
	}
	//==============================
	// * 预加载 - 执行资源预加载
	//
	//			说明：	> 遍历全部资源，提前预加载标记过的资源。
	//==============================
	Game_Temp.prototype.drill_PJPC_preloadInit = function() {
		this._drill_PJPC_cacheId = Utils.generateRuntimeId();	//资源缓存id
		this._drill_PJPC_preloadTank = [];						//bitmap容器
		for( var i = 0; i < DrillUp.g_PJPC_styleList.length; i++ ){
			var temp_data = DrillUp.g_PJPC_styleList[i];
			if( temp_data == undefined ){ continue; }
			
			this._drill_PJPC_preloadTank.push( 
				ImageManager.reserveBitmap( "img/pictures/", temp_data['cutBoard_src'], 0, true, this._drill_PJPC_cacheId ) 
			);
		}
	}
}


//#############################################################################
// ** 【标准模块】图片贴图容器 ☆场景容器之图片贴图
//#############################################################################
//##############################
// * 图片贴图容器 - 获取 - 全部图片贴图【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组       （图片贴图）
//          
//			说明：	> 此函数返回所有图片贴图，包括被转移到 图片层、最顶层 的图片。
//##############################
Game_Temp.prototype.drill_PJPC_getAllPictureSprite = function(){
	return this.drill_PJPC_getAllPictureSprite_Private();
}
//##############################
// * 图片贴图容器 - 获取 - 容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组       （图片贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//					> 注意，被转移到 图片层、最顶层 的图片，不在此容器内。
//##############################
Game_Temp.prototype.drill_PJPC_getPictureSpriteTank = function(){
	return this.drill_PJPC_getPictureSpriteTank_Private();
}
//##############################
// * 图片贴图容器 - 获取 - 根据图片ID【标准函数】
//			
//			参数：	> picture_id 数字（图片ID）
//			返回：	> 贴图对象       （图片贴图）
//          
//			说明：	> 图片id和图片贴图一一对应。
//					> 此函数只读，且不缓存任何对象，直接读取容器数据。
//					> 注意，图片数据类 与 图片贴图 为 多对一，图片数据类在战斗界面和地图界面分两类，而图片贴图不分。
//					> 此函数能获取到被转移到 图片层、最顶层 的图片。
//##############################
Game_Temp.prototype.drill_PJPC_getPictureSpriteByPictureId = function( picture_id ){
	return this.drill_PJPC_getPictureSpriteByPictureId_Private( picture_id );
}
//=============================================================================
// ** 场景容器之图片贴图（实现）
//=============================================================================
//==============================
// * 图片贴图容器 - 获取 - 容器（私有）
//==============================
Game_Temp.prototype.drill_PJPC_getPictureSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	if( SceneManager._scene._spriteset._pictureContainer == undefined ){ return null; }
	return SceneManager._scene._spriteset._pictureContainer.children;
};
//==============================
// * 图片贴图容器 - 获取 - 最顶层容器（私有）
//==============================
Game_Temp.prototype.drill_PJPC_getPictureSpriteTank_SenceTopArea = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._drill_SenceTopArea == undefined ){ return null; }
	return SceneManager._scene._drill_SenceTopArea.children;
};
//==============================
// * 图片贴图容器 - 获取 - 图片层容器（私有）
//==============================
Game_Temp.prototype.drill_PJPC_getPictureSpriteTank_PicArea = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene instanceof Scene_Battle ){		//『多场景与图片-战斗界面』
		if( SceneManager._scene._spriteset == undefined ){ return null; }
		if( SceneManager._scene._spriteset._drill_battlePicArea == undefined ){ return null; }
		return SceneManager._scene._spriteset._drill_battlePicArea.children;
	}
	if( SceneManager._scene instanceof Scene_Map ){			//『多场景与图片-地图界面』
		if( SceneManager._scene._spriteset == undefined ){ return null; }
		if( SceneManager._scene._spriteset._drill_mapPicArea == undefined ){ return null; }
		return SceneManager._scene._spriteset._drill_mapPicArea.children;
	}
	return null;
};
//==============================
// * 图片贴图容器 - 获取 - 全部图片贴图（私有）
//==============================
Game_Temp.prototype.drill_PJPC_getAllPictureSprite_Private = function(){
	var result_list = [];
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_PJPC_getPictureSpriteTank_Private();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	
	// > 最顶层 的图片贴图
	var sprite_list = this.drill_PJPC_getPictureSpriteTank_SenceTopArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	
	// > 图片层 的图片贴图
	var sprite_list = this.drill_PJPC_getPictureSpriteTank_PicArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	return result_list;
};
//==============================
// * 图片贴图容器 - 获取 - 根据图片ID（私有）
//==============================
Game_Temp.prototype.drill_PJPC_getPictureSpriteByPictureId_Private = function( picture_id ){
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_PJPC_getPictureSpriteTank_Private();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				if( sprite._pictureId == picture_id ){
					return sprite;
				}
			}
		}
	}
	
	// > 最顶层 的图片贴图
	var sprite_list = this.drill_PJPC_getPictureSpriteTank_SenceTopArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				if( sprite._pictureId == picture_id ){
					return sprite;
				}
			}
		}
	}
	
	// > 图片层 的图片贴图
	var sprite_list = this.drill_PJPC_getPictureSpriteTank_PicArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				if( sprite._pictureId == picture_id ){
					return sprite;
				}
			}
		}
	}
	return null;
};




//=============================================================================
// ** ☆等待控制
//
//			说明：	> 此模块专门定义 等待类型。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 等待控制 - 设置监听列表
//==============================
Game_Interpreter.prototype.drill_PJPC_setWait_PicIdList = function( picId_list ){
	this._drill_PJPC_waitPicIdList = picId_list;
};
//==============================
// * 等待控制 - 自定义等待类型
//==============================
var _drill_PJPC_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function(){
	
	// > 等待类型
	if( this._waitMode == "_drill_PJPC_waitLoading" ){		//『强制等待』指定的图片任何一个未加载，则持续等待
		if( this._drill_PJPC_waitPicIdList != undefined ){
			
			for(var i = 0; i < this._drill_PJPC_waitPicIdList.length; i++ ){
				var pic_id = this._drill_PJPC_waitPicIdList[i];
				
				var picture_sprite = $gameTemp.drill_PJPC_getPictureSpriteByPictureId( pic_id );
				if( picture_sprite == undefined ){ continue; }
				
				picture_sprite.updateBitmap();	//（强制刷新图片，确保有bitmap）
				if( picture_sprite.bitmap == undefined ){ continue; }
				if( picture_sprite.bitmap.isReady() == false ){
					return true;	//（返回true表示要等待）
				}
			}
		}
	}
	
	// > 原函数
	return _drill_PJPC_updateWaitMode.call(this);
};


//=============================================================================
// ** ☆图片的属性
//
//			说明：	> 此模块专门定义 图片的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片的属性 - 初始化
//==============================
var _drill_PJPC_p_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	this._drill_PJPC_jigsawTank_id = undefined;			//（要放前面，不然会盖掉子类的设置）
	this._drill_PJPC_jigsawTank_index = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PJPC_p_initialize.call(this);
}
//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PJPC_removeData = function(){
	this._drill_PJPC_jigsawTank_id = undefined;
	this._drill_PJPC_jigsawTank_index = undefined;
}
//==============================
// * 图片的属性 - 设置拼图块ID
//==============================
Game_Picture.prototype.drill_PJPC_setDataId = function( jigsawTank_id, jigsawTank_index ){
	this._drill_PJPC_jigsawTank_id = jigsawTank_id;
	this._drill_PJPC_jigsawTank_index = jigsawTank_index;
}
//==============================
// * 图片的属性 - 显示图片（对应函数showPicture）
//==============================
var _drill_PJPC_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function( name, origin, x, y, scaleX, scaleY, opacity, blendMode ){
	_drill_PJPC_p_show.call( this, name, origin, x, y, scaleX, scaleY, opacity, blendMode );
	this.drill_PJPC_removeData();			//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PJPC_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PJPC_p_erase.call( this );
	this.drill_PJPC_removeData();			//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PJPC_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PJPC_removeData();	//（删除数据）
	}
	_drill_PJPC_p_erasePicture.call( this, pictureId );
}


//=============================================================================
// ** ☆图片控制
//
//			说明：	> 此模块专门管理 拼图块 变化。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片控制 - 贴图 初始化
//==============================
var _drill_PJPC_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
	
	// > 初始化（要放前面，因为 图片贴图initialize中会执行一次update）
	this._drill_PJPC_sp_lastJigsawId = undefined;			//（要放前面，不然会盖掉子类的设置）
	this._drill_PJPC_sp_lastJigsawIndex = undefined;		//（要放前面，不然会盖掉子类的设置）
	
	// > 原函数
	_drill_PJPC_sp_initialize.call( this, pictureId );
}
//==============================
// * 图片控制 - 贴图 设置拼图块
//
//			说明：	> 由于一帧内 先刷新 图片的属性，后刷新 贴图的属性。
//					  所以修改图片的属性后，不能立即操作贴图bitmap。『图片bitmap切换慢一帧』
//					> 如果急用，外部函数需要考虑同时 数据赋值+贴图赋值。
//					  （一种急用的情况：设置拼图块 执行后，就立即执行粉碎效果。）
//==============================
Sprite_Picture.prototype.drill_PJPC_setBitmapJigsaw = function( jigsawTank_id, jigsawTank_index ){
	this._drill_PJPC_sp_lastJigsawId = jigsawTank_id;		//（需要赋值，这样帧刷新中就不会重复设置了）
	this._drill_PJPC_sp_lastJigsawIndex = jigsawTank_index;	//（需要赋值，这样帧刷新中就不会重复设置了）
	var bitmap_list = $gameTemp._drill_PJPC_curBitmapList_Tank[ jigsawTank_id ];
	if( bitmap_list == undefined ){ return; }
	var bitmap = bitmap_list[ jigsawTank_index ];
	if( bitmap == undefined ){ return; }
	this.bitmap = bitmap;
}
//==============================
// * 图片控制 - 贴图 去除拼图块
//==============================
Sprite_Picture.prototype.drill_PJPC_removeBitmapJigsaw = function(){
	this._pictureName = '';
	this.bitmap = null;
}
//==============================
// * 图片控制 - 贴图 帧刷新
//
//			说明：	> 此帧刷新内的操作会延迟1帧，插件指令操作最好立即赋值。
//==============================
var _drill_PJPC_sp_updateBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
	_drill_PJPC_sp_updateBitmap.call(this);
    var picture = this.picture();
    if( picture ){
		
		if( this._drill_PJPC_sp_lastJigsawId == picture._drill_PJPC_jigsawTank_id ){ return; }
		this._drill_PJPC_sp_lastJigsawId = picture._drill_PJPC_jigsawTank_id;
		if( this._drill_PJPC_sp_lastJigsawIndex == picture._drill_PJPC_jigsawTank_index ){ return; }
		this._drill_PJPC_sp_lastJigsawIndex = picture._drill_PJPC_jigsawTank_index;
		
		// > 去除拼图块
		if( this._drill_PJPC_sp_lastJigsawId == undefined ||
			this._drill_PJPC_sp_lastJigsawIndex == undefined ){
			this.drill_PJPC_removeBitmapJigsaw();
			
		// > 设置拼图块
		}else{
			this.drill_PJPC_setBitmapJigsaw( this._drill_PJPC_sp_lastJigsawId, this._drill_PJPC_sp_lastJigsawIndex );
		}
		
	// > 无数据时『图片数据根除时』
	}else{
		if( this._drill_PJPC_sp_lastJigsawId != undefined ||
			this._drill_PJPC_sp_lastJigsawIndex != undefined ){
			this._drill_PJPC_sp_lastJigsawId = undefined;
			this._drill_PJPC_sp_lastJigsawIndex = undefined;
			this.drill_PJPC_removeBitmapJigsaw();
		}
	}
};


//=============================================================================
// ** ☆拼图块容器『图片bitmap临时容器』
//
//			说明：	> 此模块提供 拼图块 的创建。
//					> 暂时不考虑销毁Bitmap情况，因为本身贴图占内存就小。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 拼图块容器 - 初始化 容器
//==============================
var _drill_PJPC_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_PJPC_temp_initialize.call(this);
	this._drill_PJPC_curBitmapList_Id = -1;			//拼图块 计数器
	this._drill_PJPC_curBitmapList_Tank = [];		//拼图块 贴图容器
}
//==============================
// * 拼图块容器 - 创建拼图块
//
//			说明：	> 由于Bitmap是现做的，所以该容器不考虑保存读取的情况。
//==============================
Game_Temp.prototype.drill_PJPC_createJigsawPiece = function( bitmap_org, cutBoard_style_id ){
	//	（注意，此时的 bitmap_org 必须已完成加载）
	
	// > 计数器+1
	this._drill_PJPC_curBitmapList_Id += 1;
	var jigsawTank_id = this._drill_PJPC_curBitmapList_Id;
	
	// > 创建Bitmap
	var cutBoard_style = DrillUp.g_PJPC_styleList[cutBoard_style_id];
	if( cutBoard_style == undefined ){
		alert( DrillUp.drill_PJPC_getPluginTip_CutBoardNotFind( cutBoard_style_id+1 ) );
		return -1;
	}
	var bitmap_list = $gameTemp.drill_PJPC_cutBoardExecute( bitmap_org, cutBoard_style );
	this._drill_PJPC_curBitmapList_Tank[ jigsawTank_id ] = bitmap_list;
	
	return jigsawTank_id;
}
//==============================
// * 拼图块容器 - 获取 创建的拼图块列表ID（开放函数）
//==============================
Game_Temp.prototype.drill_PJPC_getLastJigsawPieceListId = function(){
	return this._drill_PJPC_curBitmapList_Id;
}
//==============================
// * 拼图块容器 - 获取 创建的拼图块列表（开放函数）
//==============================
Game_Temp.prototype.drill_PJPC_getLastJigsawPieceList = function( jigsawTank_id ){
	return this._drill_PJPC_curBitmapList_Tank[ this._drill_PJPC_curBitmapList_Id ];
}
//==============================
// * 拼图块容器 - 获取 创建的拼图块（开放函数）
//==============================
Game_Temp.prototype.drill_PJPC_getLastJigsawPieceByIndex = function( index ){
	if( this._drill_PJPC_curBitmapList_Tank[ this._drill_PJPC_curBitmapList_Id ] == undefined ){ return null; }
	return this._drill_PJPC_curBitmapList_Tank[ this._drill_PJPC_curBitmapList_Id ][ index ];
}



//=============================================================================
// ** ☆切割板执行
//
//			说明：	> 此模块专门提供 切割板执行 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 切割板执行 - 执行切割
//
//			参数：	> bitmap_org 对象     （图片资源对象）
//					> cutBoard_style 对象 （切割板样式）
//			返回：	> 对象数组            （切割后的图片资源对象列表）
//
//			说明：	> 将一个bitmap放入，切割后得到bitmap列表。
//					> 如果 原图片 和 切割板 的高宽不一致，则会被强制拉伸。
//==============================
Game_Temp.prototype.drill_PJPC_cutBoardExecute = function( bitmap_org, cutBoard_style ){
	//	（注意，此时的 bitmap_org 必须已完成加载）
	
	// > 材质准备
	var bitmap_cutBoard = ImageManager.loadBitmap("img/pictures/", cutBoard_style['cutBoard_src'], 0, true);
	var painter_cutImg = bitmap_org._context;
	var painter_cutBoard = bitmap_cutBoard._context;
	
	// > 大小强制适配
	if( bitmap_org.width  === bitmap_cutBoard.width &&
		bitmap_org.height === bitmap_cutBoard.height ){
		//（不操作）
	}else{
		var new_bitmap = new Bitmap( bitmap_cutBoard.width, bitmap_cutBoard.height );
		new_bitmap._context.globalCompositeOperation = 'source-over';
		new_bitmap._context.drawImage(
			bitmap_org._image, 
			0, 0, bitmap_org.width, bitmap_org.height, 
			0, 0, bitmap_cutBoard.width, bitmap_cutBoard.height 
		);
		new_bitmap._setDirty();
		bitmap_org = new_bitmap;
		painter_cutImg = bitmap_org._context;
	}
	
	// > 参数准备
	var stroke_color = null;
	if( cutBoard_style['stoke_enabled'] == true ){
		var stroke_color_str = cutBoard_style['stoke_color'];
		stroke_color_str = stroke_color_str.replace("rgba(","");
		stroke_color_str = stroke_color_str.replace(")","");
		stroke_color_str = stroke_color_str.replace(" ","");
		stroke_color_str = stroke_color_str.split(",");
		stroke_color = {};
		stroke_color['r'] = Number( stroke_color_str[0] );
		stroke_color['g'] = Number( stroke_color_str[1] );
		stroke_color['b'] = Number( stroke_color_str[2] );
		stroke_color['a'] = Number( stroke_color_str[3] ) *255;
	}
	var horNum = cutBoard_style['cutBoard_horNum'];
	var verNum = cutBoard_style['cutBoard_verNum'];
	var thickness = cutBoard_style['cutBoard_thickness'];
	var block_width  = Math.ceil( bitmap_org.width / horNum );	//切割的原宽度
	var block_height = Math.ceil( bitmap_org.height / verNum );	//切割的原高度
	var piece_width  = block_width + thickness*2;				//切割的块的宽度
	var piece_height = block_height + thickness*2;				//切割的块的高度
	
	// > 执行切割（ horNum*verNum 个拼图块）
	var result_bitmap_list = [];
	for( var yy = 0; yy < verNum; yy++ ){
		for( var xx = 0; xx < horNum; xx++ ){
			var piece_x = (xx+0.5) * block_width;
			var piece_y = (yy+0.5) * block_height;
			var piece_x_offset = Math.floor( piece_x - piece_width*0.5  );
			var piece_y_offset = Math.floor( piece_y - piece_height*0.5 );
			
			// > 图像对象准备（相同高宽）
			var imageData_cutImg = painter_cutImg.getImageData( piece_x_offset, piece_y_offset, piece_width, piece_height);		//『像素矩阵操作』
			var imageData_cutBoard = painter_cutBoard.getImageData( piece_x_offset, piece_y_offset, piece_width, piece_height);	//『像素矩阵操作』
			
			// > 获取块中切割边界围成的图像
			var imageData_new = $gameTemp.drill_PJPC_copyPixelInMaskNearByRange( piece_width*0.5, piece_height*0.5, imageData_cutImg, imageData_cutBoard, stroke_color );
			var new_bitmap = new Bitmap(piece_width,piece_height);
			new_bitmap._context.putImageData( imageData_new, 0,0 );	//『像素矩阵操作』
			result_bitmap_list.push( new_bitmap );
		}
	}
	return result_bitmap_list;
}
//==============================
// * 切割板执行 - 执行切割 - 获取块中切割边界围成的图像
//
//			参数：	> start_x,start_y 数字        （切割开始点）
//					> imageData_orgPiece 图像对象 （原图的块）
//					> imageData_cutPiece 图像对象 （切割板的块）
//					> stroke_color 颜色对象       （描边颜色，含r,g,b,a四个参数，为null则按原图块内容画）
//			返回：	> 图像对象（切割复制的图像）
//
//			说明：	> 深度优先遍历。『递归函数-拆解』
//					> 若该函数执行次数过多，消耗可能较大。
//					> 原图的块 和 切割板的块，高宽必须一致，这样切割复制才能准确。
//==============================
Game_Temp.prototype.drill_PJPC_copyPixelInMaskNearByRange = function( start_x, start_y, imageData_orgPiece, imageData_cutPiece, stroke_color ){
	var imageData_output = new ImageData( imageData_cutPiece.width, imageData_cutPiece.height );	//『像素矩阵操作』
	var cur_x = Math.round(start_x);			//遍历规则(visited) - 当前位置X
	var cur_y = Math.round(start_y);			//遍历规则(visited) - 当前位置Y
	var cut_width  = imageData_cutPiece.width;	//遍历规则(visited) - 切割板宽度
	var cut_height = imageData_cutPiece.height;	//遍历规则(visited) - 切割板高度
	var pos_visitedTank = [];					//遍历规则(visited) - 访问标记容器
	var pos_stack = [];							//遍历规则(stack) - 栈
	
	// > 遍历规则(stack) - 入栈（初始点）
	var first_pos = cur_x + cur_y*cut_width;
	pos_stack.push( first_pos );
	
	while( pos_stack.length > 0 ){
		
		// > 遍历规则(visited) - DEBUG测试 - 计数器（回溯进入次数）
		//if( DrillUp.g_drill_PJPC_Debug_RecursionCount == undefined ){ DrillUp.g_drill_PJPC_Debug_RecursionCount = 0; }
		//DrillUp.g_drill_PJPC_Debug_RecursionCount += 1;
		
		// > 遍历规则(stack) - 出栈
		var pos = pos_stack[pos_stack.length-1];
		pos_stack.pop();
		
		// > 遍历规则(visited) - 若已存在于列表，跳出
		if( pos_visitedTank[pos] === true ){ continue; }
		
		// > 遍历规则(visited) - 添加到列表
		pos_visitedTank[pos] = true;
		
		// > 遍历规则(visited) - DEBUG测试 - 计数器（遍历执行次数）
		//if( DrillUp.g_drill_PJPC_Debug_DFSCount == undefined ){ DrillUp.g_drill_PJPC_Debug_DFSCount = 0; }
		//DrillUp.g_drill_PJPC_Debug_DFSCount += 1;
		
		
		// > 超出边界时，跳出
		var cur_x = pos % cut_width;
		var cur_y = Math.floor(pos/cut_width);
		var xx = cur_x;
		var yy = cur_y;
		if( xx < 0 ){ continue; }
		if( yy < 0 ){ continue; }
		if( xx >= cut_width  ){ continue; }
		if( yy >= cut_height ){ continue; }
		
		// > 遍历规则(visited) - 位置(0,0)
		var index = 4 * pos;
		if( index < imageData_cutPiece.data.length ){
			var r = imageData_cutPiece.data[index];
			var g = imageData_cutPiece.data[index+1];
			var b = imageData_cutPiece.data[index+2];
			var a = imageData_cutPiece.data[index+3];
			
			// > 如果 切割板块 的像素点为不透明的黑色，那么输出位置就为描边色，并且跳出遍历
			if( r < 5 && g < 5 && b < 5 && a > 250 ){
				if( stroke_color != null ){
					imageData_output.data[index]   = stroke_color['r'];
					imageData_output.data[index+1] = stroke_color['g'];
					imageData_output.data[index+2] = stroke_color['b'];
					imageData_output.data[index+3] = stroke_color['a'];
				}else{
					imageData_output.data[index]   = imageData_orgPiece.data[index];
					imageData_output.data[index+1] = imageData_orgPiece.data[index+1];
					imageData_output.data[index+2] = imageData_orgPiece.data[index+2];
					imageData_output.data[index+3] = imageData_orgPiece.data[index+3];
				}
				continue;
				
			// > 如果 切割板块 的像素点为白色，那么输出位置就画成复制图片的内容
			}else{
				imageData_output.data[index]   = imageData_orgPiece.data[index];
				imageData_output.data[index+1] = imageData_orgPiece.data[index+1];
				imageData_output.data[index+2] = imageData_orgPiece.data[index+2];
				imageData_output.data[index+3] = imageData_orgPiece.data[index+3];
			}
		}
		
		// > 遍历规则(visited) - 位置(1,0)
		var xx = cur_x +1;
		var yy = cur_y +0;
		var pos = xx + yy*cut_width;
		var condition_fit = true;		//判断函数放这里，执行四遍『减少回溯进入次数』
		if( xx < 0 ){ condition_fit = false; }
		if( yy < 0 ){ condition_fit = false; }
		if( xx >= cut_width  ){ condition_fit = false; }
		if( yy >= cut_height ){ condition_fit = false; }
		if( pos_visitedTank[pos] === true ){ condition_fit = false; }
		if( condition_fit == true ){
			// > 遍历规则(stack) - 入栈
			pos_stack.push( pos );
		}
		// > 遍历规则(visited) - 位置(0,1)
		var xx = cur_x +0;
		var yy = cur_y +1;
		var pos = xx + yy*cut_width;
		var condition_fit = true;		//判断函数放这里，执行四遍『减少回溯进入次数』
		if( xx < 0 ){ condition_fit = false; }
		if( yy < 0 ){ condition_fit = false; }
		if( xx >= cut_width  ){ condition_fit = false; }
		if( yy >= cut_height ){ condition_fit = false; }
		if( pos_visitedTank[pos] === true ){ condition_fit = false; }
		if( condition_fit == true ){
			// > 遍历规则(stack) - 入栈
			pos_stack.push( pos );
		}
		// > 遍历规则(visited) - 位置(-1,0)
		var xx = cur_x -1;
		var yy = cur_y +0;
		var pos = xx + yy*cut_width;
		var condition_fit = true;		//判断函数放这里，执行四遍『减少回溯进入次数』
		if( xx < 0 ){ condition_fit = false; }
		if( yy < 0 ){ condition_fit = false; }
		if( xx >= cut_width  ){ condition_fit = false; }
		if( yy >= cut_height ){ condition_fit = false; }
		if( pos_visitedTank[pos] === true ){ condition_fit = false; }
		if( condition_fit == true ){
			// > 遍历规则(stack) - 入栈
			pos_stack.push( pos );
		}
		// > 遍历规则(visited) - 位置(0,-1)
		var xx = cur_x +0;
		var yy = cur_y -1;
		var pos = xx + yy*cut_width;
		var condition_fit = true;		//判断函数放这里，执行四遍『减少回溯进入次数』
		if( xx < 0 ){ condition_fit = false; }
		if( yy < 0 ){ condition_fit = false; }
		if( xx >= cut_width  ){ condition_fit = false; }
		if( yy >= cut_height ){ condition_fit = false; }
		if( pos_visitedTank[pos] === true ){ condition_fit = false; }
		if( condition_fit == true ){
			// > 遍历规则(stack) - 入栈
			pos_stack.push( pos );
		}
	}
	
	return imageData_output;
}



//=============================================================================
// ** ☆DEBUG拼图块切割
//=============================================================================
//==============================
// * DEBUG拼图块切割 - 绘制范围 - 填充+描边矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> fill_color 字符串   （填充颜色）
//					> stroke_color 字符串 （描边颜色）
//					> lineWidth 数字      （线宽）
//					> lineJoin 字符串     （连接处，包含miter/round/bevel 尖角/圆角/斜角，默认miter）
//			说明：	> 无。
//==============================
Bitmap.prototype.drill_PJPC_drawRect = function( x, y, width, height, fill_color, stroke_color, lineWidth, lineJoin ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.fillStyle = fill_color;			//（b.设置样式）
    painter.strokeStyle = stroke_color;
	painter.lineWidth = lineWidth;
	painter.lineJoin = lineJoin;
	
    painter.fillRect(x, y, width, height);	//（c.路径填充/描边，fillRect）
    painter.strokeRect(x, y, width, height);
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};
//==============================
// * DEBUG拼图块切割 - 绘制范围 - 填充+描边圆形
//			
//			参数：	> fill_color 字符串   （填充颜色）
//					> stroke_color 字符串 （描边颜色）
//					> lineWidth 数字      （线宽）
//			说明：	> 圆形不需要考虑线的末端与斜角。
//==============================
Bitmap.prototype.drill_PJPC_drawCircle = function( x, y, radius, fill_color, stroke_color, lineWidth ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.fillStyle = fill_color;			//（b.设置样式）
    painter.strokeStyle = stroke_color;
	painter.lineWidth = lineWidth;
	
    painter.beginPath();					//（c.路径填充/描边，注意 beginPath + fill + stroke）
    painter.arc(x, y, radius, 0, Math.PI * 2, false);
    painter.fill();
    painter.stroke();
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};

//==============================
// * DEBUG层级与堆叠级 - 帧刷新（地图界面）
//==============================
var _drill_PJPC_debugMap_update2 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_PJPC_debugMap_update2.call(this);
    this.drill_PJPC_updateCreateDebugSprite1();			//帧刷新 - DEBUG测试切割步骤
    this.drill_PJPC_updateCreateDebugSprite2();			//帧刷新 - DEBUG测试切割样式效果
}
//==============================
// * DEBUG层级与堆叠级 - 帧刷新 DEBUG测试切割步骤
//==============================
Scene_Map.prototype.drill_PJPC_updateCreateDebugSprite1 = function() {
	
	// > 功能开启时
	if( $gameTemp._drill_PJPC_Debug1Enabled == true ){
		
		// > 创建贴图
		if( this._drill_PJPC_Debug1SpriteTank == undefined ){
			this._drill_PJPC_Debug1SpriteTank = [];
			
			// > 载入资源文件
			var bitmap_img = ImageManager.loadBitmap("img/system/", "Window", 0, true);
			var bitmap_cutBoard = new Bitmap(192,192);
			bitmap_cutBoard.drill_PJPC_drawRect( 0,0,192,192, "#ffffff", "#ffffff", 1, "miter" );	//（手画'+'图像）
			bitmap_cutBoard.drill_PJPC_drawRect( 52,15,55,20, "#ffffff", "#000000", 2, "miter" );	//（描边2像素，1像素黑色太薄，检测不到黑色）
			bitmap_cutBoard.drill_PJPC_drawRect( 65,2,20,55, "#ffffff", "#000000", 2, "miter" );	//
			bitmap_cutBoard.drill_PJPC_drawRect( 57,17,36,16, "#ffffff", "#ffffff", 2, "miter" );	//
			
			var piece_x = 75;
			var piece_y = 25;
			var piece_width = 70;
			var piece_x_offset = piece_x - piece_width*0.5;
			var piece_y_offset = piece_y - piece_width*0.5;
			
			
			// > 图像 - 原图片
			var temp_sprite = new Sprite();
			temp_sprite.x = 40;
			temp_sprite.y = 100;
			temp_sprite.bitmap = bitmap_img;
			this._spriteset.addChild( temp_sprite );	//（加在上层）
			this._drill_PJPC_Debug1SpriteTank.push( temp_sprite );
			
			// > 图像 - 原切割板
			var temp_sprite = new Sprite();
			temp_sprite.x = 40;
			temp_sprite.y = 320;
			temp_sprite.bitmap = bitmap_cutBoard;
			this._spriteset.addChild( temp_sprite );	//（加在上层）
			this._drill_PJPC_Debug1SpriteTank.push( temp_sprite );
			
			// > 图像 - 原图片 + 切一小块70x70
			var temp_sprite = new Sprite();
			temp_sprite.x = 270;
			temp_sprite.y = 100;
			var painter_cutImg = bitmap_img._context;
			var imageData_cutImg = painter_cutImg.getImageData( piece_x_offset, piece_y_offset, piece_width, piece_width);
			var new_bitmap = new Bitmap(piece_width,piece_width);
			new_bitmap._context.putImageData( imageData_cutImg, 0,0 );
			temp_sprite.bitmap = new_bitmap;
			this._spriteset.addChild( temp_sprite );	//（加在上层）
			this._drill_PJPC_Debug1SpriteTank.push( temp_sprite );
			
			// > 图像 - 原切割板 + 切一小块70x70 『像素矩阵操作』
			var temp_sprite = new Sprite();
			temp_sprite.x = 270;
			temp_sprite.y = 320;
			var painter_cutBoard = bitmap_cutBoard._context;
			var imageData_cutBoard = painter_cutBoard.getImageData( piece_x_offset, piece_y_offset, piece_width, piece_width);
			var new_bitmap = new Bitmap(piece_width,piece_width);
			new_bitmap._context.putImageData( imageData_cutBoard, 0,0 );
			temp_sprite.bitmap = new_bitmap;
			this._spriteset.addChild( temp_sprite );	//（加在上层）
			this._drill_PJPC_Debug1SpriteTank.push( temp_sprite );
			
			// > 图像 - 原图片 + 切一小块70x70 + 变色 『像素矩阵操作』
			var temp_sprite = new Sprite();
			temp_sprite.x = 470;
			temp_sprite.y = 100;
			var painter_cutImg = bitmap_img._context;
			var imageData_cutImg = painter_cutImg.getImageData( piece_x_offset, piece_y_offset, piece_width, piece_width);
			for(var i = 0; i < imageData_cutImg.data.length; i += 4 ){
				imageData_cutImg.data[i] += 100;	//红
				imageData_cutImg.data[i+1] += 50;	//绿
				imageData_cutImg.data[i+2] -= 50;	//蓝
				//imageData_cutImg.data[i+3];		//透明度
			}
			var new_bitmap = new Bitmap(piece_width,piece_width);
			new_bitmap._context.putImageData( imageData_cutImg, 0,0 );
			temp_sprite.bitmap = new_bitmap;
			this._spriteset.addChild( temp_sprite );	//（加在上层）
			this._drill_PJPC_Debug1SpriteTank.push( temp_sprite );
			
			
			// > 图像 - 原图片 + 切一小块70x70 + 原切割板筛选 『像素矩阵操作』
			var temp_sprite = new Sprite();
			temp_sprite.x = 470;
			temp_sprite.y = 320;
			var painter_cutImg = bitmap_img._context;
			var painter_cutBoard = bitmap_cutBoard._context;
			var imageData_cutImg = painter_cutImg.getImageData( piece_x_offset, piece_y_offset, piece_width, piece_width);
			var imageData_cutBoard = painter_cutBoard.getImageData( piece_x_offset, piece_y_offset, piece_width, piece_width);
			for(var i = 0; i < imageData_cutImg.data.length; i += 4 ){
				var is_empty_pixel = false;
				if( imageData_cutBoard.data[i] < 5 &&  //黑色表示去除像素
					imageData_cutBoard.data[i+1] < 5 &&
					imageData_cutBoard.data[i+2] < 5 ){
					is_empty_pixel = true;
				}
				if( imageData_cutBoard.data[i+3] == 0 ){ //透明表示去除像素
					is_empty_pixel = true;
				}
				if( is_empty_pixel == true ){
					imageData_cutImg.data[i] = 0;
					imageData_cutImg.data[i+1] = 0;
					imageData_cutImg.data[i+2] = 0;
					imageData_cutImg.data[i+3] = 0;
				}
			}
			var new_bitmap = new Bitmap(piece_width,piece_width);
			new_bitmap._context.putImageData( imageData_cutImg, 0,0 );
			temp_sprite.bitmap = new_bitmap;
			this._spriteset.addChild( temp_sprite );	//（加在上层）
			this._drill_PJPC_Debug1SpriteTank.push( temp_sprite );
			
			
			// > 遍历规则(visited) - DEBUG测试 - 计数器
			//DrillUp.g_drill_PJPC_Debug_RecursionCount = 0;
			//DrillUp.g_drill_PJPC_Debug_DFSCount = 0;
			
			// > 图像 - 原切割板 + 选择中心点的白色范围 + 复制图像 『像素矩阵操作』
			var temp_sprite = new Sprite();
			temp_sprite.x = 670;
			temp_sprite.y = 320;
			var painter_cutImg = bitmap_img._context;
			var painter_cutBoard = bitmap_cutBoard._context;
			var imageData_cutImg = painter_cutImg.getImageData( piece_x_offset, piece_y_offset, piece_width, piece_width);
			var imageData_cutBoard = painter_cutBoard.getImageData( piece_x_offset, piece_y_offset, piece_width, piece_width);
			var stroke_color = { "r":0,"g":0,"b":255,"a":255 };
			var imageData_new = $gameTemp.drill_PJPC_copyPixelInMaskNearByRange( piece_width*0.5, piece_width*0.5, imageData_cutImg, imageData_cutBoard, stroke_color );
			var new_bitmap = new Bitmap(piece_width,piece_width);
			new_bitmap._context.putImageData( imageData_new, 0,0 );
			temp_sprite.bitmap = new_bitmap;
			this._spriteset.addChild( temp_sprite );	//（加在上层）
			this._drill_PJPC_Debug1SpriteTank.push( temp_sprite );
			
			// > 遍历规则(visited) - DEBUG测试 - 计数器
			//alert(
			//	"回溯进入次数：" + DrillUp.g_drill_PJPC_Debug_RecursionCount + "\n" +
			//	"遍历执行次数：" + DrillUp.g_drill_PJPC_Debug_DFSCount
			//);	//（执行次数：1792）
		}
		
	// > 功能关闭时
	}else{
		
		// > 功能关闭时 - 销毁贴图
		if( this._drill_PJPC_Debug1SpriteTank != undefined ){
			for(var i = 0; i < this._drill_PJPC_Debug1SpriteTank.length; i++){
				var temp_sprite = this._drill_PJPC_Debug1SpriteTank[i];
				this._spriteset.removeChild(temp_sprite);
			}
			this._drill_PJPC_Debug1SpriteTank = undefined;
		}
	}
}
//==============================
// * DEBUG层级与堆叠级 - 帧刷新 DEBUG测试切割样式效果
//==============================
Scene_Map.prototype.drill_PJPC_updateCreateDebugSprite2 = function() {
	
	// > 功能开启时
	if( $gameTemp._drill_PJPC_Debug2Enabled == true ){
		
		// > 创建贴图
		if( this._drill_PJPC_Debug2SpriteTank == undefined ){
			this._drill_PJPC_Debug2SpriteTank = [];
			
			// > 载入资源文件
			var cutBoard_style = DrillUp.g_PJPC_styleList[0];
			var bitmap_img = ImageManager.loadBitmap("img/system/", "Damage", 0, true);
			var bitmap_cutBoard = ImageManager.loadBitmap("img/pictures/", cutBoard_style['cutBoard_src'], 0, true);
			
			// > 图像 - 原图片
			var temp_sprite = new Sprite();
			temp_sprite.x = 40;
			temp_sprite.y = 100;
			temp_sprite.bitmap = bitmap_img;
			this._spriteset.addChild( temp_sprite );	//（加在上层）
			this._drill_PJPC_Debug2SpriteTank.push( temp_sprite );
			
			// > 图像 - 原切割板
			var temp_sprite = new Sprite();
			temp_sprite.x = 40;
			temp_sprite.y = 320;
			temp_sprite.bitmap = bitmap_cutBoard;
			this._spriteset.addChild( temp_sprite );	//（加在上层）
			this._drill_PJPC_Debug2SpriteTank.push( temp_sprite );
			
			
			// > 遍历规则(visited) - DEBUG测试 - 计数器
			//DrillUp.g_drill_PJPC_Debug_RecursionCount = 0;
			//DrillUp.g_drill_PJPC_Debug_DFSCount = 0;
			
			// > 取四片
			var bitmap_list = $gameTemp.drill_PJPC_cutBoardExecute( bitmap_img, cutBoard_style );
			
			// > 遍历规则(visited) - DEBUG测试 - 计数器
			//alert(
			//	"回溯进入次数：" + DrillUp.g_drill_PJPC_Debug_RecursionCount + "\n" +
			//	"遍历执行次数：" + DrillUp.g_drill_PJPC_Debug_DFSCount
			//);
			
			if( bitmap_list.length >= 4 ){
				
				var temp_sprite = new Sprite();
				temp_sprite.x = 300;
				temp_sprite.y = 120;
				temp_sprite.bitmap = bitmap_list[0];
				this._spriteset.addChild( temp_sprite );	//（加在上层）
				this._drill_PJPC_Debug2SpriteTank.push( temp_sprite );
				
				var temp_sprite = new Sprite();
				temp_sprite.x = 470;
				temp_sprite.y = 120;
				temp_sprite.bitmap = bitmap_list[1];
				this._spriteset.addChild( temp_sprite );	//（加在上层）
				this._drill_PJPC_Debug2SpriteTank.push( temp_sprite );
				
				var temp_sprite = new Sprite();
				temp_sprite.x = 300;
				temp_sprite.y = 340;
				temp_sprite.bitmap = bitmap_list[2];
				this._spriteset.addChild( temp_sprite );	//（加在上层）
				this._drill_PJPC_Debug2SpriteTank.push( temp_sprite );
				
				var temp_sprite = new Sprite();
				temp_sprite.x = 470;
				temp_sprite.y = 340;
				temp_sprite.bitmap = bitmap_list[3];
				this._spriteset.addChild( temp_sprite );	//（加在上层）
				this._drill_PJPC_Debug2SpriteTank.push( temp_sprite );
			}
		}
		
	// > 功能关闭时
	}else{
		
		// > 功能关闭时 - 销毁贴图
		if( this._drill_PJPC_Debug2SpriteTank != undefined ){
			for(var i = 0; i < this._drill_PJPC_Debug2SpriteTank.length; i++){
				var temp_sprite = this._drill_PJPC_Debug2SpriteTank[i];
				this._spriteset.removeChild(temp_sprite);
			}
			this._drill_PJPC_Debug2SpriteTank = undefined;
		}
	}
}


