//=============================================================================
// Drill_LayerCircle.js
//=============================================================================

/*:
 * @plugindesc [v1.6]        地图 - 多层地图魔法圈
 * @author Drill_up
 * 
 * @Drill_LE_param "魔法圈层-%d"
 * @Drill_LE_parentKey "---魔法圈层组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LCi_layers_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerCircle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在地图界面中放置一个或者多个魔法圈。
 * 【支持插件关联资源的打包、加密】
 * ★★必须放在 mog多层天气效果 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 可被扩展：
 *   - Drill_LayerDynamicMaskA     地图 - 地图动态遮罩板A
 *   - Drill_LayerDynamicMaskB     地图 - 地图动态遮罩板B
 *     魔法圈可添加动态遮罩，实现玩家通过 透视镜 看到局部图像的功能。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   可以在地图的五个层级放多层不同的魔法圈。
 * 2.该插件可以装饰地图的各种层级。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启rmmv软件时，并行使用读取器复制指令。
 * 地图绑定：
 *   (1.每个配置绑定到一个指定的地图，可以多个配置绑定到同一个地图。
 *      注意配置中"所属地图"参数，"所属地图"要与你的地图id相对应。
 *   (2.留意rmmv编辑器下方的状态栏，地图id、坐标、缩放比例、事件id
 *      都有信息显示。
 * 地图层级：
 *   (1.你可以将背景放置在地图的五种层级中，分别为：
 *      下层、中层、上层、图片层、最顶层
 *   (2.地图层级之间的关系为：
 *      rmmv远景 《 下层 《 rmmv图块 《 中层 《 rmmv玩家/事件 《 上层
 *      《 rmmv图片 《 图片层 《 rmmv对话框 《 最顶层
 *   (3.最顶层的背景，可以把地图界面最高层的对话框、窗口也给挡住。
 *   (4.处于同一 地图层级 时，将根据 图片层级 再先后排序。
 * 位移比：
 *   (1.根据物理相对运动知识，近大远小，近快远慢的原则。要让魔法圈看
 *      起来真的"远"，那需要设置位移比接近1.00，越接近1.00越远。
 *   (2.需要注意的是，rmmv远景和镜头位移比固定是0.00，所以rmmv的远景
 *      每次调整都感觉不像远景，你需要换掉适合的含位移比的图层。
 *   (3.注意，位移比是根据 镜头 移动而移动，不是根据玩家移动而移动。
 *   (4.去看看最新版本的 文档图解 介绍，
 *      这里是看起来简单但是实际做起来非常复杂的坑。
 * 细节：
 *   (1.插件指令操作的变化结果，是永久性的。
 *   (2.操作隐藏的魔法圈 或者 操作其他地图的魔法圈，插件指令都会有效。
 *      注意，插件指令变化的是增量，增加用正数，减少用负数。
 *   (3.将魔法圈放置在画面正中心方法：
 *      平移：（408,312） 这时候，17,13图块是正中心
 *      位移图块偏移 = 实际图块位置 - 中心图块/2
 *      例如放在图块x66位置，66 - 17/2 = 57.5‬，57.5‬为设置的图块偏移。
 * 设计：
 *   (1.魔法圈的贴图能够设置：混合模式2乘积。
 *      此设置与 纯色滤镜 的底层结构完全一致。
 *      你可以在地图中添加旋转的红色图片，模拟探照灯红滤镜效果；
 *      也可以配置五颜六色的光点资源，模拟跳舞厅旋转的霓虹光。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__layer （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 魔法圈1 资源-魔法圈
 * 魔法圈2 资源-魔法圈
 * 魔法圈3 资源-魔法圈
 * ……
 *
 * 所有素材都放在Map__layer文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动修改地图魔法圈的各个属性：
 * 
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 显示
 * 插件指令：>地图魔法圈 : 魔法圈变量[21] : 显示
 * 
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 显示
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 隐藏
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 变混合模式 : 混合模式[2]
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 变坐标 : 变化时间[60] : 位置[100,100]
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 变坐标 : 变化时间[60] : 位置变量[25,26]
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 变透明 : 变化时间[60] : 透明度[255]
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 变透明 : 变化时间[60] : 透明度变量[21]
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 变转速 : 变化时间[60] : 转速[10.0]
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 变转速 : 变化时间[60] : 转速变量[21]
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 变缩放 : 变化时间[60] : 缩放[1.2,1.2]
 * 插件指令：>地图魔法圈 : 魔法圈[11] : 变斜切 : 变化时间[60] : 斜切[0.5,0.5]
 * 
 * 1.前半部分（魔法圈变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有2*11种组合方式。
 * 2."变坐标"的变化效果可以与速度叠加。
 * 3."变转速"中，转速的单位为 角度/帧 。
 *   变量的值可以为负数，你可以通过这种方式修改旋转方向。
 * 4."混合模式"为瞬间切换，可以去看看"0.基本定义 > 混合模式.docx"。
 * 5.插件指令的变化是永久性的。
 *   如果你想瞬间切换，设置时长为0即可。
 * 6.操作隐藏的魔法圈 或者 操作其他地图的魔法圈，插件指令仍然有效。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>地图魔法圈 : 11 : 显示
 * 插件指令(旧)：>地图魔法圈 : 11 : 隐藏
 * 插件指令(旧)：>地图魔法圈 : 11 : 变坐标 : 60 : 100 : 100
 * 插件指令(旧)：>地图魔法圈 : 11 : 变透明 : 60 : 255
 * 插件指令(旧)：>地图魔法圈 : 11 : 变转速 : 60 : 0.314
 * 插件指令(旧)：>地图魔法圈 : 11 : 变缩放 : 60 : 1.2 : 1.2
 * 插件指令(旧)：>地图魔法圈 : 11 : 变斜切 : 60 : 1.0 : 1.0
 * 插件指令(旧)：>地图魔法圈 : 11 : 变混合模式 : 2
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
 * 测试方法：   在地图中放置多个魔法圈，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【28.34ms】
 *              100个事件的地图中，平均消耗为：【17.61ms】
 *               50个事件的地图中，平均消耗为：【16.32ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.从原理上来说，多层魔法圈只是固定放置的贴图，但由于事件数量会挤占
 *   部分计算资源，所以消耗会稍微增大一些。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件关联的资源文件夹。
 * [v1.2]
 * 修改了插件内部结构。
 * [v1.3]
 * 修复了背景处于中层时，会和事件、图块相互闪烁的bug。
 * [v1.4]
 * 修复了非循环地图中，移动镜头时位移比没有效果的bug。
 * 修改了插件指令结构，旋转速度改为 角度/帧 。
 * [v1.5]
 * 修复了玩家移动时，出现1像素的轻微漂移的问题。
 * [v1.6]
 * 添加了 参数存储 功能开关，以及动态遮罩功能。
 * 
 * 
 * 
 * @param 是否开启参数存储
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 一般建议 关闭 存储。注意，此开关详细介绍去看看文档说明。
 * @default false
 * 
 * @param ---魔法圈层组 1至20---
 * @default
 *
 * @param 魔法圈层-1
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-2
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-3
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-4
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-5
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-6
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-7
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-8
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-9
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-10
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-11
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-12
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-13
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-14
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-15
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-16
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-17
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-18
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-19
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-20
 * @parent ---魔法圈层组 1至20---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组21至40---
 * @default
 *
 * @param 魔法圈层-21
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-22
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-23
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-24
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-25
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-26
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-27
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-28
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-29
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-30
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-31
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-32
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-33
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-34
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-35
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-36
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-37
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-38
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-39
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-40
 * @parent ---魔法圈层组21至40---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组41至60---
 * @default
 *
 * @param 魔法圈层-41
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-42
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-43
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-44
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-45
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-46
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-47
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-48
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-49
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-50
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-51
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-52
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-53
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-54
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-55
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-56
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-57
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-58
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-59
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-60
 * @parent ---魔法圈层组41至60---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组61至80---
 * @default
 *
 * @param 魔法圈层-61
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-62
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-63
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-64
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-65
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-66
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-67
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-68
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-69
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-70
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-71
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-72
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-73
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-74
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-75
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-76
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-77
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-78
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-79
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-80
 * @parent ---魔法圈层组61至80---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组81至100---
 * @default
 *
 * @param 魔法圈层-81
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-82
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-83
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-84
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-85
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-86
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-87
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-88
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-89
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-90
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-91
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-92
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-93
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-94
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-95
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-96
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-97
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-98
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-99
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-100
 * @parent ---魔法圈层组81至100---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组101至120---
 * @default
 *
 * @param 魔法圈层-101
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-102
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-103
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-104
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-105
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-106
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-107
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-108
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-109
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-110
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-111
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-112
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-113
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-114
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-115
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-116
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-117
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-118
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-119
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-120
 * @parent ---魔法圈层组101至120---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组121至140---
 * @default
 *
 * @param 魔法圈层-121
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-122
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-123
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-124
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-125
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-126
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-127
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-128
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-129
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-130
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-131
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-132
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-133
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-134
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-135
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-136
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-137
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-138
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-139
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-140
 * @parent ---魔法圈层组121至140---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组141至160---
 * @default
 *
 * @param 魔法圈层-141
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-142
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-143
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-144
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-145
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-146
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-147
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-148
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-149
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-150
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-151
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-152
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-153
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-154
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-155
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-156
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-157
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-158
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-159
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-160
 * @parent ---魔法圈层组141至160---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组161至180---
 * @default
 *
 * @param 魔法圈层-161
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-162
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-163
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-164
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-165
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-166
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-167
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-168
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-169
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-170
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-171
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-172
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-173
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-174
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-175
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-176
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-177
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-178
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-179
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-180
 * @parent ---魔法圈层组161至180---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param ---魔法圈层组181至200---
 * @default
 *
 * @param 魔法圈层-181
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-182
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-183
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-184
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-185
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-186
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-187
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-188
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-189
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-190
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-191
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-192
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-193
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-194
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-195
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-196
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-197
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-198
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-199
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 * @param 魔法圈层-200
 * @parent ---魔法圈层组181至200---
 * @type struct<LCiMapCircle>
 * @desc 魔法圈的详细配置信息。
 * @default 
 *
 */
