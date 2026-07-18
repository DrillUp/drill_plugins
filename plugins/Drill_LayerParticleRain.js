//=============================================================================
// Drill_LayerParticleRain.js
//=============================================================================

/*:
 * @plugindesc [v1.4]        地图 - 多层地图数字雨
 * @author Drill_up
 * 
 * @Drill_LE_param "数字雨层-%d"
 * @Drill_LE_parentKey "---数字雨层组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LPR_layers_length"
 * 
 * 
 * @help 
 * =============================================================================
 * +++ Drill_LayerParticleRain +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以在地图界面中放置一层或者多层数字雨。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 基于：
 *   - Drill_CoreOfBallistics      数学模型-弹道核心★★v2.2及以上★★
 *   - Drill_CoreOfParticle        系统-粒子核心★★v1.2及以上★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于地图层级。
 * 2.更多详细的内容，去看看 "1.系统 > 大家族-粒子效果.docx"。
 * 3.该插件可以装饰地图的各种层级。要了解更详细的组合方法，
 *   去看看 "17.主菜单 > 多层组合装饰（界面装饰）.docx"。
 *   还有 "17.主菜单 > 多层组合装饰（界面装饰-地图界面）.docx"。
 * 4.该插件的指令较多且使用频繁，建议使用小工具：插件信息查看器。
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
 *   (2.操作隐藏的数字雨 或者 操作其他地图的数字雨，插件指令都会有效。
 *      注意，插件指令变化的是增量，增加用正数，减少用负数。
 *   (3.数字雨不支持 缩放、旋转 。
 * 预加载：
 *   (1.插件中可自定义指定资源是否预加载，
 *      预加载相关介绍可以去看看"1.系统 > 关于预加载.docx"。
 * 设计：
 *   (1.数字雨插件，是作者我为了炫技而专门写的插件。
 *      能用到的地方非常有限，只限于电脑、机房、现代科技之类的主题游戏。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Map__layer （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 数字雨层1 资源-数字雨
 * 数字雨层2 资源-数字雨
 * 数字雨层3 资源-数字雨
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 修改单属性
 * 你可以通过插件指令手动修改各个属性：
 * 
 * 插件指令：>地图数字雨 : 数字雨[2] : 显示
 * 插件指令：>地图数字雨 : 数字雨变量[21] : 显示
 * 插件指令：>地图数字雨 : 批量数字雨[7,8] : 显示
 * 插件指令：>地图数字雨 : 批量数字雨变量[21,22] : 显示
 *
 * 插件指令：>地图数字雨 : 数字雨[2] : 显示
 * 插件指令：>地图数字雨 : 数字雨[2] : 隐藏
 * 插件指令：>地图数字雨 : 数字雨[2] : 暂停
 * 插件指令：>地图数字雨 : 数字雨[2] : 继续
 * 插件指令：>地图数字雨 : 数字雨[2] : 切换混合模式[0]
 * 插件指令：>地图数字雨 : 数字雨[2] : 还原混合模式
 * 插件指令：>地图数字雨 : 数字雨[2] : 切换地图层级[下层]
 * 插件指令：>地图数字雨 : 数字雨[2] : 还原地图层级
 * 插件指令：>地图数字雨 : 数字雨[2] : 切换图片层级[10]
 * 插件指令：>地图数字雨 : 数字雨[2] : 还原图片层级
 * 插件指令：>地图数字雨 : 数字雨[2] : 修改单属性 : 整体透明度[255] : 时间[60]
 * 插件指令：>地图数字雨 : 数字雨[2] : 修改单属性 : 整体透明度变量[21] : 时间[60]
 * 插件指令：>地图数字雨 : 数字雨[2] : 立即还原所有单属性
 * 
 * 插件指令：>地图数字雨 : 数字雨[2] : 修改雨线前进时间间隔[6]
 * 插件指令：>地图数字雨 : 数字雨[2] : 修改雨线前进方向[左]
 * 插件指令：>地图数字雨 : 数字雨[2] : 修改雨滴的切片符号[012]
 * 插件指令：>地图数字雨 : 数字雨[2] : 修改雨滴的播放模式[随机播放]
 * 插件指令：>地图数字雨 : 数字雨[2] : 显示叠加高光
 * 插件指令：>地图数字雨 : 数字雨[2] : 隐藏叠加高光
 * 插件指令：>地图数字雨 : 数字雨[2] : 修改叠加高光的切片符号[3]
 * 
 * 1.前半部分（数字雨变量[21]）和 后半部分（显示）
 *   的参数可以随意组合。一共有4*20种组合方式。
 * 2.注意，如果你想永久保持插件指令的改变结果，则需要开启 参数存储 。
 *   参数存储默认关闭，即 插件指令 的所有改变在读取存档后都会复原。
 * 3.插件指令的变化是永久性的。
 *   修改后的变化能与 配置的自变化效果 叠加，但是实际效果一般都不太好。
 * 4."切换地图层级["能切换的层级为：下层、中层、上层、图片层、最顶层。
 * 6.注意，修改属性不会对 第二层粒子 生效。
 * 7.由于底层变化较大，插件不再支持以前版本的旧指令。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 移动到
 * 你可以通过插件指令手动设置移动：
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到-匀速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到-匀速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到-弹性移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到-弹性移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到-增减速移动 : 位置[100,100] : 时间[60]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到-增减速移动 : 位置变量[25,26] : 时间[60]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到-立即归位
 * 
 * 1.前半部分（数字雨[11]）和 后半部分（移动到-匀速移动 : 位置[100,100] : 时间[60]）
 *   的参数可以随意组合。一共有4*7种组合方式。
 * 2.移动的初始位置以显示在地图界面的具体位置为基准，在基准位置上再进行移动到。
 *   指令中不含相对移动，比如多次执行移动到[20,20]，贴图只会到达一个固定的位置。
 * 
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟修改单属性
 * 上述的插件指令中，部分插件指令可以延迟执行：
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨变量[21] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 批量数字雨[7,8] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 批量数字雨变量[21,22] : 隐藏(延迟) : 延迟执行时间[20]
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 显示(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 隐藏(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 暂停(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 继续(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 切换混合模式(延迟)[0] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 还原混合模式(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 切换地图层级(延迟)[下层] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 还原地图层级(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 切换图片层级(延迟)[10] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 还原图片层级(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 修改单属性(延迟) : 整体透明度[255] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 修改单属性(延迟) : 整体透明度变量[21] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 还原所有单属性(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 立即取消全部延迟指令
 * 
 * 1.前半部分（数字雨[11]）和 后半部分（隐藏(延迟) : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有4*14种组合方式。
 * 2.设置延迟指令后，指令会被暂存到延迟队列中，等待延迟时间结束之后，执行指令。
 *   "立即取消全部延迟指令"可以清空排在队列中的所有延迟指令。
 * 3.此功能可以简化 并行事件 的设计，你可以在串行事件中执行延迟，延迟后并行变化贴图。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 延迟移动到
 * 上述的插件指令中，移动到的插件指令也可以延迟执行：
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到(延迟)-匀速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到(延迟)-弹性移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到(延迟)-弹性移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到(延迟)-增减速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到(延迟)-增减速移动 : 位置变量[25,26] : 时间[60] : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 移动到(延迟)-延迟归位 : 延迟执行时间[20]
 * 
 * 1.前半部分（数字雨[11]）和 后半部分（移动到(延迟)-匀速移动 : 位置[100,100] : 时间[60] : 延迟执行时间[20]）
 *   的参数可以随意组合。一共有4*7种组合方式。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 增加延迟
 * 上述的插件指令中，你还可以设置增加延迟：
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 全部延迟指令增加延迟 : 时间[10]
 * 插件指令：>地图数字雨 : 数字雨[11] : 全部延迟指令增加延迟 : 时间[周期播放完的时间]
 * 
 * 1.前半部分（数字雨[11]）和 后半部分（全部延迟指令增加延迟 : 时间[10]）
 *   的参数可以随意组合。一共有4*2种组合方式。
 * 2.如果在此之前没有设置任何延迟指令，则增加延迟没有效果。
 * 
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期修改单属性
 * 上述的插件指令中，部分插件指令可以周期执行：
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨变量[21] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 批量数字雨[7,8] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 批量数字雨变量[21,22] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-显示(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-隐藏(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-暂停(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-继续(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-切换混合模式(周期)[0] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-还原混合模式(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-切换地图层级(周期)[下层] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-还原地图层级(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-切换图片层级(周期)[10] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-还原图片层级(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-修改单属性(周期) : 整体透明度[255] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-修改单属性(周期) : 整体透明度变量[21] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-还原所有单属性(周期) : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 暂停周期指令
 * 插件指令：>地图数字雨 : 数字雨[11] : 继续周期指令
 * 插件指令：>地图数字雨 : 数字雨[11] : 清空周期指令(立刻)
 * 
 * 1.前半部分（数字雨[11]）和 后半部分（ 添加周期-隐藏(周期) ）
 *   的参数可以随意组合。一共有4*16种组合方式。
 * 2."添加周期"后，指令会根据"周期时长"和"开始时间"，持续循环执行。
 *   "清空周期指令"可以清空添加的指令。
 * 3.你可以塞入多条周期指令，每个周期指令控制不同的属性，实现复杂的变换效果。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期移动到
 * 上述的插件指令中，移动到的插件指令也可以周期执行：
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-移动到(周期)-匀速移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-移动到(周期)-匀速移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-移动到(周期)-弹性移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-移动到(周期)-弹性移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-移动到(周期)-增减速移动 : 位置[100,100] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-移动到(周期)-增减速移动 : 位置变量[25,26] : 时间[60] : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 添加周期-移动到(周期)-执行归位 : 周期时长[90] : 周期内开始时间[0]
 * 插件指令：>地图数字雨 : 数字雨[11] : 暂停周期指令
 * 插件指令：>地图数字雨 : 数字雨[11] : 继续周期指令
 * 插件指令：>地图数字雨 : 数字雨[11] : 清空周期指令(立刻)
 * 
 * 1.前半部分（数字雨[11]）和 后半部分（ 添加周期-移动到(周期)-匀速移动 ）
 *   的参数可以随意组合。一共有4*10种组合方式。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期的延迟
 * 上述的插件指令中，可以设置：
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 暂停周期指令(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 继续周期指令(延迟) : 延迟执行时间[20]
 * 插件指令：>地图数字雨 : 数字雨[11] : 清空周期指令(延迟) : 延迟执行时间[20]
 * 
 * 1.前半部分（数字雨[11]）和 后半部分（ 暂停周期指令(延迟) : 延迟执行时间[20] ）
 *   的参数可以随意组合。一共有4*3种组合方式。
 * 2.注意，周期指令添加后，就开始循环了，
 *   你如果一开始不想立即执行，可以使用"暂停周期指令"，而后再"继续周期指令(延迟)"。
 * 3.注意，没有"添加周期(延迟)"的功能，
 *   只能一次性添加，不能并行延迟添加，这样是为了防止过度设计。
 * 4.如果一个装饰贴图真的有 两套周期指令，（比如先周期放大后周期缩小）
 *   那你应该考虑把它合并成一套，增加周期时长，修改周期内开始时间；
 *   或者使用两个不同的装饰贴图，分别执行不同周期指令，然后通过延迟指令显示隐藏贴图。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 周期末尾时
 * 上述的插件指令中，可以设置：
 * 
 * 插件指令：>地图数字雨 : 数字雨[11] : 暂停周期指令(周期末尾时)
 * 插件指令：>地图数字雨 : 数字雨[11] : 清空周期指令(周期末尾时)
 * 插件指令：>地图数字雨 : 数字雨[11] : 执行等待(周期末尾时)
 * 
 * 1.注意，指令 "执行等待" 会阻塞事件的执行。（不要写多条相同的指令）
 *   等待后，可以让周期指令的变换停留在播放结束的时候。
 *   因为是串行阻塞，所以批量和不批量的等待时长一样。
 * 2.设计时建议多个贴图一起变换时，使用相同的周期时长，
 *   这样再执行等待就不会出现周期时间错位的问题。
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
 * 时间复杂度： o(n^4)*o(贴图处理) 每帧
 * 测试方法1：  在地图中放置一两个数字雨，进行性能测试。
 * 测试结果1：  200个事件的地图中，平均消耗为：【92.19ms】
 *              100个事件的地图中，平均消耗为：【80.26ms】
 *               50个事件的地图中，平均消耗为：【73.42ms】
 * 测试方法2：  在战斗管理层对数字雨，对1300个粒子进行测试。
 * 测试结果2：  数字雨的粒子，平均消耗为：【809.50ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.数字雨的主要性能消耗来自粒子数量，粒子大小反而对性能影响不大。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 梳理优化了位移比的结构。
 * [v1.2]
 * 优化了与地图活动镜头的兼容结构。
 * [v1.3]
 * 优化了旧存档的识别与兼容。
 * [v1.4]
 * 翻新并兼容了新的粒子底层。
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
 * @param ---数字雨层组 1至20---
 * @default
 *
 * @param 数字雨层-1
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-2
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-3
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-4
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-5
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-6
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-7
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-8
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-9
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-10
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-11
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-12
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-13
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-14
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-15
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-16
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-17
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-18
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-19
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-20
 * @parent ---数字雨层组 1至20---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组21至40---
 * @default
 *
 * @param 数字雨层-21
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-22
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-23
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-24
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-25
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-26
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-27
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-28
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-29
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-30
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-31
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-32
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-33
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-34
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-35
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-36
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-37
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-38
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-39
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-40
 * @parent ---数字雨层组21至40---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组41至60---
 * @default
 *
 * @param 数字雨层-41
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-42
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-43
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-44
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-45
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-46
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-47
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-48
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-49
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-50
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-51
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-52
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-53
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-54
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-55
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-56
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-57
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-58
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-59
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-60
 * @parent ---数字雨层组41至60---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组61至80---
 * @default
 *
 * @param 数字雨层-61
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-62
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-63
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-64
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-65
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-66
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-67
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-68
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-69
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-70
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-71
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-72
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-73
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-74
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-75
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-76
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-77
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-78
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-79
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-80
 * @parent ---数字雨层组61至80---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组81至100---
 * @default
 *
 * @param 数字雨层-81
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-82
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-83
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-84
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-85
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-86
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-87
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-88
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-89
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-90
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-91
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-92
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-93
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-94
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-95
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-96
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-97
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-98
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-99
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-100
 * @parent ---数字雨层组81至100---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组101至120---
 * @default
 *
 * @param 数字雨层-101
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-102
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-103
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-104
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-105
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-106
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-107
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-108
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-109
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-110
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-111
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-112
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-113
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-114
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-115
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-116
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-117
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-118
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-119
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-120
 * @parent ---数字雨层组101至120---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组121至140---
 * @default
 *
 * @param 数字雨层-121
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-122
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-123
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-124
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-125
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-126
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-127
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-128
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-129
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-130
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-131
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-132
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-133
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-134
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-135
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-136
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-137
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-138
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-139
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-140
 * @parent ---数字雨层组121至140---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组141至160---
 * @default
 *
 * @param 数字雨层-141
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-142
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-143
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-144
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-145
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-146
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-147
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-148
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-149
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-150
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-151
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-152
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-153
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-154
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-155
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-156
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-157
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-158
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-159
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-160
 * @parent ---数字雨层组141至160---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组161至180---
 * @default
 *
 * @param 数字雨层-161
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-162
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-163
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-164
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-165
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-166
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-167
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-168
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-169
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-170
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-171
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-172
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-173
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-174
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-175
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-176
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-177
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-178
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-179
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-180
 * @parent ---数字雨层组161至180---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param ---数字雨层组181至200---
 * @default
 *
 * @param 数字雨层-181
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-182
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-183
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-184
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-185
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-186
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-187
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-188
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-189
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-190
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-191
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-192
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-193
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-194
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-195
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-196
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-197
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-198
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-199
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 * @param 数字雨层-200
 * @parent ---数字雨层组181至200---
 * @type struct<LPRMapParticle>
 * @desc 数字雨的详细配置信息。
 * @default 
 *
 */
