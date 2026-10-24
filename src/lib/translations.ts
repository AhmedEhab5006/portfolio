import {
  Certification,
  ExperienceItem,
  Language,
  NavItem,
  Platform,
  ProjectItem,
  ServiceItem,
  SkillItem,
} from "@/types";

interface LocaleContent {
  dir: "ltr" | "rtl";
  seoTitle: string;
  seoDescription: string;
  nav:{
    name:string, 
    items: NavItem[]
  },
  expbreif:{
    experinceHeader:string,
    projectsHeader:string,
    experinceNumber:string,
    projectsNumber:string,
  },
  hero: {
    availability: string;
    greeting: string;
    name: string;
    role: string;
    typedRoles: string[];
    ctaHire: string;
    ctaCv: string;
  };
  about: { title: string; content: string };
  services: { title: string; items: ServiceItem[] };
  skills: {
    title: string;
    technicalTitle: string;
    softTitle: string;
    technical: SkillItem[];
    soft: SkillItem[];
  };
  experience: { title: string; items: ExperienceItem[] };
  projects: { title: string; filters: string[]; viewDetails: string; items: ProjectItem[] };
  certifications: { 
    title: string,
    status: string,
    buttonTitle: string, 
    items: Certification[] 
  };
  contact: {
    title: string,
    subtitle:string,
  };
  socialPlatforms:{
    title:string,
    items: Platform[]
  },
  freelancePlatforms: {
    title:string,
    items:Platform[]
  }
  footer: string;
}


