// Function that opens 'Rename' menu for layer
function openRenameTextbox(layer){
    const button = layer.querySelector('.esri-layer-list__item-action[title="Rename"]');
    button.dispatchEvent(new MouseEvent('click'));
}

// Function that deletes input string which is passed into 'newName'
function changeLayerString(list, newName) {
    const textbox = list.querySelector('.esri-input[data-node-ref="editInputNode"]');
    const currentValue = textbox.value.toLowerCase();;
    const index = currentValue.indexOf(newName);
    
    if (index !== -1) {
      const newValue = currentValue.slice(0, index) + currentValue.slice(index + newName.length);
      textbox.value = newValue;
      alert("Layer change for '" + currentValue + "' was successful.");
    } else {
      alert("No match. The layer '" + currentValue + "' did not contain '" + newName + "'. Try again.")
    }
  }

// Function that submits what is in the textbox
function submitNewNameString(list){
    const okButton = list.querySelector('.esri-button[type="submit"]');
    okButton.click();
}

// Declaring layerList variable for forEach loop
const layerList = document.querySelectorAll('.esri-layer-list__item');

const newName = prompt("What part of the layer name would you like to delete?").toLowerCase();

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
}, 1000); // Delay in milliseconds (2 seconds in this example)



  
