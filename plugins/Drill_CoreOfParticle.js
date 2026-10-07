//=============================================================================
// Drill_CoreOfParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        系统 - 粒子核心
 * @author Drill_up
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_CoreOfParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 插件定义了基础粒子、复杂粒子，并提供相关粒子功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件为基础核心，单独使用没有效果。
 * 插件基于弹道核心，可以作用于所有需要用到粒子的子插件。
 * 基于：
 *   - Drill_CoreOfBallistics              数学模型-弹道核心★★v2.2及以上★★
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
 * 时间复杂度： o(n^3)*o(贴图处理) 每帧
 * 测试方法1：  分别在地图界面、战斗界面、菜单界面进行测试。
 * 测试结果1：  地图界面中，平均消耗为：【272.00ms】
 *              战斗界面中，平均消耗为：【178.40ms】
 *              菜单界面中，平均消耗为：【152.80ms】
 * 测试方法2：  在战斗管理层对数字雨，对1300个粒子进行测试。
 * 测试结果2：  数字雨的粒子，平均消耗为：【809.50ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.粒子核心集中了所有子插件的消耗量，所以消耗统计很大。
 *   粒子数量越多，消耗也就越大。
 * 3.粒子核心消耗那么大，如何判断大量粒子的真实卡顿的影响？
 *   用你的电脑配置去示例中的战斗管理层，按f2开启fps的检测，然后
 *   静止不动，等待帧率稳定。如果数字雨的1300个粒子，800ms消耗都
 *   没有让fps降到30以下，那么说明电脑硬件能力可以，能够承受。
 *   （作者我的垃圾本在数字雨的压力下fps为10帧，而现今大部分电脑
 *   性能都远远超过我那台垃圾本了）
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了粒子 彩虹化 功能。
 * [v1.2]
 * 优化改进了粒子底层结构，定义了基础粒子和复杂粒子。
 * [v1.3]
 * 改进了 随机因子 的功能。
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		COPa（Core_Of_Particle）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	地图界面、战斗界面、菜单界面
//		★性能测试消耗	2024/5/10：
//							》创建过程：   35.9ms（drill_spriteSec_initBallistics）13.3ms（drill_sprite_initTransform）
//							》帧刷新过程： 7.2ms（drill_sprite_updateAttr）25.7ms（drill_sprite_updateTransform）
//						2026/7/17：
//							》地图界面：272.0ms（Drill_COPa_BasicPar_Sprite.update）184.8ms（Drill_COPa_BasicPar_Sprite.drill_sprite_updateTransform）
//							》战斗界面：178.4ms（Drill_COPa_BasicPar_Sprite.update）98.1ms（Drill_COPa_BasicPar_Sprite.drill_sprite_updateTransform）
//							》菜单界面：152.8ms（Drill_COPa_BasicPar_Sprite.update）84.8ms（Drill_COPa_BasicPar_Sprite.drill_sprite_updateTransform）
//							  垃圾本的菜单界面能跑满60帧。
//							》数字雨：20*16+25*12+35*10+35*10 = 1320个粒子：809.5ms（Drill_COPa_BasicPar_Sprite.update）557.1ms（Drill_COPa_BasicPar_Sprite.drill_sprite_updateTransform）
//							  垃圾本能跑数字雨，保持在10帧，能玩，很卡，但效果不会出现折扣。
//		★最坏情况		大量粒子被同时创建并播放。
//		★备注			核心使用TotalTime统计，子插件使用SelfTime统计。
//						核心集中了大部分性能消耗，但子插件也可能因为继承关系分摊了一部分消耗。优化时要结合来看。
//		
//		★优化记录		2026/7/17：
//							为了权衡性能和功能，这里分成了 BasicPar 和 ComplexPar 两种类。
//							实际消耗仍然压在 BasicPar 类中，并且贴图的消耗远远大于控制器的消耗。
//							使用了 粒子容器ParticleContainer 的结构。
//							粒子群弹道的 透明度弹道 合并用一个。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			
//			->基础粒子控制器【Drill_COPa_BasicPar_Controller】
//			->基础粒子贴图【Drill_COPa_BasicPar_Sprite】
//			->基础粒子第二层贴图【Drill_COPa_BasicPar_SecSprite】
//			
//			->复杂粒子控制器【Drill_COPa_ComplexPar_Controller】
//			->复杂粒子贴图【Drill_COPa_ComplexPar_Sprite】
//			->复杂粒子第二层贴图【Drill_COPa_ComplexPar_SecSprite】
//		
//		
//		★家谱：
//			大家族-粒子效果
//			核心
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//		
//		★插件私有类：
//			* 基础粒子控制器【Drill_COPa_BasicPar_Controller】
//			* 基础粒子贴图【Drill_COPa_BasicPar_Sprite】
//			* 基础粒子第二层贴图【Drill_COPa_BasicPar_SecSprite】
//			* 复杂粒子控制器【Drill_COPa_ComplexPar_Controller】
//			* 复杂粒子贴图【Drill_COPa_ComplexPar_Sprite】
//			* 复杂粒子第二层贴图【Drill_COPa_ComplexPar_SecSprite】
//		
//		★核心说明：
//			1.核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//			2.核心针对全局，而不是特定场景，因此只能提供类的框架定义，无法提供数据容器。
//			3.粒子的子插件就和下面的花束一样，百花齐放。但是派生的插件也太多了……
//				           {@}
//				        {@} * {@}
//				     {@} * {@} * {@}
//				  {@}* {@} * {@} * {@}
//				   \ {@} * {@} * {@} /
//				      \ \ \ l / / /
//				       \\ \ Y / //
//				         \\ l //
//				          \\Y//
//				           >=<
//				          //*\\
//
//		★必要注意事项：
//			1.考虑到兼容关系，子插件可以直接继承 复杂粒子控制器，通过 2A粒子类型 来控制切换。
//				基础粒子：搭载ParticleContainer，支持高性能渲染大量粒子。
//				复杂粒子：支持 彩虹化、滤镜、遮罩，但性能消耗大。
//			2.可参考子插件的写法：
//				Drill_LayerParticle（见该插件的 贴图控制 模块）
//				Drill_GaugeFloatingBlastParticle（见该插件的 贴图控制 模块）
//
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			1.问题：粒子是半开放的继承结构，很多功能细节都需要子插件来实现，而这些功能在这里很难标注出来。
//			  解决：【已解决】，使用脚本文档，对所有插件进行专门区分介绍，这样至少看一眼文档，就能知道插件的特殊点。
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_COPa_PluginTip_curName = "Drill_CoreOfParticle.js 系统-粒子核心";
	DrillUp.g_COPa_PluginTip_baseList = ["Drill_CoreOfBallistics.js 数学模型-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
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
	// * 提示信息 - 配置错误 - 透明度类型错误
	//==============================
	DrillUp.drill_COPa_getPluginTip_ErrorOpacityMode = function( curPluginTipName, opacity_name ){
		return "【" + curPluginTipName + "】\n透明度类型错误，没有类型'"+opacity_name+"'。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_COPa_getPluginTip_ParamIsNaN = function( param_name, check_tank ){
		var text = "【" + DrillUp.g_COPa_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
		if( check_tank ){
			var keys = Object.keys( check_tank );
			for( var i=0; i < keys.length; i++ ){
				text += "\n" + keys[i] + "的值：" + check_tank[ keys[i] ] ;
			}
		}
		return text;
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_COPa_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_COPa_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 控制器的非数字参数
	//==============================
	DrillUp.drill_COPa_getPluginTip_controllerData_NotId = function( class_name ){
		return "【" + DrillUp.g_COPa_PluginTip_curName + "】\n错误，类对象 "+class_name+" 获取到了非数字参数，数据初始化失败。";
	};
	//==============================
	// * 提示信息 - 报错 - 控制器的父类
	//==============================
	DrillUp.drill_COPa_getPluginTip_controllerData_CanNotGet = function(){
		return "【" + DrillUp.g_COPa_PluginTip_curName + "】\n错误，有子插件未对静态数据函数进行兼容就直接调用，访问被拒绝。\n可能是子插件为旧插件，建议更新全部粒子插件。\n全部粒子插件看看文档:\"1.系统 > 大家族-粒子效果.docx\"。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_CoreOfParticle = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_CoreOfParticle');
	
	
	//==============================
	// * 静态数据 - 粒子样式
	//
	//			说明：	> 此函数并未使用，只作为 子插件 的参考样式来使用。
	//==============================
	DrillUp.drill_COPa_styleInit = function( dataFrom ){
		var data = {};
		
		// > A主体 - 基础特性
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/System/";
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		//data['layerIndex'];
		//data['zIndex'] = Number( dataFrom["图片层级"] || 4);
		
		// > A主体 - 其它特性
		//	（子插件自定义）
		
		// > B变换特性
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['parentRotate'] = 0;
		data['par_x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['par_y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['par_scale_x'] = 1.0;
		data['par_scale_y'] = 1.0;
		data['par_rotate'] = 0;
		
		// > C校验值（无）
		
		// > D指令叠加变化（无）
		
		// > E延迟指令（无）
		
		// > F周期指令（无）
		
		
		// > H粒子群弹道
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
		
		// > I随机因子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > J粒子变化（无）
		
		// > K粒子重设
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "随机角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		// > L粒子生命周期（无）
		
		
		// > O贴图加载（无）
		
		// > P直线拖尾贴图
		data['trailing_enable'] = String( dataFrom["是否开启直线拖尾效果"] || "false") == "true";
		data['trailing_centerAnchor'] = String( dataFrom["是否固定拖尾在粒子中心"] || "false") == "true";
		data['trailing_src_img'] = String( dataFrom["资源-直线拖尾"] || "");
		data['trailing_src_img_file'] = "img/System/";
		
		// > Q双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		//data['second_layerIndex'];
		//data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 3);
		
		
		// > 控制器 - 『控制器与贴图的样式-静态数据-指针初始化』（核心参考）
		//Drill_COPa_BasicPar_Controller.drill_controller_initData( data );
		
		
		// > 2A粒子类型
		data['parType_type'] = String( dataFrom["粒子类型"] || "基础粒子");
		
		// > 2B彩虹化
		data['rainbow_enable'] = String( dataFrom["是否开启彩虹化-粒子"] || "false") == "true";
		data['rainbow_enableSecond'] = String( dataFrom["是否开启彩虹化-第二层粒子"] || "false") == "true";
		data['rainbow_enableTrailing'] = String( dataFrom["是否开启彩虹化-直线拖尾"] || "false") == "true";
		data['rainbow_num'] = Number( dataFrom["彩虹化色彩数量"] || 20);
		data['rainbow_lockTint'] = String( dataFrom["彩虹化是否锁定色调值"] || "false") == "true";
		if( dataFrom["锁定的色调值列表"] != undefined &&
			dataFrom["锁定的色调值列表"] != "" ){
			data['rainbow_tintList'] = JSON.parse( dataFrom["锁定的色调值列表"] || [] );
		}else{
			data['rainbow_tintList'] = [];
		}
		
		
		// > 控制器 - 『控制器与贴图的样式-静态数据-指针初始化』（核心参考）
		//Drill_COPa_ComplexPar_Controller.drill_controller_initData( data );
		
		return data;
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_COPa_getPluginTip_NeedUpdate_Ballistics() );
	}
	
	function Drill_COPa_Controller(){  //（子插件检测）
		var text = DrillUp.drill_COPa_getPluginTip_controllerData_CanNotGet();
		alert(text);
		throw new Error(text);
	};
	Drill_COPa_Controller.prototype.initialize = function(){
		var text = DrillUp.drill_COPa_getPluginTip_controllerData_CanNotGet();
		alert(text);
		throw new Error(text);
	};
	
	function Drill_COPa_Sprite(){  //（子插件检测）
		var text = DrillUp.drill_COPa_getPluginTip_controllerData_CanNotGet();
		alert(text);
		throw new Error(text);
	};
	Drill_COPa_Sprite.prototype.initialize = function(){
		var text = DrillUp.drill_COPa_getPluginTip_controllerData_CanNotGet();
		alert(text);
		throw new Error(text);
	};
	
	
	
	
//=============================================================================
// ** 基础粒子控制器【Drill_COPa_BasicPar_Controller】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个专门控制粒子的数据类。
// **		子功能：	
// **					->控制器『控制器与贴图』
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->控制器标记销毁
// **						->控制器是否销毁
// **					
// **					->A主体『基础特性和变换特性』
// **						->基础特性
// **							>  资源名（O贴图加载）
// **							>  显示/隐藏
// **							>  暂停/继续
// **							>  混合模式
// **							>  层级
// **							>  堆叠级
// **						->其它特性
// **					->B变换特性『变换特性-粒子贴图』『数据最终变换值-类定义』
// **						>  整体平移X
// **						>  整体平移Y
// **						>  整体透明度
// **						>  整体旋转
// **						>  粒子平移X
// **						>  粒子平移Y
// **						>  粒子缩放X
// **						>  粒子缩放Y
// **						>  粒子旋转
// **					->C校验值
// **					->D指令叠加变化
// **						> 主体贴图-整体移动到
// **						> 主体贴图-整体透明度
// **						> 主体贴图-整体旋转
// **						> 粒子贴图组-粒子移动到
// **						> 粒子贴图组-粒子缩放X
// **						> 粒子贴图组-粒子缩放Y
// **						> 粒子贴图组-粒子旋转
// **					->E延迟指令
// **					->F周期指令
// **					
// **					->H粒子群弹道
// **						->移动弹道
// **						->透明度弹道
// **					->I随机因子
// **					->J粒子变化
// **						> 粒子平移
// **						> 粒子缩放
// **						> 粒子透明度
// **						> 粒子旋转
// **					->K粒子重设
// **						> 粒子 迭代次数
// **						> 粒子平移
// **						> 粒子缩放
// **						> 粒子透明度
// **						> 粒子旋转
// **					->L粒子生命周期
// **						> 同时产生(一次性)
// **						> 同时产生
// **						> 依次产生
// **						> 跳过产生过程
// **						> 手动产生
// **					
// **					->O贴图加载
// **					->P直线拖尾贴图
// **					->Q双层效果
// **					
// **		说明：	> 核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"。
//=============================================================================
//==============================
// * 基础粒子控制器 - 定义
//==============================
function Drill_COPa_BasicPar_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 基础粒子控制器 - 初始化
//==============================
Drill_COPa_BasicPar_Controller.prototype.initialize = function( data_id ){
	this._drill_data_id = data_id;											//样式ID（控制器与样式 多对一 或 一对一）
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『随机因子-生成一个不重复的序列号』
    //this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
    this.drill_controller_resetData( data_id );
};
//##############################
// * 基础粒子控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_update = function(){
	this.drill_controller_updateDelayingCommandImportant();		//帧刷新 - E延迟指令 - 时间流逝
	this.drill_controller_updatePeriodizeCommandImportant();	//帧刷新 - F周期指令 - 时间流逝
	if( this.drill_controller_isPause() == true ){ return; }
	this.drill_controller_updateAttr();							//帧刷新 - A主体
																//帧刷新 - B变换特性（无）
	this.drill_controller_updateCheckNaN();						//帧刷新 - C校验值
	this.drill_controller_updateCommandChange();				//帧刷新 - D指令叠加变化
	this.drill_controller_updateDelayingCommand();				//帧刷新 - E延迟指令 - 执行延迟指令
	this.drill_controller_updatePeriodizeCommand();				//帧刷新 - F周期指令 - 执行延迟指令
	
																//帧刷新 - H粒子群弹道（无）
																//帧刷新 - I随机因子（无）
	this.drill_controller_updateTransform();					//帧刷新 - J粒子变化
																//帧刷新 - K粒子重设（无）
	this.drill_controller_updateLife();							//帧刷新 - L粒子生命周期
																
																//帧刷新 - O贴图加载（无）
																//帧刷新 - Q双层效果（无）
																//帧刷新 - P直线拖尾贴图（无）
};
//##############################
// * 基础粒子控制器 - 重设数据【标准函数】
//			
//			参数：	> data_id 数字
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetData = function( data_id ){
	this.drill_controller_resetData_Private( data_id );
};
//##############################
// * 基础粒子控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_setVisible = function( visible ){
	this._drill_visible = visible;
};
//##############################
// * 基础粒子控制器 - 暂停/继续【标准函数】
//
//			参数：	> pause 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_setPause = function( pause ){
	this._drill_pause = pause;
};
//##############################
// * 基础粒子控制器 - 控制器标记销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 基础粒子控制器 - 控制器是否销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};
//==============================
// * 基础粒子控制器 - 函数枚举
//
//			说明：	> 使用枚举要比字符串比较快很多，适用于大量 延迟指令、周期指令 。
//					> 复杂粒子 复刻了 基础粒子 的全部函数枚举。
//==============================
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setVisible                   = 11;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setPause                     = 12;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_setPause    = 13;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_clear       = 14;

Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setBlendMode                 = 21;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setLayerIndex                = 22;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setZIndex                    = 23;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreBlendMode             = 24;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreLayerIndex            = 25;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreZIndex                = 26;

Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setOpacity     = 31;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setRotate      = 32;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleX   = 33;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleY   = 34;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParRotate   = 35;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreAttr    = 36;

Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setMove        = 41;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove     = 42;
Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreMove    = 43;

