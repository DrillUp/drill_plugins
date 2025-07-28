//=============================================================================
// Drill_CoreOfDragAndAdsorb.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        数学模型 - 拖拽与吸附核心
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfDragAndAdsorb +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件提供一个数学模型，专门管理 拖拽与吸附 的复杂关系。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于 弹道核心 插件。
 * 基于：
 *   - Drill_CoreOfBallistics     数学模型-弹道核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 * 2.详细内容可以去看看 "16.图片 > 关于鼠标拖拽图片.docx"。
 * 细节：
 *   (1.核心单独不起作用，需要与子插件一起使用。
 *      核心提供了基础的定义，包含：拖拽控制器、吸附控制器、吸附槽控制器。
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
 * 时间复杂度： o(n^3) 每帧
 * 测试方法：   在图片管理层放置8个图片拖拽、8个吸附槽设置，测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【9.24ms】
 *              100个事件的地图中，平均消耗为：【6.45ms】
 *               50个事件的地图中，平均消耗为：【5.20ms】
 * 测试方法：   在战斗界面或菜单界面中，测试性能。
 * 测试结果：   战斗界面中，平均消耗为：【6.33ms】
 *              菜单界面中，平均消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件提供数学模型，只做纯数学计算，与贴图没有关系。
 *   因此消耗不大。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 改进了拖拽多个对象时的结构。
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		CODAA (Core_Of_Drag_And_Adsorb)
//		临时全局变量	DrillUp.g_CODAA_xxx
//		临时局部变量	this._drill_CODAA_xxx
//		存储数据变量	$gameSystem._drill_CODAA_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)  每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	2024/5/2：
//							》2.5ms（drill_slot_update）5.2ms（drill_controllerAdsorb_update）0.9ms（drill_controllerDrag_update）
//						2025/7/27：
//							》7.1ms（drill_factoryDrag_updateDragMax）
//		★最坏情况		暂无
//		★备注			每帧的纯数据计算，不受贴图影响。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆存储数据
//				->获取 拖拽数据工厂（开放函数）
//				->获取 吸附数据工厂（开放函数）
//				->获取 吸附槽数据工厂（开放函数）
//			
//			
//			->拖拽控制器【Drill_CODAA_DragController】
//				->A主体
//					->设置可拖拽
//				->B拖拽优先级数据
//					->帧刷新（散装，手动调用）
//					->设置优先级（开放函数）
//				->C拖拽位移
//					->帧刷新（散装，手动调用）
//					->获取拖拽偏移量X
//					->获取拖拽偏移量Y
//					->立即合并拖拽偏移量
//					->立即清零拖拽偏移量
//				->D正在拖拽标记
//					->帧刷新（散装，手动调用）
//					->开始拖拽时（可继承）
//					->结束拖拽时（可继承）
//			->拖拽数据工厂【Drill_CODAA_DragFactory】
//				->A容器
//					->创建 拖拽控制器
//					->删除 拖拽控制器
//				->B获取
//					->获取 拖拽控制器 - 根据ID
//					->获取 拖拽控制器列表 - 根据子插件
//					->获取 拖拽控制器列表 - 正在拖拽的
//			
//			
//			->吸附控制器【Drill_CODAA_AdsorbController】
//				->A主体
//				->B可吸附类型
//				->C外键拖拽
//				->D外键吸附槽
//				->E吸附位移
//					->获取吸附位置X
//					->获取吸附位置Y
//					->立即合并吸附位置
//					->立即清零吸附位置
//				->F吸附状态
//					->是否"未吸附"
//					->是否"正被吸附"
//					->是否"已吸附"
//					->是否"拖走吸附"
//					->设置"未吸附"
//					->设置"正被吸附"
//					->设置"已吸附"
//					->设置"拖走吸附"
//				->H吸附动画"未吸附"
//				->I吸附动画"正被吸附"
//					->【距离太小时，缩短吸附动画时间】
//				->J吸附动画"已吸附"
//				->K吸附动画"拖走吸附"
//			->吸附数据工厂【Drill_CODAA_AdsorbFactory】
//				->A容器
//					->创建 吸附控制器
//					->删除 吸附控制器
//				->B获取
//					->获取 吸附控制器 - 根据ID
//					->获取 吸附控制器列表 - 根据子插件
//					->获取 吸附控制器 - 根据拖拽ID
//					->获取 吸附控制器列表 - 根据吸附槽ID
//			
//			
//			->吸附槽控制器【Drill_CODAA_SlotController】
//				->A主体
//				->B槽吸附类型
//				->C吸附数量
//				->D位置
//				->E自变化效果
//				->H必然吸附
//				->I一般吸附
//				->J交换吸附
//			->吸附槽数据工厂【Drill_CODAA_SlotFactory】
//				->A容器
//					->创建 吸附槽控制器
//					->删除 吸附槽控制器
//				->B获取
//					->获取 吸附槽控制器 - 根据ID
//					->获取 吸附槽控制器列表 - 根据子插件
//			
//			
//			->☆拖拽优先级与数量管理
//				->2A拖拽数量最大值
//					->设置最大值（开放函数）
//					->帧刷新（散装，手动调用）
//				->2B拖拽优先级顺序
//				->2C拖拽优先级结果
//				->2D拖拽优先级最大值
//					->获取最大优先级（开放函数）
//					->获取推荐优先级（开放函数）
//			
//			->☆吸附数量管理
//				->获取槽的吸附数量（开放函数）
//				->获取未吸附的数量（开放函数）
//				->吸附槽控制器
//					->外键变化时（继承）
//					->获取当前吸附数量（开放函数）
//					->当前吸附数量是否已满（开放函数）
//			
//			->☆监听"未吸附"
//				->断开吸附
//				->吸附控制器
//					->设置可吸附（继承）
//					->去除可吸附类型（继承）
//					->去除全部可吸附类型（继承）
//				->吸附槽控制器
//					->设置最大吸附数量（继承）
//					->去除槽吸附类型（继承）
//					->去除全部槽吸附类型（继承）
//					->删除吸附槽（继承）
//			->☆监听"正被吸附"
//				->帧刷新切换"未吸附"
//					> 必然吸附
//					> 一般吸附
//					> 交换吸附
//				->帧刷新切换"拖走吸附"
//					> 必然吸附
//					x> 一般吸附
//					> 交换吸附
//			->☆监听"已吸附"
//				->播放结束时
//			->☆监听"拖走吸附"
//				->开始拖拽时（继承）
//				->结束拖拽时（继承）
//			
//			->☆DEBUG绘制
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			32.数学模型 > 关于拖拽与吸附控制核心（脚本）.docx
//		
//		★插件私有类：
//			* 拖拽控制器【Drill_CODAA_DragController】（不能定义子类，因为工厂类）
//			* 吸附控制器【Drill_CODAA_AdsorbController】（不能定义子类，因为工厂类）
//			* 吸附槽控制器【Drill_CODAA_SlotController】（不能定义子类，因为工厂类）
//			
//			* 拖拽数据工厂【Drill_CODAA_DragFactory】
//			* 吸附数据工厂【Drill_CODAA_AdsorbFactory】
//			* 吸附槽数据工厂【Drill_CODAA_SlotFactory】
//		
//		★必要注意事项：
//			1.核心提供固定的数据工厂，通过工厂创建控制器并返回id。子插件需通过id获取到控制器指针。
//			  工厂类必须是单例，去看脚本文档的 "为什么工厂类必须是单例" 章节。
//			2.数据类的定义，都为正常的外键关系：
//				拖拽数据工厂 生产 拖拽控制器 
//				吸附数据工厂 生产 吸附控制器 
//				吸附槽数据工厂 生产 吸附槽控制器 
//				吸附控制器 -> 拖拽控制器 （一对一，_drill_foreignKey_dragId）
//				吸附控制器 -> 吸附槽控制器 （多对一，_drill_foreignKey_slotId）
//			  业务逻辑的定义，会出现通过 工厂容器 反复嵌套的设计：
//				根据 拖拽ID 获取到 吸附控制器
//				根据 吸附槽ID 获取到 吸附控制器
//				……
//			  注意区分，数据类的外键关系没变，只是嵌套了多层。
//
//		★其它说明细节：
//			1.子插件可以根据情况选择数据类：
//				》只用 拖拽控制器 就能写一个 拖拽子插件。
//				》可以用 拖拽与吸附 合并，形成一个控件类插件。
//				》可以用 拖拽与吸附 分离两个子插件 的模式来设计。
//				（可见 Drill_PictureDraggable 和 Drill_PictureAdsorptionSlot ）
//			2.该插件本质上就是控制 贴图自定义移动 。
//			  假设子插件定义了一个贴图，使用流程如下：
//				贴图 > 找 拖拽数据工厂 > 创建 拖拽控制器 > 存储product_id > 建立获取函数（通过id获取控制器的指针）
//				贴图 > 找 吸附数据工厂 > 创建 吸附控制器 > 存储product_id > 建立获取函数
//				贴图 > 获取 拖拽控制器 > 准备帧刷新所需参数 > 帧刷新
//				贴图 > 获取 吸附控制器 > 准备帧刷新所需参数 > 帧刷新
//				贴图 > 获取 拖拽控制器 > 叠加拖拽位置（贴图的位置叠加）
//				贴图 > 获取 吸附控制器 > 覆盖吸附位置（贴图的位置直接被覆盖）
//				场景 > 找 吸附槽数据工厂 > 创建控制器 > 设置位置
//			  完成上述内容后，贴图被拖拽时会根据位置自动与 吸附槽 产生吸附效果。
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
	DrillUp.g_CODAA_PluginTip_curName = "Drill_CoreOfDragAndAdsorb.js 数学模型-拖拽与吸附核心";
	DrillUp.g_CODAA_PluginTip_baseList = ["Drill_CoreOfBallistics.js 数学模型-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_CODAA_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_CODAA_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_CODAA_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_CODAA_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_CODAA_PluginTip_baseList[i];
		}
		return message;
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfDragAndAdsorb = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfDragAndAdsorb');


//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	
	
//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_CODAA_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_CODAA_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_CODAA_sys_initialize.call(this);
	this.drill_CODAA_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_CODAA_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_CODAA_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_CODAA_saveEnabled == true ){	
		$gameSystem.drill_CODAA_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_CODAA_initSysData();
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
Game_System.prototype.drill_CODAA_initSysData = function() {
	this.drill_CODAA_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_CODAA_checkSysData = function() {
	this.drill_CODAA_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_CODAA_initSysData_Private = function() {
	
	// > 拖拽数据工厂
	this._drill_CODAA_dragFactory = new Drill_CODAA_DragFactory();
	
	// > 吸附数据工厂
	this._drill_CODAA_adsorbFactory = new Drill_CODAA_AdsorbFactory();
	
	// > 吸附槽数据工厂
	this._drill_CODAA_slotFactory = new Drill_CODAA_SlotFactory();
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_CODAA_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_CODAA_slotFactory == undefined ){
		this.drill_CODAA_initSysData();
	}
};
//==============================
// * 存储数据 - 获取 拖拽数据工厂（开放函数）
//==============================
Game_System.prototype.drill_CODAA_dragFactory = function() {
	return this._drill_CODAA_dragFactory;
};
//==============================
// * 存储数据 - 获取 吸附数据工厂（开放函数）
//==============================
Game_System.prototype.drill_CODAA_adsorbFactory = function() {
	return this._drill_CODAA_adsorbFactory;
};
//==============================
// * 存储数据 - 获取 吸附槽数据工厂（开放函数）
//==============================
Game_System.prototype.drill_CODAA_slotFactory = function() {
	return this._drill_CODAA_slotFactory;
};
	
	
	
//=============================================================================
// ** 拖拽控制器【Drill_CODAA_DragController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个 拖拽 数据类。
// **		子功能：	
// **					->控制器
// **					->A主体
// **						->设置可拖拽
// **					->B拖拽优先级数据
// **						->帧刷新设置
// **						->设置优先级（开放函数）
// **					->C拖拽位移
// **						->帧刷新
// **						->获取拖拽偏移量X
// **						->获取拖拽偏移量Y
// **						->立即合并拖拽偏移量
// **						->立即清零拖拽偏移量
// **					->D正在拖拽标记
// **						->帧刷新
// **						->开始拖拽时（可继承）
// **						->结束拖拽时（可继承）
// **		
// **		说明：	> 子插件必须通过工厂类创建控制器。
// **				> 因为工厂关系，子插件不能定义子类，但可以继承函数。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_CODAA_DragController() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 初始化
//==============================
Drill_CODAA_DragController.prototype.initialize = function(){
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controllerDrag_initChild();									//初始化子功能
};
//##############################
// * 控制器 - 帧刷新『拖拽的散装帧刷新』 - B拖拽优先级数据
//			
//			参数：	> is_onHover 布尔 （鼠标是否悬停）
//					> is_onPress 布尔 （鼠标是否按下）
//			返回：	> 无
//			
//			说明：	> 当前为散装帧刷新，需要子插件 手动调用，并且实时传参。
//					> 只要正确传参，使用非鼠标设备控制，也能实现拖拽。
//					> 注意，此帧刷新必须提前全部执行完，即在 C拖拽位移 和 D正在拖拽标记 之前执行，详细去看子插件。
//##############################
Drill_CODAA_DragController.prototype.drill_controllerDrag_updatePriority = function( is_onHover, is_onPress ){
	this.drill_controllerDrag_updatePriority_Private( is_onHover, is_onPress );
};
//##############################
// * 控制器 - 帧刷新『拖拽的散装帧刷新』 - C拖拽位移
//			
//			参数：	> mouse_x 数字    （鼠标位置X）
//					> mouse_y 数字    （鼠标位置X）
//			返回：	> 无
//			
//			说明：	> 当前为散装帧刷新，需要子插件 手动调用，并且实时传参。
//					> 只要正确传参，使用非鼠标设备控制，也能实现拖拽。
//##############################
Drill_CODAA_DragController.prototype.drill_controllerDrag_updateOffset = function( mouse_x, mouse_y ){
	this.drill_controllerDrag_updateOffset_Private( mouse_x, mouse_y );
};
//##############################
// * 控制器 - 帧刷新『拖拽的散装帧刷新』 - D正在拖拽标记
//			
//			参数：	> is_onHover 布尔 （鼠标是否悬停）
//					> is_onPress 布尔 （鼠标是否按下）
//			返回：	> 无
//			
//			说明：	> 当前为散装帧刷新，需要子插件 手动调用，并且实时传参。
//					> 只要正确传参，使用非鼠标设备控制，也能实现拖拽。
//##############################
Drill_CODAA_DragController.prototype.drill_controllerDrag_updateDraging = function( is_onHover, is_onPress ){
	this.drill_controllerDrag_updateDraging_Private( is_onHover, is_onPress );
};
//##############################
// * A主体 - 设置工厂标识
//			
//			参数：	> id 数字  （工厂编号）
//			返回：	> 无
//##############################
Drill_CODAA_DragController.prototype.drill_controllerDrag_setProductId = function( id ){
	this._drill_productId = id;
};
//##############################
// * A主体 - 设置子插件标识
//			
//			参数：	> pluginShort 字符串（插件简称）
//			返回：	> 无
//			
//			说明：	> 由于该类不能被继承，并且统一由数据工厂分发，所以 子插件 需要通过此标识来获取 控制器对象。
//##############################
Drill_CODAA_DragController.prototype.drill_controllerDrag_setPluginShort = function( pluginShort ){
	this._drill_pluginShort = pluginShort;
};
//==============================
// * 控制器 - 初始化子功能
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_initChild = function(){
	this.drill_controllerDrag_initAttr();			//初始化子功能 - A主体
	this.drill_controllerDrag_initPriority();		//初始化子功能 - B拖拽优先级数据
	this.drill_controllerDrag_initOffset();			//初始化子功能 - C拖拽位移
	this.drill_controllerDrag_initDraging();		//初始化子功能 - D正在拖拽标记
};

//==============================
// * A主体 - 初始化子功能
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_initAttr = function(){
	this._drill_productId = -1;			//工厂标识
	this._drill_pluginShort = "";		//子插件简称
	
	this._drill_canDrag = false;		//是否可拖拽
}
//==============================
// * A主体 - 设置可拖拽（开放函数）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_setCanDrag = function( enabled ){
	this._drill_canDrag = enabled;
}
//==============================
// * A主体 - 是否可拖拽（开放函数）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_canDrag = function(){
	return this._drill_canDrag;
}


