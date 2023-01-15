//=============================================================================
// Drill_MenuVideo.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        主菜单 - 多层菜单视频
 * @author Drill_up
 * 
 * @Drill_LE_param "视频-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MVi_list_length"
 * 
 *
 * @help
 * =============================================================================
 * +++ Drill_MenuVideo +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在菜单中放置一个或者多个菜单视频。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以放置在菜单前面层或者菜单后面层。
 * 2.该插件可以装饰其他菜单插件。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 * 关键字：
 *   (1.插件通过关键字识别菜单，并对指定菜单进行装饰。
 *      具体去看看 "17.主菜单 > 菜单关键字.docx"。
 *   (2.视频对一些自带背景的菜单插件可能不起作用，因为有些插件自己设
 *      设置了底图，会把菜单的功能覆盖掉。
 * 视频：
 *   (1.视频动画只支持 .webm(pc端) 和 .mp4(手机端) 格式的视频。
 *   (2.视频与GIF区别在于清晰度和声音。
 *      如果你有条件制作GIF，建议使用GIF而不是视频。
 *   (3.循环播放时，视频的末尾可能会闪一下黑色背景。属于正常情况。
 *   (4.视频是一个比较复杂的文件结构，需要通过环境内置的解析器来解析，
 *      低版本的node.js由于环境缺陷，运行两个以上视频会非常卡，高配电
 *      脑也卡到4帧，而火狐浏览器、高版本的js环境不存在该问题。
 * 贴图化：
 *   (1.相对于插件旧版本，现在你已经可以设置多层视频了，并且可以
 *      自由控制位置、大小、层级。
 *   (2.视频不支持遮罩。
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
 * 你可以通过插件指令控制菜单背景的显示情况：
 * 
 * 插件指令：>菜单视频 : 视频[3] : 显示
 * 插件指令：>菜单视频 : 视频[4] : 隐藏
 * 
 * 1.如果你想制作同一个菜单，有不同的风格，可以先配置两种不同风格的
 *   视频，然后使用显示/隐藏视频指令来进行风格切换。
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
 * 测试方法：   在菜单中开启视频背景。
 * 测试结果：   菜单界面估算平均消耗为：【265.46ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.菜单视频与菜单视频原理一样，消耗图形计算能力非常大，
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
 * 优化了内部结构。更新了pixi5的兼容情况。
 * 修复了在播放视频时，突然暂停播放的问题。
 * 
 * 
 *
 * @param ---视频组---
 * @default
 * 
 * @param 视频-1
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-2
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-3
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-4
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-5
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-6
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-7
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-8
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-9
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-10
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-11
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-12
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-13
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-14
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-15
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-16
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-17
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-18
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-19
 * @parent ---视频组---
 * @type struct<MenuVideo>
 * @desc 视频的详细配置信息。
 * @default 
 * 
 * @param 视频-20
 * @parent ---视频组---
 * @type struct<MenuVideo>
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
/*~struct~MenuVideo:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的菜单视频==
 * 
 *
 * @param 所属菜单
 * @type select
 * @option 主菜单(Scene_Menu)
 * @value 主菜单
 * @option 道具(Scene_Item)
 * @value 道具
 * @option 技能(Scene_Skill)
 * @value 技能
 * @option 装备(Scene_Equip)
 * @value 装备
 * @option 状态(Scene_Status)
 * @value 状态
 * @option 选项(Scene_Options)
 * @value 选项
 * @option 载入(Scene_Load)
 * @value 载入
 * @option 保存(Scene_Save)
 * @value 保存
 * @option 游戏结束(Scene_GameEnd)
 * @value 游戏结束
 * @option 商店(Scene_Shop)
 * @value 商店
 * @option 输入名称(Scene_Name)
 * @value 输入名称
 * @option 测试查值(Scene_Debug)
 * @value 测试查值
 * @option 自定义(Scene_……)
 * @value 自定义
 * @desc 填入所属的标准菜单。如果为插件的特殊关键字，那么要填写自定义关键字。具体去看看 "17.主菜单 > 菜单关键字.docx"。
 * @default 主菜单
 * 
 * @param 自定义关键字
 * @parent 所属菜单
 * @desc 设置所属菜单为自定义时，将根据此关键字找到对应的菜单。具体去看看 "17.主菜单 > 菜单关键字.docx"。
 * @default 
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
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
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
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
//		插件简称		MVi（Menu_Video）
//		临时全局变量	DrillUp.g_MVi_xxx
//		临时局部变量	this._drill_MVi_xxx
//		存储数据变量	$gameSystem._drill_MVi_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)+o(视频图像处理) 每帧
//		★性能测试因素	菜单界面开启视频
//		★性能测试消耗	265.46ms 从图像函数里面找到的值
//		★最坏情况		开视频就是最坏情况。
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			视频动画背景：
//				->显示隐藏
//				->播放视频
//				->视频贴图
// 
//		★私有类如下：
//			* Drill_MVi_VideoSprite【视频贴图】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.注意 addEventListener 的函数要 bind(this)。
//
//		★其它说明细节：
//			1.视频实际上是通过texture对sprite进行视频播放控制的。
//			  【但是视频不支持遮罩】
//
//		★存在的问题：
//			暂无
//			  
//			

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuVideo = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MenuVideo');

	//==============================
	// * 变量获取 - 视频
	//				（~struct~MenuVideo）
	//==============================
	DrillUp.drill_MVi_videoInit = function( dataFrom ) {
		var data = {};
		data['menu'] = String( dataFrom["所属菜单"] || "");
		data['menu_key'] = String( dataFrom["自定义关键字"] || "");
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src'] = String( dataFrom["资源-视频动画"] || "");
		//data['src_mask'] = String( dataFrom["资源-视频遮罩"] || "");
		data['playSound'] = String( dataFrom["是否播放声音"] || "false") == "true"; 
		data['volume'] = Number( dataFrom["音量比"] || 1.00);
		data['loopEnable'] = String( dataFrom["是否循环播放"] || "false") == "true";
		data['loopStart'] = Number( dataFrom["起始时间"] || 0);
		data['loopEnd'] = Number( dataFrom["结束时间"] || 0);
		data['loopEndLock'] = String( dataFrom["是否指定结束时间"] || "false") == "true";
		data['playbackRate'] = Number( dataFrom["视频播放速度"] || 1.0);
		
		data['widthUseOrg'] = String( dataFrom["是否使用原视频宽度"] || "false") == "true";
		data['heightUseOrg'] = String( dataFrom["是否使用原视频高度"] || "false") == "true";
		data['width'] = Number( dataFrom["指定视频宽度"] || 0);
		data['height'] = Number( dataFrom["指定视频高度"] || 0);
		data['x'] = Number( dataFrom["平移-视频 X"] || 0);
		data['y'] = Number( dataFrom["平移-视频 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['menu_index'] = String( dataFrom["菜单层级"] || "菜单后面层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		data['tint'] = String( dataFrom["视频色调"] || "#ffffff");
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_MVi_DEBUG = String(DrillUp.parameters['是否开启Debug模式'] || "true") === "true";
	
	/*-----------------视频------------------*/
	DrillUp.g_MVi_list_length = 20;
	DrillUp.g_MVi_list = [];
	for (var i = 0; i < DrillUp.g_MVi_list_length; i++) {
		if( DrillUp.parameters["视频-" + String(i+1) ] != undefined &&
			DrillUp.parameters["视频-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["视频-" + String(i+1) ]);
			DrillUp.g_MVi_list[i] = DrillUp.drill_MVi_videoInit( temp );
		}else{
			DrillUp.g_MVi_list[i] = null;		//（强制设为空值，节约存储资源）
		}
	}
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MVi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MVi_pluginCommand.call(this, command, args);
	if( command === ">菜单视频" ){
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var b_id = -1;
			temp1 = temp1.replace("视频[","");
			temp1 = temp1.replace("]","");
			b_id = Number(temp1) - 1;
			
			if( b_id >= 0 && type === "显示" ){
				$gameSystem._drill_MVi_sprites_visible[b_id] = true;
			}
			if( b_id >= 0 && type === "隐藏" ){
				$gameSystem._drill_MVi_sprites_visible[b_id] = false;
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
DrillUp.g_MVi_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MVi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MVi_sys_initialize.call(this);
	this.drill_MVi_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MVi_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MVi_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MVi_saveEnabled == true ){	
		$gameSystem.drill_MVi_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MVi_initSysData();
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
Game_System.prototype.drill_MVi_initSysData = function() {
	this.drill_MVi_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MVi_checkSysData = function() {
	this.drill_MVi_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MVi_initSysData_Private = function() {
	
	this._drill_MVi_sprites_visible = [];
	for(var i = 0; i < DrillUp.g_MVi_list.length ;i++){
		var temp_data = DrillUp.g_MVi_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_MVi_sprites_visible[i] = temp_data['visible'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MVi_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MVi_sprites_visible == undefined ){
		this.drill_MVi_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_MVi_list.length; i++ ){
		var temp_data = DrillUp.g_MVi_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_MVi_sprites_visible[i] == undefined ){
				this._drill_MVi_sprites_visible[i] = temp_data['visible'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//=============================================================================
// * 临时变量初始化
//=============================================================================
var _drill_MVi_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_MVi_temp_initialize.call(this);
	this._drill_MVi_sprites = [];
}


//#############################################################################
// ** 【标准模块】菜单层级
//#############################################################################
//##############################
// * 菜单层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，菜单后面层/菜单前面层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_MenuBase.prototype.drill_MVi_layerAddSprite = function( sprite, layer_index ){
    this.drill_MVi_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 菜单层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_MenuBase.prototype.drill_MVi_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 菜单层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_MenuBase.prototype.drill_MVi_sortByZIndex = function () {
    this.drill_MVi_sortByZIndex_Private();
}
//=============================================================================
// ** 菜单层级（接口实现）
//=============================================================================
//==============================
// * 菜单层级 - 最顶层
//==============================
var _drill_MVi_menuLayer_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MVi_menuLayer_update.call(this);
	
	if(!this._backgroundSprite ){		//菜单后面层（防止覆写报错）
		this._backgroundSprite = new Sprite();
	}
	if(!this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);	
	}
}
//==============================
// * 菜单层级 - 图片层级排序（私有）
//==============================
Scene_MenuBase.prototype.drill_MVi_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单层级 - 添加贴图到层级（私有）
//==============================
Scene_MenuBase.prototype.drill_MVi_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "菜单后面层" || layer_index === 0 ){
		this._backgroundSprite.addChild( sprite );
	}
	if( layer_index == "菜单前面层" || layer_index === 1 ){
		this._foregroundSprite.addChild( sprite );
	}
};

//=============================================================================
// ** 菜单
//=============================================================================
//==============================
// ** 菜单 - 创建背景
//==============================
var _drill_MVi_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	
	// > 背景初始化
	SceneManager._drill_MVi_created = false;	
   	this._drill_MVi_sprites = [];
   	this._drill_MVi_sprites_data = [];	//注意，该数组与DrillUp.g_MVi_list数组的下标不同步，要使用data
	
	_drill_MVi_createBackground.call(this);
};
//==============================
// ** 菜单 - 退出界面
//==============================
var _drill_MVi_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_MVi_terminate.call(this);			//设置需要下次重新创建
	SceneManager._drill_MVi_created = false;
	for(var i=0; i < $gameTemp._drill_MVi_sprites.length; i++){
		var sprite = $gameTemp._drill_MVi_sprites[i];
		sprite.drill_MVi_destroy();
	}
	$gameTemp._drill_MVi_sprites = [];
};
//==============================
// * 菜单 - 帧刷新
//==============================
var _drill_MVi_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MVi_update.call(this);
	
	if( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_MVi_created ) {
		this.drill_MVi_create();				//创建，进入界面后只执行一次
	}
	if( SceneManager._drill_MVi_created ){
		this.drill_MVi_update();
	};
};

//=============================================================================
// ** 视频
//=============================================================================
//==============================
// ** 创建视频
//==============================
var _drill_MVi_createDisplayObjects = Scene_MenuBase.prototype.createDisplayObjects;
Scene_MenuBase.prototype.createDisplayObjects = function() {
    _drill_MVi_createDisplayObjects.call(this);
	this.drill_MVi_create();
}
Scene_MenuBase.prototype.drill_MVi_create = function() {    
	SceneManager._drill_MVi_created = true;
	
	if(!this._drill_MVi_sprites){
		this._drill_MVi_sprites = [];	//防止某些覆写的菜单报错
		this._drill_MVi_sprites_data = [];
		$gameTemp._drill_MVi_sprites = [];
	}
	
	// > 创建贴图
	for (var i = 0; i < DrillUp.g_MVi_list.length; i++) {
		var temp_data = DrillUp.g_MVi_list[i];
		if( temp_data == undefined ){ continue; }
		if( $gameSystem._drill_MVi_sprites_visible[i] != true ){ continue; }
		
		if( this.drill_MVi_checkKeyword( temp_data ) ){
		
			// > 视频贴图
			var temp_suffix = Game_Interpreter.prototype.videoFileExt();	//组合路径
			var temp_path = 'movies/'+ temp_data['src'] + temp_suffix;
			if( DrillUp.g_MVi_DEBUG ){ console.log('菜单视频-读取材质:', temp_path); }
			
			var data = {
				"path": temp_path,
				"muted": !temp_data['playSound'],
				"volume": temp_data['volume'],
				"loopEnable": temp_data['loopEnable'],
				"loopStart": temp_data['loopStart'],
				"loopEnd": temp_data['loopEnd'],
				"loopEndUseOrg": !temp_data['loopEndLock'],
				"playbackRate": temp_data['playbackRate'],
				"showDebug": DrillUp.g_MVi_DEBUG,
				
				"widthUseOrg":temp_data['widthUseOrg'],
				"heightUseOrg":temp_data['heightUseOrg'],
				"width":temp_data['width'],
				"height":temp_data['height'],
				"x":temp_data['x'],
				"y":temp_data['y'],
				"opacity":temp_data['opacity'],
				"blendMode":temp_data['blendMode'],
				"zIndex":temp_data['zIndex'],
				"tint":temp_data['tint'],
				//"src_mask":temp_data['src_mask'],
				//"src_maskFile":"img/Battle__layer/",
			}
			var temp_sprite = new Drill_MVi_VideoSprite( data );
			this._drill_MVi_sprites.push(temp_sprite);
			this._drill_MVi_sprites_data.push(data);
			$gameTemp._drill_MVi_sprites.push(temp_sprite);
			
			this.drill_MVi_layerAddSprite( temp_layer, temp_data['menu_index'] );
		}
	}

	// > 层级排序
	this.drill_MVi_sortByZIndex();
};
//==============================
// * 视频 - 检查位置
//==============================
Scene_MenuBase.prototype.drill_MVi_checkKeyword = function( temp_sprite_data ){
	
	/*---------------标准----------------*/
	if( SceneManager._scene.constructor.name === "Scene_Menu" && temp_sprite_data['menu'] == "主菜单" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Item" && temp_sprite_data['menu'] == "道具" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Skill" && temp_sprite_data['menu'] == "技能" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Equip" && temp_sprite_data['menu'] == "装备" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Status" && temp_sprite_data['menu'] == "状态" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Options" && temp_sprite_data['menu'] == "选项" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Load" && temp_sprite_data['menu'] == "载入" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Save" && temp_sprite_data['menu'] == "保存" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_GameEnd" && temp_sprite_data['menu'] == "游戏结束" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Shop" && temp_sprite_data['menu'] == "商店" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Name" && temp_sprite_data['menu'] == "输入名称" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Debug" && temp_sprite_data['menu'] == "测试查值" ){
		return true;
	/*---------------旧选项----------------*/
	}else if( (SceneManager._scene.constructor.name === "Scene_Party" || SceneManager._scene.constructor.name === "Scene_Drill_SMa_Formation") && temp_sprite_data['menu'] == "队形"  ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_EnemyBook" && temp_sprite_data['menu'] == "敌人图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_ItemBook" && temp_sprite_data['menu'] == "物品图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Picture_Gallery" && temp_sprite_data['menu'] == "画廊" ){
		return true;
	}else{
		/*---------------自定义----------------*/
		if( SceneManager._scene.constructor.name === temp_sprite_data['menu_key'] ){
			return true;
		}
	}
	return false;
};

//==============================
// * 视频 - 帧刷新
//==============================
Scene_MenuBase.prototype.drill_MVi_update = function() {
	//暂无
};

//==============================
// ** 特殊 - 控制音量比例
//==============================
var _drill_MVi_setMasterVolume = WebAudio.setMasterVolume;
WebAudio.setMasterVolume = function(value) {
	for( var i = 0; i < $gameTemp._drill_MVi_sprites.length; i++) {
		var sprite = $gameTemp._drill_MVi_sprites[i];
		if( sprite ){
			sprite._drill_src.volume = sprite._drill_data['volume'] * value;
			if( sprite._drill_data['showDebug'] ){ console.log('菜单视频-设置音量: ', value); }
		}
	}
	return _drill_MVi_setMasterVolume(value);
}


//=============================================================================
// ** 视频贴图
//			
// 			代码：	> 范围 - 仅用于单图层播放视频。
//					> 结构 - [ ●合并 /分离/混乱] 贴图与数据合并。只有visible被控制。
//					> 数量 - [单个/ ●多个 ]
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [ ●不可修改 /自变化/外部变化] 样式设置后固定，不可修改。
//=============================================================================
//==============================
// * 视频贴图 - 定义
//==============================
function Drill_MVi_VideoSprite() {
	this.initialize.apply(this, arguments);
}
Drill_MVi_VideoSprite.prototype = Object.create(Sprite.prototype);
Drill_MVi_VideoSprite.prototype.constructor = Drill_MVi_VideoSprite;
//==============================
// * 视频贴图 - 初始化
//==============================
Drill_MVi_VideoSprite.prototype.initialize = function( data ) {
	Sprite.prototype.initialize.call(this);
	
	// >初始化
	if( data == undefined ){ data = {}; };
	if( data['path'] == undefined ){ data['path'] = "" };						//路径
	if( data['muted'] == undefined ){ data['muted'] = true };					//是否静音
	if( data['volume'] == undefined ){ data['volume'] = 1.00 };					//音量
	if( data['loopEnable'] == undefined ){ data['loopEnable'] = true };			//是否循环
	if( data['loopStart'] == undefined ){ data['loopStart'] = 0 };				//起始位置
	if( data['loopEnd'] == undefined ){ data['loopEnd'] = 0 };					//终止位置
	if( data['loopEndUseOrg'] == undefined ){ data['loopEndUseOrg'] = true };	//使用原视频终止位置
	if( data['playbackRate'] == undefined ){ data['playbackRate'] = 1.0 };		//播放速度
	if( data['showDebug'] == undefined ){ data['showDebug'] = false };			//输出dubug
	
	if( data['widthUseOrg'] == undefined ){ data['widthUseOrg'] = true };		//使用原视频宽度
	if( data['heightUseOrg'] == undefined ){ data['heightUseOrg'] = true };		//使用原视频高度
	if( data['width'] == undefined ){ data['width'] = 0 };						//指定宽度
	if( data['height'] == undefined ){ data['height'] = 0 };					//指定高度
	if( data['x'] == undefined ){ data['x'] = 0 };								//位置x
	if( data['y'] == undefined ){ data['y'] = 0 };								//位置y
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };				//透明度
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };				//混合模式
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };					//图片层级
	if( data['tint'] == undefined ){ data['tint'] = "#ffffff" };				//色调
	data['tint'] = data['tint'].replace("#","0x");
	if( data['src_mask'] == undefined ){ data['src_mask'] = "" };						//遮罩
	if( data['src_maskFile'] == undefined ){ data['src_maskFile'] = "img/system/" };	//遮罩文件夹
	//alert(JSON.stringify(data));
	
	this._drill_data = data;										//数据
	var nstr = PIXI.VERSION.split(/\./);
	if( Number(nstr[0] >= 5) ){
		this._drill_texture = PIXI.Texture.from( data['path'] );				//pixi5视频贴图
		this._drill_src = this._drill_texture.baseTexture.resource.source;		//视频资源信息
	}else{
		this._drill_texture = PIXI.Texture.fromVideo( data['path'] );			//pixi4视频贴图
		this._drill_src = this._drill_texture.baseTexture.source;				//视频资源信息
	};
	this._drill_texture_loaded = false;								//视频读取状态
	this._drill_video = new PIXI.Sprite();							//视频贴图
	this._drill_video.texture = this._drill_texture;				//
	this._drill_video.anchor.x = 0.5;								//
	this._drill_video.anchor.y = 0.5;								//
	this._drill_video.tint = parseInt(data['tint']);				//
	this._drill_loopStart = 0;										//开始位置
	this._drill_loopEnd = 0;										//结束位置
	this.addChild(this._drill_video);
	
	this.drill_MVi_spriteInit();
	this.drill_MVi_videoInit();
};
//==============================
// * 视频贴图 - 帧刷新
//==============================
Drill_MVi_VideoSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	if( this._drill_texture_loaded ){
		this._drill_texture.update();
	}
};
//==============================
// * 初始化 - 贴图
//==============================
Drill_MVi_VideoSprite.prototype.drill_MVi_spriteInit = function() {
	var data = this._drill_data;
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.x = Graphics.width/2 + data['x'];
	this.y = Graphics.height/2 + data['y'];
	this.opacity = data['opacity'];
	this.blendMode = data['blendMode'];
	this.zIndex = data['zIndex'];
	
	/*if( data['src_mask'] != "" ){
		var temp_mask = new Sprite();
		temp_mask.bitmap = ImageManager.loadBitmap( data['src_maskFile'], data['src_mask'], 0, true);
		temp_mask.anchor.x = 0.5;
		temp_mask.anchor.y = 0.5;
		this.addChild(temp_mask);
		this.mask = temp_mask;
	}*/		//无法使用遮罩
}
//==============================
// * 初始化 - 视频
//==============================
Drill_MVi_VideoSprite.prototype.drill_MVi_videoInit = function() {
	var data = this._drill_data;
	
	this._drill_src['preload'] = 'auto';
	this._drill_src['autoload'] = true;
	this._drill_src['volume'] = data['volume'] * WebAudio._masterVolume;
	this._drill_src['muted'] = data['muted'];
	this._drill_src['loop'] = data['loopEnable'];
	this._drill_src['playbackRate'] = data['playbackRate'];
	this._drill_src.addEventListener('loadedmetadata', this.drill_MVi_videoLoaded.bind(this) );
	this._drill_src.addEventListener('timeupdate', this.drill_MVi_videoUpdated.bind(this) );
	this._drill_src.addEventListener('ended', this.drill_MVi_videoEnded.bind(this) );
	this._drill_src.addEventListener('error', this.drill_MVi_videoError.bind(this) );
	
}
//==============================
// * 监听 - 视频载入完成时
//==============================
Drill_MVi_VideoSprite.prototype.drill_MVi_videoLoaded = function() {
	this._drill_texture_loaded = true;
	var data = this._drill_data;
	if( data['showDebug'] ){ console.log('菜单视频-读取视频元数据:'); }
	
	// > 重设高宽
	this._drill_video.width = this._drill_src['videoWidth'];
	this._drill_video.height = this._drill_src['videoHeight'];
	if( data['widthUseOrg'] == false ) {		//根据指定高宽进行缩放
		//this._drill_video.scale.x = data['width'] / this._drill_video.width ;
		this._drill_video.width = data['width'];
	}
	if( data['heightUseOrg'] == false ) {
		//this._drill_video.scale.y = data['height'] / this._drill_video.height ;	
		this._drill_video.height = data['height'];
	}
	
	// > 重设循环时间
	if( data['loopEndUseOrg'] == true ) {
		this._drill_loopStart = data['loopStart'];
		this._drill_loopEnd = this._drill_src['duration'];
	}else{
		this._drill_loopStart = data['loopStart'];
		this._drill_loopEnd = data['loopEnd'];
	}
	if( this._drill_loopStart != 0 ){
		this._drill_src['currentTime'] = this._drill_loopStart;
	}
	
	if( data['showDebug'] ){
		console.log('设置视频循环为 %s 至 %s:', this._drill_loopStart, this._drill_loopEnd );
	}
}
//==============================
// * 监听 - 视频帧刷新
//==============================
Drill_MVi_VideoSprite.prototype.drill_MVi_videoUpdated = function() {
	if( this._drill_texture_loaded != true ){ return; }
	var data = this._drill_data;
	if( data['showDebug'] ){ console.log('视频刷新帧:', this._drill_src['currentTime']); }
	
	if( this._drill_src['currentTime'] >= this._drill_loopEnd ){
		if( data['showDebug'] ){
			console.log('菜单视频-播放回到位置:', this._drill_loopStart );
		}
		this._drill_src['currentTime'] = this._drill_loopStart;
		this._drill_src.play();
	}
}
//==============================
// * 监听 - 视频结束时
//==============================
Drill_MVi_VideoSprite.prototype.drill_MVi_videoEnded = function() {
	var data = this._drill_data;
	if( data['loopEnable'] == false ) {
		this.drill_MVi_destroy();
	}
}
//==============================
// * 监听 - 视频载入错误时
//==============================
Drill_MVi_VideoSprite.prototype.drill_MVi_videoError = function() {
	var data = this._drill_data;
	if( data['showDebug'] ){ 
		console.error('视频发生了错误:', this._drill_src.error);
	}
}
//==============================
// * 贴图 - 去除
//==============================
Drill_MVi_VideoSprite.prototype.drill_MVi_destroy = function() {
	this.visible = false;
	this._drill_src['muted'] = true;
	this._drill_src.pause();
	this._drill_src.remove();
	this._drill_texture_loaded = false;
}


