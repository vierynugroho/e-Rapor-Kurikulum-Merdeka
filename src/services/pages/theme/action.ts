import { CreateThemeType, ThemeType, UpdateThemeType } from '@/types/theme';
import { apiClient } from '@/lib/axios';

export const getThemes = async () => {
    return apiClient.get<ThemeType[]>('/themes');
};

export const getTheme = async (themeID: number) => {
    return apiClient.get<ThemeType[]>(`/themes/${themeID}`);
};

export const createTheme = async (data: CreateThemeType) => {
    return apiClient.post<ThemeType>('/themes', data);
};

export const updateTheme = async (themeID: number, data: UpdateThemeType) => {
    return apiClient.put<ThemeType>(`/themes/${themeID}`, data);
};

export const deleteTheme = async (themeID: number) => {
    return apiClient.delete<ThemeType>(`/themes/${themeID}`);
};
