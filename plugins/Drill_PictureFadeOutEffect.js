//=============================================================================
// Drill_PictureFadeOutEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        图片 - 消失动作效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureFadeOutEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以播放图片消失不见的各种动作。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片对象。
 * 2.建议先了解 "0.基本定义 > 显示与透明度.docx"。
 *   更多详细内容，去看看 "7.行走图 > 关于动作效果.docx"。
 * 细节：
 *   (1.所有动作都是并行的，你可能需要手动加等待时间。
 *   (2.所有 消失动作 都可以与其它动作效果叠加，但不包括透明度的叠加。
 *      消失动作 同时只能播放一种。
 * 指令：
 *   (1.消失动作固定为：从 完全不透明 到 完全透明 的过程。
 *      动作结束后，对象的透明度将变为0。
 *   (2.不同类型动作的参数和指令有较大区别。
 *      如果指令的参数名和参数数量不匹配，则动作不会被执行。
 * 透明度：
 *   (1.开启"透明度检查"后，如果图片的透明度为0，则动作会被阻止播放。
 *   (2.删除图片、修改图片都不会终止图片动作。
 *      必须手动执行插件指令来终止。
 * 设计：
 *   (1.该效果可以与 滤镜效果、方块粉碎效果 叠加。
 *      特别注意，图片的中心锚点是可以修改的，默认有左上(0,0)和中
 *      心(0.5,0.5)的设置。中心锚点会影响部分动作效果。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 指定人物
 * 你需要通过下面插件指令来执行消失动作：
 * 
 * 插件指令：>消失动作 : 图片[1] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 图片变量[1] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 批量图片[10,11] : 标准弹跳 : 时间[60] : 高度[168]
 * 插件指令：>消失动作 : 批量图片变量[21,22] : 标准弹跳 : 时间[60] : 高度[168]
 * 
 * 插件指令：>消失动作 : 图片[1] : 直接消失 : 时间[60]
 * 插件指令：>消失动作 : 图片[1] : 移动消失 : 时间[60] : 方向角度[90] : 移动距离[100]
 * 插件指令：>消失动作 : 图片[1] : 标准升起 : 时间[60] : 缓冲时间[20] : 高度[168]
 * 插件指令：>消失动作 : 图片[1] : 标准弹跳 : 时间[60] : 高度[500]
 * 插件指令：>消失动作 : 图片[1] : 向左炸飞 : 时间[60] : 速度[11.5]
 * 插件指令：>消失动作 : 图片[1] : 向右炸飞 : 时间[60] : 速度[11.5]
 * 插件指令：>消失动作 : 图片[1] : 横向挤扁 : 时间[60] : 横向比例[1.5]
 * 插件指令：>消失动作 : 图片[1] : 横向挤扁(不透明) : 时间[60] : 横向比例[1.5]
 * 插件指令：>消失动作 : 图片[1] : 纵向挤扁 : 时间[60] : 纵向比例[1.5]
 * 插件指令：>消失动作 : 图片[1] : 纵向挤扁(不透明) : 时间[60] : 纵向比例[1.5]
 * 插件指令：>消失动作 : 图片[1] : 缩小消失 : 时间[60]
 * 插件指令：>消失动作 : 图片[1] : 缩小消失(不透明) : 时间[60]
 * 插件指令：>消失动作 : 图片[1] : 弹性缩小消失 : 时间[60] : 比例溢出[0.2] : 中心锚点[0.5,1.0]
 * 插件指令：>消失动作 : 图片[1] : 弹性缩小消失(不透明) : 时间[60] : 比例溢出[0.2] : 中心锚点[0.5,1.0]
 * 插件指令：>消失动作 : 图片[1] : 立即终止动作
 * 
 * 1.前半部分（玩家）和 后半部分（标准升起 : 时间[60] : 缓冲时间[20] : 高度[168]）
 *   的参数可以随意组合。一共有4*15种组合方式。
 * 2."玩家"和"玩家领队"是同一个意思。
 *   "玩家队员[1]"表示领队后面第一个跟随的队友。
 * 3.参数中"时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"距离"、"高度"的单位是像素。
 * 4.类型的更详细介绍，去看看 "7.行走图 > 关于动作效果.docx"。
 * 5.部分类型的动作有 时间和缓冲时间 两个设置，该动作分两个阶段。
 *   比如"标准升起"，分别对应升起的动作时间，和升起前阶段起跳效果的缓冲时间。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 透明度检查
 * 如果有的图片已经是透明度为255了，你不想让他再播放一次出现动画，你可以使用
 * 下面的插件指令。
 * 
 * 插件指令：>消失动作 : 图片 : 透明度检查 : 开启
 * 插件指令：>消失动作 : 图片 : 透明度检查 : 关闭
 * 
 * 1.插件指令直接作用于所有玩家，或者所有图片。
 * 2.开启检查后，如果当前图片透明度为255，出现动作不会起作用。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取状态
 * 你可以单独获取图片的状态信息，并赋值给开关或字符串：
 * 
 * 插件指令：>消失动作 : 图片[1] : 是否正在播放 : 开关[21]
 * 插件指令：>消失动作 : 图片变量[21] : 是否正在播放 : 开关[21]
 * 
 * 插件指令：>消失动作 : 图片[1] : 是否正在播放 : 开关[21]
 * 插件指令：>消失动作 : 图片[1] : 获取正在播放的类型 : 字符串[21]
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
 * 测试结果：   战斗界面中，平均消耗为：【24.94ms】
 *              200个事件的地图中，平均消耗为：【37.61ms】
 *              100个事件的地图中，平均消耗为：【36.30ms】
 *               50个事件的地图中，平均消耗为：【23.82ms】
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
 * 添加了插件指令获取状态信息功能。
 * [v1.4]
 * 添加了 直接消失、移动消失 功能。
 * [v1.5]
 * 优化了数学缩短锚点的计算公式。
 * [v1.6]
 * 优化了旧存档的识别与兼容。
 *
 *
 * 
 * @param 图片默认透明度检查
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。开启后，会在图片贴图透明度处于0时（已经消失时），阻止图片的消失动作。
 * @default false
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PFOE（Picture_Fade_Out_Effect）
//		临时全局变量	DrillUp.g_PFOE_xxx
//		临时局部变量	this._drill_PFOE_xxx
//		存储数据变量	$gameSystem._drill_PFOE_xxx
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
//			消失动作效果：
//				->动作
//					->标准升起
//					->标准弹跳
//					->缩小消失
//					->横向挤扁
//					->纵向挤扁
//					->向左炸飞
//					->向右炸飞
//					->翻转消失	x
//					->地面升起	x
//				->其他
//					->数学锚点变换问题
//
//		★必要注意事项：
//			1.变化原理为：每帧都【固定初始值】，然后适时赋值公式变化值。
//			  该插件限定透明度 255->0 的变化。
//
//		★其它说明细节：
//			1.图片的锚点不是固定的，可能会到处变，注意控制锚点。
//
//		★存在的问题：
//			暂无
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureFadeOutEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureFadeOutEffect');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PFOE_pic_opacityCheck = String(DrillUp.parameters['图片默认透明度检查'] || "false") === "true";
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_PFOE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_PFOE_pluginCommand.call(this, command, args);
	if( command === ">消失动作" ){ 
		
		/*-----------------透明度检查------------------*/
		if( args.length == 6 ){
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( unit == "图片" && temp1 == "透明度检查" ){
				if( temp2 == "开启" ){
					$gameSystem._drill_PFOE_opacityCheck_pic = true;
				}
				if( temp2 == "关闭" ){
					$gameSystem._drill_PFOE_opacityCheck_pic = false;
				}
			}
		}
		
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
					if( $gameScreen.drill_PFOE_isPictureExist( pic_id ) == false ){ continue; }
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
					if( $gameScreen.drill_PFOE_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PFOE_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PFOE_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
		// > 透明度检查
		if( pics != null && $gameSystem._drill_PFOE_opacityCheck_pic){
			var temp_tank = [];
			for( var k=0; k < pics.length; k++ ){
				if( pics[k].opacity() != 0 ){
					temp_tank.push( pics[k] );
				}
			}
			pics = temp_tank;
		}

		
		/*-----------------立即终止动作------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即终止动作" ){
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_stopEffect();
					}
				}
			}
		}	
		
		/*-----------------获取状态------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "是否正在播放" ){
				temp1 = temp1.replace("开关[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1);
				if( pics != null){
					var b = false;
					for( var k=0; k < pics.length; k++ ){
						b = pics[k].drill_PFOE_isPlaying();
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
						str = pics[k]._Drill_PFOE.playing_type;
					}
					$gameStrings.setValue( temp1, str );
				}
			}
			
			/*-----------------直接消失------------------*/
			if( type == "直接消失" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingDisappear( Number(temp1) );
					}
				}
			}
		}	
			
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			
			/*-----------------移动消失------------------*/
			if( type == "移动消失" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("方向角度[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("移动距离[","");
				temp3 = temp3.replace("]","");
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingMoveDisappear( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}
			/*-----------------标准升起------------------*/
			if( type == "标准升起" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("高度[","");
				temp3 = temp3.replace("]","");
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingSpring( Number(temp1),Number(temp3),Number(temp2) );
					}
				}
			}
			/*-----------------弹性缩小消失------------------*/
			if( type == "弹性缩小消失" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("比例溢出[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("中心锚点[","");
				temp3 = temp3.replace("]","");
				var temp_arr = temp3.split(/[,，]/);
				if( temp_arr.length >= 2 && pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingShrinkSpring( Number(temp1),Number(temp2), Number(temp_arr[0]), Number(temp_arr[1]),  false );
					}
				}
			}
			if( type == "弹性缩小消失(不透明)" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("比例溢出[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("中心锚点[","");
				temp3 = temp3.replace("]","");
				var temp_arr = temp3.split(/[,，]/);
				if( temp_arr.length >= 2 && pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingShrinkSpring( Number(temp1),Number(temp2), Number(temp_arr[0]), Number(temp_arr[1]),  true );
					}
				}
			}
			
		}
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			/*-----------------标准弹跳------------------*/
			if( type == "标准弹跳" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("高度[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingJump( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------横向挤扁------------------*/
			if( type == "横向挤扁" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("横向比例[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingHorizonFlat( Number(temp1),Number(temp2), false );
					}
				}
			}
			if( type == "横向挤扁(不透明)" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("横向比例[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingHorizonFlat( Number(temp1),Number(temp2), true );
					}
				}
			}
			/*-----------------纵向挤扁------------------*/
			if( type == "纵向挤扁" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("纵向比例[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingVerticalFlat( Number(temp1),Number(temp2), false );
					}
				}
			}
			if( type == "纵向挤扁(不透明)" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("纵向比例[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingVerticalFlat( Number(temp1),Number(temp2), true );
					}
				}
			}
			/*-----------------向左炸飞------------------*/
			if( type == "向左炸飞" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("速度[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingBlowOutLeft( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------向右炸飞------------------*/
			if( type == "向右炸飞" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("速度[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingBlowOutRight( Number(temp1),Number(temp2) );
					}
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			/*-----------------缩小消失------------------*/
			if( type == "缩小消失" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingShrink( Number(temp1), false );
					}
				}
			}
			if( type == "缩小消失(不透明)" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFOE_playHidingShrink( Number(temp1), true );
					}
				}
			}
		}
	}
	
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PFOE_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureFadeOutEffect.js 图片 - 消失动作效果】\n" +
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
Game_Temp.prototype.drill_PFOE_getFixPointInAnchor = function( 
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
Game_Temp.prototype.drill_PFOE_getParabolicThree = function( x1,y1,x2,y2,x3,y3 ){
	
	var b = ((x2*x2 - x3*x3)*(y1 - y2) - (x1*x1 - x2*x2)*(y2 - y3)) / ((x2*x2 - x3*x3)*(x1 - x2) - (x1*x1 - x2*x2)*(x2 - x3));
	var a = (y1 - y2 - b*(x1 - x2)) / (x1*x1 - x2*x2);
	var c = y1 - a*x1*x1 - b*x1;
	
	return { "a":a, "b":b, "c":c };
}


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_PFOE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PFOE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PFOE_sys_initialize.call(this);
	this.drill_PFOE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PFOE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PFOE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PFOE_saveEnabled == true ){	
		$gameSystem.drill_PFOE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PFOE_initSysData();
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
Game_System.prototype.drill_PFOE_initSysData = function() {
	this.drill_PFOE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PFOE_checkSysData = function() {
	this.drill_PFOE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PFOE_initSysData_Private = function() {
	
	this._drill_PFOE_opacityCheck_pic = DrillUp.g_PFOE_pic_opacityCheck;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PFOE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PFOE_opacityCheck_pic == undefined ){
		this.drill_PFOE_initSysData();
	}
	
};


//=============================================================================
// ** 图片贴图
//=============================================================================
//==============================
// * 图片贴图 - 初始化
//==============================
var _drill_PFOE_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function(pictureId) {
    _drill_PFOE_sp_initialize.call(this,pictureId);
	// ...暂无
}

//==============================
// * 图片贴图 - 固定帧初始值
//==============================
var _Drill_PFOE_sp_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_PFOE_sp_update.call(this);	
	if( this.picture() && this.picture().drill_PFOE_isPlaying() ){
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
var _Drill_PFOE_sp_update2 = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_PFOE_sp_update2.call(this);
	if( this.picture() ){
		this._Drill_PFOE = this.picture()._Drill_PFOE;
		this.drill_PFOE_updateEffect();			//执行变换
		this.drill_PFOE_updateBitmap();			//获取图片宽高
	}
};
//==============================
// * 帧刷新 - 执行变换
//==============================
Sprite_Picture.prototype.drill_PFOE_updateEffect = function() {
	if( !this.picture().drill_PFOE_isPlaying() ){ return; }
	
	this.x += this._Drill_PFOE.x ;					// x
	this.y += this._Drill_PFOE.y ;					// y
	this.rotation += this._Drill_PFOE.rotation;		// 旋转
	this.scale.x += this._Drill_PFOE.scale_x;		// 缩放x
	this.scale.y += this._Drill_PFOE.scale_y;		// 缩放y
	//this.skew.x += this._Drill_PFOE.skew_x;		// 斜切x
	//this.skew.y += this._Drill_PFOE.skew_y;		// 斜切y
	
	this.opacity = this._Drill_PFOE.opacity;		// 透明度
}
//==============================
// * 帧刷新 - 获取图片宽高
//==============================
Sprite_Picture.prototype.drill_PFOE_updateBitmap = function() {
	if( this.bitmap && this.bitmap.isReady() ){
		this._Drill_PFOE.real_width = this.bitmap.width;
		this._Drill_PFOE.real_height = this.bitmap.height;
	}
}


//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _Drill_PFOE_c_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_Drill_PFOE_c_initialize.call(this);
	this._Drill_PFOE = {};					//（不要用initMembers，follower没有这个方法）
	this._Drill_PFOE.x = 0;					// x
	this._Drill_PFOE.y = 0;					// y
	this._Drill_PFOE.rotation = 0;			// 旋转
	this._Drill_PFOE.scale_x = 0;			// 缩放x
	this._Drill_PFOE.scale_y = 0;			// 缩放y
	this._Drill_PFOE.skew_x = 0;			// 斜切x
	this._Drill_PFOE.skew_y = 0;			// 斜切y
	
	this._Drill_PFOE.opacity = 255;			// 透明度（不叠加，【注意，这里是消失效果，默认255】）
	this._Drill_PFOE.playing_type = "";		// 显示类型
	this._Drill_PFOE.real_width = -1;		// 贴图宽
	this._Drill_PFOE.real_height = -1;		// 贴图高
	this._Drill_PFOE.anchor_x = 0;			// 锚点中心x
	this._Drill_PFOE.anchor_y = 0;			// 锚点中心y
}
//==============================
// * 图片 - 动作判定
//==============================
Game_Picture.prototype.drill_PFOE_isPlaying = function() {
	if( !this._Drill_PFOE ){ return false; }
	if( this._Drill_PFOE.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 图片 - 设置透明度
//==============================
Game_Picture.prototype.drill_PFOE_setOpacity = function( opacity ){
	if( isNaN(opacity) ){
		alert(	"【Drill_PictureFadeOutEffect.js 图片 - 消失动作效果】\n" +
				"错误，透明度赋值时出现了NaN错误值。");
	}
	this._opacity = opacity;
}
//==============================
// * 图片 - 控制 - 显示图片
//==============================
var _Drill_PFOE_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
	_Drill_PFOE_p_show.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
	if( origin == 0 ){
		this._Drill_PFOE.anchor_x = 0;			// 锚点中心x
		this._Drill_PFOE.anchor_y = 0;			// 锚点中心y
	}
	if( origin == 1 ){
		this._Drill_PFOE.anchor_x = 0.5;		// 锚点中心x
		this._Drill_PFOE.anchor_y = 0.5;		// 锚点中心y
	}
}
//==============================
// * 图片 - 控制 - 移动图片
//==============================
var _Drill_PFOE_p_move = Game_Picture.prototype.move;
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration) {
	_Drill_PFOE_p_move.call(this, origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
	if( origin == 0 ){
		this._Drill_PFOE.anchor_x = 0;			// 锚点中心x
		this._Drill_PFOE.anchor_y = 0;			// 锚点中心y
	}
	if( origin == 1 ){
		this._Drill_PFOE.anchor_x = 0.5;		// 锚点中心x
		this._Drill_PFOE.anchor_y = 0.5;		// 锚点中心y
	}
}
//==============================
// * 图片 - 帧刷新
//==============================
var _Drill_PFOE_p_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_Drill_PFOE_p_update.call(this);
	
	if( this._Drill_PFOE == undefined ){ return; } 
	if( this._Drill_PFOE.playing_type == "" ){ return; }
	if( this._Drill_PFOE.real_width == -1 ){ return; }		//需要等图片加载完成
	if( this._Drill_PFOE.real_height == -1 ){ return; }
	
	this.drill_PFOE_updateHidingDisappear();		//帧刷新 - 直接消失
	this.drill_PFOE_updateHidingMoveDisappear();	//帧刷新 - 移动消失
	this.drill_PFOE_updateHidingSpring();			//帧刷新 - 标准升起
	this.drill_PFOE_updateHidingJump();				//帧刷新 - 标准弹跳
	this.drill_PFOE_updateHidingShrink();			//帧刷新 - 缩小消失
	this.drill_PFOE_updateHidingHorizonFlat();		//帧刷新 - 横向挤扁
	this.drill_PFOE_updateHidingVerticalFlat();		//帧刷新 - 纵向挤扁
	this.drill_PFOE_updateHidingBlowOutLeft();		//帧刷新 - 向左炸飞
	this.drill_PFOE_updateHidingBlowOutRight();		//帧刷新 - 向右炸飞
	this.drill_PFOE_updateHidingShrinkSpring();		//帧刷新 - 弹性缩小消失
}
//==============================
// * 图片 - 终止效果
//==============================
Game_Picture.prototype.drill_PFOE_stopEffect = function() {
	var ef = this._Drill_PFOE;
	ef.x = 0;					// x
	ef.y = 0;					// y
	ef.rotation = 0;			// 旋转
	ef.scale_x = 0;				// 缩放x
	ef.scale_y = 0;				// 缩放y
	ef.skew_x = 0;				// 斜切x
	ef.skew_y = 0;				// 斜切y
	ef.opacity = 0 ;
	ef.playing_type = "";
	this.drill_PFOE_setOpacity(ef.opacity);
}


//=============================================================================
// ** 消失动作
//=============================================================================
//==============================
// * 初始化 - 消失 直接消失
//==============================
Game_Picture.prototype.drill_PFOE_playHidingDisappear = function( time ){
	var ef = this._Drill_PFOE;
	ef.playing_type = "直接消失";
	ef.fA_dtime = time;
	ef.fA_time = 0;
}
//==============================
// * 帧刷新 - 消失 直接消失
//==============================
Game_Picture.prototype.drill_PFOE_updateHidingDisappear = function() {
	var ef = this._Drill_PFOE;
	if( ef.playing_type != "直接消失" ){ return; }
	
	if( ef.fA_time < ef.fA_dtime ){
		ef.fA_time ++;
		ef.opacity = 255 *(1 - ef.fA_time/ef.fA_dtime);
		this.drill_PFOE_setOpacity(ef.opacity);
	}else{
		this.drill_PFOE_stopEffect();	//结束动作
	}
}

//==============================
// * 初始化 - 消失 移动消失
//==============================
Game_Picture.prototype.drill_PFOE_playHidingMoveDisappear = function( time,angle,distance ){
	var ef = this._Drill_PFOE;
	ef.playing_type = "移动消失";
	ef.fA_dtime = time;
	ef.fA_time = 0;
	ef.fA_angle = angle;
	ef.fA_distance = distance;
}
//==============================
// * 帧刷新 - 消失 移动消失
//==============================
Game_Picture.prototype.drill_PFOE_updateHidingMoveDisappear = function() {
	var ef = this._Drill_PFOE;
	if( ef.playing_type != "移动消失" ){ return; }
	
	if( ef.fA_time < ef.fA_dtime ){
		ef.fA_time ++;
		var temp_d = ef.fA_distance * ef.fA_time/ef.fA_dtime;		//匀速移动
		ef.x = temp_d * Math.cos( ef.fA_angle *Math.PI/180 );
		ef.y = temp_d * Math.sin( ef.fA_angle *Math.PI/180 );
		ef.opacity = 255 *(1 - ef.fA_time/ef.fA_dtime);
		this.drill_PFOE_setOpacity(ef.opacity);
	}else{
		this.drill_PFOE_stopEffect();	//结束动作
	}
}

//==============================
// * 初始化 - 消失 标准升起
//==============================
Game_Picture.prototype.drill_PFOE_playHidingSpring = function( time,height,b_time ) {
	var ef = this._Drill_PFOE;
	ef.playing_type = "标准升起";
	ef.fA_dTime = time;
	ef.fA_distance = -1 * height;
	ef.fA_a = 2*ef.fA_distance/ef.fA_dTime/ef.fA_dTime;	//加速度公式
	ef.fA_time = 0;
	ef.fB_dTime = b_time || 30;
	ef.fB_time = 0;
}
//==============================
// * 帧刷新 - 消失 标准升起
//==============================
Game_Picture.prototype.drill_PFOE_updateHidingSpring = function() {
	var ef = this._Drill_PFOE;
	if( ef.playing_type != "标准升起" ){ return; }
	
	if( ef.fB_time <= ef.fB_dTime ){
		ef.fB_time ++;
		var t = ef.fB_time;
		var a = 0.8 / ef.fB_dTime / ef.fB_dTime;	//固定压缩0.2比例
		var b = -1 * a * ef.fB_dTime;
		var c = 0;
		ef.scale_x = -1*(a*ef.fB_time*ef.fB_time + b*ef.fB_time + c);
		ef.scale_y = -ef.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PFOE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;
		ef.y = fix_point.y;
		
		ef.opacity = 255;
		this.drill_PFOE_setOpacity(ef.opacity);
	}else if( ef.fA_time < ef.fA_dTime ){
		ef.fA_time ++;
		var t = ef.fA_time;
		ef.y = ef.fA_a*t*t/2;	//加速上升
		ef.opacity = 255 * (ef.fA_dTime - ef.fA_time) /ef.fA_dTime * 2 ;
		this.drill_PFOE_setOpacity(ef.opacity);
	}else{
		this.drill_PFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 消失 标准弹跳
//==============================
Game_Picture.prototype.drill_PFOE_playHidingJump = function( time, height ) {
	var ef = this._Drill_PFOE;
	ef.playing_type = "标准弹跳";
	ef.f_a = -4*height/time/time;	//抛物线公式 y = ax2 + bx +c（一样）
	ef.f_b = 4*height/time;	
	ef.f_c = 0;	
	ef.f_time = 0;
	ef.f_dTime = time;
}
//==============================
// * 帧刷新 - 消失 标准弹跳
//==============================
Game_Picture.prototype.drill_PFOE_updateHidingJump = function() {
	var ef = this._Drill_PFOE;
	if( ef.playing_type != "标准弹跳" ){ return; }
	
	if( ef.f_time < ef.f_dTime/2 ){		//通用一个公式，只是根据顶点值分成了两份
		ef.f_time ++;
		var t = ef.f_time;
		ef.y = -1*(ef.f_a*t*t + ef.f_b*t);
		ef.opacity = 255 ;
		this.drill_PFOE_setOpacity(ef.opacity);
	}else if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		var t = ef.f_time;
		ef.y = -1*(ef.f_a*t*t + ef.f_b*t);
		if(ef.y >0){ ef.y = 0; }
		ef.opacity = 255 - 255 * (ef.f_time - ef.f_dTime/2 ) /ef.f_dTime*2 ;
		this.drill_PFOE_setOpacity(ef.opacity);
	}else{
		this.drill_PFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 消失 缩小消失
//==============================
Game_Picture.prototype.drill_PFOE_playHidingShrink = function( time, opacity_off ) {
	var ef = this._Drill_PFOE;
	ef.playing_type = "缩小消失";
	
	ef.fA_sa = 2/time/time/2;	//匀加速公式 scale = 1/2 * at2
	ef.fA_sb = 0;	
	ef.fA_sc = 0;	
	ef.fA_ya = 20/time/time/2;	//抛物线公式 y = ax2 + bx +c
	ef.fA_yb = 0;	
	ef.fA_yc = 0;	
	ef.fA_time = 0;
	ef.fA_dTime = time;
	
	ef.f_opacityOff = opacity_off;
}
//==============================
// * 帧刷新 - 消失 缩小消失
//==============================
Game_Picture.prototype.drill_PFOE_updateHidingShrink = function() {
	var ef = this._Drill_PFOE;
	if( ef.playing_type != "缩小消失" ){ return; }
	
	if( ef.fA_time < ef.fA_dTime ){
		ef.fA_time ++;
		var t = ef.fA_time;
		
		ef.y = 20 -1*(ef.fA_ya*t*t + ef.fA_yb*t);	//抛物线
		ef.scale_x = - ef.fA_sa*t*t - ef.fA_sb*t;	//匀加速放大
		ef.scale_y = ef.scale_x;
		if(ef.y >0){ ef.y = 0;}
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PFOE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;
		ef.y = ef.y + fix_point.y;

		// > 透明度变化
		if( ef.f_opacityOff == true ){
			ef.opacity = 255
			this.drill_PFOE_setOpacity(255);
		}else{
			ef.opacity = 255 - 255 * ef.fA_time /ef.fA_dTime ;
			this.drill_PFOE_setOpacity(ef.opacity);
		}
		
	}else{
		this.drill_PFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 消失 横向挤扁
//==============================
Game_Picture.prototype.drill_PFOE_playHidingHorizonFlat = function( time, scale_x, opacity_off ) {
	var ef = this._Drill_PFOE;
	ef.playing_type = "横向挤扁";
	
	ef.f_dTime = time ;
	ef.f_time = 0;
	ef.f_scale_x = scale_x - 1.0;
	
	ef.f_opacityOff = opacity_off;
}
//==============================
// * 帧刷新 - 消失 横向挤扁
//==============================
Game_Picture.prototype.drill_PFOE_updateHidingHorizonFlat = function() {
	var ef = this._Drill_PFOE;
	if( ef.playing_type != "横向挤扁" ){ return; }
		
	if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		
		ef.scale_x = ef.f_scale_x * ef.f_time/ef.f_dTime ;
		ef.scale_y = -1.0 * ef.f_time/ef.f_dTime ;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PFOE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;
		ef.y = fix_point.y;
		
		// > 透明度变化
		if( ef.f_opacityOff == true ){
			ef.opacity = 255
			this.drill_PFOE_setOpacity(255);
		}else{
			ef.opacity = 255 - 255 * ef.f_time /ef.f_dTime ;
			this.drill_PFOE_setOpacity(ef.opacity);
		}
		
	}else{
		this.drill_PFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 消失 纵向挤扁
//==============================
Game_Picture.prototype.drill_PFOE_playHidingVerticalFlat = function( time, scale_y, opacity_off ) {
	var ef = this._Drill_PFOE;
	ef.playing_type = "纵向挤扁";
	
	ef.f_dTime = time ;
	ef.f_time = 0;
	ef.f_scale_y = scale_y - 1.0;
	
	ef.f_opacityOff = opacity_off;
}
//==============================
// * 帧刷新 - 消失 纵向挤扁
//==============================
Game_Picture.prototype.drill_PFOE_updateHidingVerticalFlat = function() {
	var ef = this._Drill_PFOE;
	if( ef.playing_type != "纵向挤扁" ){ return; }
		
	if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		
		ef.scale_x = -1.0 * ef.f_time/ef.f_dTime ;
		ef.scale_y = ef.f_scale_y * ef.f_time/ef.f_dTime ;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PFOE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;
		ef.y = fix_point.y;
		
		// > 透明度变化
		if( ef.f_opacityOff == true ){
			ef.opacity = 255
			this.drill_PFOE_setOpacity(255);
		}else{
			ef.opacity = 255 - 255 * ef.f_time /ef.f_dTime ;
			this.drill_PFOE_setOpacity(ef.opacity);
		}
		
	}else{
		this.drill_PFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 消失 向左炸飞
//==============================
Game_Picture.prototype.drill_PFOE_playHidingBlowOutLeft = function( time, speed ) {
	var ef = this._Drill_PFOE;
	ef.playing_type = "向左炸飞";
	
	ef.f_dTime = time ;
	ef.f_time = 0;
	ef.f_speedX = speed;
	ef.f_speedY = speed * 0.5;
	ef.f_rotate = Math.PI/2 + Math.PI/4;	//135度
}
//==============================
// * 帧刷新 - 消失 向左炸飞
//==============================
Game_Picture.prototype.drill_PFOE_updateHidingBlowOutLeft = function() {
	var ef = this._Drill_PFOE;
	if( ef.playing_type != "向左炸飞" ){ return; }
		
	if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		
		ef.x = -1 * ef.f_speedX * ef.f_time ;
		ef.y = -1 *(ef.f_speedY*ef.f_time - ef.f_speedY*0.015 *ef.f_time*ef.f_time);	//抛物线公式
		ef.rotation = -1*(ef.f_rotate * ef.f_time/ef.f_dTime);
		
		ef.opacity = 255 - 255 * ef.f_time /ef.f_dTime ;
		this.drill_PFOE_setOpacity(ef.opacity);
	}else{
		this.drill_PFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 消失 向右炸飞
//==============================
Game_Picture.prototype.drill_PFOE_playHidingBlowOutRight = function( time, speed ) {
	var ef = this._Drill_PFOE;
	ef.playing_type = "向右炸飞";
	
	ef.f_dTime = time ;
	ef.f_time = 0;
	ef.f_speedX = speed;
	ef.f_speedY = speed * 0.5;
	ef.f_rotate = Math.PI/2 + Math.PI/4;	//135度
}
//==============================
// * 帧刷新 - 消失 向右炸飞
//==============================
Game_Picture.prototype.drill_PFOE_updateHidingBlowOutRight = function() {
	var ef = this._Drill_PFOE;
	if( ef.playing_type != "向右炸飞" ){ return; }
		
	if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		
		ef.x = ef.f_speedX * ef.f_time ;
		ef.y = -1 *(ef.f_speedY*ef.f_time - ef.f_speedY*0.015 *ef.f_time*ef.f_time);	//抛物线公式
		ef.rotation = (ef.f_rotate * ef.f_time/ef.f_dTime);
		
		ef.opacity = 255 - 255 * ef.f_time /ef.f_dTime ;
		this.drill_PFOE_setOpacity(ef.opacity);
	}else{
		this.drill_PFOE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 消失 弹性缩小消失
//==============================
Game_Picture.prototype.drill_PFOE_playHidingShrinkSpring = function( dtime, overflow_scale, anchor_x, anchor_y, opacity_off ){
	var ef = this._Drill_PFOE;
	ef.playing_type = "弹性缩小消失";
	
	ef.f_time = 0;	
	ef.f_dTime = dtime;
	
	ef.f_anchor_x = anchor_x;
	ef.f_anchor_y = anchor_y;
	ef.f_opacityOff = opacity_off;
	
	ef.f_abc = $gameTemp.drill_PFOE_getParabolicThree( 0,0, dtime*0.2,overflow_scale, dtime,-1 );
	
}
//==============================
// * 帧刷新 - 消失 弹性缩小消失
//==============================
Game_Picture.prototype.drill_PFOE_updateHidingShrinkSpring = function() {
	var ef = this._Drill_PFOE;
	if( ef.playing_type != "弹性缩小消失" ){ return; }
		
	if( ef.f_time < ef.f_dTime ){
		ef.f_time ++;
		var time = ef.f_time;
		
		var dt = ef.f_dTime;		//计算 落脚点
		var a = 2 / dt / dt;		//（匀减速移动到目标值）
		var c_time = dt - time;
		var per_step = 0.5 * a * dt * dt - 0.5 * a * c_time * c_time ;
		
		//【不要用分段函数，分段函数必然有 锯齿感 和 不和谐感 】
		
		// > 落脚点分配缩放值（三点抛物线）
		ef.scale_x = ef.f_abc['a']*time*time + ef.f_abc['b']*time + ef.f_abc['c'];
		ef.scale_y = ef.scale_x;
		
		// > 锚点锁定
		var fix_point = $gameTemp.drill_PFOE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, ef.f_anchor_x, ef.f_anchor_y, ef.real_width,ef.real_height, ef.rotation, ef.scale_x+1, ef.scale_y+1 );
		ef.x = fix_point.x;
		ef.y = fix_point.y;
		
		// > 透明度变化
		if( ef.f_opacityOff == true ){
			ef.opacity = 255
			this.drill_PFOE_setOpacity(255);
		}else{
			ef.opacity = 255 - 255 * ef.f_time /ef.f_dTime ;
			this.drill_PFOE_setOpacity(ef.opacity);
		}
		
	}else{
		this.drill_PFOE_stopEffect();	//结束动作
	}
}




