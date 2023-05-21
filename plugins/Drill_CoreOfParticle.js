//=============================================================================
// Drill_CoreOfParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        系统 - 粒子核心
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子样式-%d"
 * @Drill_LE_parentKey "---粒子样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_COPa_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_CoreOfParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 专门对粒子的具体功能进行功能提供的核心。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 插件基于弹道核心，可以作用于所有需要用到粒子的子插件。
 * 基于：
 *   - Drill_CoreOfBallistics              系统-弹道核心★★v2.1及以上★★
 * 可作用于：
 *   - Drill_AnimationParticle             动画 - 多层动画粒子
 *   - Drill_EventFrameParticle            行走图 - 多层行走图粒子
 *   - Drill_AnimationBlastingParticle     动画 - 粒子小爆炸
 *   - Drill_GaugeFloatingBlastParticle    地图UI - 临时粒子小爆炸
 *   - Drill_BattleFloatingBlastParticle   战斗UI - 临时粒子小爆炸
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面，战斗界面，菜单界面。
 *   作用于游戏中各个地方。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
 * 细节：
 *   (1.粒子 是指一个通过 弹道轨迹移动 并显现/消失 的贴图。
 *      粒子可大可小，特别大的贴图也可以算作粒子。
 *   (2.粒子群 是指大量相同的粒子所形成的群体。
 *      群体的粒子数量可以自定义，一个粒子也可以算作粒子群。
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
 * 测试方法：   分别在地图界面、战斗界面、菜单界面进行测试。
 * 测试结果：   地图界面中，平均消耗为：【29.59ms】
 *              战斗界面中，平均消耗为：【35.90ms】
 *              菜单界面中，平均消耗为：【19.87ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.粒子核心的消耗取决于子插件创建了多少粒子群。
 *   通常播放粒子的情况下，消耗并不大，即使是大量播放小爆炸粒子，
 *   也只是临时性的大量消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		COPa (Core_Of_Particle)
//		临时全局变量	DrillUp.g_COPa_style_xxx
//		临时局部变量	this._drill_COPa_xxx
//		存储数据变量	$gameSystem._drill_COPa_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	地图界面、战斗界面、菜单界面
//		★性能测试消耗	创建过程：   35.9ms（drill_spriteSec_initBallistics）13.3ms（drill_sprite_initTransform）
//						帧刷新过程： 7.2ms（drill_sprite_updateAttr）25.7ms（drill_sprite_updateTransform）
//		★最坏情况		大量粒子被同时创建并播放。
//		★备注			从消耗情况上来看，创建比帧刷新稍微多一点，合理预创建一些粒子群，能优化一部分消耗。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆变量获取
//		
//			->粒子控制器【Drill_COPa_Controller】
//			->粒子贴图【Drill_COPa_Sprite】
//			->粒子贴图（第二层）【Drill_COPa_SecSprite】
//		
//		
//		★家谱：
//			大家族-粒子效果
//			核心
//		
//		★插件私有类：
//			* 粒子控制器【Drill_COPa_Controller】
//			* 粒子贴图【Drill_COPa_Sprite】
//			* 粒子贴图（第二层）【Drill_COPa_SecSprite】
//		
//		★核心说明：
//			1.核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			1.粒子是半开放的继承结构，很多功能细节都需要子插件来实现，而这些功能在这里很难标注出来。
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_COPa_PluginTip_curName = "Drill_CoreOfParticle.js 系统-粒子核心";
	DrillUp.g_COPa_PluginTip_baseList = ["Drill_CoreOfBallistics.js 系统-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_COPa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_COPa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_COPa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_COPa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_COPa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_COPa_getPluginTip_ParamIsNaN = function( curPluginTipName, param_name ){
		return "【" + curPluginTipName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	//==============================
	// * 提示信息 - 配置错误 - 透明度类型错误
	//==============================
	DrillUp.drill_COPa_getPluginTip_ErrorOpacityMode = function( curPluginTipName, opacity_name ){
		return "【" + curPluginTipName + "】\n透明度类型错误，没有类型'"+opacity_name+"'。";
	};
	
	
//=============================================================================
// ** ☆变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfParticle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfParticle');
	
	
	//==============================
	// * 变量获取 - 粒子样式
	//
	//			说明：	此函数并未使用，只作为 子插件 的参考样式来使用。
	//==============================
	DrillUp.drill_COPa_styleInit = function( dataFrom ){
		var data = {};
		
		// > 控制器
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/System/";
		data['x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		//data['battleIndex'];
		//data['layerIndex'];
		//data['menuIndex'];
		//data['individualIndex'];
		//data['zIndex'] = Number( dataFrom["图片层级"] || 4);
		
		
		// > 粒子效果
		data['par_count'] = Number( dataFrom["粒子数量"] || 15);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		//data['par_holdingBirthPosition'] = String( dataFrom["粒子是否滞留"] || "false") == "true";
		
		//data['par_birthMode'] = String( dataFrom["粒子出现模式"] || "随机出现");	//（起始点功能）
		//data['par_birthX'] = Number( dataFrom["粒子固定点 X"] || 0);
		//data['par_birthY'] = Number( dataFrom["粒子固定点 Y"] || 0);
		//data['par_birthRange'] = Number( dataFrom["粒子固定点范围"] || 120);
		
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "随机角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > 双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		//data['battleIndex'];
		//data['layerIndex'];
		//data['menuIndex'];
		//data['individualIndex'];
		//data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 3);
		
		// > 随机种子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > 直线拖尾贴图
		data['trailing_enable'] = String( dataFrom["是否开启直线拖尾效果"] || "false") == "true";
		data['trailing_centerAnchor'] = String( dataFrom["是否固定拖尾在粒子中心"] || "false") == "true";
		data['trailing_src_img'] = String( dataFrom["资源-直线拖尾"] || "");
		data['trailing_src_img_file'] = "img/System/";
		
		return data;
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	
//=============================================================================
// ** 粒子控制器【Drill_COPa_Controller】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个专门控制粒子的数据类。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **						->平移
// **						->校验值
// **					->B粒子群弹道
// **						->弹道初始化（坐标）
// **						->弹道初始化（透明度）
// **					->C随机因子
// **					->D粒子变化
// **						> 位置
// **						> 透明度
// **						> 旋转
// **						> 缩放
// **					->E粒子重设
// **						> 粒子 迭代次数
// **						> 位置
// **						> 透明度
// **						> 旋转
// **						> 缩放
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **						> 同时产生(一次性)
// **						> 同时产生
// **						> 依次产生
// **						> 跳过产生过程
// **						> 手动产生
// **		
// **		说明：	> 核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
// **				> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
// **				> 该类创建过程可参考子插件的写法：
// **					Drill_LayerParticle（见该插件的 贴图控制 模块）
// **					Drill_GaugeFloatingBlastParticle（见该插件的 贴图控制 模块）
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_COPa_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_COPa_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_COPa_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_COPa_Controller.prototype.drill_controller_update = function(){
	if( this._drill_data['pause'] == true ){ return; }
	
	this.drill_controller_updateAttr();			//帧刷新 - A主体
	this.drill_controller_updateCheckNaN();		//帧刷新 - A主体 - 校验值
												//帧刷新 - B粒子群弹道（无）
												//帧刷新 - C随机因子（无）
	this.drill_controller_updateTransform();	//帧刷新 - D粒子变化
												//帧刷新 - E粒子重设（无）
												//帧刷新 - F双层效果（无）
												//帧刷新 - G直线拖尾贴图（无）
												//帧刷新 - H贴图高宽（无）
	this.drill_controller_updateLife();			//帧刷新 - I粒子生命周期
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
Drill_COPa_Controller.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COPa_Controller.prototype.drill_controller_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COPa_Controller.prototype.drill_controller_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数使得 控制器立即销毁，随后贴图立即销毁。
//##############################
Drill_COPa_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COPa_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};
//##############################
// * 控制器 - 设置延时销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数可以阻止粒子重设，等待粒子全部死亡后，控制器才销毁，随后贴图销毁。
//					> 注意，此设置执行后，仍然要保持 控制器的帧刷新，因为控制器没有被销毁。
//##############################
Drill_COPa_Controller.prototype.drill_controller_destroyWithDelay = function(){
	this._drill_isDelayingDestroy = true;
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
Drill_COPa_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 控制器
	if( data['visible'] == undefined ){ data['visible'] = true };										//控制器 - 显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };											//控制器 - 暂停情况
	
	// > 贴图
	if( data['src_img'] == undefined ){ data['src_img'] = "" };											//贴图 - 资源粒子
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/System/" };					//贴图 - 资源文件夹
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };										//贴图 - 混合模式（贴图用）
	if( data['tint'] == undefined ){ data['tint'] = 0 };												//贴图 - 图像-色调值（贴图用）
	if( data['smooth'] == undefined ){ data['smooth'] = false };										//贴图 - 图像-模糊边缘（贴图用）
	//if( data['battleIndex'] == undefined ){ data['battleIndex'] = "" };								//贴图 - 层级（贴图用）
	//if( data['layerIndex'] == undefined ){ data['layerIndex'] = "" };									//贴图 - 层级（贴图用）
	//if( data['menuIndex'] == undefined ){ data['menuIndex'] = "" };									//贴图 - 层级（贴图用）
	//if( data['individualIndex'] == undefined ){ data['individualIndex'] = "" };						//贴图 - 层级（贴图用）
	//if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };											//贴图 - 图片层级（贴图用）
	
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };														//A主体 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };														//A主体 - 平移Y
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };										//A主体 - 透明度
	
	
	// > B粒子群弹道
	if( data['par_backrun'] == undefined ){ data['par_backrun'] = false };								//B粒子群弹道 - 粒子弹道是否倒放（贴图用）
	if( data['par_count'] == undefined ){ data['par_count'] = 15 };										//B粒子群弹道 - 粒子数量
	if( data['par_life'] == undefined ){ data['par_life'] = 30 };										//B粒子群弹道 - 粒子生命周期
	
	if( data['par_dirMode'] == undefined ){ data['par_dirMode'] = "四周扩散(随机)" };					//B粒子群弹道 - 粒子方向模式
	if( data['par_dirFix'] == undefined ){ data['par_dirFix'] = 90.0 };									//B粒子群弹道 - 粒子固定方向
	if( data['par_dirSectorFace'] == undefined ){ data['par_dirSectorFace'] = 45.0 };					//B粒子群弹道 - 粒子扇形朝向
	if( data['par_dirSectorDegree'] == undefined ){ data['par_dirSectorDegree'] = 30.0 };				//B粒子群弹道 - 粒子扇形角度
	if( data['par_speedMode'] == undefined ){ data['par_speedMode'] = "只初速度" };						//B粒子群弹道 - 粒子速度模式
	if( data['par_speedBase'] == undefined ){ data['par_speedBase'] = 0.5 };							//B粒子群弹道 - 粒子初速度
	if( data['par_speedRandom'] == undefined ){ data['par_speedRandom'] = 2.0 };						//B粒子群弹道 - 粒子速度随机波动量
	if( data['par_opacityMode'] == undefined ){ data['par_opacityMode'] = "先显现后消失" };				//B粒子群弹道 - 粒子透明度模式
	
	
	// > C随机因子
	if( data['seed_enable'] == undefined ){ data['seed_enable'] = false };								//C随机因子 - 是否固定随机种子
	if( data['seed_value'] == undefined ){ data['seed_value'] = 0.20221002 };							//C随机因子 - 固定随机种子
	
	
	// > D粒子变化
	//if( data['par_holdingBirthPosition'] == undefined ){ data['par_holdingBirthPosition'] = false };	//D粒子变化 - 粒子是否滞留
	
	
	// > E粒子重设
	if( data['par_scaleMode'] == undefined ){ data['par_scaleMode'] = "固定缩放值" };					//E粒子重设 - 粒子缩放模式
	if( data['par_scaleBase'] == undefined ){ data['par_scaleBase'] = 1.0 };							//E粒子重设 - 粒子缩放值
	if( data['par_scaleRandom'] == undefined ){ data['par_scaleRandom'] = 0.2 };						//E粒子重设 - 粒子缩放随机波动量
	
	if( data['par_selfRotateMode'] == undefined ){ data['par_selfRotateMode'] = "随机角度" };			//D粒子变化 - 粒子自旋转速度
	if( data['par_selfRotateFix'] == undefined ){ data['par_selfRotateFix'] = 0.0 };					//D粒子变化 - 粒子自旋转速度
	if( data['par_selfRotateSpeed'] == undefined ){ data['par_selfRotateSpeed'] = 1.0 };				//D粒子变化 - 粒子自旋转速度
	
	
	// > F双层效果
	if( data['second_enable'] == undefined ){ data['second_enable'] = false };							//F双层效果 - 是否开启双层效果
	if( data['second_src_img'] == undefined ){ data['second_src_img'] = "" };							//F双层效果 - 第二层粒子资源
	//if( data['second_battleIndex'] == undefined ){ data['second_battleIndex'] = "" };					//F双层效果 - 第二层粒子层级（贴图用）
	//if( data['second_layerIndex'] == undefined ){ data['second_layerIndex'] = "" };					//F双层效果 - 第二层粒子层级（贴图用）
	//if( data['second_menuIndex'] == undefined ){ data['second_menuIndex'] = "" };						//F双层效果 - 第二层粒子层级（贴图用）
	//if( data['second_individualIndex'] == undefined ){ data['second_individualIndex'] = "" };			//F双层效果 - 第二层粒子层级（贴图用）
	//if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 0 };							//F双层效果 - 第二层粒子图片层级（贴图用）
	
	
	// > G直线拖尾贴图
	if( data['trailing_enable'] == undefined ){ data['trailing_enable'] = false };						//G直线拖尾贴图 - 是否开启双层效果
	if( data['trailing_centerAnchor'] == undefined ){ data['trailing_centerAnchor'] = false };			//G直线拖尾贴图 - 是否固定拖尾在粒子中心
	if( data['trailing_src_img'] == undefined ){ data['trailing_src_img'] = "" };						//G直线拖尾贴图 - 资源直线拖尾贴图
	if( data['trailing_src_img_file'] == undefined ){ data['trailing_src_img_file'] = "img/System/" };	//G直线拖尾贴图 - 资源文件夹
	
	
	// > H贴图高宽（无）
	
	
	// > I粒子生命周期
	if( data['par_lifeType'] == undefined ){ data['par_lifeType'] = "跳过产生过程" };						//I粒子生命周期 - 生命类型
}
//==============================
// * 控制器 - 初始化子功能
//			
//			说明：	> 创建该类后直接初始化。
//==============================
Drill_COPa_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	this.drill_controller_initRandom();			//初始化子功能 - C随机因子
	this.drill_controller_initTransform();		//初始化子功能 - D粒子变化
	this.drill_controller_initReset();			//初始化子功能 - E粒子重设
	this.drill_controller_initSecond();			//初始化子功能 - F双层效果
	this.drill_controller_initTrailing();		//初始化子功能 - G直线拖尾贴图
	this.drill_controller_initBitmapAttr();		//初始化子功能 - H贴图高宽
	this.drill_controller_initLife();			//初始化子功能 - I粒子生命周期
	this.drill_controller_initBallistics();		//初始化子功能 - B粒子群弹道（放最后，因为需要使用 E粒子重设 的 迭代次数 参数）
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_COPa_Controller.prototype.drill_controller_resetData_Private = function( data ){
	
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
Drill_COPa_Controller.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
	this._drill_curPluginTipName = DrillUp.g_COPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
	
	// > 主体贴图
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_opacity = 0;
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	this._drill_rotation = 0;			//（整体再旋转角度）
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateAttr = function() {
	var data = this._drill_data;
	
	// > 主体 时间流逝
	this._drill_curTime += 1;
	
	// > 固定初始值
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_opacity = 0;
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	this._drill_rotation = 0;
	
	// > 执行 帧刷新
	this.drill_controller_updateAttr_Position();
	this.drill_controller_updateAttr_Opacity();
	this.drill_controller_updateAttr_Scale();
	this.drill_controller_updateAttr_Rotation();
}
//==============================
// * A主体 - 帧刷新 - 位置【子插件接口】
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateAttr_Position = function() {
	var data = this._drill_data;
	var xx = 0;
	var yy = 0;
	xx += data['x'];
	yy += data['y'];
	this._drill_x = xx;
	this._drill_y = yy;
}
//==============================
// * A主体 - 帧刷新 - 透明度【子插件接口】
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateAttr_Opacity = function() {
	var data = this._drill_data;
	this._drill_opacity = data['opacity'];
}
//==============================
// * A主体 - 帧刷新 - 缩放【子插件接口】
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateAttr_Scale = function() {
	var data = this._drill_data;
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
}
//==============================
// * A主体 - 帧刷新 - 旋转【子插件接口】
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateAttr_Rotation = function() {
	var data = this._drill_data;
	this._drill_rotation = 0;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateCheckNaN = function(){
	
	// > 校验值
	if( DrillUp.g_COPa_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_x" ) );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_y" ) );
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_opacity" ) );
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_scaleX" ) );
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_scaleY" ) );
		}
		if( isNaN( this._drill_rotation ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_rotation" ) );
		}
	}
}


//==============================
// * B粒子群弹道 - 初始化子功能
//
//			说明：	> 只存 弹道配置，不存 实际弹道。
//					  配置包括随机因子、随机迭代次数。
//					> 实际弹道只在【贴图】中进行推演并使用。
//==============================
Drill_COPa_Controller.prototype.drill_controller_initBallistics = function() {
	var data = this._drill_data;
	
	// > 弹道用 随机因子
	this._drill_randomFactor_speed = Math.random();
	this._drill_randomFactor_dir = Math.random();
	this._drill_randomFactor_opacity = Math.random();
	if( data['seed_enable'] == true ){
		this._drill_randomFactor_speed = data['seed_value'] %1;
		this._drill_randomFactor_dir = data['seed_value'] *41 %1;
		this._drill_randomFactor_opacity = data['seed_value'] *71 %1;
	}
	
	// > 参数初始化
	this._drill_ballistics_move = {};
	this._drill_ballistics_opacity = {};
	
	// > 弹道初始化
    this.drill_controller_initBallisticsMove( data, data, data['par_life'] );		//弹道初始化（坐标）
    this.drill_controller_initBallisticsOpacity( data, data['par_life'] );			//弹道初始化（透明度）
};
//==============================
// * B粒子群弹道 - 初始化子功能 - 弹道初始化（坐标）
//==============================
Drill_COPa_Controller.prototype.drill_controller_initBallisticsMove = function( data, b_data, sustain ){
	
	// > 弹道初始化（坐标）
	var temp_b_move = {}
	
	//   移动（movement）
	temp_b_move['movementNum'] = data['par_count'];								//数量
	temp_b_move['movementTime'] = sustain;										//时长
	temp_b_move['movementDelay'] = 0;											//延迟
	temp_b_move['movementEndDelay'] = 0;										//延迟
	temp_b_move['movementOrderDelay'] = 0;										//依次延迟时间
	temp_b_move['movementMode'] = "极坐标模式";									//移动模式
	//   极坐标（polar）
	temp_b_move['polarSpeedType'] = b_data["par_speedMode"];					//极坐标 - 速度 - 类型
	temp_b_move['polarSpeedBase'] = b_data["par_speedBase"];					//极坐标 - 速度 - 初速度
	temp_b_move['polarSpeedRandom'] = b_data["par_speedRandom"];				//极坐标 - 速度 - 速度随机波动量
	temp_b_move['polarSpeedInc'] = null;										//极坐标 - 速度 - 加速度
	temp_b_move['polarSpeedMax'] = null;										//极坐标 - 速度 - 最大速度
	temp_b_move['polarSpeedMin'] = null;										//极坐标 - 速度 - 最小速度
	temp_b_move['polarDistanceFormula'] = null;									//极坐标 - 速度 - 路程计算公式
	temp_b_move['polarDirType'] = b_data["par_dirMode"];						//极坐标 - 方向 - 类型
	temp_b_move['polarDirFixed'] = b_data["par_dirFix"];						//极坐标 - 方向 - 固定方向
	temp_b_move['polarDirSectorFace'] = b_data["par_dirSectorFace"];			//极坐标 - 方向 - 扇形朝向
	temp_b_move['polarDirSectorDegree'] = b_data["par_dirSectorDegree"];		//极坐标 - 方向 - 扇形角度
	temp_b_move['polarDirFormula'] = null;										//极坐标 - 方向 - 方向计算公式
	
	// > 随机因子（RandomFactor）
	//		（每个粒子对应一个随机因子，掌握一条弹道。）
	//		（注意，独立参数项之间，随机因子不可共用。会造成强关联的错误关系。）
	temp_b_move['polarSpeedRandomFactor'] = this._drill_randomFactor_speed;	//极坐标 - 速度 - 随机因子
	temp_b_move['polarDirRandomFactor'] = this._drill_randomFactor_dir;		//极坐标 - 方向 - 随机因子
	// > 随机迭代次数（RandomIteration）
	//		（每个粒子对应一个随机迭代次数，变换弹道用。）
	temp_b_move['polarSpeedRandomIterationList'] = this._drill_parList_randomIteration;
	temp_b_move['polarDirRandomIterationList'] = this._drill_parList_randomIteration;
	
	
	// > 参数赋值
	this._drill_ballistics_move = $gameTemp.drill_COBa_setBallisticsMove( temp_b_move );
};
//==============================
// * B粒子群弹道 - 初始化子功能 - 弹道初始化（透明度）
//==============================
Drill_COPa_Controller.prototype.drill_controller_initBallisticsOpacity = function( data, sustain ){
	
	// > 弹道初始化（透明度）
	//		（此处的透明度固定为 0-255 之间的变化，如果要改粒子透明度，去改整体的而不是单独的。）
	var temp_b_opacity = {};
	temp_b_opacity['opacityNum'] = data['par_count'];		//数量
	temp_b_opacity['opacityTime'] = sustain;				//时长
	temp_b_opacity['opacityDelay'] = 0;						//延迟
	temp_b_opacity['opacityEndDelay'] = 0;					//延迟
	temp_b_opacity['opacityOrderDelay'] = 0;				//依次延迟时间
	temp_b_opacity['opacityMode'] = "时间锚点模式";			//变化模式
	
	if( data['par_opacityMode'] == "逐渐消失" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "逐渐显现" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':255} );
	}
	else if( data['par_opacityMode'] == "保持原透明度" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':255} );
	}
	else if( data['par_opacityMode'] == "等一半时间后逐渐消失" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':50,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "前一半时间先显现再保持" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':50,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':255} );
	}
	else if( data['par_opacityMode'] == "先显现后消失(慢速)" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':45,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':55,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "先显现后消失" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':25,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':75,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "先显现后消失(快速)" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':10,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':90,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else if( data['par_opacityMode'] == "一闪一闪" ){
		temp_b_opacity['anchorPointTank'] = [];
		temp_b_opacity['anchorPointTank'].push( {'t':0,'o':0} );
		temp_b_opacity['anchorPointTank'].push( {'t':30,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':35,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':40,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':45,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':50,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':70,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':75,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':80,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':85,'o':255} );
		temp_b_opacity['anchorPointTank'].push( {'t':90,'o':125} );
		temp_b_opacity['anchorPointTank'].push( {'t':100,'o':0} );
	}
	else{
		alert( DrillUp.drill_COPa_getPluginTip_ErrorOpacityMode( this._drill_curPluginTipName, data['par_opacityMode'] ) );
	}
	
	// > 随机因子（RandomFactor）
	//		（每个粒子对应一个随机因子，掌握一条弹道。）
	//		（注意，独立参数项之间，随机因子不可共用。会造成强关联的错误关系。）
	temp_b_opacity['randomFactor'] = this._drill_randomFactor_opacity;
	// > 随机迭代次数（RandomIteration）
	//		（每个粒子对应一个随机迭代次数，变换弹道用。）
	temp_b_opacity['randomIterationList'] = this._drill_parList_randomIteration;
	
	// > 参数赋值
	this._drill_ballistics_opacity = $gameTemp.drill_COBa_setBallisticsOpacity( temp_b_opacity );
};


//==============================
// * C随机因子 - 初始化子功能
//
//			说明：	> 粒子用随机因子 与 弹道用随机因子 相似，但不是同一个参数。
//==============================
Drill_COPa_Controller.prototype.drill_controller_initRandom = function() {
	var data = this._drill_data;
	
	// > 粒子用 随机因子
	this._drill_randomFactor_parListOfRan = Math.random();
	if( data['seed_enable'] == true ){
		this._drill_randomFactor_parListOfRan = data['seed_value'] *31 %1;
	}
}
//==============================
// * C随机因子 - 当前的随机数（开放函数）
//
//			说明：	> 注意，如果是粒子列表，迭代次数建议分配为：cur_iteration*i + 41*i。
//					> 需要迭代次数，就能获取到一个随机数。
//					> 迭代次数值若相同，则获取到相同的随机数。
//==============================
Drill_COPa_Controller.prototype.drill_controller_curRandom = function( iteration ){
	return this.drill_controller_getRandomInIteration( this._drill_randomFactor_parListOfRan, iteration );
};
//==============================
// * C随机因子 - 数学 - 生成随机数（随机种子）
//			
//			参数：	> seed 数字	（正整数）
//			返回：	> 数字 		（0~1随机数）
//			
//			说明：	> 如果随机种子为 1至100，那么你将得到线性均匀分布的随机值。不是乱序随机。
//==============================
Drill_COPa_Controller.prototype.drill_controller_getRandomInSeed = function( seed ){
	var new_ran = ( seed * 9301 + 49297 ) % 233280;
	new_ran = new_ran / 233280.0;
	return new_ran;
};
//==============================
// * C随机因子 - 数学 - 生成随机数（迭代）
//			
//			参数：	> org_ran 数字   （0~1原随机数）
//					> iteration 数字 （正整数，迭代次数）
//			返回：	> 数字           （0~1新随机数）
//			
//			说明：	> 经过迭代后，能够得到乱序的随机数。
//==============================
Drill_COPa_Controller.prototype.drill_controller_getRandomInIteration = function( org_ran, iteration ){
	var prime = DrillUp.drill_COPa_primeList[ iteration % DrillUp.drill_COPa_primeList.length ];
	var temp_ran = ( (org_ran + iteration) * 9301 + 49297 ) % 233280;
	temp_ran = temp_ran / prime;
	var new_ran = (temp_ran + org_ran * iteration * prime) %1;
	return new_ran;
};
//==============================
// * C随机因子 - 数学 - 质数表（1000以内）
//==============================
DrillUp.drill_COPa_primeList = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,
	73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,
	191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,
	311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,
	439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,
	577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,
	709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,
	857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];



//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_COPa_Controller.prototype.drill_controller_initTransform = function() {
	var data = this._drill_data;
	
	this._drill_parList_x = [];						//粒子 - 位置X
	this._drill_parList_y = [];						//粒子 - 位置Y
	this._drill_parList_opacity = [];				//粒子 - 透明度
	this._drill_parList_rotation = [];				//粒子 - 自旋转
	this._drill_parList_scaleX = [];				//粒子 - 缩放X
	this._drill_parList_scaleY = [];				//粒子 - 缩放Y
	
	for( var i=0; i < data['par_count']; i++ ){
		this._drill_parList_x[i] = 0;				//粒子 - 位置X
		this._drill_parList_y[i] = 0;               //粒子 - 位置Y
		this._drill_parList_opacity[i] = 0;         //粒子 - 透明度
		this._drill_parList_rotation[i] = 0;        //粒子 - 自旋转
		this._drill_parList_scaleX[i] = 1.0;        //粒子 - 缩放X
		this._drill_parList_scaleY[i] = 1.0;        //粒子 - 缩放Y
	}
}
//==============================
// * D粒子变化 - 帧刷新
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateTransform = function(){
	var data = this._drill_data;
	for( var i=0; i < data['par_count']; i++ ){
		
		// > 执行 帧刷新
		this.drill_controller_updateTransform_Position( i );
		this.drill_controller_updateTransform_Opacity( i );
		this.drill_controller_updateTransform_Scale( i );
		this.drill_controller_updateTransform_Rotation( i );
	}
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//==============================
// * D粒子变化 - 帧刷新 - 位置【子插件接口】
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateTransform_Position = function( i ){
	//	（暂无）
	//	（弹道在贴图中叠加）
}
//==============================
// * D粒子变化 - 帧刷新 - 透明度【子插件接口】
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateTransform_Opacity = function( i ){
	//	（暂无）
	//	（弹道在贴图中叠加）
}
//==============================
// * D粒子变化 - 帧刷新 - 缩放【子插件接口】
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateTransform_Scale = function( i ){
	//	（暂无）
	//	（暂不考虑 实时缩放粒子 功能）
}
//==============================
// * D粒子变化 - 帧刷新 - 旋转【子插件接口】
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateTransform_Rotation = function( i ){
	var data = this._drill_data;
	this._drill_parList_rotation[i] += data['par_selfRotateSpeed'];
}


//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_COPa_Controller.prototype.drill_controller_initReset = function() {
	var data = this._drill_data;
	
	// > 粒子 迭代次数
	this._drill_parList_randomIteration = [];		//粒子 - 迭代次数
	for( var i=0; i < data['par_count']; i++ ){
		this._drill_parList_randomIteration[i] = 0;
	}
	
	// > 执行重设
	for( var i=0; i < data['par_count']; i++ ){
		this.drill_controller_resetParticles( i );
	}
}
//==============================
// * E粒子重设 - 执行重设
//==============================	
Drill_COPa_Controller.prototype.drill_controller_resetParticles = function( i ){
	var data = this._drill_data;
	var iteration = this._drill_parList_randomIteration[i];
	
	// > 执行 重设
	this.drill_controller_resetParticles_Position( i );
	this.drill_controller_resetParticles_Opacity( i );
	this.drill_controller_resetParticles_Scale( i );
	this.drill_controller_resetParticles_Rotation( i );
	
	// > 迭代次数+1
	this._drill_parList_randomIteration[i] += 1;
};
//==============================
// * E粒子重设 - 执行重设 - 位置【子插件接口】
//
//			说明：	> 起始点功能 在此设置。
//==============================	
Drill_COPa_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	var data = this._drill_data;
	this._drill_parList_x[i] = 0;
	this._drill_parList_y[i] = 0;
};
//==============================
// * E粒子重设 - 执行重设 - 透明度【子插件接口】
//==============================	
Drill_COPa_Controller.prototype.drill_controller_resetParticles_Opacity = function( i ){
	var data = this._drill_data;
	this._drill_parList_opacity[i] = 0;
};
//==============================
// * E粒子重设 - 执行重设 - 缩放【子插件接口】
//==============================	
Drill_COPa_Controller.prototype.drill_controller_resetParticles_Scale = function( i ){
	var data = this._drill_data;
	var cur_iteration = this._drill_parList_randomIteration[i];
	if( data['par_scaleMode'] == "固定缩放值" ){
		this._drill_parList_scaleX[i] = data['par_scaleBase'];
		this._drill_parList_scaleY[i] = data['par_scaleBase'];
	}
	if( data['par_scaleMode'] == "缩放值+波动量" ){
		var ran = this.drill_controller_curRandom( cur_iteration*i +41*i +2000 );
		this._drill_parList_scaleX[i] = data['par_scaleBase'] + (ran - 0.5) * data['par_scaleRandom'];
		this._drill_parList_scaleY[i] = data['par_scaleBase'] + (ran - 0.5) * data['par_scaleRandom'];
	}
};
//==============================
// * E粒子重设 - 执行重设 - 旋转【子插件接口】
//==============================	
Drill_COPa_Controller.prototype.drill_controller_resetParticles_Rotation = function( i ){
	var data = this._drill_data;
	var cur_iteration = this._drill_parList_randomIteration[i];
	if( data['par_selfRotateMode'] == "随机角度" ){
		this._drill_parList_rotation[i] = Math.floor( 360*this.drill_controller_curRandom( cur_iteration*i +47*i ) );
	}
	if( data['par_selfRotateMode'] == "固定角度" ){
		this._drill_parList_rotation[i] = data['par_selfRotateFix'];
	}
	if( data['par_selfRotateMode'] == "始终与朝向一致" ){
		this._drill_parList_rotation[i] = 0;
	}
};


