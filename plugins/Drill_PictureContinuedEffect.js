//=============================================================================
// Drill_PictureContinuedEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        图片 - 持续动作效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureContinuedEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以播放图片持续执行的各种动作。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片对象。
 * 2.更多详细内容，去看看 "7.行走图 > 关于动作效果.docx"。
 * 细节：
 *   (1.所有动作都是并行的，你需要手动设置总时间。
 *      并且需要 等待 时，加等待指令。
 *   (2.持续动作 同时只能播放一种。
 *      所有 持续动作 都可以与消失/显现动作效果效果叠加，但不包括透明度的叠加。
 *      叠加效果要自己试，但叠加效果一般都不太好。
 *   (3.动作效果 与 动画序列 插件相互独立，可以叠加使用。
 * 指令：
 *   (1.透明度为0的图片不能执行持续动作效果。
 *      你可以设置透明度为1，同样看不见，但是能执行动作效果。
 *   (2.不同类型动作的参数和指令有较大区别。
 *      如果指令的参数名和参数数量不匹配，则动作不会被执行。
 * 临时动作/永久动作：
 *   (1.插件指令的类型中，都有"总时间"控制，用于临时动作。
 *      你可以填写"总时间[无限]"，使得图片永久执行动作。
 *   (2.删除图片、修改图片都不会终止图片动作。
 *      必须手动执行插件指令来终止。
 * 完整流程动作：
 *   (1.含有"缓冲时间"、"开始时间"、"结束时间"的动作，
 *      都称为完整流程动作，都有一套 开始、持续、结束 的流程。
 *      比如"空中飘浮"、"旋转状态"、"缩放状态"等动作。
 *   (2.以"空中飘浮"动作为例，开始、结束的过程，会在"缓冲时间"内完成。
 *      持续150，缓冲60，则表示 开始过程60，结束过程60，中间过程150-60-60=30。
 *      "空中飘浮"可以设置"总时间[无限]"，如果要让其停下，
 *      使用"结束动作"指令即可。
 * 设计：
 *   (1.持续动作在galgame中的肖像表情切换非常常用。
 *      比如兴奋地跳跃、害怕的震动、平静的呼吸、惊讶地点头、开心地摇摆。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行持续动作：
 * 
 * 插件指令：>持续动作 : 图片[1] : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 图片变量[21] : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 批量图片[10,11] : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 批量图片变量[21,22] : 标准闪烁 : 总时间[180] : 周期[30]
 * 
 * 插件指令：>持续动作 : 图片[1] : 标准闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 渐变闪烁 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 顺时针旋转 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 逆时针旋转 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 垂直卡片旋转 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 水平卡片旋转 : 总时间[180] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 上下震动 : 总时间[180] : 周期[6] : 震动幅度[10]
 * 插件指令：>持续动作 : 图片[1] : 左右震动 : 总时间[180] : 周期[6] : 震动幅度[10]
 * 插件指令：>持续动作 : 图片[1] : 左右摇晃 : 总时间[180] : 周期[20] : 摇晃幅度[15]
 * 插件指令：>持续动作 : 图片[1] : 钟摆摇晃 : 总时间[180] : 周期[20] : 摇晃幅度[15]
 * 插件指令：>持续动作 : 图片[1] : 锚点摇晃 : 总时间[180] : 周期[20] : 摇晃幅度[15]
 * 插件指令：>持续动作 : 图片[1] : 呼吸效果 : 总时间[180] : 周期[45] : 呼吸幅度[6]
 * 插件指令：>持续动作 : 图片[1] : 原地小跳 : 总时间[180] : 周期[90] : 跳跃高度[20]
 * 插件指令：>持续动作 : 图片[1] : 反复缩放 : 总时间[180] : 缓冲时间[10] : 周期[60] : 最小缩放[1.00] : 最大缩放[1.25]
 * 插件指令：>持续动作 : 图片[1] : 空中飘浮 : 总时间[240] : 缓冲时间[60] : 飘浮高度[100] : 周期[30] : 幅度[8]
 * 插件指令：>持续动作 : 图片[1] : 旋转状态 : 总时间[240] : 缓冲时间[60] : 旋转角度[90]
 * 插件指令：>持续动作 : 图片[1] : 缩放状态 : 总时间[240] : 缓冲时间[60] : 缩放比例[1.5]
 * 插件指令：>持续动作 : 图片[1] : 顺时针旋转(渐变) : 总时间[480] : 周期[8] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 图片[1] : 逆时针旋转(渐变) : 总时间[480] : 周期[8] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 图片[1] : 垂直卡片旋转(渐变) : 总时间[480] : 周期[8] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 图片[1] : 水平卡片旋转(渐变) : 总时间[480] : 周期[8] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 图片[1] : 上下震动(渐变) : 总时间[480] : 周期[6] : 震动幅度[12] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 图片[1] : 左右震动(渐变) : 总时间[480] : 周期[6] : 震动幅度[12] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 图片[1] : 左右摇晃(渐变) : 总时间[480] : 周期[8] : 摇晃幅度[25] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 图片[1] : 钟摆摇晃(渐变) : 总时间[480] : 周期[8] : 摇晃幅度[25] : 开始时间[180] : 结束时间[120]
 * 插件指令：>持续动作 : 图片[1] : 锚点摇晃(渐变) : 总时间[480] : 周期[8] : 摇晃幅度[25] : 开始时间[180] : 结束时间[120]
 * 
 * 1.前半部分（图片）和 后半部分（标准闪烁 : 总时间[180] : 周期[30]）
 *   的参数可以随意组合。一共有4*26种组合方式。
 * 2.参数中"总时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"幅度"、"高度"的单位是像素。
 * 3.类型的更详细介绍，去看看 "7.行走图 > 关于动作效果.docx"。
 * 2."标准闪烁 : 总时间[180] : 周期[30]"表示：
 *    闪烁30帧，15帧透明，15帧不透明，持续180帧。也就是闪六次。
 * 5."旋转"类型中，一个周期旋转一整圈。
 *   持续60帧，周期30帧，则表示图像旋转两圈后结束。
 * 6.以"空中飘浮"动作为例，开始、结束的过程，会在"缓冲时间"内完成。
 *   持续150，缓冲60，则表示 开始过程60，结束过程60，中间过程150-60-60=30。
 *   "空中飘浮"可以设置"总时间[无限]"，如果要让其停下，
 *   使用"结束动作"指令即可。
 * 7."(渐变)"类型的效果，在结束动作后，都能够在原状态下慢慢减速停住。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 无限的时间
 * 你可以将上面插件指令的总时间中，填"无限"：
 * 
 * 插件指令：>持续动作 : 图片[1] : 标准闪烁 : 总时间[无限] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 旋转状态 : 总时间[无限] : 缓冲时间[60] : 旋转角度[90]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 结束动作
 * 上述的部分类型中包含完整流程动作，你可以控制其结束：
 * 
 * 插件指令：>持续动作 : 图片[1] : 反复缩放 : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 空中飘浮 : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 旋转状态 : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 缩放状态 : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 顺时针旋转(渐变) : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 逆时针旋转(渐变) : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 垂直卡片旋转(渐变) : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 水平卡片旋转(渐变) : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 上下震动(渐变) : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 左右震动(渐变) : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 左右摇晃(渐变) : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 钟摆摇晃(渐变) : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 锚点摇晃(渐变) : 结束动作
 * 插件指令：>持续动作 : 图片[1] : 立即终止动作
 * 
 * 1.含"缓冲时间"的完整流程动作，可以使得该动作能够缓冲结束。
 *   而"立即终止动作"会直接终止所有动作，立即复原。
 * 2.如果你设置了"空中飘浮"为"总时间[无限]"，让其停下来可以使用"结束动作"指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取状态
 * 你可以单独获取图片的状态信息，并赋值给开关或字符串：
 * 
 * 插件指令：>持续动作 : 图片[1] : 是否正在播放 : 开关[21]
 * 插件指令：>持续动作 : 图片变量[21] : 是否正在播放 : 开关[21]
 * 
 * 插件指令：>持续动作 : 图片[1] : 是否正在播放 : 开关[21]
 * 插件指令：>持续动作 : 图片[1] : 获取正在播放的类型 : 字符串[21]
 * 
 * 1.前半部分（图片）和 后半部分（是否正在播放 : 开关[21]）
 *   的参数可以随意组合。一共有2*2种组合方式。
 * 2.用开关值获取时，可以考虑设置并行执行时获取。
 * 3."字符串[21]"表示 字符串核心 中的字符串，
 *   如果当前没有播放的类型，则获取到 空字符串 。
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
 * 测试方法：   图片管理层放置10个动作变化的图片测试。
 * 测试结果：   战斗界面中，平均消耗为：【23.34ms】
 *              200个事件的地图中，平均消耗为：【33.89ms】
 *              100个事件的地图中，平均消耗为：【32.41ms】
 *               50个事件的地图中，平均消耗为：【24.94ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.图片变化和事件的数量并没有多大关系，所以消耗保持在30ms左右。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件指令图片检查。
 * [v1.2]
 * 修复了 该插件 造成图片插件设置斜切无效的bug。
 * [v1.3]
 * 添加了 顺时针旋转(渐变)、上下震动(渐变) 等七种类型。
 * [v1.4]
 * 添加了 钟摆摇晃、锚点摇晃、钟摆摇晃(渐变)、锚点摇晃(渐变) 四个类型。
 * 添加了插件指令获取状态信息功能。
 * [v1.5]
 * 优化了数学缩短锚点的计算公式。
 * [v1.6]
 * 优化了渐变的公式设置。
 * [v1.7]
 * 优化了内部结构，减小存档时数据占用的空间。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PCE（Picture_Continued_Effect）
//		临时全局变量	无
//		临时局部变量	this._drill_PCE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	24.94ms 23.34ms（sprite_picture.update）
//		★最坏情况		地图放了大量图片，并且所有图片都在持续变化。
//		★备注			要说图片贴图和事件贴图哪个消耗大，真无法确定。
//						事件贴图面积小但变化多，而图片面积大但变化不多。
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
//			->☆图片贴图控制
//			->☆图片的属性
//			->☆持续动作
//				->搜索『持续动作』查看所有动作
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			7.行走图 > 关于动作效果（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			无
//
//		★其它说明细节：
//			1.图片的锚点不是固定的，可能会到处变，注意控制锚点。
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
	DrillUp.g_PCE_PluginTip_curName = "Drill_PictureContinuedEffect.js 图片-持续动作效果";
	DrillUp.g_PCE_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PCE_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PCE_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	//==============================
	// * 提示信息 - 报错 - 时间计算不正确
	//==============================
	DrillUp.drill_PCE_getPluginTip_allTimeError = function( playing_type ){
		return "【" + DrillUp.g_PCE_PluginTip_curName + "】\n动作效果\""+playing_type+"\"播放失败，其配置的时间参数总和大于 总时间的值。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_PCE_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_PCE_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureContinuedEffect = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureContinuedEffect');
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PCE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PCE_pluginCommand.call(this, command, args);
	this.drill_PCE_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PCE_pluginCommand = function( command, args ){
	if( command === ">持续动作" ){ 
	
		/*-----------------对象组获取------------------*/
		var pics = null;			// 图片对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( pics == null && unit.indexOf("批量图片[") != -1 ){
				unit = unit.replace("批量图片[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_PCE_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && unit.indexOf("批量图片变量[") != -1 ){
				unit = unit.replace("批量图片变量[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_PCE_isPictureExist( pic_id ) == false ){ continue; }
					var pic = $gameScreen.picture( pic_id );
					pics.push( pic );
				}
			}
			if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PCE_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PCE_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
		//// > 透明度检查
		//if( pics != null ){
		//	var temp_tank = [];
		//	for( var k=0; k < pics.length; k++ ){
		//		if( pics[k].opacity() != 0 ){
		//			temp_tank.push( pics[k] );
		//		}
		//	}
		//	pics = temp_tank;
		//}
		
		// > 未获取到对象，直接跳过
		if( pics == null ){ return; }

		
		/*-----------------立即终止动作------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即终止动作" ){
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
					}
				}
			}
		}	
		
		/*-----------------获取状态------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "是否正在播放" || type == "是否正在播放持续动作" ){
				temp1 = temp1.replace("开关[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				if( pics != null){
					var b = false;
					for( var k=0; k < pics.length; k++ ){
						b = pics[k].drill_PCE_isPlaying();
					}
					$gameSwitches.setValue( temp1, b );
				}
			}
			if( type == "获取正在播放的类型" && Imported.Drill_CoreOfString ){	//【系统-字符串核心】
				temp1 = temp1.replace("字符串[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				if( pics != null){
					var str = false;
					for( var k=0; k < pics.length; k++ ){
						str = pics[k].drill_PCE_getPlayingType();
					}
					$gameStrings.setValue( temp1, str );
				}
			}
		}	
			
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			/*-----------------标准闪烁 - 开始------------------*/
			if( type == "标准闪烁" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingFlicker( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------渐变闪烁 - 开始------------------*/
			if( type == "渐变闪烁" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingFlickerCos( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------顺时针旋转 - 开始------------------*/
			if( type == "顺时针旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingRotate( Number(temp1),Number(temp2), 1 );
					}
				}
			}
			/*-----------------逆时针旋转 - 开始------------------*/
			if( type == "逆时针旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingRotate( Number(temp1),Number(temp2), -1 );
					}
				}
			}
			/*-----------------垂直卡片旋转 - 开始------------------*/
			if( type == "垂直卡片旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingRotateVer( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------水平卡片旋转 - 开始------------------*/
			if( type == "水平卡片旋转" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingRotateHor( Number(temp1),Number(temp2) );
					}
				}
			}	
		}
		
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			/*-----------------上下震动 - 开始------------------*/
			if( type == "上下震动" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingShakeUD( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------左右震动 - 开始------------------*/
			if( type == "左右震动" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingShakeLR( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------左右摇晃 - 开始------------------*/
			if( type == "左右摇晃" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingShakeRotate( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------钟摆摇晃 - 开始------------------*/
			if( type == "钟摆摇晃" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingPendulumRotate( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------锚点摇晃 - 开始------------------*/
			if( type == "锚点摇晃" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingAnchorRotate( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------呼吸效果 - 开始------------------*/
			if( type == "呼吸效果" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("呼吸幅度[","");
				temp3 = temp3.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingBreathing( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------原地小跳 - 开始------------------*/
			if( type == "原地小跳" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("跳跃高度[","");
				temp3 = temp3.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingJumping( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------旋转状态 - 开始------------------*/
			if( type == "旋转状态" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("旋转角度[","");
				temp3 = temp3.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingRotateState( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
			/*-----------------缩放状态 - 开始------------------*/
			if( type == "缩放状态" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("缩放比例[","");
				temp3 = temp3.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingResizeState( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}	
		}
		
		if( args.length == 12 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			var temp4 = String(args[11]);
			/*-----------------顺时针旋转(渐变) - 开始------------------*/
			if( type == "顺时针旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingRotate_Gradual( Number(temp1),Number(temp2),-1,Number(temp3),Number(temp4) );
					}
				}
			}	
			/*-----------------逆时针旋转(渐变) - 开始------------------*/
			if( type == "逆时针旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingRotate_Gradual( Number(temp1),Number(temp2),1,Number(temp3),Number(temp4) );
					}
				}
			}	
			/*-----------------垂直卡片旋转(渐变) - 开始------------------*/
			if( type == "垂直卡片旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingRotateVer_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4) );
					}
				}
			}	
			/*-----------------水平卡片旋转(渐变) - 开始------------------*/
			if( type == "水平卡片旋转(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("开始时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("结束时间[","");
				temp4 = temp4.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingRotateHor_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4) );
					}
				}
			}	
		}
		
		if( args.length == 14 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			var temp4 = String(args[11]);
			var temp5 = String(args[13]);
			/*-----------------反复缩放 - 开始------------------*/
			if( type == "反复缩放" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("周期[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("最小缩放[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("最大缩放[","");
				temp5 = temp5.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingZooming( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------空中飘浮 - 开始------------------*/
			if( type == "空中飘浮" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("飘浮高度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("周期[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("幅度[","");
				temp5 = temp5.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingFloating( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------上下震动(渐变) - 开始------------------*/
			if( type == "上下震动(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingShakeUD_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------左右震动(渐变) - 开始------------------*/
			if( type == "左右震动(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("震动幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingShakeLR_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------左右摇晃(渐变) - 开始------------------*/
			if( type == "左右摇晃(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingShakeRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------钟摆摇晃(渐变) - 开始------------------*/
			if( type == "钟摆摇晃(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingPendulumRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
			/*-----------------锚点摇晃(渐变) - 开始------------------*/
			if( type == "锚点摇晃(渐变)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("摇晃幅度[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("开始时间[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("结束时间[","");
				temp5 = temp5.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingAnchorRotate_Gradual( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
			}	
		}
		
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( temp1 == "结束动作" ){
				/*-----------------反复缩放 - 结束动作------------------*/
				if( type == "反复缩放" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingZooming();
						}
					}
				}
				/*-----------------空中飘浮 - 结束动作------------------*/
				if( type == "空中飘浮" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingFloating();
						}
					}
				}
				/*-----------------旋转状态 - 结束动作------------------*/
				if( type == "旋转状态" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingRotateState();
						}
					}
				}
				/*-----------------缩放状态 - 结束动作------------------*/
				if( type == "缩放状态" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingResizeState();
						}
					}
				}
				/*-----------------顺时针/逆时针旋转(渐变) - 结束动作------------------*/
				if( type == "顺时针旋转(渐变)" || type == "逆时针旋转(渐变)" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingRotate_Gradual();
						}
					}
				}
				/*-----------------垂直卡片旋转(渐变) - 结束动作------------------*/
				if( type == "垂直卡片旋转(渐变)" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingRotateVer_Gradual();
						}
					}
				}
				/*-----------------水平卡片旋转(渐变) - 结束动作------------------*/
				if( type == "水平卡片旋转(渐变)" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingRotateHor_Gradual();
						}
					}
				}
				/*-----------------上下震动(渐变) - 结束动作------------------*/
				if( type == "上下震动(渐变)" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingShakeUD_Gradual();
						}
					}
				}
				/*-----------------左右震动(渐变) - 结束动作------------------*/
				if( type == "左右震动(渐变)" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingShakeLR_Gradual();
						}
					}
				}
				/*-----------------左右摇晃(渐变) - 结束动作------------------*/
				if( type == "左右摇晃(渐变)" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingShakeRotate_Gradual();
						}
					}
				}
				/*-----------------钟摆摇晃(渐变) - 结束动作------------------*/
				if( type == "钟摆摇晃(渐变)" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingPendulumRotate_Gradual();
						}
					}
				}
				/*-----------------锚点摇晃(渐变) - 结束动作------------------*/
				if( type == "锚点摇晃(渐变)" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingAnchorRotate_Gradual();
						}
					}
				}
			}
		}
	}
		
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PCE_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PCE_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};
//==============================
// * 插件指令 - STG兼容『STG的插件指令』
//==============================
if( Imported.Drill_STG__objects ){
	
	//==============================
	// * 插件指令 - STG指令绑定
	//==============================
	var _drill_STG_PCE_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_PCE_pluginCommand.call(this, command, args);
		this.drill_PCE_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_PCE_pluginCommand = Game_Interpreter.prototype.drill_PCE_pluginCommand;
};



//=============================================================================
// ** ☆图片贴图控制
//
//			说明：	> 此模块专门控制 图片贴图 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片贴图控制 - 帧刷新
//==============================
var _drill_PCE_sp_update2 = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_drill_PCE_sp_update2.call(this);
	if( this.picture() ){
		this.drill_PCE_updateEffect();			//帧刷新 - 执行变换
		this.drill_PCE_updateBitmap();			//帧刷新 - 获取资源宽高
	}
};
//==============================
// * 图片贴图控制 - 帧刷新 - 执行变换
//
//			说明：	> 此处直接作用于 贴图属性，并不影响 数据最终变换值 。
//==============================
Sprite_Picture.prototype.drill_PCE_updateEffect = function() {
	if( this.picture().drill_PCE_isPlaying() != true ){ return; }
	
	var sprite_data = this.picture()._drill_PCE_spriteData;
												// 贴图 - 锚点X（不操作）
												// 贴图 - 锚点Y（不操作）
	this.x += sprite_data.x ;					// 贴图 - 位置X
	this.y += sprite_data.y ;					// 贴图 - 位置Y
	this.scale.x += sprite_data.scale_x;		// 贴图 - 缩放X
	this.scale.y += sprite_data.scale_y;		// 贴图 - 缩放Y
	
	if( sprite_data.opacity != -1 ){			// 贴图 - 透明度
		this.opacity = sprite_data.opacity;		// 
	}											//
	
	//this.skew.x += sprite_data.skew_x;		// 贴图 - 斜切X
	//this.skew.y += sprite_data.skew_y;		// 贴图 - 斜切Y
	this.rotation += sprite_data.rotation;		// 贴图 - 旋转
}
//==============================
// * 图片贴图控制 - 帧刷新 - 获取资源宽高
//==============================
Sprite_Picture.prototype.drill_PCE_updateBitmap = function() {
	if( this.bitmap && this.bitmap.isReady() &&
		this.picture()._drill_PCE_spriteData != undefined ){
		this.picture()._drill_PCE_spriteData.real_width = this.bitmap.width;
		this.picture()._drill_PCE_spriteData.real_height = this.bitmap.height;
	}
}


//=============================================================================
// ** ☆图片的属性
//
//			说明：	> 此模块专门管理 图片的属性 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片的属性 - 初始化
//==============================
var _drill_PCE_c_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	this._drill_PCE_spriteData = undefined;
	this._drill_PCE_param = undefined;
	_drill_PCE_c_initialize.call(this);
}
//==============================
// * 图片的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Picture.prototype.drill_PCE_checkData = function() {
	
	// > 贴图属性
	if( this._drill_PCE_spriteData == undefined ){
		this._drill_PCE_spriteData = {};
		
		if( this._origin == 0 ){
			this._drill_PCE_spriteData.anchor_x = 0;	// 锚点X
			this._drill_PCE_spriteData.anchor_y = 0;	// 锚点Y
		}else if( this._origin == 1 ){
			this._drill_PCE_spriteData.anchor_x = 0.5;	// 锚点X
			this._drill_PCE_spriteData.anchor_y = 0.5;	// 锚点Y
		}
		if( Imported.Drill_CoreOfPicture ){  //【图片 - 图片优化核心】
			this._drill_PCE_spriteData.anchor_x = this._drill_anchorX;
			this._drill_PCE_spriteData.anchor_y = this._drill_anchorY;
		}
		
		this._drill_PCE_spriteData.x = 0;				// 位置X
		this._drill_PCE_spriteData.y = 0;				// 位置Y
		this._drill_PCE_spriteData.scale_x = 0;			// 缩放X
		this._drill_PCE_spriteData.scale_y = 0;			// 缩放Y
		this._drill_PCE_spriteData.opacity = -1;		// 透明度（不叠加）
		this._drill_PCE_spriteData.skew_x = 0;			// 斜切X
		this._drill_PCE_spriteData.skew_y = 0;			// 斜切Y
		this._drill_PCE_spriteData.rotation = 0;		// 旋转
		
		this._drill_PCE_spriteData.real_width = -1;		// 贴图宽
		this._drill_PCE_spriteData.real_height = -1;	// 贴图高
	}
	
	// > 动作配置
	if( this._drill_PCE_param == undefined ){
		this._drill_PCE_param = {};
		this._drill_PCE_param.playing_type = "";		// 显示类型
	}
}
//==============================
// * 图片的属性 - 帧刷新
//==============================
var _drill_PCE_c_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_drill_PCE_c_update.call(this);
	
	if( this._drill_PCE_spriteData == undefined ){ return; } 		//需要等资源加载完成
	if( this._drill_PCE_spriteData.real_width == -1 ){ return; }	//
	if( this._drill_PCE_spriteData.real_height == -1 ){ return; }	//
	
	this.drill_PCE_updateSustainingFlicker();					//帧刷新 - 标准闪烁
	this.drill_PCE_updateSustainingFlickerCos();				//帧刷新 - 渐变闪烁
	this.drill_PCE_updateSustainingRotate();					//帧刷新 - 顺时针/逆时针旋转
	this.drill_PCE_updateSustainingRotateVer();					//帧刷新 - 垂直卡片旋转
	this.drill_PCE_updateSustainingRotateHor();					//帧刷新 - 水平卡片旋转
	this.drill_PCE_updateSustainingShakeUD();					//帧刷新 - 上下震动
	this.drill_PCE_updateSustainingShakeLR();					//帧刷新 - 左右震动
	this.drill_PCE_updateSustainingShakeRotate();				//帧刷新 - 左右摇晃
	this.drill_PCE_updateSustainingPendulumRotate();			//帧刷新 - 钟摆摇晃
	this.drill_PCE_updateSustainingAnchorRotate();				//帧刷新 - 锚点摇晃
	this.drill_PCE_updateSustainingBreathing();					//帧刷新 - 呼吸效果
	this.drill_PCE_updateSustainingJumping();					//帧刷新 - 原地小跳
	this.drill_PCE_updateSustainingZooming();					//帧刷新 - 反复缩放
	this.drill_PCE_updateSustainingFloating();					//帧刷新 - 空中飘浮
	this.drill_PCE_updateSustainingRotateState();				//帧刷新 - 旋转状态
	this.drill_PCE_updateSustainingResizeState();				//帧刷新 - 缩放状态
	this.drill_PCE_updateSustainingRotate_Gradual();			//帧刷新 - 顺时针/逆时针旋转(渐变)
	this.drill_PCE_updateSustainingRotateVer_Gradual();			//帧刷新 - 垂直卡片旋转(渐变)
	this.drill_PCE_updateSustainingRotateHor_Gradual();			//帧刷新 - 水平卡片旋转(渐变)
	this.drill_PCE_updateSustainingShakeUD_Gradual();			//帧刷新 - 上下震动(渐变)
	this.drill_PCE_updateSustainingShakeLR_Gradual();			//帧刷新 - 左右震动(渐变)
	this.drill_PCE_updateSustainingShakeRotate_Gradual();		//帧刷新 - 左右摇晃(渐变)
	this.drill_PCE_updateSustainingPendulumRotate_Gradual();	//帧刷新 - 钟摆摇晃(渐变)
	this.drill_PCE_updateSustainingAnchorRotate_Gradual();		//帧刷新 - 锚点摇晃(渐变)
}
//==============================
// * 图片的属性 - 控制 - 显示图片
//==============================
var _drill_PCE_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
	_drill_PCE_p_show.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
	if( this._drill_PCE_spriteData != undefined ){
		if( this._origin == 0 ){
			this._drill_PCE_spriteData.anchor_x = 0;	// 锚点X
			this._drill_PCE_spriteData.anchor_y = 0;	// 锚点Y
		}else if( this._origin == 1 ){
			this._drill_PCE_spriteData.anchor_x = 0.5;	// 锚点X
			this._drill_PCE_spriteData.anchor_y = 0.5;	// 锚点Y
		}
		if( Imported.Drill_CoreOfPicture ){  //【图片 - 图片优化核心】
			this._drill_PCE_spriteData.anchor_x = this._drill_anchorX;
			this._drill_PCE_spriteData.anchor_y = this._drill_anchorY;
		}
	}
}
//==============================
// * 图片的属性 - 控制 - 移动图片
//==============================
var _drill_PCE_p_move = Game_Picture.prototype.move;
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration) {
	_drill_PCE_p_move.call(this, origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
	if( this._drill_PCE_spriteData != undefined ){
		if( this._origin == 0 ){
			this._drill_PCE_spriteData.anchor_x = 0;	// 锚点X
			this._drill_PCE_spriteData.anchor_y = 0;	// 锚点Y
		}else if( this._origin == 1 ){
			this._drill_PCE_spriteData.anchor_x = 0.5;	// 锚点X
			this._drill_PCE_spriteData.anchor_y = 0.5;	// 锚点Y
		}
		if( Imported.Drill_CoreOfPicture ){  //【图片 - 图片优化核心】
			this._drill_PCE_spriteData.anchor_x = this._drill_anchorX;
			this._drill_PCE_spriteData.anchor_y = this._drill_anchorY;
		}
	}
}

//==============================
// * 图片的属性 - 是否正在播放（开放函数）
//==============================
Game_Picture.prototype.drill_PCE_isPlaying = function() {
	if( this._drill_PCE_param == undefined ){ return false; }
	if( this._drill_PCE_param.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 图片的属性 - 获取正在播放的类型（开放函数）
//==============================
Game_Picture.prototype.drill_PCE_getPlayingType = function() {
	if( this._drill_PCE_param == undefined ){ return ""; }
	return this._drill_PCE_param.playing_type;
}
//==============================
// * 图片的属性 - 设置透明度（开放函数）
//==============================
Game_Picture.prototype.drill_PCE_setOpacity = function( opacity ){
	if( isNaN(opacity) ){
		alert( DrillUp.drill_PCE_getPluginTip_ParamIsNaN( "opacity" ) );
	}
	this._opacity = opacity;
}
//==============================
// * 图片的属性 - 立即终止动作（开放函数）
//==============================
Game_Picture.prototype.drill_PCE_stopEffect = function() {
	if( this._drill_PCE_spriteData != undefined &&
		this._drill_PCE_spriteData.opacity != -1 ){
		this.drill_PCE_setOpacity(255);  //（透明度若出现修改才还原）
	}
	this._drill_PCE_spriteData = undefined;
	this._drill_PCE_param = undefined;
}

//==============================
// * 图片的属性 - 数学工具 - 锁定锚点
//			
//			参数：	> org_anchor_x 数字    （原贴图锚点X）
//					> org_anchor_y 数字    （原贴图锚点Y）
//					> target_anchor_x 数字 （新的锚点X）
//					> target_anchor_y 数字 （新的锚点Y）
//					> width 数字           （贴图宽度）
//					> height 数字          （贴图高度）
//					> rotation 数字        （旋转度数，弧度）
//					> scale_x,scale_y 数字 （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字   （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }         （偏移的坐标）
//			
//			说明：	> 修正 旋转+缩放+斜切 的坐标，使其看起来像是在绕着 新的锚点 变换。
//					  旋转+缩放+斜切 可为负数。
//==============================
Game_Temp.prototype.drill_PCE_Math2D_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图锚点 
					target_anchor_x,target_anchor_y, 	//新的锚点 
					width, height,						//贴图高宽
					rotation,							//变换的值（旋转）
					scale_x, scale_y,					//变换的值（缩放）
					skew_x, skew_y  ){					//变换的值（斜切）
	
	if( scale_x == undefined ){ scale_x = 1; }
	if( scale_y == undefined ){ scale_y = 1; }
	if( skew_x == undefined ){ skew_x = 0; }
	if( skew_y == undefined ){ skew_y = 0; }
	
	// > 参数准备 （来自 Pixi.Transform）
    var _cx = 1; // cos rotation + skewY;
    var _sx = 0; // sin rotation + skewY;
    var _cy = 0; // cos rotation + Math.PI/2 - skewX;
    var _sy = 1; // sin rotation + Math.PI/2 - skewX;
	
	// > 旋转+斜切 （来自 Pixi.Transform.prototype.updateSkew）
    _cx = Math.cos( rotation + skew_y );
    _sx = Math.sin( rotation + skew_y );
    _cy = -Math.sin( rotation - skew_x ); // cos, added PI/2
    _sy = Math.cos( rotation - skew_x ); // sin, added PI/2
	
	// > 缩放 （来自 Pixi.Transform.prototype.updateLocalTransform）
    var a = _cx * scale_x;
    var b = _sx * scale_x;
    var c = _cy * scale_y;
    var d = _sy * scale_y;
	
	// > 将参数应用到坐标
	var cur_x = width  * target_anchor_x;
	var cur_y = height * target_anchor_y;
	var center_x = width  * org_anchor_x;
	var center_y = height * org_anchor_y;
	var dx = (center_x - cur_x);
	var dy = (center_y - cur_y);
    var tar_x = cur_x + (dx * a + dy * c) - center_x;
    var tar_y = cur_y + (dx * b + dy * d) - center_y;
	
	return { "x":tar_x, "y":tar_y };
}
//==============================
// * 图片的属性 - 数学工具 - 抛物线三点式
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//					> x3,y3 数字（点C）
//			返回：	> { a:0, b:0, c:0 } （抛物线公式的abc）
//			
//			说明：	已知三点，返回抛物线公式 y = a*x^2 + b*x + c 的abc值。
//==============================
Game_Temp.prototype.drill_PCE_Math2D_getParabolicThree = function( x1,y1,x2,y2,x3,y3 ){
	
	var b = ((x2*x2 - x3*x3)*(y1 - y2) - (x1*x1 - x2*x2)*(y2 - y3)) / ((x2*x2 - x3*x3)*(x1 - x2) - (x1*x1 - x2*x2)*(x2 - x3));
	var a = (y1 - y2 - b*(x1 - x2)) / (x1*x1 - x2*x2);
	var c = y1 - a*x1*x1 - b*x1;
	
	return { "a":a, "b":b, "c":c };
}



//=============================================================================
// ** ☆持续动作
//
//			说明：	> 此模块专门管理 持续动作 的设置。
//					> 不考虑转控制器结构，且不考虑自定义变换扩展，只硬编码的公式控制变换动画。
//					> 此模块的代码 在其他同类插件中一模一样，只要替换 类名和简称 即可。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 『持续动作』标准闪烁 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingFlicker = function( allTime, period ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "标准闪烁";
	p_data.fA_time = 0;
	p_data.fA_dest = period *0.5;
	p_data.fB_time = 0;
	p_data.fB_dest = period *0.5;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』标准闪烁 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingFlicker = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "标准闪烁" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		// > 闪烁 - 灭
		s_data.opacity = 1 ;
		this.drill_PCE_setOpacity(s_data.opacity);
		
	}else if( p_data.fB_time < p_data.fB_dest ){
		p_data.fB_time ++;
		
		// > 闪烁 - 亮
		s_data.opacity = 255;
		this.drill_PCE_setOpacity(s_data.opacity);
		
	}
		
	// > 闪烁 - 重置
	if( p_data.fB_time >= p_data.fB_dest ){
		p_data.fA_time = 0;
		p_data.fB_time = 0;
		s_data.opacity = 1;
		this.drill_PCE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};

//==============================
// * 『持续动作』渐变闪烁 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingFlickerCos = function( allTime, period ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "渐变闪烁";
	p_data.fA_time = 0;
	p_data.fA_period = period;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』渐变闪烁 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingFlickerCos = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "渐变闪烁" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.opacity = 127 + 126*Math.cos( ( 360* p_data.fA_time/p_data.fA_period )/180*Math.PI );
	this.drill_PCE_setOpacity(s_data.opacity);
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』顺时针/逆时针旋转 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotate = function( allTime, period, prop ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "顺时针/逆时针旋转";
	p_data.fA_time = 0;
	p_data.fA_period = period;
	p_data.fA_speed = 360/period /180*Math.PI * prop;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	// > 『消除时差的不连续感』
	var s_data = this._drill_PCE_spriteData;
	s_data.rotation = 0;
	s_data.rotation += p_data.fA_speed;
};
//==============================
// * 『持续动作』顺时针/逆时针旋转 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotate = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "顺时针/逆时针旋转" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation += p_data.fA_speed;
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_PCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.5, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』垂直卡片旋转 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateVer = function( allTime, period ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "垂直卡片旋转";
	p_data.fA_time = 0;
	p_data.fA_period = period;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』垂直卡片旋转 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateVer = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "垂直卡片旋转" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
		
	p_data.fA_time ++;
	s_data.scale_x = -1 - 1.0 * Math.cos( p_data.fA_time*p_data.fA_speed + Math.PI );		//（取值范围 -2 ~ 0 ）

	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};

//==============================
// * 『持续动作』水平卡片旋转 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateHor = function( allTime, period ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "水平卡片旋转";
	p_data.fA_time = 0;
	p_data.fA_period = period;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』水平卡片旋转 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateHor = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "水平卡片旋转" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.scale_y = -1 - 1.0 * Math.cos( p_data.fA_time*p_data.fA_speed + Math.PI );	//（取值范围 -2 ~ 0 ）
	//s_data.y = 0.5 * s_data.real_height * s_data.scale_y;								//（水平翻转的锚点补正）
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』上下震动 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeUD = function( allTime, period, scope ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "上下震动";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』上下震动 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeUD = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "上下震动" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.y = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};

//==============================
// * 『持续动作』左右震动 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeLR = function( allTime, period, scope ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "左右震动";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』左右震动 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeLR = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右震动" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.x = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』左右摇晃 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeRotate = function( allTime, period, scope ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "左右摇晃";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope /180*Math.PI;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』左右摇晃 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeRotate = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右摇晃" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_PCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};

//==============================
// * 『持续动作』钟摆摇晃 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingPendulumRotate = function( allTime, period, scope ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "钟摆摇晃";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope /180*Math.PI;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』钟摆摇晃 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingPendulumRotate = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "钟摆摇晃" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 锚点(0.5,0.0)锁定
	var fix_point = $gameTemp.drill_PCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};

//==============================
// * 『持续动作』锚点摇晃 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingAnchorRotate = function( allTime, period, scope ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "锚点摇晃";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope /180*Math.PI;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』锚点摇晃 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingAnchorRotate = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "锚点摇晃" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.rotation = p_data.fA_scope * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』呼吸效果 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingBreathing = function( allTime, period, scope ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "呼吸效果";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_period = period;
	p_data.fA_scope = scope;
	p_data.fA_speed = 360/period /180*Math.PI;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』呼吸效果 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingBreathing = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "呼吸效果" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	p_data.fA_time ++;
	s_data.scale_y = (p_data.fA_scope / s_data.real_height) * Math.sin( p_data.fA_time*p_data.fA_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_PCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』原地小跳 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingJumping = function( allTime, period, jump_height ){
	this.drill_PCE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "原地小跳";
	p_data.fA_time = 1;  //『消除时差的不连续感』
	p_data.fA_dest = Math.floor(period*0.25);
	p_data.fA_abc = $gameTemp.drill_PCE_Math2D_getParabolicThree( 0,0, p_data.fA_dest*0.5,-0.1, p_data.fA_dest,0 );
	p_data.fB_time = 0;
	p_data.fB_dest = Math.floor(period*0.6);
	p_data.fB_abc = $gameTemp.drill_PCE_Math2D_getParabolicThree( 0,0, p_data.fB_dest*0.5,jump_height, p_data.fB_dest,0 );
	p_data.fC_time = 0;
	p_data.fC_dest = Math.floor(period*0.15);
	p_data.fC_abc = $gameTemp.drill_PCE_Math2D_getParabolicThree( 0,0, p_data.fC_dest*0.5,-0.05, p_data.fC_dest,0 );
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『持续动作』原地小跳 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingJumping = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "原地小跳" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 起跳缓冲
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
	
		var t = p_data.fA_time;
		s_data.scale_x = -1*( p_data.fA_abc['a']*t*t + p_data.fA_abc['b']*t + p_data.fA_abc['c'] );
		s_data.scale_y = -s_data.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
	
	// > 跳跃后高度变化
	}else if( p_data.fB_time < p_data.fB_dest ){
		p_data.fB_time ++;
		
		var t = p_data.fB_time;
		s_data.y = -1*( p_data.fB_abc['a']*t*t + p_data.fB_abc['b']*t + p_data.fB_abc['c'] );
		
	// > 踩地缓冲
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		var t = p_data.fC_time;
		s_data.scale_x = -1*( p_data.fC_abc['a']*t*t + p_data.fC_abc['b']*t + p_data.fC_abc['c'] );
		s_data.scale_y = -s_data.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;	
		s_data.y = fix_point.y;	
	}
	
	// > 周期结束，重新跳
	if( p_data.fC_time >= p_data.fC_dest ){	
		p_data.fA_time = 1;
		p_data.fB_time = 0;
		p_data.fC_time = 0;
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』反复缩放 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingZooming = function( allTime, bufferTime, period, min_size,max_size ){
	this.drill_PCE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("反复缩放") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "反复缩放";
	p_data.fA_time = 0;
	p_data.fA_dest = bufferTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -bufferTime -bufferTime;
	p_data.fB_period = period;
	p_data.fB_min = min_size -1;
	p_data.fB_max = max_size -1;
	p_data.fB_avg = p_data.fB_min + (p_data.fB_max-p_data.fB_min)*0.5;
	p_data.fB_speed = 360/period /180*Math.PI;
	p_data.fC_time = 0;
	p_data.fC_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_pos = 0;	//（当前的缩放值）
}
//==============================
// * 『持续动作』反复缩放 - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingZooming = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "反复缩放" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』反复缩放 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingZooming = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "反复缩放" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 缩放到中间值
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_pos = 0.0 + p_data.fB_avg * p_data.fA_time / p_data.fA_dest;
		s_data.scale_x = p_data.f_cur_pos;
		s_data.scale_y = p_data.f_cur_pos;
		
	// > 反复缩放
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		p_data.f_cur_pos = p_data.fB_avg + (p_data.fB_max-p_data.fB_min)*0.5 * Math.sin( p_data.fB_time*p_data.fB_speed );
		s_data.scale_x = p_data.f_cur_pos;
		s_data.scale_y = p_data.f_cur_pos;
		
	// > 回到原缩放值
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		s_data.scale_x = 0.0 + p_data.f_cur_pos * (p_data.fC_dest-p_data.fC_time) / p_data.fC_dest;
		s_data.scale_y = 0.0 + p_data.f_cur_pos * (p_data.fC_dest-p_data.fC_time) / p_data.fC_dest;
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();
	}
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_PCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.5, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』空中飘浮 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingFloating = function( allTime, bufferTime, height,period,scope ){
	this.drill_PCE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("空中飘浮") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "空中飘浮";
	p_data.fA_time = 0;
	p_data.fA_dest = bufferTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -bufferTime -bufferTime;
	p_data.fB_period = period;
	p_data.fB_scope = scope ;
	p_data.fB_speed = 360/period /180*Math.PI;
	p_data.fC_time = 0;
	p_data.fC_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_height = height;
};
//==============================
// * 『持续动作』空中飘浮 - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingFloating = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "空中飘浮" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』空中飘浮 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingFloating = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "空中飘浮" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 升起
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		s_data.y = p_data.f_height * p_data.fA_time / p_data.fA_dest;
		s_data.y *= -1;
		
	// > 漂浮
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		s_data.y = p_data.f_height + p_data.fB_scope * Math.sin( p_data.fB_time*p_data.fB_speed );
		s_data.y *= -1;
		
	// > 降落
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		s_data.y = p_data.f_height * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		s_data.y *= -1;
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』旋转状态 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateState = function( allTime, bufferTime, scope ){
	this.drill_PCE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("旋转状态") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "旋转状态";
	p_data.fA_time = 0;
	p_data.fA_dest = bufferTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -bufferTime -bufferTime;
	p_data.fC_time = 0;
	p_data.fC_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_scope = scope /180*Math.PI;
};
//==============================
// * 『持续动作』旋转状态 - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingRotateState = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "旋转状态" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』旋转状态 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateState = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "旋转状态" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始旋转
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		s_data.rotation = p_data.f_scope * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		s_data.rotation = p_data.f_scope;
		
	// > 结束旋转
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		s_data.rotation = p_data.f_scope * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』缩放状态 - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingResizeState = function( allTime, bufferTime, scope ){
	this.drill_PCE_checkData();
	if( allTime < bufferTime*2 ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("缩放状态") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "缩放状态";
	p_data.fA_time = 0;
	p_data.fA_dest = bufferTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -bufferTime -bufferTime;
	p_data.fC_time = 0;
	p_data.fC_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_scope = scope - 1.0;
};
//==============================
// * 『持续动作』缩放状态 - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingResizeState = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "缩放状态" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = p_data.fC_dest - p_data.fA_time;
};
//==============================
// * 『持续动作』缩放状态 - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingResizeState = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "缩放状态" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始缩放
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		s_data.scale_x = p_data.f_scope * p_data.fA_time / p_data.fA_dest;
		s_data.scale_y = s_data.scale_x;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		s_data.scale_x = p_data.f_scope;
		s_data.scale_y = s_data.scale_x;
		
	// > 结束缩放
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		s_data.scale_x = p_data.f_scope * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		s_data.scale_y = s_data.scale_x;
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』顺时针/逆时针旋转(渐变) - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotate_Gradual = function( allTime, period, prop, startTime, endTime ){
	this.drill_PCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("顺时针/逆时针旋转(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "顺时针/逆时针旋转(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_prop = prop;
};
//==============================
// * 『持续动作』顺时针/逆时针旋转(渐变) - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingRotate_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "顺时针/逆时针旋转(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』顺时针/逆时针旋转(渐变) - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotate_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "顺时针/逆时针旋转(渐变)" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
		
	// > 开始旋转
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){	
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束旋转
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;					//（路程值累加）
	s_data.rotation = p_data.f_cur_pos * p_data.f_prop;		//（区分顺时针逆时针）
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_PCE_Math2D_getFixPointInAnchor( s_data.anchor_x, s_data.anchor_y, 0.5,0.5, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』垂直卡片旋转(渐变) - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateVer_Gradual = function( allTime, period, startTime, endTime ){
	this.drill_PCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("垂直卡片旋转(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "垂直卡片旋转(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
};
//==============================
// * 『持续动作』垂直卡片旋转(渐变) - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingRotateVer_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "垂直卡片旋转(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』垂直卡片旋转(渐变) - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateVer_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "垂直卡片旋转(渐变)" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始旋转
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){	
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束旋转
	}else if( p_data.fC_time < p_data.fC_dest ){	
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();		
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;								//（路程值累加）
	s_data.scale_x = -1 - 1.0 * Math.cos( p_data.f_cur_pos + Math.PI );	//（取值范围 -2 ~ 0 ）
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};

//==============================
// * 『持续动作』水平卡片旋转(渐变) - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateHor_Gradual = function( allTime, period, startTime, endTime ){
	this.drill_PCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("水平卡片旋转(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "水平卡片旋转(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
};
//==============================
// * 『持续动作』水平卡片旋转(渐变) - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingRotateHor_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "水平卡片旋转(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』水平卡片旋转(渐变) - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateHor_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "水平卡片旋转(渐变)" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始旋转
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){	
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束旋转
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();		
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;									//（路程值累加）
	s_data.scale_y = -1 - 1.0 * Math.cos( p_data.f_cur_pos + Math.PI );		//（取值范围 -2 ~ 0 ）	
	//s_data.y = 0.5 * s_data.real_height * s_data.scale_y;					//（水平翻转的锚点补正）
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』上下震动(渐变) - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeUD_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_PCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("上下震动(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "上下震动(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_scope = scope;
};
//==============================
// * 『持续动作』上下震动(渐变) - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingShakeUD_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "上下震动(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』上下震动(渐变) - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeUD_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "上下震动(渐变)" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
		
	// > 开始震动
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束震动
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.y = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};

//==============================
// * 『持续动作』左右震动(渐变) - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeLR_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_PCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("左右震动(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "左右震动(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_scope = scope;
};
//==============================
// * 『持续动作』左右震动(渐变) - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingShakeLR_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右震动(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』左右震动(渐变) - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeLR_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右震动(渐变)" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始震动
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束震动
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.x = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


//==============================
// * 『持续动作』左右摇晃(渐变) - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeRotate_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_PCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("左右摇晃(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "左右摇晃(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_scope = scope /180*Math.PI;
};
//==============================
// * 『持续动作』左右摇晃(渐变) - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingShakeRotate_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右摇晃(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』左右摇晃(渐变) - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeRotate_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "左右摇晃(渐变)" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始摇晃
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		
	// > 结束摇晃
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.rotation = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_PCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};

//==============================
// * 『持续动作』钟摆摇晃(渐变) - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingPendulumRotate_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_PCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("钟摆摇晃(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "钟摆摇晃(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_scope = scope /180*Math.PI;
};
//==============================
// * 『持续动作』钟摆摇晃(渐变) - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingPendulumRotate_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "钟摆摇晃(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』钟摆摇晃(渐变) - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingPendulumRotate_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "钟摆摇晃(渐变)" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始摇晃
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed;
		
	// > 结束摇晃
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.rotation = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 锚点(0.5,0.0)锁定
	var fix_point = $gameTemp.drill_PCE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,0.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
	s_data.x = fix_point.x;	
	s_data.y = fix_point.y;	
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};

//==============================
// * 『持续动作』锚点摇晃(渐变) - 初始化
//==============================
Game_Picture.prototype.drill_PCE_playSustainingAnchorRotate_Gradual = function( allTime, period, scope, startTime, endTime ){
	this.drill_PCE_checkData();
	if( allTime < startTime + endTime ){
		alert( DrillUp.drill_PCE_getPluginTip_allTimeError("锚点摇晃(渐变)") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PCE_param;
	p_data.playing_type = "锚点摇晃(渐变)";
	p_data.fA_time = 0;
	p_data.fA_dest = startTime;
	p_data.fB_time = 0;
	p_data.fB_dest = allTime -startTime -endTime;
	p_data.fC_time = 0;
	p_data.fC_dest = endTime;
	p_data.fC_ex_curSpeed = 0;		//（额外当前速度，结束动作叠加路程值用）
	p_data.fC_ex_maxSpeed = 0;		//（额外最大速度，结束动作叠加路程值用）
	p_data.fC_ex_leftTime = 0;		//（剩余动画时间）
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_isEnd = false;
	p_data.f_cur_speed = 0;							//（当前速度）
	p_data.f_tar_speed = 360/period /180*Math.PI;	//（最大速度）
	p_data.f_cur_pos = 0;							//（当前路程值）
	p_data.f_period_pos = Math.PI * 2;				//（一周的路程值）
	
	p_data.f_scope = scope /180*Math.PI;
};
//==============================
// * 『持续动作』锚点摇晃(渐变) - 结束动作
//==============================
Game_Picture.prototype.drill_PCE_endSustainingAnchorRotate_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "锚点摇晃(渐变)" ){ return; }
	
	p_data.f_isEnd = true;
	p_data.fC_time = Math.floor( p_data.fC_dest * (p_data.fA_dest-p_data.fA_time)/p_data.fA_dest );
	
	// > 额外速度初始化
	var left_time = p_data.fC_dest - p_data.fC_time;						//（剩余动画时间）
	var end_pos = p_data.f_cur_pos +  0.5*p_data.f_cur_speed*(left_time-1);	//（常规走完后停留位置，当前路程+匀减速路程）
	var ex_pos = p_data.f_period_pos - (end_pos % p_data.f_period_pos);		//（剩余路程值）
	p_data.fC_ex_curSpeed = 0;												//
	p_data.fC_ex_maxSpeed = ex_pos*2/left_time;								//
	p_data.fC_ex_leftTime = left_time;										//
};
//==============================
// * 『持续动作』锚点摇晃(渐变) - 帧刷新
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingAnchorRotate_Gradual = function() {
	var p_data = this._drill_PCE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "锚点摇晃(渐变)" ){ return; }
	var s_data = this._drill_PCE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 开始摇晃
	if( p_data.fA_time < p_data.fA_dest && p_data.f_isEnd == false ){
		p_data.fA_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * p_data.fA_time / p_data.fA_dest;
		
	// > 保持
	}else if( p_data.fB_time < p_data.fB_dest && p_data.f_isEnd == false ){
		p_data.fB_time ++;
		
	// > 结束摇晃
	}else if( p_data.fC_time < p_data.fC_dest ){
		p_data.fC_time ++;
		p_data.f_cur_speed = p_data.f_tar_speed * (p_data.fC_dest - p_data.fC_time) / p_data.fC_dest;
		
		// > 额外当前速度（增减速移动）
		var left_time = p_data.fC_dest - p_data.fC_time;
		if( left_time >= p_data.fC_ex_leftTime*0.5 ){
			p_data.fC_ex_curSpeed += p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}else{
			p_data.fC_ex_curSpeed -= p_data.fC_ex_maxSpeed / (p_data.fC_ex_leftTime*0.5);
		}
		p_data.f_cur_speed += p_data.fC_ex_curSpeed;
		
		// > 最后4帧时（强制吸附路程值，如果路程超出就回弹）
		if( p_data.fC_time >= p_data.fC_dest - 4 ){
			var left_pos = p_data.f_cur_pos % p_data.f_period_pos;
			if( left_pos < p_data.f_period_pos*0.25 ){
				p_data.f_cur_speed = -0.5 * left_pos;
			}
		}
		
	// > 终止动作（结束动作）
	}else{
		this.drill_PCE_stopEffect();
	}
	
	p_data.f_cur_pos += p_data.f_cur_speed;		//（路程值累加）
	s_data.rotation = p_data.f_scope * Math.sin( p_data.f_cur_pos );
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PCE_stopEffect();
	}
};


