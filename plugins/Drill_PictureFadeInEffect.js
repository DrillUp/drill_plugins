//=============================================================================
// Drill_PictureFadeInEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.7]        图片 - 显现动作效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureFadeInEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以播放图片显现出来的各种动作。
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
 *   (1.所有动作都是并行的，你需要手动设置总时间。
 *      并且需要 等待 时，加等待指令。
 *   (2.显现动作 同时只能播放一种。
 *      所有 显现动作 都可以与持续动作效果叠加，但不包括透明度的叠加。
 *      叠加效果要自己试，但叠加效果一般都不太好。
 *   (3.动作效果 与 动画序列 插件相互独立，可以叠加使用。
 * 指令：
 *   (1.显现动作固定为：从 完全透明 到 完全不透明 的过程。
 *      动作结束后，图片的透明度将变为255。
 *   (2.不同类型动作的参数和指令有较大区别。
 *      如果指令的参数名和参数数量不匹配，则动作不会被执行。
 * 透明度：
 *   (1.开启"透明度检查"后，如果图片的透明度为255，则动作会被阻止播放。
 *   (2.删除图片、修改图片都不会终止图片动作。
 *      必须手动执行插件指令来终止。
 * 设计：
 *   (1.该效果可以与 滤镜效果、方块粉碎效果 叠加。
 *      特别注意，图片的中心锚点是可以修改的，默认有左上(0,0)和中
 *      心(0.5,0.5)的设置。中心锚点会影响部分动作效果。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行显现动作：
 * 
 * 插件指令：>显现动作 : 图片[1] : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>显现动作 : 图片变量[21] : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>显现动作 : 批量图片[4,5] : 标准弹跳 : 总时间[60] : 高度[168]
 * 插件指令：>显现动作 : 批量图片变量[21,22] : 标准弹跳 : 总时间[60] : 高度[168]
 * 
 * 插件指令：>显现动作 : 图片[1] : 直接显现 : 总时间[60]
 * 插件指令：>显现动作 : 图片[1] : 移动显现 : 总时间[60] : 方向角度[90] : 移动距离[100]
 * 插件指令：>显现动作 : 图片[1] : 标准落下 : 总时间[60] : 缓冲时间[20] : 高度[168]
 * 插件指令：>显现动作 : 图片[1] : 标准弹跳 : 总时间[60] : 高度[100]
 * 插件指令：>显现动作 : 图片[1] : 横向冒出 : 总时间[60] : 横向比例[1.5]
 * 插件指令：>显现动作 : 图片[1] : 横向冒出(不透明) : 总时间[60] : 横向比例[1.5]
 * 插件指令：>显现动作 : 图片[1] : 纵向冒出 : 总时间[60] : 纵向比例[1.5]
 * 插件指令：>显现动作 : 图片[1] : 纵向冒出(不透明) : 总时间[60] : 纵向比例[1.5]
 * 插件指令：>显现动作 : 图片[1] : 放大出现 : 总时间[60] : 缓冲时间[20]
 * 插件指令：>显现动作 : 图片[1] : 放大出现(不透明) : 总时间[60] : 缓冲时间[20]
 * 插件指令：>显现动作 : 图片[1] : 弹性放大出现 : 总时间[60] : 比例溢出[0.2] : 中心锚点[0.5,1.0]
 * 插件指令：>显现动作 : 图片[1] : 弹性放大出现(不透明) : 总时间[60] : 比例溢出[0.2] : 中心锚点[0.5,1.0]
 * 插件指令：>显现动作 : 图片[1] : 顺时针螺旋显现 : 总时间[120] : 最大螺旋半径[165] : 螺旋一圈时间[40] : 透明度变化时间[30]
 * 插件指令：>显现动作 : 图片[1] : 逆时针螺旋显现 : 总时间[120] : 最大螺旋半径[165] : 螺旋一圈时间[40] : 透明度变化时间[30]
 * 插件指令：>显现动作 : 图片[1] : 立即终止动作
 * 
 * 1.前半部分（图片[1]）和 后半部分（标准落下 : 总时间[60] : 缓冲时间[20] : 高度[168]）
 *   的参数可以随意组合。一共有4*15种组合方式。
 * 2.参数中"总时间"、"周期"的单位是帧。1秒60帧。
 *   参数中"距离"、"高度"的单位是像素。
 * 3.部分类型的动作有 缓冲时间 的设置，该动作会被分为多个阶段。
 *   以"标准落下"为例，
 *   一阶段对应落下的动作，时长为 总时间 减 缓冲时间，
 *   二阶段位移落地后弹簧效果，时长为 缓冲时间。
 * 4.类型的更详细介绍，去看看 "7.行走图 > 关于动作效果.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 透明度检查
 * 你可以使用下面的插件指令。
 * 
 * 插件指令：>显现动作 : 图片 : 透明度检查 : 开启
 * 插件指令：>显现动作 : 图片 : 透明度检查 : 关闭
 * 
 * 1.插件指令直接作用于所有图片。
 * 2.如果已经透明度为255了，你不想让他再播放一次动画，
 *   则开启"透明度检查"即可。开启后会阻止 显现动作 多次播放。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取状态
 * 你可以单独获取图片的状态信息，并赋值给开关或字符串：
 * 
 * 插件指令：>显现动作 : 图片[1] : 是否正在播放 : 开关[21]
 * 插件指令：>显现动作 : 图片变量[21] : 是否正在播放 : 开关[21]
 * 
 * 插件指令：>显现动作 : 图片[1] : 是否正在播放 : 开关[21]
 * 插件指令：>显现动作 : 图片[1] : 获取正在播放的类型 : 字符串[21]
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
 * 测试方法：   动作效果管理层放置10个动作变化的图片，在不同的地图中测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件经过一轮大优化，相比旧插件，减少了大概一半的性能消耗。
 *   不用担心设置太多图片并播放动作会卡的问题了。
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
 * 添加了 直接显现、移动显现 功能。
 * [v1.5]
 * 优化了数学缩短锚点的计算公式。
 * [v1.6]
 * 优化了旧存档的识别与兼容。
 * [v1.7]
 * 优化了内部结构，减小存档时数据占用的空间。
 * 
 * 
 * 
 * @param 图片默认透明度检查
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。开启后，会在图片贴图透明度处于255时（已经显现时），阻止图片的显现动作。
 * @default false
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PFIE（Picture_Fade_In_Effect）
//		临时全局变量	DrillUp.g_PFIE_xxx
//		临时局部变量	this._drill_PFIE_xxx
//		存储数据变量	$gameSystem._drill_PFIE_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	动作效果管理层
//		★性能测试消耗	2025/4/30：
//							》没创建图片时，就没有消耗。
//							》0.1ms（drill_PFIE_updateBitmap）
//		★最坏情况		暂无
//		★备注			插件已将动作函数全都分离了。因此播放动作时，指定函数能被性能测试捕获到。
//						插件的播放数据没被创建时，捕获不到任何消耗。
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
//			
//			->☆图片贴图控制
//			->☆图片的属性
//			->☆显现动作
//				->搜索『显现动作』查看所有动作
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
	DrillUp.g_PFIE_PluginTip_curName = "Drill_PictureFadeInEffect.js 图片-显现动作效果";
	DrillUp.g_PFIE_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PFIE_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PFIE_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	//==============================
	// * 提示信息 - 报错 - 时间计算不正确
	//==============================
	DrillUp.drill_PFIE_getPluginTip_allTimeError = function( playing_type ){
		return "【" + DrillUp.g_PFIE_PluginTip_curName + "】\n动作效果\""+playing_type+"\"播放失败，其配置的时间参数总和大于 总时间的值。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_PFIE_getPluginTip_ParamIsNaN = function( param_name, check_tank ){
		var text = "【" + DrillUp.g_PFIE_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
		if( check_tank ){
			var keys = Object.keys( check_tank );
			for( var i=0; i < keys.length; i++ ){
				text += "\n" + keys[i] + "的值：" + check_tank[ keys[i] ] ;
			}
		}
		return text;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureFadeInEffect = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureFadeInEffect');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_PFIE_pic_opacityCheck = String(DrillUp.parameters['图片默认透明度检查'] || "false") === "true";
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PFIE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PFIE_pluginCommand.call(this, command, args);
	this.drill_PFIE_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PFIE_pluginCommand = function( command, args ){
	if( command === ">显现动作" ){ 
		
		/*-----------------透明度检查------------------*/
		if( args.length == 6 ){
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( unit == "图片" && temp1 == "透明度检查" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
					$gameSystem._drill_PFIE_opacityCheck_pic = true;
				}
				if( temp2 == "关闭" || temp2 == "禁用" ){
					$gameSystem._drill_PFIE_opacityCheck_pic = false;
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
					if( $gameScreen.drill_PFIE_isPictureExist( pic_id ) == false ){ continue; }
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
					if( $gameScreen.drill_PFIE_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PFIE_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PFIE_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
		// > 透明度检查
		if( pics != null && $gameSystem._drill_PFIE_opacityCheck_pic){
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
						pics[k].drill_PFIE_stopEffect();
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
						b = pics[k].drill_PFIE_isPlaying();
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
						str = pics[k].drill_PFIE_getPlayingType();
					}
					$gameStrings.setValue( temp1, str );
				}
			}
		}
		
		
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			/*-----------------直接显现------------------*/
			if( type == "直接显现" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingAppear( Number(temp1) );
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
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("高度[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingJump( Number(temp1),Number(temp2) );
					}
				}
			}
			/*-----------------横向冒出------------------*/
			if( type == "横向冒出" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("横向比例[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingHorizonFlat( Number(temp1),Number(temp2), false );
					}
				}
			}
			if( type == "横向冒出(不透明)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("横向比例[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingHorizonFlat( Number(temp1),Number(temp2), true );
					}
				}
			}
			/*-----------------纵向冒出------------------*/
			if( type == "纵向冒出" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("纵向比例[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingVerticalFlat( Number(temp1),Number(temp2), false );
					}
				}
			}
			if( type == "纵向冒出(不透明)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("纵向比例[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingVerticalFlat( Number(temp1),Number(temp2), true );
					}
				}
			}
			/*-----------------放大出现------------------*/
			if( type == "放大出现" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingEnlarge( Number(temp1),Number(temp2), false );
					}
				}
			}
			if( type == "放大出现(不透明)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				if( pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingEnlarge( Number(temp1),Number(temp2), true );
					}
				}
			}
		}
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			
			/*-----------------移动显现------------------*/
			if( type == "移动显现" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("方向角度[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("移动距离[","");
				temp3 = temp3.replace("]","");
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingMoveAppear( Number(temp1),Number(temp2),Number(temp3) );
					}
				}
			}
			/*-----------------标准落下------------------*/
			if( type == "标准落下" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("缓冲时间[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("高度[","");
				temp3 = temp3.replace("]","");
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingFall( Number(temp1),Number(temp3),Number(temp2) );
					}
				}
			}
			/*-----------------弹性放大出现------------------*/
			if( type == "弹性放大出现" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("比例溢出[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("中心锚点[","");
				temp3 = temp3.replace("]","");
				var temp_arr = temp3.split(/[,，]/);
				if( temp_arr.length >= 2 && pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingEnlargeSpring( Number(temp1),Number(temp2), Number(temp_arr[0]), Number(temp_arr[1]), false );
					}
				}
			}
			if( type == "弹性放大出现(不透明)" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("比例溢出[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("中心锚点[","");
				temp3 = temp3.replace("]","");
				var temp_arr = temp3.split(/[,，]/);
				if( temp_arr.length >= 2 && pics != null ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingEnlargeSpring( Number(temp1),Number(temp2), Number(temp_arr[0]), Number(temp_arr[1]), true );
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
			
			/*-----------------顺时针螺旋显现------------------*/
			if( type == "顺时针螺旋显现" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("最大螺旋半径[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("螺旋一圈时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("透明度变化时间[","");
				temp4 = temp4.replace("]","");
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingSpiralMove( Number(temp1), 1, Number(temp2),Number(temp3),Number(temp4) );
					}
				}
			}
			/*-----------------逆时针螺旋显现------------------*/
			if( type == "逆时针螺旋显现" ){
				temp1 = temp1.replace("总时间[","");
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("最大螺旋半径[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("螺旋一圈时间[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("透明度变化时间[","");
				temp4 = temp4.replace("]","");
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PFIE_playShowingSpiralMove( Number(temp1), -1, Number(temp2),Number(temp3),Number(temp4) );
					}
				}
			}
		}
		
	}
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PFIE_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PFIE_getPluginTip_PictureNotFind( pic_id ) );
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
	var _drill_STG_PFIE_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_PFIE_pluginCommand.call(this, command, args);
		this.drill_PFIE_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_PFIE_pluginCommand = Game_Interpreter.prototype.drill_PFIE_pluginCommand;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_PFIE_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PFIE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PFIE_sys_initialize.call(this);
	this.drill_PFIE_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_PFIE_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_PFIE_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_PFIE_saveEnabled == true ){	
		$gameSystem.drill_PFIE_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_PFIE_initSysData();
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
Game_System.prototype.drill_PFIE_initSysData = function() {
	this.drill_PFIE_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_PFIE_checkSysData = function() {
	this.drill_PFIE_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_PFIE_initSysData_Private = function() {
	
	this._drill_PFIE_opacityCheck_pic = DrillUp.g_PFIE_pic_opacityCheck;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_PFIE_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_PFIE_opacityCheck_pic == undefined ){
		this.drill_PFIE_initSysData();
	}
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
var _drill_PFIE_sp_update2 = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_drill_PFIE_sp_update2.call(this);
	if( this.picture() ){
		this.drill_PFIE_updateEffect();			//帧刷新 - 执行变换
		this.drill_PFIE_updateBitmap();			//帧刷新 - 获取资源宽高
	}
};
//==============================
// * 图片贴图控制 - 帧刷新 - 执行变换
//
//			说明：	> 此处直接作用于 贴图属性，并不影响 数据最终变换值 。
//==============================
Sprite_Picture.prototype.drill_PFIE_updateEffect = function() {
	if( this.picture().drill_PFIE_isPlaying() != true ){ return; }
		
	var sprite_data = this.picture()._drill_PFIE_spriteData;
												// 贴图 - 锚点X（不操作）
												// 贴图 - 锚点Y（不操作）
	this.x += sprite_data.x;					// 贴图 - 位置X
	this.y += sprite_data.y;					// 贴图 - 位置Y
	this.scale.x += sprite_data.scale_x;		// 贴图 - 缩放X
	this.scale.y += sprite_data.scale_y;		// 贴图 - 缩放Y
	this.opacity = sprite_data.opacity;			// 贴图 - 透明度
	//this.skew.x += sprite_data.skew_x;		// 贴图 - 斜切X
	//this.skew.y += sprite_data.skew_y;		// 贴图 - 斜切Y
	this.rotation += sprite_data.rotation;		// 贴图 - 旋转
}
//==============================
// * 图片贴图控制 - 帧刷新 - 获取资源宽高
//==============================
Sprite_Picture.prototype.drill_PFIE_updateBitmap = function() {
	if( this.bitmap && this.bitmap.isReady() &&
		this.picture()._drill_PFIE_spriteData != undefined ){
		this.picture()._drill_PFIE_spriteData.real_width = this.bitmap.width;
		this.picture()._drill_PFIE_spriteData.real_height = this.bitmap.height;
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
var _drill_PFIE_c_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	this._drill_PFIE_spriteData = undefined;
	this._drill_PFIE_param = undefined;
	_drill_PFIE_c_initialize.call(this);
}
//==============================
// * 图片的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Picture.prototype.drill_PFIE_checkData = function() {
	
	// > 贴图属性
	if( this._drill_PFIE_spriteData == undefined ){
		this._drill_PFIE_spriteData = {};
		
		if( this._origin == 0 ){
			this._drill_PFIE_spriteData.anchor_x = 0;	// 锚点X
			this._drill_PFIE_spriteData.anchor_y = 0;	// 锚点Y
		}else if( this._origin == 1 ){
			this._drill_PFIE_spriteData.anchor_x = 0.5;	// 锚点X
			this._drill_PFIE_spriteData.anchor_y = 0.5;	// 锚点Y
		}
		if( Imported.Drill_CoreOfPicture ){  //【图片 - 图片优化核心】
			this._drill_PFIE_spriteData.anchor_x = this._drill_anchorX;
			this._drill_PFIE_spriteData.anchor_y = this._drill_anchorY;
		}
		
		this._drill_PFIE_spriteData.x = 0;				// 位置X
		this._drill_PFIE_spriteData.y = 0;				// 位置Y
		this._drill_PFIE_spriteData.scale_x = 0;		// 缩放X
		this._drill_PFIE_spriteData.scale_y = 0;		// 缩放Y
		this._drill_PFIE_spriteData.opacity = 0;		// 透明度（不叠加）
		this._drill_PFIE_spriteData.skew_x = 0;			// 斜切X
		this._drill_PFIE_spriteData.skew_y = 0;			// 斜切Y
		this._drill_PFIE_spriteData.rotation = 0;		// 旋转
		
		this._drill_PFIE_spriteData.real_width = -1;	// 贴图宽
		this._drill_PFIE_spriteData.real_height = -1;	// 贴图高
	}
	
	// > 动作配置
	if( this._drill_PFIE_param == undefined ){
		this._drill_PFIE_param = {};
		this._drill_PFIE_param.playing_type = "";		// 显示类型
	}
}
//==============================
// * 图片的属性 - 帧刷新
//==============================
var _drill_PFIE_p_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_drill_PFIE_p_update.call(this);
	
	if( this._drill_PFIE_spriteData == undefined ){ return; } 		//需要等资源加载完成
	if( this._drill_PFIE_spriteData.real_width == -1 ){ return; }	//
	if( this._drill_PFIE_spriteData.real_height == -1 ){ return; }	//
	
	this.drill_PFIE_updateShowingAppear();			//帧刷新 - 直接显现
	this.drill_PFIE_updateShowingMoveAppear();		//帧刷新 - 移动显现
	this.drill_PFIE_updateShowingFall();			//帧刷新 - 标准落下
	this.drill_PFIE_updateShowingJump();			//帧刷新 - 标准弹跳
	this.drill_PFIE_updateShowingHorizonFlat();		//帧刷新 - 放大出现
	this.drill_PFIE_updateShowingVerticalFlat();	//帧刷新 - 横向冒出
	this.drill_PFIE_updateShowingEnlarge();			//帧刷新 - 纵向冒出
	this.drill_PFIE_updateShowingEnlargeSpring();	//帧刷新 - 弹性放大出现
	this.drill_PFIE_updateShowingSpiralMove();		//帧刷新 - 顺时针/逆时针螺旋显现
}
//==============================
// * 图片的属性 - 控制 - 显示图片
//==============================
var _drill_PFIE_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
	_drill_PFIE_p_show.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
	if( this._drill_PFIE_spriteData != undefined ){
		if( this._origin == 0 ){
			this._drill_PFIE_spriteData.anchor_x = 0;	// 锚点X
			this._drill_PFIE_spriteData.anchor_y = 0;	// 锚点Y
		}else if( this._origin == 1 ){
			this._drill_PFIE_spriteData.anchor_x = 0.5;	// 锚点X
			this._drill_PFIE_spriteData.anchor_y = 0.5;	// 锚点Y
		}
		if( Imported.Drill_CoreOfPicture ){  //【图片 - 图片优化核心】
			this._drill_PFIE_spriteData.anchor_x = this._drill_anchorX;
			this._drill_PFIE_spriteData.anchor_y = this._drill_anchorY;
		}
	}
}
//==============================
// * 图片的属性 - 控制 - 移动图片
//==============================
var _drill_PFIE_p_move = Game_Picture.prototype.move;
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration) {
	_drill_PFIE_p_move.call(this, origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
	if( this._drill_PFIE_spriteData != undefined ){
		if( this._origin == 0 ){
			this._drill_PFIE_spriteData.anchor_x = 0;	// 锚点X
			this._drill_PFIE_spriteData.anchor_y = 0;	// 锚点Y
		}else if( this._origin == 1 ){
			this._drill_PFIE_spriteData.anchor_x = 0.5;	// 锚点X
			this._drill_PFIE_spriteData.anchor_y = 0.5;	// 锚点Y
		}
		if( Imported.Drill_CoreOfPicture ){  //【图片 - 图片优化核心】
			this._drill_PFIE_spriteData.anchor_x = this._drill_anchorX;
			this._drill_PFIE_spriteData.anchor_y = this._drill_anchorY;
		}
	}
}

//==============================
// * 图片的属性 - 是否正在播放（开放函数）
//==============================
Game_Picture.prototype.drill_PFIE_isPlaying = function() {
	if( this._drill_PFIE_param == undefined ){ return false; }
	if( this._drill_PFIE_param.playing_type == "" ){ return false; }
	return true;
}
//==============================
// * 图片的属性 - 获取正在播放的类型（开放函数）
//==============================
Game_Picture.prototype.drill_PFIE_getPlayingType = function() {
	if( this._drill_PFIE_param == undefined ){ return ""; }
	return this._drill_PFIE_param.playing_type;
}
//==============================
// * 图片的属性 - 设置透明度（开放函数）
//==============================
Game_Picture.prototype.drill_PFIE_setOpacity = function( opacity ){
	if( isNaN(opacity) ){
		alert( DrillUp.drill_PFIE_getPluginTip_ParamIsNaN( "opacity" ) );
	}
	this._opacity = opacity;
}
//==============================
// * 图片的属性 - 立即终止动作（开放函数）
//==============================
Game_Picture.prototype.drill_PFIE_stopEffect = function() {
	this.drill_PFIE_setOpacity( 255 );
	this._drill_PFIE_spriteData = undefined;
	this._drill_PFIE_param = undefined;
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
Game_Temp.prototype.drill_PFIE_Math2D_getFixPointInAnchor = function( 
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
Game_Temp.prototype.drill_PFIE_Math2D_getParabolicThree = function( x1,y1,x2,y2,x3,y3 ){
	
	var b = ((x2*x2 - x3*x3)*(y1 - y2) - (x1*x1 - x2*x2)*(y2 - y3)) / ((x2*x2 - x3*x3)*(x1 - x2) - (x1*x1 - x2*x2)*(x2 - x3));
	var a = (y1 - y2 - b*(x1 - x2)) / (x1*x1 - x2*x2);
	var c = y1 - a*x1*x1 - b*x1;
	
	return { "a":a, "b":b, "c":c };
}



//=============================================================================
// ** ☆显现动作
//
//			说明：	> 此模块专门管理 显现动作 的设置。
//					> 不考虑转控制器结构，且不考虑自定义变换扩展，只硬编码的公式控制变换动画。
//					> 此模块的代码 在其他同类插件中一模一样，只要替换 类名和简称 即可。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 『显现动作』直接显现 - 初始化
//==============================
Game_Picture.prototype.drill_PFIE_playShowingAppear = function( allTime ){
	this.drill_PFIE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PFIE_param;
	p_data.playing_type = "直接显现";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『显现动作』直接显现 - 帧刷新
//==============================
Game_Picture.prototype.drill_PFIE_updateShowingAppear = function() {
	var p_data = this._drill_PFIE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "直接显现" ){ return; }
	var s_data = this._drill_PFIE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		s_data.opacity = 255 * p_data.fA_time/p_data.fA_dest;
		this.drill_PFIE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PFIE_stopEffect();
	}
};

//==============================
// * 『显现动作』移动显现 - 初始化
//==============================
Game_Picture.prototype.drill_PFIE_playShowingMoveAppear = function( allTime,angle,distance ){
	this.drill_PFIE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PFIE_param;
	p_data.playing_type = "移动显现";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_angle = angle;
	p_data.fA_distance = distance;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『显现动作』移动显现 - 帧刷新
//==============================
Game_Picture.prototype.drill_PFIE_updateShowingMoveAppear = function() {
	var p_data = this._drill_PFIE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "移动显现" ){ return; }
	var s_data = this._drill_PFIE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		var temp_d = p_data.fA_distance * (1 - p_data.fA_time/p_data.fA_dest);		//匀速移动
		s_data.x = temp_d * Math.cos( p_data.fA_angle *Math.PI/180 );
		s_data.y = temp_d * Math.sin( p_data.fA_angle *Math.PI/180 );
		s_data.opacity = 255 * p_data.fA_time/p_data.fA_dest;
		this.drill_PFIE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PFIE_stopEffect();
	}
};

//==============================
// * 『显现动作』标准落下 - 初始化
//==============================
Game_Picture.prototype.drill_PFIE_playShowingFall = function( allTime,height,bufferTime ){
	this.drill_PFIE_checkData();
	if( bufferTime == undefined ){ bufferTime = 20; }
	if( allTime < bufferTime ){
		alert( DrillUp.drill_PFIE_getPluginTip_allTimeError("标准落下") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PFIE_param;
	p_data.playing_type = "标准落下";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime -bufferTime;
	p_data.fA_distance = -1 * height;
	p_data.fA_a = 2*p_data.fA_distance/p_data.fA_dest/p_data.fA_dest;	//加速度公式
	p_data.fB_time = 0;
	p_data.fB_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『显现动作』标准落下 - 帧刷新
//==============================
Game_Picture.prototype.drill_PFIE_updateShowingFall = function() {
	var p_data = this._drill_PFIE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "标准落下" ){ return; }
	var s_data = this._drill_PFIE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		var t = p_data.fA_time;
		s_data.y = p_data.fA_distance - p_data.fA_a*t*t/2;	//加速下落
		if(s_data.y >0){ 
			s_data.y = 0;
		}
		s_data.opacity = 255 * p_data.fA_time /p_data.fA_dest * 3 ;
		this.drill_PFIE_setOpacity(s_data.opacity);
	}else if( p_data.fB_time < p_data.fB_dest ){
		p_data.fB_time ++;
		var t = p_data.fB_time;
		var a = 0.8 / p_data.fB_dest / p_data.fB_dest;	//固定压缩0.2比例
		var b = -1 * a * p_data.fB_dest;
		var c = 0;
		s_data.scale_x = -1*(a*p_data.fB_time*p_data.fB_time + b*p_data.fB_time + c);
		s_data.scale_y = -s_data.scale_x;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PFIE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
		
		s_data.opacity = 255;
		this.drill_PFIE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PFIE_stopEffect();
	}
};


//==============================
// * 『显现动作』标准弹跳 - 初始化
//==============================
Game_Picture.prototype.drill_PFIE_playShowingJump = function( allTime, height ){
	this.drill_PFIE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PFIE_param;
	p_data.playing_type = "标准弹跳";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_a = -4*height/allTime/allTime;	//抛物线公式 y = ax2 + bx +c
	p_data.fA_b = 4*height/allTime;	
	p_data.fA_c = 0;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
};
//==============================
// * 『显现动作』标准弹跳 - 帧刷新
//==============================
Game_Picture.prototype.drill_PFIE_updateShowingJump = function() {
	var p_data = this._drill_PFIE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "标准弹跳" ){ return; }
	var s_data = this._drill_PFIE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time <= p_data.fA_dest/2 ){		//通用一个公式，只是根据顶点值分成了两份
		p_data.fA_time ++;
		var t = p_data.fA_time;
		s_data.y = -1*(p_data.fA_a*t*t + p_data.fA_b*t + p_data.fA_c);
		s_data.opacity = 255 * p_data.fA_time /p_data.fA_dest*2 ;
		this.drill_PFIE_setOpacity(s_data.opacity);
	}else if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		var t = p_data.fA_time;
		s_data.y = -1*(p_data.fA_a*t*t + p_data.fA_b*t + p_data.fA_c);
		if(s_data.y >0){ s_data.y = 0; }
		s_data.opacity = 255 ;
		this.drill_PFIE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PFIE_stopEffect();
	}
};


