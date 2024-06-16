import styles from "./Header.module.css"
type HeaderProps = {
    textContent: string;
}

export function Header({textContent}: HeaderProps){
    return(
        <h1 className={styles.page_header}>{textContent}</h1>
    )
}
