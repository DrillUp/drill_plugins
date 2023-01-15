//=============================================================================
// Drill_HtmlBackground.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        游戏窗体 - 黑边背景
 * @author Drill_up
 * 
 * @Drill_LE_param "黑边背景-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_HB_background_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_HtmlBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 当你的窗口大小与游戏屏幕大小不一致时，左右或上下会出现黑边区域。
 * 你可以在这个黑边区域内添加额外的背景。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于html最外层。
 * 细节：
 *   (1.黑边背景之间可以通过图片层级控制先后顺序。
 *   (2.插件指令修改黑边背景后，修改的数据可以普通存储到存档中。
 *      读取存档后，背景会根据存档的 图像和背景数据 进行变化。
 * html：
 *   (1.黑边背景不在游戏界面中的任何层级，而是直接在html层面上整个
 *      游戏框架的后面。
 *   (2.如果你的黑边背景外框的厚度为0，浏览器很可能会自动显示出网页
 *      滚动条，因为背景挤占了html的空间。
 *      这时候，你需要设置 隐藏网页滚动条 。
 * 设计：
 *   (1.你可以在边界左右放两个高清萌妹图像。或者一些解谜的提示信息。
 *      不过背景不建议做得太鲜艳，以免抢眼。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__layer （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。这里需要配置：
 * 
 * 资源-左侧图像
 * 资源-右侧图像
 * 资源-上侧图像
 * 资源-下侧图像
 * 资源-备用替换图像
 * 
 * 黑边背景-1 资源-背景
 * 黑边背景-2 资源-背景
 * 黑边背景-3 资源-背景
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 背景变化
 * 你可以通过插件指令控制背景的显示情况：
 * 
 * 插件指令：>黑边背景 : 背景 : 3 : 显示
 * 插件指令：>黑边背景 : 背景 : 3 : 隐藏
 * 
 * 插件指令：>黑边背景 : 背景 : 3 : 变坐标X : 100
 * 插件指令：>黑边背景 : 背景 : 3 : 变坐标Y : 100
 * 插件指令：>黑边背景 : 背景 : 3 : 变速度X : 1.5
 * 插件指令：>黑边背景 : 背景 : 3 : 变速度Y : 1.6
 * 
 * 1.由于内部特殊性，背景无法修改混合模式。
 * 2.黑边背景的显示/隐藏是变透明的过渡阶段。
 * 3.坐标xy变化的参数，为偏移的坐标值，单位像素，可为负数。
 * 4.变速度比较特殊，是在基础速度上，叠加的效果。
 *   比如速度为0.5，如果要停止，需要设置 变速度X -0.5 。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 贴边图像变化
 * 你还可以通过插件指令控制贴边图像的情况：
 * 
 * 插件指令：>黑边背景 : 贴边图像 : 替换左侧图像 : 1
 * 插件指令：>黑边背景 : 贴边图像 : 替换右侧图像 : 2
 * 插件指令：>黑边背景 : 贴边图像 : 替换上侧图像 : 3
 * 插件指令：>黑边背景 : 贴边图像 : 替换下侧图像 : 4
 * 插件指令：>黑边背景 : 贴边图像 : 还原左侧图像
 * 插件指令：>黑边背景 : 贴边图像 : 还原右侧图像
 * 插件指令：>黑边背景 : 贴边图像 : 还原上侧图像
 * 插件指令：>黑边背景 : 贴边图像 : 还原下侧图像
 * 
 * 1.替换的图像的参数，为备用替换图像的编号。
 *   切换图像的时长 = 图像显现时长
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
 * 测试方法：   以正常流程进行游戏，记录三种界面下的消耗。
 * 测试结果：   地图界面，平均消耗为：【31.13ms】
 *              战斗界面，平均消耗为：【29.89ms】
 *              菜单界面，平均消耗为：【30.85ms】
 *
 * 1.该核心在任何情况下都工作并消耗性能。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件性能测试说明。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 * [v1.3]
 * 改进了html在边框外围出现滚动条的问题。
 * [v1.4]
 * 优化了内部渲染器结构。
 * [v1.5]
 * 修改了插件分类。
 * [v1.6]
 * 修复了旧存档加载此插件时报错的bug。
 * 
 *
 *
 * @param ---常规---
 * @default
 *
 * @param 背景显现时长
 * @parent ---常规---
 * @type number
 * @min 1
 * @desc 背景切换显现/隐藏的时间，单位帧。（1秒60帧）
 * @default 120
 *
 * @param 背景外框厚度
 * @parent ---常规---
 * @type number
 * @min 0
 * @desc 背景外围的一层黑色的边界外框的厚度，设置0时建议隐藏网页滚动条。
 * @default 4
 * 
 * @param 是否隐藏网页滚动条
 * @parent ---常规---
 * @type boolean
 * @on 隐藏
 * @off 不隐藏
 * @desc 如果你的黑边背景边框的厚度为0，浏览器非常有可能会自动显示滚动条，因为背景挤占了html的空间。
 * @default false
 * 
 * @param 是否开启参数存储
 * @parent ---常规---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 如果你希望 插件指令对黑边背景的变化 能够被存入存档中，开启此开关即可。
 * @default true
 *
 * @param ---贴边图像---
 * @desc 
 *
 * @param 显现条件-宽度
 * @parent ---贴边图像---
 * @type number
 * @min 0
 * @desc 当游戏窗口黑边拉到大于一定宽度时，图像显现的条件。
 * @default 100
 *
 * @param 显现条件-高度
 * @parent ---贴边图像---
 * @type number
 * @min 0
 * @desc 当游戏窗口黑边拉到大于一定高度时，图像显现的条件。
 * @default 60
 *
 * @param 图像显现时长
 * @parent ---贴边图像---
 * @type number
 * @min 1
 * @desc 图像显现/隐藏的时间，单位帧。（1秒60帧）
 * @default 120
 *
 * @param 资源-左侧图像
 * @parent ---贴边图像---
 * @desc 黑边背景的左侧图像。
 * @default (需配置)黑边背景-左侧图像
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 资源-右侧图像
 * @parent ---贴边图像---
 * @desc 黑边背景的右侧图像。
 * @default (需配置)黑边背景-右侧图像
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 资源-上侧图像
 * @parent ---贴边图像---
 * @desc 黑边背景的上侧图像。
 * @default (需配置)黑边背景-上侧图像
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 资源-下侧图像
 * @parent ---贴边图像---
 * @desc 黑边背景的下侧图像。
 * @default (需配置)黑边背景-下侧图像
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 资源-备用替换图像
 * @parent ---贴边图像---
 * @desc 黑边背景的备用图像，可以通过插件指令切换。
 * @default []
 * @require 1
 * @dir img/Special__layer/
 * @type file[]
 *
 * @param ---黑边背景组---
 * @default
 *
 * @param 黑边背景-1
 * @parent ---黑边背景组---
 * @type struct<BlackBackground>
 * @desc 黑边背景的详细配置信息。
 * @default 
 *
 * @param 黑边背景-2
 * @parent ---黑边背景组---
 * @type struct<BlackBackground>
 * @desc 黑边背景的详细配置信息。
 * @default 
 *
 * @param 黑边背景-3
 * @parent ---黑边背景组---
 * @type struct<BlackBackground>
 * @desc 黑边背景的详细配置信息。
 * @default 
 *
 * @param 黑边背景-4
 * @parent ---黑边背景组---
 * @type struct<BlackBackground>
 * @desc 黑边背景的详细配置信息。
 * @default 
 *
 * @param 黑边背景-5
 * @parent ---黑边背景组---
 * @type struct<BlackBackground>
 * @desc 黑边背景的详细配置信息。
 * @default 
 *
 * @param 黑边背景-6
 * @parent ---黑边背景组---
 * @type struct<BlackBackground>
 * @desc 黑边背景的详细配置信息。
 * @default 
 *
 * @param 黑边背景-7
 * @parent ---黑边背景组---
 * @type struct<BlackBackground>
 * @desc 黑边背景的详细配置信息。
 * @default 
 *
 * @param 黑边背景-8
 * @parent ---黑边背景组---
 * @type struct<BlackBackground>
 * @desc 黑边背景的详细配置信息。
 * @default 
 *
 * @param 黑边背景-9
 * @parent ---黑边背景组---
 * @type struct<BlackBackground>
 * @desc 黑边背景的详细配置信息。
 * @default 
 *
 * @param 黑边背景-10
 * @parent ---黑边背景组---
 * @type struct<BlackBackground>
 * @desc 黑边背景的详细配置信息。
 * @default 
 */
/*~struct~BlackBackground:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的菜单背景==
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-背景
 * @desc 背景的图片资源。
 * @default (需配置)黑边背景-平铺背景
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 平移-背景 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-背景 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 背景X速度
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0.0
 *
 * @param 背景Y速度
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0.0
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 4
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		HB (Html_Background)
//		临时全局变量	DrillUp.g_HB_xxxx
//		临时局部变量	this._drill_HB_xxx
//		存储数据变量	$gameSystem._drill_HB_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	鼠标管理层
//		★性能测试消耗	23.30ms（drill_HB_render函数）
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			黑边背景：
//				->html
//					->获取body、创建div、修改背景属性（摒弃）
//					->建立canvas和render
//					->建立场景
//				->贴图
//					->四贴边图像贴边
//					->淡入淡出的显示/隐藏
//					->贴边图像的条件显示/隐藏
//					->贴边图像切换插件指令
//
//		★私有类如下：
//			* Scene_Drill_HB【黑边场景】
//
//		★必要注意事项：
//			1.该插件为了支持加密，必须从底层新建一个画布和渲染器。
//			2.渲染器并没有想象中的那么稳定，目前底层知识还不全，可能有潜在的报错。
//		
//		★其它说明细节：
//			1.blendMode不能直接使用，pixi会报错，目前不清楚原因。
//			2.所有直接visible显示，被切换成透明度过度的过程。
//			3.Scene_Drill_HB里面的结构可能比较混乱，这是由于全局作用下，场景必须自己进行一套自己的流程，$gameSystem是例外改变的参数。
//
//		★存在的问题：
//			1.canvas不能完全等于innerWidth，不然会出现滚动条。（已改进）
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_HtmlBackground = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_HtmlBackground');
	
	//==============================
	// * 变量获取 - 黑边背景
	//				（~struct~BlackBackground）
	//==============================
	DrillUp.drill_HB_initBlackBackground = function( dataFrom ){
		var data = {};
		data['visible'] = String( dataFrom["初始是否显示"] || "false") == "true";
		data['src_img'] = String( dataFrom["资源-背景"] || "");
		data['x'] = Number( dataFrom["平移-背景 X"] || 0);
		data['y'] = Number( dataFrom["平移-背景 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		//data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['x_speed'] = Number( dataFrom["背景X速度"] || 0);
		data['y_speed'] = Number( dataFrom["背景Y速度"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 4);
		return data;
	}
	
	/*----------------常规---------------*/
	DrillUp.g_HB_background_time = Number(DrillUp.parameters["背景显现时长"] || 120);
	DrillUp.g_HB_padding = Number(DrillUp.parameters["背景外框厚度"] || 4);
	DrillUp.g_HB_scrollDisable = String(DrillUp.parameters["是否隐藏网页滚动条"] || "false" ) == "true";
	DrillUp.g_HB_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*----------------贴边图像---------------*/
	DrillUp.g_HB_weltImg_width = Number(DrillUp.parameters["显现条件-宽度"] || 100);
	DrillUp.g_HB_weltImg_height = Number(DrillUp.parameters["显现条件-高度"] || 100);
	DrillUp.g_HB_weltImg_time = Number(DrillUp.parameters["图像显现时长"] || 120);
	DrillUp.g_HB_weltImg_left = String(DrillUp.parameters["资源-左侧图像"] || "" );
	DrillUp.g_HB_weltImg_right = String(DrillUp.parameters["资源-右侧图像"] || "" );
	DrillUp.g_HB_weltImg_up = String(DrillUp.parameters["资源-上侧图像"] || "" );
	DrillUp.g_HB_weltImg_down = String(DrillUp.parameters["资源-下侧图像"] || "" );
	DrillUp.g_HB_weltImg_backImg = JSON.parse(DrillUp.parameters["资源-备用替换图像"] || [] );
	
	/*----------------黑边背景---------------*/
	DrillUp.g_HB_background_list_length = 10;
	DrillUp.g_HB_background_list = [];
	for (var i = 0; i < DrillUp.g_HB_background_list_length; i++) {
		if( DrillUp.parameters['黑边背景-' + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters['黑边背景-' + String(i+1) ]);
			DrillUp.g_HB_background_list[i] = DrillUp.drill_HB_initBlackBackground( data );
			DrillUp.g_HB_background_list[i]['inited'] = true;
		}else{
			DrillUp.g_HB_background_list[i] = DrillUp.drill_HB_initBlackBackground( {} );
			DrillUp.g_HB_background_list[i]['inited'] = false;
		}
	}
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialLayer = function(filename) {
    return this.loadBitmap('img/Special__layer/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_HB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_HB_pluginCommand.call( this, command, args );
	if( command === ">黑边背景" ){		//>黑边背景 : 背景 : 3 : 显示
	
		if( args.length == 6 ){
			var target = String(args[1]);
			var temp1 = String(args[3]);
			var type = String(args[5]);
			if( target == "背景" ){
				if( type == "显示" ){
					$gameSystem._drill_HB_dataTank[ Number(temp1)-1 ].visible = true;
				}
				if( type == "隐藏" ){
					$gameSystem._drill_HB_dataTank[ Number(temp1)-1 ].visible = false;
				}
			}
			if( target == "贴边图像" ){
				if( temp1 == "替换左侧图像" ){
					$gameSystem._drill_HB_weltImg_left = DrillUp.g_HB_weltImg_backImg[ Number(type)-1 ];
				}
				if( temp1 == "替换右侧图像" ){
					$gameSystem._drill_HB_weltImg_right = DrillUp.g_HB_weltImg_backImg[ Number(type)-1 ];
				}
				if( temp1 == "替换上侧图像" ){
					$gameSystem._drill_HB_weltImg_up = DrillUp.g_HB_weltImg_backImg[ Number(type)-1 ];
				}
				if( temp1 == "替换下侧图像" ){
					$gameSystem._drill_HB_weltImg_down = DrillUp.g_HB_weltImg_backImg[ Number(type)-1 ];
				}
			}
		}
		if( args.length == 8 ){
			var target = String(args[1]);
			var temp1 = Number(args[3]) - 1;
			var type = String(args[5]);
			var temp2 = Number(args[7]);
			if( target == "背景" ){
				if( type == "变坐标X" ){
					$gameSystem._drill_HB_dataTank[temp1].tar_x = temp2;
				}
				if( type == "变坐标Y" ){
					$gameSystem._drill_HB_dataTank[temp1].tar_y = temp2;
				}
				if( type == "变速度X" ){
					$gameSystem._drill_HB_dataTank[temp1].tar_x_speed = temp2;
				}
				if( type == "变速度Y" ){
					$gameSystem._drill_HB_dataTank[temp1].tar_y_speed = temp2;
				}
			}
		}
		if( args.length == 4 ){
			var target = String(args[1]);
			var temp1 = String(args[3]);
			if( target == "贴边图像" ){
				if( temp1 == "还原左侧图像" ){
					$gameSystem._drill_HB_weltImg_left = DrillUp.g_HB_weltImg_left;
				}
				if( temp1 == "还原右侧图像" ){
					$gameSystem._drill_HB_weltImg_right = DrillUp.g_HB_weltImg_right;
				}
				if( temp1 == "还原上侧图像" ){
					$gameSystem._drill_HB_weltImg_up = DrillUp.g_HB_weltImg_up;
				}
				if( temp1 == "还原下侧图像" ){
					$gameSystem._drill_HB_weltImg_down = DrillUp.g_HB_weltImg_down;
				}
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
//DrillUp.g_HB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_HB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_HB_sys_initialize.call(this);
	this.drill_HB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_HB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_HB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_HB_saveEnabled == true ){	
		$gameSystem.drill_HB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_HB_initSysData();
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
Game_System.prototype.drill_HB_initSysData = function() {
	this.drill_HB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_HB_checkSysData = function() {
	this.drill_HB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_HB_initSysData_Private = function() {
	this._drill_HB_dataTank = [];
	for(var i=0; i < DrillUp.g_HB_background_list.length ;i++){
		var temp = DrillUp.g_HB_background_list[i];
			
		var temp_data = {};
		temp_data.visible = temp['visible'];		//显示/隐藏
		temp_data.x = 0;							//改坐标
		temp_data.y = 0;							//改坐标
		temp_data.x_speed = 0;						//改速度
		temp_data.y_speed = 0;						//改速度
		temp_data.tar_x = 0;		
		temp_data.tar_y = 0;		
		temp_data.tar_x_speed = 0;	
		temp_data.tar_y_speed = 0;
		this._drill_HB_dataTank[i] = temp_data;
	}
	
	this._drill_HB_weltImg_left = DrillUp.g_HB_weltImg_left;
	this._drill_HB_weltImg_right = DrillUp.g_HB_weltImg_right;
	this._drill_HB_weltImg_up = DrillUp.g_HB_weltImg_up;
	this._drill_HB_weltImg_down = DrillUp.g_HB_weltImg_down;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_HB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_HB_dataTank == undefined ){
		this.drill_HB_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_HB_background_list.length; i++ ){
		var temp_data = JSON.parse(JSON.stringify( DrillUp.g_HB_background_list[i] ));
		
		// > 已配置（'inited'为 false 表示空数据）
		if( temp_data['inited'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_HB_dataTank[i] == undefined ){
					
				var new_data = {};
				new_data.visible = temp_data['visible'];	//显示/隐藏
				new_data.x = 0;								//改坐标
				new_data.y = 0;								//改坐标
				new_data.x_speed = 0;						//改速度
				new_data.y_speed = 0;						//改速度
				new_data.tar_x = 0;		
				new_data.tar_y = 0;		
				new_data.tar_x_speed = 0;	
				new_data.tar_y_speed = 0;
				this._drill_HB_dataTank[i] = new_data;
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//=============================================================================
// ** 渲染器【Drill_HB_Renderer】
//			
//			说明：	> 该类为静态类，单独定义一个渲染器结构。
//					> 该渲染器与 主游戏画面 完全并行渲染场景。
//=============================================================================
//==============================
// * 渲染器 - 定义
//==============================
function Drill_HB_Renderer() {
	this.initialize.apply(this, arguments);
}
//==============================
// * 渲染器 - 初始化
//==============================
Drill_HB_Renderer.initialize = function(){
	this.drill_HB_createCanvas();		//创建 - 画布
	this.drill_HB_createRenderer();		//创建 - 渲染器
};
//==============================
// * 渲染器 - 刷新（非帧）
//==============================
Drill_HB_Renderer.update = function() {
	this.drill_HB_updateCanvas();		//刷新 - 画布
	this.drill_HB_updateRenderer();		//刷新 - 渲染器
}
//==============================
// * 渲染器 - 常量
//==============================
Drill_HB_Renderer.drill_HB_width = function() { return Math.floor(window.innerWidth) - DrillUp.g_HB_padding *2; }
Drill_HB_Renderer.drill_HB_height = function() { return Math.floor(window.innerHeight) - DrillUp.g_HB_padding *2; }
//==============================
// * 创建 - 画布
//==============================
Drill_HB_Renderer.drill_HB_createCanvas = function() {
	this._drill_HB_canvas = document.createElement('canvas');		//（canvas是非常基础的对象，一个texture/bitmap就有一个canvas）
	this._drill_HB_canvas.id = 'drill_HB_canvas';
	this._drill_HB_canvas.style.position = "absolute";
	this._drill_HB_canvas.style.top = DrillUp.g_HB_padding + "px";
	this._drill_HB_canvas.style.left = DrillUp.g_HB_padding + "px";

	this.drill_HB_updateCanvas();		//（创建后刷新）

	if( DrillUp.g_HB_scrollDisable == true ){
		document.body.parentNode.style.overflow = "hidden";
	}
	document.body.appendChild(this._drill_HB_canvas);
};
//==============================
// * 创建 - 渲染器
//==============================
Drill_HB_Renderer.drill_HB_createRenderer = function() {
	PIXI.dontSayHello = true;
	var width = this.drill_HB_width();
	var height = this.drill_HB_height();
	var options = { view: this._drill_HB_canvas };
	try {
		switch( Graphics._rendererType ){
			
		// > canvas渲染器
		case 'canvas':
			this._drill_HB_renderer = new PIXI.CanvasRenderer(width, height, options);
			break;
			
		// > webgl渲染器
		case 'webgl':
			this._drill_HB_renderer = new PIXI.WebGLRenderer(width, height, options);
			break;
			
		// > 自动渲染器（在canvas和webgl选一）
		default:
			this._drill_HB_renderer = PIXI.autoDetectRenderer(width, height, options);
			break;
		}
	
		// > webgl渲染器 的材质缓存数
		if( this._drill_HB_renderer && this._drill_HB_renderer.textureGC ){
			this._drill_HB_renderer.textureGC.maxIdle = 60;		//（最大缓存值：60）
		}
	}catch( e ){
		this._drill_HB_renderer = null;
	}
};
//==============================
// * 刷新 - 画布
//==============================
Drill_HB_Renderer.drill_HB_updateCanvas = function() {
	this._drill_HB_canvas.style.width = this.drill_HB_width();		//（保持窗口高宽）
	this._drill_HB_canvas.style.height = this.drill_HB_height();
	//this._drill_HB_canvas.style.zIndex = 0;
};
//==============================
// * 刷新 - 渲染器
//==============================
Drill_HB_Renderer.drill_HB_updateRenderer = function() {
	if( this._drill_HB_renderer == undefined ){ return; }			//（保持窗口高宽）
	this._drill_HB_renderer.resize( this.drill_HB_width(), this.drill_HB_height() );
};
//==============================
// * 渲染器 - 执行渲染（接口）
//==============================
Drill_HB_Renderer.drill_HB_doRender = function( stage ){
	if( stage ){
		this._drill_HB_renderer.render(stage);
		if (this._drill_HB_renderer.gl && this._drill_HB_renderer.gl.flush) {
			this._drill_HB_renderer.gl.flush();
		}
	}
};
//==============================
// * 渲染器 - 初始化（绑定）
//==============================
var _drill_HB_createAllElements = Graphics._createAllElements;
Graphics._createAllElements = function() {
	_drill_HB_createAllElements.call(this);
	Drill_HB_Renderer.initialize();		//渲染器初始化
}
//==============================
// * 渲染器 - 刷新（非帧）
//==============================
var _drill_HB_updateAllElements = Graphics._updateAllElements;
Graphics._updateAllElements = function() {
	_drill_HB_updateAllElements.call(this);
	Drill_HB_Renderer.update();			//渲染器刷新
}

//=============================================================================
// ** 场景帧刷新
//=============================================================================
var _drill_HB_renderScene = SceneManager.renderScene;
SceneManager.renderScene = function() {
	_drill_HB_renderScene.call(this);
	
	// > 创建场景
	if( !this._drill_HB_scene ){		//（直接new唯一一个Scene）
		this._drill_HB_scene = new Scene_Drill_HB();	//流程： new >> isReady() >> render()
		this._drill_HB_scene.start();					//start是Scene_Base自己的小方法
		this._drill_HB_scene.create();
	}
	
	// > 渲染场景
	if( this._drill_HB_scene.isReady() ) {
		this._drill_HB_scene.drill_setSize( Drill_HB_Renderer.drill_HB_width(),Drill_HB_Renderer.drill_HB_height() );
		this._drill_HB_scene.update();
		Drill_HB_Renderer.drill_HB_doRender(this._drill_HB_scene);
	}
}


//=============================================================================
// ** 黑边场景【Scene_Drill_HB】
//=============================================================================
//==============================
// * 黑边场景 - 定义
//==============================
function Scene_Drill_HB() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_HB.prototype = Object.create(Scene_Base.prototype);
Scene_Drill_HB.prototype.constructor = Scene_Drill_HB;
//==============================
// * 黑边场景 - 初始化
//==============================
Scene_Drill_HB.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	
	this._drill_cur_width = 0;
	this._drill_cur_height = 0;
	
	this._drill_background_tank = [];
	this._drill_background_dataTank = [];
	
	this._drill_leftSprite_data = {};
	this._drill_rightSprite_data = {};
	this._drill_upSprite_data = {};
	this._drill_downSprite_data = {};
};

//==============================
// * 黑边场景 - 创建
//==============================
Scene_Drill_HB.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this._drill_main_layer = new Sprite();
	this.addChild(this._drill_main_layer);	//主层
	
	this.drill_createBackground();
	this.drill_createWeltImg();
};
//==============================
// * 黑边场景 - 背景
//==============================
Scene_Drill_HB.prototype.drill_createBackground = function() {
	this._drill_downArea = new Sprite();
	this._drill_main_layer.addChild(this._drill_downArea);	//背景层
	
	for(var i=0; i < DrillUp.g_HB_background_list.length; i++){
		var src_data = DrillUp.g_HB_background_list[i];
		
		// > 数据初始化
		var temp_data = {}
		temp_data.visible = src_data.visible || false;
		temp_data.curOpacity = 0;
		temp_data.tarOpacity = src_data.opacity || 0;
		temp_data.curX = src_data.x || 0;
		temp_data.curY = src_data.y || 0;
		temp_data.x_speed = src_data.x_speed || 0;
		temp_data.y_speed = src_data.y_speed || 0;
		temp_data.ex_x_speed = 0;
		temp_data.ex_y_speed = 0;
		temp_data.ex_x = 0;
		temp_data.ex_y = 0;
		temp_data.time = DrillUp.g_HB_background_time;
		temp_data.zIndex = src_data.zIndex || 0;			//（不可变）
		temp_data.src_img = src_data.src_img || "";			//（不可变）
		this._drill_background_dataTank.push(temp_data);
		
		// > 贴图初始化
		var temp_sprite = new TilingSprite(ImageManager.load_SpecialLayer(temp_data.src_img));	//TilingSprite平铺图层
		temp_sprite.origin.x = temp_data.curX;
		temp_sprite.origin.y = temp_data.curY;
		temp_sprite.opacity = temp_data.curOpacity;
		temp_sprite.zIndex = temp_data.zIndex;
		this._drill_downArea.addChild(temp_sprite);
		this._drill_background_tank.push(temp_sprite);
	}
	this.drill_sortByZIndex();
}
//==============================
// ** 层级排序
//==============================
Scene_Drill_HB.prototype.drill_sortByZIndex = function() {
	this._drill_downArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
};
//==============================
// * 创建 - 贴边图像
//==============================
Scene_Drill_HB.prototype.drill_createWeltImg = function() {
	this._drill_upArea = new Sprite();
	this._drill_main_layer.addChild(this._drill_upArea);	//图像层
	
	// > 数据初始化
	this._drill_leftSprite_data.src_img = DrillUp.g_HB_weltImg_left;
	this._drill_leftSprite_data.cur_visible = true;
	this._drill_leftSprite_data.cur_opacity = 0;
	this._drill_rightSprite_data.src_img = DrillUp.g_HB_weltImg_right;
	this._drill_rightSprite_data.cur_visible = true;
	this._drill_rightSprite_data.cur_opacity = 0;
	this._drill_upSprite_data.src_img = DrillUp.g_HB_weltImg_up;
	this._drill_upSprite_data.cur_visible = true;
	this._drill_upSprite_data.cur_opacity = 0;
	this._drill_downSprite_data.src_img = DrillUp.g_HB_weltImg_down;
	this._drill_downSprite_data.cur_visible = true;
	this._drill_downSprite_data.cur_opacity = 0;
	
	// > 贴图初始化
	this._drill_leftSprite = new Sprite(ImageManager.load_SpecialLayer(DrillUp.g_HB_weltImg_left));
	this._drill_leftSprite.opacity = 0;
	this._drill_leftSprite.anchor.x = 0.0;
	this._drill_leftSprite.anchor.y = 0.5;
	this._drill_rightSprite = new Sprite(ImageManager.load_SpecialLayer(DrillUp.g_HB_weltImg_right));
	this._drill_rightSprite.opacity = 0;
	this._drill_rightSprite.anchor.x = 1.0;
	this._drill_rightSprite.anchor.y = 0.5;
	this._drill_upSprite = new Sprite(ImageManager.load_SpecialLayer(DrillUp.g_HB_weltImg_up));
	this._drill_upSprite.opacity = 0;
	this._drill_upSprite.anchor.x = 0.5;
	this._drill_upSprite.anchor.y = 0.0;
	this._drill_downSprite = new Sprite(ImageManager.load_SpecialLayer(DrillUp.g_HB_weltImg_down));
	this._drill_downSprite.opacity = 0;
	this._drill_downSprite.anchor.x = 0.5;
	this._drill_downSprite.anchor.y = 1.0;
	
	this._drill_upArea.addChild(this._drill_leftSprite);
	this._drill_upArea.addChild(this._drill_rightSprite);
	this._drill_upArea.addChild(this._drill_upSprite);
	this._drill_upArea.addChild(this._drill_downSprite);
}

//==============================
// * 黑边场景 - 帧刷新
//==============================
Scene_Drill_HB.prototype.update = function() { 
	Scene_Base.prototype.update.call(this);	
	this.drill_updateBackground();
	this.drill_updateWeltImg();
}
//==============================
// * 帧刷新 - 背景
//==============================
Scene_Drill_HB.prototype.drill_updateBackground = function() {
	
	for(var i=0; i < this._drill_background_dataTank.length; i++){
		var temp_data = this._drill_background_dataTank[i];
		var temp_sprite = this._drill_background_tank[i];
		
		// > 数据刷新
		if( $gameSystem ){
			var sys_data = $gameSystem._drill_HB_dataTank[i];
			temp_data.visible = sys_data.visible;
			sys_data.x_speed += (sys_data.tar_x_speed - sys_data.x_speed)/20;
			sys_data.y_speed += (sys_data.tar_y_speed - sys_data.y_speed)/20;
			sys_data.x += (sys_data.tar_x - sys_data.x)/20;
			sys_data.y += (sys_data.tar_y - sys_data.y)/20;
			temp_data.ex_x_speed = sys_data.x_speed;
			temp_data.ex_y_speed = sys_data.y_speed;
			temp_data.ex_x = sys_data.x;
			temp_data.ex_y = sys_data.y;
		}
		
		temp_data.curX += temp_data.x_speed + temp_data.ex_x_speed;
		temp_data.curY += temp_data.y_speed + temp_data.ex_y_speed;
		if( temp_data.visible == true ){
			temp_data.curOpacity += temp_data.tarOpacity/temp_data.time;
			if( temp_data.curOpacity >= temp_data.tarOpacity ){
				temp_data.curOpacity = temp_data.tarOpacity;
			}
		}else{
			temp_data.curOpacity -= temp_data.tarOpacity/temp_data.time;
		}
		temp_data.curOpacity = temp_data.curOpacity.clamp(0,255);
				
		// > 贴图刷新
		temp_sprite.origin.x = 0;
		temp_sprite.origin.y = 0;
		temp_sprite.origin.x += temp_data.curX;
		temp_sprite.origin.y += temp_data.curY;
		temp_sprite.origin.x += temp_data.ex_x;
		temp_sprite.origin.y += temp_data.ex_y;
		temp_sprite.opacity = temp_data.curOpacity;
		if( temp_sprite.opacity == 0 ){
			temp_sprite.visible = false;
		}else{
			temp_sprite.visible = true;
		}
	}
}
//==============================
// * 帧刷新 - 贴边图像
//==============================
Scene_Drill_HB.prototype.drill_updateWeltImg = function() {
	
	// > 数据刷新
	var isChanging = false;
	if( $gameSystem ){
		if( this._drill_weltImg_left != $gameSystem._drill_HB_weltImg_left ){
			isChanging = true;
			this._drill_leftSprite_data.cur_opacity -= 255/DrillUp.g_HB_weltImg_time;
			if(this._drill_leftSprite_data.cur_opacity <= 0 ){
				this._drill_weltImg_left = $gameSystem._drill_HB_weltImg_left;
				this._drill_leftSprite.bitmap = ImageManager.load_SpecialLayer(this._drill_weltImg_left);
			}
		}
		if( this._drill_weltImg_right != $gameSystem._drill_HB_weltImg_right ){
			isChanging = true;
			this._drill_rightSprite_data.cur_opacity -= 255/DrillUp.g_HB_weltImg_time;
			if(this._drill_rightSprite_data.cur_opacity <= 0 ){
				this._drill_weltImg_right = $gameSystem._drill_HB_weltImg_right;
				this._drill_rightSprite.bitmap = ImageManager.load_SpecialLayer(this._drill_weltImg_right);
			}
		}
		if( this._drill_weltImg_up != $gameSystem._drill_HB_weltImg_up ){
			isChanging = true;
			this._drill_upSprite_data.cur_opacity -= 255/DrillUp.g_HB_weltImg_time;
			if(this._drill_upSprite_data.cur_opacity <= 0 ){
				this._drill_weltImg_up = $gameSystem._drill_HB_weltImg_up;
				this._drill_upSprite.bitmap = ImageManager.load_SpecialLayer(this._drill_weltImg_up);
			}
		}
		if( this._drill_weltImg_down != $gameSystem._drill_HB_weltImg_down ){
			isChanging = true;
			this._drill_downSprite_data.cur_opacity -= 255/DrillUp.g_HB_weltImg_time;
			if(this._drill_downSprite_data.cur_opacity <= 0 ){
				this._drill_weltImg_down = $gameSystem._drill_HB_weltImg_down;
				this._drill_downSprite.bitmap = ImageManager.load_SpecialLayer(this._drill_weltImg_down);
			}
		}
	}
	
	// > 显现
	if( isChanging == false ){
		if( this._drill_leftSprite_data.cur_visible == true ){
			this._drill_leftSprite_data.cur_opacity += 255/DrillUp.g_HB_weltImg_time;
		}else{
			this._drill_leftSprite_data.cur_opacity -= 255/DrillUp.g_HB_weltImg_time;
		}
		if( this._drill_rightSprite_data.cur_visible == true ){
			this._drill_rightSprite_data.cur_opacity += 255/DrillUp.g_HB_weltImg_time;
		}else{
			this._drill_rightSprite_data.cur_opacity -= 255/DrillUp.g_HB_weltImg_time;
		}
		if( this._drill_upSprite_data.cur_visible == true ){
			this._drill_upSprite_data.cur_opacity += 255/DrillUp.g_HB_weltImg_time;
		}else{
			this._drill_upSprite_data.cur_opacity -= 255/DrillUp.g_HB_weltImg_time;
		}
		if( this._drill_downSprite_data.cur_visible == true ){
			this._drill_downSprite_data.cur_opacity += 255/DrillUp.g_HB_weltImg_time;
		}else{
			this._drill_downSprite_data.cur_opacity -= 255/DrillUp.g_HB_weltImg_time;
		}
	}
	this._drill_leftSprite_data.cur_opacity = this._drill_leftSprite_data.cur_opacity.clamp(0,255);
	this._drill_rightSprite_data.cur_opacity = this._drill_rightSprite_data.cur_opacity.clamp(0,255);
	this._drill_upSprite_data.cur_opacity = this._drill_upSprite_data.cur_opacity.clamp(0,255);
	this._drill_downSprite_data.cur_opacity = this._drill_downSprite_data.cur_opacity.clamp(0,255);
	
	
	// > 贴图刷新
	this._drill_leftSprite.x = 0;			//贴边
	this._drill_leftSprite.y = this._drill_cur_height/2;
	this._drill_rightSprite.x = this._drill_cur_width;
	this._drill_rightSprite.y = this._drill_cur_height/2;
	
	this._drill_upSprite.x = this._drill_cur_width/2;
	this._drill_upSprite.y = 0;
	this._drill_downSprite.x = this._drill_cur_width/2;
	this._drill_downSprite.y = this._drill_cur_height;
	
	this._drill_leftSprite.opacity = this._drill_leftSprite_data.cur_opacity;
	this._drill_rightSprite.opacity = this._drill_rightSprite_data.cur_opacity;
	this._drill_upSprite.opacity = this._drill_upSprite_data.cur_opacity;
	this._drill_downSprite.opacity = this._drill_downSprite_data.cur_opacity;
}

//==============================
// * 设置变化大小（可放入帧刷新中）
//==============================
Scene_Drill_HB.prototype.drill_setSize = function(width,height) {
	if(this._drill_cur_width == width && this._drill_cur_height == height){ return; }
	this._drill_cur_width = width;
	this._drill_cur_height = height;
	
	// > 背景宽高
	for(var i=0; i < this._drill_background_tank.length; i++){
		var temp_sprite = this._drill_background_tank[i];
		temp_sprite.move(0,0,this._drill_cur_width,this._drill_cur_height);
	}
	
	// > 贴边图形显现条件
	if( this._drill_cur_width - Graphics._width*Graphics._realScale >= DrillUp.g_HB_weltImg_width * 2 ){
		this._drill_leftSprite_data.cur_visible = true;
		this._drill_rightSprite_data.cur_visible = true;
	}else{
		this._drill_leftSprite_data.cur_visible = false;
		this._drill_rightSprite_data.cur_visible = false;
	}
	if( this._drill_cur_height - Graphics._height*Graphics._realScale >= DrillUp.g_HB_weltImg_height * 2 ){
		this._drill_upSprite_data.cur_visible = true;
		this._drill_downSprite_data.cur_visible = true;
	}else{
		this._drill_upSprite_data.cur_visible = false;
		this._drill_downSprite_data.cur_visible = false;
	}
}