//==============================
// * B拖拽优先级数据 - 初始化子功能
//
//			说明：	> 【此功能】，只是一个赋值功能。
//					> 具体控制见后面功能：2B拖拽优先级顺序、2C拖拽优先级结果 等。
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_initPriority = function(){
	this._drill_dragPriority_value = 0;					//拖拽优先级值
	this._drill_dragPriority_isHover = false;			//优先级的悬停标记
	this._drill_dragPriority_isPress = false;			//优先级的按下标记
}
//==============================
// * B拖拽优先级数据 - 设置优先级（开放函数）
//
//			参数：	> priority 数字
//			返回：	> 无
//
//			说明：	> 建议子插件使用 堆叠级 进行赋值，这样能保证优先拖拽 堆叠级 最上面的对象。
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_setPriorityValue = function( priority ){
	this._drill_dragPriority_value = priority;
	/*
		这里原本考虑在 优先级变化时，立即同步 2B拖拽优先级顺序。
		但立即同步后，会浪费大量计算性能；
		并且在调用函数 drill_factoryDrag_getDragRecommendPriority 获取推荐优先级 时，由于同步的太快，获取的值不稳定；
		所以改成了帧刷新的模式。
	*/
}
//==============================
// * B拖拽优先级数据 - 帧刷新（私有）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_updatePriority_Private = function( is_onHover, is_onPress ){
	this._drill_dragPriority_isHover = is_onHover;
	this._drill_dragPriority_isPress = is_onPress;
}
//==============================
// * B拖拽优先级数据 - 是否启用（可继承）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_isPriorityEnabled = function(){
	// （子插件 继承此函数）
	return true;
}
//==============================
// * B拖拽优先级数据 - 是否阻塞拖拽（可继承）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_isPriorityOrderBlocked = function(){
	// （后面功能 2C拖拽优先级结果 继承此函数）
	return false;
}


//==============================
// * C拖拽位移 - 初始化子功能
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_initOffset = function(){
	
	this._drill_draging_x = 0;				//拖拽时鼠标位置
	this._drill_draging_y = 0;				//
	this._drill_drag_movedX = 0;			//拖拽后停留的位置
	this._drill_drag_movedY = 0;			//
	
	this._drill_curMouseX = 0;				//鼠标位置（实时）
	this._drill_curMouseY = 0;				//
	this._drill_dragLastMouseX = 0;			//鼠标位置（开始拖拽时）
	this._drill_dragLastMouseY = 0;			//
}
//==============================
// * C拖拽位移 - 开始拖拽时（私有）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_offset_dragStarting = function() {
	this._drill_dragLastMouseX = this._drill_curMouseX;
	this._drill_dragLastMouseY = this._drill_curMouseY;
}
//==============================
// * C拖拽位移 - 结束拖拽时（私有）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_offset_dragEnding = function() {
	this._drill_drag_movedX += this._drill_draging_x;
	this._drill_drag_movedY += this._drill_draging_y;
	this._drill_draging_x = 0;
	this._drill_draging_y = 0;
}
//==============================
// * C拖拽位移 - 帧刷新（私有）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_updateOffset_Private = function( mouse_x, mouse_y ){
	if( this.drill_controllerDrag_canDrag() != true ){ return; }
	
	// > 鼠标位置（实时）
	this._drill_curMouseX = mouse_x;
	this._drill_curMouseY = mouse_y;
	
	// > 拖拽时鼠标位置
	if( this._drill_isDraging == true ){
		this._drill_draging_x = mouse_x - this._drill_dragLastMouseX;
		this._drill_draging_y = mouse_y - this._drill_dragLastMouseY;
	}
}
//==============================
// * C拖拽位移 - 获取拖拽偏移量X（开放函数）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_getDraggingXOffset = function(){
	return this._drill_draging_x + this._drill_drag_movedX;
}
//==============================
// * C拖拽位移 - 获取拖拽偏移量Y（开放函数）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_getDraggingYOffset = function(){
	return this._drill_draging_y + this._drill_drag_movedY;
}
//==============================
// * C拖拽位移 - 立即合并拖拽偏移量（开放函数）
//
//			说明：	> 合并偏移量即：先执行 原位置+=偏移量，然后执行 立即清零。
//==============================
//	（无）
//==============================
// * C拖拽位移 - 立即清零拖拽偏移量（开放函数）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_clearDragPosition = function() {
	this._drill_draging_x = 0;
	this._drill_draging_y = 0;
	this._drill_drag_movedX = 0;
	this._drill_drag_movedY = 0;
	//this._drill_isDraging = false; 这里不能关闭拖拽状态
}


//==============================
// * D正在拖拽标记 - 初始化子功能
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_initDraging = function(){
	this._drill_isDraging = false;		//是否正在拖拽
	this._drill_lastIsHover = false;	//悬停标记
	this._drill_lastIsPress = false;	//按下标记
}
//==============================
// * D正在拖拽标记 - 是否正在拖拽（开放函数）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_isDraging = function(){
	return this._drill_isDraging;
}
//==============================
// * D正在拖拽标记 - 是否正在悬停（开放函数）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_isHovering = function(){
	return this._drill_lastIsHover;
}
//==============================
// * D正在拖拽标记 - 是否正在按下（开放函数）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_isPressing = function(){
	return this._drill_lastIsPress;
}
//==============================
// * D正在拖拽标记 - 帧刷新（私有）
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_updateDraging_Private = function( is_onHover, is_onPress ){
	if( this.drill_controllerDrag_canDrag() != true ){ return; }
	
	var last_isHover = this._drill_lastIsHover;
	var last_isPress = this._drill_lastIsPress;
	
	// > 监听 - 开始拖拽时（一帧）
	if( is_onHover == true ){
		if( is_onPress == true && last_isPress == false ){	//（先悬停，再按下，才能拖拽）
			
			// > 开始拖拽时
			this.drill_controllerDrag_dragStarting();
		}
	}
	
	// > 监听 - 结束拖拽时（一帧）
	//			（注意，is_onHover存在慢一帧问题，所以不能作为结束拖拽的条件。『鼠标悬停图片慢一帧』）
	if( is_onPress == false ){
		if( this._drill_isDraging == true ){
			
			// > 结束拖拽时
			this.drill_controllerDrag_dragEnding();
		}
	}
	
	this._drill_lastIsHover = is_onHover;
	this._drill_lastIsPress = is_onPress;
}
//==============================
// * D正在拖拽标记 - 开始拖拽时（可继承）
//
//			说明：	> 此函数可以被继承，用于 子插件 在开始拖拽时进行相关处理。
//					> 继承时注意使用 _drill_pluginShort 进行子插件区分。
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_dragStarting = function() {
	
	// > B拖拽优先级数据 - 是否启用
	if( this.drill_controllerDrag_isPriorityEnabled() == true ){
		// > B拖拽优先级数据 - 是否阻塞拖拽
		if( this.drill_controllerDrag_isPriorityOrderBlocked() == true ){ return; }
	}
	
	// > 拖拽
	this._drill_isDraging = true;
	
	// > C拖拽位移 - 开始拖拽时（私有）
	this.drill_controllerDrag_offset_dragStarting();
}
//==============================
// * D正在拖拽标记 - 结束拖拽时（可继承）
//
//			说明：	> 此函数可以被继承，用于 子插件 在结束拖拽时进行相关处理。
//					> 继承时注意使用 _drill_pluginShort 进行子插件区分。
//==============================
Drill_CODAA_DragController.prototype.drill_controllerDrag_dragEnding = function() {
	
	// > 拖拽
	this._drill_isDraging = false;
	
	// > C拖拽位移 - 结束拖拽时（私有）
	this.drill_controllerDrag_offset_dragEnding();
}



//=============================================================================
// ** 拖拽数据工厂【Drill_CODAA_DragFactory】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个 拖拽控制器 数据工厂。
// **		子功能：	
// **					->数据工厂
// **					->A容器
// **						->创建 拖拽控制器
// **						->删除 拖拽控制器
// **					->B获取
// **						->获取 拖拽控制器 - 根据ID
// **						->获取 拖拽控制器列表 - 根据子插件
// **						->获取 拖拽控制器列表 - 正在拖拽的
// **		
// **		说明：	> 子插件不要自己创建控制器，必须通过工厂类创建控制器。
//=============================================================================
//==============================
// * 数据工厂 - 定义
//==============================
function Drill_CODAA_DragFactory() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 数据工厂 - 初始化
//==============================
Drill_CODAA_DragFactory.prototype.initialize = function(){
	this._drill_factorySerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_factoryDrag_initChild();									//初始化子功能
};
//==============================
// * 数据工厂 - 初始化子功能
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_initChild = function(){
	this.drill_factoryDrag_initCreate();		//初始化子功能 - A容器
	this.drill_factoryDrag_initGet();			//初始化子功能 - B获取
};

//==============================
// * A容器 - 初始化子功能
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_initCreate = function(){
	this._drill_productTank = [];			//工厂容器
	this._drill_curProductId = 0;			//当前工厂标识（只增不减）
}
//==============================
// * A容器 - 创建 拖拽控制器（开放函数）
//
//			参数：	> pluginShort 字符串（插件简称）
//			说明：	> 创建后返回 product_id 。
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_create = function( pluginShort ){
	var product_id = this._drill_curProductId;
	
	// > 创建控制器
	var controller = new Drill_CODAA_DragController();
	controller.drill_controllerDrag_setProductId( product_id );
	controller.drill_controllerDrag_setPluginShort( pluginShort );
	this._drill_productTank[ product_id ] = controller;
	this._drill_curProductId += 1;
	
	return product_id;
}
//==============================
// * A容器 - 删除 拖拽控制器（开放函数）
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_remove = function( controller ){
	if( controller == undefined ){ return; }
	this.drill_factoryDrag_removeByProductId( controller._drill_productId );
}
//==============================
// * A容器 - 删除 拖拽控制器 - 根据工厂标识（开放函数）
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_removeByProductId = function( product_id ){
	this._drill_productTank[ product_id ] = null;
}

//==============================
// * B获取 - 初始化子功能
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_initGet = function(){
	//（无）
}
//==============================
// * B获取 - 获取 拖拽控制器 - 根据ID（开放函数）
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_getByProductId = function( product_id ){
	return this._drill_productTank[ product_id ];
}
//==============================
// * B获取 - 获取 拖拽控制器列表 - 根据子插件（开放函数）
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_getByPluginShort = function( pluginShort ){
	var result_list = [];
	for(var i = 0; i < this._drill_productTank.length; i++ ){
		var controller = this._drill_productTank[i];
		if( controller == undefined ){ continue; }
		if( controller._drill_pluginShort == pluginShort ){
			result_list.push( controller );
		}
	}
	return result_list;
}
//==============================
// * B获取 - 获取 拖拽控制器列表 - 正在拖拽的（开放函数）
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_getByDraging = function( pluginShort ){
	var result_list = [];
	for(var i = 0; i < this._drill_productTank.length; i++ ){
		var controller = this._drill_productTank[i];
		if( controller == undefined ){ continue; }
		if( controller._drill_pluginShort == pluginShort &&
			controller._drill_isDraging == true ){
			result_list.push( controller );
		}
	}
	return result_list;
}
	
	
	
