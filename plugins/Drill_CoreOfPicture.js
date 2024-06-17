//=============================================================================
// Drill_CoreOfPicture.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        图片 - 图片优化核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfPicture +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件对底层进行直接控制，提供图片的各种基本功能，优化功能结构。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 可以 单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只作用于图片。
 * 2.详细内容可以去看看 "16.图片 > 关于图片优化核心.docx"。
 * 碰撞体：
 *   (1.你可以通过插件指令"DEBUG碰撞体查看"查看图片的碰撞体范围。
 *      图片进行 平移/缩放/斜切/旋转 变换时，都会影响碰撞体的形状。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>图片优化核心 : DEBUG碰撞体查看 : 开启
 * 插件指令：>图片优化核心 : DEBUG碰撞体查看 : 关闭
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
 * 时间复杂度： o(n^2)  每帧
 * 测试方法：   在图片管理层进行图片鼠标触发测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【20.34ms】
 *              100个事件的地图中，平均消耗为：【14.52ms】
 *               50个事件的地图中，平均消耗为：【10.60ms】
 * 测试方法2：  在战斗时，进行图片鼠标触发测试。
 * 测试结果2：  战斗界面中，平均消耗为：【11.80ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.此插件的性能消耗与图片直接成正比，因为每张图片都具备核心的基础功能，
 *   是几乎一比一的消耗。关闭此插件并不能减少消耗，因为此插件只是把
 *   底层的消耗转移到此插件并显示了出来。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了碰撞体的功能细节。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COPi (Core_Of_Picture)
//		临时全局变量	DrillUp.g_COPi_xxx
//		临时局部变量	this._drill_COPi_xxx
//		存储数据变量	$gameSystem._drill_COPi_xxx
//		全局存储变量	无
//		覆盖重写方法	Sprite_Picture.prototype.updateOrigin（覆写）
//						Sprite_Picture.prototype.updatePosition（覆写）
//						Sprite_Picture.prototype.updateScale（覆写）
//						Sprite_Picture.prototype.updateOther（覆写）
//						Game_Picture.prototype.updateRotation（覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	2024/5/2：
//							》变换消耗：11.8ms（drill_COPi_updateCollisionPosition）10.6ms（drill_COPi_finalTransform_x）
//							》堆叠级相关消耗：3.6ms（drill_COPi_updateZIndex）
//		★最坏情况		暂无
//		★备注			该插件直接管图片的全部功能，本身图片可控制的数量也不多，所以不担心消耗。
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
//			->☆图片贴图
//			
//			->☆管辖权 - 图片数据【全权接管 Game_Picture】
//			->☆管辖权 - 图片贴图【全权接管 Sprite_Picture】
//			->☆管辖函数覆写
//			
//			->☆数据最终变换值『图片数据最终变换值』『变换特性的规范』
//				->基础特性
//					>  资源名
//					x> 可见
//					>  混合模式
//					>  层级
//					>  堆叠级
//				->变换特性『变换特性-单贴图』
//					x> 锚点X
//					x> 锚点Y
//					>  位置X
//					>  位置Y
//					>  缩放X
//					>  缩放Y
//					>  透明度
//					>  斜切X
//					>  斜切Y
//					>  旋转
//					>  转速
//				->其它特性
//					> 色调
//			->☆固定帧初始值
//				->贴图帧刷新 位置（覆写）
//					->位置X
//					->位置Y
//				->贴图帧刷新 缩放（覆写）
//					->缩放X
//					->缩放Y
//				->贴图帧刷新 其他属性（覆写）
//					->透明度
//					->旋转
//				->贴图帧刷新 转速（覆写）
//					->转速
//				->贴图帧刷新 斜切
//					->斜切X
//					->斜切Y
//			
//			->☆图片ID管理
//			->☆高度宽度获取
//			->☆斜切控制
//			->☆锚点控制
//				->修改锚点（开放函数）
//				->修改锚点+保持位置（开放函数）
//				->数学工具
//					->锁定锚点
//			
//			
//			->☆碰撞体
//				->绑定碰撞体【标准函数】
//				->解除碰撞体【标准函数】
//				->获取碰撞体【标准函数】
//				->绑定碰撞体时【标准接口】
//				->解除碰撞体时【标准接口】
//			->☆碰撞体的属性
//				->数据
//					->初始化 数据
//					->删除数据
//					->消除图片
//					->消除图片（command235）
//			->☆碰撞体赋值
//				->最后继承2级
//				->刷新 锚点/位置/缩放/斜切/旋转
//				->刷新框架
//			->碰撞体 实体类【Drill_COPi_CollisionBean】
//				->被动赋值（Sprite_Picture）
//					> 可见
//					> 锚点/位置/缩放/斜切/旋转
//					> 贴图框架值
//			
//			->☆碰撞体判定
//				->点是否在当前碰撞体内【标准函数】
//				->所有点是否在当前碰撞体内【标准函数】
//				->获取当前碰撞体的全部顶点【标准函数】
//			->☆碰撞体判定实现
//				->点是否在当前碰撞体内
//				->数学工具
//					->获取两点的叉乘/向量积
//					->判断点是否在凸多边形内
//			->☆碰撞体与点变换
//				->获取矩形的四个顶点
//				->某点经过碰撞体的正向变换
//				->某点经过碰撞体的反向变换
//				->数学工具
//					->矩阵点的变换/点A绕点B旋转缩放斜切
//			->☆DEBUG碰撞体范围
//			
//			
//			->☆图片的战斗层级
//			->☆图片的地图层级
//			->☆层级与堆叠级
//				->刷新层级【标准函数】
//				->刷新堆叠级【标准函数】
//				->设置层级时【标准函数】
//				->设置堆叠级时【标准函数】
//			->☆层级控制
//			->☆堆叠级控制
//			
//			
//		★家谱：
//			无
//		
//		★脚本文档：
//			16.图片 > 关于图片优化核心（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			无
//
//		★其它说明细节：
//			1.图片比较特殊，同时在战斗界面和地图界面都要有效果。
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
	DrillUp.g_COPi_PluginTip_curName = "Drill_CoreOfPicture.js 图片-图片优化核心";
	DrillUp.g_COPi_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_COPi_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_COPi_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_COPi_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_COPi_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_COPi_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_COPi_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_COPi_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfPicture = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfPicture');
	
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_COPi_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_COPi_pluginCommand.call(this, command, args);
	if( command === ">图片优化核心" ){
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1 == "DEBUG碰撞体查看" ){
				if( temp2 == "开启" ){
					$gameSystem._drill_COPi_DebugEnabled = true;
					$gameSystem._drill_COPWM_DebugEnabled = false;	//（【图片-图片与鼠标控制核心】防止重叠显示）
				}
				if( temp2 == "关闭" ){
					$gameSystem._drill_COPi_DebugEnabled = false;
				}
			}
		}
		
	};
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_COPi_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COPi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_COPi_sys_initialize.call(this);
	this.drill_COPi_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COPi_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_COPi_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_COPi_saveEnabled == true ){	
		$gameSystem.drill_COPi_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_COPi_initSysData();
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
Game_System.prototype.drill_COPi_initSysData = function() {
	this.drill_COPi_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_COPi_checkSysData = function() {
	this.drill_COPi_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_COPi_initSysData_Private = function() {
	
	this._drill_COPi_DebugEnabled = false;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_COPi_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_COPi_DebugEnabled == undefined ){
		this.drill_COPi_initSysData();
	}
};


//#############################################################################
// ** 【标准模块】图片贴图 ☆图片贴图
//#############################################################################
//##############################
// * 图片贴图 - 获取 - 全部图片贴图【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组       （图片贴图）
//          
//			说明：	> 此函数返回所有图片贴图，包括被转移到 图片层、最顶层 的图片。
//##############################
Game_Temp.prototype.drill_COPi_getAllPictureSprite = function(){
	return this.drill_COPi_getAllPictureSprite_Private();
}
//##############################
// * 图片贴图 - 获取 - 容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组       （图片贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//					> 注意，被转移到 图片层、最顶层 的图片，不在此容器内。
//##############################
Game_Temp.prototype.drill_COPi_getPictureSpriteTank = function(){
	return this.drill_COPi_getPictureSpriteTank_Private();
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
Game_Temp.prototype.drill_COPi_getPictureSpriteByPictureId = function( picture_id ){
	return this.drill_COPi_getPictureSpriteByPictureId_Private( picture_id );
}
//=============================================================================
// ** 图片贴图（接口实现）
//=============================================================================
//==============================
// * 图片贴图容器 - 获取 - 容器（私有）
//==============================
Game_Temp.prototype.drill_COPi_getPictureSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	if( SceneManager._scene._spriteset._pictureContainer == undefined ){ return null; }
	return SceneManager._scene._spriteset._pictureContainer.children;
};
//==============================
// * 图片贴图容器 - 获取 - 最顶层容器（私有）
//==============================
Game_Temp.prototype.drill_COPi_getPictureSpriteTank_SenceTopArea = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._drill_SenceTopArea == undefined ){ return null; }
	return SceneManager._scene._drill_SenceTopArea.children;
};
//==============================
// * 图片贴图容器 - 获取 - 图片层容器（私有）
//==============================
Game_Temp.prototype.drill_COPi_getPictureSpriteTank_PicArea = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene instanceof Scene_Battle ){		//『图片与多场景』
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
// * 图片贴图容器 - 获取 - 全部图片贴图（私有）
//==============================
Game_Temp.prototype.drill_COPi_getAllPictureSprite_Private = function(){
	var result_list = [];
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_COPi_getPictureSpriteTank_Private();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	
	// > 最顶层 的图片贴图
	var sprite_list = this.drill_COPi_getPictureSpriteTank_SenceTopArea();
	if( sprite_list != undefined ){
		for(var i=0; i < sprite_list.length; i++){
			var sprite = sprite_list[i];
			if( sprite instanceof Sprite_Picture ){
				result_list.push( sprite );
			}
		}
	}
	
	// > 图片层 的图片贴图
	var sprite_list = this.drill_COPi_getPictureSpriteTank_PicArea();
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
Game_Temp.prototype.drill_COPi_getPictureSpriteByPictureId_Private = function( picture_id ){
	
	// > 图片对象层 的图片贴图
	var sprite_list = this.drill_COPi_getPictureSpriteTank_Private();
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
	var sprite_list = this.drill_COPi_getPictureSpriteTank_SenceTopArea();
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
	var sprite_list = this.drill_COPi_getPictureSpriteTank_PicArea();
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
// ** ☆管辖权 - 图片数据【全权接管 Game_Picture】
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*  管辖 - 创建数据+操作数据
//==============================
// * G图片容器『图片-图片优化核心』 - 获取图片
//==============================
Game_Screen.prototype.picture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
    return this._pictures[realPictureId];
};
//==============================
// * G图片容器『图片-图片优化核心』 - 获取实际图片ID
//==============================
Game_Screen.prototype.realPictureId = function( pictureId ){
    if( $gameParty.inBattle() ){
        return pictureId + this.maxPictures();	//（这里实现比较糟糕，但没办法了都按这个来吧）
    }else{
        return pictureId;
    }
};
//==============================
// * G图片容器『图片-图片优化核心』 - 图片最大数量
//
//			说明：	> 用于分离 战斗界面的图片数据 与 地图界面的图片数据。
//==============================
Game_Screen.prototype.maxPictures = function(){
    return 100;
};
//==============================
// * G图片容器『图片-图片优化核心』 - 清除全部
//==============================
Game_Screen.prototype.clearPictures = function(){
    this._pictures = [];
};
//==============================
// * G图片容器『图片-图片优化核心』 - 清除上一场战斗的图片数据
//==============================
Game_Screen.prototype.eraseBattlePictures = function(){
    this._pictures = this._pictures.slice(0, this.maxPictures() + 1);
};
//==============================
// * G图片容器『图片-图片优化核心』 - 帧刷新图片数据
//==============================
Game_Screen.prototype.updatePictures = function(){
    this._pictures.forEach(function( picture ){
        if( picture ){
            picture.update();
        }
    });
};

//==============================
// * H图片操作『图片-图片优化核心』 - 显示图片（command231）
//==============================
Game_Screen.prototype.showPicture = function( pictureId, name, origin, x, y,
                                             scaleX, scaleY, opacity, blendMode ){
    var realPictureId = this.realPictureId(pictureId);
    var picture = new Game_Picture();
    picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
    this._pictures[realPictureId] = picture;
};
//==============================
// * H图片操作『图片-图片优化核心』 - 移动图片（command232）
//==============================
Game_Screen.prototype.movePicture = function( pictureId, origin, x, y, scaleX,
                                             scaleY, opacity, blendMode, duration ){
    var picture = this.picture(pictureId);
    if( picture ){
        picture.move(origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
    }
};
//==============================
// * H图片操作『图片-图片优化核心』 - 旋转图片（command233）
//==============================
Game_Screen.prototype.rotatePicture = function( pictureId, speed ){
    var picture = this.picture(pictureId);
    if( picture ){
        picture.rotate(speed);
    }
};
//==============================
// * H图片操作『图片-图片优化核心』 - 更改图片色调（command234）
//==============================
Game_Screen.prototype.tintPicture = function( pictureId, tone, duration ){
    var picture = this.picture(pictureId);
    if( picture ){
        picture.tint(tone, duration);
    }
};
//==============================
// * H图片操作『图片-图片优化核心』 - 消除图片（command235）
//
//			说明：	> 注意，此处直接暴力删除了 图片数据，此函数执行后，图片数据直接获取不到了。
//==============================
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
    this._pictures[realPictureId] = null;
	//（注意这里根本没执行 图片 的 erase 函数）
};
*/
/*  管辖 - 数据类
//==============================
// * 图片『图片-图片优化核心』 - 初始化
//==============================
Game_Picture.prototype.initialize = function(){
    this.initBasic();			//基本信息
    this.initTarget();			//目标变换
    this.initTone();			//色调
    this.initRotation();		//旋转
};

//==============================
// * 图片『图片-图片优化核心』 - 属性获取
//==============================
Game_Picture.prototype.name = function(){ return this._name; };				//图片资源名
Game_Picture.prototype.blendMode = function(){ return this._blendMode; };	//混合模式

Game_Picture.prototype.x = function(){ return this._x; };					//位置X
Game_Picture.prototype.y = function(){ return this._y; };					//位置Y
Game_Picture.prototype.scaleX = function(){ return this._scaleX; };			//缩放X
Game_Picture.prototype.scaleY = function(){ return this._scaleY; };			//缩放Y
Game_Picture.prototype.opacity = function(){ return this._opacity; };		//透明度

Game_Picture.prototype.origin = function(){ return this._origin; };			//锚点值（数字）
Game_Picture.prototype.tone = function(){ return this._tone; };				//色调（数组）
Game_Picture.prototype.angle = function(){ return this._angle; };			//旋转（单位角度）

//==============================
// * 初始化『图片-图片优化核心』 - 基本信息
//==============================
Game_Picture.prototype.initBasic = function(){
	
    this._name = '';				//图片资源名
    this._blendMode = 0;			//混合模式
	
    this._x = 0;					//位置X
    this._y = 0;					//位置Y
    this._scaleX = 100;				//缩放X
    this._scaleY = 100;				//缩放Y
    this._opacity = 255;			//透明度
	
	// > 属性 - 斜切
	//this._drill_skewX = 0;		//斜切X
	//this._drill_skewY = 0;		//斜切Y
	
	// > 属性 - 高宽
	//this._drill_width = 0;		//图片宽度
	//this._drill_height = 0;		//图片高度
	
	// > 属性 - 锚点
    this._origin = 0;				//锚点值（数字）
	//this._drill_anchorX = 0;		//锚点X
	//this._drill_anchorY = 0;		//锚点Y
	
	// > 属性 - 色调（见函数 initTone() ）
	
	// > 属性 - 旋转（见函数 initRotation() ）
    //this._angle = 0;				//旋转（单位角度）
    //this._rotationSpeed = 0;		//转速（单位角度）
	
	// > 属性 - 层级（贴图的属性，这里不定义）
	
	// > 属性 - 堆叠级（贴图的属性，这里不定义）
};
//==============================
// * 初始化『图片-图片优化核心』 - 目标变换
//==============================
Game_Picture.prototype.initTarget = function(){
    this._targetX = this._x;				//目标变换 - 位置X
    this._targetY = this._y;				//目标变换 - 位置Y
    this._targetScaleX = this._scaleX;		//目标变换 - 缩放X
    this._targetScaleY = this._scaleY;		//目标变换 - 缩放Y
    this._targetOpacity = this._opacity;	//目标变换 - 透明度
    this._duration = 0;						//目标变换 - 剩余时间
};
//==============================
// * 初始化『图片-图片优化核心』 - 色调
//==============================
Game_Picture.prototype.initTone = function(){
    this._tone = null;			//色调（数组）
    this._toneTarget = null;	//目标变换 - 色调
    this._toneDuration = 0;		//目标变换 - 剩余时间
};
//==============================
// * 初始化『图片-图片优化核心』 - 旋转
//==============================
Game_Picture.prototype.initRotation = function(){
    this._angle = 0;			//旋转（单位角度）
    this._rotationSpeed = 0;	//转速
};

//==============================
// * 图片操作『图片-图片优化核心』 - 显示图片（对应函数showPicture）
//==============================
Game_Picture.prototype.show = function( name, origin, x, y, scaleX,
                                       scaleY, opacity, blendMode ){
    this._name = name;
    this._origin = origin;
    this._x = x;
    this._y = y;
    this._scaleX = scaleX;
    this._scaleY = scaleY;
    this._opacity = opacity;
    this._blendMode = blendMode;
    this.initTarget();
    this.initTone();
    this.initRotation();
};
//==============================
// * 图片操作『图片-图片优化核心』 - 移动图片（对应函数movePicture）
//==============================
Game_Picture.prototype.move = function( origin, x, y, scaleX, scaleY,
                                       opacity, blendMode, duration ){
    this._origin = origin;
    this._targetX = x;
    this._targetY = y;
    this._targetScaleX = scaleX;
    this._targetScaleY = scaleY;
    this._targetOpacity = opacity;
    this._blendMode = blendMode;
    this._duration = duration;
};
//==============================
// * 图片操作『图片-图片优化核心』 - 旋转图片（对应函数rotatePicture）
//==============================
Game_Picture.prototype.rotate = function( speed ){
    this._rotationSpeed = speed;
};
//==============================
// * 图片操作『图片-图片优化核心』 - 更改图片色调（对应函数tintPicture）
//==============================
Game_Picture.prototype.tint = function( tone, duration ){
    if( !this._tone ){
        this._tone = [0, 0, 0, 0];
    }
    this._toneTarget = tone.clone();
    this._toneDuration = duration;
    if( this._toneDuration === 0 ){
        this._tone = this._toneTarget.clone();
    }
};
//==============================
// * 图片操作『图片-图片优化核心』 - 消除图片（无对应）
//
//			说明：	> 注意，函数 erasePicture 没有执行到此函数，因此子插件继承时需要 两个函数 都考虑。
//==============================
Game_Picture.prototype.erase = function(){
    this._name = '';
    this._origin = 0;
    this.initTarget();
    this.initTone();
    this.initRotation();
};

//==============================
// * 图片『图片-图片优化核心』 - 帧刷新
//==============================
Game_Picture.prototype.update = function(){
    this.updateMove();			//位置
    this.updateTone();			//色调
    this.updateRotation();		//旋转
};
//==============================
// * 图片『图片-图片优化核心』 - 帧刷新 - 位置
//==============================
Game_Picture.prototype.updateMove = function(){
    if( this._duration > 0 ){
        var d = this._duration;			//（使用 目标变换 的参数进行控制，递增变换，结构不太稳定）
        this._x = (this._x * (d - 1) + this._targetX) / d;
        this._y = (this._y * (d - 1) + this._targetY) / d;
        this._scaleX  = (this._scaleX  * (d - 1) + this._targetScaleX)  / d;
        this._scaleY  = (this._scaleY  * (d - 1) + this._targetScaleY)  / d;
        this._opacity = (this._opacity * (d - 1) + this._targetOpacity) / d;
        this._duration--;
    }
};
//==============================
// * 图片『图片-图片优化核心』 - 帧刷新 - 色调
//==============================
Game_Picture.prototype.updateTone = function(){
    if( this._toneDuration > 0 ){
        var d = this._toneDuration;
        for( var i = 0; i < 4; i++ ){
            this._tone[i] = (this._tone[i] * (d - 1) + this._toneTarget[i]) / d;
        }
        this._toneDuration--;
    }
};
//==============================
// * 图片『图片-图片优化核心』 - 帧刷新 - 旋转
//==============================
Game_Picture.prototype.updateRotation = function(){
    if( this._rotationSpeed !== 0 ){
        this._angle += this._rotationSpeed / 2;
    }
};
*/

//=============================================================================
// ** ☆管辖权 - 图片贴图【全权接管 Sprite_Picture】
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*  管辖 - 创建贴图
//==============================
// * 2C上图层『图片-图片优化核心』 - 创建 图片层
//==============================
Spriteset_Base.prototype.createPictures = function(){
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2;
    this._pictureContainer = new Sprite();
    this._pictureContainer.setFrame(x, y, width, height);
    for (var i = 1; i <= $gameScreen.maxPictures(); i++ ){
        this._pictureContainer.addChild(new Sprite_Picture(i));
    }
    this.addChild(this._pictureContainer);
};

//==============================
// * 图片贴图『图片-图片优化核心』 - 初始化
//==============================
Sprite_Picture.prototype.initialize = function(  pictureId ){
    Sprite.prototype.initialize.call(this);
    this._pictureId = pictureId;
    this._pictureName = '';
    this._isPicture = true;		//（没用的变量）
    this.update();
};
*/
/*  管辖 - 贴图类
//==============================
// * 图片贴图『图片-图片优化核心』 - 获取 图片纯数据
//==============================
Sprite_Picture.prototype.picture = function(){
    return $gameScreen.picture(this._pictureId);
};
//==============================
// * 图片贴图『图片-图片优化核心』 - 获取bitmap资源对象
//==============================
Sprite_Picture.prototype.loadBitmap = function(){
    this.bitmap = ImageManager.loadPicture(this._pictureName);
};

//==============================
// * 图片贴图『图片-图片优化核心』 - 帧刷新
//==============================
Sprite_Picture.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.updateBitmap();		//帧刷新 - 资源
    if( this.visible ){		
        this.updateOrigin();	//帧刷新 - 锚点
        this.updatePosition();	//帧刷新 - 位置
        this.updateScale();		//帧刷新 - 缩放
        this.updateTone();		//帧刷新 - 色调
        this.updateOther();		//帧刷新 - 其他属性
    }
};
//==============================
// * 图片贴图『图片-图片优化核心』 - 帧刷新 - 资源
//==============================
Sprite_Picture.prototype.updateBitmap = function(){
    var picture = this.picture();
    if( picture ){						//（图片层_pictureContainer会固定创建 100 个图片对象，图片对象初始时是空指针，所以需要隐藏。）
        var pictureName = picture.name();
        if( this._pictureName !== pictureName ){
            this._pictureName = pictureName;
            this.loadBitmap();
        }
        this.visible = true;
    }else{
        this._pictureName = '';
        this.bitmap = null;
        this.visible = false;
    }
};
//==============================
// * 图片贴图『图片-图片优化核心』 - 帧刷新 - 锚点
//==============================
Sprite_Picture.prototype.updateOrigin = function(){
    var picture = this.picture();
    if( picture.origin() === 0 ){
        this.anchor.x = 0;
        this.anchor.y = 0;
    }else{
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
    }
};
//==============================
// * 图片贴图『图片-图片优化核心』 - 帧刷新 - 位置
//==============================
Sprite_Picture.prototype.updatePosition = function(){
    var picture = this.picture();
    this.x = Math.floor(picture.x());
    this.y = Math.floor(picture.y());
};
//==============================
// * 图片贴图『图片-图片优化核心』 - 帧刷新 - 缩放
//==============================
Sprite_Picture.prototype.updateScale = function(){
    var picture = this.picture();
    this.scale.x = picture.scaleX() / 100;
    this.scale.y = picture.scaleY() / 100;
};
//==============================
// * 图片贴图『图片-图片优化核心』 - 帧刷新 - 色调
//
//			说明：	> 持续帧刷新可能会影响性能。
//==============================
Sprite_Picture.prototype.updateTone = function(){
    var picture = this.picture();
    if( picture.tone() ){
        this.setColorTone(picture.tone());
    }else{
        this.setColorTone([0, 0, 0, 0]);
    }
};
//==============================
// * 图片贴图『图片-图片优化核心』 - 帧刷新 - 其他属性
//==============================
Sprite_Picture.prototype.updateOther = function(){
    var picture = this.picture();
    this.opacity = picture.opacity();					//透明度
    this.blendMode = picture.blendMode();				//混合模式
    this.rotation = picture.angle() * Math.PI / 180;	//旋转（单位角度）
};
*/


//=============================================================================
// ** ☆管辖函数覆写
//
//			说明：	> 此模块 覆写函数，防止其它插件对函数覆写后，影响功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 管辖函数覆写 - H图片操作『图片-图片优化核心』 - 显示图片（command231）
//==============================
Game_Screen.prototype.showPicture = function( pictureId, name, origin, x, y,
											scaleX, scaleY, opacity, blendMode ){
	var realPictureId = this.realPictureId(pictureId);
	var picture = new Game_Picture();
	picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
	
	// > 覆盖数据前先去除数据
	var org_picture = this._pictures[realPictureId];
	if( org_picture != undefined ){
		org_picture.erase();
	}
	
	// > 覆盖数据
	this._pictures[realPictureId] = picture;
};
//==============================
// * 管辖函数覆写 - G图片容器『图片-图片优化核心』 - 帧刷新图片数据
//==============================
Game_Screen.prototype.updatePictures = function(){
	for(var i = 0; i < this._pictures.length; i++ ){
		var picture = this._pictures[i];
		if( picture == undefined ){ continue; }
		picture.update();
	}
};


//=============================================================================
// ** ☆数据最终变换值
//			
//			说明：	> 这些值用于贴图变换，由于 叠加的子插件 较多，所以这里统一函数。
//					  注意，这里都是 变换特性 。
//					> 锚点虽然算 变换特性，但是对贴图结构有非常大的影响，所以子插件不能乱改。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//##############################
// * 数据最终变换值 - 位置X（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 像素单位。
//##############################
Game_Picture.prototype.drill_COPi_finalTransform_x = function(){
	return this._x;
};
//##############################
// * 数据最终变换值 - 位置Y（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 像素单位。
//##############################
Game_Picture.prototype.drill_COPi_finalTransform_y = function(){
	return this._y;
};
//##############################
// * 数据最终变换值 - 缩放X（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 比例单位（如1.00，注意可为 -1.00）。
//##############################
Game_Picture.prototype.drill_COPi_finalTransform_scaleX = function(){
	return this._scaleX * 0.01;				//（_scaleX值为输入 100% 的100，所以要修正到1.00）
};
//##############################
// * 数据最终变换值 - 缩放Y（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 比例单位（如1.00，注意可为 -1.00）。
//##############################
Game_Picture.prototype.drill_COPi_finalTransform_scaleY = function(){
	return this._scaleY * 0.01;				//（_scaleY值为输入 100% 的100，所以要修正到1.00）
};
//##############################
// * 数据最终变换值 - 透明度（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 透明度值0~255。
//##############################
Game_Picture.prototype.drill_COPi_finalTransform_opacity = function(){
	return this._opacity;
};
//##############################
// * 数据最终变换值 - 斜切X（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 比例单位（如1.00，注意可为 -1.00）。
//##############################
Game_Picture.prototype.drill_COPi_finalTransform_skewX = function(){
	return this._drill_skewX * 0.01;		//（_drill_skewX值为输入 100% 的100，所以要修正到1.00）
};
//##############################
// * 数据最终变换值 - 斜切Y（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 比例单位（如1.00，注意可为 -1.00）。
//##############################
Game_Picture.prototype.drill_COPi_finalTransform_skewY = function(){
	return this._drill_skewY * 0.01;		//（_drill_skewY值为输入 100% 的100，所以要修正到1.00）
};
//##############################
// * 数据最终变换值 - 旋转（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 角度单位。
//##############################
Game_Picture.prototype.drill_COPi_finalTransform_rotate = function(){
	return this._angle;
};
//##############################
// * 数据最终变换值 - 转速（可继承，开放函数）
//
//			说明：	> 子插件可继承此函数，使用 角度/帧 单位。
//##############################
Game_Picture.prototype.drill_COPi_finalTransform_rotateSpeed = function(){
	return this._rotationSpeed * 0.5;		//（_rotationSpeed的值为输入 2，实际是 1.00）
};


//=============================================================================
// ** ☆固定帧初始值『变换特性的规范』
//			
//			说明：	> 强制每帧都将 数据最终变换值 都赋值一次，用于实现贴图 定量变化，防止 增量变化。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 固定帧初始值 - 贴图帧刷新
//
//			说明：	> 注意，这里只标记变换的属性。
//==============================
var _drill_COPi_sp_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	
	// > 原函数
	_drill_COPi_sp_update.call(this);
		//this.updateBitmap();			//贴图帧刷新 - 资源
		//if( this.visible ){		
		//    this.updateOrigin();		//贴图帧刷新 - 锚点（锚点X、锚点Y）
		//    this.updatePosition();	//贴图帧刷新 - 位置（位置X、位置Y）
		//    this.updateScale();		//贴图帧刷新 - 缩放（缩放X、缩放Y）
		//    this.updateTone();		//贴图帧刷新 - 色调
		//    this.updateOther();		//贴图帧刷新 - 其他属性（透明度、旋转、转速）
		//}
	
	// > 贴图帧刷新 斜切（斜切X、斜切Y）
	this.drill_COPi_updateSkew();
};
//==============================
// * 固定帧初始值 - 贴图帧刷新 位置（覆写）
//==============================
Sprite_Picture.prototype.updatePosition = function(){
    var picture = this.picture();
    //this.x = Math.floor( picture.drill_COPi_finalTransform_x() );	//（不要用floor，移动值难免会出现7.99999999的情况）
    //this.y = Math.floor( picture.drill_COPi_finalTransform_y() );
    this.x = Math.round( picture.drill_COPi_finalTransform_x() );
    this.y = Math.round( picture.drill_COPi_finalTransform_y() );
};
//==============================
// * 固定帧初始值 - 贴图帧刷新 缩放（覆写）
//==============================
Sprite_Picture.prototype.updateScale = function(){
    var picture = this.picture();
    this.scale.x = picture.drill_COPi_finalTransform_scaleX();
    this.scale.y = picture.drill_COPi_finalTransform_scaleY();
};
//==============================
// * 固定帧初始值 - 贴图帧刷新 其他属性（覆写）
//==============================
Sprite_Picture.prototype.updateOther = function(){
    var picture = this.picture();
    this.opacity = picture.drill_COPi_finalTransform_opacity();					//透明度
    this.blendMode = picture.blendMode();										//混合模式
    this.rotation = picture.drill_COPi_finalTransform_rotate() *Math.PI /180;	//旋转（角度 转 弧度）
};
//==============================
// * 固定帧初始值 - 贴图帧刷新 转速（覆写）
//==============================
Game_Picture.prototype.updateRotation = function(){
    if( this.drill_COPi_finalTransform_rotateSpeed() !== 0 ){		//（这里是在数据内部，叠加了 转速 的影响）
        this._angle += this.drill_COPi_finalTransform_rotateSpeed();
    }
};
//==============================
// * 固定帧初始值 - 贴图帧刷新 斜切
//==============================
Sprite_Picture.prototype.drill_COPi_updateSkew = function(){
    var picture = this.picture();
	if( picture != undefined &&
		this.skew != undefined ){
		this.skew.x = picture.drill_COPi_finalTransform_skewX();	//（斜切X）
		this.skew.y = picture.drill_COPi_finalTransform_skewY();	//（斜切Y）
	}
};



//=============================================================================
// ** ☆图片ID管理
//
//			说明：	> 这里专门说明一下 图片的ID 是什么样的混沌结构。
//					
//					> 数据的ID：
//					  图片数据与图片贴图，为 多对一 关系，战斗界面有一份数据，地图界面另一份数据，两数据相互独立。
//					  图片数据在 Game_Screen 中创建，获取时经过 Game_Screen.prototype.realPictureId 的转换。
//					  所有图片数据都存储在 Game_Screen 的 _pictures 数组容器中。
//					
//					> 贴图的索引号：
//					  图片贴图中，有 _pictureId 的定义，这个参数只是数组索引号。
//					  每次图层创建时，只创建固定数量的贴图，数量由 Game_Screen.prototype.maxPictures 定义。
//					  贴图要获取数据，直接用索引号通过 $gameScreen.picture(this._pictureId) 获取，里面有 realPictureId 的转换过程。
//					
//					> 为什么不给图片数据定义 id？
//					  因为上面的操作至少能确保 数组索引 能对上，再去多定义一个id，只会把所有数据搞的更加混乱。
//					
//					> 目前的情况为：
//					  图片数据容器 有 maxPictures X 2 个数据；（容器在：$gameScreen._pictures ）
//					  图片贴图容器 有 maxPictures 个贴图。（容器在：SceneManager._scene._spriteset._pictureContainer）
//					
//					> 扩展说明：
//					  后期扩展仍然保持此结构不变，如果出现了 新的大界面（如STG界面），则会考虑 maxPictures X 3 个数据。
//					  由于图片贴图可以 任意换 层级/堆叠级，子插件应该考虑使用 drill_COPi_getPictureSpriteByPictureId() 获取贴图。
//					
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片ID管理 - 获取图片ID（开放函数）
//
//			说明：	> 此函数不能在 图片数据 初始化时调用。
//					> 若找不到ID则返回-1。
//==============================
Game_Picture.prototype.drill_COPi_getPictureId = function(){
	if( $gameParty.inBattle() ){	//战斗界面的图片『图片与多场景』
		var pic_id = $gameScreen._pictures.indexOf( this );
		if( pic_id == -1 ){ return -1; }
        return pic_id - $gameScreen.maxPictures();
    }else{							//地图界面的图片
		var pic_id = $gameScreen._pictures.indexOf( this );
        return pic_id;
    }
};
//==============================
// * 图片ID管理 - 根据ID获取图片（开放函数）
//
//			说明：	> 此函数默认就有，用法为：$gameScreen.picture( id )。
//==============================
//Game_Screen.prototype.picture = function( pictureId ){
//    var realPictureId = this.realPictureId(pictureId);
//    return this._pictures[realPictureId];
//};


//=============================================================================
// ** ☆高度宽度获取
//
//			说明：	> 此模块专门获取图片的 高度宽度 功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 高度宽度获取 - 属性获取
//==============================
Game_Picture.prototype.drill_width  = function(){ return this._drill_width;  };	//图片宽度
Game_Picture.prototype.drill_height = function(){ return this._drill_height; };	//图片高度
//==============================
// * 高度宽度获取 - 初始化
//==============================
var _drill_COPi_p_wh_initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function() {
	_drill_COPi_p_wh_initBasic.call(this);
	this._drill_width = 0;					//图片宽度
	this._drill_height = 0;					//图片高度
}
//==============================
// * 高度宽度获取 - 帧刷新
//==============================
var _drill_COPi_sp_wh_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
    
	// > 高宽获取
	if( this.bitmap != undefined &&
		this.bitmap.isReady() == true ){
		
		var picture = this.picture();
		if( picture != undefined ){
			picture._drill_width = this.bitmap.width;
			picture._drill_height = this.bitmap.height;
		}
	}
	
	// > 原函数
	_drill_COPi_sp_wh_update.call(this);
}


