import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: 'jonathan.navas9@hotmail.com',
        lPassword: '123456'
    });

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: 'Gabo',
        rEmail: 'gabo.navas9@hotmail.com',
        rPassword1: '1234567',
        rPassword2: '1234567',
    });

    const { lEmail, lPassword } = formLoginValues;
    const {  rEmail, rName, rPassword1, rPassword2 } = formRegisterValues;

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch( startLogin( lEmail, lPassword )  );
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        if(rPassword1 !== rPassword2){
            return Swal.fire('Error', 'Both password must be the same', 'error');
        }
        dispatch( startRegister( rEmail, rPassword1, rName ) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleSubmitLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                                onSubmit={ handleSubmitLogin }
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleSubmitRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="rEmail"
                                value={rEmail}
                                onChange={ handleRegisterInputChange }
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={rPassword1}
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={rPassword2}
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" 
                                onSubmit={handleSubmitRegister}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};