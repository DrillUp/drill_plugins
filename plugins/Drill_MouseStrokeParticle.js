//=============================================================================
// Drill_MouseStrokeParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        鼠标 - 划过时粒子效果
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MSPa_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_MouseStrokeParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在鼠标划动时，产生部分粒子效果。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfParticle       系统-粒子核心★★v1.2及以上★★
 *   - Drill_CoreOfInput          系统-输入设备核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于界面的各图层。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
 * 细节：
 *   (1.该插件同时跨 地图界面、战斗界面、菜单界面，
 *      并且切换界面时，粒子的位置还能保持一致，因此容易产生三种
 *      界面是相通的错觉。实际上是粒子的所有坐标都被实时存储，
 *      并在不同界面上表现出来了而已。
 *   (2.不同样式的粒子效果可以叠加。
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
 * ----可选设定
 * 你可以通过插件指令控制粒子效果：
 * 
 * 插件指令：>划过时粒子效果 : 样式[2] : 启用
 * 插件指令：>划过时粒子效果 : 样式[2] : 关闭
 * 插件指令：>划过时粒子效果 : 全部关闭
 *
 * 1.不同样式的粒子效果可以叠加。
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
 * 测试方法：   在各个管理层中测试鼠标划过效果。
 * 测试结果：   200个事件的地图中，平均消耗为：【73.10ms】
 *              100个事件的地图中，平均消耗为：【59.90ms】
 *               50个事件的地图中，平均消耗为：【52.21ms】
 * 测试方法2：  在战斗界面和菜单界面测试鼠标划过效果。
 * 测试结果2：  战斗界面平均消耗为：【65.90ms】
 *              菜单界面平均消耗为：【40.52ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于鼠标划过的粒子数目为固定值，所以不需要担心粒子数目过多
 *   可能导致消耗增加的问题。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了粒子 彩虹化 功能。
 * [v1.2]
 * 修复了 鼠标划动最大距离 设置无效的bug。
 * [v1.3]
 * 翻新并兼容了新的粒子底层。
 *
 *
 * @param ---粒子样式组---
 * @default
 *
 * @param 粒子样式-1
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-2
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-3
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-4
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-5
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-6
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-7
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-8
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-9
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-10
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-11
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-12
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-13
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-14
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-15
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-16
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-17
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-18
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-19
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 * @param 粒子样式-20
 * @parent ---粒子样式组---
 * @type struct<MSPaStyle>
 * @desc 鼠标划过粒子样式的详细配置信息。
 * @default 
 *
 */
/*~struct~MSPaStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的鼠标划过粒子样式==
 * 
 * 
 * @param ---贴图---
 * @desc 
 *
 * @param 初始是否启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 资源-粒子
 * @parent ---贴图---
 * @desc 粒子的图片资源。
 * @default (需配置)鼠标划过粒子
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
 * @param 是否在地图界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 地图UI基准
 * @parent 是否在地图界面中启用
 * @type select
 * @option 相对于地图
 * @value 相对于地图
 * @option 相对于镜头
 * @value 相对于镜头
 * @desc 相对于镜头的粒子，会与镜头位置保持一致。相对于地图的粒子，会与地图坐标保持一致。
 * @default 相对于地图
 *
 * @param 地图层级
 * @parent 是否在地图界面中启用
 * @type select
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 粒子在地图界面时，所属的地图层级。
 * @default 图片层
 *
 * @param 地图图片层级
 * @parent 是否在地图界面中启用
 * @type number
 * @min 0
 * @desc 粒子在同一个地图层级时，先后排序的位置，0表示最后面。
 * @default 4
 *
 * @param 是否在战斗界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 战斗层级
 * @parent 是否在战斗界面中启用
 * @type select
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 粒子在战斗界面时，所属的战斗层级。
 * @default 图片层
 *
 * @param 战斗图片层级
 * @parent 是否在战斗界面中启用
 * @type number
 * @min 0
 * @desc 粒子在同一个战斗层级时，先后排序的位置，0表示最后面。
 * @default 4
 *
 * @param 是否在菜单界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param 菜单层级
 * @parent 是否在菜单界面中启用
 * @type select
 * @option 菜单后面层
 * @value 菜单后面层
 * @option 菜单前面层
 * @value 菜单前面层
 * @desc 粒子在菜单界面时，所属的菜单层级。
 * @default 菜单前面层
 *
 * @param 菜单图片层级
 * @parent 是否在菜单界面中启用
 * @type number
 * @min 0
 * @desc 粒子在同一个菜单层级时，先后排序的位置，0表示最后面。
 * @default 4
 *
 * @param 是否在STG界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param STG层级
 * @parent 是否在STG界面中启用
 * @type select
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 粒子在STG界面时，所属的STG层级。
 * @default 图片层
 *
 * @param STG图片层级
 * @parent 是否在STG界面中启用
 * @type number
 * @min 0
 * @desc 粒子在同一个STG层级时，先后排序的位置，0表示最后面。
 * @default 4
 *
 * @param 是否在ACT界面中启用
 * @parent ---贴图---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭。
 * @default true
 *
 * @param ACT层级
 * @parent 是否在ACT界面中启用
 * @type select
 * @option 图片层
 * @value 图片层
 * @option 最顶层
 * @value 最顶层
 * @desc 粒子在ACT界面时，所属的ACT层级。
 * @default 图片层
 *
 * @param ACT图片层级
 * @parent 是否在ACT界面中启用
 * @type number
 * @min 0
 * @desc 粒子在同一个ACT层级时，先后排序的位置，0表示最后面。
 * @default 4
 * 
 * 
 * @param ---鼠标设置---
 * @desc 
 * 
 * @param 粒子产生最小间隔时间
 * @parent ---鼠标设置---
 * @type number
 * @min 1
 * @desc 粒子产生的最小间隔时间，单位帧。
 * @default 3
 * 
 * @param 鼠标划动最大距离
 * @parent ---鼠标设置---
 * @type number
 * @min 4
 * @desc 轻微划动一般都不会超过最大距离，如果玩家鼠标故意乱划，超出最大距离，则不会产生粒子。
 * @default 100
 * 
 * 
 * @param ---粒子效果---
 * @desc 
 * 
 * @param 粒子类型
 * @parent ---粒子效果---
 * @type select
 * @option 基础粒子
 * @value 基础粒子
 * @option 复杂粒子
 * @value 复杂粒子
 * @desc 基础粒子低消耗,复杂粒子高消耗,若游戏画面出现100以上该粒子,则建议用基础粒子。去看文档"1.系统 > 大家族-粒子效果.docx"。
 * @default 基础粒子
 * 
 * @param 粒子最大数量
 * @parent ---粒子效果---
 * @type number
 * @min 0
 * @desc 出现的粒子最大数量。
 * @default 25
 *
 * @param 粒子生命周期
 * @parent ---粒子效果---
 * @type number
 * @min 5
 * @desc 一个粒子从显现到消失的周期时长，单位帧。(1秒60帧)
 * @default 55
 *
 * @param 粒子弹道是否倒放
 * @parent ---粒子效果---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭，粒子弹道完全倒放。比如 四周扩散效果 变成 四周吸收效果。
 * @default false
 *
 * @param 粒子是否滞留
 * @parent ---粒子效果---
 * @type boolean
 * @on 滞留
 * @off 保持位置同步
 * @desc true - 滞留，false - 保持位置同步。滞留意思为粒子发出后，不会跟随 装饰的个体 一起移动。
 * @default false
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
 * @default 随机角度
 *
 * @param 粒子自旋转初始角度
 * @parent 粒子自旋转模式
 * @desc 粒子自旋转的初始角度，单位角度。
 * @default 0.0
 *
 * @param 粒子自旋转速度
 * @parent 粒子自旋转模式
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧)
 * @default 1.0
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
 * @option 四周扩散(随机)
 * @value 四周扩散(随机)
 * @option 扇形范围方向(随机)
 * @value 扇形范围方向(随机)
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 四周扩散(随机)
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
 * @default 0.5
 * 
 * @param 粒子速度随机波动量
 * @parent 粒子速度模式
 * @desc 粒子速度上下随机浮动的量，单位 像素/帧。比如值为 5.0，则随机浮动范围为 -2.5 ~ 2.5 之间。
 * @default 0.8
 *
 * @param 粒子透明度模式
 * @parent ---粒子效果---
 * @type select
 * @option 逐渐消失
 * @value 逐渐消失
 * @option 先显现后消失(慢速)
 * @value 先显现后消失(慢速)
 * @option 先显现后消失
 * @value 先显现后消失
 * @option 先显现后消失(快速)
 * @value 先显现后消失(快速)
 * @option 保持原透明度
 * @value 保持原透明度
 * @option 一闪一闪
 * @value 一闪一闪
 * @desc 粒子出现后，向前移动的方向设置。四周扩散模式不需要指定方向。
 * @default 先显现后消失(快速)
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
 * @default 0.5
 * 
 * @param 粒子缩放随机波动量
 * @parent 粒子缩放模式
 * @desc 粒子缩放上下随机浮动的量。比如值为 0.2，则随机浮动范围为 -0.1 ~ 0.1 之间。
 * @default 0.2
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
 * @default (需配置)鼠标划动粒子直线拖尾贴图
 * @require 1
 * @dir img/Special__anim/
 * @type file
 * 
 * 
 * @param ---彩虹化---
 * @desc 
 *
 * @param 是否开启彩虹化-粒子
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个粒子都会根据彩虹进行染色变化。
 * @default false
 *
 * @param 是否开启彩虹化-第二层粒子
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个第二层粒子都会根据彩虹进行染色变化。
 * @default false
 *
 * @param 是否开启彩虹化-直线拖尾
 * @parent ---彩虹化---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，冒出的每个粒子的拖尾都会根据彩虹进行染色变化。
 * @default false
 * 
 * @param 彩虹化色彩数量
 * @parent ---彩虹化---
 * @type number
 * @min 1
 * @max 360
 * @desc 彩虹化色彩的数量，最大值为360。
 * @default 20
 *
 * @param 彩虹化是否锁定色调值
 * @parent ---彩虹化---
 * @type boolean
 * @on 锁定
 * @off 关闭
 * @desc true - 锁定，false - 关闭，彩虹变化将按照 色调值列表 进行依次染色，具体可以看看文档。
 * @default false
 * 
 * @param 锁定的色调值列表
 * @parent 彩虹化是否锁定色调值
 * @type number[]
 * @min 0
 * @max 360
 * @desc 彩虹变化将按照 色调值列表 进行依次染色，具体可以看看文档。
 * @default []
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		MSPa（Mouse_Stroke_Particle）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^3)*o(贴图处理) 每帧
//		★性能测试因素	地图界面、战斗界面
//		★性能测试消耗	2026/7/17：
//							》地图界面：73.1ms（Drill_MSPa_Sprite.update）21.9ms（Drill_MSPa_Sprite.drill_sprite_updateTransform_Position）
//							》战斗界面：65.9ms（Drill_MSPa_Sprite.update）12.2ms（Drill_MSPa_Sprite.drill_sprite_updateTransform_Position）
//		★最坏情况		大量粒子被同时创建并播放。
//		★备注			2026/7/17：
//							》理论上锁定了粒子数量，粒子重设频率也低。消耗不应该那么高，暂时不明原因。
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
//			->☆地图层级
//				> 图片层/最顶层
//				x->层级与镜头的位移
//			->☆战斗层级
//				> 图片层/最顶层
//				x->层级与镜头的位移
//			->☆菜单层级
//				> 菜单后面层/菜单前面层
//				x->层级与镜头的位移
//			
//			->☆贴图控制
//				->创建贴图
//				x->销毁贴图
//			->☆控制器与贴图
//				->帧刷新 鼠标变化
//				->帧刷新 控制器
//				x->帧刷新 基础特性
//				->帧刷新 自动销毁
//			
//			->鼠标划过粒子控制器【Drill_MSPa_Controller】
//				x->Q双层效果（此功能关闭）
//			->鼠标划过粒子贴图【Drill_MSPa_Sprite】
//			->鼠标划过粒子贴图（第二层）【Drill_MSPa_SecSprite】
//			
//			->☆引擎兼容（STG）
//				->☆STG层级
//					> 图片层/最顶层
//			->☆引擎兼容（ACT）
//				->☆ACT层级
//					> 图片层/最顶层
//			
//			
//		★家谱：
//			大家族-粒子效果
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//		
//		★插件私有类：
//			* 鼠标划过粒子控制器【Drill_MSPa_Controller】
//			* 鼠标划过粒子贴图【Drill_MSPa_Sprite】
//			* 鼠标划过粒子贴图（第二层）【Drill_MSPa_SecSprite】
//		
//		★必要注意事项：
//			1.插件继承至 粒子核心。
//			  核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
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
	DrillUp.g_MSPa_PluginTip_curName = "Drill_MouseStrokeParticle.js 鼠标-划过时粒子效果";
	DrillUp.g_MSPa_PluginTip_baseList = [
		"Drill_CoreOfParticle.js 系统-粒子核心",
		"Drill_CoreOfInput.js 系统-输入设备核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_MSPa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_MSPa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_MSPa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_MSPa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_MSPa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_MSPa_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_MSPa_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_MSPa_getPluginTip_NeedUpdate_Particle = function(){
		return "【" + DrillUp.g_MSPa_PluginTip_curName + "】\n粒子核心插件版本过低，你需要更新 粒子核心 至少v1.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_MouseStrokeParticle = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MouseStrokeParticle');
	
	//==============================
	// * 静态数据 - 粒子样式
	//				（~struct~MSPaStyle）
	//==============================
	DrillUp.drill_MSPa_particleInit = function( dataFrom ){
		var data = {};
		
		// > A主体 - 基础特性
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_file'] = "img/Special__anim/";
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = String( dataFrom["初始是否启用"] || "false") == "true";
		data['pause'] = false;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		
		data['map_enabled'] = String( dataFrom["是否在地图界面中启用"] || "true") == "true";
		data['map_benchmark'] = String( dataFrom["地图UI基准"] || "相对于镜头");
		data['map_layerIndex'] = String( dataFrom["地图层级"] || "图片层");
		data['map_zIndex'] = Number( dataFrom["地图图片层级"] || 4);
		
		data['battle_enabled'] = String( dataFrom["是否在战斗界面中启用"] || "true") == "true";
		data['battle_layerIndex'] = String( dataFrom["战斗层级"] || "图片层");
		data['battle_zIndex'] = Number( dataFrom["战斗图片层级"] || 4);
		
		data['menu_enabled'] = String( dataFrom["是否在菜单界面中启用"] || "true") == "true";
		data['menu_layerIndex'] = String( dataFrom["菜单层级"] || "菜单前面层");
		data['menu_zIndex'] = Number( dataFrom["菜单图片层级"] || 4);
		
		data['STG_enabled'] = String( dataFrom["是否在STG界面中启用"] || "true") == "true";
		data['STG_layerIndex'] = String( dataFrom["STG层级"] || "图片层");
		data['STG_zIndex'] = Number( dataFrom["STG图片层级"] || 4);
		
		data['ACT_enabled'] = String( dataFrom["是否在ACT界面中启用"] || "true") == "true";
		data['ACT_layerIndex'] = String( dataFrom["ACT层级"] || "图片层");
		data['ACT_zIndex'] = Number( dataFrom["ACT图片层级"] || 4);
		
		// > A主体 - 其它特性
		data['mouse_interval'] = Number( dataFrom["粒子产生最小间隔时间"] || 3);
		data['mouse_maxDistance'] = Number( dataFrom["鼠标划动最大距离"] || 100);
		
		
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
		data['par_count'] = Number( dataFrom["粒子最大数量"] || 15);
		data['par_life'] = Number( dataFrom["粒子生命周期"] || 180);
		data['par_backrun'] = String( dataFrom["粒子弹道是否倒放"] || "false") == "true";
		//data['par_holdingBirthPosition'] = String( dataFrom["粒子是否滞留"] || "false") == "true";
		
		data['par_birthRange'] = Number( dataFrom["粒子出现范围"] || 40);
		
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
		data['second_enable'] = false;
		
		
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
		
		// > 控制器 - 『控制器与贴图的样式-静态数据-指针初始化』
		Drill_MSPa_Controller.drill_controller_initData( data );
		
		return data;
	}
	//==============================
	// * 静态数据 - 最后继承1级
	//==============================
	var _drill_MSPa_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_MSPa_scene_initialize.call(this);
		
		/*-----------------粒子------------------*/
		for( var i = 0; i < DrillUp.g_MSPa_style.length; i++ ){
			var temp = DrillUp.g_MSPa_style[i];
			if( temp != undefined ){
				DrillUp.g_MSPa_style[i] = DrillUp.drill_MSPa_particleInit( temp );
			}
		}
	}
	/*-----------------粒子------------------*/
	DrillUp.g_MSPa_style_length = 20;
	DrillUp.g_MSPa_style = [];
	for (var i = 0; i < DrillUp.g_MSPa_style_length; i++) {
		if( DrillUp.parameters["粒子样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["粒子样式-" + String(i+1) ] != "" ){
			DrillUp.g_MSPa_style[i] = JSON.parse(DrillUp.parameters["粒子样式-" + String(i+1) ]);
		}else{
			DrillUp.g_MSPa_style[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfParticle &&
	Imported.Drill_CoreOfInput ){
	
	if( typeof(Drill_COPa_ComplexPar_Controller) == "undefined" ){	//（粒子核心版本检测）
		alert( DrillUp.drill_MSPa_getPluginTip_NeedUpdate_Particle() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_MSPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_MSPa_pluginCommand.call(this, command, args);
	this.drill_MSPa_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_MSPa_pluginCommand = function( command, args ){
	if( command === ">划过时粒子效果" ){
		
		/*-----------------启用/关闭------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( temp1.indexOf("样式[") != -1 ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				temp1 = Number(temp1) -1;
				var controller = $gameSystem._drill_MSPa_controllerTank[ temp1 ];
				if( controller == undefined ){ return; }
				if( type == "启用" || type == "开启" || type == "打开" || type == "启动" ){
					controller.drill_controller_setVisible(true);
				}
				if( type == "关闭" || type == "禁用" ){
					controller.drill_controller_setVisible(false);
				}
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "全部关闭" ){
				for( var i = 0; i < $gameSystem._drill_MSPa_controllerTank.length; i++ ){
					var controller = $gameSystem._drill_MSPa_controllerTank[ i ];
					if( controller == undefined ){ continue; }
					controller.drill_controller_setVisible(false);
				}
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_MSPa_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MSPa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MSPa_sys_initialize.call(this);
	this.drill_MSPa_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MSPa_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MSPa_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MSPa_saveEnabled == true ){	
		$gameSystem.drill_MSPa_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MSPa_initSysData();
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
Game_System.prototype.drill_MSPa_initSysData = function() {
	this.drill_MSPa_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MSPa_checkSysData = function() {
	this.drill_MSPa_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MSPa_initSysData_Private = function() {
	
	this._drill_MSPa_controllerTank = [];	//当前容器（与 g_MSPa_style 依次对应，容器允许出现null值）
	for( var i = 0; i < DrillUp.g_MSPa_style.length; i++ ){
		var temp_data = DrillUp.g_MSPa_style[i];
		if( temp_data == undefined ){ continue; }
		
		// > 创建控制器
		var temp_controller = new Drill_MSPa_Controller( i );
		this._drill_MSPa_controllerTank[i] = temp_controller;
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MSPa_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MSPa_controllerTank == undefined ){
		this.drill_MSPa_initSysData();
	}
	
	// > 容器的 空数据 检查
	for( var i = 0; i < DrillUp.g_MSPa_style.length; i++ ){
		var temp_data = DrillUp.g_MSPa_style[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_MSPa_controllerTank[i] == undefined ){
				var temp_controller = new Drill_MSPa_Controller( i );
				this._drill_MSPa_controllerTank[i] = temp_controller;
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
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
Scene_Map.prototype.drill_MSPa_layerAddSprite = function (sprite, layer_index) {
    this.drill_MSPa_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_MSPa_layerRemoveSprite = function( sprite ){
	this.drill_MSPa_layerRemoveSprite_Private( sprite );
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_MSPa_sortByZIndex = function () {
    this.drill_MSPa_sortByZIndex_Private();
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_MSPa_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_MSPa_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_MSPa_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_MSPa_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_MSPa_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_MSPa_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_MSPa_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_MSPa_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_MSPa_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_MSPa_map_createAllWindows.call(this);	//对话框集合 < 最顶层
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
Scene_Map.prototype.drill_MSPa_sortByZIndex_Private = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 去除贴图（私有）
//==============================
Scene_Map.prototype.drill_MSPa_layerRemoveSprite_Private = function( sprite ) {
	this._spriteset._drill_mapDownArea.removeChild( sprite );
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
	this._spriteset._drill_mapPicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_MSPa_layerAddSprite_Private = function( sprite, layer_index ){
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


//#############################################################################
// ** 【标准模块】战斗层级 ☆战斗层级
//#############################################################################
//##############################
// * 战斗层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，下层/上层/图片层/最顶层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Battle.prototype.drill_MSPa_layerAddSprite = function( sprite, layer_index ){
	this.drill_MSPa_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_MSPa_layerRemoveSprite = function( sprite ){
	this.drill_MSPa_layerRemoveSprite_Private( sprite );
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_MSPa_sortByZIndex = function () {
    this.drill_MSPa_sortByZIndex_Private();
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_MSPa_layer_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_MSPa_layer_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_MSPa_layer_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_MSPa_layer_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_MSPa_layer_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_MSPa_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_MSPa_layer_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_MSPa_layer_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 战斗层级 - 参数定义
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
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_MSPa_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 去除贴图（私有）
//==============================
Scene_Battle.prototype.drill_MSPa_layerRemoveSprite_Private = function( sprite ){
	this._spriteset._drill_battleDownArea.removeChild( sprite );
	this._spriteset._drill_battleUpArea.removeChild( sprite );
	this._spriteset._drill_battlePicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_MSPa_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "下层" ){
		this._spriteset._drill_battleDownArea.addChild( sprite );
	}
	if( layer_index == "上层" ){
		this._spriteset._drill_battleUpArea.addChild( sprite );
	}
	if( layer_index == "图片层" ){
		this._spriteset._drill_battlePicArea.addChild( sprite );
	}
	if( layer_index == "最顶层" ){
		this._drill_SenceTopArea.addChild( sprite );
	}
}


//#############################################################################
// ** 【标准模块】菜单层级 ☆菜单层级
//#############################################################################
//##############################
// * 菜单层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，菜单后面层/菜单前面层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_MenuBase.prototype.drill_MSPa_layerAddSprite = function( sprite, layer_index ){
    this.drill_MSPa_layerAddSprite_Private(sprite, layer_index);
};
//##############################
// * 菜单层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从菜单层级中移除。
//##############################
Scene_MenuBase.prototype.drill_MSPa_layerRemoveSprite = function( sprite ){
	this.drill_MSPa_layerRemoveSprite_Private( sprite );
};
//##############################
// * 菜单层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，菜单层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_MenuBase.prototype.drill_MSPa_sortByZIndex = function () {
    this.drill_MSPa_sortByZIndex_Private();
};
//=============================================================================
// ** 菜单层级（接口实现）
//=============================================================================
//==============================
// * 菜单层级 - 创建
//==============================
var _drill_MSPa_menuLayer_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function(){
	
	// > 『菜单后面层-创建』
	_drill_MSPa_menuLayer_createBackground.call(this);
	
	// > 『菜单前面层-创建』
	if( this._foregroundSprite == undefined ){
		this._foregroundSprite = new Sprite();
	}
};
//==============================
// * 菜单层级 - 帧刷新
//==============================
var _drill_MSPa_menuLayer_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MSPa_menuLayer_update.call(this);
	
	// > 菜单后面层（防止覆写报错）
	if( this._backgroundSprite == undefined ){
		this._backgroundSprite = new Sprite();
	}
	
	// > 菜单前面层（防止覆写报错）
	if( this._foregroundSprite == undefined ){
		this._foregroundSprite = new Sprite();
	}
	
	// > 『菜单前面层-顺序控制』
	if( this._foregroundSprite_hasAddChild == undefined ){
		this._foregroundSprite_hasAddChild = true;
		this.addChild(this._foregroundSprite);	
	}
};
//==============================
// * 菜单层级 - 参数定义
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
// * 菜单层级 - 图片层级排序（私有）
//==============================
Scene_MenuBase.prototype.drill_MSPa_sortByZIndex_Private = function() {
	this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单层级 - 去除贴图（私有）
//==============================
Scene_MenuBase.prototype.drill_MSPa_layerRemoveSprite_Private = function( sprite ){
	this._backgroundSprite.removeChild( sprite );
	this._foregroundSprite.removeChild( sprite );
};
//==============================
// * 菜单层级 - 添加贴图到层级（私有）
//
//			说明：	> 此处兼容了 菜单界面、战斗界面、地图界面 的层级名词。
//==============================
Scene_MenuBase.prototype.drill_MSPa_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "菜单后面层" || layer_index === "0" || layer_index === 0 || 
		layer_index == "下层" || layer_index == "中层" || layer_index == "上层"){
		this._backgroundSprite.addChild( sprite );
	}
	if( layer_index == "菜单前面层" || layer_index === "1" || layer_index === 1 || 
		layer_index == "图片层" || layer_index == "最顶层" ){
		this._foregroundSprite.addChild( sprite );
	}
};



//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块基于 对象池 来进行 创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 容器初始化
//==============================
var _drill_MSPa_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_MSPa_temp_initialize2.call(this);
	this._drill_MSPa_spriteTankOrg = [];				//贴图容器
	//this._drill_MSPa_spriteTankSec = [];				//贴图容器
};
//==============================
// * 贴图控制 - 刷新
//==============================
SceneManager.drill_MSPa_createParticleSprite = function(){
	if( $gameTemp == undefined ){ return; }
	if( $gameSystem == undefined ){ return; }
	
	for(var i = 0; i < $gameSystem._drill_MSPa_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_MSPa_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 判断创建
		if( this.drill_MSPa_createParticleSprite_needCreate( temp_controller ) == true ){
			
			// > 创建贴图
			var temp_sprite = new Drill_MSPa_Sprite();
			temp_sprite.drill_sprite_setController( temp_controller );
			temp_sprite.drill_sprite_initChild();
			
			// > 创建贴图（双层效果）（此功能关闭）
			var temp_data = temp_controller.drill_data();
			if( temp_data['second_enable'] == true ){
				//（无）
			}
			
			// > 添加贴图到层级
			$gameTemp._drill_MSPa_spriteTankOrg.push( temp_sprite );
			this.drill_MSPa_createParticleSprite_layerAddSprite( temp_sprite );
		}
	}
	
	// > 层级排序
	this.drill_MSPa_createParticleSprite_sortByZIndex();
};
//==============================
// * 贴图控制 - 刷新 - 判断创建
//==============================
SceneManager.drill_MSPa_createParticleSprite_needCreate = function( temp_controller ){
	var temp_data = temp_controller.drill_data();
	
	if( SceneManager._scene instanceof Scene_Map ){			//判断创建『多场景与游戏窗体-地图界面』
		if( temp_data['map_enabled'] == true ){
			return true;
		}
	}
	if( SceneManager._scene instanceof Scene_Battle ){		//判断创建『多场景与游戏窗体-战斗界面』
		if( temp_data['battle_enabled'] == true ){
			return true;
		}
	}
	if( SceneManager._scene instanceof Scene_MenuBase ){	//判断创建『多场景与游戏窗体-菜单界面』
		if( temp_data['menu_enabled'] == true ){
			return true;
		}
	}
	return false;
};
//==============================
// * 贴图控制 - 刷新 - 添加贴图到层级
//==============================
SceneManager.drill_MSPa_createParticleSprite_layerAddSprite = function( temp_sprite ){
	var temp_controller = temp_sprite._drill_controller;
	if( temp_controller == undefined ){ return; }
	var temp_data = temp_controller.drill_data();
	
	if( SceneManager._scene instanceof Scene_Map ){			//添加贴图到层级『多场景与游戏窗体-地图界面』
		temp_sprite.zIndex = temp_data['map_zIndex'];
		SceneManager._scene.drill_MSPa_layerAddSprite( temp_sprite, temp_data['map_layerIndex'] );
	}
	if( SceneManager._scene instanceof Scene_Battle ){		//添加贴图到层级『多场景与游戏窗体-战斗界面』
		temp_sprite.zIndex = temp_data['battle_zIndex'];
		SceneManager._scene.drill_MSPa_layerAddSprite( temp_sprite, temp_data['battle_layerIndex'] );
	}
	if( SceneManager._scene instanceof Scene_MenuBase ){	//添加贴图到层级『多场景与游戏窗体-菜单界面』
		temp_sprite.zIndex = temp_data['menu_zIndex'];
		SceneManager._scene.drill_MSPa_layerAddSprite( temp_sprite, temp_data['menu_layerIndex'] );
	}
};
//==============================
// * 贴图控制 - 刷新 - 层级排序
//==============================
SceneManager.drill_MSPa_createParticleSprite_sortByZIndex = function(){
	if( SceneManager._scene instanceof Scene_Map ){			//层级排序『多场景与游戏窗体-地图界面』
		SceneManager._scene.drill_MSPa_sortByZIndex();
	}
	if( SceneManager._scene instanceof Scene_Battle ){		//层级排序『多场景与游戏窗体-战斗界面』
		SceneManager._scene.drill_MSPa_sortByZIndex();
	}
	if( SceneManager._scene instanceof Scene_MenuBase ){	//层级排序『多场景与游戏窗体-菜单界面』
		SceneManager._scene.drill_MSPa_sortByZIndex();
	}
};
//==============================
// * 贴图控制 - 刷新 - 去除贴图
//==============================
SceneManager.drill_MSPa_createParticleSprite_layerRemoveSprite = function( temp_sprite ){
	if( SceneManager._scene instanceof Scene_Map ){			//去除贴图『多场景与游戏窗体-地图界面』
		SceneManager._scene.drill_MSPa_layerRemoveSprite( temp_sprite );
	}
	if( SceneManager._scene instanceof Scene_Battle ){		//去除贴图『多场景与游戏窗体-战斗界面』
		SceneManager._scene.drill_MSPa_layerRemoveSprite( temp_sprite );
	}
	if( SceneManager._scene instanceof Scene_MenuBase ){	//去除贴图『多场景与游戏窗体-菜单界面』
		SceneManager._scene.drill_MSPa_layerRemoveSprite( temp_sprite );
	}
};

//==============================
// * 贴图控制 - 界面创建时『多场景与游戏窗体-地图界面』
//
//			说明：	> 每次在 界面创建时 都扫描一遍 创建与销毁关系。
//					> 玩家不能控制创建与销毁，静态数据"界面中启用"的设置也不能直接修改。玩家只能显示隐藏。
//==============================
var _drill_MSPa_smap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_MSPa_smap_createAllWindows.call(this);
	SceneManager.drill_MSPa_createParticleSprite();
};
//==============================
// * 贴图控制 - 界面创建时『多场景与游戏窗体-战斗界面』
//==============================
var _drill_MSPa_sbattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function(){
	_drill_MSPa_sbattle_createAllWindows.call(this);
	SceneManager.drill_MSPa_createParticleSprite();
};
//==============================
// * 贴图控制 - 界面创建时『多场景与游戏窗体-菜单界面』
//==============================
var _drill_MSPa_smenu_createWindowLayer = Scene_MenuBase.prototype.createWindowLayer;
Scene_MenuBase.prototype.createWindowLayer = function(){
	_drill_MSPa_smenu_createWindowLayer.call(this);
	SceneManager.drill_MSPa_createParticleSprite();
};




//=============================================================================
// ** ☆控制器与贴图
//
//			说明：	> 此模块专门管理 帧刷新。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 控制器与贴图 - 帧刷新
//
//			说明：	> 直接绑定到 SceneManager 。
//==============================
var _drill_MSPa_requestUpdate = SceneManager.requestUpdate;
SceneManager.requestUpdate = function(){
	
    if( !this._stopped ){
		this.drill_MSPa_updateMouse();				//帧刷新 - 鼠标变化
		this.drill_MSPa_updateController();			//帧刷新 - 控制器
													//帧刷新 - 基础特性（无）
		this.drill_MSPa_updateDestroy();			//帧刷新 - 自动销毁
    }
	
	// > 原函数
	_drill_MSPa_requestUpdate.call(this);
};
//==============================
// * 控制器与贴图 - 帧刷新 鼠标变化
//==============================
SceneManager.drill_MSPa_updateMouse = function() {
	if( $gameSystem == undefined ){ return; }
	
	// > 鼠标 - 捕获
	var cur_mouse_x = _drill_mouse_x;
	var cur_mouse_y = _drill_mouse_y;
	if( this._drill_MSPa_lastMouseX == undefined ){
		this._drill_MSPa_lastMouseX = cur_mouse_x;
		this._drill_MSPa_lastMouseY = cur_mouse_y;
	}
	
	// > 鼠标 - 未动时不操作
	if( this._drill_MSPa_lastMouseX == cur_mouse_x &&
		this._drill_MSPa_lastMouseY == cur_mouse_y ){
		return;
	}
	
	// > 鼠标 - 中心点计算
	var diff_x = cur_mouse_x - this._drill_MSPa_lastMouseX;
	var diff_y = cur_mouse_y - this._drill_MSPa_lastMouseY;
	var p_x = this._drill_MSPa_lastMouseX + diff_x*0.5;
	var p_y = this._drill_MSPa_lastMouseY + diff_y*0.5;
	
	
	// > 控制器变化
	for(var i = 0; i < $gameSystem._drill_MSPa_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_MSPa_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 条件 - 如果不可见就不要创建粒子
		if( temp_controller.drill_controller_isVisible() == false ){ continue; }
		
		
		// > 记录 - 粒子产生最小间隔时间
		temp_controller._drill_MSPa_delay += 1;
		
		// > 记录 - 鼠标划动最大距离
		temp_controller._drill_MSPa_distance += Math.abs( diff_x );	//（距离直接相加，不取实际距离了，浪费计算量）
		temp_controller._drill_MSPa_distance += Math.abs( diff_y );
		
		
		// > 条件 - 粒子产生最小间隔时间
		if( temp_controller._drill_MSPa_delay % temp_controller.drill_data()['mouse_interval'] != 0 ){ continue; }
		
		// > 条件 - 鼠标划动最大距离
		if( temp_controller._drill_MSPa_distance < temp_controller.drill_data()['mouse_maxDistance'] ){ continue; }
		temp_controller._drill_MSPa_distance = 0;
		
		
		// > 获取一个已死亡的粒子（L粒子生命周期『粒子手动产生与管理』）
		var dead_index = temp_controller.drill_controller_getOneDeadParticleIndex();
		if( dead_index == -1 ){ return; }
		
		// > 『粒子手动产生与管理』
		temp_controller.drill_controller_rebirth( dead_index );
		temp_controller.drill_controller_resetParticles( dead_index );
		temp_controller._drill_parList_x[ dead_index ] = p_x*0.5;	//（暂时不明白为什么要除以二）
		temp_controller._drill_parList_y[ dead_index ] = p_y*0.5;
	}
	
	
	// > 鼠标 - 标记
	this._drill_MSPa_lastMouseX = cur_mouse_x;
	this._drill_MSPa_lastMouseY = cur_mouse_y;
};
//==============================
// * 控制器与贴图 - 帧刷新 控制器
//==============================
SceneManager.drill_MSPa_updateController = function(){
	if( $gameSystem == undefined ){ return; }
	for(var i = 0; i < $gameSystem._drill_MSPa_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_MSPa_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		temp_controller.drill_controller_update();
	}
};
//==============================
// * 控制器与贴图 - 帧刷新 基础特性
//==============================
	//（不支持切换 层级、堆叠级）
//==============================
// * 控制器与贴图 - 帧刷新 自动销毁
//==============================
SceneManager.drill_MSPa_updateDestroy = function(){
	if( $gameTemp == undefined ){ return; }
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_MSPa_spriteTankOrg.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_MSPa_spriteTankOrg[i];
		if( temp_sprite == undefined ){
			$gameTemp._drill_MSPa_spriteTankOrg.splice(i,1);
			continue;
		}
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_MSPa_createParticleSprite_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_MSPa_spriteTankOrg.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
	
	// > 自动销毁 - 贴图（第二层）
	//	（无）
};



//=============================================================================
// ** 鼠标划过粒子控制器【Drill_MSPa_Controller】
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
// **					
// **					->3A粒子私有属性（无）
// **					
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_MSPa_Controller(){
    this.initialize.apply(this, arguments);
};
Drill_MSPa_Controller.prototype = Object.create(Drill_COPa_ComplexPar_Controller.prototype);
Drill_MSPa_Controller.prototype.constructor = Drill_MSPa_Controller;
//==============================
// * 控制器 - 初始化
//==============================
Drill_MSPa_Controller.prototype.initialize = function( data_id ){
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
Drill_MSPa_Controller.prototype.drill_controller_update = function(){
    Drill_COPa_ComplexPar_Controller.prototype.drill_controller_update.call( this );
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
// * 控制器 - 『控制器与贴图的样式-静态数据』校验标记
//##############################
DrillUp.g_MSPa_notFindStyleAlertOnce = true;
//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』获取数据指针【标准函数】（覆写）
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，所以只读静态数据。不要存储到存档中，也不要挂载到控制器身上。
//					> 该函数直接获取指针，可以放在帧刷新中使用。
//					> 该函数覆写了粒子核心的函数。
//##############################
Drill_MSPa_Controller.prototype.drill_data = function(){
	var cur_styleId   = this._drill_data_id +1;
	var cur_styleData = DrillUp.g_MSPa_style[ this._drill_data_id ];
	if( cur_styleData == undefined ){
		
		// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（只执行一次）
		if( DrillUp.g_MSPa_notFindStyleAlertOnce == true ){
			DrillUp.g_MSPa_notFindStyleAlertOnce = false;
			alert( DrillUp.drill_MSPa_getPluginTip_StyleNotFind(cur_styleId) );
		}
		return {};
	}
	return cur_styleData;
};
//##############################
// * 控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> data 对象
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_MSPa_Controller.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 @注释定义 的参数）
	
	Drill_COPa_ComplexPar_Controller.drill_controller_initData( data );
	
	// > A主体 - 基础特性
	data['src_img_file'] = "img/Special__anim/";
	data['trailing_src_img_file'] = "img/Special__anim/";
	
	if( data['map_layerIndex'] == undefined ){ data['map_layerIndex'] = "图片层" };				//A主体 - 地图层级（贴图用）
	if( data['map_zIndex'] == undefined ){ data['map_zIndex'] = 0 };							//A主体 - 图片层级（贴图用）
	if( data['battle_layerIndex'] == undefined ){ data['battle_layerIndex'] = "图片层" };		//A主体 - 战斗层级（贴图用）
	if( data['battle_zIndex'] == undefined ){ data['battle_zIndex'] = 0 };						//A主体 - 图片层级（贴图用）
	if( data['menu_layerIndex'] == undefined ){ data['menu_layerIndex'] = "菜单前面层" };		//A主体 - 菜单层级（贴图用）
	if( data['menu_zIndex'] == undefined ){ data['menu_zIndex'] = 0 };							//A主体 - 图片层级（贴图用）
	
	// > A主体 - 其它特性（无）
	
	// > B变换特性（无）
	
	// > C校验值（无）
	
	// > D指令叠加变化（无）
	
	// > E延迟指令（无）
	
	// > F周期指令（无）
	
	
	// > H粒子群弹道（无）
	
	// > I随机因子（无）
	
	// > J粒子变化
	//	（粒子是否滞留 与 地图UI基准 功能合并）
	
	// > K粒子重设
	if( data['par_birthRange'] == undefined ){ data['par_birthRange'] = 40 };					//K粒子重设 - 粒子出现范围
	
	// > L粒子生命周期
	data['par_lifeType'] = "手动产生";	//『粒子手动产生与管理』
	
	
	// > O贴图加载（无）
	
	// > P直线拖尾贴图（无）
	
	// > Q双层效果
	data['second_enable'] = false;
	
	
	// > 2A粒子类型
	if( data['parType_type'] == undefined ){ data['parType_type'] = "基础粒子" };				//2A粒子类型 - 粒子类型
	
	// > 2B彩虹化（无）
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_MSPa_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initChild.call( this );
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_MSPa_Controller.prototype.drill_controller_initAttr = function() {
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initAttr.call( this );
	
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_MSPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
	
	// > 粒子产生最小间隔时间 计数器
	this._drill_MSPa_delay = 0;
	this._drill_MSPa_distance = 0;
}
//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_MSPa_Controller.prototype.drill_controller_initChange = function(){
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initChange.call( this );
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
Drill_MSPa_Controller.prototype.drill_controller_initTransform = function() {
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_initTransform.call( this );
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//##############################
// * K粒子重设 - 执行重设 - 粒子平移【标准函数】（继承）
//
//			说明：	> 起始点为 一个圆内随机出现 。
//##############################
Drill_MSPa_Controller.prototype.drill_controller_resetParticles_Position = function( i ){
	Drill_COPa_ComplexPar_Controller.prototype.drill_controller_resetParticles_Position.call( this, i );
	var data = this.drill_data();
	var iteration = this._drill_parList_randomIteration[i];
	
	var angle = 360 * this.drill_controller_curRandom( iteration*i );		//（一个圆内随机出现）
	var radius = data['par_birthRange'] * this.drill_controller_curRandom( iteration*i +1000 );
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



//=============================================================================
// ** 鼠标划过粒子贴图【Drill_MSPa_Sprite】
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
// **					->3A粒子私有属性（无）
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * 粒子贴图 - 定义
//==============================
function Drill_MSPa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_MSPa_Sprite.prototype = Object.create(Drill_COPa_ComplexPar_Sprite.prototype);
Drill_MSPa_Sprite.prototype.constructor = Drill_MSPa_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_MSPa_Sprite.prototype.initialize = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.initialize.call( this );
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_MSPa_Sprite.prototype.update = function() {
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
Drill_MSPa_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行手动初始化。
//##############################
Drill_MSPa_Sprite.prototype.drill_sprite_initChild = function(){
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
Drill_MSPa_Sprite.prototype.drill_sprite_isReady = function(){
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
Drill_MSPa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
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
Drill_MSPa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
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
Drill_MSPa_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_MSPa_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initSelf.call( this );
};
//==============================
// * 粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_MSPa_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_MSPa_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_destroySelf.call( this );
};


//==============================
// * A贴图主体 - 初始化子功能
//==============================
Drill_MSPa_Sprite.prototype.drill_sprite_initAttr = function() {
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
	this._drill_curPluginTipName = DrillUp.g_MSPa_PluginTip_curName;	//常规 - 当前插件名（提示信息）
};
//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_MSPa_Sprite.prototype.drill_sprite_initChange = function(){
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
Drill_MSPa_Sprite.prototype.drill_sprite_initBallistics = function() {
	var data = this._drill_controller.drill_data();
	
	// > 粒子 出生时父类位置标记
	this._drill_COPa_parList_birthParentX = [];
	this._drill_COPa_parList_birthParentY = [];
	for( var i = 0; i < data['par_count']; i++ ){
		this._drill_COPa_parList_birthParentX[i] = -2000;
		this._drill_COPa_parList_birthParentY[i] = -2000;
	}
	
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_initBallistics.call( this );
}
//==============================
// * H粒子群弹道 - 推演弹道
//==============================
Drill_MSPa_Sprite.prototype.drill_sprite_refreshBallistics = function( i ){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_refreshBallistics.call( this, i );
	
	// > 粒子 出生时父类位置标记（sprite帧刷新时 $gameMap 肯定已经初始化了）
	if( SceneManager._scene instanceof Scene_Map ){
		this._drill_COPa_parList_birthParentX[i] = $gameMap.adjustX(0);
		this._drill_COPa_parList_birthParentY[i] = $gameMap.adjustY(0);
	}
}
//==============================
// * I随机因子 - 初始化子功能
//==============================
//##############################
// * J粒子变化 - 帧刷新 - 粒子平移【标准函数】
//##############################
Drill_MSPa_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
    Drill_COPa_ComplexPar_Sprite.prototype.drill_sprite_updateTransform_Position.call( this, i, time );
	var data = this._drill_controller.drill_data();
	
	// > 位置（粒子滞留）
	if( SceneManager._scene instanceof Scene_Map ){
		if( data['map_benchmark'] == "相对于地图" ){
			if( this._drill_COPa_parList_birthParentX[i] != -2000 &&
				this._drill_COPa_parList_birthParentY[i] != -2000 ){
				
				// > 粒子滞留 - 物体位置
				this._drill_par_x += ( $gameMap.adjustX(0) - this._drill_COPa_parList_birthParentX[i] )*$gameMap.tileWidth();
				this._drill_par_y += ( $gameMap.adjustY(0) - this._drill_COPa_parList_birthParentY[i] )*$gameMap.tileHeight();
			}
		}
	}
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
// ** 鼠标划过粒子贴图（第二层）【Drill_MSPa_SecSprite】
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
// **					->3A粒子私有属性（无）
// **					
// **		说明：	> 第二层粒子与 父贴图 的 J粒子变化 保持一致。
//=============================================================================
//==============================
// * 第二层粒子 - 定义
//==============================
function Drill_MSPa_SecSprite() {
    this.initialize.apply(this, arguments);
};
Drill_MSPa_SecSprite.prototype = Object.create(Drill_COPa_ComplexPar_SecSprite.prototype);
Drill_MSPa_SecSprite.prototype.constructor = Drill_MSPa_SecSprite;
//==============================
// * 第二层粒子 - 初始化
//==============================
Drill_MSPa_SecSprite.prototype.initialize = function( parentSprite ){
	Drill_COPa_ComplexPar_SecSprite.prototype.initialize.call( this, parentSprite );
}
//==============================
// * 第二层粒子 - 帧刷新
//==============================
Drill_MSPa_SecSprite.prototype.update = function() {
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
Drill_MSPa_SecSprite.prototype.drill_spriteSec_isReady = function(){
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
Drill_MSPa_SecSprite.prototype.drill_spriteSec_isOptimizationPassed = function(){
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
Drill_MSPa_SecSprite.prototype.drill_spriteSec_isNeedDestroy = function(){
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
Drill_MSPa_SecSprite.prototype.drill_spriteSec_destroy = function(){
    return Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroy.call(this);
};
//==============================
// * 第二层粒子 - 初始化子功能『控制器与贴图』
//==============================
Drill_MSPa_SecSprite.prototype.drill_spriteSec_initChild = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initChild.call( this );
};
//==============================
// * 第二层粒子 - 初始化自身『控制器与贴图』
//==============================
Drill_MSPa_SecSprite.prototype.drill_spriteSec_initSelf = function( parentSprite ){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initSelf.call( this, parentSprite );
};
//==============================
// * 第二层粒子 - 销毁子功能『控制器与贴图』
//==============================
Drill_MSPa_SecSprite.prototype.drill_spriteSec_destroyChild = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroyChild.call( this );
};
//==============================
// * 第二层粒子 - 销毁自身『控制器与贴图』
//==============================
Drill_MSPa_SecSprite.prototype.drill_spriteSec_destroySelf = function(){
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_destroySelf.call( this );
};

//==============================
// * A贴图主体（第二层） - 初始化子功能
//==============================
Drill_MSPa_SecSprite.prototype.drill_spriteSec_initAttr = function() {
	Drill_COPa_ComplexPar_SecSprite.prototype.drill_spriteSec_initAttr.call( this );
	this.zIndex = this._drill_controller.drill_data()['second_zIndex'];
};
//==============================
// * B变换特性（第二层） - 初始化子功能
//==============================
Drill_MSPa_SecSprite.prototype.drill_spriteSec_initChange = function(){
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
// ** ☆引擎兼容（STG）
//
//			说明：	> 此模块对引擎进行专门兼容。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 引擎兼容 - 最后继承1级
//==============================
var _drill_STG_MSPa_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_STG_MSPa_scene_initialize.call(this);
	
	//==============================
	// * 引擎兼容 - 插件指令『STG的插件指令』
	//==============================
	if( Imported.Drill_STG__objects ){
		
		//==============================
		// * 插件指令 - STG指令绑定
		//==============================
		var _drill_STG_MSPa_pluginCommand = Drill_STG_GameInterpreter.prototype.pluginCommand;
		Drill_STG_GameInterpreter.prototype.pluginCommand = function( command, args ){
			_drill_STG_MSPa_pluginCommand.call(this, command, args);
			this.drill_MSPa_pluginCommand( command, args );
		}
		//==============================
		// * 插件指令 - STG指令执行
		//==============================
		Drill_STG_GameInterpreter.prototype.drill_MSPa_pluginCommand = Game_Interpreter.prototype.drill_MSPa_pluginCommand;
	}
	
	//==============================
	// * 引擎兼容 - STG层级（STG）
	//==============================
	if( Imported.Drill_STG__objects ){
		
		//#############################################################################
		// ** 【标准模块】STG层级 ☆STG层级
		//#############################################################################
		//##############################
		// * STG层级 - 添加贴图到层级【标准函数】
		//				
		//			参数：	> sprite 贴图        （添加的贴图对象）
		//					> layer_index 字符串 （添加到的层级名，下层/中层/上层/图片层/最顶层）
		//			返回：	> 无
		//          
		//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
		//##############################
		Drill_STG_MapScene.prototype.drill_MSPa_layerAddSprite = function( sprite, layer_index ){
			this.drill_MSPa_layerAddSprite_Private( sprite, layer_index );
		};
		//##############################
		// * STG层级 - 去除贴图【标准函数】
		//				
		//			参数：	> sprite 贴图（添加的贴图对象）
		//			返回：	> 无
		//          
		//			说明：	> 强行规范的接口，将指定贴图从STG层级中移除。
		//##############################
		Drill_STG_MapScene.prototype.drill_MSPa_layerRemoveSprite = function( sprite ){
			this.drill_MSPa_layerRemoveSprite_Private( sprite );
		};
		//##############################
		// * STG层级 - 图片层级排序【标准函数】
		//				
		//			参数：	> 无
		//			返回：	> 无
		//          
		//			说明：	> 执行该函数后，STG层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
		//##############################
		Drill_STG_MapScene.prototype.drill_MSPa_sortByZIndex = function () {
			this.drill_MSPa_sortByZIndex_Private();
		};
		//=============================================================================
		// ** STG层级（接口实现）
		//=============================================================================
		//==============================
		// * STG层级 - 下层
		//==============================
		var _drill_MSPa_layer_createBackground = Drill_STG_Spriteset.prototype.drill_spriteset_createBackground;
		Drill_STG_Spriteset.prototype.drill_spriteset_createBackground = function() {
			_drill_MSPa_layer_createBackground.call(this);		//底部背景 < 下层 < STG机组
			if( !this._drill_STG_downArea ){
				this._drill_STG_downArea = new Sprite();
				this._baseSprite.addChild(this._drill_STG_downArea);	
			}
		};
		//==============================
		// * STG层级 - 中层
		//==============================
		var _drill_MSPa_layer_createCharacters = Drill_STG_Spriteset.prototype.drill_spriteset_createCharacters;
		Drill_STG_Spriteset.prototype.drill_spriteset_createCharacters = function() {
			_drill_MSPa_layer_createCharacters.call(this);		//STG机组 < 中层 < STG子弹
			if( !this._drill_STG_centerArea ){
				this._drill_STG_centerArea = new Sprite();			//（没有图块层）
				this._baseSprite.addChild(this._drill_STG_centerArea);	
			}
		};
		//==============================
		// * STG层级 - 上层
		//==============================
		var _drill_MSPa_layer_createBullets = Drill_STG_Spriteset.prototype.drill_spriteset_createBullets;
		Drill_STG_Spriteset.prototype.drill_spriteset_createBullets = function() {
			_drill_MSPa_layer_createBullets.call(this);			//STG子弹 < 上层 < 图片对象层
			if( !this._drill_STG_upArea ){
				this._drill_STG_upArea = new Sprite();
				this._baseSprite.addChild(this._drill_STG_upArea);	
			}
		};
		//==============================
		// * STG层级 - 图片层
		//==============================
		var _drill_MSPa_layer_createPictures = Drill_STG_Spriteset.prototype.createPictures;
		Drill_STG_Spriteset.prototype.createPictures = function() {
			_drill_MSPa_layer_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
			if( !this._drill_STG_picArea ){
				this._drill_STG_picArea = new Sprite();
				this.addChild(this._drill_STG_picArea);	
			}
		};
		//==============================
		// * STG层级 - 最顶层
		//==============================
		var _drill_MSPa_layer_createAllWindows = Drill_STG_MapScene.prototype.createAllWindows;
		Drill_STG_MapScene.prototype.createAllWindows = function() {
			_drill_MSPa_layer_createAllWindows.call(this);		//对话框集合 < 最顶层
			if( !this._drill_SenceTopArea ){
				this._drill_SenceTopArea = new Sprite();
				this.addChild(this._drill_SenceTopArea);	
			}
		};
		//==============================
		// * STG层级 - 参数定义
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
		// * STG层级 - 图片层级排序（私有）
		//==============================
		Drill_STG_MapScene.prototype.drill_MSPa_sortByZIndex_Private = function() {
			this._spriteset._drill_STG_downArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
			this._spriteset._drill_STG_centerArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
			this._spriteset._drill_STG_upArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
			this._spriteset._drill_STG_picArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
			this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
		};
		//==============================
		// * STG层级 - 去除贴图（私有）
		//==============================
		Drill_STG_MapScene.prototype.drill_MSPa_layerRemoveSprite_Private = function( sprite ){
			this._spriteset._drill_STG_downArea.removeChild( sprite );
			this._spriteset._drill_STG_centerArea.removeChild( sprite );
			this._spriteset._drill_STG_upArea.removeChild( sprite );
			this._spriteset._drill_STG_picArea.removeChild( sprite );
			this._drill_SenceTopArea.removeChild( sprite );
		};
		//==============================
		// * STG层级 - 添加贴图到层级（私有）
		//==============================
		Drill_STG_MapScene.prototype.drill_MSPa_layerAddSprite_Private = function( sprite, layer_index ){
			if( layer_index == "下层" ){
				this._spriteset._drill_STG_downArea.addChild( sprite );
			}
			if( layer_index == "中层" ){
				this._spriteset._drill_STG_centerArea.addChild( sprite );
			}
			if( layer_index == "上层" ){
				this._spriteset._drill_STG_upArea.addChild( sprite );
			}
			if( layer_index == "图片层" ){
				this._spriteset._drill_STG_picArea.addChild( sprite );
			}
			if( layer_index == "最顶层" ){
				this._drill_SenceTopArea.addChild( sprite );
			}
		};
	}
	
	//==============================
	// * 引擎兼容 - 贴图控制（STG）
	//==============================
	if( Imported.Drill_STG__objects ){
		
		//==============================
		// * 贴图控制（STG） - 判断创建『多场景与游戏窗体-STG界面』
		//==============================
		var _drill_STG_MSPa_createParticleSprite_needCreate = SceneManager.drill_MSPa_createParticleSprite_needCreate;
		SceneManager.drill_MSPa_createParticleSprite_needCreate = function( temp_controller ){
			
			if( SceneManager._scene instanceof Drill_STG_MapScene ){		//判断创建『多场景与游戏窗体-STG界面』
				if( temp_controller.drill_data()['STG_enabled'] == true ){
					return true;
				}
			}
			
			// > 原函数
			return _drill_STG_MSPa_createParticleSprite_needCreate.call( this, temp_controller );
		}
		//==============================
		// * 贴图控制（STG） - 添加贴图到层级『多场景与游戏窗体-STG界面』
		//==============================
		var _drill_STG_MSPa_createParticleSprite_layerAddSprite = SceneManager.drill_MSPa_createParticleSprite_layerAddSprite;
		SceneManager.drill_MSPa_createParticleSprite_layerAddSprite = function( temp_sprite ){
			_drill_STG_MSPa_createParticleSprite_layerAddSprite.call( this, temp_sprite );
			
			var temp_controller = temp_sprite._drill_controller;
			if( temp_controller == undefined ){ return; }
			var temp_data = temp_controller.drill_data();
			
			if( SceneManager._scene instanceof Drill_STG_MapScene ){		//添加贴图到层级『多场景与游戏窗体-STG界面』
				temp_sprite.zIndex = temp_data['STG_zIndex'];
				SceneManager._scene.drill_MSPa_layerAddSprite( temp_sprite, temp_data['STG_layerIndex'] );
			}
		}
		//==============================
		// * 贴图控制（STG） - 层级排序『多场景与游戏窗体-STG界面』
		//==============================
		var _drill_STG_MSPa_createParticleSprite_sortByZIndex = SceneManager.drill_MSPa_createParticleSprite_sortByZIndex;
		SceneManager.drill_MSPa_createParticleSprite_sortByZIndex = function(){
			_drill_STG_MSPa_createParticleSprite_sortByZIndex.call( this );
			
			if( SceneManager._scene instanceof Drill_STG_MapScene ){		//层级排序『多场景与游戏窗体-STG界面』
				SceneManager._scene.drill_MSPa_sortByZIndex();
			}
		}
		//==============================
		// * 贴图控制（STG） - 去除贴图『多场景与游戏窗体-STG界面』
		//==============================
		var _drill_STG_MSPa_createParticleSprite_layerRemoveSprite = SceneManager.drill_MSPa_createParticleSprite_layerRemoveSprite;
		SceneManager.drill_MSPa_createParticleSprite_layerRemoveSprite = function( temp_sprite ){
			_drill_STG_MSPa_createParticleSprite_layerRemoveSprite.call( this, temp_sprite );
			
			if( SceneManager._scene instanceof Drill_STG_MapScene ){		//去除贴图『多场景与游戏窗体-STG界面』
				SceneManager._scene.drill_MSPa_layerRemoveSprite( temp_sprite );
			}
		}
		//==============================
		// * 贴图控制（STG） - 界面创建时『多场景与游戏窗体-STG界面』
		//==============================
		var _drill_STG_MSPa_createAllWindows = Drill_STG_MapScene.prototype.createAllWindows;
		Drill_STG_MapScene.prototype.createAllWindows = function(){
			_drill_STG_MSPa_createAllWindows.call(this);
			SceneManager.drill_MSPa_createParticleSprite();
		};
	}
};



//=============================================================================
// ** ☆引擎兼容（ACT）
//
//			说明：	> 此模块对引擎进行专门兼容。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 引擎兼容 - 最后继承1级
//==============================
var _drill_ACT_MSPa_scene_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_ACT_MSPa_scene_initialize.call(this);
	
	//==============================
	// * 引擎兼容 - 插件指令『ACT的插件指令』
	//==============================
	if( Imported.Drill_ACT__objects ){
		
		//==============================
		// * 插件指令 - ACT指令绑定
		//==============================
		var _drill_ACT_MSPa_pluginCommand = Drill_ACT_GameInterpreter.prototype.pluginCommand;
		Drill_ACT_GameInterpreter.prototype.pluginCommand = function( command, args ){
			_drill_ACT_MSPa_pluginCommand.call(this, command, args);
			this.drill_MSPa_pluginCommand( command, args );
		}
		//==============================
		// * 插件指令 - ACT指令执行
		//==============================
		Drill_ACT_GameInterpreter.prototype.drill_MSPa_pluginCommand = Game_Interpreter.prototype.drill_MSPa_pluginCommand;
	}
	
	//==============================
	// * 引擎兼容 - ACT层级（ACT）
	//==============================
	if( Imported.Drill_ACT__objects ){
		
		//#############################################################################
		// ** 【标准模块】ACT层级 ☆ACT层级
		//#############################################################################
		//##############################
		// * ACT层级 - 添加贴图到层级【标准函数】
		//				
		//			参数：	> sprite 贴图        （添加的贴图对象）
		//					> layer_index 字符串 （添加到的层级名，下层/上层/图片层/最顶层）
		//			返回：	> 无
		//          
		//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
		//##############################
		Drill_ACT_MapScene.prototype.drill_MSPa_layerAddSprite = function( sprite, layer_index ){
			this.drill_MSPa_layerAddSprite_Private( sprite, layer_index );
		};
		//##############################
		// * ACT层级 - 去除贴图【标准函数】
		//				
		//			参数：	> sprite 贴图（添加的贴图对象）
		//			返回：	> 无
		//          
		//			说明：	> 强行规范的接口，将指定贴图从ACT层级中移除。
		//##############################
		Drill_ACT_MapScene.prototype.drill_MSPa_layerRemoveSprite = function( sprite ){
			this.drill_MSPa_layerRemoveSprite_Private( sprite );
		};
		//##############################
		// * ACT层级 - 图片层级排序【标准函数】
		//				
		//			参数：	> 无
		//			返回：	> 无
		//          
		//			说明：	> 执行该函数后，ACT层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
		//##############################
		Drill_ACT_MapScene.prototype.drill_MSPa_sortByZIndex = function () {
			this.drill_MSPa_sortByZIndex_Private();
		};
		//=============================================================================
		// ** ACT层级（接口实现）
		//=============================================================================
		//==============================
		// * ACT层级 - 下层
		//==============================
		var _drill_MSPa_layer_createBackground = Drill_ACT_Spriteset.prototype.drill_spriteset_createBackground;
		Drill_ACT_Spriteset.prototype.drill_spriteset_createBackground = function() {
			_drill_MSPa_layer_createBackground.call(this);		//底部背景 < 下层 < ACT动作体
			if( !this._drill_ACT_downArea ){
				this._drill_ACT_downArea = new Sprite();
				this._baseSprite.addChild(this._drill_ACT_downArea);	
			}
		};
		//==============================
		// * ACT层级 - 上层
		//==============================
		var _drill_MSPa_layer_createCharacters = Drill_ACT_Spriteset.prototype.drill_spriteset_createCharacters;
		Drill_ACT_Spriteset.prototype.drill_spriteset_createCharacters = function() {
			_drill_MSPa_layer_createCharacters.call(this);		//ACT动作体 < 上层 < 图片对象层
			if( !this._drill_ACT_upArea ){
				this._drill_ACT_upArea = new Sprite();				//（没有图块层）
				this._baseSprite.addChild(this._drill_ACT_upArea);	
			}
		};
		//==============================
		// * ACT层级 - 图片层
		//==============================
		var _drill_MSPa_layer_createPictures = Drill_ACT_Spriteset.prototype.createPictures;
		Drill_ACT_Spriteset.prototype.createPictures = function() {
			_drill_MSPa_layer_createPictures.call(this);			//图片对象层 < 图片层 < 对话框集合
			if( !this._drill_ACT_picArea ){
				this._drill_ACT_picArea = new Sprite();
				this.addChild(this._drill_ACT_picArea);	
			}
		};
		//==============================
		// * ACT层级 - 最顶层
		//==============================
		var _drill_MSPa_layer_createAllWindows = Drill_ACT_MapScene.prototype.createAllWindows;
		Drill_ACT_MapScene.prototype.createAllWindows = function() {
			_drill_MSPa_layer_createAllWindows.call(this);		//对话框集合 < 最顶层
			if( !this._drill_SenceTopArea ){
				this._drill_SenceTopArea = new Sprite();
				this.addChild(this._drill_SenceTopArea);	
			}
		};
		//==============================
		// * ACT层级 - 参数定义
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
		// * ACT层级 - 图片层级排序（私有）
		//==============================
		Drill_ACT_MapScene.prototype.drill_MSPa_sortByZIndex_Private = function() {
			this._spriteset._drill_ACT_downArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
			this._spriteset._drill_ACT_upArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
			this._spriteset._drill_ACT_picArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
			this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
		};
		//==============================
		// * ACT层级 - 去除贴图（私有）
		//==============================
		Drill_ACT_MapScene.prototype.drill_MSPa_layerRemoveSprite_Private = function( sprite ){
			this._spriteset._drill_ACT_downArea.removeChild( sprite );
			this._spriteset._drill_ACT_upArea.removeChild( sprite );
			this._spriteset._drill_ACT_picArea.removeChild( sprite );
			this._drill_SenceTopArea.removeChild( sprite );
		};
		//==============================
		// * ACT层级 - 添加贴图到层级（私有）
		//==============================
		Drill_ACT_MapScene.prototype.drill_MSPa_layerAddSprite_Private = function( sprite, layer_index ){
			if( layer_index == "下层" ){
				this._spriteset._drill_ACT_downArea.addChild( sprite );
			}
			if( layer_index == "上层" ){
				this._spriteset._drill_ACT_upArea.addChild( sprite );
			}
			if( layer_index == "图片层" ){
				this._spriteset._drill_ACT_picArea.addChild( sprite );
			}
			if( layer_index == "最顶层" ){
				this._drill_SenceTopArea.addChild( sprite );
			}
		};
	}
	
	//==============================
	// * 引擎兼容 - 贴图控制（ACT）
	//==============================
	if( Imported.Drill_ACT__objects ){
		
		//==============================
		// * 贴图控制（ACT） - 判断创建『多场景与游戏窗体-ACT界面』
		//==============================
		var _drill_ACT_MSPa_createParticleSprite_needCreate = SceneManager.drill_MSPa_createParticleSprite_needCreate;
		SceneManager.drill_MSPa_createParticleSprite_needCreate = function( temp_controller ){
			
			if( SceneManager._scene instanceof Drill_ACT_MapScene ){		//判断创建『多场景与游戏窗体-ACT界面』
				if( temp_controller.drill_data()['ACT_enabled'] == true ){
					return true;
				}
			}
			
			// > 原函数
			return _drill_ACT_MSPa_createParticleSprite_needCreate.call( this, temp_controller );
		}
		//==============================
		// * 贴图控制（ACT） - 添加贴图到层级『多场景与游戏窗体-ACT界面』
		//==============================
		var _drill_ACT_MSPa_createParticleSprite_layerAddSprite = SceneManager.drill_MSPa_createParticleSprite_layerAddSprite;
		SceneManager.drill_MSPa_createParticleSprite_layerAddSprite = function( temp_sprite ){
			_drill_ACT_MSPa_createParticleSprite_layerAddSprite.call( this, temp_sprite );
			
			var temp_controller = temp_sprite._drill_controller;
			if( temp_controller == undefined ){ return; }
			var temp_data = temp_controller.drill_data();
			
			if( SceneManager._scene instanceof Drill_ACT_MapScene ){		//添加贴图到层级『多场景与游戏窗体-ACT界面』
				temp_sprite.zIndex = temp_data['ACT_zIndex'];
				SceneManager._scene.drill_MSPa_layerAddSprite( temp_sprite, temp_data['ACT_layerIndex'] );
			}
		}
		//==============================
		// * 贴图控制（ACT） - 层级排序『多场景与游戏窗体-ACT界面』
		//==============================
		var _drill_ACT_MSPa_createParticleSprite_sortByZIndex = SceneManager.drill_MSPa_createParticleSprite_sortByZIndex;
		SceneManager.drill_MSPa_createParticleSprite_sortByZIndex = function(){
			_drill_ACT_MSPa_createParticleSprite_sortByZIndex.call( this );
			
			if( SceneManager._scene instanceof Drill_ACT_MapScene ){		//层级排序『多场景与游戏窗体-ACT界面』
				SceneManager._scene.drill_MSPa_sortByZIndex();
			}
		}
		//==============================
		// * 贴图控制（ACT） - 去除贴图『多场景与游戏窗体-ACT界面』
		//==============================
		var _drill_ACT_MSPa_createParticleSprite_layerRemoveSprite = SceneManager.drill_MSPa_createParticleSprite_layerRemoveSprite;
		SceneManager.drill_MSPa_createParticleSprite_layerRemoveSprite = function( temp_sprite ){
			_drill_ACT_MSPa_createParticleSprite_layerRemoveSprite.call( this, temp_sprite );
			
			if( SceneManager._scene instanceof Drill_ACT_MapScene ){		//去除贴图『多场景与游戏窗体-ACT界面』
				SceneManager._scene.drill_MSPa_layerRemoveSprite( temp_sprite );
			}
		}
		//==============================
		// * 贴图控制（ACT） - 界面创建时『多场景与游戏窗体-ACT界面』
		//==============================
		var _drill_ACT_MSPa_createAllWindows = Drill_ACT_MapScene.prototype.createAllWindows;
		Drill_ACT_MapScene.prototype.createAllWindows = function(){
			_drill_ACT_MSPa_createAllWindows.call(this);
			SceneManager.drill_MSPa_createParticleSprite();
		};
	}
};


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MouseStrokeParticle = false;
		var pluginTip = DrillUp.drill_MSPa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

