//=============================================================================
// Drill_PictureThumbtack.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        图片 - 图片图钉
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
 * 使得你可以将 图片 与地图事件、敌人或其他图片钉在一起。
 * ★★需要放在 图片类插件 尽可能靠后的位置★★
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
 *   (2.图钉在目标图片 被拖拽、吸附槽 偏移时，都能够保持在一起。
 * 使用问题：
 *   (1.图片可以绑定到战斗敌人和战斗角色身上。
 *   (2.由于程序底层的忙碌状态标记，使得施法时，所有图片的帧刷新会
 *      停止。比如，你给战斗角色绑定了五毛特效，在施法时特效会暂停。
 * 设计：
 *   (1.绑定图钉后，可以一并被拖拽。
 *      你可以分别设计卡背、卡面、花边，然后用图钉将它们钉在一起。
 *      也可以让玩家自定义一些装扮饰物，并将这些装饰物钉在角色立绘上。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来激活动画序列：
 * 
 * 插件指令：>图片图钉 : 图片[1] : 设置事件图钉 : 事件[1]
 * 插件指令：>图片图钉 : 图片变量[1] : 设置事件图钉 : 事件[1]
 * 插件指令：>图片图钉 : 批量图片[10,11] : 设置事件图钉 : 事件[1]
 * 插件指令：>图片图钉 : 批量图片变量[21,22] : 设置事件图钉 : 事件[1]
 * 
 * 插件指令：>图片图钉 : 图片[1] : 设置图片图钉 : 图片[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置图片图钉 : 图片变量[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置玩家图钉 : 玩家领队
 * 插件指令：>图片图钉 : 图片[1] : 设置玩家图钉 : 玩家队员[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置事件图钉 : 本事件
 * 插件指令：>图片图钉 : 图片[1] : 设置事件图钉 : 事件[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置事件图钉 : 事件变量[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置战斗敌人图钉 : 战斗敌人[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置战斗敌人图钉 : 战斗敌人变量[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置战斗角色图钉 : 战斗角色[1]
 * 插件指令：>图片图钉 : 图片[1] : 设置战斗角色图钉 : 战斗角色变量[1]
 * 插件指令：>图片图钉 : 图片[1] : 去除图钉
 * 
 * 插件指令：>图片图钉 : 图片[1] : 设置图钉偏移坐标 : 偏移[+100,-100]
 * 插件指令：>图片图钉 : 图片[1] : 设置图钉偏移坐标 : 偏移变量[25,26]
 * 
 * 1.前半部分（图片[1]）和 后半部分（设置事件图钉 : 事件[1]）
 *   的参数可以随意组合。一共有4*14种组合方式。
 * 2."设置事件图钉"指将图钉钉在地图界面中的事件。
 *   "设置图片图钉"指将图钉钉在另一张图片上。
 *   "设置战斗敌人图钉"指将图钉钉在战斗界面中第N个敌人。
 *   "设置图钉偏移坐标"指在图钉钉着的基础上，额外偏移的位置，单位像素。
 * 3."玩家队员[1]"表示领队后面第一个跟随的队友。
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
 * 测试方法：   在对话管理层设置5张图片，分别钉在不同图片上。
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
//		★性能测试因素	对话管理层
//		★性能测试消耗	9.72ms
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			图片图钉：
//				->事件图钉
//				->图片图钉
//				->战斗敌人图钉
//				->战斗角色图钉
//
//		★必要注意事项：
//			1.只锁定图片xy坐标，不考虑缩放、旋转情况。
//
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureThumbtack = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureThumbtack');
	


//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_PTh_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_PTh_pluginCommand.call(this, command, args);
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
						pics[k]._Drill_PTh_enabled = false;
					}
				}
			}
		}
		/*-----------------设置图钉------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( type == "设置图片图钉" ){
				if( temp1.indexOf("图片变量[") != -1 ){
					temp1 = temp1.replace("图片变量[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "图片";
							pics[k]._Drill_PTh_data['pic_id'] = $gameVariables.value(Number(temp1));
						}
					}
				}
				if( temp1.indexOf("图片[") != -1 ){
					temp1 = temp1.replace("图片[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "图片";
							pics[k]._Drill_PTh_data['pic_id'] = Number(temp1);
						}
					}
				}
			}
			if( type == "设置事件图钉" ){
				if( temp1 == "本事件" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "事件";
							pics[k]._Drill_PTh_data['event_id'] = this._eventId;
						}
					}
				}
				if( temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						var e_id = $gameVariables.value(Number(temp1));
						$gameMap.drill_PTh_isEventExist( e_id );
						for( var k=0; k < pics.length; k++ ){
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "事件";
							pics[k]._Drill_PTh_data['event_id'] = e_id;
						}
					}
				}
				if( temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						var e_id = Number(temp1);
						$gameMap.drill_PTh_isEventExist( e_id );
						for( var k=0; k < pics.length; k++ ){
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "事件";
							pics[k]._Drill_PTh_data['event_id'] = e_id;
						}
					}
				}
			}
			if( type == "设置玩家图钉" ){
				if( temp1 == "玩家领队" ){
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "玩家队员";
							pics[k]._Drill_PTh_data['follower_id'] = 0;
						}
					}
				}else{
					temp1 = temp1.replace("玩家队员[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "玩家队员";
							pics[k]._Drill_PTh_data['follower_id'] = Number(temp1);
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
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "战斗敌人";
							pics[k]._Drill_PTh_data['enemy_Index'] = $gameVariables.value(Number(temp1));
						}
					}
				}
				if( temp1.indexOf("战斗敌人[") != -1 ){
					temp1 = temp1.replace("战斗敌人[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "战斗敌人";
							pics[k]._Drill_PTh_data['enemy_Index'] = Number(temp1);
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
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "战斗角色";
							pics[k]._Drill_PTh_data['actor_Index'] = $gameVariables.value(Number(temp1));
						}
					}
				}
				if( temp1.indexOf("战斗角色[") != -1 ){
					temp1 = temp1.replace("战斗角色[","");
					temp1 = temp1.replace("]","");
					if( pics != null ){
						for( var k=0; k < pics.length; k++ ){
							pics[k]._Drill_PTh_enabled = true;
							pics[k]._Drill_PTh_data['type'] = "战斗角色";
							pics[k]._Drill_PTh_data['actor_Index'] = Number(temp1);
						}
					}
				}
			}
			if( type == "设置图钉偏移坐标" ){
				if( temp1.indexOf("偏移变量[") != -1 ){
					temp1 = temp1.replace("偏移变量[","");
					temp1 = temp1.replace("]","");
					var temp_arr = temp1.split(/[,，]/);
					if( temp_arr.length >= 2 ){
						if( pics != null ){
							for( var k=0; k < pics.length; k++ ){
								pics[k]._Drill_PTh_data['shiftX'] = $gameVariables.value(Number(temp_arr[0]));
								pics[k]._Drill_PTh_data['shiftY'] = $gameVariables.value(Number(temp_arr[1]));
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
								pics[k]._Drill_PTh_data['shiftX'] = Number(temp_arr[0]);
								pics[k]._Drill_PTh_data['shiftY'] = Number(temp_arr[1]);
							}
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
Game_Screen.prototype.drill_PTh_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureThumbtack.js 图片 - 图片图钉】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_PTh_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_PictureThumbtack.js 图片 - 图片图钉】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】单位贴图
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
// ** 【标准模块】战斗层级
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
// ** 图片
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _Drill_PTh_c_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_Drill_PTh_c_initialize.call(this);	
	
	this._Drill_PTh_enabled = false;			//开关
	this._Drill_PTh_data = {};					//图钉数据
	this._Drill_PTh_data['shiftX'] = 0;			//偏移位置x
	this._Drill_PTh_data['shiftY'] = 0;			//偏移位置y
	this._Drill_PTh_data['type'] = "图片";		//图片、事件、战斗敌人索引
	this._Drill_PTh_data['pic_id'] = 0;			//绑定的图片
	this._Drill_PTh_data['follower_id'] = 0;	//绑定的玩家队员
	this._Drill_PTh_data['event_id'] = 0;		//绑定的事件
	this._Drill_PTh_data['enemy_Index'] = 0;	//绑定的敌人
	this._Drill_PTh_data['actor_Index'] = 0;	//绑定的角色
}
//==============================
// * 图片 - 帧刷新
//==============================
var _Drill_PTh_c_update = Game_Picture.prototype.update;
Game_Picture.prototype.update = function() {
	_Drill_PTh_c_update.call(this);	
	if( this._Drill_PTh_enabled != true ){ return; }
	
	this.drill_PTh_updateFollowerPos();		//刷新玩家队员位置
	this.drill_PTh_updateEventPos();		//刷新事件位置
	this.drill_PTh_updateEnemyPos();		//刷新敌人位置
	this.drill_PTh_updateActorPos();		//刷新角色位置
	this.drill_PTh_updatePicPos();			//刷新图片位置
}
//==============================
// * 图片 - 销毁
//==============================
var _Drill_PTh_c_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function() {
	_Drill_PTh_c_erase.call(this);	
	
	this._Drill_PTh_enabled = false;	
}

//==============================
// * 帧刷新 - 刷新图片位置
//==============================
Game_Picture.prototype.drill_PTh_updatePicPos = function() {
	var data = this._Drill_PTh_data;
	if( data['type'] != "图片" ){ return; }
	
	var pic = $gameScreen.picture( data['pic_id'] );
	var xx = pic.x();
	var yy = pic.y();
	xx += data['shiftX'];	//（偏移的位置）
	yy += data['shiftY'];
	
	// > 【鼠标 - 可拖拽的图片】偏移
	if( Imported.Drill_MouseDragPicture == true ){
		xx += pic.drill_MDP_getDraggingXOffset();
		yy += pic.drill_MDP_getDraggingYOffset();
	}
	// > 【图片 - 图片吸附槽】偏移
	if( Imported.Drill_PictureAdsorptionSlot == true ){
		xx += pic.drill_PAS_getAdsorbXOffset();
		yy += pic.drill_PAS_getAdsorbYOffset();
	}
	
	this._x = xx;
	this._y = yy;
}
//==============================
// * 帧刷新 - 刷新玩家队员位置
//==============================
Game_Picture.prototype.drill_PTh_updateFollowerPos = function() {
	var data = this._Drill_PTh_data;
	if( data['type'] != "玩家队员" ){ return; }
	
	if( data['follower_id'] == 0 ){
		
		var ev = $gamePlayer;
		if( ev == undefined ){ return; }
		var xx = ev.screenX();
		var yy = ev.screenY();
		xx += data['shiftX'];	//（偏移的位置）
		yy += data['shiftY'] - 48;
	}else{
		
		var ev = $gamePlayer.followers()[ data['follower_id']-1 ];
		if( ev == undefined ){ return; }
		var xx = ev.screenX();
		var yy = ev.screenY();
		xx += data['shiftX'];	//（偏移的位置）
		yy += data['shiftY'] - 48;
	}
	
	this._x = xx;
	this._y = yy;
}
//==============================
// * 帧刷新 - 刷新事件位置
//==============================
Game_Picture.prototype.drill_PTh_updateEventPos = function() {
	var data = this._Drill_PTh_data;
	if( data['type'] != "事件" ){ return; }
	
	var ev = $gameMap.event( data['event_id'] );
	if( ev == undefined ){ return; }
	var xx = ev.screenX();
	var yy = ev.screenY();
	xx += data['shiftX'];	//（偏移的位置）
	yy += data['shiftY'] - 48;
	
	this._x = xx;
	this._y = yy;
}
//==============================
// * 帧刷新 - 刷新敌人位置
//==============================
Game_Picture.prototype.drill_PTh_updateEnemyPos = function() {
	var data = this._Drill_PTh_data;
	if( data['type'] != "战斗敌人" ){ return; }
	
	// > 获取战斗敌群信息
	var index = data['enemy_Index']-1;
	var enemy_sprite = $gameTemp.drill_PTh_getEnemySpriteByIndex( index );
	if( enemy_sprite == undefined ){ return; }
	//var xx = enemy_sprite._homeX + enemy_sprite._offsetX;
	//var yy = enemy_sprite._homeY + enemy_sprite._offsetY;
	var xx = enemy_sprite.x;
	var yy = enemy_sprite.y;
	xx += data['shiftX'];	//（偏移的位置）
	yy += data['shiftY'];
	
	// > 层级与镜头的位移
	var camera_pos = this.drill_PTh_layerCameraMoving( xx, yy, "图片层", {} );
	xx = camera_pos.x;
	yy = camera_pos.y;
	
	this._x = xx;
	this._y = yy;
}
//==============================
// * 帧刷新 - 刷新角色位置
//==============================
Game_Picture.prototype.drill_PTh_updateActorPos = function() {
	var data = this._Drill_PTh_data;
	if( data['type'] != "战斗角色" ){ return; }
	
	// > 战斗角色贴图
	var index = data['actor_Index']-1;
	var actor_sprite = $gameTemp.drill_PTh_getActorSpriteByIndex( index );
	if( actor_sprite == undefined ){ return; }
	//var xx = actor_sprite._homeX + actor_sprite._offsetX;
	//var yy = actor_sprite._homeY + actor_sprite._offsetY;
	var xx = actor_sprite.x;
	var yy = actor_sprite.y;
	xx += data['shiftX'];	//（偏移的位置）
	yy += data['shiftY'];
	
	// > 层级与镜头的位移
	var camera_pos = this.drill_PTh_layerCameraMoving( xx, yy, "图片层", {} );
	xx = camera_pos.x;
	yy = camera_pos.y;
	
	this._x = xx;
	this._y = yy;
}