//==============================
// * F双层效果 - 初始化子功能
//==============================
Drill_COPa_Controller.prototype.drill_controller_initSecond = function() {
	// （无）
}


//==============================
// * G直线拖尾贴图 - 初始化子功能
//==============================
Drill_COPa_Controller.prototype.drill_controller_initTrailing = function() {
	// （无）
}


//==============================
// * H贴图高宽 - 初始化子功能
//==============================
Drill_COPa_Controller.prototype.drill_controller_initBitmapAttr = function() {
	this._drill_bitmapPar_width = 101;				//（粒子贴图）
	this._drill_bitmapPar_height = 101;
	this._drill_bitmapTrailing_width = 101;			//（拖尾贴图）
	this._drill_bitmapTrailing_height = 101;
}
//==============================
// * H贴图高宽 - 获取边界
//==============================
Drill_COPa_Controller.prototype.drill_controller_getBitmapMargin = function() {
	var data = this._drill_data;
	
	var ww = this._drill_bitmapPar_width;
	var hh = this._drill_bitmapPar_height;
	if( data['trailing_enable'] == true ){
		ww += this._drill_bitmapTrailing_width;
		ww += this._drill_bitmapTrailing_height;
		hh += this._drill_bitmapTrailing_width;
		hh += this._drill_bitmapTrailing_height;
	}
	
	return { 'ww':ww, 'hh':hh };
}


