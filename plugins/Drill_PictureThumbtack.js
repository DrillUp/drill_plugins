//=============================================================================
// Drill_PictureThumbtack.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        图片 - 图片图钉
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureThumbtack +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将 图片 与地图事件、战斗敌人、战斗角色等钉在一起。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片对象。
 * 细节：
 *   (1.图钉原理：只锁定图片xy坐标，不考虑缩放、旋转情况。
 *      每张图片只有一个图钉，并且只对指定的有效。
 *   (2.图钉的优先级高于 被拖拽、吸附槽 的偏移，
 *      设置图钉后，始终与图钉保持在同一位置。
 * 使用问题：
 *   (1.图片可以绑定到战斗敌人和战斗角色身上。
 *   (2.程序底层中，由于图片在 忙碌状态 时会停止帧刷新。
 *      因此施法时，所有图片的图钉可能会暂时无效。
 * 设计：
 *   (1.图片A通过图钉钉在图片B上后，图片B拖拽，图片A能被一并被拖拽。
 *      你可以分别设计卡背、卡面、花边，然后用图钉将它们钉在一起。
 *      也可以让玩家自定义一些装扮饰物，并将这些装饰物钉在角色立绘上。
 *      但是注意，图片B不能 旋转/缩放/斜切，因为图钉并不能同步变换。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来将图片绑定到图钉：
 * 
 * 插件指令：>图片图钉 : 图片[1] : 设置事件图钉 : 事件[1]
 * 插件指令：>图片图钉 : 图片变量[1] : 设置事件图钉 : 事件[1]
 * 插件指令：>图片图钉 : 批量图片[10,11] : 设置事件图钉 : 事件[1]
 * 插件指令：>图片图钉 : 批量图片变量[21,22] : 设置事件图钉 : 事件[1]
 * 
 * 插件指令：>图片图钉 : 图片[1] : 设置图片图钉 : 图片[2]
 * 插件指令：>图片图钉 : 图片[1] : 设置图片图钉 : 图片变量[21]
 * 插件指令：>图片图钉 : 图片[1] : 设置玩家图钉 : 玩家领队
 * 插件指令：>图片图钉 : 图片[1] : 设置玩家图钉 : 玩家队员[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置事件图钉 : 本事件
 * 插件指令：>图片图钉 : 图片[1] : 设置事件图钉 : 事件[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置事件图钉 : 事件变量[21]
 * 插件指令：>图片图钉 : 图片[1] : 设置战斗敌人图钉 : 战斗敌人[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置战斗敌人图钉 : 战斗敌人变量[21]
 * 插件指令：>图片图钉 : 图片[1] : 设置战斗角色图钉 : 战斗角色[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置战斗角色图钉 : 战斗角色变量[21]
 * 插件指令：>图片图钉 : 图片[1] : 设置鼠标图钉
 * 插件指令：>图片图钉 : 图片[1] : 去除图钉
 * 
 * 1.前半部分（图片[1]）和 后半部分（设置事件图钉 : 事件[1]）
 *   的参数可以随意组合。一共有4*13种组合方式。
 * 2."设置事件图钉"指将图钉钉在地图界面中的事件。
 *   "设置图片图钉"指将图钉钉在另一张图片上。
 *   "设置战斗敌人图钉"指将图钉钉在战斗界面中第N个敌人。
 *   "设置鼠标图钉"指将图钉钉在鼠标上。
 * 3."玩家队员[1]"表示领队后面第一个跟随的队友。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 图钉偏移坐标
 * 你需要通过下面插件指令来设置偏移坐标：
 * 
 * 插件指令：>图片图钉 : 图片[1] : 设置图钉偏移坐标 : 偏移[+100,-100]
 * 插件指令：>图片图钉 : 图片[1] : 设置图钉偏移坐标 : 偏移变量[25,26]
 * 
 * 1."设置图钉偏移坐标"指在图钉钉着的基础上，额外偏移的位置，单位像素。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   在图片管理层设置5张图片，分别钉在不同图片上。
 * 测试结果：   200个事件的地图中，平均消耗为：【11.36ms】
 *              100个事件的地图中，平均消耗为：【9.72ms】
 *               50个事件的地图中，平均消耗为：【6.83ms】
 * 测试结果2：  战斗界面中，平均消耗为：【9.51ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于该插件只控制指定图片的坐标信息，所以消耗并不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了 玩家和战斗角色 的绑定。
 * [v1.2]
 * 优化了与战斗活动镜头的变换关系。
 * [v1.3]
 * 添加了 鼠标图钉 的功能。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PTh（PictureThumbtack）
//		临时全局变量	无
//		临时局部变量	this._drill_PTh_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	9.72ms
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
//			->☆单位贴图
//			->☆战斗层级
//			
//			->☆图片的属性
//				->数据
//					->初始化 数据
//					->删除数据
//					->消除图片
//					->消除图片（command235）
//				->设置偏移位置
//				->绑定类型
//					> 图片
//					> 玩家队员
//					> 事件
//					> 战斗敌人
//					> 战斗角色
//					> 鼠标
//			->☆图钉控制
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
//		★必要注意事项：
//			1.只锁定图片xy坐标，不考虑缩放、旋转情况。
//			2.图钉绑定于指定场景的指定对象身上，该插件不需要考虑新场景的兼容函数，但可以考虑对新场景的功能支持。『图片与多场景』
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
	DrillUp.g_PTh_PluginTip_curName = "Drill_PictureThumbtack.js 图片-图片图钉";
	DrillUp.g_PTh_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_PTh_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_PTh_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PTh_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PTh_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureThumbtack = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureThumbtack');
	


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_PTh_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PTh_pluginCommand.call(this, command, args);
	if( command === ">图片图钉" ){ 
	
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
					if( $gameScreen.drill_PTh_isPictureExist( pic_id ) == false ){ continue; }
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
					if( $gameScreen.drill_PTh_isPictureExist( pic_id ) == false ){ continue; }
					var pic = $gameScreen.picture( pic_id );
					pics.push( pic );
				}
			}
			if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PTh_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PTh_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}

		
		/*-----------------去除图钉------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "去除图钉" ){
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PTh_removeData();
					}
				}
			}
		}
		/*-----------------设置图钉------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "设置鼠标图钉" ){
				if( pics != null){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PTh_bindMouse();
					}
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "设置图片图钉" ){
				if( temp1.indexOf("图片变量[") != -1 ){
					temp1 = temp1.replace("图片变量[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PTh_bindPic( $gameVariables.value(Number(temp1)) );
						}
					}
				}
				if( temp1.indexOf("图片[") != -1 ){
					temp1 = temp1.replace("图片[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PTh_bindPic( Number(temp1) );
						}
					}
				}
			}
			if( type == "设置事件图钉" ){
				if( temp1 == "本事件" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PTh_bindEvent( this._eventId );
						}
					}
				}
				if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						var e_id = $gameVariables.value(Number(temp1));
						if( $gameMap.drill_PTh_isEventExist( e_id ) == true ){
							for( var k=0; k < pics.length; k++ ){
								pics[k].drill_PTh_bindEvent( e_id );
							}
						}
					}
				}
				if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						var e_id = Number(temp1);
						if( $gameMap.drill_PTh_isEventExist( e_id ) == true ){
							for( var k=0; k < pics.length; k++ ){
								pics[k].drill_PTh_bindEvent( e_id );
							}
						}
					}
				}
			}
			if( type == "设置玩家图钉" ){
				if( temp1 == "玩家领队" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PTh_bindFollower( -2 );	//『玩家id』
						}
					}
				}else{
					temp1 = temp1.replace("玩家队员[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PTh_bindFollower( Number(temp1) );
						}
					}
				}
			}
			if( type == "设置战斗敌人图钉" ){
				if( temp1.indexOf("战斗敌人变量[") != -1 ){
					temp1 = temp1.replace("战斗敌人变量[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PTh_bindEnemy( $gameVariables.value(Number(temp1)) );
						}
					}
				}
				if( temp1.indexOf("战斗敌人[") != -1 ){
					temp1 = temp1.replace("战斗敌人[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PTh_bindEnemy( Number(temp1) );
						}
					}
				}
			}
			if( type == "设置战斗角色图钉" ){
				if( temp1.indexOf("战斗角色变量[") != -1 ){
					temp1 = temp1.replace("战斗角色变量[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PTh_bindActor( $gameVariables.value(Number(temp1)) );
						}
					}
				}
				if( temp1.indexOf("战斗角色[") != -1 ){
					temp1 = temp1.replace("战斗角色[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k].drill_PTh_bindActor( Number(temp1) );
						}
					}
				}
			}
		}
		
		/*-----------------图钉偏移坐标------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "设置图钉偏移坐标" ){
				if( temp1.indexOf("偏移变量[") != -1 ){
					temp1 = temp1.replace("偏移变量[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						if( pics != null ){
							for( var k=0; k < pics.length; k++ ){
								pics[k].drill_PTh_setOffsetPos(
									$gameVariables.value(Number(temp_arr[0])),
									$gameVariables.value(Number(temp_arr[1]))
								);
							}
						}
					}
				}else if( temp1.indexOf("偏移[") != -1 ){
					temp1 = temp1.replace("偏移[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						if( pics != null ){
							for( var k=0; k < pics.length; k++ ){
								pics[k].drill_PTh_setOffsetPos(
									Number(temp_arr[0]),
									Number(temp_arr[1])
								);
							}
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
Game_Screen.prototype.drill_PTh_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PTh_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_PTh_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_PTh_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】单位贴图 ☆单位贴图
//#############################################################################
//##############################
// * 单位贴图 - 获取 - 敌人容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组    （敌人贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_PTh_getEnemySpriteTank = function(){
	return this.drill_PTh_getEnemySpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据敌方索引【标准函数】
//				
//			参数：	> index 数字 （敌方第n个位置，从0开始计数）
//			返回：	> 贴图       （敌人贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_PTh_getEnemySpriteByIndex = function( index ){
	return this.drill_PTh_getEnemySpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据敌人ID【标准函数】
//				
//			参数：	> enemy_id 数字（敌人ID）
//			返回：	> 贴图数组     （敌人贴图数组）
//          
//			说明：	> 注意敌人可能有很多个，返回的是数组。
//##############################
Game_Temp.prototype.drill_PTh_getEnemySpriteByEnemyId = function( enemy_id ){
	return this.drill_PTh_getEnemySpriteByEnemyId_Private( enemy_id );
}
//##############################
// * 单位贴图 - 获取 - 角色容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组   （角色贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_PTh_getActorSpriteTank = function(){
	return this.drill_PTh_getActorSpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据我方索引【标准函数】
//				
//			参数：	> index 数字 （我方第n个位置，从0开始计数）
//			返回：	> 贴图       （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_PTh_getActorSpriteByIndex = function( index ){
	return this.drill_PTh_getActorSpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据角色ID【标准函数】
//				
//			参数：	> actor_id 数字（角色ID）
//			返回：	> sprite 贴图  （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_PTh_getActorSpriteByActorId = function( actor_id ){
	return this.drill_PTh_getActorSpriteByActorId_Private( actor_id );
}
//=============================================================================
// ** 单位贴图（接口实现）
//=============================================================================
//==============================
// * 单位贴图容器 - 获取 - 敌人容器指针（私有）
//==============================
Game_Temp.prototype.drill_PTh_getEnemySpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._enemySprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌方索引（私有）
//==============================
Game_Temp.prototype.drill_PTh_getEnemySpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_PTh_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.index() == index ){
			return enemy_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌人ID（私有）
//==============================
Game_Temp.prototype.drill_PTh_getEnemySpriteByEnemyId_Private = function( enemy_id ){
	var sprite_list = this.drill_PTh_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return []; }
	var result_list = [];
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.enemyId() == enemy_id ){
			result_list.push( enemy_sprite );
		}
	}
	return result_list;
};
//==============================
// * 单位贴图容器 - 获取 - 角色容器指针（私有）
//==============================
Game_Temp.prototype.drill_PTh_getActorSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._actorSprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据我方索引（私有）
//==============================
Game_Temp.prototype.drill_PTh_getActorSpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_PTh_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.index() == index ){
			return actor_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据角色ID（私有）
//==============================
Game_Temp.prototype.drill_PTh_getActorSpriteByActorId_Private = function( actor_id ){
	var sprite_list = this.drill_PTh_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.actorId() == actor_id ){
			return actor_sprite;
		}
	}
	return null;
};


//#############################################################################
// ** 【标准模块】战斗层级 ☆战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置）
//					> y 数字              （y位置）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Game_Picture.prototype.drill_PTh_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_PTh_layerCameraMoving_Private( x, y, layer, option );
}
//==============================
// * 战斗层级 - 层级与镜头的位移（私有）
//==============================
Game_Picture.prototype.drill_PTh_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 【战斗 - 活动战斗镜头】
	//	 （长期在图片层，不需要考虑在下层、上层情况）
	if( Imported.Drill_BattleCamera ){
		
		// > 镜头基点位置 
		var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
		xx += camera_pos.x;
		yy += camera_pos.y;
		
		// > 镜头变换位置
		var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_OuterSprite( xx, yy );
		xx = camera_pos.x;
		yy = camera_pos.y;
		
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}



//=============================================================================
// ** ☆图片的属性
//
//			说明：	> 此模块专门定义 图片的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片的属性 - 初始化
//==============================
var _drill_PTh_c_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	this._drill_PTh_data = undefined;			//（要放前面，不然会盖掉子类的设置）
	_drill_PTh_c_initialize.call(this);	
}
//==============================
// * 图片的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Picture.prototype.drill_PTh_checkData = function(){	
	if( this._drill_PTh_data != undefined ){ return; }
	this._drill_PTh_data = {};
	
	this._drill_PTh_data['offsetX'] = 0;			//偏移位置x
	this._drill_PTh_data['offsetY'] = 0;			//偏移位置y
	
	this._drill_PTh_data['type'] = "图片";		//绑定类型
	this._drill_PTh_data['pic_id'] = 0;			//绑定的图片
	this._drill_PTh_data['follower_id'] = 0;	//绑定的玩家队员
	this._drill_PTh_data['event_id'] = 0;		//绑定的事件
	this._drill_PTh_data['enemy_Index'] = 0;	//绑定的敌人
	this._drill_PTh_data['actor_Index'] = 0;	//绑定的角色
}
//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PTh_removeData = function(){
	this._drill_PTh_data = undefined;
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PTh_c_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function() {
	_drill_PTh_c_erase.call(this);
	this.drill_PTh_removeData();
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PTh_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PTh_removeData();
	}
	_drill_PTh_p_erasePicture.call( this, pictureId );
}

//==============================
// * 图片的属性 - 设置偏移位置
//==============================
Game_Picture.prototype.drill_PTh_setOffsetPos = function( offsetX, offsetY ){
	this.drill_PTh_checkData();
	this._drill_PTh_data['offsetX'] = offsetX;
	this._drill_PTh_data['offsetY'] = offsetY;
}
//==============================
// * 图片的属性 - 绑定 图片
//==============================
Game_Picture.prototype.drill_PTh_bindPic = function( pic_id ){
	this.drill_PTh_checkData();
	this._drill_PTh_data['type'] = "图片";
	this._drill_PTh_data['pic_id'] = pic_id;
}
//==============================
// * 图片的属性 - 绑定 玩家队员
//==============================
Game_Picture.prototype.drill_PTh_bindFollower = function( follower_id ){
	this.drill_PTh_checkData();
	this._drill_PTh_data['type'] = "玩家队员";
	this._drill_PTh_data['follower_id'] = follower_id;
}
//==============================
// * 图片的属性 - 绑定 事件
//==============================
Game_Picture.prototype.drill_PTh_bindEvent = function( event_id ){
	this.drill_PTh_checkData();
	this._drill_PTh_data['type'] = "事件";
	this._drill_PTh_data['event_id'] = event_id;
}
//==============================
// * 图片的属性 - 绑定 战斗敌人
//==============================
Game_Picture.prototype.drill_PTh_bindEnemy = function( enemy_Index ){
	this.drill_PTh_checkData();
	this._drill_PTh_data['type'] = "战斗敌人";
	this._drill_PTh_data['enemy_Index'] = enemy_Index;
}
//==============================
// * 图片的属性 - 绑定 战斗角色
//==============================
Game_Picture.prototype.drill_PTh_bindActor = function( actor_Index ){
	this.drill_PTh_checkData();
	this._drill_PTh_data['type'] = "战斗角色";
	this._drill_PTh_data['actor_Index'] = actor_Index;
}
//==============================
// * 图片的属性 - 绑定 鼠标
//==============================
Game_Picture.prototype.drill_PTh_bindMouse = function(){
	this.drill_PTh_checkData();
	this._drill_PTh_data['type'] = "鼠标";
}



//=============================================================================
// ** ☆图钉控制
//
//			说明：	> 此模块专门控制 图钉位置。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图钉控制 - 最后继承
//
//			说明：	> 图钉控制在最后才执行 帧刷新 ，这样能使得 图钉修改位置 的优先级最高。
//==============================
var _drill_PTh_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_PTh_scene_initialize.call(this);
	
	//==============================
	// * 图钉控制 - 帧刷新（这里刷新不是最后执行帧刷新）
	//==============================
	//var _drill_PTh_c_update = Game_Picture.prototype.update;
	//Game_Picture.prototype.update = function() {
	//	_drill_PTh_c_update.call(this);	
	//	
	//	if( this._drill_PTh_data == undefined ){ return; }
	//	this.drill_PTh_updatePicPos();			//帧刷新 - 位置 图片
	//	this.drill_PTh_updateFollowerPos();		//帧刷新 - 位置 玩家队员
	//	this.drill_PTh_updateEventPos();		//帧刷新 - 位置 事件
	//	this.drill_PTh_updateEnemyPos();		//帧刷新 - 位置 敌人
	//	this.drill_PTh_updateActorPos();		//帧刷新 - 位置 角色
	//	this.drill_PTh_updateMouse();			//帧刷新 - 位置 鼠标
	//}
	//==============================
	// * 图钉控制 - 帧刷新
	//==============================
	var _drill_PTh_c_update2 = Game_Screen.prototype.update;
	Game_Screen.prototype.update = function(){
		_drill_PTh_c_update2.call(this);
		
		// > 图片遍历『图片与多场景』
		var i_offset = 0;							//地图界面的图片
		var pic_length = this.maxPictures();
		if( $gameParty.inBattle() == true ){		//战斗界面的图片
			i_offset = pic_length;
		}
		for(var i = 0; i < pic_length; i++ ){
			var picture = this._pictures[ i + i_offset ];
			if( picture == undefined ){ continue; }
			
			if( picture._drill_PTh_data == undefined ){ continue; }
			picture.drill_PTh_updatePicPos();			//帧刷新 - 位置 图片
			picture.drill_PTh_updateFollowerPos();		//帧刷新 - 位置 玩家队员
			picture.drill_PTh_updateEventPos();			//帧刷新 - 位置 事件
			picture.drill_PTh_updateEnemyPos();			//帧刷新 - 位置 敌人
			picture.drill_PTh_updateActorPos();			//帧刷新 - 位置 角色
			picture.drill_PTh_updateMouse();			//帧刷新 - 位置 鼠标
		}
	}
}
//==============================
// * 图钉控制 - 帧刷新位置 图片
//==============================
Game_Picture.prototype.drill_PTh_updatePicPos = function() {
	var data = this._drill_PTh_data;
	if( data['type'] != "图片" ){ return; }
	
	var pic = $gameScreen.picture( data['pic_id'] );
	if( pic == undefined ){ return; }
	
	// > 【图片 - 图片优化核心】『图片数据最终变换值』
	var xx = pic.x();
	var yy = pic.y();
	if( Imported.Drill_CoreOfPicture == true ){
		xx = pic.drill_COPi_finalTransform_x();
		yy = pic.drill_COPi_finalTransform_y();
	}
	
	// > 偏移的位置
	xx += data['offsetX'];
	yy += data['offsetY'];
	
	this._x = xx;
	this._y = yy;
}
//==============================
// * 图钉控制 - 帧刷新位置 玩家队员
//==============================
Game_Picture.prototype.drill_PTh_updateFollowerPos = function() {
	var data = this._drill_PTh_data;
	if( data['type'] != "玩家队员" ){ return; }
	
	// > 无效队员
	if( data['follower_id'] == 0 ){ return; }
	
	// > 玩家
	if( data['follower_id'] == -2 ){	//『玩家id』
		var ev = $gamePlayer;
		if( ev == undefined ){ return; }
		
		var xx = ev.screenX();
		var yy = ev.screenY() - $gameMap.tileHeight();
		xx += data['offsetX'];	//（偏移的位置）
		yy += data['offsetY'];
		this._x = xx;
		this._y = yy;
		
		return;
	}
	
	// > 玩家队员
	var ev = $gamePlayer.followers()[ data['follower_id']-1 ];
	if( ev == undefined ){ return; }
	
	var xx = ev.screenX();
	var yy = ev.screenY() - $gameMap.tileHeight();
	xx += data['offsetX'];	//（偏移的位置）
	yy += data['offsetY'];
	this._x = xx;
	this._y = yy;
}
//==============================
// * 图钉控制 - 帧刷新位置 事件
//==============================
Game_Picture.prototype.drill_PTh_updateEventPos = function() {
	var data = this._drill_PTh_data;
	if( data['type'] != "事件" ){ return; }
	
	var ev = $gameMap.event( data['event_id'] );
	if( ev == undefined ){ return; }
	
	var xx = ev.screenX();
	var yy = ev.screenY() - $gameMap.tileHeight();
	xx += data['offsetX'];	//（偏移的位置）
	yy += data['offsetY'];
	
	this._x = xx;
	this._y = yy;
}
//==============================
// * 图钉控制 - 帧刷新位置 战斗敌人
//==============================
Game_Picture.prototype.drill_PTh_updateEnemyPos = function() {
	var data = this._drill_PTh_data;
	if( data['type'] != "战斗敌人" ){ return; }
	
	// > 获取战斗敌群信息
	var index = data['enemy_Index']-1;
	var enemy_sprite = $gameTemp.drill_PTh_getEnemySpriteByIndex( index );
	if( enemy_sprite == undefined ){ return; }
	
	//var xx = enemy_sprite._homeX + enemy_sprite._offsetX;
	//var yy = enemy_sprite._homeY + enemy_sprite._offsetY;
	var xx = enemy_sprite.x;
	var yy = enemy_sprite.y;
	xx += data['offsetX'];	//（偏移的位置）
	yy += data['offsetY'];
	
	// > 层级与镜头的位移
	var camera_pos = this.drill_PTh_layerCameraMoving( xx, yy, "图片层", {} );
	xx = camera_pos.x;
	yy = camera_pos.y;
	
	this._x = xx;
	this._y = yy;
}
//==============================
// * 图钉控制 - 帧刷新位置 战斗角色
//==============================
Game_Picture.prototype.drill_PTh_updateActorPos = function() {
	var data = this._drill_PTh_data;
	if( data['type'] != "战斗角色" ){ return; }
	
	// > 战斗角色贴图
	var index = data['actor_Index']-1;
	var actor_sprite = $gameTemp.drill_PTh_getActorSpriteByIndex( index );
	if( actor_sprite == undefined ){ return; }
	
	//var xx = actor_sprite._homeX + actor_sprite._offsetX;
	//var yy = actor_sprite._homeY + actor_sprite._offsetY;
	var xx = actor_sprite.x;
	var yy = actor_sprite.y;
	xx += data['offsetX'];	//（偏移的位置）
	yy += data['offsetY'];
	
	// > 层级与镜头的位移
	var camera_pos = this.drill_PTh_layerCameraMoving( xx, yy, "图片层", {} );
	xx = camera_pos.x;
	yy = camera_pos.y;
	
	this._x = xx;
	this._y = yy;
}
//==============================
// * 图钉控制 - 帧刷新位置 鼠标
//==============================
Game_Picture.prototype.drill_PTh_updateMouse = function() {
	var data = this._drill_PTh_data;
	if( data['type'] != "鼠标" ){ return; }
	
	var xx = _drill_mouse_x;
	var yy = _drill_mouse_y;
	xx += data['offsetX'];	//（偏移的位置）
	yy += data['offsetY'];
	this._x = xx;
	this._y = yy;
}
//==============================
// * 图钉控制 - 帧刷新位置 鼠标 - 鼠标通用函数
//==============================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义（该函数在许多插件都用到了）

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function( event ){			//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}

