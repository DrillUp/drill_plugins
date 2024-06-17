//=============================================================================
// Drill_LayerCamera.js
//=============================================================================

/*:
 * @plugindesc [v2.3]        地图 - 活动地图镜头
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
 * 使得你可以控制地图镜头，并进行各种动态移动、变换功能。
 * ★★最好放在 多层地图背景 插件后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 由于插件改变了默认地图镜头的规则，对所有地图UI相关插件有影响。
 * 基于：
 *   - Drill_CoreOfBallistics        数学模型-弹道核心★★v1.9及以上★★
 *   - Drill_CoreOfInput             系统-输入设备核心★★v1.6及以上★★
 * 被扩展：
 *   - Drill_CoreOfMoveRoute   移动路线-移动路线核心
 *   - Drill_EventSound        声音-事件的声音
 *   - Drill_MouseGridPointer  鼠标-网格指向标
 *   - Drill_MouseIllumination 鼠标-自定义照明效果
 *   - Drill_OperateHud        鼠标-鼠标辅助操作面板★★v1.6及以上版本★★
 *   - Drill_GaugeForVariable  UI-高级变量固定框★★v1.6及以上版本★★
 *     上述插件，都可以在镜头缩放时，做相应的变换支持。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 * 2.如果想了解镜头更多的内容，去看看 "6.地图 > 关于地图活动镜头.docx"。
 * 整体平移：
 *   (1.整体平移是指镜头控制的所有图层都平移一段距离。
 *      镜头控制的图层包含 上层、中层、下层，但不含 图片层和最顶层。
 *      注意，平移后，必须要想办法用菜单或图片遮挡住平移漏出的部分，
 *      不然镜头的其他渲染结构会因为整体平移而被看到。
 * 镜头移动：
 *   (1.弹性移动 和 平滑移动，会对 移动 > 滚动地图 的事件指令 有影响。
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
 *      这是由于游戏内部机制，每块图块根据方形镜头区域一个个拼上去的。
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
 *   (4.镜头墙摆放有特殊要求，如果摆放位置不对，会失效。详细去看看文档。
 * 设计：
 *   (1.将镜头稍微旋转12度，有很多特殊代入效果，比如摇晃的船只、塌陷的斜坡、
 *      某种震击地面技能造成的整个世界倾斜的特效。
 *   (2.你可以用镜头墙设置洞穴中或者墙壁帘幕后面隐藏的房间。
 *   (3.你可以设置看向指定位置/事件，用于某些远程操控物体的游戏环节。
 * 
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 控制器
 * 你可以修改地图镜头的控制器属性。
 * 
 * 插件指令：>地图镜头 : 开启
 * 插件指令：>地图镜头 : 关闭
 * 插件指令：>地图镜头 : 暂停镜头运行
 * 插件指令：>地图镜头 : 继续镜头运行
 * 
 * 1."暂停镜头运行"后会立刻静止，不再移动。
 *   必须执行"继续镜头运行"才能恢复。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头模式
 * 你可以通过插件指令来修改镜头模式：
 * 
 * 插件指令：>地图镜头 : 修改模式 : 自动模式
 * 插件指令：>地图镜头 : 修改模式 : 观光模式
 *
 * 插件指令：>地图镜头 : 自动模式-设置镜头移动模式 : 匀速移动
 * 插件指令：>地图镜头 : 自动模式-设置镜头移动模式 : 弹性移动
 * 插件指令：>地图镜头 : 自动模式-设置弹性模式移动速度 : 10
 * 插件指令：>地图镜头 : 自动模式-设置弹性模式镜头速度上限 : 24
 * 
 * 插件指令：>地图镜头 : 观光模式-键盘操作 : 启用
 * 插件指令：>地图镜头 : 观光模式-键盘操作 : 关闭
 * 插件指令：>地图镜头 : 观光模式-键盘操作 : 恢复默认
 * 插件指令：>地图镜头 : 观光模式-鼠标操作 : 启用
 * 插件指令：>地图镜头 : 观光模式-鼠标操作 : 关闭
 * 插件指令：>地图镜头 : 观光模式-鼠标操作 : 恢复默认
 * 插件指令：>地图镜头 : 观光模式-镜头移动速度 : 速度[4.5]
 * 
 * 1.镜头的模式具体使用方法去看看文档介绍。
 *   注意，固定看向不是模式，而是模式中的一个通用功能。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 固定看向
 * 你可以通过插件指令设置镜头固定看向某个位置：
 * 
 * 插件指令：>地图镜头 : 固定看向 : 本事件
 * 插件指令：>地图镜头 : 固定看向 : 事件[13]
 * 插件指令：>地图镜头 : 固定看向 : 事件变量[13]
 * 插件指令：>地图镜头 : 固定看向 : 多个事件的中心[13,14]
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
 * 6.如果你不想看某个事件，而让另一个事件拉扯过远，
 *   可以用"多个事件的中心"来看向。
 *   但注意，事件如果距离太远，两边的事件都会看不见。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头缩放/旋转
 * 你可以通过插件指令设置镜头缩放：
 * 
 * 插件指令：>地图镜头 : 旋转 : 角度[180] : 时间[60]
 * 插件指令：>地图镜头 : 缩放X : 比例[1.50] : 时间[60]
 * 插件指令：>地图镜头 : 缩放Y : 比例[1.50] : 时间[60]
 * 插件指令：>地图镜头 : 旋转 : 恢复默认 : 时间[60]
 * 插件指令：>地图镜头 : 缩放X : 恢复默认 : 时间[60]
 * 插件指令：>地图镜头 : 缩放Y : 恢复默认 : 时间[60]
 * 
 * 1.默认缩放XY为 1.00 。
 *   1.50表示镜头放大50%，只能看见实际范围的四分之一。
 *   0.50表示镜头缩小50%，能看见实际范围的四倍。
 *   缩放后永久有效，要记得恢复1.00缩放比例。
 *   比例不要设置太小，不然会出问题。
 * 2.默认旋转为 0度。
 *   旋转正数为顺时针，负数为逆时针。
 * 3.经过了数学函数的优化，缩放 和 旋转 的效果能叠加使用。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜头翻转
 * 你可以通过插件指令设置镜头翻转：
 * 
 * 插件指令：>地图镜头 : 水平翻转 : 时间[60] : 匀速变化
 * 插件指令：>地图镜头 : 垂直翻转 : 时间[60] : 匀速变化
 * 插件指令：>地图镜头 : 顺时针翻转 : 时间[60] : 匀速变化
 * 插件指令：>地图镜头 : 逆时针翻转 : 时间[60] : 匀速变化
 * 插件指令：>地图镜头 : 水平翻转 : 时间[60] : 弹性变化
 * 插件指令：>地图镜头 : 垂直翻转 : 时间[60] : 弹性变化
 * 插件指令：>地图镜头 : 顺时针翻转 : 时间[60] : 弹性变化
 * 插件指令：>地图镜头 : 逆时针翻转 : 时间[60] : 弹性变化
 * 插件指令：>地图镜头 : 水平翻转 : 时间[60] : 增减速变化
 * 插件指令：>地图镜头 : 垂直翻转 : 时间[60] : 增减速变化
 * 插件指令：>地图镜头 : 顺时针翻转 : 时间[60] : 增减速变化
 * 插件指令：>地图镜头 : 逆时针翻转 : 时间[60] : 增减速变化
 * 
 * 插件指令：>地图镜头 : 恢复翻转 : 时间[60] : 匀速变化
 * 插件指令：>地图镜头 : 恢复翻转 : 时间[60] : 弹性变化
 * 插件指令：>地图镜头 : 恢复翻转 : 时间[60] : 增减速变化
 * 
 * 1.数字表示翻转的时间，单位帧。
 * 2.注意，翻转只能处于一种状态。比如顺时针翻转后。其它翻转指令完全失效。
 *   只有恢复翻转后，才能进行其它翻转操作。
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
 * ----可选设定 - 整体平移/聚焦偏移
 * 你可以通过插件指令设置下面功能：
 * 
 * 插件指令：>地图镜头 : 修改聚焦偏移 : 位置[100,100]
 * 插件指令：>地图镜头 : 修改整体平移 : 位置[100,100] : 时间[60] : 匀速移动
 * 插件指令：>地图镜头 : 修改整体平移 : 位置[100,100] : 时间[60] : 弹性移动
 * 插件指令：>地图镜头 : 修改整体平移 : 位置[100,100] : 时间[60] : 增减速移动
 * 插件指令：>地图镜头 : 边缘遮挡层 : 启用
 * 插件指令：>地图镜头 : 边缘遮挡层 : 关闭
 * 插件指令：>地图镜头 : 边缘遮挡层 : 修改颜色 : #ffffff
 * 
 * 1.聚焦偏移默认位置为[0,0]。
 *   由于 聚焦偏移 是自动模式中的参数，因此只能瞬间修改。
 *   修改后，镜头会对聚焦进行偏移。
 * 2.整体平移默认位置为[0,0]。
 *   修改后能在一段时间内进行镜头整体平移变化，并且永久有效。
 *   注意此指令只对 地图界面 有效。
 * 3.边缘遮挡层只能在 整体平移 之后才能看见，并且能修改颜色。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 滚动地图
 * 你可以通过插件指令控制 滚动地图：
 * 
 * 插件指令：>地图镜头 : 滚动地图 : 方向[上] : 距离[1] : 速度[4]
 * 插件指令：>地图镜头 : 滚动地图 : 方向[下] : 距离[1] : 速度[4]
 * 插件指令：>地图镜头 : 滚动地图 : 方向[左] : 距离[1] : 速度[4]
 * 插件指令：>地图镜头 : 滚动地图 : 方向[右] : 距离[1] : 速度[4]
 * 插件指令：>地图镜头 : 滚动地图 : 方向[左上] : 距离[1] : 速度[4]
 * 插件指令：>地图镜头 : 滚动地图 : 方向[左下] : 距离[1] : 速度[4]
 * 插件指令：>地图镜头 : 滚动地图 : 方向[右上] : 距离[1] : 速度[4]
 * 插件指令：>地图镜头 : 滚动地图 : 方向[右下] : 距离[1] : 速度[4]
 * 插件指令：>地图镜头 : 滚动地图 : 回到原位置 : 速度[4]
 * 
 * 1.插件指令只在 自动模式 下才能生效。
 *   "距离"的单位为 图块，"速度"的单位为 事件移动速度（1/2/3/4/5/6）。
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
 * 测试方法：   去各个管理层跑一圈测试。
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
 * [v1.9]
 * 大幅度改进了插件的镜头控制结构。
 * [v2.0]
 * 修复了镜头墙在 小的+循环的 地图中，镜头墙会卡住的问题。
 * [v2.1]
 * 优化了旧存档的识别与兼容。
 * [v2.2]
 * 添加了 修改整体平移/修改聚焦偏移/边缘遮挡层 的功能。
 * 修复了镜头墙在 非循环地图 中部分位置无效的bug。
 * [v2.3]
 * 兼容了 滚动地图 原始的事件指令功能。
 * 
 * 
 * 
 * @param ---常规---
 * @default
 * 
 * @param 整体平移-镜头 X
 * @parent ---常规---
 * @desc 可将镜头整体平移，单位像素。（可为负数）可以用插件指令修改，平移后要想办法用菜单或图片遮挡住平移漏出的部分。
 * @default 0
 * 
 * @param 整体平移-镜头 Y
 * @parent ---常规---
 * @desc 可将镜头整体平移，单位像素。（可为负数）可以用插件指令修改，平移后要想办法用菜单或图片遮挡住平移漏出的部分。
 * @default 0
 * 
 * @param 整体平移-是否启用边缘遮挡层
 * @parent ---常规---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 当整体平移出界一段距离时，边缘遮挡层能防止玩家看到不合适的镜头边缘，也可以作为空白区域的菜单/立绘的底色。
 * @default true
 * 
 * @param 边缘遮挡层颜色
 * @parent 整体平移-是否启用边缘遮挡层
 * @desc 边缘遮挡层的颜色，可以作为空白区域的菜单/立绘的底色。
 * @default #ffffff
 * 
 * @param 缩小镜头时是否加强刷新量
 * @parent ---常规---
 * @type boolean
 * @on 加强
 * @off 关闭
 * @desc 地图的图块是一块块拼上去的，如果缩小镜头，将看到更多的图块。设置后，强制刷新看得见的图块。
 * @default true
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
 * @param 聚焦偏移-镜头 X
 * @parent ---自动模式---
 * @desc 镜头模式为"自动模式"时，默认镜头聚焦目标的中心，在中心的基础上x轴方向偏移，单位像素。（可为负数）
 * @default 0
 * 
 * @param 聚焦偏移-镜头 Y
 * @parent ---自动模式---
 * @desc 镜头模式为"自动模式"时，默认镜头聚焦目标的中心，在中心的基础上y轴方向偏移，单位像素。（可为负数）
 * @default 0
 *
 * @param 镜头移动模式
 * @parent ---自动模式---
 * @type select
 * @option 匀速移动
 * @value 匀速移动
 * @option 弹性移动
 * @value 弹性移动
 * @desc 镜头模式为"自动模式"时，镜头移动到新目标的移动模式。
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
 * @default 24
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
 * @param 切换地图时是否恢复默认
 * @parent ---叠加变化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 切换地图时，镜头的旋转、X缩放、Y缩放全部恢复默认值。
 * @default true
 * 
 * 
 * @param DEBUG-镜头对齐框
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 开启后，将显示镜头的初始位置框、层级锁定框，用于排查镜头问题。
 * @default false
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LCa（Layer_Camera）
//		临时全局变量	DrillUp.g_LCa_xxx
//		临时局部变量	this._drill_LCa_xxx
//		存储数据变量	$gameSystem._drill_LCa_xxx
//		全局存储变量	无
//		覆盖重写方法	Game_Map.prototype.screenTileX
//						Game_Map.prototype.screenTileY
//						Game_Player.prototype.updateScroll（半覆写）
//						Game_Map.prototype.updateScroll（半覆写）
//						Game_Map.prototype.setDisplayPos（半覆写）
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	各个管理层
//		★性能测试消耗	18.74ms 23.85ms
//		★最坏情况		暂无
//		★备注			消耗虽然很小，但是总能找到。移动镜头、翻转镜头没有明显的消耗。
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
//			->☆管辖权 - 镜头
//			->☆管辖权 - 镜头滚动
//			->☆管辖函数覆写
//
//			->☆镜头控制器函数
//			->☆镜头控制
//				->镜头架设置
//				->设置镜头位置 setDisplayPos
//				->切换地图时恢复默认
//				->控制器帧刷新
//
//			->镜头控制器【Drill_LCa_Controller】
//				->A主体
//				->B镜头架（单位图块）
//					->设置宽度【标准函数】
//					->设置高度【标准函数】
//					->镜头的矩形范围【标准函数】
//					->镜头架的矩形范围【标准函数】
//				->C镜头基点
//					->获取镜头变换位置（子贴图用）【标准函数】
//					->获取镜头变换位置（外部贴图用）【标准函数】
//					->地图落点 转换（外部贴图 -> 子贴图）【标准函数】
//					->地图落点 转换（子贴图 -> 外部贴图）【标准函数】
//					->获取地图鼠标落点（子贴图用）【标准函数】
//					->获取地图鼠标落点（外部贴图用）【标准函数】
//				->D自动模式
//				->E观光模式
//				->F固定看向
//				->G叠加变化
//				->H整体平移
//				->I滚动地图
//
//			->☆图块填充（A主体 相关）
//				->图块margin
//				->地图远景
//				->获取矩阵 缩放、旋转 后的外包裹矩阵
//			->☆缩放转换（G叠加变化 相关）
//				->屏幕宽度 screenTileX
//				->屏幕高度 screenTileY
//				->缩放地图的鼠标X修正
//				->缩放地图的鼠标Y修正
//			->☆整体平移（H整体平移 相关）
//				->鼠标指向标
//				->边缘遮挡层
//			->☆滚动地图（I滚动地图 相关）
//				->地图镜头滚动 updateScroll
//				->玩家镜头位置 updateScroll
//				->开始滚动 startScroll
//				->判断滚动状态 isScrolling
//
//			->☆层级标记器
//				->标准模块
//					->是否处于下层
//					->是否处于中层
//					->是否处于上层
//					->是否处于下层/中层/上层任意一层
//					->是否处于图片层
//					->是否处于最顶层
//					->是否处于图片层/最顶层任意一层
//			->☆镜头墙
//				->事件容器
//				->事件注释
//				->镜头控制器扩展
//
//			->☆DEBUG镜头对齐框
//			->镜头对齐框 贴图【Drill_LCa_DebugSprite】
//
//			->☆其他插件兼容
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 镜头控制器【Drill_LCa_Controller】
//			* 镜头对齐框 贴图【Drill_LCa_DebugSprite】
//		
//		★必要注意事项：
//			1.镜头原理： 将 整个Spriteset图层 平移、旋转、缩放。
//			  底层函数： drill_LCa_updateCameraControl。
//			  贴图与镜头原理： 镜头变换时，贴图跟随镜头一起变换。
//			  【旋转与缩放是两个独立的属性，只有平移会受到 旋转与缩放 的影响，且与各功能的影响叠加在一起】
//			2.子贴图用 与 外部贴图用：
//			  图层变换时，在图层内的子贴图会跟着变，但在图层外的不会变。【注意，子贴图不会跟着 _displayX 一起移动】
//			  由于两类贴图性质不一样。所以需要区分控制。
//			  【变换只会影响 平移、旋转、缩放 三个属性，而你的目的是要让 对齐线 在各个层级下保持一致。】
//			  子贴图用   == 在图层内 == 上层、中层、下层
//			  外部贴图用 == 在图层外 == 图片层、最顶层
//			3.该插件比 战斗镜头，多了 循环积累值 Acc 的情况。
//			  每次都是对Acc进行赋值，Acc经过取余后才会赋值给 _displayX 。
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
//			1.问题：翻转时，会看到图块的拼接过程。
//			  解决：【已解决】，2022/9/10 已解决，通过外包裹矩阵。通过文档讲解也能给群友知识。
//			2.问题：由于镜头平移关系，目前镜头设置偏移量非常麻烦，目前xy相关平移不考虑，以免平移非常难看。
//			  解决：【未解决】
//			3.问题：镜头最大的问题，在于圆心的问题。
//					只有单独的sprite才能设置圆心，tilemap和循环贴图都没有圆心。
//					旋转的时候问题也大，这相当于指数形式让公式越来越复杂（通过数学转换函数解决。）
//			  解决：【未解决】
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_LCa_PluginTip_curName = "Drill_LayerCamera.js 地图-活动地图镜头";
	DrillUp.g_LCa_PluginTip_baseList = [
		"Drill_CoreOfBallistics.js 数学模型-弹道核心",
		"Drill_CoreOfInput.js 系统-输入设备核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_LCa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_LCa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_LCa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_LCa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_LCa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_LCa_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_LCa_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_LCa_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_LCa_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerCamera = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerCamera');


	/*-----------------常规------------------*/
	DrillUp.g_LCa_globalOffset_x = Number(DrillUp.parameters['整体平移-镜头 X'] || 0);
	DrillUp.g_LCa_globalOffset_y = Number(DrillUp.parameters['整体平移-镜头 Y'] || 0);
    DrillUp.g_LCa_globalBarrierLayerEnabled = String(DrillUp.parameters['整体平移-是否启用边缘遮挡层'] || "true") == "true";
    DrillUp.g_LCa_globalBarrierLayerColor = String(DrillUp.parameters['边缘遮挡层颜色'] || '#ffffff');
	
    DrillUp.g_LCa_forceRefresh = String(DrillUp.parameters['缩小镜头时是否加强刷新量'] || "true") == "true";
	
	/*-----------------默认镜头模式------------------*/
    DrillUp.g_LCa_mode = String(DrillUp.parameters['默认镜头模式'] || '自动模式');
	
	DrillUp.g_LCa_auto_x = Number(DrillUp.parameters['聚焦偏移-镜头 X'] || 0);
	DrillUp.g_LCa_auto_y = Number(DrillUp.parameters['聚焦偏移-镜头 Y'] || 0);
    DrillUp.g_LCa_auto_moveType = String(DrillUp.parameters['镜头移动模式'] || '弹性移动');
    DrillUp.g_LCa_auto_speedRatio = Number(DrillUp.parameters['弹性模式移动速度'] || 10);
    DrillUp.g_LCa_auto_speedMax = Number(DrillUp.parameters['弹性模式镜头速度上限'] || 24);
	
	DrillUp.g_LCa_tourist_keyboardEnabled = String(DrillUp.parameters['是否启用键盘操作'] || "true") == "true";
	DrillUp.g_LCa_tourist_mouseEnabled = String(DrillUp.parameters['是否启用鼠标操作'] || "true") == "true";
	DrillUp.g_LCa_tourist_mouseThickness = Number(DrillUp.parameters['鼠标触发区域的厚度'] || 40);
	DrillUp.g_LCa_tourist_speed = Number(DrillUp.parameters['镜头移动速度'] || 24);
	
	/*-----------------叠加变化------------------*/
	DrillUp.g_LCa_defaultRotation = Number(DrillUp.parameters['默认旋转角度'] || 0);
	DrillUp.g_LCa_defaultScaleX = Number(DrillUp.parameters['默认X缩放比例'] || 1.00);
	DrillUp.g_LCa_defaultScaleY = Number(DrillUp.parameters['默认Y缩放比例'] || 1.00);
	DrillUp.g_LCa_resetDefaultInMapSwitch = String(DrillUp.parameters['切换地图时是否恢复默认'] || "true") == "true";
	
	/*-----------------杂项------------------*/
	DrillUp.g_LCa_debugEnabled = String(DrillUp.parameters['DEBUG-镜头对齐框'] || "false") == "true";
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfInput ){
	
	
	
//=============================================================================
// ** ☆管辖权 - 镜头
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * A基本属性『地图-活动地图镜头』 - 图块 - 屏幕宽度（图块单位）
//==============================
Game_Map.prototype.screenTileX = function(){ return Graphics.width / this.tileWidth(); };
//==============================
// * A基本属性『地图-活动地图镜头』 - 图块 - 屏幕高度（图块单位）
//==============================
Game_Map.prototype.screenTileY = function(){ return Graphics.height / this.tileHeight(); };

//==============================
// * E镜头『地图-活动地图镜头』 - 访问器（图块单位）
//==============================
Game_Map.prototype.displayX = function(){ return this._displayX; };
Game_Map.prototype.displayY = function(){ return this._displayY; };
//==============================
// * E镜头『地图-活动地图镜头』 - 设置镜头位置
//
//			说明：	> 所有脚本中，控制 _displayX 和 _displayY 的只有两个地方。
//					  一个是该函数，强制设置固定的位置。
//					  另一个是 .scrollDown、.scrollLeft、.scrollRight、.scrollUp 函数。
//					> 地图活动镜头插件，只是把 _displayX 和 _displayY 作为移动目标，并不控制。
//==============================
Game_Map.prototype.setDisplayPos = function( x, y ){
    if( this.isLoopHorizontal() ){
        this._displayX = x.mod(this.width());
        this._parallaxX = x;
    }else{
        var endX = this.width() - this.screenTileX();
        this._displayX = endX < 0 ? endX / 2 : x.clamp(0, endX);
        this._parallaxX = this._displayX;
    }
    if( this.isLoopVertical() ){
        this._displayY = y.mod(this.height());
        this._parallaxY = y;
    }else{
        var endY = this.height() - this.screenTileY();
        this._displayY = endY < 0 ? endY / 2 : y.clamp(0, endY);
        this._parallaxY = this._displayY;
    }
};
*/

//=============================================================================
// ** ☆管辖权 - 镜头滚动
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//=============================================================================
/*
//==============================
// * F镜头滚动『地图-活动地图镜头』 - 载入初始化
//
//			说明：	> 只在 载入地图时 执行一次。
//==============================
Game_Map.prototype.setupScroll = function(){
    this._scrollDirection = 2;
    this._scrollRest = 0;
    this._scrollSpeed = 4;
};
//==============================
// * F镜头滚动『地图-活动地图镜头』 - 开始滚动（command204）
//==============================
Game_Map.prototype.startScroll = function( direction, distance, speed ){
    this._scrollDirection = direction;
    this._scrollRest = distance;
    this._scrollSpeed = speed;
};
//==============================
// * F镜头滚动『地图-活动地图镜头』 - 判断滚动状态
//==============================
Game_Map.prototype.isScrolling = function(){ return this._scrollRest > 0; };
//==============================
// * F镜头滚动『地图-活动地图镜头』 - 滚动距离
//==============================
Game_Map.prototype.scrollDistance = function(){ return Math.pow(2, this._scrollSpeed) / 256; };
//==============================
// * F镜头滚动『地图-活动地图镜头』 - 帧刷新
//
//			应用：	调用了 .scrollDown、.scrollLeft、.scrollRight、.scrollUp 函数。
//			说明：	> 注意，地图镜头受两个地方控制，这里为其中一个，事件指令的作用。
//					  另一个见 Game_Player.prototype.updateScroll 。
//					> 这两处会有【时间差】，子插件继承时一定要注意。
//==============================
Game_Map.prototype.updateScroll = function(){
	
	// > 指令【移动 > 滚动地图】时才执行
    if( this.isScrolling() ){
        var lastX = this._displayX;
        var lastY = this._displayY;
        this.doScroll(this._scrollDirection, this.scrollDistance());
        if( this._displayX === lastX && this._displayY === lastY ){
            this._scrollRest = 0;
        }else{
            this._scrollRest -= this.scrollDistance();
        }
    }
};
//==============================
// * F镜头滚动『地图-活动地图镜头』 - 执行滚动（帧刷新）
//==============================
Game_Map.prototype.doScroll = function( direction, distance ){
    switch( direction ){
		case 2:
			this.scrollDown(distance);
			break;
		case 4:
			this.scrollLeft(distance);
			break;
		case 6:
			this.scrollRight(distance);
			break;
		case 8:
			this.scrollUp(distance);
			break;
    }
};
//==============================
// * F镜头滚动『地图-活动地图镜头』 - 向下滚动
//
//			应用：	> 被函数 Game_Player.prototype.updateScroll 调用（注意）
//					> 被函数 Game_Map.prototype.updateScroll 调用
//==============================
Game_Map.prototype.scrollDown = function( distance ){
    if( this.isLoopVertical() ){
        this._displayY += distance;
        this._displayY %= $dataMap.height;
        if( this._parallaxLoopY ){
            this._parallaxY += distance;
        }
    }else if( this.height() >= this.screenTileY() ){
        var lastY = this._displayY;
        this._displayY = Math.min(this._displayY + distance,
            this.height() - this.screenTileY());
        this._parallaxY += this._displayY - lastY;
    }
};
//==============================
// * F镜头滚动『地图-活动地图镜头』 - 向左滚动
//
//			应用：	> 被函数 Game_Player.prototype.updateScroll 调用（注意）
//					> 被函数 Game_Map.prototype.updateScroll 调用
//==============================
Game_Map.prototype.scrollLeft = function( distance ){
    if( this.isLoopHorizontal() ){
        this._displayX += $dataMap.width - distance;
        this._displayX %= $dataMap.width;
        if( this._parallaxLoopX ){
            this._parallaxX -= distance;
        }
    }else if( this.width() >= this.screenTileX() ){
        var lastX = this._displayX;
        this._displayX = Math.max(this._displayX - distance, 0);
        this._parallaxX += this._displayX - lastX;
    }
};
//==============================
// * F镜头滚动『地图-活动地图镜头』 - 向右滚动
//
//			应用：	> 被函数 Game_Player.prototype.updateScroll 调用（注意）
//					> 被函数 Game_Map.prototype.updateScroll 调用
//==============================
Game_Map.prototype.scrollRight = function( distance ){
    if( this.isLoopHorizontal() ){
        this._displayX += distance;
        this._displayX %= $dataMap.width;
        if( this._parallaxLoopX ){
            this._parallaxX += distance;
        }
    }else if( this.width() >= this.screenTileX() ){
        var lastX = this._displayX;
        this._displayX = Math.min(this._displayX + distance,
            this.width() - this.screenTileX());
        this._parallaxX += this._displayX - lastX;
    }
};
//==============================
// * F镜头滚动『地图-活动地图镜头』 - 向上滚动
//
//			应用：	> 被函数 Game_Player.prototype.updateScroll 调用（注意）
//					> 被函数 Game_Map.prototype.updateScroll 调用
//==============================
Game_Map.prototype.scrollUp = function( distance ){
    if( this.isLoopVertical() ){
        this._displayY += $dataMap.height - distance;
        this._displayY %= $dataMap.height;
        if( this._parallaxLoopY ){
            this._parallaxY -= distance;
        }
    }else if( this.height() >= this.screenTileY() ){
        var lastY = this._displayY;
        this._displayY = Math.max(this._displayY - distance, 0);
        this._parallaxY += this._displayY - lastY;
    }
};

//==============================
// * 玩家『地图-活动地图镜头』 - 帧刷新 镜头滚动
//
//			应用：	调用了 .scrollDown、.scrollLeft、.scrollRight、.scrollUp 函数。
//			说明：	> 注意，地图镜头受两个地方控制，这里为其中一个，玩家移动的影响。
//					  另一个见 Game_Map.prototype.updateScroll 。
//					> 这两处会有【顺序差】，子插件继承时一定要注意。
//					> 这里经常出现【1像素悬浮偏移问题】，很可能是刷的时机早了。
//					  因为 $gamePlayer.updateScroll 函数比 $gameMap.update 的时机 晚 刷。
//					  原因见函数 Scene_Map.prototype.updateMain 。
//					> 注意，此函数被 镜头插件覆写。
//					  子类若要继承，应该继承 Game_Player.prototype.update ，而不是此函数。
//==============================
Game_Player.prototype.updateScroll = function( lastScrolledX, lastScrolledY ){
    var x1 = lastScrolledX;
    var y1 = lastScrolledY;
    var x2 = this.scrolledX();
    var y2 = this.scrolledY();
    if( y2 > y1 && y2 > this.centerY() ){
        $gameMap.scrollDown(y2 - y1);
    }
    if( x2 < x1 && x2 < this.centerX() ){
        $gameMap.scrollLeft(x1 - x2);
    }
    if( x2 > x1 && x2 > this.centerX() ){
        $gameMap.scrollRight(x2 - x1);
    }
    if( y2 < y1 && y2 < this.centerY() ){
        $gameMap.scrollUp(y1 - y2);
    }
};
*/


//=============================================================================
// ** ☆管辖函数覆写
//
//			说明：	> 此模块 覆写函数，防止其它插件对函数覆写后，影响功能。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 管辖函数覆写『地图-活动地图镜头』 - 访问器（图块单位）
//==============================
Game_Map.prototype.displayX = function(){ return this._displayX; };
Game_Map.prototype.displayY = function(){ return this._displayY; };



//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_LCa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LCa_pluginCommand.call(this, command, args);
	if( command === ">地图镜头" ){
		
		/*-----------------镜头控制器------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "启用" || type == "开启" || type == "打开" || type == "启动" ){
				$gameSystem.drill_LCa_setEnable( true );
			}
			if( type == "关闭" || type == "禁用" ){
				$gameSystem.drill_LCa_setEnable( false );
			}
			if( type == "暂停镜头运行" || type == "锁定镜头" ){
				$gameSystem.drill_LCa_setPause( true );
			}
			if( type == "继续镜头运行" || type == "解锁镜头" ){
				$gameSystem.drill_LCa_setPause( false );
			}
		}
		
		/*-----------------A主体------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改模式" ){
				$gameSystem.drill_LCa_setMode( temp1 );
			}
		}
		
		/*-----------------D自动模式------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "自动模式-设置镜头移动模式" || type == "设置镜头移动模式" ){
				if( temp1 == "默认移动" ){ temp1 = "匀速移动"; }
				$gameSystem._drill_LCa_controller._drill_data['autoMoveType'] = temp1;
			}
			if( type == "自动模式-设置弹性模式移动速度" || type == "设置弹性模式移动速度" ){
				$gameSystem._drill_LCa_controller._drill_data['autoSpeedRatio'] = Number(temp1);
			}
			if( type == "自动模式-设置弹性模式镜头速度上限" || type == "设置弹性模式镜头速度上限" ){
				$gameSystem._drill_LCa_controller._drill_data['autoSpeedMax'] = Number(temp1);
			}
		}
		/*-----------------D自动模式 - 聚焦偏移------------------*/
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "修改聚焦偏移" ){
				temp1 = temp1.replace("位置[", "");
				temp1 = temp1.replace("]", "");
				var pos = temp1.split(/[,，]/);
				if( pos.length >= 2 ){
					var xx = Number(pos[0]);
					var yy = Number(pos[1]);
					$gameSystem._drill_LCa_controller.drill_LCa_setAutoOffset( xx, yy );
				}
			}
		}
		
		/*-----------------E观光模式------------------*/
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "观光模式-键盘操作" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_LCa_controller._drill_data['touristKeyboardEnabled'] = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_LCa_controller._drill_data['touristKeyboardEnabled'] = false;
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_LCa_controller._drill_data['touristKeyboardEnabled'] = DrillUp.g_LCa_tourist_keyboardEnabled;
				}
			}
			if( type == "观光模式-鼠标操作" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_LCa_controller._drill_data['touristMouseEnabled'] = true;
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_LCa_controller._drill_data['touristMouseEnabled'] = false;
				}
				if( temp1 == "恢复默认" ){
					$gameSystem._drill_LCa_controller._drill_data['touristMouseEnabled'] = DrillUp.g_LCa_tourist_mouseEnabled;
				}
			}
			if( type == "观光模式-镜头移动速度" ){
				temp1 = temp1.replace("速度[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_LCa_controller._drill_data['touristSpeed'] = Number(temp1);
			}
		}
		
		
		/*-----------------F固定看向------------------*/
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "解除固定看向" ){
				$gameSystem.drill_LCa_setUnlock();
			}
			if( type == "立刻看向目标位置" ){
				$gameSystem.drill_LCa_setLookAtImmediately();
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var unit = String(args[3]);
			if( type == "固定看向" ){
				
				var pos = null;
				if( unit == "本事件" ){
					var e_id = this._eventId;
					$gameSystem.drill_LCa_setLockEvent( e_id );
				}
				if( unit == "玩家位置" ){
					$gameSystem.drill_LCa_setLockPosition( $gamePlayer.x, $gamePlayer.y );
				}
				if( unit.indexOf("事件[") != -1 ){
					unit = unit.replace("事件[","");
					unit = unit.replace("]","");
					var e_id = Number(unit);
					if( $gameMap.drill_LCa_isEventExist( e_id ) == false ){ return; }
					$gameSystem.drill_LCa_setLockEvent( e_id );
				}
				if( unit.indexOf("事件变量[") != -1 ){
					unit = unit.replace("事件变量[","");
					unit = unit.replace("]","");
					var e_id = $gameVariables.value(Number(unit));
					if( $gameMap.drill_LCa_isEventExist( e_id ) == false ){ return; }
					$gameSystem.drill_LCa_setLockEvent( e_id );
				}
				if( unit.indexOf("多个事件的中心[") != -1 ){
					unit = unit.replace("多个事件的中心[","");
					unit = unit.replace("]","");
					var e_list = [];
					var str_list = unit.split(/[,，]/);
					for(var i = 0; i < str_list.length; i++ ){
						var e_id = Number(str_list[i]);
						if( $gameMap.drill_LCa_isEventExist( e_id ) == false ){ continue; }
						e_list.push(e_id);
					}
					$gameSystem.drill_LCa_setLockEventList( e_list );
				}
				if( unit.indexOf("位置[") != -1 ){
					unit = unit.replace("位置[","");
					unit = unit.replace("]","");
					var pos = unit.split(/[,，]/);
					if( pos.length >= 2 ){
						var xx = Number(pos[0]);
						var yy = Number(pos[1]);
						$gameSystem.drill_LCa_setLockPosition( xx, yy );
					}
				}
				if( unit.indexOf("位置变量[") != -1 ){
					unit = unit.replace("位置变量[","");
					unit = unit.replace("]","");
					var pos = unit.split(/[,，]/);
					if( pos.length >= 2 ){
						var xx = $gameVariables.value(Number(pos[0]));
						var yy = $gameVariables.value(Number(pos[1]));
						$gameSystem.drill_LCa_setLockPosition( xx, yy );
					}
				}
			}
		}
		
		/*-----------------G叠加变化 - 镜头缩放/旋转------------------*/
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			temp1 = temp1.replace("比例[", "");
			temp1 = temp1.replace("角度[", "");
			temp1 = temp1.replace("]", "");
			temp2 = temp2.replace("时间[","");
			temp2 = temp2.replace("]","");
			if( type == "旋转" ){
				if( temp1 == "恢复默认" ){ temp1 = DrillUp.g_LCa_defaultRotation; }
				var time = Math.max(Number(temp2),1);
			    $gameSystem.drill_LCa_doRotate( Number(temp1), time, "弹性变化" );
				return;
			}
			if( type == "缩放X" ){
				if( temp1 == "恢复默认" ){ temp1 = DrillUp.g_LCa_defaultScaleX; }
				var time = Math.max(Number(temp2),1);
			    $gameSystem.drill_LCa_doScaleX( Number(temp1), time, "弹性变化" );
				return;
			}
			if( type == "缩放Y" ){
				if( temp1 == "恢复默认" ){ temp1 = DrillUp.g_LCa_defaultScaleY; }
				var time = Math.max(Number(temp2),1);
			    $gameSystem.drill_LCa_doScaleY( Number(temp1), time, "弹性变化" );
				return;
			}
		}
		/*-----------------G叠加变化 - 镜头翻转------------------*/
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
			    $gameSystem.drill_LCa_doScaleX( -1, time, changeType );
			    $gameSystem.drill_LCa_doScaleY(  1, time, changeType );
				return;
			}
			if( type == "垂直翻转"){
				var time = Math.max(Number(temp1),1);
				var changeType = "弹性变化";
				if( temp2 == "匀速" ){ changeType = "匀速变化"; }
				if( temp2 == "弹性" ){ changeType = "弹性变化"; }
				if( temp2 == "平滑" ){ changeType = "增减速变化"; }
			    $gameSystem.drill_LCa_doScaleX(  1, time, changeType );
			    $gameSystem.drill_LCa_doScaleY( -1, time, changeType );
				return;
			}
			if( type == "顺时针翻转" ){
				var time = Math.max(Number(temp1),1);
				var changeType = "弹性变化";
				if( temp2 == "匀速" ){ changeType = "匀速变化"; }
				if( temp2 == "弹性" ){ changeType = "弹性变化"; }
				if( temp2 == "平滑" ){ changeType = "增减速变化"; }
			    $gameSystem.drill_LCa_doRotate( 180, time, changeType );
				return;
			}
			if( type == "逆时针翻转" ){
				var time = Math.max(Number(temp1),1);
				var changeType = "弹性变化";
				if( temp2 == "匀速" ){ changeType = "匀速变化"; }
				if( temp2 == "弹性" ){ changeType = "弹性变化"; }
				if( temp2 == "平滑" ){ changeType = "增减速变化"; }
			    $gameSystem.drill_LCa_doRotate( -180, time, changeType );
				return;
			}
			if( type == "恢复翻转" ){
				var time = Math.max(Number(temp1),1);
				var changeType = "弹性变化";
				if( temp2 == "匀速" ){ changeType = "匀速变化"; }
				if( temp2 == "弹性" ){ changeType = "弹性变化"; }
				if( temp2 == "平滑" ){ changeType = "增减速变化"; }
			    $gameSystem.drill_LCa_doScaleX( DrillUp.g_LCa_defaultScaleX, time, changeType );
			    $gameSystem.drill_LCa_doScaleY( DrillUp.g_LCa_defaultScaleY, time, changeType );
			    $gameSystem.drill_LCa_doRotate( DrillUp.g_LCa_defaultRotation, time, changeType );
				return;
			}
		}
		
		/*-----------------H整体平移------------------*/
		if(args.length == 8){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "修改整体平移" ){
				temp1 = temp1.replace("位置[", "");
				temp1 = temp1.replace("]", "");
				temp2 = temp2.replace("时间[", "");
				temp2 = temp2.replace("]", "");
				var pos = temp1.split(/[,，]/);
				if( pos.length >= 2 ){
					var xx = Number(pos[0]);
					var yy = Number(pos[1]);
					$gameSystem._drill_LCa_controller.drill_LCa_setGlobalOffset( xx, yy, Number(temp2), temp3 );
				}
			}
		}
		if(args.length == 4){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "边缘遮挡层" ){
				if( temp1 == "启用" || temp1 == "开启" || temp1 == "打开" || temp1 == "启动" ){
					$gameSystem._drill_LCa_controller.drill_LCa_setGlobalBarrierLayerEnabled( true );
				}
				if( temp1 == "关闭" || temp1 == "禁用" ){
					$gameSystem._drill_LCa_controller.drill_LCa_setGlobalBarrierLayerEnabled( false );
				}
			}
		}
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "边缘遮挡层" ){
				if( temp1 == "修改颜色" ){
					$gameSystem._drill_LCa_controller.drill_LCa_setGlobalBarrierLayerColor( temp2 );
				}
			}
		}
		
		/*-----------------I滚动地图------------------*/
		if(args.length == 8){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			var temp3 = String(args[7]);
			if( type == "滚动地图" ){
				temp2 = temp2.replace("距离[", "");
				temp2 = temp2.replace("]", "");
				temp3 = temp3.replace("速度[", "");
				temp3 = temp3.replace("]", "");
				if( temp1 == "方向[上]" ){
					$gameSystem._drill_LCa_controller.drill_LCa_scrollToTarget( 8, Number(temp2), Number(temp3) );
				}
				if( temp1 == "方向[下]" ){
					$gameSystem._drill_LCa_controller.drill_LCa_scrollToTarget( 2, Number(temp2), Number(temp3) );
				}
				if( temp1 == "方向[左]" ){
					$gameSystem._drill_LCa_controller.drill_LCa_scrollToTarget( 4, Number(temp2), Number(temp3) );
				}
				if( temp1 == "方向[右]" ){
					$gameSystem._drill_LCa_controller.drill_LCa_scrollToTarget( 6, Number(temp2), Number(temp3) );
				}
				if( temp1 == "方向[左上]" ){
					$gameSystem._drill_LCa_controller.drill_LCa_scrollToTarget( 7, Number(temp2), Number(temp3) );
				}
				if( temp1 == "方向[左下]" ){
					$gameSystem._drill_LCa_controller.drill_LCa_scrollToTarget( 1, Number(temp2), Number(temp3) );
				}
				if( temp1 == "方向[右上]" ){
					$gameSystem._drill_LCa_controller.drill_LCa_scrollToTarget( 9, Number(temp2), Number(temp3) );
				}
				if( temp1 == "方向[右下]" ){
					$gameSystem._drill_LCa_controller.drill_LCa_scrollToTarget( 3, Number(temp2), Number(temp3) );
				}
			}
		}
		if(args.length == 6){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "滚动地图" ){
				if( temp1 == "回到原位置" ){
					temp2 = temp2.replace("速度[", "");
					temp2 = temp2.replace("]", "");
					$gameSystem._drill_LCa_controller.drill_LCa_scrollToHome( Number(temp2) );
				}
			}
		}
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_LCa_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_LCa_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_LCa_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LCa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LCa_sys_initialize.call(this);
	this.drill_LCa_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LCa_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LCa_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LCa_saveEnabled == true ){	
		$gameSystem.drill_LCa_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LCa_initSysData();
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
Game_System.prototype.drill_LCa_initSysData = function() {
	this.drill_LCa_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LCa_checkSysData = function() {
	this.drill_LCa_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LCa_initSysData_Private = function() {
	
	// > 控制器
	var data = {
		'enable':true,
		'pause':false,
		
		'mode':DrillUp.g_LCa_mode,
		
		'holderWidth':17,
		'holderHeight':13,
		
		'autoOffsetX':DrillUp.g_LCa_auto_x,
		'autoOffsetY':DrillUp.g_LCa_auto_y,
		'autoMoveType':DrillUp.g_LCa_auto_moveType,
		'autoSpeedRatio':DrillUp.g_LCa_auto_speedRatio,
		'autoSpeedMax':DrillUp.g_LCa_auto_speedMax,
		
		'touristKeyboardEnabled':DrillUp.g_LCa_tourist_keyboardEnabled,
		'touristMouseEnabled':DrillUp.g_LCa_tourist_mouseEnabled,
		'touristMouseThickness':DrillUp.g_LCa_tourist_mouseThickness,
		'touristSpeed':DrillUp.g_LCa_tourist_speed / 48,
		
		'defaultRotation':DrillUp.g_LCa_defaultRotation,
		'defaultScaleX':DrillUp.g_LCa_defaultScaleX,
		'defaultScaleY':DrillUp.g_LCa_defaultScaleY,
		
		'globalOffsetX':DrillUp.g_LCa_globalOffset_x,
		'globalOffsetY':DrillUp.g_LCa_globalOffset_y,
		'globalBarrierLayerEnabled':DrillUp.g_LCa_globalBarrierLayerEnabled,
		'globalBarrierLayerColor':DrillUp.g_LCa_globalBarrierLayerColor,
	};
	this._drill_LCa_controller = new Drill_LCa_Controller( data );
	
};	
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LCa_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LCa_controller == undefined || 
		this._drill_LCa_controller._drill_data['globalOffsetX'] == undefined || 
		this._drill_LCa_controller._drill_scrollOffsetX == undefined ){
		this.drill_LCa_initSysData();
	}
	
};


//=============================================================================
// ** ☆镜头控制器函数
//
//			说明：	> 此处全都调用 镜头控制器 的函数。方便子插件使用函数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 控制器 - 是否启用【标准函数】
//==============================
Game_System.prototype.drill_LCa_isEnable = function(){
	return this._drill_LCa_controller.drill_LCa_isEnable();
}
//==============================
// * 控制器 - 启用/关闭【标准函数】
//==============================
Game_System.prototype.drill_LCa_setEnable = function( enable ){
	return this._drill_LCa_controller.drill_LCa_setEnable( enable );
}
//==============================
// * 控制器 - 是否暂停【标准函数】
//==============================
Game_System.prototype.drill_LCa_isPause = function(){
	return this._drill_LCa_controller.drill_LCa_isPause();
}
//==============================
// * 控制器 - 暂停/继续【标准函数】
//==============================
Game_System.prototype.drill_LCa_setPause = function( pause ){
	return this._drill_LCa_controller.drill_LCa_setPause( pause );
}

//==============================
// * A主体 - 镜头模式 - 设置模式【标准函数】
//==============================
Game_System.prototype.drill_LCa_setMode = function( mode ){
	this._drill_LCa_controller.drill_LCa_setMode( mode );
}
//==============================
// * A主体 - 镜头模式 - 获取模式【标准函数】
//==============================
Game_System.prototype.drill_LCa_getMode = function(){
	return this._drill_LCa_controller.drill_LCa_getMode();
}
//==============================
// * A主体 - 获取旋转值【标准函数】
//
//			说明：	注意，单位为角度。
//==============================
Game_System.prototype.drill_LCa_getRotateValue = function(){
	return this._drill_LCa_controller.drill_LCa_getRotateValue();
}
//==============================
// * A主体 - 获取缩放X值【标准函数】
//==============================
Game_System.prototype.drill_LCa_getScaleXValue = function(){
	return this._drill_LCa_controller.drill_LCa_getScaleXValue();
}
Game_System.prototype.drill_LCa_curScaleX = function(){		//（旧函数名）
	return this._drill_LCa_controller.drill_LCa_getScaleXValue();
}
//==============================
// * A主体 - 获取缩放Y值【标准函数】
//==============================
Game_System.prototype.drill_LCa_getScaleYValue = function(){
	return this._drill_LCa_controller.drill_LCa_getScaleYValue();
}
Game_System.prototype.drill_LCa_curScaleY = function(){		//（旧函数名）
	return this._drill_LCa_controller.drill_LCa_getScaleYValue();
}

//==============================
// * B镜头架 - 设置宽度【标准函数】
//==============================
Game_System.prototype.drill_LCa_setCameraHolderWidth = function( width ){
	return this._drill_LCa_controller.drill_LCa_setCameraHolderWidth( width );
}
//==============================
// * B镜头架 - 设置高度【标准函数】
//==============================
Game_System.prototype.drill_LCa_setCameraHolderHeight = function( height ){
	return this._drill_LCa_controller.drill_LCa_setCameraHolderHeight( height );
}
//==============================
// * B镜头架 - 镜头的矩形范围【标准函数】
//==============================
Game_System.prototype.drill_LCa_getCameraRect = function(){
	return this._drill_LCa_controller.drill_LCa_getCameraRect();
}
//==============================
// * B镜头架 - 镜头架的矩形范围【标准函数】
//==============================
Game_System.prototype.drill_LCa_getCameraHolderRect = function(){
	return this._drill_LCa_controller.drill_LCa_getCameraHolderRect();
}

//==============================
// * C镜头基点 - 活动范围【标准函数】
//==============================
Game_System.prototype.drill_LCa_getCameraPosRange = function(){
	return this._drill_LCa_controller.drill_LCa_getCameraPosRange();
}
//==============================
// * C镜头基点 - 获取镜头基点偏移位置【标准函数】
//==============================
Game_System.prototype.drill_LCa_getCameraPosOffset = function(){
	return this._drill_LCa_controller.drill_LCa_getCameraPosOffset();
}
//==============================
// * C镜头基点 - 获取镜头变换位置（子贴图用）【标准函数】
//==============================
Game_System.prototype.drill_LCa_getCameraPos_Children = function(){
	return this._drill_LCa_controller.drill_LCa_getCameraPos_Children();
}
//==============================
// * C镜头基点 - 获取镜头变换位置（外部贴图用）【标准函数】
//==============================
Game_System.prototype.drill_LCa_getCameraPos_OuterSprite = function( x, y ){
	return this._drill_LCa_controller.drill_LCa_getCameraPos_OuterSprite( x, y );
}
//==============================
// * C镜头基点 - 地图落点 转换（外部贴图 -> 子贴图）【标准函数】
//==============================
Game_System.prototype.drill_LCa_getPos_OuterToChildren = function( x, y ){
	return this._drill_LCa_controller.drill_LCa_getPos_OuterToChildren( x, y );
}
//==============================
// * C镜头基点 - 地图落点 转换（子贴图 -> 外部贴图）【标准函数】
//==============================
Game_System.prototype.drill_LCa_getPos_ChildrenToOuter = function( x, y ){
	return this._drill_LCa_controller.drill_LCa_getPos_ChildrenToOuter( x, y );
}
//==============================
// * C镜头基点 - 获取地图鼠标落点（子贴图用）【标准函数】
//==============================
Game_System.prototype.drill_LCa_getMousePos_OnChildren = function(){
	return this._drill_LCa_controller.drill_LCa_getMousePos_OnChildren();
}
//==============================
// * C镜头基点 - 获取地图鼠标落点（外部贴图用）【标准函数】
//==============================
Game_System.prototype.drill_LCa_getMousePos_OnOuterSprite = function(){
	return this._drill_LCa_controller.drill_LCa_getMousePos_OnOuterSprite();
}

//==============================
// * D自动模式 - 设置聚焦位置【标准函数】
//==============================
//Game_System.prototype.drill_LCa_setAutoPosition = function( x, y ){
//	this._drill_LCa_controller.drill_LCa_setAutoPosition( x, y );
//}
//==============================
// * E观光模式 - 设置聚焦位置【标准函数】
//==============================
Game_System.prototype.drill_LCa_setTouristPosition = function( x, y ){
	this._drill_LCa_controller.drill_LCa_setTouristPosition( x, y );
}
//==============================
// * F固定看向 - 固定看向位置【标准函数】
//==============================
Game_System.prototype.drill_LCa_setLockPosition = function( x, y ){
	this._drill_LCa_controller.drill_LCa_setLockPosition( x, y );
}
//==============================
// * F固定看向 - 固定看向事件【标准函数】
//==============================
Game_System.prototype.drill_LCa_setLockEvent = function( event_id ){
	this._drill_LCa_controller.drill_LCa_setLockEvent( event_id );
}
//==============================
// * F固定看向 - 固定多个事件的中心【标准函数】
//==============================
Game_System.prototype.drill_LCa_setLockEventList = function( event_id ){
	this._drill_LCa_controller.drill_LCa_setLockEventList( event_id );
}
//==============================
// * F固定看向 - 解除固定看向【标准函数】
//==============================
Game_System.prototype.drill_LCa_setUnlock = function(){
	this._drill_LCa_controller.drill_LCa_setUnlock();
}
//==============================
// * F固定看向 - 立刻看向目标位置【标准函数】
//==============================
Game_System.prototype.drill_LCa_setLookAtImmediately = function(){
	this._drill_LCa_controller.drill_LCa_setLookAtImmediately();
}

//==============================
// * G叠加变化 - 执行旋转【标准函数】
//==============================
Game_System.prototype.drill_LCa_doRotate = function( rotation, time, changeType ){
	this._drill_LCa_controller.drill_LCa_doRotate( rotation, time, changeType );
}
//==============================
// * G叠加变化 - 执行缩放X【标准函数】
//==============================
Game_System.prototype.drill_LCa_doScaleX = function( scaleX, time, changeType ){
	this._drill_LCa_controller.drill_LCa_doScaleX( scaleX, time, changeType );
}
//==============================
// * G叠加变化 - 执行缩放Y【标准函数】
//==============================
Game_System.prototype.drill_LCa_doScaleY = function( scaleY, time, changeType ){
	this._drill_LCa_controller.drill_LCa_doScaleY( scaleY, time, changeType );
}
//==============================
// * G叠加变化 - 镜头的X 转 缩放后的X【标准函数】
//==============================
Game_System.prototype.drill_LCa_cameraToMapX = function( x ){
	return this._drill_LCa_controller.drill_LCa_cameraToMapX( x );
}
//==============================
// * G叠加变化 - 镜头的X 转 缩放后的Y【标准函数】
//==============================
Game_System.prototype.drill_LCa_cameraToMapY = function( y ){
	return this._drill_LCa_controller.drill_LCa_cameraToMapY( y );
}
//==============================
// * G叠加变化 - 缩放后的X -> 镜头的X【标准函数】
//==============================
Game_System.prototype.drill_LCa_mapToCameraX = function( x ){
	return this._drill_LCa_controller.drill_LCa_mapToCameraX( x );
}
//==============================
// * G叠加变化 - 缩放后的Y -> 镜头的Y【标准函数】
//==============================
Game_System.prototype.drill_LCa_mapToCameraY = function( y ){
	return this._drill_LCa_controller.drill_LCa_mapToCameraY( y );
}
//==============================
// * H整体平移（无）
//==============================
// * I滚动地图（无）
//==============================


//=============================================================================
// ** ☆镜头控制
//
//			说明：	> 此模块帧刷新 镜头控制器 ，并进行图层数据实时赋值。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 镜头控制 - 镜头架初始化
//==============================
var _drill_LCa_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LCa_setup.call( this, mapId );
	
	// > B镜头架 设置
	$gameSystem.drill_LCa_setCameraHolderWidth( this.width() );
	$gameSystem.drill_LCa_setCameraHolderHeight( this.height() );
		
	// > E观光模式 看向
	$gameSystem.drill_LCa_setTouristPosition( $gamePlayer._x, $gamePlayer._y );
	
	// > D自动模式 看向
	$gameSystem.drill_LCa_setLookAtImmediately();
	
	// > 切换地图时恢复默认
	if( DrillUp.g_LCa_resetDefaultInMapSwitch == true ){
		$gameSystem.drill_LCa_doScaleX( DrillUp.g_LCa_defaultScaleX, 1, "匀速变化" );
		$gameSystem.drill_LCa_doScaleY( DrillUp.g_LCa_defaultScaleY, 1, "匀速变化" );
		$gameSystem.drill_LCa_doRotate( DrillUp.g_LCa_defaultRotation, 1, "匀速变化" );
	}
}
//==============================
// * 镜头控制 - 屏蔽函数 设置镜头位置
//==============================
var _drill_LCa_map_setDisplayPos = Game_Map.prototype.setDisplayPos;
Game_Map.prototype.setDisplayPos = function( x, y ){
	
	// > 镜头开启时，屏蔽
	if( $gameSystem.drill_LCa_isEnable() == true ){
		
		// > E观光模式 看向
		$gameSystem.drill_LCa_setTouristPosition( x, y );
		
		// > D自动模式 看向
		$gameSystem.drill_LCa_setLookAtImmediately();
		
		return;
	}
	_drill_LCa_map_setDisplayPos.call( this, x, y );
}
//==============================
// * 镜头控制 - 帧刷新绑定
//==============================
var _drill_LCa_spriteset_update2 = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function(){
	_drill_LCa_spriteset_update2.call(this);
	if( $gameSystem.drill_LCa_isEnable() != true ){ return; }
	this.drill_LCa_updateCameraControl();		//帧刷新 - 镜头控制
};
//==============================
// * 镜头控制 - 帧刷新
//==============================
Spriteset_Map.prototype.drill_LCa_updateCameraControl = function(){
	
	// > 控制器 帧刷新
	$gameSystem._drill_LCa_controller.drill_LCa_update();
	
	// > 控制器 赋值（A主体）
	//		【注意，此处的赋值，将会大幅度影响 在图层内、在图层外 的全部算法关系】
	//		【一定要考虑清楚镜头控制哪些层！下层、中层、上层、图片层、最顶层】
	$gameMap._displayX = $gameSystem._drill_LCa_controller._drill_cameraX_offset;				//镜头基点X（单位图块）
	$gameMap._displayY = $gameSystem._drill_LCa_controller._drill_cameraY_offset;				//镜头基点Y（单位图块）
	this._baseSprite.x = $gameSystem._drill_LCa_controller._drill_x;							//平移X（单位像素）
	this._baseSprite.y = $gameSystem._drill_LCa_controller._drill_y;							//平移X（单位像素）
	this._baseSprite.rotation = $gameSystem._drill_LCa_controller._drill_rotation /180*Math.PI;	//旋转（弧度）
	this._baseSprite.scale.x = $gameSystem._drill_LCa_controller._drill_scaleX;					//缩放X
	this._baseSprite.scale.y = $gameSystem._drill_LCa_controller._drill_scaleY;					//缩放Y
	
	// > 远景 赋值
	//		（需要累加自定义的位移，见函数 Game_Map.prototype.updateParallax）
	if( $gameMap._parallaxLoopX ){
		var parallax_distance = $gameSystem._drill_LCa_controller._drill_curTime * $gameMap._parallaxSx / $gameMap.tileWidth() / 2;
		$gameMap._parallaxX = $gameSystem._drill_LCa_controller._drill_cameraX_offsetAcc + parallax_distance;
	}else{
		$gameMap._parallaxX = $gameSystem._drill_LCa_controller._drill_cameraX_offset;
	}
	if( $gameMap._parallaxLoopY ){
		var parallax_distance = $gameSystem._drill_LCa_controller._drill_curTime * $gameMap._parallaxSy / $gameMap.tileWidth() / 2;
		$gameMap._parallaxY = $gameSystem._drill_LCa_controller._drill_cameraY_offsetAcc + parallax_distance;
	}else{
		$gameMap._parallaxY = $gameSystem._drill_LCa_controller._drill_cameraY_offset;
	}
};