//=============================================================================
// ** 吸附控制器【Drill_CODAA_AdsorbController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个 吸附 数据类。
// **		子功能：	
// **					->控制器
// **						->帧刷新
// **					->A主体
// **						->设置可吸附
// **						->设置可脱离槽
// **					->B可吸附类型
// **					->C外键拖拽
// **					->D外键吸附槽
// **					->F吸附状态
// **						->是否"未吸附"
// **						->是否"正被吸附"
// **						->是否"已吸附"
// **						->是否"拖走吸附"
// **						->设置"未吸附"
// **						->设置"正被吸附"
// **						->设置"已吸附"
// **						->设置"拖走吸附"
// **					->E吸附位移
// **						->获取吸附位置X
// **						->获取吸附位置Y
// **						->立即合并吸附位置
// **						->立即清零吸附位置
// **					->H吸附动画"未吸附"
// **					->I吸附动画"正被吸附"
// **						->【距离太小时，缩短吸附动画时间】
// **					->J吸附动画"已吸附"
// **					->K吸附动画"拖走吸附"
// **		
// **		说明：	> 子插件必须通过工厂类创建控制器。
// **				> 因为工厂关系，子插件不能定义子类，但可以继承函数。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_CODAA_AdsorbController() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 初始化
//==============================
Drill_CODAA_AdsorbController.prototype.initialize = function(){
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_controllerAdsorb_initChild();								//初始化子功能
};
//##############################
// * 控制器 - 帧刷新
//			
//			参数：	> cur_orgX 数字 （原位置 数据最终变换值X，不含拖拽偏移量，不含吸附位置）
//					> cur_orgY 数字 （原位置 数据最终变换值Y，不含拖拽偏移量，不含吸附位置）
//			返回：	> 无
//			
//			说明：	> 帧刷新需要子插件 手动调用，并且实时传参。
//					> 子插件必须要 原位置，确保坐标不会出错。
//##############################
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_update = function( cur_orgX, cur_orgY ){
																	//帧刷新 - A主体（无）
																	//帧刷新 - B可吸附类型（无）
																	//帧刷新 - C外键拖拽（无）
																	//帧刷新 - D外键吸附槽（无）
	this.drill_controllerAdsorb_updateOffset(cur_orgX,cur_orgY);	//帧刷新 - E吸附位移
																	//帧刷新 - F吸附状态（无）
	this.drill_controllerAdsorb_updateAnim0();						//帧刷新 - H吸附动画"未吸附"
	this.drill_controllerAdsorb_updateAnim1();						//帧刷新 - I吸附动画"正被吸附"
	this.drill_controllerAdsorb_updateAnim2();						//帧刷新 - J吸附动画"已吸附"
	this.drill_controllerAdsorb_updateAnim3();						//帧刷新 - K吸附动画"拖走吸附"
};
//##############################
// * A主体 - 设置工厂标识
//			
//			参数：	> id 数字  （工厂编号）
//			返回：	> 无
//##############################
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setProductId = function( id ){
	this._drill_productId = id;
};
//##############################
// * A主体 - 设置子插件标识
//			
//			参数：	> pluginShort 字符串（插件简称）
//			返回：	> 无
//			
//			说明：	> 由于该类不能被继承，并且统一由数据工厂分发，所以 子插件 需要通过此标识来获取 控制器对象。
//##############################
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setPluginShort = function( pluginShort ){
	this._drill_pluginShort = pluginShort;
};
//##############################
// * C外键拖拽 - 设置外键
//			
//			参数：	> dragId 数字（拖拽控制器的工厂标识）
//			返回：	> 无
//			
//			说明：	> 先有 拖拽控制器，再有 吸附控制器。
//##############################
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setForeignKey_dragId = function( dragId ){
	this._drill_foreignKey_dragId = dragId;
};
//==============================
// * 控制器 - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initChild = function(){
	this.drill_controllerAdsorb_initAttr();			//初始化子功能 - A主体
	this.drill_controllerAdsorb_initType();			//初始化子功能 - B可吸附类型
	this.drill_controllerAdsorb_initFKeyDrag();		//初始化子功能 - C外键拖拽
	this.drill_controllerAdsorb_initFKeySlot();		//初始化子功能 - D外键吸附槽
	this.drill_controllerAdsorb_initState();		//初始化子功能 - F吸附状态
	this.drill_controllerAdsorb_initOffset();		//初始化子功能 - E吸附位移
	this.drill_controllerAdsorb_initAnim0();		//初始化子功能 - H吸附动画"未吸附"
	this.drill_controllerAdsorb_initAnim1();		//初始化子功能 - I吸附动画"正被吸附"
	this.drill_controllerAdsorb_initAnim2();		//初始化子功能 - J吸附动画"已吸附"
	this.drill_controllerAdsorb_initAnim3();		//初始化子功能 - K吸附动画"拖走吸附"
};

//==============================
// * A主体 - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initAttr = function(){
	this._drill_productId = -1;			//工厂标识
	this._drill_pluginShort = "";		//子插件简称
	
	this._drill_canAdsorb = true;		//可吸附（默认开启）
	this._drill_pullOutEnabled = true;	//可脱离槽（默认开启）
	this._drill_animEnabled = true;		//吸附动画开关（默认开启）
}
//==============================
// * A主体 - 设置可吸附（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setCanAdsorb = function( enabled ){
	this._drill_canAdsorb = enabled;
}
//==============================
// * A主体 - 是否可吸附
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_canAdsorb = function(){
	if( this._drill_canAdsorb == false ){ return false; }
	if( this._drill_adsorbTypeList.length == 0 ){ return false; }
	return true;
}
//==============================
// * A主体 - 设置可脱离槽（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setPullOutEnabled = function( enabled ){
	this._drill_pullOutEnabled = enabled;
}
//==============================
// * A主体 - 是否可脱离槽
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_pullOutEnabled = function(){
	return this._drill_pullOutEnabled;
}
//==============================
// * A主体 - 设置吸附动画开关（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setAnimEnabled = function( enabled ){
	this._drill_animEnabled = enabled;
}
//==============================
// * A主体 - 是否可用吸附动画
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_animEnabled = function(){
	return this._drill_animEnabled;
}


//==============================
// * B可吸附类型 - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initType = function(){
	this._drill_adsorbTypeList = [];		//可吸附类型
}
//==============================
// * B可吸附类型 - 添加可吸附类型
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_addAdsorbType = function( type_str ){
	if( this._drill_adsorbTypeList.indexOf( type_str ) >= 0 ){ return; }
	this._drill_adsorbTypeList.push( type_str );
}
//==============================
// * B可吸附类型 - 去除可吸附类型
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_removeAdsorbType = function( type_str ){
	for(var i = this._drill_adsorbTypeList.length-1; i >= 0; i-- ){
		var temp_type = this._drill_adsorbTypeList[i];
		if( temp_type == type_str ){
			this._drill_adsorbTypeList.splice(i,1);
		}
	}
}
//==============================
// * B可吸附类型 - 去除全部可吸附类型
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_removeAllAdsorbType = function(){
	this._drill_adsorbTypeList = [];
}
//==============================
// * B可吸附类型 - 是否可吸附指定类型
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_hasAdsorbType = function( type_str ){
	if( this._drill_canAdsorb == false ){ return false; }
	return this._drill_adsorbTypeList.indexOf( type_str ) >= 0;
}
//==============================
// * B可吸附类型 - 是否可吸附指定类型列表
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_hasAdsorbTypeInList = function( type_list ){
	if( this._drill_canAdsorb == false ){ return false; }
	for(var i = 0; i < type_list.length; i++ ){
		var type_str = type_list[i];
		if( this._drill_adsorbTypeList.indexOf( type_str ) >= 0 ){
			return true;
		}
	}
	return false;
}


//==============================
// * C外键拖拽 - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initFKeyDrag = function(){
	this._drill_foreignKey_dragId = -1;
}
//==============================
// * C外键拖拽 - 获取 外键（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_getDragId = function(){
	return this._drill_foreignKey_dragId;
}
//==============================
// * C外键拖拽 - 获取 拖拽控制器（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_getDragController = function(){
	return $gameSystem._drill_CODAA_dragFactory.drill_factoryDrag_getByProductId( this._drill_foreignKey_dragId );
}


//==============================
// * D外键吸附槽 - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initFKeySlot = function(){
	this._drill_foreignKey_slotId = -1;		//（此参数不能直接赋值，需要通过调用函数赋值）
}
//==============================
// * D外键吸附槽 - 外键变化
//
//			说明：	> 该函数不开放，吸附槽的id由 监听 进行手动控制。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setForeignKey_slotId = function( slot_id ){
	this._drill_foreignKey_slotId = slot_id;
}
//==============================
// * D外键吸附槽 - 获取 外键（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_getSlotId = function(){
	return this._drill_foreignKey_slotId;
}
//==============================
// * D外键吸附槽 - 获取 吸附槽控制器（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_getSlotController = function(){
	return $gameSystem._drill_CODAA_slotFactory.drill_factorySlot_getByProductId( this._drill_foreignKey_slotId );
}


//==============================
// * E吸附位移 - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initOffset = function(){
	
	this._drill_curMovingX = 0;			//E吸附位移 - 弹道移动的位置
	this._drill_curMovingY = 0;			//
	this._drill_curSlotX = 0;			//E吸附位移 - 吸附槽的位置
	this._drill_curSlotY = 0;			//
	
	this._drill_curOrgX = 0;			//E吸附位移 - 原位置（数据最终变换值，不含拖拽偏移量，不含吸附位置）
	this._drill_curOrgY = 0;			//
}
//==============================
// * E吸附位移 - 帧刷新
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_updateOffset = function( cur_orgX, cur_orgY ){
	this._drill_curOrgX = cur_orgX;
	this._drill_curOrgY = cur_orgY;
}
//==============================
// * E吸附位移 - 获取吸附位置X（开放函数）
//
//			说明：	> 考虑到 吸附槽 可能会动态移动，因此贴图在吸附的一瞬间，坐标就被固定为跟随 吸附槽 移动了。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_getAdsorbingX = function(){
	return this._drill_curMovingX + this._drill_curSlotX;
}
//==============================
// * E吸附位移 - 获取吸附位置Y（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_getAdsorbingY = function(){
	return this._drill_curMovingY + this._drill_curSlotY;
}
//==============================
// * E吸附位移 - 立即合并吸附位置（开放函数）
//
//			说明：	> 合并偏移量即：直接覆盖为吸附位置。
//==============================
//	（无）
//==============================
// * E吸附位移 - 立即清零吸附位置（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_clearAdsorbPosition = function() {
	this._drill_curMovingX = 0;
	this._drill_curMovingY = 0;
	this._drill_curSlotX = 0;
	this._drill_curSlotY = 0;
}
//==============================
// * E吸附位移 - 将 吸附+拖拽偏移量 转移成 拖拽偏移量
//
//			说明：	> 此函数用于 回退到"未吸附"时，保持当前位置不变的效果。
//					  因为该插件不修改 原位置，所以要转移成 拖拽偏移量。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_convertToDraggingOffset = function() {
	var dx = this._drill_curOrgX - this.drill_controllerAdsorb_getAdsorbingX();		//（此处已包含 拖拽偏移量 的影响）
	var dy = this._drill_curOrgY - this.drill_controllerAdsorb_getAdsorbingY();		//
	var drag_controller = this.drill_controllerAdsorb_getDragController();
	drag_controller._drill_draging_x = 0;
	drag_controller._drill_draging_y = 0;
	drag_controller._drill_drag_movedX = -1* dx;
	drag_controller._drill_drag_movedY = -1* dy;
}


//==============================
// * F吸附状态 - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initState = function(){
	this._drill_curState = 0;			//吸附状态（0未吸附/1正被吸附/2已吸附/3拖走吸附）
}
//==============================
// * F吸附状态 - 获取当前吸附状态字符串（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_getAdsorbingStateString = function(){
	if( this._drill_curState == 0 ){ return "未吸附"; }
	if( this._drill_curState == 1 ){ return "正被吸附"; }
	if( this._drill_curState == 2 ){ return "已吸附"; }
	if( this._drill_curState == 3 ){ return "拖走吸附"; }
	return "";
}
//==============================
// * F吸附状态 - 是否"未吸附"（开放函数）
//
//			说明：	> 此过程表示 贴图 未吸附的状态。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_isState0 = function(){
	return this._drill_curState == 0;
}
//==============================
// * F吸附状态 - 是否"正被吸附"（开放函数）
//
//			说明：	> 此过程表示 贴图 正被吸附并位移 的过程。
//					> 该状态必然连接了 D外键吸附槽 。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_isState1 = function(){
	return this._drill_curState == 1;
}
//==============================
// * F吸附状态 - 是否"已吸附"（开放函数）
//
//			说明：	> 此过程表示 贴图 已吸附的状态。
//					> 该状态必然连接了 D外键吸附槽 。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_isState2 = function(){
	return this._drill_curState == 2;
}
//==============================
// * F吸附状态 - 是否"拖走吸附"（开放函数）
//
//			说明：	> 此过程表示 贴图 已吸附时拖出的状态。
//					> 该状态必然连接了 D外键吸附槽 。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_isState3 = function(){
	return this._drill_curState == 3;
}
//==============================
// * F吸附状态 - 设置"未吸附"（开放函数）
//
//			说明：	> 该函数可以手动调用，但通常会被 监听 调用。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setState0 = function(){
	//if( this._drill_curState == 0 ){ return; };（强制执行，这里不能优化）
	this._drill_curState = 0;
	
	// > D外键吸附槽
	this.drill_controllerAdsorb_setForeignKey_slotId( -1 );
}
//==============================
// * F吸附状态 - 设置"正被吸附"（开放函数）
//
//			说明：	> 该函数可以手动调用，但通常会被 监听 调用。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setState1 = function( slot_controller ){
	//if( this._drill_curState == 1 ){ return; };（强制执行，这里不能优化）
	var last_state = this._drill_curState;
	this._drill_curState = 1;
	
	// > 未开吸附动画，则立即进入"已吸附"状态
	if( this.drill_controllerAdsorb_animEnabled() == false ){
		this.drill_controllerAdsorb_setState2( slot_controller );
		this.drill_controllerAdsorb_updateAnim2();	//（强制刷新一次）
		return;
	}
	
	// > D外键吸附槽
	this.drill_controllerAdsorb_setForeignKey_slotId( slot_controller._drill_productId );
	
	// > 设置弹道（要放 拖拽控制器操作 前面）
	this.drill_controllerAdsorb_setAnim1Move( slot_controller, last_state );
	
	// > 拖拽控制器
	var drag_controller = this.drill_controllerAdsorb_getDragController();
	drag_controller._drill_isDraging = false;					//关闭拖拽
	drag_controller.drill_controllerDrag_clearDragPosition();	//立即清零拖拽偏移量
}
//==============================
// * F吸附状态 - 设置"已吸附"（开放函数）
//
//			说明：	> 该函数可以手动调用，但通常会被 监听 调用。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setState2 = function( slot_controller ){
	//if( this._drill_curState == 2 ){ return; };（强制执行，这里不能优化）
	this._drill_curState = 2;
	
	// > D外键吸附槽
	this.drill_controllerAdsorb_setForeignKey_slotId( slot_controller._drill_productId );
	
	// > 删除弹道
	this['_drill_COBa_x'] = undefined;
	this['_drill_COBa_y'] = undefined;
	
	// > 拖拽控制器
	var drag_controller = this.drill_controllerAdsorb_getDragController();
	drag_controller._drill_isDraging = false;					//关闭拖拽
	drag_controller.drill_controllerDrag_clearDragPosition();	//立即清零拖拽偏移量
}
//==============================
// * F吸附状态 - 设置"拖走吸附"（开放函数）
//
//			说明：	> 该函数可以手动调用，但通常会被 监听 调用。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setState3 = function(){
	//if( this._drill_curState == 3 ){ return; };（强制执行，这里不能优化）
	this._drill_curState = 3;
	
	// > D外键吸附槽（不赋值，但这里有值）
	//this.drill_controllerAdsorb_setForeignKey_slotId(  );
	
	// > 拖拽控制器
	var drag_controller = this.drill_controllerAdsorb_getDragController();
	drag_controller._drill_isDraging = true;					//开启拖拽
	drag_controller.drill_controllerDrag_clearDragPosition();	//立即清零拖拽偏移量
}


