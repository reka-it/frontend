import styles from "./Header.module.css"
type HeaderProps = {
    textContent: string;
    positionTop: number;
}

export function Header({textContent, positionTop}: HeaderProps){


    return(
        <h1 className={styles.page_header} style={{top: positionTop + "%"}}>{textContent}</h1>
    )
}
