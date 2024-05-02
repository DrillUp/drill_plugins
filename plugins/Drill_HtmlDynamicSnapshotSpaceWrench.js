//=============================================================================
// Drill_HtmlDynamicSnapshotSpaceWrench.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        游戏窗体 - 动态快照次元斩
 * @author Drill_up
 * 
 * @Drill_LE_param "次元斩样式-%d"
 * @Drill_LE_parentKey "---次元斩样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_HDSSW_style_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_HtmlDynamicSnapshotSpaceWrench +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令快速实现次元斩效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 基于：
 *   - Drill_CoreOfDynamicSnapshot    游戏窗体-动态快照核心
 *   - Drill_CoreOfBallistics         系统-弹道核心★★v2.2及以上★★
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于渲染器。
 * 2.更多详细内容，去看看文档 "1.系统 > 大家族-屏幕快照.docx"。
 * 细节：
 *   (1.天窗层是在整个游戏画面之上的特殊层级，比最顶层还高，
 *      只有天窗层才能使用动态快照效果。
 *   (2.游戏中所有的画面都会被动态快照实时播放，
 *      但不包括天窗层的贴图，以及动态快照自己。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 设计：
 *   (1.该插件省去了一个个动态快照配遮罩的麻烦，通过插件指令快速创建
 *      次元斩切割一刀所对应的贴图，多次执行还能反复切割画面。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__layer （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 次元斩样式-1 资源-切割白背景
 * 次元斩样式-1 资源-切割白闪烁
 * 次元斩样式-1 资源-刀光
 * 次元斩样式-2 资源-切割白背景
 * 次元斩样式-2 资源-切割白闪烁
 * 次元斩样式-2 资源-刀光
 * ……
 *
 * 动态快照本身不需要资源，遮罩资源放在Special__layer文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令手动修改天窗层动态快照的各个属性：
 * 
 * 插件指令：>动态快照次元斩 : 执行切割 : 样式[1] : 线段[100,100,200,200]
 * 插件指令：>动态快照次元斩 : 执行切割 : 样式[1] : 线段变量[21,22,23,24]
 * 插件指令：>动态快照次元斩 : 执行切割 : 样式[1] : 随机线段
 * 插件指令：>动态快照次元斩 : 立即清除全部碎片
 * 
 * 1."线段"的四个参数分别指 x1,y1 和 x2,y2 两个点组成的线段，
 *   插件会将此线段进行数学换算，变成一条按照线段方向切过去的次元斩。
 *   x1,y1 为起点，x2,y2 为终点。
 * 2."线段变量[21,22,23,24]"是指线段的 x1为 变量21的值，y1为 变量22的值，
 *    x2为 变量23的值，y2为 变量24的值。
 * 3.注意，根据实际测试，切割超过16个以上(5刀左右)的碎片，会变得非常卡顿。
 *   建议设计时，使用固定线段进行切割，并尽可能减少交叉切割造成大量碎片。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法1：  在地图中放置多个动态快照，进行性能测试。
 * 测试结果1：  200个事件的地图中，平均消耗为：【95.61ms】
 *              100个事件的地图中，平均消耗为：【50.18ms】
 *               50个事件的地图中，平均消耗为：【39.22ms】
 * 测试方法2：  在不同的界面中，进行性能测试。
 * 测试结果2：  战斗界面中，平均消耗为：【37.25ms】
 *              菜单界面中，平均消耗为：【48.61ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.动态快照包含了对渲染器的处理，通过核心中提供的渲染图像，
 *   对图像进行二次操作，因此消耗较多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了插件指令"线段变量"的设置。
 * 
 * 
 * 
 * @param ---次元斩样式组 1至20---
 * @default
 *
 * @param 次元斩样式-1
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default {"标签":"==标准次元斩样式==","---贴图---":"","透明度":"255","是否在地图界面中启用":"true","是否在战斗界面中启用":"true","是否在菜单界面中启用":"true","图片层级":"20","---随机碎片---":"","最小缩放值":"1.04","随机缩放幅度 X":"0.05","随机缩放幅度 Y":"0.05","随机平移幅度 X":"20","随机平移幅度 Y":"20","随机旋转幅度":"0","---动画---":"","资源-切割白背景":"天窗层背景-次元斩背景","资源-切割白闪烁":"天窗层背景-幕布-纯色-白","闪烁时长":"24","闪烁透明度":"75","资源-刀光":"天窗层魔法圈-刀光","刀光移动时长":"20"}
 *
 * @param 次元斩样式-2
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-3
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-4
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-5
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-6
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-7
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-8
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-9
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-10
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-11
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-12
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-13
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-14
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-15
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-16
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-17
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-18
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-19
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 * @param 次元斩样式-20
 * @parent ---次元斩样式组 1至20---
 * @type struct<HDSSWCircle>
 * @desc 动态快照的详细配置信息。
 * @default 
 *
 */
/*~struct~HDSSWCircle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的天窗层动态快照==
 * 
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 是否在地图界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 是否在战斗界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 是否在菜单界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 天窗层先后排序的位置，0表示最后面。
 * @default 20
 * 
 * 
 * @param ---随机碎片---
 * @default 
 *
 * @param 最小缩放值
 * @parent ---随机碎片---
 * @desc 切割碎片的最小缩放值，碎片切割后通常要放大4%，这样在随机平移时不会看到切割边缘。
 * @default 1.04
 * 
 * @param 随机缩放幅度 X
 * @parent ---随机碎片---
 * @desc 碎片切割后，在最小缩放值的基础上，随机缩放的幅度范围。
 * @default 0.05
 *
 * @param 随机缩放幅度 Y
 * @parent ---随机碎片---
 * @desc 碎片切割后，在最小缩放值的基础上，随机缩放的幅度范围。
 * @default 0.05
 *
 * @param 随机平移幅度 X
 * @parent ---随机碎片---
 * @type number
 * @min 0
 * @desc 碎片切割后，平移的幅度范围。单位像素。
 * @default 20
 *
 * @param 随机平移幅度 Y
 * @parent ---随机碎片---
 * @type number
 * @min 0
 * @desc 碎片切割后，平移的幅度范围。单位像素。
 * @default 20
 *
 * @param 随机旋转幅度
 * @parent ---随机碎片---
 * @type number
 * @min 0
 * @max 360
 * @desc 碎片切割后，左右随机旋转的角度范围。单位角度。
 * @default 0
 * 
 * 
 * @param ---动画---
 * @default 
 * 
 * @param 资源-切割白背景
 * @parent ---动画---
 * @desc 切割时的底部白背景资源，你也可以换成其它颜色的资源图片，另外注意资源图片要与游戏屏幕一样大。
 * @default (需配置)动态快照次元斩-切割白背景
 * @require 1
 * @dir img/Special__layer/
 * @type file
 * 
 * @param 资源-切割白闪烁
 * @parent ---动画---
 * @desc 切割时的白色闪烁的图片资源，你也可以换成其它颜色的资源图片，另外注意资源图片要与游戏屏幕一样大。
 * @default (需配置)动态快照次元斩-切割白闪烁
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 闪烁时长
 * @parent ---动画---
 * @type number
 * @min 1
 * @desc 切割白闪烁的闪烁时长。
 * @default 24
 *
 * @param 闪烁透明度
 * @parent ---动画---
 * @type number
 * @min 0
 * @max 255
 * @desc 切割白闪烁的透明度。
 * @default 75
 * 
 * @param 资源-刀光
 * @parent ---动画---
 * @desc 切割时的刀光的图片资源。
 * @default (需配置)动态快照次元斩-刀光
 * @require 1
 * @dir img/Special__layer/
 * @type file
 *
 * @param 刀光移动时长
 * @parent ---动画---
 * @type number
 * @min 1
 * @desc 刀光快速切割时的移动时长。
 * @default 20
 *
 * @param 是否预加载
 * @parent ---动画---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍可见："1.系统 > 关于预加载.docx"。
 * @default false
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		HDSSW（Html_Dynamic_Snapshot_Space_Wrench）
//		临时全局变量	DrillUp.g_HDSSW_xxx
//		临时局部变量	this._drill_HDSSW_xxx
//		存储数据变量	$gameSystem._drill_HDSSW_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	特效管理层
//		★性能测试消耗	18.2ms（Drill_HDSSW_Sprite.update）9.8ms（Drill_HDSSW_CircleSprite.update）
//						4.6ms（drill_HDSSW_updateController）4.4ms（drill_HDSSW_updateCircleController）
//		★最坏情况		暂无
//		★备注			这里的消耗不包含动态快照的。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆预加载
//			->☆存储数据
//			
//			->☆切割计算
//				->执行多边形切割
//				->数学工具
//			->☆动态快照控制器创建
//				->界面创建
//				->单次切割
//			->☆动态快照控制器与贴图
//				->跨多个界面控制
//				->控制器帧刷新
//				->销毁
//			
//			->动态快照控制器【Drill_HDSSW_Controller】
//				->A主体
//				->B基本变化
//			->动态快照贴图【Drill_HDSSW_Sprite】
//				->A主体
//				->B基本变化
//				->C对象绑定
//			
//			->☆刀光计算
//				->获取刀光起点终点
//				->数学工具
//			->☆魔法圈控制器创建
//				> 刀光
//				> 切割白背景
//				> 切割白闪烁
//				->界面创建
//				->单次切割
//			->☆魔法圈控制器与贴图
//				> 刀光
//				> 切割白背景
//				> 切割白闪烁
//				->跨多个界面控制
//				->控制器帧刷新
//				->销毁
//			
//			->魔法圈控制器【Drill_HDSSW_CircleController】
//				->A主体
//				->B基本变化
//				->2A闪烁模式
//				->2B刀光模式
//			->魔法圈贴图【Drill_HDSSW_CircleSprite】
//				->A主体
//				->B基本变化
//				->C对象绑定
//				->2A闪烁模式
//				->2B刀光模式
//
//
//		★家谱：
//			大家族-屏幕快照
//		
//		★脚本文档：
//			22.游戏窗体 > 动态快照-天窗层（脚本）.docx
//		
//		★插件私有类：
//			* 动态快照控制器【Drill_HDSSW_Controller】
//			* 动态快照贴图【Drill_HDSSW_Sprite】
//			* 魔法圈控制器【Drill_HDSSW_CircleController】
//			* 魔法圈贴图【Drill_HDSSW_CircleSprite】
//		
//		★必要注意事项：
//			1.该插件的 魔法圈控制器 和 动态快照控制器 相互独立，可以分离开来。
//
//		★其它说明细节：
//			1.该插件用了大量数学工具，写函数时注意考虑 null 的情况。
//				
//		★存在的问题：
//			1.见函数 drill_HDSSW_Math2D_getPointToPointDegree 的调用位置，可能存在精度偏差，造成旋转角度不对。
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_HDSSW_PluginTip_curName = "Drill_HtmlDynamicSnapshotSpaceWrench.js 游戏窗体-动态快照次元斩";
	DrillUp.g_HDSSW_PluginTip_baseList = [
		"Drill_CoreOfDynamicSnapshot.js 游戏窗体-动态快照核心",
		"Drill_CoreOfBallistics.js 系统-弹道核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_HDSSW_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_HDSSW_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_HDSSW_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_HDSSW_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_HDSSW_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_HDSSW_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_HDSSW_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_HtmlDynamicSnapshotSpaceWrench = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_HtmlDynamicSnapshotSpaceWrench');
	
	//==============================
	// * 静态数据 - 动态快照
	//				（~struct~HDSSWCircle）
	//==============================
	DrillUp.drill_HDSSW_circleInit = function( dataFrom ) {
		var data = {};
		
		// > 动态快照控制器
		data['visible'] = true;
		data['pause'] = false;
		
		// > 贴图
		data['zIndex'] = Number( dataFrom["图片层级"] || 20);
		data['map_enabled'] = String( dataFrom["是否在地图界面中启用"] || "true") == "true";
		data['battle_enabled'] = String( dataFrom["是否在战斗界面中启用"] || "true") == "true";
		data['menu_enabled'] = String( dataFrom["是否在菜单界面中启用"] || "true") == "true";
		
		// > A主体
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		
		// > B基本变化
		data['min_scale'] = Number( dataFrom["最小缩放值"] || 1.04);
		data['scope_scaleX'] = Number( dataFrom["随机缩放幅度 X"] || 0.05);
		data['scope_scaleY'] = Number( dataFrom["随机缩放幅度 Y"] || 0.05);
		data['scope_x'] = Number( dataFrom["随机平移幅度 X"] || 20);
		data['scope_y'] = Number( dataFrom["随机平移幅度 Y"] || 20);
		data['scope_rotate'] = Number( dataFrom["随机旋转幅度"] || 0);
		
		// > 2A闪烁模式
		data['background_img_src'] = String( dataFrom["资源-切割白背景"] || "");
		data['flicker_img_src'] = String( dataFrom["资源-切割白闪烁"] || "");
		data['flicker_time'] = Number( dataFrom["闪烁时长"] || 24);
		data['flicker_opacity'] = Number( dataFrom["闪烁透明度"] || 75);
		
		// > 2B刀光模式
		data['knife_img_src'] = String( dataFrom["资源-刀光"] || "");
		data['move_time'] = Number( dataFrom["刀光移动时长"] || 20);
		
		return data;
	}
	
	/*-----------------次元斩样式------------------*/
	DrillUp.g_HDSSW_style_length = 20;
	DrillUp.g_HDSSW_style = [];
	for (var i = 0; i < DrillUp.g_HDSSW_style_length; i++) {
		if( DrillUp.parameters["次元斩样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["次元斩样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["次元斩样式-" + String(i+1) ]);
			DrillUp.g_HDSSW_style[i] = DrillUp.drill_HDSSW_circleInit( temp );
		}else{
			DrillUp.g_HDSSW_style[i] = DrillUp.drill_HDSSW_circleInit( {} );
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfDynamicSnapshot &&
	Imported.Drill_CoreOfBallistics ){


//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_HDSSW_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_HDSSW_pluginCommand.call(this, command, args);
	if( command === ">动态快照次元斩" ){
		
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "立即清除全部碎片" ){
				$gameSystem.drill_HDSSW_clearAll();
				this.wait(1);	//（『强制等待』1帧，确保全部清空）
			}
		}
		if( args.length == 6 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "执行切割" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				
				if( temp2 == "随机线段" ){
					var data = {};
					data['style_id'] = Number(temp1) -1;
					data['x1'] = Graphics.boxWidth * Math.random();
					data['y1'] = Graphics.boxHeight * Math.random();
					data['x2'] = Graphics.boxWidth * Math.random();
					data['y2'] = Graphics.boxHeight * Math.random();
					$gameTemp._drill_HDSSW_createCut = data;
					return;
				}
				if( temp2.indexOf("线段变量[") != -1 ){
					temp2 = temp2.replace("线段变量[","");
					temp2 = temp2.replace("]","");
					var arr = temp2.split(/[,，]/);
					if( arr.length >= 4 ){
						var data = {};
						data['style_id'] = Number(temp1) -1;
						data['x1'] = $gameVariables.value( Number(arr[0]) );
						data['y1'] = $gameVariables.value( Number(arr[1]) );
						data['x2'] = $gameVariables.value( Number(arr[2]) );
						data['y2'] = $gameVariables.value( Number(arr[3]) );
						$gameTemp._drill_HDSSW_createCut = data;
					}
					return;
				}
				if( temp2.indexOf("线段[") != -1 ){
					temp2 = temp2.replace("线段[","");
					temp2 = temp2.replace("]","");
					var arr = temp2.split(/[,，]/);
					if( arr.length >= 4 ){
						var data = {};
						data['style_id'] = Number(temp1) -1;
						data['x1'] = Number(arr[0]);
						data['y1'] = Number(arr[1]);
						data['x2'] = Number(arr[2]);
						data['y2'] = Number(arr[3]);
						$gameTemp._drill_HDSSW_createCut = data;
					}
					return;
				}
			}
		}
		
	}
};


//=============================================================================
// ** ☆预加载
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 初始化
//==============================
var _drill_HDSSW_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_HDSSW_preload_initialize.call(this);
	this.drill_HDSSW_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_HDSSW_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_HDSSW_preloadInit = function() {
	this._drill_HDSSW_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_HDSSW_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_HDSSW_style.length; i++ ){
		var temp_data = DrillUp.g_HDSSW_style[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['preload'] != true ){ continue; }
		
		this._drill_HDSSW_preloadTank.push( 
			ImageManager.reserveBitmap( "img/Special__layer/", temp_data['background_img_src'], 0, true, this._drill_HDSSW_cacheId ) 
		);
		this._drill_HDSSW_preloadTank.push( 
			ImageManager.reserveBitmap( "img/Special__layer/", temp_data['flicker_img_src'], 0, true, this._drill_HDSSW_cacheId ) 
		);
		
		this._drill_HDSSW_preloadTank.push( 
			ImageManager.reserveBitmap( "img/Special__layer/", temp_data['knife_img_src'], 0, true, this._drill_HDSSW_cacheId ) 
		);
	}
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_HDSSW_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_HDSSW_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_HDSSW_sys_initialize.call(this);
	this.drill_HDSSW_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_HDSSW_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_HDSSW_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_HDSSW_saveEnabled == true ){	
		$gameSystem.drill_HDSSW_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_HDSSW_initSysData();
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
Game_System.prototype.drill_HDSSW_initSysData = function() {
	this.drill_HDSSW_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_HDSSW_checkSysData = function() {
	this.drill_HDSSW_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_HDSSW_initSysData_Private = function() {
	
	this._drill_HDSSW_controllerTank = [];			//控制器容器（动态快照）
	
	this._drill_HDSSW_circleControllerTank = [];	//控制器容器（刀光）
	this._drill_HDSSW_backgroundController = null;	//控制器（切割白背景）
	this._drill_HDSSW_flickerController = null;		//控制器（切割白闪烁）
	
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_HDSSW_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_HDSSW_circleControllerTank == undefined ){
		this.drill_HDSSW_initSysData();
	}
};



//=============================================================================
// ** ☆切割计算
//
//			说明：	> 此模块专门管理 切割计算。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 切割计算 - 执行多边形切割
//			
//			参数：	> convex_points 点列表 （凸包多边形的全部点）
//					> x1,y1 数字           （切割线的第1个点）
//					> x2,y2 数字           （切割线的第2个点）
//			返回：	> result['intersection_points'] （两交点）
//					> result['convexA_points']      （切割的多边形A）
//					> result['convexB_points']      （切割的多边形B）
//					> null                          （没切割到）
//
//			说明：	> 考虑到切割的多边形太小问题，多边形的点会进行偏移或者压缩，与交点不一定重合。
//==============================
Game_Temp.prototype.drill_HDSSW_cutFace = function( convex_points, x1,y1,x2,y2 ){
	
	// > 延长切割线（求直线与圆的交点）
	var ex_points = this.drill_HDSSW_getCircleTwoPoint( x1,y1,x2,y2 );
	if( ex_points == null ){ return null; }
	
	// > 凸包遍历
	//		（凸包与任意直线最多存在两个交点）
	var intersection_points = [];		//交点列表
	var isFindingA = true;				//多边形标记
	var convexA_points = [];			//切割的多边形A
	var convexB_points = [];			//切割的多边形B
	for(var i=0; i < convex_points.length; i++){
		var cur_point = convex_points[i];
		var next_point = convex_points[i+1];
		if( i == convex_points.length-1 ){
			next_point = convex_points[0];
		};
		
		// > 多边形添加点
		if( isFindingA == true ){
			convexA_points.push( cur_point );
		}else{
			convexB_points.push( cur_point );
		}
		
		// > 获取交点
		var data = this.drill_HDSSW_Math2D_getTwoLineIntersectionPointWithInLine( 
			cur_point['x'], cur_point['y'], next_point['x'], next_point['y'],
			ex_points[0]['x'],ex_points[0]['y'], ex_points[1]['x'],ex_points[1]['y']
		);
		if( data == null ){ continue; }
		
		// > 找到一个线上的交点
		if( data['inLine'] == true ){
			intersection_points.push( data );
			convexA_points.push( data );
			convexB_points.push( data );
			isFindingA = !isFindingA;	 //（多边形标记 取反）
		};
	}
	
	// > 去重
	intersection_points = this.drill_HDSSW_removeSamePoints( intersection_points );
	convexA_points = this.drill_HDSSW_removeSamePoints( convexA_points );
	convexB_points = this.drill_HDSSW_removeSamePoints( convexB_points );
	//alert( JSON.stringify( intersection_points ) )
	//alert( JSON.stringify( convexA_points ) )
	//alert( JSON.stringify( convexB_points ) )
	
	// > 相交点数不够，表示 没切割到
	if( intersection_points.length != 2 ){ return null; }
	
	// > 多边形点数不够，表示 没切割到
	if( convexA_points.length < 3 ){ return null; }
	if( convexB_points.length < 3 ){ return null; }
	
	var result = {};
	result['intersection_points'] = intersection_points;
	result['convexA_points'] = convexA_points;
	result['convexB_points'] = convexB_points;
	return result;
}
//==============================
// * 切割计算 - 坐标点去重
//			
//			参数：	> points 点列表
//			返回：	> 点列表
//
//			说明：	> 返回新数组，新数组为去重的点列表。
//==============================
Game_Temp.prototype.drill_HDSSW_removeSamePoints = function( points ){
	var result_list = [];
	for(var i = 0; i < points.length; i++ ){
		var point = points[i];
		
		// > 相同的点，不添加
		var is_same = false;
		for(var j = 0; j < result_list.length; j++ ){
			if( point['x'] == result_list[j]['x'] &&
				point['y'] == result_list[j]['y'] ){
				is_same = true;
				break;
			}
		}
		if( is_same == true ){ continue; }
		
		// > 不同的点，添加
		result_list.push( point );
	}
	return result_list;
}
//==============================
// * 切割计算 - 数学工具 - 求两直线的交点（含线段判断）
//			
//			参数：	> x1,y1 数字   （直线A的第1个点）
//					> x2,y2 数字   （直线A的第2个点）
//					> x3,y3 数字   （直线B的第1个点）
//					> x4,y4 数字   （直线B的第2个点）
//			返回：	> { x:0, y:0, inLine:false } （结果交点+交点是否在线段上）
//					> null                       （无解）
//			
//			说明：	> 要留意无解的情况，并做相关处理。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getTwoLineIntersectionPointWithInLine = function( x1,y1,x2,y2, x3,y3,x4,y4 ){
	
	// > 获取交点
	var point = this.drill_HDSSW_Math2D_getTwoLineIntersectionPoint( x1,y1,x2,y2, x3,y3,x4,y4 );
	if( point == null ){ return null; }
	
	// > 判断在直线上
	var inLine = true;
	var x = point['x'];
	var y = point['y'];
	if( x > Math.max(x1,x2) ){ inLine = false; }
	if( x < Math.min(x1,x2) ){ inLine = false; }
	if( y > Math.max(y1,y2) ){ inLine = false; }
	if( y < Math.min(y1,y2) ){ inLine = false; }
	if( x > Math.max(x3,x4) ){ inLine = false; }
	if( x < Math.min(x3,x4) ){ inLine = false; }
	if( y > Math.max(y3,y4) ){ inLine = false; }
	if( y < Math.min(y3,y4) ){ inLine = false; }
	point['inLine'] = inLine;
	return point;
}
//==============================
// * 切割计算 - 数学工具 - 求两直线的交点
//			
//			参数：	> x1,y1 数字   （直线A的第1个点）
//					> x2,y2 数字   （直线A的第2个点）
//					> x3,y3 数字   （直线B的第1个点）
//					> x4,y4 数字   （直线B的第2个点）
//			返回：	> { x:0, y:0 } （结果交点）
//					> null         （无解）
//			
//			说明：	> 要留意无解的情况，并做相关处理。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getTwoLineIntersectionPoint = function( x1,y1,x2,y2, x3,y3,x4,y4 ){
	
	// > 检查是否为合法直线
	if( x1 == x2 && y1 == y2 ){ return null; }
	if( x3 == x4 && y3 == y4 ){ return null; }
	
	// > 垂直的平行线情况
	if( x1 == x2 && x3 == x4 ){ return null; }
	
	// > 水平的平行线情况
	if( y1 == y2 && y3 == y4 ){ return null; }
	
	// > 有一根垂直直线情况
	if( x1 == x2 ){
		var y = this.drill_HDSSW_Math2D_getPointOnLine_FindY( x3,y3,x4,y4, x1 );
		if( y == null ){ return null; }	//（第二根线也垂直）
		return { 'x':x1, 'y':y };
	}
	if( x3 == x4 ){
		var y = this.drill_HDSSW_Math2D_getPointOnLine_FindY( x1,y1,x2,y2, x3 );
		if( y == null ){ return null; }	//（第二根线也垂直）
		return { 'x':x3, 'y':y };
	}
	
	// > 有一根水平直线情况
	if( y1 == y2 ){
		var x = this.drill_HDSSW_Math2D_getPointOnLine_FindX( x3,y3,x4,y4, y1 );
		if( x == null ){ return null; }	//（第二根线也水平）
		return { 'x':x, 'y':y1 };
	}
	if( y3 == y4 ){
		var x = this.drill_HDSSW_Math2D_getPointOnLine_FindX( x1,y1,x2,y2, y3 );
		if( x == null ){ return null; }	//（第二根线也水平）
		return { 'x':x, 'y':y3 };
	}
	
	// > 求斜率和截距 （y = kx + b）
	var k1 = (y2 - y1)/(x2 - x1);
	var k2 = (y4 - y3)/(x4 - x3);
	var b1 = y1 - k1*x1;
	var b2 = y3 - k2*x3;
	
	// > 两根线平行、重合情况
	if( k1 == k2 ){ return null; }
	
	// > 求交点
	var x = (b2 - b1)/(k1 - k2);
	var y = k1 * x + b1;
	return { 'x':x, 'y':y };
}
//==============================
// * 切割计算 - 数学工具 - 已知两点求第三点（求Y）
//			
//			参数：	> x1,y1 数字（第1个点）
//					> x2,y2 数字（第2个点）
//					> x 数字    （第3个点的x）
//			返回：	> 数字      （结果值）
//					> null      （垂直时，无解）
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getPointOnLine_FindY = function( x1,y1,x2,y2, x ){
	
	// > 垂直情况
	if( x1 == x2 ){ return null; }
	
	// > 水平情况
	if( y1 == y2 ){ return y1; }
	
	// > 求斜率和截距 （y = kx + b）
	var k = (y2 - y1)/(x2 - x1);
	var b = y1 - k*x1;
	return k*x + b;
}
//==============================
// * 切割计算 - 数学工具 - 已知两点求第三点（求X）
//			
//			参数：	> x1,y1 数字（第1个点）
//					> x2,y2 数字（第2个点）
//					> y 数字    （第3个点的y）
//			返回：	> 数字      （结果值）
//					> null      （水平时，无解）
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getPointOnLine_FindX = function( x1,y1,x2,y2, y ){
	
	// > 垂直情况
	if( x1 == x2 ){ return x1; }
	
	// > 水平情况
	if( y1 == y2 ){ return null; }
	
	// > 求斜率和截距 （y = kx + b）
	var k = (y2 - y1)/(x2 - x1);
	var b = y1 - k*x1;
	return (y-b)/k;
}


