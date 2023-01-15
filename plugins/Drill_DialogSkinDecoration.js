//=============================================================================
// Drill_DialogSkinDecoration.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        对话框 - 对话框装饰图
 * @author Drill_up
 * 
 * @Drill_LE_param "装饰图-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DSD_list_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_DialogSkinDecoration +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在装饰对话框的基础上，额外添加装饰图。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于下列插件才能运行。
 * 基于：
 *   - Drill_DialogSkin            对话框-对话框皮肤
 *     必须基于对话框皮肤插件，才能添加装饰图。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于对话框和其子窗口。
 * 2.详细内容和图解，去看看 "15.对话框 > 关于对话框皮肤.docx"。
 * 装饰图：
 *   (1.装饰图可以添加多个，并绑定到指定的 对话框皮肤样式 中。
 *      当对话框皮肤样式设置后，相应的 装饰图 都会一并显现。
 *   (2.装饰图的 层级 固定在对话框边框层的上面，对话框内容层的下面。
 * 设计：
 *   (1.你可以直接画一张完整的对话框图片，然后用该插件绑定到对话框
 *      皮肤中。不过你需要留意对话框、选择框可能会改变高宽的情况。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui_message （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui_message文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 装饰图1 资源-装饰图
 * 装饰图2 资源-装饰图
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制装饰图设置：
 * 
 * 插件指令：>对话框装饰图 : 装饰图[1] : 显示
 * 插件指令：>对话框装饰图 : 装饰图[1] : 隐藏
 * 
 * 1.设置装饰图隐藏后，永久有效。
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
 * 时间复杂度： o(n^2)*o(选项窗口数)*o(贴图处理) 每帧
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【8.14ms】
 *              地图界面中，平均消耗为：【7.51ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.相对而言，装饰图只是相当于在对话框上贴了一个GIF贴图，结构
 *   简单，所以消耗不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了旧存档的识别与兼容。
 * 
 *
 *
 * @param ---装饰图集---
 * @default
 *
 * @param 装饰图-1
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 * 
 * @param 装饰图-2
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-3
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-4
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-5
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-6
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-7
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-8
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-9
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-10
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-11
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-12
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-13
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-14
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-15
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-16
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-17
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-18
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-19
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 *
 * @param 装饰图-20
 * @parent ---装饰图集---
 * @type struct<DrillDSDStyle>
 * @desc 对话框相关窗口的装饰图配置。
 * @default 
 * 
 * 
 */
/*~struct~DrillDSDStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的装饰图--
 * 
 * @param ---绑定---
 * @default 
 * 
 * @param 绑定所属样式
 * @parent ---绑定---
 * @type number
 * @min 0
 * @desc 装饰图绑定的 对话框样式id，当对话框使用该样式时，装饰图会一起显示出来。
 * @default 0
 * 
 * @param 基准点
 * @parent ---绑定---
 * @type select
 * @option 窗口左上角
 * @value 窗口左上角
 * @option 窗口右上角
 * @value 窗口右上角
 * @option 窗口左下角
 * @value 窗口左下角
 * @option 窗口右下角
 * @value 窗口右下角
 * @option 窗口中心
 * @value 窗口中心
 * @option 窗口正上方
 * @value 窗口正上方
 * @option 窗口正下方
 * @value 窗口正下方
 * @option 窗口正左方
 * @value 窗口正左方
 * @option 窗口正右方
 * @value 窗口正右方
 * @desc 装饰图的位置基准点。
 * @default 窗口中心
 * 
 * @param 平移-装饰图 X
 * @parent ---绑定---
 * @desc 以基准点的位置为基准，x轴方向平移，正右负左，单位像素。
 * @default 0
 * 
 * @param 平移-装饰图 Y
 * @parent ---绑定---
 * @desc 以基准点的位置为基准，y轴方向平移，正下负上，单位像素。
 * @default 0
 * 
 * 
 * @param ---装饰图---
 * @desc 
 *
 * @param 装饰图是否显示
 * @parent ---装饰图---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，对话框的装饰图显示情况，你可以在游戏中通过插件指令开关。
 * @default true
 * 
 * @param 资源-装饰图
 * @parent ---装饰图---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default []
 * @require 1
 * @dir img/Menu__ui_message/
 * @type file[]
 * 
 * @param 帧间隔
 * @parent ---装饰图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---装饰图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放，gif的播放顺序。
 * @default false
 * 
 * @param 图片层级
 * @parent ---装饰图---
 * @type number
 * @min 0
 * @desc 注意，图片层级仅限于多个装饰图之间进行先后排序。
 * @default 4
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DSD（Dialog_Skin_Decoration）
//		临时全局变量	无
//		临时局部变量	this._drill_DSD_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(选项窗口数)*o(贴图处理) 每帧
//		★性能测试因素	对话管理层
//		★性能测试消耗	7.51ms（drill_DSD_updatePosition）
//		★最坏情况		对话框填充了大量装饰图。（不过好像也问题不大）
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			对话框装饰图：
//				->绑定到皮肤
//					->样式切换时重贴装饰图
//				->同步
//					->可见情况
//					->播放GIF
//					->窗口y缩放大小同步
//
//		★私有类如下：
//			* Drill_DSD_Sprite【对话框装饰图】
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.
//			
//		★存在的问题：
//			暂无
//		

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogSkinDecoration = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogSkinDecoration');

	//==============================
	// * 变量获取 - 样式
	//				（~struct~DrillDSDStyle）
	//==============================
	DrillUp.drill_DSD_initStyle = function( dataFrom ) {
		var data = {};
		
		// > 样式
		data['styleId'] = Number( dataFrom["绑定所属样式"] || 0 );
		data['position_type'] = String( dataFrom["基准点"] || "窗口中心");
		data['position_x'] = Number( dataFrom["平移-装饰图 X"] || 0);
		data['position_y'] = Number( dataFrom["平移-装饰图 Y"] || 0);
		
		// > 装饰图
		data['visible'] = String( dataFrom["装饰图是否显示"] || "false") == "true";
		if( dataFrom["资源-装饰图"] != "" &&
			dataFrom["资源-装饰图"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-装饰图"] );
		}else{
			data['gif_src'] = [];
		}
		data['gif_src_file'] = "img/Menu__ui_message/";
		data['gif_interval'] = Number( dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		return data;
	}
	
	/*-----------------样式集------------------*/
	DrillUp.g_DSD_list_length = 20;
	DrillUp.g_DSD_list = [];
	for( var i = 0; i < DrillUp.g_DSD_list_length; i++ ){
		if( DrillUp.parameters["装饰图-" + String(i+1) ] != undefined &&
			DrillUp.parameters["装饰图-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["装饰图-" + String(i+1) ]);
			DrillUp.g_DSD_list[i] = DrillUp.drill_DSD_initStyle( data );
			DrillUp.g_DSD_list[i]['id'] = i;
			DrillUp.g_DSD_list[i]['inited'] = true;
		}else{
			DrillUp.g_DSD_list[i] = DrillUp.drill_DSD_initStyle( {} );
			DrillUp.g_DSD_list[i]['inited'] = false;
		}
	}

	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_DialogSkin ){
	

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_DSD_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_DSD_pluginCommand.call(this, command, args);
	if( command === ">对话框装饰图" ){
		
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "显示" ){	
				temp1 = temp1.replace("装饰图[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1)-1;
				$gameSystem._drill_DSD_visibleTank[ temp1 ] = true;
			}
			if( type == "隐藏" ){	
				temp1 = temp1.replace("装饰图[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1)-1;
				$gameSystem._drill_DSD_visibleTank[ temp1 ] = false;
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DSD_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSD_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DSD_sys_initialize.call(this);
	this.drill_DSD_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSD_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DSD_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DSD_saveEnabled == true ){	
		$gameSystem.drill_DSD_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DSD_initSysData();
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
Game_System.prototype.drill_DSD_initSysData = function() {
	this.drill_DSD_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DSD_checkSysData = function() {
	this.drill_DSD_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DSD_initSysData_Private = function() {
	
	this._drill_DSD_visibleTank = [];		//显示情况
	for(var i = 0; i < DrillUp.g_DSD_list.length; i++ ){
		this._drill_DSD_visibleTank[i] = DrillUp.g_DSD_list[i]['visible'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DSD_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DSD_visibleTank == undefined ){
		this.drill_DSD_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_DSD_list.length; i++ ){
		var temp_data = JSON.parse(JSON.stringify( DrillUp.g_DSD_list[i] ));
		
		// > 已配置（'inited'为 false 表示空数据）
		if( temp_data['inited'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_DSD_visibleTank[i] == undefined ){
				this._drill_DSD_visibleTank[i] = temp_data['visible'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//=============================================================================
// * 对话框
//=============================================================================
//==============================
// * 对话框 - 初始化
//==============================
var _drill_DSD_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
	_drill_DSD_initialize.call( this );

	this.drill_DSD_createSprite();			//创建装饰图
};
//==============================
// * 对话框 - 设置背景（非帧刷新，窗口/暗淡/透明）
//
//			说明：	窗口类型切换时，刷新装饰图的出现情况。
//==============================
var _drill_DSD_setBackgroundType = Window_Message.prototype.setBackgroundType;
Window_Message.prototype.setBackgroundType = function( type ){
	_drill_DSD_setBackgroundType.call( this,type );
	
    if( type === 0 ){	// 窗口 类型
		this.drill_DSD_refreshSprite();
	}
}

//==============================
// * 通用函数 - 创建装饰图层
//==============================
Window_Message.prototype.drill_DSD_createSprite = function() {
	
	// > 装饰图层
	this._drill_DSD_spriteLayer = new Sprite();
    var borderIndex = this.children.indexOf(this._drill_DSk_border);
    this.addChildAt( this._drill_DSD_spriteLayer, borderIndex + 1);	//（层级添加在边框前面）
	
	// > 装饰图列表
	this._drill_DSD_spriteTank = [];
	this._drill_DSD_curStyle = -1;
};
//==============================
// * 通用函数 - 刷新装饰图
//
//			说明：	每个窗口中都建立一个装饰图层，然后根据样式检查，删除全部装饰图，再重建并添加到图层。
//==============================
Window_Message.prototype.drill_DSD_refreshSprite = function(){
	
	// > 样式检查
	var styleId = $gameSystem.drill_DSk_getStyleId( this._drill_DSk_tag );
	if( styleId == -1 ){ return; }
	if( styleId == this._drill_DSD_curStyle ){ return; }
	this._drill_DSD_curStyle = styleId;
	
	// > 清空装饰图
	for(var i = this._drill_DSD_spriteTank.length-1; i >= 0; i-- ){
		var temp_sprite = this._drill_DSD_spriteTank[i];
		this._drill_DSD_spriteLayer.removeChild( temp_sprite );
		this._drill_DSD_spriteTank.splice(i,1);
	}
	
	// > 建立装饰图
	for( var i = 0; i < DrillUp.g_DSD_list.length; i++ ){
		var temp_data = DrillUp.g_DSD_list[i];
		if( temp_data['inited'] == false ){ continue; }
		if( temp_data['styleId']-1 == -1 ){ continue; }
		if( temp_data['styleId']-1 == styleId ){
			var temp_sprite = new Drill_DSD_DecorationSprite( temp_data, this );
			temp_sprite.zIndex = temp_data['zIndex'];
			this._drill_DSD_spriteLayer.addChild( temp_sprite );
			this._drill_DSD_spriteTank.push( temp_sprite );
		}
	}
	
	
	// > 层级排序
	this._drill_DSD_spriteLayer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};


//=============================================================================
// * 对话框子窗口
//=============================================================================
//==============================
// * 金钱窗口 - 初始化
//==============================
var _drill_DSD_createSubWindows = Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function(){
	_drill_DSD_createSubWindows.call( this );
	this._goldWindow.drill_DSD_createSprite = this.drill_DSD_createSprite;		
	this._goldWindow.drill_DSD_refreshSprite = this.drill_DSD_refreshSprite;	
	
	this._goldWindow.drill_DSD_createSprite();		//创建装饰图
}
//==============================
// * 金钱窗口 - 刷新
//==============================
var _drill_DSD_Gold_open = Window_Gold.prototype.open;
Window_Gold.prototype.open = function() {
	_drill_DSD_Gold_open.call(this);
	
	if( this._drill_DSD_tag != undefined ){
		this.drill_DSD_refreshSprite();
	}
}
//==============================
// * 选择项窗口 - 相同函数
//==============================
Window_ChoiceList.prototype.drill_DSD_createSprite = Window_Message.prototype.drill_DSD_createSprite;
Window_ChoiceList.prototype.drill_DSD_refreshSprite = Window_Message.prototype.drill_DSD_refreshSprite;
//==============================
// * 选择项窗口 - 初始化
//==============================
var _drill_DSD_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
Window_ChoiceList.prototype.initialize = function( messageWindow ){
	_drill_DSD_ChoiceList_initialize.call( this,messageWindow );
	this.drill_DSD_createSprite();
}
//==============================
// * 选择项窗口 - 刷新
//==============================
var _drill_DSD_ChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function() {
	_drill_DSD_ChoiceList_start.call(this);
	this.drill_DSD_refreshSprite();	
}
//==============================
// * 数字输入窗口 - 相同函数
//==============================
Window_NumberInput.prototype.drill_DSD_createSprite = Window_Message.prototype.drill_DSD_createSprite;
Window_NumberInput.prototype.drill_DSD_refreshSprite = Window_Message.prototype.drill_DSD_refreshSprite;
//==============================
// * 数字输入窗口 - 初始化
//==============================
var _drill_DSD_NumberInput_initialize = Window_NumberInput.prototype.initialize;
Window_NumberInput.prototype.initialize = function( messageWindow ){
	_drill_DSD_NumberInput_initialize.call( this,messageWindow );
	this.drill_DSD_createSprite();
}
//==============================
// * 数字输入窗口 - 刷新
//==============================
var _drill_DSD_NumberInput_start = Window_NumberInput.prototype.start;
Window_NumberInput.prototype.start = function() {
	_drill_DSD_NumberInput_start.call(this);
	this.drill_DSD_refreshSprite();
}
//==============================
// * 选择物品窗口 - 相同函数
//==============================
Window_EventItem.prototype.drill_DSD_createSprite = Window_Message.prototype.drill_DSD_createSprite;
Window_EventItem.prototype.drill_DSD_refreshSprite = Window_Message.prototype.drill_DSD_refreshSprite;
//==============================
// * 选择物品窗口 - 初始化
//==============================
var _drill_DSD_EventItem_initialize = Window_EventItem.prototype.initialize;
Window_EventItem.prototype.initialize = function( messageWindow ){
	_drill_DSD_EventItem_initialize.call( this,messageWindow );
	this.drill_DSD_createSprite();
}
//==============================
// * 选择物品窗口 - 刷新
//==============================
var _drill_DSD_EventItem_start = Window_EventItem.prototype.start;
Window_EventItem.prototype.start = function() {
	_drill_DSD_EventItem_start.call(this);
	this.drill_DSD_refreshSprite();
}



//=============================================================================
// ** 对话框装饰图【Drill_DSD_DecorationSprite】
//			
// 			代码：	> 范围 - 该类额外显示单图的装饰。
//					> 结构 - [ ●合并/分离/ 混乱 ] 数据与贴图合并。只有visible被控制。
//					> 数量 - [单个/ ●多个 ] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 装饰图 - 定义
//==============================
function Drill_DSD_DecorationSprite() {
	this.initialize.apply(this, arguments);
}
Drill_DSD_DecorationSprite.prototype = Object.create(Sprite.prototype);
Drill_DSD_DecorationSprite.prototype.constructor = Drill_DSD_DecorationSprite;
//==============================
// * 装饰图 - 初始化
//==============================
Drill_DSD_DecorationSprite.prototype.initialize = function( data, parent ){
	Sprite.prototype.initialize.call(this);
	this._drill_data = data;
	this._drill_parent = parent;
	
	// > 资源读取
	this._drill_bitmaps = [];
	for(var j = 0; j < data['gif_src'].length ; j++){
		var src_str = data['gif_src'][j];
		var obj_bitmap = ImageManager.loadBitmap( data['gif_src_file'], src_str, 0, true);
		this._drill_bitmaps.push( obj_bitmap );
	};
	this._drill_gifTime = 0;
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
};
//==============================
// * 装饰图 - 帧刷新
//==============================
Drill_DSD_DecorationSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_DSD_updateVisible();			//帧刷新 - 可见情况
	this.drill_DSD_updatePosition();		//帧刷新 - 位置
	this.drill_DSD_updateGIF();				//帧刷新 - 播放GIF
}
//==============================
// * 帧刷新 - 可见情况
//==============================
Drill_DSD_DecorationSprite.prototype.drill_DSD_updateVisible = function() {
	var data = this._drill_data;
	
	this.visible = $gameSystem._drill_DSD_visibleTank[ data['id'] ];
	this.scale.y = this._drill_parent._windowSpriteContainer.scale.y;	//（保持y缩放）
}
//==============================
// * 帧刷新 - 位置
//==============================
Drill_DSD_DecorationSprite.prototype.drill_DSD_updatePosition = function() {
	var data = this._drill_data;
	
	var xx = data['position_x'];
	var yy = data['position_y'];
	var ww = this._drill_parent.width;
	var hh = this._drill_parent.height;
	
	if( data['position_type'] == "窗口左上角" ){
		xx += 0;
		yy += 0;
	}
	if( data['position_type'] == "窗口右上角" ){
		xx += ww;
		yy += 0;
	}
	if( data['position_type'] == "窗口左下角" ){
		xx += 0;
		yy += hh;
	}
	if( data['position_type'] == "窗口右下角" ){
		xx += ww;
		yy += hh;
	}
	if( data['position_type'] == "窗口中心" ){
		xx += ww * 0.5;
		yy += hh * 0.5;
	}
	if( data['position_type'] == "窗口正上方" ){
		xx += ww * 0.5;
		yy += 0;
	}
	if( data['position_type'] == "窗口正下方" ){
		xx += ww * 0.5;
		yy += hh;
	}
	if( data['position_type'] == "窗口正左方" ){
		xx += 0;
		yy += hh * 0.5;
	}
	if( data['position_type'] == "窗口正右方" ){
		xx += ww;
		yy += hh * 0.5;
	}
	
	this.x = xx;
	this.y = yy;
}
//==============================
// * 帧刷新 - 播放GIF
//==============================
Drill_DSD_DecorationSprite.prototype.drill_DSD_updateGIF = function() {
	var data = this._drill_data;
	if( this._drill_bitmaps.length == 0 ){ return; }
	this._drill_gifTime += 1;
	
	// > 播放gif
	var inter = this._drill_gifTime;
	inter = inter / data['gif_interval'];
	inter = inter % this._drill_bitmaps.length;
	if( data['gif_back_run'] ){
		inter = this._drill_bitmaps.length - 1 - inter;
	}
	inter = Math.floor(inter);
	this.bitmap = this._drill_bitmaps[inter];
	
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogSkinDecoration = false;
		alert(
			"【Drill_DialogSkinDecoration.js  对话框 - 对话框装饰图】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_DialogSkin  对话框-对话框皮肤"
		);
}


