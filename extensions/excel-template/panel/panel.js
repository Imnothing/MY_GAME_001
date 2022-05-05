'use strict';
const fs = require('fs');
const path = require('path');
let jsonBeautifully = require('json-beautifully');
var xlsx = require("node-xlsx");
const util = require('util');
const Editor2D = require('./editor2D');
var excelUtil = require("./excelUtil");
// html text
exports.template = fs.readFileSync(path.join(__dirname, 'panel.html'), 'utf8');
// style text
// exports.style = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
//读取配置
let cfgFile = `excel-template-configuration.json`;
let cfgPath = path.join(Editor.Project.path, 'settings', cfgFile);
let excelArray = [];
let b = fs.existsSync(cfgPath);
let configs = {};
if (b) {
  let json = fs.readFileSync(cfgPath, 'utf8').toString();
  if (json) {
    configs = JSON.parse(json);
    if (configs.fileDirectoryPath) {
      try{
        fs.statSync(configs.fileDirectoryPath);
        //如果可以执行到这里那么就表示存在了
      }catch(e){
          //捕获异常
          configs.fileDirectoryPath = '';
      }
      excelArray = excelUtil.getAllSheet(configs.fileDirectoryPath);
    }
  }
}


// html selector after rendering
exports.$ = {
  app: '#app'
};
// method on the panel
exports.methods = {};
// event triggered on the panel
exports.listeners = {};

