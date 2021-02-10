//=============================================================================
// Drill_PictureContinuedEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        图片 - 持续动作效果
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
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于rmmv图片。
 * 2.更多详细内容，去看看"关于动作效果.docx"。
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
 *   (1.特别注意，图片的中心锚点是可以修改的，rmmv默认有左上(0,0)和中
 *      心(0.5,0.5)的设置。中心锚点会影响部分动作效果。
 *   (2.该效果可以与 滤镜效果、方块粉碎效果 叠加。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行持续动作：
 * 
 * 插件指令：>持续动作 : 图片[1] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 图片变量[1] : 标准闪烁 : 持续时间[60] : 周期[30]
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
 * 插件指令：>持续动作 : 图片[1] : 呼吸效果 : 持续时间[180] : 周期[45] : 呼吸幅度[6]
 * 插件指令：>持续动作 : 图片[1] : 空中飘浮 : 持续时间[150] : 缓冲时间[60] : 飘浮高度[100] : 周期[30] : 幅度[8]
 * 插件指令：>持续动作 : 图片[1] : 旋转状态 : 持续时间[150] : 缓冲时间[60] : 旋转角度[90]
 * 插件指令：>持续动作 : 图片[1] : 缩放状态 : 持续时间[150] : 缓冲时间[60] : 缩放比例[1.5]
 * 
 * 1.前半部分（图片）和 后半部分（标准闪烁 : 持续时间[60] : 周期[30]）
 *   的参数可以随意组合。一共有4*13种组合方式。
 * 2.参数中"时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"幅度"、"高度"的单位是像素。
 * 3."标准闪烁 : 持续时间[60] : 周期[30]"表示：
 *    闪烁30帧，15帧透明，15帧不透明，持续60帧。也就是闪两次。
 * 4."旋转"类型中，一个周期旋转一整圈。
 *   持续60帧，周期30帧，则表示图像旋转两圈后结束。
 * 5."空中飘浮"类型中，包含飘起、漂浮中、飘落三种状态。
 *   缓冲时间对应飘起飘落的时间，可以应用于某种法术的释放动作。
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
 * 插件指令：>持续动作 : 图片[1] : 立即终止动作
 * 
 * 1.含"缓冲时间"的完整流程动作，可以使得该动作能够缓冲结束。
 *   而"立即终止动作"会直接终止所有动作，立即复原。
 * 2.如果你设置了"空中飘浮"为无限时间，让其停下来可以使用"结束动作"指令。
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
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.图片变化和事件的数量并没有多大关系，所以消耗保持在30ms左右。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件指令图片检查。
 * 
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
//		工作类型		持续执行
//		时间复杂度		o(n)*o(贴图处理) 每帧
//		性能测试因素	对话管理层
//		性能测试消耗	24.94ms 23.34ms（sprite_picture.update）
//		最坏情况		地图放了大量图片，并且所有图片都在持续变化。
//		备注			要说图片贴图和事件贴图哪个消耗大，真无法确定。
//						事件贴图面积小但变化多，而图片面积大但变化不多。
//
//插件记录：
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
			
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			/*-----------------标准闪烁------------------*/
			if( type == "标准闪烁" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingFlash( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------渐变闪烁------------------*/
			if( type == "渐变闪烁" ){
				temp1 = temp1.replace("持续时间[","");
				temp1 = temp1.replace("]","");
				temp1 = temp1.replace("无限","518400000");
				temp2 = temp2.replace("周期[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PCE_stopEffect();
						pics[k].drill_PCE_playSustainingFlashCos( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------顺时针旋转------------------*/
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
			/*-----------------逆时针旋转------------------*/
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
			/*-----------------垂直卡片旋转------------------*/
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
			/*-----------------水平卡片旋转------------------*/
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
			/*-----------------上下震动------------------*/
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
			/*-----------------左右震动------------------*/
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
			/*-----------------左右摇晃------------------*/
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
			/*-----------------呼吸效果------------------*/
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
			/*-----------------旋转状态------------------*/
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
			/*-----------------缩放状态------------------*/
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
		
		if( args.length == 14 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			var temp4 = String(args[11]);
			var temp5 = String(args[13]);
			/*-----------------空中飘浮------------------*/
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
		}
		
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( temp1 == "结束动作" ){
				/*-----------------空中飘浮------------------*/
				if( type == "空中飘浮" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingFloating();
						}
					}
				}
				/*-----------------旋转状态------------------*/
				if( type == "旋转状态" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingRotateState();
						}
					}
				}
				/*-----------------缩放状态------------------*/
				if( type == "缩放状态" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PCE_endSustainingResizeState();
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
// ** 存储变量初始化
//=============================================================================
var _drill_PCE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PCE_sys_initialize.call(this);
	
	//没有存储的内容
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
    //this.updateBitmap();								// 贴图资源
	//this.updateOrigin();								// 圆心x、圆心y
	//this.updatePosition();							// x、y
	//this.updateScale();								// 缩放x、缩放y
	//this.updateTone();								// 色调
	//this.updateOther();								// 透明度、混合模式、旋转
	if( this.skew.x != 0 ){ this.skew.x = 0; }			// 斜切x
	if( this.skew.y != 0 ){ this.skew.y = 0; }			// 斜切y
};

//==============================
// * 图片贴图 - 帧刷新
//==============================
var _Drill_PCE_sp_update2 = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_PCE_sp_update2.call(this);
	if( this.picture() ){
		this._Drill_PCE = this.picture()._Drill_PCE;
		this.update_PCE_effect();			//执行变换
		this.update_PCE_bitmap();			//获取图片宽高
	}
};
//==============================
// * 帧刷新 - 执行变换
//==============================
Sprite_Picture.prototype.update_PCE_effect = function() {
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
Sprite_Picture.prototype.update_PCE_bitmap = function() {
	if( this.bitmap && this.bitmap.isReady() ){
		this._Drill_PCE.real_width = this.bitmap.width;
		this._Drill_PCE.real_height = this.bitmap.height;
	}
}

//=============================================================================
// * 数学 - 锁定锚点
//			
//			说明：修正 旋转+缩放 的xy坐标，使其看起来像是在绕着 新的锚点 变换。
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
	
	var r = Math.sqrt( Math.pow(ww,2) + Math.pow(hh,2) );
	var p_degree = Math.atan(hh/ww);	
	p_degree = Math.PI - p_degree;
	
	xx = r*Math.cos( rotation - p_degree);		//圆公式 (x-a)²+(y-b)²=r²
	yy = r*Math.sin( rotation - p_degree);		//圆极坐标 x=ρcosθ,y=ρsinθ
	xx += ww * (1 - scale_x);
	yy += hh * (1 - scale_y);
	
	return { "x":xx, "y":yy };
}


//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 物体 - 初始化
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
// * 物体 - 动作判定
//==============================
Game_Picture.prototype.drill_PCE_isPlaying = function() {
	if( !this._Drill_PCE ){ return false; }
	if( this._Drill_PCE.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 帧刷新
//==============================
var _Drill_PCE_c_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_Drill_PCE_c_update.call(this);
	
	if( this._Drill_PCE == undefined ){ return; } 
	if( this._Drill_PCE.playing_type == "" ){ return; }
	if( this._Drill_PCE.real_width == -1 ){ return; }		//需要等图片加载完成
	if( this._Drill_PCE.real_height == -1 ){ return; }
	
	this.drill_PCE_updateSustainingFlash();
	this.drill_PCE_updateSustainingFlashCos();
	this.drill_PCE_updateSustainingRotate();
	this.drill_PCE_updateSustainingRotateVer();
	this.drill_PCE_updateSustainingRotateHor();
	this.drill_PCE_updateSustainingShakeUD();
	this.drill_PCE_updateSustainingShakeLR();
	this.drill_PCE_updateSustainingShakeRotate();
	this.drill_PCE_updateSustainingBreathing();
	this.drill_PCE_updateSustainingFloating();
	this.drill_PCE_updateSustainingRotateState();
	this.drill_PCE_updateSustainingResizeState();
}
//==============================
// * 图片 - 设置透明度
//==============================
Game_Picture.prototype.drill_PCE_setOpacity = function(opacity) {
	this._opacity = opacity;
}
//==============================
// * 图片 - 控制 - 显示图片
//==============================
var _Drill_PCE_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
	_Drill_PCE_p_show.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
	if( origin == 0 ){
		this._Drill_PCE.anchor_x = 0;			// 锚点中心x
		this._Drill_PCE.anchor_y = 0;			// 锚点中心y
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
		this._Drill_PCE.anchor_x = 0;			// 锚点中心x
		this._Drill_PCE.anchor_y = 0;			// 锚点中心y
	}
	if( origin == 1 ){
		this._Drill_PCE.anchor_x = 0.5;		// 锚点中心x
		this._Drill_PCE.anchor_y = 0.5;		// 锚点中心y
	}
}
//==============================
// * 初始化 - 终止效果
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


//==============================
// * 初始化 - 持续 标准闪烁
//==============================
Game_Picture.prototype.drill_PCE_playSustainingFlash = function(time,period) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingFlash";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.fA_time = 0;
	ef.fA_dest = period/2;
	ef.fB_time = 0;
	ef.fB_dest = period/2;
}
//==============================
// * 帧刷新 - 持续 标准闪烁
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingFlash = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingFlash" ){ return; }
	
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
	if( ef.f_time >= ef.f_dest ){
		this.drill_PCE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 渐变闪烁
//==============================
Game_Picture.prototype.drill_PCE_playSustainingFlashCos = function(time,period) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingFlashCos";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
}
//==============================
// * 帧刷新 - 持续 渐变闪烁
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingFlashCos = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingFlashCos" ){ return; }
	
	ef.f_time ++;
	ef.opacity = 127 + 126*Math.cos( ( 360* ef.f_time/ef.f_period )/180*Math.PI );
	this.drill_PCE_setOpacity(ef.opacity);
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_PCE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 顺时针/逆时针旋转
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotate = function(time,period,prop) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingRotate";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI * prop;
}
//==============================
// * 帧刷新 - 持续 顺时针/逆时针旋转
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotate = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingRotate" ){ return; }
	
	ef.f_time ++;
	ef.rotation += ef.f_speed;
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,0.5, ef.real_width,ef.real_height, ef.rotation, ef.scale_x, ef.scale_y );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_PCE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 垂直卡片旋转
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateVer = function(time,period) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingRotateVer";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 垂直卡片旋转
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateVer = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingRotateVer" ){ return; }
		
	ef.f_time ++;
	ef.scale_x = -0.5 - 0.5 *Math.cos( ef.f_time*ef.f_speed + Math.PI );
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_PCE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 水平卡片旋转
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateHor = function(time,period) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingRotateHor";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 水平卡片旋转
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateHor = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingRotateHor" ){ return; }
	
	ef.f_time ++;
	ef.scale_y = -0.5 - 0.5*Math.cos( ef.f_time*ef.f_speed + Math.PI );
	
	ef.y = 0.5 * this._Drill_PCE.real_height * ef.scale_y;
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_PCE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 上下震动
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeUD = function( time,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingShakeUD";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_scope = scope;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 上下震动
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeUD = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingShakeUD" ){ return; }
	
	ef.f_time ++;
	ef.y = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_PCE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 左右震动
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeLR = function( time,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingShakeLR";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_scope = scope;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 左右震动
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeLR = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingShakeLR" ){ return; }
	
	ef.f_time ++;
	ef.x = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_PCE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 左右摇晃
//==============================
Game_Picture.prototype.drill_PCE_playSustainingShakeRotate = function( time,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingShakeRotate";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_scope = scope /180*Math.PI;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 左右摇晃
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingShakeRotate = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingShakeRotate" ){ return; }
	
	ef.f_time ++;
	ef.rotation = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x, ef.scale_y );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_PCE_stopEffect();	//结束动作
	}
}

