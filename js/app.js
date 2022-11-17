// api endpoint::get
const BASE_URL = 'https://private-e05942-courses22.apiary-mock.com/courses'
const BASE_URL_2 = 'https://private-e05942-courses22.apiary-mock.com/courses/'

const fetchCourse = async (base_url) => {
  let response = await fetch(base_url)

  // fetch data using fetch api
  let courses = await response.json()
  console.log(courses)
  show(courses)
}

// fetch seletected course data 
const fetchSelectedCourse = async (courseId) => {
  let response = await fetch(BASE_URL_2 + courseId)
  let course = await response.json()
  console.log(course)
}

fetchCourse(BASE_URL)

const show = (courses) => {
  let tab = ''
  const courseSelected = document.getElementById('course')
  courses.map(
    (item) =>
      (tab += `<div>
    <li id="course-item">title: ${item.title} </li>
    <li>slug: ${item.slug}</li>
    <li>date: ${item.next_start_formatted}</li> 
    <li>url: <a href=${item.url}>${item.title}</a></li></div><hr/>`),
  ),
    (document.getElementById('courses').innerHTML = tab)
}