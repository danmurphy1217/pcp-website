const fetch = require('node-fetch');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


async function convertToLinkedName(cellId, projectName){
    headers = {
        authorization: process.env.AIRTABLE_BEARER_KEY,
        accept: 'application/json;'
    };

    const response = await fetch(`https://api.airtable.com/v0/appBRLEUdTlfhgkUZ/Courses/${cellId}`, headers)
    const jsonData = await response.json();

    return jsonData.fields['Course Name'];

}

async function getDueDateFromAirtable(cellId, projectName) {
    headers = {
        authorization: process.env.AIRTABLE_BEARER_KEY,
        accept: 'application/json;'
    };

    const response = await fetch("https://api.airtable.com/v0/appBRLEUdTlfhgkUZ/Projects?fields%5B%5D=Course&fields%5B%5D=Project%20Name&fields%5B%5D=Due%20Date&fields%5B%5D=Start%20Date", headers)
    const jsonData = await response.json();
    const records = jsonData.records;
    
    for (record in records){
        const courseReference = record.fields.Course;
        const projectReference = record.fields["Project Name"];
        const dueDate = record.fields["Due Date"];

        const linkedCourseName = convertToLinkedName(courseReference[0], projectName);

        console.log("START")
        console.log(linked_course_name)
        console.log(course_name[0])
        console.log(project_reference)
        console.log(project_name)
        console.log("\n")

        if (linkedCourseName === courseName[0] && projectReference === projectName){
            console.log("HERE");
            console.log(dueDate, record.fields["Start Date"]);
        }
    }
}

getDueDateFromAirtable("", "Data Visualization with Tableau");