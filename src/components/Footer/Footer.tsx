import styles from "./Footer.module.css";
import React, { ReactNode } from "react";
import { Icon } from "@iconify/react";

export function Footer() {
    // ---------------------------------------- //
    //               Contact info               //
    // ---------------------------------------- //
    type ContactInfo = {
        value: string;
        href?: string;
        icon?: ReactNode;
    };

    const contactInfo: ContactInfo[] = [
        {
            value: 'E-post: reka.festivalen@gmail.com',
        },
        {
            value: "Org.nummer: 932 912 627"
        },
        {
            value: "reka_offisiell",
            href: "https://www.instagram.com/reka_offisiell/",
            icon: <Icon icon={"mdi:instagram"} width="2rem" />
        }
    ];

    const contactInfoElements = contactInfo.map((info, index) => (
        info.icon ? (
            <a
                className={styles.contact_item}
                key={index}
                href={info.href}
                target='_blank'
                rel='noreferrer noopener'
            >
                {info.icon}
                <span>{info.value}</span>
            </a>
        ) : (
            <div className={styles.contact_item} key={index}>
                {info.href ? (
                    <a
                        href={info.href}
                        target='_blank'
                        rel='noreferrer noopener'
                    >
                        {info.value}
                    </a>
                ) : (
                    <span>{info.value}</span>
                )}
            </div>
        )
    ));

    return (
        <div className={styles.footer}>
            <div className={styles.footer_content}>
                <div className={styles.contact}>
                    {contactInfoElements}
                </div>
            </div>
        </div>
    );
}