//==============================
// * A主体 - 切换混合模式（开放函数）
//
//			参数：	> blendMode 数字
//			返回：	> 无
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_setBlendMode = function( blendMode ){
	this._drill_blendMode = blendMode;
};
//==============================
// * A主体 - 切换层级（开放函数）
//
//			参数：	> layerIndex 字符串
//			返回：	> 无
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_setLayerIndex = function( layerIndex ){
	this._drill_layerIndex = layerIndex;
};
//==============================
// * A主体 - 切换堆叠级（开放函数）
//
//			参数：	> zIndex 数字
//			返回：	> 无
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_setZIndex = function( zIndex ){
	this._drill_zIndex = zIndex;
};
//==============================
// * A主体 - 还原混合模式（开放函数）
//
//			参数：	> 无
//			返回：	> 无
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_restoreBlendMode = function(){
	var data = this.drill_data();
	this._drill_blendMode = data['blendMode'];
};
//==============================
// * A主体 - 还原层级（开放函数）
//
//			参数：	> 无
//			返回：	> 无
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_restoreLayerIndex = function(){
	var data = this.drill_data();
	this._drill_layerIndex = data['layerIndex'];
};
//==============================
// * A主体 - 还原堆叠级（开放函数）
//
//			参数：	> 无
//			返回：	> 无
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_restoreZIndex = function(){
	var data = this.drill_data();
	this._drill_zIndex = data['zIndex'];
};

//##############################
// * 基础粒子控制器 - 获取数据指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			标签：	> 『控制器与贴图的样式-静态数据』（核心参考）
//					> 『控制器与贴图的样式-临时配置』（核心参考）
//			说明：	> 由于数据量巨大，所以通过函数来读取数据。
//					  函数可以直接返回 静态数据 的指针，也可以返回 『临时配置』 的指针。
//					> 该函数直接获取指针，可以放在帧刷新中使用。
//					> 子插件【必须覆写】此函数。
//##############################
DrillUp.g_COPa_checkData = true;
Drill_COPa_BasicPar_Controller.prototype.drill_data = function(){
	if( DrillUp.g_COPa_checkData == true ){
		DrillUp.g_COPa_checkData = false;
		alert( DrillUp.drill_COPa_getPluginTip_controllerData_CanNotGet() );
	}
	return {};
};
//##############################
// * 基础粒子控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> data 对象
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_COPa_BasicPar_Controller.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 @注释定义 的参数）
	
	// > A主体 - 基础特性
	if( data['src_img'] == undefined ){ data['src_img'] = "" };											//A主体 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/System/" };					//A主体 - 资源文件夹
	
	if( data['tint'] == undefined ){ data['tint'] = 0 };												//A主体 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };										//A主体 - 图像-模糊边缘
	
	if( data['visible'] == undefined ){ data['visible'] = true };										//A主体 - 显示/隐藏
	if( data['pause'] == undefined ){ data['pause'] = false };											//A主体 - 暂停/继续
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };										//A主体 - 混合模式
	//if( data['layerIndex'] == undefined ){ data['layerIndex'] = "" };									//A主体 - 层级
	//if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };											//A主体 - 图片层级
	
	// > B变换特性
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };										//B变换特性 - 整体透明度
	if( data['parentRotate'] == undefined ){ data['parentRotate'] = 0 };								//B变换特性 - 整体旋转（单位角度）
	if( data['par_x'] == undefined ){ data['par_x'] = 0 };												//B变换特性 - 粒子平移X
	if( data['par_y'] == undefined ){ data['par_y'] = 0 };												//B变换特性 - 粒子平移Y
	if( data['par_scale_x'] == undefined ){ data['par_scale_x'] = 1.0 };								//B变换特性 - 粒子缩放X
	if( data['par_scale_y'] == undefined ){ data['par_scale_y'] = 1.0 };								//B变换特性 - 粒子缩放Y
	if( data['par_rotate'] == undefined ){ data['par_rotate'] = 0 };									//B变换特性 - 粒子旋转（单位角度）
	
	// > C校验值（无）
	
	// > D指令叠加变化（无）
	
	// > E延迟指令（无）
	
	// > F周期指令（无）
	
	
	// > H粒子群弹道
	if( data['par_count'] == undefined ){ data['par_count'] = 15 };										//H粒子群弹道 - 粒子数量
	if( data['par_life'] == undefined ){ data['par_life'] = 30 };										//H粒子群弹道 - 粒子生命周期
	if( data['par_backrun'] == undefined ){ data['par_backrun'] = false };								//H粒子群弹道 - 粒子弹道是否倒放（贴图用）
	
	if( data['par_dirMode'] == undefined ){ data['par_dirMode'] = "四周扩散(随机)" };					//H粒子群弹道 - 粒子方向模式
	if( data['par_dirFix'] == undefined ){ data['par_dirFix'] = 90.0 };									//H粒子群弹道 - 粒子固定方向
	if( data['par_dirSectorFace'] == undefined ){ data['par_dirSectorFace'] = 45.0 };					//H粒子群弹道 - 粒子扇形朝向
	if( data['par_dirSectorDegree'] == undefined ){ data['par_dirSectorDegree'] = 30.0 };				//H粒子群弹道 - 粒子扇形角度
	if( data['par_speedMode'] == undefined ){ data['par_speedMode'] = "只初速度" };						//H粒子群弹道 - 粒子速度模式
	if( data['par_speedBase'] == undefined ){ data['par_speedBase'] = 0.5 };							//H粒子群弹道 - 粒子初速度
	if( data['par_speedRandom'] == undefined ){ data['par_speedRandom'] = 2.0 };						//H粒子群弹道 - 粒子速度随机波动量
	
	if( data['par_opacityMode'] == undefined ){ data['par_opacityMode'] = "先显现后消失" };				//H粒子群弹道 - 粒子透明度模式
	
	// > I随机因子
	if( data['seed_enable'] == undefined ){ data['seed_enable'] = false };								//I随机因子 - 是否固定随机种子
	if( data['seed_value'] == undefined ){ data['seed_value'] = 0.20221002 };							//I随机因子 - 固定随机种子
	
	// > J粒子变化
	//if( data['par_holdingBirthPosition'] == undefined ){ data['par_holdingBirthPosition'] = false };	//J粒子变化 - 粒子是否滞留
	
	// > K粒子重设
	if( data['par_scaleMode'] == undefined ){ data['par_scaleMode'] = "固定缩放值" };					//K粒子重设 - 粒子缩放模式
	if( data['par_scaleBase'] == undefined ){ data['par_scaleBase'] = 1.0 };								//K粒子重设 - 粒子缩放值
	if( data['par_scaleRandom'] == undefined ){ data['par_scaleRandom'] = 0.2 };						//K粒子重设 - 粒子缩放随机波动量
	
	if( data['par_selfRotateMode'] == undefined ){ data['par_selfRotateMode'] = "固定角度" };			//K粒子重设 - 粒子自旋转速度
	if( data['par_selfRotateFix'] == undefined ){ data['par_selfRotateFix'] = 0.0 };					//K粒子重设 - 粒子自旋转速度
	if( data['par_selfRotateSpeed'] == undefined ){ data['par_selfRotateSpeed'] = 0.0 };				//K粒子重设 - 粒子自旋转速度
	
	// > L粒子生命周期
	if( data['par_lifeType'] == undefined ){ data['par_lifeType'] = "跳过产生过程" };					//L粒子生命周期 - 生命类型
	
	
	// > O贴图加载（无）
	
	// > P直线拖尾贴图
	if( data['trailing_enable'] == undefined ){ data['trailing_enable'] = false };						//P直线拖尾贴图 - 是否开启双层效果
	if( data['trailing_centerAnchor'] == undefined ){ data['trailing_centerAnchor'] = false };			//P直线拖尾贴图 - 是否固定拖尾在粒子中心
	if( data['trailing_src_img'] == undefined ){ data['trailing_src_img'] = "" };						//P直线拖尾贴图 - 资源直线拖尾贴图
	if( data['trailing_src_img_file'] == undefined ){ data['trailing_src_img_file'] = "img/System/" };	//P直线拖尾贴图 - 资源文件夹
	
	// > Q双层效果
	if( data['second_enable'] == undefined ){ data['second_enable'] = false };							//Q双层效果 - 是否开启双层效果
	if( data['second_src_img'] == undefined ){ data['second_src_img'] = "" };							//Q双层效果 - 第二层粒子资源
	//if( data['second_layerIndex'] == undefined ){ data['second_layerIndex'] = "" };					//Q双层效果 - 第二层粒子层级（贴图用）
	//if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 0 };							//Q双层效果 - 第二层粒子图片层级（贴图用）
	
};
//==============================
// * 基础粒子控制器 - 初始化子功能『控制器与贴图』
//			
//			说明：	> 创建该类后直接初始化。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();				//初始化子功能 - A主体
	this.drill_controller_initChange();				//初始化子功能 - B变换特性
	this.drill_controller_initCheck();				//初始化子功能 - C校验值
	this.drill_controller_initCommandChange();		//初始化子功能 - D指令叠加变化
	this.drill_controller_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_controller_initPeriodizeCommand();	//初始化子功能 - F周期指令
	
	this.drill_controller_initRandom();				//初始化子功能 - I随机因子
	this.drill_controller_initTransform();			//初始化子功能 - J粒子变化
	this.drill_controller_initReset();				//初始化子功能 - K粒子重设
	this.drill_controller_initLife();				//初始化子功能 - L粒子生命周期
	this.drill_controller_initBallistics();			//初始化子功能 - H粒子群弹道（放最后，因为需要使用 K粒子重设 的 迭代次数 参数）
	
	this.drill_controller_initBitmapAttr();			//初始化子功能 - O贴图加载
	this.drill_controller_initTrailing();			//初始化子功能 - P直线拖尾贴图
	this.drill_controller_initSecond();				//初始化子功能 - Q双层效果
};
//==============================
// * 基础粒子控制器 - 重设数据（私有）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetData_Private = function( data_id ){
	
	// > 参数检查
	if( typeof data_id != "number" ){
		alert( DrillUp.drill_COPa_getPluginTip_controllerData_NotId("Drill_COPa_BasicPar_Controller") );
		throw Error( DrillUp.drill_COPa_getPluginTip_controllerData_NotId("Drill_COPa_BasicPar_Controller") );
		return;
	}
	
	// > 执行重置
	this._drill_data_id = data_id;											//样式ID（控制器与样式 多对一 或 一对一）
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『随机因子-生成一个不重复的序列号』
	//this.drill_controller_initData();										//初始化数据
	this.drill_controller_initChild();										//初始化子功能
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initAttr = function() {
	var data = this.drill_data();
	
	// > A主体 - 基础特性
	this._drill_visible = data['visible'];			//控制器 - 显示/隐藏
	this._drill_pause = data['pause'];				//控制器 - 暂停/继续
	this._drill_blendMode = data['blendMode'];		//控制器 - 混合模式
	this._drill_layerIndex = data['layerIndex'];	//控制器 - 层级
	this._drill_zIndex = data['zIndex'];			//控制器 - 堆叠级
	
	// > 常规
	this._drill_curTime = 0;											//常规 - 当前时间
	this._drill_needDestroy = false;									//常规 - 销毁
	this._drill_curPluginTipName = DrillUp.g_COPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
};
//==============================
// * A主体 - 帧刷新
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateAttr = function() {
	
	// > 时间流逝
	this._drill_curTime += 1;
};
//==============================
// * A主体 - 是否 显示/隐藏（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_isVisible = function(){
	return this._drill_visible;
};
//==============================
// * A主体 - 是否 暂停/继续（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_isPause = function(){
	return this._drill_pause;
};

//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initChange = function(){
	var data = this.drill_data();
	/*
		注意 "par_" 前缀。
	*/
	
	// > 变换值 - 整体锚点
	//	（无）
	
	// > 变换值 - 整体平移
	this._drill_change_x = 0;	//（一般用不到，镜头情况下会用到）
	this._drill_change_y = 0;
	
	// > 变换值 - 整体缩放
	//this._drill_change_scaleX （不考虑）
	//this._drill_change_scaleY （不考虑）
	
	// > 变换值 - 整体透明度
	this._drill_change_opacity = data['opacity'];
	
	// > 变换值 - 整体斜切
	//	（无）
	
	// > 变换值 - 整体旋转
	this._drill_change_rotate = data['parentRotate'];
	
	
	// > 变换值 - 粒子锚点
	//	（无）
	
	// > 变换值 - 粒子平移
	this._drill_change_par_x = data['par_x'];
	this._drill_change_par_y = data['par_y'];
	
	// > 变换值 - 粒子缩放
	this._drill_change_par_scaleX = data['par_scale_x'];
	this._drill_change_par_scaleY = data['par_scale_y'];
	
	// > 变换值 - 粒子透明度
	//this._drill_change_par_opacity （见 data['par_opacityMode'] ）
	
	// > 变换值 - 粒子斜切
	//	（无）
	
	// > 变换值 - 粒子旋转
	this._drill_change_par_rotate = data['par_rotate'];
};
//##############################
// * B变换特性 - 数据最终变换值 - 整体平移X【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_x = function(){
	return this._drill_change_x;
};
//##############################
// * B变换特性 - 数据最终变换值 - 整体平移Y【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_y = function(){
	return this._drill_change_y;
};
//##############################
// * B变换特性 - 数据最终变换值 - 整体透明度【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_opacity = function(){
	return this._drill_change_opacity;
};
//##############################
// * B变换特性 - 数据最终变换值 - 整体旋转【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_rotate = function(){
	return this._drill_change_rotate;
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子平移X【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_x = function(){
	return this._drill_change_par_x;
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子平移Y【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_y = function(){
	return this._drill_change_par_y;
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子缩放X【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_scaleX = function(){
	return this._drill_change_par_scaleX;
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子缩放Y【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_scaleY = function(){
	return this._drill_change_par_scaleY;
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子旋转【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_rotate = function(){
	return this._drill_change_par_rotate;
};

//==============================
// * C校验值 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initCheck = function(){
	//（无）
};
//==============================
// * C校验值 - 校验标记
//==============================
DrillUp.g_COPa_checkNaN = true;
//==============================
// * C校验值 - 帧刷新
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_COPa_checkNaN == true ){
		if( isNaN( this.drill_controller_finalTransform_opacity() ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_opacity" ) );
		}
		if( isNaN( this.drill_controller_finalTransform_rotate() ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_rotate" ) );
		}
		if( isNaN( this.drill_controller_finalTransform_par_x() ) ){
			DrillUp.g_COPa_checkNaN = false;
			var check_tank = {};
			check_tank["_drill_change_par_x"] = this._drill_change_par_x;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_par_x", check_tank ) );
			//throw new Error("请检查粒子数据：" + JSON.stringify(this.drill_data()) );
		}
		if( isNaN( this.drill_controller_finalTransform_par_y() ) ){
			DrillUp.g_COPa_checkNaN = false;
			var check_tank = {};
			check_tank["_drill_change_par_y"] = this._drill_change_par_y;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_par_y", check_tank ) );
		}
		if( isNaN( this.drill_controller_finalTransform_par_rotate() ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_par_rotate" ) );
		}
	}
};

//==============================
// * D指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initCommandChange = function(){
	
	// > 控制器参数 - 整体移动到
	this["_drill_command_move_data"] = undefined;
	
	// > 控制器参数 - 整体透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 整体旋转
	this["_drill_command_rotate_data"] = undefined;
	
	// > 控制器参数 - 粒子移动到
	this["_drill_command_par_move_data"] = undefined;
	
	// > 控制器参数 - 粒子缩放X
	this["_drill_command_par_scaleX_data"] = undefined;
	
	// > 控制器参数 - 粒子缩放Y
	this["_drill_command_par_scaleY_data"] = undefined;
	
	// > 控制器参数 - 粒子旋转
	this["_drill_command_par_rotate_data"] = undefined;
};
//==============================
// * D指令叠加变化 - 帧刷新
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateCommandChange = function(){
	
	// > 帧刷新 - 整体移动到（二维弹道）
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_update( this, "_drill_command_move_data" );
	
	// > 帧刷新 - 整体透明度
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_opacity_data" );
	
	// > 帧刷新 - 整体旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_rotate_data" );
	
	// > 帧刷新 - 粒子移动到（二维弹道）
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_update( this, "_drill_command_par_move_data" );
	
	// > 帧刷新 - 粒子缩放X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_par_scaleX_data" );
	
	// > 帧刷新 - 粒子缩放Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_par_scaleY_data" );
	
	// > 帧刷新 - 粒子旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_par_rotate_data" );
};
//==============================
// * D指令叠加变化 - 立即还原所有单属性
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
	// > 控制器参数 - 整体移动到
	//	（这里不含）
	
	// > 控制器参数 - 整体透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 整体旋转
	this["_drill_command_rotate_data"] = undefined;
	
	// > 控制器参数 - 粒子移动到
	//	（这里不含）
	
	// > 控制器参数 - 粒子缩放X
	this["_drill_command_par_scaleX_data"] = undefined;
	
	// > 控制器参数 - 粒子缩放Y
	this["_drill_command_par_scaleY_data"] = undefined;
	
	// > 控制器参数 - 粒子旋转
	this["_drill_command_par_rotate_data"] = undefined;
};
//==============================
// * D指令叠加变化 - 立即归位
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = undefined;
	this["_drill_command_par_move_data"] = undefined;
};
//==============================
// * D指令叠加变化 - 修改单属性 - 整体移动到
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", 0, 0,		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
};
//==============================
// * D指令叠加变化 - 修改单属性 - 整体透明度
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
};
//==============================
// * D指令叠加变化 - 修改单属性 - 整体旋转
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", data['parentRotate'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
};
//==============================
// * D指令叠加变化 - 修改单属性 - 粒子移动到
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_commandChange_setParMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_par_move_data", data['par_x'], data['par_y'],		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
};
//==============================
// * D指令叠加变化 - 修改单属性 - 粒子缩放X
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_commandChange_setParScaleX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_par_scaleX_data", data['par_scale_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
};
//==============================
// * D指令叠加变化 - 修改单属性 - 粒子缩放Y
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_commandChange_setParScaleY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_par_scaleY_data", data['par_scale_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
};
//==============================
// * D指令叠加变化 - 修改单属性 - 粒子旋转
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_commandChange_setParRotate = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_par_rotate_data", data['par_rotate'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
};

