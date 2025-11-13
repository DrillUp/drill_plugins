//=============================================================================
// Drill_PictureSnapShot.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        图片 - 临时屏幕快照
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureSnapShot +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以截取当前的屏幕快照，并赋值给图片贴图。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片对象。
 * 2.更多详细内容，去看看文档 "1.系统 > 大家族-屏幕快照.docx"。
 * 细节：
 *   (1.屏幕快照都是临时的，且只能作为临时贴图使用，无法保存到存档中。
 *   (2."保存到文件"插件指令，可以将当前屏幕截图保存到指定文件夹中。
 *      但注意只在PC端有效。
 * 设计：
 *   (1.你可以将 屏幕快照 和 图片滤镜 结合使用，制作出一闪的效果。
 *      在地图和战斗中都可以做，可以去 特效管理层示例 看看快照效果。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行截图：
 * 
 * 插件指令：>图片临时屏幕快照 : 临时快照 : 建立屏幕截图
 * 插件指令：>图片临时屏幕快照 : 图片[1] : 设为临时快照
 * 插件指令：>图片临时屏幕快照 : 图片变量[21] : 设为临时快照
 * 插件指令：>图片临时屏幕快照 : 批量图片[1,2] : 设为临时快照
 * 插件指令：>图片临时屏幕快照 : 批量图片变量[21,22] : 设为临时快照
 * 插件指令：>图片临时屏幕快照 : 图片[1] : 去除快照
 * 插件指令：>图片临时屏幕快照 : 图片变量[21] : 去除快照
 * 插件指令：>图片临时屏幕快照 : 批量图片[1,2] : 去除快照
 * 插件指令：>图片临时屏幕快照 : 批量图片变量[21,22] : 去除快照
 * 
 * 1.你需要先建立屏幕截图，再将临时快照赋值给 图片对象。
 * 2.注意，屏幕快照都是临时的，且只能作为临时贴图使用，无法保存到存档中。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 保存文件
 * 你可以通过下面插件指令来实现当前屏幕快照的保存：
 * 
 * 插件指令：>图片临时屏幕快照 : 临时快照 : 建立屏幕截图
 * 插件指令：>图片临时屏幕快照 : 临时快照 : 保存到文件
 * 插件指令：>图片临时屏幕快照 : 打开保存的文件路径
 * 
 * 1.注意，此插件指令只在PC端有效。
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
 * 时间复杂度： o(n^2)
 * 测试方法：   在特效管理层中，进行快照性能测试。
 * 测试结果：   战斗界面中，平均消耗为：【46.15ms】
 *              地图界面中，平均消耗为：【51.80ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.单次截图消耗并不大，但是注意，如果图片截屏指令反复执行，那么
 *   会造成比较多的消耗了。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 改进了静态快照的内部结构。
 * [v1.2]
 * 添加了保存快照文件的功能。
 * [v1.3]
 * 优化了内部结构。
 * 
 * 
 * 
 * @param 存储快照文件设置
 * @desc 使用插件指令"保存到文件"时，快照文件的设置。
 * @type struct<DrillFile>
 * @default {"文件夹路径":"save/游戏截图/","文件名":"截图","文件名是否包含日期":"true","文件名是否包含时分秒":"true","文件类型":"png","图像质量":"90"}
 * 
 */
/*~struct~DrillFile:
 * 
 * @param 文件夹路径
 * @desc 格式为"aaa/bbb/"，文件夹不存在时会自动创建，创建在游戏根目录下。
 * @default save/游戏截图/
 * 
 * @param 文件名
 * @desc 执行截图保存后的文件名。
 * @default 截图
 *
 * @param 文件名是否包含日期
 * @parent 文件名
 * @type boolean
 * @on 包含
 * @off 不包含
 * @desc true - 包含，false - 不包含
 * @default true
 *
 * @param 文件名是否包含时分秒
 * @parent 文件名
 * @type boolean
 * @on 包含
 * @off 不包含
 * @desc true - 包含，false - 不包含
 * @default true
 * 
 * @param 文件类型
 * @type select
 * @option png
 * @value png
 * @option jpg
 * @value jpg
 * @desc 存储的文件类型。
 * @default png
 * 
 * @param 图像质量
 * @parent 文件类型
 * @type number
 * @min 1
 * @max 100
 * @desc 文件类型为jpg时有效，可设置1-100的图像质量设置。（png是固定100的图像质量）
 * @default 90
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PSS（Picture_Snap_Shot）
//		临时全局变量	DrillUp.g_PSS_xxx
//		临时局部变量	this._drill_PSS_xxx
//		存储数据变量	$gameSystem._drill_PSS_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		单次执行
//		★时间复杂度		o(n^2)
//		★性能测试因素	特效管理层
//		★性能测试消耗	51.8ms（Game_Temp.drill_PSS_createSnapshot）
//		★最坏情况		指令被频繁调用，不断地执行截屏操作。
//		★备注			截屏本身的操作，执行一次都很费消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
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
//			->☆静态快照容器
//			
//			->☆保存快照文件
//
//
//		★家谱：
//			大家族-屏幕快照
//		
//		★脚本文档：
//			16.图片 > 图片资源切换脚本说明.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.注意快照销毁的时机，指令 图片显示、图片删除 时，都需要销毁快照。
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
	DrillUp.g_PSS_PluginTip_curName = "Drill_PictureSnapShot.js 图片-临时屏幕快照";
	DrillUp.g_PSS_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PSS_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PSS_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureSnapShot = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureSnapShot');
	
	
	//==============================
	// * 静态数据 - 文件路径
	//				（~struct~DrillFile）
	//==============================
	DrillUp.drill_PSS_initFile = function( dataFrom ){
		var data = {};
		
		data['url_path'] = String( dataFrom["文件夹路径"] || "save/游戏截图/");		//【生成文件】
		
		data['file_name'] = String( dataFrom["文件名"] || "游戏截图");
		data['file_name_with_date'] = String( dataFrom["文件名是否包含日期"] || "true") == "true";
		data['file_name_with_time'] = String( dataFrom["文件名是否包含时分秒"] || "true") == "true";
		
		data['file_type'] = String( dataFrom["文件类型"] || "png");
		data['image_quality'] = Number( dataFrom["图像质量"] || 90);
		
		return data;
	}

	/*-----------------杂项------------------*/
	if( DrillUp.parameters["存储快照文件设置"] != undefined &&
		DrillUp.parameters["存储快照文件设置"] != "" ){
		var data = JSON.parse( DrillUp.parameters["存储快照文件设置"] );
		DrillUp.g_PSS_fileSettings = DrillUp.drill_PSS_initFile( data );
	}else{
		DrillUp.g_PSS_fileSettings = DrillUp.drill_PSS_initFile( {} );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_PSS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PSS_pluginCommand.call(this, command, args);
	this.drill_PSS_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_PSS_pluginCommand = function( command, args ){
	if( command === ">图片临时屏幕快照" ){ 
		
		/*-----------------临时快照------------------*/
		if( args.length == 4 ){
			var unit = String(args[1]);
			var type = String(args[3]);
			if( unit == "临时快照" ){
				if( type == "建立屏幕截图" ){
					$gameTemp.drill_PSS_createSnapshot();
				}
				if( type == "保存到文件" ){
					$gameTemp.drill_PSS_saveSnapshot();
				}
				return;
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "打开保存的文件路径" ){
				$gameTemp.drill_PSS_openUrl();
			}
			return;
		}
		
		
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
					if( $gameScreen.drill_PSS_isPictureExist( pic_id ) == false ){ continue; }
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
					if( $gameScreen.drill_PSS_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
					pic_ids.push( pic_id );
				}
			}
			else if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PSS_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
				pic_ids = [];
				pic_ids.push( pic_id );
			}
			else if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PSS_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
				pic_ids = [];
				pic_ids.push( pic_id );
			}
		}
		
		/*-----------------设置快照------------------*/
		if( pics != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "设为临时快照" ){
				for( var i = 0; i < pics.length; i++ ){
					
					// > 贴图赋值
					var picture_sprite = $gameTemp.drill_PSS_getPictureSpriteByPictureId( pic_ids[i] );
					if( picture_sprite == undefined ){ continue; }
					picture_sprite.drill_PSS_setBitmapSnapshot( $gameTemp.drill_PSS_getLastSnapshotId() );
					
					// > 数据赋值
					pics[i].drill_PSS_setDataSnapShotId( $gameTemp.drill_PSS_getLastSnapshotId() );
				}
			}
			if( type == "去除快照" ){
				for( var i = 0; i < pics.length; i++ ){
					
					// > 贴图赋值
					var picture_sprite = $gameTemp.drill_PSS_getPictureSpriteByPictureId( pic_ids[i] );
					if( picture_sprite == undefined ){ continue; }
					picture_sprite.drill_PSS_removeBitmapSnapshot();
					
					// > 数据赋值
					pics[i].drill_PSS_removeData();
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PSS_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PSS_getPluginTip_PictureNotFind( pic_id ) );
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
	var _drill_STG_PSS_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
	Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
		_drill_STG_PSS_pluginCommand.call(this, command, args);
		this.drill_PSS_pluginCommand( command, args );
	}
	//==============================
	// * 插件指令 - STG指令执行
	//==============================
	Drill_STG_GameInterpreter.prototype.drill_PSS_pluginCommand = Game_Interpreter.prototype.drill_PSS_pluginCommand;
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
Game_Temp.prototype.drill_PSS_getAllPictureSprite = function(){
	return this.drill_PSS_getAllPictureSprite_Private();
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
Game_Temp.prototype.drill_PSS_getPictureSpriteTank = function(){
	return this.drill_PSS_getPictureSpriteTank_Private();
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
Game_Temp.prototype.drill_PSS_getPictureSpriteByPictureId = function( picture_id ){
	return this.drill_PSS_getPictureSpriteByPictureId_Private( picture_id );
}
//=============================================================================
// ** 场景容器之图片贴图（实现）
//=============================================================================
//==============================
// * 图片贴图容器 - 获取 - 容器（私有）
//==============================
Game_Temp.prototype.drill_PSS_getPictureSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	if( SceneManager._scene._spriteset._pictureContainer == undefined ){ return null; }
	return SceneManager._scene._spriteset._pictureContainer.children;
};
//==============================
// * 图片贴图容器 - 获取 - 最顶层容器（私有）
//==============================
Game_Temp.prototype.drill_PSS_getPictureSpriteTank_SenceTopArea = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._drill_SenceTopArea == undefined ){ return null; }
	return SceneManager._scene._drill_SenceTopArea.children;
};
//==============================
// * 图片贴图容器 - 获取 - 图片层容器（私有）
//==============================
Game_Temp.prototype.drill_PSS_getPictureSpriteTank_PicArea = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene instanceof Scene_Battle ){		//『多场景与图片-战斗界面』
		if( SceneManager._scene._spriteset == undefined ){ return null; }
		if( SceneManager._scene._spriteset._drill_battlePicArea == undefined ){ return null; }
		return SceneManager._scene._spriteset._drill_battlePicArea.children;
	}
	if( SceneManager._scene instanceof Scene_Map ){			//『多场景与图片-地图界面』
		if( SceneManager._scene._spriteset == undefined ){ return null; }
		if( SceneManager._scene._spriteset._drill_mapPicArea == undefined ){ return null; }
		return SceneManager._scene._spriteset._drill_mapPicArea.children;
	}
	return null;
};
//==============================
// * 图片贴图容器 - 获取 - 全部图片贴图（私有）
//==============================
Game_Temp.prototype.drill_PSS_getAllPictureSprite_Private = function(){
	var result_list = [];
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_PSS_getPictureSpriteTank_Private();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	
	// > 最顶层 的图片贴图
	var sprite_list = this.drill_PSS_getPictureSpriteTank_SenceTopArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	
	// > 图片层 的图片贴图
	var sprite_list = this.drill_PSS_getPictureSpriteTank_PicArea();
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
Game_Temp.prototype.drill_PSS_getPictureSpriteByPictureId_Private = function( picture_id ){
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_PSS_getPictureSpriteTank_Private();
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
	var sprite_list = this.drill_PSS_getPictureSpriteTank_SenceTopArea();
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
	var sprite_list = this.drill_PSS_getPictureSpriteTank_PicArea();
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
var _drill_PSS_p_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	this._drill_PSS_snapShotId = undefined;			//（要放前面，不然会盖掉子类的设置）
	_drill_PSS_p_initialize.call(this);
}
//==============================
// * 图片的属性 - 删除数据
//==============================
Game_Picture.prototype.drill_PSS_removeData = function(){
	this._drill_PSS_snapShotId = undefined;
}
//==============================
// * 图片的属性 - 设置静态快照ID
//==============================
Game_Picture.prototype.drill_PSS_setDataSnapShotId = function( snapShot_id ){
	this._drill_PSS_snapShotId = snapShot_id;
}
//==============================
// * 图片的属性 - 显示图片（对应函数showPicture）
//==============================
var _drill_PSS_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function( name, origin, x, y, scaleX, scaleY, opacity, blendMode ){
	_drill_PSS_p_show.call( this, name, origin, x, y, scaleX, scaleY, opacity, blendMode );
	this.drill_PSS_removeData();			//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PSS_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PSS_p_erase.call( this );
	this.drill_PSS_removeData();			//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PSS_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PSS_removeData();		//（删除数据）
	}
	_drill_PSS_p_erasePicture.call( this, pictureId );
}


