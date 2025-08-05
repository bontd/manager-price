import { NEW_STATUS } from "../constants/enum";
import { useTranslation } from "react-i18next";

interface StatusOption {
    label: string;
    value: string;
    color?: string;
}

interface GetStatusOptionsParams {
    key?: string;
    t: (key: string) => string;
}

const getStatusOptions = ({ key, t }: GetStatusOptionsParams): StatusOption[] | StatusOption | undefined => {
    const statusOptions: StatusOption[] = [
        { label: t('news.status.draft'), value: NEW_STATUS.DRAFT },
        { label: t('news.status.published'), value: NEW_STATUS.PUBLISHED },
        { label: t('news.status.archived'), value: NEW_STATUS.ARCHIVED }
    ];
    
    if (key) {
        return statusOptions.find((option) => option.value === key);
    }
    return statusOptions;
};

// Custom hook for using getStatusOptions with translation
export const useStatusOptions = (key?: string): StatusOption[] => {
    const { t } = useTranslation();
    const result = getStatusOptions({ key, t });
    return Array.isArray(result) ? result : [];
};

export default getStatusOptions;