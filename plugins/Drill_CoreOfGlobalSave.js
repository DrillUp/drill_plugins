//=============================================================================
// Drill_CoreOfGlobalSave.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        管理器 - 全局存储核心
 * @author Drill_up
 * 
 * @Drill_LE_param "文件路径-%d"
 * @Drill_LE_parentKey "---文件路径---"
 * @Drill_LE_var "DrillUp.g_COGS_fileSet_list_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_CoreOfGlobalSave +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以将 插件数据 全局存储到指定的文件夹路径。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 可作用于：
 *   - Drill_SceneSelfplateA        面板-全自定义信息面板A
 *   - Drill_SceneSelfplateC        面板-全自定义信息面板C
 *   - Drill_SceneSelfplateG        面板-全自定义信息面板G
 *   - Drill_SceneSelfplateI        面板-全自定义信息面板I
 *   ……
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面、菜单界面。
 *   作用于需要全局存储的数据。
 * 全局存储：
 *   (1.你可以完全自定义 文件名、文件路径、文件后缀，
 *      将指定的 全局数据 存储到玩家电脑中特殊的位置。
 *   (2.如果 配置的文件 创建失败，系统则会默认将数据存储在
 *      游戏根目录的save文件夹，文件名为：drill_globalDefault.rpgsave
 * 设计：
 *   (1.你可以将一些变量数据偷偷存在玩家的C盘目录，作为meta-game用。
 *      确定了存放位置之后就不要改了，以免多次更新时，玩家电脑里产生
 *      很多没用的存储文件。
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
 * 时间复杂度： o(n) 每帧
 * 测试方法：   在地图界面、战斗界面、菜单界面中测试。
 * 测试结果：   地图界面中，平均消耗为：【5ms以下】
 *              战斗界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.插件在每次 图形渲染 时，校验一次是否需要全局存储。子插件的
 *   数据如果变化，则会主动触发全局存储，并且只是单次执行，所以
 *   消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。
 * 
 * 
 * 
 * @param 全局存储轮询时间
 * @type number
 * @min 5
 * @max 120
 * @desc 全局存储检查变量的间隔。
 * @default 10
 *
 * @param ---文件路径---
 * @default 
 * 
 * @param 文件路径-1
 * @parent ---文件路径---
 * @type struct<DrillFile>
 * @desc 指定全局数据所存储或载入的文件路径设置。
 * @default 
 *
 * @param 文件路径-2
 * @parent ---文件路径---
 * @type struct<DrillFile>
 * @desc 指定全局数据所存储或载入的文件路径设置。
 * @default 
 *
 * @param 文件路径-3
 * @parent ---文件路径---
 * @type struct<DrillFile>
 * @desc 指定全局数据所存储或载入的文件路径设置。
 * @default 
 *
 * @param 文件路径-4
 * @parent ---文件路径---
 * @type struct<DrillFile>
 * @desc 指定全局数据所存储或载入的文件路径设置。
 * @default 
 *
 * @param 文件路径-5
 * @parent ---文件路径---
 * @type struct<DrillFile>
 * @desc 指定全局数据所存储或载入的文件路径设置。
 * @default 
 *
 * @param 文件路径-6
 * @parent ---文件路径---
 * @type struct<DrillFile>
 * @desc 指定全局数据所存储或载入的文件路径设置。
 * @default 
 *
 * @param 文件路径-7
 * @parent ---文件路径---
 * @type struct<DrillFile>
 * @desc 指定全局数据所存储或载入的文件路径设置。
 * @default 
 *
 * @param 文件路径-8
 * @parent ---文件路径---
 * @type struct<DrillFile>
 * @desc 指定全局数据所存储或载入的文件路径设置。
 * @default 
 * 
 */
/*~struct~DrillFile:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的文件路径--
 * 
 * @param 文件名
 * @desc 全局存储的文件名。
 * @default drill_global
 * 
 * @param 文件后缀
 * @desc 全局存储的文件后缀。
 * @default rpgsave
 * 
 * @param 文件夹根目录
 * @type select
 * @option 当前游戏根目录
 * @value 当前游戏根目录
 * @option C盘路径
 * @value C盘路径
 * @desc 注意，这里的文件夹路径是 玩家 电脑的路径。如果游戏部署到服务器上，那么路径为服务器的路径。
 * @default 当前游戏根目录
 *
 * @param 文件夹路径
 * @parent 文件夹路径类型
 * @desc 格式为"aaa/bbb/"，若根目录为C盘目录，则表示"C:/aaa/bbb/"。文件夹不存在时会自动创建。
 * @default save/
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COGS（Core_Of_Dynamic_Mask）
//		临时全局变量	DrillUp.g_COGS_xxx
//		临时局部变量	this._drill_COGS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	初始点
//		★性能测试消耗	未找到
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			全局存储核心：
//				->存储数据
//				->存储管理器
//
//		★必要注意事项：
//			1.详细去看看 StorageManager 存储管理器的定义，全局存储再次基础上扩展。
//
//		★其它说明细节：
//			暂无
//				
//		★存在的问题：
//			暂无
//


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfGlobalSave = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfGlobalSave');


	//==============================
	// * 变量获取 - 文件路径
	//				（~struct~DrillFile）
	//==============================
	DrillUp.drill_COGS_initFile = function( dataFrom ){
		var data = {};
		data['name'] = String( dataFrom["文件名"] || "drill_global");
		data['suffix'] = String( dataFrom["文件后缀"] || "rpgsave");
		data['url_type'] = String( dataFrom["文件夹根目录"] || "当前游戏根目录");
		data['url_path'] = String( dataFrom["文件夹路径"] || "save/");
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_COGS_saveTimeDelay = Number(DrillUp.parameters['全局存储轮询时间'] || 10);
	
	/*-----------------文件路径------------------*/
	DrillUp.g_COGS_fileSet_list_length = 8;
	DrillUp.g_COGS_fileSet_list = [];
	DrillUp.g_COGS_fileSet_list[0] = DrillUp.drill_COGS_initFile( {} );		//（强制默认值）
	DrillUp.g_COGS_fileSet_list[0]['name'] = "drill_globalDefault"
	for( var i = 1; i <= DrillUp.g_COGS_fileSet_list_length; i++ ){
		if( DrillUp.parameters['文件路径-' + String(i) ] != "" &&
			DrillUp.parameters['文件路径-' + String(i) ] != undefined ){
			var data = JSON.parse(DrillUp.parameters['文件路径-' + String(i)] );
			DrillUp.g_COGS_fileSet_list[i] = DrillUp.drill_COGS_initFile( data );
		}else{
			DrillUp.g_COGS_fileSet_list[i] = null;
		}
	};
	
	

//=============================================================================
// ** 存储数据
//=============================================================================
//==============================
// * 存储数据 - 定义
//==============================
	DrillUp.g_COGS_fileDataTank = [];		//存储数据（与文件路径一一对应）
	DrillUp.g_COGS_fileIdSeq = [];			//存储的ID队列
	DrillUp.g_COGS_time = 0;				//存储时间
//==============================
// * 存储数据 - 存储（接口）
//
//			参数：	file_id 文件路径id，param_name 参数名（通常用插件简称），param_data：参数数据
//==============================
StorageManager.drill_COGS_saveData = function( file_id, param_name, param_data ){
	var file_set = DrillUp.g_COGS_fileSet_list[ file_id ];
	if( file_set == undefined ){ 
		file_set = DrillUp.g_COGS_fileSet_list[0];
		file_id = 0;	//（找不到对象，则用默认路径）
	}
	
	// > 存储数据
	if( DrillUp.g_COGS_fileDataTank[ file_id ] == undefined ){
		DrillUp.g_COGS_fileDataTank[ file_id ] = {};
	}
	DrillUp.g_COGS_fileDataTank[ file_id ][ param_name ] = param_data;
	
	// > 存储文件标记
	if( DrillUp.g_COGS_fileIdSeq.contains( file_id ) == false ){
		DrillUp.g_COGS_fileIdSeq.push( file_id );
	}
};
//==============================
// * 存储数据 - 载入（接口）
//
//			参数：	file_id 文件路径id，param_name 参数名（通常用插件简称）
//==============================
StorageManager.drill_COGS_loadData = function( file_id, param_name ){
	
	// > 初次获取数据时，自动载入文件
	if( DrillUp.g_COGS_fileDataTank[ file_id ] == undefined ){ 
		var data = this.drill_COGS_loadFile( file_id );
		if( data == undefined ){ data = {}; }		//（读取后仍然为空，则赋值）
		DrillUp.g_COGS_fileDataTank[ file_id ] = data;
	}
	
	// > 获取数据
	var file_data = DrillUp.g_COGS_fileDataTank[ file_id ];
	if( file_data == undefined ){ return {}; }
	if( file_data[ param_name ] == undefined ){ return {}; }
	return file_data[ param_name ];
};

//==============================
// * 存储数据 - 延迟存储
//==============================
var _drill_COGS_update = SceneManager.updateScene;
SceneManager.updateScene = function() {
	_drill_COGS_update.call(this);
	
	// > 计时器
	DrillUp.g_COGS_time += 1;
	if( DrillUp.g_COGS_time > DrillUp.g_COGS_saveTimeDelay ){
		DrillUp.g_COGS_time = 0;
		
		// > 队列中有文件id时，存指定的文件
		if( DrillUp.g_COGS_fileIdSeq.length > 0 ){
			for( var i=0; i < DrillUp.g_COGS_fileIdSeq.length; i++ ){
				var file_id = DrillUp.g_COGS_fileIdSeq[i];
				StorageManager.drill_COGS_saveFile( file_id );
			}
			DrillUp.g_COGS_fileIdSeq.length = 0;
		}
	}
};


//=============================================================================
// ** 存储管理器
//=============================================================================
//==============================
// * 存储管理器 - 存储流程
//
//			参数：	file_id 文件路径id，param_name 参数名（通常用插件简称），param_data：参数数据。
//==============================
StorageManager.drill_COGS_saveFile = function( file_id ){
	var file_set = DrillUp.g_COGS_fileSet_list[ file_id ];		//文件路径
	if( file_set == undefined ){ return; }
	var file_data = DrillUp.g_COGS_fileDataTank[ file_id ];		//文件存储数据
	if( file_data == undefined ){ return; }
	
	// > 本地文件模式
    if (this.isLocalMode()) {
        this.drill_COGS_saveToLocalFile( file_set, JSON.stringify(file_data) );
    
	// > 本地网页模式
	} else {
        this.drill_COGS_saveToWebStorage( file_set, JSON.stringify(file_data) );
    }
};
//==============================
// * 存储管理器 - 读取流程
//==============================
StorageManager.drill_COGS_loadFile = function( file_id ){
	var file_set = DrillUp.g_COGS_fileSet_list[ file_id ];		//文件路径
	if( file_set == undefined ){ return {}; }
	
	// > 本地文件模式
    if( this.isLocalMode() ){
		var data = this.drill_COGS_loadFromLocalFile( file_set );
		if( data == "" ){ return null; }
        return JSON.parse( data );
		
	// > 本地网页模式
    }else{
        var data = this.drill_COGS_loadFromWebStorage( file_set );
		if( data == "" ){ return null; }
        return JSON.parse( data );
    }
};

//==============================
// * 文件 - 存储
//
//			说明：	传入的数据为字符串。
//==============================
StorageManager.drill_COGS_saveToLocalFile = function( file_set, json_str ){
	var fs = require('fs');
	
	// > 路径解析
	var fileRoot = "C:/"
	if( file_set['url_type'] == "当前游戏根目录" ){
		fileRoot = this.drill_COGS_parentDirectoryPath();
	}
	var filePath = fileRoot + file_set['url_path'] + file_set['name'] + "." + file_set['suffix'];
	var dirPath = fileRoot + file_set['url_path'];
	
	// > 加密
	var data = LZString.compressToBase64( json_str );
	
	// > 文件夹路径自动创建
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
	}
	
	// > 写入
	fs.writeFileSync(filePath, data);
};
//==============================
// * 文件 - 读取
//
//			说明：	返回的数据为字符串。
//==============================
StorageManager.drill_COGS_loadFromLocalFile = function( file_set ){
	var fs = require('fs');
	
	// > 路径解析
	var fileRoot = "C:/"
	if( file_set['url_type'] == "当前游戏根目录" ){
		fileRoot = this.drill_COGS_parentDirectoryPath();
	}
	var filePath = fileRoot + file_set['url_path'] + file_set['name'] + "." + file_set['suffix'];
	var data = null;
	
	// > 读取
	if( fs.existsSync(filePath) != true ){ return ""; }
	data = fs.readFileSync(filePath, { encoding: 'utf8' });
	
	// > 解密
	return LZString.decompressFromBase64(data);	//（返回字符串）
};
//==============================
// * 文件 - 根目录
//==============================
StorageManager.drill_COGS_parentDirectoryPath = function() {
    var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    return path.join(base, '/');
};

//==============================
// * 网页 - 存储
//==============================
StorageManager.drill_COGS_saveToWebStorage = function( file_set, json_str ){
    var key = this.webStorageKey( "RPG " + file_set['name'] );
    var data = LZString.compressToBase64( json_str );
    localStorage.setItem(key, data);
};
//==============================
// * 网页 - 读取
//==============================
StorageManager.drill_COGS_loadFromWebStorage = function( file_set ){
    var key = this.webStorageKey( "RPG " + file_set['name'] );
    var data = localStorage.getItem(key);
	if( data == undefined ){ return ""; }
    return LZString.decompressFromBase64(data);
};


