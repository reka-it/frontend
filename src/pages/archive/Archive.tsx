import {Page} from "../../components/Page/Page"
import {useParams} from "react-router-dom";
import {archivePageItems} from "./archive-content";
import {Header} from "../../components/Header/Header";
import {PageSection} from "../../components/PageSection/PageSection";

export function Archive(){
    const { archiveRef } = useParams();
    if(!archiveRef){
        return (
            <Page>
                <h1>Archive not found</h1>
            </Page>
        );
    }
    const content = archivePageItems[archiveRef];
    return (
        <Page>
            <Header textContent={content.archiveHeader}/>
            {
                content.archiveSubSections && (
                    content.archiveSubSections.map((item, index)=>{
                        return(
                            <PageSection content={item} key={index}/>
                        )
                    })
                )
            }
        </Page>
    )
}
