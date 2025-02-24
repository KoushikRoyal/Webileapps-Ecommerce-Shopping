

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <p className='text-xl font-medium mb-5'> COMPANY </p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li> Home </li>
                        <li> About Us </li>
                        <li> Delivery </li>
                        <li> Privacy Policy </li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li> 6304-123-745 </li>
                        <li> 2100031449seh@gmail.com </li>
                    </ul>
                </div>
            </div>
    
        </div>
    )
}

export default Footer
