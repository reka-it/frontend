import React, { useEffect, useRef } from 'react';
import { Navbar } from '../../navbar';
import { Map } from './map';
import introImage from '../../../resources/REKA_22.jpg';
import backgruond from '../../../resources/background_shrimp.png';
import { ReactComponent as ShrimpImage } from '../../../resources/shrimp.svg';
import './Home.css';


// ---------------------------------------- //
//           Shrimp on intro card           //
// ---------------------------------------- //
const introShrimpAmount = 10;
const introShrimpColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'magenta', 'lime'];
const introShrimpSize = 12; // rem
const introShrimpOverlap = -0.25; // % of shrimp size the shrimp can overlap the image
const introShrimpMargin = (1 / 2 + introShrimpOverlap) * introShrimpSize; // rem form the edge of the parent element
const introShrimpRamdom = 5; // % of parrent size the shrimp can be randomly offset in each direction

const seed = Math.random();
const introShrimp = (
  Array.from({ length: introShrimpAmount }).map((_, index) => 
    {  
    // Calculate the placement of the shrimp. The 'placement' is relative to the wrapper size and the 'offset' is relative to the shrimp size itself.
    let topPlacement, leftPlacement, topOffset, leftOffset;
    const randomPlacement = (Math.random() * 2 - 1) * introShrimpRamdom;

    if (index % 2 === 0) { // Every second shrimp is on the sides
      topPlacement = ( index % (introShrimpAmount / 2) ) * 2 / introShrimpAmount * 100; // Evenly spaced vertically
      leftPlacement = ( index > introShrimpAmount / 2 ) ? introShrimpMargin + randomPlacement : 100 - introShrimpMargin + randomPlacement; // Alternating sides
    } else { // Every other shrimp is on the top
      topPlacement = introShrimpMargin + randomPlacement; // Fixed spacing from the top
      leftPlacement = index / introShrimpAmount * (100 - 2 * introShrimpMargin) + introShrimpMargin; // Evenly spaced horizontally
    }
    topOffset = introShrimpSize * 1/2; // Centered vertically and randomly offset
    leftOffset = introShrimpSize * 1/2; // Centered horizontally and randomly offset

    // Calculate the shrimp color and rotation
    const shrimpColor = introShrimpColors[(index + Math.floor(seed * introShrimpColors.length)) % introShrimpColors.length];
    const shrimpRotation = 360 * ( seed + index / introShrimpAmount );

    // Return a shrimp image with the calculated styles
    return <ShrimpImage 
      className='intro-card-shrimp' 
      key={index} 
      style={{
        width: `${introShrimpSize}vw`,
        fill: shrimpColor,
        transform: `rotate(${shrimpRotation}deg)`,
        top: `calc(${topPlacement}% - ${topOffset}vw)`,
        left: `calc(${leftPlacement}% - ${leftOffset}vw)`,
      }} 
      tabIndex={-1}
    />
    }
  )
);

// ---------------------------------------- //
//               Contact info               //
// ---------------------------------------- //
type ContactInfo = {
  value: string;
  href?: string;
}


const contactInfo: ContactInfo[] = [
  {
    value: 'kontakt@reka.no',
    href: 'mailto:kontakt@reka.no',
  }, {
    value: '+47 999 99 999',
    href: 'tel:+4799999999'
  }
];

const contactInfoElements = contactInfo.map((info, index) => (
    <a 
      className='contact-item' 
      key={index} 
      href={info.href}
      target='_blank'
      rel='noreferrer noopener'
    >
      {info.value}
    </a>
));

// ---------------------------------------- //
//                Home page                 //
// ---------------------------------------- //
export function Home() {
  return (
    <div>

      <div className='backgruond'><img className='backgruond-img' src={backgruond} alt="Backgruond" /></div>
      <div className='intro-card'>
        <img className='intro-card-img' src={introImage} alt="Reka 2022" />
        {introShrimp}
      </div>

      <Navbar elements={[<div>Arangement</div>, <div>Hype</div>, <div>Kart</div>]} />

      <div className='page-content'> 

        <div className='header'>Kart</div>
        <div className='map-container'>
          <Map/>
        </div>
        
        <p style={{ height: '200vh' }}>Hello REKAAA</p>
      </div>
  
      <div className='footer'>
        <div className='footer-content'>
          <div className='contact'>
            {contactInfoElements}
          </div>
          <div className='partners'>
            <div className='partner-item'>Equinor pls bby</div>
            <div className='partner-item'>Equinor pls bby</div>
            <div className='partner-item'>Equinor pls bby</div>
          </div>
        </div>
      </div>

    </div>
  );
}