//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
};
//==============================
// * E延迟指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateDelayingCommandImportant = function(){
	if( this._drill_curDelayingCommandTank.length == 0 ){ return; }
	
	// > 帧刷新 时间流逝
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		
		// > 时间-1
		dc_data['left_time'] -= 1;
		
	}
	
	// > 执行延迟指令（暂停/继续）
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			var method = dc_data['method'];
			var paramList = dc_data['paramList'];
			
			if( method == Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setPause ){
				this.drill_controller_setPause( paramList[0] );
			}else if( method == Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_setPause ){  //暂停周期指令(延迟)
				this.drill_controller_periodizeCommand_setPause( paramList[0] );
			}else if( method == Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_clear ){  //清空周期指令(延迟)
				this.drill_controller_periodizeCommand_clear();
			}
		}
	}
};
//==============================
// * E延迟指令 - 帧刷新 - 执行延迟指令
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateDelayingCommand = function(){
	if( this._drill_curDelayingCommandTank.length == 0 ){ return; }
	
	// > 执行延迟指令
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			var method = dc_data['method'];
			var paramList = dc_data['paramList'];
			
			switch( method ){
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setVisible:
					this.drill_controller_setVisible( paramList[0] );
					break;
				
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setBlendMode:
					this.drill_controller_setBlendMode( paramList[0] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setLayerIndex:
					this.drill_controller_setLayerIndex( paramList[0] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setZIndex:
					this.drill_controller_setZIndex( paramList[0] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreBlendMode:
					this.drill_controller_restoreBlendMode();
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreLayerIndex:
					this.drill_controller_restoreLayerIndex();
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreZIndex:
					this.drill_controller_restoreZIndex();
					break;
				
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setOpacity:
					this.drill_controller_commandChange_setOpacity( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setRotate:
					this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleX:
					this.drill_controller_commandChange_setParScaleX( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleY:
					this.drill_controller_commandChange_setParScaleY( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParRotate:
					this.drill_controller_commandChange_setParRotate( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreAttr:
					this.drill_controller_commandChange_restoreAttr();
					break;
				
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setMove:
					this.drill_controller_commandChange_setMove( paramList[0], paramList[1], paramList[2], paramList[3] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove:
					this.drill_controller_commandChange_setParMove( paramList[0], paramList[1], paramList[2], paramList[3] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreMove:
					this.drill_controller_commandChange_restoreMove();
					break;
				
				default:
					break;
			}
		}
	}
	
	// > 销毁延迟指令
	for(var i = this._drill_curDelayingCommandTank.length-1; i >= 0; i-- ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			this._drill_curDelayingCommandTank.splice( i, 1 );
		}
	}
};
//==============================
// * E延迟指令 - 设置指令（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_setDelayingCommand = function( method, paramList, delay_time ){
	var enable = false;
	switch( method ){
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setVisible:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setPause:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_setPause:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_clear:
		
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setBlendMode:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setLayerIndex:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setZIndex:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreBlendMode:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreLayerIndex:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreZIndex:
		
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setOpacity:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setRotate:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleX:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleY:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParRotate:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreAttr:
		
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setMove:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreMove:
			enable = true;
			break;
		
		default:
			break;
	}
	if( enable == false ){ return; }
	
	var dc_data = {};
	dc_data['method'] = method;
	dc_data['paramList'] = paramList;
	dc_data['left_time'] = delay_time;
	this._drill_curDelayingCommandTank.push( dc_data );
};
//==============================
// * E延迟指令 - 增加延迟（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_addDelayingTime = function( time ){
	if( isNaN(time) ){ return; }
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		dc_data['left_time'] += Number( time );
	}
};
//==============================
// * E延迟指令 - 清空全部（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_clearDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
};


//==============================
// * F周期指令 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initPeriodizeCommand = function(){
	this._drill_curPeriodizeCommandTank = [];
	this._drill_periodizeCommand_pause = undefined;				//暂停周期指令
	this._drill_periodizeCommand_waitAndPauseTime = undefined;	//一次性计时器（暂停周期指令-周期末尾时）
	this._drill_periodizeCommand_waitAndClearTime = undefined;	//一次性计时器（清空周期指令-周期末尾时）
};
//==============================
// * F周期指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updatePeriodizeCommandImportant = function(){
	if( this._drill_curPeriodizeCommandTank.length == 0 ){ return; }
	
	// > 暂停周期指令
	if( this._drill_periodizeCommand_pause == true ){ return; }
	
	// > 周期剩余时间
	if( this._drill_periodizeCommand_waitAndPauseTime !== undefined ){
		this._drill_periodizeCommand_waitAndPauseTime -= 1;
		if( this._drill_periodizeCommand_waitAndPauseTime == 0 ){
			this.drill_controller_periodizeCommand_setPause(true);  //（暂停周期指令-周期末尾时）
		}
	}
	if( this._drill_periodizeCommand_waitAndClearTime !== undefined ){
		this._drill_periodizeCommand_waitAndClearTime -= 1;
		if( this._drill_periodizeCommand_waitAndClearTime == 0 ){
			this.drill_controller_periodizeCommand_clear();  //（清空周期指令-周期末尾时）
		}
	}
	
	
	// > 帧刷新 时间流逝
	for(var i = 0; i < this._drill_curPeriodizeCommandTank.length; i++ ){
		var pc_data = this._drill_curPeriodizeCommandTank[i];
		
		// > 时间-1
		pc_data['cur_time'] += 1;
	}
	
	// > 执行周期指令（暂停/继续）
	for(var i = 0; i < this._drill_curPeriodizeCommandTank.length; i++ ){
		var pc_data = this._drill_curPeriodizeCommandTank[i];
		var time =  pc_data['cur_time'] % pc_data['time_period'];
		if( time == pc_data['time_start'] ){
			var method = pc_data['method'];
			var paramList = pc_data['paramList'];
			
			if( method == Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setPause ){
				this.drill_controller_setPause( paramList[0] );
			}
		}
	}
};
//==============================
// * F周期指令 - 帧刷新 - 执行周期指令
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updatePeriodizeCommand = function(){
	if( this._drill_curPeriodizeCommandTank.length == 0 ){ return; }
	
	// > 执行周期指令
	for(var i = 0; i < this._drill_curPeriodizeCommandTank.length; i++ ){
		var pc_data = this._drill_curPeriodizeCommandTank[i];
		var time =  pc_data['cur_time'] % pc_data['time_period'];
		if( time == pc_data['time_start'] ){
			var method = pc_data['method'];
			var paramList = pc_data['paramList'];
			
			switch( method ){
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setVisible:
					this.drill_controller_setVisible( paramList[0] );
					break;
				
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setBlendMode:
					this.drill_controller_setBlendMode( paramList[0] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setLayerIndex:
					this.drill_controller_setLayerIndex( paramList[0] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setZIndex:
					this.drill_controller_setZIndex( paramList[0] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreBlendMode:
					this.drill_controller_restoreBlendMode();
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreLayerIndex:
					this.drill_controller_restoreLayerIndex();
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreZIndex:
					this.drill_controller_restoreZIndex();
					break;
				
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setOpacity:
					this.drill_controller_commandChange_setOpacity( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setRotate:
					this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleX:
					this.drill_controller_commandChange_setParScaleX( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleY:
					this.drill_controller_commandChange_setParScaleY( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParRotate:
					this.drill_controller_commandChange_setParRotate( paramList[0], paramList[1], paramList[2] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreAttr:
					this.drill_controller_commandChange_restoreAttr();
					break;
				
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setMove:
					this.drill_controller_commandChange_setMove( paramList[0], paramList[1], paramList[2], paramList[3] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove:
					this.drill_controller_commandChange_setParMove( paramList[0], paramList[1], paramList[2], paramList[3] );
					break;
				case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreMove:
					this.drill_controller_commandChange_restoreMove();
					break;
				
				default:
					break;
			}
		}
	}
};
//==============================
// * F周期指令 - 设置指令（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_setPeriodizeCommand = function( method, paramList, time_period, time_start ){
	var enable = false;
	switch( method ){
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setVisible:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setPause:
		
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setBlendMode:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setLayerIndex:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setZIndex:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreBlendMode:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreLayerIndex:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreZIndex:
		
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setOpacity:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setRotate:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleX:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleY:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParRotate:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreAttr:
		
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setMove:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove:
		case Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreMove:
			enable = true;
			break;
		
		default:
			break;
	}
	if( enable == false ){ return; }
	
	var pc_data = {};
	pc_data['method'] = method;
	pc_data['paramList'] = paramList;
	pc_data['time_period'] = time_period;
	pc_data['time_start'] = time_start;
	pc_data['cur_time'] = -1;			//（时间先+1后判断，所以取-1）
	this._drill_curPeriodizeCommandTank.push( pc_data );
};
//==============================
// * F周期指令 - 获取 周期剩余时间（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_periodizeCommand_getWaitAndClearTime = function(){
	if( this._drill_curPeriodizeCommandTank.length == 0 ){ return 0; }
	var pc_data = this._drill_curPeriodizeCommandTank[0];				//（只取第一个周期指令的时间）
	var cur_period_time = pc_data['cur_time'] % pc_data['time_period'];	//（周期内的当前时间）
	return pc_data['time_period'] - cur_period_time;					//（周期内的剩余时间）
};
//==============================
// * F周期指令 - 暂停周期指令-立刻（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_periodizeCommand_setPause = function( enabled ){
	this._drill_periodizeCommand_pause = enabled;				//（暂停周期指令）
	this.drill_controller_setPause( enabled );					//（暂停变换）
	this._drill_periodizeCommand_waitAndPauseTime = undefined;	//（删除 一次性计时器）
};
//==============================
// * F周期指令 - 暂停周期指令-周期末尾时（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_periodizeCommand_waitAndPause = function(){
	this._drill_periodizeCommand_waitAndPauseTime = this.drill_controller_periodizeCommand_getWaitAndClearTime();
};
//==============================
// * F周期指令 - 清空周期指令-立刻（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_periodizeCommand_clear = function(){
	this._drill_curPeriodizeCommandTank = [];
	this._drill_periodizeCommand_waitAndClearTime = undefined;	//（删除 一次性计时器）
};
//==============================
// * F周期指令 - 清空周期指令-周期末尾时（开放函数）
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_periodizeCommand_waitAndClear = function(){
	this._drill_periodizeCommand_waitAndClearTime = this.drill_controller_periodizeCommand_getWaitAndClearTime();
};


//==============================
// * H粒子群弹道 - 初始化子功能
//
//			说明：	> 只存 弹道配置，不存 实际弹道。
//					  配置包括随机因子、随机迭代次数。
//					> 实际弹道只在【贴图】中进行推演并使用。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initBallistics = function() {
	var data = this.drill_data();
	
	// > 移动弹道 - 参数准备
	this._drill_ballistics_move = {};
	
	// > 移动弹道 - 随机因子
	this._drill_randomFactor_speed = Math.random();		//『随机因子-图像用』
	this._drill_randomFactor_dir = Math.random();		//『随机因子-图像用』
	if( data['seed_enable'] == true ){
		this._drill_randomFactor_speed = data['seed_value'] %1;
		this._drill_randomFactor_dir = data['seed_value'] *41 %1;
	}
	
	// > 移动弹道 - 初始化子功能
    this.drill_controller_initBallisticsMove( data, data, data['par_life'] );
	
	
	// > 透明度弹道 - 参数准备
	this._drill_ballistics_opacity = {};
	
	// > 透明度弹道 - 随机因子
	//	（不需要）
	
	// > 透明度弹道 - 初始化子功能
    this.drill_controller_initBallisticsOpacity( data, data['par_life'] );
};
//==============================
// * H粒子群弹道 - 初始化子功能 - 移动弹道
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initBallisticsMove = function( data, b_data, sustain ){
	var temp_b_move = {}
	
	// > 移动基础参数（movement）
	temp_b_move['movementNum'] = data['par_count'];								//数量
	temp_b_move['movementTime'] = sustain;										//时长
	temp_b_move['movementDelay'] = 0;											//延迟
	temp_b_move['movementEndDelay'] = 0;										//延迟
	temp_b_move['movementOrderDelay'] = 0;										//依次延迟时间
	temp_b_move['movementMode'] = "极坐标模式";									//移动模式
	
	// > 极坐标（polar）
	temp_b_move['polarSpeedType'] = b_data["par_speedMode"];					//极坐标 - 速度 - 类型
	temp_b_move['polarSpeedBase'] = b_data["par_speedBase"];					//极坐标 - 速度 - 初速度
	temp_b_move['polarSpeedRandom'] = b_data["par_speedRandom"];				//极坐标 - 速度 - 速度随机波动量
	temp_b_move['polarSpeedInc'] = null;										//极坐标 - 速度 - 加速度  （目前不考虑太复杂的弹道）
	temp_b_move['polarSpeedMax'] = null;										//极坐标 - 速度 - 最大速度（目前不考虑太复杂的弹道）
	temp_b_move['polarSpeedMin'] = null;										//极坐标 - 速度 - 最小速度（目前不考虑太复杂的弹道）
	temp_b_move['polarDistanceFormula'] = null;									//极坐标 - 速度 - 路程计算公式
	temp_b_move['polarDirType'] = b_data["par_dirMode"];						//极坐标 - 方向 - 类型
	temp_b_move['polarDirFixed'] = b_data["par_dirFix"];						//极坐标 - 方向 - 固定方向
	temp_b_move['polarDirSectorFace'] = b_data["par_dirSectorFace"];			//极坐标 - 方向 - 扇形朝向
	temp_b_move['polarDirSectorDegree'] = b_data["par_dirSectorDegree"];		//极坐标 - 方向 - 扇形角度
	temp_b_move['polarDirRate'] = null;											//极坐标 - 方向 - 方向角速率（目前不考虑太复杂的弹道）
	temp_b_move['polarDirFormula'] = null;										//极坐标 - 方向 - 方向计算公式
	
	// > 随机因子列表（randomFactorList）
	//		（每个粒子对应一个随机因子，掌握一条弹道。）
	//		（注意，独立参数项之间，随机因子不可共用。会造成强关联的错误关系，所以需要迭代。）
	temp_b_move['polarSpeedRandomFactorList'] = [];
	temp_b_move['polarDirRandomFactorList'] = [];
	for( var i = 0; i < this._drill_parList_randomIteration.length; i++ ){
		var cur_iteration = this._drill_parList_randomIteration[i];
		cur_iteration = cur_iteration*i +41*i +2000;
		var ran_speed = this.drill_controller_Math1D_getRandomInIteration( this._drill_randomFactor_speed, cur_iteration );
		var ran_dir = this.drill_controller_Math1D_getRandomInIteration( this._drill_randomFactor_dir, cur_iteration );
		temp_b_move['polarSpeedRandomFactorList'][i] = ran_speed;
		temp_b_move['polarDirRandomFactorList'][i] = ran_dir;
	}
	
	// > 控制器存储弹道配置
	this._drill_ballistics_move = $gameTemp.drill_COBa_setBallisticsMove( temp_b_move );
};
//==============================
// * H粒子群弹道 - 初始化子功能 - 透明度弹道
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initBallisticsOpacity = function( data, sustain ){
	var temp_b_opacity = {};
	
	//		（所有粒子使用的是同一套 透明度 变化数组）
	//		（固定为 0-255 之间的变化，不能单独修改粒子的透明度，要改就去改整体透明度）
	//		（透明度模式对应固定的轨道锚点，所以完全用不到 randomValue随机数 ）
	
	// > 透明度基础参数（opacity）
	temp_b_opacity['opacityNum'] = data['par_count'];		//数量
	temp_b_opacity['opacityTime'] = sustain;				//时长
	temp_b_opacity['opacityDelay'] = 0;						//延迟
	temp_b_opacity['opacityEndDelay'] = 0;					//延迟
	temp_b_opacity['opacityOrderDelay'] = 0;				//依次延迟时间
	temp_b_opacity['opacityMode'] = "时间锚点模式";			//变化模式
	
	// > 透明度模式
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
	
	
	// > 控制器存储弹道配置
	this._drill_ballistics_opacity = $gameTemp.drill_COBa_setBallisticsOpacity( temp_b_opacity );
};


//==============================
// * I随机因子 - 初始化子功能
//			
//			标签：	> 『随机因子的迭代管理』
//			说明：	> 只需提供一个随机因子，经过迭代管理，就能使得插件所有相关的随机数受控。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initRandom = function() {
	var data = this.drill_data();
	
	// > 随机因子
	//		（影响：初始随机缩放值、初始随机旋转角度、圆内矩形内随机出现、数字雨的随机初始帧）
	this._drill_randomFactor_parListOfRan = Math.random();	//『随机因子-图像用』
	if( data['seed_enable'] == true ){
		this._drill_randomFactor_parListOfRan = data['seed_value'] *31 %1;
	}
};
//==============================
// * I随机因子 - 当前的随机数（开放函数）
//
//			说明：	> 注意，如果是粒子列表，迭代次数建议分配为：cur_iteration*i + 41*i。
//					> 需要迭代次数，就能获取到一个随机数。
//					> 迭代次数值若相同，则获取到相同的随机数。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_curRandom = function( iteration ){
	return this.drill_controller_Math1D_getRandomInIteration( this._drill_randomFactor_parListOfRan, iteration );
};
//==============================
// * I随机因子 - 数学工具 - 生成随机数-随机种子
//			
//			参数：	> seed 数字	（正整数）
//			返回：	> 数字 		（0~1随机数）
//			
//			标签：	> 『随机因子的迭代工具』
//			说明：	> 如果随机种子为 1至100，那么你将得到线性均匀分布的随机值。不是乱序随机。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_Math1D_getRandomInSeed = function( seed ){
	var new_ran = ( seed * 9301 + 49297 ) % 233280;
	new_ran = new_ran / 233280.0;
	return new_ran;
};
//==============================
// * I随机因子 - 数学工具 - 生成随机数-迭代
//			
//			参数：	> org_ran 数字   （0~1原随机数）
//					> iteration 数字 （正整数，迭代次数）
//			返回：	> 数字           （0~1新随机数）
//			
//			标签：	> 『随机因子的迭代工具』
//			说明：	> 经过迭代后，能够得到乱序的随机数。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_Math1D_getRandomInIteration = function( org_ran, iteration ){
	var prime = DrillUp.drill_COPa_Math1D_primeList[ iteration % DrillUp.drill_COPa_Math1D_primeList.length ];
	var temp_ran = ( (org_ran + iteration) * 9301 + 49297 ) % 233280;
	temp_ran = temp_ran / prime;
	var new_ran = (temp_ran + org_ran * iteration * prime) %1;
	return new_ran;
};
//==============================
// * I随机因子 - 数学工具 - 质数表
//			
//			标签：	> 『随机因子的迭代工具』
//			说明：	> 迭代用的质数表。（1000以内）
//==============================
DrillUp.drill_COPa_Math1D_primeList = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,
	73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,
	191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,
	311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,
	439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,
	577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,
	709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,
	857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];