//==============================
// * 初始化 - 持续 呼吸效果
//==============================
Game_Picture.prototype.drill_PCE_playSustainingBreathing = function( time,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingBreathing";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_scope = scope ;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 呼吸效果
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingBreathing = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingBreathing" ){ return; }
	
	ef.f_time ++;
	ef.scale_y = (ef.f_scope / ef.real_height) * Math.sin( ef.f_time*ef.f_speed );
	
	// > 锚点(0.5,1.0)锁定
	var fix_point = $gameTemp.drill_PCE_getFixPointInAnchor( ef.anchor_x,ef.anchor_y, 0.5,1.0, ef.real_width,ef.real_height, ef.rotation, ef.scale_x, ef.scale_y );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_PCE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 空中飘浮
//==============================
Game_Picture.prototype.drill_PCE_playSustainingFloating = function( time,b_time,height,period,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingFloating";
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
	if( ef.playing_type != "sustainingFloating" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 空中飘浮
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingFloating = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingFloating" ){ return; }
	
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){		//升起
		ef.fA_time ++;
		ef.y = ef.f_height * ef.fA_time / ef.fA_dest;
		ef.y *= -1;
		
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){	//漂浮
		ef.fB_time ++;
		ef.y = ef.f_height + ef.fB_scope * Math.sin( ef.fB_time*ef.fB_speed );
		ef.y *= -1;
		
	}else if( ef.fC_time < ef.fC_dest ){	//降落
		ef.fC_time ++;
		ef.y = ef.f_height * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		ef.y *= -1;
		
	}else{
		this.drill_PCE_stopEffect();		//结束动作
	}
}


//==============================
// * 初始化 - 持续 旋转状态
//==============================
Game_Picture.prototype.drill_PCE_playSustainingRotateState = function( time,b_time,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingRotateState";
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
	if( ef.playing_type != "sustainingRotateState" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 旋转状态
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingRotateState = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingRotateState" ){ return; }
	
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){			//开始旋转
		ef.fA_time ++;
		ef.rotation = ef.f_scope * ef.fA_time / ef.fA_dest;
		
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){		//保持
		ef.fB_time ++;
		ef.rotation = ef.f_scope;
		
	}else if( ef.fC_time < ef.fC_dest ){	//结束旋转
		ef.fC_time ++;
		ef.rotation = ef.f_scope * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		
	}else{
		this.drill_PCE_stopEffect();		//结束动作
	}
}


//==============================
// * 初始化 - 持续 缩放状态
//==============================
Game_Picture.prototype.drill_PCE_playSustainingResizeState = function( time,b_time,scope ) {
	var ef = this._Drill_PCE;
	ef.playing_type = "sustainingResizeState";
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
	if( ef.playing_type != "sustainingResizeState" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 缩放状态
//==============================
Game_Picture.prototype.drill_PCE_updateSustainingResizeState = function() {
	var ef = this._Drill_PCE;
	if( ef.playing_type != "sustainingResizeState" ){ return; }
	
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){			//开始缩放
		ef.fA_time ++;
		ef.scale_x = ef.f_scope * ef.fA_time / ef.fA_dest;
		ef.scale_y = ef.scale_x;
		
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){		//保持
		ef.fB_time ++;
		ef.scale_x = ef.f_scope;
		ef.scale_y = ef.scale_x;
		
	}else if( ef.fC_time < ef.fC_dest ){	//结束缩放
		ef.fC_time ++;
		ef.scale_x = ef.f_scope * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		ef.scale_y = ef.scale_x;
		
	}else{
		this.drill_PCE_stopEffect();		//结束动作
	}
}





