import { Modal as AntdModal, ModalProps } from "antd";
import { useTranslation } from "react-i18next";

const Modal = ({ children, ...props }: ModalProps) => {

    const { t } = useTranslation();

    return (
        <AntdModal title={t(props.title as string)} {...props}>
            {children}
        </AntdModal>
    )
}

export default Modal;