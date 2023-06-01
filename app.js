//========== UTILS ==============
let done;
let memory = [];
let selectedOperator = null;
const equalHandler = () => {
   const currentValue = Number(display.innerHTML);
   memory.push(currentValue);
   const result = eval(memory.join(' '));
   setDisplayValue(result);
   console.log(memory.join(' '), result);
   memory = [];
   done = true;
};
//========== DISPLAY ==============
const display = document.querySelector("#display");
const setDisplayValue = (value) => {
   display.innerHTML = value;
};
//========== NUMBERS ==============
const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");

const numbers = [zero, one, two, three, four, five, six, seven, eight, nine];

numbers.forEach((element, index) => {
   /* console.log(element, index) */
   element.addEventListener("click", () => {
      const currentValue = display.innerHTML;
      let newValue = `${currentValue}${index}`;
      if (currentValue === "0" || selectedOperator !== null || (memory.length === 0 && selectedOperator === null && done === true)) {
         newValue = index;
      }
      if (selectedOperator !== null) {
         selectedOperator.classList.remove("selected");
         selectedOperator = null;
      }
      setDisplayValue(newValue);
      done = false;
   });
});
//========== AC ==============
const ac = document.querySelector("#ac");
ac.addEventListener("click", () => {
   setDisplayValue(0);
   memory = [];
   if (selectedOperator !== null) {
      selectedOperator.classList.remove("selected");
   }
});

//========== SIGN ==============
const sign = document.querySelector("#sign");
sign.addEventListener("click", () => {
   let currentValue = Number(display.innerHTML);
   const inverseValue = currentValue * -1;
   setDisplayValue(currentValue * -1);
   if (memory.length === 2) {
      memory = [
         inverseValue, memory.pop()
      ];
   }

});
//========== DOT ==============
const dot = document.querySelector("#dot");
dot.addEventListener("click", () => {
   const currentValue = display.innerHTML;
   if (!currentValue.includes(".")) {
      setDisplayValue(`${currentValue}.`);
   }
});

//========== PERCENT ==============
const percent = document.querySelector("#percent");
percent.addEventListener("click", () => {
   let currentValue = Number(display.innerHTML);
   setDisplayValue(currentValue / 100);
});

//========== OPERATORS ==============
const div = document.querySelector("#div");
const mul = document.querySelector("#mul");
const sum = document.querySelector("#sum");
const sub = document.querySelector("#sub");

const operators = [
   { el: div, op: '/' },
   { el: mul, op: '*' },
   { el: sum, op: '+' },
   { el: sub, op: '-' }
]

operators.forEach((operator) => {
   operator.el.addEventListener("click", () => {
      let currentValue = Number(display.innerHTML);
      if (memory.length === 0) {
         memory.push(currentValue);
      }
      if (memory.length === 2 && selectedOperator !== null) {
         memory.pop();
         selectedOperator.classList.remove("selected");
      }
      if (memory.length === 2 && selectedOperator === null) {
         equalHandler();
         currentValue = Number(display.innerHTML);
         memory.push(currentValue);
      }

      memory.push(operator.op);
      operator.el.classList.add("selected");
      selectedOperator = operator.el;


      console.log(memory);
   });
});

//========== EQUAL ==============
const equal = document.querySelector("#equal");
equal.addEventListener("click", equalHandler);
