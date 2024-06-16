import {Page} from "../../components/Page/Page"
import styles from "./NotFound.module.css"
import {PageSection} from "../../components/PageSection/PageSection";
import {PageItemContent} from "../home/home-content";

export function NotFound(){
    const pageData: PageItemContent = {
        header: "Whoops, siden eksistere ikke!",
    }
    return (
        <Page>
            <div className={styles.not_found_wrapper}>
                <PageSection content={pageData}/>
            </div>
        </Page>
    )
}
