//=============================================================================
// Drill_RmmvCoreFix.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        系统 - rmmv核心漏洞修复
 * @author Drill_up
 * 
 * @help  
 * =============================================================================
 * +++ Drill_RmmvCoreFix +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * rmmv核心的漏洞修复，装上该插件即可修复相关漏洞。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面、地图界面、战斗界面。
 *   直接作用于rmmv底层。
 * 
 * -----------------------------------------------------------------------------
 * ----知识点 - 插件漏洞
 * 漏洞-游戏界面卡死bug：
 *   (1.此漏洞来源于 图形渲染器。
 *      文档也有说明，可见："0.问题解答集合（FAQ） > Rmmv中的罕见问题.docx"
 *   (2.漏洞出现几率非常小，1%的几率出现。
 *      bug出现后，游戏界面完全卡死，但是游戏能正常运行，还能存档。
 *      该插件修复了这个非常小几率出现的bug。
 *   (3.影响：关于bug的问题讨论：
 *      https://rpg.blue/thread-483548-1-1.html
 *   (4.解决方案：添加此插件即可修复漏洞。
 * 
 * 漏洞2-错误声音数组bug：
 *   (1.此漏洞来源于 声音管理器。
 *   (2.此bug对rmmv本身没有影响，但是对声音相关的子插件有影响，
 *      子插件每次请求声音数组时，都只能得到含一个元素的错误数组。
 *   (3.影响：插件 声音-事件的声音 如果同时在远处播放两个以上的声音，
 *      会造成只有一个声音成功衰减，其他声音是原音量。
 *   (4.解决方案：添加此插件即可修复漏洞。
 * 
 * 漏洞3-行走图拉扯bug：
 *   (1.此漏洞来源于 遮罩底层 。
 *      文档也有说明，可见："0.问题解答集合（FAQ） > Rmmv中的罕见问题.docx"
 *   (2.目前已知 win7系统、32位的操作系统 的旧系统存在此问题。
 *      新系统不存在此bug。
 *   (3.影响：游戏发布后，操作系统比较低配的玩家会遇到这种拉扯bug，
 *      游戏体验非常不好。
 *   (4.解决方案：此插件提供了 遮罩底层开关，你可以通过插件指令直接关闭遮罩底层。
 *      但关闭遮罩可能会对一些游戏特效造成影响，你可以在地图中放置一个事件，
 *      让玩家来自己来决定要不要关闭遮罩功能。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令
 * 你可以通过插件指令手动控制开关：
 * 
 * 插件指令：>rmmv核心漏洞修复 : 遮罩底层开关 : 启用
 * 插件指令：>rmmv核心漏洞修复 : 遮罩底层开关 : 禁用
 * 
 * 1.遮罩底层开关在示例中 特效管理层 有事件可以控制。
 *   你可以去示例里面看看 遮罩底层 被关闭后的效果。（至少能消除拉扯的恶性bug）
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
 * 测试方法：   开启插件，进行相应的性能测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              地图界面中，平均消耗为：【5ms以下】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了声音相关bug。
 * [v1.2]
 * 添加了 遮罩底层开关 。
 * 
 */
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		RCF (Rmmv_Core_Fix)
//		临时全局变量	无
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	任意位置
//		★性能测试消耗	1.04ms
//		★最坏情况		无
//		★备注			这里是对核心的结构进行修复，性能如何并没有多少意义。因为缺少这块，程序都无法运行。
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
//			->☆核心漏洞修复 - 图形渲染器
//			->☆核心漏洞修复 - 声音管理器
//			->☆核心漏洞修复 - 遮罩底层开关
//
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
	DrillUp.g_RCF_PluginTip_curName = "Drill_RmmvCoreFix.js 系统-rmmv核心漏洞修复";
	DrillUp.g_RCF_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_RmmvCoreFix = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_RmmvCoreFix');
	
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_RCF_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){ 
	_drill_RCF_pluginCommand.call(this, command, args);
	if( command === ">rmmv核心漏洞修复" ){
		
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "遮罩底层开关" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_RCF_maskEnabled = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_RCF_maskEnabled = false;
				}
			}
		}
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
DrillUp.g_RCF_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_RCF_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_RCF_sys_initialize.call(this);
	this.drill_RCF_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_RCF_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_RCF_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_RCF_saveEnabled == true ){	
		$gameSystem.drill_RCF_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_RCF_initSysData();
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
Game_System.prototype.drill_RCF_initSysData = function() {
	this.drill_RCF_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_RCF_checkSysData = function() {
	this.drill_RCF_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_RCF_initSysData_Private = function() {
	
	this._drill_RCF_maskEnabled = true;		//遮罩底层开关（默认启用，玩家需根据电脑情况自己关闭遮罩）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_RCF_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_RCF_maskEnabled == undefined ){
		this.drill_RCF_initSysData();
	}
};

	
//=============================================================================
// ** ☆核心漏洞修复 - 图形渲染器
//=============================================================================
Graphics.render = function( stage ){
    if( this._skipCount <= 0 ){		// "=== 0" 的符号bug修复
        var startTime = Date.now();
        if( stage ){
            this._renderer.render(stage);
            if( this._renderer.gl && this._renderer.gl.flush ){
                this._renderer.gl.flush();
            }
        }
        var endTime = Date.now();
        var elapsed = endTime - startTime;
        this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
        this._rendered = true;
    }else{
        this._skipCount--;
        this._rendered = false;
    }
    this.frameCount++;
};



//=============================================================================
// ** ☆核心漏洞修复 - 声音管理器
//=============================================================================
AudioManager.playSe = function(se) {
    if( se.name ){
        this._seBuffers = this._seBuffers.filter(function(audio) {
            //return audio.isPlaying();						//bug：每次塞入，都会清除之前的audio
            return !audio.isReady() || audio.isPlaying();	//（修复：这样可以确保不会清除未准备好的声音对象）
        });
        var buffer = this.createBuffer('se', se.name);
        this.updateSeParameters(buffer, se);
        buffer.play(false);
        this._seBuffers.push(buffer);
    }
};
	
	
//=============================================================================
// ** ☆核心漏洞修复 - 遮罩底层开关
//=============================================================================
Object.defineProperty(Sprite.prototype, 'mask', {
	get: function(){
		return this._mask;
	},
	set: function( value ){
		
		// > 关闭时
		if( $gameSystem._drill_RCF_maskEnabled == false ){
			
			//（解除子贴图关系）
			if( value != undefined &&
				value.parent != undefined &&
				value.parent.removeChild != undefined ){
				value.parent.removeChild( value );
			}
			
		// > 启用时
		}else{
			if( this._mask ){		//（此处代码来自pixi的底层 'mask'）
				this._mask.renderable = true;
			}
			
			this._mask = value;
			
			if( this._mask ){
				this._mask.renderable = false;
			}
		}
		
	},
	configurable: true
});