//==============================
// * 『显现动作』放大出现 - 初始化
//==============================
Game_Picture.prototype.drill_PFIE_playShowingEnlarge = function( allTime, bufferTime, opacity_off ){
	this.drill_PFIE_checkData();
	if( bufferTime == undefined ){ bufferTime = 20; }
	if( allTime < bufferTime ){
		alert( DrillUp.drill_PFIE_getPluginTip_allTimeError("放大出现") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PFIE_param;
	p_data.playing_type = "放大出现";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime -bufferTime;
	p_data.fA_sa = 2/p_data.fA_dest/p_data.fA_dest/2;		//匀加速公式 scale = 1/2 * at2
	p_data.fA_sb = 0;
	p_data.fA_sc = 0;
	p_data.fA_ya = 20/p_data.fA_dest/p_data.fA_dest/2;		//抛物线公式 y = ax2 + bx +c
	p_data.fA_yb = 0;
	p_data.fA_yc = 0;
	p_data.fB_time = 0;
	p_data.fB_dest = bufferTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_opacityOff = opacity_off;
};
//==============================
// * 『显现动作』放大出现 - 帧刷新
//==============================
Game_Picture.prototype.drill_PFIE_updateShowingEnlarge = function() {
	var p_data = this._drill_PFIE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "放大出现" ){ return; }
	var s_data = this._drill_PFIE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		var t = p_data.fA_time;
		
		s_data.y = 20 -1*(p_data.fA_ya*t*t + p_data.fA_yb*t + p_data.fA_yc);	//抛物线
		s_data.scale_x = -1 + p_data.fA_sa*t*t + p_data.fA_sb*t + p_data.fA_sc;	//匀加速放大
		s_data.scale_y = s_data.scale_x;
		if( s_data.y > 0 ){ 
			s_data.y = 0;
			//alert(p_data.fA_time);	//验证加速度时间
		}
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PFIE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = s_data.y + fix_point.y;
		
		// > 透明度变化
		if( p_data.f_opacityOff == true ){
			s_data.opacity = 255
			this.drill_PFIE_setOpacity(255);
		}else{
			s_data.opacity = 255 * p_data.fA_time /p_data.fA_dest ;
			this.drill_PFIE_setOpacity(s_data.opacity);
		}
		
	}else if( p_data.fB_time < p_data.fB_dest ){
		p_data.fB_time ++;
		var t = p_data.fB_time;
		var a = 0.8 / p_data.fB_dest / p_data.fB_dest;	//固定压缩0.2比例
		var b = -1 * a * p_data.fB_dest;
		var c = 0;
		s_data.scale_x = -1*(a*p_data.fB_time*p_data.fB_time + b*p_data.fB_time + c);
		s_data.scale_y = s_data.scale_x;
		
		// > 透明度变化
		if( p_data.f_opacityOff == true ){
			s_data.opacity = 255
			this.drill_PFIE_setOpacity(255);
		}else{
			s_data.opacity = 255;
			this.drill_PFIE_setOpacity(s_data.opacity);
		}
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PFIE_stopEffect();
	}
};


