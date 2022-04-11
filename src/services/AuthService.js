

export function doLogin(email, password, remember = false) {
    return new Promise((resolve, reject)=>{

        if (email && password==="123") {
            resolve()
        }
        else reject()
    })
}

export function doLogout() { }