//=============================================================================
// ** ☆图片控制
//
//			说明：	> 此模块专门管理 静态快照 变化。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片控制 - 贴图 初始化
//==============================
var _drill_PSS_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
	
	// > 初始化（要放前面，因为 图片贴图initialize中会执行一次update）
	this._drill_PSS_sp_lastSnapshotId = undefined;		//（要放前面，不然会盖掉子类的设置）
	
	// > 原函数
	_drill_PSS_sp_initialize.call( this, pictureId );
}
//==============================
// * 图片控制 - 贴图 设置快照
//
//			说明：	> 由于一帧内 先刷新 图片的属性，后刷新 贴图的属性。
//					  所以修改图片的属性后，不能立即操作贴图bitmap。『图片bitmap切换慢一帧』
//					> 如果急用，外部函数需要考虑同时 数据赋值+贴图赋值。
//					  （一种急用的情况：设置快照 执行后，就立即执行粉碎效果。）
//==============================
Sprite_Picture.prototype.drill_PSS_setBitmapSnapshot = function( snapshot_id ){
	this._drill_PSS_sp_lastSnapshotId = snapshot_id;	//（需要赋值，外部函数设置快照后，帧刷新中就不会重复设置了）
	var bitmap = $gameTemp._drill_PSS_curBitmapTank[ snapshot_id ];
	if( bitmap == undefined ){ return; }
	this.bitmap = bitmap;
}
//==============================
// * 图片控制 - 贴图 去除快照
//==============================
Sprite_Picture.prototype.drill_PSS_removeBitmapSnapshot = function(){
	this._pictureName = '';
	this.bitmap = null;
}
//==============================
// * 图片控制 - 贴图 帧刷新
//
//			说明：	> 此帧刷新内的操作会延迟1帧，插件指令操作最好立即赋值。
//==============================
var _drill_PSS_sp_updateBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
	_drill_PSS_sp_updateBitmap.call(this);
    var picture = this.picture();
    if( picture ){
		
		if( this._drill_PSS_sp_lastSnapshotId == picture._drill_PSS_snapShotId ){ return; }
		this._drill_PSS_sp_lastSnapshotId = picture._drill_PSS_snapShotId;
		
		// > 去除快照
		if( this._drill_PSS_sp_lastSnapshotId == undefined ){
			this.drill_PSS_removeBitmapSnapshot();
			
		// > 设置快照
		}else{
			this.drill_PSS_setBitmapSnapshot( picture._drill_PSS_snapShotId );
		}
		
	// > 无数据时『图片数据根除时』
	}else{
		if( this._drill_PSS_sp_lastSnapshotId != undefined ){
			this._drill_PSS_sp_lastSnapshotId = undefined;
			this.drill_PSS_removeBitmapSnapshot();
		}
	}
};


