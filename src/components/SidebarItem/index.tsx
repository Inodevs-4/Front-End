import * as C from './styles';
import {Link} from 'react-router-dom';
import  {MdCardTravel, MdOutlineCalendarToday, MdPeople} from 'react-icons/md'
import { ChangeEvent } from 'react'

type Props = {
    title: string;
    description: string;
    icon: string;
    path: string;
    active: boolean; 
}



export const SidebarItem = ({title, description, icon, path, active}: Props) => {

    return(
        <C.Container>
            <Link to={path}>
                <C.Info>
                    <C.Title>{title}</C.Title>
                    <C.Description>{description}</C.Description>
                </C.Info>
                <C.IconArea active={active}>
                    {icon === "suitcase" && 
                    <MdCardTravel  size={40}/>}
                    {icon === "calendar" && 
                    <MdOutlineCalendarToday size={40}/>}
                    {icon === "people" && 
                    <MdPeople  size={40}/>}
                </C.IconArea>
                <C.Point active={active}></C.Point>
            </Link>
        </C.Container>
    )
}

export default SidebarItem;