import introImage from '../../resources/REKA_22.jpg';
import styles from './Home.module.css';
import { pageItemsData} from "./home-content";
import { PageSection } from '../../components/PageSection/PageSection';
import {Page} from "../../components/Page/Page"
import {IntroShrimp} from "../../components/IntroShrimp/IntroShrimp";
import {Header} from "../../components/Header/Header";
import {useNavigation} from "../../context/NavigationContext";
import {useEffect} from "react";

export function Home() {
    const { targetSection, setTargetSection } = useNavigation();
    useEffect(() => {
        if (targetSection) {
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            setTargetSection(null);
        }
    }, [targetSection, setTargetSection]);

    return (
        <Page>
            <div className={styles.intro_card}>
                <img className={styles.intro_card_img} src={introImage} alt="Reka 2022"/>
                <IntroShrimp/>
            </div>
            <Header textContent={"REKA - 24"}/>
            <div className={styles.page_content}>
                {pageItemsData.map((item, index) =>
                    <PageSection content={item} key={index}/>
                )}
            </div>
        </Page>
    );
}
