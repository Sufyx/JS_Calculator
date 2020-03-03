# JS_Calculator

![demo](demo.gif)

A calculator I made using simple JavaScript.
Not a scientific one, but not a simple one either.

Brief Description:
The calculator allows multiple whole numbers and operators.
Pressing numbers or operators will create and expresssion at the top left part of the calculator's display screen.
Pressing the "equal" operator ( '=' ) will display the result at the bottom right of the calculator screen.
The application uses JavaScript's 'eval()' function to solve the expression. In order to meet that function's accepted parameters, the expression must be "legal" before an answer will be given. This is achieved by denying the user the option to create an illegal expression when possible, and disabling the '=' button unless a legal expression is on screen.
Examples of illegal expression would be two operators in a row, uneven number of ')' and '(', etc..

---
Detailed explanation for each button, as well as their limitations regarding maintening the legality of the expression. 
elaboration as to what constitutes a legal expresssion:

Numbers 1-9: The number clicked will be added to the expression, unless of the following occurs:
            -A solved expression is on screen, in which case a new expression will start with the clicked number.
            -The most recent character in the expression is a closing parenthesis ,ie ')'. In which case the click will be ignored.

Number 0: If the expression on screen is not solved and its most recent character is a number, a '0' will be added to the expression.
          In any other case the click will be ignored.

Operators (+,−,×,÷): In case an insolved expression is on screen, the clicked operator will be added to it only if its most recent                           character is a number or a closing parenthesis. Otherwise the click will be ignored.
                        In case a solved expression is on screen, start a new expression with previous (solved) expression's answer                             followed by the clicked operator.

Open parenthesis: A '(' will be added to the existing expression, with exception of the following cases:
                 -A solved expression is on screen, in which case a new one will start with a '('.
                 -The most recent character is a number or a closing parenthesis. In which case click will be ignored.

Close parenthesis: A ')' will be added to the existing expression only if all of the following conditions are met:
                  -The most recent character is a number or another closing parenthesis.
                  -The expression on screen is not solved.
                  -The existing number of opening parentheses in the expression is greater than its number of closing ones.
                  
Negative number (-x): Not a subtraction operator, but specifically used to mark a number as negative.
                      Can only follow or be followed by a number (1-9) or an open parenthesis.
                      Can also be the first character in a new expression.
                      
Delete (del): Delete the most recent character. Cannot delete off of a an expression that has been solved.

Equal: (=): Solve the existing expression on the calculator screen. Will only work if all following conditions are met:
            -Most recent character is a number (0-9) or a closing parenthesis.
            -There is an equal number of opening and closing parentheses.
            *Note: In order for the eval() function to accept the expression string, aesthetic operators such as '×' and '÷' are                      replaced with the syntactically correct counter parts ('*' and '/') behind the scenes.
            
Clear (C): Clears all input from the calculator screen.

*In any case the calculator screen will contain no more than 50 characters at a time.
