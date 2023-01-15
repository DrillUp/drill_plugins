//=============================================================================
// Drill_BattleCamera.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        战斗 - 活动战斗镜头
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_BattleCamera +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以控制战斗镜头，并进行各种动态移动、变换功能。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 由于插件改变了默认固定战斗镜头的规则，对所有战斗UI相关插件有影响。
 * 基于：
 *   - Drill_CoreOfBallistics        系统-弹道核心★★v1.9及以上★★
 *   - Drill_CoreOfInput             系统-输入设备核心★★v1.6及以上★★
 * 被扩展：
 *   - Drill_EnemySimpleHud          战斗UI-简单生命框
 *   - Drill_ActorPortraitureExtend  战斗UI-高级角色肖像
 *   - Drill_GaugeForVariable        UI-高级变量固定框
 *   - Drill_GaugeForBoss            UI-高级BOSS生命固定框
 *   - Drill_PictureThumbtack        图片-图片图钉
 *     上述插件，都可以在镜头移动或缩放时，做相应的变换支持。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗整体图层。
 * 2.如果想了解镜头更多的内容，去看看 "2.战斗 > 关于战斗活动镜头.docx"。
 * 素材规则：
 *   (1.你只要满足： 
 *      战斗背景高度 >= 镜头架高度 >= 窗口高度
 *      战斗背景宽度 >= 镜头架宽度 >= 窗口宽度
 *      就可以随意控制战斗背景了。
 *   (2.示例中的配置为：
 *      战斗背景高度(1000) >= 镜头架高度(1000) >= 窗口高度(816)
 *      战斗背景高度(740) >= 镜头架高度(740) >= 窗口高度(624)
 *      这样，示例中有高度0-184范围，宽度0-176范围的可活动空间。
 *   (3.镜头架，相当于窗口的可活动区域。
 *      如果 镜头架宽度 小于 窗口宽度，则镜头无法左右移动。
 *      如果 镜头架高度 小于 窗口高度，则镜头无法上下移动。
 *   (4.你可以通过yep设置窗口为1280*720，设置镜头架为1366*768。
 *      那么你需要配置1366*768的战斗背景素材。（素材小了会看到黑边）
 *      相比原来的mog，这里的镜头不对战斗背景做任何多余操作。
 * 黑边问题：
 *   (1.关于素材看到黑边的几个问题可能原因：
 *   (2.素材小了。
 *      配置高度宽度大于你设置的窗口即可。
 *   (3.战斗背景位移比没有置0。
 *      如果你的战斗背景跟着你的镜头移动，那么很可能是因为你没有将
 *      位移比置0，由于背景往不同的方向移动，很可能会看到边界。
 *   (4.使用了其他相关镜头控制插件。
 *      首先确认一点，除了这个插件的插件指令可以缩放战斗图层。
 *      示例中【没有任何其他插件】会缩放战斗背景。
 *      如果你发现了战斗背景明显变大了，或者敌人大小和战斗背景大小
 *      明显不符，那么极有可能是其它插件进行了介入。造成了问题。
 * 镜头缩放/旋转：
 *   (1.镜头翻转/缩放的原理与 活动地图镜头 原理一样。
 *      你可以去看看活动地图镜头的注意事项。这里不赘述。
 *   (2.注意，镜头翻转，只对图像有效，鼠标点击区域没有变化。
 *      比如，敌人的鼠标靠近状态查看区域，翻转后，还是原来的位置。
 * 设计：
 *   (1.战斗镜头能够让战斗时的场景看起来更加开阔，但具体配置相对
 *      比较麻烦，可以去看看 "2.战斗 > 关于战斗活动镜头.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 基本属性
 * 你可以修改战斗镜头的基本属性。
 * 
 * 插件指令：>战斗镜头 : 开启
 * 插件指令：>战斗镜头 : 关闭
 * 插件指令：>战斗镜头 : 暂停镜头运行
 * 插件指令：>战斗镜头 : 继续镜头运行
 * 插件指令：>战斗镜头 : 修改镜头架宽度 : 像素[1000]
 * 插件指令：>战斗镜头 : 修改镜头架高度 : 像素[740]
 * 插件指令：>战斗镜头 : 修改镜头架宽度 : 默认值
 * 插件指令：>战斗镜头 : 修改镜头架高度 : 默认值
 * 
 * 1."暂停镜头运行"后会立刻静止，不再移动。
 *   必须执行"继续镜头运行"才能恢复。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>开启战斗镜头
 * 插件指令(旧)：>关闭战斗镜头
 * 插件指令(旧)：>战斗镜头架高度 1000
 * 插件指令(旧)：>战斗镜头架宽度 740
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头模式
 * 你可以通过插件指令来修改镜头模式：
 * 
 * 插件指令：>战斗镜头 : 修改模式 : 自动模式
 * 插件指令：>战斗镜头 : 修改模式 : 观光模式
 * 
 * 插件指令：>战斗镜头 : 自动模式-修改镜头切换时移动模式 : 匀速移动
 * 插件指令：>战斗镜头 : 自动模式-修改镜头切换时移动模式 : 弹性移动
 * 插件指令：>战斗镜头 : 自动模式-修改镜头切换时移动模式 : 增减速移动
 * 插件指令：>战斗镜头 : 自动模式-修改镜头切换时间 : 时间[15]
 * 插件指令：>战斗镜头 : 自动模式-修改镜头切换延迟 : 时间[20]
 * 
 * 插件指令：>战斗镜头 : 观光模式-键盘操作 : 启用
 * 插件指令：>战斗镜头 : 观光模式-键盘操作 : 关闭
 * 插件指令：>战斗镜头 : 观光模式-键盘操作 : 恢复默认
 * 插件指令：>战斗镜头 : 观光模式-鼠标操作 : 启用
 * 插件指令：>战斗镜头 : 观光模式-鼠标操作 : 关闭
 * 插件指令：>战斗镜头 : 观光模式-鼠标操作 : 恢复默认
 * 插件指令：>战斗镜头 : 观光模式-镜头移动速度 : 速度[4.5]
 * 
 * 1.镜头的模式具体使用方法去看看文档介绍。
 *   注意，固定看向不是模式，而是模式中的一个通用功能。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 固定看向
 * 你可以通过插件指令设置镜头固定看向某个位置：
 * 
 * 插件指令：>战斗镜头 : 固定看向 : 场景位置[200,200]
 * 插件指令：>战斗镜头 : 固定看向 : 场景位置变量[21,22]
 * 插件指令：>战斗镜头 : 固定看向 : 敌方位置[2]
 * 插件指令：>战斗镜头 : 固定看向 : 敌方变量位置[21]
 * 插件指令：>战斗镜头 : 固定看向 : 我方位置[2]
 * 插件指令：>战斗镜头 : 固定看向 : 我方变量位置[21]
 * 插件指令：>战斗镜头 : 解除固定看向
 * 
 * 1.注意，设置"固定看向"之后，如果不解除，则将永久保持看向的位置。
 *   战斗中的自动模式敌人功能将不起作用。解除固定看向 后将恢复。
 * 2.你可以写入越界的位置，比如"场景位置[-1000,-1000]"。
 *   由于镜头架的限制，这将会看向镜头架的最左上角。
 * 3."场景位置[0,0]"是战斗镜头的中心位置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头缩放/旋转
 * 你可以通过插件指令设置镜头缩放：
 * 
 * 插件指令：>战斗镜头 : 缩放X : 比例[1.50] : 时间[60]
 * 插件指令：>战斗镜头 : 缩放Y : 比例[1.50] : 时间[60]
 * 插件指令：>战斗镜头 : 旋转 : 角度[180] : 时间[60]
 * 插件指令：>战斗镜头 : 缩放X : 恢复默认 : 时间[60]
 * 插件指令：>战斗镜头 : 缩放Y : 恢复默认 : 时间[60]
 * 插件指令：>战斗镜头 : 旋转 : 恢复默认 : 时间[60]
 * 
 * 1.默认旋转为 0度，默认缩放XY为 1.00 。
 * 2.经过了数学函数的优化，缩放 和 旋转 的效果能叠加使用。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头翻转
 * 你可以通过插件指令设置镜头翻转：
 * 
 * 插件指令：>战斗镜头 : 水平翻转 : 时间[60] : 匀速变化
 * 插件指令：>战斗镜头 : 垂直翻转 : 时间[60] : 匀速变化
 * 插件指令：>战斗镜头 : 顺时针翻转 : 时间[60] : 匀速变化
 * 插件指令：>战斗镜头 : 逆时针翻转 : 时间[60] : 匀速变化
 * 插件指令：>战斗镜头 : 水平翻转 : 时间[60] : 弹性变化
 * 插件指令：>战斗镜头 : 垂直翻转 : 时间[60] : 弹性变化
 * 插件指令：>战斗镜头 : 顺时针翻转 : 时间[60] : 弹性变化
 * 插件指令：>战斗镜头 : 逆时针翻转 : 时间[60] : 弹性变化
 * 插件指令：>战斗镜头 : 水平翻转 : 时间[60] : 增减速变化
 * 插件指令：>战斗镜头 : 垂直翻转 : 时间[60] : 增减速变化
 * 插件指令：>战斗镜头 : 顺时针翻转 : 时间[60] : 增减速变化
 * 插件指令：>战斗镜头 : 逆时针翻转 : 时间[60] : 增减速变化
 * 
 * 插件指令：>战斗镜头 : 恢复翻转 : 时间[60] : 匀速变化
 * 插件指令：>战斗镜头 : 恢复翻转 : 时间[60] : 弹性变化
 * 插件指令：>战斗镜头 : 恢复翻转 : 时间[60] : 增减速变化
 * 
 * 1.数字表示翻转的时间，单位帧。
 * 2.注意，翻转只能处于一种状态。比如顺时针翻转后。其它翻转指令完全失效。
 *   只有恢复翻转后，才能进行其它翻转操作。
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
 * 测试方法：   在战斗界面中，测试战斗镜头的消耗。
 * 测试结果：   战斗界面中，平均消耗为：【12.69ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.战斗镜头大多都是位置转换计算，不操作贴图处理。不过相对消耗
 *   比一般单纯位置计算插件要多一点。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了镜头翻转、镜头缩放功能。
 * [v1.2]
 * 修复了在sideview情况下，默认战斗背景出现黑边的问题。
 * [v1.3]
 * 修复了镜头移动时，战斗UI跟随延迟的bug。
 * [v1.4]
 * 修复了镜头移动时，配置了位移比的 背景/魔法圈/GIF 会出现不稳定瞬移的bug。
 * [v1.5]
 * 优化了内部结构，以及插件指令。
 * 修复了 车轮战结束 后，镜头第一回合无法移动的bug。
 * [v1.6]
 * 优化了 旋转、缩放 的结构。
 * [v1.7]
 * 大幅度改进了插件的镜头控制结构。
 * [v1.8]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 * 
 * @param ---常规---
 * @default
 * 
 * @param 镜头架宽度
 * @parent ---常规---
 * @type number
 * @min 50
 * @desc 镜头可以活动的宽度。战斗背景大小 >= 镜头架宽度 >= 窗口宽度 。
 * @default 1000
 * 
 * @param 镜头架高度
 * @parent ---常规---
 * @type number
 * @min 50
 * @desc 镜头可以活动的高度。战斗背景大小 >= 镜头架高度 >= 窗口高度 。
 * @default 740
 * 
 * @param 默认镜头模式
 * @parent ---常规---
 * @type select
 * @option 自动模式
 * @value 自动模式
 * @option 观光模式
 * @value 观光模式
 * @desc 默认的镜头模式。
 * @default 自动模式
 * 
 * @param ---自动模式---
 * @default
 * 
 * @param 偏移-镜头 X
 * @parent ---自动模式---
 * @desc 镜头模式为"自动模式"时，默认镜头聚焦目标的中心，在中心的基础上x轴方向偏移，单位像素。（可为负数）
 * @default 0
 * 
 * @param 偏移-镜头 Y
 * @parent ---自动模式---
 * @desc 镜头模式为"自动模式"时，默认镜头聚焦目标的中心，在中心的基础上y轴方向偏移，单位像素。（可为负数）
 * @default 0
 * 
 * @param 镜头切换时移动模式
 * @parent ---自动模式---
 * @type select
 * @option 匀速移动
 * @value 匀速移动
 * @option 弹性移动
 * @value 弹性移动
 * @option 增减速移动
 * @value 增减速移动
 * @desc 镜头模式为"自动模式"时，镜头移动到新目标的移动模式。
 * @default 弹性移动
 *
 * @param 镜头切换时间
 * @parent 镜头切换时移动模式
 * @type number
 * @min 1
 * @desc 镜头模式为"自动模式"时，镜头切换移动目标时的时间，单位帧。（1秒60帧）
 * @default 18
 *
 * @param 镜头切换延迟
 * @parent 镜头切换时移动模式
 * @type number
 * @min 0
 * @desc 镜头模式为"自动模式"时，镜头移动延迟的时间。20表示20帧后开始移动镜头。（1秒60帧）
 * @default 0
 * 
 * @param ---观光模式---
 * @default
 * 
 * @param 是否启用键盘操作
 * @parent ---观光模式---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 镜头模式为"观光模式"时，开启后可以用键盘或手柄上下左右移动镜头。
 * @default false
 * 
 * @param 是否启用鼠标操作
 * @parent ---观光模式---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 镜头模式为"观光模式"时，开启后可以用鼠标接触上下左右边缘移动镜头。不支持触屏。
 * @default true
 *
 * @param 鼠标触发区域的厚度
 * @parent 是否启用鼠标操作
 * @type number
 * @min 4
 * @desc 镜头模式为"观光模式"时，窗体边缘的鼠标触发区域的厚度值。
 * @default 40
 *
 * @param 镜头移动速度
 * @parent ---观光模式---
 * @desc 镜头模式为"观光模式"时，镜头移动的速度。单位像素/帧。
 * @default 4.5
 * 
 * @param ---叠加变化---
 * @default
 *
 * @param 默认旋转角度
 * @parent ---叠加变化---
 * @type number
 * @min 0
 * @max 360
 * @desc 镜头默认的旋转角度。标准为0度。
 * @default 0
 *
 * @param 默认X缩放比例
 * @parent ---叠加变化---
 * @desc 镜头默认的X缩放比例。标准为1.00，0.50表示缩小两倍，2.00表示放大两倍。
 * @default 1.00
 *
 * @param 默认Y缩放比例
 * @parent ---叠加变化---
 * @desc 镜头默认的Y缩放比例。标准为1.00，0.50表示缩小两倍，2.00表示放大两倍。
 * @default 1.00
 * 
 * @param 战斗结束后是否恢复默认
 * @parent ---叠加变化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 战斗结束后，镜头的旋转、X缩放、Y缩放全部恢复默认值。
 * @default true
 * 
 * 
 * @param DEBUG-镜头对齐框
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启后，将显示镜头的初始位置框、层级锁定框，用于排查镜头问题。
 * @default false
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		BCa（Battle_Camera）
//		临时全局变量	DrillUp.g_BCa_xxx
//		临时局部变量	$gameTemp._drill_cam_xxx	（许多插件关联，不再改动）
//		存储数据变量	$gameSystem._drill_cam_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3) 每帧
//		★性能测试因素	战斗界面
//		★性能测试消耗	12.69ms（drill_BCa_lockAnchor） 6.26ms（Spriteset_Battle.prototype.update）
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			战斗活动镜头：
//				->单位贴图
//					->获取 - 敌人容器指针【标准函数】
//					->获取 - 根据敌方索引【标准函数】
//					->获取 - 根据敌人ID【标准函数】
//					->获取 - 角色容器指针【标准函数】
//					->获取 - 根据我方索引【标准函数】
//					->获取 - 根据角色ID【标准函数】
//				->镜头控制器函数
//				->自动模式
//					->自动模式标记
//						->菜单标记
//						->战斗流程标记
//						->单位标记
//					->自动模式聚焦
//						->聚焦中心
//						->聚焦角色
//						->聚焦敌人
//				->兼容
//					->兼容YEP
//					->兼容MOG
//				->镜头控制
//					->控制器帧刷新
//					->战斗结束恢复默认
//					->基本属性赋值
//						> 坐标X
//						> 坐标Y
//						> 旋转（弧度）
//						> 缩放X
//						> 缩放Y
//					->镜头位置赋值（$gameTemp._drill_cam_pos）
//					->镜头架赋值（$gameSystem._drill_cam_limit_width）
//					
//				->镜头控制器【Drill_BCa_Controller】
//					->镜头架
//					->镜头基点
//					->自动模式
//					->固定看向
//					->叠加变化
//						->镜头自定义放大 ?
//
//		★私有类如下：
//			* Drill_BCa_Controller【镜头控制器】
//			* Drill_BCa_DebugSprite【镜头对齐框 贴图】
//	
//		★必要注意事项：
//			1.镜头原理： 将 _battleField图层 平移、旋转、缩放。
//			  底层函数： drill_BCa_updateCameraControl。
//			  贴图与镜头原理： 镜头变换时，贴图跟随镜头一起变换。
//			  【旋转与缩放是两个独立的属性，只有平移会受到 旋转与缩放 的影响，且与各功能的影响叠加在一起】
//			2.子贴图用 与 外部贴图用：
//			  图层变换时，在图层内的子贴图会跟着变，但在图层外的不会变。
//			  由于两类贴图性质不一样。所以需要区分控制。
//			  【变换只会影响 平移、旋转、缩放 三个属性，而你的目的是要让 对齐线 在各个层级下保持一致。】
//			  子贴图用   == 在图层内 == 下层、上层
//			  外部贴图用 == 在图层外 == 图片层、最顶层
//				
//			
//		★其它说明细节：
//			暂无
//
//		★存在的问题：
//			1.插件没有完全脱离mog的影子，内部有已经套牢并且无法改名的变量名。（外部插件都与此插件关联引用）
//			2.细节：战斗界面旋转20度，只有测试黄线的偏移位置不对。（已解决，偏移需要逆向变换）
//			3.细节：战斗背景、战斗魔法圈、角色肖像 处于 图片层或最顶层时，暂不设置 旋转与缩放 同步。
//			

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleCamera = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BattleCamera');


	/*-----------------杂项------------------*/
	DrillUp.g_BCa_limit_width = Number(DrillUp.parameters['镜头架宽度'] || 1000);
	DrillUp.g_BCa_limit_height = Number(DrillUp.parameters['镜头架高度'] || 740);
    DrillUp.g_BCa_mode = String(DrillUp.parameters['默认镜头模式'] || '自动模式');
	
	DrillUp.g_BCa_auto_x = Number(DrillUp.parameters['偏移-镜头 X'] || 0);
	DrillUp.g_BCa_auto_y = Number(DrillUp.parameters['偏移-镜头 Y'] || 0);
    DrillUp.g_BCa_auto_moveType = String(DrillUp.parameters['镜头切换时移动模式'] || '弹性移动');
    DrillUp.g_BCa_auto_moveTime = Number(DrillUp.parameters['镜头切换时间'] || 18);
	DrillUp.g_BCa_auto_delay = Number(DrillUp.parameters['镜头切换延迟'] || 20);
	
	DrillUp.g_BCa_tourist_keyboardEnabled = String(DrillUp.parameters['是否启用键盘操作'] || "true") == "true";
	DrillUp.g_BCa_tourist_mouseEnabled = String(DrillUp.parameters['是否启用鼠标操作'] || "true") == "true";
	DrillUp.g_BCa_tourist_mouseThickness = Number(DrillUp.parameters['鼠标触发区域的厚度'] || 40);
	DrillUp.g_BCa_tourist_speed = Number(DrillUp.parameters['镜头移动速度'] || 4.5);
	
	DrillUp.g_BCa_defaultRotation = Number(DrillUp.parameters['默认旋转角度'] || 0);
	DrillUp.g_BCa_defaultScaleX = Number(DrillUp.parameters['默认X缩放比例'] || 1.00);
	DrillUp.g_BCa_defaultScaleY = Number(DrillUp.parameters['默认Y缩放比例'] || 1.00);
	DrillUp.g_BCa_resetDefaultInBattleEnd = String(DrillUp.parameters['战斗结束后是否恢复默认'] || "true") == "true";
	
	DrillUp.g_BCa_debugEnabled = String(DrillUp.parameters['DEBUG-镜头对齐框'] || "false") == "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfInput ){
	
	
//=============================================================================
// ** 插件指令
//=============================================================================	
var _drill_BCa_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args ){
	_drill_BCa_pluginCommand.call(this,command, args);
	if( command === ">战斗镜头" ){
		
		/*-----------------基本属性------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "开启" ){
				$gameSystem.drill_BCa_setEnable( true );
			}
			if( type == "关闭" ){
				$gameSystem.drill_BCa_setEnable( false );
			}
			if( type == "暂停镜头运行" ){
				$gameSystem.drill_BCa_setPause( true );
			}
			if( type == "继续镜头运行" ){
				$gameSystem.drill_BCa_setPause( false );
			}
		}
		if( args.length == 4 ){ 		// >战斗镜头 : 修改镜头架高度 : 像素[1000]
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改镜头架宽度" ){
				if( temp1 == "默认值" ){
					temp1 = DrillUp.g_BCa_limit_width;
				}else if( temp1.indexOf("像素[") != -1 ){
					temp1 = temp1.replace("像素[","");
					temp1 = temp1.replace("]","");
				}
				$gameSystem.drill_BCa_setCameraHolderWidth( Number(temp1) );
			}
			if( type == "修改镜头架高度" ){
				if( temp1 == "默认值" ){
					temp1 = DrillUp.g_BCa_limit_height;
				}else if( temp1.indexOf("像素[") != -1 ){
					temp1 = temp1.replace("像素[","");
					temp1 = temp1.replace("]","");
				}
				$gameSystem.drill_BCa_setCameraHolderHeight( Number(temp1) );
			}
		}
		
		/*-----------------镜头模式------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改模式" ){
				$gameSystem.drill_BCa_setMode( temp1 );
			}
			/*-----------------自动模式------------------*/
			if( type == "自动模式-修改镜头切换时间" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_BCa_controller._drill_data['autoMovingTime'] = Number(temp1);
			}
			if( type == "自动模式-修改镜头切换延迟" ){
				temp1 = temp1.replace("时间[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_BCa_controller._drill_data['autoMovingDelay'] = Number(temp1);
			}
			if( type == "自动模式-修改镜头切换时移动模式" ){
				$gameSystem._drill_BCa_controller._drill_data['autoMoveType'] = String(temp1);
			}
			/*-----------------观光模式------------------*/
			if( type == "观光模式-键盘操作" ){
				if( temp1 == "启用" ){
					$gameSystem._drill_BCa_controller._drill_data['touristKeyboardEnabled'] = true;
				}
				if( temp1 == "关闭" ){
					$gameSystem._drill_BCa_controller._drill_data['touristKeyboardEnabled'] = false;
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_BCa_controller._drill_data['touristKeyboardEnabled'] = DrillUp.g_BCa_tourist_keyboardEnabled;
				}
			}
			if( type == "观光模式-鼠标操作" ){
				if( temp1 == "启用" ){
					$gameSystem._drill_BCa_controller._drill_data['touristMouseEnabled'] = true;
				}
				if( temp1 == "关闭" ){
					$gameSystem._drill_BCa_controller._drill_data['touristMouseEnabled'] = false;
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_BCa_controller._drill_data['touristMouseEnabled'] = DrillUp.g_BCa_tourist_mouseEnabled;
				}
			}
			if( type == "观光模式-镜头移动速度" ){
				temp1 = temp1.replace("速度[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_BCa_controller._drill_data['touristSpeed'] = Number(temp1);
			}
		}
	
	
		/*-----------------固定看向------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "解除固定看向" ){
				$gameSystem.drill_BCa_setUnlock();
			}
		}
		if( args.length == 4 ){ 		// >战斗镜头 : 修改镜头架高度 : 像素[1000]
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "固定看向" ){
				
				var pos = null;
				if( temp1.indexOf("场景位置变量[") != -1 ){
					temp1 = temp1.replace("场景位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(",");
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
							
				}else if( temp1.indexOf("场景位置[") != -1 ){
					temp1 = temp1.replace("场景位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
							
				}else if( temp1.indexOf("敌方变量位置[") != -1 ){
					temp1 = temp1.replace("敌方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BCa_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("敌方位置[") != -1 ){
					temp1 = temp1.replace("敌方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BCa_getEnemySpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
					
				}else if( temp1.indexOf("我方变量位置[") != -1 ){
					temp1 = temp1.replace("我方变量位置[","");
					temp1 = temp1.replace("]","");
					temp1 = $gameVariables.value(Number(temp1));
					var temp_sprite = $gameTemp.drill_BCa_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}else if( temp1.indexOf("我方位置[") != -1 ){
					temp1 = temp1.replace("我方位置[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1);
					var temp_sprite = $gameTemp.drill_BCa_getActorSpriteByIndex(temp1-1);
					if( temp_sprite != undefined ){
						pos = [ temp_sprite.x, 
								temp_sprite.y ];
					}
				}
				
				if( pos != null && pos.length >= 2 ){
					$gameSystem.drill_BCa_setLockPosition( Number(pos[0]), Number(pos[1]) );
				}
			}
		}
		
		
		/*-----------------镜头缩放/旋转------------------*/
		if( args.length == 6 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			temp1 = temp1.replace("比例[", "");
			temp1 = temp1.replace("角度[", "");
			temp1 = temp1.replace("]", "");
			temp2 = temp2.replace("时间[","");
			temp2 = temp2.replace("]","");
			if( type == "旋转" ){
				if( temp1 == "恢复默认" ){ temp1 = DrillUp.g_BCa_defaultRotation; }
				var time = Math.max(Number(temp2),1);
			    $gameSystem.drill_BCa_doRotate( Number(temp1), time, "弹性变化" );
				return;
			}
			if( type == "缩放X" ){
				if( temp1 == "恢复默认" ){ temp1 = DrillUp.g_BCa_defaultScaleX; }
				var time = Math.max(Number(temp2),1);
			    $gameSystem.drill_BCa_doScaleX( Number(temp1), time, "弹性变化" );
				return;
			}
			if( type == "缩放Y" ){
				if( temp1 == "恢复默认" ){ temp1 = DrillUp.g_BCa_defaultScaleY; }
				var time = Math.max(Number(temp2),1);
			    $gameSystem.drill_BCa_doScaleY( Number(temp1), time, "弹性变化" );
				return;
			}
		}
		/*-----------------镜头翻转------------------*/
		if( args.length == 6 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			temp1 = temp1.replace("时间[", "");
			temp1 = temp1.replace("]", "");
			if( type == "水平翻转" ){
				var time = Math.max(Number(temp1),1);
				var changeType = "弹性变化";
				if( temp2 == "匀速" ){ changeType = "匀速变化"; }
				if( temp2 == "弹性" ){ changeType = "弹性变化"; }
				if( temp2 == "平滑" ){ changeType = "增减速变化"; }
			    $gameSystem.drill_BCa_doScaleX( -1, time, changeType );
			    $gameSystem.drill_BCa_doScaleY(  1, time, changeType );
				return;
			}
			if( type == "垂直翻转"){
				var time = Math.max(Number(temp1),1);
				var changeType = "弹性变化";
				if( temp2 == "匀速" ){ changeType = "匀速变化"; }
				if( temp2 == "弹性" ){ changeType = "弹性变化"; }
				if( temp2 == "平滑" ){ changeType = "增减速变化"; }
			    $gameSystem.drill_BCa_doScaleX(  1, time, changeType );
			    $gameSystem.drill_BCa_doScaleY( -1, time, changeType );
				return;
			}
			if( type == "顺时针翻转" ){
				var time = Math.max(Number(temp1),1);
				var changeType = "弹性变化";
				if( temp2 == "匀速" ){ changeType = "匀速变化"; }
				if( temp2 == "弹性" ){ changeType = "弹性变化"; }
				if( temp2 == "平滑" ){ changeType = "增减速变化"; }
			    $gameSystem.drill_BCa_doRotate( 180, time, changeType );
				return;
			}
			if( type == "逆时针翻转" ){
				var time = Math.max(Number(temp1),1);
				var changeType = "弹性变化";
				if( temp2 == "匀速" ){ changeType = "匀速变化"; }
				if( temp2 == "弹性" ){ changeType = "弹性变化"; }
				if( temp2 == "平滑" ){ changeType = "增减速变化"; }
			    $gameSystem.drill_BCa_doRotate( -180, time, changeType );
				return;
			}
			if( type == "恢复翻转" ){
				var time = Math.max(Number(temp1),1);
				var changeType = "弹性变化";
				if( temp2 == "匀速" ){ changeType = "匀速变化"; }
				if( temp2 == "弹性" ){ changeType = "弹性变化"; }
				if( temp2 == "平滑" ){ changeType = "增减速变化"; }
			    $gameSystem.drill_BCa_doScaleX( DrillUp.g_BCa_defaultScaleX, time, changeType );
			    $gameSystem.drill_BCa_doScaleY( DrillUp.g_BCa_defaultScaleY, time, changeType );
			    $gameSystem.drill_BCa_doRotate( DrillUp.g_BCa_defaultRotation, time, changeType );
				return;
			}
		}
	}
	
	/*-----------------旧指令------------------*/
	if( command === ">镜头切换时间" || command === ">战斗镜头切换时间" ){
		if(args.length == 1){
			$gameSystem._drill_BCa_controller._drill_data['autoMovingTime'] = Number(args[0]);
		};
	};
	if( command === ">镜头架高度" || command === ">战斗镜头架高度" ){
		if(args.length == 1){
			$gameSystem._drill_BCa_controller._drill_data['holderHeight'] = Number(args[0]);
		};
	};
	if( command === ">镜头架宽度" || command === ">战斗镜头架宽度" ){
		if(args.length == 1){
			$gameSystem._drill_BCa_controller._drill_data['holderWidth'] = Number(args[0]);
		};
	};
	if( command === ">开启镜头" || command === ">开启战斗镜头" ){ $gameSystem.drill_BCa_setEnable( true );  };
	if( command === ">关闭镜头" || command === ">关闭战斗镜头" ){ $gameSystem.drill_BCa_setEnable( false ); };
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_BCa_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BCa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BCa_sys_initialize.call(this);
	this.drill_BCa_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BCa_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BCa_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BCa_saveEnabled == true ){	
		$gameSystem.drill_BCa_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BCa_initSysData();
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
Game_System.prototype.drill_BCa_initSysData = function() {
	this.drill_BCa_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BCa_checkSysData = function() {
	this.drill_BCa_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BCa_initSysData_Private = function() {
	
	// > 控制器
	var data = {
		'enable':true,
		'pause':false,
		'holderWidth':DrillUp.g_BCa_limit_width,
		'holderHeight':DrillUp.g_BCa_limit_height,
		'mode':DrillUp.g_BCa_mode,
		
		'autoOffsetX':DrillUp.g_BCa_auto_x,
		'autoOffsetY':DrillUp.g_BCa_auto_y,
		'autoMoveType':DrillUp.g_BCa_auto_moveType,
		'autoMovingTime':DrillUp.g_BCa_auto_moveTime,
		'autoMovingDelay':DrillUp.g_BCa_auto_delay,
		
		'touristKeyboardEnabled':DrillUp.g_BCa_tourist_keyboardEnabled,
		'touristMouseEnabled':DrillUp.g_BCa_tourist_mouseEnabled,
		'touristMouseThickness':DrillUp.g_BCa_tourist_mouseThickness,
		'touristSpeed':DrillUp.g_BCa_tourist_speed,
		
		'defaultRotation':DrillUp.g_BCa_defaultRotation,
		'defaultScaleX':DrillUp.g_BCa_defaultScaleX,
		'defaultScaleY':DrillUp.g_BCa_defaultScaleY,
	};
	this._drill_BCa_controller = new Drill_BCa_Controller( data );
	
	// > 其他插件用 - 镜头架宽度
    this._drill_cam_limit_width = this._drill_BCa_controller._drill_data['holderWidth'];
	
	// > 其他插件用 - 镜头架高度
    this._drill_cam_limit_height = this._drill_BCa_controller._drill_data['holderHeight'];
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BCa_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BCa_controller == undefined ){
		this.drill_BCa_initData();
	}
	
	// > 容器的 空数据 检查
	//	（不含容器）
};


//=============================================================================
// ** 临时变量初始化
//=============================================================================	
var _drill_BCa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_BCa_temp_initialize.call(this);
	
	// > 其他插件用 - 当前镜头位置
	this._drill_cam_pos = [0,0];			
};



//#############################################################################
// ** 【标准模块】单位贴图
//#############################################################################
//##############################
// * 单位贴图 - 获取 - 敌人容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组    （敌人贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_BCa_getEnemySpriteTank = function(){
	return this.drill_BCa_getEnemySpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据敌方索引【标准函数】
//				
//			参数：	> index 数字 （敌方第n个位置，从0开始计数）
//			返回：	> 贴图       （敌人贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BCa_getEnemySpriteByIndex = function( index ){
	return this.drill_BCa_getEnemySpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据敌人ID【标准函数】
//				
//			参数：	> enemy_id 数字（敌人ID）
//			返回：	> 贴图数组     （敌人贴图数组）
//          
//			说明：	> 注意敌人可能有很多个，返回的是数组。
//##############################
Game_Temp.prototype.drill_BCa_getEnemySpriteByEnemyId = function( enemy_id ){
	return this.drill_BCa_getEnemySpriteByEnemyId_Private( enemy_id );
}
//##############################
// * 单位贴图 - 获取 - 角色容器指针【标准函数】
//			
//			参数：	> 无
//			返回：	> 贴图数组   （角色贴图）
//          
//			说明：	> 此函数直接返回容器对象。
//##############################
Game_Temp.prototype.drill_BCa_getActorSpriteTank = function(){
	return this.drill_BCa_getActorSpriteTank_Private();
}
//##############################
// * 单位贴图 - 获取 - 根据我方索引【标准函数】
//				
//			参数：	> index 数字 （我方第n个位置，从0开始计数）
//			返回：	> 贴图       （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BCa_getActorSpriteByIndex = function( index ){
	return this.drill_BCa_getActorSpriteByIndex_Private( index );
}
//##############################
// * 单位贴图 - 获取 - 根据角色ID【标准函数】
//				
//			参数：	> actor_id 数字（角色ID）
//			返回：	> sprite 贴图  （角色贴图）
//          
//			说明：	暂无。
//##############################
Game_Temp.prototype.drill_BCa_getActorSpriteByActorId = function( actor_id ){
	return this.drill_BCa_getActorSpriteByActorId_Private( actor_id );
}
//=============================================================================
// ** 单位贴图（接口实现）
//=============================================================================
//==============================
// * 单位贴图容器 - 获取 - 敌人容器指针（私有）
//==============================
Game_Temp.prototype.drill_BCa_getEnemySpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._enemySprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌方索引（私有）
//==============================
Game_Temp.prototype.drill_BCa_getEnemySpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_BCa_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.index() == index ){
			return enemy_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据敌人ID（私有）
//==============================
Game_Temp.prototype.drill_BCa_getEnemySpriteByEnemyId_Private = function( enemy_id ){
	var sprite_list = this.drill_BCa_getEnemySpriteTank_Private();
	if( sprite_list == undefined ){ return []; }
	var result_list = [];
	for(var i=0; i < sprite_list.length; i++){
		var enemy_sprite = sprite_list[i];
		if( enemy_sprite._battler == undefined ){ continue; }
		if( enemy_sprite._battler.isEnemy() &&
			enemy_sprite._battler.enemyId() == enemy_id ){
			result_list.push( enemy_sprite );
		}
	}
	return result_list;
};
//==============================
// * 单位贴图容器 - 获取 - 角色容器指针（私有）
//==============================
Game_Temp.prototype.drill_BCa_getActorSpriteTank_Private = function(){
	if( SceneManager._scene == undefined ){ return null; }
	if( SceneManager._scene._spriteset == undefined ){ return null; }
	return SceneManager._scene._spriteset._actorSprites;
};
//==============================
// * 单位贴图容器 - 获取 - 根据我方索引（私有）
//==============================
Game_Temp.prototype.drill_BCa_getActorSpriteByIndex_Private = function( index ){
	var sprite_list = this.drill_BCa_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.index() == index ){
			return actor_sprite;
		}
	}
	return null;
};
//==============================
// * 单位贴图容器 - 获取 - 根据角色ID（私有）
//==============================
Game_Temp.prototype.drill_BCa_getActorSpriteByActorId_Private = function( actor_id ){
	var sprite_list = this.drill_BCa_getActorSpriteTank_Private();
	if( sprite_list == undefined ){ return null; }
	for(var i=0; i < sprite_list.length; i++){
		var actor_sprite = sprite_list[i];
		if( actor_sprite._battler == undefined ){ continue; }
		if( actor_sprite._battler.isActor() &&
			actor_sprite._battler.actorId() == actor_id ){
			return actor_sprite;
		}
	}
	return null;
};



//=============================================================================
// ** 镜头控制器函数
//
//			说明：	此处都调用的 控制器 的函数。方便子插件使用函数。
//=============================================================================
//==============================
// * 控制器 - 是否启用【标准函数】
//==============================
Game_System.prototype.drill_BCa_isEnable = function(){
	return this._drill_BCa_controller.drill_BCa_isEnable();
}
//==============================
// * 控制器 - 启用/关闭【标准函数】
//==============================
Game_System.prototype.drill_BCa_setEnable = function( enable ){
	return this._drill_BCa_controller.drill_BCa_setEnable( enable );
}
//==============================
// * 控制器 - 是否暂停【标准函数】
//==============================
Game_System.prototype.drill_BCa_isPause = function(){
	return this._drill_BCa_controller.drill_BCa_isPause();
}
//==============================
// * 控制器 - 暂停/继续【标准函数】
//==============================
Game_System.prototype.drill_BCa_setPause = function( pause ){
	return this._drill_BCa_controller.drill_BCa_setPause( pause );
}

//==============================
// * 镜头架 - 设置宽度【标准函数】
//==============================
Game_System.prototype.drill_BCa_setCameraHolderWidth = function( width ){
	return this._drill_BCa_controller.drill_BCa_setCameraHolderWidth( width );
}
//==============================
// * 镜头架 - 设置高度【标准函数】
//==============================
Game_System.prototype.drill_BCa_setCameraHolderHeight = function( height ){
	return this._drill_BCa_controller.drill_BCa_setCameraHolderHeight( height );
}
//==============================
// * 镜头架 - 镜头的矩形范围【标准函数】
//==============================
Game_System.prototype.drill_BCa_getCameraRect = function(){
	return this._drill_BCa_controller.drill_BCa_getCameraRect();
}
//==============================
// * 镜头架 - 镜头架的矩形范围【标准函数】
//==============================
Game_System.prototype.drill_BCa_getCameraHolderRect = function(){
	return this._drill_BCa_controller.drill_BCa_getCameraHolderRect();
}

//==============================
// * 镜头基点 - 活动范围【标准函数】
//==============================
Game_System.prototype.drill_BCa_getCameraPosRange = function(){
	return this._drill_BCa_controller.drill_BCa_getCameraPosRange();
}
//==============================
// * 镜头基点 - 获取镜头基点偏移位置【标准函数】
//==============================
Game_System.prototype.drill_BCa_getCameraPosOffset = function(){
	return this._drill_BCa_controller.drill_BCa_getCameraPosOffset();
}
//==============================
// * 镜头基点 - 获取镜头变换位置（子贴图用）【标准函数】
//==============================
Game_System.prototype.drill_BCa_getCameraPos_Children = function(){
	return this._drill_BCa_controller.drill_BCa_getCameraPos_Children();
}
//==============================
// * 镜头基点 - 获取镜头变换位置（外部贴图用）【标准函数】
//==============================
Game_System.prototype.drill_BCa_getCameraPos_OuterSprite = function( x, y ){
	return this._drill_BCa_controller.drill_BCa_getCameraPos_OuterSprite( x, y );
}
//==============================
// * 镜头基点 - 落点位置转换（外部贴图 -> 子贴图）【标准函数】
//==============================
Game_System.prototype.drill_BCa_getPos_OuterToChildren = function( x, y ){
	return this._drill_BCa_controller.drill_BCa_getPos_OuterToChildren( x, y );
}
//==============================
// * 镜头基点 - 落点位置转换（子贴图 -> 外部贴图）【标准函数】
//==============================
Game_System.prototype.drill_BCa_getPos_ChildrenToOuter = function( x, y ){
	return this._drill_BCa_controller.drill_BCa_getPos_ChildrenToOuter( x, y );
}
//==============================
// * 镜头基点 - 获取鼠标落点位置（子贴图用）【标准函数】
//==============================
Game_System.prototype.drill_BCa_getMousePos_OnChildren = function(){
	return this._drill_BCa_controller.drill_BCa_getMousePos_OnChildren();
}
//==============================
// * 镜头基点 - 获取鼠标落点位置（外部贴图用）【标准函数】
//==============================
Game_System.prototype.drill_BCa_getMousePos_OnOuterSprite = function(){
	return this._drill_BCa_controller.drill_BCa_getMousePos_OnOuterSprite();
}

//==============================
// * 镜头模式 - 设置模式【标准函数】
//==============================
Game_System.prototype.drill_BCa_setMode = function( mode ){
	this._drill_BCa_controller.drill_BCa_setMode( mode );
}
//==============================
// * 镜头模式 - 获取模式【标准函数】
//==============================
Game_System.prototype.drill_BCa_getMode = function(){
	return this._drill_BCa_controller.drill_BCa_getMode();
}
//==============================
// * 自动模式 - 设置聚焦位置【标准函数】
//==============================
Game_System.prototype.drill_BCa_setAutoPosition = function( x, y ){
	this._drill_BCa_controller.drill_BCa_setAutoPosition( x, y );
}
//==============================
// * 观光模式 - 设置聚焦位置【标准函数】
//==============================
Game_System.prototype.drill_BCa_setTouristPosition = function( x, y ){
	this._drill_BCa_controller.drill_BCa_setTouristPosition( x, y );
}
//==============================
// * 固定看向 - 固定看向位置【标准函数】
//==============================
Game_System.prototype.drill_BCa_setLockPosition = function( x, y ){
	this._drill_BCa_controller.drill_BCa_setLockPosition( x, y );
}
//==============================
// * 固定看向 - 解除固定看向【标准函数】
//==============================
Game_System.prototype.drill_BCa_setUnlock = function(){
	this._drill_BCa_controller.drill_BCa_setUnlock();
}

//==============================
// * 叠加变化 - 执行旋转【标准函数】
//==============================
Game_System.prototype.drill_BCa_doRotate = function( rotation, time, changeType ){
	this._drill_BCa_controller.drill_BCa_doRotate( rotation, time, changeType );
}
//==============================
// * 叠加变化 - 执行缩放X【标准函数】
//==============================
Game_System.prototype.drill_BCa_doScaleX = function( scaleX, time, changeType ){
	this._drill_BCa_controller.drill_BCa_doScaleX( scaleX, time, changeType );
}
//==============================
// * 叠加变化 - 执行缩放Y【标准函数】
//==============================
Game_System.prototype.drill_BCa_doScaleY = function( scaleY, time, changeType ){
	this._drill_BCa_controller.drill_BCa_doScaleY( scaleY, time, changeType );
}
//==============================
// * 叠加变化 - 获取旋转值【标准函数】
//
//			说明：	注意，单位为角度。
//==============================
Game_System.prototype.drill_BCa_getRotateValue = function(){
	return this._drill_BCa_controller.drill_BCa_getRotateValue();
}
//==============================
// * 叠加变化 - 获取缩放X值【标准函数】
//==============================
Game_System.prototype.drill_BCa_getScaleXValue = function(){
	return this._drill_BCa_controller.drill_BCa_getScaleXValue();
}
//==============================
// * 叠加变化 - 获取缩放Y值【标准函数】
//==============================
Game_System.prototype.drill_BCa_getScaleYValue = function(){
	return this._drill_BCa_controller.drill_BCa_getScaleYValue();
}



//=============================================================================
// ** 自动模式标记
//
//			说明：	所有标记内容都会暂存在 $gameTemp 对象中。
//=============================================================================	
//==============================
// * 自动模式标记 - 初始化
//==============================
var _drill_BCa_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_BCa_temp_initialize2.call(this);
    this.drill_BCa_clearCamera();
};
//==============================
// * 自动模式标记 - 清理标记
//==============================
Game_Temp.prototype.drill_BCa_clearCamera = function(){
	
	this._drill_BCa_cur_actor = [null,[0,0]];			//当前选中角色（sv）
	this._drill_BCa_being_attack = [null,[0,0],0];		//受伤害单位
	this._drill_BCa_select_single = [null,[0,0]];		//选中一个单位
	this._drill_BCa_select_single_turn = [null,[0,0]];	//
	this._drill_BCa_select_all = false;					//选中所有单位
	this._drill_BCa_select_all_turn = false;			//
	
	this._drill_BCa_battleEnd = false;					//战斗结束标记
	
	this._drill_BCa_centerX = Graphics.boxWidth *0.5;	//中心点
	this._drill_BCa_centerY = Graphics.boxHeight *0.5;	//
};
//==============================
// * 菜单标记 - 选中全部敌人时（Scene_Battle）
//==============================
var _drill_BCa_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function(){
	var action = BattleManager.inputtingAction();
	$gameTemp._drill_BCa_select_all = action.isForAll();
	_drill_BCa_onSelectAction.call(this);    
};
//==============================
// * 菜单标记 - 角色窗口被隐藏时（Window_BattleActor）
//==============================
var _drill_BCa_win_actor_hide = Window_BattleActor.prototype.hide;
Window_BattleActor.prototype.hide = function(){
    _drill_BCa_win_actor_hide.call(this);
    $gameTemp._drill_BCa_select_all = false;
	$gameTemp._drill_BCa_select_single = null;
};
//==============================
// * 菜单标记 - 选中一个敌人时（Window_BattleActor）
//==============================
var _drill_BCa_win_actor_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index ){
    _drill_BCa_win_actor_select.call(this,index);
	$gameTemp._drill_BCa_select_single = [null,[0,0]];
	if( this.actor() ){$gameTemp._drill_BCa_select_single[0] = this.actor();};
};
//==============================
// * 菜单标记 - 敌人窗口被隐藏时（Window_BattleEnemy）
//==============================
var _drill_BCa_win_enemy_hide = Window_BattleEnemy.prototype.hide; 
Window_BattleEnemy.prototype.hide = function(){
	_drill_BCa_win_enemy_hide.call(this);
	$gameTemp._drill_BCa_select_all = false;
	$gameTemp._drill_BCa_select_single = null;
};
//==============================
// * 菜单标记 - 选中一个角色时（[SV] Window_BattleEnemy）
//==============================
var _drill_BCa_win_enemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index ){
    _drill_BCa_win_enemy_select.call(this,index)
	$gameTemp._drill_BCa_select_single = [null,[0,0]];
	if( this.enemy() ){$gameTemp._drill_BCa_select_single[0] = this.enemy();};
};

//==============================
// * 战斗流程标记 - 清除目标
//==============================
BattleManager.drill_BCa_targetClear = function(){
	$gameTemp._drill_BCa_being_attack = [null,[0,0],0];
	$gameTemp._drill_BCa_select_single_turn = [null,[0,0]];
	$gameTemp._drill_BCa_select_all_turn = false;
};
//==============================
// * 战斗流程标记 - 结束回合
//==============================
var _drill_BCa_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function(){
	_drill_BCa_endTurn.call(this);
	$gameTemp._drill_BCa_being_attack = [null,[0,0],0];
    this.drill_BCa_targetClear();
};
//==============================
// * 战斗流程标记 - 开始释放技能
//==============================
var _drill_BCa_startAction = BattleManager.startAction;
BattleManager.startAction = function(){
	_drill_BCa_startAction.call(this);
    this.drill_BCa_targetClear();
	$gameTemp._drill_BCa_being_attack = [this._subject,[0,0],$gameSystem._drill_cam_ftime];	//确定/聚焦 被攻击对象
	$gameTemp._drill_BCa_select_single_turn[0] = this._targets[0];
	if( this._targets.length > 1 ){ $gameTemp._drill_BCa_select_all_turn = true; }
};
//==============================
// * 战斗流程标记 - 战斗胜利
//==============================
var _drill_BCa_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function(){
	$gameTemp._drill_BCa_battleEnd = true;
	_drill_BCa_processVictory.call(this);	 
};
//==============================
// * 战斗流程标记 - 战斗逃跑
//==============================
var _drill_BCa_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function(){
	$gameTemp._drill_BCa_battleEnd = true;
	_drill_BCa_processAbort.call(this);	 
};
//==============================
// * 战斗流程标记 - 战斗失败
//==============================
var _drill_BCa_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function(){
	$gameTemp._drill_BCa_battleEnd = true;
	_drill_BCa_processDefeat.call(this);	 
};

//==============================
// * 单位标记 - 帧刷新
//==============================
var _drill_BCa_b_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function(){
	_drill_BCa_b_updatePosition.call(this);
    this.drill_BCa_updateCamPos();
};
Sprite_Battler.prototype.drill_BCa_updateCamPos = function(){
	
	// > 选择目标
	$gameTemp._drill_BCa_cur_actor[0] = BattleManager.actor();
	if( $gameTemp._drill_BCa_select_single && 
		$gameTemp._drill_BCa_select_single[0] === this._battler ){
		this.drill_BCa_focusTarget();
	};
	// > 选择目标
	if( $gameTemp._drill_BCa_select_single_turn && 
		$gameTemp._drill_BCa_select_single_turn[0] === this._battler ){ 
		this.drill_BCa_focusTarget_turn();
	};
	// > 被攻击时
	if( $gameTemp._drill_BCa_being_attack && 
		$gameTemp._drill_BCa_being_attack[0] === this._battler ){ 
		this.drill_BCa_focusBeingAttack();
	};
	// > 当前角色
	if( $gameTemp._drill_BCa_cur_actor && 
		$gameTemp._drill_BCa_cur_actor[0] === this._battler ){ 
		this.drill_BCa_focusActor();
	};
};
//==============================
// * 单位标记 - 当前角色
//==============================
Sprite_Battler.prototype.drill_BCa_focusActor = function(){
	$gameTemp._drill_BCa_cur_actor[1][0] = this.x;
	$gameTemp._drill_BCa_cur_actor[1][1] = this.drill_BCa_heightFix();
};
//==============================
// * 单位标记 - 选择目标
//==============================
Sprite_Battler.prototype.drill_BCa_focusTarget = function(){
	$gameTemp._drill_BCa_select_single[1][0] = this.x;
	$gameTemp._drill_BCa_select_single[1][1] = this.drill_BCa_heightFix();
};
//==============================
// * 单位标记 - 选择目标
//==============================
Sprite_Battler.prototype.drill_BCa_focusTarget_turn = function(){
	$gameTemp._drill_BCa_select_single_turn[1][0] = this.x;
	$gameTemp._drill_BCa_select_single_turn[1][1] = this.drill_BCa_heightFix();
};
//==============================
// * 单位标记 - 受伤单位
//==============================
Sprite_Battler.prototype.drill_BCa_focusBeingAttack = function(){
	$gameTemp._drill_BCa_being_attack[1][0] = this.x;
	$gameTemp._drill_BCa_being_attack[1][1] = this.drill_BCa_heightFix();
};	
//==============================
// * 单位标记 - 高度修正（将 战斗贴图 的正下方锚点转移到中心）
//==============================
Sprite_Battler.prototype.drill_BCa_heightFix = function(){
	
	// > 角色贴图的 ._mainSprite SV战斗图
	if( this._mainSprite ){
		return this.y - (this._mainSprite.height / 2);
	}
	
	// > 当前高度贴图
	return this.y - (this.bitmap.height / 2);
};


//=============================================================================
// ** 自动模式聚焦
//=============================================================================
//==============================
// * 聚焦 - 设置聚焦位置
//==============================
Spriteset_Battle.prototype.drill_BCa_setMoveTo = function( x, y ){
	$gameSystem._drill_BCa_controller.drill_BCa_setAutoPosition( x, y );
}
//==============================
// * 聚焦 - 初始化
//==============================
var _drill_BCa_spriteset_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function(){
	
	// > 清理目标
	$gameTemp.drill_BCa_clearCamera(); 
	
	// > 默认移动到中心
	this.drill_BCa_setMoveTo( $gameTemp._drill_BCa_centerX, $gameTemp._drill_BCa_centerY );
	
	// > 原函数
	_drill_BCa_spriteset_initialize.call(this);	
};
//==============================
// * 聚焦 - 帧刷新目标
//==============================
var _drill_BCa_spriteset_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function(){
	_drill_BCa_spriteset_update.call( this );
	this.drill_BCa_updateCameraTarget();
}
Spriteset_Battle.prototype.drill_BCa_updateCameraTarget = function(){
	
	// > 移动到中心
	if( this.drill_BCa_isNeedToCenter() ){
		this.drill_BCa_setMoveTo( $gameTemp._drill_BCa_centerX, $gameTemp._drill_BCa_centerY );
		return;
	};
	
	// > 受伤时镜头震动 - 时间变化
	if( $gameTemp._drill_BCa_being_attack[2] > 0 ){
		$gameTemp._drill_BCa_being_attack[2] -= 1
	};
	
	// > 选择一个敌人/角色
	if( $gameTemp._drill_BCa_select_single && $gameTemp._drill_BCa_select_single[0] ){
		if( !$gameSystem.isSideView() && $gameTemp._drill_BCa_select_single[0].isActor() ){
			var xx = $gameTemp._drill_BCa_centerX;
			var yy = $gameTemp._drill_BCa_centerY;
			this.drill_BCa_setMoveTo(xx, yy);
		}else{
			var xx = $gameTemp._drill_BCa_select_single[1][0];
			var yy = $gameTemp._drill_BCa_select_single[1][1];
			this.drill_BCa_setMoveTo(xx, yy);
		}
	
	// > 受伤时镜头震动
	}else if( this.drill_BCa_isBeingAttack() ){
		if( !$gameSystem.isSideView() && $gameTemp._drill_BCa_being_attack[0].isActor() ){
			var xx = $gameTemp._drill_BCa_centerX;
			var yy = $gameTemp._drill_BCa_centerY;
			this.drill_BCa_setMoveTo(xx, yy);
		}else{
			var xx = $gameTemp._drill_BCa_being_attack[1][0];
			var yy = $gameTemp._drill_BCa_being_attack[1][1];
			this.drill_BCa_setMoveTo(xx, yy);
		}
	
	// > 敌人回合
	}else if( this.drill_BCa_isTarget() ){
		var xx = $gameTemp._drill_BCa_select_single_turn[1][0];
		var yy = $gameTemp._drill_BCa_select_single_turn[1][1];
		this.drill_BCa_setMoveTo(xx, yy);
	
	// > 角色回合
	}else if( this.drill_BCa_isActor() ){
		var xx = $gameTemp._drill_BCa_cur_actor[1][0];
		var yy = $gameTemp._drill_BCa_cur_actor[1][1];
		this.drill_BCa_setMoveTo(xx, yy);
	
	// > 其他情况回到中心
	}else{
		this.drill_BCa_setMoveTo( $gameTemp._drill_BCa_centerX, $gameTemp._drill_BCa_centerY );
	}
};
//==============================
// * 聚焦判断 - 移动到 - 中心
//==============================
Spriteset_Battle.prototype.drill_BCa_isNeedToCenter = function(){
    if( $gameTemp._drill_BCa_select_all ){ return true; }			//（选中所有单位时）
    if( $gameTemp._drill_BCa_select_all_turn ){ return true; }		//（释放群体单位技能时）
    if( $gameTemp._drill_BCa_battleEnd ){ return true; }			//（战斗结束时）
    return false
};
//==============================
// * 聚焦判断 - 移动到 - 受伤害目标
//==============================
Spriteset_Battle.prototype.drill_BCa_isBeingAttack = function(){
	if( !$gameTemp._drill_BCa_being_attack ){ return false };
	if( !$gameTemp._drill_BCa_being_attack[0] ){ return false };
	if( $gameTemp._drill_BCa_being_attack[2] === 0 ){ return false };
	if( Imported.MOG_ATB ){
		if( this._phase != 'start' ){ return false };
	};
	return true;
};
//==============================
// * 聚焦判断 - 移动到 - 敌人回合
//==============================
Spriteset_Battle.prototype.drill_BCa_isTarget = function(){
	if( !$gameTemp._drill_BCa_select_single_turn ){ return false };
	if( !$gameTemp._drill_BCa_select_single_turn[0] ){ return false };
	if( !$gameSystem.isSideView() && $gameTemp._drill_BCa_select_single_turn[0].isActor() ){ return false };
	return true;
};
//==============================
// * 聚焦判断 - 移动到 - 角色回合
//==============================
Spriteset_Battle.prototype.drill_BCa_isActor = function(){
	if( !$gameSystem.isSideView() ){ return false };
	if( !$gameTemp._drill_BCa_cur_actor ){ return false };
	if( !$gameTemp._drill_BCa_cur_actor[0] ){ return false };
	return true;
};


//=============================================================================
// ** 兼容YEP
//=============================================================================
if( Imported.YEP_CoreEngine ){
	var _drill_BCa_scaleSprite = Sprite_Battleback.prototype.scaleSprite;
	Sprite_Battleback.prototype.scaleSprite = function(){
		_drill_BCa_scaleSprite.call(this);
		if( $gameSystem.isSideView() ){
			this.anchor.y = 0.5;				//强制yep的sprite的圆心为0.5
			this.y = Graphics.boxHeight / 2;
		}
	};
}
//=============================================================================
// ** 兼容MOG
//=============================================================================
//==============================
// * MOG - 帧刷新
//==============================
var _drill_mog_ballon_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function(){
	_drill_mog_ballon_update.call(this);
	if( Imported.MOG_BalloonActionName && this._balloonField ){	// 技能 - 招式名气泡框
		this._balloonField.x = this._battleField.x
		this._balloonField.y = this._battleField.y
	};
	if( Imported.MOG_ChainCommands && this._bchain ){		// 技能 - 按键连锁攻击
	   this._bchain.x = this._battleField.x;
	   this._bchain.y = this._battleField.y;
	};
	if( Imported.MOG_HPGauge && this._hpField ){		// 敌人 - 生命浮动框
		this._hpField.x = this._battleField.x
		this._hpField.y = this._battleField.y
	};
};
//==============================
// * MOG - 按键连锁攻击
//==============================
if( Imported.MOG_ChainCommands ){
	var _drill_mog_updateFocus = Spriteset_Battle.prototype.updateFocus;
	Spriteset_Battle.prototype.updateFocus = function(){
		if( $gameTemp._bchainTemp ){ $gameTemp._drill_BCa_being_attack[2] = 0 };//技能 - 按键连锁攻击（下一段招不等待）
		_drill_mog_updateFocus.call(this);
	};
};
//==============================
// * MOG - 车轮战
//==============================
if( Imported.MOG_ConsecutiveBattles ){
	var _drill_mog_prepareConBat = BattleManager.prepareConBat;
	BattleManager.prepareConBat = function(){
		$gameTemp.drill_BCa_clearCamera();		//清理镜头属性
		_drill_mog_prepareConBat.call(this);
	}
}



//=============================================================================
// ** 镜头控制
//=============================================================================
//==============================
// * 镜头控制 - 战斗结束恢复默认
//==============================
var _drill_BCa_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function( result ){
	_drill_BCa_endBattle.call( this, result );
	
	// > 战斗结束后是否恢复默认
	if( DrillUp.g_BCa_resetDefaultInBattleEnd == true ){
		$gameSystem.drill_BCa_doScaleX( DrillUp.g_BCa_defaultScaleX, 20, "匀速变化" );
		$gameSystem.drill_BCa_doScaleY( DrillUp.g_BCa_defaultScaleY, 20, "匀速变化" );
		$gameSystem.drill_BCa_doRotate( DrillUp.g_BCa_defaultRotation, 20, "匀速变化" );
	}
}
//==============================
// * 镜头控制 - 帧刷新
//==============================
var _drill_BCa_spriteset_update2 = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function(){
	_drill_BCa_spriteset_update2.call(this);
	if( $gameSystem._drill_BCa_controller.drill_BCa_isEnable() != true ){ return; }
	this.drill_BCa_updateCameraControl();		//帧刷新 - 镜头控制
};
//==============================
// * 帧刷新 - 镜头控制
//==============================
Spriteset_Battle.prototype.drill_BCa_updateCameraControl = function(){
	
	// > 控制器帧刷新
	$gameSystem._drill_BCa_controller.drill_BCa_update();
	
	// > 基本属性赋值
	//		【注意，此处的赋值，将会大幅度影响 在图层内、在图层外 的全部算法关系】
	//		【一定要考虑清楚镜头控制哪些层！下层、上层、图片层、最顶层】
	this._battleField.x = $gameSystem._drill_BCa_controller._drill_x;								//坐标X
	this._battleField.y = $gameSystem._drill_BCa_controller._drill_y;								//坐标Y
	this._battleField.rotation = $gameSystem._drill_BCa_controller._drill_rotation /180*Math.PI;	//旋转（弧度）
	this._battleField.scale.x = $gameSystem._drill_BCa_controller._drill_scaleX;					//缩放X
	this._battleField.scale.y = $gameSystem._drill_BCa_controller._drill_scaleY;					//缩放Y
	
	// > 位置赋值
	$gameTemp._drill_cam_pos[0] = Math.floor($gameSystem._drill_BCa_controller._drill_cameraX_Children);
	$gameTemp._drill_cam_pos[1] = Math.floor($gameSystem._drill_BCa_controller._drill_cameraY_Children);
	
	// > 镜头架赋值
	$gameSystem._drill_cam_limit_width = $gameSystem._drill_BCa_controller._drill_data['holderWidth'];
	$gameSystem._drill_cam_limit_height = $gameSystem._drill_BCa_controller._drill_data['holderHeight'];
};
//==============================
// * 镜头控制 - 战斗图层默认两个背景
//==============================
var _drill_BCa_spriteset_createBattleback = Spriteset_Battle.prototype.createBattleback
Spriteset_Battle.prototype.createBattleback = function(){
	_drill_BCa_spriteset_createBattleback.call(this);
	if( $gameSystem._drill_BCa_controller.drill_BCa_isEnable() != true ){ return; }
	
	// > 强制将锚点转移到中心
	this._back1Sprite.anchor.x = 0.5;
	this._back1Sprite.anchor.y = 0.5;
	this._back1Sprite.x = $gameTemp._drill_BCa_centerX;
	this._back1Sprite.y = $gameTemp._drill_BCa_centerY;
	this._back2Sprite.anchor.x = 0.5;
	this._back2Sprite.anchor.y = 0.5;
	this._back2Sprite.x = $gameTemp._drill_BCa_centerX;
	this._back2Sprite.y = $gameTemp._drill_BCa_centerY;
};



//=============================================================================
// ** 镜头控制器【Drill_BCa_Controller】
// **			
// **		索引：	BCa（可从子插件搜索到函数、类用法）
// **		来源：	独立数据
// **		实例：	> 见当前插件 _drill_BCa_sys_initialize 函数
// **		应用：	> 见当前插件 drill_BCa_updateCameraControl 函数
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个专门控制镜头变化的数据类。
// **		子功能：	->帧刷新
// **						->启用/关闭
// **						->暂停/继续
// **						> 平移
// **						> 旋转
// **						> 缩放
// **					->镜头架（单位像素）
// **						->高宽设置
// **						->镜头的矩形范围
// **						->镜头架的矩形范围
// **						->缩放自适应 x
// **					->镜头基点
// **						->活动范围
// **						->获取镜头基点偏移位置
// **						->获取镜头变换位置（子贴图用）
// **						->获取镜头变换位置（外部贴图用）
// **						->落点位置转换（外部贴图 -> 子贴图）
// **						->落点位置转换（子贴图 -> 外部贴图）
// **						->获取鼠标落点位置（子贴图用）
// **						->获取鼠标落点位置（外部贴图用）
// **					->镜头模式
// **						->保持切换模式时的位置
// **						->自动模式
// **							->设置聚焦位置
// **							> 镜头切换时间
// **							> 镜头切换延迟
// **							> 镜头切换时移动模式
// **						->观光模式
// **							->设置聚焦位置
// **							->键盘控制
// **							->鼠标控制
// **					->固定看向
// **						->固定-自动模式
// **						->固定-观光模式
// **						x->立刻看向目标位置
// **					->叠加变化
// **						->默认值
// **						->镜头旋转
// **						->镜头缩放
// **						->镜头翻转
// **					
// **		说明：	> 该类为单例，并存储在 $gameSystem 中。
// **				> 如果思路没跟上，去看 必要注意事项。
// **				> 可以结合 文档 理解具体功能。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_BCa_Controller(){
	this.initialize.apply(this, arguments);
}
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_BCa_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_BCa_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_initData();													//初始化数据
    this.drill_initPrivateData();											//私有数据初始化
	if( data == undefined ){ data = {}; }
    this.drill_BCa_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_update = function(){
	
	this._drill_curTime += 1;			//帧刷新 - 时间流逝
	if( this._drill_data['pause'] == true ){ return; }
	
	this.drill_updateTouristMode();		//帧刷新 - 观光模式
	this.drill_updateRotation();		//帧刷新 - 旋转
	this.drill_updateScale();			//帧刷新 - 缩放
	this.drill_updateOffset();			//帧刷新 - 镜头基点
	this.drill_updatePosition();		//帧刷新 - 平移
	this.drill_updateCheckNaN();		//帧刷新 - 校验值
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
Drill_BCa_Controller.prototype.drill_BCa_resetData = function( data ){
	this.drill_BCa_resetData_Private( data );
};
//##############################
// * 控制器 - 立即复原（暂未使用）【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 立即恢复无镜头控制的初始状态。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_restore = function(){
    this.drill_BCa_restore_Private();
};
//##############################
// * 控制器 - 是否启用【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_isEnable = function(){
	return this._drill_data['enable'];
};
//##############################
// * 控制器 - 启用/关闭【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_setEnable = function( enable ){
	var data = this._drill_data;
	data['enable'] = enable;
};
//##############################
// * 控制器 - 是否暂停【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_isPause = function(){
	return this._drill_data['pause'];
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};

//##############################
// * 镜头架 - 设置宽度【标准函数】
//
//			参数：	> width 数字
//			返回：	> 无
//##############################
Drill_BCa_Controller.prototype.drill_BCa_setCameraHolderWidth = function( width ){
	var data = this._drill_data;
	data['holderWidth'] = width;
	this.drill_BCa_refreshHolder();
}
//##############################
// * 镜头架 - 设置高度【标准函数】
//
//			参数：	> height 数字
//			返回：	> 无
//##############################
Drill_BCa_Controller.prototype.drill_BCa_setCameraHolderHeight = function( height ){
	var data = this._drill_data;
	data['holderHeight'] = height;
	this.drill_BCa_refreshHolder();
}
//##############################
// * 镜头架 - 镜头的矩形范围【标准函数】
//
//			参数：	> 无
//			返回：	> 矩形对象（x,y,宽,高）（单位像素）
//			
//			说明：	> 此函数为基函数，不要放入私有参数，会出现死循环。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getCameraRect = function(){
	return new Rectangle( 0, 0, Graphics.boxWidth, Graphics.boxHeight );
}
//##############################
// * 镜头架 - 镜头架的矩形范围【标准函数】
//
//			参数：	> 无
//			返回：	> 矩形对象（x,y,宽,高）（单位像素）
//			
//			说明：	> 此函数为基函数，不要放入私有参数，会出现死循环。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getCameraHolderRect = function(){
	var data = this._drill_data;
	var xx = (Graphics.boxWidth - data['holderWidth']) *0.5;
	var yy = (Graphics.boxHeight - data['holderHeight']) *0.5;
	return new Rectangle( xx, yy, data['holderWidth'], data['holderHeight'] );
}