//=============================================================================
// ** ☆斜切控制
//
//			说明：	> 此模块专门管理 斜切图片 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 斜切控制 - 属性获取
//==============================
Game_Picture.prototype.drill_skewX = function(){ return this._drill_skewX; };	//斜切X
Game_Picture.prototype.drill_skewY = function(){ return this._drill_skewY; };	//斜切Y
//==============================
// * 斜切控制 - 初始化
//==============================
var _drill_COPi_p_skew_initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function() {
	_drill_COPi_p_skew_initBasic.call(this);
	this._drill_skewX = 0;					//斜切X
	this._drill_skewY = 0;					//斜切Y
};
//==============================
// * 斜切控制 - 帧刷新
//==============================
//	（见前面函数 drill_COPi_updateSkew ）


//=============================================================================
// ** ☆锚点控制
//
//			说明：	> 此模块专门管理 锚点控制 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 锚点控制 - 属性获取
//==============================
Game_Picture.prototype.drill_anchorX = function(){ return this._drill_anchorX; };	//锚点X
Game_Picture.prototype.drill_anchorY = function(){ return this._drill_anchorY; };	//锚点Y
//==============================
// * 锚点控制 - 初始化
//==============================
var _drill_COPi_p_anchor_initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function() {
	_drill_COPi_p_anchor_initBasic.call(this);
	
	//this._origin = 0;						//锚点值（数字）
	
	this._drill_anchorX = 0;				//锚点X
	this._drill_anchorY = 0;				//锚点Y
	this._drill_anchorOffsetX = 0;			//锚点偏移X
	this._drill_anchorOffsetY = 0;			//锚点偏移Y
}
//==============================
// * 锚点控制 - 显示图片
//==============================
var _drill_COPi_p_anchor_show = Game_Picture.prototype.show;
Game_Picture.prototype.show = function( name, origin, x, y, scaleX, scaleY, opacity, blendMode ){
	
	// > 锚点值切换时
	if( origin == 0 ){
		this._drill_anchorX = 0;
		this._drill_anchorY = 0;
		this._drill_anchorOffsetX = 0;
		this._drill_anchorOffsetY = 0;
	}else if( origin == 1 ){
		this._drill_anchorX = 0.5;
		this._drill_anchorY = 0.5;
		this._drill_anchorOffsetX = 0;
		this._drill_anchorOffsetY = 0;
	}else{
		//（不操作）
	}
	
	// > 原函数
	_drill_COPi_p_anchor_show.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
}
//==============================
// * 锚点控制 - 移动图片
//==============================
var _drill_COPi_p_anchor_move = Game_Picture.prototype.move;
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration) {
	
	// > 锚点值切换时
	if( origin == 0 ){
		this._drill_anchorX = 0;
		this._drill_anchorY = 0;
		this._drill_anchorOffsetX = 0;
		this._drill_anchorOffsetY = 0;
	}else if( origin == 1 ){
		this._drill_anchorX = 0.5;
		this._drill_anchorY = 0.5;
		this._drill_anchorOffsetX = 0;
		this._drill_anchorOffsetY = 0;
	}else{
		//（不操作）
	}
	
	// > 原函数
	_drill_COPi_p_anchor_move.call(this, origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
}
//==============================
// * 锚点控制 - 帧刷新 贴图锚点（覆写）
//==============================
Sprite_Picture.prototype.updateOrigin = function() {
	var picture = this.picture();
	
    if( picture.origin() === 0 ){
        this.anchor.x = 0;
        this.anchor.y = 0;
		
    }else if( picture.origin() === 1 ){
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
		
    }else{
        this.anchor.x = picture._drill_anchorX;
        this.anchor.y = picture._drill_anchorY;
	}
};

//==============================
// * 锚点控制 - 修改锚点（开放函数）
//==============================
Game_Picture.prototype.drill_COPi_setAnchor = function( anchorX, anchorY ){
	this._origin = 100;
	this._drill_anchorX = anchorX;
	this._drill_anchorY = anchorY;
	this._drill_anchorOffsetX = 0;
	this._drill_anchorOffsetY = 0;
}
//==============================
// * 锚点控制 - 修改锚点+保持位置（开放函数）
//==============================
Game_Picture.prototype.drill_COPi_setAnchorWithKeepPosition = function( anchorX, anchorY ){
	var org_anchor_x = this._drill_anchorX;
	var org_anchor_y = this._drill_anchorY;
	
	// > 计算 锚点位移值
	var point = $gameTemp.drill_COPi_Math2D_getFixPointInAnchor(
					org_anchor_x, org_anchor_y,
					anchorX, anchorY,
					this._drill_width, this._drill_height,
					this._angle / 180 * Math.PI,
					this._scaleX*0.01 , this._scaleY*0.01,
					this._drill_skewX*0.01 , this._drill_skewY*0.01 
				);
	this._drill_anchorOffsetX -= point.x;
	this._drill_anchorOffsetY -= point.y;
	this._drill_anchorOffsetX += this._drill_width  *(anchorX - org_anchor_x);	//（锚点的偏移）
	this._drill_anchorOffsetY += this._drill_height *(anchorY - org_anchor_y);
	
	this._origin = 100;
	this._drill_anchorX = anchorX;
	this._drill_anchorY = anchorY;
}
//==============================
// * 锚点控制 - 锚点位移值X（继承）
//
//			说明：	> 注意，不要在 图片进行任何变换 的时候，执行 "修改锚点+保持位置"。
//==============================
var _drill_COPi_p_anchor_finalTransform_x = Game_Picture.prototype.drill_COPi_finalTransform_x;
Game_Picture.prototype.drill_COPi_finalTransform_x = function() {
	var xx = _drill_COPi_p_anchor_finalTransform_x.call(this);
	return xx + this._drill_anchorOffsetX;
};
//==============================
// * 锚点控制 - 锚点位移值Y（继承）
//==============================
var _drill_COPi_p_anchor_finalTransform_y = Game_Picture.prototype.drill_COPi_finalTransform_y;
Game_Picture.prototype.drill_COPi_finalTransform_y = function() {
	var xx = _drill_COPi_p_anchor_finalTransform_y.call(this);
	return xx + this._drill_anchorOffsetY;
};
//=============================================================================
// * 锚点控制 - 数学工具 - 锁定锚点
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
Game_Temp.prototype.drill_COPi_Math2D_getFixPointInAnchor = function( 
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




//#############################################################################
// ** 【标准模块】碰撞体 ☆碰撞体
//#############################################################################
//##############################
// * 碰撞体 - 绑定碰撞体【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 该函数可以在图片数据 初始化时 执行，需要子插件手动调用。『节约事件数据存储空间』
//					> 该函数可以放在帧刷新中多次执行。
//##############################
Game_Picture.prototype.drill_COPi_checkCollisionBean = function(){
	if( this._drill_COPi_collisionBean != undefined ){ return; }
	this._drill_COPi_collisionBean = new Drill_COPi_CollisionBean();
	
	// > 创建碰撞体之后，要立即 强制帧刷新，确保当前帧的数据瞬间同步
	var temp_sprite = $gameTemp.drill_COPi_getPictureSpriteByPictureId( this.drill_COPi_getPictureId() );
	if( temp_sprite != undefined ){
		temp_sprite.drill_COPi_updateCollisionPosition();			//强制帧刷新 - 刷新位置
		temp_sprite.drill_COPi_updateCollisionRefreshFrame();		//强制帧刷新 - 刷新框架
	}
	
	this.drill_COPi_whenCheckedCollisionBean();
}
//##############################
// * 碰撞体 - 解除碰撞体【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 该函数可以在图片数据 解除绑定时 执行，需要子插件手动调用。
//					> 如果图片数据是整个被删除，则可以不执行此函数。
//##############################
Game_Picture.prototype.drill_COPi_removeCollisionBean = function(){
	this._drill_COPi_collisionBean = undefined;
	this.drill_COPi_whenRemovedCollisionBean();
}
//##############################
// * 碰撞体 - 获取碰撞体【标准函数】
//
//			参数：	> 无
//			返回：	> 碰撞体对象
//##############################
Game_Picture.prototype.drill_COPi_getCollisionBean = function(){
	return this._drill_COPi_collisionBean;
}
//##############################
// * 碰撞体 - 绑定碰撞体时【标准接口】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 常规情况下这个接口用不上，因为直接获取 碰撞体 就足够了。
//					  如果子插件有特殊功能，要与 碰撞体 数据一对一扩展，
//					  可以继承此函数，用于在 绑定碰撞体 之后执行的操作。
//##############################
Game_Picture.prototype.drill_COPi_whenCheckedCollisionBean = function(){
	
	//（待子类继承写内容）
	
}
//##############################
// * 碰撞体 - 解除碰撞体时【标准接口】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 常规情况下这个接口用不上，因为直接获取 碰撞体 就足够了。
//					  如果子插件有特殊功能，要与 碰撞体 数据一对一扩展，
//					  可以继承此函数，用于在 解除碰撞体 之后执行的操作。
//##############################
Game_Picture.prototype.drill_COPi_whenRemovedCollisionBean = function(){
	
	//（待子类继承写内容）
	
}


//=============================================================================
// ** ☆碰撞体的属性
//
//			说明：	> 此模块专门定义 碰撞体的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 碰撞体的属性 - 初始化
//==============================
var _drill_COPi_collision_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(){
	this._drill_COPi_collisionBean = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_COPi_collision_initialize.call(this);
}
//==============================
// * 碰撞体的属性 - 消除图片
//==============================
var _drill_COPi_collision_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_COPi_collision_erase.call( this );
	this.drill_COPi_removeCollisionBean();						//（删除数据）
}
//==============================
// * 碰撞体的属性 - 消除图片（command235）
//==============================
var _drill_COPi_collision_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_COPi_removeCollisionBean();				//（删除数据）
	}
	_drill_COPi_collision_erasePicture.call( this, pictureId );
}


