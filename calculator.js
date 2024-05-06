const allbuttons = document.querySelectorAll("button");
const displayMain = document.getElementById("js-dis-main");
const displayTop = document.getElementById("js-dis-top");
let keyOne = '';
let keyTwo = '';
let operandA = '';
let operatorB = '';
let operandC = ''; 
let result = 0;

/*The buttons are seperated into js-op and non js-op. Each button send its text value to other functions to do the work*/
allbuttons.forEach(btn => {
  btn.addEventListener("click", function(){
    pressedKey = btn.textContent;
    console.log('pressedKey = ' + pressedKey);
    if (btn.className !== "js-op" && btn.className !== "js-res"){
      keyCheck('num');
      actionWithKeys(pressedKey);
    } else if (btn.className === "js-op"){
      keyCheck('op');
      actionWithKeys(pressedKey);
    } else {
      resultAndReset(pressedKey);
    }
  });
});

/* To check whether the current pressed key and previous pressed key are num or op */
function keyCheck(key){
  if(keyOne === ''){
    keyOne = key;
  } else if(keyTwo === ''){
    keyTwo = key;
  } 
    else if(keyTwo !== ''){
    keyOne = keyTwo;
    keyTwo = key;
  }
  console.log('[keyOne is ' + keyOne);
  console.log('keyTwo is ' + keyTwo + ']');
}


/* If two num keys are pressed, they should string add. 
If one num and one op is pressed, the main display should push to top display and replace in main display. 
If both are op keys, then it should replace in main display.*/
function actionWithKeys(pressedKey){
  let operand = ''; 
  if((keyOne === 'num' && keyTwo === 'num') || keyTwo === ''){
    displayMain.textContent += pressedKey;
  } else if((keyOne === 'num' && keyTwo === 'op') || (keyOne === 'op' && keyTwo === 'num')){
    operand = displayMain.textContent;
    operandCheck(operand);
    displayTop.textContent += ` ${displayMain.textContent}`;
    displayMain.textContent = pressedKey;
  } else if(keyOne === 'op' && keyTwo === 'op'){
    displayMain.textContent = pressedKey;
  }
}

/* The operators work only if there are 2 operands. Since all are strings, A and C are converted to Numbers and depending on B, the operations are made.
This function checks whether A B C have value or not. */
function operandCheck(operand){
  if (operandA === ''){
    operandA = Number(operand);
    result = operandA;
  } else if (operandA !== '' && operatorB === ''){
    operatorB = operand;
  } else if (operatorB !== '' && operandC === ''){
    operandC = Number(operand);
    logic(operandA,operatorB,operandC);
    operandA = result;
    operatorB = '';
    operandC = '';
  }
  console.log('result is ' + result);
  console.log(operandA + ' A is ' + typeof(operandA));
  console.log(operatorB + ' B is ' + typeof(operatorB));
  console.log(operandC + ' C is ' + typeof(operandC));
}

/* The logical operations of A and C are done here 
Using operator and operand array stack can be used to solve this*/
function logic(A,B,C){
  if(B === '+'){
    result = A + C;
  } else if (B === '-'){
    result = A - C;
  } else if (B === '*'){
    result = A * C;
  } else if (B === '/'){
    result = A / C;
  }
}

function resultAndReset(key){
  displayTop.textContent = '';
  if(key === '='){
    if(keyTwo === 'num'){
      operandC = Number(displayMain.textContent);
      logic(operandA,operatorB,operandC);
      displayMain.textContent = result;
    } else{
      displayMain.textContent = result;
    }
    console.log('equalto result is ' + result);
  } else if (key === 'C'){ //Complete Reset
    displayMain.textContent = '';
    keyOne = '';
    keyTwo = '';
    result = 0;
    console.clear();
  }
    operandA = '';
    operatorB = '';
    operandC = '';
}