import {card_img_21, card_img_22, reka_map_24} from "../../resources";
import {reka_1912} from "../../resources/archive";
import {ReactNode} from "react";
import {Lineup} from "../../components/Lineup"
import {LineupProps} from "../../components/Lineup/Lineup";

export type subcontinentType = {
    title: string;
    description: string;
    image: string;
    dataRef?:string;
}

export const historyItemData: subcontinentType[] = [
    {
        title: 'REKA 2023',
        description: 'Dette var en fantastisk REKA!',
        image: card_img_22,
        dataRef: "archive-2023",
    }, {
        title: 'REKA 2022',
        description: 'REKA-22 var en to-dagers begivenhet fylt med lek og kulturelle innslag. Det hele ble startet med en ' +
            'spektakulær åpningssermoni med REKE-sjef ridende på både reke og sekshjuling. ',
        image: card_img_22,
        dataRef: "archive-2022",
    }, {
        title: 'REKA 2021',
        description: 'REKA-21 strakte seg fra lørdag til mandag og ble sparket i gang med en duft av ferske reker som spredte seg over hele Sælbu.' +
            'Arrangementet inneholdt et bredt spekter av aktiviteter, fra bading og grilling til kulturelle innslag.',
        image: card_img_21,
        dataRef: "archive-2021",
    },
    {
        title: 'REKA 1912',
        description: 'REKA 1912 var den aller første REKA-festivalen, men også den kaldeste. Sannsyligvis ble det BARIS, ' +
            'til tross for den bitende kulden. Fem år senere ble en annen kulturell festival, UKA, stiftet. ',
        image: reka_1912,
    }
];

export type PageItemContent = {
    header: string;
    textItem?: string;
    image?: string;
    subContent?: subcontinentType[];
    dataRef?: string;
    sectionRef?: string;
    children?: ReactNode;
}

const LineupData: LineupProps = {
    artists: [
        {name: "Strikk & drikk"},
        {name: "Slipp & slide"},
        {name: "Rafting"},
        {name: "Livepod"},
        {name: "Revy"},
        {name: "Bading"},
        {name: "Yoga"},
        {name: "Gallamiddag"},
        {name: "Ølympics"},
        {name: "Karaokebattle"},
        {name: "Konserter"},
        {name: "Trønderrock"},

    ],
    fullDate: "23. - 25. August",
    place: "Sognlia",

}

export const pageItemsData: PageItemContent[] = [
    {
        header: "Festivalkart 2024",
        textItem: "REKA 2024 finner sted på Sognlia i Orkdal",
        image: reka_map_24,
        sectionRef: "reka-2024-map"
    },
    {
      header: "Program 2024",
        children: <Lineup artists={LineupData.artists} fullDate={LineupData.fullDate} place={LineupData.place} />,
        sectionRef: "reka-2024-program"
    },
    {
        header: "Her kan du se tidligere REKA festivaler",
        subContent: historyItemData,
        sectionRef: 'reka-24-archive',
    }
]