//==============================
// * I粒子生命周期 - 初始化子功能
//
//			说明：	> 脚本底层为 "跳过产生过程"，即一开始就显示全部粒子，显示固定弹道，并保持线性的生命周期状态。
//					  同时产生/依次产生 反而是副产品功能，需要手动加约束。
//==============================
Drill_COPa_Controller.prototype.drill_controller_initLife = function(){
	var data = this._drill_data;
	
	// > 粒子 当前时间
	this._drill_parList_curTime = [];
	if( data['par_lifeType'] == "同时产生(一次性)" ){
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = 0;	
		}
	}
	if( data['par_lifeType'] == "同时产生" ){
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = 0;	
		}
	}
	if( data['par_lifeType'] == "依次产生" ){	//（不能用 负数时间，会影响粒子滞留效果）
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = Math.floor( data['par_life'] *i /data['par_count'] );
		}
	}
	if( data['par_lifeType'] == "跳过产生过程" ){
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = Math.floor( data['par_life'] *i /data['par_count'] );	
		}
	}
	if( data['par_lifeType'] == "手动产生" ){	//（手动产生的粒子一开始就是死亡的）
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = data['par_life'];	
		}
	}
	
	// > 默认为 跳过产生过程
	if( this._drill_parList_curTime.length == 0 ){
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = Math.floor( data['par_life'] *i /data['par_count'] );	
		}
	}
	
	// > 延时销毁 标记
	this._drill_isDelayingDestroy = false;
}
//==============================
// * I粒子生命周期 - 帧刷新
//==============================
Drill_COPa_Controller.prototype.drill_controller_updateLife = function(){
	var data = this._drill_data;
	
	// > 粒子 时间流逝
	for( var i=0; i < data['par_count']; i++ ){
		this._drill_parList_curTime[i] += 1;
	}
	
	// > 粒子 生命重置
	if( data['par_lifeType'] == "同时产生" || 
		data['par_lifeType'] == "依次产生" || 
		data['par_lifeType'] == "跳过产生过程" ){
		
		for( var i=0; i < data['par_count']; i++ ){
			if( this.drill_controller_isParticleDead(i) == true ){
				this.drill_controller_rebirth(i);			//（生命重置，不能放入到重设中）
				this.drill_controller_resetParticles(i);	//（执行重设）
			}
		}
	}
	
	// > 粒子 执行销毁
	if( data['par_lifeType'] == "同时产生(一次性)" ||
		this._drill_isDelayingDestroy == true ){
		if( this.drill_controller_isParticleAllDead() == true ){
			this.drill_controller_destroy();				//（执行销毁）
		}
	}
	
	// > 粒子 手动产生
	//		（手动产生的情况下，粒子群 需要由子插件控制销毁，并可以对单一粒子进行操作）
	if( data['par_lifeType'] == "手动产生" ){
		//（无）
	}
};
//==============================
// * I粒子生命周期 - 生命重置
//==============================
Drill_COPa_Controller.prototype.drill_controller_rebirth = function( i ){
	if( this._drill_data['par_lifeType'] == "同时产生(一次性)" ){ return; }	//（一次性 情况）
	if( this._drill_isDelayingDestroy == true ){ return; }					//（延时销毁 情况）
	
	// > 生命置零
	this._drill_parList_curTime[i] = 0;
};
//==============================
// * I粒子生命周期 - 获取当前生命周期
//
//			说明：	> 返回的最小值为0，最大值为 data['par_life']-1 。
//					> 此数值用于 弹道索引用，你不能以此数据去 判断粒子死亡 。
//==============================	
Drill_COPa_Controller.prototype.drill_controller_getParticleLifeTime = function( i ){
	var data = this._drill_data;
	var time = this._drill_parList_curTime[i];
	
	// > 范围锁定
	if( time < 0 ){ time = 0; }
	if( time > data['par_life'] ){ time = data['par_life']; }	//（弹道长度 = 时长+1）
	return time;
};
//==============================
// * I粒子生命周期 - 判断粒子死亡
//==============================
Drill_COPa_Controller.prototype.drill_controller_isParticleDead = function( i ){
	if( this._drill_parList_curTime[i] >= this._drill_data['par_life'] ){ return true; }	//（生命周期结束时）
	return false;
};
//==============================
// * I粒子生命周期 - 判断粒子死亡（全部）
//
//			说明：	> 要满足此条件，必须确保 生命重置 不再执行。
//==============================
Drill_COPa_Controller.prototype.drill_controller_isParticleAllDead = function(){
	for( var i=0; i < this._drill_data['par_count']; i++ ){
		if( this.drill_controller_isParticleDead(i) == false ){
			return false;
		}
	}
	return true;
};
//==============================
// * I粒子生命周期 - 获取一个死亡粒子的编号
//			
//			说明：	> 手动产生 用的函数，如果没有剩余的死亡粒子，则为-1。
//==============================
Drill_COPa_Controller.prototype.drill_controller_getOneDeadParticleIndex = function(){
	for( var i=0; i < this._drill_data['par_count']; i++ ){
		if( this.drill_controller_isParticleDead(i) == true ){
			return i;
		}
	}
	return -1;
};



