//=============================================================================
// Drill_DialogShatterEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        对话框 - 方块粉碎效果
 * @author Drill_up
 * 
 *
 * @help  
 * =============================================================================
 * +++ Drill_DialogShatterEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得对话框能播放方块状的粉碎效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件不能单独运行，必须要基于核心才能运行：
 * 基于：
 *   - Drill_CoreOfShatterEffect    系统-方块粉碎核心★★v1.3及以上版本★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于对话框内容贴图。
 * 2.想要更多了解方块粉碎，去看看 "1.系统 > 方块粉碎大家族.docx"。
 * 细节:
 *   (1.对话内容粉碎后，会一直保持粉碎的状态。跨越多个对话。
 *      但是切换菜单会使得对话内容复原。
 *   (2.因为对话框实体只有一个，所以粉碎效果也只有一个实体。
 *      进入下一对话时，不可能看得到上一次对话的碎片。
 * 指令时差：
 *   (1.图解可以去看看 "1.系统 > 方块粉碎大家族.docx"。
 *   (2.在对话框播放文字时，插件指令是不能执行的。
 *      所以，你必须在文字播放前，预备执行插件指令。
 *   (3.粉碎的插件指令最好 紧贴 对话指令。如果不紧贴，
 *      "延迟[0]"的效果会提早生效。要注意延迟时间长一点。
 *   (4.你需要考虑对话时内容粉碎的时机，可以使用等待字符"\|"或
 *      "\."来限制玩家不停地按确定键情况。避免粉碎指令执行不到。
 *   (5.在事件页的对话完全结束后，要记得执行复原指令。
 *      防止在进行其他对话时，碎片效果仍在，对话内容看不见。
 * 设计:
 *   (1.你可以使用对话框粉碎，来"折磨"那些阅读速度太慢的玩家。
 *      如果看的太慢，选项和说明文字都会被粉碎。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面的插件指令，实现延迟粉碎效果：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 对话框内容 : 延迟[60] : 方块粉碎[15]
 * 插件指令：>方块粉碎效果 : 选择框内容 : 延迟[60] : 方块粉碎[15]
 * 插件指令：>方块粉碎效果 : 姓名框内容 : 延迟[60] : 方块粉碎[15]
 * 
 * 插件指令：>方块粉碎效果 : 对话框内容 : 延迟[60] : 方块粉碎[15]
 * 插件指令：>方块粉碎效果 : 对话框内容 : 延迟[60] : 方块反转粉碎[15]
 * 插件指令：>方块粉碎效果 : 对话框内容 : 立刻复原
 * 
 * 1.在对话框播放文字时，插件指令是不能执行的。
 *   所以，你必须在文字播放前，预备执行插件指令。
 * 2.插件指令的 前半部分(对话框内容)和后半部分(延迟[60] : 方块粉碎[15])
 *   的参数可以随意组合。一共有3*3种组合方式。
 * 3.粉碎的插件指令最好 紧贴 对话指令。如果不紧贴，
 *   "延迟[0]"的效果会提早生效。要注意延迟时间长一点。
 * 4."延迟[60]"表示对话开始后，粉碎延迟的时间。单位帧，1秒60帧。
 *   "方块粉碎[1]"对应 方块粉碎核心 插件中配置的粉碎id。
 * 5.粉碎背景可以有两个过程，先反转拼合在一起，然后破碎。
 *   以此可以制作中间的过渡效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改碎片的消失设置：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 对话框碎片 : 消失方式 : 不消失
 * 插件指令：>方块粉碎效果 : 对话框碎片 : 消失方式 : 线性消失
 * 插件指令：>方块粉碎效果 : 对话框碎片 : 消失方式 : 等一半时间后线性消失
 * 插件指令：>方块粉碎效果 : 对话框碎片 : 消失方式 : 设回默认
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
 * 测试方法：   在各个管理层中播放对话的粉碎效果。
 * 测试结果：   战斗界面中，平均消耗为：【37.24ms】
 *              200个事件的图片中，平均消耗为：【50.62ms】
 *              100个事件的图片中，平均消耗为：【44.06ms】
 *               50个事件的图片中，平均消耗为：【39.18ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.方块粉碎是性能消耗大户，因为粉碎后图片实际上被分成了m*n块新贴图碎片。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 3.该插件只作用于三个实体：对话框、选择框、姓名框。不是批量的，所以可能
 *   消耗相对比较小。另外对话执行时，部分插件处于暂停状态，可能也使得负担
 *   没有那么大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了部分插件注释内容。
 * [v1.2]
 * 修改了与核心的部分兼容设置。
 * [v1.3]
 * 修复了战斗界面对话框不能粉碎的bug。
 * 
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
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DSE（Picture_Shatter_Effect）
//		临时全局变量	DrillUp.g_DSE_xxx
//		临时局部变量	this._drill_DSE_xxx
//		存储数据变量	$gameMap._drill_DSE.xx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理)
//		性能测试因素	对话管理层看粉碎效果
//		性能测试消耗	12.33ms  26.85ms
//		最坏情况		粉碎分割的数量特别多。
//		备注			测的结果有些小，可能是对话时，其他功能暂停工作造成的吧。
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
//					->贴图框架frame - frame.x.y.w.h
//
//		★必要注意事项：
//			1.使用粉碎前，一定要想明白【贴图框架frame】的分配问题，
//				1) bitmap会不会实时变，是bitmap资源，还是实时bitmap？
//				2) 如果 frameWidth = 0 怎么办？如果bitmap为空怎么办？
//				3) 执行粉碎后，保持粉碎状态是一直持续的，除非执行复原。那么是否要锁定sprite的时间轴？
//				-1- 该插件为实时bitmap
//				-2- 该插件要杜绝frameWidth=0，建立了缓冲width，bitmap为空不考虑。
//				-3- 该插件不锁定时间轴，粉碎效果为临时性的。刷菜单会复原。
//			2.这里的bitmap并没有完全消失，opacity也是255，只是被切割成0了。
//			
//		★其它说明细节：
//			1.窗口只有一个，但是有三种类型，配置起来非常复杂冗余。
//			  之前想过窗口框架背景也粉碎，但是框架有外框架和背景框架两种，bitmap又是不稳定的状态。
//			  为了防止意义不大的代码越写越多，背景粉碎的功能就不加了。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogShatterEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogShatterEffect');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_DSE_opacityType = String(DrillUp.parameters['默认图片碎片消失方式'] || "线性消失");	
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfShatterEffect ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_DSE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_DSE_pluginCommand.call(this, command, args);
	if (command === ">方块粉碎效果") { // >方块粉碎效果 : 对话框内容 : 延迟[60] : 方块粉碎[15]
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			
			if( type == "对话框内容" ){
					
				if( temp2.indexOf("方块粉碎[") != -1 ){
					temp2 = temp2.replace("方块粉碎[","");
					temp2 = temp2.replace("]","");
					temp1 = temp1.replace("延迟[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DSE.tc['shatter_command'] = true;
					$gameSystem._drill_DSE.tc['shatter_delay'] = Number(temp1);
					$gameSystem._drill_DSE.tc['shatter_id'] = Number(temp2)-1;
					$gameSystem._drill_DSE.tc['shatter_converted'] = false;
				}
				if( temp2.indexOf("方块反转粉碎[") != -1 ){
					temp2 = temp2.replace("方块反转粉碎[","");
					temp2 = temp2.replace("]","");
					temp1 = temp1.replace("延迟[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DSE.tc['shatter_command'] = true;
					$gameSystem._drill_DSE.tc['shatter_delay'] = Number(temp1);
					$gameSystem._drill_DSE.tc['shatter_id'] = Number(temp2)-1;
					$gameSystem._drill_DSE.tc['shatter_converted'] = true;
				}
			}
			
			if( type == "选择框内容" ){
					
				if( temp2.indexOf("方块粉碎[") != -1 ){
					temp2 = temp2.replace("方块粉碎[","");
					temp2 = temp2.replace("]","");
					temp1 = temp1.replace("延迟[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DSE.cc['shatter_command'] = true;
					$gameSystem._drill_DSE.cc['shatter_delay'] = Number(temp1);
					$gameSystem._drill_DSE.cc['shatter_id'] = Number(temp2)-1;
					$gameSystem._drill_DSE.cc['shatter_converted'] = false;
				}
				if( temp2.indexOf("方块反转粉碎[") != -1 ){
					temp2 = temp2.replace("方块反转粉碎[","");
					temp2 = temp2.replace("]","");
					temp1 = temp1.replace("延迟[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DSE.cc['shatter_command'] = true;
					$gameSystem._drill_DSE.cc['shatter_delay'] = Number(temp1);
					$gameSystem._drill_DSE.cc['shatter_id'] = Number(temp2)-1;
					$gameSystem._drill_DSE.cc['shatter_converted'] = true;
				}
			}
			
			if( type == "姓名框内容" ){
					
				if( temp2.indexOf("方块粉碎[") != -1 ){
					temp2 = temp2.replace("方块粉碎[","");
					temp2 = temp2.replace("]","");
					temp1 = temp1.replace("延迟[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DSE.nc['shatter_command'] = true;
					$gameSystem._drill_DSE.nc['shatter_delay'] = Number(temp1);
					$gameSystem._drill_DSE.nc['shatter_id'] = Number(temp2)-1;
					$gameSystem._drill_DSE.nc['shatter_converted'] = false;
				}
				if( temp2.indexOf("方块反转粉碎[") != -1 ){
					temp2 = temp2.replace("方块反转粉碎[","");
					temp2 = temp2.replace("]","");
					temp1 = temp1.replace("延迟[","");
					temp1 = temp1.replace("]","");
					$gameSystem._drill_DSE.nc['shatter_command'] = true;
					$gameSystem._drill_DSE.nc['shatter_delay'] = Number(temp1);
					$gameSystem._drill_DSE.nc['shatter_id'] = Number(temp2)-1;
					$gameSystem._drill_DSE.nc['shatter_converted'] = true;
				}
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "对话框内容" && temp1 == "立刻复原" ){
				$gameSystem._drill_DSE.tc['redraw_command'] = true;
				$gameSystem._drill_DSE.tc['shatter_command'] = false;		//关闭延时的指令
			}
			if( type == "选择框内容" && temp1 == "立刻复原" ){
				$gameSystem._drill_DSE.cc['redraw_command'] = true;
				$gameSystem._drill_DSE.cc['shatter_command'] = false;
			}
			if( type == "姓名框内容" && temp1 == "立刻复原" ){
				$gameSystem._drill_DSE.nc['redraw_command'] = true;
				$gameSystem._drill_DSE.nc['shatter_command'] = false;
			}
		}
		if(args.length == 6){		//>方块粉碎效果 : 图片碎片 : 消失方式 : 不消失
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "图片碎片" && temp1 == "消失方式" ){
				if( temp2 == "设回默认" ){
					$gameSystem._drill_DSE['opacityType'] = DrillUp.g_DSE_opacityType;
				}else{
					$gameSystem._drill_DSE['opacityType'] = temp1;
				}
			}
		}
	}
};


//=============================================================================
// * 存储数据初始化
//=============================================================================
var _drill_DSE_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DSE_sys_initialize.call(this);
	
	this._drill_DSE_opacityType = DrillUp.g_DSE_opacityType;	//透明类型
	
	// > 对话框
	this._drill_DSE = {};
	this._drill_DSE.tc = {};
	this._drill_DSE.tc['shatter_command'] = false;			//碎片指令
	this._drill_DSE.tc['shatter_delay'] = 0;				//碎片指令延迟
	this._drill_DSE.tc['shatter_id'] = -1;					//当前碎片样式id
	this._drill_DSE.tc['shatter_converted'] = false;		//反向弹道
	this._drill_DSE.tc['redraw_command'] = false;			//重画指令
	// > 选择框
	this._drill_DSE.cc = {};
	this._drill_DSE.cc['shatter_command'] = false;		
	this._drill_DSE.cc['shatter_delay'] = 0;	
	this._drill_DSE.cc['shatter_id'] = -1;				
	this._drill_DSE.cc['shatter_converted'] = false;	
	this._drill_DSE.cc['redraw_command'] = false;		
	// > 姓名框
	this._drill_DSE.nc = {};
	this._drill_DSE.nc['shatter_command'] = false;		
	this._drill_DSE.nc['shatter_delay'] = 0;	
	this._drill_DSE.nc['shatter_id'] = -1;				
	this._drill_DSE.nc['shatter_converted'] = false;	
	this._drill_DSE.nc['redraw_command'] = false;		
}

//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图 - 初始化
//==============================
var _drill_DSE_map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function() {
	_drill_DSE_map_initialize.call(this);
	this.drill_DSE_initBitmapFrame();			//贴图框架
	this.drill_DSE_initTimeDelay();				//延迟指令时间
}
//==============================
// * 地图 - 帧刷新
//==============================
var _drill_DSE_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	
	// > bitmap识别（必须放前面）
	this.drill_DSE_updateBitmapFrame();
	
	// > 帧刷新
	_drill_DSE_map_update.call(this);
	
	// > 粉碎指令
	if(this.isActive()){
		this.drill_DSE_updateTimeDelay();
		this.drill_DSE_updateMessageContentsSprite();
		this.drill_DSE_updateMessageChoiceSprite();
		this.drill_DSE_updateMessageNameSprite();
	}
}
//==============================
// * 窗体 - 粉碎时图像隐藏
//==============================
var _drill_DSE_w__updateContents = Window.prototype._updateContents;
Window.prototype._updateContents = function() {
    _drill_DSE_w__updateContents.call(this);
	if( this._windowContentsSprite._drill_DSE_activated == true && 
		this._windowContentsSprite.drill_COSE_isShattering() ){
		this._windowContentsSprite.setFrame(0,0,0,0);
	}
};

//==============================
// ** 延迟指令 - 初始化
//==============================
Scene_Map.prototype.drill_DSE_initTimeDelay = function() {
	$gameTemp.drill_DSE_tc_time = 0;			//对话框内容 延迟指令时间
	$gameTemp.drill_DSE_cc_time = 0;			//选择框内容 延迟指令时间
	$gameTemp.drill_DSE_nc_time = 0;			//姓名框内容 延迟指令时间
}
//==============================
// * 延迟指令 - 帧刷新
//==============================
Scene_Map.prototype.drill_DSE_updateTimeDelay = function() {
	$gameTemp.drill_DSE_tc_time += 1;
	$gameTemp.drill_DSE_cc_time += 1;
	$gameTemp.drill_DSE_nc_time += 1;
}

//==============================
// ** 贴图框架 - 初始化
//==============================
Scene_Map.prototype.drill_DSE_initBitmapFrame = function() {
	this._drill_DSE_tc_frame_x = -1;			//框架 - x
	this._drill_DSE_tc_frame_y = -1;			//框架 - y
	this._drill_DSE_tc_frame_w = 0;				//框架 - w
	this._drill_DSE_tc_frame_h = 0;				//框架 - h
	this._drill_DSE_cc_frame_x = -1;		
	this._drill_DSE_cc_frame_y = -1;		
	this._drill_DSE_cc_frame_w = 0;			
	this._drill_DSE_cc_frame_h = 0;			
	this._drill_DSE_nc_frame_x = -1;		
	this._drill_DSE_nc_frame_y = -1;		
	this._drill_DSE_nc_frame_w = 0;			
	this._drill_DSE_nc_frame_h = 0;			
}
//==============================
// * 贴图框架 - 帧刷新bitmap识别（必须放前面）
//==============================
Scene_Map.prototype.drill_DSE_updateBitmapFrame = function() {
	
	// > 对话框
	if( this._messageWindow && this._messageWindow._windowContentsSprite ){
		var window_sprite = this._messageWindow._windowContentsSprite;
		
		if( this._drill_DSE_tc_frame_x != window_sprite._realFrame.x ||
			this._drill_DSE_tc_frame_y != window_sprite._realFrame.y ||
			this._drill_DSE_tc_frame_w != window_sprite._realFrame.width ||
			this._drill_DSE_tc_frame_h != window_sprite._realFrame.height 
			){
			
			if( window_sprite._realFrame.width != 0 &&
				window_sprite._realFrame.height != 0 ){
				this._drill_DSE_tc_frame_x = window_sprite._realFrame.x;	
				this._drill_DSE_tc_frame_y = window_sprite._realFrame.y;
				this._drill_DSE_tc_frame_w = window_sprite._realFrame.width;
				this._drill_DSE_tc_frame_h = window_sprite._realFrame.height;
			}
			//alert(this._drill_DSE_tc_frame_x);
		}
	}
	// > 对话框
	if( this._messageWindow && this._messageWindow._choiceWindow && this._messageWindow._choiceWindow._windowContentsSprite ){
		var window_sprite = this._messageWindow._choiceWindow._windowContentsSprite;
		
		if( this._drill_DSE_cc_frame_x != window_sprite._realFrame.x ||
			this._drill_DSE_cc_frame_y != window_sprite._realFrame.y ||
			this._drill_DSE_cc_frame_w != window_sprite._realFrame.width ||
			this._drill_DSE_cc_frame_h != window_sprite._realFrame.height 
			){
			
			if( window_sprite._realFrame.width != 0 &&
				window_sprite._realFrame.height != 0 ){
				this._drill_DSE_cc_frame_x = window_sprite._realFrame.x;	
				this._drill_DSE_cc_frame_y = window_sprite._realFrame.y;
				this._drill_DSE_cc_frame_w = window_sprite._realFrame.width;
				this._drill_DSE_cc_frame_h = window_sprite._realFrame.height;
			}
		}
	}
	// > 姓名框
	if( this._messageWindow && this._messageWindow._nameWindow && this._messageWindow._nameWindow._windowContentsSprite ){
		var window_sprite = this._messageWindow._nameWindow._windowContentsSprite;
		
		if( this._drill_DSE_nc_frame_x != window_sprite._realFrame.x ||
			this._drill_DSE_nc_frame_y != window_sprite._realFrame.y ||
			this._drill_DSE_nc_frame_w != window_sprite._realFrame.width ||
			this._drill_DSE_nc_frame_h != window_sprite._realFrame.height 
			){
			
			if( window_sprite._realFrame.width != 0 &&
				window_sprite._realFrame.height != 0 ){
				this._drill_DSE_nc_frame_x = window_sprite._realFrame.x;	
				this._drill_DSE_nc_frame_y = window_sprite._realFrame.y;
				this._drill_DSE_nc_frame_w = window_sprite._realFrame.width;
				this._drill_DSE_nc_frame_h = window_sprite._realFrame.height;
			}
		}
	}
}

//==============================
// ** 对话框 - 帧刷新
//==============================
Scene_Map.prototype.drill_DSE_updateMessageContentsSprite = function() {
	if( this._messageWindow == undefined ){ return; }
	if( this._messageWindow._windowContentsSprite == undefined ){ return; }
	
	var datafrom = $gameSystem._drill_DSE.tc;
	var window_sprite = this._messageWindow._windowContentsSprite;
	var data;
	
	// > 粉碎指令
	if( datafrom['shatter_command'] == true && $gameTemp.drill_DSE_tc_time > datafrom['shatter_delay'] ) {
		datafrom['shatter_command'] = false;
		var data = {
			"frameX":this._drill_DSE_tc_frame_x,
			"frameY":this._drill_DSE_tc_frame_y,
			"frameW":this._drill_DSE_tc_frame_w,
			"frameH":this._drill_DSE_tc_frame_h,
			"shatter_id":datafrom['shatter_id'],							//粉碎样式
			"shatter_converted":datafrom['shatter_converted'],				//反向弹道
			"shatter_opacityType":$gameSystem._drill_DSE_opacityType,		//透明度变化方式
		};
		window_sprite.drill_COSE_setShatter( data,window_sprite.bitmap );	//方块粉碎核心 - 初始化
		window_sprite._drill_DSE_activated = true;
	}
	
	// > 复原指令
	if( datafrom['redraw_command'] == true ) {
		datafrom['redraw_command'] = false;
		window_sprite.drill_COSE_restoreShatter();				//方块粉碎核心 - 复原
		window_sprite._drill_DSE_activated = true;
	}
	
	// > 粉碎时图像隐藏
	if( window_sprite._drill_DSE_activated == true ){
		if( window_sprite.drill_COSE_isShattering() ){
			window_sprite.setFrame(0,0,0,0);
		}
	}
}
//==============================
// * 对话框 - 下一个指令时机
//==============================
var _drill_DSE_w_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    _drill_DSE_w_startMessage.call(this);
	$gameTemp.drill_DSE_tc_time = 0;
	$gameTemp.drill_DSE_cc_time = 0;
};

//==============================
// ** 选择框 - 帧刷新
//==============================
Scene_Map.prototype.drill_DSE_updateMessageChoiceSprite = function() {
	if( this._messageWindow == undefined ){ return; }
	if( this._messageWindow._choiceWindow == undefined ){ return; }
	if( this._messageWindow._choiceWindow._windowContentsSprite == undefined ){ return; }
	
	var datafrom = $gameSystem._drill_DSE.cc;
	var window_sprite = this._messageWindow._choiceWindow._windowContentsSprite;
	var data;
	
	// > 粉碎指令
	if( datafrom['shatter_command'] == true && $gameTemp.drill_DSE_cc_time > datafrom['shatter_delay'] ){
		datafrom['shatter_command'] = false;
		var data = {
			"frameX":this._drill_DSE_cc_frame_x,
			"frameY":this._drill_DSE_cc_frame_y,
			"frameW":this._drill_DSE_cc_frame_w,
			"frameH":this._drill_DSE_cc_frame_h,
			"shatter_id":datafrom['shatter_id'],							//粉碎样式
			"shatter_converted":datafrom['shatter_converted'],				//反向弹道
			"shatter_opacityType":$gameSystem._drill_DSE_opacityType,		//透明度变化方式
		};
		window_sprite.drill_COSE_setShatter( data,window_sprite.bitmap );	//方块粉碎核心 - 初始化
		window_sprite._drill_DSE_activated = true;
	}
	
	// > 复原指令
	if( datafrom['redraw_command'] == true ){
		datafrom['redraw_command'] = false;
		window_sprite.drill_COSE_restoreShatter();				//方块粉碎核心 - 复原
		window_sprite._drill_DSE_activated = true;
	}
	
	// > 粉碎时图像隐藏
	if( window_sprite._drill_DSE_activated == true ){
		if( window_sprite.drill_COSE_isShattering() ){
			window_sprite.setFrame(0,0,0,0);
		}
	}
}
//==============================
// * 选择框 - 下一个指令时机
//==============================
var _drill_DSE_w_choiceStart = Window_ChoiceList.prototype.selectDefault;
Window_ChoiceList.prototype.selectDefault = function() {
    _drill_DSE_w_choiceStart.call(this);
	$gameTemp.drill_DSE_cc_time = 0;
};

//==============================
// ** 姓名框 - 帧刷新
//==============================
Scene_Map.prototype.drill_DSE_updateMessageNameSprite = function() {
	if( this._messageWindow == undefined ){ return; }
	if( this._messageWindow._nameWindow == undefined ){ return; }
	if( this._messageWindow._nameWindow._windowContentsSprite == undefined ){ return; }
	
	var datafrom = $gameSystem._drill_DSE.nc;
	var window_sprite = this._messageWindow._nameWindow._windowContentsSprite;
	var data;
	
	// > 粉碎指令
	if( datafrom['shatter_command'] == true && $gameTemp.drill_DSE_nc_time > datafrom['shatter_delay'] ) {
		datafrom['shatter_command'] = false;
		var data = {
			"frameX":this._drill_DSE_nc_frame_x,
			"frameY":this._drill_DSE_nc_frame_y,
			"frameW":this._drill_DSE_nc_frame_w,
			"frameH":this._drill_DSE_nc_frame_h,
			"shatter_id":datafrom['shatter_id'],							//粉碎样式
			"shatter_converted":datafrom['shatter_converted'],				//反向弹道
			"shatter_opacityType":$gameSystem._drill_DSE_opacityType,		//透明度变化方式
		};
		window_sprite.drill_COSE_setShatter( data,window_sprite.bitmap );	//方块粉碎核心 - 初始化
		window_sprite._drill_DSE_activated = true;
	}
	
	// > 复原指令
	if( datafrom['redraw_command'] == true ) {
		datafrom['redraw_command'] = false;
		window_sprite.drill_COSE_restoreShatter();				//方块粉碎核心 - 复原
		window_sprite._drill_DSE_activated = true;
	}
	
	// > 粉碎时图像隐藏
	if( window_sprite._drill_DSE_activated == true ){
		if( window_sprite.drill_COSE_isShattering() ){
			window_sprite.setFrame(0,0,0,0);
		}
	}
}
//==============================
// * 姓名框 - 下一个指令时机
//==============================
var _drill_DSE_w_nameRefresh = Window_NameBox.prototype.refresh;
Window_NameBox.prototype.refresh = function(text, position) {
	$gameTemp.drill_DSE_nc_time = 0;
    return _drill_DSE_w_nameRefresh.call(this,text, position);
};



//=============================================================================
// ** 战斗界面复刻
//=============================================================================
//==============================
// * 战斗 - 初始化
//==============================
var _drill_DSE_battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
	_drill_DSE_battle_initialize.call(this);
	this.drill_DSE_initBitmapFrame();			//贴图框架
	this.drill_DSE_initTimeDelay();				//延迟指令时间
}
Scene_Battle.prototype.drill_DSE_initBitmapFrame = Scene_Map.prototype.drill_DSE_initBitmapFrame;
Scene_Battle.prototype.drill_DSE_initTimeDelay = Scene_Map.prototype.drill_DSE_initTimeDelay;
//==============================
// * 战斗 - 帧刷新
//==============================
var _drill_DSE_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	
	// > bitmap识别（必须放前面）
	this.drill_DSE_updateBitmapFrame();
	
	// > 帧刷新
	_drill_DSE_battle_update.call(this);
	
	// > 粉碎指令
	if(this.isActive()){
		this.drill_DSE_updateTimeDelay();
		this.drill_DSE_updateMessageContentsSprite();
		this.drill_DSE_updateMessageChoiceSprite();
		this.drill_DSE_updateMessageNameSprite();
	}
}
Scene_Battle.prototype.drill_DSE_updateBitmapFrame = Scene_Map.prototype.drill_DSE_updateBitmapFrame;
Scene_Battle.prototype.drill_DSE_updateTimeDelay = Scene_Map.prototype.drill_DSE_updateTimeDelay;
Scene_Battle.prototype.drill_DSE_updateMessageContentsSprite = Scene_Map.prototype.drill_DSE_updateMessageContentsSprite;
Scene_Battle.prototype.drill_DSE_updateMessageChoiceSprite = Scene_Map.prototype.drill_DSE_updateMessageChoiceSprite;
Scene_Battle.prototype.drill_DSE_updateMessageNameSprite = Scene_Map.prototype.drill_DSE_updateMessageNameSprite;




//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogShatterEffect = false;
		alert(
			"【Drill_DialogShatterEffect.js 行走图-方块粉碎效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfShatterEffect 系统-方块粉碎核心"
		);
}



