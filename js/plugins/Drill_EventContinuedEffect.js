//=============================================================================
// Drill_EventContinuedEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        行走图 - 持续动作效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventContinuedEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以播放事件持续执行的各种动作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于 事件、玩家 。
 * 2.更多详细内容，去看看"关于动作效果.docx"。
 * 细节：
 *   (1.所有动作都是并行的，你可能需要手动加等待时间。
 *   (2.所有 持续动作 都可以与消失/显现动作效果叠加，但不包括透明度的
 *      叠加。持续动作 同时只能播放一种。
 * 指令：
 *   (1.透明度为0的事件不能执行持续动作效果。
 *   (2.不同类型动作的参数和指令有较大区别。
 *      如果指令的参数名和参数数量不匹配，则动作不会被执行。
 * 临时动作/永久动作：
 *   (1.插件指令的类型中，都有"持续时间"控制，用于临时动作。
 *      你可以填写"持续时间[无限]"，使得事件永久执行动作。
 *   (2.事件注释设置 跨事件页。
 *      并且注释为永久执行动作。
 * 完整流程动作：
 *   (1.含有"缓冲时间"的动作都有一套 开始、持续、结束 的流程。
 *      比如"空中飘浮"、"旋转状态"、"缩放状态"等动作。
 *   (2.以"空中飘浮"动作为例，开始、结束的过程，会在缓冲时间内完成。
 *      持续150，缓冲60，那么整个动作将在 60+150+60 的时间内完成。
 *      "空中飘浮"可以设置无限持续时间，如果要让其停下，使用"结束动
 *      作"指令即可。
 * 设计：
 *   (1.持续动作效果对镜像有效，只是倒影镜像的动作和事件本身的动作有
 *      不对称的现象。
 *   (2.该效果可以与 滤镜效果、方块粉碎效果 叠加。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行持续动作：
 * 
 * 插件指令：>持续动作 : 玩家 : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 玩家领队 : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 玩家全员 : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 玩家队员[1] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 玩家队员变量[21] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 事件[1] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 事件变量[1] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 批量事件[10,11] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 批量事件变量[21,22] : 标准闪烁 : 持续时间[60] : 周期[30]
 * 
 * 插件指令：>持续动作 : 本事件 : 标准闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 渐变闪烁 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 顺时针旋转 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 逆时针旋转 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 垂直卡片旋转 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 水平卡片旋转 : 持续时间[60] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 上下震动 : 持续时间[60] : 周期[6] : 震动幅度[4]
 * 插件指令：>持续动作 : 本事件 : 左右震动 : 持续时间[60] : 周期[6] : 震动幅度[4]
 * 插件指令：>持续动作 : 本事件 : 左右摇晃 : 持续时间[40] : 周期[20] : 摇晃幅度[15]
 * 插件指令：>持续动作 : 本事件 : 呼吸效果 : 持续时间[180] : 周期[45] : 呼吸幅度[2]
 * 插件指令：>持续动作 : 本事件 : 空中飘浮 : 持续时间[150] : 缓冲时间[60] : 飘浮高度[24] : 周期[30] : 幅度[3]
 * 插件指令：>持续动作 : 本事件 : 旋转状态 : 持续时间[150] : 缓冲时间[60] : 旋转角度[90]
 * 插件指令：>持续动作 : 本事件 : 缩放状态 : 持续时间[150] : 缓冲时间[60] : 缩放比例[1.5]
 * 
 * 1.前半部分（玩家）和 后半部分（标准闪烁 : 持续时间[60] : 周期[30]）
 *   的参数可以随意组合。一共有10*13种组合方式。
 * 2."玩家"和"玩家领队"是同一个意思。
 *   "玩家队员[1]"表示领队后面第一个跟随的队友。
 * 3.参数中"时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"幅度"、"高度"的单位是像素。
 * 4."标准闪烁 : 持续时间[60] : 周期[30]"表示：
 *    闪烁30帧，15帧透明，15帧不透明，持续60帧。也就是闪两次。
 * 5."旋转"类型中，一个周期旋转一整圈。
 *   持续60帧，周期30帧，则表示图像旋转两圈后结束。
 * 6."空中飘浮"类型中，包含飘起、漂浮中、飘落三种状态。
 *   缓冲时间对应飘起飘落的时间，可以应用于某种法术的释放动作。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>玩家持续效果 : 领队 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>玩家持续效果 : 指定队员 : 1 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>玩家持续效果 : 指定队员(变量) : 1 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>玩家持续效果 : 全部队员 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>事件持续效果 : 本事件 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>事件持续效果 : 指定事件 : 1 : 标准闪烁 : 60 : 30
 * 插件指令(旧)：>事件持续效果 : 指定事件(变量) : 1 : 标准闪烁 : 60 : 30
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 无限时间
 * 你可以将上面插件指令的持续时间中，填"无限"：
 * 
 * 插件指令：>持续动作 : 本事件 : 标准闪烁 : 持续时间[无限] : 周期[30]
 * 插件指令：>持续动作 : 本事件 : 旋转状态 : 持续时间[无限] : 缓冲时间[60] : 旋转角度[90]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 结束动作
 * 上述的部分类型含缓冲时间，你可以控制其缓冲结束：
 * 
 * 插件指令：>持续动作 : 本事件 : 空中飘浮 : 结束动作
 * 插件指令：>持续动作 : 本事件 : 旋转状态 : 结束动作
 * 插件指令：>持续动作 : 本事件 : 缩放状态 : 结束动作
 * 插件指令：>持续动作 : 本事件 : 立即终止动作
 * 
 * 1.含"缓冲时间"的完整流程动作，可以使得该动作能够缓冲结束。
 *   而"立即终止动作"会直接终止所有动作，立即复原。
 * 2.如果你设置了"空中飘浮"为无限时间，让其停下来可以使用"结束动作"指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以直接添加事件注释，让一个事件永久持续某个效果。
 * 
 * 事件注释：=>持续动作 : 标准闪烁 : 周期[30]
 * 事件注释：=>持续动作 : 渐变闪烁 : 周期[30]
 * 事件注释：=>持续动作 : 顺时针旋转 : 周期[30]
 * 事件注释：=>持续动作 : 逆时针旋转 : 周期[30]
 * 事件注释：=>持续动作 : 垂直卡片旋转 : 周期[30]
 * 事件注释：=>持续动作 : 水平卡片旋转 : 周期[30]
 * 事件注释：=>持续动作 : 上下震动 : 周期[6] : 震动幅度[4]
 * 事件注释：=>持续动作 : 左右震动 : 周期[6] : 震动幅度[4]
 * 事件注释：=>持续动作 : 左右摇晃 : 周期[20] : 摇晃幅度[15]
 * 事件注释：=>持续动作 : 呼吸效果 : 周期[45] : 呼吸幅度[2]
 * 事件注释：=>持续动作 : 空中飘浮 : 飘浮高度[24] : 周期[30] : 幅度[3]
 * 事件注释：=>持续动作 : 旋转状态 : 旋转角度[90]
 * 事件注释：=>持续动作 : 缩放状态 : 缩放比例[1.5]
 * 
 * 1.注释加上后，直接为无限时间。数字表示动作周期。
 *   如果要终止效果，可以使用插件指令终止。
 * 
 * 以下是旧版本的指令，也可以用：
 * 事件注释(旧)：=>事件持续效果 : 标准闪烁 : 30
 * 事件注释(旧)：=>事件持续效果 : 渐变闪烁 : 30
 * 事件注释(旧)：=>事件持续效果 : 顺时针旋转 : 30
 * 事件注释(旧)：=>事件持续效果 : 逆时针旋转 : 30
 * 事件注释(旧)：=>事件持续效果 : 垂直卡片旋转 : 30
 * 事件注释(旧)：=>事件持续效果 : 水平卡片旋转 : 30
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
 * 时间复杂度： o(n)*o(镜像)*o(贴图处理) 每帧
 * 测试方法：   放置10个持续动作变化的事件，在事件数量不同的地图中测。
 * 测试结果：   200个事件的地图中，平均消耗为：【85.19ms】
 *              100个事件的地图中，平均消耗为：【47.93ms】
 *               50个事件的地图中，平均消耗为：【38.16ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.插件对镜像也有效果，该测试是包括镜像一起测试的结果。
 *   由于持续变化的事件数量和消耗几乎成正比，所以放20个以上电脑就带不动了。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * [v1.2]
 * 优化了内部结构，并且添加了性能测试说明。
 * [v1.3]
 * 修改了插件指令格式。
 * [v1.4]
 * 添加了上下震动、左右摇晃、呼吸效果、空中飘浮 功能。
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ECE（Event_Continued_Effect）
//		临时全局变量	无
//		临时局部变量	this._drill_ECE_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)*o(镜像)*o(贴图处理) 每帧
//		性能测试因素	地图管理层 125事件
//		性能测试消耗	39.91ms（Sprite_Character.update）
//		最坏情况		所有事件都在执行动作。
//		备注			从原理上看，变化并没有那么复杂，只是图像一直在变。
//						类似于滤镜，但没有滤镜消耗复杂。
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
//					->多个持续动作并行	x
//					->事件注释
//					->数学锚点变换问题
//					->结构优化（换成Game_Character）
//
//		★必要注意事项：
//			1.变化原理为：每帧都【固定初始值】，然后适时赋值公式变化值。
//			2.由于rmmv函数中没有【Game_Character.prototype.update】，所以继承时要用【Game_CharacterBase.prototype.update】。
//			  之前继承了这个没有的函数，造成了举起物体插件出问题。
//
//		★其它说明细节：
//			1.事件的锚点固定为(0.5,1)。
//			2.需要改变x,y,opacity,rotation,scale_x,scale_y的值，并且毫无损失地复原。
//			  另外，对齐每一个插件指令，也是比较头疼的问题。
//			  结构并不复杂，只是内容划分太多。	
//			3.队伍透明度统一存在麻烦的地方，队长的透明度每帧都会分配给跟随者。
//			  目前只设置了播放动作的时候，透明度才不统一。
//			4.继承Game_Character不要用initMembers，因为follower不会调用这个方法。
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventContinuedEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventContinuedEffect');
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_ECE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_ECE_pluginCommand.call(this, command, args);
	
	if( command === ">持续动作" ){ 
	
		/*-----------------对象组获取------------------*/
		var e_chars = null;			// 事件对象组
		var p_chars = null;			// 玩家对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( e_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_ECE_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_ECE_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					e_chars.push( e );
				}
			}
			if( e_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_ECE_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			if( e_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_ECE_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				e_chars = [ e ];
			}
			
			if( p_chars == null && ( unit == "玩家" || unit == "玩家领队" ) ){
				p_chars = [ $gamePlayer ];
			}
			if( p_chars == null && unit == "玩家全员" ){
				p_chars = $gamePlayer.followers().visibleFollowers();
				p_chars.unshift($gamePlayer);
			}
			if( p_chars == null && unit.indexOf("玩家队员变量[") != -1 ){
				unit = unit.replace("玩家队员变量[","");
				unit = unit.replace("]","");
				var group = $gamePlayer.followers().visibleFollowers();
				group.unshift($gamePlayer);
				p_chars = [];
				p_chars.push(group[ $gameVariables.value(Number(unit)) ]);
			}
			if( p_chars == null && unit.indexOf("玩家队员[") != -1 ){
				unit = unit.replace("玩家队员[","");
				unit = unit.replace("]","");
				var group = $gamePlayer.followers().visibleFollowers();
				group.unshift($gamePlayer);
				p_chars = [];
				p_chars.push(group[ Number(unit) ]);
			}
		}
		// > 透明度检查
		if( p_chars != null && $gamePlayer.opacity() == 0 ){
			p_chars = null;
		}
		if( e_chars != null ){
			var temp_tank = [];
			for( var k=0; k < e_chars.length; k++ ){
				if( e_chars[k].opacity() != 0 ){
					temp_tank.push( e_chars[k] );
				}
			}
			e_chars = temp_tank;
		}

		
		/*-----------------立即终止动作------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即终止动作" ){
				if( e_chars != null){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
					}
				}
				if( p_chars != null){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingFlash( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingFlash( Number(temp1),Number(temp2) );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingFlashCos( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingFlashCos( Number(temp1),Number(temp2) );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotate( Number(temp1),Number(temp2), 1 );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotate( Number(temp1),Number(temp2), 1 );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotate( Number(temp1),Number(temp2), -1 );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotate( Number(temp1),Number(temp2), -1 );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotateVer( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotateVer( Number(temp1),Number(temp2) );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotateHor( Number(temp1),Number(temp2) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotateHor( Number(temp1),Number(temp2) );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingShakeUD( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingShakeUD( Number(temp1),Number(temp2),Number(temp3) );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingShakeLR( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingShakeLR( Number(temp1),Number(temp2),Number(temp3) );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingShakeRotate( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingShakeRotate( Number(temp1),Number(temp2),Number(temp3) );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingBreathing( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingBreathing( Number(temp1),Number(temp2),Number(temp3) );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingRotateState( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingRotateState( Number(temp1),Number(temp2),Number(temp3) );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingResizeState( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingResizeState( Number(temp1),Number(temp2),Number(temp3) );
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
				if( e_chars != null ){
					for( var k=0; k < e_chars.length; k++ ){
						e_chars[k].drill_ECE_stopEffect();
						e_chars[k].drill_ECE_playSustainingFloating( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
					}
				}
				if( p_chars != null ){
					for( var k=0; k < p_chars.length; k++ ){
						p_chars[k].drill_ECE_stopEffect();
						p_chars[k].drill_ECE_playSustainingFloating( Number(temp1),Number(temp2),Number(temp3),Number(temp4),Number(temp5) );
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
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingFloating();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingFloating();
						}
					}
				}
				/*-----------------旋转状态------------------*/
				if( type == "旋转状态" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingRotateState();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingRotateState();
						}
					}
				}
				/*-----------------缩放状态------------------*/
				if( type == "缩放状态" ){
					if( e_chars != null ){
						for( var k=0; k < e_chars.length; k++ ){
							e_chars[k].drill_ECE_endSustainingResizeState();
						}
					}
					if( p_chars != null ){
						for( var k=0; k < p_chars.length; k++ ){
							p_chars[k].drill_ECE_endSustainingResizeState();
						}
					}
				}
			}
		}
	}
	
	
	/*-----------------------------------------*/
	/*-----------------旧指令------------------*/
	/*-----------------------------------------*/
	if (command === '>玩家持续效果') { // >玩家持续效果 : 领队 : 标准闪烁 : 60 : 30
		if(args.length >= 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if(args[5]){ var time = String(args[5]); }
			if(args[7]){ var period = Number(args[7]); }
			
			if( $gamePlayer.opacity() == 0){ return; }
			if(time == '无限时间'){
				time = 60*60*60*24*100;
			}else{
				time = Number(time);
			}
			if( temp1 == '领队' ){ 
				if( type == '终止持续效果' ){
					$gamePlayer.drill_ECE_stopEffect();
				}
				if( type == '标准闪烁' ){
					$gamePlayer.drill_ECE_playSustainingFlash(time,period);
				}
				if( type == '渐变闪烁' ){
					$gamePlayer.drill_ECE_playSustainingFlashCos(time,period);
				}
				if( type == '顺时针旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotate(time,period,1);
				}
				if( type == '逆时针旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotate(time,period,-1);
				}
				if( type == '垂直卡片旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotateVer(time,period);
				}
				if( type == '水平卡片旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotateHor(time,period);
				}
			}
			if( temp1 == '全部队员' ){ 
				if( type == '终止持续效果' ){
					$gamePlayer.drill_ECE_stopEffect();
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_stopEffect(); },this);
				}
				if( type == '标准闪烁' ){
					$gamePlayer.drill_ECE_playSustainingFlash(time,period);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingFlash(time,period); },this);
				}
				if( type == '渐变闪烁' ){
					$gamePlayer.drill_ECE_playSustainingFlashCos(time,period);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingFlashCos(time,period); },this);
				}
				if( type == '顺时针旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotate(time,period,1);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotate(time,period,1); },this);
				}
				if( type == '逆时针旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotate(time,period,-1);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotate(time,period,-1); },this);
				}
				if( type == '垂直卡片旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotateVer(time,period);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotateVer(time,period); },this);
				}
				if( type == '水平卡片旋转' ){
					$gamePlayer.drill_ECE_playSustainingRotateHor(time,period);
					$gamePlayer.followers().forEach(function(f){ f.drill_ECE_playSustainingRotateHor(time,period); },this);
				}
			}
		}
		if(args.length >= 6 ){
			var temp1 = String(args[1]);
			var temp2 = Number(args[3]);
			var type = String(args[5]);
			if(args[7]){ var time = String(args[7]); }
			if(args[9]){ var period = Number(args[9]); }
			
			if(time == '无限时间'){
				time = 60*60*60*24*100;
			}else{
				time = Number(time);
			}
			var _followers = $gamePlayer.followers().visibleFollowers();
			_followers.unshift($gamePlayer);
			if( temp1 == '指定队员' ){
				if( temp2 < _followers.length ){
					if( _followers[temp2].opacity() == 0){
						return;
					}
					if( type == '终止持续效果' ){
						_followers[temp2].drill_ECE_stopEffect();
					}
					if( type == '标准闪烁' ){
						_followers[temp2].drill_ECE_playSustainingFlash(time,period);
					}
					if( type == '渐变闪烁' ){
						_followers[temp2].drill_ECE_playSustainingFlashCos(time,period);
					}
					if( type == '顺时针旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotate(time,period,1);
					}
					if( type == '逆时针旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotate(time,period,-1);
					}
					if( type == '垂直卡片旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotateVer(time,period);
					}
					if( type == '水平卡片旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotateHor(time,period);
					}
				}
			}
			if( temp1 == '指定队员(变量)' ){ 
				temp2 = $gameVariables.value(temp2);
				if( temp2 < _followers.length ){
					if( _followers[temp2].opacity() == 0){
						return;
					}
					if( type == '终止持续效果' ){
						_followers[temp2].drill_ECE_stopEffect();
					}
					if( type == '标准闪烁' ){
						_followers[temp2].drill_ECE_playSustainingFlash(time,period);
					}
					if( type == '渐变闪烁' ){
						_followers[temp2].drill_ECE_playSustainingFlashCos(time,period);
					}
					if( type == '顺时针旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotate(time,period,1);
					}
					if( type == '逆时针旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotate(time,period,-1);
					}
					if( type == '垂直卡片旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotateVer(time,period);
					}
					if( type == '水平卡片旋转' ){
						_followers[temp2].drill_ECE_playSustainingRotateHor(time,period);
					}
				}
			}
		}
	}
	if (command === '>事件持续效果') { // >事件持续效果 : 本事件 : 标准闪烁 : 60 : 168
		if(args.length >= 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if(args[5]){ var time = String(args[5]); }
			if(args[7]){ var period = Number(args[7]); } 
			
			if(time == '无限时间'){
				time = 60*60*60*24*100;
			}else{
				time = Number(time);
			}
			if( temp1 == '本事件' ){
				var e = $gameMap.event( this._eventId );
				if( e.opacity() == 0){
					return;
				}
				if( type == '终止持续效果' ){
					e.drill_ECE_stopEffect();
				}
				if( type == '标准闪烁'){
					e.drill_ECE_playSustainingFlash(time,period);
				}
				if( type == '渐变闪烁'){
					e.drill_ECE_playSustainingFlashCos(time,period);
				}
				if( type == '顺时针旋转'  ){
					e.drill_ECE_playSustainingRotate(time,period,1);
				}
				if( type == '逆时针旋转'  ){
					e.drill_ECE_playSustainingRotate(time,period,-1);
				}
				if( type == '垂直卡片旋转'  ){
					e.drill_ECE_playSustainingRotateVer(time,period);
				}
				if( type == '水平卡片旋转'  ){
					e.drill_ECE_playSustainingRotateHor(time,period);
				}
			}
		}
		if(args.length >= 6){
			var temp1 = String(args[1]);
			var temp2 = Number(args[3]);
			var type = String(args[5]);
			if(args[7]){ var time = String(args[7]); }
			if(args[9]){ var period = Number(args[9]); }
			
			if(time == '无限时间'){
				time = 60*60*60*24*100;
			}else{
				time = Number(time);
			}
			if( temp1 == '指定事件' ){ 
				if( $gameMap.drill_ECE_isEventExist( temp2 ) == false ){ return; }
				var e = $gameMap.event( temp2 );
				if( e.opacity() == 0){
					return;
				}
				if( type == '终止持续效果' ){
					e.drill_ECE_stopEffect();
				}
				if( type == '标准闪烁' ){
					e.drill_ECE_playSustainingFlash(time,period);
				}
				if( type == '渐变闪烁' ){
					e.drill_ECE_playSustainingFlashCos(time,period);
				}
				if( type == '顺时针旋转' ){
					e.drill_ECE_playSustainingRotate(time,period,1);
				}
				if( type == '逆时针旋转' ){
					e.drill_ECE_playSustainingRotate(time,period,-1);
				}
				if( type == '垂直卡片旋转' ){
					e.drill_ECE_playSustainingRotateVer(time,period);
				}
				if( type == '水平卡片旋转' ){
					e.drill_ECE_playSustainingRotateHor(time,period);
				}
			}
			if( temp1 == '指定事件(变量)' ){ 
				var e_id = $gameVariables.value(temp2);
				if( $gameMap.drill_ECE_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				if( e.opacity() == 0){
					return;
				}
				if( type == '终止持续效果' ){
					e.drill_ECE_stopEffect();
				}
				if( type == '标准闪烁' ){
					e.drill_ECE_playSustainingFlash(time,period);
				}
				if( type == '渐变闪烁' ){
					e.drill_ECE_playSustainingFlashCos(time,period);
				}
				if( type == '顺时针旋转' ){
					e.drill_ECE_playSustainingRotate(time,period,1);
				}
				if( type == '逆时针旋转' ){
					e.drill_ECE_playSustainingRotate(time,period,-1);
				}
				if( type == '垂直卡片旋转' ){
					e.drill_ECE_playSustainingRotateVer(time,period);
				}
				if( type == '水平卡片旋转' ){
					e.drill_ECE_playSustainingRotateHor(time,period);
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ECE_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventContinuedEffect.js 行走图 - 持续动作效果】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_ECE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ECE_sys_initialize.call(this);
	
	//没有存储的内容
}

//=============================================================================
// * 事件注释初始化
//=============================================================================
//==============================
// * 注释初始化
//==============================
var _drill_ECE_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	_drill_ECE_initMembers.call(this);
	this._drill_ECE_isFirstBirth = true;
};
var _drill_ECE_event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_ECE_event_setupPage.call(this);
    this.drill_ECE_setupEffect();
};
Game_Event.prototype.drill_ECE_setupEffect = function() {	
	
	// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
	if( !this._erased && this.event() && this.event().pages[0] && this._drill_ECE_isFirstBirth ){ 
		this._drill_ECE_isFirstBirth = false;
		this.drill_ECE_readPage( this.event().pages[0].list );
	}
	
	// > 读取当前页注释
	if( !this._erased && this.page() ){ 
		this.drill_ECE_readPage( this.list() );
	}
	
}
//==============================
// * 读取注释
//==============================
Game_Event.prototype.drill_ECE_readPage = function( page_list ){
	page_list.forEach( function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			
			if (command == "=>持续动作"){
				var time = 60*60*60*24*100;
				if(args.length == 4){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					/*-----------------标准闪烁------------------*/
					if( type == "标准闪烁" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingFlash( time,Number(temp1) );
					}
					/*-----------------渐变闪烁------------------*/
					if( type == "渐变闪烁" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingFlashCos( time,Number(temp1) );
					}
					/*-----------------顺时针旋转------------------*/
					if( type == "顺时针旋转" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingRotate( time,Number(temp1),1 );
					}
					/*-----------------逆时针旋转------------------*/
					if( type == "逆时针旋转" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingRotate( time,Number(temp1),-1 );
					}
					/*-----------------垂直卡片旋转------------------*/
					if( type == "垂直卡片旋转" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingRotateVer( time,Number(temp1) );
					}
					/*-----------------水平卡片旋转------------------*/
					if( type == "水平卡片旋转" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingRotateHor( time,Number(temp1) );
					}
					/*-----------------旋转状态------------------*/
					if( type == "旋转状态" ){
						temp1 = temp1.replace("旋转角度[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingRotateState( time, 1, Number(temp2) );
					}
					/*-----------------缩放状态------------------*/
					if( type == "缩放状态" ){
						temp1 = temp1.replace("缩放比例[","");
						temp1 = temp1.replace("]","");
						this.drill_ECE_playSustainingResizeState( time, 1, Number(temp2) );
					}
				}
				if(args.length == 6){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					/*-----------------上下震动------------------*/
					if( type == "上下震动" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("震动幅度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingShakeUD( time,Number(temp1),Number(temp2) );
					}
					/*-----------------左右震动------------------*/
					if( type == "左右震动" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("震动幅度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingShakeLR( time,Number(temp1),Number(temp2) );
					}
					/*-----------------左右摇晃------------------*/
					if( type == "左右摇晃" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("摇晃幅度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingShakeRotate( time,Number(temp1),Number(temp2) );
					}
					/*-----------------呼吸效果------------------*/
					if( type == "呼吸效果" ){
						temp1 = temp1.replace("周期[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("呼吸幅度[","");
						temp2 = temp2.replace("]","");
						this.drill_ECE_playSustainingBreathing( time,Number(temp1),Number(temp2) );
					}
				}
				if(args.length == 8){
					var type = String(args[1]);
					var temp1 = String(args[3]);
					var temp2 = String(args[5]);
					var temp3 = String(args[7]);
					/*-----------------空中飘浮------------------*/
					if( type == "空中飘浮" ){
						temp1 = temp1.replace("飘浮高度[","");
						temp1 = temp1.replace("]","");
						temp2 = temp2.replace("周期[","");
						temp2 = temp2.replace("]","");
						temp3 = temp3.replace("幅度[","");
						temp3 = temp3.replace("]","");
						this.drill_ECE_playSustainingFloating( time, 1, Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}
			
			/*-----------------旧指令------------------*/
			if (command == "=>事件持续效果"){
				var type = String(args[1]);
				var temp1 = Number(args[3]);
				var time = 60*60*60*24*100;
				if( type == "标准闪烁" ){
					this.drill_ECE_playSustainingFlash(time,temp1);
				}
				if( type == "渐变闪烁" ){
					this.drill_ECE_playSustainingFlashCos(time,temp1);
				}
				if( type == "顺时针旋转" ){
					this.drill_ECE_playSustainingRotate(time,temp1,1);
				}
				if( type == "逆时针旋转" ){
					this.drill_ECE_playSustainingRotate(time,temp1,-1);
				}
				if( type == "垂直卡片旋转" ){
					this.drill_ECE_playSustainingRotateVer(time,temp1);
				}
				if( type == "水平卡片旋转" ){
					this.drill_ECE_playSustainingRotateHor(time,temp1);
				}
			};
		};
	}, this);
};

//=============================================================================
// ** 跟随者
//=============================================================================
//==============================
// * 跟随者 - 透明度同步
//==============================
var _drill_ECE_setOpacity = Game_Follower.prototype.setOpacity;
Game_Follower.prototype.setOpacity = function(opacity) {
	if( $gamePlayer.drill_ECE_isPlaying() ){ return; }
	if( this.drill_ECE_isPlaying() ){ return; }
	_drill_ECE_setOpacity.call(this,opacity);
};

//=============================================================================
// ** 事件贴图
//=============================================================================
//==============================
// * 事件贴图 - 初始化
//==============================
var _Drill_ECE_s_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {
	_Drill_ECE_s_setCharacter.call(this,character);
	if (character) { this._Drill_ECE = character._Drill_ECE; };
};

//==============================
// * 事件贴图 - 固定帧初始值
//==============================
var _Drill_ECE_s_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	_Drill_ECE_s_updatePosition.call(this);				// x、y、z
	if( this.rotation != 0 ){ this.rotation = 0; }		// 旋转
	if( this.scale.x != 1 ){ this.scale.x = 1; }		// 缩放x
	if( this.scale.y != 1 ){ this.scale.y = 1; }		// 缩放y
	if( this.skew.x != 0 ){ this.skew.x = 0; }			// 斜切x
	if( this.skew.y != 0 ){ this.skew.y = 0; }			// 斜切y
};

//==============================
// * 事件贴图 - 帧刷新
//==============================
var _Drill_ECE_s_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	_Drill_ECE_s_update.call(this);
	if ( this._character && this._Drill_ECE ) {
		this.drill_ECE_updateEffect();			//执行变换
		this.drill_ECE_updateBitmap();			//获取图片宽高
	};
};
//==============================
// * 帧刷新 - 执行变换
//==============================
Sprite_Character.prototype.drill_ECE_updateEffect = function() {
	if( !this._character.drill_ECE_isPlaying() ){ return; }
	
	this.x += this._Drill_ECE.x ;					// x
	this.y += this._Drill_ECE.y ;					// y
	this.rotation += this._Drill_ECE.rotation;		// 旋转
	this.scale.x += this._Drill_ECE.scale_x;		// 缩放x
	this.scale.y += this._Drill_ECE.scale_y;		// 缩放y
	//this.skew.x += this._Drill_ECE.skew_x;		// 斜切x
	//this.skew.y += this._Drill_ECE.skew_y;		// 斜切y
	
	if( this._Drill_ECE.opacity != -1 ){
		this.opacity = this._Drill_ECE.opacity;		// 透明度
	}
}
//==============================
// * 帧刷新 - 获取图片宽高
//==============================
Sprite_Character.prototype.drill_ECE_updateBitmap = function() {
	if( this.bitmap && this.bitmap.isReady() ){
		this._Drill_ECE.real_width = this.patternWidth();
		this._Drill_ECE.real_height = this.patternHeight();
	}
}

//=============================================================================
// * 数学 - 锁定锚点
//			
//			说明：修正 旋转+缩放 的xy坐标，使其看起来像是在绕着 新的锚点 变换。
//=============================================================================
Game_Temp.prototype.drill_ECE_getFixPointInAnchor = function( 
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
// ** 物体
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _Drill_ECE_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_Drill_ECE_c_initialize.call(this);
	this._Drill_ECE = {};					//（不要用initMembers，follower没有这个方法）
	this._Drill_ECE.x = 0;					// x
	this._Drill_ECE.y = 0;					// y
	this._Drill_ECE.rotation = 0;			// 旋转
	this._Drill_ECE.scale_x = 0;			// 缩放x
	this._Drill_ECE.scale_y = 0;			// 缩放y
	this._Drill_ECE.skew_x = 0;				// 斜切x
	this._Drill_ECE.skew_y = 0;				// 斜切y
	
	this._Drill_ECE.opacity = -1;			// 透明度（不叠加）
	this._Drill_ECE.playing_type = "";		// 显示类型
	this._Drill_ECE.real_width = -1;		// 贴图宽
	this._Drill_ECE.real_height = -1;		// 贴图高
}
//==============================
// * 物体 - 动作判定
//==============================
Game_Character.prototype.drill_ECE_isPlaying = function() {
	if( !this._Drill_ECE ){ return false; }
	if( this._Drill_ECE.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 帧刷新
//==============================
var _Drill_ECE_c_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
	_Drill_ECE_c_update.call(this);
	
	if( this._Drill_ECE == undefined ){ return; } 
	if( this._Drill_ECE.playing_type == "" ){ return; }
	if( this._Drill_ECE.real_width == -1 ){ return; }		//需要等图片加载完成
	if( this._Drill_ECE.real_height == -1 ){ return; }
	
	this.drill_ECE_updateSustainingFlash();
	this.drill_ECE_updateSustainingFlashCos();
	this.drill_ECE_updateSustainingRotate();
	this.drill_ECE_updateSustainingRotateVer();
	this.drill_ECE_updateSustainingRotateHor();
	this.drill_ECE_updateSustainingShakeUD();
	this.drill_ECE_updateSustainingShakeLR();
	this.drill_ECE_updateSustainingShakeRotate();
	this.drill_ECE_updateSustainingBreathing();
	this.drill_ECE_updateSustainingFloating();
	this.drill_ECE_updateSustainingRotateState();
	this.drill_ECE_updateSustainingResizeState();
}
//==============================
// * 初始化 - 终止效果
//==============================
Game_Character.prototype.drill_ECE_stopEffect = function() {
	var ef = this._Drill_ECE;
	ef.x = 0;					// x
	ef.y = 0;					// y
	ef.rotation = 0;			// 旋转
	ef.scale_x = 0;				// 缩放x
	ef.scale_y = 0;				// 缩放y
	ef.skew_x = 0;				// 斜切x
	ef.skew_y = 0;				// 斜切y
	ef.playing_type = "";
	if( ef.opacity != -1 ){ this.setOpacity(255); }		//透明度
	ef.opacity = -1 ;
}


//==============================
// * 初始化 - 持续 标准闪烁
//==============================
Game_Character.prototype.drill_ECE_playSustainingFlash = function(time,period) {
	var ef = this._Drill_ECE;
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
Game_Character.prototype.drill_ECE_updateSustainingFlash = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingFlash" ){ return; }
	
	if( ef.fA_time < ef.fA_dest ){
		ef.fA_time ++;
		ef.opacity = 1 ;
		this.setOpacity(ef.opacity);
	}else if( ef.fB_time < ef.fB_dest ){
		ef.fB_time ++;
		ef.opacity = 255;
		this.setOpacity(ef.opacity);
	}
	ef.f_time ++;
	if( ef.f_time % ef.f_period == 0 ){
		ef.fA_time = 0;
		ef.fB_time = 0;
	}
	if( ef.f_time >= ef.f_dest ){
		this.drill_ECE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 渐变闪烁
//==============================
Game_Character.prototype.drill_ECE_playSustainingFlashCos = function(time,period) {
	var ef = this._Drill_ECE;
	ef.playing_type = "sustainingFlashCos";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
}
//==============================
// * 帧刷新 - 持续 渐变闪烁
//==============================
Game_Character.prototype.drill_ECE_updateSustainingFlashCos = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingFlashCos" ){ return; }
	
	ef.f_time ++;
	ef.opacity = 127 + 126*Math.cos( ( 360* ef.f_time/ef.f_period )/180*Math.PI );
	this.setOpacity(ef.opacity);
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_ECE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 顺时针/逆时针旋转
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotate = function(time,period,prop) {
	var ef = this._Drill_ECE;
	ef.playing_type = "sustainingRotate";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI * prop;
}
//==============================
// * 帧刷新 - 持续 顺时针/逆时针旋转
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotate = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingRotate" ){ return; }
	
	ef.f_time ++;
	ef.rotation += ef.f_speed;
	
	var fix_point = $gameTemp.drill_ECE_getFixPointInAnchor( 0.5,1.0, 0.5,0.5, ef.real_width,ef.real_height, ef.rotation, ef.scale_x, ef.scale_y );
	ef.x = fix_point.x;	
	ef.y = fix_point.y;	
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_ECE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 垂直卡片旋转
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotateVer = function(time,period) {
	var ef = this._Drill_ECE;
	ef.playing_type = "sustainingRotateVer";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 垂直卡片旋转
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotateVer = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingRotateVer" ){ return; }
		
	ef.f_time ++;
	ef.scale_x = -0.5 - 0.5 *Math.cos( ef.f_time*ef.f_speed + Math.PI );
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_ECE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 水平卡片旋转
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotateHor = function(time,period) {
	var ef = this._Drill_ECE;
	ef.playing_type = "sustainingRotateHor";
	ef.f_time = 0;
	ef.f_dest = time;
	ef.f_period = period;
	ef.f_speed = 360/period /180*Math.PI;
}
//==============================
// * 帧刷新 - 持续 水平卡片旋转
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotateHor = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingRotateHor" ){ return; }
	
	ef.f_time ++;
	ef.scale_y = -0.5 - 0.5*Math.cos( ef.f_time*ef.f_speed + Math.PI );
	
	ef.y = 0.5 * this._Drill_ECE.real_height * ef.scale_y;
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_ECE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 上下震动
//==============================
Game_Character.prototype.drill_ECE_playSustainingShakeUD = function( time,period,scope ) {
	var ef = this._Drill_ECE;
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
Game_Character.prototype.drill_ECE_updateSustainingShakeUD = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingShakeUD" ){ return; }
	
	ef.f_time ++;
	ef.y = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_ECE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 左右震动
//==============================
Game_Character.prototype.drill_ECE_playSustainingShakeLR = function( time,period,scope ) {
	var ef = this._Drill_ECE;
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
Game_Character.prototype.drill_ECE_updateSustainingShakeLR = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingShakeLR" ){ return; }
	
	ef.f_time ++;
	ef.x = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_ECE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 左右摇晃
//==============================
Game_Character.prototype.drill_ECE_playSustainingShakeRotate = function( time,period,scope ) {
	var ef = this._Drill_ECE;
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
Game_Character.prototype.drill_ECE_updateSustainingShakeRotate = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingShakeRotate" ){ return; }
	
	ef.f_time ++;
	ef.rotation = ef.f_scope * Math.sin( ef.f_time*ef.f_speed );
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_ECE_stopEffect();	//结束动作
	}
}

//==============================
// * 初始化 - 持续 呼吸效果
//==============================
Game_Character.prototype.drill_ECE_playSustainingBreathing = function( time,period,scope ) {
	var ef = this._Drill_ECE;
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
Game_Character.prototype.drill_ECE_updateSustainingBreathing = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingBreathing" ){ return; }
	
	ef.f_time ++;
	ef.scale_y = (ef.f_scope / ef.real_height) * Math.sin( ef.f_time*ef.f_speed );
	
	if( ef.f_time >= ef.f_dest ){
		this.drill_ECE_stopEffect();	//结束动作
	}
}


//==============================
// * 初始化 - 持续 空中飘浮
//==============================
Game_Character.prototype.drill_ECE_playSustainingFloating = function( time,b_time,height,period,scope ) {
	var ef = this._Drill_ECE;
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
Game_Character.prototype.drill_ECE_endSustainingFloating = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingFloating" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 空中飘浮
//==============================
Game_Character.prototype.drill_ECE_updateSustainingFloating = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingFloating" ){ return; }
	
	if( ef.fA_time < ef.fA_dest && ef.f_isEnd == false ){			//升起
		ef.fA_time ++;
		ef.y = ef.f_height * ef.fA_time / ef.fA_dest;
		ef.y *= -1;
		
	}else if( ef.fB_time < ef.fB_dest && ef.f_isEnd == false ){		//漂浮
		ef.fB_time ++;
		ef.y = ef.f_height + ef.fB_scope * Math.sin( ef.fB_time*ef.fB_speed );
		ef.y *= -1;
		
	}else if( ef.fC_time < ef.fC_dest ){	//降落
		ef.fC_time ++;
		ef.y = ef.f_height * (ef.fC_dest - ef.fC_time) / ef.fC_dest;
		ef.y *= -1;
		
	}else{
		this.drill_ECE_stopEffect();		//结束动作
	}
}


//==============================
// * 初始化 - 持续 旋转状态
//==============================
Game_Character.prototype.drill_ECE_playSustainingRotateState = function( time,b_time,scope ) {
	var ef = this._Drill_ECE;
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
Game_Character.prototype.drill_ECE_endSustainingRotateState = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingRotateState" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 旋转状态
//==============================
Game_Character.prototype.drill_ECE_updateSustainingRotateState = function() {
	var ef = this._Drill_ECE;
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
		this.drill_ECE_stopEffect();		//结束动作
	}
}


//==============================
// * 初始化 - 持续 缩放状态
//==============================
Game_Character.prototype.drill_ECE_playSustainingResizeState = function( time,b_time,scope ) {
	var ef = this._Drill_ECE;
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
Game_Character.prototype.drill_ECE_endSustainingResizeState = function() {
	var ef = this._Drill_ECE;
	if( ef.playing_type != "sustainingResizeState" ){ return; }
	
	ef.f_isEnd = true;
	ef.fC_time = ef.fC_dest - ef.fA_time;
}
//==============================
// * 帧刷新 - 持续 缩放状态
//==============================
Game_Character.prototype.drill_ECE_updateSustainingResizeState = function() {
	var ef = this._Drill_ECE;
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
		this.drill_ECE_stopEffect();		//结束动作
	}
}





