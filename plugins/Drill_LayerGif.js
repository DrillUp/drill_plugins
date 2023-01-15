//=============================================================================
// Drill_LayerGif.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        地图 - 多层地图GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "GIF层-%d"
 * @Drill_LE_parentKey "---GIF层组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LGi_layers_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在地图界面中放置一个或者多个GIF。
 * ★★必须放在 mog多层天气效果 插件的后面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 可被扩展：
 *   - Drill_LayerDynamicMaskA     地图-地图动态遮罩板A
 *   - Drill_LayerDynamicMaskB     地图-地图动态遮罩板B
 *     地图GIF可添加动态遮罩，实现玩家通过 透视镜 看到局部图像的功能。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   可以在地图的五个层级放多层不同的GIF。
 * 2.该插件可以装饰地图的各种层级。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 地图绑定：
 *   (1.每个配置绑定到一个指定的地图，可以多个配置绑定到同一个地图。
 *      注意配置中"所属地图"参数，"所属地图"要与你的地图id相对应。
 *   (2.留意游戏编辑器下方的状态栏，地图id、坐标、缩放比例、事件id
 *      都有信息显示。
 * 地图层级：
 *   (1.你可以将背景放置在地图的五种层级中，分别为：
 *      下层、中层、上层、图片层、最顶层
 *   (2.地图层级之间的关系为：
 *      地图远景 《 下层 《 图块层 《 中层 《 事件/玩家层 《 上层
 *      《  图片对象层 《  图片层 《  对话框集合 《  最顶层
 *   (3.最顶层的背景，可以把地图界面最高层的对话框、窗口也给挡住。
 *   (4.处于同一 地图层级 时，将根据 图片层级 再先后排序。
 * 位移比：
 *   (1.根据物理相对运动知识，近大远小，近快远慢的原则。要让GIF看起
 *      来真的"远"，那需要设置位移比接近1.00，越接近1.00越远。
 *   (2.需要注意的是，地图远景和镜头位移比固定是0.00，所以地图远景
 *      每次调整都感觉不像远景，你需要换掉适合的含位移比的图层。
 *   (3.注意，位移比是根据 镜头 移动而移动，不是根据玩家移动而移动。
 *   (4.去看看最新版本的 文档图解 介绍，
 *      这里是看起来简单但是实际做起来非常复杂的坑。
 * 细节：
 *   (1.插件指令操作的变化结果，是永久性的。
 *   (2.操作隐藏的GIF 或者 操作其他地图的GIF，插件指令都会有效。
 *      注意，插件指令变化的是增量，增加用正数，减少用负数。
 *   (3.将GIF放置在界面正中心方法：
 *      平移：（408,312） 这时候，17,13图块是正中心
 *      位移图块偏移 = 实际图块位置 - 中心图块/2
 *      例如放在图块x66位置，66 - 17/2 = 57.5‬，57.5‬为设置的图块偏移。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__layer_gif （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__layer_gif文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 背景层1 资源-背景
 * 背景层2 资源-背景
 * 背景层3 资源-背景
 * ……
 *
 * 所有素材都放在Map__layer_gif文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令手动修改地图GIF的各个属性：
 * 
 * 插件指令：>地图GIF : GIF[11] : 显示
 * 插件指令：>地图GIF : GIF变量[21] : 显示
 *
 * 插件指令：>地图GIF : GIF[11] : 显示
 * 插件指令：>地图GIF : GIF[11] : 隐藏
 * 插件指令：>地图GIF : GIF[11] : 变混合模式 : 混合模式[2]
 * 插件指令：>地图GIF : GIF[11] : 变坐标 : 变化时间[60] : 位置[100,100]
 * 插件指令：>地图GIF : GIF[11] : 变坐标 : 变化时间[60] : 位置变量[25,26]
 * 插件指令：>地图GIF : GIF[11] : 变透明 : 变化时间[60] : 透明度[255]
 * 插件指令：>地图GIF : GIF[11] : 变透明 : 变化时间[60] : 透明度变量[21]
 * 插件指令：>地图GIF : GIF[11] : 变转速 : 变化时间[60] : 转速[10.0]
 * 插件指令：>地图GIF : GIF[11] : 变转速 : 变化时间[60] : 转速变量[21]
 * 插件指令：>地图GIF : GIF[11] : 变缩放 : 变化时间[60] : 缩放[1.2,1.2]
 * 插件指令：>地图GIF : GIF[11] : 变斜切 : 变化时间[60] : 斜切[0.5,0.5]
 * 
 * 1.前半部分（GIF变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有2*11种组合方式。
 * 2."变坐标"的变化效果可以与速度叠加。
 * 3."变转速"中，转速的单位为 角度/帧 。
 *   变量的值可以为负数，你可以通过这种方式修改旋转方向。
 * 4."混合模式"为瞬间切换，可以去看看"0.基本定义 > 混合模式.docx"。
 * 5.插件指令的变化是永久性的。
 *   如果你想瞬间切换，设置时长为0即可。
 * 6.操作隐藏的GIF 或者 操作其他地图的GIF，插件指令仍然有效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - GIF播放
 * 你还可以通过插件指令修改GIF的帧属性：
 * 
 * 插件指令：>地图GIF : GIF[11] : 锁定帧
 * 插件指令：>地图GIF : GIF[11] : 解锁帧
 * 插件指令：>地图GIF : GIF[11] : 设置帧 : 当前帧[1]
 * 插件指令：>地图GIF : GIF[11] : 设置帧 : 当前帧变量[21]
 * 插件指令：>地图GIF : GIF[11] : 正向播放一次并停留在末尾帧
 * 插件指令：>地图GIF : GIF[11] : 反向播放一次并停留在起始帧
 * 
 * 1."设置帧"的 当前帧，1表示第1帧。
 * 2.你可以设置GIF锁定在某一帧，帧数与资源配置的id对应。
 * 3."正向播放一次并停留在末尾帧"表示强制该GIF播放重头到尾播放一次。
 *   播放完毕后，自动锁定到末尾帧。
 * 
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>地图GIF : 11 : 显示
 * 插件指令(旧)：>地图GIF : 11 : 隐藏
 * 插件指令(旧)：>地图GIF : 11 : 变坐标 : 60 : 100 : 100
 * 插件指令(旧)：>地图GIF : 11 : 变透明 : 60 : 255
 * 插件指令(旧)：>地图GIF : 11 : 变转速 : 60 : 0.314
 * 插件指令(旧)：>地图GIF : 11 : 变缩放 : 60 : 1.2 : 1.2
 * 插件指令(旧)：>地图GIF : 11 : 变斜切 : 60 : 1.0 : 1.0
 * 插件指令(旧)：>地图GIF : 11 : 变混合模式 : 2
 * 插件指令(旧)：>地图GIF : 11 : 锁定帧
 * 插件指令(旧)：>地图GIF : 11 : 解锁帧
 * 插件指令(旧)：>地图GIF : 11 : 设置当前帧 : 1
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
 * 测试方法：   在地图中放置多个GIF，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【31.67ms】
 *              100个事件的地图中，平均消耗为：【22.19ms】
 *               50个事件的地图中，平均消耗为：【20.08ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.从原理上来说，多层GIF只是固定放置的贴图，但由于事件数量会挤占
 *   部分计算资源，所以消耗会稍微增大一些。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件关联的资源文件夹。
 * [v1.2]
 * 修复了单独使用插件时出错的bug。
 * [v1.3]
 * 修复了背景处于中层时，会和事件、图块相互闪烁的bug。
 * [v1.4]
 * 修复了非循环地图中，移动镜头时位移比没有效果的bug。
 * 修改了插件指令结构，旋转速度改为 角度/帧 。
 * [v1.5]
 * 修复了玩家移动时，出现1像素的轻微漂移的问题。
 * [v1.6]
 * 添加了 参数存储 功能开关，以及动态遮罩功能。
 * [v1.7]
 * 重新整理的图片层级的位移问题，修复了贴图在图片层位移比错位的问题。
 * [v1.8]
 * 优化了与地图活动镜头的兼容结构。
 * [v1.9]
 * 优化了旧存档的识别与兼容。
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
 * @param ---GIF层组 1至20---
 * @default
 *
 * @param GIF层-1
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-2
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-3
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-4
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-5
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-6
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-7
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-8
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-9
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-10
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-11
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-12
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-13
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-14
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-15
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-16
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-17
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-18
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-19
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-20
 * @parent ---GIF层组 1至20---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组21至40---
 * @default
 *
 * @param GIF层-21
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-22
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-23
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-24
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-25
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-26
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-27
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-28
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-29
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-30
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-31
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-32
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-33
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-34
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-35
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-36
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-37
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-38
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-39
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-40
 * @parent ---GIF层组21至40---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组41至60---
 * @default
 *
 * @param GIF层-41
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-42
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-43
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-44
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-45
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-46
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-47
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-48
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-49
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-50
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-51
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-52
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-53
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-54
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-55
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-56
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-57
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-58
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-59
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-60
 * @parent ---GIF层组41至60---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组61至80---
 * @default
 *
 * @param GIF层-61
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-62
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-63
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-64
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-65
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-66
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-67
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-68
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-69
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-70
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-71
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-72
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-73
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-74
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-75
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-76
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-77
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-78
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-79
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-80
 * @parent ---GIF层组61至80---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组81至100---
 * @default
 *
 * @param GIF层-81
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-82
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-83
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-84
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-85
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-86
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-87
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-88
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-89
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-90
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-91
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-92
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-93
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-94
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-95
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-96
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-97
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-98
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-99
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-100
 * @parent ---GIF层组81至100---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组101至120---
 * @default
 *
 * @param GIF层-101
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-102
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-103
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-104
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-105
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-106
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-107
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-108
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-109
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-110
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-111
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-112
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-113
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-114
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-115
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-116
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-117
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-118
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-119
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-120
 * @parent ---GIF层组101至120---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组121至140---
 * @default
 *
 * @param GIF层-121
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-122
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-123
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-124
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-125
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-126
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-127
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-128
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-129
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-130
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-131
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-132
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-133
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-134
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-135
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-136
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-137
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-138
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-139
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-140
 * @parent ---GIF层组121至140---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组141至160---
 * @default
 *
 * @param GIF层-141
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-142
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-143
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-144
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-145
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-146
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-147
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-148
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-149
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-150
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-151
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-152
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-153
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-154
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-155
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-156
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-157
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-158
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-159
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-160
 * @parent ---GIF层组141至160---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组161至180---
 * @default
 *
 * @param GIF层-161
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-162
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-163
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-164
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-165
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-166
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-167
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-168
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-169
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-170
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-171
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-172
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-173
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-174
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-175
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-176
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-177
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-178
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-179
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-180
 * @parent ---GIF层组161至180---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF层组181至200---
 * @default
 *
 * @param GIF层-181
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-182
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-183
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-184
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-185
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-186
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-187
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-188
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-189
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-190
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-191
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-192
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-193
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-194
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-195
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-196
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-197
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-198
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-199
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF层-200
 * @parent ---GIF层组181至200---
 * @type struct<LGiMapGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 */
/*~struct~LGiMapGIF:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的地图GIF==
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
 * @desc 该GIF将放在指定对应的地图id中。
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
 * @param 初始是否锁定帧
 * @parent ---贴图---
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @desc true - 锁定，false - 不锁定
 * @default false
 * 
 * @param 锁定帧数
 * @parent 初始是否锁定帧
 * @type number
 * @min 1
 * @desc 该平铺GIF在游戏初始时锁定的帧数id，对应 资源 中的序号。
 * @default 1
 *
 * @param 资源-GIF
 * @parent ---贴图---
 * @desc png图片资源组，多张构成gif。
 * @default ["(需配置)地图GIF"]
 * @require 1
 * @dir img/Map__layer_gif/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---贴图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
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
 * @param 平移-GIF X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 平移-GIF Y
 * @parent ---贴图---
 * @desc y轴方向平移，单位像素。0为贴在最上面。这里用来表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 旋转速度
 * @parent ---贴图---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 0.0
 *
 * @param 位移比X
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，GIF和镜头的位移一致。设置0.00则GIF不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移比Y
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，GIF和镜头的位移一致。设置0.00则GIF不随镜头移动，紧贴地图。负数则反向移动。
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
 * @desc GIF在同一个地图层，先后排序的位置，0表示最后面。
 * @default 4
 * 
 * @param ---3d效果---
 * @desc 
 * 
 * @param 缩放 X
 * @parent ---3d效果---
 * @desc GIF的缩放X值，默认比例1.0。缩放将会使得GIF看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 缩放 Y
 * @parent ---3d效果---
 * @desc GIF的缩放Y值，默认比例1.0。缩放将会使得GIF看起来旋转具有一定透视。
 * @default 1.0
 * 
 * @param 斜切 X
 * @parent ---3d效果---
 * @desc GIF的斜切X值，默认比例0.0。斜切将会使得GIF看起来旋转具有一定角度。
 * @default 0.0
 * 
 * @param 斜切 Y
 * @parent ---3d效果---
 * @desc GIF的斜切Y值，默认比例0.0。斜切将会使得GIF看起来旋转具有一定角度。
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
 * @desc 设置后，GIF会被 地图动态遮罩 遮住，通过特定的 透视镜 才能看到该GIF的部分图像。
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
//		插件简称		LGi（Layer_GIF）
//		临时全局变量	DrillUp.g_LGi_xxx
//		临时局部变量	this._drill_LGi_xxx
//		存储数据变量	$gameSystem._drill_LGi_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	对话管理层
//		★性能测试消耗	20.08ms
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			多层地图GIF：
//				->基本属性
//					->地图层级
//						->添加贴图到层级【标准函数】
//						->层级与镜头的位移【标准函数】
//						->图片层级排序【标准函数】
//					->GIF播放
//					->镜头位移比
//				->可修改的属性
//					->显示隐藏
//					->坐标、速度、透明、混合模式
//					->缩放、斜切
//					->色调 ？x
//					->GIF帧数插件指令
//						->播放一次并停留在末尾帧
//
//			地图界面全层级关系：
//				Spriteset： LowerLayer：	地图远景 < 下层 < 图块层 < 中层 < 事件/玩家层 < 鼠标目的地 < 上层 < 天气层
//							UpperLayer：	< 图片对象层 < (时间框层) < (闪烁幕布层) < 图片层
//											< MOG的ui层【_hudField】 < ui层【_drill_map_top_board】
//				AllWindows：WindowLayer：	< 对话框集合 < 滚动文本画布 < 最顶层【_drill_SenceTopArea】
//
//		★必要注意事项：
//			1.插件的地图层级/图片层级与多个插件共享。【必须自写 层级排序 标准函数】
//			2.使用插件指令变化时，changing将会作为一个变化容器，根据时间对【数据】进行改变。
//			3.原理基于【定量】赋值，【你直接用_displayX就可以了】,增量赋值方法绕太多远路！
//			4.【这里的镜头位移比是相减，而背景的是相加】。
//
//		★其它说明细节：
//			1.GIF本身就有旋转的功能。就好比，同时具备魔法圈的全部功能，而且还更进一步有了播放动画的功能。
//				
//		★存在的问题：
//			暂无
//


//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerGif = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerGif');

	//==============================
	// * 变量获取 - GIF
	//				（~struct~LGMapTiledGif）
	//==============================
	DrillUp.drill_LGi_gifInit = function( dataFrom ) {
		var data = {};
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "false") == "true";
		data['map'] = Number( dataFrom["所属地图"] || 0);
		
		// > 贴图
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['gif_lock'] = String( dataFrom["初始是否锁定帧"] || "false") == "true";
		data['gif_time'] = Number( dataFrom["锁定帧数"] || 0);
		if( dataFrom["资源-GIF"] != "" &&
			dataFrom["资源-GIF"] != undefined ){
			data['src_img'] = JSON.parse( dataFrom["资源-GIF"] );
		}else{
			data['src_img'] = [];
		}
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['x'] = Number( dataFrom["平移-GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-GIF Y"] || 0);
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
		
		// > 私有变量初始化
		data['cameraXAcc'] = 0;					//镜头基点（循环积累值）（像素单位）
		data['cameraYAcc'] = 0;					//
		data['gif_p_playing'] = false;			//gif - 播放一次
		data['gif_p_playType'] = "forwardRun";	//gif - 播放是否反向
		data['gif_p_curTime'] = 0;				//gif - 当前时间
		data['gif_p_tarTime'] = 0;				//gif - 目标时间
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_LGi_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*-----------------GIF------------------*/
	DrillUp.g_LGi_layers_length = 200;
	DrillUp.g_LGi_layers = [];
	for( var i = 0; i < DrillUp.g_LGi_layers_length; i++ ){
		if( DrillUp.parameters['GIF层-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['GIF层-' + String(i+1) ]);
			DrillUp.g_LGi_layers[i] = DrillUp.drill_LGi_gifInit( temp );
			DrillUp.g_LGi_layers[i]['id'] = Number(i)+1;
		}else{
			DrillUp.g_LGi_layers[i] = null;		//（强制设为空值，节约存储资源）
		}
	}

//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapLayerGIF = function(filename) {
    return this.loadBitmap('img/Map__layer_gif/', filename, 0, true);
};
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_LGi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_LGi_pluginCommand.call(this, command, args);
	if( command === ">地图GIF" ){ // >地图GIF : GIF[1] : 显示
		
		if(args.length >= 2){
			var id = -1;
			var temp1 = String(args[1]);
			if( temp1.indexOf("GIF[") != -1 ){
				temp1 = temp1.replace("GIF[","");
				temp1 = temp1.replace("]","");
				id = Number(temp1);
			}
			if( temp1.indexOf("GIF变量[") != -1 ){
				temp1 = temp1.replace("GIF变量[","");
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
					if( type == "显示" || type == "隐藏" || 
						type == "锁定帧" || type == "解锁帧" || 
						type == "正向播放一次并停留在末尾帧" || 
						type == "反向播放一次并停留在起始帧"	 ){
						changing['type'] = type;
						$gameSystem._drill_LGi_dataTank_changing.push(changing);
						return;
					}
				}
				if(args.length == 6){
					var type = String(args[3]);
					var temp2 = String(args[5]);
					if( type == "变混合模式" ){
						var num_list = this.drill_LGi_getArgNumList(temp2);
						changing['type'] = type;
						changing['data1'] = num_list[0];
						$gameSystem._drill_LGi_dataTank_changing.push(changing);
						return;
					}
					if( type == "设置帧" ){
						var num_list = this.drill_LGi_getArgNumList(temp2);
						changing['type'] = type;
						changing['data1'] = num_list[0];
						$gameSystem._drill_LGi_dataTank_changing.push(changing);
						return;
					}
				}
				if(args.length == 8){
					var type = String(args[3]);
					var temp2 = String(args[5]);
					var temp3 = String(args[7]);
					if( type == "变坐标" ){
						var num_list2 = this.drill_LGi_getArgNumList(temp2);
						var num_list3 = this.drill_LGi_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						changing['data3'] = num_list3[1];
						$gameSystem._drill_LGi_dataTank_changing.push(changing);
						return;
					}
					if( type == "变透明" ){
						var num_list2 = this.drill_LGi_getArgNumList(temp2);
						var num_list3 = this.drill_LGi_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						$gameSystem._drill_LGi_dataTank_changing.push(changing);
						return;
					}
					if( type == "变转速" ){
						var num_list2 = this.drill_LGi_getArgNumList(temp2);
						var num_list3 = this.drill_LGi_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						$gameSystem._drill_LGi_dataTank_changing.push(changing);
						return;
					}
					if( type == "变缩放" ){
						var num_list2 = this.drill_LGi_getArgNumList(temp2);
						var num_list3 = this.drill_LGi_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						changing['data3'] = num_list3[1];
						$gameSystem._drill_LGi_dataTank_changing.push(changing);
						return;
					}
					if( type == "变斜切" ){
						var num_list2 = this.drill_LGi_getArgNumList(temp2);
						var num_list3 = this.drill_LGi_getArgNumList(temp3);
						changing['type'] = type;
						changing['data1'] = num_list2[0];
						changing['data2'] = num_list3[0];
						changing['data3'] = num_list3[1];
						$gameSystem._drill_LGi_dataTank_changing.push(changing);
						return;
					}
				}
			}
		}
	}
	
	/*-----------------旧指令------------------*/
	if( command === ">地图GIF" ){ // >地图GIF : 1 : 显示
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
			$gameSystem._drill_LGi_dataTank_changing.push(changing);
		}
	}
};
//==============================
// * 插件指令 - 获取方括号中的数字（返回数字数组）
//==============================
Game_Interpreter.prototype.drill_LGi_getArgNumList = function( arg_str ){
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


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
//DrillUp.g_LGi_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LGi_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_LGi_sys_initialize.call(this);
	this.drill_LGi_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LGi_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LGi_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LGi_saveEnabled == true ){	
		$gameSystem.drill_LGi_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LGi_initSysData();
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
Game_System.prototype.drill_LGi_initSysData = function() {
	this.drill_LGi_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LGi_checkSysData = function() {
	this.drill_LGi_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LGi_initSysData_Private = function() {
	
	this._drill_LGi_dataTank_changing = [];		//插件指令变化容器
	this._drill_LGi_dataTank_curData = [];		//当前地图容器（与 g_LGi_layers/_drill_LGi_layerTank 依次对应，容器允许出现null值）
	for(var i = 0; i < DrillUp.g_LGi_layers.length; i++){
		var temp_data = DrillUp.g_LGi_layers[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['mapToAll'] == true ){		//全地图数据直接存储（每次地图刷新时，不刷新 全地图数据）
			var data = JSON.parse(JSON.stringify( temp_data ));
			this._drill_LGi_dataTank_curData[i] = data;
		}
	}
	
	// > 刷新当前地图
	if( $gameMap ){
		$gameMap.drill_LGi_initMapdata();
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LGi_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_LGi_dataTank_curData == undefined ){
		this.drill_LGi_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_LGi_layers.length; i++ ){
		var temp_data = DrillUp.g_LGi_layers[i];
		
		// > 已配置（检查 全地图数据 的配置情况）
		if( temp_data != undefined &&
			temp_data['mapToAll'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_LGi_dataTank_curData[i] == undefined ){
				this._drill_LGi_dataTank_curData[i] = JSON.parse(JSON.stringify( temp_data ));
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//=============================================================================
// ** 地图
//=============================================================================
//==============================
// ** 地图 - 初始化
//==============================
var _drill_LGi_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_LGi_setup.call(this,mapId);
	this.drill_LGi_initMapdata();
}
Game_Map.prototype.drill_LGi_initMapdata = function() {
	
	// > 刷新当前地图容器
	for(var i = 0; i< DrillUp.g_LGi_layers.length ;i++){
		var temp_data = DrillUp.g_LGi_layers[i];
		if( temp_data == undefined ){
			$gameSystem._drill_LGi_dataTank_curData[i] = null;
			continue;
		}
		
		// > 全地图数据时
		if( temp_data['mapToAll'] == true ){
			//（不刷新数据）
			
		// > 单地图数据时
		}else if( temp_data['map'] == this._mapId ){
			var data = JSON.parse(JSON.stringify( temp_data ));
			$gameSystem._drill_LGi_dataTank_curData[i] = data;	//（重刷数据）
			
		// > 其它情况时
		}else{
			$gameSystem._drill_LGi_dataTank_curData[i] = null;	//（某地图不含此贴图配置，则直接置空）
		}
	}
}
DrillUp.g_LGi_alert = true;
//==============================
// * 玩家 - 帧刷新 镜头位置
//
//			说明：	注意，玩家update与地图update有时间差，且晚1帧，所以只能继承玩家的update。
//==============================
var _drill_LGi_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function( sceneActive ){
    _drill_LGi_player_update.call( this, sceneActive );
	
	for(var i = 0; i< $gameSystem._drill_LGi_dataTank_curData.length ;i++){
		var data = $gameSystem._drill_LGi_dataTank_curData[i];
		if( data == undefined ){ continue; }
		
		// > 镜头基点（循环积累值）
		if( Imported.Drill_LayerCamera ){
			if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LGi_alert == true ){ 
				alert("【Drill_LayerGif.js 地图 - 多层地图GIF】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v1.9及以上版本。");
				DrillUp.g_LGi_alert = false;
				return; 
			}
			data['cameraXAcc'] = $gameSystem._drill_LCa_controller._drill_cameraX_offsetAcc * $gameMap.tileWidth();
			data['cameraYAcc'] = $gameSystem._drill_LCa_controller._drill_cameraY_offsetAcc * $gameMap.tileHeight();
			
		// > 镜头基点
		}else{
			data['cameraXAcc'] = $gameMap.displayX() * $gameMap.tileWidth();
			data['cameraYAcc'] = $gameMap.displayY() * $gameMap.tileHeight();
		}
	}
};


//#############################################################################
// ** 【标准模块】地图层级
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
Scene_Map.prototype.drill_LGi_layerAddSprite = function( sprite, layer_index ){
	this.drill_LGi_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_LGi_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_LGi_sortByZIndex = function () {
    this.drill_LGi_sortByZIndex_Private();
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
Scene_Map.prototype.drill_LGi_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_LGi_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_LGi_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
	_drill_LGi_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_LGi_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_LGi_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_LGi_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function() {
	_drill_LGi_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_LGi_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_LGi_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_LGi_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LGi_map_createAllWindows.call(this);	//对话框集合 < 最顶层
	if( !this._drill_SenceTopArea ){
		this._drill_SenceTopArea = new Sprite();
		this.addChild(this._drill_SenceTopArea);	
	}
}
//==============================
// * 地图层级 - 图片层级排序（私有）
//==============================
Scene_Map.prototype.drill_LGi_sortByZIndex_Private = function () {
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_LGi_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Map.prototype.drill_LGi_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 位移比
	var x_per = option['XPer'];
	var y_per = option['YPer'];
	
	xx -= option['tile_x'] * $gameMap.tileWidth() * x_per;
	yy -= option['tile_y'] * $gameMap.tileHeight() * y_per;
	//		（*0 表示紧贴地图；*1表示减回去了，紧贴镜头。）
	
	xx += option['cameraXAcc'] * x_per;
	yy += option['cameraYAcc'] * y_per;
	//		（*0 表示不跟镜头移动，紧贴地图；*1表示紧贴镜头。）
	
	
	// > 地图参照 -> 地图参照
	if( layer == "下层" || layer == "中层" || layer == "上层" ){
		return {'x':xx, 'y':yy };
	}
	// > 地图参照 -> 镜头参照
	if( layer == "图片层" || layer == "最顶层" ){
		xx -= this._spriteset._baseSprite.x;	//（由于 Spriteset_Map 的 _baseSprite 坐标始终是(0,0)，所以两个参照没有区别。）
		yy -= this._spriteset._baseSprite.y;
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}


//=============================================================================
// ** 地图界面
//=============================================================================
//==============================
// * 地图界面 - 创建
//==============================
var _drill_LGi_Scene_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
	_drill_LGi_Scene_createAllWindows.call(this);
	this.drill_LGi_create();	
};
Scene_Map.prototype.drill_LGi_create = function() {
	this._drill_LGi_spriteTank = [];			//（允许出现null值）
	this._drill_LGi_spriteTank_bitmap = [];		//（允许出现null值）
	
	var data_tank = $gameSystem._drill_LGi_dataTank_curData;
	for(var i=0; i< data_tank.length; i++){
		var temp_data = data_tank[i];
		if( temp_data == undefined ){ continue; }
		
		// > 子贴图
		var temp_sprite_bitmap = new Sprite();
		temp_sprite_bitmap._drill_src_bitmaps = [];
		for(var j = 0; j < temp_data['src_img'].length ; j++){
			temp_sprite_bitmap._drill_src_bitmaps.push(ImageManager.load_MapLayerGIF(temp_data['src_img'][j]));
		}
		temp_sprite_bitmap.bitmap = temp_sprite_bitmap._drill_src_bitmaps[0] ;
		temp_sprite_bitmap.anchor.x = 0.5;
		temp_sprite_bitmap.anchor.y = 0.5;
		this._drill_LGi_spriteTank_bitmap[i] = temp_sprite_bitmap;
		
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
			this.drill_LGi_createMaskSprite( temp_data, temp_sprite );
			temp_sprite['_mask_inited'] = true;
			
		// > 创建动态遮罩（延迟创建）
		}else{
			temp_sprite['_mask_inited'] = false;
		}
		
		// > 地图层级
		this._drill_LGi_spriteTank[i] = temp_sprite;
		this.drill_LGi_layerAddSprite( temp_sprite, temp_sprite['layer_index'] );
	}
	this.drill_LGi_sortByZIndex();		//排序
}
//==============================
// * 地图界面 - 创建动态遮罩
//==============================
Scene_Map.prototype.drill_LGi_createMaskSprite = function( temp_data, temp_sprite ){
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
var _drill_LGi_scene_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {	
	_drill_LGi_scene_update.call(this);
	
	this.drill_LGi_updateBase();			//基本属性（在游戏使用事件指令"结束游戏"后，让玩家移动，会造成图层错位问题。）
	
	if( this.isActive() == true ){
		this.drill_LGi_updateChange();		//变化属性（该变化必须等 isActive 激活后执行，不然在变化时，会闪……目前原因不明，但也没必要深究了）
	}
};
//==============================
// * 帧刷新 - 基本属性
//==============================
Scene_Map.prototype.drill_LGi_updateBase = function() {
	var sprite_tank = this._drill_LGi_spriteTank;
	var sprite_tank_bitmap = this._drill_LGi_spriteTank_bitmap;
	var data_tank = $gameSystem._drill_LGi_dataTank_curData;
	
	for(var i=0; i< sprite_tank.length; i++){
		var temp_sprite = sprite_tank[i];
		var temp_sprite_bitmap = sprite_tank_bitmap[i];
		var temp_data = data_tank[i];
		if( temp_data == undefined ){ continue; }
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite_bitmap == undefined ){ continue; }
		if( temp_sprite_bitmap['_drill_src_bitmaps'].length != 0 ){
			
			// > 属性实时变化
			temp_sprite.visible = temp_data['visible'];
			temp_sprite.opacity = temp_data['opacity'];
			temp_sprite.blendMode = temp_data['blendMode'];
			
			// > 播放gif(正常循环)
			if( temp_data['gif_p_playing'] == false ){
				
				if( temp_data['gif_lock'] != true ){
					temp_data['gif_time'] += 1;
				}
				var inter = temp_data['gif_time'];
				inter = inter / temp_data['interval'];
				inter = inter % temp_sprite_bitmap['_drill_src_bitmaps'].length;
				if( temp_data['back_run'] ){
					inter = temp_sprite_bitmap['_drill_src_bitmaps'].length - 1 - inter;
				}
				inter = Math.floor(inter);
				temp_sprite_bitmap.bitmap = temp_sprite_bitmap['_drill_src_bitmaps'][inter];
			
			// > 播放gif(播放一次)
			}else{
				temp_data['gif_p_curTime'] += 1;
				
				var inter = temp_data['gif_p_curTime'];
				inter = inter / temp_data['interval'];
				inter = inter % temp_sprite_bitmap['_drill_src_bitmaps'].length;
				if( temp_data['gif_p_playType'] == "backRun" ){
					inter = temp_sprite_bitmap['_drill_src_bitmaps'].length - 1 - inter;
				}
				inter = Math.floor(inter);
				temp_sprite_bitmap.bitmap = temp_sprite_bitmap['_drill_src_bitmaps'][inter];
				
				if( temp_data['gif_p_curTime'] >= temp_data['gif_p_tarTime'] ){
					temp_data['gif_p_playing'] = false;
					temp_data['gif_time'] = inter * temp_data['interval'];
					temp_data['gif_lock'] = true;
				}
			}
			
			// > 自旋转
			temp_sprite_bitmap.rotation += ( temp_data['rotate'] /180 * Math.PI );
			
			
			// > 位移（地图参照）
			var xx = temp_data['x'];
			var yy = temp_data['y'];
			xx -= temp_data['cameraXAcc'];		//（注意，这里不能用adjust，因为如果你一直向前移动，贴图会越来越远）
			yy -= temp_data['cameraYAcc'];
			xx += temp_data['tile_x'] * $gameMap.tileWidth();
			yy += temp_data['tile_y'] * $gameMap.tileHeight();
			
			
			// > 层级与镜头的位移（地图参照）
			var pos = this.drill_LGi_layerCameraMoving( xx, yy, temp_data['layer_index'], temp_data );
			xx = pos['x'];
			yy = pos['y'];
			
			
			temp_sprite.x = xx;
			temp_sprite.y = yy;
		}
		
		// > 创建动态遮罩（延迟创建）
		if( temp_sprite['_mask_inited'] == false && temp_data['visible'] == true ){
			temp_sprite['_mask_inited'] = true;
			this.drill_LGi_createMaskSprite( temp_data, temp_sprite );
		}
	}
};
//==============================
// * 帧刷新 - 变化属性
//==============================
Scene_Map.prototype.drill_LGi_updateChange = function() {
	var change_tank = $gameSystem._drill_LGi_dataTank_changing;	//（只变数据，不变sprite）
	var data_tank = $gameSystem._drill_LGi_dataTank_curData;
	var sprite_tank = this._drill_LGi_spriteTank;
	//if(change_tank.length > 0){
	//	alert(JSON.stringify(change_tank));
	//	alert(JSON.stringify(data_tank));
	//}
	
	for(var j=0; j< change_tank.length; j++){
		var temp_change = change_tank[j];
		var temp_data = data_tank[ temp_change.id -1 ];
		var temp_sprite = sprite_tank[ temp_change.id -1 ];
		if( temp_data == undefined ){ continue; }
		if( temp_sprite == undefined ){ continue; }
		if( temp_change.destroy == false ){
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
			
			/*变色调……*/
			
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
			
			if( temp_change.type == "设置帧" || temp_change.type == "设置当前帧" ){
				temp_data['gif_time'] = ( temp_change.data1 - 1 ) * temp_data['interval'];
				temp_change.destroy = true;
			}
			
			if( temp_change.type == "锁定帧" ){
				temp_data['gif_lock'] = true;
				temp_change.destroy = true;
			}
			
			if( temp_change.type == "解锁帧" ){
				temp_data['gif_lock'] = false;
				temp_change.destroy = true;
			}
			
			if( temp_change.type == "正向播放一次并停留在末尾帧" ){
				temp_data['gif_p_playing'] = true;
				temp_data['gif_p_playType'] = "forwardRun";
				temp_data['gif_p_curTime'] = 0;
				temp_data['gif_p_tarTime'] = ( temp_data['src_img'].length - 1 ) * temp_data['interval'] ;
				temp_data['gif_lock'] = false;
				temp_change.destroy = true;
			}
			
			if( temp_change.type == "反向播放一次并停留在起始帧" ){
				temp_data['gif_p_playing'] = true;
				temp_data['gif_p_playType'] = "backRun";
				temp_data['gif_p_curTime'] = 0;
				temp_data['gif_p_tarTime'] = ( temp_data['src_img'].length - 1 ) * temp_data['interval'] ;
				temp_data['gif_lock'] = false;
				temp_change.destroy = true;
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


