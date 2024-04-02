import { useState } from "react";
import './ShrimpFishing.css';

type Shrimp = {
  index: number;
  offsetX: number;
  offsetY: number;
}

export function ShrimpFishing() {
  const [isFishing, setIsFishing] = useState(false);
  const [shrimps, setShrimps] = useState<Shrimp[]>([]);

  function toggleFishing() {
    console.log('toggleFishing', !isFishing);
    
    if (!isFishing) {
      generateShrimp(5);
    } else {
      clearShrimp();
    }
  }

  function generateShrimp(amount: number) {
    setIsFishing(true);
    setShrimps(Array.from({ length: amount }, (_, i) => ({
      index: i,
      offsetX: Math.random() * 70 + 15,
      offsetY: Math.random() * -150 - 50,
    })));
  }

  function clearShrimp() {
    setIsFishing(false);
    setShrimps([]);
  }

  function catchShrimp(index: number) {
    const rest = shrimps.filter(shrimp => shrimp.index !== index)
    if (rest.length === 0) {
      clearShrimp();
    } else {
      setShrimps(rest);
    }
  }

  return (
    <div>
      <div className="wrapper" onClick={e => toggleFishing()}>
        <img className="icon" src="" alt="" />
      </div>
      {isFishing && 
      <div className="fishing-area">
        {shrimps.map(shrimp => (
          <div 
            key={shrimp.index} 
            className="shrimp" 
            onClick={() => catchShrimp(shrimp.index)}
            style={{
              top: `${shrimp.offsetY}vh`,
              left: `${shrimp.offsetX}vw`
            }}
          >
            <img className="shrimp-icon" src="" alt="" />
          </div>
        ))}
        </div>}
    </div>
  );
}