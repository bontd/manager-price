import UserForm from "@/components/UserForm";
import { useUser } from "@/hook/useUser";
import { Form, Modal } from "antd";
import { useEffect } from "react";
import dayjs from 'dayjs';

const CreateOrEditUser = ({ type, isCreateModalOpen, setIsCreateModalOpen, initialValues }: { type: 'create' | 'edit', isCreateModalOpen: boolean, setIsCreateModalOpen: (value: boolean) => void, initialValues: any }) => {
    const [form] = Form.useForm();

    const { createUser, updateUser } = useUser();

    const normalizedInitialValues = {
        ...initialValues,
        birthday: initialValues.birthday ? dayjs(initialValues.birthday) : null
    }

    useEffect(() => {
        if (type === 'create' && isCreateModalOpen) {
            form.resetFields();
        }
    }, [type, isCreateModalOpen]);

    const handleCreate = (values: any) => {
        if (type === 'create') {
            createUser.mutate({
                ...values,
                gender: String(values.gender)
            }, {
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                }
            });
        } else {
            updateUser.mutate({
                ...values,
                id: initialValues.id,
                gender: String(values.gender)
            }, {
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                }
            });
        }
    };

    return (
        <Modal
            title={type === 'create' ? 'Create User' : 'Edit User'}
            open={isCreateModalOpen}
            onCancel={() => setIsCreateModalOpen(false)}
            footer={null}
        >
            <UserForm 
                onFinish={handleCreate}
                initialValues={type === 'create' ? {} : normalizedInitialValues}
                showPasswordFields={type === 'create' ? true : false}
                form={form}
            />
        </Modal>
    );
};

export default CreateOrEditUser;