//==============================
// * H吸附动画"未吸附" - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initAnim0 = function(){
	//（无）
}
//==============================
// * H吸附动画"未吸附" - 帧刷新
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_updateAnim0 = function(){
	if( this._drill_curState != 0 ){ return; }
	
	// > 帧刷新 - 弹道移动的位置
	this._drill_curMovingX = 0;
	this._drill_curMovingY = 0;
	
	// > 帧刷新 - 吸附槽的位置
	this._drill_curSlotX = 0;
	this._drill_curSlotY = 0;
}


//==============================
// * I吸附动画"正被吸附" - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initAnim1 = function(){
	this._drill_curAnim1Time = 0;				//当前时间
	this._drill_tarAnim1Time = 20;				//目标时间
	this._drill_tarAnim1DataTime = 20;			//动画时长
	this._drill_anim1MoveType = "匀速移动";		//动画移动方式
}
//==============================
// * I吸附动画"正被吸附" - 设置动画时长（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setAnim1PlayerTime = function( play_time ){
	this._drill_tarAnim1DataTime = Number( play_time );
}
//==============================
// * I吸附动画"正被吸附" - 设置动画移动方式（开放函数）
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setAnim1MoveType = function( move_type ){
	this._drill_anim1MoveType = move_type;
}
//==============================
// * I吸附动画"正被吸附" - 设置弹道
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setAnim1Move = function( slot_controller, last_state ){
	
	// > 位置（原位置+拖拽偏移量）
	var drag_controller = this.drill_controllerAdsorb_getDragController();
	var cur_x = this._drill_curOrgX + drag_controller.drill_controllerDrag_getDraggingXOffset();
	var cur_y = this._drill_curOrgY + drag_controller.drill_controllerDrag_getDraggingYOffset();
	
	// > 位置（吸附位置，包含了拖拽偏移量）
	if( last_state == 1 || 
		last_state == 2 || 
		last_state == 3 ){ 
		cur_x = this.drill_controllerAdsorb_getAdsorbingX();
		cur_y = this.drill_controllerAdsorb_getAdsorbingY();
	}
	var tar_x = slot_controller.drill_slot_x();
	var tar_y = slot_controller.drill_slot_y();
	var dx = cur_x - tar_x;	//（注意是反向）
	var dy = cur_y - tar_y;
	
	// > 时间清零
	this._drill_curAnim1Time = 0;
	this._drill_tarAnim1Time = this._drill_tarAnim1DataTime;
	
	// > 【距离太小时，缩短吸附动画时间】
	if( Math.abs(dx) < 8 ||
		Math.abs(dy) < 8 ){
		this._drill_tarAnim1Time = 1;
	}
	if( Math.abs(dx) < 16 ||
		Math.abs(dy) < 16 ){
		this._drill_tarAnim1Time = 6;
	}
	
	// > 弹道 - 两点式弹道
	var data = {};
	data['movementMode']  = "两点式";
	data['movementTime']  = this._drill_tarAnim1Time
	data['movementDelay'] = 0;
	data['twoPointType']  = this._drill_anim1MoveType;
	data['twoPointDifferenceX'] = dx;
	data['twoPointDifferenceY'] = dy;
	
	// > 弹道 - 初始化
	$gameTemp.drill_COBa_setBallisticsMove( data );				//初始化
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, 0, 0 );	//推演赋值（由于是偏移，原始位置为0,0）
	
	// > 弹道 - 测试
	//alert( data['twoPointDifferenceY'] );
	//alert( this['_drill_COBa_y'] );
	
	// > 强制刷新一次
	this.drill_controllerAdsorb_updateAnim1();
}
//==============================
// * I吸附动画"正被吸附" - 帧刷新
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_updateAnim1 = function(){
	if( this._drill_curState != 1 ){ return; }
	
	// > 帧刷新 - 弹道移动的位置
	//			（由于 F吸附状态 设置后，吸附位置会锁定 贴图坐标，所以需要倒放）
	var cur_time = this._drill_curAnim1Time;
	cur_time = Math.floor( this._drill_tarAnim1Time -cur_time );
	if( cur_time <= 0 ){ cur_time = 0; }
	this._drill_curMovingX = this['_drill_COBa_x'][ cur_time ];
	this._drill_curMovingY = this['_drill_COBa_y'][ cur_time ];
	
	// > 帧刷新 - 吸附槽的位置
	var slot_controller = this.drill_controllerAdsorb_getSlotController();
	this._drill_curSlotX = slot_controller.drill_slot_x();
	this._drill_curSlotY = slot_controller.drill_slot_y();
	
	// > 帧刷新 - 时间+1
	this._drill_curAnim1Time += 1;
}
//==============================
// * I吸附动画"正被吸附" - 是否播放结束
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_isAnim1End = function() {
	return this._drill_curAnim1Time >= this._drill_tarAnim1Time;
}


//==============================
// * J吸附动画"已吸附" - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initAnim2 = function(){
	//（无）
}
//==============================
// * J吸附动画"已吸附" - 帧刷新
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_updateAnim2 = function(){
	if( this._drill_curState != 2 ){ return; }
	
	// > 帧刷新 - 弹道移动的位置
	this._drill_curMovingX = 0;
	this._drill_curMovingY = 0;
	
	// > 帧刷新 - 吸附槽的位置
	var slot_controller = this.drill_controllerAdsorb_getSlotController();
	this._drill_curSlotX = slot_controller.drill_slot_x();
	this._drill_curSlotY = slot_controller.drill_slot_y();
}


//==============================
// * K吸附动画"拖走吸附" - 初始化子功能
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_initAnim3 = function(){
	//（无）
}
//==============================
// * K吸附动画"拖走吸附" - 帧刷新
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_updateAnim3 = function(){
	if( this._drill_curState != 3 ){ return; }
	
	// > 帧刷新 - 弹道移动的位置（就是 拖拽偏移量）
	var drag_controller = this.drill_controllerAdsorb_getDragController();
	this._drill_curMovingX = drag_controller.drill_controllerDrag_getDraggingXOffset();
	this._drill_curMovingY = drag_controller.drill_controllerDrag_getDraggingYOffset();
	
	// > 帧刷新 - 吸附槽的位置
	//		（拖走后，停止赋值）
}



//=============================================================================
// ** 吸附数据工厂【Drill_CODAA_AdsorbFactory】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个 吸附控制器 数据工厂。
// **		子功能：	
// **					->数据工厂
// **					->A容器
// **						->创建 吸附控制器
// **						->删除 吸附控制器
// **					->B获取
// **						->获取 吸附控制器 - 根据ID
// **						->获取 吸附控制器列表 - 根据子插件
// **		
// **		说明：	> 子插件不要自己创建控制器，必须通过工厂类创建控制器。
//=============================================================================
//==============================
// * 数据工厂 - 定义
//==============================
function Drill_CODAA_AdsorbFactory() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 数据工厂 - 初始化
//==============================
Drill_CODAA_AdsorbFactory.prototype.initialize = function(){
	this._drill_factorySerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_factoryAdsorb_initChild();								//初始化子功能
};
//==============================
// * 数据工厂 - 初始化子功能
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_initChild = function(){
	this.drill_factoryAdsorb_initCreate();		//初始化子功能 - A容器
	this.drill_factoryAdsorb_initGet();			//初始化子功能 - B获取
};

//==============================
// * A容器 - 初始化子功能
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_initCreate = function(){
	this._drill_productTank = [];			//工厂容器
	this._drill_curProductId = 0;			//当前工厂标识（只增不减）
}
//==============================
// * A容器 - 创建 吸附控制器（开放函数）
//
//			参数：	> pluginShort 字符串（插件简称）
//			说明：	> 创建后返回 product_id 。
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_create = function( pluginShort ){
	var product_id = this._drill_curProductId;
	
	// > 创建控制器
	var controller = new Drill_CODAA_AdsorbController();
	controller.drill_controllerAdsorb_setProductId( product_id );
	controller.drill_controllerAdsorb_setPluginShort( pluginShort );
	this._drill_productTank[ product_id ] = controller;
	this._drill_curProductId += 1;
	
	return product_id;
}
//==============================
// * A容器 - 删除 吸附控制器（开放函数）
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_remove = function( controller ){
	if( controller == undefined ){ return; }
	this.drill_factoryAdsorb_removeByProductId( controller._drill_productId );
}
//==============================
// * A容器 - 删除 吸附控制器 - 根据工厂标识（开放函数）
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_removeByProductId = function( product_id ){
	this._drill_productTank[ product_id ] = null;
}

//==============================
// * B获取 - 初始化子功能
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_initGet = function(){
	//（无）
}
//==============================
// * B获取 - 获取 吸附控制器 - 根据ID（开放函数）
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_getByProductId = function( product_id ){
	return this._drill_productTank[ product_id ];
}
//==============================
// * B获取 - 获取 吸附控制器列表 - 根据子插件（开放函数）
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_getByPluginShort = function( pluginShort ){
	var result_list = [];
	for(var i = 0; i < this._drill_productTank.length; i++ ){
		var controller = this._drill_productTank[i];
		if( controller == undefined ){ continue; }
		if( controller._drill_pluginShort == pluginShort ){
			result_list.push( controller );
		}
	}
	return result_list;
}
//==============================
// * B获取 - 获取 吸附控制器 - 根据拖拽ID（开放函数）
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_getByDragId = function( dragId ){
	for(var i = 0; i < this._drill_productTank.length; i++ ){
		var controller = this._drill_productTank[i];
		if( controller == undefined ){ continue; }
		if( controller.drill_controllerAdsorb_getDragId() == dragId ){
			return controller;
		}
	}
	return null;
}
//==============================
// * B获取 - 获取 吸附控制器列表 - 根据吸附槽ID（开放函数）
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_getBySlotId = function( slotId ){
	var result_list = [];
	for(var i = 0; i < this._drill_productTank.length; i++ ){
		var controller = this._drill_productTank[i];
		if( controller == undefined ){ continue; }
		if( controller.drill_controllerAdsorb_getSlotId() == slotId ){
			result_list.push( controller );
		}
	}
	return result_list;
}



