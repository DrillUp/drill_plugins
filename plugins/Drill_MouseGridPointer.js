//=============================================================================
// Drill_MouseGridPointer.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        鼠标 - 网格指向标
 * @author Drill_up
 * 
 * @Drill_LE_param "指向标-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MGP_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MouseGridPointer +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 玩家鼠标移动到地图的任意区域时，都会有一个或多个网格指向标跟随。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于鼠标。
 * 指向标：
 *   (1.指向标只能在固定的网格中进行移动。
 *      并且只能对鼠标有效，触屏无效。
 *   (2.你可以切换样式来控制不同风格的指向标。
 *      并且指向标能兼容镜头缩放的效果。
 *   (3.旧版本的"不可通行时是否隐藏"功能，转移到指向标样式中进行配置。
 * 设计：
 *   (1.网格指向标的资源可以是单张图片，也可以是GIF图像。
 *      你可以切换样式来控制不同风格的指向标。
 *      指向标的资源不一定必须是48x48的图片，你可以用稍微大一点的图像。
 *   (2.网格指向标可以叠加多个，实现指针在不同的 图块 显示不同的效果。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__ui_mouse （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__ui_mouse文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 指向标1 资源-指向标GIF
 * 指向标2 资源-指向标GIF
 * 指向标3 资源-指向标GIF
 * ……
 *
 * 所有素材都放在Map__ui_mouse文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制网格指向标：
 * 
 * 插件指令：>网格指向标 : 显示
 * 插件指令：>网格指向标 : 隐藏
 * 插件指令：>网格指向标 : 切换样式 : 样式[1]
 * 插件指令：>网格指向标 : 切换样式 : 样式[1,2,3]
 * 
 * 1.数字表示对应配置的指向标编号。
 *   "样式[1,2,3]"表示多个指向标贴图叠加。
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   开启网格，去各个管理层测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于地图界面中只有网格指向标这一个贴图，所以几乎没有消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件的 旋转单位 为角度。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * [v1.3]
 * 优化了内部结构，实现 叠加多个网格指向标 的功能。
 * 
 * 
 *
 * @param 是否初始显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 当前指向标列表
 * @type number[]
 * @min 1
 * @desc 当前对应的指向标，可以填多个叠加的指向标。
 * @default ["1"]
 * 
 * @param ----指向标----
 * @default 
 *
 * @param 指向标-1
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 指向标的样式配置。
 * @default {"标签":"==方形框-蓝==","---贴图---":"","资源-指向标GIF":"[\"网格指向标-a1\",\"网格指向标-a1\",\"网格指向标-a1\",\"网格指向标-a1\",\"网格指向标-a2\"]","帧间隔":"4","是否倒放":"false","偏移-指向标 X":"0","偏移-指向标 Y":"0","透明度":"255","混合模式":"0","---效果---":"","旋转速度":"0","是否使用缩放效果":"false","缩放幅度":"0.08","缩放速度":"5.5","是否使用闪烁效果":"false","闪烁速度":"7.0","---显示条件---":"","图块-通行":"必须可通行","图块-地形标志":"任意","地形标志列表":"[]","图块-R图块标志":"任意","R图块标志列表":"[]"}
 *
 * @param 指向标-2
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 指向标的样式配置。
 * @default {"标签":"==紫红==","---贴图---":"","资源-指向标GIF":"[\"网格指向标-b1\",\"网格指向标-b1\",\"网格指向标-b1\",\"网格指向标-b1\",\"网格指向标-b2\"]","帧间隔":"4","是否倒放":"false","偏移-指向标 X":"0","偏移-指向标 Y":"0","透明度":"255","混合模式":"0","---效果---":"","旋转速度":"0","是否使用缩放效果":"false","缩放幅度":"0.08","缩放速度":"5.5","是否使用闪烁效果":"false","闪烁速度":"7.0","---显示条件---":"","图块-通行":"必须可通行","图块-地形标志":"任意","地形标志列表":"[]","图块-R图块标志":"任意","R图块标志列表":"[]"}
 *
 * @param 指向标-3
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 指向标的样式配置。
 * @default {"标签":"==紫红(不可通行)==","---贴图---":"","资源-指向标GIF":"[\"网格指向标-不可通行\"]","帧间隔":"4","是否倒放":"false","偏移-指向标 X":"0","偏移-指向标 Y":"0","透明度":"255","混合模式":"0","---效果---":"","旋转速度":"0","是否使用缩放效果":"false","缩放幅度":"0.08","缩放速度":"5.5","是否使用闪烁效果":"false","闪烁速度":"7.0","---显示条件---":"","图块-通行":"必须不可通行","图块-地形标志":"任意","地形标志列表":"[]","图块-R图块标志":"任意","R图块标志列表":"[]"}
 *
 * @param 指向标-4
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 指向标的样式配置。
 * @default 
 *
 * @param 指向标-5
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 指向标的样式配置。
 * @default 
 *
 * @param 指向标-6
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 指向标的样式配置。
 * @default 
 *
 * @param 指向标-7
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 指向标的样式配置。
 * @default 
 *
 * @param 指向标-8
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 指向标的样式配置。
 * @default 
 *
 * @param 指向标-9
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 指向标的样式配置。
 * @default 
 *
 * @param 指向标-10
 * @parent ----指向标----
 * @type struct<DrillMGPSprite>
 * @desc 指向标的样式配置。
 * @default 
 * 
 */
/*~struct~DrillMGPSprite:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的指向标样式==
 * 
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 资源-指向标GIF
 * @parent ---贴图---
 * @desc 指向标的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default ["(需配置)网格指向标"]
 * @require 1
 * @dir img/Map__ui_mouse/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---贴图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 * 
 * @param 偏移-指向标 X
 * @parent ---贴图---
 * @desc 以指向标的点为基准，x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 偏移-指向标 Y
 * @parent ---贴图---
 * @desc 以指向标的点为基准，y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0 
 *
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type select
 * @option 普通
 * @value 0
 * @option 发光
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @option 叠加
 * @value 4
 * @desc pixi的渲染混合模式。0-普通,1-发光。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 * 
 * 
 * @param ---效果---
 * @default 
 *
 * @param 旋转速度
 * @parent ---效果---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周) 
 * @default 0 
 *
 * @param 是否使用缩放效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default false
 *
 * @param 缩放幅度
 * @parent 是否使用缩放效果
 * @desc 缩放的幅度，0.08表示图像大小的8%。
 * @default 0.08
 *
 * @param 缩放速度
 * @parent 是否使用缩放效果
 * @desc 缩放效果的速度。
 * @default 5.5
 *
 * @param 是否使用闪烁效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default false
 * 
 * @param 闪烁速度
 * @parent 是否使用闪烁效果
 * @desc 闪烁效果的速度。
 * @default 7.0
 * 
 * 
 * @param ---显示条件---
 * @default 
 * 
 * @param 图块-通行
 * @parent ---显示条件---
 * @type select
 * @option 必须可通行
 * @value 必须可通行
 * @option 必须不可通行
 * @value 必须不可通行
 * @option 任意
 * @value 任意
 * @desc 判断图块可通行的条件。图块-通行 是不考虑事件的，事件阻塞不属于 不可通行，两者要分开考虑。
 * @default 必须可通行
 * 
 * @param 图块-地形标志
 * @parent ---显示条件---
 * @type select
 * @option 必须含下列标志
 * @value 必须含下列标志
 * @option 必须不含下列标志
 * @value 必须不含下列标志
 * @option 任意
 * @value 任意
 * @desc 设置区域内图块必须满足的地形标志条件。
 * @default 任意
 * 
 * @param 地形标志列表
 * @parent 图块-地形标志
 * @type number[]
 * @min 0
 * @max 7
 * @desc 填入地形标志，这些设置会作为条件放入筛选器进行筛选。
 * @default []
 * 
 * @param 图块-R图块标志
 * @parent ---显示条件---
 * @type select
 * @option 必须含下列R图块值
 * @value 必须含下列R图块值
 * @option 必须不含下列R图块值
 * @value 必须不含下列R图块值
 * @option 任意
 * @value 任意
 * @desc 设置区域内图块必须满足的R图块标志条件。
 * @default 任意
 * 
 * @param R图块标志列表
 * @parent 图块-R图块标志
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，这些设置会作为条件放入筛选器进行筛选。
 * @default []
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MGP（Mouse_Grid_Pointer）
//		临时全局变量	DrillUp.g_MGP_xxx
//		临时局部变量	this._drill_MGP_xxx
//		存储数据变量	$gameSystem._drill_MGP_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	各个管理层
//		★性能测试消耗	1.22ms（全图只有这一个sprite）
//		★最坏情况		无
//		★备注			无
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
//			->☆贴图控制
//				->重建贴图
//				->刷新样式
//			->网格指向标【Drill_MGP_GridSprite】
//				->A主体
//				->B播放GIF
//				->C自变化效果
//				->D自动隐藏
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 网格指向标【Drill_MGP_GridSprite】
//		
//		★必要注意事项：
//			暂无。
//			
//		★其它说明细节：
//			1.这里被镜头缩放的问题给绕晕了。
//			  镜头缩放时，只要考虑【与镜头相关的变量】。
//			  这个插件中只有 鼠标位置 有变。那么就把鼠标位置转一下就可以了。
//			  图块的实际大小、displayXY是没有任何变化的。
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
	DrillUp.g_MGP_PluginTip_curName = "Drill_MouseGridPointer.js 鼠标-网格指向标";
	DrillUp.g_MGP_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_MouseGridPointer = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MouseGridPointer');
	
	
	//==============================
	// * 静态数据 - 网格指向标
	//				（~struct~DrillMGPSprite）
	//==============================
	DrillUp.drill_MGP_initGridData = function( dataFrom ) {
		var data = {};
		
		// > 贴图
		if( dataFrom["资源-指向标GIF"] != undefined &&
			dataFrom["资源-指向标GIF"] != "" ){
			data['src_img'] = JSON.parse( dataFrom["资源-指向标GIF"] || [] );
		}else{
			data['src_img'] = [];
		}
		data['src_img_file'] = "img/Map__ui_mouse/";
		data['interval'] = Number( dataFrom["帧间隔"] || 4 );
		data['back_run'] = String( dataFrom["是否倒放"] || "false") === "true";
		
		// > A主体
		data['x'] = Number( dataFrom["偏移-指向标 X"] || 0 );
		data['y'] = Number( dataFrom["偏移-指向标 Y"] || 0 );
		data['opacity'] = Number( dataFrom["透明度"] || 255 );
		data['blendMode'] = Number( dataFrom["混合模式"] || 0 );
		
		// > B播放GIF
		data['rotate'] = Number( dataFrom["旋转速度"] || 0 );
		
		// > C自变化效果
		data['zoom_enable'] = String( dataFrom["是否使用缩放效果"] || "false") === "true";
		data['zoom_range'] = Number( dataFrom["缩放幅度"] || 0.08 );
		data['zoom_speed'] = Number( dataFrom["缩放速度"] || 5.5 );
		data['flicker_enable'] = String( dataFrom["是否使用闪烁效果"] || "false") === "true";
		data['flicker_speed'] = Number( dataFrom["闪烁速度"] || 7.0 );
		
		// > D自动隐藏
		data['block'] = String( dataFrom["图块-通行"] || "任意");
		data['tlie'] = String( dataFrom["图块-地形标志"] || "任意");
		data['rRegion'] = String( dataFrom["图块-R图块标志"] || "任意");
		if( dataFrom["地形标志列表"] != undefined &&
			dataFrom["地形标志列表"] != "" ){
			data['tlie_list'] = JSON.parse( dataFrom["地形标志列表"] );
		}else{
			data['tlie_list'] = [];
		}
		if( dataFrom["R图块标志列表"] != undefined &&
			dataFrom["R图块标志列表"] != "" ){
			data['rRegion_list'] = JSON.parse( dataFrom["R图块标志列表"] );
		}else{
			data['rRegion_list'] = [];
		}
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_MGP_visible = String(DrillUp.parameters['是否初始显示'] || 'true') === 'true';
	if( DrillUp.parameters['当前指向标列表'] != undefined &&
		DrillUp.parameters['当前指向标列表'] != "" ){
		DrillUp.g_MGP_styleList = JSON.parse( DrillUp.parameters['当前指向标列表'] || [] );
	}else{
		DrillUp.g_MGP_styleList = [];
	}
	
	/*-----------------网格指向标------------------*/
	DrillUp.g_MGP_list_length = 10;
	DrillUp.g_MGP_list = [];
	for( var i = 0; i < DrillUp.g_MGP_list_length; i++ ){
		if( DrillUp.parameters['指向标-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['指向标-' + String(i+1) ]);
			DrillUp.g_MGP_list[i] = DrillUp.drill_MGP_initGridData( temp );
		}else{
			DrillUp.g_MGP_list[i] = null;
		}
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_MGP_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_MGP_pluginCommand.call(this, command, args);
	this.drill_MGP_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_MGP_pluginCommand = function( command, args ){
	if( command === ">网格指向标" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示" ){
				$gameSystem._drill_MGP_visible = true;
			}
			if( type == "隐藏" ){
				$gameSystem._drill_MGP_visible = false;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "切换样式"){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				
				$gameSystem._drill_MGP_styleIdList = [];
				var temp_arr = temp1.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					$gameSystem._drill_MGP_styleIdList.push( Number(temp_arr[k]) );
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
DrillUp.g_MGP_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MGP_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MGP_sys_initialize.call(this);
	this.drill_MGP_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MGP_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MGP_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MGP_saveEnabled == true ){	
		$gameSystem.drill_MGP_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MGP_initSysData();
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
Game_System.prototype.drill_MGP_initSysData = function() {
	this.drill_MGP_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MGP_checkSysData = function() {
	this.drill_MGP_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MGP_initSysData_Private = function() {
	
	this._drill_MGP_visible = DrillUp.g_MGP_visible;				//显示状态
	this._drill_MGP_styleIdList = DrillUp.g_MGP_styleList;			//样式容器
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MGP_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MGP_styleIdList == undefined ){
		this.drill_MGP_initSysData();
	}
};


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 控制器与贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 图层 - 创建
//==============================
var _drill_MGP_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_MGP_createDestination.call(this);
	this.drill_MGP_rebuild();
};
//==============================
// * 贴图控制 - 图层 - 帧刷新
//==============================
var _drill_MGP_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	_drill_MGP_update.call(this);
	this.drill_MGP_updateStyle();
};
//==============================
// * 贴图控制 - 图层 - 重建贴图
//==============================
Spriteset_Map.prototype.drill_MGP_rebuild = function() {
	
	// > 去除旧贴图
	if( this._drill_MGP_spriteList != undefined ){
		for(var i = this._drill_MGP_spriteList.length-1; i >= 0; i--){
			var temp_sprite = this._drill_MGP_spriteList[i];
			this._tilemap.removeChild(temp_sprite);
		}
	}
	this._drill_MGP_spriteList = [];
	
	// > 重建贴图（根据样式容器）
	for(var i = 0; i < $gameSystem._drill_MGP_styleIdList.length; i++){
		var style_id = $gameSystem._drill_MGP_styleIdList[i] -1;	//（注意id-1）
		var temp_sprite = new Drill_MGP_GridSprite();
		temp_sprite.z = 9;
		this._tilemap.addChild( temp_sprite );
		this._drill_MGP_spriteList.push( temp_sprite );
	}
};
//==============================
// * 贴图控制 - 帧刷新 样式
//==============================
Spriteset_Map.prototype.drill_MGP_updateStyle = function() {
	
	// > 重建贴图 监听
	if( this._drill_MGP_spriteList.length != $gameSystem._drill_MGP_styleIdList.length ){
		this.drill_MGP_rebuild();
	}
	
	// > 刷新样式
	for( var i = 0; i < this._drill_MGP_spriteList.length; i++){
		var temp_sprite = this._drill_MGP_spriteList[i];
		var style_id = $gameSystem._drill_MGP_styleIdList[i] -1;	//（注意id-1）
		
		if( temp_sprite._drill_curStyle != style_id ){
			temp_sprite._drill_curStyle =  style_id;
			
			// > 重设数据
			var data = DrillUp.g_MGP_list[ style_id ];
			if( data == undefined ){ continue; }
			var new_data = JSON.parse(JSON.stringify( data ));
			temp_sprite.drill_sprite_resetData( new_data );
		}
	}
};


//=============================================================================
// ** 网格指向标【Drill_MGP_GridSprite】
// **		
// **		作用域：	地图界面、战斗界面
// **		主功能：	定义一个 网格指向标 的贴图。
// **		子功能：	
// **					->贴图
// **					->A主体
// **						->层级
// **					->B播放GIF
// **					->C自变化效果
// **					->D自动隐藏
// **
// **		代码：	> 范围 - 仅用于可视化。
// **				> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。
// **				> 数量 - [单个/ ●多个 ] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁] 
// **				> 样式 - [不可修改/自变化/ ●外部变化] 样式在 帧刷新样式 函数中变化。
//=============================================================================
//==============================
// * 贴图 - 定义
//==============================
function Drill_MGP_GridSprite() {
	this.initialize.apply(this, arguments);
}
Drill_MGP_GridSprite.prototype = Object.create(Sprite_Base.prototype);
Drill_MGP_GridSprite.prototype.constructor = Drill_MGP_GridSprite;
//==============================
// * 贴图 - 初始化
//==============================
Drill_MGP_GridSprite.prototype.initialize = function() {
	Sprite_Base.prototype.initialize.call(this);
	this._drill_data = null;					//样式数据
	this._drill_curStyle = -1;					//当前样式
	this._drill_curIndex = -1;					//当前样式
	this.drill_sprite_initSelf();				//初始化自身
	this.drill_sprite_initChild();				//初始化子功能
};
//##############################
// * 贴图 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_MGP_GridSprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite_Base.prototype.update.call(this);
	
	this.drill_sprite_updateAttr_Position();		//帧刷新 - A主体 - 位置
	this.drill_sprite_updateGif();					//帧刷新 - B播放GIF
	this.drill_sprite_updateEffect();				//帧刷新 - C自变化效果
	this.drill_sprite_updateVisibleCheck();			//帧刷新 - D自动隐藏
};
//##############################
// * 贴图 - 是否就绪【标准函数】
//
//			参数：	> 无
//			返回：	> visible 布尔
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_MGP_GridSprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_data == null ){ return false; }		//未载入，不刷新
	return true;
}
//##############################
// * 贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_MGP_GridSprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;	//（暂无策略）
};
//##############################
// * 贴图 - 销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 如果需要重建时。
//##############################
Drill_MGP_GridSprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();
	this.drill_sprite_destroySelf();
};
//##############################
// * 贴图 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_MGP_GridSprite.prototype.drill_sprite_initData = function() {
	var data = this._drill_data;
	
	// > 贴图
	if( data['src_img'] == undefined ){ data['src_img'] = [] };
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Map__ui_mouse/" };
	if( data['src_img_shadow'] == undefined ){ data['src_img_shadow'] = "" };
	if( data['interval'] == undefined ){ data['interval'] = 4 };
	if( data['back_run'] == undefined ){ data['back_run'] = false };
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };										//A主体 - 平移x
	if( data['y'] == undefined ){ data['y'] = 0 };										//A主体 - 平移y
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };						//A主体 - 透明度
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };						//A主体 - 混合模式
	if( data['movement_enable'] == undefined ){ data['movement_enable'] = true };		//A主体 - 是否使用平滑运动
	
	// > B播放GIF
	if( data['rotate'] == undefined ){ data['rotate'] = 0 };							//B播放GIF - 旋转速度
	
	// > C自变化效果
	if( data['zoom_enable'] == undefined ){ data['zoom_enable'] = false };
	if( data['zoom_range'] == undefined ){ data['zoom_range'] = 0.08 };
	if( data['zoom_speed'] == undefined ){ data['zoom_speed'] = 5.5 };
	if( data['flicker_enable'] == undefined ){ data['flicker_enable'] = false };
	if( data['flicker_speed'] == undefined ){ data['flicker_speed'] = 7.0 };
	
	// > D自动隐藏
	if( data['block'] == undefined ){ data['block'] = "任意" };
	if( data['tlie'] == undefined ){ data['tlie'] = "任意" };
	if( data['rRegion'] == undefined ){ data['rRegion'] = "任意" };
	if( data['tlie_list'] == undefined ){ data['tlie_list'] = [] };
	if( data['rRegion_list'] == undefined ){ data['rRegion_list'] = [] };
};
//==============================
// * 贴图 - 初始化自身（私有）
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_initSelf = function(){
	this._drill_curSerial = -1;				//当前序列号（由于没有控制器，所以保持-1值）
};
//==============================
// * 贴图 - 初始化子功能（私有）
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_initChild = function() {
	this.drill_sprite_initAttr();			//初始化对象 - A主体
	this.drill_sprite_initGif();			//初始化对象 - B播放GIF
	this.drill_sprite_initEffect();			//初始化对象 - C自变化效果
	this.drill_sprite_initVisibleCheck();	//初始化对象 - D自动隐藏
};
//==============================
// * 贴图 - 销毁子功能（私有）
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_destroyChild = function(){
	this.visible = false;
	
	// > 销毁 - A主体
	this.removeChild( this._drill_MGP_sprite );
	this._drill_MGP_sprite = null;
};
//==============================
// * 贴图 - 销毁自身（私有）
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_destroySelf = function() {
	this._drill_curSerial = -1;				//当前序列号
};
//==============================
// * 贴图 - 重设数据（私有）
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_resetData = function( data ){
	this._drill_data = data;
	
	// > 初始化数据
	this.drill_sprite_initData();
	
	// > 销毁旧贴图
	this.drill_sprite_destroy();
	
	// > 建立贴图
	this._drill_gif_bitmapList = [];
	var temp_sprite = new Sprite();
	for(var j = 0; j < data['src_img'].length ; j++){
		var bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'][j], 0, true);
		this._drill_gif_bitmapList.push( bitmap );
	}
	temp_sprite.bitmap = this._drill_gif_bitmapList[0];
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.x = data['x'];
	temp_sprite.y = data['y'];
	temp_sprite.opacity = data['opacity'];
	temp_sprite.blendMode = data['blendMode'];
	this._drill_MGP_sprite = temp_sprite;
	this.addChild(temp_sprite);
};


