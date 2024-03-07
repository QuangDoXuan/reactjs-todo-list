import { PropsWithChildren } from "react"
import { Header } from "../Header/Header"
import './_index.scss';

const Layout = ({ children }: PropsWithChildren) => {
    return (
      <div className="app-container">
        <Header/>
        {children}
      </div>
    )
  }
  
export default Layout