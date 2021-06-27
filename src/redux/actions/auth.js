import axios from "axios"

let baseUrl = 'http://localhost:4000'
export let registerUser = (values)=>dispatch=>{
    let address = {
        line1:values.line1,
        line2:values.line2,
        city:values.city,
        state:values.state,
        country:values.country,
        postalcode:values.postalcode
    }

    values = {...values,address}
    axios.post(`${baseUrl}/auth/register`,values).then(result=>{
        //console.log(result.data)
        dispatch({type:'REGISTER',payload:result.data})
    })

}

export let loginUser = (values)=>dispatch=>{
    axios.post(`${baseUrl}/auth/login`,values).then(async(result)=>{
        if(result.data.success){
            await localStorage.setItem('token',JSON.stringify(result.data.token))
            await localStorage.setItem('user',result.data.user)
        }
        dispatch({type:'LOGIN',payload:result.data})
    })
}