//==============================
// * J粒子变化 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initTransform = function() {
	//（无）
};
//==============================
// * J粒子变化 - 帧刷新
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateTransform = function(){
	var data = this.drill_data();
	for( var i=0; i < data['par_count']; i++ ){
		
		// > 执行 帧刷新
		this.drill_controller_updateTransform_Position( i );
		this.drill_controller_updateTransform_Opacity( i );
		this.drill_controller_updateTransform_Scale( i );
		this.drill_controller_updateTransform_Rotation( i );
	}
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子平移【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateTransform_Position = function( i ){
	//	（暂无）
	//	（弹道在贴图中叠加）
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子缩放【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateTransform_Scale = function( i ){
	//	（暂无）
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子透明度【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateTransform_Opacity = function( i ){
	//	（暂无）
	//	（弹道在贴图中叠加）
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子旋转【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateTransform_Rotation = function( i ){
	//	（K粒子重设 - 粒子自旋转速度）
	//	（设置后，旋转值可以无限叠加下去）
	var data = this.drill_data();
	this._drill_parList_rotation[i] += data['par_selfRotateSpeed'];
};


//==============================
// * K粒子重设 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initReset = function() {
	var data = this.drill_data();
	
	// > 粒子 脚本用初始值
	this._drill_parList_x = [];						//J粒子变化 - 平移X
	this._drill_parList_y = [];						//J粒子变化 - 平移Y
	this._drill_parList_scaleX = [];				//J粒子变化 - 缩放X
	this._drill_parList_scaleY = [];				//J粒子变化 - 缩放Y
	this._drill_parList_opacity = [];				//J粒子变化 - 透明度
	this._drill_parList_rotation = [];				//J粒子变化 - 旋转
	for( var i=0; i < data['par_count']; i++ ){
		this._drill_parList_x[i] = 0;				//J粒子变化 - 平移X
		this._drill_parList_y[i] = 0;               //J粒子变化 - 平移Y
		this._drill_parList_scaleX[i] = 1.0;        //J粒子变化 - 缩放X
		this._drill_parList_scaleY[i] = 1.0;        //J粒子变化 - 缩放Y
		this._drill_parList_opacity[i] = 0;         //J粒子变化 - 透明度
		this._drill_parList_rotation[i] = 0;        //J粒子变化 - 旋转
	}
	
	// > 粒子 迭代次数
	this._drill_parList_randomIteration = [];		//粒子 - 迭代次数
	for( var i=0; i < data['par_count']; i++ ){
		this._drill_parList_randomIteration[i] = 0;
	}
	
	// > 执行重设（初始化子功能）
	for( var i=0; i < data['par_count']; i++ ){
		this.drill_controller_resetParticles( i );
	}
};
//==============================
// * K粒子重设 - 执行重设
//==============================	
Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetParticles = function( i ){
	
	// > 执行 重设
	this.drill_controller_resetParticles_Position( i );
	this.drill_controller_resetParticles_Opacity( i );
	this.drill_controller_resetParticles_Scale( i );
	this.drill_controller_resetParticles_Rotation( i );
	
	// > 迭代次数+1
	this._drill_parList_randomIteration[i] += 1;
};
//##############################
// * K粒子重设 - 执行重设 - 粒子平移【标准函数】
//
//			说明：	> 起始点功能 在此设置。
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	this._drill_parList_x[i] = 0;
	this._drill_parList_y[i] = 0;
};
//##############################
// * K粒子重设 - 执行重设 - 粒子缩放【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetParticles_Scale = function( i ){
	var data = this.drill_data();
	var cur_iteration = this._drill_parList_randomIteration[i];
	if( data['par_scaleMode'] == "固定缩放值" ){
		this._drill_parList_scaleX[i] = data['par_scaleBase'];
		this._drill_parList_scaleY[i] = data['par_scaleBase'];
	}
	if( data['par_scaleMode'] == "缩放值+波动量" ){
		var ran = this.drill_controller_curRandom( cur_iteration*i +43*i +2000 );
		this._drill_parList_scaleX[i] = data['par_scaleBase'] + (ran - 0.5) * data['par_scaleRandom'];
		this._drill_parList_scaleY[i] = data['par_scaleBase'] + (ran - 0.5) * data['par_scaleRandom'];
	}
};
//##############################
// * K粒子重设 - 执行重设 - 粒子透明度【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetParticles_Opacity = function( i ){
	this._drill_parList_opacity[i] = 0;
};
//##############################
// * K粒子重设 - 执行重设 - 粒子旋转【标准函数】
//##############################
Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetParticles_Rotation = function( i ){
	var data = this.drill_data();
	var cur_iteration = this._drill_parList_randomIteration[i];
	if( data['par_selfRotateMode'] == "随机角度" ){
		this._drill_parList_rotation[i] = Math.floor( 360*this.drill_controller_curRandom( cur_iteration*i +47*i +2000 ) );
	}
	if( data['par_selfRotateMode'] == "固定角度" ){
		this._drill_parList_rotation[i] = data['par_selfRotateFix'];
	}
	if( data['par_selfRotateMode'] == "始终与朝向一致" ){
		this._drill_parList_rotation[i] = 0;
	}
};


//==============================
// * L粒子生命周期 - 初始化子功能
//
//			说明：	> 脚本底层为 "跳过产生过程"，即一开始就显示全部粒子，显示固定弹道，并保持线性的生命周期状态。
//					  同时产生/依次产生 反而是副产品功能，需要手动加约束。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initLife = function(){
	var data = this.drill_data();
	
	// > 粒子 生命周期类型
	this._drill_par_lifeType = 4;	//（默认为 "跳过产生过程"）
	if( data['par_lifeType'] == "同时产生(一次性)"  ){ this._drill_par_lifeType = 1; }
	else if( data['par_lifeType'] == "同时产生"     ){ this._drill_par_lifeType = 2; }
	else if( data['par_lifeType'] == "依次产生"     ){ this._drill_par_lifeType = 3; }
	else if( data['par_lifeType'] == "跳过产生过程" ){ this._drill_par_lifeType = 4; }
	else if( data['par_lifeType'] == "手动产生"     ){ this._drill_par_lifeType = 5; }
	
	// > 粒子 当前时间
	this._drill_parList_curTime = [];
	if( this._drill_par_lifeType == 1 ){	//同时产生(一次性)
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = 0;	
		}
	}
	if( this._drill_par_lifeType == 2 ){	//同时产生
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = 0;	
		}
	}
	if( this._drill_par_lifeType == 3 ){	//依次产生（不能用 负数时间，会影响粒子滞留效果）
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = Math.floor( data['par_life'] *i /data['par_count'] );
		}
	}
	if( this._drill_par_lifeType == 4 ){	//跳过产生过程
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = Math.floor( data['par_life'] *i /data['par_count'] );	
		}
	}
	if( this._drill_par_lifeType == 5 ){	//手动产生（粒子一开始就是死亡的）
		for( var i=0; i < data['par_count']; i++ ){
			this._drill_parList_curTime[i] = data['par_life'];	
		}
	}
	
	// > 延时销毁 标记
	this._drill_isDelayingDestroy = false;
};
//==============================
// * L粒子生命周期 - 帧刷新
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateLife = function(){
	var data = this.drill_data();
	
	// > 粒子 时间流逝
	for( var i=0; i < data['par_count']; i++ ){
		this._drill_parList_curTime[i] += 1;
	}
	
	// > 粒子 生命重置
	if( this._drill_par_lifeType == 2 ||  //同时产生
		this._drill_par_lifeType == 3 ||  //依次产生
		this._drill_par_lifeType == 4 ){  //跳过产生过程
		
		for( var i=0; i < data['par_count']; i++ ){
			if( this.drill_controller_isParticleDead(i) == true ){
				this.drill_controller_rebirth(i);			//（生命重置，不能放入到重设中）
				this.drill_controller_resetParticles(i);	//（执行重设）
			}
		}
	}
	
	// > 粒子 执行销毁
	if( this._drill_par_lifeType == 1 ||			//同时产生(一次性)
		this._drill_isDelayingDestroy == true ){	//延时销毁
		if( this.drill_controller_isParticleAllDead() == true ){
			this.drill_controller_destroy();				//（执行销毁）『装饰延时销毁』
		}
	}
	
	// > 粒子 手动产生
	if( this._drill_par_lifeType == 5 ){
		//（无）
		//（手动产生的情况下，粒子群 需要由子插件控制销毁，并可以对单一粒子进行操作）
	}
};
//==============================
// * L粒子生命周期 - 设置延时销毁（开放函数）『装饰延时销毁』
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数可以阻止粒子重设，等待粒子全部死亡后，控制器才销毁，随后贴图销毁。
//					> 注意，此设置执行后，仍然要保持 控制器的帧刷新，因为控制器没有被销毁。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_destroyWithDelay = function(){
	this._drill_isDelayingDestroy = true;
};
//==============================
// * L粒子生命周期 - 生命重置
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_rebirth = function( i ){
	if( this._drill_par_lifeType == 1 ){ return; }			//同时产生(一次性)
	if( this._drill_isDelayingDestroy == true ){ return; }	//延时销毁
	
	// > 生命置零
	this._drill_parList_curTime[i] = 0;
};
//==============================
// * L粒子生命周期 - 获取当前生命周期
//
//			说明：	> 返回的最小值为0，最大值为 data['par_life']-1 。
//					> 此数值用于 弹道索引用，你不能以此数据去 判断粒子死亡 。
//==============================	
Drill_COPa_BasicPar_Controller.prototype.drill_controller_getParticleLifeTime = function( i ){
	var data = this.drill_data();
	var result_time = this._drill_parList_curTime[i];
	
	// > H粒子群弹道 - 倒放时
	if( data['par_backrun'] == true ){
		result_time = data['par_life'] -result_time;
	}
	
	// > H粒子群弹道 - 范围锁定
	if( result_time < 0 ){ result_time = 0; }
	if( result_time > data['par_life'] ){ result_time = data['par_life']; }	//（弹道长度 = 时长+1）
	
	return result_time;
};
//==============================
// * L粒子生命周期 - 判断粒子死亡
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_isParticleDead = function( i ){
	if( this._drill_parList_curTime[i] >= this.drill_data()['par_life'] ){ return true; }	//（生命周期结束时）
	return false;
};
//==============================
// * L粒子生命周期 - 判断全部粒子死亡
//
//			说明：	> 要满足此条件，必须确保 生命重置 不再执行。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_isParticleAllDead = function(){
	for( var i=0; i < this.drill_data()['par_count']; i++ ){
		if( this.drill_controller_isParticleDead(i) == false ){
			return false;
		}
	}
	return true;
};
//==============================
// * L粒子生命周期 - 获取一个死亡粒子的编号
//			
//			说明：	> 手动产生 用的函数，如果没有剩余的死亡粒子，则为-1。
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_getOneDeadParticleIndex = function(){
	for( var i=0; i < this.drill_data()['par_count']; i++ ){
		if( this.drill_controller_isParticleDead(i) == true ){
			return i;
		}
	}
	return -1;
};


//==============================
// * O贴图加载 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initBitmapAttr = function() {
	
	// > 数据 - 粒子贴图
	this._drill_bitmapPar_width  = 101;
	this._drill_bitmapPar_height = 101;
	
	// > 数据 - P直线拖尾贴图
	this._drill_bitmapTrailing_width  = 101;
	this._drill_bitmapTrailing_height = 101;
	
	// > 数据 - Q双层效果
	this._drill_bitmapSec_width  = 101;
	this._drill_bitmapSec_height = 101;
};
//==============================
// * O贴图加载 - 获取边界
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_getBitmapMargin = function() {
	
	// > 获取边界 - 粒子贴图
	var ww = this._drill_bitmapPar_width;
	var hh = this._drill_bitmapPar_height;
	
	// > 获取边界 - P直线拖尾贴图
	if( this.drill_data()['trailing_enable'] == true ){
		ww += this._drill_bitmapTrailing_width;
		ww += this._drill_bitmapTrailing_height;
		hh += this._drill_bitmapTrailing_width;
		hh += this._drill_bitmapTrailing_height;
	}
	
	return { 'ww':ww, 'hh':hh };
};
//==============================
// * O贴图加载 - 获取边界 - 宽度
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_getBitmapMargin_Width = function() {
	
	// > 获取边界 - 粒子贴图
	var ww = this._drill_bitmapPar_width;
	
	// > 获取边界 - P直线拖尾贴图
	if( this.drill_data()['trailing_enable'] == true ){
		ww += this._drill_bitmapTrailing_width;
		ww += this._drill_bitmapTrailing_height;
	}
	
	return ww;
};
//==============================
// * O贴图加载 - 获取边界 - 高度
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_getBitmapMargin_Height = function() {
	
	// > 获取边界 - 粒子贴图
	var hh = this._drill_bitmapPar_height;
	
	// > 获取边界 - P直线拖尾贴图
	if( this.drill_data()['trailing_enable'] == true ){
		hh += this._drill_bitmapTrailing_width;
		hh += this._drill_bitmapTrailing_height;
	}
	
	return hh;
};


//==============================
// * P直线拖尾贴图 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initTrailing = function() {
	// （无）
};


//==============================
// * Q双层效果 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Controller.prototype.drill_controller_initSecond = function() {
	// （无）
};



//=============================================================================
// ** 基础粒子贴图【Drill_COPa_BasicPar_Sprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个粒子贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->贴图是否销毁
// **						->贴图执行销毁
// **					
// **					->A贴图主体
// **					->B变换特性
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **					->D指令叠加变化-控制器用『弹道-图像用』
// **					->E延迟指令
// **					->F周期指令
// **					
// **					->H粒子群弹道
// **						->移动弹道
// **						->透明度弹道
// **					->I随机因子
// **					->J粒子变化
// **						->倒放
// **						> 粒子平移
// **						> 粒子缩放
// **						> 粒子透明度
// **						> 粒子旋转
// **					->K粒子重设
// **					->L粒子生命周期
// **					
// **					->O贴图加载-控制器用
// **					->P直线拖尾贴图
// **					->Q双层效果
// **					
// **		说明：	> 核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"。
// **				> 你必须在创建贴图后，手动 设置控制器，手动 初始化子功能。
//=============================================================================
//==============================
// * 基础粒子贴图 - 定义
//==============================
function Drill_COPa_BasicPar_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_COPa_BasicPar_Sprite.prototype = Object.create(Sprite.prototype);
Drill_COPa_BasicPar_Sprite.prototype.constructor = Drill_COPa_BasicPar_Sprite;
//==============================
// * 基础粒子贴图 - 初始化
//==============================
Drill_COPa_BasicPar_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 基础粒子贴图 - 帧刷新
//==============================
Drill_COPa_BasicPar_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A贴图主体
	this.drill_sprite_updateChange();				//帧刷新 - B变换特性
													//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateCommandChange();		//帧刷新 - D指令叠加变化-控制器用
													//帧刷新 - E延迟指令（无）
													//帧刷新 - F周期指令（无）
													
													//帧刷新 - H粒子群弹道（无）
													//帧刷新 - I随机因子（无）
	this.drill_sprite_updateTransform();			//帧刷新 - J粒子变化
	this.drill_sprite_updateCheckNaN();				//帧刷新 - J粒子变化 - 校验值
	this.drill_sprite_updateReset();				//帧刷新 - K粒子重设
													//帧刷新 - L粒子生命周期（无）
													
	this.drill_sprite_updateBitmapAttr();			//帧刷新 - O贴图加载-控制器用
	this.drill_sprite_updateTrailing();				//帧刷新 - P直线拖尾贴图
													//帧刷新 - Q双层效果（无）
};