//=============================================================================
// ** 吸附槽控制器【Drill_CODAA_SlotController】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个吸附槽 数据类。
// **		子功能：	
// **					->控制器
// **						->帧刷新
// **					->A主体
// **					->B槽吸附类型
// **					->C吸附数量
// **					->D位置
// **					->E自变化效果
// **					->H必然吸附
// **					->I一般吸附
// **					->J交换吸附
// **		
// **		说明：	> 子插件必须通过工厂类创建控制器。
// **				> 因为工厂关系，子插件不能定义子类，但可以继承函数。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_CODAA_SlotController() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 初始化
//==============================
Drill_CODAA_SlotController.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_slotSerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_slot_initData();										//初始化数据
    this.drill_slot_initChild();									//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_slot_resetData( data );
}
//##############################
// * 控制器 - 帧刷新
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 该函数需要子插件 手动调用。
//##############################
Drill_CODAA_SlotController.prototype.drill_slot_update = function() {
	this.drill_slot_updateAttr();			//帧刷新 - A主体
											//帧刷新 - B槽吸附类型（无）
											//帧刷新 - C吸附数量（无）
	this.drill_slot_updatePosition();		//帧刷新 - D位置
	this.drill_slot_updateEffect();			//帧刷新 - E自变化效果
											//帧刷新 - H必然吸附（无）
											//帧刷新 - I一般吸附（无）
											//帧刷新 - J交换吸附（无）
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_CODAA_SlotController.prototype.drill_slot_resetData = function( data ){
	this.drill_slot_resetData_Private( data );
};
//##############################
// * 控制器 - 设置销毁【标准函数】（暂未用到）
//
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 吸附槽 可能会关联贴图，所以这里保留销毁功能。
//##############################
Drill_CODAA_SlotController.prototype.drill_slot_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 吸附槽 可能会关联贴图，所以这里保留销毁功能。
//##############################
Drill_CODAA_SlotController.prototype.drill_slot_isDead = function(){
	return this._drill_needDestroy == true;
};
//##############################
// * A主体 - 设置工厂标识
//			
//			参数：	> id 数字  （工厂编号）
//			返回：	> 无
//##############################
Drill_CODAA_SlotController.prototype.drill_slot_setProductId = function( id ){
	this._drill_productId = id;
};
//##############################
// * A主体 - 设置子插件标识
//			
//			参数：	> pluginShort 字符串（插件简称）
//			返回：	> 无
//			
//			说明：	> 由于该类不能被继承，并且统一由数据工厂分发，所以 子插件 需要通过此标识来获取 控制器对象。
//##############################
Drill_CODAA_SlotController.prototype.drill_slot_setPluginShort = function( pluginShort ){
	this._drill_pluginShort = pluginShort;
};
//##############################
// * 控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_CODAA_SlotController.prototype.drill_slot_initData = function(){
	var data = this._drill_data;
	
	// > A主体
	//	（无）
	
	// > B槽吸附类型
	if( data['slotTypeList'] == undefined ){ data['slotTypeList'] = [] };		//B槽吸附类型 - 槽的可吸附类型列表
	
	// > C吸附数量
	if( data['maxAdsorbNum'] == undefined ){ data['maxAdsorbNum'] = 10 };		//C吸附数量 - 最大吸附数量
	
	// > D位置
	if( data['x'] == undefined ){ data['x'] = 0 };								//D位置 - 位置X
	if( data['y'] == undefined ){ data['y'] = 0 };								//D位置 - 位置Y
	if( data['offset_x'] == undefined ){ data['offset_x'] = 0 };				//D位置 - 偏移位置X
	if( data['offset_y'] == undefined ){ data['offset_y'] = 0 };				//D位置 - 偏移位置Y
	
	// > E自变化效果
	//	（不初始化，直接通过样式定义）
	
	// > H必然吸附
	if( data['essentialEnabled'] == undefined ){ data['essentialEnabled'] = false };	//H必然吸附 - 开关
	if( data['essentialType'] == undefined ){ data['essentialType'] = 0 };				//H必然吸附 - 类型（0圆形/1方形）
	if( data['essentialRadius'] == undefined ){ data['essentialRadius'] = 16 };			//H必然吸附 - 半径
	if( data['essentialWidth'] == undefined ){ data['essentialWidth'] = 32 };			//H必然吸附 - 宽度
	if( data['essentialHeight'] == undefined ){ data['essentialHeight'] = 32 };			//H必然吸附 - 高度
	
	// > I一般吸附
	if( data['commonEnabled'] == undefined ){ data['commonEnabled'] = false };			//I一般吸附 - 开关
	if( data['commonType'] == undefined ){ data['commonType'] = 0 };					//I一般吸附 - 类型（0圆形/1方形）
	if( data['commonRadius'] == undefined ){ data['commonRadius'] = 90 };				//I一般吸附 - 半径
	if( data['commonWidth'] == undefined ){ data['commonWidth'] = 180 };				//I一般吸附 - 宽度
	if( data['commonHeight'] == undefined ){ data['commonHeight'] = 180 };				//I一般吸附 - 高度
	
	// > J交换吸附
	if( data['exchangeEnabled'] == undefined ){ data['exchangeEnabled'] = false };		//J交换吸附 - 交换吸附
	if( data['exchangeType'] == undefined ){ data['exchangeType'] = 0 };				//J交换吸附 - 类型（0圆形/1方形）
	if( data['exchangeRadius'] == undefined ){ data['exchangeRadius'] = 30 };			//J交换吸附 - 交换吸附
	if( data['exchangeWidth'] == undefined ){ data['exchangeWidth'] = 60 };				//J交换吸附 - 宽度
	if( data['exchangeHeight'] == undefined ){ data['exchangeHeight'] = 60 };			//J交换吸附 - 高度
}
//==============================
// * 控制器 - 初始化子功能
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_initChild = function(){
	this.drill_slot_initAttr();			//初始化子功能 - A主体
	this.drill_slot_initType();			//初始化子功能 - B槽吸附类型
	this.drill_slot_initMax();			//初始化子功能 - C吸附数量
	this.drill_slot_initPosition();		//初始化子功能 - D位置
	this.drill_slot_initEffect();		//初始化子功能 - E自变化效果
	this.drill_slot_initEssential();	//初始化子功能 - H必然吸附
	this.drill_slot_initCommon();		//初始化子功能 - I一般吸附
	this.drill_slot_initExchange();		//初始化子功能 - J交换吸附
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_resetData_Private = function( data ){
	
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
	this._drill_data = JSON.parse(JSON.stringify( data ));				//深拷贝
	this._drill_slotSerial = new Date().getTime() + Math.random();		//『生成一个不重复的序列号』
    this.drill_slot_initData();											//初始化数据
    this.drill_slot_initChild();										//初始化子功能
}

//==============================
// * A主体 - 初始化子功能
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_initAttr = function(){
	this._drill_productId = -1;			//工厂标识
	this._drill_pluginShort = "";		//子插件简称
	
	this._drill_needDestroy = false;
	this._drill_curTime = 0;
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_updateAttr = function(){
	
	// > 时间+1
	this._drill_curTime += 1;
}

//==============================
// * B槽吸附类型 - 初始化子功能
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_initType = function(){
	this._drill_slotTypeList = this._drill_data['slotTypeList'];	//（此参数只用于初始化，赋值完后删除）
	this._drill_data['slotTypeList'] = undefined;
	delete this._drill_data['slotTypeList'];
}
//==============================
// * B槽吸附类型 - 添加槽吸附类型
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_addAdsorbType = function( type_str ){
	if( this._drill_slotTypeList.indexOf( type_str ) >= 0 ){ return; }
	this._drill_slotTypeList.push( type_str );
}
//==============================
// * B槽吸附类型 - 去除槽吸附类型
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_removeAdsorbType = function( type_str ){
	for(var i = this._drill_slotTypeList.length-1; i >= 0; i-- ){
		var temp_type = this._drill_slotTypeList[i];
		if( temp_type == type_str ){
			this._drill_slotTypeList.splice(i,1);
		}
	}
}
//==============================
// * B槽吸附类型 - 去除全部槽吸附类型
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_removeAllAdsorbType = function(){
	this._drill_slotTypeList = [];
}
//==============================
// * B槽吸附类型 - 是否有指定槽吸附类型
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_hasAdsorbType = function( type_str ){
	return this._drill_slotTypeList.indexOf( type_str ) >= 0;
}
//==============================
// * B槽吸附类型 - 是否有至少一个槽吸附类型
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_hasAdsorbTypeInList = function( type_list ){
	for(var i = 0; i < type_list.length; i++ ){
		var type_str = type_list[i];
		if( this._drill_slotTypeList.indexOf( type_str ) >= 0 ){
			return true;
		}
	}
	return false;
}

//==============================
// * C吸附数量 - 初始化子功能
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_initMax = function(){
	this._drill_maxAdsorbNum = this._drill_data['maxAdsorbNum'];	//（此参数只用于初始化，赋值完后删除）
	this._drill_data['maxAdsorbNum'] = undefined;
	delete this._drill_data['maxAdsorbNum'];
};
//==============================
// * C吸附数量 - 设置 最大吸附数量
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_setMaxAdsorbNum = function( num ){
	this._drill_maxAdsorbNum = num;
};
//==============================
// * C吸附数量 - 获取 最大吸附数量
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_maxAdsorbNum = function(){
	return this._drill_maxAdsorbNum;
};
//==============================
// * C吸附数量 - 获取 当前吸附数量
//==============================
//	（见后面函数：drill_slot_curAdsorbNum ）

//==============================
// * D位置 - 初始化子功能
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_initPosition = function(){
	this._drill_slot_x = 0;
	this._drill_slot_y = 0;
}
//==============================
// * D位置 - 属性获取
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_x = function(){ return this._drill_slot_x; };
Drill_CODAA_SlotController.prototype.drill_slot_y = function(){ return this._drill_slot_y; };
//==============================
// * D位置 - 帧刷新
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_updatePosition = function(){
	var data = this._drill_data;
	
	// > 位置
	var xx = data['x'];
	var yy = data['y'];
	xx += data['offset_x'];
	yy += data['offset_y'];
	
	this._drill_slot_x = xx;
	this._drill_slot_y = yy;
}

//==============================
// * E自变化效果 - 初始化子功能
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_initEffect = function(){
	//（无）
}
//==============================
// * E自变化效果 - 帧刷新
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_updateEffect = function(){
	var data = this._drill_data;
	var cur_time = this._drill_curTime;

	// > 浮动效果
	if( data['effect_float'] == "左右浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_slot_x += value;
	}
	if( data['effect_float'] == "上下浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_slot_y += value;
	}
	if( data['effect_float'] == "左上右下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_slot_x += value;
		this._drill_slot_y += value;
	}
	if( data['effect_float'] == "右上左下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_slot_x -= value;
		this._drill_slot_y += value;
	}
	
	// > 圆周移动效果
	if( data['effect_ring'] == "顺时针圆周移动" ){
		var start = data['effect_ringStart'];
		var speed = data['effect_ringSpeed'];
		var radius = data['effect_ringRadius'];
		var angle = (start + cur_time*speed) /180*Math.PI
		var xx = radius*Math.cos( angle );		//圆公式 (x-a)²+(y-b)²=r²
		var yy = radius*Math.sin( angle );		//圆极坐标 x=ρcosθ,y=ρsinθ
		this._drill_slot_x += xx -radius;		//偏移至左边圆周
		this._drill_slot_y += yy;
	}
	if( data['effect_ring'] == "逆时针圆周移动" ){
		var start = data['effect_ringStart'];
		var speed = data['effect_ringSpeed'];
		var radius = data['effect_ringRadius'];
		var angle = (start - cur_time*speed) /180*Math.PI
		var xx = radius*Math.cos( angle );		//圆公式 (x-a)²+(y-b)²=r²
		var yy = radius*Math.sin( angle );		//圆极坐标 x=ρcosθ,y=ρsinθ
		this._drill_slot_x += xx -radius;		//偏移至左边圆周
		this._drill_slot_y += yy;
	}
	
}

//==============================
// * H必然吸附 - 初始化子功能
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_initEssential = function(){
	//（无）
}
//==============================
// * H必然吸附 - 属性获取
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_essentialEnabled = function(){ return this._drill_data['essentialEnabled']; };
//==============================
// * H必然吸附 - 是否在范围内
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_isInEssentialRange = function( cur_x, cur_y ){
	var data = this._drill_data;
	if( data['essentialEnabled'] != true ){ return false; }
	var tar_x = this.drill_slot_x();
	var tar_y = this.drill_slot_y();
	
	// > H必然吸附 - 圆形
	if( data['essentialType'] == 0 ){
		var dx = tar_x - cur_x;
		var dy = tar_y - cur_y;
		var dr = data['essentialRadius'];
		var dx2dy2 = dx*dx + dy*dy;
		if( dx2dy2 <= dr*dr ){
			return true;
		}
	}
	// > H必然吸附 - 方形
	if( data['essentialType'] == 1 ){
		var dx = Math.abs( tar_x - cur_x )*2;
		var dy = Math.abs( tar_y - cur_y )*2;
		if( dx <= data['essentialWidth'] && 
			dy <= data['essentialHeight'] ){
			return true;
		}
	}
	return false;
};

//==============================
// * I一般吸附 - 初始化子功能
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_initCommon = function(){
	//（无）
}
//==============================
// * I一般吸附 - 属性获取
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_commonEnabled = function(){ return this._drill_data['commonEnabled']; };
//==============================
// * I一般吸附 - 是否在范围内
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_isInCommonRange = function( cur_x, cur_y ){
	var data = this._drill_data;
	if( data['commonEnabled'] != true ){ return false; }
	var tar_x = this.drill_slot_x();
	var tar_y = this.drill_slot_y();
	
	// > I一般吸附 - 圆形
	if( data['commonType'] == 0 ){
		var dx = tar_x - cur_x;
		var dy = tar_y - cur_y;
		var dr = data['commonRadius'];
		var dx2dy2 = dx*dx + dy*dy;
		if( dx2dy2 <= dr*dr ){
			return true;
		}
	}
	// > I一般吸附 - 方形
	if( data['commonType'] == 1 ){
		var dx = Math.abs( tar_x - cur_x )*2;
		var dy = Math.abs( tar_y - cur_y )*2;
		if( dx <= data['commonWidth'] && 
			dy <= data['commonHeight'] ){
			return true;
		}
	}
	return false;
};

//==============================
// * J交换吸附 - 初始化子功能
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_initExchange = function(){
	//（无）
}
//==============================
// * J交换吸附 - 属性获取
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_exchangeEnabled = function(){ return this._drill_data['exchangeEnabled']; };
//==============================
// * J交换吸附 - 是否在范围内
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_isInExchangeRange = function( cur_x, cur_y ){
	var data = this._drill_data;
	if( data['exchangeEnabled'] != true ){ return false; }
	var tar_x = this.drill_slot_x();
	var tar_y = this.drill_slot_y();
	
	// > J交换吸附 - 圆形
	if( data['exchangeType'] == 0 ){
		var dx = tar_x - cur_x;
		var dy = tar_y - cur_y;
		var dr = data['exchangeRadius'];
		var dx2dy2 = dx*dx + dy*dy;
		if( dx2dy2 <= dr*dr ){
			return true;
		}
	}
	// > J交换吸附 - 方形
	if( data['exchangeType'] == 1 ){
		var dx = Math.abs( tar_x - cur_x )*2;
		var dy = Math.abs( tar_y - cur_y )*2;
		if( dx <= data['exchangeWidth'] && 
			dy <= data['exchangeHeight'] ){
			return true;
		}
	}
	return false;
};



//=============================================================================
// ** 吸附槽数据工厂【Drill_CODAA_SlotFactory】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个 吸附槽控制器 数据工厂。
// **		子功能：	
// **					->数据工厂
// **					->A容器
// **						->创建 吸附槽控制器
// **						->删除 吸附槽控制器
// **					->B获取
// **						->获取 吸附槽控制器 - 根据ID
// **						->获取 吸附槽控制器列表 - 根据子插件
// **		
// **		说明：	> 子插件不要自己创建控制器，必须通过工厂类创建控制器。
//=============================================================================
//==============================
// * 数据工厂 - 定义
//==============================
function Drill_CODAA_SlotFactory() {
    this.initialize.apply(this, arguments);
};
//==============================
// * 数据工厂 - 初始化
//==============================
Drill_CODAA_SlotFactory.prototype.initialize = function(){
	this._drill_factorySerial = new Date().getTime() + Math.random();	//『生成一个不重复的序列号』
    this.drill_factorySlot_initChild();									//初始化子功能
};
//==============================
// * 数据工厂 - 初始化子功能
//==============================
Drill_CODAA_SlotFactory.prototype.drill_factorySlot_initChild = function(){
	this.drill_factorySlot_initCreate();		//初始化子功能 - A容器
	this.drill_factorySlot_initGet();			//初始化子功能 - B获取
};

//==============================
// * A容器 - 初始化子功能
//==============================
Drill_CODAA_SlotFactory.prototype.drill_factorySlot_initCreate = function(){
	this._drill_productTank = [];			//工厂容器
	this._drill_curProductId = 0;			//当前工厂标识（只增不减）
}
//==============================
// * A容器 - 创建 吸附槽控制器（开放函数）
//
//			参数：	> pluginShort 字符串（插件简称）
//					> data 对象         （样式设置）
//			说明：	> 创建后返回 product_id 。
//==============================
Drill_CODAA_SlotFactory.prototype.drill_factorySlot_create = function( pluginShort, data ){
	var product_id = this._drill_curProductId;
	
	// > 创建控制器
	var slot = new Drill_CODAA_SlotController( data );
	slot.drill_slot_setProductId( product_id );
	slot.drill_slot_setPluginShort( pluginShort );
	this._drill_productTank[ product_id ] = slot;
	this._drill_curProductId += 1;
	
	return product_id;
}
//==============================
// * A容器 - 删除 吸附槽控制器（开放函数）
//==============================
Drill_CODAA_SlotFactory.prototype.drill_factorySlot_remove = function( slot ){
	if( slot == undefined ){ return; }
	this.drill_factorySlot_removeByProductId( slot._drill_productId );
}
//==============================
// * A容器 - 删除 吸附槽控制器 - 根据工厂标识（开放函数）
//==============================
Drill_CODAA_SlotFactory.prototype.drill_factorySlot_removeByProductId = function( product_id ){
	this._drill_productTank[ product_id ] = null;
}

//==============================
// * B获取 - 初始化子功能
//==============================
Drill_CODAA_SlotFactory.prototype.drill_factorySlot_initGet = function(){
	//（无）
}
//==============================
// * B获取 - 获取 吸附槽控制器 - 根据ID（开放函数）
//==============================
Drill_CODAA_SlotFactory.prototype.drill_factorySlot_getByProductId = function( product_id ){
	return this._drill_productTank[ product_id ];
}
//==============================
// * B获取 - 获取 吸附槽控制器列表 - 根据子插件（开放函数）
//==============================
Drill_CODAA_SlotFactory.prototype.drill_factorySlot_getByPluginShort = function( pluginShort ){
	var result_list = [];
	for(var i = 0; i < this._drill_productTank.length; i++ ){
		var slot = this._drill_productTank[i];
		if( slot == undefined ){ continue; }
		if( slot._drill_pluginShort == pluginShort ){
			result_list.push( slot );
		}
	}
	return result_list;
}
	
	
	
/*
	上述数据类的定义，都是正常的外键关系：
		拖拽数据工厂 生产 拖拽控制器 
		吸附数据工厂 生产 吸附控制器 
		吸附槽数据工厂 生产 吸附槽控制器 
		吸附控制器 -> 拖拽控制器 （一对一，_drill_foreignKey_dragId）
		吸附控制器 -> 吸附槽控制器 （多对一，_drill_foreignKey_slotId）
	
	后面业务逻辑的定义，会出现通过 工厂容器 反复横跳的设计：
		根据 拖拽ID 获取到 吸附控制器
		根据 吸附槽ID 获取到 吸附控制器
		……
		
	注意区分，数据类的外键关系没变，只是嵌套了多层。
*/
	
	
	
//=============================================================================
// ** ☆拖拽优先级与数量管理
//
//			说明：	> 该模块基于 拖拽数据工厂 ，实现只能有固定数量的 拖拽控制器 进入拖拽状态。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 2A拖拽数量最大值 - 初始化
//
//			说明：	> 【此功能】，只是一个赋值功能。
//==============================
var _drill_CODAA_CODAA_dragMax_initChild1 = Drill_CODAA_DragFactory.prototype.drill_factoryDrag_initChild;
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_initChild = function(){
	_drill_CODAA_CODAA_dragMax_initChild1.call( this );
	this._drill_dragMaxCount = {};
};
//==============================
// * 2A拖拽数量最大值 - 设置最大值（开放函数）
//
//			参数：	> pluginShort 字符串（插件简称）
//					> value 数字        （最大值）
//			返回：	> 无
//
//			说明：	> 该函数需要子插件 手动调用赋值。
//					> 如果未赋值，则默认值为1。
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_setDragMaxCount = function( pluginShort, value ){
	this._drill_dragMaxCount[ pluginShort ] = value;
};
//==============================
// * 2A拖拽数量最大值 - 帧刷新『拖拽的散装帧刷新』
//			
//			参数：	> pluginShort 字符串（插件简称）
//			返回：	> 无
//			
//			说明：	> 当前为散装帧刷新，需要子插件 手动调用，并且实时传参。
//					> 注意，此帧刷新必须在 B拖拽优先级数据 与 C拖拽位移 之间执行完。
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_updateDragMax = function( pluginShort ){
	this.drill_factoryDrag_updatePrioritySeq_Private( pluginShort );	//帧刷新 - 2B拖拽优先级顺序
	this.drill_factoryDrag_updateOrderTank_Private( pluginShort );		//帧刷新 - 2C拖拽优先级结果
	this.drill_factoryDrag_updateMaxPriority_Private( pluginShort );	//帧刷新 - 2D拖拽优先级最大值
};

//==============================
// * 2B拖拽优先级顺序 - 初始化
//
//			说明：	> 【此功能】，通过帧刷新，实时计算得到 优先级顺序。
//==============================
var _drill_CODAA_CODAA_dragMax_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_CODAA_CODAA_dragMax_temp_initialize2.call(this);
	this._drill_CODAA_dragPrioritySeq = {};
};
//==============================
// * 2B拖拽优先级顺序 - 帧刷新（私有）
//
//			说明：	> 该函数只按 优先级排序，从大到小。
//					> 该函数与 是否正在拖拽 无关，此排序作用于所有 可拖拽控制器。
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_updatePrioritySeq_Private = function( pluginShort ){
	
	// > 顺序数据 - 初始化
	var cur_seq = [];
	for(var i = 0; i < this._drill_productTank.length; i++ ){
		var drag_controller = this._drill_productTank[i];
		if( drag_controller == undefined ){ continue; }
		var temp_pluginShort = drag_controller._drill_pluginShort;
		if( temp_pluginShort == pluginShort ){
			var temp_data = {};
			temp_data['productId'] = drag_controller._drill_productId;
			temp_data['priority']  = drag_controller._drill_dragPriority_value;
			cur_seq.push( temp_data );
		}
	}
	
	// > 顺序数据 - 排序
	cur_seq.sort(function(a, b){ return b['priority']-a['priority'] });
	
	// > 顺序数据 - 测试查看
	//alert( JSON.stringify(cur_seq) );
	
	// > 顺序数据 - 赋值
	$gameTemp._drill_CODAA_dragPrioritySeq[ pluginShort ] = cur_seq;
};

//==============================
// * 2C拖拽优先级结果 - 初始化
//
//			说明：	> 【此功能】，通过帧刷新，实时计算得到 结果列表。
//					> 这个结果列表是 符合条件 组合的结果，用于判断 多个控制器 能不能同时拖拽。
//==============================
var _drill_CODAA_CODAA_dragMax_temp_initialize3 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_CODAA_CODAA_dragMax_temp_initialize3.call(this);
	this._drill_CODAA_dragPriorityOrderTank = {};
};
//==============================
// * 2C拖拽优先级结果 - 帧刷新（私有）
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_updateOrderTank_Private = function( pluginShort ){
	
	// > 结果列表 - 清空
	$gameTemp._drill_CODAA_dragPriorityOrderTank[ pluginShort ] = [];
	
	// > 结果列表 - 获取 最大值和顺序
	var max_count = this._drill_dragMaxCount[ pluginShort ];
	if( max_count == undefined ){ max_count = 1; }  //（默认值为1）
	var cur_seq = $gameTemp._drill_CODAA_dragPrioritySeq[ pluginShort ];
	if( cur_seq == undefined ){ return; }
	
	// > 结果列表 - 即时计算
	for(var i = 0; i < cur_seq.length; i++ ){
		var cur_data = cur_seq[i];
		
		// > 符合条件（鼠标悬停 + 鼠标按下 + 优先级高的 + 最大值范围内）
		var cur_controller = this.drill_factoryDrag_getByProductId( cur_data['productId'] );
		if( cur_controller == undefined ){ continue; }
		if( cur_controller._drill_dragPriority_isHover == true &&  //优先级的悬停标记
			cur_controller._drill_dragPriority_isPress == true ){  //优先级的按下标记
			
			// > 数量超出时，跳出
			if( $gameTemp._drill_CODAA_dragPriorityOrderTank[ pluginShort ].length >= max_count ){ return; }
			$gameTemp._drill_CODAA_dragPriorityOrderTank[ pluginShort ].push( cur_data['productId'] );
		}
	}
}
//==============================
// * 2C拖拽优先级结果 - 是否阻塞拖拽（继承）
//==============================
var _drill_CODAA_CODAA_dragMax_isPriorityOrderBlocked = Drill_CODAA_DragController.prototype.drill_controllerDrag_isPriorityOrderBlocked;
Drill_CODAA_DragController.prototype.drill_controllerDrag_isPriorityOrderBlocked = function(){
	
	// > 结果列表 - 不符合则阻塞
	var order_tank = $gameTemp.drill_CODAA_getDragPriorityOrderTank( this._drill_pluginShort );
	if( order_tank != undefined && order_tank.contains( this._drill_productId ) != true ){ return true; }
	
	// > 原函数
	return _drill_CODAA_CODAA_dragMax_isPriorityOrderBlocked.call( this );
};
//==============================
// * 2C拖拽优先级结果 - 获取结果列表（开放函数）
//
//			参数：	> pluginShort 字符串（插件简称）
//			返回：	> 数字列表          （控制器标识列表）
//			
//			说明：	> 该函数必须在 每帧执行完 2C拖拽优先级结果-帧刷新 之后，才能获取。（数据才能是最新的同步）
//==============================
Game_Temp.prototype.drill_CODAA_getDragPriorityOrderTank = function( pluginShort ){
	return this._drill_CODAA_dragPriorityOrderTank[ pluginShort ];
};

