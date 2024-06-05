import styles from "./style.module.css";
import { useNavigate } from 'react-router-dom';
import LogoImage from "./../../images/logo.svg";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <span className={`${styles.logo}`} onClick={() => navigate("/app")}>
      <img src={LogoImage} alt="logo"/>
    </span>
  );
};

export default Logo;
