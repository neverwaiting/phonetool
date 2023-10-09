const fs = require('fs');
const xlsx = require('node-xlsx');

// 读取JSON文件
const jsonData = fs.readFileSync('phone.json', 'utf-8');

// 将JSON解析为JavaScript对象
let userList = JSON.parse(jsonData)
console.log(userList[0])
    
let output = []
output.push(["ID", "姓名", "电话", "性别", "关系", "亲属姓名"])
for (let i = 0; i < userList.length; ++i) {
    let user = userList[i]
    let phones = user.phone
    for (let phone of phones) {
        output.push([i + 1, user.name, phone, user.sex, "本人"])
    }
    let relations = user.relation
    for (let relation of relations) {
        output.push([i + 1, relation.name, relation.phone, "无", relation.relation])
    }
}

// 创建一个工作簿
const workSheets = [
    {
      name: 'Sheet1',
      data: output
    }
];

// 将工作簿写入 Excel 文件
const buffer = xlsx.build(workSheets);

// 将Excel文件写入磁盘
fs.writeFileSync('output.xlsx', buffer, { flag: 'w' });