export const translations: Record<Language, LocaleContent> = {
  en: {
    dir: "ltr",
    seoTitle: "Ahmed Ehab | Full Stack Developer",
    seoDescription: "Premium portfolio for Ahmed Ehab, Full Stack Developer and Coding Instructor.",
    nav: {
      name: "Ahmed Ehab",
      items:[
        { id: "about", href: "#about" },
        { id: "skills", href: "#skills" },
        { id: "experience", href: "#experience" },
        { id: "projects", href: "#projects" },
        { id: "contact", href: "#contact" },    
      ]
    },
    hero: {
      availability:"Available for Freelance",
      greeting: "Hello, I am",
      name: "Ahmed Ehab",
      role: "Full Stack .NET Developer & Coding Instructor",
      typedRoles: ["Full Stack Developer", "ASP.NET Core Specialist", "Coding Instructor"],
      ctaHire: "Hire Me",
      ctaCv: "Download CV",
    },
    expbreif:{
      experinceHeader:"Experience",
      experinceNumber:"1.5+ Years",
      projectsHeader:"Projects",
      projectsNumber:"+5",
    },
    about: {
      title: "About Me",
      content:
        "I build scalable web systems using ASP.NET Core, Web API, MVC , Microsoft SQL Server and React with focus on clean architecture, performance, and maintainability.",
    },
    services: {
      title: "Services",
      items: [
        {
          "title": "Backend Development with ASP.NET Core",
          "description": "Building scalable web APIs and server-side applications using ASP.NET Core, Web API, MVC, Entity Framework Core, and LINQ."
        },
        {
          "title": "Frontend Integration",
          "description": "Creating responsive user interfaces using React, CSS, HTML, and .NET MVC and Bootstrap 5, integrated with .NET backends."
        },
        {
          "title": "Database Design & Management",
          "description": "Designing relational databases, writing optimized T-SQL queries, and managing data with Entity Framework Core."
        },
        {
          "title": "REST API Development",
          "description": "Building secure, well-structured RESTful APIs following SOLID principles, Domain-Driven Design, and tiered architectures."
        },
        {
          "title": "Clean Code & Design Patterns",
          "description": "Applying design patterns, SOLID principles, and agile methodologies to write maintainable, testable, and high-quality code."
        },
        {
          "title": "Version Control & Project Management",
          "description": "Using Git, GitHub, Jira, and Azure DevOps for source control, task tracking, and team collaboration."
        },
        {
          "title": "Troubleshooting & Problem Solving",
          "description": "Debugging, optimizing performance, and solving complex technical issues in .NET applications."
        } ],
    },
    skills: {
      title: "Skills",
      technicalTitle: "Technical skills",
      softTitle: "Soft skills",
      technical: [
        { name: "ASP.NET Core", level: 92, category: "Backend" },
        { name: "ASP.NET Web API", level: 91, category: "Backend" },
        { name: "Entity Framework Core", level: 87, category: "Backend" },
        { name: "Python Django", level: 60, category: "Backend" },  
        { name: "Microsoft Transact SQL", level: 98, category: "Database" },
        { name: "Postgres SQL", level: 60, category: "Database" },
        { name: " ASP.NET MVC", level: 70, category: "Fullstack" },
        { name: "Boostrap5", level: 90, category: "Frontend" },
        { name: "React", level: 70, category: "Frontend" },
      ],
      soft: [
        { name: "Effective Communication", level: 100, category: "Soft" },
        { name: "Customer Focused", level: 100, category: "Soft" },
        { name: "Teamwork", level: 100, category: "Soft" },
        { name: "Problem solving", level: 100, category: "Soft" },
        { name: "Time management", level: 100, category: "Soft" },
        { name: "Attention to Detail", level: 100, category: "Soft" },
        { name: "Follow Instructions", level: 100, category: "Soft" },

      ],
    },
    experience: {
      title: "Experience",
      items: [
        {
          title: "Developer",
          company: "CTIC, Captial University",
          period: "Sep 2025 - Present",
          description: "Designing, developing, and maintaining scalable web systems for Capital University (formerly Helwan University), Egypt.",
        },
        {
          title: "Intern",
          company: "Commercial International Bank (CIB)",
          period: "Jul 2025 - Aug 2025",
          description: "Gained hands-on exposure to IT systems and their role in supporting operations within the banking sector.",
        },
        {
          title: "Coding Instructor",
          company: "3C Online Coding School",
          period: "Nov 2024 - Present",
          description: "Teaching programming basics for childern between 10-18 ages.",
        },
      ],
    },
    projects: { 
      title: "Projects", 
      filters: ["All", "Systems", "Management", "Realtime"], 
      viewDetails: "View Details", 
      items:[   
      { id: "faulty", title: "Faulty Members Portal System", category: "Systems", summary: "An electronic portal used to manage scientific research and academic qualifications of faculty members, with the ability to display and organize academic data in one place, making it easier to track achievements and document them.", tech: ["ASP.NET Core", "SQL Server"] },
      { id: "port", title: "Port Management System", category: "Management", summary: "An integrated electronic system used to manage and organize operations within ports, such as vessel arrivals and departures, container management, shipment tracking, and coordinating loading and unloading operations. The system aims to improve operational efficiency, reduce time and cost, and facilitate accurate and organized tracking of cargo and ship movements.", tech: ["ASP.NET Core", "SQL Server"] },
      { id: "clinic", title: "Healx Clinic Management System", category: "Management", summary: "An integrated electronic platform that allows patients to easily browse the list of available doctors, view each doctor’s specialty, working hours, and ratings, and choose the most suitable doctor. The system provides the ability to book appointments directly based on available time slots, as well as communicate with the doctor before or after booking when needed. The system aims to facilitate access to medical services, organize the booking process, and improve the patient experience through a simple and user-friendly interface.", tech: ["Web API", "EF Core", "React"] },
      { id: "ticket", title: "Ticket Now Reservation System", category: "Systems", summary: "An electronic application that allows users to browse available trips or events, choose a suitable time, and book tickets quickly and securely. The system provides the ability to manage bookings, view details, and track ticket status, making the booking process easier and improving the user experience.", tech: ["C#", "REST API", "React"] },
      { id: "Judical", title: "Mezan System For Judical Affairs", category: "Systems", summary: "integrated electronic system designed to manage and organize law firm operations in a professional way. It allows registering and managing cases, tracking sessions and appointments, and organizing client and lawyer data within the firm. The system also supports documenting all case details such as documents, notes, and important dates, with the ability to accurately track the status of each case.", tech: ["C#", "REST API", "React"] },
      ] 
    },
    certifications: {
      title: "Education & Training",
      status: "Verified",
      buttonTitle:"View Certificate",
      items: [
        { title: "CIB Summer Internship - The Green Leap", issuer: "Commercial International Bank (Jul 2025)" },
        { title: "Web Development Using .NET Technologies", issuer: "Information Technology Institute (ITI)" },
        { title: "Fullstack .NET Internship", issuer: "Digital Egypt Pioneers Initiative (DEPI)" },
        { title: "Docker Certificate", issuer: "Professional Training" },
      ],
    },
    contact: {
      title: "Contact",
      subtitle:"Connect with me through social and freelance platforms."
    },
    socialPlatforms:{
      title:"Social Media Platforms",
      items:[
        { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmedehab5006/", image: "/platforms/linkedin.svg" },
        { label: "WhatsApp", href: "https://wa.me/201550529558", image: "/platforms/whatsapp.svg" },
      ],
    },
    freelancePlatforms:{
      title:"Freelance Platforms",
      items:[
        { label: "Mostaql", href: "https://mostaql.com/u/AhmedEhab5006", image: "/platforms/mostaql.svg" },
        { label: "Khamsat", href: "https://khamsat.com/user/ahmedehab5006", image: "/platforms/khamsat.svg" },
        { label: "Upwork", href: "https://www.upwork.com/freelancers/~015b2cc921861bf367", image: "/platforms/upwork.svg" },
        { label: "Freelancer", href: "https://www.freelancer.com/u/AhmedEhab5006", image: "/platforms/freelancer.svg" },
        { label: "Nafzly", href: "https://nafezly.com/u/AhmedEhab15102004500", image: "/platforms/nafezly.svg" },
        { label: "Kafel", href: "https://kafiil.com/u/ahmedehab13", image: "/platforms/kafiil.svg" },
      ],
    },
    footer: `© ${new Date().getFullYear()} All Rights Reserved - Ahmed Ehab`,
  },
  ar: {
    dir: "rtl",
    seoTitle: "أحمد إيهاب | مطور متكامل",
    seoDescription: "موقع أعمال احترافي لأحمد إيهاب، مطور متكامل ومدرب برمجة.",
    nav: {
      name:"أحمد ايهاب",
      items:[
        { id: "حولي", href: "#about" },
        { id: "المهارات", href: "#skills" },
        { id: "الخبرات", href: "#experience" },
        { id: "المشاريع", href: "#projects" },
        { id: "التواصل", href: "#contact" },
      ]
    },
    hero: {
      availability:"متاح للعمل الحر",
      greeting: "مرحبا، انا",
      name: "أحمد إيهاب",
      role: "مطور .NET متكامل ومدرب برمجة",
      typedRoles: ["مطور ويب متكامل", "متخصص ASP.NET Core", "مدرب برمجة"],
      ctaHire: "وظفني",
      ctaCv: "تحميل السيرة الذاتية",
    },
    about: {
      title: "نبذة عني",
      content: "أبني أنظمة ويب قابلة للتوسّع باستخدام ASP.NET Core وWeb API وMVC وMicrosoft SQL Server وReact، مع التركيز على الهندسة النظيفة (Clean Architecture) والأداء وقابلية الصيانة.",
    },
    services: {
      title: "الخدمات",
      items: [
        {
          "title": "تطوير الخلفية باستخدام ASP.NET Core",
          "description": "بناء تطبيقات ويب وواجهات API قابلة للتوسع باستخدام ASP.NET Core و Web API و MVC و Entity Framework Core و LINQ."
        },
        {
          "title": "دمج الواجهات الأمامية",
          "description": "إنشاء واجهات مستخدم متجاوبة باستخدام React و CSS و HTML و .NET MVC و Bootstrap 5، وربطها مع الخلفية في .NET."
        },
        {
          "title": "تصميم وإدارة قواعد البيانات",
          "description": "تصميم قواعد بيانات علائقية، كتابة استعلامات T-SQL محسنة، وإدارة البيانات باستخدام Entity Framework Core."
        },
        {
          "title": "تطوير REST APIs",
          "description": "بناء واجهات RESTful آمنة ومنظمة وفقًا لمبادئ SOLID وتصميم Domain-Driven والمعماريات متعددة الطبقات."
        },
        {
          "title": "كود نظيف وأنماط التصميم",
          "description": "تطبيق أنماط التصميم ومبادئ SOLID ومنهجيات Agile لكتابة كود قابل للصيانة والاختبار وذو جودة عالية."
        },
        {
          "title": "التحكم في الإصدارات وإدارة المشاريع",
          "description": "استخدام Git و GitHub و Jira و Azure DevOps لتتبع الأكواد وإدارة المهام والتعاون داخل الفريق."
        },
        {
          "title": "حل المشكلات وتحسين الأداء",
          "description": "تصحيح الأخطاء، تحسين أداء التطبيقات، وحل المشكلات التقنية المعقدة في تطبيقات .NET."
        }],
    },
    expbreif:{
      experinceHeader:"الخبرة",
      experinceNumber:"1.5+ سنوات",
      projectsHeader:"المشاريع",
      projectsNumber:"+5", },
    skills: {
      title: "المهارات",
      technicalTitle: "المهارات التقنية",
      softTitle: "المهارات الناعمة",
      technical: [
        { name: "ASP.NET Core", level: 92, category: "Backend" },
        { name: "ASP.NET Web API", level: 91, category: "Backend" },
        { name: "Entity Framework Core", level: 87, category: "Backend" },
        { name: "Python Django", level: 60, category: "Backend" },  
        { name: "Microsoft Transact SQL", level: 98, category: "Database" },
        { name: "Postgres SQL", level: 60, category: "Database" },
        { name: " ASP.NET MVC", level: 70, category: "Fullstack" },
        { name: "Boostrap5", level: 90, category: "Frontend" },
        { name: "React", level: 70, category: "Frontend" },  
     ],
      soft: [
        { name: "التواصل الفعال", level: 100, category: "Soft" },
        { name: "تلبية احتياجات العملاء", level: 100, category: "Soft" },
        { name: "حل المشكلات", level: 100, category: "Soft" },
        { name: "إدارة الوقت", level: 100, category: "Soft" },
        { name: "التكيف", level: 100, category: "Soft" },
        { name: "الاهتمام بالتفاصيل", level: 100, category: "Soft" },
        { name: "اتباع التعليمات", level: 100, category: "Soft" },
        { name: "العمل الجماعي", level: 100, category: "Soft" },


      ],
    },
    experience: {
      title: "الخبرات",
      items: [
        { title: "مطور", company: "مركز الاتصالات وتكنولوجيا المعلومات، جامعة العاصمة", period: "سبتمبر 2025 - حتى الان", description: "تصميم وتطوير وصيانة أنظمة ويب قابلة للتوسع لجامعة العاصمة (المعروفة سابقًا بجامعة حلوان)، مصر.." },
        { title: "متدرب", company: "البنك التجاري الدولي (CIB)", period: "يوليو 2025 - أغسطس 2025", description: "اكتسبت خبرة عملية في أنظمة تكنولوجيا المعلومات ودورها في دعم العمليات داخل القطاع المصرفي." },
        { title: "مدرب برمجة", company: "3C Online Coding School", period: "نوفمبر 2024 - حتى الان", description: "تدريس أساسيات البرمجة للأطفال من سن 10 إلى 18 عامًا." },
      ],
    },
    projects: {
      title: "المشاريع",
      filters: ["الكل", "أنظمة", "إدارة", "لحظي"],
      viewDetails: "عرض التفاصيل",
      items:[
        { id: "faulty", title: "بوابة اعضاء هيئة التدريس", category: "أنظمة", summary: "بوابة إلكترونية تُستخدم لإدارة الأبحاث العلمية والمؤهلات الأكاديمية لأعضاء هيئة التدريس، مع إمكانية عرض البيانات الأكاديمية وتنظيمها في مكان واحد، مما يسهل متابعة الإنجازات وتوثيقها.", tech: ["ASP.NET Core", "SQL Server"] },
        { id: "port", title: "نظام ادارة للموانئ البحرية", category: "إدارة", summary: "نظام إلكتروني متكامل يُستخدم لإدارة وتنظيم العمليات داخل الموانئ، مثل استقبال ومغادرة السفن، وإدارة الحاويات، وتتبع الشحنات، وتنسيق عمليات التحميل والتفريغ. يهدف النظام إلى تحسين كفاءة التشغيل، تقليل الوقت والتكلفة، وتسهيل متابعة حركة البضائع والسفن بشكل دقيق ومنظم.", tech: ["ASP.NET Core", "SQL Server"] },
        { id: "clinic", title: "منصة (Healx) للعيادات الطبية", category: "إدارة", summary: "منصة إلكترونية متكاملة تتيح للمرضى استعراض قائمة الأطباء المتاحين بكل سهولة، مع إمكانية الاطلاع على تخصص كل طبيب، ومواعيد العمل، والتقييمات، واختيار الطبيب المناسب. يوفّر النظام إمكانية حجز المواعيد بشكل مباشر حسب الأوقات المتاحة، بالإضافة إلى التواصل مع الطبيب قبل أو بعد الحجز عند الحاجة. يهدف النظام إلى تسهيل الوصول للخدمات الطبية، وتنظيم عملية الحجز، وتحسين تجربة المريض من خلال واجهة بسيطة وسريعة الاستخدام.", tech: ["Web API", "EF Core", "React"] },
        { id: "ticket", title: "منصة (Ticket Now) لحجز التذاكر", category: "أنظمة", summary: "تطبيق إلكتروني يتيح للمستخدمين تصفح الرحلات أو الفعاليات المتاحة، واختيار الميعاد المناسب، وحجز التذاكر بشكل سريع وآمن. يوفّر النظام إمكانية إدارة الحجوزات، عرض التفاصيل، وتتبع حالة التذكرة، مما يُسهل عملية الحجز ويُحسن تجربة المستخدم.", tech: ["C#", "REST API", "React"] },
        { id: "Judical", title: "منصة ميزان للشؤون القضائية", category: "أنظمة", summary: "ظام “ميزان” للمحاماة هو نظام إلكتروني متكامل يهدف إلى إدارة وتنظيم أعمال مكاتب المحاماة بشكل احترافي. يتيح النظام تسجيل وإدارة القضايا، متابعة الجلسات والمواعيد، وتنظيم بيانات العملاء والمحامين داخل المكتب. كما يدعم النظام توثيق كافة تفاصيل القضايا مثل المستندات، الملاحظات، والتواريخ المهمة، مع إمكانية تتبع حالة كل قضية بشكل دقيق.", tech: ["C#", "REST API", "React"] },      
      ],
    },
    certifications: {
      title: "التعليم والتدريب",
      status: "موثّق",
      buttonTitle:"عرض الشهادة",
      items: [
        { title: "تدريب CIB الصيفي - The Green Leap", issuer: "البنك التجاري الدولي (يوليو 2025)" },
        { title: "تطوير ويب باستخدام تقنيات .NET", issuer: "معهد تكنولوجيا المعلومات ITI" },
        { title: "تدريب Fullstack .NET", issuer: "مبادرة رواد مصر الرقمية DEPI" },
        { title: "مقدمة في Docker", issuer: "KodeKloud" },
      ],
    },
    contact: {
      title: "تواصل معي",
      subtitle:"تواصل معي عبر منصات التواصل الاجتماعي و منصات العمل الحر."
    },
    socialPlatforms:{
      title:"منصات التواصل الاجتماعي",
      items:[
        { label: "لينكد ان", href: "https://www.linkedin.com/in/ahmedehab5006/", image: "/platforms/linkedin.svg" },
        { label: "واتساب", href: "https://wa.me/201550529558", image: "/platforms/whatsapp.svg" },
      ],
    },
    freelancePlatforms:{
      title:"منصات العمل الحر",
      items:[
        { label: "مستقل", href: "https://mostaql.com/u/AhmedEhab5006", image: "/platforms/mostaql.svg" },
        { label: "خمسات", href: "https://khamsat.com/user/ahmedehab5006", image: "/platforms/khamsat.svg" },
        { label: "Upwork", href: "https://www.upwork.com/freelancers/~015b2cc921861bf367", image: "/platforms/upwork.svg" },
        { label: "Freelancer", href: "https://www.freelancer.com/u/AhmedEhab5006", image: "/platforms/freelancer.svg" },
        { label: "نفذلي", href: "https://nafezly.com/u/AhmedEhab15102004500", image: "/platforms/nafezly.svg" },
        { label: "كفيل", href: "https://kafiil.com/u/ahmedehab13", image: "/platforms/kafiil.svg" },
      ],
    },
    footer: `© ${new Date().getFullYear()} جميع الحقوق محفوظة - أحمد ايهاب`,
  },
};
