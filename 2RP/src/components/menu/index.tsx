import { useState} from "react";
import './styles.css';
import MenuIcon from '@mui/icons-material/Menu';


export const Home = () =>{


    return(
        <section>
        <img src="https://www.2rpnet.com.br/assets/images/2rp-net.svg" alt="logo" />
        <MenuIcon sx={{ fontSize: 60 }}  color="primary"/>
        </section>
    );
    }
    export default Home