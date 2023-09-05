/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(employeeRecords) {
    return employeeRecords.map(arr => createEmployeeRecord(arr))
}

const createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

const createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type:"TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

const hoursWorkedOnDate = function(dateStamp){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === dateStamp
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })

    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function(dateStamp) {
    const EmployeePay = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
    return parseFloat(EmployeePay.toString())
}

const findEmployeeByFirstName = function(src, firstName) {
    return src.find(function(rec) {
        return rec.firstName === firstName
    })
}

const calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor.call(rec)
    }, 0)
}