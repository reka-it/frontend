import introImage from '../../resources/REKA_22.jpg';
import styles from './Home.module.css';
import { pageItemsData} from "./home-content";
import { PageSection } from '../../components/PageSection/PageSection';
import {Page} from "../../components/Page/Page"
import {IntroShrimp} from "../../components/IntroShrimp/IntroShrimp";
import {Header} from "../../components/Header/Header";
import {useNavigation} from "../../context/NavigationContext";
import {useEffect} from "react";
import {useModal} from "../../context/ModalContextProvider";
import {archivePageItems} from "./archive-content";
import {ArchiveModal} from "../../components/ArchiveModal/ArchiveModal";

export function Home() {
    const { targetSection, setTargetSection } = useNavigation();
    const { isModalOpen, dataRef, closeModal } = useModal();

    useEffect(() => {
        if (targetSection) {
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            setTargetSection(null);
        }
        if (isModalOpen) {
            document.body.classList.add(styles.noScroll);
        } else {
            document.body.classList.remove(styles.noScroll);
        }
    }, [targetSection, setTargetSection, isModalOpen]);

    return (
        <Page>
            <div className={styles.intro_card}>
                <img className={styles.intro_card_img} src={introImage} alt="Reka 2022"/>
                <IntroShrimp/>
                <h3>REKA er verdens beste kulturfestival, av og for frivillige.
                    Det har blitt er en årlig tradisjon at vi samles for aktiviteter,
                    konkurranser og underholdning! Sjekk ut 'HYPE' seksjonen for å se hva som har skjedd tidligere år!</h3>
            </div>
            <Header textContent={"REKA - 24"} positionTop={10}/>
            <div className={styles.page_content}>
                {pageItemsData.map((item, index) =>
                    <PageSection content={item} key={index}/>
                )}
            </div>
            {isModalOpen && <ArchiveModal data={archivePageItems[dataRef]} exportIsModalOpen={closeModal} />}
        </Page>
    );
}
