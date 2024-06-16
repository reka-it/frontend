import React, {useState} from "react";
import styles from "./Card.module.css"
import {Icon} from "@iconify/react";
import { useNavigate } from "react-router-dom";

type CardData = {
    title: string;
    description: string;
    image: string;
    navigation_target?: string;
}

type CardProps = {
    content: CardData;
    index: number;
}

export function Card({content, index}:CardProps){
    const navigate = useNavigate();

    const handleNavigate = (url: string) => {
        navigate(url);
    }

    const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
    return (
        <div className={styles.card_wrapper}
             onMouseOver={() => setVisibleIndex(index)}
             onMouseLeave={() => setVisibleIndex(null)}
             style={content.navigation_target ? {cursor: "pointer"}:({cursor:"auto"})}
             onClick={() => {
                 if(content.navigation_target) {
                     handleNavigate(content.navigation_target)}
                 }
             }
        >
            <div className={styles.card_title}>
                {content.title}
                <Icon icon="tabler:click" width={"2rem"} height={"2rem"}/>
            </div>
            {
                visibleIndex === index && (
                    <div className={styles.card_description}>
                        <p>{content.description}</p>
                    </div>
                )
            }
            <img className={styles.card_image} src={content.image} alt={content.title}/>
        </div>
    )
}
