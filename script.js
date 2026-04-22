const workoutOptions = {
    "Push Hypertrophy": [
        "Cable Upright Row",
        "Dumbbell Lateral Raise",
        "Dumbbell Shoulder Press (Standing)",
        "Flat Dumbbell Press",
        "Dip",
        "Bench Press",
        "Cable Lateral Raise",
        "Machine Lateral Raise",
        "Cable Fly",
        "Dumbbell Fly",
        "Pec Deck",
        "Overhead Triceps Extension",
        "EZ-Bar Skullcrusher",
        "Dumbbell Skullcrusher"
    ],
    "Pull Hypertrophy": [
        "Lat Pulldown",
        "Pull-Up (Optional Assistance)",
        "Chin-Up",
        "Dumbbell Row",
        "Chest-Supported T-Bar Row",
        "Barbell Row",
        "Cable Lat Pull-In",
        "Cable Lat Pullover",
        "Dumbbell Lat Pullover",
        "Reverse Pec Deck",
        "Rope Facepull",
        "Reverse Cable Fly",
        "Bayesian Cable Curl",
        "Incline Dumbbell Curl",
        "Preacher Curl"
    ],
    "Legs Hypertrophy": [
        "Hack Squat",
        "Leg Press",
        "Dumbbell Lunge",
        "45 Degree Back Extension",
        "Good Morning",
        "Glute Ham Raise",
        "Leg Extension",
        "Seated Leg Curl",
        "Lying Leg Curl",
        "Nordic Ham Curl",
        "Standing Calf Raise",
        "Seated Calf Raise",
        "Leg Press Calf Press",
        "Roman Chair Leg Raise",
        "Hanging Leg Raise",
        "Bent-Knee Leg Raise"
    ],
    "Upper Body Strength": [
        "Machine Chest Press",
        "Bench Press",
        "Flat Dumbbell Press",
        "Chest-Supported T-Bar Row",
        "Barbell Row",
        "Dumbbell Row",
        "Dumbbell Lateral Raise",
        "Cable Lateral Raise",
        "Machine Lateral Raise",
        "Lat Pulldown",
        "Pull-Up (Optional Assistance)",
        "Chin-Up",
        "Pec Deck",
        "Dumbbell Fly",
        "Push-Up",
        "Preacher Curl",
        "EZ-Bar Biceps Curl",
        "Dumbbell Biceps Curl",
        "EZ-Bar Skullcrusher",
        "Dumbbell Skullcrusher",
        "Overhead Triceps Extension"
    ],
    "Lower Body Strength": [
        "Barbell Romanian Deadlift",
        "Dumbbell Romanian Deadlift",
        "Hip Thrust",
        "Leg Press",
        "Barbell Front Squat",
        "Dumbbell Lunge",
        "Glute Ham Raise",
        "45 Degree Back Extension",
        "Lying Leg Curl",
        "Seated Calf Raise",
        "Standing Calf Raise",
        "Leg Press Calf Press",
        "Cable Crunch",
        "Plate-Weighted Decline Sit-Up",
        "Hanging Leg Raise"
    ]
};

function getCurrentUser() {
    return localStorage.getItem("currentUser");
}

function setCurrentUser(name) {
    localStorage.setItem("currentUser", name);
}

function removeCurrentUser() {
    localStorage.removeItem("currentUser");
}

function getWorkouts() {
    let workouts = localStorage.getItem("workouts");

    if (workouts) {
        return JSON.parse(workouts);
    }
    else {
        return [];
    }
}

