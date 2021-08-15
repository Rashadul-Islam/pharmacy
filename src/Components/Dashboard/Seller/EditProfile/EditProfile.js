import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserSideBar from '../../SideBar/UserSideBar';
import * as IoIcons from 'react-icons/io';

const EditProfile = () => {

    const history = useHistory();

    const [store, setStore] = useState([]);

    const [user, setUser] = useState({
        email: '',
        name: '',
        password: '',
        role: ''
    });
    useEffect(() => {
        const id = sessionStorage.getItem("Id");
        fetch(`https://dry-headland-65168.herokuapp.com/user/${id}`)
            .then(res => res.json())
            .then(data => setStore(data))
    }, [setStore])

    const handleBlur = (event) => {
        const storeUser = { ...user };
        storeUser[event.target.name] = event.target.value;
        setUser(storeUser);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        if (Object.values(user).every(x => x === '')) {
            alert('Nothing changed!!!');
            document.getElementById("form-div").reset();
            history.push("/manageMember");
        }

        else {
            const updateUser = {
                email: user.email === "" ? store.email : user.email,
                name: user.name === "" ? store.name : user.name,
                password: user.password === "" ? store.password : user.password,
                role: user.role === "" ? store.role : user.role,
            }
            const id = sessionStorage.getItem("Id");
            fetch(`https://dry-headland-65168.herokuapp.com/user/update/${id}`, {
                method: 'PATCH',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify(updateUser)
            })
                .then(res => res.json())
                .then(data => {
                    alert('Information updated successfully!!!');
                    document.getElementById("form-div").reset();
                    history.push("/manageMember");
                })
        }

    }

    return (
        <div id="background">
            <UserSideBar></UserSideBar>

            <div className="pt-4 mt-5 pb-4">
                <div className="mx-auto card card_login pb-5 mt-5 position-static" style={{ width: "18rem" }}>
                    <form id="form-div" onSubmit={handleEdit}>
                        <h5 className="pt-4 text-center font-weight-bold pb-3">Edit Profile<span><IoIcons.IoMdPeople /></span></h5>
                        <input className="form-control" type="email" name="email" defaultValue={store.email} readOnly />
                        <br />
                        <input className="form-control" type="text" onBlur={handleBlur} name="name" defaultValue={store.name} required />
                        <br />
                        <input className="form-control" type="text" onBlur={handleBlur} name="password" defaultValue={store.password} required />
                        <br />
                        <input className="form-control form-control" defaultValue={store.role} name="role" readOnly/>
                        <br />
                        <button className="form-control btn-success" type="submit">Update</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default EditProfile;