//=============================================================================
// ** 粒子贴图【Drill_COPa_Sprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个粒子贴图。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					->A主体
// **						->层级位置修正
// **					->B粒子群弹道
// **						->预推演（坐标）
// **						->预推演（透明度）
// **					->C对象绑定
// **						->设置控制器
// **						->设置个体贴图
// **						->贴图初始化（手动）
// **					->D粒子变化
// **						->倒放
// **						> 位置
// **						> 透明度
// **						> 自旋转
// **						> 缩放
// **					->E粒子重设
// **					->F双层效果
// **					->G直线拖尾贴图
// **					->H贴图高宽
// **					->I粒子生命周期
// **
// **		说明：	> 核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
// **				> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的粒子贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 贴图与数据分离。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，在 _spriteset 创建后，再创建此贴图。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_COPa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_COPa_Sprite.prototype = Object.create(Sprite.prototype);
Drill_COPa_Sprite.prototype.constructor = Drill_COPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_COPa_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_COPa_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();				//帧刷新 - A主体
												//帧刷新 - B粒子群弹道（无）
												//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateTransform();		//帧刷新 - D粒子变化
	this.drill_sprite_updateCheckNaN();			//帧刷新 - D粒子变化 - 校验值
	this.drill_sprite_updateReset();			//帧刷新 - E粒子重设
												//帧刷新 - F双层效果（无）
	this.drill_sprite_updateTrailing();			//帧刷新 - G直线拖尾贴图
	this.drill_sprite_updateBitmapAttr();		//帧刷新 - H贴图高宽
												//帧刷新 - I粒子生命周期（无）
};

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_COPa_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * C对象绑定 - 初始化子功能【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行手动初始化。
//##############################
Drill_COPa_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initBallistics();			//初始化子功能 - B粒子群弹道
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initTrailing();			//初始化子功能 - G直线拖尾贴图（拖尾在粒子下面，需要先addChild）
	this.drill_sprite_initTransform();			//初始化子功能 - D粒子变化
	this.drill_sprite_initReset();				//初始化子功能 - E粒子重设
	this.drill_sprite_initSecond();				//初始化子功能 - F双层效果
	this.drill_sprite_initBitmapAttr();			//初始化子功能 - H贴图高宽
	this.drill_sprite_initLife();				//初始化子功能 - I粒子生命周期
};

