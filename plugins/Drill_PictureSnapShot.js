//=============================================================================
// Drill_PictureSnapShot.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        图片 - 临时屏幕快照
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
 * 设计：
 *   (1.你可以将 屏幕快照 和 图片滤镜 结合使用，制作出一闪的效果。
 *      在地图和战斗中都可以做，可以去 特效管理层 看看快照效果。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行图片快捷操作：
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
 * 测试方法：   在不同的界面中，进行快照性能测试。
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
//		★性能测试因素	UI管理层
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
//			->☆变量获取
//			->☆插件指令
//			->☆图片贴图
//				>图片对象层 的图片贴图
//				>最顶层 的图片贴图
//				>图片层 的图片贴图
//			
//			->☆静态快照容器
//			->☆图片控制
//				->显示图片
//				->消除图片
//				->贴图 绑定快照
//
//
//		★家谱：
//			大家族-屏幕快照
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
// ** ☆变量获取
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureSnapShot = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureSnapShot');
	


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _Drill_PSS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_PSS_pluginCommand.call(this, command, args);
	if( command === ">图片临时屏幕快照" ){ 
		
		/*-----------------临时快照------------------*/
		if( args.length == 4 ){
			var unit = String(args[1]);
			var type = String(args[3]);
			if( unit == "临时快照" ){
				if( type == "建立屏幕截图" ){
					$gameTemp.drill_PSS_createSnapshot();
				}
				return;
			}
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
					
					// > 贴图直接赋值
					var picture_sprite = $gameTemp.drill_PSS_getPictureSpriteByPictureId( pic_ids[i] );
					if( picture_sprite == undefined ){ continue; }
					picture_sprite.drill_PSS_setSnapshot( $gameTemp.drill_PSS_getLastSnapshotId() );
					
					// > 图片赋值
					pics[i]._drill_PSS_snapShotId = $gameTemp.drill_PSS_getLastSnapshotId();
				}
			}
			if( type == "去除快照" ){
				for( var i = 0; i < pics.length; i++ ){
					
					// > 贴图直接赋值
					var picture_sprite = $gameTemp.drill_PSS_getPictureSpriteByPictureId( pic_ids[i] );
					if( picture_sprite == undefined ){ continue; }
					picture_sprite.drill_PSS_setSnapshot( -1 );
					
					// > 图片赋值
					pics[i]._drill_PSS_snapShotId = -1;
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


//#############################################################################
// ** 【标准模块】图片贴图 ☆图片贴图
//#############################################################################
//##############################
// * 图片贴图 - 获取 - 容器指针【标准函数】
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
// * 图片贴图 - 获取 - 根据图片ID【标准函数】
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
// ** 图片贴图（接口实现）
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
	if( SceneManager._scene instanceof Scene_Battle ){
		if( SceneManager._scene._spriteset == undefined ){ return null; }
		if( SceneManager._scene._spriteset._drill_battlePicArea == undefined ){ return null; }
		return SceneManager._scene._spriteset._drill_battlePicArea.children;
	}
	if( SceneManager._scene instanceof Scene_Map ){
		if( SceneManager._scene._spriteset == undefined ){ return null; }
		if( SceneManager._scene._spriteset._drill_mapPicArea == undefined ){ return null; }
		return SceneManager._scene._spriteset._drill_mapPicArea.children;
	}
	return null;
};
//==============================
// * 图片贴图容器 - 获取 - 根据图片ID（私有）
//==============================
Game_Temp.prototype.drill_PSS_getPictureSpriteByPictureId_Private = function( picture_id ){
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_PSS_getPictureSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite instanceof Sprite_Picture ){
			if( sprite._pictureId == picture_id ){
				return sprite;
			}
		}
	}
	
	// > 最顶层 的图片贴图
	var sprite_list = this.drill_PSS_getPictureSpriteTank_SenceTopArea();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite instanceof Sprite_Picture ){
			if( sprite._pictureId == picture_id ){
				return sprite;
			}
		}
	}
	
	// > 图片层 的图片贴图
	var sprite_list = this.drill_PSS_getPictureSpriteTank_PicArea();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var sprite = sprite_list[i];
		if( sprite instanceof Sprite_Picture ){
			if( sprite._pictureId == picture_id ){
				return sprite;
			}
		}
	}
	return null;
};



