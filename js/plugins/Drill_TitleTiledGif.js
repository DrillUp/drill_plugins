//=============================================================================
// Drill_TitleTiledGif.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        标题 - 多层标题平铺GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "平铺GIF-%d"
 * @Drill_LE_parentKey "---平铺GIF%d至%d---"
 * @Drill_LE_var "DrillUp.g_TTG_list_length"
 *
 * @help
 * =============================================================================
 * +++ Drill_TitleTiledGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在任意菜单界面中放置一个或者多个平铺GIF。
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   只作用于标题界面。
 * 2.要了解更详细的组合方法，
 *   去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * 全局存储：
 *   (1.该插件控制的显示/隐藏数据将存储在全局文件中。
 *      如果游戏中修改了显示/隐藏，则永久有效，不保存也有效。
 *   (2.更多详细介绍，去看看"关于全局存储.docx"。
 *   (3.留意全局存储的机制，开游戏就生效。
 *      如果你遇到了图片设置后不显示/不变化的问题，要注意清除全部存档。
 * 层级:
 *   (1.标题设置中有 菜单层级 和 图片层级。
 *      菜单层级分 菜单前面层和菜单后面层 ，对应 标题窗口元素 的前面和后面。
 *      相同 菜单层级 下，背景、魔法圈、gif都根据 图片层级 先后排序。
 * 细节：
 *   (1.由于菜单界面不能执行插件指令，
 *      所以这里的平铺GIF并不能实现转场动画效果。
 * 设计：
 *   (1.这里的平铺GIF，必须拆散成多张png图片，然后配置在资源中。
 *   (2.你可以在同一个菜单里面加入非常多的平铺GIF。
 *      结合 播放/平铺GIF遮罩 制作出不同的动态效果。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles1 
 * 先确保项目img文件夹下是否有titles1文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 平铺GIF-1 资源-平铺GIF
 * 平铺GIF-2 资源-平铺GIF
 * 平铺GIF-3 资源-平铺GIF
 * ……
 *
 * 所有素材都放在titles1文件夹下。
 * 你可以在同一个菜单里面加入非常多的不同种类的平铺GIF。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制标题平铺GIF的显示情况：
 * 
 * 插件指令：>标题平铺GIF : 平铺GIF[2] : 显示
 * 插件指令：>标题平铺GIF : 平铺GIF[2] : 隐藏
 * 插件指令：>标题平铺GIF : 隐藏全部
 * 
 * 1.数字表示平铺GIF对应配置的编号。
 * 2.平铺GIF没有默认，都是一个个贴在指定菜单中的。
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
 * 测试结果：   标题中，平铺gif的消耗为：【9.94ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.平铺gif会持续播放、位移、旋转，由于数量并不多，所以消耗也不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 *
 * @param ---平铺GIF组 1至20---
 * @default
 *
 * @param 平铺GIF-1
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-2
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-3
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-4
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-5
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-6
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-7
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-8
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-9
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-10
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-11
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-12
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-13
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-14
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-15
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-16
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-17
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-18
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-19
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-20
 * @parent ---平铺GIF组 1至20---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组21至40---
 * @default
 *
 * @param 平铺GIF-21
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-22
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-23
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-24
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-25
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-26
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-27
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-28
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-29
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-30
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-31
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-32
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-33
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-34
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-35
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-36
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-37
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-38
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-39
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-40
 * @parent ---平铺GIF组21至40---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组41至60---
 * @default
 *
 * @param 平铺GIF-41
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-42
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-43
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-44
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-45
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-46
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-47
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-48
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-49
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-50
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-51
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-52
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-53
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-54
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-55
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-56
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-57
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-58
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-59
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-60
 * @parent ---平铺GIF组41至60---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组61至80---
 * @default
 *
 * @param 平铺GIF-61
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-62
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-63
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-64
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-65
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-66
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-67
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-68
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-69
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-70
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-71
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-72
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-73
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-74
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-75
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-76
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-77
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-78
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-79
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-80
 * @parent ---平铺GIF组61至80---
 * @type struct<TitleTiledGIF>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 */
/*~struct~TitleTiledGIF:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的标题平铺GIF==
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-平铺GIF
 * @desc png图片资源组，多张构成gif。
 * @default ["平铺GIF-默认"]
 * @require 1
 * @dir img/titles1/
 * @type file[]
 * 
 * @param 资源-平铺GIF遮罩
 * @desc 平铺GIF遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 帧间隔
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 平移-平铺GIF X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-平铺GIF Y
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 背景X速度
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0.0
 *
 * @param 背景Y速度
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0.0
 *
 * @param 菜单层级
 * @type select
 * @option 菜单后面层
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 背景所属的菜单层级。
 * @default 0
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 4
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		TTG（Title_TiledGIF）
//		临时全局变量	DrillUp.g_TTG_xxx
//		临时局部变量	this._drill_TTG_xxx
//		存储数据变量	$gameSystem._drill_TTG_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理)
//		性能测试因素	标题界面
//		性能测试消耗	4.97ms（drill_TTG_update）
//		最坏情况		无
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			标题平铺GIF：
//				->菜单层级
//				->显示/隐藏
//				->平铺GIF遮罩
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.标题与菜单不同的地方：
//				全局数据在 全局-读取 中进行初始化。
//				只作用于Scene_Title。
//				this._backgroundSprite要手动建立。
//				注释和资源文件夹变化。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_TitleTiledGif = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleTiledGif');
	
	//==============================
	// * 变量获取 - 平铺GIF
	//				（~struct~TitleTiledGIF）
	//==============================
	DrillUp.drill_TTG_tiledGifInit = function( dataFrom ) {
		var data = {};
		data['visible'] = String( dataFrom["初始是否显示"] || "false") == "true";
		if( dataFrom["资源-平铺GIF"] != "" &&
			dataFrom["资源-平铺GIF"] != undefined ){
			data['src_img'] = JSON.parse( dataFrom["资源-平铺GIF"] );
		}else{
			data['src_img'] = [];
		}
		data['src_bitmaps'] = [];
		data['src_img_mask'] = String( dataFrom["资源-平铺GIF遮罩"] || "");
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		data['x'] = Number( dataFrom["平移-平铺GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-平铺GIF Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['x_speed'] = Number( dataFrom["背景X速度"] || 0);
		data['y_speed'] = Number( dataFrom["背景Y速度"] || 0);
		data['menu_index'] = Number( dataFrom["菜单层级"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		return data;
	}
	
	/*-----------------平铺GIF------------------*/
	DrillUp.g_TTG_list_length = 80;
	DrillUp.g_TTG_list = [];
	for (var i = 0; i < DrillUp.g_TTG_list_length; i++) {
		if( DrillUp.parameters["平铺GIF-" + String(i+1) ] != undefined &&
			DrillUp.parameters["平铺GIF-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['平铺GIF-' + String(i+1) ]);
			DrillUp.g_TTG_list[i] = DrillUp.drill_TTG_tiledGifInit( temp );
			DrillUp.g_TTG_list[i]['id'] = Number(i)+1;
			DrillUp.g_TTG_list[i]['inited'] = true;
		}else{
			DrillUp.g_TTG_list[i] = DrillUp.drill_TTG_tiledGifInit( {} );
			DrillUp.g_TTG_list[i]['id'] = Number(i)+1;
			DrillUp.g_TTG_list[i]['inited'] = false;
		}
	}
	
	
//=============================================================================
// ** 全局
//=============================================================================
//==============================
// * 全局 - 读取
//==============================
	var _drill_global = DataManager.loadGlobalInfo();
	if( !DrillUp.global_TTG_visible ){	//游戏没关情况
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_TTG_visible"] ){		//游戏关闭后，重开读取global中的配置
			DrillUp.global_TTG_visible = _drill_global[0]["_global_TTG_visible"];
		}else{
			DrillUp.global_TTG_visible = [];
			for (var i = 0; i < DrillUp.g_TTG_list.length; i++) {
				var temp_data = DrillUp.g_TTG_list[i];
				if( temp_data == undefined ){ continue; }
				if( temp_data['inited'] != true ){ continue; }

				DrillUp.global_TTG_visible[i] = temp_data['visible'];
			}
		}
	}
//==============================
// * 全局 - 存储
//==============================
var _drill_TTG_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function(info) {	//第0个存档为全局存档
	if(!info[0]){info[0] = []};
	info[0]["_global_TTG_visible"] = DrillUp.global_TTG_visible;
	_drill_TTG_saveGlobal.call(this,info);
};
DataManager.forceSaveGlobalInfo = function() {		//强制存储（任何改变的全局变量的地方都需要调用该方法）
	var globalInfo = this.loadGlobalInfo() || [];
	globalInfo[0] = this.makeSavefileInfo();
	this.saveGlobalInfo(globalInfo);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_TTG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_TTG_pluginCommand.call(this, command, args);
	if( command === ">标题平铺GIF" ){
		if(args.length == 4){
			var temp1 = String(args[1]);
			temp1 = temp1.replace("平铺GIF[","");
			temp1 = temp1.replace("]","");
			temp1 = Number(temp1) - 1;
			var type = String(args[3]);
			if (type === "显示") {
				DrillUp.global_TTG_visible[temp1] = true;
				DataManager.forceSaveGlobalInfo();
			}
			if (type === "隐藏") {
				DrillUp.global_TTG_visible[temp1] = false;
				DataManager.forceSaveGlobalInfo();
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type === "隐藏全部" ){
				for(var i=0; i<DrillUp.global_TTG_visible.length; i++){
					DrillUp.global_TTG_visible[i] = false;
				}
				DataManager.forceSaveGlobalInfo();
			}
		}
	}
};

//=============================================================================
// ** 存储数据初始化
//=============================================================================
var _drill_TTG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {	
	_drill_TTG_sys_initialize.call(this);
	// 无
};

//=============================================================================
// ** 菜单
//=============================================================================
//==============================
// ** 菜单 - 创建平铺GIF
//==============================
var _drill_TTG_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	// > 平铺GIF初始化
	SceneManager._drill_TTG_created = false;	
   	this._drill_TTG_spriteTank = [];
   	this._drill_TTG_dataTank = [];
	
	_drill_TTG_createBackground.call(this);		//与背景一同创建
	
	if( !this._backgroundSprite ){			//附着在定义的标题背景后面
		this._backgroundSprite = new Sprite();
		this.addChild(this._backgroundSprite);
	}
};
//==============================
// ** 菜单 - 退出界面
//==============================
var _drill_TTG_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
	_drill_TTG_terminate.call(this);			//设置需要下次重新创建
	SceneManager._drill_TTG_created = false;
};
//==============================
// ** 菜单 - 层级排序
//==============================
Scene_Title.prototype.drill_TTG_sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单 - 帧刷新
//==============================
var _drill_TTG_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TTG_update.call(this);
	
	if( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_TTG_created ) {
		this.drill_TTG_create();				//创建，进入界面后只执行一次
	}
	if( SceneManager._drill_TTG_created ){
		this.drill_TTG_update();
	}
};

//=============================================================================
// ** 平铺GIF
//=============================================================================
//==============================
// * 平铺GIF - 创建
//==============================
Scene_Title.prototype.drill_TTG_create = function() {	
	SceneManager._drill_TTG_created = true;
	
	if(!this._drill_TTG_spriteTank){
		this._drill_TTG_spriteTank = [];		//防止某些覆写的菜单报错
		this._drill_TTG_dataTank = [];
	}
	if( !this._backgroundSprite ){		//菜单后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	// > 配置的平铺GIF
	for (var i = 0; i < DrillUp.g_TTG_list.length; i++) {
		var temp_data = DrillUp.g_TTG_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
			
		// > 平铺GIF贴图
		var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));			//深拷贝数据（杜绝引用造成的修改）
		for(var j = 0; j < temp_sprite_data['src_img'].length ; j++){
			temp_sprite_data['src_bitmaps'].push(ImageManager.loadTitle1(temp_sprite_data['src_img'][j]));
		}
		var temp_sprite = new TilingSprite();
		temp_sprite.bitmap = temp_sprite_data['src_bitmaps'][0];
		temp_sprite.move(0, 0, Graphics.width, Graphics.height);
		temp_sprite.origin.x = temp_sprite_data['x'];
		temp_sprite.origin.y = temp_sprite_data['y'];
		temp_sprite.opacity = temp_sprite_data['opacity'];
		temp_sprite.blendMode = temp_sprite_data['blendMode'];
		temp_sprite.visible = DrillUp.global_TTG_visible[i] || false;
		temp_sprite['_time'] = 0;
		
		this._drill_TTG_spriteTank.push(temp_sprite);
		this._drill_TTG_dataTank.push(temp_sprite_data);
		
		// > 平铺GIF父级
		var temp_layer = new Sprite();
		temp_layer.addChild(temp_sprite);
		temp_layer.zIndex = temp_sprite_data['zIndex'];
		
		// > 平铺GIF遮罩
		if( temp_sprite_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite(ImageManager.loadTitle1(temp_sprite_data['src_img_mask']));
			temp_layer.addChild(temp_mask);
			temp_layer.mask = temp_mask;
		}
		if( temp_sprite_data['menu_index'] == 0 ){
			this._backgroundSprite.addChild(temp_layer);
		}else{
			this._foregroundSprite.addChild(temp_layer);
		}
	}
	this.drill_TTG_sortByZIndex();
};

//==============================
// * 平铺GIF - 帧刷新
//==============================
Scene_Title.prototype.drill_TTG_update = function() {
	for(var i = 0; i < this._drill_TTG_spriteTank.length; i++ ){
		var t_gif = this._drill_TTG_spriteTank[i];
		var t_gif_data = this._drill_TTG_dataTank[i];
		
		// > 播放gif
		t_gif['_time'] += 1;
		var inter = this._drill_TTG_spriteTank[i]['_time'] ;
		inter = inter / t_gif_data['interval'];
		inter = inter % t_gif_data['src_bitmaps'].length;
		if( t_gif_data['back_run'] ){
			inter = t_gif_data['src_bitmaps'].length - 1 - inter;
		}
		inter = Math.floor(inter);
		t_gif.bitmap = t_gif_data['src_bitmaps'][inter];
		
		// > 位移
		t_gif.origin.x += t_gif_data['x_speed'];
		t_gif.origin.y += t_gif_data['y_speed'];
	};
};


