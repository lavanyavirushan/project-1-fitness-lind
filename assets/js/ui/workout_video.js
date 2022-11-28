/**
 * Update the DOM with rendered html dom
 * @param {name: string, muscle, type, difficulty, instructions} result 
 * @param string video 
 */
function renderWorkoutVideoUI(result, video){
    const currentWorkoutItem = workoutVideoHTML(result, video);
    $("#workoutsVideo").append(currentWorkoutItem);
}

/**
 * Creates a singular video dom as string
 * @param {name, muscle, type, difficulty, instructions} workout 
 * @param {string} video 
 * @returns string
 */
function workoutVideoHTML(workout, video){
    return `<article class="pt-4 sm:p-6 lg:p-4 xl:p-6 items-start sm:space-x-0">
    <div class="aspect-w-16 w-full block">
      <iframe
        src="https://www.youtube.com/embed/${video}"
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
        ${workout.name}
      </h2>
      <dl
        class="mt-2 flex-none md:flex md:flex-wrap text-sm md:text-md leading-6 font-medium"
      >
        <div class="text-emerald-200 w-fit">
          <dd
            class="px-1.5 ring-1 ring-slate-200 rounded ring-emerald-200 capitalize"
          >
            ${workout.muscle}
          </dd>
        </div>
        <div class="flex mt-2 md:mt-0 text-emerald-100">
          <div class="md:ml-2">
            <dd class="capitalize">${workout.type}</dd>
          </div>
          <div class="capitalize">
            <dd class="flex items-center">
              <svg
                width="2"
                height="2"
                fill="currentColor"
                class="mx-2 text-slate-300"
                aria-hidden="true"
              >
                <circle cx="1" cy="1" r="1"></circle></svg
              >${workout.difficulty}
            </dd>
          </div>
        </div>
        <div class="flex-none w-full md:mt-2 font-normal">
          <dt class="sr-only">Details</dt>
          <h2 class="font-semibold pt-2">Workout Description</h2>
          <p class="text-slate-200">
           ${workout.instructions}
          </p>
        </div>
      </dl>

      <a
        href="../html/workout.html"
        class="py-2 rounded-full mt-4 bg-emerald-300 pl-4 pr-4 float-right mb-6"
      >
        Go Back
      </a>
    </div>
  </article>`
}