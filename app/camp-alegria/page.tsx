import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Sun, 
  TreePine, 
  Music, 
  Palette, 
  Globe, 
  Users, 
  Star, 
  Heart,
  ArrowRight,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChefHat,
  Compass,
  Target
} from "lucide-react"

export default function CampAlegriaPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-slate-100 text-slate-800 border-slate-200 px-4 py-2 text-sm">
                  <Sun className="w-4 h-4 mr-2" />
                  Summer 2025 Registration Open
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-questa leading-tight text-slate">
                  Camp Alegría
                </h1>
                <p className="text-xl lg:text-2xl text-slate-600 font-questa">
                  Immersive Summer Camp for Ages 5-12
                </p>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                A one-of-a-kind immersive summer camp designed for children ages 5-12 to experience 
                Latin American culture through storytelling, hands-on activities, and unforgettable experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-amber hover:bg-golden text-white font-questa px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  <Link href="https://campalegria.campmanagement.com/p/request_for_info_m.php?action=enroll" target="_blank" rel="noopener noreferrer">Register Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 font-questa px-8 py-4 text-lg rounded-xl transition-all duration-200">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/camp-alegria.png"
                alt="Camp Alegria"
                width={400}
                height={400}
                className="w-[90%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-questa text-slate mb-4">
              Register your child for a summer of fun!
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-questa text-xl text-slate">Location</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600">
                  <p className="font-semibold text-slate">770 NE Rogahn Street</p>
                  <p>Hillsboro, Oregon</p>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-questa text-xl text-slate">Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600">
                  <p className="font-semibold text-slate">campalegria@casitaazulpdx.org</p>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-slate/5 to-slate/10">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-slate rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-questa text-xl text-slate">Phone</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600">
                  <p className="font-semibold text-slate">(503) 916-9758</p>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes Camp Alegría Special */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-questa text-slate mb-4">
              What Makes Camp Alegría Special?
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Camp Alegría offers a unique blend of Spanish immersion, cultural activities, and summer fun. Our experienced staff creates an environment where children can learn, grow, and make lasting memories while developing their Spanish language skills. Each session offers unique themes and activities designed to engage children in Spanish language learning through play, exploration, and cultural experiences.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold font-questa text-slate mb-4 flex items-center">
                  <Globe className="w-8 h-8 mr-3 text-green-600" />
                  Full Spanish Immersion
                </h3>
                <p className="text-gray-600">
                  Complete Spanish language immersion with native speakers and cultural activities
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold font-questa text-slate mb-4 flex items-center">
                  <Users className="w-8 h-8 mr-3 text-amber" />
                  Bilingual Support
                </h3>
                <p className="text-gray-600">
                  Supportive bilingual environment for children at different Spanish proficiency levels
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <p className="text-lg text-gray-600 font-semibold">
                  Each session will conclude with a special community event, such as a World Cup match, 
                  Carnaval parade, or group feast!
                </p>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/pictures/6-DSC02581.jpg"
                alt="Children enjoying Camp Alegria"
                width={600}
                height={400}
                className="rounded-2xl object-cover w-full h-96 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-questa text-slate mb-4">
              Take a look to our sessions in 2026
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our exciting sessions for 2026 and give your child an unforgettable summer experience!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Session 1 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                    <Compass className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="font-questa text-xl text-slate">Session 1: Adventure across America</CardTitle>
                    <p className="text-sm text-gray-600">June 16th - July 3rd (No camp on July 4th)</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Your child will embark on a journey through Latin America, exploring its rich cultures through art, 
                  storytelling, and hands-on activities. From vibrant crafts to traditional tales and immersive experiences, 
                  each session brings a new adventure.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Session 2 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="font-questa text-xl text-slate">Session 2: Carnaval Celebration</CardTitle>
                    <p className="text-sm text-gray-600">July 7th - July 25th</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Experience the vibrant energy of Latin America's most joyful festival with a lively fusion of dance, 
                  music, and crafts! Immerse yourself in the rhythms of traditional beats and explore hands-on craft 
                  stations that celebrate rich cultural traditions.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Session 3 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate/5 to-slate/10">
              <CardHeader>
                <div className="flex items-center mb-4">
                                     <div className="w-12 h-12 bg-slate rounded-full flex items-center justify-center mr-4">
                     <Target className="w-6 h-6 text-white" />
                   </div>
                  <div>
                    <CardTitle className="font-questa text-xl text-slate">Session 3: World Cup Extravaganza</CardTitle>
                    <p className="text-sm text-gray-600">July 28th - August 15th</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  A dynamic and fun-filled soccer camp where kids develop skills, build teamwork, and experience the 
                  excitement of the game! With engaging drills, friendly matches, and a supportive environment, young 
                  players will boost their confidence and embrace the spirit of the sport.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Session 4 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="font-questa text-xl text-slate">Session 4: Latin Cooking Adventure</CardTitle>
                    <p className="text-sm text-gray-600">August 18th - August 29th</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Kids get hands-on in the kitchen as they learn to make delicious traditional Latin dishes! From 
                  homemade tortillas to savory empanadas and sweet treats like alfajores, these fun and interactive 
                  cooking classes introduce children to the rich flavors of Latin America.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-questa text-slate mb-4">
              Week-by-Week Session Schedule
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-questa font-semibold">Program</th>
                  <th className="px-6 py-4 text-left font-questa font-semibold">Week</th>
                  <th className="px-6 py-4 text-left font-questa font-semibold">Start Date</th>
                  <th className="px-6 py-4 text-left font-questa font-semibold">End Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-green-50">
                  <td className="px-6 py-4 font-semibold text-slate" rowSpan={3}>ADVENTURE ACROSS LATIN AMERICA</td>
                  <td className="px-6 py-4 text-gray-600">WEEK 1</td>
                  <td className="px-6 py-4 text-gray-600">06/16/2025</td>
                  <td className="px-6 py-4 text-gray-600">06/20/2025</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-6 py-4 text-gray-600">WEEK 2</td>
                  <td className="px-6 py-4 text-gray-600">06/23/2025</td>
                  <td className="px-6 py-4 text-gray-600">06/27/2025</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-6 py-4 text-gray-600">WEEK 3</td>
                  <td className="px-6 py-4 text-gray-600">06/30/2025</td>
                  <td className="px-6 py-4 text-gray-600">07/03/2025</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="px-6 py-4 font-semibold text-slate" rowSpan={3}>CARNAVAL CELEBRATION</td>
                  <td className="px-6 py-4 text-gray-600">WEEK 1</td>
                  <td className="px-6 py-4 text-gray-600">07/07/2025</td>
                  <td className="px-6 py-4 text-gray-600">07/11/2025</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="px-6 py-4 text-gray-600">WEEK 2</td>
                  <td className="px-6 py-4 text-gray-600">07/14/2025</td>
                  <td className="px-6 py-4 text-gray-600">07/18/2025</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="px-6 py-4 text-gray-600">WEEK 3</td>
                  <td className="px-6 py-4 text-gray-600">07/21/2025</td>
                  <td className="px-6 py-4 text-gray-600">07/25/2025</td>
                </tr>
                <tr className="bg-slate/5">
                  <td className="px-6 py-4 font-semibold text-slate" rowSpan={3}>WORLD CUP EXTRAVAGANZA</td>
                  <td className="px-6 py-4 text-gray-600">WEEK 1</td>
                  <td className="px-6 py-4 text-gray-600">07/28/2025</td>
                  <td className="px-6 py-4 text-gray-600">08/01/2025</td>
                </tr>
                <tr className="bg-slate/5">
                  <td className="px-6 py-4 text-gray-600">WEEK 2</td>
                  <td className="px-6 py-4 text-gray-600">08/04/2025</td>
                  <td className="px-6 py-4 text-gray-600">08/08/2025</td>
                </tr>
                <tr className="bg-slate/5">
                  <td className="px-6 py-4 text-gray-600">WEEK 3</td>
                  <td className="px-6 py-4 text-gray-600">08/11/2025</td>
                  <td className="px-6 py-4 text-gray-600">08/15/2025</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-4 font-semibold text-slate" rowSpan={2}>LATIN COOKING ADVENTURE</td>
                  <td className="px-6 py-4 text-gray-600">WEEK 1</td>
                  <td className="px-6 py-4 text-gray-600">08/18/2025</td>
                  <td className="px-6 py-4 text-gray-600">08/22/2025</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-4 text-gray-600">WEEK 2</td>
                  <td className="px-6 py-4 text-gray-600">08/25/2025</td>
                  <td className="px-6 py-4 text-gray-600">08/29/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-questa text-slate mb-4">
              Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pricing does not change based on whether a child is enrolled in Bilingual or Spanish Immersion. 
              Prices vary depending on the session length and enrollment type.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Full Day Pricing */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="text-center">
                <CardTitle className="font-questa text-2xl text-slate">Full Day (8:15 AM - 3:15 PM)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate mb-2">ADVENTURE ACROSS LATIN AMERICA</h4>
                  <p className="text-sm text-gray-600">FULL SESSION (3 WEEK): $1,080.00</p>
                  <p className="text-sm text-gray-600">2 WEEKS: $720.00</p>
                  <p className="text-sm text-gray-600">1 WEEK: $360.00</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate mb-2">CARNAVAL CELEBRATION</h4>
                  <p className="text-sm text-gray-600">FULL SESSION (3 WEEKS): $1,080.00</p>
                  <p className="text-sm text-gray-600">2 WEEKS: $720.00</p>
                  <p className="text-sm text-gray-600">1 WEEK: $360.00</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate mb-2">WORLD CUP EXTRAVAGANZA</h4>
                  <p className="text-sm text-gray-600">FULL SESSION (3 WEEKS): $1,080.00</p>
                  <p className="text-sm text-gray-600">2 WEEKS: $720.00</p>
                  <p className="text-sm text-gray-600">1 WEEK: $360.00</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate mb-2">LATIN COOKING ADVENTURE</h4>
                  <p className="text-sm text-gray-600">FULL SESSION (2 WEEKS): $720.00</p>
                  <p className="text-sm text-gray-600">1 WEEK: $360.00</p>
                </div>
              </CardContent>
            </Card>

            {/* Half Day Pricing */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
              <CardHeader className="text-center">
                <CardTitle className="font-questa text-2xl text-slate">Half Day (8:15 AM - 12:30 PM)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate mb-2">ADVENTURE ACROSS LATIN AMERICA</h4>
                  <p className="text-sm text-gray-600">FULL SESSION (3 WEEK): $987.00</p>
                  <p className="text-sm text-gray-600">2 WEEKS: $658.00</p>
                  <p className="text-sm text-gray-600">1 WEEK: $329.00</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate mb-2">CARNAVAL CELEBRATION</h4>
                  <p className="text-sm text-gray-600">FULL SESSION (3 WEEKS): $987.00</p>
                  <p className="text-sm text-gray-600">2 WEEKS: $658.00</p>
                  <p className="text-sm text-gray-600">1 WEEK: $329.00</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate mb-2">WORLD CUP EXTRAVAGANZA</h4>
                  <p className="text-sm text-gray-600">FULL SESSION (3 WEEKS): $987.00</p>
                  <p className="text-sm text-gray-600">2 WEEKS: $658.00</p>
                  <p className="text-sm text-gray-600">1 WEEK: $329.00</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate mb-2">LATIN COOKING ADVENTURE</h4>
                  <p className="text-sm text-gray-600">FULL SESSION (2 WEEKS): $670.00</p>
                  <p className="text-sm text-gray-600">1 WEEK: $335.00</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Extended Care */}
                     <Card className="border-0 shadow-lg bg-gradient-to-br from-slate/5 to-slate/10">
             <CardHeader className="text-center">
               <CardTitle className="font-questa text-2xl text-slate">Extended Care Pricing</CardTitle>
               <CardDescription className="text-lg">Extended Care Option (3:15 PM – 5:45 PM)</CardDescription>
             </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-slate mb-2">ADVENTURE ACROSS LATIN AMERICA</h4>
                  <p className="text-sm text-gray-600">3 WEEKS: $338.00</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-slate mb-2">CARNAVAL CELEBRATION</h4>
                  <p className="text-sm text-gray-600">3 WEEKS: $338.00</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-slate mb-2">WORLD CUP EXTRAVAGANZA</h4>
                  <p className="text-sm text-gray-600">3 WEEKS: $338.00</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-slate mb-2">LATIN COOKING ADVENTURE</h4>
                  <p className="text-sm text-gray-600">2 WEEKS: $225.00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold font-questa">
              Click Here for an Exciting Summer Experience!
            </h2>
            <p className="text-xl text-green-100">
              Give your child the gift of Spanish language learning combined with 
              summer fun, adventure, and cultural experiences at Camp Alegría.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber hover:bg-golden text-white font-questa px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="https://campalegria.campmanagement.com/p/request_for_info_m.php?action=enroll" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Register for Camp
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-green-800 hover:bg-white hover:text-green-800 font-questa px-8 py-4 text-lg rounded-xl transition-all duration-200">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
