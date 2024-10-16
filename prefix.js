(function () {
  const push = document.querySelector(".push");
  const reset = document.querySelector(".reset");
  const bucket = document.querySelector(".main-stack-bucket");
  const message = document.querySelector(".message");
  const messageBox = document.querySelector(".message-box");
  const box = document.querySelectorAll(".box");
  const boxPostfix = document.querySelector(".box-postfix");
  let operatorStack = [];
  let prefixExpression = "";
  let newDivElement;
  let newInputElement;
  let DivElement;
  let temp;
  const precedence = {
    "%": -1,
    "(": -1,
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
  };
  const savedValue = document.getElementById("conversionType").value; 
  const parent = document.querySelector(".container-header");
  const child = parent.children[1];
  const newInputValue = document.createElement("input");
  newInputValue.id = "myId";
  newInputValue.classList.add("text");
  newInputValue.type = "text";
  newInputValue.style.width = "400px";
  newInputValue.style.height = "50px";
  newInputValue.placeholder = "Enter Infix Expression";
  parent.replaceChild(newInputValue, child);

  const displayMessage = (msg) => {
    boxPostfix.innerHTML = prefixExpression;
    message.innerHTML = msg;
    messageBox.classList.add("info-message");
    setTimeout(() => {
      messageBox.classList.remove("info-message");
    }, 2000);
  };

  if (savedValue === "prefix" || savedValue === "postfix") {
    displayMessage("");
    document.querySelector(".postfixExp").innerHTML = "Postfix Expression";
    document.querySelector(".box-postfix").innerHTML = "";
    document.querySelector(".push").style.cursor = "pointer";
    if (savedValue == "prefix") {
      document.querySelector("#converterHeader").innerHTML =
        "Infix to Prefix Converter";
    } else
      document.querySelector("#converterHeader").innerHTML =
        "Infix to Postfix Converter";
    document.getElementById("conversionType").value = savedValue;
  } else {
    document.getElementById("conversionType").value = "";
  }

  let colorCurrentChar = (expression, index) => {
    DivElement = document.createElement("div");
    // Loop through each character and wrap it in a span element
    for (let i = 0; i < expression?.length; i++) {
      const span = document.createElement("span");
      span.textContent = expression[i];

      // Apply color only to the character at the specified index
      if (i === index) {
        span.style.color = "red";
        span.style.fontSize = "33px";
      }

      // Append each span to the newDivElement
      DivElement.appendChild(span);
    }
    DivElement.style.fontSize = "27px";
    DivElement.style.marginLeft = "20px";
    DivElement.style.width = "400px";
    DivElement.style.paddingRight = "50px";
    DivElement.style.height = "50px";
    DivElement.id = "myId";
    if (newDivElement && newDivElement.parentNode)
      newDivElement.parentNode.replaceChild(DivElement, newDivElement);

    newDivElement = DivElement;
  };
  const processInput = (char, expression, index) => {
    colorCurrentChar(expression, index);
    if (/[a-z0-9]/i.test(char)) {
      prefixExpression += char;
      displayMessage(`Step ${index + 1}:   ${char} is added to postfix Exp`);
    } else if (char === "(") {
      operatorStack.push(char);
      updateStackView();
      displayMessage(`Step ${index + 1}:   ${char} is pushed on the stack`);
    } else if (char === ")") {
      while (
        operatorStack?.length &&
        operatorStack[operatorStack?.length - 1] !== "("
      ) {
        const popedElement = operatorStack.pop();
        prefixExpression += popedElement;
        updateStackView();
        displayMessage(
          `Step ${index + 1}:   ${popedElement} is poped from stack`
        );
      }
      const popedElement = operatorStack.pop();
      setTimeout(() => {
        updateStackView();
      }, 1000);
      displayMessage(
        `Step ${index + 1}:   ${popedElement} is poped from stack`
      );
    } else {
      if (char == "^") {
        while (
          operatorStack?.length > 0 &&
          precedence[char] <=
            precedence[operatorStack[operatorStack?.length - 1]]
        ) {
          const popedElement = operatorStack.pop();
          updateStackView();
          prefixExpression += popedElement;
          displayMessage(
            `Step ${index + 1}:   ${popedElement} is poped from stack`
          );
        }
      } else {
        while (
          operatorStack?.length > 0 &&
          precedence[char] <
            precedence[operatorStack[operatorStack?.length - 1]]
        ) {
          const popedElement = operatorStack.pop();
          updateStackView();
          prefixExpression += popedElement;
          displayMessage(
            `Step ${index + 1}:   ${popedElement} is poped from stack`
          );
        }
      }
      operatorStack.push(char);
      updateStackView();
      const top = operatorStack[operatorStack?.length - 1];
      displayMessage(`Step ${index + 1}:   ${top} is pushed on the stack`);
    }
  };

  const updateStackView = () => {
    bucket.innerHTML = "";
    operatorStack.forEach((op) => {
      const element = document.createElement("div");
      element.classList.add("ele");
      element.innerText = op;
      bucket.appendChild(element);
    });
    box[0].innerHTML = operatorStack.length
      ? operatorStack[operatorStack.length - 1]
      : "";
  };

 

  let changeInputToDiv = (expression) => {
    newDivElement = document.createElement("div");

    // Set the div's content to be the same as the input's value
    newDivElement.textContent = expression;
    // Replace the input with the new div
    const parent = document.querySelector(".container-header");
    const child = parent.children[1];
    let inputTag = document.querySelector(".inputText");

    setTimeout(() => {
      inputTag.innerHTML = "Reversed Input :";
      inputTag.style.marginTop = "1px";
      //  inputTag.style.marginLeft = "65px";
      console.log(inputTag.style.marginLeft);
      parent.replaceChild(newDivElement, child);
      displayMessage("");
    }, 300);

    newDivElement.style.color = "black";
    newDivElement.style.fontSize = "27px";
    newDivElement.style.marginLeft = "20px";
    newDivElement.style.width = "500px";
    newDivElement.style.height = "50px";
    newDivElement.style.overflowY = "hidden";
    newDivElement.style.overflowX = "hidden";
    newDivElement.style.paddingRight = "3px";
    newDivElement.id = "myId";
  };
  const changeDivToInput = () => {
    newInputElement = document.createElement("input");

    // Set the div's content to be the same as the input's value
    newInputElement.value = "";
    newInputElement.placeholder = "Enter Infix Expression";
    newInputElement.type = "text";

    // Replace the input with the new div
    const parent = document.querySelector(".container-header");
    const child = parent.children[1];
    parent.replaceChild(newInputElement, child);
    newInputElement.id = "myId";
  };
  const findReverse = (expression) => {
    let chars = expression?.split(""); // Convert string to array
    let left = 0;
    let right = chars?.length - 1; // Correct the right index to point to the last character

    while (left < right) {
      // Swap parentheses if found
      if (chars[left] === "(") {
        chars[left] = ")";
      } else if (chars[left] === ")") {
        chars[left] = "(";
      }

      if (chars[right] === "(") {
        chars[right] = ")";
      } else if (chars[right] === ")") {
        chars[right] = "(";
      }

      // Swap the characters
      let temp = chars[left];
      chars[left] = chars[right];
      chars[right] = temp;

      left++;
      right--;
    }

    return chars?.join("");
  };

  push.addEventListener("click", () => {

    prefixExpression = "";
    while (operatorStack.length > 0) operatorStack.pop();
    updateStackView();
    boxPostfix.innerHTML = prefixExpression;

    const tag = document.querySelector("#myId");
    let expression = tag.value;
    if (expression.length == 0) {
      displayMessage("Please enter an expression.");
      return;
    } else if (!infixChecker(expression)) {
      displayMessage("Please enter a valid Infix expression !");
      return;
    }
    setTimeout(() => {
      displayMessage("Reverse the given Expression....");
    }, 1);
    temp = expression;
    document.querySelector(".push").style.cursor = "not-allowed";
    document.querySelector(".reset").style.cursor = "not-allowed";
    let reverseInput = findReverse(expression);
    document.querySelector(".push").style.marginLeft = "50px";
    document.querySelector("#myId").style.marginRight = "65px";
    document.querySelector(".push").style.marginRight = "10px";
    changeInputToDiv(reverseInput);

    document.querySelector(".container-header").style.marginTop = "1px";
    document.querySelector(".push").style.marginLeft = "20px";
    document.querySelector(".reset").style.marginRight = "120px";
    document.querySelector(".push").style.marginRight = "30px";
    console.log(document.querySelector(".inputText").style.marginLeft);
    document.querySelector(".inputText").style.marginLeft = "65px";
    let i;
    setTimeout(() => {
      for (i = 0; i < reverseInput?.length; i++) {
        setTimeout(
          ((char, idx) => () => {
            processInput(char, reverseInput, idx);
          })(reverseInput[i], i),
          i * 1500
        );
      }
    }, 300);

    setTimeout(() => {
      while (operatorStack?.length > 0) {
        let stepIndex = i;
        const popedElement = operatorStack.pop();
        updateStackView();
        prefixExpression += popedElement;

        // Ensure we display a valid message for the last pop
        displayMessage(
          `Step ${stepIndex + 1}: ${popedElement} is popped from the stack`
        );
        stepIndex++;
      }
      boxPostfix.innerHTML = prefixExpression;
      setTimeout(() => {
        displayMessage("Reverse the postfix Expression....");
      }, 1);

      setTimeout(() => {
        const divElements = document.querySelectorAll("#myId span"); // Get all spans inside the div
        divElements.forEach((span) => {
          span.style.color = "black"; // Change color to black
          span.style.fontSize = "27px";
          const converter = document.querySelector(".push");
          converter.style.cursor = "not-allowed";
          let inputTag = document.querySelector(".inputText");
          inputTag.innerHTML = "Input:";
          let inp = document.querySelector("#myId");
          inp.innerHTML = temp;

          setTimeout(() => {
            let headTag = document.querySelector(".postfixExp");
            headTag.innerHTML = "Prefix Expression";
            let postfix = prefixExpression;
            prefixExpression = findReverse(postfix);
            boxPostfix.innerHTML = prefixExpression;
            setTimeout(() => {
              displayMessage("Expression is Evaluated");
              document.querySelector(".reset").style.cursor = "pointer";
            }, 1000);
          }, 2000);
        });
      }, 1500);
    }, reverseInput?.length * 1500);
  });

  reset.addEventListener("click", () => {
    while (operatorStack?.length > 0) operatorStack.pop();
    updateStackView();
    prefixExpression = "";
    box[0].innerHTML = "";
    message.innerHTML = "";
    displayMessage("");
    document.querySelector(".postfixExp").innerHTML = "Postfix Expression:";
    document.querySelector(".push").style.cursor = "pointer";

    bucket.innerHTML = "";
    changeDivToInput();
    document.querySelector("#myId").value = "";
    boxPostfix.innerHTML = "";
  });

  const infixChecker = (expression) => {
    const operators = ["+", "-", "*", "/", "%", "^"];
    let openParentheses = 0;
    let prevChar = ""; // Keeps track of the previous character
    
    for (let i = 0; i < expression?.length; i++) {
      const char = expression[i];

      // Check for valid characters (alphanumeric, operators, and parentheses)
      if (!/[a-z0-9()]/i.test(char) && !operators.includes(char)) {
        return false;
      }

      // Check for balanced parentheses
      if (char === "(") {
        openParentheses++;
      } else if (char === ")") {
        openParentheses--;
        // Invalid if there are unmatched closing parentheses or an operator directly before a closing parenthesis
        if (openParentheses < 0 || operators.includes(prevChar)) {
          return false;
        }
      }

      // Check for consecutive operators or invalid operator placements
      if (operators.includes(char)) {
        // An operator cannot appear right after another operator, or an opening parenthesis
        if (
          prevChar === "" ||
          operators.includes(prevChar) ||
          prevChar === "("
        ) {
          return false;
        }
      }

      // Ensure no operand or closing parenthesis directly follows a closing parenthesis
      if (/[a-z0-9]/i.test(char) && prevChar === ")") {
        return false;
      }

      // Update the previous character
      prevChar = char;
    }

    // Check if parentheses are balanced and the expression doesn't end with an operator
    if (openParentheses !== 0 || operators.includes(prevChar)) {
      return false;
    }

    return true;
  };

  // }
})();
