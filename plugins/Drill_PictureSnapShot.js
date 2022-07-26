//=============================================================================
// Drill_PictureSnapShot.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        图片 - 临时屏幕快照
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
 * 使得你可以将当前的屏幕快速赋值给图片进行处理。
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
 *   (1.屏幕快照都是临时的，且只能作为临时对象使用，无法保存到存档中。
 * 设计：
 *   (1.你可以将 屏幕快照 和 图片滤镜 结合使用，制作出一闪的眩晕效果。
 *      在地图和战斗中都可以做，可以去 特效管理层 看看快照效果。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来执行图片快捷操作：
 * 
 * 插件指令：>图片临时屏幕快照 : 临时快照 : 建立屏幕截图
 * 插件指令：>图片临时屏幕快照 : 图片[1] : 设为临时快照
 * 插件指令：>图片临时屏幕快照 : 图片变量[21] : 设为临时快照
 * 插件指令：>图片临时屏幕快照 : 图片[1] : 去除快照
 * 插件指令：>图片临时屏幕快照 : 图片变量[21] : 去除快照
 * 
 * 1.你需要先建立屏幕截图，再将临时快照赋值给 图片对象。
 * 2.注意，屏幕快照都是临时的，且只能作为临时对象使用，无法保存到存档中。
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
 * 测试结果：   战斗界面中，平均消耗为：【6.15ms】
 *              地图界面中，平均消耗为：【6.41ms】
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
 * 
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
//		★性能测试消耗	6.15ms
//		★最坏情况		指令被频繁调用，不断地执行截屏操作。
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			临时屏幕快照：
//				->临时快照
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
// ** 变量获取
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureSnapShot = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureSnapShot');
	


//=============================================================================
// ** 插件指令
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
					$gameTemp._drill_PSS_curId += 1;
					$gameTemp._drill_PSS_snapShotTank.push( SceneManager.snap() );	//（bitmap对象）
				}
				return;
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
					if( $gameScreen.drill_PSS_isPictureExist( pic_id ) == false ){ continue; }
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
					if( $gameScreen.drill_PSS_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			else if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PSS_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			else if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PSS_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
		
		/*-----------------设置快照------------------*/
		if( pics != null && args.length == 4 ){
			var type = String(args[3]);
			if( type == "设为临时快照" ){
				for( var i = 0; i < pics.length; i++ ){
					pics[i]._Drill_PSS_snapShotId = $gameTemp._drill_PSS_curId;
				}
			}
			if( type == "去除快照" ){
				for( var i = 0; i < pics.length; i++ ){
					pics[i]._Drill_PSS_snapShotId = -1;
				}
			}
		}
		
		
	}
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PSS_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureSnapShot.js 图片 - 临时屏幕快照】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};

//=============================================================================
// ** 临时变量
//=============================================================================
var _drill_PSS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_PSS_temp_initialize.call(this);
	
	this._drill_PSS_curId = -1;
	this._drill_PSS_snapShotTank = [];
}

//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 图片数据 - 初始化基本信息
//==============================
var _Drill_PSS_p_initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function() {
	_Drill_PSS_p_initBasic.call(this);
	
	this._Drill_PSS_snapShotId = -1;		//截图标记
}
//==============================
// * 图片贴图 - 初始化
//==============================
var _Drill_PSS_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
	_Drill_PSS_sp_initialize.call( this, pictureId );
	this._Drill_PSS_p_id = -1;
}
//==============================
// * 图片贴图 - 绑定快照
//==============================
var _Drill_PSS_sp_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_Drill_PSS_sp_update.call(this);
    var picture = this.picture();
    if( picture ){
		
		// > 跳过赋值
		if( this._Drill_PSS_p_id == picture._Drill_PSS_snapShotId ){ return; }
		this._Drill_PSS_p_id = picture._Drill_PSS_snapShotId;
		
		// > 恢复图像
		if( this._Drill_PSS_p_id == -1 ){
			this._pictureName = '';
			this.bitmap = null;
			
		// > 变为快照
		}else{
			var bitmap = $gameTemp._drill_PSS_snapShotTank[ this._Drill_PSS_p_id ];
			if( bitmap == undefined ){ return; }
			this.bitmap = bitmap;
		}
		
	}else{
		
		// > 直接被断开 贴图数据 时，恢复图像
		if( this._Drill_PSS_p_id != -1 ){
			this._Drill_PSS_p_id = -1;
			this._pictureName = '';
			this.bitmap = null;
		}
	}
};

//==============================
// * 图片操作 - 显示图片（对应函数showPicture）
//==============================
var _Drill_PSS_p_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function( name, origin, x, y, scaleX, scaleY, opacity, blendMode ){
	_Drill_PSS_p_show.call( this, name, origin, x, y, scaleX, scaleY, opacity, blendMode );
	this._Drill_PSS_snapShotId = -1;		//（标记解除）
}
//==============================
// * 图片操作 - 消除图片（对应函数erasePicture）
//==============================
var _Drill_PSS_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_Drill_PSS_p_erase.call( this );
	this._Drill_PSS_snapShotId = -1;		//（标记解除）
}

