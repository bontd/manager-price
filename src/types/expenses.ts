export interface Expense {
    id?: string;
    title?: string;
    description?: string;
    amount?: number;
    category_id?: string;
    expense_date?: string;
    payment_method?: string;
    location?: string;
    is_recurring?: boolean;
    recurring_type?: string;
}