function saveWorkouts(workouts) {
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

function loadDarkMode() {
    let mode = localStorage.getItem("darkMode");

    if (mode === "on") {
        document.body.classList.add("darkMode");
    }
}

function setupDarkMode() {
    let darkButton = document.getElementById("darkModeButton");

    if (darkButton) {
        darkButton.addEventListener("click", function () {
            document.body.classList.toggle("darkMode");

            if (document.body.classList.contains("darkMode")) {
                localStorage.setItem("darkMode", "on");
            }
            else {
                localStorage.setItem("darkMode", "off");
            }
        });
    }
}

function setupLoginPage() {
    let nameInput = document.getElementById("userName");
    let loginButton = document.getElementById("loginButton");
    let logoutButton = document.getElementById("logoutButton");
    let welcomeMessage = document.getElementById("welcomeMessage");

    if (nameInput && loginButton && logoutButton && welcomeMessage) {
        let currentUser = getCurrentUser();

        if (currentUser) {
            welcomeMessage.textContent = "Welcome, " + currentUser;
            nameInput.value = currentUser;
        }

        loginButton.addEventListener("click", function () {
            let name = nameInput.value.trim();

            if (name === "") {
                welcomeMessage.textContent = "Please enter a name.";
            }
            else {
                setCurrentUser(name);
                welcomeMessage.textContent = "Welcome, " + name;
            }
        });

        logoutButton.addEventListener("click", function () {
            removeCurrentUser();
            nameInput.value = "";
            welcomeMessage.textContent = "You are logged out.";
        });
    }
}

function updateExerciseDropdown() {
    let workoutDay = document.getElementById("workoutDay");
    let exercise = document.getElementById("exercise");

    if (workoutDay && exercise) {
        let selectedDay = workoutDay.value;

        exercise.innerHTML = '<option value="">Select an exercise</option>';

        if (selectedDay !== "" && workoutOptions[selectedDay]) {
            for (let i = 0; i < workoutOptions[selectedDay].length; i++) {
                let option = document.createElement("option");
                option.value = workoutOptions[selectedDay][i];
                option.textContent = workoutOptions[selectedDay][i];
                exercise.appendChild(option);
            }
        }
    }
}

function createSetInputs() {
    let numberOfSets = document.getElementById("numberOfSets");
    let setInputs = document.getElementById("setInputs");

    if (!numberOfSets || !setInputs) {
        return;
    }

    setInputs.innerHTML = "";

    let count = parseInt(numberOfSets.value);

    if (isNaN(count) || count < 1) {
        return;
    }

    for (let i = 1; i <= count; i++) {
        let setBox = document.createElement("div");
        setBox.className = "setBox";

        setBox.innerHTML =
            "<h3>Set " + i + "</h3>" +
            "<label for='weight" + i + "'>Weight (lbs):</label>" +
            "<input type='number' id='weight" + i + "' min='0'>" +
            "<label for='reps" + i + "'>Reps:</label>" +
            "<input type='number' id='reps" + i + "' min='1'>" +
            "<label for='difficulty" + i + "'>Difficulty:</label>" +
            "<select id='difficulty" + i + "'>" +
            "<option value=''>Select difficulty</option>" +
            "<option value='Easy'>Easy</option>" +
            "<option value='Medium'>Medium</option>" +
            "<option value='Hard'>Hard</option>" +
            "</select>";

        setInputs.appendChild(setBox);
    }
}

function setupWorkoutForm() {
    let workoutForm = document.getElementById("workoutForm");
    let workoutDay = document.getElementById("workoutDay");
    let exercise = document.getElementById("exercise");
    let workoutDate = document.getElementById("workoutDate");
    let numberOfSets = document.getElementById("numberOfSets");
    let logMessage = document.getElementById("logMessage");

    if (workoutDay) {
        workoutDay.addEventListener("change", updateExerciseDropdown);
    }

    if (numberOfSets) {
        numberOfSets.addEventListener("input", createSetInputs);
    }

    if (workoutForm) {
        workoutForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let currentUser = getCurrentUser();

            if (!currentUser) {
                logMessage.textContent = "Please log in first.";
                return;
            }

            if (
                workoutDate.value === "" ||
                workoutDay.value === "" ||
                exercise.value === "" ||
                numberOfSets.value === ""
            ) {
                logMessage.textContent = "Please fill in all fields.";
                return;
            }

            let setCount = parseInt(numberOfSets.value);
            let setData = [];

            for (let i = 1; i <= setCount; i++) {
                let weightInput = document.getElementById("weight" + i);
                let repsInput = document.getElementById("reps" + i);
                let difficultyInput = document.getElementById("difficulty" + i);

                if (
                    !weightInput || weightInput.value === "" ||
                    !repsInput || repsInput.value === "" ||
                    !difficultyInput || difficultyInput.value === ""
                ) {
                    logMessage.textContent = "Please fill in every set field.";
                    return;
                }

                let oneSet = {
                    weight: weightInput.value,
                    reps: repsInput.value,
                    difficulty: difficultyInput.value
                };

                setData.push(oneSet);
            }

            let workouts = getWorkouts();

            let workout = {
                user: currentUser,
                date: workoutDate.value,
                day: workoutDay.value,
                exercise: exercise.value,
                setData: setData
            };

            workouts.push(workout);
            saveWorkouts(workouts);

            logMessage.textContent = "Workout saved.";

            workoutForm.reset();
            exercise.innerHTML = '<option value="">Select an exercise</option>';
            document.getElementById("setInputs").innerHTML = "";
        });
    }
}