//=============================================================================
// ** ☆动态快照控制器创建
//
//			说明：	> 此模块专门管理 控制器 的创建与销毁。
//					> 遍历控制器 切割平面，如果切到了，添加控制器，原控制器使用A多边形，新控制器使用B多边形。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 动态快照控制器创建 - 界面创建时（地图界面）
//==============================
var _drill_HDSSW_mapCreate_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_HDSSW_mapCreate_createAllWindows.call(this);
	this.drill_HDSSW_sceneCreate();
};
//==============================
// * 动态快照控制器创建 - 界面创建 （地图界面）
//==============================
Scene_Map.prototype.drill_HDSSW_sceneCreate = function() {
	var cur_scene = SceneManager._scene;
	
	// > 界面创建 动态快照贴图
	$gameTemp._drill_HDSSW_spriteTank = [];			//贴图容器（不允许出现null值）
	for(var i=0; i < $gameSystem._drill_HDSSW_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSSW_controllerTank[i];
		var data = temp_controller._drill_data;
		
		// > 如果关闭，则不创建
		if( cur_scene instanceof Scene_Map && data['map_enabled'] != true ){ continue; }
		if( cur_scene instanceof Scene_Battle && data['battle_enabled'] != true ){ continue; }
		if( cur_scene instanceof Scene_MenuBase && data['menu_enabled'] != true ){ continue; }
		
		// > 创建贴图
		var temp_sprite = new Drill_HDSSW_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 添加贴图到层级（天窗层）
		$gameTemp._drill_HDSSW_spriteTank.push( temp_sprite );
		Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
	}
	
	// > 层级排序（天窗层）
	Graphics.drill_CODS_sortByZIndex();
}
//==============================
// * 动态快照控制器创建 - 帧刷新（地图界面）
//==============================
var _drill_HDSSW_mapCreate_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_HDSSW_mapCreate_update.call(this);
	if( $gameTemp._drill_HDSSW_createCut == undefined ){ return; }
	var cur_cut = $gameTemp._drill_HDSSW_createCut;
	this.drill_HDSSW_executeCut( cur_cut );
	this.drill_HDSSW_executeCircleCut( cur_cut );
	$gameTemp._drill_HDSSW_createCut = null;
};
//==============================
// * 动态快照控制器创建 - 帧刷新 单次切割（地图界面）
//==============================
Scene_Map.prototype.drill_HDSSW_executeCut = function( cur_cut ){
	//alert( JSON.stringify( cur_cut ) );
	
	// > 控制器创建 - 第一刀
	var controller_add_list = [];
	if( $gameSystem._drill_HDSSW_controllerTank.length == 0 ){
		
		// > 默认游戏屏幕形状
		var bb = 0;
		var ww = Graphics.boxWidth;
		var hh = Graphics.boxHeight;
		var convex_points = [];
		convex_points.push( {'x':0 -bb,'y':0 -bb } );
		convex_points.push( {'x':ww+bb,'y':0 -bb } );
		convex_points.push( {'x':ww+bb,'y':hh+bb } );
		convex_points.push( {'x':0 -bb,'y':hh+bb } );
		
		// > 获取切割面
		var cut_data = $gameTemp.drill_HDSSW_cutFace( convex_points, cur_cut['x1'], cur_cut['y1'], cur_cut['x2'], cur_cut['y2'] );
		if( cut_data == null ){ return; }
		
		// > 创建 动态快照控制器
		var temp_data = DrillUp.g_HDSSW_style[ cur_cut['style_id'] ];
		var temp_controller = new Drill_HDSSW_Controller( temp_data );
		temp_controller.drill_controller_setMaskConvex( cut_data['convexA_points'] );
		controller_add_list.push( temp_controller );
		
		var temp_controller2 = new Drill_HDSSW_Controller( temp_data );
		temp_controller2.drill_controller_setMaskConvex( cut_data['convexB_points'] );
		controller_add_list.push( temp_controller2 );
		
		
	// > 控制器创建 - 第N刀
	}else{
		
		// > 遍历切割
		for( var i =0; i < $gameSystem._drill_HDSSW_controllerTank.length; i++ ){
			var controller = $gameSystem._drill_HDSSW_controllerTank[i];
			
			// > 获取切割面
			var cut_data = $gameTemp.drill_HDSSW_cutFace( controller._drill_convex_points, cur_cut['x1'], cur_cut['y1'], cur_cut['x2'], cur_cut['y2'] );
			if( cut_data == null ){ continue; }
			
			// > 当前 动态快照控制器 改变切片
			controller.drill_controller_setMaskConvex( cut_data['convexA_points'] );
			
			// > 创建 动态快照控制器
			var temp_data = DrillUp.g_HDSSW_style[ cur_cut['style_id'] ];
			var temp_controller = new Drill_HDSSW_Controller( temp_data );
			temp_controller.drill_controller_setMaskConvex( cut_data['convexB_points'] );
			controller_add_list.push( temp_controller );
			
		}
	}
	
	
	// > 贴图创建
	for( var i =0; i < controller_add_list.length; i++ ){
		var temp_controller = controller_add_list[i];
		
		// > 添加到 控制器容器
		$gameSystem._drill_HDSSW_controllerTank.push( temp_controller );
		
		// > 创建 动态快照贴图
		var temp_sprite = new Drill_HDSSW_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 添加贴图到层级（天窗层）
		$gameTemp._drill_HDSSW_spriteTank.push( temp_sprite );
		Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
	}
	
	// > 层级排序（天窗层）
	Graphics.drill_CODS_sortByZIndex();
};

