//=============================================================================
// Drill_MenuBackButton.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        主菜单 - 返回按钮
 * @author Drill_up
 * 
 * @Drill_LE_param "返回按钮-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MBB_list_length"
 * 
 * @Drill_LE_param "返回按钮样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_MBB_style_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_MenuBackButton +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在任意菜单中放置返回按钮。
 * ★★必须放在 面板类、控件类 插件的前面★★
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。
 * 基于：
 *   - Drill_CoreOfWindowAuxiliary    系统-窗口辅助核心
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   固定放置在菜单前面层。
 * 2.该插件可以装饰其他菜单插件。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 * 关键字：
 *   (1.插件通过关键字识别菜单，并对指定菜单进行装饰。
 *      具体去看看 "17.主菜单 > 菜单关键字.docx"。
 *   (2.返回按钮对一些自带背景的菜单插件可能不起作用，因为有些插件
 *      自己设置了底图，会把菜单的功能覆盖掉。
 * 注意事项：
 *   (1.该插件配置有 返回按钮 和 返回按钮样式。
 *      找不到配置的时候，记得 往下翻 参数列表，因为样式配置在下面。
 * 设计：
 *   (1.返回按钮与菜单背景、粒子、gif原理一样，默认所有菜单都有返回
 *      按钮。但并不是所有菜单都可以有返回按钮。比如角色选择界面就
 *      不能有，必须隐藏。
 *   (2.由于按钮没有作限制，你可以同一个界面配置两个以上的返回按钮。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__layer_backBtn （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__layer_backBtn文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 返回按钮样式1 资源-返回按钮
 * 返回按钮样式2 资源-返回按钮
 * 返回按钮样式3 资源-返回按钮
 * ……
 *
 * 所有素材都放在Menu__layer_backBtn文件夹下。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制菜单返回按钮的显示情况：
 * 
 * 插件指令：>菜单返回按钮 : 2 : 显示
 * 插件指令：>菜单返回按钮 : 2 : 隐藏
 *
 * 1.数字表示返回按钮对应配置的编号。
 * 2.你可以在同一个界面添加多个不同样式的返回按钮。
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
 * 时间复杂度： o(n^2)*o(贴图处理) 每帧
 * 测试方法：   打开主菜单界面，进行性能测试。
 * 测试结果：   菜单界面中，返回按钮消耗为：【16.75ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.按钮实际上是一个反复播放的gif，反复播放图片就会有一些消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了鼠标高亮在浏览器中玩的错位问题。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 * [v1.3]
 * 优化了内部结构。
 * [v1.4]
 * 优化了旧存档的识别与兼容。
 *
 *
 *
 * @param 默认返回按钮
 * @type struct<BackButtonDefault>
 * @desc 指定菜单未设置时，自动默认显示的按钮。
 * @default {"初始是否显示":"true","平移-返回按钮 X":"30","平移-返回按钮 Y":"110","移动动画":"{\"移动类型\":\"弹性移动\",\"移动时长\":\"30\",\"移动延迟\":\"0\",\"---起点---\":\"\",\"坐标类型\":\"相对坐标\",\"起点-相对坐标 X\":\"-100\",\"起点-相对坐标 Y\":\"0\",\"起点-绝对坐标 X\":\"0\",\"起点-绝对坐标 Y\":\"0\"}","返回按钮的样式":"1"}
 * 
 * @param ----菜单返回按钮----
 * @default 
 *
 * @param 返回按钮-1
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-2
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-3
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-4
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-5
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-6
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-7
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-8
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-9
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-10
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-11
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-12
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-13
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-14
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-15
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-16
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-17
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-18
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-19
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-20
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-21
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-22
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-23
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-24
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-25
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-26
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-27
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-28
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-29
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-30
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-31
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-32
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-33
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-34
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-35
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-36
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-37
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-38
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-39
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 * @param 返回按钮-40
 * @parent ----菜单返回按钮----
 * @type struct<BackButton>
 * @desc 给指定菜单设置返回按钮，会去掉该菜单的默认按钮。
 * @default 
 *
 *
 * @param ----菜单返回按钮样式----
 * @default 
 *
 * @param 返回按钮样式-1
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default {"标记":"==按钮样式1==","资源-返回按钮":"[\"返回按钮-默认动态按钮00\",\"返回按钮-默认动态按钮01\",\"返回按钮-默认动态按钮02\",\"返回按钮-默认动态按钮03\",\"返回按钮-默认动态按钮04\",\"返回按钮-默认动态按钮05\",\"返回按钮-默认动态按钮06\",\"返回按钮-默认动态按钮07\",\"返回按钮-默认动态按钮08\",\"返回按钮-默认动态按钮09\",\"返回按钮-默认动态按钮10\",\"返回按钮-默认动态按钮11\",\"返回按钮-默认动态按钮12\"]","帧间隔":"4","是否倒放":"false","透明度":"255","混合模式":"0","图片层级":"20","高亮效果":"图片叠加","资源-高亮图片":"返回按钮-高亮图片","按下效果":"图片切换","资源-按下图片":"返回按钮-按下图片"}
 *
 * @param 返回按钮样式-2
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-3
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-4
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-5
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-6
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-7
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-8
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-9
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-10
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-11
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-12
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-13
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-14
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-15
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-16
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-17
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-18
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-19
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-20
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-21
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-22
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-23
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-24
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-25
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-26
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-27
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-28
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-29
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-30
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-31
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-32
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-33
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-34
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-35
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-36
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-37
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-38
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-39
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * @param 返回按钮样式-40
 * @parent ----菜单返回按钮样式----
 * @type struct<BackButtonStyle>
 * @desc 返回按钮的样式设置。
 * @default 
 *
 * 
 */
/*~struct~BackButton:
 * 
 * @param 标记
 * @desc 用于区分你设置的颜色的说明注释，脚本中不起作用。
 * @default ==新的返回按钮==
 * 
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 所属菜单
 * @type select
 * @option 主菜单(Scene_Menu)
 * @value 主菜单
 * @option 道具(Scene_Item)
 * @value 道具
 * @option 技能(Scene_Skill)
 * @value 技能
 * @option 装备(Scene_Equip)
 * @value 装备
 * @option 状态(Scene_Status)
 * @value 状态
 * @option 选项(Scene_Options)
 * @value 选项
 * @option 载入(Scene_Load)
 * @value 载入
 * @option 保存(Scene_Save)
 * @value 保存
 * @option 游戏结束(Scene_GameEnd)
 * @value 游戏结束
 * @option 商店(Scene_Shop)
 * @value 商店
 * @option 输入名称(Scene_Name)
 * @value 输入名称
 * @option 测试查值(Scene_Debug)
 * @value 测试查值
 * @option 自定义(Scene_……)
 * @value 自定义
 * @desc 填入所属的标准菜单。如果为插件的特殊关键字，那么要填写自定义关键字。具体去看看 "17.主菜单 > 菜单关键字.docx"。
 * @default 主菜单
 * 
 * @param 自定义关键字
 * @parent 所属菜单
 * @desc 设置所属菜单为自定义时，将根据此关键字找到对应的菜单。具体去看看 "17.主菜单 > 菜单关键字.docx"。
 * @default 
 *
 * @param 平移-返回按钮 X
 * @desc x轴方向平移，单位像素。0为按钮中心贴在最左边。
 * @default 0
 *
 * @param 平移-返回按钮 Y
 * @desc y轴方向平移，单位像素。0为按钮中心贴在最上面。
 * @default 0
 * 
 * @param 移动动画
 * @type struct<DrillWindowMoving>
 * @desc 按钮会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"100","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 *
 * @param 返回按钮的样式
 * @type number
 * @min 1
 * @desc 返回按钮的样式，对应配置的样式序号。
 * @default 1
 *
 */
/*~struct~BackButtonDefault:
 * 
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 平移-返回按钮 X
 * @desc x轴方向平移，单位像素。0为按钮中心贴在最左边。
 * @default 0
 * 
 * @param 平移-返回按钮 Y
 * @desc y轴方向平移，单位像素。0为按钮中心贴在最上面。
 * @default 0
 * 
 * @param 移动动画
 * @type struct<DrillWindowMoving>
 * @desc 按钮会从某个点跑回自己的原位置。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"100","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 *
 * @param 返回按钮的样式
 * @type number
 * @min 1
 * @desc 返回按钮的样式，对应配置的样式序号。
 * @default 1
 *
 */
/*~struct~DrillWindowMoving:
 *
 * @param 移动类型
 * @type select
 * @option 不移动
 * @value 不移动
 * @option 匀速移动
 * @value 匀速移动
 * @option 增减速移动
 * @value 增减速移动
 * @option 弹性移动
 * @value 弹性移动
 * @desc 移动类型基于 弹道核心-两点式 移动。更多内容可以去看看 "1.系统 > 关于弹道.docx"。
 * @default 匀速移动
 *
 * @param 移动时长
 * @type number
 * @min 1
 * @desc 起点位置回到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 移动延迟
 * @type number
 * @min 0
 * @desc 开始移动前的等待时间，单位帧。（1秒60帧）
 * @default 0
 *
 * @param ---起点---
 * @default 
 *
 * @param 坐标类型
 * @parent ---起点---
 * @type select
 * @option 相对坐标
 * @value 相对坐标
 * @option 绝对坐标
 * @value 绝对坐标
 * @desc 起点的坐标类型。
 * @default 相对坐标
 *
 * @param 起点-相对坐标 X
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向右，正数向左，单位像素。
 * @default -100
 * 
 * @param 起点-相对坐标 Y
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向上，正数向下，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 X
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最左边，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 Y
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最上面，单位像素。
 * @default 0
 * 
 */
/*~struct~BackButtonStyle:
 * 
 * @param 标记
 * @desc 用于区分你设置的颜色的说明注释，脚本中不起作用。
 * @default ==新的按钮样式==
 * 
 * @param ---贴图---
 * @default 
 * 
 * @param 资源-返回按钮
 * @parent ---贴图---
 * @desc 返回按钮的png图片资源组，多张构成gif。
 * @default ["(需配置)菜单返回按钮"]
 * @require 1
 * @dir img/Menu__layer_backBtn/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc 返回按钮每帧播放间隔时间，单位帧。（1秒60帧）
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
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 20
 * 
 * @param ---效果---
 * @default 
 * 
 * @param 高亮效果
 * @parent ---效果---
 * @type select
 * @option 关闭高亮效果
 * @value 关闭高亮效果
 * @option 图片切换
 * @value 图片切换
 * @option 图片叠加
 * @value 图片叠加
 * @desc 鼠标靠近时，"图片切换"将换成高亮图片。"图片叠加"将直接在按钮上叠加高亮图片。
 * @default 关闭高亮效果
 *
 * @param 资源-高亮图片
 * @parent ---效果---
 * @parent 高亮效果
 * @desc 返回按钮高亮的图片资源。
 * @default (需配置)菜单返回按钮-高亮图片
 * @require 1
 * @dir img/Menu__layer_backBtn/
 * @type file
 * 
 * @param 按下效果
 * @parent ---效果---
 * @type select
 * @option 关闭按下效果
 * @value 关闭按下效果
 * @option 图片切换
 * @value 图片切换
 * @option 图片叠加
 * @value 图片叠加
 * @desc 鼠标靠近时，"图片切换"将换成按下图片。"图片叠加"将直接在按钮上叠加按下图片。
 * @default 图片叠加
 *
 * @param 资源-按下图片
 * @parent ---效果---
 * @parent 按下效果
 * @desc 返回按钮按下的图片资源。
 * @default (需配置)菜单返回按钮-按下图片
 * @require 1
 * @dir img/Menu__layer_backBtn/
 * @type file
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MBB（Menu_Back_Button）
//		临时全局变量	DrillUp.g_MBB_xxx
//		临时局部变量	this._drill_MBB_xxx
//		存储数据变量	$gameSystem._drill_MBB_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理)
//		★性能测试因素	主菜单界面
//		★性能测试消耗	6.07ms 16.75ms
//		★最坏情况		无
//		★备注			gif切换消耗的性能比较持平
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			菜单粒子：
//				->菜单层级
//				->显示/隐藏
//				->粒子遮罩
//				->样式结构分离
//
//		★必要注意事项：
//			1.原来的插件结构有些绕，这里（v1.3）修改了结构，修改成了树状结构。
//			  sprite分成了3个叶子和一个树根。另外，对齐下标时注意，默认值可能会影响i的索引。
//
//		★其它说明细节：
//			1.代码原理实际上就是菜单gif的改进。
//			（只不过，要考虑的东西更多……并且更多细节了）
//			2.这个插件一样，必须放在所有菜单插件前面。放后面会出现半覆写的奇怪bug。
//			3.鼠标和触屏需要考虑html的基本情况：靠近、按下、释放。
//			
//		★存在的问题：
//			暂无
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuBackButton = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_MenuBackButton');
	
	
	//==============================
	// * 变量获取 - 默认返回按钮
	//				（~struct~BackButtonDefault）
	//==============================
	DrillUp.drill_MBB_initBackButtonDefault = function( dataFrom ) {
		var data = {};
		data['visible'] = String( dataFrom["初始是否显示"] || "true") === "true";
		//data['menu'] = String( dataFrom["所属菜单"] || "");
		//data['menu_key'] = String( dataFrom["自定义关键字"] || "");
		data['x'] = Number( dataFrom["平移-返回按钮 X"] || 0 );
		data['y'] = Number( dataFrom["平移-返回按钮 Y"] || 0 );
		data['style_id'] = Number( dataFrom["返回按钮的样式"] || 0 );
		if( dataFrom["移动动画"] != "" &&
			dataFrom["移动动画"] != undefined ){
			var slideAnim = JSON.parse( dataFrom["移动动画"] );
			data['slideAnim'] = DrillUp.drill_MBB_initWindowMoving( slideAnim );
		}else{
			data['slideAnim'] = DrillUp.drill_MBB_initWindowMoving( {} );
		}
		return data;
	};
	//==============================
	// * 变量获取 - 返回按钮
	//				（~struct~BackButton）
	//==============================
	DrillUp.drill_MBB_initBackButton = function( dataFrom ) {
		var data = {};
		data['visible'] = String( dataFrom["初始是否显示"] || "true") === "true";
		data['menu'] = String( dataFrom["所属菜单"] || "");
		data['menu_key'] = String( dataFrom["自定义关键字"] || "");
		data['x'] = Number( dataFrom["平移-返回按钮 X"] || 0 );
		data['y'] = Number( dataFrom["平移-返回按钮 Y"] || 0 );
		data['style_id'] = Number( dataFrom["返回按钮的样式"] || 0 );
		if( dataFrom["移动动画"] != "" &&
			dataFrom["移动动画"] != undefined ){
			var slideAnim = JSON.parse( dataFrom["移动动画"] );
			data['slideAnim'] = DrillUp.drill_MBB_initWindowMoving( slideAnim );
		}else{
			data['slideAnim'] = DrillUp.drill_MBB_initWindowMoving( {} );
		}
		return data;
	};
	//==============================
	// * 变量获取 - 移动动画
	//				（~struct~DrillWindowMoving）
	//==============================
	DrillUp.drill_MBB_initWindowMoving = function( dataFrom ) {
		var data = {};
		data['slideMoveType'] = String( dataFrom["移动类型"] || "匀速移动");
		data['slideTime'] = Number( dataFrom["移动时长"] || 20);
		data['slideDelay'] = Number( dataFrom["移动延迟"] || 0);
		data['slidePosType'] = String( dataFrom["坐标类型"] || "相对坐标");
		data['slideX'] = Number( dataFrom["起点-相对坐标 X"] || 0);
		data['slideY'] = Number( dataFrom["起点-相对坐标 Y"] || 0);
		data['slideAbsoluteX'] = Number( dataFrom["起点-绝对坐标 X"] || 0);
		data['slideAbsoluteY'] = Number( dataFrom["起点-绝对坐标 Y"] || 0);
		return data;
	};
	//==============================
	// * 变量获取 - 返回按钮样式
	//				（~struct~BackButtonStyle）
	//==============================
	DrillUp.drill_MBB_initBackButtonStyle = function( dataFrom ) {
		var data = {};
		if( dataFrom["资源-返回按钮"] != "" &&
			dataFrom["资源-返回按钮"] != undefined ){
			data['src_img'] = JSON.parse( dataFrom["资源-返回按钮"] );
		}else{
			data['src_img'] = [];
		}
		data['src_bitmaps'] = [];
		data['interval'] = Number( dataFrom["帧间隔"] || 4);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") === "true";
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 20);
		data['highlight_mode'] = String( dataFrom["高亮效果"] || "关闭高亮效果");
		data['highlight_src_img'] = String( dataFrom["资源-高亮图片"] || "");
		data['pushdown_mode'] = String( dataFrom["按下效果"] || "关闭按下效果");
		data['pushdown_src_img'] = String( dataFrom["资源-按下图片"] || "");
		return data;
	};
	
	/*-----------------默认返回按钮------------------*/
	if( DrillUp.parameters["默认返回按钮"] != undefined &&
		DrillUp.parameters["默认返回按钮"] != "" ){
		var data = JSON.parse(DrillUp.parameters["默认返回按钮"]);
		DrillUp.g_MBB_default = DrillUp.drill_MBB_initBackButtonDefault( data );
	}else{
		DrillUp.g_MBB_default = null;
	}
	
	/*-----------------返回按钮------------------*/
	DrillUp.g_MBB_list_length = 40;
	DrillUp.g_MBB_list = [];
	DrillUp.g_MBB_list[0] = DrillUp.g_MBB_default;
	for (var i = 1; i <= DrillUp.g_MBB_list_length; i++) {
		if( DrillUp.parameters["返回按钮-" + String(i) ] != undefined &&
			DrillUp.parameters["返回按钮-" + String(i) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["返回按钮-" + String(i) ]);
			DrillUp.g_MBB_list[i] = DrillUp.drill_MBB_initBackButton( data );
		}else{
			DrillUp.g_MBB_list[i] = null;
		}
	}
	
	/*-----------------返回按钮样式------------------*/
	DrillUp.g_MBB_style_list_length = 40;
	DrillUp.g_MBB_style_list = [];
	for (var i = 0; i < DrillUp.g_MBB_style_list_length; i++) {
		if( DrillUp.parameters["返回按钮样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["返回按钮样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["返回按钮样式-" + String(i+1) ]);
			DrillUp.g_MBB_style_list[i] = DrillUp.drill_MBB_initBackButtonStyle( data );
		}else{
			DrillUp.g_MBB_style_list[i] = null;
		}
	}
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfWindowAuxiliary ){
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuBackBtn = function(filename) {
    return this.loadBitmap('img/Menu__layer_backBtn/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MBB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MBB_pluginCommand.call(this, command, args);
	if( command === ">菜单返回按钮" ){
		if(args.length == 4){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if( type === "显示" ){
				$gameSystem._drill_MBB_visible[temp1] = true;
			}
			if( type === "隐藏" ){
				$gameSystem._drill_MBB_visible[temp1] = false;
			}
		}
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
DrillUp.g_MBB_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MBB_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_MBB_sys_initialize.call(this);
	this.drill_MBB_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_MBB_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_MBB_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_MBB_saveEnabled == true ){	
		$gameSystem.drill_MBB_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_MBB_initSysData();
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
Game_System.prototype.drill_MBB_initSysData = function() {
	this.drill_MBB_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_MBB_checkSysData = function() {
	this.drill_MBB_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_MBB_initSysData_Private = function() {
	
	this._drill_MBB_visible = [];
	for(var i = 0; i < DrillUp.g_MBB_list.length ;i++){
		var temp_data = DrillUp.g_MBB_list[i];
		if( temp_data == undefined ){ continue; }
		this._drill_MBB_visible[i] = temp_data['visible'];
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_MBB_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_MBB_visible == undefined ){
		this.drill_MBB_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_MBB_list.length; i++ ){
		var temp_data = DrillUp.g_MBB_list[i];
		
		// > 已配置（undefined表示未配置的空数据）
		if( temp_data != undefined ){
			
			// > 未存储的，重新初始化
			if( this._drill_MBB_visible[i] == undefined ){
				this._drill_MBB_visible[i] = temp_data['visible'];
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
};


//#############################################################################
// ** 【标准模块】菜单层级
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
Scene_MenuBase.prototype.drill_MBB_layerAddSprite = function( sprite, layer_index ){
    this.drill_MBB_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 菜单层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_MenuBase.prototype.drill_MBB_layerRemoveSprite = function( sprite ){
	this._backgroundSprite.removeChild( sprite );
	this._foregroundSprite.removeChild( sprite );
}
//##############################
// * 菜单层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_MenuBase.prototype.drill_MBB_sortByZIndex = function () {
    this.drill_MBB_sortByZIndex_Private();
}
//=============================================================================
// ** 菜单层级（接口实现）
//=============================================================================
//==============================
// * 菜单层级 - 最顶层
//==============================
var _drill_MBB_menuLayer_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MBB_menuLayer_update.call(this);
	
	if(!this._backgroundSprite ){		//菜单后面层（防止覆写报错）
		this._backgroundSprite = new Sprite();
	}
	if(!this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);	
	}
}
//==============================
// * 菜单层级 - 图片层级排序（私有）
//==============================
Scene_MenuBase.prototype.drill_MBB_sortByZIndex_Private = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单层级 - 添加贴图到层级（私有）
//==============================
Scene_MenuBase.prototype.drill_MBB_layerAddSprite_Private = function( sprite, layer_index ){
	if( layer_index == "菜单后面层" || layer_index === 0 ){
		this._backgroundSprite.addChild( sprite );
	}
	if( layer_index == "菜单前面层" || layer_index === 1 ){
		this._foregroundSprite.addChild( sprite );
	}
};

//=============================================================================
// ** 菜单界面
//=============================================================================
//==============================
// ** 菜单 - 创建菜单后面层
//==============================
var _drill_MBB_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	
	// > 按钮初始化
	SceneManager._drill_MBB_created = false;	
   	this._drill_MBB_sprites = [];
   	this._drill_MBB_sprites_style = [];
   	this._drill_MBB_sprites_layer = [];
	this._drill_MBB_sprites_highlight = [];
	this._drill_MBB_sprites_pushdown = [];
	
	// > 菜单后面层
	_drill_MBB_createBackground.call(this);
};
//==============================
// ** 菜单 - 退出界面
//==============================
var _drill_MBB_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_MBB_terminate.call(this);			//（下次进入界面需重新创建）
	SceneManager._drill_MBB_created = false;
};
//==============================
// * 菜单 - 帧刷新
//==============================
var _drill_MBB_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MBB_update.call(this);
	
	// > 要求载入完毕后 创建
	if( SceneManager.isCurrentSceneStarted() && 
		SceneManager._drill_MBB_created != true ){
		this.drill_MBB_create();
	}
	// > 帧刷新
	if( SceneManager._drill_MBB_created == true ){
		this.drill_MBB_update();
	}
};

//=============================================================================
// ** 按钮
//=============================================================================
//==============================
// * 按钮 - 创建
//==============================
Scene_MenuBase.prototype.drill_MBB_create = function() {	
	SceneManager._drill_MBB_created = true;
	
	if(!this._drill_MBB_sprites ){		//防止覆写报错 - 贴图初始化
		this._drill_MBB_sprites = [];
		this._drill_MBB_sprites_style = [];
		this._drill_MBB_sprites_layer = [];
		this._drill_MBB_sprites_highlight = [];
		this._drill_MBB_sprites_pushdown = [];
	}
	
	// > 销毁旧按钮
	if( this._drill_MBB_sprites_layer.length > 0 ){
		for( var i = this._drill_MBB_sprites_layer.length-1; i >= 0; i-- ){
			var temp_layer = this._drill_MBB_sprites_layer[i];
			var temp_ch_list = temp_layer.children;
			for( var j = temp_ch_list.length-1; j >= 0; j-- ){
				var temp_ch = temp_ch_list[j];
				temp_layer.removeChild( temp_ch );
			}
			this.drill_MBB_layerRemoveSprite( temp_layer );
		}
		this._drill_MBB_sprites = [];
		this._drill_MBB_sprites_style = [];
		this._drill_MBB_sprites_layer = [];
		this._drill_MBB_sprites_highlight = [];
		this._drill_MBB_sprites_pushdown = [];
	}
	
	
	// > 配置的按钮
	for( var i = 1; i < DrillUp.g_MBB_list.length; i++ ){
		var temp_data = DrillUp.g_MBB_list[i];
		if( temp_data == undefined ){ continue; }
		if( this.drill_MBB_checkKeyword(i) ){
			// > 父层级
			var temp_layer = new Sprite();
			temp_layer.visible = $gameSystem._drill_MBB_visible[i];
			this._drill_MBB_sprites_layer.push(temp_layer);
			
			// > 按钮贴图
			var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));	//深拷贝数据
			var temp_style_id = temp_sprite_data['style_id']-1 || 0;
			var temp_style = DrillUp.g_MBB_style_list[ temp_style_id ];
			if( temp_style == undefined ){
				alert(
					"【Drill_MenuBackButton.js  主菜单 - 返回按钮】\n"+
					"配置错误，返回按钮样式["+ temp_sprite_data['style_id'] +"]不存在。"
				);
			}
			temp_style = JSON.parse(JSON.stringify( temp_style ));
			for(var j = 0; j < temp_style['src_img'].length ; j++){
				temp_style['src_bitmaps'].push(ImageManager.load_MenuBackBtn( temp_style['src_img'][j] ));
			}
			var temp_sprite = new Sprite();
			temp_sprite.bitmap = temp_style['src_bitmaps'][0];
			temp_sprite._time = 0;
			temp_sprite.x = 0;
			temp_sprite.y = Graphics.boxHeight * 2;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.blendMode = temp_style['blendMode'];
			temp_sprite.visible = true;
			if( temp_sprite_data['slideAnim'] ){
				var data = {
					"x": temp_sprite_data['x'],
					"y": temp_sprite_data['y'],
					
					"slideMoveType": temp_sprite_data['slideAnim']['slideMoveType'],
					"slideTime": temp_sprite_data['slideAnim']['slideTime'],
					"slideDelay": temp_sprite_data['slideAnim']['slideDelay'],
					"slidePosType": temp_sprite_data['slideAnim']['slidePosType'],
					"slideX": temp_sprite_data['slideAnim']['slideX'],
					"slideY": temp_sprite_data['slideAnim']['slideY'],
					"slideAbsoluteX": temp_sprite_data['slideAnim']['slideAbsoluteX'],
					"slideAbsoluteY": temp_sprite_data['slideAnim']['slideAbsoluteY'],
				}
				temp_sprite.drill_COWA_setButtonMove( data );		//辅助核心 - 控制按钮贴图基本属性
			}
			temp_layer.addChild(temp_sprite);
			this._drill_MBB_sprites.push(temp_sprite);
			this._drill_MBB_sprites_style.push(temp_style);
			// > 高亮效果
			var temp_highlight = new Sprite();
			temp_highlight.bitmap = ImageManager.load_MenuBackBtn(temp_style['highlight_src_img']);
			temp_highlight.anchor.x = 0.5;
			temp_highlight.anchor.y = 0.5;
			temp_highlight.visible = false;
			temp_highlight._touched = false;
			temp_layer.addChild(temp_highlight);
			this._drill_MBB_sprites_highlight.push(temp_highlight);
			// > 按下效果
			var temp_pushdown = new Sprite();
			temp_pushdown.bitmap = ImageManager.load_MenuBackBtn(temp_style['pushdown_src_img']);
			temp_pushdown.anchor.x = 0.5;
			temp_pushdown.anchor.y = 0.5;
			temp_pushdown.visible = false;
			temp_pushdown._needPopScene = false;
			temp_layer.addChild(temp_pushdown);
			this._drill_MBB_sprites_pushdown.push(temp_pushdown);
			
			temp_layer.zIndex = temp_style['zIndex'];
			this.drill_MBB_layerAddSprite( temp_layer, "菜单前面层" );
		}
	}
	if( this._drill_MBB_sprites.length == 0 && 
		DrillUp.g_MBB_list[0] != undefined ){
		var i = 0;
		
		//（默认的与上面的一模一样）
			// > 父层级
			var temp_layer = new Sprite();
			temp_layer.visible = $gameSystem._drill_MBB_visible[i];
			this._drill_MBB_sprites_layer.push(temp_layer);
			
			// > 按钮贴图
			var temp_sprite_data = JSON.parse(JSON.stringify( DrillUp.g_MBB_list[i] ));	//深拷贝数据
			var temp_style_id = temp_sprite_data['style_id']-1 || 0;
			var temp_style = DrillUp.g_MBB_style_list[ temp_style_id ];
			if( temp_style == undefined ){
				alert(
					"【Drill_MenuBackButton.js  主菜单 - 返回按钮】\n"+
					"配置错误，返回按钮样式["+ temp_sprite_data['style_id'] +"]不存在。"
				);
			}
			temp_style = JSON.parse(JSON.stringify( temp_style ));
			for(var j = 0; j < temp_style['src_img'].length ; j++){
				temp_style['src_bitmaps'].push(ImageManager.load_MenuBackBtn( temp_style['src_img'][j] ));
			}
			var temp_sprite = new Sprite();
			temp_sprite.bitmap = temp_style['src_bitmaps'][0];
			temp_sprite._time = 0;
			temp_sprite.x = 0;
			temp_sprite.y = Graphics.boxHeight * 2;
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.blendMode = temp_style['blendMode'];
			temp_sprite.zIndex = temp_style['zIndex'];
			temp_sprite.visible = true;
			if( temp_sprite_data['slideAnim'] ){
				var data = {
					"x": temp_sprite_data['x'],
					"y": temp_sprite_data['y'],
					
					"slideMoveType": temp_sprite_data['slideAnim']['slideMoveType'],
					"slideTime": temp_sprite_data['slideAnim']['slideTime'],
					"slideDelay": temp_sprite_data['slideAnim']['slideDelay'],
					"slidePosType": temp_sprite_data['slideAnim']['slidePosType'],
					"slideX": temp_sprite_data['slideAnim']['slideX'],
					"slideY": temp_sprite_data['slideAnim']['slideY'],
					"slideAbsoluteX": temp_sprite_data['slideAnim']['slideAbsoluteX'],
					"slideAbsoluteY": temp_sprite_data['slideAnim']['slideAbsoluteY'],
				}
				temp_sprite.drill_COWA_setButtonMove( data );		//辅助核心 - 控制按钮贴图基本属性
			}
			temp_layer.addChild(temp_sprite);
			this._drill_MBB_sprites.push(temp_sprite);
			this._drill_MBB_sprites_style.push(temp_style);
			// > 高亮效果
			var temp_highlight = new Sprite();
			temp_highlight.bitmap = ImageManager.load_MenuBackBtn(temp_style['highlight_src_img']);
			temp_highlight.anchor.x = 0.5;
			temp_highlight.anchor.y = 0.5;
			temp_highlight.visible = false;
			temp_highlight._touched = false;
			temp_layer.addChild(temp_highlight);
			this._drill_MBB_sprites_highlight.push(temp_highlight);
			// > 按下效果
			var temp_pushdown = new Sprite();
			temp_pushdown.bitmap = ImageManager.load_MenuBackBtn(temp_style['pushdown_src_img']);
			temp_pushdown.anchor.x = 0.5;
			temp_pushdown.anchor.y = 0.5;
			temp_pushdown.visible = false;
			temp_pushdown._needPopScene = false;
			temp_layer.addChild(temp_pushdown);
			this._drill_MBB_sprites_pushdown.push(temp_pushdown);
			
			this.drill_MBB_layerAddSprite( temp_layer, "菜单前面层" );
	}
	
	this.drill_MBB_sortByZIndex();
};

//==============================
// * 按钮 - 检查位置
//==============================
Scene_MenuBase.prototype.drill_MBB_checkKeyword = function(i) {
	var temp_sprite_data = DrillUp.g_MBB_list[i] ; 	//注意，执行该方法，是在DrillUp.g_MBB_list中遍历
	if( temp_sprite_data == undefined || temp_sprite_data['menu'] == undefined ) {
		return false;	
	}
	/*---------------标准----------------*/
	if( SceneManager._scene.constructor.name === "Scene_Menu" && temp_sprite_data['menu'] == "主菜单" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Item" && temp_sprite_data['menu'] == "道具" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Skill" && temp_sprite_data['menu'] == "技能" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Equip" && temp_sprite_data['menu'] == "装备" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Status" && temp_sprite_data['menu'] == "状态" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Options" && temp_sprite_data['menu'] == "选项" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Load" && temp_sprite_data['menu'] == "载入" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Save" && temp_sprite_data['menu'] == "保存" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_GameEnd" && temp_sprite_data['menu'] == "游戏结束" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Shop" && temp_sprite_data['menu'] == "商店" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Name" && temp_sprite_data['menu'] == "输入名称" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Debug" && temp_sprite_data['menu'] == "测试查值" ){
		return true;
	/*---------------旧选项----------------*/
	}else if( (SceneManager._scene.constructor.name === "Scene_Party" || SceneManager._scene.constructor.name === "Scene_Drill_SMa_Formation") && temp_sprite_data['menu'] == "队形"  ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_EnemyBook" && temp_sprite_data['menu'] == "敌人图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_ItemBook" && temp_sprite_data['menu'] == "物品图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Picture_Gallery" && temp_sprite_data['menu'] == "画廊" ){
		return true;
	}else{
		/*---------------自定义----------------*/
		if( SceneManager._scene.constructor.name === temp_sprite_data['menu_key'] ){
			return true;
		}
	}
	return false;
};

//==============================
// * 按钮 - 帧刷新
//==============================
Scene_MenuBase.prototype.drill_MBB_update = function() {
	for (var i = 0; i < this._drill_MBB_sprites.length; i++) {
		var temp_sprite = this._drill_MBB_sprites[i];
		var temp_style = this._drill_MBB_sprites_style[i];
		var temp_layer = this._drill_MBB_sprites_layer[i];
		var temp_h_sprite = this._drill_MBB_sprites_highlight[i];
		var temp_p_sprite = this._drill_MBB_sprites_pushdown[i];
		
		if( temp_layer.visible == false ){ continue; }		//隐藏时屏蔽帧刷新
		
		// > 位置控制
		temp_h_sprite.x = temp_sprite.x;
		temp_h_sprite.y = temp_sprite.y;
		temp_p_sprite.x = temp_sprite.x;
		temp_p_sprite.y = temp_sprite.y;
		
		// > 播放GIF
		temp_sprite._time += 1;
		var inter = this._drill_MBB_sprites[i]._time ;
		inter = inter / temp_style['interval'];
		inter = inter % temp_style['src_bitmaps'].length;
		if(temp_style['back_run']){
			inter = temp_style['src_bitmaps'].length - 1 - inter;
		}
		inter = Math.floor(inter);
		temp_sprite.bitmap = temp_style['src_bitmaps'][inter];
		
		// > 高亮控制
		if( this.drill_MBB_isOnHighlight(temp_sprite)){
			if( temp_h_sprite._touched == false ){
				temp_h_sprite._touched = true;	// 高亮动作
				if( temp_style['highlight_mode'] == "图片切换" ){
					temp_sprite.visible = false;
					temp_h_sprite.visible = true;
					SoundManager.playCursor();
				}
				if( temp_style['highlight_mode'] == "图片叠加" ){
					temp_sprite.visible = true;
					temp_h_sprite.visible = true;
					SoundManager.playCursor();
				}
			}
		}else{
			if( temp_h_sprite._touched == true ){
				temp_sprite.visible = true;
				temp_h_sprite.visible = false;
				temp_h_sprite._touched = false;
			}
		}
		
		// > 按下控制
		if( this.drill_MBB_isOnTouchSprite(temp_sprite)){		//注意帧刷新 与 检测高亮、检测按下事件 之间的执行情况，有些地方需要加锁，只执行一次
			
			if( temp_p_sprite._needPopScene == false ){
				temp_p_sprite._needPopScene = true;	// 按下动作
				SoundManager.playCursor();
				if( temp_style['pushdown_mode'] == "图片切换" ){
					temp_sprite.visible = false;
					temp_p_sprite.visible = true;
				}
				if( temp_style['pushdown_mode'] == "图片叠加" ){
					temp_sprite.visible = true;
					temp_p_sprite.visible = true;
				}
			}
		}
		
		if( temp_p_sprite._needPopScene ){	//按下延迟
			temp_sprite.bitmap = null;
			temp_h_sprite.visible = false;
			temp_p_sprite.visible = true;
			if( TouchInput.isReleased() ){	//鼠标释放后执行操作
				SoundManager.playOk();
				this.popScene();
			}
		}
	};
};

//==============================
// * 按钮 - 高亮事件监听
//==============================
Scene_MenuBase.prototype.drill_MBB_isOnHighlight = function(sprite) {
	 if (sprite == null){ return false };
	 if (sprite.bitmap == null){ return false };
	 if (!sprite.bitmap.isReady() ){ return false };
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if (_drill_mouse_x < sprite.x - cw) {return false};
	 if (_drill_mouse_x > sprite.x + cw) {return false};
	 if (_drill_mouse_y < sprite.y - ch) {return false};
	 if (_drill_mouse_y > sprite.y + ch) {return false};
	 return true;	
};
//==============================
// * 按钮 - 点击事件监听
//==============================
Scene_MenuBase.prototype.drill_MBB_isOnTouchSprite = function(sprite) {
	 if (sprite == null){ return false };
	 if (sprite.bitmap == null){ return false };
	 if (!sprite.bitmap.isReady() ){ return false };
	 if ( !TouchInput.isPressed() ) {return false};		//需要确定是否为鼠标点击
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if (TouchInput.x < sprite.x - cw) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y - ch) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//=============================================================================
// ** 获取鼠标位置（输入设备核心的片段）
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义
	
	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}

//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_MenuBackButton = false;
		alert(
			"【Drill_MenuBackButton.js  主菜单 - 返回按钮】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfWindowAuxiliary 系统-窗口辅助核心"
		);
}


