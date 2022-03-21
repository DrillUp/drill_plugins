//=============================================================================
// Drill_EventShatterEffect.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        行走图 - 方块粉碎效果
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventShatterEffect +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得行走图能播放方块状的粉碎效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件不能单独运行，必须要基于核心才能运行：
 * 基于：
 *   - Drill_CoreOfShatterEffect    系统-方块粉碎核心★★v1.3及以上版本★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   只作用于事件行走图。
 * 2.想要更多了解方块粉碎，去看看"1.系统 > 方块粉碎大家族.docx"。
 * 细节：
 *   (1.行走图的粉碎效果不支持镜面反射。
 *   (2.行走图的粉碎效果不支持滤镜。
 *   (3.碎片的效果只在当前地图有效，离开地图失效。
 *   (4.粉碎后，事件的本体还在。你需要手动设置消除或开启独立开关。
 * 设计:
 *   (1.你可以通过插件指令控制碎片不消失，并且隔一段时间执行碎片重组，
 *      以此来设计一个无法击败的怪物。
 *   (2.你可以自定义方块的粉碎公式，以此形成不同的粉碎扩散效果。
 *      其中"方块粉碎[1]"对应 方块粉碎核心 插件中配置的粉碎id。
 *      具体可以去看看 方块粉碎核心。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要设置下列的插件指令，指定某个事件播放粉碎效果：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 本事件 : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 事件[10] : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 事件变量[10] : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 批量事件[10,11,12] : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 批量事件变量[21,22,23] : 方块粉碎[1]
 * 
 * 插件指令：>方块粉碎效果 : 本事件 : 方块粉碎[1]
 * 插件指令：>方块粉碎效果 : 本事件 : 方块反转粉碎[1]
 * 插件指令：>方块粉碎效果 : 本事件 : 立刻复原
 * 
 * 1.前面部分（本事件）和后面设置（方块粉碎[1]）可以随意组合。
 *   一共有5*3种组合方式。
 * 2."方块粉碎[1]"对应 方块粉碎核心 插件中配置的粉碎id。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令快速复原全图的碎片：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 全图事件 : 立刻复原
 * 
 * 1.插件指令能对碎掉的事件有效，未碎的事件不起效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令修改碎片的消失设置：
 * （注意，冒号左右有一个空格）
 * 
 * 插件指令：>方块粉碎效果 : 事件碎片 : 消失方式 : 不消失
 * 插件指令：>方块粉碎效果 : 事件碎片 : 消失方式 : 线性消失
 * 插件指令：>方块粉碎效果 : 事件碎片 : 消失方式 : 等一半时间后线性消失
 * 插件指令：>方块粉碎效果 : 事件碎片 : 消失方式 : 设回默认
 * 
 * 1."设回默认"表示设置为当前当前配置的默认的消失方式。
 * 2.你可以设置碎片不消失，然后使用反转粉碎让地上的碎片重组。
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
 * 时间复杂度： o(n^2)*o(贴图处理)
 * 测试方法：   在地图管理层、消除砖块关卡中测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【115.27ms】
 *              100个事件的地图中，平均消耗为：【94.15ms】
 *               50个事件的地图中，平均消耗为：【76.78ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的 20ms 范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.方块粉碎是性能消耗大户，因为粉碎后图片实际上被分成了m*n块新贴图碎片。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了内部结构，修改了注释内容。
 * [v1.2]
 * 修改了与核心的部分兼容设置。
 * [v1.3]
 * 添加了 全图事件 的粉碎复原指令。
 * [v1.4]
 * 优化了部分细节。
 * 
 * 
 * @param 默认事件碎片消失方式
 * @type select
 * @option 不消失
 * @value 不消失
 * @option 线性消失
 * @value 线性消失
 * @option 等一半时间后线性消失
 * @value 等一半时间后线性消失
 * @desc 碎片消失的方式。
 * @default 等一半时间后线性消失
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		ESE（Event_Shatter_Effect）
//		临时全局变量	无
//		临时局部变量	this._drill_ESE_xxx
//		存储数据变量	$gameMap.drill_ESE_needReflash （不完全算存储，离开地图就被清除重做）
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理)
//		性能测试因素	地图管理层测试粉碎
//		性能测试消耗	115.27ms
//		最坏情况		大量事件同时执行粉碎。
//		备注			粉碎过程消耗比较大，是在图像方面的。
//
//插件记录：
//		★大体框架与功能如下：
//			方块粉碎效果：
//				->粉碎配置
//					->普通粉碎
//					->扩散粉碎
//					->抛物线粉碎
//					->弹道反向
//					->碎片消失
//				->6像素偏移修正
//				->流程中的特殊情况
//					->贴图框架frame				-	bitmap_url/frame.x.y.w.h
//					->镜像屏蔽					-	直接屏蔽
//					->切换菜单时，贴图重建问题	-	贴图同步
//					->粉碎时图像隐藏			-	setFrame(0,0,0,0)
//
//		★必要注意事项：
//			1.使用粉碎前，一定要想明白【贴图框架frame】的分配问题，
//				1) bitmap会不会实时变，是bitmap资源，还是实时bitmap？
//				2) 如果 frameWidth = 0 怎么办？如果bitmap为空怎么办？
//				3) 执行粉碎后，保持粉碎状态是一直持续的，除非执行复原。那么是否要锁定sprite的时间轴？
//				-1- 该插件为资源bitmap，资源变化后，不会立即改变碎片
//				-2- 该插件要杜绝frameWidth=0，建立了缓冲width，bitmap为空时，不会刷新缓冲。
//				-3- 该插件使用 this._drill_ESE['shatter_time'] 锁定了时间轴，存储在事件身上。
//			2.这里的bitmap并没有完全消失，opacity也是255，只是被切割成0了。
//			
//		★其它说明细节：
//			1.由于 事件 和 事件贴图 是并行的关系，重画指令和碎片指令 需要通过 贴图的帧刷新检测 进行传输。
//				事件的变量：this._drill_ESE['xxxx'] 
//				贴图的变量：this._drill_ESE_xxx
//			3."贴图同步"是为了将数据存到事件身上，防止刷菜单、保存时贴图重建，失去了碎片效果。
//			  不过，离开地图事件也会被清掉，所以不考虑。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventShatterEffect = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventShatterEffect');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_ESE_opacityType = String(DrillUp.parameters['默认事件碎片消失方式'] || "等一半时间后线性消失");	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfShatterEffect ){
	

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_ESE_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_ESE_pluginCommand.call(this, command, args);
	if (command === ">方块粉碎效果") { // >方块粉碎效果 : 本事件 : 方块粉碎[1]
		if(args.length == 4){
			var unit = String(args[1]);
			var temp1 = String(args[3]);
			var e_ids = null;
					
			/*-----------------对象组获取------------------*/
			if( unit == "本事件" ){
				e_ids = [ this._eventId ];
			}
			if( e_ids == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( $gameVariables.value(Number(temp_arr[k])) );
				}
			}
			if( e_ids == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				e_ids = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					e_ids.push( Number(temp_arr[k]) );
				}
			}
			if( e_ids == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				e_ids = [ $gameVariables.value(Number(unit)) ];
			}
			if( e_ids == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				e_ids = [ Number(unit) ];
			}
			if( e_ids == null && unit == "全图事件" ){
				var all_e = $gameMap._events;
				e_ids = [];
				for( var i=0; i < all_e.length; i++ ){
					if( !all_e[i] ){ continue; }
					e_ids.push( all_e[i]._eventId );
				}
			}
			
			/*-----------------粉碎操作------------------*/
			if( e_ids && temp1.indexOf("方块粉碎[") != -1 ){
				temp1 = temp1.replace("方块粉碎[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_ESE_isEventExist( e_id ) == false ){ continue; }
					$gameMap.event( e_id ).drill_ESE_playEffect( Number(temp1)-1 );
				}
			}
			if( e_ids && temp1.indexOf("方块反转粉碎[") != -1 ){
				temp1 = temp1.replace("方块反转粉碎[","");
				temp1 = temp1.replace("]","");
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_ESE_isEventExist( e_id ) == false ){ continue; }
					$gameMap.event( e_id ).drill_ESE_playConvertedEffect( Number(temp1)-1 );
				}
			}
			if( e_ids && temp1 == "立刻复原" ){
				for( var k=0; k < e_ids.length; k++ ){
					var e_id = e_ids[k];
					if( $gameMap.drill_ESE_isEventExist( e_id ) == false ){ continue; }
					$gameMap.event( e_id ).drill_ESE_redraw();
				}
			}
		}
		
		/*-----------------消失方式------------------*/
		if(args.length == 6){		//>方块粉碎效果 : 事件碎片 : 消失方式 : 不消失
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "事件碎片" && temp1 == "消失方式" ){
				if( temp2 == "设回默认" ){
					$gameSystem._drill_ESE_opacityType = DrillUp.g_ESE_opacityType;
				}else{
					$gameSystem._drill_ESE_opacityType = temp1;
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_ESE_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_EventShatterEffect.js 行走图 - 方块粉碎效果】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

//=============================================================================
// * 存储数据初始化
//=============================================================================
var _drill_ESE_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_ESE_system_initialize.call(this);
	this._drill_ESE_opacityType = DrillUp.g_ESE_opacityType;
}

//=============================================================================
// * 优化
//=============================================================================
//==============================
// * 优化 - 检查镜像情况
//==============================
Game_Temp.prototype.drill_ESE_isReflectionSprite = function( sprite ){
	if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
	if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
	return false;
}

//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体 - 初始化
//==============================
var _Drill_ESE_c_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function() {
	_Drill_ESE_c_initialize.call(this);
	this._drill_ESE = {};			//不要用initMembers，follower没有这个方法。
	this._drill_ESE['redraw_command'] = false;		//重画指令
	this._drill_ESE['shatter_command'] = false;		//碎片指令
	this._drill_ESE['shatter_id'] = -1;				//当前碎片样式id
	this._drill_ESE['shatter_data'] = {};			//当前碎片样式数据
	this._drill_ESE['shatter_converted'] = false;	//反向弹道
	
	this._drill_ESE['shatter_enable'] = false;		//贴图同步 - 碎片初始化
	this._drill_ESE['shatter_time'] = 0;			//贴图同步 - 碎片当前时间
}
//==============================
// * 物体 - 播放碎片化
//==============================
Game_Character.prototype.drill_ESE_playEffect = function( effect_id ) {
	this._drill_ESE['shatter_command'] = true;
	this._drill_ESE['shatter_id'] = effect_id;
	this._drill_ESE['shatter_converted'] = false;
	this._drill_ESE['shatter_data'] = DrillUp.g_COSE_style_list[ effect_id ];
}
//==============================
// * 物体 - 播放反向碎片化
//==============================
Game_Character.prototype.drill_ESE_playConvertedEffect = function( effect_id ) {
	this._drill_ESE['shatter_command'] = true;
	this._drill_ESE['shatter_id'] = effect_id;
	this._drill_ESE['shatter_converted'] = true;
	this._drill_ESE['shatter_data'] = DrillUp.g_COSE_style_list[ effect_id ];
}
//==============================
// * 物体 - 复原
//==============================
Game_Character.prototype.drill_ESE_redraw = function( effect_id ) {
	this._drill_ESE['redraw_command'] = true;
}

//==============================
// * 物体 - 6像素偏移修正
//==============================
var _Drill_ESE_c_setImage = Game_CharacterBase.prototype.setImage;
Game_CharacterBase.prototype.setImage = function( characterName, characterIndex ){

	var is_obj = this._isObjectCharacter || false;
	if( characterName == undefined ){		//名称修正
		characterName = "";
	}
	
	// > 设置图像
	_Drill_ESE_c_setImage.call(this, characterName, characterIndex);
	
	if( characterName == "" ){
		this._isObjectCharacter = is_obj;	//空白时保持object标记
	}
};

//=============================================================================
// ** 事件贴图
//=============================================================================
//==============================
// * 事件贴图 - 初始化
//==============================
var _Drill_ESE_s_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {
	_Drill_ESE_s_setCharacter.call(this,character);
	if( character ){
		this._drill_ESE = character._drill_ESE;
		this._drill_ESE_id = -1;				//
		this.drill_ESE_initBitmapFrame();		//贴图框架
	};
};

//==============================
// * 事件贴图 - 帧刷新
//==============================
var _Drill_ESE_s_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	
	// > 镜像情况时，直接跳过
	if( $gameTemp.drill_ESE_isReflectionSprite(this) ){
		_Drill_ESE_s_update.call(this);
		return;
	}
	
	// > bitmap识别（必须放前面）
	this.drill_ESE_updateBitmapFrame();
	
	// > 帧刷新
	_Drill_ESE_s_update.call(this);
	
	// > 粉碎指令
	if ( this._character && this._drill_ESE['shatter_command'] == true ) {
		this._drill_ESE['shatter_command'] = false;
		
		if( this._drill_ESE_id != this._drill_ESE['shatter_id'] ){
			this._drill_ESE_id = this._drill_ESE['shatter_id'];
			
			// > 新建粉碎
			this.drill_ESE_createShatterSprite();
			this._drill_ESE['shatter_enable'] = true;							//贴图同步 - 碎片初始化
			this._drill_ESE['shatter_time'] = this._drill_COSE_curTime;			//贴图同步 - 碎片当前时间
			
		}else{
			// > 控制旧粉碎
			if( this._drill_ESE['shatter_converted'] == true ){	//时间进度重置
				this._drill_ESE['shatter_time'] = this._drill_COSE_data['movementTime']-1;
			}else{
				this._drill_ESE['shatter_time'] = 0;
			}	
		}
	}
	
	// > 切换菜单时，贴图重建问题
	if( this._drill_ESE_bitmap &&
		this._drill_ESE_bitmap.isReady() &&
		this._drill_COSE_data['enable'] == false &&
		this._drill_ESE['shatter_enable'] == true ){
		
		this.drill_ESE_createShatterSprite();		//重建粉碎
	}
	
	// > 贴图同步 - 粉碎时间
	if ( this._character ){
		if( this._drill_ESE['shatter_converted'] == true ){
			this._drill_ESE['shatter_time'] -= 1;
		}else{
			this._drill_ESE['shatter_time'] += 1;
		}
		this._drill_COSE_curTime = this._drill_ESE['shatter_time'];		//真正控制时间的是shatter_time，覆盖了核心的cur_time
	}
	
	// > 粉碎时图像隐藏
	if( this.drill_COSE_isShattering() ){
		this.setFrame(0,0,0,0);		//由于行走图会实时控制frame，所以不需要考虑粉碎结束后的复原
	}
	
	// > 复原指令
	if ( this._character && this._drill_ESE['redraw_command'] == true ) {
		this._drill_ESE['redraw_command'] = false;
		this._drill_ESE_id = -1;						//去掉当前的碎片记录
		this._drill_ESE['shatter_enable'] = false;		//关闭该插件的开关
		this.drill_COSE_restoreShatter();				//方块粉碎核心 - 复原
	}
};
//==============================
// * 事件贴图 - 创建碎片（过程）
//==============================
Sprite_Character.prototype.drill_ESE_createShatterSprite = function() {
		//注意，这里的函数，是直接取材于当前的data内容，是一个过程函数
	
	var data = {
		"frameX":this._drill_ESE_frame_x,		//与行走图类型无关
		"frameY":this._drill_ESE_frame_y,
		"frameW":this._drill_ESE_frame_w,
		"frameH":this._drill_ESE_frame_h,
		"shatter_id":this._drill_ESE['shatter_id'],							//粉碎样式
		"shatter_converted":this._drill_ESE['shatter_converted'],			//反向弹道
		"shatter_opacityType":$gameSystem._drill_ESE_opacityType,			//透明度变化方式
	};
	this.drill_COSE_setShatter( data,this._drill_ESE_bitmap );				//方块粉碎核心 - 初始化
}
//=============================================================================
// ** 贴图框架
//=============================================================================
//==============================
// * 贴图框架 - 初始化
//==============================
Sprite_Character.prototype.drill_ESE_initBitmapFrame = function() {
	this._drill_ESE_bitmap = null;			//框架 - obj对象
	this._drill_ESE_bitmap_url = "";		//框架 - 资源路径
	this._drill_ESE_frame_x = -1;			//框架 - x
	this._drill_ESE_frame_y = -1;			//框架 - y
	this._drill_ESE_frame_w = 0;			//框架 - w
	this._drill_ESE_frame_h = 0;			//框架 - h
}
//==============================
// * 贴图框架 - bitmap识别（必须放前面）
//==============================
Sprite_Character.prototype.drill_ESE_updateBitmapFrame = function() {
	if( this.bitmap &&
		this.bitmap.isReady() &&
		(	this._drill_ESE_bitmap_url != this.bitmap._url ||
			this._drill_ESE_frame_x != this._realFrame.x ||
			this._drill_ESE_frame_y != this._realFrame.y ||
			this._drill_ESE_frame_w != this._realFrame.width ||
			this._drill_ESE_frame_h != this._realFrame.height )
		){
		this._drill_ESE_bitmap_url = this.bitmap._url;
		
		if( this._drill_ESE_bitmap_url != "" && 
			this._realFrame.width != 0 &&
			this._realFrame.height != 0 ){
			this._drill_ESE_bitmap = this.bitmap;				//记录行走图数据，确保变成空行走图时，不会丢失bitmap
			this._drill_ESE_frame_x = this._realFrame.x;		//与行走图类型无关
			this._drill_ESE_frame_y = this._realFrame.y;
			this._drill_ESE_frame_w = this._realFrame.width;
			this._drill_ESE_frame_h = this._realFrame.height;
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventShatterEffect = false;
		alert(
			"【Drill_EventShatterEffect.js 行走图-方块粉碎效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfShatterEffect 系统-方块粉碎核心"
		);
}



