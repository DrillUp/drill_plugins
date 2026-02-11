//=============================================================================
// Drill_ForcePreload.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        管理器 - 强制预加载文件夹
 * @author Drill_up
 * 
 * @Drill_LE_param "文件夹路径-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_FPr_fileSet_list_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_ForcePreload +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 指定一个文件夹，文件夹下的所有图片都能被预加载。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于整个游戏。
 * 2.详细可以去看看"1.系统 > 关于预加载.docx"。
 * 文件夹：
 *   (1.该插件提供一次性对文件夹下的所有图片文件，进行预加载功能。
 *      但是注意，并不是所有图片适合开预加载，预加载也有缺点，详细去看文档说明。
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
 * 工作类型：   单次执行
 * 时间复杂度： o(n)
 * 测试方法：   打开游戏即进行性能测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件只在游戏初始化时执行一次全部图片的预加载。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param ---文件夹路径列表---
 * @default 
 * 
 * @param 文件夹路径-1
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default img/pictures/
 * 
 * @param 文件夹路径-2
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-3
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-4
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-5
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-6
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-7
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-8
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-9
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-10
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-11
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-12
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-13
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-14
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-15
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-16
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-17
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-18
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-19
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 * @param 文件夹路径-20
 * @parent ---文件夹路径列表---
 * @desc 执行预加载的文件夹路径，注意路径格式为"img/xxx/"。
 * @default 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		FPr（Force_Preload）
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		无
//		★时间复杂度		无
//		★性能测试因素	无
//		★性能测试消耗	无
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
//			->☆预加载
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			暂无
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
	DrillUp.g_FPr_PluginTip_curName = "Drill_ForcePreload.js 管理器-强制预加载文件夹";
	DrillUp.g_FPr_PluginTip_baseList = [];
	//==============================
	// * 提示信息 - 报错 - 文件夹不存在
	//==============================
	DrillUp.drill_FPr_getPluginTip_FolderNotFind = function( dir_path ){
		return "【" + DrillUp.g_FPr_PluginTip_curName + "】\n预加载失败，指定的文件夹'" + dir_path + "'不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_FPr_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_FPr_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_ForcePreload = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_ForcePreload');
	
	
	/*-----------------文件夹路径------------------*/
	DrillUp.g_FPr_fileSet_list_length = 20;
	DrillUp.g_FPr_fileSet_list = [];
	for( var i = 1; i <= DrillUp.g_FPr_fileSet_list_length; i++ ){
		DrillUp.g_FPr_fileSet_list[i] = String( DrillUp.parameters["文件夹路径-" + String(i)] || "" );
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
var _drill_FPr_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_FPr_preload_initialize.call(this);
	this.drill_FPr_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_FPr_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_FPr_preloadInit = function() {
	this._drill_FPr_cacheId = Utils.generateRuntimeId();	//资源缓存id
    this._drill_FPr_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_FPr_fileSet_list.length; i++ ){
		var temp_path = DrillUp.g_FPr_fileSet_list[i];
		if( temp_path == undefined ){ continue; }
		if( temp_path == "" ){ continue; }
		
		// > 获取文件夹数据
		if( require == undefined ){ continue; }
		var r_fs = require('fs');
		var r_path = require('path');
		
		var base_path = r_path.dirname(process.mainModule.filename);
		var folder_path = r_path.join(base_path,temp_path);
		//alert( folder_path );
		
		// > 文件夹校验
		if( r_fs.existsSync(folder_path) != true ){
			alert( DrillUp.drill_FPr_getPluginTip_FolderNotFind(folder_path) );
			continue;
		}
		
		// > 遍历文件夹
		var file_list = r_fs.readdirSync( folder_path );
		//alert( file_list );
		for(var j = 0; j < file_list.length; j++ ){
			var file_name = file_list[j];
			var file_path = r_path.join(folder_path,file_name);
			var file_state = r_fs.statSync( file_path );
			
			// > 文件夹时
			if( file_state.isDirectory() ){
				//（不操作）
				
			// > 文件时
			}else{
				if( r_path.extname(file_name) == ".png" ){
					var base_name = r_path.basename(file_name);
					base_name = base_name.slice(0, base_name.lastIndexOf("."));
					this._drill_FPr_preloadTank.push( 
						ImageManager.reserveBitmap( temp_path, base_name, 0, true, this._drill_FPr_cacheId ) 
					);
				}	
			}
		}
	}
}

