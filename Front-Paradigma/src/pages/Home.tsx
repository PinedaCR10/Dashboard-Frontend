
import { NavigationPanel } from "../components/NativationPanel/NativationPanel"
import SummaryCards from "../components/SummaryCards/SummaryCards"
import WelcomeBanner from "../components/WelcomeBanner/WelcomeBanner"
import Header from "../layout/Header"


const Home = () => {
  return (
    <div>
        <Header />
        <WelcomeBanner/>
        <NavigationPanel />
        <SummaryCards />
        
    </div>
  )
}

export default Home