//=============================================================================
// Drill_ForceBitmapLinearScale.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        管理器 - 强制像素缩放
 * @author Drill_up
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_ForceBitmapLinearScale +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 开启后你可以使得所有贴图，都强制按像素缩放，而不进行平滑处理。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面、菜单界面。
 *   作用于事件指令。
 * 2.相关介绍可以看看文档："0.基本定义 > 缩放模式.docx"。
 * 缩放原理：
 *   (1.图像缩放有两种：模糊边缘缩放、像素邻近缩放。
 *      前者在缩放时会模糊图像边缘，后者在缩放时会保留像素锯齿效果。
 *   (2.这个插件修改底层规则，强制全部贴图按照像素缩放，而不进行平滑/模糊边缘处理。
 * 设计：
 *   (1.这个插件专用于全像素风格的游戏，使得所有图像缩放时，保留像素锯齿。
 *      注意，如果你提供的图片资源都不是像素风格的，那么缩放时不容易看出像素效果。
 *   (2.部分插件有参数 "图像-模糊边缘" 的设置，
 *      这个设置能切换 模糊边缘缩放 和 像素邻近缩放 。
 *      但注意，该插件会无视子插件的这个设置，强制全部变成 像素邻近缩放 。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令手动开启设置：
 * 
 * 插件指令：>强制像素缩放 : 开启
 * 插件指令：>强制像素缩放 : 关闭
 * 插件指令：>强制像素缩放 : 恢复默认
 * 
 * 1.插件指令修改后，所有贴图立刻生效。
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
 * 时间复杂度： o(n)*o(所有贴图)
 * 测试方法：   在各个界面中进行测试。
 * 测试结果：   战斗界面中，平均消耗为：【14.02ms】
 *              地图界面中，平均消耗为：【28.80ms】
 *              菜单界面中，平均消耗为：【13.47ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.注意，由于对所有贴图有效，贴图越多，消耗越大。
 *   该插件只控制像素缩放的开关，真实像素缩放的消耗表现在渲染器中。
 *   无论选择 模糊边缘缩放 还是 像素邻近缩放，都有消耗。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 *
 * @param 初始是否开启强制像素缩放
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。你还可以在游戏中通过插件指令开关此设置。
 * @default false
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		FBLS（Force_Bitmap_Linear_Scale）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(所有贴图)
//		★性能测试因素	管理器管理层
//		★性能测试消耗	2026/4/25：
//							》28.8ms（Sprite.drill_FBLS_update）
//							》因为绑定了 Sprite 基类，所以执行次数特别多，消耗也大。
//		★最坏情况		贴图越多，消耗越大。
//		★备注			暂无
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
//			->☆管辖权（缩放模式）
//			->☆缩放模式
//		
//		
//		★家谱：
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
	DrillUp.g_FBLS_PluginTip_curName = "Drill_ForceBitmapLinearScale.js 管理器-强制像素缩放";
	DrillUp.g_FBLS_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_ForceBitmapLinearScale = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_ForceBitmapLinearScale');
	
	/*-----------------杂项------------------*/
	DrillUp.g_FBLS_enabled = String(DrillUp.parameters["初始是否开启强制像素缩放"] || "false") == "true"; 
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_FBLS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_FBLS_pluginCommand.call(this, command, args);
	this.drill_FBLS_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_FBLS_pluginCommand = function( command, args ){
	if( command === ">强制像素缩放" ){
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "启用" || type == "开启" || type == "打开" || type == "启动" ){
				$gameSystem._drill_FBLS_enabled = true;
			}
			if( type == "关闭" || type == "禁用" ){
				$gameSystem._drill_FBLS_enabled = false;
			}
			if( type == "恢复默认" ){
				$gameSystem._drill_FBLS_enabled = DrillUp.g_FBLS_enabled;
			}
		}
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
DrillUp.g_FBLS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_FBLS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_FBLS_sys_initialize.call(this);
	this.drill_FBLS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_FBLS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_FBLS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_FBLS_saveEnabled == true ){	
		$gameSystem.drill_FBLS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_FBLS_initSysData();
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
Game_System.prototype.drill_FBLS_initSysData = function() {
	this.drill_FBLS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_FBLS_checkSysData = function() {
	this.drill_FBLS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_FBLS_initSysData_Private = function() {
	
	this._drill_FBLS_enabled = DrillUp.g_FBLS_enabled;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_FBLS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_FBLS_enabled == undefined ){
		this.drill_FBLS_initSysData();
	}
}



//=============================================================================
// ** ☆管辖权（缩放模式）
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * 0E缩放《管理器-强制像素缩放》 - 参数 - 缩放模式
//
//			标签：	> 参数『Bitmap的开放函数』。
//==============================
Object.defineProperty(Bitmap.prototype, 'smooth', {
    get: function(){
        return this._smooth;
    },
    set: function( value ){
        if( this._smooth !== value ){
            this._smooth = value;
            if(this.__baseTexture){
                if( this._smooth ){
					// > 模糊边缘缩放（'smooth'为true）
                    this._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
                }else{
					// > 邻近缩放（'smooth'为false）
                    this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                }
            }
        }
    },
    configurable: true
});

	这个参数虽然由该插件管，但并没有复写的必要。
	因为这个方法不能实时切换影响 已加载的bitmap，还是要把功能写到帧刷新里才可以。
*/

//=============================================================================
// ** ☆缩放模式
//
//			说明：	> 此模块提供 缩放模式 的功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 缩放模式 - 帧刷新绑定
//==============================
var _drill_FBLS_update = Sprite.prototype.update;
Sprite.prototype.update = function() {
	_drill_FBLS_update.call(this);
	if( this._bitmap == undefined ){ return; }
	if( this._bitmap.__baseTexture == undefined ){ return; }
	this.drill_FBLS_update();
}
//==============================
// * 缩放模式 - 帧刷新
//==============================
Sprite.prototype.drill_FBLS_update = function() {
	
	// > 开启时
	if( $gameSystem != undefined &&
		$gameSystem._drill_FBLS_enabled == true ){
		
		// > 开启时 - 锁
		if( this._bitmap._baseTexture._drill_FBLS_tag == undefined ){
			this._bitmap._baseTexture._drill_FBLS_tag = true;
			
			// > 修改设置（强制邻近缩放）
			this._bitmap._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
			
			// > 清空 WebGL 纹理缓存
			this._bitmap._baseTexture._glTextures = {};
		}
		
	// > 关闭时
	}else{
		
		// > 关闭时 - 锁
		if( this._bitmap._baseTexture._drill_FBLS_tag == true ){
			this._bitmap._baseTexture._drill_FBLS_tag = undefined;
			
			// > 还原设置
			if( this._bitmap._smooth == true ){
				// > 模糊边缘缩放（'smooth'为true）
				this._bitmap._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
			}else{
				// > 邻近缩放（'smooth'为false）
				this._bitmap._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
			}
			
			// > 清空 WebGL 纹理缓存
			this._bitmap._baseTexture._glTextures = {};
		}
	}
};


