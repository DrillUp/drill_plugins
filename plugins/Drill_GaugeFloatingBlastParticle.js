//=============================================================================
// Drill_GaugeFloatingBlastParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        地图UI - 临时粒子小爆炸
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子样式-%d"
 * @Drill_LE_parentKey "---粒子样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_GFBPa_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_GaugeFloatingBlastParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以通过插件指令播放一个粒子小爆炸的临时动画。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfParticle       系统-粒子核心★★v1.2及以上★★
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于界面的各图层。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
 *   临时配置相关内容，去看看文档 "13.UI > 关于临时配置与模板.docx"。
 * 细节：
 *   (1.粒子小爆炸是一个插件指令直接控制的动画。
 *      此动画需要指定 地图层级 和 坐标 。
 *   (2.粒子小爆炸只支持 基础粒子 功能，不支持 复杂粒子 功能。
 *      比如不能彩虹化、不支持遮罩。
 * 设计：
 *   (1.你可以在某个道具事件拾取触发后，给地图UI的变量框播放粒子小爆炸
 *      提醒效果，让玩家注意到某道具的数量增加了。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__anim （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__anim文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 粒子样式-1 资源-粒子
 * 粒子样式-2 资源-粒子
 * 粒子样式-3 资源-粒子
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 简单临时配置
 * 你可以通过插件指令快速生成对象：
 * 
 * 插件指令：>地图临时粒子小爆炸 : 简单临时配置 : 位置[100,200] : 样式[1]
 * 插件指令：>地图临时粒子小爆炸 : 简单临时配置 : 位置变量[25,26] : 样式[1]
 * 插件指令：>地图临时粒子小爆炸 : 简单临时配置 : 位置-玩家 : 样式[1]
 * 插件指令：>地图临时粒子小爆炸 : 简单临时配置 : 位置-本事件 : 样式[1]
 * 插件指令：>地图临时粒子小爆炸 : 简单临时配置 : 位置-事件[10] : 样式[1]
 * 插件指令：>地图临时粒子小爆炸 : 简单临时配置 : 位置-事件变量[21] : 样式[1]
 * 插件指令：>地图临时粒子小爆炸 : 简单临时配置 : 位置-图块[10] : 样式[1]
 * 插件指令：>地图临时粒子小爆炸 : 简单临时配置 : 位置-图块变量[21] : 样式[1]
 * 插件指令：>地图临时粒子小爆炸 : 简单临时配置 : 位置-鼠标 : 样式[1]
 * 
 * 1.临时配置创建小爆炸后，持续时间结束会自动清掉。
 *   切换菜单或离开地图也会清掉粒子小爆炸效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 高级临时配置
 * 你可以通过插件指令控制临时配置的具体参数：
 * 
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 初始化 : 样式[1]
 * 
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-混合模式 : 混合模式[0]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-UI基准 : 相对于地图
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-UI基准 : 相对于镜头
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-地图层级 : 下层
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-地图层级 : 中层
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-地图层级 : 上层
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-地图层级 : 图片层
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-地图层级 : 最顶层
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-图片层级 : 图片层级[4]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子数量 : 数量[15]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子数量 : 数量变量[21]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子生命周期 : 时长[45]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子生命周期 : 时长变量[21]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子自旋转初始角度 : 角度[90.0]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子自旋转初始角度 : 角度变量[21]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子固定方向 : 角度[90.0]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子固定方向 : 角度变量[21]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子扇形朝向 : 角度[90.0]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子扇形朝向 : 角度变量[21]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子初速度 : 速度[2.5]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 修改样式属性-粒子缩放值 : 缩放[1.0]
 * 
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 创建 : 位置[100,200]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 创建 : 位置变量[25,26]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 创建 : 位置-玩家
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 创建 : 位置-本事件
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 创建 : 位置-事件[10]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 创建 : 位置-事件变量[21]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 创建 : 位置-图块[10]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 创建 : 位置-图块变量[21]
 * 插件指令：>地图临时粒子小爆炸 : 临时配置 : 创建 : 位置-鼠标
 * 
 * 1.插件指令需要先后执行： 初始化、修改样式属性、创建 。
 *   如果 样式属性 不需要变化，直接先后执行： 初始化、创建 即可。
 *   临时配置创建小爆炸后就开始播放了，这时候 "修改样式属性" 无效。
 * 2.临时配置创建小爆炸后，持续时间结束会自动清掉。
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
 * 测试方法：   在UI管理层中通过插件指令播放20个粒子小爆炸。
 * 测试结果：   200个事件的地图中，平均消耗为：【53.82ms】
 *              100个事件的地图中，平均消耗为：【54.21ms】
 *               50个事件的地图中，平均消耗为：【37.18ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.粒子小爆炸的数量较多，由于一次性播放粒子数量的比较多，会产生
 *   一定的消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了粒子 彩虹化 功能。
 * [v1.2]
 * 翻新并兼容了新的粒子底层。
 * 
 * 
 * 
 *
 * @param ---粒子样式组 1至20---
 * @default
 *
 * @param 粒子样式-1
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-2
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-3
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-4
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-5
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-6
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-7
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-8
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-9
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-10
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-11
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-12
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-13
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-14
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-15
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-16
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-17
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-18
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-19
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-20
 * @parent ---粒子样式组 1至20---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组21至40---
 * @default
 *
 * @param 粒子样式-21
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-22
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-23
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-24
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-25
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-26
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-27
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-28
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-29
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-30
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-31
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-32
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-33
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-34
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-35
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-36
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-37
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-38
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-39
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-40
 * @parent ---粒子样式组21至40---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组41至60---
 * @default
 *
 * @param 粒子样式-41
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-42
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-43
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-44
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-45
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-46
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-47
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-48
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-49
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-50
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-51
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-52
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-53
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-54
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-55
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-56
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-57
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-58
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-59
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-60
 * @parent ---粒子样式组41至60---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组61至80---
 * @default
 *
 * @param 粒子样式-61
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-62
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-63
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-64
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-65
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-66
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-67
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-68
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-69
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-70
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-71
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-72
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-73
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-74
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-75
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-76
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-77
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-78
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-79
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-80
 * @parent ---粒子样式组61至80---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组81至100---
 * @default
 *
 * @param 粒子样式-81
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-82
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-83
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-84
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-85
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-86
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-87
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-88
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-89
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-90
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-91
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-92
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-93
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-94
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-95
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-96
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-97
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-98
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-99
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-100
 * @parent ---粒子样式组81至100---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组101至120---
 * @default
 *
 * @param 粒子样式-101
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-102
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-103
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-104
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-105
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-106
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-107
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-108
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-109
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-110
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-111
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-112
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-113
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-114
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-115
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-116
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-117
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-118
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-119
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-120
 * @parent ---粒子样式组101至120---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组121至140---
 * @default
 *
 * @param 粒子样式-121
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-122
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-123
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-124
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-125
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-126
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-127
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-128
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-129
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-130
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-131
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-132
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-133
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-134
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-135
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-136
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-137
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-138
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-139
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-140
 * @parent ---粒子样式组121至140---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组141至160---
 * @default
 *
 * @param 粒子样式-141
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-142
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-143
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-144
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-145
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-146
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-147
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-148
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-149
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-150
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-151
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-152
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-153
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-154
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-155
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-156
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-157
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-158
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-159
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-160
 * @parent ---粒子样式组141至160---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组161至180---
 * @default
 *
 * @param 粒子样式-161
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-162
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-163
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-164
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-165
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-166
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-167
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-168
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-169
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-170
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-171
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-172
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-173
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-174
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-175
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-176
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-177
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-178
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-179
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-180
 * @parent ---粒子样式组161至180---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param ---粒子样式组181至200---
 * @default
 *
 * @param 粒子样式-181
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-182
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-183
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-184
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-185
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-186
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-187
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-188
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-189
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-190
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-191
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-192
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-193
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-194
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-195
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-196
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-197
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-198
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-199
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-200
 * @parent ---粒子样式组181至200---
 * @type struct<GFBPaStyle>
 * @desc 粒子小爆炸样式的详细配置信息。
 * @default 
 */
/*~struct~GFBPaStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的粒子小爆炸样式==
 * 
 * 
 * @param ---贴图---
 * @desc 
 *
 * @param 资源-粒子
 * @parent ---贴图---
 * @desc 粒子的图片资源。
 * @default (需配置)地图临时粒子小爆炸
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 * @param 图像-色调值
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 360
 * @desc 资源图像的色调值。
 * @default 0
 *
 * @param 图像-模糊边缘
 * @parent ---贴图---
 * @type boolean
 * @on 模糊
 * @off 关闭
 * @desc 此参数可以看看："0.基本定义 > 缩放模式.docx"。设置模糊后，缩放时可以模糊资源图像的边缘，防止出现像素锯齿。
 * @default false
 *
 * @param 平移-粒子 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。正数向右，负数向左。
 * @default 0
 *
 * @param 平移-粒子 Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。正数向下，负数向上。
 * @default 0
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type select
 * @option 普通
 * @value 0
 * @option 发光
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @option 叠加
 * @value 4
 * @desc 此参数可以看看："0.基本定义 > 混合模式.docx"。pixi的渲染混合模式。0-普通,1-发光,2-实色混合,3-浅色,4-叠加。
 * @default 0
 *
 * @param UI基准
 * @parent ---贴图---
 * @type select
 * @option 相对于地图
 * @value 相对于地图
 * @option 相对于镜头
 * @value 相对于镜头
 * @desc 相对于镜头的漂浮文字，会与镜头位置保持一致。相对于地图的漂浮文字，会与地图坐标保持一致。
 * @default 相对于地图
 *
 * @param 地图层级
 * @parent ---贴图---
 * @type select
 * @option 下层
 * @value 下层
 * @option 中层
 * @value 中层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 粒子所属的层级
 * @default 图片层
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 粒子在同一个地图层级时，先后排序的位置，0表示最后面。
 * @default 4
 * 
 * 
 * @param ---粒子效果---
 * @desc 
 * 
 * @param 粒子数量
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 出现的粒子数量。
 * @default 15
 *
 * @param 粒子生命周期
 * @parent ---粒子效果---
 * @type number
 * @min 5
 * @desc 一个粒子从显现到消失的周期时长，单位帧。(1秒60帧)
 * @default 45
 *
 * @param 粒子弹道是否倒放
 * @parent ---粒子效果---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭，粒子弹道完全倒放。比如 四周扩散效果 变成 四周吸收效果。
 * @default false
 *
 * @param 粒子出现范围
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 以目标中心为圆心，指定半径的圆形区域内会出现粒子，半径单位像素。设置0表示粒子全部集中于圆心。
 * @default 0
 *
 * @param 粒子方向模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定方向
 * @value 固定方向
 * @option 四周扩散(线性)
 * @value 四周扩散(线性)
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 扇形范围方向(线性)
 * @value 扇形范围方向(线性)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 四周扩散(线性)
 *
 * @param 粒子固定方向
 * @parent 粒子方向模式
 * @desc 方向模式为"固定方向"时，碎片固定方向的角度值。0朝右，90朝下，180朝左，270朝上。
 * @default 90.0
 * 
 * @param 粒子扇形朝向
 * @parent 粒子方向模式
 * @desc 方向模式为"扇形范围方向"时，扇形的朝向角度。0朝右，90朝下，180朝左，270朝上。
 * @default 45.0
 * 
 * @param 粒子扇形角度
 * @parent 粒子方向模式
 * @desc 方向模式为"扇形范围方向"时，扇形弧的角度数。
 * @default 30.0
 *
 * @param 粒子速度模式
 * @parent ---粒子效果---
 * @type select
 * @option 只初速度
 * @value 只初速度
 * @option 初速度+波动量
 * @value 初速度+波动量
 * @desc 粒子出现后，移动速度的模式设置。
 * @default 只初速度
 * 
 * @param 粒子初速度
 * @parent 粒子速度模式
 * @desc 粒子的基本速度，单位 像素/帧。
 * @default 2.5
 * 
 * @param 粒子速度随机波动量
 * @parent 粒子速度模式
 * @desc 粒子速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 2.0
 *
 * @param 粒子透明度模式
 * @parent ---粒子效果---
 * @type select
 * @option 逐渐消失
 * @value 逐渐消失
 * @option 保持原透明度
 * @value 保持原透明度
 * @option 等一半时间后逐渐消失
 * @value 等一半时间后逐渐消失
 * @option 先显现后消失(慢速)
 * @value 先显现后消失(慢速)
 * @option 先显现后消失
 * @value 先显现后消失
 * @option 先显现后消失(快速)
 * @value 先显现后消失(快速)
 * @option 一闪一闪
 * @value 一闪一闪
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 先显现后消失
 *
 * @param 粒子自旋转模式
 * @parent ---粒子效果---
 * @type select
 * @option 随机角度
 * @value 随机角度
 * @option 固定角度
 * @value 固定角度
 * @option 始终与朝向一致
 * @value 始终与朝向一致
 * @desc 粒子自旋转的模式。
 * @default 固定角度
 *
 * @param 粒子自旋转初始角度
 * @parent 粒子自旋转模式
 * @desc 粒子自旋转的初始角度，单位角度。
 * @default 0.0
 *
 * @param 粒子自旋转速度
 * @parent 粒子自旋转模式
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 10.0
 *
 * @param 粒子缩放模式
 * @parent ---粒子效果---
 * @type select
 * @option 固定缩放值
 * @value 固定缩放值
 * @option 缩放值+波动量
 * @value 缩放值+波动量
 * @desc 粒子出现后，缩放的模式设置。
 * @default 固定缩放值
 * 
 * @param 粒子缩放值
 * @parent 粒子缩放模式
 * @desc 粒子的缩放大小，1.0 表示 100%。
 * @default 1.0
 * 
 * @param 粒子缩放随机波动量
 * @parent 粒子缩放模式
 * @desc 粒子缩放上下随机浮动的量。比如值为 0.2，则随机浮动范围为 -0.1 ~ 0.1 之间。
 * @default 0.2
 * 
 * 
 * @param ---双层效果---
 * @default 
 *
 * @param 是否开启双层效果
 * @parent ---双层效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default false
 *
 * @param 资源-第二层粒子
 * @parent ---双层效果---
 * @desc 第二层粒子的图片资源。
 * @default (需配置)第二层粒子
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 * @param 第二层粒子地图层级
 * @parent ---双层效果---
 * @type select
 * @option 下层
 * @value 下层
 * @option 中层
 * @value 中层
 * @option 上层
 * @value 上层
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 第二层粒子所属的层级。
 * @default 图片层
 *
 * @param 第二层粒子图片层级
 * @parent ---双层效果---
 * @type number
 * @min 0
 * @desc 第二层粒子，先后排序的位置，0表示最后面。
 * @default 3
 * 
 * 
 * @param ---随机种子---
 * @desc 
 *
 * @param 是否固定随机种子
 * @parent ---随机种子---
 * @type boolean
 * @on 固定
 * @off 关闭
 * @desc true - 固定，false - 关闭，固定随机种子，能使得所有该样式的粒子，随机轨迹都一模一样。
 * @default false
 * 
 * @param 固定随机种子
 * @parent 是否固定随机种子
 * @desc 固定的随机种子值，范围在0.0000至1.0000之间。
 * @default 0.20221002
 * 
 * 
 * @param ---直线拖尾效果---
 * @desc 
 *
 * @param 是否开启直线拖尾效果
 * @parent ---直线拖尾效果---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，拖尾贴图会根据粒子的方向进行旋转。
 * @default false
 *
 * @param 是否固定拖尾在粒子中心
 * @parent ---直线拖尾效果---
 * @type boolean
 * @on 固定在中心
 * @off 正右方锚点
 * @desc true - 固定在中心，false - 正右方锚点。
 * @default false
 *
 * @param 资源-直线拖尾
 * @parent ---直线拖尾效果---
 * @desc 粒子的图片资源。
 * @default (需配置)地图临时粒子小爆炸直线拖尾贴图
 * @require 1
 * @dir img/Special__anim/
 * @type file
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		GFBPa（Gauge_Floating_Blast_Particle）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	UI管理层
//		★性能测试消耗	2024/5/10：
//							》48.3ms（Drill_GFBPa_Sprite.update）
//						2026/7/17：
//							》14.8ms（Drill_GFBPa_Sprite.update）3.5ms（Drill_GFBPa_Sprite.drill_sprite_updateTransform_Position）
//		★最坏情况		大量粒子被同时创建并播放。
//		★备注			因为鼠标点击时播放粒子小爆炸的功能是事件写的，所以点击频率会较大影响性能消耗情况。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//				->简单临时配置
//				->高级临时配置
//			->☆地图层级
//			
//			->☆临时配置
//				->高级临时配置 初始化
//				->高级临时配置 创建
//				->修改样式属性
//			->☆贴图控制
//				->帧刷新（地图界面）
//			
//			->小爆炸粒子控制器【Drill_GFBPa_Controller】
//				->2Z镜头参数
//			->小爆炸粒子贴图【Drill_GFBPa_Sprite】
//			->小爆炸粒子贴图（第二层）【Drill_GFBPa_SecSprite】
//			
//			
//		★家谱：
//			大家族-粒子效果
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//		
//		★插件私有类：
//			* 小爆炸粒子控制器【Drill_GFBPa_Controller】
//			* 小爆炸粒子贴图【Drill_GFBPa_Sprite】
//			* 小爆炸粒子贴图（第二层）【Drill_GFBPa_SecSprite】
//		
//		★必要注意事项：
//			1.插件继承至 粒子核心。
//			  核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//			2.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//				_drill_animPBackArea 			父贴图后面层
//				_drill_animPFrontArea			父贴图前面层
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
	DrillUp.g_GFBPa_PluginTip_curName = "Drill_GaugeFloatingBlastParticle.js 动画-粒子小爆炸";
	DrillUp.g_GFBPa_PluginTip_baseList = ["Drill_CoreOfParticle.js 系统-粒子核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_GFBPa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_GFBPa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_GFBPa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_GFBPa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_GFBPa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_GFBPa_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_GFBPa_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_GFBPa_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_GFBPa_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - 临时配置 未初始化
	//==============================
	DrillUp.drill_GFBPa_getPluginTip_BufferIsNull = function(){
		return "【" + DrillUp.g_GFBPa_PluginTip_curName + "】\n插件指令错误，你使用高级临时配置时，未执行临时配置的初始化指令。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_GFBPa_getPluginTip_NeedUpdate_Particle = function(){
		return "【" + DrillUp.g_GFBPa_PluginTip_curName + "】\n粒子核心插件版本过低，你需要更新 粒子核心 至少v1.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_GaugeFloatingBlastParticle = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_GaugeFloatingBlastParticle');
	
	//==============================
	// * 静态数据 - 粒子样式
	//				（~struct~GFBPaStyle）
	//==============================
	DrillUp.drill_GFBPa_particleInit = function( dataFrom ){
		var data = {};
		
		// > A主体 - 基础特性
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/Special__anim/";
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = true;
		data['pause'] = false;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = String( dataFrom["地图层级"] || "图片层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 4);
		
		// > A主体 - 其它特性
		data['benchmark'] = String( dataFrom["UI基准"] || "相对于镜头");
		data['parEx_x'] = 0;	//（位置）
		data['parEx_y'] = 0;
		data['offsetEx_x'] = 0;	//（额外位置偏移）
		data['offsetEx_y'] = 0;
		
		
		// > B变换特性
		data['opacity'] = 255;
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
		
		data['par_birthRange'] = Number( dataFrom["粒子出现范围"] || 32);
		
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = String( dataFrom["粒子透明度模式"] || "先显现后消失");
		
		data['par_selfRotateMode'] = String( dataFrom["粒子自旋转模式"] || "固定角度");
		data['par_selfRotateFix'] = Number( dataFrom["粒子自旋转初始角度"] || 0.0);
		data['par_selfRotateSpeed'] = Number( dataFrom["粒子自旋转速度"] || 1.5);
		
		data['par_scaleMode'] = String( dataFrom["粒子缩放模式"] || "固定缩放值");
		data['par_scaleBase'] = Number( dataFrom["粒子缩放值"] || 1.0);
		data['par_scaleRandom'] = Number( dataFrom["粒子缩放随机波动量"] || 0.2);
		
		// > I随机因子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > J粒子变化（无）
		
		// > K粒子重设（无）
		
		// > L粒子生命周期（无）
		
		
		// > O贴图加载（无）
		
		// > P直线拖尾贴图
		data['trailing_enable'] = String( dataFrom["是否开启直线拖尾效果"] || "false") == "true";
		data['trailing_centerAnchor'] = String( dataFrom["是否固定拖尾在粒子中心"] || "false") == "true";
		data['trailing_src_img'] = String( dataFrom["资源-直线拖尾"] || "");
		data['trailing_src_img_file'] = "img/Special__anim/";
		
		// > Q双层效果
		data['second_enable'] = String( dataFrom["是否开启双层效果"] || "false") == "true";
		data['second_src_img'] = String( dataFrom["资源-第二层粒子"] || "");
		data['second_layerIndex'] = String( dataFrom["第二层粒子地图层级"] || "图片层");
		data['second_zIndex'] = Number( dataFrom["第二层粒子图片层级"] || 3);
		
		
		// > 2A粒子类型
		data['parType_type'] = "基础粒子";  //（就应用场景而言，用 复杂粒子 非常浪费性能，所以功能关了）
		
		// > 2B彩虹化（无）
		
		// > 控制器 - 『控制器与贴图的样式-临时配置-指针初始化』
		Drill_GFBPa_Controller.drill_controller_initData( data );
		
		return data;
	}
	//==============================
	// * 静态数据 - 最后继承1级
	//==============================
	var _drill_GFBPa_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_GFBPa_scene_initialize.call(this);
		
		/*-----------------粒子------------------*/
		for( var i = 0; i < DrillUp.g_GFBPa_style.length; i++ ){
			var temp = DrillUp.g_GFBPa_style[i];
			if( temp != undefined ){
				DrillUp.g_GFBPa_style[i] = DrillUp.drill_GFBPa_particleInit( temp );
			}
		}
	}
	/*-----------------粒子------------------*/
	DrillUp.g_GFBPa_style_length = 200;
	DrillUp.g_GFBPa_style = [];
	for (var i = 0; i < DrillUp.g_GFBPa_style_length; i++) {
		if( DrillUp.parameters["粒子样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["粒子样式-" + String(i+1) ] != "" ){
			DrillUp.g_GFBPa_style[i] = JSON.parse(DrillUp.parameters["粒子样式-" + String(i+1) ]);
		}else{
			DrillUp.g_GFBPa_style[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfParticle ){
	
	if( typeof(Drill_COPa_ComplexPar_Controller) == "undefined" ){	//（粒子核心版本检测）
		alert( DrillUp.drill_GFBPa_getPluginTip_NeedUpdate_Particle() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_GFBPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_GFBPa_pluginCommand.call(this, command, args);
	this.drill_GFBPa_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_GFBPa_pluginCommand = function( command, args ){
	if( command === ">地图临时粒子小爆炸" ){
		
		
		/*-----------------简单临时配置------------------*/
		if( args.length >= 6 ){		//（考虑变化参数数量情况）
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "简单临时配置" || type == "简单临时对象" ){
				
				var pos = null;
				var tw = $gameMap.tileWidth();
				var th = $gameMap.tileHeight();
				if( temp1.indexOf("位置变量[") != -1 ){
					temp1 = temp1.replace("位置变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ $gameVariables.value(Number(temp1[0])), 
							$gameVariables.value(Number(temp1[1])) ];
				}
				else if( temp1.indexOf("位置[") != -1 ){
					temp1 = temp1.replace("位置[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Number(temp1[0]), 
							Number(temp1[1]) ];
				}
				else if( temp1 == "位置-本事件" || temp1 == "本事件" ){
					var e = $gameMap.event( this._eventId );
					if( e == undefined ){ return; } //『防止并行删除事件出错』
					var e_pos = [ e._realX, e._realY ];
					pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
							Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
				}
				else if( temp1 == "位置-玩家" || temp1 == "玩家" ){
					var e_pos = [ $gamePlayer._realX, $gamePlayer._realY ];
					pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
							Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
				}
				else if( temp1 == "位置-鼠标" || temp1 == "鼠标位置" ){
					pos = [ _drill_mouse_x, _drill_mouse_y ];
				}
				else if( temp1 == "位置-事件变量[" || temp1.indexOf("事件变量[") != -1 ){
					temp1 = temp1.replace("位置-事件变量[","");
					temp1 = temp1.replace("事件变量[","");
					temp1 = temp1.replace("]","");
					var e_id = $gameVariables.value(Number(temp1));
					if( $gameMap.drill_GFBPa_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					var e_pos = [ e._realX, e._realY ];
					pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
							Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
				}
				else if( temp1 == "位置-事件[" || temp1.indexOf("事件[") != -1 ){
					temp1 = temp1.replace("位置-事件[","");
					temp1 = temp1.replace("事件[","");
					temp1 = temp1.replace("]","");
					var e_id = Number(temp1);
					if( $gameMap.drill_GFBPa_isEventExist( e_id ) == false ){ return; }
					var e = $gameMap.event( e_id );
					var e_pos = [ e._realX, e._realY ];
					pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
							Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
				}
				else if( temp1 == "位置-图块变量[" || temp1.indexOf("图块变量[") != -1 ){
					temp1 = temp1.replace("位置-图块变量[","");
					temp1 = temp1.replace("图块变量[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Math.round( $gameMap.adjustX( $gameVariables.value(Number(temp1[0])) ) * tw + tw*0.5 ), 
							Math.round( $gameMap.adjustY( $gameVariables.value(Number(temp1[1])) ) * th + th*0.5 ) ];
				}
				else if( temp1 == "位置-图块[" || temp1.indexOf("图块[") != -1 ){
					temp1 = temp1.replace("位置-图块[","");
					temp1 = temp1.replace("图块[","");
					temp1 = temp1.replace("]","");
					temp1 = temp1.split(/[,，]/);
					pos = [ Math.round( $gameMap.adjustX( Number(temp1[0]) ) * tw + tw*0.5 ), 
							Math.round( $gameMap.adjustY( Number(temp1[1]) ) * th + th*0.5 ) ];
				}
				
				if( pos != null ){
					temp2 = temp2.replace("样式[","");
					temp2 = temp2.replace("]","");
					temp2 = Number(temp2)-1;
					$gameTemp.drill_GFBPa_createSimple( pos, temp2 );
				}
			}
		}
		
		
		/*-----------------高级临时配置 - 初始化------------------*/
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时配置" || unit == "临时对象" ){
				if( type == "初始化" ){
					temp1 = temp1.replace("样式[","");
					temp1 = temp1.replace("]","");
					temp1 = Number(temp1)-1;
					$gameTemp.drill_GFBPa_setBuffer( temp1 );
				}
			}
		}
		
		/*-----------------高级临时配置 - 修改样式属性------------------*/
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时配置" || unit == "临时对象" ){
				
				if( type == "修改样式属性-混合模式" ){
					temp1 = temp1.replace("混合模式[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_GFBPa_setStyle_blendMode( Number(temp1) );
				}
				if( type == "修改样式属性-UI基准" ){
					$gameTemp.drill_GFBPa_setStyle_benchmark( temp1 );
				}
				if( type == "修改样式属性-地图层级" ){
					$gameTemp.drill_GFBPa_setStyle_layerIndex( temp1 );
				}
				if( type == "修改样式属性-图片层级" ){
					temp1 = temp1.replace("图片层级[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_GFBPa_setStyle_zIndex( Number(temp1) );
				}
				if( type == "修改样式属性-粒子数量" ){
					if( temp1.indexOf("数量变量[") != -1 ){
						temp1 = temp1.replace("数量变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_GFBPa_setStyle_parCount( temp1 );
					}
					else if( temp1.indexOf("数量[") != -1 ){
						temp1 = temp1.replace("数量[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_GFBPa_setStyle_parCount( temp1 );
					}
				}
				if( type == "修改样式属性-粒子生命周期" ){
					if( temp1.indexOf("时长变量[") != -1 ){
						temp1 = temp1.replace("时长变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_GFBPa_setStyle_parLife( temp1 );
					}
					else if( temp1.indexOf("时长[") != -1 ){
						temp1 = temp1.replace("时长[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_GFBPa_setStyle_parLife( temp1 );
					}
				}
				if( type == "修改样式属性-粒子自旋转初始角度" ){
					if( temp1.indexOf("角度变量[") != -1 ){
						temp1 = temp1.replace("角度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_GFBPa_setStyle_parSelfRotateFix( temp1 );
					}
					else if( temp1.indexOf("角度[") != -1 ){
						temp1 = temp1.replace("角度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_GFBPa_setStyle_parSelfRotateFix( temp1 );
					}
				}
				if( type == "修改样式属性-粒子固定方向" ){
					if( temp1.indexOf("角度变量[") != -1 ){
						temp1 = temp1.replace("角度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_GFBPa_setStyle_parDirFix( temp1 );
					}
					else if( temp1.indexOf("角度[") != -1 ){
						temp1 = temp1.replace("角度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_GFBPa_setStyle_parDirFix( temp1 );
					}
				}
				if( type == "修改样式属性-粒子扇形朝向" ){
					if( temp1.indexOf("角度变量[") != -1 ){
						temp1 = temp1.replace("角度变量[","");
						temp1 = temp1.replace("]","");
						temp1 = $gameVariables.value(Number(temp1));
						$gameTemp.drill_GFBPa_setStyle_parDirSectorFace( temp1 );
					}
					else if( temp1.indexOf("角度[") != -1 ){
						temp1 = temp1.replace("角度[","");
						temp1 = temp1.replace("]","");
						temp1 = Number(temp1);
						$gameTemp.drill_GFBPa_setStyle_parDirSectorFace( temp1 );
					}
				}
				if( type == "修改样式属性-粒子初速度" ){
					temp1 = temp1.replace("速度[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_GFBPa_setStyle_parSpeedBase( Number(temp1) );
				}
				if( type == "修改样式属性-粒子缩放值" ){
					temp1 = temp1.replace("缩放[","");
					temp1 = temp1.replace("]","");
					$gameTemp.drill_GFBPa_setStyle_parScaleBase( Number(temp1) );
				}
			}
		}
		
		/*-----------------高级临时配置 - 创建------------------*/
		if( args.length == 6 ){	
			var unit = String(args[1]);
			var type = String(args[3]);
			var temp1 = String(args[5]);
			if( unit == "临时配置" || unit == "临时对象" ){
				if( type == "创建" ){
					
					var pos = null;
					var tw = $gameMap.tileWidth();
					var th = $gameMap.tileHeight();
					if( temp1.indexOf("位置变量[") != -1 ){
						temp1 = temp1.replace("位置变量[","");
						temp1 = temp1.replace("]","");
						temp1 = temp1.split(/[,，]/);
						pos = [ $gameVariables.value(Number(temp1[0])), 
								$gameVariables.value(Number(temp1[1])) ];
					}
					else if( temp1.indexOf("位置[") != -1 ){
						temp1 = temp1.replace("位置[","");
						temp1 = temp1.replace("]","");
						temp1 = temp1.split(/[,，]/);
						pos = [ Number(temp1[0]), 
								Number(temp1[1]) ];
					}
					else if( temp1 == "位置-本事件" || temp1 == "本事件" ){
						var e = $gameMap.event( this._eventId );
						if( e == undefined ){ return; } //『防止并行删除事件出错』
						var e_pos = [ e._realX, e._realY ];
						pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
								Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
					}
					else if( temp1 == "位置-玩家" || temp1 == "玩家" ){
						var e_pos = [ $gamePlayer._realX, $gamePlayer._realY ];
						pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
								Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
					}
					else if( temp1 == "位置-鼠标" || temp1 == "鼠标位置" ){
						pos = [ _drill_mouse_x, _drill_mouse_y ];
					}
					else if( temp1 == "位置-事件变量[" || temp1.indexOf("事件变量[") != -1 ){
						temp1 = temp1.replace("位置-事件变量[","");
						temp1 = temp1.replace("事件变量[","");
						temp1 = temp1.replace("]","");
						var e_id = $gameVariables.value(Number(temp1));
						if( $gameMap.drill_GFBPa_isEventExist( e_id ) == false ){ return; }
						var e = $gameMap.event( e_id );
						var e_pos = [ e._realX, e._realY ];
						pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
								Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
					}
					else if( temp1 == "位置-事件[" || temp1.indexOf("事件[") != -1 ){
						temp1 = temp1.replace("位置-事件[","");
						temp1 = temp1.replace("事件[","");
						temp1 = temp1.replace("]","");
						var e_id = Number(temp1);
						if( $gameMap.drill_GFBPa_isEventExist( e_id ) == false ){ return; }
						var e = $gameMap.event( e_id );
						var e_pos = [ e._realX, e._realY ];
						pos = [ Math.round( $gameMap.adjustX( e_pos[0] ) * tw + tw*0.5 ), 
								Math.round( $gameMap.adjustY( e_pos[1] ) * th + th*0.5 ) ];
					}
					else if( temp1 == "位置-图块变量[" || temp1.indexOf("图块变量[") != -1 ){
						temp1 = temp1.replace("位置-图块变量[","");
						temp1 = temp1.replace("图块变量[","");
						temp1 = temp1.replace("]","");
						temp1 = temp1.split(/[,，]/);
						pos = [ Math.round( $gameMap.adjustX( $gameVariables.value(Number(temp1[0])) ) * tw + tw*0.5 ), 
								Math.round( $gameMap.adjustY( $gameVariables.value(Number(temp1[1])) ) * th + th*0.5 ) ];
					}
					else if( temp1 == "位置-图块[" || temp1.indexOf("图块[") != -1 ){
						temp1 = temp1.replace("位置-图块[","");
						temp1 = temp1.replace("图块[","");
						temp1 = temp1.replace("]","");
						temp1 = temp1.split(/[,，]/);
						pos = [ Math.round( $gameMap.adjustX( Number(temp1[0]) ) * tw + tw*0.5 ), 
								Math.round( $gameMap.adjustY( Number(temp1[1]) ) * th + th*0.5 ) ];
					}
					
					if( pos != null ){
						$gameTemp.drill_GFBPa_createByBuffer( pos );
					}
				}
			}
		}
		
	}
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_GFBPa_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_GFBPa_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】地图层级 ☆地图层级
//#############################################################################
//##############################
// * 地图层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/中层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Map.prototype.drill_GFBPa_layerAddSprite = function (sprite, layer_index) {
    this.drill_GFBPa_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_GFBPa_layerRemoveSprite = function( sprite ){
	this.drill_GFBPa_layerRemoveSprite_Private( sprite );
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_GFBPa_sortByZIndex = function () {
    this.drill_GFBPa_sortByZIndex_Private();
}
//##############################
// * 地图层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置）
//					> y 数字              （y位置）
//					> layer 字符串        （层级，下层/中层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Map.prototype.drill_GFBPa_layerCameraMoving = function( x, y, layer, option ){
    return this.drill_GFBPa_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_GFBPa_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_GFBPa_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_GFBPa_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_GFBPa_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_GFBPa_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_GFBPa_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_GFBPa_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GFBPa_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_GFBPa_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_GFBPa_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 参数定义
//
//			说明：	> 所有drill插件的贴图都用唯一参数：zIndex（可为小数、负数），其它插件没有此参数定义。
//==============================
if( typeof(_drill_sprite_zIndex) == "undefined" ){						//（防止重复定义）
	var _drill_sprite_zIndex = true;
	Object.defineProperty( Sprite.prototype, 'zIndex', {
		set: function( value ){
			this.__drill_zIndex = value;
		},
		get: function(){
			if( this.__drill_zIndex == undefined ){ return 20250701; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_GFBPa_sortByZIndex_Private = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 去除贴图（私有）
//==============================
Scene_Map.prototype.drill_GFBPa_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_mapDownArea.removeChild( sprite );
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
	this._spriteset._drill_mapPicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_GFBPa_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_mapDownArea.addChild( sprite );
	}
	if( layer_index == "中层" ){
		this._spriteset._drill_mapCenterArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_mapUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_mapPicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}
//==============================
// * 地图层级 - 层级与镜头的位移（私有）
//==============================
Scene_Map.prototype.drill_GFBPa_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 层级与镜头的位移
	if( option['benchmark'] == "相对于地图" ){
		
		// > 相对地图的偏移
		var pos_x = $gameMap.adjustX(0);
		var pos_y = $gameMap.adjustY(0);
		xx += $gameMap.deltaX( pos_x, option['orgPos_x'] ) * $gameMap.tileWidth();
		yy += $gameMap.deltaY( pos_y, option['orgPos_y'] ) * $gameMap.tileHeight();
		
		
		// > 地图参照 -> 地图参照
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
		
		// > 地图参照 -> 镜头参照
		if( layer == "图片层" || layer == "最顶层" ){
			//（不需要变换）
			return {'x':xx, 'y':yy };
		}
	
	}else{
		
		// > 镜头参照 -> 地图参照
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			//（不需要变换）
			return {'x':xx, 'y':yy };
		}
		
		// > 镜头参照 -> 镜头参照
		if( layer == "图片层" || layer == "最顶层" ){
			//（不操作）
			return {'x':xx, 'y':yy };
		}
	}
	return {'x':xx, 'y':yy };
}



//=============================================================================
// ** ☆临时配置
//			
//			说明：	> 此模块专门管理 插件指令控制的临时配置 。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 临时配置 - 容器初始化
//==============================
var _drill_GFBPa_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_GFBPa_temp_initialize.call(this);
	this._drill_GFBPa_commandBuffer = null;			//临时配置
	this._drill_GFBPa_commandSeq = [];				//数据容器（只增不减）
	this._drill_GFBPa_commandCurId = 0;				//数据容器标识（只增不减）
};
//==============================
// * 临时配置 - 容器销毁
//==============================
var _drill_GFBPa_temp_terminate2 = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	_drill_GFBPa_temp_terminate2.call(this);
	$gameTemp._drill_GFBPa_commandBuffer = null;	//临时配置
	$gameTemp._drill_GFBPa_commandSeq = [];			//数据容器（只增不减）
	$gameTemp._drill_GFBPa_commandCurId = 0;		//数据容器标识（只增不减）
};
//==============================
// * 『临时配置』 - 简单临时配置
//==============================
Game_Temp.prototype.drill_GFBPa_createSimple = function( pos, style_id ){
	
	// > 简单 校验
	var style_data = DrillUp.g_GFBPa_style[ style_id ];
	if( style_data == undefined ){
		alert( DrillUp.drill_GFBPa_getPluginTip_StyleNotFind( style_id+1 ) );
		return;
	}
	
	// > 简单 参数准备
	var seq_data = {};
	seq_data['style_data'] = JSON.parse(JSON.stringify( style_data ));  //『深拷贝-『临时配置』』
	
	// > 简单 设置
	seq_data['style_data']['parEx_x'] = pos[0];
	seq_data['style_data']['parEx_y'] = pos[1];
	
	// > 数据定义『控制器与贴图的样式-临时配置』
	seq_data['seq_controller_id'] = this._drill_GFBPa_commandCurId;
	seq_data['seq_controller_created'] = false;
	this._drill_GFBPa_commandSeq[ this._drill_GFBPa_commandCurId ] = seq_data;
	this._drill_GFBPa_commandCurId += 1;
};
//==============================
// * 『临时配置』 - 高级临时配置 初始化
//==============================
Game_Temp.prototype.drill_GFBPa_setBuffer = function( style_id ){
	
	// > 高级 校验
	var style_data = DrillUp.g_GFBPa_style[ style_id ];
	if( style_data == undefined ){
		alert( DrillUp.drill_GFBPa_getPluginTip_StyleNotFind( style_id+1 ) );
		return;
	}
	
	// > 高级 参数准备
	var seq_data = {};
	seq_data['style_data'] = JSON.parse(JSON.stringify( style_data ));  //『深拷贝-『临时配置』』
	
	// > 高级 设置
	seq_data['style_data']['parEx_x'] = 0;
	seq_data['style_data']['parEx_y'] = 0;
	
	this._drill_GFBPa_commandBuffer = seq_data;
};
//==============================
// * 『临时配置』 - 高级临时配置 创建
//==============================
Game_Temp.prototype.drill_GFBPa_createByBuffer = function( pos ){
	
	// > 高级 校验
	var seq_data = this._drill_GFBPa_commandBuffer;
	if( seq_data == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	
	// > 高级 参数准备
	seq_data = JSON.parse(JSON.stringify( seq_data ));  //『深拷贝-『临时配置』』
	
	// > 高级 设置
	seq_data['style_data']['parEx_x'] = pos[0];
	seq_data['style_data']['parEx_y'] = pos[1];
	
	// > 数据定义『控制器与贴图的样式-临时配置』
	seq_data['seq_controller_id'] = this._drill_GFBPa_commandCurId;
	seq_data['seq_controller_created'] = false;
	this._drill_GFBPa_commandSeq[ this._drill_GFBPa_commandCurId ] = seq_data;
	this._drill_GFBPa_commandCurId += 1;
};
//==============================
// * 临时配置 - 修改样式属性-混合模式
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_blendMode = function( blendMode ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['blendMode'] = blendMode;
};
//==============================
// * 临时配置 - 修改样式属性-额外位置偏移
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_offset = function( xx, yy ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['offsetEx_x'] = xx;
	this._drill_GFBPa_commandBuffer['style_data']['offsetEx_y'] = yy;
};
//==============================
// * 临时配置 - 修改样式属性-UI基准
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_benchmark = function( benchmark ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['benchmark'] = benchmark;
};
//==============================
// * 临时配置 - 修改样式属性-地图层级
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_layerIndex = function( layerIndex ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['layerIndex'] = layerIndex;
};
//==============================
// * 临时配置 - 修改样式属性-图片层级
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_zIndex = function( zIndex ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['zIndex'] = zIndex;
};
//==============================
// * 临时配置 - 修改样式属性-粒子数量
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_parCount = function( par_count ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['par_count'] = par_count;
};
//==============================
// * 临时配置 - 修改样式属性-粒子生命周期
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_parLife = function( par_life ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['par_life'] = par_life;
};
//==============================
// * 临时配置 - 修改样式属性-粒子自旋转初始角度
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_parSelfRotateFix = function( par_selfRotateFix ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['par_selfRotateFix'] = par_selfRotateFix;
};
//==============================
// * 临时配置 - 修改样式属性-粒子固定方向
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_parDirFix = function( par_dirFix ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['par_dirFix'] = par_dirFix;
};
//==============================
// * 临时配置 - 修改样式属性-粒子扇形朝向
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_parDirSectorFace = function( par_dirSectorFace ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['par_dirSectorFace'] = par_dirSectorFace;
};
//==============================
// * 临时配置 - 修改样式属性-粒子初速度
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_parSpeedBase = function( par_speedBase ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['par_speedBase'] = par_speedBase;
};
//==============================
// * 临时配置 - 修改样式属性-粒子缩放值
//==============================
Game_Temp.prototype.drill_GFBPa_setStyle_parScaleBase = function( par_scaleBase ){
	if( this._drill_GFBPa_commandBuffer == undefined ){ alert( DrillUp.drill_GFBPa_getPluginTip_BufferIsNull() ); return; }
	this._drill_GFBPa_commandBuffer['style_data']['par_scaleBase'] = par_scaleBase;
};


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 容器初始化
//==============================
var _drill_GFBPa_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_GFBPa_temp_initialize2.call(this);
	this._drill_GFBPa_controllerTank = [];		//数据容器
	this._drill_GFBPa_spriteTankOrg = [];		//贴图容器
	this._drill_GFBPa_spriteTankSec = [];		//贴图容器
};
//==============================
// * 贴图控制 - 帧刷新
//==============================
var _drill_GFBPa_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_drill_GFBPa_smap_update.call(this);
	this.drill_GFBPa_updateCreate();				//帧刷新 - 指令创建
	this.drill_GFBPa_updateController();			//帧刷新 - 控制器
	this.drill_GFBPa_updateCamera();				//帧刷新 - 镜头
	this.drill_GFBPa_updateDestroy();				//帧刷新 - 自动销毁
}
//==============================
// * 贴图控制 - 帧刷新 指令创建
//==============================
Scene_Map.prototype.drill_GFBPa_updateCreate = function() {
	for( var i = 0; i < $gameTemp._drill_GFBPa_commandSeq.length; i++ ){
		var temp_data = $gameTemp._drill_GFBPa_commandSeq[i];
		if( temp_data == undefined ){ continue; }
		
		if( temp_data['seq_controller_created'] == false ){
			temp_data['seq_controller_created'] = true;
			var cur_styleData = temp_data['style_data'];
			
			// > 创建控制器 - 『控制器与贴图的样式-临时配置』
			var temp_controller = new Drill_GFBPa_Controller( temp_data['seq_controller_id'] );
			$gameTemp._drill_GFBPa_controllerTank.push( temp_controller );
			
			// > 创建贴图
			var temp_sprite = new Drill_GFBPa_Sprite();
			temp_sprite.drill_sprite_setController( temp_controller );
			temp_sprite.drill_sprite_initChild();
			
			// > 创建贴图（双层效果）
			if( cur_styleData['second_enable'] == true ){
				
				// > 双层效果 - 创建贴图
				var temp_secSprite = new Drill_GFBPa_SecSprite( temp_sprite );
				
				// > 双层效果 - 添加贴图到层级
				$gameTemp._drill_GFBPa_spriteTankSec.push( temp_secSprite );
				this.drill_GFBPa_layerAddSprite( temp_secSprite, cur_styleData['second_layerIndex'] );
			}
			
			// > 添加贴图到层级
			$gameTemp._drill_GFBPa_spriteTankOrg.push( temp_sprite );
			this.drill_GFBPa_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
			
			// > 层级排序
			//（暂时不排了，浪费资源）
		
		}
	}
}
//==============================
// * 贴图控制 - 帧刷新 控制器
//==============================
Scene_Map.prototype.drill_GFBPa_updateController = function() {
	for(var i = $gameTemp._drill_GFBPa_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameTemp._drill_GFBPa_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_data() == undefined ){ continue; }	//（找不到数据时跳出）
		temp_controller.drill_controller_update();
	}
}
//==============================
// * 贴图控制 - 帧刷新 镜头
//==============================
Scene_Map.prototype.drill_GFBPa_updateCamera = function() {
	for(var i = $gameTemp._drill_GFBPa_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameTemp._drill_GFBPa_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_data() == undefined ){ continue; }	//（找不到数据时跳出）
		
		// > 镜头位移结果
		var xx = 0;
		var yy = 0;
		
		// > 镜头位移结果 - 层级与镜头的位移
		var style_data = temp_controller.drill_data();
		var option = {
			"benchmark": style_data['benchmark'],
			"orgPos_x": temp_controller._drill_orgPos_x,
			"orgPos_y": temp_controller._drill_orgPos_y,
		};
		var pos = this.drill_GFBPa_layerCameraMoving(xx, yy, temp_controller._drill_layerIndex, option );
		xx = pos.x;
		yy = pos.y;
		
		// > 镜头位移结果 - 镜头缩放与位移
		if( Imported.Drill_LayerCamera ){	// 【地图 - 活动地图镜头】UI缩放与位移
			var layer = temp_controller._drill_layerIndex;
			if( layer == "下层" || layer == "中层" || layer == "上层" ){
				temp_controller._drill_scaleX = temp_controller._drill_scaleX / $gameSystem.drill_LCa_curScaleX();
				temp_controller._drill_scaleY = temp_controller._drill_scaleY / $gameSystem.drill_LCa_curScaleY();
				//（暂不考虑缩放位移偏转）
			}
			if( layer == "图片层" || layer == "最顶层" ){
				if( style_data['benchmark'] == "相对于地图" ){
					var tar_pos = $gameSystem._drill_LCa_controller.drill_LCa_getCameraPos_OuterSprite( xx, yy );
					xx = tar_pos.x;
					yy = tar_pos.y;
					//xx = $gameSystem.drill_LCa_mapToCameraX( xx );
					//yy = $gameSystem.drill_LCa_mapToCameraY( yy );
				}
			}
		}
		
		// > 镜头位移结果 - 赋值
		temp_controller._drill_cameraResultSpriteX = xx;
		temp_controller._drill_cameraResultSpriteY = yy;
	}
}
//==============================
// * 贴图控制 - 帧刷新 自动销毁
//==============================
Scene_Map.prototype.drill_GFBPa_updateDestroy = function() {
	
	// > 自动销毁 - 控制器
	for(var i = $gameTemp._drill_GFBPa_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameTemp._drill_GFBPa_controllerTank[i];
		if( temp_controller == undefined ){
			$gameTemp._drill_GFBPa_controllerTank.splice(i,1);
			continue;
		}
		if( temp_controller.drill_data() == undefined ){	//（找不到数据时销毁）
			temp_controller.drill_controller_destroy();
			$gameTemp._drill_GFBPa_controllerTank.splice(i,1);
			continue;
		}
		if( temp_controller.drill_data()['par_x'] == undefined ){
			$gameTemp._drill_GFBPa_controllerTank.splice(i,1);
			continue;
		}
		if( temp_controller.drill_controller_isDead() ){
			$gameTemp._drill_GFBPa_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_GFBPa_spriteTankOrg.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_GFBPa_spriteTankOrg[i];
		if( temp_sprite == undefined ){
			$gameTemp._drill_GFBPa_spriteTankOrg.splice(i,1);
			continue;
		}
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_GFBPa_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_GFBPa_spriteTankOrg.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
	
	// > 自动销毁 - 贴图（第二层）
	for(var i = $gameTemp._drill_GFBPa_spriteTankSec.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_GFBPa_spriteTankSec[i];
		if( temp_sprite == undefined ){
			$gameTemp._drill_GFBPa_spriteTankSec.splice(i,1);
			continue;
		}
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_GFBPa_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_GFBPa_spriteTankSec.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};

	

//=============================================================================
// ** 小爆炸粒子控制器【Drill_GFBPa_Controller】
// **		
// **		作用域：	地图界面
// **		主功能：	定义一个专门控制动画粒子的数据类。
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
// **					->A主体
// **					->B变换特性
// **					->C校验值
// **					->D指令叠加变化『变换特性-粒子贴图』
// **						x> 主体贴图-整体移动到
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
// **					->I随机因子
// **					->J粒子变化
// **					->K粒子重设
// **					->L粒子生命周期
// **					
// **					->O贴图加载
// **					->P直线拖尾贴图
// **					->Q双层效果
// **					
// **					->2A粒子类型
// **					->2B彩虹化
// **					->2Z镜头参数
// **					
// **					->3A粒子私有属性（无）
// **					
// **		说明：	> 该类只一次性使用。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_GFBPa_Controller(){
    this.initialize.apply(this, arguments);
};
Drill_GFBPa_Controller.prototype = Object.create(Drill_COPa_ComplexPar_Controller.prototype);
Drill_GFBPa_Controller.prototype.constructor = Drill_GFBPa_Controller;
//==============================
// * 控制器 - 初始化
//==============================
Drill_GFBPa_Controller.prototype.initialize = function( data_id ){
    Drill_COPa_ComplexPar_Controller.prototype.initialize.call( this, data_id );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_GFBPa_Controller.prototype.drill_controller_update = function(){
    Drill_COPa_ComplexPar_Controller.prototype.drill_controller_update.call( this );
														//帧刷新 - 2Z镜头参数（无）
}
//##############################
// * 控制器 - 重设数据【标准函数】
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//##############################
// * 控制器 - 暂停/继续【标准函数】
//##############################
// * 控制器 - 控制器标记销毁【标准函数】
//##############################
// * 控制器 - 控制器是否销毁【标准函数】
//##############################


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
// * 控制器 - 『控制器与贴图的样式-临时配置』获取数据指针【标准函数】（覆写）
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 该函数直接获取指针，可以放在帧刷新中使用。
//					> 该函数覆写了粒子核心的函数。
//##############################
Drill_GFBPa_Controller.prototype.drill_data = function(){
	//（该插件的控制器关联 临时配置，不参与存储）
	
	var cur_seqData = $gameTemp._drill_GFBPa_commandSeq[ this._drill_data_id ];
	if( cur_seqData == undefined ){
		this.drill_controller_destroy();	//（如果找不到数据，则执行销毁）
		return null;
	}
	return cur_seqData['style_data'];
};
//##############################
// * 控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> data 对象
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_GFBPa_Controller.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 @注释定义 的参数）
	
	Drill_COPa_ComplexPar_Controller.drill_controller_initData( data );
	
	// > A主体 - 基础特性
	data['src_img_file'] = "img/Special__anim/";
	data['trailing_src_img_file'] = "img/Special__anim/";
	
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "图片层" };						//A主体 - 所在层级（贴图用）
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };									//A主体 - 图片层级（贴图用）
	
	// > A主体 - 其它特性
	if( data['benchmark'] == undefined ){ data['benchmark'] = "相对于镜头" };
	if( data['parEx_x'] == undefined ){ data['parEx_x'] = 0 };
	if( data['parEx_y'] == undefined ){ data['parEx_y'] = 0 };
	if( data['offsetEx_x'] == undefined ){ data['offsetEx_x'] = 0 };
	if( data['offsetEx_y'] == undefined ){ data['offsetEx_y'] = 0 };
	
	// > B变换特性（无）
	
	// > C校验值（无）
	
	// > D指令叠加变化（无）
	
	// > E延迟指令（无）
	
	// > F周期指令（无）
	
	
	// > H粒子群弹道（无）
	
	// > I随机因子（无）
	
	// > J粒子变化
	data['par_holdingBirthPosition'] = false;													//J粒子变化 - 粒子是否滞留
	
	// > K粒子重设
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };					//K粒子重设 - 粒子出现范围
	
	// > L粒子生命周期
	data['par_lifeType'] = "同时产生(一次性)";
	
	
	// > O贴图加载（无）
	
	// > P直线拖尾贴图（无）
	
	// > Q双层效果
	if( data['second_layerIndex'] == undefined ){ data['second_layerIndex'] = "图片层" };		//Q双层效果 - 第二层粒子层级
	if( data['second_zIndex'] == undefined ){ data['second_zIndex'] = 3 };						//Q双层效果 - 第二层粒子图片层级
	
	
	// > 2A粒子类型
	if( data['parType_type'] == undefined ){ data['parType_type'] = "基础粒子" };				//2A粒子类型 - 粒子类型
	
	// > 2B彩虹化（无）
	
	// > 2Z镜头参数（无）
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_GFBPa_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initChild.call( this );
	this.drill_controller_initCamera();				//初始化子功能 - 2Z镜头参数
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_GFBPa_Controller.prototype.drill_controller_initAttr = function() {
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initAttr.call( this );
	
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_GFBPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
}
//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_GFBPa_Controller.prototype.drill_controller_initChange = function(){
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initChange.call( this );
}
//##############################
// * B变换特性 - 数据最终变换值 - 粒子平移X【标准函数】（继承）
//##############################
Drill_GFBPa_Controller.prototype.drill_controller_finalTransform_par_x = function(){
	var xx = Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_par_x.call( this );
	var data = this.drill_data();
	xx += data['parEx_x'];
	xx += data['offsetEx_x'];
	xx += this._drill_cameraResultSpriteX;  //（镜头位移结果，见函数 drill_GFBPa_updateController ）
	return xx;
}
//##############################
// * B变换特性 - 数据最终变换值 - 粒子平移Y【标准函数】（继承）
//##############################
Drill_GFBPa_Controller.prototype.drill_controller_finalTransform_par_y = function(){
	var yy = Drill_COPa_ComplexPar_Controller.prototype.drill_controller_finalTransform_par_y.call( this );
	var data = this.drill_data();
	yy += data['parEx_y'];
	yy += data['offsetEx_y'];
	yy += this._drill_cameraResultSpriteY;  //（镜头位移结果，见函数 drill_GFBPa_updateController ）
	return yy;
}
//==============================
// * C校验值 - 初始化子功能
//==============================
// * D指令叠加变化 - 初始化子功能
//==============================
// * E延迟指令 - 初始化子功能
//==============================
// * F周期指令 - 初始化子功能
//==============================

//==============================
// * H粒子群弹道 - 初始化子功能
//==============================
// * I随机因子 - 初始化子功能
//==============================
//==============================
// * J粒子变化 - 初始化子功能
//==============================
Drill_GFBPa_Controller.prototype.drill_controller_initTransform = function() {
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initTransform.call( this );
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//##############################
// * K粒子重设 - 执行重设 - 粒子平移【标准函数】（继承）
//
//			说明：	> 由于当前插件为 个体装饰，因此起始点为 一个圆内随机出现 。
//##############################
Drill_GFBPa_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_resetParticles_Position.call( this, i );
	var data = this.drill_data();
	var cur_iteration = this._drill_parList_randomIteration[i];
	
	var angle = 360 * this.drill_controller_curRandom( cur_iteration*i +41*i );		//（一个圆内随机出现）
	var radius = data['par_birthRange'] * this.drill_controller_curRandom( cur_iteration*i +43*i +1000 );
	var xx = radius * Math.cos( angle *Math.PI/180 );
	var yy = radius * Math.sin( angle *Math.PI/180 );
	this._drill_parList_x[i] = xx;
	this._drill_parList_y[i] = yy;
}
//##############################
// * K粒子重设 - 执行重设 - 粒子缩放【标准函数】
//##############################
// * K粒子重设 - 执行重设 - 粒子透明度【标准函数】
//##############################
// * K粒子重设 - 执行重设 - 粒子旋转【标准函数】
//##############################
//==============================
// * L粒子生命周期 - 初始化子功能
//==============================
// * O贴图加载 - 初始化子功能
//==============================
// * P直线拖尾贴图 - 初始化子功能
//==============================
// * Q双层效果 - 初始化子功能
//==============================
// * 2A粒子类型 - 初始化子功能
//==============================
// * 2B彩虹化 - 初始化子功能
//==============================


//==============================
// * 2Z镜头参数 - 初始化子功能
//
//			说明：	> 战斗界面 不具备循环积累值 的位移。
//==============================
Drill_GFBPa_Controller.prototype.drill_controller_initCamera = function(){
	this._drill_cameraResultSpriteX = 0;	//镜头位移结果
	this._drill_cameraResultSpriteY = 0;
	
	// > UI基准初始位置（地图界面）
	this._drill_orgPos_x = $gameMap.adjustX(0);
	this._drill_orgPos_y = $gameMap.adjustY(0);
}



//=============================================================================
// ** 小爆炸粒子贴图【Drill_GFBPa_Sprite】
// **
// **		作用域：	地图界面
// **		主功能：	定义一个粒子贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->贴图是否销毁
// **						->贴图执行销毁
// **					
// **					->3A粒子私有属性（无）
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的动画装饰。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_GFBPa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_GFBPa_Sprite.prototype = Object.create(Drill_COPa_ComplexPar_Sprite.prototype);
Drill_GFBPa_Sprite.prototype.constructor = Drill_GFBPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_GFBPa_Sprite.prototype.initialize = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.initialize.call( this );
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_GFBPa_Sprite.prototype.update = function() {
	Drill_COPa_ComplexPar_Sprite.prototype.update.call(this);
	//if( this.drill_sprite_isReady() == false ){ return; }
	//if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
												//帧刷新 - （无）
}

//##############################
// * C对象绑定 - 设置控制器【标准函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_GFBPa_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器和个体贴图 之后，才能进行手动初始化。
//##############################
Drill_GFBPa_Sprite.prototype.drill_sprite_initChild = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initChild.call( this );
												//初始化子功能 - （无）
};

//##############################
// * 粒子贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_GFBPa_Sprite.prototype.drill_sprite_isReady = function(){
    return Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_isReady.call( this );
};
//##############################
// * 粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_GFBPa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_isOptimizationPassed.call( this );
};
//##############################
// * 粒子贴图 - 贴图是否销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_GFBPa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
    return Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_isNeedDestroy.call( this );
};
//##############################
// * 粒子贴图 - 贴图执行销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_GFBPa_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_GFBPa_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initSelf.call( this );
};
//==============================
// * 粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_GFBPa_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_GFBPa_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroySelf.call( this );
};


//==============================
// * A贴图主体 - 初始化子功能
//==============================
Drill_GFBPa_Sprite.prototype.drill_sprite_initAttr = function() {
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initAttr.call( this );
	/*
		贴图的层级如下：
			- 主体贴图（this）
			- - 粒子层（_drill_COPa_parSpriteLayer）
			- - - 粒子贴图组（_drill_COPa_parSpriteTank）
			- - 直线拖尾层（_drill_COPa_trailingSpriteLayer）
			- - - 直线拖尾贴图组（_drill_COPa_trailingSpriteTank）
	*/
	
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_GFBPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
};
//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_GFBPa_Sprite.prototype.drill_sprite_initChange = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initChange.call( this );
};
//==============================
// * C对象绑定 - 初始化子功能
//==============================
// * D指令叠加变化-控制器用 - 初始化子功能
//==============================
// * E延迟指令 - 初始化子功能
//==============================
// * F周期指令 - 初始化子功能
//==============================

//==============================
// * H粒子群弹道 - 初始化子功能
//==============================
Drill_GFBPa_Sprite.prototype.drill_sprite_initBallistics = function() {
	
	// > 粒子 出生时父类位置标记（该函数被转为另一个功能，见 UI基准初始位置）
	
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initBallistics.call( this );
}
//==============================
// * I随机因子 - 初始化子功能
//==============================
//##############################
// * J粒子变化 - 帧刷新 - 粒子平移【标准函数】
//##############################
Drill_GFBPa_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_updateTransform_Position.call( this, i, time );
	//（不含粒子滞留功能）
}
//##############################
// * J粒子变化 - 帧刷新 - 粒子缩放【标准函数】
//##############################
// * J粒子变化 - 帧刷新 - 粒子透明度【标准函数】
//##############################
// * J粒子变化 - 帧刷新 - 粒子旋转【标准函数】
//##############################
//==============================
// * K粒子重设 - 初始化子功能
//==============================
// * L粒子生命周期 - 初始化子功能
//==============================
// * O贴图加载 - 初始化子功能
//==============================
// * P直线拖尾贴图 - 初始化子功能
//==============================
// * Q双层效果 - 初始化子功能
//==============================
// * 2A粒子类型 - 初始化子功能
//==============================
// * 2B彩虹化 - 初始化子功能
//==============================



//=============================================================================
// ** 小爆炸粒子贴图（第二层）【Drill_GFBPa_SecSprite】
// **
// **		作用域：	地图界面
// **		主功能：	定义一个 第二层粒子贴图 。
// **		子功能：	
// **					->贴图（第二层）『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->贴图是否销毁
// **						->贴图执行销毁
// **					
// **					->3A粒子私有属性（无）
// **					
// **		说明：	> 第二层粒子与 父贴图 的 J粒子变化 保持一致。
//=============================================================================
//==============================
// * 第二层粒子 - 定义
//==============================
function Drill_GFBPa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_GFBPa_SecSprite.prototype = Object.create(Drill_COPa_ComplexPar_SecSprite.prototype);
Drill_GFBPa_SecSprite.prototype.constructor = Drill_GFBPa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_GFBPa_SecSprite.prototype.initialize = function( parentSprite ){
	Drill_COPa_ComplexPar_SecSprite.prototype.initialize.call( this, parentSprite );
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_GFBPa_SecSprite.prototype.update = function() {
	Drill_COPa_ComplexPar_SecSprite.prototype.update.call(this);
}
//##############################
// * 第二层粒子 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_GFBPa_SecSprite.prototype.drill_spriteSec_isReady = function(){
    return Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_isReady.call(this);
};
//##############################
// * 第二层粒子 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_GFBPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
    return Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_isOptimizationPassed.call(this);
};
//##############################
// * 第二层粒子 - 贴图是否销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_GFBPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
    return Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_isNeedDestroy.call(this);
};
//##############################
// * 第二层粒子 - 贴图执行销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_GFBPa_SecSprite.prototype.drill_spriteSec_destroy = function(){
    return Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroy.call(this);
};
//==============================
// * 第二层粒子 - 初始化子功能『控制器与贴图』
//==============================
Drill_GFBPa_SecSprite.prototype.drill_spriteSec_initChild = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initChild.call( this );
};
//==============================
// * 第二层粒子 - 初始化自身『控制器与贴图』
//==============================
Drill_GFBPa_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initSelf.call( this, parentSprite );
};
//==============================
// * 第二层粒子 - 销毁子功能『控制器与贴图』
//==============================
Drill_GFBPa_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroyChild.call( this );
};
//==============================
// * 第二层粒子 - 销毁自身『控制器与贴图』
//==============================
Drill_GFBPa_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroySelf.call( this );
};

