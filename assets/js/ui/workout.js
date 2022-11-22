function workoutsUI(results){

  results.forEach(result => {
        console.log(result)
        const workoutItem = workoutHTML(result.name, result.type, result.difficulty, result.muscle, result.instructions);
        $("#workouts").append(workoutItem);
  });

  
}

function workoutHTML(workoutName, workoutType, workoutDifficulty, workoutMuscle, workoutInstructions){
    return `<article
    class="p-4 sm:p-6 lg:p-4 xl:p-6 space-x-4 items-start sm:space-x-6 lg:space-x-4 xl:space-x-6 flex">
    <img
      src="https://cdn.muscleandstrength.com/sites/default/files/field/image/article/chest_thumb.jpg"
      loading="lazy"
      decoding="async"
      alt=""
      class="flex-none rounded-md bg-slate-100 w-24 sm:w-40 hidden sm:block"/>
    <div class="min-w-0 relative flex-auto">
      <h2 class="font-semibold truncate sm:pr-20 text-slate-100 text-lg">
        ${workoutName}
      </h2>
      <dl class="mt-2 flex-none md:flex md:flex-wrap text-sm md:text-md leading-6 font-medium">
        <div class="text-emerald-200 w-fit">
          <dd class="px-1.5 ring-1 ring-slate-200 rounded ring-emerald-200">
            ${workoutMuscle}
          </dd>
        </div>
        <div class="flex mt-2 md:mt-0 text-emerald-100">
          <div class="md:ml-2 ">
            <dd class="">${workoutType}</dd>
          </div>
          <div class="">
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