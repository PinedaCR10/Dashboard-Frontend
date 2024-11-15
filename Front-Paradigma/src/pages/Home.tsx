
import { NavigationPanel } from "."
import BasicSalesDataDisplay from "../components/BasicSalesDataDisplay "
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
        <BasicSalesDataDisplay />
    </div>
  )
}

export default Home