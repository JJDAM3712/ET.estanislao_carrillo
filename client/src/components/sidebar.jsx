/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import styled from "styled-components";
import logo from"../assets/img/logo.jpg";
import { v } from "../css/Variables";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../App";
import {
  AiOutlineMenuFold,
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineProfile,
  AiOutlineForm,
} from "react-icons/ai";
import {
  PiUsersFourFill,
  PiBankBold,
  PiUsersFill,
} from "react-icons/pi";
import {
  MdInventory,
  MdLogout,
  MdCategory,
} from "react-icons/md";
import { useAuth } from "../auth/AuthProvided";

// #region Sidebar
export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { setTheme, theme } = useContext(ThemeContext);
  const CambiarTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };
  // Utiliza el hook useAuth para acceder a la función logout
  const { logout } = useAuth();

  // Función para manejar el clic en el botón "Salir"
  const handleLogoutClick = () => {
    logout(); // Llama a la función logout de tu contexto
    localStorage.removeItem('token'); // Limpia el token del almacenamiento local
    window.location.href = '/'; // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <Container isOpen={sidebarOpen} themeUse={theme}>
      <div className="Logocontent">
        <div className="imgcontent">
            <img src={logo} alt="" width="150px"/>
        </div>
      </div>
      <button className="Sidebarbutton" onClick={ModSidebaropen}>
        <AiOutlineMenuFold />
      </button>
      {/* aqui etan todos los links del menú principal */}
      {linksArray.map(({ icon, label, to }) => (
        
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
          >
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
      <Divider />
      <div className="LinkContainer">
        <div onClick={handleLogoutClick} className="Links">
          <div className="Linkicon"><MdLogout /></div>
          {sidebarOpen && <span>Salir</span>}
        </div>
      </div>
      <Divider />
    </Container>
  );
}
// #endregion
// #region LINKS
const linksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/app/home",
  },
  {
    label: "Profesores",
    icon: <PiUsersFourFill />,
    to: "/app/profesores",
  },
  {
    label: "Estudiantes",
    icon: <AiOutlineTeam />,
    to: "/app/estudiantes",
  },
  {
    label: "Notas",
    icon: <AiOutlineProfile />,
    to: "/app/notas",
  },
  {
    label: "Materias",
    icon: <AiOutlineForm />,
    to: "/app/materias",
  },
 
  {
    label: "Menciones",
    icon: <MdCategory />,
    to: "/app/menciones",
  },
  {
    label: "Clases",
    icon: <PiBankBold />,
    to: "/app/clases",
  },
  {
    label: "Evaluacion",
    icon: <AiOutlineForm />,
    to: "/app/evaluacion",
  },
 
];

//#region STYLED COMPONENTS
const Container = styled.div`
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  position: sticky;
  padding-top: 20px;
  .Sidebarbutton {
    position: absolute;
    top: 0px;
    right: -18px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.theme.bgtgderecha};
    box-shadow: 0 0 4px ${(props) => props.theme.bg3},
      0 0 7px ${(props) => props.theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
    border: none;
    letter-spacing: inherit;
    color: inherit;
    font-size: inherit;
    text-align: inherit;
    padding: 0;
    font-family: inherit;
    outline: none;
    svg {
      color: ${(props) => props.theme.text};
    }
  }
  .Logocontent {
    display: flex;
    justify-content: center;
    width: ${({ isOpen }) => (isOpen ? `100%;` : `80%;`)};
    align-items: center;
    padding-bottom: ${v.lgSpacing};
    .imgcontent {
      display: flex;
      svg {
        max-width: 100%;
        height: auto;
        .letraLogo {
          fill: ${(props) => props.theme.text};
        }
      }
      transition: all 0.3s;
      transform: ${({ isOpen }) => (isOpen ? `scale(0.7)` : `scale(1.3)`)};
    }
    h2 {
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
    }
  }
  .LinkContainer {
    margin: 8px 0;

    padding: 0 15%;
    :hover {
      background: ${(props) => props.theme.bg3};
    }
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing}-2px) 0;
      color: ${(props) => props.theme.text};
      height: 50px;
      .Linkicon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;
        // ESTILOS DE LOS ICONOS
        svg {
          font-size: 25px;
        }
      }
      &.active {
        .Linkicon {
          svg {
            color: ${(props) => props.theme.bg4};
          }
        }
      }
    }
  }
  .Themecontent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-bottom: 1rem;
    .titletheme {
      display: block;
      padding: 10px;
      font-weight: 700;
      opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
      transition: all 0.3s;
      white-space: nowrap;
      overflow: hidden;
    }
    .Togglecontent {
      margin: ${({ isOpen }) => (isOpen ? `auto 40px` : `auto 15px`)};
      width: 36px;
      height: 20px;
      border-radius: 10px;
      transition: all 0.3s;
      position: relative;
      .theme-container {
        background-blend-mode: multiply, multiply;
        transition: 0.4s;
        .grid {
          display: grid;
          justify-items: center;
          align-content: center;
          height: 100vh;
          width: 100vw;
          font-family: "Lato", sans-serif;
        }
        .demo {
          font-size: 1.78rem;
          .switch {
            position: relative;
            display: inline-block;
            width: 4rem;
            height: 2rem;
            .theme-swither {
              opacity: 0;
              width: 0;
              height: 0;
              &:checked + .slider:before {
                left: 4px;
                content: "🌑";
                transform: translateX(26px);
              }
            }
            .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: ${({ themeUse }) =>
                themeUse === "light" ? v.lightcheckbox : v.darkcheckbox};

              transition: 0.4s;
              &::before {
                position: absolute;
                content: "☀️";
                height: 0px;
                width: 0px;
                left: -10px;
                top: 16px;
                line-height: 0px;
                transition: 0.4s;
              }
              &.round {
                border-radius: 34px;

                &::before {
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin: ${v.smSpacing} 0;
`;
// #endregion