//==============================
// * 动态快照控制器创建 - 界面创建时（战斗界面）
//==============================
var _drill_HDSSW_battleCreate_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_HDSSW_battleCreate_createAllWindows.call(this);
	this.drill_HDSSW_sceneCreate();
};
//==============================
// * 动态快照控制器创建 - 帧刷新（战斗界面）
//==============================
var _drill_HDSSW_battleCreate_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_HDSSW_battleCreate_update.call(this);
	if( $gameTemp._drill_HDSSW_createCut == undefined ){ return; }
	var cur_cut = $gameTemp._drill_HDSSW_createCut;
	this.drill_HDSSW_executeCut( cur_cut );
	this.drill_HDSSW_executeCircleCut( cur_cut );
	$gameTemp._drill_HDSSW_createCut = null;
};
//==============================
// * 动态快照控制器创建 - 界面创建 （战斗界面）
//==============================
Scene_Battle.prototype.drill_HDSSW_sceneCreate = Scene_Map.prototype.drill_HDSSW_sceneCreate;
//==============================
// * 动态快照控制器创建 - 帧刷新 单次切割（战斗界面）
//==============================
Scene_Battle.prototype.drill_HDSSW_executeCut = Scene_Map.prototype.drill_HDSSW_executeCut;

//==============================
// * 动态快照控制器创建 - 界面创建时（菜单界面）
//==============================
var _drill_HDSSW_menuCreate_createWindowLayer = Scene_MenuBase.prototype.createWindowLayer;
Scene_MenuBase.prototype.createWindowLayer = function() {
	_drill_HDSSW_menuCreate_createWindowLayer.call(this);
	this.drill_HDSSW_sceneCreate();
};
//==============================
// * 动态快照控制器创建 - 帧刷新（菜单界面）
//==============================
var _drill_HDSSW_menuCreate_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_HDSSW_menuCreate_update.call(this);
	if( $gameTemp._drill_HDSSW_createCut == undefined ){ return; }
	var cur_cut = $gameTemp._drill_HDSSW_createCut;
	this.drill_HDSSW_executeCut( cur_cut );
	this.drill_HDSSW_executeCircleCut( cur_cut );
	$gameTemp._drill_HDSSW_createCut = null;
};
//==============================
// * 动态快照控制器创建 - 界面创建 （菜单界面）
//==============================
Scene_MenuBase.prototype.drill_HDSSW_sceneCreate = Scene_Map.prototype.drill_HDSSW_sceneCreate;
//==============================
// * 动态快照控制器创建 - 帧刷新 单次切割（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_HDSSW_executeCut = Scene_Map.prototype.drill_HDSSW_executeCut;



