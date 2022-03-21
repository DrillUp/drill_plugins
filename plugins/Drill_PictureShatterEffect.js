//=============================================================================
// Drill_PictureShatterEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        图片 - 方块粉碎效果
 * @author Drill_up
 * 
 *
 * @help  
 * =============================================================================
 * +++ Drill_PictureShatterEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得图片能播放方块状的粉碎效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件不能单独运行，必须要基于核心才能运行：
 * 基于：
 *   - Drill_CoreOfShatterEffect    系统-方块粉碎核心★★v1.3及以上版本★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：图片界面、战斗界面。
 *   作用于rmmv图片。
 * 2.想要更多了解方块粉碎，去看看 "1.系统 > 方块粉碎大家族.docx"。
 * 细节:
 *   (1.图片的粉碎效果为临时性的，如果切换图片资源 或 切换
 *      菜单，图片会恢复原状。
 *   (2.粉碎后，图片的本体还在。你需要手动删除图片。
 *   (3.注意，方块粉碎持续时间，在不同粉碎效果中的设置不同。
 *      播放粉碎效果时，要留意等待粉碎完的时间。
 * 设计:
 *   (1.你可以用图片表示某玻璃球、水晶、圣物，被某种邪恶力量侵蚀
 *      而被粉碎。然后播放粉碎动画效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要设置指定图片播放方块粉碎效果：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 图片[1] : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 图片[1] : 方块反转粉碎[1]
 * 插件指令：>方块粉碎效果 : 图片[1] : 立刻复原
 * 
 * 1."方块粉碎[1]"对应 方块粉碎核心 插件中配置的粉碎id。
 * 2.粉碎背景可以有两个过程，先反转拼合在一起，然后破碎。
 *   以此可以制作中间的过渡效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改碎片的消失设置：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 图片碎片 : 消失方式 : 不消失
 * 插件指令：>方块粉碎效果 : 图片碎片 : 消失方式 : 线性消失
 * 插件指令：>方块粉碎效果 : 图片碎片 : 消失方式 : 等一半时间后线性消失
 * 插件指令：>方块粉碎效果 : 图片碎片 : 消失方式 : 设回默认
 * 
 * 1."设回默认"表示设置为当前当前配置的默认的消失方式。
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
 * 时间复杂度： o(n^2)*o(贴图处理)
 * 测试方法：   在各个管理层中添加图片并播放粉碎效果。
 * 测试结果：   200个事件的图片中，平均消耗为：【60.12ms】
 *              100个事件的图片中，平均消耗为：【56.49ms】
 *               50个事件的图片中，平均消耗为：【48.16ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.方块粉碎是性能消耗大户，因为粉碎后图片实际上被分成了m*n块新贴图碎片。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 3.图片粉碎的消耗和事件数量关系不大，并且低配电脑能够比较流畅地播放粉碎
 *   效果。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了与核心的部分兼容设置。
 * [v1.2]
 * 添加了插件指令图片检查。
 * [v1.3]
 * 修复了图片刚创建时，就执行粉碎出错的bug。
 * 
 * 
 * @param 默认图片碎片消失方式
 * @type select
 * @option 不消失
 * @value 不消失
 * @option 线性消失
 * @value 线性消失
 * @option 等一半时间后线性消失
 * @value 等一半时间后线性消失
 * @desc 碎片消失的方式。
 * @default 线性消失
 * 
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PSE（Picture_Shatter_Effect）
//		临时全局变量	DrillUp.g_PSE_opacityType
//		临时局部变量	this._drill_PSE_xxx
//		存储数据变量	$gameMap._drill_PSE_opacityType
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理)
//		性能测试因素	对话管理层看粉碎效果
//		性能测试消耗	80.12ms  45.16ms
//		最坏情况		粉碎分割的数量特别多。
//		备注			单张图片似乎和事件贴图消耗差不多，造成的差距可能是测的时候不稳定。
//
//插件记录：
//		★大体框架与功能如下：
//			图片方块粉碎：
//				->粉碎配置
//					->普通粉碎
//					->扩散粉碎
//					->抛物线粉碎
//					->弹道反向
//				->流程中的特殊情况
//					->贴图框架frame - bitmap_url/frame.x.y.w.h
//
//		★必要注意事项：
//			1.使用粉碎前，一定要想明白【贴图框架frame】的分配问题，
//				1) bitmap会不会实时变，是bitmap资源，还是实时bitmap？
//				2) 如果 frameWidth = 0 怎么办？如果bitmap为空怎么办？
//				3) 执行粉碎后，保持粉碎状态是一直持续的，除非执行复原。那么是否要锁定sprite的时间轴？
//				-1- 该插件为资源bitmap，资源变化后，不会立即改变碎片
//				-2- 该插件要杜绝frameWidth=0，建立了缓冲width，bitmap为空时，不会刷新缓冲。
//				-3- 该插件不锁定时间轴，粉碎效果为临时性的。刷菜单会复原。
//			2.这里的bitmap并没有完全消失，opacity也是255，只是被切割成0了。
//			
//		★其它说明细节：
//			1.picture的结构与character的结构非常相似，都需要考虑frame变动问题。
//			  只是picture没有被锁定时间，刷菜单会重建。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureShatterEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureShatterEffect');
	
	DrillUp.g_PSE_opacityType = String(DrillUp.parameters['默认图片碎片消失方式'] || "线性消失");	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfShatterEffect ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_PSE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_PSE_pluginCommand.call(this, command, args);
	if (command === ">方块粉碎效果") { // >方块粉碎效果 : 图片[1] : 方块粉碎[1]
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
					
			if( type.indexOf("图片[") != -1 ){
				var pic_id = type.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
					
				if( temp1.indexOf("方块粉碎[") != -1 ){
					temp1 = temp1.replace("方块粉碎[","");
					temp1 = temp1.replace("]","");
					
					if( $gameScreen.drill_PSE_isPictureExist( pic_id ) == false ){ return; }
					var pic = $gameScreen.picture( pic_id );
					pic._drill_PSE['shatter_command'] = true;
					pic._drill_PSE['shatter_id'] = Number(temp1)-1;
					pic._drill_PSE['shatter_converted'] = false;
				}
				if( temp1.indexOf("方块反转粉碎[") != -1 ){
					temp1 = temp1.replace("方块反转粉碎[","");
					temp1 = temp1.replace("]","");
					
					if( $gameScreen.drill_PSE_isPictureExist( pic_id ) == false ){ return; }
					var pic = $gameScreen.picture( pic_id );
					pic._drill_PSE['shatter_command'] = true;
					pic._drill_PSE['shatter_id'] = Number(temp1)-1;
					pic._drill_PSE['shatter_converted'] = true;
				}
				if( temp1 == "立刻复原" ){
					if( $gameScreen.drill_PSE_isPictureExist( pic_id ) == false ){ return; }
					$gameScreen.picture(pic_id)._drill_PSE['redraw_command'] = true;
				}
			}
		}
		if(args.length == 6){		//>方块粉碎效果 : 图片碎片 : 消失方式 : 不消失
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "图片碎片" && temp1 == "消失方式" ){
				if( temp2 == "设回默认" ){
					$gameSystem._drill_PSE['opacityType'] = DrillUp.g_PSE_opacityType;
				}else{
					$gameSystem._drill_PSE['opacityType'] = temp1;
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PSE_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureShatterEffect.js 图片 - 方块粉碎效果】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};


//=============================================================================
// * 存储数据初始化
//=============================================================================
var _drill_PSE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_PSE_sys_initialize.call(this);
	this._drill_PSE_opacityType = DrillUp.g_PSE_opacityType;
}

//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _drill_PSE_pic_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
    _drill_PSE_pic_initialize.call(this);
	this._drill_PSE = {};
	this._drill_PSE['shatter_activated'] = false;			//碎片激活
	this._drill_PSE['shatter_command'] = false;				//碎片指令
	this._drill_PSE['shatter_id'] = -1;						//当前碎片样式id
	this._drill_PSE['shatter_converted'] = false;			//反向弹道
	this._drill_PSE['redraw_command'] = false;				//重画指令
}
//=============================================================================
// ** 贴图
//=============================================================================
//==============================
// * 贴图框架 - 初始化
//==============================
var _drill_PSE_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function(pictureId) {
    _drill_PSE_sp_initialize.call(this,pictureId);
	this.drill_PSE_initBitmapFrame();		//贴图框架
}
//==============================
// * 贴图 - 帧刷新
//==============================
var _drill_PSE_pic_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {	
	
	// > bitmap识别（必须放前面）
	this.drill_PSE_updateBitmapFrame();
	
	// > 帧刷新
	_drill_PSE_pic_update.call(this);
	
	if( !this.picture() ){ return; }
	if( !this.bitmap ){ return; }
	if( !this.bitmap.isReady() ){ return; }		//（需要等图片加载完毕后才能进行粉碎）
	this._drill_PSE = this.picture()._drill_PSE;
	
	// > 粉碎指令
	if( this._drill_PSE['shatter_command'] == true ) {
		this._drill_PSE['shatter_command'] = false;
		
		var data = {
			"frameX":this._drill_PSE_frame_x,
			"frameY":this._drill_PSE_frame_y,
			"frameW":this._drill_PSE_frame_w,
			"frameH":this._drill_PSE_frame_h,
			"shatter_id":this._drill_PSE['shatter_id'],							//粉碎样式
			"shatter_converted":this._drill_PSE['shatter_converted'],			//反向弹道
			"shatter_opacityType":$gameSystem._drill_PSE_opacityType,			//透明度变化方式
		};
		this.drill_COSE_setShatter( data,this._drill_PSE_bitmap );				//方块粉碎核心 - 初始化
		this._drill_PSE['shatter_activated'] = true;
	}
	
	// > 复原指令
	if( this._drill_PSE['redraw_command'] == true ) {
		this._drill_PSE['redraw_command'] = false;
		this.drill_COSE_restoreShatter();				//方块粉碎核心 - 复原
		this._drill_PSE['shatter_activated'] = true;
	}
	
	// > 粉碎时图像隐藏
	if( this._drill_PSE['shatter_activated'] == true ){
		if( this.drill_COSE_isShattering() ){
			this.setFrame(0,0,0,0);
		}else if( this._realFrame.width == 0 && this._realFrame.height == 0 ){		//修改frame后，恢复显示
			this.setFrame(this._drill_PSE_frame_x,this._drill_PSE_frame_y,this._drill_PSE_frame_w,this._drill_PSE_frame_h);
		}
	}
};
//=============================================================================
// ** 贴图框架
//=============================================================================
//==============================
// * 贴图框架 - 初始化
//==============================
Sprite_Picture.prototype.drill_PSE_initBitmapFrame = function() {
	this._drill_PSE_bitmap = null;			//框架 - obj对象
	this._drill_PSE_bitmap_url = "";		//框架 - 资源路径
	this._drill_PSE_frame_x = -1;			//框架 - x
	this._drill_PSE_frame_y = -1;			//框架 - y
	this._drill_PSE_frame_w = 0;			//框架 - w
	this._drill_PSE_frame_h = 0;			//框架 - h
}
//==============================
// * 贴图框架 - bitmap识别（必须放前面）
//==============================
Sprite_Picture.prototype.drill_PSE_updateBitmapFrame = function() {
	if( this.bitmap &&
		this.bitmap.isReady() &&
		(	this._drill_PSE_bitmap_url != this.bitmap._url ||
			this._drill_PSE_frame_x != this._realFrame.x ||
			this._drill_PSE_frame_y != this._realFrame.y ||
			this._drill_PSE_frame_w != this._realFrame.width ||
			this._drill_PSE_frame_h != this._realFrame.height )
		){
		this._drill_PSE_bitmap_url = this.bitmap._url;
		
		if( this._drill_PSE_bitmap_url != "" && 
			this._realFrame.width != 0 &&
			this._realFrame.height != 0 ){
			this._drill_PSE_bitmap = this.bitmap;				//记录行走图数据，确保变成空行走图时，不会丢失bitmap
			this._drill_PSE_frame_x = this._realFrame.x;		//与行走图类型无关
			this._drill_PSE_frame_y = this._realFrame.y;
			this._drill_PSE_frame_w = this._realFrame.width;
			this._drill_PSE_frame_h = this._realFrame.height;
		}
	}
}

//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureShatterEffect = false;
		alert(
			"【Drill_PictureShatterEffect.js 行走图-方块粉碎效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfShatterEffect 系统-方块粉碎核心"
		);
}



