import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
       personid:"",
        house_no : "", 
        house_name:"", 
        house_area:"", 
        house_member_name:"", 
        date_of_birth:"",
        date_of_marriage:"",
         date_of_divorce:"",
         date_of_death:""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();

        const {personid, house_no, house_name, house_area, house_member_name, date_of_birth,
            date_of_marriage, date_of_divorce,date_of_death } = inpval;


       /* if (name == "") {
            alert("name is required")
        } else if (email == "") {
            alert("email is required")
        } else if (!email.includes("@")) {
            alert("enter valid email")
        } else if (work == "") {
            alert("work is required")
        } else if (add == "") {
            alert("add is required")
        } else if (mobile == "") {
            alert("mobile is required")
        } else if (age == "") {
            alert("age is required")
        } else {*/

            const res = await fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    personid,house_no, house_name, house_area, house_member_name, date_of_birth,
        date_of_marriage, date_of_divorce,date_of_death
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("error");

            } else {
                history.push("/")
                setUdata(data)
                console.log("data added");

            }
        //}

    }

    return (
        <div className="container">
            <NavLink to="/">home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">House Number</label>
                        <input type="text" value={inpval.house_no} onChange={setdata} name="house_no" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">House Name</label>
                        <input type="text" value={inpval.house_name} onChange={setdata} name="house_name" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">House Area</label>
                        <input type="text" value={inpval.house_area} onChange={setdata} name="house_area" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Member Name</label>
                        <input type="text" value={inpval.house_member_name} onChange={setdata} name="house_member_name" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Date Of Birth</label>
                        <input type="date" value={inpval.date_of_birth} onChange={setdata} name="date_of_birth" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Date Of Marriage</label>
                        <input type="date" value={inpval.date_of_marriage} onChange={setdata} name="date_of_marriage" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Date of Divorce</label>
                        <input type="date" value={inpval.date_of_divorce} onChange={setdata} name="date_of_divorce" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Date of Death</label>
                        <input type="date" value={inpval.date_of_death} onChange={setdata} name="date_of_death" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;