//=============================================================================
// ** 镜头控制器【Drill_LCa_Controller】
// **			
// **		索引：	LCa（可从子插件搜索到函数、类用法）
// **		来源：	独立数据
// **		实例：	> 见当前插件 _drill_LCa_sys_initialize 函数
// **		应用：	> 见当前插件 drill_LCa_updateCameraControl 函数
// **		
// **		作用域：	地图界面、战斗界面、菜单界面
// **		主功能：	> 定义一个专门控制镜头变化的数据类。
// **		子功能：	->控制器
// **						->启用/关闭
// **						->暂停/继续
// **						> 平移
// **						> 旋转
// **						> 缩放
// **					->A主体
// **						> 图层位置x
// **						> 图层位置y
// **						> 图层旋转（单位角度）
// **						> 图层缩放x
// **						> 图层缩放y
// **						->镜头模式
// **							->保持切换时位置
// **							->设置模式【标准函数】
// **							->获取模式【标准函数】
// **						->获取旋转值【标准函数】
// **						->获取缩放X值【标准函数】
// **						->获取缩放Y值【标准函数】
// **						->帧刷新 位置
// **						->校验值
// **					->B镜头架（单位图块）
// **						->设置宽度【标准函数】
// **						->设置高度【标准函数】
// **						->镜头的矩形范围【标准函数】
// **						->镜头架的矩形范围【标准函数】
// **						x->缩放自适应
// **					->C镜头基点
// **						->活动范围
// **						->获取镜头基点偏移位置
// **						->获取镜头变换位置（子贴图用）
// **						->获取镜头变换位置（外部贴图用）
// **						->地图落点 转换（外部贴图 -> 子贴图）
// **						->地图落点 转换（子贴图 -> 外部贴图）
// **						->获取地图鼠标落点（子贴图用）
// **						->获取地图鼠标落点（外部贴图用）【如果还没回忆起 地图落点 与 地图鼠标落点，去看看"Drill插件高级手册.docx"】
// **					->D自动模式
// **						x->设置聚焦位置
// **						->聚焦偏移
// **						->循环积累值 Acc
// **						> 镜头移动模式
// **						> 弹性模式移动速度
// **						> 弹性模式镜头速度上限
// **					->E观光模式
// **						->设置聚焦位置
// **						->循环积累值 Acc
// **						->键盘控制
// **						->鼠标控制
// **					->F固定看向
// **						->固定-自动模式
// **						->固定-观光模式
// **						->立刻看向目标位置
// **					->G叠加变化
// **						->执行旋转【标准函数】
// **						->执行缩放X【标准函数】
// **						->执行缩放Y【标准函数】
// **						->镜头的X 转 缩放后的X【标准函数】
// **						->镜头的X 转 缩放后的Y【标准函数】
// **						->缩放后的X 转 镜头的X【标准函数】
// **						->缩放后的Y 转 镜头的Y【标准函数】
// **					->H整体平移
// **						->游戏坐标X 转 html坐标X 控制
// **						->游戏坐标Y 转 html坐标Y 控制
// **						x->摇晃的镜头？（不稳定的xy平移）
// **					->I滚动地图
// **					->J数学工具
// **						->锁定锚点
// **						->矩阵点的变换
// **						->矩阵点的变换（逆向）
// **					->外部功能
// **						->层级标记器（该类不含）
// **						->镜头墙（该类不含）
// **						->视野触发（该类不含）
// **						->DEBUG镜头对齐框（该类不含）
// **					
// **		说明：	> 该类为单例，并存储在 $gameSystem 中。
// **				> 如果思路没跟上，去看 必要注意事项。
// **				> 可以结合 文档 理解具体功能。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_LCa_Controller(){
	this.initialize.apply(this, arguments);
}
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_LCa_checkNaN = true;
//==============================
// * 控制器 - 常量集合
//
//			说明：	> 留意 此控制器 调用 $gameMap 的细节。（避免写出死循环）
//					  除了以下常量，还有 $gameMap.event、$gameMap.adjustX、$gameMap.adjustY 。
//==============================
Drill_LCa_Controller.prototype.width = function(){ return $gameMap.width(); }
Drill_LCa_Controller.prototype.height = function(){ return $gameMap.height(); }
Drill_LCa_Controller.prototype.tileWidth = function(){ return $gameMap.tileWidth(); }
Drill_LCa_Controller.prototype.tileHeight = function(){ return $gameMap.tileHeight(); }
Drill_LCa_Controller.prototype.isLoopHorizontal = function(){ return $gameMap.isLoopHorizontal(); }
Drill_LCa_Controller.prototype.isLoopVertical = function(){ return $gameMap.isLoopVertical(); }
//==============================
// * 控制器 - 初始化
//==============================
Drill_LCa_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_LCa_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_update = function(){
	
	this._drill_curTime += 1;			//帧刷新 - 时间流逝
	if( this._drill_data['pause'] == true ){ return; }
	
	this.drill_updateAutoMode();		//帧刷新 - D自动模式
	this.drill_updateTouristMode();		//帧刷新 - E观光模式
										//帧刷新 - F固定看向（无）
	
	this.drill_updateRotation();		//帧刷新 - G叠加变化 - 旋转
	this.drill_updateScale();			//帧刷新 - G叠加变化 - 缩放
	this.drill_updateGlobalOffset();	//帧刷新 - H整体平移
	this.drill_updateScroll();			//帧刷新 - I滚动地图
										//帧刷新 - J数学工具（无）
	
	this.drill_updateOffset();			//帧刷新 - C镜头基点
	this.drill_updateOffsetAcc();		//帧刷新 - C镜头基点（循环积累值）
	
	this.drill_updatePosition();		//帧刷新 - A主体 - 位置
	this.drill_updateCheckNaN();		//帧刷新 - A主体 - 校验值
										//帧刷新 - B镜头架（无）
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
Drill_LCa_Controller.prototype.drill_LCa_resetData = function( data ){
	this.drill_LCa_resetData_Private( data );
};
//##############################
// * 控制器 - 立即复原（暂未使用）【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 立即恢复无镜头控制的初始状态。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_restore = function(){
    this.drill_LCa_restore_Private();
}
//##############################
// * 控制器 - 是否启用【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_isEnable = function(){
	if( $gameMap == undefined ){ return false; }	//『$gameSystem优先初始化』
	if( $dataMap == undefined ){ return false; }
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
Drill_LCa_Controller.prototype.drill_LCa_setEnable = function( enable ){
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
Drill_LCa_Controller.prototype.drill_LCa_isPause = function(){
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
Drill_LCa_Controller.prototype.drill_LCa_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};

//##############################
// * A主体 - 镜头模式 - 设置模式【标准函数】
//
//			参数：	> mode 字符串
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setMode = function( mode ){
	this.drill_LCa_setMode_Private( mode );
}
//##############################
// * A主体 - 镜头模式 - 获取模式【标准函数】
//
//			参数：	> 无
//			返回：	> 字符串
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getMode = function(){
	var data = this._drill_data;
	return data['mode'];
}
//##############################
// * A主体 - 获取旋转值【标准函数】
//
//			参数：	> 无
//			返回：	> 数字 （旋转值，单位角度）
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getRotateValue = function(){
    return this._drill_rotation;
}
//##############################
// * A主体 - 获取缩放X值【标准函数】
//
//			参数：	> 无
//			返回：	> 数字 （缩放X）
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getScaleXValue = function(){
    return this._drill_scaleX;
}
//##############################
// * A主体 - 获取缩放Y值【标准函数】
//
//			参数：	> 无
//			返回：	> 数字 （缩放Y）
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getScaleYValue = function(){
    return this._drill_scaleY;
}

//##############################
// * B镜头架 - 设置宽度【标准函数】
//
//			参数：	> width 数字（单位图块）
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setCameraHolderWidth = function( width ){
	var data = this._drill_data;
	data['holderWidth'] = width;
	this.drill_LCa_refreshHolder();
}
//##############################
// * B镜头架 - 设置高度【标准函数】
//
//			参数：	> height 数字（单位图块）
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setCameraHolderHeight = function( height ){
	var data = this._drill_data;
	data['holderHeight'] = height;
	this.drill_LCa_refreshHolder();
}
//##############################
// * B镜头架 - 镜头的矩形范围【标准函数】
//
//			参数：	> 无
//			返回：	> 矩形对象（x,y,宽,高）（单位图块）
//			
//			说明：	> 此函数为基函数，不要放入私有参数，会出现死循环。
//					> 此函数不包含 旋转与缩放 的坐标影响。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getCameraRect = function(){
	var oww = Graphics.boxWidth  / this.tileWidth();
	var ohh = Graphics.boxHeight / this.tileHeight();
	return new Rectangle( 0, 0, oww, ohh );			//（屏幕宽度高度的图块单位）
}
//##############################
// * B镜头架 - 镜头架的矩形范围【标准函数】
//
//			参数：	> 无
//			返回：	> 矩形对象（x,y,宽,高）（单位图块）
//			
//			说明：	> 此函数为基函数，不要放入私有参数，会出现死循环。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getCameraHolderRect = function(){
	return new Rectangle( 0, 0, this.width(), this.height() );
}

