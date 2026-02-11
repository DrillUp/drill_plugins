//=============================================================================
// Drill_TitleVideo.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        标题 - 多层标题视频
 * @author Drill_up
 * 
 * @Drill_LE_param "视频-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_TVi_style_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_TitleVideo +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题中放置一个或者多个标题视频。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfGlobalSave       管理器-全局存储核心
 *     由于在标题界面，插件的数据固定全局存储。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于标题界面。
 * 2.要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-菜单界面）.docx"。
 * 全局存储：
 *   (1.该插件控制的显示/隐藏数据将存储在全局文件中。
 *      如果游戏中修改了显示/隐藏，则永久有效，不保存也有效。
 *   (2.更多详细介绍，去看看 "21.管理器 > 关于全局存储.docx"。
 *   (3.留意全局存储的机制，开游戏就生效。
 *      如果你遇到了视频设置后不显示/不变化的问题，要注意清除全部存档。
 * 视频：
 *   (1.视频动画只支持 .webm(pc端) 和 .mp4(手机端) 格式的视频。
 *   (2.视频与GIF区别在于清晰度和声音。
 *      如果你有条件制作GIF，建议使用GIF而不是视频。
 *   (3.循环播放时，视频的末尾可能会闪一下黑屏。属于正常情况。
 *   (4.视频是一个比较复杂的文件结构，需要通过环境内置的解析器来解析，
 *      低版本的nwjs由于环境缺陷，运行两个以上视频会非常卡，高配电
 *      脑也卡到4帧，而火狐浏览器、高版本的js环境不存在该问题。
 * 贴图化：
 *   (1.相对于插件旧版本，现在你已经可以设置多层视频了，并且可以
 *      自由控制位置、大小、层级。
 *   (2.视频不支持遮罩。
 * 层级:
 *   (1.标题设置中有 菜单层级 和 图片层级。
 *      菜单层级分 菜单前面层和菜单后面层 ，对应 标题窗口元素 的前面和后面。
 *      相同 菜单层级 下，各个菜单多层装饰插件都根据 图片层级 先后排序。
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
 * ----可选设定
 * 你可以通过插件指令控制视频的显示情况：
 * 
 * 插件指令：>标题视频 : 视频[3] : 显示
 * 插件指令：>标题视频 : 视频[4] : 隐藏
 * 插件指令：>标题视频 : 隐藏全部
 * 
 * 1.如果你想制作同一个菜单，有不同的风格，可以先配置两种不同风格的
 *   视频，然后使用显示/隐藏视频指令来进行风格切换。
 * 2.注意，插件指令做出的改变是全局的。
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
 * 测试方法：   在标题中开启视频。
 * 测试结果：   菜单界面中，标题估算平均消耗为：【265.46ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.标题视频与标题视频原理一样，消耗图形计算能力非常大，
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
 * 大幅度修改了全局存储的文件存储结构。
 * [v1.8]
 * 修复了视频声音在进入游戏后仍然播放的bug。
 *
 *
 * @param 全局存储的文件路径
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID,该插件的数据将存储到指定文件路径,具体看看"21.管理器 > 关于全局存储.docx"。
 * @default 1
 *
 * @param ---视频组---
 * @default
 * 
 * @param 视频-1
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-2
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-3
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-4
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-5
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-6
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-7
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-8
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-9
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-10
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-11
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-12
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-13
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-14
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-15
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-16
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-17
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-18
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-19
 * @parent ---视频组---
 * @type struct<TitleVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-20
 * @parent ---视频组---
 * @type struct<TitleVideo>
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
/*~struct~TitleVideo:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的标题视频==
 * 
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
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
 * @default 816
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
 * @default 624
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
 * @param 菜单层级
 * @parent ---视频贴图---
 * @type select
 * @option 菜单前面层
 * @value 菜单前面层
 * @option 菜单后面层
 * @value 菜单后面层
 * @desc 视频所在的层级位置，具体关系看看插件说明。
 * @default 菜单后面层
 *
 * @param 图片层级
 * @parent ---视频贴图---
 * @type number
 * @min 0
 * @desc 同一个在菜单层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		TVi（Title_Video）
//		临时全局变量	DrillUp.g_TVi_xxx
//		临时局部变量	this._drill_TVi_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_TVi_visibleTank
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)+o(视频图像处理) 每帧
//		★性能测试因素	标题界面开启视频
//		★性能测试消耗	265.46ms 从图像函数里面找到的值
//		★最坏情况		开视频就是最坏情况。
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
//				->只有显示隐藏指令
//			->☆全局存储
//			->☆标题层级
//			x->☆预加载（标题）
//			
//			->☆贴图创建标记
//			->☆贴图控制
//				->退出界面时销毁
//			->☆音量控制
//			->视频贴图【Drill_TVi_VideoSprite】
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰）（脚本）.docx
//		
//		★插件私有类：
//			* 视频贴图【Drill_TVi_VideoSprite】
//		
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.注意 addEventListener 的函数要 bind(this)。
//
//		★其它说明细节：
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@    /@@@@@@      /@@    │
//			  │  /@@__  @@  /@@__  @@   /@@@@    │
//			  │ | @@  \ @@ |__/  \ @@  |_  @@    │
//			  │ | @@  | @@   /@@@@@@/    | @@    │
//			  │ | @@  | @@  /@@____/     | @@    │
//			  │ | @@  | @@ | @@          | @@    │
//			  │ |  @@@@@@/ | @@@@@@@@   /@@@@@@  │
//			  │  \______/  |________/  |______/  │
//			  └──────────────────────────────────┘
//			2.视频实际上是通过texture对sprite进行视频播放控制的。
//			  【但是视频不支持遮罩】
//			3.标题与菜单不同的地方：
//				只作用于Scene_Title。
//				this._backgroundSprite要手动建立。
//				注释和资源文件夹变化。
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
	DrillUp.g_TVi_PluginTip_curName = "Drill_TitleVideo.js 标题-多层标题视频";
	DrillUp.g_TVi_PluginTip_baseList = ["Drill_CoreOfGlobalSave.js 管理器-全局存储核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_TVi_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_TVi_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_TVi_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_TVi_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_TVi_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_TitleVideo = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleVideo');

	//==============================
	// * 静态数据 - 视频
	//				（~struct~TitleVideo）
	//==============================
	DrillUp.drill_TVi_videoDataInit = function( dataFrom ){
		var data = {};
		
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		
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
		data['layerIndex'] = String( dataFrom["菜单层级"] || "菜单后面层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		return data;
	}
	
	/*-----------------视频------------------*/
	DrillUp.g_TVi_style_length = 20;
	DrillUp.g_TVi_style = [];
	for( var i = 0; i < DrillUp.g_TVi_style_length; i++ ){
		if( DrillUp.parameters["视频-" + String(i+1) ] != undefined &&
			DrillUp.parameters["视频-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["视频-" + String(i+1) ]);
			DrillUp.g_TVi_style[i] = DrillUp.drill_TVi_videoDataInit( temp );
		}else{
			DrillUp.g_TVi_style[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_TVi_DEBUG = String(DrillUp.parameters["是否开启Debug模式"] || "true") === "true";
    DrillUp.g_TVi_dataFileId = Number(DrillUp.parameters["全局存储的文件路径"] || 1);


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfGlobalSave ){

	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_TVi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_TVi_pluginCommand.call(this, command, args);
	this.drill_TVi_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_TVi_pluginCommand = function( command, args ){
	if( command === ">标题视频" ){
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var b_id = -1;
			temp1 = temp1.replace("视频[","");
			temp1 = temp1.replace("]","");
			b_id = Number(temp1) - 1;
			
			if( b_id >= 0 && type === "显示" ){
				DrillUp.global_TVi_visibleTank[b_id] = true;
				StorageManager.drill_TVi_saveData();
			}
			if( b_id >= 0 && type === "隐藏" ){
				DrillUp.global_TVi_visibleTank[b_id] = false;
				StorageManager.drill_TVi_saveData();
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type === "隐藏全部" ){
				for(var i=0; i<DrillUp.global_TVi_visibleTank.length; i++){
					DrillUp.global_TVi_visibleTank[i] = false;
				}
				StorageManager.drill_TVi_saveData();
			}
		}
	}
};


//=============================================================================
// ** ☆全局存储
//=============================================================================
//==============================
// * 『全局存储』 - 载入时检查数据 - 显示情况
//==============================
DrillUp.drill_TVi_gCheckData_visible = function(){
	for( var i = 0; i < DrillUp.g_TVi_style_length ; i++ ){
		var temp_c = DrillUp.g_TVi_style[i];
		
		// > 指定数据为空时
		if( DrillUp.global_TVi_visibleTank[i] == null ){
			if( temp_c == undefined ){			//（无配置，跳过）
				DrillUp.global_TVi_visibleTank[i] = null;
			}else{								//（有配置，初始化默认）
				DrillUp.global_TVi_visibleTank[i] = temp_c['visible'];
			}
			
		// > 不为空则跳过检查
		}else{
			//（不操作）
		}
	}
}
//==============================
// * 『全局存储』 - 载入
//==============================
	var global_fileId = DrillUp.g_TVi_dataFileId;
	var global_data = StorageManager.drill_COGS_loadData( global_fileId, "TVi" );  //『全局存储执行函数』
	
	// > 显示情况
	if( DrillUp.global_TVi_visibleTank == null ){			//（游戏没关时，不会为null)
		var data = global_data["global_visibleTank"];
		if( data == undefined ){ data = [] };
		DrillUp.global_TVi_visibleTank = data;
		DrillUp.drill_TVi_gCheckData_visible();				//（检查时自动赋新值）
	}
	
//==============================
// * 『全局存储』 - 存储
//==============================
StorageManager.drill_TVi_saveData = function(){
	var file_id = DrillUp.g_TVi_dataFileId;
	var data = {};
	data["global_visibleTank"] = DrillUp.global_TVi_visibleTank;
	this.drill_COGS_saveData( file_id, "TVi", data );  //『全局存储执行函数』
};


//#############################################################################
// ** 【标准模块】标题层级 ☆标题层级
//#############################################################################
//##############################
// * 标题层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，菜单后面层/菜单前面层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Title.prototype.drill_TVi_layerAddSprite = function( sprite, layer_index ){
    this.drill_TVi_layerAddSprite_Private(sprite, layer_index);
};
//##############################
// * 标题层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从标题层级中移除。
//##############################
Scene_Title.prototype.drill_TVi_layerRemoveSprite = function( sprite ){
	this.drill_TVi_layerRemoveSprite_Private( sprite );
};
//##############################
// * 标题层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，标题层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Title.prototype.drill_TVi_sortByZIndex = function () {
    this.drill_TVi_sortByZIndex_Private();
};
//=============================================================================
// ** 标题层级（接口实现）
//=============================================================================
//==============================
// * 标题层级 - 层级初始化1
//==============================
var _drill_TVi_titleLayer_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	_drill_TVi_titleLayer_createBackground.call(this);
	
	// > 创建 菜单后面层（注意，Scene_Title 没有继承 Scene_MenuBase，提前创建）
	if( this._backgroundSprite == undefined ){
		this._backgroundSprite = new Sprite();
		this.addChild(this._backgroundSprite);
	}
};
//==============================
// * 标题层级 - 层级初始化2
//==============================
var _drill_TVi_titleLayer_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TVi_titleLayer_update.call(this);
	
	// > 创建 菜单后面层（防止报错）
	if( this._backgroundSprite == undefined ){
		this._backgroundSprite = new Sprite();
	}
	// > 创建 菜单前面层
	if( this._foregroundSprite == undefined ){
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);	
	}
};
//==============================
// * 标题层级 - 参数定义
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
// * 标题层级 - 图片层级排序（私有）
//==============================
Scene_Title.prototype.drill_TVi_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 标题层级 - 去除贴图（私有）
//==============================
Scene_Title.prototype.drill_TVi_layerRemoveSprite_Private = function( sprite ){
	this._backgroundSprite.removeChild( sprite );
	this._foregroundSprite.removeChild( sprite );
};
//==============================
// * 标题层级 - 添加贴图到层级（私有）
//==============================
Scene_Title.prototype.drill_TVi_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "菜单后面层" || layer_index === "0" || layer_index === 0 || 
		layer_index == "下层" || layer_index == "中层" || layer_index == "上层"){
		this._backgroundSprite.addChild( sprite );
	}
	if( layer_index == "菜单前面层" || layer_index === "1" || layer_index === 1 || 
		layer_index == "图片层" || layer_index == "最顶层" ){
		this._foregroundSprite.addChild( sprite );
	}
};



//=============================================================================
// ** ☆贴图创建标记
//			
//			说明：	> 此模块管理 创建标记，确保只创建一次。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图创建标记 - 初始化
//==============================
var _drill_TVi_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	
	// > 视频初始化
	SceneManager._drill_TVi_created = false;	
	DrillUp.g_drill_TVi_sprites = [];
	DrillUp.g_drill_TVi_sprites_data = [];
	
	// > 原函数
	_drill_TVi_createBackground.call(this);
};
//==============================
// * 贴图创建标记 - 退出界面
//==============================
var _drill_TVi_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
	_drill_TVi_terminate.call(this);
	SceneManager._drill_TVi_created = false;	//（下次进入界面需重新创建）
};
//==============================
// * 贴图创建标记 - 帧刷新
//==============================
var _drill_TVi_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TVi_update.call(this);
	
	// > 要求载入完毕后 创建
	if( SceneManager.isCurrentSceneStarted() &&
		SceneManager._drill_TVi_created != true ){
		this.drill_TVi_create();
	}
	// > 帧刷新
	if( SceneManager._drill_TVi_created == true ){
		this.drill_TVi_update();
	}
};


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 初始化
//==============================
var _drill_TVi_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_TVi_temp_initialize.call(this);
	//this._drill_TVi_sprites = [];			//（Game_Temp里面不要执行初始化）
	//this._drill_TVi_sprites_data = [];	//（因为开始新游戏时，会执行此初始化，造成视频未被删掉指针就清空了）
};
//==============================
// * 贴图控制 - 初始化
//==============================
DrillUp.g_drill_TVi_sprites = [];
DrillUp.g_drill_TVi_sprites_data = [];
//==============================
// * 贴图控制 - 退出界面
//==============================
var _drill_TVi_terminate2 = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
	_drill_TVi_terminate2.call(this);
	
	// > 执行销毁
	for(var i=0; i < DrillUp.g_drill_TVi_sprites.length; i++){
		var temp_sprite = DrillUp.g_drill_TVi_sprites[i];
		temp_sprite.drill_TVi_destroy();
		this.drill_TVi_layerRemoveSprite( temp_sprite );
	}
	DrillUp.g_drill_TVi_sprites = [];
	DrillUp.g_drill_TVi_sprites_data = [];
};
//==============================
// * 贴图控制 - 创建
//==============================
Scene_Title.prototype.drill_TVi_create = function() {    
	SceneManager._drill_TVi_created = true;
	
	// > 防止报错
	if( DrillUp.g_drill_TVi_sprites == undefined ){
		DrillUp.g_drill_TVi_sprites = [];
	}
	if( DrillUp.g_drill_TVi_sprites_data == undefined ){
		DrillUp.g_drill_TVi_sprites_data = [];
	}
	
	// > 创建贴图
	for( var i = 0; i < DrillUp.g_TVi_style.length; i++ ){
		var temp_data = DrillUp.g_TVi_style[i];
		if( temp_data == undefined ){ continue; }
		if( DrillUp.global_TVi_visibleTank[i] != true ){ continue; }
		
		// > 视频贴图
		var temp_suffix = Game_Interpreter.prototype.videoFileExt();	//组合路径
		var temp_path = 'movies/'+ temp_data['src'] + temp_suffix;
		if( DrillUp.g_TVi_DEBUG ){ console.log("标题视频-读取材质:", temp_path); }
		
		var data = {
			"x":temp_data['x'],
			"y":temp_data['y'],
			"opacity":temp_data['opacity'],
			"blendMode":temp_data['blendMode'],
			"zIndex":temp_data['zIndex'],
			
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
			
			"showDebug": DrillUp.g_TVi_DEBUG
		}
		var temp_sprite = new Drill_TVi_VideoSprite( data );
		DrillUp.g_drill_TVi_sprites.push(temp_sprite);
		DrillUp.g_drill_TVi_sprites_data.push(data);
		
		this.drill_TVi_layerAddSprite( temp_sprite, temp_data['layerIndex'] );
	}

	// > 层级排序
	this.drill_TVi_sortByZIndex();
};
//==============================
// * 贴图控制 - 帧刷新
//==============================
Scene_Title.prototype.drill_TVi_update = function() {
	//（暂无）
};


//=============================================================================
// ** ☆音量控制
//
//			说明：	> 此模块专门管理 视频音量比 控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 音量控制 - 控制音量比例
//==============================
var _drill_TVi_setMasterVolume = WebAudio.setMasterVolume;
WebAudio.setMasterVolume = function( value ){
	for( var i = 0; i < DrillUp.g_drill_TVi_sprites.length; i++ ){
		var temp_sprite = DrillUp.g_drill_TVi_sprites[i];
		if( temp_sprite ){
			temp_sprite._drill_src.volume = temp_sprite._drill_data['volume'] * value;
			if( temp_sprite._drill_data['showDebug'] == true ){ console.log("标题视频-设置音量: ", value); }
		}
	}
	return _drill_TVi_setMasterVolume(value);
};


//=============================================================================
// ** 视频贴图【Drill_TVi_VideoSprite】
// **
// **		作用域：	菜单界面
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
function Drill_TVi_VideoSprite() {
	this.initialize.apply(this, arguments);
}
Drill_TVi_VideoSprite.prototype = Object.create(Sprite.prototype);
Drill_TVi_VideoSprite.prototype.constructor = Drill_TVi_VideoSprite;
//==============================
// * 视频贴图 - 初始化
//==============================
Drill_TVi_VideoSprite.prototype.initialize = function( data ){
	Sprite.prototype.initialize.call(this);
	this._drill_data = JSON.parse(JSON.stringify( data ));	//深拷贝数据
	
	this.drill_initData();									//初始化数据
	this.drill_initSprite();								//初始化对象
};
//==============================
// * 视频贴图 - 帧刷新
//==============================
Drill_TVi_VideoSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
											//帧刷新 - A主体（无）
	this.drill_TVi_updateVideo();			//帧刷新 - B视频
};
//==============================
// * 视频贴图 - 初始化数据『独立贴图』
//==============================
Drill_TVi_VideoSprite.prototype.drill_initData = function() {
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
Drill_TVi_VideoSprite.prototype.drill_initSprite = function() {
	this.drill_sprite_initAttr();			//初始化子功能 - A主体
	this.drill_sprite_initVideo();			//初始化子功能 - B视频
};
//==============================
// * 视频贴图 - 执行销毁
//==============================
Drill_TVi_VideoSprite.prototype.drill_TVi_destroy = function() {
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
Drill_TVi_VideoSprite.prototype.drill_sprite_initAttr = function() {
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
Drill_TVi_VideoSprite.prototype.drill_sprite_initVideo = function() {
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
	this._drill_src.addEventListener('loadedmetadata', this.drill_TVi_videoLoaded.bind(this) );
	this._drill_src.addEventListener('timeupdate', this.drill_TVi_videoUpdated.bind(this) );
	this._drill_src.addEventListener('ended', this.drill_TVi_videoEnded.bind(this) );
	this._drill_src.addEventListener('error', this.drill_TVi_videoError.bind(this) );
	if( this._drill_src.played.length ){
		this._drill_src.play();
	}
}
//==============================
// * B视频 - 帧刷新
//==============================
Drill_TVi_VideoSprite.prototype.drill_TVi_updateVideo = function() {
	if( this._drill_texture_loaded == true ){
		this._drill_texture.update();
	}
}
//==============================
// * B视频 - 监听 - 视频载入完成时
//==============================
Drill_TVi_VideoSprite.prototype.drill_TVi_videoLoaded = function() {
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
Drill_TVi_VideoSprite.prototype.drill_TVi_videoUpdated = function() {
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
			this.drill_TVi_destroy();
		}
	}
}
//==============================
// * B视频 - 监听 - 视频结束时
//==============================
Drill_TVi_VideoSprite.prototype.drill_TVi_videoEnded = function() {
	var data = this._drill_data;
	
	// > 循环播放 - 开启时
	//		（此设置好像进不来，因为（循环节结束时）抢先一步循环了）
	if( data['loopEnable'] == true ){
		this._drill_src['currentTime'] = this._drill_loopStart;
		this._drill_src.play();
		if( data['showDebug'] == true ){ console.log("视频-循环播放（视频结束时）回到位置:", this._drill_loopStart ); }
		
	// > 循环播放 - 结束时
	}else{
		this.drill_TVi_destroy();
	}
}
//==============================
// * B视频 - 监听 - 视频载入错误时
//==============================
Drill_TVi_VideoSprite.prototype.drill_TVi_videoError = function() {
	var data = this._drill_data;
	if( data['showDebug'] == true ){ console.error("视频-视频发生了错误:", this._drill_src.error); }
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_TitleVideo = false;
		var pluginTip = DrillUp.drill_TVi_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


