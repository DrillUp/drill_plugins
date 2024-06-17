//=============================================================================
// Drill_PictureLayerAndZIndex.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        图片 - 层级与堆叠级
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureLayerAndZIndex +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令修改图片的 层级或堆叠级。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfPicture            图片-图片优化核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片对象。
 * 2.你可以了解一下基础文档： "0.基本定义 > 界面.docx"
 *   详细内容可以去看看 "16.图片 > 关于图片优化核心.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 图片层级：
 *   (1.图片可以切换三个层级：图片对象层、图片层 和 最顶层。
 *      图片对象层为图片原来所在层级，图片层 在 图片对象层 的上面。
 *      最顶层能够挡住 对话框和UI ，地图界面、战斗界面都有效。
 *      具体介绍可以去看看 "16.图片 > 关于图片优化核心.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过下面插件指令来设置层级：
 * 
 * 插件指令：>图片的层级与堆叠级 : 图片[1] : 设置层级 : 最顶层
 * 插件指令：>图片的层级与堆叠级 : 图片变量[21] : 设置层级 : 最顶层
 * 插件指令：>图片的层级与堆叠级 : 批量图片[4,5] : 设置层级 : 最顶层
 * 插件指令：>图片的层级与堆叠级 : 批量图片变量[21,22] : 设置层级 : 最顶层
 * 
 * 插件指令：>图片的层级与堆叠级 : 图片[1] : 设置层级 : 最顶层
 * 插件指令：>图片的层级与堆叠级 : 图片[1] : 设置层级 : 图片层
 * 插件指令：>图片的层级与堆叠级 : 图片[1] : 设置层级 : 图片对象层
 * 插件指令：>图片的层级与堆叠级 : 图片[1] : 设置堆叠级 : 堆叠级[10]
 * 插件指令：>图片的层级与堆叠级 : 图片[1] : 设置堆叠级 : 堆叠级[12.5]
 * 插件指令：>图片的层级与堆叠级 : 图片[1] : 恢复默认层级和堆叠级
 * 
 * 1.前半部分（图片[1]）和 后半部分（切换图片层级 : 图片层）的参数
 *   可以随意组合。一共有4*6种组合方式。
 * 2.图片对象层为图片原来所在层级，图片层 在 图片对象层 的上面。
 *   最顶层能够挡住 对话框和UI ，地图界面、战斗界面都有效。
 * 3.图片的堆叠级默认为图片id值。
 *   图片的堆叠级可以为小数，设置"堆叠级[12.5]"表示该图片插入在
 *   图片12和图片13之间。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   图片管理层放置10个图片，控制多个并测试。
 * 测试结果：   战斗界面中，平均消耗为：【5ms以下】
 *              200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.因为图片的数量不多，所以图片根据堆叠级进行排序的消耗也少。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PLAZ（Picture_Layer_And_ZIndex）
//		临时全局变量	DrillUp.g_PLAZ_xxx
//		临时局部变量	this._drill_PLAZ_xxx
//		存储数据变量	$gameSystem._drill_PLAZ_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	图片管理层
//		★性能测试消耗	2024/5/2：
//							》由于继承，消耗被转移到 图片优化核心 中。
//							》3.6ms（drill_COPi_updateZIndex）
//		★最坏情况		暂无
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
//			
//			->☆图片的属性
//				> 层级
//				> 堆叠级
//			->☆图片贴图控制
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
	DrillUp.g_PLAZ_PluginTip_curName = "Drill_PictureLayerAndZIndex.js 图片-层级与堆叠级";
	DrillUp.g_PLAZ_PluginTip_baseList = [
		"Drill_CoreOfPicture.js 图片-图片优化核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_PLAZ_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_PLAZ_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_PLAZ_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_PLAZ_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_PLAZ_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到图片
	//==============================
	DrillUp.drill_PLAZ_getPluginTip_PictureNotFind = function( pic_id ){
		return "【" + DrillUp.g_PLAZ_PluginTip_curName + "】\n插件指令错误，id为"+pic_id+"的图片还没被创建。\n你可能需要将指令放在'显示图片'事件指令之后。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_PictureLayerAndZIndex = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_PictureLayerAndZIndex');
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfPicture ){
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_PLAZ_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_PLAZ_pluginCommand.call( this, command, args );
	if( command == ">图片的层级与堆叠级" ){ 
		
		/*-----------------对象组获取------------------*/
		var pics = null;			// 图片对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( pics == null && unit.indexOf("批量图片[") != -1 ){
				unit = unit.replace("批量图片[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = Number(temp_arr[k]);
					if( $gameScreen.drill_PLAZ_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && unit.indexOf("批量图片变量[") != -1 ){
				unit = unit.replace("批量图片变量[","");
				unit = unit.replace("]","");
				pics = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var pic_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameScreen.drill_PLAZ_isPictureExist( pic_id ) == false ){ continue; }
					var p = $gameScreen.picture( pic_id );
					pics.push( p );
				}
			}
			if( pics == null && unit.indexOf("图片变量[") != -1 ){
				unit = unit.replace("图片变量[","");
				unit = unit.replace("]","");
				var pic_id = $gameVariables.value(Number(unit));
				if( $gameScreen.drill_PLAZ_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
			if( pics == null && unit.indexOf("图片[") != -1 ){
				unit = unit.replace("图片[","");
				unit = unit.replace("]","");
				var pic_id = Number(unit);
				if( $gameScreen.drill_PLAZ_isPictureExist( pic_id ) == false ){ return; }
				var p = $gameScreen.picture( pic_id );
				pics = [ p ];
			}
		}
		
		/*-----------------设置层级------------------*/
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( pics != null ){
				if( type == "切换图片层级" && (temp1 == "图片对象层" || temp1 == "图片层" || temp1 == "最顶层" ) ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PLAZ_setLayer( temp1 );
					}
				}
				if( type == "设置层级" && (temp1 == "图片对象层" || temp1 == "图片层" || temp1 == "最顶层" ) ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PLAZ_setLayer( temp1 );
					}
				}
				if( type == "设置堆叠级" ){
					temp1 = temp1.replace("堆叠级[","");
					temp1 = temp1.replace("]","");
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PLAZ_setZIndex( Number(temp1) );
					}
				}
			}
		}
		if( args.length == 4 ){
			var type = String(args[3]);
			if( pics != null ){
				if( type == "恢复默认层级和堆叠级" ){
					for( var k=0; k < pics.length; k++ ){
						pics[k].drill_PLAZ_restore();
					}
				}
			}
		}
		
	}
};
//==============================
// * 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PLAZ_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( DrillUp.drill_PLAZ_getPluginTip_PictureNotFind( pic_id ) );
		return false;
	}
	return true;
};
	
	
	
