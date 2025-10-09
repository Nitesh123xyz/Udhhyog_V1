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
    salary: "$1,350",
    startDate: "Mar 13, 2023",
    lifecycle: "Hired",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    contact: {
      email: "anatoly.belik@example.com",
      phone: "+91 98765 43210",
      whatsapp: "+91 98234 55678",
      dob: "1990-03-15",
      maritalStatus: "Married",
      bloodGroup: "B+",
      address: "123, MG Road, New Delhi, 110001",
    },
    documents: [
      {
        type: "PAN",
        doc: "ABCDE1234F",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
      },
      {
        type: "Aadhar",
        doc: "756674788844",
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
      },
      {
        type: "Bank",
        doc: "756674788844",
        url: "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6557420216a456cfaef685c0_6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1-p-1600.jpg",
      },
    ],
    emergencyContacts: [
      { name: "Ravi Kumar", relation: "Brother", phone: "+91 98765 43211" },
    ],
    education: [
      {
        degree: "B.Tech (CSE)",
        institute: "IIT Delhi",
        result: "8.6 CGPA",
        year: 2011,
      },
    ],
    family: [
      {
        name: "Neha Sharma",
        relation: "Wife",
        dob: "1991-05-20",
        phone: "+91 98765 43212",
        occupation: "Teacher",
      },
    ],
    bank: {
      accountHolder: "John Doe",
      bankName: "HDFC Bank",
      accountNumber: "123456789012",
      ifsc: "HDFC0001234",
      branch: "Connaught Place, New Delhi",
      upi: "john.doe@hdfcbank",
    },
    experience: [
      {
        company: "TCS",
        role: "Software Engineer",
        startDate: "Jan 2018",
        endDate: "Mar 2020",
        year: "2 year",
      },
      {
        company: "Wipro",
        role: "System Analyst",
        startDate: "Apr 2020",
        endDate: "Mar 2022",
        year: "3 year",
      },
      {
        company: "Infosys",
        role: "Senior Developer",
        startDate: "Apr 2022",
        endDate: "Working",
        year: "1 year",
      },
    ],
  },
  {
    id: 2,
    name: "Sophia Mehra",
    jobTitle: "Software Engineer",
    department: "Development",
    site: "Bangalore",
    salary: "$1,200",
    startDate: "Jan 10, 2022",
    lifecycle: "Active",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    contact: {
      email: "sophia.mehra@example.com",
      phone: "+91 98234 55678",
      whatsapp: "+91 98234 55678",
      dob: "1995-07-21",
      maritalStatus: "Single",
      bloodGroup: "O+",
      address: "45, Residency Road, Bangalore, 560025",
    },
    documents: [
      {
        type: "PAN",
        doc: "48UWDGUWD",
        url: "https://example.com/docs/sophia/pan.pdf",
      },
      {
        type: "Aadhar",
        doc: "93883837873",
        url: "https://example.com/docs/sophia/aadhar.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Anita Mehra", relation: "Mother", phone: "+91 98234 55679" },
    ],
    education: [
      {
        degree: "B.Sc IT",
        institute: "Christ University",
        result: "7.9 CGPA",
        year: 2016,
      },
      {
        degree: "M.Tech",
        institute: "NIT Trichy",
        result: "8.3 CGPA",
        year: 2019,
      },
    ],
    family: [
      {
        name: "Ramesh Mehra",
        relation: "Father",
        dob: "1960-04-12",
        occupation: "Businessman",
      },
    ],
  },
  {
    id: 3,
    name: "Arjun Patel",
    jobTitle: "Project Manager",
    department: "Operations",
    site: "Ahmedabad",
    salary: "$1,800",
    startDate: "May 05, 2021",
    lifecycle: "Promoted",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    contact: {
      email: "arjun.patel@example.com",
      phone: "+91 97654 12345",
      dob: "1987-11-03",
      panCard: "LMNOP9012Q",
      maritalStatus: "Married",
      bloodGroup: "A+",
      address: "76, CG Road, Ahmedabad, 380009",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/arjun/pan.pdf",
      },
      {
        type: "Aadhar",
        label: "View",
        url: "https://example.com/docs/arjun/aadhar.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Pooja Patel", relation: "Wife", phone: "+91 97654 67890" },
    ],
    education: [
      {
        degree: "BBA",
        institute: "Gujarat University",
        result: "First Class",
        year: 2008,
      },
      {
        degree: "MBA",
        institute: "IIM Ahmedabad",
        result: "8.1 CGPA",
        year: 2010,
      },
    ],
    family: [
      {
        name: "Rohit Patel",
        relation: "Son",
        dob: "2015-06-14",
        occupation: "Student",
      },
    ],
  },
  {
    id: 4,
    name: "Maya Sharma",
    jobTitle: "HR Manager",
    department: "Human Resources",
    site: "Delhi",
    salary: "$1,600",
    startDate: "Aug 20, 2020",
    lifecycle: "Hired",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    contact: {
      email: "maya.sharma@example.com",
      phone: "+91 96543 11223",
      dob: "1992-02-18",
      panCard: "QRSTU3456V",
      maritalStatus: "Married",
      bloodGroup: "AB+",
      address: "89, Connaught Place, New Delhi, 110001",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/maya/pan.pdf",
      },
      {
        type: "Aadhar",
        label: "View",
        url: "https://example.com/docs/maya/aadhar.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Sunil Sharma", relation: "Husband", phone: "+91 96543 44556" },
    ],
    education: [
      {
        degree: "BA Psychology",
        institute: "Delhi University",
        result: "First Class",
        year: 2012,
      },
      {
        degree: "MBA HR",
        institute: "Symbiosis Pune",
        result: "8.0 CGPA",
        year: 2015,
      },
    ],
    family: [
      {
        name: "Aarav Sharma",
        relation: "Son",
        dob: "2019-01-10",
        occupation: "Kid",
      },
    ],
  },
  {
    id: 5,
    name: "Kabir Khan",
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    site: "Mumbai",
    salary: "$1,400",
    startDate: "Jul 11, 2019",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: {
      email: "kabir.khan@example.com",
      phone: "+91 91234 55678",
      dob: "1991-09-23",
      panCard: "VWXYZ6789A",
      maritalStatus: "Single",
      bloodGroup: "O-",
      address: "12, Bandra West, Mumbai, 400050",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/kabir/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Imran Khan", relation: "Brother", phone: "+91 91234 55679" },
    ],
    education: [
      {
        degree: "B.Com",
        institute: "Mumbai University",
        result: "First Class",
        year: 2011,
      },
      {
        degree: "MBA Marketing",
        institute: "NMIMS Mumbai",
        result: "8.2 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Nazia Khan",
        relation: "Mother",
        dob: "1965-06-15",
        occupation: "Homemaker",
      },
    ],
  },
  {
    id: 6,
    name: "Kabir Khan",
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    site: "Mumbai",
    salary: "$1,400",
    startDate: "Jul 11, 2019",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: {
      email: "kabir.khan@example.com",
      phone: "+91 91234 55678",
      dob: "1991-09-23",
      panCard: "VWXYZ6789A",
      maritalStatus: "Single",
      bloodGroup: "O-",
      address: "12, Bandra West, Mumbai, 400050",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/kabir/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Imran Khan", relation: "Brother", phone: "+91 91234 55679" },
    ],
    education: [
      {
        degree: "B.Com",
        institute: "Mumbai University",
        result: "First Class",
        year: 2011,
      },
      {
        degree: "MBA Marketing",
        institute: "NMIMS Mumbai",
        result: "8.2 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Nazia Khan",
        relation: "Mother",
        dob: "1965-06-15",
        occupation: "Homemaker",
      },
    ],
  },
  {
    id: 7,
    name: "Kabir Khan",
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    site: "Mumbai",
    salary: "$1,400",
    startDate: "Jul 11, 2019",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: {
      email: "kabir.khan@example.com",
      phone: "+91 91234 55678",
      dob: "1991-09-23",
      panCard: "VWXYZ6789A",
      maritalStatus: "Single",
      bloodGroup: "O-",
      address: "12, Bandra West, Mumbai, 400050",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/kabir/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Imran Khan", relation: "Brother", phone: "+91 91234 55679" },
    ],
    education: [
      {
        degree: "B.Com",
        institute: "Mumbai University",
        result: "First Class",
        year: 2011,
      },
      {
        degree: "MBA Marketing",
        institute: "NMIMS Mumbai",
        result: "8.2 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Nazia Khan",
        relation: "Mother",
        dob: "1965-06-15",
        occupation: "Homemaker",
      },
    ],
  },
  {
    id: 8,
    name: "Kabir Khan",
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    site: "Mumbai",
    salary: "$1,400",
    startDate: "Jul 11, 2019",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: {
      email: "kabir.khan@example.com",
      phone: "+91 91234 55678",
      dob: "1991-09-23",
      panCard: "VWXYZ6789A",
      maritalStatus: "Single",
      bloodGroup: "O-",
      address: "12, Bandra West, Mumbai, 400050",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/kabir/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Imran Khan", relation: "Brother", phone: "+91 91234 55679" },
    ],
    education: [
      {
        degree: "B.Com",
        institute: "Mumbai University",
        result: "First Class",
        year: 2011,
      },
      {
        degree: "MBA Marketing",
        institute: "NMIMS Mumbai",
        result: "8.2 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Nazia Khan",
        relation: "Mother",
        dob: "1965-06-15",
        occupation: "Homemaker",
      },
    ],
  },
  {
    id: 9,
    name: "Kabir Khan",
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    site: "Mumbai",
    salary: "$1,400",
    startDate: "Jul 11, 2019",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: {
      email: "kabir.khan@example.com",
      phone: "+91 91234 55678",
      dob: "1991-09-23",
      panCard: "VWXYZ6789A",
      maritalStatus: "Single",
      bloodGroup: "O-",
      address: "12, Bandra West, Mumbai, 400050",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/kabir/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Imran Khan", relation: "Brother", phone: "+91 91234 55679" },
    ],
    education: [
      {
        degree: "B.Com",
        institute: "Mumbai University",
        result: "First Class",
        year: 2011,
      },
      {
        degree: "MBA Marketing",
        institute: "NMIMS Mumbai",
        result: "8.2 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Nazia Khan",
        relation: "Mother",
        dob: "1965-06-15",
        occupation: "Homemaker",
      },
    ],
  },
  {
    id: 10,
    name: "Kabir Khan",
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    site: "Mumbai",
    salary: "$1,400",
    startDate: "Jul 11, 2019",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: {
      email: "kabir.khan@example.com",
      phone: "+91 91234 55678",
      dob: "1991-09-23",
      panCard: "VWXYZ6789A",
      maritalStatus: "Single",
      bloodGroup: "O-",
      address: "12, Bandra West, Mumbai, 400050",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/kabir/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Imran Khan", relation: "Brother", phone: "+91 91234 55679" },
    ],
    education: [
      {
        degree: "B.Com",
        institute: "Mumbai University",
        result: "First Class",
        year: 2011,
      },
      {
        degree: "MBA Marketing",
        institute: "NMIMS Mumbai",
        result: "8.2 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Nazia Khan",
        relation: "Mother",
        dob: "1965-06-15",
        occupation: "Homemaker",
      },
    ],
  },
  {
    id: 11,
    name: "Kabir Khan",
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    site: "Mumbai",
    salary: "$1,400",
    startDate: "Jul 11, 2019",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: {
      email: "kabir.khan@example.com",
      phone: "+91 91234 55678",
      dob: "1991-09-23",
      panCard: "VWXYZ6789A",
      maritalStatus: "Single",
      bloodGroup: "O-",
      address: "12, Bandra West, Mumbai, 400050",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/kabir/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Imran Khan", relation: "Brother", phone: "+91 91234 55679" },
    ],
    education: [
      {
        degree: "B.Com",
        institute: "Mumbai University",
        result: "First Class",
        year: 2011,
      },
      {
        degree: "MBA Marketing",
        institute: "NMIMS Mumbai",
        result: "8.2 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Nazia Khan",
        relation: "Mother",
        dob: "1965-06-15",
        occupation: "Homemaker",
      },
    ],
  },
  {
    id: 12,
    name: "Kabir Khan",
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    site: "Mumbai",
    salary: "$1,400",
    startDate: "Jul 11, 2019",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: {
      email: "kabir.khan@example.com",
      phone: "+91 91234 55678",
      dob: "1991-09-23",
      panCard: "VWXYZ6789A",
      maritalStatus: "Single",
      bloodGroup: "O-",
      address: "12, Bandra West, Mumbai, 400050",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/kabir/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Imran Khan", relation: "Brother", phone: "+91 91234 55679" },
    ],
    education: [
      {
        degree: "B.Com",
        institute: "Mumbai University",
        result: "First Class",
        year: 2011,
      },
      {
        degree: "MBA Marketing",
        institute: "NMIMS Mumbai",
        result: "8.2 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Nazia Khan",
        relation: "Mother",
        dob: "1965-06-15",
        occupation: "Homemaker",
      },
    ],
  },
  {
    id: 13,
    name: "Kabir Khan",
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    site: "Mumbai",
    salary: "$1,400",
    startDate: "Jul 11, 2019",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: {
      email: "kabir.khan@example.com",
      phone: "+91 91234 55678",
      dob: "1991-09-23",
      panCard: "VWXYZ6789A",
      maritalStatus: "Single",
      bloodGroup: "O-",
      address: "12, Bandra West, Mumbai, 400050",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/kabir/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Imran Khan", relation: "Brother", phone: "+91 91234 55679" },
    ],
    education: [
      {
        degree: "B.Com",
        institute: "Mumbai University",
        result: "First Class",
        year: 2011,
      },
      {
        degree: "MBA Marketing",
        institute: "NMIMS Mumbai",
        result: "8.2 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Nazia Khan",
        relation: "Mother",
        dob: "1965-06-15",
        occupation: "Homemaker",
      },
    ],
  },
  {
    id: 14,
    name: "Kabir Khan",
    jobTitle: "Marketing Specialist",
    department: "Marketing",
    site: "Mumbai",
    salary: "$1,400",
    startDate: "Jul 11, 2019",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    contact: {
      email: "kabir.khan@example.com",
      phone: "+91 91234 55678",
      dob: "1991-09-23",
      panCard: "VWXYZ6789A",
      maritalStatus: "Single",
      bloodGroup: "O-",
      address: "12, Bandra West, Mumbai, 400050",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/kabir/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Imran Khan", relation: "Brother", phone: "+91 91234 55679" },
    ],
    education: [
      {
        degree: "B.Com",
        institute: "Mumbai University",
        result: "First Class",
        year: 2011,
      },
      {
        degree: "MBA Marketing",
        institute: "NMIMS Mumbai",
        result: "8.2 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Nazia Khan",
        relation: "Mother",
        dob: "1965-06-15",
        occupation: "Homemaker",
      },
    ],
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
];
