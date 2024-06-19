import styles from "./Header.module.css"
import {ReactNode} from "react";
type HeaderProps = {
    textContent?: string | ReactNode;
    positionTop: number;
    leftItem?: ReactNode;
    rightItem?: ReactNode;
}

export function Header({textContent, positionTop, leftItem, rightItem}: HeaderProps){


    return(
        <div className={styles.page_header_wrapper}>
            <div className={styles.item}>
                {leftItem}
            </div>
            <h1 className={styles.page_header} style={{top: positionTop + "%"}}>{textContent}</h1>
            <div className={styles.item}>

                {rightItem}
            </div>

        </div>

    )
}