//=============================================================================
// ** ☆静态快照容器
//
//			说明：	> 此模块提供 静态快照 的创建。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 静态快照容器 - 初始化
//==============================
var _drill_PSS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_PSS_temp_initialize.call(this);
	this._drill_PSS_curId = -1;				//静态快照 计数器
	this._drill_PSS_snapShotTank = [];		//静态快照 贴图容器
}
//==============================
// * 静态快照容器 - 创建快照
//
//			说明：	> 每创建一次，计数器都+1，确保设置的都为当前创建的静态快照，且不影响旧快照图像。
//==============================
Game_Temp.prototype.drill_PSS_createSnapshot = function() {
	this._drill_PSS_curId += 1;
	this._drill_PSS_snapShotTank.push( SceneManager.snap() );	//（bitmap对象，可以跨越地图界面、战斗界面和菜单界面）
}
//==============================
// * 静态快照容器 - 获取创建的快照
//==============================
Game_Temp.prototype.drill_PSS_getLastSnapshot = function() {
	if( this._drill_PSS_curId == -1 ){ return null; }
	return this._drill_PSS_snapShotTank[ this._drill_PSS_curId ];
}
//==============================
// * 静态快照容器 - 获取创建的快照ID
//==============================
Game_Temp.prototype.drill_PSS_getLastSnapshotId = function() {
	return this._drill_PSS_curId;
}


//=============================================================================
// ** ☆图片控制
//
//			说明：	> 此模块将 静态快照与图片贴图 进行绑定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片控制 - 初始化基本信息
//==============================
var _drill_PSS_p_initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function() {
	_drill_PSS_p_initBasic.call(this);
	this._drill_PSS_snapShotId = -1;		//截图标记
}
//==============================
// * 图片控制 - 显示图片（对应函数showPicture）
//==============================
var _drill_PSS_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function( name, origin, x, y, scaleX, scaleY, opacity, blendMode ){
	_drill_PSS_p_show.call( this, name, origin, x, y, scaleX, scaleY, opacity, blendMode );
	this._drill_PSS_snapShotId = -1;		//（标记解除）
}
//==============================
// * 图片控制 - 消除图片（对应函数erasePicture）
//==============================
var _drill_PSS_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PSS_p_erase.call( this );
	this._drill_PSS_snapShotId = -1;		//（标记解除）
}
//==============================
// * 图片控制 - 贴图 初始化
//==============================
var _drill_PSS_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
	_drill_PSS_sp_initialize.call( this, pictureId );
	this._drill_PSS_sp_curSnapshotId = -1;
}
//==============================
// * 图片控制 - 贴图 帧刷新
//
//			说明：	> 此帧刷新内的操作会延迟1帧，插件指令操作最好立即赋值。
//==============================
var _drill_PSS_sp_updateBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
	_drill_PSS_sp_updateBitmap.call(this);
	
	// > 有数据时
    var picture = this.picture();
    if( picture ){
		
		if( this._drill_PSS_sp_curSnapshotId == picture._drill_PSS_snapShotId ){ return; }
		this._drill_PSS_sp_curSnapshotId = picture._drill_PSS_snapShotId;
		this.drill_PSS_setSnapshot( picture._drill_PSS_snapShotId );	//（ID不一致时，赋值）
		
	// > 无数据时【图片数据根除时】
	}else{
		if( this._drill_PSS_sp_curSnapshotId != -1 ){	//（恢复图像）
			this.drill_PSS_setSnapshot( -1 );
		}
	}
};
//==============================
// * 图片控制 - 贴图 绑定快照
//==============================
Sprite_Picture.prototype.drill_PSS_setSnapshot = function( snapshot_id ){
	this._drill_PSS_sp_curSnapshotId = snapshot_id;
	
	// > 恢复原图像
	if( snapshot_id == -1 ){
		this._pictureName = '';
		this.bitmap = null;
		return;
	}
	
	// > 设置静态快照
	var bitmap = $gameTemp._drill_PSS_snapShotTank[ snapshot_id ];
	if( bitmap == undefined ){ return; }
	this.bitmap = bitmap;
}

