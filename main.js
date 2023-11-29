//Exercise #1
const ageVerifier = () => {
    let age = document.getElementById('age').value;
    document.getElementById('age').value = '';
    if (!isEmpty(age) && (age >= 0 && age <= 120)) {
        return age >= 18 ? alert(`You have ${age} years old, you are of legal age`) : alert(`You have ${age} years old, you are not of legal age`);
    } else if (age > 120) {
        return alert("Are you sure? (Type a realistic age)")
    } else {
        return alert("Type a valid age")
    }
}
//End exercise #1

//Exercise #2
const hwScoreAdder = () => {
    let hwQuantity = document.getElementById('hwContainer').childElementCount + 1;
    let hwLimiter = hwQuantity < 4;
    if (hwLimiter) {
        let container = document.getElementById('hwContainer');
        container.appendChild(homeworkCreator(hwQuantity))
    } else {
        alert("The maximum of homeworks is 4")
    }
}

//Create new homeworks inputs
const homeworkCreator = (length) => {
    let divHomework = document.createElement('div')
    divHomework.id = `divHomework-${length}`
    divHomework.innerHTML = `
    <label for="hwScore-${length}">Type your Homework score:</label>
    <input type="number" id="hwScore-${length}" placeholder="Homework score">
    <button type="submit" onclick="deleter('${divHomework.id}')">-</button>
    <br>
    `
    return divHomework
}

//Get the final score
const finalScore = () => {
    resultCleaner("scoreResult")

    let empty = [];
    let validator = [];

    //Get the name
    let nameScore = document.getElementById('nameScore').value;
    empty[0] = isEmpty(nameScore.trim()) || !onlyLetters(nameScore);

    //Get carnet
    let carnetScore = document.getElementById('carnetScore').value;
    empty[1] = isEmpty(carnetScore.trim());

    //Get the examn score
    let examScore = document.getElementById('examScore').value;
    empty[2] = isEmpty(examScore);
    examScore = Number(examScore);
    validator[0] = validScore(examScore);

    //Get the attendance score
    let attendanceScore = document.getElementById('attendanceScore').value;
    empty[3] = isEmpty(attendanceScore);
    attendanceScore = Number(attendanceScore);
    validator[1] = validScore(attendanceScore);

    //Get the research score
    let researchScore = document.getElementById('researchScore').value;
    empty[4] = isEmpty(researchScore);
    researchScore = Number(researchScore)
    validator[2] = validScore(researchScore);

    //Get the homework scores
    let homeworkScore = document.querySelectorAll('#homework-score input')
    let homeworkSumm = 0;
    for (let i = 0; i < homeworkScore.length; i++) {
        empty[5 + i] = isEmpty(homeworkScore[i].value)
        validator[3 + i] = validScore(Number(homeworkScore[i].value))
        homeworkSumm += Number(homeworkScore[i].value)
    }

    //Validate all the values
    let emptyValidation = true;
    let scoreValidation = true;
    for (let j = 0; j < empty.length; j++) {
        if (!empty[j]) {
            if (validator[j] == false) {
                scoreValidation = false;
                break;
            }
        } else {
            emptyValidation = false;
            break;
        }
    }

    //Print if all values are correct
    let total = 0
    if (emptyValidation) {
        if (scoreValidation) {
            total = examScore * 0.2 + attendanceScore * 0.1 + researchScore * 0.3 + ((homeworkSumm * 0.4) / homeworkScore.length);
            let container = document.getElementById('exercise-2');
            let result = document.createElement('p')
            result.id = "scoreResult"
            result.innerHTML =
                `Name: ${nameScore} ${'&emsp;'} Id: ${carnetScore} ${'&emsp;'} Final Score: ${(total).toFixed(2)} `
            return container.appendChild(result)
        } else {
            return alert('Wrrite valid scores between 0 and 10')
        }
    } else {
        return alert('Must fill all the text field with valid values')
    }

}
//Ends exervise #2

