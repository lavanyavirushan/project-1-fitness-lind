function renderWorkoutVideoUI(result){

    const currentWorkoutItem = workoutVideoHTML(result.name, result.type, result.difficulty, result.muscle, result.instructions);
    $("#workoutsVideo").append(currentWorkoutItem);
    //console.log(currentWorkoutItem)
  
}

function workoutVideoHTML(workoutName, workoutType, workoutDifficulty, workoutMuscle, workoutInstructions){
    return `          <article class="pt-4 sm:p-6 lg:p-4 xl:p-6 items-start sm:space-x-0">
    <div class="aspect-w-16 w-full block">
      <iframe
        src="https://www.youtube.com/embed/r9jwGansp1E"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="w-full aspect-video"
      ></iframe>
    </div>
    <div class="min-w-0 p-4 sm:p-0">
      <h2
        class="font-semibold truncate sm:pr-20 text-slate-100 text-lg"
      >
        ${workoutName}
      </h2>
      <dl
        class="mt-2 flex-none md:flex md:flex-wrap text-sm md:text-md leading-6 font-medium"
      >
        <div class="text-emerald-200 w-fit">
          <dd
            class="px-1.5 ring-1 ring-slate-200 rounded ring-emerald-200"
          >
            ${workoutMuscle}
          </dd>
        </div>
        <div class="flex mt-2 md:mt-0 text-emerald-100">
          <div class="md:ml-2">
            <dd class="">${workoutType}</dd>
          </div>
          <div class="">
            <dd class="flex items-center">
              <svg
                width="2"
                height="2"
                fill="currentColor"
                class="mx-2 text-slate-300"
                aria-hidden="true"
              >
                <circle cx="1" cy="1" r="1"></circle></svg
              >${workoutDifficulty}
            </dd>
          </div>
        </div>
        <div class="flex-none w-full md:mt-2 font-normal">
          <dt class="sr-only">Details</dt>
          <h2 class="font-semibold pt-2">Workout Description</h2>
          <p class="text-slate-200">
           ${workoutInstructions}
          </p>
        </div>
      </dl>

      <a
        href="../html/workout_new.html"
        class="py-2 rounded-full mt-4 bg-emerald-300 pl-4 pr-4 float-right mb-6"
      >
        Go Back
      </a>
    </div>
  </article>`
}