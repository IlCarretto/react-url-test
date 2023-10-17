import React, {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import './App.css';
import { IColorEnum, ISizeEnum, ColorEnum, SizeEnum } from './schema';
import { ZodError } from 'zod';


function App() {
  const colorsVars = ['red', 'blue', 'green'];
  const sizesVars = ['xs', 's', 'md', 'l', 'xl'];

  const [searchParams, setSearchParams] = useSearchParams();
  
  let selectedColor: IColorEnum = localStorage.getItem('selectedColor') as IColorEnum || 'red';
  let selectedSize: ISizeEnum = localStorage.getItem('selectedSize') as ISizeEnum || 'md';

  if (searchParams.get('color')) {
    try {
      selectedColor = ColorEnum.parse(searchParams.get('color'));
    } catch (err) {
      if (err instanceof ZodError)
        console.error('Errore di validazione per il colore:', err.message);
        selectedColor = 'red';
    }
  }
  
  if (searchParams.get('size')) {
    try {
      selectedSize = SizeEnum.parse(searchParams.get('size'));
    } catch (err) {
      if (err instanceof ZodError)
      console.error('Errore di validazione per la dimensione:', err.message);
      selectedSize = 'md'; 
    }
  }

  useEffect(() => {
    localStorage.setItem('selectedColor', selectedColor);
  }, [selectedColor])
  
  useEffect(() => {
    localStorage.setItem('selectedSize', selectedSize);
  }, [selectedSize])

  const handleColorButtonClick = (color: string) => {
    localStorage.setItem('selectedColor', color);
    setSearchParams({ color: color, size: selectedSize});
  }

  const handleSizeButtonClick = (size: string) => {
    localStorage.setItem('selectedSize', size);
    setSearchParams({ color: selectedColor, size: size});
  }

  return (
    <div className="App">
      <div className="product">
        <div className="_image">
          <img
           src={`/t-shirt-${selectedColor}.jpg`} 
           alt="Product" />
        </div>
        <div className="_description">
          <h1>Simple T-Shirt</h1>
          <span className='_price'>$20.00 USD</span>
          <div className="_colors mt-3">
          <h4 className='category-title mb-2'>COLOR</h4>
            {colorsVars.map((color, i) => (
              <button 
              type='button' 
              key={i} 
              className={`${selectedColor === color && 'active'}`}
              onClick={() => handleColorButtonClick(color)}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </button>
            ))}
          </div>
          <div className="_sizes mt-3">
            <h4 className='category-title mb-2'>SIZES</h4>
            {sizesVars.map((size, i) => (
              <button type='button' key={i} className={`${selectedSize === size && 'active'}`} onClick={() => handleSizeButtonClick(size)}>
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