//Exercise #3
const salaryIncrease = () => {
    resultCleaner("salary-result")

    let emptyName, emptySalary, emptyCategory;
    let validNumber;

    //Get name
    let name = document.getElementById('name-salary').value
    emptyName = isEmpty(name) || !onlyLetters(name)

    //Get Salary
    let salary = document.getElementById('base-salary').value
    emptySalary = isEmpty(salary)
    validNumber = isMoney(salary)

    let category = document.getElementById('select-salary').value;
    emptyCategory = isEmpty(category)

    //Validations
    if (!emptyName && !emptySalary && !emptyCategory) {
        if (validNumber) {
            let container = document.getElementById('exercise-3'); 
            let increase;
            switch (category) {
                case "A":
                    increase = salary * 0.15
                    break;
                case "B":
                    increase = salary * 0.30
                    break;
                case "C":
                    increase = salary * 0.10
                    break;
                case "D":
                    increase = salary * 0.20
                    break;
                default:
                    break;
            }
            let result = document.createElement('p');
            result.id = `salary-result`;
            result.innerHTML = `Name: ${name} ${'&emsp;'} Salary: ${salary} ${'&emsp;'} Category: ${category} ${'&emsp;'} Increase: ${increase}`
            return container.appendChild(result)
        } else {
            return alert('Wrrite a number equal or greater than 0')
        }
    } else {
        return alert('Must fill all the text field with valid values')
    }
}
//Ends exercise #3

//Exercise #4
const compareNumber = () => {
    resultCleaner("compare-result")

    let emptyNumberOne, emptyNumberTwo;

    //Get Number 1
    let numberOne = document.getElementById('compare-number-one').value
    emptyNumberOne = isEmpty(numberOne);

    //Get Number 2
    let numberTwo = document.getElementById('compare-number-two').value
    emptyNumberTwo = isEmpty(numberTwo);

    //Compare both numbers and do validations
    if (!Number.isInteger(Number(numberOne )) || !Number.isInteger(Number(numberTwo))) {
        return alert("Must type integer numbers")
    } else if (!emptyNumberOne && !emptyNumberTwo) {
        let container = document.getElementById('exercise-4');
        let format;
        if (numberOne > numberTwo) {
            format = `The number ${numberOne} is bigger`
        } else if (numberOne < numberTwo) {
            format = `The number ${numberTwo} is bigger`
        } else {
            format = `They are the same number: ${numberOne}`
        }
        let result = document.createElement('p');
        result.id = `compare-result`;
        result.innerHTML = format
        return container.appendChild(result)
    } else {
        return alert('Must fill all the text field with valid values')
    }
}
//Ends exercise #4

//Exercise #5
const carSelection = () => {
    resultCleaner("car-result")

    //Get selected value
    let car = document.getElementById('select-car').value
    let discount;
    switch (car) {
        case 'FORD FIESTA':
            discount = '5%'
            break;
        case 'FORD FOCUS':
            discount = '10%'
            break;
        case 'FORD ESCAPE':
            discount = '20%'
            break;
        default:
            return alert('Must select a valid value')
    }

    let container = document.getElementById('exercise-5');
    let result = document.createElement('p');
    result.id = `car-result`
    result.innerHTML = `${car} has a discount of ${discount}`
    return container.appendChild(result)

}
//Ends exercise #5

//Exercise #6
const travelDiscount = () => {
    resultCleaner("travel-result")

    //Get origin value
    let origin = document.getElementById('select-city-origin').value
    let destination = document.getElementById('select-city-destination').value

    if (isEmpty(origin)) {
        return alert('Must fill origin')
    } else if (isEmpty(destination)) {
        return alert('Must fill destination')
    }

    //Check the discount for the combination
    let format;
    if (origin == "Palma") {
        switch (destination) {
            case 'La costa del Sol':
                format = `The origin is: ${origin} and the destination is: ${destination}, the discount is 5%`
                break;
            case 'Panchimalco':
                format = `The origin is: ${origin} and the destination is: ${destination}, the discount is 10%`
                break;
            case 'Puerto el Triunfo':
                format = `The origin is: ${origin} and the destination is: ${destination}, the discount is 15%`
                break;
        }
    } else {
        format = `The origin is: ${origin} and the destination is: ${destination}, unfortunately there's no discount for this combination`
    }

    let container = document.getElementById('exercise-6');
    let result = document.createElement('p');
    result.id = `travel-result`
    result.innerHTML = format
    return container.appendChild(result)
}
//Ends exercise #6

//Exercise #7
//Set the validations for a new number
const numberAdder = () => {
    let number = document.getElementById('number-collector').value
    if (isEmpty(number)) {
        return alert("Must type a number")
    } else if (number == 0) {
        return alert("0 is not an integer")
    } else if (!Number.isInteger(Number(number)) && !(number == 0)) {
        return alert("Must type an integer number")
    }

    number = Number(document.getElementById('number-collector').value)
    let container = document.getElementById('list-number');
    let containerChildren = container.childElementCount;

    if (containerChildren <= 9) {
        document.getElementById('number-collector').value = ''
        return addNewNumber(number, container, containerChildren)
    } else {
        return alert("The maximum of numbers are 10")
    }

}

