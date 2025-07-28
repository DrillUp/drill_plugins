//=============================================================================
// Drill_CoreOfPictureWithMouse.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        图片 - 图片与鼠标控制核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfPictureWithMouse +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该核心提供图片与鼠标控制的基本功能，包括判定鼠标是否悬停在图片上。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfInput                系统-输入设备核心
 *   - Drill_CoreOfPicture              图片-图片优化核心
 * 可作用于：
 *   - Drill_PictureMouseHoverTrigger   图片-鼠标悬停触发图片
 *   - Drill_PictureDraggable           图片-可拖拽的图片
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   只作用于图片。
 * 2.详细内容可以去看看 "16.图片 > 关于图片与鼠标控制核心.docx"。
 * 细节：
 *   (1.判定范围为图片的 碰撞体范围。
 *      开启"DEBUG碰撞体+悬停查看"可以看见图片的碰撞体与鼠标悬停效果。
 *   (2.悬停判定方式，默认为 碰撞体判定，即图片矩形的范围。
 *      可以修改为 像素判定，据鼠标是否接触到 图片资源的不透明像素点 进行判定。
 * 设计：
 *   (1.你可以通过插件指令"DEBUG碰撞体+悬停查看"，查看图片与鼠标悬停的情况。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - Debug查看
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>图片与鼠标控制核心 : DEBUG碰撞体+悬停查看 : 开启
 * 插件指令：>图片与鼠标控制核心 : DEBUG碰撞体+悬停查看 : 关闭
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 像素判定
 * 你可以通过插件指令手动修改悬停的判定方式：
 * 
 * 插件指令：>图片与鼠标控制核心 : 图片[1] : 修改为像素判定
 * 插件指令：>图片与鼠标控制核心 : 图片变量[1] : 修改为像素判定
 * 插件指令：>图片与鼠标控制核心 : 批量图片[10,11] : 修改为像素判定
 * 插件指令：>图片与鼠标控制核心 : 批量图片变量[21,22] : 修改为像素判定
 * 
 * 插件指令：>图片与鼠标控制核心 : 图片[1] : 修改为碰撞体判定
 * 插件指令：>图片与鼠标控制核心 : 图片[1] : 修改为像素判定
 * 
 * 1.前半部分（图片[1]）和 后半部分（修改为碰撞体判定）
 *   的参数可以随意组合。一共有4*2种组合方式。
 * 2.图片悬停判定方式，默认为 碰撞体判定，即图片矩形的范围。
 * 3."像素判定"是指 根据鼠标是否接触到 图片资源的不透明像素点 进行判定，
 *   接触到不透明的像素点，则表示悬停，接触到透明的像素，则表示离开悬停。
 *   即使图像 旋转、斜切、缩放，此判定也仍然有效。
 *   即使图像 是动态的动画序列，此判定也仍然有效。（但开启此判定会增加性能消耗）
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
 * 测试方法：   在图片管理层进行鼠标悬停范围测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 测试方法2：  在战斗时，进行鼠标悬停范围测试。
 * 测试结果2：  战斗界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件提供实时的 碰撞体+鼠标悬停范围 监听，一般情况下都为
 *   10个以内的多边形范围判断，所以消耗并不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了 像素判定 的功能。
 * [v1.2]
 * 修复了切换地图时悬停判定未刷新的bug。
 * 
 * 
 * @param DEBUG-是否提示找不到图片
 * @type boolean
 * @on 提示
 * @off 关闭提示
 * @desc true - 提示，false - 关闭提示。如果你知道存在此问题但不想弹出此提示，可在配置中关闭此提示。
 * @default true
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COPWM (Core_Of_Picture_With_Mouse)
//		临时全局变量	DrillUp.g_COPWM_xxx
//		临时局部变量	this._drill_COPWM_xxx
//		存储数据变量	$gameSystem._drill_COPWM_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	2024/5/2：
//							》0.2ms（drill_COPWM_updateDrawBeanRangeSprite）
//		★最坏情况		暂无
//		★备注			该核心就是为了把所有 鼠标悬停判定 都集中到一起，节省性能消耗。
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
//			->☆鼠标悬停监听
//				->执行绑定【标准函数】
//				->解除绑定【标准函数】
//				->鼠标是否正在悬停【标准函数】
//			
//			->☆图片的属性
//				->数据
//					->初始化 数据
//					->删除数据
//					->消除图片
//					->消除图片（command235）
//			->☆悬停判定
//				->是否在 碰撞体 范围内
//				->是否在 像素判定 范围内
//			->☆优化控制
//				->初始化8帧关闭悬停
//				->同一贴图+同一帧中 被多次调用 优化
//			
//			->☆DEBUG悬停范围
//				->地图界面的图片
//				->战斗界面的图片
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			16.图片 > 关于图片优化核心（脚本）.docx
//			16.图片 > 关于图片与鼠标控制核心（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.插件提供了 标准函数 ，子插件只要在适当位置调用 标准函数 即可。
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
	DrillUp.g_COPWM_PluginTip_curName = "Drill_CoreOfPictureWithMouse.js 图片-图片与鼠标控制核心";
	DrillUp.g_COPWM_PluginTip_baseList = [
		"Drill_CoreOfInput.js 系统-输入设备核心",
		"Drill_CoreOfPicture.js 图片-图片优化核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_COPWM_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_COPWM_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_COPWM_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_COPWM_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_COPWM_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_COPWM_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_COPWM_PluginTip_curName + "】（此提示可在插件中关闭）\n" + //『可关闭提示信息』
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfPictureWithMouse = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfPictureWithMouse');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_COPWM_TipEnabled_PictureNotFind = String(DrillUp.parameters["DEBUG-是否提示找不到图片"] || "true") === "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfPicture ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_COPWM_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_COPWM_pluginCommand.call(this, command, args);
	this.drill_COPWM_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_COPWM_pluginCommand = function( command, args ){
	if( command === ">图片与鼠标控制核心" ){
		
		/*-----------------DEBUG------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			if( temp1 == "DEBUG碰撞体+悬停查看" ){
				if( temp2 == "启用" || temp2 == "开启" || temp2 == "打开" || temp2 == "启动" ){
					$gameSystem._drill_COPWM_DebugEnabled = true;
					$gameSystem._drill_COPi_DebugEnabled = false;	//（【图片-图片优化核心】防止重叠显示）
				}
				if( temp2 == "关闭" || temp2 == "禁用" ){
					$gameSystem._drill_COPWM_DebugEnabled = false;
				}
			}
		}
		
		/*-----------------像素判定------------------*/
		if( args.length == 4 ){
			var pic_str = String(args[1]);
			var type = String(args[3]);
			
			var pics = null;			// 图片对象组
			if( pics == null && pic_str.indexOf("批量图片[") != -1 ){
				pic_str = pic_str.replace("批量图片[","");
				pic_str = pic_str.replace("]","");
				pics = [];
				var temp_arr = pic_str.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_COPWM_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && pic_str.indexOf("批量图片变量[") != -1 ){
				pic_str = pic_str.replace("批量图片变量[","");
				pic_str = pic_str.replace("]","");
				pics = [];
				var temp_arr = pic_str.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_COPWM_isPictureExist( pic_id ) == false ){ continue; }
					var pic = $gameScreen.picture( pic_id );
					pics.push( pic );
				}
			}
			if( pics == null && pic_str.indexOf("图片变量[") != -1 ){
				pic_str = pic_str.replace("图片变量[","");
				pic_str = pic_str.replace("]","");
				var pic_id = $gameVariables.value( Number(pic_str) );
				if( $gameScreen.drill_COPWM_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && pic_str.indexOf("图片[") != -1 ){
				pic_str = pic_str.replace("图片[","");
				pic_str = pic_str.replace("]","");
				var pic_id = Number(pic_str);
				if( $gameScreen.drill_COPWM_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			
			if( pics != null ){
				if( type == "修改为碰撞体判定" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_COPWM_setPixelHoverEnabled( false );
					}
				}
				if( type == "修改为像素判定" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_COPWM_setPixelHoverEnabled( true );
					}
				}
			}
		}
		
	};
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_COPWM_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		if( DrillUp.g_COPWM_TipEnabled_PictureNotFind == true ){	//『可关闭提示信息』
			alert( DrillUp.drill_COPWM_getPluginTip_PictureNotFind( pic_id ) );
		}
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_COPWM_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COPWM_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_COPWM_sys_initialize.call(this);
	this.drill_COPWM_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_COPWM_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_COPWM_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_COPWM_saveEnabled == true ){	
		$gameSystem.drill_COPWM_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_COPWM_initSysData();
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
Game_System.prototype.drill_COPWM_initSysData = function() {
	this.drill_COPWM_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_COPWM_checkSysData = function() {
	this.drill_COPWM_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_COPWM_initSysData_Private = function() {
	
	this._drill_COPWM_DebugEnabled = false;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_COPWM_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_COPWM_DebugEnabled == undefined ){
		this.drill_COPWM_initSysData();
	}
};



//#############################################################################
// ** 【标准模块】鼠标悬停监听 ☆鼠标悬停监听
//#############################################################################
//##############################
// * 鼠标悬停监听 - 执行绑定【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 该函数可以在 图片数据 初始化时 执行，需要子插件手动调用。
//					> 该函数可以放在帧刷新中多次执行。
//##############################
Game_Picture.prototype.drill_COPWM_checkData = function(){
	this.drill_COPi_checkCollisionBean();	//【图片-图片优化核心】绑定碰撞体
	this.drill_COPWM_checkData_Private();
}
//##############################
// * 鼠标悬停监听 - 解除绑定【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//					
//			说明：	> 该函数可以在 图片数据 解除绑定时 执行，需要子插件手动调用。
//					> 如果数据整个被删除，则可以不执行此函数。
//##############################
Game_Picture.prototype.drill_COPWM_removeData = function(){
	this.drill_COPi_removeCollisionBean();	//【图片-图片优化核心】解除碰撞体
	this.drill_COPWM_removeData_Private();
}
//##############################
// * 鼠标悬停监听 - 鼠标是否正在悬停【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//					
//			说明：	> 该函数只对 已绑定 的数据有效，否则一直返回false。
//					  你只需要知道绑定 悬停监听 之后，这个函数能用就行，中间过程不要去管。不要把"碰撞体"这些核心的中间过程写到 子插件 里面了。
//					> 该函数可以放在帧刷新中多次执行。
//					  该函数有优化处理，即使在同一帧中也可以多次反复被调用。
//##############################
Game_Picture.prototype.drill_COPWM_isOnHover = function(){
	return this.drill_COPWM_isOnHover_Private();
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
var _drill_COPWM_mouse_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(){
	this._drill_COPWM_mouseData = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_COPWM_mouse_initialize.call(this);
}
//==============================
// * 图片的属性 - 初始化 数据（私有）
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：mouseData，一对一。
//==============================
Game_Picture.prototype.drill_COPWM_checkData_Private = function(){	
	if( this._drill_COPWM_mouseData != undefined ){ return; }
	this._drill_COPWM_mouseData = {};
	
	this._drill_COPWM_mouseData['op_time'] = -1;				//优化控制（碰撞体） - 帧数标记
	this._drill_COPWM_mouseData['op_result'] = false;			//优化控制（碰撞体） - 当前帧第一次的悬停结果
	
	this._drill_COPWM_mouseData['pixelHoverEnabled'] = false;	//像素判定开关
	this._drill_COPWM_mouseData['op_pixelTime'] = -1;			//优化控制（像素判定） - 帧数标记
	this._drill_COPWM_mouseData['op_pixelResult'] = false;		//优化控制（像素判定） - 当前帧第一次的悬停结果
}
//==============================
// * 图片的属性 - 删除数据（私有）
//==============================
Game_Picture.prototype.drill_COPWM_removeData_Private = function(){
	this._drill_COPWM_mouseData = undefined;
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_COPWM_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_COPWM_p_erase.call( this );
	this.drill_COPWM_removeData();				//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_COPWM_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_COPWM_removeData();		//（删除数据）
	}
	_drill_COPWM_p_erasePicture.call( this, pictureId );
}
//==============================
// * 图片的属性 - 是否启用像素判定（开放函数）
//==============================
Game_Picture.prototype.drill_COPWM_setPixelHoverEnabled = function( enabled ){
	this.drill_COPWM_checkData();
	this._drill_COPWM_mouseData['pixelHoverEnabled'] = enabled;
}



//=============================================================================
// ** ☆悬停判定
//
//			说明：	> 此模块管理 鼠标 的悬停判定。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 悬停判定 - 鼠标是否正在悬停（私有）
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 该函数为悬停判断的 主入口 。
//==============================
Game_Picture.prototype.drill_COPWM_isOnHover_Private = function(){
	
	// > 未绑定属性，跳出
	if( this._drill_COPWM_mouseData == undefined ){ return false; }
	var mouseData = this._drill_COPWM_mouseData;
	
	// > 是否在 像素判定 范围内
	if( mouseData['pixelHoverEnabled'] == true ){
		return this.drill_COPWM_isOnHover_ByPixel();
	}
	
	// > 是否在 碰撞体 范围内
	return this.drill_COPWM_isOnHover_ByCollision();
}
//==============================
// * 悬停判定 - 是否在 碰撞体 范围内
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 检查鼠标是否在碰撞体的范围内。『鼠标落点与实体类范围』
//						镜头与层级 - 无需支持
//						中心锚点   - 已支持（图片-碰撞体 支持）
//						特殊变换   - 已支持（图片-碰撞体 支持，缩放+斜切+旋转）
//						触屏响应   - 暂不明确
//==============================
Game_Picture.prototype.drill_COPWM_isOnHover_ByCollision = function(){
	var mouseData = this._drill_COPWM_mouseData;
	
	// > 优化控制（碰撞体） - 初始化8帧关闭悬停
	//		（防止渐变进入地图时，玩家的鼠标乱晃误点其它贴图）
	//		（防止切换地图时，上一张地图的bean还未销毁，就触发了悬停判定）
	if( $gameTemp._drill_COPWM_op_curTime < 8 ){ return false; }
	
	// > 优化控制（碰撞体）
	//		（如果此函数在 同一贴图+同一帧中 被多次调用）
	//		（那么第一次调用 走正常流程，第二次调用 返回第一次的结果）
	if( mouseData['op_time'] == $gameTemp._drill_COPWM_op_curTime ){
		return mouseData['op_result'];
	}
	mouseData['op_time'] = $gameTemp._drill_COPWM_op_curTime;
	
	
	// > 判定 - 鼠标位置
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	//if( bean[''] == "触屏按下[持续]" ){
	//	_x = TouchInput.x;
	//	_y = TouchInput.y;
	//}
	
	
	// > 判定 - 镜头与层级
	//	（这是图片的层级，图片处于 图片层、最顶层，不需要考虑镜头的偏移）
	
	
	// > 判定 - 碰撞体
	var result = this.drill_COPi_isPointInCollisionBean( _x, _y );	//【图片-图片优化核心】点是否在当前碰撞体内
	mouseData['op_result'] = result;								//（第一次的悬停结果）
	return result;
}
//==============================
// * 悬停判定 - 是否在 像素判定 范围内
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此判定为 碰撞体范围+贴图像素点判定 。
//==============================
Game_Picture.prototype.drill_COPWM_isOnHover_ByPixel = function(){
	var mouseData = this._drill_COPWM_mouseData;
	
	// > 前提条件 - 碰撞体范围
	var is_hover = this.drill_COPWM_isOnHover_ByCollision();
	if( is_hover == false ){ return false; }
	
	
	// > 优化控制（像素判定）
	//		（如果此函数在 同一贴图+同一帧中 被多次调用）
	//		（那么第一次调用 走正常流程，第二次调用 返回第一次的结果）
	if( mouseData['op_pixelTime'] == $gameTemp._drill_COPWM_op_curTime ){
		return mouseData['op_pixelResult'];
	}
	mouseData['op_pixelTime'] = $gameTemp._drill_COPWM_op_curTime;
	
	
	// > 判定 - 鼠标位置
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	
	// > 判定 - 鼠标位置转回成像素图形的位置
	var bean = this.drill_COPi_getCollisionBean();											//【图片-图片优化核心】获取碰撞体
	var org_pos = $gameTemp.drill_COPi_getPointByBeanTransformInversed( _x, _y, bean );		//【图片-图片优化核心】某点经过碰撞体的反向变换
	var x1 = org_pos.x - bean['_drill_x'] + bean['_drill_anchor_x'] * bean['_drill_frameW'];
	var y1 = org_pos.y - bean['_drill_y'] + bean['_drill_anchor_y'] * bean['_drill_frameH'];
	x1 += bean['_drill_frameX'];
	y1 += bean['_drill_frameY'];		//（框架位置）
	
	// > 判定 - 从贴图中获取像素点
	var result = false;
	var temp_sprite = $gameTemp.drill_COPi_getPictureSpriteByPictureId( this.drill_COPi_getPictureId() );	//【图片-图片优化核心】获取图片贴图
	if( temp_sprite != undefined &&
		temp_sprite.bitmap != undefined ){
		var painter = temp_sprite.bitmap._context;
		var pixel_data = painter.getImageData(x1, y1, 1, 1).data;
		if( pixel_data[3] > 10 ){	//（获取到的是rgba，范围都为 0~255，此处为 a > 10 的透明判定）
			result = true;
		}
	}
	
	// > 判定 - 碰撞体
	mouseData['op_pixelResult'] = result;
	return result;
}


//=============================================================================
// ** ☆优化控制
//
//			说明：	> 此模块专门管理 优化 计算量。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 优化控制 - 初始化
//==============================
var _drill_COPWM_optimization_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_COPWM_optimization_initialize.call(this);
    this._drill_COPWM_op_curTime = 0;		//当前帧数
}
//==============================
// * 优化控制 - 初始化（地图界面）
//==============================
var _drill_COPWM_optimizationMap_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function(){
	_drill_COPWM_optimizationMap_initialize.call(this);
    $gameTemp._drill_COPWM_op_curTime = 0;
}
//==============================
// * 优化控制 - 帧刷新（地图界面）
//==============================
var _drill_COPWM_optimizationMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COPWM_optimizationMap_update.call(this);
    $gameTemp._drill_COPWM_op_curTime += 1;
}
//==============================
// * 优化控制 - 初始化（战斗界面）
//==============================
var _drill_COPWM_optimizationBattle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function(){
	_drill_COPWM_optimizationBattle_initialize.call(this);
    $gameTemp._drill_COPWM_op_curTime = 0;
}
//==============================
// * 优化控制 - 帧刷新（战斗界面）『图片与多场景』
//==============================
var _drill_COPWM_optimizationBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _drill_COPWM_optimizationBattle_update.call(this);
    $gameTemp._drill_COPWM_op_curTime += 1;
}


//=============================================================================
// ** ☆DEBUG悬停范围
//
//			说明：	> 此模块专门管理 DEBUG悬停范围 显示功能。
//					> 注意，只显示。这个模块删掉也不会影响主功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG悬停范围 - 帧刷新（地图界面）
//==============================
var _drill_COPWM_debugMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _drill_COPWM_debugMap_update.call(this);
    this.drill_COPWM_updateDrawBeanRangeSprite();		//帧刷新 - 初始化贴图
    this.drill_COPWM_updateDrawBeanRangeBitmap();		//帧刷新 - 绘制范围
}
//==============================
// * DEBUG悬停范围 - 帧刷新 初始化贴图
//==============================
Scene_Map.prototype.drill_COPWM_updateDrawBeanRangeSprite = function() {
	
	// > 功能关闭时
	if( $gameSystem._drill_COPWM_DebugEnabled != true ){
		
		// > 销毁贴图
		if( this._drill_COPWM_DebugSprite != undefined ){
			this._drill_COPWM_DebugSprite.bitmap.clear();
			this._drill_COPWM_DebugSprite.bitmap = null;
			this.removeChild(this._drill_COPWM_DebugSprite);
			this._drill_COPWM_DebugSprite = undefined;
		}
		
	// > 功能开启时
	}else{
		
		// > 创建贴图
		if( this._drill_COPWM_DebugSprite == undefined ){
			var temp_bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
			var temp_sprite = new Sprite();
			temp_sprite.x = 0;
			temp_sprite.y = 0;
			temp_sprite.bitmap = temp_bitmap;
			this.addChild( temp_sprite );	//（直接加在最顶层的上面）
			this._drill_COPWM_DebugSprite = temp_sprite;
		}
	}
}
//==============================
// * DEBUG悬停范围 - 帧刷新 绘制范围
//==============================
Scene_Map.prototype.drill_COPWM_updateDrawBeanRangeBitmap = function() {
	if( this._drill_COPWM_DebugSprite == undefined ){ return; }
	
	// > 清空绘制
	var temp_bitmap = this._drill_COPWM_DebugSprite.bitmap;
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
		
		// > 强制 绑定碰撞体+数据
		picture.drill_COPWM_checkData();
		var data = picture._drill_COPWM_mouseData;
		var bean = picture.drill_COPi_getCollisionBean();	//【图片-图片优化核心】获取碰撞体
		
		// > 判断悬停
		var is_hover = picture.drill_COPWM_isOnHover();			//（鼠标是否正在悬停【标准函数】）
		
		
		// > 绘制 - 颜色标记
		var color_line = "rgb(100,180,225)";
		var color_line_pixel = "rgb(100,180,225,0.13)";
		var color_text = "rgb(100,180,225)";
		var color_background = "rgba(100,180,225,0.225)";
		if( is_hover == true ){
			color_line = "rgb(0,255,0)";
			color_line_pixel = "rgb(0,255,0,0.13)";
			color_text = "rgb(0,255,0)";
			color_background = "rgba(0,255,0,0.225)";
		}
		
		// > 绘制 - 获取矩形的四个顶点
		var point_list = $gameTemp.drill_COPi_getRectPointByBean( bean );	//【图片-图片优化核心】获取矩形的四个顶点
		if( point_list == null ){ continue; }
		
		// > 绘制 - 绘制凸多边形
		if( data['pixelHoverEnabled'] == true ){
			temp_bitmap.drill_COPWM_drawPolygon( point_list, color_background, color_line_pixel, 24, "round" );
		}else{
			temp_bitmap.drill_COPWM_drawPolygon( point_list, color_background, color_line, 2, "miter" );
		}
		
		// > 绘制 - ID编号
		var painter = temp_bitmap._context;
        painter.save();										//（a.存储上一个画笔状态）
        painter.font = temp_bitmap._makeFontNameText();		//（b.设置样式）
		painter.fillStyle = color_text;
		painter.strokeStyle = "rgba(0,0,0,0.7)";
		painter.lineWidth = 4;
		painter.lineJoin = 'round';
		painter.strokeText( String(i), 						//（c.路径填充/描边，fillText）
			point_list[0].x+10, point_list[0].y+30, 60 );
		painter.fillText( String(i), 				
			point_list[0].x+10, point_list[0].y+30, 60 );
		painter.restore();									//（d.回滚上一个画笔状态）
		
		// > 绘制 - 矩形中心点
		temp_bitmap.drawCircle( bean['_drill_x'], bean['_drill_y'], 9, color_line );
		temp_bitmap.drawCircle( bean['_drill_x'], bean['_drill_y'], 5, "#ff0000" );
	}
}
//==============================
// * DEBUG悬停范围 - 帧刷新（战斗界面）
//==============================
var _drill_COPWM_debugBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	_drill_COPWM_debugBattle_update.call( this );
    this.drill_COPWM_updateDrawBeanRangeSprite();		//帧刷新 - 初始化贴图
    this.drill_COPWM_updateDrawBeanRangeBitmap();		//帧刷新 - 绘制范围
}
//==============================
// * DEBUG悬停范围 - 函数赋值『图片与多场景』
//==============================
Scene_Battle.prototype.drill_COPWM_updateDrawBeanRangeSprite = Scene_Map.prototype.drill_COPWM_updateDrawBeanRangeSprite;
Scene_Battle.prototype.drill_COPWM_updateDrawBeanRangeBitmap = Scene_Map.prototype.drill_COPWM_updateDrawBeanRangeBitmap;

//==============================
// * DEBUG悬停范围 - 几何绘制 - 填充+描边多边形
//			
//			参数：	> fill_color 字符串   （填充颜色）
//					> stroke_color 字符串 （描边颜色）
//					> lineWidth 数字      （线宽）
//					> lineJoin 字符串     （连接处，包含miter/round/bevel 尖角/圆角/斜角，默认miter）
//			说明：	> 该函数不会对参数进行任何校验，绘制前一定要确保参数完整。
//					> 该函数包含多边形闭合处理。
//==============================
Bitmap.prototype.drill_COPWM_drawPolygon = function( point_list, fill_color, stroke_color, lineWidth, lineJoin ){
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


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfPictureWithMouse = false;
		var pluginTip = DrillUp.drill_COPWM_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

