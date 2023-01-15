//=============================================================================
// Drill_DialogFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        对话框 - 内容滤镜效果
 * @author Drill_up
 *
 *
 * @help  
 * =============================================================================
 * +++ Drill_DialogFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以给对话框添加滤镜效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFilter       系统-滤镜核心
 *     需要该核心才能启用滤镜效果。
 * 可作用于：
 *   - Drill_DialogNameBox      对话框-姓名框窗口
 *     使得上述插件中的 姓名框窗口 也能产生滤镜效果。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于所有出现的对话框。
 * 2.想要了解更多滤镜效果，可以去看看 "1.系统 > 大家族-滤镜效果.docx"。
 * 滤镜：
 *   (1.纯色滤镜、着色滤镜、模糊滤镜、噪点滤镜 相互独立，且效果可以相互叠加。
 *      添加滤镜的先后顺序不同，能产生不同的叠加效果。
 *   (2.波动纯色滤镜 与 纯色滤镜 是同一个滤镜，只是变化方式不同。
 *      二者设置会相互覆盖。
 *   (3.滤镜效果作用到对话框的内容，并且包括头像。
 *      但是注意，无法作用到 窗口字符块 上。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令设置滤镜：
 * （注意，冒号左右两边有空格）
 * 
 * 插件指令：>对话框滤镜 : 全部 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>对话框滤镜 : 只对话框 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>对话框滤镜 : 只选择框 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>对话框滤镜 : 只姓名框 : 纯色滤镜 : 纯黑 : 155 : 60
 *
 * 插件指令：>对话框滤镜 : 全部 : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>对话框滤镜 : 全部 : 纯色滤镜 : 纯蓝 : 155 : 60
 * 插件指令：>对话框滤镜 : 全部 : 纯色滤镜 : 纯绿 : 155 : 60
 * 插件指令：>对话框滤镜 : 全部 : 纯色滤镜 : 纯红 : 155 : 60
 * 插件指令：>对话框滤镜 : 全部 : 纯色滤镜 : 黄色 : 155 : 60
 * 插件指令：>对话框滤镜 : 全部 : 纯色滤镜 : 紫色 : 155 : 60
 * 插件指令：>对话框滤镜 : 全部 : 纯色滤镜 : 青色 : 155 : 60
 * 
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 黑白 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 反色 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 鲜艳 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 漂白 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 饱和度降低 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 古墨水画色 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 古铜色 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 宝丽来相机色 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 红绿蓝翻转 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 夜色 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 着色滤镜 : 致幻色 : 255 : 60
 * 
 * 插件指令：>对话框滤镜 : 全部 : 填充滤镜 : 纯黑 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 填充滤镜 : 纯蓝 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 填充滤镜 : 纯绿 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 填充滤镜 : 纯红 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 填充滤镜 : 黄色 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 填充滤镜 : 紫色 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 填充滤镜 : 青色 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 填充滤镜 : 纯白 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 填充滤镜 : #dd99ff : 255 : 60
 * 
 * 插件指令：>对话框滤镜 : 全部 : 模糊滤镜 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 噪点滤镜 : 155 : 60
 * 
 * 1.对话框有几个部分，分别为对话框，选择框。
 *   姓名框需要 YEP消息核心 插件的支持。
 * 2.滤镜后面的两个参数表示：目标程度，变化时长。
 * 3.目标程度范围为0-255。255的程度最强烈。
 *   比如，纯蓝滤镜的255表示敌人图像完全过滤为蓝色。
 * 4.填充滤镜的"#dd99ff"为自定义颜色代码，你可以填入自定义颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----高级设置 - 波动滤镜
 * 上述所有滤镜，都是线性滤镜，即变色后，一直保持状态。
 * 而波动滤镜的程度是依据正弦公式变化，时隐时现。
 * 
 * 插件指令：>对话框滤镜 : 全部 : 波动纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>对话框滤镜 : 全部 : 波动着色滤镜 : 鲜艳 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 波动填充滤镜 : 紫色 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 波动模糊滤镜 : 255 : 60
 * 插件指令：>对话框滤镜 : 全部 : 波动噪点滤镜 : 155 : 60
 * 
 * 1.只要在滤镜类型前加"波动"二字即可。
 *   注意，后面两个参数表示为：程度0-255、周期（波动一次所需时间，单位帧） 
 * 2.波动滤镜为瞬间变化。
 * 3.波动填充滤镜设置中，你可以填自定义颜色的颜色代码。
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
 * 时间复杂度： o(n)*o(贴图处理)*o(滤镜) 每帧
 * 测试方法：   在战斗界面和地图界面中以正常游戏流程进行测试。
 * 测试结果：   地图界面中，平均消耗为：【20.34ms】
 *              战斗界面中，平均消耗为：【17.80ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的【20ms】范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.滤镜是性能消耗大户，因为带滤镜的图片效果都是通过即时演算形成的。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 3.对话框是固定数量的贴图，消耗量是稳定的。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 分离了滤镜核心，大幅度优化了底层结构。
 * 添加了填充滤镜功能，降低了模糊滤镜的性能消耗。
 * [v1.2]
 * 优化了 姓名框窗口 的支持。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DFi（Dialog_Filter）
//		临时全局变量	DrillUp.g_DFi_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)*o(滤镜) 每帧
//		★性能测试因素	对话管理层 的对话
//		★性能测试消耗	9.39ms ~ 20.34ms
//		★最坏情况		无
//		★备注			目前该插件只有3个sprite在执行滤镜。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			对话框-滤镜效果：
//				->窗口的滤镜
//				->选项、子窗口的滤镜
//				->消息核心的姓名框滤镜
//				->（滤镜核）优化，滤镜/滤镜板用到的时候才new
//
//		★必要注意事项：
//			1.滤镜核详细内容，去见Drill_CoreOfFilter。
//
//		★其它说明细节：
//			暂无
//				
//		★存在的问题：
//			暂无


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogFilter = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogFilter');
	
 
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFilter ){
	
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_DFi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_DFi_pluginCommand.call(this, command, args);
	if( command === ">对话框滤镜" ){	//>对话框滤镜 : 全部 : 纯色滤镜 : 纯黑 : 155 : 60
		if(args.length == 8 || args.length == 10){
			var target = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if(args[9] != undefined){ var temp3 = String(args[9]); }
			
			var tar_s = [];
			if(target == "全部"){
				tar_s.push($gameSystem._drill_DFi.t);
				tar_s.push($gameSystem._drill_DFi.c);
				tar_s.push($gameSystem._drill_DFi.n);
			}
			if(target == "只对话框"){
				tar_s.push($gameSystem._drill_DFi.t);
			}
			if(target == "只选择框"){
				tar_s.push($gameSystem._drill_DFi.c);
			}
			if(target == "只姓名框"){
				tar_s.push($gameSystem._drill_DFi.n);
			}
			for(var j=0; j<tar_s.length; j++){
				if( type == "纯色滤镜" ){
					tar_s[j].setPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "着色滤镜" ){
					tar_s[j].setColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "填充滤镜" ){
					tar_s[j].setFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "模糊滤镜" ){
					tar_s[j].setBlurLinear = [ Number(temp1),Number(temp2) ];
				}
				if( type == "噪点滤镜" ){
					tar_s[j].setNoiseLinear = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动纯色滤镜" ){
					tar_s[j].setPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动着色滤镜" ){
					tar_s[j].setColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动填充滤镜" ){
					tar_s[j].setFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
				}
				if( type == "波动模糊滤镜" ){
					tar_s[j].setBlurWave = [ Number(temp1),Number(temp2) ];
				}
				if( type == "波动噪点滤镜" ){
					tar_s[j].setNoiseWave = [ Number(temp1),Number(temp2) ];
				}
			}
		}
	}
}
	

//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DFi_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DFi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DFi_sys_initialize.call(this);
	this.drill_DFi_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DFi_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DFi_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DFi_saveEnabled == true ){	
		$gameSystem.drill_DFi_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DFi_initSysData();
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
Game_System.prototype.drill_DFi_initSysData = function() {
	this.drill_DFi_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DFi_checkSysData = function() {
	this.drill_DFi_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DFi_initSysData_Private = function() {
	this._drill_DFi = {};
	this._drill_DFi.t = {};
	this._drill_DFi.t.setPureLinear = ["",0,0];	//临时赋值用的数组
	this._drill_DFi.t.setColorLinear = ["",0,0];
	this._drill_DFi.t.setFillLinear = ["",0,0];
	this._drill_DFi.t.setBlurLinear = [0,0];
	this._drill_DFi.t.setNoiseLinear = [0,0];
	this._drill_DFi.t.setPureWave = ["",0,0];
	this._drill_DFi.t.setColorWave = ["",0,0];
	this._drill_DFi.t.setFillWave = ["",0,0];
	this._drill_DFi.t.setBlurWave = [0,0];
	this._drill_DFi.t.setNoiseWave = [0,0];
	this._drill_DFi.c = {};
	this._drill_DFi.c.setPureLinear = ["",0,0];
	this._drill_DFi.c.setColorLinear = ["",0,0];
	this._drill_DFi.c.setFillLinear = ["",0,0];
	this._drill_DFi.c.setBlurLinear = [0,0];
	this._drill_DFi.c.setNoiseLinear = [0,0];
	this._drill_DFi.c.setPureWave = ["",0,0];
	this._drill_DFi.c.setColorWave = ["",0,0];
	this._drill_DFi.c.setFillWave = ["",0,0];
	this._drill_DFi.c.setBlurWave = [0,0];
	this._drill_DFi.c.setNoiseWave = [0,0];
	this._drill_DFi.n = {};
	this._drill_DFi.n.setPureLinear = ["",0,0];
	this._drill_DFi.n.setColorLinear = ["",0,0];
	this._drill_DFi.n.setFillLinear = ["",0,0];
	this._drill_DFi.n.setBlurLinear = [0,0];
	this._drill_DFi.n.setNoiseLinear = [0,0];
	this._drill_DFi.n.setPureWave = ["",0,0];
	this._drill_DFi.n.setColorWave = ["",0,0];
	this._drill_DFi.n.setFillWave = ["",0,0];
	this._drill_DFi.n.setBlurWave = [0,0];
	this._drill_DFi.n.setNoiseWave = [0,0];
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DFi_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DFi == undefined ){
		this.drill_DFi_initSysData();
	}
	
};


//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 帧刷新
//==============================
var _drill_DFi_map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_DFi_map_update.call(this);
	if(this.isActive()){
		this.drill_DFi_updateMessageContentsSprite();
		this.drill_DFi_updateMessageChoiceSprite();
		this.drill_DFi_updateMessageNameSprite();
	}
}
//==============================
// * 帧刷新 - 对话框
//==============================
Scene_Map.prototype.drill_DFi_updateMessageContentsSprite = function() {
	if( this._messageWindow && this._messageWindow._windowContentsSprite ){
		var datafrom = $gameSystem._drill_DFi.t;
		var window_sprite = this._messageWindow._windowContentsSprite;
		var data;
		
		// > 初始化
		if( window_sprite.drill_COF_isInited() == false ){
			window_sprite.drill_COF_initialize();
		}
		
		// > 插件指令配置 - 线性
		data = datafrom.setPureLinear;
		window_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = datafrom.setColorLinear;
		window_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = datafrom.setFillLinear;
		window_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = datafrom.setBlurLinear;
		window_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = datafrom.setNoiseLinear;
		window_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		// > 插件指令配置 - 波动
		data = datafrom.setPureWave;
		window_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = datafrom.setColorWave;
		window_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = datafrom.setFillWave;
		window_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = datafrom.setBlurWave;
		window_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = datafrom.setNoiseWave;
		window_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
		
	}
}
//==============================
// * 帧刷新 - 选择框
//==============================
Scene_Map.prototype.drill_DFi_updateMessageChoiceSprite = function() {
	if( this._messageWindow && this._messageWindow._choiceWindow && this._messageWindow._choiceWindow._windowContentsSprite ){
		var datafrom = $gameSystem._drill_DFi.c;
		var window_sprite = this._messageWindow._choiceWindow._windowContentsSprite;
		var data;
		
		// > 初始化
		if( window_sprite.drill_COF_isInited() == false ){
			window_sprite.drill_COF_initialize();
		}
		
		// > 插件指令配置 - 线性
		data = datafrom.setPureLinear;
		window_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = datafrom.setColorLinear;
		window_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = datafrom.setFillLinear;
		window_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = datafrom.setBlurLinear;
		window_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = datafrom.setNoiseLinear;
		window_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		// > 插件指令配置 - 波动
		data = datafrom.setPureWave;
		window_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = datafrom.setColorWave;
		window_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = datafrom.setFillWave;
		window_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = datafrom.setBlurWave;
		window_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = datafrom.setNoiseWave;
		window_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
	}
}
//==============================
// * 帧刷新 - 姓名框
//==============================
Scene_Map.prototype.drill_DFi_updateMessageNameSprite = function() {
	var window_sprite = null;
		
	// > Yep姓名框
	if( this._messageWindow && this._messageWindow._nameWindow && this._messageWindow._nameWindow._windowContentsSprite ){
		window_sprite = this._messageWindow._nameWindow._windowContentsSprite;
	}
	// > Drill姓名框
	if( this._messageWindow && this._messageWindow._drill_DNB_nameWindow && this._messageWindow._drill_DNB_nameWindow._windowContentsSprite ){
		window_sprite = this._messageWindow._drill_DNB_nameWindow._windowContentsSprite;
	}
	
	if( window_sprite != null ){
		var datafrom = $gameSystem._drill_DFi.n;
		var data;
		
		// > 初始化
		if( window_sprite.drill_COF_isInited() == false ){
			window_sprite.drill_COF_initialize();
		}
		
		// > 插件指令配置 - 线性
		data = datafrom.setPureLinear;
		window_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = datafrom.setColorLinear;
		window_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = datafrom.setFillLinear;
		window_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = datafrom.setBlurLinear;
		window_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = datafrom.setNoiseLinear;
		window_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		// > 插件指令配置 - 波动
		data = datafrom.setPureWave;
		window_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = datafrom.setColorWave;
		window_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = datafrom.setFillWave;
		window_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = datafrom.setBlurWave;
		window_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = datafrom.setNoiseWave;
		window_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
		
	}
}
//=============================================================================
// ** 战斗界面
//=============================================================================
//==============================
// * 帧刷新
//==============================
var _drill_DFi_battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_DFi_battle_update.call(this);
	if(this.isActive()){
		this.drill_DFi_updateMessageContentsSprite();
		this.drill_DFi_updateMessageChoiceSprite();
		this.drill_DFi_updateMessageNameSprite();
	}
}
Scene_Battle.prototype.drill_DFi_updateMessageContentsSprite = Scene_Map.prototype.drill_DFi_updateMessageContentsSprite ;
Scene_Battle.prototype.drill_DFi_updateMessageChoiceSprite = Scene_Map.prototype.drill_DFi_updateMessageChoiceSprite ;
Scene_Battle.prototype.drill_DFi_updateMessageNameSprite = Scene_Map.prototype.drill_DFi_updateMessageNameSprite ;


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_DialogFilter = false;
		alert(
			"【Drill_DialogFilter.js 对话框 - 滤镜效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFilter 系统-滤镜核心"
		);
}