//=============================================================================
// ** ☆碰撞体赋值
//			
//			说明：	> 此模块专门 对碰撞体进行 赋值。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 碰撞体赋值 - 最后继承2级
//
//			说明：	> 继承要在 最后继承 之后，所以使用2级。
//==============================
var _drill_COPi_scene_collision_requestUpdateOnce = true;
var _drill_COPi_scene_collision_requestUpdate = SceneManager.requestUpdate;
SceneManager.requestUpdate = function() {
	_drill_COPi_scene_collision_requestUpdate.call(this);							//（注意此函数会执行多次）
	if( _drill_COPi_scene_collision_requestUpdateOnce == undefined ){ return; }	//（继承一次后就跳出）
	_drill_COPi_scene_collision_requestUpdateOnce = undefined;
	
	//==============================
	// * 碰撞体赋值 - 帧刷新
	//
	//			说明：	> 注意，此帧刷新的实体类赋值，会比图片数据慢一帧。
	//					  先帧刷新Game_Picture，后帧刷新Sprite_Picture。
	//					> 子插件（比如拖拽、鼠标悬停触发图片）必须自己考虑特殊情况。『鼠标悬停图片慢一帧』
	//==============================
	var _drill_COPi_collision_update = Sprite_Picture.prototype.update;
	Sprite_Picture.prototype.update = function() {
		_drill_COPi_collision_update.call(this);
		
		var picture = this.picture();
		if( picture == undefined ){ return; }
		if( picture._drill_COPi_collisionBean == undefined ){ return; }
		
		this.drill_COPi_updateCollisionPosition();			//帧刷新 - 刷新位置
		this.drill_COPi_updateCollisionRefreshFrame();		//帧刷新 - 刷新框架
	};
}
//==============================
// * 碰撞体赋值 - 帧刷新 - 刷新 锚点/位置/缩放/斜切/旋转
//==============================
Sprite_Picture.prototype.drill_COPi_updateCollisionPosition = function() {
	var picture = this.picture();
	var bean = picture._drill_COPi_collisionBean;
	
	// > 数据最终变换值
	bean.drill_bean_setAnchor( this.anchor.x, this.anchor.y );
	bean.drill_bean_setPosition( picture.drill_COPi_finalTransform_x(), picture.drill_COPi_finalTransform_y() );
	bean.drill_bean_setScale( picture.drill_COPi_finalTransform_scaleX(), picture.drill_COPi_finalTransform_scaleY() );
	if( this.skew != undefined ){
		bean.drill_bean_setSkew( picture.drill_COPi_finalTransform_skewX(), picture.drill_COPi_finalTransform_skewY() );
	}
	bean.drill_bean_setRotate( picture.drill_COPi_finalTransform_rotate() *Math.PI /180 );
	
	//// > 贴图属性（不采用）
	//bean.drill_bean_setAnchor( this.anchor.x, this.anchor.y );
	//bean.drill_bean_setPosition( this.x, this.y );
	//bean.drill_bean_setScale(  this.scale.x,  this.scale.y  );
	//if( this.skew != undefined ){
	//	bean.drill_bean_setSkew( this.skew.x, this.skew.y );
	//}
	//bean.drill_bean_setRotate( this.rotation  );
};
//==============================
// * 碰撞体赋值 - 帧刷新 - 刷新框架
//==============================
Sprite_Picture.prototype.drill_COPi_updateCollisionRefreshFrame = function() {
	var bean = this.picture()._drill_COPi_collisionBean;
	
	if( bean._drill_frameW == 0 ||	//（由于Bean会被随时销毁，所以宽度为零的时候，执行刷新）
		bean._drill_frameH == 0 ){ 
		this.drill_COPi__refreshFrame();
	}
};
//==============================
// * 碰撞体赋值 - 刷新框架『贴图框架值』（_realFrame）
//
//			说明：	> 此处 非帧刷新，而是在 贴图底层 发生刷新改变时，才变化值。
//==============================
var _drill_COPi_collision__refresh = Sprite_Picture.prototype._refresh;
Sprite_Picture.prototype._refresh = function(){
	_drill_COPi_collision__refresh.call( this );
	this.drill_COPi__refreshFrame();
}
//==============================
// * 碰撞体赋值 - 刷新框架
//
//			说明：	> 由于Bean会被随时销毁，所以该函数要在帧刷新中执行。
//==============================
Sprite_Picture.prototype.drill_COPi__refreshFrame = function(){
	var picture = this.picture();
	if( picture == undefined ){ return; }
	if( picture._drill_COPi_collisionBean == undefined ){ return; }
	
	//if( this.visible == false ){ return; }
	//if( this.opacity == 0 ){ return; }
	
	// > 条件 - 未读取时不赋值
	if( this.bitmap == undefined ){ return; }
	if( this.bitmap.isReady() == false ){ return; }
	
	// > 条件 - 不接受宽度为0的标记
	if( this._realFrame.width == 0 ){ return; }
	if( this._realFrame.height == 0 ){ return; }
	
	// > 刷新框架
	picture._drill_COPi_collisionBean.drill_bean_resetFrame(
		this._realFrame.x,
		this._realFrame.y,
		this._realFrame.width,
		this._realFrame.height 
	);
};