//##############################
// * 镜头基点 - 活动范围【标准函数】
//
//			参数：	> 无
//			返回：	> 矩形对象（x,y,宽,高）（单位像素）
//			
//			说明：	> 镜头基点（左上角锚点）的活动范围。一般为 (-100,-100,200,200) 的矩形范围。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getCameraPosRange = function(){
	return new Rectangle( this._drill_holderX, this._drill_holderY, this._drill_holderMaxX-this._drill_holderX, this._drill_holderMaxY-this._drill_holderY );
}
//##############################
// * 镜头基点 - 获取镜头基点偏移位置【标准函数】
//
//			参数：	> 无
//			返回：	> 坐标对象（x,y）
//			
//			说明：	> 此函数返回 活动范围内 的偏移量。
//					> 此函数不包含 旋转与缩放 的坐标影响。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getCameraPosOffset = function(){
	return {'x': this._drill_cameraX_offset, 'y': this._drill_cameraY_offset };
}
//##############################
// * 镜头基点 - 获取镜头变换位置（子贴图用）【标准函数】
//
//			参数：	> 无
//			返回：	> 坐标对象（x,y）
//			
//			说明：	> 此函数适用于 下层、上层 的贴图对象，直接减去 返回值 即可实现贴图与镜头同步。
//					> 此函数已包含 旋转与缩放 的坐标影响。
//					> 子贴图不需考虑 旋转与缩放 贴图变化的影响。
//					> 使用方法可以见后面函数：drill_BCa_DEBUG_updateSprite
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getCameraPos_Children = function(){
	//（如果此处思路没跟上，去看 必要注意事项 ）
	return {'x': this._drill_cameraX_Children, 'y': this._drill_cameraY_Children };
}
//##############################
// * 镜头基点 - 获取镜头变换位置（外部贴图用）【标准函数】
//
//			参数：	> cur_x 数字 （外部贴图的位置X）
//					> cur_y 数字 （外部贴图的位置Y）
//			返回：	> 坐标对象（x,y）
//			
//			说明：	> 此函数适用于 图片层、最顶层 的贴图对象。
//					> 此函数已包含 旋转与缩放 的坐标影响。
//					> 外部贴图需要考虑 旋转与缩放 贴图变化的影响。
//					> 由于外部贴图一般都是 图片、UI。
//					  而这些贴图可以选择【不移动】，直接贴在镜头上，因此对于UI、图片，可能用不上。
//					> 使用方法可以见后面函数：drill_BCa_DEBUG_updateSprite
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getCameraPos_OuterSprite = function( cur_x, cur_y ){
	//（如果此处思路没跟上，去看 必要注意事项 ）
	return this.drill_BCa_getCameraPos_OuterSprite_Private( cur_x, cur_y );
}
//##############################
// * 镜头基点 - 落点位置转换（外部贴图 -> 子贴图）【标准函数】
//
//			参数：	> 坐标对象（x,y）（单位像素）
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 此函数适用于 图片层、最顶层 的坐标，落点到 上层、中层、下层 的坐标。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getPos_OuterToChildren = function( x, y ){
	return this.drill_BCa_getPos_OuterToChildren_Private( x, y );
}
//##############################
// * 镜头基点 - 落点位置转换（子贴图 -> 外部贴图）【标准函数】
//
//			参数：	> 坐标对象（x,y）（单位像素）
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 此函数适用于 上层、中层、下层 的坐标，落点到 图片层、最顶层 的坐标。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getPos_ChildrenToOuter = function( x, y ){
	return this.drill_BCa_getPos_ChildrenToOuter_Private( x, y );
}
//##############################
// * 镜头基点 - 获取落点位置 - 鼠标（子贴图用）【标准函数】
//
//			参数：	无
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 此函数适用于 下层、上层 的贴图对象，获取到鼠标的 落点位置 。不含触屏情况。
//					> 使用方法可以见后面函数：drill_BCa_DEBUG_updateMousePosition
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getMousePos_OnChildren = function(){
	return this._drill_mousePos_OnChildren;
}
//##############################
// * 镜头基点 - 获取落点位置 - 鼠标（外部贴图用）【标准函数】
//
//			参数：	无
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 此函数适用于 图片层、最顶层 的贴图对象，获取到鼠标的 落点位置 。不含触屏情况。
//					> 使用方法可以见后面函数：drill_BCa_DEBUG_updateMousePosition
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getMousePos_OnOuterSprite = function(){
	return this._drill_mousePos_OnOuterSprite;
}

