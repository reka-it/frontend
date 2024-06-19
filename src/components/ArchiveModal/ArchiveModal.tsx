import styles from "./ArchiveModal.module.css"
import {ArchiveContent} from "../../pages/home/archive-content";
import {PageSection} from "../PageSection/PageSection";
import {Header} from "../Header/Header";
import {useModal} from "../../context/ModalContextProvider";
import {Icon} from "@iconify/react";

type ArchiveModalProps = {
    data: ArchiveContent;
    exportIsModalOpen: (isModalOpen: boolean) => void;
}

export function ArchiveModal({ exportIsModalOpen, data}:ArchiveModalProps){
    const {isModalOpen, setIsModalOpen} = useModal();

    const handleClose = () => {
        const newState = !isModalOpen;
        setIsModalOpen(newState);
        exportIsModalOpen(newState);
    }

    return(
        <div className={styles.archive_modal_background}>
            <Header textContent={data.archiveHeader} positionTop={100}/>
            <button className={styles.archive_close_buttons} onClick={handleClose}>
                <Icon icon={"carbon:close-outline"} width={"2rem"} color={"black"}></Icon>
            </button>

            <div className={styles.archive_container}>
                {
                    data.archiveSubSections && (
                        data.archiveSubSections.map((item, index) => {
                            return (
                                <PageSection content={item} key={index}/>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}
