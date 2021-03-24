import React, { useState } from 'react';
import './login.css';
import Title from './components/title/title';
import Label from './components/label/label';
import Input from './components/input/input';

const Login = () => {

    const [ user, setUser ] = useState('');
    const [ pass, setPass ] = useState('');
    const [ passwordError, setPasswordError ] = useState(false);
    const [ isLogin, setIsLogin ]= useState(false);
    const [ hasError, setHasError ] =useState(false);

    function handleChange(name, value){
        if(name === 'usuario'){
            setUser(value)
            setHasError(false);
        }else{
            if(value.length < 6){
                setPasswordError(true);
                setHasError(false);
            }else{
                setPasswordError(false);
                setPass(value)
                setHasError(false);
            }
            
        }
    }

    function ifMatch(param){
        if(param.user.length > 0 && param.pass.length > 0){
            if(param.user === 'prueba1' && param.pass === '123456'){
                const { user, pass } = param;
                let ac = {user, pass};
                let account =JSON.stringify(ac);
                localStorage.setItem('account', account);
                setIsLogin(true);
                setHasError(false);
            }else{
                setIsLogin(false);
                setHasError(true);
            }
        }else{
            setIsLogin(false);
            setHasError(true);
        }

    }

    function handleSubmit(){
        let account = { user, pass }
        console.log('account:',account );
        if(account){
            ifMatch(account);
        }
    }

    /*console.log('usuario:',user)
    console.log('password:',pass)*/


    return (
        <div className='login-container'>
            { isLogin ?
                <>
                    <h1>Bienvenido, {user}</h1>
                    <label>Login completo</label>
                </>
            
            :
                <>
                <Title text='Login'/>
                <br/>
                { hasError &&
                    <label className='label-alert'>
                        Su contraseña o usuario son incorrectos, o no existen en nuestra plataforma
                    </label>
                }
                <br/>
                <Label text='Usuario'/>
                <br/>
                <Input 
                attribute={{
                    id: 'usuario',
                    name: 'usuario',
                    type: 'text',
                    placeholder: 'Ingrese su usuario'
                }}
                handleChange={handleChange}/>
                <br/>
                <Label text='Contraseña'/>
                <br/>
                <Input 
                attribute={{
                    id: 'contra',
                    name: 'contra',
                    type: 'password',
                    placeholder: 'Ingrese su contraseña'
                }}
                handleChange={handleChange}
                param={passwordError}
                />
                { passwordError &&
                    <label className='label-error'>
                    Contraseña inválida o incompleta
                </label>
                }
                
                <br/><br/>

                <button onClick={handleSubmit} className='submit-button'>
                    Ingresar
                </button>
                </>
            }       
        </div>
    )
};

export default Login;