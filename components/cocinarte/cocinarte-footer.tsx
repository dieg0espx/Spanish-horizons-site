import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"

export default function CocinarteFooter() {
  return (
    <footer className="bg-cocinarte-navy text-cocinarte-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Image 
              src="/cocinarte/cocinarteLogo.png" 
              alt="Cocinarte Logo" 
              width={150} 
              height={48} 
              className="object-contain h-12 mb-4" 
            />
            <p className="text-cocinarte-blue text-sm">
              Cooking adventures for kids and families to explore Latin flavors while learning hands-on cooking skills.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-cocinarte-yellow">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#calendar" className="text-cocinarte-blue hover:text-cocinarte-yellow transition-colors">Home</Link></li>
              <li><Link href="#about" className="text-cocinarte-blue hover:text-cocinarte-yellow transition-colors">About Our Classes</Link></li>
              <li><Link href="#faq" className="text-cocinarte-blue hover:text-cocinarte-yellow transition-colors">FAQ</Link></li>
              <li><Link href="#birthday-parties" className="text-cocinarte-blue hover:text-cocinarte-yellow transition-colors">Birthday Parties</Link></li>
              <li><Link href="#private-events" className="text-cocinarte-blue hover:text-cocinarte-yellow transition-colors">Private Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-cocinarte-yellow">Contact Info</h3>
            <div className="space-y-2 text-sm text-cocinarte-blue">
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                (503) 916-9758
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@cocinarte.com
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                770 NE Rogahn Street<br />
                Hillsboro, OR 97124
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-cocinarte-yellow">Follow Us</h3>
            <div className="space-y-4">
              <Button className="bg-cocinarte-yellow hover:bg-cocinarte-orange text-cocinarte-black font-bold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="https://instagram.com/cocinarte" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <span className="mr-2">📸</span>
                  Instagram
                </Link>
              </Button>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-cocinarte-yellow rounded-full flex items-center justify-center hover:bg-cocinarte-orange transition-colors cursor-pointer">
                  <span className="text-cocinarte-black text-sm font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-cocinarte-yellow rounded-full flex items-center justify-center hover:bg-cocinarte-orange transition-colors cursor-pointer">
                  <span className="text-cocinarte-black text-sm font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-cocinarte-yellow rounded-full flex items-center justify-center hover:bg-cocinarte-orange transition-colors cursor-pointer">
                  <span className="text-cocinarte-black text-sm font-bold">📧</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cocinarte-blue mt-8 pt-8 text-center text-sm text-cocinarte-blue">
          <p>&copy; 2024 Cocinarte. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