/*~struct~LCiMapCircle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的地图魔法圈==
 * 
 * @param ---绑定---
 * @default 
 *
 * @param 是否作用到所有地图
 * @parent ---绑定---
 * @type boolean
 * @on 作用到所有
 * @off 作用于指定地图
 * @desc 你可以设置作用到所有地图。注意，设置后直接对所有地图有效，使用前一定要想好想清楚了。
 * @default false
 * 
 * @param 所属地图
 * @parent 是否作用到所有地图
 * @type number
 * @min 1
 * @desc 该魔法圈将放在指定对应的地图id中。
 * @default 1
 * 
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 初始是否显示
 * @parent ---贴图---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-魔法圈
 * @parent ---贴图---
 * @desc 魔法圈的图片资源。
 * @default 魔法圈-默认地图魔法圈
 * @require 1
 * @dir img/Map__layer/
 * @type file
 *
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param 平移-魔法圈 X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 平移-魔法圈 Y
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 旋转速度
 * @parent ---贴图---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 2.50
 * 
 * @param 位移比X
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，魔法圈和镜头的位移一致。设置0.00则魔法圈不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移比Y
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，魔法圈和镜头的位移一致。设置0.00则魔法圈不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移图块偏移 X
 * @parent ---贴图---
 * @desc 与位移比相关，图片的中心点所在的图块X偏移量。单位图块，可为小数。
 * @default 0
 *
 * @param 位移图块偏移 Y
 * @parent ---贴图---
 * @desc 与位移比相关，图片的中心点所在的图块Y偏移量。单位图块，可为小数。
 * @default 0
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
 * @desc 地图所在的层级位置，具体关系看看插件说明。
 * @default 中层
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 魔法圈在同一个地图层，先后排序的位置，0表示最后面。
 * @default 4
 * 
 * @param ---3d效果---
 * @desc 
 * 
 * @param 缩放 X
 * @parent ---3d效果---
 * @desc 魔法圈的缩放X值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 缩放 Y
 * @parent ---3d效果---
 * @desc 魔法圈的缩放Y值，默认比例1.0。缩放将会使得魔法圈看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 斜切 X
 * @parent ---3d效果---
 * @desc 魔法圈的斜切X值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 斜切 Y
 * @parent ---3d效果---
 * @desc 魔法圈的斜切Y值，默认比例0.0。斜切将会使得魔法圈看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param ---动态遮罩---
 * @desc 
 * 
 * @param 是否启用地图动态遮罩
 * @parent ---动态遮罩---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 设置后，魔法圈会被 地图动态遮罩板 遮住，通过特定的 透视镜 才能看到该魔法圈的部分画面。
 * @default false
 *
 * @param 关联的动态遮罩板
 * @parent ---动态遮罩---
 * @type select
 * @option 动态遮罩板A
 * @value 动态遮罩板A
 * @option 动态遮罩板B
 * @value 动态遮罩板B
 * @desc 关联绑定的动态遮罩板。
 * @default 动态遮罩板A
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LCi（Layer_Circle）
//		临时全局变量	DrillUp.g_LCi_xxx
//		临时局部变量	this._drill_LCi_xxx
//		存储数据变量	$gameSystem._drill_LCi_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理) 每帧
//		性能测试因素	对话管理层
//		性能测试消耗	16.32ms  3.77ms（updateBase）
//		最坏情况		暂无
//		备注			暂无
//
//插件记录：
//		★大体框架与功能如下：
//			多层地图魔法圈：
//				->基本属性
//					->地图层级、图片层级（多插件相互作用）
//					->旋转
//					->镜头位移比
//				->可修改的属性
//					->显示隐藏
//					->坐标、速度、透明、混合模式
//					->缩放、斜切
//					->色调 ？x
//
//			地图界面全层级关系：
//				Spriteset： LowerLayer：	rmmv远景 < 下层 < rmmv图块 < 中层 < rmmv角色 < rmmv鼠标目的地 < 上层 < rmmv天气
//							UpperLayer：	< rmmv图片 < (时间框层) < (闪烁幕布层) < 图片层
//											< MOG的ui层【_hudField】 < ui层【_drill_map_top_board】
//				AllWindows：WindowLayer：	< rmmv对话框 < rmmv滚动文章 < 最顶层【_drill_SenceTopArea】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.使用插件指令变化时，changing将会作为一个变化容器，根据时间对【数据】进行改变。
//			3.原理基于【定量】赋值，【你直接用_displayX就可以了】,增量赋值方法绕太多远路！
//			4.【这里的镜头位移比是相减，而背景的是相加】。
//
//		★其它说明细节：
//			1.循环时，_displayY会舍去取余，你需要控制图片的位置偏移的取余量不变。
//				
//		★存在的问题：
//			1.位移图块偏移 X为小数，但是不明原因必须用【parseFloat】才能解析小数。
//			  使用Number会变成NAN。
//


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerCircle = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerCircle');
	
	//==============================
	// * 变量获取 - 魔法圈
	//				（~struct~LCiMapCircle）
	//==============================
	DrillUp.drill_LCi_circleInit = function( dataFrom ) {
		var data = {};
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "false") == "true";
		data['map'] = Number( dataFrom["所属地图"] || 0);
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-魔法圈"] || "");
		data['x'] = Number( dataFrom["平移-魔法圈 X"] || 0);
		data['y'] = Number( dataFrom["平移-魔法圈 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['rotate'] = Number( dataFrom["旋转速度"] || 0.0);
		
		data['layer_index'] = String( dataFrom["地图层级"] || "下层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		data['XPer'] = Number( dataFrom["位移比X"] || 0);
		data['YPer'] = Number( dataFrom["位移比Y"] || 0);
		data['tile_x'] = parseFloat( dataFrom["位移图块偏移 X"] || 0);
		data['tile_y'] = parseFloat( dataFrom["位移图块偏移 Y"] || 0);
		
		// > 3d效果
		data['scale_x'] = Number( dataFrom["缩放 X"] || 1.0);
		data['scale_y'] = Number( dataFrom["缩放 Y"] || 1.0);
		data['skew_x'] = Number( dataFrom["斜切 X"] || 0);
		data['skew_y'] = Number( dataFrom["斜切 Y"] || 0);
		
		// > 动态遮罩
		data['dynamicMask_enabled'] = String( dataFrom["是否启用地图动态遮罩"] || "false") == "true";
		data['dynamicMask_bind'] = String( dataFrom["关联的动态遮罩板"] || "动态遮罩板A");
		
		return data;
	}

	/*-----------------杂项------------------*/
	DrillUp.g_LCi_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*-----------------魔法圈------------------*/
	DrillUp.g_LCi_layers_length = 200;
	DrillUp.g_LCi_layers = [];
	for (var i = 0; i < DrillUp.g_LCi_layers_length; i++) {
		if( DrillUp.parameters['魔法圈层-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['魔法圈层-' + String(i+1) ]);
			DrillUp.g_LCi_layers[i] = DrillUp.drill_LCi_circleInit( temp );
			DrillUp.g_LCi_layers[i]['id'] = Number(i)+1;
			DrillUp.g_LCi_layers[i]['inited'] = true;
		}else{
			DrillUp.g_LCi_layers[i] = DrillUp.drill_LCi_circleInit( {} );
			DrillUp.g_LCi_layers[i]['id'] = Number(i)+1;
			DrillUp.g_LCi_layers[i]['inited'] = false;
		}
	}

	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapLayer = function(filename) {
    return this.loadBitmap('img/Map__layer/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LCi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LCi_pluginCommand.call(this, command, args);
	
	if( command === ">地图魔法圈" ){ // >地图魔法圈 : 魔法圈[1] : 显示
		if(args.length >= 2){
			var id = -1;
			var temp1 = String(args[1]);
			if( temp1.indexOf("魔法圈[") != -1 ){
				temp1 = temp1.replace("魔法圈[","");
				temp1 = temp1.replace("]","");
				id = Number(temp1);
			}
			if( temp1.indexOf("魔法圈变量[") != -1 ){
				temp1 = temp1.replace("魔法圈变量[","");
				temp1 = temp1.replace("]","");
				id = $gameVariables.value(Number(temp1));
			}
			
			if( id != -1 ){
				var changing = {};
				changing['id'] = id;
				changing['time'] = 0;
				changing['destroy'] = false;
				
				if(args.length == 4){
					var type = String(args[3]);
					if( type == "显示" || type == "隐藏" ){
						changing['type'] = type;
						$gameSystem._drill_LCi_dataTank_changing.push(changing);
						return;
					}
				}
				if(args.length == 6){
					var type = String(args[3]);
					var temp2 = String(args[5]);
					if( type == "变混合模式" ){
						var num_list = this.drill_LCi_getArgNumList(temp2);
						changing['type'] = type;
						changing['data1'] = num_list[0];
						$gameSystem._drill_LCi_dataTank_changing.push(changing);
						return;
					}
				}
				if(args.length == 8){
					var type = String(args[3]);
					var temp2 = String(args[5]);
					var temp3 = String(args[7]);
					if( type == "变坐标" ){
						var num_list2 = this.drill_LCi_getArgNumList(temp2);
						var num_list3 = this.drill_LCi_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						changing['data3'] = num_list3[1];
						$gameSystem._drill_LCi_dataTank_changing.push(changing);
						return;
					}
					if( type == "变透明" ){
						var num_list2 = this.drill_LCi_getArgNumList(temp2);
						var num_list3 = this.drill_LCi_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						$gameSystem._drill_LCi_dataTank_changing.push(changing);
						return;
					}
					if( type == "变转速" ){
						var num_list2 = this.drill_LCi_getArgNumList(temp2);
						var num_list3 = this.drill_LCi_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						$gameSystem._drill_LCi_dataTank_changing.push(changing);
						return;
					}
					if( type == "变缩放" ){
						var num_list2 = this.drill_LCi_getArgNumList(temp2);
						var num_list3 = this.drill_LCi_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						changing['data3'] = num_list3[1];
						$gameSystem._drill_LCi_dataTank_changing.push(changing);
						return;
					}
					if( type == "变斜切" ){
						var num_list2 = this.drill_LCi_getArgNumList(temp2);
						var num_list3 = this.drill_LCi_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						changing['data3'] = num_list3[1];
						$gameSystem._drill_LCi_dataTank_changing.push(changing);
						return;
					}
				}
			}
		}
	}
	
	/*-----------------旧指令------------------*/
	if( command === ">地图魔法圈" ){ // >地图魔法圈 : 1 : 显示
		if(args.length >= 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if( /^\d+$/.test(temp1) == false ){ return; }	//（判断数字）
			var changing = {};
			changing['destroy'] = false;
			changing['time'] = 0;
			changing['id'] = temp1;
			changing['type'] = type;
			if( args[5] != undefined ){ changing['data1'] = Number(args[5]); }
			if( args[7] != undefined ){ changing['data2'] = Number(args[7]); }
			if( args[9] != undefined ){ changing['data3'] = Number(args[9]); }
			if( args[11] != undefined ){ changing['data4'] = Number(args[11]); }
			if( args[13] != undefined ){ changing['data5'] = Number(args[13]); }
			$gameSystem._drill_LCi_dataTank_changing.push(changing);
		}
	}
};
//==============================
// * 插件指令 - 获取方括号中的数字（返回数字数组）
//==============================
Game_Interpreter.prototype.drill_LCi_getArgNumList = function( arg_str ){
	var arr = arg_str.match( /([^\[]+)\[([^\]]+)\]/ );
	if( arr.length >= 3 ){
	// > 有方括号
		var data_name = arr[1];
		var data_list = arr[2].split(",");
		var result_list = [];
		
		if( data_name.contains("变量") ){
			for(var i=0; i < data_list.length; i++){ result_list.push( $gameVariables.value(Number(data_list[i])) ); }
			return result_list;
		}else{
			for(var i=0; i < data_list.length; i++){ result_list.push( Number(data_list[i]) ); }
			return result_list;
		}
	}else{
	// > 没有方括号
		var data_list = arg_str.split(",");
		var result_list = [];
		for(var i=0; i < data_list.length; i++){ result_list.push( Number(data_list[i]) ); }
		return result_list;
	}
};


//=============================================================================
// ** 存储数据
//=============================================================================
//==============================
// ** 存储数据 - 初始化
//==============================
var _drill_LCi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LCi_sys_initialize.call(this);
	this.drill_LCi_initData();
};
//==============================
// ** 存储数据 - 初始化数据
//==============================
Game_System.prototype.drill_LCi_initData = function() {
	this._drill_LCi_dataTank_changing = [];	//插件指令变化容器
	this._drill_LCi_dataTank_map = [];		//当前地图的魔法圈容器
	this._drill_LCi_dataTank = [];			//魔法圈数据总容器
	
	for(var i = 0; i< DrillUp.g_LCi_layers.length ;i++){
		var data = JSON.parse(JSON.stringify( DrillUp.g_LCi_layers[i] ));	//深拷贝数据
		
		// > 私有变量初始化
		data['cameraX'] = 0;		//实际镜头的x精确坐标
		data['cameraY'] = 0;		//
		data['loopX'] = 0;			//循环地图中，走动循环的次数
		data['loopY'] = 0;			//
		data['loopFixX'] = 0;		//循环地图中，把displayX取余的部分加回
		data['loopFixY'] = 0;		//
		
		this._drill_LCi_dataTank.push(data);
	}
};	
//==============================
// * 存档文件 - 载入存档 - 数据赋值
//==============================
var _drill_LCi_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents){
	_drill_LCi_extractSaveContents.call( this, contents );
	
	if( DrillUp.g_LCi_saveEnabled == false ){	//（未开参数存储，则直接覆盖初始化数据）
		$gameSystem.drill_LCi_initData();
		$gameMap.drill_LCi_initMapdata();
	}
};


