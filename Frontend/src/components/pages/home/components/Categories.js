"use client"

import React from "react"
import { GraduationCap, Heart, Users, Briefcase, Home, Sprout, Book, Truck, Sun, Wifi, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

const CategoryCard = ({ icon: Icon, title, description, color }) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const baseStyle = {
    backgroundColor: "white",
    color: color,
    transition: "all 0.3s ease",
  }

  const hoverStyle = {
    backgroundColor: color,
    color: "white",
  }

  return (
    <div
      className="p-6 rounded-lg shadow-md cursor-pointer border border-gray-300 min-h-48"
      style={isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon size={48} className="mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className={`text-gray-600 ${isHovered ? "block" : "hidden"}`}>{description}</p>
    </div>
  )
}

const Categories = () => {
  const navigate = useNavigate()

  const categories = [
    { icon: GraduationCap, title: "Education", description: "50+ schemes available", color: "#3B82F6" },
    { icon: Heart, title: "Healthcare", description: "40+ schemes available", color: "#EF4444" },
    { icon: Users, title: "Women Empowerment", description: "30+ schemes available", color: "#8B5CF6" },
    { icon: Briefcase, title: "Employment", description: "45+ schemes available", color: "#EAB308" },
    { icon: Home, title: "Housing", description: "25+ schemes available", color: "#22C55E" },
    { icon: Sprout, title: "Agriculture", description: "35+ schemes available", color: "#84CC16" },
    { icon: Book, title: "Skill Development", description: "20+ schemes available", color: "#6366F1" },
    { icon: Truck, title: "Transportation", description: "15+ schemes available", color: "#F97316" },
    { icon: Sun, title: "Energy", description: "10+ schemes available", color: "#FACC15" },
    { icon: Wifi, title: "Digital India", description: "25+ schemes available", color: "#60A5FA" },
    { icon: Zap, title: "Rural Development", description: "30+ schemes available", color: "#16A34A" },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} onClick={() => navigate(`/schemes?cat=${category.title}`)}>
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories