# Finite-Automata-Editor
Web application for creating and testing finite automata.

This web app is used to create, edit, and test finite automata.
The app starts with a pre-built FA which accepts binary strings that begin and end with the same symbol.

<h2>Testing FA's</h2>

To test an FA, enter an input string into the text field at the bottom of the screen, and then click the "Set Input String Button".
This will display the entered string next to the input label and highlight the start state on the canvas.
The user can then press the "Step" button on the left panel of the control bar to advance the FA by one symbol.
Doing so will highlight the symbol on the input string, as well as the state(s) the FA is currently in and the transition(s) it took to get there.
Once the FA has advanced past the final input symbol, a message will be displayed next to the status label stating whether the string is accepted or rejected by the FA.
At this point, the user can click the "Reset" button on the left panel to restart the test on the same string, or enter a new string to test.
Instead of manually stepping through the string, the user can click the "Auto-Step" button to automatically step the string with the chosen speed.
Pressing the "Pause" button will stop this feature.

<h2>Creating and Editing FA's</h2>

<h3>Saving and loading files</h3>

To start creating a new FA, click the "New FA" button on the right panel of the control bar.
This will prompt the user to confirm before clearing the current FA from the canvas.
The user may save the current FA by clicking the "Save FA" button on the right panel.
This will prompt the user to download a text file containing the structure of the current FA.
The user can load previously saved FA's by first clicking the "Choose File" button on the right panel and uploading the text file,
and then clicking the "Load FA" button.

<h3>Creating components</h3>

To add a new state, right-click on an empty space on the canvas and click the "Add State" option from the context menu.
Enter a label for the state (this is a unique, case-sensitive identifier for the state) and choose if this state should be an accept state and/or start state.
Once a state has been created, it can be right-clicked to bring up a context menu with options to add a transition to this state, change this state's acceptance,
set this as the start state, or delete this state.
The "Add Transition" option will create a transition starting from this state and leading to the state with the provided label.
Each transition must have at least one symbol, but multiple comma-separated symbols can be entered (note that 'e' is reserved as the epsilon transition,
which will cause the FA to follow this transition without consuming any input symbols).
Once a symbol is created, its symbol can be right-clicked to delete the transition.

<h3>Moving components on the canvas:</h3>

Single components (states or transition symbols) can be moved around the canvas by clicking and dragging them.
Moving a transition symbol will also alter the curvature of the transition. 
Components can be group-selected by clicking and dragging on an empty canvas space to create a selection box around them.
After releasing the mouse with the selection box containing all desired components, hold the left control key on the keyboard and click and drag the components around.
Alternatively, hold the left control key on the keyboard and click on individual components to add them to the group.
While still holding the control key, click and drag anywhere on the canvas to move the selected components around.


