//=============================================================================
// Drill_PictureIcon.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        图片 - 图标图片
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
 *   (1.图标在游戏中即时生成，不需要图片资源。
 *   (2.插件的使用面比较窄，只能画固定图标给图片。
 *   (3.默认的图标大小为 32x32 。
 * 设计：
 *   (1.你可以将图标中的 药水、元素、矿石 快速转成图片作为可拖拽物。
 *      没必要专门去画一个图标作为图片来使用，通过该插件可以节省许多
 *      重复的资源配置。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过设置事件注释，将目标注释变成图标：
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
 * 测试方法：   在特效管理层，批量对10个图片，进行图标切换。
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
//		★性能测试因素	特效管理层
//		★性能测试消耗	未找到
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			图标图片：
//				->覆盖图片的bitmap
//				->物品、武器、护甲、技能 四大分类
//
//		★必要注意事项：
//			暂无。
//			
//		★其它说明细节：
//			暂无。
//
//		★存在的问题：
//			暂无。
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureIcon = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureIcon');
	
	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_PIc_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PIc_pluginCommand.call(this, command, args);
	if( command === ">图标图片" ){ 
		
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
					if( $gameScreen.drill_PIc_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			else if( pics == null && unit.indexOf("批量图片变量[") != -1 ){
				unit = unit.replace("批量图片变量[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_PIc_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			else if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PIc_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			else if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PIc_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
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
					var icon_i = Number(temp1);
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
					
				}else if( temp1.indexOf("图标变量[") != -1 ){
					temp1 = temp1.replace("图标变量[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_i = $gameVariables.value( Number(temp1) );
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
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
					var icon_i = 0;
					if( $dataItems[Number(temp1)] != null ){
						icon_i = $dataItems[Number(temp1)].iconIndex;
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
					
				}else if( temp1.indexOf("物品变量[") != -1 ||
						  temp1.indexOf("道具变量[") != -1 ){
					temp1 = temp1.replace("物品变量[","");
					temp1 = temp1.replace("道具变量[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_i = 0;
					if( $dataItems[ $gameVariables.value(Number(temp1)) ] != null ){
						icon_i = $dataItems[$gameVariables.value(Number(temp1))].iconIndex;
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
					
				}else if( temp1.indexOf("物品名[") != -1 ||
						  temp1.indexOf("道具名[") != -1 ){
					temp1 = temp1.replace("物品名[","");
					temp1 = temp1.replace("道具名[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_i = 0;
					for( var i = 0; i < $dataItems.length; i++ ){
						if( $dataItems[i] == null ){continue;}
						if( $dataItems[i].name == temp1 ){			//（根据名称搜索）
							icon_i = $dataItems[i].iconIndex;
							break;
						}
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
				}
			}
			
			if( type == "设置武器的图标" ){
				if( temp1.indexOf("武器[") != -1 ){
					temp1 = temp1.replace("武器[","");
					temp1 = temp1.replace("]","");
				
					// > 建立bitmap
					var icon_i = 0;
					if( $dataWeapons[Number(temp1)] != null ){
						icon_i = $dataWeapons[Number(temp1)].iconIndex;
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
					
				}else if( temp1.indexOf("武器变量[") != -1 ){
					temp1 = temp1.replace("武器变量[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_i = 0;
					if( $dataWeapons[ $gameVariables.value(Number(temp1)) ] != null ){
						icon_i = $dataWeapons[$gameVariables.value(Number(temp1))].iconIndex;
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
					
				}else if( temp1.indexOf("武器名[") != -1 ){
					temp1 = temp1.replace("武器名[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_i = 0;
					for( var i = 0; i < $dataWeapons.length; i++ ){
						if( $dataWeapons[i] == null ){continue;}
						if( $dataWeapons[i].name == temp1 ){			//（根据名称搜索）
							icon_i = $dataWeapons[i].iconIndex;
							break;
						}
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
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
					var icon_i = 0;
					if( $dataArmors[Number(temp1)] != null ){
						icon_i = $dataArmors[Number(temp1)].iconIndex;
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
					
				}else if( temp1.indexOf("护甲变量[") != -1 ||
						  temp1.indexOf("防具变量[") != -1 ){
					temp1 = temp1.replace("护甲变量[","");
					temp1 = temp1.replace("防具变量[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_i = 0;
					if( $dataArmors[ $gameVariables.value(Number(temp1)) ] != null ){
						icon_i = $dataArmors[$gameVariables.value(Number(temp1))].iconIndex;
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
					
				}else if( temp1.indexOf("护甲名[") != -1 ||
						  temp1.indexOf("防具名[") != -1 ){
					temp1 = temp1.replace("护甲名[","");
					temp1 = temp1.replace("防具名[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_i = 0;
					for( var i = 0; i < $dataArmors.length; i++ ){
						if( $dataArmors[i] == null ){continue;}
						if( $dataArmors[i].name == temp1 ){			//（根据名称搜索）
							icon_i = $dataArmors[i].iconIndex;
							break;
						}
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
				}
			}
			
			if( type == "设置技能的图标" ){
				if( temp1.indexOf("技能[") != -1 ){
					temp1 = temp1.replace("技能[","");
					temp1 = temp1.replace("]","");
				
					// > 建立bitmap
					var icon_i = 0;
					if( $dataSkills[Number(temp1)] != null ){
						icon_i = $dataSkills[Number(temp1)].iconIndex;
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
					
				}else if( temp1.indexOf("技能变量[") != -1 ){
					temp1 = temp1.replace("技能变量[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_i = 0;
					if( $dataSkills[ $gameVariables.value(Number(temp1)) ] != null ){
						icon_i = $dataSkills[$gameVariables.value(Number(temp1))].iconIndex;
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
					
				}else if( temp1.indexOf("技能名[") != -1 ){
					temp1 = temp1.replace("技能名[","");
					temp1 = temp1.replace("]","");
					
					// > 建立bitmap
					var icon_i = 0;
					for( var i = 0; i < $dataSkills.length; i++ ){
						if( $dataSkills[i] == null ){continue;}
						if( $dataSkills[i].name == temp1 ){			//（根据名称搜索）
							icon_i = $dataSkills[i].iconIndex;
							break;
						}
					}
					$gameTemp._drill_PIc_curId += 1;
					$gameTemp._drill_PIc_iconTank.push( ImageManager.drill_PIc_drawIconBitmap( icon_i, Number(temp2) ) );
					
					// > 绑定图标
					for( var i = 0; i < pics.length; i++ ){
						pics[i]._drill_PIc_iconId = $gameTemp._drill_PIc_curId;
					}
				}
			}
		}
		if( pics != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除图标" ){
				for( var i = 0; i < pics.length; i++ ){
					pics[i]._drill_PIc_iconId = -1;
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PIc_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureIcon.js 图片 - 图标图片】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};

//=============================================================================
// ** 临时变量
//=============================================================================
var _drill_PIc_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_PIc_temp_initialize.call(this);
	
	this._drill_PIc_curId = -1;
	this._drill_PIc_iconTank = [];
}

//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 图片数据 - 初始化基本信息
//==============================
var _drill_PIc_p_initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function() {
	_drill_PIc_p_initBasic.call(this);
	
	this._drill_PIc_iconId = -1;		//图标标记
}
//==============================
// * 图片贴图 - 初始化
//==============================
var _drill_PIc_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
	_drill_PIc_sp_initialize.call( this, pictureId );
	this._drill_PIc_p_id = -1;
}
//==============================
// * 图片贴图 - 绑定图标
//==============================
var _drill_PIc_sp_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_drill_PIc_sp_update.call(this);
    var picture = this.picture();
    if( picture ){
		
		// > 跳过赋值
		if( this._drill_PIc_p_id == picture._drill_PIc_iconId ){ return; }
		this._drill_PIc_p_id = picture._drill_PIc_iconId;
		
		// > 恢复图像
		if( this._drill_PIc_p_id == -1 ){
			this._pictureName = '';
			this.bitmap = null;
			
		// > 变为图标
		}else{
			var bitmap = $gameTemp._drill_PIc_iconTank[ this._drill_PIc_p_id ];
			if( bitmap == undefined ){ return; }
			this.bitmap = bitmap;
		}
		
	}else{
		
		// > 直接被断开 贴图数据 时，恢复图像
		if( this._drill_PIc_p_id != -1 ){
			this._drill_PIc_p_id = -1;
			this._pictureName = '';
			this.bitmap = null;
		}
	}
};

//==============================
// * 图片操作 - 显示图片（对应函数showPicture）
//==============================
var _drill_PIc_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function( name, origin, x, y, scaleX, scaleY, opacity, blendMode ){
	_drill_PIc_p_show.call( this, name, origin, x, y, scaleX, scaleY, opacity, blendMode );
	this._drill_PIc_iconId = -1;		//（标记解除）
}
//==============================
// * 图片操作 - 消除图片（对应函数erasePicture）
//==============================
var _drill_PIc_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PIc_p_erase.call( this );
	this._drill_PIc_iconId = -1;		//（标记解除）
}

//=============================================================================
// ** 创建bitmap对象
//=============================================================================
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


