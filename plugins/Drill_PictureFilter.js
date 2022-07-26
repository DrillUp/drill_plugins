//=============================================================================
// Drill_PictureFilter.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        图片 - 滤镜效果
 * @author Drill_up
 *
 * 
 * @help  
 * =============================================================================
 * +++ Drill_PictureFilter +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以给放置的图片添加滤镜效果。
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfFilter        系统-滤镜核心
 *     需要该核心才能启用滤镜效果。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面。
 *   作用于图片对象。
 * 2.想要了解更多滤镜效果，去看看 "1.系统 > 大家族-滤镜效果.docx"。
 * 滤镜：
 *   (1.纯色滤镜、着色滤镜……等 相互独立，且效果可以相互叠加。
 *      添加滤镜的先后顺序不同，能产生不同的叠加效果。
 *   (2.波动纯色滤镜 与 纯色滤镜 是同一个滤镜，只是变化方式不同。
 *      二者指令会相互覆盖。
 *   (3.消除图片时，滤镜会自动关闭，
 *      不过还是要养成随时手动关闭滤镜的习惯。
 * 设计：
 *   (1.图片切换不同颜色滤镜时，最好先淡出滤镜，再切换。
 *      避免瞬间切换的不自然。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令设置滤镜：
 * （注意，冒号左右两边有空格）
 *
 * 插件指令：>图片滤镜 : 图片[1] : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>图片滤镜 : 图片变量[1] : 纯色滤镜 : 纯黑 : 155 : 60
 * 
 * 插件指令：>图片滤镜 : 图片[1] : 纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 纯色滤镜 : 纯蓝 : 155 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 纯色滤镜 : 纯绿 : 155 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 纯色滤镜 : 纯红 : 155 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 纯色滤镜 : 黄色 : 155 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 纯色滤镜 : 紫色 : 155 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 纯色滤镜 : 青色 : 155 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 纯色滤镜 : 关闭滤镜
 * 
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 黑白 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 反色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 鲜艳 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 漂白 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 饱和度降低 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 古墨水画色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 古铜色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 宝丽来相机色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 红绿蓝翻转 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 夜色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 致幻色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 完全反色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 过量橘黄 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 红色通道 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 绿色通道 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 蓝色通道 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 红色通道反色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 绿色通道反色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 蓝色通道反色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 着色滤镜 : 关闭滤镜
 * 
 * 插件指令：>图片滤镜 : 图片[1] : 填充滤镜 : 纯黑 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 填充滤镜 : 纯蓝 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 填充滤镜 : 纯绿 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 填充滤镜 : 纯红 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 填充滤镜 : 黄色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 填充滤镜 : 紫色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 填充滤镜 : 青色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 填充滤镜 : 纯白 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 填充滤镜 : #dd99ff : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 填充滤镜 : 关闭滤镜
 * 
 * 插件指令：>图片滤镜 : 图片[1] : 模糊滤镜 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 模糊滤镜 : 关闭滤镜
 * 插件指令：>图片滤镜 : 图片[1] : 噪点滤镜 : 155 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 噪点滤镜 : 关闭滤镜
 * 
 * 1.前半部分（图片）和 后半部分（纯色滤镜）的参数可以随意组合。
 *   一共有2*42种组合方式。
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
 * 插件指令：>图片滤镜 : 图片[1] : 波动纯色滤镜 : 纯黑 : 155 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 波动纯色滤镜 : 关闭滤镜
 * 插件指令：>图片滤镜 : 图片[1] : 波动着色滤镜 : 鲜艳 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 波动着色滤镜 : 关闭滤镜
 * 插件指令：>图片滤镜 : 图片[1] : 波动填充滤镜 : 青色 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 波动填充滤镜 : 关闭滤镜
 * 插件指令：>图片滤镜 : 图片[1] : 波动模糊滤镜 : 255 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 波动模糊滤镜 : 关闭滤镜
 * 插件指令：>图片滤镜 : 图片[1] : 波动噪点滤镜 : 155 : 60
 * 插件指令：>图片滤镜 : 图片[1] : 波动噪点滤镜 : 关闭滤镜
 * 
 * 1.只要在滤镜类型前加"波动"二字即可。
 *   注意，后面两个参数表示为：程度0-255、周期（波动一次所需时间，单位帧） 
 * 2.波动滤镜为瞬间变化，所以不存在"出场后变化"注释指令。
 * 3.填充滤镜设置中，你可以填自定义颜色的颜色代码。
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
 * 测试方法：   在不同管理层打开3张图片，加上滤镜效果，检测性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【98.62ms】
 *              100个事件的地图中，平均消耗为：【68.87ms】
 *               50个事件的地图中，平均消耗为：【57.46ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的【20ms】范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.滤镜是性能消耗大户，因为带滤镜的图片效果都是通过即时演算形成的。
 *   性能测试中并不能准确找到该插件的消耗量，只能通过update总消耗量相减来
 *   进行估算。所以误差会比较大。
 * 3.可能是由于图片在界面中显示较大，使用滤镜效果时消耗的图像处理计算较多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了滤镜内核。
 * [v1.2]
 * 分离了滤镜核心，大幅度优化了底层结构。
 * 添加了填充滤镜功能，降低了模糊滤镜的性能消耗。
 * [v1.3]
 * 添加了插件指令图片检查。
 * [v1.4]
 * 添加了 关闭滤镜 的插件指令。
 * [v1.5]
 * 修复了图片消除后，滤镜没有关闭的bug。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		PFi（Picture_Filter）
//		临时全局变量	无
//		临时局部变量	this._drill_PFi
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)*o(滤镜) 每帧
//		★性能测试因素	对话管理层 的图片
//		★性能测试消耗	57.46ms ~ 68.87ms
//		★最坏情况		同时加10张以上的大图片，并加滤镜效果。
//		★备注			在性能测试中，完全找不到该插件的身影……
//						全是靠开图片和不开估算的。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			图片滤镜效果：
//				->绑定于图片
//				->（滤镜核）优化，滤镜/滤镜板用到的时候才new
//
//		★必要注意事项：
//			1.滤镜核详细内容，去见Drill_EnemyFilter。
//
//		★其它说明细节：
//			1.图片的结构有点不一样，默认的图片先建立100个sprite。
//				
//		★存在的问题：
//			暂无
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_PictureFilter = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_PictureFilter');

	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfFilter ){

	
//=============================================================================
// ** 插件指令
//=============================================================================
var _drill_PFi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_PFi_pluginCommand.call(this, command, args);
	if( command === ">图片滤镜" ){		// >图片滤镜 : 图片[10] : 纯色滤镜 : 纯蓝 : 155 : 60
		
		/*-----------------对象获取------------------*/
		var pic = null;
		if( args.length >= 2 ){
			var pic_id = String(args[1]);
			
			if( pic_id.indexOf("图片变量[") != -1 ){
				pic_id = pic_id.replace("图片变量[","");
				pic_id = pic_id.replace("]","");
				pic_id = $gameVariables.value( Number(pic_id) );
				if( $gameScreen.drill_PFi_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
				
			}else if( pic_id.indexOf("图片[") != -1 ){
				pic_id = pic_id.replace("图片[","");
				pic_id = pic_id.replace("]","");
				pic_id = Number(pic_id);
				if( $gameScreen.drill_PFi_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
				
			}else{
				pic_id = Number(pic_id);
				if( $gameScreen.drill_PFi_isPictureExist( pic_id ) == false ){ return; }
				pic = $gameScreen.picture( pic_id );
			}
		}
		
		/*-----------------滤镜设置------------------*/
		if( pic != null && (args.length == 8 || args.length == 10) ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( args[9] != undefined ){ var temp3 = String(args[9]); }
			
			if( type == "纯色滤镜" ){
				pic._drill_PFi.openFilter = true;
				pic._drill_PFi.dataPureLinear = [ String(temp1),Number(temp2),Number(temp3) ];
			}
			if( type == "着色滤镜" ){
				pic._drill_PFi.openFilter = true;
				pic._drill_PFi.dataColorLinear = [ String(temp1),Number(temp2),Number(temp3) ];
			}
			if( type == "填充滤镜" ){
				pic._drill_PFi.openFilter = true;
				pic._drill_PFi.dataFillLinear = [ String(temp1),Number(temp2),Number(temp3) ];
			}
			if( type == "模糊滤镜" ){
				pic._drill_PFi.openFilter = true;
				pic._drill_PFi.dataBlurLinear = [ Number(temp1),Number(temp2) ];
			}
			if( type == "噪点滤镜" ){
				pic._drill_PFi.openFilter = true;
				pic._drill_PFi.dataNoiseLinear = [ Number(temp1),Number(temp2) ];
			}
			if( type == "波动纯色滤镜" ){
				pic._drill_PFi.openFilter = true;
				pic._drill_PFi.dataPureWave = [ String(temp1),Number(temp2),Number(temp3) ];
			}
			if( type == "波动着色滤镜" ){
				pic._drill_PFi.openFilter = true;
				pic._drill_PFi.dataColorWave = [ String(temp1),Number(temp2),Number(temp3) ];
			}
			if( type == "波动填充滤镜" ){
				pic._drill_PFi.openFilter = true;
				pic._drill_PFi.dataFillWave = [ String(temp1),Number(temp2),Number(temp3) ];
			}
			if( type == "波动模糊滤镜" ){
				pic._drill_PFi.openFilter = true;
				pic._drill_PFi.dataBlurWave = [ Number(temp1),Number(temp2) ];
			}
			if( type == "波动噪点滤镜" ){
				pic._drill_PFi.openFilter = true;
				pic._drill_PFi.dataNoiseWave = [ Number(temp1),Number(temp2) ];
			}
		}
		
		/*-----------------关闭滤镜------------------*/
		if( pic != null && args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			
			if( type == "纯色滤镜" && temp1 == "关闭滤镜" ){
				pic._drill_PFi.dataPureLinear = [ "纯黑", 0, 1 ];
			}
			if( type == "着色滤镜" && temp1 == "关闭滤镜" ){
				pic._drill_PFi.dataColorLinear = [ "黑白", 0, 1 ];
			}
			if( type == "填充滤镜" && temp1 == "关闭滤镜" ){
				pic._drill_PFi.dataFillLinear = [ "纯黑", 0, 1 ];
			}
			if( type == "模糊滤镜" && temp1 == "关闭滤镜" ){
				pic._drill_PFi.dataBlurLinear = [ 0, 1 ];
			}
			if( type == "噪点滤镜" && temp1 == "关闭滤镜" ){
				pic._drill_PFi.dataNoiseLinear = [ 0, 1 ];
			}
			if( type == "波动纯色滤镜" && temp1 == "关闭滤镜" ){
				pic._drill_PFi.dataPureWave = [ "纯黑", 0, 1 ];
			}
			if( type == "波动着色滤镜" && temp1 == "关闭滤镜" ){
				pic._drill_PFi.dataColorWave = [ "黑白", 0, 1 ];
			}
			if( type == "波动填充滤镜" && temp1 == "关闭滤镜" ){
				pic._drill_PFi.dataFillWave = [ "纯黑", 0, 1 ];
			}
			if( type == "波动模糊滤镜" && temp1 == "关闭滤镜" ){
				pic._drill_PFi.dataBlurWave = [ 0, 1 ];
			}
			if( type == "波动噪点滤镜" && temp1 == "关闭滤镜" ){
				pic._drill_PFi.dataNoiseWave = [ 0, 1 ];
			}
		}
	}
};
//==============================
// ** 插件指令 - 图片检查
//==============================
Game_Screen.prototype.drill_PFi_isPictureExist = function( pic_id ){
	if( pic_id == 0 ){ return false; }
	
	var pic = this.picture( pic_id );
	if( pic == undefined ){
		alert( "【Drill_PictureFilter.js 图片 - 滤镜效果】\n" +
				"插件指令错误，id为"+pic_id+"的图片还没被创建。\n" + 
				"你可能需要将指令放在'显示图片'事件指令之后。");
		return false;
	}
	return true;
};

//=============================================================================
// ** 图片
//=============================================================================
//==============================
// * 图片 - 初始化
//==============================
var _drill_PFi_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
	_drill_PFi_initialize.call(this);
	this._drill_PFi = {};
	this._drill_PFi.openFilter = false;
	
	this._drill_PFi.dataPureLinear = ["",0,0];	//临时赋值用的数组
	this._drill_PFi.dataColorLinear = ["",0,0];
	this._drill_PFi.dataFillLinear = ["",0,0];
	this._drill_PFi.dataBlurLinear = [0,0];
	this._drill_PFi.dataNoiseLinear = [0,0];
	this._drill_PFi.dataPureWave = ["",0,0];
	this._drill_PFi.dataColorWave = ["",0,0];
	this._drill_PFi.dataFillWave = ["",0,0];
	this._drill_PFi.dataBlurWave = [0,0];
	this._drill_PFi.dataNoiseWave = [0,0];
};

//=============================================================================
// ** 图片贴图
//=============================================================================
//==============================
// * 图片贴图 - 初始化
//==============================
var _drill_PFi_sp_initialize = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function( pictureId ){
	_drill_PFi_sp_initialize.call( this, pictureId );
	this._drill_PFi_filterOpened = false;		//滤镜开启标记（部分情况下 图片贴图的存活时间比数据的 要长）
}
//==============================
// * 图片贴图 - 帧刷新
//==============================
var _drill_PFi_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
	_drill_PFi_update.call(this);
	this.drill_PFi_updateOpenTag();			//帧刷新 - 开启标记
	this.drill_PFi_updatePicture();			//帧刷新 - 滤镜
}
//==============================
// * 帧刷新 - 开启标记
//==============================
Sprite_Picture.prototype.drill_PFi_updateOpenTag = function() {
	var temp_picData = this.picture();
	if( temp_picData == undefined ){ return; }
	if( temp_picData._drill_PFi.openFilter == true ){
		this._drill_PFi_filterOpened = true;
	}
}
//==============================
// * 帧刷新 - 滤镜
//==============================
Sprite_Picture.prototype.drill_PFi_updatePicture = function() {
	if( this.bitmap == null ){ return; }
	if( this._drill_PFi_filterOpened == false ){ return; }
	
	// > 图片数据情况
	var temp_sprite = this;
	var temp_picData = this.picture();
	if( temp_picData == undefined ){
		
		// > 没有绑定图片数据时，关闭滤镜
		data = [ "纯黑", 0, 1 ];
		temp_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
		data = [ "黑白", 0, 1 ];
		temp_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
		data = [ "纯黑", 0, 1 ];
		temp_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
		data = [ 0, 1 ];
		temp_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
		data = [ 0, 1 ];
		temp_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
		
		data = [ "纯黑", 0, 1 ];
		temp_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
		data = [ "黑白", 0, 1 ];
		temp_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
		data = [ "纯黑", 0, 1 ];
		temp_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
		data = [ 0, 1 ];
		temp_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
		data = [ 0, 1 ];
		temp_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
	}
	
	// > 初始化
	if( temp_sprite.drill_COF_isInited() == false ){
		temp_sprite.drill_COF_initialize();
	}
	var data;
	
	// > 插件指令配置 - 线性
	data = temp_picData._drill_PFi.dataPureLinear;	
	temp_sprite.drill_COF_setPureLinear_ONCE(data[0],data[1],data[2]);
	data = temp_picData._drill_PFi.dataColorLinear;
	temp_sprite.drill_COF_setColorLinear_ONCE(data[0],data[1],data[2]);
	data = temp_picData._drill_PFi.dataFillLinear;
	temp_sprite.drill_COF_setFillLinear_ONCE(data[0],data[1],data[2]);
	data = temp_picData._drill_PFi.dataBlurLinear;
	temp_sprite.drill_COF_setBlurLinear_ONCE(data[0],data[1]);
	data = temp_picData._drill_PFi.dataNoiseLinear;
	temp_sprite.drill_COF_setNoiseLinear_ONCE(data[0],data[1]);
	
	// > 插件指令配置 - 波动
	data = temp_picData._drill_PFi.dataPureWave;	
	temp_sprite.drill_COF_setPureWave_ONCE(data[0],data[1],data[2]);
	data = temp_picData._drill_PFi.dataColorWave;
	temp_sprite.drill_COF_setColorWave_ONCE(data[0],data[1],data[2]);
	data = temp_picData._drill_PFi.dataFillWave;
	temp_sprite.drill_COF_setFillWave_ONCE(data[0],data[1],data[2]);
	data = temp_picData._drill_PFi.dataBlurWave;
	temp_sprite.drill_COF_setBlurWave_ONCE(data[0],data[1]);
	data = temp_picData._drill_PFi.dataNoiseWave;
	temp_sprite.drill_COF_setNoiseWave_ONCE(data[0],data[1]);
		
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_PictureFilter = false;
		alert(
			"【Drill_PictureFilter.js 图片 - 滤镜效果】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfFilter 系统-滤镜核心"
		);
}
	