//=============================================================================
// ** ☆动态快照控制器与贴图
//
//			说明：	> 此模块专门管理 贴图 的帧刷新与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 动态快照控制器与贴图 - 容器初始化
//==============================
var _drill_HDSSW_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_HDSSW_temp_initialize.call(this);
	this._drill_HDSSW_spriteTank = [];			//贴图容器（动态快照贴图）
	Graphics.drill_CODS_overstoryLayerClear();	//清空 天窗层
};
//==============================
// * 动态快照控制器与贴图 - 立即清除全部碎片
//			
//			说明：	> 设置控制器销毁标记，贴图和控制器 在帧刷新时会自动销毁。
//==============================
Game_System.prototype.drill_HDSSW_clearAll = function() {
	for(var i = 0; i < $gameSystem._drill_HDSSW_controllerTank.length; i++ ){
		var controller = $gameSystem._drill_HDSSW_controllerTank[i];
		controller.drill_controller_destroy();
	}
};

//==============================
// * 动态快照控制器与贴图 - 销毁时（地图界面）
//==============================
var _drill_HDSSW_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_HDSSW_smap_terminate.call(this);
	$gameTemp._drill_HDSSW_spriteTank = [];			//贴图容器（动态快照贴图）
	Graphics.drill_CODS_overstoryLayerClear();		//清空 天窗层
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新（地图界面）
//==============================
var _drill_HDSSW_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_HDSSW_smap_update.call(this);
	this.drill_HDSSW_updateController();			//帧刷新 - 控制器
	this.drill_HDSSW_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新 控制器（地图界面）
//==============================
Scene_Map.prototype.drill_HDSSW_updateController = function() {
	for(var i = 0; i < $gameSystem._drill_HDSSW_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSSW_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器帧刷新
		temp_controller.drill_controller_update();
	}
}
//==============================
// * 动态快照控制器与贴图 - 帧刷新 销毁（地图界面）
//==============================
Scene_Map.prototype.drill_HDSSW_updateDestroy = function() {
	
	// > 自动销毁 - 动态快照控制器
	for(var i = $gameSystem._drill_HDSSW_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_HDSSW_controllerTank[i];
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_HDSSW_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 动态快照贴图
	for(var i = $gameTemp._drill_HDSSW_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_HDSSW_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_HDSSW_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};

//==============================
// * 动态快照控制器与贴图 - 销毁时（战斗界面）
//==============================
var _drill_HDSSW_sbattle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_HDSSW_sbattle_terminate.call(this);
	$gameTemp._drill_HDSSW_spriteTank = [];			//贴图容器（动态快照贴图）
	Graphics.drill_CODS_overstoryLayerClear();		//清空 天窗层
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新（战斗界面）
//==============================
var _drill_HDSSW_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_HDSSW_sbattle_update.call(this);
	this.drill_HDSSW_updateController();			//帧刷新 - 控制器
	this.drill_HDSSW_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新 控制器（战斗界面）
//==============================
Scene_Battle.prototype.drill_HDSSW_updateController = Scene_Map.prototype.drill_HDSSW_updateController;
//==============================
// * 动态快照控制器与贴图 - 帧刷新 销毁（战斗界面）
//==============================
Scene_Battle.prototype.drill_HDSSW_updateDestroy = Scene_Map.prototype.drill_HDSSW_updateDestroy;

//==============================
// * 动态快照控制器与贴图 - 销毁时（菜单界面）
//==============================
var _drill_HDSSW_smenu_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_HDSSW_smenu_terminate.call(this);
	$gameTemp._drill_HDSSW_spriteTank = [];			//贴图容器（动态快照贴图）
	Graphics.drill_CODS_overstoryLayerClear();		//清空 天窗层
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新（菜单界面）
//==============================
var _drill_HDSSW_smenu_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_HDSSW_smenu_update.call(this);
	this.drill_HDSSW_updateController();			//帧刷新 - 控制器
	this.drill_HDSSW_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 动态快照控制器与贴图 - 帧刷新 控制器（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_HDSSW_updateController = Scene_Map.prototype.drill_HDSSW_updateController;
//==============================
// * 动态快照控制器与贴图 - 帧刷新 销毁（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_HDSSW_updateDestroy = Scene_Map.prototype.drill_HDSSW_updateDestroy;



//=============================================================================
// ** 动态快照控制器【Drill_HDSSW_Controller】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个专门控制天窗层动态快照的数据类。
// **		子功能：	->动态快照控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **					->B基本变化
// **					->2A遮罩管理
// **		
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
// **				> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 动态快照控制器 - 定义
//==============================
function Drill_HDSSW_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 动态快照控制器 - 校验标记
//==============================
DrillUp.g_HDSSW_checkNaN = true;
//==============================
// * 动态快照控制器 - 初始化
//==============================
Drill_HDSSW_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 动态快照控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_HDSSW_Controller.prototype.drill_controller_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_controller_updateAttr();					//帧刷新 - A主体
	this.drill_controller_updateChange_Position();		//帧刷新 - B基本变化 - 平移
														//帧刷新 - 2A遮罩管理（无）
	this.drill_controller_updateCheckNaN();				//帧刷新 - A主体 - 校验值
}
//##############################
// * 动态快照控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_HDSSW_Controller.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};
//##############################
// * 动态快照控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_HDSSW_Controller.prototype.drill_controller_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 动态快照控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_HDSSW_Controller.prototype.drill_controller_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 动态快照控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_HDSSW_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 动态快照控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_HDSSW_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * 动态快照控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_HDSSW_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 动态快照控制器
	if( data['visible'] == undefined ){ data['visible'] = true };				//动态快照控制器 - 显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };					//动态快照控制器 - 暂停情况
	
	// > 动态快照贴图
	if( data['zIndex'] == undefined ){ data['zIndex'] = 20 };					//动态快照贴图 - 图片层级
	
	// > A主体
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };				
	
	// > B基本变化（无）
	
	// > 2A遮罩管理（无）
}
//==============================
// * 动态快照控制器 - 初始化子功能
//==============================
Drill_HDSSW_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	this.drill_controller_initChange();			//初始化子功能 - B基本变化
	this.drill_controller_initMask();			//初始化子功能 - 2A遮罩管理
}
//==============================
// * 动态快照控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_HDSSW_Controller.prototype.drill_controller_resetData_Private = function( data ){
	
	// > 判断数据重复情况
	if( this._drill_data != undefined ){
		var keys = Object.keys( data );
		var is_same = true;
		for( var i=0; i < keys.length; i++ ){
			var key = keys[i];
			if( this._drill_data[key] != data[key] ){
				is_same = false;
			}
		}
		if( is_same == true ){ return; }
	}
	// > 补充未设置的数据
	var keys = Object.keys( this._drill_data );
	for( var i=0; i < keys.length; i++ ){
		var key = keys[i];
		if( data[key] == undefined ){
			data[key] = this._drill_data[key];
		}
	}
	
	// > 执行重置
	this._drill_data = JSON.parse(JSON.stringify( data ));					//深拷贝
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_HDSSW_Controller.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_HDSSW_Controller.prototype.drill_controller_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_HDSSW_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_HDSSW_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_HDSSW_checkNaN = false;
			alert( DrillUp.drill_HDSSW_getPluginTip_ParamIsNaN( "_drill_x" ) );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_HDSSW_checkNaN = false;
			alert( DrillUp.drill_HDSSW_getPluginTip_ParamIsNaN( "_drill_y" ) );
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_HDSSW_checkNaN = false;
			alert( DrillUp.drill_HDSSW_getPluginTip_ParamIsNaN( "_drill_opacity" ) );
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_HDSSW_checkNaN = false;
			alert( DrillUp.drill_HDSSW_getPluginTip_ParamIsNaN( "_drill_scaleX" ) );
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_HDSSW_checkNaN = false;
			alert( DrillUp.drill_HDSSW_getPluginTip_ParamIsNaN( "_drill_scaleY" ) );
		}
	}
}

//==============================
// * B基本变化 - 初始化子功能
//==============================
Drill_HDSSW_Controller.prototype.drill_controller_initChange = function() {
	var data = this._drill_data;
	
	// > 贴图 - 位置
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_randomX = data['scope_x'] * (Math.random()-0.5);
	this._drill_randomY = data['scope_y'] * (Math.random()-0.5);
	
	// > 贴图 - 透明度
	this._drill_opacity = data['opacity'];
	
	// > 贴图 - 缩放
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	
	// > 贴图 - 缩放（子贴图）
	this._drill_layer_scaleX = data['min_scale'] + data['scope_scaleX'] * Math.random();
	this._drill_layer_scaleY = data['min_scale'] + data['scope_scaleY'] * Math.random();
	
	// > 贴图 - 旋转
	this._drill_rotation = data['scope_rotate'] * (Math.random()-0.5);
}
//==============================
// * B基本变化 - 帧刷新 位置
//==============================
Drill_HDSSW_Controller.prototype.drill_controller_updateChange_Position = function(){
	var data = this._drill_data;
	
	// > 贴图 - 位置
	var xx = 0;
	var yy = 0;
	xx += Graphics.boxWidth *0.5;
	yy += Graphics.boxHeight *0.5;
	xx += this._drill_randomX;
	yy += this._drill_randomY;
	this._drill_x = xx;
	this._drill_y = yy;
}


//==============================
// * 2A遮罩管理 - 初始化子功能
//==============================
Drill_HDSSW_Controller.prototype.drill_controller_initMask = function() {
	var data = this._drill_data;
	this._drill_convex_serial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
	this._drill_convex_points = [];
}
//==============================
// * 2A遮罩管理 - 设置多边形（开放函数）
//==============================
Drill_HDSSW_Controller.prototype.drill_controller_setMaskConvex = function( convex_points ){
	this._drill_convex_serial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
	this._drill_convex_points = convex_points;
}