//==============================
// * 『显现动作』横向冒出 - 初始化
//==============================
Game_Picture.prototype.drill_PFIE_playShowingHorizonFlat = function( allTime, scale_x, opacity_off ){
	this.drill_PFIE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PFIE_param;
	p_data.playing_type = "横向冒出";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_scale_x = scale_x - 1.0;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_opacityOff = opacity_off;
};
//==============================
// * 『显现动作』横向冒出 - 帧刷新
//==============================
Game_Picture.prototype.drill_PFIE_updateShowingHorizonFlat = function() {
	var p_data = this._drill_PFIE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "横向冒出" ){ return; }
	var s_data = this._drill_PFIE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		s_data.scale_x = p_data.fA_scale_x * (p_data.fA_dest - p_data.fA_time)/p_data.fA_dest ;
		s_data.scale_y = -1.0 * (p_data.fA_dest - p_data.fA_time)/p_data.fA_dest ;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PFIE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
		
		// > 透明度变化
		if( p_data.f_opacityOff == true ){
			s_data.opacity = 255
			this.drill_PFIE_setOpacity(255);
		}else{
			s_data.opacity = 255 * p_data.fA_time /p_data.fA_dest ;
			this.drill_PFIE_setOpacity(s_data.opacity);
		}
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PFIE_stopEffect();
	}
};

