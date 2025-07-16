import { ToastProvider as ToastProviderPrimitive } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';

const TOAST_DEFAULT_DURATION = 3000; // 3 seconds

export function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <ToastProviderPrimitive duration={TOAST_DEFAULT_DURATION}>
            <Toaster />
            {children}
        </ToastProviderPrimitive>
    );
}
