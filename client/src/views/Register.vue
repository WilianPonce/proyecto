<template>
    <div class="wrapper">
        <div class="login">
            <p class="title">Register</p>
            <input type="text" placeholder="Nombre" v-model="name" autofocus/>
            <input type="text" placeholder="Correo electrónico" v-model="email" autofocus/>
            <input type="password" placeholder="Contraseña" v-model="password" />
            <select v-model="rol">
                <option value="2">Usuario</option>
                <option value="1">Administrador</option>
            </select>
            <button @click.prevent="register()">
            <span class="state">Ingresar</span>
            </button>
        </div>
    </div>
</template>
<script>
import axios from "axios"

export default {
    data() {
        return {
            name:null,
            email:null,
            password:null,
            rol:2,
        }
    },
    methods: {
        register(){
            let log = {name:this.name, email:this.email, password:this.password, rol:this.rol};
            axios.post("http://localhost:3000/users/register",log).then( ({data}) => {
                let rol = "Usuario";
                if(data.body.ops[0].rol == 1){
                    rol = "Administrador";
                }
                alert("Bienvenido "+rol+" "+data.body.ops[0].name);
                this.$router.push("/login");
            }).catch(log.error)
        }
    },
}
</script>
<style>
    .wrapper {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        min-height: 100%;
        padding: 20px;
        background: rgba(4, 40, 68, 0.85);
    }
    .login {
        border-radius: 2px 2px 5px 5px;
        padding: 10px 20px 20px 20px;
        width: 90%;
        max-width: 320px;
        background: #fff;
        position: relative;
        padding-bottom: 80px;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
    }
    .login.loading button {
        max-height: 100%;
        padding-top: 50px;
    }
    .login.loading button .spinner {
        opacity: 1;
        top: 40%;
    }
    .login.ok button {
        background-color: #8bc34a;
    }
    .login input {
        display: block;
        padding: 15px 10px;
        margin-bottom: 10px;
        width: 100%;
        border: 1px solid #ddd;
        transition: border-width 0.2s ease;
        border-radius: 2px;
        color: #ccc;
    }
    .login input + i.fa {
        color: #fff;
        font-size: 1em;
        position: absolute;
        margin-top: -47px;
        opacity: 0;
        left: 0;
        transition: all 0.1s ease-in;
    }
    .login input:focus + i.fa {
        opacity: 1;
        left: 30px;
        transition: all 0.25s ease-out;
    }
    .login a {
        font-size: 0.8em;
        color: #2196f3;
        text-decoration: none;
    }
    .login .title {
        color: #444;
        font-size: 1.2em;
        font-weight: bold;
        margin: 10px 0 30px 0;
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
    }
    .login button {
        width: 100%;
        height: 100%;
        padding: 10px 10px;
        background: #2196f3;
        color: #fff;
        display: block;
        border: none;
        margin-top: 20px;
        position: absolute;
        left: 0;
        bottom: 0;
        max-height: 60px;
        border: 0px solid rgba(0, 0, 0, 0.1);
        border-radius: 0 0 2px 2px;
        transform: rotateZ(0deg);
        transition: all 0.1s ease-out;
        border-bottom-width: 7px;
    }
    .login:not(.loading) button:hover {
        box-shadow: 0px 1px 3px #2196f3;
    }
    .login:not(.loading) button:focus {
        border-bottom-width: 4px;
    }
    footer {
        display: block;
        padding-top: 50px;
        text-align: center;
        color: #ddd;
        font-weight: normal;
        text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.2);
        font-size: 0.8em;
    }
    footer a, footer a:link {
        color: #fff;
        text-decoration: none;
    }
    .login select {
        display: block;
        padding: 15px 10px;
        margin-bottom: 10px;
        width: 100%;
        border: 1px solid #ddd;
        transition: border-width 0.2s ease;
        border-radius: 2px;
        color: #ccc;
    }
</style>