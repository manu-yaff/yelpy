import { FunctionComponent } from "react";
import style from './Layout.module.scss';

interface IProps {
  children?: React.ReactNode;
}

const Layout: FunctionComponent<IProps> = ({ children }) => {
  return <div className={style['layout']}>{children}</div>;
};

export default Layout;
