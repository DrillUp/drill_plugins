//=============================================================================
// Drill_BattleTiledGif.js
//=============================================================================

/*:
 * @plugindesc [v1.8]        战斗 - 多层战斗平铺GIF
 * @author Drill_up
 * 
 * @Drill_LE_param "平铺GIF样式-%d"
 * @Drill_LE_parentKey "---平铺GIF样式组%d至%d---"
 * @Drill_LE_var "DrillUp.g_BTG_style_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_BattleTiledGif +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在战斗界面中放置一个或者多个平铺GIF。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 插件也可以被下列插件扩展，实现特殊功能效果。
 * 基于：
 *   - Drill_CoreOfBallistics      数学模型-弹道核心★★v2.2及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面。
 *   作用于战斗层级。
 * 2.该插件可以装饰战斗的各种层级。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-战斗界面）.docx"。
 * 3.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
 *   在开启游戏编辑器时，可以并行使用读取器复制指令。
 * 战斗层级：
 *   (1.你可以将贴图放置在战斗的四种层级中，分别为：
 *      下层、上层、图片层、最顶层
 *   (2.战斗层级之间的关系为：
 *      底图 < 战斗背景 < 下层 < 敌人/角色层 < 上层
 *      < 图片对象层 < 图片层 < 对话框集合 < 最顶层
 *   (3.最顶层可以把战斗界面的对话框、窗口也给挡住。
 *   (4.处于同一 战斗层级 时，将根据 图片层级 再先后排序。
 * 位移比：
 *   (1.根据物理相对运动知识，近大远小，近快远慢的原则。要让平铺GIF看
 *      起来真的"远"，那需要设置位移比接近1.00，越接近1.00越远。
 *   (2.去看看最新版本的 文档图解 介绍，
 *      这里是看起来简单但是实际做起来非常复杂的坑。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 细节：
 *   (1.插件指令操作的变化结果，是永久性的。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Battle__layer_gif （Battle后面有两个下划线）
 * 先确保项目img文件夹下是否有Battle__layer_gif文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 平铺GIF1 资源-平铺GIF
 * 平铺GIF2 资源-平铺GIF
 * 平铺GIF3 资源-平铺GIF
 * ……
 *
 * 所有素材都放在Battle__layer_gif文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要通过插件指令手动的创建对象：
 * 
 * 插件指令：>战斗平铺GIF : 创建 : 平铺GIF[11] : 样式[1]
 * 插件指令：>战斗平铺GIF : 创建 : 平铺GIF[11] : 样式[1] //"资源文件为：xxxx"
 * 插件指令：>战斗平铺GIF : 删除 : 平铺GIF[11]
 * 插件指令：>战斗平铺GIF : 删除全部
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
 * 插件指令：>战斗平铺GIF : 平铺GIF[2] : 初始属性调整 : 位置[0,0] : 战斗层级[下层] : 图片层级[2] : 速度[1.0,1.0] : 位移比[0.0,0.0]
 * 
 * 1.在插件参数里面一个个配置战斗平铺GIF参数非常麻烦，为了方便微调参数，
 *   你可以使用"初始属性调整"功能，微调插件配置的默认参数。
 * 
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟修改单属性
 * 你可以通过插件指令手动延迟修改各个属性：
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF变量[21] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 批量平铺GIF[7,8] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 批量平铺GIF变量[21,22] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 全部平铺GIF : 隐藏(延迟) : 延迟执行时间[20]
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 显示(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 暂停(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 继续(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 透明度[255] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 透明度变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 旋转[90] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 旋转变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 移动速度X[1.5] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 移动速度X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 移动速度Y[1.5] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 移动速度Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 缩放X[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 缩放X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 缩放Y[1.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 缩放Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 斜切X[0.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 斜切X变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 斜切Y[0.2] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性(延迟) : 斜切Y变量%[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 还原所有单属性(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 立即取消全部延迟指令
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（隐藏(延迟) : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有5*22种组合方式。
 * 2.设置延迟指令后，指令会被暂存到延迟队列中，等待延迟时间结束之后，执行指令。
 *   "立即取消全部延迟指令"可以清空排在队列中的所有延迟指令。
 * 3.此功能可以简化 并行事件 的设计，你可以在串行事件中执行延迟，延迟后并行变化贴图。
 * 4.上述指令可以在地图界面中预先执行，只有进入到战斗界面之后，延迟时间才开始计时。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>战斗平铺GIF : 平铺GIF[11] : 变透明 : 延迟[150] : 变化时间[60] : 透明度[255]
 * 插件指令(旧)：>战斗平铺GIF : 平铺GIF[11] : 变透明 : 延迟[150] : 变化时间[60] : 透明度变量[21]
 * 插件指令(旧)：>战斗平铺GIF : 平铺GIF[11] : 变速度 : 延迟[150] : 变化时间[60] : 速度[1.0,-1.0]
 * 插件指令(旧)：>战斗平铺GIF : 平铺GIF[11] : 变速度 : 延迟[150] : 变化时间[60] : 速度变量[25,26]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟移动到
 * 你可以通过插件指令手动设置延迟移动：
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到(延迟)-匀速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到(延迟)-弹性移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到(延迟)-弹性移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到(延迟)-增减速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到(延迟)-增减速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到(延迟)-延迟归位 : 延迟执行时间[20]
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有5*7种组合方式。
 * 2.移动的初始位置以显示在战斗界面的具体位置为基准，在基准位置上再进行移动到。
 *   指令中不含相对移动，比如多次执行移动到[20,20]，贴图只会到达一个固定的位置。
 * 3.上述指令可以在地图界面中预先执行，只有进入到战斗界面之后，延迟时间才开始计时。
 * 
 * 以下是旧版本的指令，也可以用：
 * 插件指令(旧)：>战斗平铺GIF : 平铺GIF[11] : 变坐标 : 延迟[150] : 变化时间[60] : 位置[100,100]
 * 插件指令(旧)：>战斗平铺GIF : 平铺GIF[11] : 变坐标 : 延迟[150] : 变化时间[60] : 位置变量[25,26]
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟GIF播放
 * 你还可以通过插件指令控制延迟GIF播放：
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 锁定帧(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 解锁帧(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 设置帧(延迟) : 当前帧[1] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 设置帧(延迟) : 当前帧变量[21] : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 正向播放一次并停留在末尾帧(延迟) : 延迟执行时间[20]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 反向播放一次并停留在起始帧(延迟) : 延迟执行时间[20]
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（锁定帧(延迟) : 延迟执行时间[20]）
 *   的参数可以随意组合，一共有5*6种组合方式。
 * 2."设置当前帧"的 当前帧，1表示第1帧。
 *   你可以设置GIF锁定在某一帧，帧数与资源配置的id对应。
 * 3."正向播放一次并停留在末尾帧"表示强制该GIF播放重头到尾播放一次。
 *   播放完毕后，自动锁定到末尾帧。
 * 
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改单属性
 * 上述的插件指令中，你也可以在 战斗界面 即时执行修改属性：
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 显示
 * 插件指令：>战斗平铺GIF : 平铺GIF变量[21] : 显示
 * 插件指令：>战斗平铺GIF : 批量平铺GIF[7,8] : 显示
 * 插件指令：>战斗平铺GIF : 批量平铺GIF变量[21,22] : 显示
 * 插件指令：>战斗平铺GIF : 全部平铺GIF : 显示
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 显示
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 隐藏
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 暂停
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 继续
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 切换混合模式[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 切换战斗层级[下层]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 切换图片层级[10]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 透明度[255] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 透明度变量[21] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 旋转[90] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 旋转变量[21] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 移动速度X[1.5] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 移动速度X变量%[21] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 移动速度Y[1.5] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 移动速度Y变量%[21] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 缩放X[1.2] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 缩放X变量%[21] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 缩放Y[1.2] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 缩放Y变量%[21] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 斜切X[0.2] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 斜切X变量%[21] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 斜切Y[0.2] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 修改单属性 : 斜切Y变量%[21] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 立即还原所有单属性
 * 
 * 1.前半部分（平铺GIF变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有5*24种组合方式。
 * 2.插件指令的变化是永久性的。
 *   修改后的变化能与 配置的自变化效果 叠加，但是实际效果一般都不太好。
 * 3."切换战斗层级["能切换的层级为：下层、上层、图片层、最顶层。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 移动到
 * 上述的插件指令中，你也可以在 战斗界面 即时执行移动：
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到-匀速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到-弹性移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到-增减速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到-增减速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 移动到-立即归位
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（移动到-匀速移动 : 位置[100,100] : 时间[60]）
 *   的参数可以随意组合。一共有5*7种组合方式。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 获取属性
 * 你可以通过插件指令来获取 战斗平铺GIF 的属性值：
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF变量[21] : 获取属性 : 位置X : 变量[21]
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 位置X : 变量[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 位置Y : 变量[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 透明度 : 变量[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 旋转 : 变量[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 移动速度X : 变量%[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 移动速度Y : 变量%[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 缩放X : 变量%[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 缩放Y : 变量%[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 斜切X : 变量%[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 获取属性 : 斜切Y : 变量%[21]
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
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 锁定帧
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 解锁帧
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 设置帧 : 当前帧[1]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 设置帧 : 当前帧变量[21]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 正向播放一次并停留在末尾帧
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 反向播放一次并停留在起始帧
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（锁定帧）
 *   的参数可以随意组合，一共有5*6种组合方式。
 * 
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期修改单属性
 * 上述的插件指令中，部分插件指令可以周期执行：
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF变量[21] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 批量平铺GIF[7,8] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 批量平铺GIF变量[21,22] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 全部平铺GIF : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-显示(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-暂停(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-继续(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 透明度[255] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 透明度变量[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 旋转[90] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 旋转变量[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 移动速度X[1.5] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 移动速度X变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 移动速度Y[1.5] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 移动速度Y变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 缩放X[1.2] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 缩放X变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 缩放Y[1.2] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 缩放Y变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 斜切X[0.2] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 斜切X变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 斜切Y[0.2] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-修改单属性(周期) : 斜切Y变量%[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-还原所有单属性(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 清空周期指令
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（ 添加周期-隐藏(周期) ）
 *   的参数可以随意组合。一共有5*22种组合方式。
 * 2."添加周期"后，指令会根据"周期时长"和"开始时间"，持续循环执行。
 *   "清空周期指令"可以清空添加的指令。
 * 3.你可以塞入多条周期指令，每个周期指令控制不同的属性，实现复杂的变换效果。
 * 4."变量%["表示该变量修改属性值时，会缩小100倍。因为变量只能存整数。
 *   比如缩放的变量值为120时，则表示赋值： 120 / 100 = 1.2。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期移动到
 * 上述的插件指令中，移动到的插件指令也可以周期执行：
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-移动到(周期)-匀速移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-移动到(周期)-匀速移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-移动到(周期)-弹性移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-移动到(周期)-弹性移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-移动到(周期)-增减速移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-移动到(周期)-增减速移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-移动到(周期)-执行归位 : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 清空周期指令
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（ 添加周期-移动到(周期)-匀速移动 ）
 *   的参数可以随意组合。一共有5*8种组合方式。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期平铺GIF播放
 * 上述的插件指令中，平铺GIF播放也可以周期执行：
 * 
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-锁定帧(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-解锁帧(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-设置帧(周期) : 当前帧[1] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 添加周期-设置帧(周期) : 当前帧变量[21] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>战斗平铺GIF : 平铺GIF[11] : 清空周期指令
 * 
 * 1.前半部分（平铺GIF[11]）和 后半部分（ 添加周期-锁定帧(周期) ）
 *   的参数可以随意组合，一共有5*5种组合方式。
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
 * 测试方法：   在战斗中放置平铺GIF，进行性能测试。
 * 测试结果：   战斗界面中，平均消耗为：【21.30ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.平铺GIF在隐藏或透明度为0的时候，由于图像未工作，所以不会
 *   造成多少消耗。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了战斗层级结构。
 * [v1.2]
 * 优化了与战斗活动镜头的变换关系。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * [v1.4]
 * 整理了延迟插件指令的功能。
 * [v1.5]
 * 大幅度优化了底层结构，加强了插件的功能。
 * [v1.6]
 * 修改了插件与屏幕快照的兼容性。
 * [v1.7]
 * 完善了变换功能的插件指令。
 * [v1.8]
 * 整理改进了内部结构，并添加了周期指令。
 * 
 * 
 * 
 * @param ---平铺GIF样式组 1至20---
 * @default
 *
 * @param 平铺GIF样式-1
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-2
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-3
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-4
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-5
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-6
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-7
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-8
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-9
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-10
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-11
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-12
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-13
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-14
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-15
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-16
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-17
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-18
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-19
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-20
 * @parent ---平铺GIF样式组 1至20---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF样式组21至40---
 * @default
 *
 * @param 平铺GIF样式-21
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-22
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-23
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-24
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-25
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-26
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-27
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-28
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-29
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-30
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-31
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-32
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-33
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-34
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-35
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-36
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-37
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-38
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-39
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-40
 * @parent ---平铺GIF样式组21至40---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF样式组41至60---
 * @default
 *
 * @param 平铺GIF样式-41
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-42
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-43
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-44
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-45
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-46
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-47
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-48
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-49
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-50
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-51
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-52
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-53
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-54
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-55
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-56
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-57
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-58
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-59
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-60
 * @parent ---平铺GIF样式组41至60---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF样式组61至80---
 * @default
 *
 * @param 平铺GIF样式-61
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-62
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-63
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-64
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-65
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-66
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-67
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-68
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-69
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-70
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-71
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-72
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-73
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-74
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-75
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-76
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-77
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-78
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-79
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-80
 * @parent ---平铺GIF样式组61至80---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF样式组81至100---
 * @default
 *
 * @param 平铺GIF样式-81
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-82
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-83
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-84
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-85
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-86
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-87
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-88
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-89
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-90
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-91
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-92
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-93
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-94
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-95
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-96
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-97
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-98
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-99
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-100
 * @parent ---平铺GIF样式组81至100---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF样式组101至120---
 * @default
 *
 * @param 平铺GIF样式-101
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-102
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-103
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-104
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-105
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-106
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-107
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-108
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-109
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-110
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-111
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-112
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-113
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-114
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-115
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-116
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-117
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-118
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-119
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-120
 * @parent ---平铺GIF样式组101至120---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF样式组121至140---
 * @default
 *
 * @param 平铺GIF样式-121
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-122
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-123
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-124
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-125
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-126
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-127
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-128
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-129
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-130
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-131
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-132
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-133
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-134
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-135
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-136
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-137
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-138
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-139
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-140
 * @parent ---平铺GIF样式组121至140---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF样式组141至160---
 * @default
 *
 * @param 平铺GIF样式-141
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-142
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-143
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-144
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-145
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-146
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-147
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-148
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-149
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-150
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-151
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-152
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-153
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-154
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-155
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-156
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-157
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-158
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-159
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-160
 * @parent ---平铺GIF样式组141至160---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF样式组161至180---
 * @default
 *
 * @param 平铺GIF样式-161
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-162
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-163
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-164
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-165
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-166
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-167
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-168
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-169
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-170
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-171
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-172
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-173
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-174
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-175
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-176
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-177
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-178
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-179
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-180
 * @parent ---平铺GIF样式组161至180---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param ---平铺GIF样式组181至200---
 * @default
 *
 * @param 平铺GIF样式-181
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-182
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-183
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-184
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-185
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-186
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-187
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-188
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-189
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-190
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-191
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-192
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-193
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-194
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-195
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-196
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-197
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-198
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-199
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 * @param 平铺GIF样式-200
 * @parent ---平铺GIF样式组181至200---
 * @type struct<BTGTiledGif>
 * @desc 平铺GIF的详细配置信息。
 * @default 
 *
 */
