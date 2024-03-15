/*
! managing inputs in react (two-way binding)
to make inputs functional, we should do two-way data binding , 
- the changes on the state are reflected on the UI  => to make the state displays on the input:
create a state and put its value on the input value.
- the changes in the UI are reflected on the state(data model) => to make writing something change the state: 
we use onChange event handler and call a function , in it we use the hook func to set the current value of the input in the state
*/ 

/*
! inputs in react (forms)
we can create a state for each input, but we'd rather put the related ones in {name: "", address: ""...}
mistake 1: 
setFormInputs({ name: event.target.value }); it'd update the wanted one but delete the others from the obj
mistake 2:
setFormInputs({ name: event.target.value, email: formInputs.email, password: formInputs.password })
would update the others too but not efficient (if we add a new input we should change in the code)

best solution:
update the whole inputs by setting a new {} , a copy of the obj in the state, and a new value from the input field
=>  setFormInputs( {...formInputs, password: event.target.value} ) 

const originalObject = { key1: '1', key2: '2' };
const copiedObject = { ...originalObject }; <== to copy
const copiedObject = { ...originalObject , key2: '3'}; <== to copy and update 

note: 
(event) => prevent.default() => to stop from reloading
*/ 


/*
! other forms
- check input: event.target.checked instead of value
- textArea
- select input
- radio
value="student" checked={formInputs.status === "student"} if checked it puts event.target.value to the value written
*/ 

/*

*/ 