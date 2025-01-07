import { useState } from "react";
import LoginForm from "../../components/AuthComps/LoginForm/LoginForm";
import RegisterForm from "../../components/authComps/RegisterForm/RegisterForm";

const AccountPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            {isLogin ? 
                <LoginForm onRegisterClick={() => setIsLogin(false)} /> 
                :<RegisterForm onLoginClick={() => setIsLogin(true)} />
            }
        </div>
    );
};

export default AccountPage;