//=============================================================================
// ** 碰撞体 实体类【Drill_COPi_CollisionBean】
// **		
// **		作用域：	地图界面
// **		主功能：	> 定义一个专门的实体类数据类。
// **		子功能：	->无帧刷新
// **					->重设数据
// **						->序列号
// **					->被动赋值（Sprite_Picture）
// **						> 可见
// **						> 锚点/位置/缩放/斜切/旋转
// **						> 贴图框架值
// **		
// **		说明：	> 该类可与 Game_Picture 一并存储在 $gameScreen 中。
// **				> 该类没有帧刷新，只能通过函数被动赋值。
//=============================================================================
//==============================
// * 实体类 - 定义
//==============================
function Drill_COPi_CollisionBean(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 实体类 - 初始化
//==============================
Drill_COPi_CollisionBean.prototype.initialize = function(){
	this._drill_beanSerial = new Date().getTime() + Math.random();		//（生成一个不重复的序列号）
    this.drill_bean_initData();											//私有数据初始化
};
//##############################
// * 实体类 - 显示/隐藏【开放函数】
//			
//			参数：	> visible 布尔
//			返回：	> 无
//##############################
Drill_COPi_CollisionBean.prototype.drill_bean_setVisible = function( visible ){
	this._drill_visible = visible;
};
//##############################
// * 实体类 - 设置锚点【开放函数】
//			
//			参数：	> anchor_x 数字
//					> anchor_y 数字
//			返回：	> 无
//##############################
Drill_COPi_CollisionBean.prototype.drill_bean_setAnchor = function( anchor_x, anchor_y ){
	this._drill_anchor_x = anchor_x;
	this._drill_anchor_y = anchor_y;
};
//##############################
// * 实体类 - 设置位置【开放函数】
//			
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//##############################
Drill_COPi_CollisionBean.prototype.drill_bean_setPosition = function( x, y ){
	this._drill_x = x;
	this._drill_y = y;
};
//##############################
// * 实体类 - 设置缩放值【开放函数】
//			
//			参数：	> scale_x 数字
//					> scale_y 数字
//			返回：	> 无
//##############################
Drill_COPi_CollisionBean.prototype.drill_bean_setScale = function( scale_x, scale_y ){
	this._drill_scale_x = scale_x;
	this._drill_scale_y = scale_y;
};
//##############################
// * 实体类 - 设置斜切值【开放函数】
//			
//			参数：	> skew_x 数字
//					> skew_y 数字
//			返回：	> 无
//##############################
Drill_COPi_CollisionBean.prototype.drill_bean_setSkew = function( skew_x, skew_y ){
	this._drill_skew_x = skew_x;
	this._drill_skew_y = skew_y;
};
//##############################
// * 实体类 - 设置旋转值【开放函数】
//			
//			参数：	> rotate 数字（弧度）
//			返回：	> 无
//##############################
Drill_COPi_CollisionBean.prototype.drill_bean_setRotate = function( rotate ){
	this._drill_rotate = rotate;
};
//##############################
// * 实体类 - 设置框架【开放函数】
//			
//			参数：	> frameX,frameY,frameW,frameH 矩形对象
//			返回：	> 无
//			
//			说明：	> 被动赋值，见 刷新框架 函数。
//##############################
Drill_COPi_CollisionBean.prototype.drill_bean_resetFrame = function( frameX, frameY, frameW, frameH ){
	this._drill_frameX = frameX;
	this._drill_frameY = frameY;
	this._drill_frameW = frameW;
	this._drill_frameH = frameH;
};
//==============================
// * 实体类 - 私有数据初始化
//==============================
Drill_COPi_CollisionBean.prototype.drill_bean_initData = function(){
	
	this._drill_visible = true;				//实体类 - 可见
	
	this._drill_anchor_x = 0;				//实体类 - 锚点X
	this._drill_anchor_y = 0;				//实体类 - 锚点Y
	
	this._drill_x = 0;						//实体类 - 位置X
	this._drill_y = 0;						//实体类 - 位置Y
	this._drill_scale_x = 1;				//实体类 - 缩放X
	this._drill_scale_y = 1;				//实体类 - 缩放Y
	this._drill_skew_x = 0;					//实体类 - 斜切X
	this._drill_skew_y = 0;					//实体类 - 斜切Y
	this._drill_rotate = 0;					//实体类 - 旋转值
	
	this._drill_frameX = 0;					//实体类 - 框架X
	this._drill_frameY = 0;					//实体类 - 框架Y
	this._drill_frameW = 0;					//实体类 - 框架宽度
	this._drill_frameH = 0;					//实体类 - 框架高度
};



//#############################################################################
// ** 【标准模块】碰撞体判定 ☆碰撞体判定
//#############################################################################
//##############################
// * 碰撞体判定 - 点是否在当前碰撞体内【标准函数】
//			
//			参数：	> x0,y0 数字（点坐标）
//			返回：	> 布尔
//			
//			说明：	> 该函数只对 已绑定 的图片有效，否则一直返回false。
//					  你只需要知道绑定 碰撞体 之后，这个函数能用就行，中间过程不要去管。不要把"凸包判定"这些核心的中间过程写到 子插件 里面了。
//					> 该函数每调用一次，就计算一次，大量调用会浪费性能。
//					  子插件需要考虑相关功能 同一贴图+同一帧中 被多次调用 的优化。
//##############################
Game_Picture.prototype.drill_COPi_isPointInCollisionBean = function( x0, y0 ){
	return this.drill_COPi_isPointInCollisionBean_Private(x0, y0);
}
//##############################
// * 碰撞体判定 - 所有点是否在当前碰撞体内【标准函数】
//			
//			参数：	> point_list 对象列表（点列表）
//			返回：	> 布尔
//			
//			说明：	> 该函数只对 已绑定 的图片有效，否则一直返回false。
//					  你只需要知道绑定 碰撞体 之后，这个函数能用就行，中间过程不要去管。
//					> 该函数每调用一次，就计算一次，大量调用会浪费性能。
//					  子插件需要考虑相关功能 同一贴图+同一帧中 被多次调用 的优化。
//##############################
Game_Picture.prototype.drill_COPi_isAllPointInCollisionBean = function( point_list ){
	if( point_list.length <= 0 ){ return false; }
	for(var i = 0; i < point_list.length; i++ ){
		var point = point_list[i];
		if( this.drill_COPi_isPointInCollisionBean( point.x, point.y ) == false ){
			return false;
		}
	}
	return true;
}
//##############################
// * 碰撞体判定 - 获取当前碰撞体的全部顶点【标准函数】
//			
//			参数：	> 无
//			返回：	> point_list 对象列表（点列表，如果为空则返回空数组）
//			
//			说明：	> 该函数只对 已绑定 的图片有效。
//					  你只需要知道绑定 碰撞体 之后，这个函数能用就行，中间过程不要去管。
//##############################
Game_Picture.prototype.drill_COPi_getCollisionBeanAllPoint = function(){
	var bean = this.drill_COPi_getCollisionBean();
	if( bean == undefined ){ return []; }
	var point_list = $gameTemp.drill_COPi_getRectPointByBean( bean );
	if( point_list == null ){ return []; }
	return point_list;
}


//=============================================================================
// ** ☆碰撞体判定实现
//
//			说明：	> 此模块管理 鼠标与实体类 的判定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 碰撞体判定实现 - 点是否在当前碰撞体内（私有）
//==============================
Game_Picture.prototype.drill_COPi_isPointInCollisionBean_Private = function( x0, y0 ){
	var bean = this.drill_COPi_getCollisionBean();
	if( bean == undefined ){ return false; }
	if( bean['_drill_visible'] == false ){ return false; }
	
	// > 获取矩形的四个顶点
	var point_list = $gameTemp.drill_COPi_getRectPointByBean( bean );
	if( point_list == null ){ return false; }
	
	// > 凸多边形判断
	var result = $gameTemp.drill_COPi_Math2D_isPointInConvexPolygon( x0, y0, point_list );
	if( result == true ){ return true; }
	return false;
}
//==============================
// * 碰撞体判定实现 - 数学工具 - 获取两点的叉乘/向量积
//			
//			参数：	> x1,y1 数字   （第1个点）
//					> x2,y2 数字   （第2个点）
//			返回：	> 数字         （叉乘/向量积）
//			
//			说明：	> 注意点的先后顺序，另外该函数不存在无解的情况。
//==============================
Game_Temp.prototype.drill_COPi_Math2D_getCrossMultiplication = function( x1,y1,x2,y2 ){
    return x1*y2 - x2*y1;
}
//==============================
// * 碰撞体判定实现 - 数学工具 - 判断点是否在凸多边形内
//			
//			参数：	> x0,y0 数字     （目标点）
//					> [{ x:0, y:0 }] （目标凸多边形，注意点的顺序，必须顺时针/逆时针）
//			返回：	> 布尔           （是/否）
//					> null           （无解）
//			
//			说明：	> 要留意无解的情况，并做相关处理。
//					> 凸多边形一定要保证点的顺序，顺序不对返回的全是false，最好先画出来看一下多边形。
//					> 多边形的连接线上也会返回true。
//==============================
Game_Temp.prototype.drill_COPi_Math2D_isPointInConvexPolygon = function( x0,y0, point_list ){
	
	// > 检查是否为合法多边形
	if( point_list.length < 3 ){ return null; }
	
	// > 多边形点遍历
	for(var i = 0; i < point_list.length; i++ ){
		var i_next =  (i+1) % point_list.length;
		var i_next2 = (i+2) % point_list.length;
		
		// > 每次往后取三个点
		var x1 = point_list[i].x;
		var y1 = point_list[i].y;
		var x2 = point_list[i_next].x;
		var y2 = point_list[i_next].y;
		var x3 = point_list[i_next2].x;
		var y3 = point_list[i_next2].y;
		
		// > 计算 目标点 到三点的向量值
		var v_x1 = x1 - x0;
		var v_y1 = y1 - y0;
		var v_x2 = x2 - x0;
		var v_y2 = y2 - y0;
		var v_x3 = x3 - x0;
		var v_y3 = y3 - y0;
		
		// > 计算是否同向
		var cross_1_2 = this.drill_COPi_Math2D_getCrossMultiplication( v_x1,v_y1, v_x2,v_y2 );
		var cross_2_3 = this.drill_COPi_Math2D_getCrossMultiplication( v_x2,v_y2, v_x3,v_y3 );
		if( cross_1_2*cross_2_3 < 0 ){
			return false;
		}
	}
	return true;
}


//=============================================================================
// ** ☆碰撞体与点变换
//
//			说明：	> 此模块管理 鼠标与实体类 的判定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 碰撞体与点变换 - 获取矩形的四个顶点（开放函数）
//
//			说明：	> 返回 缩放/旋转/斜切 变换后的四个顶点。如果为null表示无法获取。
//==============================
Game_Temp.prototype.drill_COPi_getRectPointByBean = function( bean ){
	
	// > 缩放/旋转值
	var rotation = bean['_drill_rotate'];	//（弧度值）
	var scale_x = bean['_drill_scale_x'];
	var scale_y = bean['_drill_scale_y'];
	var skew_x = bean['_drill_skew_x'];
	var skew_y = bean['_drill_skew_y'];
	
	// > 矩形的四个点 + 执行缩放/旋转（顺时针顺序）
	var ww = bean['_drill_frameW'];
	var hh = bean['_drill_frameH'];
	if( ww == 0 ){ return null; }
	if( hh == 0 ){ return null; }
	
	var x0 = bean['_drill_x'];					//（矩形的中心点，就是xy位置）
	var y0 = bean['_drill_y'];
	var xx = x0 - ww * bean['_drill_anchor_x'];	//（矩形的左上角点）
	var yy = y0 - hh * bean['_drill_anchor_y'];
	var p1 = $gameTemp.drill_COPi_Math2D_getPointWithTransform( xx+0,  yy+0,  x0,y0, rotation,scale_x,scale_y,skew_x,skew_y );
	var p2 = $gameTemp.drill_COPi_Math2D_getPointWithTransform( xx+ww, yy+0,  x0,y0, rotation,scale_x,scale_y,skew_x,skew_y );
	var p3 = $gameTemp.drill_COPi_Math2D_getPointWithTransform( xx+ww, yy+hh, x0,y0, rotation,scale_x,scale_y,skew_x,skew_y );
	var p4 = $gameTemp.drill_COPi_Math2D_getPointWithTransform( xx+0,  yy+hh, x0,y0, rotation,scale_x,scale_y,skew_x,skew_y );
	
	// > 顶点列表
	var point_list = [];
	point_list.push( p1 );
	point_list.push( p2 );
	point_list.push( p3 );
	point_list.push( p4 );
	return point_list;
}
//==============================
// * 碰撞体与点变换 - 某点经过碰撞体的正向变换（开放函数）
//
//			说明：	> 返回 缩放/旋转/斜切 变换后的顶点。如果为null表示无法获取。
//==============================
Game_Temp.prototype.drill_COPi_getPointByBeanTransform = function( x,y, bean ){
	if( bean['_drill_frameW'] == 0 ){ return null; }
	if( bean['_drill_frameH'] == 0 ){ return null; }
	return $gameTemp.drill_COPi_Math2D_getPointWithTransform(
			x,y,
			bean['_drill_x'],bean['_drill_y'],	//（矩形的中心点，就是xy位置）
			bean['_drill_rotate'],				//（弧度值）
			bean['_drill_scale_x'],bean['_drill_scale_y'],
			bean['_drill_skew_x'],bean['_drill_skew_y']
		);
}
//==============================
// * 碰撞体与点变换 - 某点经过碰撞体的反向变换（开放函数）
//
//			说明：	> 已知变换后的点，返回 缩放/旋转/斜切 变换前的点。如果为null表示无法获取。
//==============================
Game_Temp.prototype.drill_COPi_getPointByBeanTransformInversed = function( x,y, bean ){
	if( bean['_drill_frameW'] == 0 ){ return null; }
	if( bean['_drill_frameH'] == 0 ){ return null; }
	return $gameTemp.drill_COPi_Math2D_getPointWithTransformInversed(
			x,y,
			bean['_drill_x'],bean['_drill_y'],	//（矩形的中心点，就是xy位置）
			bean['_drill_rotate'],				//（弧度值）
			bean['_drill_scale_x'],bean['_drill_scale_y'],
			bean['_drill_skew_x'],bean['_drill_skew_y']
		);
}
//==============================
// * 碰撞体与点变换 - 数学工具 - 矩阵点的变换/点A绕点B旋转缩放斜切
//			
//			参数：	> cur_x,cur_y 数字       （需要变换的点）
//					> center_x,center_y 数字 （矩形中心点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字     （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }           （变换后的坐标）
//			
//			说明：	> 矩阵内或矩阵外一个点，能够根据矩阵的 旋转+缩放+斜切 一并变换。
//					  旋转+缩放+斜切 可为负数。
//==============================
Game_Temp.prototype.drill_COPi_Math2D_getPointWithTransform = function( 
					cur_x,cur_y,						//需要变换的点 
					center_x,center_y, 					//矩形中心点 
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
	var dx = (cur_x - center_x);
	var dy = (cur_y - center_y);
    var tar_x = center_x + (dx * a + dy * c);
    var tar_y = center_y + (dx * b + dy * d);
	
	return { "x":tar_x, "y":tar_y };
}
//==============================
// * 碰撞体与点变换 - 数学工具 - 矩阵点的变换（逆向）/点A绕点B旋转缩放斜切（逆向）
//			
//			参数：	> tar_x,tar_y 数字       （变换后的坐标）
//					> center_x,center_y 数字 （矩形中心点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字     （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }           （变换前的点）
//			
//			说明：	> 同样的函数，能够将正向函数的结果值，扳回成正向函数的最初值。
//==============================
Game_Temp.prototype.drill_COPi_Math2D_getPointWithTransformInversed = function( 
					tar_x,tar_y,						//需要变换的点 
					center_x,center_y, 					//矩形中心点 
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
	
	// > 逆向公式
	var cur_y = (-tar_x*b +tar_y*a +center_x*b +center_y*(d*a - c*b - a)) / (d*a - c*b);
	var cur_x;
	if( Math.abs(a) > 0.01 ){	//（rotation为 0.5π/1.5π时，a无限接近0，所以换另一个公式）
		cur_x = (-tar_x + center_x - center_x*a + cur_y*c - center_y*c )/(-a);
	}else{
		cur_x = (-tar_y + center_y - center_x*b + cur_y*d - center_y*d )/(-b);
	}
	
	return { "x":cur_x, "y":cur_y };
}


//=============================================================================
// ** ☆DEBUG碰撞体范围
//
//			说明：	> 此模块专门管理 DEBUG碰撞体范围 显示功能。
//					> 注意，只显示。这个模块删掉也不会影响主功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG碰撞体范围 - 帧刷新（地图界面）
//==============================
var _drill_COPi_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COPi_debugMap_update.call(this);
    this.drill_COPi_updateDrawBeanRangeSprite();		//帧刷新 - 初始化贴图
    this.drill_COPi_updateDrawBeanRangeBitmap();		//帧刷新 - 绘制范围
}
//==============================
// * DEBUG碰撞体范围 - 帧刷新 初始化贴图
//==============================
Scene_Map.prototype.drill_COPi_updateDrawBeanRangeSprite = function() {
	
	// > 功能关闭时
	if( $gameSystem._drill_COPi_DebugEnabled != true ){
		
		// > 销毁贴图
		if( this._drill_COPi_DebugSprite != undefined ){
			this.removeChild(this._drill_COPi_DebugSprite);
			this._drill_COPi_DebugSprite = undefined;
		}
		
	// > 功能开启时
	}else{
		
		// > 创建贴图
		if( this._drill_COPi_DebugSprite == undefined ){
			var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
			var temp_sprite = new Sprite();
			temp_sprite.x = 0;
			temp_sprite.y = 0;
			temp_sprite.bitmap = temp_bitmap;
			this.addChild( temp_sprite );	//（直接加在最顶层的上面）
			this._drill_COPi_DebugSprite = temp_sprite;
		}
	}
}
//==============================
// * DEBUG碰撞体范围 - 帧刷新 绘制范围
//==============================
Scene_Map.prototype.drill_COPi_updateDrawBeanRangeBitmap = function() {
	if( this._drill_COPi_DebugSprite == undefined ){ return; }
	
	// > 清空绘制
	var temp_bitmap = this._drill_COPi_DebugSprite.bitmap;
	temp_bitmap.clear();
	
	// > 图片遍历『图片与多场景』（显示所有图片的悬停范围）
	var i_offset = 0;							//地图界面的图片
	var pic_length = $gameScreen.maxPictures();
	if( $gameParty.inBattle() == true ){		//战斗界面的图片
		i_offset = pic_length;
	}
	for(var i = 0; i < pic_length; i++ ){
		var picture = $gameScreen._pictures[ i + i_offset ];
		if( picture == undefined ){ continue; }
		
		// > 强制 绑定碰撞体
		picture.drill_COPi_checkCollisionBean();
		var bean = picture.drill_COPi_getCollisionBean();
		
		// > 绘制 - 颜色标记
		var color_line = "rgb(100,180,225)";
		var color_text = "rgb(100,180,225)";
		var color_background = "rgba(100,180,225,0.2)";
		
		// > 绘制 - 获取矩形的四个顶点
		var point_list = $gameTemp.drill_COPi_getRectPointByBean( bean );
		if( point_list == null ){ continue; }
		
		// > 绘制 - 绘制凸多边形
		temp_bitmap.drill_COPi_drawPolygon( point_list, color_background, color_line, 2, "miter" );
		
		// > 绘制 - ID编号
		var pic_id_str = String(i);
		var painter = temp_bitmap._context;
        painter.save();										//（a.存储上一个画笔状态）
        painter.font = temp_bitmap._makeFontNameText();		//（b.设置样式）
		painter.fillStyle = color_text;
		painter.strokeStyle = "rgba(0,0,0,0.7)";
		painter.lineWidth = 4;
		painter.lineJoin = 'round';
		painter.strokeText( pic_id_str, 					//（c.路径填充/描边，fillText）
			point_list[0].x+10, point_list[0].y+30, 60 );
		painter.fillText( pic_id_str, 				
			point_list[0].x+10, point_list[0].y+30, 60 );
		painter.restore();									//（d.回滚上一个画笔状态）
		
		// > 绘制 - 矩形中心点
		temp_bitmap.drawCircle( bean['_drill_x'], bean['_drill_y'], 9, color_line );
		temp_bitmap.drawCircle( bean['_drill_x'], bean['_drill_y'], 5, "#ff0000" );
	}
}
//==============================
// * DEBUG碰撞体范围 - 帧刷新（战斗界面）
//==============================
var _drill_COPi_debugBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	_drill_COPi_debugBattle_update.call( this );
    this.drill_COPi_updateDrawBeanRangeSprite();		//帧刷新 - 初始化贴图
    this.drill_COPi_updateDrawBeanRangeBitmap();		//帧刷新 - 绘制范围
}
//==============================
// * DEBUG碰撞体范围 - 函数赋值『图片与多场景』
//==============================
Scene_Battle.prototype.drill_COPi_updateDrawBeanRangeSprite = Scene_Map.prototype.drill_COPi_updateDrawBeanRangeSprite;
Scene_Battle.prototype.drill_COPi_updateDrawBeanRangeBitmap = Scene_Map.prototype.drill_COPi_updateDrawBeanRangeBitmap;

