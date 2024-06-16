import styles from "./Switch.module.css";
import { useState} from "react";
import { Icon } from "@iconify/react";

type SwitchProps = {
    exportIsOn: (isOn: boolean) => void;
};

export function Switch({ exportIsOn }: SwitchProps) {
    const [isOn, setIsOn] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const handleToggle = () => {
        const newState = !isOn;
        setIsOn(newState);
        exportIsOn(newState);

        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 500);
    };

    return (
        <div className={styles.switch}>
            <input
                checked={isOn}
                onChange={handleToggle}
                type="checkbox"
                className={styles.switch_checkbox}
                id="switch-component"
                disabled={isDisabled}
            />
            <label className={styles.switch_label} htmlFor="switch-component">
                <span className={styles.switch_button}>
                    <Icon icon="ph:shrimp" width="1.2rem" color="red" />
                </span>
            </label>
        </div>
    );
}