//=============================================================================
// ** ☆静态快照容器
//
//			说明：	> 此模块提供 静态快照 的创建。
//					> 暂时不考虑销毁Bitmap情况，因为本身贴图占内存就小。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 静态快照容器 - 初始化
//==============================
var _drill_PSS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_PSS_temp_initialize.call(this);
	this._drill_PSS_curBitmapId = -1;			//静态快照 计数器
	this._drill_PSS_curBitmapTank = [];			//静态快照 贴图容器
}
//==============================
// * 静态快照容器 - 创建快照
//
//			说明：	> 每创建一次，计数器都+1，确保设置的都为当前创建的静态快照，且不影响旧快照图像。
//==============================
Game_Temp.prototype.drill_PSS_createSnapshot = function() {
	this._drill_PSS_curBitmapId += 1;
	this._drill_PSS_curBitmapTank.push( SceneManager.snap() );	//（bitmap对象，可以跨越地图界面、战斗界面和菜单界面）
}
//==============================
// * 静态快照容器 - 获取 创建的快照
//==============================
Game_Temp.prototype.drill_PSS_getLastSnapshot = function() {
	if( this._drill_PSS_curBitmapId == -1 ){ return null; }
	return this._drill_PSS_curBitmapTank[ this._drill_PSS_curBitmapId ];
}
//==============================
// * 静态快照容器 - 获取 创建的快照ID
//==============================
Game_Temp.prototype.drill_PSS_getLastSnapshotId = function() {
	return this._drill_PSS_curBitmapId;
}