//==============================
// * 2D拖拽优先级最大值 - 初始化
//
//			说明：	> 【此功能】，通过帧刷新，实时计算得到 最大优先级。
//					> 此功能只提供 最大优先级、推荐优先级 获取函数。给子插件用。
//==============================
var _drill_CODAA_CODAA_dragMax_temp_initialize4 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_CODAA_CODAA_dragMax_temp_initialize4.call(this);
	this._drill_CODAA_dragMaxPriority = {};
};
//==============================
// * 2D拖拽优先级最大值 - 帧刷新（私有）
//			
//			参数：	> pluginShort 字符串（插件简称）
//			返回：	> 无
//==============================
Drill_CODAA_DragFactory.prototype.drill_factoryDrag_updateMaxPriority_Private = function( pluginShort ){
	var max_priority = 0;
	var cur_seq = $gameTemp._drill_CODAA_dragPrioritySeq[ pluginShort ];
	if( cur_seq == undefined ){ return; }
	for(var i = 0; i < cur_seq.length; i++ ){
		var cur_data = cur_seq[i];
		var cur_controller = this.drill_factoryDrag_getByProductId( cur_data['productId'] );
		if( cur_controller == undefined ){ continue; }
		
		// > 计算最大优先级
		if( max_priority < cur_controller._drill_dragPriority_value ){
			max_priority = cur_controller._drill_dragPriority_value;
		}
	}
	$gameTemp._drill_CODAA_dragMaxPriority[ pluginShort ] = max_priority;
};
//==============================
// * 2D拖拽优先级最大值 - 获取最大优先级（开放函数）
//
//			参数：	> pluginShort 字符串（插件简称）
//			返回：	> 数字              （最大优先级）
//
//			说明：	> 该函数必须在 每帧执行完 2C拖拽优先级结果-帧刷新 之后，才能获取。（数据才能是最新的同步）
//==============================
Game_Temp.prototype.drill_CODAA_getDragMaxPriority = function( pluginShort ){
	return this._drill_CODAA_dragMaxPriority[ pluginShort ];
};
//==============================
// * 2D拖拽优先级最大值 - 获取推荐优先级（开放函数）
//			
//			参数：	> pluginShort 字符串（插件简称）
//					> product_id 数字   （控制器标识）
//			返回：	> 数字              （推荐优先级）
//
//			说明：	> 该函数必须在 每帧执行完 2C拖拽优先级结果-帧刷新 之后，才能获取。（数据才能是最新的同步）
//					> 该函数用于处理同时拖拽 多个 时，提供的推荐优先级值，能确保 堆叠级 增加，但不影响顺序。
//==============================
Game_Temp.prototype.drill_CODAA_getDragRecommendPriority = function( pluginShort, product_id ){
	
	// > 最大优先级
	var max_priority = this._drill_CODAA_dragMaxPriority[ pluginShort ];
	if( max_priority == undefined ){ return 0; }
	
	// > 优先级顺序
	//		（优先级顺序中已包含 所有可拖拽对象的id ）
	//		（这里不用 优先级结果，是因为执行时，可能结果已经变成了空数组）
	var cur_seq = this._drill_CODAA_dragPrioritySeq[ pluginShort ];
	if( cur_seq == undefined ){ return max_priority+1; }
	for(var i = 0; i < cur_seq.length; i++ ){
		var cur_data = cur_seq[i];
		if( cur_data['productId'] == product_id ){
			return max_priority+1 +cur_seq.length-i;
		}
	}
	return max_priority+1;
};
	
	
	
//=============================================================================
// ** ☆吸附数量管理
//
//			说明：	> 该模块基于 吸附槽数据工厂 ，实现只能有固定数量的 吸附控制器 被吸附。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 吸附数量管理 - 初始化子功能
//==============================
var _drill_CODAA_CODAA_adsorbMax_initChild = Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_initChild;
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_initChild = function(){
	_drill_CODAA_CODAA_adsorbMax_initChild.call( this );
	this.drill_factoryAdsorb_initCount();		//初始化子功能 - 吸附数量
};
//==============================
// * 吸附数量管理 - 初始化子功能
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_initCount = function(){
	this._drill_adsorbCurCount = {};			//吸附计数器
}
//==============================
// * 吸附数量管理 - 统计吸附数量
//
//			说明：	> 统计能确保计数器始终能有正确的值，不能用+1-1方法。
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_refreshCount = function(){
	this._drill_adsorbCurCount = {};
	
	for(var i = 0; i < this._drill_productTank.length; i++ ){
		var adsorb_controller = this._drill_productTank[i];
		if( adsorb_controller == undefined ){ continue; }
		
		var pluginShort = adsorb_controller._drill_pluginShort;
		var slot_id = adsorb_controller._drill_foreignKey_slotId;	//（-1表示没有吸附的槽）
		
		if( this._drill_adsorbCurCount[ pluginShort ] == undefined ){
			this._drill_adsorbCurCount[ pluginShort ] = {};
		}
		if( this._drill_adsorbCurCount[ pluginShort ][ slot_id ] == undefined ){
			this._drill_adsorbCurCount[ pluginShort ][ slot_id ] = 0;
		}
		this._drill_adsorbCurCount[ pluginShort ][ slot_id ] += 1;
	}
}
//==============================
// * 吸附数量管理 - 获取槽的吸附数量（开放函数）
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_getCountBySlotId = function( pluginShort, slot_id ){
	if( this._drill_adsorbCurCount[ pluginShort ] == undefined ){ return 0; }
	if( this._drill_adsorbCurCount[ pluginShort ][ slot_id ] == undefined ){ return 0; }
	return this._drill_adsorbCurCount[ pluginShort ][ slot_id ];
}
//==============================
// * 吸附数量管理 - 获取未吸附的数量（开放函数）
//==============================
Drill_CODAA_AdsorbFactory.prototype.drill_factoryAdsorb_getNotAdsorbCount = function( pluginShort ){
	if( this._drill_adsorbCurCount[ pluginShort ] == undefined ){ return 0; }
	if( this._drill_adsorbCurCount[ pluginShort ][ -1 ] == undefined ){ return 0; }
	return this._drill_adsorbCurCount[ pluginShort ][ -1 ];
}

