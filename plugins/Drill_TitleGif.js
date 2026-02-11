//=============================================================================
// Drill_TitleGif.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        标题 - 多层标题GIF
 * @author Drill_up，mamamiyas
 * 
 * @Drill_LE_param "GIF-%d"
 * @Drill_LE_parentKey "---GIF组%d至%d---"
 * @Drill_LE_var "DrillUp.g_TGi_style_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_TitleGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题界面中放置一个或者多个GIF。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfBallistics       数学模型-弹道核心★★v2.2及以上★★
 *   - Drill_CoreOfGlobalSave       管理器-全局存储核心
 *     由于在标题界面，插件的数据固定全局存储。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于标题界面。
 * 2.要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-菜单界面）.docx"。
 * 全局存储：
 *   (1.该插件控制的显示/隐藏数据将存储在全局文件中。
 *      如果游戏中修改了显示/隐藏，则永久有效，不保存也有效。
 *   (2.更多详细介绍，去看看 "21.管理器 > 关于全局存储.docx"。
 *   (3.留意全局存储的机制，开游戏就生效。
 *      如果你遇到了图片设置后不显示/不变化的问题，要注意清除全部存档。
 * 层级:
 *   (1.标题设置中有 菜单层级 和 图片层级。
 *      菜单层级分 菜单前面层和菜单后面层 ，对应 标题窗口元素 的前面和后面。
 *      相同 菜单层级 下，背景、魔法圈、gif都根据 图片层级 先后排序。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 设计：
 *   (1.这里的GIF，必须拆散成多张png图片，然后配置在资源中。
 *      你可以在同一个标题里面加入非常多的GIF。
 *      结合 播放/GIF遮罩 制作出不同的动态效果。
 *   (2.你可以直接在标题中配置300多张图片作为GIF开场的高清视频，
 *      这可以弥补播放标题视频时视频画质很差的缺陷。
 *      虽然这是可行的，但还是建议压缩一下图片，因为图片太多非常占容量。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles1 
 * 先确保项目img文件夹下是否有titles1文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * GIF-1 资源-GIF
 * GIF-2 资源-GIF
 * GIF-3 资源-GIF
 * ……
 *
 * 所有素材都放在titles1文件夹下。
 * 你可以在同一个菜单里面加入非常多的不同种类的GIF。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制标题GIF的显示情况：
 * 
 * 插件指令：>标题GIF : GIF[2] : 显示
 * 插件指令：>标题GIF : GIF[2] : 隐藏
 * 插件指令：>标题GIF : 隐藏全部
 *
 * 1.数字表示GIF对应配置的编号。
 * 2.GIF没有默认，都是一个个贴在指定菜单中的。
 * 3.注意，插件指令做出的改变是全局的。
 * 
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
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   打开标题界面，进行性能测试。
 * 测试结果：   菜单界面中，gif的消耗为：【8.50ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.gif会持续播放、位移、旋转，由于数量并不多，所以消耗也不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 规范了插件指令设置。
 * [v1.2]
 * 添加了漂浮、呼吸效果设置。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 优化了内部结构，修改了插件指令格式。
 * 添加了GIF遮罩功能。
 * [v1.5]
 * 优化了内部结构。
 * 添加了GIF的3d效果设置。旋转速度单位改为 角度/帧。
 * [v1.6]
 * 给插件添加了预加载功能。
 * [v1.7]
 * 大幅度修改了全局存储的文件存储结构。
 * [v1.8]
 * 感谢朋友 mamamiyas 提供的预加载方法和思路。翻新了GIF预加载的类型。
 *
 *
 * @param 全局存储的文件路径
 * @type number
 * @min 1
 * @desc 指对应的文件路径ID,该插件的数据将存储到指定文件路径,具体看看"21.管理器 > 关于全局存储.docx"。
 * @default 1
 *
 * @param ---GIF组 1至20---
 * @default
 *
 * @param GIF-1
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-2
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-3
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-4
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-5
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-6
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-7
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-8
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-9
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-10
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-11
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-12
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-13
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-14
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-15
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-16
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-17
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-18
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-19
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-20
 * @parent ---GIF组 1至20---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组21至40---
 * @default
 *
 * @param GIF-21
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-22
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-23
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-24
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-25
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-26
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-27
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-28
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-29
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-30
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-31
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-32
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-33
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-34
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-35
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-36
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-37
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-38
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-39
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-40
 * @parent ---GIF组21至40---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组41至60---
 * @default
 *
 * @param GIF-41
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-42
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-43
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-44
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-45
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-46
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-47
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-48
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-49
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-50
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-51
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-52
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-53
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-54
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-55
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-56
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-57
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-58
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-59
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-60
 * @parent ---GIF组41至60---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param ---GIF组61至80---
 * @default
 *
 * @param GIF-61
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-62
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-63
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-64
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-65
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-66
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-67
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-68
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-69
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-70
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-71
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-72
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-73
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-74
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-75
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-76
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-77
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-78
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-79
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 *
 * @param GIF-80
 * @parent ---GIF组61至80---
 * @type struct<TitleGIF>
 * @desc GIF的详细配置信息。
 * @default 
 */
/*~struct~TitleGIF:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的标题GIF==
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
 * @desc 该GIF在游戏初始时锁定的帧数id，对应 资源 中的序号。
 * @default 1
 *
 * @param 资源-GIF
 * @parent ---贴图---
 * @desc png图片资源组，多张构成gif。
 * @default ["(需配置)标题GIF"]
 * @require 1
 * @dir img/titles1/
 * @type file[]
 *
 * @param 预加载类型
 * @parent ---贴图---
 * @type select
 * @option 关闭预加载
 * @value 关闭预加载
 * @option 固定预加载数量
 * @value 固定预加载数量
 * @option 全部预加载
 * @value 全部预加载
 * @desc 预加载的类型，详细去看看文档说明："1.系统 > 关于预加载.docx"。
 * @default 关闭预加载
 *
 * @param 固定预加载的数量
 * @parent 预加载类型
 * @type number
 * @min 0
 * @desc 如果你配置的GIF资源数量非常多，可以设置固定预加载数量，减少内存消耗。剩下的在播放时边播放边加载。
 * @default 35
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
 * @desc 此参数为缩放设置，设置模糊后，缩放时可以模糊资源图像的边缘，防止出现像素锯齿。
 * @default false
 * 
 * @param 资源-GIF遮罩
 * @parent ---贴图---
 * @desc GIF遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 *
 * @param 平移-GIF X
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最左边。
 * @default 0
 *
 * @param 平移-GIF Y
 * @parent ---贴图---
 * @desc x轴方向平移，单位像素。0为圈的圆心贴在最上面。
 * @default 0
 * 
 * @param 旋转速度
 * @parent ---贴图---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 0.0
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
 * @option 发光
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @option 叠加
 * @value 4
 * @desc pixi的渲染混合模式。0-普通,1-发光。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 *
 * @param 菜单层级
 * @parent ---贴图---
 * @type select
 * @option 菜单后面层
 * @value 菜单后面层
 * @option 菜单前面层
 * @value 菜单前面层
 * @desc 背景所属的菜单层级。
 * @default 菜单后面层
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 4
 * 
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
 * 
 * @param ---自变化效果---
 * @default 
 *
 * @param 浮动效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右浮动
 * @value 左右浮动
 * @option 上下浮动
 * @value 上下浮动
 * @option 左上右下斜向浮动
 * @value 左上右下斜向浮动
 * @option 右上左下斜向浮动
 * @value 右上左下斜向浮动
 * @desc 当前贴图，会来回浮动。
 * @default 关闭
 * 
 * @param 浮动速度
 * @parent 浮动效果
 * @desc 浮动变化的速度。
 * @default 1.0
 *
 * @param 浮动偏移量
 * @parent 浮动效果
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 15
 *
 * @param 闪烁效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前贴图，会来回闪烁。
 * @default 关闭
 * 
 * @param 闪烁速度
 * @parent 闪烁效果
 * @desc 闪烁明亮变化的速度。
 * @default 6.0
 * 
 * @param 闪烁幅度范围
 * @parent 闪烁效果
 * @type number
 * @min 1
 * @max 255
 * @desc 闪烁变化的透明度幅度范围。
 * @default 35
 * 
 * @param 摇晃效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 开启
 * @value 开启
 * @desc 当前贴图，会来回摇晃。
 * @default 关闭
 * 
 * @param 摇晃速度
 * @parent 摇晃效果
 * @desc 来回摇晃变化的速度。
 * @default 4.0
 * 
 * @param 摇晃幅度范围
 * @parent 摇晃效果
 * @type number
 * @min 1
 * @desc 来回摇晃的幅度范围。单位角度。
 * @default 12
 *
 * @param 缩放效果
 * @parent ---自变化效果---
 * @type select
 * @option 关闭
 * @value 关闭
 * @option 左右缩放
 * @value 左右缩放
 * @option 上下缩放
 * @value 上下缩放
 * @option 整体缩放
 * @value 整体缩放
 * @desc 当前贴图，会来回缩放。
 * @default 关闭
 * 
 * @param 缩放速度
 * @parent 缩放效果
 * @desc 缩放大小变化的速度。
 * @default 1.0
 * 
 * @param 缩放幅度范围
 * @parent 缩放效果
 * @desc 缩放变化的比例幅度范围。
 * @default 0.2
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		TGi（Title_GIF）
//		临时全局变量	DrillUp.g_TGi_xxx
//		临时局部变量	this._drill_TGi_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_TGi_visibleTank
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理)
//		★性能测试因素	主菜单界面
//		★性能测试消耗	
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//				->『变换特性-单贴图』
//					->只有显示隐藏指令
//			->☆全局存储
//			->☆标题层级
//			->☆预加载（标题）
//			
//			->☆贴图创建标记
//			->☆贴图控制
//				->不考虑销毁情况
//			
//			->标题GIF控制器【Drill_TGi_Controller】
//			->标题GIF贴图【Drill_TGi_Sprite】
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰）（脚本）.docx
//		
//		★插件私有类：
//			* 标题GIF控制器【Drill_TGi_Controller】
//			* 标题GIF贴图【Drill_TGi_Sprite】
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@    /@@@@@@    /@@@@@@  │
//			  │  /@@__  @@  /@@__  @@  /@@__  @@ │
//			  │ | @@  \ @@ | @@  \ @@ | @@  \ @@ │
//			  │ | @@  | @@ | @@  | @@ |  @@@@@@@ │
//			  │ | @@  | @@ | @@  | @@  \____  @@ │
//			  │ | @@  | @@ | @@  | @@  /@@  \ @@ │
//			  │ |  @@@@@@/ |  @@@@@@/ |  @@@@@@/ │
//			  │  \______/   \______/   \______/  │
//			  └──────────────────────────────────┘
//			2.标题与菜单不同的地方：
//				全局数据在 全局-读取 中进行初始化。
//				只作用于Scene_Title。
//				this._backgroundSprite要手动建立。
//				注释和资源文件夹变化。
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
	DrillUp.g_TGi_PluginTip_curName = "Drill_TitleGif.js 标题-多层标题GIF";
	DrillUp.g_TGi_PluginTip_baseList = [
		"Drill_CoreOfBallistics.js 数学模型-弹道核心",
		"Drill_CoreOfGlobalSave.js 管理器-全局存储核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_TGi_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_TGi_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_TGi_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_TGi_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_TGi_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_TGi_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_TGi_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_TGi_getPluginTip_ParamIsNaN = function( param_name, check_tank ){
		var text = "【" + DrillUp.g_TGi_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
		if( check_tank ){
			var keys = Object.keys( check_tank );
			for( var i=0; i < keys.length; i++ ){
				text += "\n" + keys[i] + "的值：" + check_tank[ keys[i] ] ;
			}
		}
		return text;
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_TGi_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_TGi_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_TGi_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_TGi_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 控制器的非数字参数
	//==============================
	DrillUp.drill_TGi_getPluginTip_controllerData_NotId = function( class_name ){
		return "【" + DrillUp.g_TGi_PluginTip_curName + "】\n错误，类对象 "+class_name+" 获取到了非数字参数，数据初始化失败。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_TitleGif = true;
	Imported.Drill_TitleGIF = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleGif');
	
	//==============================
	// * 静态数据 - GIF
	//				（~struct~TitleGIF）
	//==============================
	DrillUp.drill_TGi_gifInit = function( dataFrom ){
		var data = {};
		
		// > P预加载GIF管理
		data['preloadType'] = String( dataFrom["预加载类型"] || "关闭预加载");
		data['preloadNum'] = Number( dataFrom["固定预加载的数量"] || 35);
		
		
		// > A主体 - 基础特性
		if( dataFrom["资源-GIF"] != undefined &&
			dataFrom["资源-GIF"] != "" ){
			data['src_img_gif'] = JSON.parse( dataFrom["资源-GIF"] );
		}else{
			data['src_img_gif'] = [];
		}
		data['src_img_file'] = "img/titles1/";
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = String( dataFrom["初始是否显示"] || "false") == "true";
		data['pause'] = false;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = String( dataFrom["菜单层级"] || "菜单前面层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体 - 其它特性
		data['src_img_mask'] = String( dataFrom["资源-GIF遮罩"] || "");
		
		
		// > B变换特性
		data['x'] = Number( dataFrom["平移-GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-GIF Y"] || 0);
		data['rotate'] = Number( dataFrom["旋转速度"] || 0.0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['anchor_x'] = 0.5;
		data['anchor_y'] = 0.5;
		
		// > B变换特性 - 3d效果
		data['scale_x'] = Number( dataFrom["缩放 X"] || 1.0);
		data['scale_y'] = Number( dataFrom["缩放 Y"] || 1.0);
		data['skew_x'] = Number( dataFrom["斜切 X"] || 0);
		data['skew_y'] = Number( dataFrom["斜切 Y"] || 0);
		data['parentRotate'] = 0;
		
		
		// > G自变化效果
		data['effect_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['effect_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['effect_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		data['effect_flicker'] = String( dataFrom["闪烁效果"] || "关闭");
		data['effect_flickerSpeed'] = Number( dataFrom["闪烁速度"] || 6.0);
		data['effect_flickerRange'] = Number( dataFrom["闪烁幅度范围"] || 20);
		data['effect_swing'] = String( dataFrom["摇晃效果"] || "关闭");
		data['effect_swingSpeed'] = Number( dataFrom["摇晃速度"] || 4.0);
		data['effect_swingRange'] = Number( dataFrom["摇晃幅度范围"] || 12);
		data['effect_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['effect_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['effect_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		
		// > O播放GIF
		data['gif_lock'] = String( dataFrom["初始是否锁定帧"] || "false") == "true";
		data['gif_initFrame'] = Number( dataFrom["锁定帧数"] || 0);
		
		// > Q随机位置
		data['randomPos_enable'] = false;
		
		// > 控制器 初始化数据『控制器与贴图的样式-静态数据-指针初始化』
		Drill_TGi_Controller.drill_controller_initData( data );
		
		return data;
	}
	//==============================
	// * 静态数据 - 最后继承1级
	//==============================
	var _drill_TGi_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_TGi_scene_initialize.call(this);
		
		/*-----------------GIF------------------*/
		for( var i = 0; i < DrillUp.g_TGi_style.length; i++ ){
			var temp = DrillUp.g_TGi_style[i];
			if( temp != undefined ){
				DrillUp.g_TGi_style[i] = DrillUp.drill_TGi_gifInit( temp );
			}
		}
	}
	/*-----------------GIF------------------*/
	DrillUp.g_TGi_style_length = 80;
	DrillUp.g_TGi_style = [];
	for( var i = 0; i < DrillUp.g_TGi_style_length; i++ ){
		if( DrillUp.parameters["GIF-" + String(i+1) ] != undefined &&
			DrillUp.parameters["GIF-" + String(i+1) ] != "" ){
			DrillUp.g_TGi_style[i] = JSON.parse(DrillUp.parameters["GIF-" + String(i+1) ]);
		}else{
			DrillUp.g_TGi_style[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	/*-----------------杂项------------------*/
    DrillUp.g_TGi_dataFileId = Number(DrillUp.parameters["全局存储的文件路径"] || 1);
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfGlobalSave ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_TGi_getPluginTip_NeedUpdate_Ballistics() );
	}


//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_TGi_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_TGi_pluginCommand.call(this, command, args);
	this.drill_TGi_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_TGi_pluginCommand = function( command, args ){
	if( command === ">标题GIF" || command === ">标题gif" ){
		
		/*-----------------常规指令------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			temp1 = temp1.replace("GIF[","");
			temp1 = temp1.replace("gif[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			var type = String(args[3]);
			if( type === "显示" ){
				DrillUp.global_TGi_visibleTank[temp1] = true;
				StorageManager.drill_TGi_saveData();
			}
			if( type === "隐藏" ){
				DrillUp.global_TGi_visibleTank[temp1] = false;
				StorageManager.drill_TGi_saveData();
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type === "隐藏全部" ){
				for(var i=0; i<DrillUp.global_TGi_visibleTank.length; i++){
					DrillUp.global_TGi_visibleTank[i] = false;
				}
				StorageManager.drill_TGi_saveData();
			}
		}
	}
};


//=============================================================================
// ** ☆全局存储
//=============================================================================
//==============================
// * 全局存储 - 最后继承1级
//
//			说明：	> 由于 静态数据 有最后继承，而此处要根据静态数据进行 全局存储 初始化，所以这里也要最后继承。
//==============================
var _drill_TGi_scene_initialize2 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_TGi_scene_initialize2.call(this);
	
	//==============================
	// * 『全局存储』 - 载入时检查数据 - 显示情况
	//==============================
	DrillUp.drill_TGi_gCheckData_visible = function(){
		for( var i = 0; i < DrillUp.g_TGi_style_length ; i++ ){
			var temp_c = DrillUp.g_TGi_style[i];
			
			// > 指定数据为空时
			if( DrillUp.global_TGi_visibleTank[i] == null ){
				if( temp_c == undefined ){			//（无配置，跳过）
					DrillUp.global_TGi_visibleTank[i] = null;
				}else{								//（有配置，初始化默认）
					DrillUp.global_TGi_visibleTank[i] = temp_c['visible'];
				}
				
			// > 不为空则跳过检查
			}else{
				//（不操作）
			}
		}
	}
	//==============================
	// * 『全局存储』 - 载入
	//==============================
		var global_fileId = DrillUp.g_TGi_dataFileId;
		var global_data = StorageManager.drill_COGS_loadData( global_fileId, "TGi" );  //『全局存储执行函数』
		
		// > 显示情况
		if( DrillUp.global_TGi_visibleTank == null ){			//（游戏没关时，不会为null)
			var data = global_data["global_visibleTank"];
			if( data == undefined ){ data = [] };
			DrillUp.global_TGi_visibleTank = data;
			DrillUp.drill_TGi_gCheckData_visible();				//（检查时自动赋新值）
		}
		
	//==============================
	// * 『全局存储』 - 存储
	//==============================
	StorageManager.drill_TGi_saveData = function(){
		var file_id = DrillUp.g_TGi_dataFileId;
		var data = {};
		data["global_visibleTank"] = DrillUp.global_TGi_visibleTank;
		this.drill_COGS_saveData( file_id, "TGi", data );  //『全局存储执行函数』
	};
}


//#############################################################################
// ** 【标准模块】标题层级 ☆标题层级
//#############################################################################
//##############################
// * 标题层级 - 添加贴图到层级【标准函数】
//				
//			参数：	> sprite 贴图        （添加的贴图对象）
//					> layer_index 字符串 （添加到的层级名，菜单后面层/菜单前面层）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图添加到目标层级中。
//##############################
Scene_Title.prototype.drill_TGi_layerAddSprite = function( sprite, layer_index ){
    this.drill_TGi_layerAddSprite_Private(sprite, layer_index);
};
//##############################
// * 标题层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从标题层级中移除。
//##############################
Scene_Title.prototype.drill_TGi_layerRemoveSprite = function( sprite ){
	this.drill_TGi_layerRemoveSprite_Private( sprite );
};
//##############################
// * 标题层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，标题层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Title.prototype.drill_TGi_sortByZIndex = function () {
    this.drill_TGi_sortByZIndex_Private();
};
//=============================================================================
// ** 标题层级（接口实现）
//=============================================================================
//==============================
// * 标题层级 - 层级初始化1
//==============================
var _drill_TGi_titleLayer_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	_drill_TGi_titleLayer_createBackground.call(this);
	
	// > 创建 菜单后面层（注意，Scene_Title 没有继承 Scene_MenuBase，提前创建）
	if( this._backgroundSprite == undefined ){
		this._backgroundSprite = new Sprite();
		this.addChild(this._backgroundSprite);
	}
};
//==============================
// * 标题层级 - 层级初始化2
//==============================
var _drill_TGi_titleLayer_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TGi_titleLayer_update.call(this);
	
	// > 创建 菜单后面层（防止报错）
	if( this._backgroundSprite == undefined ){
		this._backgroundSprite = new Sprite();
	}
	// > 创建 菜单前面层
	if( this._foregroundSprite == undefined ){
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);	
	}
};
//==============================
// * 标题层级 - 参数定义
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
// * 标题层级 - 图片层级排序（私有）
//==============================
Scene_Title.prototype.drill_TGi_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 标题层级 - 去除贴图（私有）
//==============================
Scene_Title.prototype.drill_TGi_layerRemoveSprite_Private = function( sprite ){
	this._backgroundSprite.removeChild( sprite );
	this._foregroundSprite.removeChild( sprite );
};
//==============================
// * 标题层级 - 添加贴图到层级（私有）
//==============================
Scene_Title.prototype.drill_TGi_layerAddSprite_Private = function( sprite, layer_index ){
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
// ** ☆预加载（标题）
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					> 此处需要在进入标题界面前进行加载，不能用Game_Temp。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_TGi_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 最后继承1级
//
//			说明：	> 在这个时候执行预加载，且只执行一次。
//==============================
var _drill_TGi_scene_initialize3 = SceneManager.initialize;
SceneManager.initialize = function() {
	_drill_TGi_scene_initialize3.call(this);
	
	// > 执行资源预加载
	DrillUp.drill_TGi_preloadInit();
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
DrillUp.drill_TGi_preloadInit = function(){
	this._drill_TGi_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_TGi_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_TGi_style.length; i++ ){
		var temp_data = DrillUp.g_TGi_style[i];
		if( temp_data == undefined ){ continue; }
		
		// > P预加载GIF管理
		if( temp_data['preloadType'] == "全部预加载" ){
			var src_img_num = temp_data['src_img_gif'].length;
			for( var k = 0; k < src_img_num; k++ ){
				this._drill_TGi_preloadTank.push( 
					ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img_gif'][k], temp_data['tint'], temp_data['smooth'], this._drill_TGi_cacheId ) 
				);
			}
		}
		if( temp_data['preloadType'] == "固定预加载数量" ){
			var src_img_num = temp_data['preloadNum'];
			if( src_img_num >= temp_data['src_img_gif'].length ){ src_img_num = temp_data['src_img_gif'].length; }
			for( var k = 0; k < src_img_num; k++ ){
				this._drill_TGi_preloadTank.push( 
					ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img_gif'][k], temp_data['tint'], temp_data['smooth'], this._drill_TGi_cacheId ) 
				);
			}
		}
	}
}



//=============================================================================
// ** ☆贴图创建标记
//			
//			说明：	> 此模块管理 创建标记，确保只创建一次。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图创建标记 - 初始化
//==============================
var _drill_TGi_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	
	// > GIF初始化
	SceneManager._drill_TGi_created = false;
   	this._drill_TGi_spriteTank = [];
   	this._drill_TGi_controllerTank = [];
	
	// > 原函数
	_drill_TGi_createBackground.call(this);
};
//==============================
// * 贴图创建标记 - 退出界面
//==============================
var _drill_TGi_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
	_drill_TGi_terminate.call(this);
	SceneManager._drill_TGi_created = false;	//（下次进入界面需重新创建）
};
//==============================
// * 贴图创建标记 - 帧刷新
//==============================
var _drill_TGi_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TGi_update.call(this);
	
	// > 要求载入完毕后 创建
	if( SceneManager.isCurrentSceneStarted() && 
		SceneManager._drill_TGi_created != true ){
		this.drill_TGi_create();
	}
	// > 帧刷新
	if( SceneManager._drill_TGi_created == true ){
		this.drill_TGi_update();
	}
};


//=============================================================================
// ** ☆贴图控制
//
//			说明：	> 此模块专门管理 贴图 的创建。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 贴图控制 - 创建
//==============================
Scene_Title.prototype.drill_TGi_create = function() {	
	SceneManager._drill_TGi_created = true;
	
	// > 防止报错
	if( this._drill_TGi_spriteTank == undefined ){
		this._drill_TGi_spriteTank = [];
	}
	if( this._drill_TGi_controllerTank == undefined ){
		this._drill_TGi_controllerTank = [];
	}
	
	// > 配置的数据
	for( var i = 0; i < DrillUp.g_TGi_style.length; i++ ){
		var temp_data = DrillUp.g_TGi_style[i];
		if( temp_data == undefined ){ continue; }
		
		// > 创建控制器
		var temp_controller = new Drill_TGi_Controller( i );
		this._drill_TGi_controllerTank.push( temp_controller );
		
		// > 创建贴图
		var temp_sprite = new Drill_TGi_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 遮罩
		if( temp_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite( ImageManager.loadBitmap( temp_data['src_img_file'], temp_data['src_img_mask'], temp_data['tint'], temp_data['smooth'] ) );
			temp_mask.anchor.x = 0.5;			//（给单贴图对象加遮罩）
			temp_mask.anchor.y = 0.5;			//
			temp_sprite.addChild(temp_mask);	//
			temp_sprite.mask = temp_mask;		//『遮罩赋值』
		}
		
		// > 添加贴图到层级
		this._drill_TGi_spriteTank.push( temp_sprite );
		this.drill_TGi_layerAddSprite( temp_sprite, temp_data['layerIndex'] );
	}
	this.drill_TGi_sortByZIndex();
}
//==============================
// * 贴图控制 - 帧刷新
//==============================
Scene_Title.prototype.drill_TGi_update = function() {
	this.drill_TGi_updateController();
	this.drill_TGi_updateAttr();
}
//==============================
// * 贴图控制 - 帧刷新 控制器
//==============================
Scene_Title.prototype.drill_TGi_updateController = function(){
	for(var i = 0; i < this._drill_TGi_controllerTank.length; i++ ){
		var temp_controller = this._drill_TGi_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器帧刷新
		temp_controller.drill_controller_update();
	}
}
//==============================
// * 贴图控制 - 帧刷新 基础特性
//==============================
Scene_Title.prototype.drill_TGi_updateAttr = function(){
	var has_layerChange = false;
	for(var i = 0; i < this._drill_TGi_spriteTank.length; i++){
		var temp_sprite = this._drill_TGi_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 基础特性 - 标题层级
		if( temp_sprite.layerIndex != temp_controller._drill_layerIndex ){
			temp_sprite.layerIndex =  temp_controller._drill_layerIndex;
			this.drill_TGi_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
			has_layerChange = true;
		}
		// > 基础特性 - 图片层级
		if( temp_sprite.zIndex != temp_controller._drill_zIndex ){
			temp_sprite.zIndex =  temp_controller._drill_zIndex;
			has_layerChange = true;
		}
	};
	
	// > 层级排序
	if( has_layerChange == true ){
		this.drill_TGi_sortByZIndex();
	}
}
/* （旧功能，这两个函数的体量直接涵盖了：控制器+贴图+贴图控制 三大功能）
//==============================
// * 贴图控制 - 创建（旧）
//==============================
Scene_Title.prototype.drill_TGi_create = function() {	
	SceneManager._drill_TGi_created = true;
	
	// > 防止报错
	if( this._drill_TGi_spriteTank == undefined ){
		this._drill_TGi_spriteTank = [];
	}
	if( this._drill_TGi_dataTank == undefined ){
		this._drill_TGi_dataTank = [];
	}
	
	// > 配置的GIF
	for( var i = 0; i < DrillUp.g_TGi_style.length; i++ ){
		var temp_data = DrillUp.g_TGi_style[i];
		if( temp_data == undefined ){ continue; }
		
		// > GIF贴图
		var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据（杜绝引用造成的修改）
		for(var j = 0; j < temp_sprite_data['src_img_gif'].length ; j++){
			temp_sprite_data['src_bitmaps'].push( ImageManager.loadBitmap( temp_sprite_data['src_img_file'], temp_sprite_data['src_img_gif'][j], temp_sprite_data['tint'], temp_sprite_data['smooth'] ) );
		}
		var temp_sprite = new Sprite();
		temp_sprite.bitmap = temp_sprite_data['src_bitmaps'][0];
		temp_sprite._time = 0;
		temp_sprite.anchor.x = 0.5;
		temp_sprite.anchor.y = 0.5;
		temp_sprite.x = temp_sprite_data['x'];
		temp_sprite.y = temp_sprite_data['y'];
		temp_sprite._org_x = temp_sprite.x;
		temp_sprite._org_y = temp_sprite.y;
		temp_sprite.opacity = temp_sprite_data['opacity'];
		temp_sprite.blendMode = temp_sprite_data['blendMode'];
		temp_sprite.scale.x = temp_sprite_data['scale_x'];
		temp_sprite.scale.y = temp_sprite_data['scale_y'];
		temp_sprite.skew.x = temp_sprite_data['skew_x'];
		temp_sprite.skew.y = temp_sprite_data['skew_y'];
		temp_sprite.visible = DrillUp.global_TGi_visibleTank[i] || false;
		
		temp_sprite._breath = Math.random() * temp_sprite_data['breath_period'];
		temp_sprite._breath_dir = Math.floor(Math.random() * 2);
		temp_sprite._f_time = 0;
		this._drill_TGi_spriteTank.push(temp_sprite);
		this._drill_TGi_dataTank.push(temp_sprite_data);
		
		// > GIF父级
		var temp_layer = new Sprite();
		temp_layer.addChild(temp_sprite);
		temp_layer.zIndex = temp_sprite_data['zIndex'];
		
		// > GIF遮罩
		if( temp_sprite_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite( ImageManager.loadBitmap( temp_sprite_data['src_img_file'], temp_sprite_data['src_img_mask'], temp_sprite_data['tint'], temp_sprite_data['smooth'] ) );
			temp_layer.addChild(temp_mask);
			temp_layer.mask = temp_mask;		//『遮罩赋值』
		}
		
		this.drill_TGi_layerAddSprite( temp_layer, temp_sprite_data['layerIndex'] );
	}
	this.drill_TGi_sortByZIndex();
};
//==============================
// * 贴图控制 - 帧刷新（旧）
//==============================
Scene_Title.prototype.drill_TGi_update = function() {
	for(var i = 0; i < this._drill_TGi_spriteTank.length; i++ ){
		var t_gif = this._drill_TGi_spriteTank[i];
		var t_gif_data = this._drill_TGi_dataTank[i];
		
		// > 播放gif
		t_gif._time += 1;
		var inter = this._drill_TGi_spriteTank[i]._time ;
		inter = inter / t_gif_data['interval'];
		inter = inter % t_gif_data['src_bitmaps'].length;
		if( t_gif_data['back_run'] ){
			inter = t_gif_data['src_bitmaps'].length - 1 - inter;
		}
		inter = Math.floor(inter);
		t_gif.bitmap = t_gif_data['src_bitmaps'][inter];
		
		// > 旋转
		t_gif.rotation += t_gif_data['rotate'] /180*Math.PI;
		
		// > 呼吸效果
		if( t_gif_data['breath'] ){
			if( t_gif._breath_dir == 0 ){
				t_gif._breath += 2.1;
				if( t_gif._breath >= t_gif_data['breath_period'] ){
					t_gif._breath_dir = 1;
				}
			}
			if( t_gif._breath_dir == 1 ){
				t_gif._breath -= 1.3;
				if( t_gif._breath <= 0 ){
					t_gif._breath_dir = 0;
				}
			}
			t_gif.anchor.y = 1;
			if(t_gif_data['breath_type'] == '上下缩放' || t_gif_data['breath_type'] == '整体缩放'){
				t_gif.scale.y = 1.00 + (t_gif._breath/t_gif_data['breath_period'] * t_gif_data['breath_spread']/100 );
			}
			if(t_gif_data['breath_type'] == '左右缩放' || t_gif_data['breath_type'] == '整体缩放'){
				t_gif.scale.x = 1.00 + (t_gif._breath/t_gif_data['breath_period'] * t_gif_data['breath_spread']/100 );
			}
		}
		// > 漂浮效果
		if( t_gif_data['float'] ){
			t_gif._f_time += t_gif_data['float_speed'];
			if(t_gif._f_time > 360){ t_gif._f_time -= 360; }
			if(t_gif._f_time < 360){ t_gif._f_time += 360; }
			if(t_gif_data['float_type'] == '上下漂浮' ){
				t_gif.y = t_gif._org_y + Math.sin( t_gif._f_time / 180 * Math.PI ) * t_gif_data['float_spread'];
			}
			if(t_gif_data['float_type'] == '左右漂浮' ){
				t_gif.x = t_gif._org_x + Math.sin( t_gif._f_time / 180 * Math.PI ) * t_gif_data['float_spread'];
			}
		}
	};
};
*/


//=============================================================================
// ** 标题GIF控制器【Drill_TGi_Controller】
// **		
// **		作用域：	标题界面
// **		主功能：	定义一个专门控制标题GIF的数据类。
// **		子功能：	
// **					->控制器『控制器与贴图』
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					
// **					->A主体『界面装饰最终变换值』『变换特性的规范』
// **						->基础特性
// **							>  资源名
// **							>  显示/隐藏
// **							>  暂停/继续
// **							>  混合模式
// **							>  层级
// **							>  堆叠级
// **						->其它特性
// **					->B变换特性『变换特性-单贴图』
// **						>  锚点X
// **						>  锚点Y
// **						>  位置X
// **						>  位置Y
// **						>  缩放X
// **						>  缩放Y
// **						>  透明度
// **						>  斜切X
// **						>  斜切Y
// **						>  旋转
// **						>  转速
// **					->C校验值
// **					->D指令叠加变化
// **						> 主体贴图>移动到
// **						> 主体贴图>透明度
// **						> 主体贴图>旋转
// **						> 圈贴图>转速
// **						> 层贴图>缩放X
// **						> 层贴图>缩放Y
// **						> 层贴图>斜切X
// **						> 层贴图>斜切Y
// **					->E延迟指令
// **					->F周期指令
// **					->G自变化效果
// **						> 主体贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 圈贴图>摇晃效果
// **						> 层贴图>缩放效果
// **					
// **					->O播放GIF
// **						->设置帧
// **						->锁定帧/解锁帧
// **						->单次播放
// **					->P预加载GIF管理
// **					->Q随机位置
// **					
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_TGi_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 初始化
//==============================
Drill_TGi_Controller.prototype.initialize = function( data_id ){
	this._drill_data_id = data_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『随机因子-生成一个不重复的序列号』
	//this.drill_controller_initData();										//初始化数据
	this.drill_controller_initChild();										//初始化子功能
	this.drill_controller_resetData( data_id );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_TGi_Controller.prototype.drill_controller_update = function(){
	this.drill_controller_updateDelayingCommandImportant();		//帧刷新 - E延迟指令 - 时间流逝
	this.drill_controller_updatePeriodizeCommandImportant();	//帧刷新 - F周期指令 - 时间流逝
	if( this._drill_pause == true ){ return; }
	this.drill_controller_updateAttr();							//帧刷新 - A主体
	this.drill_controller_updateChange_Rotation();				//帧刷新 - B变换特性 - 旋转
	this.drill_controller_updateCommandChange();				//帧刷新 - D指令叠加变化
	this.drill_controller_updateDelayingCommand();				//帧刷新 - E延迟指令 - 执行延迟指令
	this.drill_controller_updatePeriodizeCommand();				//帧刷新 - F周期指令 - 执行延迟指令
	this.drill_controller_updateEffect();						//帧刷新 - G自变化效果
	
	this.drill_controller_updateGIF();							//帧刷新 - O播放GIF
																//帧刷新 - P预加载GIF管理（无）
	this.drill_controller_updateRandomPos();					//帧刷新 - Q随机位置
	
	this.drill_controller_updateCheckNaN();						//帧刷新 - C校验值
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data_id 数字
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//##############################
Drill_TGi_Controller.prototype.drill_controller_resetData = function( data_id ){
	this.drill_controller_resetData_Private( data_id );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_TGi_Controller.prototype.drill_controller_setVisible = function( visible ){
	this._drill_visible = visible;
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> pause 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_TGi_Controller.prototype.drill_controller_setPause = function( pause ){
	this._drill_pause = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_TGi_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_TGi_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * 控制器 - 切换混合模式【标准函数】
//
//			参数：	> blendMode 数字
//			返回：	> 无
//##############################
Drill_TGi_Controller.prototype.drill_controller_setBlendMode = function( blendMode ){
	this._drill_blendMode = blendMode;
};
//##############################
// * 控制器 - 切换标题层级【标准函数】
//
//			参数：	> layerIndex 字符串
//			返回：	> 无
//##############################
Drill_TGi_Controller.prototype.drill_controller_setLayerIndex = function( layerIndex ){
	this._drill_layerIndex = layerIndex;
};
//##############################
// * 控制器 - 切换图片层级【标准函数】
//
//			参数：	> zIndex 数字
//			返回：	> 无
//##############################
Drill_TGi_Controller.prototype.drill_controller_setZIndex = function( zIndex ){
	this._drill_zIndex = zIndex;
};

//##############################
// * O播放GIF - 设置帧【标准函数】
//
//			参数：	> cur_frame 数字（当前帧）
//			返回：	> 无
//			
//			说明：	> 从帧数0开始计数。
//##############################
Drill_TGi_Controller.prototype.drill_controller_GIF_setFrame = function( cur_frame ){
	var data = this.drill_data();
	
	// > 设置帧
	this._drill_GIF_time = cur_frame * data['interval'];
	if( this._drill_GIF_time < 0 ){ this._drill_GIF_time = 0; }
	
	// > 刷新索引
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = Math.floor(inter);
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
};
//##############################
// * O播放GIF - 锁定帧/解锁帧【标准函数】
//
//			参数：	> locked 布尔
//			返回：	> 无
//##############################
Drill_TGi_Controller.prototype.drill_controller_GIF_setLocked = function( locked ){
	this._drill_GIF_lockEnabled = locked;
	this._drill_GIF_oncePlay = false;
};
//##############################
// * O播放GIF - 单次播放【标准函数】
//
//			参数：	> once_type 字符串（forwardRun正向播放/backRun反向播放）
//			返回：	> 无
//##############################
Drill_TGi_Controller.prototype.drill_controller_GIF_setOncePlay = function( once_type ){
	var data = this.drill_data();
	this._drill_GIF_oncePlay = true;
	this._drill_GIF_onceType = once_type;
	this._drill_GIF_time = 0;
	this._drill_GIF_onceTarTime = data['src_img_gif'].length * data['interval'];
};

//##############################
// * 控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> data 对象
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_TGi_Controller.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 接收数据 的参数）
	
	// > A主体 - 基础特性
	if( data['src_img_gif'] == undefined ){ data['src_img_gif'] = [] };								//A主体 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/titles1/" };				//A主体 - 文件夹
	if( data['interval'] == undefined ){ data['interval'] = 4 };									//A主体 - 帧间隔
	if( data['back_run'] == undefined ){ data['back_run'] = false };								//A主体 - 是否倒放
	
	if( data['tint'] == undefined ){ data['tint'] = 0 };											//A主体 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };									//A主体 - 图像-模糊边缘
	
	if( data['visible'] == undefined ){ data['visible'] = true };									//A主体 - 显示/隐藏
	if( data['pause'] == undefined ){ data['pause'] = false };										//A主体 - 暂停/继续
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };									//A主体 - 混合模式
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "菜单前面层" };						//A主体 - 标题层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };										//A主体 - 图片层级
	
	// > A主体 - 其它特性
	if( data['src_img_mask'] == undefined ){ data['src_img_mask'] = "" };							//A主体 - 遮罩资源
	
	
	// > B变换特性
	if( data['x'] == undefined ){ data['x'] = 0 };													//B变换特性 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };													//B变换特性 - 平移Y
	if( data['rotate'] == undefined ){ data['rotate'] = 0 };										//B变换特性 - 转速（单位角度）
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };									//B变换特性 - 透明度
	if( data['anchor_x'] == undefined ){ data['anchor_x'] = 0.5 };									//B变换特性 - 锚点X
	if( data['anchor_y'] == undefined ){ data['anchor_y'] = 0.5 };									//B变换特性 - 锚点Y
	
	// > B变换特性 - 3d效果
	if( data['scale_x'] == undefined ){ data['scale_x'] = 1.0 };									//B变换特性 - 3d效果 - 整体缩放X
	if( data['scale_y'] == undefined ){ data['scale_y'] = 1.0 };									//B变换特性 - 3d效果 - 整体缩放Y
	if( data['skew_x'] == undefined ){ data['skew_x'] = 0 };										//B变换特性 - 3d效果 - 整体斜切X
	if( data['skew_y'] == undefined ){ data['skew_y'] = 0 };										//B变换特性 - 3d效果 - 整体斜切Y
	if( data['parentRotate'] == undefined ){ data['parentRotate'] = 0 };							//B变换特性 - 3d效果 - 整体再旋转角度（单位角度）
	
	
	// > C校验值（无）
	
	// > D指令叠加变化（无）
	
	// > E延迟指令（无）
	
	// > F周期指令（无）
	
	// > G自变化效果
	if( data['effect_float'] == undefined ){ data['effect_float'] = "关闭" };						//G自变化效果 - 浮动效果
	if( data['effect_floatSpeed'] == undefined ){ data['effect_floatSpeed'] = 1.0 };				//G自变化效果 - 浮动速度
	if( data['effect_floatRange'] == undefined ){ data['effect_floatRange'] = 15 };					//G自变化效果 - 浮动偏移量
	if( data['effect_flicker'] == undefined ){ data['effect_flicker'] = "关闭" };					//G自变化效果 - 闪烁效果
	if( data['effect_flickerSpeed'] == undefined ){ data['effect_flickerSpeed'] = 6.0 };			//G自变化效果 - 闪烁速度
	if( data['effect_flickerRange'] == undefined ){ data['effect_flickerRange'] = 20 };				//G自变化效果 - 闪烁幅度范围
	if( data['effect_swing'] == undefined ){ data['effect_swing'] = "关闭" };						//G自变化效果 - 摇晃效果
	if( data['effect_swingSpeed'] == undefined ){ data['effect_swingSpeed'] = 4.0 };				//G自变化效果 - 摇晃速度
	if( data['effect_swingRange'] == undefined ){ data['effect_swingRange'] = 12 };					//G自变化效果 - 摇晃幅度范围
	if( data['effect_zoom'] == undefined ){ data['effect_zoom'] = "关闭" };							//G自变化效果 - 缩放效果
	if( data['effect_zoomSpeed'] == undefined ){ data['effect_zoomSpeed'] = 1.0 };					//G自变化效果 - 缩放速度
	if( data['effect_zoomRange'] == undefined ){ data['effect_zoomRange'] = 0.2 };					//G自变化效果 - 缩放幅度范围
	
	// > O播放GIF
	if( data['gif_lock'] == undefined ){ data['gif_lock'] = false };								//O播放GIF - 初始是否锁定帧
	if( data['gif_initFrame'] == undefined ){ data['gif_initFrame'] = 0 };							//O播放GIF - 锁定帧数
	
	// > P预加载GIF管理
	if( data['preloadType'] == undefined ){ data['preloadType'] = "关闭预加载" };					//P预加载GIF管理 - 预加载类型
	if( data['preloadNum'] == undefined ){ data['preloadNum'] = 35 };								//P预加载GIF管理 - 固定预加载的数量
	
	// > Q随机位置
	if( data['randomPos_enable'] == undefined ){ data['randomPos_enable'] = false };				//Q随机位置 - 是否启用随机位置
	if( data['randomPos_width'] == undefined ){ data['randomPos_width'] = 50 };						//Q随机位置 - 随机位置的范围宽度
	if( data['randomPos_height'] == undefined ){ data['randomPos_height'] = 50 };					//Q随机位置 - 随机位置的范围高度
	if( data['randomPos_autoChange'] == undefined ){ data['randomPos_autoChange'] = false };		//Q随机位置 - 是否在每次播放GIF完毕后变化位置
	if( data['randomPos_gifFrame'] == undefined ){ data['randomPos_gifFrame'] = false };			//Q随机位置 - 是否随机GIF初始帧
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_TGi_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();				//初始化子功能 - A主体
	this.drill_controller_initChange();				//初始化子功能 - B变换特性
	this.drill_controller_initCheck();				//初始化子功能 - C校验值
	this.drill_controller_initCommandChange();		//初始化子功能 - D指令叠加变化
	this.drill_controller_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_controller_initPeriodizeCommand();	//初始化子功能 - F周期指令
	this.drill_controller_initEffect();				//初始化子功能 - G自变化效果
	
	this.drill_controller_initGIF();				//初始化子功能 - O播放GIF
	this.drill_controller_initPreload();			//初始化子功能 - P预加载GIF管理
	this.drill_controller_initRandomPos();			//初始化子功能 - Q随机位置
}
//==============================
// * 控制器 - 重设数据（私有）
//==============================
Drill_TGi_Controller.prototype.drill_controller_resetData_Private = function( data_id ){
	
	// > 参数检查
	if( typeof data_id != "number" ){
		alert( DrillUp.drill_TGi_getPluginTip_controllerData_NotId("Drill_TGi_Controller") );
		throw Error( DrillUp.drill_TGi_getPluginTip_controllerData_NotId("Drill_TGi_Controller") );
		return;
	}
	
	// > 执行重置
	this._drill_data_id = data_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『随机因子-生成一个不重复的序列号』
	//this.drill_controller_initData();										//初始化数据
	this.drill_controller_initChild();										//初始化子功能
}
//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』校验标记
//##############################
DrillUp.g_TGi_notFindStyleAlertOnce = true;
//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』空的静态数据
//			
//			说明：	> 空数据会在initData时会进行默认值初始化，在其他地方只读。
//##############################
Drill_TGi_Controller.emptyData = {};
//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』获取静态数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，不要存储到存档中，也不要直接挂载到Controller身上。
//					> 静态数据会在initData时会进行默认值初始化，在其他地方只读。
//					> 【此函数不含遍历，而是直接获取值，可以放在帧刷新中使用】
//##############################
Drill_TGi_Controller.prototype.drill_data = function(){
	var cur_styleId   = this._drill_data_id +1;
	var cur_styleData = DrillUp.g_TGi_style[ this._drill_data_id ];
	if( cur_styleData == undefined ){
		
		// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（只执行一次）
		if( DrillUp.g_TGi_notFindStyleAlertOnce == true ){
			DrillUp.g_TGi_notFindStyleAlertOnce = false;
			alert( DrillUp.drill_TGi_getPluginTip_StyleNotFind(cur_styleId) );
		}
		return Drill_TGi_Controller.emptyData;
	}
	return cur_styleData;
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_TGi_Controller.prototype.drill_controller_initAttr = function(){
	var data = this.drill_data();
	
	// > A主体 - 基础特性
	this._drill_visible = false;					//控制器 - 显示/隐藏
	this._drill_pause = data['pause'];				//控制器 - 暂停/继续
	this._drill_blendMode = data['blendMode'];		//控制器 - 混合模式
	this._drill_layerIndex = data['layerIndex'];	//控制器 - 层级
	this._drill_zIndex = data['zIndex'];			//控制器 - 堆叠级
	
	// > A主体 - 其它特性
	//	（见 data['src_img_mask']）
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_TGi_Controller.prototype.drill_controller_updateAttr = function(){
	
	// > 显示/隐藏 设置
	this._drill_visible = DrillUp.global_TGi_visibleTank[ this._drill_data_id ];
	
	// > 时间流逝
	this._drill_curTime += 1;
}

//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_TGi_Controller.prototype.drill_controller_initChange = function(){
	var data = this.drill_data();
	
	// > 变换值 - 锚点
	this._drill_change_anchor_x = data['anchor_x'];
	this._drill_change_anchor_y = data['anchor_y'];
	
	// > 变换值 - 位置
	this._drill_change_x = data['x'];
	this._drill_change_y = data['y'];
	
	
	// > 变换值 - 缩放
	this._drill_change_scaleX = data['scale_x'];	//（3d效果）
	this._drill_change_scaleY = data['scale_y'];
	
	// > 变换值 - 缩放（圈贴图）
	//	（无）
	
	
	// > 变换值 - 透明度
	this._drill_change_opacity = data['opacity'];
	
	
	// > 变换值 - 斜切
	this._drill_change_skewX = data['skew_x'];		//（3d效果）
	this._drill_change_skewY = data['skew_y'];
	
	// > 变换值 - 斜切（圈贴图）
	//	（无）
	
	
	// > 变换值 - 旋转
	this._drill_change_rotate = data['parentRotate'];		//（整体再旋转角度）
	
	// > 变换值 - 旋转（圈贴图）
	this._drill_childGIF_rotation = 0;					//（自旋转）
	this._drill_childGIF_rotateSpeed = data['rotate'];	//（自旋转速度）
}
//==============================
// * B变换特性 - 帧刷新 旋转
//==============================
Drill_TGi_Controller.prototype.drill_controller_updateChange_Rotation = function(){
	
	// > 变换值 - 帧刷新 旋转（圈贴图）
	this._drill_childGIF_rotation += this._drill_childGIF_rotateSpeed;
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置X（可继承，开放函数）
//##############################
Drill_TGi_Controller.prototype.drill_controller_finalTransform_x = function(){
	return this._drill_change_x;
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置Y（可继承，开放函数）
//##############################
Drill_TGi_Controller.prototype.drill_controller_finalTransform_y = function(){
	return this._drill_change_y;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放X（可继承，开放函数）
//##############################
Drill_TGi_Controller.prototype.drill_controller_finalTransform_scaleX = function(){
	return this._drill_change_scaleX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放Y（可继承，开放函数）
//##############################
Drill_TGi_Controller.prototype.drill_controller_finalTransform_scaleY = function(){
	return this._drill_change_scaleY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 透明度（可继承，开放函数）
//##############################
Drill_TGi_Controller.prototype.drill_controller_finalTransform_opacity = function(){
	return this._drill_change_opacity;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切X（可继承，开放函数）
//##############################
Drill_TGi_Controller.prototype.drill_controller_finalTransform_skewX = function(){
	return this._drill_change_skewX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切Y（可继承，开放函数）
//##############################
Drill_TGi_Controller.prototype.drill_controller_finalTransform_skewY = function(){
	return this._drill_change_skewY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 旋转（可继承，开放函数）
//##############################
Drill_TGi_Controller.prototype.drill_controller_finalTransform_rotate = function(){
	return this._drill_change_rotate;
}
//##############################
// * B变换特性 - 数据最终变换值 - 转速（可继承，开放函数）
//##############################
Drill_TGi_Controller.prototype.drill_controller_finalTransform_rotateSpeed = function(){
	return this._drill_childGIF_rotateSpeed;
}

//==============================
// * C校验值 - 初始化子功能
//==============================
Drill_TGi_Controller.prototype.drill_controller_initCheck = function(){
	//（无）
}
//==============================
// * C校验值 - 校验标记
//==============================
DrillUp.g_TGi_checkNaN = true;
//==============================
// * C校验值 - 帧刷新
//==============================
Drill_TGi_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_TGi_checkNaN == true ){
		if( isNaN( this.drill_controller_finalTransform_x() ) ){
			DrillUp.g_TGi_checkNaN = false;
			var check_tank = {};
			check_tank["_drill_change_x"] = this._drill_change_x;
			alert( DrillUp.drill_TGi_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_x", check_tank ) );
		}
		if( isNaN( this.drill_controller_finalTransform_y() ) ){
			DrillUp.g_TGi_checkNaN = false;
			var check_tank = {};
			check_tank["_drill_change_y"] = this._drill_change_y;
			alert( DrillUp.drill_TGi_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_y", check_tank ) );
		}
		if( isNaN( this.drill_controller_finalTransform_opacity() ) ){
			DrillUp.g_TGi_checkNaN = false;
			alert( DrillUp.drill_TGi_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_opacity" ) );
		}
		if( isNaN( this.drill_controller_finalTransform_rotate() ) ){
			DrillUp.g_TGi_checkNaN = false;
			alert( DrillUp.drill_TGi_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_rotate" ) );
		}
	}
}


//==============================
// * D指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_TGi_Controller.prototype.drill_controller_initCommandChange = function(){
	
	// > 控制器参数 - 移动到
	this["_drill_command_move_data"] = undefined;
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	// > 控制器参数 - 转速
	this["_drill_command_rotateSpeed_data"] = undefined;
	
	// > 控制器参数 - 缩放X
	this["_drill_command_scaleX_data"] = undefined;
	// > 控制器参数 - 缩放Y
	this["_drill_command_scaleY_data"] = undefined;
	
	// > 控制器参数 - 斜切X
	this["_drill_command_skewX_data"] = undefined;
	// > 控制器参数 - 斜切Y
	this["_drill_command_skewY_data"] = undefined;
}
//==============================
// * D指令叠加变化 - 帧刷新
//==============================
Drill_TGi_Controller.prototype.drill_controller_updateCommandChange = function(){
	
	// > 帧刷新 - 移动到（二维弹道）
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_update( this, "_drill_command_move_data" );
	
	// > 帧刷新 - 透明度
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_opacity_data" );
	
	// > 帧刷新 - 旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_rotate_data" );
	// > 帧刷新 - 转速
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_rotateSpeed_data" );
	
	// > 帧刷新 - 缩放X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_scaleX_data" );
	// > 帧刷新 - 缩放Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_scaleY_data" );
	
	// > 帧刷新 - 斜切X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_skewX_data" );
	// > 帧刷新 - 斜切Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_skewY_data" );
}
//==============================
// * D指令叠加变化 - 立即还原所有单属性
//==============================
Drill_TGi_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
	// > 控制器参数 - 移动到
	//	（这里不含）
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	// > 控制器参数 - 转速
	this["_drill_command_rotateSpeed_data"] = undefined;
	
	// > 控制器参数 - 缩放X
	this["_drill_command_scaleX_data"] = undefined;
	// > 控制器参数 - 缩放Y
	this["_drill_command_scaleY_data"] = undefined;
	
	// > 控制器参数 - 斜切X
	this["_drill_command_skewX_data"] = undefined;
	// > 控制器参数 - 斜切Y
	this["_drill_command_skewY_data"] = undefined;
}
//==============================
// * D指令叠加变化 - 立即归位
//==============================
Drill_TGi_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = undefined;
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动到
//==============================
Drill_TGi_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", data['x'], data['y'],		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 透明度
//==============================
Drill_TGi_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 旋转
//==============================
Drill_TGi_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", data['parentRotate'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 转速
//==============================
Drill_TGi_Controller.prototype.drill_controller_commandChange_setRotateSpeed = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotateSpeed_data", data['rotate'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放X
//==============================
Drill_TGi_Controller.prototype.drill_controller_commandChange_setScaleX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleX_data", data['scale_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放Y
//==============================
Drill_TGi_Controller.prototype.drill_controller_commandChange_setScaleY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", data['scale_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切X
//==============================
Drill_TGi_Controller.prototype.drill_controller_commandChange_setSkewX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewX_data", data['skew_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切Y
//==============================
Drill_TGi_Controller.prototype.drill_controller_commandChange_setSkewY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewY_data", data['skew_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}


//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_TGi_Controller.prototype.drill_controller_initDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}
//==============================
// * E延迟指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_TGi_Controller.prototype.drill_controller_updateDelayingCommandImportant = function(){
	if( this._drill_curDelayingCommandTank.length == 0 ){ return; }
	
	// > 帧刷新 时间流逝
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		
		// > 时间-1
		dc_data['left_time'] -= 1;
		
	}
	
	// > 执行延迟指令（暂停/继续）
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			var method = dc_data['method'];
			var paramList = dc_data['paramList'];
			if( method == "drill_controller_setPause" ){
				this.drill_controller_setPause( paramList[0] );
			}
		}
	}
}
//==============================
// * E延迟指令 - 帧刷新 - 执行延迟指令
//==============================
Drill_TGi_Controller.prototype.drill_controller_updateDelayingCommand = function(){
	if( this._drill_curDelayingCommandTank.length == 0 ){ return; }
	
	// > 执行延迟指令
	for(var i = 0; i < this._drill_curDelayingCommandTank.length; i++ ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			var method = dc_data['method'];
			var paramList = dc_data['paramList'];
			
			if( method == "drill_controller_setVisible" ){
				this.drill_controller_setVisible( paramList[0] );
			
			}else if( method == "drill_controller_commandChange_setOpacity" ){
				this.drill_controller_commandChange_setOpacity( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setRotate" ){
				this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setRotateSpeed" ){
				this.drill_controller_commandChange_setRotateSpeed( paramList[0], paramList[1], paramList[2] );
				
			}else if( method == "drill_controller_commandChange_setScaleX" ){
				this.drill_controller_commandChange_setScaleX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setScaleY" ){
				this.drill_controller_commandChange_setScaleY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSkewX" ){
				this.drill_controller_commandChange_setSkewX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSkewY" ){
				this.drill_controller_commandChange_setSkewY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_restoreAttr" ){
				this.drill_controller_commandChange_restoreAttr();
			
			}else if( method == "drill_controller_commandChange_setMove" ){
				this.drill_controller_commandChange_setMove( paramList[0], paramList[1], paramList[2], paramList[3] );
			}else if( method == "drill_controller_commandChange_restoreMove" ){
				this.drill_controller_commandChange_restoreMove();
			
			}else if( method == "drill_controller_GIF_setLocked" ){
				this.drill_controller_GIF_setLocked( paramList[0] );
			}else if( method == "drill_controller_GIF_setOncePlay" ){
				this.drill_controller_GIF_setOncePlay( paramList[0] );
			}else if( method == "drill_controller_GIF_setFrame" ){
				this.drill_controller_GIF_setFrame( paramList[0] );
			}
		}
	}
	
	// > 销毁延迟指令
	for(var i = this._drill_curDelayingCommandTank.length-1; i >= 0; i-- ){
		var dc_data = this._drill_curDelayingCommandTank[i];
		if( dc_data['left_time'] < 0 ){
			this._drill_curDelayingCommandTank.splice( i, 1 );
		}
	}
}
//==============================
// * E延迟指令 - 设置指令（开放函数）
//==============================
Drill_TGi_Controller.prototype.drill_controller_setDelayingCommand = function( method, paramList, delay_time ){
	if( method != "drill_controller_setVisible" &&
		method != "drill_controller_setPause" &&
		
		method != "drill_controller_commandChange_setOpacity" &&
		method != "drill_controller_commandChange_setRotate" &&
		method != "drill_controller_commandChange_setRotateSpeed" &&
		
		method != "drill_controller_commandChange_setScaleX" &&
		method != "drill_controller_commandChange_setScaleY" &&
		method != "drill_controller_commandChange_setSkewX" &&
		method != "drill_controller_commandChange_setSkewY" &&
		method != "drill_controller_commandChange_restoreAttr" &&
		
		method != "drill_controller_commandChange_setMove" &&
		method != "drill_controller_commandChange_restoreMove" &&
		
		method != "drill_controller_GIF_setLocked" &&
		method != "drill_controller_GIF_setOncePlay" &&
		method != "drill_controller_GIF_setFrame"
	){ return; }
	
	var dc_data = {};
	dc_data['method'] = method;
	dc_data['paramList'] = paramList;
	dc_data['left_time'] = delay_time;
	this._drill_curDelayingCommandTank.push( dc_data );
}
//==============================
// * E延迟指令 - 清空全部（开放函数）
//==============================
Drill_TGi_Controller.prototype.drill_controller_clearDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}


//==============================
// * F周期指令 - 初始化子功能
//==============================
Drill_TGi_Controller.prototype.drill_controller_initPeriodizeCommand = function(){
	this._drill_curPeriodizeCommandTank = [];
}
//==============================
// * F周期指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_TGi_Controller.prototype.drill_controller_updatePeriodizeCommandImportant = function(){
	if( this._drill_curPeriodizeCommandTank.length == 0 ){ return; }
	
	// > 帧刷新 时间流逝
	for(var i = 0; i < this._drill_curPeriodizeCommandTank.length; i++ ){
		var pc_data = this._drill_curPeriodizeCommandTank[i];
		
		// > 时间-1
		pc_data['cur_time'] += 1;
	}
	
	// > 执行周期指令（暂停/继续）
	for(var i = 0; i < this._drill_curPeriodizeCommandTank.length; i++ ){
		var pc_data = this._drill_curPeriodizeCommandTank[i];
		var time =  pc_data['cur_time'] % pc_data['time_period'];
		if( time == pc_data['time_start'] ){
			var method = pc_data['method'];
			var paramList = pc_data['paramList'];
			if( method == "drill_controller_setPause" ){
				this.drill_controller_setPause( paramList[0] );
			}
		}
	}
}
//==============================
// * F周期指令 - 帧刷新 - 执行周期指令
//==============================
Drill_TGi_Controller.prototype.drill_controller_updatePeriodizeCommand = function(){
	if( this._drill_curPeriodizeCommandTank.length == 0 ){ return; }
	
	// > 执行周期指令
	for(var i = 0; i < this._drill_curPeriodizeCommandTank.length; i++ ){
		var pc_data = this._drill_curPeriodizeCommandTank[i];
		var time =  pc_data['cur_time'] % pc_data['time_period'];
		if( time == pc_data['time_start'] ){
			var method = pc_data['method'];
			var paramList = pc_data['paramList'];
			
			if( method == "drill_controller_setVisible" ){
				this.drill_controller_setVisible( paramList[0] );
			
			}else if( method == "drill_controller_commandChange_setOpacity" ){
				this.drill_controller_commandChange_setOpacity( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setRotate" ){
				this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setRotateSpeed" ){
				this.drill_controller_commandChange_setRotateSpeed( paramList[0], paramList[1], paramList[2] );
				
			}else if( method == "drill_controller_commandChange_setScaleX" ){
				this.drill_controller_commandChange_setScaleX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setScaleY" ){
				this.drill_controller_commandChange_setScaleY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSkewX" ){
				this.drill_controller_commandChange_setSkewX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSkewY" ){
				this.drill_controller_commandChange_setSkewY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_restoreAttr" ){
				this.drill_controller_commandChange_restoreAttr();
			
			}else if( method == "drill_controller_commandChange_setMove" ){
				this.drill_controller_commandChange_setMove( paramList[0], paramList[1], paramList[2], paramList[3] );
			}else if( method == "drill_controller_commandChange_restoreMove" ){
				this.drill_controller_commandChange_restoreMove();
			
			}else if( method == "drill_controller_GIF_setLocked" ){
				this.drill_controller_GIF_setLocked( paramList[0] );
			}else if( method == "drill_controller_GIF_setOncePlay" ){
				this.drill_controller_GIF_setOncePlay( paramList[0] );
			}else if( method == "drill_controller_GIF_setFrame" ){
				this.drill_controller_GIF_setFrame( paramList[0] );
			}
		}
	}
	
}
//==============================
// * F周期指令 - 设置指令（开放函数）
//==============================
Drill_TGi_Controller.prototype.drill_controller_setPeriodizeCommand = function( method, paramList, time_period, time_start ){
	if( method != "drill_controller_setVisible" &&
		method != "drill_controller_setPause" &&
		
		method != "drill_controller_commandChange_setOpacity" &&
		method != "drill_controller_commandChange_setRotate" &&
		method != "drill_controller_commandChange_setRotateSpeed" &&
		
		method != "drill_controller_commandChange_setScaleX" &&
		method != "drill_controller_commandChange_setScaleY" &&
		method != "drill_controller_commandChange_setSkewX" &&
		method != "drill_controller_commandChange_setSkewY" &&
		method != "drill_controller_commandChange_restoreAttr" &&
		
		method != "drill_controller_commandChange_setMove" &&
		method != "drill_controller_commandChange_restoreMove" &&
		
		method != "drill_controller_GIF_setLocked" &&
		method != "drill_controller_GIF_setOncePlay" &&
		method != "drill_controller_GIF_setFrame"
	){ return; }
	
	var pc_data = {};
	pc_data['method'] = method;
	pc_data['paramList'] = paramList;
	pc_data['time_period'] = time_period;
	pc_data['time_start'] = time_start;
	pc_data['cur_time'] = -1;			//（时间先+1后判断，所以取-1）
	this._drill_curPeriodizeCommandTank.push( pc_data );
}
//==============================
// * F周期指令 - 清空全部（开放函数）
//==============================
Drill_TGi_Controller.prototype.drill_controller_clearPeriodizeCommand = function(){
	this._drill_curPeriodizeCommandTank = [];
}


//==============================
// * G自变化效果 - 初始化子功能
//==============================
Drill_TGi_Controller.prototype.drill_controller_initEffect = function(){
	this._drill_curEffectTime = 0;
}
//==============================
// * G自变化效果 - 帧刷新
//==============================
Drill_TGi_Controller.prototype.drill_controller_updateEffect = function(){
	this._drill_curEffectTime += 1;
}


//==============================
// * O播放GIF - 初始化子功能
//==============================
Drill_TGi_Controller.prototype.drill_controller_initGIF = function(){
	var data = this.drill_data();
	
	// > 播放GIF
	this.drill_controller_GIF_setFrame( data['gif_initFrame'] -1 );		//播放GIF - 当前时间
	this._drill_GIF_index = 0;											//播放GIF - 当前索引
	this._drill_GIF_lockEnabled = data['gif_lock'];						//播放GIF - 是否锁定帧
	
	// > 单次播放
	this._drill_GIF_oncePlay = false;
	this._drill_GIF_onceType = "forwardRun";	//（forwardRun正向播放/backRun反向播放）
	this._drill_GIF_onceTarTime = 0;
}
//==============================
// * O播放GIF - 帧刷新
//==============================
Drill_TGi_Controller.prototype.drill_controller_updateGIF = function(){
	var data = this.drill_data();
	
	// > 单次播放
	if( this._drill_GIF_oncePlay == true ){
		
		// > 播放GIF
		var inter = this._drill_GIF_time;
		inter = inter / data['interval'];
		inter = Math.floor(inter);
		inter = inter % data['src_img_gif'].length;
		if( this._drill_GIF_onceType == "backRun" ){
			inter = data['src_img_gif'].length - 1 - inter;
		}
		this._drill_GIF_index = Math.floor(inter);
		
		// > 时间+1（放后面）
		this._drill_GIF_time += 1;
		
		// > 播放完毕后，锁定帧
		if( this._drill_GIF_time > this._drill_GIF_onceTarTime ){
			this._drill_GIF_oncePlay = false;
			this.drill_controller_GIF_setLocked( true );
		}
		return;
	}
	
	
	// > 锁定帧时（注意，锁定帧时 _drill_GIF_index 不刷新）
	if( this._drill_GIF_lockEnabled == true ){ return; }
	
	// > 播放GIF
	var inter = this._drill_GIF_time;
	inter = inter / data['interval'];
	inter = Math.floor(inter);
	inter = inter % data['src_img_gif'].length;
	if( data['back_run'] == true ){
		inter = data['src_img_gif'].length - 1 - inter;
	}
	this._drill_GIF_index = Math.floor(inter);
	
	// > 时间+1（放后面）
	this._drill_GIF_time += 1;
}

//==============================
// * P预加载GIF管理 - 初始化子功能
//==============================
Drill_TGi_Controller.prototype.drill_controller_initPreload = function(){
	//	（无）
}

//==============================
// * Q随机位置 - 初始化子功能
//
//			说明：	> 此功能对 B变换特性 和 O播放GIF 进行组合控制。
//==============================
Drill_TGi_Controller.prototype.drill_controller_initRandomPos = function(){
	var data = this.drill_data();
	
	// > 随机位置
	this._drill_randomPos_x = 0;			//随机位置 - 位置X
	this._drill_randomPos_y = 0;			//随机位置 - 位置Y
	this._drill_randomPos_lastInter = 0;	//随机位置 - 上一次时间
	if( data['randomPos_enable'] == true ){
		this._drill_randomPos_x = Math.floor( data['randomPos_width'] *( Math.random()-0.5 ));	//『随机因子-图像用』
		this._drill_randomPos_y = Math.floor( data['randomPos_height']*( Math.random()-0.5 ));	//『随机因子-图像用』
	}
	if( data['randomPos_gifFrame'] == true ){
		this._drill_GIF_time = Math.floor( data['interval']*data['src_img_gif'].length * Math.random() );	//『随机因子-图像用』
	}
}
//==============================
// * Q随机位置 - 帧刷新
//==============================
Drill_TGi_Controller.prototype.drill_controller_updateRandomPos = function(){
	var data = this.drill_data();
	
	// > 每次播放结束后变化
	if( data['randomPos_enable'] == true ){
		var inter = Math.floor(this._drill_GIF_time / data['interval'] / data['src_img_gif'].length);
		if( this._drill_randomPos_lastInter != inter ){
			this._drill_randomPos_lastInter = inter;
			this._drill_randomPos_x = Math.floor( data['randomPos_width'] *( Math.random()-0.5 ));	//『随机因子-图像用』
			this._drill_randomPos_y = Math.floor( data['randomPos_height']*( Math.random()-0.5 ));	//『随机因子-图像用』
		}
	}
}



//=============================================================================
// ** 标题GIF贴图【Drill_TGi_Sprite】
// **
// **		作用域：	标题界面
// **		主功能：	定义一个GIF贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					
// **					->A贴图主体
// **					->B变换特性
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **					->D指令叠加变化-控制器用
// **					->E延迟指令
// **					->F周期指令
// **					->G自变化效果
// **					
// **					->O播放GIF
// **					->P预加载GIF管理
// **					->Q随机位置
// **					
// **		说明：	> 你必须在创建贴图后，手动初始化。（还需要先设置 控制器 ）
// **
// **		代码：	> 范围 - 该类显示单独的贴图。
// **				> 结构 - [合并/ ●分离 /混乱] 使用 控制器-贴图 结构。
// **				> 数量 - [单个/ ●多个] 
// **				> 创建 - [ ●一次性 /自延迟/外部延迟] 先创建控制器，再创建此贴图，通过 C对象绑定 进行连接。
// **				> 销毁 - [不考虑/自销毁/ ●外部销毁 ] 通过 控制器与贴图 模块来销毁。
// **				> 样式 - [ ●不可修改 /自变化/外部变化] 
//=============================================================================
//==============================
// * GIF贴图 - 定义
//==============================
function Drill_TGi_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_TGi_Sprite.prototype = Object.create(Sprite.prototype);
Drill_TGi_Sprite.prototype.constructor = Drill_TGi_Sprite;
//==============================
// * GIF贴图 - 初始化
//==============================
Drill_TGi_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * GIF贴图 - 帧刷新
//==============================
Drill_TGi_Sprite.prototype.update = function(){
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A贴图主体
	this.drill_sprite_updateChange();				//帧刷新 - B变换特性
													//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateCommandChange();		//帧刷新 - D指令叠加变化-控制器用
													//帧刷新 - E延迟指令（无）
													//帧刷新 - F周期指令（无）
	this.drill_sprite_updateEffect();				//帧刷新 - G自变化效果
	
	this.drill_sprite_updateGIF();					//帧刷新 - O播放GIF
	this.drill_sprite_updatePreload();				//帧刷新 - P预加载GIF管理
													//帧刷新 - Q随机位置（无）
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_TGi_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
	this._drill_curSerial = controller._drill_controllerSerial;
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_TGi_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A贴图主体
	this.drill_sprite_initChange();				//初始化子功能 - B变换特性
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initCommandChange();		//初始化子功能 - D指令叠加变化-控制器用
	this.drill_sprite_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_sprite_initPeriodizeCommand();	//初始化子功能 - F周期指令
	this.drill_sprite_initEffect();				//初始化子功能 - G自变化效果
	
	this.drill_sprite_initGIF();				//初始化子功能 - O播放GIF
	this.drill_sprite_initPreload();			//初始化子功能 - P预加载GIF管理
	this.drill_sprite_initRandomPos();			//初始化子功能 - Q随机位置
};

//##############################
// * GIF贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_TGi_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * GIF贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_TGi_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
	return true;
};
//##############################
// * GIF贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_TGi_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * GIF贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_TGi_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * GIF贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * GIF贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A贴图主体
	this.visible = false;
	this._drill_layerSprite.removeChild( this._drill_childGIFSprite );
	this.removeChild( this._drill_layerSprite );
	this._drill_childGIFSprite = null;
	this._drill_layerSprite = null;
	
	// > 销毁 - B变换特性
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
	// > 销毁 - O播放GIF
	//	（无）
	
	// > 销毁 - P预加载GIF管理
	//	（无）
	
	// > 销毁 - Q随机位置
	//	（无）
};
//==============================
// * GIF贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A贴图主体 - 初始化子功能
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller.drill_data();
	/*
		贴图的层级如下：
			- 主体贴图（this）
			- - 层贴图（_drill_layerSprite）
			- - - 圈贴图（_drill_childGIFSprite）
		
		其中，圈贴图专门用于旋转（所以缩放必须为1.0），层贴图可以带遮罩，
		主体贴图和层贴图的缩放旋转效果一样，可以看情况自定义，不需要刻意区分。
	*/
	
	// > 主体贴图
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.visible = this._drill_controller._drill_visible;		//贴图 - 显示/隐藏
																//贴图 - 暂停/继续（无）
	this.blendMode = this._drill_controller._drill_blendMode;	//贴图 - 混合模式
	this.layerIndex = this._drill_controller._drill_layerIndex;	//贴图 - 层级
	this.zIndex = this._drill_controller._drill_zIndex;			//贴图 - 堆叠级
	
	// > 圈贴图
	var temp_sprite = new Sprite(); 
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.blendMode = this._drill_controller._drill_blendMode;
	temp_sprite.bitmap = this.drill_sprite_getGIFBitmapByIndex( 0 );	//（第1帧GIF）
	this._drill_childGIFSprite = temp_sprite;
	
	// > 层贴图
	var temp_layer = new Sprite();		//GIF样式两层容器
	temp_layer.anchor.x = 0.5;
	temp_layer.anchor.y = 0.5;
	temp_layer.blendMode = this._drill_controller._drill_blendMode;
	this._drill_layerSprite = temp_layer;
	
	this._drill_layerSprite.addChild( this._drill_childGIFSprite );
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A贴图主体 - 帧刷新
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_updateAttr = function(){
	
	// > 基础特性 - 显示/隐藏
	this.visible = this._drill_controller._drill_visible;
	
	// > 基础特性 - 暂停/继续
	//	（无）
	
	// > 基础特性 - 混合模式
	if( this.blendMode != this._drill_controller._drill_blendMode ){
		this.blendMode =  this._drill_controller._drill_blendMode;
		this._drill_layerSprite.blendMode = this._drill_controller._drill_blendMode;
		this._drill_childGIFSprite.blendMode = this._drill_controller._drill_blendMode;
	}
	
	//（其它 基础特性 的帧刷新赋值见：drill_TGi_updateAttr）
}


//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_initChange = function(){
	//（无）
}
//==============================
// * B变换特性 - 帧刷新
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_updateChange = function(){
	
	// > 贴图 - 锚点（圈贴图）
	//		（锚点只能放 圈贴图 才能有效）
	this._drill_childGIFSprite.anchor.x = this._drill_controller._drill_change_anchor_x;
	this._drill_childGIFSprite.anchor.y = this._drill_controller._drill_change_anchor_y;
	
	
	// > 贴图 - 位置
	var xx = this._drill_controller.drill_controller_finalTransform_x();
	var yy = this._drill_controller.drill_controller_finalTransform_y();
	this.x = xx;
	this.y = yy;
	
	
	// > 贴图 - 缩放
	this._drill_layerSprite.scale.x  = this._drill_controller.drill_controller_finalTransform_scaleX();
	this._drill_layerSprite.scale.y  = this._drill_controller.drill_controller_finalTransform_scaleY();
	
	// > 贴图 - 缩放（圈贴图）
	//	（无）
	
	
	// > 贴图 - 透明度
	this.opacity = this._drill_controller.drill_controller_finalTransform_opacity();
	
	
	// > 贴图 - 斜切
	this._drill_layerSprite.skew.x   = this._drill_controller.drill_controller_finalTransform_skewX();
	this._drill_layerSprite.skew.y   = this._drill_controller.drill_controller_finalTransform_skewY();
	
	// > 贴图 - 斜切（圈贴图）
	//	（无）
	
	
	// > 贴图 - 旋转
	this.rotation = this._drill_controller.drill_controller_finalTransform_rotate() *Math.PI/180;
	
	// > 贴图 - 旋转（圈贴图）
	this._drill_childGIFSprite.rotation = this._drill_controller._drill_childGIF_rotation *Math.PI/180;
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * D指令叠加变化-控制器用 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 贴图部分。
//					> 之所以把代码放这里，是因为 控制器-贴图 一对一，且可以节约弹道计算的存储空间。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_initCommandChange = function(){
	
	// > 贴图参数 - 移动到
	this["_drill_command_move_spriteData"] = undefined;
	
	// > 贴图参数 - 透明度
	this["_drill_command_opacity_spriteData"] = undefined;
	
	// > 贴图参数 - 旋转
	this["_drill_command_rotate_spriteData"] = undefined;
	// > 贴图参数 - 转速
	this["_drill_command_rotateSpeed_spriteData"] = undefined;
	
	// > 贴图参数 - 缩放X
	this["_drill_command_scaleX_spriteData"] = undefined;
	// > 贴图参数 - 缩放Y
	this["_drill_command_scaleY_spriteData"] = undefined;
	
	// > 贴图参数 - 斜切X
	this["_drill_command_skewX_spriteData"] = undefined;
	// > 贴图参数 - 斜切Y
	this["_drill_command_skewY_spriteData"] = undefined;
}
//==============================
// * D指令叠加变化-控制器用 - 帧刷新
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_updateCommandChange = function(){
	var data = this._drill_controller.drill_data();
	var controller = this._drill_controller;
	
	// > 移动到 - 帧刷新
	var CDataName = "_drill_command_move_data";
	var SDataName = "_drill_command_move_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动到 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_x = controller[CDataName]['cur_valueA'];
		controller._drill_change_y = controller[CDataName]['cur_valueB'];
	}else{
		controller._drill_change_x = data['x'];	//（没有数据时，赋值为 初始值）
		controller._drill_change_y = data['y'];
	}
	
	
	// > 透明度 - 帧刷新
	var CDataName = "_drill_command_opacity_data";
	var SDataName = "_drill_command_opacity_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 透明度 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_opacity = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_opacity = data['opacity'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 旋转 - 帧刷新
	var CDataName = "_drill_command_rotate_data";
	var SDataName = "_drill_command_rotate_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 旋转 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_rotate = controller[CDataName]['cur_value'];	//（整体再旋转角度）
	}else{
		controller._drill_change_rotate = data['parentRotate'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 转速 - 帧刷新
	var CDataName = "_drill_command_rotateSpeed_data";
	var SDataName = "_drill_command_rotateSpeed_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 转速 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_childGIF_rotateSpeed = controller[CDataName]['cur_value'];
	}else{
		controller._drill_childGIF_rotateSpeed = data['rotate'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 缩放X - 帧刷新
	var CDataName = "_drill_command_scaleX_data";
	var SDataName = "_drill_command_scaleX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_scaleX = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_scaleX = data['scale_x'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 缩放Y - 帧刷新
	var CDataName = "_drill_command_scaleY_data";
	var SDataName = "_drill_command_scaleY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_scaleY = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_scaleY = data['scale_y'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 斜切X - 帧刷新
	var CDataName = "_drill_command_skewX_data";
	var SDataName = "_drill_command_skewX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 斜切X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_skewX = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_skewX = data['skew_x'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 斜切Y - 帧刷新
	var CDataName = "_drill_command_skewY_data";
	var SDataName = "_drill_command_skewY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 斜切Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_skewY = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_skewY = data['skew_y'];	//（没有数据时，赋值为 初始值）
	}
}


//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_initDelayingCommand = function(){
	//（无）
}

//==============================
// * F周期指令 - 初始化子功能
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_initPeriodizeCommand = function(){
	//（无）
}


//==============================
// * G自变化效果 - 初始化子功能
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_initEffect = function(){
	//（无）
}
//==============================
// * G自变化效果 - 帧刷新
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_updateEffect = function(){
	var data = this._drill_controller.drill_data();
	var cur_time = this._drill_controller._drill_curEffectTime;
	
	// > 浮动效果
	if( data['effect_float'] == "左右浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x += value;
	}
	if( data['effect_float'] == "上下浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.y += value;
	}
	if( data['effect_float'] == "左上右下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x += value;
		this.y += value;
	}
	if( data['effect_float'] == "右上左下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.x -= value;
		this.y += value;
	}
	// > 闪烁效果
	if( data['effect_flicker'] == "开启" ){
		var speed = data['effect_flickerSpeed'];
		var range = data['effect_flickerRange'];
		this.opacity += range * Math.sin( cur_time * speed /180*Math.PI );
	}
	// > 摇晃效果
	if( data['effect_swing'] == "开启" ){
		var speed = data['effect_swingSpeed'];
		var range = data['effect_swingRange'];
		var value = range / 180 * Math.PI * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_childGIFSprite.rotation += value;
	}
	// > 缩放效果
	if( data['effect_zoom'] == "左右缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.x += value;
	}
	if( data['effect_zoom'] == "上下缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.y += value;
	}
	if( data['effect_zoom'] == "整体缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.scale.x += value;
		this._drill_layerSprite.scale.y += value;
	}
}


//==============================
// * O播放GIF - 初始化子功能
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_initGIF = function(){
	//	（无）
}
//==============================
// * O播放GIF - 帧刷新
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_updateGIF = function(){
	if( this.visible != true ){ return; }	//（显示时才帧刷新）
	
	// > 圈贴图 - 第N帧GIF
	this._drill_childGIFSprite.bitmap = this.drill_sprite_getGIFBitmapByIndex( this._drill_controller._drill_GIF_index );
}
//==============================
// * O播放GIF - 获取资源bitmap
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_getGIFBitmapByIndex = function( index ){
	
	// > 缓存容器 - 创建
	//		（不管有没有预加载，loadBitmap后，都要有一个容器接住，不然bitmap会被清理，导致闪）
	if( this._drill_GIF_bitmapTank == undefined ){
		this._drill_GIF_bitmapTank = [];
	}
	// > 缓存容器 - 返回缓存的资源
	if( this._drill_GIF_bitmapTank[ index ] != undefined ){
		return this._drill_GIF_bitmapTank[ index ];
	}
	
	// > 载入资源
	var data = this._drill_controller.drill_data();
	var bitmap_filename = data['src_img_gif'][ index ];
	if( bitmap_filename == undefined ){ bitmap_filename = ""; }
	var bitmap = ImageManager.loadBitmap( data['src_img_file'], bitmap_filename, data['tint'], data['smooth'] );
	
	// > 缓存容器 - 记录资源
	this._drill_GIF_bitmapTank[ index ] = bitmap;
	
	return bitmap;
}

//==============================
// * P预加载GIF管理 - 初始化子功能
//
//			说明：	> 该功能在贴图内，已经不是预加载，而是边播放边加载。
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_initPreload = function(){
	this._drill_load_curTime = 0;			//当前加载时间
}
//==============================
// * P预加载GIF管理 - 帧刷新
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_updatePreload = function(){
	if( this.visible != true ){ return; }	//（显示时才帧刷新）
	var data = this._drill_controller.drill_data();
	
	// > 时间+1
	this._drill_load_curTime += 1;
	
	// > 加载控制
	if( data['preloadType'] == "固定预加载数量" ){
		var index = this._drill_load_curTime + data['preloadNum'] -1 ;
		if( index < data['src_img_gif'].length ){
			this.drill_sprite_getGIFBitmapByIndex( index );	//（只要在适当的时机去激活 获取资源bitmap 即可）
			//alert( index );
		}
	}
	
	
	// > 测试 - 加载情况1
	//		（第1帧时间，加载开始时，预加载的已经有了，接下来每帧加载剩下的，这时true的数量为 固定预加载的数量 ）
	//if( this._drill_load_curTime == 1 ){
	//	var isReady_tank = this.drill_sprite_getReadyTank_ForDebug();
	//	var isReady_text = "第1帧：" + String( isReady_tank.length ) + "\n" + isReady_tank.join(",");
	//	alert( isReady_text );
	//}
	
	// > 测试 - 加载情况2
	//		（第6帧时间，已经开始加载6个，会比 情况1 多0~6个true）
	//		（注意，alert弹出时也在加载，两种情况要分别注释来测试）
	//if( this._drill_load_curTime == 6 ){
	//	var isReady_tank = this.drill_sprite_getReadyTank_ForDebug();
	//	var isReady_text = "第6帧：" + String( isReady_tank.length ) + "\n" + isReady_tank.join(",");
	//	alert( isReady_text );
	//}
}
//==============================
// * P预加载GIF管理 - 获取加载情况列表（私有）
//
//			说明：	> 该函数用于 测试 加载情况。
//					> 注意，该函数执行一次后，所有资源就开始加载了。
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_getReadyTank_ForDebug = function(){
	var data = this._drill_controller.drill_data();
	var isReady_tank = [];
	for( var i = 0; i < data['src_img_gif'].length; i++ ){
		var bitmap = this.drill_sprite_getGIFBitmapByIndex(i);
		isReady_tank.push( bitmap.isReady() );
	}
	return isReady_tank;
}


//==============================
// * Q随机位置 - 初始化子功能
//==============================
Drill_TGi_Sprite.prototype.drill_sprite_initRandomPos = function(){
	//	（无）
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_TitleGif = false;
		Imported.Drill_TitleGIF = false;
		var pluginTip = DrillUp.drill_TGi_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