//==============================
// * A主体 - 初始化对象
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_initAttr = function() {
	
	// > 属性初始化
	this.anchor.x = 0.5;				//中心锚点
	this.anchor.y = 0.5;				//
	
	// > 子贴图
	this._drill_MGP_sprite = null;		//指针贴图
};
//==============================
// * A主体 - 帧刷新 位置
//
//			说明：	> 此函数复刻至 输入设备核心的 TouchInput.drill_COI_getMousePos_Tile函数 。
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_updateAttr_Position = function() {
	
	// > 指针位置
	var mouse_x = _drill_mouse_x;
	var mouse_y = _drill_mouse_y;
	
	// > 指针位置 - 镜头缩放【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){										//（网格指向标贴图 处于中层、上层 之间）
		mouse_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );		//【不需要】多考虑图块缩放后变小的问题
		mouse_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );
	}
	
	// > 指针位置 - 图块网格的坐标
	var x = $gameMap._displayX + mouse_x / $gameMap.tileWidth();
	var y = $gameMap._displayY + mouse_y / $gameMap.tileHeight();
	x = Math.floor( x );
	y = Math.floor( y );
	
	// > 指针位置 - 指针坐标修正
	x = $gameMap.adjustX(x + 0.5) * $gameMap.tileWidth();
	y = $gameMap.adjustY(y + 0.5) * $gameMap.tileHeight();
	
	this.x = x;
	this.y = y ;
};