//##############################
// * C镜头基点 - 活动范围【标准函数】
//
//			参数：	> 无
//			返回：	> 矩形对象（x,y,宽,高）（单位图块）
//			
//			说明：	> 镜头基点（左上角锚点）的活动范围。与地图是否循环相关。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getCameraPosRange = function(){
	return new Rectangle( this._drill_holderX, this._drill_holderY, this._drill_holderMaxX-this._drill_holderX, this._drill_holderMaxY-this._drill_holderY );
}
//##############################
// * C镜头基点 - 获取镜头基点偏移位置【标准函数】
//
//			参数：	> 无
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 此函数返回 活动范围内 的偏移量。
//					> 此函数不包含 旋转与缩放 的坐标影响。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getCameraPosOffset = function(){
	return {'x': this._drill_cameraX_offset, 'y': this._drill_cameraY_offset };
}
//##############################
// * C镜头基点 - 获取镜头变换位置（子贴图用）【标准函数】
//
//			参数：	> 无
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 【应用场景】：此函数适用于 下层、中层、上层 的贴图对象。
//					  直接减去 返回值 即可实现贴图与镜头同步。
//					> 此函数已包含 旋转与缩放 的坐标影响。
//					> 子贴图不需考虑 旋转与缩放 贴图变化的影响。
//					> 使用方法可以见后面函数：drill_LCa_DEBUG_updateSpriteCameraPos
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getCameraPos_Children = function(){
	//（如果此处思路没跟上，去看 必要注意事项 ）
	return {'x': this._drill_cameraX_Children, 'y': this._drill_cameraY_Children };
}
//##############################
// * C镜头基点 - 获取镜头变换位置（外部贴图用）【标准函数】
//
//			参数：	> cur_x 数字 （外部贴图的位置X）（单位像素）
//					> cur_y 数字 （外部贴图的位置Y）（单位像素）
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 【应用场景】：此函数适用于 图片层、最顶层 的贴图对象。
//					  由于外部贴图一般都是 图片、UI。
//					  而这些贴图可以选择【不移动】，直接贴在镜头上，因此对于UI、图片，可能用不上。
//					> 此函数已包含 旋转与缩放 的坐标影响。
//					> 外部贴图需要考虑 旋转与缩放 贴图变化的影响。
//					> 使用方法可以见后面函数：drill_LCa_DEBUG_updateSpriteCameraPos
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getCameraPos_OuterSprite = function( cur_x, cur_y ){
	//（如果此处思路没跟上，去看 必要注意事项 ）
	return this.drill_LCa_getCameraPos_OuterSprite_Private( cur_x, cur_y );
}
//##############################
// * C镜头基点 - 地图落点 转换（外部贴图 -> 子贴图）【标准函数】
//
//			参数：	> 坐标对象（x,y）（单位像素）
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 此函数适用于 图片层、最顶层 的坐标，落到 上层、中层、下层 的坐标。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getPos_OuterToChildren = function( x, y ){
	return this.drill_LCa_getPos_OuterToChildren_Private( x, y );
}
//##############################
// * C镜头基点 - 地图落点 转换（子贴图 -> 外部贴图）【标准函数】
//
//			参数：	> 坐标对象（x,y）（单位像素）
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 此函数适用于 上层、中层、下层 的坐标，落到 图片层、最顶层 的坐标。
//					> 注意 地图鼠标落点 不要 调用此函数，因为鼠标一直就处于外部贴图。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getPos_ChildrenToOuter = function( x, y ){
	return this.drill_LCa_getPos_ChildrenToOuter_Private( x, y );
}
//##############################
// * C镜头基点 - 获取地图鼠标落点（子贴图用）【标准函数】
//
//			参数：	无
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 此函数适用于 下层、中层、上层 的贴图对象，获取到鼠标的 地图落点 。不含触屏情况。
//					> 使用方法可以见后面函数：drill_LCa_DEBUG_updateMousePosition
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getMousePos_OnChildren = function(){
	return this._drill_mousePos_OnChildren;
}
//##############################
// * C镜头基点 - 获取地图鼠标落点（外部贴图用）【标准函数】
//
//			参数：	无
//			返回：	> 坐标对象（x,y）（单位像素）
//			
//			说明：	> 此函数适用于 图片层、最顶层 的贴图对象，获取到鼠标的 地图落点 。不含触屏情况。
//					> 使用方法可以见后面函数：drill_LCa_DEBUG_updateMousePosition
//					> 其实此方法就是直接 赋值 _drill_mouse_x ，但考虑到标准化，因此最好考虑情况并调用此函数。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_getMousePos_OnOuterSprite = function(){
	return this._drill_mousePos_OnOuterSprite;
}