//=============================================================================
// ** ☆保存快照文件
//
//			说明：	> 此模块提供 保存 静态快照文件 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 保存快照文件 - 保存到文件
//==============================
Game_Temp.prototype.drill_PSS_saveSnapshot = function() {
    
	// > 资源对象
	var bitmap = this.drill_PSS_getLastSnapshot();
	if( bitmap == null ){ return; }
	
	// > 名称设置
	var settings = DrillUp.g_PSS_fileSettings;
	var file_name = settings['file_name'];
	if( settings['file_name_with_date'] == true ){
		file_name += " ";
		file_name += new Date().drill_PSS_getDateTextByFormat("yyyy年MM月dd日");
	}
	if( settings['file_name_with_time'] == true ){
		file_name += " ";
		file_name += new Date().drill_PSS_getDateTextByFormat("HH时mm分ss秒");
	}
	
	// > 执行保存
	this.drill_PSS_saveBitmap( bitmap, settings['url_path'], file_name, settings['file_type'], settings['image_quality'] );
};
//==============================
// * 保存快照文件 - 时间格式化（真实时间）
//==============================
Date.prototype.drill_PSS_getDateTextByFormat = function( fmt ){
	var o = {
		"M+": this.getMonth() + 1,						//月份 
		"d+": this.getDate(),							//日 
		"H+": this.getHours(),							//小时 
		"m+": this.getMinutes(),						//分 
		"s+": this.getSeconds(),						//秒 
		"q+": Math.floor((this.getMonth() + 3) / 3),	//季度 
		"S":  this.getMilliseconds()					//毫秒 
	};
	if( /(y+)/.test(fmt) ){
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for( var k in o ){
		if( new RegExp("(" + k + ")").test(fmt) ){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
//==============================
// * 保存快照文件 - 执行保存
//
//			参数：	> bitmap        资源对象
//					> url_path      文件夹路径（"snapshot/"）
//					> file_name     文件名
//					> file_type     文件类型（"png"或"jpg"）
//					> image_quality 图片质量（0~100，只jpg时有效）
//==============================
Game_Temp.prototype.drill_PSS_saveBitmap = function( bitmap, url_path, file_name, file_type, image_quality ){
	if( file_type != "png" && file_type != "jpg" ){ return; }
	
	// > 图片质量（只jpg时有效）
	image_quality = Math.min( image_quality, 100 ) * 0.01;
	
	// > 获取数据
	var data = bitmap.canvas.toDataURL( file_type, image_quality );
	
	// > 去掉数据头
	if( file_type == "png" ){
		data = data.replace( /^data:image\/png;base64,/, "" );
	}
	if( file_type == "jpg" ){
		data = data.replace( /^data:image\/jpeg;base64,/, "" );
	}
	
	// > 路径解析
	var fs = require('fs');
	var fileRoot = this.drill_PSS_parentDirectoryPath();
	var dirPath = fileRoot + url_path;
	
	// > 文件夹路径自动创建【生成文件夹】
	if(!fs.existsSync(dirPath) ){
		fs.mkdirSync(dirPath);
	}
	
	// > 如果已存在，则数字加1再存
	var filePath = fileRoot + url_path + file_name + "." + file_type;
	for( var i=2; i < 100; i++ ){
		if( fs.existsSync(filePath) == true ){
			filePath = fileRoot + url_path + file_name + " " + String(i) + "." + file_type;
			continue;
		}
		break;
	}
	
	// > 写入文件
	fs.writeFileSync( filePath, data, 'base64' );
}
//==============================
// * 保存快照文件 - 获取目录
//==============================
Game_Temp.prototype.drill_PSS_parentDirectoryPath = function() {
    var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    return path.join(base, '/');
};
//==============================
// * 保存快照文件 - 打开保存的文件路径
//==============================
Game_Temp.prototype.drill_PSS_openUrl = function() {
	var fileRoot = this.drill_PSS_parentDirectoryPath();
	var filePath = fileRoot + DrillUp.g_PSS_fileSettings['url_path'];
	
    var path = require('path');
	var exec = require('child_process').exec;
	exec('explorer ' + path.resolve(filePath) );
};

