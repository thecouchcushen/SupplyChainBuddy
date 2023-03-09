import React, { useState } from 'react';

//CHATGPT RESPONSE ON HOW TO ADD NEW LINES AUTOMATICALLY TO FORM TO BE INTEGRATED TO SKUFORM FOR BOM

function Form() {
  const [inputs, setInputs] = useState(['']);
  
  function handleInputChange(index, value) {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    
    if (value !== '' && index === inputs.length - 1) {
      // Add a new input if the last input has been filled out
      setInputs([...inputs, '']);
    }
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    // Do something with the inputs
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((value, index) => (
        <input
          key={index}
          value={value}
          onChange={(event) => handleInputChange(index, event.target.value)}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
