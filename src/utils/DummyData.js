export const dummyData = [
  {
    name: "John Doe",
    permissions: {
      all: false,
      view: false,
      edit: false,
      add: false,
      del: false,
    },
  },
  {
    name: "Jane Smith",
    permissions: {
      all: false,
      view: false,
      edit: false,
      add: false,
      del: false,
    },
  },
  {
    name: "Rahul Patel",
    permissions: {
      all: false,
      view: false,
      edit: false,
      add: false,
      del: false,
    },
  },

  // More samples
  {
    name: "Aarav Mehta",
    permissions: { all: true, view: true, edit: true, add: true, del: true },
  },
  {
    name: "Priya  Kaur",
    permissions: {
      all: false,
      view: true,
      edit: false,
      add: false,
      del: false,
    },
  }, // double space
  {
    name: "Vikram-Singh",
    permissions: { all: false, view: true, edit: true, add: false, del: false },
  }, // hyphen
  {
    name: "  Neha  Sharma  ",
    permissions: {
      all: false,
      view: false,
      edit: true,
      add: false,
      del: false,
    },
  }, // leading/trailing/multiple spaces
  {
    name: "Mohd. Faizan",
    permissions: { all: false, view: true, edit: false, add: true, del: false },
  },
  {
    name: "Anita D'Souza",
    permissions: { all: false, view: false, edit: false, add: true, del: true },
  }, // apostrophe
  {
    name: "S. R. Iyer",
    permissions: { all: false, view: true, edit: false, add: false, del: true },
  }, // initials
  {
    name: "Rakesh    Kumar",
    permissions: {
      all: false,
      view: false,
      edit: false,
      add: false,
      del: true,
    },
  }, // many spaces
  {
    name: "Meera Chawla",
    permissions: {
      all: false,
      view: true,
      edit: false,
      add: false,
      del: false,
    },
  },
  {
    name: "Sameer    Khan",
    permissions: { all: false, view: false, edit: true, add: true, del: false },
  },
  {
    name: "Elena Grace",
    permissions: { all: false, view: true, edit: true, add: true, del: false },
  },
  {
    name: "José  Álvarez",
    permissions: {
      all: false,
      view: true,
      edit: false,
      add: false,
      del: false,
    },
  }, // accent chars
  {
    name: "Zara Ali",
    permissions: {
      all: false,
      view: false,
      edit: false,
      add: false,
      del: false,
    },
  },
  {
    name: "Dev Patel",
    permissions: {
      all: false,
      view: false,
      edit: true,
      add: false,
      del: false,
    },
  },
  {
    name: "John   Doe",
    permissions: {
      all: false,
      view: false,
      edit: false,
      add: true,
      del: false,
    },
  }, // duplicate-ish with extra spaces
  {
    name: "Arun N.",
    permissions: {
      all: false,
      view: true,
      edit: false,
      add: false,
      del: false,
    },
  },
  {
    name: "Leena   Kapoor",
    permissions: {
      all: false,
      view: false,
      edit: false,
      add: false,
      del: true,
    },
  },
];

// =============================================

