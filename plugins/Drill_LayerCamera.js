//=============================================================================
// Drill_LayerCamera.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        地图 - 活动地图镜头
 * @author Drill_up
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerCamera +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以操作地图镜头的 镜头移动、镜头翻转、镜头缩放/旋转 功能。
 * ★★最好放在 多层地图背景 插件后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 插件由于控制了镜头的缩放大小，对所有UI控件相关插件有影响。
 * 被扩展：
 *   - Drill_CoreOfMoveRoute   物体-移动路线核心
 *   - Drill_EventSound        物体-事件的声音
 *   - Drill_MouseTriggerEvent 鼠标-鼠标触发事件 ★★v1.3及以上版本★★
 *   - Drill_MouseGridPointer  鼠标-网格指向标
 *   - Drill_MouseIllumination 鼠标-自定义照明效果
 *   - Drill_OperateHud        互动-鼠标辅助操作面板 ★★v1.6及以上版本★★
 *   - Drill_GaugeForVariable  UI - 高级变量固定框 ★★v1.6及以上版本★★
 *     上述插件，都可以在镜头缩放时，做相应的变换支持。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 * 2.如果想了解镜头更多的内容，去看看 "6.地图 > 关于地图活动镜头.docx"。
 * 镜头移动：
 *   (1.弹性移动 和 平滑移动，会对rmmv中的 移动 > 滚动地图 指令 有影响。
 *      滚动地图指令结束后会立即弹回玩家中心。
 *      如果要防止弹回中心，你需要修改移动模式为"默认移动"。
 *   (2.平滑移动，穿过循环地图边缘时，可能会出现镜头不稳定的小问题。
 *   (3."立刻看向目标位置"可以使得你将镜头瞬移到目标位置。
 *      如果你将玩家瞬移到很远的地方，镜头默认会慢慢拖移过去，这是用立刻
 *      看向的指令可以消除违和感。
 * 镜头缩放/旋转：
 *   (1.镜头缩放/旋转 改变的只有地图层贴图。ui、窗口、图片都不属于地图。
 *   (2.镜头缩放/旋转 最好只作为临时性的过场动画使用。
 *   (3.镜头缩放 和 镜头旋转 不能 同时使用。
 *   (5.旋转、缩放时能够看见未填充的图块边缘，属于正常情况。
 *      这是由于rmmv的内部机制，每块图块根据方形镜头区域一个个拼上去的。
 *      你可以设置"缩小镜头时加强刷新量"，只是会比较消耗计算量。
 *   (6.缩放时，由于事件贴图是分开渲染的，可能在一体化事件之间出现非常微
 *      小的缝隙（只有1个像素的缝隙），为了避免这些问题，你需要使得缩放的
 *      图块为整数。原为48像素，那么 48*0.500=24，48*0.625=30，这些比例可
 *      以避免缝隙。而比例0.600会造成许多缝隙。
 * 镜头翻转：
 *   (1.镜头翻转分为水平翻转、垂直翻转、顺时针翻转、逆时针翻转。
 *      翻转后，鼠标点的位置与图像是相反的，键盘也是相反的。
 *   (2.水平垂直翻转 和 缩放 原理一样，可以叠加，但是不能和旋转同用。
 *      顺逆时针翻转 和 旋转 原理一样，可以叠加，但是不能和缩放同用。
 *   (3.镜头翻转同时只能处于一种翻转状态。
 *      比如，处于水平翻转状态时，其它翻转动作都无法执行。
 *   (4.镜头翻转时，你可以看到黑色图块边缘，以及离镜头较远的事件。属正常
 *      现象。
 * 镜头锁定/看向指定位置：
 *   (1.看向指定位置/事件，只对 平滑移动和弹性移动 有效。
 *   (2.锁定镜头后，将不受玩家移动影响，你可以用这种镜头设计固定路线。
 * 镜头墙：
 *   (1.镜头墙，只对 平滑移动和弹性移动 有效。
 *   (2.镜头墙是一种阻止镜头单向上/下/左/右移动的墙，若玩家越过了墙壁线，
 *      则镜头将不再受阻止。
 *   (3.事件注释设置不跨事件页，切换无相关注释的事件页后，墙会被关闭。
 * 视野触发：
 *   (1.当指定事件进入视野范围内之后，触发指定的独立开关。
 *   (2.视野触发设置跨事件页，并且长期有效。
 *   (3.视野范围为固定的矩形区域范围，只有进入了矩形视野，事件才会被触发。
 *      通过控制镜头缩放的边角、旋转的边角看到的视野事件，都不会被触发。
 * 设计：
 *   (1.将镜头稍微旋转12度，有很多特殊代入效果，比如摇晃的船只、塌陷的斜坡、
 *      某种震击地面技能造成的整个世界倾斜的特效。
 *   (2.你可以用镜头墙设置洞穴中或者墙壁帘幕后面隐藏的房间。
 *   (3.由于镜头墙是绑定在事件上的，如果该事件在不断移动，可以以此做机关
 *      逼近的镜头地图。配合视野触发功能，能够对漏单的玩家进行惩罚。
 *   (4.你可以设置看向指定位置/事件，用于某些远程操控物体的游戏环节。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头移动
 * 你可以通过插件指令修改镜头的模式：
 *
 * 插件指令：>地图镜头 : 设置镜头移动模式 : 默认移动
 * 插件指令：>地图镜头 : 设置镜头移动模式 : 平滑移动
 * 插件指令：>地图镜头 : 设置镜头移动模式 : 弹性移动
 * 插件指令：>地图镜头 : 设置弹性模式移动速度 : 10
 * 插件指令：>地图镜头 : 设置弹性模式镜头速度上限 : 24
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头缩放/旋转
 * 你可以通过插件指令设置镜头缩放：
 * 
 * 插件指令：>地图镜头 : 缩放X : 1.50 : 时间[60]
 * 插件指令：>地图镜头 : 缩放Y : 1.50 : 时间[60]
 * 插件指令：>地图镜头 : 缩放X : 0.50 : 时间[60]
 * 插件指令：>地图镜头 : 缩放Y : 0.50 : 时间[60]
 * 插件指令：>地图镜头 : 旋转 : 180 : 时间[60]
 * 
 * 1.缩放前一个数字表示缩放比例，后一个数字表示缩放持续时间，单位帧。
 *   1.50表示镜头放大50%，只能看见实际范围的四分之一。
 *   0.50表示镜头缩小50%，能看见实际范围的四倍。
 *   缩放后永久有效，要记得恢复1.00缩放比例。
 *   比例不要设置太小，不然会出问题。
 * 2.旋转前一个数字表示旋转角度，后一个数字表示旋转持续时间，单位帧。
 *   旋转正数顺时针，也可为负数。
 * 3.缩放 和 旋转 不能 同时使用。
 * 4.缩放/旋转变化只有匀速。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头翻转
 * 你可以通过插件指令设置镜头翻转：
 * 
 * 插件指令：>地图镜头 : 水平翻转 : 时间[60] : 匀速
 * 插件指令：>地图镜头 : 垂直翻转 : 时间[60] : 匀速
 * 插件指令：>地图镜头 : 顺时针翻转 : 时间[60] : 匀速
 * 插件指令：>地图镜头 : 逆时针翻转 : 时间[60] : 匀速
 * 插件指令：>地图镜头 : 水平翻转 : 时间[60] : 平滑
 * 插件指令：>地图镜头 : 垂直翻转 : 时间[60] : 平滑
 * 插件指令：>地图镜头 : 顺时针翻转 : 时间[60] : 平滑
 * 插件指令：>地图镜头 : 逆时针翻转 : 时间[60] : 平滑
 * 插件指令：>地图镜头 : 水平翻转 : 时间[60] : 弹性
 * 插件指令：>地图镜头 : 垂直翻转 : 时间[60] : 弹性
 * 插件指令：>地图镜头 : 顺时针翻转 : 时间[60] : 弹性
 * 插件指令：>地图镜头 : 逆时针翻转 : 时间[60] : 弹性
 * 
 * 插件指令：>地图镜头 : 恢复翻转 : 时间[60] : 匀速
 * 插件指令：>地图镜头 : 恢复翻转 : 时间[60] : 平滑
 * 插件指令：>地图镜头 : 恢复翻转 : 时间[60] : 弹性
 * 
 * 1.数字表示翻转的时间，单位帧。
 * 2.注意，翻转只能处于一种状态。比如顺时针翻转后。其它翻转指令完全失效。
 *   只有恢复翻转后，才能进行其它翻转操作。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头锁定
 * 你可以通过插件指令设置镜头被锁定在当前位置：
 * 
 * 插件指令：>地图镜头 : 锁定镜头
 * 插件指令：>地图镜头 : 解锁镜头
 * 
 * 插件指令：>地图镜头 : 固定看向 : 本事件
 * 插件指令：>地图镜头 : 固定看向 : 事件[13]
 * 插件指令：>地图镜头 : 固定看向 : 事件变量[13]
 * 插件指令：>地图镜头 : 固定看向 : 玩家位置
 * 插件指令：>地图镜头 : 固定看向 : 位置[20,20]
 * 插件指令：>地图镜头 : 固定看向 : 位置变量[21,22]
 * 插件指令：>地图镜头 : 解除固定看向
 * 
 * 插件指令：>地图镜头 : 立刻看向目标位置
 * 
 * 1.锁定后的镜头完全固定，不受任何干扰。
 * 2.你可以使镜头固定看向指定位置的XY坐标，不受玩家干扰。
 *   (变量)是指变量的值对应的XY坐标。
 *   注意，固定看向位置只对 平滑移动和弹性移动 的镜头有效。
 * 3."玩家位置"是指玩家当前的XY坐标，固定后不再随玩家移动。
 * 4.如果上述的两种插件指令如果同时使用，那么锁定镜头优先。
 * 5.如果你不想出现镜头移动到目标的过程，你可以在设置看向位置后，
 *   执行"立刻看向目标位置"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头墙
 * 你可以通过事件注释，设置地图指定的镜头墙：
 * 
 * 事件注释：=>地图镜头 : 设置镜头墙 : 上
 * 事件注释：=>地图镜头 : 设置镜头墙 : 下
 * 事件注释：=>地图镜头 : 设置镜头墙 : 左
 * 事件注释：=>地图镜头 : 设置镜头墙 : 右
 *
 * 1.一个事件充当一面墙，形成一个房间的镜头墙，需要四个事件。
 *   一般隐藏房间只需要一面镜头墙就可以。
 * 2.一个事件可以设置多面墙，同时含左右镜头墙，可以形成隔墙效果。
 *   如果要关闭墙，切换事件页即可。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 视野触发
 * 你可以通过事件注释，设置指定事件进入视野范围内触发：
 * 
 * 事件注释：=>地图镜头 : 进入视野 : 触发独立开关 : A
 * 事件注释：=>地图镜头 : 离开视野 : 关闭独立开关 : A
 * 
 * 1.插件固定为进入视野开启开关，离开视野关闭开关。
 * 2.注释只能设置一个独立开关，如果事件页中同时写了A开关的注释 和
 *   B开关的注释，那么将以B开关为准。
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
 * 时间复杂度： o(n^2)
 * 测试方法：   去物体管理层、地理管理层、镜像管理层跑一圈测试。
 * 测试结果：   200个事件的地图中，消耗为：【18.74ms】
 *              100个事件的地图中，消耗为：【14.84ms】
 *               50个事件的地图中，消耗为：【12.37ms】
 * 测试方法2：  建立10个镜头墙，测试消耗。
 * 测试结果2：   50个事件的地图中，消耗为：【14.02ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.镜头墙会稍微增加一点计算量，因为要持续判断玩家与镜头位置。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了"缩小镜头时加强刷新量"功能。
 * [v1.2]
 * 添加了镜头锁定、看向指定位置功能。
 * [v1.3]
 * 添加了插件性能测试说明。
 * [v1.4]
 * 添加了固定看向事件、镜头墙、视野触发功能。
 * [v1.5]
 * 修改了插件指令格式，并且旧的插件指令仍然可以使用。
 * [v1.6]
 * 添加了缩放时的参数获取，与相关子插件关联。
 * 添加了"立刻看向目标位置"功能。
 * [v1.7]
 * 修复了镜头在移动过程中，事件抖动的问题。
 * （感谢p1伙伴"开关关"https://rpg.blue/thread-480641-1-1.html。）
 * [v1.8]
 * 修复了镜头翻转时偏移的bug。
 * 
 * 
 * 
 * @param 缩小镜头时是否加强刷新量
 * @type boolean
 * @on 加强
 * @off 关闭
 * @desc 地图的图块是一块块拼上去的，如果缩小镜头，将看到更多的图块。设置后，强制刷新看得见的图块。
 * @default true
 *
 * @param 镜头移动模式
 * @type select
 * @option 默认移动
 * @value 默认移动
 * @option 平滑移动
 * @value 平滑移动
 * @option 弹性移动
 * @value 弹性移动
 * @desc 镜头移动到玩家位置的模式。
 * @default 弹性移动
 *
 * @param 弹性模式移动速度
 * @parent 镜头移动模式
 * @type number
 * @min 1
 * @desc 弹性模式的速度为比例除数，值越小，速度越快。
 * @default 14
 *
 * @param 弹性模式镜头速度上限
 * @parent 镜头移动模式
 * @type number
 * @min 1
 * @desc 弹性模式的最大速度，单位帧/像素。用于防止镜头移动速度太快，眼花。
 * @default 24
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LCa（Layer_Camera）
//		临时全局变量	DrillUp.g_LCa_xxx
//		临时局部变量	this._drill_LCa_xxx
//		存储数据变量	$gameSystem._drill_LCa_xxx
//		全局存储变量	无
//		覆盖重写方法	Game_Player.prototype.updateScroll
//
//		工作类型		单次执行
//		时间复杂度		o(n^2)
//		性能测试因素	镜像管理层
//		性能测试消耗	18.74ms 23.85ms
//		最坏情况		暂无
//		备注			消耗虽然很小，但是总能找到。移动镜头、翻转镜头没有明显的消耗。
//
//插件记录：
//		★大体框架与功能如下：
//			地图镜头：
//				->镜头移动
//					->平滑移动
//					->弹性移动
//				->镜头旋转
//					->翻转的镜头
//					x->摇晃的镜头（不稳定的xy平移）	
//				->镜头缩放
//					->缩小图块问题
//					->缩放的鼠标修正
//					->缩放的地图背景修正（需要放 多层地图背景 插件后面）
//				->镜头锁定
//					->看向指定的图块		
//					->看向指定的事件
//				->镜头墙
//				->视野触发
//
//		★必要注意事项：
//			1.【该插件使用了事件容器】，必须考虑三种情况：初始化、切换地图时、切换贴图时，不然会出现指针错误！
//				只要是装事件的容器，都需要考虑指针问题，不管是放在$gameMap还是$gameTemp中。
//				另外，帧刷新判断时，最好每次变化直接【重刷容器】。
//			2.【该插件的缩放功能近似于核心】，许多子插件都要进行缩放转换控制，可能会关联许多与地图坐标相关的内容。
//	
//		★其它说明细节：
//			1.镜头实际上只操作 地图Spriteset_Map（继承于Spriteset_Base）。
//			2.Spriteset_Map无法设置圆心，所以只能通过修改xy圆形的坐标位置，再进行一次逆旋转。
//			  通过逆旋转，把圆心0,0变成实际圆心(w/2,h/2)
//			3.另外，这个旋转、缩放的变化过程，使得翻转的过程分支了一大堆if，使得代码变得非常不好看。
//			4.【地图实际镜头，是_displayX控制的】，Spriteset_Map的xy完全属于例外变量。
//			5.地图缩小时，刷新范围是受限的。通过控制下面三个参数来设置。
//				this._tilemap._width
//				this._tilemap._height
//				this._tilemap._margin
//				由于直接触及到了最底层core，这里没有覆写，只是添加功能。
//
//		★存在的问题：
//			1.翻转时，会看到图块的拼接过程。（缩放已解决，旋转未处理。）
//			2.由于镜头平移关系，目前镜头设置偏移量非常麻烦，目前xy相关平移不考虑，以免平移非常难看。
//			3.镜头最大的问题，在于圆心的问题。
//			  只有单独的sprite才能设置圆心，tilemap和循环贴图都没有圆心。
//			  旋转的时候问题也大，这相当于指数形式让公式越来越复杂（通过数学转换部分解决，但是仍然存在问题）

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerCamera = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerCamera');


	/*-----------------杂项------------------*/
    DrillUp.g_LCa_type = String(DrillUp.parameters['镜头移动模式'] || '弹性移动');
    DrillUp.g_LCa_speedRatio = Number(DrillUp.parameters['弹性模式移动速度'] || 10);
    DrillUp.g_LCa_speedMax = Number(DrillUp.parameters['弹性模式镜头速度上限'] || 24);
    DrillUp.g_LCa_forceRefresh = String(DrillUp.parameters['缩小镜头时是否加强刷新量'] || "true") == "true";


//=============================================================================
// ** 存储数据
//=============================================================================
//==============================
// ** 存储数据 - 初始化
//==============================
var _drill_LCa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LCa_sys_initialize.call(this);
	this.drill_LCa_initData();
};
//==============================
// ** 存储数据 - 初始化数据
//==============================
Game_System.prototype.drill_LCa_initData = function() {
    this._drill_LCa_type = DrillUp.g_LCa_type ;					//镜头移动模式
    this._drill_LCa_speedRatio = DrillUp.g_LCa_speedRatio ;		//移动速度
    this._drill_LCa_speedMax = DrillUp.g_LCa_speedMax ;			//速度上限
	
	this._drill_LCa_sX = {}			// 缩放x
	this._drill_LCa_sX.cur = 0;		//	cur = -0.1，则缩放为0.9
	this._drill_LCa_sX.move = 0;	//
	this._drill_LCa_sX.time = 0;	//
	this._drill_LCa_sY = {}			// 缩放y
	this._drill_LCa_sY.cur = 0;		//
	this._drill_LCa_sY.move = 0;	//
	this._drill_LCa_sY.time = 0;	//
	this._drill_LCa_R = {}			// 旋转
	this._drill_LCa_R.cur = 0;		//
	this._drill_LCa_R.move = 0;		//
	this._drill_LCa_R.time = 0;		//
	
    this._drill_LCa_flip = {};			//翻转控制
    this._drill_LCa_flip.lock = false;	//
	
    this._drill_LCa_locked = false;		//固定看向
    this._drill_LCa_lookAt_X = -1;		//看向图块x
    this._drill_LCa_lookAt_Y = -1;		//看向图块y
    this._drill_LCa_lookAt_event = -1;	//看向事件
};	
//==============================
// * 存档文件 - 载入存档 - 数据赋值
//==============================
var _drill_LCa_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents){
	_drill_LCa_extractSaveContents.call( this, contents );
	
	if( $gameSystem._drill_LCa_sX == undefined ){	//（空数据时，强制赋值）
		$gameSystem.drill_LCa_initData();
	}
};
//==============================
// * 缩放参数
//==============================
Game_System.prototype.drill_LCa_curScaleX = function() {		//当前镜头x缩放
	return 1 + this._drill_LCa_sX.cur;
}
Game_System.prototype.drill_LCa_curScaleY = function() {		//当前镜头y缩放
	return 1 + this._drill_LCa_sY.cur;
}
Game_System.prototype.drill_LCa_cameraToMapX = function(x) {	//当前镜头的x -> 缩放后的x
	var cur_scale = this.drill_LCa_curScaleX();
	x = x / cur_scale;
	x -= (Graphics.boxWidth / cur_scale - Graphics.boxWidth)/2;
	return Math.round(x);
}
Game_System.prototype.drill_LCa_cameraToMapY = function(y) {	//当前镜头的y -> 缩放后的y
	var cur_scale = this.drill_LCa_curScaleY();
	y = y / cur_scale;
	y -= (Graphics.boxHeight / cur_scale - Graphics.boxHeight)/2;
	return Math.round(y);
}
Game_System.prototype.drill_LCa_mapToCameraX = function(x) {	//当前缩放的x -> 镜头的x
	var cur_scale = this.drill_LCa_curScaleX();
	x += (Graphics.boxWidth / cur_scale - Graphics.boxWidth)/2;
	x = x * cur_scale;
	return Math.round(x);
}
Game_System.prototype.drill_LCa_mapToCameraY = function(y) {	//当前缩放的y -> 镜头的y
	var cur_scale = this.drill_LCa_curScaleY();
	y += (Graphics.boxHeight / cur_scale - Graphics.boxHeight)/2;
	y = y * cur_scale;
	return Math.round(y);
}


//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LCa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LCa_pluginCommand.call(this, command, args);
	
	if (command === ">地图镜头") {
		
		/*-----------------镜头锁定------------------*/
		if(args.length == 2){
			var type = String(args[1]);
			if(type == "锁定镜头"){
				$gameSystem._drill_LCa_locked = true;
			}
			if(type == "解锁镜头"){
				$gameSystem._drill_LCa_locked = false;
			}
			if(type == "解除固定看向"){
				$gameSystem._drill_LCa_lookAt_X = -1;
				$gameSystem._drill_LCa_lookAt_Y = -1;
				$gameSystem._drill_LCa_lookAt_event = -1;
			}
			if(type == "立刻看向目标位置"){
				$gameTemp._drill_LCa_lookAt_immediately = true;
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var unit = String(args[3]);
			if( type == "固定看向" ){
				if( unit == "本事件" ){
					var e_id = this._eventId;
					$gameSystem._drill_LCa_lookAt_X = -1;
					$gameSystem._drill_LCa_lookAt_Y = -1;
					if( $gameMap.drill_LCa_isEventExist( e_id ) == false ){ return; }
					$gameSystem._drill_LCa_lookAt_event = e_id;
				}
				if( unit == "玩家位置" ){
					var e_id = this._eventId;
					$gameSystem._drill_LCa_lookAt_X = $gamePlayer.x;
					$gameSystem._drill_LCa_lookAt_Y = $gamePlayer.y;
					$gameSystem._drill_LCa_lookAt_event = -1;
				}
				if( unit.indexOf("事件[") != -1 ){
					unit = unit.replace("事件[","");
					unit = unit.replace("]","");
					var e_id = Number(unit);
					$gameSystem._drill_LCa_lookAt_X = -1;
					$gameSystem._drill_LCa_lookAt_Y = -1;
					if( $gameMap.drill_LCa_isEventExist( e_id ) == false ){ return; }
					$gameSystem._drill_LCa_lookAt_event = e_id;
				}
				if( unit.indexOf("事件变量[") != -1 ){
					unit = unit.replace("事件变量[","");
					unit = unit.replace("]","");
					var e_id = $gameVariables.value(Number(unit));
					$gameSystem._drill_LCa_lookAt_X = -1;
					$gameSystem._drill_LCa_lookAt_Y = -1;
					if( $gameMap.drill_LCa_isEventExist( e_id ) == false ){ return; }
					$gameSystem._drill_LCa_lookAt_event = e_id;
				}
				if( unit.indexOf("位置[") != -1 ){
					unit = unit.replace("位置[","");
					unit = unit.replace("]","");
					var pos = unit.split(/[,，]/);
					if( pos.length >=2 ){
						$gameSystem._drill_LCa_lookAt_X = Number(pos[0]);
						$gameSystem._drill_LCa_lookAt_Y = Number(pos[1]);
						$gameSystem._drill_LCa_lookAt_event = -1;
					}
				}
				if( unit.indexOf("位置变量[") != -1 ){
					unit = unit.replace("位置变量[","");
					unit = unit.replace("]","");
					var pos = unit.split(/[,，]/);
					if( pos.length >=2 ){
						$gameSystem._drill_LCa_lookAt_X = Number(pos[0]);
						$gameSystem._drill_LCa_lookAt_Y = Number(pos[1]);
						$gameSystem._drill_LCa_lookAt_event = -1;
					}
				}
			}
		}
		
		/*-----------------镜头移动------------------*/
		if(args.length == 4){	 // >地图镜头 : 设置镜头移动模式 : 默认移动
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if(type == "设置镜头移动模式"){
				$gameSystem._drill_LCa_type = temp1;
			}
			if(type == "设置弹性模式移动速度"){
				$gameSystem._drill_LCa_speedRatio = Number(temp1);
			}
			if(type == "设置弹性模式镜头速度上限"){
				$gameSystem._drill_LCa_speedMax = Number(temp1);
			}
		}
		/*-----------------镜头缩放/旋转------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			temp1 = temp1.replace("时间[","");
			temp1 = temp1.replace("]","");
			temp2 = temp2.replace("时间[","");
			temp2 = temp2.replace("]","");
			if( (type == "顺时针翻转" || type == "逆时针翻转") && $gameSystem._drill_LCa_flip.lock == false){
				$gameSystem._drill_LCa_flip.type = type;
				$gameSystem._drill_LCa_flip.back = false;
				$gameSystem._drill_LCa_flip.mode = temp2;
				$gameSystem._drill_LCa_flip.time = Number(temp1);
				$gameSystem._drill_LCa_flip.move = 0;
				$gameSystem._drill_LCa_flip.lock = true;
			}
			if( (type == "水平翻转" || type == "垂直翻转") && $gameSystem._drill_LCa_flip.lock == false){
				$gameSystem._drill_LCa_flip.type = type;
				$gameSystem._drill_LCa_flip.back = false;
				$gameSystem._drill_LCa_flip.mode = temp2;
				$gameSystem._drill_LCa_flip.time = Number(temp1);
				$gameSystem._drill_LCa_flip.move = 0;
				$gameSystem._drill_LCa_flip.lock = true;
			}
			if( type == "恢复翻转" && $gameSystem._drill_LCa_flip.lock == true ){
				$gameSystem._drill_LCa_flip.back = true;
				$gameSystem._drill_LCa_flip.mode = temp2;
				$gameSystem._drill_LCa_flip.time = Number(temp1);
				$gameSystem._drill_LCa_flip.move = Number(temp1);
			}
			if( type == "缩放X" ){
				$gameSystem._drill_LCa_sX.move = 0;
				$gameSystem._drill_LCa_sX.time = Math.max(Number(temp2),1);
				$gameSystem._drill_LCa_sX.speed = (Number(temp1) -1 - $gameSystem._drill_LCa_sX.cur)/$gameSystem._drill_LCa_sX.time;
			}
			if( type == "缩放Y" ){
				$gameSystem._drill_LCa_sY.move = 0;
				$gameSystem._drill_LCa_sY.time = Math.max(Number(temp2),1);
				$gameSystem._drill_LCa_sY.speed = (Number(temp1) -1 - $gameSystem._drill_LCa_sY.cur)/$gameSystem._drill_LCa_sY.time;
			}
			if( type == "旋转" ){
				$gameSystem._drill_LCa_R.move = 0;
				$gameSystem._drill_LCa_R.time = Math.max(Number(temp2),1);
				$gameSystem._drill_LCa_R.speed = (Number(temp1) - $gameSystem._drill_LCa_R.cur)/$gameSystem._drill_LCa_R.time;
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_LCa_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_LayerCamera.js 地图 - 活动地图镜头】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};

//=============================================================================
// ** 事件注释初始化
//=============================================================================
var _drill_LCa_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_LCa_c_setupPageSettings.call(this);
	this._drill_LCa_wall = [];		//不跨事件页
	if(!this._drill_LCa_sightOn) { this._drill_LCa_sightOn = ""; }	//跨事件页
	if(!this._drill_LCa_sightOff){ this._drill_LCa_sightOff = ""; }
	
	var page = this.page();
    if( page ) {
		this.list().forEach(function(l) {	//将页面注释转成插件指令格式
			if (l.code === 108) {
				var args = l.parameters[0].split(' ');
				var command = args.shift();
				
				if (command == "=>地图镜头" ){
					if( args.length == 4 ){
						if(args[1]){ var type = String(args[1]);}
						if(args[3]){ var temp1 = String(args[3]);}
						if ( type == "设置镜头墙"){
							this._drill_LCa_wall.push(temp1);
							$gameTemp._drill_LCa_needRefresh = true;
						}
					}
					if( args.length == 6 ){
						if(args[1]){ var type = String(args[1]);}
						if(args[3]){ var type2 = String(args[3]);}
						if(args[5]){ var temp1 = String(args[5]);}
						if ( type == "进入视野" && type2 == "触发独立开关"){
							this._drill_LCa_sightOn = temp1;
							$gameTemp._drill_LCa_needRefresh = true;
						}
						if ( type == "离开视野" && type2 == "关闭独立开关"){
							this._drill_LCa_sightOff = temp1;
							$gameTemp._drill_LCa_needRefresh = true;
						}
					}
				};  
			};
		}, this);
    }
}

//=============================================================================
// ** 事件容器
//=============================================================================
//==============================
// * 容器 - 初始化
//==============================
var _drill_LCa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_LCa_temp_initialize.call(this);
	this._drill_LCa_wallEvents = [];		//含镜头墙的事件
	this._drill_LCa_sightEvents = [];		//含视野触发的事件
	this._drill_LCa_needRefresh = true;
	
	this._drill_LCa_pixel_fix_x = 0;		//像素补正值
	this._drill_LCa_pixel_fix_y = 0;		//
};
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_LCa_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_LCa_wallEvents = [];		//含镜头墙的事件
	$gameTemp._drill_LCa_sightEvents = [];		//含视野触发的事件
	$gameTemp._drill_LCa_needRefresh = true;
	_drill_LCa_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_LCa_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_LCa_wallEvents = [];
	$gameTemp._drill_LCa_sightEvents = [];
	$gameTemp._drill_LCa_needRefresh = true;
	_drill_LCa_smap_createCharacters.call(this);
}
//==============================
// ** 容器 - 帧刷新
//==============================
var _drill_LCa_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_LCa_map_update.call(this,sceneActive);
	
	this.drill_LCa_refreshSwitchChecks();
};
//==============================
// ** 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_LCa_refreshSwitchChecks = function() {
	if( !$gameTemp._drill_LCa_needRefresh ){ return }
	$gameTemp._drill_LCa_needRefresh = false;
	
	var events = this.events();
	$gameTemp._drill_LCa_wallEvents = [];
	$gameTemp._drill_LCa_sightEvents = [];
	for (var i = 0; i < events.length; i++) {  
		var temp_event = events[i];
		if( temp_event._drill_LCa_wall != null && 
			temp_event._drill_LCa_wall.length != 0){
			$gameTemp._drill_LCa_wallEvents.push(temp_event);
		}
		if( temp_event._drill_LCa_sightOn != null && 
			temp_event._drill_LCa_sightOn != "") {
			$gameTemp._drill_LCa_sightEvents.push(temp_event);
		}
		if( temp_event._drill_LCa_sightOff != null && 
			temp_event._drill_LCa_sightOff != "") {
			$gameTemp._drill_LCa_sightEvents.push(temp_event);
		}
	}
}


//=============================================================================
// ** 镜头属性
//=============================================================================
//==============================
// * 镜头属性 - 缩放地图的鼠标修正
//==============================
var _drill_LCa_g_canvasToMapX = Game_Map.prototype.canvasToMapX;
Game_Map.prototype.canvasToMapX = function( x ) {
	x = $gameSystem.drill_LCa_cameraToMapX( x );
	return _drill_LCa_g_canvasToMapX.call(this,x);
};

var _drill_LCa_g_canvasToMapY = Game_Map.prototype.canvasToMapY;
Game_Map.prototype.canvasToMapY = function( y ) {
	y = $gameSystem.drill_LCa_cameraToMapY( y );
	return _drill_LCa_g_canvasToMapY.call(this,y);
};

//==============================
// * 镜头属性 - 固定帧初始值
//==============================
var _drill_LCa_updatePosition = Spriteset_Map.prototype.updatePosition;
Spriteset_Map.prototype.updatePosition = function() {
	_drill_LCa_updatePosition.call(this);				// x、y、z、缩放x、缩放y
	if( this.rotation != 0 ){ this.rotation = 0; }		// 旋转
	if( this.skew.x != 0 ){ this.skew.x = 0; }			// 斜切x
	if( this.skew.y != 0 ){ this.skew.y = 0; }			// 斜切y
														//Spriteset_Map的中心锚点没有效果，且rotation被锁定为（0,0）中心点位置，这里索性固定中心点为(0,0)。
}
//==============================
// * 镜头属性 - 帧刷新
//==============================
var _drill_LCa_updatePosition2 = Spriteset_Map.prototype.updatePosition;
Spriteset_Map.prototype.updatePosition = function() {
	_drill_LCa_updatePosition2.call(this);				
	
	this._drill_LCa_change_rotation = 0;	//旋转
	this._drill_LCa_change_sizeX = 1;		//缩放x
	this._drill_LCa_change_sizeY = 1;		//缩放y
	
	this.drill_LCa_resize();				//缩放操作
	this.drill_LCa_rotate();				//旋转操作
	this.drill_LCa_flip();					//翻转控制
	this.drill_LCa_lockAnchor();			//锁定锚点
	this.drill_LCa_tileResize();			//图块填充（缩放比例适应）
};
//==============================
// * 镜头属性 - 缩放
//==============================
Spriteset_Map.prototype.drill_LCa_resize = function() {
	var re_x = $gameSystem._drill_LCa_sX;
	var re_y = $gameSystem._drill_LCa_sY;
	re_x.move += 1;
	re_y.move += 1;
	
	if( re_x.move <= re_x.time ){ re_x.cur += re_x.speed; }
	if( re_y.move <= re_y.time ){ re_y.cur += re_y.speed; }
	
	if( re_x.move > re_x.time ){ re_x.cur = Number(re_x.cur.toFixed(4)); } //比例吸附（保留4位有效数字）
	if( re_y.move > re_y.time ){ re_y.cur = Number(re_y.cur.toFixed(4)); }
	
	this._drill_LCa_change_sizeX += re_x.cur;
	this._drill_LCa_change_sizeY += re_y.cur;
}
//==============================
// * 镜头属性 - 旋转
//==============================
Spriteset_Map.prototype.drill_LCa_rotate = function() {
	var re_r = $gameSystem._drill_LCa_R;
	re_r.move += 1;
	
	if( re_r.move <= re_r.time ){
		re_r.cur += re_r.speed;
	}
	
	this._drill_LCa_change_rotation += ( re_r.cur /180.0 )*Math.PI;
}
//==============================
// * 镜头属性 - 锁定锚点
//==============================
Spriteset_Map.prototype.drill_LCa_lockAnchor = function() {
	
	//if( this._drill_LCa_change_rotation != 0 ){
	//	var ww = Graphics.boxWidth/2;
	//	var hh = Graphics.boxHeight/2;
	//	var r = Math.sqrt( Math.pow(ww,2) + Math.pow(hh,2) );
	//	var p_degree = Math.atan(hh/ww);
	//	p_degree = Math.PI - p_degree;
	//	this.x += r*Math.cos( this._drill_LCa_change_rotation - p_degree);
	//	this.y += r*Math.sin( this._drill_LCa_change_rotation - p_degree);
	//	this.x += Graphics.boxWidth/2 ;
	//	this.y += Graphics.boxHeight/2 ;
	//	this.rotation = this._drill_LCa_change_rotation;
	//}
	//if( this._drill_LCa_change_sizeX != 1 || this._drill_LCa_change_sizeY != 1 ){
	//	this.scale.x = this._drill_LCa_change_sizeX;
	//	this.scale.y = this._drill_LCa_change_sizeY;
	//	this.x += Graphics.boxWidth/2 * (1 - this._drill_LCa_change_sizeX ) ;
	//	this.y += Graphics.boxHeight/2 * (1 - this._drill_LCa_change_sizeY ) ;
	//}
	
	var rotation = this._drill_LCa_change_rotation;
	var scale_x = this._drill_LCa_change_sizeX;
	var scale_y = this._drill_LCa_change_sizeY;
	if( rotation == 0 && scale_x == 1 && scale_y == 1 ){ return; } 
	
	// > 锚点(0.5,0.5)锁定
	var fix_point = $gameTemp.drill_LCa_getFixPointInAnchor( 0,0, 0.5,0.5, Graphics.boxWidth,Graphics.boxHeight, rotation, scale_x, scale_y );
	this.x += Graphics.boxWidth/2;	
	this.y += Graphics.boxHeight/2;	
	this.x += fix_point.x;	
	this.y += fix_point.y;	
	
	this.rotation = rotation;
	this.scale.x *= scale_x;
	this.scale.y *= scale_y;
}
//=============================================================================
// * 数学 - 锁定锚点
//			
//			说明：修正 旋转+缩放 的xy坐标，使其看起来像是在绕着 新的锚点 变换。
//=============================================================================
Game_Temp.prototype.drill_LCa_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图中心锚点 
					target_anchor_x,target_anchor_y, 	//新的中心锚点 
					width, height,						//贴图高宽
					rotation, scale_x, scale_y ) {		//变换的值（旋转+缩放）
	
	var ww = width * ( target_anchor_x - org_anchor_x );
	var hh = height * ( target_anchor_y - org_anchor_y );
	var xx = 0;
	var yy = 0;
	if( ww == 0 && hh == 0){ return { "x":0, "y":0 }; }
	if( ww == 0 ){ ww = 0.0001; }
	
	var r = Math.sqrt( Math.pow(ww,2) + Math.pow(hh,2) );
	var p_degree = Math.atan(hh/ww);	
	p_degree = Math.PI - p_degree;
	
	xx = r*Math.cos( rotation - p_degree);		//圆公式 (x-a)²+(y-b)²=r²
	yy = r*Math.sin( rotation - p_degree);		//圆极坐标 x=ρcosθ,y=ρsinθ
												//公式正负号修正（大坑）
	
	xx += ww * (1 - scale_x);
	yy += hh * (1 - scale_y);
	
	return { "x":xx, "y":yy };
}
//==============================
// * 镜头属性 - 图块填充（缩放比例适应）
//==============================
Spriteset_Map.prototype.drill_LCa_tileResize = function() {
	if( DrillUp.g_LCa_forceRefresh == false ){ return; }
	if( this._drill_LCa_change_sizeX == 1 && this._drill_LCa_change_sizeY == 1 ){ return; }
	
	var _x = Graphics.boxWidth / this.scale.x - Graphics.boxWidth;
	var _y = Graphics.boxHeight / this.scale.y - Graphics.boxHeight;
	var _xx =  Graphics.boxWidth + _x/2*3 ;
	var _yy =  Graphics.boxHeight + _y/2*3 ;
	if( _xx > 0 && _yy > 0 && _x > 0 && _y > 0 ){
		var width = Graphics.boxWidth + 20 * 2;
		var height = Graphics.boxHeight + 20 * 2;
		var wh = Math.max( width / this.scale.x - width , height / this.scale.y - height);
		if( wh < 0 ){ wh = 0; }		//（镜头放大时，margin禁止为负数）
		this._tilemap.margin = wh/2 + 20;
		this._tilemap._width = width / this.scale.x ;
		this._tilemap._height = height / this.scale.y ;
	}
	if( _x == 0 && _y == 0 ){
		var width = Graphics.boxWidth + 20 * 2;
		var height = Graphics.boxHeight + 20 * 2;
		this._tilemap._width = width ;
		this._tilemap._height = height ;
		this._tilemap.margin = 20;
	}
}
//==============================
// * 镜头属性 - margin属性（图块填充）
//==============================
Object.defineProperty(Tilemap.prototype, 'margin', {
    get: function() {
        return this._margin;
    },
    set: function(value) {
        if (this._margin !== value) {
            this._margin = value;
            this._createLayers();
        }
    }
});

//==============================
// * 镜头属性 - 兼容Drill_LayerGround缩放
//==============================
var _drill_LCa_s_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function (){
	_drill_LCa_s_update.call(this);
	
	if( Imported.Drill_LayerGround && DrillUp.g_LCa_forceRefresh ){
		var _x = Graphics.boxWidth / this._spriteset.scale.x - Graphics.boxWidth;
		var _y = Graphics.boxHeight / this._spriteset.scale.y - Graphics.boxHeight;
		var _xx =  Graphics.boxWidth + _x/2*3 ;
		var _yy =  Graphics.boxHeight + _y/2*3 ;
		if( _xx > 0 && _yy > 0 && _x > 0 && _y > 0 ){
			if( this._drill_LG_spriteTank ){
				for(var i=0; i< this._drill_LG_spriteTank.length; i++){
					var temp_sprite = this._drill_LG_spriteTank[i];
					temp_sprite.move( -1*_x/2 , -1*_y/2 , _xx , _yy );
					temp_sprite.origin.x -= _x/2;
					temp_sprite.origin.y -= _y/2;
				}
			}
			if( this._spriteset._parallax ){
				this._spriteset._parallax.move( -1*_x/2 , -1*_y/2 , _xx , _yy );
				this._spriteset._parallax.origin.x -= _x/2;
				this._spriteset._parallax.origin.y -= _y/2;
			}
		}
	}
}
//==============================
// * 镜头属性 - 翻转控制
//==============================
Spriteset_Map.prototype.drill_LCa_flip = function() {
	var flip = $gameSystem._drill_LCa_flip;
	
	if(flip.type == "顺时针翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if( flip.mode == "弹性"){		//（椭圆公式）
				this._drill_LCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2)) - Math.PI;
			}else if(flip.mode == "平滑"){	//（正弦公式）
				this._drill_LCa_change_rotation += Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_LCa_change_rotation += Math.PI * flip.move / flip.time ;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if( flip.mode == "弹性"){		//（椭圆公式）
				this._drill_LCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move-flip.time , 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2));
			}else if(flip.mode == "平滑"){	//（正弦公式）
				this._drill_LCa_change_rotation += Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_LCa_change_rotation += Math.PI * flip.move / flip.time ;
			}
		}
	}
	if(flip.type == "逆时针翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if( flip.mode == "弹性"){		//（椭圆公式）
				this._drill_LCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2)) - Math.PI;
			}else if( flip.mode == "平滑"){	//（正弦公式）
				this._drill_LCa_change_rotation += -Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_LCa_change_rotation += -Math.PI * flip.move / flip.time ;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if( flip.mode == "弹性" ){		//（椭圆公式）
				this._drill_LCa_change_rotation += Math.sqrt((1 - Math.pow( flip.move-flip.time , 2 )/Math.pow(flip.time,2) ) * Math.pow(Math.PI,2));
			}else if(flip.mode == "平滑"){	//（正弦公式）
				this._drill_LCa_change_rotation += -Math.PI * Math.sin( flip.move / flip.time * Math.PI/2 );
			}else{	//默认匀速
				this._drill_LCa_change_rotation += -Math.PI * flip.move / flip.time ;
			}
		}
	}
	if(flip.type == "水平翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if( flip.mode == "弹性" ){		//（椭圆公式）
				this._drill_LCa_change_sizeX *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_LCa_change_sizeX *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_LCa_change_sizeX *= -2 * flip.move / flip.time + 1;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if( flip.mode == "弹性" ){		//（椭圆公式）
				this._drill_LCa_change_sizeX *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_LCa_change_sizeX *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_LCa_change_sizeX *= -2 * flip.move / flip.time + 1;
			}
		}
	}
	if(flip.type == "垂直翻转"){
		if( flip.back == false ){
			if( flip.move < flip.time){ flip.move += 1; }
			if( flip.mode == "弹性" ){		//（椭圆公式）
				this._drill_LCa_change_sizeY *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_LCa_change_sizeY *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_LCa_change_sizeY *= -2 * flip.move / flip.time + 1;
			}
		}else{
			if( flip.move > 0 ){ flip.move -= 1; }
			if( flip.move == 0 ){ flip.lock = false; } //清空当前情况
			if( flip.mode == "弹性" ){		//（椭圆公式）
				this._drill_LCa_change_sizeY *= Math.sqrt((1 - Math.pow( flip.move, 2 )/Math.pow(flip.time,2) ) * Math.pow(2,2)) - 1;
			}else if( flip.mode == "平滑"){	//（余弦公式）
				this._drill_LCa_change_sizeY *= Math.cos( Math.PI * flip.move / flip.time );
			}else{	//默认匀速
				this._drill_LCa_change_sizeY *= -2 * flip.move / flip.time + 1;
			}
		}
	}
}

//=============================================================================
// ** 镜头移动
//=============================================================================
//==============================
// * 位置刷新
//==============================
var _drill_LCa_updateScroll = Game_Player.prototype.updateScroll;
Game_Player.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
	// >锁定镜头
	if( $gameSystem._drill_LCa_locked == true ){ return ; }
	// >默认移动
	if( $gameSystem._drill_LCa_type == "默认移动" || $gameMap.isScrolling() ){
		_drill_LCa_updateScroll.call(this,lastScrolledX, lastScrolledY);
		return ;
	}
	// >平滑移动
	if( $gameSystem._drill_LCa_type == "平滑移动" ){
		this.drill_LCa_updateSmoothScroll(lastScrolledX, lastScrolledY);
		return ;
	}
	// >弹性移动
	if( $gameSystem._drill_LCa_type == "弹性移动" ){
		this.drill_LCa_updateSpringScroll(lastScrolledX, lastScrolledY);
		return ;
	}
};
//==============================
// * 平滑移动
//==============================
Game_Player.prototype.drill_LCa_updateSmoothScroll = function(lastScrolledX, lastScrolledY) {
	// >镜头位置
	var x1 = lastScrolledX;
	var y1 = lastScrolledY;
	var x2 = this.scrolledX();
	var y2 = this.scrolledY();
	if( $gameSystem._drill_LCa_lookAt_X >= 0 &&		//看向图块
		$gameSystem._drill_LCa_lookAt_Y >= 0){
		x2 = $gameMap.adjustX($gameSystem._drill_LCa_lookAt_X);
		y2 = $gameMap.adjustY($gameSystem._drill_LCa_lookAt_Y);
	}
	if( $gameSystem._drill_LCa_lookAt_event >= 0 ){	//看向事件
		x2 = $gameMap.adjustX($gameMap.event($gameSystem._drill_LCa_lookAt_event)._realX);
		y2 = $gameMap.adjustY($gameMap.event($gameSystem._drill_LCa_lookAt_event)._realY);
	}
	
	// >立刻看向目标位置
	if( $gameTemp._drill_LCa_lookAt_immediately == true ){
		$gameTemp._drill_LCa_lookAt_immediately = false;
		if (y2 > this.centerY()){
			var distance = Math.abs(y2 - this.centerY());
			$gameMap.scrollDown( distance );
		}
		if (x2 < this.centerX() ){
			var distance = Math.abs(x2 - this.centerX());
			$gameMap.scrollLeft( distance );
		}
		if (x2 > this.centerX()) {
			var distance = Math.abs(x2 - this.centerX());
			$gameMap.scrollRight( distance );
		}
		if (y2 < this.centerY()){
			var distance = Math.abs(y2 - this.centerY());
			$gameMap.scrollUp( distance );
		}
		return;
	}
	
	// >镜头移动
	var halfTileWidth   = $gameMap.tileWidth()/2.0;
	var halfTileHeight   = $gameMap.tileHeight()/2.0;
	var yGrid = this.centerY()*2;
	var xGrid = this.centerX()*2;
	
	if (y2 > this.centerY()){
	  $gameMap.scrollDown(this._realY > $gameMap.height() - this.centerY() ? 
		($gameMap.height() - yGrid - $gameMap.displayY())/halfTileHeight :
		((y2 - yGrid + this.centerY())/halfTileHeight))
	}
	if (x2 < this.centerX() ){
	  $gameMap.scrollLeft(this._realX < this.centerX() ? $gameMap.displayX()/halfTileWidth :
		(($gameMap.displayX() + this.centerX() - this._realX)/halfTileWidth))
	}
	if (x2 > xGrid - this.centerX() ){
	  $gameMap.scrollRight(this._realX > $gameMap.width - this.centerX()  ?
		(($gameMap.width - xGrid) - $gameMap.displayX())/halfTileWidth :
		(x2 - xGrid + this.centerX() )/halfTileWidth)
	}
	if (y2 < this.centerY()){
		$gameMap.scrollUp(this._realY < this.centerY() ?  $gameMap.displayY()/halfTileHeight : 
	  (($gameMap.displayY()+this.centerY()-this._realY)/halfTileHeight))
	}
}

//==============================
// * 弹性移动
//==============================
Game_Player.prototype.drill_LCa_updateSpringScroll = function(lastScrolledX, lastScrolledY) {
	// >镜头位置
    var x1 = lastScrolledX;	
    var y1 = lastScrolledY;
    var x2 = this.scrolledX();
    var y2 = this.scrolledY();
	if( $gameSystem._drill_LCa_lookAt_X >= 0 &&		//看向图块
		$gameSystem._drill_LCa_lookAt_Y >= 0){
		x2 = $gameMap.adjustX($gameSystem._drill_LCa_lookAt_X);
		y2 = $gameMap.adjustY($gameSystem._drill_LCa_lookAt_Y);
	}
	if( $gameSystem._drill_LCa_lookAt_event >= 0 ){	//看向事件
		x2 = $gameMap.adjustX($gameMap.event($gameSystem._drill_LCa_lookAt_event)._realX);
		y2 = $gameMap.adjustY($gameMap.event($gameSystem._drill_LCa_lookAt_event)._realY);
	}
	
	// >镜头墙
	for(var i=0; i<$gameTemp._drill_LCa_wallEvents.length; i++){
		var temp_event = $gameTemp._drill_LCa_wallEvents[i];
		var temp_walls = temp_event._drill_LCa_wall;
		if( !$gameMap.drill_LCa_posIsInCamera(temp_event._realX,temp_event._realY) ){ continue; }//镜头内未出现事件，则没有墙
		
		for(var j=0; j<temp_walls.length; j++){
			if( temp_walls[j] == "左" ){
				if( x2 >= $gameMap.adjustX(temp_event._realX - 0.5 - $gameMap.screenTileX()/2)		//固定贴在事件的左边线与上边线
				 && x2 < $gameMap.adjustX(temp_event._realX - 0.5) ){
					x2 = $gameMap.adjustX(temp_event._realX - 0.5 - $gameMap.screenTileX()/2 );
					break;
				}
			}
			if( temp_walls[j] == "右" ){
				if( x2 <= $gameMap.adjustX(temp_event._realX - 0.5 + $gameMap.screenTileX()/2 )
				 && x2 > $gameMap.adjustX(temp_event._realX - 0.5) ){
					x2 = $gameMap.adjustX(temp_event._realX - 0.5 + $gameMap.screenTileX()/2 );
					break;
				}
			}
		}
		for(var j=0; j<temp_walls.length; j++){
			if( temp_walls[j] == "上" ){
				if( y2 >= $gameMap.adjustY(temp_event._realY - 0.5 - $gameMap.screenTileY()/2 )
				 && y2 < $gameMap.adjustY(temp_event._realY - 0.5) ){
					y2 = $gameMap.adjustY(temp_event._realY - 0.5 - $gameMap.screenTileY()/2 );
					break;
				}
			}
			if( temp_walls[j] == "下" ){
				if( y2 <= $gameMap.adjustY(temp_event._realY - 0.5 + $gameMap.screenTileY()/2 )
				 && y2 > $gameMap.adjustY(temp_event._realY - 0.5) ){
					y2 = $gameMap.adjustY(temp_event._realY - 0.5 + $gameMap.screenTileY()/2 );
					break;
				}
			}
		}
	}
	
	// >立刻看向目标位置
	if( $gameTemp._drill_LCa_lookAt_immediately == true ){
		$gameTemp._drill_LCa_lookAt_immediately = false;
		if (y2 > this.centerY()){
			var distance = Math.abs(y2 - this.centerY());
			$gameMap.scrollDown( distance );
		}
		if (x2 < this.centerX() ){
			var distance = Math.abs(x2 - this.centerX());
			$gameMap.scrollLeft( distance );
		}
		if (x2 > this.centerX()) {
			var distance = Math.abs(x2 - this.centerX());
			$gameMap.scrollRight( distance );
		}
		if (y2 < this.centerY()){
			var distance = Math.abs(y2 - this.centerY());
			$gameMap.scrollUp( distance );
		}
		return;
	}
	
	// >镜头移动
	var speedRatio_x = $gameSystem._drill_LCa_speedRatio ;
	var speedRatio_y = $gameSystem._drill_LCa_speedRatio ;
	var pixel_speedPlus = 1 / 1000000;	//手动误差值
	
    if (y2 > this.centerY()){
		var distance = Math.abs(y2 - this.centerY());
		var pixel_distance = distance * $gameMap.tileHeight() ;										//像素距离
		var pixel_speed = Math.min(pixel_distance/speedRatio_y,$gameSystem._drill_LCa_speedMax);	//像素速度
		if( pixel_speed < 0.25 ){ pixel_speed = 0.25; }												//像素最小速度（1/4像素）
		
		if( pixel_distance < pixel_speed ){							//第一次收敛（最小收敛间距）
			$gameTemp._drill_LCa_pixel_fix_y = 0;					//（镜头停止移动后，所有像素必须吻合归位）
			$gameMap.scrollDown( distance );						//
		}else{							
			pixel_speed += $gameTemp._drill_LCa_pixel_fix_y;							//速度小数位补正
			$gameTemp._drill_LCa_pixel_fix_y = pixel_speed - Math.round(pixel_speed) - pixel_speedPlus;	//补正值
			pixel_speed = Math.round(pixel_speed);										//设置速度为固定像素速度
			pixel_speed += pixel_speedPlus;
			
			if( pixel_distance < pixel_speed ){						//第二次收敛（round镜头墙bug）
				$gameTemp._drill_LCa_pixel_fix_y = 0;				//
				$gameMap.scrollDown( distance );					//
			}else{
				$gameMap.scrollDown( pixel_speed/$gameMap.tileHeight() );	
			}
		}   
    }
    if (x2 < this.centerX()) {
		var distance = Math.abs(x2 - this.centerX());
		var pixel_distance = distance * $gameMap.tileWidth() ;
		var pixel_speed = Math.min(pixel_distance/speedRatio_x,$gameSystem._drill_LCa_speedMax);
		if( pixel_speed < 0.25 ){ pixel_speed = 0.25; }
			
		if( pixel_distance < pixel_speed ){
			$gameTemp._drill_LCa_pixel_fix_x = 0;
			$gameMap.scrollLeft( distance );
		}else{								
			pixel_speed += $gameTemp._drill_LCa_pixel_fix_x;
			$gameTemp._drill_LCa_pixel_fix_x = pixel_speed - Math.round(pixel_speed) + pixel_speedPlus;
			pixel_speed = Math.round(pixel_speed) ;
			pixel_speed -= pixel_speedPlus;
			
			if( pixel_distance < pixel_speed ){			
				$gameTemp._drill_LCa_pixel_fix_x = 0;
				$gameMap.scrollLeft( distance );
			}else{
				$gameMap.scrollLeft( pixel_speed/$gameMap.tileWidth() );
			}
		}
    }
    if (x2 > this.centerX()) {
		var distance = Math.abs(x2 - this.centerX());
		var pixel_distance = distance * $gameMap.tileWidth() ;
		var pixel_speed = Math.min(pixel_distance/speedRatio_x,$gameSystem._drill_LCa_speedMax);
		if( pixel_speed < 0.25 ){ pixel_speed = 0.25; }
		
		if( pixel_distance < pixel_speed ){
			$gameTemp._drill_LCa_pixel_fix_x = 0;
			$gameMap.scrollRight( distance );
		}else{
			pixel_speed += $gameTemp._drill_LCa_pixel_fix_x;
			$gameTemp._drill_LCa_pixel_fix_x = pixel_speed - Math.round(pixel_speed) - pixel_speedPlus;
			pixel_speed = Math.round(pixel_speed) ;
			pixel_speed += pixel_speedPlus;
			
			if( pixel_distance < pixel_speed ){			
				$gameTemp._drill_LCa_pixel_fix_x = 0;
				$gameMap.scrollRight( distance );
			}else{
				$gameMap.scrollRight( pixel_speed/$gameMap.tileWidth() );
			}
		}
    }
    if (y2 < this.centerY()) {
		var distance = Math.abs(y2 - this.centerY());
		var pixel_distance = distance * $gameMap.tileHeight() ;
		var pixel_speed = Math.min(pixel_distance/speedRatio_y,$gameSystem._drill_LCa_speedMax);
		if( pixel_speed < 0.25 ){ pixel_speed = 0.25; }	
		
		if( pixel_distance < pixel_speed ){	
			$gameTemp._drill_LCa_pixel_fix_y = 0;
			$gameMap.scrollUp( distance );
		}else{		
			pixel_speed += $gameTemp._drill_LCa_pixel_fix_y;
			$gameTemp._drill_LCa_pixel_fix_y = pixel_speed - Math.round(pixel_speed) + pixel_speedPlus;
			pixel_speed = Math.round(pixel_speed) ;
			pixel_speed -= pixel_speedPlus;
			
			if( pixel_distance < pixel_speed ){	
				$gameTemp._drill_LCa_pixel_fix_y = 0;
				$gameMap.scrollUp( distance );
			}else{		
				$gameMap.scrollUp( pixel_speed/$gameMap.tileHeight() );
			}
		}
    }
	
}
//==============================
// * 镜头范围
//==============================
Game_Map.prototype.drill_LCa_posIsInCamera = function(realX, realY) {
	//alert(this.adjustX(realX)+","+this.adjustX(realY));
	return  Math.abs(this.adjustX(realX + 0.5 - this.screenTileX()/2)) <= this.screenTileX()/2 + 0.5 && 
			Math.abs(this.adjustY(realY + 0.5 - this.screenTileY()/2)) <= this.screenTileY()/2 + 0.5 ;
}
 
 
//=============================================================================
// ** 视野触发
//=============================================================================
//==============================
// ** 视野 - 帧刷新
//==============================
var _drill_LCa_sight_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
	_drill_LCa_sight_update.call(this,sceneActive);
	
	this.drill_LCa_updateSightSwitch();
};
Game_Map.prototype.drill_LCa_updateSightSwitch = function() {
	
	// >视野事件
	for(var i=0; i<$gameTemp._drill_LCa_sightEvents.length; i++){
		var temp_event = $gameTemp._drill_LCa_sightEvents[i];
		
		// >事件触发
		var isTriggered = this.drill_LCa_posIsInCamera(temp_event._realX, temp_event._realY);
		
		// >切换开关
		if(isTriggered){
			var s_key = [this._mapId, temp_event._eventId, temp_event._drill_LCa_sightOn ];
			if( $gameSelfSwitches.value(s_key) !== true){
				$gameSelfSwitches.drill_setValueWithOutChange(s_key,true);
				$gameSelfSwitches.onChange();
			}
		}else{
			var s_key = [this._mapId, temp_event._eventId, temp_event._drill_LCa_sightOff ];
			if( $gameSelfSwitches.value(s_key) !== false){
				$gameSelfSwitches.drill_setValueWithOutChange(s_key,false);
				$gameSelfSwitches.onChange();
			}
		}
	}
}
//==============================
// * 优化 - 独立开关赋值时不刷新地图
//==============================
Game_SelfSwitches.prototype.drill_setValueWithOutChange = function(key, value) {
    if (value) {
        this._data[key] = true;
    } else {
        delete this._data[key];
    }
};


