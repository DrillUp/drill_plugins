//=============================================================================
// Drill_MenuScrollBar.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        主菜单 - 多样式菜单滚动条
 * @author Drill_up
 * 
 * @Drill_LE_param "滚动条样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MSB_list_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_MenuScrollBar +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在含选项的窗口中添加滚动条。
 * ★★必须放在所有 面板类 插件之前★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 也可以被其他插件扩展，支持更多功能。
 * 可被扩展：
 *   - Drill_CoreOfInput          系统-输入设备核心
 *     通过目标插件，能够实现鼠标拖拽滚动条内条的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面、菜单界面。
 *   作用于所有含选项的窗口。
 * 2.详细内容去看看 "17.主菜单 > 关于指针与边框.docx"。
 * 资源划分：
 *   (1.边框会根据资源划分的厚度，纵向划分成3个部分。
 *      外框和内条的高度根据窗口高度来变化，宽度不变。
 *   (2.具体可以去看看文档的图解。
 * 多样式：
 *   (1.你可以通过插件指令修改默认样式。
 *      隐藏、显示都是即时的，且永久有效。
 *   (2.所有drill面板插件中的 含选项的窗口 都支持指针样式锁定。
 *      你可以针对特定的窗口配置自定义的样式。
 * 鼠标拖动：
 *   (1.你可以使用鼠标拖动内条，来实现滚动条拖拽换页功能。
 *      拖拽有效范围为：内条资源的宽度 x 窗口高度。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 滚动条样式1 资源-外框
 * 滚动条样式1 资源-内条
 * 滚动条样式2 资源-外框
 * 滚动条样式2 资源-内条
 * 滚动条样式3 资源-外框
 * 滚动条样式3 资源-内条
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动控制外框的属性：
 * 
 * 插件指令：>菜单滚动条 : 显示
 * 插件指令：>菜单滚动条 : 隐藏
 * 插件指令：>菜单滚动条 : 修改样式 : 样式[2]
 * 
 * 1.修改样式后，对所有窗口都有效，但不包括锁定了外框的窗口。
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
 * 时间复杂度： o(n^3)*o(贴图处理)*o(选项窗口数) 每帧
 * 测试方法：   在不同界面进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【69.46ms】
 *              地图界面中，平均消耗为：【29.31ms】
 *              菜单界面中，平均消耗为：【60.93ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.滚动条在有多个选项窗口时，消耗较多，因为每个选项窗口都带一个
 *   滚动条，并且需要处理鼠标接近的消息事件。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了滚动条设置偏移位置功能。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 *
 * 
 * @param 默认滚动条样式
 * @type number
 * @min 1
 * @desc 菜单滚动条默认使用的样式。
 * @default 1
 *
 * @param ---滚动条样式集---
 * @default
 *
 * @param 滚动条样式-1
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default {"标签":"--默认滚动条--","边沿靠向":"右侧","未激活时透明度":"125","---外框---":"","资源-外框":"[\"滚动条外框-默认\"]","外框帧间隔":"4","外框是否倒放":"false","外框划分厚度":"12","外框拉伸方式":"循环平铺","---内条---":"","资源-内条":"[\"滚动条内条-默认\"]","内条帧间隔":"4","内条是否倒放":"false","内条划分厚度":"12","内条拉伸方式":"循环平铺","鼠标未悬停时内条透明度":"125"}
 * 
 * @param 滚动条样式-2
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-3
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-4
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-5
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-6
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-7
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-8
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-9
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-10
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-11
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-12
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-13
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-14
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-15
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-16
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-17
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-18
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-19
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 *
 * @param 滚动条样式-20
 * @parent ---滚动条样式集---
 * @type struct<DrillMSBStyle>
 * @desc 菜单滚动条的详细配置信息。
 * @default 
 * 
 * 
 */
/*~struct~DrillMSBStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的滚动条样式--
 * 
 * @param ---常规---
 * @desc 
 * 
 * @param 边沿靠向
 * @parent ---常规---
 * @type select
 * @option 左侧
 * @value 左侧
 * @option 右侧
 * @value 右侧
 * @desc 滚动条靠向的边沿。
 * @default 右侧
 * 
 * @param 偏移-滚动条 X
 * @parent ---常规---
 * @desc 以自动适应的位置为基准，x轴方向平移，正右负左，单位像素。
 * @default 0
 * 
 * @param 偏移-滚动条 Y
 * @parent ---常规---
 * @desc 以自动适应的位置为基准，y轴方向平移，正下负上，单位像素。
 * @default 0
 * 
 * @param 未激活时透明度
 * @parent ---常规---
 * @type number
 * @min 0
 * @min 255
 * @desc 滚动条在窗口未激活时的透明度。0为完全透明，255为完全不透明。
 * @default 125
 * 
 * @param ---外框---
 * @desc 
 * 
 * @param 资源-外框
 * @parent ---外框---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default ["(需配置)菜单滚动条外框"]
 * @require 1
 * @dir img/Menu__ui/
 * @type file[]
 * 
 * @param 外框帧间隔
 * @parent ---外框---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 外框是否倒放
 * @parent ---外框---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放，gif的播放顺序。
 * @default false
 * 
 * @param 外框划分厚度
 * @parent ---外框---
 * @type number
 * @min 1
 * @desc 插件将从资源图片的边界向内划分一定像素的厚度，并切割成三份，具体可见文档描述。
 * @default 15
 * 
 * @param 外框拉伸方式
 * @parent ---外框---
 * @type select
 * @option 循环平铺
 * @value 循环平铺
 * @option 缩放拉伸
 * @value 缩放拉伸
 * @option 保持切割原样
 * @value 保持切割原样
 * @desc 外框的拉伸方式。
 * @default 循环平铺
 * 
 * @param ---内条---
 * @desc 
 * 
 * @param 资源-内条
 * @parent ---内条---
 * @desc png图片资源组，可以是单张图片，也可以是多张构成的GIF。
 * @default ["(需配置)菜单滚动条内条"]
 * @require 1
 * @dir img/Menu__ui/
 * @type file[]
 * 
 * @param 内条帧间隔
 * @parent ---内条---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 内条是否倒放
 * @parent ---内条---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放，gif的播放顺序。
 * @default false
 * 
 * @param 内条划分厚度
 * @parent ---内条---
 * @type number
 * @min 1
 * @desc 插件将从资源图片的边界向内划分一定像素的厚度，并切割成三份，具体可见文档描述。
 * @default 15
 * 
 * @param 内条拉伸方式
 * @parent ---内条---
 * @type select
 * @option 循环平铺
 * @value 循环平铺
 * @option 缩放拉伸
 * @value 缩放拉伸
 * @option 保持切割原样
 * @value 保持切割原样
 * @desc 内条的拉伸方式。
 * @default 循环平铺
 * 
 * @param 鼠标未悬停时内条透明度
 * @parent ---内条---
 * @type number
 * @min 0
 * @min 255
 * @desc 滚动条的内条在鼠标未悬停时的透明度，悬停则固定透明度为255全亮。0为完全透明，255为完全不透明。
 * @default 125
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MSB（Menu_Scroll_Bar）
//		临时全局变量	无
//		临时局部变量	this._drill_MSB_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理)*o(选项窗口数)
//		★性能测试因素	技能面板
//		★性能测试消耗	菜单：60.93ms + 31.06ms（在多个函数中都找到了其身影）
//						地图：29.31ms，21.98ms
//						战斗：69.46ms，39.87ms（update函数被包括了一大堆的东西，有450.20ms，包括滤镜、窗口核心等所有刷新物，实际相减发现只有39.87ms）
//		★最坏情况		暂无
//		★备注			指针。边框、滚动条这三个插件在性能中出现的频率非常高，很难确定实际消耗量。
//						拖动时，消耗比较大，正常情况消耗不大。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			滚动条：
//				->靠左/靠右
//				->外框
//					->3区域剪切
//				->内条
//					->3区域剪切
//					->内条拖拽
//						->判定鼠标悬停
//						->判定鼠标按下
//						->判定鼠标释放
//						->拖拽计算
//
//		★私有类如下：
//			* Drill_MSB_Sprite【滚动条贴图】
//
//		★必要注意事项：
//			1.这里坐标的计算非常绕，要分清楚下面的内容：
//				内条高度、内条可活动高度（两者相加固定为窗口高度，因为滚动条以窗口为准）
//				当前滚动的位置比例
//			  topRow、topIndex见笔记中的 计算后的属性-滚动行 的内容。
//		
//		★其它说明细节：
//			1.这个插件贴图的原理很简单，平铺用TilingSprite，拉伸用scale.x。
//			  只是切割比较麻烦，要说明清楚。
//			
//		★存在的问题：
//			1.诡异bug：滚动条放入任何一个layer都会影响这个 技能块插件 的 第7个sprite，使其在战斗界面不停的闪
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuScrollBar = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MenuScrollBar');

	//==============================
	// * 变量获取 - 样式
	//				（~struct~DrillMSBStyle）
	//==============================
	DrillUp.drill_MSB_initStyle = function( dataFrom ) {
		var data = {};
		data['scroll_pos'] = String( dataFrom["边沿靠向"] || "右侧");
		data['shifting_x'] = Number( dataFrom["偏移-滚动条 X"] || 0);
		data['shifting_y'] = Number( dataFrom["偏移-滚动条 Y"] || 0);
		data['opacity'] = Number( dataFrom["未激活时透明度"] || 125);
		
		// > 外框
		if( dataFrom["资源-外框"] != "" &&
			dataFrom["资源-外框"] != undefined ){
			data['border_gif_src'] = JSON.parse( dataFrom["资源-外框"] );
		}else{
			data['border_gif_src'] = [];
		}
		data['border_gif_src_file'] = "img/Menu__ui/";
		data['border_gif_interval'] = Number( dataFrom["外框帧间隔"] || 4);
		data['border_gif_back_run'] = String( dataFrom["外框是否倒放"] || "false") == "true";
		data['border_thickness'] = Number( dataFrom["外框划分厚度"] || 5);
		data['border_type'] = String( dataFrom["外框拉伸方式"] || "循环平铺");
		
		// > 内条
		if( dataFrom["资源-内条"] != "" &&
			dataFrom["资源-内条"] != undefined ){
			data['bar_gif_src'] = JSON.parse( dataFrom["资源-内条"] );
		}else{
			data['bar_gif_src'] = [];
		}
		data['bar_gif_src_file'] = "img/Menu__ui/";
		data['bar_gif_interval'] = Number( dataFrom["内条帧间隔"] || 4);
		data['bar_gif_back_run'] = String( dataFrom["内条是否倒放"] || "false") == "true";
		data['bar_thickness'] = Number( dataFrom["内条划分厚度"] || 5);
		data['bar_type'] = String( dataFrom["内条拉伸方式"] || "循环平铺");
		data['bar_opacity'] = Number( dataFrom["鼠标未悬停时内条透明度"] || 125);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_MSB_defaultStyle = Number(DrillUp.parameters["默认滚动条样式"] || 1); 
	
	/*-----------------样式集------------------*/
	DrillUp.g_MSB_list_length = 20;
	DrillUp.g_MSB_list = [];
	for( var i = 0; i < DrillUp.g_MSB_list_length; i++ ){
		if( DrillUp.parameters["滚动条样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["滚动条样式-" + String(i+1) ] != "" ){
			var sequence = JSON.parse(DrillUp.parameters["滚动条样式-" + String(i+1) ]);
			DrillUp.g_MSB_list[i] = DrillUp.drill_MSB_initStyle( sequence );
		}else{
			DrillUp.g_MSB_list[i] = DrillUp.drill_MSB_initStyle( {} );
		}
	}

	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MSB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MSB_pluginCommand.call(this, command, args);
	if( command === ">菜单滚动条" ){
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "显示" ){	
				$gameSystem._drill_MSB_visible = true;
			}
			if( type == "隐藏" ){	
				$gameSystem._drill_MSB_visible = false;
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改样式" ){	
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_MSB_style = Number(temp1);
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
DrillUp.g_MSB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MSB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MSB_sys_initialize.call(this);
	this.drill_MSB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MSB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MSB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MSB_saveEnabled == true ){	
		$gameSystem.drill_MSB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MSB_initSysData();
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
Game_System.prototype.drill_MSB_initSysData = function() {
	this.drill_MSB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MSB_checkSysData = function() {
	this.drill_MSB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MSB_initSysData_Private = function() {
	
	this._drill_MSB_visible = true;
	this._drill_MSB_style = DrillUp.g_MSB_defaultStyle;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MSB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MSB_style == undefined ){
		this.drill_MSB_initSysData();
	}
	
};


//=============================================================================
// * 选项窗口
//=============================================================================
//==============================
// * 选项窗口 - 初始化
//==============================
var _drill_MSB_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function( x, y, width, height ){
	_drill_MSB_initialize.call(this,x, y, width, height);
	
	//（诡异bug：滚动条放入任何一个layer都会影响这个 技能块插件 的 第7个sprite，使其在战斗界面不停的闪）
	
	// > 选项层
	//if( this._drill_selectable_layer == undefined ){
	//	this._drill_selectable_layer = new Sprite();
	//	this.addChild( this._drill_selectable_layer );
	//}
	
	// > 滚动条
	this._drill_MSB_needRefresh = false;
	this._drill_MSB_sprite = new Drill_MSB_Sprite( this );
	this._drill_MSB_sprite.zIndex = 10;
	this.addChild( this._drill_MSB_sprite );
	//this._drill_selectable_layer.addChild( this._drill_MSB_sprite );
	
	// > 层级排序
	//this._drill_selectable_layer.children.sort(function(a, b){return a.zIndex-b.zIndex});
	
	// > 内条拖拽
	this._drill_MSB_isHovering = false;
	this._drill_MSB_isDraging = false;
	this._drill_MSB_dragingLastPos = 0;		//拖拽前的鼠标y位置
	this._drill_MSB_dragingLastTopRow = 0;	//拖拽前所在滚动行
	this._drill_MSB_dragingTopRow = 0;		//拖拽时所在滚动行
	
};
//==============================
// * 选项窗口 - 帧刷新
//==============================
var _drill_MSB_update = Window_Selectable.prototype.update
Window_Selectable.prototype.update = function() {
    _drill_MSB_update.call(this);
	
	// > 样式控制
	if( this._drill_MSB_sprite != undefined ){
		this._drill_MSB_sprite.drill_MSB_changeStyle( this.drill_MSB_scrollBarStyleId() );
	}
	
	// > 内条拖拽
	this.drill_MSB_updateScrollHoverCheck();		//判定鼠标悬停
	this.drill_MSB_updateScrollPressCheck();		//判定鼠标按下
	this.drill_MSB_updateScrollReleaseCheck();		//判定鼠标释放
	this.drill_MSB_updateScrolling();				//执行拖拽
};
//==============================
// * 选项窗口 - 捕获
//==============================
var _drill_MSB_setCursorRect = Window_Selectable.prototype.setCursorRect;
Window_Selectable.prototype.setCursorRect = function( x, y, width, height ){
	_drill_MSB_setCursorRect.call(this,x, y, width, height);
	this._drill_MSB_needRefresh = true;
};
//==============================
// * 选项窗口 - 比例 - 判断是否需要滚动
//==============================
Window_Selectable.prototype.drill_MSB_needScroll = function(){
	return this.maxItems() > this.maxPageItems() ; 
};
//==============================
// * 选项窗口 - 比例 - 获取当前滚动的位置比例
//==============================
Window_Selectable.prototype.drill_MSB_curScrollPosition = function(){
	if( this.topRow() < 0 ){ return 0; }
	if( this.topRow() > this.maxTopRow() ){ return 1; }
	return this.topRow() / this.maxTopRow(); 
};
//==============================
// * 选项窗口 - 比例 - 内条高度
//	
//				说明：	内条高度无论值为多少，都不会影响实际滚动比例，因为高度只是用来可视化有多少行的装饰性高度。
//==============================
Window_Selectable.prototype.drill_MSB_barHeight = function() {
	var hh = this.height;
	// 确定两点：(1,0.8) (30,0.1) 30个滚动行时，最小0.1长
	var per = (  this.maxTopRow()*(-7)/290 + 232/290  ).clamp( 0.1, 1 );
	if( this.maxTopRow() == 1 ){ per = 0.88; }
	if( this.maxTopRow() == 2 ){ per = 0.84; }
	if( this.maxTopRow() == 3 ){ per = 0.80; }
	return Math.round(hh * per);
};
//==============================
// * 选项窗口 - 比例 - 内条可活动高度
//==============================
Window_Selectable.prototype.drill_MSB_barScrollHeight = function() {
	return this.height - this.drill_MSB_barHeight();
};
//==============================
// * 选项窗口 - 是否启用滚动条（子类继承用接口）
//==============================
Window_Selectable.prototype.drill_MSB_scrollBarEnabled = function() {
	return true;
}
//==============================
// * 选项窗口 - 当前滚动条样式（子类继承用接口）
//==============================
Window_Selectable.prototype.drill_MSB_scrollBarStyleId = function() {
	return $gameSystem._drill_MSB_style;
}

//=============================================================================
// * 选项窗口内条拖拽
//=============================================================================
//==============================
// * 内条拖拽 - 判定鼠标悬停
//==============================
Window_Selectable.prototype.drill_MSB_updateScrollHoverCheck = function() {
	if( this.active != true ){ return; }
	if( this._drill_MSB_sprite == undefined ){ return; }
	if( this._drill_MSB_sprite.drill_MSB_isBarReady() == false ){ return; }
	
	if( this.drill_MSB_isOnRange() ){
		this._drill_MSB_isHovering = true;
	}else{
		this._drill_MSB_isHovering = false;
	}
}
//==============================
// * 内条拖拽 - 判定鼠标按下
//==============================
Window_Selectable.prototype.drill_MSB_updateScrollPressCheck = function() {
	if( Imported.Drill_CoreOfInput != true ){ return; }

	var drag_on = false;
	if( TouchInput.drill_isLeftTriggerd() ){	//鼠标左键按下[一帧]
		drag_on = true;
	}
	if( TouchInput.drill_isRightTriggerd() ){	//鼠标右键按下[一帧]
		drag_on = true;
	}
	
	if( drag_on == true ){
		if( this.drill_MSB_isOnRange() ){
			this._drill_MSB_isDraging = true; 
			this._drill_MSB_dragingLastPos = _drill_mouse_y;	//拖拽前的鼠标y位置
			this._drill_MSB_dragingLastTopRow = this.topRow();	//拖拽前所在滚动行
			this._drill_MSB_dragingTopRow = this.topRow();		//拖拽时所在滚动行
		}
	}
}
//==============================
// * 内条拖拽 - 判定鼠标释放
//==============================
Window_Selectable.prototype.drill_MSB_updateScrollReleaseCheck = function() {
	if( Imported.Drill_CoreOfInput != true ){ return; }

	var drag_off = false;
	if( TouchInput.drill_isLeftReleased() ){	//鼠标左键释放[一帧]
		drag_off = true;
	}
	if( TouchInput.drill_isRightReleased() ){	//鼠标右键释放[一帧]
		drag_off = true;
	}
	
	if( drag_off == true ){
		this._drill_MSB_isDraging = false;
	}
}
//==============================
// * 内条拖拽 - 判断悬停
//==============================
Window_Selectable.prototype.drill_MSB_isOnRange = function() {
	if( this.active != true ){ return; }
	if( this._drill_MSB_sprite == undefined ){ return; }
	if( this._drill_MSB_sprite.drill_MSB_isBarReady() == false ){ return; }
	var sprite = this._drill_MSB_sprite;
	var rect = this._drill_MSB_sprite.drill_MSB_getBarRect();
	var cw = rect.width;
	var ch = rect.height;
	var cx = rect.x + sprite.x + this.x ;	//（内条范围+贴图位置+窗口位置）
	var cy = rect.y + sprite.y + this.y ;
	var _x = _drill_mouse_x;
	var _y = _drill_mouse_y;
	if ( _x <  cx + 0  ){ return false };
	if ( _x >= cx + cw ){ return false };
	if ( _y <  cy + 0  ){ return false };
	if ( _y >= cy + ch ){ return false };
	return true;	
}
//==============================
// * 内条拖拽 - 执行拖拽
//==============================
Window_Selectable.prototype.drill_MSB_updateScrolling = function() {
	if( Imported.Drill_CoreOfInput != true ){ return; }
	if( this._drill_MSB_isDraging == false ){ return; }
	
	// > 在可活动区域内，拖动dy
	var hh = this.drill_MSB_barScrollHeight();
	var ph = hh/this.maxTopRow();		//（每页所占滚动条高度）
	var dy = _drill_mouse_y - this._drill_MSB_dragingLastPos;
	var index_y = Math.round( dy/ph );	//拖拽偏移（如果往上拖，则为负数）
	
	// > 拖拽计算
	var tar_row = this._drill_MSB_dragingLastTopRow + index_y;
	if( tar_row < 0 ){ tar_row = 0; }
	if( tar_row > this.maxTopRow() ){ tar_row = this.maxTopRow(); }
	
	// > 执行拖拽
	if( this._drill_MSB_dragingTopRow != tar_row ){
		this._drill_MSB_dragingTopRow = tar_row;
		this.setTopRow( tar_row );
		
		// > 越界修正
		if( this._index < this.topIndex() ){
			this.select( this.topIndex() );
			SoundManager.playCursor();
		}
		var bottom_index = ( this.topRow() + this.maxPageRows() )*this.maxCols();
		if( this._index >= bottom_index ){
			this.select( bottom_index-1 );
			SoundManager.playCursor();
		}
	}
}


//=============================================================================
// ** 滚动条贴图【Drill_MSB_Sprite】
//
//	 		代码：	> 范围 - 该类给每个选项窗口额外添加滚动条功能。
//					> 结构 - [ ●合并 /分离/混乱] 数据与贴图合并，外部只能改样式。
//					> 数量 - [单个/ ●多个 ] 每个选项窗口带一个。
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁 ] 
//					> 样式 - [不可修改/ ●自变化 /外部变化] 所有样式的参数都在贴图内部自变化。
//
//			说明：	> 内条的矩形区域以及滚动高度，都由外部控制。
//					> 贴图只提供可视化效果 以及鼠标悬停的范围。
//=============================================================================
//==============================
// * 滚动条 - 定义
//==============================
function Drill_MSB_Sprite() {
	this.initialize.apply(this, arguments);
}
Drill_MSB_Sprite.prototype = Object.create(Sprite_Base.prototype);
Drill_MSB_Sprite.prototype.constructor = Drill_MSB_Sprite;
//==============================
// * 滚动条 - 初始化
//==============================
Drill_MSB_Sprite.prototype.initialize = function( parent ){
	Sprite_Base.prototype.initialize.call(this);
	this._drill_parent = parent;
	this._drill_curStyleId = DrillUp.g_MSB_defaultStyle;
	this._drill_curStyle = JSON.parse(JSON.stringify( DrillUp.g_MSB_list[ this._drill_curStyleId-1 ] ));	//深拷贝数据
	
	this.drill_initSprite();			//初始化对象
};
//==============================
// * 滚动条 - 帧刷新
//==============================
Drill_MSB_Sprite.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	if( this._drill_parent == undefined ){ return; }
	this.drill_updateSprite();			//帧刷新对象
};
//==============================
// * 滚动条 - 修改样式（接口）
//==============================
Drill_MSB_Sprite.prototype.drill_MSB_changeStyle = function( style_id ){
	if( style_id == 0 ){ return; }
	if( this._drill_curStyleId == style_id ){ return; }
	this._drill_curStyleId = style_id;
	this._drill_curStyle = JSON.parse(JSON.stringify( DrillUp.g_MSB_list[ this._drill_curStyleId-1 ] ));	//深拷贝数据
	this.drill_initSprite();			//强制重新初始化;
};
//==============================
// * 创建 - 初始化对象
//==============================
Drill_MSB_Sprite.prototype.drill_initSprite = function() {
	var data = this._drill_curStyle;	
	
	// > 私有属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.opacity = 0;
	this.visible = false;
	
	// > 私有变量初始化
	this._drill_time = 0;							//持续时间
	this._drill_border_bitmaps = [];				//外框bitmap对象序列
	this._drill_bar_bitmaps = [];					//内条bitmap对象序列
	
	// > 资源读取
	for(var j = 0; j < data['border_gif_src'].length ; j++){
		var src_str = data['border_gif_src'][j];
		var obj_bitmap = ImageManager.loadBitmap( data['border_gif_src_file'], src_str, 0, true);
		this._drill_border_bitmaps.push( obj_bitmap );
	};
	for(var j = 0; j < data['bar_gif_src'].length ; j++){
		var src_str = data['bar_gif_src'][j];
		var obj_bitmap = ImageManager.loadBitmap( data['bar_gif_src_file'], src_str, 0, true);
		this._drill_bar_bitmaps.push( obj_bitmap );
	};
	
	this.drill_createBorder();
	this.drill_createBar();
}
//==============================
// * 创建 - 外框
//==============================
Drill_MSB_Sprite.prototype.drill_createBorder = function() {
	var data = this._drill_curStyle;	
	var pww = this._drill_parent.width;
	var phh = this._drill_parent.height;
	
	// > 清理贴图
	if( this._borderSprite_1 != undefined ){ this.removeChild( this._borderSprite_1 ); }
	if( this._borderSprite_2 != undefined ){ this.removeChild( this._borderSprite_2 ); }
	if( this._borderSprite_3 != undefined ){ this.removeChild( this._borderSprite_3 ); }
	
	// > 建立区域
	if( data['border_type'] == "循环平铺" ){
		this._borderSprite_1 = new Sprite();
		this._borderSprite_1.anchor.x = 0.5;
		this._borderSprite_1.anchor.y = 1.0;
		this._borderSprite_2 = new TilingSprite();	//TilingSprite平铺图层
		this._borderSprite_2.move(0, 0, 0, 0);
		this._borderSprite_2.origin.x = 0;
		this._borderSprite_2.origin.y = 0;
		this._borderSprite_3 = new Sprite();
		this._borderSprite_3.anchor.x = 0.5;
		this._borderSprite_3.anchor.y = 0.0;
	}else if( data['border_type'] == "缩放拉伸" ){
		this._borderSprite_1 = new Sprite();
		this._borderSprite_1.anchor.x = 0.5;
		this._borderSprite_1.anchor.y = 1.0;
		this._borderSprite_2 = new Sprite();
		this._borderSprite_2.anchor.x = 0.5;
		this._borderSprite_2.anchor.y = 0.5;
		this._borderSprite_3 = new Sprite();
		this._borderSprite_3.anchor.x = 0.5;
		this._borderSprite_3.anchor.y = 0.0;
	}else if( data['border_type'] == "保持切割原样" ){
		this._borderSprite_1 = new Sprite();
		this._borderSprite_1.anchor.x = 0.5;
		this._borderSprite_1.anchor.y = 1.0;
		this._borderSprite_2 = new Sprite();
		this._borderSprite_2.anchor.x = 0.5;
		this._borderSprite_2.anchor.y = 0.5;
		this._borderSprite_3 = new Sprite();
		this._borderSprite_3.anchor.x = 0.5;
		this._borderSprite_3.anchor.y = 0.0;
	}
	this.addChild( this._borderSprite_1 );
	this.addChild( this._borderSprite_2 );
	this.addChild( this._borderSprite_3 );
	
	if( this._drill_border_bitmaps.length > 0 ){
		this._borderSprite_1.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_2.bitmap = this._drill_border_bitmaps[0];
		this._borderSprite_3.bitmap = this._drill_border_bitmaps[0];
	}
}
//==============================
// * 创建 - 内条
//==============================
Drill_MSB_Sprite.prototype.drill_createBar = function() {
	var data = this._drill_curStyle;	
	var pww = this._drill_parent.width;
	var phh = this._drill_parent.height;
	
	// > 清理贴图
	if( this._barSprite_1 != undefined ){ this.removeChild( this._barSprite_1 ); }
	if( this._barSprite_2 != undefined ){ this.removeChild( this._barSprite_2 ); }
	if( this._barSprite_3 != undefined ){ this.removeChild( this._barSprite_3 ); }
	
	// > 建立区域
	if( data['bar_type'] == "循环平铺" ){
		this._barSprite_1 = new Sprite();
		this._barSprite_1.anchor.x = 0.5;
		this._barSprite_1.anchor.y = 1.0;
		this._barSprite_2 = new TilingSprite();	//TilingSprite平铺图层
		this._barSprite_2.move(0, 0, 0, 0);
		this._barSprite_2.origin.x = 0;
		this._barSprite_2.origin.y = 0;
		this._barSprite_3 = new Sprite();
		this._barSprite_3.anchor.x = 0.5;
		this._barSprite_3.anchor.y = 0.0;
	}else if( data['bar_type'] == "缩放拉伸" ){
		this._barSprite_1 = new Sprite();
		this._barSprite_1.anchor.x = 0.5;
		this._barSprite_1.anchor.y = 1.0;
		this._barSprite_2 = new Sprite();
		this._barSprite_2.anchor.x = 0.5;
		this._barSprite_2.anchor.y = 0.5;
		this._barSprite_3 = new Sprite();
		this._barSprite_3.anchor.x = 0.5;
		this._barSprite_3.anchor.y = 0.0;
	}else if( data['bar_type'] == "保持切割原样" ){
		this._barSprite_1 = new Sprite();
		this._barSprite_1.anchor.x = 0.5;
		this._barSprite_1.anchor.y = 1.0;
		this._barSprite_2 = new Sprite();
		this._barSprite_2.anchor.x = 0.5;
		this._barSprite_2.anchor.y = 0.5;
		this._barSprite_3 = new Sprite();
		this._barSprite_3.anchor.x = 0.5;
		this._barSprite_3.anchor.y = 0.0;
	}
	this.addChild( this._barSprite_1 );
	this.addChild( this._barSprite_2 );
	this.addChild( this._barSprite_3 );
	
	if( this._drill_bar_bitmaps.length > 0 ){
		this._barSprite_1.bitmap = this._drill_bar_bitmaps[0];
		this._barSprite_2.bitmap = this._drill_bar_bitmaps[0];
		this._barSprite_3.bitmap = this._drill_bar_bitmaps[0];
	}
}
//==============================
// * 帧刷新对象
//==============================
Drill_MSB_Sprite.prototype.drill_updateSprite = function() {
	this._drill_time += 1;						//时间+1
	this.drill_MSB_updateVisible();				//显示控制
	this.drill_MSB_updateOpacity();				//透明度控制
	this.drill_MSB_refreshPosition();			//位置刷新
	
	this.drill_MSB_updateBorder();				//帧刷新 外框
	this.drill_MSB_updateBar();					//帧刷新 内条
	
	// > 关闭刷新状态位
	if( this._drill_parent._drill_MSB_needRefresh != false ){
		this._drill_parent._drill_MSB_needRefresh = false;		
	}
}
//==============================
// * 帧刷新 - 显示控制
//==============================
Drill_MSB_Sprite.prototype.drill_MSB_updateVisible = function() {
	var data = this._drill_curStyle;	
	
	// > 全关情况
	if( $gameSystem._drill_MSB_visible == false ){
		this.visible = false;
		return;
	}
	
	// > 继承控制不显示
	if( this._drill_parent.drill_MSB_scrollBarEnabled() == false ){
		this.visible = false;
		return;
	}
	
	// > 检测父类 - 窗口关闭
	if( this._drill_parent.isClosed() == true ){
		this.visible = false;
		return;
	}
	
	// > 检测父类 - 窗口被完全隐藏
	if( this._drill_parent.opacity <= 0 && this._drill_parent.contentsOpacity <= 0 ){
		this.visible = false;
		return;
	}
	
	// > 窗口长宽太小
	if( this._drill_parent.width <= 8 || this._drill_parent.height <= 8 ){
		this.visible = false;
		return;
	}
	
	// > 比例 >=1 时不显示
	if( this._drill_parent.drill_MSB_needScroll() == false ){
		this.visible = false;
		return;
	}
	
	this.visible = true;
}
//==============================
// * 帧刷新 - 透明度控制
//==============================
Drill_MSB_Sprite.prototype.drill_MSB_updateOpacity = function() {
	var data = this._drill_curStyle;	
	
	// > 初始化前情况
	if( this.drill_MSB_isBarReady() == false ){ return ; }
	if( this._drill_parent.active == false && this.opacity == 0 ){ return; }
	
	// > 根据激活状态刷新透明度
	if( this._drill_parent.active == true ){
		this.opacity += 15;
	}else{
		this.opacity -= 25;
		
		// > 未激活时，处于最低透明度
		if( this.opacity < data['opacity'] ){
			this.opacity = data['opacity'];
		}
	}
	
	
	// > 内条的透明度
	if( this._drill_parent._drill_MSB_isHovering == true ||
		this._drill_parent._drill_MSB_isDraging == true ){
		this._barSprite_1.opacity = 255;
		this._barSprite_2.opacity = 255;
		this._barSprite_3.opacity = 255;
	}else{
		this._barSprite_1.opacity = data['bar_opacity'];
		this._barSprite_2.opacity = data['bar_opacity'];
		this._barSprite_3.opacity = data['bar_opacity'];
	}
}
//==============================
// * 位置刷新
//==============================
Drill_MSB_Sprite.prototype.drill_MSB_refreshPosition = function() {
	if( this._drill_parent._drill_MSB_needRefresh == false ){ return; }
	var data = this._drill_curStyle;	
	var pww = this._drill_parent.width;
	var phh = this._drill_parent.height;
	var ppp = this._drill_parent.standardPadding();
	
	// > 位置
	if( data['scroll_pos'] == "左侧" ){
		this.x = ppp*0.5 + data['shifting_x'];
		this.y = phh*0.5 + data['shifting_y'];
	}else{
		this.x = pww - ppp*0.5 + data['shifting_x'];
		this.y = phh*0.5 + data['shifting_y'];
	}
}
//==============================
// * 帧刷新 - 外框
//==============================
Drill_MSB_Sprite.prototype.drill_MSB_updateBorder = function() {
	var data = this._drill_curStyle;	
	if( this._drill_border_bitmaps.length == 0 ){ return; }
	
	// > 播放gif
	var inter = this._drill_time;
	inter = inter / data['border_gif_interval'];
	inter = inter % this._drill_border_bitmaps.length;
	if( data['border_gif_back_run'] ){
		inter = this._drill_border_bitmaps.length - 1 - inter;
	}
	inter = Math.floor(inter);
	var temp_bitmap = this._drill_border_bitmaps[inter];
	
	// > 分区划片
	if( temp_bitmap.isReady() == false ){ return; }
	this._borderSprite_1.bitmap = temp_bitmap;
	this._borderSprite_2.bitmap = temp_bitmap;
	this._borderSprite_3.bitmap = temp_bitmap;
	
	var ww = temp_bitmap.width;
	var hh = temp_bitmap.height;
	var bb = data['border_thickness'];
	this._borderSprite_1.setFrame( 0,      0,      ww,     bb );
	this._borderSprite_2.setFrame( 0,      bb,     ww,     hh-2*bb );
	this._borderSprite_3.setFrame( 0,      hh-bb,  ww,     bb );
	
	// > 位置
	var pww = this._drill_parent.width;
	var phh = this._drill_parent.height;
	var ppp = this._drill_parent.standardPadding() + 4;	//多缩短滚动条8像素的长度
	
	// > 位置 - 区域刷新
	if( data['border_type'] == "循环平铺" ){
		this._borderSprite_1.x =  0 ;
		this._borderSprite_1.y = -0.5 * phh + ppp;
		this._borderSprite_3.x =  0 ;
		this._borderSprite_3.y =  0.5 * phh - ppp;
		
		this._borderSprite_2.x = -0.5 * ww;		//（TilingSprite没有anchor）
		this._borderSprite_2.y = -0.5 * phh + ppp;
		this._borderSprite_2._width  = ww ;
		this._borderSprite_2._height = phh-ppp*2 ;
		
	}else if( data['border_type'] == "缩放拉伸" ){
		this._borderSprite_1.x =  0 ;
		this._borderSprite_1.y = -0.5 * phh + ppp;
		this._borderSprite_2.x =  0 ;
		this._borderSprite_2.y =  0 ;
		this._borderSprite_3.x =  0 ;
		this._borderSprite_3.y =  0.5 * phh - ppp;
		
		this._borderSprite_2.scale.y = (phh-ppp*2 +1) / (hh-2*bb) ;	//多1像素用来缝合边
		
	}else if( data['border_type'] == "保持切割原样" ){
		this._borderSprite_1.x =  0 ;
		this._borderSprite_1.y = -0.5 * phh + ppp;
		this._borderSprite_2.x =  0 ;
		this._borderSprite_2.y =  0 ;
		this._borderSprite_3.x =  0 ;
		this._borderSprite_3.y =  0.5 * phh - ppp;
	}
	
}	
//==============================
// * 帧刷新 - 内条
//==============================
Drill_MSB_Sprite.prototype.drill_MSB_updateBar = function() {
	var data = this._drill_curStyle;	
	if( this.drill_MSB_isBarReady() == false ){ return {}; }
	
	// > 播放gif
	var inter = this._drill_time;
	inter = inter / data['bar_gif_interval'];
	inter = inter % this._drill_bar_bitmaps.length;
	if( data['bar_gif_back_run'] ){
		inter = this._drill_bar_bitmaps.length - 1 - inter;
	}
	inter = Math.floor(inter);
	var temp_bitmap = this._drill_bar_bitmaps[inter];
	
	// > 分区划片
	if( temp_bitmap.isReady() == false ){ return; }
	this._barSprite_1.bitmap = temp_bitmap;
	this._barSprite_2.bitmap = temp_bitmap;
	this._barSprite_3.bitmap = temp_bitmap;
	
	var ww = temp_bitmap.width;
	var hh = temp_bitmap.height;
	var bb = data['bar_thickness'];
	this._barSprite_1.setFrame( 0,      0,      ww,     bb );
	this._barSprite_2.setFrame( 0,      bb,     ww,     hh-2*bb );
	this._barSprite_3.setFrame( 0,      hh-bb,  ww,     bb );
	
	// > 位置
	var pww = this._drill_parent.width;
	var phh = this._drill_parent.drill_MSB_barHeight();
	var ppp = this._drill_parent.standardPadding() + 4;	//多缩短滚动条8像素的长度
	
	// > 位置 - 区域刷新
	if( data['bar_type'] == "循环平铺" ){
		this._barSprite_1.x =  0 ;
		this._barSprite_1.y = -0.5 * phh + ppp;
		this._barSprite_3.x =  0 ;
		this._barSprite_3.y =  0.5 * phh - ppp;
		
		this._barSprite_2.x = -0.5 * ww;		//（TilingSprite没有anchor）
		this._barSprite_2.y = -0.5 * phh + ppp;
		this._barSprite_2._width  = ww ;
		this._barSprite_2._height = phh-ppp*2 ;
		
	}else if( data['bar_type'] == "缩放拉伸" ){
		this._barSprite_1.x =  0 ;
		this._barSprite_1.y = -0.5 * phh + ppp;
		this._barSprite_2.x =  0 ;
		this._barSprite_2.y =  0 ;
		this._barSprite_3.x =  0 ;
		this._barSprite_3.y =  0.5 * phh - ppp;
		
		this._barSprite_2.scale.y = (phh-ppp*2 +1) / (hh-2*bb) ;	//多1像素用来缝合边
		
	}else if( data['bar_type'] == "保持切割原样" ){
		this._barSprite_1.x =  0 ;
		this._barSprite_1.y = -0.5 * phh + ppp;
		this._barSprite_2.x =  0 ;
		this._barSprite_2.y =  0 ;
		this._barSprite_3.x =  0 ;
		this._barSprite_3.y =  0.5 * phh - ppp;
	}
	
	// > 滚动位置
	var scroll_height = this._drill_parent.drill_MSB_barScrollHeight(); //（可下拉活动的高度）
	this._barSprite_1.y -= scroll_height * 0.5;
	this._barSprite_2.y -= scroll_height * 0.5;
	this._barSprite_3.y -= scroll_height * 0.5;
	this._barSprite_1.y +=  Math.round(scroll_height * this._drill_parent.drill_MSB_curScrollPosition());
	this._barSprite_2.y +=  Math.round(scroll_height * this._drill_parent.drill_MSB_curScrollPosition());
	this._barSprite_3.y +=  Math.round(scroll_height * this._drill_parent.drill_MSB_curScrollPosition());
		
}
//==============================
// * 获取 - 判断内条可用
//==============================
Drill_MSB_Sprite.prototype.drill_MSB_isBarReady = function() {
	if( this._drill_bar_bitmaps.length == 0 ){ return false; }
	for( var i=0; i < this._drill_bar_bitmaps.length; i++ ){
		if( this._drill_bar_bitmaps[i].isReady() != true ){
			return false;
		}
	}
	return true;
}
//==============================
// * 获取 - 内条矩形范围（滚动条贴图的相对范围，以锚点(0.5,0.5)为准）
//==============================
Drill_MSB_Sprite.prototype.drill_MSB_getBarRect = function() {
	if( this.drill_MSB_isBarReady() == false ){ return {}; }
	var data = this._drill_curStyle;	
	var temp_bitmap = this._drill_bar_bitmaps[0];		//就取第一个资源作为范围
	
	// > 矩形初始化
	var temp_data = {};
	temp_data['x'] = -1 * temp_bitmap.width * 0.5;		//（要获取内条的左上角位置的点）
	temp_data['y'] = -1 * this._drill_parent.height * 0.5;
	temp_data['height'] = this._drill_parent.drill_MSB_barHeight();
	temp_data['width'] = temp_bitmap.width;
	
	// > 滚动的位置
	var scroll_height = this._drill_parent.drill_MSB_barScrollHeight();
	temp_data['y'] += Math.round(scroll_height * this._drill_parent.drill_MSB_curScrollPosition());
	
	// > 缩短8像素
	temp_data['y'] += 4;
	temp_data['height'] -= 8;
	
	return temp_data;
}