// Triggered when the panel is rendered successfully
exports.ready = async function () {

  let Vue = require('./vue');
  new Vue({
    el: this.$.app, // 注意这里，没有不能使用#app，原因是ShadowDOM
    created() {
    },
    data() {
      return {
        filePath: '',//excel文件
        fileOutPut: configs.fileOutPut,//json保存目录
        fileDirectoryPath: configs.fileDirectoryPath,//excel目录
        jsonAllFileName: configs.jsonAllFileName || "GameJsonCfg",// json配置文件名
        isMergeJson: configs.isMergeJson,//是否合并json
        isFormatJson: configs.isFormatJson,// 是否格式化Json
        codeSavePath: configs.codeSavePath,//代码脚本存放位置
        logView: "",
        excelFileArr: [],
      }
    },
    mounted() {
      this.mounted();
    },
    methods: {
      onChangeFilePath(event) {
        console.log(event);
        this.filePath = event.target.value;
      },
      onChangeFileOutPut(event) {
        this.fileOutPut = event.target.value;
      },
      onBtnClick() {

        console.log('filePath:' + this.filePath);
        console.log('fileOutPut:' + this.fileOutPut);

        var list = xlsx.parse(this.filePath);
        console.log(list[0].name);
        let tableData = excelUtil.praseExcel(list);
        if (tableData) {
          var savePath = path.join(this.fileOutPut, list[0].name + ".json");
          excelUtil.writeFile(savePath, JSON.stringify(tableData));
          console.log(tableData);
          console.log(list[0].name + "  导出成功");
        } else {
          console.log(list[0].name + "  导出失败");
        }
      },

      onChangeFileDirectoryPath(event) {
        this.fileDirectoryPath = event.target.value;
        console.log(this.fileDirectoryPath);
        excelArray = excelUtil.getAllSheet(this.fileDirectoryPath);
        this.mounted();
      },
      onChangeCodePath(event) {
        this.codeSavePath = event.target.value;
        console.log(this.codeSavePath);
      },
      // 处理数组和字典数据：使用node-xlsx parse后数组/字典都是字符串，"[]","{}"，去除掉双引号即可
      _dealArrayAndMap(data) {
        let s = JSON.stringify(data);
        s = s.replace(/\:\"\[/g, ":[");
        s = s.replace(/\]\"/g, "]");
        s = s.replace(/\:\"\{/g, ":{");
        s = s.replace(/\}\"/g, "}");
        return s;
      },
      // 保存为json配置
      _onSaveJsonCfgFile(savePath, data) {
        let str = this._dealArrayAndMap(data);
        if (this.isFormatJson) {
          str = jsonBeautifully(str);
        }
        excelUtil.writeFile(savePath, str);
      },
      onBtnAllExcelClick() {
        if (excelArray.length == 0) {
          excelArray = excelUtil.getAllSheet(this.fileDirectoryPath);
        }
        if (excelArray.length == 0) {
          console.log("目录中没有可用的excel文件");
          return;
        }

        var tableMergeJson = {};
        for (var i = 0; i < excelArray.length; i++) {
          let item = excelArray[i];
          if (!item.checkbox) continue;
          var list = xlsx.parse(item.fullPath);
          console.log("正在导出"+item.sheet );
          let tableData = excelUtil.praseExcel(list);
          if (tableData) {
            if (this.isMergeJson) {
              tableMergeJson[item.sheet] = tableData;
            } else {
              var savePath = path.join(this.fileOutPut, item.sheet + ".json");
              this._onSaveJsonCfgFile(savePath, tableData);
            }
          } else {
            console.log(item.sheet + "  导出失败");
          }
        }
        if (this.isMergeJson) {
          var savePath = path.join(this.fileOutPut, this.jsonAllFileName + ".json");
          this._onSaveJsonCfgFile(savePath, tableMergeJson);
        }
        console.log("全部导出完毕");
        this._saveConfig();
      },
      onJsonAllCfgFileChanged(event) {
        // console.log(event.target.value)
        this.jsonAllFileName = event.target.value;
      },
      onBtnClickMergeJson(event) {
        console.log("勾选合并" + event.target.value)
        this.isMergeJson = event.target.value;
      },
      onBtnClickFormatJson(event) {
        console.log("勾选json格式化" + event.target.value)
        this.isFormatJson = event.target.value;
      },
      onBtnClickOpenJsonSavePath(event) {
        console.log("打开json存放位置" + event.target.value)

      },

      //全选
      onBtnClickSelectSheet(event) {
        excelArray.forEach(element => {
          element.checkbox = event.target.value;
        });
        this.$refs.example.render(true);
      },

      //查找所有excel sheet
      onSearchAllExcelFile() {
        excelArray = excelUtil.getAllSheet(this.fileDirectoryPath);
        this.mounted();
      },

      mounted() {
        // @ts-ignore
        const vm = this;
        var test = [];
        if(!excelArray) return;
        for (let i = 0; i < excelArray.length; i++) {
          // test.push(JSON.parse(JSON.stringify(t)));
          var t = { detail: excelArray[i] };
          test.push(t)
        }

        vm.$refs.example.setTemplate('left', '<ui-checkbox></ui-checkbox>');
        vm.$refs.example.setTemplateInit('left', ($left) => {
          $left.$checkbox = $left.querySelector('ui-checkbox');
          $left.$checkbox.addEventListener('confirm', (event) => {
            $left.data.detail.checkbox = !$left.data.detail.checkbox;
            vm.$refs.example.render(true);
            console.log($left.data.detail);
          });
        });
        vm.$refs.example.setRender('left', ($left, data) => {
          // $left.$parent.showArrow = false;
          $left.$checkbox.value = data.detail.checkbox;
        });

        vm.$refs.example.setTemplate('text', `<span class="name"></span>`);
        vm.$refs.example.setTemplateInit('text', ($text) => {
          $text.$name = $text.querySelector('.name');
        });
        vm.$refs.example.setRender('text', ($text, data) => {
          $text.$name.innerHTML = data.detail.name + "-----------------------" + data.detail.sheet;
        });

        vm.$refs.example.tree = test;
        vm.$refs.example.css = `
    .item[disabled] {
        opacity: 0.4;
    }
    
    .text > .link {
        margin-left: 10px;
        cursor: pointer;
        color: yellow;
    }
    
    .right > ui-icon {
        cursor: pointer;
        color: green;
    }
        `;
      },



      //本地缓存相关操作
      _saveConfig() {
        let data = {
          jsonAllFileName: this.jsonAllFileName,
          isMergeJson: this.isMergeJson,
          isFormatJson: this.isFormatJson,
          fileOutPut: this.fileOutPut,
          fileDirectoryPath: this.fileDirectoryPath,//excel目录
          codeSavePath: this.codeSavePath
        };
        let savePath = path.join(Editor.Project.path, 'settings', cfgFile);
        fs.writeFileSync(savePath, JSON.stringify(data));
        // Editor.info("save ok!");
        console.log("save ok!");
      },

      /**
       * 生成ts模板
       * @returns 
       */
      async onBtnGenerateTsClick() {
        if (!this.codeSavePath) {
          console.warn("请先指定代码存放位置");
          return;
        }
        var codeBody = `/**
* 此文件由工具自动生成，请勿直接修改。
*/
export class %s {
       
%s
}`
        //字段
        if (excelArray.length == 0) {
          excelArray = excelUtil.getAllSheet(this.fileDirectoryPath);
        }
        if (excelArray.length == 0) {
          console.log("目录中没有可用的excel文件");
          return;
        }
        console.log("共计数量：" + excelArray.length);
        for (var i = 0; i < excelArray.length; i++) {
          let item = excelArray[i];
          if (!item.checkbox) continue;
          var list = xlsx.parse(item.fullPath);
          let tableDefines = excelUtil.getTableDefine(list);
          let nodeStr = '';
          if (tableDefines) {
            for (var j = 0; j < tableDefines.keys.length; j++) {
              var key = tableDefines.keys[j];
              var type = tableDefines.types[j];
              var title = '\t' + `/** ${tableDefines.titles[j]} */` + '\n';
              var codeNodeInit = '%s: %s;';
              nodeStr += title + '\t' + util.format(codeNodeInit, key, type) + '\n';
            }

            let clsName = item.sheet;
            let exportCode = util.format(codeBody, clsName, nodeStr);
            let fspath = path.join(this.codeSavePath, clsName + ".ts");
            // fspath = "/Users/evy/Documents/work/creator/match_cocos/SXCocos/assets/gamebundle/scripts/game/muban.ts";
            console.log('fspath = ' + fspath);
            let exportCodePath = await Editor2D.assetdb.fspathToUrl(fspath);
            console.warn('exportCodePath = ' + exportCodePath);
            if (exportCodePath) {
              Editor2D.assetdb.create(exportCodePath, exportCode);
              console.log(item.sheet + "  生成成功");
            }
            else
              console.log("请选择asset下的脚本目录");
          } else {
            console.log(item.sheet + "  生成失败");
          }
        }
        this._saveConfig();
      }
    }
  });
};
// Triggered when trying to close the panel
exports.beforeClose = async function () {

};
// Triggered when the panel is actually closed
exports.close = async function () { };



