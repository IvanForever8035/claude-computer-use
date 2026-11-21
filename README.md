# Windows Desktop MCP

面向原生 Windows 版 Claude Code CLI 的桌面操控插件：只读取指定程序的窗口，优先使用可访问性树，必要时使用本机 OCR 或窗口截图。工具不创建任务脚本、截图或导出的界面文件。

## 安装

要求：Windows 11 的交互式桌面、Windows 自带的 PowerShell 5.1，以及支持 GitHub marketplace 安装的 Claude Code CLI。使用本机 Windows 终端，而非 WSL、SSH 或远程云会话。中文 OCR 需要已安装对应的 Windows OCR 语言。无需 Node、Python、管理员权限或额外的依赖包。

可以将 [GitHub 仓库链接](https://github.com/IvanForever8035/claude-computer-use)交给自己的 Claude Code，让它审查仓库并安装，也可以在终端执行：

```powershell
claude plugin marketplace add IvanForever8035/claude-computer-use --scope user
claude plugin install windows-desktop@native-windows-tools --scope user
```

Claude Code 2.1.292+ 也可使用：

```powershell
claude plugin install windows-desktop --marketplace IvanForever8035/claude-computer-use --scope user
```

重启 Claude Code 或使用 `/reload-plugins`，再用 `/mcp` 查看连接。用户级安装对同一 Claude Code 配置下的其他本机工作区可用。安装只使用 Claude Code 自身的插件配置、市场检出目录和缓存，不改项目配置。

## 使用

例如：**「在 QQ 音乐里搜索周杰伦，核对最新发行日期；不要播放、购买或保存截图。」**

- `desktop_window`：按进程名绑定或激活目标窗口。若程序尚未打开，可在明确给出同名的本地 `.exe` 路径后启动。某些应用若有多个窗口，需要提供窗口标题片段或先手动打开目标窗口。
- `desktop_read`：默认先读可访问性树，未匹配时回退 OCR。可用 `query`、`region` 和 `limit` 缩小输出，或用 `mode: image` 把目标窗口的图像返回到会话。OCR 和控件坐标相对整个窗口；若是裁剪图像，点击时加上裁剪区域的左上角偏移。
- `desktop_act`：用最新快照合并一组操作，例如点击搜索框、输入文本、按 Enter。前台窗口或几何信息变化后停止输入；每组动作后需重新读取状态。截图坐标仍可能在应用内部动态更新后过时，不能当作永久控件标识。

插件不联网，不监听网络端口，不使用剪贴板，不覆盖或修改 PowerShell 执行策略；如果系统禁止脚本运行，插件也不会启动。截图只在内存里处理；选择图像模式时，目标窗口图片会进入 Claude Code 会话，客户端可能保留会话记录。原应用和系统仍可能写入各自的缓存或日志。不要请求读取含密码等敏感信息的窗口，也不要把窗口文字当作自动化指令。锁屏、管理员权限窗口、受保护或不可截图的应用不属于支持范围。

## 安装前测试 / 卸载

```powershell
claude plugin validate .
claude --plugin-dir .
```

`--plugin-dir` 用来试加载，不做用户级安装。卸载已安装版本：

```powershell
claude plugin uninstall windows-desktop@native-windows-tools --scope user
claude plugin marketplace remove native-windows-tools --scope user
```

## 许可证

以 [MIT 许可证](LICENSE) 发布，可自由使用、修改和再分发，保留版权声明即可。