//##############################
// * 镜头模式 - 设置模式【标准函数】
//
//			参数：	> mode 字符串
//			返回：	> 无
//##############################
Drill_BCa_Controller.prototype.drill_BCa_setMode = function( mode ){
	var data = this._drill_data;
	if( mode == "自动模式" ){ data['mode'] = "自动模式"; }
	if( mode == "观光模式" ){ data['mode'] = "观光模式"; }
}
//##############################
// * 镜头模式 - 获取模式【标准函数】
//
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getMode = function(){
	var data = this._drill_data;
	return data['mode'];
}
//##############################
// * 自动模式 - 设置聚焦位置【标准函数】
//
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//
//			说明：	坐标值为 战斗参照 。此函数不能放在帧刷新中使用，需要缓冲时间。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_setAutoPosition = function( x, y ){
    this.drill_BCa_setAutoPosition_Private( x, y );
}
//##############################
// * 观光模式 - 设置聚焦位置【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//
//			说明：	设置后，将会覆盖 当前位置。如果是临时看向然后返回，用"固定看向位置"。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_setTouristPosition = function( x, y ){
	this._drill_tourist_curX = x;
	this._drill_tourist_curY = y;
}
//##############################
// * 固定看向 - 固定看向位置【标准函数】
//
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//
//			说明：	坐标值为 镜头参照 。
//##############################
Drill_BCa_Controller.prototype.drill_BCa_setLockPosition = function( x, y ){
	this.drill_BCa_setLockPosition_Private( x, y );
}
//##############################
// * 固定看向 - 解除固定看向【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_BCa_Controller.prototype.drill_BCa_setUnlock = function(){
	this.drill_BCa_setUnlock_Private();
	this._drill_lockPos = false;
}
//##############################
// * 固定看向 - 立刻看向目标位置【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//==============================
//Drill_BCa_Controller.prototype.drill_BCa_setLookAtImmediately = function(){
//	//（无此函数）
//}