//##############################
// * C对象绑定 - 设置控制器【标准函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
	this._drill_curSerial = controller._drill_controllerSerial;
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行手动初始化。
//##############################
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A贴图主体
	this.drill_sprite_initChange();				//初始化子功能 - B变换特性
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initCommandChange();		//初始化子功能 - D指令叠加变化-控制器用
	this.drill_sprite_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_sprite_initPeriodizeCommand();	//初始化子功能 - F周期指令
	
	this.drill_sprite_initBitmapAttr();			//初始化子功能 - O贴图加载-控制器用
	this.drill_sprite_initTrailing();			//初始化子功能 - P直线拖尾贴图（拖尾在粒子下面，需要先addChild）
	this.drill_sprite_initSecond();				//初始化子功能 - Q双层效果
	
	this.drill_sprite_initBallistics();			//初始化子功能 - H粒子群弹道
	this.drill_sprite_initRandom();				//初始化子功能 - I随机因子
	this.drill_sprite_initTransform();			//初始化子功能 - J粒子变化
	this.drill_sprite_initReset();				//初始化子功能 - K粒子重设
	this.drill_sprite_initLife();				//初始化子功能 - L粒子生命周期
};

//##############################
// * 基础粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 基础粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
	return true;
};
//##############################
// * 基础粒子贴图 - 贴图是否销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 基础粒子贴图 - 贴图执行销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 基础粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 基础粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A贴图主体
	this.visible = false;
	
	// > 销毁 - B变换特性
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
	// > 销毁 - D指令叠加变化-控制器用
	//	（无）
	
	// > 销毁 - E延迟指令
	//	（无）
	
	// > 销毁 - F周期指令
	//	（无）
	
	
	// > 销毁 - H粒子群弹道
	this._drill_COPa_ballistics_parXTank = null;
	this._drill_COPa_ballistics_parYTank = null;
	this._drill_COPa_ballistics_parOpacity = null;
	
	// > 销毁 - I随机因子
	//	（无）
	
	// > 销毁 - J粒子变化
	for( var i=0; i < this._drill_COPa_parSpriteTank.length; i++ ){
		var par_sprite = this._drill_COPa_parSpriteTank[i];
		this.removeChild( par_sprite );
	}
	this._drill_COPa_parSpriteTank = null;
	
	// > 销毁 - K粒子重设
	this._drill_COPa_curIteration = null;
	
	// > 销毁 - L粒子生命周期
	//	（无）
	
	
	// > 销毁 - O贴图加载-控制器用
	//	（无）
	
	// > 销毁 - P直线拖尾贴图
	if( this._drill_COPa_trailingSpriteTank != undefined ){
		for( var i=0; i < this._drill_COPa_trailingSpriteTank.length; i++ ){
			var tariling_sprite = this._drill_COPa_trailingSpriteTank[i];
			this.removeChild( tariling_sprite );
		}
	}
	this._drill_COPa_trailingSpriteTank = null;
	
	// > 销毁 - Q双层效果
	//	（无）
};
//==============================
// * 基础粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A贴图主体 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initAttr = function() {
	var data = this._drill_controller.drill_data();
	/*
		贴图的层级如下：
			- 主体贴图（this）
			- - 粒子层（_drill_COPa_parSpriteLayer）
			- - - 粒子贴图组（_drill_COPa_parSpriteTank）
			- - 直线拖尾层（_drill_COPa_trailingSpriteLayer）
			- - - 直线拖尾贴图组（_drill_COPa_trailingSpriteTank）
	*/
	
	// > 主体贴图
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = this._drill_controller.drill_controller_isVisible();		//贴图 - 显示/隐藏
																			//贴图 - 暂停/继续（无）
	this.blendMode = this._drill_controller._drill_blendMode;				//贴图 - 混合模式
	this.layerIndex = this._drill_controller._drill_layerIndex;				//贴图 - 层级
	this.zIndex = this._drill_controller._drill_zIndex;						//贴图 - 堆叠级
};
//==============================
// * A贴图主体 - 帧刷新
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateAttr = function() {
	
	// > 基础特性 - 显示/隐藏
	this.visible = this._drill_controller.drill_controller_isVisible();
	
	// > 基础特性 - 暂停/继续
	//	（无）
	
	// > 基础特性 - 混合模式
	if( this.blendMode != this._drill_controller._drill_blendMode ){
		this.blendMode =  this._drill_controller._drill_blendMode;
	}
	
	//（其它 基础特性 的帧刷新赋值见）
};

//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initChange = function(){
	
	// > 强制帧刷新（确保与控制器初始 变换值 同步）
	this.drill_sprite_updateChange();
};
//==============================
// * B变换特性 - 帧刷新
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateChange = function(){
	
	// > 贴图 - 整体锚点
	//	（无）
	
	// > 贴图 - 整体平移
	this.x = this._drill_controller.drill_controller_finalTransform_x();
	this.y = this._drill_controller.drill_controller_finalTransform_y();
	
	// > 贴图 - 整体缩放
	//	（无）
	
	// > 贴图 - 整体透明度
	this.opacity = this._drill_controller.drill_controller_finalTransform_opacity();
	
	// > 贴图 - 整体斜切
	//	（无）
	
	// > 贴图 - 整体旋转
	this.rotation = this._drill_controller.drill_controller_finalTransform_rotate() *Math.PI/180;
};

//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）

//==============================
// * D指令叠加变化-控制器用 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 贴图部分。
//					> 之所以把代码放这里，是因为 控制器-贴图 一对一，且可以节约弹道计算的存储空间。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initCommandChange = function(){
	
	// > 贴图参数 - 整体移动到
	this["_drill_command_move_spriteData"] = undefined;
	
	// > 贴图参数 - 整体透明度
	this["_drill_command_opacity_spriteData"] = undefined;
	
	// > 贴图参数 - 整体旋转
	this["_drill_command_rotate_spriteData"] = undefined;
	
	// > 贴图参数 - 粒子移动到
	this["_drill_command_par_move_spriteData"] = undefined;
	
	// > 贴图参数 - 粒子缩放X
	this["_drill_command_par_scaleX_spriteData"] = undefined;
	
	// > 贴图参数 - 粒子缩放Y
	this["_drill_command_par_scaleY_spriteData"] = undefined;
	
	// > 贴图参数 - 粒子旋转
	this["_drill_command_par_rotate_spriteData"] = undefined;
	
};
//==============================
// * D指令叠加变化-控制器用 - 帧刷新
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateCommandChange = function(){
	var data = this._drill_controller.drill_data();
	var controller = this._drill_controller;
	
	// > 整体移动到 - 帧刷新
	var CDataName = "_drill_command_move_data";
	var SDataName = "_drill_command_move_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_sprite_update( this, SDataName, controller, CDataName );
	
	// > 整体移动到 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_x = controller[CDataName]['cur_valueA'];
		controller._drill_change_y = controller[CDataName]['cur_valueB'];
	}else{
		controller._drill_change_x = 0;	//（没有数据时，赋值为 初始值）
		controller._drill_change_y = 0;
	}
	
	
	// > 整体透明度 - 帧刷新
	var CDataName = "_drill_command_opacity_data";
	var SDataName = "_drill_command_opacity_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 整体透明度 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_opacity = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_opacity = data['opacity'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 整体旋转 - 帧刷新
	var CDataName = "_drill_command_rotate_data";
	var SDataName = "_drill_command_rotate_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 整体旋转 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_rotate = controller[CDataName]['cur_value'];	//（整体再旋转角度）
	}else{
		controller._drill_change_rotate = data['parentRotate'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 粒子移动到 - 帧刷新
	var CDataName = "_drill_command_par_move_data";
	var SDataName = "_drill_command_par_move_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_sprite_update( this, SDataName, controller, CDataName );
	
	// > 粒子移动到 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_par_x = controller[CDataName]['cur_valueA'];
		controller._drill_change_par_y = controller[CDataName]['cur_valueB'];
	}else{
		controller._drill_change_par_x = data['par_x'];	//（没有数据时，赋值为 初始值）
		controller._drill_change_par_y = data['par_y'];
	}
	
	
	// > 粒子缩放X - 帧刷新
	var CDataName = "_drill_command_par_scaleX_data";
	var SDataName = "_drill_command_par_scaleX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 粒子缩放X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_par_scaleX = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_par_scaleX = data['par_scale_x'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 粒子缩放Y - 帧刷新
	var CDataName = "_drill_command_par_scaleY_data";
	var SDataName = "_drill_command_par_scaleY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 粒子缩放Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_par_scaleY = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_par_scaleY = data['par_scale_y'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 粒子旋转 - 帧刷新
	var CDataName = "_drill_command_par_rotate_data";
	var SDataName = "_drill_command_par_rotate_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 粒子旋转 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_par_rotate = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_par_rotate = data['par_rotate'];	//（没有数据时，赋值为 初始值）
	}
};

//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initDelayingCommand = function(){
	//（无）
};

//==============================
// * F周期指令 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initPeriodizeCommand = function(){
	//（无）
};


//==============================
// * H粒子群弹道 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initBallistics = function() {
	var data = this._drill_controller.drill_data();
	
	// > 移动弹道
	//		（每个粒子都对应一个 移动弹道 ）
	this._drill_COPa_ballistics_parXTank = [];
	this._drill_COPa_ballistics_parYTank = [];
	
	
	// > 透明度弹道
	//		（所有粒子共用 透明度弹道，因为 透明度模式 ）
	Drill_COBa_Manager._drill_COBa_commonData = this._drill_controller._drill_ballistics_opacity;
	$gameTemp.drill_COBa_preBallisticsOpacity( this, 0, 0 );
	this._drill_COPa_ballistics_parOpacity = this._drill_COBa_opacity;
	this._drill_COBa_opacity = null;
	
	// > 推演弹道（初始化子功能）
	for( var i = 0; i < data['par_count']; i++ ){
		this.drill_sprite_refreshBallistics( i );
	}
};
//==============================
// * H粒子群弹道 - 推演弹道
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_refreshBallistics = function( i ){
	//	（控制器存储弹道配置，贴图则根据配置推演弹道，完整弹道实际存放在贴图中）
	
	// > 推演弹道 - 移动弹道
	var org_x = this._drill_controller._drill_parList_x[i];  //（K粒子重设 - 脚本用初始值）
	var org_y = this._drill_controller._drill_parList_y[i];  //（K粒子重设 - 脚本用初始值）
	Drill_COBa_Manager._drill_COBa_planimetryData = this._drill_controller._drill_ballistics_move;
	$gameTemp.drill_COBa_preBallisticsMove( this, i, org_x, org_y );
	this._drill_COPa_ballistics_parXTank[i] = this._drill_COBa_x;
	this._drill_COPa_ballistics_parYTank[i] = this._drill_COBa_y;
	this._drill_COBa_x = null;
	this._drill_COBa_y = null;
	
	// > 推演弹道 - 透明度弹道
	//	（不需要）
};

//==============================
// * I随机因子 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initRandom = function(){
	//（无）
};

//==============================
// * J粒子变化 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initTransform = function() {
	var data = this._drill_controller.drill_data();
	
	// > 固定初始值
	this._drill_par_x = 0;
	this._drill_par_y = 0;
	this._drill_par_opacity = 0;
	this._drill_par_scaleX = 0;
	this._drill_par_scaleY = 0;
	this._drill_par_rotation = 0;
	
	// > 创建粒子层
	this._drill_COPa_parSpriteLayer = this.drill_sprite_createTransformLayer();
	this.addChild(this._drill_COPa_parSpriteLayer);
	
	// > 创建粒子
	this._drill_COPa_parSpriteTank = [];
	for( var j = 0; j < data['par_count']; j++ ){	
		var temp_sprite = this.drill_sprite_createTransformParticle();
		this._drill_COPa_parSpriteTank.push(temp_sprite);
	}
};
//==============================
// * J粒子变化 - 初始化子功能 - 创建粒子层
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_createTransformLayer = function() {
	
	// > 粒子层
	//		（ParticleContainer 只管理向下一级的子贴图，不支持子贴图嵌套）
	//		（ParticleContainer 不支持 子贴图设置skew）
	//		（ParticleContainer 不支持 子贴图设置visible）
	//		（ParticleContainer 不支持 子贴图切换bitmap，『粒子容器的材质固定问题』）
	//		（ParticleContainer 不支持 子贴图继承的update，『粒子容器的外部帧刷新』）
	//		（ParticleContainer 不支持 mask遮罩）
	//		（ParticleContainer 自身没有 anchor定义）
	var temp_layer = new PIXI.particles.ParticleContainer(
		1500, 					//粒子 - 最大数量
		{
			position: true,		//粒子 - 平移
			scale: true,		//粒子 - 缩放
			alpha: true,		//粒子 - 透明度
			rotation: true,		//粒子 - 旋转
			uvs: false			//粒子 - 纹理（即是否启用'setFrame'功能）
		}
	);
	return temp_layer;
};
//==============================
// * J粒子变化 - 初始化子功能 - 创建粒子
//
//			说明：	> 此处创建的粒子，是第一次初始化的粒子，后续还会被重刷。
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_createTransformParticle = function() {
	var data = this._drill_controller.drill_data();
	var temp_sprite = new Sprite();
	temp_sprite.blendMode = data['blendMode'];
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.opacity = 0;
	//temp_sprite.bitmap;  //（O贴图加载-控制器用，在加载完毕后赋值一次）
	return temp_sprite;
};
//==============================
// * J粒子变化 - 帧刷新
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform = function() {
	var data = this._drill_controller.drill_data();
	
	// > 贴图 - 粒子属性
	for(var i = 0; i < data['par_count']; i++ ){
		var par_sprite = this._drill_COPa_parSpriteTank[i];
		var time = this._drill_controller.drill_controller_getParticleLifeTime( i );
		
		
		// > 固定初始值
		this._drill_par_x = 0;
		this._drill_par_y = 0;
		this._drill_par_opacity = 0;
		this._drill_par_scaleX = 0;
		this._drill_par_scaleY = 0;
		this._drill_par_rotation = 0;
		
		// > 帧刷新
		this.drill_sprite_updateTransform_Position( i, time );
		this.drill_sprite_updateTransform_Scale( i, time );
		this.drill_sprite_updateTransform_Opacity( i, time );
		this.drill_sprite_updateTransform_Rotation( i, time );
		
		// > 粒子 赋值
		par_sprite.x = this._drill_par_x;
		par_sprite.y = this._drill_par_y;
		par_sprite.opacity = this._drill_par_opacity;
		par_sprite.scale.x = this._drill_par_scaleX;
		par_sprite.scale.y = this._drill_par_scaleY;
		par_sprite.rotation = this._drill_par_rotation *Math.PI /180;
	}
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子平移【标准函数】
//##############################
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
	
	// > 粒子平移（K粒子重设 - 脚本用初始值）
	this._drill_par_x = this._drill_controller._drill_parList_x[i];
	this._drill_par_y = this._drill_controller._drill_parList_y[i];
	
	// > 粒子平移（数据最终变换值）
	this._drill_par_x += this._drill_controller.drill_controller_finalTransform_par_x();
	this._drill_par_y += this._drill_controller.drill_controller_finalTransform_par_y();
	
	// > 粒子平移（H粒子群弹道 - 移动弹道）
	if( this._drill_COPa_ballistics_parXTank[i] == undefined ){ return; }
	if( this._drill_COPa_ballistics_parYTank[i] == undefined ){ return; }
	this._drill_par_x += this._drill_COPa_ballistics_parXTank[i][ time ];
	this._drill_par_y += this._drill_COPa_ballistics_parYTank[i][ time ];
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子缩放【标准函数】
//##############################
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Scale = function( i, time ){
	
	// > 粒子缩放（K粒子重设 - 脚本用初始值）
	this._drill_par_scaleX = this._drill_controller._drill_parList_scaleX[i];
	this._drill_par_scaleY = this._drill_controller._drill_parList_scaleY[i];
	
	// > 粒子缩放（数据最终变换值）
	this._drill_par_scaleX *= this._drill_controller.drill_controller_finalTransform_par_scaleX();
	this._drill_par_scaleY *= this._drill_controller.drill_controller_finalTransform_par_scaleY();
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子透明度【标准函数】
//##############################
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Opacity = function( i, time ){
	
	// > 粒子透明度（K粒子重设 - 脚本用初始值）
	this._drill_par_opacity = this._drill_controller._drill_parList_opacity[i];
	
	// > 粒子透明度（数据最终变换值）
	//	（不影响）
	
	// > 粒子透明度（H粒子群弹道 - 透明度弹道）
	if( this._drill_COPa_ballistics_parOpacity == undefined ){ return; }
	this._drill_par_opacity = this._drill_COPa_ballistics_parOpacity[ time ];	//（注意是强制赋值）
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子旋转【标准函数】
//##############################
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Rotation = function( i, time ){
	
	// > 粒子旋转（K粒子重设 - 脚本用初始值）
	this._drill_par_rotation = this._drill_controller._drill_parList_rotation[i];
	
	// > 粒子旋转（数据最终变换值）
	this._drill_par_rotation += this._drill_controller.drill_controller_finalTransform_par_rotate();
};
//==============================
// * J粒子变化 - 帧刷新 - 校验值
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_COPa_checkNaN == true ){
		if( isNaN( this._drill_par_x ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_controller._drill_curPluginTipName, "(J粒子变化)_drill_par_x" ) );
			//throw new Error("请检查粒子数据：" + JSON.stringify(this._drill_controller.drill_data()) );
		}
		if( isNaN( this._drill_par_y ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_controller._drill_curPluginTipName, "(J粒子变化)_drill_par_y" ) );
		}
		if( isNaN( this._drill_par_opacity ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_controller._drill_curPluginTipName, "(J粒子变化)_drill_par_opacity" ) );
		}
		if( isNaN( this._drill_par_scaleX ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_controller._drill_curPluginTipName, "(J粒子变化)_drill_par_scaleX" ) );
		}
		if( isNaN( this._drill_par_scaleY ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_controller._drill_curPluginTipName, "(J粒子变化)_drill_par_scaleY" ) );
		}
		if( isNaN( this._drill_par_rotation ) ){
			DrillUp.g_COPa_checkNaN = false;
			alert( DrillUp.drill_COPa_getPluginTip_ParamIsNaN( this._drill_controller._drill_curPluginTipName, "(J粒子变化)_drill_par_rotation" ) );
		}
	}
};


