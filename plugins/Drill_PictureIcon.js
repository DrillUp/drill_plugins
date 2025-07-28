//=============================================================================
// Drill_PictureIcon.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        图片 - 图标图片
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureIcon +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将指定图片的资源 变成一个临时的图标模样。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只对图片有效。
 * 细节：
 *   (1.注意名词：物品/武器/护甲/技能
 *      护甲=防具，物品=道具，这两个名词是同一个意思，指令写防具、道具都有效。
 *      另外，没有下列名词：装备/装甲/装束 。
 * 图标：
 *   (1.图标在游戏中即时生成，不需要设置图片资源。
 *   (2.该插件只能画固定图标给图片，应用范围比较窄。
 *   (3.默认的图标大小为 32x32 。
 *      设置的像素缩放 与 图片本身的缩放功能 为乘积叠加。
 * 设计：
 *   (1.你可以将图标中的 药水、元素、矿石 快速转成图片作为可拖拽物。
 *      没必要专门去画一个图标作为图片来使用，通过该插件可以节省许多
 *      重复的资源配置。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过设置插件指令，将目标图片变成图标：
 * （注意，冒号左右都有一个空格）
 * 
 * 插件指令：>图标图片 : 图片[1] : 设置图标 : 图标[1] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片变量[21] : 设置图标 : 图标[1] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 批量图片[2,3] : 设置图标 : 图标[1] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 批量图片变量[21,22] : 设置图标 : 图标[1] : 像素缩放[1.0]
 * 
 * 插件指令：>图标图片 : 图片[1] : 设置图标 : 图标[1] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置图标 : 图标变量[21] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置物品的图标 : 物品[1] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置武器的图标 : 武器[1] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置护甲的图标 : 护甲[1] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置技能的图标 : 技能[1] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置物品的图标 : 物品变量[21] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置武器的图标 : 武器变量[21] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置护甲的图标 : 护甲变量[21] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置技能的图标 : 技能变量[21] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置物品的图标 : 物品名[南瓜] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置武器的图标 : 武器名[方片晶块] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置护甲的图标 : 护甲名[抗火戒] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 设置技能的图标 : 技能名[重击] : 像素缩放[1.0]
 * 插件指令：>图标图片 : 图片[1] : 去除图标
 * 
 * 1.前面部分（图片[1]）和后面设置（设置图标 : 图标[1] : 像素缩放[1.0]）可以随意组合。
 *   一共有4*15种组合方式。
 * 2."像素缩放"指在保留像素锯齿的情况下，进行缩放。
 *   由于图标很小，所以适合像素放大，
 *   注意放大比例要为1.5、2.0 这种0.5倍数的放大，非倍数的比例不好看。
 *   设置的像素缩放 与 图片本身的缩放功能 为乘积叠加。
 * 3."物品名[南瓜]"表示 图片 使用指定物品的图标。
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
 * 测试方法：   在图片管理层，批量对10个图片，进行图标切换。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 测试方法2：  在战斗界面中进行图标切换。
 * 测试结果2：  战斗界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于该插件为单次执行，画完图片就结束工作了，性能几乎可以忽略。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PIc（Picture_Icon）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n)
//		★性能测试因素	图片管理层
//		★性能测试消耗	2024/5/2：
//							》未找到，单次执行，消耗太小。
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
//				->物品、武器、护甲、技能 四大分类
//			->☆场景容器之图片贴图
//				>图片对象层 的图片贴图
//				>最顶层 的图片贴图
//				>图片层 的图片贴图
//
//			->☆图片的属性
//				->显示图片
//				->消除图片
//				->消除图片（command235）
//			->☆图片控制
//			->☆图标容器
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			16.图片 > 图片资源切换脚本说明.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			暂无
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
	DrillUp.g_PIc_PluginTip_curName = "Drill_PictureIcon.js 图片-图标图片";
	DrillUp.g_PIc_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PIc_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PIc_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureIcon = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureIcon');
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PIc_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PIc_pluginCommand.call(this, command, args);
	this.drill_PIc_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PIc_pluginCommand = function( command, args ){
	if( command === ">图标图片" ){ 
		
		/*-----------------对象组获取------------------*/
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
					if( $gameScreen.drill_PIc_isPictureExist( pic_id ) == false ){ continue; }
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
					if( $gameScreen.drill_PIc_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
					pic_ids.push( pic_id );
				}
			}
			else if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PIc_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
				pic_ids = [];
					pic_ids.push( pic_id );
			}
			else if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PIc_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
				pic_ids = [];
					pic_ids.push( pic_id );
			}
		}
		
		
		/*-----------------图标------------------*/
		if( pics != null && args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			temp2 = temp2.replace("像素缩放[","");
			temp2 = temp2.replace("]","");
			
			if( type == "设置图标" ){
				if( temp1.indexOf("图标[") != -1 ){
					temp1 = temp1.replace("图标[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = Number(temp1);
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
					
				}else if( temp1.indexOf("图标变量[") != -1 ){
					temp1 = temp1.replace("图标变量[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = $gameVariables.value( Number(temp1) );
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
				}
			}
			
			if( type == "设置物品的图标" || type == "设置道具的图标" ){
				if( temp1.indexOf("物品[") != -1 ||
					temp1.indexOf("道具[") != -1 ){
					temp1 = temp1.replace("物品[","");
					temp1 = temp1.replace("道具[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = 0;
					if( $dataItems[Number(temp1)] != null ){
						icon_index = $dataItems[Number(temp1)].iconIndex;
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
					
				}else if( temp1.indexOf("物品变量[") != -1 ||
						  temp1.indexOf("道具变量[") != -1 ){
					temp1 = temp1.replace("物品变量[","");
					temp1 = temp1.replace("道具变量[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = 0;
					if( $dataItems[ $gameVariables.value(Number(temp1)) ] != null ){
						icon_index = $dataItems[$gameVariables.value(Number(temp1))].iconIndex;
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
					
				}else if( temp1.indexOf("物品名[") != -1 ||
						  temp1.indexOf("道具名[") != -1 ){
					temp1 = temp1.replace("物品名[","");
					temp1 = temp1.replace("道具名[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = 0;
					for( var i = 0; i < $dataItems.length; i++ ){
						if( $dataItems[i] == null ){continue;}
						if( $dataItems[i].name == temp1 ){			//（根据名称搜索）
							icon_index = $dataItems[i].iconIndex;
							break;
						}
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
				}
			}
			
			if( type == "设置武器的图标" ){
				if( temp1.indexOf("武器[") != -1 ){
					temp1 = temp1.replace("武器[","");
					temp1 = temp1.replace("]","");
				
					// > 建立bitmap
					var icon_index = 0;
					if( $dataWeapons[Number(temp1)] != null ){
						icon_index = $dataWeapons[Number(temp1)].iconIndex;
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
					
				}else if( temp1.indexOf("武器变量[") != -1 ){
					temp1 = temp1.replace("武器变量[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = 0;
					if( $dataWeapons[ $gameVariables.value(Number(temp1)) ] != null ){
						icon_index = $dataWeapons[$gameVariables.value(Number(temp1))].iconIndex;
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
					
				}else if( temp1.indexOf("武器名[") != -1 ){
					temp1 = temp1.replace("武器名[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = 0;
					for( var i = 0; i < $dataWeapons.length; i++ ){
						if( $dataWeapons[i] == null ){continue;}
						if( $dataWeapons[i].name == temp1 ){			//（根据名称搜索）
							icon_index = $dataWeapons[i].iconIndex;
							break;
						}
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
				}
			}
			
			if( type == "设置护甲的图标" || type == "设置防具的图标" ){
				if( temp1.indexOf("护甲[") != -1 ||
					temp1.indexOf("防具[") != -1 ){
					temp1 = temp1.replace("护甲[","");
					temp1 = temp1.replace("防具[","");
					temp1 = temp1.replace("]","");
				
					// > 建立bitmap
					var icon_index = 0;
					if( $dataArmors[Number(temp1)] != null ){
						icon_index = $dataArmors[Number(temp1)].iconIndex;
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
					
				}else if( temp1.indexOf("护甲变量[") != -1 ||
						  temp1.indexOf("防具变量[") != -1 ){
					temp1 = temp1.replace("护甲变量[","");
					temp1 = temp1.replace("防具变量[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = 0;
					if( $dataArmors[ $gameVariables.value(Number(temp1)) ] != null ){
						icon_index = $dataArmors[$gameVariables.value(Number(temp1))].iconIndex;
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
					
				}else if( temp1.indexOf("护甲名[") != -1 ||
						  temp1.indexOf("防具名[") != -1 ){
					temp1 = temp1.replace("护甲名[","");
					temp1 = temp1.replace("防具名[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = 0;
					for( var i = 0; i < $dataArmors.length; i++ ){
						if( $dataArmors[i] == null ){continue;}
						if( $dataArmors[i].name == temp1 ){			//（根据名称搜索）
							icon_index = $dataArmors[i].iconIndex;
							break;
						}
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
				}
			}
			
			if( type == "设置技能的图标" ){
				if( temp1.indexOf("技能[") != -1 ){
					temp1 = temp1.replace("技能[","");
					temp1 = temp1.replace("]","");
				
					// > 建立bitmap
					var icon_index = 0;
					if( $dataSkills[Number(temp1)] != null ){
						icon_index = $dataSkills[Number(temp1)].iconIndex;
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
					
				}else if( temp1.indexOf("技能变量[") != -1 ){
					temp1 = temp1.replace("技能变量[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = 0;
					if( $dataSkills[ $gameVariables.value(Number(temp1)) ] != null ){
						icon_index = $dataSkills[$gameVariables.value(Number(temp1))].iconIndex;
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
					
				}else if( temp1.indexOf("技能名[") != -1 ){
					temp1 = temp1.replace("技能名[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_index = 0;
					for( var i = 0; i < $dataSkills.length; i++ ){
						if( $dataSkills[i] == null ){continue;}
						if( $dataSkills[i].name == temp1 ){			//（根据名称搜索）
							icon_index = $dataSkills[i].iconIndex;
							break;
						}
					}
					var iconBitmap_id = $gameTemp.drill_PIc_createIconBitmapByIconIndex( icon_index, Number(temp2) );
					for( var i = 0; i < pics.length; i++ ){
						
						// > 贴图赋值
						var picture_sprite = $gameTemp.drill_PIc_getPictureSpriteByPictureId( pic_ids[i] );
						if( picture_sprite == undefined ){ continue; }
						picture_sprite.drill_PIc_setBitmapIcon( iconBitmap_id );
						
						// > 数据赋值
						pics[i].drill_PIc_setDataIconId( iconBitmap_id );
					}
				}
			}
		}
		if( pics != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除图标" ){
				for( var i = 0; i < pics.length; i++ ){
					pics[i].drill_PIc_removeData();
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PIc_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PIc_getPluginTip_PictureNotFind( pic_id ) );
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
	var _drill_STG_PIc_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_PIc_pluginCommand.call(this, command, args);
		this.drill_PIc_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_PIc_pluginCommand = Game_Interpreter.prototype.drill_PIc_pluginCommand;
};


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
Game_Temp.prototype.drill_PIc_getAllPictureSprite = function(){
	return this.drill_PIc_getAllPictureSprite_Private();
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
Game_Temp.prototype.drill_PIc_getPictureSpriteTank = function(){
	return this.drill_PIc_getPictureSpriteTank_Private();
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
Game_Temp.prototype.drill_PIc_getPictureSpriteByPictureId = function( picture_id ){
	return this.drill_PIc_getPictureSpriteByPictureId_Private( picture_id );
}
//=============================================================================
// ** 场景容器之图片贴图（实现）
//=============================================================================
//==============================
// * 图片贴图容器 - 获取 - 容器（私有）
//==============================
Game_Temp.prototype.drill_PIc_getPictureSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	if( SceneManager._scene._spriteset._pictureContainer == undefined ){ return null; }
	return SceneManager._scene._spriteset._pictureContainer.children;
};
//==============================
// * 图片贴图容器 - 获取 - 最顶层容器（私有）
//==============================
Game_Temp.prototype.drill_PIc_getPictureSpriteTank_SenceTopArea = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._drill_SenceTopArea == undefined ){ return null; }
	return SceneManager._scene._drill_SenceTopArea.children;
};
//==============================
// * 图片贴图容器 - 获取 - 图片层容器（私有）
//==============================
Game_Temp.prototype.drill_PIc_getPictureSpriteTank_PicArea = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene instanceof Scene_Battle ){		//『图片与多场景-战斗界面』
		if( SceneManager._scene._spriteset == undefined ){ return null; }
		if( SceneManager._scene._spriteset._drill_battlePicArea == undefined ){ return null; }
		return SceneManager._scene._spriteset._drill_battlePicArea.children;
	}
	if( SceneManager._scene instanceof Scene_Map ){			//『图片与多场景-地图界面』
		if( SceneManager._scene._spriteset == undefined ){ return null; }
		if( SceneManager._scene._spriteset._drill_mapPicArea == undefined ){ return null; }
		return SceneManager._scene._spriteset._drill_mapPicArea.children;
	}
	return null;
};
//==============================
// * 图片贴图容器 - 获取 - 全部图片贴图（私有）
//==============================
Game_Temp.prototype.drill_PIc_getAllPictureSprite_Private = function(){
	var result_list = [];
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_PIc_getPictureSpriteTank_Private();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	
	// > 最顶层 的图片贴图
	var sprite_list = this.drill_PIc_getPictureSpriteTank_SenceTopArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	
	// > 图片层 的图片贴图
	var sprite_list = this.drill_PIc_getPictureSpriteTank_PicArea();
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
Game_Temp.prototype.drill_PIc_getPictureSpriteByPictureId_Private = function( picture_id ){
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_PIc_getPictureSpriteTank_Private();
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
	var sprite_list = this.drill_PIc_getPictureSpriteTank_SenceTopArea();
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
	var sprite_list = this.drill_PIc_getPictureSpriteTank_PicArea();
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
// ** ☆图片的属性
//
//			说明：	> 此模块专门定义 图片的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片的属性 - 初始化
//==============================
var _drill_PIc_p_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	this._drill_PIc_iconId = undefined;			//（要放前面，不然会盖掉子类的设置）
	_drill_PIc_p_initialize.call(this);
}
//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PIc_removeData = function(){
	this._drill_PIc_iconId = undefined;
}
//==============================
// * 图片的属性 - 设置图标ID
//==============================
Game_Picture.prototype.drill_PIc_setDataIconId = function( iconBitmap_id ){
	this._drill_PIc_iconId = iconBitmap_id;
}
//==============================
// * 图片的属性 - 显示图片（对应函数showPicture）
//==============================
var _drill_PIc_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function( name, origin, x, y, scaleX, scaleY, opacity, blendMode ){
	_drill_PIc_p_show.call( this, name, origin, x, y, scaleX, scaleY, opacity, blendMode );
	this.drill_PIc_removeData();			//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PIc_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PIc_p_erase.call( this );
	this.drill_PIc_removeData();			//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PIc_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PIc_removeData();		//（删除数据）
	}
	_drill_PIc_p_erasePicture.call( this, pictureId );
}


//=============================================================================
// ** ☆图片控制
//
//			说明：	> 此模块专门管理 图片 的图标变化。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片控制 - 贴图 初始化
//==============================
var _drill_PIc_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
	
	// > 初始化（要放前面，因为 图片贴图initialize中会执行一次update）
	this._drill_PIc_sp_lastIconId = undefined;		//（要放前面，不然会盖掉子类的设置）
	
	// > 原函数
	_drill_PIc_sp_initialize.call( this, pictureId );
}
//==============================
// * 图片控制 - 贴图 设置图标
//
//			说明：	> 由于一帧内 先刷新 图片的属性，后刷新 贴图的属性。
//					  所以修改图片的属性后，不能立即操作贴图bitmap。『图片bitmap切换慢一帧』
//					> 如果急用，外部函数需要考虑同时 数据赋值+贴图赋值。
//					  （一种急用的情况：设置图标 执行后，就立即执行粉碎效果。）
//==============================
Sprite_Picture.prototype.drill_PIc_setBitmapIcon = function( icon_id ){
	this._drill_PIc_sp_lastIconId = icon_id;		//（需要赋值，外部函数设置快照后，帧刷新中就不会重复设置了）
	var bitmap = $gameTemp.drill_PIc_getIconBitmapById( icon_id );
	if( bitmap == undefined ){ return; }
	this.bitmap = bitmap;
}
//==============================
// * 图片控制 - 贴图 去除图标
//==============================
Sprite_Picture.prototype.drill_PIc_removeBitmapIcon = function(){
	this._pictureName = '';
	this.bitmap = null;
}
//==============================
// * 图片控制 - 贴图 帧刷新
//==============================
var _drill_PIc_sp_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_drill_PIc_sp_update.call(this);
    var picture = this.picture();
    if( picture ){
		
		if( this._drill_PIc_sp_lastIconId == picture._drill_PIc_iconId ){ return; }
		this._drill_PIc_sp_lastIconId = picture._drill_PIc_iconId;
		
		// > 去除图标
		if( this._drill_PIc_sp_lastIconId == undefined ){
			this.drill_PIc_removeBitmapIcon();
			
		// > 设置图标
		}else{
			this.drill_PIc_setBitmapIcon( picture._drill_PIc_iconId );
		}
		
	// > 无数据时『图片数据根除时』
	}else{
		if( this._drill_PIc_sp_lastIconId != undefined ){
			this._drill_PIc_sp_lastIconId = undefined;
			this.drill_PIc_removeBitmapIcon();
		}
	}
};


//=============================================================================
// ** ☆图标容器
//
//			说明：	> 此模块专门管理 图标 的创建。
//					> 暂时不考虑销毁Bitmap情况，因为本身图标占内存就小。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图标容器 - 初始化 容器
//==============================
var _drill_PIc_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_PIc_temp_initialize.call(this);
	this._drill_PIc_curBitmapId = -1;			//图标 计数器
	this._drill_PIc_curBitmapTank = [];			//图标 贴图容器
}
//==============================
// * 图标容器 - 创建图标
//==============================
Game_Temp.prototype.drill_PIc_createIconBitmapByIconIndex = function( icon_index, icon_size ){
	
	// > 计数器+1
	this._drill_PIc_curBitmapId += 1;
	var iconBitmap_id = this._drill_PIc_curBitmapId;
	
	// > 创建图标Bitmap
	var bitmap = ImageManager.drill_PIc_drawIconBitmap( icon_index, icon_size );
	this._drill_PIc_curBitmapTank[ iconBitmap_id ] = bitmap;
	
	return iconBitmap_id;
}
//==============================
// * 图标容器 - 创建图标Bitmap
//==============================
ImageManager.drill_PIc_drawIconBitmap = function( icon_index, icon_size ){
	if( icon_size == undefined ){ icon_size = 1; }
	if( icon_index == 0 ){ return new Bitmap(); }
	
	var pw = Window_Base._iconWidth ;
	var ph = Window_Base._iconHeight ;
	var cur_bitmap = new Bitmap( pw*icon_size , ph*icon_size );
	var pbitmap = ImageManager.loadSystem('IconSet');
	var px = icon_index % 16 * pw ;
	var py = Math.floor(icon_index / 16) * ph;
	cur_bitmap._context.imageSmoothingEnabled = false;
	var icon_x = 0;
	var icon_y = 0;
	cur_bitmap.blt( pbitmap,  px, py, pw, ph,  icon_x,icon_y, pw*icon_size, ph*icon_size);
	cur_bitmap._context.imageSmoothingEnabled = true;
	
    return cur_bitmap;
};
//==============================
// * 图标容器 - 获取 图标
//==============================
Game_Temp.prototype.drill_PIc_getIconBitmapById = function( iconBitmap_id ){
	return this._drill_PIc_curBitmapTank[ iconBitmap_id ];
}