export const employees = [
  {
    id: 1,
    name: "Anatoly Belik",
    jobTitle: "Head of Design",
    department: "Product",
    site: "Stockholm",
    salary: "$1,350",
    startDate: "Mar 13, 2023",
    lifecycle: "Hired",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Ksenia Bator",
    jobTitle: "Fullstack Engineer",
    department: "Engineering",
    site: "Miami",
    salary: "$1,500",
    startDate: "Oct 13, 2023",
    lifecycle: "Hired",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    highlighted: true,
  },
  {
    id: 3,
    name: "Bogdan Nikitin",
    jobTitle: "Mobile Lead",
    department: "Product",
    site: "Kyiv",
    salary: "$2,600",
    startDate: "Nov 4, 2023",
    lifecycle: "Employed",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Arsen Yatsenko",
    jobTitle: "Sales Manager",
    department: "Operations",
    site: "Ottawa",
    salary: "$900",
    startDate: "Sep 4, 2021",
    lifecycle: "Employed",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Daria Yurchenko",
    jobTitle: "Network Engineer",
    department: "Product",
    site: "Sao Paulo",
    salary: "$1,000",
    startDate: "Feb 21, 2023",
    lifecycle: "Hired",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Yulia Polishchuk",
    jobTitle: "Head of Design",
    department: "Product",
    site: "London",
    salary: "$1,700",
    startDate: "Aug 2, 2024",
    lifecycle: "Employed",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Marcus Reed",
    jobTitle: "UI/UX Designer",
    department: "Design",
    site: "Berlin",
    salary: "$1,400",
    startDate: "May 15, 2022",
    lifecycle: "Employed",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1502767089025-6572583495b4?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "Sophia Lee",
    jobTitle: "Frontend Developer",
    department: "Engineering",
    site: "Singapore",
    salary: "$1,800",
    startDate: "Jan 5, 2024",
    lifecycle: "Hired",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 9,
    name: "Daniel Carter",
    jobTitle: "Project Manager",
    department: "Operations",
    site: "New York",
    salary: "$2,200",
    startDate: "Apr 18, 2021",
    lifecycle: "Employed",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 10,
    name: "Priya Sharma",
    jobTitle: "QA Engineer",
    department: "Engineering",
    site: "Delhi",
    salary: "$1,100",
    startDate: "Jun 10, 2023",
    lifecycle: "Hired",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 11,
    name: "Oliver Brown",
    jobTitle: "Backend Developer",
    department: "Engineering",
    site: "Sydney",
    salary: "$2,000",
    startDate: "Jul 22, 2022",
    lifecycle: "Employed",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 12,
    name: "Amelia Thompson",
    jobTitle: "HR Manager",
    department: "Human Resources",
    site: "Toronto",
    salary: "$1,600",
    startDate: "Feb 14, 2021",
    lifecycle: "Employed",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 13,
    name: "Lucas Miller",
    jobTitle: "DevOps Engineer",
    department: "Engineering",
    site: "San Francisco",
    salary: "$2,400",
    startDate: "Oct 30, 2023",
    lifecycle: "Hired",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1546456073-6712f79251bb?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 14,
    name: "Emma Wilson",
    jobTitle: "Marketing Lead",
    department: "Marketing",
    site: "Paris",
    salary: "$1,900",
    startDate: "Nov 11, 2022",
    lifecycle: "Employed",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 15,
    name: "Noah Anderson",
    jobTitle: "Support Specialist",
    department: "Customer Service",
    site: "Dubai",
    salary: "$1,050",
    startDate: "Jan 8, 2023",
    lifecycle: "Hired",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 16,
    name: "Mia Garcia",
    jobTitle: "Product Analyst",
    department: "Product",
    site: "Madrid",
    salary: "$1,450",
    startDate: "May 1, 2024",
    lifecycle: "Hired",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 17,
    name: "Ethan Martinez",
    jobTitle: "Software Architect",
    department: "Engineering",
    site: "Austin",
    salary: "$3,000",
    startDate: "Aug 21, 2020",
    lifecycle: "Employed",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 18,
    name: "Isabella Lopez",
    jobTitle: "Content Strategist",
    department: "Marketing",
    site: "Mexico City",
    salary: "$1,300",
    startDate: "Sep 15, 2023",
    lifecycle: "Hired",
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 19,
    name: "William Taylor",
    jobTitle: "Finance Manager",
    department: "Finance",
    site: "Chicago",
    salary: "$2,100",
    startDate: "Mar 3, 2022",
    lifecycle: "Employed",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 20,
    name: "Ava White",
    jobTitle: "Business Analyst",
    department: "Operations",
    site: "Johannesburg",
    salary: "$1,550",
    startDate: "Apr 9, 2024",
    lifecycle: "Hired",
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&fit=crop&crop=face",
  },
];

// =============================================

export const employeesHeading = [
  { name: "name", label: "Name", status: true },
  { name: "jobTitle", label: "Job Title", status: false },
  { name: "department", label: "Department", status: false },
  { name: "salary", label: "Salary", status: true },
  { name: "startDate", label: "Start Date", status: true },
  { name: "lifecycle", label: "Lifecycle", status: false },
  { name: "Status", label: "status", status: false },
  { name: "Actions", label: "Actions", status: false },
];
