import styles from "./PageSection.module.css";
import {PageItemContent} from "../../pages/home/home-content";
import {Card} from "../Card";

type PageItemProps = {
    content: PageItemContent;
}

export function PageSection({content}:PageItemProps){
    return (
        <>

            <div className={styles.page_item}>
                <div className={styles.anchor} id={content?.sectionRef}/>
                <div className={styles.section_header}>{content.header}</div>
                {
                    content.textItem && (
                        <p>{content.textItem}</p>
                    )
                }
                {
                    content.children && (
                        content.children
                    )
                }
                {
                    content.image && (
                        <div className={styles.section_image_wrapper}>
                            <img src={content.image} alt={content.header} className={styles.section_image}/>
                        </div>
                    )

                }
                {
                    content.subContent && (
                        <div className={styles.sub_content}>
                            {content.subContent.map((item, index) =>
                                <Card content={item} index={index} key={index}/>
                            )}
                        </div>
                    )
                }
            </div>
        </>

    )
}
