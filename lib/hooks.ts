import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch, AppStore } from '../store/store';

// Type-safe useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Type-safe useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Type-safe useStore hook
export const useAppStore = () => useStore<AppStore>();
