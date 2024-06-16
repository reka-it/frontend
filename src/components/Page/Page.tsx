import {ReactNode} from "react";
import styles from "./Page.module.css"
type PageProps = {
    children: ReactNode;
}

export function Page({children}: PageProps){
    return (
        <div className={styles.page}>
            {children}
        </div>
    )
}
