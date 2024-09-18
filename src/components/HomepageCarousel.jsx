import { Box, colors, Container } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import "swiper/css/autoplay"
import "../css/homepage.css"

function HomepageCarousel() {
    const carouselMovies = [{
        id: 1,
        title: "The Fast and the Furious",
        language: "English",
        posterUrl: "https://c4.wallpaperflare.com/wallpaper/831/158/498/action-car-crime-custom-wallpaper-preview.jpg",
        genre: "Action",
        releaseDate: "2001-09-27"

    },
    {
        id: 2,
        title: "Oblivion",
        language: "English",
        posterUrl: "https://images.squarespace-cdn.com/content/v1/507b2f30e4b066e116488db6/1366581664395-1EOF0V8KL1COY6OENC67/Oblivion-Poster.jpg",
        genre: "Action",
        releaseDate: "2013-04-11"
    },
    {
        id: 3,
        title: "Interstellar",
        language: "English",
        posterUrl: "https://m.media-amazon.com/images/I/71ljC3i-8uL._AC_UF894,1000_QL80_.jpg",
        genre: "Sci-Fi",
        releaseDate: "2014-11-06"
    },
    {
        id: 4,
        title: "Lord of the Rings: The Fellowship of the Ring",
        language: "English",
        posterUrl: "https://www.tallengestore.com/cdn/shop/products/LordOfTheRings-FellowshipOfTheRing-HollywoodMoviePoster_6f2b105a-a3ac-4f76-92ca-72ea90a3af5c.jpg?v=1630764638",
        genre: "Fantasy",
        releaseDate: "2001-12-20"
    },
    ]

    return (
        <Swiper
            modules={[EffectCoverflow, Pagination, Autoplay]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            }}
            autoplay={{
                delay: 3000
            }}
            pagination={true}
            className="mySwiper">
            {carouselMovies.map((data) => {
                return <SwiperSlide>
                    <Box className="img-container">
                        <img className='swiper-img' src={data.posterUrl} />
                    </Box>
                </SwiperSlide>
            })}
        </Swiper>
    )
}

export default HomepageCarousel