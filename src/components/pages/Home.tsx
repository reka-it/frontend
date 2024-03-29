import React from 'react';
import { Navbar } from '../navbar';

export function App() {
  return (
    <div>
      <p>Velkommen til rææææka</p>
      <Navbar elements={[<div>elm1</div>, <div>elm2</div>, <div>elm3</div>]} />
      <p style={{ height: '200vh' }}>Hello REKAAA</p>
    </div>
  );
}

export default App;
