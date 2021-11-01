function helpFn(){
    console.log(`
    List of all commands:
    node main.js tree "directoryPath"
    node main.js organize "directoryPath"
    node mainn.js help
    `);

}

module.exports={
    helpKey=helpFn
}