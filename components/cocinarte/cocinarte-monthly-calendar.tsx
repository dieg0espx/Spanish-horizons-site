"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  ChevronLeft,
  ChevronRight,
  ChefHat,
  Users,
  Clock,
  DollarSign,
  X
} from "lucide-react"

interface CookingClass {
  id: string
  title: string
  date: Date
  time: string
  type: "mini-chef" | "mom-me"
  price: number
  menu: string[]
  emoji: string
}

export default function CocinarteMonthlyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)) // September 2024
  const [isMounted, setIsMounted] = useState(false)
  const [selectedClass, setSelectedClass] = useState<CookingClass | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-center bg-cocinarte-navy rounded-2xl p-4 sm:p-6 text-cocinarte-white h-20">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Loading Calendar...</h2>
          </div>
        </div>
      </div>
    )
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const cookingClasses: CookingClass[] = [
    // September 2024
    {
      id: "1",
      title: "Back to School",
      date: new Date(2024, 8, 7), // September 7, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Tostadas horneadas con pollo deshebrado, salsa BBQ-chipotle suave, frijoles refritos, lechuga y queso → Baked Tostadas with Shredded Chicken, Mild BBQ-Chipotle Sauce, Refried Beans, Lettuce, and Cheese",
        "Agua fresca de sandía con limón → Watermelon and Lime Agua Fresca"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "2",
      title: "Apple Season",
      date: new Date(2024, 8, 14), // September 14, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Pie Salado de Calabaza, Chorizo y Queso Latino → Savory Pumpkin, Chorizo, and Latin-Style Cheese Pie",
        "Paletas de manzana con cajeta y granola → Apple Pops with Cajeta and Granola"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "3",
      title: "Latin Independence Day Celebration",
      date: new Date(2024, 8, 21), // September 21, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mom-me",
      price: 150,
      menu: [
        "Mini Tamales Express Tricolor → Tricolor Mini Tamales",
        "Encurtido de cebolla morada → Pickled Red Onion",
        "Flan de coco (o flan clásico latino) → Coconut Flan (or Classic Latin Flan)"
      ],
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      id: "4",
      title: "Soft Autumn",
      date: new Date(2024, 8, 28), // September 28, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Arepas sliders de pavo y queso → Turkey and Cheese Arepa Sliders",
        "Arroz con leche de otoño (canela + manzana) → Autumn Rice Pudding (Cinnamon & Apple)"
      ],
      emoji: "👨‍🍳"
    },
    // October 2024
    {
      id: "5",
      title: "Mes de la Calabaza",
      date: new Date(2024, 9, 4), // October 4, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Empanaditas de calabaza al horno → Baked Pumpkin Mini Empanadas",
        "Panecitos de manzana con dulce de leche → Apple Buns with Dulce de Leche"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "6",
      title: "Mexican Corn",
      date: new Date(2024, 9, 11), // October 11, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Esquites Mexicanos (ranch-fusión) → Mexican Street Corn Cups (Ranch Fusion)",
        "Cocadas horneadas → Baked Coconut Cookies",
        "Atol de vainilla con canela → Vanilla Cinnamon Atol"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "7",
      title: "Tacos Vegetarianos",
      date: new Date(2024, 9, 18), // October 18, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mom-me",
      price: 150,
      menu: [
        "Tacos crujientes de camote y frijoles negros → Crispy Sweet Potato and Black Bean Tacos",
        "Torrejas de leche → Milk French Toast"
      ],
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      id: "8",
      title: "Halloween",
      date: new Date(2024, 9, 25), // October 25, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Monster guac + mini quesadillas → Monster Guacamole + Mini Quesadillas",
        "Calabacitas de Gelatina de Mango y Leche → Mango and Milk Gelatin"
      ],
      emoji: "👨‍🍳"
    },
    // November 2024
    {
      id: "9",
      title: "Remember Me",
      date: new Date(2024, 10, 1), // November 1, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Sopa de calabaza → Pumpkin Soup",
        "Pan de elote dulce → Sweet Cornbread",
        "Plátanos caramelizados en sartén → Pan-Fried Caramelized Plantains"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "10",
      title: "Fall",
      date: new Date(2024, 10, 8), // November 8, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Empanaditas de pollo → Mini Chicken Empanadas",
        "Ensalada tibia de otoño → Warm Autumn Salad",
        "Chocolate de la Abuela → Grandma's Hot Chocolate"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "11",
      title: "Greetings and Aromas of Latin America",
      date: new Date(2024, 10, 15), // November 15, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Cazuelitas de maíz con pavo y verduras → Mini Corn Casseroles with Turkey and Vegetables",
        "Muffins de Plátano y Canela con Toque de Dulce de Leche → Banana Cinnamon Muffins with a Touch of Dulce de Leche"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "12",
      title: "Pre-Thanksgiving",
      date: new Date(2024, 10, 22), // November 22, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mom-me",
      price: 150,
      menu: [
        "Birria de pavo → Turkey Birria",
        "Sopes de frijoles con queso fresco → Bean Sopes with Fresh Cheese",
        "Ensalada de frutas latina → Latin-Style Fruit Salad"
      ],
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      id: "13",
      title: "Bye Bye Fall",
      date: new Date(2024, 10, 29), // November 29, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Quiche de calabaza y queso latino → Pumpkin and Latin-Style Cheese Quiche",
        "Pie de pera → Pear Pie"
      ],
      emoji: "👨‍🍳"
    },
    // December 2024
    {
      id: "14",
      title: "Mini Boards",
      date: new Date(2024, 11, 1), // December 1, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Tabla de Quesos y Frutas Navideña → Christmas Cheese and Fruit Board",
        "Tabla de Verduras y Dip de Yogurt → Vegetable Board with Yogurt Dip",
        "Tabla Dulce de Frutas y Galletas → Sweet Fruit and Cookie Board"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "15",
      title: "Christmas Breakfast",
      date: new Date(2024, 11, 8), // December 8, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mom-me",
      price: 150,
      menu: [
        "Burritos de huevo y pavo estilo navideño → Christmas-Style Egg and Turkey Burritos",
        "Panqueques de calabaza con canela → Pumpkin Cinnamon Pancakes",
        "Parfaits navideños de yogurt, granola y fruta → Christmas Yogurt, Granola, and Fruit Parfaits"
      ],
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      id: "16",
      title: "Fancy Christmas",
      date: new Date(2024, 11, 15), // December 15, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Mini Rollitos de Pollo con Espinaca y Queso → Mini Spinach & Cheese Chicken Rolls",
        "Cheesecake Fácil al Estilo Latino → Easy Latin-Style Cheesecake"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "17",
      title: "Christmas Cookie Workshop",
      date: new Date(2024, 11, 22), // December 22, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Receta Básica de Galletas de Mantequilla para decorar → Basic Butter Cookie Recipe for Decorating"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "18",
      title: "Christmas Dinner",
      date: new Date(2024, 11, 29), // December 29, 2024
      time: "1:00 PM - 3:00 PM",
      type: "mom-me",
      price: 150,
      menu: [
        "Mini Cordon Bleu Navideño → Mini Christmas Cordon Bleu",
        "Brochetas navideñas de verduras → Christmas Vegetable Skewers",
        "Copas de mousse de chocolate y naranja → Chocolate and Orange Mousse Cups",
        "Ponche de frutas → Fruit Punch"
      ],
      emoji: "👨‍👩‍👧‍👦"
    },
    // January 2025
    {
      id: "19",
      title: "New Year Celebration",
      date: new Date(2025, 0, 10), // January 10, 2025
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: [
        "Mini wraps de pollo y vegetales → Mini Chicken and Veggie Wraps",
        "Mini tablas de snacks saludables (frutas, queso, frutos secos) → Mini Healthy Snack Boards (fruits, cheese, nuts)",
        "Smoothie bowls decorados con frutas y semillas → Smoothie Bowls Decorated with Fruits and Seeds"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "20",
      title: "Comfort Foods",
      date: new Date(2025, 0, 17), // January 17, 2025
      time: "1:00 PM - 3:00 PM",
      type: "mom-me",
      price: 120,
      menu: [
        "Sopa de verduras con fideos cortos → Vegetable Soup with Short Noodles",
        "Mini sandwiches calientes de pavo o pollo → Mini Hot Turkey or Chicken Sandwiches",
        "Mac & cheese con vegetales escondidos → Mac & Cheese with Hidden Vegetables"
      ],
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      id: "21",
      title: "Winter Fruits and Vegetables",
      date: new Date(2025, 0, 24), // January 24, 2025
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 60,
      menu: [
        "Paletas de yogurt con frutas de invierno (mandarina, kiwi, fresa) → Yogurt Pops with Winter Fruits (Mandarin, Kiwi, Strawberry)",
        "Muffins de zanahoria y manzana → Carrot and Apple Muffins",
        "Ensaladas de frutas con un toque de miel y canela → Fruit Salads with a Touch of Honey and Cinnamon"
      ],
      emoji: "👨‍🍳"
    },
    {
      id: "22",
      title: "Healthy Goals",
      date: new Date(2025, 0, 31), // January 31, 2025
      time: "1:00 PM - 3:00 PM",
      type: "mom-me",
      price: 120,
      menu: [
        "Mini wraps de pollo y vegetales → Mini Chicken and Vegetable Wraps",
        "Mini tablas de snacks saludables (frutas, queso, frutos secos) → Mini Healthy Snack Boards (fruits, cheese, nuts)",
        "Smoothie bowls decorados con frutas y semillas → Smoothie Bowls Decorated with Fruits and Seeds"
      ],
      emoji: "👨‍👩‍👧‍👦"
    },
    // February 2025
    {
      id: "23",
      title: "TBD",
      date: new Date(2025, 1, 10), // February 10, 2025
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: ["Details coming soon"],
      emoji: "👨‍🍳"
    },
    {
      id: "24",
      title: "TBD",
      date: new Date(2025, 1, 17), // February 17, 2025
      time: "1:00 PM - 3:00 PM",
      type: "mom-me",
      price: 100,
      menu: ["Details coming soon"],
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      id: "25",
      title: "TBD",
      date: new Date(2025, 1, 24), // February 24, 2025
      time: "1:00 PM - 3:00 PM",
      type: "mini-chef",
      price: 80,
      menu: ["Details coming soon"],
      emoji: "👨‍🍳"
    },
    {
      id: "26",
      title: "TBD",
      date: new Date(2025, 1, 28), // February 28, 2025 (fixed invalid date)
      time: "1:00 PM - 3:00 PM",
      type: "mom-me",
      price: 100,
      menu: ["Details coming soon"],
      emoji: "👨‍👩‍👧‍👦"
    }
  ]

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getClassesForDate = (date: Date) => {
    return cookingClasses.filter(classItem => 
      classItem.date.getDate() === date.getDate() &&
      classItem.date.getMonth() === date.getMonth() &&
      classItem.date.getFullYear() === date.getFullYear()
    )
  }

  const isClassDate = (date: Date) => {
    return cookingClasses.some(classItem => 
      classItem.date.getDate() === date.getDate() &&
      classItem.date.getMonth() === date.getMonth() &&
      classItem.date.getFullYear() === date.getFullYear()
    )
  }

  const getTypeColor = (type: string, price: number) => {
    switch (type) {
      case "mini-chef":
        if (price === 60) {
          return "bg-cocinarte-blue text-cocinarte-white"
        }
        return "bg-cocinarte-yellow text-cocinarte-black"
      case "mom-me":
        if (price === 100 || price === 120) {
          return "bg-cocinarte-blue text-cocinarte-white"
        }
        return "bg-cocinarte-orange text-cocinarte-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "mini-chef":
        return "Mini Chef"
      case "mom-me":
        return "Mom & Me"
      default:
        return "Class"
    }
  }

  const handleClassClick = (classItem: CookingClass) => {
    setSelectedClass(classItem)
    setIsDialogOpen(true)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 sm:h-32 bg-gray-50 border border-gray-200"></div>
      )
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const dayClasses = getClassesForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const hasClass = isClassDate(date)

      days.push(
        <div 
          key={day} 
          className={`h-24 sm:h-32 border border-gray-200 p-1 sm:p-2 ${
            isToday ? 'bg-cocinarte-blue/10' : 
            hasClass ? 'bg-cocinarte-yellow/5' : 'bg-white'
          }`}
        >
          {/* Day Number */}
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-semibold ${
              isToday ? 'text-cocinarte-blue' : 
              hasClass ? 'text-cocinarte-navy' : 'text-slate'
            }`}>
              {day}
            </span>
            {isToday && (
              <div className="w-2 h-2 bg-cocinarte-blue rounded-full"></div>
            )}
            {hasClass && !isToday && (
              <div className="w-2 h-2 bg-cocinarte-yellow rounded-full"></div>
            )}
          </div>

          {/* Classes */}
          <div className="space-y-0.5 sm:space-y-1 overflow-hidden">
            {dayClasses.slice(0, 2).map((classItem) => (
              <button
                key={classItem.id}
                onClick={() => handleClassClick(classItem)}
                className={`text-xs p-0.5 sm:p-1 rounded font-medium w-full text-left hover:opacity-80 transition-opacity cursor-pointer ${getTypeColor(classItem.type, classItem.price)}`}
              >
                <span className="truncate">
                  <span className="sm:hidden">{classItem.title}</span>
                  <span className="hidden sm:inline">{classItem.title}</span>
                </span>
              </button>
            ))}
            {dayClasses.length > 2 && (
              <div className="text-xs text-slate-medium">
                +{dayClasses.length - 2} more
              </div>
            )}
          </div>
        </div>
      )
    }

    return days
  }

  return (
    <div className="w-full space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between bg-cocinarte-navy rounded-2xl p-4 sm:p-6 text-cocinarte-white">
        <Button
          onClick={prevMonth}
          className="bg-cocinarte-blue hover:bg-cocinarte-orange text-cocinarte-white border-0 rounded-full p-2 sm:p-3 transition-colors duration-200"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <div className="text-center flex-1 px-2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <p className="text-cocinarte-white/80 text-xs sm:text-sm">
            Cocinarte Cooking Classes
          </p>
        </div>
        <Button
          onClick={nextMonth}
          className="bg-cocinarte-blue hover:bg-cocinarte-orange text-cocinarte-white border-0 rounded-full p-2 sm:p-3 transition-colors duration-200"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cocinarte-yellow rounded"></div>
            <span className="text-xs sm:text-sm text-slate">Mini Chef Classes ($60-$80)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cocinarte-orange rounded"></div>
            <span className="text-xs sm:text-sm text-slate">Mom & Me Classes ($100-$150)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cocinarte-blue rounded"></div>
            <span className="text-xs sm:text-sm text-slate">Special Pricing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-400 rounded"></div>
            <span className="text-xs sm:text-sm text-slate">TBD - Details Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-cocinarte-navy text-cocinarte-white">
          {weekDays.map((day) => (
            <div key={day} className="p-2 sm:p-3 lg:p-4 text-center font-bold text-xs sm:text-sm">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Class Details for Current Month */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate text-center">
          Classes This Month
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cookingClasses
            .filter(classItem => 
              classItem.date.getMonth() === currentMonth.getMonth() &&
              classItem.date.getFullYear() === currentMonth.getFullYear()
            )
            .map((classItem) => (
              <Card key={classItem.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100 border-l-4 border-cocinarte-yellow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={`${getTypeColor(classItem.type, classItem.price)} font-bold`}>
                      {getTypeLabel(classItem.type)}
                    </Badge>
                    <span className="text-2xl">{classItem.emoji}</span>
                  </div>
                  <CardTitle className="text-xl text-slate">{classItem.title}</CardTitle>
                  <CardDescription className="text-slate-medium">
                    {classItem.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })} • {classItem.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-slate-medium font-semibold">Menu:</p>
                    {classItem.menu.map((item, index) => (
                      <p key={index} className="text-sm text-slate-medium">
                        {item}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber">${classItem.price}</span>
                    <Button className="bg-amber hover:bg-golden text-cocinarte-white font-bold rounded-xl">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Class Details Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge className={`${selectedClass ? getTypeColor(selectedClass.type, selectedClass.price) : ''} font-bold`}>
                  {selectedClass ? getTypeLabel(selectedClass.type) : ''}
                </Badge>
                <DialogTitle className="text-2xl text-slate">
                  {selectedClass?.title}
                </DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDialogOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-slate-medium text-lg">
              {selectedClass?.date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })} • {selectedClass?.time}
            </DialogDescription>
          </DialogHeader>
          
          {selectedClass && (
            <div className="space-y-6">
              {/* Price */}
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-cocinarte-orange" />
                <span className="text-3xl font-bold text-cocinarte-orange">
                  ${selectedClass.price}
                </span>
                <span className="text-slate-medium">per {selectedClass.type === 'mini-chef' ? 'child' : 'pair'}</span>
              </div>

              {/* Menu */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate flex items-center space-x-2">
                  <ChefHat className="h-5 w-5 text-cocinarte-navy" />
                  <span>Menu</span>
                </h3>
                <div className="space-y-2">
                  {selectedClass.menu.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg border-l-4 border-cocinarte-yellow">
                      <p className="text-slate-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class Type Info */}
              <div className="bg-cocinarte-navy/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  {selectedClass.type === 'mini-chef' ? (
                    <ChefHat className="h-5 w-5 text-cocinarte-yellow" />
                  ) : (
                    <Users className="h-5 w-5 text-cocinarte-orange" />
                  )}
                  <span className="font-bold text-slate">
                    {getTypeLabel(selectedClass.type)} Class
                  </span>
                </div>
                <p className="text-slate-medium text-sm">
                  {selectedClass.type === 'mini-chef' 
                    ? "Perfect for young chefs ages 5-12. Children work independently with guidance from our instructors."
                    : "A special bonding experience for parents and children. Work together to create delicious dishes."
                  }
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button className="bg-cocinarte-red hover:bg-cocinarte-orange text-cocinarte-white font-bold rounded-xl px-8 py-3 text-lg flex-1">
                  Book This Class
                </Button>
                <Button 
                  variant="outline" 
                  className="border-cocinarte-navy text-cocinarte-navy hover:bg-cocinarte-navy hover:text-cocinarte-white font-bold rounded-xl px-6 py-3"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
