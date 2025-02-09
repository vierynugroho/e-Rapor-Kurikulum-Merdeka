import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { formSchema } from '@/app/(pages)/(auth)/login/form/validation';
import { PasswordInput } from '@/components/form/password-input';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function LoginForm() {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identity_number: '',
            password: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const response = await signIn('credentials', {
                redirect: false,
                identity_number: values.identity_number,
                password: values.password,
            });

            if (!response || response.error) {
                throw new Error(response?.error || 'Terjadi kesalahan.');
            }
            return response;
        },
        onSuccess: () => {
            toast({
                title: 'Berhasil',
                description: 'Login berhasil.',
                variant: 'default',
            });
            router.push('/');
            form.reset();
        },
        onError: error => {
            toast({
                title: 'Gagal',
                description: error.message || 'Terjadi kesalahan.',
                variant: 'destructive',
            });
            console.error('Error:', error);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate(values);
    }

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="p-6 md:p-8"
                        >
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome back
                                    </h1>
                                    <p className="text-balance text-muted-foreground">
                                        e-Rapor TK Negeri 2 Sananwetan Kota
                                        Blitar
                                    </p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="identity_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Identity Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="identity_number"
                                                    type="text"
                                                    placeholder="NIK atau NIP"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <PasswordInput
                                    control={form.control}
                                    name="password"
                                    label="Password"
                                    placeholder="*******"
                                />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending
                                        ? 'Memproses...'
                                        : 'Login'}
                                </Button>

                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{' '}
                                    <a
                                        href="#"
                                        className="underline underline-offset-4"
                                    >
                                        contact admin
                                    </a>
                                </div>
                            </div>
                        </form>
                    </Form>

                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src="/assets/logo.png"
                            alt="Description"
                            width={500}
                            height={300}
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                e-Rapor{' '}
                <a href="https://paudpedia.kemdikbud.go.id/download/2024/program-prioritas/V4_Booklet_IKM_PAUD.pdf">
                    Kurikulum Merdeka
                </a>{' '}
                TK Negeri 2 Sananwetan Kota Blitar &copy;
                {new Date().getFullYear()}
            </div>
        </div>
    );
}
