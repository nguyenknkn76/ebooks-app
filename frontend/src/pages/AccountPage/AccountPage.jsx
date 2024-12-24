import LoginForm from "../../components/AuthComps/LoginForm/LoginForm";
import RegisterForm from "../../components/AuthComps/RegisterForm/RegisterForm";

const AccountPage = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <LoginForm/>
            <RegisterForm/>
        </div>
    );
};

export default AccountPage;