//##############################
// * D自动模式 - 设置聚焦位置【标准函数】
//
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//
//			说明：	此函数为战斗镜头专用。此函数不能放在帧刷新中使用，需要缓冲时间。
//##############################
//Drill_LCa_Controller.prototype.drill_LCa_setAutoPosition = function( x, y ){
//	//（无此函数）
//}
//##############################
// * D自动模式 - 修改聚焦偏移【标准函数】
//
//			参数：	> autoOffsetX 数字  （聚焦偏移X）
//					> autoOffsetY 数字  （聚焦偏移Y）
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setAutoOffset = function( autoOffsetX, autoOffsetY ){
    this.drill_LCa_setAutoOffset_Private( autoOffsetX, autoOffsetY );
}
//##############################
// * E观光模式 - 设置聚焦位置【标准函数】
//
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//
//			说明：	> 设置后，将会覆盖 当前位置。如果是临时看向然后返回，用"固定看向位置"。
//					> 注意，默认镜头的【左上角会对齐到该点】，你需要考虑 镜头中心点 修正。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setTouristPosition = function( x, y ){
	this._drill_tourist_curXAcc = x;
	this._drill_tourist_curYAcc = y;
}
//##############################
// * F固定看向 - 固定看向位置【标准函数】
//
//			参数：	> x 数字
//					> y 数字
//			返回：	> 无
//
//			说明：	坐标值为 地图的图块 。
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setLockPosition = function( x, y ){
	this.drill_LCa_setLockPosition_Private( x, y );
}
//##############################
// * F固定看向 - 固定看向事件【标准函数】
//
//			参数：	> event_id 数字
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setLockEvent = function( event_id ){
	this.drill_LCa_setLockEvent_Private( event_id );
}
//##############################
// * F固定看向 - 固定多个事件的中心【标准函数】
//
//			参数：	> event_id_list 数字列表
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setLockEventList = function( event_id_list ){
	this.drill_LCa_setLockEventList_Private( event_id_list );
}
//##############################
// * F固定看向 - 解除固定看向【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setUnlock = function(){
	this.drill_LCa_setUnlock_Private();
	this._drill_lockPos = false;
}
//##############################
// * F固定看向 - 立刻看向目标位置【标准函数】
//
//			参数：	> 无
//			返回：	> 无
//==============================
Drill_LCa_Controller.prototype.drill_LCa_setLookAtImmediately = function(){
	this.drill_LCa_setLookAtImmediately_Private();
}

//##############################
// * G叠加变化 - 执行旋转【标准函数】
//
//			参数：	> rotation 数字    （旋转值，单位角度）
//					> time 数字        （时长）
//					> changeType 字符串（匀速变化/弹性变化/增减速变化）
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_doRotate = function( rotation, time, changeType ){
    this.drill_LCa_doRotate_Private( rotation, time, changeType );
}
//##############################
// * G叠加变化 - 执行缩放X【标准函数】
//
//			参数：	> scaleX 数字      （缩放X）
//					> time 数字        （时长）
//					> changeType 字符串（匀速变化/弹性变化/增减速变化）
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_doScaleX = function( scaleX, time, changeType ){
    this.drill_LCa_doScaleX_Private( scaleX, time, changeType );
}
//##############################
// * G叠加变化 - 执行缩放Y【标准函数】
//
//			参数：	> scaleY 数字      （缩放Y）
//					> time 数字        （时长）
//					> changeType 字符串（匀速变化/弹性变化/增减速变化）
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_doScaleY = function( scaleY, time, changeType ){
    this.drill_LCa_doScaleY_Private( scaleY, time, changeType );
}
//##############################
// * G叠加变化 - 镜头的X 转 缩放后的X【标准函数】
//
//			参数：	> x 数字   （贴图的X）
//			返回：	> 数字
//##############################
Drill_LCa_Controller.prototype.drill_LCa_cameraToMapX = function( x ){
	x = x / this._drill_scaleX;
	x -= (Graphics.boxWidth / this._drill_scaleX - Graphics.boxWidth)/2;
	return Math.round(x);
}
//##############################
// * G叠加变化 - 镜头的X 转 缩放后的Y【标准函数】
//
//			参数：	> y 数字   （贴图的Y）
//			返回：	> 数字
//##############################
Drill_LCa_Controller.prototype.drill_LCa_cameraToMapY = function( y ){
	y = y / this._drill_scaleY;
	y -= (Graphics.boxHeight / this._drill_scaleY - Graphics.boxHeight)/2;
	return Math.round(y);
}
//##############################
// * G叠加变化 - 缩放后的X 转 镜头的X【标准函数】
//
//			参数：	> x 数字   （贴图的X）
//			返回：	> 数字
//##############################
Drill_LCa_Controller.prototype.drill_LCa_mapToCameraX = function( x ){
	x += (Graphics.boxWidth / this._drill_scaleX - Graphics.boxWidth)/2;
	x = x * this._drill_scaleX;;
	return Math.round(x);
}
//##############################
// * G叠加变化 - 缩放后的Y 转 镜头的Y【标准函数】
//
//			参数：	> y 数字   （贴图的Y）
//			返回：	> 数字
//##############################
Drill_LCa_Controller.prototype.drill_LCa_mapToCameraY = function( y ){
	y += (Graphics.boxHeight / this._drill_scaleY - Graphics.boxHeight)/2;
	y = y * this._drill_scaleY;
	return Math.round(y);
}

//##############################
// * H整体平移 - 修改整体平移【标准函数】
//
//			参数：	> globalOffsetX 数字（整体平移X）
//					> globalOffsetY 数字（整体平移Y）
//					> time 数字         （时长）
//					> changeType 字符串 （匀速移动/弹性移动/增减速移动）
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setGlobalOffset = function( globalOffsetX, globalOffsetY, time, changeType ){
    this.drill_LCa_setGlobalOffset_Private( globalOffsetX, globalOffsetY, time, changeType );
}
//##############################
// * H整体平移 - 边缘遮挡层 开启/关闭【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setGlobalBarrierLayerEnabled = function( enable ){
    var data = this._drill_data;
	data['globalBarrierLayerEnabled'] = enable;
}
//##############################
// * H整体平移 - 边缘遮挡层 修改颜色【标准函数】
//
//			参数：	> color 字符串 （颜色）
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_setGlobalBarrierLayerColor = function( color ){
    var data = this._drill_data;
	data['globalBarrierLayerColor'] = color;
}

//##############################
// * I滚动地图 - 开始滚动【标准函数】
//
//			参数：	> direction 数字 （方向 8/2/4/6 或 1/3/7/9 ）
//					> distance 数字  （图块距离）
//					> speed 数字     （速度 1/2/3/4/5/6 ）
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_scrollToTarget = function( direction, distance, speed ){
	this.drill_LCa_scrollToTarget_Private( direction, distance, speed );
}
//##############################
// * I滚动地图 - 判断滚动状态【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_LCa_Controller.prototype.drill_LCa_isScrolling = function(){
	return this._drill_scrollOffset_curTime < this._drill_scrollOffset_tarTime;
}
//##############################
// * I滚动地图 - 回到原位置【标准函数】
//
//			参数：	> speed 数字
//			返回：	> 无
//##############################
Drill_LCa_Controller.prototype.drill_LCa_scrollToHome = function( speed ){
	this.drill_LCa_scrollToHome_Private( speed );
	
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
Drill_LCa_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 控制器
	if( data['enable'] == undefined ){ data['enable'] = true };											//启用情况
	if( data['pause'] == undefined ){ data['pause'] = false };											//暂停情况
	
	// > A主体
	if( data['mode'] == undefined ){ data['mode'] = "自动模式" };										//A主体 - 镜头模式
	
	// > B镜头架
	if( data['holderWidth'] == undefined ){ data['holderWidth'] = 17 };									//B镜头架 - 宽度
	if( data['holderHeight'] == undefined ){ data['holderHeight'] = 13 };								//B镜头架 - 高度
	
	// > C镜头基点（无）
	
	// > D自动模式
	if( data['autoOffsetX'] == undefined ){ data['autoOffsetX'] = 0 };									//D自动模式 - 聚焦偏移X
	if( data['autoOffsetY'] == undefined ){ data['autoOffsetY'] = 0 };									//D自动模式 - 聚焦偏移Y
	if( data['autoMoveType'] == undefined ){ data['autoMoveType'] = "弹性移动" };						//D自动模式 - 镜头移动模式
	if( data['autoSpeedRatio'] == undefined ){ data['autoSpeedRatio'] = 10 };							//D自动模式 - 弹性模式移动速度
	if( data['autoSpeedMax'] == undefined ){ data['autoSpeedMax'] = 24 };								//D自动模式 - 弹性模式镜头速度上限	
	
	// > E观光模式
	if( data['touristKeyboardEnabled'] == undefined ){ data['touristKeyboardEnabled'] = true };			//E观光模式 - 是否启用键盘操作
	if( data['touristMouseEnabled'] == undefined ){ data['touristMouseEnabled'] = true };				//E观光模式 - 是否启用鼠标操作
	if( data['touristMouseThickness'] == undefined ){ data['touristMouseThickness'] = 40 };				//E观光模式 - 鼠标触发区域的厚度
	if( data['touristSpeed'] == undefined ){ data['touristSpeed'] = 0.5 };								//E观光模式 - 镜头移动速度
	
	// > G叠加变化
	if( data['defaultRotation'] == undefined ){ data['defaultRotation'] = 0 };							//G叠加变化 - 默认旋转角度
	if( data['defaultScaleX'] == undefined ){ data['defaultScaleX'] = 1.0 };							//G叠加变化 - 默认X缩放比例
	if( data['defaultScaleY'] == undefined ){ data['defaultScaleY'] = 1.0 };							//G叠加变化 - 默认Y缩放比例
	
	// > H整体平移
	if( data['globalOffsetX'] == undefined ){ data['globalOffsetX'] = 0 };								//H整体平移 - 整体平移X
	if( data['globalOffsetY'] == undefined ){ data['globalOffsetY'] = 0 };								//H整体平移 - 整体平移Y
	if( data['globalBarrierLayerEnabled'] == undefined ){ data['globalBarrierLayerEnabled'] = true };	//H整体平移 - 边缘遮挡层 - 开关
	if( data['globalBarrierLayerColor'] == undefined ){ data['globalBarrierLayerColor'] = 0 };			//H整体平移 - 边缘遮挡层 - 颜色
	
	// > I滚动地图（无）
	
	// > J数学工具（无）
	
}
//==============================
// * 控制器 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();			//初始化子功能 - A主体
	this.drill_controller_initHolder();			//初始化子功能 - B镜头架
	this.drill_controller_initCameraPos();		//初始化子功能 - C镜头基点
	this.drill_controller_initAuto();			//初始化子功能 - D自动模式
	this.drill_controller_initTourist();		//初始化子功能 - E观光模式
	this.drill_controller_initLock();			//初始化子功能 - F固定看向
	this.drill_controller_initChange();			//初始化子功能 - G叠加变化
	this.drill_controller_initGlobalOffset();	//初始化子功能 - H整体平移
	this.drill_controller_initScroll();			//初始化子功能 - I滚动地图
	this.drill_controller_initMath();			//初始化子功能 - J数学工具
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_LCa_Controller.prototype.drill_LCa_resetData_Private = function( data ){
	
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
// * 控制器 - 立即复原（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_restore_Private = function(){
	//...
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initAttr = function(){
	
	this._drill_curTime = 0;				//A主体 - 当前时间进度
	this._drill_needDestroy = false;		//A主体 - 销毁标记（暂未用到）
	
	this._drill_x = 0;						//A主体 - 图层位置x（直接赋值 $gameMap._displayX ）
	this._drill_y = 0;						//A主体 - 图层位置y（直接赋值 $gameMap._displayY ）
	this._drill_rotation = 0;				//A主体 - 图层旋转（单位角度）
	this._drill_scaleX = 1;					//A主体 - 图层缩放x
	this._drill_scaleY = 1;					//A主体 - 图层缩放y
}
//==============================
// * A主体 - 设置模式（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_setMode_Private = function( mode ){
	var data = this._drill_data;
	
	// > 保持切换时位置 - 记录位置
	var last_x = 0;
	var last_y = 0;
	if( data['mode'] == "自动模式" ){
		last_x = this._drill_autoPos_curXAcc;
		last_y = this._drill_autoPos_curYAcc;
	}
	if( data['mode'] == "观光模式" ){
		last_x = this._drill_tourist_curXAcc;
		last_y = this._drill_tourist_curYAcc;
	}
	
	// > 设置模式
	if( mode == "自动模式" ){ data['mode'] = "自动模式"; }
	if( mode == "观光模式" ){ data['mode'] = "观光模式"; }
	
	// > 保持切换时位置 - 位置赋值
	if( data['mode'] == "自动模式" ){
		this._drill_autoPos_curXAcc = last_x;
		this._drill_autoPos_curYAcc = last_y;
	}
	if( data['mode'] == "观光模式" ){
		this._drill_tourist_curXAcc = last_x;
		this._drill_tourist_curYAcc = last_y;
	}
}
//==============================
// * A主体 - 帧刷新 位置
//==============================
Drill_LCa_Controller.prototype.drill_updatePosition = function(){
	var data = this._drill_data;
	
	// > 平移（单位像素）
	this._drill_x = 0;
	this._drill_y = 0;
	if( data['enable'] == false ){ return; }
	
	
	//（此平移不包含 C镜头基点 情况）
	
	
	// > 坐标再反转
	if( this._drill_scaleX < 0 ){ this._drill_x *= -1; }
	if( this._drill_scaleY < 0 ){ this._drill_y *= -1; }
	var ro = (this._drill_rotation%360 + 360)%360;
	if( ro > 90 && ro < 270 ){
		this._drill_x *= -1;
		this._drill_y *= -1;
	}
	
	// > G叠加变化 - 锁定锚点
	if( this._drill_rotation == 0 && this._drill_scaleX == 1 && this._drill_scaleY == 1 ){
		//（不操作）
	}else{
		// > 锚点(0.5,0.5)锁定
		var fix_point = $gameTemp.drill_LCa_Math2D_getFixPointInAnchor( 
							0.0, 0.0, 
							0.5, 0.5, 
							Graphics.boxWidth, Graphics.boxHeight,
							this._drill_rotation /180*Math.PI, 
							this._drill_scaleX, this._drill_scaleY 
						);
		this._drill_x += fix_point.x;
		this._drill_y += fix_point.y;
	}
	
	// > H整体平移
	this._drill_x += this._drill_globalOffsetX;
	this._drill_y += this._drill_globalOffsetY;
}
//==============================
// * A主体 - 帧刷新 校验值
//==============================
Drill_LCa_Controller.prototype.drill_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_LCa_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_LCa_checkNaN = false;
			alert( DrillUp.drill_LCa_getPluginTip_ParamIsNaN("_drill_x") );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_LCa_checkNaN = false;
			alert( DrillUp.drill_LCa_getPluginTip_ParamIsNaN("_drill_y") );
		}
		if( isNaN( this._drill_rotation ) ){
			DrillUp.g_LCa_checkNaN = false;
			alert( DrillUp.drill_LCa_getPluginTip_ParamIsNaN("_drill_rotation") );
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_LCa_checkNaN = false;
			alert( DrillUp.drill_LCa_getPluginTip_ParamIsNaN("_drill_scaleX") );
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_LCa_checkNaN = false;
			alert( DrillUp.drill_LCa_getPluginTip_ParamIsNaN("_drill_scaleY") );
		}
	}
}


//==============================
// * B镜头架 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initHolder = function(){
	//（无）
}
//==============================
// * B镜头架 - 刷新范围
//
//			说明：	> 此函数不能放在初始化中执行，因为那个时候 $gameMap 还没创建。『$gameSystem优先初始化』
//==============================
Drill_LCa_Controller.prototype.drill_LCa_refreshHolder = function(){
	var holder_rect = this.drill_LCa_getCameraHolderRect();
	var camera_rect = this.drill_LCa_getCameraRect();
	
	// > 镜头基点的活动范围
	//   （横向循环时，矩形全开放）
	if( this.isLoopHorizontal() ){
		this._drill_holderX = holder_rect['x'];
		this._drill_holderMaxX = holder_rect['x'] + holder_rect['width'];
	//   （不循环时，范围受限）
	}else{
		this._drill_holderX = holder_rect['x'];
		this._drill_holderMaxX = holder_rect['x'] + holder_rect['width'] - camera_rect['width'];
	}
	//   （纵向循环时，矩形全开放）
	if( this.isLoopVertical() ){
		this._drill_holderY = holder_rect['y'];
		this._drill_holderMaxY = holder_rect['y'] + holder_rect['height'];
	//   （不循环时，范围受限）
	}else{
		this._drill_holderY = holder_rect['y'];
		this._drill_holderMaxY = holder_rect['y'] + holder_rect['height'] - camera_rect['height'];
	}
	
	// > 镜头架比镜头还小情况（范围固定为一个负数的值）
	if( holder_rect['width'] < camera_rect['width'] ){
		this._drill_holderX = (holder_rect['width'] - camera_rect['width']) *0.5;
		this._drill_holderMaxX = this._drill_holderX;
	}
	if( holder_rect['height'] < camera_rect['height'] ){
		this._drill_holderY = (holder_rect['height'] - camera_rect['height']) *0.5;
		this._drill_holderMaxY = this._drill_holderY;
	}
	
	// > 清零
	this.drill_clearAutoData();
	this.drill_clearTouristData();
}
//==============================
// * B镜头架 - 获取范围内的位置X（开放函数）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_getXInHolder = function( x ){
	
	// > 横向循环时，取模
	if( this.isLoopHorizontal() ){
		return this.drill_mod( x, this._drill_holderMaxX );
		
	// > 不循环时，固定
	}else{
		if( x > this._drill_holderMaxX ){ return this._drill_holderMaxX; }
		if( x < this._drill_holderX ){ return this._drill_holderX; }
	}
	return x;
}
//==============================
// * B镜头架 - 获取范围内的位置Y（开放函数）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_getYInHolder = function( y ){
	
	// > 横向循环时，取模
	if( this.isLoopVertical() ){
		return this.drill_mod( y, this._drill_holderMaxY );
		
	// > 不循环时，固定
	}else{
		if( y > this._drill_holderMaxY ){ return this._drill_holderMaxY; }
		if( y < this._drill_holderY ){ return this._drill_holderY; }
	}
	return y;
}
//==============================
// * B镜头架 - 正值取模
//
//			说明：	取模后一定为正数。
//==============================
Drill_LCa_Controller.prototype.drill_mod = function( n, m ){
    return ((n % m) + m) % m;
}
//==============================
// * B镜头架 - 镜头中心点X（开放函数）
//==============================
Drill_LCa_Controller.prototype.drill_centerXOffset = function(){
	var camera_rect = this.drill_LCa_getCameraRect();
    return camera_rect['width']*0.5;
};
//==============================
// * B镜头架 - 镜头中心点Y（开放函数）
//==============================
Drill_LCa_Controller.prototype.drill_centerYOffset = function(){
	var camera_rect = this.drill_LCa_getCameraRect();
    return camera_rect['height']*0.5;
};


