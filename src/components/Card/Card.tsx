import React, {useEffect, useState} from "react";
import styles from "./Card.module.css"
import {Icon} from "@iconify/react";
import {useModal} from "../../context/ModalContextProvider";

type CardData = {
    title: string;
    description: string;
    image: string;
    dataRef?: string;
}

type CardProps = {
    content: CardData;
    index: number;
}

export function Card({content, index}:CardProps){
    const {setDataRef, openModal} = useModal();

    const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
    return (

        <div className={styles.card_wrapper}
             onMouseOver={() => setVisibleIndex(index)}
             onMouseLeave={() => setVisibleIndex(null)}
             style={content.dataRef ? {cursor: "pointer"}:({cursor:"auto"})}
             onClick={() => {
                 if(content.dataRef) {
                     setDataRef(content.dataRef)
                     openModal();
                    }
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
