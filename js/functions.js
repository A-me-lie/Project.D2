
// G
// CODE According to specification
function click_filter_element(event) {

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  event.target.classList.toggle("selected");
  update_programmes();
}


// G
// CODE according to specification
function create_filter_element(data) {
  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

  let li_element = document.createElement("li");
  data.parent.append(li_element);
  li_element.classList.add(data.class);
  li_element.textContent = data.textContent;
  li_element.addEventListener("click", click_filter_element);

  return li_element;

}


// VG
// CODE according to specification
function add_group_toggling(filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */

}


// VG
// CODE according to specifications
function toggle_cities(event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */

}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city


function create_countries_cities_filters() {

  /*
   ARGUMENTS
      This function does not take any arguments
  
   SIDE EFFECTS
      This function modifies the DOM by appending elements for countries and cities under a specific container.
      Uses predefined global arrays COUNTRIES and CITIES.
      Uses functions array_each(array, callback) and create_city.

    NO RETURN VALUE
      
  */

  function create_country(country) {
    /*
    ARGUMENTS
      country: An object representing a country. It has to have the following properties:
      id (number): A unique identifier for the country.
      name (string): The name of the country.

    SIDE EFFECTS
      This function adds classlist "country" and "filter_container" as well as id "country_country.id" to a div element which is appended to the ul element in #country_filter div
      Uses the global array CITIES, which contains objects representing cities.
      Uses external funtions array_each and array_filter
      The CITIES array is filtered to include only the cities that belong to the current country using the array_filter function with a callback 
      (test_function) that checks if the countryID of a city matches the id of the country.

    NO RETURN VALUE
    */
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }


  function create_city(city) {

    /*
    ARGUMENTS
      city: An object representing a city. It has to have the following properties:
      id (number): Unique identifier for the city.
      name (string): Name of the city.
      countryID (number): Identifier of the country to which the city belongs.

    SIDE EFFECTS:
      Creates a li element representing the city.
      Appends this li element to the ul inside the div with an id corresponding to #country_<city.countryID>.
      Uses the function create_filter_element(options): It creates a DOM element based on the provided options and returns it

    NO RETURN VALUE
    */

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;
  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//  As you can see, all three functions below do basically the same thing.
//  Abstract them to one function, and write the specification of that function.

function create_filter_elements(array, parentSelector) {

  /*
  ARGUMENTS
    array: An array of objects where each object represents a filter item and must have the following properties:
    id (number): Unique identifier for the filter item.
    name (string): Name of the filter item.

    parentSelector: A string representing the CSS selector of the parent container to which the created elements will be appended. 
    This container should contain a ul element where the li elements will be appended.

  SIDE EFFECTS
    Creates a li element for each filter item in the array.
    Appends each li element to the ul inside the specified parent container.
    Uses functions array_each(array, callback) and create_filter_element(options),a function that creates a DOM element based on the provided options and returns it

  NO RETURN VALUE
  */
  function create_element(filterItem) {
    const dom = create_filter_element({
      parent: document.querySelector(`${parentSelector} > ul`),
      class: "selected",
      textContent: filterItem.name,
    });
    dom.dataset.id = filterItem.id;
  }
  array_each(array, create_element);
}

// function create_levels_filter() {
// function create_level(level) {
// const dom = create_filter_element({
// parent: document.querySelector("#level_filter > ul"),
// class: "selected",
// textContent: level.name,
// });
// dom.dataset.id = level.id;
// }
// array_each(LEVELS, create_level);
// }
// Create Subjects Filter
// function create_subjects_filter() {
// function create_subject(subject) {
// const dom = create_filter_element({
// parent: document.querySelector("#subject_filter > ul"),
// class: "selected",
// textContent: subject.name,
// });
// dom.dataset.id = subject.id;
// }
// array_each(SUBJECTS, create_subject);
// }
// Create Search Field
// function create_language_filter() {
// function create_element(data) {
// const dom = create_filter_element({
// parent: document.querySelector("#language_filter > ul"),
// class: "selected",
// textContent: data.name,
// });
// dom.dataset.id = data.id;
// }
// array_each(LANGUAGES, create_element);
// }


// G / VG (see details in specification)
// CODE according to specifications
function create_programme(programme) {

  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */
  let university_object = array_find(UNIVERSITIES, (university) => {
    return university.id === programme.universityID;
  })

  let city_object = array_find(CITIES, (city) => {
    return city.id === university_object.cityID;
  })

  let country_object = array_find(COUNTRIES, (country) => {
    return country.id === city_object.countryID;
  })

  let level_object = array_find(LEVELS, (level) => {
    return level.id === programme.levelID;
  })

  let language_object = array_find(LANGUAGES, (language) => {
    return language.id === programme.languageID;
  })

  let subject_object = array_find(SUBJECTS, (subject) => {
    return subject.id === programme.subjectID;
  })

  let Maxsun = Math.max(...CITIES.map(city => city.sun));

  CITIES.forEach(city => {
    city.sunPercentage = Math.floor((city.sun) * 365);
  });

  let programmes = document.getElementById("programmes");
  let ul = programmes.querySelector("ul");
  let li = document.createElement("li");
  li.classList.add("programme");

  li.innerHTML = `
  <div>
  <div><strong>${programme.name}</strong></div>
  <div>${university_object.name}</div>
  <div>${city_object.name + "," + country_object.name}</div>
  <div>${level_object.name + ", " + subject_object.name + ", " + language_object.name}</div>
  </div>

  <div class="bottom_programme">
  <div>${city_object.name + ", " + "sun-index: " + city_object.sun + " (" + Math.floor((100 * city_object.sun) / 365) + "%)"}</div>
  </div>
  `;

  ul.append(li);

}


// G
// CODE according to the specification
function update_programmes() {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */

  const filteredProgrammes = read_filters();

  clear_programme_display();

  array_each(filteredProgrammes, (programme) => {
    create_programme(programme);
  });


  const noProgrammesMessage = document.querySelector('#programmes > p');
  if (filteredProgrammes.length === 0) {
    noProgrammesMessage.style.display = 'block';
  } else {
    noProgrammesMessage.style.display = 'none';
  }
}

// Function to clear the programme display container
function clear_programme_display() {
  const programmeContainer = document.querySelector('#programmes > ul');
  if (programmeContainer) {
    programmeContainer.innerHTML = ''; // Clear existing programmes
  }


}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
function read_filters() {
  /*
  NO ARGUMENTS

  SIDE EFFECTS: 
    This function uses global arrays UNIVERSITIES and PROGRAMMES
    This function uses array_each(array,callback) and array_filter(array,callback)

  RETURN VALUE: 
    This function return all the programmes in an array that match what is selected from the filters.
  */

  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    // This function takes a DOM element representing a selected city, 
    // extracts its ID from the dataset, parses it to an whole number, and adds it to an array called city_id_selected
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    // This function iterates over an array of universities retrieves the ID of each university, 
    // and then iterates over all programs in the global PROGRAMMES array. 
    // For each program, if its universityID matches the ID of the current university, the program is added to the programmes array.
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    // This function takes a DOM element representing a selected level, 
    // extracts its ID from the dataset, parses it to an whole number(interger), and adds it to an array called level_id_selected
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    // This function checks if a given program matches any of the selected level IDs and returns true if a match is found, otherwise false
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    // This function takes a DOM element representing a selected language, 
    // extracts its ID from the dataset, parses it to an whole number(interger), and adds it to an array called language_id_selected
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language(programme) {
    // This function checks if a given program matches any of the selected language IDs and returns true if a match is found, otherwise false.
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    // This function takes a DOM element representing a selected subject, 
    // extracts its ID from the dataset, parses it to an whole number(interger), and adds it to an array called subject_id_selected
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject(programme) {
    // This function checks if a given program matches any of the selected subject IDs and returns true if a match is found, otherwise false.
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      // This function checks if a given program matches the input from the search field and returns true if a match is found, otherwise false.
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }
  return programmes;
}
