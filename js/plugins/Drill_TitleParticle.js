//=============================================================================
// Drill_TitleParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        标题 - 多层标题粒子
 * @author Drill_up
 * 
 * @Drill_LE_param "粒子-%d"
 * @Drill_LE_parentKey "---粒子组%d至%d---"
 * @Drill_LE_var "DrillUp.g_TPa_list_length"
 *
 * @help
 * =============================================================================
 * +++ Drill_TitleParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题界面中放置一种或者多种粒子。
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
 * 设计：
 *   (1.你可以在同一个菜单里面加入非常多的粒子。
 *      结合 粒子移动/GIF遮罩 制作出不同的动态效果。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles1
 * 先确保项目img文件夹下是否有titles1文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-默认粒子
 *
 * 背景1 资源-粒子
 * 背景2 资源-粒子
 * 背景3 资源-粒子
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制标题粒子的显示情况：
 * 
 * 插件指令：>标题粒子 : 粒子[3] : 显示
 * 插件指令：>标题粒子 : 粒子[4] : 隐藏
 * 插件指令：>标题粒子 : 隐藏全部
 * 
 * 1.如果你想制作同一个菜单，有不同的风格，可以先配置两种不同风格的
 *   粒子，然后使用显示/隐藏粒子指令来进行风格切换。
 * 2.注意，插件指令做出的改变是全局的。
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
 * 测试方法：   打开主菜单界面，进行性能测试。
 * 测试结果：   主菜单中，粒子的消耗为：【12.74ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.由于一次性设定数十个粒子移动，每个粒子都是独立的贴图。消耗是有的，
 *   但实际并不会太多。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得你可以通过插件指令控制标题粒子的显示。
 * [v1.2]
 * 规范了插件指令设置。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 优化了内部结构，修改了插件指令格式。
 * 添加了粒子遮罩功能。
 * [v1.5]
 * 优化了内部结构。
 * 旋转速度单位改为 角度/帧。
 *
 *
 *
 * @param ---粒子组 1至20---
 * @default
 *
 * @param 粒子-1
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-2
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-3
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-4
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-5
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-6
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-7
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-8
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-9
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-10
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-11
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-12
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-13
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-14
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-15
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-16
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-17
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-18
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-19
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-20
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组21至40---
 * @default
 *
 * @param 粒子-21
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-22
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-23
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-24
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-25
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-26
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-27
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-28
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-29
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-30
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-31
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-32
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-33
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-34
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-35
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-36
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-37
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-38
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-39
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-40
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组41至60---
 * @default
 *
 * @param 粒子-41
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-42
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-43
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-44
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-45
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-46
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-47
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-48
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-49
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-50
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-51
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-52
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-53
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-54
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-55
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-56
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-57
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-58
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-59
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-60
 * @parent ---粒子组41至60---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组61至80---
 * @default
 *
 * @param 粒子-61
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-62
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-63
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-64
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-65
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-66
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-67
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-68
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-69
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-70
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-71
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-72
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-73
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-74
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-75
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-76
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-77
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-78
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-79
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-80
 * @parent ---粒子组61至80---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 */
/*~struct~TitleParticle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的标题粒子==
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-粒子
 * @desc 粒子的图片资源。
 * @default 粒子-默认粒子
 * @require 1
 * @dir img/titles1/
 * @type file
 * 
 * @param 资源-粒子遮罩
 * @desc 粒子遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 平移-粒子 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-粒子 Y
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
 * @param 粒子数量
 * @type number
 * @min 1
 * @desc 菜单的粒子数量。
 * @default 10
 *
 * @param 粒子X速度
 * @desc 粒子按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 粒子Y速度
 * @desc 粒子按y轴方向循环移动的速度。正数向下，负数向上。（可为小数）
 * @default 0
 *
 * @param 粒子旋转速度
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周)
 * @default 1.5
 *
 * @param 菜单层级
 * @type select
 * @option 菜单后面层
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 粒子所属的菜单层级。
 * @default 0
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 粒子在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 8
 * 
 *
 */

 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		TPa（Title_Particle）
//		临时全局变量	DrillUp.g_TPa_xxx
//		临时局部变量	this._drill_TPa_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_TPa_visible
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n^2)*o(贴图处理)
//		性能测试因素	主菜单界面
//		性能测试消耗	6.43ms 11.77ms 12.74ms
//		最坏情况		无
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			标题粒子：
//				->菜单层级
//				->显示/隐藏
//				->粒子遮罩
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
　　Imported.Drill_TitleParticle = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleParticle');
	
	//==============================
	// * 变量获取 - 粒子
	//				（~struct~TitleParticle）
	//==============================
	DrillUp.drill_TPa_particleInit = function( dataFrom ) {
		var data = {};
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-粒子"] || "");
		data['src_img_mask'] = String( dataFrom["资源-粒子遮罩"] || "");
		data['x'] = Number( dataFrom["平移-粒子 X"] || 0);
		data['y'] = Number( dataFrom["平移-粒子 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['menu_index'] = Number( dataFrom["菜单层级"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		data['count'] = Number( dataFrom["粒子数量"] || 0);
		data['x_speed'] = Number( dataFrom["粒子X速度"] || 0.0);
		data['y_speed'] = Number( dataFrom["粒子Y速度"] || 0.0);
		data['rotation'] = Number( dataFrom["粒子旋转速度"] || 0.0);
		return data;
	}
	
	/*-----------------粒子------------------*/
	DrillUp.g_TPa_list_length = 80;
	DrillUp.g_TPa_list = [];
	for (var i = 0; i < DrillUp.g_TPa_list_length; i++) {
		if( DrillUp.parameters["粒子-" + String(i+1) ] != undefined &&
			DrillUp.parameters["粒子-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["粒子-" + String(i+1) ]);
			DrillUp.g_TPa_list[i] = DrillUp.drill_TPa_particleInit( temp );
			DrillUp.g_TPa_list[i]['id'] = Number(i)+1;
			DrillUp.g_TPa_list[i]['inited'] = true;
		}else{
			DrillUp.g_TPa_list[i] = DrillUp.drill_TPa_particleInit( {} );
			DrillUp.g_TPa_list[i]['id'] = Number(i)+1;
			DrillUp.g_TPa_list[i]['inited'] = false;
		}
	}
	
	
//=============================================================================
// ** 全局
//=============================================================================
//==============================
// * 全局 - 读取
//==============================
	var _drill_global = DataManager.loadGlobalInfo();
	if( !DrillUp.global_TPa_visible ){	//游戏没关情况
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_TPa_visible"] ){		//游戏关闭后，重开读取global中的配置
			DrillUp.global_TPa_visible = _drill_global[0]["_global_TPa_visible"];
		}else{
			DrillUp.global_TPa_visible = [];
			for (var i = 0; i < DrillUp.g_TPa_list.length; i++) {
				var temp_data = DrillUp.g_TPa_list[i];
				if( temp_data == undefined ){ continue; }
				if( temp_data['inited'] != true ){ continue; }
					
				DrillUp.global_TPa_visible[i] = temp_data['visible'];
			}
		}
	}
//==============================
// * 全局 - 存储
//==============================
var _drill_TPa_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function(info) {	//第0个存档为全局存档
	if(!info[0]){info[0] = []};
	info[0]["_global_TPa_visible"] = DrillUp.global_TPa_visible;
	_drill_TPa_saveGlobal.call(this,info);
};
DataManager.forceSaveGlobalInfo = function() {		//强制存储（任何改变的全局变量的地方都需要调用该方法）
	var globalInfo = this.loadGlobalInfo() || [];
	globalInfo[0] = this.makeSavefileInfo();
	this.saveGlobalInfo(globalInfo);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_TPa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_TPa_pluginCommand.call(this, command, args);
	if (command === ">标题粒子") {
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var b_id = -1;
			if( temp1 == "默认粒子" ){
				b_id = 0;
			}else{
				temp1 = temp1.replace("粒子[","");
				temp1 = temp1.replace("]","");
				b_id = Number(temp1) - 1;
			}
			
			if( b_id >= 0 && type === "显示" ){
				DrillUp.global_TPa_visible[b_id] = true;
				DataManager.forceSaveGlobalInfo();
			}
			if( b_id >= 0 && type === "隐藏" ){
				DrillUp.global_TPa_visible[b_id] = false;
				DataManager.forceSaveGlobalInfo();
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if( type === "隐藏全部" ){
				for(var i=0; i<DrillUp.global_TPa_visible.length; i++){
					DrillUp.global_TPa_visible[i] = false;
				}
				DataManager.forceSaveGlobalInfo();
			}
		}
	}
};

//=============================================================================
// ** 存储数据初始化
//=============================================================================
var _drill_TPa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {	
	_drill_TPa_sys_initialize.call(this);
	//无
};

//=============================================================================
// ** 菜单
//=============================================================================
//==============================
// ** 菜单 - 创建粒子
//==============================
var _drill_TPa_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	// > 粒子初始化
	SceneManager._drill_TPa_created = false;	
   	this._drill_TPa_spriteTank = [];
   	this._drill_TPa_dataTank = [];
	
	_drill_TPa_createBackground.call(this);		//与背景一同创建
	
	if( !this._backgroundSprite ){			//附着在定义的标题背景后面
		this._backgroundSprite = new Sprite();
		this.addChild(this._backgroundSprite);
	}
};
//==============================
// ** 菜单 - 退出界面
//==============================
var _drill_TPa_terminate = Scene_Title.prototype.terminate;
Scene_Title.prototype.terminate = function() {
	_drill_TPa_terminate.call(this);			//设置需要下次重新创建
	SceneManager._drill_TPa_created = false;
};
//==============================
// ** 菜单 - 层级排序
//==============================
Scene_Title.prototype.drill_TPa_sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单 - 帧刷新
//==============================
var _drill_TPa_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_TPa_update.call(this);
	
	if( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_TPa_created ) {
		this.drill_TPa_create();				//创建，进入界面后只执行一次
	}
	if( SceneManager._drill_TPa_created ){
		this.drill_TPa_update();
	};
};

