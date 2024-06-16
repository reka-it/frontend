import styles from "./IntroSchrimp.module.css"
import { ReactComponent as ShrimpImage } from '../../resources/shrimp.svg';
import React from 'react';

export function IntroShrimp() {
    const introShrimpAmount = 10;
    const introShrimpColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'magenta', 'lime'];
    const introShrimpSize = 12; // vw
    const introShrimpOverlap = -0.25; // % of shrimp size the shrimp can overlap the image
    const introShrimpMargin = (1 / 2 + introShrimpOverlap) * introShrimpSize; // vw from the edge of the parent element
    const introShrimpRandom = 5; // % of parent size the shrimp can be randomly offset in each direction

    const seed = Math.random();
    const shrimps = Array.from({ length: introShrimpAmount }).map((_, index) => {
        // Calculate the placement of the shrimp. The 'placement' is relative to the wrapper size and the 'offset' is relative to the shrimp size itself.
        let topPlacement, leftPlacement;
        const randomPlacement = (Math.random() * 2 - 1) * introShrimpRandom;

        if (index % 2 === 0) { // Every second shrimp is on the sides
            topPlacement = (index % (introShrimpAmount / 2)) * 2 / introShrimpAmount * 100; // Evenly spaced vertically
            leftPlacement = (index > introShrimpAmount / 2) ? introShrimpMargin + randomPlacement : 100 - introShrimpMargin + randomPlacement; // Alternating sides
        } else { // Every other shrimp is on the top
            topPlacement = introShrimpMargin + randomPlacement; // Fixed spacing from the top
            leftPlacement = index / introShrimpAmount * (100 - 2 * introShrimpMargin) + introShrimpMargin; // Evenly spaced horizontally
        }

        const topOffset = introShrimpSize / 2; // Centered vertically and randomly offset
        const leftOffset = introShrimpSize / 2; // Centered horizontally and randomly offset

        // Calculate the shrimp color and rotation
        const shrimpColor = introShrimpColors[(index + Math.floor(seed * introShrimpColors.length)) % introShrimpColors.length];
        const shrimpRotation = 360 * (seed + index / introShrimpAmount);

        // Return a shrimp image with the calculated styles
        return (
            <ShrimpImage
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
        );
    });

    return (
        <div className={styles.intro_shrimp_container}>
            {shrimps}
        </div>
    );
}
