import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useHistory } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

   const {updata, setUPdata} = useContext(updatedata)

    const history = useHistory("");

    const [inpval, setINP] = useState({
        personsid:"",
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


    const { personid } = useParams("");
    console.log(personid);



    const getdata = async () => {

        const res = await fetch(`/induser/${personid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data[0])
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const { personid,house_no, house_name, house_area, house_member_name, date_of_birth,
            date_of_marriage, date_of_divorce,date_of_death } = inpval;

        const res2 = await fetch(`/updateuser/${personid}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                personid,house_no, house_name, house_area, house_member_name, date_of_birth,
        date_of_marriage, date_of_divorce,date_of_death
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/")
            setUPdata(data2);
        }

    }

    return (
        <div className="container">
            <NavLink to="/">home2</NavLink>
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
                    <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;





