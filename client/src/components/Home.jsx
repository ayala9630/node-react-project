import React, { useRef } from 'react'
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';


const Home = () => {
    const categories = ["bow", "guitars", "pianos", "windInstrument", "drums"]

    const icon = (<></>)
    return (
        <>
            <div className="card flex justify-content-center flex-wrap	">

                {categories.map((item) => {
                    return (
                        <>
                            <Link to={`/category/${item}`}> 
                            <Image src={`http://localhost:1234/${item}.webp`} indicatorIcon={item} alt='Image' width="250" />
                            </Link>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Home
