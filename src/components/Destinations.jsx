function Destinations({ location }) {
    return (
        <>
            <>
              
 
                <div className="relative rounded-xl overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-200">
                    <img
                        src={location.img}
                        alt={location.name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h2 className="text-gray-200 text-lg font-semibold">{location.name}</h2>
                        {/* <p className="text-gray-200 text-sm">{location.properties} properties</p> */}
                    </div>
                </div>
 
 
            </>
        </>
    )
}
 
export default Destinations
 