/*~struct~BTGTiledGif:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的平铺GIF样式==
 * 
 * 
 * @param ---贴图---
 * @default 
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
 * @default ["(需配置)战斗平铺GIF"]
 * @require 1
 * @dir img/Battle__layer_gif/
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
 *
 * @param 平移-平铺GIF X
 * @parent ---贴图---
 * @desc x轴方向平移，正数向左，负数向右，单位像素。0为贴在最左边。这里表示进入战斗时图片的初始位置。
 * @default 0
 *
 * @param 平移-平铺GIF Y
 * @parent ---贴图---
 * @desc y轴方向平移，正数向上，负数向下，单位像素。0为贴在最上面。这里表示进入战斗时图片的初始位置。
 * @default 0
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
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 * 
 * @param 平铺的旋转角度
 * @parent ---贴图---
 * @desc 平铺图形的旋转角度。
 * @default 0.0
 *
 * @param 位移比X
 * @parent ---贴图---
 * @desc 与玩家战斗的镜头位置有关，设置1.00，平铺GIF和镜头的位移一致。设置0.00则平铺GIF不随镜头移动，紧贴战斗。负数则反向移动。
 * @default 0.00
 *
 * @param 位移比Y
 * @parent ---贴图---
 * @desc 与玩家战斗的镜头位置有关，设置1.00，平铺GIF和镜头的位移一致。设置0.00则平铺GIF不随镜头移动，紧贴战斗。负数则反向移动。
 * @default 0.00
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
 * @param 战斗层级
 * @parent ---贴图---
 * @type select
 * @option 下层
 * @value 下层
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
 * @desc 平铺GIF在同一个战斗层，先后排序的位置，0表示最后面。
 * @default 4
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
//		插件简称		BTG（Layer_Tiled_Gif）
//		临时全局变量	DrillUp.g_BTG_xxx
//		临时局部变量	this._drill_BTG_xxx
//		存储数据变量	$gameSystem._drill_BTG_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2)*o(贴图处理) 每帧
//		★性能测试因素	战斗场景-变化示例
//		★性能测试消耗	2024/6/15：
//							》只摆了一个平铺贴图：21.3ms（drill_sprite_updateChange）15.5ms（drill_sprite_updateGIF）10.8ms（drill_sprite_updateCommandChange）
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
//				->『变换特性-平铺贴图』
//					->修改单属性
//					->移动到
//					->获取属性
//					x->修改中心锚点
//					->延迟修改单属性（不含混合模式、层级、图片层级）
//					->延迟移动到
//					->周期修改单属性（不含混合模式、层级、图片层级）
//					->周期移动到
//				->其它特性
//					->GIF播放
//					->延迟GIF播放
//					->周期GIF播放
//			->☆预加载
//			->☆存储数据
//			->☆战斗层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			
//			->☆控制器与贴图
//				->界面创建
//				->实时创建
//				->控制器与镜头
//					> 位移比
//					->控制器帧刷新
//				->基础特性
//				->销毁
//			
//			->战斗平铺GIF控制器【Drill_BTG_Controller】
//				->Z镜头参数
//			->战斗平铺GIF贴图【Drill_BTG_Sprite】
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			17.主菜单 > 多层组合装饰（界面装饰）（脚本）.docx
//		
//		★插件私有类：
//			* 战斗平铺GIF控制器【Drill_BTG_Controller】
//			* 战斗平铺GIF贴图【Drill_BTG_Sprite】
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@    /@@@@@@    /@@@@@@  │
//			  │  /@@__  @@  /@@__  @@  /@@__  @@ │
//			  │ | @@  \ @@ |__/  \ @@ |__/  \ @@ │
//			  │ | @@  | @@   /@@@@@@/    /@@@@@/ │
//			  │ | @@  | @@  /@@____/    |___  @@ │
//			  │ | @@  | @@ | @@        /@@  \ @@ │
//			  │ |  @@@@@@/ | @@@@@@@@ |  @@@@@@/ │
//			  │  \______/  |________/  \______/  │
//			  └──────────────────────────────────┘
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
	DrillUp.g_BTG_PluginTip_curName = "Drill_BattleTiledGif.js 战斗-多层战斗平铺GIF";
	DrillUp.g_BTG_PluginTip_baseList = ["Drill_CoreOfBallistics.js 数学模型-弹道核心"];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_BTG_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_BTG_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_BTG_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_BTG_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_BTG_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_BTG_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_BTG_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - NaN校验值
	//==============================
	DrillUp.drill_BTG_getPluginTip_ParamIsNaN = function( param_name, check_tank ){
		var text = "【" + DrillUp.g_BTG_PluginTip_curName + "】\n检测到参数"+param_name+"出现了NaN值，请及时检查你的函数。";
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
	DrillUp.drill_BTG_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_BTG_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_BTG_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_BTG_PluginTip_curName + "】\n活动战斗镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_BTG_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_BTG_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 控制器的非数字参数
	//==============================
	DrillUp.drill_BTG_getPluginTip_controllerData_NotId = function( class_name ){
		return "【" + DrillUp.g_BTG_PluginTip_curName + "】\n错误，类对象 "+class_name+" 获取到了非数字参数，数据初始化失败。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_BattleTiledGif = true;
	Imported.Drill_LayerTiledGIF = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_BattleTiledGif');

	//==============================
	// * 静态数据 - 平铺GIF
	//				（~struct~BTGTiledGif）
	//==============================
	DrillUp.drill_BTG_backgroundInit = function( dataFrom ){
		var data = {};
		
		// > P预加载GIF管理
		data['preloadType'] = String( dataFrom["预加载类型"] || "关闭预加载");
		data['preloadNum'] = Number( dataFrom["固定预加载的数量"] || 35);
		
		
		// > A主体 - 基础特性
		if( dataFrom["资源-平铺GIF"] != "" &&
			dataFrom["资源-平铺GIF"] != undefined ){
			data['src_img_gif'] = JSON.parse( dataFrom["资源-平铺GIF"] );
		}else{
			data['src_img_gif'] = [];
		}
		data['src_img_file'] = "img/Battle__layer_gif/";
		data['interval'] = Number( dataFrom["帧间隔"] || 3);
		data['back_run'] = String( dataFrom["是否倒放"] || "false") == "true";
		
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = true;
		data['pause'] = false;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = String( dataFrom["战斗层级"] || "下层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体 - 其它特性
		data['XPer'] = Number( dataFrom["位移比X"] || 0);
		data['YPer'] = Number( dataFrom["位移比Y"] || 0);
		
		
		// > B变换特性
		data['x'] = Number( dataFrom["平移-平铺GIF X"] || 0);
		data['y'] = Number( dataFrom["平移-平铺GIF Y"] || 0);
		data['speedX'] = Number( dataFrom["平铺GIF-X速度"] || 0);
		data['speedY'] = Number( dataFrom["平铺GIF-Y速度"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['parentRotate'] = Number( dataFrom["平铺的旋转角度"] || 0.0);
		
		// > B变换特性 - 平铺的缩放与斜切
		//	（无）
		
		
		// > G自变化效果
		//		（平铺GIF 不含 摇晃效果）
		data['effect_float'] = String( dataFrom["浮动效果"] || "关闭");
		data['effect_floatSpeed'] = Number( dataFrom["浮动速度"] || 1.0);
		data['effect_floatRange'] = Number( dataFrom["浮动偏移量"] || 15);
		data['effect_flicker'] = String( dataFrom["闪烁效果"] || "关闭");
		data['effect_flickerSpeed'] = Number( dataFrom["闪烁速度"] || 6.0);
		data['effect_flickerRange'] = Number( dataFrom["闪烁幅度范围"] || 20);
		data['effect_zoom'] = String( dataFrom["缩放效果"] || "关闭");
		data['effect_zoomSpeed'] = Number( dataFrom["缩放速度"] || 1.0);
		data['effect_zoomRange'] = Number( dataFrom["缩放幅度范围"] || 0.2);
		
		// > O播放GIF
		data['gif_lock'] = String( dataFrom["初始是否锁定帧"] || "false") == "true";
		data['gif_initFrame'] = Number( dataFrom["锁定帧数"] || 0);
		
		// > 控制器 初始化数据『控制器与贴图的样式-静态数据-指针初始化』
		Drill_BTG_Controller.drill_controller_initData( data );
		
		return data;
	}
	//==============================
	// * 静态数据 - 最后继承1级
	//==============================
	var _drill_BTG_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_BTG_scene_initialize.call(this);
		
		/*-----------------平铺GIF样式-----------------*/
		for( var i = 0; i < DrillUp.g_BTG_style.length; i++ ){
			var temp = DrillUp.g_BTG_style[i];
			if( temp != undefined ){
				DrillUp.g_BTG_style[i] = DrillUp.drill_BTG_backgroundInit( temp );
			}
		}
	}
	/*-----------------平铺GIF样式-----------------*/
	DrillUp.g_BTG_style_length = 200;
	DrillUp.g_BTG_style = [];
	for( var i = 0; i < DrillUp.g_BTG_style_length; i++ ){
		if( DrillUp.parameters["平铺GIF样式-" + String(i+1) ] != undefined &&
			DrillUp.parameters["平铺GIF样式-" + String(i+1) ] != "" ){
			DrillUp.g_BTG_style[i] = JSON.parse(DrillUp.parameters["平铺GIF样式-" + String(i+1) ]);
		}else{
			DrillUp.g_BTG_style[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_BTG_getPluginTip_NeedUpdate_Ballistics() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_BTG_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_BTG_pluginCommand.call(this, command, args);
	this.drill_BTG_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_BTG_pluginCommand = function( command, args ){
	
	/*-----------------多插件的指令------------------*/
	if( command === ">清空全部战斗装饰部件" ){
		$gameSystem.drill_BTG_removeControllerAll();
		this.wait(1);	//（『强制等待』1帧，确保全部清空）
	}
	if( command === ">战斗平铺GIF" ){
		
		/*-----------------创建------------------*/
		if( args.length >= 6 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			var temp2 = String(args[5]);
			if( type == "创建" ){
				temp1 = temp1.replace("平铺GIF[","");
				temp1 = temp1.replace("]","");
				temp1 = Number( temp1 ) -1;
				temp2 = temp2.replace("样式[","");
				temp2 = temp2.replace("]","");
				temp2 = Number( temp2 ) -1;
				$gameSystem.drill_BTG_createController( temp1, temp2 );
				return;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "删除" ){
				temp1 = temp1.replace("平铺GIF[","");
				temp1 = temp1.replace("]","");
				temp1 = Number( temp1 ) -1;
				$gameSystem.drill_BTG_removeController( temp1 );
			}
		}
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "删除全部" ){
				$gameSystem.drill_BTG_removeControllerAll();
				this.wait(1);	//（『强制等待』1帧，确保全部清空）
			}
		}
		
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
					var temp_controller = $gameSystem._drill_BTG_controllerTank[ controller_id -1 ];
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
					var temp_controller = $gameSystem._drill_BTG_controllerTank[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("平铺GIF变量[") != -1 ){
				unit = unit.replace("平铺GIF变量[","");
				unit = unit.replace("]","");
				var controller_id = $gameVariables.value(Number(unit));
				var temp_controller = $gameSystem._drill_BTG_controllerTank[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit.indexOf("平铺GIF[") != -1 ){
				unit = unit.replace("平铺GIF[","");
				unit = unit.replace("]","");
				var controller_id = Number(unit);
				var temp_controller = $gameSystem._drill_BTG_controllerTank[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit == "全部平铺GIF" ){
				controllers = [];
				for( var k=0; k < $gameSystem._drill_BTG_controllerTank.length; k++ ){
					var temp_controller = $gameSystem._drill_BTG_controllerTank[ k ];
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
						controller.drill_controller_resetData( controller._drill_data_id );
						
						controller.drill_controller_commandChange_setMove( "匀速变化", Number(temp1_arr[0]), Number(temp1_arr[1]), 1 );
						controller.drill_controller_setLayerIndex( temp2 );
						controller.drill_controller_setZIndex( Number(temp3) );
						controller.drill_controller_commandChange_setSpeedX( "匀速变化", Number(temp4_arr[0]), 1 );
						controller.drill_controller_commandChange_setSpeedY( "匀速变化", Number(temp4_arr[1]), 1 );
						controller.drill_controller_setPer( Number(temp5_arr[0]), Number(temp5_arr[1]) );
					}
				}
				this.wait(1);	//（『强制等待』1帧，完成 初始属性调整）
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
				
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setOpacity(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setRotate(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("移动速度X[") != -1 ||
					temp1.indexOf("移动速度X变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSpeedX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ||
					temp1.indexOf("移动速度Y变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSpeedY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setScaleY(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ||
					temp1.indexOf("斜切X变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setSkewX(
							"匀速变化", num_list[0], Number(temp2)
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ||
					temp1.indexOf("斜切Y变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
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
					var num_list = this.drill_BTG_getArgNumList(temp1);
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
					var num_list = this.drill_BTG_getArgNumList(temp1);
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
					var num_list = this.drill_BTG_getArgNumList(temp1);
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
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setOpacity", 
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setRotate",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("移动速度X[") != -1 ||
					temp1.indexOf("移动速度X变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSpeedX",
							["匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ||
					temp1.indexOf("移动速度Y变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSpeedY",
							["匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setScaleY",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ||
					temp1.indexOf("斜切X变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setSkewX",
							[ "匀速变化", num_list[0], Number(temp2) ], delay_time
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ||
					temp1.indexOf("斜切Y变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
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
					var num_list = this.drill_BTG_getArgNumList(temp1);
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
					var num_list = this.drill_BTG_getArgNumList(temp1);
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
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							"drill_controller_commandChange_setMove",
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
		}
		/*-----------------E延迟指令 + O播放GIF------------------*/
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
			var num_list = this.drill_BTG_getArgNumList( temp1 );
			
			if( type == "设置帧(延迟)" || type == "设置当前帧(延迟)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						"drill_controller_GIF_setFrame",
						[ num_list[0]-1 ], delay_time
					);
				}
			}
		}
		
		/*-----------------F周期指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "清空周期指令" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_clearPeriodizeCommand();
				}
			}
		}
		if( args.length == 8 ){
			var type = String(args[3]);
			var time_period = String(args[5]);
			var time_start = String(args[7]);
			if( type == "添加周期-显示(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_setVisible", [true], time_period, time_start
					);
				}
			}
			if( type == "添加周期-隐藏(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_setVisible", [false], time_period, time_start
					);
				}
			}
			if( type == "添加周期-暂停(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_setPause", [true], time_period, time_start
					);
				}
			}
			if( type == "添加周期-继续(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_setPause", [false], time_period, time_start
					);
				}
			}
			if( type == "添加周期-还原所有单属性(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_commandChange_restoreAttr", [], time_period, time_start
					);
				}
			}
			if( type == "添加周期-移动到(周期)-执行归位" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_commandChange_restoreMove", [], time_period, time_start
					);
				}
			}
		}
		if( args.length == 12 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var temp2 = String(args[7]);
			var time_period = String(args[9]);
			var time_start = String(args[11]);
			if( type == "添加周期-修改单属性(周期)" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				
				if( temp1.indexOf("透明度[") != -1 ||
					temp1.indexOf("透明度变量[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setOpacity", 
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("旋转[") != -1 ||
					temp1.indexOf("旋转变量[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setRotate",
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("移动速度X[") != -1 ||
					temp1.indexOf("移动速度X变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setSpeedX",
							["匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("移动速度Y[") != -1 ||
					temp1.indexOf("移动速度Y变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setSpeedY",
							["匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("缩放X[") != -1 ||
					temp1.indexOf("缩放X变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setScaleX",
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("缩放Y[") != -1 ||
					temp1.indexOf("缩放Y变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setScaleY",
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("斜切X[") != -1 ||
					temp1.indexOf("斜切X变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setSkewX",
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
				if( temp1.indexOf("斜切Y[") != -1 ||
					temp1.indexOf("斜切Y变量%[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setSkewY",
							[ "匀速变化", num_list[0], Number(temp2) ], time_period, time_start
						);
					}
				}
			}
			if( type == "添加周期-移动到(周期)-匀速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setMove",
							[ "匀速变化", num_list[0], num_list[1], Number(temp2) ], time_period, time_start
						);
					}
				}
			}
			if( type == "添加周期-移动到(周期)-弹性移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setMove",
							[ "弹性变化", num_list[0], num_list[1], Number(temp2) ], time_period, time_start
						);
					}
				}
			}
			if( type == "添加周期-移动到(周期)-增减速移动" ){
				temp2 = temp2.replace("时间[","");
				temp2 = temp2.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				if( temp1.indexOf("位置[") != -1 ||
					temp1.indexOf("位置变量[") != -1 ){
					var num_list = this.drill_BTG_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							"drill_controller_commandChange_setMove",
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], time_period, time_start
						);
					}
				}
			}
		}
		/*-----------------F周期指令 + O播放GIF------------------*/
		if( args.length == 8 ){
			var type = String(args[3]);
			var time_period = String(args[5]);
			var time_start = String(args[7]);
			time_period = time_period.replace("周期时长[","");
			time_period = time_period.replace("]","");
			time_period = Number( time_period );
			time_start = time_start.replace("周期内开始时间[","");
			time_start = time_start.replace("]","");
			time_start = Number( time_start );
			if( type == "添加周期-锁定帧(周期)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_GIF_setLocked",
						[ true ], time_period, time_start
					);
				}
			}
			if( type == "添加周期-解锁帧(周期)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_GIF_setLocked",
						[ false ], time_period, time_start
					);
				}
			}
		}
		if( args.length == 10 ){
			var type = String(args[3]);
			var temp1 = String(args[5]);
			var time_period = String(args[7]);
			var time_start = String(args[9]);
			time_period = time_period.replace("周期时长[","");
			time_period = time_period.replace("]","");
			time_period = Number( time_period );
			time_start = time_start.replace("周期内开始时间[","");
			time_start = time_start.replace("]","");
			time_start = Number( time_start );
			var num_list = this.drill_LTG_getArgNumList( temp1 );
			
			if( type == "添加周期-设置帧(周期)" || type == "添加周期-设置当前帧(周期)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						"drill_controller_GIF_setFrame",
						[ num_list[0]-1 ], time_period, time_start
					);
				}
			}
		}
		
		/*-----------------O播放GIF------------------*/
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
			var num_list = this.drill_BTG_getArgNumList( temp1 );
			
			if( type == "设置帧" || type == "设置当前帧" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_GIF_setFrame( num_list[0]-1 );
				}
			}
		}
	}
	
	/*-----------------旧指令------------------*/
	if( command === ">战斗平铺GIF" ){
		if( args.length == 10 ){
			var id = -1;
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var delay_time = String(args[5]);
			var change_time = String(args[7]);
			var value_str = String(args[9]);
			
			if( temp1.indexOf("平铺GIF[") != -1 ){
				temp1 = temp1.replace("平铺GIF[","");
				temp1 = temp1.replace("]","");
				id = Number(temp1) -1;
			}
			if( temp1.indexOf("平铺GIF变量[") != -1 ){
				temp1 = temp1.replace("平铺GIF变量[","");
				temp1 = temp1.replace("]","");
				id = $gameVariables.value(Number(temp1)) -1;
			}
			if( id == -1 ){ return; }
			var controller = $gameSystem._drill_BTG_controllerTank[ id ];
			if( controller == undefined ){ return; }
			delay_time = delay_time.replace("延迟[","");
			delay_time = delay_time.replace("]","");
			change_time = change_time.replace("变化时间[","");
			change_time = change_time.replace("]","");
			
			if( type == "变透明" ){
				var num_list = this.drill_BTG_getArgNumList(value_str);
				controller.drill_controller_setDelayingCommand(
					"drill_controller_commandChange_setOpacity", 
					[ "匀速变化", num_list[0], Number(change_time) ], delay_time
				);
				return;
			}
			if( type == "变速度" ){
				var num_list = this.drill_BTG_getArgNumList(value_str);
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
				var num_list = this.drill_BTG_getArgNumList(value_str);
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
Game_Interpreter.prototype.drill_BTG_getArgNumList = function( arg_str ){
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
var _drill_BTG_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_BTG_preload_initialize.call(this);
	this.drill_BTG_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_BTG_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_BTG_preloadInit = function(){
	this._drill_BTG_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_BTG_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_BTG_style.length; i++ ){
		var temp_data = DrillUp.g_BTG_style[i];
		if( temp_data == undefined ){ continue; }
		
		// > P预加载GIF管理
		if( temp_data['preloadType'] == "全部预加载" ){
			var src_img_num = temp_data['src_img_gif'].length;
			for( var k = 0; k < src_img_num; k++ ){
				this._drill_BTG_preloadTank.push( 
					ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img_gif'][k], temp_data['tint'], temp_data['smooth'], this._drill_BTG_cacheId ) 
				);
			}
		}
		if( temp_data['preloadType'] == "固定预加载数量" ){
			var src_img_num = temp_data['preloadNum'];
			if( src_img_num >= temp_data['src_img_gif'].length ){ src_img_num = temp_data['src_img_gif'].length; }
			for( var k = 0; k < src_img_num; k++ ){
				this._drill_BTG_preloadTank.push( 
					ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img_gif'][k], temp_data['tint'], temp_data['smooth'], this._drill_BTG_cacheId ) 
				);
			}
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
DrillUp.g_BTG_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BTG_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(){
    _drill_BTG_sys_initialize.call(this);
	this.drill_BTG_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_BTG_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_BTG_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_BTG_saveEnabled == true ){	
		$gameSystem.drill_BTG_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_BTG_initSysData();
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
Game_System.prototype.drill_BTG_initSysData = function(){
	this.drill_BTG_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_BTG_checkSysData = function(){
	this.drill_BTG_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_BTG_initSysData_Private = function(){
	
    this._drill_BTG_controllerTank = [];
	//（初始为空容器，不需要初始化）
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_BTG_checkSysData_Private = function(){
	
	// > 旧存档数据自动补充
	if( this._drill_BTG_controllerTank == undefined ){
		this.drill_BTG_initSysData();
	}
	
	// > 容器的 空数据 检查
	//	（容器一直就是空数据，战斗前才赋值，且只在战斗时用到）
	
};
//==============================
// * 存储数据 - 创建控制器（开放函数）
//==============================
Game_System.prototype.drill_BTG_createController = function( slot_id, style_id ){
	if( this._drill_BTG_controllerTank == undefined ){
		this._drill_BTG_controllerTank = [];
	}
	
	// > 销毁原来的
	this.drill_BTG_removeController( slot_id );
	
	// > 创建控制器
	var temp_controller = new Drill_BTG_Controller( style_id );
	this._drill_BTG_controllerTank[ slot_id ] = temp_controller;
	
	// > 刷新统计
	$gameTemp._drill_BTG_needRestatistics = true;
}
//==============================
// * 存储数据 - 去除控制器（开放函数）
//==============================
Game_System.prototype.drill_BTG_removeController = function( slot_id ){
	if( this._drill_BTG_controllerTank == undefined ){ return; }
	if( this._drill_BTG_controllerTank[ slot_id ] == undefined ){ return; }
	this._drill_BTG_controllerTank[ slot_id ].drill_controller_destroy();
	this._drill_BTG_controllerTank[ slot_id ] = null;
}
//==============================
// * 存储数据 - 去除全部控制器（开放函数）
//==============================
Game_System.prototype.drill_BTG_removeControllerAll = function(){
	if( this._drill_BTG_controllerTank == undefined ){ return; }
	for( var i=0; i < this._drill_BTG_controllerTank.length; i++ ){
		this.drill_BTG_removeController( i );
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
Scene_Battle.prototype.drill_BTG_layerAddSprite = function( sprite, layer_index ){
	this.drill_BTG_layerAddSprite_Private( sprite, layer_index );
}
//##############################
// * 战斗层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从战斗层级中移除。
//##############################
Scene_Battle.prototype.drill_BTG_layerRemoveSprite = function( sprite ){
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
Scene_Battle.prototype.drill_BTG_sortByZIndex = function () {
    this.drill_BTG_sortByZIndex_Private();
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
Scene_Battle.prototype.drill_BTG_layerCameraMoving = function( x, y, layer, option ){
	return this.drill_BTG_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 战斗层级（接口实现）
//=============================================================================
//==============================
// * 战斗层级 - 下层
//==============================
var _drill_BTG_battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function(){    
	_drill_BTG_battle_createBattleback.call(this);
	if( !this._drill_battleDownArea ){
		this._drill_battleDownArea = new Sprite();
		this._drill_battleDownArea.z = 0;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleDownArea);	
	}
};
//==============================
// * 战斗层级 - 上层
//==============================
var _drill_BTG_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function(){
    _drill_BTG_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// * 战斗层级 - 图片层
//==============================
var _drill_BTG_battle_createPictures = Spriteset_Battle.prototype.createPictures;
Spriteset_Battle.prototype.createPictures = function(){
	_drill_BTG_battle_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_battlePicArea ){
		this._drill_battlePicArea = new Sprite();
		this.addChild(this._drill_battlePicArea);	
	}
}
//==============================
// * 战斗层级 - 最顶层
//==============================
var _drill_BTG_battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function(){
	_drill_BTG_battle_createAllWindows.call(this);	//对话框集合 < 最顶层
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
Scene_Battle.prototype.drill_BTG_sortByZIndex_Private = function(){
	this._spriteset._drill_battleDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_battlePicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 战斗层级 - 添加贴图到层级（私有）
//==============================
Scene_Battle.prototype.drill_BTG_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Battle.prototype.drill_BTG_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
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
// ** ☆控制器与贴图
//
//			说明：	> 此模块专门管理 贴图 的创建与销毁。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 控制器与贴图 - 容器初始化
//==============================
var _drill_BTG_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_BTG_temp_initialize2.call(this);
	this._drill_BTG_spriteTank = [];				//贴图容器
};
//==============================
// * 控制器与贴图 - 销毁时（战斗界面）
//==============================
var _drill_BTG_smap_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function(){
	_drill_BTG_smap_terminate.call(this);
	$gameTemp._drill_BTG_spriteTank = [];		//贴图容器
};
//==============================
// * 控制器与贴图 - 帧刷新（战斗界面）
//==============================
var _drill_BTG_smap_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	_drill_BTG_smap_update.call(this);
	this.drill_BTG_updateRestatisticsCreate();	//帧刷新 - 实时创建
	this.drill_BTG_updateControllerCamera();	//帧刷新 - 控制器与镜头
	this.drill_BTG_updateAttr();				//帧刷新 - 基础特性
	this.drill_BTG_updateDestroy();				//帧刷新 - 销毁
};
//==============================
// * 控制器与贴图 - 界面创建时（战斗界面）
//==============================
var _drill_BTG_smap_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function(){
	_drill_BTG_smap_createAllWindows.call(this);
	this.drill_BTG_create();
};
//==============================
// * 控制器与贴图 - 界面创建
//==============================
Scene_Battle.prototype.drill_BTG_create = function(){
	$gameTemp._drill_BTG_spriteTank = [];			//贴图容器（不允许出现null值）
	
	for(var i=0; i< $gameSystem._drill_BTG_controllerTank.length; i++){
		var temp_controller = $gameSystem._drill_BTG_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		
		// > 创建贴图
		var temp_sprite = new Drill_BTG_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		
		// > 添加贴图到层级
		$gameTemp._drill_BTG_spriteTank.push( temp_sprite );
		this.drill_BTG_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
	}
	
	// > 层级排序
	this.drill_BTG_sortByZIndex();
}
//==============================
// * 控制器与贴图 - 实时创建
//
//			说明：	> 插件指令实时创建了控制器后，根据 控制器容器 筛选并创建对应的贴图。
//==============================
Scene_Battle.prototype.drill_BTG_updateRestatisticsCreate = function(){
	if( $gameTemp._drill_BTG_needRestatistics != true ){ return; }
	$gameTemp._drill_BTG_needRestatistics = false;
	
	for( var i=0; i < $gameSystem._drill_BTG_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_BTG_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 过滤生命周期结束情况
		if( temp_controller.drill_controller_isDead() == true ){ continue; }
		
		// > 有绑定控制器的贴图时，跳过
		if( this.drill_BTG_hasSpriteBinding( temp_controller._drill_controllerSerial ) == true ){ continue; }
		
		
		// > 创建贴图
		var temp_sprite = new Drill_BTG_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 添加贴图到层级
		$gameTemp._drill_BTG_spriteTank.push( temp_sprite );
		this.drill_BTG_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
	}
	
	// > 层级排序
	this.drill_BTG_sortByZIndex();
}
//==============================
// * 控制器与贴图 - 实时创建 - 是否含有绑定控制器的贴图
//==============================
Scene_Battle.prototype.drill_BTG_hasSpriteBinding = function( serial ){
	for( var i=0; i < $gameTemp._drill_BTG_spriteTank.length; i++){
		if( $gameTemp._drill_BTG_spriteTank[i]._drill_curSerial == serial ){
			return true;
		}
	}
	return false;
}

//==============================
// * 控制器与贴图 - 帧刷新 控制器与镜头
//==============================
Scene_Battle.prototype.drill_BTG_updateControllerCamera = function(){
	for(var i = 0; i < $gameSystem._drill_BTG_controllerTank.length; i++ ){
		var temp_controller = $gameSystem._drill_BTG_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 控制器帧刷新
		temp_controller.drill_controller_update();
		
		
		// > 镜头位移结果（战斗参照）
		var xx = 0;
		var yy = 0;
		
		// > 镜头位移结果 - 层级与镜头的位移
		var option = {
			"XPer": temp_controller._drill_XPer,
			"YPer": temp_controller._drill_YPer,
		};
		var pos = this.drill_BTG_layerCameraMoving(xx, yy, temp_controller._drill_layerIndex, option );
		xx = pos.x;
		yy = pos.y;
		
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
Scene_Battle.prototype.drill_BTG_updateAttr = function(){
	var has_layerChange = false;
	for(var i = 0; i < $gameTemp._drill_BTG_spriteTank.length; i++){
		var temp_sprite = $gameTemp._drill_BTG_spriteTank[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 基础特性 - 战斗层级
		if( temp_sprite.layerIndex != temp_controller._drill_layerIndex ){
			temp_sprite.layerIndex =  temp_controller._drill_layerIndex;
			this.drill_BTG_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
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
		this.drill_BTG_sortByZIndex();
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 销毁
//==============================
Scene_Battle.prototype.drill_BTG_updateDestroy = function(){
	
	// > 自动销毁 - 控制器
	for(var i = $gameSystem._drill_BTG_controllerTank.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_BTG_controllerTank[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_BTG_controllerTank.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_BTG_spriteTank.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_BTG_spriteTank[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_BTG_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_BTG_spriteTank.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
};



//=============================================================================
// ** 战斗平铺GIF控制器【Drill_BTG_Controller】
// **		
// **		作用域：	战斗界面
// **		主功能：	定义一个专门控制战斗平铺GIF的数据类。
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
// **					->C校验值
// **					->D指令叠加变化
// **						> 主体贴图>移动到
// **						> 主体贴图>透明度
// **						> 平铺贴图>移动速度X
// **						> 平铺贴图>移动速度Y
// **						> 主体贴图>旋转（锚点为正中心）
// **						> 平铺贴图>缩放X
// **						> 平铺贴图>缩放Y
// **						> 主体贴图>斜切X（锚点为正中心）
// **						> 主体贴图>斜切Y（锚点为正中心）
// **					->E延迟指令
// **					->F周期指令
// **					->G自变化效果
// **						> 平铺贴图>浮动效果
// **						> 主体贴图>闪烁效果
// **						> 主体贴图>缩放效果
// **					
// **					->O播放GIF
// **						->设置帧
// **						->锁定帧/解锁帧
// **						->单次播放
// **					->P预加载GIF管理
// **					
// **					->Z镜头参数
// **					
// **		说明：	> 注意，该类不能放 物体指针、贴图指针 。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_BTG_Controller(){
    this.initialize.apply(this, arguments);
};
//==============================
// * 控制器 - 初始化
//==============================
Drill_BTG_Controller.prototype.initialize = function( data_id ){
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
Drill_BTG_Controller.prototype.drill_controller_update = function(){
	this.drill_controller_updateDelayingCommandImportant();		//帧刷新 - E延迟指令 - 时间流逝
	this.drill_controller_updatePeriodizeCommandImportant();	//帧刷新 - F周期指令 - 时间流逝
	if( this._drill_pause == true ){ return; }
	this.drill_controller_updateAttr();							//帧刷新 - A主体
	this.drill_controller_updateChange_Position();				//帧刷新 - B变换特性 - 平移
	this.drill_controller_updateChange_MoveRange();				//帧刷新 - B变换特性 - 平铺范围
	this.drill_controller_updateCommandChange();				//帧刷新 - D指令叠加变化
	this.drill_controller_updateDelayingCommand();				//帧刷新 - E延迟指令 - 执行延迟指令
	this.drill_controller_updatePeriodizeCommand();				//帧刷新 - F周期指令 - 执行延迟指令
	this.drill_controller_updateEffect();						//帧刷新 - G自变化效果
	
	this.drill_controller_updateGIF();							//帧刷新 - O播放GIF
																//帧刷新 - P预加载GIF管理（无）
	
																//帧刷新 - Z镜头参数（无）
	
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
Drill_BTG_Controller.prototype.drill_controller_resetData = function( data_id ){
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
Drill_BTG_Controller.prototype.drill_controller_setVisible = function( visible ){
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
Drill_BTG_Controller.prototype.drill_controller_setPause = function( pause ){
	this._drill_pause = pause;
};
//##############################
// * 控制器 - 设置销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_BTG_Controller.prototype.drill_controller_destroy = function(){
	this._drill_needDestroy = true;
};
//##############################
// * 控制器 - 判断销毁【标准函数】
//
//			参数：	> 无
//			返回：	> 布尔
//##############################
Drill_BTG_Controller.prototype.drill_controller_isDead = function(){
	return this._drill_needDestroy == true;
};

//##############################
// * 控制器 - 切换混合模式【标准函数】
//
//			参数：	> blendMode 数字
//			返回：	> 无
//##############################
Drill_BTG_Controller.prototype.drill_controller_setBlendMode = function( blendMode ){
	this._drill_blendMode = blendMode;
};
//##############################
// * 控制器 - 切换战斗层级【标准函数】
//
//			参数：	> layerIndex 字符串
//			返回：	> 无
//##############################
Drill_BTG_Controller.prototype.drill_controller_setLayerIndex = function( layerIndex ){
	this._drill_layerIndex = layerIndex;
};
//##############################
// * 控制器 - 切换图片层级【标准函数】
//
//			参数：	> zIndex 数字
//			返回：	> 无
//##############################
Drill_BTG_Controller.prototype.drill_controller_setZIndex = function( zIndex ){
	this._drill_zIndex = zIndex;
};
//##############################
// * 控制器 - 修改位移比【标准函数】
//
//			参数：	> xPer,yPer 数字
//			返回：	> 无
//##############################
Drill_BTG_Controller.prototype.drill_controller_setPer = function( xPer, yPer ){
	this._drill_XPer = xPer;
	this._drill_YPer = yPer;
};

//##############################
// * O播放GIF - 设置帧【标准函数】
//
//			参数：	> cur_frame 数字（当前帧）
//			返回：	> 无
//			
//			说明：	> 从帧数0开始计数。
//##############################
Drill_BTG_Controller.prototype.drill_controller_GIF_setFrame = function( cur_frame ){
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
Drill_BTG_Controller.prototype.drill_controller_GIF_setLocked = function( locked ){
	this._drill_GIF_lockEnabled = locked;
	this._drill_GIF_oncePlay = false;
};
//##############################
// * O播放GIF - 单次播放【标准函数】
//
//			参数：	> once_type 字符串（forwardRun正向播放/backRun反向播放）
//			返回：	> 无
//##############################
Drill_BTG_Controller.prototype.drill_controller_GIF_setOncePlay = function( once_type ){
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
Drill_BTG_Controller.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 接收数据 的参数）
	
	// > A主体 - 基础特性
	if( data['src_img_gif'] == undefined ){ data['src_img_gif'] = [] };								//A主体 - 资源
	if( data['src_img_file'] == undefined ){ data['src_img_file'] = "img/Battle__layer_gif/" };		//A主体 - 文件夹
	if( data['interval'] == undefined ){ data['interval'] = 4 };									//A主体 - 帧间隔
	if( data['back_run'] == undefined ){ data['back_run'] = false };								//A主体 - 是否倒放
	
	if( data['tint'] == undefined ){ data['tint'] = 0 };											//A主体 - 图像-色调值
	if( data['smooth'] == undefined ){ data['smooth'] = false };									//A主体 - 图像-模糊边缘
	
	if( data['visible'] == undefined ){ data['visible'] = true };									//A主体 - 显示/隐藏
	if( data['pause'] == undefined ){ data['pause'] = false };										//A主体 - 暂停/继续
	if( data['blendMode'] == undefined ){ data['blendMode'] = 0 };									//A主体 - 混合模式
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "上层" };							//A主体 - 战斗层级
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };										//A主体 - 图片层级
	
	// > A主体 - 其它特性
	if( data['XPer'] == undefined ){ data['XPer'] = 0 };											//A主体 - 位移比X
	if( data['YPer'] == undefined ){ data['YPer'] = 0 };											//A主体 - 位移比Y
	
	
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
	if( data['effect_zoom'] == undefined ){ data['effect_zoom'] = "关闭" };							//G自变化效果 - 缩放效果
	if( data['effect_zoomSpeed'] == undefined ){ data['effect_zoomSpeed'] = 1.0 };					//G自变化效果 - 缩放速度
	if( data['effect_zoomRange'] == undefined ){ data['effect_zoomRange'] = 0.2 };					//G自变化效果 - 缩放幅度范围
	
	// > O播放GIF
	if( data['gif_lock'] == undefined ){ data['gif_lock'] = false };								//O播放GIF - 初始是否锁定帧
	if( data['gif_initFrame'] == undefined ){ data['gif_initFrame'] = 0 };							//O播放GIF - 锁定帧数
	
	// > P预加载GIF管理
	if( data['preloadType'] == undefined ){ data['preloadType'] = "关闭预加载" };					//P预加载GIF管理 - 预加载类型
	if( data['preloadNum'] == undefined ){ data['preloadNum'] = 35 };								//P预加载GIF管理 - 固定预加载的数量
	
	// > Z镜头参数（无）
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_BTG_Controller.prototype.drill_controller_initChild = function(){
	this.drill_controller_initAttr();				//初始化子功能 - A主体
	this.drill_controller_initChange();				//初始化子功能 - B变换特性
	this.drill_controller_initCheck();				//初始化子功能 - C校验值
	this.drill_controller_initCommandChange();		//初始化子功能 - D指令叠加变化
	this.drill_controller_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_controller_initPeriodizeCommand();	//初始化子功能 - F周期指令
	this.drill_controller_initEffect();				//初始化子功能 - G自变化效果
	
	this.drill_controller_initGIF();				//初始化子功能 - O播放GIF
	this.drill_controller_initPreload();			//初始化子功能 - P预加载GIF管理
	
	this.drill_controller_initCamera();				//初始化子功能 - Z镜头参数
}
//==============================
// * 控制器 - 重设数据（私有）
//
//			说明：	data对象中的参数【可以缺项】。
//==============================
Drill_BTG_Controller.prototype.drill_controller_resetData_Private = function( data_id ){
	
	// > 参数检查
	if( typeof data_id != "number" ){
		alert( DrillUp.drill_BTG_getPluginTip_controllerData_NotId("Drill_BTG_Controller") );
		throw Error( DrillUp.drill_BTG_getPluginTip_controllerData_NotId("Drill_BTG_Controller") );
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
DrillUp.g_BTG_notFindStyleAlertOnce = true;
//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』空的静态数据
//			
//			说明：	> 空数据会在initData时会进行默认值初始化，在其他地方只读。
//##############################
Drill_BTG_Controller.emptyData = {};
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
Drill_BTG_Controller.prototype.drill_data = function(){
	var cur_styleId   = this._drill_data_id +1;
	var cur_styleData = DrillUp.g_BTG_style[ this._drill_data_id ];
	if( cur_styleData == undefined ){
		
		// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（只执行一次）
		if( DrillUp.g_BTG_notFindStyleAlertOnce == true ){
			DrillUp.g_BTG_notFindStyleAlertOnce = false;
			alert( DrillUp.drill_BTG_getPluginTip_StyleNotFind(cur_styleId) );
		}
		return Drill_BTG_Controller.emptyData;
	}
	return cur_styleData;
};


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_BTG_Controller.prototype.drill_controller_initAttr = function(){
	var data = this.drill_data();
	
	// > A主体 - 基础特性
	this._drill_visible = data['visible'];			//控制器 - 显示/隐藏
	this._drill_pause = data['pause'];				//控制器 - 暂停/继续
	this._drill_blendMode = data['blendMode'];		//控制器 - 混合模式
	this._drill_layerIndex = data['layerIndex'];	//控制器 - 层级
	this._drill_zIndex = data['zIndex'];			//控制器 - 堆叠级
	
	// > A主体 - 其它特性
	this._drill_XPer = data['XPer'];
	this._drill_YPer = data['YPer'];
	
	// > 常规
	this._drill_curTime = 0;			//常规 - 当前时间
	this._drill_needDestroy = false;	//常规 - 销毁
}
//==============================
// * A主体 - 帧刷新
//==============================
Drill_BTG_Controller.prototype.drill_controller_updateAttr = function(){
	
	// > 时间流逝
	this._drill_curTime += 1;
}

//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_BTG_Controller.prototype.drill_controller_initChange = function(){
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
	
	// > 【战斗 - 活动战斗镜头】镜头架高宽的影响
	if( Imported.Drill_BattleCamera ){
		ww = $gameSystem._drill_cam_limit_width;
		hh = $gameSystem._drill_cam_limit_height;
	}
	
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
Drill_BTG_Controller.prototype.drill_controller_updateChange_Position = function(){
	
	// > 自累积位移
	this._drill_change_selfXAcc += this.drill_controller_finalTransform_selfXSpeed();
	this._drill_change_selfYAcc += this.drill_controller_finalTransform_selfYSpeed();
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置X（可继承，开放函数）
//##############################
Drill_BTG_Controller.prototype.drill_controller_finalTransform_x = function(){
	return this._drill_change_x + this._drill_change_selfXAcc + this._drill_move_originOffsetX
		+ this._drill_cameraResultSpriteX;	//（镜头位移结果，见函数 drill_BTG_updateControllerCamera ）
}
//##############################
// * B变换特性 - 数据最终变换值 - 位置Y（可继承，开放函数）
//##############################
Drill_BTG_Controller.prototype.drill_controller_finalTransform_y = function(){
	return this._drill_change_y + this._drill_change_selfYAcc + this._drill_move_originOffsetY
		+ this._drill_cameraResultSpriteY;	//（镜头位移结果，见函数 drill_BTG_updateControllerCamera ）
}
//##############################
// * B变换特性 - 数据最终变换值 - 移动速度X（可继承，开放函数）
//##############################
Drill_BTG_Controller.prototype.drill_controller_finalTransform_selfXSpeed = function(){
	return this._drill_change_selfXSpeed;
}
//##############################
// * B变换特性 - 数据最终变换值 - 移动速度Y（可继承，开放函数）
//##############################
Drill_BTG_Controller.prototype.drill_controller_finalTransform_selfYSpeed = function(){
	return this._drill_change_selfYSpeed;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放X（可继承，开放函数）
//##############################
Drill_BTG_Controller.prototype.drill_controller_finalTransform_scaleX = function(){
	return this._drill_change_scaleX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 缩放Y（可继承，开放函数）
//##############################
Drill_BTG_Controller.prototype.drill_controller_finalTransform_scaleY = function(){
	return this._drill_change_scaleY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 透明度（可继承，开放函数）
//##############################
Drill_BTG_Controller.prototype.drill_controller_finalTransform_opacity = function(){
	return this._drill_change_opacity;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切X（可继承，开放函数）
//##############################
Drill_BTG_Controller.prototype.drill_controller_finalTransform_skewX = function(){
	return this._drill_change_skewX;
}
//##############################
// * B变换特性 - 数据最终变换值 - 斜切Y（可继承，开放函数）
//##############################
Drill_BTG_Controller.prototype.drill_controller_finalTransform_skewY = function(){
	return this._drill_change_skewY;
}
//##############################
// * B变换特性 - 数据最终变换值 - 旋转（可继承，开放函数）
//##############################
Drill_BTG_Controller.prototype.drill_controller_finalTransform_rotate = function(){
	return this._drill_change_rotate;
}
//==============================
// * B变换特性 - 帧刷新 平铺范围
//==============================
Drill_BTG_Controller.prototype.drill_controller_updateChange_MoveRange = function(){
	if( this._drill_change_rotate == 0 && 
		this._drill_change_skewX == 0 && 
		this._drill_change_skewY == 0 ){ return; }
	
	// > 矩形变换后的外接矩形
	//		（这个函数用于获取 旋转+斜切 变换后的矩形高宽）
	var ww = Graphics.boxWidth;
	var hh = Graphics.boxHeight;
	var rect = $gameTemp.drill_BTG_Math2D_getRectWithTransform(
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
Game_Temp.prototype.drill_BTG_Math2D_getRectWithTransform = function( 
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
	var pp1 = $gameTemp.drill_BTG_Math2D_getPointWithTransform( p1_x,p1_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp2 = $gameTemp.drill_BTG_Math2D_getPointWithTransform( p2_x,p2_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp3 = $gameTemp.drill_BTG_Math2D_getPointWithTransform( p3_x,p3_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	var pp4 = $gameTemp.drill_BTG_Math2D_getPointWithTransform( p4_x,p4_y, c_x,c_y, rotation, scale_x,scale_y, skew_x,skew_y );
	
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
Game_Temp.prototype.drill_BTG_Math2D_getPointWithTransform = function( 
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
// * C校验值 - 初始化子功能
//==============================
Drill_BTG_Controller.prototype.drill_controller_initCheck = function(){
	//（无）
}
//==============================
// * C校验值 - 校验标记
//==============================
DrillUp.g_BTG_checkNaN = true;
//==============================
// * C校验值 - 帧刷新
//==============================
Drill_BTG_Controller.prototype.drill_controller_updateCheckNaN = function(){
	if( $gameTemp == undefined ){ return; }		//（测试版开启功能，发布版关闭功能）
	if( $gameTemp.isPlaytest() != true ){ return; }
	
	// > 校验值
	if( DrillUp.g_BTG_checkNaN == true ){
		if( isNaN( this.drill_controller_finalTransform_x() ) ){
			DrillUp.g_BTG_checkNaN = false;
			var check_tank = {};
			check_tank["_drill_change_x"] = this._drill_change_x;
			check_tank["_drill_change_selfXAcc"] = this._drill_change_selfXAcc;
			check_tank["_drill_move_originOffsetX"] = this._drill_move_originOffsetX;
			check_tank["_drill_cameraResultSpriteX"] = this._drill_cameraResultSpriteX;
			alert( DrillUp.drill_BTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_x", check_tank ) );
		}
		if( isNaN( this.drill_controller_finalTransform_y() ) ){
			DrillUp.g_BTG_checkNaN = false;
			var check_tank = {};
			check_tank["_drill_change_y"] = this._drill_change_y;
			check_tank["_drill_change_selfYAcc"] = this._drill_change_selfYAcc;
			check_tank["_drill_move_originOffsetY"] = this._drill_move_originOffsetY;
			check_tank["_drill_cameraResultSpriteY"] = this._drill_cameraResultSpriteY;
			alert( DrillUp.drill_BTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_y", check_tank ) );
		}
		if( isNaN( this.drill_controller_finalTransform_opacity() ) ){
			DrillUp.g_BTG_checkNaN = false;
			alert( DrillUp.drill_BTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_opacity" ) );
		}
		if( isNaN( this.drill_controller_finalTransform_rotate() ) ){
			DrillUp.g_BTG_checkNaN = false;
			alert( DrillUp.drill_BTG_getPluginTip_ParamIsNaN( "drill_controller_finalTransform_rotate" ) );
		}
	}
}


//==============================
// * D指令叠加变化 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 控制器部分。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_BTG_Controller.prototype.drill_controller_initCommandChange = function(){
	
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
Drill_BTG_Controller.prototype.drill_controller_updateCommandChange = function(){
	
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
Drill_BTG_Controller.prototype.drill_controller_commandChange_restoreAttr = function(){
	
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
// * D指令叠加变化 - 立即归位
//==============================
Drill_BTG_Controller.prototype.drill_controller_commandChange_restoreMove = function(){
	this["_drill_command_move_data"] = undefined;
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动到
//==============================
Drill_BTG_Controller.prototype.drill_controller_commandChange_setMove = function( change_type, tar_valueA, tar_valueB, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Planimetry_controller_setTarget(
		this, "_drill_command_move_data", data['x'], data['y'],		//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_valueA, tar_valueB, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 透明度
//==============================
Drill_BTG_Controller.prototype.drill_controller_commandChange_setOpacity = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_opacity_data", data['opacity'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动速度X
//==============================
Drill_BTG_Controller.prototype.drill_controller_commandChange_setSpeedX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedX_data", data['speedX'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 移动速度Y
//==============================
Drill_BTG_Controller.prototype.drill_controller_commandChange_setSpeedY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_speedY_data", data['speedY'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 旋转
//==============================
Drill_BTG_Controller.prototype.drill_controller_commandChange_setRotate = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_rotate_data", data['parentRotate'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放X
//==============================
Drill_BTG_Controller.prototype.drill_controller_commandChange_setScaleX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleX_data", data['scale_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 缩放Y
//==============================
Drill_BTG_Controller.prototype.drill_controller_commandChange_setScaleY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_scaleY_data", data['scale_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切X
//==============================
Drill_BTG_Controller.prototype.drill_controller_commandChange_setSkewX = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewX_data", data['skew_x'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}
//==============================
// * D指令叠加变化 - 修改单属性 - 斜切Y
//==============================
Drill_BTG_Controller.prototype.drill_controller_commandChange_setSkewY = function( change_type, tar_value, tar_time ){
	var data = this.drill_data();
	Drill_COBa_ExtendTool.drill_COBa_Common_controller_setTarget(
		this, "_drill_command_skewY_data", data['skew_y'],	//（调用时要给定 初始值，虽然初始值只在第一次调用指令时有效，但必须要给）
		change_type, tar_value, tar_time
	);
}


//==============================
// * E延迟指令 - 初始化子功能
//==============================
Drill_BTG_Controller.prototype.drill_controller_initDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}
//==============================
// * E延迟指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_BTG_Controller.prototype.drill_controller_updateDelayingCommandImportant = function(){
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
Drill_BTG_Controller.prototype.drill_controller_updateDelayingCommand = function(){
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
// * E延迟指令 - 设置指令（开放函数）
//==============================
Drill_BTG_Controller.prototype.drill_controller_setDelayingCommand = function( method, paramList, delay_time ){
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
// * E延迟指令 - 清空全部（开放函数）
//==============================
Drill_BTG_Controller.prototype.drill_controller_clearDelayingCommand = function(){
	this._drill_curDelayingCommandTank = [];
}


//==============================
// * F周期指令 - 初始化子功能
//==============================
Drill_BTG_Controller.prototype.drill_controller_initPeriodizeCommand = function(){
	this._drill_curPeriodizeCommandTank = [];
}
//==============================
// * F周期指令 - 帧刷新 - 时间流逝
//
//			说明：	> 此处的时间流逝不会因为 暂停 而停止流逝。
//==============================
Drill_BTG_Controller.prototype.drill_controller_updatePeriodizeCommandImportant = function(){
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
Drill_BTG_Controller.prototype.drill_controller_updatePeriodizeCommand = function(){
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
	
}
//==============================
// * F周期指令 - 设置指令（开放函数）
//==============================
Drill_BTG_Controller.prototype.drill_controller_setPeriodizeCommand = function( method, paramList, time_period, time_start ){
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
Drill_BTG_Controller.prototype.drill_controller_clearPeriodizeCommand = function(){
	this._drill_curPeriodizeCommandTank = [];
}


//==============================
// * G自变化效果 - 初始化子功能
//==============================
Drill_BTG_Controller.prototype.drill_controller_initEffect = function(){
	this._drill_curEffectTime = 0;
}
//==============================
// * G自变化效果 - 帧刷新
//==============================
Drill_BTG_Controller.prototype.drill_controller_updateEffect = function(){
	this._drill_curEffectTime += 1;
}


//==============================
// * O播放GIF - 初始化子功能
//==============================
Drill_BTG_Controller.prototype.drill_controller_initGIF = function(){
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
Drill_BTG_Controller.prototype.drill_controller_updateGIF = function(){
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
// * P预加载GIF管理 - 初始化子功能
//==============================
Drill_BTG_Controller.prototype.drill_controller_initPreload = function(){
	//	（无）
}


//==============================
// * Z镜头参数 - 初始化子功能
//
//			说明：	> 战斗界面 不具备循环积累值 的位移。
//==============================
Drill_BTG_Controller.prototype.drill_controller_initCamera = function(){
	this._drill_cameraResultSpriteX = 0;	//镜头位移结果
	this._drill_cameraResultSpriteY = 0;
}



//=============================================================================
// ** 战斗平铺GIF贴图【Drill_BTG_Sprite】
// **
// **		作用域：	战斗界面
// **		主功能：	定义一个平铺GIF贴图。
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
function Drill_BTG_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_BTG_Sprite.prototype = Object.create(Sprite.prototype);
Drill_BTG_Sprite.prototype.constructor = Drill_BTG_Sprite;
//==============================
// * 平铺GIF贴图 - 初始化
//==============================
Drill_BTG_Sprite.prototype.initialize = function(){
	Sprite.prototype.initialize.call(this);
	this.drill_sprite_initSelf();				//初始化自身
};
//==============================
// * 平铺GIF贴图 - 帧刷新
//==============================
Drill_BTG_Sprite.prototype.update = function(){
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
}

//##############################
// * C对象绑定 - 设置控制器【开放函数】
//			
//			参数：	> controller 控制器对象
//			返回：	> 无
//			
//			说明：	> 由于贴图与数据分离，贴图必须依赖一个数据对象。
//##############################
Drill_BTG_Sprite.prototype.drill_sprite_setController = function( controller ){
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
Drill_BTG_Sprite.prototype.drill_sprite_initChild = function(){
	this.drill_sprite_initAttr();				//初始化子功能 - A贴图主体
	this.drill_sprite_initChange();				//初始化子功能 - B变换特性
												//初始化子功能 - C对象绑定（无）
	this.drill_sprite_initCommandChange();		//初始化子功能 - D指令叠加变化-控制器用
	this.drill_sprite_initDelayingCommand();	//初始化子功能 - E延迟指令
	this.drill_sprite_initPeriodizeCommand();	//初始化子功能 - F周期指令
	this.drill_sprite_initEffect();				//初始化子功能 - G自变化效果
	
	this.drill_sprite_initGIF();				//初始化子功能 - O播放GIF
	this.drill_sprite_initPreload();			//初始化子功能 - P预加载GIF管理
};

//##############################
// * 平铺GIF贴图 - 是否就绪【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否显示）
//			
//			说明：	> 这里完全 不考虑 延迟加载问题。
//##############################
Drill_BTG_Sprite.prototype.drill_sprite_isReady = function(){
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
Drill_BTG_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
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
Drill_BTG_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
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
Drill_BTG_Sprite.prototype.drill_sprite_destroy = function(){
	this.drill_sprite_destroyChild();			//销毁 - 销毁子功能
	this.drill_sprite_destroySelf();			//销毁 - 销毁自身
};
//==============================
// * 平铺GIF贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_initSelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};
//==============================
// * 平铺GIF贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_destroyChild = function(){
	if( this._drill_controller == null ){ return; }
	
	// > 销毁 - A贴图主体
	this.visible = false;
	this.removeChild( this._drill_layerSprite );
	this._drill_layerSprite = null;
	
	// > 销毁 - B变换特性
	//	（无）
	
	// > 销毁 - C对象绑定
	//	（无）
	
	// > 销毁 - O播放GIF
	//	（无）
	
	// > 销毁 - P预加载GIF管理
	//	（无）
};
//==============================
// * 平铺GIF贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_destroySelf = function(){
	this._drill_controller = null;				//控制器对象
	this._drill_curSerial = -1;					//当前序列号
};


//==============================
// * A贴图主体 - 初始化子功能
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_initAttr = function(){
	var data = this._drill_controller.drill_data();
	/*
		贴图的层级如下：
			- 主体贴图（this）
			- - 平铺贴图（_drill_layerSprite）
	*/
	
	// > 主体贴图
	this.x = 0;
	this.y = 0;
	this.visible = this._drill_controller._drill_visible;		//贴图 - 显示/隐藏
																//贴图 - 暂停/继续（无）
	this.blendMode = this._drill_controller._drill_blendMode;	//贴图 - 混合模式
	this.layerIndex = this._drill_controller._drill_layerIndex;	//贴图 - 层级
	this.zIndex = this._drill_controller._drill_zIndex;			//贴图 - 堆叠级
	
	// > 平铺贴图
	var temp_layer = new TilingSprite();
	temp_layer.move(0, 0, Graphics.width, Graphics.height);			//（填满游戏窗口）
	temp_layer.bitmap = this.drill_sprite_getGIFBitmapByIndex( 0 );	//（第1帧GIF）
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
// * A贴图主体 - 帧刷新
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_updateAttr = function(){
	
	// > 基础特性 - 显示/隐藏
	this.visible = this._drill_controller._drill_visible;
	
	// > 基础特性 - 暂停/继续
	//	（无）
	
	// > 基础特性 - 混合模式
	if( this.blendMode != this._drill_controller._drill_blendMode ){
		this.blendMode =  this._drill_controller._drill_blendMode;
		this._drill_layerSprite.blendMode = this._drill_controller._drill_blendMode;
	}
	
	//（其它 基础特性 的帧刷新赋值见：drill_BTG_updateAttr）
}


//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_initChange = function(){
	//（无）
}
//==============================
// * B变换特性 - 帧刷新
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_updateChange = function(){
	
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
// * D指令叠加变化-控制器用 - 初始化子功能
//
//			说明：	> 此处使用弹道核心提供的 弹道扩展工具-A叠加变化宏定义 贴图部分。
//					> 之所以把代码放这里，是因为 控制器-贴图 一对一，且可以节约弹道计算的存储空间。
//					> 参数使用字符串进行控制，默认为 null 值。
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_initCommandChange = function(){
	
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
// * D指令叠加变化-控制器用 - 帧刷新
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_updateCommandChange = function(){
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
// * E延迟指令 - 初始化子功能
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_initDelayingCommand = function(){
	//（无）
}

//==============================
// * F周期指令 - 初始化子功能
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_initPeriodizeCommand = function(){
	//（无）
}


//==============================
// * G自变化效果 - 初始化子功能
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_initEffect = function(){
	//（无）
}
//==============================
// * G自变化效果 - 帧刷新
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_updateEffect = function(){
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


//==============================
// * O播放GIF - 初始化子功能
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_initGIF = function(){
	//	（无）
}
//==============================
// * O播放GIF - 帧刷新
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_updateGIF = function(){
	if( this.visible != true ){ return; }	//（显示时才帧刷新）
	
	// > 平铺贴图 - 第N帧GIF
	this._drill_layerSprite.bitmap = this.drill_sprite_getGIFBitmapByIndex( this._drill_controller._drill_GIF_index );
}
//==============================
// * O播放GIF - 获取资源bitmap
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_getGIFBitmapByIndex = function( index ){
	
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
Drill_BTG_Sprite.prototype.drill_sprite_initPreload = function(){
	this._drill_load_curTime = 0;			//当前加载时间
}
//==============================
// * P预加载GIF管理 - 帧刷新
//==============================
Drill_BTG_Sprite.prototype.drill_sprite_updatePreload = function(){
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
Drill_BTG_Sprite.prototype.drill_sprite_getReadyTank_ForDebug = function(){
	var data = this._drill_controller.drill_data();
	var isReady_tank = [];
	for( var i = 0; i < data['src_img_gif'].length; i++ ){
		var bitmap = this.drill_sprite_getGIFBitmapByIndex(i);
		isReady_tank.push( bitmap.isReady() );
	}
	return isReady_tank;
}


//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_BattleTiledGif = false;
		Imported.Drill_LayerTiledGIF = false;
		var pluginTip = DrillUp.drill_BTG_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