//==============================
// * A贴图主体（第二层） - 初始化子功能
//==============================
Drill_GFBPa_SecSprite.prototype.drill_spriteSec_initAttr = function() {
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initAttr.call( this );
	this.zIndex = this._drill_controller.drill_data()['second_zIndex'];
};
//==============================
// * B变换特性（第二层） - 初始化子功能
//==============================
Drill_GFBPa_SecSprite.prototype.drill_spriteSec_initChange = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initChange.call( this );
};

//==============================
// * H粒子群弹道（第二层） - 初始化子功能
//==============================
// * I随机因子（第二层） - 初始化子功能
//==============================
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子平移【标准函数】
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子缩放【标准函数】
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子透明度【标准函数】
//##############################
// * J粒子变化（第二层） - 帧刷新 - 粒子旋转【标准函数】
//##############################
//==============================
// * K粒子重设（第二层） - 初始化子功能
//==============================
// * L粒子生命周期（第二层） - 初始化子功能
//==============================
// * O贴图加载（第二层） - 初始化子功能
//==============================
// * P直线拖尾贴图（第二层） - 初始化子功能
//==============================
// * Q双层效果（第二层） - 初始化子功能
//==============================
// * 2A粒子类型（第二层） - 初始化子功能
//==============================
// * 2B彩虹化（第二层） - 初始化子功能
//==============================



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeFloatingBlastParticle = false;
		var pluginTip = DrillUp.drill_GFBPa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

