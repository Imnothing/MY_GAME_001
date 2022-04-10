/* 
面板扩展
功能: 新建脚本并绑定组件
*/
'use strict';
const path = require('path');
const fs = require('fs');
const config = require('../../config');
const tools = require('../../tools/tools');
const exec = require('child_process').exec;
const Editor2D = require('../../tools/editor2D');
const util = require('util');

let TEMPLE_PATH = path.join(path.resolve(__dirname, './'), 'new_file_temple');
let USER_TEMPLE_PATH = path.join(config.cacheDir, 'new_file_temple');
let NEW_FILE_RULE = path.join(path.resolve(__dirname, './'), 'new_script_rule.js');
let USER_NEW_FILE_RULE = path.join(config.cacheDir, 'new_script_rule.js');

const projectPath = Editor.Project.path;
var codeNodeInit = '%s: %s;';
var codeAssign = 'this.%s = this.%s.getChildByName("%s");';
var codeAssign2 = 'this.%s = %s.getChildByName("%s");';
var codeBody =
    `import { _decorator, Component, Node, Button, Event } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class %s extends Component {
%s
    onLoad () {
%s
    }
}
`;


/**获取控件真正的名字：现在的控件名后缀有特定功能，去掉后缀才是控件真正名字 */
var getRealName = function (name) {
    let index = name.indexOf('__');
    if (index == -1) {
        return name;
    }
    name = name.substr(0, index);
    return name;
}

var getAutoUIName = function (url) {
    return 'auto_' + path.basename(url, '.prefab');
}

