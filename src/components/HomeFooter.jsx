import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

function HomeFooter() {
    return (
        <footer className="bg-black text-white px-6 py-10">
            <div className="flex flex-wrap justify-between gap-8 max-w-7xl mx-auto">
                {/* Company Info */}
                <div className="flex-1 min-w-[250px]">
                    <h2 className="text-xl font-bold mb-3">BookMyStay</h2>
                    <p className="text-sm text-gray-300 mb-4">
                        Your trusted platform for finding the perfect accommodations worldwide.
                        We make booking simple, secure, and satisfying.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <FontAwesomeIcon icon={faFacebook} style={{ color: '#d1d5db' }} />
                        <FontAwesomeIcon icon={faTwitter} style={{ color: '#d1d5db' }} />
                        <FontAwesomeIcon icon={faInstagram} style={{ color: '#d1d5db' }} />
                        <FontAwesomeIcon icon={faYoutube} style={{ color: '#d1d5db' }} />
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex-1 min-w-[200px]">
                    <h2 className="text-xl font-bold mb-3">Quick Links</h2>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li>Home</li>
                        <li>Properties</li>
                        <li>Special Deals</li>
                        <li>About Us</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* Support */}
                <div className="flex-1 min-w-[200px]">
                    <h2 className="text-xl font-bold mb-3">Support</h2>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li>Help Center</li>
                        <li>FAQs</li>
                        <li>Cancellation Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-[250px]">
                    <h2 className="text-xl font-bold mb-3">Contact Us</h2>
                    <ul className="text-sm text-gray-300 space-y-3">
                        <li className="flex gap-2 items-start">
                            <FontAwesomeIcon icon={faLocationDot} style={{ color: "#74C0FC" }} />
                            <span>1234 Booking Street, Suite 500<br />San Francisco, CA 94103</span>
                        </li>
                        <li className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faPhone} style={{ color: "#74C0FC" }} />
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faEnvelope} style={{ color: "#74C0FC" }} />
                            <span>support@bookmystay.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="text-center text-sm text-gray-400 mt-10">
                <p>© 2025 BookMyStay. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default HomeFooter;