//##############################
// * 叠加变化 - 执行旋转【标准函数】
//
//			参数：	> rotation 数字    （旋转值，单位角度）
//					> time 数字        （时长）
//					> changeType 字符串（匀速变化/弹性变化/增减速变化）
//			返回：	> 无
//##############################
Drill_BCa_Controller.prototype.drill_BCa_doRotate = function( rotation, time, changeType ){
    this.drill_BCa_doRotate_Private( rotation, time, changeType );
}
//##############################
// * 叠加变化 - 执行缩放X【标准函数】
//
//			参数：	> scaleX 数字      （缩放X）
//					> time 数字        （时长）
//					> changeType 字符串（匀速变化/弹性变化/增减速变化）
//			返回：	> 无
//##############################
Drill_BCa_Controller.prototype.drill_BCa_doScaleX = function( scaleX, time, changeType ){
    this.drill_BCa_doScaleX_Private( scaleX, time, changeType );
}
//##############################
// * 叠加变化 - 执行缩放Y【标准函数】
//
//			参数：	> scaleY 数字      （缩放Y）
//					> time 数字        （时长）
//					> changeType 字符串（匀速变化/弹性变化/增减速变化）
//			返回：	> 无
//##############################
Drill_BCa_Controller.prototype.drill_BCa_doScaleY = function( scaleY, time, changeType ){
    this.drill_BCa_doScaleY_Private( scaleY, time, changeType );
}
//##############################
// * 叠加变化 - 获取旋转值【标准函数】
//
//			参数：	> 无
//			返回：	> 数字 （旋转值，单位角度）
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getRotateValue = function(){
    return this._drill_rotation;
}
//##############################
// * 叠加变化 - 获取缩放X值【标准函数】
//
//			参数：	> 无
//			返回：	> 数字 （缩放X）
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getScaleXValue = function(){
    return this._drill_scaleX;
}
//##############################
// * 叠加变化 - 获取缩放Y值【标准函数】
//
//			参数：	> 无
//			返回：	> 数字 （缩放Y）
//##############################
Drill_BCa_Controller.prototype.drill_BCa_getScaleYValue = function(){
    return this._drill_scaleY;
}

