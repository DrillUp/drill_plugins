//=============================================================================
// Drill_PictureContinuedEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        图片 - 持续动作效果
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
 *   (1.所有动作都是并行的，你可能需要手动加等待时间。
 *   (2.所有 持续动作 都可以与消失/显现动作效果叠加，但不包括透明度的
 *      叠加。持续动作 同时只能播放一种。
 * 指令：
 *   (1.透明度为0的图片不能执行持续动作效果。
 *      你可以设置透明度为1，同样看不见，但是能执行动作效果。
 *   (2.不同类型动作的参数和指令有较大区别。
 *      如果指令的参数名和参数数量不匹配，则动作不会被执行。
 * 临时动作/永久动作：
 *   (1.插件指令的类型中，都有"持续时间"控制，用于临时动作。
 *      你可以填写"持续时间[无限]"，使得图片永久执行动作。
 *   (2.删除图片、修改图片都不会终止图片动作。
 *      必须手动执行插件指令来终止。
 * 完整流程动作：
 *   (1.含有"缓冲时间"的动作都有一套 开始、持续、结束 的流程。
 *      比如"空中飘浮"、"旋转状态"、"缩放状态"等动作。
 *   (2.以"空中飘浮"动作为例，开始、结束的过程，会在缓冲时间内完成。
 *      持续150，缓冲60，那么整个动作将在 60+150+60 的时间内完成。
 *      "空中飘浮"可以设置无限持续时间，如果要让其停下，使用"结束动
 *      作"指令即可。
 * 设计：
 *   (1.持续动作在galgame中的肖像表情切换非常常用。
 *      比如兴奋地跳跃、害怕的震动、平静的呼吸、惊讶地点头、开心地摇摆。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行持续动作：
 * 
 * 插件指令：>持续动作 : 图片[1] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 图片变量[21] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 批量图片[10,11] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 批量图片变量[21,22] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 
 * 插件指令：>持续动作 : 图片[1] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 渐变闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 顺时针旋转 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 逆时针旋转 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 垂直卡片旋转 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 水平卡片旋转 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 上下震动 : 持续时间[60] : 周期[6] : 震动幅度[10]
 * 插件指令：>持续动作 : 图片[1] : 左右震动 : 持续时间[60] : 周期[6] : 震动幅度[10]
 * 插件指令：>持续动作 : 图片[1] : 左右摇晃 : 持续时间[40] : 周期[20] : 摇晃幅度[15]
 * 插件指令：>持续动作 : 图片[1] : 钟摆摇晃 : 持续时间[40] : 周期[20] : 摇晃幅度[15]
 * 插件指令：>持续动作 : 图片[1] : 锚点摇晃 : 持续时间[40] : 周期[20] : 摇晃幅度[15]
 * 插件指令：>持续动作 : 图片[1] : 呼吸效果 : 持续时间[180] : 周期[45] : 呼吸幅度[6]
 * 插件指令：>持续动作 : 图片[1] : 原地小跳 : 持续时间[180] : 周期[90] : 跳跃高度[20]
 * 插件指令：>持续动作 : 图片[1] : 反复缩放 : 持续时间[180] : 周期[60] : 最小缩放[1.00] : 最大缩放[1.25]
 * 插件指令：>持续动作 : 图片[1] : 空中飘浮 : 持续时间[150] : 缓冲时间[60] : 飘浮高度[100] : 周期[30] : 幅度[8]
 * 插件指令：>持续动作 : 图片[1] : 旋转状态 : 持续时间[150] : 缓冲时间[60] : 旋转角度[90]
 * 插件指令：>持续动作 : 图片[1] : 缩放状态 : 持续时间[150] : 缓冲时间[60] : 缩放比例[1.5]
 * 插件指令：>持续动作 : 图片[1] : 顺时针旋转(渐变) : 持续时间[40] : 周期[8] : 开始时间[90] : 结束时间[60]
 * 插件指令：>持续动作 : 图片[1] : 逆时针旋转(渐变) : 持续时间[40] : 周期[8] : 开始时间[90] : 结束时间[60]
 * 插件指令：>持续动作 : 图片[1] : 垂直卡片旋转(渐变) : 持续时间[40] : 周期[8] : 开始时间[90] : 结束时间[60]
 * 插件指令：>持续动作 : 图片[1] : 水平卡片旋转(渐变) : 持续时间[40] : 周期[8] : 开始时间[90] : 结束时间[60]
 * 插件指令：>持续动作 : 图片[1] : 上下震动(渐变) : 持续时间[40] : 周期[6] : 震动幅度[4] : 开始时间[90] : 结束时间[60]
 * 插件指令：>持续动作 : 图片[1] : 左右震动(渐变) : 持续时间[40] : 周期[6] : 震动幅度[4] : 开始时间[90] : 结束时间[60]
 * 插件指令：>持续动作 : 图片[1] : 左右摇晃(渐变) : 持续时间[40] : 周期[8] : 摇晃幅度[25] : 开始时间[90] : 结束时间[60]
 * 插件指令：>持续动作 : 图片[1] : 钟摆摇晃(渐变) : 持续时间[40] : 周期[8] : 摇晃幅度[25] : 开始时间[90] : 结束时间[60]
 * 插件指令：>持续动作 : 图片[1] : 锚点摇晃(渐变) : 持续时间[40] : 周期[8] : 摇晃幅度[25] : 开始时间[90] : 结束时间[60]
 * 
 * 1.前半部分（图片）和 后半部分（标准闪烁 : 持续时间[60] : 周期[30]）
 *   的参数可以随意组合。一共有4*26种组合方式。
 * 2.参数中"时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"幅度"、"高度"的单位是像素。
 * 3.类型的更详细介绍，去看看 "7.行走图 > 关于动作效果.docx"。
 * 4."标准闪烁 : 持续时间[60] : 周期[30]"表示：
 *    闪烁30帧，15帧透明，15帧不透明，持续60帧。也就是闪两次。
 * 5."旋转"类型中，一个周期旋转一整圈。
 *   持续60帧，周期30帧，则表示图像旋转两圈后结束。
 * 6."空中飘浮"类型中，包含飘起、漂浮中、飘落三种状态。
 *   缓冲时间对应飘起飘落的时间，可以应用于某种法术的释放动作。
 * 7."(渐变)"类型的效果，无论周期、结束时间如何，在结束动作后，
 *   都能够在原状态下慢慢减速停住。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 无限时间
 * 你可以将上面插件指令的持续时间中，填"无限"：
 * 
 * 插件指令：>持续动作 : 图片[1] : 标准闪烁 : 持续时间[无限] : 周期[30]
 * 插件指令：>持续动作 : 图片[1] : 旋转状态 : 持续时间[无限] : 缓冲时间[60] : 旋转角度[90]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 结束动作
 * 上述的部分类型含缓冲时间，你可以控制其缓冲结束：
 * 
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
 * 2.如果你设置了"空中飘浮"为无限时间，让其停下来可以使用"结束动作"指令。
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
 * 3."字符串[21]"表示 字符串核心 中字符串，
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
 * 测试方法：   放置10个动作变化的图片，在不同的地图中测试。
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
//		★性能测试因素	对话管理层
//		★性能测试消耗	24.94ms 23.34ms（sprite_picture.update）
//		★最坏情况		地图放了大量图片，并且所有图片都在持续变化。
//		★备注			要说图片贴图和事件贴图哪个消耗大，真无法确定。
//						事件贴图面积小但变化多，而图片面积大但变化不多。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			持续动作效果：
//				->动作
//					->标准闪烁
//					->渐变闪烁
//					->标准旋转（顺/逆时针）
//					->垂直卡片旋转
//					->水平卡片旋转
//					->上下震动
//					->左右震动
//					->左右摇晃
//					->钟摆摇晃
//					->锚点摇晃
//				->其他
//					->数学锚点变换问题
//
//		★必要注意事项：
//			1.变化原理为：每帧都【固定初始值】，然后适时赋值公式变化值。
//
//		★其它说明细节：
//			1.图片的锚点不是固定的，可能会到处变，注意控制锚点。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureContinuedEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureContinuedEffect');
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_PCE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_PCE_pluginCommand.call(this, command, args);
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
		// > 透明度检查
		if( pics != null ){
			var temp_tank = [];
			for( var k=0; k < pics.length; k++ ){
				if( pics[k].opacity() != 0 ){
					temp_tank.push( pics[k] );
				}
			}
			pics = temp_tank;
		}
		
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
						str = pics[k]._Drill_PCE.playing_type;
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
			/*-----------------反复缩放 - 开始------------------*/
			if( type == "反复缩放" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("最小缩放[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("最大缩放[","");
				temp4 = temp4.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingZooming( Number(temp1),Number(temp2),Number(temp3),Number(temp4) );
					}
				}
			}	
			/*-----------------顺时针旋转(渐变) - 开始------------------*/
			if( type == "顺时针旋转(渐变)" ){
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
			/*-----------------空中飘浮 - 开始------------------*/
			if( type == "空中飘浮" ){
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
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PCE_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureContinuedEffect.js 图片 - 持续动作效果】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};


//=============================================================================
// * 数学 - 锁定锚点
//			
//			参数：	> org_anchor_x 数字    （原贴图锚点X）
//					> org_anchor_y 数字    （原贴图锚点Y）
//					> target_anchor_x 数字 （新的锚点X）
//					> target_anchor_y 数字 （新的锚点Y）
//					> width 数字           （贴图宽度）
//					> height 数字          （贴图高度）
//					> rotation 数字        （旋转度数，弧度）
//					> scale_x,scale_y 数字 （缩放比例XY，默认1.00）
//			返回：	> { x:0, y:0 }         （偏移的坐标）
//			
//			说明：	修正 旋转+缩放 的坐标，使其看起来像是在绕着 新的锚点 变换。
//					旋转值和缩放值可为负数。
//=============================================================================
Game_Temp.prototype.drill_PCE_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图中心锚点 
					target_anchor_x,target_anchor_y, 	//新的中心锚点 
					width, height,						//贴图高宽
					rotation, scale_x, scale_y ) {		//变换的值（旋转+缩放）
	
	var ww = width * ( target_anchor_x - org_anchor_x );
	var hh = height * ( target_anchor_y - org_anchor_y );
	var xx = 0;
	var yy = 0;
	if( ww == 0 && hh == 0){ return { "x":0, "y":0 }; }
	if( ww == 0 ){ ww = 0.0001; }
	
	// > 先缩放
	var sww = ww*scale_x;
	var shh = hh*scale_y;
	
	// > 后旋转
	var r = Math.sqrt( Math.pow(sww,2) + Math.pow(shh,2) );
	var p_degree = Math.atan(shh/sww);	
	p_degree = Math.PI - p_degree;
	if( sww < 0 ){
		p_degree = Math.PI + p_degree;
	}
	
	// > 变换的偏移量
	xx += r*Math.cos( rotation - p_degree);		//圆公式 (x-a)²+(y-b)²=r²
	yy += r*Math.sin( rotation - p_degree);		//圆极坐标 x=ρcosθ,y=ρsinθ
	
	// > 锚点偏移量
	xx += ww;
	yy += hh;
	
	return { "x":xx, "y":yy };
}
//=============================================================================
// * 数学 - 抛物线三点式
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//					> x3,y3 数字（点C）
//			返回：	> { a:0, b:0, c:0 } （抛物线公式的abc）
//			
//			说明：	已知三点，返回抛物线公式 y = a*x^2 + b*x + c 的abc值。
//=============================================================================
Game_Temp.prototype.drill_PCE_getParabolicThree = function( x1,y1,x2,y2,x3,y3 ){
	
	var b = ((x2*x2 - x3*x3)*(y1 - y2) - (x1*x1 - x2*x2)*(y2 - y3)) / ((x2*x2 - x3*x3)*(x1 - x2) - (x1*x1 - x2*x2)*(x2 - x3));
	var a = (y1 - y2 - b*(x1 - x2)) / (x1*x1 - x2*x2);
	var c = y1 - a*x1*x1 - b*x1;
	
	return { "a":a, "b":b, "c":c };
}



//=============================================================================
// ** 图片贴图
//=============================================================================
//==============================
// * 图片贴图 - 初始化
//==============================
var _drill_PCE_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function(pictureId) {
    _drill_PCE_sp_initialize.call(this,pictureId);
	// ...暂无
}

//==============================
// * 图片贴图 - 固定帧初始值
//==============================
var _Drill_PCE_sp_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_PCE_sp_update.call(this);	
	if( this.picture() && this.picture().drill_PCE_isPlaying() ){
		//this.updateBitmap();								// 贴图资源
		//this.updateOrigin();								// 圆心x、圆心y
		//this.updatePosition();							// x、y
		//this.updateScale();								// 缩放x、缩放y
		//this.updateTone();								// 色调
		//this.updateOther();								// 透明度、混合模式、旋转
		if( this.skew.x != 0 ){ this.skew.x = 0; }			// 斜切x
		if( this.skew.y != 0 ){ this.skew.y = 0; }			// 斜切y
	}
};

//==============================
// * 图片贴图 - 帧刷新
//==============================
var _Drill_PCE_sp_update2 = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_PCE_sp_update2.call(this);
	if( this.picture() ){
		this._Drill_PCE = this.picture()._Drill_PCE;
		this.drill_PCE_updateEffect();			//执行变换
		this.drill_PCE_updateBitmap();			//获取图片宽高
	}
};
//==============================
// * 帧刷新 - 执行变换
//==============================
Sprite_Picture.prototype.drill_PCE_updateEffect = function() {
	if( !this.picture().drill_PCE_isPlaying() ){ return; }
		
	this.x += this._Drill_PCE.x ;					// x
	this.y += this._Drill_PCE.y ;					// y
	this.rotation += this._Drill_PCE.rotation;		// 旋转
	this.scale.x += this._Drill_PCE.scale_x;		// 缩放x
	this.scale.y += this._Drill_PCE.scale_y;		// 缩放y
	//this.skew.x += this._Drill_PCE.skew_x;		// 斜切x
	//this.skew.y += this._Drill_PCE.skew_y;		// 斜切y
	
	if( this._Drill_PCE.opacity != -1 ){
		this.opacity = this._Drill_PCE.opacity;		// 透明度
	}
}
//==============================
// * 帧刷新 - 获取图片宽高
//==============================
Sprite_Picture.prototype.drill_PCE_updateBitmap = function() {
	if( this.bitmap && this.bitmap.isReady() ){
		this._Drill_PCE.real_width = this.bitmap.width;
		this._Drill_PCE.real_height = this.bitmap.height;
	}
}


//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _Drill_PCE_c_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_Drill_PCE_c_initialize.call(this);
	this._Drill_PCE = {};					//（不要用initMembers，follower没有这个方法）
	this._Drill_PCE.x = 0;					// x
	this._Drill_PCE.y = 0;					// y
	this._Drill_PCE.rotation = 0;			// 旋转
	this._Drill_PCE.scale_x = 0;			// 缩放x
	this._Drill_PCE.scale_y = 0;			// 缩放y
	this._Drill_PCE.skew_x = 0;				// 斜切x
	this._Drill_PCE.skew_y = 0;				// 斜切y
	
	this._Drill_PCE.opacity = -1;			// 透明度（不叠加）
	this._Drill_PCE.playing_type = "";		// 显示类型
	this._Drill_PCE.real_width = -1;		// 贴图宽
	this._Drill_PCE.real_height = -1;		// 贴图高
	this._Drill_PCE.anchor_x = 0;			// 锚点中心x
	this._Drill_PCE.anchor_y = 0;			// 锚点中心y
}
//==============================
// * 图片 - 动作判定
//==============================
Game_Picture.prototype.drill_PCE_isPlaying = function() {
	if( !this._Drill_PCE ){ return false; }
	if( this._Drill_PCE.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 图片 - 设置透明度
//==============================
Game_Picture.prototype.drill_PCE_setOpacity = function( opacity ){
	if( isNaN(opacity) ){
		alert(	"【Drill_PictureContinuedEffect.js 图片 - 持续动作效果】\n" +
				"错误，透明度赋值时出现了NaN错误值。");
	}
	this._opacity = opacity;
}
//==============================
// * 图片 - 控制 - 显示图片
//==============================
var _Drill_PCE_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
	_Drill_PCE_p_show.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
	if( origin == 0 ){
		this._Drill_PCE.anchor_x = 0;		// 锚点中心x
		this._Drill_PCE.anchor_y = 0;		// 锚点中心y
	}
	if( origin == 1 ){
		this._Drill_PCE.anchor_x = 0.5;		// 锚点中心x
		this._Drill_PCE.anchor_y = 0.5;		// 锚点中心y
	}
}
//==============================
// * 图片 - 控制 - 移动图片
//==============================
var _Drill_PCE_p_move = Game_Picture.prototype.move;
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration) {
	_Drill_PCE_p_move.call(this, origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
	if( origin == 0 ){
		this._Drill_PCE.anchor_x = 0;		// 锚点中心x
		this._Drill_PCE.anchor_y = 0;		// 锚点中心y
	}
	if( origin == 1 ){
		this._Drill_PCE.anchor_x = 0.5;		// 锚点中心x
		this._Drill_PCE.anchor_y = 0.5;		// 锚点中心y
	}
}
//==============================
// * 图片 - 帧刷新
//==============================
var _Drill_PCE_c_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_Drill_PCE_c_update.call(this);
	
	if( this._Drill_PCE == undefined ){ return; } 
	if( this._Drill_PCE.playing_type == "" ){ return; }
	if( this._Drill_PCE.real_width == -1 ){ return; }		//需要等图片加载完成
	if( this._Drill_PCE.real_height == -1 ){ return; }
	
	this.drill_PCE_updateSustainingFlicker();						//帧刷新 - 标准闪烁
	this.drill_PCE_updateSustainingFlickerCos();					//帧刷新 - 渐变闪烁
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
// * 图片 - 终止效果
//==============================
Game_Picture.prototype.drill_PCE_stopEffect = function() {
	var ef = this._Drill_PCE;
	ef.x = 0;					// x
	ef.y = 0;					// y
	ef.rotation = 0;			// 旋转
	ef.scale_x = 0;				// 缩放x
	ef.scale_y = 0;				// 缩放y
	ef.skew_x = 0;				// 斜切x
	ef.skew_y = 0;				// 斜切y
	ef.playing_type = "";
	if( ef.opacity != -1 ){ this.drill_PCE_setOpacity(255); }		//透明度
	ef.opacity = -1 ;
}


//=============================================================================
// ** 持续动作
//=============================================================================
//==============================
// * 初始化 - 持续 标准闪烁
//==============================
Game_Picture.prototype.drill_PCE_playSustainingFlicker = function(time,period) {
	var ef = this._Drill_PCE;
	ef.playing_type = "标准闪烁";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.fA_time = 0;
	ef.fA_dest = period/2;
	ef.fB_time = 0;
	ef.fB_dest = period/2;
}
//==============================
// * 帧刷新 - 持续 标准闪烁
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingFlicker = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "标准闪烁" ){ return; }
	
	if( ef.fA_time < ef.fA_dest ){
		ef.fA_time ++;
		ef.opacity = 1 ;
		this.drill_PCE_setOpacity(ef.opacity);
	}else if( ef.fB_time < ef.fB_dest ){
		ef.fB_time ++;
		ef.opacity = 255;
		this.drill_PCE_setOpacity(ef.opacity);
	}
	ef.f_time ++;
	if( ef.f_time % ef.f_period == 0 ){
		ef.fA_time = 0;
		ef.fB_time = 0;
	}
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 渐变闪烁
//==============================
Game_Picture.prototype.drill_PCE_playSustainingFlickerCos = function(time,period) {
	var ef = this._Drill_PCE;
	ef.playing_type = "渐变闪烁";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
}
//==============================
// * 帧刷新 - 持续 渐变闪烁
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingFlickerCos = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "渐变闪烁" ){ return; }
	
	ef.f_time ++;
	ef.opacity = 127 + 126*Math.cos( ( 360* ef.f_time/ef.f_period )/180*Math.PI );
	this.drill_PCE_setOpacity(ef.opacity);
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 顺时针/逆时针旋转
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotate = function(time,period,prop) {
	var ef = this._Drill_PCE;
	ef.playing_type = "顺时针/逆时针旋转";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI * prop;
}
//==============================
// * 帧刷新 - 持续 顺时针/逆时针旋转
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotate = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "顺时针/逆时针旋转" ){ return; }
	
	ef.f_time ++;
	ef.rotation += ef.f_speed;
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,0.5, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 垂直卡片旋转
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateVer = function(time,period) {
	var ef = this._Drill_PCE;
	ef.playing_type = "垂直卡片旋转";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 垂直卡片旋转
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateVer = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "垂直卡片旋转" ){ return; }
		
	ef.f_time ++;
	ef.scale_x = -1 - 1.0 * Math.cos( ef.f_time*ef.f_speed + Math.PI );		//（取值范围 -2 ~ 0 ）

	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 水平卡片旋转
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateHor = function(time,period) {
	var ef = this._Drill_PCE;
	ef.playing_type = "水平卡片旋转";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 水平卡片旋转
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateHor = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "水平卡片旋转" ){ return; }
	
	ef.f_time ++;
	ef.scale_y = -1 - 1.0 * Math.cos( ef.f_time*ef.f_speed + Math.PI );		//（取值范围 -2 ~ 0 ）
	
	ef.y = 0.5 * this._Drill_PCE.real_height * ef.scale_y;	//（水平翻转的锚点补正）
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 上下震动
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeUD = function( time,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "上下震动";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 上下震动
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeUD = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "上下震动" ){ return; }
	
	ef.f_time ++;
	ef.y = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 左右震动
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeLR = function( time,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "左右震动";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 左右震动
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeLR = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "左右震动" ){ return; }
	
	ef.f_time ++;
	ef.x = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 左右摇晃
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeRotate = function( time,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "左右摇晃";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope /180*Math.PI;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 左右摇晃
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeRotate = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "左右摇晃" ){ return; }
	
	ef.f_time ++;
	ef.rotation = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}
//==============================
// * 初始化 - 持续 钟摆摇晃
//==============================
Game_Picture.prototype.drill_PCE_playSustainingPendulumRotate = function( time,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "钟摆摇晃";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope /180*Math.PI;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 钟摆摇晃
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingPendulumRotate = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "钟摆摇晃" ){ return; }
	
	ef.f_time ++;
	ef.rotation = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 锚点(0.5,0.0)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,0.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}
//==============================
// * 初始化 - 持续 锚点摇晃
//==============================
Game_Picture.prototype.drill_PCE_playSustainingAnchorRotate = function( time,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "锚点摇晃";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope /180*Math.PI;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 锚点摇晃
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingAnchorRotate = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "锚点摇晃" ){ return; }
	
	ef.f_time ++;
	ef.rotation = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}

//==============================
// * 初始化 - 持续 呼吸效果
//==============================
Game_Picture.prototype.drill_PCE_playSustainingBreathing = function( time,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "呼吸效果";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_scope = scope ;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 呼吸效果
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingBreathing = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "呼吸效果" ){ return; }
	
	ef.f_time ++;
	ef.scale_y = (ef.f_scope / ef.real_height) * Math.sin( ef.f_time*ef.f_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 原地小跳
//==============================
Game_Picture.prototype.drill_PCE_playSustainingJumping = function( time,period,jump_height ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "原地小跳";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	
	ef.fA_time = 0;
	ef.fA_dTime = period*0.25;
	ef.fA_abc = $gameTemp.drill_PCE_getParabolicThree( 0,0, ef.fA_dTime*0.5,-0.1, ef.fA_dTime,0 );
	
	ef.fB_time = 0;
	ef.fB_dTime = period*0.6;
	ef.fB_abc = $gameTemp.drill_PCE_getParabolicThree( 0,0, ef.fB_dTime*0.5,jump_height, ef.fB_dTime,0 );
	
	ef.fC_time = 0;
	ef.fC_dTime = period*0.15;
	ef.fC_abc = $gameTemp.drill_PCE_getParabolicThree( 0,0, ef.fC_dTime*0.5,-0.1, ef.fC_dTime,0 );
	
}
//==============================
// * 帧刷新 - 持续 原地小跳
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingJumping = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "原地小跳" ){ return; }
	
	ef.f_time ++;
	
	// > 起跳缓冲
	if( ef.fA_time <= ef.fA_dTime ){
		ef.fA_time ++;
	
		var t = ef.fA_time;
		ef.scale_x = -1*( ef.fA_abc['a']*t*t + ef.fA_abc['b']*t + ef.fA_abc['c'] );
		ef.scale_y = -ef.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;	
		ef.y = fix_point.y;	
	
	// > 跳跃后高度变化
	}else if( ef.fB_time <= ef.fB_dTime ){
		ef.fB_time ++;
		
		var t = ef.fB_time;
		ef.y = -1*( ef.fB_abc['a']*t*t + ef.fB_abc['b']*t + ef.fB_abc['c'] );
		
	// > 踩地缓冲
	}else if( ef.fC_time <= ef.fC_dTime ){
		ef.fC_time ++;
		var t = ef.fC_time;
		ef.scale_x = -1*( ef.fC_abc['a']*t*t + ef.fC_abc['b']*t + ef.fC_abc['c'] );
		ef.scale_y = -ef.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;	
		ef.y = fix_point.y;	
	}
	
	// > 周期结束，重新跳
	if( ef.fC_time > ef.fC_dTime ){	
		ef.fA_time = 0;
		ef.fB_time = 0;
		ef.fC_time = 0;
	}
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}

