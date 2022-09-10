//=============================================================================
// Drill_TitleBootScene.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        标题 - 启动界面
 * @author Drill_up
 * 
 * @Drill_LE_param "阶段-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_TBS_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_TitleBootScene +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在游戏加载后，初始化游戏窗口设置，并播放商标logo等内容。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   作用于游戏的启动界面。
 * 2.该面板属于特殊系统面板。
 *   该面板关键字为：Scene_Boot
 * 3.更多内容可以去看看 "20.标题 > 关于全自定义标题界面.docx"。
 * 结构：
 *   (1.游戏启动的流程如下：
 *      游戏启动 -> 启动界面 -> 标题界面 -> 其他界面
 *      该插件只在启动界面添加logo等内容的显示。
 * 启动初始化：
 *   (1.启动界面可以控制软件窗口的大小，或者设置全屏。
 *   (2.注意，全屏模式在win7操作系统中不一定有效，可能会变回窗口模式。
 *      这里的窗口配置都只修改 拉伸缩放 的高宽，不控制分辨率。
 *      如果要改分辨率，需要去 系统-引擎核心 中修改屏幕高宽。
 * 视频：
 *   (1.视频动画只支持 .webm(pc端) 和 .mp4(手机端) 格式的视频。
 *   (2.部分电脑的浏览器可能存在视频禁用的情况，使得视频无法播放。
 *      如果示例的logo视频能正常播放，那就不是浏览器视频禁用的问题。
 * 阶段：
 *   (1.插件中的阶段依次播放，你可以将动画、GIF、视频都配置在启动界面中。
 *   (2.你可以通过"当前阶段至少播放时长"规定玩家必须看几秒才可跳过。
 *      比如一些不可跳过的故事介绍或者影片介绍等。
 *      注意，如果阶段B的至少时长为0，那么点击跳过键，会直接从A跳到C。
 *   (3.你可以设置 显示时长/消失时长 为0，可以瞬间切换图片。
 * 设计：
 *   (1.你可以在启动界面中放置logo、制作人的动画、简易故事开场视频。
 *      如果你想让玩家必须看某一小段，可以设置"当前阶段至少播放时长"。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles2
 * 先确保项目img文件夹下是否有titles2文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 阶段-1 资源-单图
 * 阶段-1 资源-GIF
 * 阶段-2 资源-单图
 * 阶段-2 资源-GIF
 * ……
 *
 * 相关图片素材在img/titles2 文件夹下。
 * 相关声音素材在audio/bgm 文件夹下。
 * 相关视频素材在movies 文件夹下。
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
 * 时间复杂度： o(n)*o(贴图处理)+o(视频图像处理) 每帧
 * 测试方法：   打开标题即可
 * 测试结果：   菜单界面中，图片模式/gif模式消耗：【14.46ms】
 * 测试结果2：  菜单界面中，视频模式消耗：【241.75ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.播放视频消耗图形计算能力非常大，有时候可能会出现视频花屏问题。
 * 3.视频和图片是分开的结构，播放视频会掉帧，换图片阶段后会恢复帧。
 *   另外，启动界面的视频实测结果比标题界面的要流畅的多，可能是因为
 *   启动界面只单纯播放视频，不作其它复杂计算。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了注释说明。修复了gif播放出错的bug。
 * [v1.2]
 * 修复了连续播放视频时，视频丢失的bug。
 * [v1.3]
 * 添加了图片预加载的功能，并且修复显示时间为0时，图片一闪的bug。
 * [v1.4]
 * 修复了插件播放视频后，造成插件指令中播放视频静音的bug。
 * [v1.5]
 * 修复了GIF模式在第一个阶段时不能播放的bug。
 *
 * 
 * @param ---游戏窗口---
 * @default
 * 
 * @param 游戏窗口模式
 * @parent ---游戏窗口---
 * @type select
 * @option 全屏模式
 * @value 全屏模式
 * @option 窗口模式
 * @value 窗口模式
 * @desc 注意，全屏模式在win7操作系统中不一定有效，会变回窗口模式。
 * @default 窗口模式
 *
 * @param 窗口是否最大化
 * @parent ---游戏窗口---
 * @type boolean
 * @on 最大化
 * @off 不操作
 * @desc true - 最大化，false - 不操作，游戏窗口将自动最大化。浏览器没有效果。
 * @default false
 *
 * @param 窗口是否设置初始缩放高宽
 * @parent ---游戏窗口---
 * @type boolean
 * @on 缩放
 * @off 不操作
 * @desc true - 缩放，false - 不操作，启动游戏后，自动将游戏缩放至指定高宽。
 * @default false
 *
 * @param 窗口初始缩放宽度
 * @parent ---游戏窗口---
 * @type number
 * @min 40
 * @desc 游戏窗口缩放的宽度，默认816。
 * @default 816
 *
 * @param 窗口初始缩放高度
 * @parent ---游戏窗口---
 * @type number
 * @min 40
 * @desc 游戏窗口缩放的高度，默认624。
 * @default 624
 *
 * @param 启动界面底色
 * @parent ---游戏窗口---
 * @desc 启动界面底图的颜色，填入的为颜色代码，比如#FFFFFF白、#000000黑、#98F5FF青。
 * @default #000000
 * 
 * @param ---启动界面---
 * @default
 *
 * @param 阶段-1
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-2
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-3
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-4
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-5
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-6
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-7
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-8
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-9
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-10
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-11
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-12
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-13
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-14
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-15
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-16
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-17
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-18
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-19
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 * @param 阶段-20
 * @parent ---启动界面---
 * @type struct<TitlePart>
 * @desc 启动界面的阶段设置。
 * @default 
 *
 */
/*~struct~TitlePart:
 *
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的启动阶段==
 * 
 *
 * @param 当前阶段至少播放时长
 * @type number
 * @min 0
 * @desc 该设置使得玩家必须看当前阶段内容一段时间才可跳过，单位帧。（1秒60帧）
 * @default 0
 *
 * @param 显示模式
 * @type select
 * @option 单图模式
 * @value 单图模式
 * @option GIF模式
 * @value GIF模式
 * @option 视频模式
 * @value 视频模式
 * @desc 当前阶段显示的模式。
 * @default 单图模式
 * 
 * @param ---单图模式---
 * @desc 
 *
 * @param 资源-单图
 * @parent ---单图模式---
 * @desc 单张图片的资源设置。
 * @default (需配置)启动界面-单图
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param 单图显现时长
 * @parent ---单图模式---
 * @type number
 * @min 0
 * @desc 单图显现出来的时间，单位帧。（1秒60帧）
 * @default 60
 *
 * @param 单图持续时长
 * @parent ---单图模式---
 * @type number
 * @min 0
 * @desc 单图持续显示的时间，单位帧。（1秒60帧）
 * @default 90
 *
 * @param 单图消失时长
 * @parent ---单图模式---
 * @type number
 * @min 0
 * @desc 单图显现出来的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 单图立即跳过时长
 * @parent ---单图模式---
 * @type number
 * @min 0
 * @desc 玩家点击跳过键，中断显现并跳过的过渡时长，设置0表示无过渡直接下一阶段，单位帧。（1秒60帧）
 * @default 12
 * 
 * @param ---GIF模式---
 * @desc 
 *
 * @param 资源-GIF
 * @parent ---GIF模式---
 * @desc png图片资源组，多张构成gif。
 * @default ["(需配置)启动界面-默认GIF"]
 * @require 1
 * @dir img/titles2/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---GIF模式---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---GIF模式---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param GIF到末尾是否重播
 * @parent ---GIF模式---
 * @type boolean
 * @on 重播
 * @off 不重播
 * @desc true - 重播，false - 不重播
 * @default false
 *
 * @param GIF显现时长
 * @parent ---GIF模式---
 * @type number
 * @min 0
 * @desc 单图显现出来的时间，单位帧。（1秒60帧）
 * @default 60
 *
 * @param GIF持续时长
 * @parent ---GIF模式---
 * @type number
 * @min 0
 * @desc 单图持续显示的时间，单位帧。（1秒60帧）
 * @default 90
 *
 * @param GIF消失时长
 * @parent ---GIF模式---
 * @type number
 * @min 0
 * @desc 单图显现出来的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param GIF立即跳过时长
 * @parent ---GIF模式---
 * @type number
 * @min 0
 * @desc 玩家点击跳过键，中断显现并跳过的过渡时长，设置0表示无过渡直接下一阶段，单位帧。（1秒60帧）
 * @default 12
 * 
 * @param ---视频模式---
 * @desc 
 * 
 * @param 资源-视频
 * @parent ---视频模式---
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 启动界面-视频
 *
 * @param 当前阶段BGM设置
 * @type select
 * @option 播放新的BGM
 * @value 播放新的BGM
 * @option 不操作
 * @value 不操作
 * @option 暂停之前的BGM
 * @value 暂停之前的BGM
 * @desc 当前阶段设置BGM。
 * @default 不操作
 *
 * @param 资源-BGM
 * @parent 当前阶段BGM设置
 * @desc 设置播放新的BGM时，配置的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		TBS (Title_Boot_Scene)
//		临时全局变量	DrillUp.g_TBS_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)+o(视频图像处理) 每帧
//		★性能测试因素	打开标题即可
//		★性能测试消耗	241.75ms / 4.21ms（updateVideo）
//		★最坏情况		开视频就是最坏情况。
//		★备注			视频和图片是分开的结构，播放视频会掉帧，换图片阶段后会恢复帧。
//						真要说的话，开头几秒的视频真测不出来，这里的值是估算的。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			启动界面：
//				->屏幕
//					->全屏/指定到缩放的窗口大小
//					->界面底色
//					->轮播图片/视频
//				->贴图
//					->预加载
//					->显示时间为0瞬间切换
//					->第N张图片必须播放M秒才可跳过
//				->跳过按键
//				->播放音乐
// 
//		★私有类如下：
//			* Scene_Drill_TBS【播放场景】
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.全屏问题：
//				2020/6/7： Graphics._requestFullScreen可以设置全屏，但是会一闪而过，win7不能弄，但是win10可以。
//				2020/8/11：这个问题突然消失了，在原来无法全屏的win7电脑上，竟然能够全屏了，不明原因。
//				2020/8/13：
//					有一个群友遇到了不能全屏的问题。他的电脑更新了nwjs程序。
//					上网找了一圈，发现这里的知识点一片狼藉。s有大小写的区分。
//						I	ele.requestFullscreen();
//							ele.requestFullScreen();
//						II	ele.mozRequestFullScreen();
//						III	ele.webkitRequestFullscreen(ele.ALLOW_KEYBOARD_INPUT);
//							ele.webkitRequestFullScreen(ele.ALLOW_KEYBOARD_INPUT);
//						IV	ele.msRequestFullscreen();
//						I."s"存在，"S"为undefined，而core里面写的是"S"……
//						  这里的小"s"，在群友电脑上会返回一个fullscreen error，但是无法解决。
//						  （https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen）这链接又变大"S"了，官方都那么不小心……
//						II.有效。火狐浏览器直接全屏。
//						III."s"和"S"都有效，应该是谷歌浏览器做了兼容，但是在群友电脑上仍然不能全屏。
//						IV.未涉及捕获到。
//					最后问题仍未解决，经过分析应该是nwjs的问题，nwjs的窗口阻止了浏览器全屏请求。
//			2.窗口大小：
//				1.6版本比1.5版本大一圈，实际大小为820x628的大小，这个是游戏内部引擎的问题，强制设置window窗口的大小，依然会大一圈。
//				SceneManager._screenWidth	窗口大小
//				SceneManager._boxWidth		界面大小（界面会根据窗口自适应）
//				window.resizeBy能改变窗口大小。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_TitleBootScene = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_TitleBootScene');
	
	//==============================
	// * 变量获取 - 阶段
	//				（~struct~TitlePart）
	//==============================
	DrillUp.drill_TBS_partInit = function( dataFrom ) {
		var data = {};
		data['delay'] = Number( dataFrom["当前阶段至少播放时长"] || 0);
		data['mode'] = String( dataFrom["显示模式"] || "单图模式" );
		
		// > 单图模式
		data['img_src'] = String( dataFrom["资源-单图"] || "" );
		data['img_show'] = Number( dataFrom["单图显现时长"] || 60 );
		data['img_sustain'] = Number( dataFrom["单图持续时长"] || 90 );
		data['img_hide'] = Number( dataFrom["单图消失时长"] || 30 );
		data['img_skip'] = Number( dataFrom["单图立即跳过时长"] || 12 );
		
		// > GIF模式
		if( dataFrom["资源-GIF"] != "" &&
			dataFrom["资源-GIF"] != undefined ){
			data['gif_src'] = JSON.parse( dataFrom["资源-GIF"] );
		}else{
			data['gif_src'] = [];
		}
		data['gif_interval'] = Number( dataFrom["帧间隔"] || 4);
		data['gif_back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['gif_replay'] = String( dataFrom["GIF到末尾是否重播"] || "false") == "true";
		data['gif_show'] = Number( dataFrom["GIF显现时长"] || 60);
		data['gif_sustain'] = Number( dataFrom["GIF持续时长"] || 90);
		data['gif_hide'] = Number( dataFrom["GIF消失时长"] || 30);
		data['gif_skip'] = Number( dataFrom["GIF立即跳过时长"] || 12);
		
		// > 视频模式
		data['video_src'] = String( dataFrom["资源-视频"] || "");
		data['bgm_set'] = String( dataFrom["当前阶段BGM设置"] || "不操作");
		data['bgm_src'] = String( dataFrom["资源-BGM"] || "");
		return data;
	}
	
	/*-----------------游戏窗口------------------*/
	DrillUp.g_TBS_screen_mode = String(DrillUp.parameters["游戏窗口模式"] || "窗口模式");
	DrillUp.g_TBS_screen_maximize = String(DrillUp.parameters["窗口是否最大化"] || "true") == "true";
	DrillUp.g_TBS_screen = String(DrillUp.parameters["窗口是否设置初始缩放高宽"] || "false") == "true";
	DrillUp.g_TBS_screen_width = Number(DrillUp.parameters["窗口初始缩放宽度"] || 816);
	DrillUp.g_TBS_screen_height = Number(DrillUp.parameters["窗口初始缩放高度"] || 624);
	DrillUp.g_TBS_screen_back_color = String(DrillUp.parameters["启动界面底色"] || "#000000");
	
	/*-----------------阶段------------------*/
	DrillUp.g_TBS_list_length = 20;
	DrillUp.g_TBS_list = [];
	for (var i = 0; i < DrillUp.g_TBS_list_length; i++) {
		if( DrillUp.parameters['阶段-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['阶段-' + String(i+1) ]);
			DrillUp.g_TBS_list[i] = DrillUp.drill_TBS_partInit( temp );
		}else{
			DrillUp.g_TBS_list[i] = null;
		}
	}
	DrillUp.g_TBS_list[ DrillUp.g_TBS_list_length ] = null;		//跳出界面的收尾设置
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( typeof(Liquidize) != "undefined" && typeof(Liquidize.MadeWithMV) != "undefined" && typeof(Liquidize.MadeWithMV.ShowMV) != "undefined" ){
	alert(
		"【Drill_TitleBootScene.js 标题-启动界面】\n" +
		"检测到 MadeWithMv.js 插件，请将该插件关闭。\n该插件的功能就是在启动界面显示图像，但是由于插件修改了内部结构，使得启动界面插件无法运行。"
	);
}


//=============================================================================
// ** bug修复（乱按键一定会重播视频的bug）
//=============================================================================	
var _drill_TBS_Graphics_initialize = Graphics.initialize;
Graphics.initialize = function( width, height, type ){
	_drill_TBS_Graphics_initialize.call( this, width, height, type );
    this._videoUnlocked = true;
}


//=============================================================================
// ** 启动
//=============================================================================
//==============================
// * 启动界面绑定
//==============================
var _drill_TBS_boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	
	// > 全屏模式
	if ( DrillUp.g_TBS_screen_mode === "全屏模式" ) {
		Graphics._requestFullScreen();
		
	// > 窗口模式
	}else if( DrillUp.g_TBS_screen_mode === "窗口模式" ){
		
		// > 窗口最大化
		if( DrillUp.g_TBS_screen_maximize ){
			if( Utils.isNwjs() ){		//（nwjs情况）
				var gui = require('nw.gui'); 
				var win = gui.Window.get(); 
				win.maximize();
			}
			// ...

		}else{
			// > 设置指定大小
			if( DrillUp.g_TBS_screen ){
				if( Imported.YEP_CoreEngine ){		//yep核心控制
					var w = DrillUp.g_TBS_screen_width - Yanfly.Param.ScreenWidth ;
					var h = DrillUp.g_TBS_screen_height - Yanfly.Param.ScreenHeight ;
					window.resizeBy( w , h );
					window.moveBy( -1*w/2 , -1*h/2 );
				}else{
					var w = DrillUp.g_TBS_screen_width - SceneManager._screenWidth ;
					var h = DrillUp.g_TBS_screen_height - SceneManager._screenHeight ;
					window.resizeBy( w , h );
					window.moveBy( -1*w/2 , -1*h/2 );
				}	
			}
		}
	}
	
	// > 启动界面标记
	DataManager._drill_TBS_in_boot = true;
	_drill_TBS_boot_start.call(this);
};
//==============================
// * 拦截场景转换（跳转到Scene_Drill_TBS启动界面）
//==============================
var _drill_TBS_boot_goto = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
	if( DataManager._drill_TBS_in_boot === true && sceneClass == Scene_Title ){
		DataManager._drill_TBS_in_boot = false;
		
		this._nextScene = new Scene_Drill_TBS();
		if (this._scene) { this._scene.stop(); }
		
		return ;
	}
	_drill_TBS_boot_goto.call(this, sceneClass);
}
	
	

//=============================================================================
// ** logo场景
//=============================================================================
//==============================
// * 场景-定义
//==============================
function Scene_Drill_TBS() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_TBS.prototype = Object.create(Scene_Base.prototype);
Scene_Drill_TBS.prototype.constructor = Scene_Drill_TBS;

//==============================
// * 场景 - 初始化
//==============================
Scene_Drill_TBS.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	this._drill_dataList = DrillUp.g_TBS_list;		//阶段数据列表
	
	// > 私有变量初始化
	this._drill_level = 0;							//当前阶段
	this._drill_level_time = 0;						//阶段持续时长
	this._drill_need_recreate = true;				//下一阶段重建
	this._drill_TBS_picEnd = false;					//阶段结束 - 单图模式
	this._drill_TBS_gifEnd = false;					//阶段结束 - GIF模式
	this._drill_TBS_videoEnd = false;				//阶段结束 - 视频模式
	
	// > 对象初始化
	this._drill_main_sprite = null;
	this._drill_pic_sprite = new Sprite();
	this._drill_gif_sprite = new Sprite();
	this._drill_bitmapTank = [];					//预加载 - bitmap容器
	
	// > 初始化函数
	this.drill_preloadBitmap();						//预加载
}
//==============================
// * 场景 - 创建
//==============================
Scene_Drill_TBS.prototype.create = function() {	
    Scene_Base.prototype.create.call(this);
	this.drill_createLayer();	
};
Scene_Drill_TBS.prototype.drill_createLayer = function() {
	// > 主层
	var temp_sprite = new Sprite();
    temp_sprite.anchor.x = 0.5;
    temp_sprite.anchor.y = 0.5;
	temp_sprite.x = Graphics.boxWidth / 2;
	temp_sprite.y = Graphics.boxHeight / 2;
	this.addChild(temp_sprite);
	this._drill_main_sprite = temp_sprite;
	// > 主层背景色
	temp_sprite.bitmap = new Bitmap(Graphics.boxWidth,Graphics.boxHeight);
	temp_sprite.bitmap.fillAll( DrillUp.g_TBS_screen_back_color );
}
//==============================
// * 场景 - 帧刷新
//==============================
Scene_Drill_TBS.prototype.update = function() {
	Scene_Base.prototype.update.call(this);
	
	if( this.drill_isAllBitmapReady() != true ){ return; }	//加载bitmap阻塞
	this.drill_updateLevel();			//阶段控制
	this.drill_updatePic();				//播放单图
	this.drill_updateGIF();				//播放GIF
	this.drill_updateVideo();			//播放视频
};

//==============================
// * 预加载
//==============================
Scene_Drill_TBS.prototype.drill_preloadBitmap = function() {
	
	this._drill_bitmapTank = [];
	for( var i=0; i < this._drill_dataList.length; i++ ){
		var temp_data = this._drill_dataList[i];
		if( temp_data == undefined ){
			
			// > 空数据情况
			this._drill_bitmapTank[i] = {};
			
		}else{
			// > bitmap加载
			var obj = {};
			if( temp_data['mode'] == "单图模式" ){
				obj['img_bitmap'] = ImageManager.loadTitle2(temp_data['img_src']);
			}
			if( temp_data['mode'] == "GIF模式" ){
				obj['gif_bitmaps'] = [];
				for(var j = 0; j < temp_data['gif_src'].length ; j++){
					obj['gif_bitmaps'].push( ImageManager.loadTitle2(temp_data['gif_src'][j]) );
				}
			}
			if( temp_data['mode'] == "视频模式" ){
				// （无bitmap）
			}
			this._drill_bitmapTank[i] = obj;
		}
	}
}
//==============================
// * 预加载判断
//==============================
Scene_Drill_TBS.prototype.drill_isAllBitmapReady = function() {
	for(var i=0; i < this._drill_bitmapTank.length; i++ ){
		var obj = this._drill_bitmapTank[i];
		// > 单图模式的加载
		if( obj['img_bitmap'] != undefined && obj['img_bitmap'].isReady() == false ){
			return false;
		}
		// > gif模式的加载
		if( obj['gif_bitmaps'] != undefined ){
			for(var j = 0; j < obj['gif_bitmaps'].length ; j++){
				if( obj['gif_bitmaps'][j].isReady() == false ){
					return false;
				}
			}	//（这里的判断比较松散，如果未添加bitmap，则不返回false，默认返回true）
		}
	}
	return true;
}
//==============================
// * 帧刷新 - 阶段控制
//==============================
Scene_Drill_TBS.prototype.drill_updateLevel = function() {
	this._drill_level_time += 1;
	
	// > 进入下一阶段
	if( this.drill_isLevelFinished() ){
		this._drill_level += 1;
		this._drill_level_time = 0;
		this._drill_TBS_picEnd = false;
		this._drill_TBS_gifEnd = false;
		this._drill_TBS_videoEnd = false;
		this._drill_need_recreate = true;
	}
	
	// > 跳出界面
	if( this._drill_level >= this._drill_dataList.length -1 ){
		if( Graphics.isVideoPlaying() == true ){
			Graphics._video.pause();		//暂停播放
		}
		SceneManager.goto(Scene_Title);
		return ;
	}
	
	// > 下一阶段重建
	if( this._drill_need_recreate == true){
		this._drill_need_recreate = false;
		this.drill_createPic();
		this.drill_createGIF();
		this.drill_createVideo();
		this.drill_createMusic();
	}
}
//==============================
// * 帧刷新 - 阶段结束
//==============================
Scene_Drill_TBS.prototype.drill_isLevelFinished = function() {
	var temp_data = this._drill_dataList[this._drill_level];
	if( temp_data == undefined ){ return true; }
	if( temp_data['mode'] == "单图模式" ){
		return this._drill_TBS_picEnd;
	}
	if( temp_data['mode'] == "GIF模式" ){
		return this._drill_TBS_gifEnd;
	}
	if( temp_data['mode'] == "视频模式" ){
		return this._drill_TBS_videoEnd;
	}
	return true;
}
//==============================
// * 帧刷新 - 建立单图
//==============================
Scene_Drill_TBS.prototype.drill_createPic = function() {
	var temp_data = this._drill_dataList[this._drill_level];
	if( temp_data == undefined ){ return }
	if( temp_data['mode'] !== "单图模式" ){ return }
	
	var temp_sprite = this._drill_pic_sprite;
	temp_sprite.bitmap = this._drill_bitmapTank[ this._drill_level ]['img_bitmap'];
    temp_sprite.anchor.x = 0.5;
    temp_sprite.anchor.y = 0.5;
	temp_sprite.opacity = 1;
	
	if( temp_data['img_show'] == 0 ){ temp_sprite.opacity = 255; }
	this._drill_main_sprite.addChild(temp_sprite);
	this._drill_pic_sprite = temp_sprite;
	this._drill_gif_sprite.opacity = 1;
}
//==============================
// * 帧刷新 - 播放单图
//==============================
Scene_Drill_TBS.prototype.drill_updatePic = function() {
	var temp_data = this._drill_dataList[this._drill_level];
	if( temp_data == undefined ){ return }
	if( temp_data['mode'] !== "单图模式" ){ return }
	
	// > 按键跳过
	if( this._drill_level_time >= temp_data.delay ){
		if( Input.isTriggered("ok") || TouchInput.isTriggered() ){
			this._drill_TBS_picPrepareEnd = true;	//点击后，淡出时间15帧
		}
	}
	
	// > 淡入淡出
	var temp_sprite = this._drill_pic_sprite;
	if( this._drill_TBS_picPrepareEnd ){
		if( temp_data['img_skip'] == 0 ){ 
			temp_sprite.opacity = 0; 
		}else{
			temp_sprite.opacity -= 255/temp_data['img_skip'];
		}
	}else{
		if( this._drill_level_time <= temp_data['img_show'] ){
			temp_sprite.opacity += 255/temp_data['img_show'];
		}
		if( this._drill_level_time >= (temp_data['img_show'] + temp_data['img_sustain'] ) 
			&& temp_data['img_hide'] != 0 ){		//消失时间为0时，直接不控制透明度（下一阶段会控制）
			temp_sprite.opacity -= 255/temp_data['img_hide'];
		}
	}
	if( this._drill_level_time >= temp_data['img_show']+temp_data['img_sustain']+temp_data['img_hide'] ){
		this._drill_TBS_picEnd = true;
	}else if( this._drill_TBS_picPrepareEnd && temp_sprite.opacity <= 0 ){
		this._drill_TBS_picEnd = true;
	}
}
//==============================
// * 帧刷新 - 建立GIF
//==============================
Scene_Drill_TBS.prototype.drill_createGIF = function() {
	var temp_data = this._drill_dataList[this._drill_level];
	if( temp_data == undefined ){ return }
	if( temp_data['mode'] !== "GIF模式" ){ return }
	
	var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));	
	var temp_sprite = this._drill_gif_sprite;
	temp_sprite.bitmap = this._drill_bitmapTank[ this._drill_level ]['gif_bitmaps'][0];
    temp_sprite.anchor.x = 0.5;
    temp_sprite.anchor.y = 0.5;
	temp_sprite.opacity = 1;
	temp_sprite['gif_bitmaps'] = this._drill_bitmapTank[ this._drill_level ]['gif_bitmaps'];
	
	if( temp_data['img_show'] == 0 ){ temp_sprite.opacity = 255; }
	this._drill_main_sprite.addChild(temp_sprite);
	this._drill_gif_sprite = temp_sprite;
	this._drill_gif_sprite_data = temp_sprite_data;
	this._drill_pic_sprite.opacity = 1;
}
//==============================
// * 帧刷新 - 播放GIF
//==============================
Scene_Drill_TBS.prototype.drill_updateGIF = function() {
	var temp_data = this._drill_dataList[this._drill_level];
	if( temp_data == undefined ){ return }
	if( temp_data['mode'] !== "GIF模式" ){ return }
	
	// > 按键跳过
	if( this._drill_level_time >= temp_data.delay ){
		if( Input.isTriggered("ok") || TouchInput.isTriggered() ){
			this._drill_TBS_gifPrepareEnd = true;	//点击后，淡出时间15帧
		}
	}
	
	// > 淡入淡出
	var temp_sprite = this._drill_gif_sprite;
	var temp_sprite_data = this._drill_gif_sprite_data;
	if( this._drill_TBS_gifPrepareEnd ){
		if( temp_data['gif_skip'] == 0 ){ 
			temp_sprite.opacity = 0; 
		}else{
			temp_sprite.opacity -= 255/temp_data['gif_skip'];
		}
	}else{
		if( this._drill_level_time <= temp_sprite_data['gif_show'] ){
			temp_sprite.opacity += 255/temp_sprite_data['gif_show'];
		}
		if( this._drill_level_time >= (temp_sprite_data['gif_show'] + temp_sprite_data['gif_sustain'] ) 
			&& temp_data['img_hide'] != 0 ){		//消失时间为0时，直接不控制透明度（下一阶段会控制）
			temp_sprite.opacity -= 255/temp_sprite_data['gif_hide'];
		}
	}
	if( this._drill_level_time >= temp_data['img_show']+temp_data['img_sustain']+temp_data['img_hide'] ){
		this._drill_TBS_gifEnd = true;
	}else if( this._drill_TBS_gifPrepareEnd && temp_sprite.opacity <= 0 ){
		this._drill_TBS_gifEnd = true;
	}
	
	// > GIF播放
	var inter = this._drill_level_time ;
	inter = inter / temp_sprite_data['gif_interval'];
	if( inter >= temp_sprite['gif_bitmaps'].length &&
		temp_sprite_data['gif_replay'] == false ){
		inter = temp_sprite['gif_bitmaps'].length - 1;			//不重播
	}else{
		inter = inter % temp_sprite['gif_bitmaps'].length;		//重播
	}
	if( temp_sprite_data['gif_back_run'] ){
		inter = temp_sprite['gif_bitmaps'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	temp_sprite.bitmap = temp_sprite['gif_bitmaps'][inter];
	
}
//==============================
// * 帧刷新 - 建立视频
//==============================
Scene_Drill_TBS.prototype.drill_createVideo = function() {
	var temp_data = this._drill_dataList[this._drill_level];
	if( temp_data == undefined ){ return }
	if( temp_data['mode'] !== "视频模式" ){ return }
	
	var ext = this.videoFileExt();
	Graphics.playVideo('movies/' + temp_data.video_src + ext);
}
//==============================
// * 帧刷新 - 播放视频
//==============================
Scene_Drill_TBS.prototype.drill_updateVideo = function() {
	var temp_data = this._drill_dataList[this._drill_level];
	if( temp_data == undefined ){ return }
	if( temp_data['mode'] !== "视频模式" ){ return }
	
	// > 按键跳过
	if( this._drill_level_time >= temp_data.delay ){
		if( Input.isTriggered("ok") || TouchInput.isTriggered() ){
			Graphics._video.pause();
			Graphics._onVideoEnd();
			//Graphics._video.remove();		//remove会使得视频资源丢失却保留声音
			
			this._drill_TBS_videoEnd = true;
		}
	}
	
	// > 播放结束
	if( Graphics.isVideoPlaying() ){
		
		
	}else{
		Graphics._video.pause();
		Graphics._onVideoEnd();
		//Graphics._video.remove();
		
		this._drill_TBS_videoEnd = true;
	}
}
//==============================
// * 影片后缀
//==============================
Scene_Drill_TBS.prototype.videoFileExt = function() {
    if (Graphics.canPlayVideoType('video/webm') && !Utils.isMobileDevice()) {
        return '.webm';
    } else {
        return '.mp4';
    }
};

//==============================
// ** 帧刷新 - 建立背景音乐
//==============================
Scene_Drill_TBS.prototype.drill_createMusic = function() {
	var temp_data = this._drill_dataList[this._drill_level];
	if( temp_data == undefined ){ return }
	if( temp_data['bgm_set'] === "不操作" ){ return }
	if( temp_data['bgm_set'] === "暂停之前的BGM" ){ 
		AudioManager.stopBgm();
		return;
	}
	if( temp_data['bgm_set'] === "播放新的BGM" ){
		var bgm = {};
		bgm.name = temp_data['bgm_src'];
		bgm.pitch = 100;
		bgm.volume = 100;
		AudioManager.playBgm(bgm);
	}
};

