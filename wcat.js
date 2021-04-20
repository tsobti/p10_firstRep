let fs = require("fs")
let input = process.argv.slice(2);
console.log("input", input);

let options = [];
let filePaths = [];

for (let i = 0; i < input.length; i++) {
    //first character in js string
    //let firstchar = input[i].charAt(0);

    //to extract file paths and options from input
    if (input[i] == "-s" || input[i] == "-b" || input[i] == "-n") {
        options.push(input[i]);
    } else {
        filePaths.push(input[i]);
    }
}
console.log("options", options);
console.log("filePaths", filePaths);

//to check if the file exists or not so loop in the filepaths array
for (let i = 0; i < filePaths.length; i++) {
    let isFilePresent = fs.existsSync(filePaths[i]);
    if (isFilePresent == false) {
        console.log("filepath", filePaths[i], "does not exist");
        return;
    }
}

let totalcontent = "";
//to read contents from filePath
for (let i = 0; i < filePaths.length; i++) {
    let contentofCurrent = fs.readFileSync(filePaths[i], "utf-8");
    //after every file's content-> next file content should come in next line
    totalcontent += contentofCurrent + "\r\n";
}
//console.log(totalcontent);




//implemet -s
//includes is a function in array to check if it exists or not
let isSoption = options.includes("-s");
//to implement -s option->remove empty line breaks
if (isSoption == true) {
    //split on basis of line breaksto convert it into array
    let outputArr = totalcontent.split("\r\n");
    //identify and remove empty line break
    //console.log(output)
    //remove
    let tempArr = [];
    for (let i = 0; i < outputArr.length; i++) {
        let isElementValid = outputArr[i].length != 0
        if (isElementValid) {
            tempArr.push(outputArr[i]);
        }
    }
    outputArr = tempArr;
    //console.log("tempArr", tempArr);
    totalcontent = tempArr.join("\r\n");

}
//console.log(totalcontent);


//case for -n -b occuring tother the one which comes first is implemented
let isB = options.includes("-b");
let isN = options.includes("-n");
//final option which can be -n or -b
let finalOption;
if (isN == true) {
    if (isB == true) {
        //print what comes first
        let idxB = options.indexOf("-b");
        let idxN = options.indexOf("-n");
        finalOption = idxB < idxN ? "-b" : "-n";
    } else {
        finalOption = "-n";
    }
} else if (isB == true) {
    finalOption = "-b";
}





//implement-n -> this numbers all the lines, both empty and non-empty
//let isN = options.includes("-n");
if (finalOption == "-n") {
    let count = 1;
    let contentArr = totalcontent.split("\r\n");

    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i] = count + "." + contentArr[i];
        count++;


    }
    totalcontent = contentArr.join("\r\n");
}
//console.log(totalcontent)


//implement -b -> gives numbering to non empty lines 
//let isB = options.includes("-b");
if (finalOption == "-b") {
    let count = 1;
    let contentArr = totalcontent.split("\r\n");
    for (let i = 0; i < contentArr.length; i++) {
        //it shouldn't be a blank line
        if (contentArr[i] != "") {
            contentArr[i] = count + "." + contentArr[i];
            count++;
        }

    }
    totalcontent = contentArr.join("\r\n");

}
console.log(totalcontent)