//==============================
// * 吸附数量管理 - 吸附控制器 - 外键变化时（继承）
//
//			说明：	> 该函数不开放，吸附槽的id由 监听 进行手动控制。
//==============================
var _drill_CODAA_CODAA_adsorbMax_setForeignKey = Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setForeignKey_slotId;
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setForeignKey_slotId = function( slot_id ){
	
	// > 重复外键跳出
	var old_slot_id = this._drill_foreignKey_slotId;
	if( old_slot_id == slot_id ){ return; }
	
	// > 原函数
	_drill_CODAA_CODAA_adsorbMax_setForeignKey.call( this, slot_id );
	
	// > 每修改一次外键，统计吸附数量
	$gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_refreshCount();
}

//==============================
// * 吸附数量管理 - 吸附槽控制器 - 获取当前吸附数量（开放函数）
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_curAdsorbNum = function(){
	return $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getCountBySlotId( this._drill_pluginShort, this._drill_productId );
};
//==============================
// * 吸附数量管理 - 吸附槽控制器 - 当前吸附数量是否已满（开放函数）
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_isFull = function(){
	return this.drill_slot_curAdsorbNum() >= this.drill_slot_maxAdsorbNum();
};


	
//=============================================================================
// ** ☆监听"未吸附"
//
//			说明：	> 该模块监听 "未吸附" 的条件，在满足条件时立即修改 吸附状态 。
//					> 该模块不定义新类，而是在 控制器 的基础上，加强功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 监听"未吸附" - 断开吸附
//==============================
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_cutAdsorbing = function() {
	
	// > 设置"未吸附"
	this.drill_controllerAdsorb_setState0();
	
	// > 立即清零吸附位置
	this.drill_controllerAdsorb_clearAdsorbPosition();
}
//==============================
// * 监听"未吸附" - 吸附控制器 - 设置可吸附（继承）
//
//			说明：	> 吸附控制器 属性变化时，根据时机断开吸附。
//==============================
var _drill_CODAA_CODAA_check0_setCanAdsorb = Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setCanAdsorb;
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_setCanAdsorb = function( enabled ){
	_drill_CODAA_CODAA_check0_setCanAdsorb.call( this, enabled );
	
	// > 断开吸附
	if( enabled == false ){
		this.drill_controllerAdsorb_cutAdsorbing();
	}
}
//==============================
// * 监听"未吸附" - 吸附控制器 - 去除可吸附类型（继承）
//
//			说明：	> 吸附控制器 属性变化时，根据时机断开吸附。
//==============================
var _drill_CODAA_CODAA_check0_removeAdsorbType = Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_removeAdsorbType;
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_removeAdsorbType = function( type_str ){
	_drill_CODAA_CODAA_check0_removeAdsorbType.call( this, type_str );
	
	// > 断开吸附
	var slot_controller = this.drill_controllerAdsorb_getSlotController();
	if( slot_controller == undefined ){ return; }
	
	// > 断开吸附 - 如果任意一个标签都不能吸附，则断开
	if( this.drill_controllerAdsorb_hasAdsorbTypeInList( slot_controller._drill_data['slotTypeList'] ) == false ){
		this.drill_controllerAdsorb_cutAdsorbing();
	}
}
//==============================
// * 监听"未吸附" - 吸附控制器 - 去除全部可吸附类型（继承）
//
//			说明：	> 吸附控制器 属性变化时，根据时机断开吸附。
//==============================
var _drill_CODAA_CODAA_check0_removeAllAdsorbType = Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_removeAllAdsorbType;
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_removeAllAdsorbType = function(){
	_drill_CODAA_CODAA_check0_removeAllAdsorbType.call( this );
	
	// > 断开吸附
	this.drill_controllerAdsorb_cutAdsorbing();
}

//==============================
// * 监听"未吸附" - 吸附槽控制器 - 设置最大吸附数量（继承）
//==============================
var _drill_CODAA_CODAA_check0_setMaxAdsorbNum = Drill_CODAA_SlotController.prototype.drill_slot_setMaxAdsorbNum;
Drill_CODAA_SlotController.prototype.drill_slot_setMaxAdsorbNum = function( num ){
	
	// > 断开吸附
	var adsorb_list = $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getBySlotId( this._drill_productId );
	if( adsorb_list.length > num && num >= 0 ){
		
		// > 断开吸附 - 最大数量比实际数量少，从后往前断开指定数量的 吸附控制器
		for(var i = adsorb_list.length -1; i >= num; i-- ){
			var adsorb = adsorb_list[i];
			adsorb.drill_controllerAdsorb_cutAdsorbing();
		}
	}
	
	// > 原函数
	_drill_CODAA_CODAA_check0_setMaxAdsorbNum.call( this, num );
}
//==============================
// * 监听"未吸附" - 吸附槽控制器 - 去除槽吸附类型（继承）
//==============================
var _drill_CODAA_CODAA_check0_slotRemoveAdsorbType = Drill_CODAA_SlotController.prototype.drill_slot_removeAdsorbType;
Drill_CODAA_SlotController.prototype.drill_slot_removeAdsorbType = function( type_str ){
	_drill_CODAA_CODAA_check0_slotRemoveAdsorbType.call( this, type_str );
	
	// > 断开吸附
	var adsorb_list = $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getBySlotId( this._drill_productId );
	for(var i = 0; i < adsorb_list.length; i++ ){
		var adsorb = adsorb_list[i];
		
		// > 断开吸附 - 如果任意一个标签都不能吸附，则断开
		if( adsorb.drill_controllerAdsorb_hasAdsorbTypeInList( this._drill_slotTypeList ) == false ){
			adsorb.drill_controllerAdsorb_cutAdsorbing();
		}
	}
}
//==============================
// * 监听"未吸附" - 吸附槽控制器 - 去除全部槽吸附类型（继承）
//==============================
var _drill_CODAA_CODAA_check0_slotRemoveAllAdsorbType = Drill_CODAA_SlotController.prototype.drill_slot_removeAllAdsorbType;
Drill_CODAA_SlotController.prototype.drill_slot_removeAllAdsorbType = function(){
	_drill_CODAA_CODAA_check0_slotRemoveAllAdsorbType.call( this );
	
	// > 断开吸附
	var adsorb_list = $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getBySlotId( this._drill_productId );
	for(var i = 0; i < adsorb_list.length; i++ ){
		var adsorb = adsorb_list[i];
		
		// > 断开吸附 - 所有连接槽的 吸附控制器
		adsorb.drill_controllerAdsorb_cutAdsorbing();
	}
}
//==============================
// * 监听"未吸附" - 吸附槽控制器 - 删除吸附槽（继承）
//==============================
var _drill_CODAA_CODAA_check0_slotRemove = Drill_CODAA_SlotFactory.prototype.drill_factorySlot_removeByProductId;
Drill_CODAA_SlotFactory.prototype.drill_factorySlot_removeByProductId = function( product_id ){
	
	// > 断开吸附
	var adsorb_list = $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getBySlotId( product_id );
	for(var i = 0; i < adsorb_list.length; i++ ){
		var adsorb = adsorb_list[i];
		
		// > 断开吸附 - 所有连接槽的 吸附控制器
		adsorb.drill_controllerAdsorb_cutAdsorbing();
	}
	
	// > 原函数
	_drill_CODAA_CODAA_check0_slotRemove.call( this, product_id );
}


//=============================================================================
// ** ☆监听"正被吸附"
//
//			说明：	> 该模块监听 "正被吸附" 的条件，在满足条件时立即修改 吸附状态 。
//					> 该模块不定义新类，而是在 控制器 的基础上，加强功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 监听"正被吸附" - 帧刷新
//==============================
var _drill_CODAA_CODAA_check1_update = Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_update;
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_update = function( cur_orgX, cur_orgY ){
	_drill_CODAA_CODAA_check1_update.call( this, cur_orgX, cur_orgY );
    this.drill_CODAA_update0To1();
    this.drill_CODAA_update3To1();
}
//==============================
// * 监听"正被吸附" - 帧刷新切换"未吸附"
//==============================
Drill_CODAA_AdsorbController.prototype.drill_CODAA_update0To1 = function(){
	if( this.drill_controllerAdsorb_canAdsorb() != true ){ return; }	//条件 - 不可吸附，跳出
	if( this._drill_curState != 0 ){ return; }							//条件 - 必须要 "未吸附" 的状态
	
	// > "未吸附"的位置（原位置+拖拽偏移量）
	var drag_controller = this.drill_controllerAdsorb_getDragController();
	var cur_x = this._drill_curOrgX + drag_controller.drill_controllerDrag_getDraggingXOffset();
	var cur_y = this._drill_curOrgY + drag_controller.drill_controllerDrag_getDraggingYOffset();
	
	// > 遍历吸附槽
	var slot_controller_tank = $gameSystem._drill_CODAA_slotFactory._drill_productTank;
	for(var j = 0; j < slot_controller_tank.length; j++ ){
		var slot_controller = slot_controller_tank[j];
		if( slot_controller == undefined ){ continue; }
		
		// > 条件 - 可吸附类型
		if( slot_controller.drill_slot_hasAdsorbTypeInList( this._drill_adsorbTypeList ) != true ){ continue; }
		
		// > H必然吸附
		this.drill_CODAA_update0To1_essential( slot_controller, cur_x, cur_y );
		
		// > I一般吸附
		this.drill_CODAA_update0To1_common( slot_controller, cur_x, cur_y );
		
		// > J交换吸附
		this.drill_CODAA_update0To1_exchange( slot_controller, cur_x, cur_y );
	}
}
//==============================
// * 监听"正被吸附" - 帧刷新切换"未吸附" - H必然吸附
//==============================
Drill_CODAA_AdsorbController.prototype.drill_CODAA_update0To1_essential = function( slot_controller, cur_x, cur_y ){
	
	// > 条件 - 开关
	if( slot_controller.drill_slot_essentialEnabled() != true ){ return; }
	
	// > 条件 - 距离判定
	if( slot_controller.drill_slot_isInEssentialRange(cur_x,cur_y) == false ){ return; }
	
	// > 条件 - 正在拖拽时
	//		（拖拽也会被强制吸走）
	
	// > 条件 - 吸附数量是否已满
	if( slot_controller.drill_slot_isFull() == true ){ return; }
	
	
	// > 切换 "未吸附" -> "正被吸附"
	this.drill_controllerAdsorb_setState1( slot_controller );
}
//==============================
// * 监听"正被吸附" - 帧刷新切换"未吸附" - I一般吸附
//==============================
Drill_CODAA_AdsorbController.prototype.drill_CODAA_update0To1_common = function( slot_controller, cur_x, cur_y ){
	
	// > 条件 - 开关
	if( slot_controller.drill_slot_commonEnabled() != true ){ return; }
	
	// > 条件 - 距离判定
	if( slot_controller.drill_slot_isInCommonRange(cur_x,cur_y) == false ){ return; }
	
	// > 条件 - 正在拖拽时，不吸附
	var drag_controller = this.drill_controllerAdsorb_getDragController();
	if( drag_controller._drill_isDraging == true ){ return; }
	
	// > 条件 - 吸附数量是否已满
	if( slot_controller.drill_slot_isFull() == true ){ return; }
	
	
	// > 切换 "未吸附" -> "正被吸附"
	this.drill_controllerAdsorb_setState1( slot_controller );
}
//==============================
// * 监听"正被吸附" - 帧刷新切换"未吸附" - J交换吸附
//==============================
Drill_CODAA_AdsorbController.prototype.drill_CODAA_update0To1_exchange = function( slot_controller, cur_x, cur_y ){
	
	// > 条件 - 开关
	if( slot_controller.drill_slot_exchangeEnabled() != true ){ return; }
	
	// > 条件 - 距离判定
	if( slot_controller.drill_slot_isInExchangeRange(cur_x,cur_y) == false ){ return; }
	
	// > 条件 - 正在拖拽时
	//		（拖拽也会被强制吸走）
	
	// > 条件 - 吸附数量是否已满
	if( slot_controller.drill_slot_isFull() == true ){ return; }
	
	
	// > 切换 "未吸附" -> "正被吸附"
	this.drill_controllerAdsorb_setState1( slot_controller );
}

