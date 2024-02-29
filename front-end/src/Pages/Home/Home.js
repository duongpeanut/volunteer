import Banner from "../../Components/Banner/Banner"
import Blog from "../Blog/Blog"
import Event from "../Event/Event"
const Home = () => {
    return (
        <div>
            <Banner />
            <h1 style={{ color: 'white', marginBottom: '-90px', padding: '10px', background: 'linear-gradient(90deg, #F2D338 0%, #F2360C 100%)' }}>Các Blogs nổi bật</h1>
            <Blog isHome={true} />
            <h1 style={{ color: 'white', marginBottom: '-90px', padding: '10px', background: 'linear-gradient(90deg, #F2D338 0%, #F2360C 100%)' }}>Các Events nổi bật</h1>
            <Event isHome={true} />
        </div>

    )
}

export default Home