//==============================
// * 初始化 - 持续 反复缩放
//==============================
Game_Picture.prototype.drill_PCE_playSustainingZooming = function( time,period,min_size,max_size ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "反复缩放";
	ef.f_time = 0;
	ef.f_dTime = time;
	ef.f_period = period;
	ef.f_min = min_size -1;
	ef.f_max = max_size -1;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 反复缩放
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingZooming = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "反复缩放" ){ return; }
	
	ef.f_time ++;
	ef.scale_x = ef.f_min + (ef.f_max - ef.f_min)/2 + (ef.f_max - ef.f_min)/2 * Math.sin( ef.f_time*ef.f_speed );
	ef.scale_y = ef.scale_x;
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,0.5, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 终止持续效果
	if( ef.f_time >= ef.f_dTime ){
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 空中飘浮
//==============================
Game_Picture.prototype.drill_PCE_playSustainingFloating = function( time,b_time,height,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "空中飘浮";
	ef.f_isEnd = false;
	ef.f_height = height;
	ef.fA_time = 0;
	ef.fA_dest = b_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fB_period = period;
	ef.fB_scope = scope ;
	ef.fB_speed = 360/period /180*Math.PI;
	ef.fC_time = 0;
	ef.fC_dest = b_time;
}
//==============================
// * 结束动作 - 持续 空中飘浮
//==============================
Game_Picture.prototype.drill_PCE_endSustainingFloating = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "空中飘浮" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 空中飘浮
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingFloating = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "空中飘浮" ){ return; }
	
	// > 升起
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.y = ef.f_height * ef.fA_time / ef.fA_dest;
		ef.y *= -1;
		
	// > 漂浮
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		ef.y = ef.f_height + ef.fB_scope * Math.sin( ef.fB_time*ef.fB_speed );
		ef.y *= -1;
		
	// > 降落
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.y = ef.f_height * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		ef.y *= -1;
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 旋转状态
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateState = function( time,b_time,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "旋转状态";
	ef.f_isEnd = false;
	ef.f_scope = scope /180*Math.PI;
	ef.fA_time = 0;
	ef.fA_dest = b_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = b_time;
}
//==============================
// * 结束动作 - 持续 旋转状态
//==============================
Game_Picture.prototype.drill_PCE_endSustainingRotateState = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "旋转状态" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 旋转状态
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateState = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "旋转状态" ){ return; }
	
	// > 开始旋转
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.rotation = ef.f_scope * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		ef.rotation = ef.f_scope;
		
	// > 结束旋转
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.rotation = ef.f_scope * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 缩放状态
//==============================
Game_Picture.prototype.drill_PCE_playSustainingResizeState = function( time,b_time,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "缩放状态";
	ef.f_isEnd = false;
	ef.f_scope = scope - 1.0;
	ef.fA_time = 0;
	ef.fA_dest = b_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = b_time;
}
//==============================
// * 结束动作 - 持续 缩放状态
//==============================
Game_Picture.prototype.drill_PCE_endSustainingResizeState = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "缩放状态" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 缩放状态
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingResizeState = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "缩放状态" ){ return; }
	
	// > 开始缩放
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.scale_x = ef.f_scope * ef.fA_time / ef.fA_dest;
		ef.scale_y = ef.scale_x;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		ef.scale_x = ef.f_scope;
		ef.scale_y = ef.scale_x;
		
	// > 结束缩放
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.scale_x = ef.f_scope * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		ef.scale_y = ef.scale_x;
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 顺时针/逆时针旋转(渐变)
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotate_Gradual = function( time, period, prop, start_time, end_time ){
	var ef = this._Drill_PCE;
	ef.playing_type = "顺时针/逆时针旋转(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_prop = prop;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 顺时针/逆时针旋转(渐变)
//==============================
Game_Picture.prototype.drill_PCE_endSustainingRotate_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "顺时针/逆时针旋转(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 顺时针/逆时针旋转(渐变)
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotate_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "顺时针/逆时针旋转(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;				//（路程值累加）
	ef.rotation = ef.f_pos * ef.f_prop;		//（区分顺时针逆时针）
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x, ef.anchor_y, 0.5,0.5, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
		
	// > 开始旋转
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){	
		ef.fB_time ++;
		
	// > 结束旋转
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 垂直卡片旋转(渐变)
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateVer_Gradual = function( time, period, start_time, end_time ){
	var ef = this._Drill_PCE;
	ef.playing_type = "垂直卡片旋转(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 垂直卡片旋转(渐变)
//==============================
Game_Picture.prototype.drill_PCE_endSustainingRotateVer_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "垂直卡片旋转(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 垂直卡片旋转(渐变)
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateVer_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "垂直卡片旋转(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.scale_x = -1 - 1.0 * Math.cos( ef.f_pos + Math.PI );		//（取值范围 -2 ~ 0 ）
		
	// > 开始旋转
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){	
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束旋转
	}else if( ef.fC_time < ef.fC_dest ){	
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();		
	}
}