//==============================
// * DEBUG碰撞体范围 - 几何绘制 - 填充+描边多边形
//			
//			参数：	> fill_color 字符串   （填充颜色）
//					> stroke_color 字符串 （描边颜色）
//					> lineWidth 数字      （线宽）
//					> lineJoin 字符串     （连接处，包含miter/round/bevel 尖角/圆角/斜角，默认miter）
//			说明：	> 该函数不会对参数进行任何校验，绘制前一定要确保参数完整。
//					> 该函数包含多边形闭合处理。
//==============================
Bitmap.prototype.drill_COPi_drawPolygon = function( point_list, fill_color, stroke_color, lineWidth, lineJoin ){
    var painter = this._context;
    painter.save();						//（a.存储上一个画笔状态）
	
    painter.fillStyle = fill_color;		//（b.设置样式）
    painter.strokeStyle = stroke_color;
	painter.lineWidth = lineWidth;
	painter.lineJoin = lineJoin;
	
    painter.beginPath();				//（c.路径填充/描边，注意 beginPath + fill + stroke）
	painter.moveTo( point_list[0].x, point_list[0].y );
	for(var i = 1; i < point_list.length; i++ ){
		painter.lineTo( point_list[i].x, point_list[i].y );
	}
    painter.closePath();
	painter.fill();
	painter.stroke();
	
	painter.restore();					//（d.回滚上一个画笔状态）
    this._setDirty();
};




