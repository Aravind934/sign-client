import {useFormik} from 'formik'
import * as yup from 'yup'
import {useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {loginUser} from '../redux/actions/auth'
import {useEffect} from 'react'

let validationSchema = yup.object({
    email:yup.string().required('email required').email('invalid email'),
    password:yup.string().required('password required')
})
let Login = () =>{
    let state = useSelector(state=>state.auth)
    let history = useHistory()
    if(state.success){
        setTimeout(()=>history.push('/home'),2000)
    }
    let dispatch = useDispatch()
    useEffect(()=>{
        return ()=>dispatch({type:'RESET'})
    },[dispatch])
    let formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema,
        onSubmit:values=>{
         dispatch(loginUser(values))
        }
    })
    return(
        <div className="row">
        <div className=" offset-md-3 col-md-6 col-sm-12">
            <div className="container">
                <h2 className="text-center">Login form</h2>
{state?<div className={state.success?'alert alert-success':'alert alert-danger'}>{state.message}</div>:null}
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="input-group mb-3">
                    <input type="text" name="email" className="form-control" placeholder="email" {...formik.getFieldProps('email')}></input>
                </div>
                <small className="text-danger">{formik.touched.email && formik.errors.email?formik.errors.email:''}</small>
                <div className="input-group mb-3">
                    <input type="password" name="password" className="form-control" placeholder="password" {...formik.getFieldProps('password')}></input>
                </div>
                <small className="text-danger">{formik.touched.password && formik.errors.password?formik.errors.password:''}</small>
   <br></br><button type="submit" className="btn btn-primary mt-1" disabled={!formik.isValid}>Login</button>
    </form>
    </div>
    </div>
    </div>
    )
}

export default Login