//==============================
// * 初始化 - 持续 水平卡片旋转(渐变)
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateHor_Gradual = function( time, period, start_time, end_time ){
	var ef = this._Drill_PCE;
	ef.playing_type = "水平卡片旋转(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 水平卡片旋转(渐变)
//==============================
Game_Picture.prototype.drill_PCE_endSustainingRotateHor_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "水平卡片旋转(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 水平卡片旋转(渐变)
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateHor_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "水平卡片旋转(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.scale_y = -1 - 1.0 * Math.cos( ef.f_pos + Math.PI );		//（取值范围 -2 ~ 0 ）	
	
	ef.y = 0.5 * ef.real_height * ef.scale_y;	//（水平翻转的锚点补正）
	
	// > 开始旋转
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){	
		ef.fB_time ++;
		
	// > 结束旋转
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();		
	}
}


//==============================
// * 初始化 - 持续 上下震动(渐变)
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeUD_Gradual = function( time, period, scope, start_time, end_time ){
	var ef = this._Drill_PCE;
	ef.playing_type = "上下震动(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_scope = scope;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 上下震动(渐变)
//==============================
Game_Picture.prototype.drill_PCE_endSustainingShakeUD_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "上下震动(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 上下震动(渐变)
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeUD_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "上下震动(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.y = ef.f_scope * Math.sin( ef.f_pos );
		
	// > 开始震动
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束震动
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 左右震动(渐变)
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeLR_Gradual = function( time, period, scope, start_time, end_time ){
	var ef = this._Drill_PCE;
	ef.playing_type = "左右震动(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_scope = scope;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 左右震动(渐变)
//==============================
Game_Picture.prototype.drill_PCE_endSustainingShakeLR_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "左右震动(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 左右震动(渐变)
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeLR_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "左右震动(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.x = ef.f_scope * Math.sin( ef.f_pos );
		
	// > 开始震动
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束震动
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();
	}
}


