
import { NavigationPanel } from "."

import WelcomeBanner from "../components/WelcomeBanner/WelcomeBanner"
import Header from "../layout/Header"


const Home = () => {
  return (
    <div>
        <Header />
        <WelcomeBanner/>
        <NavigationPanel />
        
        
    </div>
  )
}

export default Home