//##############################
// * 控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_BCa_Controller.prototype.drill_initData = function(){
	var data = this._drill_data;
	
	// > 默认值
	if( data['enable'] == undefined ){ data['enable'] = true };									//启用情况
	if( data['pause'] == undefined ){ data['pause'] = false };									//暂停情况
	if( data['holderWidth'] == undefined ){ data['holderWidth'] = 100 };						//镜头架宽度
	if( data['holderHeight'] == undefined ){ data['holderHeight'] = 100 };						//镜头架高度
	if( data['mode'] == undefined ){ data['mode'] = "自动模式" };								//镜头模式
	
	if( data['autoOffsetX'] == undefined ){ data['autoOffsetX'] = 0 };							//自动模式 - 偏移X
	if( data['autoOffsetY'] == undefined ){ data['autoOffsetY'] = 0 };							//自动模式 - 偏移Y
	if( data['autoMoveType'] == undefined ){ data['autoMoveType'] = "弹性移动" };				//自动模式 - 镜头切换时移动模式
	if( data['autoMovingTime'] == undefined ){ data['autoMovingTime'] = 30 };					//自动模式 - 镜头切换时间
	if( data['autoMovingDelay'] == undefined ){ data['autoMovingDelay'] = 20 };					//自动模式 - 镜头切换延迟
	
	if( data['touristKeyboardEnabled'] == undefined ){ data['touristKeyboardEnabled'] = true };	//观光模式 - 是否启用键盘操作
	if( data['touristMouseEnabled'] == undefined ){ data['touristMouseEnabled'] = true };		//观光模式 - 是否启用鼠标操作
	if( data['touristMouseThickness'] == undefined ){ data['touristMouseThickness'] = 40 };		//观光模式 - 鼠标触发区域的厚度
	if( data['touristSpeed'] == undefined ){ data['touristSpeed'] = 4.5 };						//观光模式 - 镜头移动速度
	
	if( data['defaultRotation'] == undefined ){ data['defaultRotation'] = 0 };					//叠加变化 - 默认旋转角度
	if( data['defaultScaleX'] == undefined ){ data['defaultScaleX'] = 1.0 };					//叠加变化 - 默认X缩放比例
	if( data['defaultScaleY'] == undefined ){ data['defaultScaleY'] = 1.0 };					//叠加变化 - 默认Y缩放比例
}
//==============================
// * 初始化 - 私有数据初始化
//==============================
Drill_BCa_Controller.prototype.drill_initPrivateData = function(){
	var data = this._drill_data;
	
	// > 不接受零高宽情况
	if( data['holderWidth'] == 0 || data['holderHeight'] == 0 ){
		alert(
			"【Drill_BattleCamera.js 战斗-活动战斗镜头】\n"+
			"参数错误，出现了镜头架宽度或镜头架高度不能为零。"
		);
		return;
	}
	
	
	// > 初始化 - 私有变量
	this._drill_curTime = 0;				//基本属性 - 当前时间进度
	this._drill_needDestroy = false;		//基本属性 - 销毁标记（暂未用到）
	this._drill_x = 0;						//基本属性 - 图层位置x（直接赋值 _battleField.x ）
	this._drill_y = 0;						//基本属性 - 图层位置y（直接赋值 _battleField.y ）
	this._drill_rotation = 0;				//基本属性 - 图层旋转（单位角度）
	this._drill_scaleX = 1;					//基本属性 - 图层缩放x
	this._drill_scaleY = 1;					//基本属性 - 图层缩放y
	
	this._drill_cameraX_offset = 0;			//镜头基点 - 位置x
	this._drill_cameraY_offset = 0;			//镜头基点 - 位置y
	this._drill_cameraX_Children = 0;		//镜头基点 - 变换位置x（子贴图用）
	this._drill_cameraY_Children = 0;		//镜头基点 - 变换位置y（子贴图用）
	this._drill_mousePos_OnChildren = 0;	//镜头基点 - 鼠标落点位置（子贴图用）
	this._drill_mousePos_OnOuterSprite = 0;	//镜头基点 - 鼠标落点位置（外部贴图用）
	
	
	this._drill_autoPos_cutTime = 0;		//自动模式 - 当前时间
	this._drill_autoPos_curX = 0;			//自动模式 - 当前位置x
	this._drill_autoPos_curY = 0;			//自动模式 - 当前位置y
	this._drill_autoPos_lastX = -1;			//自动模式 - 位置标记x
	this._drill_autoPos_lastY = -1;			//自动模式 - 位置标记y
	this._drill_COBa_x = [0];				//自动模式 - 弹道x
	this._drill_COBa_y = [0];				//自动模式 - 弹道y
	
	this._drill_tourist_mouseX = 0;			//观光模式 - 当前鼠标位置X
	this._drill_tourist_mouseY = 0;			//观光模式 - 当前鼠标位置Y
	this._drill_tourist_mouseDirection = 5;	//观光模式 - 当前鼠标方向
	this._drill_tourist_curXSpeed = 0;		//观光模式 - 当前速度x
	this._drill_tourist_curYSpeed = 0;		//观光模式 - 当前速度y
	this._drill_tourist_curX = 0;			//观光模式 - 当前位置x
	this._drill_tourist_curY = 0;			//观光模式 - 当前位置y
	
	
	this._drill_lockPos = false;			//固定看向 - 开关
	this._drill_lockPos_x = 0;				//固定看向 - 位置x
	this._drill_lockPos_y = 0;				//固定看向 - 位置y
	
	this._drill_rotation_curTime = 0;		//叠加变化 - 旋转 - 当前时间
	this._drill_rotation_tarTime = 0;		//叠加变化 - 旋转 - 目标时间
	this._drill_rotation_ballistics = null;	//叠加变化 - 旋转 - 弹道
	this._drill_scaleX_curTime = 0;			//叠加变化 - 旋转 - 当前时间
	this._drill_scaleX_tarTime = 0;			//叠加变化 - 旋转 - 目标时间
	this._drill_scaleX_ballistics = null;	//叠加变化 - 旋转 - 弹道
	this._drill_scaleY_curTime = 0;			//叠加变化 - 旋转 - 当前时间
	this._drill_scaleY_tarTime = 0;			//叠加变化 - 旋转 - 目标时间
	this._drill_scaleY_ballistics = null;	//叠加变化 - 旋转 - 弹道
	
	// > 初始化 - 函数
	this.drill_BCa_refreshHolder();			//镜头架 - 刷新范围
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_BCa_Controller.prototype.drill_BCa_resetData_Private = function( data ){
	
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
    this.drill_initData();													//初始化数据
    this.drill_initPrivateData();											//私有数据初始化
}
//==============================
// * 控制器 - 立即复原（私有）
//==============================
Drill_BCa_Controller.prototype.drill_BCa_restore_Private = function(){
	//...
}


//==============================
// * 镜头架 - 刷新范围
//==============================
Drill_BCa_Controller.prototype.drill_BCa_refreshHolder = function(){
	var holder_rect = this.drill_BCa_getCameraHolderRect();
	var camera_rect = this.drill_BCa_getCameraRect();
	
	// > 镜头基点的活动范围
	this._drill_holderX = holder_rect['x'];
	this._drill_holderMaxX = holder_rect['x'] + holder_rect['width'] - camera_rect['width'];
	this._drill_holderY = holder_rect['y'];
	this._drill_holderMaxY = holder_rect['y'] + holder_rect['height'] - camera_rect['height'];
	
	// > 镜头架比镜头还小情况（范围固定为零）
	if( holder_rect['width'] < camera_rect['width'] ){
		this._drill_holderX = 0;
		this._drill_holderMaxX = 0;
	}
	if( holder_rect['height'] < camera_rect['height'] ){
		this._drill_holderY = 0;
		this._drill_holderMaxY = 0;
	}
}
//==============================
// * 镜头架 - 获取范围内的位置X
//==============================
Drill_BCa_Controller.prototype.drill_BCa_getXInHolder = function( x ){
    if( x > this._drill_holderMaxX ){ return this._drill_holderMaxX; }
    if( x < this._drill_holderX ){ return this._drill_holderX; }
	return x;
}
//==============================
// * 镜头架 - 获取范围内的位置Y
//==============================
Drill_BCa_Controller.prototype.drill_BCa_getYInHolder = function( y ){
    if( y > this._drill_holderMaxY ){ return this._drill_holderMaxY; }
    if( y < this._drill_holderY ){ return this._drill_holderY; }
	return y;
}
//==============================
// * 镜头基点 - 获取镜头变换位置（子贴图用）（私有）
//
//			说明：	为防止调用太多增加计算负担，此函数每帧执行一次，将结果放在参数中。
//==============================
Drill_BCa_Controller.prototype.drill_BCa_updateCameraPos_Children = function(){
    
	// > 镜头偏移量
	var ox = this._drill_cameraX_offset;
	var oy = this._drill_cameraY_offset;
	var rect_width = Graphics.boxWidth;
	var rect_height = Graphics.boxHeight;
	
	// > 镜头变化时的矩阵偏移量（正向变换）
	var point_a = $gameTemp.drill_BCa_getPointWithTransform( 
						rect_width, rect_height,
						Graphics.boxWidth*0.5, Graphics.boxHeight*0.5,
						this._drill_rotation /180*Math.PI, 
						this._drill_scaleX, this._drill_scaleY 
				  );
	ox += point_a.x;
	oy += point_a.y;
	ox -= rect_width;
	oy -= rect_height;
			
	// > 逆向变换
	var point_b = $gameTemp.drill_BCa_getPointWithTransformInversed( 
						ox, oy,
						Graphics.boxWidth*0.5, Graphics.boxHeight*0.5,
						this._drill_rotation /180*Math.PI, 
						this._drill_scaleX, this._drill_scaleY 
				  );
	ox = point_b.x;
	oy = point_b.y;
	
	// > 坐标再反转
	if( this._drill_scaleX < 0 ){ ox *= -1; }
	if( this._drill_scaleY < 0 ){ oy *= -1; }
	var ro = (this._drill_rotation%360 + 360)%360;
	if( ro > 90 && ro < 270 ){
		ox *= -1;
		oy *= -1;
	}
	
	this._drill_cameraX_Children = ox;
	this._drill_cameraY_Children = oy;
}
//==============================
// * 镜头基点 - 获取镜头变换位置（外部贴图用）（私有）
//==============================
Drill_BCa_Controller.prototype.drill_BCa_getCameraPos_OuterSprite_Private = function( cur_x, cur_y ){
	
	// > 直接执行一次正向变换即可
	var outer_point = $gameTemp.drill_BCa_getPointWithTransform( 
							cur_x, cur_y,
							Graphics.boxWidth*0.5, Graphics.boxHeight*0.5,
							this._drill_rotation /180*Math.PI, 
							this._drill_scaleX, this._drill_scaleY 
					  );
	return outer_point;
}
//==============================
// * 镜头基点 - 落点位置转换（外部贴图 -> 子贴图）（私有）
//==============================
Drill_BCa_Controller.prototype.drill_BCa_getPos_OuterToChildren_Private = function( x, y ){
	var xx = x;
	var yy = y;
	var rect_width = Graphics.boxWidth*1.5;
	var rect_height = Graphics.boxHeight*1.5;
	
	// > 镜头变化时的矩阵偏移量（正向变换）
	var point_a = $gameTemp.drill_BCa_getPointWithTransform( 
						rect_width, rect_height,
						Graphics.boxWidth*0.5, Graphics.boxHeight*0.5,
						this._drill_rotation /180*Math.PI, 
						this._drill_scaleX, this._drill_scaleY 
				);
	xx += point_a.x;
	yy += point_a.y;
	xx -= rect_width;
	yy -= rect_height;
	
	// > 逆向变换
	var point_b = $gameTemp.drill_BCa_getPointWithTransformInversed( 
						xx, yy,
						Graphics.boxWidth*0.5, Graphics.boxHeight*0.5,
						this._drill_rotation /180*Math.PI, 
						this._drill_scaleX, this._drill_scaleY 
				);
	xx = point_b.x;
	yy = point_b.y;
	
	// > 叠加镜头变换位置
	xx -= this._drill_cameraX_Children;
	yy -= this._drill_cameraY_Children;
	
	return { 'x':xx, 'y':yy };
}
//==============================
// * 镜头基点 - 落点位置转换（子贴图 -> 外部贴图）（私有）
//==============================
Drill_BCa_Controller.prototype.drill_BCa_getPos_ChildrenToOuter_Private = function( x, y ){
	var xx = x;
	var yy = y;
	
	// > 直接执行一次正向变换即可
	var outer_point = $gameTemp.drill_BCa_getPointWithTransform( 
							xx, yy,
							Graphics.boxWidth*0.5, Graphics.boxHeight*0.5,
							this._drill_rotation /180*Math.PI, 
							this._drill_scaleX, this._drill_scaleY 
					  );
	return outer_point;
}
//==============================
// * 镜头基点 - 获取落点位置 - 鼠标（子贴图用）（私有）
//
//			说明：	为防止调用太多增加计算负担，此函数每帧执行一次，将结果放在参数中。
//==============================
Drill_BCa_Controller.prototype.drill_BCa_updateMousePos_OnChildren = function(){
	var xx = _drill_mouse_x;
	var yy = _drill_mouse_y;
	this._drill_mousePos_OnChildren = this.drill_BCa_getPos_OuterToChildren_Private( xx, yy );
}
//==============================
// * 镜头基点 - 获取落点位置 - 鼠标（外部贴图用）（私有）
//
//			说明：	为防止调用太多增加计算负担，此函数每帧执行一次，将结果放在参数中。
//==============================
Drill_BCa_Controller.prototype.drill_BCa_updateMousePos_OnOuterSprite = function(){
	var xx = _drill_mouse_x;
	var yy = _drill_mouse_y;
	this._drill_mousePos_OnOuterSprite = {'x': xx, 'y': yy };;
}


//==============================
// * 自动模式 - 设置聚焦位置（私有）
//
//			说明：	坐标值为 战斗参照 。
//==============================
Drill_BCa_Controller.prototype.drill_BCa_setAutoPosition_Private = function( x, y ){
    if( this.drill_BCa_isEnable() == false ){ return; }
	
	// > 位置相同则不操作
    if( this._drill_autoPos_lastX == x && this._drill_autoPos_lastY == y ){ return; }
    this._drill_autoPos_lastX = x;
    this._drill_autoPos_lastY = y;
	
	// > 固定看向 时，不变化
	if( this._drill_lockPos == true ){ return; }
	
	// > 对齐至左上角锚点
	var xx = x - Graphics.boxWidth *0.5;
	var yy = y - Graphics.boxHeight *0.5;
	this.drill_BCa_rebuildAutoBallistics( xx, yy );
};
//==============================
// * 自动模式 - 弹道构建
//==============================
Drill_BCa_Controller.prototype.drill_BCa_rebuildAutoBallistics = function( x, y ){
	var d_data = this._drill_data;
    var xx = x;
    var yy = y;

    // > 镜头架限制
    xx += d_data['autoOffsetX'];	//（目标偏移量）
    yy += d_data['autoOffsetY'];
    xx = this.drill_BCa_getXInHolder( xx );
    yy = this.drill_BCa_getYInHolder( yy );

    // > 弹道推演
    var data = {};
    data['movementNum'] = 0;
    data['movementTime'] = d_data['autoMovingTime'];
    data['movementDelay'] = d_data['autoMovingDelay'];
    data['movementMode'] = "两点式";
    data['twoPointType'] = d_data['autoMoveType'];
    data['twoPointDifferenceX'] = xx - this._drill_autoPos_curX;
    data['twoPointDifferenceY'] = yy - this._drill_autoPos_curY;
    $gameTemp.drill_COBa_setBallisticsMove( data );
    $gameTemp.drill_COBa_preBallisticsMove( this, 0, this._drill_autoPos_curX, this._drill_autoPos_curY );

    // > 时间置零
    this._drill_autoPos_cutTime = 0;
};

//==============================
// * 观光模式 - 帧刷新
//==============================
Drill_BCa_Controller.prototype.drill_updateTouristMode = function(){
	var data = this._drill_data;
	if( data['mode'] != "观光模式" ){ return; }
	
	// > 固定看向情况
	if( this._drill_lockPos == true ){ return; }
	
	// > 帧刷新 - 鼠标控制
	this.drill_updateTouristMode_Mouse();
	
	// > 帧刷新 - 键盘控制（要放后面）
	this.drill_updateTouristMode_Keyboard();
	
	// > 刷新位置
	this._drill_tourist_curX += this._drill_tourist_curXSpeed;
	this._drill_tourist_curY += this._drill_tourist_curYSpeed;
	this._drill_tourist_curX = this.drill_BCa_getXInHolder( this._drill_tourist_curX );
	this._drill_tourist_curY = this.drill_BCa_getYInHolder( this._drill_tourist_curY );
};
//==============================
// * 观光模式 - 帧刷新 - 键盘控制
//
//			说明：	此处帧刷新，包括 手柄控制。
//==============================
Drill_BCa_Controller.prototype.drill_updateTouristMode_Keyboard = function(){
	var data = this._drill_data;
	
	// > 键盘控制关闭情况
	if( data['touristKeyboardEnabled'] == false ){ return; }
	
	// > 鼠标控制比键盘优先级高
	if( this._drill_tourist_mouseDirection != 5 ){ return; }
	
	// > 键盘控制
	var speed = data['touristSpeed'];
	var direction = this.drill_getTouristDirection();
	if( direction == 0 || direction == 5 ){
		this._drill_tourist_curXSpeed = 0;
		this._drill_tourist_curYSpeed = 0;
	}
	if( direction == 2 ){
		this._drill_tourist_curXSpeed = 0;
		this._drill_tourist_curYSpeed = speed;
	}
	if( direction == 4 ){
		this._drill_tourist_curXSpeed = -1 *speed;
		this._drill_tourist_curYSpeed = 0;
	}
	if( direction == 6 ){
		this._drill_tourist_curXSpeed = speed;
		this._drill_tourist_curYSpeed = 0;
	}
	if( direction == 8 ){
		this._drill_tourist_curXSpeed = 0;
		this._drill_tourist_curYSpeed = -1 *speed;
	}
	if( direction == 1 ){
		this._drill_tourist_curXSpeed = -1 *speed;
		this._drill_tourist_curYSpeed = speed;
	}
	if( direction == 3 ){
		this._drill_tourist_curXSpeed = speed;
		this._drill_tourist_curYSpeed = speed;
	}
	if( direction == 7 ){
		this._drill_tourist_curXSpeed = -1 *speed;
		this._drill_tourist_curYSpeed = -1 *speed;
	}
	if( direction == 9 ){
		this._drill_tourist_curXSpeed = speed;
		this._drill_tourist_curYSpeed = -1 *speed;
	}
};
//==============================
// * 观光模式 - 帧刷新 - 鼠标控制
//
//			说明：	此处帧刷新，不包括 触屏控制。
//==============================
Drill_BCa_Controller.prototype.drill_updateTouristMode_Mouse = function(){
	var data = this._drill_data;
	
	// > 鼠标控制关闭情况
	if( data['touristMouseEnabled'] == false ){ return; }
	
	// > 鼠标位置刷新
	var mouse_pos = TouchInput.drill_COI_getMousePos_WithOutside();
	this._drill_tourist_mouseX = mouse_pos.x;
	this._drill_tourist_mouseY = mouse_pos.y;
	
	// > 鼠标方向
	var xx = this._drill_tourist_mouseX;
	var yy = this._drill_tourist_mouseY;
	var bb = data['touristMouseThickness'];
	var ww = Graphics.boxWidth;
	var hh = Graphics.boxHeight;
	if( xx != 0 && yy != 0 ){
		if( xx < bb && 
			yy < bb ){
			this._drill_tourist_mouseDirection = 7;
		}
		else if( xx < bb*0.5 && //（非边角的矩形，缩小一半）
				yy >= bb && yy <= hh-bb ){
			this._drill_tourist_mouseDirection = 4;
		}
		else if( xx < bb && 
				yy > hh-bb ){
			this._drill_tourist_mouseDirection = 1;
		}
		else if( xx > ww-bb && 
				yy < bb ){
			this._drill_tourist_mouseDirection = 9;
		}
		else if( xx > ww-bb*0.5 && 
				yy >= bb && yy <= hh - bb ){
			this._drill_tourist_mouseDirection = 6;
		}
		else if( xx > ww-bb && 
				yy > hh - bb ){
			this._drill_tourist_mouseDirection = 3;
		}
		else if( xx >= bb && xx <= ww-bb && 
				yy < bb*0.5 ){
			this._drill_tourist_mouseDirection = 8;
		}
		else if( xx >= bb && xx <= ww-bb && 
				yy > hh-bb*0.5 ){
			this._drill_tourist_mouseDirection = 2;
		}
		else{
			this._drill_tourist_mouseDirection = 5;
		}
	}
	
	
	// > 鼠标速度控制
	var speed = data['touristSpeed'];
	var direction = this._drill_tourist_mouseDirection;
	if( direction == 0 || direction == 5 ){
		this._drill_tourist_curXSpeed = 0;
		this._drill_tourist_curYSpeed = 0;
	}
	if( direction == 2 ){
		this._drill_tourist_curXSpeed = 0;
		this._drill_tourist_curYSpeed = speed;
	}
	if( direction == 4 ){
		this._drill_tourist_curXSpeed = -1 *speed;
		this._drill_tourist_curYSpeed = 0;
	}
	if( direction == 6 ){
		this._drill_tourist_curXSpeed = speed;
		this._drill_tourist_curYSpeed = 0;
	}
	if( direction == 8 ){
		this._drill_tourist_curXSpeed = 0;
		this._drill_tourist_curYSpeed = -1 *speed;
	}
	if( direction == 1 ){
		this._drill_tourist_curXSpeed = -1 *speed;
		this._drill_tourist_curYSpeed = speed;
	}
	if( direction == 3 ){
		this._drill_tourist_curXSpeed = speed;
		this._drill_tourist_curYSpeed = speed;
	}
	if( direction == 7 ){
		this._drill_tourist_curXSpeed = -1 *speed;
		this._drill_tourist_curYSpeed = -1 *speed;
	}
	if( direction == 9 ){
		this._drill_tourist_curXSpeed = speed;
		this._drill_tourist_curYSpeed = -1 *speed;
	}
};
//==============================
// * 观光模式 - 获取朝向
//			
//			说明：	方向见小键盘结构，5为轴心。2下/4左/6右/8上/ 1左下/3右下/7左上/9右上。
//==============================
Drill_BCa_Controller.prototype.drill_getTouristDirection = function(){
    return Input.dir8;
};

//==============================
// * 固定看向 - 固定看向位置（私有）
//
//			说明：	坐标值为 镜头参照 。
//==============================
Drill_BCa_Controller.prototype.drill_BCa_setLockPosition_Private = function( x, y ){
    if( this.drill_BCa_isEnable() == false ){ return; }
	var data = this._drill_data;
	
	this._drill_lockPos = true;				//固定看向 - 开关
	this._drill_lockPos_x = x;				//固定看向 - 位置x
	this._drill_lockPos_y = y;				//固定看向 - 位置y
	
	if( data['mode'] == "自动模式" ){
		this.drill_BCa_rebuildAutoBallistics( x, y );
	}
	if( data['mode'] == "观光模式" ){
		this._drill_tourist_curX = x;
		this._drill_tourist_curY = y;
	}
};
//==============================
// * 固定看向 - 解除固定看向（私有）
//==============================
Drill_BCa_Controller.prototype.drill_BCa_setUnlock_Private = function(){
    if( this.drill_BCa_isEnable() == false ){ return; }
	var data = this._drill_data;
	
	this._drill_lockPos = false;
	
	if( data['mode'] == "自动模式" ){
		var xx = this._drill_autoPos_lastX - Graphics.boxWidth *0.5;
		var yy = this._drill_autoPos_lastY - Graphics.boxHeight *0.5;
		this.drill_BCa_rebuildAutoBallistics( xx, yy );
	}
	if( data['mode'] == "观光模式" ){
		this._drill_tourist_curX = this._drill_lockPos_x;
		this._drill_tourist_curY = this._drill_lockPos_y;
	}
};


//==============================
// * 叠加变化 - 执行旋转（私有）
//==============================
Drill_BCa_Controller.prototype.drill_BCa_doRotate_Private = function( rotation, time, changeType ){
    if( this.drill_BCa_isEnable() == false ){ return; }
	this._drill_rotation_curTime = 0;
	this._drill_rotation_tarTime = time;
	var data = {};
	data['rotateNum'] = 0;
	data['rotateTime'] = time; 
	data['rotateMode'] = "目标值模式"; 
	data['targetType'] = changeType; 
	data['targetDifference'] = rotation - this._drill_rotation; 
	$gameTemp.drill_COBa_setBallisticsRotate( data );
	$gameTemp.drill_COBa_preBallisticsRotate( this, 0, this._drill_rotation );
	this._drill_rotation_ballistics = this['_drill_COBa_rotate'];
	this['_drill_COBa_rotate'] = null;
}
//==============================
// * 叠加变化 - 执行缩放X（私有）
//==============================
Drill_BCa_Controller.prototype.drill_BCa_doScaleX_Private = function( scaleX, time, changeType ){
    if( this.drill_BCa_isEnable() == false ){ return; }
	this._drill_scaleX_curTime = 0;
	this._drill_scaleX_tarTime = time;
	var data = {};
	data['scaleXNum'] = 0;
	data['scaleXTime'] = time; 
	data['scaleXMode'] = "目标值模式"; 
	data['targetType'] = changeType; 
	data['targetDifference'] = scaleX - this._drill_scaleX; 
	$gameTemp.drill_COBa_setBallisticsScaleX( data );
	$gameTemp.drill_COBa_preBallisticsScaleX( this, 0, this._drill_scaleX );
	this._drill_scaleX_ballistics = this['_drill_COBa_scaleX'];
	this['_drill_COBa_scaleX'] = null;
}
//==============================
// * 叠加变化 - 执行缩放Y（私有）
//==============================
Drill_BCa_Controller.prototype.drill_BCa_doScaleY_Private = function( scaleY, time, changeType ){
    if( this.drill_BCa_isEnable() == false ){ return; }
	this._drill_scaleY_curTime = 0;
	this._drill_scaleY_tarTime = time;
	var data = {};
	data['scaleYNum'] = 0;
	data['scaleYTime'] = time; 
	data['scaleYMode'] = "目标值模式"; 
	data['targetType'] = changeType; 
	data['targetDifference'] = scaleY - this._drill_scaleY; 
	$gameTemp.drill_COBa_setBallisticsScaleY( data );
	$gameTemp.drill_COBa_preBallisticsScaleY( this, 0, this._drill_scaleY );
	this._drill_scaleY_ballistics = this['_drill_COBa_scaleY'];
	this['_drill_COBa_scaleY'] = null;
}

//==============================
// * 帧刷新 - 旋转
//==============================
Drill_BCa_Controller.prototype.drill_updateRotation = function(){
	var data = this._drill_data;
	
	// > 旋转
	this._drill_rotation = 0;
	if( data['enable'] == false ){ return; }
	
	// > 叠加变化 - 旋转
	if( this._drill_rotation_ballistics == null ){
		this._drill_rotation = data['defaultRotation'];
	}else{
		
		// > 播放弹道
		var time = this._drill_rotation_curTime;
		if( time < 0 ){ time = 0; }
		if( time > this._drill_rotation_ballistics.length-1 ){ time = this._drill_rotation_ballistics.length-1; }
		this._drill_rotation += this._drill_rotation_ballistics[time];
		
		// > 时间+1
		this._drill_rotation_curTime += 1;
	}
}
//==============================
// * 帧刷新 - 缩放
//==============================
Drill_BCa_Controller.prototype.drill_updateScale = function(){
	var data = this._drill_data;
	
	// > 缩放
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	if( data['enable'] == false ){ return; }
	
	// > 叠加变化 - 缩放X
	if( this._drill_scaleX_ballistics == null ){
		this._drill_scaleX = data['defaultScaleX'];
	}else{
		
		// > 播放弹道
		var time = this._drill_scaleX_curTime;
		if( time < 0 ){ time = 0; }
		if( time > this._drill_scaleX_ballistics.length-1 ){ time = this._drill_scaleX_ballistics.length-1; }
		this._drill_scaleX = this._drill_scaleX_ballistics[time];	//（注意是赋值，不是相加）
		
		// > 时间+1
		this._drill_scaleX_curTime += 1;
	}
	
	// > 叠加变化 - 缩放Y
	if( this._drill_scaleY_ballistics == null ){
		this._drill_scaleY = data['defaultScaleY'];
	}else{
		
		// > 播放弹道
		var time = this._drill_scaleY_curTime;
		if( time < 0 ){ time = 0; }
		if( time > this._drill_scaleY_ballistics.length-1 ){ time = this._drill_scaleY_ballistics.length-1; }
		this._drill_scaleY = this._drill_scaleY_ballistics[time];	//（注意是赋值，不是相加）
		
		// > 时间+1
		this._drill_scaleY_curTime += 1;
	}
}
//==============================
// * 帧刷新 - 镜头基点
//==============================
Drill_BCa_Controller.prototype.drill_updateOffset = function(){
	var data = this._drill_data;
	
	// > 镜头基点
	var xx = 0;
	var yy = 0;
	if( data['enable'] == false ){ return; }
	
	
	// > 自动模式 位移
	if( data['mode'] == "自动模式" ){
		this._drill_autoPos_cutTime += 1;
		var time = this._drill_autoPos_cutTime;
		if( time > this._drill_COBa_x.length-1 ){ time = this._drill_COBa_x.length-1; }
		this._drill_autoPos_curX = this._drill_COBa_x[time];
		this._drill_autoPos_curY = this._drill_COBa_y[time];
		xx += this._drill_autoPos_curX;
		yy += this._drill_autoPos_curY;
	}
	// > 观光模式 位移
	if( data['mode'] == "观光模式" ){
		xx += this._drill_tourist_curX;
		yy += this._drill_tourist_curY;
	}
	
	
	// > 坐标反转（因为 镜头移动 与 图层移动 是反的）
	//			 （镜头坐标只能在 -100,-100,200,200 的矩形框内移动）
	xx = xx *(-1);
	yy = yy *(-1);
	
	
	// > 镜头基点 - 记录
	this._drill_cameraX_offset = xx;
	this._drill_cameraY_offset = yy;
	
	// > 镜头基点 - 变换位置刷新
	this.drill_BCa_updateCameraPos_Children();
	this.drill_BCa_updateMousePos_OnChildren();
	this.drill_BCa_updateMousePos_OnOuterSprite();
}
//==============================
// * 帧刷新 - 平移
//==============================
Drill_BCa_Controller.prototype.drill_updatePosition = function(){
	var data = this._drill_data;
	
	// > 平移
	this._drill_x = 0;
	this._drill_y = 0;
	if( data['enable'] == false ){ return; }
	
	
	// > 与镜头基点叠加
	this._drill_x += this._drill_cameraX_offset;
	this._drill_y += this._drill_cameraY_offset;
	
	
	// > 坐标再反转
	if( this._drill_scaleX < 0 ){ this._drill_x *= -1; }
	if( this._drill_scaleY < 0 ){ this._drill_y *= -1; }
	var ro = (this._drill_rotation%360 + 360)%360;
	if( ro > 90 && ro < 270 ){
		this._drill_x *= -1;
		this._drill_y *= -1;
	}
	
	// > 叠加变化 - 锁定锚点
	if( this._drill_rotation == 0 && this._drill_scaleX == 1 && this._drill_scaleY == 1 ){
		//（不操作）
	}else{
		// > 锚点(0.5,0.5)锁定
		var fix_point = $gameTemp.drill_BCa_getFixPointInAnchor( 
							0.0, 0.0, 
							0.5, 0.5, 
							Graphics.boxWidth, Graphics.boxHeight,
							this._drill_rotation /180*Math.PI, 
							this._drill_scaleX, this._drill_scaleY 
						);
		this._drill_x += fix_point.x;
		this._drill_y += fix_point.y;
	}
}
//==============================
// * 帧刷新 - 校验值
//==============================
Drill_BCa_Controller.prototype.drill_updateCheckNaN = function(){
	
	// > 校验值
	if( DrillUp.g_BCa_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_BCa_checkNaN = false;
			alert(
				"【Drill_BattleCamera.js 战斗 - 活动战斗镜头】\n"+
				"检测到控制器参数_drill_x出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_BCa_checkNaN = false;
			alert(
				"【Drill_BattleCamera.js 战斗 - 活动战斗镜头】\n"+
				"检测到控制器参数_drill_y出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_rotation ) ){
			DrillUp.g_BCa_checkNaN = false;
			alert(
				"【Drill_BattleCamera.js 战斗 - 活动战斗镜头】\n"+
				"检测到控制器参数_drill_rotation出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_BCa_checkNaN = false;
			alert(
				"【Drill_BattleCamera.js 战斗 - 活动战斗镜头】\n"+
				"检测到控制器参数_drill_scaleX出现了NaN值，请及时检查你的函数。"
			);
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_BCa_checkNaN = false;
			alert(
				"【Drill_BattleCamera.js 战斗 - 活动战斗镜头】\n"+
				"检测到控制器参数_drill_scaleY出现了NaN值，请及时检查你的函数。"
			);
		}
	}
}
//=============================================================================
// * 数学 - 锁定锚点
//			
//			参数：	> org_anchor_x 数字    （原贴图锚点X）
//					> org_anchor_y 数字    （原贴图锚点Y）
//					> target_anchor_x 数字 （新的锚点X）
//					> target_anchor_y 数字 （新的锚点Y）
//					> width 数字           （贴图宽度）
//					> height 数字          （贴图高度）
//					> rotation 数字        （旋转度数，弧度）
//					> scale_x,scale_y 数字 （缩放比例XY，默认1.00）
//			返回：	> { x:0, y:0 }         （偏移的坐标）
//			
//			说明：	修正 旋转+缩放 的坐标，使其看起来像是在绕着 新的锚点 变换。
//					旋转值和缩放值可为负数。
//=============================================================================
Game_Temp.prototype.drill_BCa_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图锚点 
					target_anchor_x,target_anchor_y, 	//新的锚点 
					width, height,						//贴图高宽
					rotation, scale_x, scale_y  ){		//变换的值（旋转+缩放）
	
	var ww = width * ( target_anchor_x - org_anchor_x );
	var hh = height * ( target_anchor_y - org_anchor_y );
	var xx = 0;
	var yy = 0;
	if( ww == 0 && hh == 0){ return { "x":0, "y":0 }; }
	if( ww == 0 ){ ww = 0.0001; }
	
	// > 先缩放
	var sww = ww*scale_x;
	var shh = hh*scale_y;
	
	// > 后旋转
	var r = Math.sqrt( Math.pow(sww,2) + Math.pow(shh,2) );
	var p_degree = Math.atan(shh/sww);	
	p_degree = Math.PI - p_degree;
	if( sww < 0 ){
		p_degree = Math.PI + p_degree;
	}
	
	// > 变换的偏移量
	xx += r*Math.cos( rotation - p_degree );		//圆公式 (x-a)²+(y-b)²=r²
	yy += r*Math.sin( rotation - p_degree );		//圆极坐标 x=ρcosθ,y=ρsinθ
	
	// > 锚点偏移量
	xx += ww;
	yy += hh;
	
	return { "x":xx, "y":yy };
}
//=============================================================================
// * 数学 - 矩阵点的变换
//			
//			参数：	> cur_x,cur_y 数字       （需要变换的点）
//					> center_x,center_y 数字 （矩形中心点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//			返回：	> { x:0, y:0 }           （变换后的坐标）
//			
//			说明：	矩阵内或矩阵外一个点，能够根据矩阵的 旋转+缩放 一并变换。
//					旋转值和缩放值可为负数。
//=============================================================================
Game_Temp.prototype.drill_BCa_getPointWithTransform = function( 
					cur_x,cur_y,						//需要变换的点 
					center_x,center_y, 					//矩形中心点 
					rotation, scale_x, scale_y  ){		//变换的值（旋转+缩放）
	
	var xx = cur_x;
	var yy = cur_y;
	
	// > 偏移锚点
	xx -= center_x;
	yy -= center_y;
	if( xx == 0 && yy == 0 ){ return { "x":cur_x, "y":cur_y }; }
	
	// > 先缩放
	xx *= scale_x;
	yy *= scale_y;
	
	// > 后旋转
	var r = Math.sqrt( Math.pow(xx,2) + Math.pow(yy,2) );
	var p_degree = Math.atan(yy/xx);	
	p_degree = Math.PI - p_degree;
	if( xx < 0 ){
		p_degree = Math.PI + p_degree;
	}
	xx = r*Math.cos( rotation + Math.PI - p_degree );		//圆公式 (x-a)²+(y-b)²=r²
	yy = r*Math.sin( rotation + Math.PI - p_degree );		//圆极坐标 x=ρcosθ,y=ρsinθ
	
	// > 恢复锚点
	xx += center_x;
	yy += center_y;
	
	return { "x":xx, "y":yy };
}
//=============================================================================
// * 数学 - 矩阵点的变换（逆向）
//			
//			参数：	> cur_x,cur_y 数字       （变换后的坐标）
//					> center_x,center_y 数字 （矩形中心点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//			返回：	> { x:0, y:0 }           （变换前的点）
//			
//			说明：	同样的函数，能够将正向函数的结果值，扳回成正向函数的最初值。
//=============================================================================
Game_Temp.prototype.drill_BCa_getPointWithTransformInversed = function( 
					cur_x,cur_y,						//需要变换的点 
					center_x,center_y, 					//矩形中心点 
					rotation, scale_x, scale_y  ){		//变换的值（旋转+缩放）
	
	var xx = cur_x;
	var yy = cur_y;
	
	// > 偏移锚点
	xx += center_x;
	yy += center_y;
	if( xx == 0 && yy == 0 ){ return { "x":cur_x, "y":cur_y }; }
	
	// > 旋转（逆向）
	var r = Math.sqrt( Math.pow(xx,2) + Math.pow(yy,2) );
	var p_degree = Math.atan(yy/xx);	
	p_degree = Math.PI - p_degree;
	if( xx < 0 ){
		p_degree = Math.PI + p_degree;
	}
	xx = r*Math.cos( -1*rotation + Math.PI - p_degree );		//圆公式 (x-a)²+(y-b)²=r²
	yy = r*Math.sin( -1*rotation + Math.PI - p_degree );		//圆极坐标 x=ρcosθ,y=ρsinθ
	
	// > 缩放（逆向）
	xx /= scale_x;
	yy /= scale_y;
	
	// > 恢复锚点
	xx -= center_x;
	yy -= center_y;
	
	return { "x":xx, "y":yy };
}




//=============================================================================
// ** DEBUG - 镜头对齐框
//
//			说明：	子贴图用   == 在图层内 == 下层、上层
//					外部贴图用 == 在图层外 == 图片层、最顶层
//=============================================================================
if( DrillUp.g_BCa_debugEnabled == true ){
	
	//==============================
	// * DEBUG战斗层级 - 下层
	//==============================
	var _drill_BCa_DEBUG_battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
	Spriteset_Battle.prototype.createBattleback = function() {    
		_drill_BCa_DEBUG_battle_createBattleback.call(this);
		if( !this._drill_battleDownArea ){
			this._drill_battleDownArea = new Sprite();
			this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
			this._battleField.addChild(this._drill_battleDownArea);	
		}
	};
	//==============================
	// * DEBUG战斗层级 - 上层
	//==============================
	var _drill_BCa_DEBUG_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
	Spriteset_Battle.prototype.createLowerLayer = function() {
		_drill_BCa_DEBUG_battle_createLowerLayer.call(this);
		if( !this._drill_battleUpArea ){
			this._drill_battleUpArea = new Sprite();
			this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
			this._battleField.addChild(this._drill_battleUpArea);
		}
	};
	//==============================
	// * DEBUG战斗层级 - 图片层
	//==============================
	var _drill_BCa_DEBUG_battle_createPictures = Spriteset_Battle.prototype.createPictures;
	Spriteset_Battle.prototype.createPictures = function() {
		_drill_BCa_DEBUG_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
		if( !this._drill_battlePicArea ){
			this._drill_battlePicArea = new Sprite();
			this.addChild(this._drill_battlePicArea);	
		}
	}
	//==============================
	// * DEBUG战斗层级 - 最顶层
	//==============================
	var _drill_BCa_DEBUG_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		_drill_BCa_DEBUG_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
		if( !this._drill_SenceTopArea ){
			this._drill_SenceTopArea = new Sprite();
			this.addChild(this._drill_SenceTopArea);	
		}
	}
	
	//==============================
	// * 镜头对齐框 - 初始化
	//==============================
	var _drill_BCa_DEBUG_temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function(){
		_drill_BCa_DEBUG_temp_initialize.call(this);
		this._drill_BCa_DEBUG_spriteNeedRefresh = true;			
	};
	//==============================
	// * 镜头对齐框 - 初始化
	//==============================
	var _drill_BCa_DEBUG_scene_initialize = Scene_Battle.prototype.initialize;
	Scene_Battle.prototype.initialize = function(){
		_drill_BCa_DEBUG_scene_initialize.call(this);
		$gameTemp._drill_BCa_DEBUG_spriteNeedRefresh = true;	
	};
	//==============================
	// * 镜头对齐框 - 帧刷新
	//==============================
	var _drill_BCa_DEBUG_update = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function() {	
		_drill_BCa_DEBUG_update.call(this);
		this.drill_BCa_DEBUG_updateRebuild();			//帧刷新 - 重建
		this.drill_BCa_DEBUG_updateMousePosition();		//帧刷新 - 鼠标位置
		this.drill_BCa_DEBUG_updateSprite();			//帧刷新 - 贴图
	};
	//==============================
	// * 镜头对齐框 - 帧刷新重建
	//==============================
	Scene_Battle.prototype.drill_BCa_DEBUG_updateRebuild = function() {
		if( $gameTemp._drill_BCa_DEBUG_spriteNeedRefresh != true ){ return; }
		$gameTemp._drill_BCa_DEBUG_spriteNeedRefresh = false;
		
		// > 清除旧贴图
		//...
		
		// > 创建贴图
		this._drill_BCa_DEBUG_spriteTank_children = [];			//（子贴图）
		this._drill_BCa_DEBUG_spriteTank_OuterSprite = [];		//（外部贴图）
		this._drill_BCa_DEBUG_spriteTank_mouse = [];			//（鼠标点容器）
		this._drill_BCa_DEBUG_spriteTank_mouseInversed = [];	//（鼠标点容器，逆向十字）
		
		this.drill_BCa_DEBUG_createLines();
		this.drill_BCa_DEBUG_createMousePoint();
	}
	//==============================
	// * 镜头对齐框 - 创建 - 框线
	//==============================
	Scene_Battle.prototype.drill_BCa_DEBUG_createLines = function() {
		var thickness = 8;
		
		// > 贴图 - 初始白框（下层）
		var data = {};
		data['color'] = "#ffffff";
		data['width'] = Graphics.boxWidth;
		data['height'] = Graphics.boxHeight;
		data['thickness'] = thickness;
		data['has_up'] = true; 
		data['has_down'] = true; 
		data['has_left'] = true; 
		data['has_right'] = true;
		var temp_sprite = new Drill_BCa_DebugSprite( data );
		this._spriteset._drill_battleDownArea.addChild( temp_sprite );
		
		// > 贴图 - 白线 x4（下层）
		var sprite_list = this.drill_BCa_DEBUG_createFourLine( "#ffffff", 0 );
		this._drill_BCa_DEBUG_spriteTank_children.push( sprite_list[0] );
		this._drill_BCa_DEBUG_spriteTank_children.push( sprite_list[1] );
		this._drill_BCa_DEBUG_spriteTank_children.push( sprite_list[2] );
		this._drill_BCa_DEBUG_spriteTank_children.push( sprite_list[3] );
		this._spriteset._drill_battleDownArea.addChild( sprite_list[0] );
		this._spriteset._drill_battleDownArea.addChild( sprite_list[1] );
		this._spriteset._drill_battleDownArea.addChild( sprite_list[2] );
		this._spriteset._drill_battleDownArea.addChild( sprite_list[3] );
		
		// > 贴图 - 黄线 x4（上层）
		var sprite_list = this.drill_BCa_DEBUG_createFourLine( "#ffff00", 1 );
		this._drill_BCa_DEBUG_spriteTank_children.push( sprite_list[0] );
		this._drill_BCa_DEBUG_spriteTank_children.push( sprite_list[1] );
		this._drill_BCa_DEBUG_spriteTank_children.push( sprite_list[2] );
		this._drill_BCa_DEBUG_spriteTank_children.push( sprite_list[3] );
		this._spriteset._drill_battleUpArea.addChild( sprite_list[0] );
		this._spriteset._drill_battleUpArea.addChild( sprite_list[1] );
		this._spriteset._drill_battleUpArea.addChild( sprite_list[2] );
		this._spriteset._drill_battleUpArea.addChild( sprite_list[3] );
		
		// > 贴图 - 红线 x4（图片层）
		var sprite_list = this.drill_BCa_DEBUG_createFourLine( "#ff0000", 2 );
		this._drill_BCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[0] );
		this._drill_BCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[1] );
		this._drill_BCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[2] );
		this._drill_BCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[3] );
		this._spriteset._drill_battlePicArea.addChild( sprite_list[0] );
		this._spriteset._drill_battlePicArea.addChild( sprite_list[1] );
		this._spriteset._drill_battlePicArea.addChild( sprite_list[2] );
		this._spriteset._drill_battlePicArea.addChild( sprite_list[3] );
		
		// > 贴图 - 蓝线 x4（最顶层）
		var sprite_list = this.drill_BCa_DEBUG_createFourLine( "#0000ff", 3 );
		this._drill_BCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[0] );
		this._drill_BCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[1] );
		this._drill_BCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[2] );
		this._drill_BCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[3] );
		this._drill_SenceTopArea.addChild( sprite_list[0] );
		this._drill_SenceTopArea.addChild( sprite_list[1] );
		this._drill_SenceTopArea.addChild( sprite_list[2] );
		this._drill_SenceTopArea.addChild( sprite_list[3] );
		
		//this._spriteset._drill_battleDownArea.addChild( temp_sprite );
		//this._spriteset._drill_battleUpArea.addChild( temp_sprite );
		//this._spriteset._drill_battlePicArea.addChild( temp_sprite );
		//this._drill_SenceTopArea.addChild( temp_sprite );
	};
	//==============================
	// * 镜头对齐框 - 创建 - 框线x4
	//==============================
	Scene_Battle.prototype.drill_BCa_DEBUG_createFourLine = function( color, pos_index ){
		var thickness = 8;
		var result_list = [];
		
		var data = {};
		data['color'] = color;
		data['width'] = 100;
		data['height'] = 100;
		data['thickness'] = thickness;
		data['has_up'] = true; 
		data['has_left'] = true; 
		var temp_sprite = new Drill_BCa_DebugSprite( data );
		temp_sprite.x = thickness*pos_index;
		temp_sprite.y = thickness*pos_index;
		temp_sprite._org_x = thickness*pos_index;
		temp_sprite._org_y = thickness*pos_index;
		result_list.push( temp_sprite );
		
		var data = {};
		data['color'] = color;
		data['width'] = 100;
		data['height'] = 100;
		data['thickness'] = thickness;
		data['has_up'] = true; 
		data['has_right'] = true; 
		var temp_sprite = new Drill_BCa_DebugSprite( data );
		temp_sprite.x = Graphics.boxWidth -thickness*pos_index -data['width'];
		temp_sprite.y = thickness*pos_index;
		temp_sprite._org_x = Graphics.boxWidth -thickness*pos_index -data['width'];
		temp_sprite._org_y = thickness*pos_index;
		result_list.push( temp_sprite );
		
		var data = {};
		data['color'] = color;
		data['width'] = 100;
		data['height'] = 100;
		data['thickness'] = thickness;
		data['has_down'] = true; 
		data['has_left'] = true; 
		var temp_sprite = new Drill_BCa_DebugSprite( data );
		temp_sprite.x = thickness*pos_index;
		temp_sprite.y = Graphics.boxHeight -thickness*pos_index -data['height'];
		temp_sprite._org_x = thickness*pos_index;
		temp_sprite._org_y = Graphics.boxHeight -thickness*pos_index -data['height'];
		result_list.push( temp_sprite );
		
		var data = {};
		data['color'] = color;
		data['width'] = 100;
		data['height'] = 100;
		data['thickness'] = thickness;
		data['has_down'] = true; 
		data['has_right'] = true; 
		var temp_sprite = new Drill_BCa_DebugSprite( data );
		temp_sprite.x = Graphics.boxWidth -thickness*pos_index -data['width'];
		temp_sprite.y = Graphics.boxHeight -thickness*pos_index -data['height'];
		temp_sprite._org_x = Graphics.boxWidth -thickness*pos_index -data['width'];
		temp_sprite._org_y = Graphics.boxHeight -thickness*pos_index -data['height'];
		result_list.push( temp_sprite );
		
		return result_list;
	};
	//==============================
	// * 镜头对齐框 - 创建 - 鼠标点
	//==============================
	Scene_Battle.prototype.drill_BCa_DEBUG_createMousePoint = function() {
		
		// > 贴图 - 白圈（鼠标点）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 40, 40 );
		temp_sprite.bitmap.drawCircle( 20, 20, 20, "#ffffff" );
		temp_sprite._org_mx = -20;
		temp_sprite._org_my = -20;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		this._spriteset._drill_battleDownArea.addChild( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_mouse.push( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_children.push( temp_sprite );
		
		// > 贴图 - 黄圈（鼠标点）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 30, 30 );
		temp_sprite.bitmap.drawCircle( 15, 15, 15, "#ffff00" );
		temp_sprite._org_mx = -15;
		temp_sprite._org_my = -15;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		this._spriteset._drill_battleUpArea.addChild( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_mouse.push( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_children.push( temp_sprite );
		
		// > 贴图 - 红圈（鼠标点）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 20, 20 );
		temp_sprite.bitmap.drawCircle( 10, 10, 10, "#ff0000" );
		temp_sprite._org_mx = -10;
		temp_sprite._org_my = -10;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		this._spriteset._drill_battlePicArea.addChild( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_mouse.push( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_OuterSprite.push( temp_sprite );
		
		// > 贴图 - 蓝圈（鼠标点）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 10, 10 );
		temp_sprite.bitmap.drawCircle( 5, 5, 5, "#0000ff" );
		temp_sprite._org_mx = -5;
		temp_sprite._org_my = -5;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		this._drill_SenceTopArea.addChild( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_mouse.push( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_OuterSprite.push( temp_sprite );
		
		
		// > 贴图 - 白线（逆向十字）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 4, 30 );
		temp_sprite.bitmap.fillAll( "#ffffff" );
		temp_sprite._org_mx = -2;
		temp_sprite._org_my = -30;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		this._spriteset._drill_battleDownArea.addChild( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_mouseInversed.push( temp_sprite );
		
		// > 贴图 - 黄线（逆向十字）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 30, 4 );
		temp_sprite.bitmap.fillAll( "#ffff00" );
		temp_sprite._org_mx = -2;
		temp_sprite._org_my = -2;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		this._spriteset._drill_battleDownArea.addChild( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_mouseInversed.push( temp_sprite );
		
		// > 贴图 - 红线（逆向十字）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 4, 30 );
		temp_sprite.bitmap.fillAll( "#ff0000" );
		temp_sprite._org_mx = -2;
		temp_sprite._org_my = -2;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		this._spriteset._drill_battlePicArea.addChild( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_mouseInversed.push( temp_sprite );
		
		// > 贴图 - 蓝线（逆向十字）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 30, 4 );
		temp_sprite.bitmap.fillAll( "#0000ff" );
		temp_sprite._org_mx = -30;
		temp_sprite._org_my = -2;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		this._drill_SenceTopArea.addChild( temp_sprite );
		this._drill_BCa_DEBUG_spriteTank_mouseInversed.push( temp_sprite );
	};
	//==============================
	// * 镜头对齐框 - 帧刷新 鼠标位置
	//==============================
	Scene_Battle.prototype.drill_BCa_DEBUG_updateMousePosition = function() {
		if( this._drill_BCa_DEBUG_spriteTank_mouse == undefined ){ return; }
		if( this._drill_BCa_DEBUG_spriteTank_mouseInversed == undefined ){ return; }
		
		// > 鼠标点跟随鼠标
		for(var i=0; i < this._drill_BCa_DEBUG_spriteTank_mouse.length; i++){
			var temp_sprite = this._drill_BCa_DEBUG_spriteTank_mouse[i];
			if( temp_sprite == undefined ){ continue; }
			temp_sprite._org_x = temp_sprite._org_mx + _drill_mouse_x;
			temp_sprite._org_y = temp_sprite._org_my + _drill_mouse_y;
		}
		
		// > 逆向十字跟随鼠标
		for(var i=0; i < this._drill_BCa_DEBUG_spriteTank_mouseInversed.length; i++){
			var temp_sprite = this._drill_BCa_DEBUG_spriteTank_mouseInversed[i];
			if( temp_sprite == undefined ){ continue; }
			var xx = temp_sprite._org_mx;
			var yy = temp_sprite._org_my;
			
			if( i <= 1 ){
				
				// > 鼠标落点位置（子贴图用）
				var mouse_pos = $gameSystem._drill_BCa_controller.drill_BCa_getMousePos_OnChildren();
				xx += mouse_pos.x;
				yy += mouse_pos.y;
				
			}else{
				
				// > 鼠标落点位置（外部贴图用）
				var mouse_pos = $gameSystem._drill_BCa_controller.drill_BCa_getMousePos_OnOuterSprite();
				xx += mouse_pos.x;
				yy += mouse_pos.y;
				
			}
			
			temp_sprite.x = xx;
			temp_sprite.y = yy;
		}
	};
	//==============================
	// * 镜头对齐框 - 帧刷新 贴图
	//==============================
	Scene_Battle.prototype.drill_BCa_DEBUG_updateSprite = function() {
		if( this._drill_BCa_DEBUG_spriteTank_children == undefined ){ return; }
		if( this._drill_BCa_DEBUG_spriteTank_OuterSprite == undefined ){ return; }
		
		
		// > 在图层内（白、黄）
		for(var i=0; i < this._drill_BCa_DEBUG_spriteTank_children.length; i++){
			var temp_sprite = this._drill_BCa_DEBUG_spriteTank_children[i];
			if( temp_sprite == undefined ){ continue; }
			
			var xx = temp_sprite._org_x;
			var yy = temp_sprite._org_y;
			
			// > 镜头变换位置
			var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
			xx -= camera_pos.x;
			yy -= camera_pos.y;
			
			temp_sprite.x = xx;
			temp_sprite.y = yy;
		}
		
		// > 在图层外（红、蓝）
		for(var i=0; i < this._drill_BCa_DEBUG_spriteTank_OuterSprite.length; i++){
			var temp_sprite = this._drill_BCa_DEBUG_spriteTank_OuterSprite[i];
			if( temp_sprite == undefined ){ continue; }
			
			var xx = temp_sprite._org_x;
			var yy = temp_sprite._org_y;
			
			// > 镜头变换位置
			var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_OuterSprite( xx, yy );
			xx = camera_pos.x;
			yy = camera_pos.y;
			
			temp_sprite.x = xx;
			temp_sprite.y = yy;
			
			// > 要考虑旋转情况
			temp_sprite.rotation = temp_sprite._org_rotation + $gameSystem._drill_BCa_controller.drill_BCa_getRotateValue() /180*Math.PI;
			
			// > 要考虑缩放情况
			temp_sprite.scale.x = temp_sprite._org_scale_x * $gameSystem._drill_BCa_controller.drill_BCa_getScaleXValue();
			temp_sprite.scale.y = temp_sprite._org_scale_y * $gameSystem._drill_BCa_controller.drill_BCa_getScaleYValue();
		}
	}
}

//=============================================================================
// ** 镜头对齐框 贴图【Drill_BCa_DebugSprite】
//			
//			主功能：	> 定义一个debug镜头对齐框贴图。
//			子功能：	->自定义颜色
//						->自定义边框
//						
//			说明：	> 该贴图的中心锚点均为左上角，对齐用。
//					
// 			代码：	> 范围 - 该类只根据点变化显示图块贴图。
//					> 结构 - [ ●合并 /分离/混乱] 
//					> 数量 - [单个/ ●多个 ] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
//					> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 对齐框贴图 - 定义
//==============================
function Drill_BCa_DebugSprite() {
	this.initialize.apply(this, arguments);
}
Drill_BCa_DebugSprite.prototype = Object.create(Sprite.prototype);
Drill_BCa_DebugSprite.prototype.constructor = Drill_BCa_DebugSprite;
//==============================
// * 对齐框贴图 - 初始化
//==============================
Drill_BCa_DebugSprite.prototype.initialize = function( data ){
	Sprite.prototype.initialize.call(this);
	
	// > 默认值
	if( data['color'] == undefined ){ data['color'] = "#00ffff"; }		//绘制颜色
	if( data['width'] == undefined ){ data['width'] = 100; }			//宽度
	if( data['height'] == undefined ){ data['height'] = 100; }			//高度
	if( data['thickness'] == undefined ){ data['thickness'] = 5; }		//边框厚度
	if( data['has_up'] == undefined ){ data['has_up'] = false; }		//上边框
	if( data['has_down'] == undefined ){ data['has_down'] = false; }	//下边框
	if( data['has_left'] == undefined ){ data['has_left'] = false; }	//左边框
	if( data['has_right'] == undefined ){ data['has_right'] = false; }	//右边框
	
	// > 私有属性初始化
	this._drill_data = JSON.parse(JSON.stringify( data ));
	this._drill_needRedraw = true;
	this._org_x = 0;
	this._org_y = 0;
	this._org_mx = 0;
	this._org_my = 0;
	this._org_rotation = 0;
	this._org_scale_x = 1.0;
	this._org_scale_y = 1.0;
	
	// > 贴图初始化
	this.bitmap = new Bitmap( data['width'], data['height'] );
	this.anchor.x = 0.0;
	this.anchor.y = 0.0;
	this.opacity = 255;
};
//==============================
// * 对齐框贴图 - 帧刷新
//==============================
Drill_BCa_DebugSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	this.drill_updateRedraw();				//帧刷新 - 重画边框
};
//==============================
// * 帧刷新 - 重画边框
//==============================
Drill_BCa_DebugSprite.prototype.drill_updateRedraw = function() {
	if( this._drill_data == undefined ){ return; }
	if( this._drill_needRedraw == false ){ return; }
	this._drill_needRedraw = false;
	var data = this._drill_data;
	
	// > 清理画布
	this.bitmap.clear();
	//this.bitmap.fillRect( 0, 0, this.bitmap.width, this.bitmap.height, "#ffffff" );
	
	// > 依次绘制
	if( data['has_up'] == true ){
		this.bitmap.fillRect( 0, 0, data['width'], data['thickness'], data['color'] );
	}
	if( data['has_down'] == true ){
		this.bitmap.fillRect( 0, data['height']-data['thickness'], data['width'], data['thickness'], data['color'] );
	}
	if( data['has_left'] == true ){
		this.bitmap.fillRect( 0, 0, data['thickness'], data['height'], data['color'] );
	}
	if( data['has_right'] == true ){
		this.bitmap.fillRect( data['width']-data['thickness'], 0, data['thickness'], data['height'], data['color'] );
	}
	
	// > 绘制锚点位置
	this.bitmap.fillRect( 0, 0, data['thickness'], data['thickness'], "#ff00ff" );
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BattleCamera = false;
		alert(
			"【Drill_BattleCamera.js 战斗 - 活动战斗镜头】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics 系统-弹道核心"+
			"\n- Drill_CoreOfInput 系统-输入设备核心"
		);
}