//==============================
// * K粒子重设 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initReset = function() {
	var data = this._drill_controller.drill_data();
	
	// > 始终与朝向一致
	this._drill_reset_isKeepMoveDegree = false;
	if( data['par_selfRotateMode'] == "始终与朝向一致" ){
		this._drill_reset_isKeepMoveDegree = true;
	}
	
	// > 粒子 迭代次数（贴图的）
	this._drill_COPa_curIteration = [];
	for( var i = 0; i < data['par_count']; i++ ){
		this._drill_COPa_curIteration[i] = 1;
	}
};
//==============================
// * K粒子重设 - 帧刷新
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateReset = function() {
	var data = this._drill_controller.drill_data();
	
	// > 迭代次数监听（每次变化时，重新推演弹道）
	for(var i = 0; i < data['par_count']; i++ ){
		if( this._drill_COPa_curIteration[i] != this._drill_controller._drill_parList_randomIteration[i] ){
			this._drill_COPa_curIteration[i] =  this._drill_controller._drill_parList_randomIteration[i];
			
			// > 粒子 重新推演弹道
			this.drill_sprite_refreshBallistics( i );
		}
	}
};
//==============================
// * K粒子重设 - 帧刷新 - 粒子旋转（继承）
//==============================
var _drill_COPa_COPa_sprite_updateTransform_Rotation = Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Rotation;
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Rotation = function( i, time ){
	
	// > 始终与朝向一致
	if( this._drill_reset_isKeepMoveDegree == true ){
		var data = this._drill_controller.drill_data();
		this._drill_par_rotation = $gameTemp.drill_COPa_getBallisticsMoveDegree( 
			this._drill_COPa_ballistics_parXTank[i],
			this._drill_COPa_ballistics_parYTank[i],
			time,
			data['par_backrun']
		) *Math.PI /180;
		return;
	}
	
	// > 原函数
	_drill_COPa_COPa_sprite_updateTransform_Rotation.call( this, i, time );
};


//==============================
// * L粒子生命周期 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initLife = function() {
	
	// > 依次产生
	this._drill_life_isOneByOne = false;
	if( this._drill_controller._drill_par_lifeType == 3 ){
		this._drill_life_isOneByOne = true;
	}
};
//==============================
// * L粒子生命周期 - 帧刷新 - 粒子透明度（继承）
//==============================
var _drill_COPa_COPa_sprite_updateTransform_Opacity = Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Opacity
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Opacity = function( i, time ){
	
	// > 依次产生
	if( this._drill_life_isOneByOne == true ){
		var cur_iter = this._drill_controller._drill_parList_randomIteration[i];
		if( cur_iter <= 1 ){
			this._drill_par_opacity = 0;
			return;
		}
	}
	
	// > 原函数
	_drill_COPa_COPa_sprite_updateTransform_Opacity.call( this, i, time );
};


//==============================
// * O贴图加载-控制器用 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initBitmapAttr = function() {
	var data = this._drill_controller.drill_data();
	
	// > 粒子贴图
	this._drill_particleBitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'], data['tint'], data['smooth'] );
	this._drill_particleBitmap_inited = false;
	
	// > P直线拖尾贴图
	this._drill_trailingBitmap = null;
	this._drill_trailingBitmap_inited = null;
	if( data['trailing_enable'] == true ){
		this._drill_trailingBitmap = ImageManager.loadBitmap( data['trailing_src_img_file'], data['trailing_src_img'], data['tint'], data['smooth'] );
		this._drill_trailingBitmap_inited = false;
	}
};
//==============================
// * O贴图加载-控制器用 - 帧刷新
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateBitmapAttr = function() {
	
	// > 粒子贴图 - 延迟锁
	if( this._drill_particleBitmap_inited === false ){
		if( this._drill_particleBitmap.isReady() ){
			this._drill_particleBitmap_inited = true;
			
			// > 粒子贴图 - 延迟初始化
			this.drill_sprite_initBitmapAttr_Par();
		}
	}
	
	// > P直线拖尾贴图 - 延迟锁
	if( this._drill_trailingBitmap_inited === false ){
		if( this._drill_trailingBitmap.isReady() ){
			this._drill_trailingBitmap_inited = true;
			
			// > P直线拖尾贴图 - 延迟初始化
			this.drill_sprite_initBitmapAttr_Trailing();
		}
	}
};
//==============================
// * O贴图加载-控制器用 - 延迟初始化 - 粒子贴图
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initBitmapAttr_Par = function() {
	
	// > 粒子贴图 - 高宽赋值
	this._drill_controller._drill_bitmapPar_width = this._drill_particleBitmap.width;
	this._drill_controller._drill_bitmapPar_height = this._drill_particleBitmap.height;
	
	// > 粒子贴图 - 贴图赋值（在加载完毕后赋值一次）
	for( var i = 0; i < this._drill_COPa_parSpriteTank.length; i++ ){
		var temp_sprite = this._drill_COPa_parSpriteTank[i];
		temp_sprite.bitmap = this._drill_particleBitmap;
		this._drill_COPa_parSpriteLayer.addChild(temp_sprite);  //『粒子容器的材质固定问题』
	}
};
//==============================
// * O贴图加载-控制器用 - 延迟初始化 - 直线拖尾贴图
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initBitmapAttr_Trailing = function() {
	
	// > P直线拖尾贴图 - 高宽赋值
	this._drill_controller._drill_bitmapTrailing_width = this._drill_trailingBitmap.width;
	this._drill_controller._drill_bitmapTrailing_height = this._drill_trailingBitmap.height;
	
	// > P直线拖尾贴图 - 贴图赋值（在加载完毕后赋值一次）
	for( var i = 0; i < this._drill_COPa_trailingSpriteTank.length; i++ ){
		var temp_sprite = this._drill_COPa_trailingSpriteTank[i];
		temp_sprite.bitmap = this._drill_trailingBitmap;
		this._drill_COPa_trailingSpriteLayer.addChild(temp_sprite);  //『粒子容器的材质固定问题』
	}
};


//==============================
// * P直线拖尾贴图 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initTrailing = function() {
	var data = this._drill_controller.drill_data();
	if( data['trailing_enable'] != true ){ return; }
	
	// > 创建拖尾层
	this._drill_COPa_trailingSpriteLayer = this.drill_sprite_createTrailingLayer();
	this.addChild(this._drill_COPa_trailingSpriteLayer);
	
	// > 创建拖尾
	this._drill_COPa_trailingSpriteTank = [];
	for( var j = 0; j < data['par_count']; j++ ){	
		var temp_sprite = this.drill_sprite_createTrailingSprite();
		this._drill_COPa_trailingSpriteTank.push(temp_sprite);
	}
};
//==============================
// * P直线拖尾贴图 - 初始化子功能 - 创建拖尾层
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_createTrailingLayer = function() {
	
	// > 拖尾层
	//		（ParticleContainer 只管理向下一级的子贴图，不支持子贴图嵌套）
	//		（ParticleContainer 不支持 子贴图设置skew）
	//		（ParticleContainer 不支持 子贴图设置visible）
	//		（ParticleContainer 不支持 子贴图切换bitmap，『粒子容器的材质固定问题』）
	//		（ParticleContainer 不支持 子贴图继承的update，『粒子容器的外部帧刷新』）
	//		（ParticleContainer 不支持 mask遮罩）
	//		（ParticleContainer 自身没有 anchor定义）
	var temp_layer = new PIXI.particles.ParticleContainer(
		1500, 					//拖尾 - 最大数量
		{
			position: true,		//拖尾 - 平移
			scale: true,		//拖尾 - 缩放
			alpha: true,		//拖尾 - 透明度
			rotation: true,		//拖尾 - 旋转
			uvs: false			//拖尾 - 纹理（即是否启用'setFrame'功能）
		}
	);
	return temp_layer;
};
//==============================
// * P直线拖尾贴图 - 初始化子功能 - 创建拖尾
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_createTrailingSprite = function() {
	var data = this._drill_controller.drill_data();
	var temp_sprite = new Sprite();
	temp_sprite.blendMode = data['blendMode'];
	if( data['trailing_centerAnchor'] == true ){	//（是否固定拖尾在粒子中心）
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
	}else{
		temp_sprite.anchor.x = 1.0;
		temp_sprite.anchor.y = 0.5;
	}
	temp_sprite.opacity = 0;
	//temp_sprite.bitmap;  //（O贴图加载-控制器用，在加载完毕后赋值一次）
	return temp_sprite;
};
//==============================
// * P直线拖尾贴图 - 帧刷新
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTrailing = function() {
	var data = this._drill_controller.drill_data();
	if( data['trailing_enable'] != true ){ return; }
	
	// > 拖尾贴图属性
	for(var i = 0; i < data['par_count']; i++ ){
		var par_sprite = this._drill_COPa_parSpriteTank[i];
		var tariling_sprite = this._drill_COPa_trailingSpriteTank[i];
		var time = this._drill_controller.drill_controller_getParticleLifeTime( i );
		
		
		// > 拖尾 - 平移
		tariling_sprite.x = par_sprite.x;
		tariling_sprite.y = par_sprite.y;
		
		// > 拖尾 - 缩放
		tariling_sprite.scale.x = par_sprite.scale.x;
		tariling_sprite.scale.y = par_sprite.scale.x;
		
		// > 拖尾 - 透明度
		tariling_sprite.opacity = par_sprite.opacity;
		
		// > 拖尾 - 旋转
		var xx = this._drill_COPa_ballistics_parXTank[i];
		var yy = this._drill_COPa_ballistics_parYTank[i];
		if( xx == undefined ){ xx = 0; }
		if( yy == undefined ){ yy = 0; }
		tariling_sprite.rotation = $gameTemp.drill_COPa_getBallisticsMoveDegree( 
			xx,
			yy,
			time,
			data['par_backrun']
		) *Math.PI /180;
	}
};
//==============================
// * P直线拖尾贴图 - 获取弹道的朝向（开放函数）
//
//			说明：	> 注意此处的计算，不考虑 弹道延迟 ，否则角度会算为0。
//==============================
Game_Temp.prototype.drill_COPa_getBallisticsMoveDegree = function( COBa_x, COBa_y, time, is_backrun ){
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
		return this.drill_COPa_Math2D_getPointToPointDegree( cur_x, cur_y, next_x, next_y );
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
		return this.drill_COPa_Math2D_getPointToPointDegree( cur_x, cur_y, next_x, next_y );
	}
};
//==============================
// * P直线拖尾贴图 - 数学工具 - 计算点A朝向点B的角度
//			
//			参数：	> x1,y1 数字（点A）
//					> x2,y2 数字（点B）
//			返回：	> 数字      （角度，0 至 360 之间）
//			
//			说明：	> 0度朝右，90度朝下，180度朝左，270度朝上。
//					> 若两点重合，返回 270 。
//==============================
Game_Temp.prototype.drill_COPa_Math2D_getPointToPointDegree = function( x1,y1,x2,y2 ){
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
// * Q双层效果 - 初始化子功能
//==============================
Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initSecond = function() {
	//（当前贴图无法控制 第二层，需要外部控制）
};



//=============================================================================
// ** 基础粒子第二层贴图【Drill_COPa_BasicPar_SecSprite】
// **
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个 第二层粒子贴图 。
// **		子功能：	
// **					->贴图（第二层）『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->贴图是否销毁
// **						->贴图执行销毁
// **					
// **					->A贴图主体
// **					->B变换特性
// **					x->C对象绑定（无）
// **					x->D指令叠加变化-控制器用（无）
// **					x->E延迟指令（无）
// **					x->F周期指令（无）
// **					
// **					->H粒子群弹道（无）
// **					->I随机因子（无）
// **					->J粒子变化
// **						->倒放
// **						> 粒子平移
// **						> 粒子缩放
// **						> 粒子透明度
// **						> 粒子旋转
// **					->K粒子重设（无）
// **					->L粒子生命周期（无）
// **					
// **					->O贴图加载-控制器用（无）
// **					->P直线拖尾贴图（无）
// **					->Q双层效果（无）
// **					
// **		说明：	> 核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"。
// **				> 第二层粒子贴图会比粒子贴图 优先 执行update，所以需要考虑『粒子弹道慢一帧』问题。
// **				  因此，第二层粒子与 父贴图 的 J粒子变化 保持一致。
//=============================================================================
//==============================
// * 基础粒子第二层贴图 - 定义
//==============================
function Drill_COPa_BasicPar_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_COPa_BasicPar_SecSprite.prototype = Object.create(Sprite.prototype);
Drill_COPa_BasicPar_SecSprite.prototype.constructor = Drill_COPa_BasicPar_SecSprite;
//==============================
// * 基础粒子第二层贴图 - 初始化
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.initialize = function( parentSprite ){
	Sprite.prototype.initialize.call(this);
	this.drill_spriteSec_initSelf( parentSprite );	//初始化自身
	this.drill_spriteSec_initChild();				//初始化子功能
};
//==============================
// * 基础粒子第二层贴图 - 帧刷新
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.update = function() {
	if( this.drill_spriteSec_isReady() == false ){ return; }
	if( this.drill_spriteSec_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_spriteSec_updateAttr();			//帧刷新 - A贴图主体
	this.drill_spriteSec_updateChange();		//帧刷新 - B变换特性
												
												//帧刷新 - H粒子群弹道（无）
												//帧刷新 - I随机因子（无）
	this.drill_spriteSec_updateTransform();		//帧刷新 - J粒子变化
												//帧刷新 - K粒子重设（无）
												//帧刷新 - L粒子生命周期（无）
												
	this.drill_spriteSec_updateBitmapAttr();	//帧刷新 - O贴图加载-控制器用
												//帧刷新 - P直线拖尾贴图（无）
												//帧刷新 - Q双层效果（无）
};
//##############################
// * 基础粒子第二层贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_COPa_BasicPar_SecSprite.prototype.drill_sprite_isReady = function(){
	return this.drill_spriteSec_isReady();
};
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_isReady = function(){
	if( this._drill_parentSprite == undefined ){ return false; }
    return this._drill_parentSprite.drill_sprite_isReady();
};
//##############################
// * 基础粒子第二层贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_COPa_BasicPar_SecSprite.prototype.drill_sprite_isOptimizationPassed = function(){
	return this.drill_spriteSec_isOptimizationPassed();
};
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
	return true;
};
//##############################
// * 基础粒子第二层贴图 - 贴图是否销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_COPa_BasicPar_SecSprite.prototype.drill_sprite_isNeedDestroy = function(){
	return this.drill_spriteSec_isNeedDestroy();
};
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 基础粒子第二层贴图 - 贴图执行销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_COPa_BasicPar_SecSprite.prototype.drill_sprite_destroy = function(){
	this.drill_spriteSec_destroy();
};
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_destroy = function(){
	this.drill_spriteSec_destroyChild();
	this.drill_spriteSec_destroySelf();
};
//==============================
// * 基础粒子第二层贴图 - 初始化子功能『控制器与贴图』
//			
//			说明：	> 创建该类后直接初始化。
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initChild = function(){
	this.drill_spriteSec_initAttr();				//初始化子功能 - A贴图主体
	this.drill_spriteSec_initChange();				//初始化子功能 - B变换特性
													
	this.drill_spriteSec_initBitmapAttr();			//初始化子功能 - O贴图加载-控制器用
	this.drill_spriteSec_initTrailing();			//初始化子功能 - P直线拖尾贴图
	this.drill_spriteSec_initSecond();				//初始化子功能 - Q双层效果
													
	this.drill_spriteSec_initBallistics();			//初始化子功能 - H粒子群弹道
	this.drill_spriteSec_initRandom();				//初始化子功能 - I随机因子
	this.drill_spriteSec_initTransform();			//初始化子功能 - J粒子变化
	this.drill_spriteSec_initReset();				//初始化子功能 - K粒子重设
	this.drill_spriteSec_initLife();				//初始化子功能 - L粒子生命周期
};
//==============================
// * 基础粒子第二层贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	this._drill_parentSprite = parentSprite;								//父类对象
	this._drill_controller = parentSprite._drill_controller;				//控制器对象
	//this._drill_curSerial = -1;											//当前序列号（不使用）
};
//==============================
// * 基础粒子第二层贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	
	// > 销毁 - A贴图主体
	this.visible = false;
	
	// > 销毁 - B变换特性
	//	（无）
	
	
	// > 销毁 - H粒子群弹道
	//	（无）
	
	// > 销毁 - I随机因子
	//	（无）
	
	// > 销毁 - J粒子变化
	for( var i=0; i < this._drill_COPa_parSecSpriteTank.length; i++ ){
		var par_spriteSec = this._drill_COPa_parSecSpriteTank[i];
		this.removeChild( par_spriteSec );
	}
	this._drill_COPa_parSecSpriteTank.length = 0;
	
	// > 销毁 - K粒子重设
	//	（无）
	
	// > 销毁 - L粒子生命周期
	//	（无）
	
	
	// > 销毁 - O贴图加载-控制器用
	//	（无）
	
	// > 销毁 - P直线拖尾贴图
	//	（无）
	
	// > 销毁 - Q双层效果
	//	（无）
};
//==============================
// * 基础粒子第二层贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	this._drill_parentSprite = null;			//父类对象
	this._drill_controller = null;				//控制器对象
	//this._drill_curSerial = -1;				//当前序列号（不使用）
};