//==============================
// * B播放GIF - 初始化对象
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_initGif = function() {
	this._drill_gif_Time = 0;
};
//==============================
// * B播放GIF - 帧刷新
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_updateGif = function() {
	if( this._drill_MGP_sprite == undefined ){ return; }
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_gif_Time += 1;
	
	// > 播放gif
	var inter = this._drill_gif_Time;
	inter = inter / data['interval'];
	inter = Math.floor(inter);
	inter = inter % this._drill_gif_bitmapList.length;
	if( data['back_run'] == true ){
		inter = this._drill_gif_bitmapList.length - 1 - inter;
	}
	inter = Math.floor(inter);
	this._drill_MGP_sprite.bitmap = this._drill_gif_bitmapList[inter];
	
	// > 自旋转
	this._drill_MGP_sprite.rotation += data['rotate'] /180*Math.PI;
}

//==============================
// * C自变化效果 - 初始化对象
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_initEffect = function() {
	this._drill_effect_time = 0;
}
//==============================
// * C自变化效果 - 帧刷新
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_updateEffect = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_effect_time += 1;
	
	// > 缩放效果
	if( data['zoom_enable'] == true ){
		var zoom_value = data['zoom_range'];
		var zoom_speed = data['zoom_speed'];
		var scale_value = 1 + zoom_value * Math.cos( this._drill_effect_time*zoom_speed /180*Math.PI );
		this.scale.x = scale_value;
		this.scale.y = scale_value;
	}
	
	// > 闪烁效果
	if( data['flicker_enable'] == true ){
		var flicker_speed = data['flicker_speed'];
		this.opacity = 127 + 126 * Math.cos( this._drill_effect_time*flicker_speed /180*Math.PI );
	}
}

