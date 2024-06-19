import styles from "./Lineup.module.css"
import {Switch} from "../Switch/Switch";
import {useState} from "react";

type ArtistInfo = {
    name: string;
    superScript?: string;
}

export type LineupProps = {
    artists: ArtistInfo[];
    fullDate: string;
    place: string;
}

export function Lineup({artists, fullDate, place}: LineupProps){
    const [isOn, setIsOn] = useState<boolean>(false);

    const handleSwitchToggle = (state: boolean) => {
        setIsOn(state);
    };
    return (
        <>
            <div className={styles.time__date}>
                <p>{fullDate}</p>
                <p>{place}</p>
            </div>
            <Switch exportIsOn={handleSwitchToggle}/>
            <div className={styles.lineup_wrapper}>
                {artists.length > 0 && (
                    artists.map((item, index) => (
                        <div className={styles.artist_date_wrapper}>
                            <h1 className={isOn ? styles.lineup_text_shrimp : styles.lineup_text_no_shrimp}
                               key={item.name + index}>
                                {item.name}
                            </h1>
                            <span className={styles.artist}>{item.superScript}</span>
                        </div>

                    ))
                )}
            </div>
        </>
    );
}