//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_COPa_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return this.drill_sprite_isOptimizationPassed_Private();
};
//##############################
// * 粒子贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_COPa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 粒子贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_COPa_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 粒子贴图 - 初始化自身
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 粒子贴图 - 销毁子功能
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	
	// > 销毁 - B粒子群弹道
	this._drill_COPa_parBMoveX = null;
	this._drill_COPa_parBMoveY = null;
	this._drill_COPa_parBOpacity = null;
	
	// > 销毁 - C对象绑定
	//	（无）
	
	// > 销毁 - D粒子变化
	for( var i=0; i < this._drill_COPa_parSpriteTank.length; i++ ){
		var par_sprite = this._drill_COPa_parSpriteTank[i];
		this.removeChild( par_sprite );
	}
	this._drill_COPa_parSpriteTank = null;
	
	// > 销毁 - E粒子重设
	this._drill_COPa_curIteration = null;
	
	// > 销毁 - F双层效果
	//	（无）
	
	// > 销毁 - G直线拖尾贴图
	if( data['trailing_enable'] == true ){
		for( var i=0; i < this._drill_COPa_trailingSpriteTank.length; i++ ){
			var tariling_sprite = this._drill_COPa_trailingSpriteTank[i];
			this.removeChild( tariling_sprite );
		}
	}
	this._drill_COPa_trailingSpriteTank = null;
	
	// > 销毁 - H贴图高宽
	//	（无）
	
	// > 销毁 - I粒子生命周期
	//	（无）
};
//==============================
// * 粒子贴图 - 销毁自身
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_isOptimizationPassed_Private = function(){
	return true;
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_initAttr = function() {
	var data = this._drill_controller._drill_data;
	
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_COPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
	
	// > 属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = false;
};
//==============================
// * A主体 - 帧刷新
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateAttr = function() {
	
	// > 固定初始值
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_opacity = 0;
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	this._drill_rotation = 0;
	this._drill_visible = false;
	
	// > 执行 帧刷新
	this.drill_sprite_updateAttr_Position();
	this.drill_sprite_updateAttr_Opacity();
	this.drill_sprite_updateAttr_Scale();
	this.drill_sprite_updateAttr_Rotation();
	this.drill_sprite_updateAttr_Visible();
	
	// > 贴图 赋值
	this.x = this._drill_x;
	this.y = this._drill_y;
	this.opacity = this._drill_opacity;
	this.scale.x = this._drill_scaleX;
	this.scale.y = this._drill_scaleY;
	this.rotation = this._drill_rotation *Math.PI /180;
	this.visible = this._drill_visible;
};
//==============================
// * A主体 - 帧刷新 - 位置【子插件接口】
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Position = function() {
	this._drill_x = this._drill_controller._drill_x;
	this._drill_y = this._drill_controller._drill_y;
};
//==============================
// * A主体 - 帧刷新 - 透明度【子插件接口】
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Opacity = function() {
	this._drill_opacity = this._drill_controller._drill_opacity;
};
//==============================
// * A主体 - 帧刷新 - 缩放【子插件接口】
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Scale = function() {
	this._drill_scaleX = this._drill_controller._drill_scaleX;
	this._drill_scaleY = this._drill_controller._drill_scaleY;
};
//==============================
// * A主体 - 帧刷新 - 旋转【子插件接口】
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Rotation = function() {
	this._drill_rotation = this._drill_controller._drill_rotation;
};
//==============================
// * A主体 - 帧刷新 - 可见【子插件接口】
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateAttr_Visible = function() {
	var data = this._drill_controller._drill_data;
	this._drill_visible = data['visible'];
};


//==============================
// * B粒子群弹道 - 初始化子功能
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_initBallistics = function() {
	var data = this._drill_controller._drill_data;
	
	// > 弹道初始化
	this._drill_COPa_parBMoveX = [];
	this._drill_COPa_parBMoveY = [];
	this._drill_COPa_parBOpacity = [];
	
	// > 初始推演弹道
	for( var i = 0; i < data['par_count']; i++ ){
		this.drill_sprite_refreshBallistics( i );
	}
}
//==============================
// * B粒子群弹道 - 推演弹道
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_refreshBallistics = function( i ){
	
	// > 粒子群弹道 - 预推演（坐标）
	var org_x = this._drill_controller._drill_parList_x[i];
	var org_y = this._drill_controller._drill_parList_y[i];
	Drill_COBa_Manager._drill_COBa_planimetryData = this._drill_controller._drill_ballistics_move;	//（存储的弹道数据，赋值后预推演）
	$gameTemp.drill_COBa_preBallisticsMove( this, i, org_x, org_y );
	this._drill_COPa_parBMoveX[i] = this._drill_COBa_x;
	this._drill_COPa_parBMoveY[i] = this._drill_COBa_y;
	this._drill_COBa_x = null;
	this._drill_COBa_y = null;
	
	// > 粒子群弹道 - 预推演（透明度）
	Drill_COBa_Manager._drill_COBa_commonData = this._drill_controller._drill_ballistics_opacity;	//（存储的弹道数据，赋值后预推演）
	$gameTemp.drill_COBa_preBallisticsOpacity( this, i, 0 );
	this._drill_COPa_parBOpacity[i] = this._drill_COBa_opacity;
	this._drill_COBa_opacity = null;
}


//==============================
// * D粒子变化 - 初始化子功能
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_initTransform = function() {
	var data = this._drill_controller._drill_data;
	
	// > 固定初始值
	this._drill_par_x = 0;
	this._drill_par_y = 0;
	this._drill_par_opacity = 0;
	this._drill_par_scaleX = 0;
	this._drill_par_scaleY = 0;
	this._drill_par_rotation = 0;
	
	// > 粒子贴图容器
	this._drill_COPa_parSpriteTank = [];
	for( var j = 0; j < data['par_count']; j++ ){	
		var temp_sprite = this.drill_sprite_createTransformParticle();
		this._drill_COPa_parSpriteTank.push(temp_sprite);
		this.addChild(temp_sprite);
	}
}
//==============================
// * D粒子变化 - 创建粒子
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_createTransformParticle = function() {
	var data = this._drill_controller._drill_data;
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'], data['tint'], data['smooth'] );
	temp_sprite.blendMode = data['blendMode'];
	temp_sprite.opacity = 0;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	return temp_sprite;
}
//==============================
// * D粒子变化 - 帧刷新
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateTransform = function() {
	var data = this._drill_controller._drill_data;
	
	// > 贴图 - 粒子属性
	for(var i = 0; i < data['par_count']; i++ ){
		var par_sprite = this._drill_COPa_parSpriteTank[i];
		var time = this._drill_controller.drill_controller_getParticleLifeTime( i );
		
		// > B粒子群弹道 - 倒放
		if( data['par_backrun'] == true ){
			time = data['par_life'] -time -1;
		}
		
		// > 固定初始值
		this._drill_par_x = 0;
		this._drill_par_y = 0;
		this._drill_par_opacity = 0;
		this._drill_par_scaleX = 0;
		this._drill_par_scaleY = 0;
		this._drill_par_rotation = 0;
		
		// > 执行 帧刷新
		this.drill_sprite_updateTransform_Position( i, time );
		this.drill_sprite_updateTransform_Opacity( i, time );
		this.drill_sprite_updateTransform_Scale( i, time );
		this.drill_sprite_updateTransform_Rotation( i, time );
		
		// > 粒子 赋值
		par_sprite.x = this._drill_par_x;
		par_sprite.y = this._drill_par_y;
		par_sprite.opacity = this._drill_par_opacity;
		par_sprite.scale.x = this._drill_par_scaleX;
		par_sprite.scale.y = this._drill_par_scaleY;
		par_sprite.rotation = this._drill_par_rotation *Math.PI /180;
	};
};
//==============================
// * D粒子变化 - 帧刷新 - 位置【子插件接口】
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
	this._drill_par_x = this._drill_controller._drill_parList_x[i];
	this._drill_par_y = this._drill_controller._drill_parList_y[i];
	
	// > 位置（粒子群弹道）
	if( this._drill_COPa_parBMoveX[i] == undefined ){ return; }
	if( this._drill_COPa_parBMoveY[i] == undefined ){ return; }
	this._drill_par_x += this._drill_COPa_parBMoveX[i][ time ];
	this._drill_par_y += this._drill_COPa_parBMoveY[i][ time ];
};
//==============================
// * D粒子变化 - 帧刷新 - 透明度【子插件接口】
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateTransform_Opacity = function( i, time ){
	this._drill_par_opacity = this._drill_controller._drill_parList_opacity[i];
	
	// > 依次产生
	var data = this._drill_controller._drill_data;
	if( data['par_lifeType'] == "依次产生" ){
		var cur_iter = this._drill_controller._drill_parList_randomIteration[i];
		if( cur_iter <= 1 ){
			this._drill_parSec_opacity = 0;
			return;
		}
	}
	
	// > 透明度（粒子群弹道）（注意是强制赋值）
	if( this._drill_COPa_parBOpacity[i] == undefined ){ return; }
	this._drill_par_opacity = this._drill_COPa_parBOpacity[i][ time ];
};
//==============================
// * D粒子变化 - 帧刷新 - 缩放【子插件接口】
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateTransform_Scale = function( i, time ){
	this._drill_par_scaleX = this._drill_controller._drill_parList_scaleX[i];
	this._drill_par_scaleY = this._drill_controller._drill_parList_scaleY[i];
};
//==============================
// * D粒子变化 - 帧刷新 - 旋转【子插件接口】
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateTransform_Rotation = function( i, time ){
	var data = this._drill_controller._drill_data;
	if( data['par_selfRotateMode'] == "始终与朝向一致" ){
		this._drill_par_rotation = DrillUp.drill_COPa_getBallisticsMoveDegree( 
			this._drill_COPa_parBMoveX[i],
			this._drill_COPa_parBMoveY[i],
			time,
			data['par_backrun']
		) *Math.PI /180;
		return;
	}
	
	this._drill_par_rotation = this._drill_controller._drill_parList_rotation[i];
};
//==============================
// * D粒子变化 - 帧刷新 - 校验值
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateCheckNaN = function(){
	
	// > 校验值
	if( DrillUp.g_COPa_checkNaN == true ){
		if( isNaN( this._drill_par_x ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_par_x" ) );
		}
		if( isNaN( this._drill_par_y ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_par_y" ) );
		}
		if( isNaN( this._drill_par_opacity ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_par_opacity" ) );
		}
		if( isNaN( this._drill_par_scaleX ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_par_scaleX" ) );
		}
		if( isNaN( this._drill_par_scaleY ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_par_scaleY" ) );
		}
		if( isNaN( this._drill_par_rotation ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_curPluginTipName, "_drill_par_rotation" ) );
		}
	}
}


//==============================
// * E粒子重设 - 初始化子功能
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_initReset = function() {
	var data = this._drill_controller._drill_data;
	
	// > 粒子 迭代次数（贴图的）
	this._drill_COPa_curIteration = [];
	for( var i = 0; i < data['par_count']; i++ ){
		this._drill_COPa_curIteration[i] = 1;
	}
}
//==============================
// * E粒子重设 - 帧刷新
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateReset = function() {
	var data = this._drill_controller._drill_data;
	
	// > 迭代次数监听（每次变化时，重新推演弹道）
	for(var i = 0; i < data['par_count']; i++ ){
		if( this._drill_COPa_curIteration[i] != this._drill_controller._drill_parList_randomIteration[i] ){
			this._drill_COPa_curIteration[i] =  this._drill_controller._drill_parList_randomIteration[i];
			
			// > 粒子 重新推演弹道
			this.drill_sprite_refreshBallistics( i );
		}
	}
}


//==============================
// * F双层效果 - 初始化子功能
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_initSecond = function() {
	//（当前贴图无法控制 第二层，需要外部控制）
}


//==============================
// * G直线拖尾贴图 - 初始化子功能
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_initTrailing = function() {
	var data = this._drill_controller._drill_data;
	if( data['trailing_enable'] != true ){ return; }
	
	// > 粒子贴图容器
	this._drill_COPa_trailingSpriteTank = [];
	for( var j = 0; j < data['par_count']; j++ ){	
		var temp_sprite = this.drill_sprite_createTrailingSprite();
		this._drill_COPa_trailingSpriteTank.push(temp_sprite);
		this.addChild(temp_sprite);
	}
}
//==============================
// * G直线拖尾贴图 - 创建粒子
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_createTrailingSprite = function() {
	var data = this._drill_controller._drill_data;
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.loadBitmap( data['trailing_src_img_file'], data['trailing_src_img'], data['tint'], data['smooth'] );
	temp_sprite.blendMode = data['blendMode'];
	temp_sprite.opacity = 0;
	if( data['trailing_centerAnchor'] == true ){
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
	}else{
		temp_sprite.anchor.x = 1.0;
		temp_sprite.anchor.y = 0.5;
	}
	return temp_sprite;
}
//==============================
// * G直线拖尾贴图 - 帧刷新
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateTrailing = function() {
	var data = this._drill_controller._drill_data;
	if( data['trailing_enable'] != true ){ return; }
	
	// > 拖尾贴图属性
	for(var i = 0; i < data['par_count']; i++ ){
		var par_sprite = this._drill_COPa_parSpriteTank[i];
		var tariling_sprite = this._drill_COPa_trailingSpriteTank[i];
		var time = this._drill_controller.drill_controller_getParticleLifeTime( i );
		
		// > B粒子群弹道 - 倒放
		if( data['par_backrun'] == true ){
			time = data['par_life'] -time -1;
		}
		
		// > 位置
		tariling_sprite.x = par_sprite.x;
		tariling_sprite.y = par_sprite.y;
		
		// > 透明度
		tariling_sprite.opacity = par_sprite.opacity;
		
		// > 旋转角度
		tariling_sprite.rotation = DrillUp.drill_COPa_getBallisticsMoveDegree( 
			this._drill_COPa_parBMoveX[i],
			this._drill_COPa_parBMoveY[i],
			time,
			data['par_backrun']
		) *Math.PI /180;
		
		// > 缩放
		tariling_sprite.scale.x = par_sprite.scale.x;
		tariling_sprite.scale.y = par_sprite.scale.x;
	};
};
//==============================
// * G直线拖尾贴图 - 获取弹道的朝向
//
//			说明：	注意此处的计算，不考虑 弹道延迟 ，否则角度会算为0。
//==============================
DrillUp.drill_COPa_getBallisticsMoveDegree = function( COBa_x, COBa_y, time, is_backrun ){
	if( is_backrun == false ){
		var cur_x = COBa_x[ time ];
		var cur_y = COBa_y[ time ];
		var next_x = COBa_x[ time+1 ];
		var next_y = COBa_y[ time+1 ];
		
		// > 弹道索引超出情况
		if( time >= COBa_x.length -1 ){
			cur_x = COBa_x[ COBa_x.length -2 ];
			cur_y = COBa_y[ COBa_y.length -2 ];
			next_x = COBa_x[ COBa_x.length -1 ];
			next_y = COBa_y[ COBa_y.length -1 ];
		}
		return this.drill_COPa_getPointToPointDegree( cur_x, cur_y, next_x, next_y );
	}else{
		var cur_x = COBa_x[ time ];
		var cur_y = COBa_y[ time ];
		var next_x = COBa_x[ time-1 ];
		var next_y = COBa_y[ time-1 ];
		
		// > 弹道索引超出情况
		if( time <= 0 ){
			cur_x = COBa_x[ 1 ];
			cur_y = COBa_y[ 1 ];
			next_x = COBa_x[ 0 ];
			next_y = COBa_y[ 0 ];
		}
		return this.drill_COPa_getPointToPointDegree( cur_x, cur_y, next_x, next_y );
	}
};
//==============================
// * G直线拖尾贴图 - 数学 - 计算点A朝向点B的角度
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//			返回：	> 数字      （角度，0 至 360 之间）
//			
//			说明：	0度朝右，90度朝下，180度朝左，270度朝上。
//==============================
DrillUp.drill_COPa_getPointToPointDegree = function( x1,y1,x2,y2 ){
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


//==============================
// * H贴图高宽 - 初始化子功能
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_initBitmapAttr = function() {
	//（无）
};
//==============================
// * H贴图高宽 - 帧刷新
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_updateBitmapAttr = function() {
	var data = this._drill_controller._drill_data;
	
	// > 高宽赋值（粒子贴图）
	if( this._drill_controller._drill_bitmapPar_width  == 101 &&
		this._drill_controller._drill_bitmapPar_height == 101 ){
		if( this._drill_COPa_parSpriteTank.length > 0 ){
			var par_bitmap = this._drill_COPa_parSpriteTank[0].bitmap;
			if( par_bitmap.isReady() ){
				this._drill_controller._drill_bitmapPar_width = par_bitmap.width;
				this._drill_controller._drill_bitmapPar_height = par_bitmap.height;
			}
		}
	}
	
	// > 高宽赋值（拖尾贴图）
	if( data['trailing_enable'] == true &&
		this._drill_controller._drill_bitmapTrailing_width  == 101 &&
		this._drill_controller._drill_bitmapTrailing_height == 101 ){
		if( this._drill_COPa_trailingSpriteTank.length > 0 ){
			var trailing_bitmap = this._drill_COPa_trailingSpriteTank[0].bitmap;
			if( trailing_bitmap.isReady() ){
				this._drill_controller._drill_bitmapTrailing_width = trailing_bitmap.width;
				this._drill_controller._drill_bitmapTrailing_height = trailing_bitmap.height;
			}
		}
	}
};


//==============================
// * I粒子生命周期 - 初始化子功能
//==============================
Drill_COPa_Sprite.prototype.drill_sprite_initLife = function() {
	//（无）
}




//=============================================================================
// ** 粒子贴图（第二层）【Drill_COPa_SecSprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个 第二层粒子贴图 。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁
// **						->销毁
// **					->A主体
// **					->B粒子群弹道（无）
// **					->C对象绑定（无）
// **					->D粒子变化
// **						->倒放
// **						> 位置
// **						> 透明度
// **						> 自旋转
// **						> 缩放
// **					->E粒子重设（无）
// **					->F双层效果（无）
// **					->G直线拖尾贴图（无）
// **					->H贴图高宽（无）
// **					->I粒子生命周期（无）
// **
// **		说明：	> 核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
// **				> 第二层粒子贴图会比粒子贴图 优先 执行update，所以需要考虑【慢1帧弹道】问题。
// **				  因此，第二层粒子与 父贴图 的 D粒子变化 保持一致。
//=============================================================================
//==============================
// * 第二层粒子 - 定义
//==============================
function Drill_COPa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_COPa_SecSprite.prototype = Object.create(Sprite.prototype);
Drill_COPa_SecSprite.prototype.constructor = Drill_COPa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_COPa_SecSprite.prototype.initialize = function( parentSprite ){
	Sprite.prototype.initialize.call(this);
	this.drill_spriteSec_initSelf( parentSprite );	//初始化自身
	this.drill_spriteSec_initChild();				//初始化子功能
};
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_COPa_SecSprite.prototype.update = function() {
	if( this.drill_spriteSec_isReady() == false ){ return; }
	if( this.drill_spriteSec_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_spriteSec_updateAttr();			//帧刷新 - A主体
												//帧刷新 - B粒子群弹道（无）
												//帧刷新 - C对象绑定（无）
	this.drill_spriteSec_updateTransform();		//帧刷新 - D粒子变化
												//帧刷新 - E粒子重设（无）
												//帧刷新 - F双层效果（无）
												//帧刷新 - G直线拖尾贴图（无）
												//帧刷新 - H贴图高宽（无）
												//帧刷新 - I粒子生命周期（无）
};
//##############################
// * 第二层粒子 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_COPa_SecSprite.prototype.drill_sprite_isReady = function(){
	return this.drill_spriteSec_isReady();
};
Drill_COPa_SecSprite.prototype.drill_spriteSec_isReady = function(){
	if( this._drill_parentSprite == undefined ){ return false; }
    return this._drill_parentSprite.drill_sprite_isReady();
};
//##############################
// * 第二层粒子 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_COPa_SecSprite.prototype.drill_sprite_isOptimizationPassed = function(){
	return this.drill_spriteSec_isOptimizationPassed();
};
Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
    return this.drill_spriteSec_isOptimizationPassed_Private();
};
//##############################
// * 第二层粒子 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_COPa_SecSprite.prototype.drill_sprite_isNeedDestroy = function(){
	return this.drill_spriteSec_isNeedDestroy();
};
Drill_COPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 第二层粒子 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_COPa_SecSprite.prototype.drill_sprite_destroy = function(){
	this.drill_spriteSec_destroy();
};
Drill_COPa_SecSprite.prototype.drill_spriteSec_destroy = function(){
	this.drill_spriteSec_destroyChild();
	this.drill_spriteSec_destroySelf();
};
//==============================
// * 第二层粒子 - 初始化自身
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	this._drill_parentSprite = parentSprite;								//父类对象
	this._drill_controller = parentSprite._drill_controller;				//控制器对象
	//this._drill_curSerial = -1;											//当前序列号（不使用）
};
//==============================
// * 第二层粒子 - 初始化子功能
//			
//			说明：	> 创建该类后直接初始化。
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_initChild = function(){
	this.drill_spriteSec_initAttr();				//初始化子功能 - A主体
	this.drill_spriteSec_initBallistics();			//初始化子功能 - B粒子群弹道
													//初始化子功能 - C对象绑定（无）
	this.drill_spriteSec_initTransform();			//初始化子功能 - D粒子变化
	this.drill_spriteSec_initReset();				//初始化子功能 - E粒子重设
	this.drill_spriteSec_initSecond();				//初始化子功能 - F双层效果
	this.drill_spriteSec_initTrailing();			//初始化子功能 - G直线拖尾贴图
	this.drill_spriteSec_initBitmapAttr();			//初始化子功能 - H贴图高宽
	this.drill_spriteSec_initLife();				//初始化子功能 - I粒子生命周期
};
//==============================
// * 第二层粒子 - 销毁子功能
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	
	// > 销毁 - A主体
	this.visible = false;
	
	// > 销毁 - B粒子群弹道
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
	// > 销毁 - D粒子变化
	for( var i=0; i < this._drill_COPa_parSecSpriteTank.length; i++ ){
		var par_sprite = this._drill_COPa_parSecSpriteTank[i];
		this.removeChild( par_sprite );
	}
	this._drill_COPa_parSecSpriteTank = null;
	
	// > 销毁 - E粒子重设
	//	（无）
	
	// > 销毁 - F双层效果
	//	（无）
	
	// > 销毁 - G直线拖尾贴图
	//	（无）
	
	// > 销毁 - H贴图高宽
	//	（无）
	
	// > 销毁 - I粒子生命周期
	//	（无）
};
//==============================
// * 第二层粒子 - 销毁自身
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	this._drill_parentSprite = null;			//父类对象
	this._drill_controller = null;				//控制器对象
	//this._drill_curSerial = -1;				//当前序列号（不使用）
};
//==============================
// * 优化策略 - 判断通过（私有）
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed_Private = function(){
	return true;
}