//=============================================================================
// ** 粒子
//=============================================================================
//==============================
// * 粒子 - 创建
//==============================
Scene_Title.prototype.drill_TPa_create = function() {	
	SceneManager._drill_TPa_created = true;
	
	if(!this._drill_TPa_spriteTank){
		this._drill_TPa_spriteTank = [];		//防止某些覆写的菜单报错
		this._drill_TPa_dataTank = [];
	}
	if( !this._backgroundSprite ){		//菜单后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	// > 配置的粒子
	for (var i = 0; i < DrillUp.g_TPa_list.length; i++) {
		var temp_data = DrillUp.g_TPa_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
		
		// > 粒子贴图
		var temp_layer = new Sprite();
		
		// > 粒子集合
		for( var j = 0; j < temp_data['count'] ; j++ ){	
			var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据（杜绝引用造成的修改）
			var temp_sprite = new Sprite(ImageManager.loadTitle1(temp_sprite_data['src_img']));
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.visible = DrillUp.global_TPa_visible[i] || false;
			temp_layer.zIndex = temp_sprite_data['zIndex'];
			this._drill_TPa_spriteTank.push(temp_sprite);
			this._drill_TPa_dataTank.push(temp_sprite_data);
			
			temp_layer.addChild(temp_sprite);
			this.drill_TPa_resetParticles(this._drill_TPa_dataTank.length-1);
		}
		
		// > 粒子遮罩
		if( temp_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite(ImageManager.loadTitle1(temp_data['src_img_mask']));
			temp_layer.addChild(temp_mask);
			temp_layer.mask = temp_mask;
		}
		if( temp_data['menu_index'] == 0 ){
			this._backgroundSprite.addChild(temp_layer);
		}else{
			this._foregroundSprite.addChild(temp_layer);
		}

	}
	this.drill_TPa_sortByZIndex();
};

//==============================
// * 粒子 - 帧刷新
//==============================
Scene_Title.prototype.drill_TPa_update = function() {
	for (var i = 0; i < this._drill_TPa_spriteTank.length; i++) {
		
		// > 位置
		this._drill_TPa_spriteTank[i].x += this._drill_TPa_dataTank[i]['x_speed_random'];
		this._drill_TPa_spriteTank[i].y += this._drill_TPa_dataTank[i]['y_speed_random'];
		
		// > 透明度
		this._drill_TPa_spriteTank[i].opacity += 3 * this._drill_TPa_dataTank[i]['opacity_dir'];
		if(this._drill_TPa_spriteTank[i].opacity >= 255){
			this._drill_TPa_dataTank[i]['opacity_dir'] = -1 * Math.random() ;
		}
		
		// > 自旋转
		this._drill_TPa_spriteTank[i].rotation += this._drill_TPa_dataTank[i]['rotation_random'] /180*Math.PI;
		
		// > 过界刷新
    	if( this.drill_TPa_needResetParticles(i) ){
			this.drill_TPa_resetParticles(i);
		};
	};
};

//==============================
// * 粒子 - 重设条件
//==============================	
Scene_Title.prototype.drill_TPa_needResetParticles = function(i) {
	var spr = this._drill_TPa_spriteTank[i];
	var data = this._drill_TPa_dataTank[i];
	
	if (spr.x < -1 * Math.abs(data['start_x_fix']) - spr.width * 3) {return true};		//过边界
	if (spr.x > Math.abs(data['start_x_fix']) + Graphics.boxWidth + spr.width * 3) {return true};
	if (spr.y < -1 * Math.abs(data['start_y_fix']) - spr.height * 3) {return true};
	if (spr.y > Math.abs(data['start_y_fix']) + Graphics.boxHeight + spr.height * 3) {return true};
	
	if(spr.opacity == 0 && data['opacity_dir'] < 0 ){return true;}	//透明度低
	
	return false;
};

//==============================
// * 粒子 - 重设
//==============================	
Scene_Title.prototype.drill_TPa_resetParticles = function(i) {
	var spr = this._drill_TPa_spriteTank[i];
	var data = this._drill_TPa_dataTank[i];
	
	data['x_speed_random'] = ((Math.random() * 2) + 0.4) * data['x_speed'] + Math.random()-0.5;		//偏随机x方向
	data['y_speed_random'] = ((Math.random() * 2) + 0.4) * data['y_speed'] + Math.random()-0.5;		//偏随机y方向
	data['rotation_random']= ((Math.random() * data['rotation']));									//偏随机旋转
	data['opacity_dir'] = 1 * Math.random();
	data['start_x_fix'] = 0;
	data['start_y_fix'] = 0;
	if (data['x_speed'] > 0) { data['start_x_fix'] = -(Graphics.boxWidth / 4)};		//起点偏移x
	if (data['x_speed'] < 0) { data['start_x_fix'] = (Graphics.boxWidth / 4)};
	if (data['y_speed'] > 0) { data['start_y_fix'] = -(Graphics.boxHeight / 4)};	//起点偏移y
	if (data['y_speed'] < 0) { data['start_y_fix'] = (Graphics.boxHeight / 4)};
	
	spr.x = data['start_x_fix'] + Math.randomInt(Graphics.boxWidth);		//变化值
	spr.y = data['start_y_fix'] + Math.randomInt(Graphics.boxHeight);
	spr.opacity = 0;
	var pz = ((Math.random() * 0.5) * 1);
	spr.scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
	
	//this._drill_TPa_spriteTank[i] = spr;			//data得到的是变量地址，不需要重新赋值
	//this._drill_TPa_dataTank[i] = data;
	
};


