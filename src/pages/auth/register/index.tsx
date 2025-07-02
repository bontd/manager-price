import { useTranslation } from 'react-i18next';

const Register = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('register.title')}</h1>
        </div>
    )
}

export default Register;