//==============================
// * 『显现动作』纵向冒出 - 初始化
//==============================
Game_Picture.prototype.drill_PFIE_playShowingVerticalFlat = function( allTime, scale_y, opacity_off ){
	this.drill_PFIE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PFIE_param;
	p_data.playing_type = "纵向冒出";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_scale_y = scale_y - 1.0;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_opacityOff = opacity_off;
};
//==============================
// * 『显现动作』纵向冒出 - 帧刷新
//==============================
Game_Picture.prototype.drill_PFIE_updateShowingVerticalFlat = function() {
	var p_data = this._drill_PFIE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "纵向冒出" ){ return; }
	var s_data = this._drill_PFIE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		
		s_data.scale_x = -1.0 * (p_data.fA_dest - p_data.fA_time)/p_data.fA_dest ;
		s_data.scale_y = p_data.fA_scale_y * (p_data.fA_dest - p_data.fA_time)/p_data.fA_dest ;
		
		// > 锚点(0.5,1.0)锁定
		var fix_point = $gameTemp.drill_PFIE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, 0.5,1.0, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
		
		// > 透明度变化
		if( p_data.f_opacityOff == true ){
			s_data.opacity = 255
			this.drill_PFIE_setOpacity(255);
		}else{
			s_data.opacity = 255 * p_data.fA_time /p_data.fA_dest ;
			this.drill_PFIE_setOpacity(s_data.opacity);
		}
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PFIE_stopEffect();
	}
};