//==============================
// * A主体（第二层） - 初始化子功能
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_initAttr = function() {
	
	// > 私有属性初始化
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.opacity = 0;
	this.visible = false;
};
//==============================
// * A主体（第二层） - 帧刷新
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_updateAttr = function() {
	
	// > 与父贴图完全同步（此处会有一帧延迟，移动镜头时能看出来）
	this.x = this._drill_parentSprite.x;
	this.y = this._drill_parentSprite.y;
	this.scale.x = this._drill_parentSprite.scale.x;
	this.scale.y = this._drill_parentSprite.scale.y;
	this.opacity = this._drill_parentSprite.opacity;
	this.visible = this._drill_parentSprite.visible;
};


//==============================
// * B粒子群弹道（第二层） - 初始化子功能
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_initBallistics = function() {
	//（无）
};


//==============================
// * D粒子变化（第二层） - 初始化子功能
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_initTransform = function() {
	var p_data = this._drill_controller._drill_data;
	
	// > 粒子贴图容器
	this._drill_COPa_parSecSpriteTank = [];
	for( var j = 0; j < p_data['par_count'] ; j++ ){	
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = ImageManager.loadBitmap( p_data['src_img_file'], p_data['second_src_img'], p_data['tint'], p_data['smooth'] );
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.blendMode = this._drill_parentSprite.blendMode;
		temp_sprite.opacity = 0;
		this._drill_COPa_parSecSpriteTank.push(temp_sprite);
		this.addChild(temp_sprite);
	}
}
//==============================
// * D粒子变化（第二层） - 帧刷新
//
//			说明：	最好不要用 par_sprite.x = org_sprite.x 的方式来赋值，会产生1帧的延迟问题。
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_updateTransform = function(){
	var data = this._drill_controller._drill_data;
	
	// > 贴图 - 粒子属性（第二层）
	for(var i = 0; i < data['par_count']; i++ ){
		var par_sprite = this._drill_COPa_parSecSpriteTank[i];
		var time = this._drill_controller.drill_controller_getParticleLifeTime( i );
		
		// > B粒子群弹道 - 倒放
		if( data['par_backrun'] == true ){
			time = data['par_life'] -time -1;
		}
		
		// > 固定初始值
		this._drill_parSec_x = 0;
		this._drill_parSec_y = 0;
		this._drill_parSec_opacity = 0;
		this._drill_parSec_scaleX = 0;
		this._drill_parSec_scaleY = 0;
		this._drill_parSec_rotation = 0;
		
		// > 执行 帧刷新
		this.drill_spriteSec_updateTransform_Position( i, time );
		this.drill_spriteSec_updateTransform_Opacity( i, time );
		this.drill_spriteSec_updateTransform_Scale( i, time );
		this.drill_spriteSec_updateTransform_Rotation( i, time );
		
		// > 粒子 赋值
		par_sprite.x = this._drill_parSec_x;
		par_sprite.y = this._drill_parSec_y;
		par_sprite.opacity = this._drill_parSec_opacity;
		par_sprite.scale.x = this._drill_parSec_scaleX;
		par_sprite.scale.y = this._drill_parSec_scaleY;
		par_sprite.rotation = this._drill_parSec_rotation *Math.PI /180;
	};
}
//==============================
// * D粒子变化（第二层） - 帧刷新 - 位置【子插件接口】
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_updateTransform_Position = function( i, time ){
	this._drill_parSec_x = this._drill_controller._drill_parList_x[i];
	this._drill_parSec_y = this._drill_controller._drill_parList_y[i];
	
	// > 位置（粒子群弹道）
	if( this._drill_parentSprite._drill_COPa_parBMoveX[i] == undefined ){ return; }
	if( this._drill_parentSprite._drill_COPa_parBMoveY[i] == undefined ){ return; }
	this._drill_parSec_x += this._drill_parentSprite._drill_COPa_parBMoveX[i][ time ];
	this._drill_parSec_y += this._drill_parentSprite._drill_COPa_parBMoveY[i][ time ];
};
//==============================
// * D粒子变化（第二层） - 帧刷新 - 透明度【子插件接口】
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_updateTransform_Opacity = function( i, time ){
	this._drill_parSec_opacity = this._drill_controller._drill_parList_opacity[i];
	
	// > 依次产生
	var data = this._drill_controller._drill_data;
	if( data['par_lifeType'] == "依次产生" ){
		var cur_iter = this._drill_controller._drill_parList_randomIteration[i];
		if( cur_iter <= 1 ){
			this._drill_parSec_opacity = 0;
			return;
		}
	}
	
	// > 透明度（粒子群弹道）（注意是强制赋值）
	if( this._drill_parentSprite._drill_COPa_parBOpacity[i] == undefined ){ return; }
	this._drill_parSec_opacity = this._drill_parentSprite._drill_COPa_parBOpacity[i][ time ];
};
//==============================
// * D粒子变化（第二层） - 帧刷新 - 缩放【子插件接口】
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_updateTransform_Scale = function( i, time ){
	this._drill_parSec_scaleX = this._drill_controller._drill_parList_scaleX[i];
	this._drill_parSec_scaleY = this._drill_controller._drill_parList_scaleY[i];
};
//==============================
// * D粒子变化（第二层） - 帧刷新 - 旋转【子插件接口】
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_updateTransform_Rotation = function( i, time ){
	var data = this._drill_controller._drill_data;
	if( data['par_selfRotateMode'] == "始终与朝向一致" ){
		this._drill_parSec_rotation = DrillUp.drill_COPa_getBallisticsMoveDegree( 
			this._drill_parentSprite._drill_COPa_parBMoveX[i],
			this._drill_parentSprite._drill_COPa_parBMoveY[i],
			time,
			data['par_backrun']
		) *Math.PI /180;
		return;
	}
	
	this._drill_parSec_rotation = this._drill_controller._drill_parList_rotation[i];
};


//==============================
// * E粒子重设（第二层） - 初始化子功能
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_initReset = function() {
	//（无）
};


//==============================
// * F双层效果（第二层） - 初始化子功能
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_initSecond = function() {
	//（该类就是 F双层效果 ）
};


//==============================
// * G直线拖尾贴图（第二层） - 初始化子功能
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_initTrailing = function() {
	//（无）
};


//==============================
// * H贴图高宽（第二层） - 初始化子功能
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_initBitmapAttr = function() {
	//（无）
};


//==============================
// * I粒子生命周期（第二层） - 初始化子功能
//==============================
Drill_COPa_SecSprite.prototype.drill_spriteSec_initLife = function() {
	//（无）
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfParticle = false;
		var pluginTip = DrillUp.drill_COPa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}
