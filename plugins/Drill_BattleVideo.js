//=============================================================================
// Drill_BattleVideo.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        战斗 - 多层战斗视频
 * @author Drill_up
 * 
 * @Drill_LE_param "视频-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_BVi_style_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_BattleVideo +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在战斗中放置一个或者多个战斗视频。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   可以放置在战斗中的四个层级中。
 * 2.更多组合可以去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-战斗界面）.docx"。
 * 视频：
 *   (1.视频动画只支持 .webm(pc端) 和 .mp4(手机端) 格式的视频。
 *   (2.视频与GIF区别在于清晰度和声音。
 *      如果你有条件制作GIF，建议使用GIF而不是视频。
 *   (3.循环播放时，视频的末尾可能会闪一下黑屏。属于正常情况。
 *   (4.视频是一个比较复杂的文件结构，需要通过环境内置的解析器来解析，
 *      低版本的node.js由于环境缺陷，运行两个以上视频会非常卡，高配电
 *      脑也卡到4帧，而火狐浏览器、高版本的js环境不存在该问题。
 * 贴图化：
 *   (1.相对于插件旧版本，现在你已经可以设置多层视频了，并且可以
 *      自由控制位置、大小、层级。
 *   (2.视频的宽高可以自由缩放，但是要确保大于镜头架的高宽。
 *      如果设置了视频偏移，要注意不要让玩家的镜头看到外部边界线。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：movies
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 所有视频文件都存储在根目录的movies文件夹。需要配置视频名：
 * 
 * 视频-1 资源-视频动画
 * 视频-2 资源-视频动画
 * 视频-3 资源-视频动画
 * ……
 *
 * 只需要填入文件名即可，不需要后缀。
 * （视频文件不会被去除，但也不会被加密）
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令控制战斗视频的显示情况：
 * （注意，冒号两边有一个空格。）
 * 
 * 插件指令：>清空全部战斗装饰部件
 * 插件指令：>创建战斗视频 : 1
 * 插件指令：>创建战斗视频 : 2
 *
 * 1.进入战斗前，最好先清空一下，避免干扰。
 * 2.视频需要一个一个添加上去。
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
 * 时间复杂度： o(n)+o(视频图像处理) 每帧
 * 测试方法：   在战斗中开启视频。
 * 测试结果：   战斗界面估算平均消耗为：【265.46ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.战斗视频与视频原理一样，消耗图形计算能力非常大，
 *   而且有时候可能会出现视频花屏问题。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了视频的层级。
 * [v1.2]
 * 添加了插件性能测试说明。
 * [v1.3]
 * 重新修改了视频的结构。
 * [v1.4]
 * 将视频变成可以配置多层。
 * [v1.5]
 * 修复了在播放视频时，突然暂停播放的问题。
 * [v1.6]
 * 更新了pixi5的兼容情况。
 * [v1.7]
 * 更新了插件指令。
 * [v1.8]
 * 优化了战斗层级结构。
 * [v1.9]
 * 优化了旧存档的识别与兼容。
 * [v2.0]
 * 整理分类了内部功能。
 * [v2.1]
 * 修复了视频声音在离开战斗后仍然播放的bug。
 * 
 *
 * @param ---视频组---
 * @default
 * 
 * @param 视频-1
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-2
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-3
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-4
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-5
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-6
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-7
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-8
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-9
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-10
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-11
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-12
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-13
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-14
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-15
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-16
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-17
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-18
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-19
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-20
 * @parent ---视频组---
 * @type struct<BattleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 是否开启Debug模式
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，该模式会在控制台输出视频播放的log信息。
 * @default false
 * 
 */
/*~struct~BattleVideo:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的战斗视频==
 * 
 *
 * @param ---视频配置---
 * @default
 *
 * @param 资源-视频动画
 * @parent ---视频配置---
 * @desc 视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 默认视频
 *
 * @param 是否播放声音
 * @parent ---视频配置---
 * @type boolean
 * @on 播放
 * @off 关闭
 * @desc true - 播放，false - 关闭。
 * @default false
 * 
 * @param 音量比
 * @parent 是否播放声音
 * @desc 视频声音的音量比，填0.00-1.00之间的值，表示0%-100%。
 * @default 1.00
 *
 * @param 视频播放速度
 * @parent ---视频配置---
 * @desc 视频播放的速度，1.0为原速度。
 * @default 1.0
 *
 * @param 是否循环播放
 * @parent ---视频配置---
 * @type boolean
 * @on 循环
 * @off 不循环
 * @desc true - 循环，false - 不循环。
 * @default true
 *
 * @param 起始时间
 * @parent ---视频配置---
 * @desc 视频从原资源视频的时间点开始播放，单位秒。
 * @default 0.0
 *
 * @param 是否指定结束时间
 * @parent ---视频配置---
 * @type boolean
 * @on 指定
 * @off 默认
 * @desc true - 指定，false - 默认，默认为视频资源的时间长度。
 * @default false
 * 
 * @param 结束时间
 * @parent 是否指定结束时间
 * @desc 视频结束或者重新循环的时间点，单位秒。
 * @default 10.0
 *
 *
 * @param ---视频贴图---
 * @default
 * 
 * @param 平移-视频 X
 * @parent ---视频贴图---
 * @desc x轴方向平移，单位像素。0为视频中心贴在正中心。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-视频 Y
 * @parent ---视频贴图---
 * @desc y轴方向平移，单位像素。0为视频中心贴在正中心。正数向下，负数向上。
 * @default 0
 *
 * @param 是否使用原视频宽度
 * @parent ---视频贴图---
 * @type boolean
 * @on 使用原视频宽度
 * @off 指定宽度
 * @desc true - 使用原视频宽度，false - 指定宽度。
 * @default false
 *
 * @param 指定视频宽度
 * @parent 是否使用原视频宽度
 * @type number
 * @min 50
 * @desc 视频的宽度。
 * @default 1000
 *
 * @param 是否使用原视频高度
 * @parent ---视频贴图---
 * @type boolean
 * @on 使用原视频高度
 * @off 指定高度
 * @desc true - 使用原视频高度，false - 指定高度。
 * @default false
 *
 * @param 指定视频高度
 * @parent 是否使用原视频高度
 * @type number
 * @min 50
 * @desc 视频的高度。
 * @default 740
 * 
 * @param 透明度
 * @parent ---视频贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 视频的透明度，0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @parent ---视频贴图---
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
 * @param 视频色调
 * @parent ---视频贴图---
 * @desc 屏幕的滤镜色调，默认: #ffffff。
 * @default #ffffff
 *
 * @param 战斗层级
 * @parent ---视频贴图---
 * @type select
 * @option 下层
 * @value 下层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 视频所在的层级位置，具体关系看看插件说明。
 * @default 下层
 *
 * @param 图片层级
 * @parent ---视频贴图---
 * @type number
 * @min 0
 * @desc 同一个在战斗层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BVi（Battle_Video）
//		临时全局变量	DrillUp.g_BVi_xxx
//		临时局部变量	this._drill_BVi_xxx
//		存储数据变量	$gameSystem._drill_BVi_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)+o(视频图像处理) 每帧
//		★性能测试因素	战斗界面开启视频
//		★性能测试消耗	265.46ms 从图像函数里面找到的值
//		★最坏情况		开视频就是最坏情况。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//				->只有显示隐藏指令
//			->☆存储数据
//			->☆战斗层级
//
//			->☆贴图控制
//				->退出界面时销毁
//			->☆音量控制
//			->视频贴图【Drill_BVi_VideoSprite】
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰）（脚本）.docx
//		
//		★插件私有类：
//			* 视频贴图【Drill_BVi_VideoSprite】
//		
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.注意 addEventListener 的函数要 bind(this)。
//
//		★其它说明细节：
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@      /@@      /@@@@@@  │
//			  │  /@@__  @@   /@@@@     /@@__  @@ │
//			  │ | @@  \ @@  |_  @@    |__/  \ @@ │
//			  │ | @@  | @@    | @@       /@@@@@/ │
//			  │ | @@  | @@    | @@      |___  @@ │
//			  │ | @@  | @@    | @@     /@@  \ @@ │
//			  │ |  @@@@@@/   /@@@@@@  |  @@@@@@/ │
//			  │  \______/   |______/   \______/  │
//			  └──────────────────────────────────┘
//			2.视频实际上是通过texture对sprite进行视频播放控制的。
//			  【但是视频不支持遮罩】
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
	DrillUp.g_BVi_PluginTip_curName = "Drill_BattleVideo.js 战斗-多层战斗视频";
	DrillUp.g_BVi_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_BattleVideo = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_BattleVideo');

	//==============================
	// * 静态数据 - 视频
	//				（~struct~TitleVideo）
	//==============================
	DrillUp.drill_BVi_videoInit = function( dataFrom ){
		var data = {};
		
		// > B视频
		data['src'] = String( dataFrom["资源-视频动画"] || "");
		data['playSound'] = String( dataFrom["是否播放声音"] || "false") == "true"; 
		data['volume'] = Number( dataFrom["音量比"] || 1.00);
		data['playbackRate'] = Number( dataFrom["视频播放速度"] || 1.0);
		
		data['loopEnable'] = String( dataFrom["是否循环播放"] || "false") == "true";
		data['loopStart'] = Number( dataFrom["起始时间"] || 0);
		data['loopEnd'] = Number( dataFrom["结束时间"] || 0);
		data['loopEndLock'] = String( dataFrom["是否指定结束时间"] || "false") == "true";
		
		data['widthUseOrg'] = String( dataFrom["是否使用原视频宽度"] || "false") == "true";
		data['heightUseOrg'] = String( dataFrom["是否使用原视频高度"] || "false") == "true";
		data['width'] = Number( dataFrom["指定视频宽度"] || 0);
		data['height'] = Number( dataFrom["指定视频高度"] || 0);
		data['tint'] = String( dataFrom["视频色调"] || "#ffffff");
		
		// > A主体
		data['x'] = Number( dataFrom["平移-视频 X"] || 0);
		data['y'] = Number( dataFrom["平移-视频 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['area_index'] = String( dataFrom["战斗层级"] || "下层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_BVi_DEBUG = String(DrillUp.parameters["是否开启Debug模式"] || "true") === "true";
	
	/*-----------------视频------------------*/
	DrillUp.g_BVi_style_length = 20;
	DrillUp.g_BVi_style = [];
	for (var i = 0; i < DrillUp.g_BVi_style_length; i++) {
		if( DrillUp.parameters["视频-" + String(i+1) ] != undefined &&
			DrillUp.parameters["视频-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["视频-" + String(i+1) ]);
			DrillUp.g_BVi_style[i] = DrillUp.drill_BVi_videoInit( temp );
		}else{
			DrillUp.g_BVi_style[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}

	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_BVi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_BVi_pluginCommand.call(this, command, args);
	this.drill_BVi_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_BVi_pluginCommand = function( command, args ){
	
	/*-----------------创建指令（固定）------------------*/
	if( command === ">创建战斗视频" ){
		if(args.length == 2){
			var temp = Number(args[1]) - 1;
			$gameSystem._drill_BVi_id_list.push( temp );
		}
	}
	if( command === ">清空全部战斗装饰部件" || command === ">清空战斗视频" ){
		$gameSystem._drill_BVi_id_list = [];
	}
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_BVi_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BVi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BVi_sys_initialize.call(this);
	this.drill_BVi_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BVi_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BVi_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BVi_saveEnabled == true ){	
		$gameSystem.drill_BVi_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BVi_initSysData();
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
Game_System.prototype.drill_BVi_initSysData = function() {
	this.drill_BVi_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BVi_checkSysData = function() {
	this.drill_BVi_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BVi_initSysData_Private = function() {
    this._drill_BVi_id_list = [];
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BVi_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BVi_id_list == undefined ){
		this.drill_BVi_initSysData();
	}
};


//#############################################################################
// ** 【标准模块】战斗层级 ☆战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Battle.prototype.drill_BVi_layerAddSprite = function( sprite, layer_index ){
	this.drill_BVi_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_BVi_layerRemoveSprite = function( sprite ){
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
Scene_Battle.prototype.drill_BVi_sortByZIndex = function () {
    this.drill_BVi_sortByZIndex_Private();
}
//##############################
// * 战斗层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置，当前为 战斗参照）
//					> y 数字              （y位置，当前为 战斗参照）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Battle.prototype.drill_BVi_layerCameraMoving = function( x, y, layer, option ){
	//（不操作）
	return {'x':x,'y':y};
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_BVi_battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_BVi_battle_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_BVi_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_BVi_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_BVi_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_BVi_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_BVi_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_BVi_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
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
			if( this.__drill_zIndex == undefined ){ return 20250701; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_BVi_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_BVi_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_battleDownArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_battleUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}


//=============================================================================
// ** ☆音量控制
//
//			说明：	> 此模块专门管理 视频音量比 控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 音量控制 - 控制音量比例
//==============================
var _drill_BVi_setMasterVolume = WebAudio.setMasterVolume;
WebAudio.setMasterVolume = function( value ){
	for( var i = 0; i < $gameTemp._drill_BVi_sprites.length; i++) {
		var sprite = $gameTemp._drill_BVi_sprites[i];
		if( sprite ){
			sprite._drill_src.volume = sprite._drill_data['volume'] * value;
			if( sprite._drill_data['showDebug'] ){ console.log("战斗视频-设置音量: ", value); }
		}
	}
	return _drill_BVi_setMasterVolume(value);
}


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 初始化
//==============================
var _drill_BVi_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BVi_temp_initialize.call(this);
	this._drill_BVi_sprites = [];
}
//==============================
// * 贴图控制 - 销毁时
//==============================
var _drill_BVi_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_BVi_terminate.call(this);
	
	// > 执行销毁
	for(var i=0; i < $gameTemp._drill_BVi_sprites.length; i++){
		var sprite = $gameTemp._drill_BVi_sprites[i];
		sprite.drill_BVi_destroy();
		this.drill_BVi_layerRemoveSprite( temp_sprite );
	}
	$gameTemp._drill_BVi_sprites = [];
};
//==============================
// * 贴图控制 - 界面创建时
//==============================
var _drill_BVi_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    _drill_BVi_createDisplayObjects.call(this);
	this.drill_BVi_create();
}
//==============================
// * 贴图控制 - 界面创建
//==============================
Scene_Battle.prototype.drill_BVi_create = function() {    
	if( $gameSystem._drill_BVi_id_list.length == 0 ){ return; }
	
	// > 创建贴图
	for( var i = 0; i < $gameSystem._drill_BVi_id_list.length; i++) {
		var temp_data = DrillUp.g_BVi_style[ $gameSystem._drill_BVi_id_list[i] ];
		if( temp_data == undefined ){ continue; }
		
		// > 视频贴图
		var temp_suffix = Game_Interpreter.prototype.videoFileExt();	//组合路径
		var temp_path = 'movies/'+ temp_data['src'] + temp_suffix;
		if( DrillUp.g_BVi_DEBUG ){ console.log("战斗视频-读取材质:", temp_path); }
		
		var data = {
			"path": temp_path,
			"muted": !temp_data['playSound'],
			"volume": temp_data['volume'],
			"playbackRate": temp_data['playbackRate'],
			
			"loopEnable": temp_data['loopEnable'],
			"loopStart": temp_data['loopStart'],
			"loopEnd": temp_data['loopEnd'],
			"loopEndLock": temp_data['loopEndLock'],
			
			"widthUseOrg":temp_data['widthUseOrg'],
			"heightUseOrg":temp_data['heightUseOrg'],
			"width":temp_data['width'],
			"height":temp_data['height'],
			"tint":temp_data['tint'],
			
			"x":temp_data['x'],
			"y":temp_data['y'],
			"opacity":temp_data['opacity'],
			"blendMode":temp_data['blendMode'],
			"zIndex":temp_data['zIndex'],
			
			"showDebug": DrillUp.g_BVi_DEBUG
		}
		var temp_sprite = new Drill_BVi_VideoSprite( data );
		$gameTemp._drill_BVi_sprites.push(temp_sprite);
		
		this.drill_BVi_layerAddSprite( temp_sprite, temp_data['area_index'] );
	}

	// > 层级排序
	this.drill_BVi_sortByZIndex();
};


//=============================================================================
// ** 视频贴图【Drill_BVi_VideoSprite】
// **
// **		作用域：	战斗界面
// **		主功能：	定义一个 视频贴图 对象，用于播放视频。
// **		子功能：	
// **					->贴图『独立贴图』
// **						x->显示贴图/隐藏贴图
// **						x->是否就绪
// **						x->优化策略
// **						->销毁
// **						->初始化数据
// **						->初始化对象
// **					
// **					->A主体
// **					->B视频
// **		
// **		代码：	> 范围 - 仅用于单图层播放视频。
// **				> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。只有visible被控制。
// **				> 数量 - [单个/ ●多个 ]
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 
// **				> 销毁 - [不考虑/ ●自销毁 /外部销毁] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 样式设置后固定，不可修改。
//=============================================================================
//==============================
// * 视频贴图 - 定义
//==============================
function Drill_BVi_VideoSprite() {
	this.initialize.apply(this, arguments);
}
Drill_BVi_VideoSprite.prototype = Object.create(Sprite.prototype);
Drill_BVi_VideoSprite.prototype.constructor = Drill_BVi_VideoSprite;
//==============================
// * 视频贴图 - 初始化
//==============================
Drill_BVi_VideoSprite.prototype.initialize = function( data ){
	Sprite.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	
	this.drill_initData();									//初始化数据
	this.drill_initSprite();								//初始化对象
};
//==============================
// * 视频贴图 - 帧刷新
//==============================
Drill_BVi_VideoSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
											//帧刷新 - A主体（无）
	this.drill_BVi_updateVideo();			//帧刷新 - B视频
};
//==============================
// * 视频贴图 - 初始化数据『独立贴图』
//==============================
Drill_BVi_VideoSprite.prototype.drill_initData = function() {
	var data = this._drill_data;
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };								//位置x
	if( data['y'] == undefined ){ data['y'] = 0 };								//位置y
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };				//透明度
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };				//混合模式
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };					//图片层级
	
	// > B视频
	if( data['path'] == undefined ){ data['path'] = "" };						//资源
	if( data['muted'] == undefined ){ data['muted'] = true };					//是否播放声音
	if( data['volume'] == undefined ){ data['volume'] = 1.00 };					//音量比
	if( data['playbackRate'] == undefined ){ data['playbackRate'] = 1.0 };		//视频播放速度
	
	if( data['loopEnable'] == undefined ){ data['loopEnable'] = true };			//是否循环播放
	if( data['loopStart'] == undefined ){ data['loopStart'] = 0 };				//起始时间
	if( data['loopEnd'] == undefined ){ data['loopEnd'] = 0 };					//结束时间
	if( data['loopEndLock'] == undefined ){ data['loopEndLock'] = true };		//是否指定结束时间
	
	if( data['widthUseOrg'] == undefined  ){ data['widthUseOrg'] = true  };		//是否使用原视频宽度
	if( data['heightUseOrg'] == undefined ){ data['heightUseOrg'] = true };		//是否使用原视频高度
	if( data['width'] == undefined  ){ data['width'] = 0  };					//指定视频宽度
	if( data['height'] == undefined ){ data['height'] = 0 };					//指定视频高度
	if( data['tint'] == undefined ){ data['tint'] = "#ffffff" };				//视频色调
	data['tint'] = data['tint'].replace("#","0x");								//视频色调
	
	if( data['showDebug'] == undefined ){ data['showDebug'] = false };			//是否开启Debug模式
	
	/*	（无法使用遮罩）
	if( data['src_mask'] == undefined ){ data['src_mask'] = "" };						//遮罩
	if( data['src_maskFile'] == undefined ){ data['src_maskFile'] = "img/system/" };	//遮罩文件夹
	*/
};
//==============================
// * 视频贴图 - 初始化对象『独立贴图』
//==============================
Drill_BVi_VideoSprite.prototype.drill_initSprite = function() {
	this.drill_sprite_initAttr();			//初始化子功能 - A主体
	this.drill_sprite_initVideo();			//初始化子功能 - B视频
};
//==============================
// * 视频贴图 - 执行销毁
//==============================
Drill_BVi_VideoSprite.prototype.drill_BVi_destroy = function() {
	var data = this._drill_data;
	if( data['showDebug'] == true ){ console.log("视频-执行去除视频。"); }
	
	// > 销毁 - A主体
	this.visible = false;
	
	// > 销毁 - B视频
	this._drill_src['muted'] = true;
	this._drill_src.pause();
	this._drill_src.remove();
	this._drill_texture_loaded = false;
}

//==============================
// * A主体 - 初始化子功能
//==============================
Drill_BVi_VideoSprite.prototype.drill_sprite_initAttr = function() {
	var data = this._drill_data;
	/*
		贴图的层级如下：
			- 主体贴图（this）
			- - 视频贴图（_drill_video）
	*/
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.x = Graphics.width/2 + data['x'];
	this.y = Graphics.height/2 + data['y'];
	this.opacity = data['opacity'];
	this.blendMode = data['blendMode'];
	this.zIndex = data['zIndex'];
	
	/*	（无法使用遮罩）
	if( data['src_mask'] != "" ){
		var temp_mask = new Sprite();
		temp_mask.bitmap = ImageManager.loadBitmap( data['src_maskFile'], data['src_mask'], 0, true);
		temp_mask.anchor.x = 0.5;
		temp_mask.anchor.y = 0.5;
		this.addChild(temp_mask);
		this.mask = temp_mask;		//『遮罩赋值』
	}*/
}

//==============================
// * B视频 - 初始化子功能
//==============================
Drill_BVi_VideoSprite.prototype.drill_sprite_initVideo = function() {
	var data = this._drill_data;
	
	// > 底层版本控制
	var nstr = PIXI.VERSION.split(/\./);
	if( Number(nstr[0] >= 5) ){
		this._drill_texture = PIXI.Texture.from( data['path'] );				//pixi5视频贴图
		this._drill_src = this._drill_texture.baseTexture.resource.source;		//视频资源
	}else{
		this._drill_texture = PIXI.Texture.fromVideo( data['path'] );			//pixi4视频贴图
		this._drill_src = this._drill_texture.baseTexture.source;				//视频资源
	};
	
	// > 视频贴图 初始化
	this._drill_video = new PIXI.Sprite();
	this._drill_video.texture = this._drill_texture;
	this._drill_video.anchor.x = 0.5;
	this._drill_video.anchor.y = 0.5;
	this._drill_video.tint = parseInt(data['tint']);
	this.addChild(this._drill_video);
	
	// > 视频资源 初始化
	this._drill_texture_loaded = false;				//视频读取状态
	this._drill_loopStart = 0;						//开始位置
	this._drill_loopEnd = 0;						//结束位置
	this._drill_src['preload'] = 'auto';
	this._drill_src['autoload'] = true;
	this._drill_src['muted'] = data['muted'];
	this._drill_src['volume'] = data['volume'] * WebAudio._masterVolume;
	this._drill_src['loop'] = data['loopEnable'];
	this._drill_src['playbackRate'] = data['playbackRate'];
	this._drill_src.addEventListener('loadedmetadata', this.drill_BVi_videoLoaded.bind(this) );
	this._drill_src.addEventListener('timeupdate', this.drill_BVi_videoUpdated.bind(this) );
	this._drill_src.addEventListener('ended', this.drill_BVi_videoEnded.bind(this) );
	this._drill_src.addEventListener('error', this.drill_BVi_videoError.bind(this) );
	if( this._drill_src.played.length ){
		this._drill_src.play();
	}
}
//==============================
// * B视频 - 帧刷新
//==============================
Drill_BVi_VideoSprite.prototype.drill_BVi_updateVideo = function() {
	if( this._drill_texture_loaded == true ){
		this._drill_texture.update();
	}
}
//==============================
// * B视频 - 监听 - 视频载入完成时
//==============================
Drill_BVi_VideoSprite.prototype.drill_BVi_videoLoaded = function() {
	this._drill_texture_loaded = true;
	var data = this._drill_data;
	if( data['showDebug'] == true ){ console.log("视频-读取视频元数据。"); }
	
	// > 重设高宽
	this._drill_video.width  = this._drill_src['videoWidth'];
	this._drill_video.height = this._drill_src['videoHeight'];
	if( data['widthUseOrg'] == false ){			//根据指定高宽进行缩放
		this._drill_video.width = data['width'];
		//this._drill_video.scale.x = data['width'] / this._drill_video.width;
	}
	if( data['heightUseOrg'] == false ){
		this._drill_video.height = data['height'];
		//this._drill_video.scale.y = data['height'] / this._drill_video.height;	
	}
	
	// > 重设循环时间
	if( data['loopEndLock'] == true ){
		this._drill_loopStart = data['loopStart'];
		this._drill_loopEnd = data['loopEnd'];
		if( this._drill_loopEnd > this._drill_src['duration'] ){
			this._drill_loopEnd = this._drill_src['duration'];
		}
	}else{
		this._drill_loopStart = data['loopStart'];
		this._drill_loopEnd = this._drill_src['duration'];
	}
	if( this._drill_loopStart != 0 ){
		this._drill_src['currentTime'] = this._drill_loopStart;
	}
	
	if( data['showDebug'] == true ){ console.log("视频-设置视频循环为 %s 至 %s:", this._drill_loopStart, this._drill_loopEnd ); }
}
//==============================
// * B视频 - 监听 - 视频帧刷新
//==============================
Drill_BVi_VideoSprite.prototype.drill_BVi_videoUpdated = function() {
	if( this._drill_texture_loaded != true ){ return; }
	var data = this._drill_data;
	if( data['showDebug'] == true ){ console.log("视频-视频刷新帧:", this._drill_src['currentTime']); }
	
	if( this._drill_src['currentTime'] >= this._drill_loopEnd -1 ){	//（这里要提前1帧）
		
		// > 循环播放 - 开启时
		if( data['loopEnable'] == true ){
			this._drill_src['currentTime'] = this._drill_loopStart;
			this._drill_src.play();
			if( data['showDebug'] == true ){ console.log("视频-循环播放（循环节结束时）回到位置:", this._drill_loopStart ); }
			
		// > 循环播放 - 结束时
		}else{
			this.drill_BVi_destroy();
		}
	}
}
//==============================
// * B视频 - 监听 - 视频结束时
//==============================
Drill_BVi_VideoSprite.prototype.drill_BVi_videoEnded = function() {
	var data = this._drill_data;
	
	// > 循环播放 - 开启时
	//		（此设置好像进不来，因为（循环节结束时）抢先一步循环了）
	if( data['loopEnable'] == true ){
		this._drill_src['currentTime'] = this._drill_loopStart;
		this._drill_src.play();
		if( data['showDebug'] == true ){ console.log("视频-循环播放（视频结束时）回到位置:", this._drill_loopStart ); }
		
	// > 循环播放 - 结束时
	}else{
		this.drill_BVi_destroy();
	}
}
//==============================
// * B视频 - 监听 - 视频载入错误时
//==============================
Drill_BVi_VideoSprite.prototype.drill_BVi_videoError = function() {
	var data = this._drill_data;
	if( data['showDebug'] == true ){ console.error("视频-视频发生了错误:", this._drill_src.error); }
}