//==============================
// * 监听"正被吸附" - 帧刷新切换"拖走吸附"
//==============================
Drill_CODAA_AdsorbController.prototype.drill_CODAA_update3To1 = function(){
	if( this.drill_controllerAdsorb_canAdsorb() != true ){ return; }	//条件 - 不可吸附，跳出
	if( this._drill_curState != 3 ){ return; }							//条件 - 必须要 "拖走吸附" 的状态
	
	// > 位置（吸附位置，包含了拖拽偏移量）
	var cur_x = this.drill_controllerAdsorb_getAdsorbingX();
	var cur_y = this.drill_controllerAdsorb_getAdsorbingY();
	
	// > 遍历吸附槽
	var slot_controller_tank = $gameSystem._drill_CODAA_slotFactory._drill_productTank;
	for(var j = 0; j < slot_controller_tank.length; j++ ){
		var slot_controller = slot_controller_tank[j];
		if( slot_controller == undefined ){ continue; }
		
		// > 条件 - 可吸附类型
		if( slot_controller.drill_slot_hasAdsorbTypeInList( this._drill_adsorbTypeList ) != true ){ continue; }
		
		// > H必然吸附
		this.drill_CODAA_update3To1_essential( slot_controller, cur_x, cur_y );
		
		// > I一般吸附
		//	（不需要，因为只要松开就会变成"未吸附"，而这里判定的是保持按下时的变化）
		
		// > J交换吸附
		this.drill_CODAA_update3To1_exchange( slot_controller, cur_x, cur_y );
	}
}
//==============================
// * 监听"正被吸附" - 帧刷新切换"拖走吸附" - H必然吸附
//==============================
Drill_CODAA_AdsorbController.prototype.drill_CODAA_update3To1_essential = function( slot_controller, cur_x, cur_y ){
	
	// > 条件 - 开关
	if( slot_controller.drill_slot_essentialEnabled() != true ){ return; }
	
	// > 条件 - 距离判定
	if( slot_controller.drill_slot_isInEssentialRange(cur_x,cur_y) == false ){ return; }
	
	// > 条件 - 拖走时，不吸附之前的槽
	if( this._drill_foreignKey_slotId == slot_controller._drill_productId ){ return; }
	
	// > 条件 - 吸附数量是否已满
	if( slot_controller.drill_slot_isFull() == true ){ return; }
	
	
	// > 切换前，将 吸附偏移量 转移成 拖拽偏移量（因为有last_state判定，所以这里用不上）
	//this.drill_controllerAdsorb_convertToDraggingOffset();
	
	// > 切换 "拖走吸附" -> "正被吸附"
	this.drill_controllerAdsorb_setState1( slot_controller );
}
//==============================
// * 监听"正被吸附" - 帧刷新切换"拖走吸附" - J交换吸附
//==============================
Drill_CODAA_AdsorbController.prototype.drill_CODAA_update3To1_exchange = function( slot_controller, cur_x, cur_y ){
	
	// > 条件 - 开关
	if( slot_controller.drill_slot_exchangeEnabled() != true ){ return; }
			
	// > 条件 - 距离判定
	if( slot_controller.drill_slot_isInExchangeRange(cur_x,cur_y) == false ){ return; }
	
	// > 条件 - 拖走时，不吸附之前的槽
	if( this._drill_foreignKey_slotId == slot_controller._drill_productId ){ return; }
	
	// > 条件 - 最大吸附数量
	//		（因为只交换，所以数量不会变）
	
	
	// > 交换吸附控制
	this.drill_CODAA_setAdsorbingExchange( slot_controller );
}
//==============================
// * 监听"正被吸附" - 交换吸附控制
//
//			说明：	> 为 "拖走吸附" 状态时，如果接触到其他槽的交换范围，那么立刻交换到新的槽。
//					> 这里 不切换 "拖走吸附" -> "未吸附" 。
//					> 这里 不切换 "拖走吸附" -> "正被吸附" 。
//==============================
Drill_CODAA_AdsorbController.prototype.drill_CODAA_setAdsorbingExchange = function( slot_controller ){
	var cur_slotId = this.drill_controllerAdsorb_getSlotId();
	var cur_slot = this.drill_controllerAdsorb_getSlotController();
	var tar_slotId = slot_controller._drill_productId;
	var tar_slot = slot_controller;
	
	
	if( slot_controller.drill_slot_isFull() == true ){
		
		// > 交换的对象
		var adsorb_list = $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getBySlotId( tar_slotId );
		var adsorb = adsorb_list[ adsorb_list.length-1 ];
		if( adsorb == undefined ){ return; }
		
		// > 交换的对象 - 切换前，将 吸附偏移量 转移成 拖拽偏移量（因为有last_state判定，所以这里用不上）
		//adsorb.drill_controllerAdsorb_convertToDraggingOffset();
		
		// > 交换的对象 - 切换 "拖走吸附" -> "正被吸附"
		adsorb.drill_controllerAdsorb_setState1( cur_slot );
		
		
		// > 超出数量时，交换外键（ "拖走吸附" -> "拖走吸附" ）
		this.drill_controllerAdsorb_setForeignKey_slotId( tar_slotId );
		
		// > 计算距离，使得拖拽保持位置
		this._drill_curMovingX -= ( tar_slot.drill_slot_x() - cur_slot.drill_slot_x() );
		this._drill_curMovingY -= ( tar_slot.drill_slot_y() - cur_slot.drill_slot_y() );
		
		// > 强制刷新一次
		this.drill_controllerAdsorb_updateAnim3();
		return;
	}
	
	// > 未超出数量时，修改外键（ "拖走吸附" -> "拖走吸附" ）
	this.drill_controllerAdsorb_setForeignKey_slotId( tar_slotId );
	
	// > 计算距离，使得拖拽保持位置
	this._drill_curMovingX -= ( tar_slot.drill_slot_x() - cur_slot.drill_slot_x() );
	this._drill_curMovingY -= ( tar_slot.drill_slot_y() - cur_slot.drill_slot_y() );
	
	// > 强制刷新一次
	this.drill_controllerAdsorb_updateAnim3();
}


//=============================================================================
// ** ☆监听"已吸附"
//
//			说明：	> 该模块监听 "已吸附" 的条件，在满足条件时立即修改 吸附状态 。
//					> 该模块不定义新类，而是在 控制器 的基础上，加强功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 监听"已吸附" - 帧刷新
//==============================
var _drill_CODAA_CODAA_check2_update = Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_update;
Drill_CODAA_AdsorbController.prototype.drill_controllerAdsorb_update = function( cur_orgX, cur_orgY ){
	_drill_CODAA_CODAA_check2_update.call( this, cur_orgX, cur_orgY );
    this.drill_CODAA_update1To2();
}
//==============================
// * 监听"已吸附" - 帧刷新 监听
//==============================
Drill_CODAA_AdsorbController.prototype.drill_CODAA_update1To2 = function() {
	if( this.drill_controllerAdsorb_canAdsorb() != true ){ return; }	//条件 - 不可吸附，跳出
	if( this._drill_curState != 1 ){ return; }							//条件 - 必须要 "正被吸附" 的状态
	
	// > 播放结束时
	if( this.drill_controllerAdsorb_isAnim1End() == true ){
		
		// > 切换 "正被吸附" -> "已吸附"
		var slot_controller = this.drill_controllerAdsorb_getSlotController();
		this.drill_controllerAdsorb_setState2( slot_controller );
	}
}


//=============================================================================
// ** ☆监听"拖走吸附"
//
//			说明：	> 该模块监听 "拖走吸附" 的条件，在满足条件时立即修改 吸附状态 。
//					> 该模块不定义新类，而是在 控制器 的基础上，加强功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 监听"拖走吸附" - 开始拖拽时（继承）
//==============================
var _drill_CODAA_CODAA_check3_dragStarting = Drill_CODAA_DragController.prototype.drill_controllerDrag_dragStarting;
Drill_CODAA_DragController.prototype.drill_controllerDrag_dragStarting = function() {
	_drill_CODAA_CODAA_check3_dragStarting.call(this);
	
	// > 根据 拖拽控制器 获取到 吸附控制器（一对一）
	var adsorb_controller = $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getByDragId( this._drill_productId );
	if( adsorb_controller == undefined ){ return; }
	
	// > 条件 - 必须要 "已吸附" 的状态
	if( adsorb_controller._drill_curState != 2 ){ return; }
	
	
	// > 切换 "已吸附" -> "拖走吸附"
	adsorb_controller.drill_controllerAdsorb_setState3();
}
//==============================
// * 监听"拖走吸附" - 结束拖拽时（继承）
//==============================
var _drill_CODAA_CODAA_check3_dragEnding = Drill_CODAA_DragController.prototype.drill_controllerDrag_dragEnding;
Drill_CODAA_DragController.prototype.drill_controllerDrag_dragEnding = function() {
	_drill_CODAA_CODAA_check3_dragEnding.call(this);
	
	// > 根据 拖拽控制器 获取到 吸附控制器（一对一）
	var adsorb_controller = $gameSystem._drill_CODAA_adsorbFactory.drill_factoryAdsorb_getByDragId( this._drill_productId );
	if( adsorb_controller == undefined ){ return; }
	
	// > 条件 - 必须要 "拖走吸附" 的状态
	if( adsorb_controller._drill_curState != 3 ){ return; }
	
	
	// > 可脱离槽
	if( adsorb_controller.drill_controllerAdsorb_pullOutEnabled() == true ){
		
		// > 切换前，将 吸附偏移量 转移成 拖拽偏移量
		adsorb_controller.drill_controllerAdsorb_convertToDraggingOffset();
		
		// > 切换 "拖走吸附" -> "未吸附"
		adsorb_controller.drill_controllerAdsorb_setState0();
		
	// > 不可脱离槽
	}else{
		
		// > 切换前，将 吸附偏移量 转移成 拖拽偏移量（因为有last_state判定，所以这里用不上）
		//adsorb_controller.drill_controllerAdsorb_convertToDraggingOffset();
		
		// > 切换 "拖走吸附" -> "正被吸附"
		var slot_controller = adsorb_controller.drill_controllerAdsorb_getSlotController();
		adsorb_controller.drill_controllerAdsorb_setState1( slot_controller );
	}
}



//=============================================================================
// ** ☆DEBUG绘制
//
//			说明：	> 此模块提供 DEBUG绘制 的功能。
//					> 由于此功能与贴图相关，所以单独拿出来。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * DEBUG绘制 - H必然吸附 - 吸附槽 绘制范围
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_drawEssentialRange = function( temp_bitmap, fill_color, stroke_color ){
	var data = this._drill_data;
	if( data['essentialEnabled'] != true ){ return; }
	
	// > H必然吸附 - 绘制圆形
	if( data['essentialType'] == 0 ){
		temp_bitmap.drill_CODAA_drawCircle(
			this.drill_slot_x(),
			this.drill_slot_y(),
			data['essentialRadius'],
			fill_color,
			stroke_color,
			2
		);
	}
	// > H必然吸附 - 绘制方形
	if( data['essentialType'] == 1 ){
		temp_bitmap.drill_CODAA_drawRect(
			this.drill_slot_x() - data['essentialWidth']*0.5,
			this.drill_slot_y() - data['essentialHeight']*0.5,
			data['essentialWidth'],
			data['essentialHeight'],
			fill_color,
			stroke_color,
			2, "miter"
		);
	}
};
//==============================
// * DEBUG绘制 - I一般吸附 - 吸附槽 绘制范围
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_drawCommonRange = function( temp_bitmap, fill_color, stroke_color ){
	var data = this._drill_data;
	if( data['commonEnabled'] != true ){ return; }
	
	// > I一般吸附 - 绘制圆形
	if( data['commonType'] == 0 ){
		temp_bitmap.drill_CODAA_drawCircle(
			this.drill_slot_x(),
			this.drill_slot_y(),
			data['commonRadius'],
			fill_color,
			stroke_color,
			2
		);
	}
	// > I一般吸附 - 绘制方形
	if( data['commonType'] == 1 ){
		temp_bitmap.drill_CODAA_drawRect(
			this.drill_slot_x() - data['commonWidth']*0.5,
			this.drill_slot_y() - data['commonHeight']*0.5,
			data['commonWidth'],
			data['commonHeight'],
			fill_color,
			stroke_color,
			2, "miter"
		);
	}
};
//==============================
// * DEBUG绘制 - J交换吸附 - 吸附槽 绘制范围
//==============================
Drill_CODAA_SlotController.prototype.drill_slot_drawExchangeRange = function( temp_bitmap, fill_color, stroke_color ){
	var data = this._drill_data;
	if( data['exchangeEnabled'] != true ){ return; }
	
	// > J交换吸附 - 绘制圆形
	if( data['exchangeType'] == 0 ){
		temp_bitmap.drill_CODAA_drawCircle(
			this.drill_slot_x(),
			this.drill_slot_y(),
			data['exchangeRadius'],
			fill_color,
			stroke_color,
			2
		);
	}
	// > J交换吸附 - 绘制方形
	if( data['exchangeType'] == 1 ){
		temp_bitmap.drill_CODAA_drawRect(
			this.drill_slot_x() - data['exchangeWidth']*0.5,
			this.drill_slot_y() - data['exchangeHeight']*0.5,
			data['exchangeWidth'],
			data['exchangeHeight'],
			fill_color,
			stroke_color,
			2, "miter"
		);
	}
};

//==============================
// * DEBUG绘制 - 绘制范围 - 填充+描边圆形
//			
//			参数：	> fill_color 字符串   （填充颜色）
//					> stroke_color 字符串 （描边颜色）
//					> lineWidth 数字      （线宽）
//			说明：	> 圆形不需要考虑线的末端与斜角。
//==============================
Bitmap.prototype.drill_CODAA_drawCircle = function( x, y, radius, fill_color, stroke_color, lineWidth ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.fillStyle = fill_color;			//（b.设置样式）
    painter.strokeStyle = stroke_color;
	painter.lineWidth = lineWidth;
	
    painter.beginPath();					//（c.路径填充/描边，注意 beginPath + fill + stroke）
    painter.arc(x, y, radius, 0, Math.PI * 2, false);
    painter.fill();
    painter.stroke();
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};
//==============================
// * DEBUG绘制 - 绘制范围 - 填充+描边矩形
//			
//			参数：	> x, y, width, height 矩形范围
//					> fill_color 字符串   （填充颜色）
//					> stroke_color 字符串 （描边颜色）
//					> lineWidth 数字      （线宽）
//					> lineJoin 字符串 （连接处，包含miter/round/bevel 尖角/圆角/斜角，默认miter）
//			说明：	> 无。
//==============================
Bitmap.prototype.drill_CODAA_drawRect = function( x, y, width, height, fill_color, stroke_color, lineWidth, lineJoin ){
    var painter = this._context;
    painter.save();							//（a.存储上一个画笔状态）
	
    painter.fillStyle = fill_color;			//（b.设置样式）
    painter.strokeStyle = stroke_color;
	painter.lineWidth = lineWidth;
	painter.lineJoin = lineJoin;
	
    painter.fillRect(x, y, width, height);	//（c.路径填充/描边，fillRect）
    painter.strokeRect(x, y, width, height);
	
    painter.restore();						//（d.回滚上一个画笔状态）
    this._setDirty();
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfDragAndAdsorb = false;
		var pluginTip = DrillUp.drill_CODAA_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


