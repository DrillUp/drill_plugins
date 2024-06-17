//=============================================================================
// Drill_EventMouseHoverSwitch.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        物体 - 鼠标悬停响应开关
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EventMouseHoverSwitch +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 鼠标接触响应开关指 鼠标悬停+执行点击操作 时，能触发事件的开关。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件 不能 单独使用。
 * 必须基于核心插件才能运行。并且可以与其他插件扩展。
 * 基于：
 *   - Drill_CoreOfInput                  系统-输入设备核心
 *   - Drill_CoreOfEventFrameWithMouse    行走图-行走图与鼠标控制核心
 *     通过该核心才能进行鼠标控制操作。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面
 *   只作用于事件，单独对鼠标有效。
 * 2.你需要先了解基础知识 "8.物体 > 触发的本质.docx"。
 *   悬停的支持来自核心，可以看看 "7.行走图 > 关于行走图与鼠标控制核心.docx"。
 * 传感器：
 *   (1.该插件被划分为传感器类。
 *      传感器即遇到某些情况就会自动触发的事件。
 *      鼠标 悬停+点击事件 时，触发事件的独立开关。
 *   (2.该插件的注释设置全都跨事件页。
 *      详细介绍去看看 "8.物体 > 大家族-开关.docx"。
 * 细节：
 *   (1.鼠标触发范围为事件行走图大小。空的行走图则表示没有触发范围。
 *      事件必须设置行走图，鼠标触发才能生效。
 *      事件必须设置行走图，鼠标触发才能生效。
 *      事件必须设置行走图，鼠标触发才能生效。
 *      重要的事情说三遍，大部分群友总是犯低级错误，快去好好看文档。
 *      触发范围具体介绍可以去看看 "7.行走图 > 关于行走图与图块.docx"。
 *   (2.如果你设置了"悬停"+"不在悬停区域时"，一定要确保事件页两边都配
 *      置了行走图，不然触发范围不停地 行走图 -> 空行走图 来回切换。
 *   (3.由于注释设置全部跨事件页，也就是说 鼠标触发 与 事件对象 一一绑定，
 *      与事件页无关，切换事件页不能关闭鼠标触发。
 *      因此，最好将所有 鼠标触发 的注释都写在事件页的第一页，然后根据
 *      每页的条件来区分不同的状态工作流程。
 * 输入设备：
 *   (1.插件只对鼠标有效。
 *   (2.插件只支持 物理按键，不支持 逻辑按键。
 *      按键介绍可以去看看 "1.系统 > 关于输入设备核心（入门篇）.docx"。
 * 鼠标的物理按键：
 *   (1.鼠标有三个键位：左键、中键/滚轮、右键。鼠标中键与鼠标滚轮是同一个键。
 *      鼠标滚轮的 上滚和下滚 只在特殊情况下能支持，需要看具体应用场景。
 *   (2.你可以设置对话框弹出时，鼠标仍然可触发事件。
 *      但是，事件指令仍然会被阻塞，只有对话框结束后才会执行事件的指令。
 * 设计：
 *   (1.鼠标悬停+点击，可以制作打气球的小游戏。
 *      也可以制作鼠标点击搜集金币的小游戏。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你需要给指定的开关事件添加下面的注释：
 * （注意，冒号左右有一个空格）
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 悬停时开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 不在悬停区域时关闭
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停左键按下
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 悬停左键按下时开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 不满足悬停左键按下时关闭
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停右键按下
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 悬停右键按下时开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 不满足悬停右键按下时关闭
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停滚轮按下
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 悬停滚轮按下时开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 不满足悬停滚轮按下时关闭
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发-悬停" 就是 "悬停时开启"的触发+"不在悬停区域时关闭"的触发 两个触发。
 *   "绑定持续触发-悬停左键按下" 就是 "悬停左键按下时开启"的触发+"不满足悬停左键按下时关闭"的触发 两个触发。
 *   "绑定持续触发-悬停右键按下" 就是 "悬停右键按下时开启"的触发+"不满足悬停右键按下时关闭"的触发 两个触发。
 *   "绑定持续触发-悬停滚轮按下" 就是 "悬停滚轮按下时开启"的触发+"不满足悬停滚轮按下时关闭"的触发 两个触发。
 *   因为"绑定持续触发"更好理解一些，"不满足悬停左键按下时关闭"这种单向触发容易把自己绕晕，
 *   你也可以去看看 "8.物体 > 触发的本质.docx" 的 开关触发与命题 章节。
 * 2.注意，"悬停"、"悬停左键按下"、"悬停右键按下"、"悬停滚轮按下" 这四类，
 *   每个独立开关只能绑定一个类型。
 * 3.鼠标悬停的触发范围为事件行走图的大小。
 *   在事件行走图大小内才能触发，不在范围内则触发关闭独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 逆向触发
 * 如果你需要设置逆向开启/关闭的触发，使用下面的注释：
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停(逆向)
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 悬停时关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 不在悬停区域时开启
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停左键按下(逆向)
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 悬停左键按下时关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 不满足悬停左键按下时开启
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停右键按下(逆向)
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 悬停右键按下时关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 不满足悬停右键按下时开启
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停滚轮按下(逆向)
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 悬停滚轮按下时关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 不满足悬停滚轮按下时开启
 * 
 * 1.当前为持续触发，能使独立开关根据条件持续保持开启/关闭状态。
 *   "绑定持续触发-悬停(逆向)" 就是 "悬停时关闭"的触发+"不在悬停区域时开启"的触发 两个触发。
 *   "绑定持续触发-悬停左键按下(逆向)" 就是 "悬停左键按下时关闭"的触发+"不满足悬停左键按下时开启"的触发 两个触发。
 *   "绑定持续触发-悬停右键按下(逆向)" 就是 "悬停右键按下时关闭"的触发+"不满足悬停右键按下时开启"的触发 两个触发。
 *   "绑定持续触发-悬停滚轮按下(逆向)" 就是 "悬停滚轮按下时关闭"的触发+"不满足悬停滚轮按下时开启"的触发 两个触发。
 *   由于是逆向开启/关闭，容易绕晕自己，设计时要小心。
 * 2.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 多开关触发
 * 你可以写多个注释，分别建立多个独立开关的触发：
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[B] : 绑定持续触发-悬停
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[C] : 绑定持续触发-悬停左键按下
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[D] : 绑定持续触发-悬停左键按下(逆向)
 * 
 * 1.此功能不常用，但涉及复杂触发设计时可能会用到。
 *   建议结合 "8.物体 > 触发的本质.docx" 的触发知识来设计。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 单次触发
 * 你可以写注释设计单次触发效果：
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停[一帧]时 : 关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-离开悬停[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-离开悬停[一帧]时 : 关闭
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键按下[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键按下[一帧]时 : 关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键释放[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键释放[一帧]时 : 关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键双击[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键双击[一帧]时 : 关闭
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停右键按下[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停右键按下[一帧]时 : 关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停右键释放[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停右键释放[一帧]时 : 关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停右键双击[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停右键双击[一帧]时 : 关闭
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮按下[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮按下[一帧]时 : 关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮释放[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮释放[一帧]时 : 关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮双击[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮双击[一帧]时 : 关闭
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮上滚时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮上滚时 : 关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮下滚时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停滚轮下滚时 : 关闭
 * 
 * 1.当前为单次触发，只在满足条件的那一帧执行一次开启/关闭。
 * 2.上述的指令互斥，每个独立开关只能绑定上述的一个类型。
 *   但有个例外，左键和右键 能叠加，后面内容"左键或右键"会提到。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 左键或右键
 * 除了前面介绍的各个指令，你还可以合并左键和右键：
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停左键或右键按下
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定持续触发-悬停左键或右键按下(逆向)
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键或右键按下[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键或右键按下[一帧]时 : 关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键或右键释放[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键或右键释放[一帧]时 : 关闭
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键或右键双击[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键或右键双击[一帧]时 : 关闭
 * 
 * 1.持续触发中，"悬停左键或右键按下"表示 悬停+左键 和 悬停+右键 任意一个满足时，
 *   即可触发独立开关。
 *   单次触发中，"悬停左键或右键按下[一帧]时"表示 悬停+左键 和 悬停+右键 任意一个满足时，
 *   即可开启/关闭一次独立开关。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 左键或右键合并
 * 你写多个注释，也能合并左键和右键：
 * 
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停左键按下[一帧]时 : 开启
 * 事件注释：=>鼠标悬停响应开关 : 独立开关[A] : 绑定单次触发-悬停右键按下[一帧]时 : 开启
 * 
 * 1.常规情况下，独立开关[A]只能绑定一个类型。
 *   但考虑到触发同一个开关情况，这里写"左键""右键"两个注释等同于直接写"左键或右键"。
 *   能实现 左键 或 右键 开启同一个独立开关的功能。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 插件指令
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>鼠标悬停响应开关 : 对话框弹出时保持触发
 * 插件指令：>鼠标悬停响应开关 : 对话框弹出时暂停触发
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 临时控制触发
 * 你可以通过插件指令手动控制触发设置：
 * 
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 本事件 : 独立开关[A] : 绑定持续触发-悬停
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-悬停
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件变量[21] : 独立开关[A] : 绑定持续触发-悬停
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 批量事件[10,11] : 独立开关[A] : 绑定持续触发-悬停
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 批量事件变量[21,22] : 独立开关[A] : 绑定持续触发-悬停
 * 
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-悬停
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-悬停左键按下
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-悬停右键按下
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定持续触发-悬停滚轮按下
 * 
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-离开悬停[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停左键按下[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停左键释放[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停左键双击[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停右键按下[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停右键释放[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停右键双击[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停滚轮按下[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停滚轮释放[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停滚轮双击[一帧]时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停滚轮上滚时 : 开启
 * 插件指令：>鼠标悬停响应开关 : 添加触发 : 事件[10] : 独立开关[A] : 绑定单次触发-悬停滚轮下滚时 : 开启
 * 
 * 插件指令：>鼠标悬停响应开关 : 去除触发 : 事件[10] : 独立开关[A]
 * 插件指令：>鼠标悬停响应开关 : 去除触发 : 事件[10] : 全部独立开关
 * 
 * 1.插件指令前面部分（本事件）和后面设置（独立开关[A] : 绑定持续触发-悬停）可以随意组合。
 *   一共有5*(4+13+2)种组合方式。
 * 2.注意，"添加触发"、"去除触发"的设置都只在当前地图有效，离开地图后失效。
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
 * 时间复杂度： o(n^2) 每帧
 * 测试方法：   地图界面中，放置20个鼠标悬停响应开关，进行鼠标触发等操作。
 * 测试结果：   200个事件的地图中，消耗为：【43.08ms】
 *              100个事件的地图中，消耗为：【21.29ms】
 *               50个事件的地图中，消耗为：【18.15ms】
 * 测试方法2：  直接在设计华容道地图中测试性能。
 * 测试结果2：  150个含鼠标触发的事件，消耗为：【132.90ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.每个 鼠标悬停响应开关 需要实时判定鼠标范围，地图的鼠标开关放置多了，
 *   性能消耗会线性增加。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 * 
 * 
 * @param 对话框弹出时是否保持触发
 * @type boolean
 * @on 保持触发
 * @off 暂停触发
 * @desc 对话框弹出时，通常会暂停鼠标的事件触发监听。你可以设置弹出后仍然保持触发。
 * @default true
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		EMoHS (Event_Mouse_Hover_Switch)
//		临时全局变量	DrillUp.g_EMoHS_xxx
//		临时局部变量	this._drill_EMoHS_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n^2) 每帧
//		★性能测试因素	鼠标乱晃
//		★性能测试消耗	132.9ms（drill_EMoHS_updateSwitch）
//		★最坏情况		存在大批触发的事件，并且玩家的鼠标乱晃。
//		★备注			历史版本插件优化了很多次，都只是把工作量转移到其他地方，这次工作量已全部交给核心管了。
//		
//		★优化记录
//			x第一次优化：
//				使用距离排序，由于该插件变量时间复杂度本来就不高o(n^2)，结果直接跳到378.00ms左右。失败。
//			x第二次优化：
//				使用触发刷新时，生成数组。计算量没有太大变化，138ms被分成了121ms和21ms。失败。
//			x第三次优化：
//				就是现在采用的方法，根据记录的data数量，关联sprite，而不是每次都遍历sprite，实现降维。
//			    （将实时生成的数组，变成固定添加/减少的数组容器，【时空权衡】）
//			x第四次优化：
//				鼠标触发关系当时仍然是含糊不清的情况。为了完美划分减少冗余计算量，这里重组了type的设置关系。
//				先后判定关系分为： ON类型/OFF类型 > 鼠标操作类型 > 鼠标范围 > 是否为一体化事件 > 触发开关
//			x第五次优化：
//				针对根据事件获取贴图，这里用【缓冲池】方法，防止多次重复筛选取贴图。
//			x第六次优化：
//				这次直接用 实体类 的结构来控制。
//				由于修改了更标准的底层结构。前面的优化【全部作废】。
//			第七次优化：
//				实体类+碰撞体的结构，转移到 行走图与鼠标控制核心，这样既能debug，也能给其他插件共用。
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			->☆存储数据
//			->☆事件注释
//			
//			->☆开关的属性
//			->☆鼠标悬停响应开关容器
//			
//			->☆开关控制
//				->是否在 实体类 范围内
//			
//			
//		★家谱：
//			大家族-开关
//		
//		★脚本文档：
//			8.物体 > 大家族-开关（脚本）.docx
//		
//		★插件私有类：
//			无
//		
//		★必要注意事项：
//			1.该插件的悬停判定来自于核心，搜索 COEFWM 就能找到。
//
//		★其它说明细节：
//			1.该插件原本写了一大堆的注释和说明，全都来自于如何判定鼠标悬停，使用核心后就全部不需要了。
//
//		★存在的问题：
//			1.问题：当鼠标靠近时，开启了独立开关，然后保存，读档，所有跨事件页的事件会保持停滞的锁死状态。
//					正常情况都会停留回原来有注释页的那一面。正常状态下保存，则没有任何问题。
//			  解决：【已解决】，见"强制读取第一页注释"，其实没完全解决，如果一开始就停留在第二页，可能依然会出现此问题。
//		

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_EMoHS_PluginTip_curName = "Drill_EventMouseHoverSwitch.js 物体-鼠标悬停响应开关";
	DrillUp.g_EMoHS_PluginTip_baseList = [
		"Drill_CoreOfInput.js 系统-输入设备核心",
		"Drill_CoreOfEventFrameWithMouse.js 行走图-行走图与鼠标控制核心"
	];
	//==============================
	// * 提示信息 - 报错 - 缺少基础插件
	//			
	//			说明：	此函数只提供提示信息，不校验真实的插件关系。
	//==============================
	DrillUp.drill_EMoHS_getPluginTip_NoBasePlugin = function(){
		if( DrillUp.g_EMoHS_PluginTip_baseList.length == 0 ){ return ""; }
		var message = "【" + DrillUp.g_EMoHS_PluginTip_curName + "】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对：";
		for(var i=0; i < DrillUp.g_EMoHS_PluginTip_baseList.length; i++){
			message += "\n- ";
			message += DrillUp.g_EMoHS_PluginTip_baseList[i];
		}
		return message;
	};
	//==============================
	// * 提示信息 - 报错 - 找不到事件
	//==============================
	DrillUp.drill_EMoHS_getPluginTip_EventNotFind = function( e_id ){
		return "【" + DrillUp.g_EMoHS_PluginTip_curName + "】\n插件指令错误，当前地图并不存在id为"+e_id+"的事件。";
	};
	//==============================
	// * 提示信息 - 报错 - 强制更新提示
	//==============================
	DrillUp.drill_EMoHS_getPluginTip_NeedUpdate_Camera = function(){
		return "【" + DrillUp.g_EMoHS_PluginTip_curName + "】\n活动地图镜头插件版本过低，你需要更新 镜头插件 至少v2.2及以上版本。";
	};
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EventMouseHoverSwitch = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_EventMouseHoverSwitch');
	
	
	/*-----------------杂项------------------*/
    DrillUp.g_EMoHS_remainTrigger = String(DrillUp.parameters['对话框弹出时是否保持触发'] || "true") === "true";



//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfInput &&
	Imported.Drill_CoreOfEventFrameWithMouse ){
	

//=============================================================================
// ** ☆插件指令
//=============================================================================
var _drill_EMoHS_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){ 
	_drill_EMoHS_pluginCommand.call(this, command, args);
	if( command === ">鼠标悬停响应开关" ){
		
		if( args.length == 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "对话框弹出时保持触发" ){
				$gameSystem._drill_EMoHS_remainTrigger = true;
			}
			if( temp1 == "对话框弹出时暂停触发" ){
				$gameSystem._drill_EMoHS_remainTrigger = false;
			}
		}
		
		/*-----------------对象组获取------------------*/
		var c_chars = null;			// 事件对象组
		if( args.length >= 4 ){		//（注意，第3个位置为事件对象）
			var unit = String(args[3]);
			if( c_chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				if( e == undefined ){ return; } //『防止并行删除事件出错』
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_EMoHS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				c_chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_EMoHS_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					c_chars.push( e );
				}
			}
			if( c_chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_EMoHS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
			if( c_chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_EMoHS_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				c_chars = [ e ];
			}
		}
		if( c_chars == null ){ return }; 	
		
		/*-----------------持续触发------------------*/
		if( args.length == 8 ){
			var a_type = String(args[1]);
			var switch_str = String(args[5]);
			var type = String(args[7]);
			if( a_type == "添加触发" ){
				switch_str = switch_str.replace("独立开关[","");
				switch_str = switch_str.replace("]","");
				
				for( var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					if( type == "绑定持续触发-悬停" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停[持续]" );
						ch.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						ch.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						ch.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						ch.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定持续触发-悬停左键按下" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停左键按下[持续]" );
						ch.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						ch.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						ch.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						ch.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定持续触发-悬停右键按下" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停右键按下[持续]" );
						ch.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						ch.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						ch.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						ch.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定持续触发-悬停滚轮按下" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停滚轮按下[持续]" );
						ch.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						ch.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						ch.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						ch.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
				}
			}
		}
		/*-----------------单次触发------------------*/
		if( args.length == 10 ){
			var a_type = String(args[1]);
			var switch_str = String(args[5]);
			var type = String(args[7]);
			var value = String(args[9]);
			if( a_type == "添加触发" ){
				switch_str = switch_str.replace("独立开关[","");
				switch_str = switch_str.replace("]","");
				if( value == "开启" ){ 
					value = true;
				}else{
					value = false;
				}
				
				for( var i = 0; i < c_chars.length; i++ ){
					var ch = c_chars[i];
					
					// > 单次触发 - 悬停
					if( type == "绑定单次触发-悬停[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-离开悬停[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "离开悬停[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 单次触发 - 悬停左键按下
					if( type == "绑定单次触发-悬停左键按下[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停左键按下[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停左键释放[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停左键释放[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停左键双击[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停左键双击[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 单次触发 - 悬停右键按下
					if( type == "绑定单次触发-悬停右键按下[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停右键按下[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停右键释放[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停右键释放[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停右键双击[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停右键双击[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 单次触发 - 悬停滚轮按下
					if( type == "绑定单次触发-悬停滚轮按下[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停滚轮按下[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停滚轮释放[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停滚轮释放[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停滚轮双击[一帧]时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停滚轮双击[一帧]" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停滚轮上滚时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停滚轮上滚" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停滚轮下滚时" ){
						ch.drill_EMoHS_setMouseType( switch_str, "悬停滚轮下滚" );
						ch.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
				}
			}
		}
		/*-----------------去除触发------------------*/
		if( args.length == 6 ){
			var a_type = String(args[1]);
			var switch_str = String(args[5]);
			if( a_type == "去除触发" ){
				switch_str = switch_str.replace("独立开关[","");
				switch_str = switch_str.replace("]","");
				
				if( switch_str == "全部独立开关" ){
					for( var i = 0; i < c_chars.length; i++ ){
						var ch = c_chars[i];
						ch.drill_EMoHS_clearSwitchList();
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
				}else{
					for( var i = 0; i < c_chars.length; i++ ){
						var ch = c_chars[i];
						ch.drill_EMoHS_removeSwitch( switch_str );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
				}
			}
		}
	};
};
//==============================
// * 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_EMoHS_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( DrillUp.drill_EMoHS_getPluginTip_EventNotFind( e_id ) );
		return false;
	}
	return true;
};


//#############################################################################
// ** 【标准模块】存储数据 ☆存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_EMoHS_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EMoHS_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_EMoHS_sys_initialize.call(this);
	this.drill_EMoHS_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_EMoHS_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_EMoHS_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_EMoHS_saveEnabled == true ){	
		$gameSystem.drill_EMoHS_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_EMoHS_initSysData();
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
Game_System.prototype.drill_EMoHS_initSysData = function() {
	this.drill_EMoHS_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_EMoHS_checkSysData = function() {
	this.drill_EMoHS_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_EMoHS_initSysData_Private = function() {
	
	this._drill_EMoHS_remainTrigger = DrillUp.g_EMoHS_remainTrigger;
};
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_EMoHS_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_EMoHS_remainTrigger == undefined ){
		this.drill_EMoHS_initSysData();
	}
};


//=============================================================================
// ** ☆事件注释
//=============================================================================
//==============================
// * 事件注释 - 第一页标记
//==============================
var _drill_EMoHS_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function(){ 
	_drill_EMoHS_initMembers.call(this);
	this._drill_EMoHS_isFirstBirth = true;
};
//==============================
// * 事件注释 - 第一页绑定（Sprite_Character）
//==============================
var _drill_EMoHS_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character){ 		//图像改变，范围就改变
	_drill_EMoHS_setCharacter.call(this,character);
    this.drill_EMoHS_setupTrigger();
};
//==============================
// * 事件注释 - 初始化绑定（Sprite_Character）
//==============================
Sprite_Character.prototype.drill_EMoHS_setupTrigger = function(){ 
	if( this._character && this._character instanceof Game_Event ){
		var ch = this._character;
		
		// > 第一次出生，强制读取第一页注释（防止离开地图后，回来，开关失效）
		if( !ch._erased && ch.event() && ch.event().pages[0] && ch._drill_EMoHS_isFirstBirth == true ){ 
			ch._drill_EMoHS_isFirstBirth = undefined;		//『节约临时参数存储空间』
			ch.drill_EMoHS_readPage( ch.event().pages[0].list );
		}
		
		// > 读取当前页注释
		if( !ch._erased && ch.page() ){ 
			ch.drill_EMoHS_readPage( ch.list() );
		}
	}
};
//==============================
// * 事件注释 - 初始化
//==============================
Game_Event.prototype.drill_EMoHS_readPage = function( page_list ){
	page_list.forEach( function(l){
		if( l.code === 108 ){
			var l_str = l.parameters[0];
			var args = l_str.split(' ');
			var command = args.shift();
			if( command == "=>鼠标悬停响应开关" ){
				
				/*-----------------触发设置------------------*/	
				if( args.length == 4 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					
					// > 持续触发 - 悬停
					if( type == "绑定持续触发-悬停" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停时开启" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "不在悬停区域时关闭" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停[持续]" );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定持续触发-悬停(逆向)" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停时关闭" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "不在悬停区域时开启" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停[持续]" );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 持续触发 - 悬停左键按下
					if( type == "绑定持续触发-悬停左键按下" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停左键按下时开启" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停左键没按时关闭" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键按下[持续]" );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定持续触发-悬停左键按下(逆向)" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停左键按下时关闭" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停左键没按时开启" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键按下[持续]" );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 持续触发 - 悬停右键按下
					if( type == "绑定持续触发-悬停右键按下" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停右键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停右键按下时开启" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停右键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停右键没按时关闭" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停右键按下[持续]" );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定持续触发-悬停右键按下(逆向)" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停右键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停右键按下时关闭" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停右键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停右键没按时开启" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停右键按下[持续]" );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 持续触发 - 悬停滚轮按下
					if( type == "绑定持续触发-悬停滚轮按下" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停滚轮按下时开启" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停滚轮没按时关闭" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮按下[持续]" );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定持续触发-悬停滚轮按下(逆向)" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停滚轮按下时关闭" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停滚轮没按时开启" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮按下[持续]" );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 持续触发 - 悬停左键或右键按下
					if( type == "绑定持续触发-悬停左键或右键按下" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键或右键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停左键或右键按下时开启" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键或右键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, true );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停左键或右键没按时关闭" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键或右键按下[持续]" );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, false );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定持续触发-悬停左键或右键按下(逆向)" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键或右键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, true );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停左键或右键按下时关闭" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键或右键按下[持续]" );
						this.drill_EMoHS_setSwitch_TriggeredOn( switch_str, false );
						this.drill_EMoHS_setSwitch_TriggeredOff( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "悬停左键或右键没按时开启" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键或右键按下[持续]" );
						this.drill_EMoHS_setSwitch_NotTriggeredOff( switch_str, false );
						this.drill_EMoHS_setSwitch_NotTriggeredOn( switch_str, true );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
				}
				if( args.length == 6 ){
					var switch_str = String(args[1]);
					var type = String(args[3]);
					var value = String(args[5]);
					switch_str = switch_str.replace("独立开关[","");
					switch_str = switch_str.replace("]","");
					if( value == "开启" ){ 
						value = true;
					}else{
						value = false;
					}
					
					// > 单次触发 - 悬停
					if( type == "绑定单次触发-悬停[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-离开悬停[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "离开悬停[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 单次触发 - 悬停左键按下
					if( type == "绑定单次触发-悬停左键按下[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键按下[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停左键释放[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键释放[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停左键双击[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键双击[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 单次触发 - 悬停右键按下
					if( type == "绑定单次触发-悬停右键按下[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停右键按下[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停右键释放[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停右键释放[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停右键双击[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停右键双击[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 单次触发 - 悬停滚轮按下
					if( type == "绑定单次触发-悬停滚轮按下[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮按下[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停滚轮释放[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮释放[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停滚轮双击[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮双击[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停滚轮上滚时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮上滚" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停滚轮下滚时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停滚轮下滚" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					
					// > 单次触发 - 悬停左键或右键按下
					if( type == "绑定单次触发-悬停左键或右键按下[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键或右键按下[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停左键或右键释放[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键或右键释放[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
					if( type == "绑定单次触发-悬停左键或右键双击[一帧]时" ){
						this.drill_EMoHS_setMouseType( switch_str, "悬停左键或右键双击[一帧]" );
						this.drill_EMoHS_setSwitch_OnceValue( switch_str, value );
						$gameTemp._drill_EMoHS_needRestatistics = true;
					}
				}
			};
		};
	}, this);
};



//=============================================================================
// ** ☆开关的属性
//
//			说明：	> 此模块专门定义 开关的属性。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关的属性 - 初始化
//==============================
var _drill_EMoHS_switch_initialize = Game_Character.prototype.initialize;
Game_Character.prototype.initialize = function(){
	this._drill_EMoHS_switchData = undefined;		//（要放前面，不然会盖掉子类如 Game_Player.prototype.initMembers 的设置）
	_drill_EMoHS_switch_initialize.call(this);
}
//==============================
// * 开关的属性 - 初始化 数据
//
//			说明：	> 这里的数据都要初始化才能用。『节约事件数据存储空间』
//					> 层面关键字为：switchData，一对一。
//==============================
Game_Character.prototype.drill_EMoHS_checkSwitchData = function(){	
	
	// > 【行走图 - 行走图与鼠标控制核心】执行绑定
	this.drill_COEFWM_checkData();
	
	if( this._drill_EMoHS_switchData != undefined ){ return; }
	this._drill_EMoHS_switchData = {};
	this._drill_EMoHS_switchData['lastIsHover'] = false;		//悬停标记
	this._drill_EMoHS_switchData['switch'] = {};					//独立开关容器
}
//==============================
// * 开关的属性 - 初始化 独立开关容器
//
//			说明：	> 注意，鼠标悬停响应开关能控制多个独立开关。
//					> 层面关键字为：['switch']，一对多。
//==============================
Game_Character.prototype.drill_EMoHS_checkSwitchData_Switch = function( switch_str ){
	this.drill_EMoHS_checkSwitchData()
	if( this._drill_EMoHS_switchData['switch'][switch_str] != undefined ){ return; }
	var switch_data = {};
	
	switch_data['mouseType'] = 0;				//鼠标触发类型（使用数字表示类型，能减轻if判定消耗，见 drill_EMoHS_setMouseType ）
	
	switch_data['triggeredOn'] = false;			//悬停时/按下时开启（持续触发用）
	switch_data['notTriggeredOff'] = false;		//未悬停时/没按下时关闭（持续触发用）
	switch_data['triggeredOff'] = false;		//悬停时/按下时关闭（持续触发用）
	switch_data['notTriggeredOn'] = false;		//未悬停时/没按下时开启（持续触发用）
	
	switch_data['onceValue'] = true;			//开关赋值（单次触发用）
	
	this._drill_EMoHS_switchData['switch'][switch_str] = switch_data;
}
//==============================
// * 开关的属性 - 独立开关容器
//==============================
Game_Character.prototype.drill_EMoHS_hasAnySwitch = function(){
	return this.drill_EMoHS_getSwitchList().length > 0;
}
//==============================
// * 开关的属性 - 独立开关容器 - 获取列表
//==============================
Game_Character.prototype.drill_EMoHS_getSwitchList = function(){
	if( this._drill_EMoHS_switchData == undefined ){ return []; }
	return Object.keys( this._drill_EMoHS_switchData['switch'] );
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除单个
//==============================
Game_Character.prototype.drill_EMoHS_removeSwitch = function( switch_str ){
	this.drill_EMoHS_checkSwitchData()
	this._drill_EMoHS_switchData['switch'][switch_str] = undefined;
	delete this._drill_EMoHS_switchData['switch'][switch_str];
}
//==============================
// * 开关的属性 - 独立开关容器 - 删除全部
//==============================
Game_Character.prototype.drill_EMoHS_clearSwitchList = function(){
	this.drill_EMoHS_checkSwitchData()
	this._drill_EMoHS_switchData['switch'] = {};
}
//==============================
// * 开关的属性 - 触发设置 - 踩住时开启
//==============================
Game_Character.prototype.drill_EMoHS_setSwitch_TriggeredOn = function( switch_str, enabled ){
	this.drill_EMoHS_checkSwitchData();
	this.drill_EMoHS_checkSwitchData_Switch( switch_str );
	this._drill_EMoHS_switchData['switch'][switch_str]['triggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 没踩住时关闭
//==============================
Game_Character.prototype.drill_EMoHS_setSwitch_NotTriggeredOff = function( switch_str, enabled ){
	this.drill_EMoHS_checkSwitchData();
	this.drill_EMoHS_checkSwitchData_Switch( switch_str );
	this._drill_EMoHS_switchData['switch'][switch_str]['notTriggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 踩住时关闭
//==============================
Game_Character.prototype.drill_EMoHS_setSwitch_TriggeredOff = function( switch_str, enabled ){
	this.drill_EMoHS_checkSwitchData();
	this.drill_EMoHS_checkSwitchData_Switch( switch_str );
	this._drill_EMoHS_switchData['switch'][switch_str]['triggeredOff'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 没踩住时开启
//==============================
Game_Character.prototype.drill_EMoHS_setSwitch_NotTriggeredOn = function( switch_str, enabled ){
	this.drill_EMoHS_checkSwitchData();
	this.drill_EMoHS_checkSwitchData_Switch( switch_str );
	this._drill_EMoHS_switchData['switch'][switch_str]['notTriggeredOn'] = enabled;
}
//==============================
// * 开关的属性 - 触发设置 - 开关赋值
//==============================
Game_Character.prototype.drill_EMoHS_setSwitch_OnceValue = function( switch_str, enabled ){
	this.drill_EMoHS_checkSwitchData();
	this.drill_EMoHS_checkSwitchData_Switch( switch_str );
	this._drill_EMoHS_switchData['switch'][switch_str]['onceValue'] = enabled;
}
//==============================
// * 开关的属性 - 设置鼠标触发类型
//==============================
Game_Character.prototype.drill_EMoHS_setMouseType = function( switch_str, type ){
	this.drill_EMoHS_checkSwitchData();
	this.drill_EMoHS_checkSwitchData_Switch( switch_str );
	var result_type = -1;
	
	// > 持续触发
	if( type == "悬停" || type == "悬停[持续]" ){
		result_type = 0;
		
	}else if( type == "悬停左键按下" || type == "悬停左键按下[持续]" ){
		result_type = 1;
		
	}else if( type == "悬停右键按下" || type == "悬停右键按下[持续]" ){
		result_type = 2;
		
	}else if( type == "悬停滚轮按下" || type == "悬停滚轮按下[持续]" || type == "悬停中键按下" || type == "悬停中键按下[持续]" ){
		result_type = 3;
		
	}else if( type == "悬停左键或右键按下" || type == "悬停左键或右键按下[持续]" ){
		result_type = 9;
	
	
	// > 单次触发
	}else if( type == "悬停[一帧]" ){
		result_type = 18;
	}else if( type == "离开悬停[一帧]" ){
		result_type = 19;
		
	}else if( type == "悬停左键按下[一帧]" ){
		result_type = 11;
	}else if( type == "悬停左键释放[一帧]" ){
		result_type = 12;
	}else if( type == "悬停左键双击[一帧]" ){
		result_type = 13;
		
	}else if( type == "悬停右键按下[一帧]" ){
		result_type = 21;
	}else if( type == "悬停右键释放[一帧]" ){
		result_type = 22;
	}else if( type == "悬停右键双击[一帧]" ){
		result_type = 23;
		
	}else if( type == "悬停滚轮按下[一帧]" || type == "悬停中键按下[一帧]" ){
		result_type = 31;
	}else if( type == "悬停滚轮释放[一帧]" || type == "悬停中键按下[一帧]" ){
		result_type = 32;
	}else if( type == "悬停滚轮双击[一帧]" || type == "悬停中键按下[一帧]" ){
		result_type = 33;
	}else if( type == "悬停滚轮上滚" ){
		result_type = 34;
	}else if( type == "悬停滚轮下滚" ){
		result_type = 35;
		
	}else if( type == "悬停左键或右键按下[一帧]" ){
		result_type = 91;
	}else if( type == "悬停左键或右键释放[一帧]" ){
		result_type = 92;
	}else if( type == "悬停左键或右键双击[一帧]" ){
		result_type = 93;
	}
	
	if( result_type == -1 ){ return; }
	this.drill_EMoHS_checkSwitchData();
	this.drill_EMoHS_checkSwitchData_Switch( switch_str );
	
	// > 持续触发 叠加（左键+右键 合并）
	var cur_type = this._drill_EMoHS_switchData['switch'][switch_str]['mouseType'];
	if( cur_type == 1 && result_type == 2 ){ result_type = 9; }
	if( cur_type == 2 && result_type == 1 ){ result_type = 9; }
	
	// > 单次触发 叠加（左键+右键 合并）
	if( cur_type == 11 && result_type == 21 ){ result_type = 91; }
	if( cur_type == 21 && result_type == 11 ){ result_type = 91; }
	if( cur_type == 12 && result_type == 22 ){ result_type = 92; }
	if( cur_type == 22 && result_type == 12 ){ result_type = 92; }
	if( cur_type == 13 && result_type == 23 ){ result_type = 93; }
	if( cur_type == 23 && result_type == 13 ){ result_type = 93; }
	
	this._drill_EMoHS_switchData['switch'][switch_str]['mouseType'] = result_type;
}


//=============================================================================
// ** ☆鼠标悬停响应开关容器
//
//			说明：	> 此模块专门定义 鼠标悬停响应开关 的容器。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 容器 - 初始化容器
//==============================
Game_Temp.prototype.drill_EMoHS_clearTemp = function(){
	this._drill_EMoHS_switchTank = [];
}
//==============================
// * 容器 - 初始化
//==============================
var _drill_EMoHS_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(){	
	_drill_EMoHS_temp_initialize.call(this);
	this.drill_EMoHS_clearTemp();
	this._drill_EMoHS_needRestatistics = true;
}
//==============================
// * 容器 - 切换地图时
//==============================
var _drill_EMoHS_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp.drill_EMoHS_clearTemp();
	$gameTemp._drill_EMoHS_needRestatistics = true;
	_drill_EMoHS_gmap_setup.call(this,mapId);
}
//==============================
// * 容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_EMoHS_smap_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function(){
	$gameTemp.drill_EMoHS_clearTemp();
	$gameTemp._drill_EMoHS_needRestatistics = true;
	_drill_EMoHS_smap_createCharacters.call(this);
}
//==============================
// * 容器 - 帧刷新
//==============================
var _drill_EMoHS_map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EMoHS_map_update.call( this, sceneActive );
	this.drill_EMoHS_updateRestatistics();		//帧刷新 - 刷新统计
};
//==============================
// * 容器 - 帧刷新 - 刷新统计
//==============================
Game_Map.prototype.drill_EMoHS_updateRestatistics = function(){
	if( $gameTemp._drill_EMoHS_needRestatistics != true ){ return }
	$gameTemp._drill_EMoHS_needRestatistics = false;
	
	$gameTemp._drill_EMoHS_switchTank = [];
	var event_list = this._events;
	for(var i = 0; i < event_list.length; i++ ){
		var temp_event = event_list[i];
		if( temp_event == null ){ continue; }
		if( temp_event._erased == true ){ continue; }	//『有效事件』
		
		if( temp_event.drill_EMoHS_hasAnySwitch() ){
			$gameTemp._drill_EMoHS_switchTank.push(temp_event);
		}
	}
}
//==============================
// * 容器 - 事件清除时
//==============================
var _drill_EMoHS_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
	_drill_EMoHS_erase.call(this);
	if( this.drill_EMoHS_hasAnySwitch() ){
		$gameTemp._drill_EMoHS_needRestatistics = true;
	}
};



//=============================================================================
// ** ☆开关控制
//
//			说明：	> 此模块管理 鼠标悬停响应开关 的操作控制。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 开关控制 - 帧刷新
//==============================
var _drill_EMoHS_map_update2 = Game_Map.prototype.update;
Game_Map.prototype.update = function( sceneActive ){
	_drill_EMoHS_map_update2.call( this, sceneActive );
	if( this.drill_EMoHS_isOptimizationPassed() == false ){ return; }
	this.drill_EMoHS_updateSwitch();
}
//==============================
// * 开关控制 - 帧刷新 - 优化策略
//==============================
Game_Map.prototype.drill_EMoHS_isOptimizationPassed = function(){
	
	// > 地图中所有容器都为空时，不工作
	if( $gameTemp._drill_EMoHS_switchTank.length == 0 ){
		return false;
	}
	return true;
}
//==============================
// * 开关控制 - 帧刷新
//==============================
Game_Map.prototype.drill_EMoHS_updateSwitch = function(){
	
	// > 对话框弹出时是否仍然可触发
	if( ($gameMessage.isBusy() || SceneManager._scene.isBusy()) &&
		$gameSystem._drill_EMoHS_remainTrigger == false ){
		return;
	}
	
	// > 鼠标悬停响应开关
	for( var i = 0; i < $gameTemp._drill_EMoHS_switchTank.length; i++ ){
		var temp_switchEv = $gameTemp._drill_EMoHS_switchTank[i];
		
		// > 数据 - switchData层面（与事件一对一）
		var switch_list = temp_switchEv.drill_EMoHS_getSwitchList();
		if( switch_list.length == 0 ){ continue; }
		
		// > 【行走图 - 行走图与鼠标控制核心】鼠标是否正在悬停+一体化情况（提前判定，不要放入子循环里面）
		var is_onHover = temp_switchEv.drill_COEFWM_isOnHoverWithUnification();
		var last_isHover = temp_switchEv._drill_EMoHS_switchData['lastIsHover'];
		
		// > 数据 - ['switch']层面（与事件一对多）
		for(var j = 0; j < switch_list.length; j++ ){
			var cur_switch = switch_list[j];
			var cur_mouseType = temp_switchEv._drill_EMoHS_switchData['switch'][cur_switch]['mouseType'];
			if( cur_mouseType < 10 ){
			
				// > 触发（持续）
				var isTriggered = false;
				if( is_onHover == true ){
					if( cur_mouseType == 0 ){
						isTriggered = true;		//悬停
					}
					if( cur_mouseType == 1 && TouchInput.drill_isLeftPressed() ){
						isTriggered = true;		//悬停左键按下[持续]
					}
					if( cur_mouseType == 2 && TouchInput.drill_isRightPressed() ){
						isTriggered = true;		//悬停右键按下[持续]
					}
					if( cur_mouseType == 3 && TouchInput.drill_isMiddlePressed() ){
						isTriggered = true;		//悬停滚轮按下[持续]
					}
					if( cur_mouseType == 9 && 
						(TouchInput.drill_isLeftPressed() || TouchInput.drill_isRightPressed()) ){
						isTriggered = true;		//悬停左键或右键按下[持续]
					}
				}
				
				// > 触发（持续） - 悬停时/按下时
				if( isTriggered ){
					
					if( temp_switchEv._drill_EMoHS_switchData['switch'][cur_switch]['triggeredOn'] == true ){
						this.drill_EMoHS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							true
						);
					}
					if( temp_switchEv._drill_EMoHS_switchData['switch'][cur_switch]['triggeredOff'] == true ){
						this.drill_EMoHS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							false
						);
					}
					
				// > 触发（持续） - 未悬停时/没按下时
				}else{
					
					if( temp_switchEv._drill_EMoHS_switchData['switch'][cur_switch]['notTriggeredOff'] == true ){
						this.drill_EMoHS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							false
						);
					}
					if( temp_switchEv._drill_EMoHS_switchData['switch'][cur_switch]['notTriggeredOn'] == true ){
						this.drill_EMoHS_setValue( 
							temp_switchEv._eventId, 
							cur_switch, 
							true
						);
					}
				}
			
			}else{
				
				// > 触发（单次）
				var canSetValue = false;
				if( is_onHover == true ){
					
					if( cur_mouseType == 11 && TouchInput.drill_isLeftTriggerd() ){
						canSetValue = true;		//悬停左键按下[一帧]
					}
					if( cur_mouseType == 12 && TouchInput.drill_isLeftReleased() ){
						canSetValue = true;		//悬停左键释放[一帧]
					}
					if( cur_mouseType == 13 && TouchInput.drill_isLeftDoubled() ){
						canSetValue = true;		//悬停左键双击[一帧]
					}
					
					if( cur_mouseType == 21 && TouchInput.drill_isRightTriggerd() ){
						canSetValue = true;		//悬停右键按下[一帧]
					}
					if( cur_mouseType == 22 && TouchInput.drill_isRightReleased() ){
						canSetValue = true;		//悬停右键释放[一帧]
					}
					if( cur_mouseType == 23 && TouchInput.drill_isRightDoubled() ){
						canSetValue = true;		//悬停右键双击[一帧]
					}
					
					if( cur_mouseType == 31 && TouchInput.drill_isMiddleTriggerd() ){
						canSetValue = true;		//悬停滚轮按下[一帧]
					}
					if( cur_mouseType == 32 && TouchInput.drill_isMiddleReleased() ){
						canSetValue = true;		//悬停滚轮释放[一帧]
					}
					if( cur_mouseType == 33 && TouchInput.drill_isMiddleDoubled() ){
						canSetValue = true;		//悬停滚轮双击[一帧]
					}
					if( cur_mouseType == 34 && TouchInput.drill_isWheelUp() ){
						canSetValue = true;		//悬停滚轮上滚
					}
					if( cur_mouseType == 35 && TouchInput.drill_isWheelDown() ){
						canSetValue = true;		//悬停滚轮下滚
					}
					
					if( cur_mouseType == 91 && 
						(TouchInput.drill_isLeftTriggerd() || TouchInput.drill_isRightTriggerd()) ){
						canSetValue = true;		//悬停左键或右键按下[一帧]
					}
					if( cur_mouseType == 92 && 
						(TouchInput.drill_isLeftReleased() || TouchInput.drill_isRightReleased()) ){
						canSetValue = true;		//悬停左键或右键释放[一帧]
					}
					if( cur_mouseType == 93 && 
						(TouchInput.drill_isLeftDoubled() || TouchInput.drill_isRightDoubled()) ){
						canSetValue = true;		//悬停左键或右键双击[一帧]
					}
				}
				
				// > 触发（单次） - 悬停[一帧]
				if( cur_mouseType == 18 && is_onHover == true && last_isHover == false ){
					canSetValue = true;
				}
				// > 触发（单次） - 不在悬停区域时[一帧]
				if( cur_mouseType == 19 && is_onHover == false && last_isHover == true ){
					canSetValue = true;
				}
				
				// > 触发（单次） - 赋值一次
				if( canSetValue ){
					var cur_value = temp_switchEv._drill_EMoHS_switchData['switch'][cur_switch]['onceValue'];
					this.drill_EMoHS_setValue(
						temp_switchEv._eventId, 
						cur_switch, 
						cur_value
					);
				}
			}
		}
		
		// > 数据 - switchData层面（记录 悬停标记）
		temp_switchEv._drill_EMoHS_switchData['lastIsHover'] = is_onHover;
	}
};
//==============================
// * 开关控制 - 执行切换开关
//==============================
Game_Map.prototype.drill_EMoHS_setValue = function( event_id, switch_str, enabled ){
	var s_key = [ this._mapId, event_id, switch_str ];
	if( $gameSelfSwitches.value(s_key) === enabled ){ return; }
	$gameSelfSwitches.setValue( s_key, enabled );
};



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_EventMouseHoverSwitch = false;
		var pluginTip = DrillUp.drill_EMoHS_getPluginTip_NoBasePlugin();
		alert( pluginTip );
}