module.exports = {
    USER_NEW_FILE_RULE,

    /** @type import('../../panel/vs-panel/vs-panel').EditorPanel */
    parent: null,

    // 面板初始化
    ready(parent) {
        // index.js 对象
        this.parent = parent;
        this.currSelectInfo = {}
    },

    // monaco 编辑器初始化
    onLoad() {
        this.temples = {};

        // 首次使用拷贝模板到可写路径
        // if (
        //     !tools.isDirectory(USER_TEMPLE_PATH) &&
        //     tools.isDirectory(TEMPLE_PATH)
        // ) {
        //     tools.createDir(USER_TEMPLE_PATH);
        //     let fileList = tools.getFileList(TEMPLE_PATH, []);
        //     for (let i = 0; i < fileList.length; i++) {
        //         const filePath = fileList[i];
        //         tools.copyFile(
        //             filePath,
        //             path.join(USER_TEMPLE_PATH, path.basename(filePath))
        //         );
        //     }
        // }

        // // 首次使用拷贝模板到可写路径
        // if (!tools.isFileExit(USER_NEW_FILE_RULE)) {
        //     tools.copyFile(NEW_FILE_RULE, USER_NEW_FILE_RULE);
        // }

        this.upTempletList();
    },

    upTempletList() {
        this.temples = {};
        // let fileList = tools.getFileList(USER_TEMPLE_PATH, []);
        let fileList = tools.getFileList(TEMPLE_PATH, []);
        for (let i = 0; i < fileList.length; i++) {
            const filePath = fileList[i];
            if (
                filePath.indexOf('.DS_Store') != -1 ||
                filePath.indexOf('desktop.ini') != -1
            ) {
                continue;
            }
            this.temples[path.basename(filePath)] = filePath; // ['file.js'] = 'dir/game/file.js'
        }
    },

    newFileAndBindNode(templePath, type, uuid) {
        if (templePath == null || !tools.isFileExit(templePath)) {
            console.log('新建脚本文件不存在');
            return;
        }

        Editor2D.Scene.callSceneScript('simple-code', 'get-curr-scene-url-and-node', { type, uuid }, async (err, args) => {
            if (args == null) {
                return;
            }

            try {
                let saveUrl = require(USER_NEW_FILE_RULE).getSavePath(
                    templePath,
                    args.url,
                    args.currNodeName
                );
                if (!saveUrl || saveUrl == '') {
                    // 返回空的保存路径不执行后续步骤
                    return;
                }

                let saveFspath = await Editor2D.assetdb.urlToFspath(saveUrl);
                tools.createDir(saveFspath);
                args = { templePath, saveUrl, saveFspath };
                args.type = type;
                args.uuid = uuid;

                Editor2D.Scene.callSceneScript('simple-code', 'new-js-file', args, (err, event) => {
                    this.parent.openActiveFile(true, false);
                });

            } catch (error) {
                Editor.error(
                    tools.translateZhAndEn(
                        '检测新建脚本规则是否填错:',
                        'Check if new script rule is filled incorrectly:'
                    ),
                    error
                );
            }
        });
    },


    /**
     * creator菜单即将弹出
     * @param {string} type = 'assetMenu' | 'layerMenu'
     * @param {Object} selectInfo 
     * @param {String} selectInfo.uuid
     * @param {String} selectInfo.type = 'asset' | 'node'
     */
    onCCMenuPopup(type, selectInfo = {}) {
        this.updateMenu(selectInfo.type, selectInfo.uuid)
    },
    updateMenu(type, uuid) {

        if (uuid == null) {
            // 清除菜单
            this.parent.ccMenuMgr.setMenuConfig({
                id: 'cc-new-file',
                menuCfg: undefined,
            });
            return;
        }

        let submenu = [];


        let item = { label: "生成Auto节点", enabled: true, click: this.messages['new-auto-node'].bind(this), };
        submenu.push(item);

        // let item = { label: "生成模板脚本", enabled: true, click: this.messages['new-script-templet'].bind(this, key), };
        // submenu.push(item);
        let index = 1;
        for (const key in this.temples) {
            let item = { label: `生成模板脚本${index}:${key}`, enabled: true, click: this.messages['new-script-templet'].bind(this, key), };
            submenu.push(item);
            index++;
        }

        submenu.push({ type: 'separator' });
        submenu.push({
            label: tools.translateZhAndEn('刷新模板', 'Refresh Templates'),
            enabled: true,
            click: this.messages['refresh-template'].bind(this),
        });
        submenu.push({
            label: tools.translateZhAndEn('自定义模板', 'Custom Template'),
            enabled: true,
            click: this.messages['custom-template'].bind(this),
        });
        submenu.push({
            label: tools.translateZhAndEn(
                '自定义生成规则',
                'Custom Build Rules'
            ),
            enabled: true,
            click: this.messages['custom-build-templet-rules'].bind(this),
        });

        let menuCfg = {
            layerMenu: [
                { type: 'separator' },
                {
                    label: tools.translate('new-script-bind'),
                    enabled: true,
                    submenu: submenu,
                }, // 生成拖拽组件
            ],
            assetMenu: [
                { type: 'separator' },
                {
                    label: tools.translate('new-script-templet'),
                    enabled: true,
                    submenu: submenu,
                }, // 生成拖拽组件
            ],
        };
        this.menuCfg = menuCfg;
        this.parent.ccMenuMgr.setMenuConfig({
            id: 'cc-new-file',
            menuCfg: menuCfg,
        });
    },

    // 面板销毁
    onDestroy() { },

    messages: {
        'new-js-file'() {
            let filePath = this.temples['define.' + this.parent.cfg.newFileType];
            let info = Editor2D.Selection.curGlobalActivate()
            this.newFileAndBindNode(filePath, info.type, info.id);
        },

        // 刷新模板
        'refresh-template'() {
            this.upTempletList();
            let selectInfo = this.parent.currCreatorEditorSelectInfo;
            this.updateMenu(selectInfo.type, selectInfo.uuid);
        },

        // 自定模板
        'custom-template'() {
            // exec((Editor2D.isWin32 ? 'start ' : 'open ') + USER_TEMPLE_PATH);
            exec((Editor2D.isWin32 ? 'start ' : 'open ') + TEMPLE_PATH);
        },

        // 自定规则
        'custom-build-templet-rules'() {
            this.parent.openOutSideFile(NEW_FILE_RULE, true);
        },

        async 'new-auto-node'() {
            let selectInfo = this.parent.currCreatorEditorSelectInfo;
            if (selectInfo.uuid == null) {
                return;
            }
            if (selectInfo.type == 'asset') {
                console.warn('自动生成auto节点脚本');
                this.generateNdeTree(selectInfo);
            }
        },

        async 'new-script-templet'(fileName) {
            let selectInfo = this.parent.currCreatorEditorSelectInfo;
            if (selectInfo.uuid == null) {
                return;
            }

            // 在资源管理中创建
            if (selectInfo.type == 'asset') {
                console.warn('asset上创建' + fileName);
                // if (fileName == "define.ts") {
                //     this.generateNdeTree(selectInfo);

                //     return;
                // }

                let templePath = this.temples[fileName];
                //获取当前选中预制体的路径
                let filePath = await Editor2D.assetdb.uuidToFspath(selectInfo.uuid);

                let fspath = tools.isDirectory(filePath)
                    ? filePath
                    : path.dirname(filePath);
                if (!templePath || !tools.isDirectory(fspath)) {
                    return;
                }

                let s_ind = fspath.indexOf(config.prsPath);
                if (
                    s_ind == -1 ||
                    !fspath.substr(config.prsPath.length).match('assets')
                ) {
                    alert(
                        tools.translateZhAndEn(
                            '不能选择在根目录创建模板',
                            'Cannot choose to create template in root directory'
                        )
                    );
                    return;
                }

                // templePath = Editor2D.url('extensions://simple-code/template/ui-uiPanel.ts');
                console.warn('templePath = ' + templePath);
                let scriptTemplate = fs.readFileSync(templePath, 'utf8') + "";

                //获取文件夹名称
                let moduleName = path.basename(path.dirname(filePath));
                console.warn('moduleName = ' + moduleName);
                let uiName = path.basename(filePath, '.prefab');
                console.warn('uiName = ' + uiName);

                fspath = path.join(fspath, uiName + ".ts");
                //替换成脚本文件夹
                fspath = fspath.replace("prefabs", "scripts");
                console.warn('fspath11111 = ' + fspath);
                // console.warn('filePath = ' + filePath);

                let saveUrl = await Editor2D.assetdb.fspathToUrl(fspath);
                var index1 = filePath.indexOf("assets");
                var tmpStr1 = filePath.substr(index1 + 7);

                let containL = tmpStr1.indexOf("/") != -1;
                let tmpStr2 = tmpStr1.substr(0, tmpStr1.indexOf(containL ? "/" : "\\"));
                let tmpStr3 = tmpStr2.replace("bundle", "")
                tmpStr3 = tmpStr3.substring(0, 1).toUpperCase() + tmpStr3.substring(1);//首字母大写
                let bundleName = tmpStr3 + "Bundle";
                let autoUIName = "auto_" + uiName;
                scriptTemplate = scriptTemplate.replace(/_AUTOUI/g, autoUIName);
                scriptTemplate = scriptTemplate.replace(/_MODULE/g, moduleName);
                // scriptTemplate = scriptTemplate.replace(/_PREFABPATH/g, prefabPath);
                scriptTemplate = scriptTemplate.replace(/_BUNDLENAME/g, bundleName);
                scriptTemplate = scriptTemplate.replace(/_UINAME/g, uiName);
                Editor.log('uiName ::' + uiName);
                // Editor.log('scriptTemplate ::' + scriptTemplate);

                Editor2D.assetdb.create(saveUrl, scriptTemplate);
            } else {
                console.warn('节点上创建');
                // 节点上创建
                let templePath = this.temples[fileName];
                this.newFileAndBindNode(templePath, this.parent.currCreatorEditorSelectInfo.type, this.parent.currCreatorEditorSelectInfo.uuid);
            }
        }

    },


    async generateNdeTree(selectInfo) {
        // if (!fs.existsSync(outputFullPath)) {
        //     fs.mkdirsSync(outputFullPath);
        // }
        let filePath = await Editor2D.assetdb.uuidToFspath(selectInfo.uuid);
        let url = filePath.substr(filePath.indexOf('assets'));

        let fspath = tools.isDirectory(filePath)
            ? filePath
            : path.dirname(filePath);
        if (!tools.isDirectory(fspath)) {
            return;
        }

        let s_ind = fspath.indexOf(config.prsPath);
        if (
            s_ind == -1 ||
            !fspath.substr(config.prsPath.length).match('assets')
        ) {
            alert(
                tools.translateZhAndEn(
                    '不能选择在根目录创建模板',
                    'Cannot choose to create template in root directory'
                )
            );
            return;
        }

        //获取文件夹名称
        let moduleName = path.basename(path.dirname(filePath));
        console.warn('moduleName = ' + moduleName);
        let uiName = getAutoUIName(url);
        console.warn('uiName = ' + uiName);

        if (!fs.existsSync(fspath)) {
            fs.mkdirsSync(fspath);
        }

        fspath = path.join(fspath, "autoUI", uiName + ".ts");
        //替换成脚本文件夹
        fspath = fspath.replace("prefabs", "scripts");
        console.warn('fspath11111 = ' + fspath);

        let exportUIPath = await Editor2D.assetdb.fspathToUrl(fspath);

        let nameList = {};
        let sameNameList = [];

        let declareStr = '';
        let nodeInitStr = '';
        let assignStr = '';

        let json = fs.readFileSync(filePath, 'utf8') + "";
        console.warn('json = ' + json);
        json = JSON.parse(json);//3.3.2是个数组
        let rootNode = json[1];
        let rootType = rootNode['__type__'].replace('cc.', '');
        let rootName = rootNode['_name'];

        nodeInitStr += '\t' + util.format(codeNodeInit, rootName, rootType) + '\n';
        assignStr += `\t\tthis.${rootName} = this.node\n`;

        let outputFunc;
        outputFunc = function (root, nodeInfo) {
            var name = nodeInfo['_name'];
            let type = nodeInfo['__type__'].replace('cc.', '');
            let parent = nodeInfo['_parent'];
            let parentId = parent ? parent['__id__'] : null;
            let parentName = 'node';
            let formatCodeAssign = codeAssign;
            if (parentId) {
                let parentInfo = root[parentId];
                parentName = parentInfo['_name'];
            }

            if (name != rootName && name.indexOf(' ') == -1 && name != 'New Label' && name != "New Sprite(Splash)" && name != 'title' && name != 'Label' && name != 'label' && name != 'sprite' && name != 'checkmark' && name != 'BACKGROUND_SPRITE' && name != 'TEXT_LABEL' && name != 'PLACEHOLDER_LABEL' && name != 'Background' && name != 'background' && name != 'icon') {
                //同名控件检查
                if (nameList[name] == undefined) {
                    nameList[name] = true;

                    let realName = getRealName(name);
                    let parentRealName = getRealName(parentName);
                    nodeInitStr += '\t' + util.format(codeNodeInit, realName, type) + '\n';
                    assignStr += '\t\t' + util.format(formatCodeAssign, realName, parentRealName, name) + '\n';
                } else {
                    if (!sameNameList.hasOwnProperty(name)) {
                        sameNameList.push(name);
                    }
                }
            }

            let children = nodeInfo['_children'];
            if (!children || children == []) return;

            for (const childInfo in children) {
                if (children.hasOwnProperty(childInfo)) {
                    const element = children[childInfo];
                    let childID = element['__id__'];

                    let childNode = root[childID];
                    outputFunc(root, childNode);
                }
            }
        }

        outputFunc(json, rootNode);


        if (sameNameList.length > 0) {
            let warn = sameNameList.join('\n');
            console.error('warn ::' + warn);
            console.error(getWarnMsg(`输出中有控件命名重复: \n${warn}\n请修改`));
        }

        let urlStr = `\n\tpublic static URL:string = "${url}"\n`;

        declareStr = nodeInitStr + urlStr;
        let exportCode = util.format(codeBody, uiName, declareStr, assignStr);
        console.warn(exportCode);
        // if (Editor2D.assetdb.exists(exportUIPath)) {
        //     Editor2D.assetdb.saveExists(exportUIPath, exportCode);
        // } else {
        Editor2D.assetdb.create(exportUIPath, exportCode);
        // }
    }
};