//==============================
// * C镜头基点 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initCameraPos = function(){
	this._drill_cameraX_offset = 0;			//C镜头基点 - 位置x
	this._drill_cameraY_offset = 0;			//C镜头基点 - 位置y
	this._drill_cameraX_offsetAcc = 0;		//C镜头基点 - 位置x（循环积累值）
	this._drill_cameraY_offsetAcc = 0;		//C镜头基点 - 位置y（循环积累值）
	this._drill_cameraX_Children = 0;		//C镜头基点 - 变换位置x（子贴图用）
	this._drill_cameraY_Children = 0;		//C镜头基点 - 变换位置y（子贴图用）
	this._drill_mousePos_OnChildren = 0;	//C镜头基点 - 地图鼠标落点（子贴图用）
	this._drill_mousePos_OnOuterSprite = 0;	//C镜头基点 - 地图鼠标落点（外部贴图用）
}
//==============================
// * C镜头基点 - 获取镜头变换位置（子贴图用）（私有）
//
//			说明：	为防止调用太多增加计算负担，此函数每帧执行一次，将结果放在参数中。
//==============================
Drill_LCa_Controller.prototype.drill_LCa_updateCameraPos_Children = function(){
    
	// > 镜头偏移量
	var ox = 0;
	var oy = 0;
	var rect_width = Graphics.boxWidth;
	var rect_height = Graphics.boxHeight;
	
	// > 镜头变化时的矩阵偏移量（正向变换）
	var point_a = $gameTemp.drill_LCa_Math2D_getPointWithTransform( 
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
	var point_b = $gameTemp.drill_LCa_Math2D_getPointWithTransformInversed( 
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
	
	// > H整体平移 的影响
	ox -= this._drill_globalOffsetX;
	oy -= this._drill_globalOffsetY;
	
	this._drill_cameraX_Children = ox;
	this._drill_cameraY_Children = oy;
}
//==============================
// * C镜头基点 - 获取镜头变换位置（外部贴图用）（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_getCameraPos_OuterSprite_Private = function( cur_x, cur_y ){
	
	// > 直接执行一次正向变换即可
	var outer_point = $gameTemp.drill_LCa_Math2D_getPointWithTransform( 
							cur_x, cur_y,
							Graphics.boxWidth*0.5, Graphics.boxHeight*0.5,
							this._drill_rotation /180*Math.PI, 
							this._drill_scaleX, this._drill_scaleY 
					  );
	
	// > H整体平移 的影响
	outer_point.x = outer_point.x + this._drill_globalOffsetX;
	outer_point.y = outer_point.y + this._drill_globalOffsetY;
	
	return outer_point;
}
//==============================
// * C镜头基点 - 地图落点 转换（外部贴图 -> 子贴图）（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_getPos_OuterToChildren_Private = function( x, y ){
	var xx = x;
	var yy = y;
	var rect_width = Graphics.boxWidth*1.5;
	var rect_height = Graphics.boxHeight*1.5;
	
	// > 镜头变化时的矩阵偏移量（正向变换）
	var point_a = $gameTemp.drill_LCa_Math2D_getPointWithTransform( 
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
	var point_b = $gameTemp.drill_LCa_Math2D_getPointWithTransformInversed( 
						xx, yy,
						Graphics.boxWidth*0.5, Graphics.boxHeight*0.5,
						this._drill_rotation /180*Math.PI, 
						this._drill_scaleX, this._drill_scaleY 
				);
	xx = point_b.x;
	yy = point_b.y;
	
	// > 镜头变换位置
	//（不含）
	
	// > H整体平移 的影响
	xx -= this._drill_globalOffsetX;
	yy -= this._drill_globalOffsetY;
	
	return { 'x':xx, 'y':yy };
}
//==============================
// * C镜头基点 - 地图落点 转换（子贴图 -> 外部贴图）（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_getPos_ChildrenToOuter_Private = function( x, y ){
	var xx = x;
	var yy = y;
	
	// > 直接执行一次正向变换即可
	var outer_point = $gameTemp.drill_LCa_Math2D_getPointWithTransform( 
							xx, yy,
							Graphics.boxWidth*0.5, Graphics.boxHeight*0.5,
							this._drill_rotation /180*Math.PI, 
							this._drill_scaleX, this._drill_scaleY 
					  );
	
	// > H整体平移 的影响
	outer_point.x = outer_point.x + this._drill_globalOffsetX;
	outer_point.y = outer_point.y + this._drill_globalOffsetY;
	
	return outer_point;
}
//==============================
// * C镜头基点 - 获取地图鼠标落点（子贴图用）（私有）
//
//			说明：	> 为防止调用太多增加计算负担，此函数每帧执行一次，将结果放在参数中。
//					> 地图鼠标落点 就是 鼠标位置+地图落点 转换。
//==============================
Drill_LCa_Controller.prototype.drill_LCa_updateMousePos_OnChildren = function(){
	var xx = _drill_mouse_x;
	var yy = _drill_mouse_y;
	this._drill_mousePos_OnChildren = this.drill_LCa_getPos_OuterToChildren_Private( xx, yy );
}
//==============================
// * C镜头基点 - 获取地图鼠标落点（外部贴图用）（私有）
//
//			说明：	> 为防止调用太多增加计算负担，此函数每帧执行一次，将结果放在参数中。
//					> 由于是外部贴图，地图鼠标落点 不转换。
//==============================
Drill_LCa_Controller.prototype.drill_LCa_updateMousePos_OnOuterSprite = function(){
	var xx = _drill_mouse_x;
	var yy = _drill_mouse_y;
	this._drill_mousePos_OnOuterSprite = {'x': xx, 'y': yy };
}
//==============================
// * C镜头基点 - 帧刷新
//==============================
Drill_LCa_Controller.prototype.drill_updateOffset = function(){
	var data = this._drill_data;
	
	// > 镜头基点（单位图块）
	var xx = 0;
	var yy = 0;
	if( data['enable'] == false ){ return; }
	
	
	// > D自动模式 位移
	if( data['mode'] == "自动模式" ){
		xx += this._drill_autoPos_curX;
		yy += this._drill_autoPos_curY;
	}
	// > E观光模式 位移
	if( data['mode'] == "观光模式" ){
		xx += this._drill_tourist_curX;
		yy += this._drill_tourist_curY;
	}
	
	
	// > 镜头基点 - 记录
	this._drill_cameraX_offset = xx;
	this._drill_cameraY_offset = yy;
	
	// > 镜头基点 - 变换位置刷新
	this.drill_LCa_updateCameraPos_Children();
	this.drill_LCa_updateMousePos_OnChildren();
	this.drill_LCa_updateMousePos_OnOuterSprite();
}
//==============================
// * C镜头基点 - 帧刷新（循环积累值）
//
//			说明：	积累值是指，在循环地图中多次向一个方向移动，所处在的位移位置。
//					该位置在镜头中会通过取余而折叠起来，但是也有不需要折叠的情况。比如地图魔法圈。
//==============================
Drill_LCa_Controller.prototype.drill_updateOffsetAcc = function(){
	var data = this._drill_data;
	
	// > 镜头基点（单位图块）
	var xxAcc = 0;
	var yyAcc = 0;
	if( data['enable'] == false ){ return; }
	
	
	// > D自动模式 位移
	if( data['mode'] == "自动模式" ){
		xxAcc += this._drill_autoPos_curXAcc;
		yyAcc += this._drill_autoPos_curYAcc;
	}
	// > E观光模式 位移
	if( data['mode'] == "观光模式" ){
		xxAcc += this._drill_tourist_curXAcc;
		yyAcc += this._drill_tourist_curYAcc;
	}
	
	
	// > 镜头基点 - 记录（循环积累值）
	this._drill_cameraX_offsetAcc = xxAcc;
	this._drill_cameraY_offsetAcc = yyAcc;
}


//==============================
// * D自动模式 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initAuto = function(){
	this._drill_autoPos_curX = 0;			//D自动模式 - 当前位置x
	this._drill_autoPos_curY = 0;			//D自动模式 - 当前位置y
	this._drill_autoPos_curXAcc = 0;		//D自动模式 - 当前位置x（循环积累值）
	this._drill_autoPos_curYAcc = 0;		//D自动模式 - 当前位置y（循环积累值）
	this._drill_autoPos_pixelFix_x = 0;		//D自动模式 - 像素修正值x
	this._drill_autoPos_pixelFix_y = 0;		//D自动模式 - 像素修正值y
}
//==============================
// * D自动模式 - 清理数据
//==============================
Drill_LCa_Controller.prototype.drill_clearAutoData = function(){
	this._drill_autoPos_curX = 0;			//D自动模式 - 当前位置x
	this._drill_autoPos_curY = 0;			//D自动模式 - 当前位置y
	this._drill_autoPos_curXAcc = 0;		//D自动模式 - 当前位置x（积累值）
	this._drill_autoPos_curYAcc = 0;		//D自动模式 - 当前位置y（积累值）
};
//==============================
// * D自动模式 - 获取镜头目标位置
//
//			说明：	注意，返回值 未经过 adjust镜头相对位置 和 循环 修正。
//==============================
Drill_LCa_Controller.prototype.drill_getAutoPosition = function(){
	
	// > 默认为玩家位置
    var tar_x = $gamePlayer._realX;
    var tar_y = $gamePlayer._realY;
	
	// > F固定看向（自动模式）
	if( this._drill_lockPos == true ){
		
		if( this._drill_lockPos_type == "位置" ){
			tar_x = this._drill_lockPos_x;
			tar_y = this._drill_lockPos_y;
		}
		if( this._drill_lockPos_type == "事件" ){
			var xxx = 0;
			var yyy = 0;
			for(var i = this._drill_lockPos_eventIdList.length-1; i >= 0; i-- ){
				var e_id = this._drill_lockPos_eventIdList[i];
				var e = $gameMap.event( e_id );
				if( e == undefined ){	//（如果设置了多事件看向，而事件被销毁，则立即取消此事件的绑定）
					this._drill_lockPos_eventIdList.splice(i,1);
					continue;
				}
				xxx += e._realX;
				yyy += e._realY;
			}
			if( this._drill_lockPos_eventIdList.length > 0 ){
				xxx = xxx / this._drill_lockPos_eventIdList.length;
				yyy = yyy / this._drill_lockPos_eventIdList.length;
				tar_x = xxx;
				tar_y = yyy;
			}
		}
		
	}
	
	// > 对齐至 镜头中心
	tar_x -= this.drill_centerXOffset();
	tar_y -= this.drill_centerYOffset();
	
	// > 所有图块 都偏差半个图块 作为镜头看向的位置
	tar_x += 0.5;
	tar_y += 0.5;
	
	return { 'x': tar_x, 'y': tar_y };
};
//==============================
// * D自动模式 - 帧刷新
//==============================
Drill_LCa_Controller.prototype.drill_updateAutoMode = function(){
	var data = this._drill_data;
	if( data['mode'] != "自动模式" ){ return; }
	
	// > 移动累积
	this.drill_updateAutoMode_posAccumulate();
	
	// > B镜头架 位置修正
	this.drill_updateAutoMode_fixPosInHolder();
};
//==============================
// * D自动模式 - 帧刷新（循环积累值）
//==============================
Drill_LCa_Controller.prototype.drill_updateAutoMode_posAccumulate = function(){
	var data = this._drill_data;
	
	// > 立刻看向目标位置 阻塞
	if( this._drill_autoPos_notRefreshAccNextFrame == true ){
		this._drill_autoPos_notRefreshAccNextFrame = false;
		return;
	}
	
	
	// > 镜头目标位置
	var tar_pos = this.drill_getAutoPosition();
	var x2 = tar_pos.x;
	var y2 = tar_pos.y;
	
	
	// > 聚焦偏移
	x2 += data['autoOffsetX'] / this.tileWidth();
	y2 += data['autoOffsetY'] / this.tileHeight();
	
	// > I滚动地图
	x2 += this._drill_scrollOffsetX;
	y2 += this._drill_scrollOffsetY;
	
	
	// > 匀速移动
	if( data['autoMoveType'] == "匀速移动" ){
		this._drill_autoPos_curXAcc = x2;
		this._drill_autoPos_curYAcc = y2;
		return;
	}
	
	
	// > 弹性移动
	var speedRatio_x = data['autoSpeedRatio'] ;
	var speedRatio_y = data['autoSpeedRatio'] ;
	var pixel_speedPlus = 1 / 1000000;	//手动误差值
	
	// > 弹性移动 - 切换到相对镜头位置
	//		（注意，adjustX 包含了对 _displayX、_displayY 的处理，具体去看看函数本身）
	var tar_x = $gameMap.adjustX( x2 );
	var tar_y = $gameMap.adjustY( y2 );
	
	// > 弹性移动 - 切换到相对镜头位置（全展开形式）
	//		（如果玩家的位移跨度有点大，可能会绕镜头一圈，然后再回来）
	//var tar_x = 0;
	//var tar_y = 0;
	//var half_width  = ($gameMap.width()  - $gameMap.screenTileX()) *0.5;
	//var half_height = ($gameMap.height() - $gameMap.screenTileY()) *0.5;
	//if( $gameMap.isLoopHorizontal() ){
	//	if( half_width < $gameMap._displayX - x2 ){
	//		tar_x = x2 - $gameMap._displayX + $dataMap.width;
	//	}else{
	//		tar_x = x2 - $gameMap._displayX;
	//	}
	//}else{
	//	tar_x = x2 - $gameMap._displayX;
	//}
	//if( $gameMap.isLoopVertical() ){
	//	if( half_height < $gameMap._displayY - y2 ){
	//		tar_y = y2 - $gameMap._displayY + $dataMap.height;
	//	}else{
	//		tar_y = y2 - $gameMap._displayY;
	//	}
	//}else{
	//	tar_y = y2 - $gameMap._displayY;
	//}
	
	// > 弹性移动 - 向下
    if( tar_y > 0 ){
		var distance = Math.abs(tar_y);
		var pixel_distance = distance * this.tileHeight();									//像素距离
		var pixel_speed = Math.min(pixel_distance/speedRatio_y, data['autoSpeedMax'] );		//像素速度
		if( pixel_speed < 0.25 ){ pixel_speed = 0.25; }										//像素最小速度（1/4像素）
		
		if( pixel_distance < pixel_speed ){						//第一次收敛（最小收敛间距）
			this._drill_autoPos_pixelFix_y = 0;					//（镜头停止移动后，所有像素必须吻合归位）
			this._drill_autoPos_curYAcc += distance;
		}else{							
			pixel_speed += this._drill_autoPos_pixelFix_y;												//速度小数位补正
			this._drill_autoPos_pixelFix_y = pixel_speed - Math.round(pixel_speed) - pixel_speedPlus;	//补正值
			pixel_speed = Math.round(pixel_speed);														//设置速度为固定像素速度
			pixel_speed += pixel_speedPlus;
			
			if( pixel_distance < pixel_speed ){					//第二次收敛（防止补正溢出）
				this._drill_autoPos_pixelFix_y = 0;				//
				this._drill_autoPos_curYAcc += distance;
			}else{
				this._drill_autoPos_curYAcc += pixel_speed/this.tileHeight();
			}
		}   
    }
	// > 弹性移动 - 向左
    if( tar_x < 0 ){
		var distance = Math.abs(tar_x);
		var pixel_distance = distance * this.tileWidth();
		var pixel_speed = Math.min(pixel_distance/speedRatio_x, data['autoSpeedMax'] );
		if( pixel_speed < 0.25 ){ pixel_speed = 0.25; }
			
		if( pixel_distance < pixel_speed ){
			this._drill_autoPos_pixelFix_x = 0;
			this._drill_autoPos_curXAcc -= distance;
		}else{								
			pixel_speed += this._drill_autoPos_pixelFix_x;
			this._drill_autoPos_pixelFix_x = pixel_speed - Math.round(pixel_speed) + pixel_speedPlus;
			pixel_speed = Math.round(pixel_speed) ;
			pixel_speed -= pixel_speedPlus;
			
			if( pixel_distance < pixel_speed ){			
				this._drill_autoPos_pixelFix_x = 0;
				this._drill_autoPos_curXAcc -= distance;
			}else{
				this._drill_autoPos_curXAcc -= pixel_speed/this.tileWidth();
			}
		}
    }
	// > 弹性移动 - 向右
    if( tar_x > 0 ){
		var distance = Math.abs(tar_x);
		var pixel_distance = distance * this.tileWidth();
		var pixel_speed = Math.min(pixel_distance/speedRatio_x, data['autoSpeedMax'] );
		if( pixel_speed < 0.25 ){ pixel_speed = 0.25; }
		
		if( pixel_distance < pixel_speed ){
			this._drill_autoPos_pixelFix_x = 0;
			this._drill_autoPos_curXAcc += distance;
		}else{
			pixel_speed += this._drill_autoPos_pixelFix_x;
			this._drill_autoPos_pixelFix_x = pixel_speed - Math.round(pixel_speed) - pixel_speedPlus;
			pixel_speed = Math.round(pixel_speed) ;
			pixel_speed += pixel_speedPlus;
			
			if( pixel_distance < pixel_speed ){			
				this._drill_autoPos_pixelFix_x = 0;
				this._drill_autoPos_curXAcc += distance;
			}else{
				this._drill_autoPos_curXAcc += pixel_speed/this.tileWidth();
			}
		}
    }
	// > 弹性移动 - 向上
    if( tar_y < 0 ){
		var distance = Math.abs(tar_y);
		var pixel_distance = distance * this.tileHeight();
		var pixel_speed = Math.min(pixel_distance/speedRatio_y, data['autoSpeedMax'] );
		if( pixel_speed < 0.25 ){ pixel_speed = 0.25; }	
		
		if( pixel_distance < pixel_speed ){	
			this._drill_autoPos_pixelFix_y = 0;
			this._drill_autoPos_curYAcc -= distance;
		}else{		
			pixel_speed += this._drill_autoPos_pixelFix_y;
			this._drill_autoPos_pixelFix_y = pixel_speed - Math.round(pixel_speed) + pixel_speedPlus;
			pixel_speed = Math.round(pixel_speed) ;
			pixel_speed -= pixel_speedPlus;
			
			if( pixel_distance < pixel_speed ){	
				this._drill_autoPos_pixelFix_y = 0;
				this._drill_autoPos_curYAcc -= distance;
			}else{		
				this._drill_autoPos_curYAcc -= pixel_speed/this.tileHeight();
			}
		}
    }
	
};
//==============================
// * D自动模式 - 帧刷新 - 镜头架位置修正
//==============================
Drill_LCa_Controller.prototype.drill_updateAutoMode_fixPosInHolder = function(){
	
	// > 设置位置
	this._drill_autoPos_curX = this.drill_LCa_getXInHolder( this._drill_autoPos_curXAcc );
	this._drill_autoPos_curY = this.drill_LCa_getYInHolder( this._drill_autoPos_curYAcc );
	
	// > 非循环情况，消除积累值
	if( this.isLoopHorizontal() == false ){
		this._drill_autoPos_curXAcc = this._drill_autoPos_curX;
	}
	if( this.isLoopVertical() == false ){
		this._drill_autoPos_curYAcc = this._drill_autoPos_curY;
	}
};
//==============================
// * D自动模式 - 立刻看向目标位置
//
//			说明：	自动模式下的功能。
//==============================
Drill_LCa_Controller.prototype.drill_LCa_setLookAtImmediately_Auto = function(){
	//（该指令执行的比 帧刷新 晚，所以只能延迟到下一帧刷新）
	
	// > 镜头目标位置
	var tar_pos = this.drill_getAutoPosition();
	var xx = tar_pos.x;
	var yy = tar_pos.y;
	
	// > 位置位移
	this._drill_autoPos_curXAcc = xx;
	this._drill_autoPos_curYAcc = yy;
	this._drill_autoPos_pixelFix_x = 0;
	this._drill_autoPos_pixelFix_y = 0;
	this._drill_autoPos_notRefreshAccNextFrame = true;		//（下一帧不刷新distance）
	
	// > B镜头架 位置修正
	this.drill_updateAutoMode_fixPosInHolder();
};
//==============================
// * D自动模式 - 修改聚焦偏移（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_setAutoOffset_Private = function( autoOffsetX, autoOffsetY ){
    var data = this._drill_data;
	data['autoOffsetX'] = autoOffsetX;
	data['autoOffsetY'] = autoOffsetY;
};


//==============================
// * E观光模式 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initTourist = function(){
	this._drill_tourist_mouseX = 0;			//E观光模式 - 当前鼠标位置X
	this._drill_tourist_mouseY = 0;			//E观光模式 - 当前鼠标位置Y
	this._drill_tourist_mouseDirection = 5;	//E观光模式 - 当前鼠标方向
	this._drill_tourist_curXSpeed = 0;		//E观光模式 - 当前速度x
	this._drill_tourist_curYSpeed = 0;		//E观光模式 - 当前速度y
	this._drill_tourist_curX = 0;			//E观光模式 - 当前位置x
	this._drill_tourist_curY = 0;			//E观光模式 - 当前位置y
	this._drill_tourist_curXAcc = 0;		//E观光模式 - 当前位置x（循环积累值）
	this._drill_tourist_curYAcc = 0;		//E观光模式 - 当前位置y（循环积累值）
};
//==============================
// * E观光模式 - 清理数据
//==============================
Drill_LCa_Controller.prototype.drill_clearTouristData = function(){
	this._drill_tourist_mouseX = 0;			//E观光模式 - 当前鼠标位置X
	this._drill_tourist_mouseY = 0;			//E观光模式 - 当前鼠标位置Y
	this._drill_tourist_mouseDirection = 5;	//E观光模式 - 当前鼠标方向
	this._drill_tourist_curXSpeed = 0;		//E观光模式 - 当前速度x
	this._drill_tourist_curYSpeed = 0;		//E观光模式 - 当前速度y
	this._drill_tourist_curX = 0;			//E观光模式 - 当前位置x
	this._drill_tourist_curY = 0;			//E观光模式 - 当前位置y
	this._drill_tourist_curXAcc = 0;		//E观光模式 - 当前位置x（循环积累值）
	this._drill_tourist_curYAcc = 0;		//E观光模式 - 当前位置y（循环积累值）
};
//==============================
// * E观光模式 - 帧刷新
//==============================
Drill_LCa_Controller.prototype.drill_updateTouristMode = function(){
	var data = this._drill_data;
	if( data['mode'] != "观光模式" ){ return; }
	
	
	// > F固定看向（观光模式）
	if( this._drill_lockPos == true ){
		var xx = 0;
		var yy = 0;
		if( this._drill_lockPos_type == "位置" ){
			xx = this._drill_lockPos_x;
			yy = this._drill_lockPos_y;
		}
		if( this._drill_lockPos_type == "事件" ){
			var xxx = 0;
			var yyy = 0;
			for(var i = this._drill_lockPos_eventIdList.length-1; i >= 0; i-- ){
				var e_id = this._drill_lockPos_eventIdList[i];
				var e = $gameMap.event( e_id );
				if( e == undefined ){	//（如果设置了多事件看向，而事件被销毁，则立即取消此事件的绑定）
					this._drill_lockPos_eventIdList.splice(i,1);
					continue;
				}
				xxx += e._realX;
				yyy += e._realY;
			}
			if( this._drill_lockPos_eventIdList.length > 0 ){
				xxx = xxx / this._drill_lockPos_eventIdList.length;
				yyy = yyy / this._drill_lockPos_eventIdList.length;
				xx = xxx;
				yy = yyy;
			}
		}
		var oww = Graphics.boxWidth  / this.tileWidth();
		var ohh = Graphics.boxHeight / this.tileHeight();
		xx -= oww*0.5;	//（镜头中心点 修正）
		yy -= ohh*0.5;
		xx += 0.5;
		yy += 0.5;
		this._drill_tourist_curXAcc = xx;
		this._drill_tourist_curYAcc = yy;
	
	
	// > 正常情况
	}else{
		
		// > 帧刷新 - 鼠标控制
		this.drill_updateTouristMode_Mouse();
		
		// > 帧刷新 - 键盘控制（要放后面）
		this.drill_updateTouristMode_Keyboard();
		
		// > 刷新位置
		this._drill_tourist_curXAcc += this._drill_tourist_curXSpeed;
		this._drill_tourist_curYAcc += this._drill_tourist_curYSpeed;
		
	}
	
	// > B镜头架 位置修正
	this.drill_updateTouristMode_fixPosInHolder();
};
//==============================
// * E观光模式 - 帧刷新 - 镜头架位置修正
//==============================
Drill_LCa_Controller.prototype.drill_updateTouristMode_fixPosInHolder = function(){
	
	// > 设置位置
	this._drill_tourist_curX = this.drill_LCa_getXInHolder( this._drill_tourist_curXAcc );
	this._drill_tourist_curY = this.drill_LCa_getYInHolder( this._drill_tourist_curYAcc );
	
	// > 非循环情况，消除积累值
	if( this.isLoopHorizontal() == false ){
		this._drill_tourist_curXAcc = this._drill_tourist_curX;
	}
	if( this.isLoopVertical() == false ){
		this._drill_tourist_curYAcc = this._drill_tourist_curY;
	}
};
//==============================
// * E观光模式 - 帧刷新 - 键盘控制
//
//			说明：	此处帧刷新，包括 手柄控制。
//==============================
Drill_LCa_Controller.prototype.drill_updateTouristMode_Keyboard = function(){
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
// * E观光模式 - 帧刷新 - 鼠标控制
//
//			说明：	此处帧刷新，不包括 触屏控制。
//==============================
Drill_LCa_Controller.prototype.drill_updateTouristMode_Mouse = function(){
	var data = this._drill_data;
	
	// > 鼠标控制关闭情况
	if( data['touristMouseEnabled'] == false ){ return; }
	
	// > 鼠标位置刷新（包含出界情况）
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
// * E观光模式 - 获取朝向
//			
//			说明：	方向见小键盘结构，5为轴心。2下/4左/6右/8上/ 1左下/3右下/7左上/9右上。
//==============================
Drill_LCa_Controller.prototype.drill_getTouristDirection = function(){
    return Input.dir8;
};


//==============================
// * F固定看向 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initLock = function(){
	this._drill_lockPos = false;			//F固定看向 - 开关
	this._drill_lockPos_type = "";			//F固定看向 - 看向类型（位置/事件）
	this._drill_lockPos_x = 0;				//F固定看向 - 位置x
	this._drill_lockPos_y = 0;				//F固定看向 - 位置y
	this._drill_lockPos_eventIdList = [];	//F固定看向 - 事件ID列表
};
//==============================
// * F固定看向 - 固定看向位置（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_setLockPosition_Private = function( x, y ){
    if( this.drill_LCa_isEnable() == false ){ return; }
	var data = this._drill_data;
	
	this._drill_lockPos = true;				//F固定看向 - 开关
	this._drill_lockPos_type = "位置";		//F固定看向 - 类型
	this._drill_lockPos_x = x;				//F固定看向 - 位置x
	this._drill_lockPos_y = y;				//F固定看向 - 位置y
};
//==============================
// * F固定看向 - 固定看向事件（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_setLockEvent_Private = function( event_id ){
    if( this.drill_LCa_isEnable() == false ){ return; }
	var data = this._drill_data;
	
	this._drill_lockPos = true;							//F固定看向 - 开关
	this._drill_lockPos_type = "事件";					//F固定看向 - 类型
	this._drill_lockPos_eventIdList = [];				//F固定看向 - 事件ID列表
	this._drill_lockPos_eventIdList.push( event_id );
};
//==============================
// * F固定看向 - 固定看向多个事件的中心（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_setLockEventList_Private = function( event_id_list ){
    if( this.drill_LCa_isEnable() == false ){ return; }
	var data = this._drill_data;
	
	this._drill_lockPos = true;							//F固定看向 - 开关
	this._drill_lockPos_type = "事件";					//F固定看向 - 类型
	this._drill_lockPos_eventIdList = event_id_list;	//F固定看向 - 事件ID列表
};
//==============================
// * F固定看向 - 解除固定看向（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_setUnlock_Private = function(){
    if( this.drill_LCa_isEnable() == false ){ return; }
	var data = this._drill_data;
	
	this._drill_lockPos = false;
};
//==============================
// * F固定看向 - 立刻看向目标位置（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_setLookAtImmediately_Private = function(){
    if( this.drill_LCa_isEnable() == false ){ return; }
	var data = this._drill_data;
	
	// > D自动模式 - 立刻看向目标位置
	if( data['mode'] == "自动模式" ){
		this.drill_LCa_setLookAtImmediately_Auto();
	}
	// > E观光模式 - 立刻看向目标位置
	if( data['mode'] == "观光模式" ){
		//（不需操作）
	}
};


