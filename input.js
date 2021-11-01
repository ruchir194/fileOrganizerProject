let inputArr=process.argv.slice(2);
let fs=require("fs");
let path=require("path");
console.log(inputArr);


//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node mainn.js help

let command=inputArr[0];
let types={
    media:["mp4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso',"xz"],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odp','odg','odf','txt','ps'],
    app:['exe','dmg','pkg',"deb"],
}

switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("please input right command");
        break;

}

function treeFn(dirPath){
    console.log("TREE command implemented for", dirPath);

}

function organizeFn(dirPath){
    console.log("organize command implemented for", dirPath);
    //input=directorypath given
    let destPath;
    if(dirPath==undefined){
        console.log("kindly enter the path");
        return;
    }else{
       let doesExist= fs.existsSync(dirPath);
       if(doesExist){

        destPath= path.join(dirPath,"organized_files");
       if(fs.existsSync(destPath)==false){
       fs.mkdirSync(destPath);
       }

       }
       else{
        console.log("kindly enter the path");
        return;
       }
    }
    

    //create organized files->directory

    organizeHelper(dirPath,destPath);
    //identify category of all the files present in that input directory
    //copy files to that organized directory inside of any of category folder


}

function organizeHelper(src,dest){
    let childNames=fs.readdirSync(src);
    for(let i=0;i<childNames.length;i++){
       let childAddress= path.join(src,childNames[i]);
      let isFile= fs.lstatSync(childAddress).isFile();
    
    if(isFile){
        let category= getCategory(childNames[i]);
        console.log(childNames[i],"belongs  to --> ", category);
        sendFiles(childAddress,dest,category);
        
    }
}
}

function sendFiles(srcFilePath,dest,category){
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName=path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName,"copied to",category);
}

function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    console.log(ext);

    for(let type in types){
        let cTypeArray=types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext==cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}



function helpFn(){
    console.log(`
    List of all commands:
    node main.js tree "directoryPath"
    node main.js organize "directoryPath"
    node mainn.js help
    `);

}