//=============================================================================
// ** 动态快照贴图【Drill_HDSSW_Sprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个动态快照贴图。
// **		子功能：	->动态快照贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					->A主体
// **					->B基本变化
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **					->2A遮罩管理
// **
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 控制器与贴图 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 动态快照贴图 - 定义
//==============================
function Drill_HDSSW_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_HDSSW_Sprite.prototype = Object.create(Sprite.prototype);
Drill_HDSSW_Sprite.prototype.constructor = Drill_HDSSW_Sprite;
//==============================
// * 动态快照贴图 - 初始化
//==============================
Drill_HDSSW_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 动态快照贴图 - 帧刷新
//==============================
Drill_HDSSW_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A主体
	this.drill_sprite_updateChange();				//帧刷新 - B基本变化
													//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateMask();					//帧刷新 - 2A遮罩管理
};

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_HDSSW_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * C对象绑定 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_HDSSW_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B基本变化
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initMask();				//初始化子功能 - 2A遮罩管理
};

//##############################
// * 动态快照贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_HDSSW_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 动态快照贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_HDSSW_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
	if( this._drill_controller._drill_data['visible'] == false ){	//（不显示时，不工作）
		this.visible = false;
		return false;
	}
    return true;
};
//##############################
// * 动态快照贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_HDSSW_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 动态快照贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_HDSSW_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 动态快照贴图 - 贴图初始化（私有）
//==============================
Drill_HDSSW_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 动态快照贴图 - 销毁子功能（私有）
//==============================
Drill_HDSSW_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	this._drill_layerSprite.removeChild( this._drill_childCircleSprite );
	this.removeChild( this._drill_layerSprite );
	this._drill_childCircleSprite = null;
	this._drill_layerSprite = null;
	
	// > 销毁 - B基本变化
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
};
//==============================
// * 动态快照贴图 - 销毁自身（私有）
//==============================
Drill_HDSSW_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_HDSSW_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller._drill_data;
	
	// > 属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.blendMode = 0;
	this.zIndex = data['zIndex'];
	this.visible = false;
	
	// > 动态快照 贴图
	var temp_sprite = new Sprite(); 
	temp_sprite.texture = Graphics.drill_CODS_getTexture();
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	this._drill_childCircleSprite = temp_sprite;
	
	// > 动态快照 层
	var temp_layer = new Sprite();		//动态快照样式两层容器
	temp_layer.anchor.x = 0.5;
	temp_layer.anchor.y = 0.5;
	this._drill_layerSprite = temp_layer;
	
	// > 遮罩
	this._drill_maskSprite = new Sprite();
	
	this._drill_layerSprite.addChild( this._drill_childCircleSprite );
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_HDSSW_Sprite.prototype.drill_sprite_updateAttr = function() {
	var data = this._drill_controller._drill_data;
	
	// > 贴图 - 贴图属性
	this.scale.x = this._drill_controller._drill_scaleX;
	this.scale.y = this._drill_controller._drill_scaleY;
	this.opacity = this._drill_controller._drill_opacity;
	this.rotation = this._drill_controller._drill_rotation *Math.PI/180;	//（整体再旋转角度)
	this.visible = data['visible'];
	
	// > 贴图 - 层级属性
	this._drill_layerSprite.scale.x  = this._drill_controller._drill_layer_scaleX;
	this._drill_layerSprite.scale.y  = this._drill_controller._drill_layer_scaleY;
}


//==============================
// * B基本变化 - 初始化子功能
//==============================
Drill_HDSSW_Sprite.prototype.drill_sprite_initChange = function(){
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * B基本变化 - 帧刷新
//==============================
Drill_HDSSW_Sprite.prototype.drill_sprite_updateChange = function() {
	var data = this._drill_controller._drill_data;
	
	// > 位置
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	this.x = xx;
	this.y = yy;
	
	// > 透明度（无）
	
	// > 缩放（无）
	
	// > 旋转（无）
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * 2A遮罩管理 - 初始化子功能
//==============================
Drill_HDSSW_Sprite.prototype.drill_sprite_initMask = function() {
	var data = this._drill_controller._drill_data;
	this._drill_convex_curSerial = -1;
}
//==============================
// * 2A遮罩管理 - 帧刷新
//==============================
Drill_HDSSW_Sprite.prototype.drill_sprite_updateMask = function(){
	var data = this._drill_controller._drill_data;
	if( this._drill_convex_curSerial == this._drill_controller._drill_convex_serial ){ return; }
	this._drill_convex_curSerial = this._drill_controller._drill_convex_serial;
	
	// > 刷新遮罩
	this._drill_maskSprite.bitmap = null;
	
	var bitmap = new Bitmap( Graphics.boxWidth, Graphics.boxHeight );
	var convex_points = this._drill_controller._drill_convex_points;
	this.drill_sprite_drawMaskConvex( bitmap, convex_points );
	
	this._drill_maskSprite.bitmap = bitmap;
	this._drill_layerSprite.mask = this._drill_maskSprite;		//『遮罩赋值』
}
//==============================
// * 2A遮罩管理 - 绘制遮罩
//			
//			说明：	> 此函数将创建一个实时的 bitmap 对象。
//==============================
Drill_HDSSW_Sprite.prototype.drill_sprite_drawMaskConvex = function( bitmap, convex_points ){
	
	// > 全涂黑
	bitmap.fillAll("#000000");
	
	if( convex_points.length < 3 ){ return; }
	
	// > 绘制多边形
    var painter = bitmap._context;
	
	painter.beginPath();
	painter.moveTo( convex_points[0]['x'], convex_points[0]['y'] );
	for( var i=1; i < convex_points.length; i++ ){
		painter.lineTo( convex_points[i]['x'], convex_points[i]['y'] );
	}
	painter.closePath();
	
    painter.fillStyle = "#ffffff";
	painter.fill();
    painter.fillStyle = "#000000";	//（涂黑边缘）
	painter.stroke();
    bitmap._setDirty();
}




//=============================================================================
// ** ☆刀光计算
//
//			说明：	> 此模块专门管理 刀光计算。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 刀光计算 - 获取刀光起点终点
//			
//			参数：	> x1,y1 数字     （切割线的第1个点）
//					> x2,y2 数字     （切割线的第2个点）
//			返回：	> [{ x:0, y:0 }] （结果交点列表）
//					> null           （无解）
//
//			说明：	> 以游戏屏幕中心点为准，画一个圆，确定 刀光 的起始点和终止点。
//==============================
Game_Temp.prototype.drill_HDSSW_getCircleTwoPoint = function( x1,y1,x2,y2 ){
	
	var c_x = Graphics.boxWidth *0.5;
	var c_y = Graphics.boxHeight *0.5;
	var r = Graphics.boxWidth + Graphics.boxHeight;
	
	var result = this.drill_HDSSW_Math2D_getLineAndCircleIntersectionPoint( x1,y1,x2,y2, c_x,c_y,r );
	if( result == null ){ return null; }
	if( result.length < 2 ){ return null; }
	return result;
}
//==============================
// * 刀光计算 - 数学工具 - 求直线与圆的交点
//			
//			参数：	> x1,y1 数字     （直线的第1个点）
//					> x2,y2 数字     （直线的第2个点）
//					> x3,y3 数字     （圆心）
//					> r3 数字        （半径）
//			返回：	> [{ x:0, y:0 }] （结果交点列表）
//					> null           （无解）
//			
//			说明：	> 两交点的顺序为 x1,y1 到 x2,y2 直线方向上的顺序。
//					> 要留意无解的情况，并做相关处理。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getLineAndCircleIntersectionPoint = function( x1,y1,x2,y2, x3,y3,r3 ){
	
	// > 检查是否为合法直线
	if( x1 == x2 && y1 == y2 ){ return null; }
	
	// > 检查是否为合法圆
	if( r3 <= 0 ){ return null; }
	
	
	// > 获取垂足
	var foot_point = this.drill_HDSSW_Math2D_getLineAndPointPerpendicularFoot( x1,y1,x2,y2, x3,y3 );
	if( foot_point == null ){ return null; }
	
	// > 垂足与半径判断
	var f_x = foot_point.x;
	var f_y = foot_point.y;
	var square_d = (x3-f_x)*(x3-f_x) + (y3-f_y)*(y3-f_y);
	if( square_d > r3*r3 ){	//（没有交点）
		return [];
	}
	if( square_d == r3*r3 ){	//（只有一个交点，就是垂足）
		var result = [];
		result.push( foot_point );
		return result;
	}
	
	// > 有两个交点时
	var result = [];
	
	// > 求垂足到交点的距离
	var d = Math.sqrt( r3*r3 - square_d );
	
	// > 获取其中一个方向的 单位向量
	//		（单位向量*距离 = 垂足到两交点的向量）
	var vec = this.drill_HDSSW_Math2D_getPointToPointVector( f_x,f_y, x1,y1 );	//（注意可能x1,y1恰好和垂足重合）
	if( vec.x == 0 && vec.y == 0 ){ vec = this.drill_HDSSW_Math2D_getPointToPointVector( f_x,f_y, x2,y2 ); }
	var result_x1 = f_x + vec.x * d;
	var result_y1 = f_y + vec.y * d;
	var result_x2 = f_x - vec.x * d;
	var result_y2 = f_y - vec.y * d;
	
	// > 排序
	var d1 = x1 - x2;
	if( d1 == 0 ){ d1 = y1 - y2; }
	var dr = result_x1 - result_x2;
	if( dr == 0 ){ dr = result_y1 - result_y2; }
	if( d1 < 0 ){
		if( dr < 0 ){		//（正负相同，则说明两点位置相同）
			result.push( { 'x':result_x1, 'y':result_y1 } );
			result.push( { 'x':result_x2, 'y':result_y2 } );
		}else{				//（正负相反，则说明两点位置相反）
			result.push( { 'x':result_x2, 'y':result_y2 } );
			result.push( { 'x':result_x1, 'y':result_y1 } );
		}
	}
	if( d1 > 0 ){
		if( dr > 0 ){
			result.push( { 'x':result_x1, 'y':result_y1 } );
			result.push( { 'x':result_x2, 'y':result_y2 } );
		}else{
			result.push( { 'x':result_x2, 'y':result_y2 } );
			result.push( { 'x':result_x1, 'y':result_y1 } );
		}
	}
	
	return result;
}
//==============================
// * 刀光计算 - 数学工具 - 求直线与点的垂足
//			
//			参数：	> x1,y1 数字   （直线的第1个点）
//					> x2,y2 数字   （直线的第2个点）
//					> x3,y3 数字   （点）
//			返回：	> { x:0, y:0 } （垂足点）
//					> null         （无解）
//			
//			说明：	> 要留意无解的情况，并做相关处理。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getLineAndPointPerpendicularFoot = function( x1,y1,x2,y2, x3,y3 ){
	
	// > 检查是否为合法直线
	if( x1 == x2 && y1 == y2 ){ return null; }
	
	// > 垂直情况
	if( x1 == x2 ){
		return { 'x':x1, 'y':y3 };
	}
	
	// > 水平情况
	if( y1 == y2 ){
		return { 'x':x3, 'y':y1 };
	}
	
	// > 求一般式 （a*x + b*y + c = 0）
	var a = (y2 - y1)/(x2 - x1);
	var b = -1;
	var c = y1-a*x1;
	
	var x = (b*b*x3 - a*b*y3 - a*c)/( a*a + b*b );
	var y = (a*a*y3 - a*b*x3 - b*c)/( a*a + b*b );
	
	// > 点重合判定（如果计算的垂足与目标点基本重合，则返回目标点）
	if( Math.abs(x - x3) < 0.000001 && 
		Math.abs(y - y3) < 0.000001 ){
		return { 'x':x3, 'y':y3 };
	}
	return { 'x':x, 'y':y };
}
//==============================
// * 刀光计算 - 数学工具 - 计算点A朝向点B的单位向量
//			
//			参数：	> x1,y1 数字   （点A）
//					> x2,y2 数字   （点B）
//			返回：	> { x:0, y:0 } （结果交点）
//			
//			说明：	> 若两点重合，返回 { x:0, y:0 } 。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getPointToPointVector = function( x1,y1,x2,y2 ){
	
	// > 点重合判定
	if( Math.abs(x1 - x2) < 0.000001 && 
		Math.abs(y1 - y2) < 0.000001 ){
		return { 'x':0, 'y':0 };
	}
	var dx = x2 - x1;
	var dy = y2 - y1;
	
	//var dr = Math.sqrt( dx*dx + dy*dy );			//（原公式）
	//var x = dx / dr;
	//var y = dy / dr;
	var square_r = dx*dx + dy*dy;
	var x = Math.sqrt( dx*dx*square_r )/square_r;	//（用乘法提高精度）
	var y = Math.sqrt( dy*dy*square_r )/square_r;
	if( dx < 0 ){ x = -x; }
	if( dy < 0 ){ y = -y; }
	
	return { 'x':x, 'y':y };
};
//==============================
// * 刀光计算 - 数学工具 - 计算点A朝向点B的角度
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//			返回：	> 数字      （角度，0 至 360 之间）
//			
//			说明：	> 0度朝右，90度朝下，180度朝左，270度朝上。
//					> 若两点重合，返回 270 。
//==============================
Game_Temp.prototype.drill_HDSSW_Math2D_getPointToPointDegree = function( x1,y1,x2,y2 ){
	var degree = 0;
	
	// > arctan不能为0情况
	if( x2 == x1 ){
		if( y2 > y1 ){
			degree = 90;
		}else{
			degree = 270;
		}
	}else if( y2 == y1 ){
		if( x2 > x1 ){
			degree = 0;
		}else{
			degree = 180;
		}
	
	// > arctan正常计算
	}else{
		degree = Math.atan( (y2 - y1)/(x2 - x1) );
		degree = degree / Math.PI * 180;
		if( x2 < x1 ){
			degree += 180;
		}
	}
	
	// > 修正值
	degree = degree % 360;
	if( degree < 0 ){ degree += 360; }
	
	return degree;
};