//==============================
// * G叠加变化 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initChange = function(){
	this._drill_rotation_curTime = 0;		//G叠加变化 - 旋转 - 当前时间
	this._drill_rotation_tarTime = 0;		//G叠加变化 - 旋转 - 目标时间
	this._drill_rotation_ballistics = null;	//G叠加变化 - 旋转 - 弹道
	this._drill_scaleX_curTime = 0;			//G叠加变化 - 缩放X - 当前时间
	this._drill_scaleX_tarTime = 0;			//G叠加变化 - 缩放X - 目标时间
	this._drill_scaleX_ballistics = null;	//G叠加变化 - 缩放X - 弹道
	this._drill_scaleY_curTime = 0;			//G叠加变化 - 缩放Y - 当前时间
	this._drill_scaleY_tarTime = 0;			//G叠加变化 - 缩放Y - 目标时间
	this._drill_scaleY_ballistics = null;	//G叠加变化 - 缩放Y - 弹道
};
//==============================
// * G叠加变化 - 执行旋转（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_doRotate_Private = function( rotation, time, changeType ){
    if( this.drill_LCa_isEnable() == false ){ return; }
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
// * G叠加变化 - 执行缩放X（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_doScaleX_Private = function( scaleX, time, changeType ){
    if( this.drill_LCa_isEnable() == false ){ return; }
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
// * G叠加变化 - 执行缩放Y（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_doScaleY_Private = function( scaleY, time, changeType ){
    if( this.drill_LCa_isEnable() == false ){ return; }
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
// * G叠加变化 - 帧刷新 - 旋转
//==============================
Drill_LCa_Controller.prototype.drill_updateRotation = function(){
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
// * G叠加变化 - 帧刷新 - 缩放
//==============================
Drill_LCa_Controller.prototype.drill_updateScale = function(){
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
// * H整体平移 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initGlobalOffset = function(){
	this._drill_globalOffsetX = 0;					//H整体平移 - X
	this._drill_globalOffsetY = 0;					//H整体平移 - Y
	this._drill_globalOffset_curTime = 0;			//H整体平移 - 当前时间
	this._drill_globalOffset_tarTime = 0;			//H整体平移 - 目标时间
	this._drill_globalOffset_ballisticsX = null;	//H整体平移 - 弹道X
	this._drill_globalOffset_ballisticsY = null;	//H整体平移 - 弹道Y
}
//==============================
// * H整体平移 - 修改整体平移（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_setGlobalOffset_Private = function( globalOffsetX, globalOffsetY, time, changeType ){
    if( this.drill_LCa_isEnable() == false ){ return; }
	this._drill_globalOffset_curTime = 0;
	this._drill_globalOffset_tarTime = time;
	var data = {};
	data['movementNum'] = 1; 
	data['movementTime'] = time; 
	data['movementMode'] = "两点式"; 
	data['twoPointType'] = changeType; 
	data['twoPointDifferenceX'] = globalOffsetX - this._drill_globalOffsetX; 
	data['twoPointDifferenceY'] = globalOffsetY - this._drill_globalOffsetY; 
	$gameTemp.drill_COBa_setBallisticsMove( data );
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, this._drill_globalOffsetX, this._drill_globalOffsetY );
	this._drill_globalOffset_ballisticsX = this['_drill_COBa_x'];
	this._drill_globalOffset_ballisticsY = this['_drill_COBa_y'];
	this['_drill_COBa_x'] = null;
	this['_drill_COBa_y'] = null;
}
//==============================
// * H整体平移 - 帧刷新
//==============================
Drill_LCa_Controller.prototype.drill_updateGlobalOffset = function(){
	var data = this._drill_data;
	
	// > 整体平移
	this._drill_globalOffsetX = 0;
	this._drill_globalOffsetY = 0;
	if( data['enable'] == false ){ return; }
	
	// > 弹道
	if( this._drill_globalOffset_ballisticsX == null ){
		this._drill_globalOffsetX = data['globalOffsetX'];
		this._drill_globalOffsetY = data['globalOffsetY'];
	}else{
		
		// > 播放弹道
		var time = this._drill_globalOffset_curTime;
		if( time < 0 ){ time = 0; }
		if( time > this._drill_globalOffset_ballisticsX.length-1 ){ time = this._drill_globalOffset_ballisticsX.length-1; }
		this._drill_globalOffsetX = this._drill_globalOffset_ballisticsX[time];
		this._drill_globalOffsetY = this._drill_globalOffset_ballisticsY[time];
		
		// > 时间+1
		this._drill_globalOffset_curTime += 1;
	}
	
	// > 不能越界
	var ww = Graphics.boxWidth *0.5;
	var hh = Graphics.boxHeight *0.5;
	if( this._drill_globalOffsetX > ww ){ this._drill_globalOffsetX = ww; }
	if( this._drill_globalOffsetX < (-1)*ww ){ this._drill_globalOffsetX = (-1)*ww; }
	if( this._drill_globalOffsetY > hh ){ this._drill_globalOffsetY = hh; }
	if( this._drill_globalOffsetY < (-1)*hh ){ this._drill_globalOffsetY = (-1)*hh; }
}


//==============================
// * I滚动地图 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initScroll = function(){
	this._drill_scrollOffsetX = 0;					//I滚动地图 - X（单位图块）
	this._drill_scrollOffsetY = 0;					//I滚动地图 - Y（单位图块）
	this._drill_scrollOffset_curTime = 0;			//I滚动地图 - 当前时间
	this._drill_scrollOffset_tarTime = 0;			//I滚动地图 - 目标时间
	this._drill_scrollOffset_ballisticsX = null;	//I滚动地图 - 弹道
	this._drill_scrollOffset_ballisticsY = null;	//I滚动地图 - 弹道
}
//==============================
// * I滚动地图 - 开始滚动（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_scrollToTarget_Private = function( direction, distance, speed ){
    if( this.drill_LCa_isEnable() == false ){ return; }
	
	// > 参数转换
	var scrollOffsetX = 0;	//（单位图块）
	var scrollOffsetY = 0;	//（单位图块）
	if( direction == 2 ){
		scrollOffsetX = this._drill_scrollOffsetX;
		scrollOffsetY = this._drill_scrollOffsetY + distance;
	}
	if( direction == 4 ){
		scrollOffsetX = this._drill_scrollOffsetX - distance;
		scrollOffsetY = this._drill_scrollOffsetY;
	}
	if( direction == 6 ){
		scrollOffsetX = this._drill_scrollOffsetX + distance;
		scrollOffsetY = this._drill_scrollOffsetY;
	}
	if( direction == 8 ){
		scrollOffsetX = this._drill_scrollOffsetX;
		scrollOffsetY = this._drill_scrollOffsetY - distance;
	}
	if( direction == 1 ){
		scrollOffsetX = this._drill_scrollOffsetX - distance;
		scrollOffsetY = this._drill_scrollOffsetY + distance;
	}
	if( direction == 3 ){
		scrollOffsetX = this._drill_scrollOffsetX + distance;
		scrollOffsetY = this._drill_scrollOffsetY + distance;
	}
	if( direction == 7 ){
		scrollOffsetX = this._drill_scrollOffsetX - distance;
		scrollOffsetY = this._drill_scrollOffsetY - distance;
	}
	if( direction == 9 ){
		scrollOffsetX = this._drill_scrollOffsetX + distance;
		scrollOffsetY = this._drill_scrollOffsetY - distance;
	}
	var real_speed = Math.pow(2, speed) / 256;
	var time = Math.floor( distance / real_speed );
	
	// > 弹道设置
	this._drill_scrollOffset_curTime = 0;
	this._drill_scrollOffset_tarTime = time +1;
	var data = {};
	data['movementNum'] = 1; 
	data['movementTime'] = time; 
	data['movementMode'] = "两点式"; 
	data['twoPointType'] = "匀速移动"; 
	data['twoPointDifferenceX'] = scrollOffsetX - this._drill_scrollOffsetX; 
	data['twoPointDifferenceY'] = scrollOffsetY - this._drill_scrollOffsetY; 
	$gameTemp.drill_COBa_setBallisticsMove( data );
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, this._drill_scrollOffsetX, this._drill_scrollOffsetY );
	this._drill_scrollOffset_ballisticsX = this['_drill_COBa_x'];
	this._drill_scrollOffset_ballisticsY = this['_drill_COBa_y'];
	this['_drill_COBa_x'] = null;
	this['_drill_COBa_y'] = null;
}
//==============================
// * I滚动地图 - 回到原位置（私有）
//==============================
Drill_LCa_Controller.prototype.drill_LCa_scrollToHome_Private = function( speed ){
    if( this.drill_LCa_isEnable() == false ){ return; }
	
	// > 参数转换
	var distance = Math.abs(this._drill_scrollOffsetX) + Math.abs(this._drill_scrollOffsetY);
	var real_speed = Math.pow(2, speed) / 256;
	var time = Math.floor( distance / real_speed );
	
	// > 弹道设置
	this._drill_scrollOffset_curTime = 0;
	this._drill_scrollOffset_tarTime = time +1;
	var data = {};
	data['movementNum'] = 1; 
	data['movementTime'] = time; 
	data['movementMode'] = "两点式"; 
	data['twoPointType'] = "匀速移动"; 
	data['twoPointDifferenceX'] = 0 - this._drill_scrollOffsetX; 
	data['twoPointDifferenceY'] = 0 - this._drill_scrollOffsetY; 
	$gameTemp.drill_COBa_setBallisticsMove( data );
	$gameTemp.drill_COBa_preBallisticsMove( this, 0, this._drill_scrollOffsetX, this._drill_scrollOffsetY );
	this._drill_scrollOffset_ballisticsX = this['_drill_COBa_x'];
	this._drill_scrollOffset_ballisticsY = this['_drill_COBa_y'];
	this['_drill_COBa_x'] = null;
	this['_drill_COBa_y'] = null;
}
//==============================
// * I滚动地图 - 帧刷新
//==============================
Drill_LCa_Controller.prototype.drill_updateScroll = function(){
	var data = this._drill_data;
	
	// > 整体平移
	this._drill_scrollOffsetX = 0;
	this._drill_scrollOffsetY = 0;
	if( data['enable'] == false ){ return; }
	
	// > 叠加变化 - 整体平移
	if( this._drill_scrollOffset_ballisticsX == null ){
		this._drill_scrollOffsetX = 0;
		this._drill_scrollOffsetY = 0;
	}else{
		
		// > 播放弹道
		var time = this._drill_scrollOffset_curTime;
		if( time < 0 ){ time = 0; }
		if( time > this._drill_scrollOffset_ballisticsX.length-1 ){ time = this._drill_scrollOffset_ballisticsX.length-1; }
		this._drill_scrollOffsetX = this._drill_scrollOffset_ballisticsX[time];
		this._drill_scrollOffsetY = this._drill_scrollOffset_ballisticsY[time];
		
		// > 时间+1
		this._drill_scrollOffset_curTime += 1;
	}
	
}


//==============================
// * J数学工具 - 初始化子功能
//==============================
Drill_LCa_Controller.prototype.drill_controller_initMath = function(){
	//（无）
}
//==============================
// * J数学工具 - 锁定锚点
//			
//			参数：	> org_anchor_x 数字    （原贴图锚点X）
//					> org_anchor_y 数字    （原贴图锚点Y）
//					> target_anchor_x 数字 （新的锚点X）
//					> target_anchor_y 数字 （新的锚点Y）
//					> width 数字           （贴图宽度）
//					> height 数字          （贴图高度）
//					> rotation 数字        （旋转度数，弧度）
//					> scale_x,scale_y 数字 （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字   （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }         （偏移的坐标）
//			
//			说明：	> 修正 旋转+缩放+斜切 的坐标，使其看起来像是在绕着 新的锚点 变换。
//					  旋转+缩放+斜切 可为负数。
//==============================
Game_Temp.prototype.drill_LCa_Math2D_getFixPointInAnchor = function( 
					org_anchor_x,org_anchor_y,			//原贴图锚点 
					target_anchor_x,target_anchor_y, 	//新的锚点 
					width, height,						//贴图高宽
					rotation,							//变换的值（旋转）
					scale_x, scale_y,					//变换的值（缩放）
					skew_x, skew_y  ){					//变换的值（斜切）
	
	if( scale_x == undefined ){ scale_x = 1; }
	if( scale_y == undefined ){ scale_y = 1; }
	if( skew_x == undefined ){ skew_x = 0; }
	if( skew_y == undefined ){ skew_y = 0; }
	
	// > 参数准备 （来自 Pixi.Transform）
    var _cx = 1; // cos rotation + skewY;
    var _sx = 0; // sin rotation + skewY;
    var _cy = 0; // cos rotation + Math.PI/2 - skewX;
    var _sy = 1; // sin rotation + Math.PI/2 - skewX;
	
	// > 旋转+斜切 （来自 Pixi.Transform.prototype.updateSkew）
    _cx = Math.cos( rotation + skew_y );
    _sx = Math.sin( rotation + skew_y );
    _cy = -Math.sin( rotation - skew_x ); // cos, added PI/2
    _sy = Math.cos( rotation - skew_x ); // sin, added PI/2
	
	// > 缩放 （来自 Pixi.Transform.prototype.updateLocalTransform）
    var a = _cx * scale_x;
    var b = _sx * scale_x;
    var c = _cy * scale_y;
    var d = _sy * scale_y;
	
	// > 将参数应用到坐标
	var cur_x = width  * target_anchor_x;
	var cur_y = height * target_anchor_y;
	var center_x = width  * org_anchor_x;
	var center_y = height * org_anchor_y;
	var dx = (center_x - cur_x);
	var dy = (center_y - cur_y);
    var tar_x = cur_x + (dx * a + dy * c) - center_x;
    var tar_y = cur_y + (dx * b + dy * d) - center_y;
	
	return { "x":tar_x, "y":tar_y };
}
//==============================
// * J数学工具 - 矩阵点的变换
//			
//			参数：	> cur_x,cur_y 数字       （需要变换的点）
//					> center_x,center_y 数字 （矩形中心点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//			返回：	> { x:0, y:0 }           （变换后的坐标）
//			
//			说明：	矩阵内或矩阵外一个点，能够根据矩阵的 旋转+缩放 一并变换。
//					旋转值和缩放值可为负数。
//==============================
Game_Temp.prototype.drill_LCa_Math2D_getPointWithTransform = function( 
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
//==============================
// * J数学工具 - 矩阵点的变换（逆向）
//			
//			参数：	> cur_x,cur_y 数字       （变换后的坐标）
//					> center_x,center_y 数字 （矩形中心点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//			返回：	> { x:0, y:0 }           （变换前的点）
//			
//			说明：	同样的函数，能够将正向函数的结果值，扳回成正向函数的最初值。
//==============================
Game_Temp.prototype.drill_LCa_Math2D_getPointWithTransformInversed = function( 
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
// ** ☆图块填充（A主体 相关）
//			
//			说明：	> 此部分专门控制镜头产生的 缩放+旋转 处理后，图块的范围的变化。
//					> 缩放/旋转后，图块填充margin需要进行相应的范围变化。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 图块填充 - margin属性
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
// * 图块填充 - 帧刷新
//==============================
var _drill_LCa_s_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function (){
	_drill_LCa_s_update.call(this);
	this.drill_LCa_updateTileResize();			//帧刷新 - 缩放比例
};
//==============================
// * 图块填充 - 帧刷新 缩放比例
//==============================
Scene_Map.prototype.drill_LCa_updateTileResize = function(){
	
	// > 强制刷新开关
	if( DrillUp.g_LCa_forceRefresh == false ){ return; }
	
	// > 值相同时，不刷新
	var layer_sprite = this._spriteset._baseSprite;
	if( this._drill_LCa_rotation == layer_sprite.rotation &&
		this._drill_LCa_scale_x == layer_sprite.scale.x &&
		this._drill_LCa_scale_y == layer_sprite.scale.y ){
		return;
	}
	this._drill_LCa_rotation = layer_sprite.rotation;
	this._drill_LCa_scale_x = layer_sprite.scale.x;
	this._drill_LCa_scale_y = layer_sprite.scale.y;
	
	// > 外包裹矩形
	var rect = $gameTemp.drill_LCa_getTileTransformRect( 
					0,0,Graphics.boxWidth,Graphics.boxHeight,
					layer_sprite.rotation,
					layer_sprite.scale.x,
					layer_sprite.scale.y
				);
	var ww = rect.width;
	var hh = rect.height;
	if( ww > 6000 ){ ww = 6000; }	//（定义矩形的上限值）
	if( hh > 6000 ){ hh = 6000; }
	var ow = (ww - Graphics.boxWidth) *0.5;
	var oh = (hh - Graphics.boxHeight) *0.5;
	if( ow < 0 ){ ow = 0; }
	if( oh < 0 ){ oh = 0; }
	ow += 20;
	oh += 20;
	var ma = ow;
	if( ma < oh ){ ma = oh; }
	
	// > 图块伸缩
	this._spriteset._tilemap.margin = ma;
	this._spriteset._tilemap._width = Graphics.boxWidth + ma*2;
	this._spriteset._tilemap._height = Graphics.boxHeight + ma*2;
	
	// > 地图远景
	var ox = (Graphics.boxWidth - ww)*0.5;
	var oy = (Graphics.boxHeight - hh)*0.5;
	if( this._spriteset._parallax ){
		this._spriteset._parallax.move( ox, oy, ww, hh );
		this._spriteset._parallax.origin.x += ox;
		this._spriteset._parallax.origin.y += oy;
	}
}
//==============================
// * 图块填充 - 获取矩阵 缩放、旋转 后的外包裹矩阵（数学）
//			
//			参数：	> x,y,width,height     （矩形对象）
//					> rotation 数字        （旋转度数，弧度）
//					> scale_x,scale_y 数字 （缩放比例XY，默认1.00）
//
//			说明：	中心锚点固定为矩形中心(0.5,0.5)。
//==============================
Game_Temp.prototype.drill_LCa_getTileTransformRect = function( x, y, width, height, rotation, scale_x, scale_y ){
	var xx = x;
	var yy = y;
	var ww = width;
	var hh = height;
	
	// > 先缩放
	ww /= scale_x;
	hh /= scale_y;
	
	// > 选取矩形的两个对角点，旋转
	var p1_x = ww * 0.5;
	var p1_y = hh * 0.5;
	var p2_x = ww * 0.5;
	var p2_y = hh *(-0.5);
	var r = Math.sqrt( Math.pow(p1_x,2) + Math.pow(p1_y,2) );
	var r_angle = ((rotation *180/Math.PI) % 360 + 360) % 360;
	var r_rotation = r_angle /180*Math.PI;
	
	var p_degree = Math.atan(p1_y/p1_x);	
	p_degree = Math.PI - p_degree;
	if( p1_x < 0 ){
		p_degree = Math.PI + p_degree;
	}
	p1_x = r*Math.cos( r_rotation - p_degree );
	p1_y = r*Math.sin( r_rotation - p_degree );
	
	var p_degree = Math.atan(p2_y/p2_x);	
	p_degree = Math.PI - p_degree;
	if( p2_x < 0 ){
		p_degree = Math.PI + p_degree;
	}
	p2_x = r*Math.cos( r_rotation - p_degree );
	p2_y = r*Math.sin( r_rotation - p_degree );
	
	// > 选取最长的作为宽度/高度
	p1_x = Math.abs(p1_x);
	p1_y = Math.abs(p1_y);
	p2_x = Math.abs(p2_x);
	p2_y = Math.abs(p2_y);
	
	if( p1_x < p2_x ){ p1_x = p2_x; }
	var rww = p1_x *2;
	if( p1_y < p2_y ){ p1_y = p2_y; }
	var rhh = p1_y *2;
	
	xx = xx + ww - rww;
	yy = yy + hh - rhh;
	
	return { 'x':xx, 'y':yy, 'width':rww, 'height':rhh };
}


//=============================================================================
// ** ☆缩放转换（G叠加变化 相关）
//
//			说明：	> 此部分专门控制镜头产生的 缩放转换 处理。
//					> 子插件会根据情况标记出【镜头缩放与位移】，用于处理位置与缩放关系。
//					> 获取缩放值 的标准函数 见 A主体
//					> 缩放值转换 的标准函数 见 G叠加变化
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 缩放转换 - 屏幕宽度（图块单位）（覆写）
//
//			说明：	> 考虑到镜头缩放情况，这里返回的值需要经过缩放处理。
//					> 此函数默认只被 _displayX 相关函数用到了，但是这些函数都被覆写了。所以用处不大。
//==============================
Game_Map.prototype.screenTileX = function(){
	var scale_x = $gameSystem._drill_LCa_controller._drill_scaleX;
	if( scale_x == undefined ){ scale_x = 1; }
	return Graphics.boxWidth / scale_x / this.tileWidth();
};
//==============================
// * 缩放转换 - 屏幕高度（图块单位）（覆写）
//
//			说明：	> 考虑到镜头缩放情况，这里返回的值需要经过缩放处理。
//					> 此函数默认只被 _displayY 相关函数用到了，但是这些函数都被覆写了。所以用处不大。
//==============================
Game_Map.prototype.screenTileY = function(){
	var scale_y = $gameSystem._drill_LCa_controller._drill_scaleY;
	if( scale_y == undefined ){ scale_y = 1; }
	return Graphics.boxHeight / scale_y / this.tileHeight(); 
};
//==============================
// * 缩放转换 - 缩放地图的鼠标X修正
//
//			说明：	> 此效果包含了 鼠标左键移动 的转换。
//==============================
var _drill_LCa_map_canvasToMapX = Game_Map.prototype.canvasToMapX;
Game_Map.prototype.canvasToMapX = function( x ){
	x = $gameSystem.drill_LCa_cameraToMapX( x );
	return _drill_LCa_map_canvasToMapX.call(this,x);
};
//==============================
// * 缩放转换 - 缩放地图的鼠标Y修正
//
//			说明：	> 此效果包含了 鼠标左键移动 的转换。
//==============================
var _drill_LCa_map_canvasToMapY = Game_Map.prototype.canvasToMapY;
Game_Map.prototype.canvasToMapY = function( y ){
	y = $gameSystem.drill_LCa_cameraToMapY( y );
	return _drill_LCa_map_canvasToMapY.call(this,y);
};


//=============================================================================
// ** ☆整体平移（H整体平移 相关）
//
//			说明：	> 关键词 globalOffset
//					> 此模块使用 镜头控制器 的结果数据，进行实时变化。
//					> 鼠标指向标、边缘遮挡层 所在的位置需要同步平移。搜索关键字：整体平移。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 整体平移 - 鼠标指向标
//==============================
var _drill_LCa_globalOffset_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
	$gameMap._drill_LCa_isInProcessMapTouch = true;		//（标记鼠标点击时机）
	_drill_LCa_globalOffset_processMapTouch.call( this );
	$gameMap._drill_LCa_isInProcessMapTouch = false;
}
//==============================
// * 整体平移 - 鼠标指向标 - 整体平移X
//==============================
var _drill_LCa_globalOffset_canvasToMapX = Game_Map.prototype.canvasToMapX;
Game_Map.prototype.canvasToMapX = function( x ){
	if( this._drill_LCa_isInProcessMapTouch == true ){
		x -= $gameSystem._drill_LCa_controller._drill_globalOffsetX;
	}
	return _drill_LCa_globalOffset_canvasToMapX.call( this, x );
}
//==============================
// * 整体平移 - 鼠标指向标 - 整体平移Y
//==============================
var _drill_LCa_globalOffset_canvasToMapY = Game_Map.prototype.canvasToMapY;
Game_Map.prototype.canvasToMapY = function( y ){
	if( this._drill_LCa_isInProcessMapTouch == true ){
		y -= $gameSystem._drill_LCa_controller._drill_globalOffsetY;
	}
	return _drill_LCa_globalOffset_canvasToMapY.call( this, y );
}
/*
//==============================
// * 整体平移 - 鼠标指向标（当前方法不合适，改为上面的三个函数）
//==============================
var _drill_LCa_globalOffset_setDestination = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function( x, y ){
	if( $gameMap ){
		var controller = $gameSystem._drill_LCa_controller;
		x -= Math.round( controller._drill_globalOffsetX / $gameMap.tileWidth() );	//（图块单位）
		y -= Math.round( controller._drill_globalOffsetY / $gameMap.tileHeight() );
	}
	_drill_LCa_globalOffset_setDestination.call( this, x, y );
};
*/
//==============================
// * 整体平移 - 边缘遮挡层 - 创建
//==============================
var _drill_LCa_globalOffset_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_LCa_globalOffset_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	
	// > 上层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
	
	// > 创建 边缘遮挡层
	//		（边缘遮挡层是为了防止 整体平移后 玩家对 镜头聚焦 理解会有偏差而定的）
	if( this._drill_LCa_barrierLayer == undefined ){
		var data = $gameSystem._drill_LCa_controller._drill_data;
		var ww = Graphics.boxWidth;
		var hh = Graphics.boxHeight;
		
		// > 建立画布
		var temp_bitmap = new Bitmap( ww*3, hh*3 );
		temp_bitmap.fillAll( data['globalBarrierLayerColor'] );
		temp_bitmap.clearRect( ww,hh, ww,hh );
		
		// > 建立贴图
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = temp_bitmap;
		temp_sprite._drill_LCa_curColor = data['globalBarrierLayerColor'];
		temp_sprite.visible = false;
		temp_sprite.x = (-1) * ww;
		temp_sprite.y = (-1) * hh;
		this.addChild( temp_sprite );
		this._drill_LCa_barrierLayer = temp_sprite;
	}
}
//==============================
// * 镜头控制 - 帧刷新绑定
//==============================
var _drill_LCa_globalOffset_spriteset_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function(){
	_drill_LCa_globalOffset_spriteset_update.call(this);
	if( $gameSystem.drill_LCa_isEnable() != true ){ return; }
	this.drill_LCa_updateBarrierLayer();		//帧刷新 - 边缘遮挡层
};
//==============================
// * 整体平移 - 边缘遮挡层 - 帧刷新
//==============================
Spriteset_Map.prototype.drill_LCa_updateBarrierLayer = function() {
	if( this._drill_LCa_barrierLayer == undefined ){ return; }
	var controller = $gameSystem._drill_LCa_controller;
	var data = $gameSystem._drill_LCa_controller._drill_data;
	
	// > 整体平移
	var ww = Graphics.boxWidth;
	var hh = Graphics.boxHeight;
	var xx = (-1) * ww;
	var yy = (-1) * hh;
	xx += controller._drill_globalOffsetX*2;	//（边缘遮挡层两倍偏移量）
	yy += controller._drill_globalOffsetY*2;
	this._drill_LCa_barrierLayer.x = xx;
	this._drill_LCa_barrierLayer.y = yy;
	
	// > 边缘遮挡层 显示
	if( data['globalBarrierLayerEnabled'] == true ){
		if( controller._drill_globalOffsetX == 0 && controller._drill_globalOffsetY == 0 ){
			this._drill_LCa_barrierLayer.visible = false;
		}else{
			this._drill_LCa_barrierLayer.visible = true;
		}
	}
	
	// > 边缘遮挡层 颜色
	if( this._drill_LCa_barrierLayer._drill_LCa_curColor != data['globalBarrierLayerColor'] ){
		this._drill_LCa_barrierLayer._drill_LCa_curColor =  data['globalBarrierLayerColor'];
		
		// > 重建画布
		var temp_bitmap = new Bitmap( ww*3, hh*3 );
		temp_bitmap.fillAll( data['globalBarrierLayerColor'] );
		temp_bitmap.clearRect( ww,hh, ww,hh );
		this._drill_LCa_barrierLayer.bitmap = temp_bitmap;
	}
}
/*
//==============================
// * 整体平移 - 初始化（不合适，弃用）
//
//			说明：	此部分直接修改鼠标的基函数，确保鼠标的位置、落脚点整体平移。
//==============================
var _drill_LCa_globalOffset_Graphics_initialize = Graphics.initialize;
Graphics.initialize = function( width, height, type ){
	_drill_LCa_globalOffset_Graphics_initialize.call( this, width, height, type );
	this._drill_LCa_globalOffsetX = 0;
	this._drill_LCa_globalOffsetY = 0;
}
//==============================
// * 整体平移 - 游戏坐标X 转 html坐标X（不合适，弃用）
//==============================
var _drill_LCa_globalOffset_pageToCanvasX = Graphics.pageToCanvasX;
Graphics.pageToCanvasX = function( x ){
	var xx = _drill_LCa_globalOffset_pageToCanvasX.call( this, x );
	xx -= this._drill_LCa_globalOffsetX;
	return xx;
}
//==============================
// * 整体平移 - 游戏坐标Y 转 html坐标Y（不合适，弃用）
//==============================
var _drill_LCa_globalOffset_pageToCanvasY = Graphics.pageToCanvasY;
Graphics.pageToCanvasY = function( y ){
	var yy = _drill_LCa_globalOffset_pageToCanvasY.call( this, y );
	yy -= this._drill_LCa_globalOffsetY;
	return yy;
}
//==============================
// * 场景管理器 - 帧刷新（不合适，弃用）
//==============================
var _drill_LCa_globalOffset_updateMain = SceneManager.updateMain;
SceneManager.updateMain = function() {
	_drill_LCa_globalOffset_updateMain.call( this );
	
	// > 只在地图界面才进行 整体平移
	if( $gameSystem && this._scene.constructor.name === "Scene_Map" ){
		var controller = $gameSystem._drill_LCa_controller;
		Graphics._drill_LCa_globalOffsetX = controller._drill_globalOffsetX;
		Graphics._drill_LCa_globalOffsetY = controller._drill_globalOffsetY;
	}else{
		Graphics._drill_LCa_globalOffsetX = 0;
		Graphics._drill_LCa_globalOffsetY = 0;
	}
}
*/


