
import * as CSS from 'csstype';

export interface ICardProps {
    imgSrc: string | Array<string>,
    title: string,
    location?: string,
    description?: string,
    onClick?: (e?) => void,
    horizontal?: boolean,
    curateSidebar?:boolean,
    address?: string,
    lenghts?: string,
    isLoggedIn?: boolean,
    className?: string,
    event?: boolean,
    noBorder?: boolean,
    isLive?: boolean,
    moderatedBy?: string,
    timeLine?: string,
    handleRegister?: () => void,
    handleUnRegister?: () => void,
    registered?: boolean,
    course?: boolean,
    courseName?: string,
    defaultEvent?: boolean,
    toggleRegister?: () => void,
    subTitle?: string,
    style?: CSS.Properties,
    noFade?: boolean,
}