//=============================================================================
// ** ☆魔法圈控制器创建
//
//			说明：	> 此模块专门管理 控制器 的创建与销毁。
//					> 遍历控制器 切割平面，如果切到了，添加控制器，原控制器使用A多边形，新控制器使用B多边形。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 魔法圈控制器创建 - 界面创建时（地图界面）
//==============================
var _drill_HDSSW_circle_mapCreate_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_HDSSW_circle_mapCreate_createAllWindows.call(this);
	this.drill_HDSSW_sceneCircleCreate();
};
//==============================
// * 魔法圈控制器创建 - 界面创建 （地图界面）
//
//			说明：	> 界面创建时，贴图 需要根据 控制器 情况进行创建。只创建贴图。
//==============================
Scene_Map.prototype.drill_HDSSW_sceneCircleCreate = function() {
	var cur_scene = SceneManager._scene;
	
	// > 界面创建 - 刀光贴图
	$gameTemp._drill_HDSSW_circleSpriteTank = [];			//贴图容器（不允许出现null值）
	for(var i=0; i < $gameSystem._drill_HDSSW_circleControllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSSW_circleControllerTank[i];
		var data = temp_controller._drill_data;
		
		// > 如果关闭，则不创建
		if( cur_scene instanceof Scene_Map && data['map_enabled'] != true ){ continue; }
		if( cur_scene instanceof Scene_Battle && data['battle_enabled'] != true ){ continue; }
		if( cur_scene instanceof Scene_MenuBase && data['menu_enabled'] != true ){ continue; }
		
		var temp_sprite = new Drill_HDSSW_CircleSprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 添加贴图到层级（天窗层）
		$gameTemp._drill_HDSSW_circleSpriteTank.push( temp_sprite );
		Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
	}
	
	
	// > 界面创建 - 切割白背景贴图
	if( $gameSystem._drill_HDSSW_backgroundController != undefined ){
		var temp_controller = $gameSystem._drill_HDSSW_backgroundController;
		var data = temp_controller._drill_data;
		
		// > 销毁旧贴图
		var temp_sprite = $gameSystem._drill_HDSSW_backgroundSprite;
		if( temp_sprite != undefined ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );
			temp_sprite.drill_sprite_destroy();
		}
		
		// > 如果关闭，则不创建
		var enabled = true;
		if( cur_scene instanceof Scene_Map && data['map_enabled'] != true ){ enabled = false; }
		if( cur_scene instanceof Scene_Battle && data['battle_enabled'] != true ){ enabled = false; }
		if( cur_scene instanceof Scene_MenuBase && data['menu_enabled'] != true ){ enabled = false; }
		
		if( enabled ){
			var temp_sprite = new Drill_HDSSW_CircleSprite();
			temp_sprite.drill_sprite_setController( temp_controller );
			temp_sprite.drill_sprite_initChild();
			
			// > 添加贴图到层级（天窗层）
			$gameTemp._drill_HDSSW_backgroundSprite = temp_sprite;
			Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
		}
	}
	
	// > 界面创建 - 切割白闪烁贴图
	if( $gameSystem._drill_HDSSW_flickerController != undefined ){
		var temp_controller = $gameSystem._drill_HDSSW_flickerController;
		var data = temp_controller._drill_data;
		
		// > 销毁旧贴图
		var temp_sprite = $gameSystem._drill_HDSSW_flickerSprite;
		if( temp_sprite != undefined ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );
			temp_sprite.drill_sprite_destroy();
		}
		
		// > 如果关闭，则不创建
		var enabled = true;
		if( cur_scene instanceof Scene_Map && data['map_enabled'] != true ){ enabled = false; }
		if( cur_scene instanceof Scene_Battle && data['battle_enabled'] != true ){ enabled = false; }
		if( cur_scene instanceof Scene_MenuBase && data['menu_enabled'] != true ){ enabled = false; }
		
		if( enabled ){
			var temp_sprite = new Drill_HDSSW_CircleSprite();
			temp_sprite.drill_sprite_setController( temp_controller );
			temp_sprite.drill_sprite_initChild();
			
			// > 添加贴图到层级（天窗层）
			$gameTemp._drill_HDSSW_flickerSprite = temp_sprite;
			Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
		}
	}
	
	
	// > 层级排序（天窗层）
	Graphics.drill_CODS_sortByZIndex();
}

//==============================
// * 魔法圈控制器创建 - 帧刷新 单次切割（继承）（地图界面）
//
//			说明：	> 在执行单次切割时，需要创建 控制器+贴图 。
//==============================
Scene_Map.prototype.drill_HDSSW_executeCircleCut = function( cur_cut ){
	var temp_style = DrillUp.g_HDSSW_style[ cur_cut['style_id'] ];
	
	
	// > 控制器创建 - 刀光 （只有这里创建对应的控制器）
	var controller_add_list = [];
	var points = $gameTemp.drill_HDSSW_getCircleTwoPoint( cur_cut['x1'], cur_cut['y1'], cur_cut['x2'], cur_cut['y2'] );
	if( points != null ){
		var temp_data = {};
		temp_data['zIndex'] = temp_style['zIndex'] +1;
		temp_data['map_enabled'] = temp_style['map_enabled'];
		temp_data['battle_enabled'] = temp_style['battle_enabled'];
		temp_data['menu_enabled'] = temp_style['menu_enabled'];
		
		temp_data['circle_img_src'] = temp_style['knife_img_src'];
		
		temp_data['opacity'] = temp_style['opacity'];
		temp_data['rotate'] = $gameTemp.drill_HDSSW_Math2D_getPointToPointDegree( points[0]['x'],points[0]['y'], points[1]['x'],points[1]['y'] );
		//temp_data['rotate'] = $gameTemp.drill_HDSSW_Math2D_getPointToPointDegree( cur_cut['x1'], cur_cut['y1'], cur_cut['x2'], cur_cut['y2'] );
		//（两点被延长后，按常规来说，计算的角度不会出现偏差，但是这里有偏差，可能是精度问题，暂时不明原因）
		//alert( JSON.stringify(cur_cut) );
		//alert( JSON.stringify(points) );
		
		var temp_controller = new Drill_HDSSW_CircleController( temp_data );	//（切一刀只创建一个）
		temp_controller.drill_controller_setKnifeMode( points[0], points[1], temp_style['move_time'] );
		controller_add_list.push( temp_controller );
	}
	
	
	// > 控制器创建 - 切割白背景 （只有这里创建对应的控制器）
	if( $gameSystem._drill_HDSSW_backgroundController == undefined ){
		var temp_data = {};
		temp_data['zIndex'] = temp_style['zIndex'] -1;
		temp_data['map_enabled'] = temp_style['map_enabled'];
		temp_data['battle_enabled'] = temp_style['battle_enabled'];
		temp_data['menu_enabled'] = temp_style['menu_enabled'];
		
		temp_data['circle_img_src'] = temp_style['background_img_src'];
		temp_data['flicker_time'] = temp_style['flicker_time'];
		
		temp_data['opacity'] = temp_style['opacity'];
		temp_data['rotate'] = 0;
		
		var temp_controller = new Drill_HDSSW_CircleController( temp_data );
		temp_controller.drill_controller_setFlickerMode();
		$gameSystem._drill_HDSSW_backgroundController = temp_controller;
	}
	$gameSystem._drill_HDSSW_backgroundController.drill_controller_setVisible( true );
	
	
	// > 控制器创建 - 切割白闪烁 （只有这里创建对应的控制器）
	if( $gameSystem._drill_HDSSW_flickerController == undefined ){
		var temp_data = {};
		temp_data['zIndex'] = temp_style['zIndex'] +1;
		temp_data['map_enabled'] = temp_style['map_enabled'];
		temp_data['battle_enabled'] = temp_style['battle_enabled'];
		temp_data['menu_enabled'] = temp_style['menu_enabled'];
		
		temp_data['circle_img_src'] = temp_style['flicker_img_src'];
		temp_data['flicker_time'] = temp_style['flicker_time'];
		
		temp_data['opacity'] = temp_style['flicker_opacity'];
		temp_data['rotate'] = 0;
		
		var temp_controller = new Drill_HDSSW_CircleController( temp_data );
		temp_controller.drill_controller_setFlickerMode();
		$gameSystem._drill_HDSSW_flickerController = temp_controller;
	}
	$gameSystem._drill_HDSSW_flickerController.drill_controller_setVisible( true );
	$gameSystem._drill_HDSSW_flickerController.drill_controller_playOnceFlicker();
	
	// > 贴图创建 - 刀光
	for( var i =0; i < controller_add_list.length; i++ ){
		var temp_controller = controller_add_list[i];
		
		// > 添加到 容器
		$gameSystem._drill_HDSSW_circleControllerTank.push( temp_controller );
		
		// > 贴图创建
		var temp_sprite = new Drill_HDSSW_CircleSprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 添加贴图到层级（天窗层）
		$gameTemp._drill_HDSSW_circleSpriteTank.push( temp_sprite );
		Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
	}
	
	// > 贴图创建 - 切割白背景
	if( $gameSystem._drill_HDSSW_backgroundController != undefined &&
		$gameTemp._drill_HDSSW_backgroundSprite == undefined ){
		
		// > 贴图创建
		var temp_sprite = new Drill_HDSSW_CircleSprite();
		temp_sprite.drill_sprite_setController( $gameSystem._drill_HDSSW_backgroundController );
		temp_sprite.drill_sprite_initChild();
		
		// > 添加贴图到层级（天窗层）
		$gameTemp._drill_HDSSW_backgroundSprite = temp_sprite;
		Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
	}
	
	// > 贴图创建 - 切割白闪烁
	if( $gameSystem._drill_HDSSW_flickerController != undefined &&
		$gameTemp._drill_HDSSW_flickerSprite == undefined ){
		
		// > 贴图创建
		var temp_sprite = new Drill_HDSSW_CircleSprite();
		temp_sprite.drill_sprite_setController( $gameSystem._drill_HDSSW_flickerController );
		temp_sprite.drill_sprite_initChild();
		
		// > 添加贴图到层级（天窗层）
		$gameTemp._drill_HDSSW_flickerSprite = temp_sprite;
		Graphics.drill_CODS_overstoryLayerAddSprite( temp_sprite );
	}
	
	
	// > 层级排序（天窗层）
	Graphics.drill_CODS_sortByZIndex();
	
};
Scene_Battle.prototype.drill_HDSSW_executeCircleCut = Scene_Map.prototype.drill_HDSSW_executeCircleCut;
Scene_MenuBase.prototype.drill_HDSSW_executeCircleCut = Scene_Map.prototype.drill_HDSSW_executeCircleCut;

