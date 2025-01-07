import { useState } from 'react'
import { create, all } from 'mathjs';



const math = create(all);

export default function Calculator(){
    const [input, setInput] = useState('')  // manage input value
    const [hasError, setHasError] = useState(false) // manage error condition

    const handleClick = (value) => () => {
      if (hasError) {
        setInput(value);
        setHasError(true);
      } else {
        const lastChar = input.slice(-1);
        const operators = ['+', '-', '*', '/', '.'];
        if (operators.includes(value) && operators.includes(lastChar)) {
            return;
        }
        setInput(input + value);
      }
    }

    function calculate() {
      try {
        const result = math.evaluate(input);
        if (!isFinite(result)){
          setHasError(true)
          setInput("Error")
        } else {
          setInput(result.toString())
        }


      } catch(e) {
        setHasError(true);
        setInput("Error");
      }
    }

    function backspace() {
      if (hasError) {
        setInput("")
      } else {
        setInput(input.slice(0, -1));
      }
    }

    function clear() {
      setInput("");
      setHasError(false);
    }

    const buttons = [ 
      {label: "(", action: null}, 
      {label: ")", action: null}, 
      {label: "AC", action: clear},
      {label: "DEL", action: backspace},
      {label: "7", action: null},
      {label: "8", action: null},
      {label: "9", action: null},
      {label: "/", action: null},
      {label: "4", action: null},
      {label: "5", action: null},
      {label: "6", action: null},
      {label: "*", action: null},
      {label: "1", action: null},
      {label: "2", action: null},
      {label: "3", action: null},
      {label: "-", action: null},
      {label: "0", action: null},
      {label: ".", action: null},
      {label: "=", action: calculate},
      {label: "+", action: null},
  ];

    return (
        <>
        
        <nav className="flex items-center justify-center px-4 py-2">
          <div className="flex items-center gap-2">
            <img 
              src="/calculator.png" 
              className="w-10 h-10 flex-shrink-0"
              alt="Calculator icon"
            />
            <h1 
              className=" text-5xl ml-2 font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Calculator
            </h1>
          </div>
        </nav>

        <div className="flex justify-center items-center min-h-[800px] mt-14"> {/* Calculator Container*/}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-[500px] min-h-fit"> {/* Calculator Box */}
            <div 
              className="bg-gray-200 m-11 h-16 p-4"> {/* Input Text Area */}
              <p className="text-right text-2xl font-mono overflow-x-auto whitespace-nowrap">
                {input}
              </p>
            </div>
            
            <div className="grid grid-cols-4 gap-4">  {/* Button */}
              {buttons.map(button => (
                <button 
                  key={button.label}
                  onClick={button.action ? button.action : handleClick(button.value || button.label)}
                  className={`
                    p-4 text-lg rounded-lg transition-all
                    ${button.label === "=" 
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : button.label === "AC" || button.label === "DEL"
                            ? "bg-red-100 hover:bg-red-200 text-red-600"
                            : button.label === "(" || button.label === ")"
                                ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                                : isNaN(button.label) && button.label !== "."
                                    ? "bg-gray-100 hover:bg-gray-200 text-blue-600"
                                    : "bg-gray-50 hover:bg-gray-100"
                    }
                `}>
                  {button.label}
                </button>
              ))}

            </div>
            
          </div>
        </div>    
        </>
    )
}

