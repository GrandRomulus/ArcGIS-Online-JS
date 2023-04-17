// Declaring variables for layer change storage
let layersChanged = "";

// Prompt to capture what users wants to change
const newName = prompt("What part of the layer name would you like to delete?");

// Function that opens 'Rename' menu for layer
function openRenameTextbox(layer){
    const button = layer.querySelector('.esri-layer-list__item-action[title="Rename"]');
    button.dispatchEvent(new MouseEvent('click'));
}

// Function that deletes input string which is passed into 'newName'
function changeLayerString(list, newName) {
    const textbox = list.querySelector('.esri-input[data-node-ref="editInputNode"]');
    const currentValue = textbox.value;
    const index = currentValue.indexOf(newName);
    
    if (index !== -1) {
      layersChanged += currentValue + '\n';
      const newValue = currentValue.slice(0, index) + currentValue.slice(index + newName.length);
      textbox.value = newValue;
  }
}

// Function that submits what is in the textbox
function submitNewNameString(list){
    const okButton = list.querySelector('.esri-button[type="submit"]');
    okButton.click();
}

// Declaring layerList variable for forEach loop
const layerList = document.querySelectorAll('.esri-layer-list__item');

// Loop that loops through layer list to open all layer name inputs
layerList.forEach((layer) => {
  try {
    openRenameTextbox(layer);
  } catch (error) {
    if (error instanceof TypeError) {
      // Ignore TypeError and move on to the next iteration
      return;
    } else {
      // Handle other types of errors as needed
      console.error(error);
    }
  }
});

// Delay declaration of variable to capture class values for layer name change and forEach loop
setTimeout(() => {
  const inputList = document.querySelectorAll('.esri-title__authoring-form');

  // Loop that loops through input list to perform name change and submition
  inputList.forEach((list) => {
      changeLayerString(list, newName);
      submitNewNameString(list);
  });
  alert("Layer changed:\n" + layersChanged)
}, 1000); // Delay in milliseconds (2 seconds in this example)

    
    
    