//=============================================================================
// ** 地图
//=============================================================================
//==============================
// ** 地图 - 初始化
//==============================
var _drill_LCi_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_LCi_setup.call(this,mapId);
	this.drill_LCi_initMapdata();
}
Game_Map.prototype.drill_LCi_initMapdata = function() {
	$gameSystem._drill_LCi_dataTank_map = [];		//刷新当前地图的魔法圈
	for(var i = 0; i< $gameSystem._drill_LCi_dataTank.length ;i++){
		var data = $gameSystem._drill_LCi_dataTank[i];
		if( data['inited'] != true ){ continue; }
		if( data['mapToAll'] == true || data['map'] == this._mapId ){
			$gameSystem._drill_LCi_dataTank_map.push(data);
		}
	}
}
//==============================
// * 玩家 - 帧刷新 镜头位置
//
//			说明：	注意，玩家update与地图update有时间差，且晚1帧，所以只能继承玩家的update。
//==============================
var _drill_LCi_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function( sceneActive ){
    _drill_LCi_player_update.call( this, sceneActive );
	
	for(var i = 0; i< $gameSystem._drill_LCi_dataTank_map.length ;i++){
		var data = $gameSystem._drill_LCi_dataTank_map[i];
		data['cameraX'] = ($gameMap._displayX + data['loopFixX'] - data['tile_x']) * $gameMap.tileWidth();
		data['cameraY'] = ($gameMap._displayY + data['loopFixY'] - data['tile_y']) * $gameMap.tileHeight();
	}
};
//==============================
// * 镜头滚动 - 向下滚动
//==============================
var _drill_LCi_Map_scrollDown = Game_Map.prototype.scrollDown;
Game_Map.prototype.scrollDown = function(distance) {
    if (this.isLoopVertical() && this._displayY + distance >= $dataMap.height) {
		for(var i =0; i<$gameSystem._drill_LCi_dataTank_map.length; i++){
			var data = $gameSystem._drill_LCi_dataTank_map[i];
			if( data['map'] == this._mapId ){
				data['loopY'] += 1;		//（记录地图移动时循环次数、偏移量）
				data['loopFixY'] = data.loopY * $dataMap.height;
			}
		}
	}
    _drill_LCi_Map_scrollDown.call(this, distance);
};
//==============================
// * 镜头滚动 - 向上滚动
//==============================
var _drill_LCi_Map_scrollUp = Game_Map.prototype.scrollUp;
Game_Map.prototype.scrollUp = function(distance) {
    if (this.isLoopVertical() && this._displayY - distance <= 0 ) {
		for(var i =0; i<$gameSystem._drill_LCi_dataTank_map.length; i++){
			var data = $gameSystem._drill_LCi_dataTank_map[i];
			if( data['map'] == this._mapId ){
				data['loopY'] -= 1;		//（记录地图移动时循环次数、偏移量）
				data['loopFixY'] = data.loopY * $dataMap.height;
			}
		}
	}
    _drill_LCi_Map_scrollUp.call(this, distance);
};
//==============================
// * 镜头滚动 - 向左滚动
//==============================
var _drill_LCi_Map_scrollLeft = Game_Map.prototype.scrollLeft;
Game_Map.prototype.scrollLeft = function(distance) {
    if (this.isLoopHorizontal() && this._displayX - distance <= 0) {
		for(var i =0; i<$gameSystem._drill_LCi_dataTank_map.length; i++){
			var data = $gameSystem._drill_LCi_dataTank_map[i];
			if( data['map'] == this._mapId ){
				data['loopX'] -= 1;		//（记录地图移动时循环次数、偏移量）
				data['loopFixX'] = data.loopX * $dataMap.width;
			}
		}
	}
    _drill_LCi_Map_scrollLeft.call(this, distance);
};
//==============================
// * 镜头滚动 - 向右滚动
//==============================
var _drill_LCi_Map_scrollRight = Game_Map.prototype.scrollRight;
Game_Map.prototype.scrollRight = function(distance) {
    if (this.isLoopHorizontal() && this._displayX + distance >= $dataMap.width) {
		for(var i =0; i<$gameSystem._drill_LCi_dataTank_map.length; i++){
			var data = $gameSystem._drill_LCi_dataTank_map[i];
			if( data['map'] == this._mapId ){
				data['loopX'] += 1;		//（记录地图移动时循环次数、偏移量）
				data['loopFixX'] = data.loopX * $dataMap.width;
			}
		}
	}
    _drill_LCi_Map_scrollRight.call(this, distance);
};