//==============================
// * 魔法圈控制器创建 - 界面创建时（战斗界面）
//==============================
var _drill_HDSSW_circle_battleCreate_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_HDSSW_circle_battleCreate_createAllWindows.call(this);
	this.drill_HDSSW_sceneCircleCreate();
};
//==============================
// * 魔法圈控制器创建 - 界面创建 （战斗界面）
//==============================
Scene_Battle.prototype.drill_HDSSW_sceneCircleCreate = Scene_Map.prototype.drill_HDSSW_sceneCircleCreate;

//==============================
// * 魔法圈控制器创建 - 界面创建时（菜单界面）
//==============================
var _drill_HDSSW_circle_menuCreate_createWindowLayer = Scene_MenuBase.prototype.createWindowLayer;
Scene_MenuBase.prototype.createWindowLayer = function() {
	_drill_HDSSW_circle_menuCreate_createWindowLayer.call(this);
	this.drill_HDSSW_sceneCircleCreate();
};
//==============================
// * 魔法圈控制器创建 - 界面创建 （菜单界面）
//==============================
Scene_MenuBase.prototype.drill_HDSSW_sceneCircleCreate = Scene_Map.prototype.drill_HDSSW_sceneCircleCreate;



//=============================================================================
// ** ☆魔法圈控制器与贴图
//
//			说明：	> 此模块专门管理 贴图 的帧刷新与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 魔法圈控制器与贴图 - 容器初始化
//==============================
var _drill_HDSSW_circle_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_HDSSW_circle_temp_initialize.call(this);
	this._drill_HDSSW_circleSpriteTank = [];		//贴图容器 - 刀光
	this._drill_HDSSW_backgroundSprite = null;		//贴图 - 切割白背景
	this._drill_HDSSW_flickerSprite = null;			//贴图 - 切割白闪烁
	Graphics.drill_CODS_overstoryLayerClear();		//清空 天窗层
};
//==============================
// * 魔法圈控制器与贴图 - 立即清除全部碎片（继承）
//			
//			说明：	> 设置控制器销毁标记，贴图和控制器 在帧刷新时会自动销毁。
//==============================
var _drill_HDSSW_circle_clearAll = Game_System.prototype.drill_HDSSW_clearAll;
Game_System.prototype.drill_HDSSW_clearAll = function() {
	_drill_HDSSW_circle_clearAll.call( this );
	
	// > 清除全部 - 刀光 控制器
	for(var i = 0; i < $gameSystem._drill_HDSSW_circleControllerTank.length; i++ ){
		var controller = $gameSystem._drill_HDSSW_circleControllerTank[i];
		controller.drill_controller_destroy();
	}
	
	// > 清除全部 - 切割白背景 控制器
	if( $gameSystem._drill_HDSSW_backgroundController != undefined ){
		$gameSystem._drill_HDSSW_backgroundController.drill_controller_destroy();
	}
	
	// > 清除全部 - 切割白闪烁 控制器
	if( $gameSystem._drill_HDSSW_flickerController != undefined ){
		$gameSystem._drill_HDSSW_flickerController.drill_controller_destroy();
	}
};

//==============================
// * 魔法圈控制器与贴图 - 销毁时（地图界面）
//==============================
var _drill_HDSSW_circle_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_HDSSW_circle_smap_terminate.call(this);
	$gameTemp._drill_HDSSW_circleSpriteTank = [];	//贴图容器 - 刀光
	Graphics.drill_CODS_overstoryLayerClear();		//清空 天窗层
};
//==============================
// * 魔法圈控制器与贴图 - 帧刷新（地图界面）
//==============================
var _drill_HDSSW_circle_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_HDSSW_circle_smap_update.call(this);
	this.drill_HDSSW_updateCircleController();		//帧刷新 - 控制器
	this.drill_HDSSW_updateCircleDestroy();			//帧刷新 - 销毁
};
//==============================
// * 魔法圈控制器与贴图 - 帧刷新 控制器（地图界面）
//==============================
Scene_Map.prototype.drill_HDSSW_updateCircleController = function() {
	for(var i = 0; i < $gameSystem._drill_HDSSW_circleControllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_HDSSW_circleControllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器帧刷新 - 刀光
		temp_controller.drill_controller_update();
	}
	
	// > 控制器帧刷新 - 切割白背景
	if( $gameSystem._drill_HDSSW_backgroundController != undefined ){
		$gameSystem._drill_HDSSW_backgroundController.drill_controller_update();
	}
	
	// > 控制器帧刷新 - 切割白闪烁
	if( $gameSystem._drill_HDSSW_flickerController != undefined ){
		$gameSystem._drill_HDSSW_flickerController.drill_controller_update();
	}
}
//==============================
// * 魔法圈控制器与贴图 - 帧刷新 销毁（地图界面）
//==============================
Scene_Map.prototype.drill_HDSSW_updateCircleDestroy = function() {
	
	// > 自动销毁 - 刀光 控制器
	for(var i = $gameSystem._drill_HDSSW_circleControllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_HDSSW_circleControllerTank[i];
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_HDSSW_circleControllerTank.splice(i,1);
		}
	}
	// > 自动销毁 - 刀光 贴图
	for(var i = $gameTemp._drill_HDSSW_circleSpriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_HDSSW_circleSpriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_HDSSW_circleSpriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
	
	// > 自动销毁 - 切割白背景 控制器
	if( $gameSystem._drill_HDSSW_backgroundController != undefined &&
		$gameSystem._drill_HDSSW_backgroundController.drill_controller_isDead() ){
		$gameSystem._drill_HDSSW_backgroundController = null;
	}
	// > 自动销毁 - 切割白背景 贴图
	var temp_sprite = $gameTemp._drill_HDSSW_backgroundSprite;
	if( temp_sprite != undefined &&
		temp_sprite.drill_sprite_isNeedDestroy() ){
		Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//（销毁贴图）
		temp_sprite.drill_sprite_destroy();
		$gameTemp._drill_HDSSW_backgroundSprite = null;
	}
	
	// > 自动销毁 - 切割白闪烁 控制器
	if( $gameSystem._drill_HDSSW_flickerController != undefined &&
		$gameSystem._drill_HDSSW_flickerController.drill_controller_isDead() ){
		$gameSystem._drill_HDSSW_flickerController = null;
	}
	// > 自动销毁 - 切割白闪烁 贴图
	var temp_sprite = $gameTemp._drill_HDSSW_flickerSprite;
	if( temp_sprite != undefined &&
		temp_sprite.drill_sprite_isNeedDestroy() ){
		Graphics.drill_CODS_overstoryLayerRemoveSprite( temp_sprite );	//（销毁贴图）
		temp_sprite.drill_sprite_destroy();
		$gameTemp._drill_HDSSW_flickerSprite = null;
	}
};

//==============================
// * 魔法圈控制器与贴图 - 销毁时（战斗界面）
//==============================
var _drill_HDSSW_circle_sbattle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_HDSSW_circle_sbattle_terminate.call(this);
	$gameTemp._drill_HDSSW_circleSpriteTank = [];	//贴图容器（魔法圈贴图）
	Graphics.drill_CODS_overstoryLayerClear();		//清空 天窗层
};
//==============================
// * 魔法圈控制器与贴图 - 帧刷新（战斗界面）
//==============================
var _drill_HDSSW_circle_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_HDSSW_circle_sbattle_update.call(this);
	this.drill_HDSSW_updateCircleController();		//帧刷新 - 控制器
	this.drill_HDSSW_updateCircleDestroy();			//帧刷新 - 销毁
};
//==============================
// * 魔法圈控制器与贴图 - 帧刷新 控制器（战斗界面）
//==============================
Scene_Battle.prototype.drill_HDSSW_updateCircleController = Scene_Map.prototype.drill_HDSSW_updateCircleController;
//==============================
// * 魔法圈控制器与贴图 - 帧刷新 销毁（战斗界面）
//==============================
Scene_Battle.prototype.drill_HDSSW_updateCircleDestroy = Scene_Map.prototype.drill_HDSSW_updateCircleDestroy;

//==============================
// * 魔法圈控制器与贴图 - 销毁时（菜单界面）
//==============================
var _drill_HDSSW_circle_smenu_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_HDSSW_circle_smenu_terminate.call(this);
	$gameTemp._drill_HDSSW_circleSpriteTank = [];	//贴图容器（魔法圈贴图）
	Graphics.drill_CODS_overstoryLayerClear();		//清空 天窗层
};
//==============================
// * 魔法圈控制器与贴图 - 帧刷新（菜单界面）
//==============================
var _drill_HDSSW_circle_smenu_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_HDSSW_circle_smenu_update.call(this);
	this.drill_HDSSW_updateCircleController();		//帧刷新 - 控制器
	this.drill_HDSSW_updateCircleDestroy();			//帧刷新 - 销毁
};
//==============================
// * 魔法圈控制器与贴图 - 帧刷新 控制器（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_HDSSW_updateCircleController = Scene_Map.prototype.drill_HDSSW_updateCircleController;
//==============================
// * 魔法圈控制器与贴图 - 帧刷新 销毁（菜单界面）
//==============================
Scene_MenuBase.prototype.drill_HDSSW_updateCircleDestroy = Scene_Map.prototype.drill_HDSSW_updateCircleDestroy;



