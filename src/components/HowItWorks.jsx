function HowItWorks() {
    return (
        <>
            {/* How It Works Section */}
            <div className="px-4 py-12">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-4xl font-bold">How It Works</h2>
                    <p className="text-gray-600 mt-2 text-base sm:text-lg">
                        Book your stay in three simple steps
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-10 sm:gap-0">
                    {["Search", "Book", "Enjoy"].map((step, index) => (
                        <div className="text-center px-4 max-w-xs" key={index}>
                            <div className="w-12 h-12 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                                {index + 1}
                            </div>
                            <h3 className="text-2xl font-medium">{step}</h3>
                            <p className="text-gray-600 mt-1 text-sm sm:text-base">
                                {
                                    [
                                        "Enter your destination, dates, and preferences to find the perfect accommodation.",
                                        "Choose your ideal property and securely book your stay with instant confirmation.",
                                        "Arrive at your destination and enjoy a hassle-free stay with 24/7 customer support."
                                    ][index]
                                }
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="px-4 py-12 bg-gray-50">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-4xl font-bold">What Our Guests Say</h2>
                    <p className="text-gray-600 mt-2 text-base sm:text-lg">
                        Read testimonials from our satisfied customers
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                    {[
                        {
                            name: "Sarah Johnson",
                            date: "August 2023",
                            img: "https://randomuser.me/api/portraits/women/12.jpg",
                            stars: "★★★★☆",
                            review:
                                "BookMyStay made finding our vacation rental so easy! The search filters helped us narrow down exactly what we wanted, and the booking process was smooth. The property was exactly as described."
                        },
                        {
                            name: "Michael Chen",
                            date: "July 2023",
                            img: "https://randomuser.me/api/portraits/men/22.jpg",
                            stars: "★★★★☆",
                            review:
                                "I've used several booking sites before, but BookMyStay has been the best experience so far. The customer service was excellent when I needed to modify my reservation. Will definitely use again!"
                        },
                        {
                            name: "Emily Rodriguez",
                            date: "September 2023",
                            img: "https://randomuser.me/api/portraits/women/33.jpg",
                            stars: "★★★★★",
                            review:
                                "Great selection of properties at competitive prices. I appreciate the detailed listings and verified reviews. The app is also very user-friendly and makes planning trips much easier."
                        }
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg border border-blue-200 flex flex-col items-center text-center shadow-sm"
                        >
                            <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                                <img
                                    src={testimonial.img}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-gray-800 font-medium">{testimonial.name}</p>
                            <p className="text-gray-500 text-sm">{testimonial.date}</p>
                            <div className="flex items-center mt-1 text-yellow-400 text-lg">{testimonial.stars}</div>
                            <p className="text-gray-600 mt-2 text-sm">{testimonial.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HowItWorks;
