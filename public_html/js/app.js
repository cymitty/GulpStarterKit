
tasks = document.querySelectorAll('.tasks');
const totalCost = document.querySelector('.total-price .price-text');
const totalTime = document.querySelector('.total-time .time-text');

function calcTotalCost() {
  let activeInputs = document.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked');
  let time = 0;
  let timeCounter = 6;
  let cost = 0;
  activeInputs.forEach(function (input) {
    console.log(input.dataset.price);
    cost += parseInt(input.dataset.price);
    time += parseInt(input.dataset.time);
  });
  time = parseInt(time/timeCounter);
  totalCost.textContent = cost.toString();
  totalTime.textContent = time.toString();
}


tasks.forEach(function (task) {
  task = task.children;
  Array.from(task).forEach(function (el) {
    const taskRadioInputs = el.querySelectorAll('input[type="radio"]');
    const taskCheckboxInputs = el.querySelectorAll('input[type="checkbox"]');

    taskRadioInputs.forEach(function (taskRadioInput) {

      taskRadioInput.addEventListener('change', function () {

        taskRadioInputs.forEach(function (input) {
          input.checked = false;
        });

        this.checked = true;
        calcTotalCost();
      });

    });

    taskCheckboxInputs.forEach(function (taskCheckboxInput) {

      taskCheckboxInput.addEventListener('change', function () {
        calcTotalCost();
      });

    });

  });

});

actionActivateInputs = document.querySelectorAll('.action-checked-links');
actionActivateInputs.forEach(function (button) {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    parent = this.closest('.task');
    let taskRadioInputs = parent.querySelectorAll('input[type="radio"]');
    let taskCheckboxInputs = parent.querySelectorAll('input[type="checkbox"]');
    taskRadioInputs.forEach(function (input) {
      input.checked = true;
      calcTotalCost();
    });
    taskCheckboxInputs.forEach(function (input) {
      input.checked = true;
      calcTotalCost();
    });

  });
});

actionDeactivateInputs = document.querySelectorAll('.action-unchecked-links');
actionDeactivateInputs.forEach(function (button) {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    parent = this.closest('.task');
    let taskRadioInputs = parent.querySelectorAll('input[type="radio"]');
    let taskCheckboxInputs = parent.querySelectorAll('input[type="checkbox"]');
    taskRadioInputs.forEach(function (input) {
      input.checked = false;
      calcTotalCost();
    });
    taskCheckboxInputs.forEach(function (input) {
      input.checked = false;
      calcTotalCost();
    });

  });
});