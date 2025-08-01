import { useTranslation } from "react-i18next";

const CustomTooltip = ({ active, payload }: any) => {
    const { t } = useTranslation();
    
    if (active && payload && payload.length) {
        return (
        <div style={{ background: '#fff', border: '1px solid #ccc' }}>
            {payload.map((item: any, index: number) => (
                <div key={item.name} className={`flex flex-col p-[10px] ${index !== 0 ? 'border-t border-[#e0e0e0]' : ''}`}>
                    <div className="text-sm"><b>{item.name}</b></div>
                    <div className="text-sm">{t('chart.money')}: {
                        item.value >= 1000000 ? (item.value / 1000000).toFixed(2) + 'M' :
                        item.value >= 1000 ? (item.value / 1000).toFixed(2) + 'K' :
                        item.value.toFixed(2)
                    }</div>
                </div>
            ))}
        </div>
        );
    }
    return null;
}

export default CustomTooltip;