//=============================================================================
// ** 魔法圈控制器【Drill_HDSSW_CircleController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个专门控制简单贴图的数据类。
// **		子功能：	->魔法圈控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **					->B基本变化
// **					->2A闪烁模式
// **					->2B刀光模式
// **		
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 魔法圈控制器 - 定义
//==============================
function Drill_HDSSW_CircleController(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 魔法圈控制器 - 校验标记
//==============================
DrillUp.g_HDSSW_checkNaN = true;
//==============================
// * 魔法圈控制器 - 初始化
//==============================
Drill_HDSSW_CircleController.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 魔法圈控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_controller_updateAttr();					//帧刷新 - A主体
	this.drill_controller_updateChange_Position();		//帧刷新 - B基本变化 - 平移
	this.drill_controller_updateFlicker();				//帧刷新 - 2A闪烁模式
	this.drill_controller_updateKnife();				//帧刷新 - 2B刀光模式
	this.drill_controller_updateCheckNaN();				//帧刷新 - A主体 - 校验值
}
//##############################
// * 魔法圈控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};
//##############################
// * 魔法圈控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 魔法圈控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 魔法圈控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 魔法圈控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_isDead = function(){
	if( this._drill_mode == "flicker" && this._drill_knife_curTime > this._drill_knife_tarTime ){ return true }
	return this._drill_needDestroy == true;
};

//##############################
// * 2A闪烁模式 - 设置为闪烁模式【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_setFlickerMode = function(){
	this._drill_mode = "flicker";
};
//##############################
// * 2A闪烁模式 - 播放闪烁【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_playOnceFlicker = function(){
	this._drill_flicker_enabled = true;
	this._drill_flicker_opacity = 155;
};

//##############################
// * 2B刀光模式 - 设置为刀光模式【开放函数】
//			
//			参数：	> start_point 开始点
//					> end_point 结束点
//					> move_time 持续时长
//			返回：	> 无
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_setKnifeMode = function( start_point, end_point, move_time ){
	this._drill_mode = "knife";
	
	this._drill_knife_curTime = 0;
	this._drill_knife_tarTime = move_time;
	var data = {};
	data['movementNum'] = 1; 
	data['movementTime'] = move_time; 
	data['movementMode'] = "两点式"; 
	data['twoPointType'] = "匀速移动"; 
	data['twoPointDifferenceX'] = end_point.x - start_point.x; 
	data['twoPointDifferenceY'] = end_point.y - start_point.y; 
	$gameTemp.drill_COBa_setBallisticsMove( data );
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, start_point.x, start_point.y );
	this._drill_knife_ballisticsX = this['_drill_COBa_x'];
	this._drill_knife_ballisticsY = this['_drill_COBa_y'];
	this['_drill_COBa_x'] = null;
	this['_drill_COBa_y'] = null;
};

//##############################
// * 魔法圈控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_HDSSW_CircleController.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 魔法圈控制器
	if( data['visible'] == undefined ){ data['visible'] = true };				//魔法圈控制器 - 显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };					//魔法圈控制器 - 暂停情况
	
	// > 魔法圈贴图
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };					//魔法圈贴图 - 图片层级
	
	// > A主体（无）
	
	// > B基本变化
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };				//B基本变化 - 透明度
	if( data['rotate'] == undefined ){ data['rotate'] = 0 };					//B基本变化 - 旋转角度
}
//==============================
// * 魔法圈控制器 - 初始化子功能
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	this.drill_controller_initChange();			//初始化子功能 - B基本变化
	this.drill_controller_initFlicker();		//初始化子功能 - 2A闪烁模式
	this.drill_controller_initKnife();			//初始化子功能 - 2B刀光模式
}
//==============================
// * 魔法圈控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_resetData_Private = function( data ){
	
	// > 判断数据重复情况
	if( this._drill_data != undefined ){
		var keys = Object.keys( data );
		var is_same = true;
		for( var i=0; i < keys.length; i++ ){
			var key = keys[i];
			if( this._drill_data[key] != data[key] ){
				is_same = false;
			}
		}
		if( is_same == true ){ return; }
	}
	// > 补充未设置的数据
	var keys = Object.keys( this._drill_data );
	for( var i=0; i < keys.length; i++ ){
		var key = keys[i];
		if( data[key] == undefined ){
			data[key] = this._drill_data[key];
		}
	}
	
	// > 执行重置
	this._drill_data = JSON.parse(JSON.stringify( data ));					//深拷贝
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;				//常规 - 当前时间
	this._drill_needDestroy = false;		//常规 - 销毁
	
	this._drill_mode = "";					//常规 - 当前模式
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_HDSSW_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_HDSSW_checkNaN = false;
			alert( DrillUp.drill_HDSSW_getPluginTip_ParamIsNaN( "_drill_x" ) );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_HDSSW_checkNaN = false;
			alert( DrillUp.drill_HDSSW_getPluginTip_ParamIsNaN( "_drill_y" ) );
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_HDSSW_checkNaN = false;
			alert( DrillUp.drill_HDSSW_getPluginTip_ParamIsNaN( "_drill_opacity" ) );
		}
	}
}

//==============================
// * B基本变化 - 初始化子功能
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initChange = function() {
	var data = this._drill_data;
	
	// > 贴图 - 位置
	this._drill_x = 0;
	this._drill_y = 0;
	
	// > 贴图 - 透明度
	this._drill_opacity = data['opacity'];
	
	// > 贴图 - 缩放（无）
	
	// > 贴图 - 旋转
	this._drill_rotation = data['rotate'];
}
//==============================
// * B基本变化 - 帧刷新 位置
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_updateChange_Position = function(){
	var data = this._drill_data;
	
	// > 贴图 - 位置
	var xx = 0;
	var yy = 0;
	this._drill_x = xx;
	this._drill_y = yy;
}


//==============================
// * 2A闪烁模式 - 初始化子功能
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initFlicker = function() {
	var data = this._drill_data;
	
	this._drill_flicker_enabled = false;
	this._drill_flicker_opacity = 0;
}
//==============================
// * 2A闪烁模式 - 帧刷新 位置
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_updateFlicker = function(){
	if( this._drill_mode != "flicker" ){ return; }
	var data = this._drill_data;
	
	// > 闪烁模式时，位置居中
	this._drill_x += Graphics.boxWidth *0.5;		//（中心锚点位置）
	this._drill_y += Graphics.boxHeight *0.5;
	
	// > 闪烁透明度变化
	if( this._drill_flicker_enabled != true ){ return; }
	this._drill_opacity = this._drill_flicker_opacity;
	
	var diff = 255 / data['flicker_time'];
	this._drill_flicker_opacity -= diff;
	if( this._drill_flicker_opacity < 0-diff ){
		this._drill_flicker_enabled = false;
	}
}

//==============================
// * 2B刀光模式 - 初始化子功能
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_initKnife = function() {
	var data = this._drill_data;
	
	this._drill_knife_curTime = 0;
	this._drill_knife_tarTime = 20;
}
//==============================
// * 2B刀光模式 - 帧刷新 位置
//==============================
Drill_HDSSW_CircleController.prototype.drill_controller_updateKnife = function(){
	if( this._drill_mode != "knife" ){ return; }
	
	// > 弹道
	if( this._drill_knife_ballisticsX == null ){
		this._drill_x += 0;
		this._drill_y += 0;
	}else{
		
		// > 播放弹道
		var time = this._drill_knife_curTime;
		if( time < 0 ){ time = 0; }
		if( time > this._drill_knife_ballisticsX.length-1 ){ time = this._drill_knife_ballisticsX.length-1; }
		this._drill_x += this._drill_knife_ballisticsX[time];
		this._drill_y += this._drill_knife_ballisticsY[time];
		
		// > 时间+1
		this._drill_knife_curTime += 1;
	}
}



//=============================================================================
// ** 魔法圈贴图【Drill_HDSSW_CircleSprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个动态快照贴图。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					->A主体
// **					->B基本变化
// **					->C对象绑定
// **						->设置魔法圈控制器
// **						->贴图初始化（手动）
// **					->2A闪烁模式
// **					->2B刀光模式
// **
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 控制器与贴图 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 魔法圈贴图 - 定义
//==============================
function Drill_HDSSW_CircleSprite() {
    this.initialize.apply(this, arguments);
};
Drill_HDSSW_CircleSprite.prototype = Object.create(Sprite.prototype);
Drill_HDSSW_CircleSprite.prototype.constructor = Drill_HDSSW_CircleSprite;
//==============================
// * 魔法圈贴图 - 初始化
//==============================
Drill_HDSSW_CircleSprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 魔法圈贴图 - 帧刷新
//==============================
Drill_HDSSW_CircleSprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A主体
	this.drill_sprite_updateChange();				//帧刷新 - B基本变化
													//帧刷新 - C对象绑定（无）
													//帧刷新 - 2A闪烁模式（无）
													//帧刷新 - 2B刀光模式（无）
};

//##############################
// * C对象绑定 - 设置魔法圈控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * C对象绑定 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B基本变化
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initFlicker();			//初始化子功能 - 2A闪烁模式
	this.drill_sprite_initKnife();				//初始化子功能 - 2B刀光模式
};

//##############################
// * 魔法圈贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 魔法圈贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_isOptimizationPassed = function(){
	if( this._drill_controller._drill_data['visible'] == false ){	//（不显示时，不工作）
		
		// > 被优化时，必须控制可见
		this.visible = false;
		
		return false;
	}
    return true;
};
//##############################
// * 魔法圈贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 魔法圈贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_HDSSW_CircleSprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 魔法圈贴图 - 贴图初始化（私有）
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 魔法圈贴图 - 销毁子功能（私有）
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	
	// > 销毁 - B基本变化
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
};
//==============================
// * 魔法圈贴图 - 销毁自身（私有）
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller._drill_data;
	
	// > 属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.blendMode = 0;
	this.zIndex = data['zIndex'];
	this.visible = false;
	
	this.bitmap = ImageManager.loadBitmap( "img/Special__layer/", data['circle_img_src'], 0, true );
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_updateAttr = function() {
	var data = this._drill_controller._drill_data;
	
	// > 贴图 - 贴图属性
	this.visible = data['visible'];
	this.opacity = this._drill_controller._drill_opacity;
	this.rotation = this._drill_controller._drill_rotation *Math.PI/180;	//（整体再旋转角度)
}


//==============================
// * B基本变化 - 初始化子功能
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initChange = function(){
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * B基本变化 - 帧刷新
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_updateChange = function() {
	var data = this._drill_controller._drill_data;
	
	// > 位置
	this.x = this._drill_controller._drill_x;
	this.y = this._drill_controller._drill_y;
	
	// > 透明度（见 A主体）
	
	// > 缩放（无）
	
	// > 旋转（见 A主体）
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * 2A闪烁模式 - 初始化子功能
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initFlicker = function(){
	//（无）
}


//==============================
// * 2B刀光模式 - 初始化子功能
//==============================
Drill_HDSSW_CircleSprite.prototype.drill_sprite_initKnife = function(){
	//（无）
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_HtmlDynamicSnapshotSpaceWrench = false;
		var pluginTip = DrillUp.drill_HDSSW_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