//Func that prints a new number
const addNewNumber = (number, container, length) => {
    let li = document.createElement('li');
    li.id = `compared-number-${length}`
    let numberSpan = document.createElement('span');
    numberSpan.id = `number-${length}`
    numberSpan.textContent = number;
    li.appendChild(numberSpan);
    li.appendChild(btnEdit(li));
    li.appendChild(btnDelete(li));
    document.getElementById('number-collector').focus();
    return container.appendChild(li);
}



//Func that compare all the numbers
const analyzeNumbers = () => {
    resultCleaner("div-positive");
    resultCleaner("div-negative");
    resultCleaner("div-multiple");
    resultCleaner("div-even");
    let numbers = document.querySelectorAll(`#list-number span`)
    let numberRows = document.getElementById('list-number').childElementCount;
    if (!(numberRows == 10)) {
        return alert('10 numbers are required')
    }

    //Storage and indexes
    let number = 0;
    let numbersPositive = []
    let positiveCount = 0;
    let numbersNegative = []
    let negativeCount = 0;
    let numbersMultipleFifteen = []
    let multipleCount = 0;
    let evenSummArray = []
    let evenSumm = 0;
    let evenCount = 0;

    //Assign categories
    for (let i = 0; i < numberRows; i++) {
        number = Number(numbers[i].textContent)
        if (number > 0) {
            numbersPositive[positiveCount] = number
            positiveCount++
        }

        if (number < 0) {
            numbersNegative[negativeCount] = number
            negativeCount++
        }

        if (number % 15 == 0) {
            numbersMultipleFifteen[multipleCount] = number
            multipleCount++
        }

        if (number % 2 == 0) {
            evenSummArray[evenCount] = number
            evenSumm += number
            evenCount++
        }
    }

    //Set the containers
    let container = document.getElementById('exercise-7');
    let divPositive = document.createElement('div')
    divPositive.id = "div-positive"
    let divNegative = document.createElement('div')
    divNegative.id = "div-negative"
    let divMultiple = document.createElement('div')
    divMultiple.id = "div-multiple"
    let divEven = document.createElement('div')
    divEven.id = "div-even"

    //Positive results
    let formatPositive = `There ${toBeForm(positiveCount)} ${positiveCount} positive numbers.`;
    numberDivBuilder(formatPositive, divPositive, numbersPositive, container)

    //Negative results
    let formatNegative = `There ${toBeForm(negativeCount)} ${negativeCount} negative numbers.`;
    numberDivBuilder(formatNegative, divNegative, numbersNegative, container)

    //Multiples of 15 results
    let formatMultiple = `There ${toBeForm(multipleCount)} ${multipleCount} numbers multiples of 15.`;
    numberDivBuilder(formatMultiple, divMultiple, numbersMultipleFifteen, container)

    //Even Sum results
    let formatEven = `There ${toBeForm(evenCount)} ${evenCount} even numbers, their sum is: ${evenSumm}.`;
    numberDivBuilder(formatEven, divEven, evenSummArray, container)
    return false
}

//Func that creates the number categories
const numberDivBuilder = (spanFormat, divType, numberArray, container) => {
    let span = document.createElement('span')
    span.innerHTML = spanFormat
    divType.appendChild(span)
    for (let i = 0; i < numberArray.length; i++) {
        let span = document.createElement('span')
        span.innerHTML = `${numberArray[i]}`
        divType.appendChild(span)
    }
    return container.appendChild(divType);
}
//Ends exercise #7

//Exercise #8
const multiplication = () => {
    resultCleaner("list-product")

    let factor = document.getElementById('multiplication-factor').value

    if (isEmpty(factor)) {
        return alert("Must type a number")
    }

    factor = Number(factor);
    let container = document.getElementById('exercise-8')
    let ul = document.createElement('ul')
    ul.id = "list-product"
    for (let i = 1; i <= 10; i++) {
        let li = document.createElement('li')
        li.textContent = `${factor} x ${i} = ${factor * i}`
        ul.appendChild(li)
    }

    return container.appendChild(ul)
}
//Ends exercise #8

