// api endpoint::get
const baseUrl = "https://private-e05942-courses22.apiary-mock.com/courses";

const fetchCourses = async () => {
  try {
    let response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch courses:  ${response.status}`);
    }

    return await response.json();
  } catch (e) {}
};

// fetch data for courses selected
const fetchCourseSelected = async (courseId) => {
  try {
    let response = await fetch(`${baseUrl}/${courseId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch selected course: ${response.status}`);
    }

    let data = await response.json().then((data) => {
      showCourseSelected(data);
    });
  } catch (e) {}
};

// get current location of user
const fetchUserLocation = async () => {
  let response = await fetch(
    `http://api.ipstack.com/check?access_key=c3c591964f41a4d13d7900615a9cae67`
  );
  return await response.json();
};

// fetch all courses
const listCourses = (postContainerElement) => {
  postContainerElement = document.getElementById(postContainerElement);
  if (!postContainerElement) {
    return;
  }

  fetchCourses()
    .then((courses) => {
      if (!courses) {
        postContainerElement.innerHTML = "No courses";
        return;
      }

      for (const course of courses) {
        postContainerElement.appendChild(postElement(course));
      }
    })
    .catch((e) => {});
};

listCourses("courses");

const postElement = (course) => {
  const anchorElement = document.createElement("button");
  const courseId = course.slug;
  anchorElement.addEventListener("click", () => {
    fetchCourseSelected(courseId);
  });
  anchorElement.innerText = course.slug;
  const postTitleElement = document.createElement("h3");
  postTitleElement.appendChild(anchorElement);
  return postTitleElement;
};

const showCourseSelected = (course) => {
  let currencyType = 0;
  fetchUserLocation().then((location) => {
    if (location.continent_name === "Europe") {
      return currencyType === 1;
    } else {
      return currencyType === 0;
    }
  });
  let tab = `
  <h2>${course.description}</h2>
  <p>date: ${course.start_dates[0]}</p>
  <p>${course.prices[currencyType].currency}: ${course.prices[currencyType].amount}</p>`;

  document.getElementById("course").innerHTML = tab;
};
