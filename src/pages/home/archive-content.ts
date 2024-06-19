import {PageItemContent} from "./home-content";
import {frontend_routes} from "../../routes/frontend";
import {
    festival_map_21,
    festival_map_22, merch_22,
    program_22, program_fri_22,
    program_mon_21,
    program_sat_21, program_sat_22,
    program_sun_21
} from "../../resources";
import {program_23} from "../../resources/archive";

export  type ArchiveContent = {
    archiveHeader: string,
    archiveDescription?: string,
    archiveSubSections?: PageItemContent[],
}

type ArchiveData = {
    [key: string]: ArchiveContent
}
const data_key = (value: string) => {
    return value.slice(1)
}

export const archivePageItems: ArchiveData = {
    [data_key(frontend_routes.archive_2021)]: {
            archiveHeader: "Arkiv REKA 2021",
            archiveSubSections: [
                {
                    header: "Festivalkart",
                    image: festival_map_21,
                },
                {
                    header: "Program Lørdag",
                    image: program_sat_21
                },
                {
                    header: "Program Søndag",
                    image: program_sun_21
                },
                {
                    header: "Program Mandag",
                    image: program_mon_21,
                }
            ]
        },
    [data_key(frontend_routes.archive_2022)]:{
        archiveHeader: "Arkiv REKA 2022",
        archiveSubSections: [
            {
                header: "Festivalkart",
                image: festival_map_22,

            },
            {
                header: "Program",
                image: program_22,
            },
            {
                header: "Program Fredag",
                image: program_fri_22,
            },
            {
                header: "Program Lørdag",
                image: program_sat_22,
            },
            {
                header: "Merch",
                image: merch_22,
                textItem: "Ikke faktisk sponset av Reitangruppen! " +
                    "Ikke lenger tilgjengelig."
            },
        ]
    },
    [data_key(frontend_routes.archive_2023)]:{
        archiveHeader: "Arkive REKA 2023",
        archiveSubSections: [
            {
                header: "Program",
                image: program_23,
            }
        ]

}
}