//Exercise #9
const celsiusToFahrenheit = () => {
    resultCleaner("sensation-result")

    let celsius = document.getElementById('celsius-collector').value

    if (isEmpty(celsius)) {
        return alert("Must type a valid temp.")
    }

    celsius = Number(celsius);
    let Fahrenheit = (celsius * (9 / 5)) + 32;
    let format;
    switch (true) {
        case (Fahrenheit >= 14 && Fahrenheit < 32):
            format = `The temperature is ${Fahrenheit}° F, it's a low temperature`
            break;
        case (Fahrenheit >= 32 && Fahrenheit < 68):
            format = `The temperature is ${Fahrenheit}° F, it's a proper temperature`
            break;
        case (Fahrenheit >= 68 && Fahrenheit < 96):
            format = `The temperature is ${Fahrenheit}° F, it's a high temperature`
            break;
        default:
            format = `The temperature is ${Fahrenheit}° F, unclassified`
            break;
    }

    let container = document.getElementById('exercise-9')
    let p = document.createElement('p')
    p.id = "sensation-result"
    p.innerHTML = format;
    return container.appendChild(p);
}
//Ends exercise #9

//Execercise #10 
//Lister for day shift
const ageDay = () => {
    ageCollector("day", 5)
}

//Lister for afternoon shift
const ageAfterNoon = () => {
    ageCollector("afternoon", 6)
}

//Lister for night shift
const ageNight = () => {
    ageCollector("night", 11)
}

//Get the age from the differents inputs
const ageCollector = (shift, length) => {
    let age = document.getElementById(`${shift}-collector`).value
    if (isEmpty(age)) {
        return alert("Must type an age")
    } else if (!ageStudent(age)) {
        return alert("Student from 5 years old to 100 years old only")
    }

    age = Number(age)
    let container = document.getElementById(`list-${shift}`);
    let containerChildren = container.childElementCount;

    if (containerChildren <= length - 1) {
        document.getElementById(`${shift}-collector`).value = ''
        return addNewAge(age, container, containerChildren, shift)
    } else {
        let capitalizeShift = shift.charAt(0).toUpperCase() + shift.slice(1);
        return alert(`${capitalizeShift} shift must have ${length} students`)
    }
}

//Adds a student age
const addNewAge = (number, container, length, shift) => {
    let li = document.createElement('li');
    li.id = `${shift}-${length}`
    li.textContent = `Student ${length + 1}:`
    let numberSpan = document.createElement('span');
    numberSpan.id = `age-${li.id}`
    numberSpan.textContent = number;
    li.appendChild(numberSpan);
    li.appendChild(btnEdit(li));
    //Not implemente by the lack of time :(
    //li.appendChild(btnDelete(li));
    document.getElementById(`${shift}-collector`).focus();
    return container.appendChild(li);
}

//Get the averages
const ageAverage = () => {
    resultCleaner('average-result')
    resultCleaner('higher-result')

    let dayContainerSize = document.getElementById('list-day').childElementCount
    let afternoonContainerSize = document.getElementById('list-afternoon').childElementCount
    let nightContainerSize = document.getElementById('list-night').childElementCount

    let dayAge = document.querySelectorAll('#list-day span')
    let afternoonAge = document.querySelectorAll('#list-afternoon span')
    let nightAge = document.querySelectorAll('#list-night span')

    if (!(dayContainerSize == 5)) {
        return alert("Day shift must have 5 students")
    } else if (!(afternoonContainerSize == 6)) {
        return alert("Afternoon shift must have 6 students")
    } else if (!(nightContainerSize == 11)) {
        return alert("Night shift must have 11 students")
    }

    //Storage
    let daySum = 0;
    let afternoonSum = 0
    let nightSum = 0

    //Get the averages
    for (let i = 0; i < dayAge.length; i++) {
        daySum += Number(dayAge[i].textContent);
    }

    for (let j = 0; j < afternoonAge.length; j++) {
        afternoonSum += Number(afternoonAge[j].textContent);
    }

    for (let k = 0; k < nightAge.length; k++) {
        nightSum += Number(nightAge[k].textContent);
    }

    let dayAverage = Math.ceil(daySum / 5);
    let afternoonAverage = Math.ceil(afternoonSum / 6);
    let nightAverage = Math.ceil(nightSum / 11);
    let highest = "";

    //Check the three-way comparison
    if (dayAverage > afternoonAverage) {
        if (dayAverage > nightAverage) {
            highest = `The highest average is ${dayAverage} years from day shift`
        } else if (dayAverage < nightAverage) {
            highest = `The highest average is ${nightAverage} years from night shift`
        } else {
            highest = `The highest average is ${dayAverage} years from day and night shifts`
        }
    } else if (dayAverage < afternoonAverage) {
        if (afternoonAverage > nightAverage) {
            highest = `The highest average is ${afternoonAverage} years from afternoon shift`
        } else if (afternoonAverage < nightAverage) {
            highest = `The highest average is ${nightAverage} years from night shift`
        } else {
            highest = `The highest average is ${afternoonAverage} years from afternoon and night shifts`
        }
    } else if (dayAverage == afternoonAverage) {
        if (dayAverage > nightAverage) {
            highest = `The highest average is ${dayAverage} years from day and afternoon shifts`
        } else if (dayAverage < nightAverage) {
            highest = `The highest average is ${nightAverage} years from day and night shift`
        } else {
            highest = `They share the highest average which is ${dayAverage} years from day, afternoon and night shifts`
        }
    }

    let container = document.getElementById('exercise-10')
    let averages = document.createElement('p')
    averages.id = "average-result"
    averages.innerHTML = `
    Day shift average: ${dayAverage} years ${'&emsp;'}
    Afternoon shift average: ${afternoonAverage} years ${'&emsp;'}
    Night shift average: ${nightAverage} years
    `
    container.appendChild(averages)
    let higherAverage = document.createElement('p')
    higherAverage.id = "higher-result"
    higherAverage.innerHTML = highest
    container.appendChild(higherAverage)

    return false
}
//Ends exercise #10