//==============================
// * A贴图主体（第二层） - 初始化子功能
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initAttr = function() {
	var data = this._drill_controller.drill_data();
	
	// > 主体贴图
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = this._drill_controller.drill_controller_isVisible();		//贴图 - 显示/隐藏
																			//贴图 - 暂停/继续（无）
	this.blendMode = this._drill_controller._drill_blendMode;				//贴图 - 混合模式
	this.layerIndex = this._drill_controller._drill_layerIndex;				//贴图 - 层级
	this.zIndex = this._drill_controller._drill_zIndex;						//贴图 - 堆叠级
};
//==============================
// * A贴图主体（第二层） - 帧刷新
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateAttr = function() {
	
	// > 与父贴图完全同步（此处会有一帧延迟，偶尔能看出来）
	this.visible = this._drill_parentSprite.visible;
	this.blendMode = this._drill_parentSprite.blendMode;
};


//==============================
// * B变换特性（第二层） - 初始化子功能
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initChange = function() {
	//（无）
};
//==============================
// * B变换特性（第二层） - 帧刷新
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateChange = function() {
	
	// > 与父贴图完全同步（此处会有一帧延迟，偶尔能看出来）
	this.x = this._drill_parentSprite.x;
	this.y = this._drill_parentSprite.y;
	this.scale.x = this._drill_parentSprite.scale.x;
	this.scale.y = this._drill_parentSprite.scale.y;
	this.opacity = this._drill_parentSprite.opacity;
	this.rotation = this._drill_parentSprite.rotation;
};


//==============================
// * H粒子群弹道（第二层） - 初始化子功能
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initBallistics = function() {
	//（无）
};

//==============================
// * I随机因子（第二层） - 初始化子功能
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initRandom = function() {
	//（无）
};

//==============================
// * J粒子变化（第二层） - 初始化子功能
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initTransform = function() {
	var p_data = this._drill_controller.drill_data();
	
	// > 创建粒子层
	this._drill_COPa_parSecSpriteLayer = this.drill_spriteSec_createTransformLayer();
	this.addChild(this._drill_COPa_parSecSpriteLayer);
	
	// > 创建粒子
	this._drill_COPa_parSecSpriteTank = [];
	for( var j = 0; j < p_data['par_count']; j++ ){	
		var temp_sprite = this.drill_spriteSec_createTransformParticle();
		this._drill_COPa_parSecSpriteTank.push(temp_sprite);
	}
};
//==============================
// * J粒子变化（第二层） - 初始化子功能 - 创建粒子层
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_createTransformLayer = function() {
	
	// > 粒子层
	//		（ParticleContainer 只管理向下一级的子贴图，不支持子贴图嵌套）
	//		（ParticleContainer 不支持 子贴图设置skew）
	//		（ParticleContainer 不支持 子贴图设置visible）
	//		（ParticleContainer 不支持 子贴图切换bitmap，『粒子容器的材质固定问题』）
	//		（ParticleContainer 不支持 子贴图继承的update，『粒子容器的外部帧刷新』）
	//		（ParticleContainer 不支持 mask遮罩）
	//		（ParticleContainer 自身没有 anchor定义）
	var temp_layer = new PIXI.particles.ParticleContainer(
		1500, 					//第二层粒子 - 最大数量
		{
			position: true,		//第二层粒子 - 平移
			scale: true,		//第二层粒子 - 缩放
			alpha: true,		//第二层粒子 - 透明度
			rotation: true,		//第二层粒子 - 旋转
			uvs: false			//第二层粒子 - 纹理（即是否启用'setFrame'功能）
		}
	);
	return temp_layer;
};
//==============================
// * J粒子变化（第二层） - 初始化子功能 - 创建粒子
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_createTransformParticle = function() {
	var p_data = this._drill_controller.drill_data();
	var temp_sprite = new Sprite();
	temp_sprite.blendMode = this._drill_parentSprite.blendMode;
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.opacity = 0;
	//temp_sprite.bitmap;  //（O贴图加载-控制器用，在加载完毕后赋值一次）
	return temp_sprite; 
};
//==============================
// * J粒子变化（第二层） - 帧刷新
//
//			说明：	> 最好不要用 par_spriteSec.x = par_sprite.x 的方式来赋值，会产生1帧的延迟问题。
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform = function(){
	var data = this._drill_controller.drill_data();
	
	// > 贴图 - 粒子属性（第二层）
	for(var i = 0; i < data['par_count']; i++ ){
		var par_spriteSec = this._drill_COPa_parSecSpriteTank[i];
		var time = this._drill_controller.drill_controller_getParticleLifeTime( i );
		
		
		// > 固定初始值
		this._drill_parSec_x = 0;
		this._drill_parSec_y = 0;
		this._drill_parSec_opacity = 0;
		this._drill_parSec_scaleX = 0;
		this._drill_parSec_scaleY = 0;
		this._drill_parSec_rotation = 0;
		
		// > 帧刷新
		this.drill_spriteSec_updateTransform_Position( i, time );
		this.drill_spriteSec_updateTransform_Scale( i, time );
		this.drill_spriteSec_updateTransform_Opacity( i, time );
		this.drill_spriteSec_updateTransform_Rotation( i, time );
		
		// > 粒子 赋值
		par_spriteSec.x = this._drill_parSec_x;
		par_spriteSec.y = this._drill_parSec_y;
		par_spriteSec.opacity = this._drill_parSec_opacity;
		par_spriteSec.scale.x = this._drill_parSec_scaleX;
		par_spriteSec.scale.y = this._drill_parSec_scaleY;
		par_spriteSec.rotation = this._drill_parSec_rotation *Math.PI /180;
	}
};
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子平移【标准函数】
//
//			说明：	> 该函数与 drill_sprite_updateTransform_Position 同步复刻。
//##############################
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Position = function( i, time ){
	
	// > 粒子平移（K粒子重设 - 脚本用初始值）
	this._drill_parSec_x = this._drill_controller._drill_parList_x[i];
	this._drill_parSec_y = this._drill_controller._drill_parList_y[i];
	
	// > 粒子平移（数据最终变换值）
	this._drill_parSec_x += this._drill_controller.drill_controller_finalTransform_par_x();
	this._drill_parSec_y += this._drill_controller.drill_controller_finalTransform_par_y();
	
	// > 粒子平移（H粒子群弹道 - 移动弹道）
	if( this._drill_parentSprite._drill_COPa_ballistics_parXTank[i] == undefined ){ return; }
	if( this._drill_parentSprite._drill_COPa_ballistics_parYTank[i] == undefined ){ return; }
	this._drill_parSec_x += this._drill_parentSprite._drill_COPa_ballistics_parXTank[i][ time ];
	this._drill_parSec_y += this._drill_parentSprite._drill_COPa_ballistics_parYTank[i][ time ];
};
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子缩放【标准函数】
//
//			说明：	> 该函数与 drill_sprite_updateTransform_Scale 同步复刻。
//##############################
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Scale = function( i, time ){
	
	// > 粒子缩放（K粒子重设 - 脚本用初始值）
	this._drill_parSec_scaleX = this._drill_controller._drill_parList_scaleX[i];
	this._drill_parSec_scaleY = this._drill_controller._drill_parList_scaleY[i];
	
	// > 粒子缩放（数据最终变换值）
	this._drill_parSec_scaleX *= this._drill_controller.drill_controller_finalTransform_par_scaleX();
	this._drill_parSec_scaleY *= this._drill_controller.drill_controller_finalTransform_par_scaleY();
};
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子透明度【标准函数】
//
//			说明：	> 该函数与 drill_sprite_updateTransform_Opacity 同步复刻。
//##############################
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Opacity = function( i, time ){
	
	// > 粒子透明度（K粒子重设 - 脚本用初始值）
	this._drill_parSec_opacity = this._drill_controller._drill_parList_opacity[i];
	
	// > 粒子透明度（数据最终变换值）
	//	（不影响）
	
	// > 粒子透明度（H粒子群弹道 - 透明度弹道）
	if( this._drill_parentSprite._drill_COPa_ballistics_parOpacity == undefined ){ return; }
	this._drill_parSec_opacity = this._drill_parentSprite._drill_COPa_ballistics_parOpacity[ time ];	//（注意是强制赋值）
};
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子旋转【标准函数】
//
//			说明：	> 该函数与 drill_sprite_updateTransform_Rotation 同步复刻。
//##############################
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Rotation = function( i, time ){
	
	// > 粒子旋转（K粒子重设 - 脚本用初始值）
	this._drill_parSec_rotation = this._drill_controller._drill_parList_rotation[i];
	
	// > 粒子旋转（数据最终变换值）
	this._drill_parSec_rotation += this._drill_controller.drill_controller_finalTransform_par_rotate();
};


//==============================
// * K粒子重设（第二层） - 初始化子功能
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initReset = function() {
	var data = this._drill_controller.drill_data();
	
	// > 始终与朝向一致
	this._drill_reset_isKeepMoveDegree = false;
	if( data['par_selfRotateMode'] == "始终与朝向一致" ){
		this._drill_reset_isKeepMoveDegree = true;
	}
};
//==============================
// * K粒子重设（第二层） - 帧刷新 - 粒子旋转（继承）
//==============================
var _drill_COPa_COPa_spriteSec_updateTransform_Rotation = Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Rotation
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Rotation = function( i, time ){
	
	// > 始终与朝向一致
	if( this._drill_reset_isKeepMoveDegree == true ){
		var data = this._drill_controller.drill_data();
		this._drill_parSec_rotation = $gameTemp.drill_COPa_getBallisticsMoveDegree( 
			this._drill_parentSprite._drill_COPa_ballistics_parXTank[i],
			this._drill_parentSprite._drill_COPa_ballistics_parYTank[i],
			time,
			data['par_backrun']
		) *Math.PI /180;
		return;
	}
	
	// > 原函数
	_drill_COPa_COPa_spriteSec_updateTransform_Rotation.call( this, i, time );
};


//==============================
// * L粒子生命周期（第二层） - 初始化子功能
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initLife = function() {
	
	// > 依次产生
	this._drill_life_isOneByOne = false;
	if( this._drill_controller._drill_par_lifeType == 3 ){
		this._drill_life_isOneByOne = true;
	}
};
//==============================
// * L粒子生命周期（第二层） - 帧刷新 - 粒子透明度（继承）
//==============================
var _drill_COPa_COPa_spriteSec_updateTransform_Opacity = Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Opacity
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Opacity = function( i, time ){
	
	// > 依次产生
	if( this._drill_life_isOneByOne == true ){
		var cur_iter = this._drill_controller._drill_parList_randomIteration[i];
		if( cur_iter <= 1 ){
			this._drill_parSec_opacity = 0;
			return;
		}
	}
	
	// > 原函数
	_drill_COPa_COPa_spriteSec_updateTransform_Opacity.call( this, i, time );
};


//==============================
// * O贴图加载-控制器用（第二层） - 初始化子功能
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initBitmapAttr = function() {
	var p_data = this._drill_controller.drill_data();
	
	// > Q双层效果
	this._drill_particleSecBitmap = null;
	this._drill_particleSecBitmap_inited = null;
	if( p_data['second_enable'] == true ){
		this._drill_particleSecBitmap = ImageManager.loadBitmap( p_data['src_img_file'], p_data['second_src_img'], p_data['tint'], p_data['smooth'] );
		this._drill_particleSecBitmap_inited = false;
	}
};
//==============================
// * O贴图加载-控制器用（第二层） - 帧刷新
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateBitmapAttr = function() {
	
	// > Q双层效果 - 延迟锁
	if( this._drill_particleSecBitmap_inited == false ){
		if( this._drill_particleSecBitmap.isReady() ){
			this._drill_particleSecBitmap_inited = true;
			
			// > Q双层效果 - 延迟初始化
			this.drill_spriteSec_initBitmapAttr_Sec();
		}
	}
};
//==============================
// * O贴图加载-控制器用（第二层） - 延迟初始化
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initBitmapAttr_Sec = function() {
	
	// > Q双层效果 - 高宽赋值
	this._drill_controller._drill_bitmapSec_width = this._drill_particleSecBitmap.width;
	this._drill_controller._drill_bitmapSec_height = this._drill_particleSecBitmap.height;
	
	// > Q双层效果 - 贴图赋值（在加载完毕后赋值一次）
	for( var i = 0; i < this._drill_COPa_parSecSpriteTank.length; i++ ){
		var temp_sprite = this._drill_COPa_parSecSpriteTank[i];
		temp_sprite.bitmap = this._drill_particleSecBitmap;
		this._drill_COPa_parSecSpriteLayer.addChild(temp_sprite);  //『粒子容器的材质固定问题』
	}
};


//==============================
// * P直线拖尾贴图（第二层） - 初始化子功能
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initTrailing = function() {
	//（无）
};


//==============================
// * Q双层效果（第二层） - 初始化子功能
//==============================
Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initSecond = function() {
	//（该类就是 Q双层效果 ）
};



	
//=============================================================================
// ** 复杂粒子控制器【Drill_COPa_ComplexPar_Controller】
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	定义一个专门控制粒子的数据类。
// **		子功能：	
// **					->控制器『控制器与贴图』
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->控制器标记销毁
// **						->控制器是否销毁
// **					
// **					->2A粒子类型
// **					->2B彩虹化
// **					
// **		说明：	> 核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"。
//=============================================================================
//==============================
// * 复杂粒子控制器 - 定义
//==============================
function Drill_COPa_ComplexPar_Controller() {
    this.initialize.apply(this, arguments);
};
Drill_COPa_ComplexPar_Controller.prototype = Object.create(Drill_COPa_BasicPar_Controller.prototype);
Drill_COPa_ComplexPar_Controller.prototype.constructor = Drill_COPa_ComplexPar_Controller;
//==============================
// * 复杂粒子控制器 - 初始化
//==============================
Drill_COPa_ComplexPar_Controller.prototype.initialize = function( data_id ){
	Drill_COPa_BasicPar_Controller.prototype.initialize.call( this, data_id );
};
//##############################
// * 复杂粒子控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_update = function(){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_update.call( this );
	if( this.drill_controller_isPause() == true ){ return; }
																//帧刷新 - 2A粒子类型（无）
																//帧刷新 - 2B彩虹化（无）
};
//##############################
// * 复杂粒子控制器 - 重设数据【标准函数】
//			
//			参数：	> data 动态参数对象
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//					> 参数对象中的参数【可以缺项】，只要的参数项不一样，就刷新；参数项一样，则不变化。
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_resetData = function( data ){
    Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetData.call( this, data );
};
//##############################
// * 复杂粒子控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_setVisible = function( visible ){
    Drill_COPa_BasicPar_Controller.prototype.drill_controller_setVisible.call( this, visible );
};
//##############################
// * 复杂粒子控制器 - 暂停/继续【标准函数】
//
//			参数：	> pause 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_setPause = function( pause ){
    Drill_COPa_BasicPar_Controller.prototype.drill_controller_setPause.call( this, pause );
};
//##############################
// * 复杂粒子控制器 - 控制器标记销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_destroy = function(){
    Drill_COPa_BasicPar_Controller.prototype.drill_controller_destroy.call( this );
};
//##############################
// * 复杂粒子控制器 - 控制器是否销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_isDead = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_controller_isDead.call( this );
};
//==============================
// * 复杂粒子控制器 - 函数枚举
//
//			说明：	> 使用枚举要比字符串比较快很多，适用于大量 延迟指令、周期指令 。
//					> 复杂粒子 复刻了 基础粒子 的全部函数枚举。
//==============================
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_setVisible                   = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setVisible                   ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_setPause                     = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setPause                     ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_periodizeCommand_setPause    = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_setPause    ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_periodizeCommand_clear       = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_clear       ;

Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_setBlendMode                 = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setBlendMode                 ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_setLayerIndex                = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setLayerIndex                ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_setZIndex                    = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setZIndex                    ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_restoreBlendMode             = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreBlendMode             ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_restoreLayerIndex            = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreLayerIndex            ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_restoreZIndex                = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreZIndex                ;

Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_commandChange_setOpacity     = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setOpacity     ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_commandChange_setRotate      = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setRotate      ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_commandChange_setParScaleX   = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleX   ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_commandChange_setParScaleY   = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParScaleY   ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_commandChange_setParRotate   = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParRotate   ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_commandChange_restoreAttr    = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreAttr    ;

Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_commandChange_setMove        = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setMove        ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_commandChange_setParMove     = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove     ;
Drill_COPa_ComplexPar_Controller.METHOD__drill_controller_commandChange_restoreMove    = Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreMove    ;