//=============================================================================
// ** ☆滚动地图（I滚动地图 相关）
//
//			说明：	> 此模块在 镜头控制器 工作时，屏蔽 干扰镜头功能的函数。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 滚动地图 - 初始化归位
//==============================
var _drill_LCa_setupScroll = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LCa_setupScroll.call( this, mapId );
	$gameSystem._drill_LCa_controller._drill_scrollOffset_ballisticsX = null;	//（直接清空弹道）
	$gameSystem._drill_LCa_controller._drill_scrollOffset_ballisticsY = null;
}
//==============================
// * 滚动地图 - 场所移动归位
//==============================
var _drill_LCa_clearTransferInfo = Game_Player.prototype.clearTransferInfo;
Game_Player.prototype.clearTransferInfo = function(){
	_drill_LCa_clearTransferInfo.call( this );
	$gameSystem._drill_LCa_controller._drill_scrollOffset_ballisticsX = null;	//（直接清空弹道）
	$gameSystem._drill_LCa_controller._drill_scrollOffset_ballisticsY = null;
}
//==============================
// * 滚动地图 - 函数屏蔽 地图镜头滚动
//==============================
var _drill_LCa_map_updateScroll = Game_Map.prototype.updateScroll;
Game_Map.prototype.updateScroll = function(){
	
	// > 镜头开启时，屏蔽
	if( $gameSystem.drill_LCa_isEnable() == true ){ return; }
	
	_drill_LCa_map_updateScroll.call(this);
};
//==============================
// * 滚动地图 - 函数屏蔽 玩家镜头位置
//==============================
var _drill_LCa_player_updateScroll = Game_Player.prototype.updateScroll;
Game_Player.prototype.updateScroll = function( lastScrolledX, lastScrolledY ){
	
	// > 镜头开启时，屏蔽
	if( $gameSystem.drill_LCa_isEnable() == true ){ return; }
	
	_drill_LCa_player_updateScroll.call( this, lastScrolledX, lastScrolledY );
};
//==============================
// * 滚动地图 - 开始滚动（command204）（覆写）
//==============================
var _drill_LCa_map_startScroll = Game_Map.prototype.startScroll;
Game_Map.prototype.startScroll = function( direction, distance, speed ){
	
	// > 镜头开启时，调取函数
	if( $gameSystem.drill_LCa_isEnable() == true ){
		$gameSystem._drill_LCa_controller.drill_LCa_scrollToTarget( direction, distance, speed );
		return;
	}
	_drill_LCa_map_startScroll.call( this, direction, distance, speed );
};
//==============================
// * 滚动地图 - 判断滚动状态（覆写）
//
//			说明：	> 此函数能阻塞 事件指令，详细可见 Game_Interpreter.prototype.updateWaitMode 。
//==============================
var _drill_LCa_map_isScrolling = Game_Map.prototype.isScrolling;
Game_Map.prototype.isScrolling = function(){
	
	// > 镜头开启时，调取函数
	if( $gameSystem.drill_LCa_isEnable() == true ){
		return $gameSystem._drill_LCa_controller.drill_LCa_isScrolling();
	}
	return _drill_LCa_map_isScrolling.call(this);
};



//=============================================================================
// ** ☆层级标记器
//
//			说明：	> 此模块与镜头控制功能不相关。
//					> 可以单独分离出去。但现在不打算分离。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_LCa_layerName_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_LCa_layerName_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
	
	// > 标记
	this._drill_mapDownArea._drill_LCa_layerName = "下层";
	this._baseSprite._drill_LCa_layerName = "下层/中层/上层";
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_LCa_layerName_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_LCa_layerName_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
	
	// > 标记
	this._drill_mapCenterArea._drill_LCa_layerName = "中层";
	this._tilemap._drill_LCa_layerName = "中层";
	this._baseSprite._drill_LCa_layerName = "下层/中层/上层";
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_LCa_layerName_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_LCa_layerName_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
	
	// > 标记
	this._drill_mapUpArea._drill_LCa_layerName = "上层";
	this._baseSprite._drill_LCa_layerName = "下层/中层/上层";
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_LCa_layerName_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_LCa_layerName_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
	
	// > 标记
	this._drill_mapPicArea._drill_LCa_layerName = "图片层";
	this._pictureContainer._drill_LCa_layerName = "图片层";
}
//==============================
// * 地图层级 - 图片层标记
//==============================
var _drill_LCa_layerName_map_createWindowLayer = Scene_Map.prototype.createWindowLayer;
Scene_Map.prototype.createWindowLayer = function() {
	_drill_LCa_layerName_map_createWindowLayer.call(this);	
	this._windowLayer._drill_LCa_layerName = "图片层";
};
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_LCa_layerName_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LCa_layerName_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
	
	// > 标记
	this._drill_SenceTopArea._drill_LCa_layerName = "最顶层";
}
//==============================
// * 层级标记器 - 标记溯源
//
//			说明：	输入对象、层级标记，返回层级对象。没有则返回空。
//==============================
DrillUp.drill_LCa_getAncestorLayerSprite = function( sprite, layerName ){
	for( var i=0; i < 8; i++ ){
		if( sprite.parent == undefined ){
			break;
		}
		var sprite = sprite.parent;
		if( sprite._drill_LCa_layerName == layerName ){
			return sprite;
		}
	}
	return null;
}
//#############################################################################
// ** 【标准模块】层级标记器
//#############################################################################
//##############################
// * 层级标记器 - 是否处于地图界面【标准函数】
//			
//			参数：	> sprite/window 贴图/窗口
//			返回：	> 布尔
//          
//			说明：	> 此函数用于难以获取到 当前层级 的对象或函数。比如按钮组。
//##############################
DrillUp.drill_LCa_isInScene_Map = function(){
	return SceneManager._scene instanceof Scene_Map;
};
//##############################
// * 层级标记器 - 是否处于下层【标准函数】
//			
//			参数：	> sprite/window 贴图/窗口
//			返回：	> 布尔
//          
//			说明：	> 此函数用于难以获取到 当前层级 的对象或函数。比如按钮组。
//##############################
DrillUp.drill_LCa_isInArea_Down = function( sprite ){
	return this.drill_LCa_getAncestorLayerSprite( sprite, "下层" ) != null;
};
//##############################
// * 层级标记器 - 是否处于中层【标准函数】
//			
//			参数：	> sprite/window 贴图/窗口
//			返回：	> 布尔
//##############################
DrillUp.drill_LCa_isInArea_Center = function( sprite ){
	return this.drill_LCa_getAncestorLayerSprite( sprite, "中层" ) != null;
};
//##############################
// * 层级标记器 - 是否处于上层【标准函数】
//			
//			参数：	> sprite/window 贴图/窗口
//			返回：	> 布尔
//##############################
DrillUp.drill_LCa_isInArea_Up = function( sprite ){
	return this.drill_LCa_getAncestorLayerSprite( sprite, "上层" ) != null;
};
//##############################
// * 层级标记器 - 是否处于下层/中层/上层任意一层【标准函数】
//			
//			参数：	> sprite/window 贴图/窗口
//			返回：	> 布尔
//          
//			说明：	> 只要处于_baseSprite的贴图，就都算。
//##############################
DrillUp.drill_LCa_isInArea_DownOrCenterOrUp = function( sprite ){
	return this.drill_LCa_getAncestorLayerSprite( sprite, "下层/中层/上层" ) != null;
};
//##############################
// * 层级标记器 - 是否处于图片层【标准函数】
//			
//			参数：	> sprite/window 贴图/窗口
//			返回：	> 布尔
//##############################
DrillUp.drill_LCa_isInArea_Pic = function( sprite ){
	return this.drill_LCa_getAncestorLayerSprite( sprite, "图片层" ) != null;
};
//##############################
// * 层级标记器 - 是否处于最顶层【标准函数】
//			
//			参数：	> sprite/window 贴图/窗口
//			返回：	> 布尔
//##############################
DrillUp.drill_LCa_isInArea_Top = function( sprite ){
	return this.drill_LCa_getAncestorLayerSprite( sprite, "最顶层" ) != null;
};
//##############################
// * 层级标记器 - 是否处于图片层/最顶层任意一层【标准函数】
//			
//			参数：	> sprite/window 贴图/窗口
//			返回：	> 布尔
//##############################
DrillUp.drill_LCa_isInArea_PicOrTop = function( sprite ){
	if( this.drill_LCa_getAncestorLayerSprite( sprite, "图片层" ) != null ){ return true; }
	if( this.drill_LCa_getAncestorLayerSprite( sprite, "最顶层" ) != null ){ return true; }
	return false;
};



//=============================================================================
// ** ☆镜头墙
//
//			说明：	> 此模块能在现有 镜头控制器 基础上，添加镜头墙功能。
//					> 可以作为一个单独插件分离出去。但现在不打算分离。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 事件容器 - 初始化
//==============================
var _drill_LCa_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {	
	_drill_LCa_temp_initialize2.call(this);
	this._drill_LCa_wallEvents = [];			//含镜头墙的事件
	this._drill_LCa_needRestatistics = true;
};
//==============================
// * 事件容器 - 切换地图时
//==============================
var _drill_LCa_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_LCa_wallEvents = [];		//含镜头墙的事件
	$gameTemp._drill_LCa_needRestatistics = true;
	_drill_LCa_gmap_setup.call(this,mapId);
}
//==============================
// * 事件容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_LCa_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	$gameTemp._drill_LCa_wallEvents = [];
	$gameTemp._drill_LCa_needRestatistics = true;
	_drill_LCa_smap_createCharacters.call(this);
}
//==============================
// * 事件容器 - 帧刷新
//==============================
var _drill_LCa_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_LCa_map_update.call( this, sceneActive );
	this.drill_LCa_updateRestatistics();	//帧刷新 - 刷新统计
};
//==============================
// * 事件容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_LCa_updateRestatistics = function() {
	if( !$gameTemp._drill_LCa_needRestatistics ){ return }
	$gameTemp._drill_LCa_needRestatistics = false;
	
	$gameTemp._drill_LCa_wallEvents = [];
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event._drill_LCa_wall != null && 
			temp_event._drill_LCa_wall.length != 0){
			$gameTemp._drill_LCa_wallEvents.push(temp_event);
		}
	}
}
//==============================
// * 镜头墙 - 事件注释
//==============================
var _drill_LCa_c_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	_drill_LCa_c_setupPageSettings.call(this);
	
	// > 镜头墙 - 不跨事件页
	this._drill_LCa_wall = [];
	
	var page = this.page();
    if( page ){
		this.list().forEach(function(l) {	//将页面注释转成插件指令格式
			if( l.code === 108 ){
				var args = l.parameters[0].split(' ');
				var command = args.shift();
				if( command == "=>地图镜头" ){
					if( args.length == 4 ){
						if( args[1] ){ var type  = String(args[1]);}
						if( args[3] ){ var temp1 = String(args[3]);}
						if( type == "设置镜头墙" ){
							this._drill_LCa_wall.push(temp1);
							$gameTemp._drill_LCa_needRestatistics = true;
						}
					}
				};  
			};
		}, this);
    }
}
//==============================
// * 镜头墙 - D自动模式 - 获取镜头目标位置
//
//			说明：	> 此功能对 镜头控制器 进行功能扩展。
//==============================
var _drill_LCa_Controller_getAutoPosition = Drill_LCa_Controller.prototype.drill_getAutoPosition;
Drill_LCa_Controller.prototype.drill_getAutoPosition = function(){
	var pos = _drill_LCa_Controller_getAutoPosition.call( this );
	var xx = pos['x'];
	var yy = pos['y'];
	
	// > 镜头墙矩形区域
	var oww = Graphics.boxWidth  / this.tileWidth();
	var ohh = Graphics.boxHeight / this.tileHeight();
	var sww = Graphics.boxWidth  / this._drill_scaleX / this.tileWidth();
	var shh = Graphics.boxHeight / this._drill_scaleY / this.tileHeight();
	var unit_x = 1/this._drill_scaleX;	//（缩放后的图块值）
	var unit_y = 1/this._drill_scaleY;
	var rect_lr_width  = sww * 0.5;		//（左右 镜头墙矩形）
	var rect_lr_height = shh * 1;
	var rect_ud_width  = sww * 1;		//（上下 镜头墙矩形）
	var rect_ud_height = shh * 0.5;
	
	// > 镜头墙
	for(var i=0; i < $gameTemp._drill_LCa_wallEvents.length; i++){
		var temp_event = $gameTemp._drill_LCa_wallEvents[i];
		var temp_walls = temp_event._drill_LCa_wall;
		
		// > 事件对齐镜头位置
		var rxx = temp_event._realX - oww*0.5;
		var ryy = temp_event._realY - ohh*0.5;
		
		// > 镜头墙 - 数学问题兼容
		//		（如果在 循环+镜头墙 情况下，镜头墙处于初始的镜头范围内，则镜头墙无效）
		if( $gameMap.isLoopHorizontal() && temp_event._realX < sww ){
			continue;
		}
		if( $gameMap.isLoopVertical() && temp_event._realY < shh ){
			continue;
		}
		
		// > 镜头墙 - 优化（镜头+边界 内未出现墙，则不执行阻塞）
		if( Math.abs($gameMap.adjustX(temp_event._realX + 0.5) - oww*0.5) <= sww*0.5 + 5.5 &&	//（镜头范围+5个图块边框区域） 
			Math.abs($gameMap.adjustY(temp_event._realY + 0.5) - ohh*0.5) <= shh*0.5 + 5.5 ){
		}else{
			continue;
		}
		
		// > 镜头墙 - 左右
		for(var j=0; j<temp_walls.length; j++){
			
			// > 镜头墙 - 左右（循环地图）
			if( $gameMap.isLoopHorizontal() ){
				if( temp_walls[j] == "左" ){
					
					var x_min = rxx - rect_lr_width;
					var x_max = rxx;
					var y_min = ryy - rect_lr_height*0.5 + unit_y;
					var y_max = ryy + rect_lr_height*0.5 + unit_y;
					
					if( $gameTemp.drill_LCa_Math1D_isValueInLoopRange( xx, x_min, x_max, this.width()  ) &&
						$gameTemp.drill_LCa_Math1D_isValueInLoopRange( yy, y_min, y_max, this.height() ) ){
						
						xx = rxx - rect_lr_width;
						break;
					}
				}
				if( temp_walls[j] == "右" ){
					
					var x_min = rxx;
					var x_max = rxx + rect_lr_width;
					var y_min = ryy - rect_lr_height*0.5 + unit_y;
					var y_max = ryy + rect_lr_height*0.5 + unit_y;
					
					if( $gameTemp.drill_LCa_Math1D_isValueInLoopRange( xx, x_min, x_max, this.width()  ) &&
						$gameTemp.drill_LCa_Math1D_isValueInLoopRange( yy, y_min, y_max, this.height() ) ){
						
						xx = rxx + rect_lr_width;
						break;
					}
				}
				
			// > 镜头墙 - 左右（非循环地图）
			}else{
				if( temp_walls[j] == "左" ){
					
					var x_min = rxx - rect_lr_width;
					var x_max = rxx;
					var y_min = ryy - rect_lr_height*0.5 + unit_y;
					var y_max = ryy + rect_lr_height*0.5 + unit_y;
					
					if( xx >= x_min && xx <= x_max &&
						yy >= y_min && yy <= y_max ){
						
						xx = rxx - rect_lr_width;
						break;
					}
				}
				if( temp_walls[j] == "右" ){
					
					var x_min = rxx;
					var x_max = rxx + rect_lr_width;
					var y_min = ryy - rect_lr_height*0.5 + unit_y;
					var y_max = ryy + rect_lr_height*0.5 + unit_y;
					
					if( xx >= x_min && xx <= x_max &&
						yy >= y_min && yy <= y_max ){
						
						xx = rxx + rect_lr_width;
						break;
					}
				}
				
			}
		}
		
		// > 镜头墙 - 上下
		for(var j=0; j<temp_walls.length; j++){
			
			// > 镜头墙 - 上下（循环地图）
			if( $gameMap.isLoopVertical() ){
				if( temp_walls[j] == "上" ){
					
					var x_min = rxx - rect_ud_width*0.5 + unit_x;
					var x_max = rxx + rect_ud_width*0.5 + unit_x;
					var y_min = ryy - rect_ud_height;
					var y_max = ryy;
					
					if( $gameTemp.drill_LCa_Math1D_isValueInLoopRange( xx, x_min, x_max, this.width()  ) &&
						$gameTemp.drill_LCa_Math1D_isValueInLoopRange( yy, y_min, y_max, this.height() ) ){
						
						yy = ryy - rect_ud_height;
						break;
					}
				}
				if( temp_walls[j] == "下" ){
					
					var x_min = rxx - rect_ud_width*0.5 + unit_x;
					var x_max = rxx + rect_ud_width*0.5 + unit_x;
					var y_min = ryy;
					var y_max = ryy + rect_ud_height;
					
					if( $gameTemp.drill_LCa_Math1D_isValueInLoopRange( xx, x_min, x_max, this.width()  ) &&
						$gameTemp.drill_LCa_Math1D_isValueInLoopRange( yy, y_min, y_max, this.height() ) ){
						
						yy = ryy + rect_ud_height;
						break;
					}
				}
				
			// > 镜头墙 - 上下（非循环地图）
			}else{
				if( temp_walls[j] == "上" ){
					
					var x_min = rxx - rect_ud_width*0.5 + unit_x;
					var x_max = rxx + rect_ud_width*0.5 + unit_x;
					var y_min = ryy - rect_ud_height;
					var y_max = ryy;
					
					if( xx >= x_min && xx <= x_max &&
						yy >= y_min && yy <= y_max ){
						
						yy = ryy - rect_ud_height;
						break;
					}
				}
				if( temp_walls[j] == "下" ){
					
					var x_min = rxx - rect_ud_width*0.5 + unit_x;
					var x_max = rxx + rect_ud_width*0.5 + unit_x;
					var y_min = ryy;
					var y_max = ryy + rect_ud_height;
					
					if( xx >= x_min && xx <= x_max &&
						yy >= y_min && yy <= y_max ){
						
						yy = ryy + rect_ud_height;
						break;
					}
				}
				
			}
		}
	}
	
	return { 'x':xx, 'y':yy };
};
//=============================================================================
// * 数学工具 - 循环维度的范围判定
//			
//			参数：	> cur_value  数字（值）
//					> range_min  数字（范围最小值）
//					> range_max  数字（范围最大值）
//					> loop_value 数字（循环维度值）
//			返回：	> 布尔           （值是否在范围内）
//			
//			说明：	> 常用于循环地图 框选范围 用。
//					> 以角度为例，循环维度值为360。角度中的 361度和1度 是一样的。
//					  而且范围为290至370时，5度、722度、310度都包含在范围内。
//=============================================================================
Game_Temp.prototype.drill_LCa_Math1D_isValueInLoopRange = function( cur_value, range_min, range_max, loop_value ){
	var loop = loop_value;
	
	// > 全部点落在范围内
	if( range_max - range_min >= loop ){ return true; }
	
	// > 标准化
	cur_value = (cur_value %loop+loop)%loop;
	range_min = (range_min %loop+loop)%loop;
	range_max = (range_max %loop+loop)%loop;
	
	// > 相等情况
	if( range_min == range_max ){
		return cur_value == range_min;
	}
	
	// > 范围没越过循环 情况
	if( range_min < range_max ){
		if( cur_value < range_min ){ return false; }
		if( cur_value > range_max ){ return false; }
	}
	// > 范围越过循环 情况
	if( range_min > range_max ){
		if( cur_value > range_min && cur_value < range_max ){ return false; }
	}
	return true;
};



