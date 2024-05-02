//=============================================================================
// Drill_BattleBackground.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        战斗 - 多层战斗背景
 * @author Drill_up
 * 
 * @Drill_LE_param "背景样式-%d"
 * @Drill_LE_parentKey "---背景样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_BBa_style_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_BattleBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在战斗界面中放置一个或者多个背景。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfBallistics      系统-弹道核心★★v2.2及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   可以在战斗的五个层级放多层不同的背景。
 * 2.该插件可以装饰战斗的各种层级。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-战斗界面）.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 战斗层级：
 *   (1.你可以将贴图放置在战斗的四种层级中，分别为：
 *      下层、上层、图片层、最顶层
 *   (2.战斗层级之间的关系为：
 *      底图 《 战斗背景 《 下层 《 敌人/角色层 《 上层
 *      《 图片对象层 《 图片层 《 对话框集合 《 最顶层
 *   (3.最顶层可以把战斗界面最高层的对话框、窗口也给挡住。
 *   (4.处于同一 战斗层级 时，将根据 图片层级 再先后排序。
 * 位移比：
 *   (1.根据物理相对运动知识，近大远小，近快远慢的原则。要让背景看
 *      起来真的"远"，那需要设置位移比接近1.00，越接近1.00越远。
 *   (2.去看看最新版本的 文档图解 介绍，
 *      这里是看起来简单但是实际做起来非常复杂的坑。
 * 细节：
 *   (1.插件指令操作的变化结果，是永久性的。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 设计：
 *   (1.
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Battle__layer （Battle后面有两个下划线）
 * 先确保项目img文件夹下是否有Battle__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 背景样式1 资源-背景
 * 背景样式2 资源-背景
 * 背景样式3 资源-背景
 * ……
 *
 * 所有素材都放在Battle__layer文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令手动的创建对象：
 * 
 * 插件指令：>战斗背景 : 创建 : 背景[11] : 样式[1]
 * 插件指令：>战斗背景 : 创建 : 背景[11] : 样式[1] //"资源文件为：xxxx"
 * 插件指令：>战斗背景 : 删除 : 背景[11]
 * 插件指令：>战斗背景 : 删除全部
 * 插件指令：>清空全部战斗装饰部件
 * 
 * 1.注意，必须先创建对象，才能再修改属性、移动，否则插件指令无效。
 * 2.由于插件指令配置后，没法直接知道 样式 对应哪个对象，因此你可以在
 *   样式后面写注释说明，注意"样式[1]"后面要有一个空格。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 初始属性调整
 * 创建对象后，可以修改初始属性：
 * 
 * 插件指令：>战斗背景 : 背景[2] : 初始属性调整 : 位置[0,0] : 战斗层级[下层] : 图片层级[2] : 速度[1.0,1.0] : 位移比[0.0,0.0]
 * 
 * 1.在插件参数里面一个个配置战斗背景参数非常麻烦，为了方便微调参数，
 *   你可以使用"初始属性调整"功能，微调插件配置的默认参数。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 旧指令
 * 插件的旧指令也可以创建对象：
 * 
 * 插件指令(旧)：>创建战斗背景 : A : B : C : D : E : F : G : H
 * 插件指令(旧)：>创建战斗背景 : 1 : M扫描圈2 : 4 : 上层 : -1.0 : 1.0 : 0.02 : 0.60
 * 插件指令(旧)：>创建战斗背景 : 2 : M扫描圈2 : 12 : 下层 : 0.93 : 0 : 0.01 : 0.00
 * 
 * 1.参数如下：
 *   参数A：背景编号
 *          给背景分配的编号，如果重复编号的背景被创建，那么会被覆盖。
 *   参数B：资源文件名
 *          所有资源文件都在Battle__layer下配置，不需要.png后缀。
 *   参数C：图片层级
 *          在相同战斗层级下，先后排序的位置，0表示最后面。
 *   参数D：战斗层级
 *          所属的战斗层级，填入：下层、上层、图片层、最顶层。
 *   参数E：X速度
 *          按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 *   参数F：Y速度
 *          按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 *   参数G：位移比
 *          与镜头插件相关，背景与镜头移动位移的比例。
 *          设置1.00，背景和镜头的位移一致。设置0.00则背景不随镜头移动。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟修改单属性
 * 你可以通过插件指令手动延迟修改各个属性：
 * 
 * 插件指令：>战斗背景 : 背景[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景变量[21] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 批量背景[7,8] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 批量背景变量[21,22] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 全部背景 : 隐藏(延迟) : 延迟执行时间[20]
 * 
 * 插件指令：>战斗背景 : 背景[11] : 显示(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 暂停(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 继续(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性(延迟) : 透明度[255] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性(延迟) : 透明度变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性(延迟) : 移动速度X[1.5] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性(延迟) : 移动速度Y[1.5] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性(延迟) : 旋转[90] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性(延迟) : 旋转变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性(延迟) : 缩放X[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性(延迟) : 缩放Y[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性(延迟) : 斜切X[0.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性(延迟) : 斜切Y[0.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 还原所有单属性(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 立即取消全部延迟指令
 * 
 * 1.前半部分（背景变量[21]）和 后半部分（隐藏(延迟) : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有5*16种组合方式。
 * 2.设置延迟指令后，指令会被暂存到延迟队列中，等待延迟时间结束之后，执行指令。
 *   "立即取消全部延迟指令"可以清空排在队列中的所有延迟指令。
 * 3.此功能可以简化 并行事件 的设计，你可以在串行事件中执行延迟，延迟后并行变化贴图。
 * 4.上述指令可以在地图界面中预先执行，只有进入到战斗界面之后，延迟时间才开始计时。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>战斗背景 : 背景[11] : 变透明 : 延迟[150] : 变化时间[60] : 透明度[255]
 * 插件指令(旧)：>战斗背景 : 背景[11] : 变透明 : 延迟[150] : 变化时间[60] : 透明度变量[21]
 * 插件指令(旧)：>战斗背景 : 背景[11] : 变速度 : 延迟[150] : 变化时间[60] : 速度[1.0,-1.0]
 * 插件指令(旧)：>战斗背景 : 背景[11] : 变速度 : 延迟[150] : 变化时间[60] : 速度变量[25,26]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟移动到
 * 你可以通过插件指令手动设置延迟移动：
 * 
 * 插件指令：>战斗背景 : 背景[11] : 移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 移动到(延迟)-匀速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 移动到(延迟)-弹性移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 移动到(延迟)-弹性移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 移动到(延迟)-增减速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 移动到(延迟)-增减速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗背景 : 背景[11] : 移动到(延迟)-延迟归位 : 延迟执行时间[20]
 * 
 * 1.前半部分（背景[11]）和 后半部分（移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有5*7种组合方式。
 * 2.移动的初始位置以显示在战斗界面的具体位置为基准，在基准位置上再进行移动到。
 *   指令中不含相对移动，比如多次执行移动到[20,20]，贴图只会到达一个固定的位置。
 * 3.上述指令可以在地图界面中预先执行，只有进入到战斗界面之后，延迟时间才开始计时。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>战斗背景 : 背景[11] : 变坐标 : 延迟[150] : 变化时间[60] : 位置[100,100]
 * 插件指令(旧)：>战斗背景 : 背景[11] : 变坐标 : 延迟[150] : 变化时间[60] : 位置变量[25,26]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改单属性
 * 上述的插件指令中，你也可以在 战斗界面 即时执行修改属性：
 * 
 * 插件指令：>战斗背景 : 背景[11] : 显示
 * 插件指令：>战斗背景 : 背景变量[21] : 显示
 * 插件指令：>战斗背景 : 批量背景[7,8] : 显示
 * 插件指令：>战斗背景 : 批量背景变量[21,22] : 显示
 * 插件指令：>战斗背景 : 全部背景 : 显示
 *
 * 插件指令：>战斗背景 : 背景[11] : 显示
 * 插件指令：>战斗背景 : 背景[11] : 隐藏
 * 插件指令：>战斗背景 : 背景[11] : 暂停
 * 插件指令：>战斗背景 : 背景[11] : 继续
 * 插件指令：>战斗背景 : 背景[11] : 切换混合模式[0]
 * 插件指令：>战斗背景 : 背景[11] : 切换战斗层级[下层]
 * 插件指令：>战斗背景 : 背景[11] : 切换图片层级[10]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性 : 透明度变量[21] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性 : 移动速度X[1.5] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性 : 移动速度Y[1.5] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性 : 旋转[90] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性 : 旋转变量[21] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性 : 缩放X[1.2] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性 : 缩放Y[1.2] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性 : 斜切X[0.2] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 修改单属性 : 斜切Y[0.2] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 立即还原所有单属性
 * 
 * 1.前半部分（背景变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有5*16种组合方式。
 * 2.插件指令的变化是永久性的。
 *   修改后的变化能与 配置的自变化效果 叠加，但是实际效果一般都不太好。
 * 3.战斗背景的中心锚点在左上角，旋转效果不太好。
 * 4.上述指令可以在地图界面中预先执行，进入到战斗界面后生效。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 移动到
 * 你可以通过插件指令手动设置移动：
 * 
 * 插件指令：>战斗背景 : 背景[11] : 移动到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 移动到-匀速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 移动到-弹性移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 移动到-增减速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 移动到-增减速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>战斗背景 : 背景[11] : 移动到-立即归位
 * 
 * 1.前半部分（背景[11]）和 后半部分（移动到-匀速移动 : 位置[100,100] : 时间[60]）
 *   的参数可以随意组合。一共有5*7种组合方式。
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
 * 测试方法：   在战斗中放置多个背景，进行性能测试。
 * 测试结果：   战斗界面中，平均消耗为：【42.90ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.从原理上来说，多层背景只是固定放置的贴图，但由于事件数量会挤占
 *   部分计算资源，所以消耗会稍微增大一些。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 添加了图片层、最顶层的设置。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 * [v1.3]
 * 添加了最大值编辑的支持。
 * [v1.4]
 * 整理了插件指令格式。
 * [v1.5]
 * 优化了内部结构。
 * [v1.6]
 * 优化了战斗层级结构。
 * [v1.7]
 * 优化了与战斗活动镜头的变换关系。
 * [v1.8]
 * 优化了旧存档的识别与兼容。
 * [v1.9]
 * 整理了延迟插件指令的功能。
 * [v2.0]
 * 大幅度优化了底层结构，加强了插件的功能。
 * [v2.1]
 * 修改了插件与屏幕快照的兼容性。
 * 
 * 
 * 
 * @param 底图设置
 * @type boolean
 * @on 地图图像
 * @off 全黑
 * @desc true - 地图图像，false - 全黑。进入战斗后，底图是当前地图的图像。你也可以设置成全黑。
 * @default false
 * 
 * @param ---背景样式组 1至20---
 * @default
 *
 * @param 背景样式-1
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-2
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-3
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-4
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-5
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-6
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-7
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-8
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-9
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-10
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-11
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-12
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-13
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-14
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-15
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-16
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-17
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-18
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-19
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-20
 * @parent ---背景样式组 1至20---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景样式组21至40---
 * @default
 *
 * @param 背景样式-21
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-22
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-23
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-24
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-25
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-26
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-27
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-28
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-29
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-30
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-31
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-32
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-33
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-34
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-35
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-36
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-37
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-38
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-39
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-40
 * @parent ---背景样式组21至40---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景样式组41至60---
 * @default
 *
 * @param 背景样式-41
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-42
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-43
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-44
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-45
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-46
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-47
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-48
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-49
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-50
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-51
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-52
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-53
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-54
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-55
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-56
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-57
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-58
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-59
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-60
 * @parent ---背景样式组41至60---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景样式组61至80---
 * @default
 *
 * @param 背景样式-61
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-62
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-63
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-64
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-65
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-66
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-67
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-68
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-69
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-70
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-71
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-72
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-73
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-74
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-75
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-76
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-77
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-78
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-79
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-80
 * @parent ---背景样式组61至80---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景样式组81至100---
 * @default
 *
 * @param 背景样式-81
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-82
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-83
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-84
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-85
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-86
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-87
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-88
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-89
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-90
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-91
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-92
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-93
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-94
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-95
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-96
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-97
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-98
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-99
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-100
 * @parent ---背景样式组81至100---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景样式组101至120---
 * @default
 *
 * @param 背景样式-101
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-102
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-103
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-104
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-105
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-106
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-107
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-108
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-109
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-110
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-111
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-112
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-113
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-114
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-115
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-116
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-117
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-118
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-119
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-120
 * @parent ---背景样式组101至120---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景样式组121至140---
 * @default
 *
 * @param 背景样式-121
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-122
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-123
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-124
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-125
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-126
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-127
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-128
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-129
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-130
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-131
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-132
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-133
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-134
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-135
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-136
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-137
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-138
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-139
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-140
 * @parent ---背景样式组121至140---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景样式组141至160---
 * @default
 *
 * @param 背景样式-141
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-142
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-143
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-144
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-145
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-146
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-147
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-148
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-149
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-150
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-151
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-152
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-153
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-154
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-155
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-156
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-157
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-158
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-159
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-160
 * @parent ---背景样式组141至160---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景样式组161至180---
 * @default
 *
 * @param 背景样式-161
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-162
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-163
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-164
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-165
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-166
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-167
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-168
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-169
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-170
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-171
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-172
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-173
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-174
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-175
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-176
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-177
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-178
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-179
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-180
 * @parent ---背景样式组161至180---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景样式组181至200---
 * @default
 *
 * @param 背景样式-181
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-182
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-183
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-184
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-185
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-186
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-187
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-188
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-189
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-190
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-191
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-192
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-193
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-194
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-195
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-196
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-197
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-198
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-199
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景样式-200
 * @parent ---背景样式组181至200---
 * @type struct<BBaBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 */
/*~struct~BBaBackground:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的战斗层==
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 资源-背景
 * @parent ---贴图---
 * @desc 背景的图片资源。
 * @default (需配置)战斗背景
 * @require 1
 * @dir img/Battle__layer/
 * @type file
 *
 * @param 平移-背景 X
 * @parent ---贴图---
 * @desc x轴方向平移，正数向左，负数向右，单位像素。0为贴在最左边。这里表示进入战斗时图片的初始位置。
 * @default 0
 *
 * @param 平移-背景 Y
 * @parent ---贴图---
 * @desc y轴方向平移，正数向上，负数向下，单位像素。0为贴在最上面。这里表示进入战斗时图片的初始位置。
 * @default 0
 * 
 * @param 平铺的旋转角度
 * @parent ---贴图---
 * @desc 平铺图形的旋转角度。
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
 * @param 是否预加载
 * @parent ---贴图---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍可见："1.系统 > 关于预加载.docx"。
 * @default false
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
 * @param 背景X速度
 * @parent ---贴图---
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0.0
 *
 * @param 背景Y速度
 * @parent ---贴图---
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0.0
 *
 * @param 战斗层级
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
 * @desc 战斗所在的层级位置，具体关系看看插件说明。
 * @default 下层
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 背景在同一个战斗层，先后排序的位置，0表示最后面。
 * @default 4
 *
 * @param 位移比X
 * @parent ---贴图---
 * @desc 与玩家战斗的镜头位置有关，设置1.00，背景和镜头的位移一致。设置0.00则背景不随镜头移动，紧贴战斗。负数则反向移动。
 * @default 0.00
 *
 * @param 位移比Y
 * @parent ---贴图---
 * @desc 与玩家战斗的镜头位置有关，设置1.00，背景和镜头的位移一致。设置0.00则背景不随镜头移动，紧贴战斗。负数则反向移动。
 * @default 0.00
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
//		插件简称		BBa（Layer_Ground）
//		临时全局变量	DrillUp.g_BBa_xxx
//		临时局部变量	this._drill_BBa_xxx
//		存储数据变量	$gameSystem._drill_BBa_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	战斗场景-雪地示例
//		★性能测试消耗	42.9ms（Drill_BBa_Sprite.update）45.1ms（drill_sprite_updateAttr）
//		★最坏情况		暂无
//		★备注			暂无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆预加载
//			->☆存储数据
//			->☆战斗层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			
//			->☆管辖权
//			->☆战斗图层控制
//				->隐藏底图
//				->战斗时更改战斗背景
//			->☆控制器与贴图
//				->界面创建
//				->实时创建
//				->控制器与镜头
//					> 位移比
//					->控制器帧刷新
//				->主体属性变化
//				->销毁
//			
//			->战斗背景控制器【Drill_BBa_Controller】
//				->A主体
//				->B基本变化
//				->C镜头参数
//				->D指令叠加变化
//				->E延迟指令
//				->F自变化效果
//			->战斗背景贴图【Drill_BBa_Sprite】
//				->A主体
//				->B基本变化
//				->C对象绑定
//				->D指令叠加变化
//				->E延迟指令
//				->F自变化效果
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰-战斗界面）（脚本）.docx
//		
//		★插件私有类：
//			* 战斗背景控制器【Drill_BBa_Controller】
//			* 战斗背景贴图【Drill_BBa_Sprite】
//		
//		★必要注意事项：
//			1. 
//
//		★其它说明细节：
//			1.
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
	DrillUp.g_BBa_PluginTip_curName = "Drill_BattleBackground.js 战斗-多层战斗背景";
	DrillUp.g_BBa_PluginTip_baseList = ["Drill_CoreOfBallistics.js 系统-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_BBa_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_BBa_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_BBa_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_BBa_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_BBa_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_BBa_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_BBa_PluginTip_curName + "】\n活动战斗镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_BBa_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_BBa_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleBackground = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_BattleBackground');

	//==============================
	// * 静态数据 - 背景
	//				（~struct~BBaBackground）
	//==============================
	DrillUp.drill_BBa_backgroundInit = function( dataFrom ) {
		var data = {};
		
		// > 控制器
		data['visible'] = true;
		data['pause'] = false;
		
		// > 贴图
		data['src_img'] = String( dataFrom["资源-背景"] || "");
		data['src_img_file'] = "img/Battle__layer/";
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['layerIndex'] = String( dataFrom["战斗层级"] || "下层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体
		data['x'] = Number( dataFrom["平移-背景 X"] || 0);
		data['y'] = Number( dataFrom["平移-背景 Y"] || 0);
		data['parentRotate'] = Number( dataFrom["平铺的旋转角度"] || 0.0);
		
		// > B基本变化
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['speedX'] = Number( dataFrom["背景X速度"] || 0);
		data['speedY'] = Number( dataFrom["背景Y速度"] || 0);
		
		// > F自变化效果
		data['effect_flicker'] = String( dataFrom["闪烁效果"] || "关闭");
		data['effect_flickerSpeed'] = Number( dataFrom["闪烁速度"] || 6.0);
		data['effect_flickerRange'] = Number( dataFrom["闪烁幅度范围"] || 20);
		data['effect_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['effect_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['effect_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		data['effect_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['effect_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['effect_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		
		
		// > 位移比
		data['XPer'] = Number( dataFrom["位移比X"] || 0);
		data['YPer'] = Number( dataFrom["位移比Y"] || 0);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_BBa_background_visible = String(DrillUp.parameters["底图设置"] || "false") === "true";	
	
	/*-----------------背景------------------*/
	DrillUp.g_BBa_style_length = 200;
	DrillUp.g_BBa_style = [];
	for( var i = 0; i < DrillUp.g_BBa_style_length; i++ ){
		if( DrillUp.parameters["背景样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["背景样式-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["背景样式-" + String(i+1) ]);
			DrillUp.g_BBa_style[i] = DrillUp.drill_BBa_backgroundInit( temp );
		}else{
			DrillUp.g_BBa_style[i] = undefined;		//（强制设为空值，节约存储资源）
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_BBa_getPluginTip_NeedUpdate_Ballistics() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_BBa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_BBa_pluginCommand.call(this, command, args);
	
	/*-----------------多插件的指令------------------*/
	if( command === ">清空全部战斗装饰部件" ){
		$gameSystem.drill_BBa_removeControllerAll();
		this.wait(1);	//（『强制等待』1帧，确保全部清空）
	}
	if( command === ">战斗背景" ){
		
		/*-----------------创建------------------*/
		if( args.length >= 6 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "创建" ){
				temp1 = temp1.replace("背景[","");
				temp1 = temp1.replace("]","");
				temp1 = Number( temp1 ) -1;
				temp2 = temp2.replace("样式[","");
				temp2 = temp2.replace("]","");
				temp2 = Number( temp2 ) -1;
				$gameSystem.drill_BBa_createController( temp1, temp2 );
				return;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "删除" ){
				temp1 = temp1.replace("背景[","");
				temp1 = temp1.replace("]","");
				temp1 = Number( temp1 ) -1;
				$gameSystem.drill_BBa_removeController( temp1 );
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "删除全部" ){
				$gameSystem.drill_BBa_removeControllerAll();
				this.wait(1);	//（『强制等待』1帧，确保全部清空）
			}
		}
		
		/*-----------------对象组获取------------------*/
		var controllers = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( controllers == null && unit.indexOf("批量背景[") != -1 ){
				unit = unit.replace("批量背景[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = Number(temp_arr[k]);
					var temp_controller = $gameSystem._drill_BBa_controllerTank[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("批量背景变量[") != -1 ){
				unit = unit.replace("批量背景变量[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = $gameVariables.value(Number(temp_arr[k]));
					var temp_controller = $gameSystem._drill_BBa_controllerTank[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("背景变量[") != -1 ){
				unit = unit.replace("背景变量[","");
				unit = unit.replace("]","");
				var controller_id = $gameVariables.value(Number(unit));
				var temp_controller = $gameSystem._drill_BBa_controllerTank[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit.indexOf("背景[") != -1 ){
				unit = unit.replace("背景[","");
				unit = unit.replace("]","");
				var controller_id = Number(unit);
				var temp_controller = $gameSystem._drill_BBa_controllerTank[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit == "全部背景" ){
				controllers = [];
				for( var k=0; k < $gameSystem._drill_BBa_controllerTank.length; k++ ){
					var temp_controller = $gameSystem._drill_BBa_controllerTank[ k ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
		}
		if( controllers == null ){ return; }
		
		/*-----------------常规指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "显示" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setVisible( true );
				}
			}
			if( type == "隐藏" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setVisible( false );
				}
			}
			if( type == "暂停" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPause( true );
				}
			}
			if( type == "继续" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPause( false );
				}
			}
			if( type.indexOf("切换混合模式[") != -1 ){
				type = type.replace("切换混合模式[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setBlendMode( Number(type) );
				}
			}
			if( type.indexOf("切换战斗层级[") != -1 ){
				type = type.replace("切换战斗层级[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setLayerIndex( String(type) );
				}
			}
			if( type.indexOf("切换图片层级[") != -1 ){
				type = type.replace("切换图片层级[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setZIndex( Number(type) );
				}
			}
		}
		if( args.length == 14 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var temp3 = String(args[9]);
			var temp4 = String(args[11]);
			var temp5 = String(args[13]);
			if( type == "初始属性调整" ){
				temp1 = temp1.replace("位置[","");
				temp1 = temp1.replace("]","");
				temp2 = temp2.replace("战斗层级[","");
				temp2 = temp2.replace("]","");
				temp3 = temp3.replace("图片层级[","");
				temp3 = temp3.replace("]","");
				temp4 = temp4.replace("速度[","");
				temp4 = temp4.replace("]","");
				temp5 = temp5.replace("位移比[","");
				temp5 = temp5.replace("]","");
				var temp1_arr = temp1.split(/[,，]/);
				var temp4_arr = temp4.split(/[,，]/);
				var temp5_arr = temp5.split(/[,，]/);
				if( temp1_arr.length >= 2 &&
					temp4_arr.length >= 2 &&
					temp5_arr.length >= 2 ){
					for( var k=0; k < controllers.length; k++ ){
						var controller = controllers[k];
						var temp_data = controller._drill_data;
						temp_data['x'] = Number(temp1_arr[0]);
						temp_data['y'] = Number(temp1_arr[1]);
						temp_data['layerIndex'] = temp2;
						temp_data['zIndex'] = Number(temp3);
						temp_data['speedX'] = Number(temp4_arr[0]);
						temp_data['speedY'] = Number(temp4_arr[1]);
						temp_data['XPer'] = Number(temp5_arr[0]);
						temp_data['YPer'] = Number(temp5_arr[1]);
						controller.drill_controller_resetData( temp_data );
					}
				}
			}
		}
		
		/*-----------------D指令叠加变化------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即还原所有单属性" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_commandChange_restoreAttr();
				}
			}
			if( type == "移动到-立即归位" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_commandChange_restoreMove();
				}
			}
		}
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "修改单属性" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				
				if( temp1.indexOf("移动速度X[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSpeedX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSpeedY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setOpacity(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setRotate(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSkewX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSkewY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
			}
			if( type == "移动到-匀速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"匀速变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
			if( type == "移动到-弹性移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"弹性变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
			if( type == "移动到-增减速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"增减速变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
		}
		
		/*-----------------E延迟指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "立即取消全部延迟指令" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_clearDelayingCommand();
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var delay_time = String(args[5]);
			if( type == "显示(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setVisible", [true], delay_time
					);
				}
			}
			if( type == "隐藏(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setVisible", [false], delay_time
					);
				}
			}
			if( type == "暂停(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setPause", [true], delay_time
					);
				}
			}
			if( type == "继续(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_setPause", [false], delay_time
					);
				}
			}
			if( type == "还原所有单属性(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_commandChange_restoreAttr", [], delay_time
					);
				}
			}
			if( type == "移动到(延迟)-延迟归位" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_commandChange_restoreMove", [], delay_time
					);
				}
			}
		}
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var delay_time = String(args[9]);
			if( type == "修改单属性(延迟)" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setOpacity", 
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("移动速度X[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSpeedX",
							["匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSpeedY",
							["匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setRotate",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleY",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSkewX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSkewY",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
			}
			if( type == "移动到(延迟)-匀速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
							[ "匀速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
			if( type == "移动到(延迟)-弹性移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
							[ "弹性变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
			if( type == "移动到(延迟)-增减速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_BBa_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
		}
	}
	
	/*-----------------旧指令------------------*/
	if( command === ">创建战斗背景" ){
		if( args.length == 14 ){
			var index = Number(args[1]) -1;
			var temp_data = {};
			temp_data['src_img'] = String(args[3]);			//背景资源名
			temp_data['zIndex'] = Number(args[5]);			//背景图片层级
			temp_data['layerIndex'] = String(args[7]);		//背景战斗层级
			temp_data['speedX'] = Number(args[9]);			//背景 X速度
			temp_data['speedY'] = Number(args[11]);			//背景 Y速度
			temp_data['XPer'] = Number(args[13]);			//背景位移比 X
			temp_data['YPer'] = Number(args[13]);			//背景位移比 Y
			
			var temp_controller = new Drill_BBa_Controller( temp_data );
			$gameSystem._drill_BBa_controllerTank[ index ] = temp_controller;
			
			return;
		}
	}
	if( command === ">战斗背景" ){
		if( args.length == 10 ){
			var id = -1;
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var delay_time = String(args[5]);
			var change_time = String(args[7]);
			var value_str = String(args[9]);
			
			if( temp1.indexOf("背景[") != -1 ){
				temp1 = temp1.replace("背景[","");
				temp1 = temp1.replace("]","");
				id = Number(temp1) -1;
			}
			if( temp1.indexOf("背景变量[") != -1 ){
				temp1 = temp1.replace("背景变量[","");
				temp1 = temp1.replace("]","");
				id = $gameVariables.value(Number(temp1)) -1;
			}
			if( id == -1 ){ return; }
			var controller = $gameSystem._drill_BBa_controllerTank[ id ];
			if( controller == undefined ){ return; }
			delay_time = delay_time.replace("延迟[","");
			delay_time = delay_time.replace("]","");
			change_time = change_time.replace("变化时间[","");
			change_time = change_time.replace("]","");
			
			if( type == "变透明" ){
				var num_list = this.drill_BBa_getArgNumList(value_str);
				controller.drill_controller_setDelayingCommand(
					"drill_controller_commandChange_setOpacity", 
					[ "匀速变化", num_list[0], Number(change_time) ], delay_time
				);
				return;
			}
			if( type == "变速度" ){
				var num_list = this.drill_BBa_getArgNumList(value_str);
				controller.drill_controller_setDelayingCommand(
					"drill_controller_commandChange_setSpeedX", 
					[ "匀速变化", num_list[0], Number(change_time) ], delay_time
				);
				controller.drill_controller_setDelayingCommand(
					"drill_controller_commandChange_setSpeedY", 
					[ "匀速变化", num_list[1], Number(change_time) ], delay_time
				);
				return;
			}
			if( type == "变坐标" ){
				var num_list = this.drill_BBa_getArgNumList(value_str);
				controller.drill_controller_setDelayingCommand(
					"drill_controller_commandChange_setMove", 
					[ "匀速变化", num_list[0], num_list[1], Number(change_time) ], delay_time
				);
				return;
			}
		}
	}
};
//==============================
// * 插件指令 - 获取方括号中的数字
//
//			参数：	> arg_str 字符串
//			返回：	> 数字数组
//
//			说明：	> 能获取到字符串中的数字，且包含 变量 转换情况。
//==============================
Game_Interpreter.prototype.drill_BBa_getArgNumList = function( arg_str ){
	var arr = arg_str.match( /([^\[]+)\[([^\]]+)\]/ );
	if( arr != undefined && arr.length >= 3 ){
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
// ** ☆预加载
//
//			说明：	> 对指定资源贴图标记不删除，可以防止重建导致的浪费资源，以及资源显示时闪烁问题。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 预加载 - 初始化
//==============================
var _drill_BBa_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BBa_preload_initialize.call(this);
	this.drill_BBa_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_BBa_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_BBa_preloadInit = function() {
	this._drill_BBa_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_BBa_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_BBa_style.length; i++ ){
		var temp_data = DrillUp.g_BBa_style[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['preload'] != true ){ continue; }
		
		this._drill_BBa_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img'], temp_data['tint'], temp_data['smooth'], this._drill_BBa_cacheId ) 
		);
	}
}


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_BBa_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BBa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_BBa_sys_initialize.call(this);
	this.drill_BBa_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BBa_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BBa_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BBa_saveEnabled == true ){	
		$gameSystem.drill_BBa_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BBa_initSysData();
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
Game_System.prototype.drill_BBa_initSysData = function() {
	this.drill_BBa_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BBa_checkSysData = function() {
	this.drill_BBa_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BBa_initSysData_Private = function() {
	
	this._drill_BBa_controllerTank = [];
	//（初始为空容器，不需要初始化）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BBa_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_BBa_controllerTank == undefined ){
		this.drill_BBa_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，战斗前才赋值，且只在战斗时用到）
};
//==============================
// * 存储数据 - 创建控制器（开放函数）
//==============================
Game_System.prototype.drill_BBa_createController = function( slot_id, style_id ){
	if( this._drill_BBa_controllerTank == undefined ){
		this._drill_BBa_controllerTank = [];
	}
	
	// > 销毁原来的
	this.drill_BBa_removeController( slot_id );
	
	// > 创建控制器
	var temp_data = DrillUp.g_BBa_style[ style_id ];
	var temp_controller = new Drill_BBa_Controller( temp_data );
	this._drill_BBa_controllerTank[ slot_id ] = temp_controller;
	
	// > 刷新统计
	$gameTemp._drill_BBa_needRestatistics = true;
}
//==============================
// * 存储数据 - 去除控制器（开放函数）
//==============================
Game_System.prototype.drill_BBa_removeController = function( slot_id ){
	if( this._drill_BBa_controllerTank == undefined ){ return; }
	if( this._drill_BBa_controllerTank[ slot_id ] == undefined ){ return; }
	this._drill_BBa_controllerTank[ slot_id ].drill_controller_destroy();
	this._drill_BBa_controllerTank[ slot_id ] = null;
}
//==============================
// * 存储数据 - 去除全部控制器（开放函数）
//==============================
Game_System.prototype.drill_BBa_removeControllerAll = function(){
	if( this._drill_BBa_controllerTank == undefined ){ return; }
	for( var i=0; i < this._drill_BBa_controllerTank.length; i++ ){
		this.drill_BBa_removeController( i );
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
Scene_Battle.prototype.drill_BBa_layerAddSprite = function( sprite, layer_index ){
	this.drill_BBa_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_BBa_layerRemoveSprite = function( sprite ){
	//（不操作）
}
//##############################
// * 战斗层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，战斗层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Battle.prototype.drill_BBa_sortByZIndex = function () {
    this.drill_BBa_sortByZIndex_Private();
}
//##############################
// * 战斗层级 - 层级与镜头的位移【标准函数】
//				
//			参数：	> x 数字              （x位置，当前为 战斗参照）
//					> y 数字              （y位置，当前为 战斗参照）
//					> layer 字符串        （层级，下层/上层/图片层/最顶层）
//					> option 动态参数对象 （计算时的必要数据）
//			返回：	> pos 动态参数对象
//                  > pos['x']
//                  > pos['y']
//          
//			说明：	> 强行规范的接口，必须按照接口的结构来，把要考虑的问题全考虑清楚了再去实现。
//##############################
Scene_Battle.prototype.drill_BBa_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_BBa_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_BBa_battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_BBa_battle_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_BBa_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_BBa_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_BBa_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function() {
	_drill_BBa_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_BBa_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_BBa_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
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
			if( this.__drill_zIndex == undefined ){ return 666422; }	//（如果未定义则放最上面）
			return this.__drill_zIndex;
		},
		configurable: true
	});
};
//==============================
// * 战斗层级 - 图片层级排序（私有）
//==============================
Scene_Battle.prototype.drill_BBa_sortByZIndex_Private = function() {
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_BBa_layerAddSprite_Private = function( sprite, layer_index ){
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
//==============================
// * 战斗层级 - 层级与镜头的位移（私有）
//==============================
Scene_Battle.prototype.drill_BBa_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 位移比
	var x_per = option['XPer'];
	var y_per = option['YPer'];
	if( Imported.Drill_BattleCamera ){
		var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
		xx += camera_pos.x * x_per;
		yy += camera_pos.y * y_per;
	}
	//		（*0 表示不跟镜头移动，紧贴战斗底图；*1表示紧贴镜头。）
	
	
	// > 战斗参照 -> 战斗参照
	if( layer == "下层" || layer == "上层" ){
		//（不操作）
		return {'x':xx, 'y':yy };
	}
	
	// > 战斗参照 -> 镜头参照
	if( layer == "图片层" || layer == "最顶层" ){
		xx -= this._spriteset._baseSprite.x;	//（由于 Spriteset_Battle 的 _baseSprite 坐标始终是(0,0)，所以两个参照没有区别。）
		yy -= this._spriteset._baseSprite.y;
		
		// > 战斗镜头位移（在图层内）
		if( Imported.Drill_BattleCamera ){
			var camera_pos = $gameSystem._drill_BCa_controller.drill_BCa_getCameraPos_Children();
			xx -= camera_pos.x;
			yy -= camera_pos.y;
		}else{
			xx -= this._spriteset._battleField.x;	//（处于 Spriteset_Battle 的 _battleField 情况。）
			yy -= this._spriteset._battleField.y;
		}
		return {'x':xx, 'y':yy };
	}
	return {'x':xx, 'y':yy };
}



//=============================================================================
// ** ☆管辖权
//
//			说明：	> 管辖权 即对 原函数 进行 修改、覆写、继承、控制子插件继承 等的权利。
//					> 用于后期脱离 原游戏框架 且仍保持兼容性 的标记。
//					> 注意，功能 3C组合背景 被 Yep核心引擎 插了一脚，需要考虑Yep的兼容问题。
//=============================================================================
/*
//==============================
// * 指令『多层战斗背景』 - 【地图 > 更改战斗背景】
//==============================
Game_Interpreter.prototype.command283 = function(){
    $gameMap.changeBattleback(this._params[0], this._params[1]);
    return true;
};

//==============================
// * 组合背景『多层战斗背景』 - 访问器
//==============================
Game_Map.prototype.battleback1Name = function(){ return this._battleback1Name; };	//组合背景 - 默认战斗背景1
Game_Map.prototype.battleback2Name = function(){ return this._battleback2Name; };	//组合背景 - 默认战斗背景2
//==============================
// * 组合背景『多层战斗背景』 - 设置战斗组合背景
//==============================
Game_Map.prototype.setupBattleback = function(){
    if( $dataMap.specifyBattleback ){
        this._battleback1Name = $dataMap.battleback1Name;
        this._battleback2Name = $dataMap.battleback2Name;
    }else{
        this._battleback1Name = null;
        this._battleback2Name = null;
    }
};
//==============================
// * 组合背景『多层战斗背景』 - 修改组合背景（command283）
//==============================
Game_Map.prototype.changeBattleback = function( battleback1Name, battleback2Name ){
    this._battleback1Name = battleback1Name;
    this._battleback2Name = battleback2Name;
};
*/
/*
//==============================
// * 3B底图『多层战斗背景』 - 创建
//==============================
Spriteset_Battle.prototype.createBackground = function(){
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this._baseSprite.addChild(this._backgroundSprite);	//（添加到 内容基层 下）
};

//==============================
// * 3C组合背景『多层战斗背景』 - 创建
//==============================
Spriteset_Battle.prototype.createBattleback = function(){
    var margin = 32;
    var x = -this._battleField.x - margin;
    var y = -this._battleField.y - margin;
    var width = Graphics.width + margin * 2;
    var height = Graphics.height + margin * 2;
    this._back1Sprite = new TilingSprite();
    this._back2Sprite = new TilingSprite();
    this._back1Sprite.bitmap = this.battleback1Bitmap();
    this._back2Sprite.bitmap = this.battleback2Bitmap();
    this._back1Sprite.move(x, y, width, height);
    this._back2Sprite.move(x, y, width, height);
    this._battleField.addChild(this._back1Sprite);
    this._battleField.addChild(this._back2Sprite);
};
//==============================
// * 3C组合背景『多层战斗背景』 - 帧刷新
//==============================
Spriteset_Battle.prototype.updateBattleback = function(){
    if( !this._battlebackLocated ){
        this.locateBattleback();
        this._battlebackLocated = true;
    }
};
//==============================
// * 3C组合背景『多层战斗背景』 - 计算位置
//==============================
Spriteset_Battle.prototype.locateBattleback = function(){
    var width = this._battleField.width;
    var height = this._battleField.height;
    var sprite1 = this._back1Sprite;
    var sprite2 = this._back2Sprite;
    sprite1.origin.x = sprite1.x + (sprite1.bitmap.width - width) / 2;
    sprite2.origin.x = sprite1.y + (sprite2.bitmap.width - width) / 2;
    if( $gameSystem.isSideView() ){
        sprite1.origin.y = sprite1.x + sprite1.bitmap.height - height;
        sprite2.origin.y = sprite1.y + sprite2.bitmap.height - height;
    }
};
//==============================
// * 3C组合背景『多层战斗背景』 - 资源 - 获取后背景bitmap
//==============================
Spriteset_Battle.prototype.battleback1Bitmap = function(){
    return ImageManager.loadBattleback1(this.battleback1Name());
};
//==============================
// * 3C组合背景『多层战斗背景』 - 资源 - 获取前背景bitmap
//==============================
Spriteset_Battle.prototype.battleback2Bitmap = function(){
    return ImageManager.loadBattleback2(this.battleback2Name());
};
//==============================
// * 3C组合背景『多层战斗背景』 - 资源 - 获取后背景资源名
//==============================
Spriteset_Battle.prototype.battleback1Name = function(){
    if( BattleManager.isBattleTest() ){
        return $dataSystem.battleback1Name;
    }else if( $gameMap.battleback1Name() ){
        return $gameMap.battleback1Name();
    }else if( $gameMap.isOverworld() ){
        return this.overworldBattleback1Name();
    }else{
        return '';
    }
};
//==============================
// * 3C组合背景『多层战斗背景』 - 资源 - 获取前背景资源名
//==============================
Spriteset_Battle.prototype.battleback2Name = function(){
    if( BattleManager.isBattleTest() ){
        return $dataSystem.battleback2Name;
    }else if( $gameMap.battleback2Name() ){
        return $gameMap.battleback2Name();
    }else if( $gameMap.isOverworld() ){
        return this.overworldBattleback2Name();
    }else{
        return '';
    }
};
//==============================
// * 3C组合背景『多层战斗背景』 - 资源 - 后背景资源名 - 世界图块
//==============================
Spriteset_Battle.prototype.overworldBattleback1Name = function(){
    if( $gameMap.battleback1Name() === '') return '';
    if( $gamePlayer.isInVehicle() ){
        return this.shipBattleback1Name();
    }else{
        return this.normalBattleback1Name();
    }
};
//==============================
// * 3C组合背景『多层战斗背景』 - 资源 - 前背景资源名 - 世界图块
//==============================
Spriteset_Battle.prototype.overworldBattleback2Name = function(){
    if( $gameMap.battleback2Name() === '') return '';
    if( $gamePlayer.isInVehicle() ){
        return this.shipBattleback2Name();
    }else{
        return this.normalBattleback2Name();
    }
};
//==============================
// * 3C组合背景『多层战斗背景』 - 资源 - 后背景资源名 - 一般图块
//==============================
Spriteset_Battle.prototype.normalBattleback1Name = function(){
    return (this.terrainBattleback1Name(this.autotileType(1)) ||
            this.terrainBattleback1Name(this.autotileType(0)) ||
            this.defaultBattleback1Name());
};
//==============================
// * 3C组合背景『多层战斗背景』 - 资源 - 前背景资源名 - 一般图块
//==============================
Spriteset_Battle.prototype.normalBattleback2Name = function(){
    return (this.terrainBattleback2Name(this.autotileType(1)) ||
            this.terrainBattleback2Name(this.autotileType(0)) ||
            this.defaultBattleback2Name());
};
//==============================
// * 3C组合背景『多层战斗背景』 - 资源 - 后背景资源名 - 类型标识
//==============================
Spriteset_Battle.prototype.terrainBattleback1Name = function( type ){
    switch (type ){
    case 24: case 25:
        return 'Wasteland';
    case 26: case 27:
        return 'DirtField';
    case 32: case 33:
        return 'Desert';
    case 34:
        return 'Lava1';
    case 35:
        return 'Lava2';
    case 40: case 41:
        return 'Snowfield';
    case 42:
        return 'Clouds';
    case 4: case 5:
        return 'PoisonSwamp';
    default:
        return null;
    }
};
//==============================
// * 3C组合背景『多层战斗背景』 - 资源 - 前背景资源名 - 类型标识
//==============================
Spriteset_Battle.prototype.terrainBattleback2Name = function( type ){
    switch (type ){
    case 20: case 21:
        return 'Forest';
    case 22: case 30: case 38:
        return 'Cliff';
    case 24: case 25: case 26: case 27:
        return 'Wasteland';
    case 32: case 33:
        return 'Desert';
    case 34: case 35:
        return 'Lava';
    case 40: case 41:
        return 'Snowfield';
    case 42:
        return 'Clouds';
    case 4: case 5:
        return 'PoisonSwamp';
    }
};
//==============================
// * 3C组合背景『多层战斗背景』 - 默认背景名
//==============================
Spriteset_Battle.prototype.defaultBattleback1Name = function(){ return 'Grassland'; };
Spriteset_Battle.prototype.defaultBattleback2Name = function(){ return 'Grassland'; };
Spriteset_Battle.prototype.shipBattleback1Name = function(){ return 'Ship'; };
Spriteset_Battle.prototype.shipBattleback2Name = function(){ return 'Ship'; };
//==============================
// * 3C组合背景『多层战斗背景』 - 根据角色地图位置自适应背景
//==============================
Spriteset_Battle.prototype.autotileType = function( z ){
    return $gameMap.autotileType($gamePlayer.x, $gamePlayer.y, z);
};
*/


//=============================================================================
// ** ☆战斗图层控制
//
//			说明：	> 此模块专门管理 战斗图层。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 战斗图层 - 创建设置
//==============================
var _drill_BBa_createBackground = Spriteset_Battle.prototype.createBackground;
Spriteset_Battle.prototype.createBackground = function(){
	_drill_BBa_createBackground.call( this );
	if( DrillUp.g_BBa_background_visible == false ){	//（隐藏底图）
		this._backgroundSprite.visible = false;
	}
}
//==============================
// * 战斗图层 - 更改战斗背景 指令（command283）
//==============================
var _drill_BBa_command283 = Game_Interpreter.prototype.command283;
Game_Interpreter.prototype.command283 = function(){
    $gameTemp._drill_BBa_needRefreshBackground = true;	//（刷新标记）
    return _drill_BBa_command283.call( this );
};
//==============================
// * 战斗图层 - 帧刷新 战斗背景
//==============================
var _drill_BBa_updateBattleback = Spriteset_Battle.prototype.updateBattleback;
Spriteset_Battle.prototype.updateBattleback = function(){
	_drill_BBa_updateBattleback.call( this );
	
	// > 刷新背景
	if( $gameTemp._drill_BBa_needRefreshBackground == true ){
		$gameTemp._drill_BBa_needRefreshBackground = false;
		
		this._back1Sprite.bitmap = this.battleback1Bitmap();
		this._back2Sprite.bitmap = this.battleback2Bitmap();
		this._drill_BBa_needRefreshBitmap = true;
	}
	
	//// > 加载成功后刷新 计算位置
	//if( this._drill_BBa_needRefreshBitmap == true &&
	//	this._back1Sprite.bitmap.isReady() &&
	//	this._back2Sprite.bitmap.isReady() ){
	//	this._drill_BBa_needRefreshBitmap = false; 
	//	this.locateBattleback();
	//}
}



//=============================================================================
// ** ☆控制器与贴图
//
//			说明：	> 此模块专门管理 贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 控制器与贴图 - 容器初始化
//==============================
var _drill_BBa_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_BBa_temp_initialize2.call(this);
	this._drill_BBa_spriteTank = [];			//贴图容器
};
//==============================
// * 控制器与贴图 - 销毁时（战斗界面）
//==============================
var _drill_BBa_smap_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	_drill_BBa_smap_terminate.call(this);
	$gameTemp._drill_BBa_spriteTank = [];		//贴图容器
};
//==============================
// * 控制器与贴图 - 帧刷新（战斗界面）
//==============================
var _drill_BBa_smap_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_drill_BBa_smap_update.call(this);
	this.drill_BBa_updateRestatisticsCreate();	//帧刷新 - 实时创建
	this.drill_BBa_updateControllerCamera();	//帧刷新 - 控制器与镜头
	this.drill_BBa_updateAttr();				//帧刷新 - 主体属性变化
	this.drill_BBa_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时（战斗界面）
//==============================
var _drill_BBa_smap_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_drill_BBa_smap_createAllWindows.call(this);
	this.drill_BBa_create();
};
//==============================
// * 控制器与贴图 - 界面创建
//
//			说明：	> 界面创建时，根据 控制器容器 创建对应的贴图。
//==============================
Scene_Battle.prototype.drill_BBa_create = function() {
	$gameTemp._drill_BBa_spriteTank = [];			//贴图容器（不允许出现null值）
	
	for(var i=0; i< $gameSystem._drill_BBa_controllerTank.length; i++){
		var temp_controller = $gameSystem._drill_BBa_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		var temp_data = temp_controller._drill_data;
		
		
		// > 创建贴图
		var temp_sprite = new Drill_BBa_Sprite();
		temp_sprite._drill_curSerial = temp_controller._drill_controllerSerial;	//（标记序列号）
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 添加贴图到层级
		$gameTemp._drill_BBa_spriteTank.push( temp_sprite );
		this.drill_BBa_layerAddSprite( temp_sprite, temp_data['layerIndex'] );
	}
	
	// > 层级排序
	this.drill_BBa_sortByZIndex();
}
//==============================
// * 控制器与贴图 - 实时创建
//
//			说明：	> 插件指令实时创建了控制器后，根据 控制器容器 筛选并创建对应的贴图。
//==============================
Scene_Battle.prototype.drill_BBa_updateRestatisticsCreate = function() {
	if( $gameTemp._drill_BBa_needRestatistics != true ){ return; }
	$gameTemp._drill_BBa_needRestatistics = false;
	
	for( var i=0; i < $gameSystem._drill_BBa_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_BBa_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		var temp_data = temp_controller._drill_data;
		
		// > 过滤生命周期结束情况
		if( temp_controller.drill_controller_isDead() == true ){ continue; }
		
		// > 有绑定控制器的贴图时，跳过
		if( this.drill_BBa_hasSpriteBinding( temp_controller._drill_controllerSerial ) == true ){ continue; }
		
		
		// > 创建贴图
		var temp_sprite = new Drill_BBa_Sprite();
		temp_sprite._drill_curSerial = temp_controller._drill_controllerSerial;	//（标记序列号）
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 添加贴图到层级
		$gameTemp._drill_BBa_spriteTank.push( temp_sprite );
		this.drill_BBa_layerAddSprite( temp_sprite, temp_data['layerIndex'] );
	}
	
	// > 层级排序
	this.drill_BBa_sortByZIndex();
}
//==============================
// * 控制器与贴图 - 实时创建 - 是否含有绑定控制器的贴图
//==============================
Scene_Battle.prototype.drill_BBa_hasSpriteBinding = function( serial ){
	for( var i=0; i < $gameTemp._drill_BBa_spriteTank.length; i++){
		if( $gameTemp._drill_BBa_spriteTank[i]._drill_curSerial == serial ){
			return true;
		}
	}
	return false;
}

//==============================
// * 控制器与贴图 - 帧刷新 控制器与镜头
//==============================
Scene_Battle.prototype.drill_BBa_updateControllerCamera = function() {
	for(var i = 0; i < $gameSystem._drill_BBa_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_BBa_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器帧刷新
		temp_controller.drill_controller_update();
		
		
		// > 镜头位移结果（战斗参照）
		var s_data = temp_controller._drill_data;
		var xx = 0;
		var yy = 0;
		
		// > 镜头位移结果 - 层级与镜头的位移
		var option = {
			"XPer": s_data['XPer'],
			"YPer": s_data['YPer'],
		};
		var pos = this.drill_BBa_layerCameraMoving(xx, yy, s_data['layerIndex'], option );
		xx = pos['x'];
		yy = pos['y'];
		
		// > 镜头位移结果 - 镜头缩放与位移（此处是场景装饰，不需要考虑缩放）
		//	（无）
		
		// > 镜头位移结果 - 赋值
		//		（控制器位移与镜头位移 独立，这样在控制器暂停时，贴图也仍然能兼容镜头移动）
		temp_controller._drill_cameraResultSpriteX = xx;
		temp_controller._drill_cameraResultSpriteY = yy;
		
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 主体属性变化
//==============================
Scene_Battle.prototype.drill_BBa_updateAttr = function() {
	var has_layerChange = false;
	for(var i = 0; i < $gameTemp._drill_BBa_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_BBa_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		var temp_data = temp_controller._drill_data;
		
		// > 混合模式
		if( temp_sprite.blendMode != temp_data['blendMode'] ){
			temp_sprite.blendMode =  temp_data['blendMode'];
			temp_sprite._drill_layerSprite.blendMode = temp_data['blendMode'];
		}
		// > 战斗层级
		if( temp_sprite.layerIndex != temp_data['layerIndex'] ){
			temp_sprite.layerIndex =  temp_data['layerIndex'];
			this.drill_BBa_layerAddSprite( temp_sprite, temp_data['layerIndex'] );
			has_layerChange = true;
		}
		// > 图片层级
		if( temp_sprite.zIndex != temp_data['zIndex'] ){
			temp_sprite.zIndex =  temp_data['zIndex'];
			has_layerChange = true;
		}
	};
	
	// > 层级排序
	if( has_layerChange == true ){
		this.drill_BBa_sortByZIndex();
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 销毁
//==============================
Scene_Battle.prototype.drill_BBa_updateDestroy = function() {
	
	// > 自动销毁 - 控制器
	for(var i = $gameSystem._drill_BBa_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_BBa_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_BBa_controllerTank[i] = null;	//（只置空，不退数组）
			//$gameSystem._drill_BBa_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_BBa_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_BBa_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_BBa_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_BBa_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};



//=============================================================================
// ** 战斗背景控制器【Drill_BBa_Controller】
// **		
// **		作用域：	战斗界面
// **		主功能：	> 定义一个专门控制战斗背景的数据类。
// **		子功能：	->控制器
// **						->帧刷新
// **						->重设数据
// **							->序列号
// **						->显示/隐藏
// **						->暂停/继续
// **						->销毁
// **					->A主体
// **					->B基本变化
// **					->C镜头参数
// **					->D指令叠加变化
// **						> 主体贴图>移动到
// **						> 主体贴图>透明度
// **						> 平铺贴图>移动速度X
// **						> 平铺贴图>移动速度Y
// **						> 主体贴图>旋转（中心锚点为左上角）
// **						> 主体贴图>缩放X
// **						> 主体贴图>缩放Y
// **						> 主体贴图>斜切X（中心锚点为左上角）
// **						> 主体贴图>斜切Y（中心锚点为左上角）
// **					->E延迟指令
// **					->F自变化效果
// **						> 平铺贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>缩放效果
// **		
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_BBa_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_BBa_checkNaN = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_BBa_Controller.prototype.initialize = function( data ){
	this._drill_data = {};
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//（生成一个不重复的序列号）
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
	if( data == undefined ){ data = {}; }
    this.drill_controller_resetData( data );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_BBa_Controller.prototype.drill_controller_update = function(){
	this.drill_controller_updateDelayingCommandImportant();		//帧刷新 - E延迟指令 - 时间流逝
	if( this._drill_data['pause'] == true ){ return; }
	this.drill_controller_updateAttr();							//帧刷新 - A主体
	this.drill_controller_updateChange_Position();				//帧刷新 - B基本变化 - 平移
	this.drill_controller_updateChange_Rotation();				//帧刷新 - B基本变化 - 旋转
	this.drill_controller_updateChange_MoveRange();				//帧刷新 - B基本变化 - 平铺范围
																//帧刷新 - C镜头参数（无）
	this.drill_controller_updateCommandChange();				//帧刷新 - D指令叠加变化
	this.drill_controller_updateDelayingCommand();				//帧刷新 - E延迟指令 - 执行延迟指令
	this.drill_controller_updateEffect();						//帧刷新 - F自变化效果
	this.drill_controller_updateCheckNaN();						//帧刷新 - A主体 - 校验值
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
Drill_BBa_Controller.prototype.drill_controller_resetData = function( data ){
	this.drill_controller_resetData_Private( data );
};
//##############################
// * 控制器 - 显示/隐藏【标准函数】
//
//			参数：	> visible 布尔（是否显示）
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_BBa_Controller.prototype.drill_controller_setVisible = function( visible ){
	var data = this._drill_data;
	data['visible'] = visible;
};
//##############################
// * 控制器 - 暂停/继续【标准函数】
//
//			参数：	> enable 布尔
//			返回：	> 无
//			
//			说明：	> 可放在帧刷新函数中实时调用。
//##############################
Drill_BBa_Controller.prototype.drill_controller_setPause = function( pause ){
	var data = this._drill_data;
	data['pause'] = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_BBa_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_BBa_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * 控制器 - 切换混合模式【标准函数】
//
//			参数：	> blendMode 数字
//			返回：	> 无
//##############################
Drill_BBa_Controller.prototype.drill_controller_setBlendMode = function( blendMode ){
	var data = this._drill_data;
	data['blendMode'] = blendMode;
};
//##############################
// * 控制器 - 切换战斗层级【标准函数】
//
//			参数：	> layerIndex 字符串
//			返回：	> 无
//##############################
Drill_BBa_Controller.prototype.drill_controller_setLayerIndex = function( layerIndex ){
	var data = this._drill_data;
	data['layerIndex'] = layerIndex;
};
//##############################
// * 控制器 - 切换图片层级【标准函数】
//
//			参数：	> zIndex 数字
//			返回：	> 无
//##############################
Drill_BBa_Controller.prototype.drill_controller_setZIndex = function( zIndex ){
	var data = this._drill_data;
	data['zIndex'] = zIndex;
};

//##############################
// * 控制器 - 初始化数据【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> data 动态参数对象（来自类初始化）
//					  该对象包含 类所需的所有默认值。
//##############################
Drill_BBa_Controller.prototype.drill_controller_initData = function(){
	var data = this._drill_data;
	
	// > 控制器
	if( data['visible'] == undefined ){ data['visible'] = true };									//控制器 - 显示情况
	if( data['pause'] == undefined ){ data['pause'] = false };										//控制器 - 暂停情况
	
	// > 贴图
	if( data['src_img'] == undefined ){ data['src_img'] = "" };										//贴图 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Battle__layer/" };			//贴图 - 文件夹
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };									//贴图 - 混合模式
	if( data['tint'] == undefined ){ data['tint'] = 0 };											//贴图 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };									//贴图 - 图像-模糊边缘
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "上层" };							//贴图 - 战斗层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };										//贴图 - 图片层级
	
	// > A主体
	if( data['x'] == undefined ){ data['x'] = 0 };													//A主体 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };													//A主体 - 平移Y
	if( data['parentRotate'] == undefined ){ data['parentRotate'] = 0 };							//A主体 - 平铺的旋转角度
	
	// > B基本变化
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };									//B基本变化 - 透明度
	if( data['speedX'] == undefined ){ data['speedX'] = 0 };										//B基本变化 - 背景X速度
	if( data['speedY'] == undefined ){ data['speedY'] = 0 };										//B基本变化 - 背景Y速度
	
	// > C镜头参数（无）
	
	// > D指令叠加变化（无）
	
	// > E延迟指令（无）
	
	// > F自变化效果
	//	（见 静态数据）
}
//==============================
// * 初始化 - 初始化子功能
//==============================
Drill_BBa_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();				//初始化子功能 - A主体
	this.drill_controller_initChange();				//初始化子功能 - B基本变化
	this.drill_controller_initCamera();				//初始化子功能 - C镜头参数
	this.drill_controller_initCommandChange();		//初始化子功能 - D指令叠加变化
	this.drill_controller_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_controller_initEffect();				//初始化子功能 - F自变化效果
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_BBa_Controller.prototype.drill_controller_resetData_Private = function( data ){
	
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
// * A主体 - 初始化子功能
//==============================
Drill_BBa_Controller.prototype.drill_controller_initAttr = function() {
	var data = this._drill_data;
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_BBa_Controller.prototype.drill_controller_updateAttr = function() {
	var data = this._drill_data;
	
	// > 时间流逝
	this._drill_curTime += 1;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_BBa_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_BBa_checkNaN == true ){
		if( isNaN( this._drill_x ) ){
			DrillUp.g_BBa_checkNaN = false;
			alert( DrillUp.drill_BBa_getPluginTip_ParamIsNaN( "_drill_x" ) );
		}
		if( isNaN( this._drill_y ) ){
			DrillUp.g_BBa_checkNaN = false;
			alert( DrillUp.drill_BBa_getPluginTip_ParamIsNaN( "_drill_y" ) );
		}
		if( isNaN( this._drill_opacity ) ){
			DrillUp.g_BBa_checkNaN = false;
			alert( DrillUp.drill_BBa_getPluginTip_ParamIsNaN( "_drill_opacity" ) );
		}
		if( isNaN( this._drill_scaleX ) ){
			DrillUp.g_BBa_checkNaN = false;
			alert( DrillUp.drill_BBa_getPluginTip_ParamIsNaN( "_drill_scaleX" ) );
		}
		if( isNaN( this._drill_scaleY ) ){
			DrillUp.g_BBa_checkNaN = false;
			alert( DrillUp.drill_BBa_getPluginTip_ParamIsNaN( "_drill_scaleY" ) );
		}
	}
}

//==============================
// * B基本变化 - 初始化子功能
//==============================
Drill_BBa_Controller.prototype.drill_controller_initChange = function() {
	var data = this._drill_data;
	
	// > 贴图 - 位置
	this._drill_x = 0;
	this._drill_y = 0;
	this._drill_selfXAcc = 0;					//（自累积位移）
	this._drill_selfYAcc = 0;					//
	this._drill_selfXSpeed = data['speedX'];	//（自累积移动速度）
	this._drill_selfYSpeed = data['speedY'];	//
	
	// > 贴图 - 透明度
	this._drill_opacity = data['opacity'];
	
	// > 贴图 - 缩放
	this._drill_scaleX = 1;
	this._drill_scaleY = 1;
	this._drill_skewX = 0;
	this._drill_skewY = 0;
	
	// > 贴图 - 旋转
	this._drill_rotation = data['parentRotate'];	//（平铺的旋转角度）
	this._drill_rotationChange = 0;
	
	// > 贴图 - 平铺范围
	this._drill_move_x = 0;
	this._drill_move_y = 0;
	this._drill_move_w = Graphics.boxWidth;
	this._drill_move_h = Graphics.boxHeight;
}
//==============================
// * B基本变化 - 帧刷新 位置
//==============================
Drill_BBa_Controller.prototype.drill_controller_updateChange_Position = function(){
	var data = this._drill_data;
	
	// > 贴图 - 位置
	var xx = 0;
	var yy = 0;
	xx += data['x'];
	yy += data['y'];
	
	// > 自累积位移
	this._drill_selfXAcc += this._drill_selfXSpeed;
	this._drill_selfYAcc += this._drill_selfYSpeed;
	xx += this._drill_selfXAcc;
	yy += this._drill_selfYAcc;
	
	this._drill_x = xx;
	this._drill_y = yy;
}
//==============================
// * B基本变化 - 帧刷新 旋转
//==============================
Drill_BBa_Controller.prototype.drill_controller_updateChange_Rotation = function(){
	var data = this._drill_data;
	
	// > 贴图 - 旋转
	this._drill_rotation = data['parentRotate'];
	this._drill_rotation += this._drill_rotationChange;
}
//==============================
// * B基本变化 - 帧刷新 平铺范围
//==============================
Drill_BBa_Controller.prototype.drill_controller_updateChange_MoveRange = function(){
	if( this._drill_rotation == 0 && 
		this._drill_scaleX == 1 && 
		this._drill_scaleY == 1 ){ return; }
		
	// > 平铺背景有旋转角度时，直接按最大的来（矩形的对角线长度*根号2）
	var d_len = Math.sqrt( (Graphics.boxWidth*Graphics.boxWidth + Graphics.boxHeight*Graphics.boxHeight)*2 )
	var border_w = (d_len - Graphics.boxWidth) *0.5;
	var border_h = (d_len - Graphics.boxHeight)*0.5;
	
	this._drill_move_x = -1 * border_w;
	this._drill_move_y = -1 * border_h;
	this._drill_move_w = Graphics.boxWidth  + border_w*2;	//（宽度就是 d_len）
	this._drill_move_h = Graphics.boxHeight + border_h*2;	//（高度就是 d_len）
	
	// > 锁定锚点
	var point = $gameTemp.drill_BBa_Math2D_getFixPointInAnchor(
		0, 0,
		0.5, 0.5,
		this._drill_move_w, this._drill_move_h,
		this._drill_rotation *Math.PI/180,
		this._drill_scaleX,
		this._drill_scaleY
	);
	
	this._drill_move_x += point.x;
	this._drill_move_y += point.y;
}
//==============================
// * B基本变化 - 锁定锚点
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
Game_Temp.prototype.drill_BBa_Math2D_getFixPointInAnchor = function( 
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
// * C镜头参数 - 初始化子功能
//
//			说明：	> 战斗界面 不具备循环积累值 的位移。
//==============================
Drill_BBa_Controller.prototype.drill_controller_initCamera = function() {
	var data = this._drill_data;
	
	this._drill_cameraResultSpriteX = 0;	//镜头位移结果
	this._drill_cameraResultSpriteY = 0;
}


//==============================
// * D指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A变化叠加器 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_BBa_Controller.prototype.drill_controller_initCommandChange = function() {
	var data = this._drill_data;
	
	// > 控制器参数 - 移动到
	this["_drill_command_move_data"] = undefined;
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 移动速度X
	this["_drill_command_speedX_data"] = undefined;
	// > 控制器参数 - 移动速度Y
	this["_drill_command_speedY_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	
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
Drill_BBa_Controller.prototype.drill_controller_updateCommandChange = function(){
	var data = this._drill_data;
	
	// > 帧刷新 - 移动到（二维弹道）
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_update( this, "_drill_command_move_data" );
	
	// > 帧刷新 - 透明度
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_opacity_data" );
	
	// > 帧刷新 - 移动速度X
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_speedX_data" );
	// > 帧刷新 - 移动速度Y
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_speedY_data" );
	
	// > 帧刷新 - 旋转
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_update( this, "_drill_command_rotate_data" );
	
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
Drill_BBa_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
	// > 控制器参数 - 透明度
	this["_drill_command_opacity_data"] = undefined;
	
	// > 控制器参数 - 移动速度X
	this["_drill_command_speedX_data"] = undefined;
	// > 控制器参数 - 移动速度Y
	this["_drill_command_speedY_data"] = undefined;
	
	// > 控制器参数 - 旋转
	this["_drill_command_rotate_data"] = undefined;
	
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
Drill_BBa_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = undefined;
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动到
//==============================
Drill_BBa_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", 0, 0,		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 透明度
//==============================
Drill_BBa_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动速度X
//==============================
Drill_BBa_Controller.prototype.drill_controller_commandChange_setSpeedX = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedX_data", data['speedX'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动速度Y
//==============================
Drill_BBa_Controller.prototype.drill_controller_commandChange_setSpeedY = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedY_data", data['speedY'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 旋转
//==============================
Drill_BBa_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", 0,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放X
//==============================
Drill_BBa_Controller.prototype.drill_controller_commandChange_setScaleX = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleX_data", 1,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放Y
//==============================
Drill_BBa_Controller.prototype.drill_controller_commandChange_setScaleY = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", 1,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切X
//==============================
Drill_BBa_Controller.prototype.drill_controller_commandChange_setSkewX = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewX_data", 0,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切Y
//==============================
Drill_BBa_Controller.prototype.drill_controller_commandChange_setSkewY = function( change_type, tar_value, tar_time ){
	var data = this._drill_data;
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewY_data", 0,	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}


//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_BBa_Controller.prototype.drill_controller_initDelayingCommand = function() {
	var data = this._drill_data;
	this._drill_curDelayingCommandTank = [];
}
//==============================
// * E延迟指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_BBa_Controller.prototype.drill_controller_updateDelayingCommandImportant = function(){
	var data = this._drill_data;
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
Drill_BBa_Controller.prototype.drill_controller_updateDelayingCommand = function(){
	var data = this._drill_data;
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
			}else if( method == "drill_controller_commandChange_setSpeedX" ){
				this.drill_controller_commandChange_setSpeedX( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setSpeedY" ){
				this.drill_controller_commandChange_setSpeedY( paramList[0], paramList[1], paramList[2] );
			}else if( method == "drill_controller_commandChange_setRotate" ){
				this.drill_controller_commandChange_setRotate( paramList[0], paramList[1], paramList[2] );
				
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
Drill_BBa_Controller.prototype.drill_controller_setDelayingCommand = function( method, paramList, delay_time ){
	if( method != "drill_controller_setVisible" &&
		method != "drill_controller_setPause" &&
		
		method != "drill_controller_commandChange_setOpacity" &&
		method != "drill_controller_commandChange_setSpeedX" &&
		method != "drill_controller_commandChange_setSpeedY" &&
		method != "drill_controller_commandChange_setRotate" &&
		
		method != "drill_controller_commandChange_setScaleX" &&
		method != "drill_controller_commandChange_setScaleY" &&
		method != "drill_controller_commandChange_setSkewX" &&
		method != "drill_controller_commandChange_setSkewY" &&
		method != "drill_controller_commandChange_restoreAttr" &&
		
		method != "drill_controller_commandChange_setMove" &&
		method != "drill_controller_commandChange_restoreMove"
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
Drill_BBa_Controller.prototype.drill_controller_clearDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}


//==============================
// * F自变化效果 - 初始化子功能
//==============================
Drill_BBa_Controller.prototype.drill_controller_initEffect = function() {
	var data = this._drill_data;
	this._drill_curEffectTime = 0;
}
//==============================
// * F自变化效果 - 帧刷新
//==============================
Drill_BBa_Controller.prototype.drill_controller_updateEffect = function(){
	var data = this._drill_data;
	this._drill_curEffectTime += 1;
}



//=============================================================================
// ** 战斗背景贴图【Drill_BBa_Sprite】
// **
// **		作用域：	战斗界面
// **		主功能：	> 定义一个背景贴图。
// **		子功能：	->贴图
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					->A主体
// **					->B基本变化
// **						->层级位置修正
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **					->D指令叠加变化
// **						> 主体贴图>移动到
// **						> 主体贴图>透明度
// **						> 平铺贴图>移动速度X
// **						> 平铺贴图>移动速度Y
// **						> 主体贴图>旋转（中心锚点为左上角）
// **						> 主体贴图>缩放X
// **						> 主体贴图>缩放Y
// **						> 主体贴图>斜切X（中心锚点为左上角）
// **						> 主体贴图>斜切Y（中心锚点为左上角）
// **					->E延迟指令
// **					->F自变化效果
// **						> 平铺贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>缩放效果
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
// * 背景贴图 - 定义
//==============================
function Drill_BBa_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_BBa_Sprite.prototype = Object.create(Sprite.prototype);
Drill_BBa_Sprite.prototype.constructor = Drill_BBa_Sprite;
//==============================
// * 背景贴图 - 初始化
//==============================
Drill_BBa_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 背景贴图 - 帧刷新
//==============================
Drill_BBa_Sprite.prototype.update = function() {
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A主体
	this.drill_sprite_updateChange();				//帧刷新 - B基本变化
													//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateCommandChange();		//帧刷新 - D指令叠加变化
													//帧刷新 - E延迟指令（无）
	this.drill_sprite_updateEffect();				//帧刷新 - F自变化效果
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_BBa_Sprite.prototype.drill_sprite_setController = function( controller ){
	this._drill_controller = controller;
};
//##############################
// * C对象绑定 - 贴图初始化【开放函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行初始化。
//##############################
Drill_BBa_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B基本变化
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initCommandChange();		//初始化子功能 - D指令叠加变化
	this.drill_sprite_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_sprite_initEffect();				//初始化子功能 - F自变化效果
};

//##############################
// * 背景贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_BBa_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 背景贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_BBa_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 背景贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_BBa_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 背景贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_BBa_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 背景贴图 - 贴图初始化（私有）
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 背景贴图 - 销毁子功能（私有）
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	this._drill_layerSprite.removeChild( this._drill_childCircleSprite );
	this.removeChild( this._drill_layerSprite );
	this._drill_childCircleSprite = null;
	this._drill_layerSprite = null;
	
	// > 销毁 - B基本变化
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
};
//==============================
// * 背景贴图 - 销毁自身（私有）
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller._drill_data;
	
	// > 属性初始化
	this.x = 0;
	this.y = 0;
	this.visible = false;
	this.blendMode = data['blendMode'];
	this.layerIndex = data['layerIndex'];
	this.zIndex = data['zIndex'];
	
	// > 平铺贴图
	var temp_layer = new TilingSprite();
	temp_layer.move(0, 0, Graphics.width, Graphics.height);		//（填满游戏窗口）
	temp_layer.bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img'], data['tint'], data['smooth'] );
	temp_layer.origin.x = data['x'];
	temp_layer.origin.y = data['y'];
	temp_layer.blendMode = data['blendMode'];
	this._drill_layerSprite = temp_layer;
	
	// > 平铺范围（平铺的旋转角度用）
	this._drill_spriteMove_x = 0;
	this._drill_spriteMove_y = 0;
	this._drill_spriteMove_w = Graphics.boxWidth;
	this._drill_spriteMove_h = Graphics.boxHeight;
	
	// > 【战斗 - 活动战斗镜头】镜头架高宽的影响
	if( Imported.Drill_BattleCamera ){
		temp_layer.move(
			( Graphics.width - $gameSystem._drill_cam_limit_width )*0.5, 
			( Graphics.height - $gameSystem._drill_cam_limit_height )*0.5, 
			$gameSystem._drill_cam_limit_width, 
			$gameSystem._drill_cam_limit_height
		);
	}
	
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_updateAttr = function() {
	var data = this._drill_controller._drill_data;
	
	// > 贴图 - 贴图属性
	this.scale.x = this._drill_controller._drill_scaleX;
	this.scale.y = this._drill_controller._drill_scaleY;
	this.skew.x = this._drill_controller._drill_skewX;
	this.skew.y = this._drill_controller._drill_skewY;
	this.opacity = this._drill_controller._drill_opacity;
	this.visible = data['visible'];
	
	// > 贴图 - 旋转（平铺贴图）（背景旋转的中心锚点在左上角）
	this._drill_layerSprite.rotation = this._drill_controller._drill_rotation *Math.PI/180;
	
	// > 贴图 - 平铺范围（平铺贴图）（平铺的旋转角度）
	if( this._drill_spriteMove_x != this._drill_controller._drill_move_x ||
		this._drill_spriteMove_y != this._drill_controller._drill_move_y ||
		this._drill_spriteMove_w != this._drill_controller._drill_move_w ||
		this._drill_spriteMove_h != this._drill_controller._drill_move_h ){
		this._drill_spriteMove_x = this._drill_controller._drill_move_x;
		this._drill_spriteMove_y = this._drill_controller._drill_move_y;
		this._drill_spriteMove_w = this._drill_controller._drill_move_w;
		this._drill_spriteMove_h = this._drill_controller._drill_move_h;
		
		this._drill_layerSprite.move(
			this._drill_spriteMove_x,
			this._drill_spriteMove_y,
			this._drill_spriteMove_w,
			this._drill_spriteMove_h
		);
	}
	
	// > 基于资源切割的框架移动
	//var hh = this._drill_layerSprite.bitmap.height;
	//if( hh > 0 ){
	//	var xx = 100 * Math.sin( this._drill_controller._drill_curTime/2 *Math.PI/180 );
	//	this._drill_layerSprite.setFrame(xx,0,140,hh);
	//}
}


//==============================
// * B基本变化 - 初始化子功能
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_initChange = function(){
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * B基本变化 - 帧刷新
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_updateChange = function() {
	var data = this._drill_controller._drill_data;
	
	// > 位置 - 层级位置修正
	//		（镜头位移结果，见函数 drill_BBa_updateControllerCamera ）
	var xx = this._drill_controller._drill_x;
	var yy = this._drill_controller._drill_y;
	xx += this._drill_controller._drill_cameraResultSpriteX;
	yy += this._drill_controller._drill_cameraResultSpriteY;
	this._drill_layerSprite.origin.x = xx;
	this._drill_layerSprite.origin.y = yy;
	
	
	// > 透明度（无）
	
	// > 缩放（无）
	
	// > 旋转（无）
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * D指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A变化叠加器 贴图部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_initCommandChange = function() {
	var data = this._drill_controller._drill_data;
	
	// > 贴图参数 - 移动到
	this["_drill_command_move_spriteData"] = undefined;
	
	// > 贴图参数 - 透明度
	this["_drill_command_opacity_spriteData"] = undefined;
	
	// > 贴图参数 - 移动速度X
	this["_drill_command_speedX_spriteData"] = undefined;
	// > 贴图参数 - 移动速度Y
	this["_drill_command_speedY_spriteData"] = undefined;
	
	// > 贴图参数 - 旋转
	this["_drill_command_rotate_spriteData"] = undefined;
	
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
// * D指令叠加变化 - 帧刷新
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_updateCommandChange = function(){
	var data = this._drill_controller._drill_data;
	var controller = this._drill_controller;
	
	// > 移动到 - 帧刷新
	var CDataName = "_drill_command_move_data";
	var SDataName = "_drill_command_move_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动到 - 贴图赋值
	if( controller[CDataName] != undefined ){
		this._drill_layerSprite.origin.x += controller[CDataName]['cur_valueA'];
		this._drill_layerSprite.origin.y += controller[CDataName]['cur_valueB'];
	}
	
	
	// > 透明度 - 帧刷新
	var CDataName = "_drill_command_opacity_data";
	var SDataName = "_drill_command_opacity_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 透明度 - 贴图赋值（覆盖）
	if( controller[CDataName] != undefined ){
		this.opacity = controller[CDataName]['cur_value'];
	}
	
	
	// > 移动速度X - 帧刷新
	var CDataName = "_drill_command_speedX_data";
	var SDataName = "_drill_command_speedX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动速度X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_selfXSpeed = controller[CDataName]['cur_value'];
	}else{
		controller._drill_selfXSpeed = data['speedX'];	//（没有数据时，赋值为 初始值）
	}
	
	// > 移动速度Y - 帧刷新
	var CDataName = "_drill_command_speedY_data";
	var SDataName = "_drill_command_speedY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动速度Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_selfYSpeed = controller[CDataName]['cur_value'];
	}else{
		controller._drill_selfYSpeed = data['speedY'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 旋转 - 帧刷新
	var CDataName = "_drill_command_rotate_data";
	var SDataName = "_drill_command_rotate_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 旋转 - 控制器赋值
	if( controller[CDataName] != undefined ){
		controller._drill_rotationChange = controller[CDataName]['cur_value'];	//（平铺的旋转角度）
	}else{
		controller._drill_rotationChange = 0;	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 缩放X - 帧刷新
	var CDataName = "_drill_command_scaleX_data";
	var SDataName = "_drill_command_scaleX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_scaleX = controller[CDataName]['cur_value'];
	}else{
		controller._drill_scaleX = 1;	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 缩放Y - 帧刷新
	var CDataName = "_drill_command_scaleY_data";
	var SDataName = "_drill_command_scaleY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 缩放Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_scaleY = controller[CDataName]['cur_value'];
	}else{
		controller._drill_scaleY = 1;	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 斜切X - 帧刷新
	var CDataName = "_drill_command_skewX_data";
	var SDataName = "_drill_command_skewX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 斜切X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_skewX = controller[CDataName]['cur_value'];
	}else{
		controller._drill_skewX = 0;	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 斜切Y - 帧刷新
	var CDataName = "_drill_command_skewY_data";
	var SDataName = "_drill_command_skewY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 斜切Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_skewY = controller[CDataName]['cur_value'];
	}else{
		controller._drill_skewY = 0;	//（没有数据时，赋值为 初始值）
	}
}


//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_initDelayingCommand = function() {
	//（无）
}


//==============================
// * F自变化效果 - 初始化子功能
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_initEffect = function() {
	var data = this._drill_controller._drill_data;
	//（无）
}
//==============================
// * F自变化效果 - 帧刷新
//==============================
Drill_BBa_Sprite.prototype.drill_sprite_updateEffect = function(){
	var data = this._drill_controller._drill_data;
	var cur_time = this._drill_controller._drill_curEffectTime;
	
	// > 浮动效果
	if( data['effect_float'] == "左右浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.x += value;
	}
	if( data['effect_float'] == "上下浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.y += value;
	}
	if( data['effect_float'] == "左上右下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.x += value;
		this._drill_layerSprite.origin.y += value;
	}
	if( data['effect_float'] == "右上左下斜向浮动" ){
		var speed = data['effect_floatSpeed'];
		var range = data['effect_floatRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this._drill_layerSprite.origin.x -= value;
		this._drill_layerSprite.origin.y += value;
	}
	// > 闪烁效果
	if( data['effect_flicker'] == "开启" ){
		var speed = data['effect_flickerSpeed'];
		var range = data['effect_flickerRange'];
		this.opacity += range * Math.sin( cur_time * speed /180*Math.PI );
	}
	// > 缩放效果
	if( data['effect_zoom'] == "左右缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.scale.x += value;
	}
	if( data['effect_zoom'] == "上下缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.scale.y += value;
	}
	if( data['effect_zoom'] == "整体缩放" ){
		var speed = data['effect_zoomSpeed'];
		var range = data['effect_zoomRange'];
		var value = range * Math.sin( cur_time * speed /180*Math.PI );
		this.scale.x += value;
		this.scale.y += value;
	}
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BattleBackground = false;
		var pluginTip = DrillUp.drill_BBa_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