/*~struct~LPRMapParticle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的数字雨层==
 * 
 * 
 * @param ---绑定---
 * @desc 
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
 * @desc 该数字雨将放在指定对应的地图id中。
 * @default 1
 * 
 * @param 作用到的地图列表
 * @parent 是否作用到所有地图
 * @type number[]
 * @min 1
 * @desc 除了"所属地图"，你还可以填多个地图id，同一个贴图在多个地图里面复用。
 * @default []
 * 
 * 
 * @param ---贴图---
 * @desc 
 *
 * @param 初始是否显示
 * @parent ---贴图---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-数字雨
 * @parent ---贴图---
 * @desc 数字雨的图片资源。该资源会被划分成14份，表示0123456789+-x/。
 * @default (需配置)地图数字雨
 * @require 1
 * @dir img/Map__layer/
 * @type file
 *
 * @param 是否预加载
 * @parent ---贴图---
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，预加载详细介绍去看看："1.系统 > 关于预加载.docx"。
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
 * @desc 此参数可以看看："0.基本定义 > 缩放模式.docx"。设置模糊后，缩放时可以模糊资源图像的边缘，防止出现像素锯齿。
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
 * @desc 数字雨在同一个地图层，先后排序的位置，0表示最后面。
 * @default 4
 *
 * @param 位移比X
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，数字雨和镜头的位移一致。设置0.00则数字雨不随镜头移动，紧贴地图。负数则反向移动。
 * @default 0.00
 *
 * @param 位移比Y
 * @parent ---贴图---
 * @desc 与玩家地图的镜头位置有关，设置1.00，数字雨和镜头的位移一致。设置0.00则数字雨不随镜头移动，紧贴地图。负数则反向移动。
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
 * @param ---粒子效果---
 * @desc 
 *
 * @param 雨线数量
 * @parent ---粒子效果---
 * @type number
 * @min 1
 * @desc 界面中的雨线数量。
 * @default 10
 *
 * @param 雨线前进时间间隔
 * @parent ---粒子效果---
 * @type number
 * @min 1
 * @desc 雨线前进的间隔时间，单位帧。(1秒60帧)
 * @default 6
 *
 * @param 雨线前进方向
 * @parent ---粒子效果---
 * @type select
 * @option 上
 * @value 上
 * @option 下
 * @value 下
 * @option 左
 * @value 左
 * @option 右
 * @value 右
 * @desc 雨线的前进方向。
 * @default 左
 *
 * @param 雨线距离模式
 * @parent ---粒子效果---
 * @type select
 * @option 雨滴的高度宽度值
 * @value 雨滴的高度宽度值
 * @option 自定义值
 * @value 自定义值
 * @desc 雨线的前进距离模式。
 * @default 雨滴的高度宽度值
 *
 * @param 雨线距离横向自定义值
 * @parent 雨线距离模式
 * @type number
 * @min 1
 * @desc 模式为 "自定义值" 时，雨滴前进的横向距离。
 * @default 12
 *
 * @param 雨线距离纵向自定义值
 * @parent 雨线距离模式
 * @type number
 * @min 1
 * @desc 模式为 "自定义值" 时，雨滴前进的纵向距离。
 * @default 12
 *
 * @param 雨滴数量
 * @parent ---粒子效果---
 * @type number
 * @min 2
 * @desc 每根雨线所含的雨滴数量，总雨滴数量 = 雨线数量 * 雨滴数量。
 * @default 8
 *
 * @param 雨滴的切片符号
 * @parent ---粒子效果---
 * @desc 可填符号"0123456789+-x/"，对应资源中的14种切片。
 * @default 01
 *
 * @param 雨滴的播放模式
 * @parent ---粒子效果---
 * @type select
 * @option 随机播放
 * @value 随机播放
 * @option 顺序播放
 * @value 顺序播放
 * @desc 指在"雨滴的切片符号"中，字符播放的模式。
 * @default 随机播放
 *
 * @param 是否显示叠加高光
 * @parent ---粒子效果---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default false
 *
 * @param 叠加高光的切片符号
 * @parent 是否显示叠加高光
 * @desc 可填符号"0123456789+-x/"，对应资源中的14种切片。
 * @default 3
 *
 * @param 雨滴弹道是否倒放
 * @parent ---粒子效果---
 * @type boolean
 * @on 倒放
 * @off 关闭
 * @desc true - 倒放，false - 关闭，粒子弹道完全倒放。比如 四周扩散效果 变成 四周吸收效果。
 * @default false
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
 * @desc 粒子出现后，朝向的方向模式设置。
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
 * @default 2.0
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
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//		插件简称		LPR（Layer_Particle）
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^4)*o(贴图处理) 每帧
//		★性能测试因素	战斗管理层
//		★性能测试消耗	2026/7/17：
//							》20*16+25*12+35*10+35*10 = 1320个粒子：754.3ms（Drill_LPR_Sprite.update）447.0ms（Drill_LPR_Sprite.drill_sprite_updateTransform_Position）
//							  垃圾本能跑数字雨，保持在10帧，能玩，很卡，但效果不会出现折扣。
//		★最坏情况		大量粒子被同时创建并播放。
//		★备注			无
//		
//		★优化记录		2026/7/17：
//							将粒子合并成大粒子来减少粒子数量。（见文档"1.系统 > 大家族-粒子效果.docx"）
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//				->『变换特性-粒子贴图』
//					->修改单属性
//					->移动到
//					x->获取属性
//					x->修改中心锚点
//					->延迟修改单属性
//					->延迟移动到
//					->周期修改单属性
//					->周期移动到
//				x->其它特性
//			->☆预加载
//			->☆存储数据
//			->☆地图层级
//				->添加贴图到层级【标准函数】
//				->去除贴图【标准函数】
//				->图片层级排序【标准函数】
//				->层级与镜头的位移【标准函数】
//			
//			->☆数据容器
//				->全地图数据时
//				->单地图数据时
//				->非当前地图数据时
//			->☆控制器与贴图
//				->界面创建
//				->帧刷新 控制器
//				->帧刷新 镜头
//					> 图块平移
//					> 位移比
//					> 循环积累值
//				->帧刷新 基础特性
//				->帧刷新 自动销毁
//			
//			->粒子控制器【Drill_LPR_Controller】
//				->2A雨滴管理
//				->2B雨线管理
//				->2C叠加高光
//				->2Z镜头参数
//					->位移比
//			->粒子贴图【Drill_LPR_Sprite】
//			
//			
//		★家谱：
//			大家族-粒子效果
//		
//		★脚本文档：
//			1.系统 > 大家族-粒子效果（脚本）.docx
//			17.主菜单 > 多层组合装饰（界面装饰）（脚本）.docx
//		
//		★插件私有类：
//			* 粒子控制器【Drill_LPR_Controller】
//			* 粒子贴图【Drill_LPR_Sprite】
//		
//		★必要注意事项：
//			1.插件继承至 粒子核心。
//			  核心与所有子插件功能介绍去看看："1.系统 > 大家族-粒子效果（脚本）.docx"
//			2.数字雨的 雨滴 基于 粒子核心，产生后随着透明度降低而自然消亡。
//			  数字雨的 雨线 是独立的 粒子发射器，需要专门控制管理，粒子核心不参与。
//			  该插件重点关注 雨线 的位置，然后获取死亡粒子来作为新显示的雨滴。
//
//		★其它说明细节：
//			1.这里空间很大，感觉应该放点什么……那就给所有 界面装饰插件 编个号吧。
//			  ┌──────────────────────────────────┐
//			  │   /@@@@@@    /@@@@@@    /@@@@@@  │
//			  │  /@@__  @@  /@@__  @@  /@@__  @@ │
//			  │ | @@  \ @@ |__/  \ @@ | @@  \ @@ │
//			  │ | @@  | @@   /@@@@@@/ |  @@@@@@/ │
//			  │ | @@  | @@  /@@____/   >@@__  @@ │
//			  │ | @@  | @@ | @@       | @@  \ @@ │
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
	DrillUp.g_LPR_PluginTip_curName = "Drill_LayerParticleRain.js 地图-多层地图数字雨";
	DrillUp.g_LPR_PluginTip_baseList = [
		"Drill_CoreOfParticle.js 系统-粒子核心",
		"Drill_CoreOfBallistics.js 数学模型-弹道核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	> 此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_LPR_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_LPR_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_LPR_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_LPR_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_LPR_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到样式
	//==============================
	DrillUp.drill_LPR_getPluginTip_StyleNotFind = function( style_id ){
		return "【" + DrillUp.g_LPR_PluginTip_curName + "】\n对象创建失败，id为"+style_id+"的样式配置为空或不存在。";
	};
	//==============================
	// * 提示信息 - 报错 - 底层版本过低
	//==============================
	DrillUp.drill_LPR_getPluginTip_LowVersion = function(){
		return "【" + DrillUp.g_LPR_PluginTip_curName + "】\n游戏底层版本过低，插件基本功能无法执行。\n你可以去看\"rmmv软件版本（必看）.docx\"中的 \"旧工程升级至1.6版本\" 章节，来升级你的游戏底层版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LPR_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_LPR_PluginTip_curName + "】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LPR_getPluginTip_NeedUpdate_Ballistics = function(){
		return "【" + DrillUp.g_LPR_PluginTip_curName + "】\n弹道核心插件版本过低，你需要更新 弹道核心 至少v2.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_LPR_getPluginTip_NeedUpdate_Particle = function(){
		return "【" + DrillUp.g_LPR_PluginTip_curName + "】\n粒子核心插件版本过低，你需要更新 粒子核心 至少v1.2及以上版本。";
	};
	//==============================
	// * 提示信息 - 报错 - 控制器的非数字参数（核心会提示）
	//==============================
	DrillUp.drill_LPR_getPluginTip_controllerData_NotId = function( class_name ){
		return "【" + DrillUp.g_LPR_PluginTip_curName + "】\n错误，类对象 "+class_name+" 获取到了非数字参数，数据初始化失败。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_LayerParticleRain = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_LayerParticleRain');

	//==============================
	// * 静态数据 - 数字雨样式
	//				（~struct~LPRMapParticle）
	//==============================
	DrillUp.drill_LPR_particleInit = function( dataFrom ){
		var data = {};
		
		// > 绑定
		data['mapToAll'] = String( dataFrom["是否作用到所有地图"] || "false") == "true";
		data['map'] = String( dataFrom["所属地图"] || "0" );
		if( dataFrom["作用到的地图列表"] != "" &&
			dataFrom["作用到的地图列表"] != undefined ){
			data['mapList'] = JSON.parse( dataFrom["作用到的地图列表"] );
		}else{
			data['mapList'] = [];
		}
		data['mapList'].push( data['map'] );
		
		// > 预加载
		data['preload'] = String( dataFrom["是否预加载"] || "false") == "true";
		
		
		// > A主体 - 基础特性
		data['src_img'] = String( dataFrom["资源-数字雨"] || "");
		data['src_img_file'] = "img/Map__layer/";
		data['tint'] = Number( dataFrom["图像-色调值"] || 0);
		data['smooth'] = String( dataFrom["图像-模糊边缘"] || "false") == "true";
		
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['pause'] = false;
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['layerIndex'] = String( dataFrom["地图层级"] || "上层");
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		
		// > A主体 - 其它特性（2Z镜头参数）
		data['XPer'] = Number( dataFrom["位移比X"] || 0);
		data['YPer'] = Number( dataFrom["位移比Y"] || 0);
		data['tile_x'] = parseFloat( dataFrom["位移图块偏移 X"] || 0);
		data['tile_y'] = parseFloat( dataFrom["位移图块偏移 Y"] || 0);
		data['parType_type'] = "基础粒子";  //（数字雨插件直接继承 _COPa_BasicPar_ 类对象，没有粒子类型的定义，性能优化为首要事项）
		
		
		// > B变换特性
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['parentRotate'] = 0;
		data['par_x'] = 0;
		data['par_y'] = 0;
		data['par_scale_x'] = 1.0;
		data['par_scale_y'] = 1.0;
		data['par_rotate'] = 0;
		
		// > C校验值（无）
		
		// > D指令叠加变化（无）
		
		// > E延迟指令（无）
		
		// > F周期指令（无）
		
		
		// > 2A雨滴管理/2B雨线管理
		data['par_rain_lineCount'] = Number( dataFrom["雨线数量"] || 10);
		data['par_rain_lineInterval'] = Number( dataFrom["雨线前进时间间隔"] || 6);
		data['par_rain_lineDirection'] = String( dataFrom["雨线前进方向"] || "左");
		data['par_rain_lineDistanceMode'] = String( dataFrom["雨线距离模式"] || "雨滴的高度宽度值");
		data['par_rain_lineDistanceHor'] = Number( dataFrom["雨线距离横向自定义值"] || 12);
		data['par_rain_lineDistanceVer'] = Number( dataFrom["雨线距离纵向自定义值"] || 12);
		
		data['par_rain_pointCount'] = Number( dataFrom["雨滴数量"] || 8);
		data['par_rain_pointSymbol'] = String( dataFrom["雨滴的切片符号"] || "01");
		data['par_rain_pointType'] = String( dataFrom["雨滴的播放模式"] || "随机播放");
		
		// > 2C叠加高光
		data['par_rain_lightEnabled'] = String( dataFrom["是否显示叠加高光"] || "false") == "true";
		data['par_rain_lightSymbol'] = String( dataFrom["叠加高光的切片符号"] || "3");
		
		
		// > H粒子群弹道
		data['par_count'] = data['par_rain_lineCount'] * (data['par_rain_pointCount']+1) +10;   //（+1用于叠加高光，+10用于备用）
		data['par_life'] = (data['par_rain_pointCount']-1) * data['par_rain_lineInterval'];     //（前进间隔决定生命周期）『粒子手动产生与管理』
		data['par_backrun'] = String( dataFrom["雨滴弹道是否倒放"] || "false") == "true";
		//data['par_holdingBirthPosition'];
		
		//data['par_birthMode'];
		//data['par_birthX'];
		//data['par_birthY'];
		//data['par_birthRange'];
		
		data['par_dirMode'] = String( dataFrom["粒子方向模式"] || "四周扩散(随机)");
		data['par_dirFix'] = Number( dataFrom["粒子固定方向"] || 90.0);
		data['par_dirSectorFace'] = Number( dataFrom["粒子扇形朝向"] || 45.0);
		data['par_dirSectorDegree'] = Number( dataFrom["粒子扇形角度"] || 30.0);
		data['par_speedMode'] = String( dataFrom["粒子速度模式"] || "只初速度");
		data['par_speedBase'] = Number( dataFrom["粒子初速度"] || 0.5);
		data['par_speedRandom'] = Number( dataFrom["粒子速度随机波动量"] || 2.0);
		data['par_opacityMode'] = "逐渐消失";
		
		//data['par_selfRotateMode'];
		//data['par_selfRotateFix'];
		//data['par_selfRotateSpeed'];
		
		//data['par_scaleMode'];
		//data['par_scaleBase'];
		//data['par_scaleRandom'];
		
		// > I随机因子
		data['seed_enable'] = String( dataFrom["是否固定随机种子"] || "false") == "true";
		data['seed_value'] = Number( dataFrom["固定随机种子"] || 0.20221002);
		
		// > J粒子变化（无）
		
		// > K粒子重设（无）
		
		// > L粒子生命周期（无）
		
		
		// > O贴图加载（无）
		
		// > P直线拖尾贴图
		data['trailing_enable'] = false;
		
		// > Q双层效果
		data['second_enable'] = false;
		
		
		// > 控制器 - 『控制器与贴图的样式-静态数据-指针初始化』
		Drill_LPR_Controller.drill_controller_initData( data );
		
		return data;
	}
	//==============================
	// * 静态数据 - 最后继承1级
	//==============================
	var _drill_LPR_scene_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_drill_LPR_scene_initialize.call(this);
		
		/*-----------------数字雨------------------*/
		for( var i = 0; i < DrillUp.g_LPR_layers.length; i++ ){
			var temp = DrillUp.g_LPR_layers[i];
			if( temp != undefined ){
				DrillUp.g_LPR_layers[i] = DrillUp.drill_LPR_particleInit( temp );
			}
		}
	}
	/*-----------------数字雨------------------*/
	DrillUp.g_LPR_layers_length = 200;
	DrillUp.g_LPR_layers = [];
	for (var i = 0; i < DrillUp.g_LPR_layers_length; i++) {
		if( DrillUp.parameters["数字雨层-" + String(i+1) ] != undefined &&
			DrillUp.parameters["数字雨层-" + String(i+1) ] != "" ){
			DrillUp.g_LPR_layers[i] = JSON.parse(DrillUp.parameters["数字雨层-" + String(i+1) ]);
		}else{
			DrillUp.g_LPR_layers[i] = undefined;		//（设为空值，节约静态数据占用容量）
		}
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_LPR_saveEnabled = String(DrillUp.parameters["是否开启参数存储"] || "false") == "true" ;
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfParticle &&
	Imported.Drill_CoreOfBallistics ){
	
	if( typeof(Drill_COBa_ExtendTool) == "undefined" ){	//（弹道核心版本检测）
		alert( DrillUp.drill_LPR_getPluginTip_NeedUpdate_Ballistics() );
	}
	if( typeof(Drill_COPa_BasicPar_Controller) == "undefined" ){	//（粒子核心版本检测）
		alert( DrillUp.drill_LPR_getPluginTip_NeedUpdate_Particle() );
	}
	
	
//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_LPR_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_LPR_pluginCommand.call(this, command, args);
	this.drill_LPR_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_LPR_pluginCommand = function( command, args ){
	DrillUp.drill_LPR_globalPluginCommand( command, args, this );
}
//==============================
// * 插件指令 - 『作用全局的插件指令』
//
//			参数：	> command 字符串
//					> args 字符串列表
//					> gameInterpreter 解释器对象
//
//			说明：	> 该函数不能有 this 对象。
//					> 该函数不依赖解释器对象，gameInterpreter 可以为 null。函数可跨界面调用。
//==============================
DrillUp.drill_LPR_globalPluginCommand = function( command, args, gameInterpreter ){
	if( command === ">地图数字雨" ){
		
		/*-----------------对象组获取------------------*/
		var controllers = null;
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( controllers == null && unit.indexOf("批量数字雨[") != -1 ){
				unit = unit.replace("批量数字雨[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = Number(temp_arr[k]);
					var temp_controller = $gameSystem._drill_LPR_dataTank_curController[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("批量数字雨变量[") != -1 ){
				unit = unit.replace("批量数字雨变量[","");
				unit = unit.replace("]","");
				controllers = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var controller_id = $gameVariables.value(Number(temp_arr[k]));
					var temp_controller = $gameSystem._drill_LPR_dataTank_curController[ controller_id -1 ];
					if( temp_controller == undefined ){ continue; }
					controllers.push( temp_controller );
				}
			}
			if( controllers == null && unit.indexOf("数字雨变量[") != -1 ){
				unit = unit.replace("数字雨变量[","");
				unit = unit.replace("]","");
				var controller_id = $gameVariables.value(Number(unit));
				var temp_controller = $gameSystem._drill_LPR_dataTank_curController[ controller_id -1 ];
				if( temp_controller == undefined ){ return; }
				controllers = [ temp_controller ];
			}
			if( controllers == null && unit.indexOf("数字雨[") != -1 ){
				unit = unit.replace("数字雨[","");
				unit = unit.replace("]","");
				var controller_id = Number(unit);
				var temp_controller = $gameSystem._drill_LPR_dataTank_curController[ controller_id -1 ];
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
			if( type == "还原混合模式" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_restoreBlendMode();
				}
			}
			if( type == "还原地图层级" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_restoreLayerIndex();
				}
			}
			if( type == "还原图片层级" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_restoreZIndex();
				}
			}
			
			if( type.indexOf("修改雨线前进时间间隔[") != -1 ){
				type = type.replace("修改雨线前进时间间隔[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_LPR_setRainLineInterval( Number(type) );
				}
			}
			if( type.indexOf("修改雨线前进方向[") != -1 ){
				type = type.replace("修改雨线前进方向[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_LPR_setRainLineDirection( String(type) );
				}
			}
			if( type.indexOf("修改雨滴的切片符号[") != -1 ){
				type = type.replace("修改雨滴的切片符号[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_LPR_setRainPointSymbol( String(type) );
				}
			}
			if( type.indexOf("修改雨滴的播放模式[") != -1 ){
				type = type.replace("修改雨滴的播放模式[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_LPR_setRainPointType( String(type) );
				}
			}
			if( type == "显示叠加高光" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_LPR_setLightEnabled( true );
				}
			}
			if( type == "隐藏叠加高光" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_LPR_setLightEnabled( false );
				}
			}
			if( type.indexOf("修改叠加高光的切片符号[") != -1 ){
				type = type.replace("修改叠加高光的切片符号[","");
				type = type.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_LPR_setLightSymbol( String(type) );
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
				
				if( temp1.indexOf("整体透明度[") != -1 ||
					temp1.indexOf("整体透明度变量[") != -1 ){
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setOpacity(
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
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setParMove(	//（该插件只考虑 粒子平移 情况）
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
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setParMove(	//（该插件只考虑 粒子平移 情况）
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
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_commandChange_setParMove(	//（该插件只考虑 粒子平移 情况）
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
			if( type == "全部延迟指令增加延迟" ){
				delay_time = delay_time.replace("时间[","");
				delay_time = delay_time.replace("]","");
				for( var k=0; k < controllers.length; k++ ){
					var temp_controller = controllers[k];
					var temp_time = 0;
					if( delay_time == "周期播放完的时间" ){
						temp_time = temp_controller.drill_controller_periodizeCommand_getWaitAndClearTime();
					}else{
						temp_time = Number(delay_time);
					}
					temp_controller.drill_controller_addDelayingTime( temp_time );
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
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setVisible, [true], delay_time
					);
				}
			}
			if( type == "隐藏(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setVisible, [false], delay_time
					);
				}
			}
			if( type == "暂停(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setPause, [true], delay_time
					);
				}
			}
			if( type == "继续(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setPause, [false], delay_time
					);
				}
			}
			if( type == "暂停周期指令(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_setPause, [true], delay_time
					);
				}
			}
			if( type == "继续周期指令(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_setPause, [false], delay_time
					);
				}
			}
			if( type == "清空周期指令(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_periodizeCommand_clear, [], delay_time
					);
				}
			}
			
			if( type.indexOf("切换混合模式(延迟)[") != -1 ){
				type = type.replace("切换混合模式(延迟)[","");
				type = type.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setBlendMode, [Number(type)], delay_time
					);
				}
			}
			if( type.indexOf("切换地图层级(延迟)[") != -1 ){
				type = type.replace("切换地图层级(延迟)[","");
				type = type.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setLayerIndex, [String(type)], delay_time
					);
				}
			}
			if( type.indexOf("切换图片层级(延迟)[") != -1 ){
				type = type.replace("切换图片层级(延迟)[","");
				type = type.replace("]","");
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setZIndex, [Number(type)], delay_time
					);
				}
			}
			if( type == "还原混合模式(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreBlendMode, [], delay_time
					);
				}
			}
			if( type == "还原地图层级(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreLayerIndex, [], delay_time
					);
				}
			}
			if( type == "还原图片层级(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreZIndex, [], delay_time
					);
				}
			}
			if( type == "还原所有单属性(延迟)" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreAttr, [], delay_time
					);
				}
			}
			if( type == "移动到(延迟)-延迟归位" ){
				delay_time = delay_time.replace("延迟执行时间[","");
				delay_time = delay_time.replace("]","");
				delay_time = Number( delay_time );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setDelayingCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreMove, [], delay_time
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
				
				if( temp1.indexOf("整体透明度[") != -1 ||
					temp1.indexOf("整体透明度变量[") != -1 ){
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setOpacity, 
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
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove,	//（该插件只考虑 粒子平移 情况）
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
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove,	//（该插件只考虑 粒子平移 情况）
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
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setDelayingCommand(
							Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove,	//（该插件只考虑 粒子平移 情况）
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], delay_time
						);
					}
				}
			}
		}
		
		/*-----------------F周期指令------------------*/
		if( args.length == 4 ){
			var type = String(args[3]);
			if( type == "暂停周期指令" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_periodizeCommand_setPause( true );
				}
			}
			if( type == "继续周期指令" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_periodizeCommand_setPause( false );
				}
			}
			if( type == "清空周期指令(立刻)" || type == "清空周期指令" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_periodizeCommand_clear();
				}
			}
			if( type == "暂停周期指令(周期末尾时)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_periodizeCommand_waitAndPause();
				}
			}
			if( type == "清空周期指令(周期末尾时)" ){
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_periodizeCommand_waitAndClear();
				}
			}
			if( type == "执行等待(周期末尾时)" ){
				if( controllers.length > 0 ){	//（只取第一个控制器的时间，因为批量控制器不需要叠加等待时间）
					var result_time = controllers[0].drill_controller_periodizeCommand_getWaitAndClearTime();
					if( gameInterpreter != undefined ){
						gameInterpreter.wait(result_time);		//『强制等待』
					}
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
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setVisible, [true], time_period, time_start
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
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setVisible, [false], time_period, time_start
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
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setPause, [true], time_period, time_start
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
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setPause, [false], time_period, time_start
					);
				}
			}
			if( type.indexOf("添加周期-切换混合模式(周期)[") != -1 ){
				type = type.replace("添加周期-切换混合模式(周期)[","");
				type = type.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setBlendMode, [Number(type)], time_period, time_start
					);
				}
			}
			if( type.indexOf("添加周期-切换地图层级(周期)[") != -1 ){
				type = type.replace("添加周期-切换地图层级(周期)[","");
				type = type.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setLayerIndex, [String(type)], time_period, time_start
					);
				}
			}
			if( type.indexOf("添加周期-切换图片层级(周期)[") != -1 ){
				type = type.replace("添加周期-切换图片层级(周期)[","");
				type = type.replace("]","");
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_setZIndex, [Number(type)], time_period, time_start
					);
				}
			}
			if( type == "添加周期-还原混合模式(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreBlendMode, [], time_period, time_start
					);
				}
			}
			if( type == "添加周期-还原地图层级(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreLayerIndex, [], time_period, time_start
					);
				}
			}
			if( type == "添加周期-还原图片层级(周期)" ){
				time_period = time_period.replace("周期时长[","");
				time_period = time_period.replace("]","");
				time_period = Number( time_period );
				time_start = time_start.replace("周期内开始时间[","");
				time_start = time_start.replace("]","");
				time_start = Number( time_start );
				for( var k=0; k < controllers.length; k++ ){
					controllers[k].drill_controller_setPeriodizeCommand(
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_restoreZIndex, [], time_period, time_start
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
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreAttr, [], time_period, time_start
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
						Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_restoreMove, [], time_period, time_start
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
				
				if( temp1.indexOf("整体透明度[") != -1 ||
					temp1.indexOf("整体透明度变量[") != -1 ){
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setOpacity, 
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
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove,	//（该插件只考虑 粒子平移 情况）
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
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove,	//（该插件只考虑 粒子平移 情况）
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
					var num_list = DrillUp.drill_LPR_getArgNumList(temp1);
					for( var k=0; k < controllers.length; k++ ){
						controllers[k].drill_controller_setPeriodizeCommand(
							Drill_COPa_BasicPar_Controller.METHOD__drill_controller_commandChange_setParMove,	//（该插件只考虑 粒子平移 情况）
							[ "增减速变化", num_list[0], num_list[1], Number(temp2) ], time_period, time_start
						);
					}
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
DrillUp.drill_LPR_getArgNumList = function( arg_str ){
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
var _drill_LPR_preload_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_LPR_preload_initialize.call(this);
	this.drill_LPR_preloadInit();
}
//==============================
// * 预加载 - 版本校验
//==============================
if( Utils.generateRuntimeId == undefined ){
	alert( DrillUp.drill_LPR_getPluginTip_LowVersion() );
}
//==============================
// * 预加载 - 执行资源预加载
//
//			说明：	> 遍历全部资源，提前预加载标记过的资源。
//==============================
Game_Temp.prototype.drill_LPR_preloadInit = function(){
	this._drill_LPR_cacheId = Utils.generateRuntimeId();	//资源缓存id
	this._drill_LPR_preloadTank = [];						//bitmap容器
	for( var i = 0; i < DrillUp.g_LPR_layers.length; i++ ){
		var temp_data = DrillUp.g_LPR_layers[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['preload'] != true ){ continue; }
		
		this._drill_LPR_preloadTank.push( 
			ImageManager.reserveBitmap( temp_data['src_img_file'], temp_data['src_img'], data['tint'], data['smooth'], this._drill_LPR_cacheId ) 
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
//DrillUp.g_LPR_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LPR_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(){
    _drill_LPR_sys_initialize.call(this);
	this.drill_LPR_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_LPR_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_LPR_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_LPR_saveEnabled == true ){	
		$gameSystem.drill_LPR_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_LPR_initSysData();
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
Game_System.prototype.drill_LPR_initSysData = function(){
	this.drill_LPR_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_LPR_checkSysData = function(){
	this.drill_LPR_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_LPR_initSysData_Private = function(){
	
	this._drill_LPR_dataTank_curController = [];	//当前容器（与 g_LPR_layers 依次对应，容器允许出现null值）
	for( var i = 0; i < DrillUp.g_LPR_layers.length; i++){
		var temp_data = DrillUp.g_LPR_layers[i];
		if( temp_data == undefined ){ continue; }
		
		// > 控制器 - 匹配全地图数据时（直接存储，每次地图刷新时，不刷新 全地图数据）
		if( temp_data['mapToAll'] == true ){
			var temp_controller = new Drill_LPR_Controller( i );
			this._drill_LPR_dataTank_curController[i] = temp_controller;
		}
		
		// > 控制器 - 匹配单地图数据时
		//	（见 drill_LPR_initMapdata ）
		
		// > 控制器 - 不匹配时
		//	（见 drill_LPR_initMapdata ）
	}
	
	// > 刷新当前地图『$gameSystem优先初始化』
	if( $gameMap != undefined ){
		$gameMap.drill_LPR_initMapdata();
	}
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_LPR_checkSysData_Private = function(){
	
	// > 旧存档数据自动补充
	if( this._drill_LPR_dataTank_curController == undefined ){
		this.drill_LPR_initSysData();
	}
	
	// > 容器的 空数据 检查
	for( var i = 0; i < DrillUp.g_LPR_layers.length; i++ ){
		var temp_data = DrillUp.g_LPR_layers[i];
		
		// > 已配置（检查 全地图数据 的配置情况）
		if( temp_data != undefined &&
			temp_data['mapToAll'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_LPR_dataTank_curController[i] == undefined ){
				var temp_controller = new Drill_LPR_Controller( i );
				this._drill_LPR_dataTank_curController[i] = temp_controller;
			
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
Scene_Map.prototype.drill_LPR_layerAddSprite = function (sprite, layer_index) {
    this.drill_LPR_layerAddSprite_Private(sprite, layer_index);
}
//##############################
// * 地图层级 - 去除贴图【标准函数】
//				
//			参数：	> sprite 贴图（添加的贴图对象）
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，将指定贴图从地图层级中移除。
//##############################
Scene_Map.prototype.drill_LPR_layerRemoveSprite = function( sprite ){
	this.drill_LPR_layerRemoveSprite_Private( sprite );
}
//##############################
// * 地图层级 - 图片层级排序【标准函数】
//				
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 执行该函数后，地图层级的子贴图，按照zIndex属性来进行先后排序。值越大，越靠前。
//##############################
Scene_Map.prototype.drill_LPR_sortByZIndex = function () {
    this.drill_LPR_sortByZIndex_Private();
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
Scene_Map.prototype.drill_LPR_layerCameraMoving = function( x, y, layer, option ){
    return this.drill_LPR_layerCameraMoving_Private( x, y, layer, option );
}
//=============================================================================
// ** 地图层级（接口实现）
//=============================================================================
//==============================
// * 地图层级 - 下层
//==============================
var _drill_LPR_map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function(){
	_drill_LPR_map_createParallax.call(this);		//地图远景 < 下层 < 图块层
	if( !this._drill_mapDownArea ){
		this._drill_mapDownArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapDownArea);	
	}
}
//==============================
// * 地图层级 - 中层
//==============================
var _drill_LPR_map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function(){
	_drill_LPR_map_createTilemap.call(this);		//图块层 < 中层 < 事件/玩家层
	if( !this._drill_mapCenterArea ){
		this._drill_mapCenterArea = new Sprite();
		this._drill_mapCenterArea.z = 0.60;
		this._tilemap.addChild(this._drill_mapCenterArea);	
	}
}
//==============================
// * 地图层级 - 上层
//==============================
var _drill_LPR_map_createDestination = Spriteset_Map.prototype.createDestination;
Spriteset_Map.prototype.createDestination = function(){
	_drill_LPR_map_createDestination.call(this);	//鼠标目的地 < 上层 < 天气层
	if( !this._drill_mapUpArea ){
		this._drill_mapUpArea = new Sprite();
		this._baseSprite.addChild(this._drill_mapUpArea);	
	}
}
//==============================
// * 地图层级 - 图片层
//==============================
var _drill_LPR_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function(){
	_drill_LPR_map_createPictures.call(this);		//图片对象层 < 图片层 < 对话框集合
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// * 地图层级 - 最顶层
//==============================
var _drill_LPR_map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_LPR_map_createAllWindows.call(this); 	//对话框集合 < 最顶层
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
Scene_Map.prototype.drill_LPR_sortByZIndex_Private = function(){
	this._spriteset._drill_mapDownArea.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
	this._spriteset._drill_mapCenterArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._spriteset._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
	this._drill_SenceTopArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 地图层级 - 去除贴图（私有）
//==============================
Scene_Map.prototype.drill_LPR_layerRemoveSprite_Private = function( sprite ) {
	this._spriteset._drill_mapDownArea.removeChild( sprite );
	this._spriteset._drill_mapCenterArea.removeChild( sprite );
	this._spriteset._drill_mapUpArea.removeChild( sprite );
	this._spriteset._drill_mapPicArea.removeChild( sprite );
	this._drill_SenceTopArea.removeChild( sprite );
};
//==============================
// * 地图层级 - 添加贴图到层级（私有）
//==============================
Scene_Map.prototype.drill_LPR_layerAddSprite_Private = function( sprite, layer_index ){
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
Scene_Map.prototype.drill_LPR_layerCameraMoving_Private = function( xx, yy, layer, option ){
	
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
// ** ☆数据容器
//
//			说明：	> 此模块管理 当前地图中装饰对象 的数据。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 数据容器 - 初始化绑定
//==============================
var _drill_LPR_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function( mapId ){
	_drill_LPR_setup.call( this, mapId );
	this.drill_LPR_initMapdata();
}
//==============================
// * 数据容器 - 初始化
//==============================
Game_Map.prototype.drill_LPR_initMapdata = function(){
	
	// > 刷新当前地图容器
	for( var i = 0; i < DrillUp.g_LPR_layers.length ;i++){
		var temp_data = DrillUp.g_LPR_layers[i];
		if( temp_data == undefined ){
			$gameSystem._drill_LPR_dataTank_curController[i] = null;
			continue;
		}
		
		// > 控制器 - 匹配全地图数据时
		if( temp_data['mapToAll'] == true ){
			//（不刷新数据）
			
		// > 控制器 - 匹配单地图数据时
		}else if( temp_data['mapList'].contains( String(this.mapId()) ) ){
			var temp_controller = new Drill_LPR_Controller( i );
			$gameSystem._drill_LPR_dataTank_curController[i] = temp_controller;	//（重刷数据）
			
		// > 控制器 - 不匹配时
		}else{
			$gameSystem._drill_LPR_dataTank_curController[i] = null;	//（某地图不含此贴图配置，则直接置空）
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
var _drill_LPR_temp_initialize2 = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){
	_drill_LPR_temp_initialize2.call(this);
	this._drill_LPR_spriteTankOrg = [];			//贴图容器
	//this._drill_LPR_spriteTankSec = [];		//贴图容器
};
//==============================
// * 控制器与贴图 - 销毁时（地图界面）
//==============================
var _drill_LPR_smap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function(){
	_drill_LPR_smap_terminate.call(this);
	$gameTemp._drill_LPR_spriteTankOrg = [];	//贴图容器
	//$gameTemp._drill_LPR_spriteTankSec = [];	//贴图容器
};
//==============================
// * 控制器与贴图 - 帧刷新（地图界面）
//==============================
var _drill_LPR_smap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_drill_LPR_smap_update.call(this);
	this.drill_LPR_updateController();			//帧刷新 - 控制器
	this.drill_LPR_updateCamera();				//帧刷新 - 镜头
	this.drill_LPR_updateAttr();				//帧刷新 - 基础特性
	this.drill_LPR_updateDestroy();				//帧刷新 - 自动销毁
};
//==============================
// * 控制器与贴图 - 界面创建时（地图界面）
//==============================
var _drill_LPR_smap_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function(){
	_drill_LPR_smap_createAllWindows.call(this);
	this.drill_LPR_create();
};
//==============================
// * 控制器与贴图 - 界面创建
//==============================
Scene_Map.prototype.drill_LPR_create = function(){
	$gameTemp._drill_LPR_spriteTankOrg = [];		//贴图容器（不允许出现null值）
	//$gameTemp._drill_LPR_spriteTankSec = [];		//贴图容器（不允许出现null值）
	
	for(var i = 0; i < $gameSystem._drill_LPR_dataTank_curController.length; i++){
		var temp_controller = $gameSystem._drill_LPR_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 创建贴图
		var temp_sprite = new Drill_LPR_Sprite();
		temp_sprite.drill_sprite_setController( temp_controller );
		temp_sprite.drill_sprite_initChild();
		
		// > 创建贴图（双层效果）（此功能关闭）
		var temp_data = temp_controller.drill_data();
		if( temp_data['second_enable'] == true ){
			//（无）
		}
		
		// > 添加贴图到层级
		$gameTemp._drill_LPR_spriteTankOrg.push( temp_sprite );
		this.drill_LPR_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
	}
		
	// > 层级排序
	this.drill_LPR_sortByZIndex();
}
//==============================
// * 控制器与贴图 - 帧刷新 控制器
//==============================
Scene_Map.prototype.drill_LPR_updateController = function(){
	for(var i = 0; i < $gameSystem._drill_LPR_dataTank_curController.length; i++ ){
		var temp_controller = $gameSystem._drill_LPR_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		temp_controller.drill_controller_update();
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 镜头
//==============================
Scene_Map.prototype.drill_LPR_updateCamera = function(){
	for(var i = 0; i < $gameSystem._drill_LPR_dataTank_curController.length; i++ ){
		var temp_controller = $gameSystem._drill_LPR_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		
		// > 镜头位移结果（地图参照）
		var s_data = temp_controller.drill_data();
		var xx = 0;
		var yy = 0;
		var cameraXAcc = temp_controller.drill_controller_getCameraXAcc();
		var cameraYAcc = temp_controller.drill_controller_getCameraYAcc();
		
		// > 镜头位移结果 - 图块平移
		xx += s_data['tile_x'] * $gameMap.tileWidth();
		yy += s_data['tile_y'] * $gameMap.tileHeight();
		
		// > 镜头位移结果 - 贴图归位
		//		（保持与地图的初始点一致，因为位移主体是粒子，而不是粒子层）
		//		（这里不能用adjust，因为如果你一直向前移动，贴图会越来越远）
		xx -= cameraXAcc;
		yy -= cameraYAcc;
		
		// > 镜头位移结果 - 层级与镜头的位移
		var option = {
			"XPer": temp_controller._drill_XPer,
			"YPer": temp_controller._drill_YPer,
			"tile_x": s_data['tile_x'],
			"tile_y": s_data['tile_y'],
			"cameraXAcc": cameraXAcc,
			"cameraYAcc": cameraYAcc,
		};
		var pos = this.drill_LPR_layerCameraMoving(xx, yy, temp_controller._drill_layerIndex, option );
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
Scene_Map.prototype.drill_LPR_updateAttr = function(){
	var has_layerChange = false;
	for(var i = 0; i < $gameTemp._drill_LPR_spriteTankOrg.length; i++){
		var temp_sprite = $gameTemp._drill_LPR_spriteTankOrg[i];
		if( temp_sprite == undefined ){ continue; }
		var temp_controller = temp_sprite._drill_controller;
		if( temp_controller == undefined ){ continue; }
		
		// > 基础特性 - 贴图筛选
		//	（无）
		
		// > 基础特性 - 地图层级
		if( temp_sprite.layerIndex != temp_controller._drill_layerIndex ){
			temp_sprite.layerIndex =  temp_controller._drill_layerIndex;
			this.drill_LPR_layerAddSprite( temp_sprite, temp_controller._drill_layerIndex );
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
		this.drill_LPR_sortByZIndex();
	}
}
//==============================
// * 控制器与贴图 - 帧刷新 自动销毁
//==============================
Scene_Map.prototype.drill_LPR_updateDestroy = function(){
	
	// > 自动销毁 - 控制器
	for(var i = $gameSystem._drill_LPR_dataTank_curController.length-1; i >= 0; i--){
		var temp_controller = $gameSystem._drill_LPR_dataTank_curController[i];
		if( temp_controller == undefined ){ continue; }
		if( temp_controller.drill_controller_isDead() ){
			$gameSystem._drill_LPR_dataTank_curController.splice(i,1);
		}
	}
	
	// > 自动销毁 - 贴图
	for(var i = $gameTemp._drill_LPR_spriteTankOrg.length-1; i >= 0; i--){
		var temp_sprite = $gameTemp._drill_LPR_spriteTankOrg[i];
		if( temp_sprite.drill_sprite_isNeedDestroy() ){
			this.drill_LPR_layerRemoveSprite( temp_sprite );	//（销毁贴图）
			$gameTemp._drill_LPR_spriteTankOrg.splice(i,1);
			temp_sprite.drill_sprite_destroy();
		}
	}
	
	// > 自动销毁 - 贴图（第二层）
	//	（无）
};



//=============================================================================
// ** 粒子控制器【Drill_LPR_Controller】
// **		
// **		作用域：	地图界面
// **		主功能：	定义一个专门控制动画粒子的数据类。
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
// **						x> 主体贴图-整体旋转
// **						> 粒子贴图组-粒子移动到
// **						x> 粒子贴图组-粒子缩放X
// **						x> 粒子贴图组-粒子缩放Y
// **						x> 粒子贴图组-粒子旋转
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
// **					x->P直线拖尾贴图
// **					x->Q双层效果
// **					
// **					->2A雨滴管理
// **					->2B雨线管理
// **					->2C叠加高光
// **					
// **					->2Z镜头参数
// **					
// **		说明：	> 该类可与 Game_CharacterBase 一并存储在 $gameMap 中。
//=============================================================================
//==============================
// * 控制器 - 定义
//==============================
function Drill_LPR_Controller(){
    this.initialize.apply(this, arguments);
};
Drill_LPR_Controller.prototype = Object.create(Drill_COPa_BasicPar_Controller.prototype);
Drill_LPR_Controller.prototype.constructor = Drill_LPR_Controller;
//==============================
// * 控制器 - 初始化
//==============================
Drill_LPR_Controller.prototype.initialize = function( data_id ){
    Drill_COPa_BasicPar_Controller.prototype.initialize.call( this, data_id );
}
//##############################
// * 控制器 - 帧刷新【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 此函数必须在 帧刷新 中手动调用执行。
//##############################
Drill_LPR_Controller.prototype.drill_controller_update = function(){
    Drill_COPa_BasicPar_Controller.prototype.drill_controller_update.call( this );
	if( this.drill_controller_isPause() == true ){ return; }
																//帧刷新 - 2A雨滴管理（无）
	this.drill_controller_updateEmitter();						//帧刷新 - 2B雨线管理
																//帧刷新 - 2C叠加高光（无）
																//帧刷新 - 2Z镜头参数（无）
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

//==============================
// * A主体 - 修改位移比（开放函数）
//
//			参数：	> xPer,yPer 数字
//			返回：	> 无
//==============================
Drill_LPR_Controller.prototype.drill_controller_setPer = function( xPer, yPer ){
	this._drill_XPer = xPer;
	this._drill_YPer = yPer;
};


//##############################
// * 控制器 - 『控制器与贴图的样式-静态数据』校验标记
//##############################
DrillUp.g_LPR_notFindStyleAlertOnce = true;
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
Drill_LPR_Controller.prototype.drill_data = function(){
	var cur_styleId   = this._drill_data_id +1;
	var cur_styleData = DrillUp.g_LPR_layers[ this._drill_data_id ];
	if( cur_styleData == undefined ){
		
		// > 『控制器与贴图的样式-静态数据』 - 校验+提示信息（只执行一次）
		if( DrillUp.g_LPR_notFindStyleAlertOnce == true ){
			DrillUp.g_LPR_notFindStyleAlertOnce = false;
			alert( DrillUp.drill_LPR_getPluginTip_StyleNotFind(cur_styleId) );
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
Drill_LPR_Controller.drill_controller_initData = function( data ){
	//	（该函数是静态函数，直接修改 静态数据 的指针值）
	//	（参数会有细微区别，因为此处针对 控制器 的参数，而静态数据针对 @注释定义 的参数）
	
	Drill_COPa_BasicPar_Controller.drill_controller_initData( data );
	
	// > A主体 - 基础特性
	data['src_img_file'] = "img/Map__layer/";
	
	if( data['layerIndex'] == undefined ){ data['layerIndex'] = "图片层" };					//贴图 - 所在层级（贴图用）
	if( data['zIndex'] == undefined ){ data['zIndex'] = 0 };								//贴图 - 图片层级（贴图用）
	
	// > A主体 - 其它特性
	if( data['XPer'] == undefined ){ data['XPer'] = 0 };									//A主体 - 位移比X
	if( data['YPer'] == undefined ){ data['YPer'] = 0 };									//A主体 - 位移比Y
	
	// > B变换特性（无）
	
	// > C校验值（无）
	
	// > D指令叠加变化（无）
	
	// > E延迟指令（无）
	
	// > F周期指令（无）
	
	
	// > H粒子群弹道（无）
	
	// > I随机因子（无）
	
	// > J粒子变化（无）
	
	// > K粒子重设（无）
	
	// > L粒子生命周期
	data['par_lifeType'] = "手动产生";	//『粒子手动产生与管理』
	
	
	// > O贴图加载（无）
	
	// > P直线拖尾贴图（无）
	
	// > Q双层效果（无）
	
	
	// > 2A雨滴管理（无）
	
	// > 2B雨线管理（无）
	
	// > 2C雨线管理（无）
	
	// > 2Z镜头参数（无）
}
//==============================
// * 控制器 - 初始化子功能『控制器与贴图』
//==============================
Drill_LPR_Controller.prototype.drill_controller_initChild = function(){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_initChild.call( this );
	this.drill_controller_initRainPoint();			//初始化子功能 - 2A雨滴管理
	this.drill_controller_initEmitter();			//初始化子功能 - 2B雨线管理
	this.drill_controller_initLight();				//初始化子功能 - 2C叠加高光
	this.drill_controller_initCamera();				//初始化子功能 - 2Z镜头参数
}


//==============================
// * A主体 - 初始化子功能
//==============================
Drill_LPR_Controller.prototype.drill_controller_initAttr = function(){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_initAttr.call( this );
	var data = this.drill_data();
	
	// > A主体 - 其它特性
	this._drill_XPer = data['XPer'];
	this._drill_YPer = data['YPer'];
	
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_LPR_PluginTip_curName;	//常规 - 当前插件名（提示信息）
}
//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_LPR_Controller.prototype.drill_controller_initChange = function(){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_initChange.call( this );
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子平移X【标准函数】（继承）
//##############################
Drill_LPR_Controller.prototype.drill_controller_finalTransform_par_x = function(){
	var xx = Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_x.call( this );
	xx += this._drill_cameraResultSpriteX;  //（镜头位移结果，见函数 drill_LPR_updateCamera ）
	return xx;
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子平移Y【标准函数】（继承）
//##############################
Drill_LPR_Controller.prototype.drill_controller_finalTransform_par_y = function(){
	var yy = Drill_COPa_BasicPar_Controller.prototype.drill_controller_finalTransform_par_y.call( this );
	yy += this._drill_cameraResultSpriteY;  //（镜头位移结果，见函数 drill_LPR_updateCamera ）
	return yy;
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子缩放X【标准函数】（覆写）
//##############################
Drill_LPR_Controller.prototype.drill_controller_finalTransform_par_scaleX = function(){
	return 1.0; 	//（锁定缩放）
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子缩放Y【标准函数】（覆写）
//##############################
Drill_LPR_Controller.prototype.drill_controller_finalTransform_par_scaleY = function(){
	return 1.0; 	//（锁定缩放）
};
//##############################
// * B变换特性 - 数据最终变换值 - 粒子旋转【标准函数】（覆写）
//##############################
Drill_LPR_Controller.prototype.drill_controller_finalTransform_par_rotate = function(){
	return 0;		//（锁定旋转）
};
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
Drill_LPR_Controller.prototype.drill_controller_initTransform = function(){
	Drill_COPa_BasicPar_Controller.prototype.drill_controller_initTransform.call( this );
	//（注意，控制器不存 弹道值 ，因此这里的 x、y、opacity 都不含弹道的影响）
	//（如果需要弹道影响后的值，去贴图中进行控制）
}
//##############################
// * K粒子重设 - 执行重设 - 粒子平移【标准函数】
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


//==============================
// * 2A雨滴管理 - 初始化子功能
//==============================
Drill_LPR_Controller.prototype.drill_controller_initRainPoint = function(){
	var data = this.drill_data();
	
	// > 雨滴 切片符号
	this._drill_LPR_rainPoint_SymbolList = [];
	this.drill_LPR_setRainPointSymbol( data['par_rain_pointSymbol'] );
	
	// > 雨滴 播放模式（0无效/1随机播放/2顺序播放）
	this._drill_LPR_rainPoint_Type = 0;
	this._drill_LPR_rainPoint_TypeLinearList = [];
	this.drill_LPR_setRainPointType( data['par_rain_pointType'] );
	
	// > 雨滴 高宽（单独建立的参数，函数直接返回值，节省计算性能）
	this._drill_LPR_rainPointWidth = 10;
	this._drill_LPR_rainPointHeight = 10;
	
	// > 雨滴 当前帧
	this._drill_parList_frameIndex = [];
	for( var i=0; i < this._drill_parList_x.length; i++ ){
		this._drill_parList_frameIndex[i] = 0;
	}
}
//==============================
// * 2A雨滴管理 - 雨滴 - 设置切片符号（开放函数）
//==============================
Drill_LPR_Controller.prototype.drill_LPR_setRainPointSymbol = function( symbol_str ){
	this._drill_LPR_rainPoint_SymbolList = [];
	for( var i = 0; i < symbol_str.length; i++ ){
		var ch = symbol_str.charAt(i);
		var ch_index = this.drill_LPR_getCharIndex( ch );
		this._drill_LPR_rainPoint_SymbolList.push( ch_index );
	}
}
//==============================
// * 2A雨滴管理 - 雨滴 - 设置切片符号 - 获取符号索引（开放函数）
//==============================
Drill_LPR_Controller.prototype.drill_LPR_getCharIndex = function( ch ){
	var result_index = -1;
	ch = ch.toLowerCase();
	switch( ch ){
		case "0":
			result_index = 0;
			break;
		case "1":
			result_index = 1;
			break;
		case "2":
			result_index = 2;
			break;
		case "3":
			result_index = 3;
			break;
		case "4":
			result_index = 4;
			break;
		case "5":
			result_index = 5;
			break;
		case "6":
			result_index = 6;
			break;
		case "7":
			result_index = 7;
			break;
		case "8":
			result_index = 8;
			break;
		case "9":
			result_index = 9;
			break;
		case "+":
			result_index = 10;
			break;
		case "-":
			result_index = 11;
			break;
		case "x":
			result_index = 12;
			break;
		case "*":
			result_index = 12;
			break;
		case "/":
			result_index = 13;
			break;
		default:
			break;
	}
	return result_index;
}
//==============================
// * 2A雨滴管理 - 雨滴 - 设置播放模式（开放函数）
//==============================
Drill_LPR_Controller.prototype.drill_LPR_setRainPointType = function( type ){
	
	// > 播放模式 顺序播放初始化
	var data = this.drill_data();
	this._drill_LPR_rainPoint_TypeLinearList = [];
	for( var i = 0; i < data['par_rain_lineCount']; i++ ){	//（与雨线数量相关）
		this._drill_LPR_rainPoint_TypeLinearList[i] = 0;
	}
	
	// > 播放模式
	if( typeof(type) == "number" ){
		this._drill_LPR_rainPoint_Type = Number(type);
	}else if( type == "随机播放" ){
		this._drill_LPR_rainPoint_Type = 1;
	}else if( type == "顺序播放" ){
		this._drill_LPR_rainPoint_Type = 2;
	}else{
		this._drill_LPR_rainPoint_Type = 0;
	}
}
//==============================
// * 2A雨滴管理 - 雨滴 - 获取宽度（开放函数）
//==============================
Drill_LPR_Controller.prototype.drill_controller_getRainPointWidth = function(){
	return this._drill_LPR_rainPointWidth;
}
//==============================
// * 2A雨滴管理 - 雨滴 - 获取高度（开放函数）
//==============================
Drill_LPR_Controller.prototype.drill_controller_getRainPointHeight = function(){
	return this._drill_LPR_rainPointHeight;
}


//==============================
// * 2B雨线管理 - 初始化子功能
//
//			说明：	> 雨滴是 粒子，雨线是 粒子发射器 。
//==============================
Drill_LPR_Controller.prototype.drill_controller_initEmitter = function(){
	var data = this.drill_data();
	
	// > 雨线 列表
	//		（雨线的位置移动与弹道无关，使用实时位置，而非固定增量）
	this._drill_LPR_rainLineTank = [];
	for( var i = 0; i < data['par_rain_lineCount']; i++ ){
		var cur_rainLine = {};
		cur_rainLine['index'] = i;
		cur_rainLine['time'] = 0;
		cur_rainLine['x'] = 0;
		cur_rainLine['y'] = 0;
		this._drill_LPR_rainLineTank.push( cur_rainLine );
	}
	
	// > 雨线 前进间隔
	this._drill_LPR_rainLine_Interval = 6;
	this.drill_LPR_setRainLineInterval( data['par_rain_lineInterval'] );
	
	// > 雨线 前进方向（4左/6右/2下/8上）
	this._drill_LPR_rainLine_Direction = 4;
	this.drill_LPR_setRainLineDirection( data['par_rain_lineDirection'] );
	
	// > 雨线 前进距离模式（0无效/1雨滴的高度宽度值/2自定义值）
	this._drill_LPR_rainLine_DistanceMode = 0;
	this.drill_LPR_setRainLineDistanceMode( data['par_rain_lineDistanceMode'] );
	this._drill_LPR_rainLine_DistanceHor = 12;
	this._drill_LPR_rainLine_DistanceVer = 12;
	
	
	// > 雨线 位置初始化
	var gridPoint_list = this.drill_controller_getGridLayout( data['par_rain_lineCount'], Graphics.boxWidth, Graphics.boxHeight );
	for( var i = 0; i < this._drill_LPR_rainLineTank.length; i++ ){
		var cur_rainLine = this._drill_LPR_rainLineTank[i];
		var cur_gridPoint = gridPoint_list[i];
		this.drill_controller_emitterReset( cur_rainLine, cur_gridPoint );
	}
}
//==============================
// * 2B雨线管理 - 帧刷新
//==============================
Drill_LPR_Controller.prototype.drill_controller_updateEmitter = function(){
	
	// > 雨线
	for( var i = 0; i < this._drill_LPR_rainLineTank.length; i++ ){
		var cur_rainLine = this._drill_LPR_rainLineTank[i];
		
		// > 雨线 - 前进间隔
		if( cur_rainLine['time'] >= this._drill_LPR_rainLine_Interval ){
			cur_rainLine['time'] = 0;
			
			// > 雨线 - 生成一个雨滴
			this.drill_controller_emitterGenerateOne( cur_rainLine );
			
			// > 雨线 - 生成一个高光（2C叠加高光）
			this.drill_controller_lightGenerateOne( cur_rainLine );
			
			// > 雨线 - 前进一次
			this.drill_controller_emitterForward( cur_rainLine );
		}
		
		// > 雨线 - 时间+1
		cur_rainLine['time'] += 1;
	}
}
//==============================
// * 2B雨线管理 - 设置前进间隔（开放函数）
//==============================
Drill_LPR_Controller.prototype.drill_LPR_setRainLineInterval = function( interval ){
	this._drill_LPR_rainLine_Interval = Number(interval);
}
//==============================
// * 2B雨线管理 - 设置前进方向（开放函数）
//==============================
Drill_LPR_Controller.prototype.drill_LPR_setRainLineDirection = function( direction ){
	if( typeof(direction) == "number" ){
		this._drill_LPR_rainLine_Direction = Number(direction);
	}else if( direction == "下" ){
		this._drill_LPR_rainLine_Direction = 2;
	}else if( direction == "左" ){
		this._drill_LPR_rainLine_Direction = 4;
	}else if( direction == "右" ){
		this._drill_LPR_rainLine_Direction = 6;
	}else if( direction == "上" ){
		this._drill_LPR_rainLine_Direction = 8;
	}else{
		this._drill_LPR_rainLine_Direction = 0;
	}
}
//==============================
// * 2B雨线管理 - 设置前进距离模式（开放函数）
//==============================
Drill_LPR_Controller.prototype.drill_LPR_setRainLineDistanceMode = function( mode ){
	if( typeof(mode) == "number" ){
		this._drill_LPR_rainLine_DistanceMode = Number(mode);
	}else if( mode == "雨滴的高度宽度值" ){
		this._drill_LPR_rainLine_DistanceMode = 1;
	}else if( mode == "自定义值" ){
		this._drill_LPR_rainLine_DistanceMode = 2;
	}
}
//==============================
// * 2B雨线管理 - 生成一个雨滴
//==============================
Drill_LPR_Controller.prototype.drill_controller_emitterGenerateOne = function( cur_rainLine ){
	
	// > 获取一个已死亡的粒子（L粒子生命周期『粒子手动产生与管理』）
	var dead_index = this.drill_LPR_getOneDeadIndex();
	if( dead_index == -1 ){ return; }
	
	// > 『粒子手动产生与管理』
	this.drill_controller_rebirth( dead_index );
	this.drill_controller_resetParticles( dead_index );
	
	
	// > 雨滴 - 位置
	var xx = cur_rainLine['x'];
	var yy = cur_rainLine['y'];
	
	// > 雨滴 - 位置 - 赋值
	this._drill_parList_x[ dead_index ] = xx;
	this._drill_parList_y[ dead_index ] = yy;
	
	
	// > 雨滴 - 当前帧 顺序播放
	if( this._drill_LPR_rainPoint_Type == 2 ){
		var cur_lineIndex = cur_rainLine['index'];
		var cur_symbolIndex = this._drill_LPR_rainPoint_TypeLinearList[ cur_lineIndex ];
		cur_symbolIndex = cur_symbolIndex % this._drill_LPR_rainPoint_SymbolList.length;
		this._drill_parList_frameIndex[ dead_index ] = this._drill_LPR_rainPoint_SymbolList[ cur_symbolIndex ];
		this._drill_LPR_rainPoint_TypeLinearList[ cur_lineIndex ] += 1;
		
	// > 雨滴 - 当前帧 随机播放
	}else{
		var cur_iteration = this._drill_parList_randomIteration[ dead_index ];
		var cur_ran = this.drill_controller_curRandom( cur_iteration*dead_index +45*dead_index );
		var cur_symbolIndex = Math.floor( cur_ran * this._drill_LPR_rainPoint_SymbolList.length );
		this._drill_parList_frameIndex[ dead_index ] = this._drill_LPR_rainPoint_SymbolList[ cur_symbolIndex ];
	}
}
//==============================
// * 2B雨线管理 - 生成一个雨滴 - 获取一个已死亡的粒子
//
//			说明：	> 该函数复刻来自 Drill_COPa_BasicPar_Controller.prototype.drill_controller_getOneDeadParticleIndex 。
//==============================
Drill_LPR_Controller.prototype.drill_LPR_getOneDeadIndex = function(){
	for( var i=0; i < this.drill_data()['par_count']; i++ ){
		
		// > 排除高光（2C叠加高光）
		if( this._drill_LPR_lightParIndex.indexOf( i ) != -1 ){
			continue;
		}
		
		if( this.drill_controller_isParticleDead(i) == true ){
			return i;
		}
	}
	return -1;
};
//==============================
// * 2B雨线管理 - 前进一次
//==============================
Drill_LPR_Controller.prototype.drill_controller_emitterForward = function( cur_rainLine ){
	var org_x = cur_rainLine['x'];
	var org_y = cur_rainLine['y'];
	
	// > 雨滴的高度宽度值
	if( this._drill_LPR_rainLine_DistanceMode == 1 ){
		var direction = this._drill_LPR_rainLine_Direction;  //（前进方向）
		if( direction == 2 ){
			org_y += this.drill_controller_getRainPointHeight() *0.5;
		}else if( direction == 4 ){
			org_x -= this.drill_controller_getRainPointWidth() *0.5;
		}else if( direction == 6 ){
			org_x += this.drill_controller_getRainPointWidth() *0.5;
		}else if( direction == 8 ){
			org_y -= this.drill_controller_getRainPointHeight() *0.5;
		}
		
	// > 自定义值
	}else if( this._drill_LPR_rainLine_DistanceMode == 2 ){
		var direction = this._drill_LPR_rainLine_Direction;  //（前进方向）
		if( direction == 2 ){
			org_y += this._drill_LPR_rainLine_DistanceVer *0.5;
		}else if( direction == 4 ){
			org_x -= this._drill_LPR_rainLine_DistanceHor *0.5;
		}else if( direction == 6 ){
			org_x += this._drill_LPR_rainLine_DistanceHor *0.5;
		}else if( direction == 8 ){
			org_y -= this._drill_LPR_rainLine_DistanceVer *0.5;
		}
	}
	
	cur_rainLine['x'] = org_x;
	cur_rainLine['y'] = org_y;
}
//==============================
// * 2B雨线管理 - 位置初始化
//==============================
Drill_LPR_Controller.prototype.drill_controller_emitterReset = function( cur_rainLine, cur_gridPoint ){
	
	// > 雨线位置 - 均匀网格位置
	cur_rainLine['x'] = 0;
	cur_rainLine['y'] = 0;
	if( cur_gridPoint != undefined ){
		cur_rainLine['x'] = cur_gridPoint['x'];
		cur_rainLine['y'] = cur_gridPoint['y'];
	}
	
	// > 雨线位置 - 小范围随机
	var cur_index = cur_rainLine['index'];
	var cur_iteration = this._drill_parList_randomIteration[ cur_index ];
	var ran1 = this.drill_controller_curRandom( cur_iteration*cur_index +41*cur_index );
	var ran2 = this.drill_controller_curRandom( cur_iteration*cur_index +43*cur_index +1000 );
	cur_rainLine['x'] += Graphics.boxWidth  * 0.12 * ran1;
	cur_rainLine['y'] += Graphics.boxHeight * 0.12 * ran2;
}
//==============================
// * 2B雨线管理 - 位置初始化 - 获取均匀网格位置
//==============================
Drill_LPR_Controller.prototype.drill_controller_getGridLayout = function( lineNum, width, height ){
	
	// > 网格信息
	var col_num = Math.ceil( Math.sqrt(lineNum*width/height) );
	var row_num = Math.ceil( lineNum/col_num );
	var space_x = width  / (col_num + 1);
	var space_y = height / (row_num + 1);
	
	// > 网格点
	var cur_num = 0;
	var result_pointList = [];
	for( var r = 1; r <= row_num && cur_num < lineNum; r++ ){
		for( var c = 1; c <= col_num && cur_num < lineNum; c++ ){
			var point = {};
			point['x'] = c * space_x;
			point['y'] = r * space_y;
			result_pointList.push(point);
			cur_num += 1;
		}
	}
	return result_pointList;
}


//==============================
// * 2C叠加高光 - 初始化子功能
//==============================
Drill_LPR_Controller.prototype.drill_controller_initLight = function(){
	var data = this.drill_data();
	
	// > 显示/隐藏
	this._drill_LPR_light_Enabled = false;
	this.drill_LPR_setLightEnabled( data['par_rain_lightEnabled'] );
	
	// > 切片符号
	this._drill_LPR_light_SymbolIndex = 3;
	this.drill_LPR_setLightSymbol( data['par_rain_lightSymbol'] );
	
	
	// > 高光列表
	this._drill_LPR_lightParIndex = [];
	for( var i = 0; i < this._drill_LPR_rainLineTank.length; i++ ){
		var cur_rainLine = this._drill_LPR_rainLineTank[i];
		
		// > 获取一个已死亡的粒子（L粒子生命周期『粒子手动产生与管理』）
		var dead_index = this.drill_controller_getOneDeadParticleIndex();
		if( dead_index == -1 ){ return; }
		
		// > 将这些粒子锁定，专用于高光功能
		this._drill_parList_x[ dead_index ] = -2000;
		this._drill_parList_y[ dead_index ] = -2000;
		this._drill_parList_curTime[ dead_index ] = 0;
		
		this._drill_LPR_lightParIndex[i] = dead_index;
	}
}
//==============================
// * 2C叠加高光 - 显示/隐藏（开放函数）
//==============================
Drill_LPR_Controller.prototype.drill_LPR_setLightEnabled = function( enabled ){
	this._drill_LPR_light_Enabled = enabled;
}
//==============================
// * 2C叠加高光 - 设置切片符号（开放函数）
//==============================
Drill_LPR_Controller.prototype.drill_LPR_setLightSymbol = function( symbol_str ){
	if( symbol_str.length > 1  ){ symbol_str = symbol_str.charAt(0); }
	if( symbol_str.length == 0 ){ return; }
	this._drill_LPR_light_SymbolIndex = this.drill_LPR_getCharIndex( symbol_str );
}
//==============================
// * 2C叠加高光 - 生成一个高光
//==============================
Drill_LPR_Controller.prototype.drill_controller_lightGenerateOne = function( cur_rainLine ){
	if( this._drill_LPR_light_Enabled != true ){ return; }
	
	// > 高光 - 索引
	var rainLine_index = cur_rainLine['index'];
	var light_index = this._drill_LPR_lightParIndex[ rainLine_index ];
	
	// > 『粒子手动产生与管理』
	this.drill_controller_rebirth( light_index );
	this.drill_controller_resetParticles( light_index );
	
	// > 高光 - 位置
	var xx = cur_rainLine['x'];
	var yy = cur_rainLine['y'];
	
	// > 高光 - 位置 - 赋值
	this._drill_parList_x[ light_index ] = xx;
	this._drill_parList_y[ light_index ] = yy;
	this._drill_parList_curTime[ light_index ] = 0;
	
	// > 高光 - 当前帧
	this._drill_parList_frameIndex[ light_index ] = this._drill_LPR_light_SymbolIndex;
}


//==============================
// * 2Z镜头参数 - 初始化子功能
//==============================
Drill_LPR_Controller.prototype.drill_controller_initCamera = function(){
	//this._drill_cameraXAcc = 0;			//循环积累值（不存）
	//this._drill_cameraYAcc = 0;
	
	this._drill_cameraResultSpriteX = 0;	//镜头位移结果
	this._drill_cameraResultSpriteY = 0;
}
// > 强制更新提示 锁
DrillUp.g_LPR_alert = true;
//==============================
// * 2Z镜头参数 - 获取 循环积累值（开放函数）
//
//			说明：	> 此处直接调用函数获取值。参数不存，因为浪费 帧刷新 和 存储空间。
//==============================
Drill_LPR_Controller.prototype.drill_controller_getCameraXAcc = function(){
	if( $gameMap == undefined ){ return 0; }	//『$gameSystem优先初始化』（注意此处，调用时 $gameMap和$dataMap 都可能未创建。）
	if( $dataMap == undefined ){ return 0; }
	
	// > 循环积累值 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LPR_alert == true ){ 
			alert( DrillUp.drill_LPR_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LPR_alert = false;
			return; 
		}
		
		return $gameSystem._drill_LCa_controller._drill_cameraX_offsetAcc * $gameMap.tileWidth();
	}else{
		return $gameMap.displayX() * $gameMap.tileWidth();
	}
}
//==============================
// * 2Z镜头参数 - 获取 循环积累值（开放函数）
//
//			说明：	> 此处直接调用函数获取值。参数不存，因为浪费 帧刷新 和 存储空间。
//==============================
Drill_LPR_Controller.prototype.drill_controller_getCameraYAcc = function(){
	if( $gameMap == undefined ){ return 0; }	//『$gameSystem优先初始化』（注意此处，调用时 $gameMap和$dataMap 都可能未创建。）
	if( $dataMap == undefined ){ return 0; }
	
	// > 循环积累值 【地图 - 活动地图镜头】
	if( Imported.Drill_LayerCamera ){
		
		// > 强制更新提示
		if( $gameSystem._drill_LCa_controller == undefined && DrillUp.g_LPR_alert == true ){ 
			alert( DrillUp.drill_LPR_getPluginTip_NeedUpdate_Camera() );
			DrillUp.g_LPR_alert = false;
			return; 
		}
		
		return $gameSystem._drill_LCa_controller._drill_cameraY_offsetAcc * $gameMap.tileHeight();
	}else{
		return $gameMap.displayY() * $gameMap.tileHeight();
	}
}



//=============================================================================
// ** 粒子贴图【Drill_LPR_Sprite】
// **
// **		作用域：	地图界面
// **		主功能：	定义一个粒子贴图。
// **		子功能：	
// **					->贴图『控制器与贴图』
// **						->是否就绪
// **						->优化策略
// **						->贴图是否销毁
// **						->贴图执行销毁
// **					
// **					->2A雨滴管理（无）
// **					->2B雨线管理（无）
// **					->2C叠加高光（无）
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
function Drill_LPR_Sprite() {
    this.initialize.apply(this, arguments);
};
Drill_LPR_Sprite.prototype = Object.create(Drill_COPa_BasicPar_Sprite.prototype);
Drill_LPR_Sprite.prototype.constructor = Drill_LPR_Sprite;
//==============================
// * 粒子贴图 - 初始化
//==============================
Drill_LPR_Sprite.prototype.initialize = function(){
    Drill_COPa_BasicPar_Sprite.prototype.initialize.call( this );
};
//==============================
// * 粒子贴图 - 帧刷新
//==============================
Drill_LPR_Sprite.prototype.update = function(){
	Drill_COPa_BasicPar_Sprite.prototype.update.call(this);
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
Drill_LPR_Sprite.prototype.drill_sprite_setController = function( controller ){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_setController.call( this, controller );
};
//##############################
// * C对象绑定 - 初始化子功能『控制器与贴图』【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 需要设置 控制器 之后，才能进行手动初始化。
//##############################
Drill_LPR_Sprite.prototype.drill_sprite_initChild = function(){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initChild.call( this );
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
Drill_LPR_Sprite.prototype.drill_sprite_isReady = function(){
    return Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_isReady.call( this );
};
//##############################
// * 粒子贴图 - 优化策略【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔（是否通过）
//			
//			说明：	> 通过时，正常帧刷新；未通过时，不执行帧刷新。
//##############################
Drill_LPR_Sprite.prototype.drill_sprite_isOptimizationPassed = function(){
    return Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_isOptimizationPassed.call( this );
};
//##############################
// * 粒子贴图 - 贴图是否销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 布尔
//			
//			说明：	> 此函数可用于监听 控制器数据 是否被销毁，数据销毁后，贴图可自动销毁。
//##############################
Drill_LPR_Sprite.prototype.drill_sprite_isNeedDestroy = function(){
    return Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_isNeedDestroy.call( this );
};
//##############################
// * 粒子贴图 - 贴图执行销毁【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//			
//			说明：	> 销毁不是必要的，但最好随时留意给 旧贴图 执行销毁函数。
//##############################
Drill_LPR_Sprite.prototype.drill_sprite_destroy = function(){
	Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_destroy.call( this );
};
//==============================
// * 粒子贴图 - 初始化自身『控制器与贴图』
//==============================
Drill_LPR_Sprite.prototype.drill_sprite_initSelf = function(){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initSelf.call( this );
};
//==============================
// * 粒子贴图 - 销毁子功能『控制器与贴图』
//==============================
Drill_LPR_Sprite.prototype.drill_sprite_destroyChild = function(){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_destroyChild.call( this );
};
//==============================
// * 粒子贴图 - 销毁自身『控制器与贴图』
//==============================
Drill_LPR_Sprite.prototype.drill_sprite_destroySelf = function(){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_destroySelf.call( this );
};


//==============================
// * A贴图主体 - 初始化子功能
//==============================
Drill_LPR_Sprite.prototype.drill_sprite_initAttr = function(){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initAttr.call( this );
	/*
		贴图的层级如下：
			- 主体贴图（this）
			- - 粒子层（_drill_COPa_parSpriteLayer）
			- - - 粒子贴图组（_drill_COPa_parSpriteTank）
			- - 直线拖尾层（_drill_COPa_trailingSpriteLayer）
			- - - 直线拖尾贴图组（_drill_COPa_trailingSpriteTank）
	*/
	
	// > 常规
	this._drill_curPluginTipName = DrillUp.g_LPR_PluginTip_curName;	//常规 - 当前插件名（提示信息）
};
//==============================
// * B变换特性 - 初始化子功能
//==============================
Drill_LPR_Sprite.prototype.drill_sprite_initChange = function(){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_initChange.call( this );
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
// * I随机因子 - 初始化子功能
//==============================
//==============================
// * J粒子变化 - 初始化子功能 - 创建粒子层（覆写）
//==============================
Drill_LPR_Sprite.prototype.drill_sprite_createTransformLayer = function() {
	
	// > 粒子层
	var temp_layer = new PIXI.particles.ParticleContainer(
		2500, 					//粒子最大数量
		{
			position: true,		//粒子平移
			scale: true,		//粒子缩放（2A雨滴管理，pixi有显示bug，不能关闭）
			alpha: true,		//粒子透明度
			rotation: false,	//粒子旋转（2A雨滴管理，关闭）
			uvs: true			//粒子纹理（2A雨滴管理，雨滴当前帧）
		}
	);
	return temp_layer;
};
//##############################
// * J粒子变化 - 帧刷新 - 粒子平移【标准函数】
//##############################
Drill_LPR_Sprite.prototype.drill_sprite_updateTransform_Position = function( i, time ){
    Drill_COPa_BasicPar_Sprite.prototype.drill_sprite_updateTransform_Position.call( this, i, time );
	/*
		注意，该插件包含 雨线、雨滴、粒子 。雨滴是 粒子，雨线是 粒子发射器 。
		"边界重置"、"生命周期快结束时，进入边界时强制删除" 这些功能不需要。
		因为该插件主要控制的是 雨线 ，雨线需要均匀分布，重置雨线位置没有意义，不需要考虑 粒子重设 问题。
	*/
	
	// > 粒子过边界时（取余，不要重置粒子）（该函数执行次数非常多，尽量减少计算次数）
	var mww = this._drill_controller.drill_controller_getRainPointWidth();		//（雨滴宽度）
	var mhh = this._drill_controller.drill_controller_getRainPointHeight();		//（雨滴高度）
	var ww = Graphics.boxWidth  + mww*2;
	var hh = Graphics.boxHeight + mhh*2;
	
	// > 边界取余（取余有负数值情况）
	this._drill_par_x %= ww;
	if( this._drill_par_x < 0 ){ this._drill_par_x += ww; }
	this._drill_par_x -= mww;
	this._drill_par_y %= hh;
	if( this._drill_par_y < 0 ){ this._drill_par_y += hh; }
	this._drill_par_y -= mhh;
	
	
	// > 雨滴当前帧（2A雨滴管理）
	this.drill_sprite_updateTransform_FrameIndex( i, time );
}
//##############################
// * J粒子变化 - 帧刷新 - 粒子缩放【标准函数】（覆写）
//##############################
Drill_LPR_Sprite.prototype.drill_sprite_updateTransform_Scale = function( i, time ){
	this._drill_par_scaleX = 1;		//（锁定缩放）
	this._drill_par_scaleY = 1;		//（锁定缩放）
}
//##############################
// * J粒子变化 - 帧刷新 - 粒子透明度【标准函数】
//##############################
//##############################
// * J粒子变化 - 帧刷新 - 粒子旋转【标准函数】（覆写）
//##############################
Drill_LPR_Sprite.prototype.drill_sprite_updateTransform_Rotation = function( i, time ){
	this._drill_par_rotation = 0;	//（锁定旋转）
}
//==============================
// * J粒子变化 - 帧刷新 - 雨滴当前帧
//==============================
Drill_LPR_Sprite.prototype.drill_sprite_updateTransform_FrameIndex = function( i, time ){
	
	// > 2A雨滴管理 - 获取高宽（固定为横向14份）
	var par_width = this._drill_controller.drill_controller_getRainPointWidth();
	var par_height = this._drill_controller.drill_controller_getRainPointHeight();
	
	// > 2A雨滴管理 - 设置 雨滴当前帧
	var par_sprite = this._drill_COPa_parSpriteTank[i];
	var par_frameIndex = this._drill_controller._drill_parList_frameIndex[i];
	par_sprite.setFrame( par_frameIndex*par_width, 0, par_width, par_height );
}
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

//==============================
// * 2A雨滴管理 - O贴图加载-控制器用 - 延迟初始化 - 粒子贴图（覆写）
//==============================
var _drill_LPR_initBitmapAttr_Par = Drill_LPR_Sprite.prototype.drill_sprite_initBitmapAttr_Par;
Drill_LPR_Sprite.prototype.drill_sprite_initBitmapAttr_Par = function() {
	_drill_LPR_initBitmapAttr_Par.call(this);
	this._drill_controller._drill_LPR_rainPointWidth  = Math.floor(this._drill_controller._drill_bitmapPar_width / 14);
	this._drill_controller._drill_LPR_rainPointHeight = this._drill_controller._drill_bitmapPar_height;
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_LayerParticleRain = false;
		var pluginTip = DrillUp.drill_LPR_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}