//=============================================================================
// ** 地图层级
//=============================================================================
//==============================
// ** 下层
//==============================
var _drill_LCi_layer_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_LCi_layer_createParallax.call(this);		//rmmv远景 < 下层 < rmmv图块
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// ** 中层
//==============================
var _drill_LCi_layer_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_LCi_layer_createTilemap.call(this);		//rmmv图块 < 中层 < rmmv角色
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// ** 上层
//==============================
var _drill_LCi_layer_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_LCi_layer_createDestination.call(this);	//rmmv鼠标目的地 < 上层 < rmmv天气
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// ** 图片层
//==============================
var _drill_LCi_layer_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_LCi_layer_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// ** 最顶层
//==============================
var _drill_LCi_layer_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LCi_layer_createAllWindows.call(this);	//rmmv对话框 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Scene_Map.prototype.drill_LCi_sortByZIndex = function() {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图界面 - 创建
//==============================
var _drill_LCi_Scene_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LCi_Scene_createAllWindows.call(this);
	this.drill_LCi_create();	
};
Scene_Map.prototype.drill_LCi_create = function() {
	this._drill_LCi_spriteTank = [];
	this._drill_LCi_spriteTank_bitmap = [];
	
	var data_tank = $gameSystem._drill_LCi_dataTank_map;
	for(var i=0; i< data_tank.length; i++){
		var temp_data = data_tank[i];
		
		// > 子贴图
		var temp_sprite_bitmap = new Sprite( ImageManager.load_MapLayer( temp_data['src_img'] ) );
		temp_sprite_bitmap.anchor.x = 0.5;
		temp_sprite_bitmap.anchor.y = 0.5;
		this._drill_LCi_spriteTank_bitmap.push(temp_sprite_bitmap);
		
		// > 贴图属性
		var temp_sprite = new Sprite();
		temp_sprite.x = temp_data['x'];
		temp_sprite.y = temp_data['y'];
		temp_sprite.opacity = temp_data['opacity'];
		temp_sprite.blendMode = temp_data['blendMode'];
		temp_sprite.rotate = temp_data['rotate'];
		temp_sprite.zIndex = temp_data['zIndex'];
		temp_sprite.layer_index = temp_data['layer_index'];
		temp_sprite.scale.x = temp_data['scale_x'];
		temp_sprite.scale.y = temp_data['scale_y'];
		temp_sprite.skew.x = temp_data['skew_x'];
		temp_sprite.skew.y = temp_data['skew_y'];
		temp_sprite.addChild(temp_sprite_bitmap);
		
		// > 创建动态遮罩
		if( temp_data['visible'] == true ){
			this.drill_LCi_createMaskSprite( temp_data, temp_sprite );
			temp_sprite['_mask_inited'] = true;
			
		// > 创建动态遮罩（延迟创建）
		}else{
			temp_sprite['_mask_inited'] = false;
		}
		
		// > 地图层级
		this._drill_LCi_spriteTank.push(temp_sprite);
		if( temp_sprite['layer_index'] == '下层' ){
			this._spriteset._drill_mapDownArea.addChild(temp_sprite);
		}
		if( temp_sprite['layer_index'] == '中层' ){
			this._spriteset._drill_mapCenterArea.addChild(temp_sprite);
		}
		if( temp_sprite['layer_index'] == '上层' ){
			this._spriteset._drill_mapUpArea.addChild(temp_sprite);
		}
		if( temp_sprite['layer_index'] == '图片层' ){
			this._spriteset._drill_mapPicArea.addChild(temp_sprite);
		}
		if( temp_sprite['layer_index'] == '最顶层' ){
			this._drill_SenceTopArea.addChild(temp_sprite);
		}
	}
	this.drill_LCi_sortByZIndex();		//排序
}
//==============================
// * 地图界面 - 创建动态遮罩
//==============================
Scene_Map.prototype.drill_LCi_createMaskSprite = function( temp_data, temp_sprite ){
	if( temp_data['dynamicMask_enabled'] != true ){ return; }
	
	if( Imported.Drill_LayerDynamicMaskA && temp_data['dynamicMask_bind'] == "动态遮罩板A" ){
		var temp_mask = this.drill_LDMA_getMaskSprite();
		temp_sprite.mask = temp_mask;
		this._drill_SenceTopArea.addChild(temp_mask);
	}
	if( Imported.Drill_LayerDynamicMaskB && temp_data['dynamicMask_bind'] == "动态遮罩板B" ){
		var temp_mask = this.drill_LDMB_getMaskSprite();
		temp_sprite.mask = temp_mask;
		this._drill_SenceTopArea.addChild(temp_mask);
	}
}