//#############################################################################
// ** 【标准模块】战斗层级 ☆图片的战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，图片对象层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Battle.prototype.drill_COPi_layerAddSprite = function( sprite, layer_index ){
	this.drill_COPi_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_COPi_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_COPi_sortByZIndex = function () {
    this.drill_COPi_sortByZIndex_Private();
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_COPi_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_COPi_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_COPi_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_COPi_battle_createAllWindows.call(this);		//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 参数定义
//
//			说明：	> 所有drill插件的贴图都用唯一参数：zIndex（可为小数、负数），其它插件没有此参数定义。
//==============================
if( typeof(_drill_sprite_zIndex) == "undefined" ){						//（防止重复定义）
	var _drill_sprite_zIndex = true;
	Object.defineProperty( Sprite.prototype, 'zIndex', {
		set: function( value ){
			this.__drill_zIndex = value;
		},
		get: function(){
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_COPi_sortByZIndex_Private = function() {
	this._spriteset._pictureContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_COPi_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "图片对象层" ){
		this._spriteset._pictureContainer.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
};


//#############################################################################
// ** 【标准模块】地图层级 ☆图片的地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，图片对象层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_COPi_layerAddSprite = function( sprite, layer_index ){
	this.drill_COPi_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_COPi_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_COPi_sortByZIndex = function () {
    this.drill_COPi_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_COPi_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_COPi_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_COPi_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_COPi_layer_createAllWindows.call(this);		//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 参数定义
//
//			说明：	> 所有drill插件的贴图都用唯一参数：zIndex（可为小数、负数），其它插件没有此参数定义。
//==============================
if( typeof(_drill_sprite_zIndex) == "undefined" ){						//（防止重复定义）
	var _drill_sprite_zIndex = true;
	Object.defineProperty( Sprite.prototype, 'zIndex', {
		set: function( value ){
			this.__drill_zIndex = value;
		},
		get: function(){
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_COPi_sortByZIndex_Private = function() {
	this._spriteset._pictureContainer.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_COPi_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "图片对象层" ){
		this._spriteset._pictureContainer.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_mapPicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
};


//#############################################################################
// ** 【标准模块】层级与堆叠级 ☆层级与堆叠级
//#############################################################################
//##############################
// * 层级与堆叠级 - 刷新层级【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 如果某个 子插件 修改了层级相关自定义属性，需要调用此函数刷新一次。
//##############################
Game_Temp.prototype.drill_COPi_needRefreshSpriteLayer = function(){
	this._drill_COPi_needRefreshSpriteLayer = true;
};
//##############################
// * 层级与堆叠级 - 刷新堆叠级【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 如果某个 子插件 修改了堆叠级相关自定义属性，需要调用此函数刷新一次。
//##############################
Game_Temp.prototype.drill_COPi_needRefreshSpriteZIndex = function(){
	this._drill_COPi_needRefreshSpriteZIndex = true;
};
//##############################
// * 层级与堆叠级 - 设置层级时【标准接口】
//
//			参数：	> temp_sprite 对象 （图片贴图）
//					> picture_id 数字  （图片id）
//			返回：	> 无
//					
//			说明：	> 该函数在 刷新时+有图片数据时 会被调用。
//					> 可以修改贴图属性 _drill_layer 实现指定图片的自定义层级。
//					  如果没有任何操作，则默认值为 "图片对象层"。
//					> 继承时，不需要考虑具体原理，只要知道赋值字符串能修改层级即可。
//					  另外具体实现见功能模块：图片的战斗层级 + 图片的地图层级。
//##############################
Game_Temp.prototype.drill_COPi_whenRefreshLayer = function( temp_sprite, picture_id ){
	
	//（待子类继承写内容）
	
};
//##############################
// * 层级与堆叠级 - 设置堆叠级时【标准接口】
//
//			参数：	> temp_sprite 对象 （图片贴图）
//					> picture_id 数字  （图片id）
//			返回：	> 无
//					
//			说明：	> 该函数在 刷新时+有图片数据时 会被调用。
//					> 可以修改贴图属性 zIndex 实现指定图片的自定义堆叠级。
//					  如果没有任何操作，则默认值为 图片id值。
//##############################
Game_Temp.prototype.drill_COPi_whenRefreshZIndex = function( temp_sprite, picture_id ){
	
	//（待子类继承写内容）
	
};


//=============================================================================
// ** ☆层级控制
//
//			说明：	> 此模块提供 层级 的控制。
//					  这里只提供【贴图的层级】定义，没有数据的定义，不要定义冗余的参数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 层级控制 - 初始化绑定
//==============================
var _drill_COPi_layer_createPictures = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function(){
	_drill_COPi_layer_createPictures.call(this);
	$gameTemp._drill_COPi_needRefreshSpriteLayer = true;
};
//==============================
// * 层级控制 - 帧刷新（地图界面）
//==============================
var _drill_COPi_layer_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_COPi_layer_map_update.call(this);
	this.drill_COPi_updateLayer();
}
//==============================
// * 层级控制 - 帧刷新
//==============================
Scene_Map.prototype.drill_COPi_updateLayer = function() {
	if( !$gameTemp._drill_COPi_needRefreshSpriteLayer ){ return; }
	$gameTemp._drill_COPi_needRefreshSpriteLayer = false;
	
	var sprite_list = $gameTemp.drill_COPi_getAllPictureSprite();
	for(var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		
		var picture = temp_sprite.picture();
		if( picture != undefined ){
			var picture_id = picture.drill_COPi_getPictureId();
			
			// > 设置层级
			temp_sprite._drill_layer = "图片对象层";
			
			// > 设置层级时
			$gameTemp.drill_COPi_whenRefreshLayer( temp_sprite, picture_id );
			
			// > 应用设置（添加贴图到层级【标准函数】）
			this.drill_COPi_layerAddSprite( temp_sprite, temp_sprite._drill_layer );
			
			
		// > 无数据时『图片数据根除时』
		}else{
			
			// > 设置层级
			temp_sprite._drill_layer = "图片对象层";
			
			// > 设置层级时
			//	（无）
			
			// > 应用设置（添加贴图到层级【标准函数】）
			this.drill_COPi_layerAddSprite( temp_sprite, temp_sprite._drill_layer );
		}
	}
}
//==============================
// * 层级控制 - 帧刷新（战斗界面）
//==============================
var _drill_COPi_layer_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_COPi_layer_battle_update.call(this);
	this.drill_COPi_updateLayer();
}
//==============================
// * 层级控制 - 函数赋值『图片与多场景』
//==============================
Scene_Battle.prototype.drill_COPi_updateLayer = Scene_Map.prototype.drill_COPi_updateLayer;



//=============================================================================
// ** ☆堆叠级控制
//
//			说明：	> 此模块提供 堆叠级 的控制。
//					  这里只提供【贴图的堆叠级】定义，没有数据的定义，不要定义冗余的参数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 堆叠级控制 - 初始化绑定
//==============================
var _drill_COPi_zIndex_createPictures = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function(){
	_drill_COPi_zIndex_createPictures.call(this);
	$gameTemp._drill_COPi_needRefreshSpriteZIndex = true;
};
//==============================
// * 堆叠级控制 - 帧刷新（地图界面）
//==============================
var _drill_COPi_zIndex_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_COPi_zIndex_map_update.call(this);
	this.drill_COPi_updateZIndex();
}
//==============================
// * 堆叠级控制 - 帧刷新
//==============================
Scene_Map.prototype.drill_COPi_updateZIndex = function() {
	if( !$gameTemp._drill_COPi_needRefreshSpriteZIndex ){ return; }
	$gameTemp._drill_COPi_needRefreshSpriteZIndex = false;
	
	var sprite_list = $gameTemp.drill_COPi_getAllPictureSprite();
	for(var i = 0; i < sprite_list.length; i++ ){
		var temp_sprite = sprite_list[i];
		if( temp_sprite == undefined ){ continue; }
		
		var picture = temp_sprite.picture();
		if( picture != undefined ){
			var picture_id = picture.drill_COPi_getPictureId();
			
			// > 设置堆叠级
			temp_sprite.zIndex = picture_id;
			
			// > 设置堆叠级时
			$gameTemp.drill_COPi_whenRefreshZIndex( temp_sprite, picture_id );
			
			
		// > 无数据时『图片数据根除时』
		}else{
			
			// > 设置堆叠级
			temp_sprite.zIndex = temp_sprite._pictureId;	//（数据没了，只能按索引值进行排序）
			
			// > 设置堆叠级时
			//	（无）
		}
	}
	
	// > 应用设置（图片层级排序【标准函数】）
	this.drill_COPi_sortByZIndex();
}
//==============================
// * 堆叠级控制 - 帧刷新（战斗界面）
//==============================
var _drill_COPi_zIndex_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_COPi_zIndex_battle_update.call(this);
	this.drill_COPi_updateZIndex();
}
//==============================
// * 堆叠级控制 - 函数赋值『图片与多场景』
//==============================
Scene_Battle.prototype.drill_COPi_updateZIndex = Scene_Map.prototype.drill_COPi_updateZIndex;