//=============================================================================
// ** ☆图片的属性
//
//			说明：	> 此模块专门定义 图片的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片的属性 - 初始化
//==============================
var _drill_PLAZ_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(){
	this._drill_PLAZ_data = undefined;		//（要放前面，不然会盖掉子类的设置）
	_drill_PLAZ_initialize.call(this);
}
//==============================
// * 图片的属性 - 初始化 数据（私有）
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//==============================
Game_Picture.prototype.drill_PLAZ_checkData = function(){	
	if( this._drill_PLAZ_data != undefined ){ return; }
	this._drill_PLAZ_data = {};
	this._drill_PLAZ_data['layer'] = "图片对象层";
	this._drill_PLAZ_data['zIndex'] = this.drill_COPi_getPictureId();	//（注意，该赋值不能放初始化中执行）
}
//==============================
// * 图片的属性 - 删除数据（私有）
//==============================
Game_Picture.prototype.drill_PLAZ_removeData = function(){
	this._drill_PLAZ_data = undefined;
	$gameTemp.drill_COPi_needRefreshSpriteLayer();	//（刷新层级）
	$gameTemp.drill_COPi_needRefreshSpriteZIndex();	//（刷新堆叠级）
}
//==============================
// * 图片的属性 - 消除图片
//==============================
var _drill_PLAZ_p_erase = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function(){
	_drill_PLAZ_p_erase.call( this );
	this.drill_PLAZ_removeData();								//（删除数据）
}
//==============================
// * 图片的属性 - 消除图片（command235）
//==============================
var _drill_PLAZ_p_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function( pictureId ){
    var realPictureId = this.realPictureId(pictureId);
	var picture = this._pictures[realPictureId];
	if( picture != undefined ){
		picture.drill_PLAZ_removeData();						//（删除数据）
	}
	_drill_PLAZ_p_erasePicture.call( this, pictureId );
}

