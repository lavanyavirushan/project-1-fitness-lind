const difficultyLevel = document.getElementById('difficulty-level');
const workoutType = document.getElementById('workout-type');
const workoutMuscle = document.getElementById('muscle-group');
let userFilter = {
  difficultyLevel: "beginner",
  workoutType: "",
  workoutMuscle: ""
}

/**
 * Removes all the workouts in container and appends each workout retuned by API
 * @param Object results 
 */
function workoutsUI(results){
  $("#workouts").html("")
  results.forEach(result => {
        const workoutItem = workoutHTML(result.name, result.type, result.difficulty, result.muscle, result.instructions);
        $("#workouts").append(workoutItem);
  });
}

/**
 * This creates singular workout as html sting to be added in DOM
 * @param String workoutName 
 * @param String workoutType 
 * @param String workoutDifficulty 
 * @param String workoutMuscle 
 * @param String workoutInstructions 
 * @returns 
 */
function workoutHTML(workoutName, workoutType, workoutDifficulty, workoutMuscle, workoutInstructions){
    return `<article 
    onclick="selectWorkoutVideo('${workoutName}', '${workoutType.replace("_", " ")}', '${workoutDifficulty}', '${workoutMuscle.replace("_", " ")}', '${workoutInstructions}')"
    class="p-4 sm:p-6 lg:p-4 xl:p-6 space-x-none items-start sm:space-x-6 lg:space-x-4 xl:space-x-6 flex cursor-pointer hover:bg-emerald-700">
    <img
      src="../images/workouts/${workoutMuscle}.png"
      loading="lazy"
      decoding="async"
      alt="${workoutMuscle} image"
      class="flex-none rounded-md bg-slate-100 h-28 hidden sm:block"/>
    <div class="min-w-0 relative flex-auto">
      <h2 class="font-semibold truncate sm:pr-20 text-slate-100 text-lg">
        ${workoutName}
      </h2>
      <dl class="mt-2 flex-none md:flex md:flex-wrap text-sm md:text-md leading-6 font-medium">
        <div class="text-emerald-200 w-fit">
          <dd class="px-1.5 ring-1 ring-slate-200 rounded ring-emerald-200 capitalize">
            ${workoutMuscle.replace("_", " ")}
          </dd>
        </div>
        <div class="flex mt-2 md:mt-0 text-emerald-100">
          <div class="md:ml-2 ">
            <dd class="capitalize">${workoutType.replace("_", " ")}</dd>
          </div>
          <div class="capitalize">
            <dd class="flex items-center">
              <svg
                width="2"
                height="2"
                fill="currentColor"
                class="mx-2 text-slate-300"
                aria-hidden="true">
                <circle cx="1" cy="1" r="1"></circle></svg>${workoutDifficulty}
            </dd>
          </div>
        </div>  
        <div class="flex-none w-full md:mt-2 font-normal">
          <dt class="sr-only">Cast</dt>
          <p class="text-slate-200 overflow-hidden truncate ">${workoutInstructions}</p>
        </div>
      </dl>
    </div>
  </article>`;
}


/**
 * Filter for listening when user selects defficulity level and updates UI
 */
difficultyLevel.addEventListener("change", function(){
  userFilter.difficultyLevel = this.value
  workout(userFilter.difficultyLevel, userFilter.workoutType, userFilter.workoutMuscle)
});

/**
 * Filter for listening when user selects workout type and updates UI
 */
workoutType.addEventListener("change", function(){
  userFilter.workoutType = this.value
  workout(userFilter.difficultyLevel, userFilter.workoutType, userFilter.workoutMuscle)
});

/**
 * Filter for listening when user selects workout muscle and updates UI
 */
workoutMuscle.addEventListener("change", function(){
  userFilter.workoutMuscle = this.value
  workout(userFilter.difficultyLevel, userFilter.workoutType, userFilter.workoutMuscle)
});