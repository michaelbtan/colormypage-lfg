import Image from "next/image"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & Creative Director",
    bio: "With a background in art education, Sarah founded ColorMyPage to share her passion for creativity with children around the world.",
    image: "/placeholder.svg?height=400&width=400&text=Sarah",
  },
  {
    name: "Michael Chen",
    role: "Lead Artist",
    bio: "Michael brings 15 years of illustration experience to our team, creating coloring pages that are both beautiful and engaging.",
    image: "/placeholder.svg?height=400&width=400&text=Michael",
  },
  {
    name: "Emily Rodriguez",
    role: "Educational Consultant",
    bio: "As a former elementary school teacher, Emily ensures our coloring pages have educational value while remaining fun.",
    image: "/placeholder.svg?height=400&width=400&text=Emily",
  },
  {
    name: "David Wilson",
    role: "Technical Director",
    bio: "David oversees the technical aspects of ColorMyPage, making sure our platform is fast, secure, and easy to use.",
    image: "/placeholder.svg?height=400&width=400&text=David",
  },
]

export function AboutTeam() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-600">
            The passionate people behind ColorMyPage who work tirelessly to bring creativity to your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#9d84ff] font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

