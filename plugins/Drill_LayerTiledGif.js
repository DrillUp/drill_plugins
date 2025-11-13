//=============================================================================
// Drill_LayerTiledGif.js
//=============================================================================

/*:
 * @plugindesc [v1.9]        地图 - 多层地图平铺GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "平铺GIF-%d"
 * @Drill_LE_parentKey "---平铺GIF组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LTG_layers_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerTiledGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在地图界面中放置一个或者多个平铺GIF。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 基于：
 *   - Drill_CoreOfBallistics      数学模型-弹道核心★★v2.2及以上★★
 * 可被扩展：
 *   - Drill_LayerDynamicMaskA     地图-地图动态遮罩板A
 *   - Drill_LayerDynamicMaskB     地图-地图动态遮罩板B
 *     地图平铺GIF可添加动态遮罩，实现玩家通过 透视镜 看到局部图像的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于地图层级。
 * 2.该插件可以装饰地图的各种层级。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-地图界面）.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 地图绑定：
 *   (1.每个配置绑定到一个指定的地图，可以多个配置绑定到同一个地图。
 *      注意配置中"所属地图"参数，"所属地图"要与你的地图id相对应。
 *   (2.留意游戏编辑器下方的状态栏，地图id、坐标、缩放比例、事件id
 *      都有信息显示。
 * 地图层级：
 *   (1.你可以将贴图放置在地图的五种层级中，分别为：
 *      下层、中层、上层、图片层、最顶层
 *   (2.地图层级之间的关系为：
 *      地图远景 < 下层 < 图块层 < 中层 < 事件/玩家层 < 上层
 *      < 图片对象层 < 图片层 < 对话框集合 < 最顶层
 *   (3.处于最顶层，可以把地图界面的对话框、窗口也给挡住。
 *   (4.处于同一 地图层级 时，将根据 图片层级 再先后排序。
 *   (5.如果你设置了平铺GIF在 中层 ，你会发现平铺GIF可能会切割图块画的
 *      树木。这是因为树木图块上方能够挡住事件，而下方被事件遮挡。
 *      根据图层的先后关系，平铺GIF的切割树木现象是正常情况。
 * 位移比：
 *   (1.根据物理相对运动知识，近大远小，近快远慢的原则。要让远景看起
 *      来真的像”远景”，那需要设置位移比接近1.00，越接近1.00越远。
 *   (2.需要注意的是，地图远景和镜头位移比固定是0.00，所以地图远景
 *      每次调整都感觉不像远景，你需要换掉适合的含位移比的图层。
 *   (3.注意，位移比是根据 镜头 移动而移动，不是根据玩家移动而移动。
 *   (4.去看看最新版本的 文档图解 介绍，
 *      这里是看起来简单但是实际做起来非常复杂的坑。
 * 细节：
 *   (1.插件指令操作的变化结果，是永久性的。
 *   (2.操作隐藏的平铺GIF 或者 操作其他地图的平铺GIF，插件指令都会有效。
 *      注意，插件指令变化的是增量，增加用正数，减少用负数。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 设计：
 *   (1.配置 作用于所有地图 并且 放置到最顶层 后，可通过插件指令实现转
 *      场动画的效果。
 *      具体去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__layer_gif （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__layer_gif文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 平铺GIF1 资源-平铺GIF
 * 平铺GIF2 资源-平铺GIF
 * 平铺GIF3 资源-平铺GIF
 * ……
 *
 * 所有素材都放在Map__layer_gif文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改单属性
 * 你可以通过插件指令手动修改各个属性：
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 显示
 * 插件指令：>地图平铺GIF : 平铺GIF变量[21] : 显示
 * 插件指令：>地图平铺GIF : 批量平铺GIF[7,8] : 显示
 * 插件指令：>地图平铺GIF : 批量平铺GIF变量[21,22] : 显示
 *
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 显示
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 隐藏
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 暂停
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 继续
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 切换混合模式[0]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 切换地图层级[下层]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 切换图片层级[10]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 透明度变量[21] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 旋转[90] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 旋转变量[21] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 移动速度X[1.5] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 移动速度X变量%[21] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 移动速度Y[1.5] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 移动速度Y变量%[21] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 缩放X[1.2] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 缩放X变量%[21] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 缩放Y[1.2] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 缩放Y变量%[21] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 斜切X[0.2] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 斜切X变量%[21] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 斜切Y[0.2] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性 : 斜切Y变量%[21] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 立即还原所有单属性
 * 
 * 1.前半部分（平铺GIF变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有4*24种组合方式。
 * 2.注意，如果你想永久保持插件指令的改变结果，则需要开启 参数存储 。
 *   参数存储默认关闭，即 插件指令 的所有改变在读取存档后都会复原。
 * 3.插件指令的变化是永久性的。
 *   修改后的变化能与 配置的自变化效果 叠加，但是实际效果一般都不太好。
 * 4."切换地图层级["能切换的层级为：下层、中层、上层、图片层、最顶层。
 * 5.由于底层变化较大，插件不再支持以前版本的旧指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 移动到
 * 你可以通过插件指令手动设置移动：
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到-匀速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到-弹性移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到-增减速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到-增减速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到-立即归位
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（移动到-匀速移动 : 位置[100,100] : 时间[60]）
 *   的参数可以随意组合。一共有4*7种组合方式。
 * 2.移动的初始位置以显示在地图界面的具体位置为基准，在基准位置上再进行移动到。
 *   指令中不含相对移动，比如多次执行移动到[20,20]，贴图只会到达一个固定的位置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取属性
 * 你可以通过插件指令来获取 地图平铺GIF 的属性值：
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>地图平铺GIF : 平铺GIF变量[21] : 获取属性 : 位置X : 变量[21]
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 位置Y : 变量[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 透明度 : 变量[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 旋转 : 变量[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 移动速度X : 变量%[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 移动速度Y : 变量%[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 缩放X : 变量%[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 缩放Y : 变量%[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 斜切X : 变量%[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 获取属性 : 斜切Y : 变量%[21]
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（获取属性 : 位置X : 变量[21]）
 *   的参数可以随意组合。一共有2*10种组合方式。
 * 2."变量%["表示该变量获取到属性时，会乘以100倍。因为变量只能存整数。
 *   比如缩放值为1.2时，则获取到： 1.2 * 100 = 120。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - GIF播放
 * 你还可以通过插件指令控制GIF播放：
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 锁定帧
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 解锁帧
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 设置帧 : 当前帧[1]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 设置帧 : 当前帧变量[21]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 正向播放一次并停留在末尾帧
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 反向播放一次并停留在起始帧
 * 
 * 1.前半部分和后半部分的参数可以随意组合，一共有4*6种组合方式。
 * 2."设置当前帧"的 当前帧，1表示第1帧。
 *   你可以设置GIF锁定在某一帧，帧数与资源配置的id对应。
 * 3."正向播放一次并停留在末尾帧"表示强制该GIF播放重头到尾播放一次。
 *   播放完毕后，自动锁定到末尾帧。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟修改单属性
 * 上述的插件指令中，部分插件指令可以延迟执行：
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF变量[21] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 批量平铺GIF[7,8] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 批量平铺GIF变量[21,22] : 隐藏(延迟) : 延迟执行时间[20]
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 显示(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 暂停(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 继续(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 透明度[255] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 透明度变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 旋转[90] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 旋转变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 移动速度X[1.5] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 移动速度X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 移动速度Y[1.5] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 移动速度Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 缩放X[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 缩放X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 缩放Y[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 缩放Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 斜切X[0.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 斜切X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 斜切Y[0.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 斜切Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 还原所有单属性(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 立即取消全部延迟指令
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（隐藏(延迟) : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有4*22种组合方式。
 * 2.设置延迟指令后，指令会被暂存到延迟队列中，等待延迟时间结束之后，执行指令。
 *   "立即取消全部延迟指令"可以清空排在队列中的所有延迟指令。
 * 3.此功能可以简化 并行事件 的设计，你可以在串行事件中执行延迟，延迟后并行变化贴图。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟移动到
 * 上述的插件指令中，移动到的插件指令也可以延迟执行：
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到(延迟)-匀速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到(延迟)-弹性移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到(延迟)-弹性移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到(延迟)-增减速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到(延迟)-增减速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 移动到(延迟)-延迟归位 : 延迟执行时间[20]
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有4*7种组合方式。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟GIF播放
 * 上述的插件指令中，GIF播放也可以延迟执行：
 * 
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 锁定帧(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 解锁帧(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 设置帧(延迟) : 当前帧[1] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 设置帧(延迟) : 当前帧变量[21] : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 正向播放一次并停留在末尾帧(延迟) : 延迟执行时间[20]
 * 插件指令：>地图平铺GIF : 平铺GIF[11] : 反向播放一次并停留在起始帧(延迟) : 延迟执行时间[20]
 * 
 * 1.前半部分和后半部分的参数可以随意组合，一共有4*6种组合方式。
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
 * 测试方法：   在地图中放置8个平铺GIF，进行性能测试。
 * 测试结果：   200个事件的地图中，平均消耗为：【25.81ms】
 *              100个事件的地图中，平均消耗为：【18.98ms】
 *               50个事件的地图中，平均消耗为：【17.37ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.这些平铺GIF在隐藏或透明度为0的时候，由于图像未工作，所以不会
 *   造成多少消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了玩家移动时，出现1像素的轻微漂移的问题。
 * [v1.2]
 * 添加了 参数存储 功能开关，以及动态遮罩功能。
 * [v1.3]
 * 添加了平铺GIF的浮动效果设置。
 * [v1.4]
 * 梳理优化了位移比的结构。
 * [v1.5]
 * 优化了与地图活动镜头的兼容结构。
 * [v1.6]
 * 优化了旧存档的识别与兼容。
 * [v1.7]
 * 加强了插件结构，添加了修改单属性、移动到、自变化效果功能。
 * [v1.8]
 * 添加了延迟指令功能。
 * [v1.9]
 * 完善了变换功能的插件指令。
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
 * @param ---平铺GIF组 1至20---
 * @default
 *
 * @param 平铺GIF-1
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-2
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-3
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-4
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-5
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-6
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-7
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-8
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-9
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-10
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-11
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-12
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-13
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-14
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-15
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-16
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-17
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-18
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-19
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-20
 * @parent ---平铺GIF组 1至20---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组21至40---
 * @default
 *
 * @param 平铺GIF-21
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-22
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-23
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-24
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-25
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-26
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-27
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-28
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-29
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-30
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-31
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-32
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-33
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-34
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-35
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-36
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-37
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-38
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-39
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-40
 * @parent ---平铺GIF组21至40---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组41至60---
 * @default
 *
 * @param 平铺GIF-41
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-42
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-43
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-44
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-45
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-46
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-47
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-48
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-49
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-50
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-51
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-52
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-53
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-54
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-55
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-56
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-57
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-58
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-59
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-60
 * @parent ---平铺GIF组41至60---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组61至80---
 * @default
 *
 * @param 平铺GIF-61
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-62
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-63
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-64
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-65
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-66
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-67
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-68
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-69
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-70
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-71
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-72
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-73
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-74
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-75
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-76
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-77
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-78
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-79
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-80
 * @parent ---平铺GIF组61至80---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组81至100---
 * @default
 *
 * @param 平铺GIF-81
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-82
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-83
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-84
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-85
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-86
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-87
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-88
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-89
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-90
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-91
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-92
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-93
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-94
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-95
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-96
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-97
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-98
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-99
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-100
 * @parent ---平铺GIF组81至100---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组101至120---
 * @default
 *
 * @param 平铺GIF-101
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-102
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-103
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-104
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-105
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-106
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-107
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-108
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-109
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-110
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-111
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-112
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-113
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-114
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-115
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-116
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-117
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-118
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-119
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-120
 * @parent ---平铺GIF组101至120---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组121至140---
 * @default
 *
 * @param 平铺GIF-121
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-122
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-123
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-124
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-125
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-126
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-127
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-128
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-129
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-130
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-131
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-132
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-133
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-134
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-135
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-136
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-137
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-138
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-139
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-140
 * @parent ---平铺GIF组121至140---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组141至160---
 * @default
 *
 * @param 平铺GIF-141
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-142
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-143
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-144
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-145
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-146
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-147
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-148
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-149
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-150
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-151
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-152
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-153
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-154
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-155
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-156
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-157
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-158
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-159
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-160
 * @parent ---平铺GIF组141至160---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组161至180---
 * @default
 *
 * @param 平铺GIF-161
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-162
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-163
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-164
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-165
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-166
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-167
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-168
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-169
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-170
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-171
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-172
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-173
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-174
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-175
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-176
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-177
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-178
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-179
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-180
 * @parent ---平铺GIF组161至180---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF组181至200---
 * @default
 *
 * @param 平铺GIF-181
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-182
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-183
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-184
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-185
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-186
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-187
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-188
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-189
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-190
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-191
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-192
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-193
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-194
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-195
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-196
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-197
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-198
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-199
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF-200
 * @parent ---平铺GIF组181至200---
 * @type struct<LTGMapTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 */
/*~struct~LTGMapTiledGif:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的地图层==
 * 
 * @param ---绑定---
 * @default 
 *
 * @param 是否作用到所有地图
 * @parent ---绑定---
 * @type boolean
 * @on 作用到所有
 * @off 作用于指定地图
 * @desc 部分平铺GIF可以用作于场景变换，这个场景变化可以应用到所有地图。
 * @default false
 * 
 * @param 所属地图
 * @parent 是否作用到所有地图
 * @type number
 * @min 1
 * @desc 该平铺GIF将放在指定对应的地图id中。
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
 * @param 资源-平铺GIF
 * @parent ---贴图---
 * @desc 平铺GIF的图片资源。
 * @default ["(需配置)地图平铺GIF"]
 * @require 1
 * @dir img/Map__layer_gif/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 3
 *
 * @param 是否倒放
 * @parent ---贴图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 *
 * @param 平移-平铺GIF X
 * @parent ---贴图---
 * @desc x轴方向平移，正数向左，负数向右，单位像素。0为贴在最左边。这里表示进入地图时图片的初始位置。
 * @default 0
 *
 * @param 平移-平铺GIF Y
 * @parent ---贴图---
 * @desc y轴方向平移，正数向上，负数向下，单位像素。0为贴在最上面。这里表示进入地图时图片的初始位置。
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
 * @param 平铺GIF-X速度
 * @parent ---贴图---
 * @desc 平铺GIF按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0.0
 *
 * @param 平铺GIF-Y速度
 * @parent ---贴图---
 * @desc 平铺GIF按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0.0
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
 * @default 下层
 *
 * @param 图片层级
 * @parent ---贴图---
 * @type number
 * @min 0
 * @desc 平铺GIF在同一个地图层，先后排序的位置，0表示最后面。
 * @default 4
 *
 * @param 位移比X
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，平铺GIF和镜头的位移一致。设置0.00则平铺GIF不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移比Y
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，平铺GIF和镜头的位移一致。设置0.00则平铺GIF不随镜头移动，紧贴地图。负数则反向移动。
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
 * @param ---动态遮罩---
 * @desc 
 *
 * @param 是否启用地图动态遮罩
 * @parent ---动态遮罩---
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 设置后，平铺GIF会被 地图动态遮罩 遮住，通过特定的 透视镜 才能看到该平铺GIF的部分图像。
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
//		插件简称		LTG（Layer_Tiled_Gif）
//		临时全局变量	DrillUp.g_LTG_xxx
//		临时局部变量	this._drill_LTG_xxx
//		存储数据变量	$gameSystem._drill_LTG_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	地图管理层
//		★性能测试消耗	17.57ms  5.02ms（updateBase）
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
//			->☆地图层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			
//			->☆数据容器
//				->匹配全地图数据时
//				->匹配单地图数据时
//				->不匹配时
//			->☆控制器与贴图
//				->界面创建
//				->控制器与镜头
//					> 图块平移
//					> 位移比
//					> 循环积累值
//					->控制器帧刷新
//				->基础特性
//				->动态遮罩
//					->创建
//					->延迟创建
//				->销毁
//			
//			->地图平铺GIF控制器【Drill_LTG_Controller】
//				->A主体
//				->B变换特性
//				->C镜头参数
//				->D播放GIF
//					->设置帧
//					->锁定帧/解锁帧
//					->单次播放
//				->E指令叠加变化
//				->F延迟指令
//				->G自变化效果
//			->地图平铺GIF贴图【Drill_LTG_Sprite】
//				->A主体
//				->B变换特性
//				->C对象绑定
//				->D播放GIF
//				->E指令叠加变化-控制器用
//				->F延迟指令
//				->G自变化效果
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰-地图界面）（脚本）.docx
//		
//		★插件私有类：
//			* 地图平铺GIF控制器【Drill_LTG_Controller】
//			* 地图平铺GIF贴图【Drill_LTG_Sprite】
//		
//		★必要注意事项：
//			1. 地图界面全层级关系：
//				Spriteset： LowerLayer：	地图远景 < 下层 < 图块层 < 中层 < 事件/玩家层 < 鼠标目的地 < 上层 < 天气层
//							UpperLayer：	< 图片对象层 < (时间框层) < (闪烁幕布层) < 图片层
//											< MOG的ui层【_hudField】 < ui层【_drill_map_top_board】
//				AllWindows：WindowLayer：	< 对话框集合 < 滚动文本画布 < 最顶层【_drill_SenceTopArea】
//			2.使用插件指令变化时，changing将会作为一个变化容器，根据时间对【数据】进行改变。
//			3.原理基于【定量】赋值，【你直接用_displayX就可以了】,增量赋值方法绕太多远路！
//
//		★其它说明细节：
//			1.默认所有窗口都在 _windowLayer 中，通过addWindow添加。
//			  而最顶层就在 _windowLayer 的后面，作为另外一个父类层。
//			2.在游戏使用事件指令"结束游戏"后，让玩家移动，会造成图层错位问题。
//			  这是 this.isActive() 控制的帧刷新过滤造成的。现在已经去掉。
//			（此active的真实意义和机制暂时未知，所以这里只能当做一个特殊情况记录下来。）
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
	DrillUp.g_LTG_PluginTip_curName = "Drill_LayerTiledGif.js 地图-多层地图平铺GIF";
	DrillUp.g_LTG_PluginTip_baseList = ["Drill_CoreOfBallistics.js 数学模型-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_LTG_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_LTG_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_LTG_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_LTG_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_LTG_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_LTG_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_LTG_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_LTG_getPluginTip_ParamIsNaN = function( param_name ){
		return "【" + DrillUp.g_LTG_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_LTG_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_LTG_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LTG_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_LTG_PluginTip_curName + "】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LTG_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_LTG_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 控制器的非数字参数
	//==============================
	DrillUp.drill_LTG_getPluginTip_controllerData_NotId = function( class_name ){
		return "【" + DrillUp.g_LTG_PluginTip_curName + "】\n错误，类对象 "+class_name+" 获取到了非数字参数，数据初始化失败。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_LayerTiledGif = true;
	Imported.Drill_LayerTiledGIF = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_LayerTiledGif');

	//==============================
	// * 静态数据 - 平铺GIF
	//				（~struct~LTGMapTiledGif）
	//==============================
	DrillUp.drill_LTG_backgroundInit = function( dataFrom ){
		var data = {};
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "false") == "true";
		data['map'] = Number( dataFrom["所属地图"] || 0);
		
		// > 预加载
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		
		// > 动态遮罩
		data['dynamicMask_enabled'] = String( dataFrom["是否启用地图动态遮罩"] || "false") == "true";
		data['dynamicMask_bind'] = String( dataFrom["关联的动态遮罩板"] || "动态遮罩板A");
		
		
		// > A主体 - 基础特性
		if( dataFrom["资源-平铺GIF"] != "" &&
			dataFrom["资源-平铺GIF"] != undefined ){
			data['src_img_gif'] = JSON.parse( dataFrom["资源-平铺GIF"] );
		}else{
			data['src_img_gif'] = [];
		}
		data['src_img_file'] = "img/Map__layer_gif/";
		data['interval'] = Number( dataFrom["帧间隔"] || 3);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = String( dataFrom["地图层级"] || "下层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体 - 其它特性
		data['pause'] = false;
		data['XPer'] = Number( dataFrom["位移比X"] || 0);
		data['YPer'] = Number( dataFrom["位移比Y"] || 0);
		data['tile_x'] = parseFloat( dataFrom["位移图块偏移 X"] || 0);
		data['tile_y'] = parseFloat( dataFrom["位移图块偏移 Y"] || 0);
		
		
		// > B变换特性
		data['x'] = Number( dataFrom["平移-平铺GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-平铺GIF Y"] || 0);
		data['speedX'] = Number( dataFrom["平铺GIF-X速度"] || 0);
		data['speedY'] = Number( dataFrom["平铺GIF-Y速度"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['parentRotate'] = Number( dataFrom["平铺的旋转角度"] || 0.0);
		
		// > B变换特性 - 平铺的缩放与斜切
		//	（无）
		
		
		// > D播放GIF
		data['gif_lock'] = String( dataFrom["初始是否锁定帧"] || "false") == "true";
		data['gif_initFrame'] = Number( dataFrom["锁定帧数"] || 0);
		
		// > G自变化效果
		data['effect_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['effect_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['effect_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		data['effect_flicker'] = String( dataFrom["闪烁效果"] || "关闭");
		data['effect_flickerSpeed'] = Number( dataFrom["闪烁速度"] || 6.0);
		data['effect_flickerRange'] = Number( dataFrom["闪烁幅度范围"] || 20);
		data['effect_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['effect_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['effect_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_LTG_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	/*-----------------平铺GIF------------------*/
	DrillUp.g_LTG_layers_length = 200;
	DrillUp.g_LTG_layers = [];
	for( var i = 0; i < DrillUp.g_LTG_layers_length; i++ ){
		if( DrillUp.parameters["平铺GIF-" + String(i+1) ] != undefined &&
			DrillUp.parameters["平铺GIF-" + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["平铺GIF-" + String(i+1) ]);
			DrillUp.g_LTG_layers[i] = DrillUp.drill_LTG_backgroundInit( temp );
		}else{
			DrillUp.g_LTG_layers[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_LTG_getPluginTip_NeedUpdate_Ballistics() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_LTG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_LTG_pluginCommand.call(this, command, args);
	this.drill_LTG_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_LTG_pluginCommand = function( command, args ){
	if( command === ">地图平铺GIF" ){ // >地图平铺GIF : 平铺GIF[1] : 显示
		
		/*-----------------对象组获取------------------*/
		var controllers = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( controllers == null && unit.indexOf("批量平铺GIF[") != -1 ){
				unit = unit.replace("批量平铺GIF[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = Number(temp_arr[k]);
					var temp_controller = $gameSystem._drill_LTG_dataTank_curController[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("批量平铺GIF变量[") != -1 ){
				unit = unit.replace("批量平铺GIF变量[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = $gameVariables.value(Number(temp_arr[k]));
					var temp_controller = $gameSystem._drill_LTG_dataTank_curController[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("平铺GIF变量[") != -1 ){
				unit = unit.replace("平铺GIF变量[","");
				unit = unit.replace("]","");
				var controller_id = $gameVariables.value(Number(unit));
				var temp_controller = $gameSystem._drill_LTG_dataTank_curController[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit.indexOf("平铺GIF[") != -1 ){
				unit = unit.replace("平铺GIF[","");
				unit = unit.replace("]","");
				var controller_id = Number(unit);
				var temp_controller = $gameSystem._drill_LTG_dataTank_curController[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
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
			if( type.indexOf("切换地图层级[") != -1 ){
				type = type.replace("切换地图层级[","");
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
		
		/*-----------------获取属性------------------*/
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			if( type == "获取属性" ){
				temp2 = temp2.replace("变量[","");
				temp2 = temp2.replace("变量%[","");
				temp2 = temp2.replace("]","");
				if( temp1 == "位置X" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_x );
				}
				if( temp1 == "位置Y" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_y );
				}
				if( temp1 == "透明度" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_opacity );
				}
				if( temp1 == "旋转" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_rotate );
				}
				if( temp1 == "移动速度X" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_selfXSpeed *100 );
				}
				if( temp1 == "移动速度Y" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_selfYSpeed *100 );
				}
				if( temp1 == "缩放X" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_scaleX *100 );
				}
				if( temp1 == "缩放Y" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_scaleY *100 );
				}
				if( temp1 == "斜切X" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_skewX *100 );
				}
				if( temp1 == "斜切Y" ){
					$gameVariables.setValue( Number(temp2), controllers[0]._drill_change_skewY *100 );
				}
			}
		}
		
		/*-----------------D播放GIF------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "锁定帧" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_GIF_setLocked( true );
				}
			}
			if( type == "解锁帧" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_GIF_setLocked( false );
				}
			}
			if( type == "正向播放一次并停留在末尾帧" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_GIF_setOncePlay( "forwardRun" );
				}
			}
			if( type == "反向播放一次并停留在起始帧" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_GIF_setOncePlay( "backRun" );
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var num_list = this.drill_LTG_getArgNumList( temp1 );
			
			if( type == "设置帧" || type == "设置当前帧" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_GIF_setFrame( num_list[0]-1 );
				}
			}
		}
		
		/*-----------------E指令叠加变化------------------*/
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
				
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setOpacity(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setRotate(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("移动速度X[") != -1 ||
					temp1.indexOf("移动速度X变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSpeedX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ||
					temp1.indexOf("移动速度Y变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSpeedY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ||
					temp1.indexOf("斜切X变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSkewX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ||
					temp1.indexOf("斜切Y变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
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
					var num_list = this.drill_LTG_getArgNumList(temp1);
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
					var num_list = this.drill_LTG_getArgNumList(temp1);
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
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setMove(
							"增减速变化", num_list[0], num_list[1], Number(temp2)
						);
					}
				}
			}
		}
		
		/*-----------------F延迟指令------------------*/
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
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setOpacity", 
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setRotate",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("移动速度X[") != -1 ||
					temp1.indexOf("移动速度X变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSpeedX",
							["匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ||
					temp1.indexOf("移动速度Y变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSpeedY",
							["匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleY",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ||
					temp1.indexOf("斜切X变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSkewX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ||
					temp1.indexOf("斜切Y变量%[") != -1 ){
					var num_list = this.drill_LTG_getArgNumList(temp1);
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
					var num_list = this.drill_LTG_getArgNumList(temp1);
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
					var num_list = this.drill_LTG_getArgNumList(temp1);
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
					var num_list = this.drill_LTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
		}
		if( args.length == 6 ){
			var type = String(args[3]);
			var delay_time = String(args[5]);
			delay_time = delay_time.replace("延迟执行时间[","");
			delay_time = delay_time.replace("]","");
			delay_time = Number( delay_time );
			if( type == "锁定帧(延迟)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_GIF_setLocked",
						[ true ], delay_time
					);
				}
			}
			if( type == "解锁帧(延迟)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_GIF_setLocked",
						[ false ], delay_time
					);
				}
			}
			if( type == "正向播放一次并停留在末尾帧(延迟)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_GIF_setOncePlay",
						[ "forwardRun" ], delay_time
					);
				}
			}
			if( type == "反向播放一次并停留在起始帧(延迟)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_GIF_setOncePlay",
						[ "backRun" ], delay_time
					);
				}
			}
		}
		if( args.length == 8 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var delay_time = String(args[7]);
			delay_time = delay_time.replace("延迟执行时间[","");
			delay_time = delay_time.replace("]","");
			delay_time = Number( delay_time );
			var num_list = this.drill_LTG_getArgNumList( temp1 );
			
			if( type == "设置帧(延迟)" || type == "设置当前帧(延迟)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_GIF_setFrame",
						[ num_list[0]-1 ], delay_time
					);
				}
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
Game_Interpreter.prototype.drill_LTG_getArgNumList = function( arg_str ){
	var arr = arg_str.match( /([^\[]+)\[([^\]]+)\]/ );
	if( arr != undefined && arr.length >= 3 ){
	// > 有方括号
		var data_name = arr[1];
		var data_list = arr[2].split(",");
		var result_list = [];
		
		if( data_name.contains("变量%") ){	//（将变量值赋值给目标，需要*0.01）
			for(var i=0; i < data_list.length; i++){ result_list.push( $gameVariables.value(Number(data_list[i]))*0.01 ); }
			return result_list;
		}else if( data_name.contains("变量") ){
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
var _drill_LTG_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_LTG_preload_initialize.call(this);
	this.drill_LTG_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_LTG_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_LTG_preloadInit = function(){
	this._drill_LTG_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_LTG_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_LTG_layers.length; i++ ){
		var temp_data = DrillUp.g_LTG_layers[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['preload'] != true ){ continue; }
		
		for(var k=0; k < temp_data['src_img_gif'].length; k++){
			this._drill_LTG_preloadTank.push( 
				ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img_gif'][k], temp_data['tint'], temp_data['smooth'], this._drill_LTG_cacheId ) 
			);
		}
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
//DrillUp.g_LTG_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LTG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(){
    _drill_LTG_sys_initialize.call(this);
	this.drill_LTG_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LTG_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LTG_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LTG_saveEnabled == true ){	
		$gameSystem.drill_LTG_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LTG_initSysData();
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
Game_System.prototype.drill_LTG_initSysData = function(){
	this.drill_LTG_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LTG_checkSysData = function(){
	this.drill_LTG_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LTG_initSysData_Private = function(){
	
	this._drill_LTG_dataTank_curController = [];		//当前地图容器（与 g_LTG_layers 依次对应，容器允许出现null值）
	for(var i = 0; i < DrillUp.g_LTG_layers.length; i++){
		var temp_data = DrillUp.g_LTG_layers[i];
		if( temp_data == undefined ){ continue; }
		
		// > 控制器 - 匹配全地图数据时（直接存储，每次地图刷新时，不刷新 全地图数据）
		if( temp_data['mapToAll'] == true ){
			var data = new Drill_LTG_Controller( i );
			this._drill_LTG_dataTank_curController[i] = data;
		}
		
		// > 控制器 - 匹配单地图数据时
		//	（见 drill_LTG_initMapdata ）
		
		// > 控制器 - 不匹配时
		//	（见 drill_LTG_initMapdata ）
	}
	
	// > 刷新当前地图『$gameSystem优先初始化』
	if( $gameMap != undefined ){
		$gameMap.drill_LTG_initMapdata();
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LTG_checkSysData_Private = function(){
	
	// > 旧存档数据自动补充
	if( this._drill_LTG_dataTank_curController == undefined ){
		this.drill_LTG_initSysData();
	}
	
	// > 容器的 空数据 检查
	for(var i = 0; i < DrillUp.g_LTG_layers.length; i++ ){
		var temp_data = DrillUp.g_LTG_layers[i];
		
		
		// > 控制器 - 匹配全地图数据时
		if( temp_data != undefined &&
			temp_data['mapToAll'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_LTG_dataTank_curController[i] == undefined ){
				var temp_controller = new Drill_LTG_Controller( i );
				this._drill_LTG_dataTank_curController[i] = temp_controller;
			
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
Scene_Map.prototype.drill_LTG_layerAddSprite = function (sprite, layer_index) {
    this.drill_LTG_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_LTG_layerRemoveSprite = function( sprite ){
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
Scene_Map.prototype.drill_LTG_sortByZIndex = function () {
    this.drill_LTG_sortByZIndex_Private();
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
Scene_Map.prototype.drill_LTG_layerCameraMoving = function( x, y, layer, option ){
    return this.drill_LTG_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_LTG_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function(){
	_drill_LTG_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_LTG_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function(){
	_drill_LTG_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_LTG_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function(){
	_drill_LTG_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_LTG_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function(){
	_drill_LTG_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_LTG_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_LTG_map_createAllWindows.call(this);	//对话框集合 < 最顶层
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
Scene_Map.prototype.drill_LTG_sortByZIndex_Private = function(){
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_LTG_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Map.prototype.drill_LTG_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
	// > 位移比
	//		（这里是位移比配置是反的，可能是因为 TilingSprite 的缘故。）
	var x_per = 1.0 - option['XPer'];
	var y_per = 1.0 - option['YPer'];
	
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
// ** ☆数据容器
//
//			说明：	> 此模块管理 当前地图中的控制器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 数据容器 - 初始化绑定
//==============================
var _drill_LTG_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LTG_setup.call( this, mapId );
	this.drill_LTG_initMapdata();
}
//==============================
// * 数据容器 - 初始化
//==============================
Game_Map.prototype.drill_LTG_initMapdata = function(){
	
	// > 刷新当前地图 控制器
	for(var i = 0; i< DrillUp.g_LTG_layers.length ;i++){
		var temp_data = DrillUp.g_LTG_layers[i];
		if( temp_data == undefined ){
			$gameSystem._drill_LTG_dataTank_curController[i] = null;
			continue;
		}
		
		// > 控制器 - 匹配全地图数据时
		if( temp_data['mapToAll'] == true ){
			//（不刷新数据）
			
		// > 控制器 - 匹配单地图数据时
		}else if( temp_data['map'] == this.mapId() ){
			var temp_controller = new Drill_LTG_Controller( i );
			$gameSystem._drill_LTG_dataTank_curController[i] = temp_controller;	//（重刷数据）
			
		// > 控制器 - 不匹配时
		}else{
			$gameSystem._drill_LTG_dataTank_curController[i] = null;	//（某地图不含此贴图配置，则直接置空）
		}
	}
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
var _drill_LTG_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_LTG_temp_initialize2.call(this);
	this._drill_LTG_spriteTank = [];				//贴图容器
};
//==============================
// * 控制器与贴图 - 销毁时（地图界面）
//==============================
var _drill_LTG_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function(){
	_drill_LTG_smap_terminate.call(this);
	$gameTemp._drill_LTG_spriteTank = [];		//贴图容器
};
//==============================
// * 控制器与贴图 - 帧刷新（地图界面）
//==============================
var _drill_LTG_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_drill_LTG_smap_update.call(this);
	this.drill_LTG_updateResizeRect();			//帧刷新 - 外包裹矩形
	this.drill_LTG_updateControllerCamera();	//帧刷新 - 控制器与镜头
	this.drill_LTG_updateAttr();				//帧刷新 - 基础特性
	this.drill_LTG_updateMask();				//帧刷新 - 动态遮罩
	this.drill_LTG_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时（地图界面）
//==============================
var _drill_LTG_smap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_LTG_smap_createAllWindows.call(this);
	this.drill_LTG_create();
};
//==============================
// * 控制器与贴图 - 界面创建
//==============================
Scene_Map.prototype.drill_LTG_create = function(){
	$gameTemp._drill_LTG_spriteTank = [];			//贴图容器（不允许出现null值）
	
	for(var i=0; i< $gameSystem._drill_LTG_dataTank_curController.length; i++){
		var temp_controller = $gameSystem._drill_LTG_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		
		
		// > 创建贴图
		var temp_sprite = new Drill_LTG_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		
		// > 添加贴图到层级
		$gameTemp._drill_LTG_spriteTank.push( temp_sprite );
		this.drill_LTG_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
		
		// > 创建动态遮罩
		if( temp_controller._drill_visible == true ){
			this.drill_LTG_createMaskSprite( temp_controller, temp_sprite );
			temp_sprite['_mask_inited'] = true;
			
		// > 创建动态遮罩（延迟创建）
		}else{
			temp_sprite['_mask_inited'] = false;
		}
		
	}
	
	// > 层级排序
	this.drill_LTG_sortByZIndex();
}
//==============================
// * 控制器与贴图 - 帧刷新 外包裹矩形
//==============================
Scene_Map.prototype.drill_LTG_updateResizeRect = function(){
	
	// > 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera != true ){ return; }
	
	// > 值相同时，不刷新
	var layer_sprite = this._spriteset._baseSprite;
	if( this._drill_LTG_LCa_rotation == layer_sprite.rotation &&
		this._drill_LTG_LCa_scale_x == layer_sprite.scale.x &&
		this._drill_LTG_LCa_scale_y == layer_sprite.scale.y ){
		return;
	}
	this._drill_LTG_LCa_rotation = layer_sprite.rotation;
	this._drill_LTG_LCa_scale_x = layer_sprite.scale.x;
	this._drill_LTG_LCa_scale_y = layer_sprite.scale.y;
	
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
	if( isNaN(ww) ){ return; }
	if( isNaN(hh) ){ return; }
	var ox = (Graphics.boxWidth - ww)*0.5;
	var oy = (Graphics.boxHeight - hh)*0.5;
	
	// > 平铺GIF伸缩
	for(var i=0; i < $gameTemp._drill_LTG_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_LTG_spriteTank[i];
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		//（平铺的旋转角度：如果平铺贴图本身有旋转角度，那么就不要伸缩了，因为平铺的旋转已经扩大了背景范围）
		if( temp_sprite.rotation != 0 ){ continue; }
		
		var layer = temp_controller._drill_layerIndex;
		if( layer == "下层" || layer == "中层" || layer == "上层" ){
			temp_sprite._drill_layerSprite.move( ox, oy, ww, hh );
			temp_controller._drill_cameraExtraX = ox;
			temp_controller._drill_cameraExtraY = oy;
		}
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 控制器与镜头
//==============================
Scene_Map.prototype.drill_LTG_updateControllerCamera = function(){
	for(var i = 0; i < $gameSystem._drill_LTG_dataTank_curController.length; i++ ){
		var temp_controller = $gameSystem._drill_LTG_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器帧刷新
		temp_controller.drill_controller_update();
		
		
		// > 镜头位移结果（地图参照）
		var xx = 0;
		var yy = 0;
		var cameraXAcc = temp_controller.drill_controller_getCameraXAcc();
		var cameraYAcc = temp_controller.drill_controller_getCameraYAcc();
		
		// > 镜头位移结果 - 图块平移
		xx += temp_controller._drill_tile_x * $gameMap.tileWidth();
		yy += temp_controller._drill_tile_y * $gameMap.tileHeight();
		
		// > 镜头位移结果 - 贴图归位（平铺GIF不需要归位）
		//xx -= cameraXAcc;
		//yy -= cameraYAcc;
		
		// > 镜头位移结果 - 外包裹矩形
		xx += temp_controller._drill_cameraExtraX;
		yy += temp_controller._drill_cameraExtraY;
		
		// > 镜头位移结果 - 层级与镜头的位移
		var option = {
			"XPer": temp_controller._drill_XPer,
			"YPer": temp_controller._drill_YPer,
			"tile_x": temp_controller._drill_tile_x,
			"tile_y": temp_controller._drill_tile_y,
			"cameraXAcc": cameraXAcc,
			"cameraYAcc": cameraYAcc,
		};
		var pos = this.drill_LTG_layerCameraMoving(xx, yy, temp_controller._drill_layerIndex, option );
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
// * 控制器与贴图 - 帧刷新 基础特性
//==============================
Scene_Map.prototype.drill_LTG_updateAttr = function(){
	var has_layerChange = false;
	for(var i = 0; i < $gameTemp._drill_LTG_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_LTG_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 基础特性 - 地图层级
		if( temp_sprite.layerIndex != temp_controller._drill_layerIndex ){
			temp_sprite.layerIndex =  temp_controller._drill_layerIndex;
			this.drill_LTG_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
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
		this.drill_LTG_sortByZIndex();
	}
}
//==============================
// * 控制器与贴图 - 动态遮罩 创建
//==============================
Scene_Map.prototype.drill_LTG_createMaskSprite = function( temp_controller, temp_sprite ){
	var data = temp_controller.drill_data();
	if( data['dynamicMask_enabled'] != true ){ return; }
	
	if( Imported.Drill_LayerDynamicMaskA && data['dynamicMask_bind'] == "动态遮罩板A" ){
		var temp_mask = this.drill_LDMA_getMaskSprite();
		this._drill_SenceTopArea.addChild(temp_mask);
		temp_sprite.mask = temp_mask;		//『遮罩赋值』
	}
	if( Imported.Drill_LayerDynamicMaskB && data['dynamicMask_bind'] == "动态遮罩板B" ){
		var temp_mask = this.drill_LDMB_getMaskSprite();
		this._drill_SenceTopArea.addChild(temp_mask);
		temp_sprite.mask = temp_mask;		//『遮罩赋值』
	}
}
//==============================
// * 控制器与贴图 - 动态遮罩 帧刷新
//==============================
Scene_Map.prototype.drill_LTG_updateMask = function(){
	for(var i=0; i < $gameTemp._drill_LTG_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_LTG_spriteTank[i];
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 创建动态遮罩（延迟创建）
		if( temp_sprite['_mask_inited'] == false && temp_controller._drill_visible == true ){
			temp_sprite['_mask_inited'] = true;
			this.drill_LTG_createMaskSprite( temp_controller, temp_sprite );
		}
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 销毁
//==============================
Scene_Map.prototype.drill_LTG_updateDestroy = function(){
	
	// > 自动销毁 - 控制器
	for(var i = $gameSystem._drill_LTG_dataTank_curController.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_LTG_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_LTG_dataTank_curController.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_LTG_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_LTG_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_LTG_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_LTG_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};



//=============================================================================
// ** 地图平铺GIF控制器【Drill_LTG_Controller】
// **		
// **		作用域：	地图界面
// **		主功能：	定义一个专门控制地图平铺GIF的数据类。
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
// **							>  可见
// **							>  混合模式
// **							>  层级
// **							>  堆叠级
// **						->其它特性
// **							> 暂停/继续
// **					->B变换特性『变换特性-平铺贴图』
// **						>  位置X
// **						>  位置Y
// **						>  移动速度X
// **						>  移动速度Y
// **						>  缩放X
// **						>  缩放Y
// **						>  透明度
// **						>  斜切X
// **						>  斜切Y
// **						>  旋转
// **					->C镜头参数
// **					->D播放GIF
// **						->设置帧
// **						->锁定帧/解锁帧
// **						->单次播放
// **					->E指令叠加变化
// **						> 主体贴图>移动到
// **						> 主体贴图>透明度
// **						> 平铺贴图>移动速度X
// **						> 平铺贴图>移动速度Y
// **						> 主体贴图>旋转（锚点为正中心）
// **						> 平铺贴图>缩放X
// **						> 平铺贴图>缩放Y
// **						> 主体贴图>斜切X（锚点为正中心）
// **						> 主体贴图>斜切Y（锚点为正中心）
// **					->F延迟指令
// **					->G自变化效果
// **						> 平铺贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>缩放效果
// **					
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_LTG_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 校验标记
//==============================
DrillUp.g_LTG_checkNaN = true;
DrillUp.g_LTG_notFindStyleAlertOnce = true;
//==============================
// * 控制器 - 初始化
//==============================
Drill_LTG_Controller.prototype.initialize = function( data_id ){
	this._drill_data_id = data_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『随机因子-生成一个不重复的序列号』
    this.drill_controller_initData();										//初始化数据
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
Drill_LTG_Controller.prototype.drill_controller_update = function(){
	this.drill_controller_updateDelayingCommandImportant();		//帧刷新 - F延迟指令 - 时间流逝
	if( this._drill_pause == true ){ return; }
	this.drill_controller_updateAttr();							//帧刷新 - A主体
	this.drill_controller_updateChange_Position();				//帧刷新 - B变换特性 - 平移
	this.drill_controller_updateChange_MoveRange();				//帧刷新 - B变换特性 - 平铺范围
																//帧刷新 - C镜头参数（无）
	this.drill_controller_updateGIF();							//帧刷新 - D播放GIF
	this.drill_controller_updateCommandChange();				//帧刷新 - E指令叠加变化
	this.drill_controller_updateDelayingCommand();				//帧刷新 - F延迟指令 - 执行延迟指令
	this.drill_controller_updateEffect();						//帧刷新 - G自变化效果
	this.drill_controller_updateCheckNaN();						//帧刷新 - A主体 - 校验值
}
//##############################
// * 控制器 - 重设数据【标准函数】
//			
//			参数：	> data_id 数字
//			返回：	> 无
//			
//			说明：	> 通过此函数，你不需要再重新创建一个数据对象，并且贴图能直接根据此数据来变化。
//##############################
Drill_LTG_Controller.prototype.drill_controller_resetData = function( data_id ){
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
Drill_LTG_Controller.prototype.drill_controller_setVisible = function( visible ){
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
Drill_LTG_Controller.prototype.drill_controller_setPause = function( pause ){
	this._drill_pause = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_LTG_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_LTG_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * 控制器 - 切换混合模式【标准函数】
//
//			参数：	> blendMode 数字
//			返回：	> 无
//##############################
Drill_LTG_Controller.prototype.drill_controller_setBlendMode = function( blendMode ){
	this._drill_blendMode = blendMode;
};
//##############################
// * 控制器 - 切换地图层级【标准函数】
//
//			参数：	> layerIndex 字符串
//			返回：	> 无
//##############################
Drill_LTG_Controller.prototype.drill_controller_setLayerIndex = function( layerIndex ){
	this._drill_layerIndex = layerIndex;
};
//##############################
// * 控制器 - 切换图片层级【标准函数】
//
//			参数：	> zIndex 数字
//			返回：	> 无
//##############################
Drill_LTG_Controller.prototype.drill_controller_setZIndex = function( zIndex ){
	this._drill_zIndex = zIndex;
};
//##############################
// * 控制器 - 修改位移比【标准函数】
//
//			参数：	> xPer,yPer 数字
//			返回：	> 无
//##############################
Drill_LTG_Controller.prototype.drill_controller_setPer = function( xPer, yPer ){
	this._drill_XPer = xPer;
	this._drill_YPer = yPer;
};

//##############################
// * D播放GIF - 设置帧【标准函数】
//
//			参数：	> cur_frame 数字（当前帧）
//			返回：	> 无
//			
//			说明：	> 从帧数0开始计数。
//##############################
Drill_LTG_Controller.prototype.drill_controller_GIF_setFrame = function( cur_frame ){
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
// * D播放GIF - 锁定帧/解锁帧【标准函数】
//
//			参数：	> locked 布尔
//			返回：	> 无
//##############################
Drill_LTG_Controller.prototype.drill_controller_GIF_setLocked = function( locked ){
	this._drill_GIF_lockEnabled = locked;
	this._drill_GIF_oncePlay = false;
};
//##############################
// * D播放GIF - 单次播放【标准函数】
//
//			参数：	> once_type 字符串（forwardRun正向播放/backRun反向播放）
//			返回：	> 无
//##############################
Drill_LTG_Controller.prototype.drill_controller_GIF_setOncePlay = function( once_type ){
	var data = this.drill_data();
	this._drill_GIF_oncePlay = true;
	this._drill_GIF_onceType = once_type;
	this._drill_GIF_time = 0;
	this._drill_GIF_onceTarTime = data['src_img_gif'].length * data['interval'];
};

//##############################
// * 控制器 - 初始化数据『控制器与贴图』【标准默认值】
//
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 该对象初始化 静态数据，提供所需的所有默认值。
//##############################
Drill_LTG_Controller.prototype.drill_controller_initData = function(){
	var data = this.drill_data();		//（此处会修改到 静态数据 的指针值）
	
	// > A主体 - 基础特性
	if( data['src_img_gif'] == undefined ){ data['src_img_gif'] = [] };								//A主体 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Map__layer_gif/" };		//A主体 - 文件夹
	if( data['interval'] == undefined ){ data['interval'] = 4 };									//A主体 - 帧间隔
	if( data['back_run'] == undefined ){ data['back_run'] = false };								//A主体 - 是否倒放
	
	if( data['tint'] == undefined ){ data['tint'] = 0 };											//A主体 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };									//A主体 - 图像-模糊边缘
	
	if( data['visible'] == undefined ){ data['visible'] = true };									//A主体 - 显示情况
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };									//A主体 - 混合模式
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "上层" };							//A主体 - 地图层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };										//A主体 - 图片层级
	
	// > A主体 - 其它特性
	if( data['pause'] == undefined ){ data['pause'] = false };										//A主体 - 暂停情况
	if( data['XPer'] == undefined ){ data['XPer'] = 0 };											//A主体 - 位移比X
	if( data['YPer'] == undefined ){ data['YPer'] = 0 };											//A主体 - 位移比Y
	if( data['tile_x'] == undefined ){ data['tile_x'] = 0 };										//A主体 - 位移图块偏移X
	if( data['tile_y'] == undefined ){ data['tile_y'] = 0 };										//A主体 - 位移图块偏移Y
	
	
	// > B变换特性
	if( data['x'] == undefined ){ data['x'] = 0 };													//B变换特性 - 平移X
	if( data['y'] == undefined ){ data['y'] = 0 };													//B变换特性 - 平移Y
	if( data['speedX'] == undefined ){ data['speedX'] = 0 };										//B变换特性 - 平铺GIFX速度
	if( data['speedY'] == undefined ){ data['speedY'] = 0 };										//B变换特性 - 平铺GIFY速度
	if( data['opacity'] == undefined ){ data['opacity'] = 255 };									//B变换特性 - 透明度
	if( data['parentRotate'] == undefined ){ data['parentRotate'] = 0 };							//B变换特性 - 平铺的旋转角度
	
	// > B变换特性 - 平铺的缩放与斜切
	if( data['scale_x'] == undefined ){ data['scale_x'] = 1.0 };									//B变换特性 - 平铺的缩放X
	if( data['scale_y'] == undefined ){ data['scale_y'] = 1.0 };									//B变换特性 - 平铺的缩放Y
	if( data['skew_x'] == undefined ){ data['skew_x'] = 0 };										//B变换特性 - 平铺的斜切X
	if( data['skew_y'] == undefined ){ data['skew_y'] = 0 };										//B变换特性 - 平铺的斜切Y
	
	
	// > C镜头参数（无）
	
	// > D播放GIF
	if( data['gif_lock'] == undefined ){ data['gif_lock'] = false };								//D播放GIF - 初始是否锁定帧
	if( data['gif_initFrame'] == undefined ){ data['gif_initFrame'] = 0 };							//D播放GIF - 锁定帧数
	
	// > E指令叠加变化（无）
	
	// > F延迟指令（无）
	
	// > G自变化效果
	if( data['effect_float'] == undefined ){ data['effect_float'] = "关闭" };						//G自变化效果 - 浮动效果
	if( data['effect_floatSpeed'] == undefined ){ data['effect_floatSpeed'] = 1.0 };				//G自变化效果 - 浮动速度
	if( data['effect_floatRange'] == undefined ){ data['effect_floatRange'] = 15 };					//G自变化效果 - 浮动偏移量
	if( data['effect_flicker'] == undefined ){ data['effect_flicker'] = "关闭" };					//G自变化效果 - 闪烁效果
	if( data['effect_flickerSpeed'] == undefined ){ data['effect_flickerSpeed'] = 6.0 };			//G自变化效果 - 闪烁速度
	if( data['effect_flickerRange'] == undefined ){ data['effect_flickerRange'] = 20 };				//G自变化效果 - 闪烁幅度范围
	if( data['effect_zoom'] == undefined ){ data['effect_zoom'] = "关闭" };							//G自变化效果 - 缩放效果
	if( data['effect_zoomSpeed'] == undefined ){ data['effect_zoomSpeed'] = 1.0 };					//G自变化效果 - 缩放速度
	if( data['effect_zoomRange'] == undefined ){ data['effect_zoomRange'] = 0.2 };					//G自变化效果 - 缩放幅度范围
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_LTG_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();				//初始化子功能 - A主体
	this.drill_controller_initChange();				//初始化子功能 - B变换特性
	this.drill_controller_initCamera();				//初始化子功能 - C镜头参数
	this.drill_controller_initGIF();				//初始化子功能 - D播放GIF
	this.drill_controller_initCommandChange();		//初始化子功能 - E指令叠加变化
	this.drill_controller_initDelayingCommand();	//初始化子功能 - F延迟指令
	this.drill_controller_initEffect();				//初始化子功能 - G自变化效果
}
//==============================
// * 控制器 - 重设数据（私有）
//==============================
Drill_LTG_Controller.prototype.drill_controller_resetData_Private = function( data_id ){
	
	// > 参数检查
	if( typeof data_id != "number" ){
		alert( DrillUp.drill_LTG_getPluginTip_controllerData_NotId("Drill_LTG_Controller") );
		throw Error( DrillUp.drill_LTG_getPluginTip_controllerData_NotId("Drill_LTG_Controller") );
		return;
	}
	
	// > 执行重置
	this._drill_data_id = data_id;
	this._drill_controllerSerial = new Date().getTime() + Math.random();	//『随机因子-生成一个不重复的序列号』
    this.drill_controller_initData();										//初始化数据
    this.drill_controller_initChild();										//初始化子功能
}
//##############################
// * 控制器 - 『控制器与贴图的样式』空的静态数据
//			
//			说明：	> 空数据会在initData时会进行默认值初始化，在其他地方只读。
//##############################
Drill_LTG_Controller.emptyData = {};
//##############################
// * 控制器 - 『控制器与贴图的样式』获取静态数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 对象指针
//			
//			说明：	> 由于数据量巨大，不要存储到存档中，也不要直接挂载到Controller身上。
//					> 静态数据会在initData时会进行默认值初始化，在其他地方只读。
//					> 【此函数不含遍历，而是直接获取值，可以放在帧刷新中使用】
//##############################
Drill_LTG_Controller.prototype.drill_data = function(){
	var cur_styleId   = this._drill_data_id +1;
	var cur_styleData = DrillUp.g_LTG_layers[ this._drill_data_id ];
	if( cur_styleData == undefined ){
		
		// > 『控制器与贴图的样式』 - 校验+提示信息（只执行一次）
		if( DrillUp.g_LTG_notFindStyleAlertOnce == true ){
			DrillUp.g_LTG_notFindStyleAlertOnce = false;
			alert( DrillUp.drill_LTG_getPluginTip_StyleNotFind(cur_styleId) );
		}
		return Drill_LTG_Controller.emptyData;
	}
	return cur_styleData;
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_LTG_Controller.prototype.drill_controller_initAttr = function(){
	var data = this.drill_data();
	
	// > A主体 - 基础特性
	this._drill_visible = data['visible'];
	this._drill_blendMode = data['blendMode'];
	this._drill_layerIndex = data['layerIndex'];
	this._drill_zIndex = data['zIndex'];
	
	// > A主体 - 其它特性
	this._drill_pause = data['pause'];
	this._drill_XPer = data['XPer'];
	this._drill_YPer = data['YPer'];
	this._drill_tile_x = data['tile_x'];
	this._drill_tile_y = data['tile_y'];
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_LTG_Controller.prototype.drill_controller_updateAttr = function(){
	
	// > 时间流逝
	this._drill_curTime += 1;
}
//==============================
// * A主体 - 帧刷新 - 校验值
//==============================
Drill_LTG_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_LTG_checkNaN == true ){
		if( isNaN( this.drill_controller_finalTransform_x() ) ){
			DrillUp.g_LTG_checkNaN = false;
			alert( DrillUp.drill_LTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_x" ) );
		}
		if( isNaN( this.drill_controller_finalTransform_y() ) ){
			DrillUp.g_LTG_checkNaN = false;
			alert( DrillUp.drill_LTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_y" ) );
		}
		if( isNaN( this.drill_controller_finalTransform_opacity() ) ){
			DrillUp.g_LTG_checkNaN = false;
			alert( DrillUp.drill_LTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_opacity" ) );
		}
		if( isNaN( this.drill_controller_finalTransform_rotate() ) ){
			DrillUp.g_LTG_checkNaN = false;
			alert( DrillUp.drill_LTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_rotate" ) );
		}
	}
}

//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_LTG_Controller.prototype.drill_controller_initChange = function(){
	var data = this.drill_data();
	
	// > 变换值 - 锚点
	//	（无）
	
	// > 变换值 - 位置
	this._drill_change_x = data['x'];
	this._drill_change_y = data['y'];
	this._drill_change_selfXAcc = 0;					//（自累积位移）
	this._drill_change_selfYAcc = 0;					//
	this._drill_change_selfXSpeed = data['speedX'];		//（自累积移动速度）
	this._drill_change_selfYSpeed = data['speedY'];		//
	
	// > 变换值 - 缩放
	this._drill_change_scaleX = data['scale_x'];
	this._drill_change_scaleY = data['scale_y'];
	
	// > 变换值 - 透明度
	this._drill_change_opacity = data['opacity'];
	
	// > 变换值 - 斜切
	this._drill_change_skewX = data['skew_x'];
	this._drill_change_skewY = data['skew_y'];
	
	// > 变换值 - 旋转
	this._drill_change_rotate = data['parentRotate'];	//（平铺的旋转角度）
	
	
	// > 变换值 - 『平铺范围』
	var ww = Graphics.boxWidth;
	var hh = Graphics.boxHeight;
	this._drill_move_x = -1 * ww*0.5;	//（一个平移到中心的矩形）
	this._drill_move_y = -1 * hh*0.5;
	this._drill_move_w = ww;
	this._drill_move_h = hh;
	this._drill_move_originOffsetX = 0;	//（矩形大小变换时，位移修正值）
	this._drill_move_originOffsetY = 0;
}
//==============================
// * B变换特性 - 帧刷新 位置
//==============================
Drill_LTG_Controller.prototype.drill_controller_updateChange_Position = function(){
	
	// > 自累积位移
	this._drill_change_selfXAcc += this.drill_controller_finalTransform_selfXSpeed();
	this._drill_change_selfYAcc += this.drill_controller_finalTransform_selfYSpeed();
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置X（可继承，开放函数）
//##############################
Drill_LTG_Controller.prototype.drill_controller_finalTransform_x = function(){
	return this._drill_change_x + this._drill_change_selfXAcc + this._drill_move_originOffsetX
		+ this._drill_cameraResultSpriteX;	//（镜头位移结果，见函数 drill_LTG_updateControllerCamera ）
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置Y（可继承，开放函数）
//##############################
Drill_LTG_Controller.prototype.drill_controller_finalTransform_y = function(){
	return this._drill_change_y + this._drill_change_selfYAcc + this._drill_move_originOffsetY
		+ this._drill_cameraResultSpriteY;	//（镜头位移结果，见函数 drill_LTG_updateControllerCamera ）
}
//##############################
// * B变换特性 - 数据最终变换值 - 移动速度X（可继承，开放函数）
//##############################
Drill_LTG_Controller.prototype.drill_controller_finalTransform_selfXSpeed = function(){
	return this._drill_change_selfXSpeed;
}
//##############################
// * B变换特性 - 数据最终变换值 - 移动速度Y（可继承，开放函数）
//##############################
Drill_LTG_Controller.prototype.drill_controller_finalTransform_selfYSpeed = function(){
	return this._drill_change_selfYSpeed;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放X（可继承，开放函数）
//##############################
Drill_LTG_Controller.prototype.drill_controller_finalTransform_scaleX = function(){
	return this._drill_change_scaleX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放Y（可继承，开放函数）
//##############################
Drill_LTG_Controller.prototype.drill_controller_finalTransform_scaleY = function(){
	return this._drill_change_scaleY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 透明度（可继承，开放函数）
//##############################
Drill_LTG_Controller.prototype.drill_controller_finalTransform_opacity = function(){
	return this._drill_change_opacity;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切X（可继承，开放函数）
//##############################
Drill_LTG_Controller.prototype.drill_controller_finalTransform_skewX = function(){
	return this._drill_change_skewX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切Y（可继承，开放函数）
//##############################
Drill_LTG_Controller.prototype.drill_controller_finalTransform_skewY = function(){
	return this._drill_change_skewY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 旋转（可继承，开放函数）
//##############################
Drill_LTG_Controller.prototype.drill_controller_finalTransform_rotate = function(){
	return this._drill_change_rotate;
}
//==============================
// * B变换特性 - 帧刷新 平铺范围
//==============================
Drill_LTG_Controller.prototype.drill_controller_updateChange_MoveRange = function(){
	if( this._drill_change_rotate == 0 && 
		this._drill_change_skewX == 0 && 
		this._drill_change_skewY == 0 ){ return; }
	
	// > 矩形变换后的外接矩形
	//		（这个函数用于获取 旋转+斜切 变换后的矩形高宽）
	var ww = Graphics.boxWidth;
	var hh = Graphics.boxHeight;
	var rect = $gameTemp.drill_LTG_Math2D_getRectWithTransform(
		0, 0,
		ww, hh,
		0.5, 0.5,
		this._drill_change_rotate *Math.PI/180,
		1.0,	//（变换不含缩放，所以为1.0）
		1.0,
		this._drill_change_skewX,
		this._drill_change_skewY
	);
	
	// > 高宽 - 计算外接矩形高宽
	var rww = rect.w - rect.x;
	var rhh = rect.h - rect.y;
	if( rww < ww ){ rww = ww; }
	if( rhh < hh ){ rhh = hh; }
	
	// > 高宽 - 斜切的补正
	rww *= (1 + Math.abs(this._drill_change_skewY) );
	rhh *= (1 + Math.abs(this._drill_change_skewX) );
	
	// > 高宽 - 设置矩形
	this._drill_move_x = -1 * rww*0.5;
	this._drill_move_y = -1 * rhh*0.5;
	this._drill_move_w = rww;
	this._drill_move_h = rhh;
	
	// > 高宽 - 位移修正值
	this._drill_move_originOffsetX = (rww - ww)* (-0.5);	//（矩形大小变换时，要额外加位移修正，确保旋转时不会乱转）
	this._drill_move_originOffsetY = (rhh - hh)* (-0.5);
}
//==============================
// * B变换特性 - 数学工具 - 矩形变换后的外接矩形
//			
//			参数：	> rect_x,rect_y 数字     （矩形位置）
//					> rect_w,rect_h 数字     （矩形宽高）
//					> anchor_x,anchor_y 数字 （矩形锚点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字     （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }           （变换后的坐标）
//			
//			说明：	> 矩阵边角的四个点，根据矩阵的 旋转+缩放+斜切 一并变换，然后得到四个点的外接矩形。
//==============================
Game_Temp.prototype.drill_LTG_Math2D_getRectWithTransform = function( 
					rect_x,rect_y,						//矩形位置 
					rect_w,rect_h, 						//矩形宽高 
					anchor_x,anchor_y, 					//矩形锚点 
					rotation,							//变换的值（旋转）
					scale_x, scale_y,					//变换的值（缩放）
					skew_x, skew_y  ){					//变换的值（斜切）
					
	// > 四个点
	var c_x = rect_x + rect_w*anchor_x;
	var c_y = rect_y + rect_h*anchor_y;
	var p1_x = rect_x;
	var p1_y = rect_y;
	var p2_x = rect_x + rect_w;
	var p2_y = rect_y;
	var p3_x = rect_x;
	var p3_y = rect_y + rect_h;
	var p4_x = rect_x + rect_w;
	var p4_y = rect_y + rect_h;
	
	// > 变换后的四个点
	var pp1 = $gameTemp.drill_LTG_Math2D_getPointWithTransform( p1_x,p1_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp2 = $gameTemp.drill_LTG_Math2D_getPointWithTransform( p2_x,p2_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp3 = $gameTemp.drill_LTG_Math2D_getPointWithTransform( p3_x,p3_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp4 = $gameTemp.drill_LTG_Math2D_getPointWithTransform( p4_x,p4_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	
	// > 外接矩形
	var min_x = Math.min( pp1.x, Math.min( pp2.x, Math.min( pp3.x, pp4.x )));
	var min_y = Math.min( pp1.y, Math.min( pp2.y, Math.min( pp3.y, pp4.y )));
	var max_x = Math.max( pp1.x, Math.max( pp2.x, Math.max( pp3.x, pp4.x )));
	var max_y = Math.max( pp1.y, Math.max( pp2.y, Math.max( pp3.y, pp4.y )));
	var ww = max_x - min_x;
	var hh = max_y - min_y;
	return { "x":min_x, "y":min_y, "w":ww, "h":hh };
}
//==============================
// * B变换特性 - 数学工具 - 矩阵点的变换/点A绕点B旋转缩放斜切
//			
//			参数：	> cur_x,cur_y 数字       （需要变换的点）
//					> center_x,center_y 数字 （矩形中心点）
//					> rotation 数字          （旋转度数，弧度）
//					> scale_x,scale_y 数字   （缩放比例XY，默认1.00）
//					> skew_x,skew_y 数字     （斜切比例XY，默认0.00）
//			返回：	> { x:0, y:0 }           （变换后的坐标）
//			
//			说明：	> 矩阵内或矩阵外一个点，能够根据矩阵的 旋转+缩放+斜切 一并变换。
//					  旋转+缩放+斜切 可为负数。
//==============================
Game_Temp.prototype.drill_LTG_Math2D_getPointWithTransform = function( 
					cur_x,cur_y,						//需要变换的点 
					center_x,center_y, 					//矩形中心点 
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
	var dx = (cur_x - center_x);
	var dy = (cur_y - center_y);
    var tar_x = center_x + (dx * a + dy * c);
    var tar_y = center_y + (dx * b + dy * d);
	
	return { "x":tar_x, "y":tar_y };
}


//==============================
// * C镜头参数 - 初始化子功能
//==============================
Drill_LTG_Controller.prototype.drill_controller_initCamera = function(){
	//this._drill_cameraXAcc = 0;			//循环积累值（不存）
	//this._drill_cameraYAcc = 0;
	this._drill_cameraExtraX = 0;			//外包裹矩形 值
	this._drill_cameraExtraY = 0;			//
	
	this._drill_cameraResultSpriteX = 0;	//镜头位移结果
	this._drill_cameraResultSpriteY = 0;
}
// > 强制更新提示 锁
DrillUp.g_LTG_alert = true;
//==============================
// * C镜头参数 - 获取 循环积累值（开放函数）
//
//			说明：	> 此处直接调用函数获取值。参数不存，因为浪费 帧刷新 和 存储空间。
//==============================
Drill_LTG_Controller.prototype.drill_controller_getCameraXAcc = function(){
	if( $gameMap == undefined ){ return 0; }	//『$gameSystem优先初始化』（注意此处，调用时 $gameMap和$dataMap 都可能未创建。）
	if( $dataMap == undefined ){ return 0; }
	
	// > 循环积累值 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LTG_alert == true ){ 
			alert( DrillUp.drill_LTG_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LTG_alert = false;
			return; 
		}
		
		return $gameSystem._drill_LCa_controller._drill_cameraX_offsetAcc * $gameMap.tileWidth();
	}else{
		return $gameMap.displayX() * $gameMap.tileWidth();
	}
}
//==============================
// * C镜头参数 - 获取 循环积累值（开放函数）
//
//			说明：	> 此处直接调用函数获取值。参数不存，因为浪费 帧刷新 和 存储空间。
//==============================
Drill_LTG_Controller.prototype.drill_controller_getCameraYAcc = function(){
	if( $gameMap == undefined ){ return 0; }	//『$gameSystem优先初始化』（注意此处，调用时 $gameMap和$dataMap 都可能未创建。）
	if( $dataMap == undefined ){ return 0; }
	
	// > 循环积累值 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LTG_alert == true ){ 
			alert( DrillUp.drill_LTG_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LTG_alert = false;
			return; 
		}
		
		return $gameSystem._drill_LCa_controller._drill_cameraY_offsetAcc * $gameMap.tileHeight();
	}else{
		return $gameMap.displayY() * $gameMap.tileHeight();
	}
}


//==============================
// * D播放GIF - 初始化子功能
//==============================
Drill_LTG_Controller.prototype.drill_controller_initGIF = function(){
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
// * D播放GIF - 帧刷新
//==============================
Drill_LTG_Controller.prototype.drill_controller_updateGIF = function(){
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
		if( this._drill_GIF_time >= this._drill_GIF_onceTarTime ){
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
// * E指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_LTG_Controller.prototype.drill_controller_initCommandChange = function(){
	
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
// * E指令叠加变化 - 帧刷新
//==============================
Drill_LTG_Controller.prototype.drill_controller_updateCommandChange = function(){
	
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
// * E指令叠加变化 - 立即还原所有单属性
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
	// > 控制器参数 - 移动到
	//	（这里不含）
	
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
// * E指令叠加变化 - 立即归位
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = undefined;
}
//==============================
// * E指令叠加变化 - 修改单属性 - 移动到
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", data['x'], data['y'],		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
}
//==============================
// * E指令叠加变化 - 修改单属性 - 透明度
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * E指令叠加变化 - 修改单属性 - 移动速度X
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_setSpeedX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedX_data", data['speedX'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * E指令叠加变化 - 修改单属性 - 移动速度Y
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_setSpeedY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedY_data", data['speedY'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * E指令叠加变化 - 修改单属性 - 旋转
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", data['parentRotate'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * E指令叠加变化 - 修改单属性 - 缩放X
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_setScaleX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleX_data", data['scale_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * E指令叠加变化 - 修改单属性 - 缩放Y
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_setScaleY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", data['scale_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * E指令叠加变化 - 修改单属性 - 斜切X
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_setSkewX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewX_data", data['skew_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * E指令叠加变化 - 修改单属性 - 斜切Y
//==============================
Drill_LTG_Controller.prototype.drill_controller_commandChange_setSkewY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewY_data", data['skew_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}


//==============================
// * F延迟指令 - 初始化子功能
//==============================
Drill_LTG_Controller.prototype.drill_controller_initDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}
//==============================
// * F延迟指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_LTG_Controller.prototype.drill_controller_updateDelayingCommandImportant = function(){
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
// * F延迟指令 - 帧刷新 - 执行延迟指令
//==============================
Drill_LTG_Controller.prototype.drill_controller_updateDelayingCommand = function(){
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
// * F延迟指令 - 设置指令（开放函数）
//==============================
Drill_LTG_Controller.prototype.drill_controller_setDelayingCommand = function( method, paramList, delay_time ){
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
// * F延迟指令 - 清空全部（开放函数）
//==============================
Drill_LTG_Controller.prototype.drill_controller_clearDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}


//==============================
// * G自变化效果 - 初始化子功能
//==============================
Drill_LTG_Controller.prototype.drill_controller_initEffect = function(){
	this._drill_curEffectTime = 0;
}
//==============================
// * G自变化效果 - 帧刷新
//==============================
Drill_LTG_Controller.prototype.drill_controller_updateEffect = function(){
	this._drill_curEffectTime += 1;
}



//=============================================================================
// ** 地图平铺GIF贴图【Drill_LTG_Sprite】
// **
// **		作用域：	地图界面
// **		主功能：	定义一个平铺GIF贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->是否需要销毁（未使用）
// **						->销毁（手动）
// **					
// **					->A主体
// **					->B变换特性
// **					->C对象绑定
// **						->设置控制器
// **						->贴图初始化（手动）
// **					->D播放GIF
// **					->E指令叠加变化-控制器用
// **					->F延迟指令
// **					->G自变化效果
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
// * 平铺GIF贴图 - 定义
//==============================
function Drill_LTG_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_LTG_Sprite.prototype = Object.create(Sprite.prototype);
Drill_LTG_Sprite.prototype.constructor = Drill_LTG_Sprite;
//==============================
// * 平铺GIF贴图 - 初始化
//==============================
Drill_LTG_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 平铺GIF贴图 - 帧刷新
//==============================
Drill_LTG_Sprite.prototype.update = function(){
	if( this.drill_sprite_isReady() == false ){ return; }
	if( this.drill_sprite_isOptimizationPassed() == false ){ return; }
	Sprite.prototype.update.call(this);
	this.drill_sprite_updateAttr();					//帧刷新 - A主体
	this.drill_sprite_updateChange();				//帧刷新 - B变换特性
													//帧刷新 - C对象绑定（无）
	this.drill_sprite_updateGIF();					//帧刷新 - D播放GIF
	this.drill_sprite_updateCommandChange();		//帧刷新 - E指令叠加变化-控制器用
													//帧刷新 - F延迟指令（无）
	this.drill_sprite_updateEffect();				//帧刷新 - G自变化效果
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_LTG_Sprite.prototype.drill_sprite_setController = function( controller ){
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
Drill_LTG_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A主体
	this.drill_sprite_initChange();				//初始化子功能 - B变换特性
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initGIF();				//初始化子功能 - D播放GIF
	this.drill_sprite_initCommandChange();		//初始化子功能 - E指令叠加变化-控制器用
	this.drill_sprite_initDelayingCommand();	//初始化子功能 - F延迟指令
	this.drill_sprite_initEffect();				//初始化子功能 - G自变化效果
};

//##############################
// * 平铺GIF贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_LTG_Sprite.prototype.drill_sprite_isReady = function(){
	if( this._drill_controller == undefined ){ return false; }
    return true;
};
//##############################
// * 平铺GIF贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_LTG_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return true;
};
//##############################
// * 平铺GIF贴图 - 是否需要销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否需要销毁）
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_LTG_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
	if( this._drill_controller == undefined ){ return false; }	//（未绑定时，不销毁）
	if( this._drill_controller._drill_needDestroy == true ){ return true; }
    return false;
};
//##############################
// * 平铺GIF贴图 - 销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_LTG_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 平铺GIF贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 平铺GIF贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A主体
	this.visible = false;
	this.removeChild( this._drill_layerSprite );
	this._drill_layerSprite = null;
	
	// > 销毁 - B变换特性
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
};
//==============================
// * 平铺GIF贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller.drill_data();
	/*
		贴图的层级如下：
			- 主体贴图
			- - 平铺贴图
		
	*/
	
	// > 主体贴图
	this.x = 0;
	this.y = 0;
	this.visible = this._drill_controller._drill_visible;
	this.blendMode = this._drill_controller._drill_blendMode;
	this.layerIndex = this._drill_controller._drill_layerIndex;
	this.zIndex = this._drill_controller._drill_zIndex;
	
	// > 平铺贴图 - 资源对象组
	this._drill_bitmapTank = [];
	for(var j = 0; j < data['src_img_gif'].length; j++ ){
		var bitmap = ImageManager.loadBitmap( data['src_img_file'], data['src_img_gif'][j], data['tint'], data['smooth'] );
		this._drill_bitmapTank.push( bitmap );
	}
	
	// > 平铺贴图
	var temp_layer = new TilingSprite();
	temp_layer.move(0, 0, Graphics.width, Graphics.height);		//（填满游戏窗口）
	temp_layer.bitmap = this._drill_bitmapTank[0];
	temp_layer.origin.x = data['x'];
	temp_layer.origin.y = data['y'];
	temp_layer.blendMode = this._drill_controller._drill_blendMode;
	this._drill_layerSprite = temp_layer;
	
	// > 平铺范围（平铺的旋转角度用）
	this._drill_spriteMove_x = 0;
	this._drill_spriteMove_y = 0;
	this._drill_spriteMove_w = Graphics.boxWidth;
	this._drill_spriteMove_h = Graphics.boxHeight;
	
	this.addChild( this._drill_layerSprite );
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_updateAttr = function(){
	
	// > 基础特性 - 混合模式
	this.visible = this._drill_controller._drill_visible;
	
	// > 基础特性 - 混合模式
	if( this.blendMode != this._drill_controller._drill_blendMode ){
		this.blendMode =  this._drill_controller._drill_blendMode;
		this._drill_layerSprite.blendMode = this._drill_controller._drill_blendMode;
	}
	
	//（其它 基础特性 的帧刷新赋值见：drill_LTG_updateAttr）
}


//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_initChange = function(){
	//（无）
}
//==============================
// * B变换特性 - 帧刷新
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_updateChange = function(){
	
	// > 贴图 - 锚点
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	// > 贴图 - 位置
	this.x = Graphics.boxWidth  *0.5;
	this.y = Graphics.boxHeight *0.5;
	
	// > 贴图 - 位置（平铺贴图）
	var xx = this._drill_controller.drill_controller_finalTransform_x();
	var yy = this._drill_controller.drill_controller_finalTransform_y();
	this._drill_layerSprite.origin.x = xx;
	this._drill_layerSprite.origin.y = yy;
	
	// > 贴图 - 缩放
	//	（无）
	
	// > 贴图 - 缩放（平铺贴图）
	this._drill_layerSprite.tileTransform.scale.x = this._drill_controller.drill_controller_finalTransform_scaleX();
	this._drill_layerSprite.tileTransform.scale.y = this._drill_controller.drill_controller_finalTransform_scaleY();
	
	// > 贴图 - 透明度
	this.opacity = this._drill_controller.drill_controller_finalTransform_opacity();
	
	// > 贴图 - 斜切
	this.skew.x  = this._drill_controller.drill_controller_finalTransform_skewX();
	this.skew.y  = this._drill_controller.drill_controller_finalTransform_skewY();
	
	// > 贴图 - 旋转
	this.rotation = this._drill_controller.drill_controller_finalTransform_rotate() *Math.PI/180;
	
	
	// > 贴图 - 平铺范围（平铺贴图）（旋转+斜切 的影响，影响矩形大小）
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
}


//==============================
// * C对象绑定 - 初始化子功能
//==============================
//（无，此处不要赋值）


//==============================
// * D播放GIF - 初始化子功能
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_initGIF = function(){
	//	（无）
}
//==============================
// * D播放GIF - 帧刷新
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_updateGIF = function(){
	
	// > 贴图Bitmap
	this._drill_layerSprite.bitmap = this._drill_bitmapTank[ this._drill_controller._drill_GIF_index ];
}


//==============================
// * E指令叠加变化-控制器用 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 贴图部分。
//					> 之所以把代码放这里，是因为 控制器-贴图 一对一，且可以节约弹道计算的存储空间。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_initCommandChange = function(){
	
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
// * E指令叠加变化-控制器用 - 帧刷新
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_updateCommandChange = function(){
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
	
	
	// > 移动速度X - 帧刷新
	var CDataName = "_drill_command_speedX_data";
	var SDataName = "_drill_command_speedX_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动速度X - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_selfXSpeed = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_selfXSpeed = data['speedX'];	//（没有数据时，赋值为 初始值）
	}
	
	// > 移动速度Y - 帧刷新
	var CDataName = "_drill_command_speedY_data";
	var SDataName = "_drill_command_speedY_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 移动速度Y - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_selfYSpeed = controller[CDataName]['cur_value'];
	}else{
		controller._drill_change_selfYSpeed = data['speedY'];	//（没有数据时，赋值为 初始值）
	}
	
	
	// > 旋转 - 帧刷新
	var CDataName = "_drill_command_rotate_data";
	var SDataName = "_drill_command_rotate_spriteData";
	Drill_COBa_ExtendTool.drill_COBa_Common_sprite_update( this, SDataName, controller, CDataName );
	
	// > 旋转 - 控制器赋值（覆盖）
	if( controller[CDataName] != undefined ){
		controller._drill_change_rotate = controller[CDataName]['cur_value'];	//（平铺的旋转角度）
	}else{
		controller._drill_change_rotate = data['parentRotate'];	//（没有数据时，赋值为 初始值）
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
// * F延迟指令 - 初始化子功能
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_initDelayingCommand = function(){
	//（无）
}


//==============================
// * G自变化效果 - 初始化子功能
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_initEffect = function(){
	//（无）
}
//==============================
// * G自变化效果 - 帧刷新
//==============================
Drill_LTG_Sprite.prototype.drill_sprite_updateEffect = function(){
	var data = this._drill_controller.drill_data();
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
		Imported.Drill_LayerTiledGif = false;
		Imported.Drill_LayerTiledGIF = false;
		var pluginTip = DrillUp.drill_LTG_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


