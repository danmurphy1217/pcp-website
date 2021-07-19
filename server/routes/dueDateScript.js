import fetch from "node-fetch";
import pkg from "selenium-webdriver";
const { Builder, By, Key, until } = pkg;
import express from "express";
import axios from "axios";
import config from "config";

const router = express.Router();
const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

router.get("/setDueDates", async (req, res) => {
  try {
    // const results = await getDueDateFromAirtable(
    //   "Data Visualization with Tableau",
    //   "Project 1"
    // );
    const driver = await getPageWithDriver(
      "https://qa2.pathstream.com/coach/dashboard"
    );
    console.log(driver);
    authenticate(driver);
    findCohortButtonForCorrectCourse(driver, "");

    return res.status(200).send({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

async function convertToLinkedName(cellId, projectName) {
  const headers = {
    authorization: process.env.AIRTABLE_BEARER_KEY,
    accept: "application/json;",
  };
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/appBRLEUdTlfhgkUZ/Courses/${cellId}`,
      { headers: headers }
    );
    const jsonData = await response.json();
    // console.log("IN CONVERT TO LINKED NAME FUNC: ", jsonData);

    return jsonData.fields["Course Name"];
  } catch (error) {
    throw new Error(error);
  }
}

async function getDueDateFromAirtable(courseName, projectName) {
  console.log(process.env.AIRTABLE_BEARER_KEY);
  const headers = {
    authorization: process.env.AIRTABLE_BEARER_KEY,
    accept: "application/json;",
  };
  try {
    const response = await fetch(
      "https://api.airtable.com/v0/appBRLEUdTlfhgkUZ/Projects?fields%5B%5D=Course&fields%5B%5D=Project%20Name&fields%5B%5D=Due%20Date&fields%5B%5D=Start%20Date",
      { headers: headers }
    );

    const jsonData = await response.json();
    const records = jsonData.records;

    records.forEach(async (record) => {
      const courseReference = record.fields.Course;
      const projectReference = record.fields["Project Name"];
      const dueDate = record.fields["Due Date"];

      const linkedCourseName = await convertToLinkedName(
        courseReference[0],
        projectName
      );

      console.log("HERE: ", courseReference[0], projectName);
      console.log("START");
      console.log(linkedCourseName);
      console.log(courseName);
      console.log(projectReference);
      console.log(projectName);
      console.log("\n");

      if (
        linkedCourseName === courseName[0] &&
        projectReference === projectName
      ) {
        console.log("HERE");
        console.log(dueDate, record.fields["Start Date"]);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function getPageWithDriver(url) {
  const driver = await new Builder().forBrowser("chrome").build();
  driver.get(url);
  return driver;
}

async function authenticate(driver) {
  const emailInput = await driver.wait(
    until.elementLocated(By.id("email")),
    10
  );
  emailInput.sendKeys("dan@pathstream.com");
  const passwordInput = await driver.wait(
    until.elementLocated(By.id("password")),
    10
  );
  passwordInput.sendKeys(process.env["USER_PW"]);
  await delay(1000); /// waiting 1 second.
  passwordInput.sendKeys(Key.ENTER);
}

async function findCohortButtonForCorrectCourse(driver, cohortName) {
  delay(10000);
  const divForCorrectCourse = await driver.findElements(
    By.xpath("//div[@class='cohort-group']")
  );
  console.log(divForCorrectCourse);

  for (const [index, element] of divForCorrectCourse.entries()) {
    console.log(index, element);
  }
  // TODO

  // parent_div_with_button = [(i, elem) for i, elem in enumerate(div_for_correct_course) if elem.text.split('\n')[0] == cohortName][0]

  // all_buttons = parent_div_with_button[1].find_elements_by_xpath("//span[contains(.,'View cohort')]")
  // button = all_buttons[parent_div_with_button[0]]

  // button.click()
}

async function clickAssignmentsTab(driver) {
  const assignmentsTab = await driver.wait(until.elementLocated(By.xpath("//span[contains(.,'Assignments')]")), 10)

  assignmentsTab.click();
}

async function findAndClickCorrectChild(project_name){
  const rootUl = await driver.wait(until.elementLocated(By.xpath("//div[@id='root']/div/div/div/section/main/section/aside/div/ul")), 10)
  all_lis = rootUl.wait(until.elementLocated(By.css("li")), 10)

  // TODO
  // li_names = [li.text for li in all_lis]

  // # need the name of the project/test
  // ul_child_n = li_names.index(project_name) + 1  # zero-indexing, so add one

  // tab_for_correct_assignment_name = driver.find_element_by_xpath(
      // f"//li[{ul_child_n}]/div")
  // tab_for_correct_assignment_name.click()
}

async function setAndSaveDueDate(dueDateAndTime) {
  const setDueDateBtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(.,'Set Due Date')]")), 10)
  setDueDateBtn.click()  // enter set due date modal / popup

  const inputElem = await driver.wait(until.elementLocated(By.xpath("//input")), 10)
  inputElem.click()  // click input tag
  delay(1000)
  // input custom date (this needs to be pulled from airtable later)
  inputElem.sendKeys("FORMATTED DUE DATE AND TIME")
  // inputElem.sendKeys(due_date_and_time.strftime("%Y-%m-%d 00:00:00"))
  delay(1000)
  const submitDueDateBtn = driver.wait(until.elementLocated(By.xpath("//button[contains(.,'Ok')]")), 10)
  
  submitDueDateBtn.click()

  const saveDueDateBtn = driver.wait(until.elementLocated(By.xpath("//button[contains(.,'Save')]")), 10)
  
  saveDueDateBtn.click()
}

async function getBrightspaceNameAndProjectNameFromAirtable() {
  const headers = {
      Authorization: os.environ.get("AIRTABLE_BEARER_KEY"),
      Accept: "application/json",
  }
  try {


  }
  catch (error) {
    throw new Error(error);
  }

  const courseSectionsResponse = await fetch(
    `https://api.airtable.com/v0/appBRLEUdTlfhgkUZ/Course%20Sections?view=Course%20Section%20Creation%20Script`,
    { headers: headers }
  );
  const jsonifiedResponse = await response.json()['records'];

  const projectsResponse = await fetch(
    "https://api.airtable.com/v0/appBRLEUdTlfhgkUZ/Projects", {headers: headers}
  )

  // tuple_of_names_and_projects = [(row['fields']['Brightspace Name'], row['fields']
                                  // ['Projects (from Course Version) (from Cohort Course Name)']) for row in jsonified_response]
  // projects_ids = [row[1] for row in tuple_of_names_and_projects]
  // flattened_proj_ids = [proj_id for proj_ids in projects_ids for proj_id in proj_ids]
  // print(flattened_proj_ids)
  
  const jsonifiedProjectsRes = await projectsResponse.json()['records']
  // return [row['fields'] for row in jsonified_projects_res if row['id'] in flattened_proj_ids]
}

export default router;
