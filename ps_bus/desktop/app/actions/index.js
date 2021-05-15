import * as types from '../constants/action.types'

export const cleanRouter = () => {
  return {
    type: types.CLEAN_ROUTER
  }
}

export const closeWorkload = (data) => {
  return {
    type: types.CLOSE_WORKLOAD,
    closeWorkload: data
  }
}

export const fuelling = () => {
  return {
    type: types.ADD_FUELLING
  }
}

export const login = (password) => {
  return {
    type: types.LOGAR_ADMIN,
    admin:{
      password: password
    }
  }
}

export const openWorkload = (data) => {
  return {
    type: types.OPEN_WORKLOAD,
    workload: data
  }
}

export const validateRegistration = (registration) => {
  return {
    type: types.VALIDATE_REGISTRATION,
    workload:{ 
     registration: registration
    },
  }
}

export const validateBusDriverRegistration = (registration) => {
  return {
    type: types.VALIDATE_BUS_DRIVER,
    fuelling:{ 
     registration: registration
    },
  }
}

export const validateBusNumber = (busNumber) => {
  return {
    type: types.VALIDATE_BUS_NUMBER,
    fuelling:{ 
     busNumber: busNumber
    },
  }
}

export const validateOdomter = (odometer,busNumber) => {
  return {
    type: types.VALIDATE_ODOMETER,
    fuelling:{ 
     odometer: odometer,
     busNumber: busNumber
    },
  }
}

export const validateAmountFuel = (amountFuel,busNumber) => {
  return {
    type: types.VALIDATE_AMOUNT_FUEL,
    fuelling:{ 
     amountFuel: amountFuel,
     busNumber: busNumber
    },
  }
}

export const saveRefuel = (data) => {
  return {
    type: types.SAVE_REFUEL,
    fuelling: data
  }
}

export const saveOilReposition = (data) => {
  return {
    type: types.SAVE_OIL_REPOSITION,
    motorOil: data
  }
}

export const validateOilBusNumber = (busNumber) => {
  return {
    type: types.VALIDATE_OIL_BUS_NUMBER,
    motorOil:{ 
     busNumber: busNumber
    },
  }
}

export const loadAdminFields = () => {
  return {
    type: types.LOAD_ADMIN_FIELDS
  }
}

export const saveConfiguration = (data) => {
  return {
    type: types.SAVE_CONFIGURATION,
    admin: data
  }
}

export const validatePassword = (data) => {
  return {
    type: types.VALIDATE_PASSWORD,
    admin: data
  }
}

export const changePassword = (data) => {
  return {
    type: types.CHANGE_PASSWORD,
    admin: data
  }
}

export const cleanAdminJobIsDone = () => {
  return {
    type: types.CLEAN_ADMIN_JOB_IS_DONE,
  }
}

export const cleanCloseWorkLoadJobIsDone = () => {
  return {
    type: types.CLEAN_CLOSE_WORKLOAD_JOB_IS_DONE,
  }
}

export const cleanOpenWorkLoadJobIsDone = () => {
  return {
    type: types.CLEAN_OPEN_WORKLOAD_JOB_IS_DONE,
  }
}

export const goToRegional = () => {
  return {
    type: types.GO_TO_REGIONAL,
  }
}

export const gotoOpenWorkload = () => {
  return {
    type: types.GO_TO_OPEN_WORKLOAD,
  }
}

export const goToFuelling = () => {
  return {
    type: types.GO_TO_FUELLING,
  }
}

export const cleanRefuelJobIsDone = () => {
  return {
    type: types.CLEAN_REFUEL_JOB_IS_DONE,
  }
}

export const cleanOilJobIsDone = () => {
  return {
    type: types.CLEAN_OIL_JOB_IS_DONE,
  }
}

export const sendWorkloadServer = () => {
  return {
    type: types.SEND_WORKLOAD_SERVER,
  }
}

export const updateFleet = () => {
  return {
    type: types.UPDATE_FEET,
  }
}

export const updateEmployee = () => {
  return {
    type: types.UPDATE_EMPLOYEE,
  }
}




