function formatSubtab(tab) {
  // let me = this;
  tab.subTabs.map(subItem => {
    if (subItem.comparison) {
      // subItem.advantageList = subItem.advantage.split("|");
      // subItem.disadvantageList = subItem.disadvantage.split("|");
      tab.advantageList = subItem.advantage.split("|");
      tab.disadvantageList = subItem.disadvantage.split("|");
    }
    if (!subItem.posts) return;
    subItem.posts.map(textItem => {
      let list = textItem.title.split("|");
      let reg = /(\[.*?\]|\{.*?\}|\<.*?\>)/;
      let textList = textItem.content.split(reg);
      // me.paragraphList = textItem.content.split("|"); //段落
      let splitTextList = []; // 词汇解释
      textList.map(Titem => {
        if (Titem.charAt(0) === "[") {
          splitTextList.push({
            type: "explain",
            content: Titem.slice(1, -1)
          });
        } else if (Titem.charAt(0) === "{") {
          splitTextList.push({
            type: "bold",
            content: Titem.slice(1, -1)
          });
        } else if (Titem.charAt(0) === "<") {
          splitTextList.push({
            type: "transport",
            content: Titem.slice(1, -1)
          });
        } else {
          splitTextList.push({
            type: "normal",
            content: Titem
          });
        }
      });
      textItem.dictionarys = splitTextList;
      textItem.imgs.map((child, index) => {
        child.url = api.serverHost + child.url;
        child.imgDescription = list[index] || "";
      });
    });
  });
}

function formatModuleContent(module) {
  let results = [];
  if (module.branch == 0) {
    let temContent = JSON.parse(module.jsonContent);
    if (temContent != "") {
      temContent.forEach(c => {
        results.push(parseText(c))
      })
    }

  } else if (module.branch == 1) {
    let temImgContents = JSON.parse(module.jsonContent);
    for (const item of temImgContents) {
      item.content = parseText(item.content);
      item.img = item.img.split('|');
      item.imgNames = item.imgNames.split('|');
    }
    return temImgContents;
  } else if (module.branch == 2) {
    let list = JSON.parse(module.jsonContent);
    return list;
  }
  return results;
}

function parseText(text) {
  let reg = /(\[.*?\]|\{.*?\}|\<.*?\>)/;
  let splitTexts = text.split(reg);
  let results = [];
  splitTexts.map(i => {
    if (i.charAt(0) === "[") {
      results.push({
        type: "explain",
        content: i.slice(1, -1)
      });
    } else if (i.charAt(0) === "{") {
      results.push({
        type: "bold",
        content: i.slice(1, -1)
      });
    } else if (i.charAt(0) === "<") {
      results.push({
        type: "transport",
        content: i.slice(1, -1)
      });
    } else {
      results.push({
        type: "normal",
        content: i
      });
    }
  })
  return results;
}

export default {
  formatSubtab: formatSubtab,
  formatModule: formatModuleContent
};