//==============================
// * 初始化 - 持续 左右摇晃(渐变)
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeRotate_Gradual = function( time, period, scope, start_time, end_time ){
	var ef = this._Drill_PCE;
	ef.playing_type = "左右摇晃(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_scope = scope /180*Math.PI;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 左右摇晃(渐变)
//==============================
Game_Picture.prototype.drill_PCE_endSustainingShakeRotate_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "左右摇晃(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 左右摇晃(渐变)
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeRotate_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "左右摇晃(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.rotation = ef.f_scope * Math.sin( ef.f_pos );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 开始摇晃
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束摇晃
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();
	}
}
//==============================
// * 初始化 - 持续 钟摆摇晃(渐变)
//==============================
Game_Picture.prototype.drill_PCE_playSustainingPendulumRotate_Gradual = function( time, period, scope, start_time, end_time ){
	var ef = this._Drill_PCE;
	ef.playing_type = "钟摆摇晃(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_scope = scope /180*Math.PI;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 钟摆摇晃(渐变)
//==============================
Game_Picture.prototype.drill_PCE_endSustainingPendulumRotate_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "钟摆摇晃(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 钟摆摇晃(渐变)
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingPendulumRotate_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "钟摆摇晃(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.rotation = ef.f_scope * Math.sin( ef.f_pos );
	
	// > 锚点(0.5,0.0)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,0.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	// > 开始摇晃
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束摇晃
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();
	}
}
//==============================
// * 初始化 - 持续 锚点摇晃(渐变)
//==============================
Game_Picture.prototype.drill_PCE_playSustainingAnchorRotate_Gradual = function( time, period, scope, start_time, end_time ){
	var ef = this._Drill_PCE;
	ef.playing_type = "锚点摇晃(渐变)";
	ef.f_isEnd = false;
	ef.f_cur_speed = 0;
	ef.f_tar_speed = 360/period /180*Math.PI;
	ef.f_scope = scope /180*Math.PI;
	ef.f_pos = 0;				//（路程值）
	ef.fA_time = 0;
	ef.fA_dest = start_time;
	ef.fB_time = 0;
	ef.fB_dest = time;
	ef.fC_time = 0;
	ef.fC_dest = end_time;
	ef.fC_ex_curSpeed = 0;
	ef.fC_ex_maxSpeed = 0;
	ef.fC_ex_time = 0;
}
//==============================
// * 结束动作 - 持续 锚点摇晃(渐变)
//==============================
Game_Picture.prototype.drill_PCE_endSustainingAnchorRotate_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "锚点摇晃(渐变)" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = Math.floor( ef.fC_dest * (ef.fA_dest - ef.fA_time)/ef.fA_dest );
	
	// > 使用额外速度，确保停留后一定在 0 角度
	var left_time = ef.fC_dest - ef.fC_time;							//（剩余动画时间）
	var end_rotation = ef.f_pos +  0.5*ef.f_cur_speed*left_time;		//（常规走完后停留位置，现有位置+匀减速路程）
	var period_length = Math.PI * 2;									//（一周的路程值）
	ef.fC_ex_maxSpeed = (period_length - (end_rotation % period_length)) / left_time * 2;
	ef.fC_ex_time = left_time;
}
//==============================
// * 帧刷新 - 持续 锚点摇晃(渐变)
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingAnchorRotate_Gradual = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "锚点摇晃(渐变)" ){ return; }
	
	ef.f_pos += ef.f_cur_speed;		//（路程值累加）
	ef.rotation = ef.f_scope * Math.sin( ef.f_pos );
	
	// > 开始摇晃
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){
		ef.fA_time ++;
		ef.f_cur_speed = ef.f_tar_speed * ef.fA_time / ef.fA_dest;
		
	// > 保持
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){
		ef.fB_time ++;
		
	// > 结束摇晃
	}else if( ef.fC_time < ef.fC_dest ){
		ef.fC_time ++;
		ef.f_cur_speed = ef.f_tar_speed * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
		// > 额外路程量（加减速移动）
		ef.f_cur_speed += ef.fC_ex_curSpeed;
		var left_time = ef.fC_dest - ef.fC_time;
		if( left_time > ef.fC_ex_time * 0.5 ){
			ef.fC_ex_curSpeed += ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}else{
			ef.fC_ex_curSpeed -= ef.fC_ex_maxSpeed / (ef.fC_ex_time *0.5);
		}
		
	// > 终止持续效果
	}else{
		this.drill_PCE_stopEffect();
	}
}


