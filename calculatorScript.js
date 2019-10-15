/*
 * @author: Asaf Gilboa
 * @project: Multi parameters calculator
 * SV-College Front-End course
 * 29/06/2019
 */

/* הפונקציה מחזירה את התו האחרון ממסך המחשבון */
function getLastDigit() {
    let exp = document.getElementById('panelExp').innerHTML;
    let digit = exp.charAt(exp.length - 1);
    return digit;
}

/* פונקציה בוליאנית הבודקת האם התו האחרון במסך המחשבון הינו מספר  */
function lastClickIsNum() {
    let digit = parseInt(getLastDigit());
    if (!isNaN(digit)) {
        return true;
    } else {
        return false;
    }
}

/*  פונקציה המופעלת על ידי הקשה על ספרה בין 1-9 */
function getClick(x) {
    if (document.getElementById('panelExp').innerHTML.length > 50) {
        return; // וידוא שהביטוי לא יחרוג מגבולות המחשבון
    }
    // אם יש ביטוי פתוּר על המסך, התחל ביטוי חדש
    if (document.getElementById("panelRes").innerHTML != '') {
        document.getElementById("panelRes").innerHTML = '';
        document.getElementById('panelExp').innerHTML = x;
        // אחרת, הוסף ספרה לביטוי הקיים, בתנאי שיווצר ביטוי תקין
    } else if (getLastDigit() != ')') {
        document.getElementById('panelExp').innerHTML += x;
    }
}

/* פונקציה המופעלת על ידי הקשה על הספרה 0 */
function getZero() {
    // ודא שהספרה האחרונה הינה מספר ושאין ביטוי פתוּר על המסך
    if ((lastClickIsNum()) && (document.getElementById("panelRes").innerHTML == '')) {
        document.getElementById('panelExp').innerHTML += '0';
    }
}

/* פונקציה המופעלת על ידי הקשה על אופרטור */
function getOp(op) {
    // אם יש ביטוי פתוּר על המסך,
    // התחל ביטוי חדש המורכב מפיתרון הביטוי הקודם והאופרטור שהוקש
    if (document.getElementById("panelRes").innerHTML != '') {
        let newExp = document.getElementById('panelRes').innerHTML + ` ${op} `;
        document.getElementById('panelExp').innerHTML = newExp;
        document.getElementById("panelRes").innerHTML = '';
        // אחרת, הוסף אופרטור לביטוי הקיים, בתנאי שיווצר ביטוי תקין
    } else if ((lastClickIsNum()) || (getLastDigit() == ')')) {
        document.getElementById('panelExp').innerHTML += ` ${op} `;
    }
}

/* פונקציה המופעלת על ידי הקשה על פתיחת סוגריים */
function openBracket() {
    if (document.getElementById('panelExp').innerHTML.length > 50) {
        return; // וידוא שהביטוי לא יחרוג מגבולות המחשבון
    }
    let digit = getLastDigit();
    let counter = parseInt(document.getElementById('opBrack').value);
    // הוסף פתיחת סוגריים לביטוי הקיים, בתנאי שיווצר ביטוי תקין
    if ((!lastClickIsNum()) && (digit != ')')) {
        document.getElementById('panelExp').innerHTML += '(';
        counter++; // עדכן את ספירת הסוגריים הפתוחים
        document.getElementById('opBrack').value = counter;
        // אם יש ביטוי פתוּר על המסך, התחל ביטוי חדש   
    } else if ((document.getElementById("panelRes").innerHTML != '')) {
        document.getElementById('panelExp').innerHTML = '(';
        document.getElementById("panelRes").innerHTML = '';
        counter++;
        document.getElementById('opBrack').value = counter;
    }
}

/* פונקציה המופעלת על ידי הקשה על סגירת סוגריים */
function closeBracket() {
    if (document.getElementById('panelExp').innerHTML.length > 50) {
        return; // וידוא שהביטוי לא יחרוג מגבולות המחשבון
    }
    let counter = parseInt(document.getElementById('opBrack').value);
    let digit = getLastDigit();
    // הוסף סגירת סוגריים לביטוי הקיים, בתנאי שיווצר ביטוי תקין
    if (((lastClickIsNum()) || (getLastDigit() == ')')) && (counter > 0)) {
        document.getElementById('panelExp').innerHTML += ')';
        counter--; // עדכן את ספירת הסוגריים הפתוחים
        document.getElementById('opBrack').value = counter;
    }
}

/* -x פונקציה המופעלת על ידי הקשה על 
 * (מספר שלילי)
 */
function negativeNum() {
    let exp = document.getElementById('panelExp').innerHTML;
    let digit = getLastDigit();
    // הוסף סימן מינוס (שאינו פעולת חיסור) לביטוי,
    if ((digit == ' ') || (digit == '(') || (exp == '')) {
        document.getElementById('panelExp').innerHTML += ' -';
        // אם יש ביטוי פתוּר על המסך, התחל ביטוי חדש     
    } else if ((document.getElementById("panelRes").innerHTML != '')) {
        document.getElementById('panelExp').innerHTML = ' -';
        document.getElementById("panelRes").innerHTML = '';
    }
}

/* (מחיקה) del פונקציה המופעלת על ידי הקשה על */
function deleteLast() {
    // אם קיים ביטוי פתוּר על המסך, לא ניתן לבצע מחיקה
    if (document.getElementById("panelRes").innerHTML != '') {
        return;
    }
    let exp = document.getElementById('panelExp').innerHTML;
    // אם התו האחרון הינו אופרטור, מחק 3 תווים, כי אלו מוקפים ברווחים
    if (getLastDigit() == ' ') {
        exp = exp.slice(0, -3);
    } else { // אם התו האחרון הינו פות/סוגר סוגריים, עדכן את ספירת הסוגריים הפתוחים בהתאם
        if (getLastDigit() == ')') {
            document.getElementById('opBrack').value = parseInt(document.getElementById('opBrack').value) + 1;
        } else if (getLastDigit() == '(') {
            document.getElementById('opBrack').value = parseInt(document.getElementById('opBrack').value) - 1;
        }
        exp = exp.slice(0, -1); //ביצוע מחיקה של תו אחד
    }
    document.getElementById('panelExp').innerHTML = exp;
}

/* '=' פונקציה המופעלת על ידי הקשה על שווה */
function calculate() {
    let brackets = parseInt(document.getElementById('opBrack').value);
    // eval() ודא שהביטוי הקיים על המסך תקין מבחינת סינטקס עבר פונקציית 
    if (((lastClickIsNum()) || (getLastDigit() == ')')) && (brackets == 0)) {
        let exp = document.getElementById("panelExp").innerHTML;
        exp = exp.replace(/×/g, '*'); // החלף את סמלי האופרטורים האסתטים בכאלה תקינים מבחינת סינטקס
        exp = exp.replace(/÷/g, '/');
        let result = eval(exp); // בצע את חישוב הביטוי
        console.log(`${exp} = ${result}`);
        // הדפס את הפתרון לצד ימין של מסך המחשבון
        document.getElementById("panelRes").innerHTML = result.toFixed(3);
    }
}

/* (ניקוי מסך) C פונקציה המופעלת על ידי הקשה על */
function reset() {
    document.getElementById("panelExp").innerHTML = '';
    document.getElementById("panelRes").innerHTML = '';
    document.getElementById('opBrack').value = '0';
}