//==============================
// * A主体 - 切换混合模式（开放函数）
//==============================
// * A主体 - 切换层级（开放函数）
//==============================
// * A主体 - 切换堆叠级（开放函数）
//==============================
// * A主体 - 还原混合模式（开放函数）
//==============================
// * A主体 - 还原层级（开放函数）
//==============================
// * A主体 - 还原堆叠级（开放函数）
//==============================

//##############################
// * 复杂粒子控制器 - 获取数据指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 具体见函数 Drill_COPa_BasicPar_Controller.prototype.drill_data 。
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_data = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_data.call( this );
};
//##############################
// * 复杂粒子控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> data 对象
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_COPa_ComplexPar_Controller.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 @注释定义 的参数）
	
	Drill_COPa_BasicPar_Controller.drill_controller_initData( data );
	
	// > 2A粒子类型
	if( data['parType_type'] == undefined ){ data['parType_type'] = "基础粒子" };						//2A粒子类型 - 粒子类型
	
	// > 2B彩虹化
	if( data['rainbow_enable'] == undefined ){ data['rainbow_enable'] = false };						//2B彩虹化 - 是否开启彩虹化-粒子
	if( data['rainbow_enableSecond'] == undefined ){ data['rainbow_enableSecond'] = false };			//2B彩虹化 - 是否开启彩虹化-第二层粒子
	if( data['rainbow_enableTrailing'] == undefined ){ data['rainbow_enableTrailing'] = false };		//2B彩虹化 - 是否开启彩虹化-直线拖尾
	if( data['rainbow_num'] == undefined ){ data['rainbow_num'] = 20 };									//2B彩虹化 - 彩虹化色彩数量
	if( data['rainbow_lockTint'] == undefined ){ data['rainbow_lockTint'] = false };					//2B彩虹化 - 彩虹化是否锁定色调值
	if( data['rainbow_tintList'] == undefined ){ data['rainbow_tintList'] = [] };						//2B彩虹化 - 锁定的色调值列表
	
};
//==============================
// * 复杂粒子控制器 - 初始化子功能『控制器与贴图』
//			
//			说明：	> 创建该类后直接初始化。
//==============================
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_initChild.call( this );
	this.drill_controller_initParType();			//初始化子功能 - 2A粒子类型
	this.drill_controller_initRainbow();			//初始化子功能 - 2B彩虹化
};

//##############################
// * B变换特性 - 数据最终变换值 - 整体平移X【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_x = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_x.call(this);
};
//##############################
// * B变换特性 - 数据最终变换值 - 整体平移Y【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_y = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_y.call(this);
};
//##############################
// * B变换特性 - 数据最终变换值 - 整体透明度【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_opacity = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_opacity.call(this);
};
//##############################
// * B变换特性 - 数据最终变换值 - 整体旋转【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_rotate = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_rotate.call(this);
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子平移X【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_par_x = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_x.call(this);
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子平移Y【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_par_y = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_y.call(this);
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子缩放X【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_par_scaleX = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_scaleX.call(this);
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子缩放Y【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_par_scaleY = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_scaleY.call(this);
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子旋转【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_par_rotate = function(){
	return Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_rotate.call(this);
};

//##############################
// * J粒子变化 - 帧刷新 - 粒子平移【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_updateTransform_Position = function( i ){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateTransform_Position.call( this, i );
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子缩放【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_updateTransform_Scale = function( i ){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateTransform_Scale.call( this, i );
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子透明度【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_updateTransform_Opacity = function( i ){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateTransform_Opacity.call( this, i );
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子旋转【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_updateTransform_Rotation = function( i ){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_updateTransform_Rotation.call( this, i );
};

//##############################
// * K粒子重设 - 执行重设 - 粒子平移【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetParticles_Position.call( this, i );
};
//##############################
// * K粒子重设 - 执行重设 - 粒子缩放【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_resetParticles_Scale = function( i ){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetParticles_Scale.call( this, i );
};
//##############################
// * K粒子重设 - 执行重设 - 粒子透明度【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_resetParticles_Opacity = function( i ){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetParticles_Opacity.call( this, i );
};
//##############################
// * K粒子重设 - 执行重设 - 粒子旋转【标准函数】
//##############################
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_resetParticles_Rotation = function( i ){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_resetParticles_Rotation.call( this, i );
};


//==============================
// * 2A粒子类型 - 初始化子功能
//==============================
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initParType = function() {
	var data = this.drill_data();
	
	// > 复杂粒子标记
	this._drill_parType_isComplexEnabled = false;
	if( data['parType_type'] == "复杂粒子" ){
		this._drill_parType_isComplexEnabled = true;
	}
};
//==============================
// * 2A粒子类型 - 初始化子功能
//==============================
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_isComplexEnabled = function() {
	return this._drill_parType_isComplexEnabled;
};


//==============================
// * 2B彩虹化 - 初始化子功能
//==============================
Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initRainbow = function() {
	// （无）
};


//=============================================================================
// ** 复杂粒子贴图【Drill_COPa_ComplexPar_Sprite】
// **
// **		作用域：	战斗界面
// **		主功能：	定义一个粒子贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->贴图是否销毁
// **						->贴图执行销毁
// **					
// **					->2A粒子类型
// **					->2B彩虹化
// **					
// **		说明：	> 核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"。
// **				> 你必须在创建贴图后，手动 设置控制器，手动 初始化子功能。
//=============================================================================
//==============================
// * 复杂粒子贴图 - 定义
//==============================
function Drill_COPa_ComplexPar_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_COPa_ComplexPar_Sprite.prototype = Object.create(Drill_COPa_BasicPar_Sprite.prototype);
Drill_COPa_ComplexPar_Sprite.prototype.constructor = Drill_COPa_ComplexPar_Sprite;
//==============================
// * 复杂粒子贴图 - 初始化
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.initialize = function(){
    Drill_COPa_BasicPar_Sprite.prototype.initialize.call( this );
};
//==============================
// * 复杂粒子贴图 - 帧刷新
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.update = function(){
	Drill_COPa_BasicPar_Sprite.prototype.update.call(this);
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
													//帧刷新 - 2A粒子类型（无）
													//帧刷新 - 2B彩虹化（无）
}

//##############################
// * C对象绑定 - 设置控制器【标准函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行手动初始化。
//##############################
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initChild = function(){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initChild.call( this );
	this.drill_sprite_initParType();			//初始化子功能 - 2A粒子类型
	this.drill_sprite_initRainbow();			//初始化子功能 - 2B彩虹化
};

//##############################
// * 复杂粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_isReady = function(){
    return Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_isReady.call( this );
};
//##############################
// * 复杂粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_isOptimizationPassed.call( this );
};
//##############################
// * 复杂粒子贴图 - 贴图是否销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
    return Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_isNeedDestroy.call( this );
};
//##############################
// * 复杂粒子贴图 - 贴图执行销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 复杂粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initSelf.call( this );
};
//==============================
// * 复杂粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_destroyChild.call( this );
	
	// > 销毁 - 2A粒子类型
	//	（无）
	
	// > 销毁 - 2B彩虹化
	//	（无）
};
//==============================
// * 复杂粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_destroySelf.call( this );
};

//##############################
// * J粒子变化 - 帧刷新 - 粒子平移【标准函数】
//##############################
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
	Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Position.call( this, i, time );
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子缩放【标准函数】
//##############################
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_updateTransform_Scale = function( i, time ){
	Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Scale.call( this, i, time );
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子透明度【标准函数】
//##############################
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_updateTransform_Opacity = function( i, time ){
	Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Opacity.call( this, i, time );
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子旋转【标准函数】
//##############################
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_updateTransform_Rotation = function( i, time ){
	Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Rotation.call( this, i, time );
};

//==============================
// * H粒子群弹道 - 推演弹道（继承）
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_refreshBallistics = function( i ){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_refreshBallistics.call( this, i );
	
	// > 2B彩虹化 - 刷新资源色调
	this.drill_sprite_refreshRainBow( i );	//（注意该函数挂载在 H粒子群弹道 上，初始化比彩虹化要早）
};


//==============================
// * 2A粒子类型 - 初始化子功能
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initParType = function() {
	//	（无）
};
//==============================
// * 2A粒子类型 - J粒子变化 - 创建粒子层（继承）
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_createTransformLayer = function() {
	
	// > 复杂粒子 不能用 ParticleContainer
	if( this._drill_controller.drill_controller_isComplexEnabled() ){
		var temp_layer = new Sprite();
		return temp_layer;
	}
	
	// > 原函数
	return Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_createTransformLayer.call(this);
};
//==============================
// * 2A粒子类型 - P直线拖尾贴图 - 创建拖尾层（继承）
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_createTrailingLayer = function() {
	
	// > 复杂粒子 不能用 ParticleContainer
	if( this._drill_controller.drill_controller_isComplexEnabled() ){
		var temp_layer = new Sprite();
		return temp_layer;
	}
	
	// > 原函数
	return Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_createTrailingLayer.call(this);
};


//==============================
// * 2B彩虹化 - 初始化子功能
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initRainbow = function() {
	if( this._drill_controller.drill_controller_isComplexEnabled() == false ){ return; }
	var data = this._drill_controller.drill_data();
	
	// > 彩虹化初始化
	this._drill_rainBow_spriteInited = true;
	this._drill_rainBow_count = 0;
	this._drill_rainBow_tintTank = [];
	
	// > 刷新资源色调
	for( var i = 0; i < data['par_count']; i++ ){
		this.drill_sprite_refreshRainBow( i );
	}
};
//==============================
// * 2B彩虹化 - 刷新资源色调
//==============================
Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_refreshRainBow = function( i ){
	if( this._drill_controller.drill_controller_isComplexEnabled() == false ){ return; }
	var data = this._drill_controller.drill_data();
	
	// > 初始化标记（注意该函数挂载在 H粒子群弹道 上，初始化比彩虹化要早）
	if( this._drill_rainBow_spriteInited != true ){ return; }
	
	// > 计算色调
	var cur_tint = data['tint'];
	if( data['rainbow_lockTint'] == true && data['rainbow_tintList'].length > 0 ){
		var tint_index = Math.floor( this._drill_rainBow_count % data['rainbow_tintList'].length );
		cur_tint += data['rainbow_tintList'][ tint_index ];
	}else{
		var inter = 360 / data['rainbow_num'];
		cur_tint += Math.floor( this._drill_rainBow_count * inter );
	}
	cur_tint = cur_tint%360;
	this._drill_rainBow_count += 1;
	this._drill_rainBow_tintTank[i] = cur_tint;
	
	// > 2B彩虹化 - 粒子
	if( data['rainbow_enable'] == true &&
		this._drill_COPa_parSpriteTank != undefined ){
		var cur_tint = this._drill_rainBow_tintTank[i];
		var cur_bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'], cur_tint, data['smooth'] );
		this._drill_COPa_parSpriteTank[i].bitmap = cur_bitmap;  //（每重设一次，强制赋值一次）
	}
	
	// > 2B彩虹化 - 直线拖尾
	if( data['rainbow_enableTrailing'] == true &&
		this._drill_COPa_trailingSpriteTank != undefined ){
		var cur_tint = this._drill_rainBow_tintTank[i];
		var cur_bitmap = ImageManager.loadBitmap( data['trailing_src_img_file'], data['trailing_src_img'], cur_tint, data['smooth'] );
		this._drill_COPa_trailingSpriteTank[i].bitmap = cur_bitmap;  //（每重设一次，强制赋值一次）
	}
};


//=============================================================================
// ** 复杂粒子第二层贴图【Drill_COPa_ComplexPar_SecSprite】
// **
// **		作用域：	战斗界面
// **		主功能：	定义一个 第二层粒子贴图 。
// **		子功能：	
// **					->贴图（第二层）『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->贴图是否销毁
// **						->贴图执行销毁
// **					
// **					->2A粒子类型
// **					->2B彩虹化
// **					
// **		说明：	> 核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"。
//=============================================================================
//==============================
// * 复杂粒子第二层贴图 - 定义
//==============================
function Drill_COPa_ComplexPar_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_COPa_ComplexPar_SecSprite.prototype = Object.create(Drill_COPa_BasicPar_SecSprite.prototype);
Drill_COPa_ComplexPar_SecSprite.prototype.constructor = Drill_COPa_ComplexPar_SecSprite;
//==============================
// * 复杂粒子第二层贴图 - 初始化
//==============================
Drill_COPa_ComplexPar_SecSprite.prototype.initialize = function( parentSprite ){
	Drill_COPa_BasicPar_SecSprite.prototype.initialize.call( this, parentSprite );
}
//==============================
// * 复杂粒子第二层贴图 - 帧刷新
//==============================
Drill_COPa_ComplexPar_SecSprite.prototype.update = function(){
	Drill_COPa_BasicPar_SecSprite.prototype.update.call(this);
	if( this.drill_spriteSec_isReady() == false ){ return; }
	if( this.drill_spriteSec_isOptimizationPassed() == false ){ return; }
												//帧刷新 - 2A粒子类型（无）
												//帧刷新 - 2B彩虹化（无）
}
//##############################
// * 复杂粒子第二层贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_isReady = function(){
    return Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_isReady.call(this);
};
//##############################
// * 复杂粒子第二层贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
    return Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_isOptimizationPassed.call(this);
};
//##############################
// * 复杂粒子第二层贴图 - 贴图是否销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
	return Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_isNeedDestroy.call(this);
};
//##############################
// * 复杂粒子第二层贴图 - 贴图执行销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroy = function(){
	Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_destroy.call(this);
};
//==============================
// * 复杂粒子第二层贴图 - 初始化子功能『控制器与贴图』
//==============================
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initChild = function(){
	Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initChild.call( this );
	this.drill_spriteSec_initParType();				//初始化子功能 - 2A粒子类型
	this.drill_spriteSec_initRainbow();				//初始化子功能 - 2B彩虹化
};
//==============================
// * 复杂粒子第二层贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_initSelf.call( this, parentSprite );
};
//==============================
// * 复杂粒子第二层贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_destroyChild.call( this );
	
	// > 销毁 - 2A粒子类型
	//	（无）
	
	// > 销毁 - 2B彩虹化
	//	（无）
};
//==============================
// * 复杂粒子第二层贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_destroySelf.call( this );
};

//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子平移【标准函数】
//##############################
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_updateTransform_Position = function( i, time ){
	Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Position.call( this, i, time );
};
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子缩放【标准函数】
//##############################
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_updateTransform_Scale = function( i, time ){
	Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Scale.call( this, i, time );
};
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子透明度【标准函数】
//##############################
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_updateTransform_Opacity = function( i, time ){
	Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Opacity.call( this, i, time );
};
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子旋转【标准函数】
//##############################
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_updateTransform_Rotation = function( i, time ){
	Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_updateTransform_Rotation.call( this, i, time );
	
	// > 2B彩虹化（第二层） - 帧刷新 资源色调
	this.drill_spriteSec_updateRainBow_Tint( i );
};


//==============================
// * 2A粒子类型（第二层） - 初始化子功能
//==============================
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initParType = function() {
	//（无）
};
//==============================
// * 2A粒子类型（第二层） - J粒子变化（第二层） - 创建粒子层（继承）
//==============================
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_createTransformLayer = function() {
	
	// > 复杂粒子 不能用 ParticleContainer
	if( this._drill_controller.drill_controller_isComplexEnabled() ){
		var temp_layer = new Sprite();
		return temp_layer;
	}
	
	// > 原函数
	return Drill_COPa_BasicPar_SecSprite.prototype.drill_spriteSec_createTransformLayer.call(this);
};


//==============================
// * 2B彩虹化（第二层） - 初始化子功能
//==============================
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initRainbow = function() {
	if( this._drill_controller.drill_controller_isComplexEnabled() == false ){ return; }
	
	// > 彩虹化初始化
	this._drill_rainBow_lastTintTank = [];
	
	// > 记录色调值
	var tint_tank = this._drill_parentSprite._drill_rainBow_tintTank;
	for( var i=0; i < tint_tank.length; i++ ){
		this._drill_rainBow_lastTintTank[i] = tint_tank[i];
	}
};
//==============================
// * 2B彩虹化（第二层） - 帧刷新 资源色调
//==============================
Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_updateRainBow_Tint = function( i ){
	if( this._drill_controller.drill_controller_isComplexEnabled() == false ){ return; }
	var p_data = this._drill_controller.drill_data();
	
	// > 2B彩虹化 - 第二层粒子
	if( p_data['rainbow_enableSecond'] == true &&
		this._drill_COPa_parSecSpriteTank != undefined ){
			
		var cur_tint = this._drill_parentSprite._drill_rainBow_tintTank[i];
		if( this._drill_rainBow_lastTintTank[i] != cur_tint ){
			this._drill_rainBow_lastTintTank[i] = cur_tint;
			
			var cur_bitmap = ImageManager.loadBitmap( p_data['src_img_file'], p_data['second_src_img'], cur_tint, p_data['smooth'] );
			this._drill_COPa_parSecSpriteTank[i].bitmap = cur_bitmap;  //（色调值变化时，强制赋值一次）
		}
	}
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_CoreOfParticle = false;
		var pluginTip = DrillUp.drill_COPa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}
