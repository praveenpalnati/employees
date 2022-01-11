// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, remove, update, set} from "firebase/database";

const app = initializeApp(window.config.firebase)
const db = getDatabase()

export const getEmployees = (callback) => {
  const empRef = ref(db, 'employees/')
  onValue(empRef, (snapshot) => {
    let data = snapshot.val()
    if(data) {
      data = data.filter((item)=> {
        return item !== undefined
      })
    }
    console.log('here')
    callback(data?[...data]:[])
  })
}

export const saveEmployee = (employee) => {
  delete employee.selected
  return set(ref(db,'employees/'+employee.id), employee)
}

export const updateEmployee = (employee) => {
  delete employee.selected
  const updates = {}
  updates['employees/' + employee.id] = employee;
  return update(ref(db), updates)
}

export const deleteEmployee = (employee) => {
  return remove(ref(db,'employees/'+employee.id))
}