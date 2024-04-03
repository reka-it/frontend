import React, { useRef } from 'react';
import { Navbar } from '../../navbar';
import { Map } from '../../map';
import introImage from '../../../resources/REKA_22.jpg';
import backgruond from '../../../resources/background_shrimp.png';
import { ReactComponent as ShrimpImage } from '../../../resources/shrimp.svg';
import styles from './Home.module.css';


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
      className={styles.intro_card_shrimp}
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
      className={styles.contact_item}
      key={index} 
      href={info.href}
      target='_blank'
      rel='noreferrer noopener'
    >
      {info.value}
    </a>
));

// ---------------------------------------- //
//                 Historie                 //
// ---------------------------------------- //
type HistoryItem = {
  title: string;
  description: string;
  image: string;
}

const historyItems: HistoryItem[] = [
  {
    title: 'Reka 2021',
    description: 'Dette var en fantastisk reka! Vi hadde det så gøy at vi glemte å ta bilder...',
    image: '',
  }, {
    title: 'Reka 2020',
    description: 'Dette var en fantastisk reka! Vi hadde det så gøy at vi glemte å ta bilder...',
    image: '',
  }, {
    title: 'Reka 2019',
    description: 'Dette var en fantastisk reka! Vi hadde det så gøy at vi glemte å ta bilder...',
    image: '',
  }
];

// ---------------------------------------- //
//                Home page                 //
// ---------------------------------------- //
export function Home() {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div>

      <div className={styles.backgruond}><img className={styles.backgruond_img} src={backgruond} alt="Backgruond" /></div>
      <div className={styles.intro_card}>
        <img className={styles.intro_card_img} src={introImage} alt="Reka 2022" />
        {introShrimp}
      </div>

      <Navbar elements={[
        {inner: <div>Program</div>},
        {inner: <div>Hype</div>},
        { 
          inner: <div>Kart</div>,
          action: (e: React.MouseEvent) => {
            e.preventDefault();
            mapRef.current?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start'
            });
          }
        }
      ]}/>

      <div className={styles.page_content}> 

        <div className={styles.page_item}>
          <div className={styles.page_header}>Hva for noe er egt reka?</div>
          <p>Reka er verdens beste kulturfestival av og for frivillige. Det har blitt er en årlig tradisjon at vi samles for å spise reker, drikke øl og ha det gøy. Vi har også en rekke aktiviteter, konkurranser og underholdning som vi gleder oss til å dele med deg! Føl viberasjonene med dette reke spillet:</p>
          <div>Rekefisking kommer!</div>
        </div>

        <div className={styles.page_item}>
          <div className={styles.page_header}>Noe av det vi har kost oss med!</div>
          <div className={styles.history_container}>
            {historyItems.map((item, index) => 
              <div className={styles.history_item} key={index}>
                <div className={styles.history_title}>{item.title}</div>
                <div className={styles.history_description}>{item.description}</div>
                <img className={styles.history_image} src={item.image} alt={item.title} />
              </div>
            )}
          </div>
        </div>

        <div className={styles.page_item}>
          <div className={styles.ref_anchor} ref={mapRef}></div>
          <div className={styles.page_header}>Gått deg bort? Følg reke lukten!</div>
          <div className={styles.map_container}>
            <Map/>
          </div>
        </div>

      </div>
  
      <div className={styles.footer}>
        <div className={styles.footer_content}>
          <div className={styles.contact}>
            {contactInfoElements}
          </div>
          <div className={styles.partners}>
            <div className={styles.partners_item}>Equinor pls bby</div>
            <div className={styles.partners_item}>Equinor pls bby</div>
            <div className={styles.partners_item}>Equinor pls bby</div>
          </div>
        </div>
      </div>

    </div>
  );
}
