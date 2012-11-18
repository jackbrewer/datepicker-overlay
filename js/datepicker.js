//
// DATEPICKER OVERLAY PROTOTYPE
// ============================
//
// Datepickers suck. This is my attempt to make something better.
//
// This demo the result of a weekend of experimentation. The concept is fun
// but some user testing is needed to see whether this could be a viable,
// useful datepicker component.
//
// Todo List
// ---------
//  - Responsive styling (currently fixed to 1200px wide)
//  - Validation should check if dates are possible - Feb 31st
//  - add buttons for 'today', 'tomorrow' etc
//  - add day of the week (thurs etc)
//  - maybe add an 'on this day' easter egg
//  - make overlay work (finish JS loading work before reveal)
//


function datepicker(){

  var dateTime = {
        day: {
            value: ''
          , min: 1
          , max: 31
          , length: 2
        }
      , month: {
            value: ''
          , min: 1
          , max: 12
          , length: 2
        }
      , year: {
            value: ''
          , min: 1900
          , max: 2100
          , length: 4
        }
      , hour: {
            value: ''
          , min: 0
          , max: 23
          , length: 2
        }
      , minute: {
            value: ''
          , min: 0
          , max: 59
          , length: 2
        }
      }
    , weekdays = [
        'Sunday'
      , 'Monday'
      , 'Tuesday'
      , 'Wednesday'
      , 'Thursday'
      , 'Friday'
      , 'Saturday'
      ]


  //
  // UPDATE VALUE
  // This is the only place the dateTime object should be updated
  //

  function updateValue(unit, value){

    value = validateValue(unit, value)

    value = value.toString()

    value = padValue(unit, value)

    dateTime[unit].value = value

    setInputValue(unit, value)
    setActiveLink(unit, value)

    var dayName = new Date(dateTime.month.value + '/' + dateTime.day.value + '/' + dateTime.year.value)

    // Add day name
    if (!isNaN(dayName)) {
      dayName = weekdays[dayName.getDay()]
      $('.datepicker-weekday').text('' + dayName + '')
    }

  }


  //
  // VALIDATE VALUE
  // Ensures the value returned is between the unit's min and max properties
  // If the value received is not a number, default to the min value
  //

  function validateValue(unit, value){

    var minValue = dateTime[unit].min
      , maxValue = dateTime[unit].max

    // Ensure any strings are converted to integers where possible
    // The checks for zeros need refactoring
    value = parseInt(value, 10) || value === '0' || value === '00' ? parseInt(value, 10) : value

    // If value is still not an integer, set it back to the existing value
    if ( typeof value !== 'number'){
      value = dateTime[unit].value
    }

    if (value >= minValue && value <= maxValue) {
      return value
    } else if (value < minValue) {
      return minValue
    } else if (value > maxValue) {
      return maxValue
    }

  }


  //
  // ZERO PADDING
  // Check required max unit length and zero pad until reached
  //

  function padValue (unit, value) {

    var length = dateTime[unit].length

    return value.length < length ? padValue(unit, '0' + value) : value

  }


  //
  // SET INPUT VALUE
  //

  function setInputValue(unit){

    // Find the new value
    var newValue = dateTime[unit].value

    // Update the input
    $('.datepicker-form-' + unit).attr('value', newValue)

  }


  //
  // SetActiveLink
  //

  function setActiveLink(unit) {

    // Find the unit's list of links
    var unitList = $('.datepicker-unit-list[data-unit=' + unit + ']')
      , newValue = dateTime[unit].value

    // Unset any active classes already set
    unitList.find('.active').removeClass('active')

    unitList.find('[data-value="' + newValue + '"]').addClass('active')

  }


  //
  // SET DATE AND TIME
  // Sets the datepicker to a specific date and time.
  // Accepts custom dates and defaults to now.
  //

  function setDateTime(suppliedDate) {

    var newDate = suppliedDate && suppliedDate !== '' ? new Date(suppliedDate) : new Date()

    updateValue('day',    newDate.getDate()     )
    updateValue('month',  newDate.getMonth() + 1) // Months are zero-based
    updateValue('year',   newDate.getFullYear() )
    updateValue('hour',   newDate.getHours()    )
    updateValue('minute', newDate.getMinutes()  )

    $('.datepicker-form-day').select()

  }


  //
  // CONSTRUCT DATE
  //

  function constructDate() {

    var completeDate = 'Your chosen date is '

    completeDate += dateTime.day.value + '/'
    completeDate += dateTime.month.value + '/'
    completeDate += dateTime.year.value + ' - '
    completeDate += dateTime.hour.value + ':'
    completeDate += dateTime.minute.value

    return completeDate

  }


  //
  // SET INITIAL VALUE
  //

  setDateTime()



  //
  // USER INTERACTION
  // ================
  //


  //
  // When a link is clicked
  //

  $('.datepicker-row li a').on('click', function(e){

    e.preventDefault()

    var unit = $(this).closest('ul').data('unit')
      , value = $(this).data('value')

    updateValue(unit, value)

  })


  //
  // When a form value is updated
  //

  $('.datepicker-form-row input[class*="datepicker-form-"]').on('blur',function(){

    var unit = $(this).data('unit')
      , value = $(this).attr('value')

    updateValue(unit, value)

  })


  //
  // PRESET DATES
  // In the demo, I've hard coded 2 custom examples. Passing actual dates works.
  // This could be improved to take many keywords and relative dates as input
  // E.g. Yesterday, 2 weeks ago, next year.
  //

  $('.datepicker-presets a').on('click', function(e){
    e.preventDefault()

    var newDate = $(this).data('preset-date')

    var testDate = new Date(newDate)

    if ( testDate.getFullYear() > 0 ) {
      setDateTime(newDate)
    } else {

      if (newDate.toLowerCase() === 'today') {
        setDateTime()
      }

      if (newDate.match(/(.* days)/i) ) {

        newDate = parseInt(newDate, 10)
        setDateTime(futureDate( newDate ))
      }

    }


    //
    // FORMATTING PAST / FUTURE DATES
    //

    function futureDate( days ){
      var today = new Date();
      var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days, today.getHours(), today.getMinutes());
      return nextweek;
    }


  })


  //
  // On submit - DEMO ONLY
  //

  $('input[type="button"]').on('click', function(){

    // Check day is in month
    if ((dateTime.month.value === '04' || dateTime.month.value === '06' || dateTime.month.value === '09' || dateTime.month.value === '11') && dateTime.day.value === '31') {
      alert('Your chosen month doesn\'t have 31 days!')
      return false;
    }

    console.log(dateTime.month.value)

    // Check for February 29th
    if (dateTime.month.value === '02') {
      var isleap = ( dateTime.year.value % 4 === 0 && (dateTime.year.value % 100 !== 0 || dateTime.year.value % 400 === 0));
      if (dateTime.day.value > '29' || (dateTime.day.value === '29' && !isleap)) {
        alert('February ' + dateTime.year.value + ' doesn\'t have ' + dateTime.day.value + ' days!')
        return false;
      }
    }

    alert(constructDate())
  })

}

(function(){
  datepicker()
})();