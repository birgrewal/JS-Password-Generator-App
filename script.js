const passwordOptions = {
    num: "1234567890",
    specialChar: "!@#$%&'()*+,^-./:;<=>?[]_`{~}|",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
};

const genPass = document.querySelector('.genPass')
const charNo = document.getElementById('charNo')
const incUpCase = document.getElementById('incUpCase')
const incLowCase = document.getElementById('incLowCase')
const incNum = document.getElementById('incNum')
const incSymbols = document.getElementById('incSymbols')

let generatePassword = function () {

    let passInfo = "";

    const passChars = [];

    let characterAmount = charNo.value;

    if (characterAmount >= 8 && characterAmount < 129) {

        if (incNum.checked) {
            passInfo += passwordOptions.num;
            passChars.push(getRandomChar(passwordOptions.num));
        };

        if (incSymbols.checked) {
            passInfo += passwordOptions.specialChar;
            passChars.push(getRandomChar(passwordOptions.specialChar));
        };

        if (incLowCase.checked) {
            passInfo += passwordOptions.lowerCase;
            passChars.push(getRandomChar(passwordOptions.lowerCase));
        };

        if (incUpCase.checked) {
            passInfo += passwordOptions.upperCase;
            passChars.push(getRandomChar(passwordOptions.upperCase));
        };

        if (!passInfo) {
            window.alert("You need to select at least one option, please try again!");
            return generatePassword();
        };

        while (passChars.length < characterAmount) {
            passChars.push(getRandomChar(passInfo));
        };

        for (let i = passChars.length - 1; i > 0; i--) {
            const swapIndex = Math.floor(Math.random() * (i + 1));
            const temp = passChars[i];
            passChars[i] = passChars[swapIndex];
            passChars[swapIndex] = temp;
        };
        return passChars.join("");
    }
    else {
        window.alert("You need to provide a valid length!");
        return initialState;
    }
};

let getRandomChar = function (fromString) {
    return fromString[Math.floor(Math.random() * fromString.length)];
}

let generateBtn = document.querySelector("#genBtn");
let copyBtn = document.querySelector('#copyBtn')
function writePassword() {
    let password = generatePassword();
    genPass.innerText = password;
}

generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener('click', copyPass)

function copyPass(pass) {
    navigator.clipboard.writeText(pass);
    window.alert("Your password has been copied!");
}