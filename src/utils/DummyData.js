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
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    contact: {
      email: "anatoly.belik@example.com",
      phone: "+91 98765 43210",
      dob: "1990-03-15",
      panCard: "ABCDE1234F",
      maritalStatus: "Married",
      bloodGroup: "B+",
      address: "123, MG Road, New Delhi, 110001",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
      },
      {
        type: "Aadhar",
        label: "View",
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
      },
      {
        type: "Bank Statement",
        label: "View",
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
        occupation: "Teacher",
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
      dob: "1995-07-21",
      panCard: "FGHIJ5678K",
      maritalStatus: "Single",
      bloodGroup: "O+",
      address: "45, Residency Road, Bangalore, 560025",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/sophia/pan.pdf",
      },
      {
        type: "Aadhar",
        label: "View",
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
    name: "Priya Nair",
    jobTitle: "UI/UX Designer",
    department: "Design",
    site: "Kochi",
    salary: "$1,250",
    startDate: "Oct 15, 2021",
    lifecycle: "Hired",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    contact: {
      email: "priya.nair@example.com",
      phone: "+91 99887 66554",
      dob: "1994-12-05",
      panCard: "BCDEF4567G",
      maritalStatus: "Single",
      bloodGroup: "A-",
      address: "55, Marine Drive, Kochi, 682031",
    },
    documents: [
      {
        type: "Aadhar",
        label: "View",
        url: "https://example.com/docs/priya/aadhar.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Radha Nair", relation: "Mother", phone: "+91 99887 66555" },
    ],
    education: [
      {
        degree: "B.Des",
        institute: "NIFT Bangalore",
        result: "7.8 CGPA",
        year: 2015,
      },
    ],
    family: [
      {
        name: "Ramesh Nair",
        relation: "Father",
        dob: "1962-03-19",
        occupation: "Engineer",
      },
    ],
  },
  {
    id: 7,
    name: "Rahul Verma",
    jobTitle: "QA Engineer",
    department: "Testing",
    site: "Pune",
    salary: "$1,100",
    startDate: "Dec 09, 2022",
    lifecycle: "Hired",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    contact: {
      email: "rahul.verma@example.com",
      phone: "+91 98770 22334",
      dob: "1993-06-10",
      panCard: "CDEFG8901H",
      maritalStatus: "Single",
      bloodGroup: "B-",
      address: "34, FC Road, Pune, 411004",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/rahul/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Vikas Verma", relation: "Brother", phone: "+91 98770 22335" },
    ],
    education: [
      {
        degree: "BCA",
        institute: "Pune University",
        result: "7.5 CGPA",
        year: 2014,
      },
    ],
    family: [
      {
        name: "Meena Verma",
        relation: "Mother",
        dob: "1968-08-10",
        occupation: "Homemaker",
      },
    ],
  },
  {
    id: 8,
    name: "Ananya Iyer",
    jobTitle: "Data Analyst",
    department: "Analytics",
    site: "Hyderabad",
    salary: "$1,500",
    startDate: "Nov 03, 2020",
    lifecycle: "Promoted",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    contact: {
      email: "ananya.iyer@example.com",
      phone: "+91 97651 33445",
      dob: "1992-01-29",
      panCard: "HIJKL1234M",
      maritalStatus: "Married",
      bloodGroup: "AB-",
      address: "76, Banjara Hills, Hyderabad, 500034",
    },
    documents: [
      {
        type: "Aadhar",
        label: "View",
        url: "https://example.com/docs/ananya/aadhar.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Rohit Iyer", relation: "Husband", phone: "+91 97651 33446" },
    ],
    education: [
      {
        degree: "B.Sc Statistics",
        institute: "Osmania University",
        result: "8.1 CGPA",
        year: 2013,
      },
      {
        degree: "M.Sc Data Science",
        institute: "BITS Pilani",
        result: "8.7 CGPA",
        year: 2016,
      },
    ],
    family: [
      {
        name: "Aarohi Iyer",
        relation: "Daughter",
        dob: "2020-09-14",
        occupation: "Kid",
      },
    ],
  },
  {
    id: 9,
    name: "Vikram Singh",
    jobTitle: "Network Engineer",
    department: "IT",
    site: "Chandigarh",
    salary: "$1,300",
    startDate: "Feb 14, 2018",
    lifecycle: "Transferred",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    contact: {
      email: "vikram.singh@example.com",
      phone: "+91 91222 66778",
      dob: "1989-04-15",
      panCard: "MNOPQ5678R",
      maritalStatus: "Married",
      bloodGroup: "O+",
      address: "12, Sector 17, Chandigarh, 160017",
    },
    documents: [
      {
        type: "PAN",
        label: "View",
        url: "https://example.com/docs/vikram/pan.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Neha Singh", relation: "Wife", phone: "+91 91222 66779" },
    ],
    education: [
      {
        degree: "B.Tech (IT)",
        institute: "Punjab University",
        result: "7.9 CGPA",
        year: 2010,
      },
    ],
    family: [
      {
        name: "Aryan Singh",
        relation: "Son",
        dob: "2016-05-05",
        occupation: "Student",
      },
    ],
  },
  {
    id: 10,
    name: "Sneha Das",
    jobTitle: "Content Writer",
    department: "Marketing",
    site: "Kolkata",
    salary: "$1,000",
    startDate: "Jun 01, 2022",
    lifecycle: "Hired",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    contact: {
      email: "sneha.das@example.com",
      phone: "+91 98111 44556",
      dob: "1996-08-18",
      panCard: "RSTUV3456W",
      maritalStatus: "Single",
      bloodGroup: "B+",
      address: "45, Park Street, Kolkata, 700016",
    },
    documents: [
      {
        type: "Aadhar",
        label: "View",
        url: "https://example.com/docs/sneha/aadhar.pdf",
      },
    ],
    emergencyContacts: [
      { name: "Amit Das", relation: "Father", phone: "+91 98111 44557" },
    ],
    education: [
      {
        degree: "BA English",
        institute: "Jadavpur University",
        result: "First Class",
        year: 2017,
      },
      {
        degree: "MA English",
        institute: "JNU Delhi",
        result: "8.5 CGPA",
        year: 2019,
      },
    ],
    family: [
      {
        name: "Nirmala Das",
        relation: "Mother",
        dob: "1970-11-30",
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
  { name: "Actions", label: "Actions", status: false },
];
