export interface Todo {
    id: string;
    title: string;
    description?: string;
    priority?: 'Niski' | 'Średni' | 'Wysoki';
    completed: boolean;
    createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';