//==============================
// * D自动隐藏 - 初始化对象
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_initVisibleCheck = function() {
	//（暂无）
}
//==============================
// * D自动隐藏 - 帧刷新 - 不可通行自动隐藏
//==============================
Drill_MGP_GridSprite.prototype.drill_sprite_updateVisibleCheck = function() {
	var data = this._drill_data;
	
	// > 显示条件 - 开关
	if( $gameSystem._drill_MGP_visible == false ){ this.visible = false; return; }
	
	
	// > 指针位置
	var mouse_x = _drill_mouse_x;
	var mouse_y = _drill_mouse_y;
	
	// > 指针位置 - 镜头缩放【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){										//（网格指向标贴图 处于中层、上层 之间）
		mouse_x = $gameSystem.drill_LCa_cameraToMapX( _drill_mouse_x );		//【不需要】多考虑图块缩放后变小的问题
		mouse_y = $gameSystem.drill_LCa_cameraToMapY( _drill_mouse_y );	
	}
	
	// > 指针位置 - 图块网格的坐标
	var xx = $gameMap._displayX + mouse_x / $gameMap.tileWidth();
	var yy = $gameMap._displayY + mouse_y / $gameMap.tileHeight();
	xx = Math.floor( xx );
	yy = Math.floor( yy );
	
	
	// > 显示条件 - 图块-通行
	if( data['block'] == "任意" ){
		//（不操作）
	}else{
		var passable = $gameMap.isPassable(xx, yy, 2)||$gameMap.isPassable(xx, yy, 4)||$gameMap.isPassable(xx, yy, 6)||$gameMap.isPassable(xx, yy, 8);
		if( data['block'] == "必须可通行" && passable == false ){ this.visible = false; return; }
		if( data['block'] == "必须不可通行" && passable == true ){ this.visible = false; return; }
	}
	
	// > 显示条件 - 图块-地形标志
	if( data['tlie'] == "任意" ){
		//（不操作）
	}else{
		var t_tag = String( $gameMap.terrainTag( xx, yy ) );
		if( data['tlie'] == "必须含下列标志" && data['tlie_list'].indexOf(t_tag) == -1 ){ this.visible = false; return; }
		if( data['tlie'] == "必须不含下列标志" && data['tlie_list'].indexOf(t_tag) != -1 ){ this.visible = false; return; }
	}
	
	// > 显示条件 - 图块-R图块标志
	if( data['rRegion'] == "任意" ){
		//（不操作）
	}else{
		var r_id = String( $gameMap.regionId( xx, yy ) );
		if( data['rRegion'] == "必须含下列R图块值" && data['rRegion_list'].indexOf(r_id) == -1 ){ this.visible = false; return; }
		if( data['rRegion'] == "必须不含下列R图块值" && data['rRegion_list'].indexOf(r_id) != -1 ){ this.visible = false; return; }
	}
	
	this.visible = true;
}
//==============================
// * D自动隐藏 - 获取鼠标位置（输入设备核心的片段）
//==============================
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
