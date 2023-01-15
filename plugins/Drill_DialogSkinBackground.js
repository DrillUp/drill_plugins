//=============================================================================
// Drill_DialogSkinBackground.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        对话框 - 对话框背景
 * @author Drill_up
 * 
 * @Drill_LE_param "背景层-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DSB_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_DialogSkinBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在装饰对话框的基础上，额外添加多层背景。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_DialogSkin            对话框-对话框皮肤
 *   - Drill_CoreOfDynamicMask     系统-动态遮罩核心
 *     必须基于对话框皮肤插件，才能添加背景。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于对话框和其子窗口。
 * 2.详细内容和图解，去看看 "15.对话框 > 关于对话框皮肤.docx"。
 * 背景：
 *   (1.背景可以添加多个，并绑定到指定的 对话框皮肤样式 中。
 *      当对话框皮肤样式设置后，相应的 背景 都会一并显现。
 *   (2.背景的 层级 固定在对话框边框层的下面，对话框默认背景层的上面。
 * 动态遮罩：
 *   (1.你可以给对话框背景添加动态遮罩，鼠标接触后，有不同的遮罩显现效果。
 *      白色为可见，黑色为不可见。
 *   (2.配置"开启反向遮罩"后，则遮罩的黑白颜色反转。
 * 设计：
 *   (1.你可以开启动态遮罩，制作遮罩的对话框光影效果。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui_message （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui_message文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 背景1 资源-背景
 * 背景2 资源-背景
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制背景设置：
 * 
 * 插件指令：>对话框背景 : 背景[1] : 显示
 * 插件指令：>对话框背景 : 背景[1] : 隐藏
 * 
 * 1.设置背景隐藏后，永久有效。
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
 * 测试结果：   战斗界面中，平均消耗为：【14.11ms】
 *              地图界面中，平均消耗为：【18.03ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于对话框一般只放一层背景，即使背景添加了动态遮罩板，消耗
 *   也不会增加的特别明显，能在承受范围内。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了对话框宽高变化时，背景没有跟随变化的bug。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 *
 *
 * @param ---背景集---
 * @default
 *
 * @param 背景层-1
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 * 
 * @param 背景层-2
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-3
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-4
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-5
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-6
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-7
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-8
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-9
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-10
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-11
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-12
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-13
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-14
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-15
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-16
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-17
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-18
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-19
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 *
 * @param 背景层-20
 * @parent ---背景集---
 * @type struct<DrillDSBStyle>
 * @desc 对话框相关窗口的背景配置。
 * @default 
 * 
 * 
 */
/*~struct~DrillDSBStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的背景层--
 * 
 * @param ---绑定---
 * @default 
 * 
 * @param 绑定所属样式
 * @parent ---绑定---
 * @type number
 * @min 0
 * @desc 背景绑定的 对话框样式id，当对话框使用该样式时，背景会一起显示出来。
 * @default 0
 * 
 * @param 向内缩进距
 * @parent ---绑定---
 * @type number
 * @min 0
 * @desc 当前背景如果过大，可以调整向内缩进矩，减小平铺背景的高宽。
 * @default 0
 * 
 * 
 * @param ---背景层---
 * @desc 
 *
 * @param 背景是否显示
 * @parent ---背景层---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，对话框的背景显示情况，你可以在游戏中通过插件指令开关。
 * @default true
 * 
 * @param 资源-背景
 * @parent ---背景层---
 * @desc 背景的图片资源。
 * @default 
 * @require 1
 * @dir img/Menu__ui_message/
 * @type file
 *
 * @param 平移-背景 X
 * @parent ---背景层---
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 平移-背景 Y
 * @parent ---背景层---
 * @desc y轴方向平移，单位像素。0为贴在最上面。这里用来表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 透明度
 * @parent ---背景层---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @parent ---背景层---
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看 "0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param 背景X速度
 * @parent ---背景层---
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0.0
 *
 * @param 背景Y速度
 * @parent ---背景层---
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0.0
 * 
 * @param 图片层级
 * @parent ---背景层---
 * @type number
 * @min 0
 * @desc 注意，图片层级仅限于多个 对话框背景 之间进行先后排序。
 * @default 2
 * 
 * 
 * @param ---动态遮罩---
 * @default 
 *
 * @param 遮罩模式
 * @parent ---动态遮罩---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启遮罩
 * @value 开启遮罩
 * @option 开启反向遮罩
 * @value 开启反向遮罩
 * @desc 该背景的遮罩模式，具体效果可以看看文档说明。
 * @default 关闭
 * 
 * @param 资源-鼠标透视镜
 * @parent ---动态遮罩---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default 
 * @require 1
 * @dir img/Menu__ui_message/
 * @type file
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DSB（Dialog_Skin_Background）
//		临时全局变量	无
//		临时局部变量	this._drill_DSB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(选项窗口数)*o(贴图处理) 每帧
//		★性能测试因素	对话管理层
//		★性能测试消耗	7.51ms（drill_DSB_updatePosition）
//		★最坏情况		对话框填充了大量背景。（不过好像也问题不大）
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			对话框背景：
//				->绑定到皮肤
//					->样式切换时重贴背景
//				->同步
//					->可见情况
//					->播放GIF
//					->窗口y缩放大小同步
//
//		★私有类如下：
//			* Drill_DSB_Sprite【对话框背景】
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
　　Imported.Drill_DialogSkinBackground = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_DialogSkinBackground');

	//==============================
	// * 变量获取 - 样式
	//				（~struct~DrillDSBStyle）
	//==============================
	DrillUp.drill_DSB_initStyle = function( dataFrom ) {
		var data = {};
		
		// > 样式
		data['styleId'] = Number( dataFrom["绑定所属样式"] || 0 );
		data['backInner'] = Number( dataFrom["向内缩进距"] || 0);
		
		// > 背景
		data['visible'] = String( dataFrom["背景是否显示"] || "false") == "true";
		data['src_img'] = String( dataFrom["资源-背景"] || "");
		data['src_file'] = "img/Menu__ui_message/";
		data['x'] = Number( dataFrom["平移-背景 X"] || 0);
		data['y'] = Number( dataFrom["平移-背景 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['speedX'] = Number( dataFrom["背景X速度"] || 0);
		data['speedY'] = Number( dataFrom["背景Y速度"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > 动态遮罩
		data['mask_mode'] = String( dataFrom["遮罩模式"] || "关闭");
		data['src_mouse_mask'] = String( dataFrom["资源-鼠标透视镜"] || "");
		
		return data;
	}
	
	/*-----------------样式集------------------*/
	DrillUp.g_DSB_list_length = 20;
	DrillUp.g_DSB_list = [];
	for( var i = 0; i < DrillUp.g_DSB_list_length; i++ ){
		if( DrillUp.parameters["背景层-" + String(i+1) ] != undefined &&
			DrillUp.parameters["背景层-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["背景层-" + String(i+1) ]);
			DrillUp.g_DSB_list[i] = DrillUp.drill_DSB_initStyle( data );
			DrillUp.g_DSB_list[i]['id'] = i;
			DrillUp.g_DSB_list[i]['inited'] = true;
		}else{
			DrillUp.g_DSB_list[i] = DrillUp.drill_DSB_initStyle( {} );
			DrillUp.g_DSB_list[i]['inited'] = false;
		}
	}

	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfDynamicMask &&
	Imported.Drill_DialogSkin ){
	

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_DSB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_DSB_pluginCommand.call(this, command, args);
	if( command === ">对话框背景" ){
		
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( type == "显示" ){	
				temp1 = temp1.replace("背景[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1)-1;
				$gameSystem._drill_DSB_visibleTank[ temp1 ] = true;
			}
			if( type == "隐藏" ){	
				temp1 = temp1.replace("背景[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1)-1;
				$gameSystem._drill_DSB_visibleTank[ temp1 ] = false;
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
DrillUp.g_DSB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DSB_sys_initialize.call(this);
	this.drill_DSB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DSB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DSB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DSB_saveEnabled == true ){	
		$gameSystem.drill_DSB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DSB_initSysData();
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
Game_System.prototype.drill_DSB_initSysData = function() {
	this.drill_DSB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DSB_checkSysData = function() {
	this.drill_DSB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DSB_initSysData_Private = function() {
	
	this._drill_DSB_visibleTank = [];		//显示情况
	for(var i = 0; i < DrillUp.g_DSB_list.length; i++ ){
		this._drill_DSB_visibleTank[i] = DrillUp.g_DSB_list[i]['visible'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DSB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DSB_visibleTank == undefined ){
		this.drill_DSB_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_DSB_list.length; i++ ){
		var temp_data = JSON.parse(JSON.stringify( DrillUp.g_DSB_list[i] ));
		
		// > 已配置（'inited'为 false 表示空数据）
		if( temp_data['inited'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_DSB_visibleTank[i] == undefined ){
				this._drill_DSB_visibleTank[i] = temp_data['visible'];
			
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
var _drill_DSB_wm_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
	_drill_DSB_wm_initialize.call( this );

	this.drill_DSB_createSprite();			//创建背景
};
//==============================
// * 对话框 - 设置背景（非帧刷新，窗口/暗淡/透明）
//
//			说明：	窗口类型切换时，刷新背景的出现情况。
//==============================
var _drill_DSB_setBackgroundType = Window_Message.prototype.setBackgroundType;
Window_Message.prototype.setBackgroundType = function( type ){
	_drill_DSB_setBackgroundType.call( this,type );
	
    if( type === 0 ){	// 窗口 类型
		this.drill_DSB_refreshSprite();
	}
}

//==============================
// * 通用函数 - 创建背景
//==============================
Window_Message.prototype.drill_DSB_createSprite = function() {
	
	// > 背景层
	this._drill_DSB_spriteLayer = new Sprite();
    var borderIndex = this.children.indexOf(this._drill_DSk_border);
    this.addChildAt( this._drill_DSB_spriteLayer, borderIndex + 1);	//（层级添加在边框前面）
	
	// > 背景列表
	this._drill_DSB_spriteTank = [];
	this._drill_DSB_curStyle = -1;
};
//==============================
// * 通用函数 - 刷新背景
//
//			说明：	每个窗口中都建立一个装饰图层，然后根据样式检查，删除全部装饰图，再重建并添加到图层。
//==============================
Window_Message.prototype.drill_DSB_refreshSprite = function(){
	
	// > 样式检查
	var styleId = $gameSystem.drill_DSk_getStyleId( this._drill_DSk_tag );
	if( styleId == -1 ){ return; }
	if( styleId == this._drill_DSB_curStyle ){ return; }
	this._drill_DSB_curStyle = styleId;
	
	// > 清空背景
	for(var i = this._drill_DSB_spriteTank.length-1; i >= 0; i-- ){
		var temp_sprite = this._drill_DSB_spriteTank[i];
		this._drill_DSB_spriteLayer.removeChild( temp_sprite );
		this._drill_DSB_spriteTank.splice(i,1);
	}
	
	// > 建立背景
	for( var i = 0; i < DrillUp.g_DSB_list.length; i++ ){
		var temp_data = DrillUp.g_DSB_list[i];
		if( temp_data['inited'] == false ){ continue; }
		if( temp_data['styleId']-1 == -1 ){ continue; }
		if( temp_data['styleId']-1 == styleId ){
			var temp_sprite = new Drill_DSB_DecorationBackground( temp_data, this );
			temp_sprite.zIndex = temp_data['zIndex'];
			this._drill_DSB_spriteLayer.addChild( temp_sprite );
			this._drill_DSB_spriteTank.push( temp_sprite );
		}
	}
	
	// > 层级排序
	this._drill_DSB_spriteLayer.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};


//=============================================================================
// * 对话框子窗口
//=============================================================================
//==============================
// * 金钱窗口 - 初始化
//==============================
var _drill_DSB_createSubWindows = Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function(){
	_drill_DSB_createSubWindows.call( this );
	this._goldWindow.drill_DSB_createSprite = this.drill_DSB_createSprite;		
	this._goldWindow.drill_DSB_refreshSprite = this.drill_DSB_refreshSprite;	
	
	this._goldWindow.drill_DSB_createSprite();		//创建背景
}
//==============================
// * 金钱窗口 - 刷新
//==============================
var _drill_DSB_Gold_open = Window_Gold.prototype.open;
Window_Gold.prototype.open = function() {
	_drill_DSB_Gold_open.call(this);
	
	if( this._drill_DSB_tag != undefined ){
		this.drill_DSB_refreshSprite();
	}
}
//==============================
// * 选择项窗口 - 相同函数
//==============================
Window_ChoiceList.prototype.drill_DSB_createSprite = Window_Message.prototype.drill_DSB_createSprite;
Window_ChoiceList.prototype.drill_DSB_refreshSprite = Window_Message.prototype.drill_DSB_refreshSprite;
//==============================
// * 选择项窗口 - 初始化
//==============================
var _drill_DSB_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
Window_ChoiceList.prototype.initialize = function( messageWindow ){
	_drill_DSB_ChoiceList_initialize.call( this,messageWindow );
	this.drill_DSB_createSprite();
}
//==============================
// * 选择项窗口 - 刷新
//==============================
var _drill_DSB_ChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function() {
	_drill_DSB_ChoiceList_start.call(this);
	this.drill_DSB_refreshSprite();	
}
//==============================
// * 数字输入窗口 - 相同函数
//==============================
Window_NumberInput.prototype.drill_DSB_createSprite = Window_Message.prototype.drill_DSB_createSprite;
Window_NumberInput.prototype.drill_DSB_refreshSprite = Window_Message.prototype.drill_DSB_refreshSprite;
//==============================
// * 数字输入窗口 - 初始化
//==============================
var _drill_DSB_NumberInput_initialize = Window_NumberInput.prototype.initialize;
Window_NumberInput.prototype.initialize = function( messageWindow ){
	_drill_DSB_NumberInput_initialize.call( this,messageWindow );
	this.drill_DSB_createSprite();
}
//==============================
// * 数字输入窗口 - 刷新
//==============================
var _drill_DSB_NumberInput_start = Window_NumberInput.prototype.start;
Window_NumberInput.prototype.start = function() {
	_drill_DSB_NumberInput_start.call(this);
	this.drill_DSB_refreshSprite();
}
//==============================
// * 选择物品窗口 - 相同函数
//==============================
Window_EventItem.prototype.drill_DSB_createSprite = Window_Message.prototype.drill_DSB_createSprite;
Window_EventItem.prototype.drill_DSB_refreshSprite = Window_Message.prototype.drill_DSB_refreshSprite;
//==============================
// * 选择物品窗口 - 初始化
//==============================
var _drill_DSB_EventItem_initialize = Window_EventItem.prototype.initialize;
Window_EventItem.prototype.initialize = function( messageWindow ){
	_drill_DSB_EventItem_initialize.call( this,messageWindow );
	this.drill_DSB_createSprite();
}
//==============================
// * 选择物品窗口 - 刷新
//==============================
var _drill_DSB_EventItem_start = Window_EventItem.prototype.start;
Window_EventItem.prototype.start = function() {
	_drill_DSB_EventItem_start.call(this);
	this.drill_DSB_refreshSprite();
}



//=============================================================================
// ** 对话框背景【Drill_DSB_DecorationBackground】
//
//			说明：	每个背景都配有一个 动态遮罩贴图，可以用不同的鼠标指针资源改变不同的遮罩。
//			
// 			代码：	> 范围 - 该类额外显示平铺背景的装饰。
//					> 结构 - [ ●合并/分离/ 混乱 ] 数据与贴图合并。只有visible被控制。
//					> 数量 - [单个/ ●多个 ] 
//					> 创建 - [一次性/ ●自延迟 /外部延迟] 鼠标透视镜需要延迟创建。
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 背景 - 定义
//==============================
function Drill_DSB_DecorationBackground() {
	this.initialize.apply(this, arguments);
}
Drill_DSB_DecorationBackground.prototype = Object.create(TilingSprite.prototype);
Drill_DSB_DecorationBackground.prototype.constructor = Drill_DSB_DecorationBackground;
//==============================
// * 背景 - 初始化
//==============================
Drill_DSB_DecorationBackground.prototype.initialize = function( data, parent ){
	TilingSprite.prototype.initialize.call(this);
	this._drill_data = data;
	this._drill_parent = parent;
	this._drill_inited = false;
	
	this._drill_parent_width = 0;
	this._drill_parent_height = 0;
	
	// > 贴图属性
	this.bitmap = ImageManager.loadBitmap( data['src_file'], data['src_img'], 0, true);
	this.origin.x = data['x'];
	this.origin.y = data['y'];
	this.opacity = data['opacity'];
	this.blendMode = data['blendMode'];
	this.visible = false;
};
//==============================
// * 背景 - 帧刷新
//==============================
Drill_DSB_DecorationBackground.prototype.update = function() {
	TilingSprite.prototype.update.call(this);
	
	if( this.bitmap.isReady() == false ){ return; }
	this.drill_DSB_updateVisible();				//帧刷新 - 可见情况
	this.drill_DSB_updateSpriteInit();			//帧刷新 - 贴图创建
	this.drill_DSB_updateSize();				//帧刷新 - 窗口大小变化
	this.drill_DSB_updateMousePosition();		//帧刷新 - 鼠标遮罩
}
//==============================
// * 帧刷新 - 可见情况
//==============================
Drill_DSB_DecorationBackground.prototype.drill_DSB_updateVisible = function() {
	var data = this._drill_data;
	
	this.visible = $gameSystem._drill_DSB_visibleTank[ data['id'] ];
	this.scale.y = this._drill_parent._windowSpriteContainer.scale.y;	//（保持y缩放）
}
//==============================
// * 帧刷新 - 贴图创建
//==============================
Drill_DSB_DecorationBackground.prototype.drill_DSB_updateSpriteInit = function() {
	if( this._drill_inited == true ){ return; }
	this._drill_inited = true;
	var data = this._drill_data;	
	if( data['mask_mode'] == "关闭" ){ return; }
	
	// > 动态遮罩贴图（直接游戏大小，这样就不需要改变遮罩大小了）
	this._drill_mask = new Drill_CODM_MaskSprite( Graphics.boxWidth, Graphics.boxHeight );
	if( data['mask_mode'] == "开启反向遮罩" ){
		this._drill_mask.drill_CODM_setConvert( true );
	}
	this.addChild( this._drill_mask );
	this.mask = this._drill_mask;
	
	// > 鼠标透视镜
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.loadBitmap( data['src_file'], data['src_mouse_mask'], 0, true);
	temp_sprite.x = 0;
	temp_sprite.y = -1 * Graphics.boxHeight;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	this._drill_mouseSprite = temp_sprite;
	this._drill_mask.drill_CODM_addMaskChild( temp_sprite );
}
//==============================
// * 帧刷新 - 窗口大小变化
//==============================
Drill_DSB_DecorationBackground.prototype.drill_DSB_updateSize = function() {
	if( this._drill_parent_width == this._drill_parent.width && 
		this._drill_parent_height == this._drill_parent.height ){ return; }
	this._drill_parent_width = this._drill_parent.width;
	this._drill_parent_height = this._drill_parent.height;
	var data = this._drill_data;
	
	// > 背景变化
    var m = data['backInner'];
    var w = this._drill_parent_width - m * 2;
    var h = this._drill_parent_height - m * 2;
	this.move(m, m, w, h);		//（填满窗口矩形）
	
	//（不需要改变遮罩大小）
}
//==============================
// * 帧刷新 - 鼠标遮罩
//==============================
Drill_DSB_DecorationBackground.prototype.drill_DSB_updateMousePosition = function() {
	if( this._drill_mouseSprite == undefined ){ return; }
	
	var xx = _drill_mouse_x;
	var yy = _drill_mouse_y;
	xx -= this._drill_parent.x;
	yy -= this._drill_parent.y;
	this._drill_mouseSprite.x = xx;
	this._drill_mouseSprite.y = yy;
}

//=============================================================================
// ** 获取鼠标位置（输入设备核心的片段）
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogSkinBackground = false;
		alert(
			"【Drill_DialogSkinBackground.js  对话框 - 对话框背景】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfDynamicMask  系统-动态遮罩核心"+
			"\n- Drill_DialogSkin  对话框-对话框皮肤"
		);
}


