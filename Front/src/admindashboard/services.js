const servicesData = [
    {
      category: "Graphic Design",
      servicesData: [
        {
          service: "Logo Design",
          description: "Create a unique logo for the university's visual identity.",
          variations: [
            { name: "Basic", price: 7000 },
            { name: "Complex", price: 12000 }
          ]
        },
        {
          service: "Naming",
          description: "Develop a distinct name or title for specific projects.",
          variations: [
            { name: "Standard", price: 1500 },
            { name: "Complex", price: 3000 }
          ]
        },
        {
          service: "Branding Package",
          description: "Establish and maintain the university's visual identity.",
          variations: [
            { name: "Basic", price: 12000 },
            { name: "Comprehensive", price: 25000 }
          ]
        },
        {
          service: "Print Collateral Design",
          description: "Design brochures, flyers, posters, and banners.",
          variations: [
            { name: "Basic", price: 1200 },
            { name: "Complex", price: 3000 }
          ]
        },
        {
          service: "Digital Graphics Design",
          description: "Develop visually appealing graphics for online use.",
          variations: [
            { name: "Basic", price: 1500 },
            { name: "Complex", price: 2600 }
          ]
        },
        {
          service: "Publication Design",
          description: "Create visually engaging layouts and designs for publications.",
          variations: [
            { name: "Standard", price: 2500 },
            { name: "Complex", price: 4800 }
          ]
        },
        {
          service: "Infographic Design",
          description: "Design informative and visually engaging infographics.",
          variations: [
            { name: "Basic", price: 900 },
            { name: "Complex", price: 1800 }
          ]
        },
        {
          service: "Presentation Design",
          description: "Design captivating PowerPoint or Keynote presentations.",
          variations: [
            { name: "Basic", price: 2500 },
            { name: "Complex", price: 2500 }
          ]
        },
        {
          service: "Event Materials Design",
          description: "Create event-specific materials such as invitations and programs.",
          variations: [
            { name: "Basic", price: 1200 },
            { name: "Complex", price: 2400 }
          ]
        },
        {
          service: "Academic Materials Design",
          description: "Develop templates and designs for academic materials.",
          variations: [
            { name: "Basic", price: 1200 },
            { name: "Complex", price: 3000 }
          ]
        },
        {
          service: "Environmental Graphics Design",
          description: "Design graphics for campus signage, wayfinding, and wall murals.",
          variations: [
            { name: "Basic", price: 2500 },
            { name: "Complex", price: 5000 }
          ]
        }
      ]
    },
    {
      category: "Video Production",
      servicesData: [
        {
          service: "Informative Video",
          description: "Produce informative videos on various topics.",
          variations: [
            { name: "Short (1-2 min)", price: 9000 },
            { name: "Standard (2-4 min)", price: 15000 },
            { name: "Extended (4-6 min)", price: 21000 }
          ]
        },
        {
          service: "Promotional Video",
          description: "Produce promotional videos for university events and programs.",
          variations: [
            { name: "Short (1-2 min)", price: 10000 },
            { name: "Standard (2-4 min)", price: 18000 },
            { name: "Extended (4-6 min)", price: 25000 }
          ]
        },
        {
          service: "Documentary Video",
          description: "Create in-depth documentary-style videos exploring specific research projects, academic programs, or university initiatives.",
          variations: [
            { name: "Short (1-2 min)", price: 10000 },
            { name: "Standard (2-4 min)", price: 20000 },
            { name: "Extended (4-6 min)", price: 28000 }
          ]
        },
        {
          service: "Interview Video",
          description: "Conduct and film interviews with faculty, staff, students, and alumni for profiles and testimonials.",
          variations: [
            { name: "Short (1-2 min)", price: 9000 },
            { name: "Standard (2-4 min)", price: 14000 },
            { name: "Extended (4-6 min)", price: 20000 }
          ]
        },
        {
          service: "Institutional Film",
          description: "Produce longer films introducing the university's mission, vision, and values.",
          variations: [
            { name: "Short (1-2 min)", price: 15000 },
            { name: "Standard (2-4 min)", price: 30000 },
            { name: "Extended (4-6 min)", price: 42000 }
          ]
        },
        {
          service: "Best of Video",
          description: "Create highlight videos showcasing the university's achievements and successes.",
          variations: [
            { name: "Short (1-2 min)", price: 9000 },
            { name: "Standard (2-4 min)", price: 15000 },
            { name: "Extended (4-6 min)", price: 21000 }
          ]
        },
        {
          service: "Studio Renting",
          description: "Rental of the studio for podcast or interview videos.",
          variations: [
            { name: "Half day", price: 10000 },
            { name: "Full day", price: 15000 }
          ]
        }
      ]
    },
    {
      category: "Photography",
      servicesData: [
        {
          service: "Event Photography",
          description: "Coverage of university events such as graduation ceremonies, seminars, and workshops.",
          variations: [
            { name: "15 photos", price: 2500 },
            { name: "25 photos", price: 4000 },
            { name: "45 photos", price: 7000 }
          ]
        },
        {
          service: "Campus Facilities Photography",
          description: "Photographing campus buildings, classrooms, libraries, and other facilities.",
          variations: [
            { name: "15 photos", price: 2500 },
            { name: "25 photos", price: 4000 },
            { name: "45 photos", price: 7000 }
          ]
        },
        {
          service: "Faculty and Staff Portraits",
          description: "Creating professional headshots and portraits of faculty and staff.",
          variations: [
            { name: "5 photos", price: 1800 },
            { name: "10 photos", price: 3000 },
            { name: "15 photos", price: 5000 }
          ]
        },
        {
          service: "Research and Innovation Photography",
          description: "Documenting research projects, labs, and innovation initiatives.",
          variations: [
            { name: "15 photos", price: 2500 },
            { name: "25 photos", price: 4000 },
            { name: "45 photos", price: 7000 }
          ]
        },
        {
          service: "Marketing Materials Photography",
          description: "Providing high-quality images for brochures, websites, and promotional materials.",
          variations: [
            { name: "15 photos", price: 2500 },
            { name: "25 photos", price: 4000 },
            { name: "45 photos", price: 7000 }
          ]
        },
        {
          service: "Publications Photography",
          description: "Supplying images for newsletters, magazines, and other publications.",
          variations: [
            { name: "15 photos", price: 2500 },
            { name: "25 photos", price: 4000 },
            { name: "45 photos", price: 7000 }
          ]
        },
        {
          service: "Photography and Image Editing",
          description: "Editing and retouching images for use in marketing materials and publications.",
          variations: [
            { name: "5 photos", price: 500 },
            { name: "15 photos", price: 1800 },
            { name: "30 photos", price: 3000 }
          ]
        },
        {
          service: "Virtual Tour Creation",
          description: "Offer 360-degree photography and video services to create virtual tours of the campus and its facilities.",
          variations: [
            { name: "Basic", price: 5000 },
            { name: "Intermediate", price: 7500 },
            { name: "Comprehensive", price: 10000 }
          ]
        }
      ]
    }
  ];
  
  export default servicesData;
  