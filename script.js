const departments = [
    {
        name: "Administration",
        employees: [
            { firstName: "Zoë", lastName: "Robins" },
            { firstName: "Madeleine", lastName: "Madden" }
        ]
    },
    {
        name: "Audit",
        employees: [
            { firstName: "Josha", lastName: "Sadowski" },
            { firstName: "Kate", lastName: "Fleetwood" }
        ]
    },
    {
        name: "Banking Operations",
        employees: [
            { firstName: "Priyanka", lastName: "Bose" },
            { firstName: "Hammed", lastName: "Animashaun" },
            { firstName: "Álvaro", lastName: "Morte" },
            { firstName: "Taylor", lastName: "Napier" },
            { firstName: "Alan", lastName: "Simmonds" }
        ]
    },
    {
        name: "Communications",
        employees: [
            { firstName: "Gil", lastName: "Cardinal" },
            { firstName: "Richard J.", lastName: "Lewis" }
        ]
    },
    {
        name: "Corporate Services",
        employees: [
            { firstName: "Randy", lastName: "Bradshaw" },
            { firstName: "Tracey", lastName: "Cook" },
            { firstName: "Lubomir", lastName: "Mykytiuk" }
        ]
    },
    {
        name: "Facilities",
        employees: [
            { firstName: "Dakota", lastName: "House" },
            { firstName: "Lori Lea", lastName: "Okemah" },
            { firstName: "Renae", lastName: "Morrisseau" },
            { firstName: "Rick", lastName: "Belcourt" }
        ]
    },
    {
        name: "Financial Services",
        employees: [
            { firstName: "Selina", lastName: "Hanusa" },
            { firstName: "Buffy", lastName: "Gaudry" },
            { firstName: "Shaneen Ann", lastName: "Fox" },
            { firstName: "Allan", lastName: "Little" },
            { firstName: "Danny", lastName: "Rabbit" }
        ]
    },
    {
        name: "Human Resources",
        employees: [
            { firstName: "Jesse Ed", lastName: "Azure" },
            { firstName: "Stacy", lastName: "Da Silva" },
            { firstName: "Vladimír", lastName: "Valenta" },
            { firstName: "Samone", lastName: "Sayeses-Whitney" },
            { firstName: "Paul", lastName: "Coeur" }
        ]
    },
    {
        name: "Information Technology",
        employees: [
            { firstName: "Graham", lastName: "Greene" },
            { firstName: "Sandika", lastName: "Evergreen" },
            { firstName: "Jennifer", lastName: "Rodriguez" }
        ]
    },
    {
        name: "IT Technician",
        employees: [
            { firstName: "Aiyana", lastName: "Littlebear" },
            { firstName: "Inara", lastName: "Thunderbird" },
            { firstName: "Kaya", lastName: "Runningbrook" },
            { firstName: "Elara", lastName: "Firehawk" },
            { firstName: "Siona", lastName: "Moonflower" },
            { firstName: "Kaiyu", lastName: "Greywolf" },
            { firstName: "Ayawamat", lastName: "Nightwind" },
            { firstName: "Tala", lastName: "Braveheart" },
            { firstName: "Iniko", lastName: "Stonebear" },
            { firstName: "Onatah", lastName: "Redhawk" }
        ]
    }
];

// Function to populate employee list
function populateEmployeeList() {
    const mainElement = document.getElementById('employee-list');
    
    // Loop through each department
    departments.forEach(department => {
        // Create department section
        const departmentSection = document.createElement('section');
        departmentSection.className = 'department-section';
        
        // Create department heading
        const departmentHeading = document.createElement('h2');
        departmentHeading.className = 'department-name';
        departmentHeading.textContent = department.name;
        departmentSection.appendChild(departmentHeading);
        
        // Create employee list
        const employeeList = document.createElement('ul');
        employeeList.className = 'employee-list';
        
        // Add each employee to the list
        department.employees.forEach(employee => {
            const employeeItem = document.createElement('li');
            employeeItem.className = 'employee-item';
            
            // Format employee name
            const fullName = employee.lastName 
                ? `${employee.firstName} ${employee.lastName}` 
                : employee.firstName;
            employeeItem.textContent = fullName;
            
            employeeList.appendChild(employeeItem);
        });
        
        departmentSection.appendChild(employeeList);
        mainElement.appendChild(departmentSection);
    });
}
// Function to set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
}

// Run functions when page content has loaded
document.addEventListener('DOMContentLoaded', function() {
    populateEmployeeList();
    setCurrentYear();
});
