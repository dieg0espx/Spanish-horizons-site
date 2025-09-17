import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"

export default function CocinarteContact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
            Contact Information
          </h2>
          <p className="text-xl text-slate-medium max-w-3xl mx-auto">
            Ready to start your cooking adventure? Get in touch with us to learn more about Cocinarte classes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate">Phone</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-medium text-lg">
                <p className="font-semibold text-slate">+1 (503) 916 9758</p>
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate">Email</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-medium text-lg">
                <p className="font-semibold text-slate">info@cocinarte.com</p>
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-golden rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate">Location</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-slate-medium text-lg">
                <p className="font-semibold text-slate">770 NE Rogahn Street</p>
                <p>Hillsboro, Oregon 97124</p>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