//==============================
// * 图片的属性 - 设置层级（开放函数）
//==============================
Game_Picture.prototype.drill_PLAZ_setLayer = function( layer ){
	this.drill_PLAZ_checkData();
	this._drill_PLAZ_data['layer'] = layer;
	$gameTemp.drill_COPi_needRefreshSpriteLayer();	//（刷新层级）
	$gameTemp.drill_COPi_needRefreshSpriteZIndex();	//（刷新堆叠级）
}
//==============================
// * 图片的属性 - 设置堆叠级（开放函数）
//==============================
Game_Picture.prototype.drill_PLAZ_setZIndex = function( zIndex ){
	this.drill_PLAZ_checkData();
	this._drill_PLAZ_data['zIndex'] = zIndex;
	$gameTemp.drill_COPi_needRefreshSpriteZIndex();	//（刷新堆叠级）
}
//==============================
// * 图片的属性 - 恢复默认（开放函数）
//==============================
Game_Picture.prototype.drill_PLAZ_restore = function(){
	this.drill_PLAZ_checkData();
	this._drill_PLAZ_data['layer'] = "图片对象层";
	this._drill_PLAZ_data['zIndex'] = this.drill_COPi_getPictureId();
	$gameTemp.drill_COPi_needRefreshSpriteLayer();	//（刷新层级）
	$gameTemp.drill_COPi_needRefreshSpriteZIndex();	//（刷新堆叠级）
}
	
	
//=============================================================================
// ** ☆图片贴图控制
//
//			说明：	> 此模块控制 图片 的层级和堆叠级。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图片贴图控制 - 设置层级时（继承）
//==============================
var _drill_PLAZ_whenRefreshLayer = Game_Temp.prototype.drill_COPi_whenRefreshLayer;
Game_Temp.prototype.drill_COPi_whenRefreshLayer = function( temp_sprite, picture_id ){
	_drill_PLAZ_whenRefreshLayer.call( this, temp_sprite, picture_id );
	
	var picture = temp_sprite.picture();
	if( picture == undefined ){ return; }
	if( picture._drill_PLAZ_data == undefined ){ return; }
	
	// > 设置层级
	temp_sprite._drill_layer = picture._drill_PLAZ_data['layer'];
}
//==============================
// * 图片贴图控制 - 设置堆叠级时（继承）
//==============================
var _drill_PLAZ_whenRefreshZIndex = Game_Temp.prototype.drill_COPi_whenRefreshZIndex;
Game_Temp.prototype.drill_COPi_whenRefreshZIndex = function( temp_sprite, picture_id ){
	_drill_PLAZ_whenRefreshZIndex.call( this, temp_sprite, picture_id );
	
	var picture = temp_sprite.picture();
	if( picture == undefined ){ return; }
	if( picture._drill_PLAZ_data == undefined ){ return; }
	
	// > 设置堆叠级
	temp_sprite.zIndex = picture._drill_PLAZ_data['zIndex'];
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureLayerAndZIndex = false;
		var pluginTip = DrillUp.drill_PLAZ_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


