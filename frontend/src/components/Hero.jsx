
import women from '../components/woman.jpg';

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-700 bg-[#121212] text-white'>
            {/* Hero Left Side */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#f5c518]'></p>
                        <p className='font-medium text-sm md:text-base text-[#f5c518]'>TRENDING NOW</p>
                    </div>
                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-white'>
                        Latest Arrivals
                    </h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <button className='relative px-5 py-2 bg-[#f5c518] text-black font-semibold rounded-md overflow-hidden group'>
                            <span className='absolute inset-0 bg-black transition-transform transform scale-x-0 group-hover:scale-x-100'></span>
                            <span className='relative group-hover:text-[#f5c518]'>SHOP NOW</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Hero Right Side */}
            <img className='w-full sm:w-1/2 object-cover' src={women} alt="Fashion Model" />
        </div>
    );
}

export default Hero;