//Misc funtions
//Create btn-modify
const btnEdit = (li) => {
    let btnModifier = document.createElement('button')
    btnModifier.type = "submit";
    btnModifier.id = `btn-${li.id}`
    btnModifier.onclick = function () { numberModify(li, btnModifier.id) }
    btnModifier.textContent = 'Edit';
    return btnModifier;
}

//Create btn-delete
const btnDelete = (li) => {
    let btnDeleter = document.createElement('button');
    btnDeleter.type = "submit";
    btnDeleter.onclick = function () { deleter(li.id) }
    btnDeleter.textContent = '-';
    return btnDeleter;
}

//Func that edit the number
const numberModify = (li, btn) => {
    deleter(btn)
    let newInput = document.createElement('input');
    newInput.type = "number";
    newInput.id = `edited-${li.id}`;
    newInput.placeholder = "Number"
    let btnDone = document.createElement('button');
    btnDone.type = "submit"
    btnDone.id = `btn-done-${li.id}`
    btnDone.onclick = function () { done(li, newInput.id) }
    btnDone.textContent = "Done"
    li.firstElementChild.after(btnDone);
    li.firstElementChild.after(newInput);
    newInput.focus();

    return false
}

//Func that submit the new number
const done = (li, inputId) => {
    let newNumber = Number(document.getElementById(inputId).value)
    let parent = document.getElementById(inputId).closest('div').id
    if (parent == "exercise-7") {
        if (isEmpty(newNumber)) {
            return alert("Must type a number")
        } else if (!Number.isInteger(newNumber)) {
            return alert("Must type an integer number")
        }
    } else if (parent == "exercise-10") {
        if (isEmpty(newNumber)) {
            return alert("Must type an age")
        } else if (!ageStudent(newNumber)) {
            return alert("Student from 5 years old to 100 years old only")
        }
    }

    document.getElementById(li.firstElementChild.id).textContent = newNumber;
    deleter(li.children[2].id)
    deleter(li.children[1].id)
    return li.firstElementChild.after(btnEdit(li));
}

//Func that check if a value is empty 
const isEmpty = (input) => {
    if (input == '') {
        return true
    } else {
        return false
    }
}

//Func that check if a string have letters
const onlyLetters = (letters) => {
    return /^[a-zA-Z ]+$/.test(letters)
}

//Func that check if a numeric value is between 1 and 10
const validScore = (score) => {
    if (score >= 0 && score <= 10) {
        return true
    } else {
        return false;
    }
}

//Func that detects a number equial o greater than 0
const isMoney = (currency) => {
    if (currency >= 0) {
        return true
    } else {
        return false
    }
}

//Func that detects a valid student age
const ageStudent = (age) => {
    return (age >= 5) && (age <= 100)
}

//Func that cleans the printed result tag
const resultCleaner = (id) => {
    let result = document.getElementById(id);
    if (result) {
        return result.remove();
    }
    return false
}

//Func that deletes the specified container
const deleter = (idContainer) => {
    document.getElementById(idContainer).remove();
    return false
}

//Func that detects the plural or singular form of the verb to be. xDDDDD :p
const toBeForm = (length) => {
    if (length > 1) {
        return "are"
    } else {
        return "is"
    }
}