//=============================================================================
// ** ☆DEBUG镜头对齐框
//
//			说明：	> 此模块显示完整的DEBUG镜头对齐框，需要通过参数开启。
//					> 子贴图用   == 在图层内 == 无
//					  外部贴图用 == 在图层外 == 下层、中层、上层、图片层、最顶层
//					  所有图层的平移 都不会一起跟着变换
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
if( DrillUp.g_LCa_debugEnabled == true ){
	
	//==============================
	// * 镜头对齐框 - 初始化
	//==============================
	var _drill_LCa_DEBUG_temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function(){
		_drill_LCa_DEBUG_temp_initialize.call(this);
		this._drill_LCa_DEBUG_spriteNeedRefresh = true;
	};
	//==============================
	// * 镜头对齐框 - 初始化
	//==============================
	var _drill_LCa_DEBUG_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function( mapId ){
		_drill_LCa_DEBUG_setup.call( this, mapId );
		$gameTemp._drill_LCa_DEBUG_spriteNeedRefresh = true;
	};
	//==============================
	// * 镜头对齐框 - 帧刷新
	//==============================
	var _drill_LCa_DEBUG_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {	
		_drill_LCa_DEBUG_update.call(this);
		this.drill_LCa_DEBUG_updateRebuild();				//帧刷新 - 重建
		this.drill_LCa_DEBUG_updateSpritePosition();		//帧刷新 - 贴图位置
		this.drill_LCa_DEBUG_updateMousePosition();			//帧刷新 - 鼠标位置
		this.drill_LCa_DEBUG_updateSpriteCameraPos();		//帧刷新 - 贴图
	};
	//==============================
	// * 镜头对齐框 - 帧刷新重建
	//==============================
	Scene_Map.prototype.drill_LCa_DEBUG_updateRebuild = function() {
		if( $gameTemp._drill_LCa_DEBUG_spriteNeedRefresh != true ){ return; }
		$gameTemp._drill_LCa_DEBUG_spriteNeedRefresh = false;
		
		// > 清除旧贴图
		//...
		
		// > 创建贴图
		this._drill_LCa_DEBUG_spriteTank_children = [];			//（子贴图）
		this._drill_LCa_DEBUG_spriteTank_OuterSprite = [];		//（外部贴图）
		this._drill_LCa_DEBUG_spriteTank_mouse = [];			//（鼠标点容器）
		this._drill_LCa_DEBUG_spriteTank_mouseInversed = [];	//（鼠标点容器，逆向十字）
		
		this.drill_LCa_DEBUG_createSquare();
		this.drill_LCa_DEBUG_createLines();
		this.drill_LCa_DEBUG_createMousePoint();
	}
	//==============================
	// * 镜头对齐框 - 创建 - 静态正方形
	//==============================
	Scene_Map.prototype.drill_LCa_DEBUG_createSquare = function() {
		// （这五个正方形处于不同层级，但都是 【静止的】 ）
		
		var data = {};
		data['width'] = 80;
		data['height'] = 80;
		data['thickness'] = 8;
		data['has_up'] = true; 
		data['has_down'] = true; 
		data['has_left'] = true; 
		data['has_right'] = true;
		
		// > 贴图 - 白方形（下层）
		data['color'] = "#ffffff";
		var temp_sprite = new Drill_LCa_DebugSprite( data );
		temp_sprite.x = 100;
		temp_sprite.y = 100;
		this._spriteset._drill_mapDownArea.addChild( temp_sprite );
		
		// > 贴图 - 橙方形（中层）
		data['color'] = "#ff9900";
		var temp_sprite = new Drill_LCa_DebugSprite( data );
		temp_sprite.x = 100 + 80;
		temp_sprite.y = 100;
		this._spriteset._drill_mapCenterArea.addChild( temp_sprite );
		
		// > 贴图 - 黄方形（上层）
		data['color'] = "#ffff00";
		var temp_sprite = new Drill_LCa_DebugSprite( data );
		temp_sprite.x = 100 + 160;
		temp_sprite.y = 100;
		this._spriteset._drill_mapUpArea.addChild( temp_sprite );
		
		// > 贴图 - 红方形（图片层）
		data['color'] = "#ff0000";
		var temp_sprite = new Drill_LCa_DebugSprite( data );
		temp_sprite.x = 100 + 240;
		temp_sprite.y = 100;
		this._spriteset._drill_mapPicArea.addChild( temp_sprite );
		
		// > 贴图 - 蓝方形（最顶层）
		data['color'] = "#0000ff";
		var temp_sprite = new Drill_LCa_DebugSprite( data );
		temp_sprite.x = 100 + 320;
		temp_sprite.y = 100;
		this._drill_SenceTopArea.addChild( temp_sprite );
	};
	//==============================
	// * 镜头对齐框 - 创建 - 框线
	//==============================
	Scene_Map.prototype.drill_LCa_DEBUG_createLines = function() {
		var thickness = 8;
		
		// > 贴图 - 初始白框（中层）
		var data = {};
		data['color'] = "#ffffff";
		data['width'] = Graphics.boxWidth;
		data['height'] = Graphics.boxHeight;
		data['thickness'] = thickness;
		data['has_up'] = true; 
		data['has_down'] = true; 
		data['has_left'] = true; 
		data['has_right'] = true;
		var temp_sprite = new Drill_LCa_DebugSprite( data );
		this._spriteset._drill_mapCenterArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_zeroSprite = temp_sprite;
		
		// > 贴图 - 外包裹灰框（中层）
		var data = {};
		data['color'] = "#666666";
		data['width'] = Graphics.boxWidth - 40;
		data['height'] = Graphics.boxHeight - 40;
		data['thickness'] = 4;
		data['has_up'] = true; 
		data['has_down'] = true; 
		data['has_left'] = true; 
		data['has_right'] = true;
		var temp_sprite = new Drill_LCa_DebugSprite( data );
		this._spriteset._drill_mapCenterArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_packageSprite = temp_sprite;
		
		// > 贴图 - 白线 x4（下层）
		var sprite_list = this.drill_LCa_DEBUG_createFourLine( "#ffffff", 0 );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[0] );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[1] );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[2] );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[3] );
		this._spriteset._drill_mapDownArea.addChild( sprite_list[0] );
		this._spriteset._drill_mapDownArea.addChild( sprite_list[1] );
		this._spriteset._drill_mapDownArea.addChild( sprite_list[2] );
		this._spriteset._drill_mapDownArea.addChild( sprite_list[3] );
		
		// > 贴图 - 橙线 x4（中层）
		var sprite_list = this.drill_LCa_DEBUG_createFourLine( "#ff9900", 1 );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[0] );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[1] );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[2] );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[3] );
		this._spriteset._drill_mapCenterArea.addChild( sprite_list[0] );
		this._spriteset._drill_mapCenterArea.addChild( sprite_list[1] );
		this._spriteset._drill_mapCenterArea.addChild( sprite_list[2] );
		this._spriteset._drill_mapCenterArea.addChild( sprite_list[3] );
		
		// > 贴图 - 黄线 x4（上层）
		var sprite_list = this.drill_LCa_DEBUG_createFourLine( "#ffff00", 2 );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[0] );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[1] );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[2] );
		this._drill_LCa_DEBUG_spriteTank_children.push( sprite_list[3] );
		this._spriteset._drill_mapUpArea.addChild( sprite_list[0] );
		this._spriteset._drill_mapUpArea.addChild( sprite_list[1] );
		this._spriteset._drill_mapUpArea.addChild( sprite_list[2] );
		this._spriteset._drill_mapUpArea.addChild( sprite_list[3] );
		
		// > 贴图 - 红线 x4（图片层）
		var sprite_list = this.drill_LCa_DEBUG_createFourLine( "#ff0000", 3 );
		this._drill_LCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[0] );
		this._drill_LCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[1] );
		this._drill_LCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[2] );
		this._drill_LCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[3] );
		this._spriteset._drill_mapPicArea.addChild( sprite_list[0] );
		this._spriteset._drill_mapPicArea.addChild( sprite_list[1] );
		this._spriteset._drill_mapPicArea.addChild( sprite_list[2] );
		this._spriteset._drill_mapPicArea.addChild( sprite_list[3] );
		
		// > 贴图 - 蓝线 x4（最顶层）
		var sprite_list = this.drill_LCa_DEBUG_createFourLine( "#0000ff", 4 );
		this._drill_LCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[0] );
		this._drill_LCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[1] );
		this._drill_LCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[2] );
		this._drill_LCa_DEBUG_spriteTank_OuterSprite.push( sprite_list[3] );
		this._drill_SenceTopArea.addChild( sprite_list[0] );
		this._drill_SenceTopArea.addChild( sprite_list[1] );
		this._drill_SenceTopArea.addChild( sprite_list[2] );
		this._drill_SenceTopArea.addChild( sprite_list[3] );
		
		//this._spriteset._drill_mapDownArea.addChild( temp_sprite );
		//this._spriteset._drill_mapCenterArea.addChild( temp_sprite );
		//this._spriteset._drill_mapUpArea.addChild( temp_sprite );
		//this._spriteset._drill_mapPicArea.addChild( temp_sprite );
		//this._drill_SenceTopArea.addChild( temp_sprite );
	};
	//==============================
	// * 镜头对齐框 - 创建 - 框线x4
	//==============================
	Scene_Map.prototype.drill_LCa_DEBUG_createFourLine = function( color, pos_index ){
		var thickness = 8;
		var result_list = [];
		
		var data = {};
		data['color'] = color;
		data['width'] = 100;
		data['height'] = 100;
		data['thickness'] = thickness;
		data['has_up'] = true; 
		data['has_left'] = true; 
		var temp_sprite = new Drill_LCa_DebugSprite( data );
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
		var temp_sprite = new Drill_LCa_DebugSprite( data );
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
		var temp_sprite = new Drill_LCa_DebugSprite( data );
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
		var temp_sprite = new Drill_LCa_DebugSprite( data );
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
	Scene_Map.prototype.drill_LCa_DEBUG_createMousePoint = function() {
		
		// > 贴图 - 白圈（鼠标点）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 50, 50 );
		temp_sprite.bitmap.drawCircle( 25, 25, 25, "#ffffff" );
		temp_sprite._org_mx = -25;
		temp_sprite._org_my = -25;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		temp_sprite.zIndex = 100;
		this._spriteset._drill_mapDownArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_mouse.push( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_children.push( temp_sprite );
		
		// > 贴图 - 橙圈（鼠标点）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 40, 40 );
		temp_sprite.bitmap.drawCircle( 20, 20, 20, "#ff9900" );
		temp_sprite._org_mx = -20;
		temp_sprite._org_my = -20;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		temp_sprite.zIndex = 100;
		this._spriteset._drill_mapCenterArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_mouse.push( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_children.push( temp_sprite );
		
		// > 贴图 - 黄圈（鼠标点）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 30, 30 );
		temp_sprite.bitmap.drawCircle( 15, 15, 15, "#ffff00" );
		temp_sprite._org_mx = -15;
		temp_sprite._org_my = -15;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		temp_sprite.zIndex = 100;
		this._spriteset._drill_mapUpArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_mouse.push( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_children.push( temp_sprite );
		
		// > 贴图 - 红圈（鼠标点）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 20, 20 );
		temp_sprite.bitmap.drawCircle( 10, 10, 10, "#ff0000" );
		temp_sprite._org_mx = -10;
		temp_sprite._org_my = -10;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		temp_sprite.zIndex = 100;
		this._spriteset._drill_mapPicArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_mouse.push( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_OuterSprite.push( temp_sprite );
		
		// > 贴图 - 蓝圈（鼠标点）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 10, 10 );
		temp_sprite.bitmap.drawCircle( 5, 5, 5, "#0000ff" );
		temp_sprite._org_mx = -5;
		temp_sprite._org_my = -5;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		temp_sprite.zIndex = 100;
		this._drill_SenceTopArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_mouse.push( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_OuterSprite.push( temp_sprite );
		
		
		// > 贴图 - 白线（逆向十字）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 4, 30 );
		temp_sprite.bitmap.fillAll( "#ffffff" );
		temp_sprite._org_mx = -2;
		temp_sprite._org_my = -30;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		temp_sprite.zIndex = 100;
		this._spriteset._drill_mapDownArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_mouseInversed.push( temp_sprite );
		
		// > 贴图 - 橙线（逆向十字）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 30, 4 );
		temp_sprite.bitmap.fillAll( "#ff9900" );
		temp_sprite._org_mx = -2;
		temp_sprite._org_my = -4;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		temp_sprite.zIndex = 100;
		this._spriteset._drill_mapCenterArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_mouseInversed.push( temp_sprite );
		
		// > 贴图 - 黄线（逆向十字）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 30, 4 );
		temp_sprite.bitmap.fillAll( "#ffff00" );
		temp_sprite._org_mx = -2;
		temp_sprite._org_my = 0;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		temp_sprite.zIndex = 100;
		this._spriteset._drill_mapUpArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_mouseInversed.push( temp_sprite );
		
		// > 贴图 - 红线（逆向十字）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 4, 30 );
		temp_sprite.bitmap.fillAll( "#ff0000" );
		temp_sprite._org_mx = -2;
		temp_sprite._org_my = -2;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		temp_sprite.zIndex = 100;
		this._spriteset._drill_mapPicArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_mouseInversed.push( temp_sprite );
		
		// > 贴图 - 蓝线（逆向十字）
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = new Bitmap( 30, 4 );
		temp_sprite.bitmap.fillAll( "#0000ff" );
		temp_sprite._org_mx = -30;
		temp_sprite._org_my = -2;
		temp_sprite._org_rotation = 0;
		temp_sprite._org_scale_x = 1.0;
		temp_sprite._org_scale_y = 1.0;
		temp_sprite.zIndex = 100;
		this._drill_SenceTopArea.addChild( temp_sprite );
		this._drill_LCa_DEBUG_spriteTank_mouseInversed.push( temp_sprite );
	};
	//==============================
	// * 镜头对齐框 - 帧刷新 贴图位置
	//==============================
	Scene_Map.prototype.drill_LCa_DEBUG_updateSpritePosition = function() {
		
		// > 初始白框偏移位置
		if( this._drill_LCa_DEBUG_zeroSprite != undefined ){
			var camera_offset = $gameSystem._drill_LCa_controller.drill_LCa_getCameraPosOffset();
			this._drill_LCa_DEBUG_zeroSprite.x = -1* camera_offset.x * $gameMap.tileWidth();
			this._drill_LCa_DEBUG_zeroSprite.y = -1* camera_offset.y * $gameMap.tileHeight();
		}
		
		// > 外包裹白框偏移位置
		if( this._drill_LCa_DEBUG_packageSprite != undefined ){
			
			var rect = $gameTemp.drill_LCa_getTileTransformRect( 
							0,0,Graphics.boxWidth,Graphics.boxHeight,
							$gameSystem._drill_LCa_controller._drill_rotation /180*Math.PI,
							$gameSystem._drill_LCa_controller._drill_scaleX,
							$gameSystem._drill_LCa_controller._drill_scaleY
						);
			this._drill_LCa_DEBUG_packageSprite.x = (Graphics.boxWidth - rect.width)*0.5 + 20;
			this._drill_LCa_DEBUG_packageSprite.y = (Graphics.boxHeight - rect.height)*0.5 + 20;
			this._drill_LCa_DEBUG_packageSprite.scale.x = rect.width/Graphics.boxWidth;
			this._drill_LCa_DEBUG_packageSprite.scale.y = rect.height/Graphics.boxHeight;
		}
	};
	//==============================
	// * 镜头对齐框 - 帧刷新 鼠标位置
	//==============================
	Scene_Map.prototype.drill_LCa_DEBUG_updateMousePosition = function() {
		if( this._drill_LCa_DEBUG_spriteTank_mouse == undefined ){ return; }
		if( this._drill_LCa_DEBUG_spriteTank_mouseInversed == undefined ){ return; }
		
		// > 鼠标点跟随鼠标
		for(var i=0; i < this._drill_LCa_DEBUG_spriteTank_mouse.length; i++){
			var temp_sprite = this._drill_LCa_DEBUG_spriteTank_mouse[i];
			if( temp_sprite == undefined ){ continue; }
			temp_sprite._org_x = temp_sprite._org_mx + _drill_mouse_x;
			temp_sprite._org_y = temp_sprite._org_my + _drill_mouse_y;
		}
		
		// > 逆向十字跟随鼠标
		for(var i=0; i < this._drill_LCa_DEBUG_spriteTank_mouseInversed.length; i++){
			var temp_sprite = this._drill_LCa_DEBUG_spriteTank_mouseInversed[i];
			if( temp_sprite == undefined ){ continue; }
			var xx = temp_sprite._org_mx;
			var yy = temp_sprite._org_my;
			
			if( i <= 2 ){
				
				// > 地图鼠标落点（子贴图用）
				var camera_pos = $gameSystem._drill_LCa_controller.drill_LCa_getMousePos_OnChildren();
				xx += camera_pos.x;
				yy += camera_pos.y;
				
			}else{
				
				// > 地图鼠标落点（外部贴图用）
				var mouse_pos = $gameSystem._drill_LCa_controller.drill_LCa_getMousePos_OnOuterSprite();
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
	Scene_Map.prototype.drill_LCa_DEBUG_updateSpriteCameraPos = function() {
		if( this._drill_LCa_DEBUG_spriteTank_children == undefined ){ return; }
		if( this._drill_LCa_DEBUG_spriteTank_OuterSprite == undefined ){ return; }
		
		
		// > 在图层内（白、橙、黄）
		for(var i=0; i < this._drill_LCa_DEBUG_spriteTank_children.length; i++){
			var temp_sprite = this._drill_LCa_DEBUG_spriteTank_children[i];
			if( temp_sprite == undefined ){ continue; }
			
			var xx = temp_sprite._org_x;
			var yy = temp_sprite._org_y;
				
			// > 镜头变换位置
			var camera_pos = $gameSystem._drill_LCa_controller.drill_LCa_getCameraPos_Children();
			xx -= camera_pos.x;
			yy -= camera_pos.y;
			
			temp_sprite.x = xx;
			temp_sprite.y = yy;
		}
		
		// > 在图层外（红、蓝）
		for(var i=0; i < this._drill_LCa_DEBUG_spriteTank_OuterSprite.length; i++){
			var temp_sprite = this._drill_LCa_DEBUG_spriteTank_OuterSprite[i];
			if( temp_sprite == undefined ){ continue; }
			
			var xx = temp_sprite._org_x;
			var yy = temp_sprite._org_y;
			
			// > 镜头变换位置
			var camera_pos = $gameSystem._drill_LCa_controller.drill_LCa_getCameraPos_OuterSprite( xx, yy );
			xx = camera_pos.x;
			yy = camera_pos.y;
			
			temp_sprite.x = xx;
			temp_sprite.y = yy;
			
			// > 要考虑旋转情况
			temp_sprite.rotation = temp_sprite._org_rotation + $gameSystem._drill_LCa_controller.drill_LCa_getRotateValue() /180*Math.PI;
			
			// > 要考虑缩放情况
			temp_sprite.scale.x = temp_sprite._org_scale_x * $gameSystem._drill_LCa_controller.drill_LCa_getScaleXValue();
			temp_sprite.scale.y = temp_sprite._org_scale_y * $gameSystem._drill_LCa_controller.drill_LCa_getScaleYValue();
		}
	}
}

//=============================================================================
// ** 镜头对齐框 贴图【Drill_LCa_DebugSprite】
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
function Drill_LCa_DebugSprite() {
	this.initialize.apply(this, arguments);
}
Drill_LCa_DebugSprite.prototype = Object.create(Sprite.prototype);
Drill_LCa_DebugSprite.prototype.constructor = Drill_LCa_DebugSprite;
//==============================
// * 对齐框贴图 - 初始化
//==============================
Drill_LCa_DebugSprite.prototype.initialize = function( data ){
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
	this.zIndex = 100;
};
//==============================
// * 对齐框贴图 - 帧刷新
//==============================
Drill_LCa_DebugSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	this.drill_updateRedraw();				//帧刷新 - 重画边框
};
//==============================
// * 帧刷新 - 重画边框
//==============================
Drill_LCa_DebugSprite.prototype.drill_updateRedraw = function() {
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
// * ☆其他插件兼容
//=============================================================================
var _drill_LCa_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {	//（最后继承）
	_drill_LCa_scene_initialize.call(this);
	
	//==============================
	// * 兼容 - mog道具浮动文字
	//==============================
	if( Imported.MOG_TreasurePopup ){
		var _drill_LCa_mog_setupNew = TreasureIcons.prototype.setupNew;
		TreasureIcons.prototype.setupNew = function( data ){
			_drill_LCa_mog_setupNew.call( this, data );
			
			// > mog的贴图在 图片层
			var tar_pos = $gameSystem._drill_LCa_controller.drill_LCa_getCameraPos_OuterSprite( this._cx, this._cy );
			this._cx = tar_pos.x;
			this._cy = tar_pos.y;
		}
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_LayerCamera = false;
		var pluginTip = DrillUp.drill_LCa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}