//==============================
// * 帧刷新
//==============================
var _drill_LCi_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_LCi_scene_update.call(this);
	
	this.drill_LCi_updateBase();			//基本属性（在游戏使用事件指令"结束游戏"后，让玩家移动，会造成图层错位问题。）
	
	if( this.isActive() == true ){
		this.drill_LCi_updateChange();		//变化属性（该变化必须等 isActive 激活后执行，不然在变化时，会闪……目前原因不明，但也没必要深究了）
	}
};
//==============================
// * 帧刷新 - 基本属性
//==============================
Scene_Map.prototype.drill_LCi_updateBase = function() {
	var sprite_tank = this._drill_LCi_spriteTank ;
	var sprite_tank_bitmap = this._drill_LCi_spriteTank_bitmap ;
	var data_tank = $gameSystem._drill_LCi_dataTank_map;
	
	for(var i=0; i< sprite_tank.length; i++){
		var temp_sprite = sprite_tank[i];
		var temp_sprite_bitmap = sprite_tank_bitmap[i];
		var temp_data = data_tank[i];
		if( temp_sprite_bitmap.bitmap.isReady() ){
			
			// > 属性实时变化
			temp_sprite.visible = temp_data['visible'];
			temp_sprite.opacity = temp_data['opacity'];
			temp_sprite.blendMode = temp_data['blendMode'];
			
			// > 自旋转
			temp_sprite_bitmap.rotation += ( temp_data['rotate'] /180 * Math.PI );
			
			// > 位移
			var xx = temp_data['x'];
			var yy = temp_data['y'];
			xx += temp_data['cameraX'] * (1 - temp_data['XPer']);
			yy += temp_data['cameraY'] * (1 - temp_data['YPer']);
			temp_sprite.x = xx;
			temp_sprite.y = yy;
			//（初始位移 + 镜头位移 * 位移比 ）
		}
		
		// > 创建动态遮罩（延迟创建）
		if( temp_sprite['_mask_inited'] == false && temp_data['visible'] == true ){
			temp_sprite['_mask_inited'] = true;
			this.drill_LCi_createMaskSprite( temp_data, temp_sprite );
		}
	}
};
//==============================
// * 帧刷新 - 变化属性
//==============================
Scene_Map.prototype.drill_LCi_updateChange = function() {
	var data_tank = $gameSystem._drill_LCi_dataTank_map;
	var sprite_tank = this._drill_LCi_spriteTank;
	var sprite_tank_bitmap = this._drill_LCi_spriteTank;
	var change_tank = $gameSystem._drill_LCi_dataTank_changing;
	//if(change_tank.length > 0){
	//	alert(JSON.stringify(change_tank));
	//	alert(JSON.stringify(data_tank));
	//}
	
	for(var i=0; i< data_tank.length; i++){		//只变数据，不变sprite
		var temp_data = data_tank[i];
		var temp_sprite = sprite_tank[i];
		var temp_sprite_bitmap = sprite_tank_bitmap[i];
		for(var j=0; j< change_tank.length; j++){
			var temp_change = change_tank[j];
			if( temp_data['id'] == temp_change.id && temp_change.destroy == false ){
				temp_change.time += 1;
				
				if( temp_change.type == "显示" ){
					temp_data['visible'] = true;
					temp_change.destroy = true;
				}
				
				if( temp_change.type == "隐藏" ){
					temp_data['visible'] = false;
					temp_change.destroy = true;
				}
				
				if( temp_change.type == "变混合模式" ){
					temp_data['blendMode'] = temp_change.data1;
					temp_change.destroy = true;
				}
				
				if( temp_change.type == "变坐标" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._x = temp_change.data2 - temp_data['x'];
						temp_change._y = temp_change.data3 - temp_data['y'];
					}
					if( temp_change.time <= temp_change._dest ){
						temp_data['x'] += temp_change._x / temp_change._dest;
						temp_data['y'] += temp_change._y / temp_change._dest;
					}
					if( temp_change.time >= temp_change._dest ){
						temp_change.destroy = true;
					}
				}
				
				if( temp_change.type == "变透明" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._opacity = temp_change.data2 - temp_data['opacity'];
					}
					temp_data['opacity'] += temp_change._opacity / temp_change._dest;
					if( temp_change.time >= temp_change._dest ){
						temp_change.destroy = true;
					}
				}
				
				if( temp_change.type == "变转速" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._rotate = temp_change.data2 - temp_data['rotate'];
					}
					temp_data['rotate'] += temp_change._rotate / temp_change._dest;
					if( temp_change.time >= temp_change._dest ){
						temp_change.destroy = true;
					}
				}
				
				/*
				if( temp_change.type == "变色调" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._color_tone = temp_sprite_bitmap.getColorTone();
						temp_change._r = temp_change.data2 - temp_change._color_tone[0];
						temp_change._g = temp_change.data3 - temp_change._color_tone[1];
						temp_change._b = temp_change.data4 - temp_change._color_tone[2];
						temp_change._a = temp_change.data5 - temp_change._color_tone[3];
					}
					temp_change._color_tone[0] += temp_change._r / temp_change._dest;
					temp_change._color_tone[1] += temp_change._g / temp_change._dest;
					temp_change._color_tone[2] += temp_change._b / temp_change._dest;
					temp_change._color_tone[3] += temp_change._a / temp_change._dest;
					if( temp_change.time % 8 == 0 ){
						temp_sprite_bitmap.setColorTone( 
							[ temp_change._color_tone[0] ,temp_change._color_tone[1],
							temp_change._color_tone[2],temp_change._color_tone[3]	]);
					}
					if( temp_change.time >= temp_change._dest ){
						temp_sprite_bitmap.setColorTone( 
							[ 255,0,0,255	]);
						temp_change.destroy = true;
					}
				}*/
				
				if( temp_change.type == "变缩放" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._scale_x = temp_change.data2 - temp_sprite.scale.x;
						temp_change._scale_y = temp_change.data3 - temp_sprite.scale.y;
					}
					temp_sprite.scale.x += temp_change._scale_x / temp_change._dest;
					temp_sprite.scale.y += temp_change._scale_y / temp_change._dest;
					if( temp_change.time >= temp_change._dest ){
						temp_change.destroy = true;
					}
				}
				
				if( temp_change.type == "变斜切" ){
					if( temp_change.time == 1 ){
						temp_change._dest = Math.max( temp_change.data1,1 );
						temp_change._skew_x = temp_change.data2 - temp_sprite.skew.x;
						temp_change._skew_y = temp_change.data3 - temp_sprite.skew.y;
					}
					temp_sprite.skew.x += temp_change._skew_x / temp_change._dest;
					temp_sprite.skew.y += temp_change._skew_y / temp_change._dest;
					if( temp_change.time >= temp_change._dest ){
						temp_change.destroy = true;
					}
				}
			}
		}
	}
	
	// > 清除变化集
	for(var j = change_tank.length-1; j >= 0; j--){
		if( change_tank[j].destroy == true ){
			change_tank.splice(j, 1);
		}
	}
}