function fillExerciseFilter() {
    let filterExercise = document.getElementById("filterExercise");

    if (filterExercise) {
        filterExercise.innerHTML = '<option value="All">All</option>';

        let allExercises = [];

        for (let day in workoutOptions) {
            for (let i = 0; i < workoutOptions[day].length; i++) {
                if (!allExercises.includes(workoutOptions[day][i])) {
                    allExercises.push(workoutOptions[day][i]);
                }
            }
        }

        allExercises.sort();

        for (let i = 0; i < allExercises.length; i++) {
            let option = document.createElement("option");
            option.value = allExercises[i];
            option.textContent = allExercises[i];
            filterExercise.appendChild(option);
        }
    }
}

function makeSetText(setData) {
    let text = "";

    for (let i = 0; i < setData.length; i++) {
        text += "Set " + (i + 1) + ": " + setData[i].weight + " lbs x " + setData[i].reps + " reps (" + setData[i].difficulty + ")";

        if (i < setData.length - 1) {
            text += "<br>";
        }
    }

    return text;
}

function displayHistory(filteredWorkouts) {
    let historyBody = document.getElementById("historyBody");
    let emptyMessage = document.getElementById("emptyMessage");

    if (!historyBody) {
        return;
    }

    historyBody.innerHTML = "";

    if (filteredWorkouts.length === 0) {
        emptyMessage.textContent = "No workouts saved yet.";
    }
    else {
        emptyMessage.textContent = "";
    }

    for (let i = 0; i < filteredWorkouts.length; i++) {
        let row = document.createElement("tr");

        row.innerHTML =
            "<td>" + filteredWorkouts[i].date + "</td>" +
            "<td>" + filteredWorkouts[i].day + "</td>" +
            "<td>" + filteredWorkouts[i].exercise + "</td>" +
            "<td>" + makeSetText(filteredWorkouts[i].setData) + "</td>" +
            "<td><button onclick='deleteWorkout(" + i + ")'>Delete</button></td>";

        historyBody.appendChild(row);
    }
}

function getCurrentUserWorkouts() {
    let currentUser = getCurrentUser();
    let workouts = getWorkouts();
    let userWorkouts = [];

    for (let i = 0; i < workouts.length; i++) {
        if (workouts[i].user === currentUser) {
            userWorkouts.push(workouts[i]);
        }
    }

    return userWorkouts;
}

function deleteWorkout(index) {
    let currentUser = getCurrentUser();
    let workouts = getWorkouts();
    let userIndexes = [];

    for (let i = 0; i < workouts.length; i++) {
        if (workouts[i].user === currentUser) {
            userIndexes.push(i);
        }
    }

    let realIndex = userIndexes[index];

    if (realIndex !== undefined) {
        workouts.splice(realIndex, 1);
        saveWorkouts(workouts);
        setupHistoryPage();
    }
}

function setupHistoryPage() {
    let historyTitle = document.getElementById("historyTitle");
    let filterButton = document.getElementById("filterButton");
    let showAllButton = document.getElementById("showAllButton");
    let filterDay = document.getElementById("filterDay");
    let filterExercise = document.getElementById("filterExercise");

    if (!historyTitle) {
        return;
    }

    let currentUser = getCurrentUser();

    if (!currentUser) {
        historyTitle.textContent = "No user is logged in. Please go to the Log Workout page.";
        displayHistory([]);
        return;
    }

    historyTitle.textContent = currentUser + "'s Workout History";

    fillExerciseFilter();

    let userWorkouts = getCurrentUserWorkouts();
    displayHistory(userWorkouts);

    if (filterButton) {
        filterButton.onclick = function () {
            let dayValue = filterDay.value;
            let exerciseValue = filterExercise.value;
            let filtered = [];

            for (let i = 0; i < userWorkouts.length; i++) {
                let dayMatch = (dayValue === "All" || userWorkouts[i].day === dayValue);
                let exerciseMatch = (exerciseValue === "All" || userWorkouts[i].exercise === exerciseValue);

                if (dayMatch && exerciseMatch) {
                    filtered.push(userWorkouts[i]);
                }
            }

            displayHistory(filtered);
        };
    }

    if (showAllButton) {
        showAllButton.onclick = function () {
            filterDay.value = "All";
            filterExercise.value = "All";
            displayHistory(userWorkouts);
        };
    }
}

loadDarkMode();
setupDarkMode();
setupLoginPage();
setupWorkoutForm();
setupHistoryPage();