//==============================
// * 『显现动作』弹性放大出现 - 初始化
//==============================
Game_Picture.prototype.drill_PFIE_playShowingEnlargeSpring = function( allTime, overflow_scale, anchor_x, anchor_y, opacity_off ){
	this.drill_PFIE_checkData();
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PFIE_param;
	p_data.playing_type = "弹性放大出现";
	p_data.fA_time = 0;	
	p_data.fA_dest = allTime;
	p_data.fA_anchor_x = anchor_x;
	p_data.fA_anchor_y = anchor_y;
	p_data.fA_abc = $gameTemp.drill_PFIE_Math2D_getParabolicThree( 0,-1, allTime*0.8,overflow_scale, allTime,0 );
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_opacityOff = opacity_off;
};
//==============================
// * 『显现动作』弹性放大出现 - 帧刷新
//==============================
Game_Picture.prototype.drill_PFIE_updateShowingEnlargeSpring = function() {
	var p_data = this._drill_PFIE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "弹性放大出现" ){ return; }
	var s_data = this._drill_PFIE_spriteData;
	if( s_data == undefined ){ return; }
	
	if( p_data.fA_time < p_data.fA_dest ){
		p_data.fA_time ++;
		var time = p_data.fA_time;
		
		var dt = p_data.fA_dest;		//计算 落脚点
		var a = 2 / dt / dt;			//（匀减速移动到目标值）
		var c_time = dt - time;
		var per_step = 0.5 * a * dt * dt - 0.5 * a * c_time * c_time ;
		
		//【不要用分段函数，分段函数必然有 锯齿感 和 不和谐感 】
		
		// > 落脚点分配缩放值（三点抛物线）
		s_data.scale_x = p_data.fA_abc['a']*time*time + p_data.fA_abc['b']*time + p_data.fA_abc['c'];
		s_data.scale_y = s_data.scale_x;
		
		// > 锚点锁定
		var fix_point = $gameTemp.drill_PFIE_Math2D_getFixPointInAnchor( s_data.anchor_x,s_data.anchor_y, p_data.fA_anchor_x, p_data.fA_anchor_y, s_data.real_width,s_data.real_height, s_data.rotation, s_data.scale_x+1, s_data.scale_y+1 );
		s_data.x = fix_point.x;
		s_data.y = fix_point.y;
		
		// > 透明度变化
		if( p_data.f_opacityOff == true ){
			s_data.opacity = 255
			this.drill_PFIE_setOpacity(255);
		}else{
			s_data.opacity = 255 * p_data.fA_time /p_data.fA_dest ;
			this.drill_PFIE_setOpacity(s_data.opacity);
		}
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PFIE_stopEffect();
	}
};


