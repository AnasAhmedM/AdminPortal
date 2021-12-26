import {auth} from './Firebase'

class Coordinator {
    constructor(username, name, email, password, department, responsibilities){
    this.username = username
    this.name = name
    this.email = email
    this.password = password
    this.department = department
    this.responsibilities = responsibilities
    }

    createCoordinator(){
        var response = {};
        auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(newUser =>{
            response['email'] = newUser.user.email;
            response['message'] =  "Sucesss"
            })
        .catch(error =>{
            response['message'] = error.message
        })
        return response;
    }
}

let CoordinatorBuilder = function () {
    let username
    let name
    let email
    let password
    let department
    let responsibilities

    return {
        setUsername: function (username) {
            this.username = username;
            return this;
        },
        setName: function (name) {
            this.name = name;
            return this;
        },
        setEmail: function (email) {
            this.email = email;
            return this;
        },
        setPassword: function (password) {
            this.password = password;
            return this;
        },
        setDepartment: function (department) {
            this.department = department;
            return this;
        },
        setResponsibilities: function (responsibilities) {
            this.responsibilities = responsibilities;
            return this;
        },
        build: function () {
            return new Coordinator(this.username, this.name, this.email, this.password, this.department, this.responsibilities);
        }
    };
};

export {Coordinator, CoordinatorBuilder};