//==============================
// * 『显现动作』顺时针/逆时针螺旋显现 - 初始化
//==============================
Game_Picture.prototype.drill_PFIE_playShowingSpiralMove = function( allTime, numDirection, radius, spiralTime, showTime ){
	this.drill_PFIE_checkData();
	if( allTime < showTime ){
		alert( DrillUp.drill_PFIE_getPluginTip_allTimeError("顺时针/逆时针螺旋显现") );
		return;
	}
	allTime -= 2;		//『动作效果总时间的时差』
	
	var p_data = this._drill_PFIE_param;
	p_data.playing_type = "顺时针/逆时针螺旋显现";
	p_data.fA_time = 0;
	p_data.fA_dest = allTime;
	p_data.fA_period = spiralTime;
	p_data.fA_radius = radius;
	p_data.fA_showTime = showTime;
	
	p_data.fZ_time = 0;
	p_data.fZ_dest = allTime;
	
	p_data.f_numDirection = numDirection;
};
//==============================
// * 『显现动作』顺时针/逆时针螺旋显现 - 帧刷新
//==============================
Game_Picture.prototype.drill_PFIE_updateShowingSpiralMove = function() {
	var p_data = this._drill_PFIE_param;
	if( p_data == undefined ){ return; }
	if( p_data.playing_type != "顺时针/逆时针螺旋显现" ){ return; }
	var s_data = this._drill_PFIE_spriteData;
	if( s_data == undefined ){ return; }
	
	// > 圆周移动
	p_data.fA_time ++;
	var cur_radius = p_data.fA_radius *(p_data.fA_dest-p_data.fA_time)/p_data.fA_dest;
	var cur_rotation = 360*Math.PI/180 *p_data.fA_time/p_data.fA_period;
	cur_rotation *= p_data.f_numDirection;
	s_data.x = cur_radius*Math.cos(cur_rotation);
	s_data.y = cur_radius*Math.sin(cur_rotation);
	
	// > 透明度变化
	if( p_data.fA_time < p_data.fA_showTime ){
		s_data.opacity = 255 *p_data.fA_time/p_data.fA_showTime;
		this.drill_PFIE_setOpacity(s_data.opacity);
	}else{
		s_data.opacity = 255
		this.drill_PFIE_setOpacity(s_data.opacity);
	}
	
	// > 终止动作（立即）
	p_data.fZ_time ++;
	if( p_data.fZ_time >= p_data.fZ_dest ){
		this.drill_PFIE_stopEffect();
	}
};


